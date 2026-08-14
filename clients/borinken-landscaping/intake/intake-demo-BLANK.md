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
  brand_color:          { value: "", status: PENDING }   # → seed for scripts/derive-tokens.py; leave "" to sample the logo
  logo_file:            { value: "", status: PENDING }   # → assets/logo/ — transparent PNG required (see contract below)
  photos:               { value: [], status: PENDING }   # optional → assets/photos/ — any count; demo works with zero
  primary_city:         { value: "Brevard County, FL", status: confirmed }   # county-wide service area, not a single city — seo.defaultTitle, hero copy
  vertical:             { value: "landscaping", status: confirmed }   # optional → design-playbook vibe library lookup
  tagline_quote:        { value: "Permítanos ser su bendición (Let us be your blessing)", status: quote, source: "Facebook page" }   # bilingual tagline — Hiram's own words, candidate for hero/about copy
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
