# CHALLENGE-D — `GradientVisualizer.vue` — the design is flawed (PASS 3)

## Model receipt

I observe myself to be **Opus 5**, exact model id `claude-opus-5[1m]`. The seat was spawned with an
explicit Opus 5 declaration and the served tier agrees with it. The seat is **declared, not
inherited** — no undeclared-seat defect.

| | |
|---|---|
| Subject | `demo/workbenches/gradient/GradientVisualizer/GradientVisualizer.vue` (279 lines) |
| Area | `demo/workbenches` |
| Route | `/#/gradient` — sole mount (`demo/workbenches/gradient/GradientPane.vue:25`) |
| Repo / HEAD | `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, `c654824e` |
| Verdict | **DEFECTIVE** — 1 BLOCKER, 9 MAJOR, 6 MINOR, 2 INFO new this pass, plus verdicts on all 27 carried rows |
| Strongest defect | **F-1** — one keystroke in the panel headed `CSS` silently destroys every authored easing curve. Measured, reproduced, unannounced, unrecoverable. |

**Pass note.** Two CHALLENGE-D passes on this component already exist at HEAD. I preserved pass 2
verbatim at `challenge-D-design-pass-2.md` (pass 1 was already at `challenge-D-design-pass-1.md`)
and this file supersedes both. Prior IDs `D-1…D-19` / `E-1…E-8` keep their numbers; this pass's
rows are `F-1…F-18`. §7 lists the **four prior rows I corrected or killed** and the **two I
promoted from hypothesis to confirmed reproduction** — including `E-5`, whose mechanism pass 2
declared unfindable and which I located to a file and a line.

**Evidence base.** Full read of the subject plus `GradientPane.vue`, `GradientCodeEditor.vue`,
`GradientStopEditor.vue`, `useGradientModel.ts`, `useGradientCSS.ts`, `gradientParse.ts`, all 19
`demo/ui/*/index.ts` barrels, `@mkbabb/glass-ui@7.0.0` dist types and CSS; the binding canon
(`VISUAL-CONSTITUTION.md`, `PROPORTION-AUDIT.md`, `OPTICAL-BENCH-COMPOSITIONS.md`,
`PALETTE-CONTRACT.md`); the tranche Safari matrix (`REPORT.md` + `REPORT.json`, with the
desktop-light, desktop-dark, mobile-dark and keyboard-focus `gradient.png` captures **read as
images**); and **six live read-only browser runs** whose scripts are committed at
`probes/challenge-D-pass3-composition.mjs`, `probes/challenge-D-pass3-states.mjs`,
`probes/challenge-D-pass3-reset-focus.mjs`. Every number below is pasted from those runs. No
source file was modified.

---

## 1. Visual truth first

### 1.1 What the four Safari captures actually say

`REPORT.json` → `/#/gradient`, all four matrices: `overflowX 0`, `main 1`, `h1 0`, `pageErrors []`,
`consoleErrors []`, `hasDarkClass` correct, `button 53`, `allElements 508`. Two a11y rows are
non-zero and both are this component's neighbourhood: `smallTapTargets 6` (of which **2 are the
gradient stop seats at 20×20**) and `namelessButtons 1`.

A third row nobody in this component folder has used: **`bleeding` is non-empty in all four
matrices** — twelve elements whose right edge exceeds the viewport's client width at **1440 px**:

```
div.strip-row, div.strip-family, span.family-eyebrow, div.family-tiles,
button.glass-chip.glass-capsule ×3, svg, path, span.tile-label …
```

Those are the easing specimen strip's children. `overflowX` is 0, so the document does not scroll —
the content is **clipped, not reachable**. A catalogue that extends past the browser window inside
a 462 px column is the geometric proof of D-19 (§6, F-16).

### 1.2 Desktop light — the composition reads as four unrelated slabs

`shots/safari-desktop-light/gradient.png`. Top to bottom: an unlabelled 462×40 colour rail; a rule;
a Fraunces heading; a three-up of pill triggers with uppercase Fira labels; a fourth label/value
pair over an amber capsule; a portrait tile hanging off the right edge painting *the same
left-to-right ramp already painted 90 px above it*; a rule; a heading; a boxed easing accordion; a
rule; a heading with a floating icon; a boxed code well.

Two composition facts are visible before any measurement:

1. **The protagonist is the only unnamed region.** Three of the four regions get an `<h3>`
   (Interpolation, Easing, CSS). The rail — the spectral meniscus, the thing the canon says
   *dominates* — gets no name, no heading, no label. The named regions are the support.
2. **Two of four regions are boxed and two are bare.** The easing accordion and the code well have
   borders and material; the rail and the control band have none. Inside the control band the
   **only** carded object is the render tile — which is why the eye lands on the tile and not on
   the controls it is supposed to annotate.

### 1.3 Mobile is a legibility failure — corroborated, and worse at 320

`shots/safari-mobile-dark/gradient.png` renders the three primary semantic selectors as
`Lin⌄ Ok⌄ Sh⌄`. My own measurement at the **320 px** binding arm (`probes/challenge-D-pass3-composition.mjs` §K,
pasted verbatim):

```
Gradient type        text "Linear"   trigger 46×36   valueBox w 4   scrollW 61  clipped 57
Interpolation space  text "OKLCh"    trigger 46×36   valueBox w 4   scrollW 72  clipped 68
Hue interpolation    text "Shorter"  trigger 46×36   valueBox w 4   scrollW 72  clipped 68
```

Four CSS pixels of value box against 61–72 px of text. This independently reproduces pass 2's E-1
on a different engine run.

### 1.4 Dark mode is not a token bug, it is a contrast failure — measured in pixels

I decoded the rendered PNG (minimal PNG decoder in the probe; ground = modal pixel inside the
element's own rect, ink = the pixel furthest from ground in relative luminance) and computed WCAG
contrast on the **actual composited material**, which is what `VISUAL-CONSTITUTION §4.1` demands
("a token name is not evidence"):

```
light 1440   h3 "Interpolation"  ink rgb(112,89,66)    ground rgb(244,187,210)   ratio 4.03
             label "TYPE"        ink rgb(101,84,66)    ground rgb(244,182,213)   ratio 4.31
dark  1440   h3 "Interpolation"  ink rgb(195,185,172)  ground rgb(122,78,94)     ratio 3.53
             label "TYPE"        ink rgb(195,185,172)  ground rgb(122,76,98)     ratio 3.57
             label "DIRECTION"   ink rgb(195,185,172)  ground rgb(122,77,97)     ratio 3.55
computed     h3 20.352px/600 · label 14.384px/400
```

`.section-label` is 14.384 px at weight 400 — **normal text**, so WCAG 1.4.3 AA requires 4.5:1. It
measures **4.31 light / 3.57 dark**. Both fail. This is the same recipe on `TYPE`, `SPACE`, `HUE`
and `DIRECTION`: the four words that say what the instrument's four primary controls do. (§6, F-4.)

### 1.5 The keyboard-focus capture is empty

`shots/keyboard-focus-desktop/gradient.png` shows no focus indicator anywhere in the pane — the
matrix's Tab sequence never reached the component. The focus state is therefore **unproven by the
tranche capture**, and I measured it live instead (§6, F-3).

### 1.6 Zoom 200 % — carried as a genuine pass

Pass 2's 720 px measurement (`clipped 0`, 108 px value boxes) is consistent with
`shots/zoom-200-desktop/gradient.png`. I did not re-measure; **carried, not re-verified.**

---

## 2. State coverage

Exhaustive. `✗` = never designed. New/changed rows this pass are marked ▲.

| State | Handled? | Evidence |
|---|---|---|
| default / populated | ✓ | `:118-125` seeds 2 stops, linear, 90°, oklch, shorter |
| empty (0 stops) | ✗ designed as a throw | `:66` `throw new Error("A gradient must retain at least one stop")` |
| degenerate interval | ✗ designed as a throw | `:77`, `:87` throws inside a render-path pure function |
| ▲ **minimum-stops refusal (2 stops, Delete)** | **✗ silent** | measured 2 → **2**; with 3 stops → 2. No disabled state, no reason, no announcement (F-11) |
| loading | n/a | no async surface |
| ▲ **error (parse rejection)** | **partial / contradictory** | verdict renders loud (red `rgb(219,36,36)`, destructive border, `aria-invalid=true`) but `aria-describedby` is `null`; the specimen keeps painting the *previous* model (F-10) |
| ▲ **error (verdict names the wrong token)** | **✗** | valid CSS `linear-gradient(in oklch shorter hue, red, blue)` → verdict `unparseable color "in"` (F-9) |
| error (clipboard write fails) | ✗ | `:127-129` no `try`, no status |
| error (`seedFromPalette` no-op) | ✗ three silent paths | `:111-115` |
| disabled | ✗ | `:232` Direction stays live for `radial` |
| ▲ **focused (Direction axis)** | **✗ two indicators, one on a 0×20 box** | track: branded `…/0.3 0 0 0 2px`; thumb: UA `rgb(0,95,204) auto 1px` on `width:0; opacity:0` (F-3) |
| hovered / active / pressed | ✓ (producer) | rail handles own a scale ladder |
| selected | ✓ (delegated) | `selectedStopId` `defineModel` `:51` |
| dragging | ✓ (child) | `GradientStopEditor` owns it |
| overflowing / truncated | ✗ | 320: value box 4 px vs 61–72 px of text |
| ▲ **crowded (12 stops)** | **partial** | seats do **not** collide (0 overlaps, 41 px pitch) but the component grows 720 → **1321.8 px**, Easing takes **51.9 %**, the code well overflows (`scrollHeight 477` vs `clientHeight 190`) (F-14) |
| RTL | partial | pass-2 E-6, carried |
| ▲ **reduced-motion** | **✗ inverted, mechanism located** | 48 → **250** transitioning elements; every element gets `transition-duration: 0.1s !important` from `glass-ui/dist/styles/utilities/a11y-overrides.css:1` (F-5) |
| forced-colors | ✗ / unproven | 0 rules in this file; tranche capture void |
| zoom 200 % | ✓ | carried |
| type = radial | ✗ | dead Direction control; ellipse-for-circle |
| type = conic | ✗ | "Direction" silently means *start angle* |
| ▲ **eased intervals** | **✗ — the BLOCKER** | the CSS panel omits them **and destroys them on any keystroke** (F-1) |
| ▲ **non-default interpolation space** | **✗** | OKLCh→HSL changes the tile from `oklch(…)` stops to `rgb(…)` stops; the CSS panel text is **byte-identical** (F-2) |
| ▲ **after Reset** | **✗ partial reset** | direction 360→90 ✓, stop 5%→0% ✓, easing `cubic-bezier(0.42,0,0.58,1)` **survives** (F-6) |

**Seventeen of twenty-five states are unhandled, mis-handled, contradictory or unproven**, and the
component's designed answer to three of them is an uncaught `throw`.

---

## 3. Motion

`GradientVisualizer.vue` authors zero transitions, animations or keyframes — no untokenized motion,
no layout-forcing animated property. That part is clean and I record it as a negative result.

The reduced-motion state is not clean, and **pass 2's unfindable mechanism is found.** Measured on
the visualizer subtree (`/private` probe, pasted):

```
no preference   subtree 250 elements   non-zero transition-duration: 48
                durations seen: 0s, 0.12s, 0.2s, 0.44s, "0.2s, 0.44s", …   tile: all / 0s

reduce          subtree 250 elements   non-zero transition-duration: 250
                durations seen: ONLY 0.1s and 0.15s
                tile: "opacity, color, background-color, border-color, box-shadow" / 0.1s
```

CDP `CSS.getMatchedStylesForNode` on the tile under `reduce` returns exactly two transition rules,
and the winner is not the app's guard:

```
sel  "*, ::before, ::after"          @media (prefers-reduced-motion: reduce)
     transition-duration: 0.01ms !important            ← demo/styles/animations.css:184-191
sel  ":not([data-allow-motion])"     @media (prefers-reduced-motion: reduce)
     transition-duration: 0.1s !important;
     transition-property: opacity, color, background-color, border-color, box-shadow !important;
```

Source of the winner: **`node_modules/@mkbabb/glass-ui/dist/styles/utilities/a11y-overrides.css:1`**,
whose full reduce block is

```css
@media (prefers-reduced-motion: reduce) {
  *:not([data-allow-motion]) { animation-duration: .01ms !important; animation-iteration-count: 1 !important; }
  *:not([data-allow-motion]) { transition-duration: .1s !important;
                               transition-property: opacity,color,background-color,border-color,box-shadow !important; }
  [data-allow-motion]        { animation-duration: .01ms !important; transition-duration: .01ms !important; }
}
```

The semantics are **inverted**: elements that opted *in* to motion are frozen at 0.01 ms, and every
element that never asked for motion is *given* a 100 ms five-property transition. `:not(…)`
(specificity 0,1,0) beats the app's `*` guard (0,0,0) at equal `!important`. Consequence at this
component: a reduced-motion user sees **250 transitioning surfaces at 100 ms where a
no-preference user sees 48**. `VISUAL-CONSTITUTION §6`: "Reduced motion resolves directly to the
final geometry and stable chromatic state." It does the opposite, product-wide. (F-5; producer row,
relay to the glass-ui BH inbox per the standing edict.)

Separately: the tile — the surface that changes most violently (linear → radial → conic) — has
`transition-property: all; duration 0s` at rest, so the specimen snaps while every control around
it eases. INFO, F-18.

---

## 4. The design-system boundary — pass 2's table was wrong; here is the real one

Pass 2 filed a "five-fold breach" on the premise that `Select` and `Slider` come from a local
shadcn implementation in `demo/ui/`. **That premise is false.** Every one of the 19 barrels under
`demo/ui/` is a pure re-export of the producer:

```
$ cat demo/ui/select/index.ts
export { Select, SelectTrigger, SelectItem, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectSeparator } from "@mkbabb/glass-ui";
$ cat demo/ui/slider/index.ts
export { Slider } from "@mkbabb/glass-ui";
$ cat demo/ui/separator/index.ts
export { Separator } from "@mkbabb/glass-ui";
```

So the Select and the Slider **are** the design system's; the `#description` slot the file uses is
a real producer slot (`glass-ui/dist/components/select/SelectItem.vue.d.ts` declares
`description?: (props: {}) => any`) and it really renders (3 descriptions measured, Plus Jakarta
Sans 11 px). Pass 2's E-4, and the cures it derived for E-2/E-3/D-8, are withdrawn (§7).

What survives, corrected:

| Need | What the file does | What is available | Verdict |
|---|---|---|---|
| select | `:9` `../../../ui/select` → glass-ui | `@mkbabb/glass-ui` | **not a breach** — but a second path to the same package (F-8) |
| slider | `:10` `../../../ui/slider` → glass-ui | same | **not a breach**; the defect is the *unset variant* (F-3) |
| divider | `:148,240,251` raw `<hr class="border-border">` | `demo/ui/separator` → glass-ui `Separator` | **breach** — a hand-rolled boundary where the system ships one, and the canon says the count is 0 anyway |
| label + field | hand-rolled `<span class="section-label">` ×4 | glass-ui `Label` (`demo/ui/label`) | **breach** |
| numeric entry for Direction | absent | `§5` names it | **breach** |
| Copy action | `:13` `DockControl` from `@mkbabb/glass-ui/dock` | pane bodies are not the dock band | **breach — wrong tier** |

The remaining structural point is sharper than pass 2's: **one 279-line file reaches the same
package by two different paths** — `@mkbabb/glass-ui` (`:12`, `:13`) and `../../../ui/*` (`:9`,
`:10`) — and the alias layer is opaque enough that it induced a prior Opus auditor to file five
false findings against it. Owner edict 2 forbids aliases and dual paths; this is what the edict is
for. (F-8.)

---

## 5. Proportion and seat law, measured

| Law | Measured | Verdict |
|---|---|---|
| `OPTICAL-BENCH §3` — Gradient is P122 `golden`: meniscus/preview **61.8033989 %**, stop/easing/code inspector **38.1966011 %** | main 1408 px; gradient pane **512 px = 36.4 %**; Palettes companion **512 px = 36.4 %**; 183 px dead gutter each side | **VIOLATED** (F-7) |
| `§3` law 2 — "Empty secondary content occupies at most a narrow invitation tray (≤15 % of the stage) or disappears. It never receives half the viewport." | the companion renders `No saved palettes yet.` at **512 px = 50.0 % of the 1024 px of pane area** (49.1 % of the 1042 px band incl. the 18 px gap) | **VIOLATED** (F-7) |
| `§3.1` — Gradient outer housing `InstrumentChassis`, "no nested stage Card" | `grep -rn InstrumentChassis demo/` → 0 hits; `GradientPane.vue:20` wraps in `Card tier="resting"` | **VIOLATED** (D-12 carried) |
| `PROPORTION-AUDIT §5.3` — "Header→headline uses title gap; headline→next semantic section uses section gap" | every gap between the ten body children is **exactly 20 px** (`rowGap: "20px"`, gaps 20/20/20/20/20/20/20/20/20) | **VIOLATED** (F-12) |
| `§4.2` / `PR-05` / `OPTICAL-BENCH §5` — Gradient retains **no** divider | `hrCount 3` at y 260.7 / 480.8 / 769.3 | **VIOLATED ×3** (D-6 carried) |
| `§4` closed type matrix | 3× `h3` Fraunces `text-subheading` 20.352 px (canon: `text-heading`, Plus Jakarta); 4× `.section-label` Fira Code 14.384 px uppercase (canon: `text-small`, Plus Jakarta); 3× `text-micro` **11 px** — a rung that does not exist in the matrix | **VIOLATED, 10 sites** (D-7/D-8/E-8 carried; 11 px newly measured) |
| `§4.1` — "Text… meet their rendered contrast on the actual material tier" | labels **4.31 light / 3.57 dark** vs AA 4.5 | **VIOLATED** (F-4) |
| `§4.1` — "Focus remains visibly distinct" | two indicators on one control; one on a `width:0; opacity:0` box | **VIOLATED** (F-3) |
| `§4` — live numbers "reserve their widest legal representation" | pass 2: readout ink 20.19 → 40.38 px within one drag | **VIOLATED** (E-2 carried) |
| `§5` — "the domain-neutral axis composition sits over BI `Slider`: label, unit, **reserved live value**, optional numeric entry, **focus/target behaviour**" | no unit in `aria-valuetext` (`null`), no numeric entry, no reserved value, degenerate focus/target | **VIOLATED, 4 of 5 members** (F-3) |
| `§5.2` — "Home=min, End=max" on a numeric axis | End → `aria-valuenow "360"`, value label `360°` | **MET** |
| `§7 Gradient` — "The rounded meniscus rail and its preview dominate" | rail 462×40 = 40 px of a 720 px column (5.6 %); at 12 stops 40 px of 1321.8 (3.0 %) while Easing takes 51.9 % | **VIOLATED** (D-11/PR-09 carried) |
| `§5.5` — "operable ornaments without names are forbidden" | Copy CSS is the route's only nameless button in all four matrices | **VIOLATED** (D-9 carried) |
| `PR-12` — target floors | 2 stop seats at **20×20** (`REPORT.json`); Direction thumb **0×20**; Copy CSS 28×28 | **VIOLATED** (F-3, carried) |
| `PALETTE-CONTRACT` — Device Draft / Workspace / Published / Trash are "explicit, non-interchangeable owner states" | `:112` `pm.savedPalettes.value[0]` — the first row of an undifferentiated list, owner state ignored | **VIOLATED** (F-17) |
| `§3` law 3 — preview first, controls second | rail is first | **MET** |

---

## 6. Defects

### F-1 · BLOCKER · one keystroke in the `CSS` panel silently destroys every authored easing curve

**Mechanism.** `:102-108` `onParseCSS` calls `applyCSS(css)` on every debounced input event
(`GradientCodeEditor.vue:55-62`, 500 ms debounce). The file's own comment states the consequence:
"A successful parse re-seeds every interval to the `linear` preset". The panel that triggers this
**cannot display easing at all** (`:259` binds `simpleCSS`, and `serializeGradient`
(`useGradientCSS.ts:147-162`) emits only type, direction and raw stops). So the destructive act is
invisible in the surface that performs it.

**My reproduction** — author `ease-in-out`, then type a single trailing **space** at the end of the
CSS panel (a whitespace edit that changes nothing semantically):

```
authored    easing  "cubic-bezier(0.42, 0, 0.58, 1)"
            editor  "linear-gradient(90deg, oklch(0.75 0.15 145) 0%, oklch(0.65 0.18 265) 100%)"
            tile    "…rgb(107,198,112) 0%, rgb(107,199,112) 3.13%, rgb(107,199,113) 6.25%…"

—— one space typed at the caret, 1.4 s settle ——

afterTouch  easing  "cubic-bezier(0, 0, 1, 1)"        ← RESET TO LINEAR
            editor  "linear-gradient(90deg, oklch(0.75 0.15 145) 0%, oklch(0.65 0.18 265 ) 100%)"
            tile    "…rgb(107,198,112) 0%, rgb(106,200,116) 3.13%, rgb(105,202,120) 6.25%…"
easingSurvived: false
```

**Consequence.** The Easing region is the component's largest — 197 px at 2 stops, **686.6 px
(51.9 % of the component) at 12** — a curve catalogue plus a bezier authoring stage. Everything
authored there is destroyed by an edit in a panel that never showed it, with no warning, no
confirmation, no undo, and no announcement. The user's only evidence that anything happened is a
3 % shift in a 96 px thumbnail.

**Law.** `§5` "select → tune → commit"; `§4.1` "Selected, failed, pending… states are never
color-only. Role, accessible name, **state/value**… are explicit."

**Cure (gestalt).** The code well is a *representation of the model*, not a second model. Either it
serializes everything the model holds — the coalesced form, which is also what Copy writes — or
editing it is a deliberate, named **Replace** command with an explicit "this discards per-interval
easing" consequence, not an incidental side effect of a debounced keystroke. The former is right:
one gradient, one serialization, and the panel round-trips itself.

---

### F-2 · MAJOR · the panel headed `CSS` omits three of the six model fields

Not just easing. Measured independently: change **Space** from OKLCh to HSL and diff both surfaces.

```
before   space "OKLCh"  editor "linear-gradient(90deg, oklch(0.75 0.15 145) 0%, oklch(0.65 0.18 265) 100%)"
                        tile   "linear-gradient(90deg, oklch(0.75 0.15 145) 0%, oklch(0.746875 0.150937 148.75) 3.13%…"
after    space "HSL"    editor  ← BYTE-IDENTICAL          (editorIdentical: true)
                        tile   "linear-gradient(90deg, rgb(107,198,112) 0%, rgb(106,200,116) 3.13%…"   (tileIdentical: false)
```

`GradientModelState` has six fields (`useGradientModel.ts:50-60`): `type`, `direction`, `stops`,
`intervals`, `interpolationSpace`, `hueMethod`. `serializeGradient` emits the first three. **Neither
serializer emits an interpolation clause at all** — `serializeCoalescedGradient`
(`useGradientCSS.ts:281-305`) also bakes space and hue into 33 literal stops rather than expressing
them. And `gradientParse.ts` has no notion of the `in <space>` production: `grep -n "interpolationSpace\|hueMethod\|shorter" gradientParse.ts` returns only a comment.

So the instrument whose largest heading is **Interpolation** cannot read, write or round-trip the
CSS syntax that expresses interpolation. Pasting the standard form is rejected (F-9).

**Cure.** Emit `linear-gradient(<angle> in <space> <hue> hue, …)` — one string that carries every
field the model has — and teach the parser the same production. That is also the string Copy should
write, which closes the read/see/get divergence at its root.

---

### F-3 · MAJOR · the Direction axis has a zero-area invisible operable element and two competing focus indicators

**Measured** (`probes/challenge-D-pass3-reset-focus.mjs`, pasted):

```
root  .glass-slider   data-variant "standard"   354×20
thumb .slider-thumb   role=slider   w 0   h 20   width "0px"   opacity "0"   background rgba(0,0,0,0)
      outline "rgb(0, 95, 204) auto 1px"        boxShadow "none"
track .slider-track   354×20
      boxShadow "color(srgb 0.665504 0.000101413 0.261748 / 0.3) 0px 0px 0px 2px, …"   ← the branded ring
document.elementFromPoint(thumb centre) → SPAN.slider-track     thumbIsTopmostAtItsOwnCentre: false
aria-valuetext: null    aria-valuenow: "90"
```

Three things at once:

1. **The operable, focusable element is 0 CSS px wide and `opacity: 0`.** WCAG 2.2 SC 2.5.8 floor
   is 24×24; this is 0×20. It is not even the topmost element at its own centre.
2. **Focus is drawn twice, in two vocabularies.** The track carries the app's branded 2 px accent
   ring; the thumb *additionally* carries the browser's default blue `auto 1px` outline — on the
   invisible zero-width box. Two indicators, one control, one of them unbranded and degenerate.
3. **The cause is a prop the callsite never set.** In `glass-ui/dist/glass-ui.css` the visible thumb
   **and** the suppression of the UA outline are both gated on one selector:

```css
.slider-thumb { width: 0; opacity: 0; box-shadow: none; background: 0 0; }
.glass-slider[data-variant=spectrum] .slider-thumb { width: calc(var(--slider-thumb-size,1rem)*.75); opacity: 1; … }
.glass-slider[data-variant=spectrum] .slider-thumb:focus-visible { box-shadow: var(--focus-ring-shadow), var(--shadow-sm); outline: none; }
```

`SliderVariant = "standard" | "spectrum"` (`glass-ui/dist/components/slider/types.d.ts`).
`GradientVisualizer.vue:232` renders `<Slider …>` with **no `variant`**, so it takes `standard` and
inherits the invisible thumb and the un-suppressed UA outline.

**Law.** `§4.1` "Focus remains visibly distinct from selection in both schemes, forced colors and
reduced transparency"; `§5` the axis composition owes "label, unit, reserved live value, optional
numeric entry, **focus/target behavior**" — this callsite satisfies one of five.

**Cure.** Adopt the axis composition rather than the bare primitive: declare the variant that
carries the register, add the unit to `aria-valuetext`, add the numeric entry the canon names, and
reserve the value slot (E-2). Producer follow-up: `outline: none` on `:focus-visible` belongs to
`.slider-thumb`, not to `[data-variant=spectrum] .slider-thumb` — relay to glass-ui BH.

---

### F-4 · MAJOR · the control labels fail WCAG AA contrast in both schemes

Measured on rendered pixels (§1.4): `.section-label` at 14.384 px / weight 400 measures **4.31:1**
light and **3.57:1** dark against its own composited ground. AA requires 4.5:1. The section
headings measure **4.03 / 3.53** — they pass AA-large (3:1) only because they are 20.352 px at
weight 600, i.e. they are legal *because* they violate the type matrix (D-7).

Two different jurisdictions:

- `.section-label` is a shared recipe (`demo/styles/utils.css:13`; 9 files under `demo/` reference it — the recipe plus 8 consumers) — the cure
  is at the recipe/producer root, never a per-instance override here (edict 5).
- The `h3` colour **is** this file's choice: `:149`, `:241`, `:253` each write
  `class="font-display text-subheading text-muted-foreground"`. Painting a section heading in the
  de-emphasis role while it is simultaneously the largest non-title type in the pane is a hierarchy
  contradiction independent of the family, and it is authored right here.

---

### F-5 · MAJOR · reduced motion is inverted product-wide, and the winning rule is now identified

Full measurement and CDP rule trace in §3. Under `prefers-reduced-motion: reduce` this component's
subtree goes from **48 transitioning elements to 250 — all of them at 0.1 s** — because
`@mkbabb/glass-ui/dist/styles/utilities/a11y-overrides.css:1` gives
`*:not([data-allow-motion]) { transition-duration: .1s !important; transition-property: opacity,color,background-color,border-color,box-shadow !important }`
and freezes only the elements that opted *in* to motion.

Pass 2 measured the symptom and filed the mechanism as unfindable; this is the file, the line and
the inverted semantics. It is a **producer** defect measured at this component, and the app's own
guard (`demo/styles/animations.css:184-191`) loses the cascade to it on specificity. Two cures, both
outside this file: fix the producer rule, and delete the now-dead app guard rather than layering a
third.

---

### F-6 · MAJOR · Reset does not reset — CONFIRMED with a live reproduction

Pass 1 asserted it; pass 2 could not reach the control and carried it as a code-supported
hypothesis. I reached it (the Dock action bar's `Reset` seat, `usePaneRouter.ts`) with a dirty
model:

```
before   easing "cubic-bezier(0.42, 0, 0.58, 1)"   dir 360   stops [0%→5%, 100%]
         editor "linear-gradient(360deg, oklch(0.75 0.15 145) 5%, oklch(0.65 0.18 265) 100%)"
—— Reset ——
after    easing "cubic-bezier(0.42, 0, 0.58, 1)"   dir  90   stops [0%, 100%]
         editor "linear-gradient(90deg, oklch(0.75 0.15 145) 0%, oklch(0.65 0.18 265) 100%)"
```

Direction and stop positions were restored, so `resetGradient()` (`:118-125`) definitely ran; it
touches `stops`, `type`, `direction`, `interpolationSpace`, `hueMethod`, `parseVerdict` and
**never `intervals`**. The state after Reset is the worst of both: every visible surface shows a
default gradient while the tile still paints an eased ramp. **D-5 is CONFIRMED, not carried.**

---

### F-7 · MAJOR · the route gives the instrument 36.4 % and an empty companion the same 36.4 %

**Measured at 1440×900:**

```
main            x 16    w 1408
gradient pane   x 199   w 512   → 36.4 % of main
palettes pane   x 729   w 512   → 36.4 % of main   (renders "No saved palettes yet.")
dead gutter     183 px left, 183 px right  (26 % of main unused)
pane area       1024 px (+18 px gap) → the empty companion takes exactly 50.0 % of it
```

`OPTICAL-BENCH-COMPOSITIONS §3` binds Gradient to P122 `golden` — "meniscus/preview
61.8033989 %; stop/easing/code inspector 38.1966011 %". The shipped route is a 50/50 equal-pane
split whose second pane is a *different instrument's empty state*, and `VISUAL-CONSTITUTION §3`
law 2 says in terms: "Empty secondary content… never receives half the viewport."

**Attribution, precisely.** The companion is the shell's (`usePaneRouter` / pane slots), not this
file's. But the reason no golden split can exist *inside* the gradient pane is this file: it emits
a single `flex flex-col gap-5` column of ten siblings with **no stage, inspector or action
regions** at all, so there is nothing for a chassis to proportion. The canon's 38.2 % inspector is
literally described as "stop/easing/code inspector" — the three things this component stacks
vertically inside the stage.

**Cure.** The visualizer emits the three named regions; the chassis owns the ratio; the Palettes
companion leaves `/#/gradient` exactly as `OPTICAL-BENCH §4` already removed it from the five Admin
routes.

---

### F-8 · MAJOR · `demo/ui/*` is an alias layer, and it is load-bearing enough to have manufactured five false findings

All 19 `demo/ui/*/index.ts` files are pure re-exports of `@mkbabb/glass-ui` (§4). This file imports
from **both** paths — `../../../ui/select`, `../../../ui/slider` (`:9`, `:10`) and
`@mkbabb/glass-ui`, `@mkbabb/glass-ui/dock` (`:12`, `:13`) — so one 279-line component reaches one
package two ways.

Owner edict 2 forbids aliases, dual paths and back-compat shims; `demo/ui/alert/index.ts` even
documents the layer's history ("This barrel previously held a local shadcn-vue re-implementation").
The measurable harm is on the record: **pass 2 of this very audit read `from "../../../ui/select"`
as a shadcn re-implementation and filed a five-fold design-system breach (E-4) plus three derived
cures (E-2, E-3, D-8) against a component that was already consuming the design system.** An
indirection that makes competent auditors wrong is not a neutral convenience.

**Cure.** Delete the barrels; import the producer directly at every callsite. That is a
repo-wide subtraction, not a gradient row — file it to the owner of `demo/ui`.

---

### F-9 · MINOR · the parse verdict names the wrong grammar production

```
input   "linear-gradient(in oklch shorter hue, red, blue)"     ← valid CSS Images 4
verdict 'unparseable color "in"'
```

`in` is the interpolation keyword, not a colour. The error tells the user their *colour* is broken
when what the parser lacks is a *production*. Error copy that misidentifies the failure is worse
than a generic message: it sends the user to edit the wrong token. `§4.1` — "associated
error/status are explicit."

---

### F-10 · MINOR · the rejected state is loud but unassociated, and the specimen contradicts it

```
verdict     "unparseable color \"nonsense\""   role "status"   color rgb(219,36,36)   16.4px
editor      aria-invalid "true"   borderColor rgb(219,36,36)   aria-describedby: null
tile        still paints "linear-gradient(90deg, oklch(0.75 0.15 145) 0%, oklch(0.746875 …"
rail        still paints
```

The destructive border and the red verdict are good design. Two things are not: the invalid textbox
has **no `aria-describedby`** to its own error, so a screen-reader user gets "invalid" with no
reason; and the specimen keeps painting the last good model, so the screen simultaneously asserts
"this CSS cannot be parsed" and "here is your gradient." One of the two is lying and nothing marks
which.

---

### F-11 · MINOR · the minimum-stop refusal is silent

```
2 stops, focus a seat, press Delete  → 2 stops   (nothing happens, nothing is said)
click the rail                       → 3 stops
3 stops, focus a seat, press Delete  → 2 stops   (works)
```

`GradientStopEditor.vue:158-161` guards on `removable`; the guard is correct policy and has **no
expression**: the seat is not disabled, the chip does not change, no status is announced. Same
family as D-17: a command that can do nothing, three ways, in silence.

---

### F-12 · MINOR · uniform 20 px rhythm — the heading is equidistant from its rule and its content

```
rowGap: "20px"
gaps between the ten body children:  20 · 20 · 20 · 20 · 20 · 20 · 20 · 20 · 20
```

`hr → h3` is 20 px and `h3 → content` is 20 px, so every heading floats exactly between the
boundary above it and the thing it names. Gestalt proximity is doing nothing; the `<hr>` is doing
all the grouping, which is why the rules feel structurally necessary even though the canon sets the
divider count to zero. `PROPORTION-AUDIT §5.3` requires two different intervals ("Header→headline
uses title gap; headline→next semantic section uses section gap"); one token is used for both.

**Cure.** Section gap > title gap (the φ ladder already exists in the tokens). Once the heading is
tied to its content, all three `<hr>` become deletable without loss — F-12 and D-6 close together.

---

### F-13 · MINOR · the Interpolation section is misnamed for half its contents

`:149` heads a region containing **Type**, **Space**, **Hue**, **Direction**. Type and Direction are
*geometry*: `serializeGradient` puts them in the function name and the leading angle
(`useGradientCSS.ts:148-155`). Space and Hue are interpolation and appear in no serialization at
all (F-2). So the heading is wrong for the two controls it does describe in the output and right
for the two it never emits — and the true interpolation dimension with the most authoring surface
(easing) lives under a *different* heading two sections down.

**Cure.** Group by what the parameters do: **Geometry** (type, angle/start-angle, and the shape and
extent controls `radial` actually needs) and **Interpolation** (space, hue, easing). Easing joins
its own family instead of being a third slab.

---

### F-14 · MINOR · the composition degrades monotonically with content

At 12 stops (added by clicking the rail ten times):

```
stopCount 12   overlappingSeats 0   seat pitch ~41 px
bodyH 720.1 → 1321.8 px
easing section 686.6 px = 51.9 % of the component
code well scrollHeight 477 vs clientHeight 190     ← the CSS output no longer fits its own box
rail unchanged at 40 px = 3.0 %
```

The protagonist is scale-invariant while every support grows. At two stops the rail is 5.6 % of the
component; at twelve it is 3.0 %. `PR-09` "Gradient/Easing protagonist subordinated → ENLARGE"
worsens with use rather than holding.

*Negative result inside the same measurement, recorded as such:* the stop seats do **not** collide
at 12 stops. The rail's own crowding behaviour is sound.

---

### F-15 · MINOR · three integration channels in one 279-line component

`defineExpose({ resetGradient, copyCSS, seedFromPalette })` (`:131`, consumed by
`GradientPane.vue:11-14` → `usePaneRouter`), `inject(LIBRARY_PORT_KEY)` (`:30`, no default, silently
optional), and `defineModel<string|null>("selectedStopId")` (`:51`, **no consumer anywhere** —
`GradientPane.vue:25` mounts `<GradientVisualizer ref="visualizerRef" />` with no binding). Three
mechanisms for the same job with different failure modes, one of them dead. Edicts 2 and 3.

---

### F-16 · INFO · the easing catalogue is clipped past the viewport in every Safari matrix

`REPORT.json` `bleeding` (predicate: `getBoundingClientRect().right > documentElement.clientWidth + 1`,
`capture.mjs:107-111`) lists 12 elements on `/#/gradient` — `strip-row`, `strip-family`,
`family-eyebrow`, `family-tiles`, three `glass-chip.glass-capsule`, `tile-label` — in all four
matrices, at 1440 px as well as 390. `overflowX` is 0, so this content is clipped rather than
scrolled to. It is `GradientEasingEditor`'s strip, but it is *this* file's composition decision to
nest a horizontal catalogue in a 462 px column (`§7 Easing`: "Catalogue and specimen strips support
the curve rather than reducing it to a tiny nested widget"). Filed here, owned there.

---

### F-17 · INFO · `seedFromPalette` ignores the palette contract's owner states

`:112` `pm.savedPalettes.value[0]?.colors` takes the **first row of an undifferentiated list**.
`PALETTE-CONTRACT` and `VISUAL-CONSTITUTION §7` are explicit that "Device Drafts, unpublished Server
Workspaces, Published lineages, and Trash are explicit, non-interchangeable owner states." A named
Dock command that silently seeds from whatever happens to be index 0 — possibly a trashed
palette — has no subject. Sharpens D-17 with the contract citation.

---

### F-18 · INFO · the tile is the one surface with no transition and the most violent change

`transition-property: all; transition-duration: 0s` at rest. Switching linear → radial → conic
replaces the entire painted field in one frame while the controls around it ease at 0.12–0.44 s.
`§6` "Colour/opacity effects use the corresponding short effect curve." A gap in the register, not
an authored animation — and nothing may be *deleted* to fix it (edict 6); the cure is to tokenize
one.

---

### Carried rows — my verdict on each

| ID | Row | This pass |
|---|---|---|
| D-1 | the `CSS` panel is not the gradient's CSS | **UPHELD and escalated** → F-1/F-2 (destruction, not merely omission) |
| D-2 / E-1 | 3-up clips at 390 and 320 | **UPHELD**, independently reproduced at 320 (value box 4 px) |
| D-3 | tile has no proportion of its own | **UPHELD, extended**: aspect 0.747 @1440 / 0.657 @390 / **0.549 @320** — a 36 % spread |
| D-4 | Direction live but dead for `radial`; `aria-valuetext` null | **UPHELD** (`aria-valuetext: null` re-measured) |
| D-5 | Reset does not reset | **CONFIRMED** with a reproduction → F-6 |
| D-6 | three `<hr>` where the canon says zero | **UPHELD** (3 at y 260.7 / 480.8 / 769.3) |
| D-7 | headings wear the palette-identity costume | **UPHELD**, plus the contrast consequence (F-4) |
| D-8 | labels wear the value/code jurisdiction | **UPHELD**; cure corrected — glass-ui `Label` exists via `demo/ui/label` |
| D-9 | Copy CSS nameless / wrong tier / second seat | **UPHELD** (28×28, `title` only, `namelessButtons 1` in all four matrices) |
| D-10 | Copy has no confirmation or failure state | **UPHELD** (code-read; not re-probed) |
| D-11 | protagonist inversion | **UPHELD and worsened** — 3.0 % at 12 stops (F-14) |
| D-12 | `InstrumentChassis` absent | **UPHELD**, and now the measured consequence is F-7 |
| D-13 | support fixture carries the protagonist's shadow | **UPHELD** (code-read) |
| D-14 | at rest the tile is a redundant second specimen | **UPHELD** |
| D-15 | forced-colors unhandled / capture void | **UPHELD** |
| D-16 | `defineModel` with no consumer | **UPHELD** → folded into F-15 |
| D-17 | silent no-op paths | **UPHELD**, sharpened by F-11 and F-17 |
| D-18 | four sibling `h3`s and no `h1` | **UPHELD** (`h1: 0` in `REPORT.json`) |
| D-19 | nested catalogue in a 462 px column | **UPHELD**, now with the tranche's own `bleeding` evidence (F-16) |
| E-2 | live value does not reserve its width | **UPHELD** (pass-2 measurement; not re-run) |
| E-3 | two focus vocabularies | **UPHELD, mechanism corrected** → F-3 (both indicators are present; the cause is the unset `variant`, not a shadcn slider) |
| E-4 | five design-system breaches from `demo/ui` | **WITHDRAWN — false premise.** `demo/ui/*` re-exports glass-ui (§4). Replaced by F-8 |
| E-5 | reduced motion makes it worse | **CONFIRMED and located** → F-5 (`glass-ui/dist/styles/utilities/a11y-overrides.css:1`) |
| E-6 | RTL label/track mirroring mismatch | **CARRIED** (not re-verified this pass) |
| E-7 | tile's accessible name is constant | **UPHELD** |
| E-8 | `text-micro` outside the closed matrix | **UPHELD**, now measured: **11 px**, and the slot *does* render (3 descriptions) |
| INFO | WebKit Tab order | **CARRIED as not-a-component-defect** |

---

## 7. Corrections to the prior passes

A challenge seat that only adds rows is not doing its job. Four changes to the ledger:

1. **E-4 is withdrawn.** `demo/ui/select` and `demo/ui/slider` are one-line re-exports of
   `@mkbabb/glass-ui`. The component was already consuming the design system for both. The cures
   pass 2 derived from that premise (adopt `./select`, `./slider`) are no-ops.
2. **E-3's mechanism is replaced.** The branded ring *is* applied — to the track. The UA blue
   outline is an **additional** indicator on a `width:0; opacity:0` thumb, and the cause is
   `variant` defaulting to `standard`, which gates off both the visible thumb and the
   `:focus-visible` suppression.
3. **E-5 is promoted from hypothesis to located defect**, with the file, the line and the inverted
   `:not([data-allow-motion])` semantics. Pass 2's suspicion that the count rise was real is
   vindicated; its inability to find the rule is closed.
4. **D-5 is promoted from hypothesis to confirmed**, with a before/after transcript.

One methodological note for the next seat: pass 2's false E-4 came from reading an import path and
inferring a package. Three of my strongest rows (F-1, F-2, F-6) came from *changing one thing in the
live app and diffing two surfaces*. For a component whose whole defect family is "two
representations of one model", differential probing is the method that works.

---

## 8. Mechanism families

| Family | Rows | One cure |
|---|---|---|
| **G1 · two serializers, one gradient, and the panel destroys what it cannot show** | F-1, F-2, F-9, F-10, D-1 | one serialization on screen, carrying all six model fields, parseable by the same grammar; Copy writes the bytes under the caret |
| **G2 · the right-rail render tile** | D-2, D-3, D-11, D-13, D-14, E-1, E-7, F-14 | the tile stops being a grid sibling of the controls; one specimen, aspect owned, name derived |
| **G3 · primitives adopted bare instead of as compositions** | F-3, E-2, D-8, E-8 | adopt the `§5` axis composition (label, unit, reserved value, numeric entry, variant-carried register), not the raw `Slider` |
| **G4 · consumer-authored boundaries and rhythm** | D-6, D-13, F-12 | one interval ladder (title gap < section gap); delete all three `<hr>` and the fixture shadow |
| **G5 · the closed type matrix and its contrast consequence** | D-7, D-8, E-8, F-4 | `text-heading`/Plus Jakarta at full-strength ink; `text-small` for labels and options; fix `.section-label` at the recipe root |
| **G6 · one command, two seats, no name, no result** | D-9, D-10 | Copy lives once, in the action region, named, with a durable result |
| **G7 · states that were never drawn** | D-4, D-15, D-17, E-6, F-6, F-11, F-17 | type-conditional axis; complete reset; forced-colors register; disabled-with-reason; a command with a subject |
| **G8 · no regions, therefore no proportion** | D-12, F-7, F-13 | emit stage / inspector / action; let the chassis own `golden`; regroup by geometry vs interpolation |
| **G9 · producer rows measured here** | F-5, F-3(b) | glass-ui: un-invert the reduced-motion override; move `outline:none` off the `spectrum` gate — relay to the BH inbox |
| **G10 · alias layer** | F-8, F-15 | delete `demo/ui/*`; one import path per package; one integration channel per component |

---

## 9. What is genuinely sound — the negative proof

Positive evidence, not absence of looking:

- **No crashes, no overflow, no landmark faults.** `REPORT.json` `/#/gradient`, all four matrices:
  `overflowX 0`, `main 1`, `pageErrors []`, `consoleErrors []`, `hasDarkClass` correct.
- **The one sampling law is real and the eased-add path is correct.** `colorAtPosition` (`:64-88`)
  feeds the add-ghost, the minted stop colour and the tile from the same easing resolver.
- **The tile really does paint `coalescedCSS`.** Four probes returned four genuinely different
  background strings across type and space changes — the binding is live, not stale. The defect is
  its frame, its label and its divergence from the code panel.
- **The Select composition is correct and complete.** `aria-label` present on all three triggers,
  `aria-selected` correct on the current option, and the producer `#description` slot renders three
  descriptions (Plus Jakarta Sans, 3 items, 146.3×52.4 each). The `:159-161` excision comment's
  premise — that the descriptions live inside the dropdown — is **true**.
- **Home/End on the Direction axis obey `§5.2`**: `End` → `aria-valuenow "360"`, label `360°`.
- **The rail does not crowd.** At 12 stops: 0 overlapping seats, ~41 px pitch, every seat named
  `Gradient stop at N%`.
- **The parse rejection is loud, not silent** — destructive border, red verdict, `aria-invalid`,
  `role="status"`, and the user's text is never rewritten under them (`GradientCodeEditor.vue:33-70`).
- **The component authors zero motion**, so it introduces no untokenized animation and animates no
  layout-forcing property. All 48 baseline transitions in its subtree are producer/child-owned and
  tokenized (0.12 s / 0.2 s / 0.44 s measured).
- **`verbatimModuleSyntax` is clean.** Type-only imports at `:22`, `:25`, `:26`, `:28` all use
  `import type`; no mixed import.
- **No god module.** 279 lines, four sibling SFCs, five composables; the sub-composable split
  (`useGradientInterpolation` / `useGradientCSS` / `gradientParse`) is real encapsulation.
- **Zoom 200 % holds** (carried from pass 2's 720 px measurement, `clipped 0`).

---

## 10. Reproduction index

| ID | Command / step | Observed |
|---|---|---|
| F-1 | author `ease-in-out`, then type one space at the end of the CSS panel | easing `cubic-bezier(0.42,0,0.58,1)` → `cubic-bezier(0,0,1,1)`; tile @3.13 % `rgb(107,199,112)` → `rgb(106,200,116)`; `easingSurvived: false` |
| F-2 | change Space OKLCh → HSL, diff editor text and tile paint | `editorIdentical: true`, `tileIdentical: false` (`oklch(…)` → `rgb(…)` stops) |
| F-3 | focus the Direction thumb; read rects, computed styles, `elementFromPoint` | thumb 0×20, `opacity 0`, UA `rgb(0,95,204) auto 1px`; track carries the branded 2 px ring; `thumbIsTopmostAtItsOwnCentre: false`; `data-variant "standard"` |
| F-4 | screenshot-clip each label/heading, decode PNG, compute WCAG contrast | label 4.31 (light) / 3.57 (dark); h3 4.03 / 3.53 |
| F-5 | load `/#/gradient` with `reducedMotion: "reduce"`; count durations; CDP `CSS.getMatchedStylesForNode` on the tile | 48 → 250 non-zero durations, all `0.1s`/`0.15s`; winning rule `:not([data-allow-motion])` from `glass-ui/dist/styles/utilities/a11y-overrides.css:1` |
| F-6 | ease-in-out + `End` on Direction + 5×ArrowRight on stop 1, then Dock **Reset** | dir 360→90 ✓, stop 5%→0% ✓, easing unchanged ✗ |
| F-7 | measure `main` and both pane rects at 1440×900 | main 1408; panes 512 + 512 (36.4 % of main each); empty companion = 50.0 % of the 1024 px of pane area; 183 px dead gutter each side |
| F-8 | `cat demo/ui/*/index.ts` | all 19 are pure `export … from "@mkbabb/glass-ui"` |
| F-9 | type `linear-gradient(in oklch shorter hue, red, blue)` into the CSS panel | verdict `unparseable color "in"` |
| F-10 | type `linear-gradient(90deg, nonsense, )` | verdict + destructive border + `aria-invalid=true`, `aria-describedby: null`, tile still painting the old model |
| F-11 | focus a stop seat at 2 stops, press Delete; repeat at 3 | 2 → 2 (silent); 3 → 2 |
| F-12 | read `rowGap` and the nine inter-child gaps of the body column | `20px` and 20 px, nine times |
| F-13 | read `serializeGradient` (`useGradientCSS.ts:147-162`) against the section heading `:149` | type/direction serialized; space/hue absent from both serializers and from `gradientParse.ts` |
| F-14 | click the rail ten times, re-measure | 12 stops, 0 overlaps, body 720.1 → 1321.8, easing 686.6 (51.9 %), code well 477/190 |
| F-16 | `REPORT.json` → `/#/gradient` → `bleeding` | 12 elements right-of-viewport in all four matrices with `overflowX 0` |

Probe scripts (committed, read-only): `probes/challenge-D-pass3-composition.mjs`,
`probes/challenge-D-pass3-states.mjs`, `probes/challenge-D-pass3-reset-focus.mjs`.
Frames: `evidence/challenge-D-p3-*.png` (desktop 1440 light, 320 narrow, slider-focus crop,
12-stop state, parse-rejection crop, and the six contrast clips).

---

## 11. Disposition

**DEFECTIVE.**

Pass 2 concluded the component "decided that a gradient needs three surfaces." That is right, and it
understates it. The three surfaces do not merely disagree — **one of them silently destroys the
output of another.** The code well cannot represent easing, cannot represent interpolation space,
cannot represent hue method, cannot parse the CSS that expresses any of them, and resets every
authored curve on any keystroke. The panel that a user reads to understand the gradient is the panel
that quietly deletes half of it.

Everything else falls into place around that refusal to name one model. Because there is no single
representation, there is no single specimen — so a redundant tile is bolted onto the right rail,
where it costs the controls their legibility at every narrow arm and takes a proportion nobody
chose. Because there are no regions, the canon's golden split cannot exist, so the route hands
36.4 % of itself to another instrument's empty state. Because the headings are the only grouping
device and the rhythm is a single 20 px token, three `<hr>` are structurally load-bearing where the
canon says the divider count is zero. Because primitives are adopted bare rather than as
compositions, the Direction axis has an invisible zero-area handle, two focus indicators, no unit,
no numeric entry and no reserved value.

**The gestalt cure is one transposition, not eighteen patches: one gradient, one model, one
serialization, three regions.** The model serializes completely (`linear-gradient(<angle> in <space>
<hue> hue, …)`) and parses what it serializes; that one string is what the code well shows, what
Copy writes and what the specimen paints — so the rail *becomes* the render and the tile dies,
returning 28 % of the mobile control width. The three sections become two honest ones (geometry,
interpolation) inside an `InstrumentChassis` whose stage/inspector split the canon already
specifies, with a rhythm that groups headings to their content and therefore needs no rules. The
controls adopt the `§5` axis composition, which brings the register, the unit, the reserved value
and the numeric entry with it.

That single transposition closes F-1, F-2, F-3, F-7, F-9, F-10, F-12, F-13, F-14, D-1, D-2, D-3,
D-6, D-11, D-13, D-14, E-1, E-2, E-3 and E-7 together. What remains after it are four small,
separable rows — Reset's missing field, the silent refusals, forced-colors, and the two producer
relays to glass-ui.
