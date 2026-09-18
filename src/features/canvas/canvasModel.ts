import type { AppState } from '../../store/appStore';
import { parseAssetId } from '../../store/appStore';
import { brandOf } from '../../data/brands';
import { campaignByName } from '../../data/campaigns';
import { checkAsset } from '../../data/compliance';
import type { RuleViolation } from '../../data/compliance';
import { markets, platforms } from '../../data/markets';
import type { Market, Platform } from '../../data/markets';
import type { MediaItem } from '../../data/media';
import { audienceLine, targetAudiences } from '../../data/audiences';
import type { TargetAudience } from '../../data/audiences';
import { isLightTone } from '../../store/selectors';
import type { CanvasAsset } from '../../store/types';

export type AssetApproval = 'approved' | 'review' | null;
export type AssetStatus =
  | 'Approved'
  | 'In review'
  | 'Blocked'
  | 'To fix'
  | 'Passes'
  | 'Not checked';

export interface CanvasCard {
  id: string;
  asset: CanvasAsset;
  platform: Platform;
  media: MediaItem | null;
  background: string;
  lightBackground: boolean;
  violations: RuleViolation[];
  blockers: number;
  status: AssetStatus;
  approval: AssetApproval;
  edited: boolean;
  checked: boolean;
}

export interface CanvasRow {
  key: string;
  market: Market;
  audience: TargetAudience | null;
  cards: CanvasCard[];
}

export interface CanvasSection {
  market: Market;
  rows: CanvasRow[];
  cards: CanvasCard[];
  status: AssetStatus;
  legalNote: string;
  canApprove: boolean;
  anyChecked: boolean;
}

export interface RenderFormat {
  label: string;
  dims: string;
  per: number;
  count: number;
}

export interface CanvasModel {
  sections: CanvasSection[];
  allCards: CanvasCard[];
  shownMarkets: Market[];
  shownPlatforms: Platform[];
  audiences: (TargetAudience | null)[];
  brandTag: string;
  campaignName: string;
  filterNote: string;
  filterCount: number;
  complianceSummary: string;
  approvalSummary: string;
  approvedCount: number;
  allApproved: boolean;
  renderFormats: RenderFormat[];
  renderTotal: number;
  selected: CanvasCard | null;
  selectedLabel: string;
  selectedMarket: Market | null;
  selectedAudience: TargetAudience | null;
  scopeCount: number;
}

const DEFAULT_ASSET: CanvasAsset = { title: '', desc: '', bg: '#1A1A1A' };

const RENDER_DEFINITIONS: Omit<RenderFormat, 'count'>[] = [
  { label: 'Instagram feed', dims: '1080 × 1080', per: 1 },
  { label: 'Instagram story and Reels cover', dims: '1080 × 1920', per: 1 },
  { label: 'LinkedIn single image', dims: '1200 × 627', per: 1 },
  { label: 'Display banner set', dims: '300 × 250, 728 × 90, 970 × 250', per: 3 },
  { label: 'Source files', dims: 'Layered PSD and PDF', per: 2 },
];

function statusOf(
  approval: AssetApproval,
  checked: boolean,
  violations: RuleViolation[],
): AssetStatus {
  if (approval === 'approved') return 'Approved';
  if (approval === 'review') return 'In review';
  if (!checked) return 'Not checked';
  if (violations.some((violation) => violation.severity === 'block')) return 'Blocked';
  return violations.length ? 'To fix' : 'Passes';
}

/** Resolves the whole canvas: which markets and channels are visible, the asset
 *  on every cell, its compliance result and approval state. */
