// Stages [1] RESOLVE, [2] BRIEF and [7] QA from the blueprint pipeline.
//
// Everything in this file is deterministic: cross-product expansion, string
// templating and checks. No model calls. That is the whole point. The briefing
// it replaces held 458 hand-placed frames carrying 66 distinct briefs, which is
// a template with about four parameters rather than 458 pieces of writing.

import {
  MARKET_LABEL,
  MARKET_LANGUAGE,
  PHASES,
  PHASE_ORDER,
  PLATFORMS,
  angleFor,
  isPlatformValidForPhase,
  isRatioValidForPlatform,
  type MarketKey,
  type PhaseKey,
} from '../data/vocab'
import type {
  Campaign,
  ChannelEntry,
  GateResult,
  Market,
  Slot,
  SlotBrief,
} from './campaign'

export interface DroppedCombo {
  entryId: string
  reason: string
}

export interface ResolvedMatrix {
  slots: Slot[]
  /** Combinations the vocabulary forbids. Reported, never silently discarded. */
  dropped: DroppedCombo[]
}

/**
 * Expands the channel plan into the slot list.
 *
 * This is the cheapest intervention point in the flow: the list is meant to be
 * read and pruned by a human before anything is generated against it.
 */
export function resolveSlots(campaign: Campaign): ResolvedMatrix {
  const slots: Slot[] = []
  const dropped: DroppedCombo[] = []
  const marketsByKey = new Map(campaign.markets.map((m) => [m.key, m]))
  const seq = new Map<string, number>()

  for (const entry of campaign.channelPlan) {
    if (!isPlatformValidForPhase(entry.platform, entry.phase)) {
      dropped.push({
        entryId: entry.id,
        reason: `${PLATFORMS[entry.platform].label} is not briefed for ${entry.phase}`,
      })
      continue
    }

    const ratios = entry.ratios.filter((ratio) => {
      const valid = isRatioValidForPlatform(entry.platform, ratio)
      if (!valid) {
        dropped.push({
          entryId: entry.id,
          reason: `${PLATFORMS[entry.platform].label} does not run ${ratio}`,
        })
      }
      return valid
    })

    const markets = entry.markets.filter((key) => {
      if (marketsByKey.has(key)) return true
      dropped.push({ entryId: entry.id, reason: `${key} is not a market on this campaign` })
      return false
    })

    const phase = PHASES[entry.phase]
    const treatments = entry.treatments.length ? entry.treatments : phase.treatments
    const assetTypes = entry.assetTypes.length ? entry.assetTypes : ['Image' as const]

    // Walk the dimensions in a fixed order so the same plan always resolves to
    // the same slot list, ids included.
    let index = 0
    for (const ratio of ratios) {
      for (const marketKey of markets) {
        for (const focusPoint of entry.focusPoints) {
          for (const treatment of treatments) {
            const market = marketsByKey.get(marketKey) as Market
            const assetType = assetTypes[index % assetTypes.length]
            const offerTreatment = offerTreatmentFor(campaign, entry.phase, index)
            const id = slotId(
              {
                track: entry.track,
                phase: entry.phase,
                platform: entry.platform,
                ratio,
                language: market.language,
                assetType,
                focusPoint,
              },
              seq,
            )

            slots.push({
              id,
              entryId: entry.id,
              track: entry.track,
              phase: entry.phase,
              platform: entry.platform,
              ratio,
              market: marketKey,
              language: market.language,
              assetType,
              focusPoint,
              status: entry.status,
              flightDate: flightDateFor(market, campaign),
              brief: composeBrief(campaign, entry, {
                treatment,
                offerTreatment,
                focusPoint,
              }),
            })
            index += 1
          }
        }
      }
    }
  }

  return { slots, dropped }
}

/**
 * Stage [2]. Pure templating: the phase supplies the angle and the CTA, the
 * entry supplies the treatment, and the offer mode decides whether a price is
 * allowed on the asset at all.
 */
export function composeBrief(
  campaign: Campaign,
  entry: ChannelEntry,
  parts: { treatment: string; offerTreatment: string | null; focusPoint: Slot['focusPoint'] },
): SlotBrief {
  const phase = PHASES[entry.phase]
  return {
    concept: `Concept '${campaign.concept.campaignLine}'`,
    angle: angleFor(entry.phase, parts.focusPoint),
    treatment: parts.treatment,
    offerTreatment: parts.offerTreatment,
    slogan: entry.phase === 'SEE' ? sloganFor(campaign, parts.focusPoint) : null,
    cta: phase.cta,
    logo: true,
  }
}

