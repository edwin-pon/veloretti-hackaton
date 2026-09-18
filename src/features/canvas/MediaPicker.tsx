import styles from './Canvas.module.css';
import type { CanvasModel } from './canvasModel';
import { backgroundTargetIds, useAppStore } from '../../store/appStore';
import { Button, Input, Modal, Photo, SegmentedControl, cx } from '../../design-system';

const KINDS = [
  { value: 'All', label: 'All' },
  { value: 'Image', label: 'Images' },
  { value: 'Video', label: 'Videos' },
] as const;

export interface MediaPickerProps {
  model: CanvasModel;
}

/** Picks a background from the mirrored library, applying it to whichever scope
 *  is set in the inspector. */
export function MediaPicker({ model }: MediaPickerProps) {
  const state = useAppStore();
  const selectedId = state.canvasSel;
  if (!state.pickerOpen || !selectedId) return null;

  const library = state.mediaItems ?? [];
  const query = state.pickerQuery.trim().toLowerCase();
  const items = library.filter((item) => {
    if (state.pickerKind !== 'All' && item.kind !== state.pickerKind) return false;
    if (query && !`${item.name} ${item.desc} ${item.kind}`.toLowerCase().includes(query)) {
      return false;
    }
    return true;
  });

  const scopeCount = backgroundTargetIds(state, selectedId, state.bgScope).length;
  const visible = items.slice(0, 60);

  return (
    <Modal
      open
      onClose={() => state.patch({ pickerOpen: false })}
      title="Select a background"
      subtitle={`${items.length.toLocaleString('en-US')} of ${library.length.toLocaleString('en-US')} items in this brand library`}
      wide
    >
      <div className={styles.pickerControls}>
        <Input
          fieldClassName={styles.pickerSearch}
          value={state.pickerQuery}
          placeholder="Search the library"
          aria-label="Search the library"
          onChange={(event) => state.patch({ pickerQuery: event.target.value })}
        />
        <SegmentedControl
          options={KINDS}
          value={state.pickerKind}
          aria-label="Media kind"
          onChange={(value) => state.patch({ pickerKind: value })}
        />
      </div>

      {visible.length === 0 ? (
        <p className={styles.quiet}>Nothing in the library matches that.</p>
      ) : (
        <div className={styles.pickerGrid}>
          {visible.map((item) => (
            <button
              key={item.id}
              type="button"
              className={cx(
                styles.pickerItem,
                model.selected?.asset.mediaId === item.id && styles.pickerItemOn,
              )}
              onClick={() => state.setCanvasBackground(selectedId, { mediaId: item.id })}
            >
              <Photo
                src={item.src}
                tone={item.tone}
                alt={item.desc}
                className={styles.pickerThumb}
              >
                <span className={styles.pickerKind}>{item.kind}</span>
              </Photo>
              <span className={styles.pickerBody}>
                <span className={styles.pickerName}>{item.name}</span>
                <span className={styles.pickerMeta}>
                  {item.market} · {item.dims}
                </span>
              </span>
            </button>
          ))}
        </div>
      )}

      <div className={styles.pickerFoot}>
        <span className={styles.quiet}>
          Selection applies to {scopeCount === 1 ? '1 asset' : `${scopeCount} assets`},
          per the scope in the panel.
        </span>
        <Button onClick={() => state.patch({ pickerOpen: false })}>Done</Button>
      </div>
    </Modal>
  );
}
