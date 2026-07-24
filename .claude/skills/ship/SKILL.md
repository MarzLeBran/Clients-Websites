---
name: ship
description: Stage 6 — run the full pre-launch QA gauntlet on a client site. Use when the user says ship it, run QA, check the site, or is preparing for launch.
argument-hint: "<slug>"
disable-model-invocation: true
allowed-tools: Bash, Read, Grep, Glob, Agent
---

QA gauntlet: $ARGUMENTS

Run the audits in parallel via subagents, then report **failures only**. The operator doesn't need to read a list of things that passed.

## 1. Build

```bash
npm run build && npx astro check
```
Any error or type failure is a hard stop.

## 2. Parallel audits

Dispatch simultaneously:
- `seo-auditor` — schema, meta, NAP consistency, internal linking, sitemap
- `a11y-auditor` — contrast, focus states, semantics, labels, reduced motion
- `design-critic` — banned defaults, direction fidelity

## 3. Facts check

Every claim on the site traces to `intake/`. Grep for years in business, certifications, awards, licence numbers, "family owned", "since 19XX", review counts. Anything not in the intake is a hard stop, not a warning. This is the failure that costs a client relationship.

## 4. Compliance check

Hard stops, all of them:
- SMS consent checkbox present on every phone-collecting form, and **unchecked by default**
- Full consent language: business name, message type, frequency, rates may apply, STOP to opt out
- Privacy policy live, linked from footer and forms, containing the mobile-numbers-not-shared clause carriers look for
- Terms live and reachable without login

Without these, A2P 10DLC registration is rejected and the client's GHL campaigns never send. Discovering this after launch is the worst possible time.

## 5. Conversion check

- Sticky header with tap-to-call
- Mobile sticky bottom bar present and thumb-reachable
- Primary CTA above the fold
- CTA block at least every two sections
- Form posts to the GHL webhook — send a real test lead and confirm receipt
- Booking embed loads and can complete a real booking
- All `tel:` links dial correctly

## 6. Content check

No lorem ipsum. No placeholder images. No stock photo of a stranger in a hard hat. No "quality service you can trust."

## 7. Report and log

Failures only, grouped by severity: hard stops, then warnings. Then append a row to `_system/RECIPE-LOG.md` with client, vertical, photo grade, hero archetype, services layout, nav, type pairing, and signature element.
