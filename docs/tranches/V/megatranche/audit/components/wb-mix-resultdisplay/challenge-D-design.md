# CHALLENGE-D — `demo/workbenches/mix/MixResultDisplay.vue` — the design is wrong (run 6)

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]` (1M context), the tier this
seat was spawned with. The declaration is explicit, not inherited.

- Run 6 · 2026-07-29 · branch `tranche-u` @ `c654824e`
- Runs 1–5 preserved verbatim at `challenge-D-design.r1-prior.md` … `.r5-prior.md` (findings
  D-1…D-44, corrections C-1…C-4, promotions P-1…P-5).
- Writes confined to `docs/tranches/V/megatranche/audit/components/wb-mix-resultdisplay/`. No
  `src/`, `demo/`, `api/`, `test/`, `e2e/`, `docs/tranches/V/vnext/**`, `scripts/dev/dev.sh` or any
  `INBOX.md` touched. No source edits land from this seat.

---

## 0. Verdict

**DEFECTIVE** — concurring with runs 1–5.

**Method.** I probed **cold**: I read the component, the four canon documents
(`VISUAL-CONSTITUTION.md`, `OPTICAL-BENCH-COMPOSITIONS.md`, `PROPORTION-AUDIT.md`,
`PALETTE-CONTRACT.md`), the producer contracts in `node_modules/@mkbabb/glass-ui/dist`, and the
four `audit/visual/shots/*/mix.png` captures, and took every measurement below on the live dev server
at `http://localhost:9000`, **before opening any prior run**. I reconciled afterwards. Every number
in §2 is therefore an independent reproduction, not a re-reading.

**Result of that reconciliation.** Fifteen prior measurements reproduce exactly or within noise.
This run's contribution is **four new findings, D-45…D-48**, plus one reproduction that lands on a
different arm than the prior that established it.

* **Strongest defect this run: D-45 (MAJOR).** The result region is rendered **after** the
  method/commit region. `OPTICAL-BENCH-COMPOSITIONS.md §3` decides the Mix sequence as *"source
  mode/rack; **result**; method/provenance/commit"* and `VISUAL-CONSTITUTION.md §3.1` repeats it
  (*"operand rack, result, controls"*). Measured render order at 390 is rack → **method/commit** →
  result, with the plate sitting **126 px below the `Mix` button that produced it**. Five runs quoted
  that sequence line in support of the provenance finding; none of them checked whether the sequence
  itself holds. It does not, and because this pane is a single column at every width, the decided
  *mobile* sequence is also the *desktop* one.
* **D-46 (MAJOR)** measures the ordinary dark scheme, which no prior did. Run 3's D-27 proved the
  plate has no boundary in *forced colors*; the plate also has effectively none in **plain dark
  mode** — plate background `rgb(66,55,47)` against host card `rgb(59,51,45)` = **1.07 : 1**. The
  one device by which this component declares itself a region is imperceptible in a fully supported
  scheme.
* **D-47 (MAJOR)** sharpens run 5's D-38 from an *overflow* claim to an *ordinal-correspondence*
  claim: at the domain's own stated ceiling of 12 colours the swatch rack wraps to two rows while
  the gradient strip stays one, so the two depictions of the same order stop agreeing — before any
  overflow occurs.
* **D-48 (MINOR)** is a purely visual judgement no measurement produces: at `w-10 h-10` in a
  six-column grid the WatercolorDot stops reading as a WatercolorDot.

---

## 1. Reaching the component at all

Driving the populated states required going around the UI. `MixSourceSelector.vue:164` still writes
`<WatercolorDot tag="button" aria-label="Add current color to the mix" @click="addCurrentColor">`.
Under glass-ui 7 the P051 cut removed the interactive host. Measured:

```html
<span data-v-292b9032 data-v-a3e86846 aria-hidden="true"
      class="add-slot-ghost w-11 h-11 sm:w-12 sm:h-12 … watercolor-swatch"
      data-variant="ghost"
      style="… pointer-events: none; …">
```

`document.querySelectorAll('main button')` on `/#/mix` returns 11 buttons; none is the add slot.
`VISUAL-CONSTITUTION.md §4.2`: *"V **abrogates a selection outline and interactive host on
`WatercolorDot`**. P051 removes the public `tag="button"`/interactive-host branch in the clean
major"* — and names Mix in the execute list. The consumer was never migrated.

