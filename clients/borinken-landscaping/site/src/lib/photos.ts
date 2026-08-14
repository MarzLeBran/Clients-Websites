import { getImage } from 'astro:assets';

// Central metadata registry for the client's Stage-0-audit-approved photos.
// Filled at Stage 5: import each approved image and describe it honestly —
// the audit grade gates entry (only "strong" photos belong here), so
// anything selectable is already publishable. Pages select by metadata
// (selectHeroKey / selectServiceKeys) instead of hardcoding keys. See a
// client site for a fully populated example.

export interface PhotoMeta {
  img: ImageMetadata;
  alt: string;
  orientation: 'portrait' | 'landscape' | 'square'; // measure, don't guess
  quality: 'strong'; // the registry gate — compromised photos never enter
  subject: string; // e.g. 'exterior-after', 'interior-action', 'team'
  /** Service slugs this photo genuinely depicts work for. */
  serviceRelevance: string[];
  heroCandidate: boolean;
  containsPeople: boolean;
  containsLogo: boolean;
  beforeAfter: boolean;
}

export const PHOTO_REGISTRY = {} as const satisfies Record<string, PhotoMeta>;

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
