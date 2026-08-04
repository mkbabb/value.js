claude-opus-5[1m]

# Challenge · `EasingTarget.vue` · axis **L (LIBRARY)**

**Subject:** `/Users/mkbabb/Programming/keyframes.js/demo/scenes/easing/EasingTarget.vue` (335 lines) + `EasingTarget.css` (193 lines)
**Mode:** static, read-only. No browser tooling. Node was used only to *execute the shipped `@mkbabb/value.js@4.0.0` easing registry* as read-only evidence (numeric measurements below) — no product source was touched in any repo.
**Date:** 2026-08-04.
**Posture:** the component was assumed DEFECTIVE until the tree proved otherwise. Every claim below carries its own falsifier; §7 lists the hypotheses I *killed* so a reader can see the ones that did not survive.

---

## 0. Verdict

| | count |
|---|---|
| BLOCKER | 1 |
| MAJOR | 2 |
| MINOR | 9 |
| INFO | 3 |
| **defects total** | **15** |
| **superlatives** | **6** |

**Headline.** The hot path is *exemplary* — the shared-clock / snapshot-painter / IO-gate architecture (§6 P-1, P-2) is the best direct-DOM discipline in the demo tree and should be the reference other scenes are held to. The defects are **not** in the motion machinery. They are in the **derived-data layer**: the header literal (the thing a `CopyButton` hands the user) is a re-implementation of `useEasingDemo.cssValue` that **disagrees with it for 7 of 28 specimens, by up to 0.1634 of the value range** (D-2), and the specimen set is built by an unguarded registry lookup that throws inside a render-path computed with **zero error boundaries anywhere in `demo/`** (D-3). Above all of it sits the repo-level phantom dependency (D-1), which this file exposes on four import specifiers.

---

## 1. What the component actually is

A specimen gallery. `EASING_GROUPS` minus the `Custom` family → **28 tiles** (Standard 5 · Sine 3 · Quad 3 · Cubic 4 · Expo 3 · Circ 3 · Back 3 · Bounce 1 · Steps 3). Each tile = a cached static SVG sparkline + a hairline rail + a 14px ball driven by **one shared phase** through `demo.registerDotPainter`. A header promotes the selected curve's name + its "COMPLETE re-parseable literal" with a copy affordance. A `ToggleGroup` filters by family.

Import surface read in full:

```
vue · @vueuse/core{useMediaQuery,useResizeObserver}
@mkbabb/glass-ui{Card} · /fading-scroll{FadingScroll} · /chip{Chip} · /toggle-group{ToggleGroup,ToggleGroupItem}
@mkbabb/value.js/math{cubicBezierToString}
@mkbabb/keyframes.js{type TimingFunction}                     → src/animation/constants/types.ts:45
@components/CopyButton.vue
@utils/reference-data/timingCurveUtils{getCurvePath,namedEasing,steppedEasing}
@utils/reference-data/easingGroups{EASING_GROUPS}             → animationDescriptions{NAMED_EASING_BEZIER,DETAIL_TIMING_FUNCTIONS}
./easingKeys{EASING_DEMO_KEY}                                 → ./useEasingDemo (the injected context)
./EasingTarget.css                                            → demo/styles/design-idioms.css{.progress-rail,.progress-ball}
```

---

## 2. BLOCKER

### D-1 · `@mkbabb/glass-ui` is a phantom dependency and this file is its widest exposure — **BLOCKER**

`EasingTarget.vue:136-139` imports **four** specifiers across the glass-ui root plus three subpaths:

```ts
import { Card } from "@mkbabb/glass-ui";                                  // :136
import { FadingScroll } from "@mkbabb/glass-ui/fading-scroll";            // :137
import { Chip } from "@mkbabb/glass-ui/chip";                             // :138
import { ToggleGroup, ToggleGroupItem } from "@mkbabb/glass-ui/toggle-group"; // :139
```

Measured, this tree, today:

```
$ grep -c '"@mkbabb/value.js"' package-lock.json   → 3      (declared: package.json dependencies, "4.0.0")
$ grep -c 'glass-ui'          package-lock.json    → 0
$ grep -c 'glass-ui'          package.json          → 0     (neither dependencies nor devDependencies)
$ node -p "require('./node_modules/@mkbabb/glass-ui/package.json').version"  → 7.0.0
```

`vite.config.ts:36-59` aliases exactly ten specifiers (`@src`, `@mkbabb/keyframes.js`, `@styles`, `@state`, `@components`, `@utils`, `@kf-engine`, `@composables`, `@app`, `@assets`) — **glass-ui is not among them**, and `vite.config.ts:29` states the expectation explicitly: *"glass-ui consumed from the registry (not a workspace link)"*. There is no registry record of it. A clean `npm ci` therefore produces a tree in which `npm run gh-pages` cannot resolve line 136, and the easing scene is the first thing to fail.

