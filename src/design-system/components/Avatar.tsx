import styles from './Avatar.module.css';
import { cx } from '../utils/cx';
import { initialsOf } from '../utils/initials';

export type AvatarTone = 'neutral' | 'ink' | 'inverse' | 'accent';

export interface AvatarProps {
  name: string;
  size?: number;
  tone?: AvatarTone;
  className?: string;
}

export function Avatar({ name, size = 32, tone = 'neutral', className }: AvatarProps) {
  return (
    <span
      className={cx(styles.avatar, tone !== 'neutral' && styles[tone], className)}
      style={{ width: size, height: size, fontSize: Math.max(10, Math.round(size * 0.36)) }}
      title={name}
      aria-hidden="true"
    >
      {initialsOf(name)}
    </span>
  );
}
