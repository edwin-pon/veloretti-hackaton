export interface TargetAudience {
  id: string;
  name: string;
  role: string;
  summary: string;
  tags: string[];
  conf: number;
  cite: string;
  reasoning: string;
}

/** Target audiences drafted by the agent from the brand book. Each needs
 *  confirming before a campaign is allowed to target it. */
export const targetAudiences: TargetAudience[] = [
  {
    id: 'a1',
    name: 'The daily commuter',
    role: 'Urban professional, 28–45',
    summary: 'Rides 8 to 15 km each way and wants a bike that removes the car from the commute without a service contract.',
    tags: ['Netherlands', 'Germany', 'Commuter'],
    conf: 82,
    cite: 'veloretti-brand-book-2026.pdf · p.11',
    reasoning: 'Collapsed from two brand-book audiences that differ only by city size. Ride distance is stated; the service expectation was inferred from the dealer section.',
  },
  {
    id: 'a2',
    name: 'The school-run parent',
    role: 'Household with two children',
    summary: 'Buys the Cargo Line to replace short car trips. Decides on load capacity, safety and range with a full box.',
    tags: ['Cargo Line', 'Family', 'Range'],
    conf: 88,
    cite: 'veloretti-brand-book-2026.pdf · p.12',
    reasoning: 'Stated as a named audience with its own spread. Range-with-load emphasis comes from the three example headlines in that section.',
  },
  {
    id: 'a3',
    name: 'The dealer buyer',
    role: 'Independent dealer, 1–4 stores',
    summary: 'Stocks what sells and what is easy to service. Responds to margin, parts availability and co-op budget.',
    tags: ['Dealer', 'B2B', 'Co-op'],
    conf: 61,
    cite: 'veloretti-brand-book-2026.pdf · p.24',
    reasoning: 'Not written up as an audience. Assembled from the dealer channel chapter, so it needs your confirmation before campaigns target it.',
  },
];

/** Per-audience, per-locale strapline used on audience-specific assets. */
export const audienceCopy: Record<string, Record<string, string>> = {
  a1: {
    'nl-NL': 'Woon-werkverkeer zonder auto, elke dag.',
    'de-DE': 'Der tägliche Weg zur Arbeit, ohne Auto.',
    'nl-BE': 'Elke dag naar het werk, zonder auto.',
  },
  a2: {
    'nl-NL': 'Boodschappen, school en werk in één rit.',
    'de-DE': 'Einkauf, Schule und Arbeit in einer Fahrt.',
    'nl-BE': 'Van school tot supermarkt, elke dag.',
  },
  a3: {
    'nl-NL': 'Voorraad, service en verkoop dichtbij.',
    'de-DE': 'Bestand, Service und Verkauf in Ihrer Nähe.',
    'nl-BE': 'Voorraad, service en verkoop dichtbij.',
  },
};

export function audienceLine(audienceId: string, locale: string): string | null {
  const set = audienceCopy[audienceId];
  if (!set) return null;
  return set[locale] ?? set['nl-NL'];
}

export function audienceById(id: string): TargetAudience | undefined {
  return targetAudiences.find((audience) => audience.id === id);
}
