claude-opus-5[1m]

# CHALLENGE · `App` · axis C — CONSUMPTION · **r2 (merge; supersedes r1 in place)**

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/app/App.vue` (387 lines)
**Tree HEAD** `8281638c fix(demo-shell): provide tooltip context for the routed control group` (parent `a59d3a22 fix(dependencies): consume Glass UI 6 from one registry core`) — the same HEAD r1 read.
**Mode** static, read-only. No browser tooling. keyframes.js is READ-ONLY evidence; this file is the lane's only write.
**Posture** the component is DEFECTIVE until the tree proves otherwise. Every row carries a falsifier; a row whose falsifier is met is struck. A false defect is worse than a missed one.

## r2 preface — what this pass did to r1

r1 (2026-08-03) occupied this path with 13 defects / 2 blockers / 5 superlatives. r2 re-ran the cell independently and then **read r1 whole before writing**. This document is a merge, not a replacement:

1. **Every r1 row was re-verified against the tree at this HEAD.** All 13 survive. Two I re-derived from scratch and confirm with fresh evidence (C-B1, C-B2); one corrects **my own** r2 error (C-m4/S-6, below).
2. **Seven new rows** (`C-M6`..`C-M8`, `C-m7`..`C-m10`) that r1 did not reach — three of them carry **build-artifact evidence** r1's static-only method could not produce.
3. **One r1 superlative is scope-corrected**: `C-S4`'s claim survives as written, but the inference it invites — "value.js is off App's static graph" — is **false**, and r2 proves it from the shipped entry chunk. This is the substantive disagreement between the passes and it is stated in full at §2.1.
4. **One r1 row is refined** with a fact r1 got right and r2 initially got wrong (glass-ui *does* ship `Skeleton`; r2's first grep was case-flawed) — recorded because the correction changes S-6's cost, not its verdict.

New method delta vs r1: r2 additionally executed the installed artifacts as evidence — `node --input-type=module` probes against `@mkbabb/value.js@4.0.0` and `@mkbabb/glass-ui@7.0.0`, and non-renameable string-literal greps over the committed `dist/gh-pages/` build. Both are read-only observations of installed/emitted files; no product source was touched.

**Import closure read whole (r2, independent of r1):** `App.vue`, `App.skeleton.vue`, `main.ts`, `kf-engine.ts`, `app/dock/{index.ts,ChromeDock.vue,MbabbMenu.vue}`, `app/scene/{scenes.ts,sceneExposedApi.ts,useSceneMachineShellBinding.ts}`, `app/transition/{useSceneSwap.ts,useSceneTransition.ts}`, `app/lifecycle/useMonacoCancellationGuard.ts`, `components/instrument/shell/{index.ts,EditorShell.vue,HeroAurora.vue}`, `components/instrument/transport/{injectionKeys.ts,AnimationControlsGroup.vue,channel-controls/ChannelControls.vue}`, `components/instrument/surfaceTabs.ts`, `state/{index.ts,useSceneMachine.ts,controlSurfaces.ts,controlOptionsStore.ts}`, `scenes/cube/CubeScene.vue`, `src/animation/index.ts`, `vite.config.ts`, `package.json`, `.npmrc`, plus installed `@mkbabb/glass-ui@7.0.0` and `@mkbabb/value.js@4.0.0` dist/dts, plus `dist/gh-pages/assets/*`.

---

## 0. Merged scoreboard

| id | severity | pass | one-line |
|---|---|---|---|
| C-B1 | **BLOCKER** | r1 · **re-verified r2** | `MbabbMenu.togglePpMode` dereferences `.value` on a plain object → `TypeError` on every click of a control App mounts |
| C-B2 | **BLOCKER** | r1 · **re-verified r2** | `main.ts` swallows the engine-warm rejection and mounts anyway; App's setup then throws in `kfEngine()` → blank app, poisoned memo, misattributing message |
| C-M1 | MAJOR | r1 | `sceneRef?.tabsTrigger` is off-contract *and* the 4-hop `tabs-trigger` slot chain terminates in a component that retired the slot |
| C-M2 | MAJOR | r1 | `#header-left` is never bridged — `CubeScene.headerLeft` is dead surface; three files assert a header brand mark that cannot render |
| C-M3 | MAJOR | r1 · **re-verified r2** | `HeroAurora` passes `initStrategy: "eager"`, defeating glass-ui's documented lazy arm *and its own docblock*, on the LCP route |
| C-M4 | MAJOR | r1 · **re-verified r2** | `SURFACE_META`/`dockCardinality` exist TWICE; App feeds extra tabs from copy A while `ChromeDock` builds the triad from copy B |
| C-M5 | MAJOR | r1 | App's synchronous group construction gates the LCP element on the heavy chunk (a *timing* exposure) |
| **C-M6** | **MAJOR** | **r2 NEW** | `HeroAurora`'s **static** import puts glass-ui's 202 KB aurora module **and value.js's colour graph** in the boot chunk — a *static* value.js exposure, proven from the shipped entry chunk; scope-corrects **C-S4** |
| **C-M7** | **MAJOR** | **r2 NEW** | the cube scene's code-split is **dead**: App bypasses the descriptor's async component, `warmScene("cube")` fetches nothing, and no `CubeScene-*.js` chunk is emitted |
| **C-M8** | **MAJOR** | **r2 NEW** | three nested `TooltipProvider`s; the one HEAD just added at `App.vue:3` ships reka's **700 ms** defaults inside a demo that had twice standardised on 100 ms |
| C-m1 | MINOR | r1 | `readonly ControlSurface[]` handed to a mutable `string[]` prop — unsound, ungated |
| C-m2 | MINOR | r1 | `storedControls` is a `computed` whose getter mutates persisted storage |
| C-m3 | MINOR | r1 | `AnimationGroup<any>` is the app's central prop type; the library offers no typed empty-group door |
| C-m4 | MINOR | r1 · **refined r2** | `SceneSkeleton`'s `label` prop is dead API; folds census **S-6** — and the swap target is **root-barrel-only**, which costs subpath discipline |
| C-m5 | MINOR | r1 | `EditorHeader.vue` — 0 consumers, still re-exported from the barrel App imports |
| C-m6 | MINOR | r1 | `warmScene` is only reachable from inside the *already-open* scene dropdown |
| **C-m7** | **MINOR** | **r2 NEW** | `App.vue:203-206` documents `machine.controlSurfaces` as the built-in triad; it is the **full** derived set — a comment that would break easing/spring if "corrected" |
| **C-m8** | **MINOR** | **r2 NEW** | `PAPER_WASH_GROUND` spread **after** the atoms silently overrides **11 of 30** authored knobs; the comment's "verbatim … ONLY the opacity ceiling moved" is false by measurement |
| **C-m9** | **MINOR** | **r2 NEW** | `data-last-vt-type` is written on the VT subject in **production**; only its sibling window hook is DEV-gated |
| **C-m10** | **MINOR** | **r2 NEW** | `HeroAurora` hand-rolls the pointer wiring glass-ui publishes as `useCursorInteraction` on the same subpath — possibly justified bespoke, marked unsettled |
| C-i1 | INFO | r1 | no type gate reaches the demo at all — `ci.yml` runs `check:lib` (`src/` only); no `vue-tsc` in the repo |
| C-i2 | INFO | r1 · **extended r2** | the R1 value.js parser-crash class is **not** reachable from App — r2 executed the crash and confirms the parser module is absent from the boot chunk |
| C-S1..C-S6 | **SUPERLATIVE** | r1 ×5 (one scope-corrected) + r2 ×1 | six consumption decisions this component gets right, each with its own falsifier |

**Inherited, not counted here (r1's scoping, upheld):** lane-frontend **F-1** — `@mkbabb/glass-ui` absent from `package.json` *and* `package-lock.json` while 7.0.0 sits installed. `App.vue:145` is a victim, not the site. r2 re-confirmed F-1 at this HEAD and **extended it** (§4) with a new, executed failure the lane inferred but never ran.

**Totals — defects 20** (BLOCKER 2 + MAJOR 8 + MINOR 10) · **blockers 2** · **superlatives 6**.

---

## 1. r1 rows re-verified at HEAD

r2 re-derived the two blockers and the three MAJORs whose evidence is mechanically checkable. All hold.

### C-B1 — `MbabbMenu.togglePpMode` throws on every invocation · **BLOCKER** · r1, independently re-verified

r2 missed this on its own first pass and found it in r1. Re-derived from the tree:

`demo/app/dock/MbabbMenu.vue:98-101`

```ts
function togglePpMode() {
    const stored = getStoredAnimationGroupControlOptions(props.superKey);
    stored.value.ppMode = !(stored.value.ppMode ?? false);
}
```

`demo/state/controlOptionsStore.ts:66-97` — the declared return is `StoredAnimationGroupControlOptions`, and the sole `return` is `return controls;` at `:96`, where `controls` was read **out of** the `useStorage` ref at `:86-88` (`animationGroupsControlOptionsStore.value[superKey]`). It is a plain reactive bucket. `stored.value` is `undefined`; the **right-hand** read `stored.value.ppMode` throws before the assignment:

> `TypeError: Cannot read properties of undefined (reading 'ppMode')`

App is the mount site and supplies the very key that is mis-read (`App.vue:20-24`, `:super-key="currentSuperKey"`). r1's enumeration of the twelve correct call sites stands; r2 spot-checked two (`useSceneMachineShellBinding.ts:105-112` and `:121` both use the object directly).

**Verdict CONFIRMED.** **Falsifier** (r1's, upheld): show `getStoredAnimationGroupControlOptions` can return a `Ref`. It cannot — one `return`, typed and valued as a bucket.

### C-B2 — the engine-warm boot contract is violated on the rejection path · **BLOCKER** · r1, independently re-verified

r2 reached this row independently before reading r1. Line-exact chain:

- `main.ts:50-52` — `void Promise.all([warmKfEngine().catch(() => undefined), fontsDecoded]).finally(() => { app.mount("#app"); });` — settlement, not resolve; `.finally` mounts unconditionally.
- `kf-engine.ts:30`, `:39` — `resolved` is assigned only in the success arm, and `inflight ??= …` **caches a rejected promise for the session**: a poisoned memo with no retry seam.
- `App.vue:218-220` — `kfEngine()` is read at top level of `<script setup>`, unconditionally.
- `kf-engine.ts:52` — the throw text blames a boot-order mistake ("await `warmKfEngine()` before `app.mount()`") that **did not happen**; the await was correct and its failure was deliberately discarded. The diagnostic sends the debugger to the wrong file.

r2 adds the third-file detail r1 did not name: the message misattribution is itself a defect of the consumption seam, independent of the blank page.

**Verdict CONFIRMED.** **Falsifier** (r1's four, upheld) — any one kills the row; none is met.

### C-M3 — `initStrategy: "eager"` · MAJOR · r1, re-verified against the installed contract

r2 re-read the installed `.d.ts` and confirms both quotations r1 used, at:

- `dist/components/aurora/Aurora.vue.d.ts:14` — *"Lazy-arm: by default GPU initialization is deferred past the consumer's first paint."*
- `Aurora.vue.d.ts:24` — *"**Capture / thumbnail-baking consumers** pass `runtimeOptions.initStrategy: "eager"` … then await `armAsync()`."*
- `dist/components/aurora/composables/runtime.d.ts` — *"`"deferred"` (default) … the Vue wrapper `useAurora` schedules that acquisition **past first paint on an idle tick, gated on canvas visibility** — so the shader compile-link never lands on the consumer's first-paint critical path."*

Against `HeroAurora.vue:28` (`:runtime-options="{ initStrategy: 'eager' }"`) and its own `HeroAurora.vue:8` (*"the lazy WebGL arm past first paint"*). Home is the default route (`scenes.ts:126`).

**Verdict CONFIRMED.** Magnitude remains **UNPROVEN-NEEDS-LIVE** (SS-13). r2 note: this compounds with the *new* **C-M6** — the same one static import both ships the module at boot and arms it eagerly.

### C-M4 — the "SINGLE source" registry exists twice · MAJOR · r1, re-verified

r2 reached this independently. `state/controlSurfaces.ts:145-160` and `components/instrument/surfaceTabs.ts:12-19` both declare `SURFACE_META`; `surfaceTabs.ts:1-4` imports only `BUILT_IN_SURFACES` + the type from copy A — a re-implementation, not a re-export. `ChromeDock.vue:15-21` straddles: `BUILT_IN_SURFACES` from copy A, `SURFACE_META` + `dockCardinality` from copy B, so `BUILT_IN_CONTROL_TABS` (`:49-50`) indexes **B's** table with **A's** key list while `machine.extraControlTabs()` (`useSceneMachine.ts:317`) uses **A's** `extraTabsFrom`. One dock row, two registries.

**Verdict CONFIRMED**, including r1's explicit contradiction of census **F-5** (that row names a *dead 0-consumer re-export*; `surfaceTabs.ts` has two live consumers and is a duplicate *definition*). r2 upholds the contradiction.

### C-M1, C-M2, C-M5, C-m1, C-m2, C-m3, C-m5, C-m6, C-i1 — carried forward unchanged

r2 read `sceneExposedApi.ts` (no `tabsTrigger` member — C-M1(a) confirmed by type), `App.vue`'s six supplied slots (no `#header-left` — C-M2 confirmed by enumeration), `App.vue:218` + `EditorShell.vue:137` + `useSceneMachineShellBinding.ts:28` (`AnimationGroup<any>` in all three — C-m3 confirmed), `useSceneMachine.ts:308` vs `ChromeDock.vue:71` (readonly→mutable — C-m1 confirmed by signature), `ChromeDock.vue:152`/`:261` (one emit site — C-m6 confirmed), and `controlOptionsStore.ts:76-94` (two on-miss writes inside the getter — C-m2 confirmed). No re-litigation; r1's provenance stands.

### C-m4 / census S-6 — **r1 was right, r2 was wrong; the row is refined not struck**

r2 first recorded that glass-ui 7.0.0 exports no `Skeleton`, contradicting r1. **That was an error in this pass**: the grep used `Skeleton` (capital) against `export * from "./components/skeleton"` (lowercase path). Corrected:

```
dist/index.d.ts:20                          export * from "./components/skeleton";
dist/components/skeleton/index.d.ts         export { default as Skeleton } from './Skeleton.vue';
```

r1's row stands as written. **New nuance r2 contributes:** `./skeleton` is **not** in the package `exports` map (checked: 70 subpaths, no `./skeleton`). So retiring S-6 onto glass-ui's `Skeleton` forces a **root-barrel** import — pushing against the subpath discipline the shell otherwise keeps (C-S5). That is a real, if small, cost the census row should carry, and it does not change the AMBER verdict.

Recorded here because a challenge that hides its own corrected error is worth less than one that shows it.

---

## 2. NEW rows (r2)

### 2.1 · C-M6 — `HeroAurora`'s static import puts glass-ui's aurora module **and value.js's colour graph** on the boot chunk · **MAJOR** · scope-corrects C-S4

This is r2's substantive disagreement with r1.

`App.vue:142` is a **static** import:

```ts
import HeroAurora from "@components/instrument/shell/HeroAurora.vue";
```

`HeroAurora.vue:37-41` statically imports from `@mkbabb/glass-ui/aurora`. The installed `dist/aurora.js` is **202,125 bytes**, and its first lines are static ESM:

```
import { t as o } from "./value-DMhh2R94.js";
import { interpolateHue as ye } from "@mkbabb/value.js/color";
```

and `dist/value-DMhh2R94.js` opens with

```
import { oklch as e } from "@mkbabb/value.js/color";
import { parseCssColor as t } from "@mkbabb/value.js/css";
```

The `v-if="isHome"` gate at `App.vue:45` governs the **render**, not the **module edge**. A static import in the root SFC is in the entry chunk by construction.

**Proven from the shipped artifact** (`dist/gh-pages/assets/index-B2hcFaCm.js`, 481,421 B, the file `index.html` names as the entry). Counts use *non-renameable string literals*, which survive minification — identifier greps do not, and r2 discarded an earlier identifier-based measurement for exactly that reason:

| marker | provenance | entry chunk |
|---|---|---|
| `#version 300 es` | aurora GLSL source | **3** |
| `paperGrain` | aurora config key | **6** |
| `interpolateHue` | `@mkbabb/value.js/color` | **7** |
| `oklch` / `srgb-linear` / `display-p3` / `prophoto-rgb` | value.js colour-space names | **27 / 1 / 2 / 2** |
| `css_syntax` | value.js **parser** diagnostic code | **0** (28 in the lazy `css-6ALh6sc4.js`) |

Contrast: every *scene* splits cleanly — `AmigaScene` 7.9 KB, `EasingScene` 9.9 KB, `SquareScene` 9.9 KB, `SequenceScene` 12 KB, `SpringScene` 33.7 KB.

**What this does to r1's C-S4.** r1 praised the LIGHT/HEAVY boundary as honoured "at the import level", with the falsifier *"Any static value import from `@mkbabb/keyframes.js` in App's closure that resolves into `./engine`."* **That falsifier is not met and C-S4 survives as written** — App's *kf* import graph genuinely is clean. But the falsifier is scoped to the kf specifier only, and value.js does not arrive that way. It arrives via **glass-ui**. So the property everyone actually cares about — the one `kf-engine.ts:9-10` states outright (*"the one place value.js enters the graph"*) and `src/animation/index.ts:21` restates (*"value.js stays out of a light-only consumer's static import graph"*) — is **false for this consumer**, and `proof:boundary` cannot see it because it inspects the kf edge.

r1's C-M5 identified a *timing* exposure (the boot await gating LCP). C-M6 is a *structural* one: ~202 KB of decorative GPU code plus value.js's colour module are resident in the boot chunk for a layer that renders on one route at opacity ceiling **0.1** (`HeroAurora.vue:46`). They compound; they are not the same defect.

**Severity MAJOR.**

**Falsifier** — (a) show rolldown emits `@mkbabb/glass-ui/aurora` as a separate async chunk despite the static edge: the shipped entry contains the GLSL literal, so this is met only by a HEAD rebuild that says otherwise; (b) show the static edge is not there — `App.vue:142` and `HeroAurora.vue:37-41` are both plain `import`. Honest limit: the artifact is dated Jul 16 09:11 and predates HEAD by two commits, so it **corroborates**; the static-edge argument is what **proves**, and it is independent of the artifact.

### 2.2 · C-M7 — the cube scene's code-split is dead · **MAJOR**

`scenes.ts:143` registers cube as route-lazy:

```ts
component: lazyScene("cube", () => import("../../scenes/cube/CubeScene.vue")),
```

`App.vue:155` imports the same SFC **statically**, and `App.vue:283-290` returns before the descriptor is consulted:

```ts
const activeSceneComponent = computed(() => {
    if (isHome.value || currentSceneId.value === "cube") return CubeScene;  // static
    return currentScene.value.component;                                     // async — unreachable for cube
});
```

Consequences, each checkable:

1. `sceneMap.get("cube").component` (the `defineAsyncComponent`) is **unreachable** — a dead declaration.
2. `warmScene("cube")` — bound at `App.vue:15`, emitted from `ChromeDock.vue:261` — invokes a loader for a module already in the entry chunk, then swallows the result (`scenes.ts:122`). r1's **C-m6** notes the prefetch window is one hover; for cube the prefetch is worth **nothing at all**.
3. CubeScene's closure (`MatrixEditor`, `CubeTarget`, `useCubeDemo`, `cubeTransformStore`, glass-ui root-barrel imports at `CubeScene.vue:33-38`) is hoisted into the boot chunk.
4. The `<Suspense>` at `App.vue:90` — whose 10-line comment (`:74-83`) exists *entirely* to protect the async-loader boundary — wraps a synchronously-resolved component on the default route, so `SceneSkeleton` (`:97`) can never paint for home/cube. This directly weakens r1's **C-m4** framing: the skeleton is not merely un-parameterised, it is unreachable on the landing.

**Corroborated by the artifact:** the build emits `AmigaScene-*.js`, `EasingScene-*.js`, `SequenceScene-*.js`, `SpringScene-*.js`, `SquareScene-*.js` — and **no `CubeScene-*.js`**; `useCubeDemo` greps into the entry chunk.

If the static import is *deliberate* (home renders CubeScene as its backdrop; a Suspense flash on the landing would be ugly), then the defect is the **unretired lazy declaration** — `lazyScene("cube", …)` plus its warm registration are legacy beside the replacement, which the standing `feedback_no_backwards_compat` law forbids. Either shape is defensible; both together are not.

**Severity MAJOR.** **Falsifier** — show any path evaluating `currentScene.value.component` for `id === "cube"` (lines 284 and 288 both return first), or a `CubeScene-*.js` chunk in a HEAD build.

### 2.3 · C-M8 — three nested `TooltipProvider`s, and the one HEAD just added ships reka's 700 ms defaults · **MAJOR**

`App.vue:3`, added by **this very HEAD commit** (`8281638c`, *"provide tooltip context for the routed control group"*):

```html
<TooltipProvider>          <!-- no props -->
```

`node_modules/reka-ui/dist/Tooltip/TooltipProvider.js:12-20` — the defaults it inherits:

```
delayDuration:     default: 700
skipDelayDuration: default: 300
```

Inside that subtree, two more providers mount with a different register:

- `AnimationControlsGroup.vue:2` — `:delay-duration="100" :skip-delay-duration="0"`
- `ChannelControls.vue:2` — `:delay-duration="100" :skip-delay-duration="0"`

reka's provider is `createContext("TooltipProvider")` + `provide`; an inner provider **shadows** the outer for its subtree — the contexts do not merge.

Consequences in one visual chrome band:

- `EditorShell.vue:30-43` — the "Keyboard shortcuts (?)" `<Tooltip>` sits in the `HeaderRibbon`, under **App's** provider → **700 ms**, skip-grace 300 ms.
- Every transport tooltip → **100 ms**, skip-grace 0 ms.

A **7× hover-latency split** across adjacent chrome, plus a `skipDelayDuration` grace fragmented across three provider instances: moving from a transport control to the header button re-incurs the full 700 ms rather than opening instantly. Policy knobs (`disableHoverableContent`, `ignoreNonKeyboardFocus`) are now settable in three places.

The fix commit correctly diagnosed a missing context and correctly reached for the `/tooltip` subpath — it simply landed the provider without matching the register the demo had already standardised twice.

**Severity MAJOR.** **Falsifier** — show reka's `TooltipProvider` inherits an ancestor's `delayDuration` (source: it calls `provideTooltipProviderContext` unconditionally from its own `toRefs(props)`); **or** show no `<Tooltip>` renders between App's provider and the inner ones (`EditorShell.vue:30` does).

*Note on identity, raised and self-falsified:* `TooltipProvider` is reached through **two** specifiers — `/tooltip` at `App.vue:145`, the root barrel at `AnimationControlsGroup.vue:124` and `ChannelControls.vue:219`. This is **not** a duplicate-context bug: `dist/tooltip.js` is 161 bytes re-exporting `./tooltip-OxciiZm6.js`, the same chunk the root barrel consumes, and the context symbol originates in `reka-ui` (a single peer instance). Only the nesting is a defect.

### 2.4 · C-m7 — the `controlSurfaces` comment is a trap · MINOR

`App.vue:203-207`:

```ts
// … the active scene's valid BUILT-IN editor triad ({controls,keyframes,timeline}
// subset). … then unions the machine-projected `extraControlTabs` (below).
const controlSurfaces = computed(() => machine.controlSurfaces.value);
```

`useSceneMachine.ts:308` is an identity read of `activeSurfaces`, which App itself fed via `setActiveSurfaces` (`App.vue:256`) as `surfacesFor(...)` — `base triad ∪ channel facets ∪ facility facets` (`controlSurfaces.ts:107-119`). It is the **full** derived set.

This matters because `App.vue:35` binds `:has-control-surfaces="controlSurfaces.length > 0"`, and `EditorShell.vue:161` documents that prop as *"`false` collapses the [rail] track + hides the pane wrapper (the ghost-rail kill)"*. For easing the set is `["easing"]`, for spring `["spring", …]` — non-empty, so the rail survives. **The binding is correct only because the comment is wrong.** Anyone who "corrects" App to match its own prose (filter to `BUILT_IN_SURFACES`) makes easing's set `[]` and kills the rail on the very scene whose identity surface it is.

**Severity MINOR** (documentation; no live defect — a loaded one). **Falsifier** — show a filter between `setActiveSurfaces` and the projection. There is none; `:308` is `readonly(computed(() => activeSurfaces.value))`.

### 2.5 · C-m8 — `PAPER_WASH_GROUND` overrides 11 of 30 authored knobs; the comment denies it · MINOR

`HeroAurora.vue:62-73`:

```ts
const config = { ...resolveAtoms({ seed:"#7c5ce6", …, colorEnergy:0.18, … }), ...PAPER_WASH_GROUND };
```

Spread order means **the wash wins**. Measured by executing the installed library against exactly the authored atoms:

| key | atoms | → wash |
|---|---|---|
| `medium` | `"smooth"` | `"crayon"` |
| `strokeAmount` | `0` | `0.35` |
| `granulation` | `0` | `0.3` |
| `canvasGrain` | `0` | `0.5` |
| `strokeAnisotropy` | `0.7` | `0.5` |
| `saturation` | `0.913` | `0.92` |
| `strokeLayers`, `wetEdge`, `impasto`, `brokenColor`, `paperGrain` | — | (equal) |

Against `HeroAurora.vue:60-61`: *"Field atoms are the P-HERO blessed values verbatim; **ONLY the opacity ceiling moved** (the amendment's named lever)."* **False by measurement** — 11 of 30 keys move, six materially.

Sub-finding: `colorEnergy` moves exactly four outputs (`palette`, `valueVariance`, `breathDepth`, `saturation`); of those, `saturation` is hard-overwritten, so a quarter of the knob's authored effect is inert at this site.

**Severity MINOR** — the crayon/paper character *is* the stated intent ("paper-on-tooth"), so the render is plausibly wanted; the defect is that the code contradicts the comment and the atoms door is paid for and half discarded. **Falsifier** — a spec pinning these 11 to the wash deliberately; then the defect narrows to `HeroAurora.vue:60-61` alone.

*Self-falsified alongside it:* r2 suspected the wash clobbers the seed-derived palette. It does not — its 12 keys are all medium/stroke/grain; `palette` and `nuclei` are untouched.

### 2.6 · C-m9 — a test-only attribute is written in production · MINOR

`useSceneTransition.ts:76-83` — the window hook is DEV-gated, the DOM write is not:

```ts
if (import.meta.env.DEV && typeof window !== "undefined") {
    (window as …).__lastVtTypes = types;                              // gated ✓
}
sceneHost.value?.setAttribute("data-last-vt-type", types[0] ?? "");   // ungated ✗
```

Every scene nav mutates gate instrumentation on the element carrying `view-transition-name: scene-subject` (`App.vue:358`) — i.e. the one element under compositor scrutiny during the transition — in shipped builds.

**Severity MINOR.** **Falsifier** — a runtime gate or e2e spec reading `data-last-vt-type` against a **production** build; then it is a shipped contract, not leakage.

### 2.7 · C-m10 — a shadow *composable* beside the shadow components · MINOR, unsettled

`HeroAurora.vue:86-110` hand-rolls pointermove normalisation + `pointerleave` teardown. `@mkbabb/glass-ui/aurora` exports **`useCursorInteraction`** (`dist/components/aurora/index.d.ts`) whose documented job is *"Wires pointer events on the stage element to (a) continuous cursor swirl"* against the same `setCursor`/`clearCursor` API HeroAurora calls. `HeroAurora.vue:5` cites *"proof:no-hand-rolled-cursor-tracker stands guard"* twenty lines above a hand-rolled cursor tracker.

This is the S-1..S-8 shadow class extended from components to composables — the census did not enumerate composables.

**Severity MINOR, and explicitly unsettled.** **Falsifier — and r2 believes it may well be met:** `useCursorInteraction(stageRef, configSource, options)` takes a **stage element** (HeroAurora deliberately uses viewport-normalised coordinates with *zero* layout reads, the T-CL-3 recurrence guard at `HeroAurora.vue:76-82`) and additionally performs **nuclei CRUD** — alt-click spawn, shift-click remove, drag, delete key — which a decorative `aria-hidden` backdrop must not expose. If both hold, this reclassifies to **justified bespoke**, the S-8 `TypingDots` verdict, and the only residue is the ironic comment at `:5`. r2 could not settle it from the `.d.ts` alone and declines to claim more.

---

## 3. Superlatives — L-18 runs both ways

r1's five, re-verified, with one scope correction; plus one new.

**C-S1 · the bare-`<Suspense>` discipline, documented with the exact break it prevents** (r1, upheld). `App.vue:73-99` + `useSceneSwap.ts:17-30`: bare keyed `<Suspense>`, no wrapping `<Transition>`/`<KeepAlive>`, fade on a **sibling** div — and the comment records the falsification that produced the rule ("amiga/square/easing/spring shipped a BLANK viewport, B.W3's headline blocker"), restated independently in the sibling composable. *Falsifier* — a wrapper at `App.vue:90` (none) or the fade driven from a wrapper (`:84-89` is the sibling). **r2 caveat:** C-M7 shows the boundary this protects is bypassed for the default route.

**C-S2 · the demo dogfoods kf's own `viewTransition`, not glass-ui's** (r1, upheld). `useSceneTransition.ts:2` imports `viewTransition` from `@mkbabb/keyframes.js` — the LIGHT barrel — while the neighbouring `useSceneSwap.ts:2` correctly takes only *feature detection* from `@mkbabb/glass-ui/motion-core`. Call shape matches the producer (mutate first, `{ types }` second, omitted when empty). The a11y follow-through is real: `finished.finally(() => sceneHost.value?.focus())` against a `tabindex="-1"` host whose ring is suppressed (`App.vue:384-386`). kf owns the dispatch, glass-ui owns the look — the correct division, written down at `App.vue:112-121`.

**C-S3 · `HeroAurora`'s `/aurora` consumption is symbol-exact and layout-read-free** (r1, upheld with qualification). r2 re-verified all five symbols/props against the installed `.d.ts` (`Aurora`, `PAPER_WASH_GROUND`, `resolveAtoms`, the four props, the exposed `setCursor`/`clearCursor`) — every one present, no fork, no `getBoundingClientRect` in the pointer path, `@vueuse` scope-managed listeners, mouse-only gating. **Qualified by r2's C-m8 and C-m10**: the symbol usage is exact; the *configuration* silently discards 11 authored knobs, and a published composable is reimplemented. The praise narrows to "the API surface is consumed correctly", which is still true and still rare.

**C-S4 · the LIGHT/HEAVY static boundary is honoured *at the kf import level*** (r1 — **scope-corrected by r2**). r1's enumeration holds exactly: `App.vue:147` is type-only under `verbatimModuleSyntax`; every runtime reach for the heavy surface goes through `kfEngine()`; the closure's only static barrel value-imports are `viewTransition` and `SpringProgress`, both LIGHT. r1's falsifier is not met and **the row survives**. What r2 adds is the boundary of the boundary: this says nothing about value.js, which enters statically through **glass-ui** (C-M6), and `proof:boundary` — which inspects the kf edge — cannot see it. Kept as a superlative with its scope made explicit, because the discipline it praises is real and worth not losing in the correction.

**C-S5 · the glass-ui boundary in the shell is clean** (r1, upheld). Zero `reka-ui` imports and zero local `ui/` shadcn copies across App's closure; every primitive from glass-ui by subpath or barrel. r2 counted repo-wide: **45 subpath imports vs 31 root-barrel** — no settled convention, and App's closure mixes registers (`ChromeDock.vue:28` `Select*`, `EditorShell.vue:124` `Button`, `MbabbMenu.vue:82` `Avatar*`/`DropdownMenu*`, all with subpaths available). r2 **declines to raise that as a defect**: glass-ui declares `"sideEffects": ["*.css"]` and its subpaths are pure re-exports of shared chunks, so the barrel is fully tree-shakeable and both specifiers resolve to one module. The residue is legibility, not weight or identity — recorded here rather than as a row. Confirms census **F-6** for the App subtree.

**C-S6 · the control-surface derivation has exactly one writer** (**r2 NEW**). `App.vue:248-256` is the only place the mounted scene's live `facility` and the user's channel selection are *both* visible, and it feeds **one** set to the machine; three consumers then read that one projection (`ChromeDock`'s triad filter at `:95-101`, its extra tabs, and `ChannelControls.hasSurface` at `:298`). The home↔cube split is an explicit branch with its reason (`App.vue:249`), not a table row. Replacing a hand-maintained per-scene exclusion table with a derivation off the live facility is the correct direction and it landed — `surfacesFor` (`controlSurfaces.ts:95-120`) is pure, structurally typed to avoid the state→app-scene cycle, and dedup-stable. *Falsifier* — a second call site of `setActiveSurfaces`. There is one.

---

## 4. Extension to census F-1 (not counted as an App row — r1's scoping upheld)

r1 correctly declined to charge F-1 to App. r2 upholds that and contributes the piece the lane inferred but never executed.

Re-confirmed at HEAD: `@mkbabb/glass-ui` is **absent from `package.json`**, appears **0 times in `package-lock.json`**, and sits installed at **7.0.0** — note that HEAD's parent `a59d3a22` is titled *"consume Glass UI **6** from one registry core"*, so the declared intent and the installed major already disagree. `.npmrc` carries `legacy-peer-deps=true`, so peer conflicts are silent.

**New evidence.** lane-frontend.md:569 reasons that "the resolution graph is intact only by accident of the current `node_modules` state". r2 executed it:

```
$ node --input-type=module -e "await import('@mkbabb/glass-ui')"
Error [ERR_MODULE_NOT_FOUND]: Cannot find package '@mkbabb/keyframes.js'
  imported from …/node_modules/@mkbabb/glass-ui/dist/useSpring-BCHxLjwv.js
```

glass-ui 7.0.0 declares `"@mkbabb/keyframes.js": "^6.0.0"` as a **peer**; keyframes.js does not install itself into its own `node_modules`, so glass-ui's bare specifier resolves **only** through the Vite self-alias (`vite.config.ts:39-42`, whose own comment documents it as a deliberate override of contract-v2's no-self-alias rule). So App's design-system consumption rests on two accidents: an undeclared, unlocked tree that `npm ci` cannot reproduce, **and** a bundler-only alias no other toolchain inherits (node, a bare vitest config, any prerender step, a `npm pack` consumer smoke).

Consequence for this lane: **every consumption claim about App is unfalsifiable-by-reinstall until F-1 lands.** That is why it heads the repair order.

---

## 5. Falsified suspicions (recorded so the fleet does not re-litigate)

**N-1 · the R1 `parseCssColor` crash class is real, and is NOT on App's path** — extends r1's **C-i2** with execution. Against the value.js 4.0.0 installed under keyframes.js:

```
parseCssColor("oklch()")             → TypeError: Cannot read properties of undefined (reading 'replace')
parseCssColor("lch()")               → TypeError: (same)
parseCssColor("oklch")               → {ok:false, diagnostics:[{code:"css_syntax", …}]}   ← the contract
parseCssColor("oklch(0.7)")          → {ok:false, diagnostics:[{code:"css_syntax", …}]}   ← the contract
parseCssColor("oklch(0.7 0.15 295)") → {ok:true, …}
```

So R1 is worse than a crash: it violates the API's **own Result contract**, which returns diagnostics for every *other* malformed input. But it is not App's. The parser's non-renameable literal `css_syntax` is **0×** in the boot chunk and **28×** only in the lazily-loaded `css-6ALh6sc4.js`. r1's mechanism (`new AnimationGroup()` parses nothing) and r2's mechanism (the parser module is not in the entry) agree from different directions. What *does* ride the entry is value.js's **colour** module — that is C-M6, a different exposure. Direct `parseCssColor` consumers exist elsewhere (`scenes/square/useSquareTumble.ts:2`) but square is genuinely route-lazy and outside App's closure.

**N-2 · `:has-control-surfaces` does not kill the easing/spring rail** — suspected from `App.vue:203-206`; falsified by `useSceneMachine.ts:308`. Survives only as the documentation trap **C-m7**.

**N-3 · `PAPER_WASH_GROUND` does not clobber the palette** — its 12 keys are medium/stroke/grain only. Narrowed to **C-m8**.

**N-4 · root-barrel imports are not a bundle-weight defect** — `sideEffects: ["*.css"]` + re-export-only subpaths. Recorded under **C-S5**, not raised as a row.

**N-5 · the dual-specifier `TooltipProvider` is not an identity split** — shared chunk + reka peer singleton. Only the nesting is a defect (**C-M8**).

**N-6 · App not passing `extra-tabs` to `EditorShell` is correct, not a dropped contract** — App provides `TABS_EXTERNALLY_MANAGED_KEY = true` (`App.vue:169`); `ChannelControls.vue:277` injects it and at `:318-322` takes the machine-derived facets when managed, the prop only when standalone. The dock reads the projection, the panel reads the machine: one authority, two readers. **Correct by construction.**

---

## 6. Merged repair order (recorded; nothing applied)

1. **F-1 first** (inherited, §4) — declare and lock `@mkbabb/glass-ui@7.0.0`. Nothing below is reproducible until `npm ci` works.
2. **C-B1** — drop `.value` at `MbabbMenu.vue:100`. One line; un-deads a shipped feature.
3. **C-B2** — stop swallowing at `main.ts:50` **or** make the group nullable at `App.vue:218`; the second also discharges **C-M5**. Fix the misattributing message at `kf-engine.ts:52` either way.
4. **C-M6 + C-M3** together — one motion on one file: lazy the `HeroAurora` import, drop `initStrategy: "eager"`. Both restore contracts the tree already documents, and together they take ~202 KB of GPU code plus value.js's colour module off the boot chunk.
5. **C-M8** — one line: `:delay-duration="100" :skip-delay-duration="0"` at `App.vue:3`, then delete the two nested providers.
6. **C-M2** — bridge `#header-left` *or* delete `headerLeft` from all four sites and correct the two prose claims. Do not leave the contract half-alive.
7. **C-M1** — delete the four-hop `tabs-trigger` chain; nothing receives it.
8. **C-M7** — decide: retire the static `CubeScene` import, or retire `lazyScene("cube", …)` + its warm registration. Not both shapes.
9. **C-M4** — collapse `surfaceTabs.ts` into a re-export of `@state/controlSurfaces`, then make `proof:dfa-derived`'s one-module clause structural rather than prose.
10. **C-m7, C-m8** — comment corrections whose current text is actively misleading (**C-m7 is a trap that would break easing if "fixed"**).
11. **C-m1..C-m6, C-m9, C-m10** — cleanups; **C-m10** may resolve to *justified bespoke* on inspection of `useCursorInteraction`'s nuclei-CRUD surface.
12. **C-i1** — put `vue-tsc --noEmit` over `demo/` on the merge path. C-B1, C-M1 and C-m1 are all things it would have caught for free.

## 7. Census cross-reference

| census id | disposition |
|---|---|
| **F-1** (phantom dep, RED) | re-confirmed at HEAD; **extended** (§4) with the executed `ERR_MODULE_NOT_FOUND` peer failure the lane inferred at :569. Not charged to App (r1's scoping upheld). |
| **F-5** (dead 0-consumer re-export shim) | **contradicted** by r1's C-M4 and upheld by r2: `surfaceTabs.ts` has **two** live consumers and is a duplicate *definition*, not a re-export. F-5 as written does not cover it. |
| **F-6** (glass-ui boundary clean, GREEN) | **confirmed** for the App subtree (C-S5): zero `reka-ui`, zero local `ui/` copies. |
| **S-6** (`App.skeleton` → `Skeleton`, AMBER) | **confirmed** (r1 right, r2's first grep wrong — §1). Refinement: `Skeleton` is **root-barrel-only**; no `./skeleton` subpath exists at 7.0.0, so the swap costs subpath discipline. Second refinement: on the default route the fallback can never paint at all (**C-M7**). |
| **S-1 / S-2** (KfPillTabs, stale `SegmentedTabs` prose) | adjacent — `EditorShell.vue:126` imports `type SegmentedTabOption` from `/tabs` for a prop App never sets (correct by construction, **N-6**). |
| **S-8** (`TypingDots`, justified bespoke) | the verdict template r2's **C-m10** may resolve to; the census enumerated shadow *components*, not shadow *composables*. |
| lane-library (parse seams) | **N-1** — R1 verified live in value.js 4.0.0 (`oklch()`/`lch()` throw instead of returning the promised Result), but **not reachable** from App's boot graph. |
