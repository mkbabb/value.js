claude-opus-5[1m]

# CHALLENGE · `MatrixEditor` · axis **L (LIBRARY)**

**Target:** `/Users/mkbabb/Programming/keyframes.js/demo/scenes/cube/matrix-editor/MatrixEditor.vue` (158 lines)
**Tree:** keyframes.js `master` @ `8281638c` (working tree dirty; `MatrixEditor.vue` itself **clean** — `git status --short` does not list it)
**Mode:** static + source-derived. No browser tooling; no installs; no dev server. Two claims below are proven by **executing** read-only probes (`node -e` on the class expression; `tsc --listFilesOnly`) — marked **[EXECUTED]**. Nothing was written outside this file.
**Posture:** the component was assumed DEFECTIVE until the tree proved otherwise. Every claim carries its falsifier; where reachability is narrower than the severity might suggest, the falsifier says so out loud.

**Read whole:** `MatrixEditor.vue`. **Read whole (imports):** `./transformMath.ts`; `@state` → `demo/state/controlOptionsStore.ts` (+ `hashSharing.ts`, `demo/app/scene/router.ts:50` for reachability); `@mkbabb/glass-ui` → installed 7.0.0 `dist/components/{input,slider,card,surface,_shared}` type + compiled surfaces. **Read as module context (NOT imported by the component):** `./useTransformState.ts` — it implements the emit contract and is the only producer of the two props; findings there are tagged **[MODULE]**.

---

## 0. Headline

| # | sev | claim | anchor |
|---|---|---|---|
| **L-1** | **BLOCKER** | `matrixCellMeta[selectedMatrixCell]` is indexed 3× with zero guard, on a value that reaches the store from an **untrusted base64 URL param** that is validated only as `typeof === "object"`. `undefined.sliderOptions` → render TypeError. The demo has **zero** error boundaries. | `:76-88` |
| **L-2** | **BLOCKER** | Clearing a cell — or typing the leading `-` of a negative translate/rotate — emits `""`/`"-"` → `parseFloat` → `NaN` → `withMatrixCell` throws **inside the engine's rAF frame**. The `play()` promise then never settles and the `RAFPlayback` is stuck reporting `running` forever. | `:33` → `useTransformState.ts:79-91` |
| **L-3** | MAJOR | **[EXECUTED]** The selected-cell class expression is missing one space: it emits the token `text-ellipsisfont-bold`. `text-ellipsis` **and** `font-bold` both die. Only `focus:font-bold` survives — so bold means *focused*, not *selected*. | `:17-27` |
| **L-4** | MAJOR | Every keystroke spawns a **new, un-cancelled** 300 ms `NumericAnimation` with its own private rAF chain. No handle is retained, nothing dedupes, nothing stops on unmount. | `useTransformState.ts:87-93` |
| **L-5** | MAJOR | `:start` / `:end` / `:step` are **not** `InputProps`. They fall through onto a native `<input type="text">` as non-conforming attributes. The bounds are pure decoration — **nothing clamps anywhere on the path**. | `:34-36` |
| **L-6** | MAJOR | `matrixOptions.selectedMatrixCell` does not exist in `StoredAnimationGroupControlOptions` (`matrixOptions?: { fixed: boolean }`). This component *invents and owns* a persisted store field that a **sibling** reads non-optionally. The R-tranche finding is **unfixed**. | `:22-23,38,120` |
| **L-7** | MAJOR | The controlled `:model-value` is rewritten by the 300 ms animation on every frame *while the user is typing* — glass-ui `Input` is `passive:true` + `vModelDynamic`, so the DOM value is clobbered mid-entry. | `:28-33` |
| **L-8** | MAJOR | `Matrix3dCall.args` is widened to `readonly CssValue[]`, discarding the `MatrixScalar` invariant the same file defines. `value.payload.value` is not expressible on that union — and the widening is precisely what forces the 16× runtime re-validation on every read. | `transformMath.ts:39-43` vs `:29,133` |
| L-9 – L-16 | MINOR | dead emit chain · focus/selection divergence · derivable prop · per-frame allocation storm · dead imports + dead type shim · internal error-posture split · uncancelled watcher rAF · stale `superKey` binding | — |
| L-17 – L-21 | INFO | **[EXECUTED]** `.vue` is outside *every* typecheck gate · display-format redundancy · `toLocaleLowerCase` hazard · one-hop CSS var · glass-ui phantom dep (F-1) bites all 4 imports here | — |
| **S★-1 – S★-5** | superlative | `transformMath.ts` as a value module · engine-payload validation · the documented `isGroupStarted` gate · the `z-10` local-stacking annotation · Card/Slider API correctness vs installed 7.0.0 | — |

