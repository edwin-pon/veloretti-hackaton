import { DEFS, DOC_ORDER, substitute, type DocKey } from '../data/docs'
import { Badge } from '../ds'
import { useStore } from '../lib/store'

const CARD: React.CSSProperties = {
  background: '#fff',
  borderRadius: 20,
  padding: 24,
  boxShadow: '0 1px 2px rgba(22,21,20,0.06)',
}

export default function DashboardScreen() {
  const { state, brand, done, doneCount, allDone, go, openDoc, toggleWhy } = useStore()
  const values = state.values

  const confirmedFields = DOC_ORDER.filter((key) => done[key]).flatMap((key) =>
    DEFS[key].sections.flatMap((section) => section.fields),
  )
  const advisory = confirmedFields.filter((f) => f.conf < 70 && !state.touched[f.key])
  const averageConfidence = confirmedFields.length
    ? `${Math.round(confirmedFields.reduce((sum, f) => sum + f.conf, 0) / confirmedFields.length)}%`
    : '—'

  const attention = DOC_ORDER.filter((key) => done[key])
    .flatMap((key) =>
      DEFS[key].sections.flatMap((section) =>
        section.fields
          .filter((f) => f.conf < 70 && !state.touched[f.key])
          .map((f) => ({ field: f, source: DEFS[key].card, doc: key })),
      ),
    )
    .slice(0, 5)

  const stats = [
    {
      value: String(confirmedFields.length),
      label: 'Rules active across campaigns',
      tag: confirmedFields.length
        ? `${advisory.length} advisory`
        : 'Confirm a source to activate rules',
    },
    {
      value: `${doneCount} of ${DOC_ORDER.length}`,
      label: 'Sources confirmed',
      tag: allDone
        ? 'Brand · Legal · Style'
        : `${DOC_ORDER.filter((k) => !done[k]).map((k) => DEFS[k].card).join(' · ')} outstanding`,
    },
    {
      value: averageConfidence,
      label: 'Average extraction confidence',
      tag: confirmedFields.length
        ? `${Object.keys(state.touched).length} fields edited by you`
        : 'Nothing extracted yet',
    },
  ]

  const asList = (key: string) => (Array.isArray(values[key]) ? (values[key] as string[]) : [])

  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 24,
          flexWrap: 'wrap',
          marginBottom: 32,
        }}
      >
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              fontSize: 11,
              letterSpacing: '1.2px',
              fontWeight: 700,
              color: 'var(--slate)',
              marginBottom: 8,
            }}
          >
            {brand.name.toUpperCase()}
          </div>
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
            Brand dashboard
          </h1>
          <p
            style={{
              fontSize: 16,
              lineHeight: 1.7,
              color: 'var(--ink-secondary)',
              margin: 0,
              maxWidth: '68ch',
            }}
          >
            {allDone
              ? 'All three sources confirmed. Every campaign draft is checked against these rules before it can be scheduled.'
              : `${doneCount} of ${DOC_ORDER.length} sources confirmed. Campaigns run with partial rules until onboarding is finished.`}
          </p>
        </div>
        <button
          type="button"
          onClick={() => go('hub')}
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
            flex: 'none',
          }}
        >
          {allDone ? 'Review sources' : 'Continue onboarding'}
        </button>
      </div>

      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 32 }}>
        {stats.map((stat) => (
          <div key={stat.label} style={{ ...CARD, padding: '20px 24px', minWidth: 240, flex: 1 }}>
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
            <div style={{ fontSize: 12, color: 'var(--slate)', marginTop: 10, opacity: 0.85 }}>
              {stat.tag}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
          gap: 24,
          marginBottom: 32,
        }}
      >
        <div style={CARD}>
          <SectionTitle>Identity</SectionTitle>
          {done.brand ? (
            <>
              {[
                { label: 'Positioning', key: 'b2' },
                { label: 'Mission', key: 'b3' },
                { label: 'Reading level', key: 'b8' },
              ].map((row) => (
                <div key={row.key} style={{ marginBottom: 16 }}>
                  <div
                    style={{
                      fontSize: 11,
                      letterSpacing: '1px',
                      fontWeight: 700,
                      color: 'var(--slate)',
                      marginBottom: 4,
                    }}
                  >
                    {row.label.toUpperCase()}
                  </div>
                  <div style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--ink-secondary)' }}>
                    {String(values[row.key] ?? '')}
                  </div>
                </div>
              ))}
              <ChipRow label="MARKETS" items={asList('b4')} />
              <ChipRow label="TONE" items={asList('b6')} />
              <div style={{ fontSize: 12, color: 'var(--slate)', marginTop: 12 }}>
                Blocked at generation: {asList('b7').join(' · ')}
              </div>
            </>
          ) : (
            <EmptyPanel
              body="Upload the brand book to fill this in. Positioning, markets and tone are read from it and applied to every generated campaign."
              action="Upload brand book"
              onAction={() => openDoc('brand')}
            />
          )}
        </div>

        <div style={CARD}>
          <SectionTitle>Look and type</SectionTitle>
          {done.style ? (
            <>
              <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
                {[
                  { label: 'Primary', key: 'c1', fallback: '#123A2C' },
                  { label: 'Accent', key: 'c2', fallback: '#D6FF4B' },
                ].map((swatch) => (
                  <div key={swatch.key} style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        height: 72,
                        borderRadius: 12,
                        background: hexOf(String(values[swatch.key] ?? ''), swatch.fallback),
                        border: '1px solid var(--hairline)',
                        marginBottom: 8,
                      }}
                    />
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink-heading)' }}>
                      {swatch.label}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: 'var(--slate)',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {String(values[swatch.key] ?? '')}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: 6, marginBottom: 20 }}>
                {asList('c3').map((hex) => (
                  <div
                    key={hex}
                    title={hex}
                    style={{
                      flex: 1,
                      height: 28,
                      borderRadius: 8,
                      background: hex,
                      border: '1px solid var(--hairline)',
                    }}
                  />
                ))}
              </div>

              <div
                style={{
                  fontFamily: `"${familyOf(String(values.f1 ?? ''))}", Georgia, serif`,
                  fontSize: 24,
                  fontWeight: 700,
                  color: 'var(--ink-heading)',
                  lineHeight: 1.25,
                }}
              >
                Ninety kilometres on one charge
              </div>
              <div style={{ fontSize: 12, color: 'var(--slate)', margin: '4px 0 14px' }}>
                {String(values.f1 ?? '')}
              </div>
              <div
                style={{
                  fontFamily: `"${familyOf(String(values.f2 ?? ''))}", Helvetica, Arial, sans-serif`,
                  fontSize: 16,
                  color: 'var(--ink-secondary)',
                  lineHeight: 1.6,
                }}
              >
                Engineered for daily distance, sold and serviced through independent dealers.
              </div>
              <div style={{ fontSize: 12, color: 'var(--slate)', marginTop: 4 }}>
                {String(values.f2 ?? '')}
              </div>
            </>
          ) : (
            <EmptyPanel
              body="Upload the style guide to fill this in. The palette and typefaces here are what generated assets use."
              action="Upload style guide"
              onAction={() => openDoc('style')}
            />
          )}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 24 }}>
        <div style={CARD}>
          <SectionTitle>Sources</SectionTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {DOC_ORDER.map((key) => {
              const isDone = !!done[key]
              const isNext = !isDone && DOC_ORDER.find((k) => !done[k]) === key
              return (
                <div
                  key={key}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    background: 'var(--mist)',
                    borderRadius: 16,
                    padding: '14px 16px',
                  }}
                >
                  <span
                    style={{
                      width: 32,
                      height: 32,
                      flex: 'none',
                      borderRadius: 999,
                      background: DEFS[key].well,
                    }}
                  />
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink-heading)' }}>
                      {DEFS[key].card}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--slate)' }}>
                      {isDone
                        ? `${substitute(DEFS[key].file, brand)} · confirmed today`
                        : isNext
                          ? 'No document yet · next in onboarding'
                          : 'No document yet'}
                    </div>
                  </div>
                  <Badge tone={isDone ? 'mint' : isNext ? 'sky' : 'neutral'}>
                    {isDone ? 'Confirmed' : isNext ? 'Next up' : 'Not started'}
                  </Badge>
                  <button
                    type="button"
                    onClick={() => openDoc(key as DocKey)}
                    style={linkButton}
                  >
                    {isDone ? 'Open' : 'Upload'}
                  </button>
                </div>
              )
            })}
          </div>
        </div>

        <div style={CARD}>
          <SectionTitle>Needs your attention</SectionTitle>
          {attention.length === 0 ? (
            <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--ink-secondary)', margin: 0 }}>
              {allDone
                ? 'Nothing flagged. Every extracted rule is either high confidence or confirmed by you.'
                : doneCount === 0
                  ? 'Nothing to review yet. Confirm a source and the agent will flag what it was unsure about.'
                  : 'Nothing flagged in the sources you have confirmed so far.'}
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {attention.map((item) => (
                <div
                  key={item.field.key}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    background: 'var(--mist)',
                    borderRadius: 16,
                    padding: '14px 16px',
                  }}
                >
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink-heading)' }}>
                      {item.field.label}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--slate)' }}>
                      {item.source} · {item.field.conf}% confidence
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      go('review', { doc: item.doc })
                      if (state.why !== item.field.key) toggleWhy(item.field.key)
                    }}
                    style={linkButton}
                  >
                    Review
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const linkButton: React.CSSProperties = {
  border: 'none',
  background: 'none',
  padding: 0,
  font: 'inherit',
  fontSize: 13,
  fontWeight: 700,
  color: 'var(--navy)',
  cursor: 'pointer',
  textDecoration: 'underline',
  flex: 'none',
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontFamily: 'var(--font-display)',
        fontSize: 22,
        fontWeight: 700,
        color: 'var(--ink-heading)',
        margin: '0 0 16px',
      }}
    >
      {children}
    </h2>
  )
}

