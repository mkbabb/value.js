# CHALLENGE-D — `EasingSpecimenStrip.vue` — the design is flawed · **PASS 4**

## Model receipt

I observe myself to be **Opus 5** — exact model ID `claude-opus-5[1m]`, the 1M-context arm. That is
the tier this seat was explicitly spawned with; the declaration is **explicit, not inherited**.

---

## Pass note

| | |
|---|---|
| **Subject** | `demo/workbenches/gradient/GradientVisualizer/easing/EasingSpecimenStrip.vue` (216 lines) |
| **Prior passes** | pass 1 → `challenge-D-design.pass-1-2026-07-27.md` (D-01…D-17) · pass 2 → `challenge-D-design.pass-2-2026-07-28.md` (D-18…D-27, C-1/C-2) · pass 3 → `challenge-D-design.pass-3-2026-07-28.md` (D-28…D-36, C-3/C-4) |
| **Corpus read** | `easing/easingCatalogue.ts` · `easing/useSpecimenRows.ts` · `easing/EasingAuthoringStage.vue` · `GradientEasingEditor.vue` · `GradientVisualizer.vue` · `composables/useGradientModel.ts` · glass-ui 7.0.0 `dist/easing.js` + `dist/styles/**` |
| **Canon read** | `VISUAL-CONSTITUTION.md` (228 ll., full) · `PROPORTION-AUDIT.md` (83 ll., full) · `PALETTE-CONTRACT.md` (329 ll. — API/wire authority; confirmed again to carry no visual row for this component) |
| **Owner witness read** | `audit/visual/owner-marked/OM-4-easing-radius-incoherence.png` (read with vision — the first pass of this seat to open the owner's own crop) |
| **Real-Safari captures read** | `shots/safari-desktop-light/gradient.png`, `safari-desktop-dark`, `safari-mobile-light`, `zoom-200-desktop` (vision) + `REPORT.json` / `STATES.json` rows for `/#/gradient` (10 matrices) |
| **Base** | branch `tranche-u`, HEAD `c654824e`, `@mkbabb/glass-ui@7.0.0`, dev server live at `:9000` |
| **Verdict** | **DEFECTIVE** |
| **This pass** | **6 new findings D-37…D-42 · 3 corrections C-5/C-6/C-7 (two of them retire over-claims in earlier passes) · BLOCKER re-verified a third time, now with the library's own error code** |
| **Strongest defect (overall)** | the carried **BLOCKER** (pass 2 D-18 / pass 3 C-3): three of twenty-seven one-click tiles replace the Gradient pane with its error boundary. Re-verified cold this pass; the failure now has a *named* cause — `Gradient color mix failed: color_progress_out_of_range` |
| **Strongest NEW design defect** | **D-40** — the authoring protagonist this strip is support *for* draws at **166.7 px (10.4 rem)** against a canon of **19–22 rem**, inside a well that is **71.8 % empty paper**, because the seat's own 19-rem law keys on a selector glass no longer emits |

Passes 1–3 are good; their rows carry forward. This pass exists because three things had still not
been done: **nobody had opened the owner's own OM-4 crop**; nobody had censused the radius register
of the **whole** easing corpus (every prior census stopped at the closed row and never counted the
disclosed stage, which is where the *widest* full-pill in the card lives); and nobody had measured
any **zoom** arm, although the canon names 400 % explicitly and the shipped harness already ships a
`zoom-200-desktop` capture.

**Probes written and run this pass** (all in this component's audit directory; every number below is
pasted from a probe return, a `grep`, a decoded pixel, or the producer's compiled source — none
estimated):

| probe | what it decides |
|---|---|
| `chD4-radius-corpus.mjs` → `evidence/chD4-tile-geometry.json` | per-tile box / radius / curvature / shape / label-chord geometry, 27 tiles |
| `chD4-corpus-census.mjs` → `evidence/chD4-corpus-census.json` | every non-zero-radius box in the interval card, closed **and** tuned; the shadow-smudge causality diff (light) |
| `chD4-arms.mjs` | 5 viewport/zoom arms + 9 frames |
| `chD4-seat-laws.mjs` | whether `EasingAuthoringStage`'s three seat laws still bind against glass 7 DOM; the drawn-plot rect |
| `chD4-stage-type.mjs` → `evidence/chD4-stage-type-crash.json` | type inventory of the whole card; third cold BLOCKER re-verification |
| `chD4-stage-type-inventory.mjs`, `chD4-dark-trough.mjs`, `chD4-baseline.mjs` | disclosed-stage type; dark-arm shadow diff; 1440 baseline |

**Frames produced:** `shots/chD4-*.png` (9). Load-bearing: `chD4-row-tuned-radius-register.png`
(D-37, D-40, D-41), `chD4-tile-inout-stadium.png` (D-37), `chD4-strip-dark-3x.png` (D-38),
`chD4-strip-mobile-320.png` / `chD4-strip-zoom-400.png` (D-39).

---

## §0 · Visual truth first — what the owner marked, and what Safari actually renders

### §0.1 The owner's own crop (`OM-4-easing-radius-incoherence.png`), read with vision

The owner's mark is *"easing config is awful, too rounded in some areas, not rounded enough in
others."* Opening the witness, four things are visible at once, and only one of them had been named
by prior passes:

1. **Eight full-circle coins.** The tiles read as *coins* — flat discs with a rim — not as specimen
   tiles. Because the shape is a circle, the 9 px variant label sits on the disc's lower chord where
   the available width has already collapsed; on the `in-out` coin the label runs edge-to-edge with
   its ends outside the fill. Quantified in §1.3: **11 of 27 labels have negative clearance.**
2. **A grey band under the coins.** Between and beneath the tiles the pink card turns to a soft
   taupe rectangle with no edges, ending abruptly at the fade cut. It is not a surface anybody
   declared. Quantified and proven causally in §2: it is the union of **27 floating drop shadows.**
3. **A hairline hanging in space** at the right of the `sine` trio with nothing after it — the next
   family's `border-left` whose tiles are off-port (pass 1 D-05's dangling rule, now confirmed in the
   owner's own frame).
4. **Four wildly different corner treatments in one crop** — coin (semicircle), the strip band's
   square cut, the 6 px ramp, the 6 px "pill code row", the 16 px card. The owner counted four; the
   corpus actually carries **six effective radii** (§1.1).

### §0.2 Real-Safari desktop, light and dark

`shots/safari-desktop-light/gradient.png` (1440 × 900, DPR 2). The Easing section sits at the bottom
of the Gradient pane's inspector column. The strip shows **8 of 27** tiles; the taupe shadow band is
plainly visible under the coins — the card's one *undeclared* second surface (the readout rail below
it is a declared `bg-well`). The two eyebrows (`css`, `sine`) float above the coins rather than capping them — pass 3's
D-28 12 px line-box void, visible.

