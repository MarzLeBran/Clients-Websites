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
- `site.config.ts` carries `mode: 'demo' | 'production'`. Demo mocks every integration (booking → form+phone fallback, chat off, forms → visible call/text fallback, never a POST); flipping to `'production'` activates the configured providers in place.
- Lead handling: forms build the `Lead` DTO (`src/lib/lead.ts`) and POST JSON to the same-origin proxy `functions/api/lead.ts` (`/api/lead` on Cloudflare Pages). The GHL webhook URL lives only in the `GHL_WEBHOOK_URL` server secret.

## Demo theming — seed a palette from the logo

```bash
python3 scripts/derive-tokens.py \
  --logo clients/<slug>/assets/logo/logo.png \
  --tokens clients/<slug>/site/src/styles/tokens.css \
  --scheme dark            # or light; add --dry-run to preview
```

Samples the logo's dominant accent, derives the full color system from a
minimal seed (surface, surface-raised, text, border — all overridable),
verifies WCAG AA on every text-bearing pair (auto-nudging or failing loudly),
and rewrites only the `--color-*` values in tokens.css — type scale, spacing,
and utilities are untouched. `scripts/verify.sh` fails any client build that
still contains a `#FF00FF` sentinel, so an unthemed site can't ship quietly.
