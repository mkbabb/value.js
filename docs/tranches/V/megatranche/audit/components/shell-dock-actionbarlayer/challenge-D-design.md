# CHALLENGE-D — `demo/shell/dock/layers/ActionBarLayer.vue`

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`, 1M-context variant) — the tier this seat
was explicitly spawned with. Seat declared, not inherited.

Repository `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`.
Subject: `demo/shell/dock/layers/ActionBarLayer.vue`, 158 lines, area `demo/shell`.
All browser probes ran read-only against the live dev server at `http://localhost:9000`
(WebKit/Safari engine via Playwright). **No source file was edited by this seat.**

---

## 0. Verdict

**DEFECTIVE.** The premise holds and holds hard.

The component's central mechanism — the local `useLayerTransition` shim at lines 53–94 — is not
merely a shim standing in for a retired producer composable. It is a **dead transition**: it
schedules a 260 ms window to protect a crossfade that Glass 7.0.0 does not run, applies
GlassDock's **private** shell-pane CSS classes to arbitrary consumer components, and hangs those
classes off a container class (`.dock-layer-grid`) that **is defined nowhere in this repository or
in `@mkbabb/glass-ui`**. Meanwhile the public successor it says does not exist —
`<DockCrossfade>` — is exported from the *same module specifier this file already imports from on
line 8*, and its published doc-comment names this component's exact case.

The consequences are measurable, not stylistic: the toggle the user clicks jumps **70.4 px** out
from under the pointer; keyboard focus is dropped to `document.body` on every mode swap; the
outgoing layer's tooltip is stranded fully opaque on top of the incoming layer's tooltip; and on
mobile the component **never renders at all**, so the Picker's entire action region is
desktop-only.

Nine states this component can enter were never designed. Two of the four constitutional
authorities it is judged against are violated by construction.

---

## 1. Coverage note — this component is unphotographed

`docs/tranches/V/megatranche/audit/visual/REPORT.md` reports 60 Safari captures (4 matrices × 15
routes) and `states.mjs` adds 6 state matrices × 5 routes. **None of them contain this
component.** Every capture is at-rest, and `ActionBarLayer` renders only when
`Dock.vue:113` sets `activeLayer = "action-bar"`, which requires a click on the Tools trigger
(`Dock.vue:182–190`). The clean rows for `/#/` in REPORT.md (0 page errors, 0 horizontal
overflow, 0 blanks) therefore say **nothing** about this component.

Every frame in this report was captured by this seat. Files, all in this directory:

| File | What it shows |
|---|---|
| `shot-desktop-{light,dark}-1-main.png` | dock at rest — the component is absent |
| `shot-desktop-{light,dark}-2-actions.png` | the layer in `actions` mode |
| `shot-desktop-{light,dark}-3-input.png` | the layer in `input` mode — note the pill width change |
| `shot-mobile-light-1-main.png` | mobile dock at `/#/` — **no Tools trigger exists** |
| `shot-mobile-light-2-actions.png` | mobile after a forced programmatic toggle — nothing opens |
| `D-02-stranded-popover-after-swap.png` | **the money frame**: two mutually illegible popovers stacked after one mode swap |

---

## 2. The named dual-path suspect, adjudicated

The file's own header (lines 53–61) states the premise:

> `V-W44 (Glass 7): glass-ui removed the standalone useLayerTransition composable — the layer
> size-morph + crossfade folded INTO the DockCrossfade component, which internalizes the
> class/inert packaging this template hand-binds and offers no public composable successor.`

**Judgment: the shim is DIVERGENT, not honest, and its stated justification is materially false.**

The claim "no public *composable* successor" is literally true and rhetorically empty. The
successor is a **component**, it is public, and it is exported from the exact module specifier
this file already imports `DockControl` and `DockSeparator` from on line 8:

```
node_modules/@mkbabb/glass-ui/dist/components/dock/index.d.ts:5
    export { default as DockCrossfade } from "./DockCrossfade.vue";
```

Its published doc-comment (`DockCrossfade.vue.d.ts`) names this component's case verbatim:

> "The **controlled-no-rail** … case (a consumer) consumes this **DIRECTLY**: a no-selection
> face-swap does NOT route through a selection engine."

`ActionBarLayer` is a controlled, no-rail, two-face swap. That is the sentence's referent.

