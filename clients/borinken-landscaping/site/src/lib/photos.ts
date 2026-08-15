import { getImage } from 'astro:assets';
import heroCrewTrimming from '../assets/photos/hero-crew-trimming-topiary.jpg';
import topiaryBefore from '../assets/photos/topiary-before.jpg';
import topiaryAfter from '../assets/photos/topiary-after.jpg';
import hedgeTrimmingPoolMain from '../assets/photos/hedge-trimming-pool-main.jpg';
import hedgeTrimmingCurbsidePage from '../assets/photos/hedge-trimming-curbside-page.jpg';
import landscapeDesignMulchIslandMain from '../assets/photos/landscape-design-mulch-island-main.jpg';
import landscapeDesignPlantingCrewPage from '../assets/photos/landscape-design-planting-crew-page.jpg';
import mowingTrailerMain from '../assets/photos/mowing-trailer-main.jpg';
import mowingFreshLawnPage from '../assets/photos/mowing-fresh-lawn-page.jpg';
import mulchPlantingPalmsMain from '../assets/photos/mulch-planting-palms-main.jpg';
import mulchPlantingFoundationBedPage from '../assets/photos/mulch-planting-foundation-bed-page.jpg';
import palmPruningActionMain from '../assets/photos/palm-pruning-action-main.jpg';
import palmPruningFramedHousePage from '../assets/photos/palm-pruning-framed-house-page.jpg';

// Central metadata registry of the client's approved photos. Second delivery
// (2026-08-15) — operator sorted a batch of real photos into named pairs per
// service ("X main.jpg" = homepage row thumbnail, "X page.jpg" = that
// service's own page hero), replacing the thinner original library. The
// hero slider photos (topiary before/after + the composited wide crew shot)
// are unrelated to this batch and stay as the homepage hero.

export interface PhotoMeta {
  img: ImageMetadata;
  alt: string;
  orientation: 'portrait' | 'landscape' | 'square';
  quality: 'strong';
  subject: 'action-detail' | 'before' | 'after' | 'equipment' | 'result';
  serviceRelevance: string[];
  heroCandidate: boolean;
  containsPeople: boolean;
  containsLogo: boolean;
  beforeAfter: boolean;
}

