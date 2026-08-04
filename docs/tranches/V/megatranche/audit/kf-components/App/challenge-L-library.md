claude-opus-5[1m]

# CHALLENGE · `App` · axis **L (LIBRARY)**

**Target:** `/Users/mkbabb/Programming/keyframes.js/demo/app/App.vue` (387 lines)
**Tree HEAD:** `8281638c fix(demo-shell): provide tooltip context for the routed control group`
**Mode:** static, read-only. No installs, no dev server, no browser. Livable-only claims are marked `UNPROVEN-NEEDS-LIVE`.
**Posture:** the component is assumed DEFECTIVE until the tree proves otherwise. Every claim carries its own falsifier; claims that died to their falsifier during the read are recorded in §4 (Killed) rather than shipped as findings.

**Read perimeter (whole-file reads, all of App's import closure):**
`App.vue` · `App.skeleton.vue` · `app/main.ts` · `app/dock/index.ts` · `app/dock/ChromeDock.vue` · `app/dock/MbabbMenu.vue` · `app/lifecycle/useMonacoCancellationGuard.ts` · `app/scene/scenes.ts` · `app/scene/sceneExposedApi.ts` · `app/scene/useSceneMachineRouterBinding.ts` · `app/scene/useSceneMachineShellBinding.ts` · `app/transition/useSceneSwap.ts` · `app/transition/useSceneTransition.ts` · `demo/kf-engine.ts` · `demo/state/index.ts` · `demo/state/controlSurfaces.ts` · `demo/state/controlOptionsStore.ts` · `demo/state/useSceneMachine.ts` · `demo/components/instrument/transport/injectionKeys.ts` · `demo/components/instrument/shell/EditorShell.vue` · `demo/components/instrument/shell/HeroAurora.vue` · `demo/components/instrument/surfaceTabs.ts` · `demo/composables/scene-facility/index.ts` · `demo/scenes/cube/CubeScene.vue` · `demo/styles/brand.css` · `src/animation/physics/spring/progress.ts` · `src/animation/physics/spring/managed-play.ts` · `src/animation/load-engine.ts` · `vite.config.ts` · `tsconfig.json` · `tsconfig.test.json` · `.github/workflows/ci.yml` · `package.json`

**Tally:** 18 defects (3 BLOCKER · 5 MAJOR · 7 MINOR · 3 INFO) · 6 superlatives.

---

## 0. Headline

| id | severity | claim | anchor |
|---|---|---|---|
| L-1 | **BLOCKER** | `togglePpMode` dereferences `.value` on a plain object → live `TypeError` on click. App is the sole host AND sole prop supplier. | `MbabbMenu.vue:100` |
| L-2 | **BLOCKER** | App's root `TooltipProvider` import resolves through an **undeclared, unlocked** package. `npm ci` cannot build the app root. | `App.vue:145` |
| L-3 | **BLOCKER** | **No SFC typecheck exists.** `tsc -p tsconfig.json --listFilesOnly` sees **0** `.vue` files; `vue-tsc` is not installed; CI runs `check:lib` (src/ only). App.vue's script and template are unchecked by any gate. | `package.json:39`, `ci.yml:42` |
| L-4 | MAJOR | No error boundary anywhere. A failed scene chunk = white screen; the docblock claiming `<Suspense>` surfaces it is false. | `scenes.ts:120-122` |
| L-5 | MAJOR | An engine chunk-load failure is swallowed at boot, then re-thrown fatally in App's setup with a message that misdiagnoses the cause. | `main.ts:49-53` → `App.vue:218-220` |
| L-6 | MAJOR | Dead `#tabs-trigger` slot binding a property that exists on no scene and on no interface. | `App.vue:53-59` |
| L-7 | MAJOR | The "exactly ONE module" surface-metadata registry exists **twice**, live, and App's render path reads both copies. | `surfaceTabs.ts:12` vs `controlSurfaces.ts:150` |
| L-8 | MAJOR | `cube` is registered as a lazy chunk **and** statically imported by App. The descriptor's `component` for cube is dead; the split is defeated. | `App.vue:155` vs `scenes.ts:143` |
| L-9 | MINOR | `headerLeft` is a dead contract member: declared, produced, sloted — never filled by the only host. ~33 lines of `h()` unreachable. | `App.vue` (absent), `CubeScene.vue:118-150` |
| L-10 | MINOR | The `autoPlays` branch is inert — every producer declares `false` — and its docblock asserts the opposite. | `useSceneMachineShellBinding.ts:200-207` |
| L-11 | MINOR | `setActiveSurfaces`'s documented idempotence ("ref equality on the array") is structurally impossible against `surfacesFor`. | `useSceneMachine.ts:134-135` |
| L-12 | MINOR | `storedControls` is a `computed` whose getter **writes** persisted global state. | `App.vue:229` |
| L-13 | MINOR | `sceneSwapStyle` is provably constant on VT engines yet still emits `transform: scale(1)` — a stacking context on the very host App's `<style>` block argues must stay de-layered. | `useSceneSwap.ts:38-42`, `App.vue:360-378` |
| L-14 | MINOR | A test-instrumentation attribute ships to the production DOM, asymmetric with its DEV-gated twin two lines above. | `useSceneTransition.ts:76-83` |
| L-15 | MINOR | App's `#ribbon-content` projection reaches a second `TypeError` site; the backing type omits a field the tree stores. | `App.vue:65-71` → `CubeScene.vue:194`, `controlOptionsStore.ts:26` |
| L-16 | INFO | App writes a fact into global state and reads the same fact back out of it, in the same setup. | `App.vue:248-264` |
| L-17 | INFO | Inline template mutation contradicts the rule its own sibling composable writes down. | `App.vue:16` vs `useSceneMachineShellBinding.ts:262-263` |
| L-18 | INFO | A deliberate TDZ-lazy closure resolves a setup-order cycle; safe today, unguarded tomorrow. | `App.vue:329,336` |

Superlatives: **S-A**…**S-F**, §3.

---

## 1. BLOCKERS

### L-1 · `togglePpMode` dereferences `.value` on a plain object — live crash

`App.vue:20-24` mounts `MbabbMenu` in `ChromeDock`'s `#items` slot and is the **sole** supplier of its `super-key` prop:

```vue
<template #items>
    <MbabbMenu v-model:open="mbabbPopupOpen" :super-key="currentSuperKey" :on-scene-restore="runSceneSwitch" />
</template>
```

`MbabbMenu.vue:98-101`:

```ts
function togglePpMode() {
    const stored = getStoredAnimationGroupControlOptions(props.superKey);
    stored.value.ppMode = !(stored.value.ppMode ?? false);
}
```

`getStoredAnimationGroupControlOptions` returns `StoredAnimationGroupControlOptions` — the **bucket object itself**, not a ref (`controlOptionsStore.ts:66-101`, returning `controls`, typed `StoredAnimationGroupControlOptions`). There is no `value` member on that type and none on the stored object. So `stored.value` is `undefined`, and the assignment on the same line throws:

> `TypeError: Cannot set properties of undefined (setting 'ppMode')`

This is the **only** one of the tree's 12 call sites that reaches for `.value`. Every other consumer treats the return as a plain object:

```
CubeScene.vue:62-63          const storedControls = getStored…(superKey); storedControls.ppMode ??= false;
MatrixEditor.vue:113         const storedControls = getStored…(props.superKey);
AnimationControlsGroup.vue:176   const storedControls = getStored…(superKey);
useSceneMachineShellBinding.ts:105-112   controls.selectedAnimation = axisNames[0]!;
useSceneMachineRouterBinding.ts:126-129  controls.selectedAnimation = anim;
App.vue:229                  computed(() => getStored…(…))   ← `.value` here is the COMPUTED's, correct
```

App.vue:229 is almost certainly the contagion source: `storedControls.value.selectedControl` (App.vue:274) is correct **because `storedControls` is a `computed`**. The extraction into `MbabbMenu` (`S.D1 · a23 F2`, per its own header) carried the `.value` across without the wrapper.

**Blast radius:** clicking the ppmycota row in the @mbabb dock menu. `ppMode` is a shipped feature — `CubeScene.vue:19` passes `:pp-mode="storedControls.ppMode ?? false"` to `CubeTarget`. The toggle is the only writer. Zero test coverage: `grep -rn "ppMode\|MbabbMenu" test/ scripts/` → no output.

**Falsifier:** show that `getStoredAnimationGroupControlOptions` can return a ref-like — e.g. a `useStorage` bucket that is itself a `Ref`, or a Proxy exposing `value`. *Checked:* `controlOptionsStore.ts:83-99` indexes `store.value[superKey]` and returns that element directly; `useStorage` deep-reactivity wraps the object in a reactive Proxy, which does not synthesise a `value` key. Claim survives. A live click that mutates `ppMode` successfully would also kill it — `UNPROVEN-NEEDS-LIVE` only for the *observation*, not the mechanism.

---

### L-2 · App's root import resolves through a phantom dependency

`App.vue:145`:

```ts
import { TooltipProvider } from "@mkbabb/glass-ui/tooltip";
```

This is the **outermost element of the entire application** (`App.vue:3` / `:103`) — the shared-shell tooltip provider the HEAD commit exists to install. Re-measured at HEAD:

```
$ grep -n "glass-ui" package.json            → (no match, exit 1)
$ grep -c "glass-ui" package-lock.json       → 0
$ node -p 'require("./node_modules/@mkbabb/glass-ui/package.json").version'  → 7.0.0
$ node -p 'JSON.stringify(require("./package.json").dependencies)'          → {"@mkbabb/value.js":"4.0.0"}
```

This is **lane-frontend F-1**, confirmed unchanged. What this challenge adds is the *bite point*: F-1 was scored as a repo-level reproducibility red. On App specifically it is a **root-of-graph** failure — `npm ci` rebuilds `node_modules` strictly from the lockfile, which has zero glass-ui entries, so the first module Vite resolves for the app root is unresolvable. There is no degraded mode: no fallback provider, no dynamic import, no `try`. `demo/styles/style.css:3`'s `@import "@mkbabb/glass-ui/styles"` compounds it, but App.vue:145 fails first and fails hardest.

`.npmrc` is `legacy-peer-deps=true`, so peer-range drift is silently absorbed on top: no floor, no ceiling, no lock, no warning.

**Falsifier:** a `postinstall`, a `.npmrc` registry alias, a vendored tarball, or a `resolve.alias` entry that supplies glass-ui without a manifest declaration. *Checked:* `vite.config.ts:37-60` aliases nine paths, none of them glass-ui; `.gitmodules` declares only `docs/precepts`; `ls -ld node_modules/@mkbabb/glass-ui` is a real directory, not a symlink; `package.json` scripts contain no `postinstall`. Claim survives.

---

### L-3 · No SFC typecheck exists — App.vue's script and template are ungated

Measured, not inferred:

```
$ npx tsc --noEmit --listFilesOnly -p tsconfig.json | grep -c "\.vue"
0
$ node -p 'require("./package.json").devDependencies?.["vue-tsc"] ?? "ABSENT"'
ABSENT
$ ls node_modules/.bin | grep -i vue
vue-demi-fix
vue-demi-switch
```

`package.json:39` — `"check": "tsc --noEmit && tsc --noEmit -p tsconfig.test.json"`. Plain `tsc` cannot parse `.vue`; `tsconfig.json:include` is `["src/", "demo/"]`, and `tsc` selects only `.ts`/`.d.ts` from those roots. `demo/env.d.ts:3-6` then declares every SFC as `DefineComponent<{}, {}, any>`, so *importers* of a `.vue` see `any` as well. The 58-file / 11 984-line SFC surface is entirely outside the type system.

CI does not even run `check`. `.github/workflows/ci.yml:42` runs `npm run check:lib` — `tsconfig.lib.json`, `src/` only. `release.yml:43` likewise. The nightly `demo-correctness` job (`ci.yml:52-77`) builds and runs a Playwright roster but performs **no** typecheck, and is `if: schedule || workflow_dispatch` — it never gates a merge.

This is the **enabling condition** for L-1 (`.value` on a non-ref), L-6 (a property on no interface), L-15 (a field absent from its own type), and it is why `tsconfig.json`'s otherwise-excellent strictness (`strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `verbatimModuleSyntax`) buys the demo nothing. `tsconfig.test.json`'s own header brags that S.B7 "joins the `check` roster … so a private-access planted in a test REDs" — the same reasoning applied to `demo/**/*.vue` has never been done.

**Falsifier:** a `vue-tsc`/`vti`/`volar` invocation anywhere in CI, a pre-commit hook, or a `Makefile` target that typechecks SFCs. *Checked:* `package.json` scripts (19, listed above) contain no vue-aware checker; `.github/workflows/{ci,release,deploy-pages}.yml` invoke only `check:lib`, `build:lib`, `test:lib`, `proof:publish`, `gh-pages`, `demo:correctness`, `audit:lighthouse`. A `Makefile` exists at repo root and is the remaining place to look — if it carries a `vue-tsc` target wired into a gate, this claim drops to MINOR. Claim survives the checks performed.

---

## 2. DEFECTS

### L-4 · MAJOR — no error boundary; the `<Suspense>` error posture is asserted, not implemented

`App.vue:90-99` mounts every scene under a bare keyed `<Suspense>` with a `#fallback` and **no** error handling. `scenes.ts:104-107` wraps each loader in `defineAsyncComponent(loader)` with no `errorComponent`, no `onError`, no `timeout`, no retry.

`scenes.ts:118-123` then asserts a recovery path that does not exist:

```ts
// Pure prefetch: the loader's promise is fired and dropped … a rejected warm is
// swallowed (the real mount surfaces the error via `<Suspense>`).
if (loader) void loader().catch(() => {});
```

`<Suspense>` in Vue 3 has exactly two slots — `default` and `fallback`. It has no error slot and performs no error recovery; a rejected async-component load propagates to the nearest `onErrorCaptured` or to `app.config.errorHandler`. The tree has neither:

```
$ grep -rn "onErrorCaptured\|errorHandler\|errorComponent" --include="*.vue" --include="*.ts" demo/
→ (only prose matches: App.vue:164 comment, useMonacoCancellationGuard.ts docblock, 3 AnimationOptionError sites)
```

So a scene chunk that 404s (stale deploy hash after a `gh-pages` publish — the *canonical* SPA failure, and `vite.config.ts:263` sets `base: "./"` with hashed chunk names) leaves the user on a permanently-skeleton stage with a console error and no path forward. The dock still renders (it is a sibling of `EditorShell`), so the failure reads as "this scene is broken forever", not "reload".

`useMonacoCancellationGuard` (App.vue:166) proves the team knows how to install an app-lifetime global handler and does so *for a benign case*. The genuinely fatal case has none.

**Falsifier:** an `onErrorCaptured` in `EditorShell`/`AnimationControlsGroup`, an `app.config.errorHandler` in `main.ts`, or a service worker / Vite `preloadError` listener that reloads on chunk failure. *Checked:* `main.ts` (whole file, 63 lines) installs neither; the grep above is tree-wide over `demo/`. Claim survives.

---

### L-5 · MAJOR — a swallowed boot failure becomes a fatal, misdiagnosed throw in App's setup

`main.ts:49-53`:

```ts
void Promise.all([warmKfEngine().catch(() => undefined), fontsDecoded]).finally(
    () => { app.mount("#app"); },
);
```

The engine warm's rejection is **swallowed** (`.catch(() => undefined)`) and mount proceeds unconditionally (`.finally`). `kf-engine.ts:39-43` only assigns `resolved` inside the success arm, so after a failed warm `resolved` is still `null`. `loadAnimationEngine` memoizes the *rejected* promise permanently (`load-engine.ts:123-124`: `enginePromise ??= import("./public")`), so no later call can recover.

App's setup then reaches, at line 218-220, before any lifecycle hook:

```ts
const currentAnimationGroup = shallowRef<AnimationGroup<any>>(
    markRaw(new (kfEngine().AnimationGroup)()),
);
```

`kf-engine.ts:49-56` throws:

> `kfEngine() read before warmKfEngine() resolved — await warmKfEngine() before app.mount() (demo/app/main.ts).`

Two compounding defects:

1. **Fatal, unrecoverable.** The throw is inside `setup()` of the root component, so `app.mount()` aborts. Combined with L-4 (no `errorHandler`) the page is blank — no dock, no skeleton, no message.
2. **The message misdiagnoses.** It names a *programmer* error ("await warmKfEngine() before app.mount()") for what is in fact a *network* error. main.ts **did** await; the await lost. An operator reading this in Sentry will go looking for a missing await that does not exist.

The fix shape is small and lives in main.ts, not App: propagate the warm failure into a boot-error render, or make `kfEngine()` distinguish "not yet warmed" from "warm failed".

**Falsifier:** show `warmKfEngine` retries, or that `loadAnimationEngine` de-memoizes on rejection, or that main.ts's `.catch` re-arms. *Checked:* `kf-engine.ts:39-43` caches only on success but `inflight ??=` retains the rejected promise, so `warmKfEngine()` is also permanently poisoned; `load-engine.ts:124` is a bare `??=`. Claim survives. The observation is `UNPROVEN-NEEDS-LIVE` (requires an offline/404 chunk); the mechanism is source-derived and complete.

---

### L-6 · MAJOR — dead `#tabs-trigger` slot on a property that exists nowhere

`App.vue:53-59`:

```vue
<template #tabs-trigger="slotProps">
    <component :is="sceneRef?.tabsTrigger" v-bind="slotProps" v-if="sceneRef?.tabsTrigger" />
</template>
```

`sceneRef` is typed `ShallowRef<SceneExposedApi | null>` (App.vue:209). `SceneExposedApi` (`sceneExposedApi.ts:16-34`) declares `facility`, `tabsContent`, `ribbonContent`, `headerLeft`, `superKey`, `autoPlays`, `isStarted` — **no `tabsTrigger`**. Tree-wide:

```
$ grep -rn "tabsTrigger" demo/
scenes/cube/CubeScene.vue:152:// former `tabsTrigger` guarded — the App supplies `matrix-controls` as an active
scenes/cube/CubeScene.vue:156:// `tabsTrigger` function (and its `defineExpose` entry) are therefore DELETED.
app/App.vue:55
app/App.vue:57
```

CubeScene *documents its own deletion*; App's consumption of it survived. Under a real SFC typecheck this is TS2339 on both lines — see L-3.

Note the second-order effect, which is why this is MAJOR and not MINOR: `EditorShell.vue:88-90` forwards `#tabs-trigger` to `AnimationControlsGroup` **unconditionally**, so the child always observes the slot as *provided* and can never fall back to its own default content for it. App's always-empty contribution is therefore not merely inert — it is one half of a two-file arrangement in which nothing can ever render into a declared slot, and nothing in the tree says so.

**Falsifier:** any scene `defineExpose`ing `tabsTrigger`, or an alternate `EditorShell` host that does. *Checked:* the grep above is tree-wide; `grep -rln "EditorShell"` yields 9 files of which `App.vue` is the only mounting host (the others are the barrel, main.ts, the shell binding, and injection consumers). The "playground" host referenced repeatedly in `EditorShell.vue:158-168` prose **does not exist in this tree**. Claim survives.

---

### L-7 · MAJOR — the "exactly ONE registry" exists twice, live, and App's render path reads both

`state/controlSurfaces.ts:144-149` states the invariant:

> **THE ONE SURFACE-METADATA REGISTRY.** Total over the ControlSurface alphabet — both docks and the in-panel strip resolve every tab's `{label,icon}` from HERE (proof:dfa-derived's "resolves from exactly ONE module" clause).

