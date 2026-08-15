# Design Directions — Borinken Landscaping

Context this is built from: photo grade **C** (per `00-audit.md`) — under 20
truly usable real photos, one strong before/after pair, no owner headshot.
Two real Google reviews plus a verified 5.0★/22-review record now exist
(new since the audit). Brand color is **confirmed** by the operator as
`#53FF0B` (the neon green he's actually used) — every direction below
keeps that exact value; only the supporting palette varies.

Three directions, chosen to differ structurally — different hero
archetypes, different services layouts, different signature elements —
not the same site recolored three times.

---

## Direction A — "Five Stars, Plainly Stated"

**Thesis:** The photo library is too thin to carry the site, but the
review record is exceptional and real — so let the proof be the design,
not the pictures.

**Palette**
- `surface` `#0E0E10`
- `surface-raised` `#1B1B1E`
- `brand-primary` `#53FF0B` (confirmed)
- `text-primary` `#F5F5F0`
- `text-muted` `#B7B7B7`
- `border` `#33363B`

**Type pairing:** Display — *General Sans* (bold, tight tracking). Body —
*Inter*. Utility/numerics — *JetBrains Mono* (for "5.0 ★ 22 reviews," the
phone number, service list labels).

**Hero archetype:** #6 — Color block. No photo in the hero itself: a
huge headline, the phone number, and the real "5.0 ★ — 22 Google
reviews" stat treated as the dominant visual element, with one real
review line set large underneath. The real hero photo appears as a
supporting band directly below, not in the hero itself.

**Services layout:** #10 — Index list, type-only (MOWING — WEED EATING —
PLANTING — EDGING), each row large and editorial; hovering/tapping a row
reveals a small real photo crop. Honest fit for exactly four services.

**Nav:** #1 — Classic sticky bar. Deliberately plain, so it doesn't
compete with the review stat as the hero's focal point.

**Signature element:** The "5.0 ★ / 22 reviews" mark, treated as a
recurring bold graphic — in the hero, in the mobile sticky CTA bar, and
closing out the services section. It's real and verifiable, never
inflated.

**Risk:** Opening with almost no photography on a landscaping site is
unusual — most competitors lead with a lawn photo. Justified because the
actual photo library can't back that up (grade C), while the review
record can. The bet is that verified proof beats a generic hero photo.

**Contrast:** text-primary/surface 17.6:1, brand-primary/surface 14.4:1,
text-muted/surface 9.6:1 — all pass AA with margin.

```
┌──────────────────────────────────────────┐
│ BORINKEN LANDSCAPING            (321)...  │ ← sticky bar, plain
├──────────────────────────────────────────┤
│                                            │
│   MOWING. TRIMMING. EDGING.               │
│   PLANTED RIGHT. THE FIRST TIME.          │
│                                            │
│   ★★★★★  5.0 — 22 GOOGLE REVIEWS          │
│   "Hiram went above and beyond."          │
│                                            │
│   [ GET A FREE ESTIMATE ]                 │
├──────────────────────────────────────────┤
│  [ real hero photo band, full-width ]     │
├──────────────────────────────────────────┤
│  MOWING          >                        │
│  WEED EATING     >   (hover → tiny photo) │
│  PLANTING        >                        │
│  EDGING          >                        │
├──────────────────────────────────────────┤
│  ★ 5.0 · 22 reviews on Google — see all   │
├──────────────────────────────────────────┤
│  About · Contact · footer                 │
└──────────────────────────────────────────┘
```

---

## Direction B — "The Trim"

**Thesis:** One real, honest before/after — the topiary tree — is worth
more than a gallery of mediocre photos. Let that single transformation
open the site, treated with total discipline everywhere else.

**Palette**
- `surface` `#F7F8F2`
- `surface-raised` `#FFFFFF`
- `brand-primary` `#53FF0B` (confirmed — fills/badges only, never used as
  text on this light surface; a deepened `#2E8F0C` variant carries any
  green *text* so contrast holds)
- `text-primary` `#14170F`
- `text-muted` `#5B6156`
- `border` `#D8DCC9`

**Type pairing:** Display — *Fraunces* (warm slab-serif, carries the
"meticulous, does the extra 10%" read). Body — *Source Sans 3*. Utility —
*IBM Plex Mono*.

**Hero archetype:** #9 — Before/after slider, as the hero itself. The
topiary tree photos (unshaped → clean ball), full-bleed, slider handle
front and center. Headline sits over it, short.

**Services layout:** #2 — Alternating full-width rows with imagery. Tight
crops, one consistent color grade already applied to the real photos,
generous solid-color breathers between rows — the B-grade "constrained
and treated" strategy applied properly rather than fighting the library.

