import { Badge, Button, Label } from '../ds'
import { useCampaign, type CampaignStage } from '../lib/campaign-store'
import { since } from '../lib/campaign-storage'

/**
 * Every campaign that has been started, drafts included. Drafts save themselves
 * from the first edit, so a half-written brief survives a closed tab.
 */
export default function CampaignsScreen() {
  const { saved, state, start, resume, discard } = useCampaign()

  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: 32,
          flexWrap: 'wrap',
          marginBottom: 48,
        }}
      >
        <div style={{ minWidth: 0 }}>
          <Label>Campaigns</Label>
          <h1 style={{ fontSize: 'var(--fs-display-m)', margin: '18px 0 16px', maxWidth: '20ch' }}>
            {saved.length ? 'Everything in flight.' : 'Nothing in flight yet.'}
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
            {saved.length
              ? 'Drafts save themselves as you work, so a campaign can be left half written and picked up where it stood.'
              : 'Six questions, and the agent takes it from there. A campaign saves itself from the first edit.'}
          </p>
        </div>
        <Button onClick={start}>New campaign</Button>
      </div>

      {saved.length === 0 ? (
        <div
          style={{
            borderTop: '1px solid var(--border-default)',
            borderBottom: '1px solid var(--border-default)',
            padding: '64px 0',
            textAlign: 'center',
          }}
        >
          <Button variant="secondary" onClick={start}>
            Start a campaign
          </Button>
        </div>
      ) : (
        <div style={{ borderTop: '1px solid var(--border-default)' }}>
          {saved.map((record) => {
            const { input, stage } = record.state
            const open = record.id === state.id
            return (
              <article
                key={record.id}
                className="vr-row"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 32,
                  flexWrap: 'wrap',
                  padding: '28px 0',
                  borderBottom: '1px solid var(--border-subtle)',
                }}
              >
                <div style={{ minWidth: 240, flex: '1 1 240px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                    <h2 style={{ fontSize: 'var(--fs-h3)' }}>{input.name.trim() || 'Untitled campaign'}</h2>
                    {open && <Badge variant="outline">Open</Badge>}
                  </div>
                  <div style={{ fontSize: 'var(--fs-caption)', color: 'var(--text-muted)' }}>
                    {input.bikeModel} · saved {since(record.updatedAt)}
                  </div>
                </div>

                <Column label="Markets">{input.markets.join(' · ') || 'None yet'}</Column>
                <Column label="Channels">{input.channels.join(' · ') || 'None yet'}</Column>
                <Column label="Audience">
                  {input.audiences.length ? `${input.audiences.length}` : 'None yet'}
                </Column>

                <div style={{ flex: 'none', width: 140 }}>
                  <Label>Stage</Label>
                  <div style={{ marginTop: 8 }}>
                    <Badge variant={stage === 'sent' ? 'ink' : 'neutral'}>
                      {STAGE_LABEL[stage]}
                    </Badge>
                  </div>
                </div>

                <div style={{ flex: 'none', display: 'flex', gap: 14, alignItems: 'center' }}>
                  <button
                    type="button"
                    className="vr-underline"
                    onClick={() => discard(record.id)}
                    style={{ fontSize: 'var(--fs-caption)', color: 'var(--text-muted)' }}
                  >
                    Discard
                  </button>
                  <Button variant="secondary" onClick={() => resume(record.id)}>
                    {stage === 'sent' ? 'Open' : 'Continue'}
                  </Button>
                </div>
              </article>
            )
          })}
        </div>
      )}
    </div>
  )
}

const STAGE_LABEL: Record<CampaignStage, string> = {
  form: 'Draft',
  sent: 'With the agent',
}

function Column({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ flex: 'none', width: 130 }}>
      <Label>{label}</Label>
      <div style={{ marginTop: 8, fontSize: 'var(--fs-body-s)' }}>{children}</div>
    </div>
  )
}
