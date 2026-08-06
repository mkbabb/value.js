claude-opus-5[1m]

# OrbitalDrag — CHALLENGE, axis C (CONSUMPTION)

**Subject** `/Users/mkbabb/Programming/keyframes.js/demo/scenes/cube/orbital-drag/OrbitalDrag.vue` (352 L)
**Unit read whole** `index.ts` (117 L) · `types.ts` (15 L) · `quaternionEuler.ts` (64 L) · `composables/useOrbitalPointer.ts` (249 L) · `composables/useOrbitalPinch.ts` (201 L) · `composables/useOrbitalInertia.ts` (144 L) · `composables/inertiaDecay.ts` (34 L)
**Seam-adjacent read** `CubeTarget.vue` (sole consumer) · `CubeAxisLines.vue` · `cubeTransformStore.ts` · `CubeScene.vue` · `MatrixEditor.vue` (imports only) · `useTypedTrigger.ts` · `src/animation/index.ts` (kf LIGHT barrel) · `src/animation/physics/decay.ts` · `src/animation/internal/leaves.ts` · `vite.config.ts` · `package.json` · `node_modules/@mkbabb/value.js/dist/subpaths/*` · `test/demo/scenes/orbital-inertia-parity.test.ts` · `test/demo/scenes/orbital-rotate3d.test.ts`
**Corpus folded** `lane-frontend.md` (F-1, S-1..S-8, the 352-line scene row, the "bespoke, no glass counterpart" tally) · `lane-library.md` (§ subpath census, R1 site, LEG-3)
**Method** static + source-derived only. No browser. Three write-free runtime probes (Node ESM isomorphic repro; Vite `ssrLoadModule`; Vite `build{write:false}`) run out of the scratchpad — no repo file touched.

**Verdict: 14 defects · 0 BLOCKERS · 4 superlatives.**
Two of the fourteen (C-1, C-3) are *latent-fatal*: proven-broken mechanisms with zero live call sites. Neither is graded BLOCKER because the tree proves the shipped path does not enter them — but each is a trap laid inside the unit's own advertised API.

The consumption story splits cleanly. **What this component takes FROM the two libraries is close to exemplary** — the value.js subpath choice is the best in the demo, the keyframes.js barrel choice honors ED-3, and the glass-ui non-consumption is correct. **What this component OFFERS its consumers is where it rots** — a barrel export that cannot be imported, three emits nobody listens to firing seven times a frame, a scoped slot nobody uses, a shared mutable model default, and a window-global key latch with no editable-target guard.

---

## §1 · What it consumes — the inbound edges

Complete inbound census of the unit (7 files):

| specifier | site | kind | verdict |
|---|---|---|---|
| `@mkbabb/value.js/math` → `clamp` | `OrbitalDrag.vue:12`, `quaternionEuler.ts:1` | value.js subpath | ✅ S★1 |
| `@mkbabb/keyframes.js` → `decay` | `useOrbitalInertia.ts:13` | kf LIGHT barrel | ✅ S★2 |
| `@vueuse/core` → `useEventListener`, `useTimeoutFn`, `useRafFn` | 4 sites | devDep | ⚠ C-12 |
| `gl-matrix` → `quat`, `vec3`, `mat4` | 5 sites | devDep | ⚠ C-11 |
| `vue` | all | — | ok |
| `@mkbabb/glass-ui` | **NONE** | — | ✅ S★3 |

Two library edges. That is the whole surface, and both are the right one.

---

## §2 · DEFECTS

### C-1 · MAJOR — the unit's own barrel export is a load-order trap

`index.ts:3` re-exports the component:

```ts
export { default as OrbitalDrag } from "./OrbitalDrag.vue";
```

while `OrbitalDrag.vue:18` imports back into that same barrel:

```ts
import { axes, defaultTransformBounds, defaultTransformState, defaultVelocityState } from ".";
```

An ESM cycle by itself is survivable. This one is not, because `defaultTransformState` is read at **module-evaluation scope**, not inside `setup()`. Compiling the SFC with the repo's own `vue/compiler-sfc` (3.5.35) proves it:

```js
export default /*@__PURE__*/_defineComponent({
  __name: 'OrbitalDrag',
  props: /*@__PURE__*/_mergeModels({ … }, {
    "modelValue": { type: null, ...{
    default: defaultTransformState,      // ← module scope, evaluated at import time
} },
```

`defineModel({ default: … })` compiles into the component-options object, which is constructed the instant the module body runs. So the binding is dereferenced during the cycle, not after it.

**Three runtimes, three different outcomes — all wrong except the accidental one.**

| entry order | runtime | result |
|---|---|---|
| `OrbitalDrag.vue` first (what `CubeTarget.vue:112` does) | all | **works** |
| `index.ts` first (the barrel idiom) | native ESM | `ReferenceError: Cannot access 'defaultTransformState' before initialization` |
| `index.ts` first | rolldown prod bundle | silently `default: undefined` |
| `index.ts` first / composable first | Vite SSR + vitest | silently `default: undefined`, **load PASSES** |

Evidence:

