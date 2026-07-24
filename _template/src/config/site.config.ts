// Filled with real client data at Stage 3 (architect) / Stage 5 (build).
// Flag every field the intake didn't answer — never guess, never ship a
// placeholder that could pass as real.
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
    webhookUrl: '',
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
