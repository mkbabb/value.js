claude-opus-5[1m]

# CHALLENGE · `ChannelOptions.vue` · axis **C — CONSUMPTION**

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/components/instrument/transport/channel-controls/ChannelOptions.vue` (609 L)
**Axis** how this component consumes **keyframes.js** (engine under test) and **glass-ui 7.0.0** (design system); its **value.js 4.0.0** transitive exposure incl. the R1 parser-crash class; props/emits contract quality; integration seams with `ChannelControls` / `TimingFunctionPanel` / `LayerConfigPanel` / `PlaybackRibbon`.
**Mode** static, read-only. No browser tooling. `node --input-type=module` probes run against the **already-installed** `node_modules/@mkbabb/{value.js@4.0.0,glass-ui@7.0.0}` dists and the repo's own `dist/engine/index.js` — evidence-gathering only; nothing written or mutated in `keyframes.js`. My single write is this file.
**Posture** DEFECTIVE until the tree proves otherwise — but **a false defect is worse than a missed one.** Four hypotheses I formed died against their own falsifiers and are recorded as INFO rather than quietly dropped, so no downstream lane re-files them.

**Tally — 19 defects (2 BLOCKER · 8 MAJOR · 9 MINOR) · 5 superlatives · 5 recorded non-defects.**

> ### Supersedes the earlier draft at this path
> A prior C-axis draft occupied this file (12 defects · 1 BLOCKER · 3 superlatives). Its findings are **retained and re-verified** here (mapping in §5). It is superseded for two reasons, both evidentiary:
> 1. **It misses the largest consumption defect in the file.** It read `glass-ui/dist/components/labeled-field/types.d.ts:28-36` and quoted `LabeledSelectProps` — without noticing that **four of the props this component passes are not in it**. That is 4 defects (§M-1..M-4), including every field tooltip in the panel.
> 2. **Its superlative S+2 is disproven by the shipped artifact.** It praises `isSeedEcho` as "the correct answer to a vendor limitation," asserting glass-ui's `EasingPicker` "has an **emit-only** `modelValue` with no external write-through." Installed glass-ui 7.0.0 **watches** `modelValue` and writes through (§M-5, with the readout). The praised code is a stale workaround, not a superlative.

---

## §0 · Files read whole (read-only)

| file | why |
|---|---|
| `demo/…/channel-controls/ChannelOptions.vue` | target |
| `demo/…/channel-controls/ChannelControls.vue` | parent seam (mount gate + emit forwarding) |
| `demo/…/channel-controls/TimingFunctionPanel.vue` | child; `progress` / `updateTimingFunction` seam |
| `demo/…/channel-controls/LayerConfigPanel.vue` | child; `isOpen`/`setOpen` function-prop seam |
| `demo/…/composables/{useTimingFunctionEditor,useAnimationSync,usePlaybackToggle}.ts` | the three direct composable imports |
| `demo/components/playback/PlaybackRibbon.vue` | teleported child + emit payloads |
| `demo/utils/reference-data/{animationDescriptions,easingGroups,timingCurveUtils}.ts` | **the value.js `/css` + `/easing` seam** + the dropdown catalogue |
| `demo/state/{animationOptionsStore,hashSharing}.ts` · `demo/kf-engine.ts` | the persisted store + the engine accessor |
| `demo/scenes/cube/useCubeDemo.ts` · `demo/…/controls-pane/{ControlsPaneWrapper,RibbonBar}.vue` | the store's *readers* (blast radius) + teleport target |
| `src/animation/engine/{animation,option-setters,options}.ts` · `src/animation/internal/errors.ts` · `src/animation/load-engine.ts` | engine contracts consumed |
| `glass-ui/dist/{labeled-field.js,easing.js,dock.js,glass-ui.js,card-*.js}` + matching `.d.ts` | **vendor contract of record — the compiled artifact, not the prose** |
| `value.js/dist/subpaths/{math,css,easing}.{js,d.ts}` | value.js edges |
| `package.json`, `package-lock.json`, `tsconfig.json`, `vite.config.ts`, `.github/workflows/ci.yml` | the gate that is supposed to enforce all of the above |

**Hitherto corpus folded, not re-derived:** `formation/keyframes/lane-frontend.md` — **F-1** (phantom glass-ui dep; carried as B-2 with new CI provenance), **S-1** (the "stale rationale" class M-5 belongs to), **S-2** (prose-vs-tree drift, the class m-1 belongs to), §3.1 subpath utilisation (cited in INFO-2). `formation/keyframes/lane-library.md` — the `parseTimingFunction` parse seams this component reaches through `animationDescriptions.ts:128`. **No contradiction of either lane was found**; §M-1..M-4 extend F-1's class from *resolution* to *contract* and are new.

---

## §1 · BLOCKERS

### B-1 · The option fields persist engine-REJECTED values into localStorage; the construction path then throws on them
**BLOCKER** · `ChannelOptions.vue:33-41` (duration), `:52-60` (delay), `:80-88` (iterations), `:102-108` (direction), `:126-132` (fillMode) · mechanism `:461-476`

Every handler has the same shape:

```
@update:model-value="(v) => {
    trySetOption(() => animation.setDuration(v));            // :35 — throw SWALLOWED
    storedAnimationOptions.animationOptions.duration = v;    // :38 — write UNCONDITIONAL
}"
```

`trySetOption` (`:469-476`) catches `AnimationOptionError`; the store write sits **outside** the try. The docstring names the intent — *"The store still records the raw string so the field round-trips"* (`:466-467`) — but the store is **`useStorage`-backed**, i.e. localStorage (`animationOptionsStore.ts:67-74`), and it is fed **verbatim** into the engine constructor on the next boot:

```
useCubeDemo.ts:57-59   new CSSKeyframesAnimation(matrixAnimationOptions.animationOptions)
             :79-81   new CSSKeyframesAnimation(rotationAnimationOptions.animationOptions)
             :109     presets.hover(hoverAnimationOptions.animationOptions)
