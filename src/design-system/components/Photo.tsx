import { useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import styles from './Photo.module.css';
import { cx } from '../utils/cx';

export interface PhotoProps {
  /** Omitted for library items that have no real image yet. */
  src?: string;
  /** Flat brand tone shown while the image loads, and instead of it when absent. */
  tone: string;
  alt?: string;
  className?: string;
  style?: CSSProperties;
  /** Object position, for crops where the subject sits off-centre. */
  position?: string;
  /** Overlays drawn on top of the image, such as status dots or durations. */
  children?: ReactNode;
}

/** A media thumbnail. Falls back to the item's flat tone when there is no image,
 *  which keeps the synthetic back catalogue looking deliberate rather than broken. */
export function Photo({
  src,
  tone,
  alt = '',
  className,
  style,
  position,
  children,
}: PhotoProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <span
      className={cx(styles.photo, className)}
      style={{ backgroundColor: tone, ...style }}
    >
      {src && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className={cx(styles.image, loaded && styles.loaded)}
          style={position ? { objectPosition: position } : undefined}
          onLoad={() => setLoaded(true)}
        />
      )}
      {children}
    </span>
  );
}