`shots/safari-desktop-dark/gradient.png`. The dark arm is a **different composition, not the same
one re-inked**:

- the coins are *warm brown-taupe* discs on a maroon/plum pane — the tiles read as the warmest,
  lightest objects in the card, on a surface the material table calls neutral (pass 2 D-26);
- the shadow band is **absent** (dark ink on a dark plate — measured in §2: the same declaration
  produces a **6.4× smaller** absolute luminance excursion in dark);
- the selected `linear` label is **cyan** — a hue with no other coordinate anywhere in the scheme,
  at a luminance so close to the resting label that the two are near-isoluminant (pass 3 D-30's
  1.11 : 1);
- the eyebrows are barely separable from the coin fills.

So the light arm ships a phantom container the dark arm does not have, and the dark arm ships an
out-of-register accent hue the light arm renders as teal. `VISUAL-CONSTITUTION.md §2`: *"Dark chrome
uses the restrained neutral pole. Seed tint is forbidden outside the ambient field, active accent,
WatercolorDot/specimen, and pastel Palettes lanes."*

### §0.3 Mobile and 200 % zoom

`shots/safari-mobile-light/gradient.png` — the easing row is the last thing on the page and the strip
is cut by the viewport bottom; what is visible is the `css` family and the leading edge of `sine`.
Measured at 390 (§3): **5 of 27** tiles fully visible.

`shots/zoom-200-desktop/gradient.png` — at 200 % the strip is **not on screen at all**; the capture
ends inside `Interpolation`. Yet `STATES.json`'s `zoom-200-desktop` row still lists
`div.strip-row / div.strip-family / span.family-eyebrow / div.family-tiles / button.glass-chip…` in
its `clipped` array. Checked all ten shipped matrices for `/#/gradient`
(`safari-desktop-light|dark`, `safari-mobile-light|dark`, `zoom-200`, `reduced-motion`,
`forced-colors`, `rtl-desktop`, `rtl-mobile`, `keyboard-focus`): **this component's DOM heads the
overflow/clipping list in 10 of 10.** Pass 1 D-16 found 4 of 4; the true figure is every matrix the
programme captures. No other component on the route appears in any of those lists.

---

## §1 · D-37 · MAJOR · OURS · The radius register of the **whole** easing corpus: four tokens, **six** effective radii, curvature 0.035 → 0.500, no derivation law, and the same declaration renders as both a circle and a stadium

The seat brief asks for *every radius declaration in the easing corpus* and a judgement of the
register. Pass 2 (D-19) censused the closed row. This is the corpus **including the disclosed
authoring stage**, which is where the owner's "too rounded" case is worst — and it changes the
finding.

### §1.1 The census (measured live, 1440, light — `evidence/chD4-corpus-census.json`)

Declared, source side (`grep -rn "radius\|rounded" demo/workbenches/gradient/`): the strip itself
declares **zero** radii in 216 lines; `EasingAuthoringStage.vue` declares zero; every radius in the
corpus is either a parent class (`GradientEasingEditor.vue:114,153,176,242,274`) or a producer
default.

Rendered, exhaustively, with the authoring disclosure OPEN:

| box | rendered | declared | effective `r` | **curvature `r ÷ min-dim`** |
|---|---:|---|---:|---:|
| interval card (tuned) | 462 × 518.5 | `16px` (`rounded-card`) | 16 | **0.035** |
| `.glass-card` authoring well | 436 × 226 | `16px` (producer) | 16 | **0.071** |
| rail buttons ×2 | 24 × 24 | `var(--radius-input)` → `4px` | 4 | **0.167** |
| readout rail | 436 × 32 | `6px` (`rounded-md`) | 6 | **0.188** |
| eased ramp | 436 × 20 | `6px` (`rounded-md`) | 6 | **0.300** |
| **PRESET combobox** | **436 × 40** | **`9999px`** (producer control) | 20 | **0.500** |
| specimen tiles ×27 | 44–45.2 × 43.8 | `9999px` (`.glass-capsule`) | 21.9 | **0.500** |
| specimen dots ×2 | 10 × 10 | `9999px` (hand-rolled, `:242`) | 5 | **0.500** |

