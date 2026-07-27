# CHALLENGE-C — `GradientVisualizer.vue` is improperly implemented

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]` (the 1M-context seat), which
matches the explicit declaration at spawn. The seat is **declared, not inherited**.

---

## Verdict

**DEFECTIVE.** Seventeen findings, of which **three are BLOCKER-class**: one destroys the entire
Gradient workbench and silently reseeds it to defaults on an ordinary editing gesture (reproduced
live, twice, from a clean load), and two silently corrupt the user's model.

**Strongest defect: C-1** — deleting the numbers inside a colour function in the CSS box (leaving
`oklch()`) unmounts the whole pane behind an error card and destroys every stop, position, easing
curve and setting the user had. It is the only finding where a normal, non-adversarial gesture
loses work irrecoverably.

The component's *entire public surface* is also defective: all three actions it `defineExpose`s —
and which the dock wires as **Reset / Copy CSS / Seed from palette**
(`demo/shell/usePaneRouter.ts:208-210`) — are each wrong in a different way (C-2, C-3, C-4).

Scope note on duplication: the two sibling components were audited before me. Where a defect is
owned by shared state that this file instantiates and drives, I re-derived it independently with my
own pasted evidence and marked it `[CONFIRMS …]` with the prior seat named. Findings marked `[NEW]`
have not been filed anywhere I could find in `docs/tranches/V/megatranche/`.

---

## Method + evidence base

* Full read of `GradientVisualizer.vue` (279 lines), its parent `GradientPane.vue`, all three
  children (`GradientStopEditor.vue`, `GradientCodeEditor.vue`, `GradientEasingEditor.vue`), all
  four composables, `useSpecimenRows.ts`, `easingCatalogue.ts`, `ErrorBoundary.vue`,
  `usePaneRouter.ts`, `color-utils.ts` / `picker-color.ts`, and `demo/ui/slider/index.ts`.
* Three headless probes I wrote and ran (kept, with their exact command lines, under
  `probes/`): `visualizer-probe.ts`, `direction-probe.ts`, `cost-probe.ts`. All output below is
  pasted verbatim from my own runs.
* Live drive of `http://localhost:9000` (Chromium via Playwright MCP), in-page recipe.
* `docs/tranches/V/megatranche/audit/visual/REPORT.json` rows for `/#/gradient` (all four Safari
  matrices) and the shot I captured at `evidence/gradient-pane-destroyed-by-oklch-empty.png`.
* `npx vue-tsc -p tsconfig.demo.json --noEmit` → **exit 0, 0 lines of output**.
* `npx vitest run test/gradient-parse.test.ts test/gradient-v4-consume.test.ts` → 22 passed.
* `.github/workflows/ci.yml:32-37` for what CI actually runs.

**Live-driving note (adds to the prior seat's).** The route drifts: a `#/gradient` deep link
sometimes lands on `#/` and, twice during my session, the app navigated itself to `#/mix` between
two `page.evaluate` calls. The reliable recipe is: `goto('http://localhost:9000/')`, wait ≈1.2 s,
then set `location.hash = '#/gradient'` **in-page** and poll for
`[role="textbox"][aria-label="Gradient CSS"]`. A `querySelector` for a gradient element returning
`null` is ambiguous — it means *either* "not mounted yet" *or* "the pane crashed and the
ErrorBoundary replaced it". Always read `document.querySelector('main').innerText` before
concluding.

---

## C-1 — BLOCKER · An ordinary edit in the CSS box destroys the entire pane and all the user's work

`[NEW blast radius; the underlying throw is MT-F001, filed as wb-gradient-stopeditor C5 · MAJOR]`

**The claim.** `onParseCSS` (lines 102-108) treats `applyCSS` as total:

```ts
function onParseCSS(css: string) {
    const result = applyCSS(css);
    parseVerdict.value = result.ok ? null : result.reason;
}
```

`applyCSS` → `parseGradientCSS` → `isColorToken` → `parseCssColor`, and `parseCssColor` **throws**
on an empty colour function. There is no `try`, and the emitted-handler call path runs inside
Vue's `callWithErrorHandling`, so the `TypeError` is captured by
`demo/color-picker/App.vue:50`'s `<ErrorBoundary>` — which unmounts the *whole* pane subtree
(`ErrorBoundary.vue:59-69`, `return false` stops propagation) and paints an error card. Recovery
(`reset()` at line 71) re-renders the slot, so `GradientVisualizer` mounts **fresh**: stops,
positions, per-interval easing curves, interpolation space, hue method and direction are gone,
replaced by the hard-coded seed.

**Reproduction — live, from a clean load, pasted from my run.** Clean state verified first, then a
single in-place edit of the editor's text to `linear-gradient(90deg, oklch(), blue)` (exactly what
a user gets by selecting `0.75 0.15 145` inside the parens and pressing Delete), then a 2 s wait
for the 500 ms debounce:

