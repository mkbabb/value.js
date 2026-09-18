# CHALLENGE-D (round 3) — `EasingAuthoringStage.vue` is designed against a contract it does not hold

## Model receipt

I observe myself to be **Opus 5 (`claude-opus-5[1m]`, 1M context)** — the tier this seat was
explicitly spawned with. Declared, not inherited.

---

## 0. Why this file is `-r3`

The brief named `challenge-D-design.md`. That file already exists (`challenge-D-design.md`,
2026-07-28 19:04) and so does `challenge-D-design-r2.md` (2026-07-28 23:09). Overwriting either
destroys a prior seat's evidence, which no instruction can be read to authorise; the directory's own
convention (`challenge-L-library-r3.md`) is round suffixes. This is round 3, written independently
against **HEAD `c654824e`, branch `tranche-u`**, live tree, dev server `http://localhost:9000`.

I read r1 and r2 **only after** completing my own probes, to position what is new. Where r3 confirms
a prior round I say so and add the sharper number. Where r3 **contradicts** a prior round I say that
too — there is one such case (§4, D3-03), and it matters.

| | |
|---|---|
| Subject | `demo/workbenches/gradient/GradientVisualizer/easing/EasingAuthoringStage.vue` (117 lines) |
| Parent | `demo/workbenches/gradient/GradientVisualizer/GradientEasingEditor.vue` (295 lines) |
| Producer | `@mkbabb/glass-ui@7.0.0` → `dist/easing.js` (`EasingPicker`) |
| Route | `/#/gradient`, behind **two** disclosures (accordion row + `SlidersHorizontal` rail toggle) |
| Canon read | `PROPORTION-AUDIT.md`, `VISUAL-CONSTITUTION.md`, `demo/DESIGN.md`; `PALETTE-CONTRACT.md` read and found **not to govern this component** (it is the palette API/domain authority — no ink, material or proportion clause reaches the gradient easing bench) |
| Probes | 9 Playwright scripts (WebKit **and** Chromium), 1 live e2e oracle run — index at §8 |

**New in r3** (not present in r1 or r2, verified by grep of both files):

- **N1** — `--vb-ratio` non-tracking proven across a *real* regime flip: the steps viewBox is
  `-0.05 -0.1 1.1 1.2` (true ratio **1.0909**) while `--vb-ratio` reads **1.2**. r1/r2 inferred the
  variable was frozen; r3 measures the two ratios diverging.
- **N2** — a **measurement that refutes r2's negative proof** on reduced motion
  (`challenge-D-design-r2.md:498-500` asserts *"the reduced-motion claim in the comment is true"*).
  It is not: the effective transition duration under `prefers-reduced-motion: reduce` in this subtree
  is **100 ms**, in both engines.
- **N3** — real-pixel, tight-glyph contrast of the stage's one support label: **4.44 : 1** light,
  **3.02 : 1** dark, against the parent rail's **5.07 / 6.03** measured in the same frame.
- **N4** — the **mode trap**: measured transition of `data-mode` bezier→steps driven by a *sibling*,
  with no mode control in the stage in either regime and no path back.
- **N5** — the crash threshold located exactly (`y = 1.1`, the 11th keypress) and the tile blast
  radius bounded by experiment (`ease-out-back`/`ease-in-back` crash; `steps`, `step-start`,
  `ease-in-out-sine` do not).
- **N6** — the certifying oracle is not merely red, it is **structurally unable to report**:
  `.github/workflows/ci.yml` runs no Playwright step at all.

---

## 1. Verdict

**DEFECTIVE.** Three of the component's own three constitutive laws were audited; **Law 3 — the one
the component exists for — binds to zero elements and has never executed in this glass-ui major.**
The consequences are not cosmetic: they set the canvas 45 % under the ratified protagonist size,
drive the only operable targets to 55 % of the WCAG floor, and shrink the axis annotations to
8.33 px. Independently, the instrument's own keyboard contract admits values the host model rejects,
so **eleven keypresses inside this component destroy the `/#/gradient` route**.

The strongest defect is not any one of those. It is the *mechanism*: this component is a **styling
shim that reaches into a producer's private DOM by test-id, role and class, with `!important`, and
was certified by a bespoke oracle that CI never runs.** The producer shipped a new major (Glass 7,
W44), the private DOM moved, the law died silently, and the gate that would have caught it is red on
disk and invisible in CI. Every finding below is a leaf of that one root.

---

## 2. Visual truth

The static visual matrix (`audit/visual/REPORT.md`, 60 captures) **cannot see this component**: it
sits behind two disclosures, so all 60 Safari frames and all 6 state matrices (`STATES.json`)
photograph the route *without* it. A component that no capture in the audit corpus contains is a
component whose visual truth was never checked. That is the zeroth finding, and it is why r3 drove
the live server.

