import { create } from 'zustand';
import type { BrandKey } from '../data/brands';
import { brandOf, defaultBrandKey, forBrand } from '../data/brands';
import { briefDocument } from '../data/brief';
import { defaultAssetBackgrounds } from '../data/campaignMedia';
import type { Campaign } from '../data/campaigns';
import { campaignByName, defaultCampaignName } from '../data/campaigns';
import { documentOrder, sourceDocuments } from '../data/documents';
import type { DirectionKey, MarketKey, PlatformKey } from '../data/markets';
import { directionCopy, markets, platforms, seededViolations } from '../data/markets';
import type { MediaItem } from '../data/media';
import { buildMediaLibrary, newUpload } from '../data/media';
import { targetAudiences } from '../data/audiences';
import type { ApprovalRule, RoleKey, TeamMember } from '../data/workspace';
import { approvalRules, teamMembers } from '../data/workspace';
import type { DocumentKey, FieldValue } from '../data/types';
import type {
  CampaignMode,
  CanvasAsset,
  MediaKindFilter,
  MediaStatusFilter,
  Screen,
  SettingsTab,
} from './types';

const DEFAULT_CANVAS_BACKGROUND = '#1A1A1A';

/** Every extracted value, seeded from the documents for the selected brand. */
function seedValues(brandKey: BrandKey): Record<string, FieldValue> {
  const brand = brandOf(brandKey);
  const values: Record<string, FieldValue> = {};
  briefDocument.fields.forEach((field) => {
    values[field.key] = field.value;
  });
  sourceDocuments.forEach((doc) =>
    doc.sections.forEach((section) =>
      section.fields.forEach((field) => {
        values[field.key] = Array.isArray(field.value)
          ? field.value.map((item) => forBrand(item, brand))
          : typeof field.value === 'string'
            ? forBrand(field.value, brand)
            : field.value;
      }),
    ),
  );
  return values;
}

/** Builds the starting asset set for a creative direction: one card per market
 *  per placement, with two deliberately non-compliant seeds. */
export function seedCanvas(
  direction: DirectionKey,
  brandKey: BrandKey,
  clean = false,
): Record<string, CanvasAsset> {
  const brand = brandOf(brandKey);
  const copy = directionCopy[direction] ?? directionCopy.A;
  const items: Record<string, CanvasAsset> = {};
  markets.forEach((market) =>
    platforms.forEach((platform) => {
      const key = `${market.key}-${platform.key}`;
      const violation = clean ? null : seededViolations[key];
      // Assets open on the generated shoot for their market, so the canvas shows
      // real creative rather than placeholder colour.
      const mediaId = defaultAssetBackgrounds[key] ?? null;
      items[key] = violation
        ? {
            title: violation.title,
            desc: violation.desc,
            bg: DEFAULT_CANVAS_BACKGROUND,
            mediaId,
          }
        : {
            title: forBrand(copy[market.key] ?? market.title, brand),
            desc: forBrand(
              platform.key === 'li' ? market.desc : `${market.desc.split('.')[0]}.`,
              brand,
            ),
            bg: DEFAULT_CANVAS_BACKGROUND,
            mediaId,
          };
    }),
  );
  return items;
}

export interface AssetIdParts {
  market: (typeof markets)[number] | undefined;
  platform: (typeof platforms)[number] | undefined;
  audience: (typeof targetAudiences)[number] | null;
  baseId: string;
}

/** Asset ids are `market-platform` with an optional `--audience` suffix. */
export function parseAssetId(id: string): AssetIdParts {
  const [baseId, audienceId] = String(id).split('--');
  const [marketKey, platformKey] = baseId.split('-');
  return {
    market: markets.find((market) => market.key === (marketKey as MarketKey)),
    platform: platforms.find((platform) => platform.key === (platformKey as PlatformKey)),
    audience: audienceId
      ? (targetAudiences.find((item) => item.id === audienceId) ?? null)
      : null,
    baseId,
  };
}

