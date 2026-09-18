import styles from './Knowledge.module.css';
import { brandOf, forBrand } from '../../data/brands';
import { campaigns } from '../../data/campaigns';
import { documentByKey, documentOrder, sourceDocuments } from '../../data/documents';
import { platforms } from '../../data/markets';
import { useAppStore } from '../../store/appStore';
import { documentsDone } from '../../store/selectors';
import { Badge, Button, Card, Eyebrow } from '../../design-system';

const CAMPAIGN_BADGE = {
  Draft: 'info',
  'In review': 'warn',
  Scheduled: 'ok',
  Approved: 'ok',
  Archived: 'neutral',
} as const;

function hexOf(value: unknown, fallback: string) {
  const match = /#[0-9a-fA-F]{3,6}/.exec(String(value ?? ''));
  return match ? match[0] : fallback;
}

function familyOf(value: unknown, fallback: string) {
  const family = String(value ?? '').split('—')[0].split(',')[0].trim();
  return family ? `"${family}", ${fallback}` : fallback;
}

function weightOf(value: unknown, fallback: number) {
  const match = /\b([1-9]00)\b/.exec(String(value ?? ''));
  if (match) return Number(match[1]);
  if (/bold/i.test(String(value ?? ''))) return 700;
  if (/medium/i.test(String(value ?? ''))) return 500;
  return fallback;
}