```

That path is fail-explicit end to end with **no tolerance arm**: `animation.ts:196 setOptions` → `option-setters.ts:145-160 applyOptions` → `options.ts:87-102 normalizeDuration` → `internal/errors.ts:97-108 parseOption` → **throw**.

**Executed** against the repo's own `dist/engine/index.js` (node v26):

```
duration ""       → AnimationOptionError: expected a positive duration in ms or a CSS time string
duration "abc"    → AnimationOptionError
duration "5"      → AnimationOptionError   ← a bare numeric STRING is invalid; only "5s"/"5ms"/5 are
delay ""          → AnimationOptionError
iterationCount "" → AnimationOptionError
```

`"5"` is the sharp edge: **every** user retyping a duration passes through `""` → `"3"` → `"3s"`, and each intermediate is committed. Stop at `"3"` — a perfectly reasonable reading of "3 seconds" — reload, and the cube scene's setup throws.

`direction`/`fillMode` are worse: **no `trySetOption` at all** (`:104`, `:128`), writing `v as any` straight to the store, against normalizers that throw on any off-enum value (`options.ts:121-148`).

**Blast radius** — persistent, silent at write, fatal at read, and reachable *without typing anything*: `hashSharing.ts:51-69` validates only that `state.options` is an object (`:29-45`), then `applySharedAnimationState` (`animationOptionsStore.ts:76-81`) `Object.assign`s the payload into the persisted store with **zero** schema validation. A shared `?state=` URL seats `duration:"abc"` directly.

**Falsifier** — a catch/tolerance arm between `getStoredAnimationOptions(...)` and `new CSSKeyframesAnimation(...)`, or `normalizeDuration` accepting `""`/`"5"`. Both checked; neither exists. The throws above are executed output, not inference.

### B-2 · `@mkbabb/glass-ui` is undeclared **and** unlocked — every glass-ui symbol here is unresolvable from a clean install · **CARRIED from lane-frontend F-1**
**BLOCKER (carried, not re-filed)** · `ChannelOptions.vue:408-423`

Re-verified at this HEAD: `package.json:68-69` declares exactly one dependency (`@mkbabb/value.js: 4.0.0`); `grep -c glass-ui package-lock.json` → **0** across 374 locked packages; `node_modules/@mkbabb/glass-ui` nonetheless holds 7.0.0. `vite.config.ts:37-59` has no alias for it.

This component imports **twelve** symbols across four glass-ui entry points (`:408-423`), plus `EasingPicker`/`Button` via `TimingFunctionPanel.vue:56-61` and five more via `LayerConfigPanel.vue:74-76`. None resolve after `npm ci`.

**New provenance the lane did not carry:** `.github/workflows/ci.yml:66-73` runs `npm ci` (L67) then `npm run gh-pages` (L73) in one job. F-1 is therefore not a latent reproducibility hazard — it makes the demo-build CI step **structurally unresolvable**. (That job is gated to `schedule`/`workflow_dispatch` at `ci.yml:55`, so no PR ever exercises it — which is why it has stayed invisible.) Second datum: glass-ui's peer `@mkbabb/pencil-boil` is **absent from node_modules** and is a hard import of `glass-ui/dist/handmark.js:4`. ChannelOptions does not touch `/handmark` so it is unharmed *today* — the graph is intact only by accident of the current tree, exactly as F-1 says.

**Falsifier** — a `package.json`/`package-lock.json` at this HEAD containing `@mkbabb/glass-ui`, or a build alias for the specifier.

---

## §2 · MAJORS

> **§M-1..M-4 share one proof.** The vendor contract of record is the **compiled** `glass-ui/dist/labeled-field.js`. Its `LabeledSelect` props table reads, verbatim:
> `modelValue, items, open, placeholder, invalid, disabled, required, label, description, requirement, layout, errorLive`
> matching `dist/components/labeled-field/types.d.ts:7-13` (`LabeledFieldCommonProps = { label, description?, requirement?, layout?, errorLive? }`) and `:27-35` (`LabeledSelectProps`). Over the **whole** file — all four `Labeled*` components:
> `grep -c` → `tooltip` **0** · `labelClass` **0** · `descriptions` **0** · `isOpen` **0** · `inheritAttrs` **0**.
> Four of the props this component passes therefore reach nothing and fall through as raw DOM attributes.

### M-1 · `tooltip` is not a glass-ui prop — five documented field tooltips are silently dropped
**MAJOR** · `ChannelOptions.vue:32, 51, 79, 101, 125`

*Animation length (e.g. 5s, 200ms)* · *Delay before start* · *Repeat count* · *Playback direction* · *Style applied when not playing* — five authored affordances that never render. The declared prop is **`description`**; the fix is a rename.

Systemic, with this file as epicentre: 13 `tooltip=` on `Labeled*` across 4 demo files (`ChannelOptions` 5, `LayerConfigPanel` 5, `SpringPhysicsFacet` 2, `EasingSidebar` 1).

**Falsifier** — a `tooltip` entry in any `Labeled*` props table in 7.0.0, or an `inheritAttrs:false` + manual-forward path routing it to a tooltip. Both disproven above.
**Live** `UNPROVEN-NEEDS-LIVE`: no tooltip on hover over the five field labels. Mechanism proven from source.

### M-2 · `:descriptions` is not a glass-ui prop — three authored description tables are unreachable data
**MAJOR** · `ChannelOptions.vue:98, 122` (+ `LayerConfigPanel.vue:13`)

glass-ui declares `description?: string` (singular, a string); the component passes `descriptions` (plural, a `Record<string,string>`).

The corroborating tell is decisive: each of the three tables in `animationDescriptions.ts` — `DIRECTION_DESCRIPTIONS:1-6`, `FILL_MODE_DESCRIPTIONS:8-13`, `COMPOSITE_OPERATOR_DESCRIPTIONS:123-127` — has **exactly one consumer, and it is a phantom prop** (`grep -rn` over the whole demo). Twelve authored strings are dead. A `Record` coerced through `setAttribute` also emits `descriptions="[object Object]"` into the DOM.

Sharpest contrast in the file: the **hand-rolled** easing `Select` at `:240-271` renders its per-item descriptions correctly, by hand, from `EASING_GROUPS`. Where the component built the affordance itself it works; where it delegated to glass-ui it silently doesn't.

**Falsifier** — a `descriptions` prop in 7.0.0, or another consumer of the three tables.

### M-3 · The "exclusive select mutex" is inert — `:is-open` is phantom, so nothing is ever controlled
**MAJOR** · `ChannelOptions.vue:96, 120, 488-493` (+ `:363-364` · `LayerConfigPanel.vue:8-18, 84-85`)

`:488` declares *"Exclusive select mutex: only one dropdown open at a time."* The controlled prop in 7.0.0 is **`open`**, not `isOpen`.

The write half works (`@update:open` → `setOpen` → `openSelect`); the read half is severed. `openSelect.value` is read **only** by `isOpen`, and `isOpen` feeds **only** phantom props — here (`:96`, `:120`) and, passed down as a function-prop pair (`:363-364`), in `LayerConfigPanel` (`:11`). A ref, two functions, two bindings, two handlers and a two-member cross-component prop contract exist and accomplish nothing.

User impact is probably nil (a reka `SelectContent` overlay makes opening a second dropdown hard), which is exactly why it survived. The defect is architectural: a stated invariant the tree does not implement, plus a cross-component contract that exists solely to serve it.

**Falsifier** — an `isOpen` prop in 7.0.0, or any read of `openSelect` outside `isOpen`. Both checked.

### M-4 · `label-class` is phantom — the field labels do not wear the register the component asks for
**MAJOR** · `ChannelOptions.vue:31, 50, 78, 100, 124`

Not in `LabeledFieldCommonProps`, and not in `InputProps` either (`glass-ui/dist/components/input/types.d.ts`, read in full).

The five fields ask for `text-small font-medium text-muted-foreground`; they get glass-ui's default label styling. The hand-rolled easing label three lines below wears **those exact classes directly** (`:151-161`), as do the "advanced" row (`:292-294`) and the sub-pane header (`:346-350`). Five labels in one register, four in another, inside a single `Card` — the opposite of what the surrounding comment block (`:17-23`) is for. The `.labeled-field-grid` idiom governs label *column width*; the typographic *register* was supposed to ride `label-class` and does not.

**Falsifier** — `labelClass` in any 7.0.0 props table (disproven), **or** a global rule landing the same computed styles on `.labeled-field label` (`UNPROVEN-NEEDS-LIVE`: a computed-style diff between the "duration" label and the "easing" label at SS-13 settles it — if they match, this claim dies).

### M-5 · The `EasingPicker` seeding stack is stale against 7.0.0 — the vendor's write-through seam exists and is unused · **class of census S-1** · **contradicts the prior draft's S+2**
**MAJOR** · `TimingFunctionPanel.vue:25-41, 83-130` ← `ChannelOptions.vue:312-322`

The cited rationale is explicit and versioned:

> `TimingFunctionPanel.vue:26-31` — *"The `:key` remount re-seats the picker when the KIND flips (**glass-ui 4.0.1's modelValue is emit-only** — no external write-through / points-in prop …)"*

**Installed glass-ui is 7.0.0, and its `EasingPicker` is write-through.** From the shipped `glass-ui/dist/easing.js` (minified; `k` = `watch`, `l` = the `useModel` ref for `modelValue`):

```
k(l, We, { deep: !0, immediate: !0 })
```

`We(e)` sets `mode`; when `e.points` is a finite 4-tuple it calls `setHandle(0,…)` / `setHandle(1,…)`; it seats `steps` (clamped 1–12) and `term`, then re-emits the canonical value if the derived state differs. The picker **also already ships its own by-value echo suppressor** — `q(a,b)` compares `mode/css/fn/steps/term/points`, and the `J` latch swallows the return trip.

So the panel reimplements, against a version that provides it: a `:key` forced remount (`:33`), a `seedPreset` catalogue search (`:92-99`), and a 25-line by-value `isSeedEcho` heuristic (`:106-130`) duplicating the vendor's `q()`. Worse, `:124-127` hardcodes `"ease-out-back"` as its guess at the vendor's catalogue default. That guess is **currently correct** (`dist/easing.js`: `le = "ease-out-back"`, `initialPreset ?? "ease-out-back"`) — but it is an unversioned mirror of a vendor private constant, with no test pinning it, in a repo that does not lock glass-ui at all (B-2).

**Honest scoping — this is not a one-liner.** `EasingPickerValue` requires `css: string` and `fn: EasingFn` (`useEasingPicker.d.ts:13-25`), so a consumer-synthesised seed will not compare equal to the picker's internal value and will provoke one canonicalising re-emit. This wants a spec item, not a mechanical swap — the disposition `lane-frontend.md` gave S-3/S-4.

**L-18 runs both ways here.** This file's comment culture is unusually honest — `:531-534` names the empty-first-frame cost out loud ("an honest pre-load frame"); `:594-603` and `:605-608` document *deleted* rules alongside their replacements, so a reader can tell absence from oversight. That trustworthiness is precisely why a stale "glass-ui 4.0.1" citation is expensive: the prior C-axis draft read it, believed it, and promoted the workaround to a **superlative** without checking `node_modules`. A version-pinned claim in a comment must be re-verified against the installed artifact, every time.

**Falsifier** — show `modelValue` is emit-only in the installed 7.0.0 build (no watch on the model ref). The `k(l, We, {deep,immediate})` line above is that watch, read out of the shipped file.

### M-6 · A throw in the async `onMounted` silently strands both engine-fed dropdowns empty forever
**MAJOR** · `ChannelOptions.vue:535-547`

```
const directions = ref([]); const fillModes = ref([]);
onMounted(async () => {
    updateTimingFunctionFromName(storedAnimationOptions.animationOptions.timingFunction as TimingFunctionNames);  // ← can throw
    const engine = await loadAnimationEngine();
    directions.value = engine.DIRECTIONS;
    fillModes.value  = engine.FILL_MODES;
});
```

`updateTimingFunctionFromName` throws a bare `TypeError` when the stored value resolves to no kind (`useTimingFunctionEditor.ts:140-145`). It is the **first** statement, and the hook is `async`: Vue 3.5.35 routes the rejection through `callWithAsyncErrorHandling` → `handleError`. With **no `app.config.errorHandler` registered** (checked `demo/app/main.ts` and `demo/app/App.vue` — neither sets `errorHandler` or `warnHandler`), it surfaces as a console error and nothing more. The remaining three statements never run: `directions`/`fillModes` stay `[]` **permanently**, two dropdowns open onto nothing, no user-visible cause.

**Reachability, stated precisely.** I enumerated **all 29** `EASING_GROUPS` entries through the real resolver (`parseTimingFunction` → `easing()` registry, executed against value.js 4.0.0) and **every one resolves** — the dropdown itself cannot trigger this. The reachable trigger is the untrusted store: `hashSharing.ts:51-69` + `animationOptionsStore.ts:76-81` seat an arbitrary `timingFunction` from a shared URL with no schema check, and localStorage survives schema evolution.

The structural defect is independent of the trigger: **a fallible synchronous call is sequenced ahead of an unrelated await inside a hook whose rejection is unobservable.** Reordering the two statements removes the coupling entirely.

**Falsifier** — show Vue awaits `onMounted`'s promise and aborts mount on rejection (it does not — it attaches a `.catch` and returns), or show the throw unreachable by construction (the hash path defeats that).

### M-7 · Picking **step-start** or **step-end** produces neither — the kind-collapse discards the CSS semantics, and a correct hand-written special case is dead code
**MAJOR** · `useTimingFunctionEditor.ts:140-158` ← `ChannelOptions.vue:212-217`

`timingCurveUtils.ts:42-46` gets it right:

```
const namedEasing = (name) => {
    if (name === "step-start") return steppedEasing(1, "jump-start");
    if (name === "step-end")   return steppedEasing(1, "jump-end");
    return requireEasing(easing(name), name);
};
```

But `updateTimingFunctionFromName` normalises to a **kind** before dispatching (`:140`), and value.js's `parseTimingFunction` collapses both keywords into `kind: "steps"`. **Executed** against value.js 4.0.0:

```
timingFunctionKind("step-start") -> "steps"
timingFunctionKind("step-end")   -> "steps"
```

So `key === "steps"`, the steps branch fires with the **stored** step options (`:149-151`), and `namedEasing`'s special case is never reached — dead code. With store defaults (`animationOptionsStore.ts:52-55`: `steps: 100, jumpTerm: "jump-start"`):

- **step-start** → applies `steppedEase(100, "jump-start")`, persists `"steps(100, jump-start)"` — should be `steps(1, jump-start)`
- **step-end** → **identical** result. Two distinct menu entries are silent aliases.
- the dropdown's `:model-value` is `timingFunctionKind(stored)` (`:206-211`) = `"steps"`, so the highlighted row visibly **jumps off** the item just clicked, onto "steps".

**Falsifier** — `timingFunctionKind("step-start")` returning `"step-start"`, or a branch reaching `namedEasing` for these two names. The resolver output disproves the first; `:146` (`const key = kind as …`) disproves the second.

### M-8 · No `.vue` file in this repository is ever type-checked — every props/emits contract in this component is decorative
**MAJOR** · `package.json:37, 44` · `tsconfig.json:47` · `ci.yml:42`

`"check": "tsc --noEmit && tsc --noEmit -p tsconfig.test.json"` — plain `tsc`, **not `vue-tsc`**, over `include: ["src/","demo/"]`. `tsc` cannot read `.vue` at all, so no `<script setup>` and no template is ever checked. `grep -rn vue-tsc` over `package.json`, `.github/`, `scripts/`, `Makefile` → **0 hits**. `"lint": "depcruise src"` — the demo is not linted either. CI runs `check:lib` (src only, `ci.yml:42`) and never `check`.

This is filed as a defect of *this component's consumption* because it is the enabling condition for §M-1..M-4, m-4 and m-7: four phantom props, a mis-shaped emit handler and four `as any` all survive because **nothing on earth reads them**. It is also the highest-leverage single fix available — adding `vue-tsc` to `check` turns M-1..M-4 from invisible into compile errors.

**Falsifier** — any invocation of `vue-tsc` (or an equivalent SFC-aware checker) in a script, workflow or hook.

---

## §3 · MINORS

### m-1 · `LayerConfigPanel`'s header comment cites a host rule `ChannelOptions` deleted · class of census S-2
**MINOR** · `LayerConfigPanel.vue:2-6` vs `ChannelOptions.vue:594-603`
The child documents its layout as riding *"the host's `.panel-content :deep(.labeled-field)` rule … one DRY source."* That rule is **gone** — `:594-603` records its deletion (H.W11.I1) and its replacement by the global `.labeled-field-grid` subgrid idiom. The seam still works (the host wraps the child at `:359`), so this is drift, not breakage — but drift on the exact seam the pair shares.
**Falsifier** — a live `:deep(.labeled-field)` rule in the host's scoped block. There is none.

### m-2 · The easing pencil carries two tooltips; the Back button carries a third shape
**MINOR** · `ChannelOptions.vue:165-189` vs `:337-345`
`DockControl` declares no `title` (compiled props: `shape, compact, active, type, disabled, as, asChild, class` — `glass-ui/dist/dock.js`), so `title="Edit easing curve"` (`:175`) becomes a native HTML attribute → the browser's delayed tooltip. The same button is *also* wrapped in `<Tooltip><TooltipTrigger as-child>` with `<TooltipContent>Edit easing curve</TooltipContent>` (`:165-188`) — the identical string, twice, at different timings. The Back control (`:337-345`) uses `title` alone with no wrapper.
**Falsifier** — `DockControl` declaring and consuming `title`.

### m-3 · Dead composable surface: 1 destructured-unused binding, 4 members no one consumes
**MINOR** · `ChannelOptions.vue:479` · `useTimingFunctionEditor.ts:219-236`
`convertedFromName` is destructured (`:479`) and never referenced. The composable has exactly one consumer and returns ten members; **four are consumed by nobody** in the entire demo: `easingItems`, `activeCurvePath`, `onEasingLabelClick`, `setAnimationTimingFunction`. `activeCurvePath` is a lazy computed (no runtime cost) but keeps `getCurvePath`/`generateCurveSVGPath`/`generateStepSVGPath` in the import graph; `easingItems` (`:24-26`) is an eager module-level `flatMap` evaluated at import for nothing.
**Falsifier** — a consumer of any of the five outside the composable.

### m-4 · One glass-ui emit, two handler shapes across a parent/child pair
**MINOR** · `ChannelOptions.vue:109-112, 133-136` vs `LayerConfigPanel.vue:17`
7.0.0 emits `"update:open": (value: boolean)` (`LabeledSelect.vue.d.ts`). The parent annotates `(v: boolean | undefined) => setOpen(name, v ?? false)`; the child, consuming the same emit and the same `setOpen` prop, writes `(v) => setOpen('blend', v)`. Two readings of one contract — on a mechanism that is inert anyway (M-3).
**Falsifier** — a 7.0.0 path emitting `update:open` with `undefined`.

### m-5 · The visible "easing" label is not the control's accessible name
**MINOR** · `ChannelOptions.vue:151-161` vs `:219`
A bare `<label>easing</label>` with no `for` and no `id`, above a `SelectTrigger` named only by `aria-label="Timing function"`. Visible text and accessible name differ, and clicking the label does not focus the control. The five `Labeled*` rows above get this right through glass-ui's `controlId`/`labelledBy` wiring; only the hand-rolled row built to host the pencil (`:140-146`) loses it.
**Falsifier** — a `for`/`id` pair or `aria-labelledby` on the trigger.

### m-6 · This component's only direct value.js edge exists to feed a prop the child never reads
**MINOR** · `ChannelOptions.vue:426, 506-510, 317` · `TimingFunctionPanel.vue:69`
`import { clamp } from "@mkbabb/value.js/math"` (`:426`) is used at exactly one site — `normalizedProgress` (`:506-510`) — bound at exactly one site, `:progress="normalizedProgress"` (`:317`). `TimingFunctionPanel` declares `progress?: number` (`:69`) and **never reads it** (`grep -n progress` returns that declaration and nothing else). Import, computed, prop and declaration are all inert.
Two claims I checked and **decline** to make: it does not raise render frequency (`currentT` is already read at `:380`), and for an inactive channel the residual subscription is bounded by `useAnimationSync`'s 30-frame settle idle (`useAnimationSync.ts:27, 63-68`). Dead weight, not a perf bug.
**Falsifier** — any read of `props.progress` in the child.

### m-7 · Four `as any` erase the one contract the enum fields have
**MINOR** · `ChannelOptions.vue:104, 106, 128, 130`
`LabeledSelect` emits `update:modelValue: (value: string)`; the engine wants `AnimationOptions["direction"]`/`["fillMode"]`. The component bridges with `v as any` in **both** the engine call and the store write, rather than narrowing against `engine.DIRECTIONS` — which is already in hand at `:545-546`. So the type system cannot help, *and* (per B-1) the runtime is unguarded on exactly these two fields. Practically unreachable today, which is why it is MINOR and not folded into B-1's severity.
**Falsifier** — a path by which `LabeledSelect` emits a string absent from `items`.

### m-8 · The dropdown catalogue under-consumes value.js's preset registry by six curves it already has the data for
**MINOR** · `easingGroups.ts:26-102` vs `value.js/dist/subpaths/easing.js`
`bezierPresets` ships **30** named curves; the demo catalogue surfaces 24 of them. **Executed** diff — missing: `ease-in-quart`, `ease-out-quart`, `ease-in-out-quart`, `ease-in-quint`, `ease-out-quint`, `ease-in-out-quint`. The demo is not missing the *data*: all six sit in `NAMED_EASING_BEZIER` (`animationDescriptions.ts:32-37`), so the auto-convert-to-bezier path (`useTimingFunctionEditor.ts:196-201`) would handle them today. Two families are simply absent from the menu.
**Falsifier** — a Quart/Quint entry in `EASING_GROUPS`, or a reason those two families are deliberately excluded (none is documented).

### m-9 · The engine-gated dropdowns render a selected value with an empty item list **and** no placeholder
**MINOR** · `ChannelOptions.vue:535-546` · `LabeledSelectProps.placeholder` (`types.d.ts:32`) unused
Between mount and the microtask that resolves `loadAnimationEngine()`, both `LabeledSelect`s hold `modelValue: "alternate"` / `"forwards"` against `items: []` — a selected value with no matching item — and `placeholder` is not passed, so the rows read blank. The comment calls it "an honest pre-day frame" and for one microtask it is; combined with M-6 (where the refs never populate at all) the same blank becomes permanent and indistinguishable from a normal frame. Passing `placeholder` costs one prop and makes the two states tell themselves apart.
**Falsifier** — a `placeholder` binding on either select, or a `v-if` gating them on non-empty `items`.

---

## §4 · SUPERLATIVES (L-18 runs both ways — each with its own falsifier)

### S-1 · `timingFunctionLiteralFor` — the persist-literal law is the best library-consumption reasoning in the cluster
`useTimingFunctionEditor.ts:108-133, 161-167`
The rule: **never persist a bare `cubic-bezier`/`steps` keyword — always the complete re-parseable literal**, because the bare token is what `resolveEasingOption` ← `setTimingFunction` ← `new CSSKeyframesAnimation` rejects on the next mount. One persist seam serves every caller (dropdown, in-panel selector, bezier drag). I verified the round-trip independently: every literal this seam can emit — `"steps(100, jump-start)"`, `"cubic-bezier(0.20, 0.65, 0.60, 1.00)"`, `"ease-in-out"` — resolves cleanly back through `timingFunctionKind`. This is exactly the discipline B-1's option fields *lack*; the same file contains both the law and its violation.
**Falsifier** — a persist path writing a bare keyword. `:146` normalises to the kind and `:167` always routes through the literal-builder.

### S-2 · `useAnimationSync`'s gate is reasoned from the deadlock, not from a timeout
`useAnimationSync.ts:5-27, 78-92` · `ChannelOptions.vue:384-397`
The docstring names the trap *by mechanism* — "gating on `isStarted` (an OUTPUT this loop COMPUTES) deadlocks" — then resumes only on **inputs the loop does not own** (`isPlaying` edges, document visibility, explicit `wake`), idling only after a re-arming stable window. ChannelOptions honours it exactly: `wake()` fires at `@scrub-start`, `@scrubbed` and `@slider-update` (`:384-397`) — all three entry points the composable enumerates, none missed.
**Falsifier** — a transition the loop must observe that neither re-arms the window nor flips a watched input. I tried three (alternate-direction wrap, external `setChildTime`, tab-hidden advance); each is covered by the three-value change detect, `wake()`, or the visibility watch respectively.

### S-3 · `trySetOption` discriminates the typed error instead of swallowing everything
`ChannelOptions.vue:469-476`
`if ((e as Error)?.name !== "AnimationOptionError") throw e;` — a narrow catch that re-throws anything it does not own, over an error type the library actually exports (`internal/errors.ts`). The correct shape for a fail-explicit library boundary, and rarer than it should be. B-1 is *not* this catch; it is the unguarded store write beside it.
**Falsifier** — an unrelated error class named `AnimationOptionError` this would wrongly swallow.

### S-4 · The demo's own adapter shields it from a live value.js Result-contract hole — R1's exact class
`animationDescriptions.ts:70-73`
`timingFunctionState` guards `if (typeof value !== "string") return { status: "invalid", … }` **before** calling `parseTimingFunction`. Fuzzing the installed value.js 4.0.0 shows that guard is load-bearing:

```
parseTimingFunction(null)         → TypeError: Cannot read properties of null (reading 'trim')
parseTimingFunction(undefined)    → TypeError
parseTimingFunction(42 | {} | []) → TypeError: e.trim is not a function
```

A `Result`-returning parser that **throws a raw TypeError** on non-string input is precisely R1's class (`parseCssColor("oklch()")`). Every *string* I threw at it — `""`, `"cubic-bezier"`, `"cubic-bezier()"`, `"steps(-1, jump-end)"`, `"oklch()"`, `"((("`, a NUL byte, a 5 000-char string — returned `ok:false` cleanly. The hole is exactly the type-guard edge, and the demo closed it. **Evidence for the parser lane; not a defect here.**
**Falsifier** — `parseTimingFunction` returning a Result for `null`. Executed output says otherwise.

### S-5 · Reactivity plumbing is correct where it is easy to get wrong
`ControlsPaneWrapper.vue:47` · `ChannelOptions.vue:459, 486, 498-504, 526-529`
I opened this expecting `getStoredAnimationOptions(props.animation)` at `:459` — a setup-time snapshot of a prop-derived value — to go stale when `animation` swaps. It cannot: `ControlsPaneWrapper.vue:47` keys the subtree `:key="host.animation.id"`, so a channel change is a remount, and `:42` says so deliberately ("BORN with its animation"). The composables that *do* need liveness take **getters**, not values (`() => props.animation` at `:486`, `:504`, `:527`), with `toRef(() => props.isPlaying ?? false)` for the reactive input (`:498`). Candidate defect checked and cleared.

---

## §5 · Recorded non-defects (hypotheses that died against their falsifiers)

**INFO-1 · "The template runs a CSS parser every frame" — FALSE, measured.**
`:206-211` calls `timingFunctionKind(...)` inline in the template (uncached; a computed would memoise), and the render effect does subscribe to `currentT` via `:380`/`:317`. Measured against value.js 4.0.0 (node v26, 20 000 iterations after 2 000 warm-up, `hrtime.bigint`): `cubic-bezier(…)` ≈ **497 ns**, `steps(4, jump-end)` ≈ 234 ns, a failing parse + registry lookup ≈ 199 ns; baseline `JSON.parse("{}")` ≈ 40 ns. Worst case **0.5 µs** against a 16 667 µs frame — **0.003 %**. Not a defect. *(Recorded because my first pass mislabelled ns as µs and would have filed a 3 %-of-frame BLOCKER. The baseline column is what caught it — always carry one.)*

**INFO-2 · "The root barrel bloats the bundle" — NOT SUPPORTED.**
`:408-423` uses three disciplines at once, but it is *mostly* principled: `DockControl`, `LabeledInput`, `LabeledSelect` are **not** in the 158-export root barrel, so those must be subpaths. The one true inconsistency is `Tooltip*`, which **is** in the barrel yet is imported from `/tooltip` (`:422`) — the narrower, better choice. Root-barrel use is the house style (31 demo files; cf. lane-frontend §3.1). `glass-ui/package.json` declares `sideEffects: ["*.css"]`, so the barrel's ~40 chunk edges are tree-shakeable and a size claim is unfounded without a build diff. **Do not file this.** *Would-be falsifier* — a `KF_ANALYZE=1` chunk dump (`vite.config.ts:350`) showing the barrel dragging `command`/`data-table`/`configurator` into this component's group.

**INFO-3 · R1 reachability — negative, with an upstream datum.**
This component reaches value.js's parser via `parseTimingFunction`/`easing` (`animationDescriptions.ts:128-129`), not `parseCssColor`; its only *direct* value.js edge is `clamp` from `/math` (`:426`, see m-6); the engine's `options.ts:17` pulls `parseCssScalar` from `/css` — still not the colour parser. **R1's specific crash is not reachable from this component's seams.** The R1-*class* hole in `parseTimingFunction` is real and is filed under S-4.

**INFO-4 · Engine-accessor choice is sanctioned, not a deviation.**
`:538-547` awaits `loadAnimationEngine()` in `onMounted` rather than using the synchronous warmed `kfEngine()`. That looks wrong until `demo/kf-engine.ts:12-20`: *"Most demo sites await `loadAnimationEngine()` directly at their point of need … This module is the ONE extra ergonomic seam for the SCENE-MACHINE hot path."* Per-site await **is** the house idiom; `kfEngine()` is the exception. `main.ts:50-52` awaits `warmKfEngine()` before `app.mount()`, so the promise is already memoised and the empty window is one microtask, exactly as `:531-534` claims. **Not a defect.** (m-9 is about the *placeholder* during that window, not the accessor.)

**INFO-5 · Two checks that came back clean, plus one out-of-axis carry.**
(a) The teleport resolves — `RibbonBar.vue:7` owns `#controls-ribbon-target`, and `defer` (Vue 3.5) handles mount order (`:377`). (b) The emit graph is complete in both directions: all five declared emits (`:512-524`) are consumed at `ChannelControls.vue:109-113`, and all six `PlaybackRibbon` emits (`:123-131`) have handlers at `:384-399`. No orphans. (c) *Carried from the prior draft, out of axis:* `class="panel-stack relative"` (`:6`) is an orphan — `grep -rn panel-stack demo/ src/` returns that one occurrence and **no rule anywhere**. It is a CSS/design finding; routed to the D lane, not counted here.

