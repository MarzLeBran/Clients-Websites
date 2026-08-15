# Asset Audit — Borinken Landscaping

## Photo grade: C

29 real jobsite photos, phone-shot, Facebook-exported (compressed, generic
`_n.jpg` filenames). No professional photography. Breakdown:

- ~12 are plant/landscape-only shots with no truck, crew, or brand visible —
  indistinguishable from a homeowner's own phone roll.
- ~7 are vehicle/trailer/wrap shots — the strongest, most consistent subset.
- ~6 show a single crew member on a ladder hedge-trimming, shot from
  below/behind — repetitive, several near-duplicates of the same job.
- 1 confirmed before/after pair (topiary tree, unshaped → clean ball) —
  genuinely useful, but two separate stills, not a stitched asset.
- 1 far, small-in-frame second crew member — too distant/blurred to use.

Lighting is inconsistent (overcast, harsh midday, backlit) with no shared
color grade or shot discipline. Real value exists (see below) but this
library can't carry a photo-forward design on its own.

## Design implication

Type-driven design, with the vehicle-wrap and crew-shirt photos used as
small supporting/trust elements (about section, footer strip, a "real crew,
real trucks" module) — not as the hero or a photo-heavy grid. Lean on the
logo mark (coquí/Taíno frog symbol), a strong color system, and the
bilingual copy voice as the primary brand carriers.

## Real-world brand evidence

The truck/trailer wrap is the strongest, most consistent brand asset in the
set, and it **diverges from the submitted logo file**:

- `Logo.jpg` (submitted asset): neon/lime green (~#66FF33-ish) circular
  badge, black line-art coquí figure and lettering.
- Actual trailer wrap (`485360998`, `485391186`, `486092446`, `486324097`):
  the coquí mark and "BORINKEN" wordmark print in a muted, mid-tone
  teal-green (closer to #4A9B6E), not neon. "LANDSCAPING" in solid black,
  tagline "For all your landscaping needs" in black script, phone/Facebook
  handle in black. Trailer body is white/aluminum.
- Crew shirt (`486600467`, `486852216`): pale yellow-green/chartreuse
  long-sleeve, coquí logo + "LANDSCAPING LLC" + phone printed on the back
  in dark green/black.
- Truck: white/silver pickup (Ford, "FX4"), unwrapped — only the trailer
  carries branding.

**Flag:** the neon-green logo file reads like a digital/vector export
choice; the material world (trailer decal, shirt) consistently uses a
calmer mid-green. The trailer is what Brevard County customers actually
see on the street — recommend it outrank the raw logo file as the color
source of truth, or confirm with the client which is "real" before running
`derive-tokens.py`.

**`hero.jpg` is not a real photo** — it's a logo-on-stock-grass composite
(the logo overlaid on generic stock dewy grass). Not usable as a
production hero; treat as a placeholder mockup only.

## People inventory

Exactly one crew member appears with any consistency: always mid-task
(hedge trimmer/pole saw overhead, on a ladder), back or side to camera,
bucket hat and sunglasses — never face-forward. A second, more distant
figure appears once (`488708537`), too small/blurred to use. **No owner
headshot, no team photo, no face-forward shot exists anywhere in this
set.** Real gap: a trust-building face is normally the highest-converting
single asset on a home-services site.

## Usable / unusable

**Usable (brand/trust supporting, not hero-grade):**
- `485360998`, `485391186`, `486092446`, `486324097` — trailer wrap, clean
  and legible; `486324097` best composed (full rig, palm tree, blue sky).
- `486600467`, `486852216` — crew shirt with logo/phone visible.
- `486326770` / `486454008` — topiary before/after pair.

**Unusable / weak:**
- `487451854`, `487734145` — flat hedge-wall shots, overcast, no brand/people.
- `488193773`, `488041144`, `489066570`, `488224469`, `488237723`,
  `488256388`, `488370563`, `488600122`, `488683315`, `489024607`,
  `489239823`, `490128986` — competent but generic finished-yard shots, no
  brand mark; low-priority portfolio filler only.
- `487212376` — near-duplicate of the same ladder/hedge pose.
- `488708537` — second crew member, too small/blurred.
- `hero.jpg` — logo-on-stock-grass composite; not a real photo.

## Environment read

Equipment and vehicle presentation is tidy and taken seriously: a proper
vinyl-lettered trailer wrap (not hand-painted or magnet sign), matching
branded crew shirt, a newer pickup — reads as a legitimate, professionally
presenting small operation. Jobsites are upscale suburban Florida homes
(tile roofs, paver driveways, lakefront lots, HOA-style landscaping) —
supports a clean, credible, non-discount brand tone. The gap is entirely on
the human/photography side: the operation looks more capable than its
photo library currently proves.

## Missing info — blocking

- **No confirmed brand color.** `brand_color` in intake is `PENDING`. The
  trailer-wrap teal-green and the neon `Logo.jpg` disagree — need client
  confirmation on which is correct before theming, or explicitly decide to
  sample from the trailer as ground truth.
- **No usable logo file.** Only a raster `Logo.jpg` sits loose in `assets/`
  root instead of `assets/logo/`; not confirmed transparent. Needs a
  transparent PNG (or real vector) before build.
- **No owner/crew name confirmed in intake** beyond the tagline
  attribution — blocks writing an honest about/story section.
- **No years-in-business, licensing, or insurance info** — blocks any
  trust-badge or "since [year]" claim.
- **No photo consent confirmed** — before publishing the crew-shirt or
  before/after photos, confirm the client is fine with these specific
  images (standard caveat for scraped Facebook exports).

## Missing info — nice to have

- A face-forward photo of the owner/crew (even a quick phone selfie) —
  single highest-value gap.
- 2–3 clean wide hero-candidate shots of the truck+trailer rig on a nice
  property, good light, uncluttered by parked cars/street clutter.
- Trailer vinyl vendor's spec sheet for the exact green hex/Pantone, to
  remove color-sampling guesswork.
- Real customer reviews (folder exists but is empty) — would enable a
  reviews page/testimonials module.
