import type { MediaItem } from './media';

import aceOldTownSquareDe from '../assets/campaign/ace-old-town-square-de.jpg';
import aceOldTownStoryDe from '../assets/campaign/ace-old-town-story-de.jpg';
import aceOldTownWideDe from '../assets/campaign/ace-old-town-wide-de.jpg';
import acePlazaSquareNl from '../assets/campaign/ace-plaza-square-nl.jpg';
import acePlazaStoryNl from '../assets/campaign/ace-plaza-story-nl.jpg';
import acePlazaWideNl from '../assets/campaign/ace-plaza-wide-nl.jpg';
import ivyOldTownSquareDe from '../assets/campaign/ivy-old-town-square-de.jpg';
import ivyOldTownStoryDe from '../assets/campaign/ivy-old-town-story-de.jpg';
import ivyOldTownWideDe from '../assets/campaign/ivy-old-town-wide-de.jpg';
import ivyPlazaSquareNl from '../assets/campaign/ivy-plaza-square-nl.jpg';
import ivyPlazaStoryNl from '../assets/campaign/ivy-plaza-story-nl.jpg';
import ivyPlazaWideNl from '../assets/campaign/ivy-plaza-wide-nl.jpg';

/* The generated shoot for the spring push: two models (Ace, Ivy) in two markets
   (Netherlands, Germany), each delivered in the three placement ratios. The
   German set is shot on cobbled old-town streets with the rider helmeted, which
   is the market adaptation the compliance and canvas screens refer to. */

const NL_PLAZA = 'a modern glass-and-granite office plaza, ginkgo trees, flat overcast daylight';
const DE_OLD_TOWN = 'a cobbled old-town street lined with classical facades, soft overcast light';

/** The shoot each market and placement opens with. Germany has its own
 *  helmeted old-town set; Belgium is a Dutch-language market and follows the
 *  Netherlands shoot, using the Ace set so the two markets stay tellable apart. */
export const defaultAssetBackgrounds: Record<string, string> = {
  'nl-ig': 'gen-ivy-nl-square',
  'nl-li': 'gen-ivy-nl-wide',
  'nl-st': 'gen-ivy-nl-story',

  'de-ig': 'gen-ace-de-square',
  'de-li': 'gen-ace-de-wide',
  'de-st': 'gen-ace-de-story',

  'be-ig': 'gen-ace-nl-square',
  'be-li': 'gen-ace-nl-wide',
  'be-st': 'gen-ace-nl-story',
};

