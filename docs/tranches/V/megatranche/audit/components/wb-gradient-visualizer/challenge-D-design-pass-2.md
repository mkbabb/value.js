# CHALLENGE-D — `GradientVisualizer.vue` — the design is flawed (PASS 2)

## Model receipt

I observe myself to be **Opus 5 — exact model id `claude-opus-5[1m]`**. This seat was spawned with
an explicit Opus 5 declaration and the served tier matches it. The seat is **declared, not
inherited**; no undeclared-seat defect.

| | |
|---|---|
| Subject | `demo/workbenches/gradient/GradientVisualizer/GradientVisualizer.vue` (279 lines) |
| Area | `demo/workbenches` |
| Route | `/#/gradient` — sole mount, via `demo/workbenches/gradient/GradientPane.vue:25` |
| Repo / HEAD | `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, `c654824e` |
| Verdict | **DEFECTIVE** — 2 BLOCKER, 13 MAJOR, 6 MINOR, 3 INFO |
| Strongest defect | **D-1** — the panel headed `CSS` is not the gradient's CSS; the Easing region (the component's largest) is silently discarded by the only surface a user can read and copy |

**Pass note.** A prior CHALLENGE-D pass on this same component exists at HEAD. I preserved it
verbatim at `challenge-D-design-pass-1.md` and this file **supersedes and subsumes it**. Pass-1 IDs
`D-1…D-19` are kept stable for the ledger; pass-2-new rows are `E-1…E-8`. I independently
re-verified pass-1's strongest claim (D-1) with my own probe and **confirmed it**; I explicitly mark
the one pass-1 row I could not reach (D-5) as unverified-by-me. I also **correct** pass 1's
negative result on Motion (§3 below) with a measurement it did not take.

Evidence base for this pass: full read of the subject plus `GradientPane.vue`,
`GradientStopEditor.vue`, `useGradientCSS.ts`, `usePaneRouter.ts`; the tranche's Safari matrix
(`audit/visual/REPORT.{md,json}`) with the desktop-light, mobile-dark, forced-colors, zoom-200 and
rtl-mobile `gradient.png` captures **read as images**; the binding canon
(`VISUAL-CONSTITUTION.md`, `PROPORTION-AUDIT.md`); and three live read-only Playwright runs
(Chromium + WebKit, 320/390/720/1440, `reducedMotion: reduce`) whose scripts are committed at
`probes/challenge-D-design-probe.mjs`, `probes/challenge-D-states-probe.mjs`.

---

## 1. Visual truth first

### 1.1 The four Safari captures

`REPORT.md:125,140,155,170` — `/#/gradient` is clean on every mechanical axis: `overflowX 0`,
`main 1`, `pageErr 0`, `consoleErr 0`, `hasDarkClass` true in both dark matrices. Every visual
defect below is a *composition* defect, not a crash. Two a11y rows are non-zero and both belong to
this component: `smallTapTargets 6` and **`namelessButtons 1`** (`REPORT.md:100,107,111,113` — all
four matrices, desktop **and** mobile).

### 1.2 Desktop light (`shots/safari-desktop-light/gradient.png`)

The Interpolation band reads as four unrelated ideas in one rectangle: three uppercase Fira-Code
labels over three pill triggers; a fourth label/value pair over a slider; and, hanging off the
right edge, a portrait tile painting the *same left-to-right ramp already painted 90 px above it*.
The eye has no reason to travel to the tile, because at the component's default state the tile
carries no information the rail does not. The three `<hr>` rules cut the column into four slabs
that the three `h3` headings had already separated — the boundary is stated twice, once by
material and once by line.

### 1.3 Mobile is a legibility failure (`shots/safari-mobile-dark/gradient.png`)

The three primary semantic selectors of the instrument render as **`Lin⌄  Ok⌄  Sh⌄`**. Not
abbreviated — clipped mid-word. This is the whole point of the section and it is unreadable.
Measured (§D-2, §E-1) the value box is 27 px against 41–48 px of ink at 390, and **4 px against
41–48 px at 320**.

### 1.4 The render tile is an ellipse of unowned eccentricity

Measured aspect: **0.657** at 390, **0.747** at 1440, **0.776** at 720. Three viewports, three
proportions, for one fixture — because its block size is emergent from `row-span-2` over two rows
whose heights are set by *label line-boxes*. The source comment calls it "a square-ish surface"
(`:215`). It has never been square. Consequence in §D-3.

New in this pass: `evidence/challenge-D-chromium-1440-conic-tile.png` shows the conic case. In a
96 × 128.55 portrait box the angular sweep's hard 100%→0% wrap seam is a knife edge across the
tile, and the sweep's centre sits in a frame whose two axes disagree by 34 %. An instrument for
radially-symmetric forms is housed in a rectangle whose eccentricity nobody chose.

### 1.5 Dark mode

`hasDarkClass` true in both dark matrices; no light-mode leak. But the dark pane reads as a muddy
maroon-brown because the neutral glass is tinted by the pink ambient field behind it, and the three
`h3` section headings are painted `text-muted-foreground` at the *largest* non-title size in the
pane — simultaneously the biggest and the dimmest type on the surface. That is a hierarchy
contradiction, not a token bug (§D-7).

### 1.6 Zoom 200 % — a genuine pass

`shots/zoom-200-desktop/gradient.png` plus my 720 px measurement: trigger value boxes are 108 px
with 43–50 px of ink, `clipped 0`. The composition holds. **Negative result, recorded as such.**

### 1.7 RTL (`shots/rtl-mobile/gradient.png`) — a new defect

The Direction row's label/value pair mirrors (logical `justify-between`, `:228`) while the slider
track does **not** (correct — `VISUAL-CONSTITUTION §5.2`: "numeric/scientific sign never mirrors";
the orange fill stays physically left at 25 % for value 90/360 in both directions). The result is
that in RTL the word `DIRECTION` sits above the track's **maximum** end and the live value `90°`
sits above its **minimum** end. The annotation no longer annotates the thing it measures (§E-6).

### 1.8 Forced colors — the capture is void, carried from pass 1