The shim also fails on three axes the producer explicitly owns and the shim silently drops:

| DockCrossfade guarantee (from `DockCrossfade.vue.d.ts`) | Local shim |
|---|---|
| swap driven by `useDockSpring` — velocity-continuous, interruptible | fixed `setTimeout(260)` (line 76) |
| box reserved to the **peak face** as a running-max `min-block-size` / `min-inline-size` | none — see **D-6**, a measured 140.8 px pill jolt |
| "A dissolving focus-holding face **transfers focus** to its successor … un-inert-before-focus is load-bearing" | applies `inert` with no transfer — see **D-8**, focus lands on `<body>` |

And the shim self-documents as legacy in the sense edict 2 forbids:

```
ActionBarLayer.vue:67
    void opts.containerEl; // signature parity with the retired producer composable
```

A parameter accepted, discarded, and justified by fidelity to an API that no longer exists is a
back-compat shim by definition.

### Exact retirement condition (asked for by the brief)

CARRY-LEDGER §F conditions retirement on "if glass ships a successor". **That condition is already
met at the pinned version.** The retirement condition is therefore not a future event:

> **RETIRE NOW, at `@mkbabb/glass-ui@7.0.0` — no producer change, no relay reply, and no W47
> gate is required.** Replace lines 53–94 and the `subLayerProps` binder (lines 88–94) with
> `<DockCrossfade :active="activeSubLayer" reserve="inline">` wrapping two `<DockLayer id="actions">`
> / `<DockLayer id="input">` faces, all four symbols already public on `@mkbabb/glass-ui/dock`.
> The relay-O-6 mark **M2** ("public content-swap composable") should be **WITHDRAWN**, not
> awaited: it asks the producer to re-ship, as a composable, a capability it already ships as a
> component, which would manufacture the second API surface edicts 3 and 4 forbid.

---

## 3. Defects

Severity: **BLOCKER** = ships broken behaviour or violates a binding constitutional law ·
**MAJOR** = designed-wrong, user-visible · **MINOR** = design-law violation without a current
user-visible symptom · **INFO** = record.

### Family A — the shim is a dead transition bound to producer-private CSS

#### D-1 · BLOCKER — the 260 ms crossfade window animates nothing

`SUB_LAYER_CROSSFADE_MS = 260` (line 62) exists to hold `leavingLayer` "for the crossfade window"
(line 60). In Glass 7 there is no crossfade on these elements.

`layers.css` gives `.dock-layer` exactly one transition — `visibility` — and animates opacity only
under `.glass-dock[data-morphing]`, i.e. during a **dock collapse/expand**, never during a
content swap. Measured on the live page:

```
t=0   ACT  op=1 vis=visible inert=0 rect=634,21 184x40
t=0   off  op=0 vis=hidden  inert=1 rect=569,18 302x46
t=40  LEAV op=0 vis=visible inert=1 rect=516,18 408x46
t=130 LEAV op=0 vis=visible inert=1 rect=516,18 408x46
t=280 off  op=0 vis=visible inert=1 rect=516,18 408x46
```

and the computed transition on the live nodes:

```
active   → transition: "visibility"
inactive → transition: "visibility 0s linear 0.3s"
```

The leaving layer is already at `opacity: 0` by the first sample after the swap. No intermediate
opacity is ever observed. The 260 ms is a phantom guarding a snap.

*Cure:* delete the shim; `<DockCrossfade>` owns the real overlap on the `--dock-t` scalar.

---

#### D-2 · BLOCKER — the component styles itself from GlassDock's private internals

Line 91 hand-writes `class: ["dock-layer", { "is-active": …, "is-leaving": … }]` onto
`<ActionToolbar>` and `<ColorInput>`.

In Glass 7 `.dock-layer` is **not** the face class. The public face component `<DockLayer>` emits
`.dock-face` (`crossfade.css`, and the compiled template). `.dock-layer` is emitted by exactly two
nodes, both **inside GlassDock's own shell**, for the expanded-vs-collapsed plate morph:

```
$ python3 -c "…scan dist/dock.js for /dock-layer(?![-a-z])/…"
'class: L(["dock-layer dock-layer--full",    { "is-active": …'
'class: L(["dock-layer dock-layer--summary", { "is-active": …'
```

