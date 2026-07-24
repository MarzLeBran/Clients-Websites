#!/usr/bin/env python3
"""Seed-color -> derived token palette. The demo accelerator.

Pixel-samples a logo for the brand's dominant accent color, takes a minimal
seed (surface, surface-raised, text-primary, border — plus brand-primary if
you don't trust the sampling), computes the rest of the palette
(secondary/accent/muted/divider/tints), verifies WCAG AA contrast on every
text-bearing pair, and surgically rewrites ONLY the --color-* values in an
existing tokens.css — type scale, spacing, and the utilities block are left
byte-for-byte untouched.

Usage:
  python3 scripts/derive-tokens.py \
    --logo clients/<slug>/assets/logo/logo.png \
    --tokens clients/<slug>/site/src/styles/tokens.css \
    [--scheme dark|light] [--brand-primary '#RRGGBB'] [--surface '#RRGGBB'] \
    [--surface-raised '#RRGGBB'] [--text-primary '#RRGGBB'] [--border '#RRGGBB'] \
    [--dry-run]

Exit codes: 0 = written (or dry-run) with all AA checks passing; 1 = a
contrast requirement could not be satisfied; 2 = bad input.
"""

import argparse
import colorsys
import re
import sys
from pathlib import Path

from PIL import Image


# ---------- color math -------------------------------------------------------

def hex_to_rgb(h: str) -> tuple[int, int, int]:
    h = h.strip().lstrip('#')
    if len(h) == 3:
        h = ''.join(c * 2 for c in h)
    if not re.fullmatch(r'[0-9a-fA-F]{6}', h):
        raise ValueError(f'not a hex color: #{h}')
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))  # type: ignore[return-value]


def rgb_to_hex(rgb: tuple[int, int, int]) -> str:
    return '#{:02X}{:02X}{:02X}'.format(*rgb)


def rel_luminance(rgb: tuple[int, int, int]) -> float:
    def chan(c: float) -> float:
        c /= 255
        return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4
    r, g, b = (chan(c) for c in rgb)
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def contrast(a: tuple[int, int, int], b: tuple[int, int, int]) -> float:
    la, lb = rel_luminance(a), rel_luminance(b)
    lighter, darker = max(la, lb), min(la, lb)
    return (lighter + 0.05) / (darker + 0.05)


def adjust_lightness(rgb: tuple[int, int, int], factor: float) -> tuple[int, int, int]:
    """factor > 1 lightens, < 1 darkens, in HLS space."""
    h, l, s = colorsys.rgb_to_hls(*(c / 255 for c in rgb))
    l = max(0.0, min(1.0, l * factor))
    return tuple(round(c * 255) for c in colorsys.hls_to_rgb(h, l, s))  # type: ignore[return-value]


def mix(a: tuple[int, int, int], b: tuple[int, int, int], t: float) -> tuple[int, int, int]:
    """t = 0 -> a, t = 1 -> b."""
    return tuple(round(a[i] + (b[i] - a[i]) * t) for i in range(3))  # type: ignore[return-value]


def ensure_contrast(fg, bg, minimum, lighten_toward):
    """Nudge fg's lightness until contrast(fg, bg) >= minimum (30 tries)."""
    out = fg
    for _ in range(30):
        if contrast(out, bg) >= minimum:
            return out
        out = adjust_lightness(out, 1.06 if lighten_toward == 'lighter' else 0.94)
    return None


# ---------- logo sampling ----------------------------------------------------

