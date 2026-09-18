# CHALLENGE-D — `EasingAuthoringStage.vue` — the design is wrong

## Model receipt

I observe myself to be **Opus 5 (`claude-opus-5[1m]`, 1M context)** — the tier this seat was
explicitly spawned with. Seat declared, not inherited.

---

## 0. Provenance

| Field | Value |
|---|---|
| Subject | `demo/workbenches/gradient/GradientVisualizer/easing/EasingAuthoringStage.vue` (116 lines) |
| Tree HEAD at audit | `9268f054` (task named `c654824e`; `git diff --stat c654824e HEAD -- <subject>` is **empty** — the subject is byte-identical, so the drift is immaterial) |
| Producer | `@mkbabb/glass-ui@^7.0.0`, installed **7.0.0**, `dist/easing.js` (19 375 B) read in full |
| Routes | `/#/gradient` only (`grep -rn EasingAuthoringStage demo/` → 2 hits, both in `GradientEasingEditor.vue`). There is **no** `/#/easing` route in the shipped router; the constitution's `/easing` member is unbuilt. |
| Live probes | WebKit (Playwright `webkit`) against the live dev server `http://localhost:9000`, 8 matrices. Scripts committed beside this file (`EASD-*.mjs`); shots in `./shots/`. |
| Canon read | `PROPORTION-AUDIT.md`, `VISUAL-CONSTITUTION.md`, `PALETTE-CONTRACT.md`, `OPTICAL-BENCH-COMPOSITIONS.md §5` (via VC §4.2 cite) |
| Corpus read | `GradientEasingEditor.vue` (295), `easing/useSpecimenRows.ts` (74), `composables/useGradientCSS.ts`, `composables/useGradientInterpolation.ts`, `src/color/operations.ts`, `src/easing.ts`, `demo/styles/{animations,foundation}.css`, `e2e/smoke/oracles/o17-easing-composition.spec.ts` |

**Convergence note (honesty).** The sibling seat's `challenge-L-library.md` (already in this
directory) independently found D-1 and D-2 below by a different route. I found them before reading
it and re-verified both with my own instruments; I flag the overlap rather than claim novelty. The
design-axis findings **D-3 … D-13** and the **live-RED O-17 oracle run** are mine.

---

## 1. Verdict

**DEFECTIVE.** Two BLOCKERs, six MAJORs, five MINORs.

This component's header comment declares three laws it imposes on the producer. **One of them —
the one the whole file exists for — has never executed against the pinned producer.** The
`--vb-ratio` ref, `syncVbRatio()`, the `onMounted`, the `watch`, the two `requestAnimationFrame`
schedulers, the `:style` binding, and the entire Law-3 CSS block are dead weight around a selector
that matches zero elements. The rendered result is the exact defect the file names in its own
prose: **59.3 % of the authoring canvas is empty letterbox.**

And the instrument it seats is a loaded gun: **two keypresses on its own canvas destroy the
`/#/gradient` route.**

The strongest single defect: **D-1** — the seat's constitutive law is inert, and the e2e oracle
written to certify it is *equally* inert (it fails on the same dead selector), so the design has
been shipping unguarded and unobserved.

---

## 2. Visual truth

Read `./shots/desktop-light-open-row.png`, `./shots/desktop-dark-open-row.png`,
`./shots/mobile390-light-open-row.png` first. The stage is **closed by default**
(`tuneOpen = ref({})`, `GradientEasingEditor.vue:84`), so it does **not** appear in
`audit/visual/shots/**/gradient.png` — the whole matrix capture is blind to this component. That
absence is itself the reason the defects below survived: *the standing visual audit has never
photographed this component.* I disclosed it and photographed it.

What the frames show, in design terms:

1. **A small square marooned in a wide field.** The well spans the full plate width; the drawn plot
   is a ~167 px square floating in the middle of it. The composition reads as a rendering failure,
   not a decision. The optical margins around the unit square are **121.67 px horizontal vs
   16.67 px vertical — a 7.3 : 1 asymmetry** (§7.D-10). No rhythm in the plate tolerates that.
2. **The instrument is smaller than the specimen strip above it.** The strip's chips are ~76 px
   tall in a full-width band; the *authoring* canvas — the protagonist of the disclosure it
   opens — draws 167 px of ink. The support out-masses the protagonist in visual density.
   VC §3.8: *"One pane may have one full-strength visual protagonist. Supporting fixtures do not
   compete with it through equal size."*
3. **The instrument contradicts itself in words.** Directly above the canvas, the specimen strip
   shows **`linear` selected** (highlighted chip, `stripSelected: ["linear"]`). Directly below the
   canvas, the picker's own control labelled **`PRESET`** reads **"Pick a curve"** — its empty
   placeholder. Two selection surfaces for one job, and the lower one is lying. Visible in all
   three light/dark/mobile frames.
