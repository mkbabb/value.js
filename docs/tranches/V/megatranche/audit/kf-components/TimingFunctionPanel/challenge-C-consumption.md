claude-opus-5[1m]

# CHALLENGE · `TimingFunctionPanel.vue` · axis C — CONSUMPTION

**Target** `keyframes.js/demo/components/instrument/transport/channel-controls/TimingFunctionPanel.vue` (166 lines)
**Axis** how this component consumes `@mkbabb/keyframes.js` (the library), `@mkbabb/glass-ui` (the design system) and `@mkbabb/value.js` (transitive): subpath choices, shadow-component posture, props/emits contract quality, integration seams with siblings.
**Posture** the component is assumed DEFECTIVE until the tree proves otherwise. Every claim carries severity + `file:line` + its falsifier. No browser tooling was used; two legs are marked `UNPROVEN-NEEDS-LIVE`.

**Tally** — defects **15** (BLOCKER 1 · MAJOR 6 · MINOR 5 · INFO 3) · superlatives **4**.

## Evidence base (read whole, read-only)

| file | why |
|---|---|
| `demo/…/channel-controls/TimingFunctionPanel.vue` | target |
| `demo/…/channel-controls/ChannelOptions.vue` | the sole call site (`:312-322`, `:427`) |
| `demo/…/channel-controls/composables/useTimingFunctionEditor.ts` | the sibling that owns the "ONE persist seam" |
| `demo/state/animationOptionsStore.ts` | `StoredAnimationOptions` |
| `demo/utils/reference-data/animationDescriptions.ts` | `timingFunctionKind` |
| `demo/utils/reference-data/timingCurveUtils.ts` | `cubicBezierEasing` (the throwing unwrap) |
| `demo/scenes/easing/EasingSidebar.vue` | the **sibling consumer of the same vendor primitive** — the control case |
| `node_modules/@mkbabb/glass-ui/dist/easing.js` + `dist/components/easing/**.d.ts` | the INSTALLED vendor contract (7.0.0) |
| `node_modules/@mkbabb/value.js/dist/subpaths/easing.d.ts` | `bezierPresets`, `jumpTerms`, `JumpPosition` |
| `src/animation/constants/types.ts`, `src/animation/easing.ts`, `src/animation/compile/easing/easing-option.ts`, `src/animation/waapi/eligibility.ts`, `src/animation/engine/{animation,options,option-setters}.ts` | the keyframes public easing contract |

**Hitherto corpus folded** — `formation/keyframes/lane-frontend.md` **F-1** (glass-ui phantom dep), **S-1..S-8** (shadow census); `formation/keyframes/lane-library.md` (value.js subpath census, the R1 parse-seam class); keyframes' own `docs/tranches/U/audit/lane-30-…:153` **F6** and `docs/tranches/U/waves/U.F.md:510` **BG-9**. Where the tree disagrees with those records I say so explicitly (C-2).

---

## The one sentence

This component consumes the *right* primitive for the *right* reason — and then wires it against a **vendor contract that no longer exists**. Every structural defect below descends from one stale premise at `TimingFunctionPanel.vue:26-27`.

---

# BLOCKER

## C-1 [BLOCKER] The `:key` is derived from the state the component itself writes — the first drag off any preset-matching curve remounts the picker mid-gesture and teleports it to `ease-out-back`

**Provenance**
- `TimingFunctionPanel.vue:33` — `:key="pickerKey"`
- `TimingFunctionPanel.vue:101` — `pickerKey = computed(() => \`${kind.value}:${seedPreset.value ?? "custom"}\`)`
- `TimingFunctionPanel.vue:92-99` — `seedPreset` reads `props.storedAnimationOptions.cubicBezierOptions.controlPoints`
- `TimingFunctionPanel.vue:143` — `onPickerChange` **writes** `…cubicBezierOptions.controlPoints = pts`
- `demo/state/animationOptionsStore.ts:68-71` — the store is `useStorage(…)` with **no options** ⇒ `@vueuse` default `deep: true`, so the write is tracked
- `glass-ui/dist/easing.js:17` — a fresh mount with `preset === undefined` seeds `points` from `"ease-out-back"`
- `TimingFunctionPanel.vue:120-128` — the fresh mount's immediate emission is then classified as a seed echo and **discarded**

**Full trace (source-derived, no runtime needed).** Entry is the pencil: `useTimingFunctionEditor.onEasingLabelClick` (`:196-210`) sets `controlPoints = [...NAMED_EASING_BEZIER["ease-in-out"]] = [0.42, 0, 0.58, 1]` and persists the literal `cubic-bezier(0.42, 0, 0.58, 1)`.

