claude-opus-5[1m]

# CHALLENGE · AmigaScene · axis L (LIBRARY)

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/scenes/amiga/AmigaScene.vue` (271 lines)
**Date** 2026-08-04 · **Posture** assume DEFECTIVE until the tree proves otherwise; every claim carries its own falsifier.
**Write scope** this file only. keyframes.js read as READ-ONLY evidence. No browser tooling was used — every claim below is source-derived; the two claims that need a live paint to *confirm the pixel* are tagged `UNPROVEN-NEEDS-LIVE` and their *mechanism* is nonetheless fully verified in source.

## Read set (whole, read-only)

| file | lines | role |
|---|---|---|
| `demo/scenes/amiga/AmigaScene.vue` | 271 | the target — the COMPOSE (single mesh writer) |
| `demo/scenes/amiga/useAmigaThree.ts` | 273 | Three.js room + the managed present loop |
| `demo/scenes/amiga/useAmigaDemo.ts` | 157 | the group + authored pose |
| `demo/scenes/amiga/useSphereSpin.ts` | 246 | the pointer gesture + `decay()` glide |
| `demo/scenes/amiga/utils.ts` | 92 | `tesselateSphere` + `resolveColor` |
| `demo/scenes/amiga/amigaKeys.ts` | 5 | the scene id |
| `demo/composables/scene-runtime/useSceneVisibilityPause.ts` | 53 | tab-visibility gate |
| `demo/composables/scene-facility/index.ts` | 128 | `facilityFromGroup` |
| `demo/kf-engine.ts` | 55 | the warmed heavy-engine accessor |
| `src/animation/physics/playback.ts` | 250 | `RAFPlayback` (the loop the scene rides) |
| `src/animation/physics/decay.ts` | 100 | the closed-form glide |
| `src/animation/physics/spring/{progress,types}.ts`, `solver/reseat.ts` | — | `SpringProgress`, defaults, `reseatToSpring` |
| `test/demo/scenes/amiga-sphere-spin.test.ts` | 173 | the only amiga unit test |
| `scripts/observe/demo/live-session.mjs` §B3 | 679–760 | the only live drag oracle |

**Tally — 23 defects (1 BLOCKER · 5 MAJOR · 8 MINOR · 9 INFO) · 6 superlatives.**

---

## BLOCKER

### L-B1 · The primary gesture paints nothing. The render-on-demand gate has no edge from the gesture layer.

**Severity** BLOCKER
**Provenance** `useAmigaThree.ts:200–216` (the gate) · `useAmigaThree.ts:103, 190–194, 249, 262–264` (every `renderDirty` writer) · `AmigaScene.vue:171` (the liveness return) · `AmigaScene.vue:216` (the sole `markRenderDirty()` caller) · `useSphereSpin.ts:27–41` (the options surface — no dirty hook) · `useSphereSpin.ts:100–113` (`setOrbitEnabled(false)`)

The present loop renders **iff** `renderDirty || controlsChanged || sceneLive` (`useAmigaThree.ts:206–214`). Enumerate the three terms during a sphere-drag with the group at rest:

1. **`renderDirty`** — set at exactly four sites: `setup()` (`:194`), the OrbitControls `"change"` listener (`:190–192`), the resize observer (`:249`), and `markRenderDirty()` (`:262`). `markRenderDirty()` has exactly one caller in the entire tree — the IntersectionObserver at `AmigaScene.vue:216` (verified: `grep -rn "markRenderDirty" demo/` returns only the declaration, the definition, and that one call). It is cleared on the first render (`:213`). **The gesture layer is never handed it.** `SphereSpinOptions` (`useSphereSpin.ts:27–41`) declares `getMesh` / `getCamera` / `setOrbitEnabled` / `friction` / `sensitivity` — there is no dirty callback in the contract, so `useSphereSpin` has no mechanism to signal the loop even in principle.
2. **`controlsChanged`** — `controls.update()`. Verified in the installed three.js `OrbitControls.js:900–919`: it returns `true` only when `zoomChanged` or a position/quaternion/target delta exceeds `_EPS`, else `return false`. Additionally, `onPointerDown` calls `options.setOrbitEnabled(false)` (`useSphereSpin.ts:103`) → `controls.enabled = false` (`useAmigaThree.ts:259–261`), so OrbitControls cannot even accumulate a delta. At rest and mid-sphere-drag this is `false`.
3. **`sceneLive`** — `onFrame()`'s return: `playing || sphereSpin.isGliding() || reseat != null` (`AmigaScene.vue:171`). Dragging is **not** in the disjunction. `isDragging()` exists (`useSphereSpin.ts:240`) and is never consulted by the scene.

So during a drag: the compose at `AmigaScene.vue:148–155` **does** write `mesh.quaternion` every frame — and the frame is then discarded unrendered. The ball does not move under the finger.

**This is reachable in the default state.** The amiga group does **not** autoplay: `useSceneMachineShellBinding.ts:206–207` gates `PLAY` on `sceneRef.value?.autoPlays === true || autoPlayNext.value`, and `AmigaScene.vue:234–240` exposes only `{ facility, superKey }` — no `autoPlays`. `autoPlayNext` is set only by the home Play gesture (`:253`). A user who navigates to `#/amiga` and grabs the ball is in exactly this state.

