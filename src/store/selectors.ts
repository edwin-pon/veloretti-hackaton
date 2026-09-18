import type { AppState } from './appStore';
import { parseAssetId } from './appStore';
import { brandOf } from '../data/brands';
import { checkAsset } from '../data/compliance';
import type { RuleViolation } from '../data/compliance';
import { documentOrder, sourceDocuments } from '../data/documents';
import { knowledgePages } from '../data/knowledge';
import type { DocumentKey, ExtractedField } from '../data/types';
import { markets, platforms } from '../data/markets';
import type { MediaItem, MediaStatus } from '../data/media';
import { targetAudiences } from '../data/audiences';
import { campaignByName } from '../data/campaigns';
import type { CanvasAsset, Screen } from './types';

export const MEDIA_PAGE_SIZE = 24;

/* ------------------------------------------------------------------ fields */

export type FieldState = 'edited' | 'review' | 'extracted';

/** How a field is presented: edited by a human, needing review, or accepted
 *  as extracted. Low confidence is what triggers a review. */
export function fieldState(state: AppState, field: ExtractedField): FieldState {
  if (state.touched[field.key]) return 'edited';
  if (field.conf < 80) return 'review';
  return 'extracted';
}

export const FIELD_STATE_LABEL: Record<FieldState, string> = {
  edited: 'Edited by you',
  review: 'Needs review',
  extracted: 'Extracted',
};

export function confidenceTone(conf: number): 'ok' | 'warn' | 'block' {
  if (conf >= 85) return 'ok';
  if (conf >= 70) return 'warn';
  return 'block';
}

/* --------------------------------------------------------------- documents */

export function documentsDone(state: AppState): Partial<Record<DocumentKey, boolean>> {
  return state.doneByBrand[state.brandKey] ?? {};
}

export function onboardingComplete(state: AppState): boolean {
  const done = documentsDone(state);
  return documentOrder.every((key) => done[key]);
}

export function onboardingProgress(state: AppState): number {
  const done = documentsDone(state);
  return documentOrder.filter((key) => done[key]).length;
}

/** Fields needing review across every document, used for the dashboard count. */
export function fieldsNeedingReview(state: AppState): ExtractedField[] {
  return sourceDocuments
    .flatMap((doc) => doc.sections.flatMap((section) => section.fields))
    .filter((field) => fieldState(state, field) === 'review');
}

/* ------------------------------------------------------------------ canvas */

export interface CanvasAssetView {
  id: string;
  asset: CanvasAsset;
  marketName: string;
  marketKey: string;
  locale: string;
  platformName: string;
  platformKey: string;
  format: string;
  width: number;
  height: number;
  audienceId: string | null;
  audienceName: string | null;
  violations: RuleViolation[];
  blocked: boolean;
  warned: boolean;
  approved: string | null;
  edited: boolean;
}

/** Every asset id the current campaign covers, including per-audience variants. */
export function canvasAssetIds(state: AppState): string[] {
  const campaign = campaignByName(state.activeCampaign);
  const audiences = campaign.audiences
    ? targetAudiences.filter((audience) => campaign.audiences?.includes(audience.id))
    : [];
  const ids: string[] = [];
  markets.forEach((market) =>
    platforms.forEach((platform) => {
      const base = `${market.key}-${platform.key}`;
      if (audiences.length === 0) {
        ids.push(base);
        return;
      }
      audiences.forEach((audience) => ids.push(`${base}--${audience.id}`));
    }),
  );
  return ids;
}

export function canvasAssetView(state: AppState, id: string): CanvasAssetView | null {
  const items = state.canvasItems;
  if (!items) return null;
  const asset = items[id] ?? items[id.split('--')[0]];
  if (!asset) return null;
  const parts = parseAssetId(id);
  const locale = parts.market?.locale ?? '';
  const violations = state.compRun ? checkAsset({ ...asset, locale }, locale) : [];
  return {
    id,
    asset,
    marketName: parts.market?.name ?? '',
    marketKey: parts.market?.key ?? '',
    locale,
    platformName: parts.platform?.name ?? '',
    platformKey: parts.platform?.key ?? '',
    format: parts.platform?.format ?? '',
    width: parts.platform?.w ?? 260,
    height: parts.platform?.h ?? 260,
    audienceId: parts.audience?.id ?? null,
    audienceName: parts.audience?.name ?? null,
    violations,
    blocked: violations.some((violation) => violation.severity === 'block'),
    warned: violations.some((violation) => violation.severity === 'warn'),
    approved: state.approvedAssets[id] ?? null,
    edited: Boolean(state.canvasEdited[id]),
  };
}

export function canvasAssetViews(state: AppState): CanvasAssetView[] {
  return canvasAssetIds(state)
    .map((id) => canvasAssetView(state, id))
    .filter((view): view is CanvasAssetView => view !== null);
}

export interface CanvasSummary {
  total: number;
  blocked: number;
  warned: number;
  clean: number;
  approved: number;
  edited: number;
}

