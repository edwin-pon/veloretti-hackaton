/**
 * Primitives the Veloretti design system does not ship.
 *
 * Veloretti's own kit is a commerce kit — it has no progress, stepper, spinner,
 * toggle, notice or multiline field, because the brand site never needed them.
 * These are built from the brand's own tokens and rules: pill controls, hairline
 * borders, uppercase labels at 0.14em, calm motion, no bounce.
 *
 * Orange is the brand's tertiary accent and the guide reserves it for special
 * cases only, so it appears in exactly one place across this app: the flag on a
 * field the agent was unsure about. Everything else stays monochrome.
 */
import { useId, type ReactNode } from 'react'

const LABEL: React.CSSProperties = {
  fontSize: '0.6875rem',
  fontWeight: 500,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'var(--vr-gray-700)',
}

/** Uppercase eyebrow/label, the brand's standard small-type treatment. */
export function Label({ children, style }: { children: ReactNode; style?: React.CSSProperties }) {
  return <span style={{ ...LABEL, ...style }}>{children}</span>
}

export function Spinner({ size = 24 }: { size?: number }) {
  return (
    <span
      role="status"
      aria-label="Loading"
      style={{
        display: 'inline-block',
        width: size,
        height: size,
        borderRadius: '999px',
        border: `1.5px solid var(--vr-gray-200)`,
        borderTopColor: 'var(--vr-ink)',
        animation: 'vr-spin 900ms linear infinite',
      }}
    />
  )
}

export function ProgressBar({
  value = 0,
  max = 100,
  label,
  showValue = false,
}: {
  value?: number
  max?: number
  label?: string
  showValue?: boolean
}) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100))
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {(label || showValue) && (
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          {label && <Label>{label}</Label>}
          {showValue && (
            <span style={{ ...LABEL, letterSpacing: '0.08em' }}>{Math.round(pct)}%</span>
          )}
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={Math.round(pct)}
        aria-valuemin={0}
        aria-valuemax={100}
        style={{ height: 2, background: 'var(--vr-gray-200)', overflow: 'hidden' }}
      >
        <div
          style={{
            height: '100%',
            width: `${pct}%`,
            background: 'var(--vr-ink)',
            transition: 'width var(--dur-med) var(--ease-standard)',
          }}
        />
      </div>
    </div>
  )
}