export const PHOTO_REGISTRY = {
  'hero-crew-trimming': {
    img: heroCrewTrimming,
    alt: 'Borinken Landscaping crew member trimming a topiary tree beside a flagpole in a Brevard County front yard',
    orientation: 'landscape',
    quality: 'strong',
    subject: 'action-detail',
    serviceRelevance: ['hedge-tree-trimming'],
    heroCandidate: true,
    containsPeople: true,
    containsLogo: true,
    beforeAfter: false,
  },
  'topiary-before': {
    img: topiaryBefore,
    alt: 'Overgrown, unshaped topiary tree before trimming',
    orientation: 'portrait',
    quality: 'strong',
    subject: 'before',
    serviceRelevance: ['hedge-tree-trimming'],
    heroCandidate: false,
    containsPeople: false,
    containsLogo: false,
    beforeAfter: true,
  },
  'topiary-after': {
    img: topiaryAfter,
    alt: 'Same tree trimmed into a clean, rounded shape',
    orientation: 'portrait',
    quality: 'strong',
    subject: 'after',
    serviceRelevance: ['hedge-tree-trimming'],
    heroCandidate: false,
    containsPeople: false,
    containsLogo: false,
    beforeAfter: true,
  },
  'hedge-trimming-pool-main': {
    img: hedgeTrimmingPoolMain,
    alt: 'Borinken Landscaping crew member on a ladder trimming a large rounded hedge beside a lakeside pool enclosure, branded shirt visible',
    orientation: 'portrait',
    quality: 'strong',
    subject: 'action-detail',
    serviceRelevance: ['hedge-tree-trimming'],
    heroCandidate: false,
    containsPeople: true,
    containsLogo: true,
    beforeAfter: false,
  },
  'hedge-trimming-curbside-page': {
    img: hedgeTrimmingCurbsidePage,
    alt: 'Crew member using a pole saw to trim a curbside tree canopy, branded trailer parked nearby',
    orientation: 'portrait',
    quality: 'strong',
    subject: 'action-detail',
    serviceRelevance: ['hedge-tree-trimming'],
    heroCandidate: false,
    containsPeople: true,
    containsLogo: true,
    beforeAfter: false,
  },
  'landscape-design-mulch-island-main': {
    img: landscapeDesignMulchIslandMain,
    alt: 'Finished landscape design: a large curved mulch island bed with a palm tree and colorful croton plantings in a front yard',
    orientation: 'landscape',
    quality: 'strong',
    subject: 'result',
    serviceRelevance: ['landscape-design'],
    heroCandidate: true,
    containsPeople: false,
    containsLogo: false,
    beforeAfter: false,
  },
  'landscape-design-planting-crew-page': {
    img: landscapeDesignPlantingCrewPage,
    alt: 'Two Borinken Landscaping crew members installing new plants along a front walkway bed',
    orientation: 'landscape',
    quality: 'strong',
    subject: 'action-detail',
    serviceRelevance: ['landscape-design'],
    heroCandidate: false,
    containsPeople: true,
    containsLogo: false,
    beforeAfter: false,
  },
  'mowing-trailer-main': {
    img: mowingTrailerMain,
    alt: 'Borinken Landscaping branded trailer, parked curbside, with logo, phone number, and Facebook handle visible',
    orientation: 'landscape',
    quality: 'strong',
    subject: 'equipment',
    serviceRelevance: ['mowing'],
    heroCandidate: false,
    containsPeople: false,
    containsLogo: true,
    beforeAfter: false,
  },
  'mowing-fresh-lawn-page': {
    img: mowingFreshLawnPage,
    alt: 'Freshly mowed, healthy green lawn in front of a light blue Florida home',
    orientation: 'landscape',
    quality: 'strong',
    subject: 'result',
    serviceRelevance: ['mowing'],
    heroCandidate: false,
    containsPeople: false,
    containsLogo: false,
    beforeAfter: false,
  },
  'mulch-planting-palms-main': {
    img: mulchPlantingPalmsMain,
    alt: 'Fresh red mulch bed with young palm trees planted beside a garage entrance',
    orientation: 'landscape',
    quality: 'strong',
    subject: 'result',
    serviceRelevance: ['mulch-planting'],
    heroCandidate: false,
    containsPeople: false,
    containsLogo: false,
    beforeAfter: false,
  },
  'mulch-planting-foundation-bed-page': {
    img: mulchPlantingFoundationBedPage,
    alt: 'Fresh mulch bed with new foundation shrubs planted along a home’s front window',
    orientation: 'landscape',
    quality: 'strong',
    subject: 'result',
    serviceRelevance: ['mulch-planting'],
    heroCandidate: false,
    containsPeople: false,
    containsLogo: false,
    beforeAfter: false,
  },
  'palm-pruning-action-main': {
    img: palmPruningActionMain,
    alt: 'Crew member on a ladder using a chainsaw to prune dead fronds high up a tall palm tree',
    orientation: 'portrait',
    quality: 'strong',
    subject: 'action-detail',
    serviceRelevance: ['palm-tree-pruning'],
    heroCandidate: false,
    containsPeople: true,
    containsLogo: false,
    beforeAfter: false,
  },
  'palm-pruning-framed-house-page': {
    img: palmPruningFramedHousePage,
    alt: 'Two neatly pruned palm trees framing the entrance of a Florida home',
    orientation: 'landscape',
    quality: 'strong',
    subject: 'result',
    serviceRelevance: ['palm-tree-pruning'],
    heroCandidate: false,
    containsPeople: false,
    containsLogo: false,
    beforeAfter: false,
  },
} as const satisfies Record<string, PhotoMeta>;

