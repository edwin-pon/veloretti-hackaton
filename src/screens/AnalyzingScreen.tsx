import { DEFS, substitute } from '../data/docs'
import { ProgressBar, Spinner } from '../ds'
import { useStore } from '../lib/store'

const STEPS = [
  'Parsing document structure',
  'Locating rule statements',
  'Extracting and normalising values',
  'Scoring confidence and citations',
]

export default function AnalyzingScreen() {
  const { state, brand } = useStore()
  const active = Math.min(STEPS.length - 1, Math.floor(state.progress / 25))
  const fileName = state.upload?.name ?? substitute(DEFS[state.doc].file, brand)

  return (
    <div style={{ maxWidth: 640, margin: '40px auto', width: '100%' }}>
      <div
        style={{
          background: '#fff',
          borderRadius: 20,
          padding: 40,
          boxShadow: '0 2px 8px rgba(0,44,71,0.08)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
          <Spinner size={28} />
          <div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 28,
                fontWeight: 700,
                color: 'var(--ink-heading)',
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              Reading your document
            </h2>
            <div style={{ fontSize: 14, color: 'var(--slate)', marginTop: 4 }}>{fileName}</div>
          </div>
        </div>

        <ProgressBar value={state.progress} max={100} showValue label="Extraction" />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 32 }}>
          {STEPS.map((label, index) => {
            const done = index < active
            const running = index === active
            return (
              <div
                key={label}
                style={{
                  display: 'flex',
                  gap: 14,
                  alignItems: 'center',
                  padding: '12px 0',
                  borderTop: '1px solid var(--hairline)',
                }}
              >
                <span
                  style={{
                    width: 24,
                    height: 24,
                    flex: 'none',
                    borderRadius: 999,
                    background: done ? '#52E9C0' : running ? '#DAE7FE' : 'var(--mist)',
                    color: 'var(--navy)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 12,
                    fontWeight: 700,
                  }}
                >
                  {done ? '✓' : running ? '·' : ''}
                </span>
                <span
                  style={{
                    fontSize: 16,
                    color: done || running ? 'var(--ink-heading)' : 'var(--slate)',
                    fontWeight: running ? 700 : 400,
                  }}
                >
                  {label}
                </span>
                <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--slate)' }}>
                  {done ? 'done' : running ? 'running' : 'queued'}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
