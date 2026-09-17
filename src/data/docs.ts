// Extracted verbatim from design/Brand Onboarding.dc.html (the Design Canvas
// prototype) so the app and the prototype stay in sync. Values are the agent's
// simulated extraction output; once n8n is wired in these become the fallback
// used when the webhook is unreachable.

export type FieldType = 'text' | 'area' | 'select' | 'toggle' | 'chips'

export interface DocField {
  key: string
  label: string
  hint: string
  type: FieldType
  value: string | string[] | boolean
  conf: number
  cite: string
  reasoning: string
  quote: string
  rows?: number
  options?: string[]
  toggleLabel?: string
  chipPlaceholder?: string
}

export interface DocSection {
  title: string
  meta: string
  fields: DocField[]
}

export interface DocDef {
  order: number
  title: string
  well: string
  card: string
  desc: string
  intro: string
  file: string
  size: string
  summaryTitle: string
  summary: string
  extracts: string[]
  sections: DocSection[]
}

export type DocKey = 'brand' | 'legal' | 'style'

export interface Brand {
  key: string
  name: string
  short: string
  slug: string
  initials: string
  color: string
}

export const DOC_ORDER: DocKey[] = ['brand', 'legal', 'style']

export const DEFS: Record<DocKey, DocDef> =
{
    brand: {
      order: 1, title: 'Brand information', well: '#DAE7FE',
      card: 'Brand information',
      desc: 'Identity, positioning, markets and voice, pulled from the brand book.',
      intro: 'The agent reads the brand book and drafts the identity, market and voice rules that every generated campaign will inherit.',
      file: 'veloretti-brand-book-2026.pdf', size: '4.8 MB · 38 pages',
      summaryTitle: 'Agent summary',
      summary: 'Identity and market coverage are stated explicitly in the brand book, so confidence is high there. Voice attributes were inferred from 14 example headlines rather than a written list, and the claim library appears only as scattered footnotes. Both are flagged for your review.',
      extracts: ['Brand name, positioning and mission', 'Primary markets and audience segments', 'Voice attributes and banned wording', 'Substantiated product claims'],
      sections: [
        { title: 'Identity', meta: 'stated in the document', fields: [
          { key: 'b1', label: 'Brand name', hint: 'Used in every generated subject line and headline', type: 'text', value: 'Veloretti', conf: 99, cite: 'veloretti-brand-book-2026.pdf · p.1',
            reasoning: 'Matched the wordmark on the cover, the legal entity line in the colophon and 112 in-body mentions. No competing spelling found.', quote: '“Veloretti B.V. — brand book, edition 2026”' },
          { key: 'b2', label: 'Positioning statement', hint: 'Anchors campaign angles and value propositions', type: 'area', rows: 3, value: 'Electric cargo and commuter bikes engineered for daily distance, sold and serviced through independent dealers.', conf: 88, cite: 'veloretti-brand-book-2026.pdf · p.4',
            reasoning: 'Condensed from the two-paragraph positioning spread. The dealer clause was added because it recurs in the channel section as a defining constraint.', quote: '“We do not sell direct. The dealer is part of the product.”' },
          { key: 'b3', label: 'Mission', hint: 'Used for about-us and brand-level copy', type: 'area', rows: 2, value: 'Replace short car trips in European cities with rides people actually prefer.', conf: 81, cite: 'veloretti-brand-book-2026.pdf · p.3',
            reasoning: 'Three candidate mission sentences appear across pages 3 and 5. Selected the one under the "Mission" heading; the others read as vision copy.', quote: '“Every short car trip is an opening.”' }
        ]},
        { title: 'Markets', meta: '2 fields · both editable as lists', fields: [
          { key: 'b4', label: 'Primary markets', hint: 'Controls language, currency and compliance rules per campaign', type: 'chips', value: ['Netherlands', 'Germany', 'Belgium', 'Denmark'], conf: 94, cite: 'veloretti-brand-book-2026.pdf · p.9',
            chipPlaceholder: 'Add a market', reasoning: 'Read from the market map on page 9. Austria and Switzerland appear on the map in a lighter tint labelled "2027 pipeline" and were excluded.', quote: '“Core four: NL, DE, BE, DK.”' },
          { key: 'b5', label: 'Audience segments', hint: 'Drives audience targeting and tone per segment', type: 'chips', value: ['Urban commuters', 'Fleet operators', 'Dealer network'], conf: 76, cite: 'veloretti-brand-book-2026.pdf · p.11',
            chipPlaceholder: 'Add a segment', reasoning: 'No formal segment list exists. These were derived from the personas section, which describes five personas that collapse into three commercial audiences.', quote: '“Meet Joris, Anna, Sven, Mila and Bram.”' }
        ]},
        { title: 'Voice', meta: 'inferred — needs your confirmation', fields: [
          { key: 'b6', label: 'Tone attributes', hint: 'Applied to every generated line of copy', type: 'chips', value: ['Direct', 'Technical', 'Understated', 'Optimistic'], conf: 68, cite: 'veloretti-brand-book-2026.pdf · p.14',
            chipPlaceholder: 'Add an attribute', reasoning: 'The brand book gives examples but no adjective list. These four were inferred from 14 approved headlines and the "how we write" do/don\'t table.', quote: '“Say the number. Skip the adjective.”' },
          { key: 'b7', label: 'Words to avoid', hint: 'Blocked at generation time', type: 'chips', value: ['revolutionary', 'effortless', 'game-changing', 'unleash'], conf: 90, cite: 'veloretti-brand-book-2026.pdf · p.16',
            chipPlaceholder: 'Add a blocked word', reasoning: 'Taken verbatim from the "never write" column. Four further entries were style notes rather than words and were left out.', quote: '“No revolutions. We make bikes.”' },
          { key: 'b8', label: 'Reading level', hint: 'Target complexity for generated copy', type: 'select', value: 'B1 — plain, non-specialist', options: ['A2 — very simple', 'B1 — plain, non-specialist', 'B2 — confident reader', 'C1 — specialist'], conf: 72, cite: 'veloretti-brand-book-2026.pdf · p.15',
            reasoning: 'The book asks for "language a first-time buyer understands", which maps to B1. Technical spec copy in the appendix reads closer to B2.', quote: '“Language a first-time buyer understands.”' }
        ]},
        { title: 'Proof', meta: 'partial extraction', fields: [
          { key: 'b9', label: 'Substantiated claims', hint: 'Only claims listed here may be generated', type: 'area', rows: 4, value: '90 km range on the Cargo Line at 25 km/h assist. 12-year frame warranty. Service within 48 hours at 340 partner dealers.', conf: 61, cite: 'veloretti-brand-book-2026.pdf · p.21, p.29',
            reasoning: 'Claims are scattered across the product pages rather than collected in one place. Three of the five found carry a footnote reference; two do not and were dropped.', quote: '“Range figures per WLTP-e cycle, see appendix C.”' }
        ]}
      ]
    },
    legal: {
      order: 2, title: 'Legal rules', well: '#B399FF',
      card: 'Legal rules',
      desc: 'Claim limits, disclaimers and market-specific constraints.',
      intro: 'The agent turns your legal guidelines into machine-checkable rules. Anything it cannot state as a rule is surfaced for you to write.',
      file: 'legal-marketing-guidelines-v7.docx', size: '820 KB · 14 pages',
      summaryTitle: 'Agent summary',
      summary: 'Claim and disclaimer rules translated cleanly into blocking checks. The German UWG section references external case law the agent could not read, so its rule is a draft. One approval threshold had no stated owner and defaults to legal review.',
      extracts: ['Claim and comparison limits', 'Mandatory disclaimers per market', 'Data and consent constraints', 'Approval thresholds'],
      sections: [
        { title: 'Claims', meta: 'blocking rules', fields: [
          { key: 'l1', label: 'Comparative claims', hint: 'Applied before a draft can be scheduled', type: 'area', rows: 3, value: 'Named-competitor comparisons are not permitted. Category comparisons are allowed only with a dated third-party source in the same asset.', conf: 92, cite: 'legal-marketing-guidelines-v7.docx · §2.1',
            reasoning: 'Both sentences are stated as requirements. The word "dated" was added because the source-citation clause in §2.4 requires a test date.', quote: '“Never name a competitor. Ever.”' },
          { key: 'l2', label: 'Superlatives', hint: 'Blocked wording at generation time', type: 'area', rows: 2, value: 'No absolute superlatives (best, fastest, safest, longest range) unless a footnoted measurement accompanies the claim in the same asset.', conf: 95, cite: 'legal-marketing-guidelines-v7.docx · §2.2',
            reasoning: 'Directly restated from the superlatives clause, including the four example words given in brackets.', quote: '“Superlatives require measurement.”' },
          { key: 'l3', label: 'Sustainability wording', hint: 'EU green-claims exposure', type: 'area', rows: 3, value: 'Do not use "climate neutral", "CO2 neutral" or "green" without a linked calculation method. "Lower emissions than a car trip" is permitted with the standard footnote.', conf: 74, cite: 'legal-marketing-guidelines-v7.docx · §3',
            reasoning: 'The section cites the EU Green Claims Directive and an internal memo the agent could not access. The permitted phrasing was taken from the two approved examples in the annex.', quote: '“See memo GC-2025-04 for permitted phrasings.”' }
        ]},
        { title: 'Disclaimers', meta: 'inserted automatically', fields: [
          { key: 'l4', label: 'Range claim footnote', hint: 'Appended to any asset containing a range figure', type: 'area', rows: 2, value: 'Range measured per WLTP-e cycle at 25 km/h assist, 75 kg rider, level terrain. Real-world range varies.', conf: 89, cite: 'legal-marketing-guidelines-v7.docx · §4.2',
            reasoning: 'Copied verbatim from the approved footnote block. The final sentence is required in Germany and included by default.', quote: '“Use the approved footnote unchanged.”' },
          { key: 'l5', label: 'Germany — additional notice', hint: 'Market-specific, UWG', type: 'area', rows: 3, value: 'DRAFT — needs legal input. Price advertising must state whether VAT and assembly are included. Dealer availability claims require the "at participating dealers" qualifier.', conf: 48, cite: 'legal-marketing-guidelines-v7.docx · §6.1',
            reasoning: 'This section defers to outside counsel and lists no rule text. The draft above was assembled from the two examples in the footnotes and should be rewritten by legal.', quote: '“Refer to Kanzlei opinion of 12 March.”' }
        ]},
        { title: 'Data and consent', meta: 'affects audience building', fields: [
          { key: 'l6', label: 'Consent basis', hint: 'Filters which audiences can be targeted', type: 'select', value: 'Opt-in only (double opt-in for DE)', options: ['Opt-in only (double opt-in for DE)', 'Opt-in with soft opt-in for existing customers', 'Legitimate interest permitted'], conf: 86, cite: 'legal-marketing-guidelines-v7.docx · §5.1',
            reasoning: 'The guidelines require opt-in across all four markets and single out Germany for double opt-in. Soft opt-in is explicitly rejected.', quote: '“Soft opt-in is not used by Veloretti.”' },
          { key: 'l7', label: 'Retention limit', hint: 'Applied to campaign audience snapshots', type: 'text', value: '24 months after last engagement', conf: 93, cite: 'legal-marketing-guidelines-v7.docx · §5.4',
            reasoning: 'Stated once, unambiguously, with the trigger defined as last engagement rather than collection date.', quote: '“24 months from last engagement.”' },
          { key: 'l8', label: 'Approval threshold', hint: 'Who must sign off before scheduling', type: 'select', value: 'Legal review for all paid media', options: ['No review required', 'Legal review for all paid media', 'Legal review for every asset', 'Brand review only'], conf: 55, cite: 'legal-marketing-guidelines-v7.docx · §7',
            reasoning: 'No owner or threshold is stated. Defaulted to the most restrictive option that matches the paid-media examples in §7. Confirm with your legal contact.', quote: '“Approval as agreed per campaign.”' }
        ]}
      ]
    },
    style: {
      order: 3, title: 'Style guide', well: '#52E9C0',
      card: 'Style guide',
      desc: 'Writing mechanics, colors and typefaces.',
      intro: 'Mechanical rules the generator applies to every asset: casing, punctuation, the color palette and the typefaces used in generated layouts.',
      file: 'veloretti-style-guide-2026.pdf', size: '2.1 MB · 22 pages',
      summaryTitle: 'Agent summary',
      summary: 'Mechanics, palette and typefaces were listed as explicit rules and extracted with high confidence. The type scale is desktop-only and two example layouts contradict it, so it is flagged for review.',
      extracts: ['Casing and punctuation rules', 'Primary, accent and neutral colors', 'Heading and body typefaces', 'Type scale and fallbacks'],
      sections: [
        { title: 'Writing mechanics', meta: 'applied to every generated asset', fields: [
          { key: 's1', label: 'Sentence case headings', hint: 'Headlines, subheads and subject lines', type: 'toggle', value: true, toggleLabel: 'Sentence case, not Title Case', conf: 97, cite: 'veloretti-style-guide-2026.pdf · p.6',
            reasoning: 'Stated as a rule and consistent across all 40 examples in the guide.', quote: '“Sentence case everywhere except product names.”' },
          { key: 's2', label: 'Oxford comma', hint: 'Punctuation in generated lists', type: 'toggle', value: false, toggleLabel: 'Use the Oxford comma', conf: 91, cite: 'veloretti-style-guide-2026.pdf · p.8',
            reasoning: 'The guide omits it in every example list and notes British-English house style.', quote: '“No serial comma.”' },
          { key: 's3', label: 'Exclamation marks', hint: 'Blocked punctuation', type: 'select', value: 'Never', options: ['Never', 'Sparingly', 'Allowed'], conf: 94, cite: 'veloretti-style-guide-2026.pdf · p.8',
            reasoning: 'Listed under forbidden punctuation with no stated exceptions.', quote: '“We do not shout.”' }
        ]},
        { title: 'Colors', meta: 'applied to generated assets and templates', fields: [
          { key: 'c1', label: 'Primary color', hint: 'Backgrounds, headlines and dark surfaces', type: 'text', value: '#123A2C — Deep pine', conf: 96, cite: 'veloretti-style-guide-2026.pdf · p.4',
            reasoning: 'Read from the palette page, where it is the only swatch marked "primary" and carries both HEX and Pantone values.', quote: '“Deep pine carries the brand. Everything else supports it.”' },
          { key: 'c2', label: 'Accent color', hint: 'Buttons, highlights and data marks', type: 'text', value: '#D6FF4B — Signal lime', conf: 92, cite: 'veloretti-style-guide-2026.pdf · p.4',
            reasoning: 'Named as the single accent. A second bright swatch on the same page is labelled "packaging only" and was excluded.', quote: '“One accent. Never two.”' },
          { key: 'c3', label: 'Neutral scale', hint: 'Text, borders and surfaces', type: 'chips', value: ['#0B0F0D', '#3F4A44', '#8C9A93', '#E8EDEA', '#FFFFFF'], conf: 84, cite: 'veloretti-style-guide-2026.pdf · p.5',
            chipPlaceholder: 'Add a hex value', reasoning: 'Five steps were printed as a ramp without names or roles. Role mapping was inferred from the example layouts on pages 6 and 7.', quote: '“Grays do the work quietly.”' },
          { key: 'c4', label: 'Color usage rule', hint: 'Enforced when a template is generated', type: 'area', rows: 3, value: 'Signal lime is reserved for one element per asset, normally the call to action. Never as a background behind body copy, never on text below 18px.', conf: 69, cite: 'veloretti-style-guide-2026.pdf · p.6',
            reasoning: 'The one-element rule is stated. The contrast limits were derived from the accessibility note, which gives a ratio rather than a size threshold.', quote: '“Lime marks the next action, nothing else.”' }
        ]},
        { title: 'Fonts', meta: '1 field needs review', fields: [
          { key: 'f1', label: 'Heading typeface', hint: 'Headlines, subheads and subject lines', type: 'text', value: 'Chapeau Display — Bold, -1% tracking', conf: 95, cite: 'veloretti-style-guide-2026.pdf · p.9',
            reasoning: 'Specimen page names the family, weight and tracking. Licence note confirms web use is covered.', quote: '“Chapeau Display Bold, tightened.”' },
          { key: 'f2', label: 'Body typeface', hint: 'Body copy, labels and UI text', type: 'text', value: 'Chapeau Text — Regular and Medium', conf: 94, cite: 'veloretti-style-guide-2026.pdf · p.9',
            reasoning: 'Two weights are shown in the specimen. Light and Black appear crossed out in the same table.', quote: '“Two weights are enough.”' },
          { key: 'f3', label: 'Fallback stack', hint: 'Used where the webfont cannot load', type: 'text', value: 'Helvetica Neue, Arial, sans-serif', conf: 87, cite: 'veloretti-style-guide-2026.pdf · p.10',
            reasoning: 'Taken from the fallback section. Georgia is listed as a serif fallback for editorial templates only and was excluded here.', quote: '“Fallbacks use system fonts.”' },
          { key: 'f4', label: 'Type scale', hint: 'Sizes for generated layouts', type: 'text', value: 'H1 44 / H2 32 / H3 24 / body 16 / caption 13', conf: 66, cite: 'veloretti-style-guide-2026.pdf · p.11',
            reasoning: 'The guide prints a desktop scale only, and two example layouts contradict it at H2. Mobile sizes are missing entirely — confirm before generating layouts.', quote: '“Scale shown at desktop width.”' }
        ]}
      ]
    }
}

export const BRANDS: Brand[] =
[
    { key: 'veloretti', name: 'Veloretti', short: 'Veloretti', slug: 'veloretti', initials: 'VA', color: '#52E9C0' },
    { key: 'canondale', name: 'Canondale', short: 'Canondale', slug: 'canondale', initials: 'CA', color: '#DAE7FE' },
    { key: 'gazelle', name: 'Gazelle', short: 'Gazelle', slug: 'gazelle', initials: 'GA', color: '#B399FF' }
]

/**
 * The prototype ships Veloretti copy; switching brands rewrites the brand name
 * and filename slugs so the other two workspaces read plausibly.
 */
export function substitute<T>(text: T, brand: Brand): T {
  if (typeof text !== 'string') return text
  return text.split('Veloretti').join(brand.name).split('veloretti-').join(brand.slug + '-') as T
}
