import styles from './Onboarding.module.css';
import { brandOf, forBrand } from '../../data/brands';
import { documentOrder, sourceDocuments } from '../../data/documents';
import { useAppStore } from '../../store/appStore';
import { documentsDone } from '../../store/selectors';
import { Badge, Button, Card, IconCheck, cx } from '../../design-system';

const STEPPER = ['Brand information', 'Legal rules', 'Style guide', 'Ready'];

export function HubScreen() {
  const state = useAppStore();
  const brand = brandOf(state.brandKey);
  const done = documentsDone(state);
  const doneCount = documentOrder.filter((key) => done[key]).length;
  const allDone = doneCount === documentOrder.length;
  const nextKey = documentOrder.find((key) => !done[key]);

  return (
    <div className={styles.page}>
      <div className={styles.head}>
        <h1 className={styles.title}>Brand onboarding</h1>
        <p className={styles.lede}>
          Upload one document at a time. An agent reads it, extracts the rules your
          campaigns will follow, and hands you an editable draft to confirm.
        </p>
      </div>

      <Card pad={0}>
        <div className={styles.stepper}>
          {STEPPER.map((label, index) => {
            const isDone = index < doneCount;
            const isCurrent = index === doneCount;
            return (
              <div key={label} style={{ display: 'contents' }}>
                <span
                  className={cx(
                    styles.step,
                    isDone && styles.stepDone,
                    isCurrent && styles.stepCurrent,
                  )}
                >
                  <span className={styles.stepMark}>
                    {isDone ? <IconCheck size={12} /> : index + 1}
                  </span>
                  {label}
                </span>
                {index < STEPPER.length - 1 && <span className={styles.stepRule} />}
              </div>
            );
          })}
        </div>
      </Card>

      <div className={styles.cards}>
        {documentOrder.map((key) => {
          const doc = sourceDocuments.find((item) => item.key === key)!;
          const isDone = Boolean(done[key]);
          const isNext = key === nextKey;
          const locked = !isDone && !isNext;

          return (
            <Card key={key} className={cx(styles.card, isNext && styles.cardNext)}>
              <div className={styles.cardTop}>
                <span className={styles.cardNum}>0{doc.order}</span>
                <Badge variant={isDone ? 'ok' : isNext ? 'ink' : 'neutral'}>
                  {isDone ? 'Confirmed' : isNext ? 'Next up' : 'Waiting'}
                </Badge>
              </div>

              <div>
                <h3 className={styles.cardTitle}>{doc.card}</h3>
                <p className={styles.cardDesc}>{doc.desc}</p>
              </div>

              <span className={styles.cardFoot}>
                {isDone
                  ? forBrand(doc.file, brand)
                  : locked
                    ? 'Unlocks after the previous step'
                    : 'No document yet'}
              </span>

              <Button
                variant={isDone ? 'secondary' : 'primary'}
                disabled={locked}
                full
                onClick={() =>
                  state.go(isDone ? 'review' : 'upload', {
                    doc: key,
                    file: false,
                    why: null,
                  })
                }
              >
                {isDone ? 'Review again' : 'Upload document'}
              </Button>
            </Card>
          );
        })}
      </div>

      {allDone && (
        <Card tone="ink" className={styles.done}>
          <div>
            <h3 className={styles.doneTitle}>Brand knowledge is live</h3>
            <p className={styles.doneBody} style={{ color: 'rgba(255,255,255,0.7)' }}>
              Every campaign draft is now checked against these rules before it leaves
              the platform.
            </p>
          </div>
          <Button variant="inverse" onClick={() => state.go('dashboard')}>
            Open dashboard
          </Button>
        </Card>
      )}
    </div>
  );
}
