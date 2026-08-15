// Filled with real client data at Stage 3 (architect) / Stage 5 (build).
// Flag every field the intake didn't answer — never guess, never ship a
// placeholder that could pass as real.
export interface SiteConfig {
  // Demo is a strict subset of production in the same project, never a
  // throwaway. 'demo': integrations are mocked — booking renders the
  // form+phone fallback regardless of provider, chat stays off, and lead
  // forms never POST anywhere (visible call/text fallback instead). A demo
  // needs only: name, logo, phone, primary services, one brand color,
  // optional photos. 'production': real integrations, full page set, full
  // SEO — flipped in place; tokens, logo, photos, and pages carry forward.
  mode: 'demo' | 'production';
  business: {
    legalName: string;
    displayName: string;
    tagline: string;
    // Optional second-language rendering of `tagline`, shown alongside it
    // (not a language switcher) when the client's own voice is genuinely
    // bilingual — e.g. a real quote they use in both languages. Empty
    // string when not applicable; never machine-translate to fill this in.
    taglineSecondary: string;
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
  // Free-text fallback ("Brevard County, FL") used for areaServed schema and
  // header/footer copy when `areas` is empty — common pre-launch, when a
  // client has confirmed a general service region but not a ranked city
  // list yet. Empty string is fine; just don't invent city names to fill it.
  serviceAreaLabel: string;
  services: { name: string; slug: string; isPrimary: boolean; priceFrom?: number }[];
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
    // Same-origin proxy path (functions/api/lead.ts). The real GHL webhook
    // URL lives ONLY in the GHL_WEBHOOK_URL server env secret — it must
    // never appear here, in any component, or anywhere in the client
    // bundle. Empty string → forms show the visible call/text fallback.
    endpoint: string;
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
  mode: 'demo',
  business: {
    legalName: 'Borinken Landscaping LLC', // confirmed — Google Business Profile
    displayName: 'Borinken Landscaping', // confirmed
    tagline: 'Let us be your blessing', // confirmed quote
    taglineSecondary: 'Permítanos ser su bendición', // confirmed — same quote, Facebook page, shown bilingually
    founded: '', // PENDING — not in intake, do not guess
    licenseNumber: '', // PENDING
    insuranceNote: '', // PENDING
    phone: '(321) 271-1134', // confirmed
    phoneE164: '+13212711134', // confirmed
    sms: true,
    email: '', // PENDING — not in intake
    address: {
      street: '1329 Coral Reef Ave NW', // confirmed, Google Business Profile
      city: 'Palm Bay',
      state: 'FL',
      zip: '32907',
      showPublicly: false, // operator confirmed — keep private
    },
    geo: { lat: 28.0330214, lng: -80.7113429 }, // confirmed, from Google Maps listing
    hours: [
      { day: 'Monday', open: '7:00 AM', close: '4:00 PM' },
      { day: 'Tuesday', open: '7:00 AM', close: '4:00 PM' },
      { day: 'Wednesday', open: '7:00 AM', close: '4:00 PM' },
      { day: 'Thursday', open: '7:00 AM', close: '4:00 PM' },
      { day: 'Friday', open: '7:00 AM', close: '4:00 PM' },
      { day: 'Saturday', open: '', close: '' }, // confirmed closed
      { day: 'Sunday', open: '', close: '' }, // confirmed closed
    ],
    emergencyService: false, // no emergency/24-7 claim anywhere in intake
  },
  areas: [], // empty — no confirmed city list, see brief/03-architecture.md
  serviceAreaLabel: 'Brevard County, FL', // confirmed — county-wide, not a specific city list
  // Revised 2026-08-15 — operator-confirmed final list, replacing the
  // original 4. Weed eating and edging are real things Hiram does but not
  // stand-alone services worth their own page; folded into other service
  // copy where relevant instead.
  services: [
    { name: 'Mowing', slug: 'mowing', isPrimary: true },
    { name: 'Mulch & Planting', slug: 'mulch-planting', isPrimary: true },
    { name: 'Hedge & Tree Trimming', slug: 'hedge-tree-trimming', isPrimary: true },
    { name: 'Palm Tree Pruning', slug: 'palm-tree-pruning', isPrimary: true },
    { name: 'Landscape Design', slug: 'landscape-design', isPrimary: true },
  ],
  social: {
    google: '', // PENDING — real GBP found via search, exact profile URL not captured; grab at build time
    facebook: '', // PENDING — real page exists (source of tagline/services), URL not saved; grab at build time
    instagram: '',
    tiktok: '',
    yelp: '',
  },
  booking: {
    provider: 'none',
    embedUrl: '',
    mode: 'form', // demo mode — form + phone fallback only
  },
  forms: {
    endpoint: '/api/lead', // inert until deployed with the bundled proxy + secret
    smsConsentRequired: true,
  },
  chat: {
    enabled: false, // demo mode — chat stays off
    mode: 'off',
  },
  tracking: {
    ga4: '', // PENDING
    gtm: '', // PENDING
    callRailSwapTarget: '', // PENDING
  },
  seo: {
    defaultTitle: 'Borinken Landscaping | Lawn Care & Landscaping, Brevard County FL',
    defaultDescription:
      'Owner-operated lawn care and landscaping in Brevard County, FL. Mowing, weed eating, planting, and edging. 5.0 stars on Google.',
    ogImage: '/images/og-hero.jpg',
  },
};