**Folds census F-1** (`lane-frontend.md` §0, RED) and confirms it by lockfile count rather than by absence-of-mention. F-1 recorded the fact repo-wide; this challenge fixes the *blast radius on this component*: 4 specifiers here, plus 3 more reached through the same scene (`EasingSidebar.vue:70,71,76` — `Card`/`CardContent`, `LabeledSlider`, `EasingPicker`). The easing scene cannot be rendered at all without the undeclared package.

**Falsifier.** Any of: a `@mkbabb/glass-ui` entry in `package.json` or `package-lock.json`; a `resolve.alias` / `optimizeDeps` / `build.rollupOptions.external` entry mapping the specifier; a `.npmrc`/workspace protocol installing it implicitly; or a CI step that installs it out-of-band. I checked `package.json`, `package-lock.json`, `vite.config.ts`, and `tsconfig*.json` — the only glass-ui strings in any manifest are prose comments (`tsconfig.lib.json:8-9`, `vite.config.ts:29-79`). If a CI workflow file installs it explicitly, this drops to MAJOR (contributor-hostile rather than build-breaking); I did not audit `.github/`, so **that one arm is unchecked** and named as such.

---

## 3. MAJOR

### D-2 · The header literal is a lossy re-derivation that **disagrees with the specimen beneath it** for 7 of 28 curves — **MAJOR**

Two computations of "the literal" exist in the same scene, and they are not the same function.

`useEasingDemo.ts:93-104` — the **engine-facing** twin, fed to `previewAnim.setTimingFunction` (`:308-315`):

```ts
const cssValue = computed(() => {
    const name = currentEasingName.value;
    if (name === "cubic-bezier") return cubicBezierToString(...bezierControlPoints.value);
    if (name === "steps")        return `steps(${…}, ${…})`;
    return name;                              // ← named curve → THE NAME
});
```

`EasingTarget.vue:209-220` — the **human-facing** twin, rendered at `:32-34` and handed verbatim to `CopyButton :text` at `:37`:

```ts
const literal = computed<string>(() => {
    const name = demo.currentEasingName.value;
    if (name === "steps") return `steps(${…}, ${…})`;
    if (demo.isBezierEditable.value)                       // ← the divergent branch
        return cubicBezierToString(...demo.bezierControlPoints.value);
    // An engine-named curve (ease-in-out-sine, ease-in-bounce, step-start …):
    // the name IS the literal — value.js round-trips it by registry lookup.
    return name;
});
```

`isBezierEditable` (`useEasingDemo.ts:73-76`) is `name === "cubic-bezier" || name in NAMED_EASING_BEZIER`, and `NAMED_EASING_BEZIER` (`animationDescriptions.ts:16-49`) contains **25 of the 28 tile names**. So the `return name` line is reachable for only four curves — `smooth-step-3`, `ease-in-bounce`, `step-start`, `step-end`. **The comment's own first example, `ease-in-out-sine`, can never reach the line it annotates.**

The tile paints `namedEasing(name)` (`EasingTarget.vue:175-178` → `timingCurveUtils.ts:42-46` → `value.js` `easing(name)`), i.e. the **true engine curve**. The header emits the **table's cubic-bezier approximation**. Measured max |true − approximation| over t ∈ [0,1] at 1001 samples, against the shipped `@mkbabb/value.js@4.0.0`:

| curve | max deviation | at t |
|---|---|---|
| `ease-in-out-circ` | **0.1634** | 0.49 |
| `ease-in-out-expo` | **0.1339** | 0.51 |
| `ease-out-expo` | 0.0370 | 0.05 |
| `ease-in-out-cubic` | 0.0247 | 0.25 |
| `ease-out-cubic` | 0.0222 | 0.26 |
| `ease-in-out-quad` | 0.0192 | 0.45 |
| `ease-in-out-sine` | 0.0175 | 0.66 |
| the other 18 bezier-mapped names | 0.0000 | — |

**Failure, concretely:** select the `ease-in-out-circ` tile. The header reads `ease-in-out-circ` on line one and `cubic-bezier(0.79, 0.14, 0.15, 0.86)` on line two. Press the copy button labelled *"Copy easing literal"*. Paste into CSS. You now have a curve that is **0.163 of the travel wrong at the midpoint** relative to the ball you were just watching — on a 300px rail, ≈49px of divergence — and unlike the ball, it is not the curve the engine is running either (`cssValue` sends the *name* to `previewAnim`). Both the tile and the engine agree; only the copyable text does not.