def sample_brand_color(logo_path: Path) -> tuple[int, int, int]:
    """Dominant saturated color: ignore transparent, near-black, near-white."""
    img = Image.open(logo_path).convert('RGBA')
    img.thumbnail((128, 128))
    buckets: dict[int, list[tuple[int, int, int]]] = {}
    for r, g, b, a in img.getdata():
        if a < 128:
            continue
        h, s, v = colorsys.rgb_to_hsv(r / 255, g / 255, b / 255)
        if s < 0.35 or v < 0.25 or v > 0.98:
            continue  # grays, blacks, whites — not the accent
        buckets.setdefault(int(h * 24), []).append((r, g, b))
    if not buckets:
        raise ValueError(
            f'{logo_path.name}: no saturated pixels found — pass --brand-primary explicitly'
        )
    best = max(buckets.values(), key=len)
    n = len(best)
    return (round(sum(p[0] for p in best) / n),
            round(sum(p[1] for p in best) / n),
            round(sum(p[2] for p in best) / n))


# ---------- palette derivation -----------------------------------------------

SCHEME_DEFAULTS = {
    'dark': {'surface': '#0E0E10', 'surface_raised': '#1B1B1E', 'text_primary': '#FFFFFF', 'border': '#666B74'},
    'light': {'surface': '#FFFFFF', 'surface_raised': '#F4F4F2', 'text_primary': '#141414', 'border': '#8A8F98'},
}


def derive(args) -> tuple[dict[str, str], list[str], list[str]]:
    defaults = SCHEME_DEFAULTS[args.scheme]
    surface = hex_to_rgb(args.surface or defaults['surface'])
    raised = hex_to_rgb(args.surface_raised or defaults['surface_raised'])
    text = hex_to_rgb(args.text_primary or defaults['text_primary'])
    border = hex_to_rgb(args.border or defaults['border'])
    primary = hex_to_rgb(args.brand_primary) if args.brand_primary else sample_brand_color(Path(args.logo))

    report: list[str] = []
    errors: list[str] = []

    # Brand accent must carry text/CTA duty on both surfaces at AA.
    for name, bg in (('surface', surface), ('surface-raised', raised)):
        fixed = ensure_contrast(primary, bg, 4.5, 'lighter' if args.scheme == 'dark' else 'darker')
        if fixed is None:
            errors.append(f'brand-primary cannot reach 4.5:1 on {name}')
        elif fixed != primary:
            report.append(f'brand-primary nudged {rgb_to_hex(primary)} -> {rgb_to_hex(fixed)} for AA on {name}')
            primary = fixed

    # Functional border: 3:1 (perceivable UI boundary) against BOTH surfaces —
    # the exact failure Stage 6 caught by hand on the first client.
    for name, bg in (('surface', surface), ('surface-raised', raised)):
        fixed = ensure_contrast(border, bg, 3.0, 'lighter' if args.scheme == 'dark' else 'darker')
        if fixed is None:
            errors.append(f'border cannot reach 3:1 on {name}')
        elif fixed != border:
            report.append(f'border nudged -> {rgb_to_hex(fixed)} for 3:1 on {name}')
            border = fixed

    secondary = adjust_lightness(primary, 0.72)
    accent = adjust_lightness(primary, 1.35)
    muted = mix(text, surface, 0.30)
    fixed_muted = ensure_contrast(muted, surface, 4.5, 'lighter' if args.scheme == 'dark' else 'darker')
    if fixed_muted is None:
        errors.append('text-muted cannot reach 4.5:1 on surface')
    else:
        muted = fixed_muted
    divider = mix(surface, text, 0.10)
    # Text on brand-primary buttons: pick whichever of surface/text passes better.
    inverse = surface if contrast(surface, primary) >= contrast(text, primary) else text
    if contrast(inverse, primary) < 4.5:
        errors.append('neither surface nor text-primary reads at 4.5:1 on brand-primary buttons')

    pr, pg, pb = primary
    is_dark = args.scheme == 'dark'
    line_base = '255 255 255' if is_dark else '20 20 20'

    values = {
        '--color-surface': rgb_to_hex(surface),
        '--color-surface-raised': rgb_to_hex(raised),
        '--color-surface-alt': rgb_to_hex(raised),
        '--color-brand-primary': rgb_to_hex(primary),
        '--color-brand-secondary': rgb_to_hex(secondary),
        '--color-brand-accent': rgb_to_hex(accent),
        '--color-text-primary': rgb_to_hex(text),
        '--color-text-inverse': rgb_to_hex(inverse),
        '--color-text-muted': rgb_to_hex(muted),
        '--color-border': rgb_to_hex(border),
        '--color-divider': rgb_to_hex(divider),
        '--color-neutral-50': rgb_to_hex(text if is_dark else surface),
        '--color-neutral-100': rgb_to_hex(divider),
        '--color-neutral-900': rgb_to_hex(surface if is_dark else text),
        '--color-line': f'rgb({line_base} / 0.09)',
        '--color-line-strong': f'rgb({line_base} / 0.16)',
        '--color-brand-tint': f'rgb({pr} {pg} {pb} / 0.14)',
        '--color-brand-glow': f'rgb({pr} {pg} {pb} / 0.45)',
    }

    report.append(f'brand-primary {rgb_to_hex(primary)}: '
                  f'{contrast(primary, surface):.2f}:1 on surface, '
                  f'{contrast(primary, raised):.2f}:1 on surface-raised')
    report.append(f'text-primary: {contrast(text, surface):.2f}:1 on surface')
    report.append(f'text-muted {rgb_to_hex(muted)}: {contrast(muted, surface):.2f}:1 on surface')
    report.append(f'border {rgb_to_hex(border)}: {contrast(border, surface):.2f}:1 / '
                  f'{contrast(border, raised):.2f}:1')
    report.append(f'text-inverse on brand-primary: {contrast(inverse, primary):.2f}:1')
    return values, report, errors


