// The two parts of a briefing that are tables rather than questions.
//
// Markets carry their own in-market dates, because one campaign window with a
// regional stagger inside it is not three campaigns. The channel plan is where
// the matrix comes from: every row is a cross-product waiting to be expanded,
// so the slot count sits on the row itself and moves as you edit it.

import {
  ASSET_TYPES,
  FOCUS_POINTS,
  MARKET_LABEL,
  MARKET_LANGUAGE,
  MARKET_ORDER,
  PHASES,
  PHASE_ORDER,
  PLATFORMS,
  PLATFORM_ORDER,
  TRACKS,
  type MarketKey,
  type PhaseKey,
  type PlatformKey,
} from '../data/vocab'
import { Badge, Button, Label, SelectField, TextField } from '../ds'
import { useCampaign } from '../lib/campaign-store'
import type { ChannelEntry, Market } from '../lib/campaign'

export function MarketsEditor() {
  const { state, setMarkets } = useCampaign()
  const markets = state.markets
  const available = MARKET_ORDER.filter((key) => !markets.some((m) => m.key === key))

  const update = (key: MarketKey, next: Partial<Market>) =>
    setMarkets(markets.map((m) => (m.key === key ? { ...m, ...next } : m)))

  return (
    <div>
      {markets.length === 0 && (
        <p style={EMPTY}>
          No markets yet. A campaign with no market resolves to no slots at all.
        </p>
      )}

      {markets.map((market) => (
        <section
          key={market.key}
          style={{ padding: '20px 0', borderTop: '1px solid var(--border-subtle)' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
            <h3 style={{ fontSize: 'var(--fs-h4)' }}>{MARKET_LABEL[market.key]}</h3>
            <Badge variant="neutral">{MARKET_LANGUAGE[market.key]}</Badge>
            <span style={{ fontSize: 'var(--fs-caption)', color: 'var(--text-muted)' }}>
              language follows the market
            </span>
            <button
              type="button"
              className="vr-underline"
              onClick={() => setMarkets(markets.filter((m) => m.key !== market.key))}
              style={{ marginLeft: 'auto', fontSize: 'var(--fs-caption)', color: 'var(--text-muted)' }}
            >
              Remove market
            </button>
          </div>

          <div style={{ marginTop: 16, display: 'grid', gap: 12 }}>
            {market.regions.map((region, index) => (
              <div key={index} style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ width: 220 }}>
                  <TextField
                    value={region.name}
                    onChange={(name) =>
                      update(market.key, {
                        regions: market.regions.map((r, i) => (i === index ? { ...r, name } : r)),
                      })
                    }
                    placeholder="Region"
                    ariaLabel={`Region name in ${MARKET_LABEL[market.key]}`}
                  />
                </div>
                <input
                  type="date"
                  className="vr-field"
                  aria-label={`In-market date for ${region.name || 'this region'}`}
                  value={region.inMarketDate}
                  onChange={(event) =>
                    update(market.key, {
                      regions: market.regions.map((r, i) =>
                        i === index ? { ...r, inMarketDate: event.target.value } : r,
                      ),
                    })
                  }
                  style={DATE_INPUT}
                />
                <button
                  type="button"
                  className="vr-underline"
                  onClick={() =>
                    update(market.key, { regions: market.regions.filter((_, i) => i !== index) })
                  }
                  style={{ fontSize: 'var(--fs-caption)', color: 'var(--text-muted)' }}
                >
                  Remove
                </button>
              </div>
            ))}

            <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              <button
                type="button"
                className="vr-underline"
                onClick={() =>
                  update(market.key, {
                    regions: [...market.regions, { name: '', inMarketDate: '' }],
                  })
                }
                style={{ fontSize: 'var(--fs-body-s)' }}
              >
                Add a region
              </button>
              {market.regions.length === 0 && (
                <span style={{ fontSize: 'var(--fs-caption)', color: 'var(--text-muted)' }}>
                  Without regions this market runs the campaign window as one flight.
                </span>
              )}
            </div>
          </div>
        </section>
      ))}

      {available.length > 0 && (
        <div
          style={{
            display: 'flex',
            gap: 12,
            alignItems: 'center',
            flexWrap: 'wrap',
            padding: '20px 0 0',
            borderTop: '1px solid var(--border-subtle)',
          }}
        >
          {available.map((key) => (
            <Button
              key={key}
              variant="secondary"
              onClick={() => setMarkets([...markets, { key, language: MARKET_LANGUAGE[key], regions: [] }])}
            >
              Add {MARKET_LABEL[key]}
            </Button>
          ))}
        </div>
      )}
    </div>
  )
}

