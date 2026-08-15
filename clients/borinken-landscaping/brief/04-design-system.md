# Design System — Borinken Landscaping

Implements Direction D ("Sea to Sea, Trimmed Right"), approved in
`brief/02-design-directions.md`. Token layer lives in
`site/src/styles/tokens.css`; this doc explains the choices.

## Color

All values re-derived through `scripts/derive-tokens.py` (not hand-picked)
against the confirmed brand green and Direction D's forest surfaces, so
every pairing below is a checked AA ratio, not an eyeballed guess.

| Token | Value | Role |
|---|---|---|
| `brand-primary` | `#53FF0B` | Confirmed by operator — CTAs, links, icons |
| `brand-secondary` | `#39C000` | Hover/pressed states on brand-primary elements |
| `brand-accent` | `#95FF68` | Lighter brand tint — rarely used, secondary emphasis |
| `accent-warm` | `#E8A33D` | Direction D's motif accent, pulled from real flowers/mulch in the client's photos. Motif fills and dividers only (coquí mark, section rules) — never body text or large fills |
| `text-primary` | `#F3F5EE` | Real body/heading text. 15.3:1 on surface |
| `text-inverse` | `#14201A` | Text placed ON brand-primary (buttons, badges) — deliberately dark, not white, because brand-primary is bright. 12.5:1 |
| `text-muted` | `#B0B5AE` | Captions, review bylines, secondary copy. 8.1:1 on surface |
| `border` | `#687C63` | Real functional borders — form inputs, nav dividers. 3.7:1 / 3.2:1 (meets the 3:1 UI-component minimum on both surfaces) |
| `surface` | `#14201A` | Page background |
| `surface-alt` | `#1E2E24` | Raised panels — cards, mega-menu, dialogs |
| `neutral-50` / `neutral-900` | derived | Scheme-safe "light ink" / "dark ink" pair — footer-style dark-bg-light-text combos only |

**Fixed during this build, not just for this client:** `_template/` had a
latent bug where `text-neutral-900` (used for default body text) silently
resolves to the *same color as the background* on any dark-first theme,
and `CTAButton`'s primary variant hardcoded white text on `brand-primary`
regardless of how light that brand color is. Both are exactly what
produced the invisible-text problem seen on the first Vercel deploy.
Fixed at the template level (new `text-primary` / `text-inverse` / `border`
tokens, real usages swapped in `BaseLayout`, `CTAButton`, `Lightbox`,
form inputs, nav borders) so every future dark-first or bright-brand-color
client inherits the fix, not just this one.

## Type

| Role | Face | Notes |
|---|---|---|
| Display | **Fraunces**, variable, weight 300–900 | Warm slab-serif. Carries the "meticulous, does the extra 10%" read from the brand read, and sets the bilingual hero headline with more warmth than a grotesque would |
| Body | **Work Sans**, variable, weight 300–700 | Humanist sans, clean diacritics for the Spanish copy throughout |
| Utility | **IBM Plex Mono**, 400/500 | Stats ("5.0 ★ — 22 reviews"), phone number, review counts |

All three self-hosted as woff2 in `public/fonts/`, `font-display: swap`,
Fraunces preloaded in `BaseLayout` (it's above-the-fold in the hero
headline). No webfont CDN requests.

Scale (display sizes run larger than the template default — Fraunces
needs real presence over the before/after slider):

```
display-xl  3.5rem   hero headline
display-lg  2.5rem   section headings
display-md  1.75rem  card/subsection headings
display-sm  1.375rem small headings, form panel titles
body-lg     1.125rem intro paragraphs
body        1rem     default copy
utility     0.875rem labels, captions, form helper text
mono-lg     1.5rem   large stat display
mono        0.875rem inline stats, phone number
```

## Spacing, radii, motion

- Section rhythm: `5rem` standard, `8rem` for the largest breathers —
  unchanged from template default, Direction D didn't call for a
  different vertical rhythm.
- Radii tightened from the template default (`0.5rem` → `0.25rem` cards,
  `0.375rem` → `0.1875rem` buttons): Direction D is a grounded,
  utilitarian read (real trade, real work, Fraunces slab-serif) — soft
  SaaS-style rounding fought that, crisp corners support it.
- Motion: template defaults kept (`200ms` standard, `120ms` fast,
  standard ease curve) — nothing about this direction calls for different
  timing, and `prefers-reduced-motion` is already honored globally.

## The signature element, in tokens

The coquí/Taíno mark (traced SVG, `fill: currentColor`) isn't a color or
type choice — it's a component (`CoquiMark`, see `03-architecture.md`)
that inherits `text-primary` by default and switches to `brand-primary`
or `accent-warm` depending on placement (nav mark, slider handle, hero
watermark, service-row divider, footer mark). No new token needed for
it; it's pure `currentColor`.