```json
{
  "step0": { "handles": 2,
             "easingReadout": "cubic-bezier(0, 0, 1, 1)",
             "editorText": "linear-gradient(90deg, oklch(0.75 0.15 145) 0%, oklch(0.65 0.18 265) 100%)" },
  "afterMain": "This panel hit an unexpected error.\n\nCannot read properties of undefined (reading 'replace')\n\nTry again",
  "handlesAfter": 0,
  "verdict": null,
  "editorStillThere": false
}
```

`handlesAfter: 0` and `editorStillThere: false` are the pane's corpse. `verdict: null` is the W5-11
contract inverting: the surface built to make failure *loud* renders nothing, because the component
that owns it no longer exists. A screenshot taken ~30 s later
(`evidence/gradient-pane-destroyed-by-oklch-empty.png`) shows the pane back — with the **default**
gradient, not the user's: the loss is silent as well as total.

**Headless confirmation of the throw (my run):**

```
$ npx vite-node .../probes/visualizer-probe.ts
===== P7 — applyCSS is not total: parseGradientCSS THROWS on some input =====
linear-gradient(90deg, oklch(), blue) → THREW TypeError: Cannot read properties of undefined (reading 'replace')
linear-gradient(90deg, rgb(), blue)   → THREW TypeError: Cannot read properties of undefined (reading 'replace')
linear-gradient(90deg, color(), blue) → THREW TypeError: Cannot read properties of undefined (reading 'replace')
```

**Why this is the visualizer's finding and not only the grammar's.** The grammar bug
(`src/css/grammar.ts:181`, the non-null assertion on `slash[0]`) is the *cause*; the *blast radius*
is chosen here. This component is the only place that (a) invokes a documented
"model-or-reject, never a partial" boundary, (b) owns the surface that is supposed to show the
rejection, and (c) holds the only copy of the user's model. A total parser is the cure — but the
component that owns unsaved user state and calls a parser on every keystroke should not be
architected so that any parser defect anywhere costs the user everything.

**Cure (architectural).** Two independent moves, both needed:
1. `grammar.ts` returns a failure for an empty component list (the prior seat's cure — do not
   `try/catch` in the pane, that is a masking fallback, edict 2).
2. The model must **outlive its view**. `useGradientModel()` is instantiated inside the component
   (line 32), so the model's lifetime *is* the component's lifetime and any thrown error is a data
   loss event. Hoist it to a route-scoped store provided above the `ErrorBoundary` (the same shape
   the palette port already uses), so "Try again" remounts the *view* over a surviving model.

---

## C-2 — MAJOR · The Copy button copies a different string from the one on screen, and swallows failure

`[NEW]`

**The claim.** The CSS section header pairs an `<h3>CSS</h3>` with a copy control, directly above
the editor that renders `simpleCSS`:

```
GradientVisualizer.vue:254   <DockControl compact title="Copy CSS" @click="copyCSS">
GradientVisualizer.vue:258   <GradientCodeEditor :model-value="simpleCSS" …/>
GradientVisualizer.vue:127   async function copyCSS() { await writeClipboard(coalescedCSS.value); }
```

The visible string is `simpleCSS`; the clipboard gets `coalescedCSS`. They are not the same object
of thought — one is the authored gradient, the other is a 33-sub-stop bake with per-interval easing
inlined.

**Measured (my run):**

```
===== P5 — copyCSS copies a different string from the one on screen =====
editor shows (simpleCSS, 74 chars): linear-gradient(90deg, oklch(0.75 0.15 145) 0%, oklch(0.65 0.18 265) 100%)
clipboard gets (coalescedCSS, 1363 chars): linear-gradient(90deg, oklch(75% 0.15 145deg) 0.00%, oklch(74.687…
identical? false
```

74 characters shown, 1363 characters copied — an 18× divergence, with the authored literals
(`oklch(0.75 0.15 145)`, `red`, `rebeccapurple` — the literals `P2-15` exists to preserve)
destroyed in the copied form.

**Second defect in the same three lines.** `writeClipboard` returns a discriminated result *for
exactly this reason* — `node_modules/@mkbabb/glass-ui/dist/composables/dom/useClipboard.d.ts:32-37`:

> "Returns the discriminated result (`{ ok }` / `{ ok, reason }`) rather than a lossy boolean… `const { ok } = await writeClipboard(text)`"

