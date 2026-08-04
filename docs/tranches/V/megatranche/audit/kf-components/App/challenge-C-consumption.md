claude-opus-5[1m]

# CHALLENGE · `App` · axis C — CONSUMPTION

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/app/App.vue` (387 lines)
**Tree HEAD** `8281638c fix(demo-shell): provide tooltip context for the routed control group`
**Mode** static, read-only. No installs, no dev server, no browser tooling. keyframes.js is READ-ONLY evidence; the only file written by this lane is this one.
**Posture** the component is assumed DEFECTIVE until the tree proves otherwise. Every row below carries a falsifier; a row whose falsifier is met is dead and must be struck.

**Import closure read whole** (read-only): `App.vue`, `App.skeleton.vue`, `main.ts`, `index.html`, `kf-engine.ts`, `styles/brand.css`, `app/dock/{index.ts,ChromeDock.vue,MbabbMenu.vue}`, `app/scene/{scenes.ts,sceneExposedApi.ts,useSceneMachineRouterBinding.ts,useSceneMachineShellBinding.ts}`, `app/transition/{useSceneSwap.ts,useSceneTransition.ts}`, `app/lifecycle/useMonacoCancellationGuard.ts`, `components/instrument/shell/{index.ts,EditorShell.vue,EditorStartScreen.vue,HeroAurora.vue,EditorHeader.vue}`, `components/instrument/transport/injectionKeys.ts`, `components/instrument/surfaceTabs.ts`, `state/{index.ts,useSceneMachine.ts,controlSurfaces.ts,controlOptionsStore.ts}`, `scenes/cube/CubeScene.vue`, plus the producer evidence `src/animation/{index.ts,load-engine.ts,group/group.ts}` and the installed `node_modules/@mkbabb/glass-ui@7.0.0` `.d.ts` surface.

**Hitherto corpus folded** — `formation/keyframes/lane-frontend.md` (F-1 phantom dep, F-3/F-5/F-6, S-1..S-8), `lane-library.md` (parse seams). Overlaps are cited by id; one contradiction is stated explicitly (§C-M4 vs F-5).

---

## 0. Scoreboard

| id | severity | one-line |
|---|---|---|
| C-B1 | **BLOCKER** | `MbabbMenu.togglePpMode` dereferences `.value` on a plain object → `TypeError` on every click of a control App mounts |
| C-B2 | **BLOCKER** | the boot contract is broken on the rejection path: `main.ts` swallows the engine-warm failure, `App` setup then throws in `kfEngine()` → blank app |
| C-M1 | MAJOR | `sceneRef?.tabsTrigger` is off-contract *and* the 4-hop `tabs-trigger` slot chain terminates in a component that retired the slot |
| C-M2 | MAJOR | `#header-left` is never bridged — `CubeScene.headerLeft` is dead surface; three files assert a header brand mark that cannot render |
| C-M3 | MAJOR | `HeroAurora` passes `initStrategy: "eager"`, defeating glass-ui's documented lazy arm *and its own docblock*, on the LCP route |
| C-M4 | MAJOR | `SURFACE_META`/`dockCardinality` exist TWICE; App feeds extra tabs from copy A while `ChromeDock` builds the triad from copy B |
| C-M5 | MAJOR | App's synchronous group construction forces value.js onto the critical boot path — the LCP element cannot paint until the heavy chunk evaluates |
| C-m1 | MINOR | `readonly ControlSurface[]` handed to a mutable `string[]` prop — unsound, ungated |
| C-m2 | MINOR | `storedControls` is a `computed` whose getter mutates persisted storage |
| C-m3 | MINOR | `AnimationGroup<any>` is the app's central prop type; the library offers no typed empty-group door |
| C-m4 | MINOR | `SceneSkeleton`'s `label` prop is dead API (sole consumer never passes it); folds census **S-6** |
| C-m5 | MINOR | `EditorHeader.vue` — 0 consumers, still re-exported from the barrel App imports |
| C-m6 | MINOR | `warmScene` is only reachable from inside the *already-open* scene dropdown; the prefetch buys ~one hover |
| C-i1 | INFO | no type gate reaches the demo at all — `ci.yml` runs `check:lib` (`src/` only); no `vue-tsc` in the repo |
| C-i2 | INFO | the R1 value.js parser-crash class is **not** reachable from App's own calls (recorded so the fleet does not double-count) |
| C-S1..C-S5 | **SUPERLATIVE** | five things this component gets right, each with its own falsifier |

**Inherited, not counted here:** lane-frontend **F-1** (`@mkbabb/glass-ui` absent from `package.json` *and* `package-lock.json` while 7.0.0 sits installed). App.vue:145 `import { TooltipProvider } from "@mkbabb/glass-ui/tooltip"` is one of the 42 files that makes `npm ci` → build unresolvable. Owned by F-1; App is a victim, not the site. Counted in that lane, not this one.

Totals — **defects 13** (BLOCKER 2 + MAJOR 5 + MINOR 6), **blockers 2**, **superlatives 5**.

---

## 1. BLOCKERS

### C-B1 — `MbabbMenu.togglePpMode` throws on every invocation · **BLOCKER**

`/Users/mkbabb/Programming/keyframes.js/demo/app/dock/MbabbMenu.vue:98-101`

```ts
function togglePpMode() {
    const stored = getStoredAnimationGroupControlOptions(props.superKey);
    stored.value.ppMode = !(stored.value.ppMode ?? false);
}
```

`getStoredAnimationGroupControlOptions` returns a **plain (reactive-proxied) bucket object**, not a ref — `demo/state/controlOptionsStore.ts:66-97`, declared return type `StoredAnimationGroupControlOptions`, produced at `:86-88` by indexing the `useStorage` ref's `.value`. That type has no `value` member (`:11-27`). So `stored.value` evaluates to `undefined`, and the **right-hand side** `stored.value.ppMode` throws before the assignment is even reached:

> `TypeError: Cannot read properties of undefined (reading 'ppMode')`

This is App's problem, not merely MbabbMenu's: App mounts the menu and supplies the very key it mis-reads —

```
App.vue:20-24   <MbabbMenu v-model:open="mbabbPopupOpen" :super-key="currentSuperKey" :on-scene-restore="runSceneSwitch" />
```

**Why this is the sole outlier.** Twelve other call sites of the same function exist; every one of them uses the returned object directly:

```
CubeScene.vue:62-63          storedControls.ppMode ??= false            ← correct
useSceneMachineShellBinding.ts:105-112   controls.selectedAnimation     ← correct
useSceneMachineRouterBinding.ts:126-129  controls.selectedAnimation     ← correct
AnimationControlsGroup.vue:176           storedControls.<field>          ← correct
App.vue:229 + :274                       computed(...).value.<field>     ← correct (the ref is App's own computed)
MbabbMenu.vue:99-100                     stored.value.<field>            ← WRONG
```

App's own `storedControls` (`App.vue:229`) is a `computed`, so `.value` there is right — and that is almost certainly the shape MbabbMenu was copied from. The idiom crossed a module boundary and silently inverted.

**Blast radius.** The `ppmycota` row (`MbabbMenu.vue:29-40`) is the *only surviving* entry point to pp-mode, because the other one is dead (see **C-M2**). So the feature is 100 % unreachable: one path is dead code, the other throws. And because the throw is inside a `@click` on a reka `DropdownMenuItem` with `@select.prevent`, the menu stays open showing an apparently-inert control.

**Provenance chain (all read):** `MbabbMenu.vue:86,98-101` · `state/controlOptionsStore.ts:11-27,66-97` · `App.vue:20-24,191,229` · `CubeScene.vue:62-63` (the correct idiom) · `CubeTarget.vue:120` (the consumer of `ppMode`).

**Falsifier.** Show that `getStoredAnimationGroupControlOptions` can return a `Ref`. It cannot: `controlOptionsStore.ts:66-97` has one `return controls` at `:96` whose type is `StoredAnimationGroupControlOptions` and whose value at `:86-88` is a bucket read out of a ref, not a ref. Alternatively: click the ppmycota row in the served build and observe `ppMode` flipping with no console error. If either holds, this row dies.

---

### C-B2 — the engine-warm boot contract is violated on the rejection path · **BLOCKER**

Three files make a promise and one of them breaks it.

**The promise** — `demo/kf-engine.ts:44-56`:

```ts
/** The resolved heavy engine surface — SYNCHRONOUS. Throws if read before
 *  `warmKfEngine()` has resolved (a programmer error: `main.ts` awaits the warm
 *  before `app.mount()`, so every scene-machine read is after the resolve). */
export const kfEngine = (): AnimationEngine => {
    if (!resolved) { throw new Error("kfEngine() read before warmKfEngine() resolved …"); }
```

**The break** — `demo/app/main.ts:50-54`:

```ts
void Promise.all([warmKfEngine().catch(() => undefined), fontsDecoded]).finally(
    () => { app.mount("#app"); },
);
```

`main.ts` does not await the *resolve*; it awaits the *settlement*, having converted a rejection into a resolved `undefined`. `resolved` is only assigned inside the success arm (`kf-engine.ts:39-42`), so on a rejected warm the app mounts with `resolved === null`.

**The detonation** — `App.vue:218-220`, in `<script setup>`, i.e. synchronously during App's own setup:

```ts
const currentAnimationGroup = shallowRef<AnimationGroup<any>>(
    markRaw(new (kfEngine().AnimationGroup)()),
);
```

`kfEngine()` throws → App's setup throws → nothing renders. `index.html:96` ships a bare `<div id="app"></div>` with an explicit *"No splash"* comment, so the failure surface is a blank themed page with no error affordance and no retry: `warmKfEngine` memoises `inflight ??=` (`kf-engine.ts:38-42`), so the rejected promise is cached for the session and any later caller re-receives the same rejection.

**How the trigger fires in production, not in theory.** The heavy surface is a hashed dynamic chunk (`src/animation/load-engine.ts:123-124`, `import("./public")`). The demo deploys to gh-pages (`.github/workflows/deploy-pages.yml`; `vite build --mode gh-pages`). A client holding a cached `index.html` across a redeploy requests a chunk hash that no longer exists → 404 → the dynamic import rejects → blank app. This is the ordinary stale-shell failure, not an exotic one, and the swallow at `main.ts:50` is precisely what converts it from "engine unavailable" into "whole app gone".

**The same `throw` is reachable from a second site**, so this is not a one-liner: `useSceneMachineShellBinding.ts:75-77,83-84,92-94` call `kfEngine()` three times inside `bindSceneAdapter()`, i.e. on every scene bind.

**Falsifier.** (a) Show `main.ts` awaits a resolve rather than a settlement — it does not; `.catch(() => undefined)` at `:50` is explicit. (b) Show `App.vue:218-220` runs lazily rather than in setup — it does not; it is a top-level `const` initialiser. (c) Show Vue recovers a throwing root setup and still paints — it does not; a root-component setup throw aborts the render. (d) Show `#app` carries a non-JS fallback the user could act on — `index.html:92-96` says the opposite in prose and in markup. Any one of these kills the row.

**The cheap cure** (recorded, not applied — this lane writes no product source): either let the rejection propagate (fail loudly, keep the invariant honest) or make `currentAnimationGroup` nullable and construct at first bind, which is what **C-M5** independently wants.