`shots/forced-colors-desktop/gradient.png` is pixel-indistinguishable from
`shots/safari-desktop-light/gradient.png`: same pink field, same pastel `Palettes` wordmark, same
tile gradient. WebKit did not apply the emulation. **Forced-colors is therefore UNPROVEN for this
component, not proven-good.** `GradientStopEditor.vue:353` carries a `@media (forced-colors:
active)` block; `GradientVisualizer.vue` carries **zero**, for a component whose entire information
payload is `background-image` (§D-15).

---

## 2. State coverage

Enumerated exhaustively. `✗` = never designed.

| State | Handled? | Evidence |
|---|---|---|
| default / populated | ✓ | `:118-125` `resetGradient` seeds 2 stops, linear, 90°, oklch, shorter |
| **empty (0 stops)** | **✗ — designed as a throw** | `:66` `throw new Error("A gradient must retain at least one stop")` |
| **degenerate (unsorted / missing interval)** | **✗ — designed as a throw** | `:77`, `:87` throw inside a render-path pure function |
| loading | n/a | no async surface |
| **error (parse rejection)** | partial | `:100` `parseVerdict` is a bare string handed to a child; this component draws nothing |
| **error (clipboard write fails)** | **✗** | `:127-129` `await writeClipboard(...)` — no `try`, no status, no confirmation |
| **error (`seedFromPalette` no-op)** | **✗ — three silent paths** | `:111` `if (!pm) return`, `:112` `[0]?.`, `:113` `length >= 2` else nothing |
| disabled | **✗** | `:232` Direction slider stays live for `radial`, where it controls nothing |
| focused | **split register** | Select triggers: branded `box-shadow …/0.3 0 0 0 2px`, `outline: none`. Slider: UA `outline: 1px auto rgb(0,95,204)` |
| hovered / active / pressed | ✓ (producer) | `dock-icon-button glass-capsule-hover`; rail handles own a scale ladder |
| selected | ✓ (delegated) | `selectedStopId` `defineModel`, `:51` |
| dragging | ✓ (child) | `GradientStopEditor` owns it |
| **overflowing / truncated** | **✗ — the defect** | 320 px: value box 4 px vs 41 px ink |
| **RTL** | partial | label/track mirroring mismatch (§1.7) |
| reduced-motion | **regresses** | transitioning elements 49 → **250** (§3) |
| **forced-colors** | **✗ / UNPROVEN** | 0 `forced-colors` rules in this file; tranche capture void |
| zoom 200 % | ✓ | `clipped 0` at 720 px |
| **type = radial** | **✗** | dead Direction control; ellipse-for-circle |
| **type = conic** | **✗** | "Direction" silently means *start angle* (`useGradientCSS.ts:153-154`) |
| **eased intervals** | **✗ — the BLOCKER** | tile 33 stops eased, editor 2 stops un-eased (§D-1) |

Fifteen of twenty-two states are unhandled, mis-handled or unproven. **A state that was never
designed is a design defect**, and this component's designed answer to three of them is an
uncaught `throw`.

---

## 3. Motion — correcting pass 1

`GradientVisualizer.vue` authors zero transitions, animations or keyframes. Pass 1 concluded "no
motion defect… `prefers-reduced-motion` is honoured at the page level" from `STATES.json`'s
`rafPer1500ms: 0`. That measures **RAF loops**, not CSS. I measured the CSS.

```
chromium 1440, no PRM      tile: transitionProperty "all"  duration "0s"
                           transitioning elements in the visualizer subtree: 49

chromium 1440, reducedMotion:"reduce"
                           matchMedia("(prefers-reduced-motion: reduce)").matches = true
                           tile: transitionProperty "opacity, color, background-color,
                                                     border-color, box-shadow"
                                 duration "0.1s"
                           transitioning elements in the visualizer subtree: 250
```

`demo/styles/animations.css:184-191` declares, for this exact media query,
`transition-duration: 0.01ms !important` on `*, *::before, *::after`. The rendered value is
**0.1 s** — 10 000× the intended value — and the element count goes **up** by 201. Under reduced
motion this component has *more* transitioning surfaces than without it.
`VISUAL-CONSTITUTION §6`: "Reduced motion resolves directly to the final geometry and stable
chromatic state." It does not.

I could not identify the winning declaration (my CSSOM walk returned `hits: []`; no source file
declares that property list under a reduce query). **The mechanism is a labelled hypothesis; the
measurement is not.** The site is this component's surfaces; the cure is at the global root, not
per-instance (edict 5). Filed as **E-5**.

Separately, the tile — the surface that changes most violently (linear → radial → conic) — has no
transition in either state, so the specimen snaps while every control around it eases. A gap in the
register, filed INFO.

---

## 4. The design-system boundary — a five-fold breach in one file

`@mkbabb/glass-ui@7.0.0` is installed and exports **74** subpaths, including:

```
$ node -e "…Object.keys(require('@mkbabb/glass-ui/package.json').exports)…"
./label   ./labeled-field   ./number-field   ./select   ./separator   ./slider   ./tooltip
```

`GradientVisualizer.vue` uses **none** of them:

| Need | What the file does | What glass-ui ships |
|---|---|---|
| select | `:9` `from "../../../ui/select"` (demo/ui shadcn) | `./select` |
| slider | `:10` `from "../../../ui/slider"` (demo/ui shadcn) | `./slider` |
| divider | `:148,240,251` raw `<hr class="border-border">` | `./separator` |
| label + field couple | hand-rolled `<span class="section-label">` + control ×4 | `./label`, `./labeled-field` |
| numeric entry for Direction | absent | `./number-field` |

Owner edict 4 — "Glass-ui is the design system… **Reuse existing component-type names**".
`VISUAL-CONSTITUTION §5` is more specific still: "The domain-neutral axis composition sits over
**BI `Slider`**: label, unit, reserved live value, **optional numeric entry**… Picker, Generate
count, Extract, **Gradient**, Atmosphere and Blob adopt that one composition."

The breach is not theoretical — it is measurable in the focus register (§E-3) and in the missing
value reservation (§E-2). Filed as **E-4**.

Meanwhile the file *does* reach into glass-ui for the one thing it should not: `:13`
`import { DockControl } from "@mkbabb/glass-ui/dock"` — the **dock's** control species, planted in
a pane body, rendering live as `dock-icon-button glass-specular-track glass-capsule-hover
dock-icon-button--compact`. `VISUAL-CONSTITUTION §2`: "One surface has one tier." §3 law 4: "The
top dock owns a reserved band."