1. *Native ESM* — isomorphic 3-module repro (barrel re-exports component; component reads a barrel `const` at module scope) under Node 26: barrel-first `ReferenceError`, component-first `OK`. Structure identical to `index.ts` ↔ `OrbitalDrag.vue`.
2. *Prod bundle* — `vite.build({ write:false, lib.entry: orbital-drag/index.ts })`: reference emitted at line **452** (`"modelValue": { default: defaultTransformState }`), declaration at line **658** (`var defaultTransformState = {`). Reference precedes declaration; rolldown's `var` lowering converts the throw into a silent `undefined`.
3. *Shipped path is clean* — same build with `lib.entry: CubeTarget.vue`: declaration line **43**, reference line **542**. Correct order. **The app does not ship broken.**
4. *Vitest/SSR* — `ssrLoadModule` on all four entry points (`index.ts`, `useOrbitalPointer.ts`, `OrbitalDrag.vue`, `CubeTarget.vue`) returns PASS. The test runner cannot see this class of defect at all.

Why it has never bitten: **every** barrel consumer is `import type` and therefore fully erased under `verbatimModuleSyntax` — `CubeTarget.vue:113`, `useCubeRelit.ts:3`, `cubeTransformStore.ts:4`, `matrix-editor/useTransformState.ts:7`, `test/demo/scenes/cube-scene.test.ts:19`. Not one runtime import of the barrel exists. The `OrbitalDrag` value export at `index.ts:3` has **zero consumers** and would fail if it acquired one.

Note the blast radius is wider than the barrel: `useOrbitalPointer.ts:5`, `useOrbitalPinch.ts:5`, `useOrbitalInertia.ts:5` each carry a *runtime* `import { axes } from ".."` (used only in `(typeof axes)[number]` type position, so not erased). Directly importing any composable — the obvious way to unit-test the gesture readers — enters the cycle barrel-first.

**Falsifier.** Add a runtime `import { OrbitalDrag } from "./orbital-drag"` (or `import { useOrbitalPointer } from "./orbital-drag/composables/useOrbitalPointer"`) to any browser-loaded module and observe the app boot without a `ReferenceError` and with `modelValue.default` defined. That would kill this claim. — *Cheapest kill: make `defaultTransformState` a `defineModel` factory or move the three defaults into a leaf module the barrel and the SFC both import downward.*

---

### C-2 · MAJOR — three of four emits have zero consumers and fire ~7×/frame through the entire glide

The emit contract (`OrbitalDrag.vue:33-41`) declares four events. The sole consumer binds exactly one:

```html
<OrbitalDrag v-model="transform" :apply-transform-to-container="…" @pressed-keys="onPressedKeys">
```
— `CubeTarget.vue:11-16`. No `@rotate`, no `@translate`, no `@scale`. And `CubeTarget.vue` is the only consumer in the repo (`grep -rn OrbitalDrag demo/ scripts/ test/`).

The three dead emits are also the expensive ones, and they are wired into the rAF hot path:

- `syncRotationToModel` (`:89-98`) emits `"rotate"` with a fresh `{ ...model.value.rotate }` on every quaternion mutation, gated only by `isInteracting`. `isInteracting` is set from the drag/touch/wheel watch (`:324-327`) — **during inertia glide all three are false**, so the gate is open for the entire coast.
- `updateLinearTransform` (`:181-182`) emits `"translate"` or `"scale"` with a fresh spread on every call. `applyInertia` (`useOrbitalInertia.ts:105-122`) calls it once per axis per category — up to 6 calls/frame.

Per inertia frame, to zero listeners: **≤7 `emit()` dispatches and ≤7 object spreads**. The spread argument is evaluated before the call regardless of whether a handler exists, so Vue's cheap no-listener path does not save the allocation.

Independent corroboration that the emits are redundant *by design*: the same data already flows through `v-model`, and `useCubeRelit(transform)` (`CubeTarget.vue:149`) reads the model — the emits duplicate a channel the consumer already has.

**Falsifier.** Any consumer, in any repo, binding `@rotate` / `@translate` / `@scale` on `<OrbitalDrag>`. Grep across `demo/`, `test/`, `scripts/` returns none.

---

### C-3 · MAJOR — an unvalidated public prop is fed straight into a keyframes.js API documented `@throws`

`decay()` is explicit about its precondition (`src/animation/physics/decay.ts:56, 66-68`):

```
 * @throws if `friction <= 0` — a non-positive coefficient has no finite
 *   resting point and is a programmer error, surfaced explicitly.
…
    if (k <= 0) {
        throw new Error("decay() requires a friction coefficient > 0.");
    }
```

The consumer builds `friction` from a raw public prop with no validation anywhere on the path:

- `OrbitalDrag.vue:24-31` — `inertiaFactor?: number`, no range, no doc comment.
- `OrbitalDrag.vue:56` — `const inertiaFactor = props.inertiaFactor ?? 0.95;`
- passed through `useOrbitalInertia({ inertiaFactor })` (`:248-259`)
- `useOrbitalInertia.ts:63` — `const friction = inertiaFactorToFriction(inertiaFactor);`
- `inertiaDecay.ts:33-34` — `-Math.log(inertiaFactor) * (1000 / TARGET_DT)`
- `useOrbitalInertia.ts:71` — `const unitDecay = decay({ velocity: 1, friction });` — **at composable-construction time, inside `setup()`**

