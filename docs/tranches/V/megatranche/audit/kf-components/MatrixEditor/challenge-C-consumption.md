claude-opus-5[1m]

# CHALLENGE · `MatrixEditor.vue` · axis **C — CONSUMPTION**

**Target:** `/Users/mkbabb/Programming/keyframes.js/demo/scenes/cube/matrix-editor/MatrixEditor.vue` (158 lines)
**Axis:** how this component consumes **keyframes.js** (the library) and **glass-ui** (the design system) — subpath choices, shadow components (S-1..S-8 census), value.js transitive exposure (the R1 parser-crash class where reachable), props/emits contract quality, sibling integration seams.
**Mode:** static, read-only. No installs, no dev server, no browser tooling. Every livable-only claim is marked `UNPROVEN-NEEDS-LIVE` for the SS-13 visual audit.
**Date:** 2026-08-06. Paths below are relative to `/Users/mkbabb/Programming/keyframes.js/` unless absolute.

**Read whole, read-only:** the target; `matrix-editor/transformMath.ts`; `matrix-editor/useTransformState.ts`; `scenes/cube/CubeScene.vue` (sole consumer, `:51`, `:173`); `state/controlOptionsStore.ts`; `state/hashSharing.ts`; `demo/env.d.ts`; `tsconfig.json`; `.github/workflows/ci.yml`; `package.json`; and — as installed evidence — `node_modules/@mkbabb/glass-ui@7.0.0/dist/components/{card,input,slider,number-field,surface,_shared}/*.d.ts`, `dist/Input-DY7soIPd.js`, `dist/field-control-CeLay9Tk.js`, `node_modules/@mkbabb/value.js@4.0.0/dist/subpaths/value.d.ts`.

**Tally: 17 defects · 1 BLOCKER · 3 superlatives.**

---

## 0. Headline

| id | severity | claim | anchor |
|---|---|---|---|
| **C-1** | **BLOCKER** | Emitting an unvalidated string into the sibling's `parseFloat` produces `NaN`, which throws inside a rAF frame callback that has **no** try/catch — uncaught error + a permanently un-rescheduled, never-resolving `RAFPlayback`. Reached by clearing a cell or typing a leading `-`. | `:33`,`:123` → `useTransformState.ts:79,87-92` |
| C-2 | MAJOR | `:start` / `:end` / `:step` are **not** glass-ui `InputProps`. All three fall through `inheritAttrs:false` onto a bare `<input type="text">` — the entire bounds/step wiring is inert. | `:34-36` vs `dist/components/input/types.d.ts` |
| C-3 | MAJOR | String `+` array concatenation with a **missing trailing space** fuses `text-ellipsis` + `font-bold` into the junk token `text-ellipsisfont-bold`; the selected-cell bold affordance is dead except on focus. | `:20-21` |
| C-4 | MAJOR | Both controls wire the **continuous** `update:modelValue`; each emission spawns a fresh 300 ms `NumericAnimation`. glass-ui 7.0.0 ships `valueCommit` for exactly this and it is ignored. | `:33`,`:67` vs `dist/components/slider/Slider.vue.d.ts` |
| C-5 | MAJOR | `selectedMatrixCell` is read/written at **7 sites** but is absent from `StoredAnimationGroupControlOptions["matrixOptions"]`. Prior ruling (tranche R) prescribed the fix; unlanded. | `:22,38,64,71,77,82,87` vs `controlOptionsStore.ts:26` |
| C-6 | MAJOR | Initialization-ownership inversion: the leaf owns a store default that a **sibling** dereferences unguarded — against the boundary the store module states in prose for itself. | `:115-120` vs `CubeScene.vue:194`, `controlOptionsStore.ts:90-94` |
| C-7 | MAJOR | Dead emit: `resetMatrix` is declared, a local `resetMatrix()` is defined, the parent **wires** `onResetMatrix` — and nothing can ever fire it. | `:110`,`:136-138`,`CubeScene.vue:178` |
| C-8 | MAJOR | Shadow component (**new: S-9**). This is a hand-rolled bounded number field. glass-ui 7.0.0 ships `/number-field`; the whole demo reaches it **zero** times. | `:16-40` vs `dist/components/number-field/types.d.ts` |
| C-9 | MAJOR | The props/emits contract is **unenforced by construction** — no `vue-tsc` anywhere, `check` is bare `tsc`, CI runs `check:lib` (src/ only), and `*.vue` is ambiently `DefineComponent<{},{},any>`. | `package.json`, `demo/env.d.ts:3-7`, `ci.yml:42` |
| C-10 | MAJOR | Unsound value.js narrowing: `.payload.value` on `CssValue = CssScalar \| CssCall \| CssList`, bypassing the guarded accessor the sibling exports. | `:29`,`:133` vs `value.d.ts:35-62`, `transformMath.ts:91-104` |
| C-11 | MINOR | Three subpath policies in one 2-line import block: root barrel, `/forms`, and two unused dedicated subpaths. | `:97-98` |
| C-12 | MINOR | No accessible name on the Slider or on any of the 16 Inputs. Ruled SHIP/demo-owned in tranche C; unlanded. `/labeled-field` is already a demo idiom elsewhere. | `:16`,`:61` |
| C-13 | MINOR | Display formatting is internally inconsistent: `1 → "1"` but `1.5 → "1.50"` and `0.1 → "0.10"`; the `Math.round` is dead work before `toFixed(2)`. | `:28-32` |
| C-14 | MINOR | `superKey: string` re-widens the store's `SceneId` union at the prop seam. | `:105` vs `controlOptionsStore.ts:66-70` |
| C-15 | MINOR | The module-level default object is installed **by reference** and then mutated in place; the store module `structuredClone`s for exactly this reason, twice. (Latent — falsifier partially fires; see body.) | `:115-120`,`:38` |
| C-16 | MINOR | The sibling metadata contract is domain-wrong for 10 of 16 cells: rotational/skew/perspective cells all inherit `rotate` bounds `[-360,360] step 1`. | `transformMath.ts:164-180` consumed at `:34-36,75-89` |
| C-17 | MINOR | Per-frame vnode churn: the parent's slot reads `matrix3dEnd.value`, so every animation frame re-renders the slot and re-allocates 16 scalar objects + the 17-control subtree. | `CubeScene.vue:170-181`, `transformMath.ts:69-89` |

