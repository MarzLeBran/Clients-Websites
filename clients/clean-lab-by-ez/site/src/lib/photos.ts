import { getImage } from 'astro:assets';
import blackVehicle from '../assets/photos/black-vehicle-detailing.jpg';
import fullDetail from '../assets/photos/full-detail.jpg';
import maintenance from '../assets/photos/maintenance-detailing.jpg';
import suvExterior from '../assets/photos/suv-exterior-detail.jpeg';
import teslaGloss from '../assets/photos/tesla-black-gloss.jpg';
import teslaFront from '../assets/photos/tesla-front-detail.jpeg';
import truckExterior from '../assets/photos/truck-exterior-detail.jpg';
import seatExtraction from '../assets/photos/seat-extraction-action.jpg';

// Central registry of the 8 real, Stage-0-audit-approved "strong" photos —
// every page that wants a real photo looks one up here by key instead of
// re-importing ad hoc. Only 8 exist (photo grade C, per the audit), so
// pages are expected to reuse these across services/areas/city pages
// rather than pretend there's a unique shot for every combination.
export const PHOTO_REGISTRY = {
  'black-vehicle-detailing': { img: blackVehicle, alt: 'Black Cadillac Escalade IQ after a Clean Lab by EZ detail, glossy front three-quarter view' },
  'full-detail': { img: fullDetail, alt: 'The same detailed Cadillac Escalade IQ parked in a driveway after a full detail' },
  'maintenance-detailing': { img: maintenance, alt: 'Orange Chevrolet Corvette C8 after a Lab Refresh maintenance detail' },
  'suv-exterior-detail': { img: suvExterior, alt: 'Silver Lexus NX after an exterior detail in daylight' },
  'tesla-black-gloss': { img: teslaGloss, alt: 'Black Tesla with a high-gloss finish, rear three-quarter view at dusk' },
  'tesla-front-detail': { img: teslaFront, alt: "Close-up of a detailed black Tesla's front end" },
  'truck-exterior-detail': { img: truckExterior, alt: 'Gray Ford F-150 after an exterior detail' },
  'seat-extraction-action': { img: seatExtraction, alt: 'Clean Lab by EZ technician performing a seat extraction and shampoo' },
} as const;

export type PhotoKey = keyof typeof PHOTO_REGISTRY;

export async function getOptimizedPhoto(key: PhotoKey, width = 800) {
  const entry = PHOTO_REGISTRY[key];
  const optimized = await getImage({ src: entry.img, width, format: 'webp' });
  return { src: optimized.src, alt: entry.alt };
}

export async function getGalleryPhotos(keys: PhotoKey[], width = 800) {
  return Promise.all(keys.map((k) => getOptimizedPhoto(k, width)));
}

export const ALL_PHOTO_KEYS = Object.keys(PHOTO_REGISTRY) as PhotoKey[];