/** Renders a brief in the six-part shape the source briefing used. */
export function briefText(brief: SlotBrief): string {
  return [
    brief.concept,
    brief.angle,
    '',
    brief.treatment,
    '',
    brief.offerTreatment ?? brief.slogan ?? '',
    '',
    'CTA button',
    brief.cta,
    '',
    'Logo',
  ].join('\n')
}

/** The handoff contract: one filename per slot, derived from the slot itself. */
export function slotId(
  parts: {
    track: string
    phase: string
    platform: string
    ratio: string
    language: string
    assetType: string
    focusPoint: string
  },
  seq: Map<string, number>,
): string {
  const stem = [
    parts.track,
    parts.phase,
    parts.platform,
    parts.ratio,
    parts.language,
    parts.assetType,
    parts.focusPoint,
  ]
    .map(slug)
    .join('_')
  const n = (seq.get(stem) ?? 0) + 1
  seq.set(stem, n)
  return `${stem}_${String(n).padStart(2, '0')}`
}

function slug(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9.]+/g, '-')
    .replace(/^-|-$/g, '')
}

function offerTreatmentFor(campaign: Campaign, phase: PhaseKey, index: number): string | null {
  // In aspiration mode no percentage may appear anywhere, in any phase.
  if (campaign.offer.mode === 'aspiration') return null
  const options = PHASES[phase].offerTreatments
  if (!options.length) return null
  return options[index % options.length].replace('{pct}', String(campaign.offer.pct))
}

function sloganFor(campaign: Campaign, focusPoint: Slot['focusPoint']): string | null {
  if (focusPoint === 'Kids') return campaign.concept.slogans[1] ?? campaign.concept.slogans[0] ?? null
  return campaign.concept.slogans[0] ?? null
}

/** Earliest in-market date for the market, falling back to the shared window. */
function flightDateFor(market: Market, campaign: Campaign): string {
  if (!market.regions.length) return campaign.meta.window.start
  return market.regions.map((r) => r.inMarketDate).sort()[0]
}

export interface MatrixSummary {
  total: number
  /** Unique briefs across the whole matrix, the "66 out of 458" number. */
  distinctBriefs: number
  byMarket: Array<{ key: MarketKey; label: string; count: number }>
  byPhase: Array<{ key: PhaseKey; count: number }>
  byPlatform: Array<{ key: string; label: string; count: number }>
  byTrack: Array<{ key: string; count: number }>
}

export function summarise(slots: Slot[]): MatrixSummary {
  const signature = (s: Slot) =>
    [s.phase, s.brief.treatment, s.brief.offerTreatment ?? s.brief.slogan ?? '', s.brief.cta].join('|')

  return {
    total: slots.length,
    distinctBriefs: new Set(slots.map(signature)).size,
    byMarket: (Object.keys(MARKET_LABEL) as MarketKey[]).map((key) => ({
      key,
      label: MARKET_LABEL[key],
      count: slots.filter((s) => s.market === key).length,
    })),
    byPhase: PHASE_ORDER.map((key) => ({ key, count: slots.filter((s) => s.phase === key).length })),
    byPlatform: Object.values(PLATFORMS).map((p) => ({
      key: p.key,
      label: p.label,
      count: slots.filter((s) => s.platform === p.key).length,
    })),
    byTrack: [...new Set(slots.map((s) => s.track))].map((key) => ({
      key,
      count: slots.filter((s) => s.track === key).length,
    })),
  }
}

/**
 * Stage [7]. Every gate here is automatable and runs on the resolved matrix
 * alone. Brand, legal and ratio-versus-rendered-dimension checks belong to the
 * compose stage, where there is an actual asset to measure, and are not faked.
 */