/** Numbered steps with a hairline rule between them. */
export function Stepper({ steps = [], current = 0 }: { steps?: string[]; current?: number }) {
  return (
    <ol
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))`,
        gap: 24,
        listStyle: 'none',
        margin: 0,
        padding: 0,
      }}
    >
      {steps.map((step, index) => {
        const done = index < current
        const active = index === current
        return (
          <li key={step} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div
              style={{
                height: 2,
                background: done || active ? 'var(--vr-ink)' : 'var(--vr-gray-200)',
                transition: 'background var(--dur-med) var(--ease-standard)',
              }}
            />
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
              <span style={{ ...LABEL, color: done || active ? 'var(--vr-ink)' : 'var(--vr-gray-300)' }}>
                {done ? '✓' : String(index + 1).padStart(2, '0')}
              </span>
              <span
                style={{
                  fontSize: '0.9375rem',
                  fontWeight: active ? 500 : 400,
                  color: done || active ? 'var(--vr-ink)' : 'var(--vr-gray-300)',
                }}
              >
                {step}
              </span>
            </div>
          </li>
        )
      })}
    </ol>
  )
}

export function Toggle({
  checked = false,
  onChange,
  label,
}: {
  checked?: boolean
  onChange?: (checked: boolean) => void
  label?: string
}) {
  return (
    <label
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 12,
        cursor: 'pointer',
        fontSize: '0.9375rem',
        color: 'var(--vr-ink)',
      }}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange?.(event.target.checked)}
        style={{ position: 'absolute', opacity: 0, width: 1, height: 1 }}
      />
      <span
        aria-hidden
        style={{
          width: 44,
          height: 26,
          flex: 'none',
          borderRadius: 'var(--radius-pill)',
          background: checked ? 'var(--vr-ink)' : 'var(--vr-white)',
          border: `1.5px solid ${checked ? 'var(--vr-ink)' : 'var(--vr-gray-200)'}`,
          padding: 2,
          display: 'flex',
          transition: 'var(--transition-control)',
        }}
      >
        <span
          style={{
            width: 18,
            height: 18,
            borderRadius: '999px',
            background: checked ? 'var(--vr-white)' : 'var(--vr-gray-300)',
            transform: `translateX(${checked ? 18 : 0}px)`,
            transition: 'transform var(--dur-fast) var(--ease-standard)',
          }}
        />
      </span>
      {label}
    </label>
  )
}

/** A quiet bordered panel for agent commentary. Never coloured. */
export function Notice({
  title,
  children,
  tone = 'neutral',
}: {
  title?: string
  children?: ReactNode
  tone?: 'neutral' | 'attention'
}) {
  return (
    <div
      style={{
        borderLeft: `1.5px solid ${tone === 'attention' ? 'var(--vr-orange)' : 'var(--vr-ink)'}`,
        background: 'var(--vr-white)',
        padding: '20px 24px',
      }}
    >
      {title && (
        <div style={{ marginBottom: 8 }}>
          <Label>{title}</Label>
        </div>
      )}
      <p
        style={{
          margin: 0,
          fontSize: '0.9375rem',
          lineHeight: 'var(--lh-body)',
          color: 'var(--vr-gray-700)',
          textWrap: 'pretty',
        }}
      >
        {children}
      </p>
    </div>
  )
}

const FIELD: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: '0.9375rem',
  color: 'var(--vr-ink)',
  background: 'var(--vr-white)',
  border: '1.5px solid var(--vr-gray-200)',
  outline: 'none',
  boxSizing: 'border-box',
  width: '100%',
  transition: 'border-color var(--dur-fast) var(--ease-standard)',
}

/**
 * Value-callback wrappers around the brand's field styling. The kit's own Input
 * is single-line and event-based; the review screen needs multiline and a plain
 * value callback.
 */
export function TextField({
  value,
  onChange,
  placeholder,
  label,
}: {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  label?: string
}) {
  const id = useId()
  return (
    <Field id={id} label={label}>
      <input
        id={id}
        className="vr-field"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        style={{ ...FIELD, height: 'var(--control-h-md)', padding: '0 18px', borderRadius: 'var(--radius-pill)' }}
      />
    </Field>
  )
}

export function TextArea({
  value,
  onChange,
  rows = 3,
  label,
}: {
  value: string
  onChange: (value: string) => void
  rows?: number
  label?: string
}) {
  const id = useId()
  return (
    <Field id={id} label={label}>
      <textarea
        id={id}
        className="vr-field"
        value={value}
        rows={rows}
        onChange={(event) => onChange(event.target.value)}
        style={{
          ...FIELD,
          padding: '14px 18px',
          borderRadius: 'var(--radius-lg)',
          resize: 'vertical',
          lineHeight: 'var(--lh-body)',
        }}
      />
    </Field>
  )
}

export function SelectField({
  value,
  onChange,
  options,
  label,
}: {
  value: string
  onChange: (value: string) => void
  options: string[]
  label?: string
}) {
  const id = useId()
  return (
    <Field id={id} label={label}>
      <select
        id={id}
        className="vr-field"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        style={{
          ...FIELD,
          height: 'var(--control-h-md)',
          padding: '0 42px 0 18px',
          borderRadius: 'var(--radius-pill)',
          appearance: 'none',
          cursor: 'pointer',
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1.5 6 6.5 11 1.5' stroke='%231A1A1A' stroke-width='1.4' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")",
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 18px center',
        }}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </Field>
  )
}

function Field({ id, label, children }: { id: string; label?: string; children: ReactNode }) {
  if (!label) return <>{children}</>
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
      <label htmlFor={id} style={LABEL}>
        {label}
      </label>
      {children}
    </div>
  )
}