4. **Dark mode is not designed, only inherited.** The well is `--well-bg` in both schemes and the
   curve is `--motion-accent`; nothing else changes. The `stroke-border/40` grid and the
   `fill-muted-foreground/60` axis glyphs are the producer's — at the rendered scale the `0`/`1`
   axis annotations are **8.33 CSS px** (§7.D-9) and are effectively invisible in the dark frame.
5. **Mobile is desktop, unchanged.** `block-size` measures **200 px at 1440 px and at 390 px**
   (§7.D-11). The producer's own container-query responsiveness (`clamp(200px, 38cqi, 320px)`) is
   pinned at its floor in this seat at every viewport; the seat's law that was supposed to replace
   it does nothing. There is no mobile size budget at all.
6. **Forced colors** (`./shots/forced-colors-open-row.png`): the seat's Law-2 well is
   `background: var(--well-bg); border: 1px solid var(--card-edge)` — pure author colour with no
   WHCM carve-out, and `.easing-authoring` is absent from the demo's tier-1 roster at
   `demo/styles/foundation.css:678-696`. The well/plate tone-step — Law 2's entire product —
   has no forced-colors design (§7.D-13).
7. **The crash frame** (`./shots/route-crash-after-overshoot.png`): a bare `Try again` pill on the
   atmosphere. No heading, no diagnosis, no route identity, no landmark. That is the state a user
   reaches by pressing `Shift+↑` twice on this component's canvas.

---

## 3. Measured geometry (WebKit, live)

`EASD-probe.mjs` / `EASD-overshoot.mjs`, pasted verbatim:

```
=== desktop-light (1440×900, DPR2)
 "svgRoleImgFound": false,
 "svgRoleAttr": "group",
 "vbRatioVar": "1.2",
 "svgInlineStyle": "aspect-ratio: 1 / 1; block-size: clamp(200px, 38cqi, 320px); margin-inline: auto;",
 "computed": { "aspectRatio": "1 / 1", "blockSize": "200px", "inlineSize": "410px",
               "marginInlineStart": "0px", "transitionProperty": "all", "transitionDuration": "0s" },
 "rect": { "w": 410, "h": 200 }, "viewBox": { "w": 1, "h": 1.2000000476837158 },
 "pickerGridCols": "436px", "cardShadow": "none", "cardBackdrop": "none",
 "handles": [ {"w":13.33,"h":13.33}, {"w":13.33,"h":13.33} ],
 "selectTrigger": { "w": 436, "h": 40, "tag": "BUTTON" }

=== derived (EASD-states.mjs, same box)
 scale 166.67 · drawn 166.67 × 200 · letterboxEachSide 121.67 · inkFillRatio 0.4065
 axisLabelPx 8.33 · handleDiaPx 13.33
```

| Matrix | svg box | drawn plot | letterbox / side | ink fill | handle Ø | axis glyph |
|---|---|---|---|---|---|---|
| desktop light 1440 | 410 × 200 | 166.67 × 200 | 121.67 px | **40.65 %** | 13.33 px | 8.33 px |
| desktop dark 1440 | 410 × 200 | 166.67 × 200 | 121.67 px | 40.65 % | 13.33 px | 8.33 px |
| mobile light 390 | 272 × 200 | 166.67 × 200 | 52.67 px | 61.3 % | 13.33 px | 8.33 px |
| mobile dark 390 | 272 × 200 | 166.67 × 200 | 52.67 px | 61.3 % | 13.33 px | 8.33 px |
| forced-colors 1440 | 410 × 200 | 166.67 × 200 | 121.67 px | 40.65 % | 13.33 px | 8.33 px |
| zoom-200 (720 CSS) | 410 × 200 | 166.67 × 200 | 121.67 px | 40.65 % | 13.33 px | 8.33 px |
| narrow 320 | 202 × 200 | 166.67 × 200 | 17.67 px | 82.5 % | 13.33 px | 8.33 px |
| `steps` regime 1440 | 410 × 200 | 183.33 × 200 | 113.33 px | 44.72 % | 13.33 px | 8.33 px |
| overshoot `y₂=1.1` | 410 × 200 | **153.8** × 200 | 128.1 px | **37.52 %** | **12.31 px** | 7.7 px |

The 320 px row is instructive: the letterbox nearly vanishes there — **by accident**, because a
202 × 200 box happens to be near the 1 : 1.2 viewBox ratio. Nothing in the design produced that;
the plot is the same 166.67 px it is everywhere. The only viewport where this component looks
almost right is the one nobody designed for.

The last row is the design inversion in one number: **the canvas the seat promises will grow to
hold an overshoot instead SHRINKS by 8 % when the curve overshoots**, because the producer's fixed
`block-size` divides a taller viewBox into the same 200 px. `--vb-ratio` stayed `"1.2"` while the
live ratio was `1.3`.

---

## 4. Findings

### D-1 · BLOCKER · Law 3 has never executed. Zero-letterbox is 59.3 % letterbox.

**Evidence.** The seat targets `svg[role="img"]` twice —
`EasingAuthoringStage.vue:48-50` (`querySelector<SVGSVGElement>("svg[role='img']")`) and
`EasingAuthoringStage.vue:104` (`:deep(svg[role="img"])`). glass-ui 7.0.0 emits `role: "group"`:

```
$ grep -o 'role: "[a-z]*"' node_modules/@mkbabb/glass-ui/dist/easing.js | sort | uniq -c
   1 role: "group"
   1 role: "slider"
   2 role: "status"
$ grep -c 'role.*img' node_modules/@mkbabb/glass-ui/dist/easing.js
0
```

Live: `"svgRoleImgFound": false, "svgRoleAttr": "group"`. The producer's inline style survives
verbatim (`"svgInlineStyle": "aspect-ratio: 1 / 1; block-size: clamp(200px, 38cqi, 320px); margin-inline: auto;"`)
— i.e. **all three `!important` overrides at `:105-107` and the `transition` at `:114` are inert.**

**Reproduction.** `node EASD-probe.mjs desktop-light` → output above.

**Blast radius inside this 116-line file.** Dead: `vbRatio` (`:45`), `syncVbRatio` (`:47-53`),
`onAuthored`'s rAF (`:58`), `onMounted` (`:62`), the `watch` (`:63-67`), the `:style` binding
(`:74`), and the `:104-115` CSS block. **53 of 116 lines (46 %) of this component are machinery
around a selector that matches nothing.** What remains that actually functions is a 4-line props
adapter and two `:deep()` rules.

**And the gate is dead the same way.** `e2e/smoke/oracles/o17-easing-composition.spec.ts:51`
locates the same `svg[role='img']`. Run:

```
$ npx playwright test --project=smoke e2e/smoke/oracles/o17-easing-composition.spec.ts --reporter=line
  Locator: …locator('#easing-authoring-0 svg[role=\'img\']')
  Expected: visible
  Error: element(s) not found
  3 failed
    O-17 zero letterbox across curve regimes — desktop
    O-17 zero letterbox across curve regimes — 390
    O-17 composition: stamps, dot rest, one-literal, mint law
```

**3/3 RED.** The design law and its only witness died in the same producer refactor and neither was
noticed. A law with a dead witness is not a law.

**Cure (gestalt, not patch).** Do **not** re-point the selector at `role="group"` — that re-buys
the same fragility at the same price. The seat is asking the producer for a behaviour the producer
should own: *the plot box is the element box*. Relay to glass-ui (BH inbox, standing E-fond): give
`EasingPicker` an intrinsic-sizing contract — the SVG's `block-size: auto` with
`aspect-ratio` derived from its **own** `viewBox` computed value, which the producer already has in
`rt` (`easing.js`, the `viewBox` computed). It is one line in the producer and it deletes 53 lines,
3 `!important`s, one rAF loop, and one DOM scrape from the consumer. Then delete
`EasingAuthoringStage.vue`'s entire `<script setup>` body and Law-3 block, and re-anchor the O-17
oracle on `[data-testid="easing-picker"] svg` (a producer-owned test id that already exists) rather
than on an ARIA role that is free to change.

---

### D-2 · BLOCKER · Two keypresses on this canvas destroy the `/#/gradient` route.

**Evidence.** `EASD-overshoot.mjs`, verbatim:

```
t0:          {"rows":1,"stage":true,"tryAgain":false,"rowCss":"cubic-bezier(0, 0, 1, 1)",
              "vb":[0,-0.1,1,1.2],"drawnW":166.7,"inkFill":0.4065,"vbRatioVar":"1.2","handleDia":13.33}
shift+up x1: {"rows":1,"stage":true,"tryAgain":false,"rowCss":"cubic-bezier(0, 0, 1, 1.1)",
              "vb":[0,-0.2,1,1.3],"drawnW":153.8,"inkFill":0.3752,"vbRatioVar":"1.2","handleDia":12.31}
shift+up x2: {"rows":0,"stage":false,"tryAgain":true}
```

Focus bezier control point 2, press `Shift+↑` twice. The row count goes `1 → 0`, the stage
unmounts, and the app falls into its error boundary (`./shots/route-crash-after-overshoot.png`).
Independently reproduced through the seat's own preset Select (`EASD-crash.mjs`):

```
=== preset: ease-in         {"rows":1,"stage":true,"tryAgain":false,"rowCss":"cubic-bezier(0.42, 0, 1, 1)"}
=== preset: ease-out-back   {"rows":0,"stage":false,"tryAgain":true}
=== preset: ease            {"rows":1,"stage":true,"tryAgain":false,"rowCss":"cubic-bezier(0.25, 0.1, 0.25, 1)"}
```

**Mechanism.** `src/color/operations.ts:90` — `if (progress < 0 || progress > 1) return err({ code: "color_progress_out_of_range" })`.
`useGradientCSS.ts:200-208` feeds `easedT = easing(j/32)` straight into `mixColors` and **throws**
on `!ok`. An overshoot bezier yields `easedT > 1` on the 33-point grid once `y₂ ≳ 1.15`; at
`y₂ = 1.1` the maximum (≈1.0067, at parametric `t ≈ 0.956`) falls between grid points and the crash
is *missed* — which makes the failure **sampling-luck-dependent**, i.e. intermittent, which is
worse than deterministic.

