// Controlled vocabularies for campaign intake, lifted verbatim from the growth
// briefing blueprint in docs/growth-briefing-blueprint.md (§2.2).
//
// These are closed sets on purpose. The briefing's own layer names were stale
// copies of a previous campaign, so the flow trusts only the vocabulary below:
// a phase decides its own angle and CTA, and a platform decides which ratios
// and phases it can appear in. Nothing here is free text.

export type PhaseKey = 'SEE' | 'THINK' | 'DO'
export type PlatformKey = 'google' | 'meta' | 'tiktok'
export type Ratio = '1x1' | '4x5' | '1.91x1' | '9x16'
export type MarketKey = 'NL' | 'BE' | 'DE'
export type LanguageKey = 'NL' | 'ENG' | 'DE'
export type TrackKey = 'X' | 'Electric'
export type FocusPoint = 'Review' | 'USP' | 'Electric Two' | 'City' | 'Kids'
export type AssetType =
  | 'Image'
  | 'Render'
  | 'Lifestyle'
  | 'Lifestyle (zoomed-in)'
  | 'Video, 6s'
  | 'Video, 15s'

/** Whether a slot group is agreed, still under discussion, or explicitly optional. */
export type ScopeStatus = 'confirmed' | 'optional' | 'tbd'

/** The offer is a switchable state, never a baked-in percentage. */
export type OfferMode = 'aspiration' | 'discount'

export interface PhaseDef {
  key: PhaseKey
  /** The awareness transition, verbatim from the briefing. */
  transition: string
  /** The only CTA permitted in this phase. Never invented, never translated here. */
  cta: string
  /** Creative treatments briefed for this phase. */
  treatments: string[]
  /** Offer treatments allowed. Empty in SEE, which carries a slogan instead. */
  offerTreatments: string[]
}

export const PHASE_ORDER: PhaseKey[] = ['SEE', 'THINK', 'DO']

export const PHASES: Record<PhaseKey, PhaseDef> = {
  SEE: {
    key: 'SEE',
    transition: 'Unaware > Solution aware',
    cta: 'Get inspired',
    treatments: ['Summer image', 'Summer video'],
    offerTreatments: [],
  },
  THINK: {
    key: 'THINK',
    transition: 'Solution aware > Product aware',
    cta: 'Discover now',
    treatments: [
      'Review - zoomed in product focus (no render)',
      'USP 1 - Render images, focussed on the value and urgency of the offer',
      'USP 2 - Summer/fall images, focussed on the value and urgency of the offer',
    ],
    offerTreatments: ['Sale sticker (-{pct}%)', 'From €x to €xx price'],
  },
  DO: {
    key: 'DO',
    transition: 'Product aware > Most aware',
    cta: 'Buy now',
    treatments: [
      'Klarna focus - 3 interest free payments with',
      'Klarna logo - Pay later with Klarna',
      'Review focus',
      'Warranty focus',
    ],
    offerTreatments: ['Sale sticker (-{pct}%)', 'From €x to €xx price'],
  },
}

/**
 * The funnel angle is fixed per phase. SEE is the exception: it splits by focus
 * point, because a City ad and a Kids ad argue different things.
 */
export const ANGLES: Record<PhaseKey, string> = {
  SEE: 'Focus on value of City bikes with carrier & basket on your lifestyle',
  THINK: 'Focus on added value of free bundle/accessories',
  DO: 'Focus on Klarna, availability, trust and the offer (value of €x)',
}

export const SEE_ANGLE_BY_FOCUS: Partial<Record<FocusPoint, string>> = {
  City: 'Focus on value of City bikes with carrier & basket on your lifestyle',
  Kids: 'Focus on value of kids bikes',
}

/** SEE carries no offer, so it runs a slogan in the offer's place. */
export const SEE_SLOGAN_BY_FOCUS: Partial<Record<FocusPoint, string>> = {
  City: 'At the speed of life',
  Kids: '+ Slogan',
}

