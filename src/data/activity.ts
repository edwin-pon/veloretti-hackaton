export type ActivityKind =
  | 'Approval'
  | 'Check'
  | 'Edit'
  | 'Ingest'
  | 'Rule'
  | 'Extraction'
  | 'Campaign'
  | 'Schedule'
  | 'Workspace'
  | 'Render';

export type ActivityScope = 'asset' | 'campaign' | 'brand' | 'workspace';

export interface ActivityEvent {
  id: string;
  /** Null for workspace-level events that are not tied to one brand. */
  brand: string | null;
  who: string;
  kind: ActivityKind;
  scope: ActivityScope;
  target: string;
  text: string;
  when: string;
}

/** Every agent and human action, newest first. Agents are named so it is always
 *  clear which changes were machine-made. */
export const activityLog: ActivityEvent[] = [
  {
    id: 'ev1',
    brand: 'veloretti',
    who: 'Mara Feldt',
    kind: 'Approval',
    scope: 'asset',
    target: 'Netherlands · Instagram',
    text: 'Approved the asset after the compliance check passed.',
    when: '4 minutes ago',
  },
  {
    id: 'ev2',
    brand: 'veloretti',
    who: 'Compliance agent',
    kind: 'Check',
    scope: 'campaign',
    target: 'Cargo Line spring',
    text: 'Checked 12 assets against 6 rules. 2 blocked on a missing WLTP-e footnote.',
    when: '11 minutes ago',
  },
  {
    id: 'ev3',
    brand: 'veloretti',
    who: 'Joris Bakker',
    kind: 'Edit',
    scope: 'asset',
    target: 'Germany · LinkedIn',
    text: 'Changed the background to cargo-box-groceries-de-1006.jpg.',
    when: '38 minutes ago',
  },
  {
    id: 'ev4',
    brand: 'veloretti',
    who: 'Media agent',
    kind: 'Ingest',
    scope: 'brand',
    target: 'Media manager',
    text: 'Ingested 18 files and wrote descriptions and tags. 4 flagged as low confidence.',
    when: '2 hours ago',
  },
  {
    id: 'ev5',
    brand: 'veloretti',
    who: 'Anna Lindqvist',
    kind: 'Rule',
    scope: 'brand',
    target: 'Legal rules',
    text: 'Rewrote the Germany additional notice and confirmed the approval threshold.',
    when: 'Yesterday, 16:20',
  },
  {
    id: 'ev6',
    brand: 'veloretti',
    who: 'Brand agent',
    kind: 'Extraction',
    scope: 'brand',
    target: 'Style guide',
    text: 'Extracted 11 fields. Type scale flagged: desktop-only and contradicted by two layouts.',
    when: 'Yesterday, 15:48',
  },
  {
    id: 'ev7',
    brand: 'veloretti',
    who: 'Mara Feldt',
    kind: 'Campaign',
    scope: 'campaign',
    target: 'Cargo Line spring',
    text: 'Uploaded back-to-school-brief.docx and confirmed the extracted brief.',
    when: 'Yesterday, 11:05',
  },
  {
    id: 'ev8',
    brand: 'canondale',
    who: 'Joris Bakker',
    kind: 'Extraction',
    scope: 'brand',
    target: 'Brand information',
    text: 'Confirmed the extracted brand information for Canondale.',
    when: 'Yesterday, 09:12',
  },
  {
    id: 'ev9',
    brand: 'gazelle',
    who: 'Sven Adler',
    kind: 'Campaign',
    scope: 'campaign',
    target: 'Gazelle autumn teaser',
    text: 'Started a clean campaign with no brand data connected.',
    when: '2 days ago',
  },
  {
    id: 'ev10',
    brand: null,
    who: 'Sven Adler',
    kind: 'Workspace',
    scope: 'workspace',
    target: 'Team',
    text: 'Invited mila.dewit@dealer.example as a viewer.',
    when: '2 days ago',
  },
  {
    id: 'ev11',
    brand: null,
    who: 'Mara Feldt',
    kind: 'Workspace',
    scope: 'workspace',
    target: 'Integrations',
    text: 'Reconnected the LinkedIn Ads token before expiry.',
    when: '3 days ago',
  },
];

export const agentActors = ['Compliance agent', 'Media agent', 'Brand agent', 'Campaign agent'];

export function isAgent(who: string): boolean {
  return agentActors.includes(who);
}
