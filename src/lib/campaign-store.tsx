// Campaign state, kept apart from brand onboarding.
//
// Onboarding confirms rules once; a campaign is a working document that gets
// resolved, pruned and re-resolved. Different lifecycles, so different stores.
// The screen itself still lives in the onboarding store, because there is one
// router for the whole app.

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import {
  BRIEFING,
  BRIEF_FIELDS,
  OFFER_CONFLICTS,
  buildCampaign,
  seedBriefValues,
  type BriefField,
  type BriefValue,
} from '../data/briefing'
import { analyseBriefing } from './briefing-api'
import {
  deleteCampaign,
  loadCampaign,
  loadCampaigns,
  newCampaignId,
  saveCampaign,
  type SavedCampaign,
} from './campaign-storage'
import type { Campaign, ChannelEntry, GateResult, Market } from './campaign'
import { resolveSlots, runGates, summarise, type MatrixSummary, type ResolvedMatrix } from './matrix'
import { loadSample } from './samples'
import { useStore } from './store'
import type { PickedDocument } from './types'

/** How the campaign was started, which decides what the agent may assume. */
export type CampaignMode = 'brand' | 'clean'

/** How far a campaign got, which is also where resuming it lands. */
export type CampaignStage = 'brief' | 'review' | 'matrix' | 'export'

export interface CampaignState {
  /** Null until a campaign is started, which is also what makes it saveable. */
  id: string | null
  stage: CampaignStage
  mode: CampaignMode | null
  upload: PickedDocument | null
  progress: number
  /** Whether the briefing has been read, so the review screen has something to show. */
  read: boolean
  values: Record<string, BriefValue>
  touched: Record<string, boolean>
  drafts: Record<string, string>
  why: string | null
  markets: Market[]
  channelPlan: ChannelEntry[]
  /** Channel-plan rows pruned out of the matrix. */
  excluded: string[]
  /**
   * Discount percentages the briefing states somewhere other than the concept.
   * Emptied when the conflict is resolved, because resolving it means the other
   * surfaces are corrected to the campaign's value.
   */
  statedElsewhere: Array<{ pct: number; where: string }>
  confirmed: boolean
  error: string | null
}

export interface FieldStatus {
  label: 'Edited' | 'Needs review' | 'Extracted'
  variant: 'outline' | 'accent' | 'neutral'
}

interface CampaignStore {
  state: CampaignState
  /** The Campaign the confirmed values resolve to, pruning applied. */
  campaign: Campaign
  matrix: ResolvedMatrix
  summary: MatrixSummary
  gates: GateResult[]
  blocking: GateResult[]
  needReview: number
  /** Drafts on disk, newest first. */
  saved: SavedCampaign[]
  start: (mode: CampaignMode) => void
  resume: (id: string) => void
  discard: (id: string) => void
  pickFile: (file?: File) => void
  removeFile: () => void
  read: () => void
  setValue: (key: string, value: BriefValue) => void
  setDraft: (key: string, value: string) => void
  addChip: (key: string) => void
  removeChip: (key: string, index: number) => void
  toggleWhy: (key: string) => void
  confirmBrief: () => void
  /** Composes the brief and the filename for every slot, then opens the export. */
  draftAssets: () => void
  /** Settles the offer on one percentage and corrects the other surfaces to it. */
  resolveOffer: (pct: number) => void
  toggleEntry: (id: string) => void
  reset: () => void
  fieldStatus: (field: BriefField) => FieldStatus
}

function initialState(): CampaignState {
  return {
    id: null,
    stage: 'brief',
    mode: null,
    upload: null,
    progress: 0,
    read: false,
    values: seedBriefValues(),
    touched: {},
    drafts: {},
    why: null,
    markets: BRIEFING.markets,
    channelPlan: BRIEFING.channelPlan,
    excluded: [],
    statedElsewhere: OFFER_CONFLICTS,
    confirmed: false,
    error: null,
  }
}