`inertiaFactor = 1` → `-ln(1)·60 = 0` → `k <= 0` → throw. `inertiaFactor > 1` → negative → throw. `inertiaFactor < 0` → `NaN` → `NaN <= 0` is false → no throw, and every subsequent `Math.exp(-NaN·t)` is `NaN`, silently poisoning `angularVelocitySpeed` and the whole quaternion.

`1` is not an adversarial value. It is the *obvious* reading of a factor named "inertia" — "keep 100% of velocity, spin forever". The throw happens in `setup()`, so it is not recoverable: the component fails to mount and takes the cube scene with it.

`inertiaDecay.ts:31` knows the constraint — *"`inertiaFactor` is a decay-per-frame fraction in (0, 1)"* — but states it in a comment on a module the consumer's prop type never references. The one place a consumer looks (the `defineProps` block) says only `number`.

**Falsifier.** A clamp, a `props` validator, a documented `(0,1)` range on the prop type, or a `try`/`catch` on the `decay()` seat. Grep for `inertiaFactor` across the unit returns four sites, none of which guards. Alternatively: prove no consumer can ever pass the prop — but it is public and optional precisely so they can.

---

### C-4 · MAJOR — window-global keydown with no editable-target guard, against an in-repo law

`OrbitalDrag.vue:276-277` attaches to `window`:

```ts
useEventListener(window, "keydown", (e: KeyboardEvent) => pointer.updatePressedKeys(e, true));
useEventListener(window, "keyup",   (e: KeyboardEvent) => pointer.updatePressedKeys(e, false));
```

`updatePressedKeys` (`useOrbitalPointer.ts:169-176`) inspects only `event.key`. No `event.target` check, no `event.repeat` check.

This is not a style quibble — it is the **only other** `window` keydown in the demo that does not follow the rule, and the rule is written down. `demo/scenes/sequence/useTypedTrigger.ts` is the sole sibling (`grep -rn 'useEventListener(window, "keydown"' demo/` → exactly two hits), and its docblock states the law (`:6-8`):

> *Skips editable targets (inputs / textareas / selects / contenteditable) so it never steals a keystroke from a focused field.*

with the implementation at `:16-23`. OrbitalDrag does the same thing and skips the guard.

The exposure is concrete, not hypothetical: the cube scene mounts `MatrixEditor` (`CubeScene.vue:51, 173`) alongside `CubeTarget` (`:15`), and `MatrixEditor.vue:16` renders glass-ui `<Input>` matrix cells (`MatrixEditor.vue:98` — `import { Input } from "@mkbabb/glass-ui/forms"`). Typing `x` into a matrix cell latches `pressedKeys.x`, which fires `emit("pressedKeys")` (`:317-321`) → `axisLock.x = true` (`CubeTarget.vue:159-163`) → `CubeAxisLines` flips `--axis-active` to 1 and the border to solid (`CubeAxisLines.vue:12-14, 53-56, 73-75`). A keystroke in a text field visibly re-paints a sibling component.

**Falsifier.** Show a target guard on the OrbitalDrag path, or show that no editable element can be mounted concurrently with the cube scene. Both fail against the tree above. — Also `UNPROVEN-NEEDS-LIVE`: the *visual* magnitude of the axis-line flash is for the SS-13 pass; the *state* claim is source-proven.

---

### C-5 · MAJOR — the axis latch has no focus-loss reset, and the modifier re-sync that would cure it covers only half the keys

`useOrbitalPointer.ts:62-66` defines `syncModifiers`, and `drag()` calls it on every `pointermove` (`:100`):

```ts
const syncModifiers = (event: { shiftKey; ctrlKey; metaKey }) => {
    pressedKeys.value.shift = event.shiftKey;
    pressedKeys.value.ctrl  = event.ctrlKey;
    pressedKeys.value.meta  = event.metaKey;
};
```

So `shift`/`ctrl`/`meta` are **self-healing** — a stuck modifier repairs itself on the next pointer move, because `PointerEvent` carries live modifier state. `x`/`y`/`z` have no equivalent field on any pointer event and are **never** re-derived. Their only writer is the window `keyup` (`:277`).

Consequence: hold `X`, then trigger any focus-stealing combo — `Cmd+Tab`, `Alt+Tab`, `Cmd+Shift+3`, a browser shortcut, an OS overlay — and the `keyup` is delivered to the other application. `pressedKeys.x` stays `true` indefinitely. The next drag is silently constrained to X-only rotation (`handleAxisSpecificInput`, `:193-212`), and `CubeAxisLines` shows a permanently lit X line. The only recovery is for the user to guess that they must press and release `X` again.