**Why the existing oracle is blind to it.** `scripts/observe/demo/live-session.mjs:734–747` (the B3 subject-vs-room MAD leg) screenshots `before`, drags, releases with `page.mouse.up()`, then **`waitForTimeout(450)`** before the `after` screenshot. The release seeds a `decay()` glide (`useSphereSpin.ts:149–157`), `isGliding()` flips true, `sceneLive` becomes true and the loop renders for ~3.5 s. B3 measures the *post-release glide*, never the drag. It is green for a reason unrelated to what it claims to prove ("a centre-drag moves the SUBJECT" — `live-session.mjs:1562`).

Neither does the unit test cover it: `test/demo/scenes/amiga-sphere-spin.test.ts` drives `useSphereSpin` in isolation with no renderer at all.

**Falsifier.** Any ONE of these kills the claim: (a) `controls.update()` returns `true` at rest in the installed three build — refuted at `OrbitControls.js:917–919`; (b) some site other than `AmigaScene.vue:216` calls `markRenderDirty()` — refuted by exhaustive grep; (c) `renderer.render` is reachable from a path other than `useAmigaThree.ts:212`; (d) the group autoplays on entry so `playing` is true whenever a user could drag — refuted at `useSceneMachineShellBinding.ts:206`; (e) a live capture shows the ball rotating *during* (not after) a slow, released-at-zero-velocity drag. `UNPROVEN-NEEDS-LIVE` for the pixel; the mechanism is closed in source.

**Smallest honest fix shape** (not a patch — for the SS-13 record): add `isDragging()` to the `AmigaScene.vue:171` disjunction. One term. The `isDragging` accessor already exists and is already exported.

---

## MAJOR

### L-M1 · Stale flick velocity: drag, hold still, release → the ball flings at the speed it had seconds ago.

**Severity** MAJOR
**Provenance** `useSphereSpin.ts:115–136` (velocity tracking) · `:138–158` (`endDrag`) · `:46` (`REST_SPEED = 1e-3`) · `test/demo/scenes/amiga-sphere-spin.test.ts:164–172` (the near-miss test)

`onPointerMove` writes `velY = dAngY / dt; velX = dAngX / dt` (`:130–131`) — the **last sample only**, no windowing, no decay. `endDrag` (`:149–153`) seeds the glide from those fields and **never consults `lastMoveTime`**, which it has (`:135`, `:110`). A stationary finger emits no `pointermove`, so `velX/velY` freeze at the last motion's value indefinitely. Drag the ball 40 px, park the finger for two seconds, lift → `seed(velX)` fires with the full flick speed and the ball flings.

The seed gate is `Math.abs(v) > REST_SPEED` with `REST_SPEED = 1e-3` rad/s — a single 1 px drag across 1 s yields `0.01 * 1 / 1 = 0.01` rad/s, ten times the threshold. The gate excludes essentially nothing.

The test at `:164–172` is a near-miss that reads as coverage: it exercises `pointerdown → +200 ms → pointerup` **with no `pointermove` at all**, i.e. the `velX === velY === 0` case. That asserts the initialiser, not the staleness.

Corroborating evidence that this is a regression against house practice, not a house idiom: the sibling engine consumer `demo/scenes/cube/orbital-drag/composables/useOrbitalInertia.ts:89–92` explicitly clamps its frame delta (`Math.min(now - lastInertiaTime, 100)`) precisely to defend against a stalled clock. `useSphereSpin` carries no analogue.

**Falsifier.** (a) `endDrag` reads `lastMoveTime` or otherwise ages the velocity — it does not (`:138–158`); (b) browsers emit `pointermove` for a stationary pointer, keeping `velX` fresh — they do not (coalesced move events require motion); (c) a test exists that moves, waits, and releases, asserting `isGliding() === false` — grep of `test/demo/scenes/amiga-sphere-spin.test.ts` shows the only wait-then-release case has zero prior movement.

### L-M2 · `dispose()` leaks: both GridHelpers, both CanvasTextures, and the GL context survive every scene exit.

**Severity** MAJOR
**Provenance** `useAmigaThree.ts:223–237` (the teardown) · `:145–156` (the two GridHelpers) · `:56–75` + `:160–167` (the shadow CanvasTexture) · `utils.ts:58, 68–72` (the checker CanvasTexture) · `:236` (`renderer?.dispose()`)

Three distinct escapes from one 15-line teardown:

1. **The GridHelpers are never touched.** The traverse guard is `if (obj instanceof THREE.Mesh)` (`:227`). Verified in the installed three source: `node_modules/three/src/helpers/GridHelper.js:21` — `class GridHelper extends LineSegments`. `LineSegments` is not a `Mesh`. Both helpers (`:145`, `:151`) leak their `BufferGeometry` and their `LineBasicMaterial` on every unmount.
2. **Neither CanvasTexture is disposed.** `Material.dispose()` in the installed three (`node_modules/three/src/materials/Material.js:989–999`) is a three-line body that dispatches a `dispose` event — it does **not** walk `map`/`specularMap`/etc. The scene allocates two 2-D canvases and uploads two textures per entry: the 128×128 shadow gradient (`useAmigaThree.ts:56–75`) and the **1024×1024** checkerboard (`utils.ts:36–58`). The latter is ~4 MB of GPU memory per amiga entry, never released.
3. **The GL context is never lost.** `renderer.dispose()` frees renderer-side resources but does not release the WebGL context; three's own guidance for repeated create/destroy is `forceContextLoss()`. Each amiga entry constructs a fresh `WebGLRenderer` on a fresh canvas (`useAmigaThree.ts:122–126`, inside `setup()` at `onMounted`), because the demo uses a keyed `<Suspense>` with **no** `KeepAlive` (`useSceneVisibilityPause.ts:6–8` states this explicitly). Chrome caps live contexts at ~16 and silently kills the oldest; sixteen amiga round-trips is an ordinary browsing session for a demo whose whole purpose is scene switching.

**Falsifier.** (a) `GridHelper extends Mesh` in the pinned three version — refuted at `GridHelper.js:21` on the installed copy; (b) `Material.dispose()` disposes `map` — refuted at `Material.js:989`; (c) some outer owner disposes the textures/helpers — `grep -rn "\.dispose()" demo/scenes/` shows amiga's only dispose sites are `useAmigaThree.ts:225–236`; (d) `WebGLRenderer.dispose()` in this three release calls `forceContextLoss` — grep of `WebGLRenderer.js` for a `dispose()` body found no such call. A heap snapshot across ≥3 amiga round-trips showing flat `WEBGL_TEXTURE` retained size would kill (1)+(2).

### L-M3 · `__kfAmigaProbe` is a production global with zero consumers, and its comment names oracles that do not exist.

**Severity** MAJOR
**Provenance** `AmigaScene.vue:181–198` (install) · `:228` (delete) · `:181–183` and `:186–188` (the claims)

The comment asserts two consumers: *"The re-armed proof:amiga-decay-visible reads the coasting angular velocity here"* and *"the physics oracles (T.A7/T.A8/T.A9) read world-unit position / spin here"*. Neither exists. `grep -rl "kfAmigaProbe"` across the repo (excluding `node_modules`, `.git`, worktrees) returns **five** files: `AmigaScene.vue` itself and four **tranche prose documents** (`docs/tranches/U/audit/defect-amiga-suspend-resume.md`, `docs/tranches/T/verdicts/T.A11.md`, `docs/tranches/V/audit/R3-03-residual-gaps.md`, `docs/tranches/V/audit/R2-02-behavior-claims.md`). Zero `.ts`, zero `.vue`, zero `.mjs`. No gate, no observe script, no test, no proof binary reads it.

The historical record explains why it *looks* live: `docs/tranches/U/audit/defect-amiga-suspend-resume.md` and `docs/tranches/V/audit/R3-03-residual-gaps.md` show auditors injecting `page.evaluate(() => window.__kfAmigaProbe.pose())` **ad hoc from a session**. That is a debugging affordance, not a wired oracle — and the standing comment claims the opposite.

Cost: 18 lines of the target SFC (6.6% of it), a global-namespace write on `window` in every production build, and two closures pinning `rendered` and the whole `sphereSpin` composable for the component's life. The `delete` at `:228` prevents an unmount leak, so the retained-memory harm is bounded — the harm is dead shipped code plus a false comment that will mislead the next reader into preserving it.

It is also the **only** `(window as unknown as Record<string, unknown>)` cast in `demo/` (exhaustive grep) — a bespoke escape hatch with no house convention behind it, in a repo whose tsconfig runs `strict` + `noUncheckedIndexedAccess` + `exactOptionalPropertyTypes` (`tsconfig.json:6–8`).

**Falsifier.** Any executable file — test, gate, observe script, playwright spec, CI step — that reads `__kfAmigaProbe`. Exhaustive repo grep (all extensions) found none.

### L-M4 · The T.A8 re-seat is velocity-DIScontinuous, and the engine already ships the seam that fixes it.

**Severity** MAJOR
**Provenance** `AmigaScene.vue:106–123` (the stop transition) · `:133–144` (the lerp) · `src/animation/physics/spring/types.ts:113–120` (`initialVelocity: 0`) · `src/animation/physics/spring/solver/reseat.ts:1–80` (`probeVelocity` / `reseatToSpring`) · `useAmigaDemo.ts:110–140` (the arcs)

The comment at `AmigaScene.vue:71–74` claims the ball *"settles HOME through a short SpringProgress re-seat on stop (T.A8 — **never a `position.set` teleport**)"*. The teleport claim is true. The continuity implication is false.

`new SpringProgress({ initial: 0, response: 0.4, dampingFraction: 1 })` (`:116–120`) starts from `initialVelocity: 0` — the default at `types.ts:116`, not overridden. A critically-damped spring released from rest has `dp/dt(0) = 0`. The scene then drives `rendered.px/py/spin = lerp(from, HOME, p)` (`:136–138`). So at the instant of stop the rendered pose's world-space velocity drops **from the group's velocity to zero in one frame**.

