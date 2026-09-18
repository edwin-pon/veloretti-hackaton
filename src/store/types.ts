export type Screen =
  /* Onboarding */
  | 'hub'
  | 'upload'
  | 'analyzing'
  | 'review'
  /* Knowledge */
  | 'dashboard'
  | 'kb'
  /* Campaigns */
  | 'campaigns'
  | 'campaignStart'
  | 'campaignBrief'
  | 'briefAnalyzing'
  | 'dirAnalyzing'
  | 'campaign'
  | 'canvas'
  /* Library and administration */
  | 'media'
  | 'workspace'
  | 'activity'
  | 'settings';

/** `brand` starts from the confirmed knowledge base, `clean` starts from nothing. */
export type CampaignMode = 'brand' | 'clean';

export type SettingsTab = 'team' | 'approvals' | 'channels';

export type MediaKindFilter = 'All' | 'Images' | 'Videos';

export type MediaStatusFilter = 'All' | 'Tagged' | 'Needs review' | 'Confirmed';

/** A single generated asset on the canvas. */
export interface CanvasAsset {
  title: string;
  desc: string;
  /** Flat background colour, used when no photograph is placed. */
  bg: string;
  /** Media library id when a photograph is used as the background. */
  mediaId?: string | null;
  /** Flat tone of the placed photograph, for text contrast decisions. */
  mediaTone?: string;
  mediaName?: string;
}

export const SECTION_LABELS: Record<string, string> = {
  knowledge: 'Brand knowledge',
  campaigns: 'Campaigns',
  media: 'Media manager',
  workspace: 'Workspace',
  activity: 'Activity',
  settings: 'Settings',
};
