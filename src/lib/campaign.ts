// The Campaign object a growth briefing resolves to, and the slot that is the
// atomic deliverable. Modelled on docs/growth-briefing-blueprint.md (§2.1).
//
// Two things in here are load-bearing and easy to get wrong:
//
//   1. The offer is a mode, not a percentage. "No discount unless behind on
//      target" is the mechanic; a baked-in 15% cannot express it.
//   2. Language is derived from market, never entered separately, and the flight
//      date lives on the market's region rather than on the campaign.

import type {
  AssetType,
  FocusPoint,
  LanguageKey,
  MarketKey,
  NewsletterIntent,
  OfferMode,
  PhaseKey,
  PlatformKey,
  PropositionTreatment,
  Ratio,
  ScopeStatus,
  Surface,
  TrackKey,
  TrustLever,
} from '../data/vocab'

export interface CampaignMeta {
  name: string
  productLine: string
  year: string
  /** Shared by every market. Regional stagger lives on the market's regions. */
  window: { start: string; end: string }
}

export interface Concept {
  /** The campaign's own reframe, e.g. "Back to school" into "Return to routine". */
  reframeFrom: string
  reframeTo: string
  contextCues: string[]
  campaignLine: string
  slogans: string[]
  valueProp: string
  proofPoints: string[]
  /** Aspiration over discount, or the other way round. Drives the offer gate. */
  posture: string
}

export interface Offer {
  mode: OfferMode
  /** Single-sourced. Every surface reads its percentage from here and nowhere else. */
  pct: number
  /** What flips the mode, stated as a rule rather than as prose. */
  condition: string
  code: string | null
  /**
   * Percentages found elsewhere in the source. The source says 15% in the
   * concept and -10% on every ad sticker; the consistency gate reads this.
   */
  statedElsewhere: Array<{ pct: number; where: string }>
}

export interface Region {
  name: string
  /** In-market date, ISO. NL staggers by region; BE and DE run the window only. */
  inMarketDate: string
}

export interface Market {
  key: MarketKey
  language: LanguageKey
  regions: Region[]
}

export interface Proposition {
  line: string
  headline: string
  body: string
  offerHook: string
  products: string[]
  treatment: PropositionTreatment
  surfaces: Surface[]
}

/**
 * One row of the channel plan: a track in a phase on a platform, and the
 * dimensions it is briefed across. Resolving expands these into slots.
 */
export interface ChannelEntry {
  id: string
  track: TrackKey
  phase: PhaseKey
  platform: PlatformKey
  ratios: Ratio[]
  markets: MarketKey[]
  focusPoints: FocusPoint[]
  assetTypes: AssetType[]
  /** Subset of the phase's treatments. Empty means all of them. */
  treatments: string[]
  status: ScopeStatus
  note?: string
}

export interface Campaign {
  meta: CampaignMeta
  concept: Concept
  offer: Offer
  trustLevers: TrustLever[]
  markets: Market[]
  propositions: Proposition[]
  channelPlan: ChannelEntry[]
  newsletterIntents: NewsletterIntent[]
}

/** The brief a slot resolves to. Composed by templating, never by a model call. */
export interface SlotBrief {
  concept: string
  angle: string
  treatment: string
  /** Null in SEE, which runs a slogan instead. */
  offerTreatment: string | null
  slogan: string | null
  cta: string
  logo: true
}

export interface Slot {
  /** Deterministic name, also the export filename. */
  id: string
  entryId: string
  track: TrackKey
  phase: PhaseKey
  platform: PlatformKey
  ratio: Ratio
  market: MarketKey
  language: LanguageKey
  assetType: AssetType
  focusPoint: FocusPoint
  status: ScopeStatus
  /** Driven by the market's region, so the regional stagger reaches deliverables. */
  flightDate: string
  brief: SlotBrief
}

export type GateSeverity = 'blocking' | 'warning' | 'info'

export interface GateResult {
  id: string
  label: string
  severity: GateSeverity
  passed: boolean
  detail: string
  /** Slot ids the gate flags, where it flags slots at all. */
  affected: string[]
}
