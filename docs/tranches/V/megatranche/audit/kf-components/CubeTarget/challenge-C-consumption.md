claude-opus-5[1m]

# CHALLENGE · `CubeTarget.vue` · axis C — CONSUMPTION

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/scenes/cube/CubeTarget.vue` (239 L)
**Axis** how this component consumes **keyframes.js** (the library under test) and **glass-ui** (the design system): subpath choices, shadow components, value.js transitive exposure / R1 reachability, props-emits contract quality, sibling integration seams.
**Mode** static, read-only. No installs, no dev server, no browser. Every claim carries `file:line` + a falsifier. Claims whose *perceptual* half needs a running page are marked **UNPROVEN-NEEDS-LIVE** (SS-13).
**Whole-file reads** `CubeTarget.vue`, `CubeTarget.css`, `useCubeRelit.ts`, `CubeAxisLines.vue`, `orbital-drag/index.ts`, `orbital-drag/types.ts`, `orbital-drag/OrbitalDrag.vue`, `orbital-drag/quaternionEuler.ts`, `composables/useDoubleTap.ts`, plus the seam files the contract touches (`CubeScene.vue`, `useCubeDemo.ts`, `matrix-editor/useTransformState.ts`, `demo/kf-engine.ts`) and the library surfaces consumed (`src/animation/load-engine.ts`, `engine/css/css-animation.ts`, `compile/value-ast.ts`, `compile/easing/easing-registry.ts`, `constants/defaults.ts`, `engine/play-lifecycle.ts`, `internal/leaves.ts`).
**Hitherto corpus folded** `formation/keyframes/lane-frontend.md` (F-1 phantom dep, S-1…S-8 shadow census, §3.1 subpath utilisation, §6.3 token namespace, §6.5 PRM sites), `formation/keyframes/lane-library.md` (§4.1 A3 parse seam, §4.6 R1 blast radius, §7.5 failure-posture, LEG-3 math leaves).

---

## 0. Verdict

| | |
|---|--:|
| BLOCKER | **0** |
| MAJOR | **4** |
| MINOR | **6** |
| INFO | **4** |
| Superlatives | **4** |

The component's *library* consumption is the best-behaved thing about it: the LIGHT/HEAVY boundary is honoured exactly, and the R1 parser-crash class is **not reachable** from this subtree (§S-1, §S-2 — both stated with falsifiers, because L-18 runs both ways). The defects are concentrated in (a) the **Roll egg's** use of the engine — no reduced-motion path, no self-composition, a gesture lock that does not lock — and (b) the **seam with its own colocated units**, where one fact travels by two mechanisms, one payload is consumed lossily, and the signature `--lit` material is wired to a model that the engine-driven rotations never write.

Component-level glass-ui consumption is **zero imports** (lane-frontend §4 classifies it `b`, 239 L). That is mostly correct — a 3D die has no design-system counterpart — with exactly one exception: the loading state (§D-9).

---

## 1. MAJOR

### D-1 · The Roll egg ships no reduced-motion path — MAJOR

`CubeTarget.vue:205-211` constructs the tumble with four options and **omits `respectReducedMotion`**:

```ts
rollAnim = new CSSKeyframesAnimation({
    duration: 1100, iterationCount: 1, fillMode: "forwards",
    timingFunction: "ease-out-back",
})
```

The default is **false** (`src/animation/constants/defaults.ts:87` — `respectReducedMotion: false`), and the engine's PRM gate is a strict no-op when the option is off: `play-lifecycle.ts:204-211` routes through `withReducedMotion(anim.options.respectReducedMotion, …)` and *returns unflipped* when the option is unset (same at `:376`). So under `prefers-reduced-motion: reduce` the die still executes **1–2 extra whole turns per axis on two axes** (`CubeTarget.vue:195-196`) over 1.1 s with an overshoot landing — a textbook vestibular trigger.

`CubeTarget.css` (154 L, read whole) contains **no** `@media (prefers-reduced-motion: reduce)` block, so there is no CSS backstop; and there could not be one — the engine writes the rotation as an inline style / WAAPI effect, which a media block cannot override without `!important`.

This is a *contract* breach, not merely an omission. The same scene's intro sweep hand-rolls the guard 40 lines away:

```ts
// useCubeDemo.ts:162-169
const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
if (prefersReduced) { graphEl.style.transform = "rotate3d(-1, 1, 0, 30deg)"; }
else { changeGraphPerspectiveAnim.play(); }
```
…and calls it "the house reduced-motion contract" (`useCubeDemo.ts:159-161`). lane-frontend §6.5 counts **13** PRM enforcement sites across 12 files; this scene owns one of the three JS sites (`useCubeDemo.ts:164`). The Roll is the scene's *largest* motion and the only one outside the contract.

The consumption framing: **the library already provides the fix as a single option.** `respectReducedMotion: true` snaps `play()` to the rest frame — which for this animation means the die simply *shows* its new face without tumbling, exactly the desired degraded behaviour.

> **Falsifier** — (a) show `respectReducedMotion` defaulting true on any path that reaches this constructor; (b) produce a PRM rule in the loaded cascade that neutralises `.cube`'s engine-written transform; (c) show that `snapToReducedMotion` is reached with the option false. I read `defaults.ts:79-89` and `play-lifecycle.ts:204-211,376` and found none of these.

---

### D-2 · The Roll is not self-composable — every roll after the first re-bases the die to identity — MAJOR

`CubeTarget.vue:211-216` authors the tumble with a **hard-coded `from`**:

```ts
.fromKeyframes({
    from: { transform: { rotateX: "0deg",       rotateY: "0deg" } },
    to:   { transform: { rotateX: `${endX}deg`, rotateY: `${endY}deg` } },
})
```

with `fillMode: "forwards"` (`:208`). After roll #1 the `.cube` element rests at `rotateX(face.x + n·360) rotateY(face.y + m·360)` ≡ `face` mod 360. Roll #2 constructs a **new** animation whose t=0 frame is `rotateX(0) rotateY(0)`, and the layer operator is `replace` (omission ⇒ replace, `constants/types.ts:208-209`), so the first painted frame of roll #2 **snaps the die back to the identity attitude** before the new tumble begins. `ROLL_FACES` (`:180-187`) has 6 entries of which 5 are non-identity, so **5 of 6 rolls are followed by a visible ≥90° snap** on the next roll.

The path through `rollAnim?.stop()` (`:204`) does not rescue it: stopping/cancelling the prior animation removes its `forwards` fill, which returns the element to its base (untransformed) style — the same snap, one frame earlier.

The in-file comment asserts the opposite:

> `// Release the gesture lock after the arc; the fillMode:forwards leaves the die` `// resting on its rolled face (the next drag/animation re-bases as usual).` — `:219-221`