**The design defect, not the code defect.** The producer's own sr-only instructions on this canvas
read *"Up and Down change y from -0.6 to 1.6"* (`easing.js`, the `sr-only` span). The seat wires an
authoring domain of `y ∈ [−0.6, 1.6]` into a consumer whose domain is `[0, 1]`, with **no clamp, no
validation, no disabled range, no invalid state, and no error affordance**. The state was never
designed. That is precisely `PROPORTION-AUDIT.md` PR-08 (*"Pending/failure/export/recovery truth
only transient → ADD-AFFORDANCE"*) and VC §4.1 (*"Selected, failed, pending, withdrawn and disabled
states are never color-only. Role, accessible name, state/value and associated error/status are
explicit"*). The shipped "explicit" state is an unlabelled `Try again` pill on an empty page.

**Cure.** The overshoot policy belongs at the colour boundary, once, as a named parameter — not as
a throw at 3 call sites. `mixColors(from, to, t, { space, hue, overshoot: "clamp" | "extrapolate" | "error" })`
with `"clamp"` as the default (CSS itself clamps easing output when interpolating). The seat then
needs no guard at all, and the `back` family becomes authorable. Failing that producer change, this
seat must not ship an authoring surface whose advertised range is a route-kill.

---

### D-3 · MAJOR · A second, permanently-empty selection surface that contradicts the first.

**Evidence.** `"selectTrigger": { "w": 436, "h": 40 }` with `"trigger": "Pick a curve"` — the empty
placeholder — while `"stripSelected": ["linear"]` and `"rowCss": "cubic-bezier(0, 0, 1, 1)"`.
Visible in every frame in `./shots/`. Options confirmed present: `"options: 30"`.

**Mechanism.** glass-ui's `Ue()` (incoming-model handler) calls `setHandle()` whenever the arriving
`modelValue.points` differ from its internal points, and `setHandle` sets `preset = "custom"`
unconditionally (`easing.js`, `o()` in `W()`). `"custom"` is not a member of
`presetNames = Object.keys(bezierPresets)` (30 entries, `src/easing.ts:34-67`), so reka-ui's Select
falls back to its placeholder. Because the seat *always* drives the picker from the interval model
(`:model-value="value"`, `:77`), the initial points always differ from the producer's
`ease-out-back` default → **the Select is born empty on first paint, in every state the seat can
produce, and returns to empty after every specimen-strip selection.**

**The design defect.** The seat's own header (`:5-6`) states the doctrine: *"The strip selects;
THIS stage authors."* The seat then subtracts `readout` and `playback` to honour that doctrine
(`:78-79`) — and leaves the producer's 30-entry preset Select on the surface, where it duplicates
the strip's job, occupies **436 × 40 px at the bottom of the instrument** (more chrome than the
readout it deleted), and displays a false empty state. Violations:

- PR-06 *"Three adjacent action species or duplicated selected fills → **REMOVE**. One
  action/selection owner"* — here: two selection owners in 200 px of vertical space.
- VC §4.1 *"Text, focus, boundaries and state meet their rendered contrast on the actual material
  tier"* and *"states are never color-only"* — the selected state is stated wrongly, in words.
- VC §5 *select → tune → commit* — the grammar is `select → select-again-but-broken → tune`.

**Cure.** `EasingPicker` needs a `:presets="false"` door exactly parallel to the `readout` and
`playback` doors it already has (`EasingPicker.vue.d.ts` props: `mode, preset, steps, term, readout,
playback, label`). That is a glass-ui addendum, not a demo `:deep()` — edict 4. Until the door
exists, this seat is shipping a control it does not want and cannot turn off. (Secondary, for the
producer: `"custom"` should render as a real option or as an explicit `— custom —` state, never as
the never-chosen placeholder.)

---

### D-4 · MAJOR · The protagonist measures 10.4 rem. The constitution says 19–22 rem.

**Evidence.** Drawn plot inline extent = **166.67 CSS px = 10.42 rem**, identical at 1440 px and
390 px (§3 table).

- `VISUAL-CONSTITUTION.md §7 · Easing`: *"The curve is a **centered, container-clamped 19–22 rem
  stage**."* Rendered: 10.42 rem, and **not centered in any meaningful sense** — it is centered
  inside a box 2.46× its own width, which reads as abandonment, not centering.
- `PROPORTION-AUDIT.md` PR-09: *"Gradient/Easing protagonist subordinated → **ENLARGE**. One
  19–22 rem protagonist; support subordinate."* Terminal verb `ENLARGE`, owner W27. Unclosed.
- VC §3.8: *"One pane may have one full-strength visual protagonist."*

And there is no relief route. `demo/color-picker/router/index.ts:22-37` ships 14 paths; **`/easing`
is not among them** (nor `/about`), though `VISUAL-CONSTITUTION.md §3.1` names both as members and
§3.1 explicitly rules *"Easing is a peer route adjacent to Gradient rather than a nested P122
instrument."* So the *only* easing authoring surface in the shipped product is this 10.42 rem widget
nested three levels inside `/#/gradient` — verbatim the failure VC §7 forbids: *"Catalogue and
specimen strips support the curve rather than **reducing it to a tiny nested widget**."*

