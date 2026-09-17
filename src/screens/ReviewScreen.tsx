import { DEFS, substitute, type DocField, type DocSection } from '../data/docs'
import { AlertBanner } from '../ds'
import FieldCard from '../components/FieldCard'
import { useReviewStats, useStore } from '../lib/store'

export default function ReviewScreen() {
  const { state, brand, go, startAnalysis, approve } = useStore()
  const def = DEFS[state.doc]
  const stats = useReviewStats(state.doc)
  const isStyle = state.doc === 'style'

  const approveLabel =
    stats.needReview > 0 ? `Approve with ${stats.needReview} flagged` : 'Approve and continue'

  // The style guide gets a visual treatment: colours as swatches, fonts as
  // specimens. Its remaining prose fields fall through to the generic renderer.
  const sections: DocSection[] = isStyle
    ? [
        def.sections[0],
        {
          title: 'Rules',
          meta: 'applied at generation time',
          fields: [def.sections[1].fields[3], def.sections[2].fields[2]],
        },
      ]
    : def.sections

  return (
    <div>
      <button
        type="button"
        onClick={() => go('hub')}
        style={{
          border: 'none',
          background: 'none',
          padding: 0,
          font: 'inherit',
          fontSize: 14,
          fontWeight: 700,
          color: 'var(--slate)',
          cursor: 'pointer',
          marginBottom: 20,
        }}
      >
        ← Back to onboarding
      </button>

      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 24,
          flexWrap: 'wrap',
          marginBottom: 24,
        }}
      >
        <div style={{ minWidth: 0 }}>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 36,
              fontWeight: 700,
              color: 'var(--ink-heading)',
              margin: '0 0 8px',
              lineHeight: 1.2,
            }}
          >
            {def.title}
          </h1>
          <div style={{ fontSize: 14, color: 'var(--slate)' }}>
            {state.upload?.name ?? substitute(def.file, brand)} · analysed just now ·{' '}
            {stats.total} fields extracted
          </div>
        </div>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', flex: 'none' }}>
          <button
            type="button"
            onClick={startAnalysis}
            style={{
              border: '2px solid var(--navy)',
              background: 'transparent',
              color: 'var(--navy)',
              borderRadius: 20,
              padding: '12px 24px',
              fontFamily: 'var(--font-sans)',
              fontSize: 15,
              fontWeight: 700,
              letterSpacing: '0.5px',
              cursor: 'pointer',
            }}
          >
            Re-run analysis
          </button>
          <ApproveButton label={approveLabel} onClick={approve} />
        </div>
      </div>

      <div style={{ marginBottom: 32 }}>
        <AlertBanner variant="info" title={def.summaryTitle}>
          {substitute(def.summary, brand)}
        </AlertBanner>
      </div>

      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 32 }}>
        {[
          { value: stats.total, label: 'Fields extracted' },
          { value: stats.needReview, label: 'Need your review' },
          { value: `${stats.average}%`, label: 'Average confidence' },
        ].map((stat) => (
          <div
            key={stat.label}
            style={{
              background: '#fff',
              borderRadius: 20,
              padding: '20px 24px',
              boxShadow: '0 1px 2px rgba(22,21,20,0.06)',
              minWidth: 180,
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 32,
                fontWeight: 700,
                color: 'var(--ink-heading)',
                lineHeight: 1.1,
                letterSpacing: '-0.5px',
              }}
            >
              {stat.value}
            </div>
            <div style={{ fontSize: 13, color: 'var(--slate)', marginTop: 6 }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {isStyle && <StyleVisuals />}

      {sections.map((section) => (
        <div key={section.title} style={{ marginBottom: 40 }}>
          <SectionHeading title={section.title} meta={section.meta} />
          <div style={{ display: 'grid', gap: 16 }}>
            {section.fields.map((field) => (
              <FieldCard key={field.key} field={field} />
            ))}
          </div>
        </div>
      ))}

      <div
        style={{
          background: '#fff',
          borderRadius: 20,
          padding: 24,
          boxShadow: '0 1px 2px rgba(22,21,20,0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 24,
          flexWrap: 'wrap',
        }}
      >
        <div style={{ fontSize: 15, color: 'var(--ink-secondary)', lineHeight: 1.6 }}>
          {stats.needReview > 0
            ? 'You can approve now and revisit flagged fields later. Flagged rules stay advisory until confirmed.'
            : 'Every field is confirmed. These rules apply to every campaign generated for this brand.'}
        </div>
        <ApproveButton label={approveLabel} onClick={approve} />
      </div>
    </div>
  )
}

function ApproveButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        border: 'none',
        background: 'var(--cta)',
        color: 'var(--cta-ink)',
        borderRadius: 20,
        padding: '14px 28px',
        fontFamily: 'var(--font-sans)',
        fontSize: 15,
        fontWeight: 700,
        letterSpacing: '0.5px',
        cursor: 'pointer',
        flex: 'none',
      }}
    >
      {label}
    </button>
  )
}