That velocity is generically large. `bouncingY` (`useAmigaDemo.ts:127–140`) sweeps `SPHERE_HOME(0) → FLOOR_Y(−4)` in 25% of a 1600 ms period, i.e. ~4 world units in 400 ms ≈ 10 units/s mid-leg; `bouncingX` sweeps ±5 units at constant speed over an 8000 ms period. The two periods are coprime-ish (8000 vs 1600) and `iterationCount: Infinity`, so a user-initiated pause lands at an arbitrary phase — a zero-velocity stop is measure-zero. The visible artifact is a **kink**: full-speed motion, then an ease-from-rest.

This is precisely the defect class the engine ships a named seam for. `src/animation/physics/spring/solver/reseat.ts` exports `probeVelocity(probe)` and `reseatToSpring(probe, newTarget, options)`, whose doc says (`:48–62`): *"At interruption the engine path carries a POSITION but NO velocity... seeds a fresh SpringProgress at the CURRENT position with that MEASURED velocity... The first post-interruption frames therefore continue the prior direction and speed within ε — **no visible kink** — instead of restarting from rest."* Both symbols are re-exported on the LIGHT static barrel (`src/animation/index.ts:38–47`), i.e. available to this scene with zero value.js edge. The scene already keeps everything `VelocityProbe` needs: `rendered` and `lastFrameAt` (`:88`, `:92`).

The flagship dogfood scene reaching for the lesser idiom while the better one sits on the barrel is the sharpest engine-consumption finding in this component.

**Falsifier.** (a) `SpringProgress` seeds a nonzero initial velocity by default — refuted at `types.ts:116`; (b) the group can only stop at a zero-velocity pose — refuted by `iterationCount: Infinity` on mismatched periods (`useAmigaDemo.ts:111–113, 128–130`); (c) `reseatToSpring` is heavy-surface / value.js-bearing and therefore unavailable here — refuted by `reseat.ts:11–15` ("LIGHT (value.js-free)") and its presence on the static barrel.

### L-M5 · `AmigaThreeHandle.getSphere()` is an unsound type — and it is the one member of its own interface that lies.

