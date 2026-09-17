import { MARKET_LABEL, PLATFORMS } from '../data/vocab'
import { Badge, Label } from '../ds'
import { useCampaign } from '../lib/campaign-store'

/**
 * The two parts of a brief that are tables rather than fields. Markets carry a
 * flight date each, and the channel plan is the thing you prune before anything
 * is generated against it.
 */

export function MarketsTable() {
  const { campaign, matrix } = useCampaign()

  return (
    <Table head={['Market', 'Language', 'In market', 'Slots']}>
      {campaign.markets.map((market) => (
        <tr key={market.key} className="vr-row">
          <Td>{MARKET_LABEL[market.key]}</Td>
          <Td>
            <Label style={{ color: 'var(--vr-ink)' }}>{market.language}</Label>
          </Td>
          <Td>
            {market.regions.length
              ? market.regions.map((r) => `${r.name} ${formatDate(r.inMarketDate)}`).join(' · ')
              : `Window only, from ${formatDate(campaign.meta.window.start)}`}
          </Td>
          <Td align="right">{matrix.slots.filter((s) => s.market === market.key).length}</Td>
        </tr>
      ))}
    </Table>
  )
}

export function ChannelPlanTable({ prunable = false }: { prunable?: boolean }) {
  const { state, matrix, toggleEntry } = useCampaign()

  return (
    <Table
      head={[
        ...(prunable ? ['In'] : []),
        'Track',
        'Phase',
        'Platform',
        'Ratios',
        'Markets',
        'Focus',
        'Status',
        'Slots',
      ]}
    >
      {state.channelPlan.map((entry) => {
        const on = !state.excluded.includes(entry.id)
        return (
          <tr key={entry.id} className="vr-row" style={{ opacity: on ? 1 : 0.4 }}>
            {prunable && (
              <Td>
                <input
                  type="checkbox"
                  checked={on}
                  onChange={() => toggleEntry(entry.id)}
                  aria-label={`Include ${entry.id}`}
                  style={{ accentColor: 'var(--vr-ink)', width: 16, height: 16 }}
                />
              </Td>
            )}
            <Td>{entry.track}</Td>
            <Td>
              <Label style={{ color: 'var(--vr-ink)' }}>{entry.phase}</Label>
            </Td>
            <Td>{PLATFORMS[entry.platform].label}</Td>
            <Td>{entry.ratios.join('  ')}</Td>
            <Td>{entry.markets.join('  ')}</Td>
            <Td>{entry.focusPoints.join(', ')}</Td>
            <Td>
              {entry.status === 'confirmed' ? (
                <span style={{ color: 'var(--text-muted)' }}>Confirmed</span>
              ) : (
                <span title={entry.note}>
                  <Badge variant="accent">{entry.status === 'tbd' ? 'TBD' : 'Optional'}</Badge>
                </span>
              )}
            </Td>
            <Td align="right">{matrix.slots.filter((s) => s.entryId === entry.id).length}</Td>
          </tr>
        )
      })}
    </Table>
  )
}

function Table({ head, children }: { head: string[]; children: React.ReactNode }) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: 'var(--fs-body-s)' }}>
        <thead>
          <tr>
            {head.map((cell) => (
              <th
                key={cell}
                style={{
                  textAlign: 'left',
                  padding: '0 20px 12px 0',
                  borderBottom: '1px solid var(--border-default)',
                  fontWeight: 400,
                }}
              >
                <Label>{cell}</Label>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  )
}

function Td({
  children,
  align = 'left',
}: {
  children: React.ReactNode
  align?: 'left' | 'right'
}) {
  return (
    <td
      style={{
        padding: '14px 20px 14px 0',
        borderBottom: '1px solid var(--border-subtle)',
        textAlign: align,
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </td>
  )
}

/** "2026-08-17" reads as "17 Aug" in a table; the year is on the campaign. */
function formatDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00`)
  if (Number.isNaN(date.getTime())) return iso
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
}
