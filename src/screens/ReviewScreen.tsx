import { DEFS, substitute, type DocField, type DocSection } from '../data/docs'
import { Button, Label, Notice } from '../ds'
import BackLink from '../components/BackLink'
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
      <BackLink onClick={() => go('hub')}>Back to onboarding</BackLink>

      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: 32,
          flexWrap: 'wrap',
          marginBottom: 40,
        }}
      >
        <div style={{ minWidth: 0 }}>
          <Label>Review</Label>
          <h1 style={{ fontSize: 'var(--fs-display-m)', margin: '18px 0 12px' }}>{def.title}</h1>
          <div style={{ fontSize: 'var(--fs-body-s)', color: 'var(--text-muted)' }}>
            {state.upload?.name ?? substitute(def.file, brand)} · analysed just now · {stats.total} fields extracted
          </div>
        </div>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center', flex: 'none' }}>
          <Button variant="secondary" onClick={startAnalysis}>
            Re-run analysis
          </Button>
          <Button onClick={approve}>{approveLabel}</Button>
        </div>
      </div>

      <div style={{ marginBottom: 48 }}>
        <Notice title={def.summaryTitle}>{substitute(def.summary, brand)}</Notice>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))',
          gap: 32,
          padding: '28px 0',
          borderTop: '1px solid var(--border-default)',
          borderBottom: '1px solid var(--border-default)',
          marginBottom: 64,
        }}
      >
        {[
          { value: stats.total, label: 'Fields extracted' },
          { value: stats.needReview, label: 'Need your review' },
          { value: `${stats.average}%`, label: 'Average confidence' },
        ].map((stat) => (
          <div key={stat.label}>
            <div
              style={{
                fontSize: 'var(--fs-display-m)',
                fontWeight: 500,
                letterSpacing: 'var(--tracking-display)',
                lineHeight: 'var(--lh-tight)',
              }}
            >
              {stat.value}
            </div>
            <div style={{ marginTop: 12 }}>
              <Label>{stat.label}</Label>
            </div>
          </div>
        ))}
      </div>

      {isStyle && <StyleVisuals />}

      {sections.map((section) => (
        <section key={section.title} style={{ marginBottom: 64 }}>
          <SectionHeading title={section.title} meta={section.meta} />
          <div style={{ display: 'grid', gap: 16 }}>
            {section.fields.map((field) => (
              <FieldCard key={field.key} field={field} />
            ))}
          </div>
        </section>
      ))}

      <div
        style={{
          borderTop: '1px solid var(--border-default)',
          paddingTop: 32,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 32,
          flexWrap: 'wrap',
        }}
      >
        <div
          style={{
            fontSize: 'var(--fs-body)',
            color: 'var(--text-secondary)',
            lineHeight: 'var(--lh-body)',
            maxWidth: '58ch',
          }}
        >
          {stats.needReview > 0
            ? 'You can approve now and revisit flagged fields later. Flagged rules stay advisory until confirmed.'
            : 'Every field is confirmed. These rules apply to every campaign the studio generates.'}
        </div>
        <Button onClick={approve}>{approveLabel}</Button>
      </div>
    </div>
  )
}

function SectionHeading({ title, meta }: { title: string; meta: string }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        gap: 20,
        paddingBottom: 16,
        marginBottom: 24,
        borderBottom: '1px solid var(--border-default)',
      }}
    >
      <h2 style={{ fontSize: 'var(--fs-h2)' }}>{title}</h2>
      <Label>{meta}</Label>
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
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
          gap: 16,
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
                  height: 160,
                  borderRadius: 'var(--radius-md)',
                  background: hexOf(valueOf(field)),
                  border: '1px solid var(--border-subtle)',
                  marginBottom: 24,
                }}
              />
            }
          />
        ))}
      </div>
      <div style={{ marginBottom: 64 }}>
        <FieldCard field={colors.fields[2]} />
      </div>

      <SectionHeading title="Fonts" meta={fonts.meta} />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
          gap: 16,
          marginBottom: 16,
        }}
      >
        {[
          {
            field: fonts.fields[0],
            family: headingFamily,
            size: 30,
            weight: 700,
            sample: 'Ride into the city',
          },
          {
            field: fonts.fields[1],
            family: bodyFamily,
            size: 18,
            weight: 400,
            sample: 'An electric bike designed in Amsterdam, built to make your daily rides a pleasure.',
          },
        ].map((spec) => (
          <FieldCard
            key={spec.field.key}
            field={spec.field}
            preview={
              <div
                style={{
                  background: 'var(--vr-surface-2)',
                  borderRadius: 'var(--radius-md)',
                  padding: '28px 28px 20px',
                  marginBottom: 24,
                  minHeight: 190,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div
                  style={{
                    fontFamily: spec.family,
                    fontSize: spec.size,
                    fontWeight: spec.weight,
                    lineHeight: 1.25,
                  }}
                >
                  {spec.sample}
                </div>
                <div
                  style={{
                    fontSize: 'var(--fs-caption)',
                    color: 'var(--text-muted)',
                    marginTop: 14,
                  }}
                >
                  {familyOf(valueOf(spec.field))} · preview uses a fallback, font file not uploaded
                </div>
              </div>
            }
          />
        ))}
      </div>

      <div style={{ marginBottom: 64 }}>
        <FieldCard
          field={fonts.fields[3]}
          control={
            <div>
              {scaleRows(valueOf(fonts.fields[3]), headingFamily, bodyFamily).map((row) => (
                <div
                  key={row.name}
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: 20,
                    padding: '14px 0',
                    borderTop: '1px solid var(--border-subtle)',
                  }}
                >
                  <Label style={{ width: 56, flex: 'none' }}>{row.name}</Label>
                  <span
                    style={{
                      width: 56,
                      flex: 'none',
                      fontSize: 'var(--fs-caption)',
                      color: 'var(--text-muted)',
                    }}
                  >
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
                      lineHeight: 1.2,
                    }}
                  >
                    {row.sample}
                  </span>
                </div>
              ))}
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

/** One line per scale step, so the preview reads as a scale rather than a repeat. */
const SCALE_SAMPLES: Record<string, string> = {
  H1: 'Ride into the city',
  H2: 'Designed in Amsterdam',
  H3: 'Built for the way you ride',
  BODY: 'An electric bike built to make your daily rides a pleasure.',
  CAPTION: 'Handmade in Europe · Two year warranty',
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
      sample: SCALE_SAMPLES[name.toUpperCase()] ?? 'Timeless, quiet, and made for the way you actually ride.',
    }
  })
}
