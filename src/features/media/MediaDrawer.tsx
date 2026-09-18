import styles from './Media.module.css';
import fieldStyles from '../onboarding/FieldCard.module.css';
import { useAppStore } from '../../store/appStore';
import { confidenceTone, mediaStatusOf, selectedMedia } from '../../store/selectors';
import {
  Badge,
  Button,
  ChipInput,
  Eyebrow,
  IconClose,
  Photo,
  Textarea,
  Toggle,
  cx,
} from '../../design-system';

const TONE_CLASS = {
  ok: fieldStyles.confidenceOk,
  warn: fieldStyles.confidenceWarn,
  block: fieldStyles.confidenceBlock,
} as const;

const STATUS_VARIANT = {
  Confirmed: 'ink',
  Tagged: 'ok',
  'Needs review': 'warn',
} as const;

const POSTER_FRAMES = ['0:02', 'Midpoint', 'Last frame'];

/** Detail view for one library item, where the agent's description and tags can
 *  be corrected and confirmed. */
export function MediaDrawer() {
  const state = useAppStore();
  const item = selectedMedia(state);
  if (!item) return null;

  const status = mediaStatusOf(state, item);
  const tone = confidenceTone(item.conf);
  const confirmed = Boolean(state.mediaTouched[item.id]);
  const close = () => state.patch({ mediaSelId: null });

  return (
    <>
      <div className={styles.scrim} role="presentation" onClick={close} />
      <aside className={styles.drawer} aria-label={`Details for ${item.name}`}>
        <div className={styles.drawerHead}>
          <div>
            <Eyebrow>
              {item.kind} · {item.market}
            </Eyebrow>
            <p className={styles.drawerName}>{item.name}</p>
          </div>
          <Button variant="ghost" size="sm" aria-label="Close" onClick={close}>
            <IconClose size={15} />
          </Button>
        </div>

        <Photo
          src={item.src}
          tone={item.tone}
          alt={item.desc}
          className={styles.drawerPreview}
        />

        <div className={styles.drawerMeta}>
          <span>{item.dims}</span>
          {item.kind === 'Video' && <span>{item.duration}</span>}
          <span className={fieldStyles.confidence}>
            <span className={cx(fieldStyles.confidenceDot, TONE_CLASS[tone])} />
            {item.conf}% confidence
          </span>
          <Badge variant={STATUS_VARIANT[status]}>{status}</Badge>
        </div>

        <Textarea
          label="Description"
          rows={4}
          value={item.desc}
          onChange={(event) => state.setMediaItem(item.id, { desc: event.target.value })}
        />

        <div>
          <Eyebrow style={{ marginBottom: 7 }}>Tags</Eyebrow>
          <ChipInput
            values={item.tags}
            placeholder="Add a tag"
            aria-label="Tags"
            onChange={(tags) => state.setMediaItem(item.id, { tags })}
          />
        </div>

        {item.kind === 'Video' && (
          <>
            <div>
              <Eyebrow>Poster frame</Eyebrow>
              <div className={styles.posterRow}>
                {POSTER_FRAMES.map((label, index) => (
                  <button
                    key={label}
                    type="button"
                    className={cx(
                      styles.poster,
                      item.poster === index && styles.posterOn,
                    )}
                    onClick={() => state.setMediaItem(item.id, { poster: index })}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <Toggle
              checked={item.captions}
              label={item.captions ? 'Captions attached' : 'No captions yet'}
              onChange={(captions) => state.setMediaItem(item.id, { captions })}
            />
          </>
        )}

        <div className={styles.reasoning}>
          <Eyebrow>Agent reasoning</Eyebrow>
          <p className={styles.reasoningBody}>{item.reasoning}</p>
          <Button
            variant={confirmed ? 'secondary' : 'primary'}
            size="sm"
            full
            onClick={() =>
              state.setMediaItem(item.id, { conf: confirmed ? item.conf : 100 })
            }
          >
            {confirmed ? 'Confirmed' : 'Confirm description and tags'}
          </Button>
        </div>
      </aside>
    </>
  );
}
