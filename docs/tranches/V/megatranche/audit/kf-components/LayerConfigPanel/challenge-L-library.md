claude-opus-5[1m]

# CHALLENGE · `LayerConfigPanel.vue` · axis L (LIBRARY)

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/components/instrument/transport/channel-controls/LayerConfigPanel.vue` (92 lines)
**Tree** keyframes.js `master` HEAD `8281638c fix(demo-shell): provide tooltip context for the routed control group`
**Mode** static, read-only. No installs, no dev server, no browser. Every runtime claim is derived from the *installed* `node_modules/@mkbabb/glass-ui@7.0.0` dist + `node_modules/reka-ui` dist + Vue's documented prop-resolution rules, and each carries its own falsifier.
**Hitherto corpus folded** `formation/keyframes/lane-frontend.md` (F-1 phantom dep; the file is rostered at lane-frontend §4 "transport" table, 92 L, glass-consuming) · `lane-library.md` (§7.5 failure-posture inconsistency; §7.4 LEG-3 stale-comment-vs-code pattern). No contradiction of either lane; **this challenge escalates F-1 from RED-reproducibility to RED-behavioural** — F-1 does not merely break `npm ci`, it has *already* silently broken three of this component's four controls.

---

## 0. Verdict

| | count |
|---|--:|
| BLOCKER | **3** |
| MAJOR | 4 |
| MINOR | 7 |
| INFO | 2 |
| **findings total** | **16** |
| superlatives (L-18 reverse) | 3 |

**Headline.** The component is authored against **glass-ui ≤ 6.x's `labeled-field` API**. Glass 7's `feat(BI)` cut (`/Users/mkbabb/Programming/glass-ui` `490cc46e`, 2026-07-16) **renamed or deleted every prop this file relies on** — `isOpen`→`open`, `checked`/`update:checked`→`modelValue`/`update:modelValue`, `descriptions` deleted, `tooltip` deleted. 7.0.0 is what is installed. Because glass-ui is undeclared in `package.json`/`package-lock.json` (lane-frontend **F-1**) *and* because nothing in this repo type-checks a `.vue` template (`npm run check` = **`tsc`**, not `vue-tsc`; CI runs only `check:lib` = `src/` only), the break is invisible to every gate the repo owns. Three of the four layer controls are dead. This is the sharpest instance of "the glass-ui phantom-dep exposure where it bites" that the census predicted.

**Standing-law note.** Two of the three blockers are compounded by a *producer* defect (glass-ui declares `open`/`modelValue` as bare `{ type: Boolean }`, so absence Boolean-casts to `false` and is then forwarded to reka as an explicit `false` — reka's own roots deliberately set `default: void 0` to dodge exactly this). Per the standing BH/BI relay edict, that half belongs in the glass-ui inbox, not in a kf patch.

---

## 1. BLOCKERS

### B-1 · The `enabled` switch is a dead control that also renders a false OFF state — BLOCKER

**Claim.** `LayerConfigPanel.vue:61-66` binds `:checked` / `@update:checked`. Installed `LabeledSwitch` has no such prop and no such emit; it declares `modelValue: { type: Boolean }` and emits `update:modelValue`.

Provenance:
```
LayerConfigPanel.vue:61-66
    <LabeledSwitch label="enabled" tooltip="…"
        :checked="layerConfig.enabled"
        @update:checked="(v: boolean) => emit('update', { enabled: v })" />

node_modules/@mkbabb/glass-ui/dist/components/labeled-field/types.d.ts:40-42
    export type LabeledSwitchProps = Omit<SwitchProps,"class"|"modelValue">
        & LabeledFieldCommonProps & { modelValue: boolean };

node_modules/@mkbabb/glass-ui/dist/labeled-field.js   (LabeledSwitch runtime)
    props: { …, modelValue: { type: Boolean } },  emits: ["update:modelValue"]