**Tally: 21 defects (2 BLOCKER · 6 MAJOR · 8 MINOR · 5 INFO) · 5 superlatives.**

---

## 1. BLOCKERS

### L-1 · BLOCKER · unguarded array index fed from an untrusted URL param

`MatrixEditor.vue:75-89`:

```
:min="matrixCellMeta[storedControls.matrixOptions.selectedMatrixCell].sliderOptions.bounds[0]"
:max="matrixCellMeta[storedControls.matrixOptions.selectedMatrixCell].sliderOptions.bounds[1]"
:step="matrixCellMeta[storedControls.matrixOptions.selectedMatrixCell].sliderOptions.step"
```

Three unguarded index-then-dereference reads (plus `matrixCellValue(...)` at `:63`, which *does* guard — see L-14). `matrixCellMeta` is a 16-element prop (`useTransformState.ts:52-58`). `selectedMatrixCell` is read from persisted `localStorage`.

**The reachability chain, each hop verified:**

1. `demo/app/scene/router.ts:50` calls `restoreStateFromParam(stateParam)` on navigation — a first-class product feature (`SharePopover.vue` mints the links via `components/instrument/shell/useShareState.ts:20-21`).
2. `hashSharing.ts:56` — `decodeStateFromHash` = `atob` → `decodeURIComponent` → `JSON.parse`. Arbitrary shape.
3. `hashSharing.ts:29-45` — `isValidState` checks **only** that `.options` / `.controls` are non-null objects. No per-field validation.
4. `controlOptionsStore.ts:59-64` — `applySharedControlState` filters on `typeof value === "object"` and then `Object.assign`s each bucket **wholesale** into the live store.
5. → `storedControls.matrixOptions.selectedMatrixCell` is now any JSON value. `matrixCellMeta[99]` → `undefined` → `.sliderOptions` → `TypeError: Cannot read properties of undefined`.

**No boundary catches it.** `grep -rn "errorCaptured\|errorHandler\|ErrorBoundary" demo/` → **zero hits** across the entire 206-file demo tree. A render throw here takes out the `matrix-controls` tabpanel and its ancestor render.

The store's own `??=` guard at `MatrixEditor.vue:120` is a **presence** check, not a **range** check: a restored `{ fixed: true, selectedMatrixCell: 99 }` is present, so `??=` is a no-op and the poison passes straight through.

**Falsifier — stated plainly, because this is where the severity could be wrong.** A *legitimately generated* share link always carries 0–15: the only writer in the tree is `MatrixEditor.vue:38` (`= i`, `i ∈ [0,16)` from the 16-arg `v-for`). So this is **"untrusted input reaches an unguarded index"**, not "ordinary sharing breaks". The claim dies if any of these is shown: (a) `applySharedControlState` gains per-field validation; (b) the component clamps or falls back; (c) an `onErrorCaptured` boundary exists anywhere above `CubeScene`; (d) the router's `stateParam` is proven unreachable from user-pasted input. I hold BLOCKER because (c) is *measurably* false today, the field is **untyped** (L-6) so no future writer is constrained, and the component's own sibling helper 60 lines below validates the identical index.

---

### L-2 · BLOCKER · `NaN` from the input throws inside the engine's rAF frame

`MatrixEditor.vue:33` → `@update:model-value="(v) => updateMatrixCell(v, i)"` → `useTransformState.ts:78-93`:

```ts
const toNum = typeof to === "string" ? parseFloat(to) : to;      // :79
...
void new NumericAnimation([{ value: from }, { value: toNum }], { duration: 300 })
    .play(({ value }) => {
        matrix3dEnd.value = withMatrixCell(matrix3dEnd.value, ix, value);   // :90
```

**The emit fires per keystroke.** Compiled glass-ui `Input` (`dist/Input-DY7soIPd.js`) uses `useVModel(props,"modelValue",emit,{ passive:true })` + the `vModelDynamic` directive on a native `<input>` with `type` defaulting to `"text"` — i.e. the `input` event, no `.lazy`. So:

- select-all + Delete → `""` → `parseFloat("") === NaN`
- typing `-` to begin a negative value → `parseFloat("-") === NaN` — and translate cells are `[-1000,1000]`, rotate `[-360,360]` (`transformMath.ts:8,13`). **Every negative entry starts with this character.**
- `"."` → `NaN`

`NumericAnimation`'s constructor performs no finiteness check (`src/animation/physics/numeric.ts:82-122`). `lerp(from, NaN, t)` is `NaN` for **all** `t` including `0`, so **frame 1** hands `NaN` to `withMatrixCell`, which throws by design (`transformMath.ts:143-145`).

