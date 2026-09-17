import { DEFS, DOC_ORDER, type DocKey } from '../data/docs'
import { Badge, Button, Label } from '../ds'
import { useStore } from '../lib/store'

export default function DashboardScreen() {
  const { state, doneCount, allDone, go, openDoc, toggleWhy } = useStore()
  const { values, done } = state

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

  const asList = (key: string) => (Array.isArray(values[key]) ? (values[key] as string[]) : [])

  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: 32,
          flexWrap: 'wrap',
          marginBottom: 56,
        }}
      >
        <div style={{ minWidth: 0 }}>
          <Label>Brand knowledge</Label>
          <h1 style={{ fontSize: 'var(--fs-display-m)', margin: '18px 0 16px', maxWidth: '20ch' }}>
            {allDone ? 'Everything the studio knows about you.' : 'What the studio knows so far.'}
          </h1>
          <p
            style={{
              fontSize: 'var(--fs-body-l)',
              lineHeight: 'var(--lh-body)',
              color: 'var(--text-secondary)',
              margin: 0,
              maxWidth: '60ch',
            }}
          >
            {allDone
              ? 'All three sources confirmed. Every campaign draft is checked against these rules before it can be scheduled.'
              : `${doneCount} of ${DOC_ORDER.length} sources confirmed. Campaigns run with partial rules until onboarding is finished.`}
          </p>
        </div>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center', flex: 'none' }}>
          <Button variant="secondary" onClick={() => go('hub')}>
            {allDone ? 'Review sources' : 'Continue onboarding'}
          </Button>
          <Button onClick={() => go('campaign-start')}>New campaign</Button>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 32,
          padding: '28px 0',
          borderTop: '1px solid var(--border-default)',
          borderBottom: '1px solid var(--border-default)',
          marginBottom: 72,
        }}
      >
        {[
          {
            value: String(confirmedFields.length),
            label: 'Rules active',
            tag: confirmedFields.length ? `${advisory.length} advisory` : 'Confirm a source first',
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
            label: 'Average confidence',
            tag: confirmedFields.length
              ? `${Object.keys(state.touched).length} fields edited by you`
              : 'Nothing extracted yet',
          },
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
            <div style={{ margin: '12px 0 8px' }}>
              <Label>{stat.label}</Label>
            </div>
            <div style={{ fontSize: 'var(--fs-caption)', color: 'var(--text-muted)' }}>
              {stat.tag}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
          gap: 56,
          marginBottom: 72,
        }}
      >
        <section>
          <Heading>Identity</Heading>
          {done.brand ? (
            <>
              {[
                { label: 'Positioning', key: 'b2' },
                { label: 'Mission', key: 'b3' },
                { label: 'Reading level', key: 'b8' },
              ].map((row) => (
                <div
                  key={row.key}
                  style={{ padding: '18px 0', borderTop: '1px solid var(--border-subtle)' }}
                >
                  <Label>{row.label}</Label>
                  <div
                    style={{
                      fontSize: 'var(--fs-body)',
                      lineHeight: 'var(--lh-body)',
                      color: 'var(--text-secondary)',
                      marginTop: 8,
                    }}
                  >
                    {String(values[row.key] ?? '')}
                  </div>
                </div>
              ))}
              <ChipRow label="Markets" items={asList('b4')} />
              <ChipRow label="Tone" items={asList('b6')} />
              <div
                style={{
                  padding: '18px 0',
                  borderTop: '1px solid var(--border-subtle)',
                  fontSize: 'var(--fs-caption)',
                  color: 'var(--text-muted)',
                }}
              >
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
        </section>

        <section>
          <Heading>Look and type</Heading>
          {done.style ? (
            <>
              <div style={{ display: 'flex', gap: 16, padding: '24px 0' }}>
                {[
                  { label: 'Primary', key: 'c1', fallback: '#123A2C' },
                  { label: 'Accent', key: 'c2', fallback: '#D6FF4B' },
                ].map((swatch) => (
                  <div key={swatch.key} style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        height: 96,
                        borderRadius: 'var(--radius-md)',
                        background: hexOf(String(values[swatch.key] ?? ''), swatch.fallback),
                        border: '1px solid var(--border-subtle)',
                        marginBottom: 12,
                      }}
                    />
                    <Label>{swatch.label}</Label>
                    <div
                      style={{
                        fontSize: 'var(--fs-caption)',
                        color: 'var(--text-muted)',
                        marginTop: 6,
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

              <div style={{ display: 'flex', gap: 4, marginBottom: 28 }}>
                {asList('c3').map((hex) => (
                  <div
                    key={hex}
                    title={hex}
                    style={{
                      flex: 1,
                      height: 24,
                      borderRadius: 'var(--radius-sm)',
                      background: hex,
                      border: '1px solid var(--border-subtle)',
                    }}
                  />
                ))}
              </div>

              <div style={{ padding: '18px 0', borderTop: '1px solid var(--border-subtle)' }}>
                <div
                  style={{
                    fontFamily: `"${familyOf(String(values.f1 ?? ''))}", Georgia, serif`,
                    fontSize: 26,
                    fontWeight: 700,
                    lineHeight: 1.25,
                  }}
                >
                  Ride into the city
                </div>
                <div
                  style={{ fontSize: 'var(--fs-caption)', color: 'var(--text-muted)', marginTop: 8 }}
                >
                  {String(values.f1 ?? '')}
                </div>
              </div>
              <div style={{ padding: '18px 0', borderTop: '1px solid var(--border-subtle)' }}>
                <div
                  style={{
                    fontFamily: `"${familyOf(String(values.f2 ?? ''))}", Helvetica, Arial, sans-serif`,
                    fontSize: 17,
                    lineHeight: 'var(--lh-body)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  An electric bike designed in Amsterdam, built to make your daily rides a pleasure.
                </div>
                <div
                  style={{ fontSize: 'var(--fs-caption)', color: 'var(--text-muted)', marginTop: 8 }}
                >
                  {String(values.f2 ?? '')}
                </div>
              </div>
            </>
          ) : (
            <EmptyPanel
              body="Upload the style guide to fill this in. The palette and typefaces here are what generated assets use."
              action="Upload style guide"
              onAction={() => openDoc('style')}
            />
          )}
        </section>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: 56 }}>
        <section>
          <Heading>Sources</Heading>
          {DOC_ORDER.map((key) => {
            const isDone = !!done[key]
            const isNext = !isDone && DOC_ORDER.find((k) => !done[k]) === key
            return (
              <div
                key={key}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  padding: '18px 0',
                  borderTop: '1px solid var(--border-subtle)',
                }}
              >
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ fontSize: 'var(--fs-body)' }}>{DEFS[key].card}</div>
                  <div
                    style={{
                      fontSize: 'var(--fs-caption)',
                      color: 'var(--text-muted)',
                      marginTop: 4,
                    }}
                  >
                    {isDone
                      ? `${DEFS[key].file} · confirmed today`
                      : isNext
                        ? 'No document yet · next in onboarding'
                        : 'No document yet'}
                  </div>
                </div>
                <Badge variant={isDone ? 'ink' : isNext ? 'outline' : 'neutral'}>
                  {isDone ? 'Confirmed' : isNext ? 'Next' : 'Not started'}
                </Badge>
                <button
                  type="button"
                  className="vr-underline"
                  onClick={() => openDoc(key as DocKey)}
                  style={{ fontSize: 'var(--fs-caption)', flex: 'none' }}
                >
                  {isDone ? 'Open' : 'Upload'}
                </button>
              </div>
            )
          })}
        </section>

        <section>
          <Heading>Needs your attention</Heading>
          {attention.length === 0 ? (
            <p
              style={{
                fontSize: 'var(--fs-body)',
                lineHeight: 'var(--lh-body)',
                color: 'var(--text-secondary)',
                margin: '18px 0 0',
                maxWidth: '52ch',
              }}
            >
              {allDone
                ? 'Nothing flagged. Every extracted rule is either high confidence or confirmed by you.'
                : doneCount === 0
                  ? 'Nothing to review yet. Confirm a source and the agent will flag what it was unsure about.'
                  : 'Nothing flagged in the sources you have confirmed so far.'}
            </p>
          ) : (
            attention.map((item) => (
              <div
                key={item.field.key}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  padding: '18px 0',
                  borderTop: '1px solid var(--border-subtle)',
                }}
              >
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ fontSize: 'var(--fs-body)' }}>{item.field.label}</div>
                  <div
                    style={{
                      fontSize: 'var(--fs-caption)',
                      color: 'var(--text-muted)',
                      marginTop: 4,
                    }}
                  >
                    {item.source} · {item.field.conf}% confidence
                  </div>
                </div>
                <button
                  type="button"
                  className="vr-underline"
                  onClick={() => {
                    go('review', { doc: item.doc })
                    if (state.why !== item.field.key) toggleWhy(item.field.key)
                  }}
                  style={{ fontSize: 'var(--fs-caption)', flex: 'none' }}
                >
                  Review
                </button>
              </div>
            ))
          )}
        </section>
      </div>
    </div>
  )
}

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontSize: 'var(--fs-h2)',
        paddingBottom: 16,
        borderBottom: '1px solid var(--border-default)',
      }}
    >
      {children}
    </h2>
  )
}

function ChipRow({ label, items }: { label: string; items: string[] }) {
  if (items.length === 0) return null
  return (
    <div style={{ padding: '18px 0', borderTop: '1px solid var(--border-subtle)' }}>
      <Label>{label}</Label>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
        {items.map((item) => (
          <span
            key={item}
            style={{
              height: 32,
              padding: '0 14px',
              display: 'inline-flex',
              alignItems: 'center',
              borderRadius: 'var(--radius-pill)',
              border: '1px solid var(--border-default)',
              fontSize: 'var(--fs-body-s)',
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
    <div style={{ paddingTop: 24 }}>
      <p
        style={{
          fontSize: 'var(--fs-body)',
          lineHeight: 'var(--lh-body)',
          color: 'var(--text-secondary)',
          margin: '0 0 24px',
          maxWidth: '52ch',
          textWrap: 'pretty',
        }}
      >
        {body}
      </p>
      <Button onClick={onAction}>{action}</Button>
    </div>
  )
}

function hexOf(value: string, fallback: string): string {
  return value.match(/#[0-9a-fA-F]{3,6}/)?.[0] ?? fallback
}

function familyOf(value: string): string {
  return value.split('—')[0].split(',')[0].trim()
}