---

## 2. MAJORS

### C-M1 — `tabsTrigger` is off-contract, and its whole slot chain is dead plumbing · MAJOR

`App.vue:53-59`:

```vue
<template #tabs-trigger="slotProps">
    <component :is="sceneRef?.tabsTrigger" v-bind="slotProps" v-if="sceneRef?.tabsTrigger" />
</template>
```

Two independent defects, both verified by enumeration.

**(a) `tabsTrigger` is not on the contract and no scene exposes it.** `sceneRef` is typed `shallowRef<SceneExposedApi | null>` (`App.vue:209`). `SceneExposedApi` (`app/scene/sceneExposedApi.ts:16-34`) declares `facility`, `tabsContent`, `ribbonContent`, `headerLeft`, `superKey`, `autoPlays`, `isStarted` — **no `tabsTrigger`**. A whole-tree grep for `tabsTrigger` returns exactly four hits: `App.vue:55`, `App.vue:57`, and two *comments* in `CubeScene.vue:152,156` which state the member was deleted:

> "The former `tabsTrigger` function (and its `defineExpose` entry) are therefore DELETED." — `CubeScene.vue:156`

So the `v-if` at `:57` is a compile-time-unknowable, run-time-always-`false` guard, and the property access is a type error that nothing catches (see **C-i1**).

**(b) The slot it fills has no receiver.** The chain, traced hop by hop:

| hop | file:line | shape |
|---|---|---|
| 1 | `App.vue:53` | provides `#tabs-trigger` to `EditorShell` |
| 2 | `EditorShell.vue:88-90` | forwards into `AnimationControlsGroup` |
| 3 | `AnimationControlsGroup.vue:38-40` | forwards into `ControlsPaneWrapper` |
| 4 | `ControlsPaneWrapper.vue:67-75` | forwards into `ChannelControls` |
| 5 | `ChannelControls.vue` | **no `<slot name="tabs-trigger">` exists** |

`grep -rn '<slot[^>]*name="tabs-trigger"'` across `demo/` returns exactly two receivers — `AnimationControlsGroup.vue:39` and `EditorShell.vue:89` — both of which are themselves forwarders. The terminal consumer retired it and says so:

> "the former `tabs-trigger` slot + per-trigger reka injection retire — every tab is data" — `ChannelControls.vue:50`, corroborated at `:226-228`

Vue silently discards a slot the child does not declare, so this is invisible at runtime. Net: ~20 lines across 4 files exist to carry nothing, and the head of the chain reads a property that was deleted at the glass-ui 4.0.0 `SegmentedTabs` migration.

**Why this belongs on the consumption axis.** This is exactly the residue class the census names in **S-1/S-2/F-3**: the demo's tab layer was migrated to glass-ui's data-driven strip, and the *consumer-side* scaffolding of the pre-migration reka `TabsTrigger` injection was never swept. `App.vue` is the top of that scaffolding.

**Falsifier.** Produce one scene SFC whose `defineExpose` includes `tabsTrigger`, or one `<slot name="tabs-trigger">` in `ChannelControls.vue`. Neither exists in the tree as read. (Marked **UNPROVEN-NEEDS-LIVE** only for the claim that nothing *visibly* regresses — the static kill is proven.)

---

### C-M2 — `#header-left` is never bridged; `CubeScene.headerLeft` is dead, and three files assert otherwise · MAJOR

The contract exists on **three** sides and is bridged on **zero**:

1. **Producer.** `CubeScene.vue:118-144` builds `headerLeft` — a `Popover` hover-card carrying the ppmycota brand mark, a click handler `onClick: setPPMode` (`:123`), the brand link block, and a 4 s auto-dismiss watcher (`:109-114`). It is exposed at `:252`.
2. **Type.** `sceneExposedApi.ts:24-27` declares `headerLeft?: () => VNode` under the comment "Render-fn slot projections (cross-sibling via defineExpose)".
3. **Sink.** `EditorShell.vue:16-18` renders `<slot name="header-left"></slot>` inside `HeaderRibbon`, with **no fallback content**.

`App.vue`'s template supplies `#backdrop` (`:45`), `#start-screen` (`:49`), `#tabs-trigger` (`:53`), `#tabs-content` (`:61`), `#ribbon-content` (`:65`), `#target` (`:73`). **`#header-left` is absent.** `grep -rn "header-left\|headerLeft"` over `demo/` returns five hits: `CubeScene.vue:118`, `CubeScene.vue:252`, `sceneExposedApi.ts:6`, `sceneExposedApi.ts:27`, `EditorShell.vue:18`. There is no sixth. The bridge does not exist.

**Two files state, in prose, that it does.** `App.vue:107-110`:

> "The ppmycota brand-mark rules … — a single non-scoped partial is the smallest shared scope for every brand-mark consumer **App.vue mounts (header logo, …)**"

and `styles/brand.css:2-4`:

> "These `.ppmycota-*` rules style the brand mark, which RECURS across three SFCs in the app/ entry (**App.vue header logo**, CubeScene.vue hover-card logo, CubeTarget.vue cube face …)"

The tree has no App.vue header logo. Two of the three named consumers are one and the same dead render-fn.

**Interaction with C-B1.** `setPPMode` (`CubeScene.vue:85-87`) had two entry points: this dead hover-card and `MbabbMenu.togglePpMode`. C-B1 shows the second throws. Together they make pp-mode — a shipped, persisted (`controlOptionsStore.ts:25`), consumed (`CubeTarget.vue:53,84-87,120`) feature — entirely unreachable.

**Falsifier.** Find any `#header-left` / `v-slot:header-left` binding anywhere in the repo (including the playground host), or a `HeaderRibbon` default that renders the mark. Neither exists as read. If a live build shows the ppmycota mark in the header ribbon, this row dies.

