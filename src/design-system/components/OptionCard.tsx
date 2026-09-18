import type { ReactNode } from 'react';
import styles from './OptionCard.module.css';
import { cx } from '../utils/cx';

export interface OptionCardProps {
  label: ReactNode;
  note?: ReactNode;
  trailing?: ReactNode;
  selected?: boolean;
  onSelect?: () => void;
  className?: string;
}

export function OptionCard({
  label,
  note,
  trailing,
  selected = false,
  onSelect,
  className,
}: OptionCardProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      className={cx(styles.card, selected && styles.selected, className)}
      onClick={onSelect}
    >
      <span className={styles.mark} aria-hidden="true">
        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
          <path
            d="M1 4l2.5 2.5L9 1"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className={styles.body}>
        <span className={styles.label}>{label}</span>
        {note && <span className={styles.note}>{note}</span>}
      </span>
      {trailing && <span className={styles.trailing}>{trailing}</span>}
    </button>
  );
}