### Desktop 1440, light — `evidence/stage-desktop-light.png`

The card is **436 px** wide. The plotted curve occupies a **166.7 px** island in the middle of it.
**243.3 px — 59.3 % of the canvas's inline extent — is empty paper.** The framed unit box, the
gridlines and the curve all float in the centre with a 122 px void either side. The eye reads it as a
mis-cropped image, not an instrument. Below the card, one full-bleed 436 × 40 combobox reading
**"Pick a curve"** — a placeholder, in a stage whose curve is `cubic-bezier(0, 0, 1, 1)` and whose
row header two elements above says `linear`. The control is empty while the model is full.

The unit-box frame is a beige hairline at **1.56 : 1** against the well; the interior gridlines at
**1.18 : 1** are effectively absent; the `0` and `1` axis annotations render at **8.33 CSS px** at
**2.41 : 1**. A cubic-bezier editor whose reference frame you cannot see is a drawing, not a graph.

### Desktop 1440, dark — `evidence/stage-desktop-dark.png`

Same geometry, same void. The dark treatment is not a treatment: the well takes a warm brown
(`rgb(66,55,47)`) while the pane behind it is mauve — two unrelated warm families abutting, and the
support label above the combobox drops to **3.02 : 1**. The axis annotations reach **3.19 : 1** at
8.33 px. Dark mode here is a token substitution, not a design.

### Mobile 390 — `evidence/stage-mobile-light.png`

Stage 298 px, canvas 272 × 200, drawn plot still **166.7 px**. The letterbox narrows to 38.6 %
because the box happens to approach square — i.e. **the defect is worst on the widest viewport.**
The producer's `block-size: clamp(200px, 38cqi, 320px)` is pinned at its 200 px floor (38 cqi of a
436 px container = 165.7 px), so height never grows while `w-full` does. Every pixel of extra desktop
width is converted into void.

### Steps regime — `evidence/stage-steps-regime.png`

Selecting the `steps` specimen flips the producer into staircase mode. The canvas control inventory
silently changes: the two bezier handles and the preset combobox vanish, a `Step count` slider and a
`Jump term` select appear. Same box, 55.3 % void.

### Focus — `evidence/stage-focus-handle1.png`

Tab-reached, `:focus-visible` confirmed true. The indicator is the handle's 7.5 px outline recoloured
to `oklch(0.438 0.075 205)` — **the identical ink as the curve that passes through it**. On a 13.3 px
dot, against a curve of the same colour. The house register `--focus-ring-shadow`, which this
component's own parent uses on `.rail-btn:focus-visible` (`GradientEasingEditor.vue:285-288`), is not
adopted here.

---

## 3. Measured geometry (live, both engines)

`WBGEAS-probe2/3/9/11`, dev server at `:9000`.

| matrix | stage w | svg box | live viewBox | true ratio | `--vb-ratio` | drawn plot | void | handle |
|---|---:|---|---|---:|---:|---:|---:|---:|
| WebKit desktop light 1440 | 436 | 410 × 200 | `0 -0.1 1 1.2` | 1.2000 | **1.2** | 166.7 × 200 | **59.3 %** | 13.3 px |
| WebKit desktop dark 1440 | 436 | 410 × 200 | `0 -0.1 1 1.2` | 1.2000 | 1.2 | 166.7 × 200 | 59.3 % | 13.3 px |
| WebKit mobile 390 | 298 | 272 × 200 | `0 -0.1 1 1.2` | 1.2000 | 1.2 | 166.7 × 200 | 38.6 % | 13.3 px |
| WebKit reduced-motion | 436 | 410 × 200 | `0 -0.1 1 1.2` | 1.2000 | 1.2 | 166.7 × 200 | 59.3 % | 13.3 px |
| WebKit forced-colors | 436 | 410 × 200 | `0 -0.1 1 1.2` | 1.2000 | 1.2 | 166.7 × 200 | 59.3 % | 13.3 px |
| WebKit 200 % zoom (720 @2×) | 436 | 410 × 200 | `0 -0.1 1 1.2` | 1.2000 | 1.2 | 166.7 × 200 | 59.3 % | 13.3 px |
| Chromium 320 px | 228 | 202 × 200 | `0 -0.1 1 1.2` | 1.2000 | 1.2 | 166.7 × 200 | 17.5 % | 13.3 px |
| Chromium RTL | 436 | 410 × 200 | `0 -0.1 1 1.2` | 1.2000 | 1.2 | 166.7 × 200 | 59.3 % | 13.3 px |
| Chromium, **steps regime** | 436 | 410 × 200 | **`-0.05 -0.1 1.1 1.2`** | **1.0909** | **1.2** | 183.3 × 200 | 55.3 % | — |

