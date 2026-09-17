import { DEFS, DOC_ORDER, substitute, type DocKey } from '../data/docs'
import { Badge, Stepper } from '../ds'
import { useStore } from '../lib/store'

const CARD: React.CSSProperties = {
  background: '#fff',
  borderRadius: 20,
  padding: 24,
  boxShadow: '0 2px 8px rgba(0,44,71,0.08)',
}

export default function HubScreen() {
  const { brand, done, doneCount, allDone, openDoc, go } = useStore()
  const nextUp = DOC_ORDER.find((key) => !done[key])

  return (
    <div>
      <h1
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 36,
          fontWeight: 700,
          color: 'var(--ink-heading)',
          margin: '0 0 12px',
          lineHeight: 1.2,
        }}
      >
        Brand onboarding
      </h1>
      <p
        style={{
          fontSize: 18,
          lineHeight: 1.7,
          color: 'var(--ink-secondary)',
          margin: '0 0 32px',
          maxWidth: '64ch',
          textWrap: 'pretty',
        }}
      >
        Upload one document at a time. An agent reads it, extracts the rules your campaigns will
        follow, and hands you an editable draft to confirm.
      </p>

      <div style={{ ...CARD, marginBottom: 24 }}>
        <Stepper steps={['Brand information', 'Legal rules', 'Style guide', 'Ready']} current={doneCount} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
        {DOC_ORDER.map((key) => {
          const def = DEFS[key]
          const isDone = !!done[key]
          const isNext = nextUp === key
          const locked = !isDone && !isNext
          return (
            <div
              key={key}
              style={{
                ...CARD,
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
                border: `2px solid ${isNext ? '#52E9C0' : 'transparent'}`,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 999,
                    background: def.well,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-display)',
                    fontSize: 20,
                    fontWeight: 700,
                    color: 'var(--navy)',
                  }}
                >
                  {def.order}
                </div>
                <Badge tone={isDone ? 'mint' : isNext ? 'sky' : 'neutral'}>
                  {isDone ? 'Confirmed' : isNext ? 'Next up' : 'Waiting'}
                </Badge>
              </div>

              <div>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 22,
                    fontWeight: 700,
                    color: 'var(--ink-heading)',
                    margin: '0 0 8px',
                    lineHeight: 1.3,
                  }}
                >
                  {def.card}
                </h3>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--slate)', margin: 0 }}>
                  {def.desc}
                </p>
              </div>

              <div
                style={{
                  fontSize: 12,
                  color: 'var(--slate)',
                  borderTop: '1px solid var(--hairline)',
                  paddingTop: 12,
                  marginTop: 'auto',
                }}
              >
                {isDone
                  ? substitute(def.file, brand)
                  : locked
                    ? 'Unlocks after the previous step'
                    : 'No document yet'}
              </div>

              <button
                type="button"
                className="dl-lift"
                disabled={locked}
                onClick={() => openDoc(key as DocKey)}
                style={{
                  border: isDone ? '2px solid var(--navy)' : 'none',
                  background: isDone ? 'transparent' : locked ? 'var(--mist)' : 'var(--mint)',
                  color: locked ? 'var(--slate)' : 'var(--navy)',
                  borderRadius: 20,
                  padding: '12px 24px',
                  fontFamily: 'var(--font-sans)',
                  fontSize: 15,
                  fontWeight: 700,
                  letterSpacing: '0.5px',
                  cursor: locked ? 'not-allowed' : 'pointer',
                  opacity: locked ? 0.7 : 1,
                }}
              >
                {isDone ? 'Review again' : 'Upload document'}
              </button>
            </div>
          )
        })}
      </div>

      {allDone && (
        <div
          style={{
            marginTop: 24,
            background: 'var(--navy)',
            borderRadius: 20,
            padding: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 24,
            flexWrap: 'wrap',
          }}
        >
          <div>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 28,
                fontWeight: 700,
                color: '#fff',
                margin: '0 0 8px',
              }}
            >
              Brand knowledge is live
            </h3>
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.7,
                color: 'var(--ink-secondary-dark)',
                margin: 0,
              }}
            >
              Every campaign draft is now checked against these rules before it leaves the platform.
            </p>
          </div>
          <button
            type="button"
            onClick={() => go('dashboard')}
            style={{
              border: 'none',
              background: 'var(--mint)',
              color: 'var(--navy)',
              borderRadius: 20,
              padding: '14px 28px',
              fontFamily: 'var(--font-sans)',
              fontSize: 15,
              fontWeight: 700,
              letterSpacing: '0.5px',
              cursor: 'pointer',
              flex: 'none',
            }}
          >
            Open dashboard
          </button>
        </div>
      )}
    </div>
  )
}
