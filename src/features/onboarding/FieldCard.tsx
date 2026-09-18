import styles from './FieldCard.module.css';
import { brandOf, forBrand } from '../../data/brands';
import type { ExtractedField } from '../../data/types';
import { useAppStore } from '../../store/appStore';
import {
  FIELD_STATE_LABEL,
  confidenceTone,
  fieldState,
} from '../../store/selectors';
import {
  Badge,
  Card,
  ChipInput,
  Eyebrow,
  Input,
  Select,
  Textarea,
  Toggle,
  cx,
} from '../../design-system';

const TONE_CLASS = {
  ok: styles.confidenceOk,
  warn: styles.confidenceWarn,
  block: styles.confidenceBlock,
} as const;

const BADGE_VARIANT = {
  edited: 'info',
  review: 'warn',
  extracted: 'ok',
} as const;

export interface FieldCardProps {
  field: ExtractedField;
  /** Renders the control without the surrounding card, for embedded previews. */
  bare?: boolean;
}

export function FieldCard({ field, bare = false }: FieldCardProps) {
  const state = useAppStore();
  const brand = brandOf(state.brandKey);
  const value = state.values[field.key] ?? field.value;
  const status = fieldState(state, field);
  const tone = confidenceTone(field.conf);
  const whyOpen = state.why === field.key;

  const control = (() => {
    switch (field.type) {
      case 'area':
        return (
          <Textarea
            value={String(value)}
            rows={field.rows ?? 3}
            aria-label={field.label}
            onChange={(event) => state.setValue(field.key, event.target.value)}
          />
        );
      case 'select':
        return (
          <Select
            value={String(value)}
            options={field.options}
            aria-label={field.label}
            onChange={(event) => state.setValue(field.key, event.target.value)}
          />
        );
      case 'toggle':
        return (
          <Toggle
            checked={value === true}
            label={field.toggleLabel}
            onChange={(checked) => state.setValue(field.key, checked)}
          />
        );
      case 'chips':
        return (
          <ChipInput
            values={Array.isArray(value) ? value : []}
            placeholder={field.chipPlaceholder}
            aria-label={field.label}
            onChange={(next) => state.setValue(field.key, next)}
          />
        );
      default:
        return (
          <Input
            value={String(value)}
            aria-label={field.label}
            onChange={(event) => state.setValue(field.key, event.target.value)}
          />
        );
    }
  })();

  const body = (
    <>
      <div className={styles.head}>
        <div>
          <p className={styles.label}>{field.label}</p>
          <p className={styles.hint}>{field.hint}</p>
        </div>
        <div className={styles.status}>
          <span className={styles.confidence}>
            <span className={cx(styles.confidenceDot, TONE_CLASS[tone])} />
            {field.conf}% confidence
          </span>
          <Badge variant={BADGE_VARIANT[status]}>{FIELD_STATE_LABEL[status]}</Badge>
        </div>
      </div>

      {control}

      <div className={styles.foot}>
        <span>{forBrand(field.cite, brand)}</span>
        <button
          type="button"
          className={styles.whyButton}
          onClick={() => state.toggleWhy(field.key)}
        >
          {whyOpen ? 'Hide reasoning' : 'Why this value?'}
        </button>
        {status === 'edited' && <span className={styles.edited}>Edited by you</span>}
      </div>

      {whyOpen && (
        <div className={styles.why}>
          <Eyebrow>Agent reasoning</Eyebrow>
          <p className={styles.whyBody}>{forBrand(field.reasoning, brand)}</p>
          <p className={styles.whyQuote}>{forBrand(field.quote, brand)}</p>
        </div>
      )}
    </>
  );

  if (bare) return <div className={styles.field}>{body}</div>;

  return (
    <Card className={cx(styles.field, status === 'review' && styles.fieldReview)}>
      {body}
    </Card>
  );
}