Note the seat's own dead clamp would only have reached the **floor**: `inline-size: min(100%, 19rem)`
= 304 px = 19.0 rem exactly. Even the intended design sits on the constitutional minimum with zero
headroom, on a plate whose content box is 436 px. The 19 rem number was never re-derived for this
seat; it was inherited.

**Cure.** Delete the magic `19rem` (`:105`). The stage is inline-size driven off the plate; the
proportion law belongs in the composition (`OPTICAL-BENCH-COMPOSITIONS.md §5`, the P122 Gradient
frame), expressed as a share of the inspector column, not as a hard-coded rem in a leaf.

---

### D-5 · MAJOR · The canvas handle is the sole keyboard control. §5.2 forbids exactly that.

**Evidence.** Tab order measured from the disclosure button (`EASD-focus.mjs`):

```
start:  BUTTON label="Author a custom curve" inStage=false
Tab 1:  circle[slider] label="Bezier control point 1" inStage=true
Tab 2:  circle[slider] label="Bezier control point 2" inStage=true
Tab 3:  DIV[textbox]   label="Gradient CSS"           inStage=false
```

Two focusables in the whole stage, both SVG circles. `VISUAL-CONSTITUTION.md §5.2`, the **Easing
control point** row, is binding:

> *"Right/Left increase/decrease time `x`; Up/Down increase/decrease progress `y` … **named x/y
> numeric controls own their own Home/End; canvas handle and fields share one model.**"*

and the adjacent **Spectrum coordinates** row states the general rule: *"pointer canvas is **not**
the sole keyboard control."* There are no named x/y numeric fields anywhere in this seat or its
producer. Compounding it, the producer's own ARIA is internally inconsistent:
`aria-valuenow = points[i*2]` (the **x** value) while `↑/↓` mutate **y**, and
`aria-valuemin=0 / aria-valuemax=1` while the documented `y` range is `−0.6 … 1.6`. A screen-reader
user pressing `↑` hears the *x* value not change.

**Cure.** The seat already composes; it should compose the missing half. VC §5 names the house
recipe: *"The domain-neutral axis composition sits over BI `Slider`: label, unit, reserved live
value, optional numeric entry…"* — two of those (x, y) per control point, in the space the deleted
preset Select vacates (D-3). Same model, no new mechanics, no new shared directory (edict 3).

---

### D-6 · MAJOR · The operable targets are 13.33 px. WCAG floor is 24 px. The dead Law 3 is why.

**Evidence.** `"handles": [ {"w":13.33,"h":13.33}, {"w":13.33,"h":13.33} ]` — measured
`getBoundingClientRect`, identical in all six matrices, and **12.31 px** once the curve overshoots.
WCAG 2.2 SC 2.5.8 *Target Size (Minimum)* = 24 × 24 CSS px.

