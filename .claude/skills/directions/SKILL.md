---
name: directions
description: Stage 2 — propose two or three structurally distinct design directions for a client. Use after the brand read is approved, or when the user asks for design directions, concepts, or options.
argument-hint: "<slug>"
disable-model-invocation: true
---

Design directions for: $ARGUMENTS

## Before you write anything

1. Read `brief/00-audit.md` and `brief/01-brand-read.md`.
2. Load the `design-playbook` skill for the menus, the vertical library, and the banned list.

## The bar

Directions must differ **structurally**, not chromatically. Two directions sharing a hero archetype and a services layout are one direction in two palettes — that's a failure, and it's the default failure mode.

Repetition across the roster is allowed: pick the layout that converts best for this vertical, even if a prior client used it. Brand color, logo, photos, services, and copy differentiate sites naturally — never contort a direction just to avoid a layout someone else got.

## Each direction

- Name and a one-line thesis
- 4–6 named hex values
- Type pairing: named faces, with roles (display / body / utility)
- Hero archetype, by number from the playbook menu
- Services layout, by number
- Nav treatment
- **The signature element** — the one thing this site is remembered by
- ASCII wireframe of the homepage
- The one risk being taken, and why it's justified
- Contrast check: does the palette pass AA? Check now, not at QA — finding out at Stage 6 means rebuilding

## Self-check before showing the operator

Run this honestly and revise anything that fails:

1. If a similar brief arrived tomorrow, would I land here again? Then it's a default, not a choice — make it a choice or own it as the converting pattern.
2. Do these differ structurally, or is it one direction in three palettes?
3. Does the design come from this trade's actual world, or from "modern website"?
4. Is there exactly one signature element carrying the boldness, everything else disciplined?
5. What's the one thing I should remove?

Write `brief/02-design-directions.md` and present a summary in chat.

## The approval line

End the file with a commented instruction:

```
<!-- To approve, replace this line with:
APPROVED: <direction name> — <any modifications>
-->
```

Writes to `site/` stay blocked by the stage-gate hook until that `APPROVED:` line exists. That's intentional. Don't try to route around it.