glass-ui@490cc46e^:src/components/labeled-field/LabeledSwitch.vue:25,40   (the API this file was written against)
    checked: boolean;                 ← DELETED by Glass 7
    "update:checked": [value: boolean];  ← DELETED by Glass 7
```

**Two independent failure legs.**

1. *Write leg.* `checked` is not a declared prop → it lands in `$attrs` and falls through `LabeledSwitch` → `LabeledField` → the `.labeled-field` root `<div>` as a literal `checked="true"` attribute. `onUpdate:checked` falls through the same way and is registered on a `<div>`, which never emits `update:checked`. The user's toggle emits `update:modelValue`, which **nobody listens to**. `emit('update', { enabled })` never fires.
2. *Read leg.* `modelValue` is absent + Boolean-typed + has no `default` → Vue's `resolvePropValue` boolean-cast resolves it to **`false`**. `LabeledSwitch` then binds `"model-value": e.modelValue` (always present in the child vnode's props) down to glass `Switch` → reka `SwitchRoot`, whose `useVModel(props,"modelValue",emit,{ passive: props.modelValue === void 0 })` (`node_modules/reka-ui/dist/Switch/SwitchRoot.js:69-72`) sees a *defined* `false` → `passive: false` → **fully controlled at `false`, forever**. `AnimationLayerConfig.enabled` defaults to `true` (`src/animation/constants/types.ts:255-256`, `defaults.ts:91`), so the row asserts the exact opposite of the engine's state.

**Falsifier.** Open the advanced sub-pane on a group-backed scene and click the "enabled" switch. If the thumb moves, leg 2 is dead; if `group.animations[name].layer.enabled` changes, leg 1 is dead. Either observation kills this finding. (Also killed if some Vue build resolves an absent Boolean prop to `undefined` rather than `false` — it does not; `resolvePropValue`'s `if (isAbsent && !hasDefault) value = false` is the documented rule, and reka's own roots exist to work around it.)

---

### B-2 · The `blend` dropdown cannot open — `is-open` is not a prop of installed `LabeledSelect` — BLOCKER

**Claim.** `LayerConfigPanel.vue:11` passes `:is-open="isOpen('blend')"`. Installed `LabeledSelect` takes `open?: boolean`. The rename happened in Glass 7.

```
glass-ui@490cc46e^:src/components/labeled-field/LabeledSelect.vue:12,53
    :open="isOpen"            isOpen: boolean;    ← the ≤6 API this file targets
node_modules/@mkbabb/glass-ui/dist/components/labeled-field/types.d.ts:31
    open?: boolean;                                ← Glass 7
```

**The chain that makes it fatal rather than merely inert** (four hops, each read from dist):

1. `is-open` is unknown → `LabeledSelect`'s `open: { type: Boolean }` (dist `labeled-field.js`) is *absent* → Vue boolean-cast → **`false`**.
2. `LabeledSelect`'s render **always** emits the key: `y(E(r), { "model-value":…, open: e.open, … })` — `open` is in the child vnode's props whether or not the consumer supplied it.
3. glass `Select` (`dist/select-DD6Ly6xg.js:10-31`) declares `open: { type: Boolean }` (again no `default`) and forwards with `useForwardPropsEmits`. `useForwardProps` (`node_modules/reka-ui/dist/shared/useForwardProps.js`) keeps every key present in `vm.vnode.props` whose resolved value `!== undefined` → **`open: false` is forwarded explicitly**.
4. reka `SelectRoot` (`node_modules/reka-ui/dist/Select/SelectRoot.js:79-82`) — `passive: props.open === void 0` → `false` → controlled. `open.value` is pinned to the prop. The trigger's click emits `update:open`, the emit chain reaches `setOpen('blend', true)` in `ChannelOptions.vue:491-493`, `openSelect` flips — **and nothing feeds back into `open`, because `is-open` is not a prop.** The listbox never renders.

Note the deliberate contrast that proves the mechanism: reka declares its own `open` as `{ type: Boolean, required: false, default: void 0 }` (`SelectRoot.js:22-27`) precisely to keep absence meaning "uncontrolled". glass-ui's two wrapper layers each dropped the `default: void 0`, re-arming the footgun. **That half is a glass-ui producer bug and warrants a BH relay.**

**Same defect, same file, one level up:** `ChannelOptions.vue:96,120` pass `:is-open` to `LabeledSelect` for `direction` and `fillMode`. The "exclusive select mutex" documented at `ChannelOptions.vue:488-493` is therefore decorative across the whole channel-options surface.

**Falsifier.** Click the blend trigger. If a listbox appears, this finding is dead. Also dead if glass `Select` is *not* the component `LabeledSelect` renders — it is: `labeled-field.js` imports `{ c as r } from "./select-DD6Ly6xg.js"` and that module's export map (`export { … R as c … }`) resolves `c` → `R` → `__name: "Select"`.

---

### B-3 · Nothing re-renders this panel when a layer config is written — every control is write-only — BLOCKER

**Claim.** `layerConfig` is a **raw, non-reactive** engine object. The engine write mutates it in place. No Vue dependency exists, so no render is scheduled.

The chain, end to end:

```
demo/app/App.vue:218                  currentAnimationGroup = shallowRef<AnimationGroup>(…)
demo/app/scene/useSceneMachineShellBinding.ts:75,83,92
                                      currentAnimationGroup.value = markRaw(<group>)
