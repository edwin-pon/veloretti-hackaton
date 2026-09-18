import { campaignMedia } from './campaignMedia';

export type MediaKind = 'Image' | 'Video';
export type MediaStatus = 'Tagged' | 'Needs review' | 'Confirmed';

export interface MediaSubject {
  slug: string;
  /** Flat tone used to stand in for the photograph itself. */
  tone: string;
  desc: string;
  tags: string[];
  why: string;
  video?: { desc: string; why: string };
}

export interface MediaItem {
  id: string;
  name: string;
  kind: MediaKind;
  market: string;
  dims: string;
  duration: string;
  poster: number;
  captions: boolean;
  /** Flat tone, used as a placeholder and as the backdrop behind a loading image. */
  tone: string;
  /** Real image, when the item has one. Synthetic library items fall back to `tone`. */
  src?: string;
  desc: string;
  tags: string[];
  /** Agent confidence in the generated description and tags. */
  conf: number;
  reasoning: string;
  uploaded?: boolean;
}

export const mediaMarkets = ['Netherlands', 'Germany', 'Belgium'] as const;

export const marketCodes: Record<string, string> = {
  Netherlands: 'nl',
  Germany: 'de',
  Belgium: 'be',
};

/** The ten recurring subjects the mirrored DAM library is generated from. */
export const mediaSubjects: MediaSubject[] = [
  {
    slug: 'school-run',
    tone: '#C9D6CE',
    desc: 'Parent loading two children onto a Cargo Line outside a school gate, overcast morning light.',
    tags: ['cargo line', 'family', 'school run'],
    why: 'Recognised the Cargo Line front box, two child seats and a school building. Weather inferred from flat shadows.',
    video: {
      desc: 'Clip of a parent loading two children onto a Cargo Line at a school gate, handheld, ambient sound only.',
      why: 'Frames throughout show the front box and two child seats. No dialogue or on-screen text was detected.',
    },
  },
  {
    slug: 'canal-commute',
    tone: '#BFCBD8',
    desc: 'Rider crossing a canal bridge during the morning commute.',
    tags: ['commuter', 'urban', 'morning'],
    why: 'Bridge railings, canal houses and street signage place this in a Dutch city centre.',
    video: {
      desc: 'Tracking clip following a rider across a canal bridge during the morning commute.',
      why: 'Camera movement and consistent bridge geometry across frames indicate a tracking shot in a Dutch city centre.',
    },
  },
  {
    slug: 'dealer-service-bay',
    tone: '#D2CFC6',
    desc: 'Mechanic performing a service check in a partner dealer workshop.',
    tags: ['dealer', 'service', 'workshop'],
    why: 'Workshop tooling, branded workwear and a bike on a repair stand identify dealer service content.',
    video: {
      desc: 'Clip of a mechanic working through a service check in a partner dealer workshop.',
      why: 'Repeated tool handling across frames and branded workwear identify dealer service footage. No spoken claims detected.',
    },
  },
  {
    slug: 'rural-test-route',
    tone: '#B9C4C0',
    desc: 'Cargo Line photographed on a rural test route, no text in frame.',
    tags: ['range', 'rural', 'product'],
    why: 'A single static composition on open road. No overlaid text or figures appear, so nothing here carries a claim.',
    video: {
      desc: 'Loop of a Cargo Line on a rural test route, no on-screen claims.',
      why: 'No overlaid text or figures were detected in any frame, so the clip carries no claim that needs substantiation.',
    },
  },
  {
    slug: 'frame-detail',
    tone: '#CBC7BE',
    desc: 'Close crop of the welded frame joint and battery mount.',
    tags: ['product', 'detail', 'studio'],
    why: 'Shallow depth of field and a seamless backdrop mark this as studio product photography.',
    video: {
      desc: 'Slow studio pan across the welded frame joint and battery mount.',
      why: 'A seamless backdrop and steady camera movement mark this as studio product footage.',
    },
  },
  {
    slug: 'cargo-box-groceries',
    tone: '#C4D0C6',
    desc: 'Front box loaded with grocery bags outside a market.',
    tags: ['cargo line', 'daily use', 'city'],
    why: 'Cargo volume and the market stalls behind support the daily-use tag.',
    video: {
      desc: 'Clip of grocery bags being loaded into the front box outside a market.',
      why: 'Loading action across frames and market stalls behind support the daily-use tag.',
    },
  },
  {
    slug: 'fleet-handover',
    tone: '#C0C9D6',
    desc: 'Fleet operator receiving six bikes at a depot.',
    tags: ['fleet', 'b2b', 'people'],
    why: 'Multiple identical units and a commercial depot indicate fleet rather than consumer content.',
    video: {
      desc: 'Clip of a fleet handover at a depot, six bikes unloaded and checked.',
      why: 'Multiple identical units and depot signage indicate fleet rather than consumer footage.',
    },
  },
  {
    slug: 'winter-commute',
    tone: '#C7CFD4',
    desc: 'Rider in wet winter conditions on a cycle path.',
    tags: ['commuter', 'winter', 'weather'],
    why: 'Standing water, low light and cold-weather clothing set the season.',
    video: {
      desc: 'Clip of a rider in wet winter conditions on a cycle path, spray visible from the rear wheel.',
      why: 'Motion spray, standing water and cold-weather clothing set the season.',
    },
  },
  {
    slug: 'charging-indoors',
    tone: '#CFCBD8',
    desc: 'Battery charging on a kitchen counter, evening light.',
    tags: ['battery', 'home', 'evening'],
    why: 'The charger and indicator LED are visible; interior context inferred from cabinetry.',
    video: {
      desc: 'Short clip of a battery being connected to its charger on a kitchen counter.',
      why: 'The connection action and a blinking indicator LED are visible across frames.',
    },
  },
  {
    slug: 'test-ride-dealer',
    tone: '#C6D2CE',
    desc: 'Customer taking a test ride outside a dealer showroom.',
    tags: ['dealer', 'test ride', 'people'],
    why: 'Showroom glazing and a staff member with a tablet match the test-ride flow.',
    video: {
      desc: 'Clip of a customer setting off on a test ride outside a dealer showroom.',
      why: 'Showroom glazing and a staff member handing over the bike match the test-ride flow.',
    },
  },
];

