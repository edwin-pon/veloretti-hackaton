import { useState } from 'react';
import type { KeyboardEvent } from 'react';
import styles from './ChipInput.module.css';
import { cx } from '../utils/cx';

export interface ChipInputProps {
  values: readonly string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  readOnly?: boolean;
  className?: string;
  'aria-label'?: string;
}

export function ChipInput({
  values,
  onChange,
  placeholder = 'Add an item',
  readOnly = false,
  className,
  'aria-label': ariaLabel,
}: ChipInputProps) {
  const [draft, setDraft] = useState('');

  const commit = () => {
    const next = draft.trim();
    if (!next || values.includes(next)) {
      setDraft('');
      return;
    }
    onChange([...values, next]);
    setDraft('');
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault();
      commit();
      return;
    }
    if (event.key === 'Backspace' && draft === '' && values.length > 0) {
      onChange(values.slice(0, -1));
    }
  };

  return (
    <div className={cx(styles.wrap, readOnly && styles.readonly, className)}>
      {values.map((value) => (
        <span key={value} className={styles.chip}>
          {value}
          {!readOnly && (
            <button
              type="button"
              className={styles.remove}
              aria-label={`Remove ${value}`}
              onClick={() => onChange(values.filter((item) => item !== value))}
            >
              ×
            </button>
          )}
        </span>
      ))}
      {!readOnly && (
        <input
          className={styles.input}
          value={draft}
          placeholder={placeholder}
          aria-label={ariaLabel ?? placeholder}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={commit}
        />
      )}
    </div>
  );
}
