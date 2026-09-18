import styles from './Canvas.module.css';
import type { CanvasModel } from './canvasModel';
import { checkAsset } from '../../data/compliance';
import { platforms } from '../../data/markets';
import { parseAssetId, useAppStore } from '../../store/appStore';
import { Badge, Button, Eyebrow, IconClose } from '../../design-system';

export interface CompliancePanelProps {
  model: CanvasModel;
}

/** What the compliance agent found on one asset, and the approval actions that
 *  follow from it. Blocking issues have to be fixed before approval. */
export function CompliancePanel({ model }: CompliancePanelProps) {
  const state = useAppStore();
  const id = state.compOpenId;
  if (!id) return null;

  const card = model.allCards.find((item) => item.id === id);
  if (!card) return null;

  const parts = parseAssetId(id);
  const label = [parts.market?.name, parts.platform?.name, parts.audience?.name]
    .filter(Boolean)
    .join(' · ');

  const approval = card.approval;
  const canApprove = state.compRun && card.blockers === 0 && !approval;

  const summary = !state.compRun
    ? 'Not checked yet'
    : card.violations.length === 0
      ? 'Passes every rule'
      : card.blockers
        ? `${card.blockers} blocked · ${card.violations.length - card.blockers} to fix`
        : `${card.violations.length} to fix`;

  const approvalNote =
    approval === 'approved'
      ? 'Approved by Mara Feldt · ready to schedule'
      : approval === 'review'
        ? 'Sent to Anna Lindqvist for legal sign-off'
        : !state.compRun
          ? 'Run the compliance check before approving.'
          : card.blockers
            ? 'Blocked. Fix the issues above, then approve.'
            : 'Passes every rule. Approve it or send it for legal sign-off.';

  const approveMarket = () => {
    const suffix = parts.audience ? `--${parts.audience.id}` : '';
    const items = state.canvasItems ?? {};
    const approvable = platforms
      .map((platform) => `${parts.market?.key}-${platform.key}${suffix}`)
      .filter((assetId) => {
        const asset = items[assetId] ?? items[assetId.split('--')[0]];
        return !checkAsset(asset, parts.market?.locale).some(
          (violation) => violation.severity === 'block',
        );
      });
    state.setApproval(approvable, 'approved');
  };

  return (
    <aside
      className={`${styles.panel} ${styles.panelLeft}`}
      aria-label="Compliance result"
    >
      <div className={styles.panelHead}>
        <div>
          <Eyebrow>Compliance agent</Eyebrow>
          <p className={styles.panelTitle}>{label}</p>
          <p className={styles.panelSub}>{summary}</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          aria-label="Close"
          onClick={() => state.patch({ compOpenId: null })}
        >
          <IconClose size={15} />
        </Button>
      </div>

      {!state.compRun && (
        <div className={styles.panelGroup}>
          <p className={styles.quiet}>This asset has not been checked yet.</p>
          <Button size="sm" onClick={state.runCompliance}>
            Run the check
          </Button>
        </div>
      )}

      {state.compRun && card.violations.length === 0 && (
        <p className={styles.quiet}>Passes every confirmed legal and style rule.</p>
      )}

      {card.violations.map((violation) => (
        <div key={violation.id} className={styles.issue}>
          <div className={styles.issueHead}>
            <Badge variant={violation.severity === 'block' ? 'block' : 'warn'}>
              {violation.severity === 'block' ? 'Blocked' : 'Fix'}
            </Badge>
            <span className={styles.issueSource}>{violation.source}</span>
          </div>
          <p className={styles.issueLabel}>{violation.label}</p>
          <p className={styles.issueFix}>{violation.fix}</p>
        </div>
      ))}

      <div className={styles.approvalBlock}>
        <Eyebrow>Approval</Eyebrow>
        <p className={styles.approvalNote}>{approvalNote}</p>

        <div className={styles.buttonStack}>
          {canApprove && (
            <>
              <Button size="sm" onClick={() => state.setApproval([id], 'approved')}>
                Approve asset
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => state.setApproval([id], 'review')}
              >
                Send for legal review
              </Button>
              <Button variant="ghost" size="sm" onClick={approveMarket}>
                Approve all {parts.market?.name} assets
              </Button>
            </>
          )}

          {approval === 'approved' && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => state.setApproval([id], null)}
            >
              Withdraw approval
            </Button>
          )}

          {approval === 'review' && (
            <>
              <Button size="sm" onClick={() => state.setApproval([id], 'approved')}>
                Mark approved
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => state.setApproval([id], null)}
              >
                Recall from review
              </Button>
            </>
          )}
        </div>
      </div>
    </aside>
  );
}