The next **drag** re-bases (OrbitalDrag owns a different element). The next **roll** does not. The library affordance that would fix this exists — read the landed pose and author `from` from it, or drive the roll through the same `AnimationGroup` layer stack `useCubeDemo.ts:114-122` already builds so the composition operator is explicit.

> **Falsifier** — show that `composite`/`animation-composition` resolves to `add`/`accumulate` for this animation (I found `replace` by omission at `constants/types.ts:208-209`), or that the engine ignores an *explicit* `from` frame in favour of the underlying computed value (`compile/value-ast.ts:88-109` flattens the authored object verbatim; `engine/composition.ts` `captureUnderlyingBase` is reached only for non-`replace` operators). One live double-double-tap settles it.

---

### D-3 · `.cube--rolling { pointer-events: none }` does not lock the gesture it claims to lock — MAJOR

`CubeTarget.css:18-24`:

```css
/* EASTER EGG — "the Roll" (H.W12.S6): while the die tumbles, the cube ignores
   pointer input so a stray drag mid-roll cannot fight the spring… */
.cube--rolling { pointer-events: none; }
```

`pointer-events: none` removes `.cube` **and its descendants** from hit-testing — but OrbitalDrag's drag is not bound to `.cube`. It is bound to OrbitalDrag's **root container**:

```
OrbitalDrag.vue:2    <div ref="containerRef" :style="containerStyle">
OrbitalDrag.vue:280  useEventListener(containerRef, "pointerdown", pointer.onPointerDown);
```

The DOM chain is `containerRef` → `.idle-hover` (`CubeTarget.vue:17-22`, a plain div, `pointer-events` unset) → `.cube` (`:23-27`). `.cube` is explicitly sized `--side-size` square (`CubeTarget.css:42-50`) and its faces are `position: absolute` (`:69-76`), so `.idle-hover` and the container occupy the *same box* as `.cube`. With `.cube` transparent to hit-testing, the hit target becomes `.idle-hover`, the event bubbles to `containerRef`, and **the drag starts normally**.

