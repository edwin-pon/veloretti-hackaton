import { useState } from 'react'
import { ChannelPlanTable } from '../components/PlanTables'
import { MARKET_LABEL } from '../data/vocab'
import { Badge, Button, Label, Notice } from '../ds'
import { useCampaign } from '../lib/campaign-store'
import { briefText } from '../lib/matrix'
import { useStore } from '../lib/store'
import type { GateResult } from '../lib/campaign'

/**
 * Matrix sign-off: the second human checkpoint, and the cheapest one. Every
 * slot here costs copy, a visual and a render later, so this is where they get
 * pruned. Nothing has been generated yet.
 */
export default function MatrixScreen() {
  const { go } = useStore()
  const { campaign, matrix, summary, gates, blocking } = useCampaign()
  const [shown, setShown] = useState(4)

  return (
    <div>
      <button
        type="button"
        className="vr-underline"
        onClick={() => go('brief-review')}
        style={{ fontSize: 'var(--fs-body-s)', marginBottom: 32 }}
      >
        Back to the brief
      </button>

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
          <Label>Slot matrix</Label>
          <h1 style={{ fontSize: 'var(--fs-display-m)', margin: '18px 0 12px', maxWidth: '20ch' }}>
            {summary.total} slots, {summary.distinctBriefs} briefs behind them.
          </h1>
          <p
            style={{
              fontSize: 'var(--fs-body-l)',
              lineHeight: 'var(--lh-body)',
              color: 'var(--text-secondary)',
              margin: 0,
              maxWidth: '58ch',
              textWrap: 'pretty',
            }}
          >
            Prune before anything is generated. A slot removed here costs nothing; a slot removed
            after the copy and the renders costs all of it.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center', flex: 'none' }}>
          <Button variant="secondary" onClick={() => go('brief-review')}>
            Edit the brief
          </Button>
          <Button disabled={blocking.length > 0}>
            {blocking.length > 0 ? `${blocking.length} blocking` : 'Draft all assets'}
          </Button>
        </div>
      </div>

      {blocking.length > 0 && (
        <div style={{ marginBottom: 48 }}>
          <Notice title="Blocked" tone="attention">
            {blocking.map((gate) => gate.detail).join(' ')}
          </Notice>
        </div>
      )}

      <section style={{ marginBottom: 56 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
            gap: 40,
            padding: '28px 0',
            borderTop: '1px solid var(--border-default)',
            borderBottom: '1px solid var(--border-default)',
          }}
        >
          <Counts
            title="Market"
            rows={summary.byMarket.map((m) => [MARKET_LABEL[m.key], m.count])}
          />
          <Counts title="Phase" rows={summary.byPhase.map((p) => [p.key, p.count])} />
          <Counts title="Platform" rows={summary.byPlatform.map((p) => [p.label, p.count])} />
          <Counts title="Track" rows={summary.byTrack.map((t) => [t.key, t.count])} />
        </div>
      </section>

      <section style={{ marginBottom: 56 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 20 }}>
          <h2 style={{ fontSize: 'var(--fs-h3)' }}>Quality gates</h2>
          <span style={{ fontSize: 'var(--fs-caption)', color: 'var(--text-muted)' }}>
            run on the resolved matrix, no model calls
          </span>
        </div>
        <div>
          {gates.map((gate) => (
            <Gate key={gate.id} gate={gate} />
          ))}
        </div>
        <p
          style={{
            fontSize: 'var(--fs-caption)',
            color: 'var(--text-muted)',
            margin: '18px 0 0',
            maxWidth: '68ch',
            textWrap: 'pretty',
          }}
        >
          Brand, legal and rendered-dimension checks run at compose time, where there is an actual
          asset to measure. They are not claimed here.
        </p>
      </section>

      <section style={{ marginBottom: 56 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 20 }}>
          <h2 style={{ fontSize: 'var(--fs-h3)' }}>Channel plan</h2>
          <span style={{ fontSize: 'var(--fs-caption)', color: 'var(--text-muted)' }}>
            untick a row to take it out of the matrix
          </span>
        </div>
        <ChannelPlanTable prunable />
        {matrix.dropped.length > 0 && (
          <p
            style={{
              fontSize: 'var(--fs-caption)',
              color: 'var(--accent-ink)',
              margin: '18px 0 0',
            }}
          >
            {matrix.dropped.length} combinations dropped because the platform does not run them:{' '}
            {[...new Set(matrix.dropped.map((d) => d.reason))].join('; ')}.
          </p>
        )}
      </section>

      <section>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 20 }}>
          <h2 style={{ fontSize: 'var(--fs-h3)' }}>Briefs</h2>
          <span style={{ fontSize: 'var(--fs-caption)', color: 'var(--text-muted)' }}>
            composed by templating, not written
          </span>
        </div>

        <div style={{ display: 'grid', gap: 16 }}>
          {matrix.slots.slice(0, shown).map((slot) => (
            <article
              key={slot.id}
              style={{
                background: 'var(--surface-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-lg)',
                padding: 28,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: 20,
                  flexWrap: 'wrap',
                  marginBottom: 18,
                }}
              >
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 'var(--fs-body)', fontWeight: 500 }}>{slot.id}</div>
                  <div
                    style={{
                      fontSize: 'var(--fs-caption)',
                      color: 'var(--text-muted)',
                      marginTop: 4,
                    }}
                  >
                    {MARKET_LABEL[slot.market]} · {slot.assetType} · in market {slot.flightDate}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', flex: 'none' }}>
                  <Badge variant="outline">{slot.phase}</Badge>
                  {slot.status !== 'confirmed' && <Badge variant="accent">{slot.status}</Badge>}
                </div>
              </div>

              <pre
                style={{
                  margin: 0,
                  padding: '20px 24px',
                  background: 'var(--surface-sand)',
                  borderRadius: 'var(--radius-md)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'var(--fs-body-s)',
                  lineHeight: 'var(--lh-body)',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {briefText(slot.brief)}
              </pre>
            </article>
          ))}
        </div>

        {shown < matrix.slots.length && (
          <div style={{ marginTop: 24 }}>
            <Button variant="secondary" onClick={() => setShown((n) => n + 8)}>
              Show more ({matrix.slots.length - shown} left)
            </Button>
          </div>
        )}

        <p
          style={{
            fontSize: 'var(--fs-caption)',
            color: 'var(--text-muted)',
            margin: '28px 0 0',
            maxWidth: '68ch',
            textWrap: 'pretty',
          }}
        >
          The slot name is the handoff contract: track, phase, platform, ratio, language, asset type
          and focus point, in that order. Export bundles and the manifest are keyed to it, so every
          file traces back to the line of the brief it came from.
        </p>
      </section>

      <div
        style={{
          marginTop: 64,
          background: 'var(--surface-inverse)',
          color: 'var(--text-inverse)',
          padding: '48px var(--container-gutter)',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: 32,
          flexWrap: 'wrap',
        }}
      >
        <div style={{ minWidth: 0 }}>
          <Label style={{ color: 'var(--vr-gray-300)' }}>Next</Label>
          <h2 style={{ fontSize: 'var(--fs-h2)', margin: '16px 0 12px', maxWidth: '20ch' }}>
            Copy is the stage this was built for.
          </h2>
          <p
            style={{
              fontSize: 'var(--fs-body)',
              lineHeight: 'var(--lh-body)',
              color: 'var(--vr-gray-300)',
              margin: 0,
              maxWidth: '52ch',
              textWrap: 'pretty',
            }}
          >
            The briefing has structured briefs but no headlines. With the matrix resolved, every
            slot knows its angle, its CTA and the language it is written in natively, which is
            everything a headline needs and nothing it may invent.
          </p>
        </div>
        <span style={{ fontSize: 'var(--fs-caption)', color: 'var(--vr-gray-300)', flex: 'none' }}>
          {campaign.meta.window.start} to {campaign.meta.window.end}
        </span>
      </div>
    </div>
  )
}

