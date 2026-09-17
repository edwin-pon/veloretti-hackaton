import { useRef, useState } from 'react'
import { DEFS, substitute } from '../data/docs'
import { AlertBanner } from '../ds'
import { useStore } from '../lib/store'

const CARD: React.CSSProperties = {
  background: '#fff',
  borderRadius: 20,
  padding: 24,
  boxShadow: '0 2px 8px rgba(0,44,71,0.08)',
}

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
      <button
        type="button"
        onClick={() => go('hub')}
        style={{
          border: 'none',
          background: 'none',
          padding: 0,
          font: 'inherit',
          fontSize: 14,
          fontWeight: 700,
          color: 'var(--slate)',
          cursor: 'pointer',
          marginBottom: 20,
        }}
      >
        ← Back to onboarding
      </button>

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
        {def.title}
      </h1>
      <p
        style={{
          fontSize: 18,
          lineHeight: 1.7,
          color: 'var(--ink-secondary)',
          margin: '0 0 32px',
          maxWidth: '62ch',
          textWrap: 'pretty',
        }}
      >
        {substitute(def.intro, brand)}
      </p>

      {state.error && (
        <div style={{ marginBottom: 24 }}>
          <AlertBanner variant="error" title="Analysis failed">
            {state.error}
          </AlertBanner>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 24, alignItems: 'start' }}>
        <div style={CARD}>
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
            className="dl-drop"
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
              border: `2px dashed ${upload || dragging ? 'var(--mint)' : '#C6D2E0'}`,
              background: dragging ? '#eaf1f8' : 'var(--mist)',
              borderRadius: 20,
              padding: '48px 24px',
              textAlign: 'center',
              cursor: 'pointer',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 22,
                fontWeight: 700,
                color: 'var(--ink-heading)',
                marginBottom: 8,
              }}
            >
              Drop your document here
            </div>
            <div style={{ fontSize: 14, color: 'var(--slate)' }}>
              PDF, DOCX or Markdown · up to 40 MB
            </div>
            <div
              style={{
                display: 'inline-block',
                marginTop: 20,
                background: 'var(--navy)',
                color: '#fff',
                borderRadius: 20,
                padding: '12px 24px',
                fontSize: 15,
                fontWeight: 700,
                letterSpacing: '0.5px',
              }}
            >
              Browse files
            </div>
          </div>

          <div
            style={{
              marginTop: 14,
              fontSize: 13,
              color: 'var(--slate)',
              textAlign: 'center',
            }}
          >
            No document to hand?{' '}
            <button
              type="button"
              onClick={() => pickFile()}
              style={{
                border: 'none',
                background: 'none',
                padding: 0,
                font: 'inherit',
                fontSize: 13,
                fontWeight: 700,
                color: 'var(--navy)',
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
            >
              Use the sample {substitute(def.file, brand)}
            </button>
          </div>

          {upload && (
            <div style={{ marginTop: 24 }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  background: 'var(--mist)',
                  borderRadius: 20,
                  padding: '16px 20px',
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    flex: 'none',
                    borderRadius: 12,
                    background: 'var(--sky)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 11,
                    fontWeight: 700,
                    color: 'var(--navy)',
                  }}
                >
                  {extensionOf(upload.name)}
                </div>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div
                    style={{
                      fontSize: 15,
                      fontWeight: 700,
                      color: 'var(--ink-heading)',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {upload.name}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--slate)' }}>{upload.meta}</div>
                </div>
                <button
                  type="button"
                  onClick={removeFile}
                  style={{
                    border: 'none',
                    background: 'none',
                    font: 'inherit',
                    fontSize: 13,
                    color: 'var(--slate)',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                  }}
                >
                  Remove
                </button>
              </div>

              <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginTop: 24 }}>
                <button
                  type="button"
                  onClick={startAnalysis}
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
                  }}
                >
                  Start analysis
                </button>
                <span style={{ fontSize: 13, color: 'var(--slate)' }}>Takes about 40 seconds</span>
              </div>
            </div>
          )}
        </div>

        <div style={CARD}>
          <div
            style={{
              fontSize: 12,
              letterSpacing: '1px',
              fontWeight: 700,
              color: 'var(--slate)',
              marginBottom: 16,
            }}
          >
            WHAT THE AGENT EXTRACTS
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {def.extracts.map((row) => (
              <div key={row} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 999,
                    background: 'var(--mint)',
                    marginTop: 7,
                    flex: 'none',
                  }}
                />
                <span style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--ink-secondary)' }}>
                  {row}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function extensionOf(name: string): string {
  const ext = name.split('.').pop()
  return ext && ext.length <= 4 ? ext.toUpperCase() : 'DOC'
}