export type BackgroundScope = 'one' | 'channel' | 'locale' | 'audience' | 'all';

export interface AppState {
  /* Navigation */
  screen: Screen;
  brandKey: BrandKey;
  brandsOpen: boolean;

  /* Onboarding + knowledge base */
  doc: DocumentKey;
  file: boolean;
  progress: number;
  values: Record<string, FieldValue>;
  touched: Record<string, boolean>;
  why: string | null;
  doneByBrand: Record<BrandKey, Partial<Record<DocumentKey, boolean>>>;
  kbSection: string;
  audienceConfirmed: Record<string, boolean>;

  /* Campaign flow */
  campMode: CampaignMode;
  campPicks: string[];
  campDraft: string;
  campVariant: DirectionKey;
  campInfo: boolean;
  briefFile: boolean;
  briefRead: boolean;
  briefProgress: number;
  dirProgress: number;
  activeCampaign: string;

  /* Canvas */
  canvasItems: Record<string, CanvasAsset> | null;
  canvasSel: string | null;
  canvasZoom: number;
  canvasX: number;
  canvasY: number;
  canvasDragging: boolean;
  canvasEdited: Record<string, boolean>;
  approvedAssets: Record<string, string>;
  bgScope: BackgroundScope;
  /** Market keys the canvas is filtered to; empty means all. */
  canvasMarketFilter: MarketKey[];
  /** Platform keys the canvas is filtered to; empty means all. */
  canvasChannelFilter: PlatformKey[];
  canvasFiltersOpen: boolean;
  /** Asset whose compliance panel is open. */
  compOpenId: string | null;
  renderOpen: boolean;
  renderDownloaded: string | null;
  pickerOpen: boolean;
  pickerQuery: string;
  pickerKind: 'All' | 'Image' | 'Video';

  /* Compliance + render */
  compBusy: boolean;
  compProgress: number;
  compRun: boolean;
  renderQueued: boolean;
  renderCampaign: string;
  renderTotal: number;
  renderProgress: number;

  /* Media */
  mediaItems: MediaItem[] | null;
  mediaBusy: boolean;
  mediaProgress: number;
  mediaTouched: Record<string, boolean>;
  mediaQuery: string;
  mediaKind: MediaKindFilter;
  mediaMarket: string;
  mediaStatus: MediaStatusFilter;
  mediaTag: string;
  mediaPage: number;
  mediaSelId: string | null;
  /** Set when the canvas sent the user to pick a background. */
  mediaPickFor: string | null;

  /* Workspace + settings */
  setTab: SettingsTab;
  team: TeamMember[];
  approvals: ApprovalRule[];
  roleFocus: RoleKey;
  inviteEmail: string;
  inviteRole: RoleKey;
  approvalSla: number;
  autoApprove: boolean;
  /** Activity filters */
  actActor: 'all' | 'people' | 'agents';
  actKinds: string[];
  actQuery: string;
  actScope: 'brand' | 'all';
}

export interface AppActions {
  go: (screen: Screen, patch?: Partial<AppState>) => void;
  patch: (patch: Partial<AppState>) => void;
  selectBrand: (key: BrandKey) => void;
  toggleBrands: () => void;

  /* Onboarding */
  openUpload: (doc: DocumentKey) => void;
  attachFile: () => void;
  startAnalysis: () => void;
  setValue: (key: string, value: FieldValue) => void;
  toggleWhy: (key: string) => void;
  approveDocument: () => void;
  restartOnboarding: () => void;
  confirmAudience: (id: string, confirmed: boolean) => void;

  /* Campaign */
  startCampaign: (mode: CampaignMode) => void;
  attachBrief: () => void;
  readBrief: () => void;
  runDirections: (seedFromBrief: boolean) => void;
  enterChat: (seedFromBrief: boolean) => void;
  sendReply: (text: string) => void;
  setDraft: (text: string) => void;
  setVariant: (variant: DirectionKey) => void;
  openCampaign: (name: string) => void;

