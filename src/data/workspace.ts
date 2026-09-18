export type RoleKey =
  | 'Owner'
  | 'Campaign manager'
  | 'Legal reviewer'
  | 'Editor'
  | 'Viewer';

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: RoleKey;
  brands: string;
  last: string;
}

export interface RoleDefinition {
  key: RoleKey;
  desc: string;
  can: string[];
}

export interface ApprovalRule {
  id: string;
  label: string;
  desc: string;
  approver: string;
  on: boolean;
}

export type IntegrationStatus = 'Connected' | 'Needs attention' | 'Not connected';

export interface Integration {
  id: string;
  name: string;
  kind: string;
  status: IntegrationStatus;
  meta: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: 't1',
    name: 'Mara Feldt',
    email: 'mara.feldt@pon.bike',
    role: 'Owner',
    brands: 'All brands',
    last: 'Active now',
  },
  {
    id: 't2',
    name: 'Joris Bakker',
    email: 'joris.bakker@pon.bike',
    role: 'Campaign manager',
    brands: 'Veloretti',
    last: '2 hours ago',
  },
  {
    id: 't3',
    name: 'Anna Lindqvist',
    email: 'anna.lindqvist@pon.bike',
    role: 'Legal reviewer',
    brands: 'All brands',
    last: 'Yesterday',
  },
  {
    id: 't4',
    name: 'Sven Adler',
    email: 'sven.adler@pon.bike',
    role: 'Editor',
    brands: 'Veloretti, Canondale',
    last: '4 days ago',
  },
  {
    id: 't5',
    name: 'Mila de Wit',
    email: 'mila.dewit@dealer.example',
    role: 'Viewer',
    brands: 'Veloretti',
    last: 'Invite pending',
  },
];

export const roleDefinitions: RoleDefinition[] = [
  {
    key: 'Owner',
    desc: 'Full control, including billing and integrations.',
    can: [
      'Everything an editor can do',
      'Manage team and roles',
      'Connect and disconnect channels',
    ],
  },
  {
    key: 'Campaign manager',
    desc: 'Builds and schedules campaigns within confirmed rules.',
    can: ['Create and edit campaigns', 'Edit assets on the canvas', 'Request legal approval'],
  },
  {
    key: 'Legal reviewer',
    desc: 'Signs off on flagged claims and blocking rules.',
    can: ['Approve or reject campaigns', 'Edit legal rules', 'Comment on any asset'],
  },
  {
    key: 'Editor',
    desc: 'Writes and edits copy, cannot schedule.',
    can: ['Edit assets and copy', 'Upload media', 'No scheduling rights'],
  },
  {
    key: 'Viewer',
    desc: 'Read-only access, useful for dealers and partners.',
    can: ['View campaigns and assets', 'Download approved assets'],
  },
];

export const approvalRules: ApprovalRule[] = [
  {
    id: 'a1',
    label: 'Paid media',
    desc: 'Any campaign with a media budget',
    approver: 'Legal reviewer',
    on: true,
  },
  {
    id: 'a2',
    label: 'Flagged claims',
    desc: 'Assets with a blocking compliance issue',
    approver: 'Legal reviewer',
    on: true,
  },
  {
    id: 'a3',
    label: 'New markets',
    desc: 'First campaign in a market',
    approver: 'Owner',
    on: true,
  },
  {
    id: 'a4',
    label: 'Every asset',
    desc: 'Review each asset before scheduling',
    approver: 'Legal reviewer',
    on: false,
  },
];

export const integrations: Integration[] = [
  {
    id: 'i2',
    name: 'Meta Ads',
    kind: 'Ad account',
    status: 'Connected',
    meta: '3 ad accounts · NL, DE, BE',
  },
  {
    id: 'i3',
    name: 'LinkedIn Ads',
    kind: 'Ad account',
    status: 'Needs attention',
    meta: 'Token expires in 6 days',
  },
  {
    id: 'i4',
    name: 'Bynder',
    kind: 'DAM',
    status: 'Connected',
    meta: '1.440 files mirrored into the media manager',
  },
  {
    id: 'i5',
    name: 'Google Ads',
    kind: 'Ad account',
    status: 'Not connected',
    meta: 'Connect to draft search and demand-gen assets',
  },
];

export const approverOptions = ['Owner', 'Legal reviewer', 'Campaign manager'] as const;
