---
name: build-standards
description: Technical standards for client sites — Astro structure, site.config.ts shape, required page inventory, schema markup, SMS/TCPA compliance, booking integration, performance budgets, and launch checklist. Load when planning site architecture, building pages, wiring forms or booking, or running pre-launch QA.
---

# Build Standards

The non-negotiable half. Surface changes client to client; none of this does.

## Stack

- **Astro**, `output: 'static'` unless a feature genuinely requires SSR
- **Tailwind** with a per-client token layer in `tailwind.config.mjs` — no raw hex in components
- **Content collections** for services, areas, blog, team, testimonials, faqs
- `@astrojs/sitemap`, `astro:assets` for image optimization
- **Islands only for:** chat widget, mobile nav, lightbox, before/after slider, booking embed. Everything else ships zero JS.
- Deploy: Netlify or Cloudflare Pages. Forms post to a GHL webhook.

## site.config.ts

Every client-specific fact lives here. A developer should change the phone number, hours, licence, or service-area list by editing this file alone.

```ts
export const site = {
  business: {
    legalName, displayName, tagline,
    founded, licenseNumber, insuranceNote,
    phone, phoneE164, sms, email,
    address: { street, city, state, zip, showPublicly },
    geo: { lat, lng },
    hours: [ { day, open, close } ],
    emergencyService: boolean,
  },
  areas: [ { city, state, slug, county, blurb } ],
  services: [ { name, slug, isPrimary, priceFrom } ],
  social: { google, facebook, instagram, tiktok, yelp },
  booking: { provider, embedUrl, mode },  // 'calendly'|'ghl'|'google'|'none'
  forms: { webhookUrl, smsConsentRequired: true },
  chat: { enabled, mode },                // 'faq'|'faq-booking'|'off'
  tracking: { ga4, gtm, callRailSwapTarget },
  seo: { defaultTitle, defaultDescription, ogImage },
} as const;
```

## Required pages

| Page | URL | Notes |
|---|---|---|
| Home | `/` | |
| Services index | `/services/` | |
| Service detail | `/services/[slug]/` | Primary/secondary tiers only — own FAQ, own CTA, depth per the content-depth guidance below. Add-ons render as cards on the services index, not standalone pages |
| Areas index | `/service-areas/` | |
| Area | `/service-areas/[city]/` | |
| City × service | `/services/[service]-[city]/` | The revenue pages |
| About | `/about/` | Faces, story, why-us |
| Reviews | `/reviews/` | |
| Contact | `/contact/` | Form, map, hours, all contact methods |
| FAQ | `/faq/` | FAQPage schema |
| Privacy | `/privacy/` | **Required for A2P 10DLC** |
| Terms | `/terms/` | |
| 404 | | Route somewhere useful |

Optional by vertical: `/blog/`, `/team/[name]/`, `/gallery/`, `/financing/`, `/careers/`, `/es/`

### Content depth — guidance, never a gate

Governing rule: **complete coverage using verified information.** Never pad and
never fabricate to hit a count — a shorter honest page beats a padded one, and
no QA check anywhere enforces a word count.

- Primary revenue services: ~600–1000 words *when verified material supports it*
- Secondary services: ~350–700 words
- Add-on services: ~150–350 words, rendered as a card/module on the services
  index (plus an optional FAQ entry) rather than a standalone page

## Conversion architecture

**Header** — sticky. Logo, nav, phone as `tel:` link visible on desktop, one primary CTA button.

**Mobile sticky bottom bar** — non-negotiable. Call · Book/Estimate · optionally Text. Thumb-height, always visible. This carries most mobile conversions on home-services sites.

**CTA cadence** — primary above the fold, then a block at least every two sections. Vary the ask; the same ask ten times reads as pressure.

**CTA language by vertical**
- Emergency trades → *Call Now · 24/7*
- Scheduled trades / GC → *Get a Free Estimate*
- In-home sales → *Book Your Free In-Home Consultation*
- Detailing → *Book Your Detail*
- Barber / salon / groomer → *Book Now* · *Book with [stylist]*

**Forms** — name, phone, email, service, ZIP, message. Every extra field costs conversions.

**Trust surface** — reviews with real names, star rating with count, licence number, insurance, warranty terms, years in business, certifications. Only what the intake verified.

## Compliance — read before shipping

The client runs SMS campaigns through GHL. A2P 10DLC registration is rejected if the website doesn't support it. This is the thing agencies get wrong, and it stalls campaigns for weeks after launch.

**Every form collecting a phone number needs:**
- An **unchecked** consent checkbox. Never pre-checked
- Consent language naming the business, message type, frequency, that rates may apply, and how to opt out
- Links to a live Privacy Policy and Terms

