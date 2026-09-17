// Campaign intake: what the agent extracts from a growth briefing, and the
// shape the review screen renders.
//
// The seed below is the Veloretti "Back to School 2026" briefing as read in
// docs/growth-briefing-blueprint.md. It plays the same role docs.ts plays for
// brand onboarding: the offline fallback when no n8n webhook is configured, and
// the reference for what a live extraction has to return.
//
// Two deliberate rough edges are preserved rather than cleaned up, because the
// intake exists to surface them:
//
//   * the concept states 15% while every ad sticker states -10%;
//   * the Kids slogan is the placeholder "+ Slogan", never written out.

import type { Campaign, ChannelEntry, Market, Proposition } from '../lib/campaign'
import { MARKET_LANGUAGE, type MarketKey } from './vocab'

export type BriefFieldType = 'text' | 'area' | 'select' | 'chips' | 'date' | 'percent' | 'derived'

export type BriefValue = string | string[] | number

export interface BriefField {
  key: string
  label: string
  hint: string
  type: BriefFieldType
  value: BriefValue
  /** 0-100. Under 70 counts as needing review, as in brand onboarding. */
  conf: number
  cite: string
  reasoning: string
  quote: string
  rows?: number
  options?: string[]
  chipPlaceholder?: string
  /** Set on derived fields to say what they follow from. */
  derivedFrom?: string
}

export interface BriefSection {
  key: string
  title: string
  meta: string
  fields: BriefField[]
}

export interface BriefingDef {
  file: string
  size: string
  summaryTitle: string
  summary: string
  /** Shown beside the upload drop zone. */
  looksFor: string[]
  sections: BriefSection[]
  markets: Market[]
  channelPlan: ChannelEntry[]
  propositions: Proposition[]
}

const SOURCE = 'growth-briefing-back-to-school-2026'