---

## 5. Proportion and seat law

| Law | Verdict |
|---|---|
| `§3` law 8 — "One pane may have one full-strength protagonist. Supporting fixtures do not compete with it through equal size or **equal shadow**." | **VIOLATED.** Rail `box-shadow: color(srgb 0.11 0.098 0.09 / 0.06) 0px 2px 8px 0px`. Tile: **byte-identical**. Tile block 128.55 px = **3.21×** the rail's 40 px; tile area 12 341 px² = **66.8 %** of the rail's 18 480 px². |
| `§7 Gradient` — "The rounded meniscus rail and its preview dominate." | **VIOLATED.** See above and D-11 (preview share 6.40 % of component height; Easing 49.8 %). |
| `§4.2` / `PR-05` — "only the five Admin lists retain a separator; **every other composition retains no divider**" | **VIOLATED, 3×.** `hrCount 3`, y = 260.7 / 480.8 / 769.3. |
| `§4` type matrix ("closed across all eighteen compositions") | **VIOLATED, 10 sites.** 3 `h3` in Fraunces `text-subheading`; 4 `.section-label` in Fira Code; 3 `text-micro` outside the matrix entirely. |
| `§4` — live numbers "reserve their widest legal representation so value changes never reflow" | **VIOLATED.** Readout ink 20.19 px → 40.38 px within one drag. |
| `§3.1` — Gradient outer housing `InstrumentChassis`; "no nested stage Card" | **VIOLATED** (D-12: `grep -rn InstrumentChassis demo/` → 0 hits; `GradientPane.vue:21` wraps in `Card tier="resting"`). |
| `§5.5` micro-UI — "operable ornaments without names are forbidden" | **VIOLATED.** The Copy CSS button is the route's only nameless button. |
| `PROPORTION-AUDIT §1` — "Every element earns its scale, interval, boundary and material from its job relative to the local protagonist." | **VIOLATED.** The tile's scale is a residue of two label line-boxes. |
| `PROPORTION-AUDIT §5.8` — "Real rendered relation wins over token intent… token presence alone cannot close a row." | **Instantiated twice**: `tabular-nums` present but width unreserved; `role="img"` present but the name never changes. |
| `PR-13` — "specimen and action region both host Copy → total 2→1" | **VIOLATED at the Gradient site.** `usePaneRouter.ts:209` + `GradientVisualizer.vue:254`. |
| `§3` law 3 — "Configuration panes show preview first, controls second" | Met (rail is first). |
| `§3.6` mobile sequence | Met structurally; broken typographically (§1.3). |

---

## 6. Defects

### D-1 · BLOCKER · the panel headed `CSS` is not the gradient's CSS

*(pass-1 row, independently re-verified by me this pass)*

**Mechanism.** Three surfaces claim to represent one gradient; two serializers and one clipboard
write feed them.

```
:259  <GradientCodeEditor :model-value="simpleCSS" …/>   ← what the user READS
:224  :style="{ '--tile-render': coalescedCSS }"          ← what the user SEES
:128  await writeClipboard(coalescedCSS.value)            ← what the user GETS
```

`useGradientCSS.ts` `serializeGradient` emits the raw stops with easing **not** baked in;
`serializeCoalescedGradient` emits 32 eased sub-stops (`COALESCE_RESOLUTION = 32`). They agree only
while every interval is `linear`.

**My reproduction** (Chromium 1440×900, pasted output):

```
BEFORE      easingLiterals ["cubic-bezier(0, 0, 1, 1)"]
            tileStops 33   tileBgHead "…oklch(0.75 0.15 145) 0%, oklch(0.746875 0.150937 148.75) 3.13%…"
            editorText "linear-gradient(90deg, oklch(0.75 0.15 145) 0%, oklch(0.65 0.18 265) 100%)"
            editorStops 2

click the `in-out` easing specimen →

AFTER-EASE  easingLiterals ["cubic-bezier(0.42, 0, 0.58, 1)"]
            tileStops 33   tileBgHead "…oklch(0.75 0.15 145) 0%, oklch(0.749813 0.150056 145.225) 3.13%…"
            editorText "linear-gradient(90deg, oklch(0.75 0.15 145) 0%, oklch(0.65 0.18 265) 100%)"   ← BYTE-IDENTICAL
            editorStops 2
```

The paint changed at 3.13 % (`0.746875 0.150937 148.75` → `0.749813 0.150056 145.225`). The panel
labelled `CSS` did not change at all.

**Consequence.** The Easing region is the component's largest (pass-1: 519 px, 49.8 % of component
height, a curve catalogue plus a bezier authoring stage). Everything authored there is discarded by
the only string a user can read. Select-and-paste ships a linear ramp; pressing Copy ships 33 stops
the user has never seen and cannot verify.

**Law.** `§5` "select → tune → commit"; `§7 Gradient` — the code inspector is part of the
instrument's argument, not a second opinion.

**Cure (gestalt).** One gradient, one serialization on screen. The editor shows the render truth.
If the compact authored form is worth keeping it becomes a *named, visible* representation toggle
in the same well (producer `SegmentedTabs`, `Compact ⇄ Expanded`) and Copy copies exactly the bytes
under the caret. Delete `simpleCSS` as an unlabelled parallel path — a second serializer no surface
names is a dual path (edict 2).

---

### D-2 · BLOCKER · the three primary settings clip to unreadable at both named narrow arms

**Mechanism.** `:158` `class="grid grid-cols-3 gap-3 min-w-0"` — a fixed 3-up with no responsive
step, sharing its row with a fixed-width tile (`:223` `w-20 sm:w-24`, the one element that *did*
get a responsive token). At 390 px the tile + gap take 92 px of a 324 px content box — **28.4 %** —
leaving 69.3 px per trigger of which 27 px is text room.

**Measured** (`probes/challenge-D-states-probe.mjs`, pasted):

```
webkit-390     Gradient type        value "Linear"   box 27  ink 41  clipped 14   triggerW 69.33
               Interpolation space  value "OKLCh"    box 27  ink 48  clipped 21   triggerW 69.33
               Hue interpolation    value "Shorter"  box 27  ink 48  clipped 21   triggerW 69.33

chromium-320   Gradient type        value "Linear"   box  4  ink 41  clipped 37   triggerW 46
               Interpolation space  value "OKLCh"    box  4  ink 48  clipped 44   triggerW 46
               Hue interpolation    value "Shorter"  box  4  ink 48  clipped 44   triggerW 46
```