1. `kind` → `"cubic-bezier"`; `seedPreset` → `"ease-in-out"` (value.js `PRESETS["ease-in-out"] = [0.42,0,0.58,1]`, `easing.d.ts:49`). `pickerKey` = `"cubic-bezier:ease-in-out"`. The picker mounts correctly seeded. **So far, right.**
2. The user drags one handle. The picker emits `points = [0.43, 0.01, 0.58, 1]`. `isSeedEcho` → `quadEq(v.points, stored)` false; `seed` truthy ⇒ `return false` (`:129`). Not an echo.
3. `onPickerChange` writes `controlPoints = [0.43, 0.01, 0.58, 1]` (`:143`) and emits.
4. On the next flush `seedPreset` recomputes: **no** preset matches the dragged quad ⇒ `undefined`. `pickerKey` flips `"cubic-bezier:ease-in-out"` → `"cubic-bezier:custom"`.
5. Vue tears down and rebuilds `<EasingPicker>`. The new instance gets `:preset="undefined"` ⇒ `glass-ui/dist/easing.js:17` seeds `ease-out-back` `[0.175, 0.885, 0.32, 1.275]`.
6. `k(B, Ue, { immediate: !0 })` (`easing.js:210`) emits that quad. `isSeedEcho` takes the `!seed` branch (`:122-128`) and compares against `bezierPresets["ease-out-back"]` → **true** → discarded.

**Terminal state:** the canvas shows `ease-out-back`; the store and the live animation hold the half-finished drag; the in-flight pointer session is on an unmounted SVG. The user's first authored gesture visibly teleports the curve to an unrelated back-overshoot and their intent is destroyed.

This is *not* speculative: **the sibling consumer of the same primitive does it correctly.** `EasingSidebar.vue:98-119` builds `pickerSeed.key` from a monotonic `++seedCount` and mutates `pickerSeed` **only** from an explicit tile-selection `watch` (`:159-166`), never from authored points — and its comment states the invariant outright: *"A custom drag (name → 'cubic-bezier') does NOT remount — the picker already holds the authored points"* (`EasingSidebar.vue:23-24`). `TimingFunctionPanel` reproduces the idiom with the key wired to the wrong source.

**Falsifiers (all checked, none holds)**
- *"the store is shallow, so `seedPreset` never recomputes"* — `useStorage` is called with no options arg (`animationOptionsStore.ts:68-71`); `@vueuse` defaults `deep: true`. If a `{ shallow: true }` were added the defect evaporates.
- *"`quadEq`'s 0.0005 tolerance keeps matching the old preset"* — the picker quantizes to `.toFixed(3)` (`easing.js:28`); any drag exceeding 0.0005 in one coordinate breaks the match. Only a sub-quantum drag (which writes nothing at all) is exempt.
- *"the picker's `preset` prop is watched, so the remount is unnecessary but harmless"* — `easing.js:181-186` reads `c.preset` **once** into `initialPreset`; the only prop watcher is on `mode` (`easing.js:187-189`). The remount really is the only path — see C-2 for the one that isn't.
- *"named curves rarely match value.js presets"* — `NAMED_EASING_BEZIER` (`animationDescriptions.ts:16-49`) is quad-identical to value.js `PRESETS` for `ease/ease-in/ease-out/ease-in-out/…-sine/…-cubic/…-quad/…-quart/…-quint/…-expo/…-circ/…-back/linear`. Effectively **every** pencil entry point produces a preset-matching quad, i.e. the defect fires on the common path, not the rare one.
- **Kill condition:** show a mount with `:preset` bound and `pickerKey` stable across an authored drag, or a `v-model` that removes the key entirely.

---

# MAJOR

## C-2 [MAJOR · root cause] The vendor rationale is FALSE against the installed glass-ui — 7.0.0 has `modelValue` write-through; ~45 lines of this file are scaffolding for a closed gap

**Provenance**
- `TimingFunctionPanel.vue:25-31` — *"glass-ui 4.0.1's modelValue is emit-only — no external write-through / points-in prop"*
- `node_modules/@mkbabb/glass-ui/package.json:3` — installed version is **7.0.0**, not 4.0.1
- `glass-ui/dist/easing.js:197-210` — the write-through:
  ```js
  function We(e){ if(!e) return; if(q(J,e)){J=void 0;return}
    v.value = e.mode==="steps"?"steps":"bezier",
    Array.isArray(e.points)&&e.points.length===4&&e.points.every(Number.isFinite)&&
      e.points.some((e,t)=>e!==b.value[t])&&(N(0,e.points[0],e.points[1]),N(1,e.points[2],e.points[3])),
    Number.isFinite(e.steps)&&(P.value=Math.max(1,Math.min(12,Math.round(e.steps)))),
    I.includes(e.term)&&(F.value=e.term); … }
  k(l, We, { deep:!0, immediate:!0 });          // l = useModel(props,"modelValue")
  ```
  `N` is `setHandle`, `P` is `steps`, `F` is `term` (`easing.js:181`). This is a full external → internal write-through with an `immediate` seed pass.