**Where the throw lands.** `onFrame` is invoked synchronously from `RAFPlayback._run`'s `frame(now)` (`src/animation/physics/playback.ts:139`). The throw propagates out of the rAF callback *before* `reschedule` is reached (`:140-147`), therefore:

- `_cleanup()` never runs → `this._resolve` is never called → **the `play()` promise never settles** (one permanently-pending promise per keystroke; `void` at `:87` suppresses any unhandled-rejection signal but not the leak);
- `_rafId` is never nulled → `playback.running` reports `true` forever on that instance;
- the console takes an uncaught `TypeError` per attempt.

**Falsifier.** Dies if any of: glass-ui `Input` emits on `change`/blur rather than `input` (refuted — `vModelDynamic`, no `.lazy`, `passive:true`); `parseFloat("-")` is not `NaN` (refuted); `NumericAnimation` rejects non-finite keyframes at construction (refuted — `numeric.ts:82-122` validates only `keyframes.length >= 2`, the `positions` length, and a string `timingFunction`); or `RAFPlayback` wraps `step` in try/catch (refuted — `playback.ts:139` is a bare call). A `Number.isFinite(toNum)` early-return at `useTransformState.ts:79` closes the whole class.

---

## 2. MAJORS

### L-3 · MAJOR · the missing space — `text-ellipsisfont-bold` **[EXECUTED]**

`MatrixEditor.vue:17-27`:

```
`text-body absolute … font-mono
text-ellipsis` +                       ← template literal ends with NO trailing space
[ storedControls.matrixOptions.selectedMatrixCell === i
      ? 'font-bold focus:font-bold' : '' ]
```

Evaluated verbatim with `node -e`:

```
UNSELECTED >>> ["text-center","font-mono","text-ellipsis"]
SELECTED   >>> ["font-mono","text-ellipsisfont-bold","focus:font-bold"]
```

`text-ellipsisfont-bold` matches **no** Tailwind rule. On the selected cell, `text-ellipsis` is destroyed *and* `font-bold` never applies. The only surviving emphasis is `focus:font-bold`.

**Not an idiom — the sibling proves it.** The decorative-label expression 20 lines below (`:42-48`) is the *same* shape and *does* carry the trailing space (`dark:opacity-75 ` + `[axis]`), and its axis class works. One expression has the space, the neighbour doesn't. That asymmetry is the defect signature.

**Compounding consequence (see L-10):** because `font-bold` is dead, "bold" now means **focused**, not **selected** — and focus and selection are independently mutable. The single affordance answering *"which cell does the Slider drive?"* is therefore either absent or actively wrong.

**Falsifier.** Dies if Tailwind's scanner emitted a `.text-ellipsisfont-bold` rule (it cannot — the token appears nowhere in source; only `text-ellipsis` and `font-bold` do), or if Vue normalised the concatenation into separate tokens (it does not — string class bindings are passed through verbatim). The array-to-string coercion itself is sound: `String([""]) === ""`, so the **unselected** path is byte-correct.

---

### L-4 · MAJOR · N un-cancelled animations per edit; no teardown handle

`useTransformState.ts:87` — `void new NumericAnimation(...).play(...)`. Verified in the engine:

- `numeric.ts:80` — `private _playback = new RAFPlayback()` is **per instance**.
- `playback.ts:173` — `play()` calls `this.stop()` first, but that stops only *its own* (never-started) driver.

So each keystroke starts an **independent** rAF chain. Ten keystrokes ⇒ ten concurrent 300 ms interpolations all writing the single `matrix3dEnd` ref, thrashing the displayed value throughout the overlap (and feeding L-7).

`useTransformState.ts:3` imports `computed, ref, watch` — **no lifecycle hook of any kind**. Nothing is retained, so nothing *can* be stopped. On scene swap (home ↔ cube), in-flight work keeps writing a dead ref, and `animateUpdateMatrix` keeps calling `transformTargetsStyle(..., [targetRef.value])` (`:121-125`) against a detached element, pinning that node.

**Falsifier — honest bound.** This is **not** an unbounded leak: durations are 300 ms / 500 ms, so the tail self-terminates. The claim as filed is *unbounded concurrency + zero cancellation capability*, not "memory grows without limit". It dies if `NumericAnimation` shared one module-level driver (refuted: `numeric.ts:80`), or if a hook elsewhere stops them (refuted: no handle exists to stop). Fix: hold the instance, `.stop()` the predecessor, `onScopeDispose(() => current?.stop())`.

---

### L-5 · MAJOR · `:start` / `:end` / `:step` are phantom props on `Input`