What the rule *does* achieve is suppressing `useDoubleTap`'s own listeners (`useDoubleTap.ts:59,65,70` bind to `opts.el` = `cubeEl`) — i.e. it re-implements the `rolling.value` guard (`CubeTarget.vue:190`) that already exists, while missing its stated job. Net: one inert rule plus a comment that will mislead the next reader into trusting a lock that is not there. Secondary effect: a tap landing during the 1.2 s window is swallowed, so a user's second tap of a fresh double-tap can be lost.

> **Falsifier** — find any ancestor of `.cube` on this path carrying `pointer-events: none` (OrbitalDrag's `<style scoped> div { … }` at `:346-352` sets only `cursor`/`user-select`/`touch-action`, and scoped rules do not reach slotted content anyway), or show the container box does not cover the die. A live probe: start a drag during a roll and watch `model.rotate` change.

---

### D-4 · The re-lit die is frozen during every engine-driven rotation — MAJOR

`useCubeRelit` is a pure `computed` over **one** input:

```ts
// useCubeRelit.ts:82-84
const faceLit = computed(() =>
    FACE_NORMALS.map((n) => litFor(n, transform.value.rotate).toFixed(2)));
```

`transform.value.rotate` is written by exactly one producer — OrbitalDrag's `syncRotationToModel` (`OrbitalDrag.vue:89-98`). **Neither** engine path writes it:

| rotation source | element written | writes `transform.rotate`? |
|---|---|---|
| the Roll (`CubeTarget.vue:217` `rollAnim.setTargets(cubeEl.value)`) | `.cube` | **no** |
| `rotationAnim` (`useCubeDemo.ts:155` `setTargets(cubeEl)`) | `.cube` | **no** |
| `matrixAnim` (`useCubeDemo.ts:156`) | `.cube` | **no** |
| `hoverAnim` (`useCubeDemo.ts:157`) | `.cube` | **no** |
| OrbitalDrag pointer/pinch/inertia | container | yes |

So the component's signature material — "faces toward the key light brighten and catch a thin specular, faces away sink into a `--background` veil" (`useCubeRelit.ts:10-12`) — holds **`--lit` constant** through the entire 1.1 s tumble and through the whole playback of `Rotations` (a full turn on three axes, `useCubeDemo.ts:82-97`). The light stops being pinned in the room and becomes welded to the die precisely when the die is spinning.

This is a consumption defect, not merely a wiring one: the engine publishes per-frame state (the same `transformTargetsStyle` painter `useTransformState.ts:31` already imports from `kfEngine()`), and the group exposes a frame callback surface; the component takes neither, and its lighting model silently degrades to a no-op for the majority of the die's motion.

> **Falsifier** — exhibit any writer that syncs `transform.rotate` from an engine frame. `grep -rn "rotate\.x = " demo/scenes/cube` yields only `OrbitalDrag.vue:91` and `useTransformState.ts:69`. The *perceptual* magnitude (how obvious the frozen shading is at 1.1 s) is **UNPROVEN-NEEDS-LIVE**; the mechanism is confirmed statically.

---

## 2. MINOR

### D-5 · `--target-viewport-h: 30cqb` cannot resolve against the container the doc says it resolves against — MINOR

`styles/layout.css:21-22` defines the loader box the component consumes at `CubeTarget.vue:33`:

```css
--target-viewport-h: 30cqb;   /* h-[var(--target-viewport-h)] cube-target loader height */
--target-viewport-w: 30cqi;   /* w-[var(--target-viewport-w)] cube-target loader width  */
```

The only query container on the ancestor path is `.controls-layout`, and it is declared **inline-axis only**, deliberately:

```
AnimationControlsGroup.css:25   container-type: inline-size;
AnimationControlsGroup.css:15-16  "`inline-size` ONLY (NOT `size`/both-axes)…"
AnimationControlsGroup.css:22-24  "…C6's --target-viewport-w/h: 30cqi/30cqb on the
                                   cube-target loader both now track the card, not the raw viewport."
```

Block-axis container units (`cqb`/`cqh`) require an eligible container **in that axis**; an `inline-size` container has no block size to offer, so `cqb` falls back to the small-viewport block size. The `30cqi` half of the claim is true; the `30cqb` half is false. Consequence: the loader's **height** tracks the raw viewport (≈30 svh) while its **width** tracks the clamped work-area card — the box the comment says is bounded by the work-area clamp is not, and the two axes diverge with viewport aspect. The `<svg>` glyph itself letterboxes (`preserveAspectRatio` default), so the spinner stays circular at `min(w,h)`; what drifts is the box and therefore the glyph's centring in the larger axis.

`grep -rn "container-type: size" demo/` returns exactly one hit — `SpringHeatmap.vue:303` — not on this path.

> **Falsifier** — a `container-type: size` ancestor between `.cube` and `.controls-layout`, or a UA that resolves `cqb` against an inline-size container. Visual magnitude: **UNPROVEN-NEEDS-LIVE**.

### D-6 · The `pressed-keys` payload is consumed lossily, so the reveal mis-reports the mode — MINOR

`PressedKeys` carries six fields (`orbital-drag/types.ts:8-15`): `x, y, z, shift, ctrl, meta`. OrbitalDrag uses the modifiers to switch what the **same** X/Y/Z latch constrains:

```ts
// OrbitalDrag.vue:197-211
if (keys.x) {
    if (keys.shift)                 updateTranslation("x", delta);
    else if (keys.ctrl || keys.meta) updateScale("x", delta);
    else                             updateAxisRotation(["x"], …);
}   // …identically for y and z
```

`CubeTarget.vue:159-163` drops all three modifiers:

```ts
const onPressedKeys = (keys: PressedKeys) => {
    axisLock.x = keys.x; axisLock.y = keys.y; axisLock.z = keys.z;
};
```

So when the user holds **Shift+X** (a translate lock) or **Ctrl+X** (a scale lock), the reveal lights the X line under a documented meaning that is now wrong on both sides of the seam: `CubeTarget.vue:97-99` — "OrbitalDrag **CONSTRAINS rotation** to a single axis while X/Y/Z is held"; `CubeAxisLines.vue:3-4` — the same sentence. The disambiguating data is already in the emitted payload; three booleans are discarded at the receiving end.

> **Falsifier** — establish that the axis line's intended semantic is mode-agnostic ("this axis is the active constraint, whatever the operation"). The prose in both files says *rotation*, so the burden is on the defence.

### D-7 · Two publication mechanisms for one fact; the sibling's documented one is dead — MINOR

OrbitalDrag publishes the latch **twice**, and its scoped-slot half exists explicitly for this consumer:

```html
<!-- OrbitalDrag.vue:3-7 — "expose `pressedKeys` … as a scoped slot prop
     so the cube can light the locked axis line." -->
<slot :pressed-keys="pointer.pressedKeys.value"></slot>
```
```ts
// OrbitalDrag.vue:40, 317-321 — and again as an emit, via a deep watch
(e: "pressedKeys", keys: PressedKeys): void;
```

`CubeTarget.vue:15` takes the **emit** (`@pressed-keys="onPressedKeys"`) and mirrors it into a local `reactive` (`:158-163`). Its default-slot content (`:17-92`) declares no `v-slot`, and repo-wide grep for `pressed-keys`/`pressedKeys` returns **no other consumer** — so the slot prop is dead API on the producer, kept alive only by its comment. One of the two mechanisms should go; the emit is the defensible survivor, because `CubeAxisLines` is rendered *outside* the OrbitalDrag slot (`CubeTarget.vue:101` vs `:11-93`) and could not read the slot prop where it stands.

> **Falsifier** — one consumer of the slot prop anywhere. `grep -rn "pressed-keys\|pressedKeys" demo/` → 4 files, all listed above.

### D-8 · Guard flag raised before a fallible await, with no `try`/`finally`; release timer never cleared — MINOR

```ts
// CubeTarget.vue:189-222 (abridged)
if (rolling.value || !cubeEl.value) return;
rolling.value = true;                       // :191  — flag up
…
const { CSSKeyframesAnimation } = await loadAnimationEngine();   // :198 — fallible
…
setTimeout(() => { rolling.value = false; }, 1200);              // :221 — the only release
```

There is no `try`/`finally`. A rejection at `:198` leaves `rolling` **permanently true**, which (a) kills the egg for the session and (b) pins `.cube--rolling` → `pointer-events: none` on the die forever (`CubeTarget.css:22-24`). The 1200 ms release timer is also never cancelled on teardown — `onScopeDispose` (`:234-236`) stops `rollAnim` but not the timer.

**Honest reachability note:** `demo/app/main.ts` awaits `warmKfEngine()` before `app.mount()` (`kf-engine.ts:18-20`), and `loadAnimationEngine` memoizes one promise (`load-engine.ts:113-124`), so a rejection here implies the app never mounted. The defect is therefore *structural*, not currently reachable — which is exactly why it is MINOR rather than MAJOR. The 1200/1100 ms coupling (`:206` vs `:221`) is a second magic-number seam: the release is a hand-tuned constant rather than the animation's own completion.

> **Falsifier** — show a reachable rejection of `loadAnimationEngine()` after mount (I could not construct one), or a teardown path that clears the timer.

### D-9 · Loading-state shadow — the one glass-ui gap in an otherwise glass-free component (extends lane-frontend **S-6**) — MINOR

```html
<!-- CubeTarget.vue:32-34 -->
<Loader2 class="absolute h-[var(--target-viewport-h)] w-[var(--target-viewport-w)] animate-spin" />
```

`import { Loader2 } from "@lucide/vue"` (`:108`) — a raw icon plus a Tailwind keyframe. Census: `grep -rn "Loader2\|animate-spin" demo/` returns **only these two lines** across 58 components. So the demo's third loading surface is a singleton idiom with no design-system anchor, alongside `App.skeleton.vue`'s hand-rolled shimmer plate (lane-frontend **S-6**, 101 L) and glass-ui's own unreached primitives.

The counterpart is real and installed. glass-ui 7.0.0 ships `Progress` with a first-class indeterminate mode:

```
node_modules/@mkbabb/glass-ui/dist/components/progress/types.d.ts
    indeterminate?: boolean;   variant?: "default" | "gradient" | "liquid";
```

and `/progress` + `/pulse` are both in the **52 unreached subpaths** (lane-frontend §3.1 — utilisation 21/73 ≈ 29 %). Treat as **evaluate**, not mechanical swap, matching lane-frontend's S-6 posture: a linear indeterminate bar is a different form from a centred spinner, and the die's centre may want a circular mark. The finding is that the choice was never made — no glass-ui subpath was consulted at all.

> **Falsifier** — a design ruling that the scene subject must not carry design-system chrome, or a demonstration that `Progress`/`Pulse` cannot render a centred indeterminate mark.

### D-10 · The loader renders *inside* the `preserve-3d` die, larger than the die, with the faces not gated — MINOR (perceptual half UNPROVEN-NEEDS-LIVE)

`<Loader2>` (`:28-35`) is a **sibling of the six faces** inside `.cube` (`:36-90`), which is `preserve-3d` (`:25`). The faces sit at `translateZ(±var(--side-offset))` (`CubeTarget.css:86-104`) with 0.8-alpha crayon backgrounds (`styles/style.css:148-153`); the loader has no `translateZ`, so it lies on the die's **z = 0 centre plane** — behind the front face and in front of the back one, in 3D paint order (the `z-10` on `.cube-side` at `:49` is a local rung, per the file's own note at `:44-48`). It is also *larger* than the die: ≈30 svb (per **D-5**) against `--side-size: min(25vh, 25vw, 15rem)` (`CubeTarget.css:43`).