The panel therefore does not need `:key`, does not need `seedPreset`, does not need `pickerKey`, and does not need `isSeedEcho`/`quadEq` — a controlled `:model-value` seeds points, steps, term and mode directly, exactly and reactively. Dead surface: `:25-31`, `:33`, `:84-101`, `:103-130` ≈ **45 of 166 lines (27%)**.

**Contradiction of the record, stated explicitly.** kf's own `docs/tranches/U/waves/U.F.md:510-513` declares **BG-9** *"DISCHARGED KF-SIDE, NOT a glass-ui ask: the demo-side controlled-`modelValue` fix (chartered at U.B6…) retires the `:key`-remount re-seat."* The tree says otherwise: the `:key`-remount survives in **both** consumers (`TimingFunctionPanel.vue:33`, `EasingSidebar.vue:28`) with the 4.0.1 prose intact in both. `lane-30-…:153` **F6** raised this for the `EasingSidebar` consumer only; **this challenge extends F6 to a second, previously unnamed consumer, and upgrades it** — in the sidebar the remount is a per-selection perf hack, here it is a data-destroying one (C-1). BG-9 is **not discharged**; its dischargeability is now *proven* rather than *chartered*.

**Residual honesty (the ask that survives).** The write-through path types on `EasingPickerValue`, which requires `css` and `fn` (`useEasingPicker.d.ts` — `EasingPickerValue`). A consumer holding only a stored quad cannot construct one without synthesising a literal and a callable. `We` tolerates partials at *runtime* (every field is individually guarded) but not at *compile* time. So the forwarded ask narrows from "give us write-through" (closed) to "give us a `points`/`steps`/`term`-in prop or a partial-tolerant `modelValue` type" — a genuinely smaller letter.

**Falsifier** — a resolution in which `@mkbabb/glass-ui/easing` does **not** land on the installed 7.0.0 (a second copy, an alias, an override). `vite.config.ts:37-59` aliases only `@src`, `@mkbabb/keyframes.js`, `@styles`, `@state`, `@components`, `@utils`, `@kf-engine`, `@composables`, `@app`, `@assets` — glass-ui is not aliased, so it resolves to `node_modules/@mkbabb/glass-ui` = 7.0.0. **Kill condition:** produce a resolution log showing 4.0.1.

## C-3 [MAJOR] The panel is handed the faithful CSS twin and throws it away — every authored curve is permanently disqualified from WAAPI compositor delegation

**Provenance**
- `useEasingPicker.d.ts` — `EasingPickerValue.css`: *"The complete re-parseable CSS literal (`cubic-bezier(…)` / `steps(…)`)"*, computed at `easing.js:33-37`
- `TimingFunctionPanel.vue:133-153` — `v.css` is **never read**; the handler destructures `v.points` / `v.steps` / `v.term` only
- `TimingFunctionPanel.vue:144` — `const timingFunction = { fn: cubicBezierEasing(...pts) }` — a hand-built `Easing` with **no `css`**
- `src/animation/constants/types.ts:57-63` — `interface Easing { fn; css?: /* "CSS easing string that faithfully reproduces fn" */ }`
- `src/animation/waapi/eligibility.ts:175-180` —
  ```ts
  if (firstTF && firstTF.css === undefined) {
      return { eligible: false,
               reason: "easing has no faithful CSS twin (would run bare linear on the compositor)" };
  }
  ```
- `src/animation/compile/easing/easing-option.ts:60-65` — the correct path: `const css = cssTwinFor(input); return css ? { fn, css } : { fn }`
- `src/animation/easing.ts:39-40, 50-54` — `cssTwinFor` accepts exactly `^(cubic-bezier\(|steps\(|linear\(|step-start$|step-end$)`, i.e. **precisely the string `v.css` already is**

The library's own eligibility comment names the delegatable set: *"a `.css` twin (a spring's `linear()`, an explicit `cubic-bezier()`/CSS-keyword/`steps()` easing)"* (`eligibility.ts:166-169`). The picker hands over that exact literal; the panel discards it, re-derives `fn` through a **third** construction path (`timingCurveUtils.cubicBezierEasing` → value.js `CubicBezier`) and emits a bare **name** (`"cubic-bezier"`), which forecloses the fix downstream too — the parent's `updateTimingFunctionFromName` re-derives from the store and also produces `{ fn }` with no twin (`useTimingFunctionEditor.ts:96-106`).

