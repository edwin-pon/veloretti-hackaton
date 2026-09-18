import { useId } from 'react';
import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react';
import styles from './Field.module.css';
import { cx } from '../utils/cx';

type FieldShellProps = {
  id?: string;
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  className?: string;
  children: ReactNode;
};

function FieldShell({ id, label, hint, error, className, children }: FieldShellProps) {
  const message = error ?? hint;
  return (
    <div className={cx(styles.field, className)}>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      )}
      {children}
      {message && (
        <span className={cx(styles.hint, error && styles.hintError)}>{message}</span>
      )}
    </div>
  );
}

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  size?: 'sm' | 'md';
  fieldClassName?: string;
}

export function Input({
  label,
  hint,
  error,
  size = 'md',
  id,
  className,
  fieldClassName,
  ...rest
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  return (
    <FieldShell
      id={inputId}
      label={label}
      hint={hint}
      error={error}
      className={fieldClassName}
    >
      <input
        id={inputId}
        className={cx(
          styles.control,
          styles.input,
          size === 'sm' && styles.inputSm,
          error && styles.error,
          className,
        )}
        {...rest}
      />
    </FieldShell>
  );
}

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  fieldClassName?: string;
}

export function Textarea({
  label,
  hint,
  error,
  id,
  className,
  fieldClassName,
  rows = 3,
  ...rest
}: TextareaProps) {
  const generatedId = useId();
  const textareaId = id ?? generatedId;
  return (
    <FieldShell
      id={textareaId}
      label={label}
      hint={hint}
      error={error}
      className={fieldClassName}
    >
      <textarea
        id={textareaId}
        rows={rows}
        className={cx(styles.control, styles.textarea, error && styles.error, className)}
        {...rest}
      />
    </FieldShell>
  );
}

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  options?: readonly string[];
  size?: 'sm' | 'md';
  fieldClassName?: string;
}

export function Select({
  label,
  hint,
  error,
  options,
  size = 'md',
  id,
  className,
  fieldClassName,
  children,
  ...rest
}: SelectProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  return (
    <FieldShell
      id={selectId}
      label={label}
      hint={hint}
      error={error}
      className={fieldClassName}
    >
      <select
        id={selectId}
        className={cx(
          styles.control,
          styles.select,
          size === 'sm' && styles.selectSm,
          error && styles.error,
          className,
        )}
        {...rest}
      >
        {options
          ? options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))
          : children}
      </select>
    </FieldShell>
  );
}