**Four declared tokens → six distinct effective radii `{4, 5, 6, 16, 20, 21.9}` → a curvature range
of 0.035…0.500, a 14.3× spread inside one card.**

### §1.2 Correction C-5 · "curvature runs inversely to box size" is **false** — the truth is worse

Pass 2 D-19's first judgement was that curvature is inversely proportional to size (smallest boxes
most rounded). The disclosed stage falsifies it: the **436 × 40 PRESET combobox is the widest control
in the card and it is a full pill (0.500)** — the same curvature as the 10 px dot. Meanwhile the
20 px-tall ramp is 0.300 and the 24 px buttons are 0.167.

There is therefore **no monotone relation at all**. Radius here is not derived from anything: it is
whatever each species' provenance happened to carry — `rounded-card` from the plate, `rounded-md`
twice from Tailwind rungs, `--radius-input` once, and `9999px` from *three unrelated sources* (a
hand-rolled `9999px` on the dots, `.glass-capsule` on the chips, a producer control class on the
combobox). That is precisely the owner's *"too rounded in some areas, not rounded enough in others"*,
and stating it as "unconditioned" rather than "inverted" matters, because an inverted register can be
fixed by flipping a ladder while an unconditioned one needs a **derivation law**.

### §1.3 The nested corners are not concentric — three sites, measured

The card is 462 wide with `r = 16`; its inner children are 436 wide. The inset is
`(462 − 436) / 2 = 13 px` (1 px border + `px-3`). The concentric-radius law for a child inset by `d`
inside a parent of radius `R` is `r_child = R − d` = **3 px**. Measured:

| child | inset | concentric target | actual | error |
|---|---:|---:|---:|---:|
| eased ramp | 13 px | 3 px | 6 px | **2.0×** |
| readout rail | 13 px | 3 px | 6 px | **2.0×** |
| `.glass-card` well | 13 px | 3 px | **16 px** | **5.3×** |
| specimen tile | 15 px | 1 px | 21.9 px | **21.9×** |

The authoring well carries **the same absolute radius as its grandparent at a 13 px inset** — the
textbook non-concentric nesting error, and it is visible in `chD4-row-tuned-radius-register.png` as
two corner arcs that visibly diverge. This is the missing law `DESIGN-CANON-BRIEF.md:73` asks for
(*"RADIUS DERIVATION: how a nested register derives from its parent; when circle may sit beside
rounded-rect"*) — and this report is the measurement that law needs, not a licence to invent one
locally.

### §1.4 One declaration, two shapes — and 11 of 27 labels break out of their own tile

`border-radius: 9999px` on an auto-width box is **not** "a circle": it is a stadium whose curvature
depends on content. Measured over all 27 tiles (`evidence/chD4-tile-geometry.json`):

- **18 tiles are circles** (44 × 43.8) and **9 are stadiums** (45.23 × 43.8) — every `in-out` variant
  plus `linear` and `smooth-step-3`, i.e. the tiles whose 6-character labels exceed the 32 px content
  box. One declaration, two silhouettes, alternating along the rail. Visible as the ragged rhythm
  pass 1 D-13 recorded; the *cause* is that the shape is content-driven.
- The label sits on a chord, not on a width. At the label's vertical mid-line the shape's chord is
  **36.16 px** (circle) / **37.4 px** (stadium); at the label's **bottom** edge it is **25.44 px** /
  **26.67 px**. Clearance at that bottom edge (`chord − labelWidth`):

| label | width | chord at label bottom | clearance |
|---|---:|---:|---:|
| `in` | 11.08 | 25.44 | +14.36 |
| `out` / `end` | 16.63 | 25.44 | +8.81 |
| `ease` | 22.16 | 25.44 | +3.28 |
| `n = 4` / `start` | 27.70 | 25.44 | **−2.27** |
| `in-out` / `linear` / `smooth` | 33.23 | 26.67 | **−6.56** |

**11 of 27 tiles have negative clearance** — the label's lower corners lie *outside* the tile's own
fill, and `overflow: visible` (`:179` for the glyph; the chip root is `overflow: visible` measured)
lets the ink sit on the rim. `chD4-tile-inout-stadium.png` is the 6× frame: the `i` and the `t` of
`in-out` are on the boundary.

This is the geometric root of the owner's "too rounded": **a circle cannot hold a square portrait
plus a horizontal word.** The inscribed square of a 43.8 px disc is 30.97 px; the design puts a 22 px
glyph *and* a 33 px label inside it. A specimen portrait is a unit box; its container should be one
too.

**Disposition.** Ours, and it does **not** wait for glass. Confirmed from the producer's orphaned
sheet (`dist/styles/glass/glass-chip.css`): `.glass-chip--cell, .glass-chip--cell.glass-capsule
{ border-radius: var(--radius-card) }`. When glass lands it, the tile becomes 16 px → curvature
0.364 — still the most-rounded box in the card and now carrying *the same absolute radius as the
462 px plate and the 436 px well*. The register stays incoherent. The cure is a derivation law in our
register (child radius derives from parent radius minus inset; a full pill is reserved for a single
species) **plus** the standing ask on glass for a cell radius that derives from the chip's own box.
A local `border-radius` override in this SFC would be a per-instance override (edict 5) and a masking
fallback (edict 2 / MT-F014).

---

## §2 · D-38 · MAJOR · OURS (decision) + glass (mechanism) · The 27 drop shadows manufacture a phantom container — proven causally, and only in light

The grey band in the owner's crop and in both Safari desktop captures is not a surface. I injected
`box-shadow: none !important` on the chips at runtime (read-only probe, no repo edit) and decoded the
same 3 px trough between tile 1 and tile 2 before and after, DPR 2:

```
LIGHT   trough mean RGB   shadows ON  (229.2, 184.9, 192.9)   relative luminance 0.5519
                          shadows OFF (244.0, 197.0, 205.4)   relative luminance 0.6359
        ΔL = 0.0840   →   13.2 % of the card's luminance, band vs card = 1.14 : 1
        control band ABOVE the tiles (inside the port, no shadow reach):
                          ON  (244.0, 194.7, 205.6)  OFF (244.0, 194.7, 205.6)   ← byte-identical
DARK    trough mean RGB   shadows ON  (115.0, 79.1, 83.1)     luminance 0.0988
                          shadows OFF (122.0, 84.0, 88.4)     luminance 0.1119
        ΔL = 0.0131   →   6.4× smaller absolute excursion than light
```

The control region proves the localisation: the 12 px line-box void above the tiles is untouched, so
the darkening is exactly the union of the shadows under and between the coins. That union is the
"band" — an unowned, edgeless, mid-tone rectangle that terminates at the fade mask, i.e. a container
the design never declared and cannot control.

Three canon rows, all naming it:

- `VISUAL-CONSTITUTION.md §2` — *"Instrument veil … no drop shadow"*; *"One surface has one tier. An
  inner card is not automatically another pane of glass."*
- `VISUAL-CONSTITUTION.md §3.8` — *"Supporting fixtures do not compete with it through equal size or
  equal shadow."* Pass 3 measured the tiles at **3.0× the blur and 2.33× the ink** of the card that
  holds them; this pass shows what that produces on screen.
- `PROPORTION-AUDIT.md PR-05` — *"Dividers, caster shadows and corner marks repeat a boundary →
  REMOVE."*

And the seat's own host declares the opposite law two files up (`GradientEasingEditor.vue:108-110`:
*"flat on the plate … no shadow"*).

