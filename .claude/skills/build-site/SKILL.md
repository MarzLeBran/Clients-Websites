---
name: build-site
description: Stage 4 and 5 — build the Astro site from an approved direction and architecture. Use when the user says build the site, start the build, or implement the design.
argument-hint: "<slug>"
disable-model-invocation: true
allowed-tools: Bash, Read, Write, Edit, Glob, Grep, Agent
---

Build: $ARGUMENTS

Requires an `APPROVED:` line in `brief/02-design-directions.md`. The stage-gate hook enforces this; if it fires, get the approval rather than working around it.

Load the `build-standards` skill. Read `brief/03-architecture.md`.

## Stage 4 — design system first

Write `brief/04-design-system.md` and the token layer in `tailwind.config.mjs` **before** any component. Tokens: color scale, type scale with real weights and sizes, spacing rhythm, radii, shadows, motion timings. Self-host fonts, preload the display face.

No raw hex in components. Ever. If a component needs a color that isn't a token, the token system is wrong — fix it there.

## Stage 5 — build order

1. `site.config.ts` with real client data
2. Content collections + schemas, seeded from intake
3. Base layout, header, footer, mobile sticky bar
4. Homepage, following the approved wireframe exactly
5. Service pages, then area pages, then city × service
6. About, Reviews, Contact, FAQ
7. Legal pages — privacy and terms are **not optional**, A2P 10DLC registration fails without them
8. Islands: booking embed, chat widget, any interactive signature element

## Copy

Delegate to the `site-copywriter` subagent. It writes in the owner's voice from the intake, and it doesn't invent facts. Never ship placeholder text — a stray "quality service you can trust" undoes the whole point of the brand read.

## As you go

- Match complexity to the direction: maximalist needs elaborate execution, minimal needs precision in spacing and detail
- Build the quality floor without announcing it — responsive to 320px, visible keyboard focus, `prefers-reduced-motion` honored
- Run `npm run build` and `npx astro check` periodically, not just at the end
- Watch CSS specificity, especially section padding collisions between element and class selectors

When the build compiles, run `/ship`.