> By checking this box you agree to receive text messages from [Business] at the number provided, including appointment reminders and service updates. Consent is not a condition of purchase. Message and data rates may apply. Message frequency varies. Reply STOP to opt out or HELP for help. See our [Privacy Policy] and [Terms].

**The Privacy Policy must state** that mobile numbers collected for SMS are not sold or shared with third parties for marketing, and opt-in data is not shared with affiliates. Carriers check for this specific clause. Both pages must be reachable without a login.

If the client makes health, energy-savings, or performance claims (water treatment, windows, insulation), keep them factual and attributable. No implied medical claims.

## SEO

**Schema (JSON-LD)** — validate every type before launch.

- `LocalBusiness` on home, most specific subtype available: `Plumber`, `RoofingContractor`, `HVACBusiness`, `HairSalon`, `BarberShop`, `AutoWash`, `GeneralContractor`, `HomeAndConstructionBusiness`. Include `areaServed`, `openingHoursSpecification`, `geo`, `priceRange`, `sameAs`
- `Service` on every service page
- `FAQPage` on the FAQ page and any page with an FAQ block
- `BreadcrumbList` sitewide
- `AggregateRating` **only** if reviews are genuinely first-party and on-site
- `Person` on team pages

**NAP** must match the Google Business Profile character for character. "Ste 200" vs "Suite 200" matters.

**On-page:** one H1 per page · unique title (≤60) and meta (≤155) · descriptive alt text · internal links between service and area pages · canonicals · sitemap.xml · robots.txt

Titles: `[Service] in [City], [ST] | [Business]`

**Images:** WebP/AVIF via `astro:assets`, width and height set to prevent CLS, lazy below the fold, descriptive filenames.

## Booking

Abstract it. `<BookingEmbed />` reads `site.booking.provider` so switching Calendly → GHL is a one-line change.

Calendly (inline or popup) · GHL (calendar iframe, client's own calendar ID) · Google appointment schedule · Housecall Pro / ServiceTitan widget · none (form + phone, no empty embed)

For multi-provider businesses, each team member gets their own booking link on their profile and a "Book with [name]" button on the team grid.

## AI chat widget

Modes from `site.chat.mode`: `off` · `faq` · `faq-booking`

Astro island, loaded on idle so it never touches LCP. It must **never** invent prices, availability, warranty terms, or licence claims — scope it hard to the FAQ collection and services list, with an explicit "I don't know, here's how to reach a human" fallback. Every conversation escalates to call, text, or form in one tap.

## Budgets

- Lighthouse mobile: Performance ≥ 95, Accessibility 100, Best Practices ≥ 95, SEO 100
- LCP < 2.0s · CLS < 0.05 · INP < 200ms
- Homepage JS < 100KB
- Self-hosted fonts, display face preloaded, `font-display: swap`

## Accessibility

WCAG 2.1 AA contrast — check the palette at Stage 2, not at QA. Many trade brand colors fail, and you want to know before you've built on them.

Visible keyboard focus (real states, not the default ring removed) · semantic landmarks · skip-to-content · every input labeled · errors described in text, not color alone · `prefers-reduced-motion` honored · 320px minimum · 44px tap targets

## Launch checklist

**Pre-launch**
- [ ] All facts in `site.config.ts` match intake exactly
- [ ] NAP matches Google Business Profile character for character
- [ ] `tel:` links dial correctly on a real phone
- [ ] Form submits to GHL webhook; test lead received
- [ ] SMS consent checkbox present, unchecked, full language
- [ ] Privacy and Terms live, linked from footer and forms
- [ ] Booking embed completes a real booking
- [ ] Chat widget scoped; escalation path works
- [ ] All schema validates in Rich Results Test
- [ ] Unique title and meta on every page
- [ ] No lorem ipsum, no placeholder images, no stock strangers
- [ ] No invented claims — every certification, year, award traced to intake
- [ ] Lighthouse budgets met on mobile
- [ ] Tested on a real iPhone and a real Android, not just devtools
- [ ] 404 routes somewhere useful; favicon and OG image set

**Launch**
- [ ] DNS cut over, SSL active, www ↔ apex redirect
- [ ] Old URLs 301'd if replacing a site
- [ ] Search Console verified, sitemap submitted
- [ ] GA4/GTM firing; call and form conversions configured
- [ ] Google Business Profile website URL updated
- [ ] Client walkthrough recorded

**Day 7**
- [ ] Search Console coverage errors reviewed
- [ ] Core Web Vitals field data checked
- [ ] Leads landing in GHL and being worked
- [ ] `_system/RECIPE-LOG.md` updated
