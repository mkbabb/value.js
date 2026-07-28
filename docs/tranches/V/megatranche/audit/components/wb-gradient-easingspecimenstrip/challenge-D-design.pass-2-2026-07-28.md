# CHALLENGE-D — `EasingSpecimenStrip.vue` — the design is flawed · **PASS 2**

## Model receipt

I observe myself to be **Opus 5** — exact model ID `claude-opus-5[1m]`, the 1M-context variant.
That is the tier this seat was explicitly spawned with. The declaration is **explicit, not
inherited**; an undeclared seat would be a defect and this one is not.

---

## Pass note

Pass 1 of this seat is preserved verbatim at **`challenge-D-design.pass-1-2026-07-27.md`**
(17 findings D-01…D-17, verdict DEFECTIVE). It is good work and its rows are **carried forward
unchanged** except where §0 below corrects them on measurement.

This pass exists because pass 1 opened the component and read it, but never **pressed a tile**,
never **enumerated the radius register the owner actually marked** (MT-F030 / OM-4), and never
measured the **dark arm** of anything. All three omissions hid findings, one of which is a
route-killing BLOCKER.

| | |
|---|---|
| **Subject** | `demo/workbenches/gradient/GradientVisualizer/easing/EasingSpecimenStrip.vue` (215 lines) |
| **Corpus read** | `easing/easingCatalogue.ts` (230) · `easing/useSpecimenRows.ts` (74) · `easing/EasingAuthoringStage.vue` (116) · `GradientEasingEditor.vue` (295) · `composables/useGradientInterpolation.ts` · `composables/useGradientCSS.ts` · `src/color/operations.ts` · `src/easing.ts` |
| **Canon read** | `VISUAL-CONSTITUTION.md` · `PROPORTION-AUDIT.md` · `PALETTE-CONTRACT.md` (carries **no row** naming this component — it is the API/wire authority, not a visual one) · `demo/DESIGN.md §Radii` · `excavation/DESIGN-CANON-BRIEF.md` (OM-4 row) |
| **Base** | branch `tranche-u`, HEAD `c654824e`, `@mkbabb/glass-ui@7.0.0`, dev server live at `:9000` |
| **Verdict** | **DEFECTIVE** |
| **Findings** | pass 1: 17 · **pass 2: +10 new (D-18…D-27), 2 corrections** = **27 total** |
| **Strongest defect** | **D-18** — three of the twenty-seven tiles this component offers as one-click choices **destroy the entire `/#/gradient` route** into the app error boundary. Two steps, no console error, 100 % reproducible. |

**Probes this pass wrote and ran** (kept beside this file; every number below is pasted from a
probe return or a `grep`, never estimated):
`probe-D2-radius-material-matrix.mjs` · `probe-D2-port-census.mjs` · `probe-D2-tile-crash-sweep.mjs` ·
`probe-D2-rendered-contrast.mjs` · `probe-D2-dom-mass.mjs`.
**Frames this pass produced:** `frames/D2-*.png` (WebKit, `deviceScaleFactor` 3 where marked).

---

## §0 · Corrections to pass 1

### C-1 · pass-1 D-07 states the scroll port has no `tabindex`. It has one, and it is nameless.

Pass 1: *"The scroll port itself (`.specimen-strip`, `overflow-x: auto`, 1046 px of hidden content)
has **no `tabindex`**, so it is not a focusable scrollable region."* Measured
(`probe-D2-port-census.mjs`):

```
portAttrs: { "tabIndex": 0, "role": null, "ariaLabel": null,
             "cls": "fading-scroll fading-scroll--x specimen-strip" }
```

