claude-opus-5[1m]

# CHALLENGE · `ChannelOptions.vue` · axis C — CONSUMPTION

**Target:** `/Users/mkbabb/Programming/keyframes.js/demo/components/instrument/transport/channel-controls/ChannelOptions.vue` (609 L)
**Axis:** how this component consumes **keyframes.js** (the engine under test) and **glass-ui 7.0.0** (the design system), plus its **value.js 4.0.0** transitive exposure, props/emits contract quality, and its integration seams with `ChannelControls` / `TimingFunctionPanel` / `LayerConfigPanel` / `PlaybackRibbon`.
**Mode:** static, read-only. No installs, no dev server, no browser tooling. `node --input-type=module` probes against the **already-installed** `node_modules/@mkbabb/value.js@4.0.0` and `@mkbabb/glass-ui@7.0.0` dists are evidence-gathering only (the same idiom `lane-frontend.md §3.1` used); nothing was written or mutated in `keyframes.js`.
**Posture:** the component is assumed DEFECTIVE until the tree proves otherwise — but **a false defect is worse than a missed one**. Two hypotheses I formed died against their own falsifiers and are recorded below as non-defects (§NON-1, §NON-2) rather than quietly dropped. One further hypothesis (the `"∞"` display token round-tripping into a throw) died against `engine/options.ts:54-58` and is recorded in §KILLED.

**Tally:** 12 defects (1 BLOCKER · 5 MAJOR · 6 MINOR) · 2 recorded non-defects · 3 superlatives.

---

## Files read whole (read-only)

| file | why |
|---|---|
| `demo/…/channel-controls/ChannelOptions.vue` | target |
| `demo/…/channel-controls/ChannelControls.vue` | the parent seam (mount gate + emit forwarding) |
| `demo/…/channel-controls/TimingFunctionPanel.vue` | child; `progress` / `updateTimingFunction` seam |
| `demo/…/channel-controls/LayerConfigPanel.vue` | child; `isOpen`/`setOpen` function-prop seam |
| `demo/…/channel-controls/composables/useTimingFunctionEditor.ts` | the timing-function persist authority |
| `demo/…/channel-controls/composables/useAnimationSync.ts` | the rAF reactivity bridge |
| `demo/…/channel-controls/composables/usePlaybackToggle.ts` | the play/reverse seam |
| `demo/components/playback/PlaybackRibbon.vue` | the teleported child + its emit payloads |
| `demo/…/transport/composables/useDemoTicker.ts` | the shared rAF driver |
| `demo/utils/reference-data/animationDescriptions.ts` | **the value.js `/css` + `/easing` seam** |
| `demo/utils/reference-data/easingGroups.ts` | the dropdown catalogue |
| `demo/utils/reference-data/timingCurveUtils.ts` | the value.js `/easing` wrappers |
| `demo/state/animationOptionsStore.ts`, `state/storeUtils.ts` | the persisted store |
| `demo/scenes/cube/useCubeDemo.ts`, `demo/components/instrument/keyframes/composables/useKeyframeOps.ts`, `.../utils/parseAnimationCSS.ts` | the store's *readers* (the blast radius) |
| `src/animation/engine/options.ts`, `engine/animation.ts`, `constants/types.ts`, `load-engine.ts`, `internal/animation-id.ts` | the engine contracts consumed |
| `node_modules/@mkbabb/glass-ui/dist/components/{labeled-field,dock}/**.d.ts`, `dist/forms.js`, `dist/labeled-field.js` | the glass-ui contracts consumed |
| `tsconfig.json`, `demo/env.d.ts`, `package.json`, `.github/workflows/ci.yml` | the gate that is supposed to enforce all of the above |

Hitherto corpus folded (not re-derived): `formation/keyframes/lane-frontend.md` (F-1 phantom dep, S-1..S-8 shadow census, §3.1 subpath utilisation 21/73) and `formation/keyframes/lane-library.md` (§4.1 Tier-A parse seams A5/A6, §4.6 demo parse consumers). Cited by id where they overlap; contradicted explicitly where the tree disagrees.

---

## §1 · DEFECTS

### C-1 · **BLOCKER** — the unguarded store write poisons a *fail-explicit* constructor, and the file already knows better

**Where:** `ChannelOptions.vue:33-41` (duration), `:52-60` (delay), `:80-88` (iterations); mechanism at `:461-476`.

The three `LabeledInput` handlers all have the same shape:

```
@update:model-value="(v) => {
    trySetOption(() => animation.setDuration(v));          // :35 — throw SWALLOWED
    storedAnimationOptions.animationOptions.duration = v;  // :38 — write UNCONDITIONAL
}"
```

`trySetOption` (`:469-476`) swallows `AnimationOptionError` and the store write sits **outside** the try. So every rejected keystroke is nonetheless persisted.

The store is `useStorage("animation-groups-options-store", …)` (`animationOptionsStore.ts:67-74`) — localStorage, deep-reactive, auto-serialised. Its readers reconstruct the engine from it **with no guard**:

```
demo/scenes/cube/useCubeDemo.ts:52   const matrixAnimationOptions = getStoredAnimationOptions(CUBE_ANIMATION_NAMES.Matrix, SCENE_ID);
demo/scenes/cube/useCubeDemo.ts:57       new CSSKeyframesAnimation(matrixAnimationOptions.animationOptions).fromVars([…])
demo/scenes/cube/useCubeDemo.ts:66   const matrixAnim = shallowRef(markRaw(compileMatrixAnimation()));   ← bare, no try/catch
```

`new CSSKeyframesAnimation` → `normalizeDuration` (`src/animation/engine/options.ts:85-100`) **throws `AnimationOptionError`** on a present-but-unparseable value.

**Measured reachability** (probe against the installed value.js 4.0.0):

```
parseCssScalar("")   → ok=false                                → tryParseTime → undefined → THROW
parseCssScalar("5")  → ok=true  {type:"number", value:5, unit:""} → unit ∉ {s,ms} → undefined → THROW
parseCssScalar("abc")→ ok=true  {type:"keyword"}                → type≠number     → undefined → THROW
```

So a user who types **`5`** meaning "5 seconds" and stops there, or who clears the field, leaves `duration: "5"` / `""` in localStorage. `LabeledInput` emits **per keystroke** — `dist/forms.js` builds the control with `vModelText` + `useVModel(…, {passive:true})`, i.e. the native `input` event, not `change` — so the poisoned intermediate is written the instant it is typed, and the UI gives **zero feedback** that the engine rejected it (the throw is swallowed, the field still reads `5`).

**Same bucket, proven:** `getStoredAnimationOptions(props.animation)` (`ChannelOptions.vue:459`) resolves `superKey = animation.superKey` (`storeUtils.ts:23-33`) and `animationId = getAnimationId(animation) = animation.name` (`src/animation/internal/animation-id.ts:30-34`). `useCubeDemo.ts:67,68` set exactly `matrixAnim.value.name = CUBE_ANIMATION_NAMES.Matrix` and `.superKey = SCENE_ID`. Identical key. And the cube's Matrix channel carries a painting `animation`, so it earns `BUILT_IN_SURFACES` (`state/controlSurfaces.ts:16-20,51`), which includes `controls` — i.e. **ChannelOptions is the editor for that very bucket** (`ChannelControls.vue:97-115`).

**Manifestation:** leave the cube scene and return (or reload). `CubeScene` is a lazy scene (`app/scene/scenes.ts:143`), so remount re-runs `useCubeDemo()` → the constructor throws → the scene does not mount. There is **no error boundary anywhere in the demo**: `grep -rn "errorHandler\|onErrorCaptured\|errorCaptured" demo/` → **0 hits**.

**Why BLOCKER and not MAJOR:** the file's own sibling authority already ruled this exact class and wrote the reasoning down —

> `useTimingFunctionEditor.ts:108-119` — "NEVER the bare `cubic-bezier`/`steps` keyword — that token is what `resolveEasingOption` (← `setTimingFunction` ← `new CSSKeyframesAnimation`) REJECTS with an `AnimationOptionError` **on the next controls re-mount**. This literal is what the editor PERSISTS, so the value the construction path reads back is re-mountable."

The law exists, is correct, is implemented for `timingFunction`, and is **not applied** to `duration` / `delay` / `iterationCount` in the same component. That is a regression against the file's own written standard, not an oversight.

**Compounding doc/impl gap:** the `trySetOption` docstring (`:461-468`) claims "an empty value is omission (no-op), anything else attempts the set". The implementation (`:469-476`) has **no empty check at all** — `""` takes the throw-and-swallow path like everything else, and is then persisted.

**Falsifier — what would kill this claim:**
1. `getStoredAnimationOptions` sanitising a non-empty bucket. It does not: it only substitutes defaults when `!existing || Object.keys(existing).length === 0` (`animationOptionsStore.ts:108-115`); a bucket with a poisoned `duration` is non-empty and is returned verbatim.
2. `checkAndResetExpiredStore` validating values. It is **TTL-only** (`storeUtils.ts:11-21`); `gcAndMigrateStoreBuckets` is **key-only** (`:48-73`).
3. A `try/catch` around any store-fed construction site. `useCubeDemo.ts:66` is bare; so are `:78-98` (rotation) and `:110` (hover).
4. `LabeledInput` emitting only on `change`/blur. Falsified above (`dist/forms.js`, `vModelText`).
5. A global Vue `errorHandler`. Falsified above (0 hits).

If any one of 1–5 held, downgrade to MINOR.

---

### C-2 · **MAJOR** — `step-start` / `step-end` are unreachable: value.js normalises them to kind `steps`, and the demo keys the whole pipeline on kind

