# Architecture — Clean Lab by EZ

Direction: **A — Precision Lab** (approved). Reads `brief/02-design-directions.md` and the
intake. `build-standards` loaded for the required-page floor and schema rules.

## Modeling decision, flagged up front

The intake describes two real sold packages (Lab Refresh, Lab Reset) plus two priced add-on
services (Pet Hair Removal, Engine Bay Cleaning) — not six independent detailing services. Built
the `services` collection to match what's actually sold, rather than inventing generic
categories ("Interior Detailing," "Exterior Detailing") that don't correspond to how this
business prices or sells. **Real content risk:** Pet Hair Removal and Engine Bay Cleaning each
have one line of flyer description and zero supporting photos — hitting the required 600+ words
of honest, non-padded copy on those two pages specifically is a real Stage 5 challenge, not a
guarantee. Flagging now rather than discovering it at Stage 6.

## Page map

| URL | Title tag | H1 | Schema | Notes |
|---|---|---|---|---|
| `/` | Clean Lab by EZ \| Mobile Auto Detailing in Davenport, FL | Lab grade clean for your car. | LocalBusiness | |
| `/services/` | Services \| Clean Lab by EZ | Services | BreadcrumbList | |
| `/services/lab-refresh/` | Lab Refresh — Maintenance Detail \| Clean Lab by EZ | Lab Refresh | Service, FAQPage | 600+ words real risk: low (most flyer detail of the four) |
| `/services/lab-reset/` | Lab Reset — Deep Interior + Exterior \| Clean Lab by EZ | Lab Reset | Service, FAQPage | "Most Popular" per client's own flyer |
| `/services/pet-hair-removal/` | Pet Hair Removal \| Clean Lab by EZ | Pet Hair Removal | Service | 600+ words real risk: **high** — one flyer line, no photos |
| `/services/engine-bay-cleaning/` | Engine Bay Cleaning \| Clean Lab by EZ | Engine Bay Cleaning | Service | 600+ words real risk: **high** — one flyer line, no photos, no confirmed price |
| `/service-areas/` | Service Areas \| Clean Lab by EZ | Where We Serve | BreadcrumbList | |
| `/service-areas/davenport/` | Mobile Detailing in Davenport, FL \| Clean Lab by EZ | Davenport, FL | BreadcrumbList | primary base |
| `/service-areas/kissimmee/` | Mobile Detailing in Kissimmee, FL \| Clean Lab by EZ | Kissimmee, FL | BreadcrumbList | |
| `/service-areas/st-cloud/` | Mobile Detailing in St. Cloud, FL \| Clean Lab by EZ | St. Cloud, FL | BreadcrumbList | |
| `/service-areas/orlando/` | Mobile Detailing in Orlando, FL \| Clean Lab by EZ | Orlando, FL | BreadcrumbList | |
| `/service-areas/poinciana/` | Mobile Detailing in Poinciana, FL \| Clean Lab by EZ | Poinciana, FL | BreadcrumbList | |
| `/service-areas/haines-city/` | Mobile Detailing in Haines City, FL \| Clean Lab by EZ | Haines City, FL | BreadcrumbList | |
| `/about/` | About \| Clean Lab by EZ | About | BreadcrumbList | faces gap — see Stage 0 audit, recommend the shoot before this page is strong |
| `/reviews/` | Reviews \| Clean Lab by EZ | Reviews | BreadcrumbList (+ AggregateRating only once real first-party quotes exist) | |
| `/contact/` | Contact \| Clean Lab by EZ | Contact | BreadcrumbList | form + booking (provider: none until GHL URL exists) |
| `/faq/` | FAQ \| Clean Lab by EZ | Frequently Asked Questions | FAQPage | |
| `/privacy/` | Privacy Policy \| Clean Lab by EZ | Privacy Policy | — | required for A2P 10DLC |
| `/terms/` | Terms of Service \| Clean Lab by EZ | Terms of Service | — | |
| `404` | Page not found | Page not found | — | routes home |

`/es/` intentionally **not** built yet — `flyer-1.PNG` is fully Spanish, real signal of
Spanish-speaking customer reach, but intake Q14 (need a full Spanish site?) is still
unanswered. Flagging as a real opportunity, not assuming the answer.

## City × service matrix

Capped at **12** (2 primary services × 6 cities) — well under the 15–20 ceiling, and honest:
building pet-hair/engine-bay city pages now would mean writing "genuinely local" copy for
services that don't yet have enough source material to clear the swap test even at the
city-agnostic level. Each local angle below is a **real Central Florida regional fact** (public
geography/climate/seasonal knowledge, not a claim about this specific business) for the
copywriter to develop at Stage 5 — not finished copy:

| City | County | Lab Refresh angle | Lab Reset angle |
|---|---|---|---|
| Davenport | Polk | Base market — gated/HOA communities near the Posner Park/Championsgate corridor, frequent driveway access | New-construction dust from ongoing development in the area |
| Kissimmee | Osceola | Rental and tourist-corridor vehicle turnover near the theme-park corridor | Lake Tohopekaliga-area humidity affecting interior odor/mildew |
| St. Cloud | Osceola | Newer residential growth east of Kissimmee, lake-adjacent | Sandy soil tracked into carpets/mats |
| Orlando | Orange | Dense condo/high-rise parking — mobile service solves a real access problem | Daily commuter grime from more paved/urban driving |
| Poinciana | Polk/Osceola | HOA-restricted street parking makes driveway mobile service genuinely convenient | Newer-development construction dust |
| Haines City | Polk | Citrus-grove-adjacent, more rural approach roads | Agricultural dust as a distinct exterior grime type from the urban cities |