**Why it is ours.** The mechanism is `.glass-capsule`'s unconditional
`--glass-shadow-floating` (banked as MT-F026); the **decision** to seat 27 floating capsules inside a
declared-flat in-plate row is ours. The light/dark asymmetry is the part no ask can fix: a single
shadow declaration cannot produce the same register on a light plate and a dark one, so a component
that depends on it has no scheme-invariant design. Tiles here are **wells**, not floating chips.

---

## §3 · D-39 · MAJOR · OURS · The rail is rigid: identical at 1440, at 200 % zoom, at 400 % zoom, at 390 and at 320 — while its port shrinks by 48 %

Five arms, measured (`chD4-arms.mjs`; zoom arms emulate the CSS viewport and DPR that browser zoom
produces on a 1440 × 900 display — labelled as emulation, not in-app zoom, per `PROPORTION-AUDIT §3.2`):

| arm | viewport | port width | **content `scrollWidth`** | tile box | label px | tiles fully visible | **off-port** |
|---|---|---:|---:|---|---:|---:|---:|
| desktop 100 % | 1440 × 900 | 436 | **1482** | 45.23 × 43.8 | 9 | 8 / 27 | **70.4 %** |
| zoom 200 % | 720 × 450 @4× | 436 | **1482** | 45.23 × 43.8 | 9 | 8 / 27 | **70.4 %** |
| zoom 400 % | 360 × 225 @8× | 268 | **1482** | 45.23 × 43.8 | 9 | 5 / 27 | **81.5 %** |
| mobile 390 | 390 × 844 @3× | 298 | **1482** | 45.23 × 43.8 | 9 | 5 / 27 | **81.5 %** |
| mobile 320 | 320 × 568 @3× | 228 | **1482** | 45.23 × 43.8 | 9 | **4 / 27** | **85.2 %** |

Three separate defects fall out of one table:

1. **The content rail is a constant.** `scrollWidth = 1482 px` at every arm; the tile box and the
   9 px type never move. The component has **no responsive law of any kind** — not a breakpoint fork
   (which the canon forbids), not container scaling (which the canon requires).
   `VISUAL-CONSTITUTION.md §3.7`: *"Spacing is container-scaled from glass-ui tokens."* This is
   container-*independent*.
2. **At 320 px, 85.2 % of a 27-item catalogue is unreachable without horizontal scrolling, and there
   is no scroll affordance at all.** Measured `offsetHeight − clientHeight = 0` on the port: no
   scrollbar is rendered, in either scheme, at any arm. A 27-item rail with 4 items visible, no
   scrollbar, no paging control, no wrap, and (pass 2 D-24) a nameless roleless tab stop as its only
   keyboard entry.
