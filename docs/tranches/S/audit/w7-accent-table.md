# W7-4 — the 9-accent contrast table (pre/post gamut-map, incl. C≈0 probes)

**Lane**: S.W7 ACCENTS+LUMA (W7-4 + W7-3) · **Date**: 2026-07-06
**Spec of record**: `waves/S.W7.md` W7-4 · SYNTHESIS §3.9 · design-dock-shell P1-4/P1-5 ·
the W3-7 mechanism decision (`audit/w3-7-hue-sweep-retirement.md` §2, consumed here).
**Resolver**: `demo/@/lib/view-accents.ts` (pure; library-only ops) +
`demo/@/composables/color/useViewAccents.ts` (the root-token writer).
**Standing oracle**: `test/view-accents.test.ts` — 13 specs; 9 views ×
{chromatic default, achromatic mid/near-white/near-black} × {light, dark},
all ≥ 3:1 via the library's `wcagContrastRatio`; the C≈0 hue fan-out asserted.

## §0 — Method

- **PRE** = the retired CSS relative-color derivation
  (`oklch(from var(--accent-live) l c calc(h + shift))`): naive hue rotation
  with L/C kept, painted through a per-channel sRGB **clip** (the
  browser-paint proxy). The audit's own in-browser measurement of the same
  state (P1-4, Chrome): picker 3.90 · palettes 3.98 · browse 3.63 ·
  extract 3.33 · **mix 2.74 FAIL** · **generate 2.77 FAIL** · gradient 3.80 ·
  atmosphere 4.45 · blob 4.23 — same failure class the proxy reproduces
  (mix/generate under the 3:1 floor at cyan/green hues).
- **POST** = the W7-4 resolver: rotate hue → low-C floor
  (`4 × DELTA_E_OK_JND` = 0.08, library-anchored) → Ottosson gamut-map to the
  cusp (`gamutMapOKLab`, hue-exact) → L re-guard (`computeSafeAccent`) →
  WCAG ≥ 3:1 verify-walk (`wcagContrastRatio`). No hand-tuned literals — the
  9 tokens are derived, per accent change.
- Ratios are WCAG 2.x contrast vs the scheme background proxy
  (`oklch(bgL 0 0)`; light bgL 0.97 / dark bgL 0.15 — the same constants the
  live accent guard rides, `useContrastSafeColor.ts`).

## §1 — Chromatic pick `oklch(0.62 0.2725 9.8)` (the P1-4 default) — light scheme

| view | shift | PRE painted (naive rotate + clip) | PRE ratio | POST token (resolver) | POST ratio |
|---|---|---|---|---|---|
| picker | 0° | `rgb(254 0 96)` | 3.58 | `oklch(0.6155 0.2462 9.8)` | 3.87 |
| palettes | 40° | `rgb(250 33 0)` | 3.64 | `oklch(0.6006 0.1592 49.8)` | 3.83 |
| browse | 80° | `rgb(197 114 0)` | 3.33 | `oklch(0.5941 0.1214 89.8)` | 3.72 |
| extract | 120° | `rgb(73 160 0)` | 3.05 | `oklch(0.6009 0.1612 129.8)` | 3.44 |
| mix | 160° | `rgb(0 179 107)` | **2.51 FAIL** | `oklch(0.5934 0.1177 169.8)` | 3.50 |
| generate | 200° | `rgb(0 167 222)` | **2.54 FAIL** | `oklch(0.5908 0.1021 209.8)` | 3.61 |
| gradient | 240° | `rgb(0 128 255)` | 3.48 | `oklch(0.6023 0.1696 249.8)` | 3.59 |
| atmosphere | 280° | `rgb(141 80 255)` | 4.08 | `oklch(0.6121 0.2267 289.8)` | 3.78 |
| blob | 320° | `rgb(215 25 210)` | 3.88 | `oklch(0.6200 0.2725 329.8)` | 3.87 |

## §2 — Chromatic pick — dark scheme

