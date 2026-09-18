import styles from './Knowledge.module.css';
import { brandOf, forBrand } from '../../data/brands';
import { documentByKey } from '../../data/documents';
import { knowledgePages } from '../../data/knowledge';
import { targetAudiences } from '../../data/audiences';
import type { ExtractedField } from '../../data/types';
import { useAppStore } from '../../store/appStore';
import {
  FIELD_STATE_LABEL,
  confidenceTone,
  documentsDone,
  fieldState,
} from '../../store/selectors';
import { Badge, Button, Card, EmptyState, cx } from '../../design-system';
import fieldStyles from '../onboarding/FieldCard.module.css';

const TONE_CLASS = {
  ok: fieldStyles.confidenceOk,
  warn: fieldStyles.confidenceWarn,
  block: fieldStyles.confidenceBlock,
} as const;

const BADGE_VARIANT = {
  edited: 'info',
  review: 'warn',
  extracted: 'ok',
} as const;

export function KnowledgeBaseScreen() {
  const state = useAppStore();
  const brand = brandOf(state.brandKey);
  const page =
    knowledgePages.find((item) => item.key === state.kbSection) ?? knowledgePages[0];
  const doc = documentByKey(page.doc);
  const done = Boolean(documentsDone(state)[page.doc]);
  const isAudiences = page.key === 'audiences';

  const formatValue = (field: ExtractedField) => {
    const value = state.values[field.key] ?? field.value;
    if (Array.isArray(value)) return value.join(', ');
    if (typeof value === 'boolean') return value ? (field.toggleLabel ?? 'On') : 'Off';
    return forBrand(String(value), brand);
  };

  const groups =
    isAudiences || !done
      ? []
      : page.sections
          .map((title) => doc.sections.find((section) => section.title === title))
          .filter((section): section is NonNullable<typeof section> => Boolean(section));

  return (
    <div className={styles.page}>
      <div className={styles.kbHead}>
        <h1 className={styles.kbTitle}>{page.label}</h1>
        <p className={styles.kbIntro}>{page.intro}</p>
      </div>

      {!isAudiences && !done && (
        <EmptyState
          title={`No ${doc.card.toLowerCase()} yet`}
          body={`Upload the ${doc.card.toLowerCase()} to fill this in. Until then the agent has nothing confirmed to work from.`}
          action={
            <Button
              onClick={() => state.go('upload', { doc: page.doc, file: false, why: null })}
            >
              Upload {doc.card.toLowerCase()}
            </Button>
          }
        />
      )}

      {isAudiences && (
        <div className={styles.audienceGrid}>
          {targetAudiences.map((audience) => {
            const confirmed = Boolean(state.audienceConfirmed[audience.id]);
            const tone = confidenceTone(audience.conf);
            return (
              <Card key={audience.id} className={styles.audience}>
                <div>
                  <p className={styles.audienceName}>{audience.name}</p>
                  <p className={styles.audienceRole}>{audience.role}</p>
                </div>

                <Badge
                  variant={confirmed ? 'ok' : audience.conf < 70 ? 'warn' : 'info'}
                  style={{ alignSelf: 'flex-start' }}
                >
                  {confirmed
                    ? 'Confirmed'
                    : audience.conf < 70
                      ? 'Needs review'
                      : 'Drafted'}
                </Badge>

                <p className={styles.audienceSummary}>{audience.summary}</p>

                <div className={styles.chipRow} style={{ margin: 0 }}>
                  {audience.tags.map((tag) => (
                    <span key={tag} className={styles.chip}>
                      {tag}
                    </span>
                  ))}
                </div>

                <p className={styles.kbFieldHint}>{audience.reasoning}</p>

                <div className={styles.audienceFoot}>
                  <span className={fieldStyles.confidence}>
                    <span
                      className={cx(fieldStyles.confidenceDot, TONE_CLASS[tone])}
                    />
                    {audience.conf}% confidence
                  </span>
                  <Button
                    variant={confirmed ? 'secondary' : 'primary'}
                    size="sm"
                    onClick={() => state.confirmAudience(audience.id, !confirmed)}
                  >
                    {confirmed ? 'Confirmed · undo' : 'Confirm audience'}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {groups.map((section) => (
        <section key={section.title} className={styles.kbSection}>
          <h2 className={styles.kbSectionTitle}>{section.title}</h2>
          <Card>
            {section.fields.map((field) => {
              const raw = formatValue(field);
              const swatches = raw.match(/#[0-9a-fA-F]{6}/g) ?? [];
              const status = fieldState(state, field);
              const tone = confidenceTone(field.conf);
              return (
                <div key={field.key} className={styles.kbField}>
                  <div className={styles.kbFieldLabel}>
                    <p className={styles.kbFieldName}>{field.label}</p>
                    <p className={styles.kbFieldHint}>{field.hint}</p>
                  </div>
                  <div className={styles.kbFieldValue}>
                    {swatches.length > 0 && (
                      <div className={styles.neutrals} style={{ marginBottom: 10 }}>
                        {swatches.map((hex) => (
                          <span
                            key={hex}
                            className={styles.neutral}
                            style={{ background: hex }}
                            title={hex}
                          />
                        ))}
                      </div>
                    )}
                    <p>{raw}</p>
                    <div className={styles.kbFieldFoot}>
                      <span className={fieldStyles.confidence}>
                        <span
                          className={cx(fieldStyles.confidenceDot, TONE_CLASS[tone])}
                        />
                        {field.conf}% confidence
                      </span>
                      <Badge variant={BADGE_VARIANT[status]}>
                        {FIELD_STATE_LABEL[status]}
                      </Badge>
                      <span>{forBrand(field.cite, brand)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </Card>
        </section>
      ))}

      {!isAudiences && done && (
        <Button
          variant="secondary"
          style={{ alignSelf: 'flex-start' }}
          onClick={() => state.go('review', { doc: page.doc, why: null })}
        >
          Review the {doc.card.toLowerCase()}
        </Button>
      )}
    </div>
  );
}