Cost: every user-authored curve on this surface silently drops off the compositor onto rAF, for a curve that CSS represents natively. `animation.setTimingFunction(v.css)` (`animation.ts:260-263` → `option-setters.ts:32-37` → `options.ts:41-47` → `easing-option.ts:23-66`) would have produced `{ fn, css }` in one public call.

**Falsifier** — if `Easing.css` were populated anywhere downstream of this write. Grep of the write path (`TimingFunctionPanel.vue:144-148`, `useTimingFunctionEditor.ts:96-106, 148-159`) shows `{ fn }` at both sites and no later augmentation. **Kill condition:** show a `.css` assignment on the object that reaches `options.timingFunction` on this path, or show `eligibility.ts:175` unreachable for this animation for an independent reason (note: an independent disqualifier would *mask* the defect, not refute it).

## C-4 [MAJOR] Picking `ease-out-back` from the picker's own preset dropdown is silently swallowed

**Provenance**
- `TimingFunctionPanel.vue:120-128` — when no preset matches the stored quad, `isSeedEcho` returns `true` for **any** emission equal to `bezierPresets["ease-out-back"]`
- `glass-ui/dist/easing.js:491-509` — in `bezier` mode the picker **always** renders a Preset `<Select>` over `presetNames` wired to `selectPreset` (`M`); `:playback="false"` does not suppress it (`playback` gates only the travel dot, `easing.js:482-489`)
- `glass-ui/dist/easing.js:17` — `bezierPresets` is `Object.keys(N)` where `N` is value.js's `bezierPresets`; `"ease-out-back"` is a member (`value.js …/easing.d.ts:73`)

So: stored quad is custom (the default `[0.2, 0.65, 0.6, 1]` from `animationOptionsStore.ts:57-59` matches **no** preset) → `seedPreset === undefined` → the user opens the panel and picks `ease-out-back` from the dropdown → the canvas updates, `onPickerChange` classifies it as the mount echo, `return`s at `:134`, and neither the store nor the animation moves. The picker and the animation now disagree, permanently, with no error.

The by-value echo test is a *good* idea (see SUP-1) that is unsound the moment the seed is a value the user can also author. `EasingSidebar` avoids this by testing against an explicit `pickerSeed` and by routing a preset-matched quad to `demo.selectEasing(named)` (`EasingSidebar.vue:167-207`) — a provenance channel this panel lacks.

**Falsifier** — if the preset `<Select>` were not rendered under `playback:false` (it is: the `readout`/`playback` gates are separate props, `easing.js:166-173`), or if `seedPreset` were never `undefined` in practice (it is `undefined` for the shipped default quad). **Kill condition:** a repro where selecting `ease-out-back` from a custom-quad state does persist. `UNPROVEN-NEEDS-LIVE` only for the visual half (does the canvas visibly diverge?); the discard itself is proven by source.

## C-5 [MAJOR] Lines 144-148 duplicate a sibling composable's exported mutator and are overwritten synchronously — dead work on the drag hot path

**Provenance**
- `TimingFunctionPanel.vue:144-148` —
  ```ts
  const timingFunction = { fn: cubicBezierEasing(...pts) };
  props.animation.options.timingFunction = timingFunction;
  props.animation.frames.forEach((frame) => { frame.timingFunction = timingFunction; });
  ```
- `useTimingFunctionEditor.ts:96-106` — `setAnimationTimingFunction` is **byte-equivalent** logic, is exported (`:234`), and is *not* consumed by `ChannelOptions.vue:479-486`
- `useTimingFunctionEditor.ts:152-159` — the emitted `"cubic-bezier"` makes the parent immediately re-run `cubicBezierEasing(...controlPoints)` and `setAnimationTimingFunction(...)`, **overwriting** the object the panel just installed
- `TimingFunctionPanel.vue:135-140` — the **steps** arm of the same handler does *not* touch the animation at all

Vue emits synchronously, so the sequence per pointermove is: build easing A → write A to `options` + every frame → emit → parent builds easing B from the store the panel just wrote → write B to `options` + every frame. Two `CubicBezier` constructions and two full `frames` sweeps per drag event, of which exactly one survives.

The handler's own two arms disagree about who owns engine mutation — that internal contradiction is the proof, not an inference. The steps arm is the correct one: the child owns the *store*, the parent owns the *engine*.

