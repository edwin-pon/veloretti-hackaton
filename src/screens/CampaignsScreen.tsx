import { useMemo } from 'react'
import { BRIEFING, buildCampaign } from '../data/briefing'
import { Badge, Button, Label } from '../ds'
import { useCampaign, type CampaignStage } from '../lib/campaign-store'
import { since, type SavedCampaign } from '../lib/campaign-storage'
import { resolveSlots, runGates } from '../lib/matrix'
import { useStore } from '../lib/store'

/**
 * Every campaign that has been started, drafts included.
 *
 * Each row is resolved on the spot rather than stored with a slot count, so the
 * numbers cannot drift from the brief behind them. The matrix is a few hundred
 * rows of cross-product; recomputing it is cheaper than keeping it in sync.
 */
export default function CampaignsScreen() {
  const { go } = useStore()
  const { saved, state, start, resume, discard } = useCampaign()

  const rows = useMemo(() => saved.map(describe), [saved])

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
            {rows.length ? 'Everything in flight.' : 'Nothing in flight yet.'}
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
            {rows.length
              ? 'Drafts save themselves as you work, so a campaign can be left half read and picked up where it stood.'
              : 'Start one and it saves itself from the first edit, so a half-read briefing survives a closed tab.'}
          </p>
        </div>
        <Button onClick={() => go('campaign-start')}>New campaign</Button>
      </div>

      {rows.length === 0 ? (
        <div
          style={{
            borderTop: '1px solid var(--border-default)',
            borderBottom: '1px solid var(--border-default)',
            padding: '64px 0',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontSize: 'var(--fs-body)',
              color: 'var(--text-muted)',
              margin: '0 0 24px',
              textWrap: 'pretty',
            }}
          >
            The sample growth briefing comes attached, so the first one is a click-through.
          </p>
          <Button variant="secondary" onClick={() => start('brand')}>
            Start from the sample briefing
          </Button>
        </div>
      ) : (
        <div style={{ borderTop: '1px solid var(--border-default)' }}>
          {rows.map((row) => {
            const open = row.record.id === state.id
            return (
              <article
                key={row.record.id}
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
                <div style={{ minWidth: 260, flex: '1 1 260px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                    <h2 style={{ fontSize: 'var(--fs-h3)' }}>{row.name}</h2>
                    {open && <Badge variant="outline">Open</Badge>}
                  </div>
                  <div style={{ fontSize: 'var(--fs-caption)', color: 'var(--text-muted)' }}>
                    {row.window} · saved {since(row.record.updatedAt)}
                  </div>
                </div>

                <div style={{ flex: 'none', width: 150 }}>
                  <Label>Stage</Label>
                  <div style={{ marginTop: 8 }}>
                    <Badge variant={row.record.state.confirmed ? 'ink' : 'neutral'}>
                      {STAGE_LABEL[row.record.state.stage]}
                    </Badge>
                  </div>
                </div>

                <div style={{ flex: 'none', width: 120 }}>
                  <Label>Slots</Label>
                  <div style={{ marginTop: 8, fontSize: 'var(--fs-body)', fontWeight: 500 }}>
                    {row.slots}
                  </div>
                </div>

                <div style={{ flex: 'none', width: 150 }}>
                  <Label>Gates</Label>
                  <div
                    style={{
                      marginTop: 8,
                      fontSize: 'var(--fs-body-s)',
                      color: row.blocking ? 'var(--accent-ink)' : 'var(--text-muted)',
                    }}
                  >
                    {row.blocking
                      ? `${row.blocking} blocking`
                      : row.record.state.confirmed
                        ? 'Clear'
                        : 'Not resolved yet'}
                  </div>
                </div>

                <div style={{ flex: 'none', display: 'flex', gap: 14, alignItems: 'center' }}>
                  <button
                    type="button"
                    className="vr-underline"
                    onClick={() => discard(row.record.id)}
                    style={{ fontSize: 'var(--fs-caption)', color: 'var(--text-muted)' }}
                  >
                    Discard
                  </button>
                  <Button variant="secondary" onClick={() => resume(row.record.id)}>
                    {row.record.state.confirmed ? 'Open' : 'Continue'}
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
  brief: 'Briefing',
  review: 'In review',
  matrix: 'Resolved',
  export: 'Handed over',
}

function describe(record: SavedCampaign) {
  const campaign = buildCampaign(record.state.values, {
    markets: record.state.markets,
    channelPlan: record.state.channelPlan.filter(
      (entry) => !record.state.excluded.includes(entry.id),
    ),
    propositions: BRIEFING.propositions,
    statedElsewhere: record.state.statedElsewhere,
  })
  const matrix = resolveSlots(campaign)
  const blocking = runGates(campaign, matrix).filter(
    (gate) => !gate.passed && gate.severity === 'blocking',
  ).length

  return {
    record,
    name: [campaign.meta.name, campaign.meta.year].filter(Boolean).join(' ') || 'Untitled campaign',
    window: `${campaign.meta.window.start} to ${campaign.meta.window.end}`,
    slots: matrix.slots.length,
    blocking,
  }
}
