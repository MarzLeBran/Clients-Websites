import { getImage } from 'astro:assets';
import blackVehicle from '../assets/photos/black-vehicle-detailing.jpg';
import fullDetail from '../assets/photos/full-detail.jpg';
import maintenance from '../assets/photos/maintenance-detailing.jpg';
import suvExterior from '../assets/photos/suv-exterior-detail.jpeg';
import teslaGloss from '../assets/photos/tesla-black-gloss.jpg';
import teslaFront from '../assets/photos/tesla-front-detail.jpeg';
import truckExterior from '../assets/photos/truck-exterior-detail.jpg';
import seatExtraction from '../assets/photos/seat-extraction-action.jpg';

// Central metadata registry of the 8 real, Stage-0-audit-approved "strong"
// photos — the audit grade gates entry: only photos the audit rated strong
// belong here, so anything selectable is already publishable. Pages select
// by metadata (getHeroPhoto / getServicePhotos) instead of hardcoding keys;
// with only 8 photos (grade C), reuse across pages is expected and honest.
// Orientation/dimensions are measured from the files, not guessed.

export interface PhotoMeta {
  img: ImageMetadata;
  alt: string;
  orientation: 'portrait' | 'landscape' | 'square';
  quality: 'strong'; // the registry gate — compromised photos never enter
  subject: 'exterior-after' | 'exterior-detail' | 'interior-action';
  /** Service slugs this photo genuinely depicts work for. */
  serviceRelevance: string[];
  heroCandidate: boolean;
  containsPeople: boolean;
  containsLogo: boolean;
  beforeAfter: boolean; // no pairs exist yet — Stage 0's top shoot request
}

export const PHOTO_REGISTRY = {
  'black-vehicle-detailing': {
    img: blackVehicle,
    alt: 'Black Cadillac Escalade IQ after a Clean Lab by EZ detail, glossy front three-quarter view',
    orientation: 'portrait',
    quality: 'strong',
    subject: 'exterior-after',
    serviceRelevance: ['lab-refresh', 'lab-reset'],
    heroCandidate: true,
    containsPeople: false,
    containsLogo: false,
    beforeAfter: false,
  },
  'full-detail': {
    img: fullDetail,
    alt: 'The same detailed Cadillac Escalade IQ parked in a driveway after a full detail',
    orientation: 'portrait',
    quality: 'strong',
    subject: 'exterior-after',
    serviceRelevance: ['lab-refresh', 'lab-reset'],
    heroCandidate: true,
    containsPeople: false,
    containsLogo: false,
    beforeAfter: false,
  },
  'maintenance-detailing': {
    img: maintenance,
    alt: 'Orange Chevrolet Corvette C8 after a Lab Refresh maintenance detail',
    orientation: 'portrait',
    quality: 'strong',
    subject: 'exterior-after',
    serviceRelevance: ['lab-refresh'],
    heroCandidate: false,
    containsPeople: false,
    containsLogo: false,
    beforeAfter: false,
  },
  'suv-exterior-detail': {
    img: suvExterior,
    alt: 'Silver Lexus NX after an exterior detail in daylight',
    orientation: 'landscape',
    quality: 'strong',
    subject: 'exterior-after',
    serviceRelevance: ['lab-refresh'],
    heroCandidate: true,
    containsPeople: false,
    containsLogo: false,
    beforeAfter: false,
  },
  'tesla-black-gloss': {
    img: teslaGloss,
    alt: 'Black Tesla with a high-gloss finish, rear three-quarter view at dusk',
    orientation: 'landscape',
    quality: 'strong',
    subject: 'exterior-after',
    serviceRelevance: ['lab-refresh', 'lab-reset'],
    heroCandidate: true,
    containsPeople: false,
    containsLogo: false,
    beforeAfter: false,
  },
  'tesla-front-detail': {
    img: teslaFront,
    alt: "Close-up of a detailed black Tesla's front end",
    orientation: 'portrait',
    quality: 'strong',
    subject: 'exterior-detail',
    serviceRelevance: ['lab-refresh'],
    heroCandidate: false,
    containsPeople: false,
    containsLogo: false,
    beforeAfter: false,
  },
  'truck-exterior-detail': {
    img: truckExterior,
    alt: 'Gray Ford F-150 after an exterior detail',
    orientation: 'landscape',
    quality: 'strong',
    subject: 'exterior-after',
    serviceRelevance: ['lab-refresh', 'lab-reset'],
    heroCandidate: true,
    containsPeople: false,
    containsLogo: false,
    beforeAfter: false,
  },
  'seat-extraction-action': {
    img: seatExtraction,
    alt: 'Clean Lab by EZ technician performing a seat extraction and shampoo',
    orientation: 'portrait',
    quality: 'strong',
    subject: 'interior-action',
    serviceRelevance: ['lab-reset', 'pet-hair-removal'],
    heroCandidate: false,
    containsPeople: true, // back-facing, no face — operator-approved as-is
    containsLogo: true, // branded hoodie
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
  const entry = PHOTO_REGISTRY[key];
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
export function selectHeroKey(): PhotoKey {
  const candidates = ALL_PHOTO_KEYS.filter((k) => PHOTO_REGISTRY[k].heroCandidate);
  const pool = candidates.length > 0 ? candidates : ALL_PHOTO_KEYS;
  return pool.sort((a, b) => {
    const score = (k: PhotoKey) => (PHOTO_REGISTRY[k].orientation === 'landscape' ? 0 : 1);
    return score(a) - score(b);
  })[0];
}

/** Photos that genuinely depict work for a service, excluding any keys already used on the page. */
export function selectServiceKeys(serviceSlug: string, exclude: PhotoKey[] = []): PhotoKey[] {
  const relevant = ALL_PHOTO_KEYS.filter(
    (k) => (PHOTO_REGISTRY[k].serviceRelevance as readonly string[]).includes(serviceSlug) && !exclude.includes(k)
  );
  // With 8 photos, an empty relevant set falls back to the general pool
  // rather than an empty strip — reuse is the honest expectation here.
  return relevant.length > 0 ? relevant : ALL_PHOTO_KEYS.filter((k) => !exclude.includes(k));
}
