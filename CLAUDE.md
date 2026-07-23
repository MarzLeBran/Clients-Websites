# Home Services Website Studio

Astro sites for local service businesses: plumbing, roofing, GC, handyman, windows and glass, in-home sales, mobile detailing, barbershops, salons, pet groomers.

**The premise: distinctive on the surface, identical underneath.** No two client sites should look like they came from the same shop. Every site converts the same way, because conversion architecture is engineering, not taste.

## Repo map

```
clients/<slug>/     one directory per client
  intake/           completed form, call notes
  assets/           photos, logo, reviews, existing site
  brief/            00-audit → 04-design-system (generated, in order)
  site/             the Astro project
_system/
  RECIPE-LOG.md     anti-repetition ledger — check before every Stage 2
  intake-form.md    the form we send clients
_template/          Astro starter, cloned by scripts/new-client.sh
```

## The pipeline

Work in stages. Stages 1 and 2 stop for human approval.

| Stage | Skill | Output |
|---|---|---|
| 0 Audit | `/new-client` | `brief/00-audit.md` |
| 1 Brand read | `/brand-read` | `brief/01-brand-read.md` — **approval** |
| 2 Directions | `/directions` | `brief/02-design-directions.md` — **approval** |
| 3 Architecture | `/architect` | `brief/03-architecture.md` |
| 4+5 Build | `/build-site` | `brief/04-design-system.md`, `site/` |
| 6 QA | `/ship` | pass/fail report |

A `PreToolUse` hook blocks writes to `clients/*/site/` until `brief/02-design-directions.md` contains an `APPROVED:` line. If that hook fires, don't work around it — go back and get the direction approved.

## Rules

1. **No invented facts.** Every claim on a site — years in business, certifications, awards, licence numbers, "family owned" — traces to `intake/`. If it isn't there, ask. Never fill a gap with a plausible guess.
2. **No repeated recipes.** Read `_system/RECIPE-LOG.md` before proposing directions. Never reuse a hero archetype or services layout within a vertical. Append a row after every build.
3. **Business facts live in `site.config.ts`.** Phone, hours, licence, service areas, NAP. Never hardcode them into components — a client changing their number should be a one-line edit.
4. **Delegate image reading.** A client folder holds 50+ photos. Use the `brand-analyst` subagent so they're read in an isolated context and only the summary returns.
5. **Compliance ships with the site.** Every phone-collecting form needs an unchecked SMS consent box with full TCPA language, plus a live privacy policy. Without them the client's A2P 10DLC registration gets rejected and their GHL campaigns never send.
6. **Copy is design material.** Written in the client's actual voice from the intake. Never lorem ipsum, never "quality service you can trust."

## Commands

```bash
npm run dev      # from clients/<slug>/site/
npm run build
npm run preview
npx astro check  # type check before shipping
```

## Conventions

- Astro static output, Tailwind, content collections for services/areas/blog/team/testimonials/faqs
- Islands only for: chat widget, mobile nav, lightbox, before/after slider, booking embed
- TypeScript strict, no default exports outside pages
- Commits: `feat(client-slug): description`