`copyCSS` discards it. A denied clipboard permission, an insecure context, or Safari's
user-gesture rule produces **no** feedback anywhere — and the dock action
(`usePaneRouter.ts:209`) is equally silent. The sibling `GradientEasingEditor.vue:94` uses
`useClipboard({ resetMs: 1400 })` with a tick confirmation, so the house idiom exists and this seat
declined it.

**Cure.** Copy what the user is looking at (`simpleCSS`) — or, if the baked form is genuinely the
export of record, *show* it. Then adopt the producer's `useClipboard` in place of the bare
`writeClipboard`, so success and failure both have a surface (and the success tick gets an
`aria-live` announcement, which nothing in this component currently has).

---

## C-3 — MAJOR · "Reset" does not reset

`[NEW]`

**The claim.** `resetGradient` (lines 118-125) restores stops, type, direction, space, hue and the
verdict — but **not the easing curves**, and not the selection. The intervals are only ever
re-seeded by the length-keyed watcher in `useGradientModel.ts:89-100`; reset replaces 2 stops with
2 stops, the length does not change, and the watcher never fires.

**Reproduction (my run, pasted):**

```
===== P1 — resetGradient leaves an authored easing curve in place =====
before reset: stops=2 interval[0].css=steps(4, jump-end)
after  reset: stops=2 interval[0].css=steps(4, jump-end)
RESET RESTORED THE linear SEED? false
coalesced after reset: linear-gradient(90deg, oklch(75% 0.15 145deg) 0.00%, oklch(75% 0.15 145deg) 3.13%, oklch(75% 0.15 145deg) 6.25…
```

The pasted `coalescedCSS` is the user-visible consequence: after "Reset to defaults" the gradient
renders as a **4-band staircase**, because `steps(4)` survived. The user cannot get back to the
default gradient by any means except reloading the page.

`selectedStopId` is likewise not cleared, so it keeps pointing at a stop id that no longer exists
(`selectedStop` then resolves `null` forever — the remove chip cannot be re-shown for the stop that
inherited the selection).

**Cure.** Reset is not a sequence of field pokes; it is "adopt the seed model". Put the seed in one
place (`useGradientModel` already owns the initial `stops`/`intervals` literals) and expose
`resetModel()` that swaps the *whole* `GradientModelState` — the same atomic move `applyCSS`
already makes for a parsed model. The component then has nothing to forget.

---

## C-4 — MAJOR · "Seed from palette" is a silent no-op, picks an arbitrary palette, and admits unvalidated colour strings

`[NEW]`

```ts
function seedFromPalette() {
    if (!pm) return;
    const colors = pm.savedPalettes.value[0]?.colors.map((c) => c.css);
    if (colors && colors.length >= 2) setStopsFromColors(colors);
}
```

Three defects in five lines:

1. **Silent no-op.** No saved palettes (every first-time visitor), or a first palette with one
   colour, and the dock button does nothing at all — no verdict, no toast, no disabled state. The
   dock's own description promises "Seed gradient stops from a saved palette."
2. **`[0]` is not a choice.** It seeds from whichever palette sorts first, not the selected/current
   one. In my live session the library held *Sunset Ridge* and *Deep Ocean*; nothing in the UI says
   which one the button will use, and there is no way to pick.
3. **Unvalidated strings enter the model.** `setStopsFromColors` stores whatever it is given;
   every downstream render computed then parses it through `parseColorIn`, which **throws**:

```
===== P8 — seedFromPalette accepts any string; the render computeds then throw =====
coalescedCSS computed THREW PickerColorError: Invalid CSS color
1-colour seed → stops=1 intervals=0
```

That throw happens inside a `computed` consumed by the template (`:style="{ '--tile-render':
coalescedCSS }"`), i.e. during render — the C-1 pane-destruction path again, from a different door.
The second line is the other half: `setStopsFromColors(["#112233"])` leaves the model at **1 stop /
0 intervals**, violating the ≥2-stop invariant that `removeStop` and `parseGradientCSS` both
enforce. The `length >= 2` guard in the caller is the *only* thing standing between a one-colour
palette and an illegal model — the model itself does not defend it.

**Cure.** Make the seed a real command: it takes a palette (chosen by the user), validates through
the library oracle once at the boundary, and either applies a complete model or returns the same
`{ ok:false, reason }` shape the CSS path already returns — one failure surface for both doors.
And move the ≥2-stop invariant into `setStopsFromColors` where it can be enforced rather than
hoped for.

---

## C-5 — BLOCKER · Adding or removing a stop re-hosts every authored easing curve

`[CONFIRMS wb-gradient-stopeditor C2 / wb-gradient-easingeditor C-4 — re-derived here with my own run]`

