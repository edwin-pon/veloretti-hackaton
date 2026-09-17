// A standalone preview of campaign intake, served at /intake.html.
//
// It deliberately imports no design system and no app state: the studio's UI is
// being rebuilt on the Veloretti kit, and this page exists to show what the
// model does, not what the screens will look like. Everything here is the real
// pipeline. Change the offer mode or prune a row and the matrix, the briefs and
// the gates all re-resolve from src/lib/matrix.ts.

import { useMemo, useState } from 'react'
import { BRIEFING, buildCampaign, seedBriefValues, type BriefField, type BriefValue } from '../data/briefing'
import { MARKET_LABEL, PLATFORMS } from '../data/vocab'
import type { GateResult } from '../lib/campaign'
import { briefText, resolveSlots, runGates, summarise } from '../lib/matrix'

const INK = '#2a2926'
const LINE = '#d9d7d4'
const SURFACE = '#f5f5f4'
const FLAG = '#b4481f'

const font =
  '"PP Neue Montreal", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif'

export default function IntakePreview() {
  const [values, setValues] = useState<Record<string, BriefValue>>(seedBriefValues)
  const [excluded, setExcluded] = useState<Set<string>>(new Set())
  const [why, setWhy] = useState<string | null>(null)
  const [sampleCount, setSampleCount] = useState(6)

  const campaign = useMemo(
    () =>
      buildCampaign(values, {
        markets: BRIEFING.markets,
        channelPlan: BRIEFING.channelPlan.filter((entry) => !excluded.has(entry.id)),
        propositions: BRIEFING.propositions,
      }),
    [values, excluded],
  )

  const matrix = useMemo(() => resolveSlots(campaign), [campaign])
  const summary = useMemo(() => summarise(matrix.slots), [matrix])
  const gates = useMemo(() => runGates(campaign, matrix), [campaign, matrix])

  const set = (key: string, value: BriefValue) => setValues((v) => ({ ...v, [key]: value }))
  const toggleEntry = (id: string) =>
    setExcluded((current) => {
      const next = new Set(current)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  return (
    <div style={{ font: `16px/1.6 ${font}`, color: INK, background: '#fff', minHeight: '100vh' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 32px 96px' }}>
        <Eyebrow>Campaign intake preview</Eyebrow>
        <h1 style={{ fontSize: 40, lineHeight: 1.1, margin: '8px 0 16px', fontWeight: 500 }}>
          {String(values.cp1)} {String(values.cp3)}
        </h1>
        <p style={{ fontSize: 18, maxWidth: '68ch', margin: '0 0 8px', color: '#57534e' }}>
          {BRIEFING.summary}
        </p>
        <p style={{ fontSize: 14, color: '#78716c', margin: 0 }}>
          {BRIEFING.file} · {BRIEFING.size}
        </p>

        <Panel title="Live controls" note="Every number below re-resolves as you change these">
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', alignItems: 'flex-end' }}>
            <label style={{ display: 'block' }}>
              <Eyebrow>Offer mode</Eyebrow>
              <select
                value={String(values.of1)}
                onChange={(e) => set('of1', e.target.value)}
                style={inputStyle}
              >
                <option>Discount</option>
                <option>Aspiration</option>
              </select>
            </label>
            <label style={{ display: 'block' }}>
              <Eyebrow>Discount percentage</Eyebrow>
              <input
                type="number"
                value={Number(values.of2)}
                onChange={(e) => set('of2', Number(e.target.value))}
                style={{ ...inputStyle, width: 120 }}
              />
            </label>
            <p style={{ margin: 0, fontSize: 14, color: '#78716c', maxWidth: '44ch' }}>
              Switch to aspiration and every sale sticker leaves the matrix. Set the
              percentage to 10 and the consistency gate goes green, because the ad
              slots carry -10%.
            </p>
          </div>
        </Panel>

        <Panel title="Resolved matrix" note={`${summary.total} slots · ${summary.distinctBriefs} distinct briefs`}>
          <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap' }}>
            <Counts title="Market" rows={summary.byMarket.map((m) => [m.label, m.count])} />
            <Counts title="Phase" rows={summary.byPhase.map((p) => [p.key, p.count])} />
            <Counts title="Platform" rows={summary.byPlatform.map((p) => [p.label, p.count])} />
            <Counts title="Track" rows={summary.byTrack.map((t) => [t.key, t.count])} />
          </div>
          {matrix.dropped.length > 0 && (
            <p style={{ fontSize: 14, color: FLAG, marginTop: 20 }}>
              {matrix.dropped.length} combinations dropped:{' '}
              {[...new Set(matrix.dropped.map((d) => d.reason))].join('; ')}
            </p>
          )}
        </Panel>

        <Panel title="QA gates" note="Run on the resolved matrix alone">
          <div style={{ display: 'grid', gap: 2 }}>
            {gates.map((gate) => (
              <Gate key={gate.id} gate={gate} />
            ))}
          </div>
        </Panel>

        <Panel title="Extracted brief" note={`${BRIEFING.sections.length} sections · ${countFlags(values)} need review`}>
          {BRIEFING.sections.map((section) => (
            <div key={section.key} style={{ marginBottom: 32 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 12 }}>
                <h3 style={{ fontSize: 20, fontWeight: 500, margin: 0 }}>{section.title}</h3>
                <span style={{ fontSize: 13, color: '#78716c' }}>{section.meta}</span>
              </div>
              <div style={{ display: 'grid', gap: 12 }}>
                {section.fields.map((field) => (
                  <Field
                    key={field.key}
                    field={field}
                    value={values[field.key]}
                    open={why === field.key}
                    onToggle={() => setWhy(why === field.key ? null : field.key)}
                  />
                ))}
              </div>
            </div>
          ))}
        </Panel>

        <Panel title="Markets and flighting" note="One window, a Dutch stagger inside it">
          <table style={tableStyle}>
            <thead>
              <tr>
                <Th>Market</Th>
                <Th>Language</Th>
                <Th>Regions and in-market dates</Th>
                <Th>Slots</Th>
              </tr>
            </thead>
            <tbody>
              {campaign.markets.map((market) => (
                <tr key={market.key}>
                  <Td>{MARKET_LABEL[market.key]}</Td>
                  <Td>{market.language}</Td>
                  <Td>
                    {market.regions.length
                      ? market.regions.map((r) => `${r.name} ${r.inMarketDate}`).join(' · ')
                      : `window only, from ${campaign.meta.window.start}`}
                  </Td>
                  <Td>{matrix.slots.filter((s) => s.market === market.key).length}</Td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>

        <Panel title="Channel plan" note="Untick a row to prune it out of the matrix">
          <table style={tableStyle}>
            <thead>
              <tr>
                <Th>In</Th>
                <Th>Track</Th>
                <Th>Phase</Th>
                <Th>Platform</Th>
                <Th>Ratios</Th>
                <Th>Markets</Th>
                <Th>Focus</Th>
                <Th>Status</Th>
                <Th>Slots</Th>
              </tr>
            </thead>
            <tbody>
              {BRIEFING.channelPlan.map((entry) => {
                const on = !excluded.has(entry.id)
                return (
                  <tr key={entry.id} style={{ opacity: on ? 1 : 0.45 }}>
                    <Td>
                      <input type="checkbox" checked={on} onChange={() => toggleEntry(entry.id)} />
                    </Td>
                    <Td>{entry.track}</Td>
                    <Td>{entry.phase}</Td>
                    <Td>{PLATFORMS[entry.platform].label}</Td>
                    <Td>{entry.ratios.join(' ')}</Td>
                    <Td>{entry.markets.join(' ')}</Td>
                    <Td>{entry.focusPoints.join(', ')}</Td>
                    <Td>
                      {entry.status === 'confirmed' ? (
                        entry.status
                      ) : (
                        <span style={{ color: FLAG }} title={entry.note}>
                          {entry.status}
                        </span>
                      )}
                    </Td>
                    <Td>{matrix.slots.filter((s) => s.entryId === entry.id).length}</Td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </Panel>

        <Panel title="Briefs" note="Composed by templating, not written">
          <div style={{ display: 'grid', gap: 12 }}>
            {matrix.slots.slice(0, sampleCount).map((slot) => (
              <div
                key={slot.id}
                style={{ border: `1px solid ${LINE}`, borderRadius: 10, padding: '16px 20px' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
                  <code style={{ fontSize: 13 }}>{slot.id}</code>
                  <span style={{ fontSize: 13, color: '#78716c' }}>
                    {MARKET_LABEL[slot.market]} · {slot.assetType} · in market {slot.flightDate}
                  </span>
                </div>
                <pre
                  style={{
                    font: `14px/1.6 ui-monospace, SFMono-Regular, Menlo, monospace`,
                    background: SURFACE,
                    borderRadius: 8,
                    padding: 16,
                    margin: '12px 0 0',
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {briefText(slot.brief)}
                </pre>
              </div>
            ))}
          </div>
          {sampleCount < matrix.slots.length && (
            <button
              type="button"
              onClick={() => setSampleCount((n) => n + 12)}
              style={{
                marginTop: 16,
                border: `1px solid ${INK}`,
                background: 'transparent',
                color: INK,
                borderRadius: 999,
                padding: '10px 20px',
                font: `500 14px ${font}`,
                cursor: 'pointer',
              }}
            >
              Show more ({matrix.slots.length - sampleCount} left)
            </button>
          )}
        </Panel>
      </div>
    </div>
  )
}

function countFlags(values: Record<string, BriefValue>): number {
  void values
  return BRIEFING.sections.flatMap((s) => s.fields).filter((f) => f.conf < 70).length
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontSize: 11,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: '#78716c',
        marginBottom: 6,
      }}
    >
      {children}
    </div>
  )
}

function Panel({
  title,
  note,
  children,
}: {
  title: string
  note?: string
  children: React.ReactNode
}) {
  return (
    <section style={{ marginTop: 48, borderTop: `1px solid ${LINE}`, paddingTop: 24 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
        <h2 style={{ fontSize: 24, fontWeight: 500, margin: 0 }}>{title}</h2>
        {note && <span style={{ fontSize: 14, color: '#78716c' }}>{note}</span>}
      </div>
      {children}
    </section>
  )
}

function Counts({ title, rows }: { title: string; rows: Array<[string, number]> }) {
  return (
    <div>
      <Eyebrow>{title}</Eyebrow>
      <table style={{ borderCollapse: 'collapse' }}>
        <tbody>
          {rows.map(([label, count]) => (
            <tr key={label}>
              <td style={{ padding: '2px 16px 2px 0' }}>{label}</td>
              <td style={{ padding: '2px 0', fontWeight: 500, textAlign: 'right' }}>{count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Gate({ gate }: { gate: GateResult }) {
  const tone = gate.passed ? '#57534e' : gate.severity === 'blocking' ? FLAG : '#8a6d1f'
  return (
    <div
      style={{
        display: 'flex',
        gap: 16,
        alignItems: 'flex-start',
        padding: '12px 0',
        borderTop: `1px solid ${LINE}`,
      }}
    >
      <span
        style={{
          flex: 'none',
          width: 92,
          fontSize: 11,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: tone,
          paddingTop: 4,
        }}
      >
        {gate.passed ? 'pass' : gate.severity}
      </span>
      <span style={{ flex: 'none', width: 220, fontWeight: 500 }}>{gate.label}</span>
      <span style={{ color: '#57534e' }}>{gate.detail}</span>
    </div>
  )
}

function Field({
  field,
  value,
  open,
  onToggle,
}: {
  field: BriefField
  value: BriefValue
  open: boolean
  onToggle: () => void
}) {
  const flagged = field.conf < 70
  const shown = Array.isArray(value) ? value.join(' · ') : String(value ?? '')
  return (
    <div
      style={{
        border: `1px solid ${flagged ? FLAG : LINE}`,
        borderRadius: 10,
        padding: '16px 20px',
        background: field.type === 'derived' ? SURFACE : '#fff',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        <div>
          <div style={{ fontWeight: 500 }}>{field.label}</div>
          <div style={{ fontSize: 13, color: '#78716c' }}>{field.hint}</div>
        </div>
        <div style={{ fontSize: 13, color: flagged ? FLAG : '#78716c', flex: 'none' }}>
          {field.conf}% confidence
          {field.type === 'derived' && ` · derived from ${field.derivedFrom}`}
        </div>
      </div>
      <div style={{ marginTop: 12, fontSize: 17 }}>
        {shown || <span style={{ color: '#a8a29e' }}>empty</span>}
        {field.type === 'percent' && '%'}
      </div>
      <div style={{ marginTop: 10, fontSize: 13, color: '#78716c', display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <span>{field.cite}</span>
        <button
          type="button"
          onClick={onToggle}
          style={{
            border: 'none',
            background: 'none',
            padding: 0,
            font: 'inherit',
            color: INK,
            textDecoration: 'underline',
            cursor: 'pointer',
          }}
        >
          {open ? 'Hide reasoning' : 'Why this value?'}
        </button>
      </div>
      {open && (
        <div style={{ marginTop: 12, background: SURFACE, borderRadius: 8, padding: '14px 18px' }}>
          <Eyebrow>Agent reasoning</Eyebrow>
          <p style={{ margin: '0 0 10px', fontSize: 15 }}>{field.reasoning}</p>
          <div style={{ fontSize: 14, color: '#57534e', borderLeft: `3px solid ${LINE}`, paddingLeft: 12 }}>
            {field.quote}
          </div>
        </div>
      )}
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  font: `16px ${font}`,
  color: INK,
  border: `1px solid ${LINE}`,
  borderRadius: 999,
  padding: '10px 16px',
  background: '#fff',
}

const tableStyle: React.CSSProperties = {
  borderCollapse: 'collapse',
  width: '100%',
  fontSize: 15,
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th
      style={{
        textAlign: 'left',
        fontSize: 11,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: '#78716c',
        fontWeight: 400,
        padding: '0 16px 8px 0',
        borderBottom: `1px solid ${LINE}`,
      }}
    >
      {children}
    </th>
  )
}

function Td({ children }: { children: React.ReactNode }) {
  return <td style={{ padding: '10px 16px 10px 0', borderBottom: `1px solid ${SURFACE}` }}>{children}</td>
}
