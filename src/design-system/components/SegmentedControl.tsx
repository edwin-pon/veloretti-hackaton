import styles from './SegmentedControl.module.css';
import { cx } from '../utils/cx';

export interface SegmentedOption<T extends string = string> {
  value: T;
  label: string;
}

export interface SegmentedControlProps<T extends string = string> {
  options: readonly SegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;
  full?: boolean;
  'aria-label'?: string;
  className?: string;
}

export function SegmentedControl<T extends string = string>({
  options,
  value,
  onChange,
  full = false,
  className,
  'aria-label': ariaLabel,
}: SegmentedControlProps<T>) {
  const index = Math.max(
    0,
    options.findIndex((option) => option.value === value),
  );
  const width = options.length > 0 ? 100 / options.length : 100;

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={cx(styles.control, full && styles.full, className)}
    >
      <span
        className={styles.thumb}
        style={{
          width: `calc(${width}% - ${(6 * (options.length - 1)) / options.length}px)`,
          transform: `translateX(calc(${index * 100}% + ${index * 3}px))`,
          left: 3,
        }}
        aria-hidden="true"
      />
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          role="tab"
          aria-selected={option.value === value}
          className={cx(styles.option, option.value === value && styles.selected)}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
