claude-opus-5[1m]

# CHALLENGE · `CoefficientsPanel` · axis **L (LIBRARY)**

**Target** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/visualization/CoefficientsPanel.vue` (26 lines).
**Mode** static, read-only. No dev server, no browser tooling, no writes to any product tree. Live-only claims are tagged **UNPROVEN-NEEDS-LIVE** for SS-13.
**Tree state** branch `m/w1-bump-migration`, 28 dirty paths. **All three files of the panel subtree are CLEAN** (`git status --porcelain` on `CoefficientsPanel.vue` / `CoefficientsSpectrum.vue` / `FrequencyGraph.vue` → empty), so every line cite below is `[HEAD ≡ WT]`. The call site `VisualizationView.vue` IS dirty, but its diff is 2 lines at `:24-28` (import block) — `:162` and `:273`, both cited here, are `[HEAD ≡ WT]`.
**Installed deps as read** `vue 3.5.38` · `@mkbabb/glass-ui 4.0.0` · `reka-ui 2.9.10` · `@mkbabb/keyframes.js 4.3.0`.

**Verdict — DEFECTIVE, in the specific way a 26-line file can be:** the panel itself contains no bug, because it contains almost nothing. It is a *composition contract*, and the contract is wrong in five places at once. It imports a canvas component whose entire interactive API it declines to wire (D-2, D-6), hosts it in a container that never defers anything while asking it to (D-4), takes a direct store dependency and then reads one of the four fields that dependency exists to provide (D-3), reaches across a route boundary for a component that has no other consumer (D-5), and passes its rows into a `TransitionGroup` whose animation has been inert since the B.W2.c Tooltip lift (D-1). **17 defects · 0 blockers · 5 superlatives.**

---

## §0 · Read set (whole, read-only)

| File | LOC | Why it is in the set |
|---|---|---|
| `web/src/components/visualization/CoefficientsPanel.vue` | 26 | target |
| `web/src/components/shared/CoefficientsSpectrum.vue` | 168 | direct import (`:6`) |
| `web/src/components/equation/FrequencyGraph.vue` | 247 | direct import (`:5`) — **the canvas render path** |
| `web/src/stores/workspace.ts` | 471 | direct import (`:3`) |
| `web/src/components/ui/tooltip/{index.ts,Tooltip.vue}` | 1 + 38 | transitive (Spectrum `:21`) — load-bearing for D-1 |
| `web/src/lib/types.ts` `:1-27` | — | `BasisComponent` / `EpicycleData` |
| `@mkbabb/glass-ui@4.0.0` `dist/{configurator.js, useConfiguratorState-kiIlun8I.js, tooltip.js, TooltipProvider-B3MkB_8P.js, animated-digit.js, useAnimatedNumber-C_3wZLx4.js}` | — | `ConfiguratorLayer` reveal semantics, Tooltip root shape, AnimatedDigit ticker |
| `reka-ui@2.9.10` `dist/Tooltip/TooltipRoot.js`, `dist/Popper/PopperRoot.js`, `dist/Primitive/Slot.js` | — | root-vnode shape (D-1), empty-slot behavior (D-10) |
| `vue@3.5.38` `runtime-dom.esm-bundler.js:1464`, `runtime-core.esm-bundler.js:4672-4679` | — | TransitionGroup child filter + non-element-root warning |
| Comparators (not challenged, cited): `equation/EqCoefficientsPanel.vue` (17) · `ui/CollapsibleSection.vue` (70) · `visualization/composables/useCanvasSetup.ts` (49) · `visualization/BasisCanvas.vue` `:435-447` · `visualization/ContourSettings.vue` `:103-146` · `visualization/BasisSelector.vue` `:171` · `VisualizationView.vue` `:162,:273` · `App.vue` `:10-18` · `api/services/computation.py` `:98-120` · `src/fourier_analysis/epicycles.py` `:47-56` | — | establishes the house pattern each defect departs from |

---

## §1 · Finding index

| # | Sev | Finding |
|---|---|---|
| D-1 | MAJOR | The `coeff-list` TransitionGroup is **wholly inert** — the `v-for` child is a Fragment-root component; 17 lines of scoped CSS are dead + a dev warning per row |
| D-2 | MAJOR | Dead click affordance — the spectrum canvas paints `cursor-pointer` and emits `toggle-harmonic`; the panel (its only consumer) binds nothing |
| D-3 | MAJOR | Error/in-flight conflation — the panel takes a store dependency and reads 1 of 4 relevant fields; a failed compute is invisible |
| D-4 | MAJOR | `:default-open="false"` defers **nothing** — `ConfiguratorLayer` always renders its slot; 12 Tooltip trees + 12 spring loops + a 40-bar canvas paint behind a collapsed, `inert`, zero-height region, with no visibility gate |
| D-5 | MAJOR | Colocation inversion — `FrequencyGraph.vue` sits in `components/equation/` and has exactly one consumer, in `components/visualization/` |
| D-6 | MINOR | Dead API surface — 2 of 4 props + 2 of 2 emits unreachable from the only consumer; ~25 lines of unreachable branches incl. the whole log-magnitude path |
| D-7 | MAJOR | Theme/DPR/resize staleness — the only canvas in the tree with no clock and no observer to self-heal |
| D-8 | MINOR | `deep: true` on a `markRaw`'d array — zero dependency benefit, ~401×4 property walks per trigger |
| D-9 | MINOR | Positional key (`${comp.index}-${i}`) defeats identity reuse on re-sort |
| D-10 | MINOR | Misplaced `v-if` — a whole Tooltip tree mounts around a comment node when `totalComponents ≤ 12`; and the tooltip copy lies |
| D-11 | MINOR | Graph caps at 40 bars while the readout says "12 / N" — the `40` is authored twice across the component boundary |
| D-12 | MINOR | Canvas tooltip lives inside the `overflow-x-auto` port — clipped at the left edge, perturbs scrollWidth at the right |
| D-13 | MINOR | Unguarded division by max amplitude — `NaN%` width / `Infinity` bar height on a degenerate all-zero spectrum |
| D-14 | MINOR | Dead code: unused `onUnmounted` import, write-only `scroll` local, unreachable `\|\| "#888"` fallback; `noUnusedLocals` is off so `vue-tsc` cannot catch any of it |
| D-15 | INFO | Store-coupling asymmetry with its twin (store-read vs prop-fed) — the viz panel cannot render without Pinia |
| D-16 | INFO | **R5-7 extension** — a third loop-invisibility class: imperative canvas loops |
| D-17 | MINOR | `transition-all` on the amplitude bar, ten lines above a comment boasting "no `transition: all`" |
| S-1..S-5 | — | superlatives, §3 |

---

## §2 · Defects

### D-1 · MAJOR — the `coeff-list` TransitionGroup is wholly inert

**Claim.** Every enter, leave and move transition declared for the coefficient list never runs. The 17 lines of scoped CSS at `CoefficientsSpectrum.vue:147-163` are dead, and in a dev build Vue emits one warning per rendered row (12 by default, 40 expanded).

**Provenance / mechanism.** The `v-for` child of the `TransitionGroup` is not an element — it is the local Tooltip shim:

- `CoefficientsSpectrum.vue:79-84` — `<TransitionGroup name="coeff-list"> <Tooltip v-for=… :key=… side="bottom">`.
- `web/src/components/ui/tooltip/Tooltip.vue:26-37` — the shim's root is `<GlassTooltip>` with **two** children in the default slot (`TooltipTrigger` + `TooltipContent`).
- glass-ui `Tooltip` → `dist/TooltipProvider-B3MkB_8P.js:5-20` — root is reka `TooltipRoot`.
- reka `TooltipRoot` → `reka-ui/dist/Tooltip/TooltipRoot.js` (render fn) — root is `PopperRoot`.
- reka `PopperRoot` → `reka-ui/dist/Popper/PopperRoot.js` — `return renderSlot(_ctx.$slots, "default")`. **`renderSlot` produces a `Fragment`.**

So the component chain's terminal root vnode is a Fragment, and `vnode.el` is the fragment's start anchor — a `Text` node, not an `Element`. Two independent consequences in the installed Vue:

1. **Move/FLIP is skipped.** `@vue/runtime-dom/dist/runtime-dom.esm-bundler.js:1464` — `if (child.el && child.el instanceof Element && …)` gates entry into `prevChildren`/`positionMap`. A Fragment-root child never enters, so `.coeff-list-move` (`:161-163`) is never applied.
2. **Enter/leave hooks never fire, and dev warns.** `@vue/runtime-core/.../runtime-core.esm-bundler.js:4672-4679` — `if (vnode.transition) { if (!isElementRoot(root)) warn('Component inside <Transition> renders non-element root node that cannot be animated.'); setTransitionHooks(root, vnode.transition) }`. The hooks land on a Fragment vnode; `processFragment` never invokes them. `.coeff-list-enter-active/-enter-from/-leave-active/-leave-to` (`:147-160`) are dead.

**Regression provenance.** The file's own header dates the cause: *"B.W2.c — … the bespoke `:hover` CSS tooltip lifts to the glass-ui `Tooltip` primitive (the local shim wraps `Tooltip` + `TooltipTrigger` + `TooltipContent`), discharging the L5 §5 A8 LOW a11y gap"* (`CoefficientsSpectrum.vue:16-21`). Before that lift the transition child was the plain `.coeff-row` div (now demoted to the Tooltip's slot child at `:85`). The a11y gap was discharged by silently trading away the animation — and neither the A.W3.d motion annotation at `:146` nor the B.W2.c note records the trade.

**Falsifier.** Any one of these kills the claim: (a) reka `PopperRoot` renders a single element root in the installed version — read `reka-ui/dist/Popper/PopperRoot.js`, it does not; (b) the installed Vue applies transition hooks to Fragment roots — `runtime-dom…:1464` says otherwise; (c) live: open the Coefficients layer in a dev build with the console visible — absence of the `non-element root node that cannot be animated` warning, or a visible slide-in on the rows, falsifies. **UNPROVEN-NEEDS-LIVE only for the console-warning count**; the mechanism is settled statically.

---

### D-2 · MAJOR — the spectrum canvas advertises a click that does nothing

**Claim.** `FrequencyGraph` paints `cursor: pointer` over the bars and emits `toggle-harmonic` on click; `CoefficientsPanel` — the component's **only** consumer in the repo — binds no listener. The affordance is a lie.

**Provenance.**
- `FrequencyGraph.vue:179` — `class="block cursor-pointer text-muted-foreground"`, with `@click="onClick"` at `:182`.
- `FrequencyGraph.vue:151-155` — `onClick()` emits `toggle-harmonic`.
- `FrequencyGraph.vue:15-18` — the emit contract (`toggle-harmonic`, `hover-harmonic`).
- `CoefficientsPanel.vue:17-22` — the sole callsite: `:components`, `:max-bars`, `class`. **No `@toggle-harmonic`, no `@hover-harmonic`.**
- Sole-consumer proof: `grep -rn "FrequencyGraph" web/src` → 2 hits, both `CoefficientsPanel.vue` (`:5`, `:17`).

**Consequence.** A user hovers a bar (tooltip appears, cursor becomes a pointer — every affordance says *clickable*), clicks, and nothing happens. There is no harmonic-toggle feature anywhere in the visualization route to receive the event.

**Falsifier.** A binding of either emit anywhere in `web/src` (grep says none), or a global/injected handler inside `FrequencyGraph` itself (there is none — the only `emit(` calls are `:136`, `:146`, `:153`).

---

### D-3 · MAJOR — the panel takes a store dependency and reads one field of four

**Claim.** `CoefficientsPanel` couples directly to the Pinia workspace store, then consumes only `epicycleData`. `computing` and `error` — the two fields that exist precisely to let a readout distinguish *not yet* from *in flight* from *failed* — are ignored. The panel's empty state therefore conflates three distinct system states under one string, and a failed epicycle computation has **no user-visible surface at all** in this route.

**Provenance.**
- `CoefficientsPanel.vue:8-10` — `const store = useWorkspaceStore(); const components = computed(() => store.epicycleData?.components ?? []);` — the only store read.
- `stores/workspace.ts:49-51` — `loading`, `computing`, `error` all exist and are exported (`:441-443`).
- `stores/workspace.ts:301-304` — `runComputeEpicycles` sets `error.value = e.message ?? "Epicycle computation failed"` and **rethrows**.
- `ContourSettings.vue:127-130` — the only caller wraps it in `Promise.allSettled([...])`, which **swallows the rejection**.
- `VisualizationView.vue:162` — the only `store.error` render is `v-else-if="store.error && !store.imageSlug"`, i.e. gated on there being *no image*. In the compute-failure flow an image is loaded, so this branch is false.
- `VisualizationView.vue:273` — `<CoefficientsPanel v-if="store.epicycleData || store.computing" />`.

**Failure walk.** User adjusts the harmonic slider → debounced `runCompute()` → `computeEpicycles` 500s → `store.error` set, rejection swallowed, `computing` returns false, `epicycleData` stays null → the mount guard at `:273` goes false → **the Coefficients layer silently vanishes from the panel stack.** If prior data existed, the panel instead shows *stale* coefficients with no staleness signal. In neither case is `store.error` rendered anywhere.

**Falsifier.** A toast on the epicycle path (`VisualizationView.vue:35` has `useToast`, but its only calls are `:111` and `:114`, both on the publish path), or an `error`-aware branch inside `CoefficientsSpectrum` (it has exactly one state predicate, `v-if="topComponents.length"` at `:78`).

---

### D-4 · MAJOR — `:default-open="false"` defers nothing; the whole subtree mounts and paints behind a collapsed layer

**Claim.** The panel asks for a closed-by-default layer, but `ConfiguratorLayer` renders its default slot unconditionally in both the HEAD-pinned (3.1.0) and installed (4.0.0) producer versions. Collapsing is CSS-only. So on first epicycle data the panel eagerly mounts 12 four-deep Tooltip trees, 12 `AnimatedDigit` spring animators, and a canvas that immediately paints 40 bars — all inside a zero-height, `inert`, invisible region, and all re-run on every recompute.

**Provenance.**
- `CoefficientsPanel.vue:14` — `:default-open="false"`.
- glass-ui `4.0.0` `dist/useConfiguratorState-kiIlun8I.js:181-192` — the region div is `role="region"`, `aria-hidden: !open`, `inert: !open || undefined`, `style: {gridTemplateRows: open ? "1fr" : "0fr"}`, and the body renders `C(a.$slots, "default", {}, void 0, !0)` **with no `v-if`**.
- Same at HEAD's pin: `git -C /Users/mkbabb/Programming/glass-ui show v3.1.0:src/components/custom/configurator/ConfiguratorLayer.vue` — the header records the M.W2 Lane A migration *away* from reka `Collapsible`/`Presence` to *"the canonical CSS-only animated-reveal pattern (`grid-template-rows: 0fr ↔ 1fr`)"*. So this is not a 3→4 bump regression; it is the primitive's contract at both pins.
- Cost inventory: `CoefficientsSpectrum.vue:37-39` mounts 12 rows; each row is `Tooltip`(shim) → `GlassTooltip` → `TooltipRoot` → `PopperRoot` + `TooltipTrigger` + `TooltipContent`/portal; each row also mounts an `AnimatedDigit` (`:99-103`) whose `useAnimatedNumber` (`glass-ui/dist/useAnimatedNumber-C_3wZLx4.js`) calls `SmoothProgress.play(...)`, and each `SmoothProgress` owns **its own** `RAFPlayback` (`keyframes.js/dist/timeline-BjcmprQ6.js` — `_playback = new S()`, `_startLoop()` → `this._playback.drive(...)`). On every recompute all 12 amplitudes change ⇒ 12 concurrent, invisible rAF loops.
- `FrequencyGraph.vue:159` — `onMounted(() => draw())`; `:157` — the props watcher re-`draw()`s on every recompute, with **no visibility predicate**.

**Why this is a defect and not a taste call.** The repo already owns the correct discipline and applies it to its other canvas: `BasisCanvas.vue:435-447` builds an `IntersectionObserver` and calls `anim.setCanvasVisible(visible)`, feeding the reference-counted off-screen gate at `stores/animation.ts:41-53,95-103` (census: lane-frontend §6 Path A, *"I.γ off-screen gate"*). And the panel's own twin defers correctly: `EqCoefficientsPanel.vue:13` uses `CollapsibleSection` → reka `Collapsible` + `CollapsibleContent`, which unmounts its content when closed. **The visualization route picked the collapsed default *and* the always-mounting container — the worst cell of the matrix.**

**Falsifier.** Show a `v-if`/`Presence` around the ConfiguratorLayer body in either 3.1.0 or 4.0.0 (there is none), or show that `AnimatedDigit` shares a global ticker rather than owning a `RAFPlayback` per instance (`useAnimatedNumber` constructs `new SmoothProgress(...)` per composable call; `SmoothProgress` constructs `_playback = new S()` per instance). Live confirmation of the *magnitude* (frame cost of 12 invisible springs + one invisible 40-bar draw) is **UNPROVEN-NEEDS-LIVE**; the eager-mount fact is static.

---

### D-5 · MAJOR — colocation inversion: the canvas lives in the wrong route folder

**Claim.** `FrequencyGraph.vue` (247 LOC, the second-largest canvas in the repo) is filed under `web/src/components/equation/`, but the equation route never imports it. Its only consumer is `web/src/components/visualization/CoefficientsPanel.vue`.

**Provenance.** `grep -rn "FrequencyGraph" web/src` → `CoefficientsPanel.vue:5` (import) and `:17` (usage). Nothing else. Meanwhile `web/src/components/shared/` — the directory created by the very D7/D11 extraction that produced `CoefficientsSpectrum` (`CoefficientsSpectrum.vue:2-9`) — contains **exactly one file**.

**Why it matters on the LIBRARY axis.** The import at `CoefficientsPanel.vue:5` is the only cross-route component edge in the panel, and it points the wrong way: a visualization-route panel reaches into the equation route's folder. The census reads the file under `components/equation/` (lane-frontend §2 row: *"`components/equation/FrequencyGraph.vue` | **247** | **Canvas2D spectrum bar graph**"*), so any per-route LOC or ownership derivation attributes 247 lines of visualization-route render path to the equation route. Either move it to `shared/` beside its sibling, or move it to `visualization/` and stop calling it shared.

**Falsifier.** Any equation-route import of `FrequencyGraph` (none exists), or a documented intent to re-consume it from `EquationView` (`EquationView.vue:213` renders `EqCoefficientsPanel` with no `#graph` slot; `EqCoefficientsPanel.vue:14` passes no slot content — the divergence is explicitly recorded at `CoefficientsSpectrum.vue:7-9`).

---

### D-6 · MINOR — half of `FrequencyGraph`'s public API is unreachable from its only consumer

**Claim.** With `CoefficientsPanel.vue:17-22` as the sole callsite, 2 of 4 props and 2 of 2 emits are dead, rendering ~25 lines of branch code unreachable in the shipped app.

**Provenance (all `FrequencyGraph.vue`).**

| Dead surface | Declared | Unreachable code it gates |
|---|---|---|
| `activeIndices?: Set<number>` | `:7` | `:77` `isActive` is always `true` ⇒ the `0.25` alpha branch `:86` and the `0.2` branch `:107` never execute |
| `logScale?: boolean` | `:9,:12` | `:39` log branch of `maxAmplitude`; `:48` log branch of `barFraction`; `:169` the `log₁₀(\|c_n\| + 1)` axis label; `:203-206` the entire log row of the tooltip |
| `toggle-harmonic` | `:16` | `:151-155` `onClick` (see D-2) |
| `hover-harmonic` | `:17` | `:136`, `:146` emits |

**Sharpest consequence.** The W5.d axis annotation (`:164-171`) exists to *"name explicitly"* the transform applied to bar heights so *"the viewer is not left to infer a silent log mapping"* — an honest and welcome instinct — but with `logScale` permanently `false` at the only callsite it renders the constant string `|c_n|` forever, and its `:title` carries a paragraph about a log axis that can never be selected.

**Falsifier.** A second consumer passing `logScale`/`activeIndices` (grep: none), or a route/query flag flipping them (none — the props have no other writer).

---

### D-7 · MAJOR — the only canvas in the repo with nothing to make it redraw

**Claim.** `FrequencyGraph` samples theme-dependent paint at draw time but subscribes to no theme, DPR, or size signal, and has no clock. Its bitmap therefore goes stale and stays stale.

**Provenance.**
- `FrequencyGraph.vue:108` — `ctx.fillStyle = getComputedStyle(canvas).getPropertyValue("color") || "#888"` — the index-label color, sampled from the `text-muted-foreground` class at `:179`, which is theme-dependent.
- `FrequencyGraph.vue:56` — `const dpr = window.devicePixelRatio || 1`, sampled per draw.
- `FrequencyGraph.vue:157-159` — the *complete* set of draw triggers: one props watcher and `onMounted`.
- `App.vue:10-18` — the app re-resolves viz colors on dark-mode flip via a `MutationObserver` on `documentElement.class`; `FrequencyGraph` participates in none of it (it does not import `VIZ_COLORS`; `grep -rn "VIZ_COLORS" web/src` lists 6 files, not this one).
- The house alternative exists and is 49 lines: `visualization/composables/useCanvasSetup.ts:20-45` does DPR sizing **and** installs a `ResizeObserver` with an `onUnmounted` disconnect (census: lane-frontend §2, *"DPR-aware canvas init + ResizeObserver"*). `FrequencyGraph.vue:56-64` reimplements the DPR half by hand and drops the observer half.

**Why this canvas specifically.** Of the three canvases (census lane-frontend §6), `BasisCanvas` self-heals via the animation clock + ResizeObserver, and `ConvergencePlot` self-heals via its own rAF (`:67-69`). `FrequencyGraph` is *"pure watch-driven"* (census §6 Path C) — which the census records neutrally, and which is exactly why it is the one surface where a theme flip persists until the next recompute.

**Falsifier.** Show a redraw path on theme change (none: the watcher sources at `:157` are all props), or show that Chrome/Safari re-fire the props watcher on a `documentElement.class` mutation (they do not). Whether the resulting color delta is *perceptible* is **UNPROVEN-NEEDS-LIVE**; the staleness is static. Second live residue: whether `getPropertyValue("color")` serializes to a `fillStyle`-parseable string under Tailwind v4 `oklch` tokens — if it does not, `fillStyle` assignment is a **silent no-op** and the labels inherit the previous bar's spectrum color. Flagged, not claimed. **UNPROVEN-NEEDS-LIVE.**

---

### D-8 · MINOR — `deep: true` over a `markRaw`'d array buys nothing and costs a full walk

**Claim.** `watch(() => [props.components, props.logScale, props.maxBars, props.activeIndices], () => draw(), { deep: true })` (`FrequencyGraph.vue:157`) registers zero additional dependencies on this route, while traversing ~401 objects × 4 fields on every trigger.

**Provenance.** `stores/workspace.ts:299` — `epicycleData.value = markRaw(result)`, held in a `shallowRef` (`:44`). The stored object is therefore never proxied, so `store.epicycleData.components` is a plain array of plain objects. Deep traversal of non-reactive values collects no deps. Default `n_harmonics` is 200 (`lib/defaults.ts:7`) and the backend emits one component per signed harmonic (`api/services/computation.py:109-118`), so the array is ~401 elements in the default configuration; the `BasisSelector` slider tops out at 500 (`BasisSelector.vue:172`) ⇒ up to ~1001.

**Falsifier.** Show that `props.components` is reactive on this route (it is not — `markRaw` at `workspace.ts:299`), or show a mutation-in-place of a component object that `deep` is there to catch (there is none; the store always assigns a fresh result). Note the honest limit: the *equation* route feeds the same component from a different source, so this claim is scoped to the `CoefficientsPanel` path.

---

### D-9 · MINOR — the row key is positional, which is what the TransitionGroup is trying not to be

**Claim.** `:key="`${comp.index}-${i}`"` (`CoefficientsSpectrum.vue:82`) fuses a stable identity with an array position. `comp.index` is the signed harmonic number and is already unique per component (one entry per frequency — `api/services/computation.py:109-118`). Appending `-${i}` makes the key change whenever the sort order changes, so a harmonic that *moves* is destroyed and recreated instead of moved — precisely the case a `TransitionGroup` exists to animate.

**Provenance.** `src/fourier_analysis/epicycles.py:56` — `self.components = sorted(components, key=lambda c: c.amplitude, reverse=True)`; ordering is amplitude-dependent, so it genuinely permutes between computes.

**Falsifier.** A duplicate `comp.index` in any response (the backend emits `c.frequency` once per component), or evidence that Vue keys on identity regardless of the key expression (it does not).

---

### D-10 · MINOR — the expand button's `v-if` is on the wrong element

**Claim.** `CoefficientsSpectrum.vue:124-135` places `v-if="totalComponents > 12"` on the `<Button>` (`:126`) rather than on the wrapping `<Tooltip>` (`:124`). When `1 ≤ totalComponents ≤ 12`, a complete Tooltip tree (shim → GlassTooltip → TooltipRoot → PopperRoot → Trigger + portal) mounts around a Vue comment placeholder.

**Reachability.** Real on this route: the `n_harmonics` slider's minimum is **1** (`BasisSelector.vue:171-172`, `:min="1" :max="500"`, and the numeric input clamps to `[1,500]` at `:165`), so `totalComponents` can be as low as 3.

**Mechanism.** `reka-ui/dist/Primitive/Slot.js` — `const firstNonCommentChildrenIndex = children.findIndex(c => c.type !== Comment); if (firstNonCommentChildrenIndex === -1) return children;` ⇒ with the Button `v-if`'d out, the trigger renders the comment vnode. No crash; pure waste.

**Rider (own claim).** The tooltip copy is wrong independently of the guard: `Show top 40 of ${totalComponents} coefficients` (`:124`) promises 40 even when `totalComponents` is 17. `Math.min(40, totalComponents)` is the honest string.

**Falsifier.** Show reka's `Slot` refusing to mount on an all-comment slot (it returns the children), or show `n_harmonics` floored above 6 anywhere (`BasisSelector.vue:30` clamps to `Math.max(1, Math.min(500, …))`).

---

### D-11 · MINOR — the graph shows 40 bars; the readout says 12

**Claim.** The panel caps the canvas at 40 bars (`CoefficientsPanel.vue:20`) and the shared child renders that graph immediately above a count readout that says `12 / 401` (`CoefficientsSpectrum.vue:70` slot, then `:72-76` readout, with the collapsed slice `12` at `:38`). The two numbers on screen disagree by design and nothing reconciles them.

**Provenance.** `CoefficientsPanel.vue:20` `:max-bars="40"` · `CoefficientsSpectrum.vue:38` `expanded.value ? 40 : 12` · `:74` `{{ topComponents.length }} / {{ totalComponents }}`. The magic `40` is authored **twice, across a component boundary**, by two files that do not import a shared constant; if either moves, the panel silently misreports.

**Falsifier.** A shared exported cap consumed by both (none), or a readout that reflects the graph cap (it reflects the list slice).

---

### D-12 · MINOR — the canvas tooltip is rendered inside the scroll port that clips it

**Claim.** The bespoke hover tooltip is an absolutely-positioned child of the `overflow-x-auto overflow-y-hidden` scroll container, positioned at the bar's content-x with `-translate-x-1/2`. Near the left edge its box lands at negative content coordinates and is clipped; near the right edge it extends the scrollable width.

**Provenance.** `FrequencyGraph.vue:172-176` the scroll port; `:236-239` `.scrollbar-thin { position: relative }` makes that same port the containing block; `:185-191` the tooltip with `absolute … -translate-x-1/2` and `left: ${tooltipPos.x}px`; `:138` `tooltipPos.x = e.clientX - rect.left + scrollRef.value!.scrollLeft` (content coordinates — correct for the containing block, which is the point). Bar 0's center is `BAR_GAP + 4 + BAR_W/2 = 14` px (`:25-26`, `:73`); a `whitespace-nowrap` tooltip carrying an `Amplitude / Phase` grid is far wider than 28 px, so its left half is at negative x.

**Falsifier.** Move the tooltip out of the scroll port (or teleport it) and the symptom vanishes — which is also the fix. Exact number of affected bars depends on rendered tooltip width: **UNPROVEN-NEEDS-LIVE**. The clipping mechanism (LTR overflow does not expose content left of the content origin) is not in doubt.

---

### D-13 · MINOR — unguarded division by the max amplitude

**Claim.** Both children divide by a maximum that they never prove non-zero.

**Provenance.** `CoefficientsSpectrum.vue:43-45` returns `topComponents[0].amplitude` (or `1` only when the list is empty) and `:93` computes `width: ${(comp.amplitude / maxAmplitude) * 100}%` → `NaN%` → an invalid declaration → the bar div (`h-full rounded-full`, `:91`) falls back to auto width and fills the whole track, i.e. an all-zero spectrum renders as all-full bars. `FrequencyGraph.vue:36-40,49` — `barFraction` returns `Math.max(val / 0, 0.008)` = `Infinity`, so `barH` at `:82` is `Infinity` and the path at `:95-103` degenerates.

**Reachability, stated honestly.** Requires every returned amplitude to be exactly 0 — a contour whose resampled path is a single point at the origin. `saveContourPoints` (`workspace.ts:263`) accepts hand-edited points, so it is reachable in principle, not in practice. Guarding is one `|| 1`.

**Falsifier.** Prove `amplitude[0] > 0` for all reachable inputs (`epicycles.py` sorts descending but does not floor the maximum; `formatPercent` at `CoefficientsSpectrum.vue:57-60` guards this exact case with `if (!maxAmplitude.value) return "0%"` — the guard exists in one of the three consumers of the same quantity, which is itself the evidence that it was known and half-applied).

---

### D-14 · MINOR — dead code the toolchain cannot see

**Claims (all `FrequencyGraph.vue`).**
- `:2` imports `onUnmounted`; the identifier appears nowhere else in the file (the file has no teardown at all — see S-4).
- `:118-119` binds `const scroll = scrollRef.value` and uses it only in the null-guard; the value is never read again.
- `:108` `… .getPropertyValue("color") || "#888"` — the `||` fallback is unreachable: computed `color` always resolves to a used value.

**Why it survives.** `web/tsconfig.json` sets `strict: true` but **not** `noUnusedLocals`/`noUnusedParameters`, and the repo's only frontend gate besides Playwright is `vue-tsc -b` (census lane-frontend §1: *"No unit-test runner — vitest is ABSENT"*). So none of the three is machine-detectable today.

**Falsifier.** A use of `onUnmounted`/`scroll` in the file (grep: none), or a lint config enabling unused-locals (`grep -rn noUnusedLocals web/tsconfig*.json` → none).

---

### D-15 · INFO — the two consumers of one shared child have two different data contracts

**Claim.** `CoefficientsPanel` reads Pinia directly (`:3,:8,:10`); its twin `EqCoefficientsPanel` takes `components` as a prop (`EqCoefficientsPanel.vue:6-8`) and is fed from the route shell (`EquationView.vue:213`). One extraction, two entry contracts.

**Consequences.** (i) The viz panel cannot be rendered in isolation without an active Pinia instance — relevant because the repo has no unit-test runner and may acquire one. (ii) The census treats the pair as a single convergence row (lane-frontend §4: *"`visualization/CoefficientsPanel.vue` / `EqCoefficientsPanel.vue` | 26 / 17 | `./metric-stack` (4.0.0) → `./metric` (7.0.0)"*), which is only true of their markup, not their contracts. (iii) The panel's store coupling is what makes D-3 a *choice* rather than a limitation: it could read `computing`/`error` and does not.

**Falsifier.** Show a prop path into `CoefficientsPanel` (`VisualizationView.vue:273` passes none), or show `EqCoefficientsPanel` reading the store (it imports no store).

---

### D-16 · INFO — R5-7 extension: a third template-loop invisibility class

**The corpus rows.** R5-7 (`lane-fourier-r3-r6.md:125`, TRUE / ADOPT-AS-FACT / CARRY→F.W4): *"template-loop evidence keyed to **component** callsites is blind to native HTML element loops"* — `instance.loop.paper-sidebar` derived to literally `[]` because `PaperSidebar.vue`'s three loops are on native `<li>`. R6-5 (`:139`) cures it with a `NATIVE_TEMPLATE_LOOP` family, gate GREEN 11/11. F.W4's charge (CENSUS-2026-08-03.md:362): *"count native element loops or inherit the blind spot"*.

**This subtree, counted by hand.** `grep -n "v-for"` over all three files returns **exactly one hit**: `CoefficientsSpectrum.vue:81`, and it is on a **component** (`<Tooltip>`), so it *is* visible to the original callsite-keyed deriver — the same shape as the populated sibling leaf the intake cites (`instance.loop.presets`, keyed `callsite:…FunctionInput.vue:157:Tooltip:0.0.0.0.3.1.0`). **Native element loops in this subtree: zero.** So both the R5 model and the R6 cure report this panel accurately — and both report it as *one* loop.

**The extension.** The panel's dominant repeated visual structure is not in any template. `FrequencyGraph.vue:75` (`for (let i = 0; i < n; i++)` — the bar draw) and `:125` (the hit-test scan) render and hit-test up to 40 repeated units imperatively into a canvas. No template-loop family — neither callsite-keyed nor `NATIVE_TEMPLATE_LOOP` — can see them, because there is no template node to key. Any instance/loop denominator built for this route will report the Coefficients panel as *1 loop over ≤40 rows* when it is in fact *1 template loop over ≤40 rows **plus** 2 imperative loops over ≤40 bars*, i.e. it undercounts the rendered repetition of this panel by half and undercounts against a data array of ~401.

**Carry.** F.W4 should add a third family — call it `CANVAS_IMPERATIVE_LOOP` — keyed to `for`/`while` bodies that issue `ctx.*` draw calls, or explicitly declare canvas render loops out of scope. Silence is the failure mode R5-7 already diagnosed once.

**No contradiction with the intake.** Nothing in the tree contradicts R5-7 or R6-5; this row extends them. (Corroboration in passing: `grep -n "v-for" web/src/components/paper/PaperSidebar.vue` → 65, 87, 105 — unchanged, as R6-5 recorded.)

**Falsifier.** A derivation family that already counts canvas draw loops (none named in the intake or the census), or a claim that ≤40 canvas bars are not "instances" for the purpose of the derivation — a defensible ruling, but one that must be *made*, not defaulted into.

---

### D-17 · MINOR — `transition-all` ten lines above a comment forbidding it

**Claim.** `CoefficientsSpectrum.vue:91` applies Tailwind's `transition-all duration-500 ease-out` to the amplitude bar — the one element in the file that actually animates. The scoped block below it opens with *"A.W3.d — named properties + canonical tokens, no `transition: all`"* (`:146`).

**Provenance / mechanism.** `:91` `class="h-full rounded-full transition-all duration-500 ease-out"`, with `width` **and** `backgroundColor` bound inline at `:92-96`. `transition-all` transitions every animatable property, including the inline `background-color`, and (unlike the file's own named transitions at `:147-152`) hardcodes `ease-out` instead of a `--ease-*` token. `transition-[width]` is the intended shape.

**Falsifier.** Show that `transition-all` was intended for the color as well (the A.W3.d comment forbids the idiom categorically, and the color is otherwise recomputed only on data change).

---

## §3 · Superlatives (L-18 runs both ways)

**S-1 · The D7/D11 extraction is exemplary, and its divergence handling is the reason.** `CoefficientsSpectrum.vue:2-15` names both consumers, quantifies the prior duplication (*"~95% identical"*), enumerates what was shared (bars, tooltip, count/expand), and — the part that is genuinely rare — hoists **the single structural divergence into a named slot** (`#graph`, `:68-70`) rather than a `showGraph` boolean or a route sniff. The consumer that needs it passes it (`CoefficientsPanel.vue:16-23`); the one that does not passes nothing (`EqCoefficientsPanel.vue:14`). *Falsifier:* a boolean/flag branch inside the shared child selecting consumer-specific markup — grep for `route`/`props.variant`/`isViz` in `CoefficientsSpectrum.vue` returns nothing.

**S-2 · Genuinely Goldilocks at 26 lines.** The panel holds one import block, one store handle, one derived value, and a template. There is no logic to be wrong. Every knob it needs is a prop (`empty-text`, `:max-bars`), and the empty-state copy is parameterized *at the consumer* rather than branched inside the child (`CoefficientsPanel.vue:15` vs. the child's `withDefaults` at `CoefficientsSpectrum.vue:24-32`). Most of this challenge is about what the panel *wires*, not what it *does* — which is the correct failure profile for a composition root. *Falsifier:* any business logic in the file (there is one `computed`, and it is a null-safe read).

**S-3 · The canvas sizes from data, not from a measured container — and that is what saves it.** `FrequencyGraph.vue:31-34` derives `canvasWidth` from `displayComponents.length`, never from `getBoundingClientRect`. Because of that, mounting inside the collapsed, zero-height `ConfiguratorLayer` region (D-4) does **not** produce the classic blank/zero-width canvas that a measured setup would. The component is accidentally immune to the trap its host sets for it. *Falsifier:* a width read from the DOM in `draw()` — `:56-65` reads only `devicePixelRatio` and the computed width.

**S-4 · Zero teardown obligations across the whole subtree, verified by enumeration.** `grep -n "addEventListener\|setInterval\|setTimeout\|requestAnimationFrame\|Observer" ` over `CoefficientsPanel.vue`, `CoefficientsSpectrum.vue`, `FrequencyGraph.vue` returns **nothing** — the single hit in the three files is the unused `onUnmounted` import (D-14). Every listener is template-bound (`FrequencyGraph.vue:180-182`) and dies with the node; the only long-lived animators are `AnimatedDigit`'s springs, which self-dispose (`useAnimatedNumber-C_3wZLx4.js` — `getCurrentScope() && onScopeDispose(T)` where `T` stops the playback); the store's one timer is cleared under `onScopeDispose` (`workspace.ts:74-76`). **There is no leak here.** For a panel that mounts and unmounts on every recompute (`VisualizationView.vue:273`), that is worth saying out loud. *Falsifier:* any manual subscription in the three files.

**S-5 · Correct DPR handling, and an axis annotation written for the reader's honesty.** `FrequencyGraph.vue:56-64` does the full ceremony — backing-store `width/height` scaled by DPR, CSS `style.width/height` pinned to logical px, `setTransform(dpr,0,0,dpr,0,0)`, then `clearRect` in logical units — which is more than most hand-rolled canvases get right. And `:164-171` deliberately names the height transform in the UI (*"the transform applied to bar heights is named explicitly so the viewer is not left to infer a silent log mapping"*), including why the `+1` shift is there. That instinct — a plot that tells you its own axis convention — is exactly right for a Fourier instrument. It is currently degenerate (D-6), which is a wiring defect, not a design one. *Falsifier:* a DPR bug in `:56-64`, or an axis label that misstates the transform (it matches `barFraction` at `:47-50` exactly in both branches).

---

## §4 · Corpus crosswalk

| Corpus row | This challenge |
|---|---|
| lane-frontend §2: *"`visualization/CoefficientsPanel.vue` \| 26 \| `ConfiguratorLayer` host for the spectrum"* | **Confirmed and sharpened** — it is a host, and the hosting contract is where all five MAJORs live (D-1..D-5). |
| lane-frontend §6 Path C: *"`FrequencyGraph.vue:63` `getContext("2d")`; single deep watcher `:157` … No rAF."* | **Confirmed, consequences drawn** — "no rAF" is recorded neutrally in the census; it is precisely why this canvas cannot self-heal a theme flip (D-7), and the `deep` on that watcher is inert on this route (D-8). |
| lane-frontend §2: `useCanvasSetup.ts` **49** — *"DPR-aware canvas init + ResizeObserver"* | **Extended** — `FrequencyGraph` forks the DPR half by hand and drops the observer half (D-7). |
| lane-frontend §6 Path A / `stores/animation.ts:41-53` I.γ off-screen gate | **Extended** — the repo's own off-screen discipline is not applied to this canvas, which is the one mounted behind a collapsed layer (D-4). |
| lane-frontend §4 candidate shadow: `CoefficientsPanel`/`EqCoefficientsPanel` → `./metric-stack` → `./metric` | **Qualified** — the pair is one row by markup only; their data contracts diverge (D-15), so a convergence must pick a contract, not just a primitive. |
| lane-frontend §4 SOFT SHADOW: `CoefficientsSpectrum.vue` 168 — *"same family (spectrum/`BasisComponent`)"* vs GPU-backed `FourierField` | **Confirmed, with a caution** — any `FourierField` convergence inherits D-1 unless the row child stops being a Fragment-root component, and inherits D-13's unguarded normalization. |
| CENSUS §F.W4 charge: *"R5-7 (count native element loops or inherit the blind spot)"* | **Extended** — this subtree has zero native element loops and one component loop (both models see it correctly), but two *imperative canvas* loops that no model sees (D-16). |
| intake R5-7 (`:125`) / R6-5 (`:139`) | **No contradiction.** Both re-verified in passing (`PaperSidebar.vue` v-for at 65/87/105 — unchanged). This challenge adds a class, it does not dispute the two. |
| lane-frontend §1: *"No unit-test runner — vitest is ABSENT"* | **Load-bearing here** — D-1, D-2, D-3, D-10 and D-14 are all defects a single mounted-component test or an unused-locals flag would have caught. |
| lane-frontend §8: reduced-motion coverage gap booked against `stores/animation.ts` + `ConvergencePlot` | **Panel is clean** — `AnimatedDigit`'s springs default to `respectReducedMotion: true` (`useAnimatedNumber-C_3wZLx4.js` — `respectReducedMotion: f.respectReducedMotion !== !1`), and `ConfiguratorLayer` carries `motion-reduce:transition-none` on its reveal region. Not a finding; recorded so the gap is not over-generalized to this panel. |

---

## §5 · Repair shape (for whoever takes the wave — not a patch, an ordering)

1. **D-3 first** (state contract): the panel already holds the store; read `computing` and `error` and give `CoefficientsSpectrum` a three-state empty surface. Everything else is cosmetic next to a silently vanishing panel.
2. **D-1 + D-9 together** (they are the same edit): make the transition child an element again — put the row div back as the `v-for` target and move `Tooltip` inside it (or teleport the content) — and key on `comp.index` alone.
3. **D-4** (mount contract): either drop `:default-open="false"`, or gate the body on the layer's open state via `v-model:open`, or add the IntersectionObserver the sibling canvas already uses.
4. **D-2 + D-6** (API contract): wire the emits into a harmonic-toggle feature, or delete the emits, `activeIndices`, `logScale`, `onClick` and the `cursor-pointer`. Do not ship an affordance that lies.
5. **D-5** (colocation): `FrequencyGraph.vue` → `components/shared/` beside its sibling, or → `components/visualization/`. One import edge changes.
6. The MINORs are independent and cheap; **D-11's shared cap constant** is the one that prevents future drift.

---

## §6 · Live residue for SS-13 (UNPROVEN-NEEDS-LIVE)

| # | What only a live run can settle |
|---|---|
| D-1 | The dev-console warning count per open (expect ≥12, ≥40 expanded) and the visual absence of row slide-in/move. Mechanism is static; the count is not. |
| D-4 | The frame cost of 12 concurrent invisible springs + one invisible 40-bar draw per recompute. Eager mount itself is static. |
| D-7 | Whether the stale label color is perceptible after a dark-mode flip; and whether `getComputedStyle(...).getPropertyValue("color")` under Tailwind v4 `oklch` tokens parses as a canvas `fillStyle` (if not, labels silently inherit the last bar's spectrum color — flagged, not claimed). |
| D-12 | How many leading bars have clipped tooltips (depends on rendered tooltip width), and whether hovering the last bar visibly perturbs the horizontal scrollbar. |
| D-10 | Confirmation that the empty-trigger Tooltip produces no reka console warning at `n_harmonics ≤ 5`. |
