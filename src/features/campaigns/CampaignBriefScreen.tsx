import styles from './Campaigns.module.css';
import { brandOf } from '../../data/brands';
import { briefDocument } from '../../data/brief';
import { useAppStore } from '../../store/appStore';
import { fieldState } from '../../store/selectors';
import { FieldCard } from '../onboarding/FieldCard';
import {
  Badge,
  Button,
  Card,
  Eyebrow,
  IconArrowLeft,
  IconDocument,
  IconUpload,
} from '../../design-system';

const LOOKS_FOR = [
  'Objective and the offer',
  'Markets and languages',
  'Social formats and sizes',
  'Dates, budget and KPIs',
];

export function CampaignBriefScreen() {
  const state = useAppStore();
  const brand = brandOf(state.brandKey);
  const isBrandMode = state.campMode === 'brand';

  const flagged = briefDocument.fields.filter(
    (field) => fieldState(state, field) === 'review',
  ).length;

  return (
    <div className={styles.page}>
      <Button
        variant="ghost"
        size="sm"
        style={{ alignSelf: 'flex-start', marginLeft: -18 }}
        onClick={() => state.go('campaignStart')}
      >
        <IconArrowLeft size={15} />
        Back to start options
      </Button>

      <div>
        <div className={styles.rowName}>
          <h1 className={styles.title}>Campaign brief</h1>
          <Badge variant={isBrandMode ? 'ok' : 'neutral'}>
            {isBrandMode
              ? `Using ${brand.name} brand data`
              : 'Starting clean — no brand data'}
          </Badge>
        </div>
        <p className={styles.lede}>
          Upload the brief and the agent starts from your objective, markets and channels.
          Without one it will ask for them in the conversation.
        </p>
      </div>

      <div className={styles.briefGrid}>
        <div className={styles.briefCol}>
          <div className={styles.drop} onClick={state.attachBrief}>
            <IconUpload size={22} />
            <span className={styles.dropTitle}>Drop the campaign brief here</span>
            <span className={styles.dropMeta}>PDF, DOCX or Markdown · up to 40 MB</span>
            <Button variant="secondary" size="sm" style={{ marginTop: 8 }}>
              Browse files
            </Button>
          </div>

          {state.briefFile && (
            <Card>
              <div className={styles.file}>
                <span className={styles.fileIcon}>
                  <IconDocument size={20} />
                </span>
                <span className={styles.fileBody}>
                  <span className={styles.fileName}>{briefDocument.name}</span>
                  <br />
                  <span className={styles.fileMeta}>{briefDocument.size}</span>
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => state.patch({ briefFile: false, briefRead: false })}
                >
                  Remove
                </Button>
              </div>

              {state.briefRead && (
                <>
                  <div className={styles.briefSummary}>
                    <Eyebrow>Agent summary</Eyebrow>
                    <p className={styles.briefSummaryBody}>{briefDocument.summary}</p>
                  </div>

                  <div className={styles.briefFieldsHead}>
                    <h2 className={styles.briefFieldsTitle}>Extracted brief</h2>
                    <span className={styles.fileMeta}>
                      {briefDocument.fields.length} fields · {flagged} need your review
                    </span>
                  </div>

                  <div className={styles.briefFields}>
                    {briefDocument.fields.map((field) => (
                      <FieldCard key={field.key} field={field} />
                    ))}
                  </div>
                </>
              )}

              <div className={styles.briefActions}>
                {state.briefRead ? (
                  <>
                    <Button onClick={() => state.runDirections(true)}>
                      Continue to the agent
                    </Button>
                    <Button variant="secondary" onClick={state.readBrief}>
                      Re-run analysis
                    </Button>
                  </>
                ) : (
                  <Button onClick={state.readBrief}>Read the brief</Button>
                )}
                <span className={styles.fileMeta}>
                  {state.briefRead
                    ? 'Objective, markets and channels are already answered'
                    : 'The agent reads it in about 15 seconds'}
                </span>
              </div>
            </Card>
          )}
        </div>

        <div className={styles.briefCol}>
          <Card tone="panel">
            <Eyebrow>What the agent looks for</Eyebrow>
            <div className={styles.extractList}>
              {LOOKS_FOR.map((item) => (
                <p key={item} className={styles.extractRow}>
                  <span className={styles.extractDot} aria-hidden="true" />
                  {item}
                </p>
              ))}
            </div>
          </Card>

          <Card>
            <p className={styles.note} style={{ marginBottom: 'var(--space-4)' }}>
              No brief yet? The agent will ask the same questions in the chat.
            </p>
            <Button variant="secondary" full onClick={() => state.runDirections(false)}>
              Skip, start from chat
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
