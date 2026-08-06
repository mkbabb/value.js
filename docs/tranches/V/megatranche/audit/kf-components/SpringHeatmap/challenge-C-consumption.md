claude-opus-5[1m]

# CHALLENGE · SpringHeatmap · axis C (CONSUMPTION)

**Target:** `/Users/mkbabb/Programming/keyframes.js/demo/scenes/spring/SpringHeatmap.vue` (338 lines)
**Axis:** how this component consumes keyframes.js (the library) and glass-ui (the design system) — subpath choices, shadow components, value.js transitive exposure, props/emits contract, integration seams with siblings.
**Mode:** static, read-only. No installs, no dev servers, no browser tooling. Every glass-ui primitive claim is sourced from the copy already installed at `keyframes.js/node_modules/@mkbabb/glass-ui@7.0.0` — no upgrade is implied by any finding.
**Corpus folded:** `docs/tranches/V/megatranche/formation/keyframes/lane-frontend.md` (F-1 phantom dep; S-1..S-8 shadow census; §3.1 subpath utilisation 21/73), `lane-library.md`.
**Posture:** the component was assumed DEFECTIVE until the tree proved otherwise. Three candidate defects were killed by their own falsifiers and are recorded in §5 so the kill is auditable.

**Tally: 1 BLOCKER · 4 MAJOR · 6 MINOR (11 defects) · 3 SUPERLATIVES.**

---

## 0. The consumption surface, exactly

Four imports (`SpringHeatmap.vue:58–63`):

| line | import | package | declared? |
|---|---|---|---|
| 58 | `computed, onMounted, useTemplateRef, watch` | `vue` | devDep `^3.5.35` |
| 59 | `useResizeObserver` | `@vueuse/core` | devDep `^14.3.0` (matches glass-ui peer `^14.0`) |
| 60 | `useGlobalDark` | `@mkbabb/glass-ui/dark` | **UNDECLARED — F-1** |
| 61 | `clamp` | `@mkbabb/value.js/math` | dep `4.0.0` ✅ |
| 63 | `type SpringDemoContext` | `./springKeys` | local |

Zero keyframes.js imports. One glass-ui subpath (`/dark`, 1 of 73). One value.js subpath (`/math`, one pure numeric function).

This component inherits **F-1** wholesale: `@mkbabb/glass-ui` appears in neither `package.json` nor `package-lock.json` (`grep -c "glass-ui" package-lock.json` → 0), yet 7.0.0 sits in `node_modules`. `SpringHeatmap.vue:60` is one of the 82 import lines that `npm ci` cannot resolve on a clean checkout. Note the asymmetry inside this one file: line 61's package **is** the repo's sole declared runtime dependency (`"@mkbabb/value.js": "4.0.0"`, `package.json:69`) and its `./math` subpath **is** in the exports map (`dist/subpaths/math.js`, `clamp(value, min, max)` verified in `dist/subpaths/math.d.ts:1`); line 60's package is a phantom. Nothing below is reproducible until F-1 lands — cited, not re-litigated.

---

## 1. BLOCKER

### B-1 · Raw `light-dark()` token streams are fed to `ctx.fillStyle`; Canvas2D rejects them silently and the field paints solid black

**Severity: BLOCKER.** `SpringHeatmap.vue:114–125, 152–153, 170`.

`resolveTone` and `resolveSurface` return **unresolved CSS custom-property token streams**, which line 170 interpolates straight into a canvas paint:

```
114  function resolveTone(el: HTMLElement): string {
115      const cs = getComputedStyle(el);
117          cs.getPropertyValue("--ball-tone").trim() ||
118          cs.getPropertyValue("--color-progress").trim() ||
119          "hsl(142 71% 45%)"
...
170          ctx.fillStyle = `color-mix(in oklab, ${tone} ${mix}%, ${surface})`;
```

Neither `--color-progress` nor `--background` is a registered custom property (`@property` registrations in this tree: only `--rail-width`, `demo/styles/design-idioms.css:60`). An **unregistered** custom property computes to its specified token stream with `var()` substituted — and *nothing else*. Resolving the chain:

