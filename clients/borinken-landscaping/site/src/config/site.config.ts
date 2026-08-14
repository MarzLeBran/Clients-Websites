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
  mode: 'demo', // every new spin starts as a demo; flip at real launch
  business: {
    legalName: '',
    displayName: '',
    tagline: '',
    founded: '',
    licenseNumber: '',
    insuranceNote: '',
    phone: '',
    phoneE164: '',
    sms: false,
    email: '',
    address: {
      street: '',
      city: '',
      state: '',
      zip: '',
      showPublicly: false,
    },
    geo: { lat: 0, lng: 0 },
    hours: [],
    emergencyService: false,
  },
  areas: [],
  services: [],
  social: {
    google: '',
    facebook: '',
    instagram: '',
    tiktok: '',
    yelp: '',
  },
  booking: {
    provider: 'none',
    embedUrl: '',
    mode: '',
  },
  forms: {
    endpoint: '/api/lead', // inert until deployed with the bundled proxy + secret
    smsConsentRequired: true,
  },
  chat: {
    enabled: false,
    mode: 'off',
  },
  tracking: {
    ga4: '',
    gtm: '',
    callRailSwapTarget: '',
  },
  seo: {
    defaultTitle: '',
    defaultDescription: '',
    ogImage: '',
  },
};
