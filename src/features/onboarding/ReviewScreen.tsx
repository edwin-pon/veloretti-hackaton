import { FieldCard } from './FieldCard';
import { StyleGuidePreview } from './StyleGuidePreview';
import styles from './ReviewScreen.module.css';
import { brandOf, forBrand } from '../../data/brands';
import { documentByKey } from '../../data/documents';
import type { DocumentSection } from '../../data/types';
import { useAppStore } from '../../store/appStore';
import { fieldState } from '../../store/selectors';
import {
  Button,
  Card,
  IconArrowLeft,
  IconInfo,
  IconRefresh,
} from '../../design-system';

export function ReviewScreen() {
  const state = useAppStore();
  const brand = brandOf(state.brandKey);
  const doc = documentByKey(state.doc);
  const isStyle = doc.key === 'style';

  const allFields = doc.sections.flatMap((section) => section.fields);
  const needReview = allFields.filter((field) => fieldState(state, field) === 'review')
    .length;
  const averageConfidence = Math.round(
    allFields.reduce((total, field) => total + field.conf, 0) / allFields.length,
  );

  // The style guide renders colours and type as live specimens, so those two
  // sections are lifted out and the remaining rules shown as ordinary fields.
  const sections: DocumentSection[] = isStyle
    ? [
        doc.sections[0],
        {
          title: 'Rules',
          meta: 'applied at generation time',
          fields: [doc.sections[1].fields[3], doc.sections[2].fields[2]],
        },
      ]
    : doc.sections;

  const approveLabel =
    needReview > 0 ? `Approve with ${needReview} flagged` : 'Approve and continue';
  const approveHelp =
    needReview > 0
      ? 'You can approve now and revisit flagged fields later. Flagged rules stay advisory until confirmed.'
      : 'Everything is confirmed. Approving locks these rules into campaign generation.';

  return (
    <div className={styles.page}>
      <Button
        variant="ghost"
        size="sm"
        style={{ alignSelf: 'flex-start', marginLeft: -18 }}
        onClick={() => state.go('hub')}
      >
        <IconArrowLeft size={15} />
        Back to onboarding
      </Button>

      <div className={styles.head}>
        <div>
          <h1 className={styles.title}>{doc.title}</h1>
          <p className={styles.meta}>
            {forBrand(doc.file, brand)} · analysed just now · {allFields.length} fields
            extracted
          </p>
        </div>
        <div className={styles.actions}>
          <Button variant="secondary" onClick={state.startAnalysis}>
            <IconRefresh size={15} />
            Re-run analysis
          </Button>
          <Button onClick={state.approveDocument}>{approveLabel}</Button>
        </div>
      </div>

      <Card tone="panel" className={styles.summary}>
        <IconInfo size={20} className={styles.summaryIcon} />
        <div>
          <p style={{ fontWeight: 'var(--fw-medium)' }}>{doc.summaryTitle}</p>
          <p className={styles.summaryBody}>{forBrand(doc.summary, brand)}</p>
        </div>
      </Card>

      <div className={styles.stats}>
        <Card className={styles.stat}>
          <span className={styles.statValue}>{allFields.length}</span>
          <span className={styles.statLabel}>Fields extracted</span>
        </Card>
        <Card className={styles.stat}>
          <span className={styles.statValue}>{needReview}</span>
          <span className={styles.statLabel}>Need your review</span>
        </Card>
        <Card className={styles.stat}>
          <span className={styles.statValue}>{averageConfidence}%</span>
          <span className={styles.statLabel}>Average confidence</span>
        </Card>
      </div>

      {isStyle && <StyleGuidePreview />}

      {sections.map((section) => (
        <section key={section.title} className={styles.section}>
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>{section.title}</h2>
            <span className={styles.sectionMeta}>{section.meta}</span>
          </div>
          <div className={styles.fields}>
            {section.fields.map((field) => (
              <FieldCard key={field.key} field={field} />
            ))}
          </div>
        </section>
      ))}

      <Card tone="panel" className={styles.approve}>
        <p className={styles.approveHelp}>{approveHelp}</p>
        <Button onClick={state.approveDocument}>{approveLabel}</Button>
      </Card>
    </div>
  );
}