  /* Canvas */
  openCanvas: (campaign?: string) => void;
  setCanvasAsset: (id: string, patch: Partial<CanvasAsset>) => void;
  setCanvasBackground: (id: string, patch: Partial<CanvasAsset>) => void;
  selectAsset: (id: string | null) => void;
  toggleMarketFilter: (key: MarketKey) => void;
  toggleChannelFilter: (key: PlatformKey) => void;
  setZoom: (zoom: number) => void;
  setPan: (x: number, y: number) => void;
  setDragging: (dragging: boolean) => void;
  setApproval: (ids: string[], state: string | null) => void;
  runCompliance: () => void;
  startRender: (name: string, total: number) => void;

  /* Media */
  openMedia: (pickFor?: string | null) => void;
  ingestMedia: () => void;
  setMediaItem: (id: string, patch: Partial<MediaItem>) => void;
  setMediaFilter: (patch: Partial<AppState>) => void;

  /* Workspace + settings */
  setRole: (id: string, role: RoleKey) => void;
  removeMember: (id: string) => void;
  invite: () => void;
  setApprovalRule: (id: string, patch: Partial<ApprovalRule>) => void;
  toggleActivityKind: (kind: string) => void;
}

export type AppStore = AppState & AppActions;

/** Interval handles live outside the store so state stays serialisable. */
const timers: Record<string, ReturnType<typeof setInterval> | undefined> = {};

function clear(name: string) {
  if (timers[name]) {
    clearInterval(timers[name]);
    timers[name] = undefined;
  }
}

/** Drives one of the simulated agent runs and resolves when it reaches 100%. */
function runProgress(
  name: string,
  stepMs: number,
  increment: number,
  onTick: (value: number) => void,
  onDone: () => void,
) {
  clear(name);
  let value = 0;
  onTick(0);
  timers[name] = setInterval(() => {
    value += increment;
    if (value >= 100) {
      clear(name);
      onTick(100);
      onDone();
      return;
    }
    onTick(value);
  }, stepMs);
}

export function stopAllTimers() {
  Object.keys(timers).forEach(clear);
}

const initialState: AppState = {
  screen: 'hub',
  brandKey: defaultBrandKey,
  brandsOpen: false,

  doc: 'brand',
  file: false,
  progress: 0,
  values: seedValues(defaultBrandKey),
  touched: {},
  why: null,
  doneByBrand: { veloretti: {}, canondale: {}, gazelle: {} },
  kbSection: 'identity',
  audienceConfirmed: {},

  campMode: 'brand',
  campPicks: [],
  campDraft: '',
  campVariant: 'A',
  campInfo: false,
  briefFile: false,
  briefRead: false,
  briefProgress: 0,
  dirProgress: 0,
  activeCampaign: defaultCampaignName,

  canvasItems: null,
  canvasSel: null,
  canvasZoom: 0.8,
  canvasX: 0,
  canvasY: 0,
  canvasDragging: false,
  canvasEdited: {},
  approvedAssets: {},
  bgScope: 'one',
  canvasMarketFilter: [],
  canvasChannelFilter: [],
  canvasFiltersOpen: false,
  compOpenId: null,
  renderOpen: false,
  renderDownloaded: null,
  pickerOpen: false,
  pickerQuery: '',
  pickerKind: 'All',

  compBusy: false,
  compProgress: 0,
  compRun: false,
  renderQueued: false,
  renderCampaign: '',
  renderTotal: 0,
  renderProgress: 0,

  mediaItems: null,
  mediaBusy: false,
  mediaProgress: 0,
  mediaTouched: {},
  mediaQuery: '',
  mediaKind: 'All',
  mediaMarket: 'All',
  mediaStatus: 'All',
  mediaTag: '',
  mediaPage: 0,
  mediaSelId: null,
  mediaPickFor: null,

  setTab: 'team',
  team: teamMembers,
  approvals: approvalRules,
  roleFocus: 'Campaign manager',
  inviteEmail: '',
  inviteRole: 'Editor',
  approvalSla: 2,
  autoApprove: false,
  actActor: 'all',
  actKinds: [],
  actQuery: '',
  actScope: 'brand',
};