`components/instrument/surfaceTabs.ts` is a **verbatim second copy** of `ControlSurfaceTab`, `SURFACE_META` (all six rows), `extraTabsFrom`, and `dockCardinality`. It is not dead:

```
$ grep -rn "instrument/surfaceTabs" demo/
app/dock/ChromeDock.vue:21
components/instrument/transport/TransportDock.vue:237
```

App's own render path spans both copies **in one frame**:

- `App.vue:264` — `extraControlTabs` ← `machine.extraControlTabs()` ← `useSceneMachine.ts:317-318` `extraTabsFrom` ← **`@state` copy**.
- `App.vue:12` passes those objects to `ChromeDock` as `:extra-control-tabs`.
- `ChromeDock.vue:49-50` builds `BUILT_IN_CONTROL_TABS` from **`@components` copy**'s `SURFACE_META`, then `ChromeDock.vue:100` concatenates the two provenances into one array, and `ChromeDock.vue:126-134` feeds that mixed array to **`@components` copy**'s `dockCardinality`.

Today the copies are byte-identical, so nothing misrenders. That is precisely the hazard: the divergence is silent by construction and the failure mode is an *elision* decision (`controlLabelRedundant` at `surfaceTabs.ts:36-37` compares `tab.label` against the scene label) — i.e. a control silently vanishing from the dock, not an exception. Editing `SURFACE_META.spring.label` in `@state` alone changes App's `extraControlTabs` payload while leaving ChromeDock's redundancy comparand on the stale copy, flipping VERDICT #17's elision the wrong way.

