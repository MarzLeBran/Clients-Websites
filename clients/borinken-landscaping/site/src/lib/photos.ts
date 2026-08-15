import { getImage } from 'astro:assets';
import heroCrewTrimming from '../assets/photos/hero-crew-trimming-topiary.jpg';
import topiaryBefore from '../assets/photos/topiary-before.jpg';
import topiaryAfter from '../assets/photos/topiary-after.jpg';
import trailerRig from '../assets/photos/trailer-rig.jpg';
import crewShirtLogo from '../assets/photos/crew-shirt-logo.jpg';

// Central metadata registry of the Stage-0-audit-approved "usable" photos
// (see brief/00-audit.md) — the audit grade gates entry: only photos rated
// usable belong here. Grade C library (5 real photos) — reuse across pages
// is expected and honest, not a bug. The hero photo is a composite: the
// real photo pasted back pixel-exact over an AI-widened background after an
// earlier outpaint attempt garbled the real logo text — see intake for the
// full provenance. Everything else here is untouched, straight from the
// client's own camera roll.

export interface PhotoMeta {
  img: ImageMetadata;
  alt: string;
  orientation: 'portrait' | 'landscape' | 'square';
  quality: 'strong';
  subject: 'action-detail' | 'before' | 'after' | 'equipment';
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
    serviceRelevance: ['edging', 'mowing'],
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
    serviceRelevance: ['edging'],
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
    serviceRelevance: ['edging'],
    heroCandidate: false,
    containsPeople: false,
    containsLogo: false,
    beforeAfter: true,
  },
  'trailer-rig': {
    img: trailerRig,
    alt: 'Borinken Landscaping branded trailer and truck parked at a job site',
    orientation: 'portrait',
    quality: 'strong',
    subject: 'equipment',
    serviceRelevance: ['mowing', 'weed-eating', 'planting', 'edging'],
    heroCandidate: false,
    containsPeople: false,
    containsLogo: true,
    beforeAfter: false,
  },
  'crew-shirt-logo': {
    img: crewShirtLogo,
    alt: 'Borinken Landscaping crew member wearing the branded work shirt',
    orientation: 'portrait',
    quality: 'strong',
    subject: 'action-detail',
    serviceRelevance: ['planting', 'weed-eating'],
    heroCandidate: false,
    containsPeople: true,
    containsLogo: true,
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
  // A thin library falls back to the general pool rather than an empty
  // strip — reuse is the honest expectation under ~20 photos.
  return relevant.length > 0 ? relevant : ALL_PHOTO_KEYS.filter((k) => !exclude.includes(k));
}

/** The real before/after pair — the site's one signature transformation. */
export function getBeforeAfterPair(): { before: PhotoMeta; after: PhotoMeta } {
  return { before: PHOTO_REGISTRY['topiary-before'], after: PHOTO_REGISTRY['topiary-after'] };
}