**The causal chain is the design defect.** Handle radius is `0.04` viewBox units; rendered diameter
= `0.08 × scale`. Scale is set by the producer's fixed `block-size: 200px ÷ viewBox height 1.2 =
166.67`. Had Law 3 executed, `inline-size: min(100%, 19rem)` would drive `scale = 304` and the
handle would be **24.32 px — a pass, by 0.32 px.** So D-1 is not merely cosmetic: *the dead
letterbox law is directly responsible for an accessibility floor failure*, and the intended design
cleared that floor only by a third of a pixel, which is not a margin, it is a coincidence.

`PROPORTION-AUDIT.md §5.7` is the governing law: *"Visual glyph size, operable target size and
layout reservation are separate quantities."* This seat conflates all three into one `scale`
multiplier and then loses control of the multiplier.

**Cure.** Producer: the handle needs an invisible operable seat sized in CSS px
(`--touch-target`, already a glass-ui token — see `radio-group` in `glass-ui.css` which does exactly
this with `--radio-seat`), decoupled from the visual glyph's user-unit radius. Consumer: nothing —
this cannot be honestly fixed from a `:deep()`.

---

### D-7 · MAJOR · Three `:deep()` + three `!important` per-instance overrides, declared temporary, permanent in fact.

**Evidence.** `EasingAuthoringStage.vue:86-115` — `:deep([data-testid="easing-picker"])`,
`:deep(.glass-card)`, `:deep(svg[role="img"])`, with `!important` at `:106`, `:107`, `:108`.
The header says the overrides are *"recorded on the P7 EasingPicker-v2 packet; the overrides retire
at the adopt"* (`:10-11`) and `:102-103` repeats *"retired at the P7 adopt"*.

**Judgement.** Glass 7.0.0 shipped and was adopted whole (W44, `db77dbd8`). P7 did not arrive; the
overrides did not retire; one of the three silently broke in the adopt and nobody noticed for a
full tranche. Owner edicts violated:

- **#4 glass-ui is the design system** — every one of these three is a producer variant expressed
  as a consumer patch. Two of them (one column; flat well) are *general* seat needs, not
  gradient-specific ones, and belong in the producer as a `variant`/`density` prop.
- **#5 root-level styling** — these are textbook per-instance overrides of a root that should be
  styled at the root.
- **#2 no legacy code** — *"retires at the P7 adopt"* is a migration shim with a comment where the
  migration should be. A dual path waiting for a producer that already shipped.

**Cure.** One BH relay carrying three producer props — `columns` (or a `dense` variant),
`surface="well"`, and the intrinsic-size contract from D-1 — retires the whole `<style scoped>`
block. `challenge-L-library.md` reaches the same destination from the library axis; the two agree.

---

### D-8 · MAJOR · The only motion this component authors is a transition on a layout-forcing property — and it is dead.

**Evidence.** `EasingAuthoringStage.vue:114` —
`transition: aspect-ratio var(--duration-normal) var(--ease-standard);`. Measured computed value on
the live SVG: `"transitionProperty": "all", "transitionDuration": "0s"` — the rule never applies
(D-1). Under PRM the global guard at `demo/styles/animations.css:184-192` does neutralise it
(`prm: true` → the property is absent from the transition list), so the file's PRM claim at
`:112-113` is *technically true but vacuously so*.

**Design judgement.** `aspect-ratio` on a block whose inline size is fixed animates its **block
size** — it forces layout on every frame and reflows the entire accordion column beneath it. The
header comment states this as a feature: *"the canvas EASES to its new ratio instead of lurching the
layout below"* (`:109-111`). It is not a feature. Animating a container's height to avoid a jump
*is* the jump, spread over `--duration-normal`, with layout thrash added. `animations.css:56-80`
declares exactly three named motion families (`vj-enter`, `vj-morph`, `vj-move`) and states *"a
fourth name is a defect"*; this is an unnamed fourth transition outside all three.

**Cure.** The morph family already owns in-place content swaps with an optional height morph
(`--vj-morph-collapse/-expanded`, `animations.css:103+`). If a regime flip needs to feel continuous,
it keys `vj-morph`. Better: with D-1's intrinsic-size contract the canvas has a *stable* box and the
plot re-fits inside it — no layout animation is needed at all, which is the KISS answer (edict 3).

---

### D-9 · MINOR · Axis annotations render at 8.33 CSS px.

`0.05` user units × scale `166.67` = **8.33 px** (`"axisLabelPx": 8.33`), in
`fill-muted-foreground/60`. The `0` mark is not legible in either scheme in `./shots/`. VC §4
closes the type matrix across all compositions; there is no 8 px rung. Producer geometry, consumer
scale — cured by D-1/D-4 raising `scale` (at 304 px scale they would be 15.2 px), or by moving the
annotations out of user-unit space entirely.

### D-10 · MINOR · 7.3 : 1 optical margin asymmetry.

Inside the 410 × 200 content box, the unit square's margins are **121.67 px horizontal / 16.67 px
vertical**. A framed square whose horizontal breathing room is 7.3× its vertical breathing room is
not a composition. Downstream of D-1; recorded separately because it is what a reader *sees* and
because the fix must produce a stated margin relation, not merely a bigger square.

### D-11 · MINOR · No mobile size budget; the producer's container query is inert.

`block-size` = **200 px** at 1440 px, 720 px, 390 px and 320 px — the floor of
`clamp(200px, 38cqi, 320px)`, because the query container is ≈436 px on desktop and ≈298 px on
mobile, so `38cqi ≤ 200 px` always. The seat neither establishes the container nor documents the
dependency, and its own replacement law is dead. VC §3.7: *"Spacing is container-scaled from
glass-ui tokens. No desktop-tight/mobile-airy fork."* This is the opposite failure — one frozen
size for every container.

### D-12 · MINOR · The dragging state has no visual expression; there is no disabled, busy, invalid or empty state at all.

The producer's drag state lives in a closure ref (`Z`) with **zero** visual binding — no class, no
`data-` attribute, no size or stroke change; the only affordance is `style="cursor: move"`.
`PROPORTION-AUDIT.md` PR-07: *"Hover-only/unlabeled controls and **invisible drag state** →
ADD-AFFORDANCE … every surviving action/drag seat has a name/state."* Unclosed. Beyond that, the
seat declares two props and one emit and models **no** state of its own: there is no
`disabled`/`readonly` path (the picker is live even while its parent row is collapsed), no busy
state, no invalid state (see D-2), and no empty state. Focus *is* handled (`:focus-visible` →
`stroke` = accent at `0.045` user units ≈ 7.5 px, measured `matchesFV: true`) — the one state that
is designed.

### D-13 · MINOR · Law 2's well has no forced-colors design.

`:93-99` paints the well with `--well-bg` / `--card-edge` only. `.easing-authoring` is not in the
tier-1 `forced-color-adjust: none` roster at `demo/styles/foundation.css:680-696`, and glass-ui
7.0.0 has forced-colors carve-outs for `switch`, `toggle-group`, `checkbox`, `radio-group`,
`disclosure`, `skeleton` and `feedback-mark` — **but not for `.glass-card`**
(`grep -o "@media (forced-colors:active){…" dist/glass-ui.css`, 7 blocks, none matching
`glass-card`). In WHCM the well and the plate both resolve to `Canvas`, so the tone-step that is
Law 2's entire product vanishes and only the 1 px `CanvasText` hairline remains. VC §4.1: *"Text,
focus, boundaries and state meet their rendered contrast on the actual material tier; a token name
is not evidence."*

### D-14 · MINOR · Two rAF-scheduled null DOM scrapes per authored change.

`:58` schedules `syncVbRatio` on every emission and `:63-67` schedules it again on every
`value.css` change. During a pointer drag the producer emits per `pointermove`, so a 120 Hz drag
schedules ≈240 `querySelector` calls per second that each return `null`. Not a performance
emergency; it is dead work that exists only because the design reached into a DOM it does not own.
Deleted entirely by D-1's cure.

---

## 5. State coverage — the audit the design never had

| State | Designed? | Evidence |
|---|---|---|
| default / populated | partly | ships letterboxed at 40.65 % ink (D-1) |
| **empty** (preset unset) | **NO — and it is the shipped default** | `"Pick a curve"` in every frame (D-3) |
| loading / busy | absent | no async path; acceptable |
| **error / invalid** | **NO** | overshoot kills the route; bare `Try again` (D-2) |
| disabled / readonly | absent | picker stays live under a collapsed row |
| focused | yes | `matchesFV: true`, accent stroke ≈7.5 px |
| hovered | producer-only | no seat hover design |
| active / pressed | n/a | |
| **dragging** | **NO** | drag ref has no visual binding (D-12) |
| selected | **contradictory** | strip says `linear`, Select says "Pick a curve" (D-3) |
| overflowing / truncated | n/a (SVG) | but 30-option Select overflows on mobile |
| **RTL** | untested by anyone; renders identically (`dir=rtl` probe: box, viewBox, ink fill unchanged) | VC §5.2 requires the x/y axes NOT mirror — correct by accident, since there are no named axes to mirror (D-5) |
| reduced-motion | vacuously fine | `prm: true`, no `aspect-ratio` in the transition list |
| **forced-colors** | **NO** | D-13 |
| zoom 200 % | inherits D-11 | measured at 720 px CSS width: svg still 410 × 200, letterbox still 121.67 px/side, handles still 13.33 px |
| narrow 320 | inherits D-11 | 202 × 200 box; letterbox collapses to 17.67 px **by coincidence**, not by design |

Nine states. **Five are undesigned, one is self-contradictory, one is a route-kill.**

---

## 6. Seat-law scorecard

| Law | Source | Result |
|---|---|---|
| Law 1 — one column | `:88-90` | **ALIVE** — `"pickerGridCols": "436px"` at 1440 px (would be `1fr 18rem` without it) |
| Law 2 — wells, not cards | `:93-99` | **ALIVE** — `cardShadow: "none"`, `cardBackdrop: "none"` — but no WHCM arm (D-13) |
| Law 3 — zero letterbox | `:104-115` | **DEAD** — 121.67 px/side, 40.65 % ink (D-1) |
| VC §7 Easing 19–22 rem | canon | **FAIL** — 10.42 rem (D-4) |
| VC §5.2 named x/y controls | canon | **FAIL** — canvas is sole keyboard control (D-5) |
| PR-06 one selection owner | canon | **FAIL** — two, one lying (D-3) |
| PR-07 drag state visible | canon | **FAIL** (D-12) |
| PR-08 durable failure truth | canon | **FAIL** — bare `Try again` (D-2) |
| PR-09 protagonist ENLARGE | canon | **FAIL** (D-4) |
| Edict 2 no legacy | owner | **FAIL** — "retires at the P7 adopt" shim (D-7) |
| Edict 4 glass-ui first | owner | **FAIL** — 3 producer variants as consumer patches (D-7) |
| Edict 5 root-level styling | owner | **FAIL** — 3 per-instance `:deep()` (D-7) |
| Edict 6 animations tokenized | owner | **PARTIAL** — right tokens, unnamed 4th family, layout-forcing property (D-8) |
| Edict 1 no god modules | owner | **PASS** — 116 lines, one job |
| Edict 3 KISS | owner | **FAIL** — 46 % of the file is dead machinery (D-1) |
| Edict 7 idiomatic Vue 3.5 | owner | **PASS** — `useTemplateRef` (`:44`), reactive props destructure (`:32`), no stale-read hazard |
| Edict 8 `verbatimModuleSyntax` | owner | **PASS** — `import type { EasingPickerValue }` at `:30` |

---

## 7. The gestalt cure

Not a patch list. The transposition:

**This component should not exist as authored.** Its 116 lines are a compensation layer for three
producer gaps. Close the gaps at the producer and the file collapses to its honest shape:

```vue
<script setup lang="ts">
import { EasingPicker } from "@mkbabb/glass-ui/easing";
import type { EasingPickerValue } from "@mkbabb/glass-ui/easing";
defineProps<{ value: EasingPickerValue; label: string }>();
defineEmits<{ authored: [value: EasingPickerValue | undefined] }>();
</script>
<template>
    <EasingPicker
        :model-value="value" :label="label"
        :readout="false" :playback="false" :presets="false"
        density="compact" surface="well"
        @update:model-value="(v) => $emit('authored', v)"
    />
