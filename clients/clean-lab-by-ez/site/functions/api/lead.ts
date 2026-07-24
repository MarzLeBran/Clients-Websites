// Same-origin lead proxy — Cloudflare Pages Functions (this path maps to
// POST /api/lead). On Netlify, move to netlify/functions/lead.ts and read
// the client IP from 'x-nf-client-connection-ip'; on Vercel, api/lead.ts
// and 'x-forwarded-for'. Only the handler signature and IP header change —
// the validation and adapter below carry over as-is.
//
// Why this exists: a browser cannot POST JSON to a GHL inbound webhook
// directly — the CORS preflight fails and the lead silently dies. Forms
// POST same-origin to this proxy instead. The real GHL webhook URL lives
// ONLY in the GHL_WEBHOOK_URL server env secret, never in the client
// bundle, never in dist/.
import type { Lead } from '../../src/lib/lead';

interface Env {
  GHL_WEBHOOK_URL?: string;
}

// Best-effort US-default E.164. Returns '' when the input can't be
// normalized — GHL silently drops unparseable phones, so we'd rather
// reject clearly than forward garbage.
function toE164(raw: string): string {
  const trimmed = raw.trim();
  if (/^\+[0-9]{8,15}$/.test(trimmed.replace(/[\s().-]/g, ''))) {
    return trimmed.replace(/[\s().-]/g, '');
  }
  const digits = trimmed.replace(/\D/g, '');
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith('1')) return `+${digits}`;
  return '';
}

// Provider adapter: Lead -> GHL inbound-webhook payload. GHL constraints:
// keys must be space-free, custom values must never be arrays. Every
// provider-specific choice stays inside this one function.
function toGHLPayload(
  lead: Lead,
  meta: { phoneE164: string; consent_ip: string; consent_timestamp: string }
) {
  return {
    full_name: lead.name,
    email: lead.email,
    phone: meta.phoneE164,
    service: lead.service,
    zip: lead.zip,
    message: lead.message,
    sms_consent: lead.consent,
    consent_language: lead.consent_language,
    consent_timestamp: meta.consent_timestamp,
    consent_ip: meta.consent_ip,
    utm_source: lead.utm_source,
    utm_medium: lead.utm_medium,
    utm_campaign: lead.utm_campaign,
    utm_term: lead.utm_term,
    utm_content: lead.utm_content,
    landing_page: lead.landing_page,
    referrer: lead.referrer,
    submitted_at: lead.submitted_at,
    source: 'website',
  };
}

function json(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

export async function onRequestPost(context: {
  request: Request;
  env: Env;
}): Promise<Response> {
  const { request, env } = context;
  const webhook = env.GHL_WEBHOOK_URL;
  if (!webhook) return json(503, { ok: false, error: 'Lead endpoint is not configured.' });

  let lead: Lead;
  try {
    lead = (await request.json()) as Lead;
  } catch {
    return json(400, { ok: false, error: 'Invalid request body.' });
  }

  const phoneE164 = toE164(lead.phone ?? '');
  const email = (lead.email ?? '').trim();
  if (!email && !phoneE164) {
    return json(422, { ok: false, error: 'A valid email or phone number is required.' });
  }
  // If the form displayed consent language, an unchecked box must never
  // reach GHL — client-side validation blocks it first; this is defense.
  if (!lead.consent && (lead.consent_language ?? '') !== '') {
    return json(422, { ok: false, error: 'SMS consent is required.' });
  }

  const payload = toGHLPayload(lead, {
    phoneE164,
    consent_timestamp: new Date().toISOString(),
    consent_ip:
      request.headers.get('CF-Connecting-IP') ?? request.headers.get('x-forwarded-for') ?? '',
  });

  try {
    const res = await fetch(webhook, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) return json(502, { ok: false, error: 'Lead delivery failed.' });
    return json(200, { ok: true });
  } catch {
    // A non-ok status makes the client show the call/text fallback — the
    // lead is surfaced to the visitor, never silently lost.
    return json(502, { ok: false, error: 'Lead delivery failed.' });
  }
}
