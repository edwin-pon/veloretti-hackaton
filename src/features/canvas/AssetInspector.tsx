import styles from './Canvas.module.css';
import type { CanvasModel } from './canvasModel';
import { backgroundTargetIds, useAppStore } from '../../store/appStore';
import type { BackgroundScope } from '../../store/appStore';
import { isLightTone } from '../../store/selectors';
import {
  Button,
  Eyebrow,
  IconClose,
  Input,
  Photo,
  Textarea,
  cx,
} from '../../design-system';

/** Audience names read as sentences ("The daily commuter"), so they need
 *  lower-casing when they appear mid-sentence. */
function uncapitalise(name: string): string {
  return name.charAt(0).toLowerCase() + name.slice(1);
}

export interface AssetInspectorProps {
  model: CanvasModel;
}

/** Edit panel for the selected asset: copy is per asset, the background can be
 *  applied to a wider scope so one change can cover a whole channel or market. */
export function AssetInspector({ model }: AssetInspectorProps) {
  const state = useAppStore();
  const card = model.selected;
  if (!card || !state.canvasSel) return null;

  const id = state.canvasSel;
  const scopes: { key: BackgroundScope; chip: string; title: string }[] = [
    { key: 'one', chip: 'This one', title: 'This asset only' },
    {
      key: 'channel',
      chip: card.platform.name,
      title: `Every ${card.platform.name} asset`,
    },
    {
      key: 'locale',
      chip: model.selectedMarket?.locale ?? 'Market',
      title: `Every ${model.selectedMarket?.name ?? 'market'} asset`,
    },
    {
      key: 'audience',
      chip: model.selectedAudience
        ? model.selectedAudience.name.split(' ').pop()!
        : 'Generic',
      title: model.selectedAudience
        ? `Every asset for ${uncapitalise(model.selectedAudience.name)}`
        : 'Every asset with no audience targeting',
    },
    { key: 'all', chip: 'All', title: 'Every asset in the campaign' },
  ];

  const scopeCount = backgroundTargetIds(state, id, state.bgScope).length;
  // A photo always sits under the dark scrim, so its copy stays white.
  const ink = card.media || !isLightTone(card.background) ? '#FFFFFF' : '#1A1A1A';

  return (
    <aside className={styles.panel} aria-label="Edit asset">
      <div className={styles.panelHead}>
        <div>
          <Eyebrow>Edit asset</Eyebrow>
          <p className={styles.panelTitle}>{model.selectedLabel}</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          aria-label="Close"
          onClick={() => state.selectAsset(null)}
        >
          <IconClose size={15} />
        </Button>
      </div>

      <div className={styles.preview} style={{ background: card.background, color: ink }}>
        {card.media && (
          <Photo
            src={card.media.src}
            tone={card.media.tone}
            alt=""
            className={styles.previewPhoto}
          />
        )}
        {card.media && <span className={styles.previewScrim} />}
        <span className={styles.previewBody}>
          <span className={styles.cardTag}>{model.selectedMarket?.locale}</span>
          <p style={{ fontSize: 17, lineHeight: 1.2 }}>{card.asset.title}</p>
        </span>
      </div>

      <Input
        label="Headline"
        value={card.asset.title}
        onChange={(event) => state.setCanvasAsset(id, { title: event.target.value })}
      />

      <Textarea
        label="Body copy"
        rows={3}
        value={card.asset.desc}
        onChange={(event) => state.setCanvasAsset(id, { desc: event.target.value })}
      />

      <div className={styles.panelGroup}>
        <div className={styles.scopeHead}>
          <Eyebrow>Background</Eyebrow>
          <span className={styles.mediaMeta}>Copy stays per asset</span>
        </div>

        <button
          type="button"
          className={styles.mediaButton}
          onClick={() =>
            state.patch({ pickerOpen: true, pickerQuery: '', pickerKind: 'All' })
          }
        >
          <Photo
            src={card.media?.src}
            tone={card.background}
            alt=""
            className={styles.mediaSwatch}
          />
          <span className={styles.mediaBody}>
            <span className={styles.mediaName}>
              {card.media ? card.media.name : 'Palette background'}
            </span>
            <span className={styles.mediaMeta}>
              {card.media
                ? `${card.media.kind} from the media manager`
                : 'From your confirmed palette'}
            </span>
          </span>
          <span className={styles.mediaBrowse}>Browse</span>
        </button>

        <div className={styles.scopeHead}>
          <Eyebrow>Apply background to</Eyebrow>
          <span className={styles.mediaMeta}>
            {scopeCount === 1 ? '1 asset' : `${scopeCount} assets`}
          </span>
        </div>

        <div className={styles.filterChips}>
          {scopes.map((scope) => (
            <button
              key={scope.key}
              type="button"
              title={scope.title}
              className={cx(styles.chip, state.bgScope === scope.key && styles.chipOn)}
              onClick={() => state.patch({ bgScope: scope.key })}
            >
              {scope.chip}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