export const useAppStore = create<AppStore>((set, get) => ({
  ...initialState,

  go: (screen, patch) => set({ screen, brandsOpen: false, ...patch }),
  patch: (patch) => set(patch),

  toggleBrands: () => set((state) => ({ brandsOpen: !state.brandsOpen })),

  selectBrand: (key) => {
    stopAllTimers();
    set({
      brandKey: key,
      brandsOpen: false,
      screen: 'hub',
      doc: 'brand',
      file: false,
      why: null,
      touched: {},
      values: seedValues(key),
      canvasItems: null,
      canvasSel: null,
      canvasEdited: {},
      campVariant: 'A',
      actScope: 'brand',
      approvedAssets: {},
      compRun: false,
      progress: 0,
    });
  },

  /* ---------------- Onboarding ---------------- */

  openUpload: (doc) => set({ screen: 'upload', doc, file: false, why: null }),

  attachFile: () => set({ file: true }),

  startAnalysis: () => {
    set({ screen: 'analyzing', progress: 0 });
    runProgress(
      'analysis',
      90,
      3,
      (progress) => set({ progress }),
      () => set({ screen: 'review' }),
    );
  },

  setValue: (key, value) =>
    set((state) => ({
      values: { ...state.values, [key]: value },
      touched: { ...state.touched, [key]: true },
    })),

  toggleWhy: (key) => set((state) => ({ why: state.why === key ? null : key })),

  approveDocument: () => {
    const state = get();
    const done = { ...(state.doneByBrand[state.brandKey] ?? {}), [state.doc]: true };
    const next = documentOrder.find((key) => !done[key]);
    set({
      doneByBrand: { ...state.doneByBrand, [state.brandKey]: done },
      screen: next ? 'hub' : 'dashboard',
      doc: next ?? state.doc,
      file: false,
      why: null,
    });
  },

  restartOnboarding: () => {
    stopAllTimers();
    const state = get();
    // Restart drops the user at step 3, so the first two sources stay confirmed.
    const startKey = documentOrder[2];
    const done = Object.fromEntries(
      documentOrder.slice(0, 2).map((key) => [key, true]),
    ) as Partial<Record<DocumentKey, boolean>>;

    set({
      screen: 'hub',
      doc: startKey,
      file: false,
      touched: {},
      values: seedValues(state.brandKey),
      why: null,
      brandsOpen: false,
      progress: 0,
      doneByBrand: { ...state.doneByBrand, [state.brandKey]: done },
      campPicks: [],
      campDraft: '',
      briefFile: false,
      briefRead: false,
      briefProgress: 0,
      dirProgress: 0,
    });
  },

  confirmAudience: (id, confirmed) =>
    set((state) => ({
      audienceConfirmed: { ...state.audienceConfirmed, [id]: confirmed },
    })),

  /* ---------------- Campaign ---------------- */

  startCampaign: (mode) =>
    set({
      screen: 'campaignBrief',
      campMode: mode,
      campPicks: [],
      campDraft: '',
      brandsOpen: false,
      briefFile: false,
      briefRead: false,
    }),

  attachBrief: () => set({ briefFile: true }),

  readBrief: () => {
    set({ screen: 'briefAnalyzing', briefProgress: 0 });
    runProgress(
      'brief',
      80,
      4,
      (briefProgress) => set({ briefProgress }),
      () => set({ briefRead: true, screen: 'campaignBrief' }),
    );
  },

  runDirections: (seedFromBrief) => {
    set({ screen: 'dirAnalyzing', dirProgress: 0 });
    runProgress(
      'directions',
      80,
      4,
      (dirProgress) => set({ dirProgress }),
      () => get().enterChat(seedFromBrief),
    );
  },

  enterChat: (seedFromBrief) =>
    set((state) => ({
      screen: 'campaign',
      campDraft: '',
      campPicks: seedFromBrief
        ? [
            String(state.values.br1 ?? ''),
            String(state.values.br2 ?? ''),
            String(state.values.br3 ?? ''),
          ]
        : [],
    })),

  sendReply: (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    set((state) => ({ campPicks: [...state.campPicks, trimmed], campDraft: '' }));
  },

  setDraft: (campDraft) => set({ campDraft }),

  setVariant: (campVariant) =>
    set((state) => ({
      campVariant,
      // Re-seed the canvas so it reflects the chosen direction.
      canvasItems: seedCanvas(campVariant, state.brandKey),
      canvasEdited: {},
      compRun: false,
    })),

  openCampaign: (name) => set({ screen: 'campaign', activeCampaign: name, brandsOpen: false }),

  /* ---------------- Canvas ---------------- */

  openCanvas: (campaign) =>
    set((state) => ({
      screen: 'canvas',
      brandsOpen: false,
      activeCampaign: campaign ?? state.activeCampaign,
      canvasItems: state.canvasItems ?? seedCanvas(state.campVariant, state.brandKey),
      canvasSel: null,
      compOpenId: null,
      renderOpen: false,
      mediaItems: state.mediaItems ?? buildMediaLibrary(),
    })),

  setCanvasAsset: (id, patch) =>
    set((state) => {
      const items = state.canvasItems ?? {};
      const base = items[id] ?? items[id.split('--')[0]];
      return {
        canvasItems: { ...items, [id]: { ...base, ...patch } },
        canvasEdited: { ...state.canvasEdited, [id]: true },
      };
    }),

  setCanvasBackground: (id, patch) => {
    const state = get();
    if (state.bgScope === 'one') {
      get().setCanvasAsset(id, patch);
      return;
    }
    const ids = backgroundTargetIds(state, id, state.bgScope);
    const items = { ...(state.canvasItems ?? {}) };
    const edited = { ...state.canvasEdited };
    ids.forEach((key) => {
      const base = items[key] ?? items[key.split('--')[0]];
      if (!base) return;
      items[key] = { ...base, ...patch };
      edited[key] = true;
    });
    set({ canvasItems: items, canvasEdited: edited });
  },

  selectAsset: (canvasSel) => set({ canvasSel }),

  toggleMarketFilter: (key) =>
    set((state) => ({
      canvasMarketFilter: state.canvasMarketFilter.includes(key)
        ? state.canvasMarketFilter.filter((item) => item !== key)
        : [...state.canvasMarketFilter, key],
      canvasSel: null,
      compOpenId: null,
    })),

  toggleChannelFilter: (key) =>
    set((state) => ({
      canvasChannelFilter: state.canvasChannelFilter.includes(key)
        ? state.canvasChannelFilter.filter((item) => item !== key)
        : [...state.canvasChannelFilter, key],
      canvasSel: null,
      compOpenId: null,
    })),
  setZoom: (canvasZoom) => set({ canvasZoom }),
  setPan: (canvasX, canvasY) => set({ canvasX, canvasY }),
  setDragging: (canvasDragging) => set({ canvasDragging }),

  setApproval: (ids, state) =>
    set((current) => {
      const next = { ...current.approvedAssets };
      ids.forEach((id) => {
        if (state) next[id] = state;
        else delete next[id];
      });
      return { approvedAssets: next };
    }),

  runCompliance: () => {
    set({ compBusy: true, compProgress: 0 });
    runProgress(
      'compliance',
      60,
      8,
      (compProgress) => set({ compProgress }),
      () => set({ compBusy: false, compRun: true }),
    );
  },

  startRender: (name, total) => {
    set({
      renderQueued: true,
      renderCampaign: name,
      renderTotal: total,
      renderProgress: 4,
    });
    runProgress(
      'render',
      90,
      6,
      (renderProgress) => set({ renderProgress }),
      () => set({ renderProgress: 100 }),
    );
  },

  /* ---------------- Media ---------------- */

  openMedia: (pickFor = null) =>
    set((state) => ({
      screen: 'media',
      brandsOpen: false,
      mediaPickFor: pickFor,
      mediaItems: state.mediaItems ?? buildMediaLibrary(),
    })),

  ingestMedia: () => {
    set({ mediaBusy: true, mediaProgress: 0 });
    runProgress(
      'media',
      70,
      5,
      (mediaProgress) => set({ mediaProgress }),
      () =>
        set((state) => {
          const existing = state.mediaItems ?? [];
          const item = newUpload(existing.filter((media) => media.uploaded).length + 1);
          return {
            mediaBusy: false,
            mediaSelId: item.id,
            mediaPage: 0,
            mediaItems: [item, ...existing],
          };
        }),
    );
  },

  setMediaItem: (id, patch) =>
    set((state) => ({
      mediaItems: (state.mediaItems ?? []).map((item) =>
        item.id === id ? { ...item, ...patch } : item,
      ),
      mediaTouched: { ...state.mediaTouched, [id]: true },
    })),

  setMediaFilter: (patch) => set({ mediaPage: 0, ...patch }),

  /* ---------------- Workspace + settings ---------------- */

  setRole: (id, role) =>
    set((state) => ({
      team: state.team.map((member) => (member.id === id ? { ...member, role } : member)),
      roleFocus: role,
    })),

  removeMember: (id) =>
    set((state) => ({ team: state.team.filter((member) => member.id !== id) })),

  invite: () => {
    const state = get();
    const email = state.inviteEmail.trim();
    if (!email) return;
    const name = email
      .split('@')[0]
      .split(/[._]/)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');
    set({
      team: [
        ...state.team,
        {
          id: `inv${Date.now()}`,
          name,
          email,
          role: state.inviteRole,
          brands: brandOf(state.brandKey).name,
          last: 'Invite pending',
        },
      ],
      inviteEmail: '',
    });
  },

  setApprovalRule: (id, patch) =>
    set((state) => ({
      approvals: state.approvals.map((rule) =>
        rule.id === id ? { ...rule, ...patch } : rule,
      ),
    })),

  toggleActivityKind: (kind) =>
    set((state) => ({
      actKinds: state.actKinds.includes(kind)
        ? state.actKinds.filter((item) => item !== kind)
        : [...state.actKinds, kind],
    })),
}));