</template>
```

— zero `:deep()`, zero `!important`, zero rAF, zero DOM scrape, zero `<style>`. At that point the
wrapper carries no behaviour and should be **deleted outright**, with `<EasingPicker>` seated
directly in `GradientEasingEditor.vue:207` (edict 3: no wrapper components that carry nothing).

The four producer obligations, in one BH relay:

1. **`EasingPicker` sizes intrinsically** — SVG `block-size: auto`, `aspect-ratio` from its own
   computed `viewBox`. Retires D-1, D-4, D-6, D-9, D-10, D-11, D-14 and the O-17 oracle's dead
   selector in one move.
2. **`:presets="false"`** — the third subtraction door beside `readout` and `playback`. Retires D-3.
3. **`density`/`surface` variants** (one column; flat well) — retires D-7 and the whole
   `<style scoped>` block.
4. **A handle seat sized in CSS px** (`--touch-target`, the pattern `radio-group` already uses).
   Retires D-6 properly rather than by coincidence.

Plus one library obligation, independent of glass-ui: **`mixColors` takes an overshoot policy**
(`"clamp"` default). Retires D-2 and unblocks the entire `back` family the specimen catalogue
already advertises (`easingCatalogue.ts:174` — `FAMILY_ORDER` includes `"back"`).

And one demo obligation: **named x/y numeric axes** over the house `Slider` composition (VC §5),
seated in the space `:presets="false"` vacates. Retires D-5.

Finally: **re-anchor `o17-easing-composition.spec.ts` on `[data-testid="easing-picker"] svg`** — a
producer-owned contract — and add an overshoot regime that asserts the route *survives*. A law
whose witness can die silently is not a law.

---

## 8. Negative proof — what I tried to break and could not

Recorded so the report is not one-sided:

- **Law 1 is genuinely alive.** `"pickerGridCols": "436px"` at 1440 px. The Tailwind
  `lg:grid-cols-[1fr_18rem]` sits in `@layer utilities`; the unlayered scoped `:deep()` rule wins
  regardless of the media query. I checked for a layer-order defeat and there is none.
- **Law 2 is genuinely alive.** `cardShadow: "none"`, `cardBackdrop: "none"`, `cardBg` = the
  `--well-bg` mix in both schemes. No cartoon stamp survives in-row.
- **The PRM claim at `:112-113` is true.** `demo/styles/animations.css:184-192` neutralises
  `transition-duration` on `*`; measured `prm: true` with `aspect-ratio` absent from the transition
  list.
- **Vue 3.5 idiom is correct.** `useTemplateRef` is used, props are reactively destructured and the
  `watch(() => value.css, …)` getter compiles to `__props.value.css` so it *is* reactive; there is
  no `defineModel` stale-read hazard here because the seat deliberately does not use `defineModel`.
- **`verbatimModuleSyntax` is honoured** — `:30` is `import type`.
- **No horizontal overflow, no console error, no page error** attributable to this component in the
  settled state (the one console error on `/#/gradient` is the dev-config `VITE_API_URL` warning,
  and the one `pageerror` is a benign `ResizeObserver loop` notice).
