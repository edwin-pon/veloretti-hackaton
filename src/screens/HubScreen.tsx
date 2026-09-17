import { DEFS, DOC_ORDER, type DocKey } from '../data/docs'
import { Badge, Button, Label, Stepper } from '../ds'
import { useStore } from '../lib/store'

export default function HubScreen() {
  const { state, doneCount, allDone, openDoc, prefillAll, go } = useStore()
  const nextUp = DOC_ORDER.find((key) => !state.done[key])

  return (
    <div>
      <Label>Brand knowledge</Label>
      <h1
        style={{
          fontSize: 'var(--fs-display-m)',
          margin: '18px 0 20px',
          maxWidth: '18ch',
        }}
      >
        Teach the studio how Veloretti sounds.
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
        Upload one document at a time. An agent reads it, extracts the rules your campaigns will
        follow, and hands you an editable draft to confirm.
      </p>

      {!allDone && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            flexWrap: 'wrap',
            padding: '20px 0',
            borderTop: '1px solid var(--border-default)',
            borderBottom: '1px solid var(--border-default)',
            marginBottom: 56,
          }}
        >
          <Label style={{ color: 'var(--vr-ink)', whiteSpace: 'nowrap' }}>Demo shortcut</Label>
          <Button variant="secondary" onClick={prefillAll}>
            Confirm all three with the samples
          </Button>
          <span
            style={{
              fontSize: 'var(--fs-body-s)',
              color: 'var(--text-muted)',
              maxWidth: '54ch',
              textWrap: 'pretty',
            }}
          >
            For demos only. Confirms all three sources using the sample documents shipped with this
            build, so you can reach a campaign without walking through each upload. Every step still
            works on its own, with its sample already attached.
          </span>
        </div>
      )}

      <div style={{ marginBottom: 64 }}>
        <Stepper steps={['Brand information', 'Legal rules', 'Style guide', 'Ready']} current={doneCount} />
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))',
          gap: 1,
          background: 'var(--border-subtle)',
          border: '1px solid var(--border-subtle)',
        }}
      >
        {DOC_ORDER.map((key) => {
          const def = DEFS[key]
          const isDone = !!state.done[key]
          const isNext = nextUp === key
          const locked = !isDone && !isNext
          return (
            <article
              key={key}
              style={{
                background: 'var(--surface-card)',
                padding: 32,
                display: 'flex',
                flexDirection: 'column',
                gap: 20,
                opacity: locked ? 0.55 : 1,
                transition: 'opacity var(--dur-med) var(--ease-standard)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                <Label style={{ color: 'var(--vr-ink)' }}>{String(def.order).padStart(2, '0')}</Label>
                <Badge variant={isDone ? 'ink' : isNext ? 'outline' : 'neutral'}>
                  {isDone ? 'Confirmed' : isNext ? 'Next' : 'Waiting'}
                </Badge>
              </div>

              <div>
                <h2 style={{ fontSize: 'var(--fs-h3)', marginBottom: 10 }}>{def.card}</h2>
                <p
                  style={{
                    fontSize: 'var(--fs-body-s)',
                    lineHeight: 'var(--lh-body)',
                    color: 'var(--text-muted)',
                    margin: 0,
                  }}
                >
                  {def.desc}
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
                {isDone ? def.file : locked ? 'Unlocks after the previous step' : 'No document yet'}
              </div>

              <Button
                variant={isNext ? 'primary' : 'secondary'}
                disabled={locked}
                full
                onClick={() => openDoc(key as DocKey)}
              >
                {isDone ? 'Review again' : 'Upload document'}
              </Button>
            </article>
          )
        })}
      </div>

      {allDone && (
        <div
          style={{
            marginTop: 64,
            background: 'var(--surface-inverse)',
            color: 'var(--text-inverse)',
            padding: '56px var(--container-gutter)',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: 32,
            flexWrap: 'wrap',
          }}
        >
          <div style={{ minWidth: 0 }}>
            <Label style={{ color: 'var(--vr-gray-300)' }}>Ready</Label>
            <h2 style={{ fontSize: 'var(--fs-display-m)', margin: '16px 0 12px', maxWidth: '16ch' }}>
              Your rules are live.
            </h2>
            <p
              style={{
                fontSize: 'var(--fs-body)',
                lineHeight: 'var(--lh-body)',
                color: 'var(--vr-gray-300)',
                margin: 0,
                maxWidth: '46ch',
              }}
            >
              Every campaign draft is checked against them before it leaves the studio.
            </p>
          </div>
          <button
            type="button"
            onClick={() => go('dashboard')}
            style={{
              height: 'var(--control-h-md)',
              padding: '0 26px',
              borderRadius: 'var(--radius-pill)',
              border: '1.5px solid var(--vr-white)',
              background: 'var(--vr-white)',
              color: 'var(--vr-ink)',
              fontSize: '0.9375rem',
              fontWeight: 500,
              cursor: 'pointer',
              flex: 'none',
            }}
          >
            Open brand knowledge
          </button>
        </div>
      )}
    </div>
  )
}