export const campaignMedia: MediaItem[] = [

  {
    id: 'gen-ace-nl-square',
    name: 'ace-plaza-square-nl-2001.jpg',
    src: acePlazaSquareNl,
    kind: 'Image',
    market: 'Netherlands',
    dims: '2048 × 2048',
    duration: '',
    poster: 0,
    captions: false,
    tone: '#B9BDB6',
    desc: `Rider standing over the Ace in front of ${NL_PLAZA}. Square crop for Instagram feed.`,
    tags: ['ace', 'commuter', 'urban', 'square', 'generated', 'netherlands'],
    conf: 94,
    reasoning:
      'Frame geometry and the graphite diamond frame identify the Ace. Square ratio matches the Instagram feed placement. Rider is unhelmeted, which is correct for the Dutch set.',
  },
  {
    id: 'gen-ace-nl-wide',
    name: 'ace-plaza-wide-nl-2002.jpg',
    src: acePlazaWideNl,
    kind: 'Image',
    market: 'Netherlands',
    dims: '2752 × 1536',
    duration: '',
    poster: 0,
    captions: false,
    tone: '#B5BAB4',
    desc: `Wide shot of the Ace and rider crossing ${NL_PLAZA}. Landscape crop for LinkedIn.`,
    tags: ['ace', 'commuter', 'urban', 'wide', 'generated', 'netherlands'],
    conf: 92,
    reasoning:
      'Landscape ratio and the generous left margin suit a LinkedIn single image with an overlaid headline.',
  },
  {
    id: 'gen-ace-nl-story',
    name: 'ace-plaza-story-nl-2003.jpg',
    src: acePlazaStoryNl,
    kind: 'Image',
    market: 'Netherlands',
    dims: '1536 × 2752',
    duration: '',
    poster: 0,
    captions: false,
    tone: '#B7BCB7',
    desc: `Vertical portrait of the rider on the Ace at ${NL_PLAZA}. Story and Reels crop.`,
    tags: ['ace', 'commuter', 'urban', 'story', 'generated', 'netherlands'],
    conf: 91,
    reasoning:
      'Vertical ratio with headroom above the rider leaves space for a story headline without covering the product.',
  },
  {
    id: 'gen-ivy-nl-square',
    name: 'ivy-plaza-square-nl-2004.jpg',
    src: ivyPlazaSquareNl,
    kind: 'Image',
    market: 'Netherlands',
    dims: '2048 × 2048',
    duration: '',
    poster: 0,
    captions: false,
    tone: '#B0B3AC',
    desc: `Rider riding the burgundy Ivy past ${NL_PLAZA}, profile to camera. Square crop for Instagram feed.`,
    tags: ['ivy', 'commuter', 'urban', 'square', 'generated', 'netherlands'],
    conf: 95,
    reasoning:
      'The burgundy step-through frame identifies the Ivy. Profile framing and motion read as an in-use shot rather than a product still.',
  },
  {
    id: 'gen-ivy-nl-wide',
    name: 'ivy-plaza-wide-nl-2005.jpg',
    src: ivyPlazaWideNl,
    kind: 'Image',
    market: 'Netherlands',
    dims: '1376 × 768',
    duration: '',
    poster: 0,
    captions: false,
    tone: '#AEB2AB',
    desc: `Wide tracking shot of the Ivy passing ${NL_PLAZA}, left to right. Landscape crop for LinkedIn.`,
    tags: ['ivy', 'commuter', 'urban', 'wide', 'generated', 'netherlands'],
    conf: 90,
    reasoning:
      'Tracking composition parallel to the camera. Delivered below the 1200 px LinkedIn width, so it is flagged for a re-render before paid use.',
  },
  {
    id: 'gen-ivy-nl-story',
    name: 'ivy-plaza-story-nl-2006.jpg',
    src: ivyPlazaStoryNl,
    kind: 'Image',
    market: 'Netherlands',
    dims: '1536 × 2752',
    duration: '',
    poster: 0,
    captions: false,
    tone: '#B2B6AF',
    desc: `Vertical portrait of the rider on the Ivy at ${NL_PLAZA}. Story and Reels crop.`,
    tags: ['ivy', 'commuter', 'urban', 'story', 'generated', 'netherlands'],
    conf: 93,
    reasoning:
      'Vertical ratio with the rider centred low in frame, leaving a clear upper third for the story headline.',
  },
  {
    id: 'gen-ace-de-square',
    name: 'ace-old-town-square-de-2007.jpg',
    src: aceOldTownSquareDe,
    kind: 'Image',
    market: 'Germany',
    dims: '1024 × 1024',
    duration: '',
    poster: 0,
    captions: false,
    tone: '#BCB6AB',
    desc: `Helmeted rider stopped on the Ace, one foot down, on ${DE_OLD_TOWN}. Square crop for Instagram feed.`,
    tags: ['ace', 'commuter', 'old town', 'helmet', 'square', 'generated', 'germany'],
    conf: 88,
    reasoning:
      'Helmet is present, which the German set requires. Delivered at 1024 px square, below the 1080 px feed spec, so it needs a re-render before paid use.',
  },
  {
    id: 'gen-ace-de-wide',
    name: 'ace-old-town-wide-de-2008.jpg',
    src: aceOldTownWideDe,
    kind: 'Image',
    market: 'Germany',
    dims: '1376 × 768',
    duration: '',
    poster: 0,
    captions: false,
    tone: '#BAB4A9',
    desc: `Wide shot of the helmeted rider and the Ace on ${DE_OLD_TOWN}. Landscape crop for LinkedIn.`,
    tags: ['ace', 'commuter', 'old town', 'helmet', 'wide', 'generated', 'germany'],
    conf: 87,
    reasoning:
      'Landscape framing with the street receding behind the rider. Helmet present, as the German set requires.',
  },
  {
    id: 'gen-ace-de-story',
    name: 'ace-old-town-story-de-2009.jpg',
    src: aceOldTownStoryDe,
    kind: 'Image',
    market: 'Germany',
    dims: '1536 × 2752',
    duration: '',
    poster: 0,
    captions: false,
    tone: '#B8B2A7',
    desc: `Vertical portrait of the helmeted rider with the Ace on ${DE_OLD_TOWN}. Story and Reels crop.`,
    tags: ['ace', 'commuter', 'old town', 'helmet', 'story', 'generated', 'germany'],
    conf: 90,
    reasoning:
      'Vertical ratio at full story resolution. Helmet present and the frame badge is legible, so product identification is unambiguous.',
  },
  {
    id: 'gen-ivy-de-square',
    name: 'ivy-old-town-square-de-2010.jpg',
    src: ivyOldTownSquareDe,
    kind: 'Image',
    market: 'Germany',
    dims: '1024 × 1024',
    duration: '',
    poster: 0,
    captions: false,
    tone: '#B4AEA4',
    desc: `Helmeted rider riding the burgundy Ivy along ${DE_OLD_TOWN}, profile to camera. Square crop for Instagram feed.`,
    tags: ['ivy', 'commuter', 'old town', 'helmet', 'square', 'generated', 'germany'],
    conf: 86,
    reasoning:
      'Helmet present and the Ivy step-through frame is clearly readable. Delivered at 1024 px square, below the 1080 px feed spec.',
  },
  {
    id: 'gen-ivy-de-wide',
    name: 'ivy-old-town-wide-de-2011.jpg',
    src: ivyOldTownWideDe,
    kind: 'Image',
    market: 'Germany',
    dims: '1376 × 768',
    duration: '',
    poster: 0,
    captions: false,
    tone: '#B6B0A6',
    desc: `Wide tracking shot of the Ivy passing along ${DE_OLD_TOWN}, left to right. Landscape crop for LinkedIn.`,
    tags: ['ivy', 'commuter', 'old town', 'helmet', 'wide', 'generated', 'germany'],
    conf: 89,
    reasoning:
      'Tracking composition parallel to the camera, matching the Dutch wide shot so the two markets can run the same layout.',
  },
  {
    id: 'gen-ivy-de-story',
    name: 'ivy-old-town-story-de-2012.jpg',
    src: ivyOldTownStoryDe,
    kind: 'Image',
    market: 'Germany',
    dims: '768 × 1376',
    duration: '',
    poster: 0,
    captions: false,
    tone: '#B3ADA3',
    desc: `Vertical portrait of the helmeted rider on the Ivy at ${DE_OLD_TOWN}. Story and Reels crop.`,
    tags: ['ivy', 'commuter', 'old town', 'helmet', 'story', 'generated', 'germany'],
    conf: 84,
    reasoning:
      'Vertical ratio delivered at 768 px wide, below the 1080 px story spec. Flagged for a re-render before paid use.',
  },
];
