# R.W4 π close — per-page DELTA verdicts

Captured post-Lanes A–F (commits `4d8ad79..9675ef3`) against the BUILT demo
(`npm run gh-pages` → `vite preview :4184`), same harness/pages/viewports/modes
as `../baseline/` (36 shots: picker / browse / palettes / extract / gradient /
docs × 390×844 / 1280×800 / 1440×900 × light / dark). Baseline was captured at
wave open (2026-07-04T06:52, pre-Lane-A). The delta below is the CUMULATIVE
wave delta. Functional evidence rides `../probe-w4.mjs` (13/13 green on this
build) and the gate-(d) aria snapshots at `../a11y/{prewave,close}/`.

## picker (×6) — VERDICT: the keystone holds; the input becomes an instrument

- The R.W3 keystone surfaces (Fraunces wordmark, hero numbers, gamut truth
  line, cartoon shadow) render unchanged — consume-only respected; the
  `--card-edge`/depth/card-lock mints untouched.
- **F2**: the ColorSpaceSelector trigger's `fontFamily` style override is
  dead; the display face rides the CardHeader `font-display` surface + the
  cloned specimen-row class (pixel-stable vs baseline — the override was
  belt-and-braces).
- **E3 (T21)**: the mounted-but-`display:none` EditDrawer is gone from the
  tree (no visual delta by definition — dead UI removed).
- **E4 (Q10)**: the dock ColorInput's hover/focus card gains the Parse-Lab
  echo — the parsed structure line (space + per-channel Fira readout) and the
  typed gamut verdict in the plate-caption voice. Probe: `color(display-p3 0
  1 0)` reads `clips in srgb — Δ 0.142 ≈ 7.1× jnd`; `#808080` reads `in srgb
  — Δ < jnd`. The verdict runs the SAME `deltaEOK`/`gamutMapOKLab`/
  `DELTA_E_OK_JND` computation the R.W3 overlay draws — one truth, two
  surfaces. (A close-probe catch: the first cut computed on display-denorm
  OKLab — l as 0–100 — inflating Δ ~500×; fixed at `337f254` to map through
  `COLOR_SPACE_RANGES.oklab`'s raw number ranges.)

## gradient (×6) — VERDICT: the fork is dead; the picker is first-class

- **D2/F1**: the 66-LoC EasingSelector fork + its 30-sample SVG preview are
  DELETED; the easing area is a per-interval specimen-row accordion (Z2
  in-plate rows on `--card-edge` hairlines, Fira interval label + live
  re-parseable literal in the head) seating the glass-ui `<EasingPicker>`
  seeded `:preset="linear"` — draggable handles, travel-dot preview, copyable
  readout. Curve math is 100% value.js through the producer composable.
- **D5 (zero names drop)**: probe counts **24/24 presets** in the picker's
  menu (incl. `smooth-step-3` — the R.W1 exact row). The per-name numeric
  substitution record is `easing-disposition.md §1.4` (cited, not restated).
- **D6 (Q12 steps)**: the per-interval Curve/Steps toggle rides the picker's
  `mode` prop; probe: a `steps(4, end)` interval renders BANDED (28 duplicate
  adjacent stops in the coalesced output) and the output re-parses clean.
- **D3**: parsing a coalesced output re-seeds every interval `linear`
  (probe-verified), and the `easingEpoch` remount keeps the alive picker
  instances honest with the reset model — the drawn curve and the interval's
  live fn cannot disagree.
- **D4**: `resolveEasing` + `GRADIENT_EASING_NAMES` deleted (grep code-zero).

## extract (×6) — VERDICT: the quantizer's story is finally visible

- **E1 (T19)**: `population` now crosses the consumer boundary — the
  dominant hero (max-population from the RETURNED palette, chroma tiebreak,
  no second worker call) renders as a WatercolorDot + the audacious display
  stat (probe: **"70% of the image"** on a 70/20/10 synthetic) + oklch Fira
  numerals; the strip is population-proportional with an 8% floor (probe DOM
  widths `[56, 113, 395]` — non-equal, ordered by cluster).
- **E2 (T20)**: ONE workbench (`ExtractWorkbench` + `useExtractSession`)
  serves both shells; the pane gains the camera affordance (visible in the
  controls row), the dialog gains the eyedropper. The undeveloped-plate
  empty state (Lane A register) now serves both surfaces.

## browse / palettes (×12) — VERDICT: Lane A/B register, stable through E/F

- The Lane A depth grammar + shimmer bones + specimen-plate empty states and
  the Lane B three-family motion + per-view accent hold unchanged through the
  Lane D–F work (no regression vs the post-C state; the empty states read as
  invitations — `· empty plate ·` / `· signal lost ·` in the Fira caption
  voice with role=status).

## docs (×6) — VERDICT: the φ-ladder holds

- The Lane C sectional rhythm renders unchanged through D–F (no docs-region
  writes after `17383a6`).

## Gate evidence (this close)

- **(a)** transition families ≤3 — `../transition-inventory.md` (Lane B);
  Lane D–F added ZERO families (the workbench reuses `vj-enter`/`vj-morph`;
  the easing accordion is v-show + micro-interaction CSS, not a family).
- **(b)** both forks deleted — grep code-zero: `EasingSelector` (comment
  provenance only), no `fontFamily` at the ColorSpaceSelector trigger;
  gradient pane runs on `<EasingPicker>` (probe green).
- **(c)** `demo/` ≤400 LoC everywhere (excl. vendored ui/) — over-cap count
  **0** after the close carves (`App.vue` 403→306 via `useAtmosphere`;
  `ColorInput.vue` 406→374 via `ParseEchoReadout`). Top of table:
  SpectrumCanvas 392, Markdown 388, ColorInput 374, PaletteCard 372.
- **(d)** a11y parity — `../a11y/prewave/` (worktree @ `d465873`, dev) vs
  `../a11y/close/` (built): picker byte-identical; every other diff is
  additive (role=status empty states, the NAMED camera button, the easing
  accordion's `aria-expanded` head + pressed-state mode group + labeled
  canvas + named copy/travel buttons, richer plate captions). Keyboard
  reach: probe drives the interval head by focus, the dock path to the
  fused ColorInput by focus+Enter. **One producer blemish for the relay
  letter (R.W7 §8)**: the EasingPicker's preset SelectTrigger has no
  accessible name (`combobox: linear`, unnamed — producer-owned surface;
  the old fork's combobox was named "Easing function").
- **Riders**: 24/24 selectable · steps banded + round-trip · coalesced parse
  seeds linear — all probe-green (`../probe-w4.mjs`, 13/13).
- **Suites**: vitest 1998/1998 · playwright 38/38 · lint 0 · vue-tsc 0 ·
  boot-smoke --force PASS (cold).