Because every `.dock-layer` rule is scoped `:where(.glass-dock, .dock-layer-group) .dock-layer`,
the consumer's counterfeit faces match the dock's private plate rules. Two of those rules are
actively hostile when a sub-layer swap coincides with a dock morph:

```css
/* layers.css */
.glass-dock[data-morphing] .dock-layer.is-leaving { opacity: calc(1 - var(--dock-morph-t)); }
.glass-dock[data-morphing] .dock-layer.is-active > * {
    opacity: var(--child-reveal);
    scale: calc(0.82 + 0.18 * var(--child-reveal));
}
```

The first drives the *sub*-layer's opacity from the *dock's* collapse scalar. The second applies a
second, nested stagger-reveal to the five `ActionButton`s inside a counterfeit `.dock-layer.is-active`
that already sits inside the real `.dock-layer--full` receiving the same treatment.
*(Compound-morph symptom: HYPOTHESIS — the rules and the class match are both confirmed above;
I did not reproduce a simultaneous swap-during-morph frame.)*

This is a direct edict-4/edict-5 violation and a silent breakage contract: the classes are
vestigial in the producer and will vanish in the next major with no deprecation signal, because
no public API ever promised them to a consumer.

---

#### D-3 · MAJOR — `.dock-layer-grid` does not exist; the overlap resolves against the wrong box

```
$ grep -rn "dock-layer-grid" demo/ src/ node_modules/@mkbabb/
demo/shell/dock/layers/ActionBarLayer.vue:101:  <div ref="subLayerGridEl" class="dock-layer-grid flex-1">
```

One hit — the use site. Zero definitions. Measured on the live node:

```
gridComputed: { display: "block", position: "static", gridTemplateColumns: "none", flexGrow: "1" }
```

Consequences, all measured:

1. The `grid-area: 1 / 1` both children inherit from `.dock-layer` is **inert** — a block parent
   has no grid areas. The name promises a mechanism that is not running.
2. The overlap comes solely from `.dock-layer:not(.is-active) { position: absolute; inset: 0 }`.
   With no positioned ancestor at the grid, that resolves against the **whole dock face**:
   `inactiveOffsetParent: "dock-face is-active"`.
3. So the inactive/leaving sub-layer's box is `516,18 408×46` where its nominal box is
   `634,21 184×40` — **65 px further left, 118 px wider, 3 px proud top and bottom** — spanning
   across the Back control, the separator, and the mode toggle.

Today this is invisible only because D-1 already snapped it to `opacity: 0`. Fix D-1 without
fixing D-3 and a full-opacity 408 px slab crossfades over the dock's own furniture.

---

#### D-4 · MAJOR — the JS duration and the producer token disagree, across a boundary

`SUB_LAYER_CROSSFADE_MS = 260` (line 62) is a raw literal. The producer's visibility hand-off runs
on `--duration-normal`, measured live at **`0.3s` = 300 ms**. The shim releases `is-leaving` 40 ms
*before* the producer's visibility delay elapses — visible in the t=280 sample above, where the
element has already dropped `is-leaving` yet is still `visibility: visible`.

This also violates edict 6 in spirit and the sibling precedent in fact: `ActionBarToggle.vue:121–124`
tokenizes the same beat as `var(--duration-normal) var(--ease-standard)`. A magic number in a TS
const that must stay in lockstep with a CSS token in a *different package* is a coupling with no
enforcement.

---

#### D-5 · MAJOR — the shim is a self-declared legacy shim (edict 2)

Line 67, `void opts.containerEl; // signature parity with the retired producer composable`, plus
the header's own words "This local **shim**" and "preserves the exact two-refs contract".
The owner edict is unconditional: *no aliases, migration shims, dual paths, masking fallbacks,
back-compat.* Compounding it, the factory is defined **inside** `<script setup>` and instantiated
exactly once (line 85) — a closure-over-nothing that could be three plain refs even if the shim
were legitimate. Contrivance, edict 3.

---

### Family B — no peak reserve: the control moves out from under the pointer

#### D-6 · BLOCKER — clicking the toggle displaces the toggle by 70.4 px

Measured at 1440×900, pointer parked off-dock between samples so no hover state pollutes the box:

```json
"selfDisplacement": {
  "toggleCentreBefore": 851,  "toggleCentreAfter": 921.4,  "dx": 70.4,
  "stillUnderPointer": false,
  "pillWidthBefore": 326,     "pillWidthAfter": 466.8,
  "pillHeightBefore": 62,     "pillHeightAfter": 62
}
```

`actions` mode reserves 184 px of sub-layer; `input` mode needs 324.8 px. With no reserve, the
`fit-content` dock re-measures and the pill grows **140.8 px**, symmetrically — so every control in
the bar translates, and the toggle the user just pressed lands 70.4 px to the right, entirely
outside its own 40 px box.

The interaction is a **cycle** (`cycleToolbarMode`, lines 33–45): actions → input → propose →
actions. The design asks the user to press the same control repeatedly and then moves it away
after the first press. Confirmed visually: `shot-desktop-light-2-actions.png` vs
`shot-desktop-light-3-input.png`.

This is precisely the failure `<DockCrossfade>`'s "reserved box … sized to the peak face as a
MEASURE-ONCE running max" exists to prevent, and `reserve="inline"` is the documented axis for
"a horizontal control run".

*Negative recorded honestly:* the pill **height** is stable at 62 px in both modes, so
VISUAL-CONSTITUTION §3.4 ("Expanded/collapsed/mounted states do not move the scene below it") is
**not** breached. The jolt is inline-axis only.

---

### Family C — states that were never designed

#### D-7 · BLOCKER — there is no mobile composition; the whole component is desktop-only

Measured at iPhone 14 / 390 px, `/#/`, 2.8 s after `networkidle`:

```json
"mobile": {
  "present": true, "rect": {"x":151.4,"y":32.2,"w":33.3,"h":33.3}, "viewport": 390,
  "tabindex": "-1", "pointerEvents": "auto", "visibility": "visible", "opacity": "1",
  "hitTestTop": "div.segmented-indicator.segmented-indicator--js",
  "hitChain": ["div.segmented-indicator…","div.segmented-tabs…","div.pane-segmented-control…",
               "div.dock-mobile-panes","div.dock-face-content","div.dock-face.is-active"],
  "btnContainsTop": false,
  "slotClass": "action-bar-toggle-slot",          /* no is-visible, no is-live, no is-settled */
  "slotRect": {"x":147.4,"w":0}
},
"mobileForced": { "opened": false }               /* even a programmatic .click() opens nothing */
```

`shot-mobile-light-1-main.png` confirms it: the mobile dock at `/#/` is
**Home ▾ | [ Picker · About ] | ⋮** — no Tools trigger, because the slot is 0 fr wide.

**Root cause, exact:**

```
demo/color-picker/App.vue:38   :action-bar="colorPickerRef?.actionBarContext ?? null"
demo/color-picker/App.vue:325  colorPickerRef.value = left === "color-picker" ? el : null;   // onDesktopLeftMount
```

`colorPickerRef` is assigned **only** by the desktop-left slot's `:on-mount`. The mobile
`<PaneSlot>` (App.vue:83–90) has no `:on-mount` binding, so below `lg` the ref is permanently
`null` ⇒ `:action-bar` is permanently `null` ⇒ `hasAnyActionBar` is `false` (Dock.vue:41) ⇒
`<ActionBarLayer>` (Dock.vue:156) never renders on any mobile viewport.

Reset, Copy, Random, Palettes, Extract, CSS-color entry and Propose-name are therefore
**desktop-only affordances**. The mobile overflow menu is not a substitute — it carries slug/share/
theme items only (`MobileMenuDropdown.vue:52–101`: Copy **slug**, slug edit, logout, regenerate
slug, share link, dark toggle). There is no color Copy anywhere on mobile.

Constitutional violations:
- `VISUAL-CONSTITUTION.md §3.6` — "Mobile uses one document-scrolling **stage→inspector→action**
  sequence beneath the same top dock." The action term is empty.
- `VISUAL-CONSTITUTION.md §7 · Picker` — "Copy lives **once in the action region**." On mobile it
  lives zero times.
- `PROPORTION-AUDIT.md` **PR-13** — "Specimen listener/tooltip/label 1→0; **action Copy 1→1**;
  total 2→1." Mobile cannot satisfy a 1→1 target with no action region.

