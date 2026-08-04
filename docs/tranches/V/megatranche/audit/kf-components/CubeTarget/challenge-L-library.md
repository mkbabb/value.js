claude-opus-5[1m]

# CHALLENGE · `CubeTarget.vue` · axis **L (LIBRARY)**

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/scenes/cube/CubeTarget.vue` (239 L) + `./CubeTarget.css` (154 L, sourced into the scoped style block)
**Mode** static, read-only, source-derived. No installs, no dev server, no browser tooling (lane law). Nothing below is a screenshot claim; the two rows that *could* be settled visually are marked **UNPROVEN-NEEDS-LIVE** for SS-13.
**Posture** the component is assumed DEFECTIVE until the tree proves otherwise — but **a false defect is worse than a missed one**, so every row below carries its own falsifier and I killed four drafted findings that failed theirs (see §7 *Claims I withdrew*).

**Read whole (import closure, all read-only):**

| file | why |
|---|---|
| `demo/scenes/cube/CubeTarget.vue` | the target |
| `demo/scenes/cube/CubeTarget.css` | the sourced scoped stylesheet |
| `demo/scenes/cube/useCubeRelit.ts` | imported composable |
| `demo/scenes/cube/CubeAxisLines.vue` | imported sub-unit |
| `demo/scenes/cube/orbital-drag/OrbitalDrag.vue` · `index.ts` · `types.ts` · `quaternionEuler.ts` · `composables/useOrbitalPointer.ts` | imported component + its type/latch contract |
| `demo/composables/useDoubleTap.ts` | imported composable (`@composables` alias, `vite.config.ts:53`) |
| `src/animation/load-engine.ts`, `engine/css/css-animation.ts`, `engine/animation.ts`, `engine/interpolate.ts`, `engine/options.ts`, `compile/value-ast.ts`, `compile/easing/easing-option.ts`, `compile/easing/easing-registry.ts`, `easing.ts` | the `@mkbabb/keyframes.js` surface it consumes |
| *(collaborators, for the contended-writer proof)* `CubeScene.vue`, `useCubeDemo.ts`, `matrix-editor/useTransformState.ts`, `cubeTransformStore.ts`, `demo/kf-engine.ts` | they bind the SAME element |

**Score** 20 defects · **3 BLOCKER** · 5 MAJOR · 9 MINOR · 3 INFO · **6 superlatives**

**Headline** — the component's signature feature, *"the Roll"* (H.W12.S6 / S.G3 S2), is **dead twice over**: its trigger can never fire, and its animation can never paint. Neither failure is visible to any gate, because both fail *silently* — one by Pointer-Events retargeting, one by a CSSOM no-op. Separately, the die's 3D-ness is held up entirely by a class from an **undeclared package**.

---

## 1. BLOCKERS

### B-1 · The Roll's TRIGGER is unreachable — an ancestor holds pointer capture, so `.cube` never sees `pointerup`

**Severity BLOCKER** · `demo/scenes/cube/CubeTarget.vue:227-232` × `demo/composables/useDoubleTap.ts:70-83` × `demo/scenes/cube/orbital-drag/composables/useOrbitalPointer.ts:218-233`

CubeTarget recognises the double-tap on the `.cube` element:

```ts
// CubeTarget.vue:227
useDoubleTap({ el: cubeEl, onDoubleTap: () => { void onRoll(); } });
```

`useDoubleTap` is `pointerdown` / `pointermove` / `pointerup` **on `el`** (`useDoubleTap.ts:59, 65, 70`), and it only advances the tap chain inside the `pointerup` handler (`lastTapAt`, line 77-82).

`.cube` is a **descendant** of OrbitalDrag's container (`OrbitalDrag.vue:2` `<div ref="containerRef">` → slot → `CubeTarget.vue:17` `.idle-hover` → `CubeTarget.vue:24` `.cube`). And OrbitalDrag captures the pointer to the **container** on *every* pointerdown, unconditionally:

```ts
// useOrbitalPointer.ts:218-222
const onPointerDown = (event: PointerEvent) => {
    event.preventDefault();
    startDrag(event);
    containerRef.value!.setPointerCapture(event.pointerId);   // ← the container, not .cube
```

Per Pointer Events (*Process Pending Pointer Capture* + *Firing events using the PointerEvent interface*), once the capture override is set, every subsequent event for that `pointerId` is **dispatched with the capture element as `target`**, and the propagation path is capture-element → ancestors. `.cube` is a *child* of the capture element and is therefore **not on the path**. `useDoubleTap`'s `pointerup` listener never runs; `lastTapAt` stays `0` forever; `onDoubleTap` is never called.

Ordering detail that makes this airtight: the `.cube` `pointerdown` (bubble) *does* fire — it precedes the container's bubble handler — so `downX/downY/moved` are seated. The capture is then installed and **the very next** `pointermove`/`pointerup` is retargeted. `releaseCapture` (`useOrbitalPointer.ts:188-192`) is called from the **document-level** `pointerup` handler — i.e. after that pointerup has already been dispatched down a path that excluded `.cube`.

**Why the sibling eggs are fine (the asymmetry, not a blanket claim):** `useDragScrub` captures on **`el` itself** (`demo/composables/useDragScrub.ts:120`) — the same element `useDoubleTap` listens on — so it *is* the capture target and its own listeners still fire. That is why SquareScene's tumble (`SquareScene.vue:287-292`, `el: box`) and SpringTarget's derby (`SpringTarget.vue:247-252`, `el: railEl`) work while the cube's does not. The cube is the **only** `useDoubleTap` site whose capture lives on an ancestor.

**Failure scenario.** Load the cube scene (or the home screen). Double-tap / double-click M. Cubert with mouse, pen, or touch. `pointerdown` fires on `.cube`; capture moves to the OrbitalDrag container; `pointerup` is dispatched to the container and its ancestors only; `useDoubleTap`'s handler is never invoked; `onRoll()` is never called; the die does not roll. Every input modality, every browser. The documented affordance (`CubeTarget.vue:165-173`, `useDoubleTap.ts:11-24`) is unreachable 100 % of the time.

**Falsifier.** Any of: (a) a real browser dispatches `pointerup` to a descendant of an element that holds pointer capture — instrument `cubeEl.addEventListener('pointerup', …)` and observe a hit; (b) `setPointerCapture` at `useOrbitalPointer.ts:222` throws or is removed, leaving no capture; (c) a passing gate that actuates the roll via two genuine down/up pairs and asserts the tumble. `grep -rn "useDoubleTap" scripts/ test/` → **no test, no gate touches it** — so nothing currently contradicts this.

---

### B-2 · The Roll's EFFECT is a no-op — a nested `transform` object with the DEFAULT DOM renderer flattens to invalid CSS property names, silently dropped by CSSOM

**Severity BLOCKER** · `demo/scenes/cube/CubeTarget.vue:205-218` (frames at `:213-214`)

```ts
// CubeTarget.vue:211-216 — NOTE: no second argument.
).fromKeyframes(
    {
        from: { transform: { rotateX: "0deg",     rotateY: "0deg" } },
        to:   { transform: { rotateX: `${endX}deg`, rotateY: `${endY}deg` } },
    },
);
```

Trace the engine, verbatim:

1. `CSSKeyframesAnimation` constructor sets `this.unflatten = false` (`src/animation/engine/css/css-animation.ts:62`), and `fromKeyframes` → `resolveTransform(undefined)` **keeps** `unflatten = false` and installs the instance's default DOM renderer (`css-animation.ts:110-115`, `engine/animation.ts:155-156`).
2. `parse()` flattens each frame with `parseAndFlattenObject` (`compile/frame-compiler.ts:367-369`), whose recursive `visit` joins nested keys **with a dot** (`compile/value-ast.ts:88-108`, the join at `:101`). The two frames therefore compile to keys **`"transform.rotateX"`** and **`"transform.rotateY"`**.
3. Those dotted keys become `flatVars` verbatim (`buildAuthoredSink`, `value-ast.ts:316-351`, `flat[key] = rendered` at `:345`).
4. Because `unflatten === false`, the render path calls the renderer with the **flat** map (`engine/interpolate.ts:301-306`):
   ```ts
   if (anim.unflatten) frame.transform(frame.vars, t);
   else                frame.transform(frame.flatVars as V, t);
   ```
5. The default renderer is `transformTargetsStyle` (`value-ast.ts:386-400`):
   ```ts
   target.style.setProperty(property, String(value));   // property === "transform.rotateX"
   ```

`CSSStyleDeclaration.setProperty()` with a name that is *not* a custom property (no `--` prefix) and *not* a supported CSS property **terminates the algorithm** (CSSOM §setProperty step 3). No throw, no warning, no paint. For 1100 ms the engine runs a real rAF loop writing `transform.rotateX` / `transform.rotateY` into a declaration block that discards them. `el.style.transform` is never touched.

**This is the house idiom, and CubeTarget is the one site that breaks it.** Every other nested-object consumer passes an explicit renderer as `fromKeyframes`'s second argument, precisely because nested data requires one:

* `demo/scenes/square/useSquareDemo.ts:347-371` — `transform: { x, y, rotate, a:{b:{c:{d}}} }`, second arg **`transformFunc`**.
* `demo/scenes/amiga/useAmigaDemo.ts:97-113, 114-131` — `{ rotation: { y } }`, `{ position: { x } }`, second arg **`transform`**.
* And the *sibling in the same folder* — `demo/scenes/cube/useCubeDemo.ts:82-97` — uses the **`CssValue` AST** form (`transformList(transformCall("rotateX", …))`) so the flat key really is `"transform"`, a supported CSS property. The engine's own regression test for this exact scene does the same (`test/engine/iw0-cube-composite.test.ts:53-60`, `rotationValue(...)`).

CubeTarget is the sole call site that hands a nested plain object to the default renderer.

**Failure scenario.** Suppose B-1 were fixed and the double-tap fired. `onRoll` awaits the engine, constructs the animation, `setTargets(.cube)`, `play()`. `.cube`'s computed `transform` stays exactly what it was; `rolling` is held true for 1200 ms (so `.cube` is `pointer-events: none` and undraggable for 1.2 s — `CubeTarget.css:22-24`); the die does not move by one degree; and the `ROLL_FACES` / `endX` / `endY` arithmetic at `:180-196` is dead weight.

**Falsifier.** `el.style.transform` (or `getComputedStyle(el).transform`) takes any non-`none` value while `rollAnim` is playing. Equivalently: a `transform.*` special case anywhere in `transformTargetsStyle` re-composing a `transform` shorthand (there is none — `value-ast.ts:386-400` is nine lines, quoted in full above), or a `Vars` type that rejects the nested literal (it does not: `Vars<T = any> = { [arg: string]: number | string | T }`, `src/animation/constants/types.ts:39-41` — with `T = any` the misuse typechecks *perfectly*, which is why `npm run check` is green).

---

### B-3 · The die's 3D-ness depends on `.preserve-3d`, a class that ships **only** inside the undeclared `@mkbabb/glass-ui` — `npm ci` flattens the cube

**Severity BLOCKER (exposure)** · `demo/scenes/cube/CubeTarget.vue:9, 12, 19, 25` — **folds census `lane-frontend.md` F-1**, and localises it to this component.

Four elements in this component carry `preserve-3d`:

```
CubeTarget.vue:9   class="graph preserve-3d grid …"
CubeTarget.vue:12  <OrbitalDrag class="preserve-3d relative flex …">
CubeTarget.vue:19  'idle-hover preserve-3d'
CubeTarget.vue:25  class="cube preserve-3d animation relative flex …"
```

`preserve-3d` is **not** a Tailwind v4 utility (v4 spells it `transform-3d`), and it is **not** defined anywhere under `demo/`. Its sole definition in the whole loaded cascade is:

```
node_modules/@mkbabb/glass-ui/dist/styles/utilities/base-misc.css:1
    @layer components { … .preserve-3d { transform-style: preserve-3d; } … }
