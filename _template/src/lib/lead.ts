// The internal Lead DTO — every lead-capture form on the site builds this
// one normalized shape. Provider-specific formatting (GHL field names, key
// constraints) lives ONLY in the server-side adapter (functions/api/lead.ts),
// never here and never in a component.
export interface Lead {
  name: string;
  email: string;
  phone: string;
  service: string;
  zip: string;
  message: string;
  consent: boolean;
  consent_language: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
  landing_page: string;
  referrer: string;
  submitted_at: string;
}

const ATTRIBUTION_KEY = 'lead_attribution';
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const;

// First-touch attribution: capture UTMs, landing page, and referrer on the
// first page of the visit so a lead submitted three pages later still
// carries them. sessionStorage keeps it scoped to the visit.
export function captureAttribution(): void {
  try {
    if (sessionStorage.getItem(ATTRIBUTION_KEY)) return;
    const params = new URLSearchParams(location.search);
    const attribution: Record<string, string> = {
      landing_page: location.href,
      referrer: document.referrer,
    };
    for (const key of UTM_KEYS) attribution[key] = params.get(key) ?? '';
    sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(attribution));
  } catch {
    // sessionStorage unavailable (private mode, etc.) — attribution is
    // best-effort, never block a lead over it.
  }
}

export function buildLead(form: HTMLFormElement): Lead {
  const data = new FormData(form);
  const field = (name: string) => String(data.get(name) ?? '').trim();

  let attribution: Record<string, string> = {};
  try {
    attribution = JSON.parse(sessionStorage.getItem(ATTRIBUTION_KEY) ?? '{}');
  } catch {
    // best-effort, same as above
  }

  return {
    name: field('name'),
    email: field('email'),
    phone: field('phone'),
    service: field('service'),
    zip: field('zip'),
    message: field('message'),
    consent: data.get('smsConsent') != null,
    // The exact TCPA sentence shown next to the checkbox, captured verbatim
    // so the consent record proves what the visitor agreed to.
    consent_language:
      form.querySelector('[data-consent-language]')?.textContent?.replace(/\s+/g, ' ').trim() ?? '',
    utm_source: attribution.utm_source ?? '',
    utm_medium: attribution.utm_medium ?? '',
    utm_campaign: attribution.utm_campaign ?? '',
    utm_term: attribution.utm_term ?? '',
    utm_content: attribution.utm_content ?? '',
    landing_page: attribution.landing_page ?? '',
    referrer: attribution.referrer ?? document.referrer,
    submitted_at: new Date().toISOString(),
  };
}
