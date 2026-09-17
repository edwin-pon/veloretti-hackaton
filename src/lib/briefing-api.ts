// The backend seam for campaign intake, alongside the one api.ts provides for
// brand onboarding.
//
// With `VITE_N8N_BRIEFING_URL` set, the growth briefing is POSTed to that n8n
// webhook and the extracted values come back from there. Without it the call
// falls back to the Back to School 2026 seed in data/briefing.ts and fakes the
// timing, so the flow stays demoable offline.

import { BRIEFING, seedBriefValues, type BriefValue } from '../data/briefing'
import type { ChannelEntry, Market, Proposition } from './campaign'
import { simulateProgress, tickTowards } from './api'

const BRIEFING_URL = import.meta.env.VITE_N8N_BRIEFING_URL as string | undefined

export const usingLiveBriefingBackend = Boolean(BRIEFING_URL)

export interface AnalyseBriefingRequest {
  fileName: string
  /** The bytes the user picked. Absent when they accepted the stand-in briefing. */
  file?: File
}

export interface AnalyseBriefingResult {
  /** Field key to extracted value. Keys match `BriefField.key` in data/briefing.ts. */
  values: Record<string, BriefValue>
  /** Field key to confidence 0-100. Absent keys keep the seed's score. */
  confidence?: Record<string, number>
  /** Tables the intake edits as tables rather than as fields. */
  markets?: Market[]
  channelPlan?: ChannelEntry[]
  propositions?: Proposition[]
}

export interface AnalyseBriefingOptions extends AnalyseBriefingRequest {
  onProgress?: (pct: number) => void
  signal?: AbortSignal
}

export async function analyseBriefing(
  options: AnalyseBriefingOptions,
): Promise<AnalyseBriefingResult> {
  const { fileName, file, onProgress, signal } = options

  if (!BRIEFING_URL) {
    await simulateProgress(onProgress, signal)
    return {
      values: seedBriefValues(),
      markets: BRIEFING.markets,
      channelPlan: BRIEFING.channelPlan,
      propositions: BRIEFING.propositions,
    }
  }

  const stopTicking = tickTowards(90, onProgress, signal)
  try {
    // Multipart when there are real bytes, JSON metadata when the stand-in
    // briefing was used. Same contract as the brand-document webhook.
    const body = file ? new FormData() : JSON.stringify({ fileName })
    if (body instanceof FormData) {
      body.append('fileName', fileName)
      body.append('briefing', file as File, fileName)
    }

    const response = await fetch(BRIEFING_URL, {
      method: 'POST',
      headers: file ? undefined : { 'content-type': 'application/json' },
      body,
      signal,
    })
    if (!response.ok) {
      throw new Error(`Reading the briefing failed: ${response.status} ${response.statusText}`)
    }
    const result = (await response.json()) as AnalyseBriefingResult
    if (!result?.values) {
      throw new Error('The briefing response did not include any field values')
    }
    onProgress?.(100)
    return result
  } finally {
    stopTicking()
  }
}
