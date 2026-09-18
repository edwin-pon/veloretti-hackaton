import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react';
import styles from './Card.module.css';
import { cx } from '../utils/cx';

export type CardTone = 'card' | 'panel' | 'flush' | 'ink';
export type CardPadding = 0 | 3 | 4 | 5 | 6;

const padding: Record<CardPadding, string> = {
  0: styles.p0,
  3: styles.p3,
  4: styles.p4,
  5: styles.p5,
  6: styles.p6,
};

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  tone?: CardTone;
  pad?: CardPadding;
  raised?: boolean;
}

export function Card({
  children,
  tone = 'card',
  pad = 5,
  raised = false,
  className,
  ...rest
}: CardProps) {
  return (
    <div
      className={cx(
        styles.card,
        tone !== 'card' && styles[tone],
        padding[pad],
        raised && styles.raised,
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

export interface CardButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  tone?: CardTone;
  pad?: CardPadding;
}

export function CardButton({
  children,
  tone = 'card',
  pad = 5,
  className,
  type = 'button',
  ...rest
}: CardButtonProps) {
  return (
    <button
      type={type}
      className={cx(
        styles.card,
        styles.interactive,
        tone !== 'card' && styles[tone],
        padding[pad],
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