`onAddStop` (line 90) and `@remove="removeStop"` (line 143) are the visualizer's wiring into an
interval array that is keyed by **index** and synchronised by **length alone**
(`useGradientModel.ts:89-100`). Insert anywhere but the end and every later curve slides one slot
to the left; a fresh `linear` is appended at the far end.

```
===== P2 — onAddStop re-hosts authored curves (index-keyed intervals) =====
before: 0,50,100 → cubic-bezier(0.42, 0, 0.58, 1) | steps(4, jump-end)
after:  0,25,50,100 → cubic-bezier(0.42, 0, 0.58, 1) | steps(4, jump-end) | cubic-bezier(0, 0, 1, 1)
interval that was 50→100 (steps) now covers: 25→50
```

The `steps(4)` the user authored for the **second half** of the gradient now governs a segment in
the first quarter, and the second half silently reverts to linear. Nothing in the UI reports it.
Remove is the mirror image: the *last* interval is truncated, so removing an interior stop shifts
every curve after it and drops the final one.

**Cure.** Stop modelling an adjacency relation as a parallel array. Either carry the outgoing curve
on the stop that starts the interval (`GradientStop.easing`, one array, no synchronisation
possible), or key intervals by the id pair `${a.id}:${b.id}` and let an insert *split* an interval
explicitly (both halves inherit the parent curve — a decision, not an accident).

---

## C-6 — BLOCKER · The drag handler drops the ordering invariant; the component emits CSS its own parser rejects, and its add-ghost then lies

`[CONFIRMS wb-gradient-stopeditor C1 — new evidence: the ghost/mint divergence and the rail inversion count]`

`onStopPositionUpdate` (lines 94-96) writes a raw position and re-sorts nothing, while `addStop`
sorts and `parseGradientCSS` **rejects** non-monotonic input. Three owners, three policies.

```
===== P3 — onStopPositionUpdate emits CSS the app's own parser rejects =====
positions: 70,50,100
simpleCSS (what the editor shows): linear-gradient(90deg, oklch(0.75 0.15 145) 70%, lime 50%, oklch(0.65 0.18 265) 100%)
re-parse of the app's own output: REJECTED — stop positions must be non-decreasing (hard-stop reordering isn't modeled)
rail sub-stop positions: 33 samples, 16 DECREASING steps
ghost/add color the visualizer mints at 60%: oklch(0.75 0.15 145)
```

**New in this pass — `colorAtPosition` (lines 64-88) is only correct for a sorted list, and it is
the visualizer's own function.** After the cross-drag above, the ghost at 60 % reports the *first
stop's* colour (`position <= list[0].position` short-circuits at line 67, because `list[0]` is now
at 70 %), while the rail at 60 % paints a clamped slab from an entirely different pair. So the
"self-evident affordance" the comment describes — "a hover ghost previews exactly what will land" —
previews a colour that neither matches the rail under it nor the colour the click will mint from
the same function's other branch. The add affordance's whole justification is void in this state.

The final `throw new Error("No gradient interval contains …")` at line 87 is, by contrast,
**unreachable**: any walk from `list[0] < position` to `last > position` must cross upward through
some ascending pair, and an ascending pair covers the position. It is dead code that reads like a
guard.

**Cure.** Ordering is not a property of an array; make it a property of the type. A single
`setStopPosition(id, pos)` that returns the re-sorted model (and re-keys intervals — see C-5) is
the only writer; `stops` becomes readonly to the view.

---

## C-7 — MAJOR · There is no keyboard path to add a stop, and the rail is invisible to assistive tech

`[NEW for this seat; overlaps wb-gradient-stopeditor C6, which measured the handles]`

Measured live on `/#/gradient` (my run):

```json
"barRole": { "role": null, "tabindex": null, "aria": null },
"handles": [ { "label": "Gradient stop at 0%",   "w": 20, "h": 20, "tabindex": null },
             { "label": "Gradient stop at 100%", "w": 20, "h": 20, "tabindex": null } ]
```

The rail is a bare `<div>` whose *only* add gesture is a pointer click on itself
(`GradientStopEditor.vue:101-110` → `@add` → `onAddStop`). There is no keyboard equivalent
anywhere: not on the rail, not in the CSS editor's affordances, and not among the three dock
actions (`usePaneRouter.ts:208-210` = Reset / Copy CSS / Seed). **WCAG 2.1.1 Keyboard (Level A)
failure** for the component's primary creative act. The 20×20 handles are the two entries this
component contributes to the `/#/gradient` `smallTapTargets: 6` row in all four Safari matrices
(`REPORT.json`) — **WCAG 2.5.8 (AA)**.

A keyboard user can only ever edit the two seeded stops, or hand-write CSS into a box that (C-1)
destroys the pane on a malformed intermediate state.