There is no reset anywhere: `grep -rn '"blur"|visibilitychange' demo/` returns two hits, neither in the cube tree (`useSceneVisibilityPause.ts:11`, `usePaneHover.ts:20`). And there is no escape hatch for the parent — OrbitalDrag has **no `defineExpose`**, so `CubeTarget` cannot clear the latch or pause inertia even if it detected the stuck state. Contrast `CubeTarget.vue:129`, which *does* `defineExpose({ cubeEl, graphEl })` for exactly this reason.

The asymmetry is the tell: the author wrote a re-sync for the subset that could be re-derived and left the subset that could not without any compensating mechanism.

**Falsifier.** A `blur` / `visibilitychange` / `pointerdown` handler that clears `pressedKeys.x/y/z`, or a `defineExpose` giving the parent a reset. Neither exists.

---

### C-6 · MAJOR — the `defineModel` default is a shared mutable module singleton the component mutates in place

```ts
const model = defineModel<TransformState>({ default: defaultTransformState });   // :43-45
if (Object.keys(model.value).length === 0) {
    Object.assign(model.value, defaultTransformState);                            // :47-49
}
```

`defaultTransformState` is a module-level mutable object (`index.ts:63-80`) whose `matrix` field is a live `mat4.create()` `Float32Array` (`:79`). The compiled props declaration is `"modelValue": { type: null, ...{ default: defaultTransformState } }` — `type: null`, non-function default, so Vue's `resolvePropValue` hands **the same object reference** to every instance mounted without `v-model`. The component then writes through it on every frame (`model.value.rotate.x = angles.x`, `:91-93`).

Two failure modes:

1. Two `<OrbitalDrag>` instances without `v-model` share one rotation state, and the module default is permanently corrupted for every instance mounted afterwards.
2. `Object.assign` at `:48` is a **shallow** copy: a consumer binding `v-model` to an empty object gets `defaultTransformState.rotate` / `.translate` / `.scale` / `.matrix` copied **by reference** into their model. The component then mutates the module singleton through the parent's binding.

The author knew this hazard and applied the fix ten lines later — to the *other* default:

```ts
const velocity = ref<VelocityState>(structuredClone(defaultVelocityState));      // :60
```

Same shape, same module, same risk; cloned in one case and not the other. That inconsistency is the strongest evidence the omission is an oversight, not a decision.

Latent today: `cubeTransformStore.ts:14-20` constructs a fresh object literal per store, `CubeTarget.vue:124` declares `transform` as `required: true`, and `CubeScene.vue:21` always binds it. So the `default` branch is never taken and `Object.keys(model.value).length === 0` is never true.

**Falsifier.** Show Vue deep-clones a non-factory object prop default (it does not — `resolvePropValue` invokes only `isFunction` defaults, and `type: null` disables even the factory path), or show that no consumer can mount OrbitalDrag without `v-model`. The second is not provable — the model is declared *optional-with-default*, which advertises exactly that usage.

---

### C-7 · MINOR — prop reactivity is silently split 1-live / 5-frozen

```ts
const sensitivity       = props.sensitivity ?? 0.5;         // :53  frozen
const touchSensitivity  = sensitivity * 0.5;                // :54  frozen
const translationFactor = props.translationFactor ?? 0.8;   // :55  frozen
const inertiaFactor     = props.inertiaFactor ?? 0.95;      // :56  frozen
const scaleFactor       = props.scaleFactor ?? 0.02;        // :57  frozen
const bounds            = props.bounds ?? defaultTransformBounds; // :58 frozen
```

All six are read once in the setup body and captured as plain `const`s. Five are then passed by value into the composables (`:220-259`), so they are unreachable from a prop update forever.

Meanwhile the sixth prop *is* live, because it happens to be read inside a `computed`:

```ts
const containerStyle = computed(() => {
    if (!props.applyTransformToContainer) return {};                             // :64
```

and `CubeTarget.vue:14` binds it to a changing expression (`props.isPlaying || props.isStarted`) — so the consumer is already relying on that one being reactive.

Six props, one reactive, five init-only, no documentation of the split. A consumer wiring a sensitivity slider gets silence, not an error.

**Falsifier.** A doc comment declaring the five init-only, or `watch`es that re-thread them. Neither exists. (Not graded MAJOR: no consumer currently passes any of the five.)

---

### C-8 · MINOR — a `as unknown as` double-cast launders a type the barrel could have declared

`OrbitalDrag.vue:175`:

```ts
const categoryBounds = (bounds as unknown as Record<string, Record<string, [number, number]>>)[category]!;
```

The double-cast exists only because `defaultTransformBounds` is the one default in `index.ts` that is **not** annotated:

| export | site | annotation |
|---|---|---|
| `defaultTransformState` | `index.ts:63` | `: TransformState` ✅ |
| `defaultTransformBounds` | `index.ts:82` | **none** ❌ |
| `defaultVelocityState` | `index.ts:100` | `: VelocityState` ✅ |

Unannotated, TS infers `{ rotate: { x: number[] … } }` — arrays, not the `[number, number]` tuples `TransformBounds` declares (`index.ts:27-43`). So `props.bounds ?? defaultTransformBounds` widens to a union that cannot be indexed, and the only way out is `as unknown as` — the sharpest available admission that the contract failed. `updateLinearTransform` is 17 lines and carries **five** casts (`:172, :173, :175, :176, :178`).

