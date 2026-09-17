// Handing a campaign to n8n.
//
// Two n8n behaviours decide what the user sees, and both are reported rather
// than smoothed over:
//
//   * a production webhook (`/webhook/...`) answers only while its workflow is
//     active; a test one (`/webhook-test/...`) only after someone clicks
//     "Execute workflow", and then only once. Both return the same 404.
//   * without allowed origins set on the Webhook node, the browser is refused
//     the *response* even though the request arrives. The call then falls back
//     to a mode the browser permits and says it cannot confirm delivery.

import type { CampaignInput } from '../data/campaign-form'

const CAMPAIGN_URL = import.meta.env.VITE_N8N_CAMPAIGN_URL as string | undefined

export const campaignWebhook = CAMPAIGN_URL

export interface CampaignPayload {
  campaignName: string
  description: string
  markets: string[]
  channels: string[]
  audiences: string[]
  bikeModel: string
  submittedAt: string
}

export type PushOutcome =
  | { status: 'ok'; detail: string }
  | { status: 'sent-unconfirmed'; detail: string }
  | { status: 'failed'; detail: string }

const NOT_REGISTERED =
  'n8n says the webhook is not registered. A production webhook answers only while its workflow is active; a test one only after "Execute workflow" is clicked, and then once.'

export function campaignPayload(input: CampaignInput): CampaignPayload {
  return {
    campaignName: input.name.trim(),
    description: input.description.trim(),
    markets: input.markets,
    channels: input.channels,
    audiences: input.audiences,
    bikeModel: input.bikeModel,
    submittedAt: new Date().toISOString(),
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
    if (response.ok) return { status: 'ok', detail: 'n8n accepted the campaign.' }
    if (response.status === 404) return { status: 'failed', detail: NOT_REGISTERED }
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
