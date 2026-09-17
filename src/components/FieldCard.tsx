import { substitute, type DocField } from '../data/docs'
import { Badge, Select, TextInput, Toggle } from '../ds'
import { useStore } from '../lib/store'

/** Confidence dot colour — the prototype's three-step scale. */
function confidenceColor(conf: number): string {
  if (conf >= 85) return 'var(--navy)'
  if (conf >= 70) return 'var(--slate)'
  return 'var(--flag)'
}

interface Props {
  field: DocField
  /** Rendered above the input, e.g. the colour swatch or font specimen. */
  preview?: React.ReactNode
  /** Replaces the default input entirely, e.g. the type-scale table. */
  control?: React.ReactNode
}

export default function FieldCard({ field, preview, control }: Props) {
  const { state, brand, setValue, setDraft, addChip, removeChip, toggleWhy, fieldStatus } = useStore()
  const status = fieldStatus(field)
  const value = state.values[field.key]
  const whyOpen = state.why === field.key

  return (
    <div style={{ background: '#fff', borderRadius: 20, padding: 24, boxShadow: status.shadow }}>
      {preview}

      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 16,
          marginBottom: 14,
        }}
      >
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--ink-heading)' }}>
            {field.label}
          </div>
          <div style={{ fontSize: 13, color: 'var(--slate)', marginTop: 2 }}>{field.hint}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 'none' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              background: 'var(--mist)',
              borderRadius: 20,
              padding: '4px 12px',
              fontSize: 12,
              fontWeight: 700,
              color: 'var(--ink-heading)',
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: 999,
                background: confidenceColor(field.conf),
              }}
            />
            {field.conf}% confidence
          </span>
          <Badge tone={status.tone}>{status.label}</Badge>
        </div>
      </div>

      {control ?? <FieldControl field={field} value={value} />}

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          flexWrap: 'wrap',
          marginTop: 14,
          fontSize: 12,
          color: 'var(--slate)',
        }}
      >
        <span>{substitute(field.cite, brand)}</span>
        <button
          type="button"
          onClick={() => toggleWhy(field.key)}
          style={{
            border: 'none',
            background: 'none',
            padding: 0,
            font: 'inherit',
            fontSize: 12,
            fontWeight: 700,
            color: 'var(--navy)',
            cursor: 'pointer',
            textDecoration: 'underline',
          }}
        >
          {whyOpen ? 'Hide reasoning' : 'Why this value?'}
        </button>
        <span style={{ marginLeft: 'auto' }}>
          {state.touched[field.key] ? 'Edited by you' : ''}
        </span>
      </div>

      {whyOpen && (
        <div
          style={{
            marginTop: 14,
            background: 'var(--mist)',
            borderRadius: 12,
            padding: '16px 20px',
          }}
        >
          <div
            style={{
              fontSize: 11,
              letterSpacing: '1px',
              fontWeight: 700,
              color: 'var(--slate)',
              marginBottom: 8,
            }}
          >
            AGENT REASONING
          </div>
          <p
            style={{
              fontSize: 14,
              lineHeight: 1.6,
              color: 'var(--ink-secondary)',
              margin: '0 0 12px',
              textWrap: 'pretty',
            }}
          >
            {substitute(field.reasoning, brand)}
          </p>
          <div
            style={{
              fontSize: 13,
              color: 'var(--slate)',
              fontStyle: 'italic',
              borderLeft: '3px solid var(--purple)',
              paddingLeft: 12,
            }}
          >
            {substitute(field.quote, brand)}
          </div>
        </div>
      )}
    </div>
  )

  function FieldControl({ field, value }: { field: DocField; value: unknown }) {
    switch (field.type) {
      case 'text':
        return (
          <TextInput value={String(value ?? '')} onChange={(next) => setValue(field.key, next)} />
        )
      case 'area':
        return (
          <TextInput
            value={String(value ?? '')}
            onChange={(next) => setValue(field.key, next)}
            multiline
            rows={field.rows ?? 3}
          />
        )
      case 'select':
        return (
          <Select
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
                    gap: 8,
                    background: index % 2 ? 'var(--mist)' : 'var(--sky)',
                    borderRadius: 20,
                    padding: '7px 14px',
                    fontSize: 14,
                    fontWeight: 700,
                    color: 'var(--navy)',
                  }}
                >
                  {chip}
                  <button
                    type="button"
                    aria-label={`Remove ${chip}`}
                    onClick={() => removeChip(field.key, index)}
                    style={{
                      border: 'none',
                      background: 'none',
                      padding: 0,
                      font: 'inherit',
                      fontSize: 15,
                      lineHeight: 1,
                      color: 'var(--navy)',
                      opacity: 0.55,
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
              style={{ display: 'flex', gap: 8, marginTop: 12, maxWidth: 420 }}
            >
              <div style={{ flex: 1 }}>
                <TextInput
                  value={state.drafts[field.key] ?? ''}
                  onChange={(next) => setDraft(field.key, next)}
                  placeholder={field.chipPlaceholder ?? 'Add an item'}
                />
              </div>
              <button
                type="submit"
                style={{
                  border: '2px solid var(--navy)',
                  background: 'transparent',
                  color: 'var(--navy)',
                  borderRadius: 20,
                  padding: '0 20px',
                  fontFamily: 'var(--font-sans)',
                  fontSize: 14,
                  fontWeight: 700,
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
