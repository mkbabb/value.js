# T lane — t-gradient-surfaces (T-6 + T-21)

**Lane**: design (Fable), gradient-page surfaces. **Rows**: T-6 (netting more visible)
+ T-21 (bugged-out surface + gradient bottom bar too short).
**Method**: owner shots re-read from disk (`t-2002-09.png`, `t-2009-29.png`, pixel-measured);
live probes on an isolated dev server (:9337, `VITE_API_URL=http://localhost:59999`) driven
by a private Playwright instance (1440×900, dpr 2, light + dark), computed styles cited;
probe shots + scripts in the session scratchpad (ephemeral — all load-bearing numbers are
inlined below). ZERO product-code changes.

**Shot↔finding re-derivation** (mandate map verified, one correction):

- `t-2002-09.png` is the **picker** — the readout numerals ("39.2%, 48.5, 42.2") over the
  spectrum plate's top edge, dark scheme, with the gamut hatch faintly visible bottom-frame.
  T-6's "gradient netting" therefore lands on the **shared register** (`@lib/gamut-ink` +
  the `--gamut-*` token home — ONE home, two consumers: picker spectrum overlay + gradient
  perceived-space plate), not on the gradient page alone. The recalibration is done ONCE.
- `t-2009-29.png` is the **gradient pane**, dark scheme, default seed, at the standard
  two-pane desktop layout (pane content 461 CSS px at dpr 2 — reproduced exactly on :9337
  at 1440×900). In frame: the perceived-space plate (the "bugged out" referent), the stop
  rail, and the rung row (the "bottom bar … too short" referent — see findings 5–6).

---

## Findings

### 1. T-6 — the netting register is under the visibility bar in BOTH schemes; the new intensity band (the token home, both schemes)

**Evidence**: the register lives in ONE home — `demo/@/styles/style.css:254-261`
(`--gamut-edge` 28% fg · `--gamut-hatch` ink **9%** fg · `--gamut-edge-paper` 50% bg ·
`--gamut-hatch-paper` **12%** bg; 5px+1px tile at 45°) + the canvas half
`demo/@/lib/gamut-ink.ts:29-36` (`WEBBING = { period: 6, angleDeg: 45, weight: 1 }`).
Measured hatch-line-vs-paper luma delta on the live plate (pure-hatch band, dpr 2):
**light 33/255 (≈13%), dark 23/255 (≈9%)** — sub-texture at arm's length; in light the
plate reads as plain cream. Owner shots agree: the hatch in `t-2002-09` and `t-2009-29`
is legible only at close crop. Judged amped candidates live (light + dark, screenshots):
ink 22% / paper 28% / edge 45% / stroke 1.25px yields deltas **59 light / 45 dark** —
reads as designed security-paper ribbing, field still dominant, beads still win.

**Root-cause**: the W5-8 register was calibrated to the prior "subtle" ruling
(`docs/tranches/S/audit/OWNER-RULING-2026-07-05-variance-webbing.md` §1.2); T-6 is an
explicit owner recalibration UP (mandate §3, T-6 vs W5-8).

**Owner**: demo (token home + `WEBBING` table; both consumers inherit).

**Cure direction (the new intensity band — spec, both schemes)**:

| knob | today | new band (center) |
|---|---|---|
| `--gamut-hatch` ink mix | 9% fg | **20–24% fg (22%)** |
| `--gamut-hatch-paper` mix | 12% bg | **26–30% bg (28%)** |
| `--gamut-edge` | 28% fg | **40–48% fg (45%)** |
| `--gamut-edge-paper` | 50% bg | **60–68% bg (65%)** |
| stroke weight (tile + `WEBBING.weight`) | 1px of 6px period | **1.25px of 6px** (CSS tile `4.75px → 6px`) |

- The CSS tile and `WEBBING` move in lockstep — they are two renderings of ONE register
  (the gamut-ink.ts:22 law); a drift between them is a defect, not a tuning.
- Dark already reads stronger than light at equal mix (light-dark ink over dark wash);
  if the dark arm overshoots at 22%, introduce ONE strength knob
  (`--gamut-ink-strength`: 22% light / 18% dark, `.dark` re-pin) rather than forking the
  gradient recipes — the band above is the judged envelope for both.
- The rail's iso-ΔE rung ink (`GradientStopEditor.vue:275`, `bg-muted-foreground/50`)
  is netting that today sits OUTSIDE the register — it joins the same ink axis (finding 6).

### 2. T-21(a) — the plate's default state reads bugged: a single-hue slice instrument displaying a hue-varying trajectory (three compounding defects)