The producer's `FadingScroll` **does** make the port tabbable. The real defect is the opposite of
the one pass 1 named and is worse: the port is a **focus stop with no role and no accessible name**,
whose computed name falls back to its concatenated text content
(`"csslineareaseinoutin-out…"` — measured as tab-order entry #2). So the true tab count for one
interval row is **28, not 27** (measured sequence, `probe-D2-port-census.mjs` → `tabOrder.total: 33`
for the whole card, of which 28 are the strip). Everything else in D-07 stands, and is confirmed:

```
keyboard: { before: "ease", afterRight: "ease", afterHome: "ease", afterEnd: "ease" }
```

Arrow keys, `Home` and `End` move nothing. `VISUAL-CONSTITUTION.md:129` §5.2 legislates exactly this
mechanism (`horizontal … rail roving focus | Home=first semantic item, End=last; activation is
separate from movement`) and none of it exists.

### C-2 · pass-1 D-12's contrast numbers are single-scheme and derived; here are rendered-pixel numbers for both schemes.

`probe-D2-rendered-contrast.mjs` screenshots the live strip at DPR 3 in each scheme, decodes it in a
canvas, takes the extreme-luminance pixel pair inside each text/graphic box, and computes WCAG 2.x
contrast. Best case for the ink (the anti-aliased core), so these are **conservative**:

| Ink | light | dark | floor | verdict |
|---|---:|---:|---|---|
| **family eyebrow** on the plate | **2.77 : 1** | **2.94 : 1** | 4.5 (1.4.3, 9 px is not large text) | **FAILS BOTH SCHEMES** |
| resting tile label on the chip | 6.81 : 1 | **4.52 : 1** | 4.5 | passes; dark has 0.4 % headroom |
| selected tile label on the chip | 5.98 : 1 | 5.74 : 1 | 4.5 | passes |
| resting glyph stroke on the chip | 4.92 : 1 | **3.39 : 1** | 3.0 (1.4.11) | passes; dark has 13 % headroom |
| selected glyph stroke on the chip | 5.89 : 1 | 4.94 : 1 | 3.0 | passes |

Pass 1 reported the eyebrow at 3.24 : 1 in one scheme. The rendered truth is worse and holds in
both. Note also the honest positive: the component's own docblock claim at lines 182-186 — *"65 %
clears 3:1 in both schemes"* — **is true** (4.92 / 3.39). The author's contrast reasoning was
correct where it was applied; it simply was never applied to the eyebrow, which additionally
multiplies `opacity: 0.75` on top of an already-de-emphasised `--muted-foreground` (line 153).

---

## §1 · New findings

### D-18 · BLOCKER · Three of the twenty-seven tiles destroy the route. The design designed the overshoot *portrait* and never the overshoot *selection*.

Reproduction, from a cold load, two steps:

1. `http://localhost:9000/#/gradient` (interval `1 → 2` is open by default —
   `GradientEasingEditor.vue:61`, `openInterval = ref(0)`).
2. Click the tile `[data-specimen="ease-out-back"]`.

The whole route is replaced by the app error boundary — a bare **"Try again"** button on the
atmosphere (`frames/D2-CRASH-after-selecting-ease-out-back.png`). Measured before/after
(`probe-D2-tile-crash-sweep.mjs`, WebKit):

```
before        : { rails:1, strips:1, tiles:27, rows:1, selected:["linear"], readout:"cubic-bezier(0, 0, 1, 1)" }
afterBackClick: { rails:0, strips:0, tiles:0,  rows:0, selected:[],          readout:null }
```

The sweep presses ten tiles from a fresh context each and reports whether the row survives:

| tile | route survives |
|---|---|
| `ease-out`, `ease-in-out-sine`, `steps`, `step-start`, `smooth-step-3`, `ease-in-expo`, `ease-out-circ` | yes |
| **`ease-in-back`** | **NO — error boundary** |
| **`ease-out-back`** | **NO — error boundary** |
| **`ease-in-out-back`** | **NO — error boundary** |

Nothing reaches the console: `caught: []` after filtering the pre-existing dev-misconfig banner.
A user gets a blank pink page and no explanation.

**Mechanism — a catalogue built by blind enumeration feeding a consumer with a closed domain.**

- `easingCatalogue.ts:178` — `for (const name of Object.keys(bezierPresets))`. Every preset the
  library exports becomes a tile. There is **no domain filter and no guard**.
- `src/easing.ts:62-64` — the three `back` presets are the only ones whose control points leave the
  unit square: `[0.6,-0.28,0.735,0.045]`, `[0.175,0.885,0.32,1.275]`, `[0.68,-0.55,0.265,1.55]`.
  Evaluated (1001-sample sweep):

  ```
  ease-in-back      fn(0.5) = -0.063622   range = [-0.0969, 1.0000]
  ease-out-back     fn(0.5) =  1.067553   range = [ 0.0000, 1.0869]
  ease-in-out-back  fn(0.5) =  0.606680   range = [-0.0927, 1.0927]
  ```

- `useSpecimenRows.ts:53-59` derives each row's ink from `interpolateStopColors(c0, c1, fn(0.5), …)`.
- `useGradientInterpolation.ts:36-38` — `if (!mixed.ok) throw new Error(...)`.
- `src/color/operations.ts:90` — `if (progress < 0 || progress > 1) return err({ code: "color_progress_out_of_range" })`.

So `ease-in-back` and `ease-out-back` die on the **ink** derivation (`fn(0.5)` off-domain), and
`ease-in-out-back` — whose `fn(0.5)` *is* in range — dies on the **ramp** sampler
(`serializeIntervalRamp`, `useGradientCSS.ts:232-254`), whose samples span `[-0.0927, 1.0927]`.
Both throws happen inside a `computed` during render, which is why Vue's boundary eats the whole
subtree. The library is not at fault: it returns a `Result`. The demo converts a legitimate
`Result` into a throw and then hands it a value it never checked.

**This is a design defect, not merely a bug.** The component's own style comment, lines 172-176,
*names the overshoot family and designs for it*:

> *"the portrait: unit-box sparkline … overshoot curves (**the back family**) draw past the box —
> visible, never clipped"*

The design saw the overshoot, reasoned about how to **draw** it, and never asked what happens when
someone **chooses** it. A state that was never designed is a design defect; a state that was
half-designed — rendered beautifully and then made fatal to press — is a worse one.

**Corroboration.** The independent CHALLENGE-C seat reached the same three tiles from the
implementation side and captured the boundary string
(`challenge-C-implementation.md:74-76,91,98`: *"Gradient color mix failed:
color_progress_out_of_range"*). Two seats, two methods, same result — this is CONFIRMED, not
plausible.

**Cure (gestalt, not patch).** The catalogue must be *curated*, not enumerated. `SpecimenTile`
already carries a `payload()`; give it a declared **range**, and make the interval model's contract
explicit: an interval's easing may leave `[0,1]` in *time-space* but the colour mixer's `progress`
is a *domain*, not a curve output. Either (a) the ramp/ink samplers clamp `fn(t)` into the mixer's
domain at the one boundary where curve-space becomes colour-space — a single named projection, not
a scattered `Math.min` — or (b) the `back` family is honestly declared out of catalogue for
colour intervals and the three tiles do not exist. Not acceptable: a `try/catch` around the
computed, which would be the masking fallback the standing edict forbids.

---

### D-19 · MAJOR · The radius register the owner marked (MT-F030 / OM-4): six boxes, five radii, and curvature that runs *inversely* to box size. The glass fix does not cure it.

The owner's mark: *"easing config is awful, too rounded in some areas, not rounded enough in
others"* (`DESIGN-CANON-BRIEF.md:73`, witness `OM-4-easing-radius-incoherence.png`). The seat brief
asks for **every radius declaration in the easing corpus** and a judgement of the register. Here it
is, exhaustively.

**Declared radii in the easing corpus** (`grep -rn "radius\|rounded" demo/workbenches/gradient/`):

| Site | Declaration | Resolves to |
|---|---|---|
| `EasingSpecimenStrip.vue` | **none — zero border-radius declarations in 215 lines** | whatever `Chip` hands it |
| `EasingAuthoringStage.vue` | **none** | inherits `.glass-card` → `--radius-card` |
| `GradientEasingEditor.vue:114` | `class="rounded-card"` | `--radius-card` = **16 px** |
| `GradientEasingEditor.vue:153` | `class="h-5 rounded-md"` (the ramp) | `--radius-md` = **6 px** |
| `GradientEasingEditor.vue:176` | `class="rounded-md"` (the readout rail) | `--radius-md` = **6 px** |
| `GradientEasingEditor.vue:242` | `border-radius: 9999px` (specimen dots) | **9999 px**, hand-rolled |
| `GradientEasingEditor.vue:274` | `border-radius: var(--radius-input)` (rail buttons) | **4 px** |

**Rendered register**, every non-zero-radius box inside the open interval row, measured live at
1440 px (`probe-D2-radius-material-matrix.mjs`, `radiusRegister`):

| Box | rendered size | radius | **curvature `r ÷ min-dim`** |
|---|---:|---:|---:|
| specimen tile (`Chip`) | 45.2 × 43.8 | 9999 px → 21.9 effective | **0.500** |
| specimen dot | 10 × 10 | 9999 px → 5 effective | **0.500** |
| eased ramp | 436 × 20 | 6 px | **0.300** |
| readout rail | 436 × 32 | 6 px | **0.188** |
| rail button | 24 × 24 | 4 px | **0.167** |
| interval row plate | 462 × 196 | 16 px | **0.082** |

Three separate judgements follow, and all three are ours:

1. **Curvature is inversely proportional to size.** The two *smallest* boxes are the *most* rounded
   (0.500 — full semicircles) and the *largest* is the *least* (0.082). An optically coherent
   register does the opposite or holds constant: corner curvature is what makes a set of boxes read
   as one material. Here the 44 px tile and the 462 px plate belong to visibly different materials
   sitting 12 px apart. That is precisely the owner's *"too rounded in some areas, not rounded
   enough in others"*, and it is a **register**, not a taste, so it is decidable.
2. **Equal absolute radius is not equal curvature.** The ramp and the readout rail both carry
   `--radius-md` = 6 px, and the owner nonetheless read them as different shapes (calling one
   "small-radius strip" and the other a "pill code row"). They are: 6 px on a 20 px-tall box is
   0.300 curvature; on a 32 px-tall box it is 0.188. Token identity is not optical identity —
   `PROPORTION-AUDIT.md §5.8`: *"Real rendered relation wins over token intent. … token presence
   alone cannot close a row."*
3. **The canon has no law to appeal to, and what law it does have blesses the defect.**
   `demo/DESIGN.md §Radii` lists four role tokens and says *"`rounded-pill` / `rounded-full` —
   **chips**, slug pills, dock control."* Read literally, a disc-shaped chip is **correct** — which
   is why nobody caught it, and why the owner had to. The doc has no size conditioning and no
   derivation rule. This is exactly the gap `DESIGN-CANON-BRIEF.md:73` names: *"**RADIUS
   DERIVATION**: how a nested register derives from its parent; when circle may sit beside
   rounded-rect."* This report is evidence for that law, not a request to invent one locally.
   (Drift note, same section: `DESIGN.md` states `--radius-input` = **8 px**; measured live it is
   `0.25rem` = **4 px**. The doc is wrong about the token the easing rail buttons use.)

**And the finding that changes the disposition:** the glass fix does **not** cure OM-4. When glass
lands the orphaned rule (§3), `.glass-chip--cell { border-radius: var(--radius-card) }` gives the
44 px tile **16 px** → curvature **0.364** — still the most-rounded box in the row, and now carrying
*the same absolute radius as the 462 px row plate*. The register stays incoherent, just differently.
So OM-4 cannot be banked and waited out. It needs (a) our own derivation law in the register, and
(b) an **ask** on glass for a cell radius that derives from the chip's own box (or a
`--chip-cell-radius` knob) rather than a fixed card rung.

---

### D-20 · MAJOR · The seat per-instance-overrides four of the producer's five cell-recipe declarations, and never passes the size prop that exists.

`Chip`'s compiled recipe (`node_modules/@mkbabb/glass-ui/dist/chip-DFZQr6rV.js`, `chipVariants`):

```js
size: { sm: "gap-1 px-2.5 py-1 text-caption", md: "gap-1.5 px-3.5 py-1.5 text-small", lg: … }
shape:{ pill: "", cell: "glass-chip--cell flex-col gap-1.5 px-2 py-2.5 text-micro", icon: … }
```

The call site (`EasingSpecimenStrip.vue:98-102`) passes `mode="selectable" shape="cell"` and **no
`size`**, so it takes `md`, then overrides the result four times in scoped CSS:

| Producer declaration | Seat override | Line |
|---|---|---|
| `px-2 py-2.5` (8 px / 10 px) | `padding: 0.3125rem 0.375rem 0.25rem` (5/6/4 px) | 168 |
| `gap-1.5` (6 px) | `gap: 0.125rem` (2 px) | 167 |
| `text-micro` (11 px — measured on the chip root) | `font-size: 0.5625rem` (9 px) on `.tile-label` | 195 |
| — | `min-width: 2.75rem` added | 169 |

Standing edict 5: *"Root-level styling — style at the shadcn/glass root component level, never
per-instance overrides."* Edict 4: *"variants/primitives belong in glass-ui."* A "specimen-scale
cell" is a **size**, and `Chip` already has a size axis. The seat needed either `size="sm"` or a new
producer rung; it hand-shrank the recipe instead. Pass-1 D-08 caught the type rung; the pattern is
four declarations wide, and its consequence is D-21.

**Cure:** delete all four overrides. Pass `size="sm"`; if `sm` is still too large for a specimen
grid, that is an **ask on glass** for a specimen rung — the same relay channel as M3, not a local
shrink.

---

### D-21 · MAJOR · On touch the tiles miss the 44 px target floor — and the producer rule that would have met it is in the orphaned stylesheet.

Measured at 390 × 844, `isMobile`, `hasTouch` (`probe-D2-port-census.mjs`):

```
mobile: { tileBox: { w: 45.23, h: 43.80 }, coarsePointer: true, touchFloorMet: false }
```

43.80 < 44. Glass ships the rule that fixes it — in the file nothing imports:

```css
/* dist/styles/glass/glass-chip.css — NOT imported by dist/styles/index.css */
@media (pointer: coarse) {
  .glass-chip--interactive { min-inline-size: var(--touch-target, 2.75rem);
                             min-block-size:  var(--touch-target, 2.75rem); }
}
```

`--touch-target` resolves to `2.75rem` = 44 px in our document (measured). So the orphaned-CSS
residual is **not cosmetic** — it has an accessibility consequence, and D-20's local padding shrink
is what put the box within 0.2 px of the line in the first place. This belongs in the M3 evidence
packet: it upgrades the glass row from "visual residual" to "visual + a11y residual".

Note this defect is **invisible to the shipped harness**: `REPORT.json`'s six `smallTapTargets` on
`/#/gradient` are the dock slug controls (22 × 22 ×3) and the two gradient stop seats (20 × 20), plus
one input — the harness's threshold is `< 24`, so a 43.8 px box never trips it.

---

### D-22 · MAJOR · The family eyebrow carries the entire information architecture and fails four ways at once.

`.family-eyebrow` (lines 96, 147-154) is the only thing that says which family a tile belongs to.
It is:

1. **Below every rung of the type ladder.** 9 px measured. The smallest rung glass defines is
   `--type-micro: 0.6875rem` = 11 px (`dist/styles/typography/scale.css`). 9 px is 18 % below the
   floor and exists nowhere in the system.
2. **Failing contrast in both schemes** — 2.77 : 1 light, 2.94 : 1 dark (§0 C-2), because
   `opacity: 0.75` (line 153) multiplies an already-de-emphasised `--muted-foreground`.
3. **`aria-hidden="true"`** (line 96). There is no accessible substitute: the tiles carry
   `aria-label="{tile.id}"` and sit in one flat `role="group"`. A screen-reader user receives 27
   unrelated toggle buttons with no family structure whatever.
4. **Scrolled out of view almost always.** The eyebrow is painted once at each family's inline start
   and is not sticky. Measured families *fully visible* at rest:

   ```
   desktop 1440 : portW 436, contentW 1482, ratio 3.40× → 2 of 8 families fully visible, 8/27 tiles
   mobile   390 : portW 298, contentW 1482, ratio 4.97× → 1 of 8 families fully visible, 5/27 tiles
   zoom 200 %   : portW 436, contentW 1482, ratio 3.40× → 2 of 8, 8/27 (unchanged)
   ```

   Scroll to the far end (`frames/D2-scroll-end-back-steps.png`) and the leftmost visible tiles have
   **no eyebrow at all** — their family label is off-port. In RTL
   (`shots/rtl-desktop/gradient.png`) an eyebrow is sliced mid-word to `ad` (from `quad`).

The design's own thesis (docblock lines 4-6) is *"family-grouped under mono eyebrows"*. The grouping
is carried by an element that is off-ladder, sub-contrast, invisible to AT, and off-screen 75–88 %
of the time. **Cure:** the eyebrow becomes a real `aria-label` on a per-family `role="group"`, takes
`text-micro` with no `opacity` multiplier, and — if the strip survives at all after pass-1 D-01 —
sticks to the port's inline start while its family is in view.

---

### D-23 · MAJOR · The strip is instantiated once per interval, so a constant catalogue is duplicated into `display:none` twins.

`GradientEasingEditor.vue:161-165` renders `<EasingSpecimenStrip>` inside the per-row `v-for`, inside
the `v-show` panel. `SPECIMEN_FAMILIES` is a **module-level constant** (`easingCatalogue.ts:198`) and
the accordion has **exactly one open row** (`openInterval: number | null`). So every closed row
mounts a complete hidden copy of a surface that can never be seen.

Measured with one interval (`probe-D2-dom-mass.mjs`):

```
routeElements(main *) : 315
stripElements         : 134       ← 42.5 % of the entire route's main subtree
easingCardElements    : 194
svgPaths in strip     : 27  (49 points each)
```

The component's docblock knows and works *around* it rather than removing it — lines 40-41:
*"sibling rows mount hidden twins of every `data-specimen` id"* — which is why the reveal must scope
its `querySelector` to `rowEl`. A four-stop gradient (3 intervals) mounts **402 elements** of which
268 are unreachable twins.

**Cure:** one strip, hoisted to `GradientEasingEditor`, bound to `openInterval`, emitting
`(index, tile)`. The `rowEl`-scoping workaround (lines 37-46) dissolves with it, and so does its
`data-specimen` id-collision hazard.

---

### D-24 · MINOR · The scroll port is a nameless, roleless tab stop. (Supersedes pass-1 D-07's claim of no tabindex.)

Measured: `{ tag: "DIV", tabIndex: 0, role: null, ariaLabel: null }`. Its computed accessible name
is its concatenated text content. Combined with the 27 tile stops that is **28 tab stops** to cross
one single-select decision; the readout's `Copy` button is stop 30 of the card's 33.
`VISUAL-CONSTITUTION.md:83` §4.1 requires role, accessible name and state to be explicit. Producer-owned element,
consumer-visible consequence: **relay it with M3** (`FadingScroll` should take a labelling prop or
emit `role="region"` + `aria-label` when tabbable), and locally stop feeding it 27 tab stops (D-07's
composite cure).

---

### D-25 · MINOR · One tile fails WCAG 2.5.3 Label in Name.

`probe-D2-port-census.mjs` walks all 27 tiles comparing `aria-label` against the visible
`.tile-label` text. Exactly one mismatch:

```
labelInName: [ { acc: "steps", vis: "n = 4", contains: false } ]
```

`easingCatalogue.ts:187` mints `stepsTile("steps", "n = 4", 4, "jump-end")` — the id is the accessible
name, the label is the visible text, and "steps" does not contain "n = 4". Voice control cannot
target this tile by what it reads. The other 26 pass (`ease-in-out` ⊃ `in-out`, `step-start` ⊃
`start`, `smooth-step-3` ⊃ `smooth`, …).

**Cure:** the accessible name must contain the visible string — e.g. `aria-label="steps, n = 4"` —
or the visible label becomes `steps`. This is also the tile whose visible label advertises a
parameter (`n = 4`) that the docblock (lines 18-20 of the catalogue) admits is a *default* the model
may have departed from, so the honest fix is the former.

---

### D-26 · MINOR · The tiles carry warm chroma on a surface the material table says is neutral.

Measured tile fill (`probe-D2-radius-material-matrix.mjs`):

```
light : oklab(0.925647 0.009411 0.029177 / 0.83872)   → C = 0.0306, h ≈ 72.1°
dark  : oklab(0.467325 0.012705 0.030851 / 0.911296)  → C = 0.0334, h ≈ 67.6°   (rendered rgb 105,86,72)
```

Non-zero chroma in both schemes, from `.glass-capsule`'s
`--glass-capsule-warm: oklch(0.88 0.1 75)` at a 16 % floor. Rendered
(`frames/D2-easing-card-dark.png`) the dark-scheme tiles are **warm-brown discs on a plum plate** —
they read as light-mode chips dimmed, not as dark-mode surfaces.

`VISUAL-CONSTITUTION.md:16` §2 material table: *"Specimen well | image, **curve**, palette or code
artifact | opaque/quiet **neutral** stage; **the specimen supplies color**."* `:21`: *"Dark chrome
uses the restrained neutral pole. Seed tint is forbidden outside the ambient field, active accent,
WatercolorDot/specimen, and pastel Palettes lanes."* A specimen-selection tile is a well; the curve
is the specimen; the well is tinted and the curve is not.

**Disposition — glass.** Same producer register as pass-1 D-14 (`.glass-capsule` elevation) and
already-relayed **MT-F026**. A local `background: var(--well-bg)` would be the MT-F014 masking
fallback. **Bank it and add the tint to the ask**: the capsule register conflates *shape* + *warm
tint* + *floating elevation*; a well-tier chip needs all three separable.

---

### D-27 · INFO · The D-18 crash escaped 60 route captures and five state matrices, because no harness presses anything.

`audit/visual/capture.mjs` navigates, settles ~3.5 s, probes and screenshots. `states.mjs` adds
`forced-colors`, `keyboard-focus`, `reduced-motion`, `rtl-desktop/mobile`, `zoom-200`. **None of them
activates a control.** `REPORT.md` accordingly reports `/#/gradient` as clean:
`pageErrors 0 · consoleErrors 0 · blankOrNearBlank 0` in all four matrices — while one click on a
visible tile blanks the route.

Recorded as a harness gap, not a component defect: a route-level capture matrix cannot certify a
selection surface. The component-level state matrix needs a *press-every-affordance* arm.
(Second, smaller harness note, confirming pass-1 D-16: the `bleeding` array for `/#/gradient` is
12/12 this component in every matrix — `div.strip-row`, `div.strip-family`, `span.family-eyebrow`,
`div.family-tiles`, `button.glass-chip.glass-capsule` ×3, `svg` ×2, `path` ×2, `span.tile-label` —
so the harness's 12-slot budget is saturated and blind to genuine bleeding elsewhere on the route.
`overflowX` is 0, so this is the 1482 px `width: max-content` row, not user-visible overflow.)

---

## §2 · The glass residual, precisely: what is orphaned, what it costs, what its fix does *not* fix

The brief names this component's known residual (INBOX **I-9**, **D58**, our mark **M3**). Here is
the exact mechanism, because "orphaned dist CSS" understates it.

**What is orphaned.** `dist/styles/index.css` is a flat list of `@import`s. `dist/styles/glass.css`
imports eighteen files. **Neither imports `./glass/glass-chip.css` or `./glass/glass-atom.css`,**
which exist in the tarball and are referenced by nothing:

```
$ grep -rn "glass-chip.css\|glass-atom.css" node_modules/@mkbabb/glass-ui/dist/styles/
$ echo $?            # 0 matches
$ grep -c "glass-chip" node_modules/@mkbabb/glass-ui/dist/glass-ui.css
0
```

`.glass-capsule` *is* imported (`glass/glass-capsule.css`) and sets
`border-radius: var(--radius-pill)`. The orphaned file contains the rule that would have won —
`.glass-chip--cell, .glass-chip--cell.glass-capsule { border-radius: var(--radius-card); }` — at
higher specificity. So the disc is not a mystery: it is `glass-capsule` unopposed.

**What is lost, measured.** Everything in `glass-chip.css` — which is the *entire* chip behaviour:

| Orphaned rule | Consequence measured on our tiles |
|---|---|
| `.glass-chip--cell { border-radius: var(--radius-card) }` | `borderRadius: 9999px` → discs (D-19) |
| `.glass-chip[data-mode=selectable][data-state=on] { background-color: var(--accent-band); border-color: var(--accent-edge); color: var(--accent-ink) }` | selected and unselected chips are **byte-identical**: `bg` and `boxShadow` string-equal in light, dark, RTL and reduced-motion (pass-1 D-02, re-confirmed this pass in 4 matrices) |
| `.glass-chip[data-mode=selectable]::after` accent flood | absent |
| `.glass-chip--interactive { scale: … }` press feedback | `scale: "none"` measured |
| `@media (pointer: coarse) { min-inline/block-size: var(--touch-target) }` | 43.8 px touch target (**D-21 — an a11y consequence, new to the M3 packet**) |
| `@media (prefers-reduced-motion)` and `(prefers-contrast: more)` arms | absent |
| `.glass-chip[data-disabled] { opacity: … }` | absent |

**The rendered proof that selection is colour-only.** `frames/D2-strip-3x-grayscale.png` is the live
strip with hue removed. The pressed `linear` tile differs from its six neighbours **only** by a
slightly darker/bolder 9 px word and a 1.25 → 1.75 px stroke. `VISUAL-CONSTITUTION.md:83` §4.1:
*"Selected, failed, pending, withdrawn and disabled states are **never colour-only**."* Because both
surviving signals are `stroke` and `color` — both of which the forced-colors palette substitution
overrides — the selected state collapses entirely under forced colors, leaving `font-weight: 600` on
9 px mono as the sole differentiator.

**Disposition — FOLD-BANK on glass. Do not patch.** Re-declaring a radius, a pressed wash, a touch
floor or a well background locally would hide glass's defect and then fight the real rules when they
land: the MT-F014 disease class by name. **Bank.** What this pass adds to the M3 packet:

1. the **exact orphan mechanism** (two files, importable, imported by nothing — a one-line fix in
   `styles/glass.css`);
2. the **a11y** consequence (D-21), which reclassifies the row from cosmetic;
3. an **ask**: `.glass-chip--cell` at `--radius-card` will still be the most-rounded box in our row
   and will equal the 462 px plate's radius (D-19) — the cell radius should derive from the chip's
   own box, or expose `--chip-cell-radius`;
4. an **ask**: `.glass-capsule` conflates shape + warm tint + floating elevation (D-26, pass-1 D-14 /
   MT-F026) — a well-tier chip needs them separable;
5. an **ask**: `FadingScroll` makes its port `tabindex="0"` with no role or name (D-24).

**And the half that is ours regardless of glass:** the disc is not the only radius problem (D-19),
the register is ours (D-19), the type/padding/gap overrides are ours (D-20), the eyebrow is ours
(D-22), the per-interval duplication is ours (D-23), the label-in-name is ours (D-25) — and D-18
is entirely ours and fatal.

---

## §3 · Consolidated state coverage

Every state this component can be in, judged. Pass-1 rows retained, new rows marked.

| State | Handled? | Evidence |
|---|---|---|
| populated | yes — the only fully designed state | — |
| **selected — `back` family** | **NO — destroys the route** | **D-18** |
| selected — 24 other tiles | surface delta **zero** (glass) + colour-only (canon) | pass-1 D-02, §2 |
| **custom / no tile matches** | NO — renders as "nothing selected" while the head prints `custom` | pass-1 D-17 |
| empty / loading / error | n/a — catalogue is a build-time constant. Correct. | — |
| disabled | absent; no interval can disable easing. Acceptable. | — |
| hovered | designed wrong — beats selection, no `(hover: hover)` guard | pass-1 D-03 |
| focused | producer ring, clipped by 2 px of headroom; louder than selection | pass-1 D-11, D-12 |
| pressed (active) | `scale` rule orphaned → no press feedback | §2 |
| dragging | n/a | — |
| **overflowing / truncated** | unhandled — 70.6 % desktop / 79.9 % mobile hidden; family labels off-port | pass-1 D-10, **D-22** |
| RTL | broken — physical `border-left`/`padding-left`; eyebrow sliced mid-word | pass-1 D-05, D-22 |
| reduced motion | **handled correctly** — `useMediaQuery` → `behavior:"auto"` | pass-1 D-15 |
| forced colors | broken; and selection collapses to a 600 weight | pass-1 D-06, §2 |
| zoom 200 % | port does not narrow (436/1482 unchanged) — no new defect | **D-22 table** |
| **coarse pointer / touch** | **43.8 px < 44 px floor** | **D-21** |
| dark scheme | tiles carry warm chroma; resting label 4.52 : 1, glyph 3.39 : 1 (thin) | **D-26, §0 C-2** |
| AT / screen reader | 28 flat stops, one nameless region, no family structure, no set semantics | pass-1 D-07, **D-24, D-25** |

---

## §4 · Disposition summary (pass 1 + pass 2)

| Row | Owner | Disposition |
|---|---|---|
| **D-18** back-family selection kills the route | **ours** | **BLOCKER.** One named curve-space → colour-space projection, or the family leaves the catalogue. No `try/catch`. |
| **D-19** radius register / OM-4 · MT-F030 | **ours** + **ask on glass** | derivation law in the register; ask glass for a size-derived cell radius. **Not curable by waiting for the glass fix.** |
| **D-20** four per-instance overrides of the cell recipe | **ours** | delete; `size="sm"` or ask for a specimen rung |
| **D-21** 43.8 px touch target | **glass (M3)** | **BANK** — and upgrade M3 from cosmetic to a11y |
| **D-22** eyebrow: off-ladder + sub-contrast + aria-hidden + off-port | **ours** | `text-micro`, no `opacity`, real group label, sticky-or-gone |
| **D-23** strip duplicated per interval (134 el = 42.5 % of route) | **ours** | one strip bound to `openInterval` |
| **D-24** nameless tabbable scroll port | **glass** + ours | **BANK** the producer half; fix the 28-stop half with D-07's composite |
| **D-25** Label-in-Name (`steps` / `n = 4`) | **ours** | name contains the visible string |
| **D-26** warm chroma on a well-tier surface | **glass (MT-F026)** | **BANK. Do not patch.** |
| **D-27** harness never presses | **formation** | component state matrix needs a press-every-affordance arm |
| pass-1 D-01 topology / no `/easing` route | ours — W27 / PR-09 | carried forward |
| pass-1 D-02 orphaned chip CSS · zero pressed delta | **glass (M3)** | **BANK.** Mechanism now pinned exactly (§2) |
| pass-1 D-02b register keyed on `[data-state]` | ours | re-root on `selectedId` |
| pass-1 D-03 hover beats selected | ours | delete the hover colour rule |
| pass-1 D-04 seven family divider rules | ours | delete — §5 retained-line count is `none` |
| pass-1 D-05 physical box sides | ours | logical properties |
| pass-1 D-05b FadingScroll fade on the wrong edge in RTL | glass | **BANK** with M3 |
| pass-1 D-06 forced colors | ours + glass | own the glyph/eyebrow arm; bank the boundary |
| pass-1 D-07 no roving focus | ours | one composite; **28 stops, not 27** (§0 C-1) |
| pass-1 D-08 9 px Fira 600 | ours | subsumed by D-20/D-22 |
| pass-1 D-09 portraits drawn without their unit box | ours | the painter draws the box |
| pass-1 D-10 82 % hidden | ours | dissolved by D-01 |
| pass-1 D-11 focus ring clipped | ours | reserve the ring's true extent |
| pass-1 D-12 contrast inversion + double de-emphasis | ours | numbers restated per-scheme (§0 C-2) |
| pass-1 D-13 ragged module (44 / 45.23) | ours | one fixed module width |
| pass-1 D-14 27 casters | glass (MT-F026) | **BANK. Do not patch.** |
| pass-1 D-15 native smooth-scroll | ours | producer spring register, or delete with D-01 |
| pass-1 D-16 bleeding budget saturated | ours | dissolved by D-01 |
| pass-1 D-17 `custom` state undesigned | ours | give `custom` a rendered register |

**No source edits land from this formation.** Nothing under `src/`, `demo/`, `api/`, `test/`, `e2e/`
or any `INBOX.md` was touched. This seat wrote only under
`docs/tranches/V/megatranche/audit/components/wb-gradient-easingspecimenstrip/`.

---

## §5 · What passes

Recorded so the negatives are not read as a blanket condemnation. All re-verified this pass:

- **Reduced motion — correct and deliberate.** `useMediaQuery("(prefers-reduced-motion: reduce)")`
  (line 47) resolves the reveal to `behavior: "auto"`. No keyframes are declared, none deleted, and
  the sibling stage carries its own PRM carve-out.
- **No layout-forcing animation.** The only motion properties in play are `scale` (compositor) and
  scroll position. Nothing animates `width`/`height`/`top`.
- **The contrast reasoning the docblock records is true.** Lines 182-186 claim 65 % ink clears the
  1.4.11 3:1 graphics floor in both schemes; measured 4.92 : 1 light / 3.39 : 1 dark. It holds.
- **The refusal of `scrollIntoView`** (lines 37-46) is exemplary: the comment names the O-19 defect
  it prevents (an ancestor-walking reveal yanking the pane's vertical scroll ~95 px) and the
  hand-rolled single-axis nearest-edge implementation is the right call.
- **`verbatimModuleSyntax`** — clean. `import type { SpecimenTile }` (line 16) is the only type-only
  import and is correctly marked.
- **Vue 3.5 idioms** — clean. `useTemplateRef` (line 48), reactive props destructure with a default
  (lines 18-24), no `defineModel` (so no stale-read hazard).
- **No god module** — 215 lines, one job; the catalogue is a sibling module.
- **No legacy shims, no dual paths, no back-compat aliases; no new `shared/` dir; no wrapper
  component.** It consumes `FadingScroll` and `Chip` from glass-ui directly, which is the correct
  boundary — the failures are in *how* it consumes them, not in whether it should.
- **Zero glyph maths is re-derived.** Every portrait is sampled from the library callable through
  one painter (`glyphPath`), and the minted literals are byte-mirrored against the picker's own
  law — a genuinely good decision that the D-18 catalogue defect does not diminish.