Secondary defect in the same measurement: the trigger is `33.3 × 33.3` — below the 44 px pointer
floor — and its box overlaps the segmented control while `pointer-events: auto`, inside a slot
clipped to 0 width. It is invisible, unhittable, and still participating in layout and hit-testing.

---

#### D-8 · MAJOR — every mode swap drops keyboard focus to `<body>`

Reproduction (Tab or click to focus a toolbar action, then toggle the mode):

```json
{ "focusBefore": "Copy color",
  "focusImmediate": "Copy color",
  "focusSettled": "BODY" }
```

Line 92 sets `inert: isActive ? undefined : true` on the outgoing layer with **no focus transfer**.
The browser evicts focus from the inert subtree to the document body; the keyboard user's position
is destroyed and the next Tab restarts from the top of the document.

`DockCrossfade` handles exactly this and says so: *"A dissolving focus-holding face transfers focus
to its successor, else the body (un-inert-before-focus is load-bearing)."* The shim reimplemented
the `inert` half and dropped the focus half.

Violates `VISUAL-CONSTITUTION.md §5.1` (focus is a first-class settlement target for every state
change) and `§4.1` ("Focus remains visibly distinct from selection in both schemes").

*Negative recorded:* the **closed** action-bar face is correctly inert — the producer applies it
(`faceInert: true`, `anyInertAncestor: true`). There is no tab-order leak from a hidden dock layer.
That part is sound and is glass-ui's doing, not this file's.

---

#### D-9 · MAJOR — the outgoing layer's popover is stranded open, on top of the incoming one

Reproduction: hover an action button until its popover opens (300 ms delay), then toggle the mode
without moving the pointer.

```json
"strandedPopover": [ { "w": 288, "h": 119, "op": "1" } ],
"originButton":    { "inertAncestor": true, "layerOpacity": "0", "layerVis": "visible" }
```

A 288 × 119 fully-opaque tooltip describing a button that is now inert, invisible and gone.
`D-02-stranded-popover-after-swap.png` shows the result: because the pointer has not moved, the
**incoming** `ColorInput` opens *its* popover under the same point, and the two slabs interleave
into unreadable text — "Copy color a color" / "Click to copy the current color to the clipboard"
laid over "…ring is accepted" and the `lab(92% 88.8 20 / 82.7%)` echo.

The component already holds the handle needed to prevent this and never turns it:
`actionToolbarRef` (line 29) is declared and never read; `ActionToolbar.vue:87–91` exposes
`clearHover()` for precisely this teardown and **no caller exists** (`grep -rn "clearHover" demo/`
→ definition and `defineExpose` only). Two halves of one contract, wired to nothing.

This also breaks the standing register law recorded at `SlugEditLayer.vue:88–90` and
`Dock.vue:140–142` — "the UA tooltip slab is a foreign register on the liquid-glass dock" — the
whole point of which was to stop opaque explanatory slabs from covering the dock.

*Negative recorded:* I hypothesised that the un-fired `onHoverOpenChange(false)` would leak
`dock.keepOpen()` (`ActionButton.vue:81–88`) and pin the dock open forever. **Refuted.** After
7 s idle with the pointer parked off-dock the popover count returned to 0, so `release()` did fire;
the dock's continued `expanded` state is explained by `shouldKeepOpen` (`Dock.vue:86`) while the
action-bar layer is open — correct by design. No hold leak.

---

#### D-10 · MAJOR — the mode is sticky across close and reopen

```json
{ "s1_openedAs":   "Open color input",      /* opened in `actions` mode        */
  "s1_afterToggle":"Propose color name",    /* now in `input` mode             */
  "s1_afterBack":  "Propose color name",    /* Back pressed — layer closed     */
  "s1_onReopen":   "Propose color name",    /* reopened — STILL in input mode  */
  "s1_verdict":    "STICKY — reopens in the prior mode" }
```

`toolbarMode` (line 30) is never reset. Nothing watches `actionBarLayerActive`. A control labelled
**Tools** and iconed with a paintbrush (`Dock.vue:186–187`) therefore reopens showing a text field.
The entry affordance and the entered state disagree, permanently, after one use.

Violates `VISUAL-CONSTITUTION.md §5` — the grammar is *select → tune → commit*; an instrument that
silently retains a sub-mode across a full dismissal is neither.

---