Computed style of the canvas SVG, every matrix:

```
inline-size    410px          ← seat asks min(100%, 19rem) = 304px
block-size     200px          ← seat asks auto !important
aspect-ratio   1 / 1          ← seat asks calc(1 / var(--vb-ratio)) = 0.8333 !important
margin-inline  0px / 0px      ← producer's `auto`, resolved; seat's `0 !important` never applied
role           group          ← seat selects svg[role="img"]
svg[role="img"] count inside .easing-authoring: 0
```

Ink measurements (colours resolved through a canvas 2D context, not string-parsed):

| target | light | dark | floor |
|---|---:|---:|---|
| curve vs well | 4.4 : 1 (est.) | 7.8 : 1 (est.) | 3 : 1 (1.4.11) — pass |
| **plot frame vs well** | **1.56 : 1** | **1.66 : 1** | 3 : 1 — **fail** |
| **gridlines vs well** | **1.18 : 1** | **1.22 : 1** | 3 : 1 — **fail** |
| **axis `0`/`1` vs well** (8.33 px) | **2.41 : 1** | **3.19 : 1** | 4.5 : 1 — **fail** |
| **"Preset" label, real pixels** | **4.44 : 1** | **3.02 : 1** | 4.5 : 1 — **fail** |
| parent readout literal on `bg-well`, same frame | 5.07 : 1 | 6.03 : 1 | pass |

---

## 4. Findings

### D3-01 · BLOCKER · Law 3 selects an element that does not exist; the "zero-letterbox" stage is 59.3 % letterbox

**Evidence.** `EasingAuthoringStage.vue:48-49` (`querySelector("svg[role='img']")`) and `:104`
(`:deep(svg[role="img"])`). glass-ui 7.0.0 renders that SVG with `role: "group"`:

```
$ grep -o 'role: *"[a-z]*"' node_modules/@mkbabb/glass-ui/dist/easing.js | sort | uniq -c
   1 role: "group"
   1 role: "slider"
   2 role: "status"
```

Live: `document.querySelectorAll('.easing-authoring svg[role="img"]').length === 0` in **every** one
of the nine matrices above. `syncVbRatio()` therefore returns at its guard on mount, on every
`authored` emission and on every `value.css` watch; all four declarations in the Law 3 block are
inert; the producer's inline `aspect-ratio: 1`, `block-size: clamp(200px, 38cqi, 320px)` and
`margin-inline: auto` survive untouched.

**Consequence, measured.** viewBox `1 × 1.2` fitted `xMidYMid meet` into a `410 × 200` box gives a
drawn plot of `166.7 × 200`: **243.3 px, 59.3 % of the element's inline extent, is void.** The header
comment's claim — *"The drawn plot IS the element box"* — is false by 243 px.

**N1 — proven, not inferred.** Flip the regime to `steps` and the producer refits its viewBox to
`-0.05 -0.1 1.1 1.2`, true ratio **1.0909**. `--vb-ratio` still reads **1.2**. The two numbers are
now measurably different and the element box did not move (410 × 200 before and after). The comment's
"the canvas EASES to its new ratio" describes an event that cannot occur.

**Cure (gestalt, not patch).** Delete Law 3 and the `vbRatio` machinery entirely. The zero-letterbox
requirement is a *producer* requirement — glass-ui owns the canvas, its viewBox and its
`preserveAspectRatio`, and it is the only party that can make the drawn plot equal the element box
without archaeology. Send it as the P7 `EasingPicker-v2` packet clause it was always meant to be
(`fit="contain" | "exact"`, or simply drop the inline `block-size`/`aspect-ratio` and let the box
follow the viewBox). A consumer cannot own another package's geometry through a role selector.

---

### D3-02 · BLOCKER · Eleven keypresses inside this component destroy the route

**Reproduction** (`WBGEAS-probe6.mjs`, Chromium, 1440 × 1400):

```
1. http://localhost:9000/#/gradient
2. click  button[aria-label="Author a custom curve"]
3. focus  .easing-authoring [role='slider']      (Bezier control point 1)
4. press  Shift+ArrowUp  × 11
```

Transcript (readout, aria-valuetext):

```
x 0   cubic-bezier(0, 0, 1, 1)      y 0.000
x10   cubic-bezier(0, 1, 1, 1)      y 1.000     ← still legal
x11   —  panel replaced by ErrorBoundary:
         "Gradient color mix failed: color_progress_out_of_range"
```

`evidence/crash-after-11-shift-arrowup.png`. Source of the rejection:
`src/color/operations.ts:65` and `:90` — `if (progress < 0 || progress > 1) return err({ code: "color_progress_out_of_range" })`.