This is `MixSourceSelector`'s defect, and run 3's C-3 already established a *returning-user* path
into the populated state, so I do not re-file it. I record the mechanism because it is why I reached
the states by walking `__vueParentComponent` to `MixPane` and calling
`mss.vnode.props.onAddColor(…)` / `mp.exposed.startMix()` / setting `mp.setupState.mixResult`, and
because it remains the reason no frame of this component exists in any of the 60 mega-tranche
captures.

Frames captured this run, in `frames/`:
`mix-result-populated-1440.png`, `mix-plate-palette-390-light.png`, `mix-plate-palette12-390-dark.png`.

---

## 2. Independent reproduction of the prior findings

Cold probes, this run's numbers, against what runs 1–5 recorded.

| prior | what I measured, independently | status |
|---|---|---|
| r1 **D-2** palette result carries no readable truth | `plate.innerText === "RESULT"` for a 7-colour and a 12-colour result; `plate.querySelector('.text-mono-small') === null`; all faces `aria-hidden:"true"`, `pointer-events:"none"`, `title: null` (the consumer's `:title="color.css"` at :103 never reaches the DOM) | **exact** |
| r1 **D-3** / r5 **D-40** the swap is a collapse-and-reopen | rAF sampling of a real `mixing → done` settle: `h=115.1 (t=10ms) → 118.7 (t=43) → 158.7 (t=645)` — **+40.0 px in one frame**; ghost→settled `90.7 → 158.7` = **+68 px, +75 %**; `--vj-morph-collapse` and `--vj-morph-expanded` both **unset** on the plate | **exact** (68 px reproduces) |
| r1 **D-5** three 28 px actions opt out of the producer touch floor | all three `{w:28,h:28}`, `padding:4px`, at 1440×900 **and** 390×844; `--dock-control-size`, `--dock-compact-control-size`, `--dock-control-safe-inset` all unset on the plate; `touch-floor.css` excludes exactly `:not(.dock-icon-button--compact)` outside `.glass-dock` | **exact** |
| r1 **D-6** / r3 the label re-creates a producer recipe in the wrong family | computed: `Fraunces`, **`italic`**, `700`, `12.179px`, ls `0.304475px`, `uppercase`. The italic is an accident: `text-caption` carries `font-style: italic` in `dist/styles/typography/semantic.css` and the site overrode family and weight but never style | **exact** |
| r1 **D-7** the strip contradicts the specimen in RTL | LTR `dot[0].x=49 … dot[11].x=289`; RTL `dot[0].x=301 … dot[11].x=61` (`rtlOrderFlipped: true`); gradient after RTL unchanged `linear-gradient(to right, rgb(255,0,85), …)` | **exact** |
| r1 **D-9** / r5 **D-35** copy reports no failure | `useClipboard.d.ts` declares `ClipboardStatus = "idle"\|"pending"\|"success"\|"failure"` and returns `CopyResult = {ok:true}\|{ok:false,reason}`; `:32` reads only `=== "success"`, `:46` discards the `CopyResult`, `onCopyError` and `timeoutMs` unset | **exact** (code-confirmed; runtime arm remains a hypothesis, see r3 P-3) |
| r1 **D-10** Save is silent and unbounded | `:128–134` emits with no pending/success/failure register and no disabled-after-save; `MixPane.vue:38–47` calls `pm.createPalette` unconditionally | **exact** |
| r1 **D-11** / r5 **D-37** the `DockSeparator` paints nothing and is forbidden | rect `{w:1, h:0}`; `--dock-separator-height` computes to `""` outside `.glass-dock`; background contrast **1.05 : 1** against the well; `margin: 0 6px`. Resulting action rhythm Copy→Save **4 px**, Save→Reset **21 px**. `OPTICAL-BENCH-COMPOSITIONS.md §5` binds Mix to boundaries `[]`, reserve `none`, retained line **`none`**, closing *"Any additional line … is a defect."* | **exact** |
| r1 **D-17** / r4 the code artifact is not LTR-isolated and breaks mid-token | `unicode-bidi: normal`; `word-break: break-all`; value `oklab(63.371128384151% 0.094777606061 -0.063168655844)` = 54 chars / 12 decimals, **2 lines** at 1440 (`h=45.9`, lh `22.96px`), 3 at the narrow arm | **exact** |
| r2 **D-21** / r5 **D-36** zero provenance | plate carries no operand identity, count, space, hue method, leftover strategy or order; `useMixingState.ts:85–98` holds all of them and `MixPane.vue:112–118` passes `result` and `ghost` only | **exact** |
| r2 **D-22** raw machine output | as above — no presentation precision at the readout | **exact** |
| r3 **D-27** no boundary in forced colors | not re-probed (parsimony); **superseded in scope** by D-46, which shows the boundary also fails in the ordinary dark scheme | **extended** |
| r4 **D-29** the absent pre-result state leaves the pane void | measured on a *different arm* — 1440×900, default `/#/mix`: card `h=684.8`, void below the `Mix` button **253.1 px** = **37.0 %**. r4's 43.2 % was a narrower arm; the mechanism reproduces at both | **reproduced, different arm** |
| r5 **D-41** `title="Copy color"` is wrong in half the state space | `:123` is unconditional; `onCopy` (:43–46) joins N colours in palette mode. All three controls: `aria-label: null`, `textContent: ""` — `title` is the sole name, and `title` never surfaces on touch | **exact** |
| r5 **D-38** arbitrary N is undesigned | reproduces, and **sharpens** — see D-47 | **extended** |

Nothing in runs 1–5 that I re-probed failed to reproduce. I file no corrections this run.

---

## 3. New findings

### D-45 · MAJOR · The result is rendered after the method/commit region, contradicting the decided Mix sequence

**Canon.** `OPTICAL-BENCH-COMPOSITIONS.md §3`, Mix row:

> Decided mobile sequence: **source mode/rack; result; method/provenance/commit.**

`VISUAL-CONSTITUTION.md §3.1`, Mix row, *Mobile order*: **`operand rack, result, controls`**.

**Evidence.** `MixPane.vue` renders three siblings inside one `flex flex-col gap-4` (`:78`):

```
:80   <MixSourceSelector …/>      ← rack
:97   <MixConfigBar …/>           ← method + commit
:112  <MixResultDisplay …/>       ← result
```

Measured render order on the live route at 390×844, populated:

```
child 0  y=192    h=318    "Colors | Palettes | Selected | FROM PALETTES | 1 | Sunset"
child 1  y=526    h=110.3  "COLOR SPACE | OKLab | HUE METHOD | Shorter | Mix"
child 2  y=652.2  h=155.8  "RESULT | oklab(0.5 0.1 0.1)"
```

Rendered: rack → **method/commit** → result. Decided: rack → **result** → method/commit. The plate's
top edge sits **126.2 px** below the top of the region that holds the `Mix` button that produced it.

**Mechanism.** The component is not an inspector region of a chassis; it is the last item appended to
a single flex column, so its position is whatever the source order happens to be. Because the pane is
one column at every width, this is not a narrow-arm-only defect: `VISUAL-CONSTITUTION.md §3.1` places
Mix in *"its own `InstrumentChassis` composition"* with the result as the complementary
`38.1966011%` region, and `OPTICAL-BENCH-COMPOSITIONS.md §3` adds *"Landmark-neutral chassis; no
shadow Card/local grid"* — while `MixPane.vue:62` wraps the whole thing in a `<Card tier="resting">`
against §5's *"the other sixteen compositions have Card count `0`"*.

**Consequence in use.** After a mix the user's eye and the focus ring are both at the `Mix` button;
the answer they asked for appears **below** it, past the two selects, at the bottom of a pane whose
lower region they have had no reason to look at. The decided sequence exists precisely so the result
lands between the operands that made it and the knobs that would change it. It does the opposite:
re-tuning `Color space` now requires scrolling *back up past the answer*.

**Reproduction.** `/#/mix`, populated plate; read the child order and rects of the pane's
`flex flex-col` column. Also visible in `frames/mix-plate-palette-390-light.png` and in every
`audit/visual/shots/*/mix.png` (empty arm: the `Mix` button is the last thing on the page).

**Cure.** Move the result region above `MixConfigBar` in `MixPane.vue` and let the chassis own the
regions, so the order is a property of the composition rather than of source-file line numbers. This
is the same move that D-46 and run 4's D-29 want: once the result region is permanent and above the
controls, the pane has no unowned tail.

---

### D-46 · MAJOR · In the ordinary dark scheme the plate's only region boundary is 1.07 : 1

**Evidence.** Measured with `.dark` active, sampling both backgrounds through a canvas 2D context
(they are authored in `oklab`, so `getComputedStyle` alone does not yield sRGB):

```
plate  (.mix-plate, bg-well)      rgb( 66, 55, 47)
host   (.pane-scroll-fade Card)   rgb( 59, 51, 45)
contrast                          1.07 : 1
```

For comparison, light: plate `rgb(233,225,217)`, and the label and value clear AA comfortably
(**5.08 : 1** light / **5.97 : 1** dark for the label; **13.52 : 1** for the value in light). The text
is fine. The **region** is not.

**Mechanism.** `MixResultDisplay.vue:55` declares the plate's identity solely through `bg-well` — a
material step, with no edge, no elevation and no geometry of its own.
`OPTICAL-BENCH-COMPOSITIONS.md §5` states Mix's grouping job as:

> rack, result and action regions remain distinct **through geometry**

The component substituted material for geometry, and the material step is ~7 % luminance in dark.
`VISUAL-CONSTITUTION.md §4.1`: *"Text, focus, boundaries and state meet their rendered contrast on
the actual material tier; a token name is not evidence."* A 1.07 : 1 boundary is below the 3 : 1
non-text threshold by a factor of three, on the single element that separates the answer from the
controls.

**Relation to r3 D-27.** D-27 proved the plate has *no* boundary under `forced-colors: active`.
That reads as an edge case. This shows the same absence in a scheme roughly half the audience uses.
The two share one cause: the plate has no geometry, only a tint.

**Reproduction.** `/#/mix`, populated plate, `documentElement.classList.add('dark')`; paint both
computed backgrounds into a 1×1 canvas and compute WCAG contrast. Visible in
`frames/mix-plate-palette12-390-dark.png` and `audit/visual/shots/safari-desktop-dark/mix.png`, where
the plate is discernible only because the swatches inside it are bright.

**Cure.** Take the constitution at its word: let interval and the action region's placement carry the
grouping and retire the well from this plate. If a well tier survives anywhere in the Mix pane it must
be one root-level decision with a measured ≥3 : 1 boundary in **both** schemes — not a per-plate
`bg-well` that happens to work in light.

---

### D-47 · MAJOR · At twelve colours the rack wraps and the strip does not, so the two orderings decouple

**Evidence.** 12-colour palette result at 390×844, measured:

```
swatch rows (distinct dot y)   [601.5, 649.5]        → 2 rows of 6
gradient strip rect            {x:49, y:701.5, w:292, h:16}   → 1 row of 12 stops
```

Visible in `frames/mix-plate-palette12-390-dark.png`: the strip below reads as a continuous rainbow
ramp bearing no positional relationship to the 6 × 2 grid above it. The twelfth colour (cream) sits
at the strip's far right and at grid position (row 2, col 6).

**Mechanism.** `:95` gives the rack `flex flex-wrap`; `:109–116` gives the strip a single-axis
`linear-gradient`. They share no geometry, so the moment the rack wraps — at 8 colours on this arm —
the strip stops previewing it. The strip is introduced by the source comment as a *"Gradient preview
(decorative)"*, but a preview that no longer corresponds to the thing it previews is not decoration,
it is a second, contradictory statement of the same ordinal.

**Canon.** `VISUAL-CONSTITUTION.md §7 · Mix`: *"The rack remains legible at 2, 3 and 12 colors."*
`OPTICAL-BENCH-COMPOSITIONS.md §3` close criterion: *"Close modes, **2/3/12**/unequal inputs/order/
provenance."* Twelve is not an edge case here — it is the number the canon names.
`§6.1`: *"palette/release order | preserve explicit ordinal identity."*

**Relation to r5 D-38.** D-38 files an *overflow* defect (744 px of plate inside a 720 px viewport at
a permitted colour count). This is upstream of that: the correspondence breaks at the **first wrap**,
before any overflow, and it breaks at exactly the count the composition's close criterion enumerates.

**Reproduction.** Set a 12-colour `mixResult` at 390 and compare
`[...new Set(dots.map(d => d.getBoundingClientRect().y))].length` (→ `2`) against the single gradient
rect.

**Cure.** One owner for ordinal depiction. Either the strip is the rack — a single non-wrapping ramp
with the values enumerated beside it, which also closes D-1 — or the dots are the rack and the strip
is deleted as a duplicate telling. `PROPORTION-AUDIT.md §5.6`: *"Subtraction precedes explanation."*

---

### D-48 · MINOR · At 40 px in a six-column grid the WatercolorDot stops reading as a WatercolorDot

**Evidence.** `:102` sizes the palette faces `w-10 h-10` (measured 40 × 40, 8 px gaps, 6 per row at
390). The producer's organic edge is produced by

```xml
<feTurbulence baseFrequency="0.05" numOctaves="5" …/>
<feDisplacementMap scale="1.3" …/>
```

— measured from the rendered `<filter>` on the live nodes. A displacement of 1.3 px against a 40 px
box is ~3 % of the edge; against the 56 px single-colour face at `:81` it is the same absolute amount
on a larger silhouette and additionally the seeded `border-radius`
(`20.4786% 34.3468% 39.6048% 59.2729% / …`) has room to read. In
`frames/mix-plate-palette12-390-dark.png` the twelve faces render as rounded rectangles in a rigid
grid; in `frames/mix-plate-palette-390-light.png` the single 56 px face is unmistakably organic.

**Canon.** `VISUAL-CONSTITUTION.md §1`: *"The second signature is the existing WatercolorDot
species."* §2 lists Watercolor/data as *"the only ornamental color-bearing species."* A signature form
that is only legible at one of its two rendered sizes is spent without being received: the palette
branch pays the full cost of the species (an SVG filter, a seeded silhouette, a per-dot `<defs>`) and
gets a swatch grid.

**Reproduction.** NONE required beyond the two frames — this is a rendered-appearance judgement, and
I label the mechanism (displacement-to-diameter ratio) a **hypothesis**: I measured the filter
parameters and the box, not the resulting edge deviation in pixels.

**Cure.** Either grow the palette face to a size where the species reads (the single-colour branch's
56 px, at fewer per row), or accept that a dense ordered set is a *strip* and let D-47's cure make it
one — reserving the WatercolorDot for the specimen, which is what §1 calls it.

---

## 4. Negative proof — what this component gets right

Recorded so the verdict is not read as indiscriminate, and so run 7 does not re-probe these.

- **Reduced-motion policy is real**, twice over: the global guard at `demo/styles/animations.css:184`
  and glass-ui's `dist/styles/utilities/a11y-overrides.css`. (Run 5's D-33 files a residual escape via
  the scoped shorthand; that is a narrower claim than "unhandled", and I do not contest it.)
