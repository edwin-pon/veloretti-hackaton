import styles from './Admin.module.css';
import { activityLog, isAgent } from '../../data/activity';
import { brandOf } from '../../data/brands';
import { useAppStore } from '../../store/appStore';
import {
  Avatar,
  Badge,
  Button,
  Card,
  Eyebrow,
  Input,
  SegmentedControl,
  cx,
} from '../../design-system';

const ACTORS = [
  { value: 'all', label: 'Everyone' },
  { value: 'people', label: 'People' },
  { value: 'agents', label: 'Agents' },
] as const;

export function ActivityScreen() {
  const state = useAppStore();
  const brand = brandOf(state.brandKey);

  const scoped = activityLog.filter(
    (event) => state.actScope === 'all' || event.brand === brand.key,
  );

  const query = state.actQuery.trim().toLowerCase();
  const events = scoped.filter((event) => {
    const agent = isAgent(event.who);
    if (state.actActor === 'people' && agent) return false;
    if (state.actActor === 'agents' && !agent) return false;
    if (state.actKinds.length && !state.actKinds.includes(event.kind)) return false;
    if (
      query &&
      !`${event.who} ${event.text} ${event.target} ${event.kind}`
        .toLowerCase()
        .includes(query)
    ) {
      return false;
    }
    return true;
  });

  const kinds = [...new Set(scoped.map((event) => event.kind))];
  const isFiltered =
    state.actKinds.length > 0 || state.actActor !== 'all' || query !== '';

  return (
    <div className={styles.page}>
      <div className={styles.head}>
        <div>
          <Eyebrow>Activity</Eyebrow>
          <h1 className={styles.title}>What changed</h1>
          <p className={styles.lede}>
            Every action taken in this workspace, by people and by agents. Agents are
            named so it is always clear which changes were machine-made.
          </p>
        </div>
        <div className={styles.actions}>
          <SegmentedControl
            options={[
              { value: 'brand', label: brand.name },
              { value: 'all', label: 'Whole workspace' },
            ]}
            value={state.actScope}
            aria-label="Activity scope"
            onChange={(value) => state.patch({ actScope: value as 'brand' | 'all' })}
          />
        </div>
      </div>

      <Card>
        <div className={styles.filters}>
          <Input
            fieldClassName={styles.searchField}
            value={state.actQuery}
            placeholder="Search activity"
            aria-label="Search activity"
            onChange={(event) => state.patch({ actQuery: event.target.value })}
          />
          <SegmentedControl
            options={ACTORS}
            value={state.actActor}
            aria-label="Actor"
            onChange={(value) => state.patch({ actActor: value })}
          />
          {isFiltered && (
            <Button
              variant="ghost"
              onClick={() =>
                state.patch({ actQuery: '', actActor: 'all', actKinds: [] })
              }
            >
              Clear
            </Button>
          )}
        </div>

        <div className={styles.kindChips} style={{ marginTop: 'var(--space-4)' }}>
          {kinds.map((kind) => (
            <button
              key={kind}
              type="button"
              className={cx(
                styles.chipButton,
                state.actKinds.includes(kind) && styles.chipOn,
              )}
              onClick={() => state.toggleActivityKind(kind)}
            >
              {kind}
            </button>
          ))}
        </div>
      </Card>

      <Card>
        <p className={styles.quiet} style={{ marginBottom: 'var(--space-3)' }}>
          {events.length} of {scoped.length} events
        </p>

        {events.map((event) => (
          <article key={event.id} className={styles.event}>
            <Avatar
              name={event.who}
              size={34}
              tone={isAgent(event.who) ? 'ink' : 'neutral'}
            />
            <div className={styles.eventBody}>
              <div className={styles.eventHead}>
                <span className={styles.eventWho}>{event.who}</span>
                <Badge variant={isAgent(event.who) ? 'outline' : 'neutral'}>
                  {event.kind}
                </Badge>
              </div>
              <p className={styles.eventText}>{event.text}</p>
              <p className={styles.eventMeta}>
                {event.target} · {event.scope}
              </p>
            </div>
            <span className={styles.eventWhen}>{event.when}</span>
          </article>
        ))}

        {events.length === 0 && (
          <p className={styles.quiet}>Nothing matches those filters.</p>
        )}
      </Card>
    </div>
  );
}