**Cure.** The rail is a multi-thumb slider; give it the role it already behaves as. Each handle
becomes `role="slider"` with `aria-valuemin/valuemax/aria-valuenow/aria-valuetext` and
`aria-orientation="horizontal"` (arrow-key nudge then *announces*, which the current
name-mutation approach cannot), and the rail itself takes a `role="group"` with a name plus one
keyboard-reachable "Add stop" affordance — which is also the honest place for the touch user who
cannot hover to see the ghost.

---

## C-8 — MAJOR · The Copy CSS control has no accessible name — it is the route's one nameless button

`[NEW — identifies the REPORT's unattributed row]`

`REPORT.md` records `namelessButtons` = **1** for `/#/gradient` in all four Safari matrices, and
gradient is one of only two routes still showing one on *mobile* (where the shell's own nameless
control disappears). I found it. Live, from my run:

```json
"copyBtnHtml": "<button data-v-44c9d000 type=\"button\" class=\"dock-icon-button …\" title=\"Copy CSS\" …",
"copyBtnName": { "ariaLabel": null, "title": "Copy CSS", "text": "" }
```

`GradientVisualizer.vue:254` passes `title="Copy CSS"` and nothing else; the icon child is a bare
`<Copy>` with no `aria-hidden` and no label. Under the audit's own definition
(`visual/capture.mjs:102-105`: `aria-label || aria-labelledby || textContent`) that is nameless.
`title` is an accname *last resort* — unspoken by several SR/browser pairings and invisible to
touch — and the sibling `GradientEasingEditor.vue:181` proves the house idiom is
`:aria-label="…"`. **WCAG 4.1.2.**

**Cure.** `aria-label="Copy gradient CSS"` on the control, `aria-hidden="true"` on the icon, and
(with C-2) a live-region confirmation so the action's *result* is perceivable too.

---

## C-9 — MAJOR · Direction is a dead control for radial gradients, and the radial round-trip silently destroys the authored angle

`[NEW]`

The Direction slider (line 232) is always enabled and always shows a live `{{ direction }}°`
readout. For `type = radial` it changes nothing at all — the tile the file's own comment calls
"the honest surface for what Type + Direction DO" is unmoved:

```
== does the Direction slider change the render tile? ==
linear  0deg vs 270deg identical? false
radial  0deg vs 270deg identical? true      ← dead control
conic   0deg vs 270deg identical? false
```

Worse, the angle is not merely inert — it is **lost**:

```
== radial round-trip through the editor's own text ==
simpleCSS shown for radial @137deg: radial-gradient(red 0%, blue 100%)
re-parsed direction: 0 (authored 137)
```

So: set 137°, switch Type to Radial, type any character in the CSS box (which parses the displayed
text on a 500 ms debounce), switch back to Linear — the gradient is now 0°, and nothing announced
the loss. The editor is a lossy channel that the app pushes the model through on its own.

The model can also hold directions the slider cannot represent
(`linear-gradient(-90deg, …)` → `direction=-90`, `1e6deg` → `1000000`, both accepted) against a
`:min="0" :max="360"` slider.

**Cure.** Direction is not a property of a gradient; it is a property of the *linear* and *conic*
gradients. Model it that way (a discriminated `GradientGeometry`) so the control's presence is
derived from the type rather than from a comment, and the serializer cannot drop a field the model
claims to hold.

---

## C-10 — MAJOR · The Hue control is inert in four of the nine spaces the Space control offers

`[NEW]`

`HUE_INTERPOLATION_METHODS` (Shorter/Longer/Increasing/Decreasing) is offered unconditionally at
line 198, but hue interpolation only exists in a polar space. Measured over the exact
`INTERPOLATION_SPACES` list (`color-space-meta.ts:26-36`):

```
== P4 — the Hue select is a dead control in non-polar spaces ==
oklch  shorter===longer ? false
lch    shorter===longer ? false
hsl    shorter===longer ? false
oklab  shorter===longer ? true    ← inert
lab    shorter===longer ? true    ← inert
rgb    shorter===longer ? true    ← inert
xyz    shorter===longer ? true    ← inert
```

(`hsv`/`hwb` are polar and were not sampled; the four `true` rows are the whole non-polar set of
the offered list.) The control accepts input, redraws the whole gradient chain (C-12) and produces
a byte-identical result. There is no `disabled`, no explanatory copy, and — because the three
selects are laid out as an undifferentiated triple — no signal that one of them has quietly stopped
meaning anything.

**Cure.** Derive the Hue control's availability from the selected space (`PICKER_CHANNELS[space]`
already carries `hue?: true` per channel — the fact is in the library, not in a comment), and
disable-with-reason rather than silently ignore.

