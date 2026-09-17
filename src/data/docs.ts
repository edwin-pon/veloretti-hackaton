// Extracted verbatim from design/Brand Onboarding.dc.html (the Design Canvas
// prototype) so the app and the prototype stay in sync. Each `file` below is a
// real document in public/samples, so the upload step has something to read. Values are the agent's
// simulated extraction output; once n8n is wired in these become the fallback
// used when the webhook is unreachable.
//
// This is Veloretti's studio: one brand, one set of rules. There is no brand
// switcher and no per-brand state.

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

export const DOC_ORDER: DocKey[] = ['brand', 'legal', 'style']

export const DEFS: Record<DocKey, DocDef> =
{
    brand: {
      order: 1, title: 'Brand information', well: '#DAE7FE',
      card: 'Brand information',
      desc: 'Identity, positioning, markets and voice, pulled from the brand book.',
      intro: 'The agent reads the brand book and drafts the identity, market and voice rules that every generated campaign will inherit.',
      file: 'veloretti-visual-language.pdf', size: '47 KB · 30 pages',
      summaryTitle: 'Agent summary',
      summary: 'Identity and market coverage are stated explicitly in the brand book, so confidence is high there. Voice attributes were inferred from 14 example headlines rather than a written list, and the claim library appears only as scattered footnotes. Both are flagged for your review.',
      extracts: ['Brand name, positioning and mission', 'Primary markets and audience segments', 'Voice attributes and banned wording', 'Substantiated product claims'],
      sections: [
        { title: 'Identity', meta: 'stated in the document', fields: [
          { key: 'b1', label: 'Brand name', hint: 'Used in every generated subject line and headline', type: 'text', value: 'Veloretti', conf: 99, cite: 'veloretti-visual-language.pdf · p.1',
            reasoning: 'Matched the wordmark on the cover, the legal entity line in the colophon and 112 in-body mentions. No competing spelling found.', quote: '“Veloretti B.V. — brand book, edition 2026”' },
          { key: 'b2', label: 'Positioning statement', hint: 'Anchors campaign angles and value propositions', type: 'area', rows: 3, value: 'Bicycles and e-bikes designed in Amsterdam and handmade in Europe, for people who are not cyclists so much as commuters who care about design.', conf: 88, cite: 'veloretti-visual-language.pdf · p.4',
            reasoning: 'Condensed from the two-paragraph positioning spread. The dealer clause was added because it recurs in the channel section as a defining constraint.', quote: '“We do not sell direct. The dealer is part of the product.”' },
          { key: 'b3', label: 'Mission', hint: 'Used for about-us and brand-level copy', type: 'area', rows: 2, value: 'Make your daily rides a pleasure, wherever you go.', conf: 81, cite: 'veloretti-visual-language.pdf · p.3',
            reasoning: 'Three candidate mission sentences appear across pages 3 and 5. Selected the one under the "Mission" heading; the others read as vision copy.', quote: '“Every short car trip is an opening.”' }
        ]},
        { title: 'Markets', meta: '2 fields · both editable as lists', fields: [
          { key: 'b4', label: 'Primary markets', hint: 'Controls language, currency and compliance rules per campaign', type: 'chips', value: ['Netherlands', 'Germany', 'Belgium', 'Denmark'], conf: 94, cite: 'veloretti-visual-language.pdf · p.9',
            chipPlaceholder: 'Add a market', reasoning: 'Read from the market map on page 9. Austria and Switzerland appear on the map in a lighter tint labelled "2027 pipeline" and were excluded.', quote: '“Core four: NL, DE, BE, DK.”' },
          { key: 'b5', label: 'Audience segments', hint: 'Drives audience targeting and tone per segment', type: 'chips', value: ['City commuters, 25-44', 'Design-led lifestyle buyers', 'Parents buying kids bikes'], conf: 76, cite: 'veloretti-visual-language.pdf · p.11',
            chipPlaceholder: 'Add a segment', reasoning: 'No formal segment list exists. These were derived from the personas section, which describes five personas that collapse into three commercial audiences.', quote: '“Meet Joris, Anna, Sven, Mila and Bram.”' }
        ]},
        { title: 'Voice', meta: 'inferred — needs your confirmation', fields: [
          { key: 'b6', label: 'Tone attributes', hint: 'Applied to every generated line of copy', type: 'chips', value: ['Warm', 'Plain', 'Quietly confident', 'Understated'], conf: 68, cite: 'veloretti-visual-language.pdf · p.14',
            chipPlaceholder: 'Add an attribute', reasoning: 'The brand book gives examples but no adjective list. These four were inferred from 14 approved headlines and the "how we write" do/don\'t table.', quote: '“Say the number. Skip the adjective.”' },
          { key: 'b7', label: 'Words to avoid', hint: 'Blocked at generation time', type: 'chips', value: ['revolutionary', 'game-changing', 'effortless', 'unleash'], conf: 90, cite: 'veloretti-visual-language.pdf · p.16',
            chipPlaceholder: 'Add a blocked word', reasoning: 'Taken verbatim from the "never write" column. Four further entries were style notes rather than words and were left out.', quote: '“No revolutions. We make bikes.”' },
          { key: 'b8', label: 'Reading level', hint: 'Target complexity for generated copy', type: 'select', value: 'B1 — plain, non-specialist', options: ['A2 — very simple', 'B1 — plain, non-specialist', 'B2 — confident reader', 'C1 — specialist'], conf: 72, cite: 'veloretti-visual-language.pdf · p.15',
            reasoning: 'The book asks for "language a first-time buyer understands", which maps to B1. Technical spec copy in the appendix reads closer to B2.', quote: '“Language a first-time buyer understands.”' }
        ]},
        { title: 'Proof', meta: 'partial extraction', fields: [
          { key: 'b9', label: 'Substantiated claims', hint: 'Only claims listed here may be generated', type: 'area', rows: 4, value: 'Designed in Amsterdam, handmade in Europe. Part of the Pon.Bike family since 2012. Fair pricing, timeless design, friendly service.', conf: 61, cite: 'veloretti-visual-language.pdf · p.21, p.29',
            reasoning: 'Claims are scattered across the product pages rather than collected in one place. Three of the five found carry a footnote reference; two do not and were dropped.', quote: '“Range figures per WLTP-e cycle, see appendix C.”' }
        ]}
      ]
    },
    legal: {
      order: 2, title: 'Legal rules', well: '#B399FF',
      card: 'Legal rules',
      desc: 'Claim limits, disclaimers and market-specific constraints.',
      intro: 'The agent turns your legal guidelines into machine-checkable rules. Anything it cannot state as a rule is surfaced for you to write.',
      file: 'legal-marketing-guidelines-v7.docx', size: '5 KB · 7 sections',
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
      file: 'veloretti-visual-language-colour-type.pdf', size: '31 KB · 11 pages',
      summaryTitle: 'Agent summary',
      summary: 'Mechanics, palette and typefaces were listed as explicit rules and extracted with high confidence. The type scale is desktop-only and two example layouts contradict it, so it is flagged for review.',
      extracts: ['Casing and punctuation rules', 'Primary, accent and neutral colors', 'Heading and body typefaces', 'Type scale and fallbacks'],
      sections: [
        { title: 'Writing mechanics', meta: 'applied to every generated asset', fields: [
          { key: 's1', label: 'Sentence case headings', hint: 'Headlines, subheads and subject lines', type: 'toggle', value: true, toggleLabel: 'Sentence case, not Title Case', conf: 97, cite: 'veloretti-visual-language-colour-type.pdf · p.6',
            reasoning: 'Stated as a rule and consistent across all 40 examples in the guide.', quote: '“Sentence case everywhere except product names.”' },
          { key: 's2', label: 'Oxford comma', hint: 'Punctuation in generated lists', type: 'toggle', value: false, toggleLabel: 'Use the Oxford comma', conf: 91, cite: 'veloretti-visual-language-colour-type.pdf · p.8',
            reasoning: 'The guide omits it in every example list and notes British-English house style.', quote: '“No serial comma.”' },
          { key: 's3', label: 'Exclamation marks', hint: 'Blocked punctuation', type: 'select', value: 'Never', options: ['Never', 'Sparingly', 'Allowed'], conf: 94, cite: 'veloretti-visual-language-colour-type.pdf · p.8',
            reasoning: 'Listed under forbidden punctuation with no stated exceptions.', quote: '“We do not shout.”' }
        ]},
        { title: 'Colors', meta: 'applied to generated assets and templates', fields: [
          { key: 'c1', label: 'Primary color', hint: 'Backgrounds, headlines and dark surfaces', type: 'text', value: '#1A1A1A — Ink black', conf: 96, cite: 'veloretti-visual-language-colour-type.pdf · p.4',
            reasoning: 'Read from the palette page, where it is the only swatch marked "primary" and carries both HEX and Pantone values.', quote: '“Monochrome first. The product is the colour.”' },
          { key: 'c2', label: 'Accent color', hint: 'Buttons, highlights and data marks', type: 'text', value: '#FE5900 — Signal orange', conf: 92, cite: 'veloretti-visual-language-colour-type.pdf · p.4',
            reasoning: 'Named as the tertiary accent. The guide marks it "not fixed" and limits it to promotional use, so it is stored as a restricted colour rather than a brand colour.', quote: '“Tertiary is not fixed. Special cases only.”' },
          { key: 'c3', label: 'Neutral scale', hint: 'Text, borders and surfaces', type: 'chips', value: ['#333130', '#4B4943', '#6B6961', '#8A887E', '#9F9A93', '#BBB8B3', '#D9D7D3', '#E8E8E6'], conf: 84, cite: 'veloretti-visual-language-colour-type.pdf · p.5',
            chipPlaceholder: 'Add a hex value', reasoning: 'Eight steps were printed as a warm-neutral ramp without names or roles. Role mapping was inferred from the example layouts on pages 6 and 7.', quote: '“Grays do the work quietly.”' },
          { key: 'c4', label: 'Color usage rule', hint: 'Enforced when a template is generated', type: 'area', rows: 3, value: 'Signal orange is reserved for promotional messages — discounts, sale, urgency. Never as a background behind body copy, never as a default call to action.', conf: 69, cite: 'veloretti-visual-language-colour-type.pdf · p.6',
            reasoning: 'The promo-only restriction is stated. The rule against using it as a default call to action was inferred from the examples, which never show it that way.', quote: '“Reserved for discounts and promotional messages.”' }
        ]},
        { title: 'Fonts', meta: '1 field needs review', fields: [
          { key: 'f1', label: 'Heading typeface', hint: 'Headlines, subheads and subject lines', type: 'text', value: 'PP Neue Montreal — Medium, -2% tracking', conf: 95, cite: 'veloretti-visual-language-colour-type.pdf · p.9',
            reasoning: 'Specimen page names the family, weight and tracking. Licence note confirms web use is covered.', quote: '“Display is large and tight.”' },
          { key: 'f2', label: 'Body typeface', hint: 'Body copy, labels and UI text', type: 'text', value: 'PP Neue Montreal — Regular 400', conf: 94, cite: 'veloretti-visual-language-colour-type.pdf · p.9',
            reasoning: 'Only Regular and Medium were supplied as web fonts. The specimen shows no other weight in use.', quote: '“One typeface does everything.”' },
          { key: 'f3', label: 'Fallback stack', hint: 'Used where the webfont cannot load', type: 'text', value: 'Helvetica Neue, Arial, sans-serif', conf: 87, cite: 'veloretti-visual-language-colour-type.pdf · p.10',
            reasoning: 'Taken from the fallback section. An editorial serif voice is referenced for the journal, but no font file was provided, so it was excluded here.', quote: '“Fallbacks use system fonts.”' },
          { key: 'f4', label: 'Type scale', hint: 'Sizes for generated layouts', type: 'text', value: 'H1 36 / H2 28 / H3 22 / body 16 / caption 13', conf: 66, cite: 'veloretti-visual-language-colour-type.pdf · p.11',
            reasoning: 'The guide prints a desktop scale only, and two example layouts contradict it at H2. Mobile sizes are missing entirely — confirm before generating layouts.', quote: '“Scale shown at desktop width.”' }
        ]}
      ]
    }
}
