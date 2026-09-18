import styles from './Admin.module.css';
import { brands } from '../../data/brands';
import { campaigns } from '../../data/campaigns';
import { documentOrder } from '../../data/documents';
import { useAppStore } from '../../store/appStore';
import { Avatar, Button, Card, CardButton, Eyebrow } from '../../design-system';

const SIGN_IN = [
  { label: 'Identity provider', value: 'Microsoft Entra ID' },
  { label: 'Verified domain', value: 'pon.bike' },
  { label: 'Auto-join', value: 'Viewer role' },
  { label: 'Guest accounts', value: '1 · invite only' },
];

export function WorkspaceScreen() {
  const state = useAppStore();

  const brandState = (key: (typeof brands)[number]['key']) => {
    const done = state.doneByBrand[key] ?? {};
    const count = documentOrder.filter((doc) => done[doc]).length;
    if (count === 3) return 'Onboarding complete';
    if (count === 0) return 'Not started';
    return `${count} of 3 sources confirmed`;
  };

  return (
    <div className={styles.page}>
      <div className={styles.head}>
        <div>
          <Eyebrow>Workspace</Eyebrow>
          <h1 className={styles.title}>Pon.Bike</h1>
          <p className={styles.lede}>
            Every brand, member and campaign that shares this workspace. Roles are set per
            brand in settings.
          </p>
        </div>
        <div className={styles.actions}>
          <Button
            variant="secondary"
            onClick={() => state.go('settings', { setTab: 'team' })}
          >
            Manage team
          </Button>
        </div>
      </div>

      <div className={styles.stats}>
        {[
          { value: String(brands.length), label: 'Brands in this workspace' },
          { value: String(state.team.length), label: 'Members' },
          { value: String(campaigns.length), label: 'Campaigns this quarter' },
          { value: 'Scale', label: 'Plan · renews 1 Apr 2026' },
        ].map((stat) => (
          <Card key={stat.label}>
            <p className={styles.statValue}>{stat.value}</p>
            <p className={styles.statLabel}>{stat.label}</p>
          </Card>
        ))}
      </div>

      <section>
        <h2 className={styles.panelTitle}>Brands</h2>
        <div className={styles.grid3}>
          {brands.map((brand) => (
            <CardButton
              key={brand.key}
              onClick={() => state.go('dashboard', { brandKey: brand.key })}
            >
              <span className={styles.brandCard}>
                <Avatar name={brand.name} size={40} />
                <span>
                  <span className={styles.brandName}>{brand.name}</span>
                  <br />
                  <span className={styles.brandState}>{brandState(brand.key)}</span>
                </span>
              </span>
            </CardButton>
          ))}
        </div>
      </section>

      <div className={styles.split}>
        <Card>
          <div className={styles.panelHead}>
            <h2 className={styles.panelTitle} style={{ marginBottom: 0 }}>
              Members
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => state.go('settings', { setTab: 'team' })}
            >
              Roles
            </Button>
          </div>
          <p className={styles.quiet} style={{ marginBottom: 'var(--space-3)' }}>
            {state.team.length} people with access to this workspace. Roles are set per
            brand.
          </p>
          {state.team.map((member) => (
            <div key={member.id} className={styles.row}>
              <Avatar name={member.name} size={32} />
              <div className={styles.rowBody}>
                <p className={styles.rowTitle}>{member.name}</p>
                <p className={styles.rowMeta}>{member.email}</p>
                <div className={styles.chipRow}>
                  {(member.brands === 'All brands'
                    ? brands.map((brand) => brand.name)
                    : member.brands.split(', ')
                  ).map((label) => (
                    <span key={label} className={styles.chip}>
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </Card>

        <Card>
          <h2 className={styles.panelTitle}>Sign-in</h2>
          {SIGN_IN.map((row) => (
            <div key={row.label} className={styles.definitionRow}>
              <span className={styles.definitionLabel}>{row.label}</span>
              <span className={styles.definitionValue}>{row.value}</span>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}
