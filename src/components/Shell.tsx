import type { ReactNode } from 'react'
import { DEFS, DOC_ORDER } from '../data/docs'
import { Label } from '../ds'
import { useStore } from '../lib/store'
import Wordmark from './Wordmark'

/**
 * Editorial shell: the wordmark sits top left, a hairline separates it from the
 * work, and everything below breathes. No colour, no chrome — the brand's
 * "less, but better" applied to an internal tool.
 */
const RULE: React.CSSProperties = {
  width: 1,
  height: 22,
  background: 'var(--border-default)',
  flex: 'none',
}

export default function Shell({ children }: { children: ReactNode }) {
  const { state, doneCount, allDone, go, reset } = useStore()

  const crumb =
    state.screen === 'hub'
      ? 'Onboarding'
      : state.screen === 'dashboard'
        ? 'Brand knowledge'
        : DEFS[state.doc].card

  return (
    <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          background: 'rgba(245,245,244,0.85)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        <div
          style={{
            maxWidth: 'var(--container-max)',
            margin: '0 auto',
            padding: '22px var(--container-gutter)',
            display: 'flex',
            alignItems: 'center',
            gap: 28,
          }}
        >
          <button
            type="button"
            onClick={() => go(allDone ? 'dashboard' : 'hub')}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              flex: 'none',
              display: 'block',
            }}
            aria-label="Veloretti Brand Studio — home"
          >
            <Wordmark width={132} />
          </button>

          <span aria-hidden className="vr-hide-sm" style={RULE} />

          <span className="vr-hide-sm">
            <Label style={{ color: 'var(--vr-ink)', whiteSpace: 'nowrap' }}>Brand studio</Label>
          </span>

          <nav className="vr-header-nav">
            <span
              className="vr-hide-md"
              style={{ fontSize: 'var(--fs-body-s)', color: 'var(--text-muted)' }}
            >
              {crumb}
            </span>
            <span aria-hidden className="vr-hide-md" style={RULE} />
            <span style={{ fontSize: 'var(--fs-body-s)', color: 'var(--text-muted)' }}>
              {allDone ? 'All sources confirmed' : `${doneCount} of ${DOC_ORDER.length} confirmed`}
            </span>
            <span
              aria-hidden
              className="vr-hide-sm"
              style={{
                width: 72,
                height: 2,
                background: 'var(--vr-gray-200)',
                flex: 'none',
                overflow: 'hidden',
              }}
            >
              <span
                style={{
                  display: 'block',
                  height: '100%',
                  width: `${Math.round((doneCount / DOC_ORDER.length) * 100)}%`,
                  background: 'var(--vr-ink)',
                  transition: 'width var(--dur-med) var(--ease-standard)',
                }}
              />
            </span>
            <button type="button" className="vr-underline" onClick={reset} style={{ fontSize: 'var(--fs-body-s)' }}>
              Restart
            </button>
          </nav>
        </div>
      </header>

      <main style={{ flex: 1, width: '100%' }}>
        <div
          key={state.screen + state.doc}
          style={{
            maxWidth: 'var(--container-max)',
            margin: '0 auto',
            padding: '56px var(--container-gutter) 96px',
            animation: 'vr-in var(--dur-med) var(--ease-out)',
          }}
        >
          {children}
        </div>
      </main>

      <footer
        style={{
          borderTop: '1px solid var(--border-subtle)',
          padding: '24px var(--container-gutter)',
        }}
      >
        <div
          style={{
            maxWidth: 'var(--container-max)',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            gap: 16,
            flexWrap: 'wrap',
            fontSize: 'var(--fs-caption)',
            color: 'var(--text-muted)',
          }}
        >
          <span>Veloretti · Designed in Amsterdam</span>
          <span>Every campaign is checked against the rules you confirm here.</span>
        </div>
      </footer>
    </div>
  )
}
