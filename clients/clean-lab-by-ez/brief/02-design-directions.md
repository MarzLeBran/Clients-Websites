# Design Directions — Clean Lab by EZ

Recipe log checked: `_system/RECIPE-LOG.md` is currently empty — this build is the first entry,
nothing to collide against. Photo grade is **C** (12 usable photos, 7 strong), so per the
asset-quality matrix all three directions below are type-driven: photography is used in
accents, not as the structural backbone. No before/after pairs currently exist (per the Stage 0
audit), so none of these directions depend on one — Direction A's signature element is
available immediately; the audit's recommended before/after shoot would only *strengthen*
these, not unlock them.

---

## Direction A — "Precision Lab"

**Thesis:** A precision performance lab for vehicles, not a car wash — cold, dark, technical,
built around the real tiered pricing menu the client already uses.

- **Palette:** `#0B0B0D` near-black (base) · `#1C1B1A` warm dark gray (cards) · `#F47920` vivid
  orange (single electric accent — matches the logo/flyer orange) · `#F5F3EF` warm white (body
  text) · `#3A3D42` cool steel gray (secondary UI, borders)
- **Type:** Display — geometric sans (Space Grotesk-style), tight tracking · Body — humanist
  sans (Inter-style) · Utility/numerics — monospace (JetBrains Mono-style), used specifically
  for prices and vehicle-size tiers