export const MEDIA_LIBRARY_SIZE = 1440;

/** Rebuilds the mirrored Bynder library. The generated campaign shoot leads,
 *  followed by the synthetic back catalogue. Deterministic, so filters, paging
 *  and ids stay stable between renders. */
export function buildMediaLibrary(size: number = MEDIA_LIBRARY_SIZE): MediaItem[] {
  const items: MediaItem[] = [];
  for (let i = 0; i < size; i += 1) {
    const subject = mediaSubjects[i % mediaSubjects.length];
    const market = mediaMarkets[(i * 2) % 3];
    const isVideo = i % 7 === 3;
    const seconds = 12 + ((i * 5) % 40);
    const copy = isVideo && subject.video ? subject.video : { desc: subject.desc, why: subject.why };
    items.push({
      id: `m${i + 1}`,
      name:
        `${subject.slug}-${marketCodes[market]}-${1001 + i}` + (isVideo ? '.mp4' : '.jpg'),
      kind: isVideo ? 'Video' : 'Image',
      market,
      dims: isVideo ? '1920 × 1080' : i % 3 ? '3000 × 2000' : '4000 × 2667',
      duration: isVideo ? `0:${seconds < 10 ? '0' : ''}${seconds}` : '',
      poster: isVideo ? 1 : 0,
      captions: isVideo ? i % 2 === 0 : false,
      tone: subject.tone,
      desc: copy.desc,
      tags: [...subject.tags, market.toLowerCase(), ...(isVideo ? ['video'] : [])],
      conf: 52 + ((i * 17) % 46),
      reasoning: copy.why,
    });
  }
  return [...campaignMedia, ...items];
}

/** The file the upload flow adds, described by the media agent. */
export function newUpload(index: number): MediaItem {
  return {
    id: `up${index}`,
    name: `upload-${index}.jpg`,
    kind: 'Image',
    market: 'Netherlands',
    dims: '3000 × 2000',
    duration: '',
    poster: 0,
    captions: false,
    tone: '#C6D2DE',
    desc: 'Rider on a Cargo Line in an urban setting, daylight. Description drafted by the agent — edit if it is wrong.',
    tags: ['cargo line', 'urban', 'daylight', 'netherlands'],
    conf: 61,
    reasoning:
      'Subject and setting were read from the image. No people are identifiable, so no consent flag was raised.',
    uploaded: true,
  };
}