The scene's own prose asserts the opposite in three places: `EasingTarget.vue:17-18` ("its COMPLETE re-parseable literal"), `EasingSidebar.vue:38-41` ("the tile + header literal carry the selection"), and `EasingSidebar.vue:85-89`, which *already knows about this exact hazard* — "the demo's named map (`NAMED_EASING_BEZIER`) is wider (quart/quint) and **differs on some quads (sine)** — seed by PRESET only when the picker's own catalogue knows the name". **The sidebar has the guard. The target does not.**

**Counter-consideration (stated so the finding survives it).** `EasingTarget.vue:172-174` documents a deliberate header≠tile divergence for `steps`: the tile is a fixed 4-step staircase while the header carries the live `stepOptions`. One could argue the bezier case is the same accepted trade. It is not the same: the `steps` divergence is a parameter *the user set and can see in the sidebar*, and the literal is exact for the parameters shown; the bezier case is a silent substitution of a *different curve family's approximation* that no user requested and no UI discloses. Also note the design already has the honest surface — `EasingSidebar.vue:7-8` credits glass-ui's `EasingPicker` with "the COMPLETE re-parseable readout literal with copy — the F7 truncation class is dead by construction". The header re-implements it, worse.

**Cheapest correct fix:** delete `literal` and render `demo.cssValue.value`. That removes a 12-line duplicate, restores name-fidelity for all 25 bezier-mapped curves, and makes the copied text identical to what the engine was handed. `cssValue`'s `steps` branch is already byte-identical to `literal`'s.

**Falsifier.** (a) If `easing("ease-in-out-circ")` in the shipped value.js 4.0.0 returned exactly `CubicBezier(0.785, 0.135, 0.15, 0.86)`, the literal would be faithful — measured 0.1634 max deviation, so it does not. (b) If the tile painted `cubicBezierEasing(...NAMED_EASING_BEZIER[name])` rather than `namedEasing(name)`, header and tile would agree — `EasingTarget.vue:175-178` and `wirePainter` `:288` both route through `fnForCurve` → `namedEasing`, so they do not. (c) If the header were specified as "the editor's current control points" rather than "the curve's literal", this would be a labelling defect only — but `:17-18` and `EasingSidebar.vue:38-41` specify the curve's.

### D-3 · The specimen set is built by an unguarded throwing registry lookup, on the render path, with no error boundary in the tree — **MAJOR (latent: zero live instances)**

`timingCurveUtils.ts:13-23` `requireEasing` **throws** on an unresolved name. Three call sites reach it from this component with a *string* argument and no guard:

- `EasingTarget.vue:196` — `getCurvePath(item.name)` inside the `visibleCurves` computed, i.e. **during render**.
- `EasingTarget.vue:177` — `namedEasing(name)` in the same computed (dead value, see D-4, but it still throws).
- `EasingTarget.vue:288` — `fnForCurve(el.dataset.curve ?? "")` inside async `wirePainter`.

`grep -rn "onErrorCaptured\|errorHandler" demo/` → **no matches**. There is no boundary anywhere in the demo tree. A throw in `visibleCurves` therefore propagates out of render.

I executed the shipped registry against all 25 non-step names in `EASING_GROUPS`: **all 25 resolve `{ok:true}`.** So this is **not a live bug today** and I will not claim it is one. It is an *error-posture* defect, and the reachability distance is one line:

- `easingGroups.ts:87-90` declares a family literally named **`Bounce` containing exactly one member** (`ease-in-bounce`). Adding the obvious siblings (`ease-out-bounce`, `ease-in-out-bounce`) is the next natural edit to that file.
- `EasingSidebar.vue:12-13` anticipates growth here in prose: *"the bounce family stays kf-owned until glass-ui's named catalogue covers it"*.
- The failure is total, not graceful: an unknown name in a data table takes down the whole scene render, and the `dataset.curve` variant (`:288`) instead throws inside a floating promise (D-8) and silently freezes all 28 balls.

The fix is one line — `getCurvePath`/`fnForCurve` should fall back to `linear` (or the group item should be skipped) rather than throw — and it is worth taking precisely because the value at risk is the whole scene.

**Falsifier.** If any name in `EASING_GROUPS` fails `easing(name)`, this is not latent but live. I measured all 25 — none fail. If an `onErrorCaptured` exists above the scene (App shell, router view, `<Suspense>` fallback), the blast radius shrinks to that boundary — `grep` over `demo/` finds none, and `<Suspense>` fallbacks do not catch render throws from an already-resolved subtree.

---

## 4. MINOR

### D-4 · `SpecimenCurve.fn` is computed for every tile on every filter change and **never read**; the painter then re-derives the identical value out of a DOM string