At 320 px the value box is **four CSS pixels**. Corroborated by the tranche's own WebKit captures,
which render `Lin⌄ Ok⌄ Sh⌄` (`shots/safari-mobile-{light,dark}/gradient.png`).

**Aggravating detail.** `:159-161` records that the per-select *subtitle* rows were excised because
"they truncated at every viewport". The cure was applied to the symptom's neighbour; the **value
itself** still truncates.

**Law.** 390 px **and 320 px** are named binding evidence arms — `VISUAL-CONSTITUTION §3.2`, §4
("1440px, 390px, 320px, and actual 400%-zoom"); `PROPORTION-AUDIT §2`. `§3.7`: "no
desktop-tight/mobile-airy fork and no breakpoint pile."

**Cure.** The band is a label/value list, not a 3-across: it stacks below `sm` (glass-ui
`LabeledField`). The tile leaves the right rail entirely (see D-3/D-14 — it should not be a grid
sibling of the controls at all). The trigger may wrap; the value never may.

---

### D-3 · MAJOR · the render tile has no proportion of its own, so a "circle" renders as an ellipse

**Evidence.** `:223` `class="gradient-render-tile row-span-2 w-20 sm:w-24 …"` inside
`grid-cols-[minmax(0,1fr)_auto]` (`:157`). Inline size is a token; block size is emergent from two
rows sized by label line-boxes.

```
tile w×h / aspect      1440: 96 × 128.55  → 0.747
                        720: 96 × 123.73  → 0.776
                        390: 80 × 121.84  → 0.657
```

`useGradientCSS.ts:151-154` emits `radial-gradient(<stops>)` with **no shape keyword**, so CSS
resolves the initial value `farthest-corner ellipse`. In a 96 × 128.55 box the render is an ellipse
of axis ratio 1 : 1.34 — while the Type option's own description, in this file, reads
**"Center-outward circle"** (`:55`). Measured live with `type=radial`:
`tileBg: "radial-gradient(oklch(0.75 0.15 145) 0% …"`. Conic evidence:
`evidence/challenge-D-chromium-1440-conic-tile.png`.

**Law.** `PROPORTION-AUDIT §1` — every element earns its scale from its job. `§8` — a visual claim
needs a named geometry delta; here the geometry is unowned across three viewports.

**Cure.** The render surface owns an explicit `aspect-ratio` (1/1 for radial/conic; the rail's own
ratio for linear) and stops being a residue. Better: it stops being a right-rail fixture — D-14.

---

### D-4 · MAJOR · Direction stays live, focusable and labelled while controlling nothing

**Mechanism.** `useGradientCSS.ts:151-154`:

```ts
if (model.type === "linear" && model.direction !== 180) parts.push(`${model.direction}deg`);
else if (model.type === "conic")                        parts.push(`from ${model.direction}deg`);
```

`radial` never consumes `direction`. And for `conic` the value silently changes meaning from
*direction* to *start angle* — one label, three semantics, one of them null.

**Measured** with `type=radial`:

```
sliderDisabled { ariaDisabled: null, dataDisabled: null, tabIndex: 0,
                 pointerEvents: "auto", opacity: "1" }
tileBg         "radial-gradient(oklch(0.75 0.15 145) 0% …"     ← no angle anywhere
```

The user can drag 0 → 360 and change nothing, with no disabled affordance and no announcement.
(`aria-valuetext` is also `null` and `aria-valuenow` is `"90"`, so the unit is never announced —
`§5.2`: "announce label, value, **unit**".)

**Law.** `§4.1` — "Selected, failed, pending, withdrawn and **disabled** states are never
color-only. Role, accessible name, state/value… are explicit." Here the disabled state is not
expressed *at all*, which is strictly worse than color-only.

**Cure.** The control is type-conditional, not type-agnostic: `linear` → **Angle**; `conic` →
**Start angle**; `radial` → the axis is replaced by the parameters radial actually has (shape,
extent). A single "Direction" slider across all three types is the wrong model, not a slider that
needs a disabled skin.

---

### D-5 · MAJOR · "Reset" does not reset — the easing survives it *(pass-1 row, NOT re-verified by me)*

Pass 1 reports that Dock **Reset** leaves the interval literal at
`cubic-bezier(0.42, 0, 0.58, 1)`. Reading `:118-125`, `resetGradient()` sets stops, type,
direction, space, hue and `parseVerdict` and **never touches `intervals`**, which is consistent
with the claim. My probe could not reach the Dock Reset control (`RESET NOT FOUND` — the Tools
action set did not open under automation), so **for this pass D-5 is a code-supported hypothesis,
not a reproduction I own.** Carried at pass-1's severity pending a live witness.

---

### D-6 · MAJOR · three `<hr>` where the binding composition says zero

**Measured.** `hrCount: 3` inside `main` on `/#/gradient`, at y = 260.7 / 480.8 / 769.3 (1440),
`borderTopColor rgb(198, 180, 159)`. Source: `:148`, `:240`, `:251`.

**Law.** `PROPORTION-AUDIT §4 PR-05`: "`OPTICAL-BENCH-COMPOSITIONS.md §5` is binding: every P122
workbench uses boundaries `[]`/reserve `none`; only the five Admin fields retain one adjacent-row
separator… **every other divider/ornament is zero**." `VISUAL-CONSTITUTION §4.2` restates it. `§5`
card-law 4: "A divider is retained only when grouping would be ambiguous without it. Spacing plus
material already expressing the same boundary makes the line duplicative." Each `<hr>` here is
immediately followed by an `<h3>` that already declares the boundary. `PR-14` names this exact
pathology on About and rules it `7→0`.

**Cure.** Delete all three; section rhythm plus the heading own the grouping. If a boundary is ever
genuinely needed it is `InstrumentChassis`'s typed boundary set, not a consumer `<hr>`.

---

### D-7 · MAJOR · section headings wear the palette-identity costume

**Measured** (all three, all viewports):