export const BRIEFING: BriefingDef = {
  file: 'growth-briefing-back-to-school-2026.pdf',
  size: '32 KB · 9 pages',
  summaryTitle: 'Agent summary',
  summary:
    'The briefing is a grid rather than a document: one concept projected onto ads, landing page and newsletter. Campaign window, markets and the creative vocabulary are stated and were read directly from the text layers, not the layer names, which are a stale copy of a previous campaign. Two things need you: the concept states a 15% discount while all 458 ad slots carry a -10% sticker, and the Kids slogan was never written.',
  looksFor: [
    'Concept, campaign line and the offer mechanic',
    'Markets, languages and in-market dates',
    'Funnel phases, platforms and ratios',
    'Propositions and the surfaces they feed',
  ],

  sections: [
    {
      key: 'campaign',
      title: 'Campaign',
      meta: 'stated on the cover',
      fields: [
        {
          key: 'cp1',
          label: 'Campaign name',
          hint: 'Names the campaign folder and every exported file',
          type: 'text',
          value: 'Back to School',
          conf: 98,
          cite: `${SOURCE} · BRIEFING 4013:2`,
          reasoning: 'Read off the cover header, which is the only place the campaign is named.',
          quote: '"Growth briefing : Back to School"',
        },
        {
          key: 'cp2',
          label: 'Product line',
          hint: 'Decides which offer applies and which products the surfaces show',
          type: 'select',
          value: 'Electric',
          options: ['Electric', 'City', 'Kids', 'All lines'],
          conf: 96,
          cite: `${SOURCE} · BRIEFING 4013:2`,
          reasoning:
            'The cover states Electric. The ad matrix also runs an X track, which the concept treats as a second track on the same campaign rather than a second campaign.',
          quote: '"Product line : Electric"',
        },
        {
          key: 'cp3',
          label: 'Year',
          hint: 'Used in naming and in the archive',
          type: 'text',
          value: 'August 2026',
          conf: 95,
          cite: `${SOURCE} · BRIEFING 4013:2`,
          reasoning: 'Stated on the cover as a month rather than a bare year.',
          quote: '"Year : August 2026"',
        },
        {
          key: 'cp4',
          label: 'Window opens',
          hint: 'Shared by all three markets',
          type: 'date',
          value: '2026-08-15',
          conf: 95,
          cite: `${SOURCE} · BRIEFING 4013:2`,
          reasoning:
            'The window is stated once and applies to every market. Only the Dutch in-market dates stagger inside it.',
          quote: '"Window : August 15 - September 1"',
        },
        {
          key: 'cp5',
          label: 'Window closes',
          hint: 'Shared by all three markets',
          type: 'date',
          value: '2026-09-01',
          conf: 95,
          cite: `${SOURCE} · BRIEFING 4013:2`,
          reasoning: 'Second half of the stated window.',
          quote: '"Window : August 15 - September 1"',
        },
      ],
    },

    {
      key: 'concept',
      title: 'Concept',
      meta: 'one text node carries the whole strategy',
      fields: [
        {
          key: 'cn1',
          label: 'Reframe from',
          hint: 'The seasonal moment the campaign starts from',
          type: 'text',
          value: 'Back to school',
          conf: 93,
          cite: `${SOURCE} · Concept & promotional offer 6001:53`,
          reasoning: 'First line of the concept node, stated as an arrow from one idea to another.',
          quote: '"Back to school → Return to routine"',
        },
        {
          key: 'cn2',
          label: 'Reframe to',
          hint: 'What the campaign actually argues',
          type: 'text',
          value: 'Return to routine',
          conf: 93,
          cite: `${SOURCE} · Concept & promotional offer 6001:53`,
          reasoning:
            'The right-hand side of the reframe. Every headline the flow writes has to land on this, not on the school moment itself.',
          quote: '"Back to school → Return to routine"',
        },
        {
          key: 'cn3',
          label: 'Campaign line',
          hint: 'The line every asset ladders up to',
          type: 'text',
          value: 'The art of the commute',
          conf: 97,
          cite: `${SOURCE} · Concept & promotional offer 6001:53`,
          reasoning: 'Set on its own line in the concept, which is how the briefing marks the campaign line.',
          quote: '"The art of the commute"',
        },
        {
          key: 'cn4',
          label: 'Context cues',
          hint: 'Scenes and moments the visuals may draw on',
          type: 'chips',
          value: [
            'Crisp mornings',
            'Getting back to the office',
            'School runs',
            'Effortlessly navigating the city',
          ],
          chipPlaceholder: 'Add a cue',
          conf: 90,
          cite: `${SOURCE} · Concept & promotional offer 6001:53`,
          reasoning: 'Split from the single comma-separated line under the reframe.',
          quote: '"Crisp mornings, getting back to the office, school runs, effortlessly navigating the city"',
        },
        {
          key: 'cn5',
          label: 'Value proposition',
          hint: 'The promise the THINK and DO phases argue',
          type: 'text',
          value: 'The ultimate commute upgrade',
          conf: 91,
          cite: `${SOURCE} · Concept & promotional offer 6001:53`,
          reasoning: 'Stated in the concept directly under the posture line.',
          quote: '"Ultimate commute upgrade"',
        },
        {
          key: 'cn6',
          label: 'Proof points',
          hint: 'The only supports the copy may lean on',
          type: 'chips',
          value: ['Arrive at the office sweat-free', 'Bypassing traffic', 'Design'],
          chipPlaceholder: 'Add a proof point',
          conf: 87,
          cite: `${SOURCE} · Concept & promotional offer 6001:53`,
          reasoning:
            'Split from the closing line of the concept. "Design" is left as written, which is thin as a proof point and may need a sentence behind it.',
          quote: '"Arrive at the office sweat-free, bypassing traffic, design"',
        },
        {
          key: 'cn7',
          label: 'Posture',
          hint: 'Decides whether the offer leads or supports',
          type: 'select',
          value: 'Aspiration over discount',
          options: ['Aspiration over discount', 'Discount over aspiration'],
          conf: 92,
          cite: `${SOURCE} · Concept & promotional offer 6001:53`,
          reasoning:
            'Stated as an instruction rather than as a preference, on its own line between the offer and the value proposition.',
          quote: '"Focus on aspiration"',
        },
        {
          key: 'cn8',
          label: 'Slogans',
          hint: 'Runs in the offer’s place in SEE, which never names a price',
          type: 'chips',
          value: ['At the speed of life', '+ Slogan'],
          chipPlaceholder: 'Add a slogan',
          conf: 58,
          cite: `${SOURCE} · Advertisement 4013:15`,
          reasoning:
            'The City slogan is written out across the SEE slots. The Kids slots carry the literal placeholder "+ Slogan", so that line was never written. It needs writing before any Kids SEE asset can be composed.',
          quote: '"At the speed of life" · "+ Slogan"',
        },
      ],
    },

    {
      key: 'offer',
      title: 'Offer',
      meta: 'a switchable state, not a constant',
      fields: [
        {
          key: 'of1',
          label: 'Offer mode',
          hint: 'In aspiration mode no percentage may appear on any asset',
          type: 'select',
          value: 'Discount',
          options: ['Discount', 'Aspiration'],
          conf: 72,
          cite: `${SOURCE} · Concept & promotional offer 6001:53`,
          reasoning:
            'The briefing states a 15% Electric discount and, on the next line, that there is no discount unless the line is behind on target. That is a switch rather than a fixed offer. Set to discount because the ad matrix carries a sale sticker on every THINK and DO slot.',
          quote: '"Electric 15% discount" · "No discount (unless behind on target)"',
        },
        {
          key: 'of2',
          label: 'Discount percentage',
          hint: 'Single-sourced. Every surface reads this value',
          type: 'percent',
          value: 15,
          conf: 44,
          cite: `${SOURCE} · Concept 6001:53 and Advertisement 4013:15`,
          reasoning:
            'The concept says 15%. Every one of the 458 ad slots carries a -10% sale sticker. The briefing never resolves this, so the campaign value was set from the concept and the ad value is recorded as a conflict. Pick one before anything is generated.',
          quote: '"Electric 15% discount" against "Sale sticker (-10%)"',
        },
        {
          key: 'of3',
          label: 'Condition',
          hint: 'What flips the mode',
          type: 'area',
          rows: 3,
          value:
            'Electric runs the discount. Other product lines run no discount unless they are behind on target.',
          conf: 61,
          cite: `${SOURCE} · Concept & promotional offer 6001:53`,
          reasoning:
            'Stated in prose only. Written as a rule here so it can be checked; the target threshold that would flip it is not given anywhere.',
          quote: '"No discount (unless behind on target)"',
        },
        {
          key: 'of4',
          label: 'Discount code',
          hint: 'Printed on the asset when set',
          type: 'text',
          value: 'Not used',
          conf: 56,
          cite: 'not stated in the briefing',
          reasoning:
            'A discount code appears only in the ad frames’ layer names, which are a leftover from a previous campaign and contradict their own contents. Treated as absent.',
          quote: '"Logo + Discount code + Discount" (stale layer name)',
        },
      ],
    },

    {
      key: 'markets',
      title: 'Markets and flighting',
      meta: 'language follows the market, it is not a separate choice',
      fields: [
        {
          key: 'mk1',
          label: 'Markets',
          hint: 'Each market resolves to exactly one language',
          type: 'chips',
          value: ['Netherlands', 'Belgium', 'Germany'],
          chipPlaceholder: 'Add a market',
          conf: 96,
          cite: `${SOURCE} · Concept & promotional offer 6001:53`,
          reasoning: 'Stated in the concept and matched by the language tags across the ad matrix.',
          quote: '"Markets: Netherlands, Belgium and Germany"',
        },
        {
          key: 'mk2',
          label: 'Languages',
          hint: 'Derived from the markets above',
          type: 'derived',
          derivedFrom: 'Markets',
          value: 'NL · ENG · DE',
          conf: 94,
          cite: `${SOURCE} · Concept & promotional offer 6001:53`,
          reasoning:
            'Three markets, three languages, and Belgium runs English rather than French. So language is not an axis of its own: resolve the market and the language follows.',
          quote: '"Languages: Dutch, English and German"',
        },
        {
          key: 'mk3',
          label: 'Regional stagger',
          hint: 'Dutch in-market dates inside the shared window',
          type: 'derived',
          derivedFrom: 'Market table',
          value: 'NL only · Noord 17 Aug · Zuid 24 Aug · Midden 1 Sep',
          conf: 89,
          cite: `${SOURCE} · BRIEFING 4013:2`,
          reasoning:
            'The three regions on the cover are Dutch. Belgium and Germany run the same window without a stagger, so the stagger is a refinement inside the window rather than three campaigns.',
          quote: '"Noord - August 17 · Midden - September 1 · Zuid - August 24"',
        },
      ],
    },

    {
      key: 'channels',
      title: 'Channels and formats',
      meta: 'not every platform runs every phase',
      fields: [
        {
          key: 'ch1',
          label: 'Platforms',
          hint: 'Which platforms the matrix may resolve to',
          type: 'chips',
          value: ['Google', 'Meta', 'TikTok'],
          chipPlaceholder: 'Add a platform',
          conf: 90,
          cite: `${SOURCE} · Advertisement 4013:15`,
          reasoning:
            'Read from the platform chips on the ad slots. Pinterest, Snapchat and LinkedIn appear nowhere in the file and were not added.',
          quote: '"Google" · "Meta" · "Meta\\nGoogle"',
        },
        {
          key: 'ch2',
          label: 'Phase and platform rules',
          hint: 'Enforced when the matrix resolves',
          type: 'derived',
          derivedFrom: 'Advertisement matrix',
          value: 'TikTok runs SEE only · Google runs THINK and DO · Meta runs all three',
          conf: 88,
          cite: `${SOURCE} · Advertisement 4013:15`,
          reasoning:
            'Derived from which phase bands each platform appears under. Combinations outside this are dropped at resolve time and reported.',
          quote: '"SEE_9x16" (TikTok) · "THINK_1.91x1" (Google)',
        },
        {
          key: 'ch3',
          label: 'Open scope',
          hint: 'Carried through as a status rather than as a slot',
          type: 'text',
          value: 'DE - YouTube / Demand gen Think campaigns TBD (Optional)',
          conf: 52,
          cite: `${SOURCE} · Advertisement 4013:15`,
          reasoning:
            'Appears twice as a scope flag with no slots behind it. Held as an optional group so it cannot quietly become a commitment.',
          quote: '"DE - YouTube / Demand gen Think campaigns TBD (Optional)"',
        },
      ],
    },

    {
      key: 'creative',
      title: 'Creative parameters',
      meta: 'fixed per phase, shown so you can see what is locked',
      fields: [
        {
          key: 'cr1',
          label: 'CTA per phase',
          hint: 'The only CTAs a generated asset may carry',
          type: 'derived',
          derivedFrom: 'Funnel phase',
          value: 'SEE: Get inspired · THINK: Discover now · DO: Buy now',
          conf: 95,
          cite: `${SOURCE} · Advertisement 4013:15`,
          reasoning:
            'Read from the CTA lines inside the slots themselves. The CTAs in the layer names ("Get the deal", "Get the discount", "Find out more") belong to a previous campaign and are ignored.',
          quote: '"CTA button / Discover now"',
        },
        {
          key: 'cr2',
          label: 'Angle per phase',
          hint: 'What the slot argues, fixed by its phase',
          type: 'derived',
          derivedFrom: 'Funnel phase',
          value:
            'SEE: lifestyle value of the line · THINK: added value of the free bundle · DO: Klarna, availability, trust and the offer',
          conf: 92,
          cite: `${SOURCE} · Advertisement 4013:15`,
          reasoning:
            'Each phase band repeats one angle across all its slots. SEE splits in two, because a City slot and a Kids slot argue different things.',
          quote: '"Focus on added value of free bundle/accessories"',
        },
        {
          key: 'cr3',
          label: 'Asset types',
          hint: 'Passed through to the asset brief per slot',
          type: 'chips',
          value: ['Image', 'Render', 'Lifestyle', 'Lifestyle (zoomed-in)', 'Video, 6s', 'Video, 15s'],
          chipPlaceholder: 'Add an asset type',
          conf: 91,
          cite: `${SOURCE} · Advertisement 4013:15, FOCUS POINTS 6060:134`,
          reasoning: 'Counted from the chips on the slots themselves, so these are the types actually in use.',
          quote: '"Image" (227) · "Lifestyle (zoomed-in)" (172) · "Video, 15s" (105)',
        },
        {
          key: 'cr4',
          label: 'Focus points',
          hint: 'What a slot puts in frame',
          type: 'chips',
          value: ['Review', 'USP', 'Electric Two', 'City', 'Kids'],
          chipPlaceholder: 'Add a focus point',
          conf: 89,
          cite: `${SOURCE} · FOCUS POINTS 6060:134`,
          reasoning: 'Lifted from the legend, and every value is used by at least one slot.',
          quote: '"FOCUS POINTS"',
        },
        {
          key: 'cr5',
          label: 'Creative direction',
          hint: 'Held as a constraint on asset selection',
          type: 'area',
          rows: 3,
          value:
            'Use different images per phase and channel to differentiate. Use personas and contextual clues that match where the audience is in the funnel.',
          conf: 84,
          cite: `${SOURCE} · Advertisement 6060:136`,
          reasoning:
            'Written as a note to the studio. Kept because it turns into a real check: no image reused across two phases within a track.',
          quote:
            '"Let’s try to use different images per phase and channel, to differentiate."',
        },
      ],
    },

    {
      key: 'surfaces',
      title: 'Propositions and surfaces',
      meta: 'one proposition object feeds every surface',
      fields: [
        {
          key: 'sf1',
          label: 'Surfaces',
          hint: 'What gets generated from this campaign',
          type: 'chips',
          value: ['Ads', 'Landing page', 'Newsletter', 'PDP'],
          chipPlaceholder: 'Add a surface',
          conf: 93,
          cite: `${SOURCE} · pages 4013:15, 4013:16, 4013:17`,
          reasoning: 'Each surface has its own page in the briefing, built on the same three propositions.',
          quote: '"Landing page" · "Advertisement" · "Newsletter"',
        },
        {
          key: 'sf2',
          label: 'Landing hero',
          hint: 'H1 on the campaign landing page',
          type: 'text',
          value: 'Reimagine your routine',
          conf: 88,
          cite: `${SOURCE} · Landing page 4013:17`,
          reasoning: 'Placed as the H1 under the eyebrow "Back to school/work". The subtext slot below it is empty.',
          quote: '"Reimagine your routine"',
        },
        {
          key: 'sf3',
          label: 'Alternate heroes',
          hint: 'Unplaced lines, available to the copy stage',
          type: 'chips',
          value: ['Restoring routine', 'A new pace'],
          chipPlaceholder: 'Add a line',
          conf: 64,
          cite: `${SOURCE} · Landing page 4013:17`,
          reasoning: 'Sit on the page outside any frame, so they are candidates rather than decisions.',
          quote: '"Restoring routine" · "A new pace"',
        },
        {
          key: 'sf4',
          label: 'Newsletter intents',
          hint: 'The variant is a parameter, not a second template',
          type: 'chips',
          value: ['Campaign intro', 'Urgency and last 24h'],
          chipPlaceholder: 'Add an intent',
          conf: 91,
          cite: `${SOURCE} · Newsletter 4013:16`,
          reasoning:
            'Both emails share one skeleton of 590 by 1848 and differ only in the intent line, so they are one template with two intents.',
          quote: '"Campaign intro" · "Urgency and last 24h"',
        },
      ],
    },
  ],

  markets: [
    {
      key: 'NL',
      language: 'NL',
      regions: [
        { name: 'Noord', inMarketDate: '2026-08-17' },
        { name: 'Zuid', inMarketDate: '2026-08-24' },
        { name: 'Midden', inMarketDate: '2026-09-01' },
      ],
    },
    { key: 'BE', language: 'ENG', regions: [] },
    { key: 'DE', language: 'DE', regions: [] },
  ],

  propositions: [
    {
      line: 'Electric',
      headline: 'Upgrade your commute',
      body: 'Go Lite or Pro',
      offerHook: 'Sale sticker',
      products: ['Ace Two Pro', 'Ace Two Lite', 'Ivy Two Pro', 'Ivy Two Lite', 'Electric Ace Two'],
      treatment: 'plain_section',
      surfaces: ['ads', 'landing_page', 'newsletter'],
    },
    {
      line: 'City',
      headline: '',
      body: 'Mention the bundle, what is included etc.',
      offerHook: 'Bundle offer',
      products: ['Caféracer'],
      treatment: 'full_bleed_text_media',
      surfaces: ['ads', 'landing_page', 'newsletter', 'pdp'],
    },
    {
      line: 'Kids',
      headline: '',
      body: '1 slide per bike model, discount and usps',
      offerHook: 'Discount offer',
      products: [],
      treatment: 'carousel',
      surfaces: ['ads', 'landing_page', 'newsletter'],
    },
  ],

  // The plan the source briefing implies. Volumes are uneven by market on
  // purpose: Germany trails the other two, which is a real coverage gap in the
  // source rather than a tagging artefact, and the matrix gate should say so.
  channelPlan: [
    {
      id: 'x-see-meta',
      track: 'X',
      phase: 'SEE',
      platform: 'meta',
      ratios: ['1x1', '9x16'],
      markets: ['NL', 'BE', 'DE'],
      focusPoints: ['City', 'Kids'],
      assetTypes: ['Lifestyle', 'Video, 15s'],
      treatments: [],
      status: 'confirmed',
    },
    {
      id: 'x-see-tiktok',
      track: 'X',
      phase: 'SEE',
      platform: 'tiktok',
      ratios: ['9x16'],
      markets: ['NL', 'BE'],
      focusPoints: ['City', 'Kids'],
      assetTypes: ['Video, 15s', 'Video, 6s'],
      treatments: ['Summer video'],
      status: 'confirmed',
    },
    {
      id: 'electric-see-meta',
      track: 'Electric',
      phase: 'SEE',
      platform: 'meta',
      ratios: ['1x1', '9x16'],
      markets: ['NL', 'BE', 'DE'],
      focusPoints: ['Electric Two'],
      assetTypes: ['Lifestyle', 'Video, 15s'],
      treatments: [],
      status: 'confirmed',
    },
    {
      id: 'electric-see-tiktok',
      track: 'Electric',
      phase: 'SEE',
      platform: 'tiktok',
      ratios: ['9x16'],
      markets: ['NL', 'BE'],
      focusPoints: ['Electric Two'],
      assetTypes: ['Video, 15s'],
      treatments: ['Summer video'],
      status: 'confirmed',
    },
    {
      id: 'x-think-google',
      track: 'X',
      phase: 'THINK',
      platform: 'google',
      ratios: ['1x1', '4x5', '1.91x1', '9x16'],
      markets: ['NL', 'BE', 'DE'],
      focusPoints: ['Review', 'USP'],
      assetTypes: ['Image', 'Render', 'Lifestyle (zoomed-in)'],
      treatments: [],
      status: 'confirmed',
    },
    {
      id: 'x-think-meta',
      track: 'X',
      phase: 'THINK',
      platform: 'meta',
      ratios: ['1x1', '9x16'],
      markets: ['NL', 'BE', 'DE'],
      focusPoints: ['Review', 'USP'],
      assetTypes: ['Image', 'Lifestyle (zoomed-in)'],
      treatments: [],
      status: 'confirmed',
    },
    {
      id: 'electric-think-google',
      track: 'Electric',
      phase: 'THINK',
      platform: 'google',
      ratios: ['1x1', '4x5', '1.91x1', '9x16'],
      markets: ['NL', 'BE'],
      focusPoints: ['Electric Two', 'USP'],
      assetTypes: ['Render', 'Image'],
      treatments: [],
      status: 'confirmed',
    },
    {
      id: 'electric-think-meta',
      track: 'Electric',
      phase: 'THINK',
      platform: 'meta',
      ratios: ['1x1', '9x16'],
      markets: ['NL', 'BE', 'DE'],
      focusPoints: ['Electric Two'],
      assetTypes: ['Render', 'Lifestyle (zoomed-in)'],
      treatments: [],
      status: 'confirmed',
    },
    {
      id: 'electric-think-youtube-de',
      track: 'Electric',
      phase: 'THINK',
      platform: 'google',
      ratios: ['1x1', '4x5', '1.91x1', '9x16'],
      markets: ['DE'],
      focusPoints: ['Electric Two'],
      assetTypes: ['Video, 15s'],
      treatments: [],
      status: 'tbd',
      note: 'DE - YouTube / Demand gen Think campaigns TBD (Optional)',
    },
    {
      id: 'x-do-google',
      track: 'X',
      phase: 'DO',
      platform: 'google',
      ratios: ['1x1', '4x5', '1.91x1', '9x16'],
      markets: ['NL', 'BE', 'DE'],
      focusPoints: ['Review'],
      assetTypes: ['Render', 'Image'],
      treatments: [],
      status: 'confirmed',
    },
    {
      id: 'x-do-meta',
      track: 'X',
      phase: 'DO',
      platform: 'meta',
      ratios: ['1x1', '9x16'],
      markets: ['NL', 'BE'],
      focusPoints: ['Review', 'USP'],
      assetTypes: ['Render', 'Image'],
      treatments: [],
      status: 'confirmed',
    },
    {
      id: 'electric-do-google',
      track: 'Electric',
      phase: 'DO',
      platform: 'google',
      ratios: ['1x1', '4x5', '1.91x1', '9x16'],
      markets: ['NL', 'BE'],
      focusPoints: ['Electric Two'],
      assetTypes: ['Render'],
      treatments: [],
      status: 'confirmed',
    },
    {
      id: 'electric-do-meta',
      track: 'Electric',
      phase: 'DO',
      platform: 'meta',
      ratios: ['1x1', '9x16'],
      markets: ['NL', 'BE', 'DE'],
      focusPoints: ['Electric Two'],
      assetTypes: ['Render', 'Image'],
      treatments: [],
      status: 'confirmed',
    },
  ],
}