**Falsifier** — if the parent's handler did **not** re-apply. `ChannelOptions.vue:319-321` binds `@update-timing-function="updateTimingFunctionFromName"` and `useTimingFunctionEditor.ts:152-159` unconditionally reaches `setAnimationTimingFunction` for `key === "cubic-bezier"`. **Kill condition:** show a path where the emit does not re-apply, making `:144-148` load-bearing.

## C-6 [MAJOR] The stored step count defaults to 100; the vendor control's domain is [1, 12]

**Provenance**
- `demo/state/animationOptionsStore.ts:52-55` — `defaultStepOptions = { steps: 100, jumpTerm: "jump-start" }`
- `TimingFunctionPanel.vue:36` — `:steps="storedAnimationOptions.stepOptions.steps"`
- `glass-ui/dist/components/easing/constants.d.ts` — `STEP_COUNT_MIN = 1`, `STEP_COUNT_MAX = 12`
- `glass-ui/dist/easing.js:512-513` — the rendered slider is `min: 1, max: 12`
- `glass-ui/dist/easing.js:17` — `initialSteps` is **not** clamped on mount (`s = C(t.initialSteps ?? 4)`), while the write-through path **is** (`easing.js:203`: `Math.max(1, Math.min(12, Math.round(e.steps)))`)

The panel routes a store field with an unbounded domain (`steppedEasing(100, …)` is a perfectly legal value.js easing, `timingCurveUtils.ts:36-40`) through a control that can represent 1–12. No guard, no clamp, no diagnostic. The moment the user touches the slider the value collapses from 100 to ≤12 with no indication that a jump occurred.

**Falsifier / scope discipline** — the *range mismatch* is proven from source. The stronger leg — *"merely opening the panel rewrites 100 → 12 without user intent"* — depends on whether the underlying reka `Slider` emits a clamped correction on mount; if it does, `isSeedEcho`'s `v.steps === cur.steps` test (`:111`) fails and the corrected value is persisted as an authored edit. `UNPROVEN-NEEDS-LIVE` (SS-13). **Kill condition for the proven leg:** show `STEP_COUNT_MAX > 100` or a clamp on `initialSteps`.

## C-7 [MAJOR] `progress` is a declared, parent-bound, per-frame prop that the component never reads — and the panel is never unmounted

**Provenance**
- `TimingFunctionPanel.vue:69` — `progress?: number` declared; **zero** other occurrences in the file
- `ChannelOptions.vue:317` — `:progress="normalizedProgress"`
- `ChannelOptions.vue:506-510` — `normalizedProgress` is a `computed` over `currentT`
- `ChannelOptions.vue:495-496` + `composables/useAnimationSync.ts:6` — `currentT` is **rAF-polled every frame**
- `ChannelOptions.vue:302-323` — the detail row is gated by a **class toggle** (`panel-row--active` / `--inactive`), *not* `v-if`/`v-show`; the file's only `v-if`s are at `:231`, `:359`, `:377`

Consequences, in order of severity:
1. `<EasingPicker>` — an SVG canvas plus a reka `Select`, a reka `Slider`, `useId` and a `matchMedia` reduced-motion listener — is **permanently mounted for every channel**, including channels whose detail panel has never been opened.
2. `progress` is in the parent's dynamic-props list, so `shouldUpdateComponent` returns true on every rAF tick while the animation plays, re-rendering the (invisible) panel and patching the picker's bound props each frame.
3. The vendor has **no** `progress` prop (`EasingPicker.vue.d.ts` `__VLS_Props` = `mode|preset|steps|term|readout|playback|label`), so the value could not be forwarded even if the panel wanted to — while `:playback="false"` (`:38`) simultaneously disables the picker's *own* travel dot. The surface has a live progress signal, a primitive with a progress affordance, and no wire between them.

**Falsifier** — if `normalizedProgress` were stable (it is not: `currentT` is rAF-polled), or if the panel were `v-if`'d (it is not), or if Vue skipped the child update despite a changed dynamic prop (it does not). **Kill condition:** show a `v-if` gate on the detail row, or a use of `props.progress`. The *magnitude* of (2) is `UNPROVEN-NEEDS-LIVE`.

---

# MINOR

## C-8 [MINOR] The `updateTimingFunction` emit type collapses to `string`, and carries a name where the vendor already handed over a value

**Provenance** `TimingFunctionPanel.vue:74` — `(e: "updateTimingFunction", key: TimingFunctionNames | "cubic-bezier" | string): void`.

