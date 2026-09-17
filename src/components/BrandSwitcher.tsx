import { BRANDS, DOC_ORDER } from '../data/docs'
import { Label } from '../ds'
import { useStore } from '../lib/store'

/**
 * The workspace switcher, moved out of the old sidebar and into the header.
 *
 * It does what it always did: pick a brand, and the onboarding state follows.
 * The brand dot keeps each workspace's colour, which is the one place in this
 * header where colour is allowed to mean something.
 */
export default function BrandSwitcher() {
  const { state, brand, toggleBrands, selectBrand } = useStore()

  const status = (key: string) => {
    const count = DOC_ORDER.filter((doc) => (state.doneByBrand[key] ?? {})[doc]).length
    if (count === DOC_ORDER.length) return 'Onboarding complete'
    if (count === 0) return 'Not started'
    return `${count} of ${DOC_ORDER.length} confirmed`
  }

  return (
    <div style={{ position: 'relative', flex: 'none' }}>
      <button
        type="button"
        onClick={toggleBrands}
        aria-expanded={state.brandsOpen}
        aria-haspopup="listbox"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          height: 'var(--control-h-sm)',
          padding: '0 16px',
          borderRadius: 'var(--radius-pill)',
          border: '1.5px solid var(--border-default)',
          background: 'var(--vr-white)',
          fontFamily: 'var(--font-sans)',
          fontSize: 'var(--fs-body-s)',
          color: 'var(--vr-ink)',
          cursor: 'pointer',
          transition: 'var(--transition-control)',
        }}
      >
        <Dot color={brand.color} />
        {brand.name}
        <span aria-hidden style={{ color: 'var(--text-muted)', fontSize: 11 }}>
          {state.brandsOpen ? '▲' : '▼'}
        </span>
      </button>

      {state.brandsOpen && (
        <div
          role="listbox"
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            right: 0,
            minWidth: 260,
            background: 'var(--surface-card)',
            border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-md)',
            padding: 8,
            zIndex: 20,
            animation: 'vr-in var(--dur-fast) var(--ease-out)',
          }}
        >
          {BRANDS.map((option) => {
            const selected = option.key === brand.key
            return (
              <button
                key={option.key}
                type="button"
                role="option"
                aria-selected={selected}
                onClick={() => selectBrand(option.key)}
                className="vr-row"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  width: '100%',
                  padding: '12px 14px',
                  border: 'none',
                  borderRadius: 'var(--radius-md)',
                  background: selected ? 'var(--vr-surface-2)' : 'transparent',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-sans)',
                }}
              >
                <Dot color={option.color} />
                <span style={{ minWidth: 0, flex: 1 }}>
                  <span
                    style={{
                      display: 'block',
                      fontSize: 'var(--fs-body-s)',
                      fontWeight: selected ? 500 : 400,
                      color: 'var(--vr-ink)',
                    }}
                  >
                    {option.name}
                  </span>
                  <span style={{ display: 'block', marginTop: 2 }}>
                    <Label>{status(option.key)}</Label>
                  </span>
                </span>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

function Dot({ color }: { color: string }) {
  return (
    <span
      aria-hidden
      style={{
        width: 10,
        height: 10,
        flex: 'none',
        borderRadius: '999px',
        background: color,
        border: '1px solid rgba(0,0,0,0.08)',
      }}
    />
  )
}