controls-pane/ControlsPaneWrapper.vue:213,230
                                      layer: props.animationGroup.animations[name].layer   ← plain object off a markRaw'd graph
ChannelOptions.vue:360-368            :layer-config="layerConfig"   (identity never changes)
src/animation/group/layer-api.ts:33-35
                                      Object.assign(entry.layer, config); group.invalidateEntries();
```

`shallowRef` + `markRaw` means the group is never proxied at any depth; `props` is only *shallow*-reactive, so `layerConfig.op` / `.zIndex` / `.weight` / `.enabled` are untracked reads of a plain object. `Object.assign` on a plain object triggers nothing.

**Why this is a blocker and not a cosmetic staleness:** every control glass-ui renders here is *controlled* (see B-1/B-2 for the mechanism). A controlled widget whose model can never change is a frozen widget.

- **The weight slider — the one control that is wired 100% correctly (see S-2) — is the clearest casualty.** `LabeledSlider` binds `"model-value": [e.modelValue]` down to reka `SliderRoot`, whose `useVModel(…, { passive: props.modelValue === void 0 })` (`node_modules/reka-ui/dist/Slider/SliderRoot.js:100-103`) is therefore controlled. Dragging emits, the engine's `layer.weight` updates, the render never re-runs, `[e.modelValue]` never recomputes — the thumb snaps back to where it started.
- The z-index `<Input>` survives only by accident: glass `Input` runs its internal `useVModel` with `passive: !0` (`dist/Input-DY7soIPd.js:44-46`), so the field is locally uncontrolled and shows what you type. It still never reflects an external write.

The **only** incidental refresh path is that `isOpen('blend')` is *called during this component's own render* (`:11`), so the panel re-renders whenever `ChannelOptions`'s `openSelect` ref flips — which is coincidence, not design, and (per B-2) is a state the blend select can no longer reach in both directions.

**Falsifier.** Drag the weight slider. If the thumb tracks the pointer and stays put on release, B-3 is dead. Equally killed if any call site wraps the group in `reactive()`/a deep `ref` — enumerated: `App.vue:218` is the sole owner and it is `shallowRef(markRaw(…))`; `SquareScene.vue:174`, `useCubeDemo.ts:106-117` are `markRaw` too; `useAmigaDemo.ts:153` is a bare object never wrapped.

**Correct fix shape (not authored here):** the host should surface the layer as a reactive mirror (or the panel should be `:key`-remounted / driven by a `shallowRef` snapshot the writer re-seats), so the write→render edge exists. A `defineModel`-style two-way binding across a `markRaw` boundary cannot work.

---

## 2. MAJORS

### M-1 · `descriptions` is silently dropped and stringified into the DOM — MAJOR

`LayerConfigPanel.vue:13` passes `:descriptions="COMPOSITE_OPERATOR_DESCRIPTIONS"`. Glass 7's `LabeledSelect` has **no** `descriptions` prop (`types.d.ts:28-36`); its dist render emits bare `{{ item }}` per `SelectItem`. The ≤6 API had it (`glass-ui@490cc46e^:…/LabeledSelect.vue:29-31,55` — `v-if="descriptions?.[item]"`). Consequences: (a) the three operator explanations authored at `demo/utils/reference-data/animationDescriptions.ts:123-127` never render; (b) the object falls through as an attribute and is serialised by `setAttribute` → `descriptions="[object Object]"` on the `.labeled-field` root div. Same at `ChannelOptions.vue:98,122`.

**Falsifier.** Open the blend dropdown (B-2 permitting) and read a row: if "overwrites lower layers" appears beside `replace`, this is dead.

### M-2 · Five dead `tooltip` props — a Glass-7 deletion casualty — MAJOR

`:15, :22, :36, :52, :63` all pass `tooltip="…"`. **No `labeled-field` component in glass-ui 7.0.0 declares `tooltip`** (`types.d.ts:7-42`; dist `labeled-field.js` prop tables). Glass ≤6 did — `glass-ui@490cc46e^:src/components/labeled-field/LabeledField.vue:3,54,116` rendered `<IconTooltip v-if="tooltip && !hideLabel" :text="tooltip">`; `490cc46e` deleted the prop *and* the `IconTooltip` import. So five authored affordances are now `tooltip="…"` attributes on `<div>`s — not a valid HTML attribute, no native tooltip (that would be `title`), no glass tooltip. The repo demonstrably knows the surviving idiom: `ChannelOptions.vue:149-164` wraps the easing label in an explicit `<Tooltip><TooltipTrigger>…`, and HEAD `8281638c` exists solely to mount the `TooltipProvider` those need. 13 sites repo-wide (`grep -rn 'tooltip="' demo --include='*.vue'`); 5 of them are in this 92-line file — the densest concentration in the tree.

**Falsifier.** Hover "blend"/"z-index"/"weight"/"enabled". Any tooltip surfacing kills this. Also killed by a global `[tooltip]` directive/stylesheet — enumerated and absent (`grep -rn '\[tooltip\]' demo` → 0; `grep -rn 'useAttrs' demo` → 0).

### M-3 · The OD-U14 honesty fix was applied to two of four rows; `z-index` and `enabled` stayed silently inert on multi-target groups — MAJOR

`cda6a1a5 fix(demo-blend): make multi-target blend controls explicit and inert` established the principle: *don't offer a layer control where it has no cross-layer effect.* It gated `blend` (`:9`) and `weight` (`:49`) on `blendAvailable`. It left `z-index` (`:34-47`) and `enabled` (`:61-66`) ungated.

But when `blendAvailable === false` — i.e. `AnimationGroup.singleTarget === false` (`AnimationControlsGroup.vue:21`; `src/animation/group/group.ts:159-161`) — the engine takes `renderMultiTarget`, whose entire body is:

```
src/animation/group/entries.ts:91-100
    for (const entry of entries) { entry.animation.interpFrames(entry.animation.t, true); … }