```
"Interpolation" / "Easing" / "CSS"
  fontFamily "Fraunces"   fontSize 20.352px   fontWeight 600
  color rgb(112, 89, 66)  class "font-display text-subheading text-muted-foreground"
```

Source `:149`, `:241`, `:253`.

**Law.** `VISUAL-CONSTITUTION §4`: `section heading` → `text-heading` → **Plus Jakarta Sans**;
`--type-subheading` → **Fraunces** is reserved for `palette identity`. "This matrix is closed
across all eighteen compositions." `PROPORTION-AUDIT §5.13` restates: "Fraunces owns
display/identity, Plus Jakarta Sans owns headings/prose/controls."

**Second-order defect.** These are simultaneously the largest non-title type in the pane *and*
painted in the de-emphasis role (`text-muted-foreground`). Big and dim at once is a hierarchy
contradiction independent of the family.

**Cure.** `text-heading`, Plus Jakarta Sans, full-strength ink; the de-emphasis comes from size and
interval, not from muting a heading.

---

### D-8 · MAJOR · control labels wear the value/code jurisdiction

**Measured** `.section-label` (`:163`, `:180`, `:197`, `:229`):

```
fontFamily "Fira Code"   fontSize 14.384px (1440) / 12.179px (390)
fontWeight 400  letterSpacing 1.4384px  textTransform "uppercase"
```

**Law.** `§4`: "control or label, **including dropdown options** → `text-small` → Plus Jakarta
Sans, non-bold". Fira Code is the closed matrix's `value, code, or provenance` family. `TYPE`,
`SPACE`, `HUE`, `DIRECTION` are control labels rendered in the code family, uppercased and
letterspaced — which is also why they are wider than they need to be in the band that has no width
to spare (D-2).

**Cure.** Root-level: `.section-label` is a shared recipe with 8+ demo consumers
(`MixConfigBar`, `GenerateControls`, `MixSourceSelector`, `SearchFilterBar`, `AdminTagsPanel`,
`TagEditPopover`, …), so the fix belongs at the glass-ui typography root — **never a per-instance
override here** (edict 5). The consumer's job is to adopt `Label` / `LabeledField`.

---

### D-9 · MAJOR · Copy CSS is the route's only nameless button, is a dock primitive in a pane body, and is the second seat for one command

**(a) Namelessness — pinned to this file.** Using the audit's own predicate verbatim
(`audit/visual/capture.mjs:102-105`: `aria-label || aria-labelledby || textContent`, `title` **not**
counted), across five engine/viewport runs the page contains exactly one nameless visible button,
every time:

```
[{ cls: "dock-icon-button glass-specular-track glass-capsule-hover dock-icon-button--compact",
   title: "Copy CSS", inPane: true }]

chromium-1440 · chromium-320 · chromium-prm-1440 · webkit-1440 · webkit-390  → all identical
```

That is `GradientVisualizer.vue:254-256`, and it is the `namelessButtons: 1` row that
`/#/gradient` carries in **all four** Safari matrices (`REPORT.md:100,107,111,113`) — including the
two mobile matrices, where the Dock contributes zero and only two routes in the whole app are
non-zero.

**(b) Wrong species.** `:13` imports `DockControl` from `@mkbabb/glass-ui/dock`. `§2`: "One surface
has one tier." §3 law 4: the dock owns a reserved band. A specular dock capsule floating in a
content section is a tier collision, and it is why its only name channel is a `title` tooltip.

**(c) Duplicate seat.** `usePaneRouter.ts:209` already registers, for `view === "gradient"`:

```ts
{ key: "copy", icon: Copy, title: "Copy CSS",
  description: "Copy the gradient CSS to clipboard.",
  handler: () => paneRefs.gradient.value?.copyCSS?.() }
```

Same icon, same string, same command, second seat — reached through this file's own
`defineExpose({ resetGradient, copyCSS, seedFromPalette })` (`:131`). `PROPORTION-AUDIT §4 PR-13`:
"Picker specimen and action region both host Copy → **REMOVE** → specimen 1→0; action 1→1; total
2→1." Same family, different route.

**Cure.** Delete the in-body control. Copy lives once, in the action region, named
(`§7 Picker`: "Copy lives once in the action region"). `§5.5`: "operable ornaments without names are
forbidden."

---

### D-10 · MAJOR · Copy has no confirmation and no failure state

`:127-129` — `async function copyCSS() { await writeClipboard(coalescedCSS.value); }`. No `try`, no
returned status, no surface. A rejected clipboard permission, an insecure context, or a
`NotAllowedError` produces an unhandled rejection and a UI identical to success. `§4.1`: "failed…
states are never color-only." `PR-08`: "Pending/failure… truth only transient →
**ADD-AFFORDANCE**."