function SectionHeading({ title, meta }: { title: string; meta: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 16 }}>
      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 22,
          fontWeight: 700,
          color: 'var(--ink-heading)',
          margin: 0,
        }}
      >
        {title}
      </h2>
      <span style={{ fontSize: 12, color: 'var(--slate)' }}>{meta}</span>
    </div>
  )
}

/** Colour swatches, font specimens and the type-scale table for the style guide. */
function StyleVisuals() {
  const { state } = useStore()
  const colors = DEFS.style.sections[1]
  const fonts = DEFS.style.sections[2]

  const valueOf = (field: DocField) => String(state.values[field.key] ?? field.value)
  const headingFamily = `"${familyOf(valueOf(fonts.fields[0]))}", Georgia, serif`
  const bodyFamily = `"${familyOf(valueOf(fonts.fields[1]))}", Helvetica, Arial, sans-serif`

  return (
    <>
      <SectionHeading title="Colors" meta={colors.meta} />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 24,
          marginBottom: 16,
        }}
      >
        {[colors.fields[0], colors.fields[1]].map((field) => (
          <FieldCard
            key={field.key}
            field={field}
            preview={
              <div
                style={{
                  height: 132,
                  borderRadius: 12,
                  background: hexOf(valueOf(field)),
                  border: '1px solid var(--hairline)',
                  marginBottom: 16,
                }}
              />
            }
          />
        ))}
      </div>
      <div style={{ marginBottom: 40 }}>
        <FieldCard field={colors.fields[2]} />
      </div>

      <SectionHeading title="Fonts" meta={fonts.meta} />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 24,
          marginBottom: 16,
        }}
      >
        {[
          {
            field: fonts.fields[0],
            family: headingFamily,
            size: 30,
            weight: 700,
            sample: 'Ninety kilometres on one charge',
          },
          {
            field: fonts.fields[1],
            family: bodyFamily,
            size: 18,
            weight: 400,
            sample: 'Engineered for daily distance, sold and serviced through independent dealers.',
          },
        ].map((spec) => (
          <FieldCard
            key={spec.field.key}
            field={spec.field}
            preview={
              <div
                style={{
                  background: 'var(--mist)',
                  borderRadius: 12,
                  padding: '20px 24px',
                  marginBottom: 16,
                }}
              >
                <div
                  style={{
                    fontFamily: spec.family,
                    fontSize: spec.size,
                    fontWeight: spec.weight,
                    color: 'var(--ink-heading)',
                    lineHeight: 1.25,
                  }}
                >
                  {spec.sample}
                </div>
                <div style={{ fontSize: 12, color: 'var(--slate)', marginTop: 10 }}>
                  {`${spec.field.label} specimen · ${familyOf(valueOf(spec.field))} — preview uses a fallback, font file not uploaded`}
                </div>
              </div>
            }
          />
        ))}
      </div>

      <div style={{ marginBottom: 40 }}>
        <FieldCard
          field={fonts.fields[3]}
          control={
            <div>
              <div style={{ display: 'grid', gap: 2 }}>
                {scaleRows(valueOf(fonts.fields[3]), headingFamily, bodyFamily).map((row) => (
                  <div
                    key={row.name}
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: 16,
                      padding: '10px 0',
                      borderTop: '1px solid var(--hairline)',
                    }}
                  >
                    <span
                      style={{
                        width: 64,
                        flex: 'none',
                        fontSize: 11,
                        letterSpacing: '1px',
                        fontWeight: 700,
                        color: 'var(--slate)',
                      }}
                    >
                      {row.name}
                    </span>
                    <span style={{ width: 56, flex: 'none', fontSize: 12, color: 'var(--slate)' }}>
                      {row.px}
                    </span>
                    <span
                      style={{
                        minWidth: 0,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        fontFamily: row.family,
                        fontSize: row.size,
                        fontWeight: row.weight,
                        color: 'var(--ink-heading)',
                        lineHeight: 1.2,
                      }}
                    >
                      {row.sample}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          }
        />
      </div>
    </>
  )
}

function hexOf(value: string): string {
  return value.match(/#[0-9a-fA-F]{3,8}/)?.[0] ?? '#F3F3F3'
}

function familyOf(value: string): string {
  return value.split('—')[0].split(',')[0].trim()
}

function scaleRows(value: string, headingFamily: string, bodyFamily: string) {
  return value.split('/').map((part) => {
    const tokens = part.trim().split(/\s+/)
    const px = Number.parseInt(tokens[tokens.length - 1], 10) || 16
    const name = tokens.slice(0, -1).join(' ') || '—'
    const isHeading = /^h[1-6]$/i.test(name)
    return {
      name: name.toUpperCase(),
      px: `${px} px`,
      size: Math.min(px, 40),
      family: isHeading ? headingFamily : bodyFamily,
      weight: isHeading ? 700 : 400,
      sample: isHeading
        ? 'Ninety kilometres on one charge'
        : 'Engineered for daily distance, serviced by your dealer.',
    }
  })
}