function Counts({ title, rows }: { title: string; rows: Array<[string, number]> }) {
  return (
    <div>
      <Label>{title}</Label>
      <div style={{ marginTop: 14 }}>
        {rows.map(([label, count]) => (
          <div
            key={label}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: 16,
              padding: '7px 0',
              fontSize: 'var(--fs-body-s)',
            }}
          >
            <span style={{ color: 'var(--text-secondary)' }}>{label}</span>
            <span style={{ fontWeight: 500 }}>{count}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Gate({ gate }: { gate: GateResult }) {
  const flagged = !gate.passed
  const blocking = flagged && gate.severity === 'blocking'
  return (
    <div
      style={{
        display: 'flex',
        gap: 20,
        alignItems: 'baseline',
        padding: '18px 0',
        borderTop: '1px solid var(--border-subtle)',
      }}
    >
      <span style={{ flex: 'none', width: 96 }}>
        <Label
          style={{
            color: blocking ? 'var(--accent-ink)' : flagged ? 'var(--vr-ink)' : 'var(--vr-gray-300)',
          }}
        >
          {gate.passed ? 'Pass' : gate.severity === 'blocking' ? 'Blocking' : gate.severity}
        </Label>
      </span>
      <span style={{ flex: 'none', width: 220, fontSize: 'var(--fs-body-s)', fontWeight: 500 }}>
        {gate.label}
      </span>
      <span
        style={{
          fontSize: 'var(--fs-body-s)',
          lineHeight: 'var(--lh-body)',
          color: 'var(--text-secondary)',
          textWrap: 'pretty',
        }}
      >
        {gate.detail}
      </span>
    </div>
  )
}
