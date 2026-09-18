import styles from './ProgressBar.module.css';
import { cx } from '../utils/cx';

export type ProgressTone = 'ink' | 'ok' | 'warn' | 'block';

export interface ProgressBarProps {
  value: number;
  tone?: ProgressTone;
  size?: 'thin' | 'default' | 'thick';
  label?: string;
  className?: string;
}

export function ProgressBar({
  value,
  tone = 'ink',
  size = 'default',
  label,
  className,
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div
      className={cx(
        styles.track,
        size === 'thin' && styles.thin,
        size === 'thick' && styles.thick,
        className,
      )}
      role="progressbar"
      aria-valuenow={Math.round(clamped)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
    >
      <div
        className={cx(styles.fill, tone !== 'ink' && styles[tone])}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
