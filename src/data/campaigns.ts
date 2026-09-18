import type { MarketKey } from './markets';

export type CampaignStatus = 'Draft' | 'In review' | 'Scheduled' | 'Approved' | 'Archived';

export interface Campaign {
  id: string;
  name: string;
  status: CampaignStatus;
  window: string;
  marketKeys: MarketKey[];
  channels: string;
  /** Assets currently carrying a compliance flag. */
  flagged: number;
  owner: string;
  /** The campaign the studio opens into. */
  live: boolean;
  /** Cleared for render. */
  ready?: boolean;
  /** Target-audience ids when the campaign is built per audience. */
  audiences?: string[];
}

export const campaigns: Campaign[] = [
  {
    id: 'c1',
    name: 'Back to School',
    status: 'Draft',
    window: '17 Aug — 28 Sep 2026',
    marketKeys: ['nl', 'de', 'be'],
    channels: 'Social',
    flagged: 2,
    owner: 'Mara Feldt',
    live: true,
  },
  {
    id: 'c2',
    name: 'Test-ride push',
    status: 'In review',
    window: '4 May — 1 Jun 2026',
    marketKeys: ['de'],
    channels: 'Social',
    flagged: 1,
    owner: 'Joris Bakker',
    live: false,
  },
  {
    id: 'c3',
    name: 'Dealer co-op autumn',
    status: 'Scheduled',
    window: '7 Sep — 19 Oct 2026',
    marketKeys: ['nl', 'be'],
    channels: 'Social',
    flagged: 0,
    owner: 'Mara Feldt',
    live: false,
  },
  {
    id: 'c5',
    name: 'Dealer open days',
    status: 'Approved',
    window: '2 Feb — 1 Mar 2026',
    marketKeys: ['nl', 'be'],
    channels: 'Social',
    flagged: 0,
    owner: 'Mara Feldt',
    live: false,
    ready: true,
  },
  {
    id: 'c6',
    name: 'Commuter season, by audience',
    status: 'Draft',
    window: '30 Mar — 24 May 2026',
    marketKeys: ['nl', 'de'],
    channels: 'Social',
    flagged: 1,
    owner: 'Mara Feldt',
    live: false,
    audiences: ['a1', 'a2', 'a3'],
  },
  {
    id: 'c4',
    name: 'Winter commuter',
    status: 'Archived',
    window: '11 Nov — 22 Dec 2025',
    marketKeys: ['nl', 'de'],
    channels: 'Social',
    flagged: 0,
    owner: 'Sven Adler',
    live: false,
  },
];

export const defaultCampaignName = 'Back to School';

export function campaignByName(name: string | null | undefined): Campaign {
  return campaigns.find((campaign) => campaign.name === name) ?? campaigns[0];
}