**Falsifier.** Annotate `defaultTransformBounds: TransformBounds` and show the double-cast is still required. (It is not: the union collapses and a single keyed index suffices.)

---

### C-9 · MINOR — the `decay()` dogfood is ceremonial, and it allocates once per rAF frame against the library's own contract

`useOrbitalInertia.ts:65-78` seeds the sampler with unit velocity and reads only the velocity channel:

```ts
const unitDecay = decay({ velocity: 1, friction });
const decayFactorOver = (dtMs: number): number => unitDecay(dtMs / 1000).velocity;
```

With `x0 = 0, v0 = 1`, `decay.ts:74-79` returns `velocity: v0 * Math.exp(-k*t)` — i.e. `unitDecay(t).velocity` reduces **provably and exactly** to `Math.exp(-friction * t)`. The whole analytic apparatus is used to compute one exponential. The two things the closed form uniquely buys — exact position `x(t)` and the projected endpoint — are unused; `decayRest`, the natural companion for a fling (`src/animation/index.ts:136` exports it right beside `decay`), is imported by nobody. Position is still integrated per-frame as `model[cat][k] + v` (`:111-114`), which the comment at `:72-76` concedes.

Worse, the seat is on a hot path and the library's contract about it is **false**. `decay.ts:53` promises:

> *Allocation-free per call (one closure captured once); the returned function does no further allocation.*

But the returned sampler returns an object literal on both branches (`decay.ts:70-79`), so every call allocates a `DecaySample`. `decayFactorOver` is called once per `applyInertia` (`useOrbitalInertia.ts:94`), which is a `useRafFn` tick (`:131`) — **~60 discarded objects/sec for the whole glide**, on top of C-2's ≤7 spreads/frame.

The consumer's comment repeats the false claim verbatim (`useOrbitalInertia.ts:69`): *"(decay() is allocation-free per call, so the hot loop only reads it)"*. This is a library-documentation defect that propagated into a consumer's justification — the exact failure mode `lane-library.md` LEG-3 records elsewhere (stale dep-cruiser prose vs. shipped `leaves.ts` code).

**Falsifier.** Show `decay`'s sampler returning without allocating (it cannot — both `return` statements are object literals), or show `unitDecay(t).velocity !== Math.exp(-k·t)` for `x0=0, v0=1`. Neither holds. — *This is a defect of ceremony, not of correctness: the trajectory is right, and the frame-rate-invariance claim in `inertiaDecay.ts:28-32` is genuine.*

---

### C-10 · MINOR — the P.W5.S3 scoped slot is dead API, and it leaks a live mutable handle to internal gesture state

`OrbitalDrag.vue:3-7` ships a scoped slot for the latch:

```html
<!-- P.W5.S3 — the axis-lock-reveal egg seam: expose `pressedKeys` … as a scoped slot prop -->
<slot :pressed-keys="pointer.pressedKeys.value"></slot>
```

and `:37-40` ships an emit for **the same datum**, with the same P.W5.S3 rationale, in the same change. The consumer uses the emit (`CubeTarget.vue:15`) and its slot content (`:17-92`) declares no `v-slot` / `#default`, so the slot prop is never destructured. Sole consumer ⇒ the slot prop has zero readers.

The two channels are also not equivalent, and the dead one is the unsafe one. The emit sends a copy (`emit("pressedKeys", { ...keys })`, `:319`); the slot passes `pointer.pressedKeys.value` — the **live reactive object** the gesture readers mutate (`useOrbitalPointer.ts:58-60, 63-65, 174`). Slot content could write the component's gesture latch directly.

**Falsifier.** A consumer binding `v-slot="{ pressedKeys }"`. `grep -rn OrbitalDrag demo/ test/ scripts/` yields one consumer; it binds none.

---

### C-11 · INFO — the v-model contract demands a field the component never touches, dragging `gl-matrix` into the seam

`TransformState` (`index.ts:8-25`) requires `matrix: mat4`. OrbitalDrag never reads or writes `.matrix` (zero hits in the SFC). Every consumer must nonetheless supply one (`cubeTransformStore.ts:19`, `CubeTarget.vue:124`), and the default carries a shared `mat4.create()` `Float32Array` (`index.ts:79` — see C-6).

The field belongs to the matrix-editor (`matrix-editor/useTransformState.ts:7`), not to a gesture harness. Taking the *scene's* transform type as its own model type couples a headless input component to a sibling feature's data model, and forces `gl-matrix` — a `devDependency` (`package.json` devDeps) — into the public type surface of the unit.

**Falsifier.** Show OrbitalDrag reading or writing `model.value.matrix`. It does not. — *INFO, not MINOR: the coupling is contained inside one scene, and the field is genuinely used by siblings.*

---

### C-12 · INFO — every `useEventListener` is registered inside `onMounted`; teardown works only by grace of Vue ≥ 3.4

