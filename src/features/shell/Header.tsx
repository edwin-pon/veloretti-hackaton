import styles from './Header.module.css';
import { documentOrder } from '../../data/documents';
import { useAppStore } from '../../store/appStore';
import { crumbOf, documentsDone, sectionOf } from '../../store/selectors';
import type { Screen } from '../../store/types';
import { ProgressBar } from '../../design-system';

/** The onboarding progress meter follows the brand-knowledge section only. */
const PROGRESS_SCREENS: Screen[] = [
  'hub',
  'upload',
  'analyzing',
  'review',
  'dashboard',
  'kb',
];

export function Header() {
  const state = useAppStore();
  const section = sectionOf(state.screen);
  const crumb = crumbOf(state);

  const done = documentsDone(state);
  const doneCount = documentOrder.filter((key) => done[key]).length;
  const showProgress = PROGRESS_SCREENS.includes(state.screen);

  const onSection = () => {
    switch (section) {
      case 'Workspace':
        return state.go('workspace');
      case 'Activity':
        return state.go('activity');
      case 'Settings':
        return state.go('settings');
      case 'Media manager':
        return state.openMedia();
      case 'Campaigns':
        return state.go('campaigns');
      default:
        return state.go('dashboard');
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.crumbs}>
        <button type="button" className={styles.crumbLink} onClick={onSection}>
          {section}
        </button>
        <span aria-hidden="true">/</span>
        <span className={styles.crumbCurrent}>{crumb}</span>
      </div>

      {showProgress && (
        <div className={styles.progress}>
          <span className={styles.progressLabel}>
            {doneCount} of {documentOrder.length} sources confirmed
          </span>
          <ProgressBar
            className={styles.progressTrack}
            value={(doneCount / documentOrder.length) * 100}
            label="Onboarding progress"
          />
          <button
            type="button"
            className={styles.restart}
            onClick={state.restartOnboarding}
          >
            Restart
          </button>
        </div>
      )}
    </header>
  );
}
