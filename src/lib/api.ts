import { DEFS, type DocKey } from '../data/docs'
import type { FieldValue } from './types'

/**
 * The single seam between the front end and the backend.
 *
 * With `VITE_N8N_ANALYSE_URL` set, document analysis is POSTed to that n8n
 * webhook and the extracted field values come back from there. Without it the
 * call falls back to the values baked into the Design Canvas prototype and
 * fakes the timing, so the flow stays demoable offline.
 */
const ANALYSE_URL = import.meta.env.VITE_N8N_ANALYSE_URL as string | undefined

/** How long the simulated analysis takes, in ms. Roughly the prototype's pace. */
const SIMULATED_DURATION = 3000
const PROGRESS_TICK = 90

export interface AnalyseResult {
  /** Field key → extracted value. Keys match `DocField.key` in data/docs.ts. */
  values: Record<string, FieldValue>
  /** Field key → confidence 0-100. Absent keys keep the prototype's score. */
  confidence?: Record<string, number>
}

export interface AnalyseOptions {
  doc: DocKey
  fileName: string
  /** The bytes the user picked. Absent when the sample document was used. */
  file?: File
  onProgress?: (pct: number) => void
  signal?: AbortSignal
}

export const usingLiveBackend = Boolean(ANALYSE_URL)

/** The prototype's own extraction output, used as the offline fallback. */
export function seedValues(doc: DocKey): Record<string, FieldValue> {
  const values: Record<string, FieldValue> = {}
  for (const section of DEFS[doc].sections) {
    for (const field of section.fields) {
      values[field.key] = Array.isArray(field.value) ? [...field.value] : field.value
    }
  }
  return values
}

/** Seeds every document at once — used for the initial state and on reset. */
export function seedAllValues(): Record<string, FieldValue> {
  return Object.assign({}, ...(Object.keys(DEFS) as DocKey[]).map(seedValues))
}

export async function analyseDocument(options: AnalyseOptions): Promise<AnalyseResult> {
  const { doc, fileName, file, onProgress, signal } = options

  if (!ANALYSE_URL) {
    await simulateProgress(onProgress, signal)
    return { values: seedValues(doc) }
  }

  // Report indeterminate progress while the webhook runs; n8n gives us no
  // intermediate signal, so this is a paced estimate rather than a real one.
  const stopTicking = tickTowards(90, onProgress, signal)
  try {
    // Send multipart when there are real bytes so the n8n workflow can read the
    // document; fall back to JSON metadata when the sample document was used.
    const body = file ? new FormData() : JSON.stringify({ doc, fileName })
    if (body instanceof FormData) {
      body.append('doc', doc)
      body.append('fileName', fileName)
      body.append('document', file as File, fileName)
    }

    const response = await fetch(ANALYSE_URL, {
      method: 'POST',
      headers: file ? undefined : { 'content-type': 'application/json' },
      body,
      signal,
    })
    if (!response.ok) {
      throw new Error(`Analysis failed: ${response.status} ${response.statusText}`)
    }
    const result = (await response.json()) as AnalyseResult
    if (!result?.values) {
      throw new Error('Analysis response did not include any field values')
    }
    onProgress?.(100)
    return result
  } finally {
    stopTicking()
  }
}

export function simulateProgress(onProgress?: (pct: number) => void, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) return reject(abortError())
    let progress = 0
    const step = Math.ceil(100 / (SIMULATED_DURATION / PROGRESS_TICK))
    const timer = setInterval(() => {
      if (signal?.aborted) {
        clearInterval(timer)
        return reject(abortError())
      }
      progress = Math.min(100, progress + step)
      onProgress?.(progress)
      if (progress >= 100) {
        clearInterval(timer)
        resolve()
      }
    }, PROGRESS_TICK)
  })
}

/** Creeps progress towards `ceiling` so a live call still feels responsive. */
export function tickTowards(ceiling: number, onProgress?: (pct: number) => void, signal?: AbortSignal) {
  let progress = 0
  const timer = setInterval(() => {
    if (signal?.aborted) return clearInterval(timer)
    progress = Math.min(ceiling, progress + 2)
    onProgress?.(progress)
    if (progress >= ceiling) clearInterval(timer)
  }, PROGRESS_TICK)
  return () => clearInterval(timer)
}

export function abortError() {
  return new DOMException('Analysis cancelled', 'AbortError')
}
