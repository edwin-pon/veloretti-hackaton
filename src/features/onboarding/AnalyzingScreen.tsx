import styles from './Onboarding.module.css';
import { brandOf, forBrand } from '../../data/brands';
import { documentByKey } from '../../data/documents';
import { useAppStore } from '../../store/appStore';
import {
  Card,
  IconCheck,
  ProgressBar,
  Spinner,
  cx,
} from '../../design-system';

const ANALYSIS_STEPS = [
  'Parsing document structure',
  'Locating rule statements',
  'Extracting and normalising values',
  'Scoring confidence and citations',
];

export function AnalyzingScreen() {
  const state = useAppStore();
  const brand = brandOf(state.brandKey);
  const doc = documentByKey(state.doc);
  const activeStep = Math.min(ANALYSIS_STEPS.length - 1, Math.floor(state.progress / 25));

  return (
    <div className={styles.analyze}>
      <Card pad={6}>
        <div className={styles.analyzeHead}>
          <Spinner size={26} />
          <div>
            <h2 className={styles.analyzeTitle}>Reading your document</h2>
            <p className={styles.analyzeFile}>{forBrand(doc.file, brand)}</p>
          </div>
        </div>

        <div style={{ marginTop: 'var(--space-6)' }}>
          <div className={styles.analyzeMeta}>
            <span>Extraction</span>
            <span>{Math.round(state.progress)}%</span>
          </div>
          <ProgressBar value={state.progress} label="Extraction" />
        </div>

        <div className={styles.steps} style={{ marginTop: 'var(--space-5)' }}>
          {ANALYSIS_STEPS.map((label, index) => {
            const isDone = index < activeStep;
            const isActive = index === activeStep;
            return (
              <div
                key={label}
                className={cx(
                  styles.stepRow,
                  isDone && styles.stepRowDone,
                  isActive && styles.stepRowActive,
                )}
              >
                <span className={styles.stepGlyph}>
                  {isDone ? <IconCheck size={11} /> : isActive ? '·' : ''}
                </span>
                <span className={styles.stepLabel}>{label}</span>
                <span className={styles.stepNote}>
                  {isDone ? 'done' : isActive ? 'running' : 'queued'}
                </span>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
