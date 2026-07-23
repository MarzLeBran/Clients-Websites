---
name: brand-read
description: Stage 1 — write the brand interpretation for a client before any visual decisions. Use after the asset audit, when the user says "brand read", or asks who a client really is before designing.
argument-hint: "<slug>"
disable-model-invocation: true
---

Brand read for: $ARGUMENTS

Read `clients/<slug>/intake/` and `clients/<slug>/brief/00-audit.md` first. If the audit doesn't exist, run `/new-client` instead.

**No colors, no fonts, no layout in this stage.** Words only. The point is to understand the business before you have any visual commitments to defend.

Write `brief/01-brand-read.md`:

```markdown
# Brand Read — <Business Name>

## Who they actually are
[One paragraph. The real read, not marketing language. What kind of
 operation is this — one truck or twelve? Owner on the tools or in an
 office? Growing or coasting?]

## Five adjectives
## Five adjectives they are NOT
[This one does more work than the first list. It rules things out.]

## The customer, and their emotional state on arrival
[A homeowner with water coming through the ceiling is in a different
 state than a woman booking balayage six weeks out. This drives the
 entire hierarchy — urgency vs. browsing, phone vs. form, big red
 button vs. quiet elegance.]

## The one job of the homepage
[Emergency call / booked appointment / estimate request / showroom
 visit. One. Not four.]

## Vernacular
[Words, materials, tools, textures from this trade's actual world.
 Copper and PEX. Fades and lineups. Clay coat and swirl marks.
 This is where distinctive design comes from — not from "modern website".]

## Voice
[How the owner actually talks, quoted from intake or social captions.
 The copy will be written in this voice.]

## Competitive read
[What every other site in this vertical and market looks like, and
 where the opening is.]
```

Then stop and ask for approval. Do not proceed to `/directions` unprompted — the whole point of the gate is that the operator corrects the read before it becomes a design.