3. **No wrap policy exists.** A single-line rail of 27 equal cells is precisely the content
   `PROPORTION-AUDIT §5.7` distinguishes: *"Visual glyph size, operable target size and layout
   reservation are separate quantities."* Wrapping to two or three lines at ≤ 390 px would cost
   nothing and is the ordinary answer; the design never considers it, so the 400 % arm inherits a
   two-dimensional scroll for content that has no two-dimensional structure.

Frames: `chD4-strip-zoom-400.png`, `chD4-strip-mobile-320.png` (4 coins and a hard-cut fifth).

---

## §4 · D-40 · MAJOR · OURS · The protagonist this strip exists to support draws at **10.4 rem** against a **19–22 rem** canon, in a well that is **71.8 % empty paper** — and the seat's own 19-rem law is dead

Pass 3 D-32 measured the *disclosure* (436 × 311.6 when opened, 0 × 0 at rest). Nobody measured the
**drawn curve**. With the stage disclosed (`chD4-seat-laws.mjs`):

```
.easing-authoring          436 × 311.6
  .glass-card (the well)   436 × 226      radius 16px, shadow none, backdrop none
    svg[role="group"]      410 × 200      viewBox 1 × 1.2, preserveAspectRatio "xMidYMid meet"
      rect.stroke-border   166.7 × 166.7  ← the unit plot: THE CURVE STAGE
```

- Drawn stage = **166.7 px = 10.42 rem**. `VISUAL-CONSTITUTION.md §7`, Easing: *"The curve is a
  centered, container-clamped **19–22 rem** stage."* **54.8 % of the canon floor.**
- Horizontal letterbox = `410 − 166.7 = 243.3 px`, i.e. **59.3 % of the stage box is empty paper**,
  121.65 px on each side (`xMidYMid meet` centres a 1 × 1.2 viewBox in a 410 × 200 box, so the scale
  is bound by height: `200 / 1.2 = 166.7`).
- Well occupancy = `166.7² / (436 × 226) = 27 789 / 98 536` = **28.2 %**; **71.8 % of the well is
  blank**.
- **The support out-measures the protagonist.** Strip port = 436 × 72 = 31 392 px². Drawn curve =
  27 789 px². The selection support's *port alone* is **1.13×** the area of the authoring
  protagonist's drawn plot — and the strip is visible at rest while the curve needs a second,
  unsignposted click (`tuneOpen` initialises `{}`, `GradientEasingEditor.vue:84`).
  `PROPORTION-AUDIT.md PR-09`: *"Gradient/Easing protagonist subordinated → **ENLARGE** → One
  19–22 rem protagonist; support subordinate."*

**Why it renders that way — and the trap in the obvious cure.** `EasingAuthoringStage.vue` declares
three seat laws. Laws 1 and 2 bind (measured: `[data-testid="easing-picker"]` present,
`grid-template-columns: 436px`; `.glass-card` → `box-shadow: none`, `backdrop-filter: none`). **Law 3
does not exist at runtime**, because both halves key on `svg[role="img"]` and the producer emits
`role="group"`. From glass-ui 7.0.0's own compiled source (`dist/easing.js`, offset 10837):

```js
h("svg", { class:"block w-full touch-none select-none", viewBox: rt.value,
           preserveAspectRatio:"xMidYMid meet",
           style:{ "aspect-ratio":"1", "block-size":"clamp(200px, 38cqi, 320px)",
                   "margin-inline":"auto" },
           "aria-label": e.label, role:"group", … })
```

Measured consequence: `--vb-ratio` is **frozen at its `1.2` literal birth default** (`:45`) because
`syncVbRatio` (`:48`) queries a selector that never matches; the four `!important` overrides at
`:104-115` are inert; the producer's inline clamp rules (`block-size` resolved **200 px**,
`aspect-ratio` computed **`1 / 1`**, `margin-inline: auto`). This inertness was already found on the
implementation axis — **credit `challenge-C-implementation.md` C-05 and the sibling
`wb-gradient-easingauthoringstage/challenge-C-implementation.md`**, which established that
`role="img"` was removed at glass 6.0.0. The **design** halves are new and are what this row adds:
the canon shortfall above, and this —

> **The obvious cure is a design defect.** C's proposed cure is to re-key Law 3 onto
> `[data-testid="easing-picker"] svg`. Doing that as written would *activate*
> `transition: aspect-ratio var(--duration-normal) var(--ease-standard)` (`:114`) — an animation of
> **`aspect-ratio`, which is a layout property**. It cannot be composited; every frame of the
> "liquid morph" would re-lay-out an SVG canvas and everything below it in the pane, on every regime
> flip (linear → back → steps). The brief's question *"does it animate a property that forces
> layout?"* is currently answered "no" only **because the rule is dead**. The correct cure sizes the
> canvas without animating a layout property (a fixed block-size ladder, or animate nothing), and it
> raises the drawn stage to the canon's 19–22 rem — which the seat's own dead declaration
> (`inline-size: min(100%, 19rem)`) shows was always the intent.

---

## §5 · D-41 · MAJOR · OURS · The card's type register: four visible sizes, two families, and the **least actionable** ink is the largest while the twenty-seven choices are the smallest

