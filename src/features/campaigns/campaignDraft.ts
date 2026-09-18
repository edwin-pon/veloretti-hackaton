import { useMemo } from 'react';
import type { AppState } from '../../store/appStore';
import { brandOf } from '../../data/brands';
import { chatScripts } from '../../data/brief';
import type { ChatStep } from '../../data/brief';
import type { CampaignMode } from '../../store/types';

export interface ChatMessage {
  from: 'agent' | 'you';
  text: string;
}

export interface DirectionDraft {
  id: 'A' | 'B' | 'C';
  label: string;
  subject: string;
  headline: string;
  cta: string;
}

export interface BriefRow {
  label: string;
  value: string;
  source: string;
  pending: boolean;
}

export interface CampaignDraftModel {
  isBrandMode: boolean;
  script: ChatStep[];
  chat: ChatMessage[];
  replies: string[];
  stage: number;
  directions: DirectionDraft[];
  briefRows: BriefRow[];
  rules: string[];
  rulesNote: string;
  variantNote: string;
  canDraftAssets: boolean;
  modeLabel: string;
  tag: string;
  primary: string;
  accent: string;
  headingFamily: string;
  bodyFamily: string;
  headingWeight: number;
}

const BRAND_DIRECTIONS: DirectionDraft[] = [
  {
    id: 'A',
    label: 'Range first',
    subject: 'Ninety kilometres on one charge',
    headline: 'Ninety kilometres on one charge',
    cta: 'Book a test ride',
  },
  {
    id: 'B',
    label: 'Daily use',
    subject: 'One battery, both errands',
    headline: 'The school run and the shop run. One battery.',
    cta: 'Find your dealer',
  },
  {
    id: 'C',
    label: 'Engineering',
    subject: 'Built for daily distance',
    headline: 'Built for the distance you actually ride',
    cta: 'See the range figures',
  },
];

const CLEAN_DIRECTIONS: DirectionDraft[] = [
  {
    id: 'A',
    label: 'Plain',
    subject: 'An e-bike built for the daily commute',
    headline: 'Built for the daily commute',
    cta: 'Find a dealer',
  },
  {
    id: 'B',
    label: 'Benefit',
    subject: 'Skip the traffic, keep the time',
    headline: 'Arrive without the sweat or the parking',
    cta: 'See the models',
  },
  {
    id: 'C',
    label: 'Question',
    subject: 'Rethink your commute',
    headline: 'What if the commute was the good part?',
    cta: 'Book a test ride',
  },
];

const BRAND_RULES = [
  'Sentence case headings',
  'No superlatives',
  'No competitor names',
  'WLTP-e footnote',
  '4 blocked words',
  'Double opt-in (DE)',
];

function hexOf(value: unknown, fallback: string) {
  const match = /#[0-9a-fA-F]{3,8}/.exec(String(value ?? ''));
  return match ? match[0] : fallback;
}

function familyOf(value: unknown, fallback: string) {
  const family = String(value ?? '').split('—')[0].split(',')[0].trim();
  return family ? `"${family}", ${fallback}` : fallback;
}

/** Weight is read from the extracted value so mocks match the stated rule. */
function weightOf(value: unknown, fallback: number) {
  const match = /\b([1-9]00)\b/.exec(String(value ?? ''));
  if (match) return Number(match[1]);
  if (/bold/i.test(String(value ?? ''))) return 700;
  if (/medium/i.test(String(value ?? ''))) return 500;
  return fallback;
}

/** Derives the conversation, the three drafted directions and the rule summary
 *  from how far through the script the user has answered. */
export function buildCampaignDraft(state: AppState): CampaignDraftModel {
  const isBrandMode: boolean = state.campMode === ('brand' satisfies CampaignMode);
  const brand = brandOf(state.brandKey);
  const script = chatScripts[state.campMode];
  const picks = state.campPicks;
  const shown = Math.min(picks.length, script.length - 1);

  const chat: ChatMessage[] = [];
  for (let index = 0; index <= shown; index += 1) {
    chat.push({ from: 'agent', text: script[index].agent });
    if (picks[index] !== undefined) chat.push({ from: 'you', text: picks[index] });
  }

  const slots: Record<string, string> = {};
  script.forEach((step, index) => {
    if (step.slot && picks[index]) slots[step.slot] = picks[index];
  });

  const stage = picks.length;

  const briefRows: BriefRow[] = isBrandMode
    ? [
        {
          label: 'Objective',
          value: slots.objective || 'Not set',
          source: 'from you',
          pending: !slots.objective,
        },
        {
          label: 'Markets',
          value: slots.markets || 'NL, DE, BE',
          source: slots.markets ? 'from you' : 'brand data',
          pending: false,
        },
        {
          label: 'Tone',
          value: 'Direct, technical, understated',
          source: 'brand data',
          pending: false,
        },
        {
          label: 'Channels',
          value: slots.channels || 'Not set',
          source: 'from you',
          pending: !slots.channels,
        },
        {
          label: 'Claims',
          value: '5 approved claims available',
          source: 'brand data',
          pending: false,
        },
      ]
    : [
        {
          label: 'Objective',
          value: slots.objective || 'Ask the agent',
          source: 'from you',
          pending: !slots.objective,
        },
        {
          label: 'Market',
          value: slots.markets || 'Ask the agent',
          source: 'from you',
          pending: !slots.markets,
        },
        {
          label: 'Tone',
          value: slots.tone || 'Ask the agent',
          source: 'from you',
          pending: !slots.tone,
        },
        {
          label: 'Claims',
          value: slots.claims || 'Ask the agent',
          source: 'from you',
          pending: !slots.claims,
        },
      ];

  return {
    isBrandMode,
    script,
    chat,
    replies: script[shown]?.replies ?? [],
    stage,
    directions: isBrandMode ? BRAND_DIRECTIONS : CLEAN_DIRECTIONS,
    briefRows,
    rules: isBrandMode ? BRAND_RULES : [],
    rulesNote: isBrandMode
      ? '6 checks run before this campaign can be scheduled'
      : 'No checks running. Connect brand data to enforce legal and style rules.',
    variantNote:
      stage >= 4
        ? isBrandMode
          ? '3 variants drafted · all inside the claim library'
          : '3 variants drafted · claims unverified'
        : '',
    canDraftAssets: stage >= 2,
    modeLabel: isBrandMode
      ? `Using ${brand.name} brand data`
      : 'Starting clean — no brand data',
    tag: isBrandMode ? brand.name.toUpperCase() : 'YOUR BRAND',
    primary: isBrandMode ? hexOf(state.values.c1, '#1A1A1A') : '#4B4943',
    accent: isBrandMode ? hexOf(state.values.c2, '#FE5900') : '#E8E8E6',
    headingFamily: isBrandMode
      ? familyOf(state.values.f1, 'Helvetica Neue, Arial, sans-serif')
      : 'Helvetica Neue, Arial, sans-serif',
    bodyFamily: isBrandMode
      ? familyOf(state.values.f2, 'Helvetica Neue, Arial, sans-serif')
      : 'Helvetica Neue, Arial, sans-serif',
    headingWeight: isBrandMode ? weightOf(state.values.f1, 500) : 500,
  };
}

export function useCampaignDraft(state: AppState): CampaignDraftModel {
  return useMemo(() => buildCampaignDraft(state), [state]);
}
