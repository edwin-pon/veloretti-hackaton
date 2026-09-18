import styles from './Campaigns.module.css';
import { brandOf } from '../../data/brands';
import { documentOrder } from '../../data/documents';
import { useAppStore } from '../../store/appStore';
import { documentsDone } from '../../store/selectors';
import { Badge, Button, Card, Eyebrow } from '../../design-system';

const BRAND_CHIPS = ['Tone and voice', 'Markets', 'Palette and fonts', 'Legal rules'];

export function CampaignStartScreen() {
  const state = useAppStore();
  const brand = brandOf(state.brandKey);
  const done = documentsDone(state);
  const doneCount = documentOrder.filter((key) => done[key]).length;

  return (
    <div className={styles.page}>
      <div>
        <h1 className={styles.title}>New campaign</h1>
        <p className={styles.lede}>
          Start from your confirmed brand knowledge, or start clean and let the agent ask
          for what it needs.
        </p>
      </div>

      <div className={styles.startGrid}>
        <Card className={styles.startCard}>
          <Badge variant="ok" style={{ alignSelf: 'flex-start' }}>
            Recommended
          </Badge>
          <div>
            <h2 className={styles.startTitle}>With brand data</h2>
            <p className={styles.startBody}>
              Tone, markets, palette, typefaces and legal rules are applied and checked as
              the agent drafts.
            </p>
          </div>

          <div className={styles.chipRow}>
            {BRAND_CHIPS.map((chip) => (
              <span key={chip} className={styles.chip}>
                {chip}
              </span>
            ))}
          </div>

          <p className={styles.note}>
            {doneCount === documentOrder.length
              ? 'All three sources confirmed'
              : `${doneCount} of 3 sources confirmed — the agent will ask about the rest`}
          </p>

          <div className={styles.startFoot}>
            <Button full onClick={() => state.startCampaign('brand')}>
              Use {brand.name} brand data
            </Button>
          </div>
        </Card>

        <Card className={styles.startCard} tone="panel">
          <Badge variant="neutral" style={{ alignSelf: 'flex-start' }}>
            No rules applied
          </Badge>
          <div>
            <h2 className={styles.startTitle}>Start clean</h2>
            <p className={styles.startBody}>
              Nothing is assumed. The agent interviews you for the product, market, tone
              and any claims it may use.
            </p>
          </div>

          <p className={styles.note}>
            Legal and style checks stay off until brand data is connected. You can attach
            it to this campaign later.
          </p>

          <Eyebrow>Four questions, about a minute</Eyebrow>

          <div className={styles.startFoot}>
            <Button variant="secondary" full onClick={() => state.startCampaign('clean')}>
              Start clean
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
