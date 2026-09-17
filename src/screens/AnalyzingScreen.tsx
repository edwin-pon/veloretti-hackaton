import { DEFS, substitute } from '../data/docs'
import { Label, ProgressBar, Spinner } from '../ds'
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
    <div style={{ maxWidth: 680, margin: '64px auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 40 }}>
        <Spinner size={26} />
        <div>
          <h1 style={{ fontSize: 'var(--fs-h2)' }}>Reading your document</h1>
          <div style={{ fontSize: 'var(--fs-body-s)', color: 'var(--text-muted)', marginTop: 6 }}>
            {fileName}
          </div>
        </div>
      </div>

      <ProgressBar value={state.progress} max={100} showValue label="Extraction" />

      <div style={{ marginTop: 48 }}>
        {STEPS.map((label, index) => {
          const done = index < active
          const running = index === active
          return (
            <div
              key={label}
              style={{
                display: 'flex',
                gap: 18,
                alignItems: 'baseline',
                padding: '18px 0',
                borderTop: '1px solid var(--border-subtle)',
              }}
            >
              <Label style={{ color: done || running ? 'var(--vr-ink)' : 'var(--vr-gray-300)' }}>
                {done ? '✓' : String(index + 1).padStart(2, '0')}
              </Label>
              <span
                style={{
                  fontSize: 'var(--fs-body)',
                  fontWeight: running ? 500 : 400,
                  color: done || running ? 'var(--text-primary)' : 'var(--vr-gray-300)',
                }}
              >
                {label}
              </span>
              <span
                style={{
                  marginLeft: 'auto',
                  fontSize: 'var(--fs-caption)',
                  color: 'var(--text-muted)',
                }}
              >
                {done ? 'done' : running ? 'running' : 'queued'}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
