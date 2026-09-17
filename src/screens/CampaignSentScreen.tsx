import { Badge, Button, Label, Notice } from '../ds'
import { campaignPayload } from '../lib/campaign-api'
import { useCampaign } from '../lib/campaign-store'
import { useStore } from '../lib/store'

/**
 * What was handed over, and what the studio can and cannot say about it.
 *
 * The distinction matters: n8n only answers the browser when the Webhook node
 * allows this origin. Without that the request still lands, but nothing here
 * has seen it arrive, so this says so rather than showing a tick it cannot
 * stand behind.
 */
export default function CampaignSentScreen() {
  const { go } = useStore()
  const { state, pushing, send } = useCampaign()
  const payload = campaignPayload(state.input)
  const confirmed = state.outcome?.status === 'ok'

  return (
    <div style={{ maxWidth: 760 }}>
      <button
        type="button"
        className="vr-underline"
        onClick={() => go('campaign')}
        style={{ fontSize: 'var(--fs-body-s)', marginBottom: 32 }}
      >
        Back to the campaign
      </button>

      <div><Label>Handed over</Label></div>
      <h1 style={{ fontSize: 'var(--fs-display-m)', margin: '18px 0 20px', maxWidth: '20ch' }}>
        {confirmed ? 'The agent has it.' : 'Sent to the agent.'}
      </h1>

      <div style={{ marginBottom: 48 }}>
        <Notice
          title={confirmed ? 'Confirmed by n8n' : 'Delivery not confirmed'}
          tone={confirmed ? 'neutral' : 'attention'}
        >
          {state.outcome?.detail ?? 'No reply was recorded.'}
        </Notice>
      </div>

      <section style={{ marginBottom: 48 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 20 }}>
          <h2 style={{ fontSize: 'var(--fs-h3)' }}>What went over</h2>
          <span style={{ fontSize: 'var(--fs-caption)', color: 'var(--text-muted)' }}>
            as JSON, to the campaign webhook
          </span>
        </div>

        <div style={{ borderTop: '1px solid var(--border-default)' }}>
          <Row label="Campaign name">{payload.campaignName}</Row>
          <Row label="Description">{payload.description}</Row>
          <Row label="Markets">
            <Chips values={payload.markets} />
          </Row>
          <Row label="Channels">
            <Chips values={payload.channels} />
          </Row>
          <Row label="Audience">
            {payload.audiences.length ? <Chips values={payload.audiences} /> : 'Not given'}
          </Row>
          <Row label="Bike model">{payload.bikeModel}</Row>
        </div>

        <pre
          style={{
            margin: '24px 0 0',
            padding: '20px 24px',
            background: 'var(--surface-sand)',
            borderRadius: 'var(--radius-md)',
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--fs-body-s)',
            lineHeight: 'var(--lh-body)',
            whiteSpace: 'pre-wrap',
            overflowX: 'auto',
          }}
        >
          {JSON.stringify(payload, null, 2)}
        </pre>
      </section>

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
        <Button variant="secondary" onClick={send} disabled={pushing}>
          {pushing ? 'Sending…' : 'Send again'}
        </Button>
        <Button onClick={() => go('campaigns')}>Back to campaigns</Button>
        <span
          style={{
            fontSize: 'var(--fs-caption)',
            color: 'var(--text-muted)',
            maxWidth: '46ch',
            textWrap: 'pretty',
          }}
        >
          A test webhook only accepts one call per "Execute workflow", so sending again needs it
          armed again.
        </span>
      </div>
    </div>
  )
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        display: 'flex',
        gap: 24,
        alignItems: 'baseline',
        padding: '18px 0',
        borderBottom: '1px solid var(--border-subtle)',
        flexWrap: 'wrap',
      }}
    >
      <span style={{ width: 160, flex: 'none' }}>
        <Label>{label}</Label>
      </span>
      <span
        style={{
          flex: 1,
          minWidth: 240,
          fontSize: 'var(--fs-body-s)',
          lineHeight: 'var(--lh-body)',
          textWrap: 'pretty',
        }}
      >
        {children}
      </span>
    </div>
  )
}

function Chips({ values }: { values: string[] }) {
  return (
    <span style={{ display: 'inline-flex', flexWrap: 'wrap', gap: 8 }}>
      {values.map((value) => (
        <Badge key={value} variant="outline">
          {value}
        </Badge>
      ))}
    </span>
  )
}