```

reached via `demo/styles/style.css:3` `@import "@mkbabb/glass-ui/styles"`.

Per census **F-1** (`lane-frontend.md:15, 54-80`), `@mkbabb/glass-ui` is absent from **both** `package.json` and `package-lock.json` while 7.0.0 sits installed in `node_modules` — I re-verified against this tree: `grep -c glass-ui package-lock.json` → `0`; the only `@mkbabb` dependency declared is `"@mkbabb/value.js": "4.0.0"`. So on a clean `npm ci` the class does not exist, `transform-style` stays `flat`, and the six absolutely-positioned faces **collapse onto one plane**.

The severity is not speculative — **this component's own stylesheet documents that exact collapse as a shipped catastrophe**:

> `CubeTarget.css:148-154` — *"`filter` is a CSS grouping property → it forced `.cube`'s USED `transform-style` to `flat`, collapsing the six 3D faces onto one plane (only face 1 survived — verdict #1)."*

A component that carries a scar-tissue comment about `transform-style: flat` being verdict #1 is depending on an **unlocked, undeclared** package to supply `transform-style: preserve-3d`.

**Failure scenario.** Fresh clone → `npm ci` → `npm run dev` (or `vite build --mode gh-pages`). If the build survives the 42 bare `@mkbabb/glass-ui` module imports at all, the cube scene and the home hero render a single flat coloured square where the die should be — the scene's entire subject, silently.

**Falsifier.** A `.preserve-3d` rule in a non-glass-ui sheet the demo loads (I grepped `demo/**`, `assets/`, and the Tailwind dist — none), or a `@mkbabb/glass-ui` entry appearing in `package-lock.json`.

**Graded tail (same root, partial degradation) — see M-5.**

---

## 2. MAJOR

### M-1 · The "pinned key light" is **below** the die — the Y component's sign contradicts the frame the face normals are written in

**Severity MAJOR** · `demo/scenes/cube/useCubeRelit.ts:20-25` vs `:29-38` vs `CubeTarget.css:86-103`

```ts
// useCubeRelit.ts:20-25 — "The pinned key light (up-and-right-and-toward-viewer)"
const KEY_LIGHT = (() => { const v = [0.45, 0.6, 0.66]; … })();
//                                        ^^^ +Y
// useCubeRelit.ts:35
[0, -1, 0], // top   — −Y
```

The two comments are in the **same file** and disagree. `FACE_NORMALS` is written in the **CSS frame, where +Y points DOWN the screen** — which I verified is correct by deriving all six normals from `CubeTarget.css:86-103`:

| face | CSS rule (`CubeTarget.css`) | rest normal `(0,0,1)` after the rotate | `FACE_NORMALS[i]` | ✔ |
|---|---|---|---|---|
| front `[0]` | `:87` `rotateY(0deg)` | `(0,0,1)` | `[0,0,1]` | ✔ |
| right `[1]` | `:101` `rotateY(90deg)` | `(1,0,0)` | `[1,0,0]` | ✔ |
| back `[2]` | `:90` `rotateY(180deg)` | `(0,0,-1)` | `[0,0,-1]` | ✔ |
| left `[3]` | `:98` `rotateY(-90deg)` | `(-1,0,0)` | `[-1,0,0]` | ✔ |
| top `[4]` | `:93` `rotateX(90deg)` | `(0,-1,0)` | `[0,-1,0]` | ✔ |
| bottom `[5]` | `:96` `rotateX(-90deg)` | `(0,1,0)` | `[0,1,0]` | ✔ |

So −Y **is** up-the-screen in this frame, and `KEY_LIGHT`'s `+0.6` on Y makes the light shine **upward from beneath**. X (`+0.45` → screen-right, matching `.right` = `[1,0,0]`) and Z (`+0.66` → toward the viewer) are correct; only Y is flipped.

**Failure scenario (arithmetic, not opinion).** `|KEY_LIGHT| = hypot(0.45,0.6,0.66) = 0.99905`, so normalized `≈ [0.4504, 0.6006, 0.6606]`. At the rest pose (`rotate = {0,0,0}`), `litFor` reduces to a bare dot product:

* **top** `[0,-1,0] · KEY_LIGHT = -0.6006` → `--lit = 0.5 + 0.5·(-0.6006) = ` **`0.20`**
* **bottom** `[0,1,0] · KEY_LIGHT = +0.6006` → `--lit = ` **`0.80`**

Feed those to `CubeTarget.css:126-141`: the top face gets the weakest specular (`0.05 + 0.5·0.20 = 0.15` alpha) and the **deepest** `--background` shadow veil (`(1-0.20)·46%…62%`), while the bottom face gets the strongest highlight and almost no veil. The die is lit from underneath — the "uplighting" convention that reads as uncanny in any lighting language. Every subsequent orientation inherits the flip.

**Falsifier.** (a) Show the demo's 3D frame is Y-up, i.e. that `FACE_NORMALS[4] = [0,-1,0]` labelled `top` is *itself* wrong — but then the label, the CSS derivation table above, and the `.top`/`.bottom` rules would all have to be wrong together. (b) **UNPROVEN-NEEDS-LIVE (SS-13):** capture the die at rest under the `rotate3d(-1,1,0,30deg)` graph attitude (`useCubeDemo.ts:144-151`) — if the top face is *brighter* than the bottom, this row dies. One-character fix if it stands (`0.6` → `-0.6`).

### M-2 · The roll's terminal orientation is never committed to the transform model — the next paint obliterates it, and roll #2 snaps

**Severity MAJOR** · `CubeTarget.vue:205-221` × `matrix-editor/useTransformState.ts:196-215` × `CubeTarget.vue:219-221` (the comment that is false)

The code asserts:

> `CubeTarget.vue:219-221` — *"the `fillMode:forwards` leaves the die resting on its rolled face (the next drag/animation **re-bases as usual**)."*

It does not re-base. The roll writes only to the element's inline style; it never touches `transform` (the v-model), `matrix3dEnd`, or the quaternion. Two consequences:

1. **Obliteration.** `useTransformState`'s deep watch (`useTransformState.ts:197-215`) fires on any model change and, while the group hasn't started, repaints the target with `transformTargetsStyle({ transform: matrix3dEnd.value }, [targetRef.value])` — and `targetRef` **is this same `.cube`** (`CubeScene.vue:205-210` seats `cubeElRef` from `cubeTargetRef.value?.cubeEl`). The first post-roll drag tick therefore replaces the rolled pose with `matrix3d(…)` derived from a model that never heard about the roll — an instant snap out of the rolled face.
2. **Snap-back on re-roll.** Both frames are absolute (`from: rotateX 0deg / rotateY 0deg`, `:213`), so roll *n+1* begins at identity. Landing faces are `{0,0}, {0,-90}, {0,180}, {0,90}, {-90,0}, {90,0}` (`:180-187`), i.e. `endX mod 360 ∈ {0,±90}`. So in **5 of 6 cases** roll #2 opens with a 90°/180° jump-cut.

**Failure scenario.** Roll → land on face 5 (`x:-90`). Drag once: the die snaps to the model's matrix. Or roll again: frame 0 puts it at `rotateX(0)`, a 90° jump-cut, then the 1.1 s tumble. Either way the "resting on its rolled face" contract is violated.

**Falsifier.** Show the engine's `fillMode: "forwards"` writes back into the v-model (it does not — `transformTargetsStyle`, `value-ast.ts:386-400`, only calls `style.setProperty`), or that `useTransformState`'s watcher is inert on the cube's target (it is not — `targetRef` is wired at `CubeScene.vue:209`). *(Currently masked by B-1/B-2 — a latent defect that surfaces the moment either is fixed.)*

### M-3 · Three uncoordinated writers own `.cube`'s `transform` — last-write-wins, no arbitration

**Severity MAJOR** · `CubeTarget.vue:217` × `useCubeDemo.ts:154-158` × `useTransformState.ts:207-211`

The **same** `.cube` element is bound as an animation/paint target by three independent owners:

| writer | site | cadence |
|---|---|---|
| `rollAnim` (this component) | `CubeTarget.vue:217` `rollAnim.setTargets(cubeEl.value)` | engine rAF, 1100 ms |
| `rotationAnim` + `matrixAnim` + `hoverAnim` (the scene's `AnimationGroup`) | `useCubeDemo.ts:155-157` — all three `setTargets(cubeEl)` | group rAF while playing |
| `transformTargetsStyle` (the matrix/slider painter) | `useTransformState.ts:207-211, 121-125` | rAF-debounced on model change |

Nothing coordinates them. `rolling` (`CubeTarget.vue:174`) only suppresses *re-rolls*; it does not pause the group, and `.cube--rolling { pointer-events: none }` (`CubeTarget.css:22-24`) only stops *pointer* input.

The component's own comment claims composition safety — *"It targets the `.cube` (NOT the OrbitalDrag quaternion container), so the spin COMPOSES with whatever orbit the user set"* (`CubeTarget.vue:168-170`). That is true of the **orbit** (which lives on the OrbitalDrag *container*, a different element — `OrbitalDrag.vue:63-76`) and **false** of the group, which lives on the very element the roll claims for itself.

**Failure scenario.** Press play (group rAF drives `.cube.style.transform` every frame), then roll. Each frame the group's write lands after or before the roll's, at unspecified interleave — the tumble is stomped frame-by-frame and reads as jitter or as nothing at all.

**Falsifier.** Show `useCubeDemo.setTargets` receives an element other than `CubeTarget`'s `cubeEl` — it does not; `CubeScene.vue:205-210` reads `cubeTargetRef.value?.cubeEl`, which is exactly the ref `CubeTarget.vue:129` exposes. Or show the engine composites rather than replaces on a shared target (`animation-composition` is per-animation and unset here; the compositor at `src/animation/group/compositor.ts` composites *within* a group, not across independent animations).

### M-4 · Engine seam: the default DOM renderer swallows both object values and unsupported property names — a silent no-op in a library whose stated posture is fail-explicit

**Severity MAJOR (library-side, the enabler for B-2)** · `src/animation/compile/value-ast.ts:390-398`

```ts
for (const [property, value] of Object.entries(vars)) {
    if (value === undefined) { target.style.removeProperty(property); continue; }
    if (value !== null && typeof value === "object") continue;      // ← silent skip
    target.style.setProperty(property, String(value));              // ← silent no-op on a bad name
}
```

Both arms discard consumer input without a diagnostic. Contrast the engine's own doctrine, one file over:

> `src/animation/engine/options.ts:1-8` — *"present-but-malformed input THROWS a typed `AnimationOptionError` … the same posture the layer API chose (**"silent no-ops were hiding consumer bugs"**) applied to the whole options surface."*
>
> `src/animation/compile/easing/easing-option.ts:19-22` — *"Fail-explicit: unresolvable input throws; there is **no silent fallback**."*

And the machinery to notice already exists: `KeyframesAnimation` carries a structured `diagnostics` channel (`css-animation.ts:181-186`, `COMPOSITION_FALLBACK` rows) that costs nothing to extend. A single `CSS.supports(property, '…')` / dotted-key check here would have surfaced B-2 at the first `play()` — as a queryable row, not a console log.

**Failure scenario.** Any consumer who writes `{ transform: { rotateX } }` without a custom renderer — the most natural-looking shape in the whole API, and the shape the *demo itself* reaches for — gets a running animation that paints nothing, with zero feedback from a library that throws on a mistyped `fillMode`.

**Falsifier.** A diagnostic row, warning, or throw emitted on a dropped property anywhere in the apply path. `grep -n "diagnostics" src/animation/compile/value-ast.ts` → none.

### M-5 · Four more glass-ui-sourced tokens/utilities with **no local fallback**, each degrading a distinct visual channel of this component

**Severity MAJOR** · same root as **B-3** (census F-1), graded down because degradation is partial rather than total.

| used at | resolves from | what dies without glass-ui |
|---|---|---|
| `CubeTarget.css:138-139` `color-mix(in srgb, var(--background) …)` | `glass-ui/dist/styles/tokens/color-radius.css` | invalid `color-mix` → the **whole `background` shorthand** on `.face-relit` is invalid-at-computed-value → **both** the specular sweep and the shadow veil vanish; the re-lit egg (L.W11.S2) is gone entirely |
| `CubeTarget.css:145` `z-index: var(--z-content)` | `glass-ui/…/tokens/scheme-motion.css:1` (`--z-content: 10`) | invalid → `z-index: auto`; the numeral loses its guaranteed rung over `.face-relit` |
| `CubeTarget.vue:43` `duration-panel` | glass-ui `@theme` bridge `--transition-duration-panel` (`theme/bridges.css:1`) | unknown utility → `transition-duration: 0s`; `transition-[background-color,opacity]` becomes a hard cut. **Sole use in the entire demo** (`grep -rn duration-panel demo/` → 1 hit) |
| `CubeTarget.vue:73` `text-display-2` | glass-ui `@theme` bridge `--text-display-2` (`theme/bridges.css:1`) | unknown utility → the die's numerals fall to inherited body size |

Note the contrast that makes this a *contract* problem and not just a dependency problem: the component's genuinely demo-owned tokens are all declared locally and audited — `--face-1…6` (`demo/styles/style.css:148-153`), `--target-viewport-h/w` (`layout.css:21-22`), `--z-behind` (`layout.css:25`), and `--lit` is even `@property`-registered in the component's own sheet (`CubeTarget.css:6-10`). The glass-ui-sourced four are the only ones with no home and no fallback.

**Falsifier.** Any of the four resolving from a non-glass-ui sheet the demo loads, or `@mkbabb/glass-ui` appearing in `package-lock.json`.

---

## 3. MINOR

| id | severity | finding | provenance | falsifier |
|---|---|---|---|---|
| m-1 | MINOR | **Dead class `animation`** on `.cube`. No `.animation` rule exists in `demo/**`, in `glass-ui/dist/styles/**`, or as a Tailwind v4 utility (v4 spells animations `animate-*`). Pure noise on the most-read line of the template. | `CubeTarget.vue:25` | Produce a `.animation { … }` rule in the loaded cascade. |
| m-2 | MINOR | **Uncleared timer.** `setTimeout(… , 1200)` is never captured and never cleared — not on re-roll, not in `onScopeDispose` (which stops `rollAnim` but not the timer, `:234-236`). A component unmounted mid-roll leaves a live timer writing to a dead ref; and if `onRoll` ever throws before the timer is armed (e.g. a future off-registry `timingFunction` — `options.ts:136-148` throws on off-enum input), `rolling` latches **true forever** and `.cube` stays `pointer-events:none` for the session. | `CubeTarget.vue:221`, `:234-236` | Show Vue clears pending timers on scope dispose (it does not), or that no throw path exists between `:191` and `:221` (there is one: the constructor at `:205`). |
| m-3 | MINOR | **Duplicated wrapper.** `CubeTarget.vue:2-6` is byte-equivalent to `CubeScene.vue:9-14` — same `grid h-full w-full max-w-full items-center justify-center justify-items-center overflow-visible`, same `style="touch-action: none; overscroll-behavior: contain"`, same `@wheel.prevent` — and the two are parent/child. One redundant DOM node and a duplicate non-passive wheel listener, on top of OrbitalDrag's own `wheel` handler (`OrbitalDrag.vue:267-274`). Three `preventDefault`s for one wheel event. | `CubeTarget.vue:2-6` × `CubeScene.vue:9-14` | Show the inner grid contributes a layout the outer does not (it does not: identical class strings). |
| m-4 | MINOR | **Over-broad model contract.** `defineModel<TransformState>` drags `matrix: mat4` (`orbital-drag/index.ts:24`) — a `Float32Array` this component never reads. Because the store wraps the state in a deep `ref` (`cubeTransformStore.ts:13-20`), `transform.value.matrix` is a reactive **Proxy over a typed array**: every gl-matrix write traps 16×. CubeTarget needs only `{rotate, translate, scale}` (`useCubeRelit.ts:83` reads `.rotate` alone). | `CubeTarget.vue:124`, `useCubeRelit.ts:69` | Show CubeTarget or `useCubeRelit` reads `.matrix` (neither does). |
| m-5 | MINOR | **No-op wrapper element.** `<span class="contents" v-if="showLoader">` wraps a single child; `display: contents` + `v-if` on the child alone is identical and one node cheaper. | `CubeTarget.vue:28-35` | Show a second child is planned/needed. |
| m-6 | MINOR | **Inconsistent static-data declaration.** `cubeSides` (`:136-143`) is an untyped array re-allocated per instance; `ROLL_FACES` (`:180-187`) is `ReadonlyArray<{x:number;y:number}>`, also per-instance. Both are compile-time constants and belong at module scope with one typing convention. | `CubeTarget.vue:136-143, 180-187` | Show either varies per instance (neither does). |
| m-7 | MINOR | **Prop-access style split in one template.** `props.isPlaying \|\| props.isStarted` at `:14`, bare `isPlaying` at `:20`. Both resolve; the reader cannot tell which is meant to signal what. | `CubeTarget.vue:14` vs `:20` | Show the two forms differ semantically (they do not, absent props destructure). |
| m-8 | MINOR | **Stuck axis-lock latch.** `axisLock` mirrors a latch fed only by `window` `keydown`/`keyup` (`OrbitalDrag.vue:276-277`) with no `blur`/`visibilitychange` reset. Hold **X**, ⌘-Tab away, release — `keyup` never arrives, so `axisLock.x` stays `true`: the X axis line stays bloomed at full opacity + solid stroke (`CubeAxisLines.vue:11-14`, `:53-75`) and OrbitalDrag stays single-axis-constrained until X is pressed and released again over the page. | `CubeTarget.vue:158-163` ← `OrbitalDrag.vue:276-277, 317-321` | Show a blur/visibility reset path exists (grep `useOrbitalPointer.ts` for `blur`/`visibilitychange` → none). |
| m-9 | MINOR | **Quantization elides repaints but not renders.** `faceLit` returns a **new array** every recompute (`useCubeRelit.ts:82-84`), so `hasChanged` is always true and the render effect re-runs on every rotation tick regardless — the T.A5 `toFixed(2)` only saves the *browser* repaint, not the 6-face VDOM diff + 6 `style.setProperty` calls. The comment is honest about repaints, so this is a headroom note, not a false claim: six per-face computeds (or a stable-identity return) would elide the render too. | `useCubeRelit.ts:73-84` | Show Vue skips the render when a computed returns a fresh array of equal contents (it does not — `Object.is` on the array reference). |

---

## 4. INFO

| id | finding | provenance |
|---|---|---|
| i-1 | `useDoubleTap` registers no `pointercancel`. A cancelled first tap (iOS scroll-steal, a browser gesture takeover) leaves `lastTapAt` seeded, so the *next* tap within 300 ms — potentially much later in wall-clock terms if the user paused — laundering a cancelled sequence into a "double". Shared by all three consumers, not cube-specific. | `demo/composables/useDoubleTap.ts:59-83` |
| i-2 | **Two sanctioned engine-access idioms inside one scene folder**, with no note at the divergence: `useCubeDemo.ts:50` and `useTransformState.ts:31` take the warm synchronous `kfEngine()`; `CubeTarget.vue:198` awaits `loadAnimationEngine()`. Both are correct per `demo/kf-engine.ts:12-14` (*"Most demo sites await `loadAnimationEngine()` directly at their point of need"*), and CubeTarget's choice is the better one for a rare user-triggered egg. Worth one line at `:198` so the next reader doesn't "fix" it into an inconsistency. | `CubeTarget.vue:198`, `useCubeDemo.ts:50`, `kf-engine.ts:12-14` |
| i-3 | Implicit cross-file contract: `--rotationX: 360deg` is declared in this component's stylesheet and read *only* by `useCubeDemo.ts:92` (`cssVariable("--rotationX")`) via the engine's element-aware Phase-2 resolve. Neither side references the other. It works (the scoped `.cube[data-v-…]` selector matches the element the animation is bound to), but the coupling is invisible from either end. | `CubeTarget.css:45` ↔ `useCubeDemo.ts:92` |

---

## 5. SUPERLATIVES (L-18, the other direction)

Each of these also carries its falsifier — a superlative asserted without one is just flattery.

**S-1 · `FACE_NORMALS` is index-exact against the CSS, and I proved all six.**
`useCubeRelit.ts:31-38` claims index alignment with `cubeSides` (`CubeTarget.vue:136-143`) and a `+Z` rest pose. I derived every normal independently from `CubeTarget.css:86-103` (table in **M-1**) — **6/6 exact**, including the two easy-to-flip `rotateX(±90deg)` rungs. A hand-maintained parallel array across two files in two languages with zero drift is rare. *Falsifier: any row of the M-1 table failing.*

**S-2 · One Euler convention, three sites, no drift.**
`litFor` applies Rz → Ry → Rx to a column vector (`useCubeRelit.ts:53-64`) = the matrix product **Rx·Ry·Rz**. I checked each 2×2 block against gl-matrix's `fromXRotation`/`fromYRotation`/`fromZRotation` — all three match, and they match `eulerDegreesToQuaternion` (`quaternionEuler.ts:57-63`, `qx·qy·qz`) and `useTransformState.updateTransformations` (`useTransformState.ts:143-161`, `Rx·Ry` then `·Rz`). Three independent implementations of the same convention, all consistent. *Falsifier: one sign or one factor ordering differing across the three.*

**S-3 · The T.A5 repaint quantization is real, correctly reasoned, and honestly scoped.**
`toFixed(2)` (`useCubeRelit.ts:83`) collapses fine drag ticks onto one string so Vue's `style.setProperty('--lit', …)` is a value-identical re-set the engine skips. The 24-line rationale (`:73-81`) names the exact cost it avoids (a `color-mix` + two-gradient repaint on `.face-relit`, `CubeTarget.css:126-141`) and claims **repaints** — not renders — which is precisely what it buys (see m-9). Perf comments this disciplined about their own scope are the exception. *Falsifier: showing the 1 % luminance step is perceptible, or that setProperty-to-same-value does invalidate.*

**S-4 · `rollAnim` is a bare `let`, not a `ref` — the right call, and quietly so.**
`CubeTarget.vue:175`. Every sibling that *does* park an engine object in reactive state must `markRaw()` it to escape deep proxying (`useCubeDemo.ts:65, 79, 109, 115`). CubeTarget sidesteps the hazard by construction: the animation is never rendered from, so it never enters reactivity. The disposal is matched — `onScopeDispose(() => rollAnim?.stop())` (`:234-236`). *Falsifier: a template or computed reading `rollAnim` (none does).*

**S-5 · Textbook async-teardown discipline around the `await`.**
`CubeTarget.vue:189-202`: guard first (`rolling || !cubeEl.value`), set the lock, await, then **re-read `cubeEl.value` after the await and unwind the lock if it vanished**. This is the exact re-entrancy/unmount hazard most `await`-in-a-handler code gets wrong, handled without prompting. *Falsifier: a path between `:198` and `:205` that can leave `rolling` latched — the only one is the throw covered by m-2, which is a different hole.*

**S-6 · The `z-10` disclaimer is the model for how to document an exemption at the call site.**
`CubeTarget.vue:44-48` explains, inline, that the face's `z-10` is a *local* stacking rung inside the 3D cube and explicitly **not** a participant in the editor z-contract that `demo/styles/style.css:20-40` governs (a contract that forbids raw `z-[N]` brackets). The neighbouring `.face-numeral { z-index: var(--z-content) }` (`CubeTarget.css:143-146`) and `CubeAxisLines`' `var(--z-behind)` (`CubeAxisLines.vue:65-68`) both *do* use the semantic scale — so the exemption is genuinely local and genuinely labelled. Compare `lane-frontend.md:442`, which lists `CubeAxisLines`' raw `z-index:-10` as the one acknowledged exception: **that has since been fixed** in this tree (`CubeAxisLines.vue:68` now reads `z-index: var(--z-behind)`). *Contradiction with the hitherto corpus, recorded in §6.*

---

## 6. Corpus reconciliation

| corpus row | this challenge |
|---|---|
| **F-1** (`lane-frontend.md:15, 54-80`) — glass-ui phantom dependency, RED | **CONFIRMED and localised**: **B-3** (`.preserve-3d` ×4 — total 3D collapse) + **M-5** (four more channels). F-1's blast radius on this component is larger than "42 files import it": a component with **zero** `@mkbabb/glass-ui` import statements is nonetheless structurally dependent on it through four bare class/token references. |
| `lane-frontend.md:244` — *"239 \| `cube/CubeTarget.vue` \| b \| cube subject plane"* | Line count confirmed exactly (239). Bespoke-with-no-glass-counterpart is correct; the census's `b` bucket did not (and was not scoped to) look inside. |
| `lane-frontend.md:415` — *"154 \| `scenes/cube/CubeTarget.css`"* | Confirmed (154). Module size is **within** the demo's ≤500 L discipline; the `<style scoped src="./CubeTarget.css">` carve (`CubeTarget.vue:239`, rationale at `CubeTarget.css:1-4`) is the right seam. **No Goldilocks finding** — I looked for one and there isn't one. |
| `lane-frontend.md:253` — *"90 \| `cube/CubeAxisLines.vue` \| b \| axis lines (**raw `z-index:-10`**)"* and `:442` — *"One acknowledged exception: `CubeAxisLines.vue`'s raw `z-index:-10`"* | **CONTRADICTED by the tree.** `CubeAxisLines.vue:64-68` now reads `z-index: var(--z-behind);` with the reconciliation comment. The raw value is gone; the census row is stale. (Line count also reads 90 in the census vs 90 here — that part holds.) |
| S-1…S-8 (shadow census), F-2…F-6 | **No overlap.** CubeTarget imports no glass-ui component and has no shadow-fork surface — consistent with F-6's "the glass-ui boundary is otherwise clean". Its exposure is via the **style cascade**, which the shadow census did not enumerate. |
| `lane-library.md` parse seams | **No overlap** on the parser; **B-2/M-4** are a *compile/apply* seam (`compile/value-ast.ts`), downstream of parsing. |

---

## 7. Claims I withdrew (a false defect is worse than a missed one)

Four rows I drafted and killed against the tree. Recorded so the next lane doesn't re-derive them.

1. **"`timingFunction: 'ease-out-back'` is not a registry name → the constructor throws."** *Dead.* `"ease-out-back"` **is** a `bezierPresets` key (`node_modules/@mkbabb/value.js/dist/subpaths/easing.js:174`, `[0.175, 0.885, 0.32, 1.275]`) and resolves through `easing-registry.ts:120-133`. Further, `cssTwinFor("ease-out-back")` correctly returns `undefined` (`src/animation/easing.ts:29-56` — the keyword regex is anchored), so it stays on the rAF path and never reaches WAAPI with an invalid CSS easing string. The engine's easing design is *right* here.
2. **"CubeTarget bypasses the house `kfEngine()` idiom."** *Dead.* `demo/kf-engine.ts:12-14` states the opposite: point-of-need `loadAnimationEngine()` **is** the default idiom; `kfEngine()` is the narrow exception for the scene-machine hot path. Downgraded to **i-2** (a one-line comment, not a defect).
3. **"Dragging before Play does nothing visible (`apply-transform-to-container` is false) while the faces still re-light."** *Dead.* When the group hasn't started, `useTransformState.ts:197-215` paints `matrix3d(…)` directly onto `.cube` on every model change. Coherent. *(This same painter is what makes **M-2** true — the mechanism that saves the drag is the one that eats the roll.)*
4. **"`--rotationX` (`CubeTarget.css:45`) is dead code."** *Dead.* Read by `useCubeDemo.ts:92` through the engine's element-aware var resolve. Downgraded to **i-3**.

---

## 8. Ledger

| # | id | sev | one line |
|---|---|---|---|
| 1 | B-1 | **BLOCKER** | Ancestor pointer capture makes the `.cube` double-tap unreachable — the Roll's trigger is dead |
| 2 | B-2 | **BLOCKER** | Nested `transform` object + default renderer → `setProperty("transform.rotateX", …)` — the Roll paints nothing |
| 3 | B-3 | **BLOCKER** | `.preserve-3d` ×4 ships only in the undeclared `@mkbabb/glass-ui`; `npm ci` flattens the die (census F-1) |
| 4 | M-1 | MAJOR | `KEY_LIGHT`'s +Y in a Y-down frame lights the die from beneath; top rests at `--lit 0.20`, bottom at `0.80` |
| 5 | M-2 | MAJOR | The roll's terminal pose is never committed to the model — next paint obliterates it; roll #2 snaps 5/6 of the time |
| 6 | M-3 | MAJOR | Three uncoordinated writers own `.cube`'s `transform` (roll, group, matrix painter) |
| 7 | M-4 | MAJOR | `transformTargetsStyle` silently drops object values and unsupported property names — fail-explicit violated |
| 8 | M-5 | MAJOR | `--background` / `--z-content` / `duration-panel` / `text-display-2` — four more no-fallback glass-ui reaches |
| 9 | m-1 | MINOR | Dead `animation` class |
| 10 | m-2 | MINOR | 1200 ms timer never cleared; a throw before it arms latches `rolling` forever |
| 11 | m-3 | MINOR | Root wrapper duplicates `CubeScene.vue:9-14` verbatim; three wheel `preventDefault`s |
| 12 | m-4 | MINOR | Model contract drags an unused `mat4` through a deep reactive proxy |
| 13 | m-5 | MINOR | `<span class="contents">` wraps one child |
| 14 | m-6 | MINOR | Static constants declared per-instance, inconsistently typed |
| 15 | m-7 | MINOR | `props.isPlaying` vs bare `isPlaying` in one template |
| 16 | m-8 | MINOR | Axis-lock latch sticks across tab switch (no blur reset) |
| 17 | m-9 | MINOR | Quantization elides repaints, not renders — headroom on the VDOM diff |
| 18 | i-1 | INFO | `useDoubleTap` has no `pointercancel` path |
| 19 | i-2 | INFO | Two sanctioned engine-access idioms in one folder, undocumented at the seam |
| 20 | i-3 | INFO | `--rotationX` cross-file contract with no back-reference |

**20 defects · 3 blockers · 6 superlatives.**

**If only one thing is fixed:** **B-2**. It is a two-line change (`transform: transformList(transformCall("rotateX", …))`, exactly as `useCubeDemo.ts:82-97` already does it) and it removes a class of silent failure the type system cannot see (`Vars<T = any>`). But note that fixing B-2 alone reveals nothing, because B-1 still gates the trigger — and fixing both then exposes **M-2** and **M-3**. The Roll is a four-defect stack, and any single fix is invisible.
