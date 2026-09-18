import { useEffect, useRef } from 'react';
import styles from './Campaigns.module.css';
import { buildCampaignDraft } from './campaignDraft';
import { useAppStore } from '../../store/appStore';
import { isLightTone } from '../../store/selectors';
import {
  Badge,
  Button,
  Card,
  Eyebrow,
  Input,
  cx,
} from '../../design-system';

export function CampaignScreen() {
  const state = useAppStore();
  const draft = buildCampaignDraft(state);
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = messagesRef.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [draft.chat.length]);

  return (
    <div className={styles.page}>
      <div className={styles.head}>
        <div>
          <Eyebrow>{state.activeCampaign}</Eyebrow>
          <h1 className={styles.title} style={{ marginTop: 8 }}>
            Campaign draft
          </h1>
          <div className={styles.rowName} style={{ marginTop: 10 }}>
            <Badge variant={draft.isBrandMode ? 'ok' : 'neutral'}>
              {draft.modeLabel}
            </Badge>
            {draft.variantNote && (
              <span className={styles.note}>{draft.variantNote}</span>
            )}
          </div>
        </div>

        <div className={styles.actions}>
          <Button
            variant={state.campInfo ? 'quiet' : 'ghost'}
            onClick={() => state.patch({ campInfo: !state.campInfo })}
          >
            {state.campInfo ? 'Hide brief and rules' : 'Brief and rules'}
          </Button>
          <Button variant="secondary" onClick={() => state.go('campaignBrief')}>
            Change start
          </Button>
          {draft.canDraftAssets && (
            <Button onClick={() => state.openCanvas()}>Draft all assets</Button>
          )}
        </div>
      </div>

      <div className={styles.draftGrid}>
        <Card>
          <div className={styles.previewHead}>
            <div>
              <p className={styles.previewTitle}>What the agent envisions</p>
              <p className={styles.previewMeta}>
                Three directions · Direction {state.campVariant} selected
              </p>
            </div>
          </div>

          <div className={styles.variants}>
            {draft.directions.map((direction) => {
              const selected = state.campVariant === direction.id;
              const headlineReady = draft.stage >= 1;
              const ctaReady = draft.stage >= 3;
              const lightBackground = isLightTone(draft.primary);
              const ink = lightBackground ? '#1A1A1A' : '#FFFFFF';

              return (
                <div
                  key={direction.id}
                  className={cx(styles.variant, selected && styles.variantSelected)}
                >
                  <div className={styles.variantHead}>
                    <div>
                      <p className={styles.variantId}>Direction {direction.id}</p>
                      <p className={styles.variantLabel}>{direction.label}</p>
                    </div>
                    <Badge variant={selected ? 'ink' : 'neutral'}>
                      {selected ? 'Selected' : 'Draft'}
                    </Badge>
                  </div>

                  <div
                    className={styles.mock}
                    style={{ background: draft.primary, color: ink }}
                  >
                    <span className={styles.mockTag}>{draft.tag}</span>

                    {headlineReady ? (
                      <p
                        className={styles.mockHeadline}
                        style={{
                          fontFamily: draft.headingFamily,
                          fontWeight: draft.headingWeight,
                          letterSpacing: '-0.02em',
                        }}
                      >
                        {direction.headline}
                      </p>
                    ) : (
                      <div className={styles.skeleton}>
                        <span className={styles.skeletonBar} style={{ width: '90%' }} />
                        <span className={styles.skeletonBar} style={{ width: '62%' }} />
                      </div>
                    )}

                    {ctaReady && (
                      <span
                        className={styles.mockCta}
                        style={{
                          background: draft.accent,
                          color: isLightTone(draft.accent) ? '#1A1A1A' : '#FFFFFF',
                          fontFamily: draft.bodyFamily,
                        }}
                      >
                        {direction.cta}
                      </span>
                    )}
                  </div>

                  <Button
                    variant={selected ? 'primary' : 'secondary'}
                    size="sm"
                    full
                    onClick={() => state.setVariant(direction.id)}
                  >
                    {selected ? 'Selected direction' : 'Pick this direction'}
                  </Button>
                </div>
              );
            })}
          </div>
        </Card>

        <Card className={styles.chat}>
          <div className={styles.messages} ref={messagesRef}>
            {draft.chat.map((message, index) => (
              <div
                key={`${message.from}-${index}`}
                className={cx(
                  styles.message,
                  message.from === 'agent' ? styles.messageAgent : styles.messageYou,
                )}
              >
                <span className={styles.messageName}>
                  {message.from === 'agent' ? 'Agent' : 'You'}
                </span>
                <p className={styles.bubble}>{message.text}</p>
              </div>
            ))}
          </div>

          {draft.replies.length > 0 && (
            <div>
              <Eyebrow>Suggested</Eyebrow>
              <div className={styles.replies}>
                {draft.replies.map((reply) => (
                  <Button
                    key={reply}
                    variant="quiet"
                    size="sm"
                    onClick={() => state.sendReply(reply)}
                  >
                    {reply}
                  </Button>
                ))}
              </div>
            </div>
          )}

          <form
            className={styles.composer}
            onSubmit={(event) => {
              event.preventDefault();
              state.sendReply(state.campDraft);
            }}
          >
            <Input
              fieldClassName={styles.composerInput}
              value={state.campDraft}
              placeholder="Reply to the agent"
              aria-label="Reply to the agent"
              onChange={(event) => state.setDraft(event.target.value)}
            />
            <Button type="submit">Send</Button>
          </form>
        </Card>
      </div>

      {state.campInfo && (
        <div className={styles.info}>
          <Card>
            <Eyebrow>Brief</Eyebrow>
            <div style={{ marginTop: 'var(--space-3)' }}>
              {draft.briefRows.map((row) => (
                <div key={row.label} className={styles.infoRow}>
                  <span className={styles.infoLabel}>{row.label}</span>
                  <span
                    className={cx(styles.infoValue, row.pending && styles.infoPending)}
                  >
                    {row.value}
                  </span>
                  <span className={styles.infoSource}>{row.source}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <Eyebrow>Rules applied</Eyebrow>
            {draft.rules.length > 0 && (
              <div className={styles.chipRow} style={{ margin: 'var(--space-3) 0' }}>
                {draft.rules.map((rule) => (
                  <span key={rule} className={styles.chip}>
                    {rule}
                  </span>
                ))}
              </div>
            )}
            <p className={styles.note}>{draft.rulesNote}</p>
            {!draft.isBrandMode && (
              <Button
                variant="secondary"
                size="sm"
                style={{ marginTop: 'var(--space-4)' }}
                onClick={() => state.go('hub')}
              >
                Connect brand data
              </Button>
            )}
          </Card>
        </div>
      )}
    </div>
  );
}