Complete inventory of every text-bearing node in the interval card, disclosure open (43 nodes,
`evidence/chD4-stage-type-crash.json` + `chD4-stage-type-inventory.mjs`):

| ink | rendered px | family | role in the card | §4 rung |
|---|---:|---|---|---|
| readout literal `cubic-bezier(0, 0, 1, 1)` | **16.4** | Fira Code | a value you can only copy | `text-mono-small` ✓ |
| head interval `1 → 2` and curve name `linear` | **16.4** | Fira Code | row identity | `text-mono-small` ✓ |
| producer combobox `Pick a curve` | **16.4** | Plus Jakarta Sans | a placeholder that never reflects state (pass 3 D-29) | `text-small`-ish ✓ producer |
| producer section label `PRESET` | **14.384** | Fira Code, uppercase, `letter-spacing: 1.4384px` | producer section label | no §4 rung is mono-uppercase-tracked |
| **27 tile labels** | **9** | Fira Code | **the twenty-seven things you choose between** | **no rung — 0.55× the smallest** |
| **8 family eyebrows** | **9** | Fira Code | the strip's entire information architecture | **no rung** |
| canvas axis ticks `0` / `1` | `0.05` user-units → ≈ **8.3** effective | Fira Code | stage annotation | size-coupled to the plot (§4: at the canon 19 rem they would render ≈ 15 px) |

Judgements:

1. **Hierarchy inverted, measurably.** The largest ink in the card is a machine literal at 16.4 px;
   the selectable specimen labels are 9 px. Ratio **1.82 : 1** against the actionable content.
   `PROPORTION-AUDIT §5.10`: *"Readout and editing are separate jobs"* — and §5.13's role matrix
   puts *control or label* at `text-small`, which resolves here to 16.4 px. 9 px is not a rung; it is
   a hand-rolled `0.5625rem` (`:149`, `:195`).
2. **Four visible sizes and two families inside one bounded object.** `VISUAL-CONSTITUTION.md §4`:
   *"This matrix is closed across all eighteen compositions."* The card's mono usage alone spans
   three species (16.4 identity/value, 14.384 uppercase-tracked producer label, 9 px seat labels).
3. **The 9 px labels also carry the component's only meaning.** Combined with pass 3's D-30
   (selected↔unselected label ink 1.16 : 1 light / 1.11 : 1 dark), the design encodes "which of 27
   curves is active" in a hue step on **9 px** type. Two independent floors under one signal.
4. The axis ticks being `font-size: 0.05` user units is worth recording as a coupling: the producer's
   canvas type scales with the stage, so D-40's undersized stage also renders the stage's own
   annotation at ≈ 8.3 px. Fixing the stage size fixes this for free; patching the tick size would be
   the wrong repair.

---

## §6 · D-42 · MAJOR · OURS · State coverage: the brief's enumeration, completed — five states were never designed, and one of them is the BLOCKER's mitigation

| state | handled? | evidence |
|---|---|---|
| empty (no intervals) | **yes — a positive** | `GradientVisualizer.vue:239` `v-if="intervals.length > 0 && stops.length >= 2"`; `useGradientModel.ts:123` refuses to drop below 2 stops. The section cannot render empty. |
| loading | n/a | catalogue is synchronous module state (`easingCatalogue.ts:198`) |
| populated | yes | 27 tiles, 8 families |
| **error** | **NO** | the only error surface is the *pane* boundary, reached **by pressing a tile** (§7 C-6). No per-tile, per-row or per-strip error state exists. |
| **disabled** | **NO — and the producer ships it** | orphaned `glass-chip.css`: `.glass-chip[data-disabled] { opacity: var(--opacity-disabled) }`. The strip never passes `disabled` (`:98-107`). Three tiles are *known* to destroy the pane and are offered as ordinary choices. |
| focused | yes | house `--focus-ring-shadow`; survives forced colors (pass 3 D-36) — but clipped by 2 px of port headroom (pass 1 D-11) |
| hovered | **broken** | `:hover .tile-label` (`:212`) overrides `[data-state="on"] .tile-label` (`:208`) at equal specificity and later source order → hovering the selected tile **erases half its selected register** (pass 1 D-03) |
| active / pressed | **NO surface delta today** | `.glass-chip--interactive`'s press scale and the `[data-state="on"]` wash live in the orphaned sheet (§7 C-7) |
| selected | colour-only, isoluminant | pass 3 D-30 |
| dragging | n/a (no reorder) — but see scroll | the port is drag-scrollable only by trackpad convention; **no scrollbar rendered** (measured 0 px, §3) |
| **overflowing** | **NO affordance** | 70.4 % → 85.2 % off-port; the only cue is a 16 px mask feather that also fades the *selected* tile in RTL (pass 3 D-34) |
| **truncated** | **NO policy** | labels never truncate; `white-space: nowrap` (`:199`) widens the tile instead, which is what turns 9 of 27 circles into stadiums (§1.4) |
| RTL | broken | pass 1 D-05 (physical `border-left`/`padding-left`), pass 3 D-34 (fade on the wrong edge) |
| reduced motion | **yes — a positive** | `:74` resolves the reveal to `behavior: "auto"`; the global carve-out strips `scale` from the producer transition list (re-verified pass 3 §3) |
| forced colors | survives, but selection ≡ focus colour | pass 3 D-36 |
| **`prefers-contrast: more`** | **NO** | `demo/styles/foundation.css:728` ships an elevated-contrast layer for the app; the chip's own arm — `@media (prefers-contrast: more) { .glass-chip[data-mode="selectable"][data-state="on"] { border-color: … } }` — is in the **orphaned** sheet. So the one state that would rescue the isoluminant selection is unloaded. |
| `prefers-reduced-transparency` | partial | `foundation.css:764` + producer `paper.css` handle grain/specular; nothing addresses the chip fill |
| zoomed 200 % / 400 % | **NO** | §3 — geometry is constant, off-port grows to 81.5 % |