export function runGates(campaign: Campaign, matrix: ResolvedMatrix): GateResult[] {
  const { slots, dropped } = matrix
  const gates: GateResult[] = []

  // Completeness. A briefing with no markets or no channel plan resolves to
  // nothing at all, and every gate below it would pass on an empty set.
  const missing: string[] = []
  if (!campaign.meta.name.trim()) missing.push('a campaign name')
  if (!campaign.meta.window.start || !campaign.meta.window.end) missing.push('a window')
  if (!campaign.concept.campaignLine.trim()) missing.push('a campaign line')
  if (!campaign.markets.length) missing.push('at least one market')
  if (!campaign.channelPlan.length) missing.push('at least one channel-plan row')
  gates.push({
    id: 'completeness',
    label: 'Briefing is complete',
    severity: 'blocking',
    passed: missing.length === 0,
    detail: missing.length
      ? `The briefing still needs ${missing.join(', ')}.`
      : 'Every answer the matrix depends on is filled in.',
    affected: [],
  })

  // Offer state. In aspiration mode nothing carries a discount token; in
  // discount mode every THINK and DO slot must carry an offer treatment.
  if (campaign.offer.mode === 'aspiration') {
    const leaking = slots.filter((s) => s.brief.offerTreatment !== null)
    gates.push({
      id: 'offer-state',
      label: 'Offer state',
      severity: 'blocking',
      passed: leaking.length === 0,
      detail: leaking.length
        ? `${leaking.length} slots carry an offer treatment while the campaign runs on aspiration.`
        : 'Aspiration mode, and no slot carries a discount token.',
      affected: leaking.map((s) => s.id),
    })
  } else {
    const missing = slots.filter((s) => s.phase !== 'SEE' && s.brief.offerTreatment === null)
    gates.push({
      id: 'offer-state',
      label: 'Offer state',
      severity: 'blocking',
      passed: missing.length === 0,
      detail: missing.length
        ? `${missing.length} THINK or DO slots have no offer treatment while the campaign runs on discount.`
        : 'Discount mode, and every THINK and DO slot carries an offer treatment.',
      affected: missing.map((s) => s.id),
    })
  }

  // Offer consistency. The source states 15% in the concept and -10% on every
  // ad sticker; a reusable flow has to make that impossible.
  const conflicts = campaign.offer.statedElsewhere.filter((s) => s.pct !== campaign.offer.pct)
  gates.push({
    id: 'offer-consistency',
    label: 'Offer consistency',
    severity: 'blocking',
    passed: conflicts.length === 0,
    detail: conflicts.length
      ? `The brief also states ${conflicts
          .map((c) => `${c.pct}% (${c.where})`)
          .join(' and ')}, against ${campaign.offer.pct}% on the campaign. Resolve to one value.`
      : `One discount value across every surface: ${campaign.offer.pct}%.`,
    affected: [],
  })

  // CTA vocabulary. The phase map is the only source of CTAs.
  const wrongCta = slots.filter((s) => s.brief.cta !== PHASES[s.phase].cta)
  gates.push({
    id: 'phase-cta',
    label: 'CTA matches phase',
    severity: 'blocking',
    passed: wrongCta.length === 0,
    detail: wrongCta.length
      ? `${wrongCta.length} slots carry a CTA outside the phase map.`
      : 'Every slot uses the CTA its phase prescribes.',
    affected: wrongCta.map((s) => s.id),
  })

  // SEE never names a price.
  const seePricing = slots.filter((s) => s.phase === 'SEE' && s.brief.offerTreatment !== null)
  gates.push({
    id: 'see-no-price',
    label: 'SEE carries no price',
    severity: 'blocking',
    passed: seePricing.length === 0,
    detail: seePricing.length
      ? `${seePricing.length} SEE slots carry an offer treatment. SEE runs a slogan instead.`
      : 'No SEE slot names a price.',
    affected: seePricing.map((s) => s.id),
  })

  // Platform and ratio validity, reported from what resolve refused to expand.
  gates.push({
    id: 'platform-ratio',
    label: 'Platform and ratio validity',
    severity: dropped.length ? 'warning' : 'info',
    passed: dropped.length === 0,
    detail: dropped.length
      ? `${dropped.length} combinations were dropped: ${[...new Set(dropped.map((d) => d.reason))].join('; ')}.`
      : 'Every planned combination is one the platforms actually run.',
    affected: [],
  })

  // Language derives from market. Anything else is a modelling error.
  const badLanguage = campaign.markets.filter((m) => MARKET_LANGUAGE[m.key] !== m.language)
  gates.push({
    id: 'language',
    label: 'Language derives from market',
    severity: 'blocking',
    passed: badLanguage.length === 0,
    detail: badLanguage.length
      ? `${badLanguage.map((m) => `${m.key} is set to ${m.language}`).join(', ')}, which contradicts the market map.`
      : 'Every market resolves to exactly one language.',
    affected: [],
  })

  // Coverage per market and per phase, plus the volume skew between markets.
  const counts = campaign.markets.map((m) => ({
    key: m.key,
    count: slots.filter((s) => s.market === m.key).length,
  }))
  const empty = counts.filter((c) => c.count === 0)
  const populated = counts.filter((c) => c.count > 0)
  const high = Math.max(...populated.map((c) => c.count), 0)
  const low = Math.min(...populated.map((c) => c.count), 0)
  const skewed = populated.length > 1 && low < high * 0.75
  gates.push({
    id: 'market-coverage',
    label: 'Market coverage',
    severity: empty.length ? 'blocking' : skewed ? 'warning' : 'info',
    passed: empty.length === 0 && !skewed,
    detail: empty.length
      ? `${empty.map((c) => MARKET_LABEL[c.key]).join(' and ')} resolve to no slots at all.`
      : skewed
        ? `Volume is uneven: ${counts.map((c) => `${c.key} ${c.count}`).join(' · ')}. The thinnest market sits under 75% of the largest.`
        : `Even coverage: ${counts.map((c) => `${c.key} ${c.count}`).join(' · ')}.`,
    affected: [],
  })

  const phaseGaps = campaign.markets.flatMap((m) =>
    PHASE_ORDER.filter((phase) => !slots.some((s) => s.market === m.key && s.phase === phase)).map(
      (phase) => `${m.key} has no ${phase} slots`,
    ),
  )
  gates.push({
    id: 'phase-coverage',
    label: 'Phase coverage per market',
    severity: phaseGaps.length ? 'warning' : 'info',
    passed: phaseGaps.length === 0,
    detail: phaseGaps.length
      ? phaseGaps.join('; ') + '.'
      : 'Every market is covered across SEE, THINK and DO.',
    affected: [],
  })

  // Flighting. The regional stagger has to reach the deliverables.
  const outside = slots.filter(
    (s) => s.flightDate < campaign.meta.window.start || s.flightDate > campaign.meta.window.end,
  )
  gates.push({
    id: 'flighting',
    label: 'Flight dates inside the window',
    severity: 'warning',
    passed: outside.length === 0,
    detail: outside.length
      ? `${outside.length} slots carry a flight date outside ${campaign.meta.window.start} to ${campaign.meta.window.end}.`
      : 'Every slot carries a flight date inside the campaign window.',
    affected: outside.map((s) => s.id),
  })

  // Scope status, so "TBD (optional)" never quietly becomes a commitment.
  const unconfirmed = slots.filter((s) => s.status !== 'confirmed')
  gates.push({
    id: 'scope-status',
    label: 'Scope status',
    severity: unconfirmed.length ? 'warning' : 'info',
    passed: unconfirmed.length === 0,
    detail: unconfirmed.length
      ? `${unconfirmed.length} slots come from groups still marked optional or TBD.`
      : 'Every slot comes from a confirmed group.',
    affected: unconfirmed.map((s) => s.id),
  })

  // Placeholder copy. The source carries "+ Slogan", "Subtitle" and
  // "Something something" where lines were never written. They must not travel
  // into a deliverable unnoticed.
  const unwritten: string[] = []
  campaign.concept.slogans.forEach((slogan) => {
    if (isPlaceholder(slogan)) unwritten.push(`slogan "${slogan}"`)
  })
  campaign.propositions.forEach((p) => {
    if (!p.headline.trim()) unwritten.push(`${p.line} has no headline`)
    if (isPlaceholder(p.body)) unwritten.push(`${p.line} body is a placeholder`)
  })
  gates.push({
    id: 'placeholders',
    label: 'Placeholder copy',
    severity: unwritten.length ? 'warning' : 'info',
    passed: unwritten.length === 0,
    detail: unwritten.length
      ? `Never written: ${unwritten.join('; ')}. These block the copy stage, not the matrix.`
      : 'No placeholder copy left in the concept or the propositions.',
    affected: [],
  })

  // Differentiation. Real image dedupe needs assets, so this checks the one
  // thing the matrix can see: asset types repeating across phases in a track.
  const repeats: string[] = []
  for (const track of [...new Set(slots.map((s) => s.track))]) {
    const byPhase = new Map<PhaseKey, Set<string>>()
    for (const slot of slots.filter((s) => s.track === track)) {
      const set = byPhase.get(slot.phase) ?? new Set<string>()
      set.add(slot.assetType)
      byPhase.set(slot.phase, set)
    }
    for (const a of PHASE_ORDER) {
      for (const b of PHASE_ORDER) {
        if (a >= b) continue
        const shared = [...(byPhase.get(a) ?? [])].filter((t) => byPhase.get(b)?.has(t))
        if (shared.length) repeats.push(`${track}: ${a} and ${b} share ${shared.join(', ')}`)
      }
    }
  }
  gates.push({
    id: 'differentiation',
    label: 'Asset differentiation per phase',
    severity: 'info',
    passed: repeats.length === 0,
    detail: repeats.length
      ? `${repeats.join('; ')}. Image-level dedupe runs at compose time; this only compares asset types.`
      : 'No asset type repeats across phases within a track.',
    affected: [],
  })

  return gates
}

export function blockingFailures(gates: GateResult[]): GateResult[] {
  return gates.filter((g) => !g.passed && g.severity === 'blocking')
}

/** Markers the source uses where a line was left to be written later. */
const PLACEHOLDER_MARKERS = [
  '+ slogan',
  'subtitle',
  'mock-up',
  'something something',
  'something super poetic',
  'etc',
  'tbd',
  'x lines',
]

function isPlaceholder(value: string): boolean {
  const text = value.trim().toLowerCase()
  if (!text) return true
  return PLACEHOLDER_MARKERS.some((marker) => text.includes(marker))
}
