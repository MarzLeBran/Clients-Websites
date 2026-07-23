---
name: architect
description: Stage 3 — plan the page map, URL structure, content collections, and schema for a client site. Use after a design direction is approved, or when the user asks for site architecture or a page map.
argument-hint: "<slug>"
disable-model-invocation: true
---

Architecture for: $ARGUMENTS

Read the approved direction in `brief/02-design-directions.md` and the intake. Load the `build-standards` skill for the required page inventory and schema rules.

Write `brief/03-architecture.md`:

## Page map
Every URL, its title tag, meta description, H1, and schema types. Use the required inventory from build-standards as the floor, then add vertical-specific pages.

## City × service matrix
The revenue pages. List every combination worth building, ranked. **Cap at 15–20 until the domain has authority** — dumping 200 thin pages on a new domain gets the whole site filtered, not just those pages.

For each, note the genuinely local angle: neighborhoods, housing stock and age, climate-driven failure modes, local code quirks. If you can swap the city name and the page still reads correctly, it's spun text. Don't plan pages you can't write real content for.

## Content collections
Zod schemas for `services`, `areas`, `blog`, `team`, `testimonials`, `faqs`.

## site.config.ts
Fill the full shape from build-standards with this client's real data. Flag every field the intake didn't answer — do not guess, and do not put a placeholder that could ship.

## Internal linking
Service pages ↔ area pages ↔ city×service pages. Sketch the graph.

## Component inventory
What the chosen direction needs beyond the standard set, and which components need to be islands.
