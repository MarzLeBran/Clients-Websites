# Design System — Clean Lab by EZ (Direction A: Precision Lab)

Token layer lives in `site/src/styles/tokens.css` as a Tailwind v4 `@theme` block — real values
below replace the `_template/` sentinel magenta placeholders. This is where `site/` starts
diverging from `_template/` on purpose; the generic template stays theme-agnostic for the next
client, this file is Clean Lab by EZ–specific.

**Naming note:** the client's site is dark-first (near-black base, light text), which inverts
the usual "neutral-50 = lightest" numeric convention from the `_template/` sentinel scale. Renamed
the placeholder tokens to explicit semantic names instead of forcing a numbered scale to lie
about which end is dark — `--color-text-primary` (light, for reading on dark) and
`--color-text-inverse` (dark, for reading on the orange accent), not `neutral-900`/`neutral-50`.

## Color

| Token | Value | Use | AA contrast (computed) |
|---|---|---|---|
| `--color-surface` | `#0B0B0D` | Page background | — |
| `--color-surface-raised` | `#1C1B1A` | Card/panel background | — |
| `--color-brand-primary` | `#F78C16` | Single electric accent — CTAs, links, price numerics | On surface: **8.16:1**. On surface-raised: **7.14:1** (pixel-sampled from the client's real logo files post-launch-review — the icon accent and the "by EZ" script agree exactly. Replaces the Stage 4 approximation `#F47920`; the real color is both more accurate *and* higher-contrast) |
| `--color-brand-secondary` | `#C06D11` | Hover/pressed states on brand-primary | decorative, not text-bearing |
| `--color-brand-accent` | `#FFC34D` | "Most Popular" badge glow only — the one extra warmth note | decorative |
| `--color-text-primary` | `#FFFFFF` | Body copy, headings | On surface: **19.66:1**. On surface-raised: **17.2:1** (also corrected from the logo sample — real logo uses pure white, not the warm cream `#F5F3EF` originally approximated) |
| `--color-text-inverse` | `#0B0B0D` | Text on brand-primary buttons | On brand-primary: **8.16:1** |
| `--color-text-muted` | `#B8B4AC` | Captions, utility labels, secondary text | On surface: **9.52:1** |
| `--color-border` | `#666B74` | Form input borders, real UI boundaries | On surface: **3.67:1**, on surface-raised: **3.21:1** (corrected post-Stage-6 — original `#5C6169` was only validated against `surface`, and failed at 2.76:1 against `surface-raised`, where it's actually used most) |
| `--color-divider` | `#2A2C30` | Decorative section dividers only | not relied on for a11y — never used for meaningful boundaries |

One real correction made here versus the Stage 2 sketch: the direction doc estimated the
divider/border gray at `#3A3D42`. Computed against the real `#0B0B0D` surface, that value only
clears **1.80:1** — well under WCAG's 3:1 minimum for perceivable UI boundaries. Lightened the
color actually used for functional borders (form inputs) to `#5C6169` (3.16:1) and kept the
darker `#3A3D42`-family tone (`#2A2C30`) only for decorative dividers that carry no meaning if
invisible. Caught and fixed here, not at Stage 6.

## Type

Self-hosted via `@fontsource` (no external font requests, no layout shift from a CDN):
- **Display** — Space Grotesk (700 for headlines, 500 for card titles) — geometric, technical
- **Body** — Inter (400 body, 500 for emphasis)
- **Utility/numerics** — JetBrains Mono (500) — every price, every spec number

Display face (`Space Grotesk`, 700) is preloaded; body and mono load with `font-display: swap`.

| Token | Size | Line-height | Use |
|---|---|---|---|
| `--text-display-xl` | 3.5rem (56px) | 1.05 | Hero headline |
| `--text-display-lg` | 2.5rem (40px) | 1.1 | Section headings |
| `--text-display-md` | 1.75rem (28px) | 1.2 | Card/subsection headings |
| `--text-display-sm` | 1.25rem (20px) | 1.3 | Small display use |
| `--text-body-lg` | 1.125rem (18px) | 1.6 | Lead paragraphs |
| `--text-body` | 1rem (16px) | 1.6 | Body copy |
| `--text-utility` | 0.875rem (14px) | 1.4 | Labels, captions, nav |
| `--text-mono-lg` | 1.5rem (24px) | 1.2 | The price-selector's live price |
| `--text-mono` | 1rem (16px) | 1.4 | Inline numerics (tier card prices) |

## Spacing, radii, shadow, motion

- `--spacing-section` / `--spacing-section-lg`: 5rem / 8rem (mobile / desktop vertical rhythm)
- `--radius-card`: 0.75rem — slightly more rounded than a sharp technical UI might suggest,
  deliberately, so the "lab" concept doesn't read cold/clinical
- `--radius-button`: 0.5rem
- `--radius-badge`: 999px — the "Most Popular" pill
- `--shadow-card`: `0 4px 24px rgb(0 0 0 / 0.5), 0 0 0 1px rgb(255 255 255 / 0.04)` — a depth
  shadow plus a hairline inner highlight, since a plain dark shadow barely reads against an
  already-near-black page
- `--ease-standard` / `--duration-standard` / `--duration-fast`: `cubic-bezier(0.4,0,0.2,1)` /
  200ms / 120ms — the price selector uses the fast timing, everything else uses standard

## Rule enforced from here forward

No raw hex in any component from this point on — every color in every `.astro` file must
reference one of the tokens above by name.
