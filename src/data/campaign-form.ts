// The campaign intake, as six questions.
//
// An earlier version read a growth briefing and resolved it into a slot matrix
// here in the front end. That moved to n8n: the studio now asks what the
// campaign is and hands the answers over, and the thinking happens on the other
// side of the webhook.

export const MARKETS = [
  { key: 'NL', label: 'Netherlands' },
  { key: 'BE', label: 'Belgium' },
] as const

export const CHANNELS = [
  { key: 'Meta', label: 'Meta' },
  { key: 'Google', label: 'Google' },
  { key: 'TikTok', label: 'TikTok' },
] as const

/** One model for now. It stays a list because the next one is a matter of time. */
export const BIKE_MODELS = ['Ace Two'] as const

export interface CampaignInput {
  name: string
  description: string
  markets: string[]
  channels: string[]
  audiences: string[]
  bikeModel: string
}

export function blankCampaign(): CampaignInput {
  return {
    name: '',
    description: '',
    markets: [],
    channels: [],
    audiences: [],
    bikeModel: BIKE_MODELS[0],
  }
}

/** What has to be answered before there is anything worth sending. */
export function missingFrom(input: CampaignInput): string[] {
  const missing: string[] = []
  if (!input.name.trim()) missing.push('a campaign name')
  if (!input.description.trim()) missing.push('a description')
  if (!input.markets.length) missing.push('at least one market')
  if (!input.channels.length) missing.push('at least one channel')
  return missing
}