- **The 6 small tap targets the visual audit reports on `/#/gradient`** are *not* this component's —
  they are counted with the stage closed. This component adds **2 more** (13.33 px) once disclosed,
  which the standing matrix has never measured because it never opens the disclosure.

---

## 9. Evidence index

| Artefact | What it proves |
|---|---|
| `EASD-probe.mjs` | 6-matrix geometry, `svgRoleImgFound: false`, `svgRoleAttr: "group"` |
| `EASD-states.mjs` | letterbox/ink-fill/axis/handle derivations; steps + RTL + forced + PRM |
| `EASD-focus.mjs` | Tab order (2 focusables), `:focus-visible` computed stroke |
| `EASD-overshoot.mjs` | the 2-keystroke route kill, with the intermediate shrink at `y₂=1.1` |
| `EASD-crash.mjs` | preset-driven reproduction; `ease-in`/`ease` survive, `ease-out-back` kills |
| `shots/desktop-light-open-row.png` · `desktop-dark-open-row.png` · `mobile390-light-open-row.png` | the letterbox, the `"Pick a curve"` contradiction, dark/mobile parity |
| `shots/forced-colors-open-row.png` | the WHCM arm |
| `shots/route-crash-after-overshoot.png` | the undesigned failure state |
| `npx playwright test --project=smoke …/o17-easing-composition.spec.ts` | **3/3 RED** — the gate is dead the same way the law is |