**Cure.** The action region owns one durable result region for the whole instrument; `copyCSS`
returns a result the region renders. Not a toast, not a tooltip (`§5.6`: "Subtraction precedes
explanation").

---

### D-11 · MAJOR · protagonist inversion *(pass-1 row, corroborated with my own numbers)*

Pass 1 measured the meniscus preview at 6.40 % of component height and the Easing inspector at
49.8 %. My independent measurement of the competing pair:

```
rail (protagonist)  462 × 40      area 18 480 px²   box-shadow  …/0.06 0px 2px 8px 0px
tile (support)       96 × 128.55  area 12 341 px²   box-shadow  …/0.06 0px 2px 8px 0px   ← identical
tile block / rail block = 3.21 ×          tile area / rail area = 66.8 %
```

`§7 Gradient`: "The rounded meniscus rail and its preview dominate." `§3` law 8: supports "do not
compete… through equal size or **equal shadow**." `PR-09`: "Gradient/Easing protagonist
subordinated → **ENLARGE**." Open.

---

### D-12 · MAJOR · the housing contract is unmet *(pass-1 row)*

`grep -rn InstrumentChassis demo/` → 0 hits. `VISUAL-CONSTITUTION §3.1` binds Gradient to
`InstrumentChassis` with "no nested stage Card"; `GradientPane.vue:21` wraps the whole thing in
`Card tier="resting"` and `GradientVisualizer` emits a bare `flex flex-col gap-5` with no
stage / inspector / action regions at all. The composition the canon specifies does not exist in
code.

---

### D-13 · MINOR · a support fixture carries the protagonist's shadow

Retained as a distinct ledger row from D-11 because the cure differs: `:277` `box-shadow:
var(--shadow-sm)` on `.gradient-render-tile` is a consumer-authored shadow on a support fixture.
`§2`: "Instrument veil… no drop shadow." `PR-05` includes "caster shadows" → **REMOVE**. The tile
already has `border border-card-edge` + `rounded-card` (16 px) + an alpha-checker ground: four
boundary devices on a 96 px fixture.

---

### D-14 · MINOR · at rest the tile is a redundant second specimen

Measured at the component's default *and* `resetGradient()` state (`:118-125`: linear, 90°):

```
tile background-image  "linear-gradient(90deg, oklch(0.75 0.15 145) 0%, oklch(0.746875 …"
```

`useGradientCSS.ts:258-262` — the rail "ALWAYS paints" `linear-gradient(90deg, …)`, "at every
type/direction". At the default the two surfaces are the same image. The tile earns its area only
when `type ≠ linear` or `direction ∉ {90, 270}` — and it charges 28.4 % of the mobile control width
for that option (D-2). `§3` law 2 / `PR-04`: absent (here: redundant) support collapses.

**Cure — the gestalt transposition, and my recommended architecture.** The rail and the tile are
two renderings of one gradient; the file's own comments admit the split (`:214-218` "the honest
surface"; `useGradientCSS.ts:258-262` "the rail ALWAYS paints this… normalized to 90° for
editing"). Collapse to **one specimen**: the meniscus rail *is* the render (type + direction
applied), with the stop handles riding an explicit normalized axis track beneath it. Failing that,
the render becomes a full-inline-width specimen band at the top of the Interpolation section, where
it can own an `aspect-ratio` and where it costs the controls nothing. Either way the right-rail
fixture dies and D-2, D-3, D-11, D-13 and D-14 close together.

---

### D-15 · MINOR · forced-colors is unhandled here and the tranche's capture is void

Zero `@media (forced-colors: active)` rules in `GradientVisualizer.vue`, for a component whose
entire payload is `background-image` and whose sibling `GradientStopEditor.vue:353` does carry one.
And `shots/forced-colors-desktop/gradient.png` is indistinguishable from the plain light capture,
so the emulation did not apply — **the state is unproven, not passing**.

---

### D-16 · MINOR · `defineModel("selectedStopId")` is a public two-way API with no consumer *(pass-1 row)*

`:51` declares it; `GradientPane.vue:25` mounts `<GradientVisualizer ref="visualizerRef" />` with
no `v-model:selected-stop-id`. A public reactive contract with zero callers is dead surface
(edict 2/3).

---

### D-17 · MINOR · silent no-op paths and a hard-coded selection model

`:110-116` `seedFromPalette()` — `if (!pm) return`; `savedPalettes.value[0]?.colors` (the **first**
palette, hard-coded, never chosen by the user); `if (colors && colors.length >= 2)` else nothing.
It is a *named dock action* (`usePaneRouter.ts:210`, "Seed gradient stops from a saved palette")
that can do nothing three different ways with no status. `§4.1` + `PR-08`.

**Cure.** The command either has a subject (a chosen palette) or it is not offered. Absent a
qualifying palette the action is disabled with a stated reason; success names which palette seeded.

---

### D-18 · INFO · four sibling `h3`s and no `h1` *(pass-1 row)*

`REPORT.md` per-capture table: `h1 = 0` on every route. The route H1 is the shell's job per `§4.1`;
this component contributes three `h3`s under `PaneHeader`'s `h3`, so the pane's heading tree is
four flat siblings with no `h1` above them.

---

### D-19 · INFO · nested easing catalogue is a 1482 px scroller inside a 462 px column *(pass-1 row)*

`§7 Easing`: "Catalogue and specimen strips support the curve rather than reducing it to a tiny
nested widget."

---

### E-1 · MAJOR · the 320 px arm was never measured; it is 6× worse than 390

Folded into D-2's evidence, retained as its own ledger row because it is a *new named-arm failure*:
`box 4 / ink 41` at `chromium-320`, `triggerW 46`. `VISUAL-CONSTITUTION §3.2` and §4 name 320 px as
a binding observation arm alongside 1440, 390 and actual 400 % zoom. No prior pass measured it.

---

### E-2 · MAJOR · the live value does not reserve its widest legal representation

**Measured**, keyboard `Home` then `End` on the Direction slider:

```
1440   0°   left 557.81  right 578  w 20.19
     360°   left 537.63  right 578  w 40.38     → left edge travels 20.18 px
 720   0°   w 17.98   → 360°  w 35.95
 390   0°   w 17.23   → 360°  w 34.47
computed  fontVariantNumeric "tabular-nums"   minWidth "auto"
```

`:230` `<span class="text-mono-small … tabular-nums">{{ direction }}&deg;</span>` inside
`justify-between` (`:228`). The right edge is pinned, so the *ink* jumps two digit-widths during a
single continuous drag.

**Law.** `§4`: "Live numbers use tabular figures **and reserve their widest legal representation so
value changes never reflow the settled chassis**." `PROPORTION-AUDIT §5.8`: "Real rendered relation
wins over token intent… token presence alone cannot close a row" — `tabular-nums` is present and
insufficient.

**Cure.** The reserved-value slot is part of glass-ui's axis composition (`§5`: "label, unit,
**reserved live value**, optional numeric entry"). Adopt it; do not hand-roll a `justify-between`
row and hope.

---

### E-3 · MAJOR · two focus vocabularies inside one two-row band

**Measured**, tabbing from the Type trigger (Chromium 1440):

```
Gradient type         outline "3px none rgb(28, 25, 23)"     boxShadow "color(srgb 0.6655 0.0001 0.2617 / 0.3) 0px 0px 0px 2px…"
Interpolation space   idem
Hue interpolation     idem
Gradient direction    outline "1px auto rgb(0, 95, 204)"     boxShadow "none"          ← UA default blue
```

The three Selects consume the app's branded focus register; the Slider — 20 px below them, in the
same band — falls back to the browser's native blue outline. `demo/styles/focus-ring.css` exists
precisely as the single register ("…its forced-colors/prefers-contrast register — never a…"); the
demo/ui Slider is outside it.