This is the *fourth* copy historically: `controlSurfaces.ts:135-142` narrates killing three (`SCENE_SURFACE_TABS`, `BUILT_IN_TAB_META`, `ChromeDock`'s literal). The consolidation landed a new duplicate instead of a re-export.

**Contradicts lane-frontend F-5 by extension.** F-5 catalogued *two* re-export shims (one dead, one incoherent) totalling 5 lines. `surfaceTabs.ts` is a different and larger species: a 41-line **forked implementation** with two live consumers, and it should be added to the F-5 ledger row as its heaviest member.

**Falsifier:** show `@components/instrument/surfaceTabs` re-exports from `@state/controlSurfaces` rather than redeclaring. *Checked:* the file imports only `BUILT_IN_SURFACES` + `type ControlSurface` from `@state/controlSurfaces` (lines 1-4) and then **redeclares** the interface, the record, and both functions. Claim survives.

---

### L-8 · MAJOR — `cube` is both statically imported and lazily registered; the descriptor field is dead and the split is defeated

`App.vue:155` — a **static** import at the app root:

```ts
import CubeScene from "../scenes/cube/CubeScene.vue";
```

`scenes.ts:143` — the same module, registered as a code-split chunk:

```ts
component: lazyScene("cube", () => import("../../scenes/cube/CubeScene.vue")),
```

`App.vue:283-290` then guarantees the lazy wrapper is **never mounted**:

```ts
const activeSceneComponent = computed(() => {
    if (isHome.value || currentSceneId.value === "cube") return CubeScene;   // ← static, always
    return currentScene.value.component;                                      // ← lazy, other scenes only
});
```

Three consequences:

1. `scenes[0].component` (the `defineAsyncComponent` for cube) is **dead** — constructed at module init, never rendered. `SceneDescriptor.component` is `Component | undefined`, so the field cannot be typed away per-row.
2. `warmScene("cube")` — wired live at `App.vue:15` → `ChromeDock.vue:261` `@pointerenter` — fires a dynamic import for a module already in the entry graph. Harmless, but it is *stated* to be a chunk prefetch (`scenes.ts:109-117`) and it prefetches nothing.
3. The static edge pins `CubeScene` + `CubeTarget` + `MatrixEditor` + glass-ui `Popover`/`Button` into the entry chunk. Rolldown resolves the static/dynamic pair to one module and keeps it on the static (entry) side — so the *declared* split for cube does not exist. `vite.config.ts:301-306` names this exact class ("the exact eager-leak inv γ exists to prevent") and ships `KF_ANALYZE=1` to hunt it.

The static import is *defensible* — home renders `CubeScene` as its hero backdrop, so it is on the first-paint path by design. What is not defensible is keeping a lazy registration that documents the opposite, and a `warmScene` edge that pretends to warm it. One of the two must go: either drop `lazyScene("cube", …)` and register `component: CubeScene` directly, or drop the static import and let home await the chunk.

**Falsifier:** a `KF_ANALYZE=1` chunk dump showing `CubeScene` in its own chunk and absent from the entry. *Not run* (no build permitted under lane law) — so the *bundling* half is `UNPROVEN-NEEDS-LIVE`. The **dead descriptor field** and the **no-op warm** halves are fully source-derived and stand regardless of how rolldown chunks it.

---

### L-9 · MINOR — `headerLeft` is a dead contract member; ~33 lines unreachable; brand.css rationale stale

`sceneExposedApi.ts:27` declares `headerLeft?: () => VNode`. `CubeScene.vue:118-150` produces one — a 33-line `h()` tree building the ppmycota hover-card. `EditorShell.vue:18` slots it: `<slot name="header-left"></slot>`.

**No host ever fills it.** App.vue's `<EditorShell>` (lines 28-102) supplies `#backdrop`, `#start-screen`, `#tabs-trigger`, `#tabs-content`, `#ribbon-content`, `#target` — not `#header-left`. Tree-wide:

```
$ grep -rn "header-left\|headerLeft" demo/
scenes/cube/CubeScene.vue:118          (producer)
scenes/cube/CubeScene.vue:252          (defineExpose entry)
app/scene/sceneExposedApi.ts:6,27      (contract)
components/instrument/shell/EditorShell.vue:18   (slot)
```

Producer, contract, and slot all present; consumer absent. Since App is the only `EditorShell` host (see L-6's falsifier check), the CubeScene hover-card is unreachable.

Chained staleness in App's own first comment, `App.vue:108-110`:

> a single non-scoped partial is the smallest shared scope for every brand-mark consumer **App.vue mounts (header logo, CubeScene hover-card logo, CubeTarget cube face)**.

App.vue's template carries **no** `.ppmycota-*` class — there is no "header logo" in App. And the "CubeScene hover-card logo" is the unreachable one. `styles/brand.css:2-7` repeats the same three-consumer claim. The *actual* live consumers are `CubeTarget.vue:87` (`ppmycota-logo-lg`) and `MbabbMenu.vue:30` (`ppmycota-logo-sm`).

**The import itself is correct and should stay** — `MbabbMenu`'s mark renders inside a *portalled* `DropdownMenuContent`, so a scoped rule could not reach it; a non-scoped partial at the app root is the right home (see S-E). Only the rationale is wrong, and it is wrong in a way that would mislead the next person deciding whether the import can be dropped.

**Falsifier:** any `#header-left` template, or an `App.vue` element carrying a `ppmycota-*` class. *Checked:* both greps above are tree-wide; App.vue read whole. Claim survives.

---

### L-10 · MINOR — the `autoPlays` branch is inert and its docblock asserts the opposite

`useSceneMachineShellBinding.ts:200-209` (reached from App via the `onSceneResolved` / `sceneRef` watch wiring at `App.vue:90,322-330`):

```ts
// Auto-play: a raw-rAF preview scene that exposes `autoPlays: true`
// (easing) plays on EVERY entry …
const autoPlays = sceneRef.value?.autoPlays === true;
if (!isHome.value && (autoPlays || autoPlayNext.value)) {
    machine.dispatch({ type: "PLAY" });
}
```

Every producer in the tree declares `false`:

```
$ grep -rn "autoPlays" demo/ --include="*.vue"
scenes/easing/EasingScene.vue:126:    autoPlays: false,
scenes/spring/SpringScene.vue:194:    autoPlays: false,
```

`autoPlays === true` is unsatisfiable. The docblock names easing as the exemplar and easing is one of the two `false`s. So: `SceneExposedApi.autoPlays` (`sceneExposedApi.ts:31`) is a dead contract member, the `||` left arm is dead, and only App's own `autoPlayNext` gesture flag (`App.vue:221`) can reach `PLAY` here.

Given `useSceneMachine.ts:85-98`'s explicit **cold-boot-starts-paused / gesture-gated-playback** policy (K.W0 S4-C), the `false`s are almost certainly the *intended* end state and the branch is the residue. That makes it dead code plus a comment that actively misdescribes shipped behaviour to the next reader.

**Falsifier:** a scene exposing `autoPlays: true`, or a runtime write to `sceneRef.value.autoPlays`. *Checked:* the grep is tree-wide across `.vue` and `.ts`; the only non-declaration hits are the reader and the docblock. Claim survives.

---

### L-11 · MINOR — `setActiveSurfaces`'s documented idempotence is structurally impossible

`App.vue:248-256`:

```ts
const derivedSurfaces = computed(() =>
    isHome.value ? [] : surfacesFor(sceneRef.value?.facility, storedControls.value.selectedAnimation ?? undefined),
);
watchEffect(() => machine.setActiveSurfaces(derivedSurfaces.value));
```

`useSceneMachine.ts:134-135` documents the sink:

> The App's single write of the derived surface set (T.B2). **Idempotent — a re-derivation to the same set is a no-op (ref equality on the array).**

`controlSurfaces.ts:95` documents the source:

> Deduplicated, order-preserving. **Returns a fresh array per call.**

A fresh array is never `Object.is`-equal to the previous one. `setActiveSurfaces` (`useSceneMachine.ts:136-138`) is a bare `activeSurfaces.value = surfaces`, so **every** recomputation of `derivedSurfaces` mutates `activeSurfaces`, invalidating `machine.controlSurfaces` (App.vue:207 → `EditorShell :has-control-surfaces`, App.vue:35) and `machine.extraControlTabs()` (App.vue:264 → ChromeDock's `allControlTabs` → `controlZoneKind` → `dockCardinality` → the whole dock control zone). Also note `App.vue:248`'s `isHome` arm returns a **new `[]` literal** each evaluation for the same reason.

The cost is small (the recompute chain is pure and the arrays are ≤6 elements). The defect is that a load-bearing docblock asserts a property the code cannot have, and a future reader will trust it when reasoning about whether `watchEffect` here is safe to broaden.

**Falsifier:** show `setActiveSurfaces` compares element-wise, or that `surfacesFor` memoizes. *Checked:* `useSceneMachine.ts:136-138` is a bare assignment; `controlSurfaces.ts:107-126` allocates `base`, `channelFacets`, `facilityFacets`, `all` and returns `all.filter(...)` — four fresh arrays per call, no cache. Claim survives.

---

### L-12 · MINOR — `storedControls` is a `computed` whose getter writes persisted global state

`App.vue:229`:

```ts
const storedControls = computed(() => getStoredAnimationGroupControlOptions(currentSuperKey.value));
```

`getStoredAnimationGroupControlOptions` is not a pure read. `controlOptionsStore.ts:76-99`:

```ts
if (!animationGroupsControlOptionsStore.value[superKey]) {
    animationGroupsControlOptionsStore.value[superKey] = { …structuredClone(defaults), selectedControl: defaultControlSurfaceFor(superKey) };
}
…
controls.keyframeControls ??= structuredClone(defaults.keyframeControls);
```

So evaluating this computed can **create a bucket in a `useStorage`-backed reactive store**, which in turn writes `localStorage`. Because the getter both *reads* `store.value` and *writes* `store.value[superKey]`, the computed self-invalidates on its own first evaluation for each new `superKey` — it settles on the second read (the bucket now exists), so there is no loop, but the write happens **during a reactive read**, potentially inside App's render effect.

Every other consumer in the tree calls this function in a *statement* position where the effect is honest — `CubeScene.vue:62`, `AnimationControlsGroup.vue:176`, `MatrixEditor.vue:113`, `useSceneMachineShellBinding.ts:105`, `useSceneMachineRouterBinding.ts:126`. App is the only site that hides it behind a `computed`.

**Falsifier:** show the store bucket is always pre-seeded before any App read, making the write branch unreachable from the computed. *Checked:* `useSceneMachineRouterBinding.ts:64` runs `gcAndMigrateSceneKeyspace` at boot, which **prunes and migrates** but does not create buckets for scenes never visited; `defaultControlSurfaceFor` exists precisely to seed on first touch. First navigation to a never-visited scene therefore takes the write branch from inside App's computed. Claim survives. Severity is MINOR because the settle is provably one-shot per superKey.

---

### L-13 · MINOR — `sceneSwapStyle` is dead weight on VT engines yet still emits a stacking-context transform

`useSceneSwap.ts:35-51`:

```ts
const vtOwnsMotion = supportsViewTransitions();
const sceneOpacity = ref(1);
const sceneSwapStyle = computed(() => ({
    opacity: sceneOpacity.value,
    transform: `scale(${0.97 + 0.03 * sceneOpacity.value})`,
}));
if (!vtOwnsMotion) { /* the only writer of sceneOpacity */ }
```

Where `document.startViewTransition` exists (Chrome/Edge — the demo's primary target, and the engine the whole `useSceneTransition` dogfood is written for), `sceneOpacity` has **no writer**. `sceneSwapStyle` is permanently `{ opacity: 1, transform: "scale(1)" }` and is bound inline at `App.vue:88`.

`transform` with any value other than `none` creates a stacking context and a containing block for fixed-position descendants. This sits directly against App's own `<style>` block, `App.vue:360-378` ("T.G1 — THE BLUR DE-LAYER, the perf keystone"), which removed `contain: paint` from this exact element after CDP sampling measured it *neutral-to-worse*, and which now asserts the host "carries NO falsified paint-wall". An unconditional `transform` is the same species of unexamined layer hint, applied from the *other* side of the file, and the two comments do not know about each other.

The honest shape is for `useSceneSwap` to return `undefined` when `vtOwnsMotion` (and for App to bind `:style="sceneSwapStyle"` with the `undefined` no-op), so the VT path emits no inline style at all.

**Falsifier:** (a) show a second writer of `sceneOpacity` — *checked, `useSceneSwap.ts` read whole, the only assignment is line 48 inside the `!vtOwnsMotion` arm*; (b) show a `position: fixed` descendant of `.scene-host` that the containing-block change would break — *checked and NOT found*: `grep -rn "position: fixed" demo/scenes/` is empty, and the only fixed stage (`AnimationControlsGroup.css:134,180`) is an **ancestor** of the `#animation-content` slot, not a descendant. So the containing-block hazard is **latent, not live** — the claim is scoped to the stacking context + the dead-binding, and I do not assert a rendering bug. (c) A CDP layer trace showing no compositing delta would reduce this to INFO — `UNPROVEN-NEEDS-LIVE`.

---

### L-14 · MINOR — test instrumentation ships to the production DOM, asymmetric with its own DEV twin

`useSceneTransition.ts:76-83`:

```ts
if (import.meta.env.DEV && typeof window !== "undefined") {
    (window as unknown as { __lastVtTypes?: string[] }).__lastVtTypes = types;
}
sceneHost.value?.setAttribute("data-last-vt-type", types[0] ?? "");
```

Two writes of the same fact, four lines apart, for the same gate ("the test hook the runtime gate reads"). The first is `import.meta.env.DEV`-guarded and DCE'd from the production bundle; the second is not, so every production scene swap stamps `data-last-vt-type="forward"` onto `.scene-host` (App.vue:84-89). `vite.config.ts:186` already drops `console`/`debugger` in the library build, and `main.ts:57-62` shows the codebase's own idiom for zero-byte dev-only instrumentation.

Attribute writes also invalidate style/`attr()` matching on an element that carries `view-transition-name`; harmless at this cadence, but it is one more DOM mutation inside the VT dispatch window for no production benefit.

**Falsifier:** show a production consumer of `data-last-vt-type` (a CSS attribute selector, an analytics read, a deployed e2e). *Checked:* `grep -rn "data-last-vt-type" demo/` returns only this write site — no CSS selector, no reader. Claim survives.

---

### L-15 · MINOR — App's `#ribbon-content` projection reaches a second `TypeError` site, and the backing type omits a stored field

App.vue:65-71 projects the active scene's `ribbonContent` render function into `EditorShell`'s ribbon slot. For cube that is `CubeScene.vue:183-202`, whose "Fixed/Free" button does:

```ts
onClick: () => { storedControls.matrixOptions.fixed = !storedControls.matrixOptions.fixed; },   // :194
…
!storedControls.matrixOptions?.fixed ? h(Lock, …) : h(LockOpen, …),                              // :197  ← optional-chained
```

Line 194 dereferences unconditionally; lines 197-198 optional-chain the same expression three lines later. `matrixOptions` is **optional** in the type (`controlOptionsStore.ts:26`: `matrixOptions?: { fixed: boolean }`) and is **absent** from `defaultStoredAnimationGroupControlOptions` (`controlOptionsStore.ts:36-50`). CubeScene seeds `ppMode` (`:63`) but not `matrixOptions`.

The only seeder is `MatrixEditor.vue:120` (`storedControls.matrixOptions ??= defaultMatrixOptions`), which runs only when `MatrixEditor` mounts — i.e. when the `tabs-content` panel is rendered. The ribbon button and the tabs panel share a gate (`selectedControl === "matrix-controls"`), which is why this is MINOR and not a second BLOCKER: on the ordinary path MatrixEditor's setup wins the race. **UNPROVEN-NEEDS-LIVE** whether a collapsed controls pane (App.vue:9, `storedControls.isControlsPanelOpen === false`) can render the ribbon while suppressing the panel — if it can, line 194 throws on a fresh bucket.

Independently and *provably* wrong: `MatrixEditor.vue:38,64,71,77,82,87` read and write `storedControls.matrixOptions.selectedMatrixCell`, a field the type does not declare. Under a real SFC typecheck that is TS2339 ×6. Another L-3 escapee.

**Falsifier:** for the crash — show MatrixEditor always mounts before the ribbon is interactive under every pane state. For the type — show a wider declaration of `matrixOptions`. *Checked:* `controlOptionsStore.ts:26` is the only declaration and it is `{ fixed: boolean }`. The type half survives outright.

---

### L-16 · INFO — App writes a fact into global state and reads the same fact back out

`App.vue:207` reads `machine.controlSurfaces.value`; `App.vue:248-256` computes `derivedSurfaces` and feeds it to `machine.setActiveSurfaces`. App is simultaneously the **sole writer** and a **reader** of the same value, laundered through `createGlobalState`.

The round trip is *justified for the dock* — ChromeDock's DFA projection and `AnimationControls`' `selectedControlSurface` both need it, and centralising in the machine is right. It is not justified for App's own two uses: `controlSurfaces.length > 0` (App.vue:35) and `extraControlTabs` (App.vue:264) could read `derivedSurfaces` directly.

I checked the tick-lateness concern and it **does not hold**: `watchEffect`'s default `flush: "pre"` schedules the write ahead of App's own render job for the same instance uid, so `controlSurfaces` is fresh within the same flush. No defect — recorded as an altitude note only.

**Falsifier:** an ordering trace showing App renders with a stale `controlSurfaces` after `derivedSurfaces` changed. Not attempted; the scheduler ordering above is the reason I did not raise this above INFO.

---

### L-17 · INFO — inline template mutation contradicts the rule its own sibling composable writes down

`App.vue:16`:

```vue
@toggle-controls-panel="storedControls.isControlsPanelOpen = !storedControls.isControlsPanelOpen"
```

`useSceneMachineShellBinding.ts:261-267`, for the immediately adjacent concern:

```ts
function onStartStateChange(started: boolean) {
    // Write via handler (not inline template) so the assignment is scheduled
    // against `sceneRef.value` at call time, not a stale template closure.
    …
}
```

The stated rationale (stale closure over a `shallowRef`) does not transfer verbatim — `storedControls` is a `computed` whose `.value` is re-read on each template evaluation. But App.vue:307-310 already has `onDockSelectControl` as the *handler-shaped* precedent for the sibling control, so the file is internally inconsistent about the same rule for the same widget.

**Falsifier:** demonstrate the inline form re-reads a stale bucket after a scene switch. I could not construct one — recorded as consistency, not correctness.

---

### L-18 · INFO — a deliberate TDZ-lazy closure resolves a setup-order cycle

`App.vue:322-330` passes `getRunSceneSwitch: () => runSceneSwitch` into `useSceneMachineShellBinding`, closing over a `const` declared six lines *later* at `App.vue:336`. The comment at `App.vue:316` names it ("read lazily … resolving the cyclic reference"), and `useSceneMachineShellBinding.ts:30-32` documents the contract.

It is correct **today** because nothing in `useSceneMachineShellBinding` invokes `getRunSceneSwitch()` synchronously during setup: the two `watch` calls (`:217`, `:233`) are non-immediate, `useDocumentVisibility`'s watch (`:283`) is non-immediate, and the only caller is `onPlayStateChange` (`:254`), an event handler. Adding `{ immediate: true }` to any of those watches, or dispatching from setup, converts it into a `ReferenceError: Cannot access 'runSceneSwitch' before initialization` at boot.

The cycle is real (the binding owns `switchScene`, which `useSceneTransition` wraps, whose product the binding then needs) and the thunk is a legitimate break. A cheaper guard would be to hoist `runSceneSwitch` above the binding call by inverting the two, since `useSceneTransition` only needs `switchScene` — which the binding could expose from a separately-constructed object.

**Falsifier:** an immediate/synchronous call path in the binding. *Checked, whole file:* none. Claim is INFO by construction.

---

## 3. SUPERLATIVES (L-18 runs both ways)

### S-A · The `<Suspense>` shape encodes a real regression as a structural constraint

`App.vue:73-100` + `useSceneSwap.ts:17-25`. A `<Transition mode="out-in">`/`<KeepAlive>` wrapping a keyed `<Suspense>` over a `defineAsyncComponent` *never triggered the loader* — amiga/square/easing/spring shipped a blank viewport (B.W3's headline blocker). Rather than fixing it with a workaround, the fade was moved to a **sibling** `<div>`'s style binding so the async boundary is a bare `<Suspense>` that cannot be re-wrapped without deleting the comment that says why. Both files carry the mechanism, not just the verdict. This is what defensive documentation is supposed to look like, and it is rare.

**Counter-falsifier** (what would demote this): show the constraint is unnecessary on current Vue — i.e. that wrapping now works. Even then the record of *why it was avoided* retains its value.

### S-B · The route reconcile is a fixed point, not a debounce — and it discriminates its errors

`useSceneMachineRouterBinding.ts:1-20, 75-113`. ONE reader (`router.afterEach` → `NAVIGATE`), ONE writer (`watch(activeScene)` → `push`), and an **activeScene-equality echo guard** that kills the route storm at the fixed point. The header says so explicitly: "NOT by debouncing harder."

The detail that earns the superlative is `:98-111`:

```ts
router.push({ name: scene, query }).catch((e) => {
    writerEcho = false;
    if (!isNavigationFailure(e, NavigationFailureType.duplicated | NavigationFailureType.aborted)) throw e;
});
```

It resets the echo generation *before* discriminating, and it **re-throws** anything that is not an expected navigation outcome. The overwhelmingly common idiom in the wild is a blanket `.catch(() => {})`, which eats broken route guards forever. This does not.

### S-C · The `SpringProgress` consumption is a correct, minimal engine dogfood

`useSceneSwap.ts:44-51`:

```ts
const sceneSwapSpring = new SpringProgress({ respectReducedMotion: true });
watch(activeSceneKey, () => {
    sceneSwapSpring.reset(0);
    sceneSwapSpring.play((v) => { sceneOpacity.value = v; });
    sceneSwapSpring.target = 1;
});
```

The ordering is load-bearing and correct against the engine source I read: `reset(0)` settles and stops the loop (`progress.ts:374-391`); `play(cb)` binds the frame callback idempotently without spawning a second loop (`managed-play.ts:32-38`); `target = 1` un-settles and **auto-resumes** via `reseatTarget`'s `if (this._onFrame) springStartLoop(this)` (`progress.ts:236-237`). Repeated scene swaps therefore neither stack rAF loops nor leak one — `managedPlay` auto-stops on settle. **I opened this expecting a teardown leak (no `dispose()`, no `stop()`, app-lifetime instance) and the engine contract killed the claim.** Recorded here rather than shipped as a defect.

`respectReducedMotion: true` routes PRM through the engine's own authority (`progress.ts:217-239`) instead of a demo-side `matchMedia` — the correct dogfood direction for a library's own demo.

### S-D · `useSceneTransition` is a disciplined VT consumer

`useSceneTransition.ts:52-95`. Three things it gets right that most VT code does not:

1. The dispatch wraps **only** the synchronous key mutation, never the async `<Suspense>` loader — the single most common VT misuse.
2. Direction is derived from `sceneIndex` (`scenes.ts:210-216`), the *one* ordered-index seam, rather than a second hard-coded order list.
3. **Focus is routed on `finished`** (`:89-91`) to a `tabindex="-1"` host, because View Transitions morph layout but do not manage focus. The a11y consequence of a VT is almost universally ignored; this handles it, and `App.vue:381-386` then suppresses the focus ring for the programmatic-only case.

### S-E · The brand-mark CSS scope decision is correct for the right reason

`App.vue:107-110` + `styles/brand.css:1-13`. `MbabbMenu`'s brand mark renders inside a **portalled** `DropdownMenuContent`; a `<style scoped>` rule could not reach it, and a `[data-v-*]` attribute would change specificity. A non-scoped partial imported once at the app root is the smallest correct shared scope, and `brand.css:9-12` further explains why the `--ppmycota-primary` *token* deliberately stays in global `:root` while the *rules* colocate. This is a genuinely subtle call, made correctly, with the reasoning preserved. (Its consumer *list* is stale — L-9 — but the decision is right.)

### S-F · `useMonacoCancellationGuard` is a model narrow global handler

`useMonacoCancellationGuard.ts:22-33`. It matches one exact signature (`name`/`message === "Canceled"`), guards both `unhandledrejection` and `error`, rides `@vueuse/core` `useEventListener` for scope-managed teardown rather than a hand-rolled add/remove pair, and its docblock **enumerates the error classes it deliberately does not swallow** (`AnimationOptionError`, the `_gen` crash, the parse fingerprint). Compare with the usual `window.onerror = () => true`. The one thing missing is the *fatal* counterpart — see L-4/L-5.

---

## 4. KILLED (claims that did not survive their own falsifier)

Recorded so the next auditor does not re-open them.

| claim | why it died |
|---|---|
| `useSceneSwap` leaks a rAF loop (spring never `stop()`/`dispose()`d, app-lifetime) | `managed-play.ts:32-38` + `progress.ts:475-483`: `managedPlay` is idempotent and auto-stops on settle. No leak. → became **S-C**. |
| `transform: scale(1)` on `.scene-host` breaks `position: fixed` descendants | No scene uses `position: fixed`; the only fixed stage (`AnimationControlsGroup.css:134,180`) is an **ancestor**. Hazard is latent, not live. → survives only as the narrowed **L-13**. |
| `controlSurfaces` reads one tick late behind `derivedSurfaces` | `watchEffect` default `flush: "pre"` runs ahead of the same instance's render job. Settles in one flush. → demoted to **L-16 INFO**. |
| `<component :is="sceneRef.ribbonContent" v-bind="slotProps">` cannot pass props to a bare function | Vue 3: a functional component with no `props` option receives the full attrs object as its first argument. Works as designed; the render-fn slot bridge (`sceneExposedApi.ts:5-10`) is sound. |
| `provide(CONTROLS_PANE_HOVER_KEY, dockHoveredRef)` is dead — App never reads it | Read by `ControlsPaneWrapper/usePaneHover.ts:35`. Live. |
| `getRunSceneSwitch` thunk will TDZ-throw | No synchronous call path in the binding. → **L-18 INFO**. |
| App.vue exceeds Goldilocks module size | 387 lines, of which ~150 are executable; the router binding (150), shell binding (293), VT (95), and swap (54) are all extracted into named single-concern modules under `app/scene/` and `app/transition/`. The `proof:app-is-shell` intent **holds structurally**. No finding. |

---

## 5. Corpus reconciliation

| hitherto id | this challenge |
|---|---|
| **F-1** (lane-frontend §0/§2) — glass-ui phantom dep | **Confirmed unchanged at HEAD `8281638c`** and escalated for this component: `App.vue:145` is the app-**root** import, so `npm ci` fails at the first module of the first component. → **L-2**. |
| **F-5** (lane-frontend §7.3) — re-export shims, 1 dead + 1 incoherent, 5 lines | **Extended, not contradicted.** `components/instrument/surfaceTabs.ts` is a heavier member of the same class: a **41-line forked implementation** (not a re-export) of `@state/controlSurfaces`'s `SURFACE_META`/`extraTabsFrom`/`dockCardinality`, with **two live consumers**, violating a stated `proof:dfa-derived` "exactly ONE module" clause that App's own render path straddles. Recommend adding it as F-5's primary row. → **L-7**. |
| **S-6** (lane-frontend §5) — `App.skeleton` → glass-ui `Skeleton`, AMBER, 101 lines | Read whole; **no library-axis defect found**. It honors `prefers-reduced-motion` (`:96-101`), sets `role="status"`/`aria-busy`/`aria-label`, and uses `will-change: background-position` on a `background-position` animation (correct pairing). The S-6 replace-vs-keep question is a *design* call, not a correctness one — this axis has nothing to add against it. |
| **§1** (lane-frontend) — "68 engine-consuming files; the demo is the library's own proving ground" | Corroborated at the App layer: `useSceneSwap`'s `SpringProgress` (S-C) and `useSceneTransition`'s `viewTransition` (S-D) are both **correct, minimal** engine consumption. The one engine-consumption defect is not misuse of an API but a **boot-fragility** in the accessor seam → **L-5**. |
| **§8** (lane-frontend) — the self-alias / glass-ui↔keyframes cycle | Not re-litigated; no App-specific bite found beyond L-2. |
| lane-library — parse seams | No overlap: App reaches no parser surface. |

---

## 6. Recommended order

1. **L-1** — one-line fix (`stored.ppMode = !(stored.ppMode ?? false)`), live crash, zero coverage.
2. **L-3** — add `vue-tsc` + a `check:demo` script to the merge gate. This is what prevents L-1/L-6/L-15's *class* from recurring; land it before anything else touches an SFC. Expect a large initial red.
3. **L-2** — declare `@mkbabb/glass-ui: 7.0.0`, regenerate the lock. Nothing is reproducible until this lands (already lane-frontend's rec #1).
4. **L-5 + L-4** — the boot/chunk error posture, as one motion: propagate the warm failure, add an `app.config.errorHandler` and an `errorComponent`/`onError` on `defineAsyncComponent`.
5. **L-7** — delete `components/instrument/surfaceTabs.ts`, repoint `ChromeDock.vue:21` and `TransportDock.vue:237` at `@state`.
6. **L-6, L-9, L-10** — the dead-contract sweep: drop `#tabs-trigger`, resolve `headerLeft` (fill the slot or delete producer + contract + slot), resolve `autoPlays` (delete or make a producer true). Cheap, and each removes a false statement from the record.
7. **L-8, L-11, L-12, L-13, L-14, L-15** — individually landable.
