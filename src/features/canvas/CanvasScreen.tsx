import { useRef } from 'react';
import styles from './Canvas.module.css';
import { AssetInspector } from './AssetInspector';
import { CanvasCard } from './CanvasCard';
import { CompliancePanel } from './CompliancePanel';
import { MediaPicker } from './MediaPicker';
import { RenderDialog } from './RenderDialog';
import { buildCanvas } from './canvasModel';
import { useCanvasViewport } from './useCanvasViewport';
import { campaignByName } from '../../data/campaigns';
import { checkAsset } from '../../data/compliance';
import { markets, platforms } from '../../data/markets';
import { useAppStore } from '../../store/appStore';
import {
  Badge,
  Button,
  Eyebrow,
  IconMinus,
  IconPlus,
  ProgressBar,
  cx,
} from '../../design-system';

const SECTION_BADGE = {
  Approved: 'ink',
  'In review': 'info',
  Blocked: 'block',
  'To fix': 'warn',
  Passes: 'ok',
  'Not checked': 'neutral',
} as const;

export function CanvasScreen() {
  const state = useAppStore();
  const model = buildCanvas(state);
  const viewportRef = useRef<HTMLDivElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);

  const viewport = useCanvasViewport(
    viewportRef,
    planeRef,
    `${model.campaignName}-${model.shownMarkets.length}-${model.shownPlatforms.length}-${model.audiences.length}`,
  );

  const pendingApproval = model.allCards.length - model.approvedCount;

  const campaignMarkets = markets.filter((market) =>
    campaignByName(state.activeCampaign).marketKeys.includes(market.key),
  );

  const approveAllPassing = () => {
    const items = state.canvasItems ?? {};
    const approvable = model.allCards
      .filter((card) => {
        const asset = items[card.id] ?? items[card.id.split('--')[0]];
        const locale = model.sections.find((section) =>
          section.cards.some((item) => item.id === card.id),
        )?.market.locale;
        return !checkAsset(asset, locale).some(
          (violation) => violation.severity === 'block',
        );
      })
      .map((card) => card.id);
    state.setApproval(approvable, 'approved');
  };

  const approveMarket = (marketKey: string) => {
    const section = model.sections.find((item) => item.market.key === marketKey);
    if (!section) return;
    state.setApproval(
      section.cards.filter((card) => card.blockers === 0).map((card) => card.id),
      'approved',
    );
  };

  return (
    <div className={styles.screen}>
      <div className={styles.toolbar}>
        <div>
          <p className={styles.toolbarTitle}>{model.campaignName}</p>
          <p className={styles.toolbarNote}>
            {model.filterNote} · {model.approvalSummary || model.complianceSummary}
          </p>
        </div>

        <span className={styles.toolbarSpacer} />

        <div className={styles.toolbarActions}>
          <Button
            variant={state.canvasFiltersOpen || model.filterCount ? 'primary' : 'secondary'}
            size="sm"
            onClick={() =>
              state.patch({ canvasFiltersOpen: !state.canvasFiltersOpen })
            }
          >
            {model.filterCount ? `Filters · ${model.filterCount}` : 'Filters'}
          </Button>

          {state.compBusy && (
            <div className={styles.checking}>
              <ProgressBar value={state.compProgress} label="Checking" />
            </div>
          )}

          <Button variant="ghost" size="sm" onClick={() => state.openMedia()}>
            Media
          </Button>
          <Button variant="secondary" size="sm" onClick={state.runCompliance}>
            {state.compBusy
              ? 'Checking…'
              : state.compRun
                ? 'Re-run check'
                : 'Run compliance check'}
          </Button>
          <Button
            variant="secondary"
            size="sm"
            disabled={!state.compRun}
            onClick={approveAllPassing}
          >
            Approve passing
          </Button>
          <Button
            size="sm"
            title={
              model.allApproved
                ? 'Queue every approved asset for rendering'
                : `${pendingApproval} assets still need approval — only approved assets are rendered`
            }
            onClick={() => state.patch({ renderOpen: true, compOpenId: null })}
          >
            {model.allApproved ? 'Render' : `Render · ${pendingApproval}`}
          </Button>
        </div>
      </div>

      <div className={styles.viewportWrap}>
        <div
          ref={viewportRef}
          className={cx(styles.viewport, viewport.dragging && styles.dragging)}
          onPointerDown={viewport.onPointerDown}
          onPointerMove={viewport.onPointerMove}
          onPointerUp={viewport.onPointerUp}
          onPointerCancel={viewport.onPointerUp}
        >
          <div
            ref={planeRef}
            className={styles.plane}
            style={{
              transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
            }}
          >
            {model.sections.map((section) => (
              <section key={section.market.key} className={styles.section}>
                <div className={styles.sectionHead}>
                  <div>
                    <div className={styles.sectionTitleRow}>
                      <span className={styles.sectionMarket}>{section.market.name}</span>
                      <span className={styles.sectionLocale}>
                        {section.market.locale}
                      </span>
                      <Badge variant={SECTION_BADGE[section.status]}>
                        {section.status}
                      </Badge>
                    </div>
                    <p className={styles.sectionNote}>{section.legalNote}</p>
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    disabled={!section.canApprove}
                    onClick={() => approveMarket(section.market.key)}
                  >
                    {section.canApprove
                      ? 'Approve market'
                      : section.anyChecked
                        ? 'Blocked'
                        : 'Run check first'}
                  </Button>
                </div>

                <div
                  className={styles.grid}
                  style={{
                    gridTemplateColumns: `150px ${model.shownPlatforms
                      .map((platform) => `${platform.w}px`)
                      .join(' ')}`,
                  }}
                >
                  <div />
                  {model.shownPlatforms.map((platform) => (
                    <div key={platform.key} className={styles.channelHead}>
                      <p className={styles.channelName}>{platform.name}</p>
                      <p className={styles.channelFormat}>{platform.format}</p>
                    </div>
                  ))}

                  {section.rows.map((row) => (
                    <div key={row.key} style={{ display: 'contents' }}>
                      <div className={styles.rowLabel}>
                        <p className={styles.rowLabelName}>
                          {row.audience ? row.audience.name : 'All audiences'}
                        </p>
                        <p className={styles.rowLabelSub}>
                          {row.audience
                            ? 'Audience variant'
                            : 'Generic set, no audience targeting'}
                        </p>
                      </div>
                      {row.cards.map((card) => (
                        <CanvasCard
                          key={card.id}
                          card={card}
                          brandTag={model.brandTag}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>

        {state.canvasFiltersOpen && (
          <aside className={`${styles.panel} ${styles.panelLeft}`} aria-label="Filters">
            <div className={styles.panelHead}>
              <Eyebrow>Filters</Eyebrow>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => state.patch({ canvasFiltersOpen: false })}
              >
                Done
              </Button>
            </div>

            <div className={styles.panelGroup}>
              <Eyebrow>Market</Eyebrow>
              <div className={styles.filterChips}>
                {campaignMarkets.map((market) => (
                  <button
                    key={market.key}
                    type="button"
                    title={`${market.name} · ${market.locale}`}
                    className={cx(
                      styles.chip,
                      state.canvasMarketFilter.includes(market.key) && styles.chipOn,
                    )}
                    onClick={() => state.toggleMarketFilter(market.key)}
                  >
                    {market.name}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.panelGroup}>
              <Eyebrow>Channel</Eyebrow>
              <div className={styles.filterChips}>
                {platforms.map((platform) => (
                  <button
                    key={platform.key}
                    type="button"
                    className={cx(
                      styles.chip,
                      state.canvasChannelFilter.includes(platform.key) && styles.chipOn,
                    )}
                    onClick={() => state.toggleChannelFilter(platform.key)}
                  >
                    {platform.name}
                  </button>
                ))}
              </div>
            </div>

            <p className={styles.quiet}>{model.filterNote}</p>
          </aside>
        )}

        <CompliancePanel model={model} />
        <AssetInspector model={model} />

        <div className={styles.zoomBar}>
          <Button variant="ghost" size="sm" aria-label="Zoom out" onClick={viewport.zoomOut}>
            <IconMinus size={15} />
          </Button>
          <span className={styles.zoomValue}>{Math.round(viewport.zoom * 100)}%</span>
          <Button variant="ghost" size="sm" aria-label="Zoom in" onClick={viewport.zoomIn}>
            <IconPlus size={15} />
          </Button>
          <Button variant="ghost" size="sm" onClick={viewport.fit}>
            Fit
          </Button>
          <Button variant="ghost" size="sm" onClick={() => state.go('campaign')}>
            Back to draft
          </Button>
          <span className={styles.zoomHint}>Drag to pan · scroll to zoom</span>
        </div>
      </div>

      <RenderDialog model={model} />
      <MediaPicker model={model} />
    </div>
  );
}
