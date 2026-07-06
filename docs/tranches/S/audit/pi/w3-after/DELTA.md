# S.W3 — π motion AFTER (the paired other-half of `w3-before/`) + DELTA

**Captured at**: `tranche-q` @ `7819526` (ALL S.W3 units landed) on the BUILT
`gh-pages` bundle, served static on :4185 (free port; the owner dev server never
touched). Same harness (`pi-motion.mjs`), viewport (1280×800), scheme (dark),
and absolute-time frame cadence as `w3-before/` — so the two series line up
frame-for-frame. Videos (`.webm`) committed; PNG frame series self-ignores
(`.gitignore *.png`, the R convention) — regenerate with the Reproduce block in
`../README.md`.

The quantitative half of this wave's frame budgets lives in
`../../w3-frame-budget-measure.md` (the built-bundle §6.2 gate table); this file
is the VISUAL record of the same three retuned families.

---

## drag — the colour fan-out under an L-channel scrub

- **BEFORE** (`w3-before/drag`): the §6.2 slider-drag p50 **49.8 ms** family
  (~20 fps, 31/44 janked) — the scrub drove the full fan-out (spectrum + four
  channel tracks + numeric readout + aurora seed + blob palette) every step,
  uncoalesced.
- **AFTER**: W3-1 rAF-coalesces the colour → atmosphere fan-out (one derive per
  frame, last-colour-wins). Built-bundle measure (real GPU): **p50 8.4 ms, 0
  long tasks > 50 ms** — vsync-locked, zero jank (`w3-frame-budget-measure.md`
  §1). The frame series shows the readout + tracks tracking the thumb smoothly
  rather than the before's stepped catch-up.

## view-switch — the pane-swap spring (Picker → Gradient)

- **BEFORE** (`w3-before/view-switch`): §6.2 first post-click frame **254.7 ms**,
  a 183 ms long task, a 0.45 s spring.
- **AFTER**: W3-4 defers the heavy in-pane mount one frame past enter (the first
  post-click frame paints only the container slide) + W3-5 retunes the view-swap
  spring 0.45 → 0.3 s. Built-bundle measure (real GPU): **first post-click frame
  8.3 ms, long task 0 ms** (§6.2 ≤100/≤50 both MET). The `swap-tNNN` series
  settles by ~t300 (the 0.3 s spring) versus the before's ~t450+ tail.

## mix — the Q10 first-principles convergence (the headline)

- **BEFORE** (`w3-before/mix`): the pour completed but was **subtle** — the
  mid-`pour` frames showed the mix UI merely *dimmed* under the animation canvas,
  no legible convergence, total **≤ 2.9 s** with mid-growth jump-cuts.
- **AFTER** — the REPLACED choreography (W3-6 / Q10 first-principles re-work),
  legible across the `pour-tNNNN` series:
  - **t ≈ 6 ms** — the destination is ANNOUNCED: the RESULT plate mounts the
    seeded WatercolorDot **ghost well** (`[data-mix-target]`), the anchor the
    convergence lands on (visible at `frame-07-pour-t0400`: the dashed-outline
    ghost dot in the RESULT box).
  - **t ≈ 850 ms** — the well is dissolving as the merged pool settles
    (`frame-09-pour-t0850`), the convergence landing AT the plate.
  - **t ≈ 1.13 s** — the result **inks in**: a solid mixed swatch +
    `oklab(0.9532 0.2685 0.0465 / 1)` + the copy/save/reset row
    (`frame-15-settled`). **≤ 1.2 s** (measured 1.13 s reveal; the one clock is
    `MIX_CONVERGE_MS 900 ms` + `MIX_EPILOGUE_MS 300 ms`).
  - **0 spinner rows** across the whole series — the animation IS the progress
    (the `.animate-spin`/"Gathering…/Mixing…/Revealing…" grammar is retired).
  - **Safari-true by construction** — pure radial-gradient discs + source-over,
    no `ctx.filter`; verified on WebKit by `e2e/smoke/safari/mix-flow.spec.ts`.

  Net: the before's "dimmed UI under a canvas, 2.9 s, jump-cut" becomes an
  announced destination → a convergence that lands at the plate → an inked
  result, one clock, in ~1.13 s. This is the Q10 "the animation IS the progress,
  beauty is a GATE" re-work made visible.
