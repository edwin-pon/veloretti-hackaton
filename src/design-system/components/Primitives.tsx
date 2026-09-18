import type { HTMLAttributes, ReactNode } from 'react';
import styles from './Primitives.module.css';
import { cx } from '../utils/cx';

export interface EyebrowProps extends HTMLAttributes<HTMLSpanElement> {
  children?: ReactNode;
  inverse?: boolean;
}

export function Eyebrow({ children, inverse = false, className, ...rest }: EyebrowProps) {
  return (
    <span
      className={cx(styles.eyebrow, inverse && styles.eyebrowInverse, className)}
      {...rest}
    >
      {children}
    </span>
  );
}

export function Meta({ children, className, ...rest }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={cx(styles.meta, className)} {...rest}>
      {children}
    </span>
  );
}

export function Divider({ className }: { className?: string }) {
  return <hr className={cx(styles.divider, className)} />;
}

export function Spinner({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <span
      className={cx(styles.spinner, className)}
      style={{ width: size, height: size }}
      role="status"
      aria-label="Loading"
    />
  );
}

export interface EmptyStateProps {
  title: string;
  body?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({ title, body, action, className }: EmptyStateProps) {
  return (
    <div className={cx(styles.empty, className)}>
      <p className={styles.emptyTitle}>{title}</p>
      {body && <p className={styles.emptyBody}>{body}</p>}
      {action}
    </div>
  );
}