Crucially the faces are **not** gated on `showLoader` — only `ppMode` gates the face content (`:53`, `:82`). So the "loading" state renders a spinner buried at the centre of a fully-drawn, semi-transparent die.

> **Falsifier** — a live capture showing the spinner reads cleanly (it may, given the 0.8 alpha and the lacquer). The structural facts (sibling-of-faces, z = 0, larger than the die, faces ungated) are confirmed statically; only the legibility verdict needs the SS-13 pass.

---

## 3. INFO

### D-11 · The `transform` model contract is "hand me a mutable object", not a v-model — INFO

`defineModel<TransformState>("transform", { required: true })` (`:124`) is forwarded to a child that writes **through** it in place rather than emitting an update: `OrbitalDrag.vue:91-93` (`model.value.rotate.x = …`) and `:172-178` (`(model.value[category] as Record<string, number>)[axis] = value`). The chain works only because one object identity is shared end to end — `useTransformState.ts:36` `ref<TransformState>` → `CubeScene.vue:21` `v-model:transform` → `CubeTarget.vue:124` → `OrbitalDrag.vue:43`. A parent supplying a `computed`, a `readonly`, or a per-render clone would break silently, with no type error, because `required: true` says nothing about mutability. Corroborating muddle in the same seam: `useTransformState`'s first parameter `isGroupPlaying` (`:22`) is **never read** in the 227-line body — a dead flag in the very protocol `CubeTarget` mirrors.