`MatrixEditor.vue:34-36` passes `:start`, `:end`, `:step`. The installed contract (`dist/components/input/types.d.ts`) declares exactly: `autocomplete, class, defaultValue, disabled, enterkeyhint, form, inputmode, invalid, maxlength, minlength, modelValue, name, pattern, placeholder, readonly, required, size, type`. **None of `start`, `end`, `step` is a prop.**

`Input` is `inheritAttrs:false` and spreads `forwardedAttrs` onto the native `<input>` (`Input-DY7soIPd.js`), and `field-control-CeLay9Tk.js` strips only `aria-invalid`. Therefore the rendered DOM is:

```html
<input type="text" start="-360" end="360" step="1" …>
```

`start`/`end` are non-conforming on `<input>`; `step` is inert on `type="text"`. **Consequence:** the bounds declared here constrain nothing. Combined with the absence of any clamp in `updateMatrixCell` (`useTransformState.ts:78-93`) and in `withMatrixCell` (which validates *finiteness* only, `transformMath.ts:143`), a typed `1e9` in a scale cell is accepted end-to-end. The Slider path *is* bounded (`:75-89`); the Input path is not — two editors of the same value with different domains.

**Falsifier.** Dies if `InputProps` declared any of the three (refuted above), or if `forwardedAttrs` filtered unknown attributes (refuted — it destructures out `aria-invalid` and returns the rest). The intended primitive exists and is unimported: glass-ui 7.0.0 ships `/number-field` (`dist/components/number-field/NumberFieldInput.vue.d.ts`) — one of the 52 unreached subpaths in **lane-frontend §3.1**.

---

### L-6 · MAJOR · the component invents a persisted store field that a sibling reads

`controlOptionsStore.ts:26` — `matrixOptions?: { fixed: boolean };`. **`selectedMatrixCell` is not in the type.**

`MatrixEditor.vue:115-120` supplies `{ fixed: true, selectedMatrixCell: 0 }` via `??=`, then reads `.selectedMatrixCell` at `:22-23`, `:38`, `:64`, `:71`, `:77`, `:82`, `:87`.

This confirms and **updates** the prior finding at `value.js/docs/tranches/R/audit/demo-composables-state.md:182,190` ("Move `defaultMatrixOptions` … into `controlOptionsStore.ts`"): still unfixed after the U/V tranches. Two corrections to the R text: the default is now `fixed: **true**` (was `false`), and R's stated mechanism ("TypeScript does not error because the type is widened at the `??=`") is **wrong** — `??=` narrows only within the setup body; the template compiles to a separate render scope where the declared `{ fixed: boolean } | undefined` still governs. It doesn't error because **nothing type-checks `.vue` at all** (L-17).