export function ChannelPlanEditor() {
  const { state, setChannelPlan, matrix } = useCampaign()
  const plan = state.channelPlan
  const marketKeys = state.markets.map((m) => m.key)

  const update = (id: string, next: Partial<ChannelEntry>) =>
    setChannelPlan(plan.map((entry) => (entry.id === id ? { ...entry, ...next } : entry)))

  const addRow = () => {
    const phase: PhaseKey = 'THINK'
    setChannelPlan([
      ...plan,
      {
        id: `row-${plan.length + 1}-${Math.round(Math.random() * 1e4)}`,
        track: TRACKS[0],
        phase,
        platform: 'google',
        ratios: ['1x1'],
        markets: marketKeys,
        focusPoints: ['USP'],
        assetTypes: ['Image'],
        treatments: [],
        status: 'confirmed',
      },
    ])
  }

  return (
    <div>
      {plan.length === 0 && (
        <p style={EMPTY}>
          No rows yet. Each row is a track in a funnel phase on one platform, and expands into a
          slot per ratio, market, focus point and treatment.
        </p>
      )}

      <div style={{ display: 'grid', gap: 16 }}>
        {plan.map((entry) => {
          const platforms = PLATFORM_ORDER.filter((key) => PLATFORMS[key].phases.includes(entry.phase))
          const slots = matrix.slots.filter((slot) => slot.entryId === entry.id).length
          return (
            <article
              key={entry.id}
              style={{
                background: 'var(--surface-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-lg)',
                padding: 24,
              }}
            >
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-end' }}>
                <div style={{ width: 150 }}>
                  <SelectField
                    label="Track"
                    value={entry.track}
                    options={[...TRACKS]}
                    onChange={(track) => update(entry.id, { track: track as ChannelEntry['track'] })}
                  />
                </div>
                <div style={{ width: 150 }}>
                  <SelectField
                    label="Phase"
                    value={entry.phase}
                    options={[...PHASE_ORDER]}
                    onChange={(value) => {
                      const phase = value as PhaseKey
                      // A platform that does not run the new phase has to go,
                      // and so do ratios it does not carry.
                      const platform = PLATFORMS[entry.platform].phases.includes(phase)
                        ? entry.platform
                        : (PLATFORM_ORDER.find((key) => PLATFORMS[key].phases.includes(phase)) as PlatformKey)
                      update(entry.id, {
                        phase,
                        platform,
                        ratios: entry.ratios.filter((r) => PLATFORMS[platform].ratios.includes(r)),
                        treatments: [],
                      })
                    }}
                  />
                </div>
                <div style={{ width: 170 }}>
                  <SelectField
                    label="Platform"
                    value={entry.platform}
                    options={platforms.map((key) => PLATFORMS[key].label)}
                    onChange={(label) => {
                      const platform = (PLATFORM_ORDER.find((key) => PLATFORMS[key].label === label) ??
                        entry.platform) as PlatformKey
                      update(entry.id, {
                        platform,
                        ratios: entry.ratios.filter((r) => PLATFORMS[platform].ratios.includes(r)),
                      })
                    }}
                  />
                </div>
                <div style={{ width: 170 }}>
                  <SelectField
                    label="Status"
                    value={entry.status}
                    options={['confirmed', 'optional', 'tbd']}
                    onChange={(status) =>
                      update(entry.id, { status: status as ChannelEntry['status'] })
                    }
                  />
                </div>
                <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 16 }}>
                  <span style={{ fontSize: 'var(--fs-body-s)' }}>
                    <strong style={{ fontWeight: 500 }}>{slots}</strong> slots
                  </span>
                  <button
                    type="button"
                    className="vr-underline"
                    onClick={() => setChannelPlan(plan.filter((row) => row.id !== entry.id))}
                    style={{ fontSize: 'var(--fs-caption)', color: 'var(--text-muted)' }}
                  >
                    Remove row
                  </button>
                </div>
              </div>

              <div style={{ marginTop: 20, display: 'grid', gap: 16 }}>
                <ChipRow
                  label="Ratios"
                  options={PLATFORMS[entry.platform].ratios}
                  selected={entry.ratios}
                  onToggle={(ratio) =>
                    update(entry.id, { ratios: toggle(entry.ratios, ratio as ChannelEntry['ratios'][number]) })
                  }
                />
                <ChipRow
                  label="Markets"
                  options={marketKeys}
                  selected={entry.markets}
                  empty="Add a market above first"
                  onToggle={(key) =>
                    update(entry.id, { markets: toggle(entry.markets, key as MarketKey) })
                  }
                />
                <ChipRow
                  label="Focus points"
                  options={[...FOCUS_POINTS]}
                  selected={entry.focusPoints}
                  onToggle={(point) =>
                    update(entry.id, {
                      focusPoints: toggle(entry.focusPoints, point as ChannelEntry['focusPoints'][number]),
                    })
                  }
                />
                <ChipRow
                  label="Asset types"
                  options={[...ASSET_TYPES]}
                  selected={entry.assetTypes}
                  onToggle={(type) =>
                    update(entry.id, {
                      assetTypes: toggle(entry.assetTypes, type as ChannelEntry['assetTypes'][number]),
                    })
                  }
                />
                <ChipRow
                  label={`Treatments ${entry.treatments.length ? '' : '· all of them'}`}
                  options={PHASES[entry.phase].treatments}
                  selected={entry.treatments}
                  onToggle={(treatment) =>
                    update(entry.id, { treatments: toggle(entry.treatments, treatment) })
                  }
                />
              </div>

              {entry.note && (
                <p
                  style={{
                    margin: '18px 0 0',
                    fontSize: 'var(--fs-caption)',
                    color: 'var(--text-muted)',
                  }}
                >
                  {entry.note}
                </p>
              )}
            </article>
          )
        })}
      </div>

      <div style={{ marginTop: 20 }}>
        <Button variant="secondary" onClick={addRow}>
          Add a row
        </Button>
      </div>
    </div>
  )
}

