import styles from './Campaigns.module.css';
import { campaigns } from '../../data/campaigns';
import type { Campaign } from '../../data/campaigns';
import { platforms } from '../../data/markets';
import { useAppStore } from '../../store/appStore';
import { Badge, Button, Card, ProgressBar, cx } from '../../design-system';

const BADGE_VARIANT = {
  Draft: 'info',
  'In review': 'warn',
  Scheduled: 'ok',
  Approved: 'ok',
  Archived: 'neutral',
} as const;

export function CampaignsScreen() {
  const state = useAppStore();

  const renderPercent = (campaign: Campaign) => {
    if (state.renderCampaign === campaign.name) return state.renderProgress;
    return campaign.status === 'Archived' ? 100 : 0;
  };

  const renderNote = (campaign: Campaign) => {
    if (state.renderCampaign === campaign.name) {
      const percent = state.renderProgress;
      return percent >= 100
        ? `${state.renderTotal} files rendered`
        : `${Math.round(percent)}% · ${state.renderTotal} files queued`;
    }
    return campaign.status === 'Archived' ? 'Rendered and archived' : 'Not queued';
  };

  return (
    <div className={styles.page}>
      <div className={styles.head}>
        <div>
          <h1 className={styles.title}>Campaigns</h1>
          <p className={styles.lede}>
            Each campaign carries its own brief, chat history and asset canvas.
          </p>
        </div>
        <Button onClick={() => state.go('campaignStart')}>New campaign</Button>
      </div>

      <div className={styles.list}>
        {campaigns.map((campaign) => {
          const percent = renderPercent(campaign);
          const canDownload = percent >= 100;
          return (
            <Card key={campaign.id} className={styles.row}>
              <div>
                <div className={styles.rowName}>
                  <span className={styles.rowTitle}>{campaign.name}</span>
                  <Badge variant={BADGE_VARIANT[campaign.status]}>
                    {campaign.status}
                  </Badge>
                </div>
                <p className={styles.rowMeta}>
                  {campaign.window} · {campaign.owner}
                </p>
              </div>

              <div>
                <p className={styles.cellLabel}>Markets</p>
                <p className={styles.cellValue}>
                  {campaign.marketKeys.map((key) => key.toUpperCase()).join(', ')}
                </p>
              </div>

              <div>
                <p className={styles.cellLabel}>Channels</p>
                <p className={styles.cellValue}>{campaign.channels}</p>
              </div>

              <div>
                <p className={styles.cellLabel}>Assets</p>
                <p className={styles.cellValue}>
                  {campaign.marketKeys.length * platforms.length} assets
                  {' · '}
                  <span
                    className={cx(campaign.flagged ? styles.flagged : styles.clean)}
                  >
                    {campaign.flagged ? `${campaign.flagged} flagged` : 'No flags'}
                  </span>
                </p>
              </div>

              <div>
                <p className={styles.cellLabel}>Render</p>
                <ProgressBar
                  value={percent}
                  size="thin"
                  tone={percent >= 100 ? 'ok' : 'ink'}
                  label={`${campaign.name} render progress`}
                />
                <div className={styles.renderNote}>
                  <span>{renderNote(campaign)}</span>
                  {canDownload && (
                    <Button variant="ghost" size="sm" style={{ height: 24, padding: 0 }}>
                      Download
                    </Button>
                  )}
                </div>
              </div>

              <div className={styles.rowActions}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => state.openCanvas(campaign.name)}
                >
                  Canvas
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => state.openCampaign(campaign.name)}
                >
                  {campaign.status === 'Archived' ? 'View' : 'Open draft'}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
