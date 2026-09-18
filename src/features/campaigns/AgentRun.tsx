import styles from './Campaigns.module.css';
import onboardingStyles from '../onboarding/Onboarding.module.css';
import { Card, IconCheck, ProgressBar, Spinner, cx } from '../../design-system';

export interface AgentRunProps {
  title: string;
  subtitle: string;
  progress: number;
  steps: readonly string[];
  progressLabel?: string;
}

/** Shared presentation for the simulated agent runs: a spinner, a progress bar
 *  and the step list so it is always visible what the agent is doing. */
export function AgentRun({
  title,
  subtitle,
  progress,
  steps,
  progressLabel = 'Progress',
}: AgentRunProps) {
  const activeStep = Math.min(
    steps.length - 1,
    Math.floor(progress / (100 / steps.length)),
  );

  return (
    <div className={styles.run}>
      <Card pad={6}>
        <div className={styles.runHead}>
          <Spinner size={26} />
          <div>
            <h2 className={styles.runTitle}>{title}</h2>
            <p className={styles.runSub}>{subtitle}</p>
          </div>
        </div>

        <div style={{ marginTop: 'var(--space-6)' }}>
          <div className={onboardingStyles.analyzeMeta}>
            <span>{progressLabel}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <ProgressBar value={progress} label={progressLabel} />
        </div>

        <div className={onboardingStyles.steps} style={{ marginTop: 'var(--space-5)' }}>
          {steps.map((label, index) => {
            const isDone = index < activeStep;
            const isActive = index === activeStep;
            return (
              <div
                key={label}
                className={cx(
                  onboardingStyles.stepRow,
                  isDone && onboardingStyles.stepRowDone,
                  isActive && onboardingStyles.stepRowActive,
                )}
              >
                <span className={onboardingStyles.stepGlyph}>
                  {isDone ? <IconCheck size={11} /> : isActive ? '·' : ''}
                </span>
                <span className={onboardingStyles.stepLabel}>{label}</span>
                <span className={onboardingStyles.stepNote}>
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