All nine listeners are registered inside the mounted hook (`OrbitalDrag.vue:263-292`) and their `stop` handles discarded. That is safe only because `@vue/runtime-core`'s `setCurrentInstance` re-activates the instance's effect scope for the duration of a lifecycle hook — verified in the installed copy at `node_modules/@vue/runtime-core/dist/runtime-core.cjs.js:8013-8021` (`instance.scope.on()` on entry, `.off()` on the returned reset). Under that guarantee `tryOnScopeDispose` binds correctly and there is **no leak** — I am explicitly *not* claiming one.

But the guarantee is undocumented at the call site and predates neither of the two loose ranges in play: `vue: ^3.5.35`, `@vueuse/core: ^14.3.0`. Nothing in the file records that hoisting these out of `onMounted` (or resolving to a pre-3.4 Vue) would silently leak nine window/document listeners per mount, in a component whose scene is mounted and unmounted on every home↔cube transition (`cubeTransformStore.ts:8-9`).

Related: `onUnmounted(() => inertia.pause())` (`:294-296`) is redundant — `useRafFn` already registers its own scope disposal.

**Falsifier.** Downgrade below Vue 3.4 (or hoist a listener out of `onMounted` into a non-scoped callback) and observe listeners still detaching.

---

### C-13 · INFO — "consumes the published surface" is true at the module graph, false at the artifact

`useOrbitalInertia.ts:10-12` justifies the barrel import:

> *imported from the published barrel `@mkbabb/keyframes.js` like every other demo engine consumer (L.W8 ED-3 dogfood inversion — the demo consumes the published surface, not deep `@src/animation/*` paths).*

`vite.config.ts:39-42` rewrites that specifier to `src/animation/index.ts`. That file **is** the `.` lib entry (`vite.config.ts:153-157`), so the module graph the demo exercises is byte-identical to what `dist/keyframes.js` is built from — the ED-3 spirit is honored. But the demo never loads `dist/`, so the claim "consumes the published surface" describes a *source* equivalence, not an *artifact* one; the packaging layer (the `exports` map, the `/^@mkbabb\/value\.js(\/|$)/` externalization, the `.d.ts` rollup) is proven by `proof:publish`, not by this consumer.

The alias itself is well-reasoned and documented (`vite.config.ts:22-35` — it dedupes glass-ui's own bare `@mkbabb/keyframes.js` onto the demo's engine instance). Only the comment overstates.

**Falsifier.** A gate that boots the demo against a built `dist/`. `scripts/gates/surface/index.mjs` proves the surface, not the demo's consumption of it.

---

### C-14 · MINOR — the parity gate that certifies this seam is calibrated at a friction the component never uses, and proves the wrong import path

`test/demo/scenes/orbital-inertia-parity.test.ts:29`:

```ts
const INERTIA_FACTOR = 0.92; // the orbital-drag default friction-per-frame
```

`OrbitalDrag.vue:56` sets the default to **0.95**, and no consumer overrides it (`CubeTarget.vue:11-16` passes no `:inertia-factor`). The comment asserts a fact the tree contradicts. The parity identity holds for any `k > 0` so the gate stays green — which is exactly why the drift is invisible.

Two further gaps in the same gate:

- `:2` imports `decay` from `../../../src/animation/physics/decay` — the **deep source path**, not the barrel the component uses (`useOrbitalInertia.ts:13`). The gate therefore does not certify the barrel re-export the consumer depends on.
- `test/demo/scenes/orbital-rotate3d.test.ts:155-169` enforces the component's central render contract by **regexing its own source text** (`expect(src).toMatch(/quat\.getAxisAngle\s*\(/)`, `expect(src).not.toContain("rotateY(${rotate.y}deg)")`). A behaviour-preserving refactor reds it; a text-preserving regression stays green. *(Caveat, stated so it can be dismissed: the "grep-based `proof:*` idiom is overfit junk" edict is recorded against value.js, and keyframes.js runs its own `proof:*` scripts — I do not assert the edict was extended here.)*

**Falsifier.** Show `0.92` is the effective default at some call site, or show the gate red when the barrel stops re-exporting `decay`.

---

## §3 · SUPERLATIVES — L-18 the other way

### S★1 — the value.js subpath choice is the best in the demo, and it makes R1 structurally unreachable

`OrbitalDrag.vue:12` and `quaternionEuler.ts:1` both take exactly one leaf:

```ts
import { clamp } from "@mkbabb/value.js/math";
```

Measured in the installed `@mkbabb/value.js@4.0.0`:

| subpath | bytes | `import` statements |
|---|---|---|
| `dist/subpaths/value.js` | 280 | re-export shim |
| **`dist/subpaths/math.js`** | **1 110** | **0** |
| `dist/subpaths/color.js` | 604 | 2 → `../anchors-*.js`, `../operations-*.js` |
| `dist/subpaths/css.js` | 41 619 | (the grammar) |

`math.js` is a fully-inlined, **zero-import** module containing nine pure functions (`clamp`, `scale`, `lerp`, `lerpArray`, `logerp`, `deCasteljau`, `cubicBezier`, `interpBezier`, `cubicBezierToString`). `grep -c import dist/subpaths/math.js` → **0**. `grep -c 'parseCssColor|oklch' dist/subpaths/math.js` → **0**.