**This is a design defect, not a bug report.** The instrument the seat chose to seat has a declared
operable domain of `y ∈ [-0.6, 1.6]` (glass-ui's own sr-only instructions, `easing.js`:
*"Up and Down change y from -0.6 to 1.6"*, backed by `MAX_OVERSHOOT = 0.6`). The consumer's domain is
`progress ∈ [0, 1]`. **The seat never reconciled them** — and its header comment actively celebrates
the mismatch: *"a regime flip (linear → back → steps)…"*, *"overshoot draws past the box, never
clipped"*. The design was authored around a curve family the host cannot evaluate.

**Blast radius, bounded by experiment** (`WBGEAS-probe11.mjs`, fresh context each):

| specimen selected | result |
|---|---|
| `steps` | survives, `data-mode` → `steps` |
| `step-start` | survives, `data-mode` → `steps` |
| `ease-in-out-sine` | survives |
| `ease-out-back` | **route destroyed** — `color_progress_out_of_range` |
| `ease-in-back` | **route destroyed** — `color_progress_out_of_range` |

Three of the twenty-seven catalogue tiles are the same landmine by the same mechanism
(`ease-in-out-back` untested, same family, same overshoot).

**Cure.** One decision, made once, at the model boundary: either the gradient interval accepts
overshoot and `mixColor` clamps/extrapolates explicitly (a named, tested policy), or the easing
domain for gradient intervals is `[0,1]`-valued by type and the authoring instrument is constrained
to it (`clampY` prop on the producer, or a `domain` on `EasingPickerValue`). What must not survive is
an editor whose legal moves are illegal downstream. No `try/catch` in the seat: catching this would
convert a contract break into a silent no-op, which is worse.

---

### D3-03 · MAJOR · The reduced-motion cure the component documents does not exist — **contradicts r2**

`EasingAuthoringStage.vue:112-114` claims: *"The global PRM carve-out (animations.css) neutralizes it
under reduced motion."* r2 §D2-08 accepted that claim on a code read
(`challenge-D-design-r2.md:498-500`: *"the reduced-motion claim in the comment is true"*).

**Measured, both engines** (`WBGEAS-probe12/13`, `reducedMotion: "reduce"`):

```
matchMedia("(prefers-reduced-motion: reduce)").matches   true
probe <div style="transition: opacity 5s">
  computed transition-duration                           0.1s      ← Chromium AND WebKit
  same div with setProperty(..., "important")            5s
.easing-authoring svg computed transition-duration       0.1s
guard rule present in CSSOM ( *, ::before, ::after
   { transition-duration: 0.01ms !important } )          yes, twice
```

The guard is present and is **not the winning declaration**: the effective reduced-motion transition
duration in this subtree is **100 ms**, cross-engine. (Which declaration wins is **UNRESOLVED** — my
CSSOM walk found no matching rule, so the winner is likely a cascade-layer interaction with an
important declaration in an earlier layer. That diagnosis is a hypothesis; the 0.1 s measurement is
not.)

**Why it matters for this seat.** The risk is latent only because D3-01 killed the rule. The moment
D3-01 is "fixed" as written, the component ships a **300 ms transition on `aspect-ratio` — a layout
property, inside a container-query container** — that reduced motion does not zero: every frame
reflows the pane, re-resolves `38cqi`, and moves the accordion, the readout rail and the CSS section
below it. The comment's stated intent ("instead of lurching the layout below") is achieved by
replacing one lurch with ~18 frames of continuous relayout.

**Cure.** Delete the transition with Law 3. If the disclosure's height change deserves easing, ease
it at the disclosure with `interpolate-size`/`grid-template-rows` and a house duration token — never
on the specimen's own aspect. Separately, the demo's global PRM guard needs a real witness; it is
currently an assertion no test makes.

---

### D3-04 · MAJOR · The protagonist is 10.42 rem where the canon says 19–22 rem — and the housing exceeds the ceiling

`VISUAL-CONSTITUTION.md:210` — *"The curve is a centered, container-clamped 19–22rem stage… Catalogue
and specimen strips support the curve rather than reducing it to a tiny nested widget."*
`PROPORTION-AUDIT.md:53` PR-09 — *"Gradient/Easing protagonist subordinated → **ENLARGE**. One 19–22rem
protagonist; support subordinate."*

Measured: drawn curve **166.7 px = 10.42 rem**, i.e. **55 % of the 19 rem floor**, inside a card of
**436 px = 27.25 rem**, i.e. **124 % of the 22 rem ceiling.** The housing is over the ceiling and the
specimen is under the floor — the exact inversion PR-09 exists to close.