---

### C-M3 — `HeroAurora` forces `initStrategy: "eager"`, contradicting glass-ui's contract and its own docblock, on the LCP route · MAJOR

`App.vue:45-47` mounts the layer, home-only:

```vue
<template v-if="isHome" #backdrop><HeroAurora /></template>
```

`components/instrument/shell/HeroAurora.vue:24-30`:

```vue
<Aurora ref="auroraRef" :config="config"
        :opacity-ceiling="HERO_AURORA_OPACITY_CEILING"
        :runtime-options="{ initStrategy: 'eager' }"
        render-mode="auto" />
```

**The producer contract** (`node_modules/@mkbabb/glass-ui/dist/…/composables/runtime.d.ts:51-56`):

> "When to run expensive GPU initialization. Defaults to `"deferred"`. `mode: "capture"` forces `"eager"` (a capture runtime must be able to `renderAt` synchronously)."

and `Aurora.vue.d.ts` (docblock, lines 14-27):

> "**Lazy-arm: by default GPU initialization is deferred past the consumer's first paint.** … **Capture / thumbnail-baking consumers** pass `runtimeOptions.initStrategy: "eager"` … then await `armAsync()` before reading a deterministic frame."

HeroAurora is not a capture consumer. It never calls `armAsync()`. It has no comment justifying the override.

**The file contradicts itself.** Its own docblock, `HeroAurora.vue:6-8`, sells the very behaviour the prop cancels:

> "Aurora owns the rAF-coalescing, the PRM-safe CSS-gradient substrate (renderMode "auto"), the decorative DPR budget, and **the lazy WebGL arm past first paint**."

Eighteen lines later the template forces the arm eager. Both cannot be true.

**Why the route matters.** This layer mounts *only* on home (`App.vue:45`), and home is the route `index.html:37-41` identifies as carrying the LCP element ("the hero `<h1 class="text-display-4">` (EditorStartScreen.vue) is the LCP element"). So the one route with the tightest paint budget is the one that pays for immediate GPU context acquisition + shader compile, competing with the boot chain in **C-M5**. Aurora's own `render-mode="auto"` already ships a zero-JS, zero-GPU palette ground for frame 0 (`Aurora.vue.d.ts:14-22`) — the deferred arm cross-fades into it. `eager` throws that away for a layer whose opacity ceiling is **0.1** (`HeroAurora.vue:46`), i.e. a wash the user can barely see.

**Falsifier.** (a) Show glass-ui 7.0.0 documents `eager` as the recommended hero setting — the installed `.d.ts` says the opposite, twice. (b) Show `armAsync()` is awaited somewhere so the eager arm is load-bearing — `grep armAsync demo/` returns nothing. (c) A live trace showing no LCP/TBT delta between `eager` and the default would demote this to MINOR; that measurement is **UNPROVEN-NEEDS-LIVE** and belongs to the SS-13 pass. The *contract* violation and the *self-contradiction* are proven statically and stand regardless.

---

### C-M4 — the "SINGLE source" surface registry exists twice, and App reads one copy while its dock reads the other · MAJOR

Two modules define the same four things:

| symbol | copy A | copy B |
|---|---|---|
| `ControlSurfaceTab` | `state/controlSurfaces.ts:134-138` | `components/instrument/surfaceTabs.ts:6-10` |
| `SURFACE_META` | `state/controlSurfaces.ts:145-160` | `components/instrument/surfaceTabs.ts:12-19` |
| `extraTabsFrom` | `state/controlSurfaces.ts:189-195` | `components/instrument/surfaceTabs.ts:21-23` |
| `dockCardinality` | `state/controlSurfaces.ts:278-309` | `components/instrument/surfaceTabs.ts:25-40` |

`surfaceTabs.ts` is 41 lines and imports *only* `BUILT_IN_SURFACES` + `ControlSurface` from copy A (`:1-4`). It is a **re-implementation**, not a re-export.

**App straddles both.** `App.vue:264`:

```ts
const extraControlTabs = computed(() => machine.extraControlTabs());
```
→ `useSceneMachine.ts:317-318` → `extraTabsFrom` from `./controlSurfaces` → **copy A's `SURFACE_META`**.

Meanwhile the component App feeds it to, `ChromeDock.vue:18-21,49-50`:

```ts
import { SURFACE_META, dockCardinality } from "@components/instrument/surfaceTabs";
const BUILT_IN_CONTROL_TABS = BUILT_IN_SURFACES.map((s) => SURFACE_META[s]);
```
→ **copy B's `SURFACE_META`** for the built-in triad, and copy B's `dockCardinality` for the elision decision (`:126-134`).

So a single rendered dock row (`ChromeDock.vue:95-101`, `[...builtIn, ...props.extraControlTabs]`) is assembled from **two independent label/icon registries**.

**This falsifies two written invariants.** `controlSurfaces.ts:122-129`:

> "the surface→{label,icon} map existed THREE times … three hand-synced copies of one fact. **This is the SINGLE source**: both docks and the in-panel strip derive their tab descriptors from it"

and `:140-144`:

> "**THE ONE SURFACE-METADATA REGISTRY.** … both docks and the in-panel strip resolve every tab's `{label,icon}` from HERE (**`proof:dfa-derived`'s "resolves from exactly ONE module" clause**)."

Three copies were collapsed to two, and the prose was written as if it were one. `TransportDock.vue:237` is the second consumer of copy B, so the split is not incidental.