- **Motion is tokenised, not ad hoc.** `--duration-fast` / `--ease-standard` on `:153`, and
  `vj-morph` / `vj-enter` are two of the three canon families (`animations.css:66–137`). A fourth
  family name would be the defect; there isn't one.
- **The focus ring survives outside dock scope.** I expected a defect here and there isn't one:
  `.dock-icon-button:focus-visible { box-shadow: var(--dock-ring); outline: none }` is an **unscoped**
  selector, and `--dock-ring` is defined at root in `dist/styles/tokens/sizing.css`. Measured
  resolving on the plate's buttons to a real two-layer shadow:
  `0 0 0 2px color-mix(in srgb, oklch(47.1189% 0.1884 9.834deg) 30%, transparent), 0 0 8px …`.
- **Forced-colors focus is covered** by the producer: `a11y-overrides.css` gives
  `.dock-icon-button:focus-visible { outline: 2px solid Highlight; outline-offset: 2px }`.
- **The gradient strip is correctly decorative** at the semantic layer: measured
  `aria-hidden="true"`, `role="presentation"`. D-47 is about its geometry, not its semantics.
- **The colour branch uses the correct value role**: measured `Fira Code`, `14px` — `text-mono-small`
  per the closed type matrix. D-1's defect is the *absence* of this role in the palette branch, not
  its misuse in the colour branch.
