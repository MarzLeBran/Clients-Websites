// Filled with real client data at Stage 3 (architect) / Stage 5 (build).
// Flag every field the intake didn't answer — never guess, never ship a
// placeholder that could pass as real. See brief/03-architecture.md for the
// sourced fill plan this file implements.
export interface SiteConfig {
  business: {
    legalName: string;
    displayName: string;
    tagline: string;
    founded: string;
    licenseNumber: string;
    insuranceNote: string;
    phone: string;
    phoneE164: string;
    sms: boolean;
    email: string;
    address: {
      street: string;
      city: string;
      state: string;
      zip: string;
      showPublicly: boolean;
    };
    geo: { lat: number; lng: number };
    hours: { day: string; open: string; close: string }[];
    emergencyService: boolean;
  };
  areas: { city: string; state: string; slug: string; county?: string; blurb: string }[];
  services: {
    name: string;
    slug: string;
    isPrimary: boolean;
    priceFrom?: number;
    // Deviation from the generic build-standards shape, flagged: this
    // client sells by vehicle size, not a flat per-service price. Only the
    // two real tiers have this; add-ons don't.
    pricingByVehicle?: { sedan: number; suv: number; truck: number };
  }[];
  social: {
    google: string;
    facebook: string;
    instagram: string;
    tiktok: string;
    yelp: string;
  };
  booking: {
    // 'other' covers providers like Housecall Pro / ServiceTitan that don't
    // have a dedicated embed component.
    provider: 'calendly' | 'ghl' | 'google' | 'other' | 'none';
    embedUrl: string;
    mode: string;
  };
  forms: {
    webhookUrl: string;
    smsConsentRequired: boolean;
  };
  chat: {
    enabled: boolean;
    mode: 'faq' | 'faq-booking' | 'off';
  };
  tracking: {
    ga4: string;
    gtm: string;
    callRailSwapTarget: string;
  };
  seo: {
    defaultTitle: string;
    defaultDescription: string;
    ogImage: string;
  };
}

export const site: SiteConfig = {
  business: {
    // Confirmed by operator (2026-07-23, 2026-07-24): "Clean Lab by EZ" is
    // the legal name, matching the flyer spelling. Dummy/demo build for
    // now — GHL, license, reviews, and domain intentionally left pending
    // until this goes to a real launch.
    legalName: 'Clean Lab by EZ',
    displayName: 'Clean Lab by EZ',
    tagline: 'Lab grade clean for your car.', // flyer-2.jpg
    founded: '', // UNANSWERED — PENDING OPERATOR, do not guess
    licenseNumber: '', // UNANSWERED — may be N/A for FL mobile detailing, do not assume
    insuranceNote: '', // UNANSWERED — PENDING OPERATOR
    phone: '(689) 200-6472', // flyer-1.PNG, flyer-2.jpg, google-profile.jpg
    phoneE164: '+16892006472',
    sms: true, // operator, 2026-07-23: standard SMS works
    email: 'cleanlabbyez@gmail.com', // operator, 2026-07-23
    address: {
      street: '', // fully mobile, no address disclosed — operator, 2026-07-23
      city: 'Davenport',
      state: 'FL',
      zip: '',
      showPublicly: false,
    },
    // Public Davenport, FL town centroid — an approximate public anchor
    // point for LocalBusiness schema, NOT the operator's real location
    // (none was disclosed; fully mobile business).
    geo: { lat: 28.1611, lng: -81.6017 },
    hours: [
      { day: 'Monday', open: '08:00', close: '17:00' },
      { day: 'Tuesday', open: '08:00', close: '17:00' },
      { day: 'Wednesday', open: '08:00', close: '17:00' },
      { day: 'Thursday', open: '08:00', close: '17:00' },
      { day: 'Friday', open: '08:00', close: '17:00' },
      { day: 'Saturday', open: '08:00', close: '17:00' },
    ], // operator, 2026-07-23: Monday–Saturday 8am–5pm, closed Sunday
    emergencyService: false, // no evidence offered — not assumed true
  },
  areas: [
    {
      city: 'Davenport',
      state: 'FL',
      slug: 'davenport',
      county: 'Polk', // public record, not intake-confirmed
      blurb: '',
    },
    {
      city: 'Kissimmee',
      state: 'FL',
      slug: 'kissimmee',
      county: 'Osceola',
      blurb: '',
    },
    {
      city: 'St. Cloud',
      state: 'FL',
      slug: 'st-cloud',
      county: 'Osceola',
      blurb: '',
    },
    {
      city: 'Orlando',
      state: 'FL',
      slug: 'orlando',
      county: 'Orange',
      blurb: '',
    },
    {
      city: 'Poinciana',
      state: 'FL',
      slug: 'poinciana',
      county: 'Polk',
      blurb: '',
    },
    {
      city: 'Haines City',
      state: 'FL',
      slug: 'haines-city',
      county: 'Polk',
      blurb: '',
    },
  ], // flyer-1.PNG, "ÁREAS QUE CUBRIMOS"; blurbs written into the areas content collection, not here
  services: [
    {
      name: 'Lab Refresh',
      slug: 'lab-refresh',
      isPrimary: true,
      priceFrom: 79,
      pricingByVehicle: { sedan: 79, suv: 99, truck: 119 },
    },
    {
      name: 'Lab Reset',
      slug: 'lab-reset',
      isPrimary: true,
      priceFrom: 125,
      pricingByVehicle: { sedan: 125, suv: 150, truck: 175 },
    },
    { name: 'Pet Hair Removal', slug: 'pet-hair-removal', isPrimary: false, priceFrom: 25 },
    { name: 'Engine Bay Cleaning', slug: 'engine-bay-cleaning', isPrimary: false }, // priceFrom UNANSWERED — not priced on either flyer
  ], // flyer-1.PNG, flyer-2.jpg
  social: {
    google: '', // GBP screenshot exists, no URL/place ID captured — UNANSWERED
    facebook: '', // icon present on flyer-1.PNG, no handle/URL captured — UNANSWERED
    instagram: 'https://instagram.com/cleanlabbyez', // flyer-1.PNG, flyer-2.jpg
    tiktok: '',
    yelp: '',
  },
  booking: {
    // GHL confirmed as the intended provider (operator, 2026-07-23), but no
    // real embed URL exists yet. Shipping 'none' with the safe form+phone
    // fallback rather than a broken iframe — blocking item, see brief/03.
    provider: 'none',
    embedUrl: '',
    mode: '',
  },
  forms: {
    webhookUrl: '', // blocking — no GHL webhook URL provided yet
    smsConsentRequired: true,
  },
  chat: {
    enabled: false,
    mode: 'off', // intake Q31 unanswered — default off, not assumed
  },
  tracking: {
    ga4: '',
    gtm: '',
    callRailSwapTarget: '',
  },
  seo: {
    defaultTitle: 'Mobile Auto Detailing in Davenport, FL | Clean Lab by EZ',
    // Kept to ~137 chars — Google truncates past ~155.
    defaultDescription:
      'Mobile auto detailing in Davenport, FL and 5 nearby cities. 5.0 stars, 25 Google reviews. We bring the lab to your driveway or workplace.',
    ogImage: '/og-image.jpg', // black-vehicle-detailing.jpg, static passthrough in public/
  },
};