> **Falsifier** — show a `update:transform` emit anywhere in the chain. `grep -rn "update:transform" demo/scenes/cube` → none.

### D-12 · `props.isPlaying || props.isStarted` has a dead term and disagrees in shape with the other writer's gate — INFO

`CubeTarget.vue:14` — `:apply-transform-to-container="props.isPlaying || props.isStarted"`. The shell derives the two flags such that `isPlaying ⇒ isStarted`:

```ts
// AnimationControlsGroup/useAnimationGroupPlayback.ts:54-56
const isStarted = computed(() => isPlaying.value || getAnimationGroup().started);
```

so the `props.isPlaying` term can never change the disjunction's value. Meanwhile the *other* writer of the cube's transform gates on `isStarted` **alone**:

```ts
// useTransformState.ts:197-215
watch(transformSliderValues, () => { if (isGroupStarted.value) return; … transformTargetsStyle(…) })
```

The two gates must stay exact complements — one paints the OrbitalDrag container, the other paints `.cube` — yet they are written differently in two files with no shared constant. Should the shell invariant ever loosen, the region `isPlaying ∧ ¬isStarted` activates **both** painters on the same visual. Today it is unreachable; the redundancy is the smell.

> **Falsifier** — a writer that sets a scene's `isPlaying` true without `isStarted`. The only writer found is `useSceneMachineShellBinding.ts:262-267` driving the derived pair.