/** Which asset ids a background change should apply to, given the chosen scope. */
function backgroundTargetIds(
  state: AppState,
  id: string,
  scope: BackgroundScope,
): string[] {
  const parts = parseAssetId(id);
  const audienceKey = parts.audience?.id ?? null;
  const campaign: Campaign = campaignByName(state.activeCampaign);
  const audiences = [
    null,
    ...(campaign.audiences
      ? targetAudiences.filter((audience) => campaign.audiences?.includes(audience.id))
      : targetAudiences.filter((audience) => state.audienceConfirmed[audience.id])),
  ];

  const ids: string[] = [];
  markets.forEach((market) =>
    audiences.forEach((audience) =>
      platforms.forEach((platform) => {
        const candidate = `${market.key}-${platform.key}${audience ? `--${audience.id}` : ''}`;
        if (scope === 'all') {
          ids.push(candidate);
          return;
        }
        if (scope === 'one' && candidate !== id) return;
        if (scope === 'channel' && platform.key !== parts.platform?.key) return;
        if (scope === 'locale' && market.key !== parts.market?.key) return;
        if (scope === 'audience' && (audience?.id ?? null) !== audienceKey) return;
        ids.push(candidate);
      }),
    ),
  );
  return ids;
}

export { backgroundTargetIds };
