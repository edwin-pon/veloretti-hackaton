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
  BRANDS,
  DEFS,
  DOC_ORDER,
  substitute,
  type Brand,
  type DocField,
  type DocKey,
} from '../data/docs'
import { analyseDocument, seedAllValues } from './api'
import type { AppState, DoneMap, FieldValue, Screen } from './types'

function initialState(): AppState {
  return {
    screen: 'hub',
    doc: 'brand',
    brandKey: BRANDS[0].key,
    upload: null,
    brandsOpen: false,
    doneByBrand: Object.fromEntries(BRANDS.map((b) => [b.key, {} as DoneMap])),
    progress: 0,
    values: seedAllValues(BRANDS[0]),
    touched: {},
    why: null,
    drafts: {},
    error: null,
  }
}

export interface FieldStatus {
  label: 'Edited' | 'Needs review' | 'Extracted'
  /** Maps to the design system's Badge variants. */
  variant: 'outline' | 'accent' | 'neutral'
}

interface Store {
  state: AppState
  brand: Brand
  /** Documents confirmed for the brand currently selected. */
  done: DoneMap
  doneCount: number
  allDone: boolean
  go: (screen: Screen, patch?: Partial<AppState>) => void
  selectBrand: (key: string) => void
  toggleBrands: () => void
  openDoc: (doc: DocKey) => void
  pickFile: (file?: File) => void
  removeFile: () => void
  startAnalysis: () => void
  setValue: (key: string, value: FieldValue) => void
  setDraft: (key: string, value: string) => void
  addChip: (key: string) => void
  removeChip: (key: string, index: number) => void
  toggleWhy: (key: string) => void
  approve: () => void
  reset: () => void
  fieldStatus: (field: DocField) => FieldStatus
}