**Cross-component ownership is the sharper half.** `CubeScene.vue:195` writes `storedControls.matrixOptions.fixed = !storedControls.matrixOptions.fixed` **non-optionally**, while `:199-200` read the same object with `?.`. That inconsistency inside four lines is the author's own tell. The initialisation those writes depend on lives in a *different component's* `<script setup>`. Both surfaces are gated on `selectedControl === "matrix-controls"` — but on **different authorities**: the ribbon on `slotProps.selectedControl`, the panel on `storedControls.selectedControl` (the divergence CubeScene's own comment at `:163-172` insists is a single authority). Any window where the ribbon renders without the panel having mounted ⇒ `undefined.fixed = …` ⇒ TypeError.

**Falsifier.** Dies if the store type gains `selectedMatrixCell` (it has not — `controlOptionsStore.ts:26` read this session), or if the two gates are proven to be one expression (they are two reads of two sources). The fix is the one R already prescribed: move the default beside its type in `controlOptionsStore.ts` and delete the `??=`.

---

### L-7 · MAJOR · the controlled input is clobbered by the animation while the user types

`:28-33` binds `:model-value` to a value derived from `matrix3dEnd` and routes `@update:model-value` into a 300 ms animation that **rewrites `matrix3dEnd` every frame**. glass-ui `Input` uses `useVModel(..., { passive: true })`, which watches the incoming prop and pushes it into the local ref backing `vModelDynamic`. So for ~18 frames after each keystroke the DOM input's value is overwritten by interpolated frames of the animation the keystroke itself started.

Typing `12`: the `1` starts an animation toward `1`; the `2` arrives mid-flight, is composed against a value already in motion, and the field's displayed text is whatever the newest frame wrote. Multi-character entry into these fields is not reliably expressible.

**Falsifier.** Dies if `useVModel(passive:true)` does *not* re-sync on prop change (it does — that is the entire purpose of `passive`), or if `:model-value` were stable during typing (it is not — `matrix3dEnd` is the animation's write target, `useTransformState.ts:90`). Marked **UNPROVEN-NEEDS-LIVE** for the *exact* caret/selection behaviour (Vue skips the DOM write when the value is textually equal, so the visible severity depends on frame values differing from typed text — which they do for all but the first frame). The **mechanism** is source-proven; only the pixel-level outcome awaits SS-13.

---

### L-8 · MAJOR · the prop type discards the invariant the module already defines

`transformMath.ts` defines `MatrixScalar` (`:30-37`) as exactly the shape `matrixScalar()` produces (`:64-67`) — then types the call as:

```ts
export type Matrix3dCall = Readonly<{ kind: "call"; name: "matrix3d"; args: readonly CssValue[] }>;   // :39-43
```

`CssValue = CssScalar | CssCall | CssList` (`@mkbabb/value.js/dist/subpaths/value.d.ts:62`). `CssCall` and `CssList` have **no `payload`**; even narrowed to `CssScalar`, `payload.value` is `number | string | AnyColor`. So both consumer reads are unexpressible against the declared type:

- `MatrixEditor.vue:29` — `Math.round(value.payload.value * 100)`
- `MatrixEditor.vue:133` — `return cell.payload.value;` (typed `: number` at `:126`)

Two consequences, and the second is the expensive one:

1. The component silently depends on a runtime invariant its prop type denies.
2. Because the type was widened, **every read must re-prove it at runtime**: `matrixValues()` calls `matrixValueAt()` 16 times, each performing a four-way check (`kind`, `payload.type`, `unit`, finiteness) — `transformMath.ts:91-130`. Typing `args: readonly MatrixScalar[]` would make all 64 checks statically dead and let both consumer reads type.

**Falsifier.** Dies if `CssValue` had a common `payload` member (refuted — `value.d.ts:35-62` read this session), or if a caller legitimately supplies non-scalar args (refuted — the only constructor is `createMatrix`, `:69-89`, which builds exclusively via `matrixScalar`). Note the module *does* accept a `CssCall` arg in one place — but only in a **test** feeding the rejection path (`test/demo/scenes/cube-scene.test.ts:118-120`), which the narrower type would express as a deliberate cast.

---

## 3. MINORS

**L-9 · dead `resetMatrix` emit chain (3 sites).** `MatrixEditor.vue:110` declares the event; `:136-138` defines a local `resetMatrix` that emits it; **the template never references it** (`grep resetMatrix` over the component → `:110,:136,:137` only). `CubeScene.vue:178` dutifully wires `onResetMatrix` — a handler that can never fire, since the ribbon calls its own `resetMatrix()` directly at `:189`. Three coordinated dead sites. *Falsifier:* dies if a parent `emit` were reachable via `defineExpose` (absent) or a template ref (`h(MatrixEditor, …)` at `CubeScene.vue:173-179` passes no ref).

**L-10 · no `@focus` → focus and selection diverge.** `:37-39` sets `selectedMatrixCell` on `@click` only. Tab-focusing a cell does not select it, so the Slider keeps driving the previously-clicked cell. Fused with **L-3** (where the only surviving class is `focus:font-bold`), the bold cell is the *focused* one while the Slider edits a *different* one — the indicator is not merely missing, it points at the wrong cell. *Falsifier:* dies if a `@focus`/`@focusin` handler exists (it does not) or if the Input is unreachable by keyboard (it is a native `<input>`; it is reachable).

**L-11 · `matrixCellMeta` is a prop the component could derive.** `useTransformState.ts:52-58` computes it from three **pure, index-only** functions (`getAxisFromIx`, `getTransformFromIx`, `getSliderOptionsFromIx`) in `transformMath.ts` — a module the component **already imports** (`:99`). Passing 16 pre-derived objects creates two independently-lengthed props (`matrix3dEnd.args`, `matrixCellMeta`) that the template cross-indexes (`v-for … in matrix3dEnd.args` → `matrixCellMeta[i]`) with nothing — type or runtime — requiring them to agree. Deriving locally removes the prop, the mismatch class, and L-1's index surface in one move. *Falsifier:* dies if the meta were per-instance configurable (it is not — pure functions of `i`) or if another consumer needed it (`grep MatrixCellMeta demo/` → only this module).

**L-12 · the per-frame allocation storm inverts the engine's advertised contract.** `numeric.ts:54-67` bills `NumericAnimation` as a *"Zero-allocation numeric keyframe interpolator"* with a reused `result` object and a growth-only `_out` scratch. The demo — the library's own proving ground — discards that inside the very callback the engine hands it: each frame runs `withMatrixCell` (→ `matrixValues` = 16 validated reads, → `createMatrix` = `Array.from` + `findIndex` + **16 fresh scalar objects** + 1 call object) then `syncTransformations` (→ `matrixValues` again = 16 more validated reads). ~18 allocations and 32 validations per frame, per concurrent animation (L-4). For the repo's flagship dogfood surface this is the wrong exemplar. *Falsifier:* dies if `createMatrix` reused a buffer (it does not — `:84-88` returns a fresh literal) or if the callback ran once rather than per frame (`playback.ts:187-197` drives it every frame until progress 1).

**L-13 · dead imports and a dead type shim. [MODULE]** `useTransformState.ts:9-10` imports `MATRIX_AXES` and `transformSliderOptions`; neither appears anywhere in the file's body (both are used only *inside* `transformMath.ts`). `useTransformState.ts:19` re-exports `MatrixCellMeta` — **zero consumers**: `MatrixEditor.vue:99` imports it from `./transformMath` directly. That re-export is the same shape lane-frontend **F-5** flagged (`feedback_no_backwards_compat`), one directory over. `MatrixScalar` (`transformMath.ts:30`) is exported with no external consumer either. *Falsifier:* dies if any import from `useTransformState` requested the type — `grep MatrixCellMeta demo/` returns 6 hits, none of them that path.

**L-14 · the component's error posture splits against itself.** `matrixCellValue` (`:126-134`) guards its index and throws a precise `RangeError` — good instinct, wrong verb (throwing from a **display** getter turns a bad value into a render crash where a clamp would degrade gracefully). The three sibling reads 50 lines above (`:76-88`) index the *same* value with **no guard at all**. One component, one index, two postures. This is the component-scale echo of the cross-cutting split lane-library **§7.5** documents in `src/` (absorb / throw / swallow across five parse call-sites). *Falsifier:* dies if `matrixCellMeta` and `matrix3dEnd.args` were type-linked such that one guard covers both (they are separate props, L-11).

**L-15 · the watcher's rAF is never cancelled. [MODULE]** `useTransformState.ts:196-215` schedules `requestAnimationFrame(...)` behind a `transformUpdateScheduled` latch. `watch` is auto-stopped by the owning scope; the **pending frame is not**. Unmounting inside that window runs `updateTransformations()` on a dead scope and writes styles to a detached element. One stale frame, bounded — hence MINOR, but it is the same missing `onScopeDispose` L-4 needs. *Falsifier:* dies if a lifecycle hook cancelled it — `:3` imports only `computed, ref, watch`.

**L-16 · `superKey` is read once and never tracked.** `:113` calls `getStoredAnimationGroupControlOptions(props.superKey)` at setup. A later `superKey` change leaves `storedControls` bound to the old bucket. Benign today (`CubeScene.vue:70` passes the constant `SCENE_ID`), but it is an undeclared prop contract: `superKey` is effectively construction-only and nothing says so. *Falsifier:* dies if a `watch`/`computed` re-resolved the store (it does not) or if the prop were documented immutable (no such note).

---

## 4. INFO

**L-17 · `.vue` sits outside every typecheck gate — this is why L-6 and L-8 survived. [EXECUTED]**

```
$ npx tsc --noEmit --listFilesOnly | grep -c '\.vue$'
0
$ ls node_modules/vue-tsc node_modules/@vue/language-core
ls: No such file or directory  (both)
```

`npm run check` is `tsc --noEmit` (`package.json`), and `tsconfig.json` `include: ["src/","demo/"]` — but plain `tsc` cannot parse SFCs, so **all 58 `.vue` files / 11 984 lines** (lane-frontend §9) are invisible to it. `vue-tsc` is not a dependency. And CI never runs even that: `.github/workflows/ci.yml:42` runs `check:lib` (→ `tsconfig.lib.json`, `src/` only). The strictness is real and unusually good — `strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes` — and **none of it reaches this file**. Under those flags `MatrixEditor.vue` would raise at minimum: `.payload` not on `CssValue` (L-8, ×2); `.selectedMatrixCell` not on `{fixed:boolean}` + possibly-undefined (L-6, ×7); `matrixCellMeta[i]` possibly-undefined (×6); and `(val: number[])` at `:68` contradicting glass-ui's declared `(payload: number[] | undefined)` with `val[0]` narrowing to `number | undefined`. Filed INFO because the gate gap is repo-scope, not component-scope — but it is the enabling condition for four findings above.

**L-18 · display-format redundancy + inconsistent precision.** `:29-31` — `Math.round(v*100)/100` then `.toFixed(2)`: the first rounding is subsumed by the second. `.replace(/\.0*$/,"")` strips `"1.00"→"1"` and `"0.00"→"0"` but leaves `"1.50"` intact (the regex requires *only* zeros to end-of-string), so the grid mixes 0-dp and 2-dp cells — an identity matrix reads `1 0 0 0 / 0 1 0 0 …` while a scaled one reads `1.50`. *Falsifier:* dies if `/\.0*$/` matched `".50"` — it does not; `5 ≠ 0`.

**L-19 · `toLocaleLowerCase()` (`:47`) vs `toLowerCase()` (`:53`) on the same value, six lines apart.** Both are no-ops: `MATRIX_AXES` is `["x","y","z","w"]`, already lowercase (`transformMath.ts:4`). `toLocaleLowerCase()` is locale-sensitive (Turkish dotted/dotless `i`) — harmless here only by accident of the alphabet chosen. *Falsifier:* dies if any axis label were uppercase or non-ASCII; `getAxisFromIx` (`:161-162`) can return only those four literals or `"x"`.

**L-20 · one-hop CSS custom property.** `:142-157` — `.x { --color: var(--axis-x); color: var(--color); }` ×4. The indirection is consumed by exactly the next declaration and nothing else. The tokens themselves are correct and real (`demo/styles/style.css:109-112`). *Falsifier:* dies if `--color` were read by a descendant or by glass-ui — no other rule in the scoped block reads it.

**L-21 · glass-ui phantom dependency (lane-frontend F-1) bites all four of this component's UI imports.** `:97-98` imports `Slider, Card, CardContent` and `Input` from `@mkbabb/glass-ui` — a package absent from both `package.json` and `package-lock.json` while 7.0.0 sits in `node_modules`. Under `npm ci` this component fails to resolve at its **first two import lines**; it is not a peripheral consumer. It is also the component where the exposure *compounds*: L-5 is an API-contract drift (`InputProps`) that no lock pin can be checked against, because there is no pin. Recorded, not re-derived — F-1 owns the finding.

---

## 5. SUPERLATIVES (L-18 runs both ways)

**S★-1 · `transformMath.ts` is a genuinely exemplary value module.** Pure and total; **immutable by construction** — `withMatrixCell` (`:132-148`) returns a *new* `Matrix3dCall` and never mutates its argument; fail-explicit with messages that name the offending index (`createMatrix` checks arity **and** per-element finiteness, `:72-83`; `matrixValueAt` checks shape four ways, `:91-104`). And unlike almost every demo module, **it is unit-tested, and the tests assert the right things**: `test/demo/scenes/cube-scene.test.ts:101-122` asserts non-mutation (`expect(changed).not.toBe(matrix)`), the arity rejection, *and* the non-scalar-argument rejection. That test runs in CI — `vitest.config.ts` project `library` globs `test/**/*.test.ts`, which subsumes `test/demo/`, and `.github/workflows/ci.yml:46` runs `test:lib`. *Falsifier:* dies if `withMatrixCell` mutated in place (it does not — `matrixValues` returns a fresh tuple, `:112-129`), or if `test/demo/` were excluded from the CI project glob (it is not).

**S★-2 · the engine-payload validation is exactly right, and rare. [MODULE]** `useTransformState.ts:109-117` refuses to trust the frame object:

```ts
const value = values[`m${index}`];
if (typeof value !== "number" || !Number.isFinite(value))
    throw new TypeError(`Numeric matrix frame is missing finite m${index}.`);
```

This is not ceremony: `frame()` (`:100-103`) produces `Record<string, number>` via `Object.fromEntries`, so under `noUncheckedIndexedAccess` every lookup is genuinely `number | undefined`, and the engine's callback type `T` cannot narrow a dynamically-keyed record. Most demo callbacks index engine payloads bare. *Falsifier:* dies if the engine's `NumericFrameCallback<T>` statically guaranteed the 16 keys — it cannot, `T` is inferred from the same `fromEntries`. (Note the tension with L-2: the module validates the engine's *output* meticulously while never validating its own *input*.)

**S★-3 · the `isGroupStarted` gate is a first-rate piece of engine-consumption reasoning. [MODULE]** `useTransformState.ts:184-215` names the precise failure it prevents — rebuilding `matrix3dEnd` mid-play moves the AnimationGroup's *end keyframe* every frame, so the interpolation chases a moving target and jitters — and then encodes the fix as a **state gate** plus an **rAF** debounce, not a magic `setTimeout`. rAF is the correct clock because the thing being debounced is a paint. This is the demo doing what a dogfood is *for*: discovering an engine-consumption hazard and documenting it at the seam. *Falsifier:* dies if the comment misdescribed the mechanism (it matches `matrix3dEnd`'s role as the group's end value) or if a timer were used instead (`:203` is `requestAnimationFrame`).

**S★-4 · the `z-10` annotation pre-empts the exact audit question. [COMPONENT]** `:13-15` — *"z-10 on the Input below is LOCAL stacking … not an editor z-contract layer."* The demo single-sources its z-scale from glass-ui and forbids raw `z-[N]` brackets (lane-frontend §6.3). A reviewer meeting a bare `z-10` must ask whether it breaches that contract; three lines of comment answer it at the site. Cheap, load-bearing, and the correct *kind* of comment — it explains a decision, not the code. *Falsifier:* dies if no z-index contract existed, or if `z-10` were a bracket-arbitrary (it is a first-class utility).

**S★-5 · the non-`Input` glass-ui surface is API-correct against installed 7.0.0 — which is what isolates L-5.** Verified against the installed `dist`: `Card`'s `cartoon` is a declared `boolean` prop (`components/card/Card.vue.d.ts` → `CardProps.cartoon?: boolean`) and `tier="quiet"` is a real `SurfaceTier` (`_shared/axes.d.ts:5` → `["wash","quiet","resting","floating","overlay"]`, reaching `CardProps` via `SurfaceProps`). `Slider`'s `:min` / `:max` / `:step` / `:model-value` are all genuine `SliderRootProps` (`components/slider/types.d.ts` → `extends SliderRootProps`). This also contradicts the stale tranche-H prose that records the API as `surface="cartoon"` (`value.js/docs/tranches/H/audit/harden/impl-w2-implement.md:82`) — the tree has moved to the boolean and the component moved with it. Three of four glass primitives are used correctly, so L-5 is a **localised** contract drift on `Input`, not a component-wide misuse. *Falsifier:* dies if any of those props were absent from the installed 7.0.0 `.d.ts` — all four were read this session.

---

## 6. Corpus reconciliation

| corpus id | this challenge |
|---|---|
| **F-1** (phantom glass-ui) | **CONFIRMED, localised** → L-21. All four UI imports here are unresolvable under `npm ci`; and F-1 is *why* L-5's API drift is uncheckable — there is no pin to check against. |
| **F-5** (`no_backwards_compat` re-export shims) | **EXTENDED** → L-13. A third instance one directory over: `useTransformState.ts:19` re-exports `MatrixCellMeta` with **zero** consumers. Same law, same shape, outside F-5's enumerated pair. |
| **lane-library §7.5** (failure-posture inconsistency) | **ECHOED at component scale** → L-14. The `src/` split (absorb / throw / swallow ×5) reappears *inside one 158-line file*: guard-and-throw at `:126`, no-guard at `:76-88`. |
| **lane-library §4.6** (demo parse consumers) | **NO OVERLAP, stated for closure.** MatrixEditor touches no value.js parser: `transformMath.ts` **constructs** `CssValue` ASTs structurally and never calls `parseCss*`. It is therefore *outside* the R1 parser-crash blast radius. |
| **lane-frontend §3.1** (21/73 subpaths reached) | **SHARPENED** → L-5. `/number-field` — the primitive whose absence causes L-5 — is one of the 52 unreached subpaths. |
| **lane-frontend roster** (`MatrixEditor.vue`, 158 L, G) | **CONFIRMED** — 158 lines; imports `Slider`, `Card*`, `Input`. Module size is fine: 158 lines / 3 responsibilities. **No Goldilocks defect.** |
| `value.js/docs/tranches/R/audit/demo-composables-state.md:182,190` | **STILL UNFIXED, and partly wrong** → L-6. Default changed `fixed:false` → `fixed:true`; `selectedMatrixCell` still absent from the type; R's stated *reason* (`??=` widening) is incorrect — the real reason is L-17. |
| `value.js/docs/tranches/G/audit/_SYNTHESIS-frontend.md` **F-C6** (`h-[fit-content]` at `:5`) | **FIXED** — `:5` now reads `h-fit`. G.W10 landed. Recorded so the ledger closes the row. |

## 7. Method / limits

Static and source-derived throughout. Two probes were **executed**, both read-only and both against non-product artifacts: `node -e` evaluating the class-concatenation expression verbatim (L-3), and `npx tsc --noEmit --listFilesOnly` counting `.vue` files in the program (L-17). No file in keyframes.js, glass-ui, or value.js was written or mutated; no installs, no dev server, no browser. glass-ui claims are sourced from the **installed** `node_modules/@mkbabb/glass-ui/dist/` (7.0.0) — the copy this component actually resolves against.

**UNPROVEN-NEEDS-LIVE (deferred to the SS-13 visual audit):** the pixel-level outcome of L-7 (typed-text/caret clobber — mechanism source-proven, visible severity depends on frame-vs-typed-text equality); the rendered contrast of the selected cell under L-3 once `focus:font-bold` is the only surviving rule; and whether L-1's render throw blanks the panel alone or a larger subtree (Vue's propagation with **zero** `errorCaptured` handlers anywhere in `demo/`).
