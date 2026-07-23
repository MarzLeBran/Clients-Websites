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