`A | string` is assignable-from any string, so `TimingFunctionNames | "cubic-bezier"` contributes nothing to checking; the whole `import type { TimingFunctionNames }` at `:48` is inert. In fact the component only ever emits two literals — `"steps"` (`:139`) and `"cubic-bezier"` (`:153`) — so `(e: "updateTimingFunction", key: "steps" | "cubic-bezier")` is both truthful and stricter.

The deeper contract defect: because the payload is a *name*, the parent must read state the child wrote a microtask earlier (`useTimingFunctionEditor.ts:150, 153-155` re-read `stepOptions` / `controlPoints`). That ordering coupling is expressed by no type and enforced by nothing; it is also what forecloses C-3 (the `css` literal has nowhere to travel).

**Falsifier** — if TypeScript narrowed `"a" | string`. It does not. **Kill condition:** show a caller that passes a third literal, justifying the wide arm.

## C-9 [MINOR] `as JumpTerm` (line 37) is a cast across two structurally identical types — it buys nothing and disables the drift detection its own sibling line provides

**Provenance**
- `TimingFunctionPanel.vue:37` — `:term="storedAnimationOptions.stepOptions.jumpTerm as JumpTerm"`
- `animationOptionsStore.ts:13-18, 26` — the store's type is `(typeof jumpTerms)[number]` where `jumpTerms … satisfies readonly JumpPosition[]`
- `value.js …/easing.d.ts:31, 33` — `JumpPosition = "jump-start"|"jump-end"|"jump-none"|"jump-both"`; `jumpTerms` is that same readonly tuple
- `useEasingPicker.d.ts` — `JumpTerm = (typeof jumpTerms)[number]` from **the same** `@mkbabb/value.js/easing`

The two types are the same union by construction. The cast is therefore a no-op today and a silent lie tomorrow: if glass-ui ever narrows `JumpTerm`, `:37` keeps compiling while `:137` (which uses an **annotation**, not a cast — see SUP-2) would have caught it. The inbound and outbound halves of the same bridge are built to opposite standards.

**Falsifier** — a `JumpTerm` that is not the value.js union. Checked: `useEasingPicker.d.ts` imports `jumpTerms` from `@mkbabb/value.js/easing` directly.

## C-10 [MINOR] `kind` collapses a five-valued classifier to a two-valued mode; `undefined` (invalid) renders as "cubic-bézier"

**Provenance**
- `TimingFunctionPanel.vue:79-81` — `kind = timingFunctionKind(…)`
- `animationDescriptions.ts:53-101` — `timingFunctionState` returns `parsed | registry | draft | invalid`; `timingFunctionKind` returns the kind **or `undefined`** for invalid
- `TimingFunctionPanel.vue:14, 34` — every non-`"steps"` value, **including `undefined`**, renders the header "cubic-bézier" and mounts the picker in `bezier` mode

Practically masked because the parent only *shows* the row when `isDetailTimingFunction` holds (`useTimingFunctionEditor.ts:58-63`) — but the panel is **mounted regardless** (C-7), so it does compute and render in states its own logic does not model. A component that is always mounted must carry its own guard; this one borrows a gate it can't see.

**Falsifier** — a `v-if="showDetailPanel"` on the row would make this unreachable. `ChannelOptions.vue:302-323` has none. **Kill condition:** add the `v-if`, or show `timingFunctionKind` cannot return a third value here.

## C-11 [MINOR] Dead defensive code in the two comparison helpers

**Provenance**
- `TimingFunctionPanel.vue:87` — `a.length === b.length &&` guards a comparison whose both operands are fixed 4-tuples (`BezierPoints` from the vendor, `[number,number,number,number]` from `animationOptionsStore.ts:29`)
- `TimingFunctionPanel.vue:109` — `const term = String(cur.jumpTerm)` — `jumpTerm` is already a string-literal union

Both read as guards against a hazard that the types exclude; the sibling's `quadEq` (`EasingSidebar.vue:168-171`) drops the length check for exactly this reason. Cosmetic, but it is the kind of defensiveness that makes a reader assume the operands are less constrained than they are.

**Falsifier** — a call site passing a non-quad. There is none (`:97`, `:117`, `:124`).

## C-12 [MINOR] `KeyframesAnimation<any>` in the props contract

**Provenance** `TimingFunctionPanel.vue:67`. The component touches only `.options.timingFunction` and `.frames` (`:145-148`). `any` erases the library's `V extends Vars` generic at the demo's widest seam. Inherited from `ChannelOptions.vue:452` and repo-wide, so this is a house-idiom observation rather than a local invention — but the panel could take a `KeyframesAnimation<Vars>` (or, better, take nothing at all: with C-5 fixed it needs no animation reference).

**Falsifier** — a use of the generic parameter in this file. There is none.

