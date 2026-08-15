# Architecture — Borinken Landscaping

Built for `mode: 'demo'` (per intake). Per CLAUDE.md's demo defaults, the
page set is reduced and there is **no city × service matrix** — but
because real Google review data now exists (unlike a typical demo), a
`/reviews/` page is warranted and included. Booking/chat/forms stay
mocked per demo rules regardless of what's below.

## Page map

| Page | URL | Title tag | Meta description | H1 | Schema |
|---|---|---|---|---|---|
| Home | `/` | Borinken Landscaping \| Lawn Care & Landscaping, Brevard County FL | Owner-operated lawn care and landscaping in Brevard County, FL — mowing, weed eating, planting, and edging. 5.0★ on Google. Free estimates. | Let us be your blessing | `LocalBusiness` (subtype `Landscaper`... see note below), `BreadcrumbList` |
| Services index | `/services/` | Lawn Care & Landscaping Services \| Borinken Landscaping | Mowing, weed eating, planting, and edging — landscaping services from Borinken Landscaping, serving Brevard County, FL. | Services | `BreadcrumbList` |
| Service detail — Mowing | `/services/mowing/` | Lawn Mowing in Brevard County, FL \| Borinken Landscaping | Regular lawn mowing with tight edging, serving Brevard County, FL. Free estimates from a real local crew. | Lawn mowing | `Service`, `FAQPage` (if FAQ block present), `BreadcrumbList` |
| Service detail — Weed Eating | `/services/weed-eating/` | Weed Eating & Trimming in Brevard County, FL \| Borinken Landscaping | Fence lines, curbs, and tree rings trimmed clean on every visit. | Weed eating | same |
| Service detail — Planting | `/services/planting/` | Shrub & Tree Planting in Brevard County, FL \| Borinken Landscaping | Shrubs, trees, and mulch beds planted and set up for Florida's climate. | Planting | same |
| Service detail — Edging | `/services/edging/` | Lawn Edging in Brevard County, FL \| Borinken Landscaping | Clean edging along beds, walkways, and driveways. | Edging | same |
| About | `/about/` | About Borinken Landscaping | Owner-operated landscaping in Brevard County, FL — the story behind Borinken Landscaping. | About us | `BreadcrumbList` |
| Reviews | `/reviews/` | Reviews \| Borinken Landscaping | 5.0 stars on Google, 22 reviews. Read what Brevard County customers say about Borinken Landscaping. | What Brevard County says | `BreadcrumbList` (no `AggregateRating` on this page — see note) |
| Contact | `/contact/` | Contact Borinken Landscaping | Request a free estimate from Borinken Landscaping, serving Brevard County, FL. | Get a free estimate | `BreadcrumbList` |
| FAQ | `/faq/` | FAQ \| Borinken Landscaping | Answers to common questions about scheduling, service area, and estimates. | Frequently asked questions | `FAQPage`, `BreadcrumbList` |
| Privacy | `/privacy/` | Privacy Policy \| Borinken Landscaping | — | Privacy policy | — |
| Terms | `/terms/` | Terms of Service \| Borinken Landscaping | — | Terms of service | — |
| 404 | — | Page not found \| Borinken Landscaping | — | Page not found | — |

**Schema note:** `LocalBusiness` has no dedicated `Landscaper` subtype in
schema.org's vocabulary (Google's own category is "Landscaper" but that's
a GBP category, not a schema.org type). Use base `LocalBusiness` with
`"additionalType": "https://www.google.com/maps/..."` or simply
`LocalBusiness` plus `"knowsAbout"` listing the services — do not force
an inaccurate subtype like `HomeAndConstructionBusiness` just to have one;
confirm the exact schema choice at build time against current schema.org
guidance.

