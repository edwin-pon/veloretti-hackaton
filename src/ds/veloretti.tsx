/**
 * The design-system components, in Veloretti's visual language.
 *
 * The app's layout is unchanged: the screens keep their own markup, their
 * sidebar, their cards and their spacing. Only what these components paint
 * changes, so the brand arrives through colour, type and weight rather than
 * through a new layout.
 *
 * The props are exactly those of the Datalab components these replace, so no
 * caller had to be touched. The compiled Datalab bundle hardcodes its palette
 * in generated code, which is why it is replaced here rather than restyled.
 *
 * Veloretti's rules that shape these: one typeface, monochrome surfaces, a
 * near-black ink, hairline borders, and orange reserved for the promotional
 * case. In this app that case is a low-confidence flag, and nothing else.
 */
import type { ReactNode } from 'react'

type Tone = 'mint' | 'sky' | 'purple' | 'navy' | 'neutral' | 'warning' | 'error' | 'success'

const INK = 'var(--navy)'
const LINE = 'var(--hairline)'
const MUTED = 'var(--slate)'

/** Tonal fills collapse to the grey ramp; the brand does not colour-code state. */
const TONE_BG: Record<Tone, string> = {
  mint: 'var(--mist)',
  sky: 'var(--mist)',
  purple: 'var(--mist)',
  navy: 'var(--navy)',
  neutral: 'var(--mist)',
  success: 'var(--mist)',
  warning: 'var(--mist)',
  error: 'var(--mist)',
}

const TONE_FG: Record<Tone, string> = {
  mint: INK,
  sky: INK,
  purple: INK,
  navy: '#FFFFFF',
  neutral: INK,
  success: INK,
  warning: 'var(--flag-ink)',
  error: 'var(--flag-ink)',
}

export function Badge({ tone = 'neutral', children }: { tone?: Tone; children?: ReactNode }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        height: 24,
        padding: '0 12px',
        borderRadius: 999,
        border: `1px solid ${tone === 'navy' ? 'var(--navy)' : LINE}`,
        background: TONE_BG[tone],
        color: TONE_FG[tone],
        fontFamily: 'var(--font-sans)',
        fontSize: 11,
        fontWeight: 500,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </span>
  )
}

export function Spinner({ size = 24 }: { size?: number; tone?: Tone }) {
  return (
    <span
      role="status"
      aria-label="Loading"
      style={{
        display: 'inline-block',
        width: size,
        height: size,
        borderRadius: 999,
        border: `1.5px solid ${LINE}`,
        borderTopColor: INK,
        animation: 'dl-spin 900ms linear infinite',
      }}
    />
  )
}

export function ProgressBar({
  value = 0,
  max = 100,
  showValue = false,
  label,
}: {
  value?: number
  max?: number
  showValue?: boolean
  label?: string
}) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100))
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {(label || showValue) && (
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          {label && <Eyebrow>{label}</Eyebrow>}
          {showValue && <Eyebrow>{Math.round(pct)}%</Eyebrow>}
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={Math.round(pct)}
        aria-valuemin={0}
        aria-valuemax={100}
        style={{ height: 2, background: LINE, overflow: 'hidden' }}
      >
        <div
          style={{
            height: '100%',
            width: `${pct}%`,
            background: INK,
            transition: 'width 220ms cubic-bezier(0.4,0,0.2,1)',
          }}
        />
      </div>
    </div>
  )
}

export function AlertBanner({
  variant = 'info',
  title,
  children,
}: {
  variant?: 'info' | 'success' | 'warning' | 'error'
  title?: string
  children?: ReactNode
}) {
  const attention = variant === 'warning' || variant === 'error'
  return (
    <div
      style={{
        borderLeft: `1.5px solid ${attention ? 'var(--flag)' : INK}`,
        background: '#FFFFFF',
        padding: '20px 24px',
      }}
    >
      {title && (
        <div style={{ marginBottom: 8 }}>
          <Eyebrow>{title}</Eyebrow>
        </div>
      )}
      <p
        style={{
          margin: 0,
          fontSize: 15,
          lineHeight: 'var(--lh-body)',
          color: 'var(--ink-secondary)',
          textWrap: 'pretty',
        }}
      >
        {children}
      </p>
    </div>
  )
}