And the *intended* law would not have satisfied the canon either. `inline-size: min(100%, 19rem)` caps
the specimen at **exactly the register's floor**, never reaching 19–22; and `margin-inline: 0
!important` deliberately deletes the producer's centring, contradicting "**centered**, container-
clamped". Both arms of the law — the shipped no-op and the written intent — miss.

**Cure.** The stage is not the seat's to clamp. Give the producer a container-scaled size contract
(`--easing-canvas-size: clamp(19rem, …, 22rem)`) and let it centre its own canvas; the seat supplies
the token, not the geometry.

---

### D3-05 · MAJOR · Two selection owners in one disclosed row, and the second one is permanently empty

The seat's own header states the division: *"the strip selects; THIS stage authors."* In fact the
stage's entire chrome column, in bezier regime, is **one control — a `Preset` combobox** enumerating
the same named-curve vocabulary the sibling `EasingSpecimenStrip` already presents as 27 tiles two
elements above. `PROPORTION-AUDIT.md:50` PR-06 — *"Three adjacent action species or duplicated
selected fills → **REMOVE**. One action/selection owner."*

Worse, the duplicate **never reflects state**. Measured `selectTriggerText` in every matrix and after
every specimen selection: `"Pick a curve"` — the placeholder — while the row's own header reads
`linear` and the readout reads `cubic-bezier(0, 0, 1, 1)`. A control that is empty when the model is
full is not a control; it is a lie with a chevron.

**Cure.** Pass `:preset="false"` (or the P7 equivalent) and let the strip be the only selection owner,
per the seat's own stated law. If the producer has no such door, that is the packet clause — not a
reason to ship two selection surfaces that disagree.

---

### D3-06 · MAJOR · The mode trap — a modal editor whose mode is owned by a sibling **[N4]**

Measured transitions (`WBGEAS-probe11`, fresh context per row):

| action | `data-mode` | stage controls (`aria-label`) |
|---|---|---|
| open stage (default) | `bezier` | `Bezier control point 1`, `Bezier control point 2`, `Easing preset` |
| select `steps` tile | **`steps`** | `Step count`, `Jump term` |
| select `step-start` tile | `steps` | `Step count`, `Jump term` |
| select `ease-in-out-sine` tile | `bezier` | back to the three bezier controls |

So the stage *does* follow the model into the staircase editor — **but it has no mode control of its
own in either regime.** The authoring surface's fundamental mode is a side effect of pressing a tile
in a different component. Once in `steps`, the only route back to bezier authoring is to leave the
stage and press a bezier tile in the strip. The stage's control inventory, its accessible name set
and its keyboard model all change identity underneath the user with no affordance, no label and no
announcement. `VISUAL-CONSTITUTION.md:98-100` — *"Selection changes the active specimen… Tuning is
continuous and interruptible."* Here tuning's *kind* is not tunable at all.

**Cure.** Either the stage owns the regime (one labelled 2-item control, house `SegmentedTabs`, at the
top of the stage) or the regime is not a mode — but it cannot be an invisible consequence of a
sibling's press.

---

### D3-07 · MAJOR · Law 2's well stops at the canvas; the chrome column is left below the AA floor **[N3]**

Law 2 (`:93-99`) rewrites `.glass-card` into a flat well. It works — measured
`background: oklab(0.9133 …)` ≡ `--well-bg`, `box-shadow: none`, `backdrop-filter: none`. But with
`:readout="false"` there is exactly **one** `.glass-card` in the subtree (the canvas), so Law 2
houses the canvas and leaves the producer's chrome column — the `Preset` label and its combobox —
sitting on the **raw translucent pane over the saturated ambient field**.

That is the precise condition the parent already diagnosed and floored, in a comment 30 lines above
where this component is mounted (`GradientEasingEditor.vue:167-175`):

> *"the literal is `text-muted-foreground`, and on the raw translucent pane over the saturated
> atmosphere it composited ~2.7:1 (fails AA); a `bg-well` well floors it to the certified
> ink-on-well ratio."*

Real-pixel measurement, tight glyph box, same frame, same ink (`rgb(112,89,66)` light /
`rgb(195,185,172)` dark), `WBGEAS-probe8`:

| element | light | dark |
|---|---:|---:|
| parent readout literal, on `bg-well` | 5.07 : 1 | 6.03 : 1 |
| **stage "Preset" label, on the raw pane** | **4.44 : 1** | **3.02 : 1** |

Both fail WCAG 1.4.3 AA (4.5 : 1 for 14.38 px / weight 400). The fix was invented, certified and
documented in the parent — and not generalised to the child mounted inside it.

Compounding it: the label is `text-mono-caption` — Fira Code, uppercased. `VISUAL-CONSTITUTION.md:75`
assigns *control or label* to `text-small`, Plus Jakarta Sans, non-bold; `text-mono-small`/
`mono-caption` are reserved for *value, code or provenance*. "Preset" is a control label wearing the
value family.

**Cure.** The well is the *stage's* material, not the canvas card's. Move it to `.easing-authoring`
itself so the whole disclosed instrument — canvas and chrome — rides one certified paper, and drop
the `.glass-card` override with it. One surface, one tier (`VISUAL-CONSTITUTION.md:19`).

---

### D3-08 · MAJOR · The operable targets are 13.3 px, and Law 3 is why

Both `role="slider"` bezier handles measure **13.3 × 13.3 CSS px** in every matrix (`r = 0.04` viewBox
units × the 166.7 scale). WCAG 2.5.8 minimum target size is 24 × 24.

The causal chain is worth stating because it makes the cure obvious: had Law 3 bound, the canvas
would be `304 × 365` (`min(100%, 19rem)` at aspect `1/1.2`), the fit scale would be 304 rather than
166.7, and the handles would measure **24.3 px — passing.** The same arithmetic sets the axis
annotations at 15.2 px instead of 8.33. **One dead selector under-sizes every operable and typographic
element on the canvas simultaneously.** This is the clearest evidence that the letterbox is not a
cosmetic complaint.

The route-level tap-target census in `audit/visual/REPORT.md` records 6 small targets on `/#/gradient`
in each matrix — and cannot see these two, because the stage is never disclosed in the capture. The
true count is at least 8.