`EasingTarget.vue:180-198` declares `interface SpecimenCurve { name; fn; path }` and populates `fn: fnForCurve(item.name)` for every visible curve. `grep -n "curve\.fn\|\.fn\b" EasingTarget.vue` → **no matches**. The template reads `curve.name` (`:86,89,109,116`) and `curve.path` (`:101`) only.

Meanwhile `wirePainter` (`:285-289`) rebuilds the same functions from `el.dataset.curve` — a value→string→DOM-attribute→string→value round-trip past a typed object that is sitting in scope. Cost per filter change: 28 discarded `EasingFunction` closures plus 28 re-derivations (note `getCurvePath` **is** memoised via `curvePathCache`, `timingCurveUtils.ts:69`; `namedEasing` is not — the caching is asymmetric).

The stated reason is sound (`:283-284`: *"keyed by data-curve (NOT v-for index — ref arrays carry no order guarantee)"* — see P-5), but the chosen remedy pays for it twice and re-introduces the stringly-typed lookup that D-3 can throw from. A `Map<string, TimingFunction>` built from `visibleCurves` and keyed by `dataset.curve` keeps the order-independence, makes `fn` live, and removes the second derivation.

**Falsifier.** Any read of `.fn` in the SFC, in a `:deep` slot consumer, or via `defineExpose` — there is no `defineExpose`, and `grep` finds no reader.

### D-5 · The `currentEasingName` watch (`:324-329`) is a provable no-op

```ts
watch(() => demo.currentEasingName.value, () => { if (!reducedMotion.value) demo.repaintDots(); });
```

`repaintDots` (`usePainterRegistry.ts:15-18`) calls each painter with `currentArgs()` = `[livePhaseValue]`. On a selection change: `livePhaseValue` is unchanged; `railWidth` is unchanged; `tileSnapshot` is unchanged (`visibleCurves` does not depend on the selection, so `wirePainter` does not re-run); the tile `fn`s are static by design (`:321`). `paintTileDots` therefore writes byte-identical `transform` strings. `grep -rn "registerDotPainter" demo/` shows exactly **one** registrant — this component — so no other painter can be affected either.

The 3-line comment above it ("the pressed-state render must not strand a paused ball") describes a hazard that cannot occur, and could not be cured here even if it did: the watch defaults to `flush: 'pre'`, so it runs *before* the pressed-state DOM exists — any layout consequence of `[data-state="on"]` (`EasingTarget.css:173-180`) would be measured on the stale frame.

**Falsifier.** A second `registerDotPainter` consumer whose output depends on the selection, or a `railWidth` change caused by the selection. Only `stroke-width` (1.25→1.5) and `font-weight` (600) change on selection; neither alters the `1fr` grid track, and the pre-flush ordering makes it unobservable regardless.

### D-6 · `BALL_SIZE` is triplicated across two languages, and `design-idioms.css` documents a `getComputedStyle` seam this component does not use

Three independent encodings of one 14px quantity:

- `EasingTarget.vue:228` — `const BALL_SIZE = 14;` (consumed at `:250`, `maxX = railWidth - BALL_SIZE`)
- `EasingTarget.css:163` — `--ball-size: 14px;`
- `EasingTarget.css:153,156` — `left: 6.5px` / `right: 6.5px`, the origin/terminus ticks, i.e. hand-computed `BALL_SIZE/2 − 0.5`

They agree today (ball centre at phase 0 is 7px; tick centre is 6.5 + 0.5 = 7px — the arithmetic checks out, which is why nobody has noticed). They are held in agreement by nothing.

Worse, `design-idioms.css:163-164` states the contract in the opposite direction:

> `--ball-size` **is the seam EasingTarget reads via getComputedStyle**

`grep -rn "getComputedStyle" demo/` finds seven sites — `useSquareTumble.ts:13`, `useSquareDemo.ts:306`, `amiga/utils.ts:19`, `SpringHeatmap.vue:115,123`, `snapshotCapture.ts:13,39,47` — and **none in `EasingTarget.vue`**. The promoted idiom names a consumer that abandoned the seam; the doc is a lie about live code.

EasingTarget is also the **only** ball in the demo that does its horizontal positioning arithmetic in JS. `SequenceScrubber.vue:159`, `SpringTarget.vue:344,352,443`, `SpringPhysicsFacet.vue:196` all center via `calc(var(--ball-size, 36px) / -2)` in CSS. Making the ball `translateX(fn(p) * 100%)`-relative, or reading the custom property once per measure, would collapse all three encodings to one.

**Falsifier.** A `getComputedStyle` read of `--ball-size` in this component (none), or a build-time token that generates both the TS constant and the CSS value (no such generator — `grep` finds no codegen for `demo/styles`).

