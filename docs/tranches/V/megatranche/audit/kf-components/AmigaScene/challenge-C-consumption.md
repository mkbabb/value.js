claude-opus-5[1m]

# CHALLENGE · AmigaScene · axis C — CONSUMPTION

**Revision 2 · 2026-08-04 · supersedes revision 1 (2026-08-03).** R1's thirteen findings were re-derived independently from the tree before this pass read them; all thirteen survive re-verification and are **carried forward with their original ids and text intact** (§2). This pass adds **six net-new defects** (§3) and **two net-new superlatives** (§4), and **explicitly contradicts one limb of C-9** — R1 assumed the amiga scene can scroll off-screen; the shell forbids it (**C-16**).

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/scenes/amiga/AmigaScene.vue` (271 L)
**Axis** how this component consumes **keyframes.js** the library and **glass-ui** the design system — subpath choice, shadow components, value.js transitive exposure, contract quality, sibling seams.
**Mode** static, read-only. No installs, no dev server, no browser tooling. Livable-only claims carry **UNPROVEN-NEEDS-LIVE** for SS-13.
**Prior corpus folded, not re-invented:** `formation/keyframes/lane-frontend.md` (F-1, S-1..S-8), `lane-library.md` (§4 parse seams, §4.6 R1, LEG-3).

**Read whole (R2 pass):** `AmigaScene.vue`, `useAmigaThree.ts`, `useAmigaDemo.ts`, `useSphereSpin.ts`, `amigaKeys.ts`, `utils.ts` — 1 040 L — plus every transitive import: `demo/kf-engine.ts`, `demo/composables/scene-facility/index.ts`, `demo/composables/scene-runtime/useSceneVisibilityPause.ts`, the kf barrel `src/animation/index.ts`, `internal/reduced-motion.ts`, `group/{group,lifecycle}.ts`, `constants/defaults.ts`, `physics/spring/{progress,types,solver/reseat}.ts`, `demo/state/animationOptionsStore.ts`, `demo/app/scene/{scenes,sceneExposedApi,useSceneMachineShellBinding}.ts`, `demo/components/instrument/shell/EditorShell.vue`, `demo/components/instrument/transport/AnimationControlsGroup.vue`, and the installed `@mkbabb/value.js@4.0.0` / `@mkbabb/glass-ui@7.0.0` artifacts.

---

## 0. Verdict (revision 2)

| | count |
|---|--:|
| defects | **19** |
| of which BLOCKER | **1** (inherited — root cause is lane-frontend **F-1**; do not double-count in the tranche total) |
| MAJOR | 5 |
| MINOR | 10 |
| INFO | 3 |
| superlatives | **6** |
| out-of-axis referrals (uncounted) | 1 |

**Headline (unchanged in substance, sharpened in scope).** Assume-defective was the right prior on the *design-system* half and the wrong prior on the *library-boundary* half. AmigaScene's consumption of **keyframes.js is close to exemplary at the module boundary** — the LIGHT/HEAVY firewall is respected across all four files, the render-on-demand liveness contract is consumed exactly as specified, no raw `requestAnimationFrame` exists in the folder, and it is the one demo scene with **structurally zero R1 parser exposure**. Its consumption of **glass-ui is the weakest of any `stageMode: "subject"` scene** — zero imports, four theme-blind GL literals, and 8 lines of scoped CSS shadowing two shipped primitives.

**What R2 changes.** The library-boundary praise is *module-level*, not *option-level*. Two shipped affordances that bear directly on this scene's stated intent go unconsumed: `reseatToSpring` (**C-2**, R1) and `respectReducedMotion` (**C-15**, new — and the more serious of the two, because it inverts the scene's accessibility posture: the 0.4 s settle is PRM-gated while the infinite full-amplitude bounce is not). And one runtime authority the scene wires — the I.W3 S2 occlusion observer — **cannot fire in this shell** (**C-16**, new), which both adds a false invariant to the file and retires R1's C-9 limb 2.

---

## 1. Index

| id | sev | finding | rev |
|---|---|---|---|
| C-1 | **BLOCKER** (inherited) | 100 % glass-ui-token-sourced stage with zero glass-ui import — F-1 invisible to import-graph audit | R1 |
| C-2 | MAJOR | stop-settle re-seat starts from zero velocity; `reseatToSpring` discarded | R1 |
| C-3 | MAJOR | WebGL room bypasses the design system: 4 theme-blind literals vs 1 token-sourced | R1 |
| C-4 | MAJOR | `getSphere()` non-nullable type over a genuinely-undefined field | R1 |
| **C-15** | **MAJOR** | **PRM posture inverted — `respectReducedMotion` unconsumed on the group and all 3 animations** | **R2** |
| **C-16** | **MAJOR** | **the I.W3 S2 occlusion pause cannot fire; a dead authority + a false invariant** | **R2** |
| C-5 | MINOR | `useAmigaDemo()` publishes three dead library handles | R1 |
| C-6 | MINOR | two shipped glass primitives shadowed by 8 CSS lines — proposed **S-9** | R1 |
| C-7 | MINOR | asymmetric `var()` fallback discipline; light-only off-hue fallbacks | R1 |
| C-8 | MINOR | `decay()` seeded from a stale single-sample velocity | R1 |
| C-9 | MINOR | two pause landlords, non-equivalent resume paths — **limb 2 retired by C-16** | R1 amended |
| C-10 | MINOR | `AmigaPose.pz` write-never, dropped by the re-seat | R1 |
| C-11 | MINOR | production-shipped `window` probe by double-cast | R1 |
| **C-17** | MINOR | **two concurrent `RAFPlayback` loops with no frame identity between them** | **R2** |
| **C-18** | MINOR | **`lastFrameAt` not re-armed across a present-loop stop/start** | **R2** |
| **C-19** | MINOR | **dead `computed` import — and no gate in the repo can see it** | **R2** |
| **C-20** | MINOR | **dead asset `checkerboard.jpg` committed in the scene folder** | **R2** |
| C-12 | INFO | declines the `Vars` generic, pays in runtime `typeof` guards | R1 |
| C-13 | INFO | authored `rotation.y` vs rendered tilted axis; one id, three names | R1 |
| C-14 | *referral* | `dispose()` leaks two textures + two helpers (three.js — out of axis) | R1 |

---

## 2. Defects carried from revision 1 (re-verified 2026-08-04)

### C-1 · **BLOCKER** (inherited F-1) — the stage is 100 % glass-ui-token-sourced with **zero** glass-ui import, so F-1 is invisible to any import-graph audit of this file yet kills it

lane-frontend §4 correctly classes `amiga/AmigaScene.vue` as **b** (no glass-ui import). That classification, taken alone, reads as *independence*. The tree says otherwise: every visual constant in the scene's own `<style scoped>` is a glass-ui token.

| site | consumed | defined **only** in |
|---|---|---|
| `AmigaScene.vue:15` | `rounded-card` | `glass-ui/dist/styles/theme/radius.css` → `@theme { … --radius-card: var(--radius-2xl); … }` |
| `AmigaScene.vue:259–262` | `var(--muted)`, `var(--background)` | `glass-ui/dist/styles/tokens/color-radius.css` → `--muted: var(--neutral-1)`, `--background: var(--neutral-0)` |
| `AmigaScene.vue:266` | `var(--border)` | same file → `--border: var(--neutral-4)` |

Probe that closes it — the demo defines none of them:

```
$ grep -rn -- "--border:"      demo/styles/   → (no output)
$ grep -rn -- "--muted:"       demo/styles/   → (no output)
$ grep -rn -- "--background:"  demo/styles/   → (no output)
$ grep -rn -- "--radius-card:" demo/          → (no output)
```

**R2 re-verification:** all four probes re-run 2026-08-04, all four empty. The `.rounded-card` rule itself ships only from the phantom package (`node_modules/@mkbabb/glass-ui/dist/styles/components.css` → `.rounded-card{border-radius:var(--radius-card)}`, reached via `demo/styles/style.css:3 @import "@mkbabb/glass-ui/styles"`).

The cascade edge is `demo/styles/style.css:3`, and per **F-1** `@mkbabb/glass-ui` is absent from both `package.json` and `package-lock.json` (`grep -c "glass-ui" package-lock.json → 0`) while 7.0.0 sits installed from a `Jul 16 05:17` write. On a clean `npm ci` the import fails and this scene renders with no radius, no hairline, and a light-only fallback gradient in every theme.

The novel claim, not in lane-frontend: **an import-graph audit cannot see this**. A "which components does F-1 break" query built on `grep -rl "@mkbabb/glass-ui" --include="*.vue"` returns 37 files and **excludes AmigaScene** — the single most token-dependent scene in the tree by ratio (100 % of its authored visual constants).

**Falsifier.** Any `--border:` / `--muted:` / `--background:` / `--radius-card:` definition under `demo/`, or a `@mkbabb/glass-ui` entry appearing in `package-lock.json`. Either kills it.

---

### C-2 · **MAJOR** — the stop-settle re-seat starts from **zero velocity**, discarding `reseatToSpring` — the library's purpose-built cure, exported from the same barrel line above it

`AmigaScene.vue:24` imports `SpringProgress` from `@mkbabb/keyframes.js`. Two names down that same barrel:

```
src/animation/index.ts:38    reseatToSpring,
src/animation/index.ts:39    probeVelocity,
```

`reseatToSpring` exists for *precisely* this situation — `physics/spring/solver/reseat.ts:47–58`:

> *"Velocity-continuous interruption of a parsed-CSS (or any positional) animation, re-served as a spring… At interruption the engine path carries a POSITION … but NO velocity — a keyframe stream has no analytic derivative. This finite-differences the interp stream over the last frame …, then seeds a fresh SpringProgress at the CURRENT position with that MEASURED velocity… The first post-interruption frames therefore continue the prior direction and speed within ε — **no visible kink** — instead of restarting from rest."*

AmigaScene restarts from rest:

```ts
AmigaScene.vue:116-121
reseat = new SpringProgress({ initial: 0, response: 0.4, dampingFraction: 1 });
reseat.target = 1;
```

`initialVelocity` is omitted, so it defaults; `progress.ts:145` seats `this.currentVelocity = this.options.initialVelocity` — a rest start. The spring then drives a scalar 0→1 progress that the scene `lerp`s three channels off (`:136–138`), so *every* channel leaves the interruption at zero slope.

**This is guaranteed, not probabilistic.** The X channel is authored LINEAR across 0 → +5 → 0 → −5 → 0 over 8000 ms (`useAmigaDemo.ts:110–123`, `timingFunction: "linear"`), so `|d px/dt| ≡ 2.5 units/s` at **every instant of the cycle — never zero**. There is no phase at which a stop is velocity-free. Every pause therefore snaps 2.5 u/s → 0 in one frame *before* the 0.4 s settle begins, in a 12-unit room with a 1-unit ball. The Y channel is worse: `FLOOR_Y −4 → APEX_Y +2` in 400 ms under `cubic-bezier(0.36,0,0.66,1)`.

The scene's own comment (`:71–73`) states continuity as the intent — *"settles HOME through a short SpringProgress re-seat … never a `position.set` teleport"* — so this is a missed primitive, not an authored aesthetic.

**Falsifier.** (a) `SpringProgressOptions.initialVelocity` defaulting non-zero — it does not (`progress.ts:145`); (b) the group only ever stopping where authored velocity is 0 — refuted by the linear X channel above; (c) a deliberate hard-stop aesthetic — refuted by `:71–73`. **Magnitude of the visible kink: UNPROVEN-NEEDS-LIVE.** The zero-velocity seed itself is proven from source.

**R2 note.** The remedy space is wider than R1 stated, and the library documents *both* arms: `reseatToSpring` allocates a fresh spring, while `orchestration/drag/draggable.ts:359–364` records the benchmarked alternative — *"re-seat the PERSISTENT `this.spring` IN PLACE here, NOT via the `reseatToSpring` [path] … `reseatToSpring` ALLOCATES a fresh [spring]"*. AmigaScene takes a third path that carries the allocation cost of one and the velocity loss of neither.

---

### C-3 · **MAJOR** — the WebGL room bypasses the design system entirely: **4 theme-blind literals against 1 token-sourced one**, in a component whose CSS half *is* theme-reactive

One color in the GL room is done right — `useAmigaThree.ts:175` `tesselateSphere("#ffffff", "var(--amiga-red)", SPHERE_RADIUS)`, resolved against the live DOM by `utils.ts:14–27`, with a docblock explaining exactly why (`utils.ts:3–13`).

The other four are hardcoded:

| site | literal | role |
|---|---|---|
| `useAmigaThree.ts:144` | `new THREE.Color("#b9b9c6")` | **both** grid-room helpers (floor + back wall) |
| `useAmigaThree.ts:63–65` | `rgba(0,0,0,0.55)` / `0.28` / `0` | the contact-shadow radial texture |
| `useAmigaThree.ts:135` | `HemisphereLight("white", "#c8c8c8", 1.6)` | sky/ground fill |
| `useAmigaThree.ts:137` | `SpotLight("white", …)` | key light |

The contrast is proven, not asserted. The CSS half flips with theme — `--muted: var(--neutral-1)`, and `--neutral-1: light-dark(hsl(38 26% 95%), hsl(28 12% 11%))` (`glass-ui/dist/styles/tokens/color-radius.css`). So the canvas backdrop under the GL composite goes from warm paper to near-black while the grid lines, the lights, and the shadow do not move at all. A `rgba(0,0,0,0.55)` blob over `hsl(28 12% 11%)` is arithmetically near-invisible: the contact shadow — the one cue selling the ball's contact with the floor, per `useAmigaThree.ts:21–23` — disappears in dark mode.

The demo has dark mode and knows how to subscribe to it: `DarkModeToggle` at `app/dock/MbabbMenu.vue:83`, and `useGlobalDark` from `@mkbabb/glass-ui/dark` at three live sites (`SpringHeatmap.vue:269`, `CSSCodeEditor.vue:98`, `useHighlightCSS.ts:81`). Amiga consumes neither.

**Falsifier.** A `.dark`-scoped GL re-theme anywhere in `demo/scenes/amiga/` (`grep -rn "isDark\|useGlobalDark\|\.dark" demo/scenes/amiga/` → none), or evidence the demo has no dark mode (refuted above). **Visual verdict UNPROVEN-NEEDS-LIVE**; the token bypass and the light/dark token values are proven statically.

*(Note the related non-defect: `utils.ts:19` resolves `--amiga-red` once at mount and never re-resolves, so a theme toggle cannot repaint the ball texture. This is **not** filed as a defect because `--rainbow-red: hsl(0 85% 60%)` is defined once in `:root` with no `.dark` override — `design-idioms.css:15,24` — making the ball theme-invariant today. Latent only. **R2 re-verified:** `grep -rn "rainbow-red" demo/styles/*.css` → 4 hits, all inside the single `:root` block at `design-idioms.css:12–24` plus two gradient stops at `:136,:142`. No `.dark` counterpart exists.)*

---

### C-4 · **MAJOR** — `getSphere()` is the one dishonest member of an otherwise honest handle, and the consumer defends against a value the type says cannot exist

```ts
useAmigaThree.ts:35-36
/** The boing-ball mesh (the interactive subject). Undefined before mount. */
getSphere(): ReturnType<typeof tesselateSphere>;
```

The JSDoc says *"Undefined before mount"*; the type does not. `utils.ts:29–90` returns `mesh` — a bare `THREE.Mesh`, never `| undefined`. Its two siblings in the same interface **are** honest: `:38 getContactShadow(): THREE.Mesh | undefined`, `:40 getCamera(): THREE.PerspectiveCamera | undefined`.

The backing field is genuinely undefined until `setup()`:

```ts
useAmigaThree.ts:89    let sphereMesh: ReturnType<typeof tesselateSphere>;   // no initializer
useAmigaThree.ts:175   sphereMesh = tesselateSphere(...);                    // only assignment
useAmigaThree.ts:256   getSphere: () => sphereMesh,                          // closure defeats DAA
```

`tsconfig.json:7 "strict": true` (⇒ `strictNullChecks`), yet this compiles: TypeScript's definite-assignment analysis does not follow a `let` captured by a closure, so the lie is invisible to `npm run check`.

The seam pays for it. One value carries **three contradictory contracts across three files**:

```
useAmigaThree.ts:36   getSphere(): THREE.Mesh                      (non-nullable — the lie)
AmigaScene.vue:148    const mesh = three.getSphere(); if (mesh) {  (guards anyway — unexplainable from the type)
useSphereSpin.ts:29   getMesh: () => THREE.Object3D | undefined    (re-widens correctly)
```

A reader has no way to know whether `AmigaScene.vue:149`'s guard is required or superstition. It is required.

**Falsifier.** `strictNullChecks` off (refuted: `tsconfig.json:7`), or `tesselateSphere` returning `Mesh | undefined` (refuted: `utils.ts:90`).

---

### C-5 · **MINOR** — `useAmigaDemo()` publishes three dead library handles

```ts
useAmigaDemo.ts:155   return { animationGroup, pose, spinning, bouncingX, bouncingY };
AmigaScene.vue:56     const { animationGroup, pose } = useAmigaDemo();
```

Full consumer probe — 4 sites, none reading the three animations:

```
$ grep -rn "useAmigaDemo" demo test | grep -v "^demo/scenes/amiga/useAmigaDemo.ts"
demo/scenes/amiga/amigaKeys.ts:3      (prose)
demo/scenes/amiga/AmigaScene.vue:30   (import — destructures 2 of 5)
demo/scenes/amiga/AmigaScene.vue:56
demo/scenes/amiga/useAmigaThree.ts:8  (imports BOX_SIZE/FLOOR_Y/SPHERE_HOME/SPHERE_RADIUS only)
```

Why it lands on *this* axis: those three `CSSKeyframesAnimation` instances **are** the library surface the flagship scene exists to exercise. Publishing per-animation handles (each with its own `name`, `superKey`, `options`) and then reaching them only by string key through `getGroup().animations` (`scene-facility/index.ts:92`) means the typed per-channel surface is advertised and structurally unreachable — the facility's `ChannelHandle.animation` is `KeyframesAnimation<any>` (`scene-facility/index.ts:36`), so the typing is lost at the same seam.

**Falsifier.** Any consumer, test, or devtools path reading `spinning` / `bouncingX` / `bouncingY`.

---

### C-6 · **MINOR** — two shipped glass primitives shadowed by 8 lines of scoped CSS, in the one subject-scene that refused the register its sibling documented adopting. **Proposed shadow id: S-9** (extends lane-frontend S-1..S-8)

The scene names its own shadows:

```css
AmigaScene.vue:256-258   /* The themed paper-grid backdrop … */
AmigaScene.vue:259-263   background: linear-gradient(to bottom, var(--muted,…), var(--background,…));
AmigaScene.vue:264-265   /* J.W7a — the 1px inset stage-boundary hairline defining the glass stage's edge */
AmigaScene.vue:266       box-shadow: inset 0 0 0 1px var(--border);
```

glass-ui 7.0.0 ships both, and the demo reaches **neither** subpath (both sit in lane-frontend §3.1's unreached 52):

```
./surface         → Surface  { material, tier, surface, deep, shadow, grain, specular }
                    dist/components/surface/Surface.vue.d.ts
./paper-backdrop  → PaperBackdrop { class }
                    dist/components/paper-backdrop/index.d.ts
```

The sibling precedent is explicit and recent — `SquareScene.vue:1–11`:

> *"the square joins the I5 STAGE-CARD register: the drag arena gains the standard glass protagonist plate (`<Card surface="glass" tier="resting" :shadow="false">`, the SAME plate easing/spring/sequence stand on) instead of floating bare on the page grid — the subject finally has a stage. The plate's `rounded-card` resolves SQ-4 for free."*

`scenes.ts:145–152` marks amiga `stageMode: "subject"`, the same class as square and cube. Amiga is the only member that did not join.

**R2 corroboration.** The register is now enumerated exhaustively: `<Card>` is consumed by square (`SquareScene.vue:10`, import `:82`), easing (`EasingTarget.vue:11`, import `:136`), spring (`SpringTarget.vue:10`, import `:162`), sequence (`SequenceTarget.vue:8`, import `:136`). Cube has no plate at all (`CubeTarget.vue` — no `Card`), so it is *absent* from the register rather than *diverging* from it. And `grep -rn "rounded-card" demo/` returns exactly four hits: `AmigaScene.vue:15` is the only **usage**; the other three (`SquareScene.vue:7`, `SpringTarget.vue:4`, `StartingStyleTarget.vue:4`) are prose describing what `<Card>` supplies by construction. **AmigaScene is the only file in the tree that hand-applies the plate's radius token to a raw element.**

**Falsifier — and it is a live one.** The scene's stated reason is `:265` *"without a DOM layer or blocking the transparent composite"*. That is an assertion, not a measurement: `Card`/`Surface` would sit *behind* the `alpha:true` canvas, which is exactly what a transparent composite wants. But if either primitive paints an opaque layer **above** its default slot, or imposes an `overflow`/sizing clip that breaks the full-bleed canvas, the bespoke plate is correct and this finding dies. Note also that `AmigaScene.vue:6–12` (T.A10 / proof:stage-inventory) explicitly forecloses adding *any* DOM layer between canvas and page; if that ruling is binding, the only remedy left is a shared `.stage-plate` idiom in `design-idioms.css` sourcing the same tokens, and the finding reduces from "component not consumed" to "recipe not shared". **Feasibility of the swap: UNPROVEN-NEEDS-LIVE.** The divergence from the sibling register and the two unreached subpaths are proven statically.

---

### C-7 · **MINOR** — asymmetric `var()` fallback discipline inside 8 lines, with off-hue fallbacks that are light-mode-only

```css
AmigaScene.vue:259-263   var(--muted, hsl(0 0% 96%))  ·  var(--background, hsl(0 0% 100%))   ← fallbacks
AmigaScene.vue:266       var(--border)                                                        ← none
```

Three consequences, all from one visual unit:

1. **Split failure mode.** With the glass cascade missing (the C-1 state), `box-shadow: inset 0 0 0 1px var(--border)` is invalid-at-computed-value-time; `box-shadow` is non-inherited so it computes to its initial `none` and the hairline **silently vanishes** — while the gradient survives on its fallbacks. One unit, two behaviours.
2. **Off-hue fidelity.** The real tokens are warm paper — `--neutral-1: hsl(38 26% 95%)`, `--neutral-0: hsl(40 30% 98%)`. The hand-authored fallbacks are pure achromatic gray. A fallback that renders is a fallback that is wrong by 26 % saturation.
3. **Light-only.** Both fallbacks are light values with no `light-dark()` and no dark counterpart, so the fallback path yields a white stage to a dark-mode viewer.

**R2 corroboration — these are the only two of their kind in the tree:**

```
$ grep -rn "var(--[a-z-]*, *hsl\|var(--[a-z-]*, *#" --include="*.vue" --include="*.css" demo/
demo/scenes/amiga/AmigaScene.vue:261
demo/scenes/amiga/AmigaScene.vue:262
```

Two hits across 206 demo files. Every other consumer of the base palette trusts the glass-ui cascade bare — so the fallback is not a house convention AmigaScene follows, it is a house convention AmigaScene invented and then got wrong in three ways.

**Falsifier.** The tokens being guaranteed present (they are not on a clean `npm ci` — C-1), or a CSS `@property` registration giving `--border` an initial value (`grep -rn "@property" demo/styles/` → none).

---

### C-8 · **MINOR** — the `decay()` seed is a stale single-sample velocity, so drag → hold → release flings

```ts
useSphereSpin.ts:130-131   velY = dAngY / dt;  velX = dAngX / dt;     // set ONLY in onPointerMove
useSphereSpin.ts:149-152   const seed = (v) => Math.abs(v) > REST_SPEED ? decay({ velocity: v, friction }) : undefined;
```

`pointermove` does not fire while the pointer is stationary, so `velX`/`velY` retain the last *movement's* velocity however long ago it happened. `endDrag` hands that stale number straight to the engine's closed form, whose contract names the input precisely (`physics/decay.ts:26–27`):

> *"Release velocity (units/s) — the flick speed handed off at release."*

A sample from 900 ms ago is not the flick speed at release. Amplifier at `:118`: `const dt = Math.max((now - lastMoveTime) / 1000, 1e-3)` — a 1 ms floor turns one fast sample into up to 1000× the per-pixel rate before it reaches `decay`.

The covering test does not bite: `test/demo/scenes/amiga-sphere-spin.test.ts` synthesises move → release with no intervening pause, so the stale-sample path is never entered.

**Falsifier.** A `pointermove` that fires on a stationary pointer, or a staleness check in `endDrag` keyed on `lastMoveTime` — neither exists.

---

### C-9 · **MINOR** — two independent pause landlords over one present loop, with non-equivalent resume paths — **AMENDED in R2: limb 2 retired**

```ts
AmigaScene.vue:202-206   useSceneVisibilityPause(() => three.running, () => three.stop(), () => three.start());
AmigaScene.vue:212-223   useIntersectionObserver(sceneRootEl, ([e]) => e?.isIntersecting
                             ? (three.markRenderDirty(), three.start())
                             : three.stop(), { rootMargin: "200px" });
```

Both call `start()`/`stop()` on the same `RAFPlayback`, with no shared authority.

**Limb 1 — SURVIVES, and is the whole of C-9 in R2. The two resume paths are not equivalent, proven statically.** The IO re-entry calls `three.markRenderDirty()` first (`:215`). The visibility resume does not — `useSceneVisibilityPause.ts:49` invokes a bare `resume()`. At true rest (`renderDirty` false, controls settled, `onFrame()` returning false) the restarted loop renders **nothing**: `useAmigaThree.ts:206–214` gates the `renderer.render` on `renderDirty || controlsChanged || sceneLive`. If the GL context was lost while backgrounded — no `webglcontextlost`/`restored` handler exists anywhere in the tree — the canvas stays blank with the loop spinning. Note this limb is *strengthened* by C-16: since the IO can never fire its `else` arm, the visibility gate is the **only** live pause path, and it is the one missing the dirty-mark.

**Limb 2 — RETIRED. R1 wrote:** *"If the browser restores a scroll position that leaves the scene off-screen, whether the loop ends up running depends on whether the vueuse visibility watcher or the IO callback lands last."* **The tree contradicts the premise:** there is no scroll position to restore. See **C-16** — the shell is `overflow-hidden` at `h-dvh`, so the scene cannot be off-screen and the IO callback cannot land at all on a tab-return. The ordering hazard R1 described is unreachable; what remains is the *shape* of the hazard, which C-16 files as a latent-on-refactor risk rather than a live one.

**Falsifier (limb 1).** A `markRenderDirty()` inside `useSceneVisibilityPause`'s resume path, or a guarantee that WebGL contexts survive backgrounding (there is none). The `markRenderDirty` asymmetry is proven from source; the blank-canvas outcome requires an actual context loss and is **UNPROVEN-NEEDS-LIVE**.

---

### C-10 · **MINOR** — `AmigaPose.pz` is a write-never field carried through four surfaces and dropped by the re-seat

`pz` is declared first-class (`useAmigaDemo.ts:49–55`), but the group's `transform` never writes it:

```ts
useAmigaDemo.ts:79-87   if (typeof p.x === "number") pose.px = p.x;
                        if (typeof p.y === "number") pose.py = p.y;
                        if (r && typeof r.y === "number") pose.spin = r.y;   // no z, ever
```

Downstream, the field is half-plumbed: `AmigaScene.vue:129` copies it and `:154` renders it, but the re-seat capture (`:113–115`), the re-seat lerp (`:136–138`), and the PRM snap (`:108–111`) all omit it — and `reseatFrom.pz` (`:91`) is allocated and never assigned.

Currently harmless, which is exactly why this is MINOR and not MAJOR: `pose.pz` is provably always `SPHERE_HOME` (0). But the instant anyone authors a `position: { z }` keyframe, the ball parks off-plane after the first stop and never returns — and `mesh.position.set(px, py, pz)` will happily render it there.

**Falsifier.** Any `pose.pz` / `rendered.pz` write in the tree (`grep -rn "\.pz *=" demo/scenes/amiga/` → only `AmigaScene.vue:129`, which copies the write-never source), or removal of `pz` from `AmigaPose`.

---

### C-11 · **MINOR** — a production-shipped global window probe written by double-cast, while the repo already ships the typed idiom

```ts
AmigaScene.vue:184   (window as unknown as Record<string, unknown>).__kfAmigaProbe = { … };
AmigaScene.vue:228   delete (window as unknown as Record<string, unknown>).__kfAmigaProbe;
```

The in-tree correct idiom, three directories away:

```ts
demo/app/lifecycle/loaf-observer.ts:39   declare global { interface Window { __kfLoaf?: LoAFRecord[] } }
demo/app/lifecycle/loaf-observer.ts:60   const records: LoAFRecord[] = (window.__kfLoaf ??= []);   // no cast
```

The probe is also ungated by `import.meta.env.DEV`, so it ships in the `gh-pages` build — `vite.config.ts:194–196`'s `esbuild.drop: ["console","debugger"]` sits in the `production` (library) arm, not the demo SPA arm, and would not strip a property assignment in any case.

**R2 re-verification:** `grep -rn "__kf" demo/` returns exactly two probe families — this one, and `__kfLoaf`. AmigaScene is the only **scene** that mounts a window global, and the only one of the two that does so untyped. The two closures also pin `rendered` and the `sphereSpin` state for the mount's lifetime.

**Falsifier.** A `declare global` for `__kfAmigaProbe` anywhere (`grep -rn "__kfAmigaProbe" demo/` → 2 sites, both in `AmigaScene.vue`), or a `gh-pages` strip step for it. If the Playwright `proof:amiga-decay-visible` gate runs against the **production** bundle, the probe is load-bearing there and this drops to INFO with a "document the intent" remedy.

---

### C-12 · **INFO** — the scene declines the library's `Vars` generic and pays for it in runtime `typeof` guards

The library offers the parameter:

```ts
engine/css/css-animation.ts:44    export class CSSKeyframesAnimation<V extends Vars = Vars, …>
engine/css/css-animation.ts:131   fromKeyframes(keyframes: Map<string, Partial<V>> | Record<string, Partial<V>>,
                                                transform?: TransformFunction<V>)
constants/types.ts:39-41          export type Vars<T = any> = { [arg: string]: number | string | T };
```

With the default `T = any`, every authored field is `any`. `useAmigaDemo.ts:93,110,127` construct without a type argument, so `transform(vars: Vars)` (`:79`) receives `any` and must guard at runtime (`:81–86`). An `interface AmigaVars extends Vars { position: { x: number; y: number }; rotation: { y: number } }` handed to `CSSKeyframesAnimation<AmigaVars>` would type-check the keyframe literals against the pose sink and delete the guards — turning three silent-drop `if`s into compile errors.

**Falsifier.** `Vars`'s index signature making a narrowed instantiation unassignable — it does not; `Partial<V>` accepts a narrowed shape.

---

### C-13 · **INFO** — the authored channel name and the rendered axis disagree, and one id carries three names in one folder

The authored keyframes say `rotation: { y }` (`useAmigaDemo.ts:99–103`); the consumer applies it about `tiltAxis = (sin 0.28, cos 0.28, 0)` (`AmigaScene.vue:76–80, 150`) — not y. Documented at `useAmigaDemo.ts:53`, so it is legibility debt, not a bug — but it means the CSS-shaped authored surface (the thing the demo exists to showcase) is a lie about the geometry.

Compounding, in the same folder: `AMIGA_SCENE_ID` (`amigaKeys.ts:5`) → aliased `SCENE_ID` (`useAmigaDemo.ts:60`) → re-bound `superKey` (`AmigaScene.vue:42`). Three names, one string `"amiga"`, in a keyspace whose whole point (T.B9) was to have exactly one.

**Falsifier.** None needed — both are direct reads.

---

### C-14 · **out-of-axis referral** (uncounted) — `dispose()` leaks two textures and two helpers per mount

`useAmigaThree.ts:226–235` traverses `if (obj instanceof THREE.Mesh)`, so both `GridHelper`s — `LineSegments`, not `Mesh` (`:145`, `:151`) — are never disposed. And `material.dispose()` does not dispose `material.map`, so both `CanvasTexture`s leak (`makeShadowTexture()` `:74`; `tesselateSphere` `utils.ts:58`). Scenes remount on every swap — keyed `<Suspense>`, **no** `KeepAlive` (`useSceneVisibilityPause.ts:6–8`). **Referred to the runtime/perf lane**: three.js is outside the consumption axis and I do not count it here.

---

## 3. Defects new in revision 2

### C-15 · **MAJOR** — the PRM posture is **inverted**: the 0.4 s settle is gated, the infinite full-amplitude bounce is not. `respectReducedMotion` is unconsumed on the group **and** all three animations

*(Not present in R1. This is the more consequential of the two unconsumed-affordance findings — C-2 costs a kink, C-15 costs an accessibility guarantee.)*

**The gate is armed only where it does not matter.** `AmigaScene.vue:58` `const prm = usePreferredReducedMotion()`; `:106–123` uses it for exactly one thing — snapping the stop-transition re-seat:

```ts
AmigaScene.vue:106-112
if (wasPlaying && !playing) {
    if (prm.value === "reduce") { rendered.px = SPHERE_HOME; rendered.py = SPHERE_HOME; rendered.spin = 0; reseat = undefined; }
```

**The motion that dominates the scene is ungated.** All three group members are built with no reduced-motion policy:

```
useAmigaDemo.ts:93-97    new CSSKeyframesAnimation({ duration: X_PERIOD_MS, iterationCount: Infinity, timingFunction: "linear" })
useAmigaDemo.ts:110-114  new CSSKeyframesAnimation({ duration: X_PERIOD_MS, iterationCount: Infinity, timingFunction: "linear" })
useAmigaDemo.ts:127-131  new CSSKeyframesAnimation({ duration: Y_PERIOD_MS, iterationCount: Infinity, timingFunction: "cubic-bezier(0.36,0,0.66,1)" })
useAmigaDemo.ts:153      new AnimationGroup(spinning, bouncingX, bouncingY)      ← no options object at all
```

The library ships the switch on both tiers, defaults it **off**, and routes `play()` through it:

```
src/animation/constants/defaults.ts:87   respectReducedMotion: false
src/animation/group/group.ts:57          respectReducedMotion = false;
src/animation/group/lifecycle.ts:79-80   return beginPlay(group, () => withReducedMotion(group.respectReducedMotion,
                                              () => playReducedMotion(group), () => { … }));
```

**Nothing downstream arms it.** The demo's own store default *is* `true` — `demo/state/animationOptionsStore.ts:49 respectReducedMotion: true` — but that value lives in the `localStorage`-backed **stored options** the controls panel edits; no code path writes it onto a live animation. Full probe:

```
$ grep -rn "respectReducedMotion" demo/
demo/app/transition/useSceneSwap.ts:28,45           new SpringProgress({ respectReducedMotion: true })
demo/state/animationOptionsStore.ts:49              (stored default — never applied to a live animation)
demo/components/instrument/transport/controls-pane/ControlsPaneWrapper.css:142   (prose)
demo/components/instrument/shell/TypingDots.vue:83,91                new SpringProgress({ respectReducedMotion: true })
demo/components/playback/AnimationVisualizer.vue:147                 new SpringProgress({ respectReducedMotion: true })
```

Zero assignments to `animation.options.respectReducedMotion` or `group.respectReducedMotion`. The only writes to any live animation option anywhere in the demo are `TimingFunctionPanel.vue:145` and `useTimingFunctionEditor.ts:102`, both `timingFunction`.

**The inversion is sharper still at the `SpringProgress` seam.** Three sibling demo sites construct the *same class the scene imports at line 24* with the option armed (the three greps above). `AmigaScene.vue:116–120` is the **only** `SpringProgress` construction in the demo that omits it — and then hand-writes, at `:107–111`, the snap the library would have delivered: `progress.ts:206–250`'s `set target` routes through `withReducedMotion` to `_snapSettled()`, which jumps to target, zeroes velocity, sets `isSettled`, emits once, and stops the playback.

**Failure scenario.** A user with `prefers-reduced-motion: reduce` opens the amiga scene and presses play. The ball traverses 10 world units of large-amplitude translation on an 8 s infinite loop (`WALL_X = 5`, `useAmigaDemo.ts:30`), slams floor↔apex on a 1.6 s loop (`FLOOR_Y = −4` → `APEX_Y = 2`), and spins ±π — indefinitely, at 100 % amplitude. The only motion the OS preference suppresses is the sub-half-second homing settle.

**Mitigations, stated honestly.** The group plays only on explicit user PLAY (no `autoPlays` on the expose — `AmigaScene.vue:234–240`), and the transport offers pause, so WCAG 2.2.2 has an escape hatch. This is a 2.3.3-class (AAA) and library-consumption defect, not a hard blocker. Note also that `reducedMotionScale` (`internal/reduced-motion.ts:125`) supports a *numeric intensity*, so the remedy need not be a binary snap of the flagship demo — `respectReducedMotion: 0.3` keeps the trajectory and shrinks the excursion, which is exactly what a showcase scene wants.

**Falsifier.** Show any code path that sets `respectReducedMotion` (or an amplitude scale) on `animationGroup`, `spinning`, `bouncingX`, or `bouncingY` before play. Or show `AnimationGroup`'s constructor inheriting the flag from a member — it does not; `group.ts:57` is a plain field initialiser and `useAmigaDemo.ts:153` passes no options.

---

### C-16 · **MAJOR** — the I.W3 S2 occlusion pause **cannot fire**: a dead runtime authority carrying a false invariant, in a shell that has no scroll

*(Not present in R1; and it retires R1's C-9 limb 2, which assumed the opposite.)*

```ts
AmigaScene.vue:208-223
// I.W3 S2 — the just-in-time occlusion pause over the live WebGL canvas: an
// IntersectionObserver stands the present loop down when the scene scrolls
// off-screen and re-arms a viewport ahead of re-entry.
useIntersectionObserver(sceneRootEl, ([entry]) => {
    if (entry?.isIntersecting) { three.markRenderDirty(); three.start(); }
    else { three.stop(); }
}, { rootMargin: "200px" });
```

**The scene cannot scroll.** Walking the containment chain from the viewport down to `sceneRoot`:

```
demo/components/instrument/shell/EditorShell.vue:3
  class="editor-shell relative grid h-dvh max-h-dvh w-dvw overflow-hidden place-items-center bg-background"
demo/components/instrument/shell/EditorShell.vue:74
  <main class="grid place-items-center place-self-stretch">
demo/components/instrument/transport/AnimationControlsGroup.vue:64-67
  <div class="stage-cell justify-self-stretch self-center min-h-0 h-full overflow-visible overscroll-contain">
      <slot name="animation-content"></slot>
demo/scenes/amiga/AmigaScene.vue:2-5
  <div ref="sceneRoot" class="scene-root relative h-full w-full">
```

The shell root is `overflow-hidden` at exactly `h-dvh` / `w-dvw`: there is no page scroller. The only intermediate box is `overflow-visible`. `AnimationControlsGroup.vue:55–57` further records that on mobile *"the stage takes the fixed full-bleed layer"* — and a `position: fixed` box is measured against the viewport, so it is always intersecting. With `rootMargin: "200px"` on top of that, the `else { three.stop() }` arm is **unreachable**.

Note the distinct thing an `IntersectionObserver` does *not* measure: **occlusion**. The mobile controls sheet covering the stage does not change the intersection ratio. So the one scenario a reader might reach for to save this arm — "the sheet covers it" — does not fire it either.

**What actually happens at runtime.** The `isIntersecting` arm fires exactly once, on the observer's initial delivery at mount, where both statements are already redundant: `useAmigaThree.setup()` ends with `renderDirty = true; start();` (`:194–195`), invoked one statement earlier at `AmigaScene.vue:176`.

**Failure scenario (why this is MAJOR, not dead-code hygiene).** Three costs, none of them "wasted CPU":

1. **A false invariant in the file.** `:208–211` asserts a runtime guarantee — *"stands the present loop down when the scene scrolls off-screen"* — that the shell forbids. The next reader budgets for occlusion handling that does not exist, and any future decision to make the stage scrollable will silently *activate* an untested code path.
2. **A second authority over a loop whose sole other authority is honesty-contracted.** `useSceneVisibilityPause.ts:20–24` is explicit that *"the gate only resumes what IT paused"* — a discipline that exists precisely because a second stopper corrupts it. Today the IO can only ever `start()`, so the corruption is latent; the shape of the hazard is real and undocumented.
3. **It masks C-9 limb 1.** Because the IO is the arm that calls `markRenderDirty()` and the visibility gate is the arm that does not, a reader comparing the two paths concludes the dirty-mark is covered somewhere. It is not: the only *live* resume path is the one missing it.

**Falsifier — and it is a cheap one.** Point to any ancestor of `sceneRoot` with `overflow: auto|scroll` between it and the viewport, or any transform that translates the stage more than 200 px outside the viewport while mounted. I walked the full chain above. If such a scroller exists, the "unreachable" claim dies and this collapses back into R1's C-9 limb 2 (live ordering hazard, MINOR).

---

### C-17 · **MINOR** — two concurrent `RAFPlayback` loops with no frame identity between them

The scene owns a present loop; the group owns a separate playback loop; the pose crosses between them with no frame stamp.

```
useAmigaThree.ts:97          const present = markRaw(new RAFPlayback());          ← loop A (scene)
src/animation/group/group.ts:87   readonly playback = new RAFPlayback();          ← loop B (group)
src/animation/group/lifecycle.ts:93   group.playback.loop(group._boundFrame);
useAmigaDemo.ts:79-87        transform(vars) { pose.px = …; pose.py = …; pose.spin = … }   ← written on loop B
AmigaScene.vue:127-131       rendered.px = pose.px; …                                       ← read on loop A
```

Neither side carries a frame identity; nothing asserts which callback ran first this frame.

**Failure scenario.** rAF callbacks execute in registration order. Loop A is armed at mount (`useAmigaThree.ts:195`, via `AmigaScene.vue:176`); loop B is armed by `play()` from a click handler — an arbitrary point relative to A's already-scheduled callback for the current frame. The scene therefore renders either this frame's pose or the previous frame's, deterministically per session but **unspecified by construction**. At the authored 2.5 world-units/s that is up to one frame of world-space lag at 60 Hz — imperceptible in practice, which is why this is MINOR. **The defect is the missing contract, not the current pixels**: the whole T.A7 single-writer apparatus (`useAmigaDemo.ts:41–48`) is built to make the pose hand-off race-free, and it establishes *who writes*, never *when*.

**Falsifier.** Instrument both callbacks' `performance.now()` and show the group's `transform` always precedes the scene's `onFrame` within a frame. If it does, the lag is 0 and this drops to INFO ("undocumented ordering dependency"). **Lag magnitude: UNPROVEN-NEEDS-LIVE.** The absence of an ordering contract is source-proven.

---

### C-18 · **MINOR** — `lastFrameAt` is not re-armed across a present-loop stop/start, so the first `tickDt` after a resume receives the whole pause

```ts
AmigaScene.vue:92    let lastFrameAt = 0;
AmigaScene.vue:98-100  const now = performance.now();
                       const dt = lastFrameAt === 0 ? 16 : now - lastFrameAt;
                       lastFrameAt = now;
AmigaScene.vue:134     reseat.tickDt(dt);
```

The `0` sentinel is honoured exactly once and never re-armed. The present loop is stopped and restarted by two authorities that know nothing of this clock: `useSceneVisibilityPause` (`:202–206`) and the IO (`:212–223`).

**Failure scenario.** A re-seat is mid-flight when the tab is backgrounded → `three.stop()` (`useSceneVisibilityPause.ts:41`). Ten minutes later the tab returns → `three.start()` → the first `onFrame` computes `dt ≈ 600 000` and calls `reseat.tickDt(600000)`. Benign **today**, and only by luck of the consumer: `SpringProgress` is analytic (`progress.ts:262` → `_stepSeconds`), so it evaluates at t = 600 s, returns the settled value, and the ball snaps home. Any future `dt` consumer that integrates rather than evaluates — a Euler step, a velocity accumulator, a clamped easing — blows up on the same line.

The instructive contrast is inside the same folder: `useSphereSpin`'s glide reads absolute wall-clock (`useSphereSpin.ts:169` `(performance.now() - glideStart) / 1000`) and is immune to pauses by design. The scene's own delta clock is the one carrying the hazard.

**Falsifier.** Show `lastFrameAt` re-armed on `start()` (it is not — `useAmigaThree.ts:198–217` touches no scene state), or show `SpringProgress` clamping `dt` (`progress.ts:262–266` does not). Or argue no re-seat can be live at pause time — it can: pause the group, then background the tab within the 0.4 s response window.

---

### C-19 · **MINOR** — a dead `computed` import, and **no gate in the repo can see it**

```ts
AmigaScene.vue:21   import { computed, onBeforeUnmount, onMounted, useTemplateRef } from "vue";

$ grep -n "computed" demo/scenes/amiga/AmigaScene.vue
21:import { computed, onBeforeUnmount, onMounted, useTemplateRef } from "vue";
```

One occurrence — the import itself. The 17-line template (`:1–18`) contains no `computed` either.

**Failure scenario — the finding is the gate gap, not the line.** The runtime cost is ~zero (tree-shaken). The cost is that this rot class has no floor anywhere in a 58-`.vue` / 71-composable demo:

- `package.json` → `"lint": "depcruise src"` — the **demo tree is not linted at all**, and there is no ESLint / oxlint / biome config in the repo root (`ls -a | grep -i "eslint\|oxlint\|biome"` → empty).
- `package.json` → `"check": "tsc --noEmit"` does cover `demo/` (`tsconfig.json` `include: ["src/", "demo/"]`), but `compilerOptions` carries `strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `verbatimModuleSyntax` and **no** `noUnusedLocals` / `noUnusedParameters`.

Worth naming on the consumption axis specifically: an unused *import specifier* is the same class of invisibility that lets C-5's three dead handles and C-10's write-never field persist. One `noUnusedLocals` flag closes all three detection gaps.

**Falsifier.** Any gate that fails on this line — run `npm run lint` (scans `src` only) or `npm run check` (no unused-locals rule). Or a template usage of `computed`.

---

### C-20 · **MINOR** — a dead asset committed inside the scene folder

`demo/scenes/amiga/checkerboard.jpg` exists in the scene directory and is referenced by nothing:

```
$ grep -rn "checkerboard" demo/ src/
demo/scenes/amiga/utils.ts:48            (comment — "checkerboard-isomorphic")
demo/scenes/sequence/SequenceTarget.vue:6,48   (comments — an unrelated layout metaphor)
```

No `import`, no `?url`, no `src=`, no CSS `url()`, no `import.meta.glob`.

**Failure scenario.** The checker board is generated procedurally at runtime — `utils.ts:36–58` paints a 1024×1024 offscreen canvas and wraps it in a `THREE.CanvasTexture` (`:58`) — so the JPEG is the retired predecessor of that code path. Vite will not bundle an unreferenced asset, so there is no ship-size cost; the cost is a false lead sitting in the folder for the next reader ("the ball must be textured from this file"), directly adjacent to the file that would use it.

**Falsifier.** Any reference by path, glob, or build config — `grep -rn "checkerboard\|\.jpg" demo/ vite.config.ts` finds none outside the three comments above.

---

## 4. Superlatives (L-18 runs both ways)

### S+1 — the LIGHT/HEAVY firewall is respected **exactly**, across all four files

The complete set of library/deep imports in the folder:

```
$ grep -rn 'from "@mkbabb/keyframes.js"\|from "@kf-engine"\|@src/' demo/scenes/amiga/
useSphereSpin.ts:9    import { decay, type DecaySample } from "@mkbabb/keyframes.js";
useAmigaDemo.ts:1     import type { Vars } from "@mkbabb/keyframes.js";
useAmigaDemo.ts:2     import { kfEngine } from "@kf-engine";
AmigaScene.vue:24     import { SpringProgress } from "@mkbabb/keyframes.js";
useAmigaThree.ts:3    import { RAFPlayback } from "@mkbabb/keyframes.js";
```

Five lines, and every static symbol is LIGHT and value.js-grammar-free (`physics/decay.ts:15–16` "LIGHT module: zero static `@mkbabb/value.js` edge"; `SpringProgress`/`RAFPlayback` are the named light engines at `internal/leaves.ts:2–3`). The two HEAVY symbols — `CSSKeyframesAnimation`, `AnimationGroup` — arrive **only** through `kfEngine()` (`useAmigaDemo.ts:65`), i.e. the memoized `loadAnimationEngine()` dynamic boundary (`kf-engine.ts:27,39`), which lane-library §3.3 names as *the* value.js firewall (`load-engine.ts:124`). Zero deep `@src/animation/*` paths. No scene in the tree consumes the boundary more cleanly.

**Falsifier.** A static `import { CSSKeyframesAnimation }` or `import { AnimationGroup }`, or any `@src/` path, in the amiga tree — the grep above is exhaustive and finds none.

### S+2 — **structurally zero R1 parser exposure**, and it is a real contrast, not an accident of scope

The scene's only value.js edge is `@mkbabb/value.js/math` (`AmigaScene.vue:26`; also `scene-facility/index.ts:24` on the seam) — the subpath keyframes.js itself certifies (`internal/leaves.ts:6–14`):

> *"the tree-shakeable `@mkbabb/value.js/math` subpath … is `parse-that`-FREE (a 2-module / ~1.4 KB graph, 0 CSS-grammar / 0 parse-that / 0 engine modules — VERIFIED by the `proof:boundary` W97 `math-subpath-clean` clause)"*

**R2 re-verification against the installed artifact** (the library's own claim, checked independently):

```
$ node -e "const s=fs.readFileSync('node_modules/@mkbabb/value.js/dist/subpaths/math.js','utf8');
           console.log((s.match(/^import.*/gm)||['NONE']).join())"
NONE
$ wc -c node_modules/@mkbabb/value.js/dist/subpaths/math.js   →  1110
```

1 110 bytes, zero import statements, exporting `clamp · cubicBezier · cubicBezierToString · deCasteljau · interpBezier · lerp · lerpArray · logerp · scale`. No `parseCssColor` / `parseCssScalar` / `parseCssValues` / `parseTimingFunction` call reaches this tree. The contrast with its nearest sibling is exact: lane-library §4.6 names `demo/scenes/square/useSquareTumble.ts:22 parseCssColor(css)` as **the known R1 crash surface**, and square is the same `stageMode: "subject"` family. Amiga's color path takes `getComputedStyle` + a `var()` unwrap instead (`utils.ts:14–27`), which is *why* the crash class cannot reach it.

**Falsifier.** Any `@mkbabb/value.js/{css,color,value,easing,transform}` import in the folder — grep returns `/math` only.

**The honest half of the same finding.** `utils.ts:15`'s hand-rolled `/^var\(\s*(--[\w-]+)\s*(?:,\s*([^)]+))?\)$/` cannot match a **nested** fallback: for `var(--a, var(--b, red))` the `[^)]+` class cannot cross the inner `)`, the anchored `\)$` then fails, and the raw string falls through to a `fillStyle` Canvas2D silently ignores. Unreachable today — the sole call site passes `"var(--amiga-red)"` (`useAmigaThree.ts:175`) and `--amiga-red: var(--rainbow-red)` is a plain single-level alias (`design-idioms.css:24`). Latent, and correctly *outside* R1's blast radius: 13 lines of `var()` unwrap is not a color grammar, and routing it through value.js's parser would *add* the exposure this scene currently lacks.

### S+3 — allocation-free per-frame compose, with the single-writer discipline holding under grep across three cooperating units

`AmigaScene.vue:76–83` pre-allocates every THREE scratch object per instance (`tiltAxis`, `qSpin`, `qGesture`, `eGesture`); `onFrame` (`:94–172`) mutates in place throughout — `setFromAxisAngle`, `set`, `setFromEuler`, `copy().multiply()`, `setScalar` — and allocates nothing on the hot path. The one `new` is the once-per-stop `SpringProgress` (`:116`). The pose sink is a plain non-reactive object held deliberately outside Vue's reactivity (`useAmigaDemo.ts:69–74`), and `RAFPlayback` is `markRaw`'d (`useAmigaThree.ts:97`).

The one-mesh-writer claim (T.A7) survives verification:

```
$ grep -rn "mesh\.\(quaternion\|position\|rotation\)\|Object.assign" demo/scenes/amiga/
AmigaScene.vue:153   mesh.quaternion.copy(qGesture).multiply(qSpin);
AmigaScene.vue:154   mesh.position.set(rendered.px, rendered.py, rendered.pz);
```

Those are the **only** per-frame mesh writes (the one further seat, `useAmigaThree.ts:176 sphereMesh.position.set(...)`, is a one-time construction seat before the loop arms). `useSphereSpin` writes only its own `offset` (`:126–127`, `:174`, `:181`); `useAmigaDemo`'s `transform` writes only `pose` (`:81–86`). Three units, one writer, no last-wins race — and `test/demo/scenes/amiga-sphere-spin.test.ts:8–13` is the regression lock that keeps it that way.

**Falsifier.** A second `mesh.rotation` / `mesh.position` / `Object.assign(mesh` writer — the grep above is exhaustive.

### S+4 — the render-on-demand liveness contract is consumed **exactly** as specified, and tightly

`useAmigaThree.ts:80–84` demands the injection *"MUST return whether the scene is LIVE this frame (group playing / glide / re-seat) so the present loop can skip the render at rest"*. `AmigaScene.vue:171` returns precisely that disjunction — and it is **tight in both directions**, which is the hard part:

- No **over**-reporting (which would defeat the idle): `sphereSpin.isGliding()` is `!!(glideX || glideY)` (`useSphereSpin.ts:242`), and `tickGlide` clears each sampler *in the same pass* it falls under `REST_SPEED` (`:176–184`) — so the flag drops on the exact frame the glide dies.
- No **under**-reporting (which would drop frames): the three drivers are exhaustive, and OrbitControls' own damping settle is handled independently by `controls.update()`'s return value (`useAmigaThree.ts:203`), not folded into the scene's flag.

**Falsifier.** A live state the disjunction misses. Enumerating the mutators of `rendered`/`offset`/the camera: group compositor, glide, re-seat, OrbitControls — all four are covered, three by the return and one by `controlsChanged`.

### S+5 — **new in R2** — the one cross-package runtime edge is DECLARED *and* LOCKED, which is the exact inverse of C-1

```
package.json:69           "@mkbabb/value.js": "4.0.0"
package-lock.json:611     "node_modules/@mkbabb/value.js": { … }
```

AmigaScene's sole *import-graph* external dependency survives `npm ci` with a pinned version and a lock entry. Placed beside **C-1** — where the scene's entire *visual* dependency is undeclared, unlocked, and invisible to import-graph tooling — this is the sharpest available illustration of the tranche's dependency-hygiene split: the same file is best-in-class on the edge a bundler can see and worst-in-class on the edge only the cascade can see. Any remediation of F-1 should take this line as the model.

**Falsifier.** `@mkbabb/value.js` absent from `package-lock.json`, or declared as a range rather than a pin. Both re-checked 2026-08-04.

### S+6 — **new in R2** — zero hand-rolled `requestAnimationFrame` in a WebGL scene: both loops ride library drivers

```
$ grep -rn "requestAnimationFrame" demo/scenes/amiga/   → (no output)
```

For a scene that owns a WebGL present loop, a pointer-drag gesture, a frictional release glide, and a spring re-seat — four independent frame consumers — this is not the default outcome. The present loop is `RAFPlayback` (`useAmigaThree.ts:95–97`, comment: *"the scene owns NO hand-rolled rAF"*); the glide is the engine's shipped analytic `decay()` closed form sampled by wall-clock (`useSphereSpin.ts:9,149–157,166–187`) rather than a hand-integrated friction step; the re-seat is `SpringProgress.tickDt` driven off the same present loop.

This matters against the constellation grand-audit's **PRM-RAF epidemic** (~40 ungated loops across 11 repos): the amiga scene is structurally immune to that class by consuming the library's driver instead of the platform's primitive. It is also the reason C-15's remedy is cheap — the frame plumbing to honour an amplitude scale already exists.

**Falsifier.** A raw `requestAnimationFrame` / `setInterval` / `setTimeout`-driven loop anywhere in the folder — the grep above is exhaustive over all five files.

---

## 5. Corpus reconciliation

| prior | this lane (R2) |
|---|---|
| **F-1** (glass-ui phantom dep, RED) | **Extended, not contradicted.** C-1 shows the blast radius reaches a component with *zero* glass-ui imports — so F-1's own detection grep under-reports. Amiga is the highest-ratio victim and the hardest to find. R2 re-ran all four token probes; all still empty. |
| **lane-frontend §4** classes `amiga/AmigaScene.vue` as **b** (no glass-ui import) | **Correct on the letter, misleading on the substance.** Accurate as an import census; C-1/C-6/C-7 show the *token* dependency is total. Recommend the census carry a "token-dependent, import-free" mark. |
| **S-1..S-8** shadow census | **Extended with S-9** (C-6): `Surface` + `PaperBackdrop`, ~8 CSS lines, AMBER, evaluate-not-swap. R2 adds the enumeration that makes it precise: `<Card>` is consumed by square/easing/spring/sequence, cube has no plate, and `AmigaScene.vue:15` is the **only** `rounded-card` *usage* in the tree (the other three hits are prose). |
| **lane-library §4.6** R1 surfaces | **Confirmed by absence, and independently re-verified.** Amiga is not on the list; S+2 gives the structural reason plus a fresh byte-level probe of the installed `/math` artifact and the sibling contrast (`useSquareTumble.ts:22`). |
| **lane-library LEG-3** (math leaves re-export) | **Confirmed downstream.** `AmigaScene.vue:26` imports `clamp`/`lerp` from `@mkbabb/value.js/math` directly rather than through kf — correct, because `src/animation/index.ts` does **not** re-export the leaves publicly. Not a defect: the demo has no kf-side path to them. R2 adds the census: 25 demo files take this route; AmigaScene is the only one that needs `lerp` as well as `clamp`. |
| **lane-library §7.5** (5 parse failure postures) | **Out of reach here.** No parse posture touches amiga. |
| **this file, revision 1 (2026-08-03)** | **12 of 13 carried verbatim and re-verified. C-9 amended: limb 2 (off-screen ordering hazard) is RETIRED** — the shell is `overflow-hidden h-dvh` with no scrolling ancestor, so the premise is false; see C-16. Limb 1 (the `markRenderDirty` asymmetry) survives and is *strengthened* by C-16, since the visibility gate is now the only live resume path. R1's four superlatives all survive re-verification. |

---

## 6. Provenance

Every claim above is a direct read of `/Users/mkbabb/Programming/keyframes.js` (READ-ONLY evidence) or of its installed `node_modules/@mkbabb/{glass-ui,value.js}/dist/` — the copies the demo already resolves against, so every proposed replacement is available without an upgrade. Nothing in keyframes.js, glass-ui, or value.js was written, mutated, installed, built, or executed. No dev server, no browser, no Playwright, no DevTools. The single write of this lane is this file.

**Eight claims are marked UNPROVEN-NEEDS-LIVE** and are deferred to the SS-13 visual audit rather than asserted: C-2's kink magnitude, C-3's dark-mode legibility, C-6's swap feasibility, C-9's blank-canvas outcome, C-11's gate dependency, C-15's visual amplitude under an active `prefers-reduced-motion: reduce`, C-16's falsifier walk, C-17's frame-lag count. Their *static* halves are proven and stand on their own.
