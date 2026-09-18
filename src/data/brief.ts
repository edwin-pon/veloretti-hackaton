import type { ExtractedField } from './types';

export interface BriefDocument {
  name: string;
  size: string;
  summary: string;
  fields: ExtractedField[];
}

/** The campaign brief the agent reads when a campaign starts from a document. */
export const briefDocument: BriefDocument = {
  name: 'back-to-school-brief.docx',
  size: '340 KB · 3 pages',
  summary: 'Objective, markets, channels and timing are stated in the brief and were extracted directly. No primary KPI is named and the dealer co-op split is left open, so both are drafted from the campaign template and flagged.',
  fields: [
    {
      key: 'br1',
      label: 'Objective',
      hint: 'Sets the angle for every draft',
      type: 'text',
      value: 'Cargo Line spring campaign',
      conf: 94,
      cite: 'back-to-school-brief.docx · p.1',
      reasoning: 'Taken from the title line and the first paragraph, which agree.',
      quote: '“Spring push for the Cargo Line, dealer-led.”',
    },
    {
      key: 'br2',
      label: 'Markets',
      hint: 'Language, currency and legal rules per market',
      type: 'select',
      value: 'All three markets',
      options: ['All three markets', 'Germany only', 'Netherlands only', 'Netherlands and Belgium'],
      conf: 91,
      cite: 'back-to-school-brief.docx · p.1',
      reasoning: 'The brief names NL, DE and BE, which matches your confirmed market list.',
      quote: '“Core three, same window.”',
    },
    {
      key: 'br3',
      label: 'Channels',
      hint: 'Which assets the agent drafts',
      type: 'select',
      value: 'All social formats',
      options: ['All social formats', 'Instagram only', 'LinkedIn only'],
      conf: 88,
      cite: 'back-to-school-brief.docx · p.2',
      reasoning: 'Paid social is listed as in scope across all placements. A landing page is mentioned as "if budget allows" and is not supported yet.',
      quote: '“Paid social. LP if budget allows.”',
    },
    {
      key: 'br4',
      label: 'Window',
      hint: 'Scheduling and flight dates',
      type: 'text',
      value: '16 March — 30 April 2026',
      conf: 90,
      cite: 'back-to-school-brief.docx · p.2',
      reasoning: 'Both dates are given. The brief also mentions a dealer preview week which is not part of the flight.',
      quote: '“In market from 16 March.”',
    },
    {
      key: 'br5',
      label: 'Budget',
      hint: 'Media budget for planning',
      type: 'text',
      value: '€ 45.000 media',
      conf: 79,
      cite: 'back-to-school-brief.docx · p.3',
      reasoning: 'The figure appears once, in a table that also lists production costs. Production was excluded.',
      quote: '“Media 45k, production separate.”',
    },
    {
      key: 'br6',
      label: 'Primary KPI',
      hint: 'What success is measured against',
      type: 'text',
      value: 'DRAFT — test rides booked per market',
      conf: 42,
      cite: 'not stated in the brief',
      reasoning: 'No KPI is named. Drafted from the objective and the two previous Cargo Line campaigns. Confirm before the campaign is scheduled.',
      quote: '“Success: a strong spring.”',
    },
    {
      key: 'br7',
      label: 'Dealer co-op split',
      hint: 'Affects budget and asset variants',
      type: 'text',
      value: 'DRAFT — 70 / 30 brand to dealer',
      conf: 38,
      cite: 'not stated in the brief',
      reasoning: 'The brief calls the campaign dealer-led but gives no split. The default from your last co-op campaign was applied.',
      quote: '“Dealer-led, details to follow.”',
    },
  ],
};

export interface ChatStep {
  agent: string;
  replies: string[];
  /** Which part of the brief this answer fills in. */
  slot?: string;
}

/** Two conversation scripts: `brand` when the knowledge base is connected,
 *  `clean` when the agent has to ask for everything itself. */
export const chatScripts: Record<'brand' | 'clean', ChatStep[]> = {
  brand: [
    {
      agent: 'I have your brand, legal and style rules loaded. What are we launching?',
      replies: ['Back to School campaign', 'Test-ride push', 'Dealer co-op campaign'],
      slot: 'objective',
    },
    {
      agent: 'Your confirmed markets are Netherlands, Germany and Belgium. Where does this one run?',
      replies: ['All three markets', 'Germany only', 'Netherlands only'],
      slot: 'markets',
    },
    {
      agent: 'Which social formats should I draft?',
      replies: ['All social formats', 'Instagram only', 'LinkedIn only'],
      slot: 'channels',
    },
    {
      agent: 'Tone is direct and technical, superlatives are blocked, and any range figure carries the WLTP-e footnote. I have a draft in the preview — want variants?',
      replies: ['Draft three variants', 'Change the angle'],
      slot: 'refine',
    },
    {
      agent: 'Three variants are in the preview. Every line stays inside your claim library, so this can go straight to legal review.',
      replies: [],
    },
  ],
  clean: [
    {
      agent: 'No brand data is connected, so I will ask a few things first. What do you sell, and who should hear about it?',
      replies: ['E-bikes for city commuters', 'Cargo bikes for families', 'Something else'],
      slot: 'objective',
    },
    {
      agent: 'Which market and language should I write for?',
      replies: ['Netherlands, Dutch', 'Germany, German', 'Multiple markets, English'],
      slot: 'markets',
    },
    {
      agent: 'How should it sound? Pick the closest and I will keep it consistent.',
      replies: ['Direct and technical', 'Warm and friendly', 'Premium and restrained'],
      slot: 'tone',
    },
    {
      agent: 'Any numbers or claims I can use? Without them I will keep the copy qualitative.',
      replies: ['90 km range, 12-year warranty', 'Nothing to share yet'],
      slot: 'claims',
    },
    {
      agent: 'Drafted from what you told me. Upload your brand book later and I will re-check this draft against your real rules.',
      replies: [],
    },
  ],
};