The row that matters most: **`disabled` exists in the producer, the design knows three of its
twenty-seven choices are lethal, and it offers them anyway.** Disabling them would be a mask over the
real defect (the timing→colour seam, pass 3 C-3) and is *not* the cure — but a design that has
enumerated its own states would have had to notice the contradiction. It never enumerated them.

---

## §7 · Corrections to earlier passes

### C-5 · Pass 2 D-19's "curvature is inversely proportional to size" is falsified

See §1.2. The 436 × 40 PRESET combobox is the widest control in the card at curvature 0.500. The
register is **unconditioned**, not inverted. D-19's conclusion (OM-4 cannot be banked and waited out;
the glass cell radius does not cure it) **stands** and is strengthened by §1.3's concentricity
measurements.

### C-6 · The BLOCKER is **not** silent: the library names the seam

Third cold re-verification this pass (`chD4-stage-type.mjs`, fresh context, one click, Chromium):

```
ease-in-out-back   before {tiles:27, rows:1}   after {tiles:0, rows:0}   survived:false  pageErrors:[]
                   body: "This panel hit an unexpected error. Gradient color mix failed:
                          color_progress_out_of_range"
ease-out-quad      before {tiles:27, rows:1}   after {tiles:27, rows:1}  survived:true
```

Pass 3 C-3 reported "zero console errors, zero page errors — the boundary swallows it silently."
Console/page errors are indeed zero, but the **boundary renders a diagnostic**, and that diagnostic
is the library's own error code: **`color_progress_out_of_range`**. This confirms C-3's predicate
(`range(fn) ⊄ [0,1]`) from the *other* side of the seam — `src/` is refusing an out-of-domain
progress value, correctly. The cure is a named projection at the timing→colour boundary, and this
error code is the assertion that projection must satisfy. (It also means the failure is *diagnosable
in the field*, which slightly reduces the severity of the silence but not of the failure.)

### C-7 · Pass 3 D-30's "this survives the glass fix, and is therefore ours" is too strong

I verified the orphan precisely — `grep -o "@import[^;]*;" index.css | wc -l` → **38**,
`… glass.css | wc -l` → **18**, `grep -o "glass-chip" index.css glass.css | wc -l` → **0**. So
**neither sheet imports `glass/glass-chip.css`**, while
`glass/accent-tone.css` and `glass/glass-capsule.css` *are* imported — so `--accent-band`,
`--accent-edge`, `--accent-ink` resolve today but nothing consumes them. The orphaned sheet contains:

```css
.glass-chip[data-mode="selectable"][data-state="on"] {
    --chip-flood-t: 1; background-color: var(--accent-band);
    border-color: var(--accent-edge); color: var(--accent-ink); }
.glass-chip--interactive { scale: calc(1 + 0.12 * var(--chip-flood-t) * var(--motion-weight, .618)); }
.glass-chip[data-mode="selectable"]::after { /* radial accent flood, mix-blend-mode: plus-lighter */ }
.glass-chip--cell { border-radius: var(--radius-card); }
@media (pointer: coarse) { .glass-chip--interactive { min-inline-size: var(--touch-target, 2.75rem); … } }
@media (prefers-contrast: more) { .glass-chip[data-mode="selectable"][data-state="on"] { border-color: … } }
.glass-chip[data-disabled] { opacity: var(--opacity-disabled); }
```

So when glass lands the sheet, selection regains **a fill, a border, a 12 % scale punch and an
elevated-contrast arm** — a genuine non-colour delta. D-30's *measurement* (1.16 : 1 / 1.11 : 1) is
correct and its verdict on the shipped build stands; but its claim that the isoluminance survives the
glass fix is wrong. What survives as **ours** is narrower and should be recorded that way:

1. the selected **glyph and label** ink (`:204-211`) is still hue-only, and the hue is
   `--motion-accent` = an arbitrary user colour;
2. `useSafeAccentFn("resting")` certifies that ink against a **surface**, never against the **other
   state**, so the state-to-state delta is guarded by nothing (this part of D-30 is exactly right and
   is the durable half);
3. the signal still rides **9 px** type (§5).

Retiring the over-claim matters for disposition: the *surface* half of D-30 is **BANK on glass (M3)**;
the *ink-certification* half and the 9 px type are ours.

---

## §8 · Consolidated disposition — pass 4