### D-13 · `@property --lit` is a document-global registration emitted from a scoped stylesheet — INFO

`CubeTarget.css:6-10` registers `--lit` with `inherits: true`, `initial-value: 0.5`; the file is consumed as `<style scoped src="./CubeTarget.css">` (`CubeTarget.vue:239`). Vue's scoped transform rewrites *selectors*, not at-rules, so the registration is document-wide. In a tree that lane-frontend §6.3 measures at **98 unprefixed demo custom properties and zero `--kf-*` namespacing**, `--lit` is about as collision-prone a name as exists, and `inherits: true` means it cascades into every descendant of anything that sets it.

**No collision exists today** — `grep -rn "\-\-lit\b"` returns only this component's own 6 sites, and the installed glass-ui dist has no `--lit`. Hygiene, not a live bug; filed so the token-namespace lane (lane-frontend §10 item 7) has the row.

### D-14 · Redundant wrapper + redundant gesture policy at the parent seam — INFO

`CubeTarget.vue:2-6` and `CubeScene.vue:9-14` are the same div: identical class string modulo a leading `relative`, identical inline `touch-action: none; overscroll-behavior: contain`, and **both** carry `@wheel.prevent` — while OrbitalDrag independently registers its own non-passive wheel listener (`OrbitalDrag.vue:267-274`). Three wheel policies stacked on one subtree, two of them byte-identical. Also `<span class="contents" v-if="showLoader">` (`:28-31`) wraps a single absolutely-positioned child for nothing; the `v-if` belongs on `<Loader2>`.

---

## 4. SUPERLATIVES (L-18, stated with falsifiers)

### S-1 · The R1 parser-crash class is **not reachable** from this component — and that is by construction, not luck

The CONSUMPTION axis's sharpest question for any kf demo component is whether it drags value.js's parser onto a user-facing path (lane-library §4.6 lists `demo/scenes/square/useSquareTumble.ts:22 parseCssColor(css)` as "the known R1 crash surface"). CubeTarget's answer is clean on **both** halves:

1. **Colour never enters value.js.** The six crayon hues are CSS custom properties resolved by the UA at paint — `cubeSides[i].color = "var(--face-N)"` (`:136-143`) bound to `backgroundColor` (`:59-61`), defined at `styles/style.css:148-153`. No `parseCssColor`, no `serializeCssColor`, no colour string crosses the boundary.
2. **The only authored values that reach the parser are unit scalars.** `fromKeyframes` flattens the nested object to dotted paths and parses each leaf via `parseCssValues` (`compile/value-ast.ts:88-109`, `:66-72` — the A3 seam, whose failure posture is a bare `throw new TypeError` per lane-library §7.5). The leaves here are `"0deg"` and `` `${endX}deg` `` where `endX/endY` are computed numbers (`:195-196`) — no user text, no interpolated identifier, no colour.
3. **The one direct value.js edge is the grammar-free subpath.** `useCubeRelit.ts:4` imports `clamp` from `@mkbabb/value.js/math`, which `internal/leaves.ts:6-19` certifies as "0 CSS-grammar / 0 parse-that / 0 engine modules … VERIFIED by the `proof:boundary` W97 `math-subpath-clean` clause". This is also the *only* available path: `clamp` is **not** re-exported from the kf barrel (`src/animation/index.ts` mentions the leaf only in a comment at `:9`), so the direct value.js import is correct, not a reach-around.