export function buildCanvas(state: AppState): CanvasModel {
  const items = state.canvasItems ?? {};
  const campaign = campaignByName(state.activeCampaign);
  const library = state.mediaItems ?? [];

  const audiences: (TargetAudience | null)[] = [
    null,
    ...(campaign.audiences
      ? targetAudiences.filter((audience) => campaign.audiences?.includes(audience.id))
      : targetAudiences.filter((audience) => state.audienceConfirmed[audience.id])),
  ];

  const shownMarkets = markets
    .filter((market) => campaign.marketKeys.includes(market.key))
    .filter(
      (market) =>
        state.canvasMarketFilter.length === 0 ||
        state.canvasMarketFilter.includes(market.key),
    );

  const shownPlatforms = platforms.filter(
    (platform) =>
      state.canvasChannelFilter.length === 0 ||
      state.canvasChannelFilter.includes(platform.key),
  );

  const buildCard = (
    market: Market,
    platform: Platform,
    audience: TargetAudience | null,
  ): CanvasCard => {
    const baseId = `${market.key}-${platform.key}`;
    const id = audience ? `${baseId}--${audience.id}` : baseId;
    const base = items[baseId] ?? DEFAULT_ASSET;
    const asset =
      items[id] ??
      (audience
        ? { ...base, desc: audienceLine(audience.id, market.locale) ?? base.desc }
        : base);

    const media = asset.mediaId
      ? (library.find((item) => item.id === asset.mediaId) ?? null)
      : null;
    const violations = state.compRun ? checkAsset(asset, market.locale) : [];
    const approval = (state.approvedAssets[id] as AssetApproval) ?? null;
    const background = media ? media.tone : asset.bg;

    return {
      id,
      asset,
      platform,
      media,
      background,
      lightBackground: !media && isLightTone(asset.bg),
      violations,
      blockers: violations.filter((violation) => violation.severity === 'block').length,
      status: statusOf(approval, state.compRun, violations),
      approval,
      edited: Boolean(state.canvasEdited[id]),
      checked: state.compRun,
    };
  };

  const sections: CanvasSection[] = shownMarkets.map((market) => {
    const rows: CanvasRow[] = audiences.map((audience) => ({
      key: `${market.key}-${audience?.id ?? 'generic'}`,
      market,
      audience,
      cards: shownPlatforms.map((platform) => buildCard(market, platform, audience)),
    }));
    const cards = rows.flatMap((row) => row.cards);
    const blocked = cards.filter((card) => card.checked && card.blockers > 0).length;
    const toFix = cards.filter(
      (card) => card.checked && card.blockers === 0 && card.violations.length > 0,
    ).length;
    const anyChecked = cards.some((card) => card.checked);

    return {
      market,
      rows,
      cards,
      anyChecked,
      status: !anyChecked
        ? 'Not checked'
        : blocked
          ? 'Blocked'
          : toFix
            ? 'To fix'
            : 'Passes',
      legalNote: `${market.name} claims clear against the confirmed legal guidelines for ${market.locale}.`,
      canApprove: anyChecked && blocked === 0,
    };
  });

  const allCards = sections.flatMap((section) => section.cards);
  const approvedCount = allCards.filter((card) => card.approval === 'approved').length;

  const complianceSummary = (() => {
    if (!state.compRun) return '6 rules ready · nothing checked yet';
    const blocked = allCards.filter((card) => card.blockers > 0).length;
    const warned = allCards.filter(
      (card) => card.blockers === 0 && card.violations.length > 0,
    ).length;
    const clean = allCards.filter((card) => card.violations.length === 0).length;
    return `${clean} pass · ${warned} to fix · ${blocked} blocked`;
  })();

  const approvalSummary = (() => {
    const approved = allCards.filter((card) => card.approval === 'approved').length;
    const review = allCards.filter((card) => card.approval === 'review').length;
    const unchecked = state.compRun ? 0 : allCards.filter((card) => !card.approval).length;
    const blocked = state.compRun
      ? allCards.filter((card) => !card.approval && card.blockers > 0).length
      : 0;
    const ready = state.compRun
      ? allCards.filter((card) => !card.approval && card.blockers === 0).length
      : 0;

    const parts: string[] = [];
    if (approved) parts.push(`${approved} approved`);
    if (review) parts.push(`${review} in review`);
    if (unchecked) parts.push(`${unchecked} unchecked`);
    if (state.compRun) {
      parts.push(`${ready} awaiting approval`);
      if (blocked) parts.push(`${blocked} blocked`);
    }
    return parts.join(' · ');
  })();

  const renderFormats = RENDER_DEFINITIONS.map((definition) => ({
    ...definition,
    count: definition.per * approvedCount,
  }));

  const selected = state.canvasSel
    ? (allCards.find((card) => card.id === state.canvasSel) ?? null)
    : null;
  const selectedParts = state.canvasSel ? parseAssetId(state.canvasSel) : null;

  return {
    sections,
    allCards,
    shownMarkets,
    shownPlatforms,
    audiences,
    brandTag: brandOf(state.brandKey).name.toUpperCase(),
    campaignName: campaign.name,
    filterCount: state.canvasMarketFilter.length + state.canvasChannelFilter.length,
    filterNote: (() => {
      const count = shownMarkets.length * shownPlatforms.length * audiences.length;
      return audiences.length > 1
        ? `${count} assets · generic set plus ${audiences.length - 1} audiences`
        : `${count} assets · no audience split`;
    })(),
    complianceSummary,
    approvalSummary,
    approvedCount,
    allApproved: allCards.length > 0 && approvedCount === allCards.length,
    renderFormats,
    renderTotal: renderFormats.reduce((total, format) => total + format.count, 0),
    selected,
    selectedLabel: selectedParts
      ? [
          selectedParts.market?.name,
          selectedParts.platform?.name,
          selectedParts.audience?.name,
        ]
          .filter(Boolean)
          .join(' · ')
      : '',
    selectedMarket: selectedParts?.market ?? null,
    selectedAudience: selectedParts?.audience ?? null,
    scopeCount: 0,
  };
}