### D-7 · The reduced-motion branch constructs and wires a 28-element `IntersectionObserver` whose callback body is entirely dead

`wirePainter` `:290-301` builds the observer and observes every stage **unconditionally**, then `:304-307` returns early under reduced motion. The observer's callback (`:291-298`) maintains `visibleStages` and calls `demo.repaintDots()` gated on `!reducedMotion.value` — but under reduced motion the only painter is never registered (`:310` is unreachable on that branch) and `paintRestState` (`:263-267`) ignores `visibleStages` entirely, walking the full snapshot.

So on the reduced-motion path the component allocates an observer, registers 28 observations, and services a callback on every drawer scroll, to mutate a `Set` nobody reads. Moving the `io` construction below the reduced-motion early-return removes it.

**Falsifier.** Any read of `visibleStages` outside `paintTileDots` (`:256`) — there is none; `paintRestState` and `measureRailWidth` do not consult it.

### D-8 · `wirePainter` is `async` and every call site drops the promise; a throw leaves the component half-torn with no signal but an unhandled rejection

Call sites: `:313` `onMounted(() => wirePainter())`, `:319` `watch(visibleCurves, () => wirePainter())`, `:320` `watch(reducedMotion, () => wirePainter())`. None `await`s or `.catch()`es.

The body's ordering makes a mid-flight throw (D-3, at `:288`) maximally confusing:

```ts
unregisterPainter?.();      // :279  old painter retired
unregisterPainter = null;   // :280
io?.disconnect();           // :281  old observer disconnected — but `io` is NOT nulled
visibleStages.clear();      // :282
tileSnapshot = (…).map(…)   // :285  ← throws here; assignment never completes
```

Post-throw state: no painter registered (every ball frozen at its last transform, permanently), `tileSnapshot` still holding the **previous** filter's detached elements, `io` a non-null but disconnected observer that the `onScopeDispose` at `:314-317` will "disconnect" again. The user sees a dead gallery; the console sees one unhandled rejection.

