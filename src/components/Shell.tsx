import type { ReactNode } from 'react'
import { DEFS, DOC_ORDER } from '../data/docs'
import { useStore } from '../lib/store'
import Sidebar from './Sidebar'

export default function Shell({ children }: { children: ReactNode }) {
  const { state, doneCount, allDone, go, reset } = useStore()

  const crumb =
    state.screen === 'hub'
      ? 'Onboarding'
      : state.screen === 'dashboard'
        ? 'Dashboard'
        : DEFS[state.doc].card

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', fontSize: 16 }}>
      <Sidebar />

      <main style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <header
          style={{
            background: '#fff',
            borderBottom: '1px solid var(--hairline)',
            padding: '18px 40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 24,
          }}
        >
          <div
            style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: 'var(--slate)' }}
          >
            <button
              type="button"
              onClick={() => go('dashboard')}
              style={{
                border: 'none',
                background: 'none',
                padding: 0,
                font: 'inherit',
                fontSize: 14,
                color: 'var(--slate)',
                cursor: 'pointer',
              }}
            >
              Brand knowledge
            </button>
            <span>/</span>
            <span style={{ color: 'var(--ink-heading)', fontWeight: 700 }}>{crumb}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginLeft: 'auto' }}>
            <span style={{ fontSize: 13, color: 'var(--slate)' }}>
              {allDone
                ? 'Onboarding complete'
                : `${doneCount} of ${DOC_ORDER.length} sources confirmed`}
            </span>
            <div
              style={{
                width: 120,
                height: 6,
                borderRadius: 999,
                background: 'var(--mist)',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${Math.round((doneCount / DOC_ORDER.length) * 100)}%`,
                  background: 'var(--navy)',
                  transition: 'width 240ms ease-out',
                }}
              />
            </div>
            <button
              type="button"
              onClick={reset}
              style={{
                border: 'none',
                background: 'none',
                padding: 0,
                font: 'inherit',
                fontSize: 13,
                color: 'var(--slate)',
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
            >
              Restart
            </button>
          </div>
        </header>

        <div
          style={{
            flex: 1,
            minHeight: 0,
            overflowY: 'auto',
            padding: 40,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div
            key={state.screen + state.doc}
            style={{
              width: '100%',
              minHeight: '100%',
              display: 'flex',
              flexDirection: 'column',
              animation: 'dl-in 240ms ease-out',
            }}
          >
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}
