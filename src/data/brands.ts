export type BrandKey = 'veloretti' | 'canondale' | 'gazelle';

export interface Brand {
  key: BrandKey;
  name: string;
  slug: string;
  initials: string;
}

/** Workspaces the studio can switch between. Veloretti is the fully onboarded
 *  brand; the other two share the same shape so the flow can be replayed. */
export const brands: Brand[] = [
  {
    key: 'veloretti',
    name: 'Veloretti',
    slug: 'veloretti',
    initials: 'VA',
  },
  {
    key: 'canondale',
    name: 'Canondale',
    slug: 'canondale',
    initials: 'CA',
  },
  {
    key: 'gazelle',
    name: 'Gazelle',
    slug: 'gazelle',
    initials: 'GA',
  },
];

export const defaultBrandKey: BrandKey = 'veloretti';

export function brandOf(key: BrandKey): Brand {
  return brands.find((brand) => brand.key === key) ?? brands[0];
}

/** Swap Veloretti-specific copy for whichever brand is selected. */
export function forBrand(text: string, brand: Brand): string {
  return text.split('Veloretti').join(brand.name).split('veloretti-').join(brand.slug + '-');
}