| id | superlative |
|---|---|
| ★-1 | `<Card cartoon tier="quiet">` is **API-correct against the installed 7.0.0** and is the exact ratified H.W9 register — it does **not** repeat the documented `<Card plain>` no-op class. |
| ★-2 | Zero shadow primitives, zero direct `reka-ui`, zero local `ui/` copies; the bespoke CSS is 16 lines of token plumbing over tokens that **do** exist. Census F-6 GREEN holds here. |
| ★-3 | The value.js coupling is **type-only** and correctly `import type`-formed; MatrixEditor reaches zero value.js runtime symbols, so the **R1 `parseCssColor` crash class is NOT reachable** from this component. |

---

## 1. BLOCKER

### C-1 — the emit contract forwards an unvalidated string into a rAF callback that cannot survive `NaN` · **BLOCKER**

**Chain, whole:**

`MatrixEditor.vue:33` — `@update:model-value="(v) => updateMatrixCell(v, i)"`, where `v: string | number` (glass-ui's declared emit, `dist/components/input/Input.vue.d.ts`: `"update:modelValue": (value: string | number) => any`).

`MatrixEditor.vue:122-124` — the local handler validates **nothing**:

```ts
const updateMatrixCell = (to: number | string, ix: number) => {
    emit("updateMatrixCell", to, ix);
};
```

`useTransformState.ts:79` — `const toNum = typeof to === "string" ? parseFloat(to) : to;` — no `Number.isFinite` guard.

`useTransformState.ts:87-92`:

```ts
void new NumericAnimation([{ value: from }, { value: toNum }], { duration: 300 })
    .play(({ value }) => {
        matrix3dEnd.value = withMatrixCell(matrix3dEnd.value, ix, value);
        syncTransformations();
    });
```

`transformMath.ts:143-145` — `withMatrixCell` **throws** on non-finite: `if (!Number.isFinite(value)) throw new TypeError(...)`.

`src/animation/physics/numeric.ts:243-250` → `RAFPlayback.play` → `src/animation/physics/playback.ts:113-146` `_run`/`frame`. The frame body is:

```ts
const frame = (now: number): void => {
    const result = step(now);          // ← onFrame?.(values) is called inside step
    if (result && typeof (result as Promise<boolean>).then === "function") { … }
    else { reschedule(result as boolean); }
};
```

There is **no try/catch** on `step(now)` anywhere in `playback.ts` (`grep -n "catch" src/animation/engine/*.ts src/animation/physics/playback.ts` → the only `catch` in the engine is `play-lifecycle.ts:306`, an unrelated WAAPI halt).

**Reachability — ordinary use, not adversarial.** Verified by execution:

```
parseFloat("")  -> NaN      parseFloat("-") -> NaN      parseFloat(".") -> NaN
parseFloat("0.") -> 0       parseFloat("0.5") -> 0.5    parseFloat("abc") -> NaN
```

Select-all-and-Delete in a matrix cell (the ordinary way to retype a value) emits `""`. Typing a negative value emits `"-"` on the first keystroke. Both give `NaN`.

**Observable consequence, precisely:** `at(0)` computes `from + (NaN − from)·0 = NaN` (the segment delta is precomputed into a `Float64Array`, `numeric.ts:135-140`), so the throw lands on frame 1. Because the throw escapes `frame`, `reschedule` is never called → `_cleanup()` never runs → `_rafId` stays non-null forever, `running` reports `true` forever, and the `play()` promise **never settles**. `matrix3dEnd.value` is never assigned (the throw precedes it), so the cell silently refuses the edit. Every `NaN` emission leaks one orphaned, unstoppable playback — and `void new NumericAnimation(...)` discards the only handle that could `stop()` it.

**Why the component owns this, not the sibling.** `useTransformState` is a scene composable with a `number | string` contract; MatrixEditor is the sole producer of the `string` arm and the only place that knows the field is a free-text control (C-2). The bounds it *believes* it passed (`:34-36`) do not exist. The one-line fix lives here.

**Falsifier.** Show that (a) glass-ui's `Input` never emits on an empty/partial value — refuted: `dist/Input-DY7soIPd.js` binds `vModelDynamic` with no `.lazy` and `useVModel(..., { passive: true })`, so it emits on every `input` event; or (b) `RAFPlayback` wraps `step` in a try/catch — refuted by grep above; or (c) some ancestor `errorCaptured`/`app.config.errorHandler` intercepts a throw raised inside a **rAF** callback — it cannot; rAF escapes Vue's call stack entirely. `UNPROVEN-NEEDS-LIVE` only for the console-visible artifact; the code path is closed statically.

---

## 2. Consumption of glass-ui

### C-2 — `:start` / `:end` / `:step` are not `InputProps`; the cell field has no bounds at all · MAJOR

`MatrixEditor.vue:34-36`:

```
:start="matrixCellMeta[i].sliderOptions.bounds[0]"
:end="matrixCellMeta[i].sliderOptions.bounds[1]"
:step="matrixCellMeta[i].sliderOptions.step"
```

The installed contract (`dist/components/input/types.d.ts`) declares exactly: `autocomplete, class, defaultValue, disabled, enterkeyhint, form, inputmode, invalid, maxlength, minlength, modelValue, name, pattern, placeholder, readonly, required, size, type`. **No `start`, no `end`, no `step`, no `min`, no `max`.**

`dist/Input-DY7soIPd.js` sets `inheritAttrs: !1` and spreads `forwardedAttrs` onto the `<input>`; `dist/field-control-CeLay9Tk.js` shows `forwardedAttrs` strips exactly one key (`aria-invalid`) and passes everything else through. So all three land as literal DOM attributes on an element whose `type` defaults to `"text"` (`Input.vue.d.ts` default block: `type: "email" | … | "url"`, default `"text"`).

Net: `step` is inert on `type=text` per HTML spec; `start` and `end` are not `<input>` attributes at all. The bounds computed by `getSliderOptionsFromIx` and threaded through `matrixCellMeta` reach the field and do nothing. The field accepts `"potato"`.

This is C-1's enabling condition and is independently a MAJOR: the component's own source reads as though the field is bounded.

**Falsifier.** Point to a `start`/`end`/`step` prop on glass-ui 7.0.0's `Input`, or a wrapper that intercepts them before `forwardedAttrs`. Neither exists in the installed `dist/`. (Note: this is *not* a version-drift excuse — 7.0.0 is what is on disk and what F-1 says is unreproducible; see C-9's note.)

