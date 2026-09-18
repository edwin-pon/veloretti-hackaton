import { useEffect, useRef } from 'react';
import styles from './Sidebar.module.css';
import wordmark from '../../assets/logo/veloretti-wordmark-white.svg';
import { brands, brandOf } from '../../data/brands';
import type { BrandKey } from '../../data/brands';
import { documentOrder } from '../../data/documents';
import { knowledgePages } from '../../data/knowledge';
import { useAppStore } from '../../store/appStore';
import { activityCount } from '../../store/selectors';
import type { Screen } from '../../store/types';
import {
  Avatar,
  Eyebrow,
  IconActivity,
  IconCheck,
  IconChevronDown,
  IconImage,
  IconLayers,
  IconPlus,
  IconSettings,
  IconSparkle,
  cx,
} from '../../design-system';

const KNOWLEDGE_SCREENS: Screen[] = ['hub', 'upload', 'analyzing', 'review', 'dashboard', 'kb'];
const CAMPAIGN_SCREENS: Screen[] = [
  'campaigns',
  'campaignBrief',
  'briefAnalyzing',
  'dirAnalyzing',
  'campaign',
  'canvas',
];

export function Sidebar() {
  const state = useAppStore();
  const switcherRef = useRef<HTMLDivElement>(null);
  const brand = brandOf(state.brandKey);

  useEffect(() => {
    if (!state.brandsOpen) return;
    const onPointerDown = (event: MouseEvent) => {
      if (!switcherRef.current?.contains(event.target as Node)) {
        useAppStore.setState({ brandsOpen: false });
      }
    };
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, [state.brandsOpen]);

  const brandStatus = (key: BrandKey) => {
    const done = state.doneByBrand[key] ?? {};
    const count = documentOrder.filter((doc) => done[doc]).length;
    if (count === 3) return 'Onboarding complete';
    if (count === 0) return 'Not started';
    return `${count} of 3 sources confirmed`;
  };

  const knowledgeActive = KNOWLEDGE_SCREENS.includes(state.screen);
  const campaignsActive = CAMPAIGN_SCREENS.includes(state.screen);

  return (
    <aside className={styles.sidebar}>
      <div className={styles.brandMark}>
        <img className={styles.wordmark} src={wordmark} alt="Veloretti" />
        <span className={styles.product}>Brand Studio</span>
      </div>

      <div className={styles.switcher} ref={switcherRef}>
        <Eyebrow inverse style={{ marginBottom: 8 }}>
          Brand
        </Eyebrow>
        <button
          type="button"
          className={styles.switchButton}
          aria-expanded={state.brandsOpen}
          aria-haspopup="menu"
          onClick={state.toggleBrands}
        >
          <Avatar name={brand.name} size={28} tone="inverse" />
          <span className={styles.switchBody}>
            <span className={styles.switchName}>{brand.name}</span>
            <span className={styles.switchMeta}>{brandStatus(brand.key)}</span>
          </span>
          <IconChevronDown
            size={14}
            className={cx(styles.caret, state.brandsOpen && styles.caretOpen)}
          />
        </button>

        {state.brandsOpen && (
          <div className={styles.menu} role="menu">
            {brands.map((item) => (
              <button
                key={item.key}
                type="button"
                role="menuitem"
                className={styles.menuItem}
                onClick={() => state.selectBrand(item.key)}
              >
                <Avatar name={item.name} size={28} />
                <span className={styles.switchBody}>
                  <span className={styles.menuName}>{item.name}</span>
                  <span className={styles.menuMeta}>{brandStatus(item.key)}</span>
                </span>
                {item.key === state.brandKey && <IconCheck size={15} />}
              </button>
            ))}
            <div className={styles.menuFoot}>
              <button type="button" className={styles.menuItem}>
                <IconPlus size={16} />
                <span className={styles.menuName}>Add a brand</span>
              </button>
            </div>
          </div>
        )}
      </div>

      <nav className={styles.nav}>
        <button
          type="button"
          className={cx(styles.navItem, knowledgeActive && styles.navActive)}
          onClick={() => state.go('dashboard')}
        >
          <IconSparkle size={17} className={styles.navIcon} />
          <span className={styles.navLabel}>Brand knowledge</span>
        </button>

        {knowledgeActive && (
          <div className={styles.subNav}>
            {knowledgePages.map((page) => {
              const active = page.review
                ? state.screen === 'review' && state.doc === page.doc
                : state.screen === 'kb' && state.kbSection === page.key;
              return (
                <button
                  key={page.key}
                  type="button"
                  className={cx(styles.subItem, active && styles.subActive)}
                  onClick={() => {
                    if (page.review) {
                      const done = state.doneByBrand[state.brandKey] ?? {};
                      state.go(done[page.doc] ? 'review' : 'upload', {
                        doc: page.doc,
                        file: false,
                        why: null,
                      });
                      return;
                    }
                    state.go('kb', { kbSection: page.key });
                  }}
                >
                  {page.label}
                </button>
              );
            })}
          </div>
        )}

        <button
          type="button"
          className={cx(styles.navItem, campaignsActive && styles.navActive)}
          onClick={() => state.go('campaigns')}
        >
          <IconLayers size={17} className={styles.navIcon} />
          <span className={styles.navLabel}>Campaigns</span>
        </button>

        <button
          type="button"
          className={cx(styles.navItem, state.screen === 'media' && styles.navActive)}
          onClick={() => state.openMedia()}
        >
          <IconImage size={17} className={styles.navIcon} />
          <span className={styles.navLabel}>Media manager</span>
        </button>

        <button
          type="button"
          className={cx(styles.navItem, state.screen === 'settings' && styles.navActive)}
          onClick={() => state.go('settings')}
        >
          <IconSettings size={17} className={styles.navIcon} />
          <span className={styles.navLabel}>Settings</span>
        </button>

        <button
          type="button"
          className={cx(styles.navItem, state.screen === 'activity' && styles.navActive)}
          onClick={() => state.go('activity')}
        >
          <IconActivity size={17} className={styles.navIcon} />
          <span className={styles.navLabel}>Activity</span>
          <span className={styles.navCount}>{activityCount(state)}</span>
        </button>
      </nav>

      <div className={styles.footer}>
        <button
          type="button"
          className={styles.account}
          onClick={() => state.go('workspace')}
        >
          <span className={styles.accountTop}>
            <span>Workspace</span>
            <span aria-hidden="true">→</span>
          </span>
          <span className={styles.accountBody}>
            <Avatar name="Mara Feldt" size={32} tone="inverse" />
            <span>
              <span className={styles.accountName}>Mara Feldt</span>
              <br />
              <span className={styles.accountRole}>{brand.name} · Owner</span>
            </span>
          </span>
        </button>
      </div>
    </aside>
  );
}