Therefore the **R1 class — the live `parseCssColor("oklch()")` shipping crash — is structurally unreachable from this component's static graph.** Not "avoided by discipline"; unreachable by module topology, at 1 110 bytes.

Two things sharpen this from "fine" to "exemplary":

1. It matches keyframes.js's **own** internal precedent. `src/animation/internal/leaves.ts:27-28` reaches for the identical specifier so the LIGHT engines carry no grammar edge — and the demo component independently arrived at the same leaf. Same module instance, no duplicate.
2. A **sibling scene in the same demo did not.** `lane-library.md:243` records `demo/scenes/square/useSquareTumble.ts:22 → parseCssColor(css) ← the known R1 crash surface`. The exposure was available; OrbitalDrag declined it. Also note `lane-library.md:57` — value.js 4.0.0 exposes **no root entry**, so every edge is subpath-scoped by construction; but the /math-vs-/color contrast above shows the *choice within* that constraint still decides everything.

**Falsifier (superlatives cut both ways).** Any transitive path from `@mkbabb/value.js/math` to the CSS/color grammar. A 1 110-byte file with zero `import` statements has none.

### S★2 — `decay` taken off the LIGHT barrel, not the deep source path

`useOrbitalInertia.ts:13` imports from `@mkbabb/keyframes.js`, resolving to the `.` entry barrel (`src/animation/index.ts:136`). The barrel's docblock (`:1-27`) defines the whole point of that surface: LIGHT engines share only value.js's `/math` leaf; the HEAVY parser graph is reachable only through `loadAnimationEngine()`'s dynamic `import("./engine")`, so *"a consumer that imports only these pulls neither Value's parser/color graph nor Keyframes' heavy engine."* Taking `decay` here — rather than the available-and-tempting `@src/animation/physics/decay` — is the ED-3 dogfood inversion honored in the one place where cheating would have been invisible.

The barrel is also, correctly, **not** the source of the heavy work elsewhere in the same scene: `CubeTarget.vue:110, 198` reaches `CSSKeyframesAnimation` through `await loadAnimationEngine()`. Light static, heavy dynamic, in adjacent files. (Cost of the barrel import: the dev server fetches the whole LIGHT graph for one function; `"sideEffects": false` tree-shakes it in prod, and no `./physics` subpath exists — so the barrel is the *only* compliant choice.)

**Falsifier.** A static value.js parser edge on the LIGHT barrel. `src/animation/index.ts` value-exports only light modules; every heavy re-export is `export type`, erased under `verbatimModuleSyntax`.

### S★3 — the only file in the cube scene that survives F-1

OrbitalDrag has **zero** `@mkbabb/glass-ui` imports. That is not neglect: the entire template is one `<div>` and a `<slot>` (`:1-9`) — the component is headless, and a design system has nothing to offer a gesture harness that renders no chrome. This corroborates and sharpens `lane-frontend.md:398`, which files orbital drag under *"Bespoke, no glass counterpart"* alongside the Three.js scene and the scene shells.

The practical payoff is F-1. `lane-frontend.md:15` records `@mkbabb/glass-ui` as a phantom dependency — absent from `package.json` **and** `package-lock.json`, yet 7.0.0 installed. I re-verified independently: `p.dependencies['@mkbabb/glass-ui']` → `undefined`, `p.devDependencies['@mkbabb/glass-ui']` → `undefined`, `ls node_modules/@mkbabb/` → `glass-ui parse-that value.js`. Confirmed, and `lane-frontend.md:612` is right that nothing is reproducible until it lands.

Its immediate siblings are exposed — `CubeScene.vue:38`, `MatrixEditor.vue:97-98` (`Slider`, `Card`, `CardContent`, `Input`). OrbitalDrag is the one file in the cube scene whose resolution graph is fully declared and would survive an `npm ci` today. Its `@mkbabb/value.js` edge is a real, pinned, exact runtime `dependency` (`"@mkbabb/value.js": "4.0.0"`); `gl-matrix` / `@vueuse/core` are declared devDeps, correct for a non-published demo (`files: ["dist", "!dist/gh-pages", "!dist/_*"]`).

**Falsifier.** A transitive glass-ui edge through the unit's seven files. There is none.

### S★4 — the parity seam was carved so its own falsifier could reach it

`composables/inertiaDecay.ts` exists for exactly one reason, stated at `:9-11`: *"kept Vue-free so the inertia-parity gate can import it without pulling the demo's `.vue` graph."* And the gate does precisely that — `test/demo/scenes/orbital-inertia-parity.test.ts:3-6` imports `TARGET_DT` and `inertiaFactorToFriction` from that module and from nowhere else. The `k = −ln(inertiaFactor)·(1000/TARGET_DT)` mapping (`:33-34`) is derived in the docblock (`:21-32`) rather than asserted, and it is the single measure-first fact the whole `decay()` swap rests on.