**Severity** MAJOR
**Provenance** `useAmigaThree.ts:34–40` (the declaration) · `:89` (the field) · `:256` (the implementation) · `AmigaScene.vue:148–149` (the consumer's guard)

```ts
/** The boing-ball mesh (the interactive subject). Undefined before mount. */
getSphere(): ReturnType<typeof tesselateSphere>;          // useAmigaThree.ts:34–35
/** The contact-shadow blob mesh ... */
getContactShadow(): THREE.Mesh | undefined;               // :36–37
/** The live camera ... */
getCamera(): THREE.PerspectiveCamera | undefined;         // :38–39
```

The JSDoc says "Undefined before mount"; the type says `THREE.Mesh`. Its two immediate siblings in the same interface correctly say `| undefined`. The backing field is `let sphereMesh: ReturnType<typeof tesselateSphere>;` (`:89`) — declared with no initialiser and no `| undefined`, assigned only inside `setup()` (`:175`). TS's definite-assignment analysis does not reach across the closure at `:256`, so this compiles clean under `strict` (confirmed: `npx tsc --noEmit -p tsconfig.json` emits zero amiga diagnostics).

It bites at the consumer: `AmigaScene.vue:148–149` writes `const mesh = three.getSphere(); if (mesh) { ... }` — a guard TypeScript believes is always true. The guard is the *correct* runtime code and the *unreachable* branch per the types; a future reader trusting the signature would legitimately delete it, and any consumer that called `getSphere()` before `setup()` (e.g. the raycast path if the gesture were attached earlier) would take `undefined.updateMatrixWorld()`. `useSphereSpin` survives only because its own option type independently widens to `THREE.Object3D | undefined` (`useSphereSpin.ts:29`) and it re-guards at `:89`.

**Falsifier.** (a) `sphereMesh` is initialised at declaration — it is not (`:89`); (b) `setup()` is guaranteed to run before any `getSphere()` call by a mechanism in the type system rather than by convention — there is none; the handle is returned from the composable at `:254` and `setup` is a separate imperative call the consumer must remember (`AmigaScene.vue:176`).

---

## MINOR

### L-m1 · `computed` is imported and never used, and nothing in the repo can catch it.

`AmigaScene.vue:21` imports `{ computed, onBeforeUnmount, onMounted, useTemplateRef }`. Exhaustive grep of the SFC for `computed` returns **only line 21**. No `noUnusedLocals`/`noUnusedParameters` in `tsconfig.json` (grep: absent), and **no eslint config exists anywhere in the repo root** (`ls -a | grep -i eslint` → empty). So the dead import is invisible to every gate. *Falsifier:* a `computed(` call anywhere in the SFC, or an eslint/tsc flag that would flag it.

### L-m2 · The `pz` channel is dead end-to-end, in three places at once.

`AmigaPose.pz` (`useAmigaDemo.ts:51`) is (a) **never authored** — the keyframes at `useAmigaDemo.ts:98–140` write only `position.x`, `position.y`, `rotation.y`; (b) **never transformed** — the group `transform` (`:79–87`) reads only `p.x`, `p.y`, `r.y`, so even a `z` keyframe could not reach the pose; (c) **never re-seated** — the stop transition copies `px/py/spin` (`AmigaScene.vue:113–115`), the lerp restores `px/py/spin` (`:136–138`), and the PRM snap sets `px/py/spin` (`:108–110`). `reseatFrom.pz` (`:91`) is written once at initialisation and **never read again**. The comment at `useAmigaDemo.ts:29` states the intent honestly ("Z motion DIES — the original Boing is planar") — the type and four write sites did not follow. *Falsifier:* any write to `pose.pz` or read of `reseatFrom.pz`.

### L-m3 · `CONTACT_FLOOR` and its `+0.01` epsilon are duplicated across two files, and re-written every frame though constant.

`const CONTACT_FLOOR = FLOOR_Y - SPHERE_RADIUS` appears verbatim at `AmigaScene.vue:84` **and** `useAmigaThree.ts:30`, both importing the same two constants from `useAmigaDemo.ts`. The magic `+ 0.01` z-fight epsilon likewise appears at `useAmigaThree.ts:169` (setup) and `AmigaScene.vue:163` (per frame). The derived constant belongs beside `FLOOR_Y`/`SPHERE_RADIUS` in `useAmigaDemo.ts` — the module that already owns the room geometry and is already imported by both. Separately, `shadow.position.y = CONTACT_FLOOR + 0.01` (`AmigaScene.vue:163`) is a per-frame write of an invariant already established at `useAmigaThree.ts:169`. *Falsifier:* the two definitions diverge intentionally (they do not — identical expressions over identical imports), or `shadow.position.y` is mutated elsewhere.

### L-m4 · `useAmigaDemo()` returns three animations its only consumer never takes.

`useAmigaDemo.ts:155` returns `{ animationGroup, pose, spinning, bouncingX, bouncingY }`. The sole call site destructures `{ animationGroup, pose }` (`AmigaScene.vue:56`). `grep -rn "useAmigaDemo" demo test scripts` confirms exactly one caller. Three of five returned members are dead API surface that ties the composable's contract to internals it need not expose. *Falsifier:* a second consumer, or a test importing the named animations.

### L-m5 · `lastFrameAt` is never re-based across a present-loop suspend; the sibling composable defends and this one does not.

`AmigaScene.vue:92, 98–100` computes `dt = now - lastFrameAt` with a first-frame sentinel only. The present loop is stopped and restarted by two independent gates — the tab-visibility pause (`:202–206`) and the IntersectionObserver (`:212–223`) — and neither re-bases the clock. On resume the first `dt` is the entire suspended wall-clock interval and is fed straight to `reseat.tickDt(dt)` (`:134`).

I rate this MINOR rather than MAJOR after checking the consequence: the only consumer of `dt` is the reseat spring, and a multi-second `dt` simply completes the settle (`SpringProgress._stepSeconds` at `progress.ts:274–284` evaluates the closed form at `elapsed`, which is well-conditioned for large `t` at `dampingFraction: 1`). The outcome — snapped home — is the intended terminal state. The finding stands as latent-hazard + house-inconsistency: `demo/scenes/cube/orbital-drag/composables/useOrbitalInertia.ts:89–92` clamps the identical quantity to 100 ms and documents why. *Falsifier:* a `lastFrameAt = 0` reset on any stop path, or a second `dt` consumer where a large value is not self-correcting.

### L-m6 · `tickGlide()`'s documented return value is unused by its only consumer.

`useSphereSpin.ts:160–165` documents: *"Returns true while the glide is still live (**used by the render-on-demand present loop, T.A12**)."* `AmigaScene.vue:95` calls it as a bare statement and discards the result; liveness is re-derived at `:171` from `isGliding()`. The two agree (tickGlide clears a settled sampler before `isGliding()` reads it), so this is contract drift, not a behaviour bug. But the comment names a consumer that does not consume, which is the same failure mode as L-M3 at smaller scale. *Falsifier:* any site using `tickGlide()`'s return — the only other one is the unit test at `amiga-sphere-spin.test.ts:135, 156`, which is a test, not "the present loop".

### L-m7 · The glass-ui phantom dep bites here through one unfallbacked token.

**This is where census F-1 lands on this component.** `lane-frontend.md:15` records `@mkbabb/glass-ui` as absent from `package.json` and `package-lock.json` while 7.0.0 sits installed. I re-verified against the tree: `node -e "require('./package.json')"` shows `dependencies` = `{"@mkbabb/value.js": "4.0.0"}` only, `peerDependencies` undefined, and glass-ui absent from all 40 `devDependencies` — yet `demo/styles/style.css:3` does `@import "@mkbabb/glass-ui/styles"`.

AmigaScene's scoped block consumes three tokens from that undeclared package:

```css
background: linear-gradient(to bottom,
    var(--muted, hsl(0 0% 96%)),          /* :261 — HAS a fallback */
    var(--background, hsl(0 0% 100%)));   /* :262 — HAS a fallback */
box-shadow: inset 0 0 0 1px var(--border); /* :266 — NO fallback */
```

All three are declared **only** in glass-ui (`grep -rn -- "--border:\|--muted:\|--background:" demo/` → zero hits; `grep` of `node_modules/@mkbabb/glass-ui/dist/styles/` → `--border: var(--neutral-4)`, `--muted: var(--neutral-1)`, `--background: var(--neutral-0)`). The asymmetry is the defect: an unresolved `var()` with no fallback makes the whole declaration **invalid at computed-value time**, so the J.W7a stage-boundary hairline (`:264–266`) silently vanishes while the backdrop gradient degrades gracefully. The author fallbacked two of three in the same rule set.

*Falsifier:* `--border` declared in `demo/styles/` or by tailwind's theme layer — exhaustive grep of `demo/` found none. `UNPROVEN-NEEDS-LIVE` for the visual absence; the token provenance is proven.

### L-m8 · PRM effort is spent on the 400 ms motion and withheld from the infinite one.

`AmigaScene.vue:58` reads `usePreferredReducedMotion()` and uses it at exactly one site: `:107–112`, to snap the ~400 ms re-seat instead of springing it. The **infinite, full-amplitude, wall-to-wall bounce** — ±5 world units of X sweep and a floor-slam every 1600 ms, `iterationCount: Infinity` (`useAmigaDemo.ts:110–140`) — is not gated at all. Neither is `respectReducedMotion` set on any animation option, though the engine exports `reducedMotionScale` on the LIGHT barrel (`src/animation/index.ts:46–48`) documented as "the amplitude-scale resolver a consumer can read to scale its own non-spring motion under reduced motion".

I am deliberately calibrating this MINOR, not MAJOR: the motion is user-initiated (L-B1 established the group does not autoplay) and the animation *is* the demo's essential content, which WCAG 2.3.3 exempts. The finding is the **asymmetry** — PRM was implemented where it is imperceptible and skipped where it is the whole point.

*Census contradiction (explicit).* `lane-frontend.md:462, 475–481` enumerates "13 enforcement sites across 12 files" and lists "**3 JS query sites**" (`useCubeDemo.ts:164`, `useSequenceInstrument.ts:31`, `EasingTarget.vue:234`). **`AmigaScene.vue:58` is a fourth**, using a fourth mechanism (`usePreferredReducedMotion` from `@vueuse/core`, distinct from raw `window.matchMedia?.()` and from `useMediaQuery`). The lane's own conclusion — "conscientious but **inconsistent in mechanism**" — is stronger than it knew: four sites, three mechanisms. The tally should read 14 sites across 13 files.

---

## INFO

- **L-i1 · Dead 104 KB asset.** `demo/scenes/amiga/checkerboard.jpg` (103 890 bytes) has zero code references (`grep -rn "checkerboard"` returns only three prose comments, none an import). The checker is generated procedurally in `utils.ts:36–57`. It is unbundled (no importer) but carried in the tree since `fdc61a48`. *Falsifier:* any `import`/`url()`/`href` reaching it.
- **L-i2 · Silent-drop error posture in the group transform.** `useAmigaDemo.ts:81–86` writes only when `typeof p.x === "number"`. If the compositor ever delivers a `ValueUnit` or string, the pose stops updating with **no error and no log** — the ball freezes and nothing says why. Either the T.A6 plain-numbers contract holds (making the guards dead defensive code) or it does not (making the silence a debugging trap). The tree records that this exact seam has failed before: `docs/tranches/U/audit/defect-amiga-suspend-resume.md` DEFECT A is a stale-`ValueUnit`-leaf bug in the singleTarget compositor that froze *this* scene, and amiga is named there as "the **only scene** that hits the buggy path".
- **L-i3 · A wasted `RAFPlayback` per stop.** Each `new SpringProgress` (`AmigaScene.vue:116`) allocates `readonly _playback = new RAFPlayback()` (`progress.ts:131`) that this scene never uses — it drives via `tickDt`. Harmless (never started, so nothing leaks) but a fresh allocation on every play→stop transition where one reusable instance re-seated by `target` would do.
- **L-i4 · `markRaw` on a non-reactive local.** `useAmigaThree.ts:97` wraps a module-local `RAFPlayback` that never enters a reactive graph. Defensive noise.
- **L-i5 · The checker texture is baked once at mount and is theme-blind; `resolveColor` recurses asymmetrically.** `tesselateSphere` runs inside `setup()` → `onMounted` (`useAmigaThree.ts:175`), reading `getComputedStyle(document.documentElement)` (`utils.ts:19–21`) exactly once. There is no re-bake on theme toggle. Today this is inert because `--amiga-red: var(--rainbow-red)` resolves to a single `hsl(0 85% 60%)` **outside** any `.dark` block (`demo/styles/design-idioms.css:12–24`), so light and dark agree; the moment a dark variant is added the ball keeps the mount-time red. Separately, `resolveColor` recurses into the `var()` **fallback** (`utils.ts:26`) but returns the resolved value verbatim (`:23`) without re-testing it for a nested `var()` — safe only because the CSS spec substitutes custom-property references at computed-value time, an assumption the function's own defensive shape shows it does not fully trust. `UNPROVEN-NEEDS-LIVE` for the theme-toggle behaviour.
- **L-i6 · The glide's last delta is composed but never presented.** `onFrame` mutates `offset` at `:95` and *then* computes the gate at `:171`. On the frame where the last sampler drops below `REST_SPEED`, `isGliding()` returns false and the frame is discarded. The dropped delta is bounded by `REST_SPEED × 16 ms ≈ 1.6e-5` rad — imperceptible. Recorded for completeness, not as a visible defect.
- **L-i7 · Comment archaeology.** ~90 of 271 lines are comment, and the load-bearing ones are keyed to tranche ids the reader cannot resolve from the repo: T.A6–T.A12, I.W3 S1/S2, J.W7a, R.W6-decomp, OD-U21 / SPEC-B3 §N3, B-3, A5, T.B1 STAGE 1, T.B9, inv ζ, Q.WC5 S2, L.W11.S3. Several (`proof:stage-inventory`, `proof:amiga-decay-visible`, `proof:amiga-tessellate-tilecount`) name gates as if they were live; L-M3 shows at least one is not. The comments assert *conclusions* where they should assert *invariants*.
- **L-i8 · Small dead surfaces.** `AmigaScene.vue:42` aliases `const superKey = AMIGA_SCENE_ID` for a single use at `:239`. `AmigaThreeHandle.dispose` is exposed on the returned handle (`useAmigaThree.ts:270`) while also being auto-registered at `:252` — no caller ever invokes the exposed one, and a double call would double-dispose three resources.
- **L-i9 · The pause gates stand down the renderer but not the simulation.** Both `useSceneVisibilityPause` (`AmigaScene.vue:202–206`) and the IntersectionObserver (`:212–223`) call `three.stop()` — the WebGL present loop only. The `AnimationGroup`'s own rAF keeps ticking `pose` at full rate while the scene is scrolled off-screen in a *visible* tab (background tabs are throttled by the browser, so the tab-visibility leg is fine). `docs/tranches/U/audit/defect-amiga-suspend-resume.md` names this exact gap independently: *"amiga's tab-visibility pause governs only its WebGL render loop, never its animation-group simulation (§Defect B)"* — still true in the tree at this read. Arguably intentional (the transport panel's playhead stays live), which is why this is INFO and not a defect claim.

---

## SUPERLATIVES (L-18 runs both ways)

### L-S1 · The single-writer discipline is genuinely exemplary, and it is enforced by shape rather than by comment.

`AmigaScene.vue:148–155` is the only site in the whole amiga tree that writes `mesh.quaternion` / `mesh.position`. The group writes a plain-number POSE (`useAmigaDemo.ts:79–87`); the gesture accumulates into a stable additive `offset` object (`useSphereSpin.ts:59, 126–127`); the scene composes. The unit test locks it structurally rather than by assertion-of-intent: `amiga-sphere-spin.test.ts:108` asserts `mesh.rotation.y === 0` *after* a drag — i.e. it proves the gesture layer is not a second writer. Three-layer separation with a test that would fail if anyone re-introduced the race.

### L-S2 · Zero hand-rolled rAF, and the liveness contract is a return value rather than a flag.

`useAmigaThree.ts:97` rides the engine's own `RAFPlayback` (`src/animation/physics/playback.ts:228–231`, whose `loop` is a bind-proof arrow class-field, `:63–76`). No `requestAnimationFrame` appears anywhere in `demo/scenes/amiga/`. The `onFrame(): boolean` contract (`useAmigaThree.ts:79–83`) makes the *scene* declare its liveness to the *loop* — the correct direction of the dependency, and cleaner than the sibling `useOrbitalInertia.ts:131`, which reaches for `@vueuse/core`'s `useRafFn` instead of the engine's own driver. Composed with `useSceneVisibilityPause`'s honesty contract — *"the gate only resumes what IT paused"* (`useSceneVisibilityPause.ts:14–17`), implemented in four lines at `:39–51` — this is the strongest runtime-lifecycle work in the read set. (L-B1 is a missing *term* in an otherwise well-built gate, not an indictment of the gate.)

### L-S3 · The `decay()` consumption is the subtlest correct thing in the file.

`decay()` returns an **absolute** sampler `x(t) = x0 + v0/k·(1 − e^(−kt))` (`src/animation/physics/decay.ts:74–83`). The gesture needs an **additive** contribution to a shared offset. `useSphereSpin.ts:172–185` bridges them by differencing against the previous sample — `offset.x += s.value - lastGlideX; lastGlideX = s.value` — which is exactly right, and stays right across a re-grab because `onPointerDown` drops the samplers (`:106`) and `endDrag` re-zeros the accumulators before re-seeding (`:155–157`). Per-axis independent seeding (`:149–153`) means a pure-horizontal flick arms no vertical glide. This is the difference between "imported the engine" and "understood the engine".

### L-S4 · The group transform is correct under any delivery order, by construction.

One `transform` closure is shared by all three animations (`useAmigaDemo.ts:105, 122, 139`). Its per-field guards (`:81–86`) mean each animation writes only the fields it authored, so whether the compositor delivers one merged `vars` per group frame or three partial ones per animation, the pose lands identically. The comment claims "no per-animation transform race"; the *code* makes the claim unnecessary. (L-i2 is the other edge of the same guard — the shape is right, the silence on a contract breach is not.)

### L-S5 · `utils.ts` fixed a real 4000× perf bug and left the isomorphism argument in place.

`utils.ts:44–57` replaced a 1024×1024 **pixel**-grid loop issuing ~524 000 `fillRect` calls (all but 256 of them landing wholly off-canvas) with a 16×16 **tile** loop issuing ≤128. The comment states the correctness argument — "checkerboard-isomorphic: the visible board is pixel-identical" — which is the right form for a perf rewrite: the claim a reviewer must check, not the change that was made.

### L-S6 · `resolveColor` correctly identified a genuinely non-obvious platform trap.

`utils.ts:14–27` exists because Canvas2D `fillStyle` does not resolve `var()`, and an invalid assignment is **silently ignored, leaving the previous paint** — so a missed token would have produced a solid-white ball with no error anywhere. The comment names the failure mode precisely (`:9–12`) and the fix computes the token against the live DOM before it reaches the offscreen context. Diagnosing that from a white sphere is hard; the note that makes the next reader not undo it is worth more than the four lines of code.

---

## Census reconciliation

**Folded (not re-invented).**
- `lane-frontend.md:15, 54–72` **F-1** (glass-ui phantom dep) — consumed as the root of **L-m7**; I add the component-level bite (`--border` unfallbacked at `AmigaScene.vue:266` while its two rule-mates carry fallbacks) and re-verified F-1 against the current `package.json` (deps = `@mkbabb/value.js` only; glass-ui absent from deps, devDeps, and peerDeps; installed at `node_modules/@mkbabb/glass-ui`).
- `lane-frontend.md:241` rosters `amiga/AmigaScene.vue` at 271 lines, class **b** (bespoke, no glass-ui component consumption). Confirmed exactly: the SFC imports no glass-ui component; its only glass-ui coupling is the three CSS tokens above. **S-1…S-8 do not touch this component** — no shadow-component finding applies, correctly.
- `lane-library.md:345, 353` roster `playback.ts` (250 L) and `decay.ts` (100 L). Both are consumed by this component and both consumptions are superlative (**L-S2**, **L-S3**). Recorded as the demo-side evidence those library rows were missing.
- `docs/tranches/U/audit/defect-amiga-suspend-resume.md` §Defect B (pause governs the render loop, not the simulation) — folded as **L-i9**, verified still true in the tree.

**Contradicted (the tree disagrees).**
- `lane-frontend.md:462, 475–481` — "**3 JS query sites**" for `prefers-reduced-motion`. **AmigaScene.vue:58 is a fourth**, via a fourth mechanism (`usePreferredReducedMotion` from `@vueuse/core`). The lane's grep pattern evidently keyed on `matchMedia`/`useMediaQuery` and missed the vueuse-native composable. Corrected tally: **14 sites across 13 files, 3 distinct mechanisms** — which strengthens rather than weakens the lane's own "inconsistent in mechanism" verdict. See **L-m8**.

**Not contradicted but sharpened.** `lane-frontend.md`'s scene roster classes AmigaScene as bespoke without remark. This audit finds the bespoke-ness is largely *earned* (L-S1…L-S6) — the failures are one missing term in a render gate (L-B1), one missing velocity read (L-M1/L-M4), and one teardown that stopped at `instanceof Mesh` (L-M2). None is an architecture problem; all four are one-line-to-ten-line omissions in otherwise well-reasoned code.

---

## Method note / limits

Static and source-derived only, per the standing law. No browser, no playwright, no devtools. Two claims carry `UNPROVEN-NEEDS-LIVE` on their *visual* leg while their *mechanism* is closed in source: **L-B1** (drag paints nothing — every term of the render gate traced to its writers, three.js `update()` return semantics verified in the installed source, the B3 oracle's blindness traced to its 450 ms post-release wait) and **L-m7** (the hairline's absence — token provenance proven, rendering unobserved). **L-i5**'s theme-toggle leg is likewise live-only, and is currently inert by construction.

Every claim above states what would kill it. Where the falsifier was checkable in the tree I checked it and said so; where the tree already refutes an obvious counter-hypothesis I cited the refuting line. Two candidate findings were **dropped** during verification rather than shipped: (a) a suspected `useEventListener` scope leak in `useSphereSpin.attach()` — refuted, Vue activates the component's effect scope during `onMounted`, and `detach()` (`:210–214`) is belt-and-braces on top; (b) a suspected non-settling re-seat that would pin the present loop forever — refuted, `defaultSpringOptions` (`types.ts:113–120`) supplies finite `settleThreshold`/`velocitySettleThreshold` of `1e-3` and the `settled` branch (`AmigaScene.vue:139–144`) snaps and clears. A false defect is worse than a missed one.