---

## C-11 — MAJOR · The only gate that can see this component is RED, and CI never runs it

`[CONFIRMS the harvest row + wb-gradient-stopeditor C4; verified independently]`

```
$ npx vitest run test/gradient-parse.test.ts test/gradient-v4-consume.test.ts
 ✓ test/gradient-parse.test.ts (19 tests) 11ms
 ✓ test/gradient-v4-consume.test.ts (3 tests) 14ms
 Test Files  2 passed (2)   Tests  22 passed (22)

$ grep -rln "GradientVisualizer" test/ demo/test/
test/gradient-v4-consume.test.ts     ← imports …/GradientVisualizer/easing/easingCatalogue, not the SFC

$ grep -rn "playwright\|test:e2e" .github/workflows/*.yml
(no output)
$ sed -n 32,37p .github/workflows/ci.yml
- run: npm ci
- run: npm run lint
- run: npx vue-tsc -p tsconfig.lib.json --noEmit
- run: npx vue-tsc -p tsconfig.demo.json --noEmit
- run: npm run build
- run: npm test
```

No unit test imports the SFC. The only behavioural gate is `e2e/smoke/views/gradient.spec.ts`,
which is **not in CI** and is currently **RED** — its first two tests assert a
`role="img"`/`Perceived-space plate` that no longer exists in the tree
(`grep -rn "Perceived-space" demo/` → no matches; retired in `a68ecdc1`), so they cannot pass.

**The exact vacuous mutation.** Replace the entire file with

```vue
<script setup lang="ts">
defineExpose({ resetGradient() {}, copyCSS() {}, seedFromPalette() {} });
</script>
<template><div /></template>
```

`npm run lint`, both `vue-tsc` projects, `npm run build` and `npm test` all stay **green**, and CI
reports success. Every behaviour in this report — the crash, the copy divergence, the dead reset —
is invisible to the gates the project actually runs.

**Cure.** One component test that mounts `GradientVisualizer` (jsdom is already the vitest
environment) and asserts the three exposed actions plus the two catastrophic inputs
(`oklch()` in the editor; a cross-drag), and put `test:e2e` on a CI job. A gate that cannot see the
component is not a gate.

---

## C-12 — MAJOR · One coarse `modelState` makes every field change repaint everything, and most of that work is provably invariant

`[NEW measurements; the duplicate-emit multiplier confirms wb-gradient-stopeditor C3]`

`modelState` (`useGradientModel.ts:102-109`) is a single computed object; `coalescedCSS`,
`railRampCSS`, `simpleCSS`, `useSpecimenRows` and `openIntervalRamp` all depend on the whole of it.
Measured cost of ONE tick (node/V8, my run — excludes Vue patch, style recalc, the browser-only
contrast certification, and rasterisation):

```
== 2 stops ==                              == 8 stops ==
coalescedCSS (render tile)   0.085 ms      0.089 ms
railRampCSS (editing rail)   0.073 ms      0.091 ms
specimenRows (easing heads)  0.031 ms      0.200 ms
openIntervalRamp (open row)  0.075 ms      0.070 ms
ONE modelState tick          0.265 ms      0.449 ms
…doubled by the bar+handle emit 0.530 ms   0.899 ms
inline style bytes per tick: tile 2131 · rail 2129
```

and the invariance check:

```
== is any of that work invariant to the field that triggered it? ==
railRampCSS  same at 90deg and 271deg? true
specimenRows same at 90deg and 271deg? true
intervalRamp same at 90deg and 271deg? true
```

So dragging the Direction slider across its 0–360 track recomputes, per tick, three products that
**cannot** change — and rewrites a 2.1 KB inline style string on the rail that is byte-identical to
the one already there. The 4.26 KB of inline gradient text per tick is itself a consequence of
`colorToCss` emitting full float precision (`oklch(74.687500147402% 0.150937499558
148.749998231174deg)` — measured in the live DOM); at 3 significant figures the same string is
under a third of the size.

**Cure.** Split the state by what actually varies: geometry (`type`, `direction`) feeds only the
render tile; the ramp facts (`stops`, `intervals`, `space`, `hue`) feed the rail and the specimen
rows. Two computeds instead of one, and the invariant work stops happening. Round the serialised
channels at the one serialisation boundary.

---

## C-13 — MINOR · Selection is a public model that leads nowhere; a stop's colour cannot be edited at all

`[NEW half; the dual-write path confirms wb-gradient-stopeditor C8]`

`selectedStopId` is declared as a `defineModel` (line 51) — a public two-way prop — but
`GradientPane.vue:25` binds nothing, and nothing in this file reads it. Its whole effect is to be
handed straight back down to the child. The child is *also* wired twice for the same fact:
`v-model:selected-id="selectedStopId"` **and** `@select="(id) => selectedStopId = id"` (lines
140/144) — two mechanisms, one state (edict 2: dual paths).