export function DashboardScreen() {
  const state = useAppStore();
  const brand = brandOf(state.brandKey);
  const done = documentsDone(state);
  const doneCount = documentOrder.filter((key) => done[key]).length;
  const allDone = doneCount === documentOrder.length;

  const confirmedFields = documentOrder
    .filter((key) => done[key])
    .flatMap((key) =>
      documentByKey(key).sections.flatMap((section) => section.fields),
    );
  const advisory = confirmedFields.filter(
    (field) => field.conf < 70 && !state.touched[field.key],
  );
  const averageConfidence = confirmedFields.length
    ? `${Math.round(
        confirmedFields.reduce((total, field) => total + field.conf, 0) /
          confirmedFields.length,
      )}%`
    : '—';

  const attention = documentOrder
    .filter((key) => done[key])
    .flatMap((key) =>
      documentByKey(key)
        .sections.flatMap((section) => section.fields)
        .filter((field) => field.conf < 70 && !state.touched[field.key])
        .map((field) => ({ field, doc: key })),
    )
    .slice(0, 5);

  const markets = Array.isArray(state.values.b4) ? state.values.b4 : [];
  const tone = Array.isArray(state.values.b6) ? state.values.b6 : [];
  const blocked = Array.isArray(state.values.b7) ? state.values.b7 : [];
  const neutrals = Array.isArray(state.values.c3) ? state.values.c3 : [];

  return (
    <div className={styles.page}>
      <div className={styles.head}>
        <div>
          <Eyebrow>{brand.name}</Eyebrow>
          <h1 className={styles.title}>Brand dashboard</h1>
          <p className={styles.lede}>
            {allDone
              ? 'All three sources confirmed. Every campaign draft is checked against these rules before it can be scheduled.'
              : `${doneCount} of 3 sources confirmed. Campaigns run with partial rules until onboarding is finished.`}
          </p>
        </div>
        <div className={styles.actions}>
          <Button variant="secondary" onClick={() => state.go('hub')}>
            {allDone ? 'Review sources' : 'Continue onboarding'}
          </Button>
          <Button onClick={() => state.go('campaignStart')}>New campaign</Button>
        </div>
      </div>

      <div className={styles.stats}>
        <Card>
          <p className={styles.statValue}>{confirmedFields.length}</p>
          <p className={styles.statLabel}>Rules active across campaigns</p>
          <p className={styles.statTag}>
            {confirmedFields.length
              ? `${advisory.length} advisory`
              : 'Confirm a source to activate rules'}
          </p>
        </Card>
        <Card>
          <p className={styles.statValue}>{doneCount} of 3</p>
          <p className={styles.statLabel}>Sources confirmed</p>
          <p className={styles.statTag}>
            {allDone
              ? 'Brand · Legal · Style'
              : `${documentOrder
                  .filter((key) => !done[key])
                  .map((key) => documentByKey(key).card)
                  .join(' · ')} outstanding`}
          </p>
        </Card>
        <Card>
          <p className={styles.statValue}>{averageConfidence}</p>
          <p className={styles.statLabel}>Average extraction confidence</p>
          <p className={styles.statTag}>
            {confirmedFields.length
              ? `${Object.keys(state.touched).length} fields edited by you`
              : 'Nothing extracted yet'}
          </p>
        </Card>
      </div>

      <div className={styles.split}>
        <Card>
          <h2 className={styles.panelTitle}>Identity</h2>
          {!done.brand ? (
            <>
              <p className={styles.emptyBody}>
                Upload the brand book to fill this in. Positioning, markets and tone are
                read from it and applied to every generated campaign.
              </p>
              <Button
                variant="secondary"
                onClick={() =>
                  state.go('upload', { doc: 'brand', file: false, why: null })
                }
              >
                Upload brand book
              </Button>
            </>
          ) : (
            <>
              {[
                { label: 'Positioning', value: state.values.b2 },
                { label: 'Mission', value: state.values.b3 },
                { label: 'Reading level', value: state.values.b8 },
              ].map((row) => (
                <div key={row.label} className={styles.identityRow}>
                  <p className={styles.identityLabel}>{row.label}</p>
                  <p className={styles.identityValue}>{String(row.value)}</p>
                </div>
              ))}

              <Eyebrow style={{ marginTop: 'var(--space-4)' }}>Markets</Eyebrow>
              <div className={styles.chipRow}>
                {markets.map((market) => (
                  <span key={market} className={styles.chip}>
                    {market}
                  </span>
                ))}
              </div>

              <Eyebrow>Tone</Eyebrow>
              <div className={styles.chipRow}>
                {tone.map((attribute) => (
                  <span key={attribute} className={styles.chip}>
                    {attribute}
                  </span>
                ))}
              </div>

              <p className={styles.blocked}>
                Blocked at generation: {blocked.join(' · ')}
              </p>
            </>
          )}
        </Card>

        <Card>
          <h2 className={styles.panelTitle}>Look and type</h2>
          {!done.style ? (
            <>
              <p className={styles.emptyBody}>
                Upload the style guide to fill this in. The palette and typefaces here are
                what generated assets use.
              </p>
              <Button
                variant="secondary"
                onClick={() =>
                  state.go('upload', { doc: 'style', file: false, why: null })
                }
              >
                Upload style guide
              </Button>
            </>
          ) : (
            <>
              <div className={styles.swatchRow}>
                {[
                  { label: 'Primary', value: state.values.c1, fallback: '#1A1A1A' },
                  { label: 'Accent', value: state.values.c2, fallback: '#FE5900' },
                ].map((swatch) => (
                  <div key={swatch.label} className={styles.swatch}>
                    <div
                      className={styles.swatchChip}
                      style={{ background: hexOf(swatch.value, swatch.fallback) }}
                    />
                    <div className={styles.swatchBody}>
                      <p className={styles.swatchLabel}>{swatch.label}</p>
                      <p className={styles.swatchValue}>{String(swatch.value)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.neutrals}>
                {neutrals.map((neutral) => (
                  <span
                    key={neutral}
                    className={styles.neutral}
                    style={{ background: neutral }}
                    title={neutral}
                  />
                ))}
              </div>

              <div className={styles.typeSpecimen}>
                <p
                  style={{
                    fontFamily: familyOf(state.values.f1, 'Helvetica Neue, Arial, sans-serif'),
                    fontSize: 24,
                    fontWeight: weightOf(state.values.f1, 500),
                    letterSpacing: '-0.02em',
                    lineHeight: 1.2,
                  }}
                >
                  Ninety kilometres on one charge
                </p>
                <p className={styles.typeMeta}>{String(state.values.f1)}</p>
                <p
                  style={{
                    marginTop: 14,
                    fontFamily: familyOf(state.values.f2, 'Helvetica Neue, Arial, sans-serif'),
                    fontSize: 15,
                    fontWeight: weightOf(state.values.f2, 400),
                  }}
                >
                  Engineered for daily distance, sold and serviced through independent
                  dealers.
                </p>
                <p className={styles.typeMeta}>{String(state.values.f2)}</p>
              </div>
            </>
          )}
        </Card>
      </div>

      <div className={styles.split}>
        <Card>
          <h2 className={styles.panelTitle}>Sources</h2>
          {documentOrder.map((key) => {
            const doc = sourceDocuments.find((item) => item.key === key)!;
            const isDone = Boolean(done[key]);
            const isNext = !isDone && documentOrder.find((item) => !done[item]) === key;
            return (
              <div key={key} className={styles.row}>
                <div className={styles.rowBody}>
                  <p className={styles.rowTitle}>{doc.card}</p>
                  <p className={styles.rowMeta}>
                    {isDone
                      ? `${forBrand(doc.file, brand)} · confirmed today`
                      : isNext
                        ? 'No document yet · next in onboarding'
                        : 'No document yet'}
                  </p>
                </div>
                <Badge variant={isDone ? 'ok' : isNext ? 'ink' : 'neutral'}>
                  {isDone ? 'Confirmed' : isNext ? 'Next up' : 'Not started'}
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    state.go(isDone ? 'review' : 'upload', {
                      doc: key,
                      file: false,
                      why: null,
                    })
                  }
                >
                  {isDone ? 'Open' : 'Upload'}
                </Button>
              </div>
            );
          })}
        </Card>

        <Card>
          <h2 className={styles.panelTitle}>Needs your attention</h2>
          {attention.length === 0 ? (
            <p className={styles.quiet}>
              {allDone
                ? 'Nothing flagged. Every extracted rule is either high confidence or confirmed by you.'
                : doneCount === 0
                  ? 'Nothing to review yet. Confirm a source and the agent will flag what it was unsure about.'
                  : 'Nothing flagged in the sources you have confirmed so far.'}
            </p>
          ) : (
            attention.map(({ field, doc }) => (
              <div key={field.key} className={styles.row}>
                <div className={styles.rowBody}>
                  <p className={styles.rowTitle}>{field.label}</p>
                  <p className={styles.rowMeta}>
                    {documentByKey(doc).card} · {field.conf}% confidence
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => state.go('review', { doc, why: field.key })}
                >
                  Review
                </Button>
              </div>
            ))
          )}
        </Card>
      </div>

      <Card>
        <div className={styles.panelHead}>
          <h2 className={styles.panelTitle} style={{ marginBottom: 0 }}>
            Campaigns using this brand
          </h2>
          <Button variant="ghost" size="sm" onClick={() => state.go('campaigns')}>
            All campaigns
          </Button>
        </div>
        {campaigns.slice(0, 3).map((campaign) => (
          <div key={campaign.id} className={styles.row}>
            <div className={styles.rowBody}>
              <p className={styles.rowTitle}>{campaign.name}</p>
              <p className={styles.rowMeta}>
                {campaign.marketKeys.map((key) => key.toUpperCase()).join(', ')} ·{' '}
                {campaign.marketKeys.length * platforms.length} assets
              </p>
            </div>
            <Badge variant={CAMPAIGN_BADGE[campaign.status]}>{campaign.status}</Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => state.openCampaign(campaign.name)}
            >
              Open
            </Button>
          </div>
        ))}
      </Card>
    </div>
  );
}