function ChipRow({
  label,
  options,
  selected,
  onToggle,
  empty,
}: {
  label: string
  options: readonly string[]
  selected: readonly string[]
  onToggle: (value: string) => void
  empty?: string
}) {
  return (
    <div>
      <Label>{label}</Label>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 10 }}>
        {options.length === 0 && (
          <span style={{ fontSize: 'var(--fs-caption)', color: 'var(--text-muted)' }}>
            {empty ?? 'Nothing to choose from'}
          </span>
        )}
        {options.map((option) => {
          const on = selected.includes(option)
          return (
            <button
              key={option}
              type="button"
              aria-pressed={on}
              onClick={() => onToggle(option)}
              style={{
                height: 'var(--control-h-sm)',
                padding: '0 16px',
                borderRadius: 'var(--radius-pill)',
                border: `1.5px solid ${on ? 'var(--vr-ink)' : 'var(--border-default)'}`,
                background: on ? 'var(--vr-ink)' : 'transparent',
                color: on ? 'var(--vr-white)' : 'var(--vr-ink)',
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--fs-body-s)',
                cursor: 'pointer',
                transition: 'var(--transition-control)',
              }}
            >
              {option}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function toggle<T extends string>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value]
}

const EMPTY: React.CSSProperties = {
  fontSize: 'var(--fs-body-s)',
  color: 'var(--text-muted)',
  margin: '0 0 20px',
  maxWidth: '62ch',
  textWrap: 'pretty',
}

const DATE_INPUT: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: '0.9375rem',
  color: 'var(--vr-ink)',
  background: 'var(--vr-white)',
  border: '1.5px solid var(--vr-gray-200)',
  outline: 'none',
  height: 'var(--control-h-md)',
  padding: '0 18px',
  borderRadius: 'var(--radius-pill)',
}
