# CHALLENGE-D — `GradientVisualizer.vue` — the design is flawed

## Model receipt

I observe myself to be **Opus 5 (`claude-opus-5[1m]`)** — the model this seat was spawned with an
explicit declaration for. The seat is declared, not inherited.

| | |
|---|---|
| Subject | `demo/workbenches/gradient/GradientVisualizer/GradientVisualizer.vue` (279 lines) |
| Area | `demo/workbenches` |
| Route | `/#/gradient` (sole mount, via `demo/workbenches/gradient/GradientPane.vue:25`) |
| Repo / HEAD | `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, `c654824e` |
| Verdict | **DEFECTIVE** — 2 BLOCKER, 10 MAJOR, 5 MINOR, 2 INFO |
| Strongest defect | **D-1** — the panel headed `CSS` does not contain the component's CSS, and the Copy button emits a third, never-displayed string |

Evidence base: full read of the subject + `GradientPane.vue`, `GradientStopEditor.vue`,
`GradientCodeEditor.vue`, `GradientEasingEditor.vue`, `useGradientModel.ts`, `useGradientCSS.ts`;
the tranche's own Safari matrix (`audit/visual/REPORT.{md,json}`, `STATES.json`, 10 gradient
captures read as images); and a live read-only Playwright session against the dev server at
`http://localhost:9000` at 1440×900 and 390×844 (measurements pasted inline).

---

## 1. Visual truth first

### 1.1 What the four Safari captures actually show

`shots/safari-desktop-{light,dark}/gradient.png`, `shots/safari-mobile-{light,dark}/gradient.png`.

The component reads, top to bottom: a 40 px meniscus rail; a rule; **Interpolation**; a 3-up
select row with a portrait colour slab bolted to its right; a Direction slider; a rule;
**Easing** — a 519 px accordion carrying a ramp, a horizontally-scrolling curve catalogue and a
code rail; a rule; **CSS** — a heading, a copy glyph and an 80 px code well.

Three things are wrong before any state is exercised.

**(a) The protagonist is the smallest thing on the pane.** `VISUAL-CONSTITUTION.md §7 Gradient`:
"The rounded meniscus rail and its preview dominate." Measured live at 1440×900:

```
root (.flex.flex-col.gap-5)      462.0 × 1042.1
  rail (.gradient-rail)          462.0 ×   40.0   ← the constitutional protagonist
  hr                             462.0 ×    1.0
  h3 "Interpolation"             462.0 ×   30.5
  interpolation band             462.0 ×  128.5
  hr                             462.0 ×    1.0
  h3 "Easing"                    462.0 ×   30.5
  easing block                   462.0 ×  519.0   ← the support
  hr                             462.0 ×    1.0
  CSS header row                 462.0 ×   30.5
  code editor                    462.0 ×   80.0
previewSharePct (rail + tile area / root area) = 6.40 %   (9.71 % at 390 px)
```

The rail is **3.8 %** of the component's block extent. The easing inspector is **49.8 %**. The
support is 13× the protagonist.

**(b) The two chromatic surfaces show the same picture.** At the shipped default
(`type=linear, direction=90`) the rail paints `serializeRailRamp` — a 90° left-to-right ramp — and
the render tile paints `coalescedCSS`, also a 90° left-to-right ramp. Both captures show the same
green→blue left-to-right wash twice, once wide and once portrait. The tile earns its existence
only under `radial` / `conic` / non-90°, which is precisely the state in which its geometry lies
(§1.2).

**(c) Typographic inversion.** "Interpolation" / "Easing" / "CSS" render in Fraunces at
20.352 px in muted ink; the labels "TYPE / SPACE / HUE / DIRECTION" render in **uppercase Fira
Code**, the same voice the CSS literal two sections below speaks; the *values* the user actually
reads ("Linear", "OKLCh", "Shorter") are the quiet, unstyled text. The loudest ink on the band
belongs to the four words that carry the least information.

### 1.2 The mobile capture is a legibility failure

`shots/safari-mobile-light/gradient.png` — real WebKit, real mobile viewport. The three selects
read **`Lin⌄`**, **`Ok⌄`**, **`Sh⌄`**. Not one of the component's three primary settings is
readable. Reproduced live in a second engine at 390×844:

```
gridTemplateColumns  →  "69.3281px 69.3359px 69.3359px"
trigger "Linear"     →  scrollWidth 41 / clientWidth 27  → truncated
trigger "OKLCh"      →  scrollWidth 48 / clientWidth 27  → truncated
trigger "Shorter"    →  scrollWidth 48 / clientWidth 27  → truncated
```