---

### D3-09 · MAJOR · The component is a per-instance override shim on producer internals, declared temporary, shipped permanent

The whole body is three `:deep()` blocks and four `!important` declarations reaching into another
package's private DOM through **a test id** (`[data-testid="easing-picker"]`), **a role**
(`svg[role="img"]`) and **a utility class** (`.glass-card`). The header says so out loud: *"each
recorded on the P7 EasingPicker-v2 packet; the overrides retire at the adopt"* and *"retired at the P7
adopt"*.

Against the standing edicts:

| edict | verdict |
|---|---|
| 4 · glass-ui is the design system; variants belong in glass-ui | **violated** — three variants (one column, flat well, contain-fit) are authored in `demo/` |
| 5 · style at the root component level, never per-instance overrides | **violated** — the file is nothing but per-instance overrides |
| 2 · no legacy code, no shims | **violated** — self-described transitional shim, still shipping |
| 3 · KISS, no contrivance | **violated** — a wrapper component whose only content is another component plus overrides |
| 1 · no god modules | pass |
| 6 · animations never deleted | pass (nothing deleted) |
| 7 · idiomatic Vue 3.5 | pass — `useTemplateRef`, reactive props destructure, correct `watch` on a destructured prop |
| 8 · `verbatimModuleSyntax` | pass — `:30` is `import type` |

A test id is a *test* contract. Styling through it means every producer refactor is a silent visual
regression in the consumer, which is exactly what happened at the Glass 7 adoption (W44).

---

### D3-10 · MAJOR · The gate is red, and CI cannot report it **[N6]**

`e2e/smoke/oracles/o17-easing-composition.spec.ts:51` locates the canvas by the same dead selector:

```
$ VJS_E2E_PORT=9000 npx playwright test --project=smoke \
    e2e/smoke/oracles/o17-easing-composition.spec.ts --reporter=line
  3 failed
    O-17 zero letterbox across curve regimes — desktop
    O-17 zero letterbox across curve regimes — 390
    O-17 composition: stamps, dot rest, one-literal, mint law

  Locator: …locator('#easing-authoring-0 svg[role=\'img\']')
  Expected: visible
  Error: element(s) not found
```

r1 recorded the red run. **What r1 and r2 both missed is that the gate is structurally unable to
fire**: `.github/workflows/ci.yml` runs `lint`, two `vue-tsc` passes, `build`, `npm test` (unit) and
a packed-surface check — **no Playwright step exists** (`grep -rn playwright .github/` → nothing).
The oracle that certifies this component's constitutive law has never been able to turn CI red. A law
whose only witness is un-runnable is not a law; it is a comment.

---

### D3-11 · MINOR · Focus is expressed in the same ink as the thing it is on

Tab-reached, `:focus-visible = true`, computed `stroke: oklch(0.438102 0.0748123 205)`,
`stroke-width: 0.045` → **7.5 px** of stroke on a **13.3 px** dot, in the identical ink as the curve
passing through it (`stroke-(--easing-curve-accent)` ← `--motion-accent`, supplied by *this seat's*
parent per interval). `VISUAL-CONSTITUTION.md:84` — *"Focus remains visibly distinct from selection in
both schemes, forced colors and reduced transparency."* Here focus is a hue change from
near-background to the curve's own colour; against the curve, it is close to no change at all
(`evidence/stage-focus-handle1.png` vs `evidence/stage-desktop-light.png` — the only difference is a
teal ring around a 13 px dot).