**Prior-draft mapping** (nothing lost): C-1→B-1 · C-2→M-7 · C-3→M-8 · C-4→m-7 · C-5→m-9 · C-6→M-6 · C-7→m-8 · C-8→m-6 · C-9→INFO-5(c) · C-10→m-2 · C-11→m-1 · C-12→m-3 · NON-1→INFO-1 · NON-2→INFO-2 · S+1→S-1 · S+3→S-2 · **S+2 → withdrawn, reclassified as M-5** (the vendor limitation it praises does not exist in the installed 7.0.0).

---

## §6 · Recommended order, if a repair wave is authorised

1. **B-1** — and it is one move: bring the store write **inside** `trySetOption`'s success path at all five sites (or validate on read in `getStoredAnimationOptions`). Nothing downstream is trustworthy while the persisted store can hold engine-rejected values.
2. **B-2 / F-1** — declare and lock `@mkbabb/glass-ui: 7.0.0`; per lane-frontend's own ordering, nothing below is reproducible until it lands.
3. **M-8 + M-1..M-4 as one wave** — add `vue-tsc` to `check`, then reconcile the prop names it will now flag (`tooltip`→`description`, `descriptions`→ hand-render or a glass-ui ask, `isOpen`→`open`, `label-class`→ delete or a glass-ui ask) across all 4 files / 24 sites. Landing the checker *first* makes the reconciliation mechanical instead of archaeological.
4. **M-7** — small, self-contained, and it reanimates code that is already written and already correct (dispatch on the *name* before collapsing to a kind).
5. **M-6** — two lines (reorder, or guard the first statement). **m-9** rides along.
6. **M-5** — a spec, not a swap; the synthetic-`EasingPickerValue` round-trip needs designing. Track with census S-3/S-4.
7. Minors as cleanup; **m-1** should ride whichever wave touches the `.labeled-field-grid` seam.
