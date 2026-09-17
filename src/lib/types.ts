import type { DocKey } from '../data/docs'

/** Brand onboarding, then the campaign track. The asset canvas lands here later. */
export type Screen =
  | 'hub'
  | 'upload'
  | 'analyzing'
  | 'review'
  | 'dashboard'
  | 'campaigns'
  | 'brief'
  | 'brief-upload'
  | 'brief-analyzing'
  | 'matrix'

export type FieldValue = string | string[] | boolean

/** Which of the three source documents have been confirmed. */
export type DoneMap = Partial<Record<DocKey, boolean>>

export interface PickedDocument {
  name: string
  /** Human-readable size, e.g. "4.8 MB". Page count is unknown for real files. */
  meta: string
  /** Absent when the sample document was used. */
  file?: File
}

export interface AppState {
  screen: Screen
  doc: DocKey
  /** The document picked on the upload screen, not yet analysed. */
  upload: PickedDocument | null
  done: DoneMap
  progress: number
  /** Current (possibly edited) value of every extracted field, keyed by field key. */
  values: Record<string, FieldValue>
  /** Field keys the user has edited — these stop counting as "needs review". */
  touched: Record<string, boolean>
  /** Field key whose agent reasoning is expanded, if any. */
  why: string | null
  /** In-progress text for each chip field's "add an item" input. */
  drafts: Record<string, string>
  error: string | null
}