**Falsifier.** A global `unhandledrejection` handler or Vue `app.config.errorHandler` that surfaces it — `grep -rn "errorHandler\|unhandledrejection" demo/` → none. Also: if `fnForCurve` cannot throw (D-3's falsifier), the failure state is unreachable and this reduces to a style point.

### D-9 · One file, two observer mechanisms: VueUse for resize, hand-rolled for intersection

`:135` imports `useResizeObserver` from `@vueuse/core` (auto-teardown, used at `:332`), while `:247/:290/:317` hand-roll a raw `IntersectionObserver` with manual `disconnect()` in `onScopeDispose`. VueUse's `useIntersectionObserver` is already the house idiom one directory over — `AmigaScene.vue:22,212`, whose own comment (`:229`) credits it for auto-release on scope dispose.

This is the same *mechanism-inconsistency* class the census flagged for `prefers-reduced-motion` (`lane-frontend.md` §6.5 — two scenes use raw `window.matchMedia?.()`, this one uses `useMediaQuery`); there the inconsistency runs in EasingTarget's favour (P-3), here against it.

**Honest caveat:** the element set here is dynamic and non-reactive (`tileSnapshot` is a plain `let`), so the VueUse form is genuinely awkward without also making the snapshot reactive — which would work against the file's whole off-the-render-graph thesis. Graded MINOR, not MAJOR, for that reason. The manual teardown *is* present and correct.

### D-10 · `railWidth` is a `ref` that no reactive consumer reads

`:232` `const railWidth = ref(0);`. Readers: `tileBallXAt` (`:250`) only, itself called from `paintTileDots` (`:257`) and `paintRestState` (`:265`) — both invoked from rAF callbacks, watch callbacks, and observer callbacks, none of which track. Writers: `:271` and `:303`, each followed by an explicit imperative repaint.

Nothing tracks it, nothing needs to. A plain `let` is behaviourally identical and cheaper. In *this* file the wrong container is more than cosmetic: the entire 100-line section is documented (`:222-227`, `useEasingDemo.ts:144-157`) as the surface that must stay **off** the Vue render graph, and a `ref` here advertises reactivity the design deliberately refuses. It is also a live trap — the moment `tileBallXAt` is called from inside a `computed` or a `watchEffect`, it silently becomes a tracked dependency.

**Falsifier.** Any template interpolation, `computed`, or `watch*` reading `railWidth` — none exists.

### D-11 · (INHERITED, `CopyButton.vue`) `isCopied` is never reset, so the copy button's accessible name is permanently wrong after the first press

`CopyButton.vue:32` `const isCopied = ref(false)`; `:54` sets it `true` in `handleClick`; **nothing ever sets it back**. Its only consumer is `:4`:

```html
:aria-label="isCopied ? 'Copied to clipboard' : label"
```

EasingTarget mounts exactly one instance (`:35-39`) with `label="Copy easing literal"`. After the user's first copy, the button's accessible name is `"Copied to clipboard"` **forever** — for every subsequent curve, for the rest of the session. The visual feedback is correct (the icon swap is engine-driven, `:62`); only the AT surface latches. Note the component *does* correctly re-arm the polite live region (`:57-60`, cleared then re-set on the next frame) — so the author clearly understood the re-arm problem and applied it to one of the two surfaces.

Attributed to `CopyButton.vue`, not to EasingTarget; recorded here because EasingTarget is a consumer and the axis covers composable/component contracts. **Complements census S-7** (`lane-frontend.md` §S-7, AMBER), which flagged this file for the glass `Button` shell and for the runtime-`@keyframes`-string injection but not for this.

**Falsifier.** A `watch`/timer resetting `isCopied`, or a second consumer that makes the latch meaningful — `grep` over the 113-line file finds one write and one read.

### D-12 · `railWidth` is sourced from `tileSnapshot[0]` alone; a render-skipped first tile parks every ball at the origin

`:302-303` and `:270-272` both measure `tileSnapshot[0]?.stage.clientWidth`. `.specimen-tile` carries `content-visibility: auto` (`EasingTarget.css:104`). An element inside a skipped `content-visibility: auto` subtree has no layout box, so `clientWidth` reports `0`; `tileBallXAt` (`:249-252`) then returns `0` for **every** tile (`maxX > 0` is false), and the recovery path — `useResizeObserver(gridEl, …)` at `:332` — re-reads the *same* tile 0, so it cannot self-heal while tile 0 stays skipped.

Reachability is genuinely narrow: tile 0 is the first grid cell, and the scroller clamps `scrollTop` when the filter shrinks the content, so it is almost always relevant. I could not construct a deterministic static repro, and the magnitude is **UNPROVEN-NEEDS-LIVE**. It is recorded as a fragility, not a live bug: the fix (measure the ball's own `stage`, or the grid's computed column width, or any *visible* stage) is strictly more robust at no cost.

**Falsifier.** If `clientWidth` on a `content-visibility: auto`-skipped descendant returns the last-known size rather than 0, this dies outright. Per CSS Containment L2 the subtree is not laid out and the box is absent, but this is exactly the kind of claim that needs the SS-13 live pass to settle — **UNPROVEN-NEEDS-LIVE**.

---

## 5. INFO

### D-13 · `will-change: transform` on 28 balls, never released — INFO

`EasingTarget.css:166`. `will-change` is a standing compositor hint; nothing removes it when the sweep is idle, and `EasingScene.vue:126` (`autoPlays: false`) means the scene **rests on entry** — so at first paint the hint is live for every ball while nothing is moving. Graded INFO rather than MINOR because `content-visibility: auto` on the parent tile (`:104`) plausibly suppresses promotion for skipped tiles, bounding the exposure to roughly the visible set (~6-9 tiles). **Magnitude UNPROVEN-NEEDS-LIVE** (layer count / GPU memory is a DevTools observation, out of scope here).

### D-14 · `EasingTarget.css:136` says "33 rails"; the specimen set is 28 — INFO

The comment justifies the 1px rail delta by *"33 rails at 2px read as a grid of rules"*. Counting `EASING_GROUPS` minus `Custom` (`easingGroups.ts:27-103`): 5+3+3+4+3+3+3+1+3 = **28**. Harmless drift, but it is the kind of stale count that makes a reader distrust the surrounding rationale — which in this case is correct.

### D-15 · `cubicBezierToString` rounds to 2 decimals, so the "never truncated" literal is not an exact round-trip — INFO

Executed against the shipped value.js: `cubicBezierToString(0.785, 0.135, 0.15, 0.86)` → `"cubic-bezier(0.79, 0.14, 0.15, 0.86)"`. Measured curve error from the rounding *alone*: `ease-in-out-circ` 0.00733, `ease-in-out-quart` 0.01006, `ease-in-out-sine` 0.00352, a representative authored drag `(0.123,0.456,0.789,0.012)` 0.00203.

Small — which is why this is INFO and not folded into D-2's severity. Recorded separately because it is an **independent** mechanism and it bites a case D-2 does not: a user-authored `cubic-bezier` drag through `EasingSidebar`'s `EasingPicker` is stored at full precision (`updateBezierPoints`, `useEasingDemo.ts:265-271`) but copied at 2dp. The header's own claim (`EasingTarget.vue:17-18`, "COMPLETE … never truncated") is about *width*, not precision; a reader will hear both.

---

## 6. Superlatives (L-18 runs both ways)

### P-1 · The shared-clock / snapshot-painter / IO-gate hot path is the reference implementation in this tree

`:254-259` is the whole per-frame cost for 28 animated balls:

```ts
const paintTileDots = (phase: number) => {
    for (const { el, stage, fn } of tileSnapshot) {
        if (stage && !visibleStages.has(stage)) continue;
        el.style.transform = `translateX(${tileBallXAt(fn, phase)}px)`;
    }
};
```

Every property of this is deliberate and correct: **one** phase for all 28 (so "all balls depart together" is true *by construction*, not by synchronisation — the pedagogical claim at `:8-10` is structurally guaranteed); a pre-built snapshot so no DOM query happens per frame; an IO gate so off-screen tiles cost nothing; `transform` **only**, so no per-frame layout or paint invalidation; `railWidth` cached from a ResizeObserver so no `clientWidth` read (forced reflow) enters the loop; and the glow is static CSS (`:159-161`) explicitly so it is "never written per frame". Three separate gates (IO, `content-visibility`, `will-change`) stack on the same axis.

And the seam it plugs into is equally clean: `usePainterRegistry.registerPainter` (`usePainterRegistry.ts:8-12`) **paints once on registration**, so a paused scene is correct on its first frame with no special-case initialisation anywhere in the consumer — `:308-310` relies on this and says so.

**Falsifier (superlatives get one too).** A per-frame layout read, a non-`transform` style write, a reactive write, or a DOM query inside the painter would kill the claim. There is none: `tileBallXAt` reads a cached `ref`, and `repaintDots`'s only other caller in the hot path is `useEasingDemo.ts:188`, which is likewise write-only.

### P-2 · The `.progress-ball` idiom deliberately leaves `transform` unclaimed, and this component's painter is safe *by construction*

`design-idioms.css:177-187` centers the ball vertically with `margin-top: calc(var(--ball-size, 36px) / -2)` — **not** `translateY(-50%)` — while the sibling `.progress-rail` (`:166-176`) *does* use `transform: translateY(-50%)` because nothing paints it. That asymmetry is not an accident; it is what makes `el.style.transform = translateX(…)` a total, non-clobbering write. A single `translateY(-50%)` in the shared idiom would have silently dropped 28 balls out of their rails the moment the painter ran. This is a genuinely good CSS/JS contract and it deserves to be written down before someone "tidies" it.

**Falsifier.** Any `transform` in the base `.progress-ball` rule, or in `.tile-ball` (`EasingTarget.css:162-167` — sets `--ball-size`, `--ball-glow`, `left`, `will-change` only). Neither exists.

### P-3 · The only *reactive* `prefers-reduced-motion` site in the demo

Census §6.5 enumerates three JS query sites. `useCubeDemo.ts:163-164` and `useSequenceInstrument.ts:29-30` both read `window.matchMedia?.(…).matches` **once**, inside imperative one-shot handlers (a click handler, a `didPowerOn` latch) — so an OS-level toggle mid-session is invisible to them. `EasingTarget.vue:234` uses VueUse `useMediaQuery`, and `:320` `watch(reducedMotion, () => wirePainter())` **re-wires the whole paint path** when it flips: registered painter retired, `paintRestState()` applied, and symmetrically restored on the way back. This is the correct posture and it is the only instance of it.

**Falsifier.** If `useMediaQuery` did not auto-dispose its listener the trade would be worse, not better — VueUse registers `tryOnScopeDispose` and this is a component scope. If either other site were also reactive, the superlative is merely "one of three".

### P-4 · `wirePainter`'s teardown-before-rebuild ordering makes concurrent invocations leak-free

Two watches (`:319`, `:320`) can both fire in one tick. Because the entire body after the **single** `await nextTick()` (`:278`) is synchronous, two interleaved calls resolve strictly in order, and each begins by retiring its predecessor's painter and observer (`:279-282`) before building its own. There is no window in which two painters or two observers are simultaneously live. Analysed specifically looking for the classic async-rewire double-registration leak; it is not there.

**Falsifier.** A second `await` anywhere in the body would open the interleave window. There is exactly one.

### P-5 · The snapshot refuses to trust `v-for` ref-array order

`:283-284` — *"Snapshot keyed by `data-curve` (NOT v-for index — ref arrays carry no order guarantee)"*. This is correct (Vue documents exactly that caveat) and it is the sort of thing that produces an unreproducible "sometimes one ball races the wrong curve" bug. The instinct is right; only the implementation costs more than it should (D-4).

### P-6 · The `ToggleGroup` emit is typed **structurally**, keeping the demo off the vendor's headless basis

`:163-169`:

```ts
type ToggleValue = string | number | boolean | Record<string, unknown> | null;
const onFamilyChange = (v: ToggleValue | ToggleValue[]) => {
    if (typeof v === "string" && v.length) familyFilter.value = v;
};
```

No `reka-ui` import, no `any`, and the narrowing doubles as the deselect guard (`:166-167`: single-select, never empty). This is the discipline that produces census **F-6 GREEN** (*"zero local `ui/` shadcn copies, zero direct `reka-ui` imports — the glass-ui boundary is otherwise clean"*), and it is worth contrasting with `CopyButton.vue:49`'s `AnimationGroup<any>` one directory over.

---

## 7. Hypotheses I killed (recorded so they are not re-raised)

| hypothesis | why it died |
|---|---|
| **In-flight-unmount leak** — scope disposes during `wirePainter`'s `await`, the continuation then registers a painter into the parent's registry after teardown | Not reachable. `EasingScene.vue:2-4` mounts `<EasingTarget />` unconditionally, so the child can only unmount with the scene; Vue stops the parent scope first, and `useSweepScene`'s `onScopeDispose(stopLoop)` kills the rAF loop, leaving any orphan registration unreachable garbage. **Latent hardening gap only** (a `disposed` flag after the `await` would close it); NOT filed as a defect. |
| **Double-registration of `paintTileDots`** | `usePainterRegistry` uses a `Set` (`usePainterRegistry.ts:6`) and the painter identity is stable, so re-registration is idempotent even if the unregister were skipped. |
| **A specimen name that value.js cannot resolve** | Executed all 25 non-step names against the shipped registry: 25/25 `{ok:true}`, including `smooth-step-3` and `ease-in-bounce`. Only the *posture* (D-3) survives. |
| **`inject(EASING_DEMO_KEY)!` non-null assertion is an EasingTarget defect** | It is the **house idiom**: `SequenceTarget.vue:150`, `SequenceScrubber.vue:47`, `SpringTarget.vue:169`, `StartingStyleTarget.vue:96` are identical. A repo-wide `injectStrict` helper is a fair recommendation; singling out this file is not. |
| **The header's `steps` literal contradicting the fixed 4-step tile** | Documented and deliberate at `:172-174`. Not a defect; retained in D-2 as the counter-consideration. |
| **`watch(visibleCurves, …)` firing on every recompute** | `visibleCurves` depends only on `familyFilter`, and `familyFilter.value = v` with an equal string does not trigger (`Object.is`). No spurious rewires. |
| **ResizeObserver racing `wirePainter`'s snapshot** | `nextTick()` resolves in the microtask checkpoint, strictly before the frame's post-layout RO delivery, so the snapshot is always rebuilt first. The RO's *initial* delivery against an empty snapshot is a harmless no-op (`:270-274` is fully `?.`-guarded). |
| **Module-size / Goldilocks violation** | 335 lines with ~90 of comment; the script block is ~150 lines of code across a coherent set of concerns. The painter/IO/measure cluster (`:226-332`) is extractable as `useRailPainter`, but no *second* consumer exists yet (`grep` finds one `IntersectionObserver` and one `registerDotPainter` site), so extracting now would be speculative generality. **Not a defect.** |

---

## 8. Census crosswalk

| census id | this challenge |
|---|---|
| `lane-frontend.md` **F-1** (phantom glass-ui, RED) | **D-1** — confirmed by lockfile count (`grep -c glass-ui package-lock.json` → 0) and localised: 4 specifiers in this file, 3 more in the sibling sidebar; the easing scene is unrenderable after `npm ci`. |
| `lane-frontend.md` **F-6** (clean glass boundary, GREEN) | **P-6** — corroborated and given its mechanism (structural emit typing at `:163-169`). |
| `lane-frontend.md` **S-7** (`CopyButton`, AMBER) | **D-11** — a defect S-7 did not record (`isCopied` never resets → latched `aria-label`), in the file S-7 already marks for partial replacement. |
| `lane-frontend.md` §6.5 (PRM mechanism inconsistency) | **P-3** — the inconsistency resolves *in this component's favour*; it is the only reactive site of the three. |
| `lane-frontend.md` §4 roster row `335 easing/EasingTarget.vue G` | Line count and glass-ui consumer list both confirmed exactly. |
| `lane-library.md` §4 (CSS/keyframes parse seam) | No overlap. This component touches the parse seam only through `cubicBezierToString` (D-15) and `previewAnim.setTimingFunction` one level up (`useEasingDemo.ts:308-315`, already `try`/`catch`-guarded). **No contradiction of that lane.** |

**No census finding is contradicted by the tree as read.**
