import styles from './Onboarding.module.css';
import { brandOf, forBrand } from '../../data/brands';
import { documentByKey } from '../../data/documents';
import { useAppStore } from '../../store/appStore';
import {
  Button,
  Card,
  Eyebrow,
  IconArrowLeft,
  IconDocument,
  IconUpload,
} from '../../design-system';

export function UploadScreen() {
  const state = useAppStore();
  const brand = brandOf(state.brandKey);
  const doc = documentByKey(state.doc);

  return (
    <div className={styles.page}>
      <div className={styles.head}>
        <Button
          variant="ghost"
          size="sm"
          style={{ alignSelf: 'flex-start', marginLeft: -18 }}
          onClick={() => state.go('hub')}
        >
          <IconArrowLeft size={15} />
          Back to onboarding
        </Button>
        <h1 className={styles.title}>{doc.title}</h1>
        <p className={styles.lede}>{forBrand(doc.intro, brand)}</p>
      </div>

      <div className={styles.uploadGrid}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <div className={styles.drop} onClick={state.attachFile}>
            <IconUpload size={22} />
            <span className={styles.dropTitle}>Drop your document here</span>
            <span className={styles.dropMeta}>PDF, DOCX or Markdown · up to 40 MB</span>
            <Button variant="secondary" size="sm" style={{ marginTop: 8 }}>
              Browse files
            </Button>
          </div>

          {state.file && (
            <Card>
              <div className={styles.file}>
                <span className={styles.fileIcon}>
                  <IconDocument size={20} />
                </span>
                <span className={styles.fileBody}>
                  <span className={styles.fileName}>{forBrand(doc.file, brand)}</span>
                  <br />
                  <span className={styles.fileMeta}>{doc.size}</span>
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => state.patch({ file: false })}
                >
                  Remove
                </Button>
              </div>

              <div className={styles.fileActions}>
                <Button onClick={state.startAnalysis}>Start analysis</Button>
                <span className={styles.fileMeta}>Takes about 40 seconds</span>
              </div>
            </Card>
          )}
        </div>

        <Card tone="panel">
          <Eyebrow>What the agent extracts</Eyebrow>
          <div className={styles.extractList}>
            {doc.extracts.map((item) => (
              <p key={item} className={styles.extractRow}>
                <span className={styles.extractDot} aria-hidden="true" />
                {item}
              </p>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