---

# INFO

## C-13 [INFO] The file imports from the root barrel and a subpath in adjacent lines, when a `./button` subpath exists

`TimingFunctionPanel.vue:56` `import { Button } from "@mkbabb/glass-ui"` sits directly above `:57-61` `from "@mkbabb/glass-ui/easing"`. `glass-ui/package.json` exports `./button` (71-byte re-export) alongside `./easing`; the root `.` resolves `dist/glass-ui.js` (23.9 KB of re-exports). Every sibling in this directory reaches for subpaths — `LayerConfigPanel.vue:74-75` (`/labeled-field`, `/forms`), `ChannelOptions.vue:421-423` (`/dock`, `/tooltip`, `/labeled-field`) — and each of them *also* pulls one symbol from the root (`Separator`, the `Card*` family). **Not a bundle defect:** `sideEffects: ["*.css"]` makes the JS barrel tree-shakable under rolldown. The cost is dev-server module-graph breadth and idiom inconsistency inside a single import block.

**Falsifier** — `sideEffects` covering JS, or no `./button` subpath. Neither holds. Graded INFO for that reason: **this is deliberately *not* claimed as MAJOR.**

## C-14 [INFO] F-1 re-confirmed at this call site

`keyframes.js/package.json` declares exactly one `@mkbabb/*` dependency — `"@mkbabb/value.js": "4.0.0"` (`:69`) — while this file imports from `@mkbabb/glass-ui` (`:56`) and `@mkbabb/glass-ui/easing` (`:57`). Consistent with **lane-frontend F-1**; recorded here as a second witness (lane-frontend cites `TimingFunctionPanel.vue:57-61` at its `:123`, so this is corroboration, not a new claim). Nothing in this component is reproducible under `npm ci` until F-1 lands.

## C-15 [INFO] Two `import type` statements from one specifier

`TimingFunctionPanel.vue:47-48` — `KeyframesAnimation` and `TimingFunctionNames` both come from `@mkbabb/keyframes.js` on separate lines. Cosmetic; noted only because `TimingFunctionNames` is inert (C-8), so the second line is deletable outright.

---

# SUPERLATIVES (L-18, running the other way)

## SUP-1 [SUPERLATIVE] Echo recognition BY VALUE, not by ordering or a suppression flag

`TimingFunctionPanel.vue:103-130` + the comment at `:103-105`. Under an emit-only vendor, the naive cure is a `suppressNext` boolean or an `onMounted` skip — both of which desynchronise the instant an emission is lost, duplicated or reordered. Recognising the seed **by value** is order-free and idempotent: a duplicated echo is still an echo, a missing echo costs nothing. The idiom is shared with `EasingSidebar.vue:139-156` and stated as an explicit invariant there (*"so a lost/duplicated echo can never swallow a real edit"*).

**Falsifier (L-18 both ways)** — the idiom is *sound* but not *complete*: it cannot distinguish a seed from an authored value that happens to equal the seed, which is exactly C-4. The praise is for the choice of axis (value, not ordering); the defect is the missing provenance channel that `EasingSidebar` supplies via `pickerSeed`. **Kill condition for the praise:** show a flag-based scheme that is strictly more robust.

## SUP-2 [SUPERLATIVE] The outbound type bridge is an *annotation*, not a cast

`TimingFunctionPanel.vue:137` — `const jumpTerm: JumpPosition = v.term;` takes glass-ui's `JumpTerm` and lands it in a value.js `JumpPosition` **by assignment**, so any future divergence between the design system's term union and value.js's canonical spelling becomes a compile error at the exact seam, before it can reach `localStorage`. A one-line, zero-runtime-cost tripwire on the cross-package type edge, placed at the only point where a vendor value enters persisted state.

