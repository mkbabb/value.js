# R.W3 Lane B — gamut-truth overlay: browser-verified evidence (2026-07-03)

Captures from the built demo (Vite dev @ localhost:9000, Chromium, dpr 2).

| Capture | State | What it proves |
|---|---|---|
| `red-flood-viewport-light.png` | h=0 (red), light, p3 lens | first-paint contour + caption on the default lens; hatch floods the top edge (tip s≈0.27 — matches the locked golden `oogTopFrac 0.729`) |
| `red-flood-plate-light.png` | h=0, light | contour hairline, dual-ink hatch, tip crosshair datum, caption `GAMUT LENS — DISPLAY-P3 / SRGB · CUSP L 0.628 C 0.258` (the true sRGB red cusp) |
| `red-flood-plate-dark.png` | h=0, dark | scheme flip re-probes tokens; ink/paper voices swap, regime flip location unchanged (shared `spectrumLuma`) |
| `blue-sliver-plate-p3.png` | h=240 (blue), p3 lens | the post-α truth: display-p3/240 is a 7-point sub-perceptual sliver (95 painted px), not count=0 — honest, per `test/gamut-boundary.test.ts` goldens |
| `clear-plate-a98.png` | blue, a98-rgb selected | **B5 keyed override live** (caption re-names `A98-RGB / SRGB`) + **count=0 rider**: 0 painted canvas px (no phantom stroke, no NaN sentinel), caption `A98 Δ < JND — PLATE CLEAR` |
| `detent-hold-p3.png` | h=0, mid-drag | **B4**: dot pinned ON the contour, `p3 ⊣` chip below the cursor |

## Detent probe (scripted 1px/step outbound drag, s=0.6, red)

Dot tracked 1:1 for 21 steps, then held at the contour (`top 3.80554%`)
with the `p3 ⊣` label for ~6px of further travel before release; model held
with it (release color = the contour color). Clear plate (a98/blue): the same
drag produced **no** label. Fast flick (single large move event): no snag.

## Perf sample (budget < 2 ms/frame)

- Hue-slider continuous drag (warm ink cache, the rAF path):
  **mean 0.75 ms · max 0.9 ms** per draw (sample + full canvas paint).
- Keyboard hue steps, isolated frames: 0.8–1.2 ms.
- Theme flip (cold probe + full-page recalc, one-off): 6–10 ms — not a
  per-frame path; the ink probe is cached per scheme.
- Instrumentation: `performance.measure("gamut-overlay-draw")`, cleared per
  draw; also surfaced as the `gamut.drawMs` pointer-debug gauge.

Fix recorded during measurement: the draw path initially read
`getBoundingClientRect` per paint — a forced reflow during slider drags
(13 ms observed). Host size now rides the ResizeObserver cache; the read is
gone from the frame path.
