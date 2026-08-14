# Production Intake — structured

> The full onboarding form + call, captured in one machine-consumable
> document. Ask the questions conversationally (send the form, then fill the
> gaps on the onboarding call — voice memos welcome), but record every answer
> in the YAML blocks below. Claude Code consumes this file field-by-field:
> **every key maps to a `site.config.ts` field or a content-collection
> entry**, noted in the trailing comment.
>
> `status` is one of:
> - `confirmed` — a verified fact, safe to publish
> - `quote` — the operator's verbatim words (voice material; quote, don't clean up)
> - `PENDING` — unanswered. **Ships blank/flagged automatically. Never guessed.**
>
> Sections 1–4 (Business, Brand, Assets, Services) are required before a
> production build starts. Section 7-equivalents live under Brand.voice — the
> part clients rush; slow them down, it's where the personality comes from.
> Realistic completion time: 20–30 minutes; say so up front.

## 1 — Business

```yaml
business:
  legal_name:           { value: "", status: PENDING }   # → business.legalName
  display_name:         { value: "", status: PENDING }   # → business.displayName (how customers say it)
  domain:               { value: "", status: PENDING }   # → astro.config site; note registrar + who owns it
  phone:                { value: "", status: PENDING }   # → business.phone / phoneE164 (the one that should ring)
  phone_can_text:       { value: null, status: PENDING } # → business.sms (bool)
  email:                { value: "", status: PENDING }   # → business.email (form notifications)
  street_address:       { value: "", status: PENDING }   # → business.address; "" + mobile = service-area business
  address_public:       { value: null, status: PENDING } # → business.address.showPublicly (bool)
  hours:                { value: [], status: PENDING }   # → business.hours ([{day, open, close}])
  emergency_service:    { value: null, status: PENDING } # → business.emergencyService (bool)
  year_founded:         { value: "", status: PENDING }   # → business.founded
  primary_city:         { value: "", status: PENDING }   # → areas[0], seo.defaultTitle
  cities_served:        { value: [], status: PENDING }   # → areas[] — every one becomes a page
  cities_excluded:      { value: [], status: PENDING }   # planning note — never build these
  growth_city:          { value: "", status: PENDING }   # which city they want more work from → city-page priority
  spanish_customers:    { value: null, status: PENDING } # → /es/ decision (bool + notes)
```

## 2 — Brand

```yaml
brand:
  brand_colors:         { value: [], status: PENDING }   # → tokens seed (hex list) — real-world evidence (wrap/uniform/sign) beats these
  style_guide:          { value: "", status: PENDING }   # → assets/ path if uploaded
  vibe:                 { value: "", status: PENDING }   # → design direction (rugged/premium/warm/urgent/technical/playful/classic/bold — or their own words)
  five_words_wanted:    { value: [], status: PENDING }   # → brand read
  five_words_never:     { value: [], status: PENDING }   # → brand read (the sharper instrument)
  websites_liked:       { value: [], status: PENDING }   # → direction references (any industry, and why)
  websites_hated:       { value: [], status: PENDING }   # → anti-references (esp. competitors)
  voice:
    why_started:        { value: "", status: PENDING }   # quote — the real reason
    differentiator:     { value: "", status: PENDING }   # quote — "quality work" tells us nothing, push for specifics
    ideal_customer:     { value: "", status: PENDING }   # quote — age/income/housing/what they care about
    moment_of_need:     { value: "", status: PENDING }   # quote — what just happened when they decide to call
    surprising_praise:  { value: "", status: PENDING }   # quote — what customers say that surprises them
    biggest_objection:  { value: "", status: PENDING }   # quote — what must be overcome to close
    running_phrase:     { value: "", status: PENDING }   # quote — a saying/story that's part of the business
    on_camera_ok:       { value: null, status: PENDING } # bool — face-of-brand vs not changes the design
  one_visitor_action:   { value: "", status: PENDING }   # → homepage CTA architecture
```

## 3 — Assets

> Folder contract — everything lands here, with these exact names:
>
> ```
> clients/<slug>/assets/
>   logo/           transparent PNG (required) + hand-built SVG if one exists
>   photos/         descriptive kebab-case filenames
>   reviews/        exported/screenshotted reviews
>   existing-site/  screenshots or files from the current site/flyers
> ```
>
> **Reject auto-traced SVG exports at intake** — thousands of paths from a
> raster trace are unusable bloat; a real vector has a two-to-three-digit
> path count. Ask for the source file or use the PNG.

```yaml
assets:
  logo_format:          { value: "", status: PENDING }   # png-transparent | svg-hand-built | raster-only — reject auto-traced svg
  photo_count:          { value: 0, status: PENDING }    # 50+ is the ask; graded A/B/C at Stage 0
  photo_subjects:       { value: [], status: PENDING }   # completed work / in-progress / faces / owner / vehicles / shop / before-after pairs
  real_world_brand:     { value: [], status: PENDING }   # wraps, uniforms, signage, cards — beats hex codes
  video:                { value: "", status: PENDING }   # even phone footage
  do_not_use:           { value: [], status: PENDING }   # old logo, former employees, jobs not to showcase
```