![measured at 390 px](../../../../../../.playwright-mcp/mobile390-band.png)

The comment at `GradientVisualizer.vue:159-161` records that the per-select *subtitle* rows were
excised at W5-7 because "they truncated at every viewport". The cure was applied to the
annotation. The value it annotated still truncates.

### 1.3 The render tile is an ellipse of unowned eccentricity

Measured, same element, two viewports:

```
1440 × 900   tile 96.0 × 128.5   aspect 0.747
 390 × 844   tile 80.0 × 121.9   aspect 0.656
```

Width is authored (`w-20 sm:w-24`, `:223`). Height is not authored anywhere — it is whatever
`row-span-2` inherits from two rows sized by *other* content. The source comment at `:214-216`
calls the result "a square-ish surface". 96 : 128.5 is 1 : 1.34.

With `type=radial` the tile paints `radial-gradient(…)` with no shape keyword, i.e. CSS's
`ellipse farthest-corner`, into a 0.747-aspect box — while the dropdown option that produced it
reads, verbatim (`:55`), **"Center-outward circle"**:

![type=radial at 1440](../../../../../../.playwright-mcp/radial-tile.png)

A specimen surface whose geometry is grid residue cannot be "the honest surface for what
Type + Direction DO" (`:150-156`). Its eccentricity is a function of the type scale and the
viewport, not of the gradient.

### 1.4 Dark mode

`shots/safari-desktop-dark/gradient.png` is structurally identical; no scheme-specific defect is
visible. The section headings' `--muted-foreground` holds in both. **This arm is clean** — the
defects above are scheme-independent.

---

## 2. State coverage

Every state this component can hold, and its disposition. A state that was never designed is a
design defect.

| State | Reachable | Designed | Evidence |
|---|---|---|---|
| **empty** (0 stops) | no — `removeStop` guards at ≤2 (`useGradientModel.ts:123`) | dead branches only: `colorAtPosition` throws (`:66`), `serializeRailRamp` has a 0-stop arm (`useGradientCSS.ts:268`) | unreachable + unstyled |
| **1 stop** | only via `setStopsFromColors(["x"])` | Easing section correctly hidden by `v-if` (`:239`) | ✅ |
| **populated** | default | ✅ | — |
| **loading** | `pm.savedPalettes` is async | ✗ no pending state anywhere | D-17 |
| **error — parse** | yes | ✅ `parseVerdict` → destructive border + `role="status"` (`GradientCodeEditor.vue:107-114`) | ✅ the one well-designed state |
| **error — throw** | `easingFnOf` (`useGradientCSS.ts:128`), `colorAtPosition` (`:66,:77,:87`), `sampleCoalescedStops` (`:189,:207`) all `throw` inside computeds | ✗ no boundary, no fallback frame | D-17 (family) |
| **error — copy fails** | `writeClipboard` rejects | ✗ no `try`, no state | **D-10** |
| **error — seed with 0 palettes** | the shipped default (`"No saved palettes yet."` in all four captures) | ✗ silent `return` | **D-17** |
| **disabled** | `type=radial` makes Direction inert | ✗ **fully enabled, focusable, labelled, live readout** | **D-4** |
| **focused** | selects/slider/editor | ✅ producer rings; tile is `role="img"`, non-focusable | ✅ |
| **hovered / active / pressed** | producer-owned | ✅ | — |
| **selected** | `selectedStopId` | ✗ dangles after Reset (new ids minted, model not cleared) | D-16 |
| **dragging** | stop editor's | out of seat | — |
| **overflowing** | easing catalogue: `.strip-row` 1482.1 px inside a 436 px scroller | partly — a `fading-scroll` exists, 29 % visible | D-19 |
| **truncated** | all three selects at 390 px | ✗ | **D-2** |
| **RTL** | `shots/rtl-desktop/gradient.png` | band/tile mirror correctly; the CSS output surface carries no `dir="ltr"` isolation | D-15b (hypothesis) |
| **reduced-motion** | `STATES.json` → `rafPer1500ms: 0` | ✅ nothing to break — this component authors zero motion | ✅ negative proof |
| **forced-colors** | **never observed** — the capture is void | ✗ tile has no forced-colors arm; its declared twin does | **D-15** |
| **zoom 200 %** | `shots/zoom-200-desktop/gradient.png`, `overflowX: 0` | ✅ reflows single-pane, selects legible | ✅ |

---

## 3. Motion