| token | definition | computed token stream |
|---|---|---|
| `--color-progress` | `var(--accent-kf)` — `demo/styles/style.css:163` | ↓ |
| `--accent-kf` | `light-dark(oklch(0.56 0.17 295), oklch(0.74 0.13 305))` — `style.css:130` | `light-dark(oklch(0.56 0.17 295), oklch(0.74 0.13 305))` |
| `--background` | `var(--neutral-0)` — glass-ui `dist/glass-ui.css` | ↓ |
| `--neutral-0` | `light-dark(hsl(40 30% 98%), hsl(24 9% 4%))` — glass-ui | `light-dark(hsl(40 30% 98%), hsl(24 9% 4%))` |

So the string actually assigned at line 170, in **both** themes, is:

```
color-mix(in oklab, light-dark(oklch(0.56 0.17 295), oklch(0.74 0.13 305)) 42%, light-dark(hsl(40 30% 98%), hsl(24 9% 4%)))
```

`light-dark()` is a computed-value-time function that resolves against the element's `color-scheme`. `ctx.fillStyle` has no such context, and per the HTML canvas spec a `fillStyle` string that fails to parse as a CSS `<color>` is **silently ignored** — the assignment is a no-op and the previous `fillStyle` persists. Since `paint()` never seats a known-good baseline, a first-cell failure leaves the canvas's *initial* `fillStyle` (`#000000`) in force, and every subsequent assignment fails identically: **400 opaque-black rects, no console error, no gradient, in both themes.**

This is not my inference alone. The design system this file already imports ships the cure, and its docblock is a bug report written in advance — `node_modules/@mkbabb/glass-ui/dist/composables/glass/canvas2d/resolveCanvasColor.d.ts`:

> *"@param cssVar a `--custom-property` NAME … OR a full CSS color value (`light-dark(...)`, `color-mix(...)`, …)"*
> *"@example // A `light-dark()` `--foreground` token that Canvas2D would reject raw:*
> *`ctx.strokeStyle = resolveCanvasColor("--foreground", canvas);`*
> *`// → "rgb(28, 25, 23)" in light, "rgb(250, 250, 249)" in dark — **NOT black**."*

The producer names the exact token family (`light-dark()`), the exact API (`fillStyle`/`strokeStyle`), and the exact symptom (black). `resolveCanvasColor` is exported from the `./canvas` subpath of the **installed** 7.0.0 (`dist/canvas.js:2`), which this demo has never imported (lane-frontend §3.1: `/canvas` is not among the 21 consumed subpaths).

The demo *also* owns a second, independent statement of the same law — `demo/scenes/amiga/utils.ts:8–12`:

> *"Canvas2D's `fillStyle` does NOT resolve `var(…)` — an unresolvable value is silently ignored, leaving the previous paint — so the var must be computed against the live DOM here before it reaches the offscreen 2D context."*

`SpringHeatmap` uses neither. Worse, it contains the correct technique and **orders it dead**: `resolveSurface` line 124's *second* branch, `cs.backgroundColor`, is a **resolved** value that `getComputedStyle` serializes to `rgb(...)` — canvas-valid. It is unreachable, because the first branch (`getPropertyValue("--background")`, a token stream) is always non-empty and wins the `||`.

The three-level `||` chains guard against a **missing** token, never an **unparseable** one. There is no `try`, no `CSS.supports()` probe, no post-assignment read-back of `ctx.fillStyle` (which would reveal the rejection immediately).

**Falsifier (the one observation that kills this):** open the spring scene, select the Physics facet, and observe the heatmap render a visible violet→surface vertical gradient. If it does, `color-mix()`-wrapping-`light-dark()` parses in that engine's canvas color path and B-1 is dead. Secondary falsifier: `getComputedStyle(fieldEl).getPropertyValue("--color-progress")` returning a resolved `oklch(...)`/`rgb(...)` rather than the `light-dark(...)` stream — that would break my computed-value premise. Both are live probes; the **render outcome is UNPROVEN-NEEDS-LIVE (SS-13)**, but the *hazard* — an unguarded raw-token→canvas path, against a producer docblock that names the failure by name, with the correct resolver installed and unimported — is proven statically and stands on its own.

**Cure (one line, no new dependency):** `import { resolveCanvasColor } from "@mkbabb/glass-ui/canvas"` and pass `--ball-tone`/`--background` through it — or delete the canvas entirely per M-4, which dissolves the hazard rather than patching it.

---

## 2. MAJOR

### M-1 · Shadow of glass-ui `./canvas` (`useCanvas2D` + `resolveCanvasColor`) — a NEW row for the S-1..S-8 census

**Severity: MAJOR.** `SpringHeatmap.vue:106, 135–180, 267, 272–274` vs `node_modules/@mkbabb/glass-ui/dist/composables/glass/canvas2d/`.

Proposed census id **S-9** (extends lane-frontend §5; the lane's §3.1 "unreached 52" list names `/timeline`, `/typewriter`, `/pulse`, `/pager-dots`, `/instrument-chassis`, `/number-field`, `/progress`, `/surface`, `/skeleton` — it does **not** name `/canvas`, so this is an addition to the corpus, not a contradiction of it).

`./canvas` exports exactly the two things this component hand-rolls (`dist/composables/glass/canvas2d/index.d.ts`):

```
export { useCanvas2D, useCanvasLifecycle } from "./useCanvas2D";
export { resolveCanvasColor } from "./resolveCanvasColor";
```

Line-for-line correspondence:

| SpringHeatmap | glass-ui `useCanvas2D` |
|---|---|
| `:147` `Math.min(window.devicePixelRatio \|\| 1, 2)` | default `dprPolicy` = `Math.min(window.devicePixelRatio \|\| 1, 2)` — **byte-identical** (`dist/canvas.js`, minified `p = a.dprPolicy ?? (() => Math.min(f && window.devicePixelRatio \|\| 1, 2))`) |
| `:148–150` manual `canvas.width/height` + `setTransform(dpr,…)` | substrate-owned; `ctx` handed to `render` pre-transformed for CSS px |
| `:267` `useResizeObserver(fieldEl, () => paint())` | substrate observes + sizes; `changed` triggers a repaint |
| `:272–274` `onMounted(() => paint())` | `autoStart: true` → `arm()` once the canvas resolves |
| — (absent) | `respectReducedMotion` — one static frame then park, live-monitored via `matchMedia` |
| — (absent) | IntersectionObserver offscreen suspend (`rootMargin: "200px"`) + `content-visibility` seam |
| — (absent) | `dispose()` / `onScopeDispose` teardown |
| `:114–125` bespoke, broken token resolver | `resolveCanvasColor(cssVar, el)` — probe-on-cascade, returns `rgb()`/`rgba()`, SSR-safe |

The component reimplements the two capabilities it got right, omits the four it did not have (lifecycle, offscreen suspend, PRM parking, dispose), and reimplements the fifth (color resolution) **wrongly** (B-1). Consuming `/canvas` would take the subpath count from 21/73 to 22/73 and delete ~40 lines here.

**Falsifier:** `useCanvas2D` requiring an rAF loop this component does not want. Checked and rejected — `Canvas2DHandle.arm()` is documented as idempotent and the handle exposes `suspend()`/`isRunning()`; a one-shot painter is a supported shape (`render` is called on `changed` even while parked, `dist/canvas.js` `y(e)` → `e.changed && t && v()`). A stronger falsifier: `/canvas` failing to resolve at build — but it is a declared export (`package.json` exports `"./canvas"`) with `dist/canvas.js` present on disk.

### M-2 · Fat-context prop: `SpringDemoContext` consumed for 2 of ~45 keys

**Severity: MAJOR.** `SpringHeatmap.vue:65–66`, contract at `springKeys.ts:4`.

```
65  const props = defineProps<{ demo: SpringDemoContext }>();
66  const demo = props.demo;
```

`SpringDemoContext = ReturnType<typeof useSpringDemo>` (`springKeys.ts:4`) — a ~45-key object returning `facility`, `scenePlayback`, `springEditAnim`, `tracks`, `springLive`, `registerSpringPainter`, `derby`, `scrubTo`, … (`useSpringDemo.ts:433–498`). Measured usage inside this file:

```
$ grep -o "demo\.[a-zA-Z]*" SpringHeatmap.vue | sort | uniq -c
   6 demo.dampingFraction
   6 demo.response