The deeper defect: **selecting a stop cannot lead to editing its colour, because no colour-edit
path exists anywhere.** `updateStop` accepts `{ cssColor }`, but the only call in the codebase is
`updateStop(id, { position })` (line 95; `grep -rn "updateStop" demo/` → one call site).
Meanwhile `GradientPane.vue:8` injects `cssColorOpaque` from `CSS_COLOR_KEY` and never uses it —
the session colour is delivered to the pane and dropped on the floor. So the workbench's model is
"gradients you can move but not colour", and the picker beside it is not connected to it.

**Cure.** Either give selection its consequence — the selected stop's colour is the pane's edit
target, wired through the existing `EDIT_TARGET_KEY`/`CSS_COLOR_KEY` contract the rest of the app
already uses — or delete the selection model, the `@select` emit and the dead injection. The
present state is the cost of both with the benefit of neither.

---

## C-14 — MINOR · Heading levels collide with the pane's own heading, and the render tile's name says nothing about the gradient

`[NEW]`

`PaneHeader.vue:21` renders the pane title "Gradient" as `<h3>`. This component's section headings
— "Interpolation" (line 149), "Easing" (241), "CSS" (253) — are **also `<h3>`**, so in the
accessibility tree they are siblings of the pane title rather than its children, and the route has
no `<h1>` at all (`REPORT.json`, `counts.h1: 0`, every route). A screen-reader user navigating by
heading gets a flat list with no containment. **WCAG 1.3.1.**

The render tile carries `role="img"` with `aria-label="Gradient render with type and direction
applied"` (lines 221-222) — a name that describes the *widget's job* and none of its content: not
the type, not the angle, not the colours. The `<img>` role promises a described picture; this one
says nothing a non-sighted user could act on, while the values it would need (`{{ direction }}°`,
the Type label) are already in the component.

---

## C-15 — MINOR · The parse verdict's live region is created together with its content

`[NEW]`

