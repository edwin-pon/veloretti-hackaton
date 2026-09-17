import { DOC_ORDER } from '../data/docs'
import { Badge, Button, Label } from '../ds'
import { useCampaign } from '../lib/campaign-store'
import { useStore } from '../lib/store'

/**
 * The fork at the top of a campaign: run inside the confirmed brand rules, or
 * start with nothing assumed. The first option is only honest once onboarding
 * has something to offer, so it says how much is confirmed.
 */
export default function CampaignStartScreen() {
  const { doneCount, allDone, go } = useStore()
  const { start } = useCampaign()

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

      <Label>New campaign</Label>
      <h1 style={{ fontSize: 'var(--fs-display-m)', margin: '18px 0 20px', maxWidth: '18ch' }}>
        Start from what the studio already knows.
      </h1>
      <p
        style={{
          fontSize: 'var(--fs-body-l)',
          lineHeight: 'var(--lh-body)',
          color: 'var(--text-secondary)',
          margin: '0 0 56px',
          maxWidth: '58ch',
          textWrap: 'pretty',
        }}
      >
        Upload a growth briefing and an agent reads the concept, the offer, the markets and the
        channel plan out of it. You confirm those, and the studio resolves them into the slots the
        campaign actually has to deliver.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 1,
          background: 'var(--border-subtle)',
          border: '1px solid var(--border-subtle)',
        }}
      >
        <article
          style={{
            background: 'var(--surface-card)',
            padding: 32,
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
            <Label style={{ color: 'var(--vr-ink)' }}>01</Label>
            <Badge variant={allDone ? 'ink' : 'outline'}>
              {allDone ? 'Recommended' : `${doneCount} of ${DOC_ORDER.length} confirmed`}
            </Badge>
          </div>

          <div>
            <h2 style={{ fontSize: 'var(--fs-h3)', marginBottom: 10 }}>With brand data</h2>
            <p
              style={{
                fontSize: 'var(--fs-body-s)',
                lineHeight: 'var(--lh-body)',
                color: 'var(--text-muted)',
                margin: 0,
              }}
            >
              Tone, markets, palette, typefaces and legal rules are applied as the agent drafts, and
              checked before anything leaves the studio.
            </p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {['Tone and voice', 'Markets', 'Palette and fonts', 'Legal rules'].map((chip) => (
              <span
                key={chip}
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
                {chip}
              </span>
            ))}
          </div>

          <div
            style={{
              marginTop: 'auto',
              paddingTop: 20,
              borderTop: '1px solid var(--border-subtle)',
              fontSize: 'var(--fs-caption)',
              color: 'var(--text-muted)',
            }}
          >
            {allDone
              ? 'All three sources confirmed'
              : 'The agent will ask about whatever is not confirmed yet'}
          </div>

          <Button full onClick={() => start('brand')}>
            Use brand data
          </Button>
        </article>

        <article
          style={{
            background: 'var(--surface-card)',
            padding: 32,
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
            <Label style={{ color: 'var(--vr-ink)' }}>02</Label>
            <Badge variant="neutral">No rules applied</Badge>
          </div>

          <div>
            <h2 style={{ fontSize: 'var(--fs-h3)', marginBottom: 10 }}>Start clean</h2>
            <p
              style={{
                fontSize: 'var(--fs-body-s)',
                lineHeight: 'var(--lh-body)',
                color: 'var(--text-muted)',
                margin: 0,
              }}
            >
              Nothing is assumed. The briefing is read on its own terms, and the legal and style
              checks stay off until brand data is attached.
            </p>
          </div>

          <div
            style={{
              marginTop: 'auto',
              paddingTop: 20,
              borderTop: '1px solid var(--border-subtle)',
              fontSize: 'var(--fs-caption)',
              color: 'var(--text-muted)',
            }}
          >
            You can attach brand data to this campaign later
          </div>

          <Button variant="secondary" full onClick={() => start('clean')}>
            Start clean
          </Button>
        </article>
      </div>
    </div>
  )
}