**Contradiction with the hitherto corpus, stated explicitly.** lane-frontend **F-5** records "One **dead** backwards-compat re-export shim (**0 consumers**)". Whatever file that id names, `components/instrument/surfaceTabs.ts` is a **different animal**: it has **two** consumers (`ChromeDock.vue:21`, `TransportDock.vue:237`), and it is a duplicate **definition**, not a re-export. F-5 as written does not cover it. This row supersedes/extends F-5 for this file.

**Failure mode.** Today the two copies are byte-equivalent in behaviour — `SURFACE_META` values and `dockCardinality` logic match — so there is **no live divergence**, which is exactly why it is MAJOR and not BLOCKER. The defect is that a one-line label edit in copy A (e.g. the T.E8 "Curve"/"Physics" recut recorded at `controlSurfaces.ts:149-152`) changes the *extra* tabs and leaves the *built-in* triad stale, in the same dropdown, with no gate to notice.

**Falsifier.** Show `surfaceTabs.ts` re-exports rather than redefines (it does not — `:12` is a fresh object literal, `:25` a fresh function body), or show `ChromeDock`/`TransportDock` import `SURFACE_META` from `@state` (they do not). Or find a running gate that asserts single-module resolution — `proof:dfa-derived` runs only in the nightly demo roster (see **C-i1**), never on the merge path.

---

### C-M5 — App's synchronous group construction pulls value.js onto the critical boot path and gates the LCP element · MAJOR

The library goes to considerable trouble to keep value.js off the static graph. `src/animation/index.ts:1-25` is explicit:

> "LIGHT (static) … A consumer that imports only these pulls neither Value's parser/color graph nor Keyframes' heavy engine. HEAVY (dynamic) — `AnimationGroup` … genuinely need value.js … reached ONLY through `loadAnimationEngine()`."

App honours the **static** half perfectly (see **C-S4**). It defeats the **behavioural** half.

The chain:

1. `App.vue:218-220` constructs an `AnimationGroup` **synchronously in setup**.
2. Because of (1), `kf-engine.ts:14-20` must warm the heavy chunk before mount — the file says so in its own words: "threading `async` through that reconcile … would ripple nullability through the whole control suite. Instead `main.ts` WARMS the engine before the app mounts."
3. `main.ts:50-54` therefore gates `app.mount("#app")` on `Promise.all([warmKfEngine(), fontsDecoded])`.
4. `index.html:37-41` identifies the LCP element as the hero `<h1>` in `EditorStartScreen.vue` — a **Vue-rendered** node.
5. `index.html:92-96` ships `<div id="app"></div>` with an explicit "No splash".

Therefore: **the LCP element cannot paint until the value.js-bearing engine chunk has been fetched, parsed and evaluated**, plus up to 1.5 s of font-decode race (`main.ts:45-48`). `kf-engine.ts:23-25` acknowledges the shape and then asserts the mitigation:

> "The first-paint skeleton + critical CSS are JS-independent (criticalCSSPlugin inlines them), so this boot await does not block the visual first paint."

That claim is about **first paint (FCP)**, and it is true. It is silently applied to **LCP**, where it is false — the LCP candidate is `EditorStartScreen`'s `<h1>`, and there is no splash for it to be. The gate `proof:boundary` stays green throughout, because it inspects the *static* import graph, which is genuinely clean. The measurement the boundary exists to protect is defeated anyway.

**The App-side root.** This is not a `main.ts` bug; `main.ts` is doing the only thing it can given `App.vue:218-220`. The consumption decision that costs the boot is App's: a non-null `AnimationGroup` at setup. The alternative shapes are visible in the tree — `useSceneMachineShellBinding.ts:74-94` already re-assigns the group on every bind, so App's initial value is a placeholder that lives for one tick.

**Cross-reference.** This is the same failure family as value.js's own **Q14** LCP escalation (eager-WebGL-blob boot blocker) recorded in the tranche memory, and it compounds with **C-M3**, which additionally forces GPU acquisition on the same route.

**Falsifier.** (a) Show `criticalCSSPlugin` inlines a *content* element large enough to be the LCP candidate — `index.html:92-95` says the opposite and names the intent ("nothing to content-swap"). (b) Show `EditorStartScreen`'s `<h1>` is not the LCP element — `index.html:37-41` asserts it is, in the repo's own words. (c) A live trace showing LCP unaffected by the boot await would kill this row; that measurement is **UNPROVEN-NEEDS-LIVE** (SS-13). The static chain 1→5 is proven.

---

## 3. MINORS

### C-m1 — `readonly ControlSurface[]` handed to a mutable `string[]` prop · MINOR

`App.vue:207` `const controlSurfaces = computed(() => machine.controlSurfaces.value);`

`useSceneMachine.ts:308` produces `readonly(computed<ControlSurface[]>(...))`. Vue's signature is `readonly<T extends object>(target: T): DeepReadonly<UnwrapNestedRefs<T>>` (`@vue/reactivity.d.ts:115`), and `DeepReadonly`'s ref arm (`:83`) maps `Ref<U>` → `Readonly<Ref<DeepReadonly<U>>>`; `DeepReadonly<ControlSurface[]>` resolves through the mapped-object arm (`:83-85`) to `readonly ControlSurface[]`. So App's computed is `ComputedRef<readonly ControlSurface[]>`.

It is bound at `App.vue:11` to `ChromeDock.vue:71`'s `controlSurfaces?: string[]` — mutable. `readonly T[]` is not assignable to `T[]`.

No runtime consequence: `ChromeDock.vue:98` only calls `.includes`. The defect is that the mutation boundary `useSceneMachine.ts:12-13` builds ("exports ONLY `dispatch()` + READONLY refs") is discarded at the prop edge, and the type system is never asked (see **C-i1**).