export interface PlatformDef {
  key: PlatformKey
  label: string
  ratios: Ratio[]
  phases: PhaseKey[]
}

/**
 * Which ratios a platform runs, and which phases it is briefed for. Pinterest,
 * Snapchat and LinkedIn appear nowhere in the source and are not offered.
 */
export const PLATFORMS: Record<PlatformKey, PlatformDef> = {
  google: { key: 'google', label: 'Google', ratios: ['1x1', '4x5', '1.91x1', '9x16'], phases: ['THINK', 'DO'] },
  meta: { key: 'meta', label: 'Meta', ratios: ['1x1', '9x16'], phases: ['SEE', 'THINK', 'DO'] },
  tiktok: { key: 'tiktok', label: 'TikTok', ratios: ['9x16'], phases: ['SEE'] },
}

export const PLATFORM_ORDER: PlatformKey[] = ['google', 'meta', 'tiktok']

/** Ratio as a width/height fraction, so rendered dimensions can be checked against it. */
export const RATIO_VALUE: Record<Ratio, number> = {
  '1x1': 1,
  '4x5': 4 / 5,
  '1.91x1': 1.91,
  '9x16': 9 / 16,
}

/**
 * Language derives from market. It is not an independent axis: resolve the
 * market and the language follows. Belgium runs English, so there is no French.
 */
export const MARKET_LANGUAGE: Record<MarketKey, LanguageKey> = {
  NL: 'NL',
  BE: 'ENG',
  DE: 'DE',
}

export const MARKET_LABEL: Record<MarketKey, string> = {
  NL: 'Netherlands',
  BE: 'Belgium',
  DE: 'Germany',
}

export const MARKET_ORDER: MarketKey[] = ['NL', 'BE', 'DE']

export const TRACKS: TrackKey[] = ['X', 'Electric']

export const FOCUS_POINTS: FocusPoint[] = ['Review', 'USP', 'Electric Two', 'City', 'Kids']

export const ASSET_TYPES: AssetType[] = [
  'Image',
  'Render',
  'Lifestyle',
  'Lifestyle (zoomed-in)',
  'Video, 6s',
  'Video, 15s',
]

export const PROPOSITION_TREATMENTS = ['plain_section', 'full_bleed_text_media', 'carousel'] as const
export type PropositionTreatment = (typeof PROPOSITION_TREATMENTS)[number]

export const NEWSLETTER_INTENTS = ['campaign_intro', 'urgency_last_24h'] as const
export type NewsletterIntent = (typeof NEWSLETTER_INTENTS)[number]

export const SURFACES = ['ads', 'landing_page', 'newsletter', 'pdp'] as const
export type Surface = (typeof SURFACES)[number]

export const TRUST_LEVERS = [
  'klarna_instalments',
  'klarna_pay_later',
  'reviews',
  'warranty',
] as const
export type TrustLever = (typeof TRUST_LEVERS)[number]

/** Brand tokens read off the source file. The brand gate checks against these. */
export const BRAND_TOKENS = {
  colors: ['#2a2926', '#d9d7d4', '#f5f5f4', '#ffffff'],
  typeface: 'PP Neue Montreal',
  spacing: [4, 8, 12, 16, 24, 32],
}

export function isPlatformValidForPhase(platform: PlatformKey, phase: PhaseKey): boolean {
  return PLATFORMS[platform].phases.includes(phase)
}

export function isRatioValidForPlatform(platform: PlatformKey, ratio: Ratio): boolean {
  return PLATFORMS[platform].ratios.includes(ratio)
}

/** The angle a slot argues, given its phase and what it puts in focus. */
export function angleFor(phase: PhaseKey, focus: FocusPoint): string {
  if (phase === 'SEE') return SEE_ANGLE_BY_FOCUS[focus] ?? ANGLES.SEE
  return ANGLES[phase]
}
