claude-opus-5[1m]

# CHALLENGE — `OrbitalDrag` · axis L (LIBRARY)

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/scenes/cube/orbital-drag/OrbitalDrag.vue` (352 lines)
**Unit read whole** (read-only): `OrbitalDrag.vue`, `index.ts`, `types.ts`, `quaternionEuler.ts`, `composables/{useOrbitalPointer,useOrbitalPinch,useOrbitalInertia,inertiaDecay}.ts`
**Transitive evidence read**: `CubeTarget.vue`, `CubeScene.vue`, `cubeTransformStore.ts`, `matrix-editor/useTransformState.ts`, `demo/composables/useDoubleTap.ts`, `src/animation/physics/decay.ts`, `src/animation/index.ts`, `vite.config.ts`, `tsconfig.json`, `test/demo/scenes/orbital-{rotate3d,inertia-parity}.test.ts`, installed `vue@3.5.35` / `@vueuse/core@14.3.0` / `gl-matrix@3.4.4`.
**Posture** the component was assumed DEFECTIVE until the tree proved otherwise. Three candidate defects were **killed** during verification and are recorded in §4 so they are not re-raised.
**No browser tooling was used.** Two claims were proven by executing minimal reproductions of the *mechanism* (ESM cycle order; Vue effect-scope ownership) — those are marked PROVEN-BY-REPRO. Nothing here rests on a rendered pixel; nothing is marked UNPROVEN-NEEDS-LIVE because no claim needed to be.

**Tally — defects 25 (BLOCKER 2 · MAJOR 6 · MINOR 12 · INFO 5) · superlatives 5.**

---

## 0. Corpus fold (hitherto — cited, not re-invented)

| Prior id | Where | This lane's relation |
|---|---|---|
| `lane-frontend.md` §4 row `352 | cube/orbital-drag/OrbitalDrag.vue | b | pointer/pinch/inertia orbital drag harness` | census line 236 | **Confirmed**: 352 lines, bespoke ("b"). Line count exact at HEAD. |
| `lane-frontend.md` §5 "Bespoke, no glass counterpart — 12 remaining (… orbital drag …)" | line 398 | **Confirmed and sharpened** — see SUP-4 / I-3. OrbitalDrag's *own* import graph is glass-free; the exposure is one hop up. |
| `lane-frontend.md` §7 "per-scene composables (… `orbital-drag/composables/` 4 …)" | line 525 | **Confirmed** — 4 files. See M-8 for the return-surface finding the census (a count, not a contract read) could not reach. |
| **F-1** phantom `@mkbabb/glass-ui` | `lane-frontend.md` §0/§2 | **Does not bite this module directly** (zero glass imports in the unit). It bites the *mount path*. See I-3 — a refinement of F-1, not a contradiction. |
| `lane-library.md` parse seams | — | **No overlap.** This unit touches no parser surface; its only cross-repo edge is `clamp` from `@mkbabb/value.js/math`, which is a *declared* dependency (`package.json` `dependencies: {"@mkbabb/value.js": "4.0.0"}`, subpath `./math` present in the installed `exports` map) — i.e. **not** a second phantom. |

---

## 1. BLOCKERS

### B-1 · The container transform goes STALE for every canonical-axis rotation — the render computed under-registers its reactive dep

**Severity BLOCKER** · `demo/scenes/cube/orbital-drag/OrbitalDrag.vue:63-76` (specifically **:68**)

```ts
const containerStyle = computed(() => {
    if (!props.applyTransformToContainer) return {};
    void model.value.rotate.x;                       // ← :68 — the ONLY rotate dep
    const { translate, scale: s } = model.value;
    const angleDeg = quat.getAxisAngle(renderAxis, currentQuaternion) * (180 / Math.PI);
    return { … transform: `translate3d(…) rotate3d(${renderAxis[0]}, …, ${angleDeg}deg) scale3d(…)` };
});
```

`currentQuaternion` (:80) is a bare `gl-matrix` `quat` — **not reactive**. The computed's entire invalidation contract is therefore the single hand-registered dep on :68. The comment on :66-67 states the intent ("`syncRotationToModel` writes it per rotation"), and that is exactly the false premise: `syncRotationToModel` (:89-98) writes `x`, `y` **and** `z`, but Vue only re-runs the computed when a **tracked** property's value actually changes (`hasChanged` / `Object.is`). Writing the same value to `rotate.x` is a no-op for the dep graph.

**The ownership chain is proven reactive** (this is what makes the dep real rather than vacuous): `cubeTransformStore.ts:13-19` `createGlobalState(() => ref<TransformState>({…}))` → `CubeScene.vue:78` `useTransformState(…, useCubeTransform().value)` → `useTransformState.ts:36-50` `ref<TransformState>({…})` → `CubeScene.vue:22` `v-model:transform` → `CubeTarget.vue:124` `defineModel` → `CubeTarget.vue:13` `v-model` → `OrbitalDrag`'s `model`. Deep `ref` ⇒ `model.value` is a deep reactive proxy ⇒ per-key tracking.

**Now the algebra.** `quaternionToEulerDegrees` (`quaternionEuler.ts:15-47`) computes `ex = atan2(-r12, r22)` with `r12 = yz − wx` and `r22 = 1 − (xx + yy)`.

* **Pure-Y quaternion** (`x = z = 0`): `r12 = 0`, so `ex = atan2(-0, cos θ) = -0` for every θ ∈ (−90°, 90°). `rotate.x` is **constant**.
* **Pure-Z quaternion** (`x = y = 0`): `r12 = 0`, `r22 = 1`, so `ex = atan2(-0, 1) = -0` for **every** θ. `rotate.x` is constant for the whole rotation.

Because the store seeds `rotate.x = +0` and the first write is `-0`, `Object.is(-0, +0) === false` ⇒ the computed invalidates **exactly once**, on the first frame, and then never again for the remainder of the gesture.

**Reachable inputs that hit it (all four from a fresh mount, `applyTransformToContainer === true`):**

1. **A perfectly horizontal pointer drag.** `updateRotation` (:123-139) builds `axis = vec3.fromValues(-deltaY, deltaX, 0)`; `deltaY === 0` ⇒ pure-Y. The dead-zone guard on `useOrbitalPointer.ts:115` is `&&`, so `deltaX = 3, deltaY = 0` passes.
2. **Ctrl/⌘ + drag (the Z-roll).** `useOrbitalPointer.ts:122-129` applies `vec3.fromValues(0, 0, 1)` — pure-Z for the entire gesture.
3. **Axis-locked drag.** `updateAxisRotation` (:141-158) applies a canonical basis vector by construction (:149-153).
4. **Two-finger pinch rotation.** `useOrbitalPinch.ts:122-123` applies `vec3.fromValues(0, 0, 1)`.
5. **The inertia glide.** `useOrbitalInertia.ts:98` re-applies `angularVelocityAxis`; after (2)/(4) that axis *is* `(0,0,1)` (copied at `useOrbitalPointer.ts:128` / `useOrbitalPinch.ts:124`), so the whole coast is invisible too.

`translate` / `scale` are read (:69) but do not change during a rotation-only gesture, so they cannot rescue the invalidation. Nor can a parent re-render: the computed is *cached*, so OrbitalDrag's render effect re-running (it does — the slot body reads `faceLit`) simply re-reads the same stale string.

**Why the existing gate cannot catch it.** `test/demo/scenes/orbital-rotate3d.test.ts` never mounts the component: clauses (a)/(b) exercise a **replica** of the render math (`:52-56`, `renderTransform`) and clause (c) is a **`fs.readFileSync` + regex** over the SFC source (`:155-168`). The reactivity contract of :68 is structurally outside its reach.

**Falsifier.** Mount `CubeTarget` with `isStarted = true`, drive `pointerdown` then a sequence of `pointermove`s with `clientY` held constant, and read `containerRef.style.transform` after each flush. If the `rotate3d` angle advances past frame 1, this claim is dead. Equivalently: instrument `quaternionToEulerDegrees` and show `rotate.x` differing between consecutive frames of a `deltaY === 0` drag. (The cheap structural falsifier: if `void model.value.rotate.x` were `void [rotate.x, rotate.y, rotate.z]`, or if `currentQuaternion` were a `shallowRef` bumped in `applyRotation`, the claim would not exist.)

---

### B-2 · The unit's own barrel export `OrbitalDrag` throws `ReferenceError` — a TDZ import cycle — PROVEN-BY-REPRO

**Severity BLOCKER (latent: the sole in-tree consumer bypasses the barrel)** · `index.ts:3` × `OrbitalDrag.vue:43-45`

`index.ts` declares, in this order:

```ts
1  import { mat4 } from "gl-matrix";
3  export { default as OrbitalDrag } from "./OrbitalDrag.vue";   // ← evaluated FIRST
6  export const axes = …;
63 export const defaultTransformState: TransformState = { … };   // ← TDZ until here
```

`OrbitalDrag.vue:18` imports `defaultTransformState` back from `"."`, and `defineModel<TransformState>({ default: defaultTransformState })` (:43-45) compiles to a **module-scope** read. Verified by compiling the real SFC with the repo's own `@vue/compiler-sfc`:

```js
export default /*@__PURE__*/_defineComponent({
  __name: 'OrbitalDrag',
  props: /*@__PURE__*/_mergeModels({ … }, {
    "modelValue": { type: null, ...{
    default: defaultTransformState,          // ← read at module evaluation, not at prop resolution
} },
```

ESM evaluates `index.ts`'s import/re-export declarations before its `const` initialisers, so entering through the barrel evaluates `OrbitalDrag.vue`'s body while `defaultTransformState` is still in the temporal dead zone.

**Repro (mirrors the exact statement order; run in the scratchpad):**

```
--- entry = barrel (index.mjs) ---
THROWS: ReferenceError: Cannot access 'defaultTransformState' before initialization
--- entry = component (Comp.mjs) ---
OK {"props":{"modelValue":{"default":{"rotate":{"x":0}}}}}
```

Today nothing detonates only because `CubeTarget.vue:112` imports the SFC **directly** and `:113` imports from `"."` **type-only** (erased). The barrel's `OrbitalDrag` named export — the ergonomic public entry the barrel exists to provide — is dead on arrival for any future consumer.

**Falsifier.** `import { OrbitalDrag } from "./orbital-drag"` in any module and render it. If it mounts, the claim is dead. (Two independent kills also apply: making the default a factory — `default: () => structuredClone(defaultTransformState)` — defers the read out of module scope, and moving the `export { default as OrbitalDrag }` line *below* the const block breaks the ordering. The factory fix simultaneously kills **M-2**.)

---

## 2. MAJOR

### M-1 · `updateAxisRotation` leaves `angularVelocityAxis` stale and arms inertia even for a zero-angle no-op

**Severity MAJOR** · `OrbitalDrag.vue:141-158`

Every *other* rotation applier maintains the inertia axis: `updateRotation` EMA-lerps it (:136-137), the Z-roll copies it (`useOrbitalPointer.ts:128`), pinch copies it (`useOrbitalPinch.ts:124`). `updateAxisRotation` writes **only** the speed (:157) and never touches `angularVelocityAxis`. Consequence: hold **X**, drag, release ⇒ the release watcher (:324-343) keeps `angularVelocitySpeed` (× 0.8) and `useOrbitalInertia.ts:98` glides about whatever axis was last left there — `(0,1,0)` on a fresh mount (:83). The cube coasts about the *wrong* axis, orthogonal to the one the user just locked.

Worse, :157 is unconditional. `magnitude = sqrt(dx² + dy²)` uses **both** deltas, but the applied sign is `Math.sign(a === "x" ? -deltaY : deltaX)` (:154). Hold **Y** and drag straight down: `deltaX === 0` ⇒ `Math.sign(0) === 0` ⇒ `angle * 0 = 0` ⇒ `applyRotation` early-returns at :113 — **zero rotation happened** — yet `angularVelocitySpeed.value = angle` (a large value) is still armed. Release ⇒ the cube spontaneously spins about a stale axis after a gesture that visibly did nothing.

**Falsifier.** Show `angularVelocityAxis` being written on the `updateAxisRotation` path (grep the unit: it is written at `OrbitalDrag.vue:136-137`, `useOrbitalPointer.ts:128`, `useOrbitalPinch.ts:124` — nowhere else), or show the release watcher zeroing the speed after an axis-locked drag (:335 multiplies by 0.8; it does not zero).

### M-2 · `defineModel({ default: defaultTransformState })` hands out a shared, mutable module singleton

**Severity MAJOR (latent — the sole consumer always binds `v-model`)** · `OrbitalDrag.vue:43-49` × `index.ts:63-80`

The compiled props (see B-2) carry `default: defaultTransformState` with `type: null` and a non-function default, so Vue's `resolvePropValue` assigns the object **as-is**. An unbound `<OrbitalDrag />` therefore writes rotation straight into the exported module singleton (`model.value.rotate.x = …`, :91), polluting it for every later instance and for anyone who imports `defaultTransformState`.

The guard immediately below is worse than useless:

```ts
47  if (Object.keys(model.value).length === 0) {
48      Object.assign(model.value, defaultTransformState);   // ← SHALLOW
49  }
```

`Object.assign` is shallow, so had it fired it would have aliased the singleton's **nested** `rotate` / `translate` / `scale` / `matrix` objects into the caller's model — manufacturing exactly the sharing it is trying to repair. It is also **dead**: with the default in place `model.value` always has 4 own keys, and a typed `TransformState` can never be `{}`.

The author knew the shape of this hazard — `velocity` (:60) is correctly `structuredClone(defaultVelocityState)`. The asymmetry is the tell.

**Falsifier.** Mount two `<OrbitalDrag />` without `v-model`, rotate the first, read `defaultTransformState.rotate` from a third module. If it is still `{x:0,y:0,z:0}`, the claim is dead.

### M-3 · The X/Y/Z axis latch is a bare `window` listener — no target guard, no blur/visibility reset

**Severity MAJOR** · `OrbitalDrag.vue:276-277` × `useOrbitalPointer.ts:169-176`

```ts
276  useEventListener(window, "keydown", (e) => pointer.updatePressedKeys(e, true));
277  useEventListener(window, "keyup",   (e) => pointer.updatePressedKeys(e, false));
```

No `event.target` / `isContentEditable` / `:focus` check, and a repo-wide grep for a `blur` or `visibilitychange` reset of `pressedKeys` finds none. Two consequences:

1. **Cross-surface capture.** `MatrixEditor.vue:16` renders `<Input>` (`@mkbabb/glass-ui/forms`) and `CubeScene.vue:170-179` mounts it *alongside* the live `CubeTarget`. There is no `@keydown.stop` on that input. Typing `x`/`y`/`z` into a matrix cell latches the axis lock and lights `CubeAxisLines` (`CubeTarget.vue:159-163`) while the user is editing a number.
2. **Durable stick.** Any path where `keydown` is delivered and `keyup` is not leaves the latch on **permanently**, because — unlike the modifiers — `x`/`y`/`z` are never re-synced from pointer state. The concrete case is `⌘X` (cut) inside that same matrix `Input`: on macOS the browser commonly withholds `keyup` for non-modifier keys while Meta is held. Window blur while a letter is held has the same effect. From then on every drag is silently axis-constrained and `handleAxisSpecificInput` (:193-212) — which is checked *before* the shift/ctrl branches in `useOrbitalPointer.ts:117` — swallows all free rotation.

Note the **narrowing**: the modifier half of this class self-heals, because `drag` and `handleWheel` call `syncModifiers(event)` (`useOrbitalPointer.ts:100, 139`) which overwrites `shift`/`ctrl`/`meta` from live pointer state. The defect is confined to `x`/`y`/`z`, which have no such source.

**Falsifier.** Show a `blur`/`visibilitychange`/`window.focus` handler clearing `pressedKeys.x|y|z`, or a target guard in `updatePressedKeys`. Alternatively, demonstrate that `keyup` is always delivered for `x` under a held Meta on the target platform — that kills the `⌘X` scenario but not the window-blur one.

### M-4 · No `touchcancel` listener, and `pointercancel`'s touch branch skips `onStopDrag` — stale pinch baseline ⇒ scale jump

**Severity MAJOR** · `OrbitalDrag.vue:283-285` × `useOrbitalPointer.ts:203-216` × `useOrbitalPinch.ts:134-139, 186-189`

`previousPinchDistance` is reset from exactly two places: `stopTouchPinch` (touchend, `useOrbitalPinch.ts:134-139`) and `resetPinchDistance`, reached only via `stopDrag`'s `onStopDrag?.()` (`useOrbitalPointer.ts:93` → `OrbitalDrag.vue:231`).

* `OrbitalDrag.vue:283-285` registers `touchstart` / `touchmove` / `touchend` — **not `touchcancel`**.
* `onPointerCancel`'s touch branch (`useOrbitalPointer.ts:204-210`) clears state inline and **does not call `stopDrag`**, so `onStopDrag` — and therefore `resetPinchDistance` — never runs.

So an interrupted two-finger pinch (iOS system gesture, incoming call, notification, browser-initiated cancel) leaves `previousPinchDistance` at its last live value. The next pinch's first `handleTouchPinch` computes `(dist − staleDist) / (1/(scaleFactor*2))` (`useOrbitalPinch.ts:103-105`) against a baseline from a *different gesture* — an instantaneous scale jump, clamped only by the `[0.1, ∞)` floor at `index.ts:94-98`.

**Falsifier.** Show `touchcancel` wired anywhere in the unit (grep `touchcancel`: zero hits), or show `onPointerCancel`'s touch branch reaching `onStopDrag`. If iOS is proven to always emit a `touchend` before/with `touchcancel`, the claim weakens to the `pointercancel`-only path — which still stands on its own.

### M-5 · Document-level drag listeners are registered outside any effect scope — the code comment asserting otherwise is false — PROVEN-BY-REPRO

**Severity MAJOR** · `useOrbitalPointer.ts:178-181, 225-232`

```ts
178  // Pointer Events: dynamic document listeners only during active drag.
179  // Captured at capture-start as useEventListener stop() handles, torn down
180  // on pointerup/cancel; vueuse's tryOnScopeDispose covers an unmount mid-drag.
…
225  if (docListenerStops.length === 0) {
227      docListenerStops = [
228          useEventListener(doc, "pointermove", drag),
229          useEventListener(doc, "pointerup", onPointerUp),
230          useEventListener(doc, "pointercancel", onPointerCancel),
231      ];
```

Two independent reasons the :180 claim is wrong for the installed versions:

1. `@vueuse/core@14.3.0`'s `useEventListener` does **not** use `tryOnScopeDispose` at all — `node_modules/@vueuse/core/dist/index.js:188-213` shows it is `watchImmediate(...)` with an `onCleanup`, i.e. cleanup is owned by the **watcher**, which is owned by the **active effect scope at creation time**.
2. These three calls happen inside a `pointerdown` DOM callback, where there is no active scope.

Executed against the repo's own `vue@3.5.35`:

```
  scope at deferred call time: undefined
  in-scope watcher fired: 1   (stopped by scope.stop)
  deferred watcher fired : 2   (SURVIVES scope.stop => leak)
```

**Bite.** Unmount mid-drag (a scene/route transition, the home ↔ cube swap the store at `cubeTransformStore.ts:6-8` exists to survive) leaves `drag`/`onPointerUp`/`onPointerCancel` live on `document`, retaining the whole closure graph — model, composables, the detached container element. In the interval `drag` keeps mutating the **global** transform store (`createGlobalState`, still alive) and `syncRotationToModel` keeps `emit`-ing on a dead instance. It self-heals on the next `pointerup`/`pointercancel` that reaches `document`, so the leak is usually bounded — but the *contract* the comment states is not the one the code has, and the bound depends on an event the component does not control.

Note the contrast, which is why this is a real finding rather than a style nit: the **setup-time** `useEventListener` calls at `OrbitalDrag.vue:267-291` are genuinely scope-covered, because Vue 3.5's `setCurrentInstance` calls `instance.scope.on()` (`node_modules/@vue/runtime-core/dist/runtime-core.cjs.js:8013-8016`) and `injectHook` wraps every lifecycle hook in it (`:3050-3057`). The component is right in one place and wrong in the other.

**Falsifier.** Show `getCurrentScope()` non-null inside a `pointerdown` handler, or show `@vueuse/core@14.3.0`'s `useEventListener` registering a scope-independent teardown. Either kills this.

### M-6 · `inertiaFactor` is an unvalidated public prop whose natural boundary value **throws during setup**

**Severity MAJOR** · `OrbitalDrag.vue:56` → `inertiaDecay.ts:33-34` → `useOrbitalInertia.ts:63, 71` → `src/animation/physics/decay.ts:66-68`

```
props.inertiaFactor ?? 0.95   →   k = −ln(f)·60   →   decay({ velocity: 1, friction: k })
                                                       throws if k <= 0
```

* `inertiaFactor = 1` — the obvious "frictionless / never decay" value — gives `k = 0` ⇒ **`Error: decay() requires a friction coefficient > 0`** thrown synchronously inside `useOrbitalInertia`, i.e. inside `<script setup>`, i.e. the whole cube scene fails to mount.
* `inertiaFactor > 1` ⇒ `k < 0` ⇒ same throw.
* `inertiaFactor < 0` ⇒ `−Math.log(negative)` is `NaN`; `NaN <= 0` is **false**, so the guard passes, `factor` is `NaN` (`useOrbitalInertia.ts:78`), velocities go `NaN`, and the render string at `OrbitalDrag.vue:74` emits `NaN` — the browser drops the whole declaration silently.

The precondition is documented (`inertiaDecay.ts:31`: "`inertiaFactor` is a decay-per-frame fraction in (0, 1)") and **enforced nowhere**. The prop is typed bare `number?` (:28), has no JSDoc at the prop site, and no clamp.

**Falsifier.** Show a clamp/validator on the path, or show `decay()` tolerating `k = 0`. (`src/animation/physics/decay.ts:66-68` is explicit; the throw is intentional there — the defect is the demo handing it unvalidated user input.)

---

## 3. MINOR

**m-1 · Props are snapshotted at setup — five of six are permanently non-reactive.** `OrbitalDrag.vue:53-58` reads `props.sensitivity`, `props.translationFactor`, `props.inertiaFactor`, `props.scaleFactor`, `props.bounds` **once**, into module-level consts closed over by every applier. A parent binding `:sensitivity="s"` dynamically gets no update, ever. `props.applyTransformToContainer` (:64) *is* read reactively inside the computed — so the component is internally inconsistent about its own prop contract, with nothing marking which half is which. *Falsifier:* re-render with a changed `:sensitivity` and observe a changed rotation rate.

**m-2 · `bounds.rotate` is a declared, typed, defaulted field that is never applied.** `index.ts:28-32` and `:83-87` define it; `OrbitalDrag.vue:175-179` clamps only via `bounds[category]` for `category ∈ {"translate","scale"}` (:170), and no other site reads `bounds`. A consumer passing `bounds.rotate: [-90, 90]` is silently ignored. *Falsifier:* find a `bounds.rotate` read (grep the unit: none).

**m-3 · `VelocityState.rotate` is dead.** `index.ts:46-50` declares it and `:101-105` initialises it; every consumer loop iterates `["translate", "scale"] as const` only (`OrbitalDrag.vue:337`, `useOrbitalInertia.ts:53, 105`). Rotational velocity migrated to `angularVelocityAxis`/`angularVelocitySpeed` and the vestigial field was never removed. *Falsifier:* a read of `velocity.value.rotate` anywhere (grep: none).

**m-4 · `defaultTransformBounds` lacks the type annotation its two siblings have — and that omission is what forces the double cast.** `index.ts:63` is `: TransformState`, `:100` is `: VelocityState`, but `:82` is bare. Inferred, its members are `number[]`, not `[number, number]`, so it is **not assignable to `TransformBounds`** — which is precisely why `OrbitalDrag.vue:175` needs `as unknown as Record<string, Record<string, [number, number]>>`. Annotating `:82` makes the double cast collapse to a plain indexed read. Under `"strict": true` (`tsconfig.json:7`) this is the one place the unit buys its way out of the checker. *Falsifier:* add `: TransformBounds` to `index.ts:82` and see it compile — if it does, the cast was load-bearing for nothing.

**m-5 · `handleAxisSpecificInput` is a 3× verbatim repetition, and `updateAxisRotation`'s array parameter is dead generality.** `OrbitalDrag.vue:197-211` repeats one 5-line block three times with only the axis letter varying — `for (const a of axes) if (keys[a]) { … }` is an exact collapse (and `axes` is already imported, :18). Meanwhile `updateAxisRotation(constrainedAxes: (typeof axes)[number][], …)` (:141) is called from exactly three sites (:200, :205, :210), each with a **single-element** array; the `for` loop at :148 has never run more than once, and if it ever did, `angularVelocitySpeed.value = angle` at :157 would be wrong for all but the last axis. *Falsifier:* a call site passing ≥2 axes.

**m-6 · `lastInertiaTime` is not reset on the gesture early-return — a ~27 % momentum cliff on the first glide frame.** `useOrbitalInertia.ts:83` returns *before* `:91-93` updates `lastInertiaTime`, so throughout a drag the timestamp stays frozen at its pre-drag value. On release, the first frame computes `dt = Math.min(now − lastInertiaTime, 100)` = **100 ms**, giving `e^(−3.078·0.1) ≈ 0.735` instead of `≈ 0.950`. Compounded with the deliberate `× 0.8` dampen at `OrbitalDrag.vue:335`, ~41 % of the momentum is gone in one frame — directly against the stated intent at :333-334 ("preserves most of the momentum for a smooth handoff"). One line fixes it: `lastInertiaTime = 0` in the early-return. *Falsifier:* log `dt` on the first post-release frame; if it is ~16 ms, dead.

**m-7 · `useOrbitalPinch` requires a `model` it never reads.** `useOrbitalPinch.ts:9` declares `model: Ref<TransformState>` as a **required** field of `OrbitalPinchParams`; `:22-31` destructures every other field and omits it, and `params.model` appears nowhere in the file. `OrbitalDrag.vue:235` dutifully passes it. This also punctures the encapsulation rule the unit states at `OrbitalDrag.vue:160-164` (the readers get callbacks, not the model) — the pinch reader is handed the model anyway. *Falsifier:* a `params.model` / `model.` read in `useOrbitalPinch.ts`.

**m-8 · The composable return surfaces are ~50 % unconsumed.** `useOrbitalPointer` returns 12 members (`:235-248`); OrbitalDrag consumes 7 — `activeTouchPointers`, `syncModifiers`, `startDrag`, `stopDrag`, `drag` are exported to nobody. `useOrbitalPinch` returns 8 (`:191-200`); `previousPinchDistance` is unconsumed. `useOrbitalInertia` returns `{ pause, resume }` (`:143`); `resume` is unconsumed (it is called only from the composable's own internal watcher, `:138`). Every one of those is a public seam that must now be preserved by anyone refactoring, for zero call sites. *Falsifier:* a consumer outside the unit (grep for `orbital-drag/composables`: only `test/demo/scenes/orbital-inertia-parity.test.ts:6`, which imports `inertiaDecay` alone).

**m-9 · A mouse `pointerup` while a touch is still down tears down the shared document listeners and wedges the state machine.** `useOrbitalPointer.ts:198` is `if (event.pointerType !== "touch" || activeTouchPointers.size === 0) removeDocListeners()`. With a mouse (or pen) and a finger both down — the listeners were registered once and shared by design (:223-224) — the mouse's `pointerup` satisfies the left disjunct and removes all three, while `activeTouchPointers.size === 1`. The surviving touch's `pointermove`/`pointerup` are then unheard: `isDragging`/`isTouching` stay `true` forever, `applyInertia` early-returns permanently (`useOrbitalInertia.ts:83`), and the release watcher (`OrbitalDrag.vue:324`) never fires again for the component's lifetime. Reachability is genuinely narrow (hybrid touchscreen laptop; pen + touch), which is why this is MINOR and not MAJOR. *Falsifier:* show the condition guarding on `activeTouchPointers.size === 0` alone.

**m-10 · "Zero-alloc" is claimed in one breath and abandoned in the next.** `OrbitalDrag.vue:61` advertises `renderAxis` as a "reused getAxisAngle out-param (zero-alloc)". Fifty-four lines later `applyRotation` (:115) does `const deltaQuat = quat.create()` — a fresh `Float32Array` on **every** pointermove *and* every inertia frame. `updateRotation` (:124) and `updateAxisRotation` (:149) each allocate another `vec3` per call; `updateLinearTransform` (:176) and `applyInertia` (`useOrbitalInertia.ts:106`) call `Object.entries()` per category per frame. Separately, `useOrbitalInertia.ts:68-70` asserts "`decay()` is allocation-free per call" — the engine's own doc says the same (`src/animation/physics/decay.ts:53-54`) — but the sampler returns a **fresh `DecaySample` object literal** on every call (`decay.ts:79-82`). None of this is a performance emergency at 60 Hz; the defect is that the comments are load-bearing claims that the code contradicts, in a file whose whole idiom is comment-as-contract. *Falsifier:* show `quat.create()` at :115 hoisted, or `decay.ts:74-83` returning a reused object.

**m-11 · Emit suppression is asymmetric and undocumented as such.** `isInteracting` (:87, :95-97) suppresses only `emit("rotate")` during a gesture, with the rationale "reduce reactivity cascade on iOS" (:94). `updateLinearTransform` emits `translate`/`scale` unconditionally on every frame of every drag, pinch and inertia step (:181-182). If the cascade is real, translate/scale are the higher-frequency offenders (pinch fires four of them per touchmove: `useOrbitalPinch.ts:109-113`). *Falsifier:* a rationale for the split, or an `isInteracting` guard on :181-182.

**m-12 · The inertia-parity gate pins a factor the component does not use, and calls it the default.** `test/demo/scenes/orbital-inertia-parity.test.ts:29` — `const INERTIA_FACTOR = 0.92; // the orbital-drag default friction-per-frame`. The actual default is `0.95` (`OrbitalDrag.vue:56`). The parity proof is still mathematically valid for any `f ∈ (0,1)`, so this is documentation drift rather than a false green — but it is the kind of drift that lets `M-6`'s missing validation hide, since the gate never exercises the boundary. *Falsifier:* find `0.92` anywhere in the component's default path.

---

## 4. INFO (including three killed candidates)

**I-1 · `onUnmounted(() => inertia.pause())` is redundant.** `OrbitalDrag.vue:294-296` is the entire unmount hook, and `useRafFn` already registers `tryOnScopeDispose(pause)` (`@vueuse/core/dist/index.js:734`) from setup, where the scope is live. Harmless, but it is the only `onUnmounted` in the file and reads as if teardown were manual here — it is not.

**I-2 · `slot in pressedKeys.value` walks the prototype chain.** `useOrbitalPointer.ts:173` uses `in`, so `"constructor"`, `"toString"`, `"valueOf"` etc. would pass the guard and plant own properties on the reactive latch. **Currently unreachable** — no `KeyboardEvent.key` value collides with `Object.prototype` — which is exactly why this is INFO and not a defect claim. `Object.hasOwn` would close it. *Falsifier:* none needed; the reachability is the disclaimer.

**I-3 · F-1 (phantom `@mkbabb/glass-ui`) does not bite this module's graph — it bites its only mount path.** Refinement of `lane-frontend.md` F-1, not a contradiction. `OrbitalDrag.vue` + its four composables + `index.ts` + `types.ts` + `quaternionEuler.ts` import exactly: `vue`, `@vueuse/core`, `gl-matrix`, `@mkbabb/value.js/math`, `@mkbabb/keyframes.js`, and relatives. **Zero glass-ui.** But its sole consumer chain does: `CubeScene.vue:37-42` imports `{ Popover, PopoverContent, PopoverTrigger, Button }` and `MatrixEditor.vue:98` imports `{ Input } from "@mkbabb/glass-ui/forms"`. So under `npm ci` from the lockfile (F-1: zero glass-ui entries) the cube scene does not build and this component is unreachable — despite being, itself, perfectly portable. Any wave that lifts `OrbitalDrag` out of the demo inherits none of F-1; any wave that merely *builds* it inherits all of it.

**I-4 · `containerStyle` mutates shared state from inside a computed.** `OrbitalDrag.vue:70` writes the setup-scoped `renderAxis` (:61) as a `getAxisAngle` out-param. Consistent within a single evaluation, so no bug today, but an impure computed is a trap for any future reader of `renderAxis` outside the computed body.

**I-5 · The `orbital-rotate3d` gate proves the render *form*, not the render *wiring*.** `test/demo/scenes/orbital-rotate3d.test.ts` never mounts: clause (c) (`:155-168`) is `fs.readFileSync` + regex, and clauses (a)/(b) exercise a hand-copied replica (`:52-56`) whose comment concedes "the SFC inlines it inside a computed … so the gate exercises the same code path". It exercises the same *math*, not the same *path* — which is precisely the gap **B-1** lives in. Recorded so the next wave does not read a green gate as coverage of the reactivity contract.

### Killed candidates — claims investigated and NOT raised

* **"`useEventListener` inside `onMounted` leaks."** *Killed.* Vue 3.5.35's `setCurrentInstance` calls `instance.scope.on()` (`runtime-core.cjs.js:8013-8016`) and `injectHook` wraps hooks in it (`:3050-3057`), so `OrbitalDrag.vue:267-291` is fully scope-covered. (The *deferred* case at `useOrbitalPointer.ts:225-232` is a different animal — see M-5.)
* **"`@mkbabb/keyframes.js` self-import creates a types/runtime split (dist vs src)."** *Killed.* `vite.config.ts:39-42` and `tsconfig.json:30` both map it to `./src/animation/index.ts`, and `decay` is exported there (`src/animation/index.ts:136`). Runtime and typecheck agree. This is a **superlative**, not a defect — see SUP-1.
* **"`quaternionToEulerDegrees` is the wrong convention / can emit NaN."** *Killed.* Verified algebraically against `R = Rx·Ry·Rz`: `r02 = sin(ey)`, `ex = atan2(−r12, r22)`, `ez = atan2(−r01, r00)`, and the `|sy| ≥ 0.9999` branch correctly collapses to `ex = x ± z, ez = 0`. The quaternion→matrix entries match the standard identities exactly. Separately, `gl-matrix@3.4.4`'s `getAxisAngle` guards `s > EPSILON` and returns axis `[1,0,0]` at identity, and `quat.normalize` (`OrbitalDrag.vue:118`) keeps `|w| ≤ 1`, so `Math.acos` cannot go `NaN` on this path.

---

## 5. SUPERLATIVES (L-18, running the other way)

**SUP-1 · The inertia decay is the best engine-dogfood in the unit — and possibly in the scene.** `useOrbitalInertia.ts:13, 63, 71, 77-78` + `inertiaDecay.ts`. Four things are right at once: (i) it consumes the **shipped** analytic `decay()` closed form instead of the hand-rolled `Math.pow(inertiaFactor, dt/TARGET_DT)` it replaced; (ii) it imports it from the **published barrel** `@mkbabb/keyframes.js`, not a deep `@src/animation/*` path, and *that alias is honest* — `vite.config.ts:39-42` and `tsconfig.json:30` agree, so what typechecks is what runs; (iii) the sampler is seeded **once** with unit velocity so `unitDecay(dt/1000).velocity` *is* the per-frame factor, making the hot loop a read; (iv) the one measure-first fact the swap rests on (`k = −ln(f)·(1000/TARGET_DT)`) is extracted into a **Vue-free** module precisely so the parity gate can import it without the `.vue` graph (`inertiaDecay.ts:9-11`, consumed at `orbital-inertia-parity.test.ts:2-6`). The gate then proves *both* legs — 60 fps epsilon-parity with the legacy form **and** frame-rate invariance the discrete form never had. This is what "dogfood the engine" is supposed to look like. *Falsifier (L-18 runs both ways):* if `decay` were not exported from the aliased module, or the parity gate imported the SFC, or the alias disagreed with `tsconfig` paths — none hold.

**SUP-2 · The rotation output leg is genuinely SOTA and the anti-pattern was correctly identified and removed.** `OrbitalDrag.vue:70-74` renders **one** `rotate3d(ax, ay, az, θdeg)` read straight off the quaternion's native axis-angle. There is no Euler re-application, no `Rx·Ry·Rz` chain, and therefore no gimbal branch in the render path at all — the `ez = 0` pole degeneracy in `quaternionEuler.ts:42-45` is confined to the *v-model surface*, which is exactly where a lossy Euler triple belongs (sliders, share hash). Accumulation is delta-multiply + normalize (:115-118), never reconstruct-from-Euler. *Falsifier:* a `rotateX(`/`rotateY(`/`rotateZ(` in the render (there is none), or a NaN axis at identity (`getAxisAngle`'s `s > EPSILON` guard prevents it, and the gate asserts it at `orbital-rotate3d.test.ts:89-97`).

**SUP-3 · `quaternionEuler.ts` is a small, correct, dependency-free, allocation-conscious pure module.** 64 lines, no Vue, no component coupling, both directions documented with their convention, `quaternionToEulerDegrees` allocating exactly one result object and no intermediate matrix. I verified the extraction against `R = Rx·Ry·Rz` term by term (see §4) — it is right, including both pole branches. This is the correct Goldilocks size and the correct place for it.

**SUP-4 · The ownership boundary between the component and its readers is stated *and* mostly obeyed.** `OrbitalDrag.vue:160-164` writes the rule out loud — the appliers that touch `model`/`velocity`/`emit` live in the component; the readers get them as callbacks. `useOrbitalPointer` honours it completely: it never receives `model` at all (`OrbitalPointerParams`, `useOrbitalPointer.ts:8-22`) and never touches it. That is a real, checkable architectural invariant, and it is why `updateRotation`/`applyRotation` can be swapped without touching gesture code. Docked one notch by **m-7** (pinch is handed a `model` it does not use), which is the exception that proves the rule was deliberate.

**SUP-5 · The touch-transition hardening is craft that most trackball implementations simply lack.** `useOrbitalPointer.ts:83-89` flags the pinch→single-finger transition and `:105-110` re-seats `previousMousePosition` and swallows exactly one frame — killing the rotation jump when one finger of a pinch lifts — and it correctly clears the flag when *all* fingers lift (`:86-89`) so the flag cannot go stale. `onPointerCancel`'s touch branch (`:204-210`) treats post-cancel touch state as untrustworthy and resets wholesale, with the reason written down. `releaseCapture` (`:188-192`) has a `KEEP:`-annotated try/catch for iOS's double-release throw. These are all real-device scars, and they are documented as such. (M-4 is the one gap in an otherwise careful cancel story — which is what makes M-4 worth fixing rather than rewriting.)

---

## 6. What one fix buys the most

`default: () => structuredClone(defaultTransformState)` at `OrbitalDrag.vue:44` kills **B-2** (the read leaves module scope, so the TDZ cycle cannot fire) and **M-2** (no shared singleton) together, and lets the dead guard at :47-49 be deleted. Independently, `void [model.value.rotate.x, model.value.rotate.y, model.value.rotate.z]` at :68 kills **B-1** at the cost of two characters of tracking — though the structurally right answer is to make `currentQuaternion` a version-bumped `shallowRef` so the render depends on the *source of truth* rather than on a derived surface the code already calls lossy.