> **Falsifier** — any colour string, user-supplied text, or `var()` identifier from this subtree reaching `parseCssValues`/`parseCssColor`/`parseTimingFunction`. Note the one *near*-miss that survives inspection: `timingFunction: "ease-out-back"` (`:210`) does route through `parseTimingFunction` (`easing-registry.ts:131`), which **rejects** it (value.js's CSS keyword set is `ease|ease-in|ease-out|ease-in-out`), after which the registry lookup succeeds because `ease-out-back` is a value.js `bezierPresets` name folded into `registryNames` (`easing-registry.ts:31-34`). Correct by the declared type (`TimingFunctionNames ⊇ BezierPresetName`, `constants/types.ts:25-26`) and correct at runtime — but it is the single line in this file where a name change upstream would surface as a `TypeError`.

### S-2 · Textbook LIGHT/HEAVY boundary discipline

```ts
// CubeTarget.vue:109-110
import type { CSSKeyframesAnimation } from "@mkbabb/keyframes.js";   // erased
import { loadAnimationEngine } from "@mkbabb/keyframes.js";          // the dynamic accessor
…
const { CSSKeyframesAnimation } = await loadAnimationEngine();       // :198 — the class, at point of need
```

This is exactly the published contract: the barrel re-exports the class **as a type only** (`src/animation/index.ts:283`) and ships the runtime behind `loadAnimationEngine` (`:308`, `load-engine.ts:113-124`), which is the same module the `./engine` subpath resolves to. No deep `@src/animation/*` import, no static heavy symbol, no second engine instance. It is also the sanctioned per-site idiom, not a deviation from the scene's synchronous `kfEngine()` — `demo/kf-engine.ts:12-13` states plainly that "Most demo sites await `loadAnimationEngine()` directly at their point of need (a click handler, an onMounted, a composable init)", and 5 other demo sites do so.

> **Falsifier** — a static import of a heavy symbol, or a deep source path, in this file or its colocated units. `grep -n "@src/\|/engine\"" CubeTarget.vue useCubeRelit.ts CubeAxisLines.vue` → none.

### S-3 · The dynamic-import race is handled the way the house does it

`:199-202` re-checks `cubeEl.value` **after** the await and bails without leaking the flag; `onScopeDispose` (`:234-236`) stops the animation. That matches the house precedent verbatim (`components/instrument/shell/TypingDots.vue:68-75` — "down while `loadAnimationEngine()` was in flight, do not play/leak any anim"). Vue nulls template refs on unmount, so the guard is real. Most gesture-triggered lazy-engine sites get this wrong; this one does not.

> **Falsifier** — show `cubeEl.value` remaining non-null after unmount (it does not; `useTemplateRef` clears it), which would make the guard cosmetic. (Note the flag *is* still leaked on the rejection path — see D-8; the unmount path is the one handled.)

### S-4 · The `--lit` quantisation is measured consumption discipline, not decoration

`useCubeRelit.ts:73-83` rounds each face's `--lit` to `toFixed(2)` with a written rationale: the former `toFixed(3)` produced a distinct string on nearly every rotation tick, so a fine orbit drag fired six `color-mix` + two-gradient repaints per `pointermove`; the coarser string collapses those into a no-op `setProperty`. That is a real repaint-elision on the exact seam a naive implementation burns, and it is documented with its perceptual justification (1 % luminance step). Paired with the `@property --lit` registration + `transition: --lit 160ms linear` (`CubeTarget.css:6-10, 79`), the coarse ticks are re-smoothed by the UA rather than by JS — no second rAF, honouring the stated `inv ζ`.

> **Falsifier** — a measurement showing `toFixed(2)` still invalidates per tick (i.e. that setting a custom property to an identical string does invalidate), which would make the optimisation prose without effect.

---

## 5. Corpus reconciliation

| corpus id | this challenge |
|---|---|
| lane-frontend **F-1** (glass-ui phantom dep) | **Not contradicted, and not this component's problem** — CubeTarget imports zero glass-ui, so it is one of the 21 `.vue` files unaffected by F-1's `npm ci` breakage. Any fix under **D-9** would newly bind it to the undeclared dependency, so D-9 must land *after* F-1. |
| lane-frontend **§4** roster row (`239 | scenes/cube/CubeTarget.vue | b | cube subject plane`) | **Confirmed** — line count, path, and the `b` (no glass-ui import) classification all verified against the tree. |
| lane-frontend **S-6** (App.skeleton shimmer plate) | **Extended** by D-9 — the demo has a *third* bespoke loading idiom, and glass-ui's `Progress` carries a verified `indeterminate` flag. Propose this as **S-9** in the shadow census. |
| lane-frontend **S-8** (TypingDots = justified bespoke, dogfoods the engine) | **Same defence applies** to the Roll egg's *existence* — it is genuine `CSSKeyframesAnimation` coverage in a demo whose purpose is dogfooding. D-1/D-2/D-3 challenge its *options and seams*, never its right to exist. |
| lane-frontend **§6.3** (98 unprefixed tokens, zero `--kf-*`) | **Instantiated** by D-13 (`--lit`, `inherits: true`, registered document-globally from a scoped file). |
| lane-frontend **§6.5** (13 PRM sites; the cube scene owns `useCubeDemo.ts:164`) | **Sharpened** by D-1 — the scene's single largest motion sits outside the contract its own sibling enforces. |
| lane-library **§4.1 A3** (`compile/value-ast.ts:71` `parseCssValues`, throws `TypeError`) | **Reached** by this component, with unit-scalar leaves only (S-1). |
| lane-library **§4.6** (R1 blast radius: `useSquareTumble.ts:22 parseCssColor`) | **Contrasted** — CubeTarget is the same *class* of scene subject and does **not** appear on that list; S-1 explains why, and the explanation is structural (colour rides `var()`, never a parsed string). |
| lane-library **LEG-3** (math leaves re-exported from `@mkbabb/value.js/math`) | **Corroborated** — the demo has no kf-barrel alternative for `clamp` (20 demo sites import it from value.js directly), so `useCubeRelit.ts:4` is correct consumption, not a boundary breach. |
| lane-library **§7.5** (three failure postures on the parse seam) | **Relevant** — the Roll's parse path throws (A3 posture), and `onRoll` is invoked as `void onRoll()` (`:230`) with no `.catch`, so any future non-literal authored value would surface as an unhandled rejection *and* strand `rolling` (D-8). |

---

## 6. Wave order (if these are taken up)

1. **D-1** — one option (`respectReducedMotion: true`). Zero risk, closes the a11y contract breach.
2. **D-3** — move the roll's gesture lock to the element that owns the listener, or drop the inert rule and its comment.
3. **D-2** — author `from` off the landed pose (or route the roll through the group's layer stack so `composite` is explicit).
4. **D-8** — `try { … } finally { rolling.value = false }` + clear the timer on dispose; kill the 1200/1100 magic pair.
5. **D-6 / D-7** — one mechanism for the latch, carrying the full payload; retire the dead slot prop.
6. **D-4** — decide whether the re-lit die tracks engine frames (a real feature) or is documented as drag-only (a real retreat). Do not leave it silently half-lit.
7. **D-5, D-10, D-9** — the loader trio; **D-9 blocks on F-1**.
8. **D-11 / D-12 / D-13 / D-14** — hygiene, foldable into any of the above.

---

## Provenance

Every keyframes.js path is read-only evidence from `/Users/mkbabb/Programming/keyframes.js` at the working-tree state of 2026-08-04 (census HEAD `8281638c`, per lane-frontend §0). glass-ui claims are sourced from the **installed** copy at `keyframes.js/node_modules/@mkbabb/glass-ui/dist` (7.0.0) — no upgrade required for D-9. No file in keyframes.js or glass-ui was written, mutated, or executed; no installs, no dev servers, no browser tooling. The single write of this lane is this file.
