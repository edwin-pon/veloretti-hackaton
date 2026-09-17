// Campaign state, kept apart from brand onboarding.
//
// Onboarding confirms rules once; a campaign is a working document that gets
// filled in, sent, and often sent again. Different lifecycles, so different
// stores. The screen itself still lives in the onboarding store, because there
// is one router for the whole app.

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { blankCampaign, missingFrom, type CampaignInput } from '../data/campaign-form'
import { campaignPayload, pushCampaign, type PushOutcome } from './campaign-api'
import {
  deleteCampaign,
  loadCampaign,
  loadCampaigns,
  newCampaignId,
  saveCampaign,
  type SavedCampaign,
} from './campaign-storage'
import { useStore } from './store'

/** How far a campaign got, which is also where resuming it lands. */
export type CampaignStage = 'form' | 'sent'

export interface CampaignState {
  /** Null until a campaign is started, which is also what makes it saveable. */
  id: string | null
  stage: CampaignStage
  input: CampaignInput
  /** In-progress text for the audience field's "add one" input. */
  draft: string
  sentAt: string | null
  outcome: PushOutcome | null
}

interface CampaignStore {
  state: CampaignState
  /** What still has to be answered before the campaign can be sent. */
  missing: string[]
  pushing: boolean
  /** Drafts on disk, newest first. */
  saved: SavedCampaign[]
  start: () => void
  resume: (id: string) => void
  discard: (id: string) => void
  set: <K extends keyof CampaignInput>(key: K, value: CampaignInput[K]) => void
  toggle: (key: 'markets' | 'channels', value: string) => void
  setDraft: (value: string) => void
  addAudience: () => void
  removeAudience: (index: number) => void
  send: () => void
  reset: () => void
}

function initialState(): CampaignState {
  return { id: null, stage: 'form', input: blankCampaign(), draft: '', sentAt: null, outcome: null }
}

const SCREEN_FOR_STAGE: Record<CampaignStage, 'campaign' | 'campaign-sent'> = {
  form: 'campaign',
  sent: 'campaign-sent',
}

const CampaignContext = createContext<CampaignStore | null>(null)

export function CampaignProvider({ children }: { children: ReactNode }) {
  const { go } = useStore()
  const [state, setState] = useState<CampaignState>(initialState)
  const [saved, setSaved] = useState<SavedCampaign[]>(() => loadCampaigns())
  const [pushing, setPushing] = useState(false)
  const run = useRef<AbortController | null>(null)

  useEffect(() => () => run.current?.abort(), [])

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

  const send = useCallback(() => {
    run.current?.abort()
    const controller = new AbortController()
    run.current = controller
    setPushing(true)

    pushCampaign(campaignPayload(state.input), controller.signal).then((outcome) => {
      if (controller.signal.aborted) return
      setPushing(false)
      patch({
        outcome,
        sentAt: outcome.status === 'failed' ? null : new Date().toISOString(),
        stage: outcome.status === 'failed' ? 'form' : 'sent',
      })
      if (outcome.status !== 'failed') go('campaign-sent')
    })
  }, [go, patch, state.input])

  const store: CampaignStore = {
    state,
    missing: missingFrom(state.input),
    pushing,
    saved,
    start: useCallback(() => {
      run.current?.abort()
      setState({ ...initialState(), id: newCampaignId() })
      go('campaign')
    }, [go]),
    resume: useCallback(
      (id) => {
        const record = loadCampaign(id)
        if (!record) return
        run.current?.abort()
        setState(record.state)
        go(SCREEN_FOR_STAGE[record.state.stage])
      },
      [go],
    ),
    discard: useCallback((id) => {
      deleteCampaign(id)
      setSaved(loadCampaigns())
      // Deleting the campaign being edited stops the autosave putting it back.
      setState((s) => (s.id === id ? initialState() : s))
    }, []),
    set: useCallback(
      (key, value) => patch((s) => ({ input: { ...s.input, [key]: value }, outcome: null })),
      [patch],
    ),
    toggle: useCallback(
      (key, value) =>
        patch((s) => ({
          input: {
            ...s.input,
            [key]: s.input[key].includes(value)
              ? s.input[key].filter((item) => item !== value)
              : [...s.input[key], value],
          },
          outcome: null,
        })),
      [patch],
    ),
    setDraft: useCallback((draft) => patch({ draft }), [patch]),
    addAudience: useCallback(
      () =>
        patch((s) => {
          const value = s.draft.trim()
          if (!value || s.input.audiences.includes(value)) return { draft: '' }
          return { input: { ...s.input, audiences: [...s.input.audiences, value] }, draft: '' }
        }),
      [patch],
    ),
    removeAudience: useCallback(
      (index) =>
        patch((s) => ({
          input: { ...s.input, audiences: s.input.audiences.filter((_, i) => i !== index) },
        })),
      [patch],
    ),
    send,
    reset: useCallback(() => {
      run.current?.abort()
      setState(initialState())
    }, []),
  }

  return <CampaignContext.Provider value={store}>{children}</CampaignContext.Provider>
}

export function useCampaign(): CampaignStore {
  const store = useContext(CampaignContext)
  if (!store) throw new Error('useCampaign must be used inside <CampaignProvider>')
  return store
}
