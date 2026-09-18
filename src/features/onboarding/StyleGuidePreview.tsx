import { FieldCard } from './FieldCard';
import styles from './ReviewScreen.module.css';
import { documentByKey } from '../../data/documents';
import { useAppStore } from '../../store/appStore';
import { Card } from '../../design-system';

/** Families the app self-hosts, so their specimens render for real. */
const HOSTED_FAMILIES = ['PP Neue Montreal'];

function isHosted(family: string): boolean {
  return HOSTED_FAMILIES.some(
    (hosted) => hosted.toLowerCase() === family.trim().toLowerCase(),
  );
}

/** Renders the extracted palette and typefaces as live specimens, so the values
 *  can be judged rather than only read. */
export function StyleGuidePreview() {
  const state = useAppStore();
  const doc = documentByKey('style');
  const colors = doc.sections[1];
  const fonts = doc.sections[2];

  const valueOf = (key: string) => state.values[key] ?? '';

  const hexOf = (value: unknown) => {
    const match = /#[0-9a-fA-F]{3,8}/.exec(String(value));
    return match ? match[0] : '#F0F4F8';
  };

  const familyOf = (value: unknown) =>
    String(value).split('—')[0].split(',')[0].trim();

  const [primary, accent, neutrals] = colors.fields;
  const [heading, body, , scale] = fonts.fields;

  const headingName = familyOf(valueOf(heading.key));
  const bodyName = familyOf(valueOf(body.key));
  const headingFamily = `"${headingName}", Helvetica Neue, Arial, sans-serif`;
  const bodyFamily = `"${bodyName}", Helvetica Neue, Arial, sans-serif`;

  /** Weight is read from the extracted value so the specimen matches the rule. */
  const weightOf = (value: unknown, fallback: number) => {
    const match = /\b([1-9]00)\b/.exec(String(value));
    if (match) return Number(match[1]);
    if (/bold/i.test(String(value))) return 700;
    if (/medium/i.test(String(value))) return 500;
    return fallback;
  };

  const headingWeight = weightOf(valueOf(heading.key), 500);
  const bodyWeight = weightOf(valueOf(body.key), 400);

  const neutralValues = Array.isArray(state.values[neutrals.key])
    ? (state.values[neutrals.key] as string[])
    : [];

  const scaleRows = String(valueOf(scale.key))
    .split('/')
    .map((part) => {
      const tokens = part.trim().split(/\s+/);
      const px = parseInt(tokens[tokens.length - 1], 10) || 16;
      const name = tokens.slice(0, -1).join(' ') || '—';
      const isHeading = /^h[1-6]$/i.test(name);
      return {
        name: name.toUpperCase(),
        px,
        family: isHeading ? headingFamily : bodyFamily,
        weight: isHeading ? headingWeight : bodyWeight,
        sample: isHeading
          ? 'Ninety kilometres on one charge'
          : 'Engineered for daily distance, serviced by your dealer.',
      };
    });

  return (
    <>
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>Colours</h2>
          <span className={styles.sectionMeta}>{colors.meta}</span>
        </div>

        <div className={styles.swatches}>
          {[primary, accent].map((field) => (
            <Card key={field.key}>
              <div
                className={styles.swatchChip}
                style={{ background: hexOf(valueOf(field.key)) }}
              />
              <FieldCard field={field} bare />
            </Card>
          ))}
        </div>

        <Card>
          <div className={styles.neutralRamp}>
            {neutralValues.map((value) => (
              <span key={value} className={styles.neutralChip}>
                <span className={styles.neutralSwatch} style={{ background: value }} />
                {value}
              </span>
            ))}
          </div>
          <FieldCard field={neutrals} bare />
        </Card>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>Typefaces</h2>
          <span className={styles.sectionMeta}>{fonts.meta}</span>
        </div>

        <div className={styles.swatches}>
          {[
            {
              field: heading,
              family: headingFamily,
              name: headingName,
              size: 30,
              weight: headingWeight,
              tracking: '-0.02em',
              sample: 'Ninety kilometres on one charge',
            },
            {
              field: body,
              family: bodyFamily,
              name: bodyName,
              size: 18,
              weight: bodyWeight,
              tracking: '0',
              sample:
                'Engineered for daily distance, sold and serviced through independent dealers.',
            },
          ].map((specimen) => (
            <Card key={specimen.field.key}>
              <div className={styles.specimen}>
                <p
                  style={{
                    fontFamily: specimen.family,
                    fontSize: specimen.size,
                    fontWeight: specimen.weight,
                    letterSpacing: specimen.tracking,
                    lineHeight: 1.2,
                  }}
                >
                  {specimen.sample}
                </p>
                <p className={styles.specimenSub}>
                  Specimen · {specimen.name} {specimen.weight}
                </p>
                {isHosted(specimen.name) ? (
                  <p className={styles.specimenLive}>
                    Rendering in the live brand typeface
                  </p>
                ) : (
                  <p className={styles.specimenNote}>
                    Preview uses a fallback — font file not uploaded
                  </p>
                )}
              </div>
              <FieldCard field={specimen.field} bare />
            </Card>
          ))}
        </div>

        <Card>
          <div className={styles.scaleRows}>
            {scaleRows.map((row) => (
              <div key={`${row.name}-${row.px}`} className={styles.scaleRow}>
                <span className={styles.scaleName}>{row.name}</span>
                <span className={styles.scalePx}>{row.px} px</span>
                <span
                  className={styles.scaleSample}
                  style={{
                    fontFamily: row.family,
                    fontSize: Math.min(row.px, 40),
                    fontWeight: row.weight,
                  }}
                >
                  {row.sample}
                </span>
              </div>
            ))}
          </div>
          <FieldCard field={scale} bare />
        </Card>
      </section>
    </>
  );
}
