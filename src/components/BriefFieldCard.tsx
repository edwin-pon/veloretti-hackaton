import type { BriefField } from '../data/briefing'
import { Badge, Label, SelectField, TextArea, TextField } from '../ds'
import { useCampaign } from '../lib/campaign-store'
import { deriveField } from '../lib/derived'

/**
 * One question in the briefing.
 *
 * A field answered by hand is just an answer. A field an agent read out of a
 * document is a claim, so that one carries a confidence, a citation and the
 * reasoning behind it. Showing that chrome on something someone typed would be
 * dressing up their own answer as evidence, so it only appears when it is true.
 *
 * Two types are never answered at all. `derived` follows from another answer,
 * so it renders read-only; `percent` is the single-sourced offer value.
 */
export default function BriefFieldCard({ field }: { field: BriefField }) {
  const { state, setValue, setDraft, addChip, removeChip, toggleWhy, fieldStatus } = useCampaign()
  const status = fieldStatus(field)
  const value = state.values[field.key]
  const whyOpen = state.why === field.key
  const derived = field.type === 'derived'
  const extracted = !!state.extracted[field.key]
  const missing = field.required && isEmpty(value)

  return (
    <div
      style={{
        background: derived ? 'var(--surface-sand)' : 'var(--surface-card)',
        border: `1px solid ${missing ? 'var(--border-default)' : 'var(--border-subtle)'}`,
        borderRadius: 'var(--radius-lg)',
        padding: 28,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 20,
          marginBottom: 18,
        }}
      >
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 'var(--fs-body)', fontWeight: 500, marginBottom: 4 }}>
            {field.label}
            {field.required && (
              <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}> · required</span>
            )}
          </div>
          <div style={{ fontSize: 'var(--fs-caption)', color: 'var(--text-muted)' }}>
            {field.hint}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 'none' }}>
          {extracted && <Label style={{ color: 'var(--vr-gray-500)' }}>{field.conf}%</Label>}
          <Badge
            variant={derived ? 'neutral' : status.variant}
            style={status.variant === 'accent' ? { color: 'var(--vr-ink)' } : undefined}
          >
            {derived ? 'Derived' : status.label}
          </Badge>
        </div>
      </div>

      <Control />

      {(extracted || derived) && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 18,
            flexWrap: 'wrap',
            marginTop: 18,
            fontSize: 'var(--fs-caption)',
            color: 'var(--text-muted)',
          }}
        >
          {extracted && (
            <>
              <span>{field.cite}</span>
              <button
                type="button"
                className="vr-underline"
                onClick={() => toggleWhy(field.key)}
                style={{ fontSize: 'var(--fs-caption)' }}
              >
                {whyOpen ? 'Hide reasoning' : 'Why this value'}
              </button>
            </>
          )}
          {derived && <span>Follows from {field.derivedFrom}</span>}
          <span style={{ marginLeft: 'auto' }}>
            {state.touched[field.key] ? 'Edited by you' : ''}
          </span>
        </div>
      )}

      {whyOpen && extracted && (
        <div style={{ marginTop: 18, paddingTop: 18, borderTop: '1px solid var(--border-subtle)' }}>
          <div style={{ marginBottom: 10 }}>
            <Label>Agent reasoning</Label>
          </div>
          <p
            style={{
              fontSize: 'var(--fs-body-s)',
              lineHeight: 'var(--lh-body)',
              color: 'var(--text-secondary)',
              margin: '0 0 14px',
              textWrap: 'pretty',
            }}
          >
            {field.reasoning}
          </p>
          <div
            style={{
              fontSize: 'var(--fs-body-s)',
              color: 'var(--text-muted)',
              borderLeft: '1.5px solid var(--border-default)',
              paddingLeft: 16,
            }}
          >
            {field.quote}
          </div>
        </div>
      )}
    </div>
  )

  function Control() {
    switch (field.type) {
      case 'derived':
        return (
          <div style={{ fontSize: 'var(--fs-body)', lineHeight: 'var(--lh-body)' }}>
            {deriveField(field.key, state.markets)}
          </div>
        )
      case 'area':
        return (
          <TextArea
            value={String(value ?? '')}
            onChange={(next) => setValue(field.key, next)}
            rows={field.rows ?? 3}
            ariaLabel={field.label}
          />
        )
      case 'select':
        return (
          <SelectField
            value={String(value ?? '')}
            onChange={(next) => setValue(field.key, next)}
            // An unanswered question shows as unanswered rather than defaulting
            // to whichever option happens to be first.
            options={value ? (field.options ?? []) : ['', ...(field.options ?? [])]}
            ariaLabel={field.label}
          />
        )
      case 'date':
        return (
          <input
            type="date"
            className="vr-field"
            aria-label={field.label}
            value={String(value ?? '')}
            onChange={(event) => setValue(field.key, event.target.value)}
            style={inputStyle}
          />
        )
      case 'percent':
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <input
              type="number"
              min={0}
              max={100}
              className="vr-field"
              aria-label={field.label}
              value={Number(value ?? 0)}
              onChange={(event) => setValue(field.key, Number(event.target.value))}
              style={{ ...inputStyle, width: 120 }}
            />
            <span style={{ fontSize: 'var(--fs-body)' }}>%</span>
          </div>
        )
      case 'chips': {
        const chips = Array.isArray(value) ? (value as string[]) : []
        return (
          <div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {chips.map((chip, index) => (
                <span
                  key={`${chip}-${index}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 10,
                    height: 'var(--control-h-sm)',
                    padding: '0 8px 0 16px',
                    borderRadius: 'var(--radius-pill)',
                    border: '1px solid var(--border-default)',
                    fontSize: 'var(--fs-body-s)',
                  }}
                >
                  {chip}
                  <button
                    type="button"
                    aria-label={`Remove ${chip}`}
                    onClick={() => removeChip(field.key, index)}
                    style={{
                      width: 20,
                      height: 20,
                      display: 'grid',
                      placeItems: 'center',
                      border: 'none',
                      background: 'none',
                      padding: 0,
                      fontSize: 15,
                      lineHeight: 1,
                      color: 'var(--vr-gray-500)',
                      cursor: 'pointer',
                    }}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <form
              onSubmit={(event) => {
                event.preventDefault()
                addChip(field.key)
              }}
              style={{ display: 'flex', gap: 10, marginTop: 14, maxWidth: 440 }}
            >
              <div style={{ flex: 1 }}>
                <TextField
                  value={state.drafts[field.key] ?? ''}
                  onChange={(next) => setDraft(field.key, next)}
                  placeholder={field.chipPlaceholder ?? 'Add an item'}
                  ariaLabel={`${field.chipPlaceholder ?? 'Add an item'} to ${field.label}`}
                />
              </div>
              <button
                type="submit"
                style={{
                  height: 'var(--control-h-md)',
                  padding: '0 22px',
                  borderRadius: 'var(--radius-pill)',
                  border: '1.5px solid var(--vr-black)',
                  background: 'transparent',
                  fontSize: '0.9375rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  flex: 'none',
                }}
              >
                Add
              </button>
            </form>
          </div>
        )
      }
      default:
        return (
          <TextField
            value={String(value ?? '')}
            onChange={(next) => setValue(field.key, next)}
            ariaLabel={field.label}
          />
        )
    }
  }
}

function isEmpty(value: unknown): boolean {
  if (Array.isArray(value)) return value.length === 0
  if (typeof value === 'number') return value === 0
  return !value
}

const inputStyle: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: '0.9375rem',
  color: 'var(--vr-ink)',
  background: 'var(--vr-white)',
  border: '1.5px solid var(--vr-gray-200)',
  outline: 'none',
  height: 'var(--control-h-md)',
  padding: '0 18px',
  borderRadius: 'var(--radius-pill)',
}
