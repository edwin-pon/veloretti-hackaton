import { useMemo } from 'react'
import { Badge, Button, Label } from '../ds'
import { useCampaign } from '../lib/campaign-store'
import { bundles, briefText, exportRows, toCsv } from '../lib/matrix'
import { useStore } from '../lib/store'

/**
 * Stage [8], the handoff.
 *
 * Everything here was decided by the matrix, so this composes nothing new: it
 * writes out the brief and the filename for every slot, grouped the way the
 * platforms take them. The filename is the contract, and the manifest is what
 * makes a rendered file traceable back to the line of the brief it came from.
 *
 * What is deliberately not here: headlines, sublines and visuals. Those are
 * the copy and visual stages, and claiming them on this screen would be
 * claiming work that has not been done.
 */
export default function ExportScreen() {
  const { go } = useStore()
  const { campaign, matrix, summary } = useCampaign()

  const rows = useMemo(() => exportRows(matrix.slots), [matrix])
  const perPlatform = useMemo(() => bundles(matrix.slots), [matrix])
  const stem = slug(campaign.meta.name || 'campaign')

  const download = (name: string, body: string, type: string) => {
    const url = URL.createObjectURL(new Blob([body], { type }))
    const link = document.createElement('a')
    link.href = url
    link.download = name
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div>
      <button
        type="button"
        className="vr-underline"
        onClick={() => go('matrix')}
        style={{ fontSize: 'var(--fs-body-s)', marginBottom: 32 }}
      >
        Back to the matrix
      </button>

      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: 32,
          flexWrap: 'wrap',
          marginBottom: 40,
        }}
      >
        <div style={{ minWidth: 0 }}>
          <Label>Handoff</Label>
          <h1 style={{ fontSize: 'var(--fs-display-m)', margin: '18px 0 12px', maxWidth: '20ch' }}>
            {summary.total} briefs, ready to hand over.
          </h1>
          <p
            style={{
              fontSize: 'var(--fs-body-l)',
              lineHeight: 'var(--lh-body)',
              color: 'var(--text-secondary)',
              margin: 0,
              maxWidth: '58ch',
              textWrap: 'pretty',
            }}
          >
            Every slot now carries its brief and the filename it will be delivered under. The
            manifest is the contract: a rendered file traces back to the line of the brief it came
            from, and nothing arrives unaccounted for.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center', flex: 'none', flexWrap: 'wrap' }}>
          <Button
            variant="secondary"
            onClick={() => download(`${stem}-manifest.csv`, toCsv(rows), 'text/csv')}
          >
            Download manifest (CSV)
          </Button>
          <Button
            onClick={() =>
              download(
                `${stem}-briefs.json`,
                JSON.stringify({ campaign: campaign.meta, slots: matrix.slots }, null, 2),
                'application/json',
              )
            }
          >
            Download briefs (JSON)
          </Button>
        </div>
      </div>

      <section style={{ marginBottom: 56 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 20 }}>
          <h2 style={{ fontSize: 'var(--fs-h3)' }}>Bundles</h2>
          <span style={{ fontSize: 'var(--fs-caption)', color: 'var(--text-muted)' }}>
            one per platform, in the ratios it runs
          </span>
        </div>
        <div style={{ borderTop: '1px solid var(--border-default)' }}>
          {perPlatform.map((bundle) => (
            <div
              key={bundle.platform}
              className="vr-row"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 24,
                flexWrap: 'wrap',
                padding: '20px 0',
                borderBottom: '1px solid var(--border-subtle)',
              }}
            >
              <span style={{ width: 140, flex: 'none', fontSize: 'var(--fs-body)', fontWeight: 500 }}>
                {bundle.platform}
              </span>
              <span style={{ width: 120, flex: 'none', fontSize: 'var(--fs-body-s)' }}>
                {bundle.count} files
              </span>
              <span style={{ fontSize: 'var(--fs-body-s)', color: 'var(--text-muted)' }}>
                {bundle.ratios.join(' · ')}
              </span>
              <span style={{ marginLeft: 'auto', fontSize: 'var(--fs-caption)', color: 'var(--text-muted)' }}>
                {stem}-{bundle.platform.toLowerCase()}.zip
              </span>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: 56 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 20 }}>
          <h2 style={{ fontSize: 'var(--fs-h3)' }}>Manifest</h2>
          <span style={{ fontSize: 'var(--fs-caption)', color: 'var(--text-muted)' }}>
            first 12 of {rows.length}, the download has all of them
          </span>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: 'var(--fs-body-s)' }}>
            <thead>
              <tr>
                {['File', 'Market', 'Phase', 'Asset', 'In market', 'CTA'].map((head) => (
                  <th
                    key={head}
                    style={{
                      textAlign: 'left',
                      padding: '0 20px 12px 0',
                      borderBottom: '1px solid var(--border-default)',
                      fontWeight: 400,
                    }}
                  >
                    <Label>{head}</Label>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.slice(0, 12).map((row) => (
                <tr key={row.file} className="vr-row">
                  <Td>{row.file}</Td>
                  <Td>{row.market}</Td>
                  <Td>{row.phase}</Td>
                  <Td>{row.assetType}</Td>
                  <Td>{row.flightDate}</Td>
                  <Td>{row.cta}</Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section style={{ marginBottom: 56 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 20 }}>
          <h2 style={{ fontSize: 'var(--fs-h3)' }}>A drafted brief</h2>
          <span style={{ fontSize: 'var(--fs-caption)', color: 'var(--text-muted)' }}>
            what each file is delivered with
          </span>
        </div>
        {matrix.slots.slice(0, 1).map((slot) => (
          <article
            key={slot.id}
            style={{
              background: 'var(--surface-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-lg)',
              padding: 28,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
              <div style={{ fontSize: 'var(--fs-body)', fontWeight: 500 }}>{slot.id}</div>
              <Badge variant="outline">{slot.phase}</Badge>
            </div>
            <pre
              style={{
                margin: '18px 0 0',
                padding: '20px 24px',
                background: 'var(--surface-sand)',
                borderRadius: 'var(--radius-md)',
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--fs-body-s)',
                lineHeight: 'var(--lh-body)',
                whiteSpace: 'pre-wrap',
              }}
            >
              {briefText(slot.brief)}
            </pre>
          </article>
        ))}
      </section>

      <div
        style={{
          background: 'var(--surface-inverse)',
          color: 'var(--text-inverse)',
          padding: '48px var(--container-gutter)',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: 32,
          flexWrap: 'wrap',
        }}
      >
        <div style={{ minWidth: 0 }}>
          <Label style={{ color: 'var(--vr-gray-300)' }}>Not in this export</Label>
          <h2 style={{ fontSize: 'var(--fs-h2)', margin: '16px 0 12px', maxWidth: '22ch' }}>
            Headlines and visuals are the next two stages.
          </h2>
          <p
            style={{
              fontSize: 'var(--fs-body)',
              lineHeight: 'var(--lh-body)',
              color: 'var(--vr-gray-300)',
              margin: 0,
              maxWidth: '54ch',
              textWrap: 'pretty',
            }}
          >
            Everything up to here is templating, which is why it is deterministic and why the same
            briefing always lands on the same {rows.length} files. Writing the copy and selecting
            the visuals is where a model comes in, and neither is claimed here.
          </p>
        </div>
      </div>
    </div>
  )
}

function Td({ children }: { children: React.ReactNode }) {
  return (
    <td
      style={{
        padding: '14px 20px 14px 0',
        borderBottom: '1px solid var(--border-subtle)',
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </td>
  )
}

function slug(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'campaign'
}