export function Avatar({
  name = '',
  size = 32,
  src,
}: {
  name?: string
  size?: number
  tone?: Tone
  src?: string
}) {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')

  return (
    <span
      style={{
        width: size,
        height: size,
        flex: 'none',
        borderRadius: 999,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: src ? `center/cover url(${src})` : 'var(--mist)',
        border: `1px solid ${LINE}`,
        color: INK,
        fontFamily: 'var(--font-sans)',
        fontSize: Math.round(size * 0.36),
        fontWeight: 500,
        letterSpacing: '0.04em',
      }}
    >
      {src ? '' : initials}
    </span>
  )
}

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
                background: done || active ? INK : LINE,
                transition: 'background 220ms cubic-bezier(0.4,0,0.2,1)',
              }}
            />
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
              <Eyebrow muted={!done && !active}>
                {done ? '✓' : String(index + 1).padStart(2, '0')}
              </Eyebrow>
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 15,
                  fontWeight: active ? 500 : 400,
                  color: done || active ? INK : MUTED,
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

export function TextInput({
  value = '',
  onChange,
  placeholder,
  multiline = false,
  rows = 3,
  type = 'text',
  disabled = false,
}: {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  multiline?: boolean
  rows?: number
  type?: string
  disabled?: boolean
}) {
  const shared = {
    ...FIELD,
    opacity: disabled ? 0.5 : 1,
  }
  return multiline ? (
    <textarea
      className="dl-field"
      value={value}
      rows={rows}
      placeholder={placeholder}
      disabled={disabled}
      onChange={(event) => onChange?.(event.target.value)}
      style={{ ...shared, padding: '14px 18px', borderRadius: 12, resize: 'vertical' }}
    />
  ) : (
    <input
      className="dl-field"
      type={type}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      onChange={(event) => onChange?.(event.target.value)}
      style={{ ...shared, height: 44, padding: '0 18px', borderRadius: 999 }}
    />
  )
}

export function Select({
  value = '',
  onChange,
  options = [],
  placeholder,
}: {
  value?: string
  onChange?: (value: string) => void
  options?: Array<string | { label: string; value: string }>
  placeholder?: string
}) {
  const normalised = options.map((option) =>
    typeof option === 'string' ? { label: option, value: option } : option,
  )
  return (
    <select
      className="dl-field"
      value={value}
      onChange={(event) => onChange?.(event.target.value)}
      style={{
        ...FIELD,
        height: 44,
        padding: '0 42px 0 18px',
        borderRadius: 999,
        appearance: 'none',
        cursor: 'pointer',
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1.5 6 6.5 11 1.5' stroke='%231A1A1A' stroke-width='1.4' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")",
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 18px center',
      }}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {normalised.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}

export function Toggle({
  checked = false,
  onChange,
  label,
  disabled = false,
}: {
  checked?: boolean
  onChange?: (checked: boolean) => void
  label?: string
  disabled?: boolean
}) {
  return (
    <label
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 12,
        cursor: disabled ? 'default' : 'pointer',
        fontFamily: 'var(--font-sans)',
        fontSize: 15,
        color: INK,
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(event) => onChange?.(event.target.checked)}
        style={{ position: 'absolute', opacity: 0, width: 1, height: 1 }}
      />
      <span
        aria-hidden
        style={{
          width: 44,
          height: 26,
          flex: 'none',
          borderRadius: 999,
          background: checked ? INK : '#FFFFFF',
          border: `1.5px solid ${checked ? INK : LINE}`,
          padding: 2,
          display: 'flex',
          transition: 'background 120ms cubic-bezier(0.4,0,0.2,1), border-color 120ms cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        <span
          style={{
            width: 18,
            height: 18,
            borderRadius: 999,
            background: checked ? '#FFFFFF' : 'var(--slate)',
            transform: `translateX(${checked ? 18 : 0}px)`,
            transition: 'transform 120ms cubic-bezier(0.4,0,0.2,1)',
          }}
        />
      </span>
      {label}
    </label>
  )
}

/** The brand's small-type treatment: uppercase, wide tracking, quiet. */
function Eyebrow({ children, muted }: { children: ReactNode; muted?: boolean }) {
  return (
    <span
      style={{
        fontFamily: 'var(--font-sans)',
        fontSize: 11,
        fontWeight: 500,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: muted ? MUTED : INK,
      }}
    >
      {children}
    </span>
  )
}

const FIELD: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: 15,
  color: INK,
  background: '#FFFFFF',
  border: `1.5px solid ${LINE}`,
  outline: 'none',
  boxSizing: 'border-box',
  width: '100%',
  transition: 'border-color 120ms cubic-bezier(0.4,0,0.2,1)',
}
