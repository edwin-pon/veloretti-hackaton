import styles from './Canvas.module.css';
import type { CanvasModel } from './canvasModel';
import { useAppStore } from '../../store/appStore';
import { Badge, Button, Modal } from '../../design-system';

export interface RenderDialogProps {
  model: CanvasModel;
}

export function RenderDialog({ model }: RenderDialogProps) {
  const state = useAppStore();
  const queued = state.renderQueued && state.renderCampaign === model.campaignName;
  const done = queued && state.renderProgress >= 100;

  return (
    <Modal
      open={state.renderOpen}
      onClose={() => state.patch({ renderOpen: false })}
      title={done ? 'Rendered' : queued ? 'Queued for rendering' : 'Ready to render'}
      subtitle={`${model.renderScopeCount} ${
        model.renderIncludesUnapproved ? 'assets, none approved yet' : 'approved assets'
      } · ${model.renderFormats.length} output sets`}
      wide
    >
      <div>
        {model.renderFormats.map((format) => (
          <div key={format.label} className={styles.formatRow}>
            <div className={styles.formatBody}>
              <p className={styles.formatLabel}>{format.label}</p>
              <p className={styles.formatMeta}>
                {format.dims} · {format.count} {format.count === 1 ? 'file' : 'files'}
              </p>
            </div>
            <Badge variant={done ? 'ok' : queued ? 'info' : 'neutral'}>
              {done ? 'Rendered' : queued ? 'Rendering' : 'Ready'}
            </Badge>
            {done && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => state.patch({ renderDownloaded: format.label })}
              >
                Download
              </Button>
            )}
          </div>
        ))}
      </div>

      <div className={styles.renderFoot}>
        {queued ? (
          <>
            <p className={styles.quiet}>
              {done
                ? `${model.renderTotal} files rendered and ready to download.`
                : `${model.renderTotal} renders queued. The render agent works through them in the background and posts to Activity when the batch is done.`}
            </p>
            <div
              style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-4)' }}
            >
              {done && (
                <Button onClick={() => state.patch({ renderDownloaded: 'all' })}>
                  Download all · {model.renderTotal} files
                </Button>
              )}
              <Button
                variant="secondary"
                onClick={() => state.patch({ renderOpen: false })}
              >
                Back to canvas
              </Button>
            </div>
            {state.renderDownloaded && (
              <p className={styles.quiet} style={{ marginTop: 'var(--space-4)' }}>
                {state.renderDownloaded === 'all'
                  ? 'Preparing a ZIP of every rendered file. It lands in your downloads and in the campaign folder.'
                  : `Preparing ${state.renderDownloaded}. It lands in your downloads and in the campaign folder.`}
              </p>
            )}
          </>
        ) : (
          <>
            <p className={styles.quiet}>
              {model.renderIncludesUnapproved
                ? 'Nothing is approved yet, so every asset on the canvas is queued. Approve a selection first to render only those.'
                : 'Every approved asset is re-rendered into each output set, with brand rules and market footnotes applied per size.'}
            </p>
            <Button
              style={{ marginTop: 'var(--space-4)' }}
              onClick={() => {
                state.patch({ renderDownloaded: null });
                state.startRender(model.campaignName, model.renderTotal);
              }}
            >
              Queue {model.renderTotal} renders
            </Button>
          </>
        )}
      </div>
    </Modal>
  );
}
