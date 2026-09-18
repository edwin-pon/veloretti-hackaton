import styles from './Canvas.module.css';
import type { CanvasCard as CanvasCardModel } from './canvasModel';
import { useAppStore } from '../../store/appStore';
import { Badge, Photo, cx } from '../../design-system';

const STATUS_VARIANT = {
  Approved: 'ink',
  'In review': 'info',
  Blocked: 'block',
  'To fix': 'warn',
  Passes: 'ok',
  'Not checked': 'neutral',
} as const;

const TITLE_SIZE: Record<string, number> = { ig: 19, li: 22, st: 20 };

export interface CanvasCardProps {
  card: CanvasCardModel;
  brandTag: string;
}

export function CanvasCard({ card, brandTag }: CanvasCardProps) {
  const state = useAppStore();
  const selected = state.canvasSel === card.id;
  const ink = card.lightBackground ? '#1A1A1A' : '#FFFFFF';

  const statusLabel =
    card.status === 'Blocked'
      ? `${card.blockers} ${card.blockers === 1 ? 'blocker' : 'blockers'}`
      : card.status === 'To fix'
        ? `${card.violations.length} to fix`
        : card.status;

  return (
    <div className={styles.cell}>
      <div
        data-canvas-card
        role="button"
        tabIndex={0}
        aria-pressed={selected}
        aria-label={`${card.platform.name} asset`}
        className={cx(
          styles.card,
          selected && styles.cardSelected,
          card.blockers > 0 && styles.cardBlocked,
        )}
        style={{
          width: card.platform.w,
          height: card.platform.h,
          background: card.background,
          color: ink,
        }}
        onClick={() => state.selectAsset(card.id)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            state.selectAsset(card.id);
          }
        }}
      >
        {card.media && (
          <Photo
            src={card.media.src}
            tone={card.media.tone}
            alt=""
            className={styles.cardPhoto}
          />
        )}
        {card.media && <span className={styles.scrim} />}

        <div className={styles.cardTop}>
          <span className={styles.cardTag}>{brandTag}</span>
          {card.media && <span className={styles.cardMedia}>{card.media.name}</span>}
        </div>

        <div className={styles.cardBody}>
          <p
            className={styles.cardTitle}
            style={{ fontSize: TITLE_SIZE[card.platform.key] ?? 19 }}
          >
            {card.asset.title}
          </p>
          <p className={styles.cardDesc}>{card.asset.desc}</p>
        </div>
      </div>

      <div className={styles.cellFoot}>
        {(card.checked || card.approval) && (
          <Badge variant={STATUS_VARIANT[card.status]}>{statusLabel}</Badge>
        )}
        {card.edited && <span className={styles.cellEdited}>Edited</span>}
        <button
          type="button"
          className={styles.compButton}
          onClick={(event) => {
            event.stopPropagation();
            state.patch({
              compOpenId: state.compOpenId === card.id ? null : card.id,
              renderOpen: false,
            });
          }}
        >
          {!card.checked
            ? 'Compliance'
            : card.violations.length
              ? `Compliance · ${card.violations.length}`
              : 'Compliance · OK'}
        </button>
      </div>
    </div>
  );
}
