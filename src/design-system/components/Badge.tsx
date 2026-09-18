import type { HTMLAttributes, ReactNode } from 'react';
import styles from './Badge.module.css';
import { cx } from '../utils/cx';

export type BadgeVariant =
  | 'neutral'
  | 'ink'
  | 'outline'
  | 'accent'
  | 'ok'
  | 'warn'
  | 'block'
  | 'info';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children?: ReactNode;
  variant?: BadgeVariant;
  pill?: boolean;
  dot?: boolean;
}

export function Badge({
  children,
  variant = 'neutral',
  pill = false,
  dot = false,
  className,
  ...rest
}: BadgeProps) {
  return (
    <span
      className={cx(styles.badge, styles[variant], pill && styles.pill, className)}
      {...rest}
    >
      {dot && <span className={styles.dot} aria-hidden="true" />}
      {children}
    </span>
  );
}