**Evidence** (owner shot + live reproduction, pixel-identical): at the default seed
(`oklch(0.75 0.15 145) → oklch(0.65 0.18 265)`, `GradientVisualizer.vue:123`) the plate's
running hue is the ramp median **205°** (`usePerceivedRamp.ts:158-168`). At H 205° the
sRGB cusp is C≈0.145, so against the fixed axis `PLATE_C_MAX = 0.4`
(`perceivedSpacePaint.ts:37`) the in-gamut tongue occupies **~36% of the plate width /
~20% of its area** — the hero surface is ~⅔ permanent netting. Both default stops are
**in-sRGB at their own hues** (beads render the solid in-gamut voice,
`usePerceivedRamp.ts:110-113` judges membership at the point's own hue) yet plot deep
inside the 205° slice's hatch — solid "in-gamut" ink painted ON TOP of "out-of-gamut"
netting. The trajectory renders as a ~70px solid stub floating in the void. Live
select-probe confirms the instrument is coherent ONLY when pinned: selecting the green
stop flips the slice to `H 145°` and the bead lands on-field; selecting blue → `H 265°`
(labels read off the live DOM).

**Root-cause**: dimensionality — a 2-D single-hue L×C slice cannot carry a 3-D
hue-varying trajectory's gamut truth; the axis constant was sized for the blue cusp
(0.322/0.4 — the file's own "~80% of the plate width" comment holds only near h≈264,
its premise fails at the default view); the default seed (hue span 120°, median = the
sliver-tongue hue) maximizes the incoherence — it is the first thing every visitor sees.

**Owner**: demo (paint/instrument) + **src** (the geometry sampler — "the demo owns
PAINT, never math", perceivedSpacePaint.ts:10).

**Cure direction (gestalt — the hue-swept envelope instrument)**:

- **Library**: a hue-swept boundary sampler joins `@src/units/color/boundary` beside
  `sampleOKLChSliceBoundary` — per L row, the min/max in-gamut chroma across a hue
  interval (the ramp's swept hues), with the zero-alloc `Into` twin. Geometry stays
  library-owned; the demo never re-derives it.
- **Plate**: three truth regimes replace the binary mask — solid field where in-gamut at
  EVERY swept hue; full netting where out at every hue; a **half-voice netting band**
  (the register's paper ink alone) for the ambiguous belt. Each trajectory point keeps
  its own true `inSRGB` flag — field and ink can never contradict by construction.
  A single-hue ramp degenerates to today's exact slice; stop-selection still pins the
  slice to that stop's hue (the current behavior becomes the stated special case, label
  unchanged).
- **Axis**: cusp-adaptive — `C_max = k · max(cusp over swept hues)`, k ≈ 1.15, eased on
  change (no axis-snap during hue drags), quantized with hysteresis; the condition label
  states the axis (`oklch · H 205° · C ≤ 0.34`) per the instrument-states-its-conditions
  idiom. The netting margin becomes a designed constant fraction at every hue instead of
  a hue lottery.

### 3. T-21(a) rider — the field collides with the condition label at high-cusp hues

**Evidence**: live probe, stop selected at H 145° — the tongue tip runs UNDER the
"OKLCH · H 145°" glyphs (screenshot; tip x ≈ 0.267/0.4 of plate width reaches the
label's left edge at the 461px pane). At H 265° the tip stops just short.

**Root-cause**: the label (`PerceivedSpacePlate.vue:163-167`) has no reservation
against the field — the picker solved exactly this class with `readoutReservation.ts`.

**Owner**: demo. **Cure**: the plate adopts the same reservation law as the picker
readout (the label's box participates in the paint layout — field/hatch keep clear of
it, or the label carries the plate's paper as a backing chip). With the finding-2 axis
change the tip parks at a constant fraction, but the reservation must hold regardless —
the law, not the coincidence.

### 4. T-21(b) — the rail paints the RENDER string: any non-default direction/type compresses, rotates, reverses, or garbles the ramp ("not the proper length, too short" — the structural defect)

**Evidence** (computed styles, live): `GradientVisualizer.vue:158` hands the rail
`coalescedCSS` = `serializeCoalescedGradient(model)` — the render string INCLUDING
`type` + `direction` (`useGradientCSS.ts:190-214`); `GradientStopEditor.vue:171-177`
paints it raw. Probed: direction 30° → the rail's computed background is
`linear-gradient(30deg, …)`; on the 462×40 strip the gradient line is
|462·sin30°|+|40·cos30°| ≈ **266px — the ramp completes at ~57% of the rail** and runs
diagonal (screenshot: long flat terminal tail). Direction 270° → the ramp REVERSES
against the handles (green handle sits on blue paint). Type conic →
`conic-gradient(from 90deg, …)` — an angular sweep smeared through a 40px strip
(screenshot: bugged swirl); radial → a blob. Meanwhile the easing rows already do this
right: `serializeIntervalRamp` normalizes to `linear-gradient(90deg, …)`
(`useGradientCSS.ts:158-184`).

**Root-cause**: one surface serving two jobs. P2-16 dissolved the hero preview INTO the
rail ("the gradient itself renders on the editing rail" — PerceivedSpacePlate.vue:6-8),
but a horizontal strip cannot represent angled/radial/conic renders — so the rail is
wrong as an editor (axis breaks against handles/ghost/rungs) AND the page has no honest
render surface at all for direction/type.

**Owner**: demo.

**Cure direction (gestalt)**: split the two jobs along the existing one-sampling-law
seam. (i) The rail ALWAYS paints the rail-normalized projection —
`linear-gradient(90deg, <sampleCoalescedStops>)` (the `serializeIntervalRamp` precedent
generalized to a `serializeRailRamp(model)` in the same module) — so handles, add-ghost,
rungs, and ramp share one axis by construction, at every type/direction. (ii) The true
render (type + direction applied) gets its own honest surface: a compact live render
tile seated WITH the Type/Direction controls — the thing those controls change becomes
visible where they are (today the direction slider's only visible effect is corrupting
the rail). One sampling law feeds both; the render string remains the CSS-output truth.

### 5. T-21(b) — the ramp layer tiles under the rail's 1px border: mirrored terminal slivers (the shot-visible pixel defect)

**Evidence**: measured in the owner's `t-2009-29.png` at device-pixel precision — the
rail's leftmost column (x 39–41, on the GREEN end) paints the last stop's BLUE
(104,139,243); the rightmost (x 961–963, on the BLUE end) paints the first stop's GREEN
(133,197,125). Reproduced live and isolated: with a plain gray background the slivers
vanish — they track the gradient value. Computed stack: `glass-wash` carries a 1px
border + `backdrop-filter: blur(1px) saturate(1.4)`; the inline
`background: <ramp>, var(--alpha-checker)` layer resolves
`background-origin: padding-box` / `background-clip: border-box` / `repeat` — the ramp
TILES into the border ring, so each border column shows the OPPOSITE terminal's color,
and the 1px blur smears it to a visible 2–3px sliver.

**Root-cause**: consume-side layer-geometry — an editing surface stuffed into a glass
material's `background` shorthand without owning the origin/clip/repeat contract
(glass-wash itself is innocent; the same class of consume produced the R8-17 clipping
note already recorded at GradientStopEditor.vue:242-247).

**Owner**: demo.

**Cure direction**: folded into finding 4's rail primitive — the re-authored rail owns
its paint stack as a material contract: ramp layer `no-repeat`, origin/clip agreement
across the full border-box, alpha-checker ground beneath, glass grammar outside the
ramp's geometry. Silhouette and ramp agree to the pixel at both ends; no per-callsite
`background` shorthand assembly survives.

### 6. T-21(b) — the rung row reads as a truncated ruler (the shot-visible "too short")

**Evidence**: in `t-2009-29.png` the iso-ΔE rung ticks span x 125 → 920 (device) under a
rail spanning 39 → 963 — the row stops **~12.6% short on the left and ~7.4% short on the
right**; it is the bottom-most strip in the owner's frame and reads as a bar of improper
length. Live default reproduces the same extents. By construction rungs are interior
arc-length marks (`usePerceivedRamp.ts:174-203` — rung k at k·step of cumulative ΔE_OK;
the ends are not rungs), but nothing in the surface SAYS so.

**Root-cause**: an instrument without its grammar — a ruler-like strip whose termination
law is invisible, mapped to the same inset track as the handles
(`GradientStopEditor.vue:267-278`) so its asymmetric ends read as layout error rather
than perceptual truth.

**Owner**: demo.

**Cure direction**: give the rung row its instrument grammar — terminal caps at 0/100 in
a distinct voice (paper-weight end ticks, taller than rungs) so the row becomes a true
ruler with iso-ΔE interior rungs; OR fold the rungs INTO the rail surface as on-bar
netting (W5-8's own name for the idiom), dissolving the separate strip entirely. Either
way the rung ink joins the recalibrated gamut-ink register (finding 1) — one netting
voice across plate and rail, both schemes.

---

## Cross-references

- T-6 vs the W5-8 "subtle" register: an explicit owner recalibration UP (mandate §3);
  the §1.2b facility (tokens-of-one-home) is the vehicle — intensity moves, architecture
  stands.
- Findings 4+5+6 are one gestalt: the rail re-authored as a first-class instrument
  primitive (normalized projection + owned paint stack + ruler grammar). E-3 binds — no
  per-symptom patches.
- Finding 2's library sampler is an S.W1-6 sibling (boundary-api §2); the Into-twin
  discipline carries over.
- The picker's spectrum overlay (`color-picker/gamutOverlayPaint.ts`) inherits finding 1
  with zero further work (the one-home law); it must be in the judged set when the band
  lands.