const StoreContext = createContext<Store | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(initialState)
  const analysis = useRef<AbortController | null>(null)

  useEffect(() => () => analysis.current?.abort(), [])

  const patch = useCallback((update: Partial<AppState> | ((s: AppState) => Partial<AppState>)) => {
    setState((s) => ({ ...s, ...(typeof update === 'function' ? update(s) : update) }))
  }, [])

  const brand = useMemo(
    () => BRANDS.find((b) => b.key === state.brandKey) ?? BRANDS[0],
    [state.brandKey],
  )
  const done = state.doneByBrand[state.brandKey] ?? {}
  const doneCount = DOC_ORDER.filter((key) => done[key]).length
  const allDone = doneCount === DOC_ORDER.length

  const go = useCallback<Store['go']>(
    (screen, extra) => patch({ screen, brandsOpen: false, ...extra }),
    [patch],
  )

  const selectBrand = useCallback<Store['selectBrand']>(
    (key) => {
      analysis.current?.abort()
      const next = BRANDS.find((b) => b.key === key) ?? BRANDS[0]
      patch({
        brandKey: key,
        brandsOpen: false,
        screen: 'hub',
        doc: 'brand',
        upload: null,
        why: null,
        touched: {},
        drafts: {},
        error: null,
        values: seedAllValues(next),
      })
    },
    [patch],
  )

  const openDoc = useCallback<Store['openDoc']>(
    (doc) => {
      const isDone = !!(state.doneByBrand[state.brandKey] ?? {})[doc]
      patch({ doc, screen: isDone ? 'review' : 'upload', upload: null, why: null, error: null })
    },
    [patch, state.brandKey, state.doneByBrand],
  )

  const pickFile = useCallback<Store['pickFile']>(
    (file) => {
      const doc = DEFS[state.doc]
      patch({
        error: null,
        upload: file
          ? { name: file.name, meta: formatBytes(file.size), file }
          : { name: substitute(doc.file, brand), meta: doc.size },
      })
    },
    [brand, patch, state.doc],
  )

  const startAnalysis = useCallback(() => {
    analysis.current?.abort()
    const controller = new AbortController()
    analysis.current = controller

    // Read the document off state at call time; the run is keyed to it.
    const doc = state.doc
    const upload = state.upload
    patch({ screen: 'analyzing', progress: 0, error: null })

    analyseDocument({
      brand,
      doc,
      fileName: upload?.name ?? substitute(DEFS[doc].file, brand),
      file: upload?.file,
      signal: controller.signal,
      onProgress: (progress) => patch({ progress }),
    })
      .then((result) => {
        if (controller.signal.aborted) return
        patch((s) => ({
          screen: 'review',
          progress: 100,
          values: { ...s.values, ...result.values },
        }))
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return
        patch({
          screen: 'upload',
          progress: 0,
          error: error instanceof Error ? error.message : 'Analysis failed',
        })
      })
  }, [brand, patch, state.doc, state.upload])

  const setValue = useCallback<Store['setValue']>(
    (key, value) =>
      patch((s) => ({
        values: { ...s.values, [key]: value },
        touched: { ...s.touched, [key]: true },
      })),
    [patch],
  )

  const setDraft = useCallback<Store['setDraft']>(
    (key, value) => patch((s) => ({ drafts: { ...s.drafts, [key]: value } })),
    [patch],
  )

  const addChip = useCallback<Store['addChip']>(
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

  const removeChip = useCallback<Store['removeChip']>(
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

  const approve = useCallback(() => {
    patch((s) => {
      const brandDone: DoneMap = { ...(s.doneByBrand[s.brandKey] ?? {}), [s.doc]: true }
      const next = DOC_ORDER.find((key) => !brandDone[key])
      return {
        doneByBrand: { ...s.doneByBrand, [s.brandKey]: brandDone },
        screen: next ? 'hub' : 'dashboard',
        doc: next ?? s.doc,
        upload: null,
        why: null,
      }
    })
  }, [patch])

  const reset = useCallback(() => {
    analysis.current?.abort()
    patch((s) => ({
      screen: 'hub',
      doc: 'brand',
      upload: null,
      touched: {},
      drafts: {},
      why: null,
      brandsOpen: false,
      error: null,
      progress: 0,
      values: seedAllValues(brand),
      doneByBrand: { ...s.doneByBrand, [s.brandKey]: {} },
    }))
  }, [brand, patch])

  const fieldStatus = useCallback<Store['fieldStatus']>(
    (field) => {
      if (state.touched[field.key]) return { label: 'Edited', variant: 'outline' }
      if (field.conf < 80) return { label: 'Needs review', variant: 'accent' }
      return { label: 'Extracted', variant: 'neutral' }
    },
    [state.touched],
  )

  const store: Store = {
    state,
    brand,
    done,
    doneCount,
    allDone,
    go,
    selectBrand,
    toggleBrands: useCallback(() => patch((s) => ({ brandsOpen: !s.brandsOpen })), [patch]),
    openDoc,
    pickFile,
    removeFile: useCallback(() => patch({ upload: null }), [patch]),
    startAnalysis,
    setValue,
    setDraft,
    addChip,
    removeChip,
    toggleWhy: useCallback(
      (key) => patch((s) => ({ why: s.why === key ? null : key })),
      [patch],
    ),
    approve,
    reset,
    fieldStatus,
  }

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  const mb = bytes / (1024 * 1024)
  return mb >= 1 ? `${mb.toFixed(1)} MB` : `${Math.round(bytes / 1024)} KB`
}

export function useStore(): Store {
  const store = useContext(StoreContext)
  if (!store) throw new Error('useStore must be used inside <StoreProvider>')
  return store
}

/** Confidence counts for the document currently under review. */
export function useReviewStats(doc: DocKey) {
  const { state } = useStore()
  return useMemo(() => {
    const fields = DEFS[doc].sections.flatMap((section) => section.fields)
    const needReview = fields.filter((f) => f.conf < 80 && !state.touched[f.key]).length
    const average = Math.round(fields.reduce((sum, f) => sum + f.conf, 0) / fields.length)
    return { total: fields.length, needReview, average }
  }, [doc, state.touched])
}