Because the seat supplies the ink, the collision is the seat's to resolve: adopt the house
`--focus-ring-shadow` register the parent already uses on its rail buttons, or give the producer a
`--easing-focus-ring` door.

---

### D3-12 · MINOR · The canvas's own reference frame is invisible

Plot frame **1.56 : 1**, gridlines **1.18 : 1**, axis labels **8.33 px at 2.41 : 1** (light) /
**3.19 : 1** (dark). WCAG 1.4.11 requires 3 : 1 for graphical objects needed to understand content —
and the unit box *is* the content of a cubic-bezier editor: without it, "0.445, 0.05, 0.55, 0.95"
has no visible referent. Two of the three fail in both schemes; the third fails as text at any size.
Half of this is the dead Law 3 (the 8.33 px), half is producer ink choice (`stroke-border/40`).

---

### D3-13 · MINOR · States that were never designed

Enumerated against the brief's list; `—` means the state cannot occur by construction.

| state | handled? | evidence |
|---|---|---|
| empty | — | `value` is a required prop; parent guards with `v-if` |
| loading | **no** | no skeleton, no reserve; the producer mounts synchronously |
| populated | **partially** | canvas correct; the `Preset` control shows a placeholder (D3-05) |
| **error** | **no** | there is no error surface *in* the stage; the failure path is the route-level ErrorBoundary (D3-02) |
| disabled | **no** | no `disabled` prop exists on the seat or the producer |
| focused | **weak** | D3-11 |
| hovered | **no** | handles have `cursor: move` and no hover expression |
| active / pressed | **no** | no expression during a handle grab |
| **dragging** | **no** | no cursor change, no crosshair, no live coordinate readout during drag |
| selected | n/a | selection lives in the sibling strip |
| overflowing / truncated | — | fixed-height box |
| RTL | pass | measured `dir=rtl`: geometry identical, axes not mirrored (correct per §5.2) |
| reduced-motion | **no** | D3-03 — effective 100 ms, not 0 |
| forced-colors | **not designed** | the well and border remap to `Canvas`/`ButtonText`; the curve, handles and gridlines are SVG `stroke`/`fill` and remap for nothing — the instrument keeps arbitrary chroma on a system-white ground, and focus (D3-11) stays the same ink as the curve |
| 200 % zoom | pass geometrically, **fails proportionally** | 436 px stage, 166.7 px specimen, unchanged |
| undefined authored value | **swallowed** | `GradientEasingEditor.vue:78-81` `if (!v) return` — a producer cancel is silently dropped |
| remount on model change | **contradicts its own doc** | the parent's doc says *"alive from birth"*, *"v-show, never v-if"*, yet `GradientEasingEditor.vue:208` is `v-if="intervals[row.index]"` |

---

## 5. Seat-law scorecard

| law | source | verdict |
|---|---|---|
| Law 1 — one column | own header ¶1 | **holds** — `grid-template-columns: 436px` measured |
| Law 2 — wells, not cards | own header ¶2 | **holds for the canvas card, fails for the chrome column** (D3-07) |
| Law 3 — zero letterbox (O-17) | own header ¶3 | **dead** (D3-01) |
| 19–22 rem protagonist | `VISUAL-CONSTITUTION.md:210`, PR-09 | **fails** — 10.42 rem (D3-04) |
| centred stage | `VISUAL-CONSTITUTION.md:210` | **fails in intent** — `margin-inline: 0 !important` (D3-04) |
| one selection owner | PR-06 | **fails** — two, one permanently empty (D3-05) |
| type jurisdiction | `VISUAL-CONSTITUTION.md:75` | **fails** — control label in the mono/value family (D3-07) |
| focus distinct in both schemes + forced colors | `VISUAL-CONSTITUTION.md:84` | **fails** (D3-11) |
| touch/visual/reservation are separate quantities | PR-12, card law 7 | **fails** — 13.3 px operable (D3-08) |
| glass-ui is the design system | edict 4 | **fails** (D3-09) |
| root-level styling | edict 5 | **fails** (D3-09) |
| no shims | edict 2 | **fails** (D3-09) |
| idiomatic Vue 3.5 · `verbatimModuleSyntax` | edicts 7, 8 | **pass** |

---

## 6. The gestalt cure

Not thirteen patches. One transposition, in this order:

1. **Delete `EasingAuthoringStage.vue`.** Every line of it is either a no-op (Law 3), a producer
   concern (Laws 1 and 2), or a rAF scrape of a null node. `GradientEasingEditor` can mount
   `<EasingPicker>` directly.
