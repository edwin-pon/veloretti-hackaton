import { useRef, useState } from 'react'
import { DEFS, substitute } from '../data/docs'
import { Button, Label, Notice } from '../ds'
import BackLink from '../components/BackLink'
import { useStore } from '../lib/store'

export default function UploadScreen() {
  const { state, brand, go, pickFile, removeFile, startAnalysis } = useStore()
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)
  const def = DEFS[state.doc]
  const upload = state.upload

  const accept = (files: FileList | null) => {
    const file = files?.[0]
    if (file) pickFile(file)
  }

  return (
    <div>
      <BackLink onClick={() => go('hub')}>Back to onboarding</BackLink>

      <Label>Step {String(def.order).padStart(2, '0')}</Label>
      <h1 style={{ fontSize: 'var(--fs-display-m)', margin: '18px 0 20px' }}>{def.title}</h1>
      <p
        style={{
          fontSize: 'var(--fs-body-l)',
          lineHeight: 'var(--lh-body)',
          color: 'var(--text-secondary)',
          margin: '0 0 48px',
          maxWidth: '58ch',
          textWrap: 'pretty',
        }}
      >
        {substitute(def.intro, brand)}
      </p>

      {state.error && (
        <div style={{ marginBottom: 32 }}>
          <Notice title="Analysis failed" tone="attention">
            {state.error}
          </Notice>
        </div>
      )}

      <div
        className="vr-two-col"
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.7fr) minmax(0, 1fr)',
          gap: 48,
          alignItems: 'start',
        }}
      >
        <div>
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.docx,.md,.markdown,application/pdf"
            hidden
            onChange={(event) => accept(event.target.files)}
          />
          <div
            role="button"
            tabIndex={0}
            className="vr-drop"
            onClick={() => inputRef.current?.click()}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') inputRef.current?.click()
            }}
            onDragOver={(event) => {
              event.preventDefault()
              setDragging(true)
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(event) => {
              event.preventDefault()
              setDragging(false)
              accept(event.dataTransfer.files)
            }}
            style={{
              border: `1.5px ${dragging ? 'solid' : 'dashed'} ${
                upload || dragging ? 'var(--vr-ink)' : 'var(--border-default)'
              }`,
              borderRadius: 'var(--radius-lg)',
              background: dragging ? 'var(--vr-surface-2)' : 'var(--surface-card)',
              padding: '72px 32px',
              textAlign: 'center',
              cursor: 'pointer',
            }}
          >
            <div style={{ fontSize: 'var(--fs-h3)', marginBottom: 10 }}>Drop your document here</div>
            <div style={{ fontSize: 'var(--fs-body-s)', color: 'var(--text-muted)' }}>
              PDF, DOCX or Markdown · up to 40 MB
            </div>
            <div style={{ marginTop: 28, display: 'flex', justifyContent: 'center' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  height: 'var(--control-h-md)',
                  padding: '0 26px',
                  borderRadius: 'var(--radius-pill)',
                  border: '1.5px solid var(--vr-black)',
                  fontSize: '0.9375rem',
                  fontWeight: 500,
                }}
              >
                Browse files
              </span>
            </div>
          </div>

          <div
            style={{
              marginTop: 16,
              fontSize: 'var(--fs-caption)',
              color: 'var(--text-muted)',
              textAlign: 'center',
            }}
          >
            No document to hand?{' '}
            <button
              type="button"
              className="vr-underline"
              onClick={() => pickFile()}
              style={{ fontSize: 'var(--fs-caption)' }}
            >
              Use the sample {substitute(def.file, brand)}
            </button>
          </div>

          {upload && (
            <div style={{ marginTop: 36 }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 18,
                  padding: '18px 0',
                  borderTop: '1px solid var(--border-subtle)',
                  borderBottom: '1px solid var(--border-subtle)',
                }}
              >
                <Label style={{ color: 'var(--vr-ink)' }}>{extensionOf(upload.name)}</Label>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div
                    style={{
                      fontSize: 'var(--fs-body)',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {upload.name}
                  </div>
                  <div style={{ fontSize: 'var(--fs-caption)', color: 'var(--text-muted)' }}>
                    {upload.meta}
                  </div>
                </div>
                <button
                  type="button"
                  className="vr-underline"
                  onClick={removeFile}
                  style={{ fontSize: 'var(--fs-caption)', color: 'var(--text-muted)' }}
                >
                  Remove
                </button>
              </div>

              <div style={{ display: 'flex', gap: 20, alignItems: 'center', marginTop: 28 }}>
                <Button onClick={startAnalysis}>Start analysis</Button>
                <span style={{ fontSize: 'var(--fs-caption)', color: 'var(--text-muted)' }}>
                  Takes about 40 seconds
                </span>
              </div>
            </div>
          )}
        </div>

        <aside>
          <Label>What the agent extracts</Label>
          <div style={{ marginTop: 20 }}>
            {def.extracts.map((row) => (
              <div
                key={row}
                style={{
                  padding: '14px 0',
                  borderTop: '1px solid var(--border-subtle)',
                  fontSize: 'var(--fs-body-s)',
                  lineHeight: 'var(--lh-body)',
                  color: 'var(--text-secondary)',
                }}
              >
                {row}
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  )
}

function extensionOf(name: string): string {
  const ext = name.split('.').pop()
  return ext && ext.length <= 4 ? ext : 'Doc'
}