- **Text contrast passes in both schemes**: label 5.08 (light) / 5.97 (dark); value 13.52 (light).
- **The standing owner edicts on craft are satisfied**: 159 lines and one job (no god module);
  no alias, shim, dual path or back-compat branch; no new `shared/` dir or wrapper component; Vue 3.5
  reactive props destructure with a default (`:20`); `import type { MixResult }` (`:7`) satisfying
  `verbatimModuleSyntax`; the hand-rolled copy timer already retired in favour of the producer's
  `useClipboard` (`:31`). The defect in this component is design, not craft.

---

## 5. Standing gaps this run did not close

- **The clipboard runtime failure arm remains a hypothesis** (r3 P-3 notwithstanding, I did not
  reproduce it myself this run). The *code path* is confirmed from `useClipboard.d.ts` and
  `MixResultDisplay.vue:31,32,46`; the observable arm needs a non-secure-context serve.
- **D-48's edge-deviation mechanism is a hypothesis.** I measured the filter parameters and the box
  size, not the rendered edge displacement in pixels.
- **`forced-colors: active` was not re-probed** this run (parsimony — r3 D-27 stands, and D-46
  supersedes it in scope).
- **The 400 %-zoom arm** that `VISUAL-CONSTITUTION.md §3.2` and `OPTICAL-BENCH-COMPOSITIONS.md §5`
  both require ("actual 400 % in-app Browser zoom, not responsive emulation") was **not** exercised
  by this seat or, as far as I can tell, by any prior run. It is the one canon-mandated arm with no
  coverage in this directory. Run 7 should take it.