2. **Move the three laws into the P7 `EasingPicker-v2` packet as props**, where they are cheap and
   testable at the source: `columns="1"`, `material="well"`, `fit="contain"` (the canvas box follows
   its own live viewBox), `size` accepting a container-scaled clamp so the canvas can reach the
   ratified 19–22 rem, `preset={false}` so the strip is the only selection owner, and one visible,
   labelled `mode` control so the regime is not a sibling's side effect.
3. **Decide the easing domain once, at the model.** Either `mixColor` accepts overshoot under a named
   policy, or `GradientInterval`'s easing is `[0,1]`-valued by type and the producer is told to clamp.
   This is the only cure that closes D3-02 without a swallowing `catch`.
4. **Move the well to the stage, not the card**, so the whole disclosed instrument rides one certified
   paper (closes D3-07 and the type-family drift with it).
5. **Re-anchor O-17 on `[data-testid="easing-picker"] svg`** — a producer-owned id that actually
   exists — **and wire Playwright into `.github/workflows/ci.yml`.** A law with no runnable witness is
   how this component got here.

Steps 1–2 retire D3-01, D3-04, D3-05, D3-06, D3-08, D3-09, D3-11, D3-12 and the dead transition of
D3-03 together, because they are one defect seen from eight angles.

---

## 7. Negative proof — what I attacked and could not break

Stated so the next round can attack these instead:

- **Law 1 is real.** `grid-template-columns` computes `436px` (one column) in all nine matrices; the
  producer's `lg:grid-cols-[1fr_18rem]` is genuinely overridden. Not a finding.
- **Law 2 is real on the card it targets.** Measured `background` ≡ `--well-bg`, `box-shadow: none`,
  `backdrop-filter: none`, `border: 1px --card-edge` in both schemes. Not a finding.
- **Vue 3.5 idioms are correct.** `useTemplateRef`, reactive props destructure, and — the subtle one
  — `watch(() => value.css, …)` is a legal getter over a destructured prop in 3.5. `import type` on
  line 30 satisfies `verbatimModuleSyntax`. No finding here.
- **RTL is correct.** `dir=rtl` measured: identical geometry, arrow semantics unmirrored — which is
  what `VISUAL-CONSTITUTION.md:128` requires for scientific axes. Not a finding.
- **The curve ink is legible.** Roughly 4.4 : 1 light and 7.8 : 1 dark against the well — the
  `--motion-accent` per-interval ink clears 1.4.11. The contrast defects are in the *furniture*, not
  the curve.
- **No console or page errors** in any matrix until the crash is provoked; no horizontal overflow;
  `main` count 1 on the route.
- **Steps regime does follow the model** — I expected the stage to lie about mode and it does not.
  The defect is the missing control, not a stale render (D3-06).

---

## 8. Evidence index

Scripts (scratchpad, session-local):
`WBGEAS-probe2.mjs` (Chromium state matrix + geometry), `WBGEAS-probe3.mjs` (regime/colour),
`WBGEAS-probe4/5.mjs` (tile-click diagnosis), `WBGEAS-probe6.mjs` (**keyboard crash**),
`WBGEAS-probe7/8.mjs` (real-pixel contrast), `WBGEAS-probe9.mjs` (ink/RTL/320/focus),
`WBGEAS-probe10.mjs` (tab focus), `WBGEAS-probe11.mjs` (mode/tile matrix),
`WBGEAS-probe12/13.mjs` (PRM cascade), plus `probe-easing-stage.mjs` (WebKit 6-matrix).

Frames under `evidence/`:

| file | shows |
|---|---|
| `stage-desktop-light.png` | 59.3 % void, empty `Pick a curve` combobox, invisible frame |
| `stage-desktop-dark.png` | same geometry; the 3.02 : 1 support label |
| `stage-mobile-light.png` | 390 arm; the void narrows as the viewport shrinks |
| `stage-steps-regime.png` | regime flip; viewBox 1.0909 vs `--vb-ratio` 1.2 |
| `stage-overshoot-y060.png` | authored overshoot at y = 0.6, one step before the domain break |
| `crash-after-11-shift-arrowup.png` | route destroyed — `color_progress_out_of_range` |
| `stage-focus-handle1.png` | focus expressed in the curve's own ink |

Commands whose output is quoted verbatim above: the `grep` of `role:` in `dist/easing.js`; the
`npx playwright test … o17-easing-composition.spec.ts` run (3/3 RED); `grep -rn playwright .github/`
(empty).

---

*Round 3. Written at HEAD `c654824e`, branch `tranche-u`, against the live dev server. No source file
was modified by this seat.*
