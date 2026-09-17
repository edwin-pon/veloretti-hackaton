import type { DocField } from '../data/docs'
import { Badge, Label, SelectField, TextArea, TextField, Toggle } from '../ds'
import { useStore } from '../lib/store'

interface Props {
  field: DocField
  /** Rendered above the input, e.g. the colour swatch or font specimen. */
  preview?: React.ReactNode
  /** Replaces the default input entirely, e.g. the type-scale table. */
  control?: React.ReactNode
}

/**
 * One extracted rule: what the agent read, how sure it was, where it came from,
 * and why. Rows are separated by hairlines rather than boxed in cards — the
 * brand reads editorial, not dashboard.
 */
export default function FieldCard({ field, preview, control }: Props) {
  const { state, setValue, setDraft, addChip, removeChip, toggleWhy, fieldStatus } = useStore()
  const status = fieldStatus(field)
  const value = state.values[field.key]
  const whyOpen = state.why === field.key

  return (
    <div
      style={{
        background: 'var(--surface-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        padding: 28,
      }}
    >
      {preview}

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
          </div>
          <div style={{ fontSize: 'var(--fs-caption)', color: 'var(--text-muted)' }}>
            {field.hint}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 'none' }}>
          <Label style={{ color: 'var(--vr-gray-400)' }}>{field.conf}%</Label>
          <Badge variant={status.variant}>{status.label}</Badge>
        </div>
      </div>

      {control ?? <FieldControl field={field} value={value} />}

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
        <span>{field.cite}</span>
        <button
          type="button"
          className="vr-underline"
          onClick={() => toggleWhy(field.key)}
          style={{ fontSize: 'var(--fs-caption)' }}
        >
          {whyOpen ? 'Hide reasoning' : 'Why this value'}
        </button>
        <span style={{ marginLeft: 'auto' }}>
          {state.touched[field.key] ? 'Edited by you' : ''}
        </span>
      </div>

      {whyOpen && (
        <div
          style={{
            marginTop: 18,
            paddingTop: 18,
            borderTop: '1px solid var(--border-subtle)',
          }}
        >
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

  function FieldControl({ field, value }: { field: DocField; value: unknown }) {
    switch (field.type) {
      case 'text':
        return (
          <TextField value={String(value ?? '')} onChange={(next) => setValue(field.key, next)} />
        )
      case 'area':
        return (
          <TextArea
            value={String(value ?? '')}
            onChange={(next) => setValue(field.key, next)}
            rows={field.rows ?? 3}
          />
        )
      case 'select':
        return (
          <SelectField
            value={String(value ?? '')}
            onChange={(next) => setValue(field.key, next)}
            options={field.options ?? []}
          />
        )
      case 'toggle':
        return (
          <Toggle
            checked={value === true}
            onChange={(next) => setValue(field.key, next)}
            label={field.toggleLabel}
          />
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
                      color: 'var(--vr-gray-400)',
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
    }
  }
}