/** Resuming a draft lands on the screen it was left on. */
const SCREEN_FOR_STAGE: Record<CampaignStage, 'brief-upload' | 'brief-review' | 'matrix' | 'export'> =
  {
    brief: 'brief-upload',
    review: 'brief-review',
    matrix: 'matrix',
    export: 'export',
  }

const CampaignContext = createContext<CampaignStore | null>(null)

export function CampaignProvider({ children }: { children: ReactNode }) {
  const { go } = useStore()
  const [state, setState] = useState<CampaignState>(initialState)
  const run = useRef<AbortController | null>(null)

  useEffect(() => () => run.current?.abort(), [])

  const [saved, setSaved] = useState<SavedCampaign[]>(() => loadCampaigns())

  const patch = useCallback(
    (update: Partial<CampaignState> | ((s: CampaignState) => Partial<CampaignState>)) => {
      setState((s) => ({ ...s, ...(typeof update === 'function' ? update(s) : update) }))
    },
    [],
  )

  // Autosave. Every edit is a state change, so writing here covers all of them
  // without any screen having to remember to save.
  useEffect(() => {
    if (!state.id) return
    saveCampaign(state.id, state)
    setSaved(loadCampaigns())
  }, [state])

  const campaign = useMemo(
    () =>
      buildCampaign(state.values, {
        markets: state.markets,
        channelPlan: state.channelPlan.filter((entry) => !state.excluded.includes(entry.id)),
        propositions: BRIEFING.propositions,
        statedElsewhere: state.statedElsewhere,
      }),
    [state.values, state.markets, state.channelPlan, state.excluded, state.statedElsewhere],
  )

  const matrix = useMemo(() => resolveSlots(campaign), [campaign])
  const summary = useMemo(() => summarise(matrix.slots), [matrix])
  const gates = useMemo(() => runGates(campaign, matrix), [campaign, matrix])
  const blocking = useMemo(() => gates.filter((g) => !g.passed && g.severity === 'blocking'), [gates])
  const needReview = useMemo(
    () => BRIEF_FIELDS.filter((f) => f.conf < 70 && !state.touched[f.key]).length,
    [state.touched],
  )

  /** Loads the sample briefing's bytes in the background, name already on screen. */
  const attachSample = useCallback(() => {
    loadSample(BRIEFING.file).then((file) => {
      if (!file) return
      patch((s) => (s.upload?.name === BRIEFING.file ? { upload: { ...s.upload, file } } : {}))
    })
  }, [patch])

  const start = useCallback<CampaignStore['start']>(
    (mode) => {
      run.current?.abort()
      // The sample briefing comes attached, so the demo is a click-through.
      setState({
        ...initialState(),
        id: newCampaignId(),
        mode,
        upload: { name: BRIEFING.file, meta: BRIEFING.size },
      })
      go('brief-upload')
      attachSample()
    },
    [attachSample, go],
  )

  const resume = useCallback<CampaignStore['resume']>(
    (id) => {
      const record = loadCampaign(id)
      if (!record) return
      run.current?.abort()
      setState(record.state)
      go(SCREEN_FOR_STAGE[record.state.stage])
      // The picked file never survives a reload. Re-attaching the sample keeps
      // a resumed demo able to re-read its briefing; a real upload has to be
      // dropped again, and the name on screen says which one it was.
      if (record.state.upload?.name === BRIEFING.file) attachSample()
    },
    [attachSample, go],
  )

  const pickFile = useCallback<CampaignStore['pickFile']>(
    (file) => {
      if (!file) {
        patch({ error: null, upload: { name: BRIEFING.file, meta: BRIEFING.size } })
        attachSample()
        return
      }
      patch({ error: null, upload: { name: file.name, meta: formatBytes(file.size), file } })
    },
    [attachSample, patch],
  )

  const read = useCallback(() => {
    run.current?.abort()
    const controller = new AbortController()
    run.current = controller

    const upload = state.upload
    patch({ progress: 0, error: null })
    go('brief-analyzing')

    analyseBriefing({
      fileName: upload?.name ?? BRIEFING.file,
      file: upload?.file,
      signal: controller.signal,
      onProgress: (progress) => patch({ progress }),
    })
      .then((result) => {
        if (controller.signal.aborted) return
        patch((s) => ({
          progress: 100,
          read: true,
          stage: 'review',
          values: { ...s.values, ...result.values },
          markets: result.markets ?? s.markets,
          channelPlan: result.channelPlan ?? s.channelPlan,
        }))
        go('brief-review')
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return
        patch({
          progress: 0,
          error: error instanceof Error ? error.message : 'Reading the briefing failed',
        })
        go('brief-upload')
      })
  }, [go, patch, state.upload])

  const setValue = useCallback<CampaignStore['setValue']>(
    (key, value) =>
      patch((s) => ({
        values: { ...s.values, [key]: value },
        touched: { ...s.touched, [key]: true },
      })),
    [patch],
  )

  const addChip = useCallback<CampaignStore['addChip']>(
    (key) =>
      patch((s) => {
        const draft = (s.drafts[key] ?? '').trim()
        if (!draft) return {}
        const current = Array.isArray(s.values[key]) ? (s.values[key] as string[]) : []
        return {
          values: { ...s.values, [key]: [...current, draft] },
          touched: { ...s.touched, [key]: true },
          drafts: { ...s.drafts, [key]: '' },
        }
      }),
    [patch],
  )

  const removeChip = useCallback<CampaignStore['removeChip']>(
    (key, index) =>
      patch((s) => {
        const current = Array.isArray(s.values[key]) ? (s.values[key] as string[]) : []
        return {
          values: { ...s.values, [key]: current.filter((_, i) => i !== index) },
          touched: { ...s.touched, [key]: true },
        }
      }),
    [patch],
  )

  const fieldStatus = useCallback<CampaignStore['fieldStatus']>(
    (field) => {
      if (state.touched[field.key]) return { label: 'Edited', variant: 'outline' }
      if (field.conf < 70) return { label: 'Needs review', variant: 'accent' }
      return { label: 'Extracted', variant: 'neutral' }
    },
    [state.touched],
  )

  const store: CampaignStore = {
    state,
    campaign,
    matrix,
    summary,
    gates,
    blocking,
    needReview,
    saved,
    start,
    resume,
    discard: useCallback((id) => {
      deleteCampaign(id)
      setSaved(loadCampaigns())
      // Deleting the campaign being edited stops the autosave putting it back.
      setState((s) => (s.id === id ? initialState() : s))
    }, []),
    pickFile,
    removeFile: useCallback(() => patch({ upload: null }), [patch]),
    read,
    setValue,
    setDraft: useCallback(
      (key, value) => patch((s) => ({ drafts: { ...s.drafts, [key]: value } })),
      [patch],
    ),
    addChip,
    removeChip,
    toggleWhy: useCallback((key) => patch((s) => ({ why: s.why === key ? null : key })), [patch]),
    confirmBrief: useCallback(() => {
      patch({ confirmed: true, stage: 'matrix' })
      go('matrix')
    }, [go, patch]),
    draftAssets: useCallback(() => {
      patch({ stage: 'export' })
      go('export')
    }, [go, patch]),
    resolveOffer: useCallback(
      (pct) =>
        patch((s) => ({
          values: { ...s.values, of2: pct },
          touched: { ...s.touched, of2: true },
          statedElsewhere: [],
        })),
      [patch],
    ),
    toggleEntry: useCallback(
      (id) =>
        patch((s) => ({
          excluded: s.excluded.includes(id)
            ? s.excluded.filter((entry) => entry !== id)
            : [...s.excluded, id],
        })),
      [patch],
    ),
    reset: useCallback(() => {
      run.current?.abort()
      setState(initialState())
    }, []),
    fieldStatus,
  }

  return <CampaignContext.Provider value={store}>{children}</CampaignContext.Provider>
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  const mb = bytes / (1024 * 1024)
  return mb >= 1 ? `${mb.toFixed(1)} MB` : `${Math.round(bytes / 1024)} KB`
}

export function useCampaign(): CampaignStore {
  const store = useContext(CampaignContext)
  if (!store) throw new Error('useCampaign must be used inside <CampaignProvider>')
  return store
}