**Nav:** #3 — Transparent over the hero, solid on scroll, so the slider
isn't interrupted by a bar.

**Signature element:** The before/after slider. One pair, not a false
promise of many — the single boldest thing on the page, everything else
quiet around it.

**Risk:** Betting the entire hero on one before/after pair instead of a
gallery. Justified because it's real and immediately demonstrates
craftsmanship in a way a static "after" photo never could; kept honest by
not implying there's a deep library behind it.

**Contrast:** text-primary/surface 17.0:1, text-muted/surface 6.0:1 — both
pass AA. Brand-primary green sits at only 1.25:1 against this light
surface, which is why it's restricted to filled buttons/badges (with dark
text on top) and never used as text color here.

```
┌──────────────────────────────────────────┐
│  (transparent) BORINKEN    services  call │
├══════════════[ BEFORE|AFTER slider ]══════┤
│         "We finish what we start."        │
│              [ Free Estimate ]            │
├──────────────────────────────────────────┤
│ [img]  MOWING                             │
│        Regular cuts, edged clean, every…  │
├──────────────────────────────────────────┤
│  WEED EATING                       [img]  │
│  Tight lines along beds, curbs, fences…   │
├──────────────────────────────────────────┤
│ [img]  PLANTING                           │
├──────────────────────────────────────────┤
│  EDGING                            [img]  │
├──────────────────────────────────────────┤
│  About · real reviews · Contact · footer  │
└──────────────────────────────────────────┘
```

---

## Direction C — "Sea to Sea"

**Thesis:** Hiram already wrote the brand voice himself — bilingual,
warm, faith-forward — and already has a real, personal mark (the
coquí/Taíno symbol) no competitor can copy. Make the site sound and look
like him, not like a landscaping template.

**Palette**
- `surface` `#14201A` (deep forest, distinct from Direction A's neutral
  black)
- `surface-raised` `#1E2E24`
- `brand-primary` `#53FF0B` (confirmed)
- `accent-warm` `#E8A33D` (pulled from the real flowers/mulch beds in his
  photos — used sparingly, motif fills and dividers only)
- `text-primary` `#F3F5EE`
- `text-muted` `#A8B3A0`

**Type pairing:** Display — *Bricolage Grotesque* (handles bilingual
headlines with personality without tipping playful). Body — *Work Sans*.
Utility — *Space Mono*.

**Hero archetype:** #3 — Asymmetric offset. Oversized bilingual headline
("LET US BE YOUR BLESSING / Permítanos ser su bendición") overlapping the
real hero photo at an offset, not centered/stacked.

**Services layout:** #7 — Accordion with inline imagery. Compact,
browseable, personal — a different rhythm from both A and B.

**Nav:** #4 — Centered logo, split nav either side, so the coquí mark
sits literally at the center of every page.

**Signature element:** The coquí/Taíno mark used as a genuine recurring
motif — a line-art watermark bleeding off section dividers, and the
vector mark standing in for generic checkmarks/bullets throughout the
services and about content. Not just a header logo; a running visual
signature.

**Risk:** Leaning into personal/cultural identity rather than generic
"landscaping site" signals. Justified because it's real — Hiram put the
mark and the bilingual blessing line on his own Facebook page unprompted
— and no competitor in this market has anything like it. Kept honest by
using only his existing real mark; no new cultural iconography invented.

**Contrast:** text-primary/surface 15.3:1, brand-primary/surface 12.5:1,
text-muted/surface 7.7:1, accent-warm/surface 7.8:1 — all pass AA.

```
┌──────────────────────────────────────────┐
│   services      (coquí mark)      call    │
├──────────────────────────────────────────┤
│ [ real hero photo ]                       │
│         LET US BE YOUR BLESSING           │
│      Permítanos ser su bendición          │
│         [ Free Estimate → ]               │
├──────────────────────────────────────────┤
│ ⌵ Mowing                    (coquí bullet)│
│ ⌵ Weed Eating                             │
│ ⌵ Planting          [inline photo on open]│
│ ⌵ Edging                                  │
├──────────────────────────────────────────┤
│  ····coquí watermark bleeding off edge····│
│  "Thank you, it was a pleasure — God      │
│   blessed you." — Hiram, to a customer    │
├──────────────────────────────────────────┤
│  About · reviews · Contact · footer       │
└──────────────────────────────────────────┘
```

---

---

## Direction D — "Sea to Sea, Trimmed Right" (B + C combined, per operator request)