```

**Two refs. Nothing else.** Consequences, each concrete:

1. **The public prop type transitively depends on the whole engine surface.** Any signature change in `useSpringDemo`'s return — `SpringProgress`, `NumericAnimation<{x:number}>`, `SceneFacility`, `CSSKeyframesAnimation`, the scene machine — re-types this component's props. A heatmap of two scalars is coupled to the spring solver's type graph.
2. **The component cannot be instantiated in isolation.** Constructing a `SpringDemoContext` means calling `useSpringDemo()`, which builds 5 `SpringProgress` instances (`useSpringDemo.ts:89–119`), a `NumericAnimation` (`:165`), a `useSceneMachine()` (`:182`), a `RAFPlayback` via `useSweepScene` (`:254`) — and calls `startLoop()` at composable-body scope (`:375`), arming a live rAF loop. There is no test, story, or reuse path that does not boot the entire scene.
3. **Zero reuse.** The parameter-space landscape is a general instrument; bound to `SpringDemoContext` it can never render an easing or sequence parameter space.

The narrow contract is two `Ref<number>` props (or `defineModel`), which would also fix M-3.

**Falsifier:** the component reading a broad slice of the context, making the fat prop honest. Killed by the grep above — 2 of ~45. Second falsifier considered: *"prop-drilling is wrong here, it should `inject(SPRING_DEMO_KEY)` like its siblings"* (`SpringTarget.vue:169`, `StartingStyleTarget.vue:96`). **That claim is FALSE and I am not making it** — `SpringPhysicsFacet` is mounted through a render function exposed to the shell (`SpringScene.vue:67`, `const tabsContent = () => h(SpringPhysicsFacet, { demo })`), so its vnode's parent chain runs through `AnimationControls`, *outside* `SpringScene`'s `provide` subtree (`SpringScene.vue:32`). `inject` would not resolve. The prop is the correct *mechanism*; its **width** is the defect.

### M-3 · Writes parent state through a prop object — no emits, no model, and it diverges from the sibling's explicit contract

**Severity: MAJOR.** `SpringHeatmap.vue:225–226, 259–262`; sibling contract at `SpringPhysicsFacet.vue:35, 45`.

Four write sites mutate refs owned by the parent's composable:

```
225      demo.response.value = Math.round(response * 100) / 100;
226      demo.dampingFraction.value = Math.round(damping * 100) / 100;
259      demo.response.value = Math.round(clamp(r, RESPONSE_MIN, RESPONSE_MAX) * 100) / 100;
261      demo.dampingFraction.value = Math.round(clamp(d, DAMPING_MIN, DAMPING_MAX) * 100) / 100;
```

`grep -n "defineEmits|defineModel|emit("` → **none**. The component's mutation surface is entirely invisible at its boundary: a reader of `<SpringHeatmap :demo="demo" />` (`SpringPhysicsFacet.vue:58`) cannot see from the call site that this child re-parameterises the live spring, tears down and rebuilds a `SpringProgress` (`useSpringDemo.ts:341` `watch([response, dampingFraction], rebuildLiveSpring)` → `:321–339` `dispose()` + `new SpringProgress(...)`), and re-arms the rAF loop.

The divergence is *within the same parent file*. Fifteen lines above the heatmap, the two sliders that write the **same two refs** do so through a declared, visible contract:

```
SpringPhysicsFacet.vue:34-35    :step="0.01"  @update:model-value="(v) => { demo.response.value = v; }"
SpringPhysicsFacet.vue:44-45    :step="0.01"  @update:model-value="(v) => { demo.dampingFraction.value = v; }"
```

Two controls on one shared surface, two different data-flow disciplines. The template comment at `SpringPhysicsFacet.vue:55–57` even asserts the symmetry ("the same refs the sliders drive — one shared control surface") that the code does not implement.

**Falsifier:** a `defineEmits`/`defineModel` declaration anywhere in `SpringHeatmap.vue` (grep: none), or a house rule sanctioning prop-object mutation. The tree evidences the opposite rule — the sibling on the same surface emits.

### M-4 · A `<canvas>` and its entire support apparatus for what the component's own math proves is a 20-stop vertical gradient

**Severity: MAJOR.** `SpringHeatmap.vue:93–98, 158–179`; sibling counter-example `SpringTrace.vue`.

The component documents that overshoot is independent of the x axis (`:95–98`):

> *"It is independent of `response` … so the heatmap's overshoot tint varies ONLY with the damping (y) axis"*

The loop obeys that: `zeta`, `os`, `mix`, and `ctx.fillStyle` are all computed in the **row** loop (`:163–170`); `col` appears exactly once, as an x offset (`:173`). So the inner loop issues **20 identical-fill rects per row, 400 total, painting 20 distinct colors in 20 flat horizontal bands.**

That is, by construction, `linear-gradient(to bottom, c0 0 5%, c1 5% 10%, … c19 95% 100%)` — 20 stops, one declaration, zero JS.

Everything the canvas costs is downstream of that choice and would evaporate: the `getComputedStyle` token resolution (`:114–125`) — and with it **B-1 entirely**, since CSS resolves `light-dark()` and `color-mix()` natively; the `useGlobalDark` import and `watch(isDark, paint)` (`:60, 269–270`) — CSS re-tints on the `.dark` class with no listener; the DPR backing-store arithmetic (`:146–150`); the `useResizeObserver` (`:267`); the `onMounted` paint (`:272–274`); the `aria-hidden` canvas element (`:37`). The comment at `:112–113` claims the sampling approach means "dark mode re-tints for free" — it is the opposite: sampling is precisely what makes the re-tint *cost* a design-system import plus a watcher plus a 400-rect repaint. In CSS it would genuinely be free.

The falsifying counter-example is the **direct sibling in the same directory**: `SpringTrace.vue` plots a spring-derived curve in SVG (`:16–28`) and styles it with `stroke: var(--color-progress)` (`:122`) and `color-mix(in srgb, var(--color-progress) 45%, transparent)` (`:109, 127`). It needs no color resolver, no dark watch, no resize observer, no DPR math, no repaint — because it stayed on the cascade. Two instruments, one scene, one token; one of them works by construction.

**Falsifier:** any per-column variation in the fill. Killed — `col` is absent from every expression feeding `fillStyle` (`:163–173`). Second falsifier: a future per-cell variation (e.g. settle-time, which *does* depend on `response`) planned for the x axis, which would justify the canvas prospectively. Nothing in the tree schedules it; `SpringPhysicsFacet.vue:13–16` records the merged axis-labeled instrument as "design-PENDING" without specifying a 2D field. Treat M-4 as **evaluate**, not mechanical swap, if that design is live.

---

## 3. MINOR

### m-1 · The parameter ranges are duplicated literals, and their provenance comment cites a deleted file
`SpringHeatmap.vue:68–73` vs `SpringPhysicsFacet.vue:32–33, 42–43`. `RESPONSE_MIN/MAX = 0.1/1.2` and `DAMPING_MIN/MAX = 0.2/1.5` are hard-coded here and again as `:min`/`:max` literals on the two `LabeledSlider`s. No shared constant; a slider-range edit silently desynchronises the click→param mapping from the control it claims to mirror. Compounding: line 68 sources the values from *"the SpringSidebar sliders' min/max"* — `SpringSidebar.vue` does not exist; it was dissolved in T.B7 (`SpringPhysicsFacet.vue:2–20`, *"THE PHYSICS FACET (the SpringSidebar dissolution)"*). The values happen to still agree; the provenance does not. **Falsifier:** a shared range module both files import (`grep -rn "RESPONSE_MAX" demo/` → this file only), or a surviving `SpringSidebar.vue` (`find` → absent; 8 prose references remain across 6 files).

### m-2 · `resolveTone`'s primary branch is structurally unreachable, and two CSS comments assert the opposite
`SpringHeatmap.vue:117` (`--ball-tone`), `:291–292`, `:307`. `--ball-tone` is declared in exactly two places reachable at runtime: `.spring-target { --ball-tone: var(--color-progress) }` (`SpringTarget.vue:278`, scoped) and inline on derby lanes (`SpringTarget.vue:113`). Custom properties inherit through the **DOM**, and `SpringTarget` renders in the stage subtree (`SpringScene.vue:10`) while `SpringPhysicsFacet` → `SpringHeatmap` renders in the rail via `h(SpringPhysicsFacet, { demo })` (`SpringScene.vue:67`). The field element is never a descendant of `.spring-target`, so `getPropertyValue("--ball-tone")` returns `""` always and line 117 is dead. The scoped-style comments claim otherwise — `:291–292` *"The field rides the scene's `--ball-tone` seam (inherited from `.spring-target` → `--color-progress`)"* and `:307` *"Reads the scene accent (`--ball-tone` seam)"*. The marker survives only because its CSS supplies the fallback (`:323` `var(--ball-tone, var(--color-progress))`). **Falsifier:** a `--ball-tone` declaration on `:root` or any rail ancestor (`grep -rn -- "--ball-tone" demo/` → 5 declaration sites, all in `.spring-target` / `.easing-target` / `.sequence-*` / derby-lane inline styles; none is an ancestor of the controls pane).

### m-3 · The hardcoded tone fallback is the retired pre-T.D7 green, contradicting the declared motion authority
`SpringHeatmap.vue:119` — `"hsl(142 71% 45%)"`, a green. The demo's motion-color authority is the violet `--color-progress` → `--accent-kf` (`style.css:155–163`, *"the motion-color authority = the VIOLET … so red exits the chrome entirely"*), restated at `SpringPhysicsFacet.vue:201–207` (*"the canonical motion-color (`--color-progress` — the OD-6 violet authority since T.D7 …)"*). The literal is an ad-hoc hex-class value in a function whose own header (`:110–111`) declares *"NOT ad-hoc hex"*. It is reachable only if both tokens resolve empty (unlikely), so the severity is MINOR — but if B-1 is cured by resolution rather than by M-4, this becomes the live fallback and paints the wrong identity. **Falsifier:** `hsl(142 71% 45%)` matching a current design token (`grep -rn "142 71%" demo/` → this line only).

### m-4 · A watcher whose entire body is a comment
`SpringHeatmap.vue:281–286`. A `watch` on `() => [demo.response.value, demo.dampingFraction.value] as const` with a callback containing no statements — only `/* marker is reactive (markerStyle); nothing else to repaint */`. It allocates a reactive effect for the component's lifetime and runs a tuple-allocating getter on every param change (slider drag = pointer-rate; arrow-key repeat = key-repeat rate). The comment at `:279–280` correctly explains why no watch is needed; the code below it registers one anyway. Deleting lines 281–286 is behaviour-preserving. **Falsifier:** any side effect in the callback — there is none; the body is a single comment token.

### m-5 · `defineExpose` of two compile-time constants with zero consumers
`SpringHeatmap.vue:82–83, 277`. `HALF_CELL_RESPONSE`/`HALF_CELL_DAMPING` are used at exactly three lines — their two definitions and the `defineExpose`. They are non-reactive module-scope numbers derived from four literals, so a consumer could compute or import them without touching the instance API. And there is no consumer: the sole call site carries no template ref (`SpringPhysicsFacet.vue:58` `<SpringHeatmap :demo="demo" />`). The stated rationale — *"for any future consumer / gate witness"* (`:276`) — is speculative surface against the standing `feedback_kiss_no_contrivance` law. **Falsifier:** a `ref=` on the component, or a `proof:`/gate script reading the exposed values (`grep -rn "HALF_CELL" .` → this file only).

### m-6 · The marker is clipped in half at the field extremes
`SpringHeatmap.vue:30` (`overflow-hidden`), `:319–320` (`margin-left/-top: -0.45rem`), `:194–198` (`clamp(rx,0,1)`, `clamp(ry,0,1)`). The 0.9rem dot is centred on its anchor by negative margins, so at `rx = 0` its left half sits outside the field box and at `ry = 0` its top half does — and `overflow-hidden` cuts it. Both extremes are reachable and *deliberately* reachable: the arrow-key handler clamps exactly to `RESPONSE_MIN` / `DAMPING_MAX` (`:259–262`), and `response = 0.1` / `dampingFraction = 1.5` are the slider endpoints (`SpringPhysicsFacet.vue:32, 43`). Cross-axis note: this is a template↔style seam (reported here as an integration seam; the visual severity belongs to the SS-13 lane and is **UNPROVEN-NEEDS-LIVE**). **Falsifier:** the marker never reaching an edge — refuted by the explicit clamps to the endpoints.

---

## 4. SUPERLATIVES (L-18 runs both ways)

### S+1 · The analytic closed form is genuine restraint — it consumes *zero* library API where the naive path instantiates 400 engine objects
`SpringHeatmap.vue:85–104`. `overshoot(ζ) = exp(-ζπ/√(1-ζ²))` is computed inline rather than by stepping 400 `SpringProgress` instances to settle, with a cited bench (`spring-heatmap-probe`, 2026-06-22: 0.002 ms vs 1.04 ms/mount, 507×). The comment's load-bearing claim — *"there is no closed-form `settleTime`/`overshoot` function on the library surface"* (`:93–95`) — **verifies**: the full export roster of `src/animation/physics/spring/` is `armVectorLanes`, `vectorValues`, `vectorVelocities`, `tickVectorLanes`, `springTimingFunction`, `springStartLoop`, `springPlay`, `springStop`, `DEFAULT_SPRING_RESPONSE`, `defaultSpringOptions`, `sampleNormalizedSpring`, `probeVelocity`, `reseatToSpring`, `springLinearStops`, `EMPTY_LANES`, `prepareDampedHarmonic`, `solvePreparedDampedHarmonic`, `solveDampedHarmonic`, `durationToSpringOptions` — trajectory samplers and solvers, **no peak-amplitude closed form**. Every `overshoot` occurrence in `src/` is prose in a docblock. So this is not a shadow of a library function; it is a derived control-theory expression the library genuinely does not offer, correctly kept inline and correctly documented as derived. **Falsifier:** an exported peak/overshoot helper in `src/` — the export enumeration above is the negative proof; a single `export function overshoot`/`peakOvershoot` anywhere in `src/` would demote this from superlative to shadow.

### S+2 · The narrowest possible value.js surface — and it puts the R1 parser-crash class structurally out of reach
`SpringHeatmap.vue:61`. One import, `clamp`, from `@mkbabb/value.js/math` — a pure numeric function (`dist/subpaths/math.d.ts:1`, `clamp(value: number, min: number, max: number): number`) on the repo's **only** declared runtime dependency (`package.json:69`, `"@mkbabb/value.js": "4.0.0"`), reached by its precise subpath rather than the root barrel. Used at four sites (`:194–195, 211–212, 260, 262`) where the alternative is a re-rolled `Math.min(Math.max(...))`.

The consequence is a clean negative result for this axis: **the R1 class — the live `parseCssColor("oklch()")` shipping crash (memory: apotheosis parser-proof GATE-VERDICT) — is UNREACHABLE from this component.** It never touches `@mkbabb/value.js/css` or `/color`. Contrast the sibling in the same demo, `demo/scenes/square/useSquareTumble.ts:2–3`, which imports `parseCssColor`, `serializeCssColor`, `mixColors` and *throws* on a parse failure (`:26` `throw new TypeError(...)`) — that file is squarely in the R1 blast radius; this one is not. **Falsifier:** a transitive reach — `@mkbabb/glass-ui/dark` pulling value.js color parsing. Checked: `dist/dark.js` is 2 lines with **no imports at all** (`grep -o 'from"[^"]*"' dist/dark.js` → empty). The reach is genuinely absent, not merely undeclared.

*Caveat that keeps this honest:* the under-consumption of value.js is the flip side of B-1. `useSquareTumble.ts:29–43` shows the demo already knows how to produce a canvas-safe **resolved** color string via `mixColors(..., { space: "oklab" })` + `serializeCssColor` — the exact oklab mix line 170 is trying to express in raw CSS. Reaching *further* into the declared dependency would have prevented the blocker; reaching further into the *undeclared* one (glass-ui `/canvas`) would too.

### S+3 · The interaction contract is authored, not inherited — and it is justified bespoke
`SpringHeatmap.vue:24–36, 205–263, 333–337`. `role="application"` with a descriptive `aria-label` naming both axes and the tint semantics; `tabindex="0"` plus the demo-wide `.focus-ring` contract; `aria-hidden` on both the opaque canvas (`:37`) and the decorative marker (`:45`); a `prefers-reduced-motion` guard on the component's only transition (`:333–337`) — one of the 13 PRM enforcement sites lane-frontend §6.5 counts.

Most notably, the keyboard and pointer paths are **quantised identically**: `onKeydown` steps by exactly one cell (`stepR = (RESPONSE_MAX-RESPONSE_MIN)/COLS`, `:236–237`) and both paths round to the same `0.01` slider step grid (`:225–226` and `:259–262`), so arrow-key navigation lands on the same lattice a click snaps to — no drift between the two input modalities. That parity is hand-built and easy to get wrong.

This is justified bespoke in the S-8 sense: glass-ui 7.0.0 ships 73 subpaths and **none is a 2D parameter navigator** — the nearest neighbours are `./liquid-grid`, `./fourier-field`, `./number-field`, `./canvas`, and none exposes an XY-pad contract. **Falsifier:** any glass-ui subpath exporting an XY/2D-field control (enumerated the full export list; none matches `pad|heat|xy|field` in that sense — `labeled-field`/`number-field` are form rows). *Noted caveat, not counted as a defect:* arrow-key navigation produces no screen-reader announcement — the live readout at `:18–21` is a plain `<span>` with no `aria-live`, so an SR user gets silence on every step. That belongs to the a11y lane; it tempers this superlative without voiding the parity claim.

---

## 5. Candidate defects KILLED by their own falsifiers

Recorded so the discipline is auditable — a false defect is worse than a missed one.

| candidate | why it looked wrong | what killed it |
|---|---|---|
| `z-index: var(--z-content)` (`:330`) is an undefined token with no fallback | `--z-content` is absent from `dist/styles/*.css` | It **is** shipped by glass-ui — `grep -rl -- "--z-content" node_modules/@mkbabb/glass-ui/dist/` → `glass-ui.css`, `styles/theme/bridges.css`, `styles/tokens/scheme-motion.css`. Six other demo files consume it identically. **No defect.** |
| The component should `inject(SPRING_DEMO_KEY)` like its siblings instead of prop-drilling | `SpringTarget.vue:169` and `StartingStyleTarget.vue:96` both inject; the key exists and is provided (`SpringScene.vue:32`) | `SpringPhysicsFacet` mounts through `h(SpringPhysicsFacet, { demo })` exposed as `tabsContent` (`SpringScene.vue:67`) and rendered by the shell, so its parent chain is outside `SpringScene`'s provide subtree. `inject` would not resolve. The prop is the **correct mechanism**; only its width is defective (M-2). **No defect.** |
| `watch(isDark, () => paint())` (`:270`) is redundant because the token stream is theme-invariant | `--accent-kf`/`--neutral-0` compute to the same `light-dark(...)` stream in both themes and `.dark` does not re-declare them (`style.css:184–186`) | Under the B-1 **cure** (`resolveCanvasColor`, or M-4's CSS gradient), the *resolved* color genuinely differs per theme, so a theme-change repaint is required. The watch is correct for the corrected component. **No defect.** |

---

## 6. Ordered remedy

1. **F-1** — declare `@mkbabb/glass-ui: 7.0.0` and regenerate the lock. Nothing below is reproducible first (lane-frontend §10.1).
2. **M-4 / B-1 together** — replace the canvas with a 20-stop `linear-gradient` on the field element. One change dissolves the blocker, M-1, m-2 and m-3 at once, and deletes the `/dark` import, the watch, the resize observer, and both resolvers. If the canvas must survive a pending 2D design, then instead: `import { resolveCanvasColor, useCanvas2D } from "@mkbabb/glass-ui/canvas"` (subpath utilisation 21/73 → 22/73) and delete `:114–125, 146–150, 267, 272–274`.
3. **M-2 + M-3** — narrow the prop to two `defineModel<number>()`s (`response`, `damping`); `SpringPhysicsFacet` then binds the heatmap exactly as it binds its two sliders. Kills the fat-context coupling and the invisible mutation in one motion.
4. **m-1** — hoist the four range literals into `springPresets.ts` (or a `springRanges.ts`) consumed by both files; correct the `SpringSidebar` provenance to `SpringPhysicsFacet`.
5. **m-4, m-5** — delete lines 281–286 and 277 (and 82–83 with them).
6. **m-6** — drop `overflow-hidden` from `:30` (the canvas dies with M-4, so the rounding it protected is moot) or inset the marker's clamp range by half a dot.

---

## Provenance

Read whole, read-only: `SpringHeatmap.vue` (338), `springKeys.ts` (11), `useSpringDemo.ts` (499), `SpringPhysicsFacet.vue` (243), `SpringScene.vue` (205), `SpringTrace.vue` (130), `scenes/amiga/utils.ts` (92), `scenes/square/useSquareTumble.ts` (head), `demo/styles/style.css` (§:85–195), and the installed `@mkbabb/glass-ui@7.0.0` type/dist surface for `./canvas`, `./dark`, `./color`, plus `@mkbabb/value.js@4.0.0`'s `./math` subpath. Library export roster taken from `keyframes.js/src/animation/physics/spring/`. Corpus folded: `formation/keyframes/lane-frontend.md` (F-1, S-1..S-8, §3.1, §6.5, §10) — extended with proposed **S-9** (`./canvas`), contradicted nowhere. No file in keyframes.js, glass-ui, or value.js was written, mutated, or executed; no installs, no dev servers, no browser tooling. All live-render outcomes are marked **UNPROVEN-NEEDS-LIVE** for the SS-13 visual audit.
