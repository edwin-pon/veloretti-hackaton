// Handing a resolved campaign to n8n.
//
// The payload keeps `campaign` and `slots` byte-identical to the JSON the
// handoff screen downloads, because that file is what the n8n flow was built
// against. Anything extra is added under its own key so a mapping built on the
// sample keeps working.
//
// Two things about this call are worth knowing before reading the code:
//
//   * n8n's *test* webhooks (`/webhook-test/...`) only accept a call after
//     someone clicks "Execute workflow", and only one. A production webhook
//     (`/webhook/...`) has neither limit.
//   * n8n sends no CORS headers unless the Webhook node's allowed origins are
//     set, so a browser is usually refused the *response* even though the
//     request itself arrives. That is why this falls back to an opaque send
//     and reports what it can and cannot know.

import type { Campaign, GateResult, Slot } from './campaign'
import type { MatrixSummary } from './matrix'

const CAMPAIGN_URL = import.meta.env.VITE_N8N_CAMPAIGN_URL as string | undefined

export const campaignWebhook = CAMPAIGN_URL

export interface CampaignPayload {
  /** Same shape as the downloaded JSON, so an existing mapping still fits. */
  campaign: Campaign['meta']
  slots: Slot[]
  summary: MatrixSummary
  gates: GateResult[]
  exportedAt: string
}

export type PushOutcome =
  | { status: 'ok'; detail: string }
  | { status: 'sent-unconfirmed'; detail: string }
  | { status: 'failed'; detail: string }

export function campaignPayload(
  campaign: Campaign,
  slots: Slot[],
  summary: MatrixSummary,
  gates: GateResult[],
): CampaignPayload {
  return {
    campaign: campaign.meta,
    slots,
    summary,
    gates,
    exportedAt: new Date().toISOString(),
  }
}

export async function pushCampaign(
  payload: CampaignPayload,
  signal?: AbortSignal,
): Promise<PushOutcome> {
  if (!CAMPAIGN_URL) {
    return { status: 'failed', detail: 'No webhook is configured. Set VITE_N8N_CAMPAIGN_URL.' }
  }

  const body = JSON.stringify(payload)

  try {
    const response = await fetch(CAMPAIGN_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body,
      signal,
    })
    if (response.ok) {
      return { status: 'ok', detail: `n8n accepted ${payload.slots.length} slots.` }
    }
    if (response.status === 404) {
      return {
        status: 'failed',
        detail:
          'n8n says the webhook is not registered. A test webhook only listens after "Execute workflow" is clicked, and only for one call.',
      }
    }
    return { status: 'failed', detail: `n8n replied ${response.status} ${response.statusText}.` }
  } catch {
    // A CORS refusal and a dead network look the same from here, so send it
    // again in a mode the browser allows and be plain about what that proves.
    try {
      await fetch(CAMPAIGN_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'content-type': 'text/plain;charset=UTF-8' },
        body,
        signal,
      })
      return {
        status: 'sent-unconfirmed',
        detail:
          'Sent, but the browser was not allowed to read the reply, so this cannot confirm it arrived. Set the allowed origins on the n8n Webhook node to confirm it here.',
      }
    } catch {
      return { status: 'failed', detail: 'The webhook could not be reached.' }
    }
  }
}