```

It reads **`entry.animation` only — never `entry.layer`.** Its own docblock says so (`:84-90`, "no group composite"). So on a multi-target group:
- `enabled` is inert — the `!entry.layer.enabled` guards live exclusively on the composite path (`compositor.ts:100`, `soa.ts:70`, `entries.ts:73`) and the WAAPI eligibility test (`waapi.ts:39`).
- `zIndex` is inert — it only orders `getEntries()` (`group.ts:171-178`), and ordering is meaningless when each child paints its own target.

Reachable today: `SquareScene.vue:180` sets `animationGroup.singleTarget = false` explicitly, and that scene mounts control surfaces. The row that *was* fixed prints "independent targets"; the two rows beside it keep pretending.

**Falsifier.** Show any consumption of `entry.layer` on the non-`singleTarget` render path. `grep -rn "enabled" src/animation/group/` returns 4 sites, all on the composite/WAAPI path; `renderMultiTarget` is the whole multi-target path (`group.ts:233-235, 300-302`).

### M-4 · The component's contracts are bound to nothing — no `vue-tsc`, no `satisfies`, an unnarrowed `op` — MAJOR

Three cooperating holes, all in this file's own text:

1. `COMPOSITE_OPERATORS = ["replace","add","accumulate"] as const` (`:79`) is a hand-maintained mirror of `CompositeOperator` (`src/animation/constants/types.ts:129`) with **no `satisfies readonly CompositeOperator[]`**. The engine publishes the union as a *type only* — there is no runtime array to import (`grep -rn "COMPOSITE_OPERATORS" src/` → 0). Adding a fourth operator to the engine, or typo-ing one here, reddens nothing.
2. `@update:model-value="(v) => emit('update', { op: v })"` (`:16`) widens `string` (LabeledSelect's declared emit payload, `LabeledSelect.vue.d.ts`) into `op?: CompositeOperator`. Under a template type-check this is an error. The sibling file already hit this and reached for the escape hatch — `ChannelOptions.vue:104-106` writes `v as any` twice.
3. Nothing checks it. `package.json` `"check": "tsc --noEmit && tsc --noEmit -p tsconfig.test.json"` — plain `tsc`, which does not parse `.vue` at all; `vue-tsc` appears in **zero** files (`grep -rn "vue-tsc" package.json .github/workflows/` → 0); and CI runs only `check:lib` (`.github/workflows/ci.yml:42`) whose `tsconfig.lib.json` covers `src/` alone. `cda6a1a5`'s own evidence line ("npm run check") was therefore vacuous for this file.

That triple is the *reason* B-1/B-2/M-1/M-2 could land and survive a glass major bump. Corroboration that the comments predate the installed package: `:32-33` cites "`LabeledField.vue.d.ts:19-26`" for the slot contract — the installed file is **19 lines total** (`wc -l` → 19), and the slot contract actually lives at `types.d.ts:18-26`.

**Falsifier.** Run `vue-tsc --noEmit` and get zero diagnostics for this file. (Not run here — lane law forbids installs; the absence of the tool from the manifest is the static proof.)

---

## 3. MINORS

| id | finding | provenance | falsifier |
|---|---|---|---|
| **m-1** | **Stale header comment.** `:2-6` says the rows get their shape from "the host's `.panel-content :deep(.labeled-field)` rule". `ChannelOptions.vue:594-603` records that rule as **GONE**, replaced by the `.labeled-field-grid` subgrid idiom (`design-idioms.css:250-273`) — and `ChannelOptions.vue:353-359` wraps this component in exactly that. The comment documents a deleted mechanism (the LEG-3 pattern from lane-library §7.4). | file text ×2 | find a live `:deep(.labeled-field)` rule in `ChannelOptions.vue`'s style block |
| **m-2** | **Dead guard.** `v-if="layerConfig"` (`:7`) sits on a prop declared **required** (`:82`), and the sole call site already guards (`ChannelOptions.vue:359 v-if="layerConfig"`). Either the `v-if` is dead or the prop type is a lie; only one call site exists, and it is guarded → dead. | `:7`, `:82`, `ChannelOptions.vue:359-360` | a second, unguarded call site (`grep -rn "LayerConfigPanel" demo` → 2 hits, both in `ChannelOptions.vue`) |
| **m-3** | **`parseInt(...) \|\| 0` invents data.** `:45`. Blanking the field and blurring writes `zIndex: 0` while the field shows empty; `"1e3"` (a value `<input type=number>` accepts) truncates to `1`. Contrast the sibling posture: `ChannelOptions.vue:469-476`'s `trySetOption` treats malformed input as *omission*, never as a value. | `:45` | show `input.value` cannot be `""` or `"1e3"` for `type=number` |
| **m-4** | **The component emits a host-level divider.** `<Separator class="my-1" />` (`:68`) is the last node, so the panel paints a trailing rule separating itself from nothing (it is the final child of the advanced sub-pane, `ChannelOptions.vue:359-369`). A divider between sections is the host's composition concern, not the field-group's. Layout-safe (`design-idioms.css:271-273` spans non-`.labeled-field` children), so this is encapsulation, not breakage. | `:68`, `ChannelOptions.vue:369` | the host grows a section below the layer rows |
| **m-5** | **Redundant scaffolding.** `<template v-if="…">` wrapping a single `<LabeledSlider>` (`:49-59`); `v-if` on the element is equivalent. Vestigial from `cda6a1a5`, which only edited the condition. | `:49-59` | a second child appears in the block |
| **m-6** | **Stringly-typed inverted-emit props.** `isOpen: (name: string) => boolean` / `setOpen: (name, open) => void` (`:84-85`) drill a parent mutex in as callbacks, duplicating the component's existing `emit` channel with a second, untyped one. `'blend'` is a magic string in three places; a typo silently no-ops with no error surface. (And per B-2 the whole mutex is currently inert.) | `:11, :17, :84-85` | show a `v-model:open` / provide-inject alternative is unavailable in this host |
| **m-7** | **Dangling `label[for]` on the degraded row.** The `v-else` branch (`:19-27`) uses `LabeledField` as a static display row. `LabeledField` unconditionally renders `<Label :for="`${id}-control`">` (dist `labeled-field.js`), but the slot holds a plain `<span>` with no such id → a `for` pointing at nothing. Wrong primitive for a non-field row. | `:19-27` + dist render | show `LabeledField` omits `for` when the slot has no control (it does not) |

---

## 4. INFO

**i-1 · No error posture on the layer-write path.** The engine seam is fail-explicit — `setLayerConfig` → `requireEntry(…, "setLayerConfig")` **throws** on an unregistered key (`src/animation/group/layer-api.ts:28-36`, `entries.ts:33-40`). The demo's writer calls it bare: `useAnimationGroupActions.ts:41-46` has no guard, and this component emits straight into it. Contrast `ChannelOptions.vue:461-476`, which wraps every option setter in `trySetOption` and even names the typed error. Unreachable **today** by construction (`ControlsPaneWrapper.vue:213` derives `layer` from `animations[name]?.layer`, so a rendered panel implies a resolvable key), but it is one host refactor from live. This is lane-library §7.5's failure-posture inconsistency reproduced on the demo side.

**i-2 · Engine-consumption gap.** The panel exposes 4 of `AnimationLayerConfig`'s 6 fields (`src/animation/constants/types.ts:230-259`). Unexposed: `properties?: Set<string>` (the per-layer property whitelist, honoured at `entries.ts:74-76` and `compositor.ts:240,265`) and `weightSpring` — the K.W11 PHYS-C spring-driven crossfade that `layer-api.ts:53-97` calls "the flagship demo moment only kf's weight-blend substrate can hold." The demo never calls `transitionLayer`/`crossfade` anywhere (`grep -rn "transitionLayer\|crossfade" demo` → 10 hits, **all** prose about CSS crossfades). Two consequences: (a) a demo that dogfoods the engine leaves its flagship layer API undemonstrated by the one UI that touches layer weight; (b) latently, a live `weightSpring` makes this panel's `weight` write invisible — `resolveBlendWeight` prefers `weightSpring.value` and ignores the constant (`src/animation/group/weight.ts:16-21`). Not a defect today (unreachable); a trap the moment the spring API is wired.

---

## 5. SUPERLATIVES (L-18, reverse direction)

**S-1 · The `blendAvailable === false` branch is honest degradation, not a disabled control.** `:19-27` replaces the blend select with a labelled explanation — "independent targets" + why. It refuses to render an affordance that cannot act, and it *says why* rather than greying out. This is the correct posture, and it is correctly derived from the engine: `blendAvailable` is `AnimationGroup.singleTarget` (`AnimationControlsGroup.vue:21`), computed at `group.ts:159-161` / `:201-204`, and a non-single-target group genuinely never composites (`group.ts:233-235`). *Falsifier:* show `renderMultiTarget` blends layers after all — it does not (`entries.ts:91-100`). (Its incompleteness is M-3; the part that landed is exemplary.)

**S-2 · The weight-slider gate mirrors the engine's `isWeightBlend` exactly.** `:49` shows `weight` only when `op === 'replace'`. The engine: `isWeightBlend = layer.op === "replace" && (weightSpring !== undefined || weight !== 1)` (`src/animation/group/weight.ts:4-6`), and `residualBlendArm` routes `add`/`accumulate` through an un-clamped accumulate that **never reads `weight`**, reaching `resolveBlendWeight` only on the `replace` arm (`compositor.ts:233-262`). The UI therefore hides a control that would be a genuine no-op — a precise, non-obvious read of the compositor. This is the single best piece of engine-consumption in the file. *Falsifier:* find a `weight` read on the `add`/`accumulate` arm.

**S-3 · Zero lifecycle, zero teardown surface, Goldilocks size.** 92 lines; `<script setup>` is 20 lines and contains one const, one `defineProps`, one `defineEmits`. No `ref`, no `computed`, no `watch`, no `onMounted`/`onScopeDispose`, no timers, no listeners, no `useTemplateRef`, no engine handle, no async import. There is nothing to leak and nothing to unregister — the correct shape for a presentational leaf, and a deliberate contrast with its 609-line host. The manual `controlId`/`errorId` slot wiring at `:34-47` is likewise contract-correct against `LabeledFieldSlotProps` (`types.d.ts:18-26`) and is *documented* as the raw-slot fallback. *Falsifier:* any subscription, interval, or global registration in the file — `grep -nE "addEventListener|setInterval|setTimeout|onMounted|watch\(|onScopeDispose" LayerConfigPanel.vue` → 0.

---

## 6. What a repair wave must do first

1. **F-1 before anything.** Declare `@mkbabb/glass-ui@7.0.0` and regenerate the lock (lane-frontend §10.1). Until then no fix to B-1/B-2/M-1/M-2 is reproducible — the API being repaired against is not pinned in either direction.
2. **Add `vue-tsc` to `check` and to CI.** Without it B-1/B-2/M-1/M-2/M-4 are all re-landable tomorrow. This is the gate that would have caught every one of them at the Glass 7 bump.
3. **Relay to glass-ui (BH/BI edict).** `LabeledSelect.open` and `LabeledSwitch.modelValue` are declared `{ type: Boolean }` with no `default: void 0`, so absence Boolean-casts to `false` and is forwarded to reka as an explicit value — converting "uncontrolled" into "permanently off/closed". reka's own roots set `default: void 0` for exactly this reason. Also: Glass 7 deleted `tooltip` from `labeled-field` with no successor slot, and deleted `descriptions` from `LabeledSelect` — both were load-bearing for consumers; a migration note or a replacement seam is owed.
4. **Then** the write→render edge (B-3), then M-3's two ungated rows, then the minors.

---

## Provenance note

Every glass-ui and reka-ui claim is read from the copies **installed in the census target** (`/Users/mkbabb/Programming/keyframes.js/node_modules/`), so no upgrade or install is presumed. The `/Users/mkbabb/Programming/glass-ui` producer repo was read **read-only, history only** (`git show 490cc46e^:…`) to date the API deletions — no file in any repo was written, mutated, executed, installed, or served. No browser was opened; all four "the control does not work" claims are source-derived chains with the live observation named as their falsifier, per lane law.