**AggregateRating note:** the 5.0★/22-review data is real and first-party
(pulled directly from the business's own Google Business Profile), which
is exactly what `AggregateRating` schema requires — but only 2 of the 22
review bodies were actually retrieved (see `assets/reviews/google-reviews.md`).
Displaying the aggregate rating as **visible text** ("5.0★ — 22 Google
reviews") is fine now. Adding the `AggregateRating` *schema markup* should
wait until either all 22 reviews are captured, or a live Google-reviews
embed is wired in — schema claiming 22 reviews backed by only 2 visible
ones is the kind of mismatch that gets flagged in Rich Results testing
and reads as inflated. Flagged for `/build-site` to decide, not decided
here.

## City × service matrix

**None planned for this build.** Two reasons:

1. `mode: 'demo'` explicitly excludes the matrix per CLAUDE.md.
2. There's no confirmed list of specific cities to build it from. Intake's
   `primary_city` is "Brevard County, FL" — a county, not a city — and the
   only single city with any factual backing is Palm Bay (from the
   business's Google-registered address, which stays private per the
   operator's choice). Brevard County contains Palm Bay, Melbourne,
   Titusville, Cocoa, Rockledge, Merritt Island, and more — inventing a
   ranked list of which of those Hiram actually serves and what's locally
   distinct about lawn care in each would be exactly the "spun text" this
   process forbids.

**For production**, this needs a real conversation with Hiram: which
specific cities/neighborhoods he actually services, and — critically —
something locally true to say about each (HOA density, lot size/mowing
difficulty, coastal salt exposure affecting plant choice, etc.), not just
the city name swapped into a template sentence.

## Content collections

```ts
// services
defineCollection({
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    serviceTier: z.enum(['primary', 'secondary', 'addon']),
    summary: z.string(),
    heroImage: z.string().optional(),
    priceFrom: z.number().optional(), // PENDING — no pricing in intake
    faqs: z.array(z.string()).optional(), // references into faqs collection
  }),
});
// all four services (mowing, weed-eating, planting, edging) ship as
// serviceTier: 'primary' — that's the entire real service list, no
// secondary/addon tier invented to fill space

// areas — schema defined per build-standards contract but collection
// ships EMPTY for this demo build; no confirmed city list (see above)
defineCollection({
  schema: z.object({
    city: z.string(),
    state: z.string(),
    slug: z.string(),
    county: z.string().optional(),
    blurb: z.string(),
  }),
});

// blog — schema defined, collection empty; no content planned this build
defineCollection({
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    publishDate: z.date(),
    excerpt: z.string(),
    body: z.string(),
  }),
});

// team — schema defined, collection empty; no team roster confirmed
// (only one crew member visible in photos, no name confirmed beyond
// "Hiram" himself — see 00-audit.md people inventory)
defineCollection({
  schema: z.object({
    name: z.string(),
    role: z.string(),
    photo: z.string(),
    bookingLink: z.string().optional(),
  }),
});

// testimonials — REAL data, 2 full reviews + the aggregate stat
defineCollection({
  schema: z.object({
    author: z.string(),
    rating: z.number().min(1).max(5),
    quote: z.string(),
    source: z.literal('google'),
    date: z.string(),
    ownerReply: z.string().optional(),
  }),
});

// faqs — schema defined; content limited to what's answerable from
// confirmed facts only (hours, service area, estimate process) — no
// invented pricing/warranty/licensing FAQ entries
defineCollection({
  schema: z.object({
    question: z.string(),
    answer: z.string(),
    servicePage: z.string().optional(), // links FAQ into a service page
  }),
});
```

## site.config.ts

```ts
export const site = {
  mode: 'demo',
  business: {
    legalName: "Borinken Landscaping LLC",       // confirmed — Google Business Profile
    displayName: "Borinken Landscaping",          // confirmed
    tagline: "Let us be your blessing",           // confirmed quote (bilingual — Spanish shown alongside, not replacing)
    founded: null,                                 // PENDING — not in intake, do not guess
    licenseNumber: null,                           // PENDING
    insuranceNote: null,                           // PENDING
    phone: "(321) 271-1134",                       // confirmed
    phoneE164: "+13212711134",                     // confirmed
    sms: true,
    email: null,                                   // PENDING — not in intake
    address: {
      street: "1329 Coral Reef Ave NW",            // confirmed, Google Business Profile
      city: "Palm Bay",
      state: "FL",
      zip: "32907",
      showPublicly: false,                          // operator confirmed — keep private
    },
    geo: { lat: 28.0330214, lng: -80.7113429 },     // confirmed, from Google Maps listing
    hours: [
      { day: "Monday", open: "07:00", close: "16:00" },
      { day: "Tuesday", open: "07:00", close: "16:00" },
      { day: "Wednesday", open: "07:00", close: "16:00" },
      { day: "Thursday", open: "07:00", close: "16:00" },
      { day: "Friday", open: "07:00", close: "16:00" },
      { day: "Saturday", open: null, close: null },  // confirmed closed
      { day: "Sunday", open: null, close: null },    // confirmed closed
    ],
    emergencyService: false,                        // no emergency/24-7 claim anywhere in intake
  },
  areas: [],                                        // empty — see city × service matrix note
  services: [
    { name: "Mowing", slug: "mowing", isPrimary: true, priceFrom: null },
    { name: "Weed Eating", slug: "weed-eating", isPrimary: true, priceFrom: null },
    { name: "Planting", slug: "planting", isPrimary: true, priceFrom: null },
    { name: "Edging", slug: "edging", isPrimary: true, priceFrom: null },
  ],
  social: {
    google: null,       // PENDING — GBP found via search, exact profile URL not captured; grab at build time
    facebook: null,      // PENDING — real page exists (source of tagline/services), URL not saved to intake, grab at build time
    instagram: null,
    tiktok: null,
    yelp: null,
  },
  booking: { provider: 'none', embedUrl: null, mode: 'form' },  // demo mode — form + phone fallback only
  forms: { endpoint: '/api/lead', smsConsentRequired: true },
  chat: { enabled: false, mode: 'off' },              // demo mode — chat stays off
  tracking: { ga4: null, gtm: null, callRailSwapTarget: null },  // PENDING
  seo: {
    defaultTitle: "Borinken Landscaping | Lawn Care & Landscaping, Brevard County FL",
    defaultDescription: "Owner-operated lawn care and landscaping in Brevard County, FL. Mowing, weed eating, planting, and edging. 5.0★ on Google.",
    ogImage: "/images/hero-wide-real-plus-extended-bg.jpg",
  },
} as const;
```

**Flagged gaps (all PENDING, all shipping blank/null, none guessed):**
founded year, license number, insurance note, email address, exact
social profile URLs (Google/Facebook pages exist and are the actual
source of several confirmed facts, but their URLs weren't saved during
research — five-minute fix at build time), GA4/GTM IDs.

## Internal linking

Small, flat graph — no area pages to route through in this build:

```
Home ──┬──> Services index ──┬──> /services/mowing/
       │                     ├──> /services/weed-eating/
       │                     ├──> /services/planting/
       │                     └──> /services/edging/
       │                            │  (each service page links back to
       │                            │   Services index + Contact + one
       │                            │   other service, "also need X?")
       ├──> Reviews ──> Contact
       ├──> About ──> Contact
       └──> Contact (form + phone/text fallback)

Footer (every page): Services index, Reviews, About, Contact, Privacy, Terms
```

Every service page ends in a CTA to `/contact/`. Reviews page CTA also
points to `/contact/`. When area pages are eventually built for
production, each will link to its 1–2 most relevant service pages and
vice versa — not built now.

## Component inventory

Beyond the standard template set, Direction D needs:

- **`BeforeAfterSlider`** (island — already in the standard set per
  build-standards, confirmed usable here) — powers the real hero. Needs
  the coquí-mark drag handle and edge watermark treatment from the
  approved mockup; that's new visual work on top of the existing
  component, not a new component.
- **`CoquiMark`** (new, static) — a wrapper around the traced
  `assets/logo/borinken-mark.svg`, `fill: currentColor`, used as: nav
  mark, slider handle icon, hero watermark, service-row divider bullet,
  footer mark. One component, five placements — keeps the SVG markup
  from being duplicated five times across templates.
- **`ReviewCard`** (existing standard component) — needs an optional
  "owner reply" slot added, since Hiram's real reply to Jennifer Wilkes
  is a genuine voice asset worth surfacing, not every review has one.
- **Bilingual text handling** — the tagline and any other bilingual
  lines are two real, distinct strings (English + Spanish), not a
  machine-translated toggle or a language switcher. Render both
  statically, styled per the mockup (English primary size, Spanish
  italic/secondary), no i18n routing needed for this build.

Nothing in Direction D requires new JS beyond the slider, which is
already an approved island in the standard set.