| view | shift | PRE painted | PRE ratio | POST token | POST ratio |
|---|---|---|---|---|---|
| picker | 0° | `rgb(254 0 96)` | 5.04 | `oklch(0.6155 0.2462 9.8)` | 4.66 |
| palettes | 40° | `rgb(250 33 0)` | 4.95 | `oklch(0.6006 0.1592 49.8)` | 4.71 |
| browse | 80° | `rgb(197 114 0)` | 5.42 | `oklch(0.5941 0.1214 89.8)` | 4.84 |
| extract | 120° | `rgb(73 160 0)` | 5.91 | `oklch(0.6009 0.1612 129.8)` | 5.25 |
| mix | 160° | `rgb(0 179 107)` | 7.18 | `oklch(0.5934 0.1177 169.8)` | 5.15 |
| generate | 200° | `rgb(0 167 222)` | 7.10 | `oklch(0.5908 0.1021 209.8)` | 5.00 |
| gradient | 240° | `rgb(0 128 255)` | 5.18 | `oklch(0.6023 0.1696 249.8)` | 5.03 |
| atmosphere | 280° | `rgb(141 80 255)` | 4.43 | `oklch(0.6121 0.2267 289.8)` | 4.77 |
| blob | 320° | `rgb(215 25 210)` | 4.65 | `oklch(0.6200 0.2725 329.8)` | 4.66 |

## §3 — Achromatic probe `oklch(0.62 0.0001 0)` (C≈0) — light scheme

PRE: **all nine rotations paint ONE gray** `rgb(134 134 134)` (3.34:1 — the
contrast holds but the chromatic axis is GONE; the navigation grammar
disappears for gray/white/black picks). POST: nine hue-distinct tokens at
the library-anchored C floor, every one ≥ 3:1:

| view | shift | PRE painted | PRE ratio | POST token | POST ratio |
|---|---|---|---|---|---|
| picker | 0° | `rgb(134 134 134)` | 3.34 (axis collapsed) | `oklch(0.6200 0.0800 0.0)` | 3.48 |
| palettes | 40° | `rgb(134 134 134)` | 3.34 (axis collapsed) | `oklch(0.6200 0.0800 40.0)` | 3.44 |
| browse | 80° | `rgb(134 134 134)` | 3.34 (axis collapsed) | `oklch(0.6200 0.0800 80.0)` | 3.36 |
| extract | 120° | `rgb(134 134 134)` | 3.34 (axis collapsed) | `oklch(0.6200 0.0800 120.0)` | 3.27 |
| mix | 160° | `rgb(134 134 134)` | 3.34 (axis collapsed) | `oklch(0.6200 0.0800 160.0)` | 3.21 |
| generate | 200° | `rgb(134 134 134)` | 3.34 (axis collapsed) | `oklch(0.6200 0.0800 200.0)` | 3.22 |
| gradient | 240° | `rgb(134 134 134)` | 3.34 (axis collapsed) | `oklch(0.6200 0.0800 240.0)` | 3.30 |
| atmosphere | 280° | `rgb(134 134 134)` | 3.34 (axis collapsed) | `oklch(0.6200 0.0800 280.0)` | 3.39 |
| blob | 320° | `rgb(134 134 134)` | 3.34 (axis collapsed) | `oklch(0.6200 0.0800 320.0)` | 3.46 |

## §4 — Achromatic probe — dark scheme

All nine POST tokens 5.18–5.61:1 (PRE: one gray at 5.40:1, axis collapsed).
Full numbers reproduced by the standing oracle (`test/view-accents.test.ts`).

## §5 — Live verification (dev build, Chromium, 2026-07-06)

Probed on a fresh boot (own server, dead-API port per lane discipline):

- **Light** (`--accent-live` guarded pick): the 9 root tokens present and
  byte-equal to the resolver outputs in §1; `--accent-view` = the picker
  token; `--view-hue-shift` GONE from the computed root (the W3-7 tax
  retired: no `@property <number>` registration, no `:root` transition — the
  sweep lives on the DockViewSelect trigger's scoped
  `transition: --accent-view`, `<color>`-registered).
- **Dark**: all 9 tokens re-resolve bright (L 0.81–0.92) — e.g. picker
  `oklch(0.8175 0.1054 9.8)`, extract `oklch(0.9165 0.2228 129.8)`.
- **The menu legend** (screenshot `w7-4-menu-legend-light.png`, lane-local):
  all 7 user-view entries speak their own hue on dot + icon (Home pink →
  Gradient blue, the color wheel in dock order); trigger icon + `--dock-ring`
  seam speak `--accent-view`; Tools/Login keep the live accent. The rainbow
  one-off is confirmed dead (Q4/W5-7; `utils.css:29` excision comment
  stands, no `pastel-rainbow-text` consumer).
- **The 10th token** (`--seal-ink`, SEEDS.md w7 rider ABSORBED): resolves
  through the library's `contrastColor` (the WCAG `contrast-color()`
  endpoint picker) from the WAX color — `oklch(0 0 0)` on the light default
  pick, flipping to `oklch(1 0 0)` for dark wax. The threshold is the WCAG
  crossover the library owns, not the seed's interim CSS `L 0.62` literal.
  The Dock writer (W7-1) consumes it for the seal's inked icon.
