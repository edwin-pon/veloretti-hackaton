import type { DocumentKey } from './types';

export interface KnowledgePage {
  key: string;
  label: string;
  doc: DocumentKey;
  /** Section titles pulled from the source document. Empty means the page has
   *  its own content, as the target-audiences page does. */
  sections: string[];
  intro: string;
  /** Marks a page whose source document still needs a review pass. */
  review?: boolean;
}

export const knowledgePages: KnowledgePage[] = [
  {
    key: 'identity',
    label: 'Identity',
    doc: 'brand',
    sections: ['Identity'],
    intro: 'Who the brand is. Every generated headline and subject line inherits these.',
  },
  {
    key: 'look',
    label: 'Look and type',
    doc: 'style',
    review: true,
    sections: ['Colors', 'Fonts', 'Writing mechanics'],
    intro: 'Palette, typefaces and writing mechanics applied to every generated asset.',
  },
  {
    key: 'voice',
    label: 'Voice and messaging',
    doc: 'brand',
    sections: ['Voice', 'Proof'],
    intro: 'Tone attributes, banned wording and the claims the agent is allowed to make.',
  },
  {
    key: 'legal',
    label: 'Legal and claims',
    doc: 'legal',
    sections: ['Claims', 'Disclaimers', 'Data and consent', 'Approvals'],
    intro: 'Blocking rules and disclaimers the compliance agent checks every asset against.',
  },
  {
    key: 'markets',
    label: 'Markets',
    doc: 'brand',
    sections: ['Markets'],
    intro: 'Where campaigns run. Markets set language, currency and which legal rules apply.',
  },
  {
    key: 'audiences',
    label: 'Target audiences',
    doc: 'brand',
    sections: [],
    intro: 'Drafted by the agent from the brand book. Confirm each one before campaigns use it.',
  },
];

export const defaultKnowledgePage = 'identity';
