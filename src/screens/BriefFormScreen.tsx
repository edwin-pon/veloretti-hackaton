import BriefFieldCard from '../components/BriefFieldCard'
import OfferConflict from '../components/OfferConflict'
import { ChannelPlanEditor, MarketsEditor } from '../components/PlanEditors'
import { BRIEFING, BRIEF_FIELDS } from '../data/briefing'
import { Button, Label, Notice } from '../ds'
import { useCampaign } from '../lib/campaign-store'
import { useStore } from '../lib/store'

/**
 * The growth briefing as a form.
 *
 * docs/growth-briefing-blueprint.md read one hand-built Figma briefing and
 * worked out the spec behind it. This is that spec turned into questions, in
 * the order the campaign model needs them, so the next campaign is filled in
 * rather than reverse-engineered.
 *
 * The slot count updates while you type, which is the point: every answer here
 * multiplies into deliverables, and seeing that before confirming is what makes
 * this the cheap checkpoint.
 */
export default function BriefFormScreen() {
  const { go } = useStore()
  const { state, summary, gates, blocking, needReview, fillExample, confirmBrief } = useCampaign()

  const offerConflict = gates.find((gate) => gate.id === 'offer-consistency' && !gate.passed)
  const completeness = gates.find((gate) => gate.id === 'completeness')
  const missing = BRIEF_FIELDS.filter((f) => f.required && isEmpty(state.values[f.key])).length
  const name = String(state.values.cp1 || '').trim()

  return (
    <div>
      <button
        type="button"
        className="vr-underline"
        onClick={() => go('campaigns')}
        style={{ fontSize: 'var(--fs-body-s)', marginBottom: 32 }}
      >
        Back to campaigns
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
          <Label>Campaign brief</Label>
          <h1 style={{ fontSize: 'var(--fs-display-m)', margin: '18px 0 12px' }}>
            {name ? `${name} ${String(state.values.cp3 || '')}`.trim() : 'A new briefing.'}
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
            Answer the campaign once and the studio expands it into every deliverable. Language
            follows the market, the CTA follows the funnel phase, and the offer is a state rather
            than a number, so those are not asked twice.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center', flex: 'none', flexWrap: 'wrap' }}>
          <Button variant="secondary" onClick={() => go('brief-upload')}>
            Read from a document
          </Button>
          <Button onClick={confirmBrief} disabled={!completeness?.passed}>
            {needReview > 0 ? `Resolve with ${needReview} flagged` : 'Resolve into the matrix'}
          </Button>
        </div>
      </div>

      {missing > 0 && (
        <div style={{ marginBottom: 32 }}>
          <Notice title="Fill this in for a demo" tone="neutral">
            Nothing is filled in yet. Load the Back to School 2026 briefing, the one the campaign
            model was worked out from, and every answer below is populated.
          </Notice>
          <div style={{ marginTop: 20 }}>
            <Button onClick={fillExample}>Fill in the Back to School 2026 example</Button>
          </div>
        </div>
      )}

      {state.upload && (
        <div style={{ marginBottom: 32 }}>
          <Notice title={BRIEFING.summaryTitle}>{BRIEFING.summary}</Notice>
        </div>
      )}

      {offerConflict && (
        <div style={{ marginBottom: 48 }}>
          <OfferConflict />
        </div>
      )}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
          gap: 32,
          padding: '28px 0',
          borderTop: '1px solid var(--border-default)',
          borderBottom: '1px solid var(--border-default)',
          marginBottom: 56,
        }}
      >
        <Stat value={String(summary.total)} label="Slots this resolves to" />
        <Stat value={String(summary.distinctBriefs)} label="Distinct briefs behind them" />
        <Stat value={String(missing)} label="Required answers missing" flagged={missing > 0} />
        <Stat
          value={String(blocking.length)}
          label={blocking.length === 1 ? 'Blocking gate' : 'Blocking gates'}
          flagged={blocking.length > 0}
        />
      </div>

      {BRIEFING.sections.map((section) => (
        <section key={section.key} style={{ marginBottom: 56 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 20 }}>
            <h2 style={{ fontSize: 'var(--fs-h3)' }}>{section.title}</h2>
            <span style={{ fontSize: 'var(--fs-caption)', color: 'var(--text-muted)' }}>
              {section.meta}
            </span>
          </div>

          <div style={{ display: 'grid', gap: 16 }}>
            {section.fields.map((field) => (
              <BriefFieldCard key={field.key} field={field} />
            ))}
          </div>

          {section.key === 'markets' && (
            <div style={{ marginTop: 28 }}>
              <MarketsEditor />
            </div>
          )}

          {section.key === 'channels' && (
            <div style={{ marginTop: 28 }}>
              <ChannelPlanEditor />
            </div>
          )}
        </section>
      ))}

      <div
        style={{
          borderTop: '1px solid var(--border-default)',
          paddingTop: 32,
          display: 'flex',
          alignItems: 'center',
          gap: 20,
          flexWrap: 'wrap',
        }}
      >
        <Button onClick={confirmBrief} disabled={!completeness?.passed}>
          {needReview > 0 ? `Resolve with ${needReview} flagged` : 'Resolve into the matrix'}
        </Button>
        <span
          style={{
            fontSize: 'var(--fs-body-s)',
            color: 'var(--text-muted)',
            maxWidth: '58ch',
            textWrap: 'pretty',
          }}
        >
          {completeness?.passed
            ? `Resolving expands this into ${summary.total} slots. Nothing is generated yet, and every answer stays editable.`
            : completeness?.detail}
        </span>
      </div>
    </div>
  )
}

function isEmpty(value: unknown): boolean {
  if (Array.isArray(value)) return value.length === 0
  if (typeof value === 'number') return value === 0
  return !value
}

function Stat({ value, label, flagged }: { value: string; label: string; flagged?: boolean }) {
  return (
    <div>
      <div
        style={{
          fontSize: 'var(--fs-h1)',
          fontWeight: 500,
          letterSpacing: 'var(--tracking-display)',
          color: flagged ? 'var(--accent-ink)' : 'var(--text-primary)',
        }}
      >
        {value}
      </div>
      <div style={{ marginTop: 8 }}>
        <Label>{label}</Label>
      </div>
    </div>
  )
}
