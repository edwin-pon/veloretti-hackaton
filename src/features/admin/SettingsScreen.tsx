import styles from './Admin.module.css';
import { integrations, roleDefinitions, approverOptions } from '../../data/workspace';
import type { RoleKey } from '../../data/workspace';
import { useAppStore } from '../../store/appStore';
import type { SettingsTab } from '../../store/types';
import {
  Avatar,
  Badge,
  Button,
  Card,
  Eyebrow,
  Input,
  Select,
  Tabs,
  Toggle,
  cx,
} from '../../design-system';

const ROLE_OPTIONS = roleDefinitions.map((role) => role.key);

const INTEGRATION_VARIANT = {
  Connected: 'ok',
  'Needs attention': 'warn',
  'Not connected': 'neutral',
} as const;

export function SettingsScreen() {
  const state = useAppStore();
  const activeApprovals = state.approvals.filter((rule) => rule.on).length;

  const tabs = [
    { value: 'team' as const, label: 'Team and roles' },
    { value: 'approvals' as const, label: 'Approvals' },
    { value: 'channels' as const, label: 'Channels and integrations' },
  ];

  const tabMeta: Record<SettingsTab, string> = {
    team: `${state.team.length} people`,
    approvals: `${activeApprovals} active`,
    channels: `${integrations.filter((item) => item.status === 'Connected').length} of ${
      integrations.length
    } connected`,
  };

  return (
    <div className={styles.page}>
      <div className={styles.head}>
        <div>
          <Eyebrow>Settings</Eyebrow>
          <h1 className={styles.title}>Workspace</h1>
          <p className={styles.lede}>
            Who can do what, when sign-off is required, and which channels the studio can
            publish to.
          </p>
        </div>
      </div>

      <Tabs
        items={tabs}
        value={state.setTab}
        aria-label="Settings sections"
        onChange={(value) => state.patch({ setTab: value })}
      />

      <p className={styles.quiet}>{tabMeta[state.setTab]}</p>

      <div className={styles.settingsBody}>
        {state.setTab === 'team' && (
          <>
            <Card>
              <h2 className={styles.panelTitle}>Members</h2>
              {state.team.map((member) => (
                <div key={member.id} className={styles.row}>
                  <Avatar name={member.name} size={34} />
                  <div className={styles.rowBody}>
                    <p className={styles.rowTitle}>{member.name}</p>
                    <p className={styles.rowMeta}>
                      {member.email} · {member.brands} · {member.last}
                    </p>
                  </div>
                  <Select
                    size="sm"
                    value={member.role}
                    options={ROLE_OPTIONS}
                    aria-label={`Role for ${member.name}`}
                    onChange={(event) =>
                      state.setRole(member.id, event.target.value as RoleKey)
                    }
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => state.removeMember(member.id)}
                  >
                    Remove
                  </Button>
                </div>
              ))}

              <form
                className={styles.inviteRow}
                onSubmit={(event) => {
                  event.preventDefault();
                  state.invite();
                }}
              >
                <Input
                  label="Invite by email"
                  type="email"
                  value={state.inviteEmail}
                  placeholder="name@pon.bike"
                  onChange={(event) =>
                    state.patch({ inviteEmail: event.target.value })
                  }
                />
                <Select
                  label="Role"
                  value={state.inviteRole}
                  options={ROLE_OPTIONS}
                  onChange={(event) =>
                    state.patch({ inviteRole: event.target.value as RoleKey })
                  }
                />
                <Button type="submit">Send invite</Button>
              </form>
            </Card>

            <section>
              <h2 className={styles.panelTitle}>What each role can do</h2>
              <div className={styles.grid3}>
                {roleDefinitions.map((role) => {
                  const count = state.team.filter(
                    (member) => member.role === role.key,
                  ).length;
                  return (
                    <Card
                      key={role.key}
                      className={cx(
                        styles.roleCard,
                        state.roleFocus === role.key && styles.roleCardOn,
                      )}
                      onClick={() => state.patch({ roleFocus: role.key })}
                    >
                      <div>
                        <p className={styles.roleName}>{role.key}</p>
                        <p className={styles.rowMeta}>
                          {count} {count === 1 ? 'person' : 'people'}
                        </p>
                      </div>
                      <p className={styles.roleDesc}>{role.desc}</p>
                      <div className={styles.roleList}>
                        {role.can.map((item) => (
                          <p key={item} className={styles.roleItem}>
                            <span className={styles.roleDot} aria-hidden="true" />
                            {item}
                          </p>
                        ))}
                      </div>
                    </Card>
                  );
                })}
              </div>
            </section>
          </>
        )}

        {state.setTab === 'approvals' && (
          <Card>
            <h2 className={styles.panelTitle}>When sign-off is required</h2>
            {state.approvals.map((rule) => (
              <div key={rule.id} className={styles.approvalRow}>
                <div className={styles.rowBody}>
                  <p className={styles.rowTitle}>{rule.label}</p>
                  <p className={styles.rowMeta}>{rule.desc}</p>
                </div>
                <Select
                  size="sm"
                  value={rule.approver}
                  options={approverOptions}
                  aria-label={`Approver for ${rule.label}`}
                  onChange={(event) =>
                    state.setApprovalRule(rule.id, { approver: event.target.value })
                  }
                />
                <Toggle
                  checked={rule.on}
                  label={rule.on ? 'Required' : 'Not required'}
                  onChange={(on) => state.setApprovalRule(rule.id, { on })}
                />
              </div>
            ))}

            <div className={styles.settingsFoot}>
              <Input
                label="Review window"
                type="number"
                min={1}
                max={14}
                value={state.approvalSla}
                hint="Working days before a pending review is escalated"
                onChange={(event) =>
                  state.patch({ approvalSla: Number(event.target.value) || 1 })
                }
              />
              <div>
                <Eyebrow style={{ marginBottom: 10 }}>Clean assets</Eyebrow>
                <Toggle
                  checked={state.autoApprove}
                  label={
                    state.autoApprove
                      ? 'Clean assets skip review, flagged assets still need sign-off'
                      : 'Every campaign waits for sign-off, clean or not'
                  }
                  onChange={(autoApprove) => state.patch({ autoApprove })}
                />
              </div>
            </div>
          </Card>
        )}

        {state.setTab === 'channels' && (
          <Card>
            <h2 className={styles.panelTitle}>Connected channels</h2>
            {integrations.map((integration) => (
              <div key={integration.id} className={styles.row}>
                <div className={styles.rowBody}>
                  <p className={styles.rowTitle}>{integration.name}</p>
                  <p className={styles.rowMeta}>
                    {integration.kind} · {integration.meta}
                  </p>
                </div>
                <Badge variant={INTEGRATION_VARIANT[integration.status]}>
                  {integration.status}
                </Badge>
                <Button
                  variant={integration.status === 'Connected' ? 'ghost' : 'secondary'}
                  size="sm"
                >
                  {integration.status === 'Not connected'
                    ? 'Connect'
                    : integration.status === 'Needs attention'
                      ? 'Reconnect'
                      : 'Manage'}
                </Button>
              </div>
            ))}
          </Card>
        )}
      </div>
    </div>
  );
}