#### D-11 · MINOR (HYPOTHESIS) — `propose` mode is never reconciled when it becomes illegal

`canProposeName` is a live computed that flips to `false` as soon as the current color acquires a
custom name:

```
demo/color-session/useColorNameResolution.ts:66-70
    const canProposeName = computed(() => !findCustomName(currentXYZString.value));
```

`cycleToolbarMode` reads it only at the moment of the transition (line 37). Nothing watches it
afterwards. If it flips false while `toolbarMode === "propose"`, the layer stays in propose mode,
`ColorInput` keeps `propose-mode` true with a live submit button, and the toggle announces
"Close propose" for a proposal the pipeline has already ruled out.

**Reproduction: NONE — labelled a hypothesis.** Reaching it requires a color that resolves to an
approved custom name while propose mode is open; I did not construct that fixture. The mechanism
(a stateful mode with no reconciliation watcher on its own precondition) is confirmed by reading.

---

#### D-12 · MINOR — the shim has no `prefers-reduced-motion` branch

`setTimeout(…, 260)` (line 76) is unconditional. The house guard shortens transitions to 0.01 ms
under PRM (recorded at `ActionBarToggle.vue:29–30`) but cannot touch a JS timer, so under PRM the
leaving layer holds `is-leaving` — and `visibility: visible` — for the full 260 ms after everything
it was covering has already settled. `VISUAL-CONSTITUTION.md §6`: "Reduced motion resolves
**directly** to the final geometry and stable chromatic state."

Under `<DockCrossfade>` this disappears: the swap rides `useDockSpring`, which the producer already
degrades.

---

#### Unhandled-state register (the full enumeration the brief asked for)

| State | Handled? | Note |
|---|---|---|
| empty (no `actionBar` context) | n/a | `v-if` in the parent (`Dock.vue:156`) — correct |
| loading | **NO** | `ColorInput` submit and `propose` have in-flight states; the layer reserves nothing for them |
| populated / actions | yes | |
| populated / input | yes | |
| populated / propose | partial | D-11 |
| error | **NO** | `ColorInput`'s `.error-badge` (`ColorInput.vue:87`) grows the layer inside a box with no reserve → re-triggers D-6 |
| disabled | partial | `isEditing` disables Palettes/Extract only; no disabled state for the mode toggle itself |
| focused | **NO** | D-8 — focus is destroyed on every swap |
| hovered | **BROKEN** | D-9 — stranded popover |
| active / pressed | inherited | from `DockControl` |
| selected | n/a | |
| dragging | n/a | |
| overflowing / truncated | **NO** | the layer is `min-w-0` inside a `fit-content` dock; no truncation or scroll rule for a long `lab(...)` value — the box simply grows the pill (D-6) |
| RTL | untested by this seat | logical properties are used throughout; no mirrored-icon concern |
| reduced-motion | **NO** | D-12 |
| forced-colors | **NO** | `--toggle-hover-color` and `stroke-foreground` are both overridden by forced-colors; no `forced-color-adjust` or system-color fallback (D-14) |
| 200 % zoom | **NO** | reserve-free inline growth (D-6) at half the effective viewport; the state matrix never opened this layer |
| **mobile (any state)** | **ABSENT** | D-7 |

---

### Family D — design-system boundary and styling law

#### D-13 · MAJOR — a second, shadowing `COLOR_MODEL_KEY` provider

```
demo/color-picker/App.vue:257            provide(COLOR_MODEL_KEY, pipeline);   // the ONE pipeline
demo/shell/dock/layers/ActionBarLayer.vue:21-22
    // Re-provide COLOR_MODEL_KEY so ColorInput works unchanged
    provide(COLOR_MODEL_KEY, actionBar.colorModel);
```

The app root already provides the single pipeline — `ColorPicker.vue:172`, `ColorInput.vue:155`,
`ParseEchoReadout.vue:31`, `ComponentSliders.vue:115`, `SpectrumCanvas.vue:50`, `HeroBlob.vue:56`
and `ConsoleRail.vue:115` all inject it, and `AboutPane.vue:9` records it as "ambient since S.W2".
`ActionBarLayer` shadows it for its subtree with a **prop-sourced** copy, and the comment states
the reason outright: *"so ColorInput works unchanged."*