**Falsifier.** Run `vue-tsc --noEmit` over `demo/`. If `App.vue:11` reports no `TS2322`, this row dies. (Marked PLAUSIBLE rather than CONFIRMED for exactly that reason — the repo ships no vue-tsc to run.)

### C-m2 — `storedControls` is a `computed` whose getter mutates persisted storage · MINOR

`App.vue:229`:

```ts
const storedControls = computed(() => getStoredAnimationGroupControlOptions(currentSuperKey.value));
```

`getStoredAnimationGroupControlOptions` is **not** a pure read. `controlOptionsStore.ts:76-84` creates and writes the bucket when absent (`structuredClone` + `defaultControlSurfaceFor`), and `:92-94` back-fills `controls.keyframeControls ??= …` on legacy buckets — both writes land in a `useStorage` ref, i.e. reactive state *and* `localStorage`. A computed getter that writes a dependency it also reads is the canonical Vue anti-pattern; here it self-invalidates on first evaluation for a fresh scene key and converges on the second.

App then uses the computed as a **write channel** — `App.vue:16`:

```
@toggle-controls-panel="storedControls.isControlsPanelOpen = !storedControls.isControlsPanelOpen"
```

That works (the computed yields an object; the write goes to the object, not the computed), but it means the panel-open state, the surface pick (`App.vue:307-310`), and the animation selection all mutate through a value whose *production* has side effects.

**Falsifier.** Show `getStoredAnimationGroupControlOptions` is side-effect-free — `controlOptionsStore.ts:76-94` has two unconditional-on-miss writes. Or show Vue permits writes in computed getters as a supported pattern — it does not.

### C-m3 — `AnimationGroup<any>` is the app's central prop type · MINOR

`App.vue:218` `shallowRef<AnimationGroup<any>>`, threaded to `EditorShell.vue:137` `animationGroup: AnimationGroup<any>` and `useSceneMachineShellBinding.ts:28`. The `any` is load-bearing, not lazy: `AnimationGroup`'s only constructor is variadic over children (`src/animation/group/group.ts:118`), so `new AnimationGroup()` leaves `V extends Vars` unresolved and there is no `AnimationGroup.empty()` / `AnimationGroup<never>` door on the published `AnimationEngine` surface (`src/animation/load-engine.ts:67-112`). The consumer pays with an `any` that erases `Vars` typing across the entire transport contract.

Recorded as much a **library-API gap** as a consumer defect — the honest producer ask is a typed empty-group constructor.

**Falsifier.** Point at an existing typed empty-group entry on `AnimationEngine`. `load-engine.ts:67-112` enumerates 45 members; none is one.

### C-m4 — `SceneSkeleton`'s `label` prop is dead API; folds census **S-6** · MINOR

`App.skeleton.vue:18-24` declares `label?: string` with default `"Loading scene"`, bound at `:32` to `aria-label`. Its **sole** consumer is `App.vue:97` `<SceneSkeleton />` — no prop passed. `grep -rn "SceneSkeleton\|App.skeleton"` over `demo/` returns three hits, all of them App's import, App's mount, and the file's own docblock. The prop has never been exercised.

Folds lane-frontend **S-6** (`App.skeleton` → glass-ui `Skeleton`, AMBER, 101 lines). Confirmed against the installed artifact: `node_modules/@mkbabb/glass-ui/dist/index.d.ts:20` re-exports `./components/skeleton`, and `dist/components/skeleton/index.d.ts` exports `Skeleton` — so the census's "root-reachable" note is correct at 7.0.0. Two additional consumption notes the census did not carry: (a) the shimmer is a hand-written CSS `@keyframes` (`App.skeleton.vue:85-92`) inside the **keyframes.js** demo, and (b) it duplicates a `prefers-reduced-motion` degrade (`:95-100`) that glass-ui's own components already own.

**Falsifier.** Find a second `<SceneSkeleton>` mount that passes `label`, or show `Skeleton` absent from glass-ui 7.0.0's root barrel. Neither holds.

### C-m5 — `EditorHeader.vue` has zero consumers but rides the barrel App imports · MINOR

`App.vue:138` `import { EditorShell, EditorStartScreen } from "@components/instrument/shell";` pulls `shell/index.ts`, which re-exports four components (`:1-4`). `EditorHeader` (`:2`, 108 lines) has **no consumer anywhere**: `grep -rn "EditorHeader" demo/` returns exactly one hit — the barrel line itself. It statically imports `SharePopover`, `DarkModeToggle` from `@mkbabb/glass-ui/dark-mode-toggle`, and `useTimeoutFn` (`:43-46`), and carries a `<style scoped>` block (`:87`).

**Falsifier / honest limit.** The *dead-export* fact is proven by enumeration. Whether the module (and its scoped CSS side effect) survives into the shipped bundle is **UNPROVEN-NEEDS-BUILD**: build `npm run gh-pages` and grep the emitted CSS for `EditorHeader`'s scoped hash. If absent, the row demotes to a pure hygiene note; the dead export stands either way.

### C-m6 — `warmScene` is only reachable from inside the already-open dropdown · MINOR

`App.vue:15` binds `@warm-scene="warmScene"` (`scenes.ts:118-123`, the S5 prefetch). `ChromeDock` emits it from exactly one place — `ChromeDock.vue:261`, `@pointerenter` on a `SelectItem` **inside `SelectContent`**. That content only exists once the scene `<Select>` is open. So the warm fires on the hover that immediately precedes the click, not on approach: the prefetch window is one hover-to-click interval (~100-300 ms), not the dropdown-open interval.

The obvious wider surfaces are unwired: the collapsed dock pill (`ChromeDock.vue:363-366`) and the expanded `DockTrigger` (`:241-245`) emit nothing.