- **Hero archetype:** 6 — Color block. No full-bleed photo (the library can't carry one);
  type + a hexagon texture pulled from the existing flyer artwork + one offset accent image
  (`black-vehicle-detailing.jpg`, cropped small, not full-bleed)
- **Services layout:** 8 — Package/tier cards. Maps directly onto the real Lab Refresh / Lab
  Reset structure, "Most Popular" flag already established in the client's own marketing
- **Nav:** 6 — Left logo, center nav, right CTA pill
- **Signature element:** An interactive vehicle-size selector (Sedan / SUV / Truck) that updates
  the displayed price live across both tiers as you pick — turns the "lab precision" concept
  into something you actually *use*, not just a mood, and mirrors pricing data that's already
  real
- **Wireframe:**
```
┌────────────────────────────────────────┐
│ LOGO      Services  Areas  About   [Book]│ ← nav (6)
├────────────────────────────────────────┤
│  ██████████████  LAB GRADE CLEAN   ▓▓   │ ← hero: color block + hex texture
│  ██████         FOR YOUR CAR       ▓▓   │
│  ██████  [ Sedan | SUV | Truck ]   ▓▓   │ ← signature: live price selector
│  ██████     $79 → $175             ▓▓   │
├────────────────────────────────────────┤
│  [ Lab Refresh ]   [ Lab Reset ★ ]      │ ← services: tier cards (8)
├────────────────────────────────────────┤
│  ★★★★★ 5.0 · 25 Google reviews          │
├────────────────────────────────────────┤
│  Serving: Kissimmee · Davenport · ...   │
└────────────────────────────────────────┘
```
- **The risk:** Going fully dark/technical is less common than the bright, soapy-and-clean
  imagery most detailing competitors default to. Justified because it's not a stylistic
  guess — the logo, both existing flyers, *and* the operator's own words ("performance, dark")
  independently confirm this register before any design work started.
- **AA contrast (computed, not asserted):** orange `#F47920` on near-black `#0B0B0D` = **7.12:1**
  — passes AA for normal text and AAA for large text. Orange text on card gray `#1C1B1A` =
  **6.23:1** — passes AA. Warm white body text on near-black exceeds 15:1. Every text/background
  pairing this direction uses clears AA at normal size.

---

## Direction B — "Service Radius"

**Thesis:** Lead with "we come to you" as the literal first interaction, not a background fact —
the client's own flyer puts "100% MOBILE SERVICE" first; this direction structurally mirrors
that priority instead of leading with a price or a hero shot.

- **Palette:** Same confirmed core (`#0B0B0D` / `#1C1B1A` / `#F47920` / `#F5F3EF` / `#3A3D42`) —
  kept identical to Direction A deliberately, to prove the structural difference below isn't
  just a recolor
- **Type:** A bolder condensed geometric display (heavier weight than Direction A) + the same
  humanist sans body + mono for numerics — same logic, different scale contrast, reads as a
  different hand
- **Hero archetype:** 10 — Map-anchored. A stylized map of the six served cities (Kissimmee,
  Davenport, St. Cloud, Orlando, Poinciana, Haines City) with Davenport at center, as the actual
  opening visual — not a photo, not a headline-first block
- **Services layout:** 5 — Tabbed panels (Lab Refresh / Lab Reset / Add-ons as three tabs).
  Genuinely different mechanic from Direction A's tier cards, even though the underlying pricing
  data is the same
- **Nav:** 2 — Two-tier: a thin utility strip (phone, hours, "100% Mobile") above the main nav —
  reinforces the logistics-first framing this direction is built around
- **Signature element:** Hovering or tapping each city on the map reveals a one-line, genuinely
  local blurb (not a generic "we serve this area too") — feeds directly from the `areas` content
  collection built into `_template/`
- **Wireframe:**
```
┌────────────────────────────────────────┐
│ (689) 200-6472 · Mon–Sat 8–5 · 100% Mobile│ ← utility strip
│ LOGO         Services  Reviews    [Book] │ ← main nav (2)
├────────────────────────────────────────┤
│         ●Orlando                        │
│    ●Poinciana  ●Kissimmee  ●St.Cloud    │ ← hero: map-anchored (10)
│         ●Davenport   ●Haines City       │
│      "We bring the lab to you."         │
├────────────────────────────────────────┤
│ [Refresh] [Reset] [Add-Ons]  ← tabs (5) │
├────────────────────────────────────────┤
│  ★★★★★ 5.0 · 25 Google reviews          │
└────────────────────────────────────────┘
```
- **The risk:** Leading with geography instead of a hero shot or price is unusual for the
  category — most competitors open with a vehicle photo. Justified because it's not an
  invented differentiator: it's the literal first line on the client's own flyer, just made
  structural instead of decorative.
- **AA contrast:** identical palette to Direction A — same computed ratios apply (7.12:1 /
  6.23:1), both pass AA.

---

## Direction C — "The Counter-Read"

**Thesis:** Deliberately the vertical's counter-read, not the client's stated instinct —
restrained, premium, "we don't wash cars." Included on purpose, per the playbook's own guidance
to offer a genuine alternative rather than only variations of the expected choice. This is not
a recommendation over Directions A/B — it's a real option to consciously accept or reject.

- **Palette:** `#16321F` deep racing green (base) · `#EDE8DD` warm ivory (text/panels) ·
  `#B08D57` brushed-gold accent · `#0F0F0F` near-black for small body text on light panels.
  Deliberately avoids the banned cream+terracotta+serif cliché (design-playbook's banned list)
  by using green as the base and a metallic gold instead of clay/terracotta as the accent.
- **Type:** High-contrast display serif + a neutral grotesque body — the "chic/upscale" pairing
  logic, appropriate to a concours/premium register. Mono used minimally, only for a
  spec-sheet-style detail label if needed.
- **Hero archetype:** 4 — Editorial masthead. Large type, a rule, a restrained image band below
  using one strong exterior shot (`tesla-black-gloss.png`), cropped quiet rather than dramatic
- **Services layout:** 10 — Index list, type-only, hover reveals image. Quiet and confident,
  the opposite of Direction A's retail tier-card feel
- **Nav:** 4 — Centered logo, split nav
- **Signature element:** A single restrained "by appointment" indicator styled like a concierge
  menu rather than a retail price table — one deliberately quiet moment instead of an
  interactive gadget
- **Wireframe:**
```
┌────────────────────────────────────────┐
│      Services   LOGO   Reviews          │ ← nav: centered/split (4)
├────────────────────────────────────────┤
│         CLEAN LAB BY EZ                 │ ← hero: editorial masthead (4)
│    A precision detail, by appointment   │
│  ────────────────────────────────────   │
│  [ restrained image band: Tesla, dusk ] │
├────────────────────────────────────────┤
│  Lab Refresh ............... details →  │ ← services: index list (10)
│  Lab Reset .................. details → │
├────────────────────────────────────────┤
│  "5.0, twenty-five reviews. Quietly."   │
└────────────────────────────────────────┘
```
- **The risk:** This direction actively contradicts the operator's own stated vibe
  ("performance, dark"). That's intentional, not an oversight — it's here so the choice between
  "lean into what's already confirmed" and "a genuinely different premium register" is a real
  one, not assumed.
- **AA contrast (computed):** ivory `#EDE8DD` on deep green `#16321F` = **10.19:1** — passes AAA.
  Gold `#B08D57` on the same green = **4.03:1** — this clears the 3:1 threshold for large
  text/UI components but falls short of 4.5:1 for normal body text. Constraint: gold is reserved
  for headlines, labels, and buttons only in this direction — never small body copy. Flagging
  this now, not at Stage 6 QA.

---

## Self-check

1. **Would I land here again on a similar brief?** Direction A is earned, not reflex — it's
   confirmed by the operator's own words, the photo evidence, and the existing brand assets
   independently, not chosen by default. B and C exist specifically so the set isn't "the
   obvious choice in three palettes."
2. **Structural, not chromatic?** Yes — three different hero archetypes (6, 10, 4), three
   different services layouts (8, 5, 10), three different nav treatments (6, 2, 4). B reuses A's
   palette on purpose to prove the differentiation is structural.
3. **From the trade's actual world?** Yes — real tiered pricing, real service vernacular, the
   six real served cities, real vehicle types from the photo library.
4. **Recipe log checked?** Yes — empty, nothing to collide with.
5. **Exactly one signature element each, everything else disciplined?** Yes — live price
   selector (A), map-reveal blurbs (B), concierge-style appointment indicator (C).
6. **What's the one thing to remove?** A: no decorative gauges/dials beyond the price selector
   itself — cut anything that turns "lab" into dashboard cosplay. B: no animated map pins or
   drop shadows — one static map, one hover interaction, nothing else. C: no script/cursive
   accents anywhere outside the existing logo lockup — the serif/grotesque pairing carries it
   alone.

APPROVED: Precision Lab — no modifications