That is the exact shape edict 2 forbids — a compat path so the consumer need not be migrated at the
root — and it means the dock's `ColorInput` and `ParseEchoReadout` read the model through a
different injection edge than every other consumer in the app. One key, two providers, two truths.

---

#### D-14 · MINOR — per-instance inline styling where the root owns the ink (edict 5)

```
ActionBarLayer.vue:138-139
    class="toggle-btn w-6 h-6 stroke-foreground"
    :style="{ '--toggle-hover-color': safeAccent }"
```
```
ActionBarLayer.vue:149-151 (scoped)
    .toggle-btn:hover { stroke: var(--toggle-hover-color); }
```

Measured on the live element:

```json
{ "toggleHoverColor": "oklch(47.09…% 0.188… 9.83…deg)",
  "stroke": "rgb(28, 25, 23)",
  "inlineStyleAttr": "--toggle-hover-color: oklch(47.09…% 0.188… 9.83…deg);" }
```

Three separate overrides of ink that `DockControl` already owns: a Tailwind `stroke-foreground`
hard-stop, a private one-off custom property injected inline per instance, and a scoped `:hover`
rule to consume it. Contrast the correct pattern the same repo uses two directories up —
`ActionBarToggle.vue:154–158` styles through the **producer's own token hook**
(`--dock-compact-control-padding`), with a comment that names the principle: *"rides the producer's
OWN token hook … never a specificity fight."* This file loses that discipline in the same wave.

Forced-colors consequence: neither `stroke-foreground` nor the inline OKLCH survives forced-colors
mode, and no system-color fallback is declared.

---

#### D-15 · MINOR — three dead handles

- `defineExpose({ currentToggleIcon, toolbarMode, cycleToolbarMode })` (line 96) — the parent mounts
  this component with **no `ref`** (`Dock.vue:156`), so the entire exposed surface is unreachable.
- `colorInputRef` (line 28) — declared, never read.
- `actionToolbarRef` (line 29) — declared, never read; see D-9 for what it should have been doing.

---

#### D-16 · MINOR — `useTemplateRef` inconsistency inside a single file (edict 7)

Lines 28–29 use the legacy `ref<InstanceType<typeof X> | null>(null)` + matching `ref=` attribute
idiom; line 83 uses `useTemplateRef<HTMLElement>("subLayerGridEl")`. Two template-ref idioms, 55
lines apart, in one 158-line SFC. Vue 3.5 canon (and edict 7) is `useTemplateRef`.

---

#### D-17 · INFO — a dead prop crossing the component seam

`ActionToolbar.vue:72` declares `canProposeName: boolean` and its template never references it
(`ActionToolbar.vue:1–63`). `ActionBarLayer.vue:106` dutifully passes it. A required prop that is
pure ceremony on both sides of the seam.

---

#### D-18 · MINOR — a three-branch nested ternary as an accessible name

`ActionBarLayer.vue:131` computes the toggle's `aria-label` from a 176-character nested ternary
inline in the template. The accessible name is the only thing distinguishing three otherwise
identical states (D-10 makes that name load-bearing). It belongs in a `computed` beside
`currentToggleIcon` (lines 47–51), which already switches on the same three-way state — two
switches on one state variable, in two languages, in two places.

---

## 4. Negatives proven (evidence that the rest is sound)

Recorded so this report is not read as uniformly damning, and so refuted hypotheses do not
propagate:

1. **`verbatimModuleSyntax` is satisfied.** Line 2 qualifies `type Ref` inline; lines 5 and 9 are
   `import type`. No mixed import. Edict 8: clean.
2. **The closed layer is correctly inert.** `faceInert: true`, `anyInertAncestor: true` — the
   producer applies it; the 8 buttons inside are not in the tab order. No hidden-focus leak.
3. **The icon rhythm is currently undistorted.** I predicted `justify-around` (`ActionToolbar.vue:2`)
   would produce the classic half-gap end asymmetry against the separator. **Refuted by
   measurement:** `leadIn: 0`, `tailOut: 0`, `interGaps: [6, 6, 6, 6]` — the box is exactly
   content-sized, so `space-around` has no free space to distribute, and the 6 px is the producer's
   `--dock-layer-gap` fallback (`0.375rem`). *But note the dependency:* that 6 px arrives **only**
   through the illegitimate `.dock-layer` class of D-2 — ActionBarLayer's own root sets `gap-0`
   (line 100). Retire the counterfeit class without replacing the gap and the icon rhythm collapses
   to zero. This is a dependency proof, not a spacing defect.