export function canvasSummary(state: AppState): CanvasSummary {
  const views = canvasAssetViews(state);
  return {
    total: views.length,
    blocked: views.filter((view) => view.blocked).length,
    warned: views.filter((view) => !view.blocked && view.warned).length,
    clean: views.filter((view) => view.violations.length === 0).length,
    approved: views.filter((view) => view.approved).length,
    edited: views.filter((view) => view.edited).length,
  };
}

/** True when nothing blocks the campaign from being rendered. */
export function canRender(state: AppState): boolean {
  const summary = canvasSummary(state);
  return state.compRun && summary.blocked === 0 && summary.total > 0;
}

/** Luminance test so text can flip to dark on a light background. */
export function isLightTone(color: string | undefined | null): boolean {
  if (!color) return false;
  const hex = /^#([0-9a-f]{6})$/i.exec(String(color));
  let r: number;
  let g: number;
  let b: number;
  if (hex) {
    const value = parseInt(hex[1], 16);
    r = (value >> 16) & 255;
    g = (value >> 8) & 255;
    b = value & 255;
  } else {
    const rgb = /(\d+)[,\s]+(\d+)[,\s]+(\d+)/.exec(String(color));
    if (!rgb) return false;
    r = Number(rgb[1]);
    g = Number(rgb[2]);
    b = Number(rgb[3]);
  }
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 150;
}

/* ------------------------------------------------------------------- media */

export function mediaStatusOf(state: AppState, item: MediaItem): MediaStatus {
  if (state.mediaTouched[item.id]) return 'Confirmed';
  return item.conf < 70 ? 'Needs review' : 'Tagged';
}

export function filteredMedia(state: AppState): MediaItem[] {
  const query = state.mediaQuery.trim().toLowerCase();
  return (state.mediaItems ?? []).filter((item) => {
    if (state.mediaKind !== 'All' && `${item.kind}s` !== state.mediaKind) return false;
    if (state.mediaMarket !== 'All' && item.market !== state.mediaMarket) return false;
    if (state.mediaStatus !== 'All' && mediaStatusOf(state, item) !== state.mediaStatus) {
      return false;
    }
    if (state.mediaTag && !item.tags.includes(state.mediaTag)) return false;
    if (
      query &&
      !`${item.name} ${item.desc} ${item.tags.join(' ')}`.toLowerCase().includes(query)
    ) {
      return false;
    }
    return true;
  });
}

export function mediaPageItems(state: AppState, items: MediaItem[]): MediaItem[] {
  const start = state.mediaPage * MEDIA_PAGE_SIZE;
  return items.slice(start, start + MEDIA_PAGE_SIZE);
}

export function selectedMedia(state: AppState): MediaItem | null {
  if (!state.mediaSelId) return null;
  return (state.mediaItems ?? []).find((item) => item.id === state.mediaSelId) ?? null;
}

/* ------------------------------------------------------------------- chrome */

const CAMPAIGN_SCREENS: Screen[] = [
  'campaigns',
  'campaignStart',
  'campaignBrief',
  'briefAnalyzing',
  'dirAnalyzing',
  'campaign',
  'canvas',
  'media',
];

export function isCampaignScreen(screen: Screen): boolean {
  return CAMPAIGN_SCREENS.includes(screen);
}

export function sectionOf(screen: Screen): string {
  if (screen === 'workspace') return 'Workspace';
  if (screen === 'activity') return 'Activity';
  if (screen === 'settings') return 'Settings';
  if (screen === 'media') return 'Media manager';
  if (isCampaignScreen(screen)) return 'Campaigns';
  return 'Brand knowledge';
}

export function crumbOf(state: AppState): string {
  const { screen } = state;
  switch (screen) {
    case 'workspace':
      return 'Administration';
    case 'activity':
      return 'All events';
    case 'settings':
      return 'Workspace';
    case 'dashboard':
      return 'Dashboard';
    case 'media':
      return 'Library';
    case 'canvas':
      return `${state.activeCampaign} · Asset canvas`;
    case 'campaign':
      return 'Campaign draft';
    case 'campaignBrief':
      return 'Campaign brief';
    case 'briefAnalyzing':
      return 'Reading the brief';
    case 'dirAnalyzing':
      return 'Generating directions';
    case 'campaigns':
      return 'All campaigns';
    case 'campaignStart':
      return 'New campaign';
    case 'hub':
      return 'Onboarding';
    case 'kb': {
      const page = knowledgePages.find((item) => item.key === state.kbSection);
      return page?.label ?? knowledgePages[0].label;
    }
    default:
      return sourceDocuments.find((doc) => doc.key === state.doc)?.card ?? '';
  }
}

export function brandLabel(state: AppState): string {
  return brandOf(state.brandKey).name;
}

export function activityCount(state: AppState): number {
  return state.actScope === 'brand' ? 6 : 11;
}