## 4 — Services

```yaml
services:
  all_services:         { value: [], status: PENDING }   # → services collection; each: {name, tier: primary|secondary|addon, price_from, price_by_vehicle?}
  top_moneymakers:      { value: [], status: PENDING }   # → serviceTier: primary (star the top three)
  want_more_of:         { value: [], status: PENDING }   # → homepage + city-page emphasis
  want_less_of:         { value: [], status: PENDING }
  known_for:            { value: "", status: PENDING }   # what competitors don't do
  pricing_posture:      { value: "", status: PENDING }   # real-prices | ranges | estimate-only → how cards render
  free_estimates:       { value: null, status: PENDING } # bool + conditions
  financing:            { value: "", status: PENDING }   # provider, or ""
  warranties:           { value: "", status: PENDING }   # the exact wording they'll stand behind
  brands_certs:         { value: [], status: PENDING }   # brands, products, certifications carried
```

## 5 — SEO

```yaml
seo:
  gbp_url:              { value: "", status: PENDING }   # → social.google; NAP must match it character-for-character
  existing_domain_urls: { value: [], status: PENDING }   # → 301 map if replacing a site
  search_console:       { value: null, status: PENDING } # access grantable? (bool)
  analytics:            { value: "", status: PENDING }   # → tracking.ga4 / gtm if existing
  social_profiles:      { value: {}, status: PENDING }   # → social.{facebook,instagram,tiktok,yelp}
  competitors:          { value: [], status: PENDING }   # who they lose jobs to — informs positioning, never copied
```

## 6 — Automation

```yaml
automation:
  booking_today:        { value: "", status: PENDING }   # phone / text / form / scheduler / walk-in
  scheduler:            { value: "", status: PENDING }   # → booking.provider (calendly|ghl|google|other|none)
  booking_embed_url:    { value: "", status: PENDING }   # → booking.embedUrl — LAUNCH BLOCKER if provider set
  ghl_webhook_url:      { value: "", status: PENDING }   # → host env secret GHL_WEBHOOK_URL only — NEVER into site.config or the repo
  phone_answerer:       { value: "", status: PENDING }   # who answers during/after hours
  lead_response_time:   { value: "", status: PENDING }   # honest average
  chat_assistant:       { value: null, status: PENDING } # → chat.enabled/mode (bool + faq|faq-booking)
  email_capture:        { value: null, status: PENDING } # newsletter/promotions (bool)
```

## 7 — Legal

```yaml
legal:
  license_numbers:      { value: [], status: PENDING }   # → business.licenseNumber + issuing state; may be N/A for the trade — confirm, don't assume
  insurance:            { value: "", status: PENDING }   # → business.insuranceNote
  claims_review:        { value: "", status: PENDING }   # health/energy/performance claims to keep factual + attributable
  access_grants:        { value: [], status: PENDING }   # registrar / GBP / GA / host / social
```

## 8 — Reviews

```yaml
reviews:
  best_reviews:         { value: [], status: PENDING }   # → testimonials collection; verbatim text + author + source + date
  google_pull_ok:       { value: null, status: PENDING } # consent to pull from Google (bool)
  aggregate:            { value: "", status: PENDING }   # e.g. "5.0 / 25 Google reviews" — displayable once confirmed
  awards_press:         { value: [], status: PENDING }   # awards, certifications, associations, press
  named_jobs:           { value: [], status: PENDING }   # jobs/clients nameable publicly
  named_customers:      { value: [], status: PENDING }   # customers willing to be photographed/quoted
```

## 9 — Photography

```yaml
photography:
  shoot_willing:        { value: null, status: PENDING } # one phone-shoot day is the highest-ROI ask for a C-grade library
  shoot_targets:        { value: [], status: PENDING }   # from the Stage 0 audit: faces, before/after pairs, wide horizontal hero
  before_after_pairs:   { value: null, status: PENDING } # exist? (bool) — unlocks the slider as a signature element
  team_pages:           { value: null, status: PENDING } # individual profiles w/ own booking links (bool)
  blog:                 { value: null, status: PENDING } # bool + who writes it
  point_of_contact:     { value: "", status: PENDING }   # main contact + fastest channel
  deadline:             { value: "", status: PENDING }   # grand opening / season / campaign
```

---

## Internal notes — not sent to the client

Fill in after the sales call. Usually worth more than the form.

- How does the owner actually talk? Fast, slow, formal, profane, funny?
- What did they get animated about? What did they complain about?
- Do they have taste, or will they ask for a rainbow gradient?
- Who really decides — owner, spouse, office manager?
- Expected photo grade: A / B / C
- Red flags?