**Falsifier.** Show a second `emit('warmScene', …)` site — `grep -n "warmScene" demo/app/dock/ChromeDock.vue` returns `:152` (the declaration) and `:261` only. A live measurement showing the hover interval already covers the chunk fetch would demote this to INFO; **UNPROVEN-NEEDS-LIVE**.

---

## 4. INFO

### C-i1 — nothing type-checks this component

`.github/workflows/ci.yml:42` runs `npm run check:lib`, which is `tsc --noEmit -p tsconfig.lib.json` — and `tsconfig.lib.json:1-13` narrows `include` to `["src/"]`, with the comment "**never the demo**". `tsconfig.json:52` does include `demo/`, but `npm run check` is not on any workflow. And `tsc` cannot read `.vue` templates or SFC script blocks at all; `grep -rn "vue-tsc" .` returns nothing — the tool is neither a dependency nor a script.

Consequence: **C-B1** (`stored.value` on a non-ref), **C-M1** (`sceneRef.tabsTrigger` off-contract), and **C-m1** (readonly→mutable) are all plain type errors that no gate in this repo can see. The demo-roster gates that *would* catch behavioural drift (`proof:app-is-shell`, `proof:dfa-derived`) run only under `schedule:`/`workflow_dispatch` (`ci.yml:50-52`) and are explicitly non-blocking ("it does not block library merges", `ci.yml:44-46`).

This is context, not a defect of App — but it is the reason the defects above are *shipped* rather than *caught*.

### C-i2 — the R1 value.js parser-crash class is not reachable from App's own calls

Recorded so the fleet does not double-count. keyframes.js pins `@mkbabb/value.js@4.0.0` (`package.json:69`), the version carrying the R1 `parseCssColor("oklch()")` shipping crash. App.vue touches the value.js-bearing surface exactly once — `new (kfEngine().AnimationGroup)()` (`:218-220`) — and `AnimationGroup`'s constructor with **zero** arguments performs no parsing: `src/animation/group/group.ts:118-163` iterates an empty `inputs`, leaves `transform` at `NOOP_TRANSFORM`, and calls `invalidateEntries()`. No color string, no CSS text, no `parseCssColor` reaches value.js from this file.

App's genuine value.js exposure is *timing*, not *parsing* — see **C-M5**. The R1 crash surface, where it exists, belongs to the scene/keyframe-editor components, not to the shell.

---

## 5. SUPERLATIVES — L-18 runs both ways

Each of these is a consumption decision this component gets *right*, and each carries the observation that would kill the praise.

### C-S1 — the bare-`<Suspense>` discipline, documented with the exact break it prevents

`App.vue:73-99` + `useSceneSwap.ts:17-25`. The scene host is a **bare** keyed `<Suspense>` with no wrapping `<Transition>` and no `<KeepAlive>`, and the cross-dissolve rides `:style="sceneSwapStyle"` on a **sibling** `<div>`. The comment does not merely assert a rule — it records the falsification that produced it:

> "wrapping a keyed `<Suspense>` over a `defineAsyncComponent` never triggered the chunk fetch — amiga/square/easing/spring shipped a BLANK viewport, B.W3's headline blocker" (`App.vue:78-81`)

and the sibling composable independently re-states the same mechanism (`useSceneSwap.ts:17-25`). Two files, one root cause, one structural cure, and the cure is placed where it cannot be undone by accident. This is what a load-bearing consumption constraint should look like.

**Falsifier.** Show a `<Transition>` or `<KeepAlive>` around the `<Suspense>` at `App.vue:90` (there is none), or show the fade driven from a wrapper rather than the sibling `.scene-host` (`:84-89` is the sibling).

### C-S2 — the demo dogfoods kf's own `viewTransition` rather than glass-ui's

`useSceneTransition.ts:2` imports `viewTransition` from `@mkbabb/keyframes.js`, not `startViewTransition` from `@mkbabb/glass-ui` — even though the latter is right there in the root barrel (`glass-ui/dist/index.d.ts:31`) and the neighbouring `useSceneSwap.ts:2` uses glass-ui's `supportsViewTransitions` for feature detection. The demo's most-visible motion is driven by the library under test.

The call shape is correct against the producer: `src/animation/index.ts:116-125` publishes `viewTransition` on the **LIGHT** barrel ("composes `flipShared` + the ONE `withReducedMotion` gate; feature-detects `startViewTransition`; no parser/color edge"), and `useSceneTransition.ts:85-88` calls it as `viewTransition(mutate, { types })` — mutate first, options second — exactly as the barrel documents, with `types` omitted when empty so the untyped cross-fade is the graceful degrade.

The a11y follow-through is real too: `finished.finally(() => sceneHost.value?.focus())` (`:89-91`) against a `tabindex="-1"` host (`App.vue:86`) whose focus ring is suppressed (`:384-386`) — a focus move for AT without a stray outline. This is the correct division: kf owns the *dispatch*, glass-ui owns the *look* (`App.vue:112-121`).

**Falsifier.** Show `viewTransition` is not on the LIGHT barrel (it is, `index.ts:116`), or that the demo carries its own `::view-transition-*` CSS after all — `App.vue:113-121` claims it does not, and no such rule appears in the scoped block at `:350-386`.

### C-S3 — `HeroAurora`'s glass-ui `/aurora` consumption is exact, forked nowhere, and layout-read-free

Every symbol verified present in the **installed 7.0.0** artifact, not assumed:

| used | verified at |
|---|---|
| `Aurora` | `dist/components/aurora/index.d.ts:1` |
| `PAPER_WASH_GROUND` | `dist/components/aurora/index.d.ts` (presets re-export) |
| `resolveAtoms` | `dist/components/aurora/index.d.ts` (atoms re-export) |
| props `config` / `runtimeOptions` / `renderMode` / `opacityCeiling` | `Aurora.vue.d.ts` `__VLS_Props` |
| exposed `setCursor(x,y,strength?)` / `clearCursor()` | `Aurora.vue.d.ts:92-93` |