export type PhotoKey = keyof typeof PHOTO_REGISTRY;
export const ALL_PHOTO_KEYS = Object.keys(PHOTO_REGISTRY) as PhotoKey[];

export interface OptimizedPhoto {
  src: string;
  srcset: string;
  alt: string;
  width: number;
  height: number;
}

// Responsive widths through Astro's asset pipeline: next-gen format plus a
// srcset, and intrinsic dimensions on every consumer so images never shift
// layout (CLS).
export async function getOptimizedPhoto(key: PhotoKey, width = 800): Promise<OptimizedPhoto> {
  const entry: PhotoMeta = PHOTO_REGISTRY[key];
  const widths = [Math.round(width / 2), width, Math.min(width * 2, entry.img.width)];
  const optimized = await getImage({ src: entry.img, width, widths, format: 'webp' });
  return {
    src: optimized.src,
    srcset: optimized.srcSet.attribute,
    alt: entry.alt,
    width: Number(optimized.attributes.width ?? width),
    height: Number(optimized.attributes.height ?? 0),
  };
}

export async function getGalleryPhotos(keys: PhotoKey[], width = 800): Promise<OptimizedPhoto[]> {
  return Promise.all(keys.map((k) => getOptimizedPhoto(k, width)));
}

/** Best hero: prefers heroCandidate; landscape first for desktop bands. */
export function selectHeroKey(): PhotoKey | undefined {
  const meta = (k: PhotoKey): PhotoMeta => PHOTO_REGISTRY[k];
  const candidates = ALL_PHOTO_KEYS.filter((k) => meta(k).heroCandidate);
  const pool = candidates.length > 0 ? candidates : ALL_PHOTO_KEYS;
  return pool.sort(
    (a, b) =>
      (meta(a).orientation === 'landscape' ? 0 : 1) - (meta(b).orientation === 'landscape' ? 0 : 1)
  )[0];
}

/** Photos that genuinely depict work for a service, excluding any keys already used on the page. */
export function selectServiceKeys(serviceSlug: string, exclude: PhotoKey[] = []): PhotoKey[] {
  const meta = (k: PhotoKey): PhotoMeta => PHOTO_REGISTRY[k];
  const relevant = ALL_PHOTO_KEYS.filter(
    (k) => meta(k).serviceRelevance.includes(serviceSlug) && !exclude.includes(k)
  );
  return relevant.length > 0 ? relevant : ALL_PHOTO_KEYS.filter((k) => !exclude.includes(k));
}

/** The real before/after pair — the site's one signature transformation. */
export function getBeforeAfterPair(): { before: PhotoMeta; after: PhotoMeta } {
  return { before: PHOTO_REGISTRY['topiary-before'], after: PHOTO_REGISTRY['topiary-after'] };
}

/** The homepage-row "main" photo for a service, per the operator's own main/page split. */
export function getServiceMainPhoto(slug: string): PhotoMeta | undefined {
  const map: Record<string, PhotoKey> = {
    'hedge-tree-trimming': 'hedge-trimming-pool-main',
    'landscape-design': 'landscape-design-mulch-island-main',
    mowing: 'mowing-trailer-main',
    'mulch-planting': 'mulch-planting-palms-main',
    'palm-tree-pruning': 'palm-pruning-action-main',
  };
  const key = map[slug];
  return key ? PHOTO_REGISTRY[key] : undefined;
}

/** The service-page hero photo, per the operator's own main/page split. */
export function getServicePagePhoto(slug: string): PhotoMeta | undefined {
  const map: Record<string, PhotoKey> = {
    'hedge-tree-trimming': 'hedge-trimming-curbside-page',
    'landscape-design': 'landscape-design-planting-crew-page',
    mowing: 'mowing-fresh-lawn-page',
    'mulch-planting': 'mulch-planting-foundation-bed-page',
    'palm-tree-pruning': 'palm-pruning-framed-house-page',
  };
  const key = map[slug];
  return key ? PHOTO_REGISTRY[key] : undefined;
}