4. **No dock-hold leak.** See the refutation under D-9.
5. **No vertical band disturbance.** Pill height 62 px in both modes; `VISUAL-CONSTITUTION.md §3.4`
   holds.
6. **No page errors, no horizontal overflow** on the host route in the tracked matrix
   (`REPORT.md` rows for `/#/`, all four matrices: `overflowX 0`, `pageErr 0`).
7. **`PALETTE-CONTRACT.md` is not applicable.** Read in full — it is the api/wire/export authority
   (routes, session, palette persistence, byte-exact export). It carries no visual or accent law
   this component could violate. Judged against `PROPORTION-AUDIT.md` and
   `VISUAL-CONSTITUTION.md` instead, per §3 above.

---

## 5. The gestalt cure — one transposition, not eighteen patches

D-1 through D-6, D-8 and D-12 are **one defect wearing eight faces**: a consumer reimplemented a
producer mechanism, kept its class vocabulary, and dropped its guarantees. The idiomatic cure is
architectural, and it subtracts:

```
delete  lines 26–29   (dead refs)
delete  lines 53–94   (the shim + subLayerProps)
delete  line  96      (dead defineExpose)
delete  lines 146–158 (the private hover-ink block)

import { DockControl, DockSeparator, DockCrossfade, DockLayer } from "@mkbabb/glass-ui/dock";

<DockCrossfade :active="activeSubLayer" reserve="inline">
    <DockLayer id="actions"> <ActionToolbar … /> </DockLayer>
    <DockLayer id="input">   <ColorInput   … /> </DockLayer>
</DockCrossfade>
```

That single move retires: the phantom 260 ms (D-1), the counterfeit private classes (D-2), the
undefined grid container and its mis-anchored overlap (D-3), the duration desync (D-4), the
signature-parity shim (D-5), the 70.4 px pointer displacement (D-6, via `reserve="inline"`), the
focus drop (D-8, via producer focus-transfer), and the PRM gap (D-12, via `useDockSpring`).
The file drops from 158 to roughly 80 lines and stops depending on anything glass-ui did not
promise it.

The remainder are separable and small:

| Defect | Cure |
|---|---|
| D-7 | bind `:on-mount` on the mobile `<PaneSlot>` (App.vue:83) — or, better, provide the action-bar context through DI instead of a sibling template ref; then design the mobile action composition §3.6 requires |
| D-9 | call `actionToolbarRef.clearHover()` on swap — or, once `<DockCrossfade>` owns the swap, let the face's own unmount/inert hook dismiss its popovers |
| D-10 | reset `toolbarMode = "actions"` on `activeSubLayer`/layer-close |
| D-11 | `watch(canProposeName, ok => { if (!ok && toolbarMode === "propose") toolbarMode = "actions" })` |
| D-13 | delete the re-provide; migrate `ColorInput`/`ParseEchoReadout` to the app-root pipeline at the root (edict 2) |
| D-14 | drop `stroke-foreground` + the inline custom property; take hover ink from `DockControl`'s token |
| D-16, D-17, D-18 | `useTemplateRef`; delete the dead prop; lift the aria-label to a `computed` |

**No source edits land from this formation.** Every cure above is a proposal for the consuming
wave.

---

## 6. Strongest single defect

**D-1 + D-2 together — the shim is a dead transition bound to producer-private CSS.**

The component's own header asserts the shim "preserves the exact two-refs contract the template
needs" for "the crossfade window." Measurement says the crossfade does not exist: the leaving layer
is at `opacity: 0` within 40 ms, the only transition on the node is `visibility`, and the classes
carrying that CSS (`.dock-layer` / `.is-active` / `.is-leaving`) are GlassDock's **private
expanded-vs-collapsed plate classes**, emitted in Glass 7 only as `dock-layer--full` and
`dock-layer--summary` inside the producer's own shell — while the public face class the consumer
should be using is `.dock-face`, and the container class it hangs them from, `.dock-layer-grid`,
is defined nowhere on disk. A 42-line mechanism, a documented rationale, and a carry-ledger
retirement condition — all guarding a beat that never plays.