| Row | Owner | Disposition |
|---|---|---|
| **BLOCKER** (carried, 3× verified) — 3 of 27 tiles blank the Gradient pane; predicate `range(fn) ⊄ [0,1]`; library code `color_progress_out_of_range` | **ours** | one named projection at the timing→colour seam, every sample. Not three deletions, not `try/catch`, not `disabled` tiles. |
| **D-37** radius register: 4 tokens → 6 effective radii → curvature 0.035…0.500; non-concentric at 4 nesting sites; 9/27 tiles are stadiums; 11/27 labels break the fill | **ours** (OM-4 / MT-F030) + ask on glass | a **derivation law** (child radius = parent radius − inset; one species owns the full pill) + the standing ask for a box-derived cell radius. The glass fix alone does **not** cure OM-4. |
| **D-38** 27 floating shadows manufacture a phantom container; ΔL 0.084 light vs 0.013 dark (6.4×) | ours (decision) + **glass MT-F026** (mechanism) | tiles are **wells**; BANK the producer half. No local shadow cancel (edict 5 + edict 2). |
| **D-39** rigid rail: `scrollWidth` 1482 at every arm; off-port 70.4 → 85.2 %; zero scrollbar; no wrap policy | **ours** | a container-scaled specimen surface: wrap or page, and a visible overflow affordance. |
| **D-40** protagonist draws at 10.4 rem vs canon 19–22 rem; 71.8 % of the well is blank; 59.3 % letterbox; Law 3 inert (credit challenge-C C-05); the re-key would animate `aspect-ratio` | **ours** — W27 / PR-09 | protagonist first, at 19–22 rem; size the canvas without animating a layout property; delete the inert `--vb-ratio` apparatus rather than reviving it verbatim. |
| **D-41** four visible type sizes / two families in one card; 9 px choices vs 16.4 px literal (1.82×) | **ours** | §4's closed matrix; the 9 px hand-rolled rung dies. |
| **D-42** five states never designed (error, disabled, overflow affordance, truncation, `prefers-contrast`), plus the hover-erases-selection defect | **ours** + one glass row (`prefers-contrast` arm is in the orphan) | enumerate states in the design, not in the audit. |
| **C-5** pass 2 D-19's inverse-curvature claim | correction | register is **unconditioned**; D-19's disposition unchanged. |
| **C-6** pass 3 C-3's "silent" | correction | the boundary surfaces `color_progress_out_of_range`; the predicate is confirmed from the library side. |
| **C-7** pass 3 D-30's "survives the glass fix" | correction | surface half → **BANK on glass**; ink-certification + 9 px type → ours. |

**Glass rows to bank (cumulative, all passes): M3 / I-9 / D58.** The orphaned `glass-chip.css` costs
**seven** distinct registers, now enumerated from the file itself: cell radius, the
`[data-state="on"]` accent wash, the accent flood `::after`, the `--chip-flood-t` press scale, the
`pointer: coarse` 44 px floor, the `prefers-contrast: more` arm, and `[data-disabled]`. Plus
`.glass-capsule` conflating shape + warm tint + floating elevation (MT-F026), `FadingScroll`'s
nameless tabbable port and physical-direction fade, an `EasingPicker` `:presets` door (pass 3 D-29),
and a box-derived cell radius.

**The BLOCKER is ours. The majority of rows are ours. The glass residual is real but it is not the
reason this component is defective.**

---

## §9 · What passes — re-verified this pass, not restated

- **The empty state is impossible by construction** (`GradientVisualizer.vue:239` +
  `useGradientModel.ts:123`). A guard, not a fallback. Correct.
- **Laws 1 and 2 of the authoring seat bind** — measured `grid-template-columns: 436px` on
  `[data-testid="easing-picker"]`, and the well is genuinely flat (`box-shadow: none`,
  `backdrop-filter: none`, opaque fill). Only Law 3 is dead.
- **`prefers-reduced-motion` is honoured** and the reveal degrades to `behavior: "auto"`.
- **No layout-forcing animation runs today** (and §4 explains why that is luck).
- **Native `<button aria-pressed>` selection semantics with exactly one true seat** — the same law
  the canon imposes on palette seats. No listbox fiction.
- **The refusal of `scrollIntoView`** (`:37-46`) remains exemplary: it names the O-19 defect it
  prevents and writes one axis on one element.
- **Zero re-derived curve maths**; literals byte-mirrored against the picker's own law
  (`easingCatalogue.ts:48-56`).
- **Edicts 1, 6, 7, 8 clean**: one job in 216 lines; no animation deleted; `useTemplateRef` (`:48`)
  and reactive props destructure (`:18`); all 16 type imports are `import type` under
  `verbatimModuleSyntax`.

The data layer of this corpus is genuinely good. What fails is the *design*: a selection surface
whose shape cannot hold its own content, whose radii answer to nothing, whose only state signal is a
hue step on 9 px type, which is rigid at every viewport, which manufactures a container out of
shadows, and which is larger than the protagonist it was written to support.

---

**No source edits land from this formation.** Nothing under `src/`, `demo/`, `api/`, `test/`, `e2e/`,
`docs/tranches/V/vnext/`, `scripts/dev/dev.sh` or any `INBOX.md` was touched. Runtime CSS injection
in the shadow-causality probe happened in the browser only. This seat wrote exclusively under
`docs/tranches/V/megatranche/audit/components/wb-gradient-easingspecimenstrip/`; pass 3's report was
preserved verbatim at `challenge-D-design.pass-3-2026-07-28.md` before this file replaced it.
