export type MarketKey = 'nl' | 'de' | 'be';
export type PlatformKey = 'ig' | 'li' | 'st';
export type DirectionKey = 'A' | 'B' | 'C';

export interface Market {
  key: MarketKey;
  name: string;
  locale: string;
  title: string;
  desc: string;
}

export interface Platform {
  key: PlatformKey;
  name: string;
  format: string;
  /** Canvas card size at 100% zoom. */
  w: number;
  h: number;
}

/** Markets the brand is confirmed to run in, with the localised lead copy. */
export const markets: Market[] = [
  {
    key: 'nl',
    name: 'Netherlands',
    locale: 'nl-NL',
    title: 'Negentig kilometer op één lading',
    desc: 'De Cargo Line is gemaakt voor dagelijkse afstand. Schoolrit en boodschappen op één accu.',
  },
  {
    key: 'de',
    name: 'Germany',
    locale: 'de-DE',
    title: 'Neunzig Kilometer mit einer Ladung',
    desc: 'Das Cargo Line ist für den Alltag gebaut. Schulweg und Einkauf mit einem Akku.',
  },
  {
    key: 'be',
    name: 'Belgium',
    locale: 'nl-BE',
    title: 'Negentig kilometer op één lading',
    desc: 'Gemaakt voor dagelijkse afstand. Beschikbaar bij je dealer in de buurt.',
  },
];

/** Social placements the agent drafts for. */
export const platforms: Platform[] = [
  {
    key: 'ig',
    name: 'Instagram',
    format: '1080 × 1080',
    w: 260,
    h: 260,
  },
  {
    key: 'li',
    name: 'LinkedIn',
    format: '1200 × 627',
    w: 340,
    h: 178,
  },
  {
    key: 'st',
    name: 'Stories',
    format: '1080 × 1920',
    w: 200,
    h: 356,
  },
];

/** Headline per creative direction, per market. */
export const directionCopy: Record<DirectionKey, Record<MarketKey, string>> = {
  A: {
    nl: 'Negentig kilometer op één lading',
    de: 'Neunzig Kilometer mit einer Ladung',
    be: 'Negentig kilometer op één lading',
  },
  B: {
    nl: 'Schoolrit en boodschappen. Één accu.',
    de: 'Schulweg und Einkauf. Ein Akku.',
    be: 'Schoolrit en boodschappen. Één accu.',
  },
  C: {
    nl: 'Gebouwd voor dagelijkse afstand',
    de: 'Gebaut für die tägliche Distanz',
    be: 'Gebouwd voor dagelijkse afstand',
  },
};

/** Two assets are seeded with deliberate rule breaks so the compliance run has
 *  something to find on first open. */
export const seededViolations: Record<string, { title: string; desc: string }> = {
  'nl-ig': {
    title: '90 km op één lading',
    desc: 'De beste cargobike voor dagelijkse afstand.',
  },
  'de-li': {
    title: '90 km mit einer Ladung',
    desc: 'Für den Alltag gebaut. Reichweite ohne Fußnote.',
  },
};

export function marketOf(key: MarketKey): Market | undefined {
  return markets.find((market) => market.key === key);
}

export function platformOf(key: PlatformKey): Platform | undefined {
  return platforms.find((platform) => platform.key === key);
}
