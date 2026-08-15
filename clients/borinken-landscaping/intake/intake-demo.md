# Demo Intake — minimal

> Everything a demo needs, nothing more. Six inputs; every other field on the
> site uses a graceful default or stays empty. Fill the YAML block — Claude
> Code consumes it directly. `status` is one of `confirmed` (verified fact),
> `quote` (the operator's verbatim words), or `PENDING` (unknown — ships
> blank/flagged, never guessed).

```yaml
demo_intake:
  business_name:        { value: "Borinken Landscaping", status: confirmed, source: "Facebook page" }   # → business.displayName + business.legalName until corrected
  phone:                { value: "(321) 271-1134", status: confirmed }   # → business.phone / phoneE164
  primary_services:     { value: ["Mowing", "Weed eating", "Planting", "Edging"], status: quote, source: "Facebook page: LANDSCAPINGS NEEDS, MOWING, WEED EATING, PLANTING, EDGING, AND MORE" }   # → services collection, serviceTier: primary — no prices given, ships without pricing
  brand_color:          { value: "#53FF0B", status: confirmed, source: "operator confirmed — Hiram's established neon green, sampled from Logo.jpg; diverges from the muted trailer-wrap green noted in the asset audit, but this is the color he's actually used" }
  logo_file:            { value: "assets/logo/borinken-badge.png (full-color, transparent) + assets/logo/borinken-mark.svg (black line-art only, traced from Logo.jpg via potrace)", status: confirmed }
  photos:               { value: ["assets/photos/hero-wide-real-plus-extended-bg.jpg (final hero — real photo composited over an AI-widened background; center ~1152px is the pixel-real original photo (crew member, real jacket/logo, tree, flag, car) pasted back in after an earlier Gemini outpaint attempt garbled the logo text; only the far left/right edges are AI-generated matching street/palm/sky content, blended with a 50px feather; native 2752x1536, no crop needed at build time)", "assets/photos/hero-real-crew-trimming.jpg (fallback — same real photo, portrait-native, no AI extension, for object-fit:cover if the wide version is ever rejected)"], status: confirmed }   # remaining 29 real jobsite photos still sitting loose in assets/, not yet sorted into assets/photos/ with descriptive names
  primary_city:         { value: "Brevard County, FL", status: confirmed }   # county-wide service area, not a single city — seo.defaultTitle, hero copy
  vertical:             { value: "landscaping", status: confirmed }   # optional → design-playbook vibe library lookup
  tagline_quote:        { value: "Permítanos ser su bendición (Let us be your blessing)", status: quote, source: "Facebook page" }   # bilingual tagline — Hiram's own words, candidate for hero/about copy
  google_rating:        { value: "5.0 stars, 22 reviews", status: confirmed, source: "Google Business Profile, pulled 2026-08-14 — re-verify before launch, ratings drift" }
  address:              { value: "1329 Coral Reef Ave NW, Palm Bay, FL 32907", status: confirmed, source: "Google Business Profile" }   # showPublicly: false — operator confirmed keep private, site shows "Serving Brevard County, FL" only. Address still usable in LocalBusiness schema (non-visible) if geo/NAP consistency needs it later.
  hours:                { value: "Mon-Fri 7:00 AM-4:00 PM, closed Sat/Sun", status: confirmed, source: "Google Business Profile" }
  reviews_for_site:      { value: "assets/reviews/google-reviews.md — 2 full real reviews (Jennifer Wilkes, D K) + 3 Google-generated pull-quotes; 19 of 22 total reviews not retrieved, do not fabricate", status: confirmed }
```

## Demo defaults (what happens to everything else)

- `mode: 'demo'` — booking, chat, and form submission are all mocked; forms
  show the visible call/text fallback.
- Page set: home, services (+ add-on cards), about, contact. No city×service
  matrix, no reviews page unless real review data exists.
- Tokens: `scripts/derive-tokens.py --logo <logo> --scheme dark|light`
  (brand_color above overrides the sampled accent).
- **No fabricated facts, even in a demo.** No invented years-in-business, no
  fake reviews, no placeholder license numbers. A demo sells the design, not
  fictional credentials.

## Asset folder contract

```
clients/<slug>/assets/
  logo/           transparent PNG (required) + hand-built SVG if one exists
  photos/         descriptive kebab-case filenames (black-suv-exterior.jpg)
  reviews/        exported/screenshotted reviews, if any
  existing-site/  screenshots or files from their current site/flyers
```

**Reject auto-traced SVG exports at intake** (thousands of paths from a
raster trace — unusable bloat). A real vector has a two-to-three-digit path
count; ask for the source file or use the PNG.