export const BRIEF_FIELDS: BriefField[] = BRIEFING.sections.flatMap((s) => s.fields)

/** Field values as the agent first returned them, before any edit. */
export function seedBriefValues(): Record<string, BriefValue> {
  return Object.fromEntries(BRIEF_FIELDS.map((f) => [f.key, f.value]))
}

function text(values: Record<string, BriefValue>, key: string): string {
  const value = values[key]
  if (Array.isArray(value)) return value.join(', ')
  return value === undefined ? '' : String(value)
}

function list(values: Record<string, BriefValue>, key: string): string[] {
  const value = values[key]
  if (Array.isArray(value)) return value
  return value === undefined || value === '' ? [] : [String(value)]
}

/**
 * Turns the confirmed intake values into the Campaign object the matrix
 * resolves. Markets, the channel plan and the propositions are edited as tables
 * rather than as fields, so they come in alongside the values.
 */
export function buildCampaign(
  values: Record<string, BriefValue>,
  parts: {
    markets: Market[]
    channelPlan: ChannelEntry[]
    propositions: Proposition[]
  },
): Campaign {
  const pct = Number(values.of2 ?? 0)
  return {
    meta: {
      name: text(values, 'cp1'),
      productLine: text(values, 'cp2'),
      year: text(values, 'cp3'),
      window: { start: text(values, 'cp4'), end: text(values, 'cp5') },
    },
    concept: {
      reframeFrom: text(values, 'cn1'),
      reframeTo: text(values, 'cn2'),
      contextCues: list(values, 'cn4'),
      campaignLine: text(values, 'cn3'),
      slogans: list(values, 'cn8'),
      valueProp: text(values, 'cn5'),
      proofPoints: list(values, 'cn6'),
      posture: text(values, 'cn7'),
    },
    offer: {
      mode: text(values, 'of1').toLowerCase() === 'aspiration' ? 'aspiration' : 'discount',
      pct,
      condition: text(values, 'of3'),
      code: text(values, 'of4') === 'Not used' ? null : text(values, 'of4'),
      // Recorded rather than resolved: the sticker value is what the ad slots
      // actually carry, and the consistency gate compares it against pct.
      statedElsewhere: [{ pct: 10, where: 'sale sticker on every ad slot' }],
    },
    trustLevers: ['klarna_instalments', 'klarna_pay_later', 'reviews', 'warranty'],
    markets: parts.markets.map((m) => ({ ...m, language: MARKET_LANGUAGE[m.key as MarketKey] })),
    propositions: parts.propositions,
    channelPlan: parts.channelPlan,
    newsletterIntents: ['campaign_intro', 'urgency_last_24h'],
  }
}

/** The campaign as the briefing seeds it, with nothing edited. */
export function seedCampaign(): Campaign {
  return buildCampaign(seedBriefValues(), {
    markets: BRIEFING.markets,
    channelPlan: BRIEFING.channelPlan,
    propositions: BRIEFING.propositions,
  })
}
