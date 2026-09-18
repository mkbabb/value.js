# CHALLENGE-D (r2) — `GradientStopEditor.vue`: the design is wrong

## Model receipt

I observe myself to be **Opus 5 (`claude-opus-5[1m]`, 1M context)** — the tier this seat was spawned
with, declared explicitly, not inherited. Sole author of this file and of every measurement in it.

---

**Subject** `demo/workbenches/gradient/GradientVisualizer/GradientStopEditor.vue` (393 lines)
**Route** `http://localhost:9000/#/gradient` · **Base** branch `tranche-u`, HEAD `c654824e`, live dev server :9000
**Verdict** `DEFECTIVE` — **4 BLOCKER / 7 MAJOR / 4 MINOR / 2 INFO**
**Probes** `evidence/WBGSE-D-probe2.mjs`, `probe4`, `probe5`, `probe7` (Playwright/Chromium, desktop 1440×900 @2×, iPhone 14) — re-runnable verbatim; every number below is pasted from their stdout or measured from a pixel buffer.

> **Supersession.** An r1 pass of this seat exists from 2026-07-24; it is preserved verbatim at
> `challenge-D-design-r1-2026-07-24.md`. This r2 was derived independently (different probe method:
> pixel sampling and live DOM, not geometry algebra) and then reconciled against it. §17 records
> convergence and divergence honestly. Where r1 and r2 agree by different methods, the finding is
> corroborated, not duplicated.

---

## 0. What the canon says this instrument must be

| Authority | Binding text |
|---|---|
| `VISUAL-CONSTITUTION.md:206` | "The rounded meniscus rail and its preview **dominate**. Each WatercolorDot stop is a **face inside an enclosing geometric button/seat**; that seat alone carries selection, focus, drag and accessible state. Stops have explicit **add/move/remove/numeric alternatives**." |
| `VISUAL-CONSTITUTION.md:127` (§5.2) | "Gradient stop position \| Right increases serialized stop percentage; Left decreases; **Up/Down** use the same signed step when supported \| **Home=0%, End=100%**; **announce stop identity, percentage, ordinal**" |
| `VISUAL-CONSTITUTION.md:104` | "The domain-neutral axis composition sits over BI `Slider` … Picker, Generate count, Extract, **Gradient**, Atmosphere and Blob adopt that one composition; feature waves own their domain arrangement, **not new slider mechanics**." |
| `OPTICAL-BENCH-COMPOSITIONS.md:44` | "**Gradient** … Landmark-neutral chassis; **stop face inside seat**. W27. Close preview/model/**order**/face-seat." |
| `OPTICAL-BENCH-COMPOSITIONS.md:78` | Gradient boundaries `[]`, reserve `none` — "meniscus, stop seats and code/action **interval** carry grouping" |
| `PROPORTION-AUDIT.md:53` (PR-09) | "Gradient/Easing protagonist subordinated — **ENLARGE** — Primary W27. One 19–22rem protagonist; support subordinate" |
| `PROPORTION-AUDIT.md:51` (PR-07) | "Hover-only/unlabeled controls and **invisible drag state** — ADD-AFFORDANCE / REMOVE … every surviving action/drag seat has a name/state" |
| `PROPORTION-AUDIT.md:50` (PR-06) | "**Three adjacent action species** or duplicated selected fills — **REMOVE** — One action/selection owner" |

Measured against that, the component satisfies **none** of the seven laws that name it.

---

## 1. BLOCKER · D2-01 — eight characters typed into the route's own CSS field **annihilate the whole application**, silently

The workbench ships a `contenteditable` CSS field 400px below the rail (`GradientCodeEditor.vue:88`),
whose whole purpose is to accept authored CSS. Type a CSS-valid but empty-argument colour function
into it and the entire shell is destroyed.

```
$ node evidence/WBGSE-D-probe7.mjs
== p7-oklch-empty ==
  typed: linear-gradient(90deg, oklch() 0%, red 100%)
  before: {"stops":2,"bar":true,"bodyLen":649}
  after:  {"stops":0,"bar":false,"tile":false,"verdict":null,"editorText":"","bodyLen":142}
  errs:   []
== p7-rgb-empty ==
  typed: linear-gradient(90deg, rgb() 0%, red 100%)
  after:  {"stops":0,"bar":false,"tile":false,"verdict":null,"editorText":"","bodyLen":142}
  errs:   []
== p7-bogus ==
  typed: linear-gradient(90deg, notacolor 0%, red 100%)
  after:  {"stops":2,"bar":true,"tile":true,"verdict":"unparseable color \"notacolor\"", ...}
```

`evidence/D-01-route-annihilated.png` is what the user is left with: an empty ambient field, no dock,
no heading, no diagnosis — **one unlabelled `Try again` pill**. Body text 649 → 142 characters. Zero
`pageerror`, zero `console.error`: the failure is completely silent to telemetry, which is why the
shipped Safari matrix (`visual/REPORT.md:140` — `/#/gradient` pageErr 0, consoleErr 0) reports this
route as clean.