That is a consumption seam designed **so that the claim about it could be killed** — the module boundary exists to make the falsifier cheap. It is also the one part of this unit that C-1's cycle cannot reach: `inertiaDecay.ts` imports nothing (verified — it is 34 lines of pure math), so the parity gate is the only entry point into the unit that is load-order-safe by construction.

**Falsifier.** Show the gate importing through the `.vue` graph, or the mapping asserted rather than derived. Neither holds. (C-14 dents the *calibration* of this gate; it does not touch the *architecture*, which is the superlative.)

---

## §4 · Ledger

| id | sev | claim | provenance |
|---|---|---|---|
| C-1 | MAJOR | barrel↔SFC ESM cycle; module-scope `defineModel` default ⇒ TDZ / silent `undefined` on any non-`.vue`-first entry | `index.ts:3` · `OrbitalDrag.vue:18,43-45` · compiled SFC · 3 probes |
| C-2 | MAJOR | 3 of 4 emits have zero consumers; ≤7 dispatches + spreads per rAF frame through the glide | `:33-41,96,181-182,324-327` · `CubeTarget.vue:11-16` |
| C-3 | MAJOR | unvalidated `inertiaFactor` ⇒ `decay()` `@throws` at setup; `≥1` fatal, `<0` NaN-poisons | `:24-31,56` · `useOrbitalInertia.ts:63,71` · `decay.ts:56,66-68` |
| C-4 | MAJOR | window keydown, no editable-target guard; violates the law at `useTypedTrigger.ts:6-8` | `:276-277` · `useOrbitalPointer.ts:169-176` · `MatrixEditor.vue:16,98` |
| C-5 | MAJOR | x/y/z latch sticks on focus loss; `syncModifiers` re-syncs only shift/ctrl/meta; no `defineExpose` escape | `useOrbitalPointer.ts:62-66,100` · `:276-277` |
| C-6 | MAJOR | `defineModel` default = shared mutable singleton, mutated in place; shallow `Object.assign` at `:48` | `:43-49,60,91-93` · `index.ts:63-80` |
| C-7 | MINOR | 1 reactive prop, 5 frozen at setup, undocumented split | `:53-58,64` · `CubeTarget.vue:14` |
| C-8 | MINOR | `as unknown as` double-cast caused by the one unannotated default | `:175` · `index.ts:63,82,100` |
| C-9 | MINOR | `decay()` reduces to `Math.exp`; allocates per rAF frame against `decay.ts:53`'s own contract | `useOrbitalInertia.ts:65-78,69` · `decay.ts:53,70-79` |
| C-10 | MINOR | scoped slot dead (0 readers) and leaks the live internal latch object | `:3-7,319` · `CubeTarget.vue:17-92` |
| C-11 | INFO | `matrix: mat4` required by the model contract, never touched by the component | `index.ts:8-25,79` |
| C-12 | INFO | listeners registered in `onMounted`; safe only via Vue ≥3.4 scope activation | `:263-296` · `runtime-core.cjs.js:8013-8021` |
| C-13 | INFO | "consumes the published surface" true at graph, false at artifact (vite self-alias) | `useOrbitalInertia.ts:10-12` · `vite.config.ts:39-42,153-157` |
| C-14 | MINOR | parity gate calibrated at 0.92 vs the shipped 0.95; imports the deep path, not the barrel | `orbital-inertia-parity.test.ts:2,29` · `:56` · `orbital-rotate3d.test.ts:155-169` |
| S★1 | — | `/math` = 1 110 B, 0 imports ⇒ R1 structurally unreachable; sibling `useSquareTumble.ts:22` is not | `:12` · `quaternionEuler.ts:1` · `lane-library.md:243` |
| S★2 | — | `decay` off the LIGHT barrel, ED-3 honored; heavy work stays dynamic in the sibling | `useOrbitalInertia.ts:13` · `src/animation/index.ts:1-27,136` · `CubeTarget.vue:198` |
| S★3 | — | zero glass-ui edge; the only cube-scene file that survives F-1's broken `npm ci` | `:1-9` · `lane-frontend.md:15,398` · re-verified |
| S★4 | — | `inertiaDecay.ts` carved Vue-free so its own falsifier could import it | `inertiaDecay.ts:9-11,33-34` · `orbital-inertia-parity.test.ts:3-6` |

**Counts — defects 14 · BLOCKERS 0 · superlatives 4.**

Nothing here is graded BLOCKER, and that is a finding rather than an absence. C-1 and C-3 are proven-fatal mechanisms, and the tree proves neither is currently entered — C-1 because every barrel consumer happens to be `import type`, C-3 because the only consumer happens not to pass the prop. Both are held shut by accident, not by design. The instruction to assume defect until the tree proves otherwise cuts the other way for the inbound edges: the two library seams (S★1, S★2) survived every falsifier I could aim at them, and the glass-ui non-consumption (S★3) is the right call, not an omission.

**Livable-only claims deferred to SS-13:** the visual magnitude of the C-4 axis-line flash on keystroke, and the perceptual continuity of the C-5 stuck-lock state, are marked `UNPROVEN-NEEDS-LIVE`. Their underlying state transitions are source-proven above.
