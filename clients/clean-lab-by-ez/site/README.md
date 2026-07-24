# _template

Your Astro starter. `scripts/new-client.sh` copies this directory to `clients/<slug>/site/`.

Build it once with everything you never want to rebuild:

- Base layout, sticky header, footer, mobile sticky bottom bar
- `src/config/site.config.ts` (the shape is in the `build-standards` skill)
- Content collection schemas: services, areas, blog, team, testimonials, faqs
- `<BookingEmbed />` provider abstraction (Calendly / GHL / Google / none)
- Contact form with the unchecked SMS consent checkbox and full TCPA language
- Privacy and Terms stubs with the carrier-required mobile-number clause
- Schema helpers: LocalBusiness, Service, FAQPage, BreadcrumbList
- `@astrojs/sitemap`, `astro:assets`, Tailwind with an empty token layer

Leave the token layer empty. Per-client tokens are written at Stage 4 — that's the layer that makes each site look like a different studio made it.

## Notes on the current build

- Content collections are defined in `src/content.config.ts` (Astro 5+ Content Layer API), not `src/content/config.ts`.
- Tailwind v4 has no `@astrojs/tailwind` integration; it hooks in via `@tailwindcss/vite`. The "empty token layer" lives in `src/styles/tokens.css` as an `@theme` block — `tailwind.config.mjs` is plugin registration only. Every token *key* components reference is present, filled with a loud `#FF00FF` sentinel so the template builds clean before Stage 4 overwrites the real values.
- `booking.provider` includes `'other'` (generic iframe) alongside `calendly | ghl | google | none`, covering providers like Housecall Pro / ServiceTitan.
- A 7th content collection, `cityServicePages`, holds the real authored local prose for `/services/[service]-[city]/` pages — a plain data array can't hold that.
