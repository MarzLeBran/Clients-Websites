# Home Services Website Studio

Astro sites for local service businesses: plumbing, roofing, GC, handyman, windows and glass, in-home sales, mobile detailing, barbershops, salons, pet groomers.

**The premise: distinctive on the surface, identical underneath.** Brand comes from logo, color, type, imagery, copy, spacing, and photography — the surface. Every site converts the same way underneath, because conversion architecture is engineering, not taste. Distinctiveness across the roster is *not* enforced: two sites in the same vertical looking similar is fine; the objective is authenticity and conversion, not novelty.

## Two modes, one codebase

Every site carries `mode: 'demo' | 'production'` in `site.config.ts`. **Demo is a strict subset of production in the same project — never a throwaway.**

- **Demo** — a polished sales tool generated in minutes from minimal inputs (`_system/intake-demo.md`: business name, logo, phone, primary services, one brand color, optional photos). Integrations are mocked: booking renders the form+phone fallback, chat stays off, forms never POST (visible call/text fallback). Tokens auto-derive from the logo via `scripts/derive-tokens.py`. Reduced page set, not SEO-complete. Zero fabricated facts, even here.
- **Production** — built after onboarding (`_system/intake-form.md`, structured + machine-consumable) by **expanding the approved demo in place**: same tokens, logo, photos, and config carry forward; production adds pages, collections, schema depth, real integrations, and copy. Nothing is regenerated from scratch.

## Repo map

```
clients/<slug>/     one directory per client
  intake/           filled intake (demo or production tier), call notes
  assets/           logo/ photos/ reviews/ existing-site/ (fixed contract)
  brief/            00-audit → 04-design-system (generated, in order)
  site/             the Astro project (mode flag inside)
_system/
  RECIPE-LOG.md     build log — a record of what was built, not a constraint
  intake-demo.md    minimal demo intake (six inputs)
  intake-form.md    full production intake — typed YAML, per-field status
_template/          Astro starter, cloned by scripts/new-client.sh
scripts/
  new-client.sh     scaffold
  derive-tokens.py  logo-seeded palette derivation w/ AA verification
  verify.sh (+ verify/*.mjs)  the mechanical QA gates
```

## The pipeline

Work in stages. Stages 1 and 2 stop for human approval (a demo spin moves through them fast, but they still gate).

| Stage | Skill | Output |
|---|---|---|
| 0 Audit | `/new-client` | `brief/00-audit.md` |
| 1 Brand read | `/brand-read` | `brief/01-brand-read.md` — **approval** |
| 2 Directions | `/directions` | `brief/02-design-directions.md` — **approval** |
| 3 Architecture | `/architect` | `brief/03-architecture.md` |
| 4+5 Build | `/build-site` | `brief/04-design-system.md`, `site/` |
| 6 QA | `/ship` + `npm run verify` | pass/fail report |

A `PreToolUse` hook blocks writes to `clients/*/site/` until `brief/02-design-directions.md` contains an `APPROVED:` line. If that hook fires, don't work around it — go back and get the direction approved.

## Platform vs. brand — the line that keeps sites identical underneath

**Platform layer — never varies per client, never forked.** Forms and lead
handling (the `Lead` DTO in `lib/lead.ts`, `lib/lead-form.ts`, the
`functions/api/lead.ts` proxy), schema components and `lib/schema.ts`,
analytics/tracking wiring, accessibility behavior (focus, consent
validation, disclosure nav, reduced-motion/forced-colors handling), legal
pages, header/footer *behavior*, the booking abstraction, and the photo
registry/`site.config.ts` shapes. These are modified **only in
`_template/`** and synced to client sites wholesale — a client build must
never fork one. If a client needs something a platform component can't do,
extend the template so every future client inherits it.

**Brand layer — fluid, per client.** Color tokens, type, imagery, copy,
spacing, layout composition, iconography, and the signature element.
This is the only layer that varies between clients.

## Rules

1. **No invented facts.** Every claim on a site — years in business, certifications, awards, licence numbers, "family owned" — traces to `intake/`. Intake fields carry `confirmed | quote | PENDING`; PENDING ships blank/flagged. If it isn't there, ask. Never fill a gap with a plausible guess.
2. **Repetition is allowed.** Choose the layout that converts best for the vertical, even if a prior client used it. Brand color, logo, photos, services, and copy differentiate sites naturally. Append a row to `_system/RECIPE-LOG.md` after every build — it's a record, not a constraint.
3. **Business facts live in `site.config.ts`.** Phone, hours, licence, service areas, NAP. Never hardcode them into components — a client changing their number should be a one-line edit.
4. **Delegate image reading.** A client folder holds 50+ photos. Use the `brand-analyst` subagent so they're read in an isolated context and only the summary returns. Only audit-approved "strong" photos enter `lib/photos.ts` — pages select by its metadata, not by hardcoding keys.
5. **Compliance ships with the site.** Every phone-collecting form needs an unchecked SMS consent box with full TCPA language (custom-validated, `data-consent-language`-wrapped), plus a live privacy policy. Without them the client's A2P 10DLC registration gets rejected and their GHL campaigns never send.
6. **Copy is design material.** Written in the client's actual voice from the intake. Never lorem ipsum, never "quality service you can trust." Depth is tiered *guidance*, never a gate: primary ~600–1000 words when verified material supports it, secondary ~350–700, add-ons ~150–350 as cards. Complete coverage using verified information — a shorter honest page beats a padded one.
7. **Leads go through the proxy.** Forms build the `Lead` DTO and POST JSON to the same-origin `/api/lead` (`functions/api/lead.ts`), which validates, stamps consent timestamp/IP, adapts to GHL's contract, and forwards to the `GHL_WEBHOOK_URL` server secret. A GHL URL must never appear in `site.config.ts`, any component, or `dist/` — and a browser must never POST to GHL directly (CORS kills it silently). Every failure surfaces the call/text fallback; a lead is never silently lost.

## Service tiers

The `services` collection's `serviceTier: 'primary' | 'secondary' | 'addon'` drives page generation: primary/secondary get `/services/[slug]/` pages (own title/H1/meta/schema/FAQ/CTA); add-ons render as pricing cards in `/services/#add-ons` — no standalone URLs, no thin pages. City×service pages are primary-only, each requiring a real, verifiable local angle; cap the matrix to what can be honestly authored.

## Commands

```bash
npm run dev        # from clients/<slug>/site/
npm run build
npm run preview
npx astro check    # type check
npm run verify     # the mechanical gates (mode-aware; also pre-commit fast set + CI)
python3 scripts/derive-tokens.py --logo <logo> --tokens <tokens.css>   # theme a demo
```

`npm run verify` (per client site, never `_template/`) gates: sentinel `#FF00FF` tokens, raw hex in `.astro`, consent presence, `astro check`, build, internal links, axe serious/critical — plus, in production mode: per-page metadata/canonicals, JSON-LD types, near-duplicate city pages (flagged), no GHL URL in dist, provider config. **No word-count gate.**

## Conventions

- Astro static output, Tailwind v4 (`@theme` tokens in `src/styles/tokens.css`), content collections for services/areas/blog/team/testimonials/faqs/cityServicePages
- Islands only for: chat widget, mobile nav, lightbox, before/after slider, booking embed, and an approved interactive signature element
- Images flow through `astro:assets` via `lib/photos.ts` — responsive srcset, intrinsic dimensions, next-gen formats
- TypeScript strict, no default exports outside pages
- Commits: `feat(client-slug): description`
