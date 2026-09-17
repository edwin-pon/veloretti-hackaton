import BriefFieldCard from '../components/BriefFieldCard'
import { ChannelPlanTable, MarketsTable } from '../components/PlanTables'
import { BRIEFING } from '../data/briefing'
import { Badge, Button, Label, Notice } from '../ds'
import { useCampaign } from '../lib/campaign-store'
import { useStore } from '../lib/store'

/**
 * Brief sign-off: the first of the two human checkpoints. Everything the agent
 * read, in the order the campaign model needs it, with the two tables the model
 * keeps as tables. The slot count updates as you edit, so the cost of a change
 * is visible before it is confirmed.
 */
export default function BriefReviewScreen() {
  const { go } = useStore()
  const { state, summary, gates, blocking, needReview, read, confirmBrief } = useCampaign()

  const offerConflict = gates.find((gate) => gate.id === 'offer-consistency' && !gate.passed)

  return (
    <div>
      <button
        type="button"
        className="vr-underline"
        onClick={() => go('brief-upload')}
        style={{ fontSize: 'var(--fs-body-s)', marginBottom: 32 }}
      >
        Back to the briefing
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
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Label>Campaign brief</Label>
            <Badge variant={state.mode === 'brand' ? 'ink' : 'neutral'}>
              {state.mode === 'brand' ? 'Using brand data' : 'Starting clean'}
            </Badge>
          </div>
          <h1 style={{ fontSize: 'var(--fs-display-m)', margin: '18px 0 12px' }}>
            {String(state.values.cp1)} {String(state.values.cp3)}
          </h1>
          <div style={{ fontSize: 'var(--fs-body-s)', color: 'var(--text-muted)' }}>
            {state.upload?.name ?? BRIEFING.file} · read just now ·{' '}
            {BRIEFING.sections.flatMap((s) => s.fields).length} fields extracted
          </div>
        </div>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center', flex: 'none' }}>
          <Button variant="secondary" onClick={read}>
            Re-read the brief
          </Button>
          <Button onClick={confirmBrief}>
            {needReview > 0 ? `Confirm with ${needReview} flagged` : 'Confirm and resolve'}
          </Button>
        </div>
      </div>

      <div style={{ marginBottom: 32 }}>
        <Notice title={BRIEFING.summaryTitle}>{BRIEFING.summary}</Notice>
      </div>

      {offerConflict && (
        <div style={{ marginBottom: 48 }}>
          <Notice title="Offer conflict" tone="attention">
            {offerConflict.detail} Until it is one value, every surface that reads the offer is
            reading a different number.
          </Notice>
        </div>
      )}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 32,
          padding: '28px 0',
          borderTop: '1px solid var(--border-default)',
          borderBottom: '1px solid var(--border-default)',
          marginBottom: 56,
        }}
      >
        <Stat value={String(summary.total)} label="Slots this resolves to" />
        <Stat value={String(summary.distinctBriefs)} label="Distinct briefs behind them" />
        <Stat value={String(needReview)} label="Fields needing review" />
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
              <MarketsTable />
            </div>
          )}

          {section.key === 'channels' && (
            <div style={{ marginTop: 28 }}>
              <ChannelPlanTable />
              <p
                style={{
                  fontSize: 'var(--fs-caption)',
                  color: 'var(--text-muted)',
                  margin: '16px 0 0',
                  maxWidth: '62ch',
                  textWrap: 'pretty',
                }}
              >
                Rows are pruned on the next screen, once you can see what each one costs in slots.
              </p>
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
        <Button onClick={confirmBrief}>
          {needReview > 0 ? `Confirm with ${needReview} flagged` : 'Confirm and resolve'}
        </Button>
        <span
          style={{
            fontSize: 'var(--fs-body-s)',
            color: 'var(--text-muted)',
            maxWidth: '58ch',
            textWrap: 'pretty',
          }}
        >
          Confirming resolves the brief into {summary.total} slots. Nothing is generated yet, and
          flagged fields stay flagged on the matrix.
        </span>
      </div>
    </div>
  )
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
