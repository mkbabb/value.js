# OWNER RULING — alpha-slider checkerboard (2026-07-05)

## §0 Verbatim owner text (wins)

> Further, the alpha slider should have a checkerboard effect with tiling to display those
> values--subtle and idiomatic.

## §1 Encoding

The idiomatic transparency checker: a small tiled checkerboard UNDER every alpha-carrying
track, so the gradient's transparent end actually reveals transparency instead of a flat
opaque wash. Bar: **subtle** (muted two-tone in the house neutrals, small tile ~8px, both
schemes — the checker is an instrument ground, not a pattern feature) and **idiomatic** (the
convention every serious color tool uses; ONE recipe, one home — no per-instance copies).

Surfaces: the picker's alpha `ComponentSliders` row (the primary site, per the owner's
screenshot lineage) + every other alpha-rendering ramp (gradient stop editor alpha, any
alpha swatch wells) — sweep and name them. The track gradient paints ABOVE the checker
(layered backgrounds), and the alpha gradient must actually ramp to transparent (verify the
current gradient string does — if it ramps to an opaque color, that is the second half of
the same defect).

Producer boundary: if glass-ui's slider/track already ships a checker seam, consume it; if
not, a layered `background` on the demo's track consumption is idiomatic consumer work (NOT
a slider fork); if the RIGHT home is the producer track, note it as an L6 rider for the W8
`/slider` consume — but land the demo recipe now (the ruling is immediate).

## §2 Implementation record

**Landed 2026-07-05 (alpha-checker lane, branch `tranche-q`). Browser-verified light + dark at alpha 1.0 / 0.5 / 0.1.**

### The recipe — ONE token, one home

`--alpha-checker` in `demo/@/styles/style.css` `:root` (the instrument-token
cluster, beside the `--gamut-hatch` pairs — same idiom, same neighborhood):

```css
--alpha-checker: repeating-conic-gradient(
        color-mix(in oklab, var(--foreground) 14%, var(--background)) 0% 25%,
        var(--background) 0% 50%
    ) left top / 16px 16px;
```

8px squares (16px tile), two-tone in the house neutrals. Both schemes hold by
construction — the tones mix from `--foreground`/`--background`, so dark gets a
dark-material checker (verified: no white flash; see the dark shots). The token
carries its own position/size, so it is a complete background LAYER: every
surface composes it via the `background` shorthand — `background: <ramp>,
var(--alpha-checker)` — checker UNDER, ramp ABOVE. No per-instance copies; no
`.dark` override needed.

### Surfaces covered (the sweep)

1. **Picker alpha slider** (`ComponentSliders.vue` `sliderVars()`) — the primary
   site. Pure producer-token feed: the alpha row's `--slider-track-bg` becomes
   the two-layer `linear-gradient(...), var(--alpha-checker)`; glass-ui's track
   paints `background: var(--slider-track-bg, …)` and the shorthand accepts the
   layered value. No producer override, no fork.
2. **Gradient stop editor bar** (`GradientStopEditor.vue`) — `coalescedCSS`
   composes over the checker; translucent stops read as transparency, not a
   wash over the pane glass.
3. **Gradient stop handles** (`GradientStopEditor.vue`) — each stop well paints
   `linear-gradient(c, c), var(--alpha-checker)` (the color must ride an image
   layer: `background-color` would sit UNDER `background-image`).
4. **Gradient preview** (`GradientVisualizer.vue`) — same compose; opaque
   gradients are byte-identical (checker fully covered).

Surveyed and EXCLUDED (no alpha affordance — opaque-idiom wells):
`MiniColorPicker` (hex-only), `PaletteColorStrip`/mix-result strips (palette
colors; no alpha affordance), `ColorNutritionLabel.colorLight` (an ink, not a
well). glass-ui (READ-ONLY survey): NO existing checker seam on slider/track —
nothing to consume; the demo-side layered feed is the idiomatic consumer move.

### The transparent-ramp verify (was the gradient honest?)

**The gradient was honest.** `useSliderGradients.computeSliderGradients()` steps
the alpha component 0→1 on the opaque clone; computed track background reads
`linear-gradient(to right, lab(92 88.8 20 / 0) 0%, … lab(92 88.8 20 / 1) 100%)`
— a true ramp to transparent. No second-half defect in the demo's stops.

**BUT the honest ramp was being painted over dishonestly** — the real found
defect: glass-ui's dist minification drops the UNPREFIXED `backdrop-filter:
none` from its own spectrum-range override (`Slider.vue` source declares both
legs; dist keeps only `-webkit-backdrop-filter: none`). Chromium does not
implement the `-webkit-` alias (computed reads empty), so the
`.glass-liquid-fill` register's `blur(8px) saturate(1.4) brightness(1.02)`
backdrop blur stayed LIVE on every spectrum range in Chrome — silently
liquefying the ramp (and flattening the new checker into a wash, which is how
it was caught). Cure: a byte-level RESTATEMENT of the producer's own source
rule in `style.css` (MARKER block, exact producer selector
`.glass-slider[data-variant="spectrum"] .slider-range`) — not a fork; retire
when the dist keeps the unprefixed leg.

### Verify results

- Eye (Chromium via Playwright, light + dark, alpha 1.0/0.5/0.1): transparent
  end reveals the checker crisply; opaque end fully covers it; the checker
  reads as quiet instrument ground at 14% foreground-mix. Gradient editor bar,
  handles, and preview verified with a 3-stop alpha gradient
  (`oklch(… / 0) → oklch(… / .5) → oklch(… / 1)`).
- Suites: `npm run lint` 0 · `npm run typecheck` 0 (lib + demo) ·
  `npx vitest run` 66 files / 2126 passed ·
  `npx playwright test --project=smoke --project=smoke-reactivity` 29 passed
  (slider-keyboard + spectrum-drag instant-update gates green over the changed
  alpha feed).

Screenshots: `docs/tranches/S/audit/lanes/assets/alpha-checker-verify/`
(`BEFORE-alpha-50-light.png` — the pre-change flat wash — vs the
`alpha-{100,50,10}-{light,dark}.png` matrix + the two gradient-editor shots).

### L6 rider

The RIGHT long-term home for the transparency ground is the PRODUCER track: a
`--slider-track-checker` (or `checker` boolean) seam on glass-ui's spectrum
slider, painted under `--slider-track-bg` — plus the dist minification defect
above (the dropped unprefixed `backdrop-filter: none`, a Chromium-visible
producer bug independent of this ruling). Both belong on the W8 `/slider`
consume letter; the demo's token feed and the MARKER restatement retire there.