**Where:** `ChannelOptions.vue:204-217` (the `Select`'s `model-value` and handler) → `useTimingFunctionEditor.ts:135-168`.

The dropdown's model-value is `timingFunctionKind(stored.timingFunction)` (`:206`) and its handler is `updateTimingFunctionFromName(String(key))` (`:214`). That function **re-normalises the picked key through the same kind function first**:

```
useTimingFunctionEditor.ts:140   const kind = timingFunctionKind(keyOrLiteral);
useTimingFunctionEditor.ts:146   const key = kind as TimingFunctionNames | "cubic-bezier";
useTimingFunctionEditor.ts:149   if (key === "steps") timingFunction = steppedEasing(steps, jumpTerm);
```

Probe against installed value.js 4.0.0 (`parseTimingFunction`, the A5/A6 grammar of `lane-library.md §4.1`):

```
"step-start"  → ok=true  kind="steps"      ← NOT "step-start"
"step-end"    → ok=true  kind="steps"
"ease-in-out" → ok=true  kind="keyword" name="ease-in-out"
```

`timingFunctionState` (`animationDescriptions.ts:68-96`) special-cases only the two **bare draft** tokens `"cubic-bezier"` / `"steps"` (`:69-71`); everything else goes through the parse and takes `parsed.value.kind` verbatim.

**Consequence:** selecting **"step-start — jump at start"** from the Steps family (`easingGroups.ts:95`) resolves `key = "steps"`, builds `steppedEasing(storedStepOptions.steps, jumpTerm)` — and the stored default is **`steps: 100`** (`animationOptionsStore.ts:52-55`) — then persists `steps(100, jump-start)`. The user asks for a **single** jump at the start and gets a **100-step ramp**; the dropdown then snaps its own display to "steps", a different row than the one clicked. `step-end` is identical.

**Proof of intent, not of my inference:** `timingCurveUtils.ts:42-46` carries the *correct* mapping —

```
export const namedEasing = (name: string): EasingFunction => {
    if (name === "step-start") return steppedEasing(1, "jump-start");
    if (name === "step-end")   return steppedEasing(1, "jump-end");
    return requireEasing(easing(name), name);
};
```

— and `updateTimingFunctionFromName` **can never reach it for those two names**, because the `key === "steps"` branch (`:149`) fires first. The author wrote the right answer and the kind-collapse strands it as dead code. This is a value.js-consumption defect, not a value.js bug: `kind: "steps"` for `step-start` is a defensible grammar normalisation; the demo simply must not use `kind` as an identity.

**Falsifier:** show that `timingFunctionState` distinguishes `step-start` (it does not — `:68-96`), or that the `steps` branch defaults to 1 step (it reads `storedAnimationOptions.stepOptions.steps`, default 100), or that `EASING_GROUPS` omits the two rows (it does not — `easingGroups.ts:91-98` renders both as `SelectItem`s at `ChannelOptions.vue:240-271`).

---

### C-3 · **MAJOR** — **no `.vue` file in this repository is ever type-checked**; every props/emits contract in this component is decorative

This is the axis-C keystone: the whole "props/emits contract quality" sub-axis is enforced by nothing.

| probe | result |
|---|---|
| `grep -c "vue-tsc" package.json` | **0** |
| `ls node_modules/.bin \| grep -i tsc` | `tsc` only — **`vue-tsc` not installed** |
| `package.json:37` `"check"` | `tsc --noEmit && tsc --noEmit -p tsconfig.test.json` |
| `npx tsc --noEmit --listFilesOnly -p tsconfig.json \| grep -c "\.vue"` | **0** |
| `.github/workflows/ci.yml:42` | `npm run check:lib` — `tsconfig.lib.json`, **src/ only**; the demo-inclusive `check` never runs in CI |
| `demo/env.d.ts:3-6` | `declare module "*.vue" { const component: DefineComponent<{}, {}, any>; }` |

`tsc` does not parse SFCs, so `include: ["src/","demo/"]` (`tsconfig.json`) silently contributes **zero** `.vue` inputs; and the `*.vue` shim types every SFC as **empty props / `any`**, so even a `.ts` file importing a component gets no checking either.

**What this means for consumption specifically.** glass-ui ships precise contracts and this consumer discards all of them:

- `LabeledSelectProps` (`dist/components/labeled-field/types.d.ts:28-36`): `modelValue: string`, `items: readonly string[]`; emits `"update:open": (value: boolean)`.
  `ChannelOptions.vue:110` and `:134` declare `(v: boolean | undefined) => setOpen('…', v ?? false)` — a stale over-defensive shape against a 7.0.0 emit that is plainly `boolean`. The sibling `LayerConfigPanel.vue:17` models the *same* emit as `(v) => setOpen('blend', v)`. Two spellings of one contract, in one cluster, neither checked.
- `LabeledInputProps` emits `"update:modelValue": (value: string | number)` (`dist/components/labeled-field/LabeledInput.vue.d.ts`).
  `ChannelOptions.vue:81` declares `(v: string) => …`. Under `strictFunctionTypes` (implied by `tsconfig.json:6 "strict": true`), a property of function type is checked **contravariantly**, so `(v: string) => void` is *not* assignable to `((value: string | number) => any) | undefined`. This is the kind of error the gate exists to catch, and there is no gate.
- `DockControl`'s declared props are `shape | compact | active | type | disabled | as | asChild | class` (`dist/components/dock/DockControl.vue.d.ts`). `title` (`:174`, `:340`) is **not** among them — see C-11.

**Severity rationale:** MAJOR, not BLOCKER — nothing crashes *because of* the missing checker; it is the reason C-4/C-6 and the two shape mismatches above survive. It is also the single highest-leverage fix in this file's blast radius (`lane-frontend.md` counts 58 SFCs, 11 984 lines, all unchecked).

**Falsifier:** any `vue-tsc` invocation in `package.json` scripts, `.github/workflows/*.yml`, or a git hook; or a single `.vue` row in the `--listFilesOnly` output. I found none.

---

### C-4 · **MAJOR** — four `as any` at the glass-ui → engine seam, on the two handlers that are *not* guarded

**Where:** `ChannelOptions.vue:104`, `:106`, `:128`, `:130`.

```
@update:model-value="(v) => {
    animation.setDirection(v as any);                            // :104 — NOT wrapped in trySetOption
    storedAnimationOptions.animationOptions.direction = v as any; // :106 — persisted unvalidated
}"
```

Three facts collide:

1. `LabeledSelect` is typed `modelValue: string` and emits `(value: string)`; the engine wants `InputAnimationOptions["direction"] = (typeof DIRECTIONS)[number]` (`src/animation/constants/types.ts:186`). **A cast is genuinely required** — but `as any` is the maximal one; `as AnimationOptions["direction"]` is the narrow, honest form and would still red if `DIRECTIONS` changed shape.
2. `normalizeDirection` / `normalizeFillMode` (`engine/options.ts:120-148`) **throw `AnimationOptionError`** on an off-enum value — and unlike the three text fields (`:35`, `:54`, `:82`) these two calls are **not** wrapped in `trySetOption`. The asymmetry is arguably defensible (a closed item list vs free text) but it is undocumented, whereas the text-field asymmetry *is* documented at `:461-468`.
3. The store write is again unconditional and feeds the same C-1 reconstruction path.

**Severity rationale:** MAJOR on the cast and the unguarded call, **not** BLOCKER — I could not construct a reachable off-enum emit. reka's `Select` emits only values drawn from its own rendered items, and those items come from `engine.DIRECTIONS` (`:545`). I am filing the erosion, not a crash, and I say so.

**Falsifier:** demonstrate a path where `LabeledSelect` emits a value outside `:items` (e.g. a controlled-value write-through, or an empty-items edge). If none exists, C-4 stands as a type-hygiene + asymmetry finding at MAJOR; if one exists, it promotes to BLOCKER via the C-1 chain.

---

### C-5 · **MAJOR** — the engine-gated dropdowns render with an **empty item list and no placeholder**, and the mount is an unhandled async

**Where:** `ChannelOptions.vue:531-547`, consumed at `:91-137`.

```
const directions = ref<readonly AnimationOptions["direction"][]>([]);   // :535
const fillModes  = ref<readonly AnimationOptions["fillMode"][]>([]);    // :536
onMounted(async () => {
    updateTimingFunctionFromName(…);                                     // :539  (see C-6)
    const engine = await loadAnimationEngine();                          // :544
    directions.value = engine.DIRECTIONS; fillModes.value = engine.FILL_MODES;
});
```

Three problems, all consumption-shaped:

**(a) The comment's timing claim is false.** `:533-534` asserts "the select items populate within microtasks of mount". `loadAnimationEngine` is `enginePromise ??= import("./public")` (`src/animation/load-engine.ts:123-124`) — a **dynamic import of a separate lazy chunk**. On a cold load that is a network fetch + parse + evaluate of the heavy engine surface, not microtasks. (It *is* memoized, and `warmEngine()` exists at `:126-129`, so a warmed app may indeed resolve fast — but ChannelOptions does not call `warmEngine`, and nothing in this file guarantees a prior warm.)

**(b) The primitive's invariant is violated during that window.** `LabeledSelect` is handed `modelValue: "alternate"` with `items: []` — a selected value with **no matching item** — and `LabeledSelectProps.placeholder` (`types.d.ts:32`) is **not passed**. The two rows read blank while the animation genuinely has a direction and fill mode. The comment calls this "an honest pre-load frame"; it is honest only if the frame is short, which (a) disputes, and it is not honest at all in case (c).

**(c) The `onMounted` is `async` with no `.catch`.** If `import("./public")` rejects (chunk 404 after a deploy, offline, CSP), the promise rejection is unhandled and `directions`/`fillModes` stay `[]` **permanently** — the two selects are dead for the session with no error surfaced. Contrast the sibling posture in `useKeyframeOps.ts:96-104`, which routes its engine-dependent async through `withErrorToastAsync` with a retry.

**Falsifier:** show `./public` statically bundled into the demo entry (it is a dynamic `import()` and the `/engine` subpath exists precisely to keep it split), or a `placeholder`/skeleton on those two rows, or a `.catch` / `withErrorToastAsync` wrapper on the `onMounted`.

---

### C-6 · **MAJOR** — `onMounted` calls a **throwing** normalizer on untrusted persisted state, in the one file that wraps every other setter

**Where:** `ChannelOptions.vue:538-542`.

```
onMounted(async () => {
    updateTimingFunctionFromName(
        storedAnimationOptions.animationOptions.timingFunction as TimingFunctionNames,  // :540-542
    );
```

`updateTimingFunctionFromName` throws a bare `TypeError` when the kind is unresolvable:

```
useTimingFunctionEditor.ts:141   if (kind === undefined) {
useTimingFunctionEditor.ts:142       throw new TypeError(`Invalid timing function ${JSON.stringify(keyOrLiteral)}.`);
```

`timingFunctionKind` returns `undefined` whenever the value is **non-string** (`animationDescriptions.ts:72-74`) or fails **both** the CSS parse and the value.js easing-registry lookup (`:76-95`). And the field it is fed is typed

```
src/animation/constants/types.ts:192-197
    timingFunction: TimingFunction | Easing | TimingFunctionNames | string | undefined;
```

— i.e. a **function or an object is type-legal** in that store slot. The `as TimingFunctionNames` cast at `:540-542` is the tell: it asserts away exactly the union members that make the call throw. No `try/catch`, and (per C-1) no error boundary in the demo, so the throw takes the whole controls pane down at mount.

**Honest downgrade to MAJOR.** I chased the writers and could not prove a runtime-reachable non-string:
- `useTimingFunctionEditor.ts:166-167` writes a validated literal.
- `useKeyframeOps.ts:80-81` writes `options.timingFunction`, and `parseAnimationCSS.ts:42-49` **serialises it to a string first** (`serializeTimingFunction(timingFunction)`). That kills the "an `Easing` object gets persisted" hypothesis cleanly.
So this is a **type-reachable, not yet proven runtime-reachable** state. It is filed at MAJOR on that basis, and the asymmetry is the substance: the same file wraps `setDuration`/`setDelay`/`setIterationCount` in `trySetOption` precisely because store-fed values may be malformed, then calls the *most* throw-prone normalizer on store-fed state bare.

**Falsifier:** enumerate every writer to `animationOptions.timingFunction` and show all are string-and-resolvable — which promotes this to INFO. Adding a fourth writer (or a hand-edited/older localStorage payload surviving the 7-day TTL) promotes it to BLOCKER.

---

### C-7 · **MINOR** — the dropdown catalogue under-consumes value.js's easing registry by six curves; an out-of-catalogue curve silently blanks the trigger

**Where:** `easingGroups.ts:27-103` (29 entries) vs value.js 4.0.0 `/easing`.

Probe against the installed dist:

```
in value.js bezierPresets (30) but NOT in EASING_GROUPS:
  ease-in-quart, ease-out-quart, ease-in-out-quart,
  ease-in-quint, ease-out-quint, ease-in-out-quint
  → easing(n).ok === true for all six
```

The demo's **own** bezier map already carries all six (`animationDescriptions.ts:33-38`), so `NAMED_EASING_BEZIER` and `EASING_GROUPS` disagree with each other about what the catalogue is.

**Consumption consequence.** If a user authors `animation-timing-function: ease-in-quart` in the Monaco keyframes pane, `useKeyframeOps.ts:80-81` persists it, `timingFunctionKind` resolves it via the registry branch (`animationDescriptions.ts:89-90` → `{status:"registry"}`), and the `Select` at `:204-211` receives a `model-value` with **no matching `SelectItem`** — reka falls back to `<SelectValue placeholder="Pick a curve">` (`:220-222`). The trigger reads "Pick a curve" while the engine really is running `ease-in-quart`. A silent display/state divergence, and the user's next dropdown interaction overwrites the curve they authored.

Note the registry is *not* uniformly richer: `easing("ease-out-bounce").ok === false`, so the demo's lone `ease-in-bounce` Bounce family (`easingGroups.ts:87-90`) is correct, not lazy. The gap is specific and enumerable: six curves.

**Falsifier:** add `SelectItem`s for the six and the divergence disappears; or show reka's `SelectValue` renders the raw unmatched value rather than the placeholder (it does not — an unmatched value has no item to project).

---

### C-8 · **MINOR** — a **dead prop** couples an always-mounted subtree to a per-frame ref

**Where:** `ChannelOptions.vue:317` → `TimingFunctionPanel.vue:69`.

`ChannelOptions.vue:506-510` computes `normalizedProgress` from `currentT`, and passes it at `:317`:

```
<TimingFunctionPanel … :progress="normalizedProgress" … />
```

`TimingFunctionPanel` declares `progress?: number` at `:69` and **never reads it** — across the whole 166-line file the identifier appears exactly once, in the declaration. It is not forwarded to `EasingPicker`, which is explicitly given `:playback="false"` (`:38`).

Meanwhile:
- `currentT` is written on **every rAF tick** by `useAnimationSync.ts:53` under the shared `useDemoTicker` driver (`useDemoTicker.ts:18-23`).
- The detail-panel row (`ChannelOptions.vue:303-324`) carries **no `v-if`** — it is always mounted, only visually collapsed via `grid-template-rows: 0fr` (`:565-566`). So `TimingFunctionPanel` is a permanent child.

Net: while the animation plays, ChannelOptions' render effect and TimingFunctionPanel's render function are both invalidated **every frame** to deliver a number nobody consumes. (Vue 3 computeds only trigger on an actual value change, and a float progress changes every frame, so the caching does not save it.)

Scope bound, honestly: `ChannelControls.vue:97-98` gates the whole component on `selectedControlSurface === 'controls'`, so this costs nothing while another surface is active — but `controls` is the default surface.

**Falsifier:** any read of `progress` in `TimingFunctionPanel` or a descendant. There is none. Deleting the prop and the `normalizedProgress` computed is a zero-behaviour-change edit.

---

### C-9 · **MINOR** — `.panel-stack` is an orphan class posing as a layout contract

**Where:** `ChannelOptions.vue:6` — `<div class="panel-stack relative">`.

Probe:

```
grep -rn "panel-stack" demo/ node_modules/@mkbabb/glass-ui/dist/
→ demo/components/instrument/transport/channel-controls/ChannelOptions.vue:6      (the only hit, anywhere)
```

No rule — scoped, global, glass-ui, or Tailwind-generated — ever matches it. The sibling hooks on the same element tree *are* real (`.panel-row` / `.panel-content` at `:552-583`, `.labeled-field-grid` at `design-idioms.css:255-273`), which is what makes this one misleading: it reads as the named container of the sliding-panel idiom and is inert markup.

**Falsifier:** a matching rule anywhere in the resolved cascade (`demo/styles/*.css`, any `<style>` block, glass-ui's `styles` index). None found.

---

### C-10 · **MINOR** — `title` is used as the accessible name on a primitive that declares no `title` prop, and is then doubled by a glass Tooltip

**Where:** `ChannelOptions.vue:165-189` (the easing pencil) and `:337-345` (the advanced Back control).

```
<Tooltip><TooltipTrigger as-child>
    <DockControl shape="icon" compact title="Edit easing curve" class="easing-edit-btn text-gold" …>
        <Pencil class="icon-sm" />
    </DockControl>
</TooltipTrigger><TooltipContent>Edit easing curve</TooltipContent></Tooltip>
```

- `DockControl`'s declared props are `shape | compact | active | type | disabled | as | asChild | class` (`dist/components/dock/DockControl.vue.d.ts` `__VLS_Props`). **`title` is not one of them**, so it lands as a fallthrough attribute on the host `<button>`.
- The button's only content is an icon, so that native `title` is *also* the button's accessible name — and the `TooltipContent` carries the **same string**, producing a native browser tooltip stacked on the glass tooltip.
- `title` is the weakest accessible-name channel (never surfaced to keyboard-only or touch users).
- The same seam is modelled two ways in one file: `:340` uses `title="Back"` with **no** Tooltip wrapper.
- The file already demonstrates the contract-correct channel 30 lines below: `<SelectTrigger aria-label="Timing function">` (`:219`). glass-ui's own docblock says *"Role rides the consumer"* — the consumer is supposed to supply `aria-label`.

**Falsifier:** a `title` prop on `DockControl` in 7.0.0 (absent), or evidence glass-ui strips `title` from fallthrough attrs (it does not — `inheritAttrs` is not disabled on the control host).

---

### C-11 · **MINOR** — the sibling's contract prose names a mechanism this file deleted

**Where:** `LayerConfigPanel.vue:2-6` vs `ChannelOptions.vue:594-603`.

`LayerConfigPanel` documents its own layout dependency as:

> "…into ChannelOptions's advanced-sub-pane `.panel-content`, where the host's `.panel-content :deep(.labeled-field)` rule gives them the label-LEFT / value-RIGHT intra-row `[auto_1fr]` shape (one DRY source …; this component does NOT re-author it)."

ChannelOptions' own `<style scoped>` records that rule as **deleted**:

> `:594-603` — "the per-row `:deep(.labeled-field){auto 1fr}` rule (W9 F1 …) is GONE — REPLACED by the `.labeled-field-grid` subgrid idiom (design-idioms.css §LABEL-subgrid) … The `:deep` was needed because the rule reached glass-ui's `.labeled-field` across the shadow boundary; the idiom is GLOBAL … so it reaches `.labeled-field` directly with no `:deep`."

The `<style scoped>` block contains no `:deep` rule at all. The mechanism that actually carries LayerConfigPanel's rows is `design-idioms.css:255-273` (`.labeled-field-grid > .labeled-field { grid-template-columns: subgrid }`), applied via the wrapper at `ChannelOptions.vue:359` — and the sibling never names it. Same class as census **S-2** (glass-ui tab prose describing `<SegmentedTabs>` while the tree renders `KfPillTabs`): the documentation and the tree disagree at an integration seam, which is exactly where a reader trusts prose most.

The *rendering* is fine — I verified glass-ui's root class really is `labeled-field` (`dist/labeled-field.js:34`), and `LayerConfigPanel`'s multi-root fragment leaves those elements as direct DOM children of the grid, so the `>` combinator lands. Only the contract prose is wrong.

**Falsifier:** a live `.panel-content :deep(.labeled-field)` rule anywhere in `ChannelOptions.vue`'s style block. There is none.

---

### C-12 · **MINOR** — dead seam surface across the composable boundary, with a docstring describing a different variable

**Where:** `ChannelOptions.vue:478-486`; `useTimingFunctionEditor.ts:38-41, 219-236`.

- `convertedFromName` is destructured at `:479` and referenced **nowhere** in the template or script.
- `useTimingFunctionEditor` also returns `easingItems`, `activeCurvePath`, `onEasingLabelClick`, `setAnimationTimingFunction` — none consumed by ChannelOptions. `activeCurvePath` (`:66-81`) and `easingItems` (`:24-26`) are residue of the deleted bespoke `EasingSelect`, whose retirement this very file narrates at `:191-203` ("the bespoke EasingSelect … died with the instrument/easing cluster"). The composable kept the dead half.
- `advancedOpen` (`useTimingFunctionEditor.ts:38`) is **neither read nor written inside the composable** — it exists solely as ChannelOptions' *advanced sub-pane* flag (`:282`, `:330`, `:342`), hoisted into a composable it has nothing to do with, and carrying the docstring **"Whether the detail panel (cubic-bezier / steps) is open"**. That is a description of `showDetailPanel` (`:58-63`), a different variable. A reader tracing panel state is actively misled.

**Falsifier:** any consumer of those five names elsewhere in the tree (`grep -rn "activeCurvePath\|easingItems\|onEasingLabelClick\|setAnimationTimingFunction\|convertedFromName" demo/` — the composable's own definitions and this destructure are the only hits).

---

## §2 · RECORDED NON-DEFECTS (hypotheses that died against their falsifiers)

These are stated because the axis invites both claims and a later lane should not re-derive them.

### NON-1 · The unmemoized value.js parse in the render function is **measurably free** — do NOT file it as a perf defect

`ChannelOptions.vue:206` calls `timingFunctionKind(...)` as a **raw template expression**, not a computed, so under C-8 a full `parseTimingFunction` (+ registry lookup on the failure branch) runs on every frame. The obvious claim writes itself. I measured it instead:

```
timingFunctionKind, 20 000 calls after 2 000 warm (installed value.js 4.0.0):
  "ease-in-out"                     0.19 µs/call   (keyword parse hit)
  "ease-out-back"                   0.38 µs/call   (parse MISS + diagnostics + registry hit — worst named path)
  "steps(100, jump-start)"          0.46 µs/call
  "cubic-bezier(0.2, 0.65, 0.6, 1)" 0.87 µs/call   (worst overall)
```

0.87 µs is **0.005 %** of a 16.7 ms frame. **This is not a performance defect.** The sibling `TimingFunctionPanel.vue:79-81` wraps the identical call in a `computed`; the inconsistency is stylistic. Filed here so the measurement survives and nobody "optimises" it on intuition. C-8 stands on the dead prop, not on parse cost.

### NON-2 · Root-barrel vs subpath import mixing is a consistency delta, **not** a bundle defect

`ChannelOptions.vue:409-420` draws `Card`, `CardContent`, `Select*`, `Separator` from the **root barrel** while `:421-423` draw `DockControl`, `Tooltip*`, `Labeled*` from subpaths — even though `./card`, `./select`, `./separator` all exist among the 73 exports (enumerated; consistent with `lane-frontend.md §3.1`, 21/73 reached). The "barrel = shipped bloat" claim **fails its falsifier**: `node_modules/@mkbabb/glass-ui/package.json` declares `"sideEffects": ["*.css"]`, so a production build tree-shakes the barrel to the same graph the subpaths would produce. The residual cost is dev-server module-graph breadth and intra-file inconsistency. INFO, deliberately not filed as a defect.

Counterpoint worth naming: the file's **value.js** import is exemplary — `import { clamp } from "@mkbabb/value.js/math"` (`:426`), the narrow `/math` subpath, used once (`:509`), rather than a root import. The transitive value.js exposure that matters here is not the direct import at all; it is the **indirect** `/css` + `/easing` reach through `animationDescriptions.ts:128-129` (`lane-library.md §4.6` row 4), which is where C-2, C-6 and C-7 all live.

### KILLED · the `"∞"` display token does **not** poison the store

I hypothesised that `:64-76` rendering `"∞"` for an infinite iteration count, combined with the unconditional store write (C-1), would persist `"∞"` and throw on reconstruction. It does not: `normalizeIterationCount` (`engine/options.ts:49-58`) explicitly accepts `"infinite"`, **`"∞"`**, `"Infinity"`, and `Infinity`. The demo's display token is a first-class engine input. Recorded so the C-1 write-path claim rests only on the values I actually probed (`""`, `"5"`, `"abc"`).

---

## §3 · SUPERLATIVES (L-18 runs both ways — each with its own falsifier)

### S+1 · `timingFunctionLiteralFor` — the persist-literal law is exactly right, and it is the best value.js-consumption reasoning in the cluster

`useTimingFunctionEditor.ts:108-133`. The editor persists the **complete, re-parseable CSS literal** (`cubic-bezier(x1,y1,x2,y2)`, `steps(n, term)`) rather than the bare grammar keyword, because the bare keyword is what the engine's construction path rejects. One persist seam; every caller — dropdown, in-panel picker, bezier drag — funnels through it (`:161-167`).

I verified the premise rather than trusting the comment:

```
parseTimingFunction("cubic-bezier(0.2, 0.65, 0.6, 1)") → ok=true,  kind="cubic-bezier"
parseTimingFunction("cubic-bezier")                    → ok=false; easing("cubic-bezier").ok=false
parseTimingFunction("steps(100, jump-start)")          → ok=true,  kind="steps"
parseTimingFunction("steps")                           → ok=false; easing("steps").ok=false
```

The comment's causal chain (`resolveEasingOption` ← `setTimingFunction` ← `new CSSKeyframesAnimation`) is accurate and matches `lane-library.md §4.1` A5. This is a consumer that read the library's failure posture and designed its persistence format around it. It is also precisely why C-1 is a BLOCKER: the standard is written down, in this cluster, by this author.

**Falsifier:** a bare `cubic-bezier`/`steps` keyword reaching the constructor from this store. `updateTimingFunctionFromName` always writes through `timingFunctionLiteralFor` (`:166-167`); the only other writer serialises first (`parseAnimationCSS.ts:48`).

### S+2 · `isSeedEcho` — the correct answer to a vendor limitation, forwarded rather than hidden

`TimingFunctionPanel.vue:106-130`. glass-ui's `EasingPicker` has an **emit-only** `modelValue` with no external write-through, so a `:key` remount fires an immediate emission carrying the *catalogue* seed, which would clobber the animation's stored curve on every panel open. The consumer discriminates that echo **by value** — an epsilon quad compare (`quadEq`, tolerance 5e-4, `:84-87`) plus a named fallback for the no-preset-matched case (`:120-128`) — rather than by a timer, a mount flag, or a `nextTick` guard. By-value is the only formulation that survives a legitimate edit landing on the seed's own quad.

Equally to its credit: the gap is **documented at the call site** (`:25-31`) and **forwarded upstream** (`KF-TO-GLASSUI-BG.md §FORWARDING`, plus an `initialPoints` ask) rather than patched into a local fork — the exact posture `lane-frontend.md` S-1 condemns `KfPillTabs` for *not* taking.

**Falsifier:** an authored edit that `isSeedEcho` swallows. Possible only when the user drags to within 5e-4 of the seed quad — a no-op edit. The tolerance is tight enough that the failure mode is benign, which is the point.

### S+3 · `useAnimationSync`'s gate is reasoned from the deadlock, not from a timeout

`useAnimationSync.ts:5-27` names the trap it avoids in the first-person: *"gating on `isStarted` (an **OUTPUT** this loop COMPUTES) deadlocks — `isStarted` never flips because the loop that would flip it is gated off."* The gate therefore resumes only on **inputs the loop does not own** (`isPlaying`'s edges, document visibility) and idles only after a re-arming stable window (`SETTLE_FRAMES = 30`, `:27`, `:64-68`). The exported `wake()` (`:73-76`) closes the remaining hole — scrubbing a *settled* animation mutates `effectiveT` without touching `isPlaying` — and ChannelOptions wires it at all three scrub entry points (`:386`, `:393`, `:394`).

This is the rare demo-side rAF loop that neither burns a frame at rest (the pre-D.W3.S4 behaviour it replaced) nor deadlocks, and it says why in a form that can be checked.

**Falsifier:** a state transition the loop must observe that neither re-arms the stable window nor flips an input it watches. I tried to construct one (engine-internal wrap on `alternate` direction, an external `setChildTime`, a tab-hidden advance) and each is covered by `:44-51`'s three-value change detect, `wake()`, or the visibility watch respectively.

---

## §4 · Provenance & law compliance

- Every claim above carries `file:line` and a falsifier; the four probe blocks are reproducible with the commands shown against the **already-installed** dists.
- **No browser tooling was used.** No claim in this document depends on a live render. Nothing here is marked `UNPROVEN-NEEDS-LIVE` because nothing here required it — the one candidate (C-5's "how long is the empty-items window in practice?") is filed on the *static* facts (dynamic import + missing placeholder + missing catch), and the *duration* question is deferred to SS-13 as a note, not as a claim.
- `/Users/mkbabb/Programming/keyframes.js` was treated as read-only evidence: no file written, no file mutated, no install, no dev server, no build. The single `npx tsc --noEmit --listFilesOnly` invocation emits no artifacts (`--noEmit`) and was used solely to enumerate compiler inputs for C-3.
- Corpus folded, not re-invented: `lane-frontend.md` F-1 (phantom glass-ui dep — **note it compounds C-3**: an undeclared, unlocked dependency whose `.d.ts` contracts are also never checked), S-2 (prose-vs-tree drift, the class C-11 belongs to), §3.1 (subpath utilisation, cited in NON-2); `lane-library.md` §4.1 A5/A6 and §4.6 (the `parseTimingFunction` seam this component reaches through `animationDescriptions.ts:76`).
- **Contradiction of the corpus:** none. `lane-frontend.md:212` lists ChannelOptions' glass-ui surface as `Card*, Select*, Separator, DockControl, Tooltip*, LabeledSelect/LabeledInput` — the tree agrees exactly.

---

## §5 · Recommended order (if a repair wave is authorised)

1. **C-1** — move the store write inside the success path (or validate before persisting). One-line-per-handler; unblocks the crash class. Independently: guard the three `useCubeDemo` construction sites.
2. **C-3** — add `vue-tsc` and put `check` (not just `check:lib`) in CI. Nothing below is durably verifiable until SFCs are checked; C-4's shape errors red immediately once it lands.
3. **C-2** — key the timing-function pipeline on the *picked name*, not on `timingFunctionKind`, so `step-start`/`step-end` reach the mapping `timingCurveUtils.ts:43-44` already implements.
4. **C-6, C-5** — guard the `onMounted` (try/catch + `.catch`), pass a `placeholder`, or seed `directions`/`fillModes` from a static constant.
5. **C-8, C-9, C-12** — deletions (dead prop + dead computed, orphan class, dead composable returns). Zero behaviour change.
6. **C-7, C-10, C-11** — catalogue completion, `aria-label` over `title`, prose reconciliation.
7. **C-4** — narrow the four `as any` once C-3 makes the narrow cast checkable.