**Real, well-known Central Florida detailing angle not yet used anywhere:** love bugs
(seasonal insect swarms, a genuine and widely-recognized Florida paint/grille problem, worst
late spring and early fall) — a legitimate, non-invented regional detail worth the copywriter's
attention for exterior-service pages sitewide, not city-specific.

## Content collections

Already implemented in `_template/src/content.config.ts` (7 collections: `services`, `areas`,
`blog`, `team`, `testimonials`, `faqs`, `cityServicePages` — the 7th holds the real local-angle
prose for the city×service pages above; a plain data array can't hold authored text). Entries to
author at Stage 5:
- `services/`: 4 entries (lab-refresh, lab-reset, pet-hair-removal, engine-bay-cleaning)
- `areas/`: 6 entries (the cities above)
- `city-service-pages/`: 12 entries (the matrix above)
- `testimonials/`: 0 real entries exist yet — aggregate 5.0★/25 is confirmed displayable, but
  individual review text still needs pulling from Google or pasting by the operator (per updated
  intake) — **do not fabricate quotes to fill this collection**
- `faqs/`: none authored yet — real candidates: mobile-service logistics (water/power supply,
  driveway access, weather policy), pricing tiers, service-area boundary, booking method
- `blog/`, `team/`: not building for this build — solo/small-crew operation, no blog interest
  confirmed (intake Q57 unanswered)

## `site.config.ts` fill plan

Confirmed from intake (cited), everything else explicitly flagged — no guesses:

```
business.legalName        = "Clean Lab by EZ"  (operator: same as brand name; no separate
                             registered LLC name given — FLAG if one exists)
business.displayName      = "Clean Lab by EZ"
business.tagline          = "Lab grade clean for your car."      (flyer-2.jpg)
business.founded          = FLAG — unanswered
business.licenseNumber    = FLAG — unanswered, may be N/A for FL mobile detailing
business.insuranceNote    = FLAG — unanswered
business.phone            = "(689) 200-6472"
business.phoneE164        = "+16892006472"
business.sms              = true              (operator confirmed standard SMS)
business.email            = "cleanlabbyez@gmail.com"
business.address          = FLAG — none disclosed; fully mobile per operator, showPublicly: false
business.geo              = 28.1611, -81.6017  (public Davenport, FL town centroid — an
                             approximate public anchor point, NOT the operator's real location,
                             since none was disclosed)
business.hours            = Mon–Sat 08:00–17:00, closed Sunday   (operator, 2026-07-23)
business.emergencyService = false              (no evidence offered; not assumed true)
areas                     = 6 entries: Davenport/Kissimmee/St. Cloud/Orlando/Poinciana/
                             Haines City, all FL. Counties are public record (Polk/Osceola/
                             Orange), not intake-confirmed — flagged as such, not presented as
                             operator-verified.
services                  = Lab Refresh (isPrimary, from $79), Lab Reset (isPrimary, from $125,
                             "Most Popular"), Pet Hair Removal (from $25), Engine Bay Cleaning
                             (priceFrom FLAG — not priced on either flyer)
social.instagram          = "https://instagram.com/cleanlabbyez"
social.facebook           = FLAG — icon present on flyer-1.PNG, no handle/URL captured
social.google             = FLAG — GBP screenshot exists, no URL/place ID captured
social.tiktok / .yelp     = FLAG — unanswered
booking.provider          = "none"             (GHL confirmed as intended provider, but no
                             real embed URL exists yet — shipping 'none' with the safe form+phone
                             fallback rather than a broken iframe; **blocking item**, see below)
booking.embedUrl          = FLAG — blocking on real GHL calendar URL
forms.webhookUrl          = FLAG — blocking, no GHL webhook URL provided
forms.smsConsentRequired  = true
chat.enabled / .mode      = false / "off"      (intake Q31 unanswered — default off, not assumed)
tracking.*                = FLAG — unanswered (ga4, gtm, callRailSwapTarget)
seo.defaultTitle          = "Mobile Auto Detailing in Davenport, FL | Clean Lab by EZ"
seo.defaultDescription    = drafted from the real GBP description at Stage 5, not invented
seo.ogImage                = FLAG — pick from the 7 strong photos at Stage 5
```

**Two blocking items for a real launch** (both already flagged in the intake/audit, repeated
here because they land directly in this file): the GHL booking embed URL, and the GHL forms
webhook URL. Both ship as safe fallbacks (`booking.provider: 'none'`, form degrades to a visible
call/text notice) rather than broken embeds — but neither is launch-ready until real URLs exist.

## Internal linking

```
/  ──┬── /services/ ──┬── /services/lab-refresh/ ──┬── (links to 6 city×service pages)
     │                ├── /services/lab-reset/     ──┤
     │                ├── /services/pet-hair-removal/
     │                └── /services/engine-bay-cleaning/
     │
     └── /service-areas/ ──┬── /service-areas/davenport/    ──┬── (links to that city's
                            ├── /service-areas/kissimmee/     │   2 city×service pages)
                            ├── /service-areas/st-cloud/      │
                            ├── /service-areas/orlando/       │
                            ├── /service-areas/poinciana/     │
                            └── /service-areas/haines-city/  ─┘

Every city×service page links back to its service page AND its area page (the graph's actual
edges — not a flat sitemap dump).
```

## Component inventory

Everything from the standard `_template/` set applies. Direction A adds one genuinely new piece
beyond the template:

- **Vehicle-size price selector** (the signature element) — Sedan/SUV/Truck toggle that updates
  the displayed Lab Refresh/Lab Reset price live. New component, not yet built — **island**
  (client-side interactive state). Everything else in Direction A (color-block hero, hexagon
  texture, tier cards) is static, zero JS.
- Hexagon texture background asset — needs extracting/redrawing from the flyer artwork at
  Stage 4, not yet an asset.