**Falsifier** — if the annotation were redundant with an inferred type that already narrowed identically. It is not: `v.term` is `JumpTerm` (glass-ui's), and the store field is value.js-derived; without the annotation the value would flow through unchecked. The finding's own counterweight is C-9, which is the same bridge built the wrong way in the inbound direction.

## SUP-3 [SUPERLATIVE] The consumer establishes exactly the containment context the vendor's CSS requires, and deletes its own arithmetic

`TimingFunctionPanel.vue:157-166` — `.easing-editor { container-type: inline-size; container-name: easing-editor }`, with a comment that names the reason. The vendor sizes its canvas at `block-size: clamp(200px, 38cqi, 320px)` (`glass-ui/dist/easing.js:343`), which is inert without a container ancestor. The panel supplies one and explicitly retires the hand-rolled canvas's "measured px-arithmetic clamps."

This is the correct division of labour with a design system: **give the primitive its environment; do not re-implement its sizing.** The alternative — measuring the panel and passing pixels — is what the deleted cluster did.

**Falsifier** — if `38cqi` were not in the shipped CSS, or if a nearer ancestor already established `inline-size` containment (making the declaration redundant). The first is verified present at `easing.js:343`; the second is `UNPROVEN-NEEDS-LIVE` (a computed-style probe on the render host, SS-13) and would downgrade this from superlative to neutral, not to a defect.

## SUP-4 [SUPERLATIVE] The shadow component was actually deleted — this is the correct answer to the S-1..S-8 census question

`TimingFunctionPanel.vue:3-11` records that `EasingEditor` + `EasingCurveCanvas` + `DemoControlPoint` (the `instrument/easing/` cluster) were deleted in favour of the published primitive; the tree confirms it — `demo/components/instrument/easing/` does not exist and `find demo -name "EasingEditor.vue" -o -name "EasingCurveCanvas.vue"` returns nothing.

Against **lane-frontend's S-1..S-8** — a census of 1 400+ lines of surviving shadow components (S-1 `KfPillTabs`, S-3 the timeline cluster, S-4 `SequenceScrubber`, …) — this file is the **worked example of the disposition those rows are asking for**: one vendor primitive covering both authoring modes, the bespoke steps rows and count/term UI dying with the canvas. On the shadow-component axis specifically, `TimingFunctionPanel` is the best-postured component in the census.

**Falsifier (L-18 both ways)** — the praise is scoped to *shadow-component posture*. It says nothing about the wiring, which C-1..C-7 indict. A file can consume the right primitive and still consume it wrongly; this one does. **Kill condition:** find a surviving hand-rolled curve editor in `demo/`. None exists.

---

# Disposition

| id | severity | one line |
|---|---|---|
| C-1 | **BLOCKER** | `:key` derived from the state the handler writes → remount mid-drag, curve teleports to `ease-out-back` |
| C-2 | MAJOR | the 4.0.1 emit-only premise is false against installed 7.0.0; ~45 lines are scaffolding for a closed gap; BG-9 is **not** discharged |
| C-3 | MAJOR | `v.css` discarded → hand-built `{ fn }` → `eligibility.ts:175` disqualifies WAAPI forever |
| C-4 | MAJOR | preset-dropdown pick of `ease-out-back` silently swallowed by the default-seed echo test |
| C-5 | MAJOR | `:144-148` duplicate `setAnimationTimingFunction` and are overwritten synchronously; the steps arm disagrees |
| C-6 | MAJOR | stored `steps` defaults to 100; the vendor control's domain is [1, 12] |
| C-7 | MAJOR | `progress` declared + parent-bound per-rAF + never read; the panel is never `v-if`'d |
| C-8 | MINOR | emit type collapses to `string`; the payload is a name where a value was available |
| C-9 | MINOR | inbound `as JumpTerm` cast defeats the drift check the outbound annotation provides |
| C-10 | MINOR | five-valued `kind` collapsed to two; `undefined` renders "cubic-bézier" |
| C-11 | MINOR | dead length/`String()` guards |
| C-12 | MINOR | `KeyframesAnimation<any>` |
| C-13 | INFO | root barrel + subpath in one import block; `./button` exists |
| C-14 | INFO | F-1 phantom dep, second witness |
| C-15 | INFO | split `import type` |
| SUP-1 | ✦ | echo-by-value, not by ordering |
| SUP-2 | ✦ | `const jumpTerm: JumpPosition = v.term` — annotation, not cast |
| SUP-3 | ✦ | `container-type: inline-size` matched to the vendor's `38cqi` |
| SUP-4 | ✦ | the shadow editor was genuinely deleted — the S-1..S-8 worked example |

**The single cure.** C-1, C-2, C-4 and most of C-3/C-5 collapse into one edit: bind `:model-value` (write-through, `easing.js:197-210`), delete `:key` / `seedPreset` / `pickerKey` / `isSeedEcho` / `quadEq`, and emit `v.css` so the parent can call `animation.setTimingFunction(v.css)` and get `{ fn, css }` from `easing-option.ts:60-65`. That is ~45 lines out, one prop in, and it discharges BG-9 for real.

**Marked `UNPROVEN-NEEDS-LIVE` for the SS-13 visual audit** — (a) C-6's "opening the panel rewrites 100 → 12" leg (does reka `Slider` emit a clamped correction on mount?); (b) C-7's per-frame re-render magnitude; (c) C-4's visible canvas/animation divergence; (d) SUP-3's redundancy check (is a nearer ancestor already an inline-size container?).