### C-3 — a missing trailing space fuses two Tailwind tokens · MAJOR

`MatrixEditor.vue:16-27`. Byte-exact (verified with a space-visualizing dump): line 20 is `····························text-ellipsis\`·+` — the template literal ends at `text-ellipsis` with **no** trailing space, then `+ [ … ]`.

Executed:

```
SELECTED   tail tokens: ["font-mono", "text-ellipsisfont-bold", "focus:font-bold"]
UNSELECTED tail tokens: ["font-mono", "text-ellipsis"]
```

So on the **selected** cell — the one cell the affordance exists for — `text-ellipsis` is destroyed **and** `font-bold` is destroyed; only `focus:font-bold` survives, so the cell reads bold only while focused. The design intent (a persistent selected-cell weight cue, coordinated with the Slider below) is not delivered.

The proof that this is an omission and not a style: the **sibling site 20 lines down** uses the identical `string + array` idiom and **does** carry the space — line 46 is `····························dark:opacity-75·\`·+`. Same author, same file, one space apart in outcome.

**Falsifier.** Show a Tailwind `safelist`/plugin that emits `.text-ellipsisfont-bold`, or a `normalizeClass` path that inserts a separator between a string and a coerced array (Vue's `normalizeClass` passes a `string` through verbatim — `+` has already run before Vue sees it). Neither exists. `UNPROVEN-NEEDS-LIVE` only for the rendered weight; the class string is proven.

### C-4 — continuous `update:modelValue` wired where `valueCommit` exists · MAJOR

`MatrixEditor.vue:61-91` binds the Slider's `@update:model-value`. glass-ui 7.0.0's Slider declares **two** emits (`dist/components/slider/Slider.vue.d.ts`):

```
"update:modelValue": (payload: number[] | undefined) => any;
valueCommit: (payload: number[]) => any;
```

`update:modelValue` is per-pointermove. Each emission runs `updateMatrixCell` → **a new 300 ms `NumericAnimation`** (`useTransformState.ts:87`). A one-second drag therefore spawns ~60 overlapping animations, every one of them writing `matrix3dEnd.value` on its own rAF frame for the next 300 ms, all fighting. None is retained, so none can be `stop()`ed.

The same defect on the text field: `:28-32` derives `:model-value` **from `matrix3dEnd`**, and `:33` feeds `matrix3dEnd` back through a 300 ms animation. Typing is therefore a closed loop in which the animation stomps the user's in-progress text between keystrokes.

`valueCommit` is the shipped, named remedy for the Slider arm and is not used anywhere in the file.

Secondary, same line: the inline handler is annotated `(val: number[])` while the emit's declared payload is `number[] | undefined`; `val[0]` on `undefined` throws. Low probability under reka's runtime, and **it is a MINOR rider, not a separate finding** — but it is invisible precisely because of C-9.

**Falsifier.** Show that `updateMatrixCell` de-duplicates or cancels the in-flight animation (`useTransformState.ts:78-93` — it does not; it discards the instance with `void`), or that reka's `SliderRoot` emits only on commit (it does not; `update:modelValue` is its continuous channel and `valueCommit` exists precisely because of that).

### C-8 — S-9: a hand-rolled bounded number field over a text `Input` · MAJOR · **new census row**

Folding the hitherto corpus rather than re-inventing it: `lane-frontend.md` §5 enumerates shadow components **S-1..S-8**, and §3.1 measures subpath utilisation at **21/73 ≈ 29 %**, naming `/number-field` explicitly among "the unreached 52 … several of which are exactly what the bespoke components below reimplement."

This component is that case, and it is **not** in S-1..S-8. It composes `Input` + three inert bound attributes (C-2) + a bespoke display formatter (C-13) + a separate `Slider` for the selected cell — i.e. it reconstructs, badly, the control glass-ui already ships:

`dist/components/number-field/types.d.ts`
```ts
export interface NumberFieldProps extends NumberFieldRootProps { invalid?: boolean; class?: … }
```
with `"update:modelValue": (val: number) => any` — a **`number`** payload, which alone would have made C-1 unreachable — and reka's `min`/`max`/`step`/`formatOptions`/`locale` doing the work of C-2 and C-13.

`grep -rn "number-field\|NumberField" demo/` → **0 hits** across the whole demo.

I file this as **S-9** and note it strengthens `lane-frontend.md` §5's "Evaluate" column rather than contradicting it.

**Falsifier.** Show a documented rationale in-tree for rejecting `NumberField` (there is none — unlike S-8 `TypingDots`, which carries its justification), or show `/number-field` missing from the installed exports map (it is present: `node -e` over `package.json.exports` lists `./number-field`).

### C-11 — three subpath policies in one 2-line import block · MINOR

```ts
import { Slider, Card, CardContent } from "@mkbabb/glass-ui";   // :97  root barrel
import { Input } from "@mkbabb/glass-ui/forms";                  // :98  dedicated subpath
```

`./card` and `./slider` both exist in the installed exports map (verified), and `./forms` is used correctly. The file thus demonstrates two of the three available policies simultaneously and picks the coarse one for the two components it uses most. This matches `lane-frontend.md` §3.1's "31 × root barrel" concentration; I extend it with the observation that here the root barrel is chosen **beside** a subpath import on the next line, which makes it a per-file inconsistency, not just a tree-wide habit.

**Falsifier.** Show that `@mkbabb/glass-ui` root and `@mkbabb/glass-ui/card` resolve to the same chunk graph under the demo's Vite config such that the choice is provably free. I did not run a bundle — so I keep this at **MINOR** and claim only *incoherence*, not measured cost. Bundle-size impact is `UNPROVEN-NEEDS-LIVE`.

### C-12 — no accessible name on any control · MINOR

`:61` renders a bare `<Slider>`; `:16` renders 16 bare `<Input>`s. Neither carries `aria-label`, and neither is wrapped in a label.

This is **already ruled**: `docs/tranches/C/audit/design-findings.txt:243-245` — "*[high] MatrixEditor raw `<Slider>` and EditableLabel rename `<input>` have no accessible name*", disposition **SHIP (demo-owned)**, with the prescribed fix `:aria-label="\`matrix cell ${matrixCellMeta[selectedCell].axis}\`"`. It has not landed. I record it here at MINOR (not repeating the original severity) solely because the axis is consumption: glass-ui ships `/labeled-field` and the demo already uses `LabeledSlider` from it at `scenes/easing/EasingSidebar.vue:71` and `scenes/spring/SpringPhysicsFacet.vue:130` — the idiom exists in-tree and this component declines it.

**Falsifier.** Show an `aria-labelledby` reaching these controls from an ancestor, or a glass-ui-internal default name. `dist/components/slider/Slider.vue.d.ts` forwards `$attrs` and supplies no default name.

---

## 3. Props / emits contract quality

### C-9 — the contract is unenforced by construction · MAJOR

Four independent facts, each verified:

1. `package.json` → `"check": "tsc --noEmit && tsc --noEmit -p tsconfig.test.json"`. **Bare `tsc`.** It cannot parse `.vue`; `include: ["src/", "demo/"]` collects `.ts`/`.d.ts` only.
2. `grep -rn "vue-tsc" --exclude-dir=node_modules .` → hits only in `package-lock.json` (a transitive peer range) and in *documentation of other repos*. **No `vue-tsc` devDependency, no script.**
3. `.github/workflows/ci.yml:42` runs `npm run check:lib` — `tsconfig.lib.json`, `src/` only. The demo's `.ts` files are not typechecked in CI either; the `.vue` files are not typechecked **anywhere**.
4. `demo/env.d.ts:3-7` declares `*.vue` as `DefineComponent<{}, {}, any>`.

Consequence for this component specifically: `CubeScene.vue:173-179` constructs it via `h(MatrixEditor, { matrix3dEnd, matrixCellMeta, superKey, onUpdateMatrixCell, onResetMatrix })` against a `DefineComponent<{}, {}, any>`. The `defineProps`/`defineEmits` block at `:102-111` is **documentation**: no tool checks that the parent supplies it, and no tool checks that the component's own template respects glass-ui's props. C-2, C-3, C-4's variance rider, C-5 and C-10 are all things a `vue-tsc` run would have caught; **none** would be caught today.

This is not a new discovery so much as a *re-confirmation with the current tree*: tranche S already recorded the caveat — `docs/tranches/S/S.md:321`, "*the project's `check` is bare `tsc` (no `vue-tsc`) — the `.vue` render path is [unchecked]*", and `docs/tranches/S/audit/pass1/SPEC-v2.md:189,777` names it "the bare-tsc caveat (p05)". I extend it: CI is narrower still (`check:lib`, not `check`), so even the `.ts` half is unverified on merge.

It also compounds `lane-frontend.md` **F-1** (glass-ui phantom-dep, RED): the version this component is written against is neither declared nor locked *and* the props it passes to that version are never checked. Both halves of the resolution contract are open.

**Falsifier.** Show a `vue-tsc`/`vti`/`volar` invocation in any script, hook, or workflow in the repo, or an IDE-independent gate that parses SFC templates. `.githooks/` and the `proof:*` battery were checked via `package.json` scripts — `proof:publish` is a published-surface boundary gate over `src`, not a demo typecheck.

### C-7 — the `resetMatrix` emit is dead in all three directions · MAJOR

- `:108-111` declares `(e: "resetMatrix"): void`.
- `:136-138` defines `const resetMatrix = () => { emit("resetMatrix"); };`
- The **template contains no reference to `resetMatrix`** — no button, no handler, nothing (`:1-94`, read whole).
- The parent nonetheless wires it: `CubeScene.vue:178` `onResetMatrix: resetMatrix`.
- The real reset is a **direct call** from the parent's own ribbon: `CubeScene.vue:189` `onClick: () => resetMatrix()` on a `Button` the parent renders itself.

So the emit advertises a seam that cannot fire, the local function is unreachable, and the parent's wiring is a no-op that reads as evidence the seam is live. Under C-9, nothing flags either the unused local or the dead listener.

**Falsifier.** Find any `resetMatrix` reference inside the template or a `defineExpose` that surfaces it — `grep -n "resetMatrix" MatrixEditor.vue` returns exactly `:110`, `:136` (definition), `:137` (the emit call). Nothing invokes it.

### C-5 — `selectedMatrixCell` is not in the store's type; the store is fed by unvalidated URL input · MAJOR

`state/controlOptionsStore.ts:26` — `matrixOptions?: { fixed: boolean };`

`MatrixEditor.vue` reads or writes `matrixOptions.selectedMatrixCell` at `:22`, `:38`, `:64`, `:71`, `:77`, `:82`, `:87` — **seven** sites, none of them typed. It is introduced only at `:117` inside a local literal (`defaultMatrixOptions`) that is assigned through `??=` at `:120`; because the RHS is a *variable*, no excess-property check applies, so even a typechecked build would only fail at the *read* sites — which C-9 guarantees are never checked.

This is a **standing, prescribed, unlanded finding**: `docs/tranches/R/audit/demo-composables-state.md:182` states it verbatim ("*`selectedMatrixCell` is not in the type … every write/read is an implicit `any` property access*") and `:190` prescribes the remedy ("*Move `defaultMatrixOptions` out of `MatrixEditor.vue` into `controlOptionsStore.ts` … eliminates the `??=` runtime mutation anti-pattern*"). I confirm the tree still matches the R-era description in every particular except the default's `fixed` value (R records `false`; the tree now has `true` at `:116`).

**The consequence is not merely cosmetic.** The store is writable from an untrusted URL: `state/hashSharing.ts:56-64` decodes a base64 hash and calls `applySharedControlState(state.controls)`; `isValidState` (`:29-45`) validates only that `controls` is a non-null object. `applySharedControlState` (`controlOptionsStore.ts:59-64`) then `Object.assign`s each bucket verbatim, with **no per-field shape check**. A payload carrying `controls.cube.matrixOptions = {}` (or `{ fixed: true }`) makes `matrixOptions` truthy, so `??=` at `:120` does **not** fire, and `selectedMatrixCell` stays `undefined`. Render then evaluates `:62-65` → `matrixCellValue(undefined)` → `props.matrix3dEnd.args[undefined]` → `undefined` → the component's own `throw new RangeError` at `:129`. Render throws; the controls panel goes.

**Falsifier — and it constrains the severity.** I could not demonstrate a *shipped* build that produced such a bucket: `selectedMatrixCell` has been in the default since at least tranche R, and the only in-tree writer supplies both keys. So the crash requires a **hand-crafted or cross-version** share link, not an ordinary session. That is why this is MAJOR and not BLOCKER. To kill it entirely, show a shape-validating guard on `applySharedControlState` — `controlOptionsStore.ts:59-64` has none, only `typeof value === "object"`.

### C-6 — initialization-ownership inversion · MAJOR

`MatrixEditor.vue:115-120`:

```ts
const defaultMatrixOptions = { fixed: true, selectedMatrixCell: 0 };
storedControls.matrixOptions ??= defaultMatrixOptions;
```

A leaf, presentational component owns the store default. Two problems:

**(a) A sibling dereferences it unguarded.** `CubeScene.vue:194` — `storedControls.matrixOptions.fixed = !storedControls.matrixOptions.fixed;` — with no `?.`, while the *same file* two lines later uses `storedControls.matrixOptions?.fixed` at `:197` and `:198`. CubeScene never initializes `matrixOptions` (it initializes only `ppMode`, `:63`). So the parent's Fixed/Free toggle is safe **only** because MatrixEditor happened to mount and run its `??=`. The demo's own comment at `channel-controls/ChannelControls.vue:32` and `:180` shows `tabs-content` has **two** render sites under a `v-if`/`v-else` layout branch — so "MatrixEditor is always mounted whenever the ribbon is" is an assumption about layout, not an invariant.

**(b) It contradicts the store module's stated boundary.** `controlOptionsStore.ts:90-94`:

> *"Persisted pre-U.B4 buckets may predate the editor-state member. **The store owns this one migration/default boundary; editor components only consume it.**"*

— and then does `controls.keyframeControls ??= structuredClone(default.keyframeControls)` *inside the store*. `matrixOptions` is the identical problem solved in the wrong place. Note also that the store's own defaults are `structuredClone`d at `:81` and `:92`; MatrixEditor's is not (C-15).

**Falsifier.** Show that `matrixOptions` is defaulted inside `state/` — `grep -rn "matrixOptions" demo/` returns exactly the 12 lines listed in C-5 plus `CubeScene.vue:194,197,198` and `controlOptionsStore.ts:26` (the type only). There is no store-side default. For (a) specifically: show that the ribbon slot cannot render while the `tabs-content` slot does not — I could not prove it either way statically, so **(a) is marked `UNPROVEN-NEEDS-LIVE`**; (b) is proven from source and carries the finding.

### C-14 — the `superKey` prop re-widens `SceneId` to `string` · MINOR

`:105` — `superKey: string;`. `CubeScene.vue:60` passes `SCENE_ID`, and `getStoredAnimationGroupControlOptions` (`controlOptionsStore.ts:66-70`) accepts `KeyframesAnimation<any> | SceneId | undefined`, with a comment declaring "*the ONE keyspace: the store keys by the registry `SceneId`*". The prop erases that union at the boundary, so any string reaches the store and silently seeds a fresh bucket (`:76-83`). `SceneId` would type it exactly and is already importable from `@state`.

**Falsifier.** Show `SceneId` is itself `string` (it is a discriminated scene-id union in `state/sceneMachine.ts`, referenced as such at `controlOptionsStore.ts:9,69`), or show that the demo intentionally admits non-registry keys (T.B9's comment says the opposite).

---

## 4. value.js transitive exposure

### ★-3 (superlative) — R1 is **not** reachable here

`transformMath.ts:1`:

```ts
import type { CssCall, CssScalar, CssValue } from "@mkbabb/value.js/value";
```

Correctly `import type`-formed under `verbatimModuleSyntax: true` (`tsconfig.json`), so it is fully erased at build. `MatrixEditor.vue` itself imports **no** value.js specifier at all (`:97-100`, read whole) — its only value.js contact is this erased type edge, one hop away.

Therefore the **R1 class** (`parseCssColor("oklch()")` shipping crash) has no path through this component. Corroborated by the hitherto corpus rather than asserted: `lane-library.md` §4.6 enumerates the demo's parse consumers —

```
demo/scenes/square/useSquareTumble.ts:22   parseCssColor(css)   ← the known R1 crash surface
demo/scenes/square/useSquareDemo.ts:82     parseCssScalar(v)
demo/utils/keyframeSelector.ts:15
demo/utils/reference-data/animationDescriptions.ts:76
demo/components/instrument/keyframes/KeyframesEditor.vue:186
```

— and MatrixEditor is not among them. It also does not touch the failure-posture inconsistency catalogued at `lane-library.md` §7.5.

**Falsifier.** Show a runtime value.js symbol reaching this component. The nearest is `useTransformState.ts:1` (`easeInBounce` from `@mkbabb/value.js/easing`) and `:31` (`transformTargetsStyle` from the warmed kf engine) — both in the **sibling composable the parent owns**, and `transformTargetsStyle` is handed a structured `CssCall` (`:122`, `:208`), never a string, so no parse is entered even there. If a future wave moves the composable *into* this component, this superlative flips.

### C-10 — `.payload.value` on a `CssValue` union, bypassing the sibling's guarded accessor · MAJOR

`node_modules/@mkbabb/value.js/dist/subpaths/value.d.ts:35-62`:

```ts
export declare type CssCall   = Readonly<{ kind: "call"; name: string; args: readonly CssValue[] }>;
export declare type CssList   = Readonly<{ kind: "list"; separator: …; items: readonly CssValue[] }>;
export declare type CssScalar = Readonly<{ kind: "scalar"; payload: … }>;
export declare type CssValue  = CssScalar | CssCall | CssList;
```

`CssCall` and `CssList` have **no `payload`**. `Matrix3dCall.args` is typed `readonly CssValue[]` (`transformMath.ts:42`) — the widest arm.

MatrixEditor reaches straight through it, twice:

- `:29` (template) — `value.payload.value` over `v-for="(value, i) in matrix3dEnd.args"`.
- `:127-133` (script) — `const cell = props.matrix3dEnd.args[index]; … return cell.payload.value;` — guarded for `undefined` but **not** for the union arm.

The sibling module already solved this and **exports the solution**: `transformMath.ts:91-104` `matrixValueAt` narrows on `kind`, `payload.type`, `payload.unit`, and finiteness before returning, and `matrixValues()` (`:106-130`) is the public 16-tuple accessor built on it. `useTransformState.ts:61,80,179` uses `matrixValues` consistently. MatrixEditor is the **only** consumer that hand-rolls an unsound reader instead — and it re-implements `matrixValueAt`'s `RangeError` message verbatim (`MatrixEditor.vue:129-131` vs `transformMath.ts:139-141`) while dropping every one of its type guards.

Under a `vue-tsc` build this is `TS2339: Property 'payload' does not exist on type 'CssCall'` at both sites. It compiles today only because of C-9.

**Falsifier.** Show that `Matrix3dCall["args"]` is narrower than `readonly CssValue[]` — `transformMath.ts:39-43` types it exactly that way, even though `createMatrix` (`:69-89`) only ever produces `MatrixScalar` (declared at `:30-37` and then *unused in the public type*). Narrowing `Matrix3dCall.args` to `readonly MatrixScalar[]` would kill this finding in one line — and is the fix I'd propose.

---

## 5. Sibling integration seams

### C-16 — the consumed cell metadata is domain-wrong for 10 of 16 cells · MINOR

`transformMath.ts:164-180`:

```ts
getTransformFromIx: 12|13|14 → "T";  0|5|10 → "S";  3|7|11 → "P";  else ""
getSliderOptionsFromIx: "T" → translate;  "S" → scale;  everything else → rotate
```

so `"P"` (perspective, cells 3/7/11) and `""` (the rotation/skew components 1/2/4/6/8/9 and the homogeneous `w` at 15) all inherit `rotate`: `bounds [-360, 360]`, `step 1` (`:16-20`).

MatrixEditor binds these to **both** controls (`:34-36` for the Input, `:75-89` for the Slider). For a `matrix3d`, the rotation/skew components are direction cosines in `[-1, 1]` and the perspective terms are on the order of `1e-3`. A `step: 1` slider spanning `[-360, 360]` gives those 10 cells roughly **three usable stops out of 721**, and `m15` (normally exactly `1`) gets a ±360 range.

Related, same seam: the `scale` bounds are `[0.4, 3]` (`:18-21`), but nothing constrains `matrix3dEnd[0|5|10]` to that interval — `updateTransformations` (`useTransformState.ts:129-175`) composes freely and `animateUpdateMatrix` interpolates through arbitrary values. When the value sits outside, reka clamps the Slider's *display*, silently diverging from the Input beside it.

I attribute the metadata to `transformMath`, but file it here because MatrixEditor is its **only** consumer and the only place the mismatch is observable.

**Falsifier.** Show a deliberate design note choosing a coarse uniform range (none exists in `transformMath.ts` or `docs/frontend-design/demo/cube.md`), or show that cells 1/2/4/6/8/9 are meaningfully edited at unit granularity. Live feel is `UNPROVEN-NEEDS-LIVE`; the numeric mismatch is arithmetic.

### C-17 — the parent slot re-renders the whole grid every animation frame · MINOR

`CubeScene.vue:170-181` — `tabsContent` is a render function passed through `defineExpose` and mounted by `App.vue:62` as `<component :is="sceneRef.tabsContent" />`. It dereferences `matrix3dEnd.value` (`:174`) inside that render, so the functional component subscribes to it.

Every frame of every `NumericAnimation` reassigns `matrix3dEnd.value` to a **fresh** object (`withMatrixCell` → `createMatrix`, `transformMath.ts:132-148` → `:69-89`), allocating 16 new `MatrixScalar` objects. Each such write re-renders the slot, which re-creates the `MatrixEditor` vnode with a new `matrix3dEnd` identity, which patches 16 `Input`s + 1 `Slider`. During a drag this compounds with C-4's overlapping animations.

**Falsifier.** Show memoization on the slot (`App.vue:61-63` has none) or that `createMatrix` returns a stable reference (it does not — `:84-88` returns a fresh literal). Frame-cost impact is `UNPROVEN-NEEDS-LIVE`; the allocation and invalidation counts are static.

---

## 6. Presentation-contract riders

### C-13 — the display formatter is internally inconsistent and does redundant work · MINOR

`:28-32` — `(Math.round(value.payload.value * 100) / 100).toFixed(2).replace(/\.0*$/, "")`. Executed:

```
1     -> "1"        1.5   -> "1.50"     0.1   -> "0.10"
0     -> "0"        -0.25 -> "-0.25"    1.005 -> "1"
```

The regex `/\.0*$/` only fires when *every* character after the decimal point is `0`, so integers lose their `.00` while `1.5` keeps a padded `1.50` and `0.1` keeps `0.10`. Across a 4×4 grid whose identity diagonal is `1` and whose off-diagonal is `0`, the result is a mixed-precision readout in a control whose whole job is a legible matrix. The `Math.round(v * 100) / 100` is also dead work — `toFixed(2)` already rounds to two places.

`NumberField`'s `formatOptions` (C-8) is the shipped answer.

**Falsifier.** Show the mixed widths are intentional (nothing in `docs/frontend-design/demo/cube.md:86,125,240,340` asks for it; `:125` in fact calls the editor "*a competent form, not a control surface*"). Visual verdict is `UNPROVEN-NEEDS-LIVE`; the string outputs are executed fact.

### C-15 — the module-level default is installed by reference and then mutated · MINOR (latent)

`:115-120` assigns the **module singleton** `defaultMatrixOptions` into the reactive store via `??=`; `:38` then mutates it through the proxy (`storedControls.matrixOptions.selectedMatrixCell = i`), writing to the raw module object. `defaultMatrixOptions` is no longer a default after the first click. The store module avoids exactly this with `structuredClone` at `controlOptionsStore.ts:81` and `:92`.

**Falsifier — and it partly fires, honestly.** The only reset path is `MbabbMenu.vue:117` `clearAllAndReload()`, which the function name and the `:106-107` comment confirm **reloads the page**, discarding module state. And on any remount without a reload, `matrixOptions` is already persisted, so `??=` never re-fires. I could construct no path where the dirtied default is observed. **Kept at MINOR as a latent correctness defect, not an observable bug** — it is one added scene/instance away from mattering, and it is a one-word fix (`structuredClone`) that the file's own store already models.

---

## 7. Superlatives (L-18, running the other way)

### ★-1 — the Card surface call is correct against the installed API *and* the ratified register

`:2` — `<Card cartoon tier="quiet">`.

Verified against what is on disk, not against prose. `dist/components/card/Card.vue.d.ts`:

```ts
export interface CardProps extends SurfaceProps {
    /** Static Memphis edge treatment; it does not add command behavior. */
    cartoon?: boolean;   …
}
```

and `dist/components/surface/Surface.vue.d.ts` → `tier?: SurfaceTier`, with `dist/components/_shared/axes.d.ts` → `SURFACE_TIERS = ["wash","quiet","resting","floating","overlay"]`. Both attributes are **declared props**, so neither leaks to `$attrs`; `"quiet"` is a valid member.

This is materially better than the neighbourhood it sits in. `docs/tranches/H/waves/H.W2.md:37` records the class of bug it avoids: *"glass-ui's Card has NO `plain` prop — `<Card plain>` stays `surface="glass"` … VERIFIED live"* — a dead boolean that silently kept the wrong surface. `MatrixEditor.vue:2` was one of the four sites named in that finding, and it is now the ratified `H.W9 S1` register (`docs/tranches/H/waves/H.W9.md:34` lists `MatrixEditor.vue:2` in the `tier="quiet"` cohort) **and** API-valid against 7.0.0.

**Falsifier (L-18 both ways).** If `cartoon` had been folded into `surface` in 7.0.0, this would be a repeat of the `plain` no-op. It was not — `cartoon` is a first-class boolean prop with its own default in the emitted `DefineComponent` default block. Checked, and the superlative survives.

### ★-2 — no shadow primitives, no `reka-ui` leakage, and the bespoke CSS is token plumbing over tokens that exist

Every interactive element in the file comes from glass-ui: `Card`, `CardContent`, `Slider` (`:97`), `Input` (`:98`). No local `ui/` copy, no direct `reka-ui` import, no re-skin. This holds `lane-frontend.md` **F-6** ("*Zero local `ui/` shadcn copies, zero direct `reka-ui` imports — the glass-ui boundary is otherwise clean*", GREEN) at the component level.

The only bespoke CSS is `:141-157` — four rules that do nothing but bind a semantic axis class to a design token:

```css
.x { --color: var(--axis-x); color: var(--color); }   /* … y, z, w */
```

**I attempted to falsify this and the tree defended it.** `MATRIX_AXES = ["x","y","z","w"]` (`transformMath.ts:4`) demands four tokens; the axis palette at `demo/styles/style.css:109-111` defines only `--axis-x/-y/-z`, which would have made the entire fourth matrix column (cells 3/7/11/15 — perspective + homogeneous) fall back to `inherit` at computed-value time. It does not: **`style.css:112` defines `--axis-w: var(--foreground)`**, a deliberate neutral for the non-spatial column. Hypothesis killed by the tree; recorded here because a near-miss defended is worth as much as one found.

The same block is also the site tranche J singled out as the demo's *one correct* Tailwind dark-variant callsite (`docs/tranches/J/audit/styling-design-system.md:125`: "*Only one Tailwind `dark:` callsite: `MatrixEditor.vue:51` (`dark:opacity-75`) — correct idiom for the class-based variant*"), and `:13-15` carries an explicit scoping disclaimer for its `z-10` ("*LOCAL stacking … not an editor z-contract layer*") — the same discipline the parent uses at `CubeScene.vue:130-132`. Consumption hygiene against a global z-system, written down.

**Falsifier.** Show a local shadow of any of the four imports, or a token used without definition. `grep` over the file's imports and over `--axis-*` across `demo/` + the glass-ui dist CSS returns nothing further.

### ★-3 — the value.js edge is type-only and R1-clean

Stated in full in §4 above. Summarised here for the tally: erased `import type` under `verbatimModuleSyntax`, zero runtime value.js symbols, absent from `lane-library.md` §4.6's demo parse-consumer roster, and untouched by §7.5's five-way failure-posture split.

---

## 8. Hypotheses raised and killed by the tree

Recorded so a later reader does not re-chase them, and as evidence the falsifiers were run rather than declared.

| hypothesis | verdict | killer |
|---|---|---|
| `--axis-w` is undefined → the 4th matrix column loses its axis colour | **KILLED** | `demo/styles/style.css:112` defines `--axis-w: var(--foreground)` |
| `<Card cartoon>` is a `plain`-style no-op (H.W2 S2 repeat) | **KILLED** | `dist/components/card/Card.vue.d.ts` declares `cartoon?: boolean` with a default |
| `tier="quiet"` is not a valid 7.0.0 tier | **KILLED** | `dist/components/_shared/axes.d.ts` — `SURFACE_TIERS` includes `"quiet"` |
| The `string + [array]` idiom at `:46` is also broken | **KILLED** | byte dump shows the trailing space is present there; only `:20` lacks it |
| The R1 `parseCssColor` crash class is reachable here | **KILLED** | no runtime value.js import; absent from `lane-library.md` §4.6 |
| The parent's `h(MatrixEditor, …)` loses reactivity by passing `matrix3dEnd.value` unwrapped | **KILLED** | `App.vue:62` mounts the render fn via `<component :is>`, so the read is tracked in that instance's own render effect — it re-renders correctly (and *too often*, which is C-17, a different defect) |
| A shared-state URL can trivially crash the editor | **DOWNGRADED** | needs a hand-crafted or cross-version payload; no shipped build is shown to emit a partial `matrixOptions` — hence C-5 is MAJOR, not BLOCKER |

---

## 9. Ordering for a remediation wave

Consumption-axis only; no product source was touched by this challenge.

1. **C-1** — clamp/validate at `:122-124` before emitting (`Number.isFinite` gate), *or* land C-8. This is the only BLOCKER.
2. **C-2 + C-8 together** — `NumberField` replaces `Input` + the three inert attributes and makes C-1, C-13 and half of C-4 structurally unreachable. File as **S-9** on the `lane-frontend.md` §5 census.
3. **C-9** — add `vue-tsc` and promote it into CI. Without it, C-2/C-3/C-5/C-10 re-grow. Note the ordering constraint from `lane-frontend.md` §6: **F-1 must land first** — glass-ui is undeclared and unlocked, so nothing here is reproducible until the dependency is declared.
4. **C-5 + C-6** — move `defaultMatrixOptions` into `controlOptionsStore.ts` beside the `keyframeControls` default, type `selectedMatrixCell`, `structuredClone` it (closes C-15), and guard `applySharedControlState`.
5. **C-3, C-7, C-13** — three independent one-liners (a space; two deletions; a formatter).
6. **C-4** — move the Slider to `valueCommit`; give the text field a commit-on-blur/Enter path.
7. **C-10** — narrow `Matrix3dCall["args"]` to `readonly MatrixScalar[]` in `transformMath.ts:42` and route both reads through `matrixValues`.
8. **C-16, C-17, C-11, C-12, C-14** — the tail; C-12 is already ruled SHIP and should ride whichever wave touches the markup.