**Law.** `§4.1`: "Focus remains visibly distinct from selection in both schemes, forced colors and
reduced transparency" — a register the component only half-consumes cannot satisfy the
forced-colors and reduced-transparency arms.

**Cure.** Root: glass-ui `Slider` (E-4), which owns the register. Not a per-instance
`focus-visible` patch here (edict 5).

---

### E-4 · MAJOR · five design-system boundary breaches in one 279-line file

See §4. `Select` and `Slider` come from `demo/ui/` while `@mkbabb/glass-ui@7.0.0` ships `./select`
and `./slider`; the divider is a raw `<hr>` while `./separator` exists; the label/field couple is
hand-rolled four times while `./label` and `./labeled-field` exist; Direction has no numeric entry
while `./number-field` exists and `§5` calls it out by name. Owner edict 4 +
`VISUAL-CONSTITUTION §5` ("sits over BI `Slider`"). E-2 and E-3 are the *measured consequences* of
this one breach — which is why the cure is a transposition, not four patches.

---

### E-5 · MAJOR · reduced motion makes it worse, and the global guard does not reach these surfaces

Full measurement in §3: 49 → **250** transitioning elements in the visualizer subtree under
`prefers-reduced-motion: reduce`; the render tile acquires
`transition: opacity, color, background-color, border-color, box-shadow 0.1s` where
`demo/styles/animations.css:184-191` declares `transition-duration: 0.01ms !important` for the same
media query. `§6`: "Reduced motion resolves directly to the final geometry and stable chromatic
state."

The mechanism is a **labelled hypothesis** (my CSSOM walk found no matching declaration; no source
file declares that property list under a reduce query). The measurement is reproducible. The site
is this component; the jurisdiction is the global root.

---

### E-6 · MINOR · RTL — the Direction annotation no longer annotates its axis

