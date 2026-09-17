import { useRef, useState } from 'react'
import { BRIEFING } from '../data/briefing'
import { Button, Label, Notice } from '../ds'
import { useCampaign } from '../lib/campaign-store'
import { useStore } from '../lib/store'

export default function BriefUploadScreen() {
  const { go } = useStore()
  const { state, pickFile, removeFile, read } = useCampaign()
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)
  const upload = state.upload

  const accept = (files: FileList | null) => {
    const file = files?.[0]
    if (file) pickFile(file)
  }

  return (
    <div>
      <button
        type="button"
        className="vr-underline"
        onClick={() => go('campaign-start')}
        style={{ fontSize: 'var(--fs-body-s)', marginBottom: 32 }}
      >
        Back to start options
      </button>

      <Label>Campaign brief</Label>
      <h1 style={{ fontSize: 'var(--fs-display-m)', margin: '18px 0 20px' }}>
        Hand over the growth briefing.
      </h1>
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
        A growth briefing is a grid rather than a document: one concept projected onto ads, a
        landing page and a newsletter. The agent reads the parameters behind that grid, so the
        studio can resolve it instead of anyone placing the frames by hand.
      </p>

      {state.error && (
        <div style={{ marginBottom: 32 }}>
          <Notice title="Reading the briefing failed" tone="attention">
            {state.error}
          </Notice>
        </div>
      )}

      <div
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
            accept=".pdf,.docx,.md,.markdown,.fig,application/pdf"
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
            <div style={{ fontSize: 'var(--fs-h3)', marginBottom: 10 }}>
              Drop the growth briefing here
            </div>
            <div style={{ fontSize: 'var(--fs-body-s)', color: 'var(--text-muted)' }}>
              Figma export, PDF, DOCX or Markdown · up to 40 MB
            </div>
            <div style={{ marginTop: 28, display: 'flex', justifyContent: 'center' }}>
              <Button variant="secondary" as="button">
                Browse files
              </Button>
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
            No briefing to hand?{' '}
            <button
              type="button"
              className="vr-underline"
              onClick={() => pickFile()}
              style={{ fontSize: 'var(--fs-caption)' }}
            >
              Use the sample {BRIEFING.file}
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
                <Button onClick={read}>Read the brief</Button>
                <span style={{ fontSize: 'var(--fs-caption)', color: 'var(--text-muted)' }}>
                  Takes about 15 seconds
                </span>
              </div>
            </div>
          )}
        </div>

        <aside>
          <Label>What the agent looks for</Label>
          <div style={{ marginTop: 20 }}>
            {BRIEFING.looksFor.map((row) => (
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

          <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid var(--border-subtle)' }}>
            <p
              style={{
                fontSize: 'var(--fs-body-s)',
                lineHeight: 'var(--lh-body)',
                color: 'var(--text-muted)',
                margin: 0,
                textWrap: 'pretty',
              }}
            >
              Layer names are never read. In the source briefing all 458 ad frames shared one layer
              name left over from a previous campaign, and it contradicted every frame's contents.
            </p>
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
