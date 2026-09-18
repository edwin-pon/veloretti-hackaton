export type RuleSeverity = 'block' | 'warn';

export interface CheckableAsset {
  title: string;
  desc: string;
  bg?: string;
  /** Set when the asset sits on a photograph rather than a flat colour. */
  mediaId?: string | null;
  locale?: string;
}

export interface ComplianceRule {
  id: string;
  label: string;
  /** Where in the knowledge base the rule comes from. */
  source: string;
  severity: RuleSeverity;
  test: (asset: CheckableAsset) => boolean;
  fix: string;
}

export interface RuleViolation {
  id: string;
  label: string;
  source: string;
  severity: RuleSeverity;
  fix: string;
}

const SUPERLATIVES = /\b(best|fastest|safest|longest|beste|schnellste|bedste)\b/i;
const RANGE_CLAIM = /\d{2,3}\s?(km|kilometer|kilometre)/i;
const BLOCKED_WORDS = /\b(revolutionary|effortless|game-changing|unleash)\b/i;

/** The checks the compliance agent runs, each traceable to a confirmed rule in
 *  the knowledge base. Blocking rules stop a campaign; warnings do not. */
export const complianceRules: ComplianceRule[] = [
  {
    id: 'superlative',
    label: 'No superlatives without measurement',
    source: 'Legal §2.2',
    severity: 'block',
    test: (asset) => SUPERLATIVES.test(`${asset.title} ${asset.desc}`),
    fix: 'Remove the superlative or add a footnoted measurement in the same asset.',
  },
  {
    id: 'footnote',
    label: 'Range claim carries the WLTP-e footnote',
    source: 'Legal §4.2',
    severity: 'block',
    test: (asset) =>
      RANGE_CLAIM.test(`${asset.title} ${asset.desc}`) && !/wltp/i.test(asset.desc),
    fix: 'Append the approved range footnote, unchanged.',
  },
  {
    id: 'exclamation',
    label: 'No exclamation marks',
    source: 'Style p.8',
    severity: 'warn',
    test: (asset) => /!/.test(`${asset.title} ${asset.desc}`),
    fix: 'Remove the exclamation mark.',
  },
  {
    id: 'blocked',
    label: 'No blocked words',
    source: 'Brand p.16',
    severity: 'block',
    test: (asset) => BLOCKED_WORDS.test(`${asset.title} ${asset.desc}`),
    fix: 'Rewrite without the blocked wording.',
  },
  {
    id: 'titlecase',
    label: 'Sentence case headings',
    source: 'Style p.6',
    severity: 'warn',
    test: (asset) => {
      // German capitalises every noun, so the check does not apply there.
      if (asset.locale?.startsWith('de')) return false;
      const words = String(asset.title)
        .split(/\s+/)
        .slice(1)
        .filter((word) => word.length > 3);
      const capitalised = words.filter((word) => /^[A-Z]/.test(word));
      return words.length >= 2 && capitalised.length >= words.length;
    },
    fix: 'Lower-case everything after the first word, except product names.',
  },
  {
    id: 'contrast',
    label: 'Accent not used behind body copy',
    source: 'Style p.6',
    severity: 'warn',
    test: (asset) => !asset.mediaId && asset.bg === '#FE5900',
    fix: 'Signal orange is for promotional messages only. Move it to the call to action and set the background in ink or a neutral.',
  },
];

export function checkAsset(
  asset: CheckableAsset | null | undefined,
  locale?: string,
): RuleViolation[] {
  if (!asset) return [];
  const subject = locale ? { ...asset, locale } : asset;
  return complianceRules
    .filter((rule) => {
      try {
        return rule.test(subject);
      } catch {
        return false;
      }
    })
    .map(({ id, label, source, severity, fix }) => ({ id, label, source, severity, fix }));
}

export function worstSeverity(violations: RuleViolation[]): RuleSeverity | null {
  if (violations.some((violation) => violation.severity === 'block')) return 'block';
  if (violations.length > 0) return 'warn';
  return null;
}
