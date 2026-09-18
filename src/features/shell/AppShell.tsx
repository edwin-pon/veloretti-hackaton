import styles from './AppShell.module.css';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { useAppStore } from '../../store/appStore';
import { AnalyzingScreen } from '../onboarding/AnalyzingScreen';
import { HubScreen } from '../onboarding/HubScreen';
import { ReviewScreen } from '../onboarding/ReviewScreen';
import { UploadScreen } from '../onboarding/UploadScreen';
import { DashboardScreen } from '../knowledge/DashboardScreen';
import { KnowledgeBaseScreen } from '../knowledge/KnowledgeBaseScreen';
import { CampaignsScreen } from '../campaigns/CampaignsScreen';
import { CampaignStartScreen } from '../campaigns/CampaignStartScreen';
import { CampaignBriefScreen } from '../campaigns/CampaignBriefScreen';
import { BriefAnalyzingScreen } from '../campaigns/BriefAnalyzingScreen';
import { DirectionsScreen } from '../campaigns/DirectionsScreen';
import { CampaignScreen } from '../campaigns/CampaignScreen';
import { CanvasScreen } from '../canvas/CanvasScreen';
import { MediaScreen } from '../media/MediaScreen';
import { WorkspaceScreen } from '../admin/WorkspaceScreen';
import { ActivityScreen } from '../admin/ActivityScreen';
import { SettingsScreen } from '../admin/SettingsScreen';
import { cx } from '../../design-system';

/** The canvas manages its own scrolling and fills the viewport. */
const FLUSH_SCREENS = new Set(['canvas']);
const WIDE_SCREENS = new Set([
  'media',
  'campaigns',
  'campaign',
  'workspace',
  'activity',
  'settings',
]);

function ScreenSwitch() {
  const screen = useAppStore((state) => state.screen);

  switch (screen) {
    case 'hub':
      return <HubScreen />;
    case 'upload':
      return <UploadScreen />;
    case 'analyzing':
      return <AnalyzingScreen />;
    case 'review':
      return <ReviewScreen />;
    case 'dashboard':
      return <DashboardScreen />;
    case 'kb':
      return <KnowledgeBaseScreen />;
    case 'campaigns':
      return <CampaignsScreen />;
    case 'campaignStart':
      return <CampaignStartScreen />;
    case 'campaignBrief':
      return <CampaignBriefScreen />;
    case 'briefAnalyzing':
      return <BriefAnalyzingScreen />;
    case 'dirAnalyzing':
      return <DirectionsScreen />;
    case 'campaign':
      return <CampaignScreen />;
    case 'canvas':
      return <CanvasScreen />;
    case 'media':
      return <MediaScreen />;
    case 'workspace':
      return <WorkspaceScreen />;
    case 'activity':
      return <ActivityScreen />;
    case 'settings':
      return <SettingsScreen />;
    default:
      return <HubScreen />;
  }
}

export function AppShell() {
  const screen = useAppStore((state) => state.screen);
  const flush = FLUSH_SCREENS.has(screen);

  return (
    <div className={styles.app}>
      <Sidebar />
      <main className={styles.main}>
        <Header />
        <div className={cx(styles.body, flush && styles.bodyFlush)}>
          {flush ? (
            <ScreenSwitch />
          ) : (
            <div className={cx(styles.page, WIDE_SCREENS.has(screen) && styles.pageWide)}>
              <ScreenSwitch />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