function ChipRow({ label, items }: { label: string; items: string[] }) {
  if (items.length === 0) return null
  return (
    <div style={{ marginBottom: 12 }}>
      <div
        style={{
          fontSize: 11,
          letterSpacing: '1px',
          fontWeight: 700,
          color: 'var(--slate)',
          marginBottom: 6,
        }}
      >
        {label}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {items.map((item, index) => (
          <span
            key={item}
            style={{
              background: index % 2 ? 'var(--mist)' : 'var(--sky)',
              borderRadius: 20,
              padding: '6px 12px',
              fontSize: 13,
              fontWeight: 700,
              color: 'var(--navy)',
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

function EmptyPanel({
  body,
  action,
  onAction,
}: {
  body: string
  action: string
  onAction: () => void
}) {
  return (
    <div>
      <p
        style={{
          fontSize: 15,
          lineHeight: 1.7,
          color: 'var(--ink-secondary)',
          margin: '0 0 20px',
          textWrap: 'pretty',
        }}
      >
        {body}
      </p>
      <button
        type="button"
        onClick={onAction}
        style={{
          border: 'none',
          background: 'var(--cta)',
          color: 'var(--cta-ink)',
          borderRadius: 20,
          padding: '12px 24px',
          fontFamily: 'var(--font-sans)',
          fontSize: 15,
          fontWeight: 700,
          letterSpacing: '0.5px',
          cursor: 'pointer',
        }}
      >
        {action}
      </button>
    </div>
  )
}

function hexOf(value: string, fallback: string): string {
  return value.match(/#[0-9a-fA-F]{3,6}/)?.[0] ?? fallback
}

function familyOf(value: string): string {
  return value.split('—')[0].split(',')[0].trim()
}