**Root cause is outside my subject file** and is the mega-tranche's own MT-F001:
`src/css/grammar.ts:181` asserts `slash[0]!` non-null; for `oklch()` the body is empty, `splitTopLevel`
returns `[]`, and `undefined.replace(…)` throws. `gradientParse.ts:93` (`return parseCssColor(token).ok`)
consumes that parser as a **total predicate** — it has no `try`, because the library's contract is
"returns a result", not "may throw". The throw escapes the debounced parse, escapes `applyCSS`'s
advertised atomic `{ok:false,reason}` contract (`useGradientModel.ts:152–156`), and lands on the app
error boundary, which replaces everything.

**The design defect that is mine.** The instrument has *no error state of its own and no independent
survival*. The whole error grammar of this workbench is a single one-line verdict owned by a sibling
(`GradientCodeEditor.vue:109`), and it is bypassed by any failure that is not `{ok:false}`. The rail —
the protagonist — cannot render a "the model is unreachable" state because it has no state but
`stops[]`. `VISUAL-CONSTITUTION.md:83` ("failed … states are never colour-only. Role, accessible name,
state/value and associated error/status are explicit") and §7's storage-recovery pattern ("one
content-hug recovery article: diagnosis, preservation/export, then separately confirmed reset") are
both unmet: what the user gets is a blank pink field.

**Reproduction** `node evidence/WBGSE-D-probe7.mjs`, or on the live route: click the CSS block, select
all, type `linear-gradient(90deg, oklch() 0%, red 100%)`, wait 500ms.
**Mechanism** a throwing dependency consumed as a total function, behind an error grammar that only
models the `{ok:false}` arm, in a component with no failure state.
**Cure (gestalt)** the parse boundary is one seam: `applyCSS` is the *only* place the library parser
is called for this workbench and it must be total there (result-typed, throw-free) — and the rail must
own a real `model-unavailable` face so a bad parse degrades the *instrument*, never the *shell*.

---

## 2. BLOCKER · D2-02 — the ramp and the handles are on **two different axes**; a handle's own colour is not the colour under it

`.gradient-rail` (`:317–326`) paints `var(--rail-ramp)` with `background-origin/clip: border-box`,
`background-size: 100% 100%` — so percentage `p` is painted at `x = W·p/100` across the **full** box.
Handles use `handleLeft()` (`:55–57`) = `calc(10px + (100% − 20px)·p/100)` — the **inset** track. Two
affine maps that agree only at `p = 50`. The file's own docblock (`:8–13`) asserts the opposite:
"handles, add-ghost and ramp **share one axis by construction**".

Pixel measurement, ten-hue ramp, element screenshot at DPR 2 (`evidence/D-03-ten-hue-rings.png`,
924×82 device = 462×41 CSS). Column `err` = (x where the ramp paints that stop's own percentage) −
(that handle's centre):

```
 stop%   handle_cx(dev)   ramp_x for that %(dev)   err (CSS px)   fill@handle      ramp directly above handle
    0.0        22                   1                 -10.5       (232, 49, 49)    (235, 85, 36)
   11.1       119                 103                  -8.0       (232,158, 48)    (232,172, 40)
   22.2       217                 205                  -6.0       (195,232, 48)    (188,232, 52)
   33.3       315                 308                  -3.5       ( 85,232, 48)    ( 88,232, 65)
   44.4       413                 411                  -1.0       ( 48,232,122)    ( 50,232,131)
   55.6       511                 513                  +1.0       ( 48,232,232)    ( 53,232,231)
   66.7       609                 616                  +3.5       ( 48,122,232)    ( 45,135,233)
   77.8       707                 719                  +6.0       ( 85, 48,232)    ( 88, 67,233)
   88.9       805                 821                  +8.0       (195, 48,232)    (181, 57,235)
  100.0       902                 922                 +10.0       (232, 49,159)    (226, 54,176)
```

The error is exactly linear, ±10.5 CSS px at the terminals, zero at the centre — the signature of two
maps, not of rounding. **The pixel columns are the user-visible half:** at 0% the handle *is* pure
`(232,49,49)` while the ramp at that same x is already `(235,85,36)` — the swatch and the ground it
claims to mark are different colours. On mobile (`railW = 324`, probe 2 block 4) the same 10.5px is
**3.24%** of the ramp: **the instrument is wrong by a different amount at every viewport width.**

`getPosition()` (`:75–81`) inverts the *handle* axis, so a click at rail-fraction `f` mints a stop at
`(fW−10)/(W−20)` — the ghost previews `colorAt` of the minted value while sitting over the ramp's
value. Four quantities disagree at once by construction: pointed-at, previewed, minted, painted.

**Reproduction** `node evidence/WBGSE-D-probe4.mjs` (block 8) then the pixel table above (any image
tool; the PNG is committed).
**Mechanism** one domain quantity, two coordinate systems, plus a comment asserting they are one.
**Cure (gestalt)** express the axis **once**. Inset the *ramp* to the handle track
(`background-position: 10px 0; background-size: calc(100% − 20px) 100%`) so the pill caps hold flat
terminal colour — which is what a 0%/100% stop means anyway — and derive `HANDLE_HALF` from the
rendered handle box instead of re-declaring it in JS (see D2-12).

---

## 3. BLOCKER · D2-03 — the drag gesture has **no ordering law**, and the corrupt result is what gets copied

`addStop` sorts (`useGradientModel.ts:118`). `updateStop` does not (`:127–131`). The editor owns the
drag and emits raw positions (`:145`). So a drag across a neighbour leaves the model **non-monotonic**,
and the serializer faithfully emits it:

```
$ node evidence/WBGSE-D-probe2.mjs
== 2 after add ==      ["…at 0%","…at 50%","…at 100%"] | linear-gradient(90deg, oklch(0.75 0.15 145) 0%, oklch(70% 0.165 205deg) 50%, oklch(0.65 0.18 265) 100%)
== 2 after drag-past == ["…at 84%","…at 50%","…at 100%"]
   css: linear-gradient(90deg, oklch(0.75 0.15 145) 83.8%, oklch(70% 0.165 205deg) 50%, oklch(0.65 0.18 265) 100%)
   dom left offsets: ["calc(83.8% - 6.76px)","calc(50% + 0px)","calc(100% - 10px)"]
```

CSS Images 3 §3.4.1 clamps a stop below its predecessor **up** to it, so the cyan 50% stop is painted
at 83.8%. `evidence/D-02-unsorted-drag.png` is the result: a rail that is **flat green for 84% of its
length** with a hard cut to blue, a cyan handle sitting on solid green, and a render tile showing the
same collapse. Three handles, two of them lies.

This is not a transient view state — it is the artifact:
* the copied CSS (the route's deliverable, `GradientVisualizer.vue:128`) ships the degenerate string;
* `intervals[]` is index-paired to adjacent stops, so per-interval easing is now attached to a reversed pair;
* `colorAtPosition` (`GradientVisualizer.vue:64–88`) assumes ascending order — its guards return the
  *first*/*last array element*, not the *lowest*/*highest stop*, so the add-ghost previews a colour the
  ramp does not contain, and for some unsorted configurations its loop falls through to
  `throw new Error("No gradient interval contains X%")` — a throw on a **hover**, into the same
  boundary as D2-01.

`OPTICAL-BENCH-COMPOSITIONS.md:44` names "**order**" as one of four things W27 must close for Gradient.
It is open, and this component is where it is open.

**Reproduction** `node evidence/WBGSE-D-probe2.mjs` block 2; or live: click mid-rail to add a stop,
then drag the left handle past it.
**Mechanism** an ordinal invariant that exists in one write path (`addStop`) and not in the other
(`updateStop`), with the gesture owner disclaiming it.
**Cure (gestalt)** ordering is an invariant of the *aggregate*, not of a call site: `stops` becomes a
sorted-by-construction collection (every mutation returns a normalised list, ordinals recomputed,
`intervals` re-derived from adjacency), and the editor keeps handle identity across the crossing so
the grabbed handle stays grabbed — which is also the only way to make §5.2's "announce item and
`position of total`" reorder grammar expressible at all.

---

## 4. BLOCKER · D2-04 — the handle's only boundary is a fixed white ring **over a fill that is by construction the ground**: measured 1.00:1

The swatch paints the stop's colour (`:247`); the rail paints the ramp; a stop's colour is *exactly*
the ramp's colour at that point. So the fill can never contrast with its surroundings — the entire
affordance rests on `border-2 border-white/80` (`:235`, computed
`oklab(0.999994 … / 0.8)`, probe 1). Measured WCAG contrast of the ring against the fill it encircles:

| ramp | ring : fill | ring : adjacent ramp |
|---|---|---|
| `#ffffff → #fafafa` (white ramp) | **1.00 : 1** and **1.03 : 1** | 1.37 / 1.03 |
| ten-hue rainbow, per stop | 3.19, **1.93**, **1.31**, **1.44**, **1.44**, **1.37**, 3.22, 5.07, 3.22, **2.96** | 3.82, 2.13, 1.44, 1.39, 1.44, 1.38, 2.04, 3.96, 4.12, 3.11 |

**6 of 10 hues fall below the 3:1 non-text floor; a light ramp reaches 1.00:1 — the control is
literally invisible** (`evidence/D-03-white-ramp-handles.png`: the two handles are gone; only the
`--shadow-sm` smudge survives). This is not an edge case: white, cream, pastel and any stop with
relative luminance > 0.30 fails, because `contrast(white, C) ≥ 3` requires `L(C) ≤ 0.30`. The shipped
default green `oklch(0.75 0.15 145)` is one of them.

The same file already contains the cure and does not apply it: the **focus** ring is dual-contrast by
design (`:342–349`, measured settled value
`rgba(0,0,0,0.85) 0 0 0 1px, rgba(255,255,255,0.92) 0 0 0 3px, --shadow-sm`) precisely so that "at
least one edge contrasts against ANY fill" (`:335–337`). The resting and selected boundaries get a
single hardcoded white — in **both schemes**, with no `prefers-color-scheme` arm anywhere in the file.

**Reproduction** `node evidence/WBGSE-D-probe4.mjs` (writes both PNGs); contrast recomputable from the
committed images.
**Mechanism** a specimen whose fill is definitionally equal to its ground, defended by a one-sided
hairline.
**Cure (gestalt)** the resting boundary adopts the dual-contrast recipe the focus ring already
proves — or, per `OPTICAL-BENCH-COMPOSITIONS.md:44`, the dot becomes a **WatercolorDot face inside a
named geometric seat** and the *seat* (not the face) carries a scheme-aware boundary. See D2-16.

---

## 5. MAJOR · D2-05 — on touch, aiming a few pixels low on a **selected** handle deletes the stop

Both the handle and the remove chip inflate to `var(--touch-target, 2.75rem)` = 44px on coarse
pointers (`:385–391`), measured `beforeSize: "44pxx44px"` (probe 2 block 4). Measured page geometry
with a stop selected (probe 2 block 3): rail bottom `240.7`, handle centre `220.7`, chip box
`y 244.7 … 268.7`, chip centre `256.7`.

* handle hit zone (coarse): `220.7 ± 22` → **198.7 … 242.7**
* chip hit zone (coarse): `256.7 ± 22` → **234.7 … 278.7**
* **overlap 234.7 … 242.7** — 8px of it *inside the rail*, 14–22px below the handle's own centre.

The chip is `z-20` and later in DOM order, so it wins the overlap. A fingertip aimed at the selected
handle but landing 16px low — well inside one contact patch — hits **"Remove selected stop"** and the
stop is destroyed. There is no confirmation and no undo (D2-10).

**Reproduction** probe 2 block 3 prints the boxes; `chipHitAtHrY: "Remove selected stop"` shows the
chip already winning hit-tests outside its visual box.
**Mechanism** two invisible 44px targets stacked 36px apart on a 40px rail — target inflation applied
per-element with no arbitration.
**Cure** the destructive action leaves the rail's physical neighbourhood entirely: remove lives in the
inspector row for the selected stop (where `position` and `colour` fields also belong — D2-08/D2-14),
so nothing destructive shares a fingertip with the drag surface.

---

## 6. MAJOR · D2-06 — the keyboard grammar is a third of the specified one, and AT sees no state at all

`VISUAL-CONSTITUTION.md:127` binds the row. Measured against it (probe 1, `== C keys ==`):

```
ArrowRight       ["…at 0%","…at 100%"] -> ["…at 1%","…at 100%"]     ✔
Shift+ArrowRight ["…at 1%", …]         -> ["…at 11%", …]            ✔ (undocumented ±10)
End              ["…at 11%", …]        -> ["…at 11%", …]            ✘ spec: End = 100%
Home             ["…at 11%", …]        -> ["…at 11%", …]            ✘ spec: Home = 0%
ArrowUp          unchanged                                          ✘ spec: same signed step
ArrowDown        unchanged                                          ✘
Enter            unchanged   (stops still 2)                        ✘ dead on a <button>
Space            unchanged   (stops still 2)                        ✘ dead on a <button>
```

`Enter`/`Space` on a native `<button>` doing nothing is its own defect: the element advertises
activation semantics it does not implement, and selection is reachable **only** by pointer
(`:119–134`) or as a side-effect of an arrow nudge (`:178`).

Accessible state (probe 5, `== C ==`), with one stop selected:

```
[{"label":"Gradient stop at 0%","attrs":["aria-label=Gradient stop at 0%"]},
 {"label":"Gradient stop at 24%","attrs":["aria-label=Gradient stop at 24%"]},
 {"label":"Gradient stop at 100%","attrs":["aria-label=Gradient stop at 100%"]}]
```

No `role`, no `aria-valuenow/min/max/text`, no `aria-pressed|current|selected`, no ordinal. The spec
requires "announce stop identity, percentage, **ordinal**". A screen-reader user cannot tell which
stop is selected, cannot hear a value change (mutating a focused button's `aria-label` is not a
reliable announcement), and has no `Home`/`End`. §4.1: "Selected … states are never colour-only" —
here selection is 20% border-alpha plus a 1.25 scale and **nothing else**.

**Mechanism** a bespoke control impersonating a value control. **Cure** the seat *is* the producer
`Slider` axis composition (`VISUAL-CONSTITUTION.md:104` — "not new slider mechanics"): role, value,
Home/End, RTL law and announcement all arrive with it, and this file stops owning slider physics.

---

## 7. MAJOR · D2-07 — the add gesture is hover-only, unnamed, unreachable by keyboard, and silently starves on touch

The bar is a bare `<div>` (probe 1): `role: null`, `tabindex: null`, `ariaLabel: null`,
`cursor: "copy"`. Its click mints a stop. The file argues (`:35–41`) that the hover ghost makes the
gesture "self-evident, no instruction line needed" — **there is no hover on touch**, so on every phone
the largest interactive surface on the route has no affordance, no name, and no preview, and mints a
new stop on any stray tap.

It also starves as the instrument fills. Probe 2 block 4, iPhone 14 (`railW: 324`): a tap at 40% added
a stop; the next tap 6% away (≈19px) landed inside that handle's 44px zone and **added nothing** — the
guard `target.closest("[data-stop-id]")` (`:87`) treats it as a grab:

```
info: [{"label":"Gradient stop at 0%"},{"label":"Gradient stop at 39%"},{"label":"Gradient stop at 100%"}]   ← 3 stops, not 4
```

Each stop sterilises `44/324 = 13.6%` of the rail against the add gesture, with no signal that
anything was refused. There is no keyboard path to add at all.

**Cure** the add is a *named action*, not a bare surface gesture: an "Add stop" control in the
instrument's action row (position defaulting to the largest gap, editable numerically), with the
rail-click retained as an accelerator, not as the only door.

---

## 8. MAJOR · D2-08 — `select` has no payload: **nothing in the product can edit a stop's colour**

```
$ grep -rn "selectedStopId" demo/
GradientVisualizer.vue:51   const selectedStopId = defineModel<string|null>("selectedStopId", {default:null});
GradientVisualizer.vue:140  v-model:selected-id="selectedStopId"
GradientVisualizer.vue:144  @select="(id) => selectedStopId = id"
```

Three lines: a declaration and two writes. **Zero readers.** Selection propagates nowhere.
`GradientVisualizer.vue`'s template contains a type/space/hue band, an easing accordion and a CSS
block — no stop inspector. `GradientPane.vue:8` injects `CSS_COLOR_KEY` and never uses it, so the
app's current colour cannot even be applied to a stop.

So the component named *StopEditor* edits **position** and **existence** only. The entire selection
apparatus — a `defineModel`, a re-tap-to-deselect gesture (`:148–156`), an Escape handler, a scale
ladder, a floating chip — exists to unlock exactly one action, `remove`, which is *already* reachable
two other ways (D2-10). The only way to change a stop's colour is to hand-type CSS into the field that
D2-01 shows is a loaded gun.

`VISUAL-CONSTITUTION.md:96`: the grammar is **select → tune → commit**. There is no tune.

**Cure** either selection acquires its payload (a stop inspector: swatch → picker, numeric position,
remove — which simultaneously discharges D2-05, D2-06's numeric arm and D2-14), or selection is
deleted and the rail keeps only drag+add. A selection state that buys nothing is decoration.

---

## 9. MAJOR · D2-09 — the remove chip reserves **no** geometry and paints across the next section's rule

The chip is `absolute … top-11` (`:288`) on a container whose flow height is only the 40px rail
(probe 1: `editorRootHeight: 40`). Measured with a stop selected (probe 2 block 3):

```
{"chip":{"y":244.7,"h":24,"bottom":268.7},"barBottom":240.7,"hrTop":260.7,
 "overlapsHr":true,"chipHitAtHrY":"Remove selected stop"}
```

The chip protrudes **28px** below its own container and overlaps the following `<hr>` by **8px**;
`elementFromPoint` at the rule's y returns the chip. `evidence/D-08-chip-on-divider.png` shows the ✕
sitting astride the hairline, cutting it — and `evidence/D-02-unsorted-drag.png` shows the same collision
independently. Nothing in the parent reserves that band (`GradientVisualizer.vue:135` is a plain
`gap-5` column), so the chip's presence is a pure overlay on whatever follows.

Two further design faults in the same object: the glyph is `X` — the universal *dismiss* mark — placed
on a section divider, so it reads as "close this section", not "remove this stop"; and it is visually
orphaned from the handle it belongs to (no tether, no shared enclosure, 24px of empty rail between
them).

Note also `OPTICAL-BENCH-COMPOSITIONS.md:78`: Gradient's binding boundary set is `[]` with reserve
`none` — the route renders **three** `<hr>` rules (`GradientVisualizer.vue:148, 240, 251`). The chip is
therefore colliding with a rule that the composition says should not exist. (That row is the parent's
to close; recorded here because it is the surface the collision lands on.)

---

## 10. MAJOR · D2-10 — three destructive removal species, no confirmation, no undo, and a silent no-op

| path | source | discoverable? | confirmed? |
|---|---|---|---|
| right-click / two-finger tap a handle | `:164–167` | no | no |
| `Delete` / `Backspace` on a focused handle | `:180–182` | no | no |
| the ✕ chip | `:284–300` | only after selecting | no |

```
$ node evidence/WBGSE-D-probe5.mjs
B after click-add:   ["…at 0%","…at 50%","…at 100%"] | linear-gradient(90deg, …, oklch(70% 0.165 205deg) 50%, …)
B after right-click: ["…at 0%","…at 100%"]           | linear-gradient(90deg, …, oklch(0.65 0.18 265) 100%)
   any dialog/confirm/undo affordance: {"dialogs":0,"undoText":[]}
```

A right-click destroys a stop instantly and irreversibly; the route contains **no undo affordance at
all**. `PROPORTION-AUDIT.md:50` (PR-06) rules exactly this shape: "Three adjacent action species …
**REMOVE** … One action/selection owner".

The same probe shows the unavailable arm is equally undesigned — at the 2-stop floor `Delete` does
nothing and says nothing:

```
A after Delete @2 stops: ["…at 0%","…at 100%"] | live regions: ["· empty plate ·No saved palettes yet. …"]
```

`removable` (`:66`) merely `v-if`s the chip away, so the constraint is expressed as *absence*. §4.1:
"disabled states are never colour-only. Role, accessible name, state/value and associated
error/status are explicit." An affordance that vanishes is not a disabled state, and a key that
silently no-ops is not feedback.

---

## 11. MAJOR · D2-11 — the protagonist is 40px tall

`h-10` (`:203`) — measured 462 × **40** CSS px on desktop, 324 × 40 on mobile. The route's actual
"render tile" is `w-20 sm:w-24` (`GradientVisualizer.vue:223`) = 80–96px wide. The constitution's
Gradient row demands a **dominant** meniscus preview at P122 `golden` 61.8% of the chassis
(`VISUAL-CONSTITUTION.md:49`, `OPTICAL-BENCH-COMPOSITIONS.md:44`), and PR-09 demands "one 19–22rem
protagonist" (304–352px). The desktop shot (`visual/shots/safari-desktop-light/gradient.png`) shows
the truth: the instrument the route exists for is a 40px strip wedged between a subtitle and a rule,
subordinate to a 3-column select band, an easing accordion and a code block — and sharing the viewport
50/50 with an unrelated *My Palettes* companion.

The 40px height is also what forces every other defect in this report to be solved by *invisible*
means: 20px dots (D2-04), 44px phantom targets stacked 36px apart (D2-05), a chip exiled outside the
box (D2-09). **Give the instrument its height and most of the geometry pathology dissolves.**

---

## 12. MINOR · D2-12 — `HANDLE_HALF = 10` duplicates a rem-derived size; text resize breaks the "end-handle truce"

`:53` hardcodes `const HANDLE_HALF = 10; // w-5 handle → 20px, half = 10`, while the handle's size is
`w-5 h-5` = `1.25rem`. The two agree only at a 16px root. Measured (probe 2 block 5):

```
before: {"handleW":20, "handleLeftEdge":225, "barLeftEdge":224, "rootFS":"16px"}   overhang: -1.00 px (inset)
after:  {"handleW":25, "handleLeftEdge":100.5,"barLeftEdge":102,  "rootFS":"20px"}  overhang: +1.50 px (protruding)
```

At a 20px root font — an ordinary WCAG 1.4.4 text-size setting — the handle grows to 25px, the JS inset
stays 10px, and the 0% handle **hangs off the rail's rounded end**, which is the exact condition the
`:49–53` "end-handle truce" comment claims to have fixed. The same constant is restated in four
disagreeing places: `HANDLE_HALF` (JS), `w-5` (utility), `top-11` (chip offset), `max(1.5rem,100%)` /
`--touch-target` (pseudo).

**Cure** one source: the handle's box is measured or expressed in a single custom property that both
the CSS and the pointer maths read.

---

## 13. MINOR · D2-13 — the protagonist is the only unnamed region on the route

`Interpolation`, `Easing` and `CSS` each carry an `<h3>` (`GradientVisualizer.vue:149, 241, 253`). The
stop rail carries no heading, no label, no `aria-label`, no `role`, no group. It is the one thing on
the route with no name — visually or semantically — while three supporting bands are titled. The
hierarchy inverts: support is announced, the protagonist is anonymous.

---

## 14. MINOR · D2-14 — no visible value, ever

While dragging, the position appears nowhere on screen: the number lives only in `aria-label`
(invisible) and in the CSS block far below. There is no numeric entry, no readout, no tooltip during
drag. `VISUAL-CONSTITUTION.md:206` requires "explicit add/move/remove/**numeric** alternatives" and
PR-07 names "**invisible drag state**" as an ADD-AFFORDANCE row. The user drags a 20px dot and reads
the result by decoding a CSS string.

---

## 15. MINOR · D2-15 — crowding has no law

Measured, 10 stops (probe 3): desktop centre-to-centre gaps `48.8 48.9 48.8 48.9 49.2 48.9 48.8 48.9
48.8` px on a 462px rail. On the 324px mobile rail the same 10 stops give `(324−20)/9 = 33.8px` gaps —
**below the 44px coarse hit zone**, so neighbouring stops become mutually untappable. Two stops may
also occupy the *same* position (`addStop` permits it; drag permits it), after which only the
top-of-stack handle is reachable and the other is unreachable forever by pointer. There is no minimum
separation, no fan-out, no overflow treatment, and no cap.

---

## 16. INFO · D2-16 — species violation: a hand-rolled dot where the canon names WatercolorDot-in-a-seat

`OPTICAL-BENCH-COMPOSITIONS.md:44` — "stop **face inside seat**"; `:108` (P051) names the **Gradient**
site explicitly in the execution list. `VISUAL-CONSTITUTION.md:206` — "Each **WatercolorDot** stop is a
face inside an enclosing geometric button/seat".

```
$ grep -rn "WatercolorDot" demo/ | wc -l
64                     # 19 files: Mix, Generate, Extract, Picker sliders, Dock, ColorSpaceSelector, palettes…
$ grep -n "WatercolorDot" demo/workbenches/gradient/GradientVisualizer/GradientStopEditor.vue
(no matches)
```

Instead the file hand-rolls a swatch out of a CSS trick — `background: linear-gradient(c, c),
var(--alpha-checker)` (`:247`) — which is also the construct that makes an invalid colour silently
invalidate the whole shorthand (no fill, no checker: an empty ring). Owner edict 4 (glass-ui is the
design system; reuse existing component-type names) and edict 5 (style at the root, not per-instance)
are both violated by the same 40 lines of inline `:style` object, which additionally shadows any class
utility — a trap the file itself documents twice (`:30–33`, `:255–261`) and then re-enters for
`transition`.

---

## 17. INFO · D2-17 — forced-colors collapses the only colour-coded selection delta, and the shipped matrix cannot see it

Selection is encoded as border-alpha `0.8 → 1.0` plus `scale(1.25)`. In forced-colors mode
`border-color` is forced to a system colour, so the alpha delta becomes **zero** and selection survives
only as a 5px diameter change, with no accessible state to fall back on (D2-06). The focus ring is
correctly re-expressed as a real `outline` there (`:353–359`) — the resting/selected boundary is not.

The shipped state matrix cannot adjudicate this: `visual/states.mjs:25` runs the `forced-colors-desktop`
row under WebKit, which does not implement forced-colors emulation — and indeed
`shots/forced-colors-desktop/gradient.png` is pixel-identical in treatment to the ordinary light shot.
**That row is not evidence.** Re-run with `ENGINE=chromium` before any forced-colors claim, in either
direction.

---

## 18. What I checked and found **sound** — the negative proof

| Axis | Method | Result |
|---|---|---|
| Focus ring | probe 2 block 1, settled after 600ms | `rgba(0,0,0,0.85) 0 0 0 1px, rgba(255,255,255,0.92) 0 0 0 3px, --shadow-sm` — the dual-contrast recipe works, composes with the material lift, and survives over any fill. **Correct.** (A first read at t≈6ms showed `0.0117px` — that was the 200ms transition mid-flight, not a defect. Re-measured before publishing.) |
| Reduced motion | probe 2 block 6, `reducedMotion: "reduce"` | computed `transition-property: opacity, color, background-color, border-color, box-shadow` — **`transform` is gone**; the global guard `demo/styles/animations.css:184–192` neutralises the inline spring. No spatial motion under reduce. **Correct.** |
| Motion tokenisation | `:263` | `var(--duration-fast) var(--ease-standard)` + `var(--spring-snappy-duration) var(--spring-snappy)` — producer tokens, no ad-hoc numbers, no keyframes deleted, and the animated properties are `transform`/`box-shadow` (composited), never a layout property. **Correct.** |
| RTL | `shots/rtl-desktop/gradient.png` (cropped, `evidence/`-adjacent) | the rail does **not** mirror; handles stay on the physical ends — exactly `VISUAL-CONSTITUTION.md:127` ("identical; explicit gradient coordinates do not mirror with prose"). **Correct.** |
| Hit inflation bleed (fine pointer) | probe 1 block B, `elementFromPoint` | `+0,-14 → div.gradient-rail`; `+0,-21 → div.flex`. The 24px pseudo stays inside the 40px rail and steals nothing from neighbouring content. **Correct.** (The coarse 44px arm is a different story — D2-05/D2-07.) |
| Vue 3.5 idioms | read `:2, 6, 28` | `useTemplateRef`, reactive props destructure, `import type` under `verbatimModuleSyntax`. No stale `defineModel` read-after-write (`wasSelected` is captured before the write). **Correct.** |
| Horizontal overflow | `visual/REPORT.json`, all 4 matrices | `overflowX: 0` on `/#/gradient`. **Correct.** |

---

## 19. Family summary

| ID | Sev | Mechanism family | One-line result |
|---|---|---|---|
| D2-01 | BLOCKER | throwing dependency behind a `{ok:false}`-only error grammar | `oklch()` in the CSS field ⇒ whole app replaced by a bare "Try again", silently |
| D2-02 | BLOCKER | two coordinate systems for one quantity | handle centre vs its own ramp colour off by ±10.5px (2.27% desktop / 3.24% mobile) |
| D2-03 | BLOCKER | invariant held on one write path only | cross-drag ⇒ non-monotonic CSS ⇒ clamped ramp, lying handles, mispaired easing |
| D2-04 | BLOCKER | specimen fill ≡ its own ground | ring:fill contrast **1.00:1** on a white ramp; 6/10 hues below 3:1 |
| D2-05 | MAJOR | stacked invisible 44px targets | a touch 16px below a selected handle deletes the stop |
| D2-06 | MAJOR | bespoke control, no role/value | Home/End/Up/Down/Enter/Space dead; AT sees no selection, no ordinal |
| D2-07 | MAJOR | hover-only affordance on an unnamed div | no keyboard add, no touch preview, 13.6% of rail sterilised per stop |
| D2-08 | MAJOR | selection with no payload | `selectedStopId` has zero readers; no stop-colour editor exists anywhere |
| D2-09 | MAJOR | unreserved absolute footprint | chip protrudes 28px, overlaps the next rule by 8px and wins its hit-test |
| D2-10 | MAJOR | three action species, no confirm/undo | right-click destroys a stop irreversibly; `Delete` at the floor is a silent no-op |
| D2-11 | MAJOR | protagonist subordinated | the instrument is 40px tall against a 19–22rem law |
| D2-12 | MINOR | constant duplicated in 4 places | 20px root font ⇒ the "end-handle truce" inverts to a 1.5px overhang |
| D2-13 | MINOR | unnamed protagonist | the only region on the route with no heading, label or role |
| D2-14 | MINOR | invisible value | no readout during drag, no numeric entry |
| D2-15 | MINOR | no crowding law | 33.8px gaps < 44px targets at 10 stops on mobile; coincident stops unreachable |
| D2-16 | INFO | producer species re-implemented locally | hand-rolled dot where P051 names Gradient explicitly |
| D2-17 | INFO | forced-colors delta collapse + blind harness | selection is alpha-only there; the WebKit forced-colors row is not evidence |

### The single transposition that dissolves D2-02, D2-04, D2-05, D2-06, D2-07, D2-08, D2-11, D2-13, D2-14 and D2-16 at once

Stop hand-building a slider. The stop rail becomes the **producer axis composition over BI `Slider`**
that `VISUAL-CONSTITUTION.md:104` already binds Gradient to, at the height PR-09 already grants it,
with each stop a **WatercolorDot face inside a named seat** (`OPTICAL-BENCH-COMPOSITIONS.md:44`), one
axis shared by ramp and handles, and a **stop inspector** carrying colour, numeric position and the
single remove action. The rail then owns exactly one thing — spatial tuning — and the ordering
invariant (D2-03) belongs to the collection, not to a gesture.

---

## 20. Convergence with r1 (2026-07-24), stated honestly

Derived independently, then reconciled.

**Corroborated by a different method** — r1 `D-1`≡`D2-02` (r1: geometry algebra; r2: pixel sampling of
the rendered ramp), `D-2`≡`D2-03`, `D-3`≡`D2-05`, `D-4`≡`D2-09`, `D-5`+`D-6`≡`D2-04`+`D2-16`,
`D-7`≡`D2-06`, `D-8`≡`D2-07`, `D-9`≡`D2-08`, `D-13`≡`D2-12`. Two seats, two methods, same defects:
treat these as settled.

**New in r2** — D2-01 (route annihilation; the r1 challenge-D finding table has no such row — its
`D-10` records an invalid-colour *render* state, not the shell kill. Scrupulously: a sibling artifact
`probe-oklch-empty-crash.png` (2026-07-24 16:50) sits in this component's root, so a later π seat had
seen the crash; it is not carried in any finding list I can find, and the measurement, the silence of
the telemetry and the design attribution here are mine), D2-04's **numbers** (r1 argued the tautology
qualitatively; the 1.00:1 / 6-of-10 measurement is what makes it a BLOCKER), D2-10 (three removal
species + silent no-op at the floor), D2-11 (PR-09 proportion), D2-13, D2-14, D2-15's mobile arithmetic,
D2-17 (the forced-colors harness is blind).

**Carried from r1, not re-derived here** — r1 `D-11` (duplicate dispatch: `pointermove` fires on both
the captured handle and the bubbling bar, so every drag move emits twice; code-read certainty at
`:91–99` + `:136–146`), r1 `D-12` (dual selection channel: `defineModel` *and* `emit("select")` for one
fact, `:26` + `:130`), r1 `D-14`. I found no evidence contradicting any of them.

**Divergence** — none. I found no r1 finding I could refute.

---

**No source edits land from this formation.** This file, `evidence/`, and the preserved
`challenge-D-design-r1-2026-07-24.md` are the whole of my output.