`GradientVisualizer.vue` authors **zero** transitions, animations or keyframes. Its subtree's 49
animated declarations all come from children/producer and are tokenized
(`--duration-fast` 0.12 s, `--duration-normal` 0.2 s, `--spring-snappy-duration` 0.44 s,
`--ease-standard`). No animated property forces layout — the set is
`box-shadow, transform, rotate, background-color, color, border-color`.
`prefers-reduced-motion` is honoured at the page level (`STATES.json` reduced-motion row for
`#/gradient`: `rafPer1500ms: 0`, versus 264–270 in every other matrix).

**No motion defect. This is a genuine negative result.** The one observation worth recording is an
omission: the render tile — the surface that changes most dramatically (linear → radial → conic) —
has no transition at all, so the specimen snaps while every control around it eases. That is a
gap in the same register, not a violation of it.

---

## 4. Defects

Ordered by severity. IDs are stable for the ledger.

### D-1 · BLOCKER · the panel headed `CSS` is not the CSS, and Copy emits a third string

**Mechanism.** Three surfaces claim to represent one gradient and are fed by two different
serializers plus one clipboard write:

```
GradientVisualizer.vue:259   <GradientCodeEditor :model-value="simpleCSS" …/>     ← what the user READS
GradientVisualizer.vue:224   :style="{ '--tile-render': coalescedCSS }"           ← what the user SEES
GradientVisualizer.vue:128   await writeClipboard(coalescedCSS.value)             ← what the user GETS
```

`useGradientCSS.ts:147-162` `serializeGradient` emits the raw stops with **easing not baked in**.
`useGradientCSS.ts:281-305` `serializeCoalescedGradient` emits 32 eased sub-stops. They are
equivalent only while every interval is `linear`.

**Reproduction** (live, 1440×900, `/#/gradient`):

1. Open the Easing accordion (open by default) and click the `css → in-out` specimen tile.
2. Read the three surfaces:

```
easing literal (.readout-rail code)  "cubic-bezier(0.42, 0, 0.58, 1)"

editor text                          "linear-gradient(90deg,
                                       oklch(0.75 0.15 145) 0%,
                                       oklch(0.65 0.18 265) 100%)"     ← 2 stops, NO easing
editorStopCount                      2

tile computed background-image       33 stops
tilePaintStopCount                   33
sample @3.13 %                       oklch(0.749813 0.150056 145.225)  ← eased
sample @3.13 % before the click      oklch(0.746875 0.150937 148.75)   ← un-eased
```

**Consequence.** The Easing section is the component's largest region — 519 px, 49.8 % of its
height, a whole curve catalogue and a bezier authoring stage. Everything authored there is
silently discarded by the panel labelled `CSS`. A user who selects the text they can see and
pastes it ships a *linear* ramp. A user who presses Copy receives a 33-stop string they have never
seen and cannot check. The instrument's own output contradicts its own preview.

**Law.** `VISUAL-CONSTITUTION §5` — "select → tune → commit… Persistent operation state stays with
the entity/workspace"; §7 Gradient — the code inspector is part of the instrument's argument, not
a second opinion.

**Cure (gestalt, not patch).** There is one gradient, so there is one serialization on screen. The
editor shows the render truth. If the compact authored form is worth keeping it becomes a
*named, visible* representation toggle inside the same well (`Compact ⇄ Expanded`, the producer's
`SegmentedTabs`), and Copy copies exactly the bytes under the caret. Delete `simpleCSS` as a
silent parallel path; a second serializer that no surface labels is a dual path (edict 2).

---

### D-2 · BLOCKER · at the canonical 390 px arm all three primary settings truncate to 3 characters

**Mechanism.** `GradientVisualizer.vue:158` — `class="grid grid-cols-3 gap-3 min-w-0"`. A fixed
3-up with no responsive step. The only responsive token in the whole band is on the tile
(`w-20 sm:w-24`, `:223`) — the element that did not need one.

**Reproduction.** 390×844, `/#/gradient`, measured:

```
gridTemplateColumns   "69.3281px 69.3359px 69.3359px"
Linear    scrollW 41 / clientW 27   truncated
OKLCh     scrollW 48 / clientW 27   truncated
Shorter   scrollW 48 / clientW 27   truncated
```

Corroborated independently by the tranche's own WebKit capture
`docs/tranches/V/megatranche/audit/visual/shots/safari-mobile-light/gradient.png`, which renders
`Lin⌄ Ok⌄ Sh⌄`.