No fork, no shadow component, no hand-rolled `--mouse-x` wash — and the file names the standing guard for that (`proof:no-hand-rolled-cursor-tracker`, `:5`). The pointer handler (`:86-95`) does **zero** DOM geometry reads, using `window.innerWidth/Height` against a `fixed inset-0` layer, with the lane-12 read-after-write recurrence explicitly cited as the reason (`:76-82`). Listeners ride `@vueuse/core`'s scope-managed `useEventListener` (`:104-110`), not hand-paired `addEventListener`. Mouse-only gating (`:87`) keeps it off touch, where it would fight scene gestures.

This is the census's `/aurora` row (1 use, §3.1) done properly — and it is the counterweight to **C-M3**: the *one* wrong prop sits inside otherwise exemplary consumption.

**Falsifier.** Any of the five symbols/props absent from the installed `.d.ts` (all five verified present), or a `getBoundingClientRect` in the pointer path (there is none).

### C-S4 — the LIGHT/HEAVY static boundary is honoured at the import level

App's *only* direct `@mkbabb/keyframes.js` import is `import type { AnimationGroup }` (`App.vue:147`) — erased under `verbatimModuleSyntax` (`tsconfig.json:12`), so it adds no runtime edge. Every runtime reach for the heavy surface goes through `kfEngine()` (`:148`, `:219`), which is `loadAnimationEngine()` (`kf-engine.ts:27,38-42`), which is `import("./public")` (`src/animation/load-engine.ts:123-124`). There is **no** static value import of `AnimationGroup`/`CSSKeyframesAnimation`/`resolveKeyframes` anywhere in App's own file. The one static value import from the barrel in App's closure is `SpringProgress` (`useSceneSwap.ts:3`) — a LIGHT export by the barrel's own enumeration (`index.ts:38-42`), value.js-free but for the shared `/math` leaf.

The discipline is real and correctly placed. (That the *timing* of the warm defeats what the boundary is for is **C-M5** — a different defect, and it does not diminish that the import graph is clean.)

**Falsifier.** Any static value import from `@mkbabb/keyframes.js` in App's closure that resolves into `./engine`. Enumerated: `App.vue:147` (type-only), `useSceneTransition.ts:2` (`viewTransition`, LIGHT), `useSceneSwap.ts:3` (`SpringProgress`, LIGHT), `kf-engine.ts:27-28` (`loadAnimationEngine` + type). None violates.

### C-S5 — the glass-ui boundary in the shell is clean

Across App's entire import closure there are **zero** direct `reka-ui` imports and **zero** local `ui/`-style shadcn copies. Every primitive comes from glass-ui by subpath or root barrel: `/tooltip` (`App.vue:145`), `/dock` (`ChromeDock.vue:6-11`, `MbabbMenu.vue:84`), `/status-dot` (`ChromeDock.vue:29`), `/aurora` (`HeroAurora.vue:37-41`), `/dark-mode-toggle`, `/header-ribbon`, `/keyboard` (`EditorShell.vue:116-125`), root (`ChromeDock.vue:22-28`, `MbabbMenu.vue:82`). Subpath selection is deliberate and mostly narrow — the leaf-import rationale is even written down for the one direct-not-barrel case (`App.vue:139-142`, `HeroAurora` as a "single-consumer leaf, the P-HERO import shape").

This confirms census **F-6** ("Zero local `ui/` shadcn copies, zero direct `reka-ui` imports — the glass-ui boundary is otherwise **clean**", GREEN) specifically for the App subtree. Notably, none of the census's S-1..S-8 shadow components (`KfPillTabs`, the timeline cluster, `SequenceScrubber`, `AnimatedText`, `CopyButton`, `TypingDots`) is imported by App directly; the one shadow in App's *own* files is `App.skeleton.vue` (S-6, **C-m4**), which is 101 lines and structurally trivial to retire.

**Falsifier.** One `from "reka-ui"` or one local `components/ui/*` import inside the closure listed in the header. `grep -rn 'from "reka-ui"' demo/app demo/components/instrument/shell` returns nothing.

---

## 6. Recommended order of repair (recorded; nothing applied by this lane)

1. **F-1 first** (inherited) — declare and lock `@mkbabb/glass-ui@7.0.0`. Nothing below is reproducible until `npm ci` works.
2. **C-B1** — one-line: drop `.value` at `MbabbMenu.vue:100`. Trivially verifiable and it un-deads a shipped feature.
3. **C-B2** — either stop swallowing at `main.ts:50` or make the group nullable at `App.vue:218`; the second choice also discharges **C-M5**.
4. **C-M2** — bridge `#header-left` (three lines in `App.vue`'s template) *or* delete `headerLeft` from `CubeScene`, `sceneExposedApi`, `EditorShell`, and correct the two prose claims (`App.vue:107-110`, `brand.css:2-4`). Do not leave the contract half-alive.
5. **C-M1** — delete the four-hop `tabs-trigger` chain outright; nothing receives it.
6. **C-M3** — drop `initStrategy: "eager"` (one line) and let Aurora's documented lazy arm do its job.
7. **C-M4** — collapse `components/instrument/surfaceTabs.ts` into a re-export of `@state/controlSurfaces`, then make `proof:dfa-derived`'s one-module clause structural rather than prose.
8. **C-i1** — add `vue-tsc --noEmit` over `demo/` to the merge path. Items 2, 5 and **C-m1** are all things it would have caught for free.
