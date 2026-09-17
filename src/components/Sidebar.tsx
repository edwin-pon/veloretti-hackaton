import { BRANDS, DOC_ORDER } from '../data/docs'
import { Avatar } from '../ds'
import { useStore } from '../lib/store'
import type { Screen } from '../lib/types'

/**
 * Nav sections from the prototype. Only "Brand knowledge" is wired up; the rest
 * are the campaign/media/settings areas that come after the onboarding flow.
 */
const NAV = [
  { label: 'Brand knowledge', screens: ['hub', 'upload', 'analyzing', 'review', 'dashboard'] },
  { label: 'Campaigns', screens: [] },
  { label: 'Media manager', screens: [] },
  { label: 'Settings', screens: [] },
] satisfies Array<{ label: string; screens: Screen[] }>

export default function Sidebar() {
  const { state, brand, doneByBrandStatus, toggleBrands, selectBrand, go } = useSidebarModel()

  return (
    <aside
      style={{
        width: 248,
        flex: 'none',
        minHeight: 0,
        overflowY: 'auto',
        background: 'var(--navy)',
        color: '#fff',
        padding: '32px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: 40,
      }}
    >
      <div>
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: '-0.3px',
          }}
        >
          Brand Studio
        </div>
        <div
          style={{
            fontSize: 11,
            letterSpacing: '1.2px',
            color: 'var(--ink-secondary-dark)',
            marginTop: 6,
            fontWeight: 700,
          }}
        >
          MARKETING AUTOMATION
        </div>
      </div>

      <div style={{ position: 'relative' }}>
        <div
          style={{
            fontSize: 11,
            letterSpacing: '1px',
            fontWeight: 700,
            color: 'var(--ink-secondary-dark)',
            marginBottom: 8,
          }}
        >
          BRAND
        </div>
        <button
          type="button"
          className="dl-brand-btn"
          onClick={toggleBrands}
          aria-expanded={state.brandsOpen}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            background: 'rgba(255,255,255,0.07)',
            border: `1px solid ${state.brandsOpen ? 'rgba(255,255,255,0.45)' : 'rgba(255,255,255,0.18)'}`,
            borderRadius: 20,
            padding: '10px 12px',
            cursor: 'pointer',
            font: 'inherit',
            textAlign: 'left',
          }}
        >
          <BrandDot initials={brand.initials} color={brand.color} />
          <span style={{ minWidth: 0, flex: 1 }}>
            <span
              style={{
                display: 'block',
                fontSize: 14,
                fontWeight: 700,
                color: '#fff',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {brand.name}
            </span>
            <span style={{ display: 'block', fontSize: 11, color: 'var(--ink-secondary-dark)' }}>
              {doneByBrandStatus(brand.key)}
            </span>
          </span>
          <span style={{ flex: 'none', fontSize: 11, color: 'var(--ink-secondary-dark)' }}>
            {state.brandsOpen ? '▲' : '▼'}
          </span>
        </button>

        {state.brandsOpen && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              marginTop: 8,
              background: '#fff',
              borderRadius: 20,
              boxShadow: '0 6px 20px rgba(22,21,20,0.08)',
              padding: 8,
              zIndex: 20,
              animation: 'dl-in 160ms ease-out',
            }}
          >
            {BRANDS.map((b) => (
              <button
                key={b.key}
                type="button"
                className="dl-brand-option"
                onClick={() => selectBrand(b.key)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  background: b.key === state.brandKey ? 'var(--mist)' : 'transparent',
                  border: 'none',
                  borderRadius: 12,
                  padding: 10,
                  cursor: 'pointer',
                  font: 'inherit',
                  textAlign: 'left',
                }}
              >
                <BrandDot initials={b.initials} color={b.color} />
                <span style={{ minWidth: 0, flex: 1 }}>
                  <span
                    style={{
                      display: 'block',
                      fontSize: 14,
                      fontWeight: 700,
                      color: 'var(--ink-heading)',
                    }}
                  >
                    {b.name}
                  </span>
                  <span style={{ display: 'block', fontSize: 11, color: 'var(--slate)' }}>
                    {doneByBrandStatus(b.key)}
                  </span>
                </span>
                <span style={{ flex: 'none', fontSize: 12, fontWeight: 700, color: 'var(--navy)' }}>
                  {b.key === state.brandKey ? '✓' : ''}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {NAV.map((item) => {
          const active = (item.screens as Screen[]).includes(state.screen)
          const enabled = item.screens.length > 0
          return (
            <button
              key={item.label}
              type="button"
              className="dl-nav-item"
              disabled={!enabled}
              title={enabled ? undefined : 'Available once onboarding is wired to the backend'}
              onClick={() => go('dashboard')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '10px 14px',
                border: 'none',
                borderRadius: 20,
                fontFamily: 'var(--font-sans)',
                fontSize: 15,
                background: active ? 'rgba(255,255,255,0.12)' : 'transparent',
                color: active ? '#fff' : 'var(--ink-secondary-dark)',
                fontWeight: active ? 700 : 400,
                cursor: enabled ? 'pointer' : 'not-allowed',
                opacity: enabled ? 1 : 0.55,
                textAlign: 'left',
                width: '100%',
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 999,
                  background: active ? '#fff' : 'rgba(255,255,255,0.35)',
                  flex: 'none',
                }}
              />
              {item.label}
            </button>
          )
        })}
      </nav>

      <div
        style={{
          marginTop: 'auto',
          borderTop: '1px solid rgba(255,255,255,0.14)',
          paddingTop: 20,
        }}
      >
        <div style={{ borderRadius: 20, padding: 12 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 8,
              fontSize: 12,
              color: 'var(--ink-secondary-dark)',
              lineHeight: 1.5,
            }}
          >
            <span>Workspace</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 10 }}>
            <Avatar name="Mara Feldt" size={32} tone="mint" />
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>Mara Feldt</div>
              <div style={{ fontSize: 12, color: 'var(--ink-secondary-dark)' }}>
                {brand.name} · Owner
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}

function BrandDot({ initials, color }: { initials: string; color: string }) {
  return (
    <span
      style={{
        width: 28,
        height: 28,
        flex: 'none',
        borderRadius: 999,
        background: color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 11,
        fontWeight: 700,
        color: isDark(color) ? '#fff' : 'var(--navy)',
      }}
    >
      {initials}
    </span>
  )
}

/** The workspace colours run the brand's grey ramp, so the darkest needs white. */
function isDark(hex: string): boolean {
  const value = hex.replace('#', '')
  if (value.length !== 6) return false
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(value.slice(i, i + 2), 16))
  return (r * 299 + g * 587 + b * 114) / 1000 < 140
}

function useSidebarModel() {
  const { state, brand, toggleBrands, selectBrand, go } = useStore()

  const doneByBrandStatus = (key: string) => {
    const count = DOC_ORDER.filter((doc) => (state.doneByBrand[key] ?? {})[doc]).length
    if (count === DOC_ORDER.length) return 'Onboarding complete'
    if (count === 0) return 'Not started'
    return `${count} of ${DOC_ORDER.length} sources confirmed`
  }

  return { state, brand, doneByBrandStatus, toggleBrands, selectBrand, go }
}
