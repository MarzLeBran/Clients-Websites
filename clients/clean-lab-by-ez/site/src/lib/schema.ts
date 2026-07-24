import type { site as siteConfig } from '../config/site.config';

type Site = typeof siteConfig;

// Use the most-specific LocalBusiness subtype for the vertical at Stage 3
// (e.g. "AutoDetailingBusiness" isn't a real schema.org type — check
// schema.org/LocalBusiness for the closest real subtype, fall back to
// "LocalBusiness" if none fits).
export function buildLocalBusinessSchema(site: Site, type = 'LocalBusiness') {
  return {
    '@context': 'https://schema.org',
    '@type': type,
    name: site.business.displayName,
    telephone: site.business.phone,
    email: site.business.email || undefined,
    address: site.business.address.showPublicly
      ? {
          '@type': 'PostalAddress',
          streetAddress: site.business.address.street,
          addressLocality: site.business.address.city,
          addressRegion: site.business.address.state,
          postalCode: site.business.address.zip,
        }
      : undefined,
    // Per Google's service-area-business guidance: a mobile business with no
    // fixed public location should rely on areaServed, not assert a precise
    // geo point. Only emit geo when there's a real public address to anchor
    // it to — never a synthetic town-centroid standing in for one.
    geo:
      site.business.address.showPublicly && site.business.geo.lat && site.business.geo.lng
        ? {
            '@type': 'GeoCoordinates',
            latitude: site.business.geo.lat,
            longitude: site.business.geo.lng,
          }
        : undefined,
    areaServed: site.areas.map((a) => a.city),
    openingHoursSpecification: site.business.hours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.day,
      opens: h.open,
      closes: h.close,
    })),
    sameAs: Object.values(site.social).filter(Boolean),
  };
}

export function buildServiceSchema(
  service: { name: string; slug: string; priceFrom?: number },
  site: Site,
  // City×service pages pass a single city here so the schema reflects the
  // actual page content instead of every city, which read as duplicated to
  // a crawler when every page emitted the identical sitewide list.
  areaServed?: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    provider: { '@type': 'LocalBusiness', name: site.business.displayName },
    areaServed: areaServed ? [areaServed] : site.areas.map((a) => a.city),
    offers: service.priceFrom
      ? { '@type': 'Offer', priceCurrency: 'USD', price: service.priceFrom }
      : undefined,
  };
}

export function buildFAQPageSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}

export function buildBreadcrumbListSchema(crumbs: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: c.url,
    })),
  };
}

export function buildPersonSchema(member: { name: string; role: string; photo?: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: member.name,
    jobTitle: member.role,
    image: member.photo || undefined,
  };
}

// AggregateRating is intentionally NOT built by default anywhere in the
// template. Only emit it on a page that has real, firstParty: true
// testimonial entries — see seo-auditor's warning about misuse.
export function buildAggregateRatingSchema(testimonials: { rating: number; firstParty: boolean }[]) {
  const real = testimonials.filter((t) => t.firstParty);
  if (real.length === 0) return null;
  const avg = real.reduce((sum, t) => sum + t.rating, 0) / real.length;
  return {
    '@type': 'AggregateRating',
    ratingValue: Number(avg.toFixed(1)),
    reviewCount: real.length,
  };
}