**Thesis:** The real before/after transformation opens the site (B's
proof-of-craft), but the slider itself is framed by Hiram's own bilingual
voice and the coquí/Taíno mark (C's personal identity) — fused into one
moment rather than two competing signatures. One truth carrying the page:
this is careful, real work, done by a real person with a real story.

**Palette** (Direction C's forest base — kept over B's light surface,
since it carries the personal/heritage read better and gives the neon
green and warm-gold accent more room to work)
- `surface` `#14201A`
- `surface-raised` `#1E2E24`
- `brand-primary` `#53FF0B` (confirmed)
- `accent-warm` `#E8A33D` (from the real flowers/mulch in his photos —
  motif fills and dividers only)
- `text-primary` `#F3F5EE`
- `text-muted` `#A8B3A0`
- `border` `#5C6E58` (lightened from C's original for real 3:1 UI-border
  contrast — the earlier border was decorative-only and too low for
  functional use like form inputs)

**Type pairing:** Display — *Fraunces* (from B — warm slab-serif, carries
the "meticulous, does the extra 10%" read, and sets Spanish/English
headlines with more warmth than a grotesque would). Body — *Work Sans*
(from C — humanist, clean diacritics for bilingual copy). Utility —
*IBM Plex Mono*.

**Hero archetype:** #9 — Before/after slider (from B), using the real
topiary pair, but the slider's drag handle is the coquí mark itself
rather than a generic arrow, and a thin coquí-motif watermark bleeds off
the section's edges (from C). The confirmed tagline sits over the slider
in both languages, sourced from intake — no new copy invented here.

**Services layout:** #2 — Alternating full-width photo rows (from B).
Each row uses the coquí mark as its bullet/divider instead of a generic
checkmark — a small, consistent nod to C without competing with the
photos.

**Nav:** Hybrid — centered logo (the coquí mark sits dead-center, per C),
transparent over the hero, solid on scroll (per B), so the mark is both
structurally central and unobtrusive during the hero moment.

**Signature element:** One fused element, not two — the before/after
slider *is* the coquí mark's stage: the handle, the watermark framing it,
and the bilingual line together read as a single authored moment rather
than a slider plus a separate logo motif bolted on.

**Risk:** Combining two directions risks diluting both into neither.
Mitigated by physically fusing the slider and the motif into one element
(the handle) instead of placing two separate "look at me" moments on the
same page — there's still exactly one signature, it's just built from two
ideas.

**Contrast:** text-primary/surface-raised 13.0:1, accent-warm/surface-
raised 6.6:1, border/surface 3.06:1 (meets the 3:1 UI-component minimum
for real borders, not just decorative ones) — all pass.

```
┌──────────────────────────────────────────┐
│  services   (coquí mark, centered)  call  │  ← transparent, solidifies on scroll
├══════[ BEFORE | AFTER slider ]════════════┤
│         (coquí-shaped drag handle)        │
│   ····coquí watermark bleeding off edge···│
│      LET US BE YOUR BLESSING              │
│      Permítanos ser su bendición          │
│           [ Free Estimate ]               │
├──────────────────────────────────────────┤
│ [img]  MOWING                        (◈)  │  ← coquí-mark divider
│        Regular cuts, edged clean…         │
├──────────────────────────────────────────┤
│  WEED EATING                  (◈) [img]   │
├──────────────────────────────────────────┤
│ [img]  PLANTING                      (◈)  │
├──────────────────────────────────────────┤
│  EDGING                       (◈) [img]   │
├──────────────────────────────────────────┤
│  real reviews · About · Contact · footer  │
└──────────────────────────────────────────┘
```

---

## Self-check

1. Would I land here again on a similar brief? No — Direction A only
   makes sense because this specific library is thin *and* the review
   record is unusually strong; a photo-rich client would never get the
   near-photo-less hero.
2. Structural difference: yes — different hero archetype, services
   layout, nav, and signature element in all three; only brand-primary
   green is shared (by intake confirmation, not laziness).
3. From the trade's world, not "modern website": yes — index list of
   four real services, a real before/after, a real coquí mark, real
   review text, no generic icon-card grid, no stock photography.
4. One signature element per direction, everything else disciplined:
   yes — the review stat (A), the slider (B), the coquí motif (C).
5. What to remove: Direction C's accent-warm risks becoming a second
   competing accent if used too widely — restricted to motif fills and
   dividers only, never body text or large fills.

APPROVED: Direction D — "Sea to Sea, Trimmed Right" — approved as designed, confirmed against the live mockup (before/after slider with coquí-mark handle/watermark, alternating photo service rows, centered-logo nav, forest palette).