**Law.** `VISUAL-CONSTITUTION §3.6` (mobile is one document-scrolling sequence, not a shrunken
desktop) and `§3.7` (container-scaled spacing, "no desktop-tight/mobile-airy fork and no
breakpoint pile"). 390 px is a named binding arm in `§3.2` and `PROPORTION-AUDIT §2`.

**Cure.** The band is a label/value list, not a 3-across. Below `sm` it stacks (or goes 2-up with
Hue on its own row, since Hue is a *sub-option of Space* and is meaningless in non-polar spaces);
the tile leaves the right rail and takes a full-width row under the band, where its aspect can be
owned. The trigger wraps; the value never does.

---

### D-3 · MAJOR · the render tile's aspect ratio is unowned, so a "circle" renders as a viewport-dependent ellipse

**Evidence.** `:223` — `class="gradient-render-tile row-span-2 w-20 sm:w-24 rounded-card border
border-card-edge"`. Height is emergent from `row-span-2` over `grid-cols-[minmax(0,1fr)_auto]`
rows sized by the select row and the direction row.

```
1440 × 900   96.0 × 128.5   aspect 0.747
 390 × 844   80.0 × 121.9   aspect 0.656
```

With `type=radial` (live): tile paint head `radial-gradient(oklch(0.75 0.15 145) 0%, …` — no shape
keyword, so CSS resolves `ellipse farthest-corner`. Screenshot `.playwright-mcp/radial-tile.png`.
The option that mints this state is captioned "Center-outward circle" (`:55`).

**Law.** `PROPORTION-AUDIT §5.8` — "Real rendered relation wins over token intent"; §5.9 — a
renderer specimen is a designed object. A specimen whose proportions are grid residue is not a
specimen.

**Cure.** `aspect-ratio: 1` on the tile; the tile owns its own row rather than spanning two
foreign ones. The type dropdown's promise ("circle") and the paint agree by construction.

---

### D-4 · MAJOR · Direction stays live, focusable and labelled while it controls nothing

**Evidence.** `useGradientModel.ts:55` states it outright:
`direction: number; // degrees (for linear); ignored for radial`.
`useGradientCSS.ts:151-155` emits an angle only for `linear` (and `from …deg` for `conic`).

Measured live with `type=radial`:

```
thumb aria-disabled   null
thumb data-disabled   false
thumb tabindex        "0"
thumb aria-valuenow   "90"
container opacity     "1"
visible readout       "90°"
editor                "radial-gradient(oklch(0.75 0.15 145) 0%, oklch(0.65 0.18 265) 100%)"
tile paint            "radial-gradient(oklch(0.75 0.15 145) 0%, …"        ← no angle, both
```

The slider is fully operable by pointer and keyboard, its label and value keep updating, and
nothing downstream changes.

**Law.** `VISUAL-CONSTITUTION §4.1` — "Selected, failed, pending, withdrawn and **disabled** states
are never color-only. Role, accessible name, state/value … are explicit."
`PROPORTION-AUDIT §5.5` — a control is data, status, labeled action, affordance, or removed.

**Cure.** Direction is not a permanent control with a dead branch; it is a property *of the type*.
`linear` → `Angle`; `conic` → `From`; `radial` → the row is absent and the grid closes. One
control whose identity follows the model, not a control with an undisclosed no-op.

---

### D-5 · MAJOR · "Reset" does not reset — the easing survives it

**Mechanism.** `:118-125` `resetGradient()` restores stops, type, direction, space, hue and the
verdict, but never touches `intervals`. `useGradientModel.ts:89-100` re-seeds intervals only when
`stops.value.length` *changes*; `setStopsFromColors` with two colours leaves the length at 2, so
the watcher never fires.

**Reproduction** (live): select `in-out` on the sole interval → press the Dock's **Reset** →

```
before  easingLiteral "cubic-bezier(0.42, 0, 0.58, 1)"   tileStops 33
after   easingLiteral "cubic-bezier(0.42, 0, 0.58, 1)"   tile @3.13 % = oklch(0.749813 …)  ← still eased
```

**Cure.** `resetGradient` restores the *whole* model state through one path. The reason it does not
today is that the interval array is kept in sync by a side-effect watcher on a derived quantity
(`stops.length`) instead of being derived: `intervals` should be a function of the stop list, not a
parallel array kept honest by a `watch`.

---

### D-6 · MAJOR · three `<hr>` where the binding composition says zero

**Evidence.** `:148`, `:240`, `:251`. Measured live: three `462 × 1` rules at y = 260.7, 480.7,
769.7.

`docs/tranches/V/OPTICAL-BENCH-COMPOSITIONS.md:78`, quoted verbatim:

```
| Gradient | `[]` | `none` | none | meniscus, stop seats and code/action interval carry grouping |
```

Restated in `VISUAL-CONSTITUTION §4.2`: "The binding value.js inventory in
`OPTICAL-BENCH-COMPOSITIONS.md §5` selects `[]` and `reserve="none"` for all eight P122
workbenches… every other composition retains no divider." `PROPORTION-AUDIT` PR-05 is terminal
**REMOVE**, and §5.4 is the reason: "A divider is retained only when grouping would be ambiguous
without it."

Each `<hr>` here is immediately followed by an `<h3>`. The heading already declares the boundary;
the rule restates it in ink.

---

### D-7 · MAJOR · section headings wear the palette-identity costume

**Evidence.** `:149`, `:241`, `:253` — `class="font-display text-subheading text-muted-foreground"`.
Computed on all three, live:

```
font-family   Fraunces, "Fraunces Fallback", serif
font-size     20.352px          (= --type-subheading, 1.272rem)
font-weight   600
color         rgb(112, 89, 66)  (--muted-foreground)
```

`VISUAL-CONSTITUTION §4` (the closed matrix) assigns **section heading → `text-heading`**, which
glass-ui defines (`dist/styles/typography/semantic.css`) as `font-family: var(--font-text)`
(Plus Jakarta Sans) at `--type-heading: 1.618rem` = 25.888 px. `--type-subheading` is reserved for
**palette identity**, and Fraunces for display/identity roles.

Two-axis deviation, both measured: wrong family, and one golden rung low (20.352 vs 25.888 px).
`PROPORTION-AUDIT §5.13` repeats the same matrix; there is no exception for workbench sections
(the sole exception in canon is P019's paired Picker scale).

---

### D-8 · MAJOR · control labels wear the value/code jurisdiction — uppercase Fira Code

**Evidence.** `:163`, `:180`, `:197`, `:229` — `class="section-label"`. The recipe is the producer's:

```
node_modules/@mkbabb/glass-ui/dist/styles/typography/utilities.css
  .section-label { @apply text-mono-caption; color: var(--muted-foreground); }
  text-mono-caption { font-family: var(--font-mono); font-size: var(--type-caption);
                      letter-spacing: var(--type-tracking-caps); text-transform: uppercase; }
```

Computed on all four labels, live: `"Fira Code", …, monospace` · `14.384px` · `uppercase` ·
`letter-spacing: 1.4384px`.

`VISUAL-CONSTITUTION §4`: **control or label → `text-small`, Plus Jakarta Sans, non-bold.**
`text-mono-small`/`mono-caption` is licensed for *value, code, or provenance* — "or the already
established `mono-caption` **where the content is a caption**". "Type", "Space", "Hue" and
"Direction" are none of those things.

The rendered consequence is the hierarchy inversion visible in §1.1(c): the labels are the loudest
ink in the band and the values are the quietest.

**Family** (same mechanism, one cure): `MixConfigBar.vue:98,121,145`;
`GenerateControls.vue:221,255`; `SearchFilterBar.vue:20,32,48,63`;
`AdminTagsPanel.vue:87`; `TagEditPopover.vue:8`; `MixSourceSelector.vue:183`.

---

### D-9 · MAJOR · two Copy CSS actions on one route; the pane-local one is the route's only nameless button

**Evidence.** The dock action set already owns it —
`GradientPane.vue:13` `copyCSS: () => visualizerRef.value?.copyCSS?.()` — and the component plants
a second at `:254`:

```html
<DockControl compact title="Copy CSS" @click="copyCSS">
```

Live enumeration of every visible button/`role=button` on `/#/gradient`:

```
{ aria-label: "Reset" }
{ aria-label: "Copy CSS" }                  ← dock action set
{ aria-label: "Seed from palette" }
{ aria-label: "Copy cubic-bezier(0.42, 0, 0.58, 1)" }   ← easing rail, named
{ aria-label: null, title: "Copy CSS" }     ← this component, :254
```

`REPORT.json` records `namelessButtons: 1` for `/#/gradient` in **all four** Safari matrices. The
live probe identifies it uniquely:

```
<button class="dock-icon-button glass-specular-track glass-capsule-hover dock-icon-button--compact"
        title="Copy CSS">          rect { x:658, y:792, w:28, h:28 }
```

No `aria-label`, no text — the accessible name exists only as a `title` tooltip, which is invisible
to touch and to keyboard users.

**Law.** `PROPORTION-AUDIT` PR-13 (specimen + action region both host Copy → total 2→1), PR-06
(one action owner), §5.5 (labeled action or removed), §5.6 ("do not compensate for an unnecessary
action with tooltip proliferation"); `VISUAL-CONSTITUTION §5` ("Commit uses one glass-ui action
set").

The sibling in the same subtree proves the house pattern:
`GradientEasingEditor.vue` gives its copy `:aria-label="copiedRow === row.index ? 'Copied' :
\`Copy ${row.css}\`"`.

**Cure.** Delete `:254-256`. The Dock action set is the action region for this instrument, and it
already carries a named Copy.

---

### D-10 · MAJOR · Copy has no confirmation and no failure state; the design system already ships one

**Evidence.**

```
GradientVisualizer.vue:127-129
  async function copyCSS() { await writeClipboard(coalescedCSS.value); }
```

No `try`, no status, no tick, no announcement. A rejected clipboard write (permission, insecure
context, Safari user-gesture loss across the `await`) is indistinguishable from success.

Twelve files away, in the same component tree, the producer's confirmed variant is already in use:

```
GradientEasingEditor.vue:96-104
  const { status: copyStatus, copy } = useClipboard({ resetMs: 1400 });
  … <Check v-if="copiedRow === row.index" …/> <Copy v-else …/>
```

**Law.** `VISUAL-CONSTITUTION §4.1` (state is never implicit), `§5` ("A transient flourish may
celebrate success but never carries the only truth" — here there is no truth at all);
`PROPORTION-AUDIT` PR-08 ADD-AFFORDANCE. Owner edict 4 — glass-ui is the design system; this is a
hand-roll past a primitive that exists.

---

### D-11 · MAJOR · protagonist inversion — the meniscus is 3.8 % of the component, the easing inspector 49.8 %

**Evidence.** The measurement table in §1.1(a). Preview area 30,818 px² of 481,455 px² = **6.40 %**
at 1440; **9.71 %** at 390.

`OPTICAL-BENCH-COMPOSITIONS.md:44` is the binding row:

```
| **Gradient** | P122 `golden`: meniscus/preview 61.8033989%; stop/easing/code inspector 38.1966011%. | …
```

Measured proportion is the inverse of the ratified one. `PROPORTION-AUDIT` PR-09 ("Gradient/Easing
protagonist subordinated → **ENLARGE**… One 19–22 rem protagonist; support subordinate") sets the
floor at 19 rem = 304 px; the rail is 40 px, **13 % of the floor**.
`VISUAL-CONSTITUTION §3.8` — "One pane may have one full-strength visual protagonist."

**Cure.** The preview is the stage, not a strip: rail + render become one preview region that
holds the golden share, and the easing catalogue collapses into a disclosure inside the inspector
rather than occupying half the instrument at rest.

---

### D-12 · MAJOR · the housing contract is unmet — `InstrumentChassis` has zero consumers

**Evidence.**

```
$ grep -rn "InstrumentChassis" demo/ | grep -v node_modules
(no output)

$ ls node_modules/@mkbabb/glass-ui/dist/ | grep -i chassis
instrument-chassis.d.ts
instrument-chassis.js
```

The producer ships the primitive. The consumer housed the instrument in a generic Card instead:
`GradientPane.vue:20` `<Card tier="resting" class="pane-scroll-fade w-full overflow-y-auto …">`.

`VISUAL-CONSTITUTION §3.1`, Gradient row: *Outer housing* = **`InstrumentChassis`; no nested stage
Card.** §4.2: "`InstrumentChassis` region presence and divider presence are independent. P122
accepts a unique typed boundary set drawn from `{stage-inspector, inspector-action}`."

That typed boundary set is exactly the mechanism the three hand-rolled `<hr>`s (D-6) stand in for,
and the golden split is exactly the proportion D-11 is missing. D-6, D-11 and D-12 are one
disease: **the component composes a chassis by hand out of `<hr>` and `flex-col gap-5` instead of
consuming the one the design system provides.** Owner edict 4, and edict 3 (contrivance).

---

### D-13 · MINOR · a support fixture carries the protagonist's shadow

`:278` `.gradient-render-tile { box-shadow: var(--shadow-sm); }` and
`GradientStopEditor.vue:325` `.gradient-rail { box-shadow: var(--shadow-sm); }`. Computed live,
byte-identical on both:

```
box-shadow  color(srgb 0.11 0.098 0.09 / 0.06) 0px 2px 8px 0px
```

`VISUAL-CONSTITUTION §3.8` — "Supporting fixtures do not compete with it through equal size or
**equal shadow**." `PROPORTION-AUDIT` PR-05 (caster shadows repeat a boundary → REMOVE).

---

### D-14 · MINOR · in the default state the tile is a redundant second specimen

At `type=linear, direction=90` the rail paints a 90° ramp and the tile paints the same 90° ramp.
Visible in `shots/safari-desktop-light/gradient.png` and `shots/safari-mobile-light/gradient.png`
as two green→blue left-to-right washes. `PROPORTION-AUDIT §5.1-5.2` — one bounded specimen per
housing; additional equal-weight zones require a different composition.

The tile's stated justification (`:150-156`: "the honest surface for what Type + Direction DO")
holds only for the states in which its geometry is dishonest (D-3). Fixing D-3 makes D-14 the
remaining question: whether the shipped default should show the same picture twice.

---

### D-15 · MINOR · forced-colors is unhandled here **and** the tranche's forced-colors capture is void

**(a) The capture is void.** `shots/forced-colors-desktop/gradient.png` is visually
indistinguishable from `shots/safari-desktop-light/gradient.png` — full colour, glass, shadows.
`STATES.json` records `"engine": "webkit"` for that row and `states.mjs:24` passes
`forcedColors: "active"`, which WebKit does not honour. The forced-colors arm for this route
**has never actually been observed**.

**(b) The source is asymmetric.** `.gradient-render-tile` (`:271-278`) has no
`@media (forced-colors: active)` arm; its declared twin — the rail's paint stack, which the
comment at `:267-270` says shares "the rail's material contract, same shape" — does:
`GradientStopEditor.vue:350-359`. The tile's entire content is a `background-image` and its
edge/lift are `--card-edge` + `--shadow-sm`, both of which forced-colors overrides or strips.

**(c) RTL isolation.** `GradientCodeEditor.vue:86-101` renders a `contenteditable` CSS literal
with no `dir="ltr"` and no `unicode-bidi: isolate`. `VISUAL-CONSTITUTION §6.1`: "CSS strings, hex,
slugs, IDs and provenance render in **LTR-isolated spans** inside RTL prose." The hazard is live on
this pane — `shots/rtl-desktop/gradient.png` shows the pane description's trailing period jump to
the head of the line (`.Build gradients with per-interval easing and CSS output`).

**Status.** (a) and (b) and (c) are facts. The *rendered* forced-colors outcome is a
**HYPOTHESIS** until a Chromium `forcedColors: active` run is added to `states.mjs`; the WebKit row
cannot settle it.

---

### D-16 · MINOR · `defineModel("selectedStopId")` is a public two-way API with no consumer

`:51` declares `const selectedStopId = defineModel<string | null>("selectedStopId", { default: null })`.
Its sole parent renders it unbound: `GradientPane.vue:25` `<GradientVisualizer ref="visualizerRef" />`.
A local `ref` wearing a public prop/emit costume — owner edict 3 (KISS, no contrivance) — and it
obliges every future parent to learn a stop-identity vocabulary it has no use for.

Compounding: `resetGradient()` (`:118`) mints fresh stop ids through `setStopsFromColors` but never
clears `selectedStopId`, so after a Reset the model holds an id that no stop owns.

(This ID matches `G4d` in `audit/probes/wb-gradient-stopeditor/gate-structure.mjs:79`; it is
recorded here because the *design* consequence — a fictitious public surface — is this seat's.)

---

### D-17 · MINOR · silent no-op paths and a masking optional-chain

```
GradientVisualizer.vue:110-116
  function seedFromPalette() {
      if (!pm) return;
      const colors = pm.savedPalettes.value[0]?.colors.map((c) => c.css);
      if (colors && colors.length >= 2) { setStopsFromColors(colors); }
  }
```

The shipped default state of this route is "No saved palettes yet." (visible in all four Safari
captures). Pressing the Dock's **Seed from palette** in that state does nothing and says nothing —
no toast, no status, no disabled state on the action. `PROPORTION-AUDIT` PR-08.

```
GradientPane.vue:12-14
  reset: () => visualizerRef.value?.resetGradient?.(),
```

The trailing `?.` guards a method `defineExpose` statically guarantees. A masking fallback —
owner edict 2.

---

### D-18 · INFO · four sibling `h3`s and no `h1`

`PaneHeader.vue:21` renders the instrument identity as `<h3 class="pane-header-title font-display">`.
GradientVisualizer adds three more `h3`s (`:149`, `:241`, `:253`) at the same level, so
"Interpolation" / "Easing" / "CSS" are *siblings* of "Gradient" rather than its children.
`REPORT.json` records `counts.h1: 0` on `/#/gradient` in all four matrices, against
`VISUAL-CONSTITUTION §4.1` ("Each route has one H1"). The route-level `h1` is the shell's; the flat
sibling outline is this component's choice of level.

---

### D-19 · INFO · the nested easing catalogue is a 1482 px scroller inside a 462 px column

Measured live: `.strip-row` natural width **1482.1 px** inside `.fading-scroll--x.specimen-strip`
whose `clientWidth` is **436 px** — 29 % visible, inside the Card's `overflow-x-hidden`. It is
reported as `bleeding` / `clipped` on **every one of the ten** gradient captures in `REPORT.json`
and `STATES.json`. Owned by `wb-gradient-easingeditor`; recorded here because GradientVisualizer is
the composer that seats a 3.4×-oversize horizontal scroller as its largest region (D-11).

---

## 5. Mechanism families

| Family | Members | One cure |
|---|---|---|
| **Two truths for one artifact** | D-1, D-5, D-14 | one model → one serialization → one surface; derive, never mirror |
| **Hand-rolled chassis** | D-6, D-11, D-12, D-13 | consume glass-ui `InstrumentChassis` with `boundaries=[]`, `golden` split |
| **Type jurisdiction drift** | D-7, D-8, D-18 | apply `VISUAL-CONSTITUTION §4` verbatim; `section-label` is not a control-label recipe |
| **States never designed** | D-4, D-10, D-17, D-15 | every branch that can no-op gets an explicit disabled/absent/failed rendering |
| **Duplicate action owners** | D-9, D-10 | the Dock action set is the sole action region |
| **Desktop composition transplanted to mobile** | D-2, D-3 | the band stacks; the specimen owns its aspect |

---

## 6. What is genuinely sound

Recorded so the ledger is not one-sided:

- **The parse-failure state is well designed** — `parseVerdict` drives a destructive border plus a
  `role="status"` Fira verdict, the user's text is never rewritten under the caret, and the apply
  is atomic (`GradientCodeEditor.vue:34-40`, `useGradientModel.ts:151-168`). This is the model the
  copy/seed states should follow.
- **`verbatimModuleSyntax` is clean** — every type-only import at `:22, :25, :26, :28` is
  `import type`; edict 8 satisfied.
- **Reduced motion is honoured** and no property that forces layout is animated (§3).
- **200 % zoom reflows correctly** — `STATES.json` `zoom-200-desktop /#/gradient`: `overflowX: 0`,
  single-pane, selects legible (`shots/zoom-200-desktop/gradient.png`).
- **Dark mode is structurally identical** to light; no scheme-specific defect found.
- **The tile is correctly non-interactive** — `role="img"` with a real `aria-label` (`:221-222`),
  not an unlabelled button (`PROPORTION-AUDIT §5.9`).
- **Zero page errors, zero console errors, zero horizontal overflow** on `/#/gradient` across all
  four Safari matrices (`REPORT.json`).

---

## 7. Reproduction index

| ID | Command / action | Result |
|---|---|---|
| D-1 | `/#/gradient` → click `css → in-out` tile → read editor text vs tile `background-image` | 2 stops un-eased vs 33 stops eased |
| D-2 | viewport 390×844 → measure `SelectValue` scroll/client widths | 41/27, 48/27, 48/27 |
| D-3 | measure tile rect at 1440 and 390 | 0.747 vs 0.656 aspect |
| D-4 | set `type=radial` → inspect the direction thumb | `tabindex="0"`, `aria-disabled` null, output has no angle |
| D-5 | set easing `in-out` → Dock **Reset** → read `.readout-rail code` | still `cubic-bezier(0.42, 0, 0.58, 1)` |
| D-6 | `document.querySelectorAll('hr')` within the component root | 3 |
| D-7 | `getComputedStyle(h3)` | Fraunces / 20.352 px |
| D-8 | `getComputedStyle('.section-label')` | Fira Code / uppercase / 14.384 px |
| D-9 | enumerate visible buttons on the route | two "Copy CSS", one nameless |
| D-11 | measure root + rail + tile rects | 6.40 % preview share |
| D-12 | `grep -rn InstrumentChassis demo/` | 0 hits |
| D-15 | diff `forced-colors-desktop/gradient.png` against `safari-desktop-light/gradient.png` | indistinguishable → capture void |

Artifacts produced by this seat (read-only browser session):
`/Users/mkbabb/Programming/value.js/.playwright-mcp/radial-tile.png`,
`/Users/mkbabb/Programming/value.js/.playwright-mcp/mobile390-band.png`.

No source file was modified by this seat.