`GradientCodeEditor.vue:107-114` renders the verdict as `<p v-if="parseVerdict" role="status">`.
A live region that is *inserted* already populated is not reliably announced — several
SR/browser pairings (VoiceOver+Safari among them, which is this project's stated matrix) only speak
mutations of a region that was already in the accessibility tree. The component's one failure
channel is therefore silent for exactly the users who cannot see the destructive border.
**WCAG 4.1.3.** Cure: render the region unconditionally (empty) and write text into it.

---

## C-16 — MINOR · The model is transiently illegal after every stop change

`[NEW]`

The interval array is reconciled by an async `watch` (`useGradientModel.ts:89-100`), so between the
write and the flush the model holds `n` stops and `n-2` intervals. Any consumer that reads in that
window throws — proven with the visualizer's own serializer:

```
(synchronous read straight after addStop, before the interval watcher flushes:)
  THREW Gradient interval 3 is missing
```

Vue's pre-flush ordering saves the render path today, which is why this is MINOR rather than
BLOCKER — but it is *luck about scheduler ordering*, not an invariant: any `flush: 'sync'`
watcher, any `watchSyncEffect`, or any handler that reads a computed in the same tick as an add
(a plausible future "add stop and immediately select it") lands in the illegal window. Stops and
intervals must change in one assignment, as `applyCSS` already does.

---

## C-17 — INFO · Smaller sharp edges, each with a mechanism

1. **Two id counters, one shape.** `useGradientModel.ts:66-69` and `gradientParse.ts:31-34` both
   mint `stop-${++n}-${Date.now().toString(36)}` from independent counters. My run:
   `model-minted: stop-26-ms3to7fr, stop-27-ms3to7fr` / `parser-minted: stop-4-ms3to7fs,
   stop-5-ms3to7fs`. Uniqueness rests on the two counters never coinciding within one millisecond
   — probable, not guaranteed, and a collision produces duplicate `:key`s and a mis-targeted drag.
   One id source, or a monotonic counter with no time component.
2. **Three unchecked casts.** `(v: AcceptableValue) => type = v as GradientType` (and the same for
   space and hue, lines 164/181/198). `AcceptableValue` includes `null`/`undefined`; a `null` from
   the producer would produce `null-gradient(…)` with no runtime guard anywhere. *(Hypothesis — I
   did not observe reka-ui emitting null here.)*
3. **`debounce.cancel()` is never called.** `demo/shared/utils.ts:36` provides it;
   `GradientCodeEditor.vue:55` never wires it to unmount, so a pending parse fires into an
   unmounted tree after a pane swap — and with C-1 in play, that throw lands where no boundary is
   left to catch it.
4. **`resolvedEasingCache`** (`useGradientCSS.ts:69`) is a module-level `Map` with no eviction. In
   practice the picker payload always carries `fn`, so the cache is only reached by literal-only
   intervals and stays bounded by the catalogue — noted, not charged.

---

## Negative proofs — hazards from the brief that I checked and found ABSENT

* **PRM-RAF epidemic.** `grep -rn "requestAnimationFrame" demo/workbenches/gradient/` → two hits,
  both one-shot rAFs in `easing/EasingAuthoringStage.vue:58,65` (already filed as easing C-10).
  **No rAF loop, gated or ungated, exists in this component or its composables.**
* **WebGL / eager canvas boot.** No WebGL, no canvas, no context in this subtree; the route's one
  `<canvas>` is the shell atmosphere.
* **`ValueUnit` nesting.** `grep -rn "ValueUnit" demo/workbenches/gradient/` → no matches. This
  tree never wraps a possibly-wrapped value.
* **`defineModel` stale read at this level.** `selectedStopId` is *not* bound by `GradientPane`, so
  Vue's `useModel` takes the local-value branch and writes are synchronous here. (The child's
  `selectedId` **is** parent-bound and therefore armed — the prior seat's `[p2·CORRECTION]`.)
* **oklch→HSV hue drift / `stableHue`.** Not applicable: this component never round-trips through
  HSV; `interpolateStopColors` mixes in the chosen space and serialises once.
* **reka slider pointer-capture leak.** `demo/ui/slider/index.ts` re-exports glass-ui's `Slider`
  wholesale — the capture-recovery contract is the producer's, and there is no demo-side
  re-implementation to leak.
* **Type safety.** `npx vue-tsc -p tsconfig.demo.json --noEmit` → exit 0, no output. Every
  type-only import in the file is `import type` (`verbatimModuleSyntax` clean).
* **God module / glass-ui first / animations.** 279 lines with four composables and three children;
  `Slider`, `DockControl`, `writeClipboard`, `EasingPicker` all come from `@mkbabb/glass-ui`; the
  scoped block holds one paint contract and deletes no keyframes.

---

## Ranked summary

| # | Severity | Defect | Status |
|---|---|---|---|
| C-1 | BLOCKER | `oklch()` in the CSS box destroys the whole pane + all user state | NEW (blast radius) |
| C-5 | BLOCKER | add/remove re-hosts every authored easing curve | CONFIRMS |
| C-6 | BLOCKER | drag drops the ordering invariant; ghost + parser disagree with the paint | CONFIRMS (+ new ghost evidence) |
| C-2 | MAJOR | Copy copies 1363 chars while showing 74; failure Result discarded | NEW |
| C-3 | MAJOR | Reset does not reset easing or selection | NEW |
| C-4 | MAJOR | Seed: silent no-op, arbitrary palette, unvalidated colours, 1-stop model | NEW |
| C-7 | MAJOR | no keyboard path to add a stop; rail has no role/name (2.1.1, 2.5.8) | NEW/overlap |
| C-8 | MAJOR | Copy control is the route's one nameless button (4.1.2) | NEW (attribution) |
| C-9 | MAJOR | Direction dead for radial + silently lost on the round-trip | NEW |
| C-10 | MAJOR | Hue inert in 4 of 9 offered spaces | NEW |
| C-11 | MAJOR | only gate is RED and not in CI; exact vacuous mutation given | CONFIRMS |
| C-12 | MAJOR | 0.27–0.45 ms + 4.26 KB per tick, ≥3 products invariant to the trigger | NEW |
| C-13 | MINOR | selection leads nowhere; stop colour cannot be edited at all | NEW half |
| C-14 | MINOR | heading collision with the pane title; contentless tile name | NEW |
| C-15 | MINOR | verdict live region created with its content (4.1.3) | NEW |
| C-16 | MINOR | model transiently illegal after every stop change | NEW |
| C-17 | INFO | id counters, unchecked casts, uncancelled debounce, unbounded cache | NEW |

### Probe artefacts (re-runnable)

```
npx vite-node docs/tranches/V/megatranche/audit/components/wb-gradient-visualizer/probes/visualizer-probe.ts
npx vite-node docs/tranches/V/megatranche/audit/components/wb-gradient-visualizer/probes/direction-probe.ts
npx vite-node docs/tranches/V/megatranche/audit/components/wb-gradient-visualizer/probes/cost-probe.ts
```

`evidence/gradient-pane-destroyed-by-oklch-empty.png` — the pane after the C-1 crash and its
auto-recovery, showing the **default** gradient where the user's work was.