# ---------- tokens.css rewrite -----------------------------------------------

def rewrite_tokens(css: str, values: dict[str, str]) -> tuple[str, list[str]]:
    """Replace only the value of each known --color-* declaration in place."""
    applied: list[str] = []

    def sub(match: re.Match) -> str:
        key = match.group(1)
        if key in values:
            applied.append(key)
            return f'{key}:{match.group(2)}{values[key]};'
        return match.group(0)

    out = re.sub(r'(--color-[a-z0-9-]+):(\s*)([^;]+);', sub, css)
    return out, applied


def main() -> int:
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument('--logo', help='logo image to sample for brand-primary')
    p.add_argument('--tokens', required=True, help='tokens.css to rewrite in place')
    p.add_argument('--scheme', choices=['dark', 'light'], default='dark')
    p.add_argument('--brand-primary')
    p.add_argument('--surface')
    p.add_argument('--surface-raised', dest='surface_raised')
    p.add_argument('--text-primary', dest='text_primary')
    p.add_argument('--border')
    p.add_argument('--dry-run', action='store_true')
    args = p.parse_args()

    if not args.logo and not args.brand_primary:
        print('error: pass --logo to sample or --brand-primary explicitly', file=sys.stderr)
        return 2

    tokens_path = Path(args.tokens)
    if not tokens_path.is_file():
        print(f'error: {tokens_path} not found', file=sys.stderr)
        return 2

    try:
        values, report, errors = derive(args)
    except (ValueError, FileNotFoundError) as e:
        print(f'error: {e}', file=sys.stderr)
        return 2

    for line in report:
        print(f'  {line}')
    if errors:
        for e in errors:
            print(f'  FAIL {e}', file=sys.stderr)
        print('contrast requirements not satisfiable from this seed — adjust and rerun', file=sys.stderr)
        return 1

    out, applied = rewrite_tokens(tokens_path.read_text(), values)
    print(f'  {len(applied)} token(s) matched in {tokens_path}')
    if args.dry_run:
        for key in applied:
            print(f'    {key}: {values[key]}')
        print('dry run — nothing written')
        return 0
    tokens_path.write_text(out)
    print(f'wrote {tokens_path}')
    return 0


if __name__ == '__main__':
    sys.exit(main())