`shots/rtl-mobile/gradient.png`: `DIRECTION` sits at the physical right, `90°` at the physical
left, while the slider fill remains at the physical-left 25 % (correct per `§5.2`, "numeric/
scientific sign never mirrors"). The label therefore captions the maximum end of the track and the
live value captions the minimum end. Cause: `:228` uses a logical `justify-between` row over a
physically-anchored track.

**Cure.** The axis composition binds label, unit and value to the track's own start/end, which is
exactly what a producer-owned Slider composition does (E-4).

*Adjacent, not mine, filed to those seats:* in the same capture `GradientEasingEditor`'s interval
label renders `2 → 1` instead of `1 → 2` (ordinal digits reordered by bidi — `§5.2` "preserve
explicit ordinal identity"), and `PaneHeader`'s description renders `.Build gradients with…` with
the terminal period moved to the front (`§6.1`: strings "render in LTR-isolated spans inside RTL
prose").

---

### E-7 · MINOR · the render tile's accessible name is a constant across every state it exists to communicate

**Measured**, three probes, one string:

```
type = linear   aria-label "Gradient render with type and direction applied"
type = radial   aria-label "Gradient render with type and direction applied"
type = conic    aria-label "Gradient render with type and direction applied"
```

`:222`. The tile is `role="img"` with no child content, so this label *is* its entire non-visual
content — for the one surface whose declared job (`:214-215`) is showing "what Type + Direction
DO". A non-visual user gets zero information across 3 types × 361 angles.

**Law.** `§4.1`: "Role, **accessible name, state/value**… are explicit."

**Cure.** The name is derived: `Gradient preview — conic, start angle 90 degrees, 2 stops`. The
same derivation feeds the slider's missing `aria-valuetext` (D-4).

---

### E-8 · MINOR · `text-micro` is not a role in the closed type matrix

`:172`, `:189`, `:206` — `<span class="text-micro text-muted-foreground">` on the three SelectItem
description slots. `§4`'s matrix is closed and contains no `text-micro` rung; dropdown options are
explicitly `control or label, including dropdown options → text-small → Plus Jakarta Sans,
non-bold`. Three sites, one recipe, root-level cure.

---

### INFO · Safari's Tab order is not a component defect, but the component has no fallback

Under WebKit the tab sequence from the Type trigger was
`Gradient type → Gradient direction → …`, **skipping** Interpolation space and Hue interpolation.
This is macOS/WebKit's default "Tab highlights only text fields and lists" behaviour affecting all
`<button>`s app-wide — **not** this component's defect, and I record it as such rather than
manufacture a finding. The component-level observation that survives: these three values have no
keyboard or numeric equivalent other than the Select, so wherever the platform makes buttons
non-tabbable the entire Interpolation band becomes inoperable. `§5`: "every spatial action has a
keyboard/numeric equivalent."

---

## 7. Mechanism families

| Family | Rows | One cure |
|---|---|---|
| **F1 · two serializers, one gradient** | D-1 | one on-screen serialization; delete the unlabelled parallel path |
| **F2 · the right-rail render tile** | D-2, D-3, D-11, D-13, D-14, E-1, E-7 | the tile stops being a grid sibling of the controls; one specimen, aspect owned, name derived |
| **F3 · demo/ui instead of glass-ui** | E-2, E-3, E-4, D-8, E-8 | adopt `./select`, `./slider`, `./separator`, `./label`, `./labeled-field`, `./number-field`; fix the recipes at the producer root |
| **F4 · consumer-authored boundaries** | D-6, D-13 | delete every `<hr>` and the fixture shadow; `InstrumentChassis` typed boundaries only |
| **F5 · closed type matrix violated** | D-7, D-8, E-8 | `text-heading`/Plus Jakarta for headings; `text-small` for labels and options |
| **F6 · one command, two seats / no name / no result** | D-9, D-10 | Copy lives once, in the action region, named, with a durable result |
| **F7 · states that were never drawn** | D-4, D-5, D-15, D-17, E-5, E-6 | type-conditional axis; complete reset; forced-colors register; disabled-with-reason; reduced-motion at the root |
| **F8 · dead public surface** | D-16 | delete |

---

## 8. What is genuinely sound — the negative proof

Positive evidence, not absence of looking:

- **No crashes, no overflow, no landmark faults.** `REPORT.md:125,140,155,170` — `/#/gradient` is
  `overflowX 0`, `main 1`, `pageErr 0`, `consoleErr 0`, `hasDarkClass` true in both dark matrices,
  across all four Safari matrices. App-wide: `blankOrNearBlank 0`, `pageErrors 0`,
  `horizontalOverflow 0`, `darkClassMissing 0`, `mainCountNotOne 0`.
- **The tile is honest about *which* function it paints.** Three live probes returned three
  genuinely different background strings — `linear-gradient(90deg, …)`,
  `radial-gradient(oklch(…) 0% …)`, `conic-gradient(from 90deg, …)` — so `coalescedCSS` really does
  reach the paint. The defect is its frame and its label, not a stale binding.
- **200 % zoom passes.** At 720 px CSS width the trigger value boxes are 108 px with 43–50 px of
  ink, `clipped 0`; `shots/zoom-200-desktop/gradient.png` shows an intact composition.
- **The three Selects carry explicit accessible names.** `aria-label="Gradient type" |
  "Interpolation space" | "Hue interpolation"` (`:165,182,199`) — measured present in every run.
  The route's single nameless button is the Copy control, and only that.
- **The one sampling law is real.** `colorAtPosition` (`:64-88`) feeds the add-ghost, the minted
  stop colour and the tile from the same easing resolver — the W5-11 "invisible added stop" defect
  is genuinely cured; the eased-add path is correct.
- **The component authors zero motion of its own**, so it introduces no untokenized animation and
  animates no layout-forcing property. Every one of the 49 baseline transitions in its subtree is
  producer/child-owned and tokenized (`--duration-fast` 0.12 s, `--duration-normal` 0.2 s,
  `--spring-snappy-duration` 0.44 s). The reduced-motion regression (E-5) is a global-guard defect
  measured *at* this component, not authored *by* it.
- **`verbatimModuleSyntax` is clean.** Every type-only import uses `import type` (`:22, :25, :26,
  :28`); no mixed import.
- **Vue 3.5 idiom is largely correct**: `defineModel` for selection, reactive props destructure and
  `useTemplateRef` in the sibling editor, no god module (four focused files plus composables).

---

## 9. Reproduction index

| ID | Command / step | Observed |
|---|---|---|
| D-1 | navigate `/#/gradient`, click the `in-out` easing specimen, diff tile paint vs editor text | tile @3.13 % `0.746875 0.150937 148.75` → `0.749813 0.150056 145.225`; editor text byte-identical, `editorStops 2` |
| D-2 / E-1 | `node probes/challenge-D-states-probe.mjs` | 390: box 27 / ink 41–48. **320: box 4 / ink 41–48, triggerW 46** |
| D-3 | `node probes/challenge-D-design-probe.mjs` | 96×128.55 (0.747) / 96×123.73 (0.776) / 80×121.84 (0.657); `radial-gradient(` with no shape keyword |
| D-4 | same probe, `type=radial` branch | `ariaDisabled null, dataDisabled null, tabIndex 0, pointerEvents auto, opacity 1`; output carries no angle; `aria-valuetext null` |
| D-5 | Dock **Tools → Reset** after choosing `in-out` | **NOT REACHED** (`RESET NOT FOUND`); code-supported hypothesis only |
| D-6 | `document.querySelectorAll('main hr')` | 3, at y 260.7 / 480.8 / 769.3 |
| D-7 | `getComputedStyle(h3)` ×3 | Fraunces 20.352 px / 600, `rgb(112,89,66)` |
| D-8 | `getComputedStyle('.section-label')` | Fira Code 14.384 px, letterSpacing 1.4384 px, uppercase |
| D-9 | audit predicate `capture.mjs:102-105` over `button,[role=button]`, 5 runs | exactly 1 nameless, always `title="Copy CSS"`, `inPane true`; `usePaneRouter.ts:209` is the second seat |
| D-11 | measure rail + tile rects and shadows | 462×40 vs 96×128.55; box-shadow strings byte-identical; 3.21× block, 66.8 % area |
| D-12 | `grep -rn InstrumentChassis demo/` | 0 hits |
| D-14 | read tile `background-image` at default | `linear-gradient(90deg, oklch(0.75 0.15 145) 0% …` = the rail's own always-90° ramp |
| D-15 | diff `forced-colors-desktop/gradient.png` vs `safari-desktop-light/gradient.png` | indistinguishable → capture void; 0 `forced-colors` rules in this file |
| E-2 | focus slider, `Home` then `End`, measure the readout rect | 20.19 px → 40.38 px, right edge pinned at 578 |
| E-3 | tab through the band, read `outline` + `boxShadow` | branded ring on Selects; `outline: 1px auto rgb(0,95,204)` on the Slider |
| E-4 | `Object.keys(require('@mkbabb/glass-ui/package.json').exports)` | 74 subpaths incl. `./select ./slider ./separator ./label ./labeled-field ./number-field`; file imports none |
| E-5 | same probe with `reducedMotion:"reduce"` | 49 → 250 transitioning elements; tile `0.1s` vs guard's `0.01ms !important` |
| E-6 | read `shots/rtl-mobile/gradient.png` | `DIRECTION` right, `90°` left, fill physically left |
| E-7 | read tile `aria-label` at linear / radial / conic | one identical string, three states |
| E-8 | read `:172,:189,:206` against `VISUAL-CONSTITUTION §4` | `text-micro` absent from the closed matrix |

---

## 10. Disposition

**DEFECTIVE.** The component is competently *built* — the sampling law is right, the type system is
clean, the motion it authors is none and therefore harmless. It is *designed* wrong in one specific,
compounding way: **it decided that a gradient needs three surfaces.** An editing rail that
normalizes away the very parameters the section is about; a right-rail tile that restores them in a
frame whose proportion nobody chose and that costs the controls their legibility; and a code panel
fed by a second serializer that silently drops half the instrument's authoring. Every other row —
the dividers, the two Copy seats, the Fraunces headings, the unreserved readout, the dead Direction
slider — is a symptom of the same refusal to decide what the one specimen is.

The gestalt cure is subtraction: **one gradient, one specimen, one serialization.** The rail becomes
the render; the tile dies and returns its 28 % of the mobile width; the CSS panel shows the bytes
Copy writes; the controls become a producer-owned label/value/axis composition inside an
`InstrumentChassis` with no `<hr>` in it. That single transposition closes D-1, D-2, D-3, D-6,
D-11, D-13, D-14, E-1, E-2, E-3, E-4 and E-7 at once.
