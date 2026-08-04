claude-opus-5[1m]

# CHALLENGE · `App` · axis **L (LIBRARY)** — pass 2 (supersedes pass 1 in place)

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/app/App.vue` (387 L)
**Tree HEAD** `8281638c fix(demo-shell): provide tooltip context for the routed control group`
**Mode** static, read-only. No installs, no dev server, no browser tooling. Live-only claims are
marked **UNPROVEN-NEEDS-LIVE** and deferred to the SS-13 visual audit.
**Posture** the component is assumed DEFECTIVE until the tree proves otherwise. Every claim carries
its own falsifier and the result of running it. Claims that died to their falsifier are in §5
(Killed) rather than shipped.

### On this being pass 2

A pass-1 challenge existed at this path (18 defects · 3 BLOCKER · 6 superlatives). I did **not**
inherit it. I read App.vue and its import closure independently first, then read pass 1 and
**re-tested every one of its unique claims against the tree**. All 18 survive; none is withdrawn.
This file therefore *carries* pass 1 rather than replacing it, and adds:

- **8 new defects** (N-marked below) that pass 1 did not raise;
- **2 upgrades** — pass 1's `L-8` bundling half was marked UNPROVEN-NEEDS-LIVE ("no build permitted");
  I closed it from the **pre-existing on-disk artifact** without running a build. Pass 1's `L-3`
  falsifier left one thread open ("a `Makefile` exists … the remaining place to look"); I read it,
  and it does not typecheck SFCs — the BLOCKER stands.
- **2 new superlatives** (S-G, S-H).

Pass-1 ids are preserved in the `was` column so the ledger stays traceable.

**Read closure** (whole-file):
`App.vue` · `App.skeleton.vue` · `app/main.ts` · `app/dock/{index.ts,ChromeDock.vue,MbabbMenu.vue}` ·
`app/lifecycle/useMonacoCancellationGuard.ts` · `app/scene/{scenes.ts,sceneExposedApi.ts,router.ts,
useSceneMachineRouterBinding.ts,useSceneMachineShellBinding.ts}` ·
`app/transition/{useSceneSwap.ts,useSceneTransition.ts}` · `demo/kf-engine.ts` ·
`demo/state/{useSceneMachine.ts,controlSurfaces.ts,controlOptionsStore.ts}` ·
`demo/components/instrument/{surfaceTabs.ts,transport/injectionKeys.ts,shell/index.ts,
shell/EditorShell.vue,shell/HeroAurora.vue}` · `demo/composables/scene-facility/index.ts` ·
`demo/scenes/cube/{CubeScene.vue,cubeKeys.ts,matrix-editor/MatrixEditor.vue}` · `demo/styles/brand.css` ·
`src/animation/{index.ts,load-engine.ts,group/group.ts,physics/managed-stepper.ts,
physics/spring/managed-play.ts}` · `package.json` · `Makefile` · `tsconfig.json` ·
`tsconfig.lib.json` · `.github/workflows/ci.yml` · `dist/gh-pages/assets/` (artifact read, not built).

**Hitherto corpus folded, not re-invented:** `formation/keyframes/lane-frontend.md` (F-1, F-5, S-6, §1,
§8) and `formation/keyframes/lane-library.md` (§3.3, §4). Reconciliation table in §6. One lane row is
**extended** (F-5), none contradicted.

**Tally — 26 defects (3 BLOCKER · 5 MAJOR · 13 MINOR · 5 INFO) · 8 superlatives.**

---

## 0. Headline

| id | was | sev | claim | anchor |
|---|---|---|---|---|
| **L-01** | L-1 | **BLOCKER** | `togglePpMode` dereferences `.value` on a plain object → live `TypeError` on click. App is the sole host **and** sole `super-key` supplier. | `MbabbMenu.vue:99-101` |
| **L-02** | L-2 | **BLOCKER** | App's root import resolves through an undeclared, unlocked package. `npm ci` cannot build the app root. (lane-frontend **F-1**, escalated to root-of-graph.) | `App.vue:145` |
| **L-03** | L-3 | **BLOCKER** | **No SFC typecheck exists anywhere** — not in `check`, not in CI, not in the Makefile. App.vue's script *and* template are ungated. | `package.json:53`, `ci.yml:40`, `Makefile` |
| **L-04** | L-4 | MAJOR | No error boundary. A failed scene chunk parks the skeleton forever; the docblock claiming `<Suspense>` surfaces it is false. | `App.vue:90-99`, `scenes.ts:120-122` |
| **L-05** | L-5 | MAJOR | A swallowed boot failure becomes a fatal throw in App's setup, with a message that misdiagnoses the cause. | `main.ts:49-53` → `App.vue:218-220` |
| **L-06** | L-6 | MAJOR | Dead `#tabs-trigger` slot binding a property on no scene and no interface. | `App.vue:53-59` |
| **L-07** | L-7 | MAJOR | The "exactly ONE registry" exists **twice**, live; App's render path reads both copies in one frame. | `surfaceTabs.ts` vs `controlSurfaces.ts:145` |
| **L-08** | L-8 | MAJOR | `cube` is statically imported **and** lazily registered. Descriptor field dead, warm is a no-op, split defeated — **now CONFIRMED from the built artifact.** | `App.vue:155` vs `scenes.ts:143` |
| **L-09** | L-9 | MINOR | `headerLeft` is a dead contract member; ~33 lines of `h()` unreachable; the brand-mark consumer list is stale. | `CubeScene.vue:118-150` |
| **L-10** | L-10 | MINOR | The `autoPlays` branch is unsatisfiable — every producer declares `false` — and its docblock asserts the opposite. | `useSceneMachineShellBinding.ts:200-207` |
| **L-11** | L-11 | MINOR | `setActiveSurfaces`'s documented idempotence is structurally impossible against `surfacesFor`. | `useSceneMachine.ts:134-135` |
| **L-12** | L-12 | MINOR | `storedControls` is a `computed` whose getter **writes** persisted global state. | `App.vue:229` |
| **L-13** | L-13 | MINOR | `sceneSwapStyle` is provably constant on VT engines yet still emits a stacking-context `transform`. | `useSceneSwap.ts:38-42` |
| **L-14** | L-14 | MINOR | Test instrumentation ships to the production DOM, asymmetric with its own DEV-gated twin two lines above. | `useSceneTransition.ts:76-83` |
| **L-15** | L-15 | MINOR | App's `#ribbon-content` projection reaches an unconditional deref of an optional field; the backing type omits a field the tree stores at 7 sites. | `App.vue:65-71` → `CubeScene.vue:194` |
| **L-16** | L-16 | INFO | App writes a fact into global state and reads it back, in the same setup. | `App.vue:207` vs `:248-256` |
| **L-17** | L-17 | INFO | Inline template mutation contradicts the rule its own sibling composable writes down. | `App.vue:16` |
| **L-18** | L-18 | INFO | A deliberate TDZ-lazy closure resolves a setup-order cycle; safe today, unguarded tomorrow. | `App.vue:329,336` |
| **L-19** | **NEW** | MINOR | A **second, provable** type error under L-03: a `readonly` array is bound to a mutable `string[]` prop (TS4104). | `App.vue:11` → `ChromeDock.vue:71` |
| **L-20** | **NEW** | MINOR | `SceneDescriptor.showStartScreen` / `.gridBackground` have **zero consumers** — the exact drift class `scenes.ts` congratulates itself for killing. | `scenes.ts:91-92,133` |
| **L-21** | **NEW** | MINOR | Three nested `TooltipProvider`s with **divergent** delay configs — a 7× timing split across one shell. | `App.vue:3` |
| **L-22** | **NEW** | MINOR | `"cube"` hard-coded 3× against a declared single-source id, in a file that imports `HOME_SCENE_ID` correctly. | `App.vue:284,288,292` |
| **L-23** | **NEW** | MINOR | `AnimationGroup<any>` at App's widest type, propagated into three downstream contracts. | `App.vue:218` |
| **L-24** | **NEW** | MINOR | The `<style scoped>` block is 38 lines carrying **2 declarations**; ~20 narrate a property that no longer exists. | `App.vue:350-387` |
| **L-25** | **NEW** | INFO | Two template-ref idioms six lines apart in one setup block. | `App.vue:209,213` |
| **L-26** | **NEW** | INFO | The two consumers of `CONTROLS_PANE_HOVER_KEY` inject with **different** defaults. | `ChromeDock.vue:159` vs `usePaneHover.ts:35` |

Superlatives **S-A**…**S-H**, §4.

---

## 1. BLOCKERS

### L-01 · `togglePpMode` dereferences `.value` on a plain object — live crash

`App.vue:20-24` mounts `MbabbMenu` in `ChromeDock`'s `#items` slot and is the **sole** supplier of
its `super-key`:

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

`getStoredAnimationGroupControlOptions` is declared
`(...) => StoredAnimationGroupControlOptions` (`controlOptionsStore.ts:66-70`) and returns the bucket
element itself (`:86-96` — `store.value[superKey]` narrowed and returned). There is no `value` member
on that type and none on the object. `stored.value` is `undefined`; the assignment on the same line
throws:

> `TypeError: Cannot set properties of undefined (setting 'ppMode')`

**Re-verified at HEAD.** I enumerated all 11 call sites in the tree; this is the **only** one that
reaches for `.value`:

```
CubeScene.vue:62 · MatrixEditor.vue:113 · SequenceScene.vue:30 · useSpringDemo.ts:66
useSceneMachineRouterBinding.ts:126 · useSceneMachineShellBinding.ts:105
AnimationControlsGroup.vue:176 · ChannelControls.vue:274 · useKeyframesState.ts:18   ← plain object, all
App.vue:229   computed(() => getStored…(…))                                          ← `.value` is the COMPUTED's, correct
MbabbMenu.vue:99                                                                     ← the defect
```

App.vue:229 is the likely contagion source: `storedControls.value.selectedControl` (`App.vue:274`) is
correct *because `storedControls` is a `computed`*. The extraction into `MbabbMenu` (its own header
cites `S.D1 · a23 F2`) carried the `.value` across without the wrapper.

**Blast radius.** Clicking the ppmycota row in the @mbabb dock menu. `ppMode` is shipped —
`CubeScene.vue:19` passes `:pp-mode="storedControls.ppMode ?? false"` to `CubeTarget`; this toggle is
its only writer. Zero coverage: `grep -rn "ppMode\|MbabbMenu" test/ scripts/` → no output.

**Falsifier.** Show `getStoredAnimationGroupControlOptions` can return a ref-like — a `useStorage`
bucket that is itself a `Ref`, or a Proxy synthesising `value`. *Ran it:* `controlOptionsStore.ts:86-96`
indexes `store.value[superKey]` and returns that element directly; `useStorage`'s deep reactivity
wraps the bucket in a reactive Proxy, which does not synthesise a `value` key. **Claim survives.** The
crash *observation* is UNPROVEN-NEEDS-LIVE; the mechanism is fully source-derived.

---

### L-02 · App's root import resolves through a phantom dependency

```ts
App.vue:145  import { TooltipProvider } from "@mkbabb/glass-ui/tooltip";
```

This is the **outermost element of the entire application** (`App.vue:3` / `:103`) — the provider the
HEAD commit exists to install (`App.vue:2`: "Shared shell tooltip triggers require one
application-lifetime provider"). Re-measured at HEAD:

```
grep -n "glass-ui" package.json          → no match
grep -c "glass-ui" package-lock.json     → 0
node_modules/@mkbabb/glass-ui/package.json → "version": "7.0.0"
package.json dependencies                → { "@mkbabb/value.js": "4.0.0" }
```

This is **lane-frontend F-1**, confirmed unchanged. What this challenge adds is the *bite point*: F-1
was scored as a repo-level reproducibility red. On App specifically it is a **root-of-graph** failure —
`npm ci` rebuilds `node_modules` strictly from the lockfile, which has zero glass-ui entries, so the
first module Vite resolves for the app root is unresolvable. There is no degraded mode: no fallback
provider, no dynamic import, no `try`. `styles/style.css:3`'s `@import "@mkbabb/glass-ui/styles"`
compounds it, but `App.vue:145` fails first and hardest. `.npmrc` is `legacy-peer-deps=true`, so peer
drift is absorbed silently on top: no floor, no ceiling, no lock, no warning.

**Falsifier.** A `postinstall`, an `.npmrc` registry alias, a vendored tarball, or a `resolve.alias`
supplying glass-ui without a manifest declaration. *Ran it:* `vite.config.ts:37-60` aliases nine
paths, none glass-ui; `.gitmodules` declares only `docs/precepts`; `ls -ld
node_modules/@mkbabb/glass-ui` is a real directory, not a symlink; `package.json` has no
`postinstall`. **Claim survives.**

---

### L-03 · No SFC typecheck exists — and the last open thread is now CLOSED

```
package.json:53   "check":     "tsc --noEmit && tsc --noEmit -p tsconfig.test.json"
package.json:54   "check:lib": "tsc --noEmit -p tsconfig.lib.json"
tsconfig.json:39  "include": ["src/", "demo/"]
tsconfig.lib.json "include": ["src/"]
ci.yml:40-41      - name: check library types / run: npm run check:lib
```

Three composing facts:

1. `vue-tsc` / `@vue/language-tools` appear **nowhere** — not in the 48 devDeps, not in any workflow
   (`grep -rn "vue-tsc\|language-tools" package.json .github/workflows/*.yml` → no output).
2. Plain `tsc` cannot parse `.vue`, and `include: ["demo/"]` selects only `.ts`/`.d.ts` from that
   root. The 58-file / 11 984-line SFC surface (lane-frontend §9) is outside the program entirely —
   not "checked loosely", **absent**. `demo/env.d.ts` then declares every SFC as
   `DefineComponent<{}, {}, any>`, so *importers* of a `.vue` see `any` too.
3. The merge path runs `check:lib` (src/ only), `build:lib`, `test:lib` (the `library` vitest project,
   which excludes `test/demo/**`), `proof:publish`. The whole-project `check` is **not in CI at all**,
   and would not see this file if it were. `vite build --mode gh-pages` transpiles via rolldown — no
   type-checking.

**Pass 1 left one thread open** — "a `Makefile` exists at repo root and is the remaining place to
look; if it carries a `vue-tsc` target wired into a gate, this claim drops to MINOR." **I read it.**
The Makefile has exactly one target:

```make
CI_LINUX_CMD ?= set -e; npm ci; npm i --no-save @playwright/test lighthouse; \
	npx playwright install --with-deps chromium; npm run gh-pages; \
	KF_REQUIRE_BROWSER=1 npm run demo:correctness
.PHONY: ci-linux
```

Install → browser → `gh-pages` build → the Playwright roster. **No typecheck of any kind.** The
thread is closed and the severity stands.

**This is the enabling condition for L-01** (`.value` on a non-ref), **L-06** (a property on no
interface), **L-15** (a field absent from its own type), and **L-19** (new — a readonly/mutable
mismatch). It is why `tsconfig.json`'s otherwise-excellent strictness (`strict`,
`noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `verbatimModuleSyntax`) buys the demo
nothing.

**Falsifier.** A `vue-tsc`/`vti`/`volar` invocation in CI, a pre-commit hook, or a Makefile target
that typechecks SFCs. *All three checked; none exists.* **Claim survives with no open threads.**

---

## 2. NEW DEFECTS (this pass)

### L-19 · MINOR — a second, provable type error under L-03: `readonly` → mutable prop

```vue
App.vue:11   :control-surfaces="controlSurfaces"
```

```ts
App.vue:207           const controlSurfaces = computed(() => machine.controlSurfaces.value);
useSceneMachine.ts:308 controlSurfaces: readonly(computed<ControlSurface[]>(() => activeSurfaces.value)),
ChromeDock.vue:71      controlSurfaces?: string[];
```

`readonly(computed<ControlSurface[]>)` yields `DeepReadonly` — `.value` is `readonly ControlSurface[]`.
The prop is a **mutable** `string[]`. TypeScript rejects `readonly T[] → T[]` (TS4104, "The type
'readonly ControlSurface[]' is 'readonly' and cannot be assigned to the mutable type 'string[]'").
Runtime is unaffected; the *contract* is a fiction, and the fiction is load-bearing: `ChromeDock`'s
prop type advertises that the dock may mutate the array it receives, which would write straight
through the machine's `readonly()` mutation boundary (`useSceneMachine.ts:11-13`, the MED-4 boundary
the module exists to enforce). It does not mutate it today — but nothing says it may not.

**Why it matters beyond L-03.** L-06 and L-15 are *dead* code and *reachable-only-under-a-race* code.
This one is on the hot path — every scene switch re-evaluates it — and it points at the single
architectural invariant the state layer is built around.

**Falsifier.** Show `readonly()` returns a mutable type for arrays in this Vue version, or that
`ChromeDock`'s prop is declared `readonly string[]`. *Ran it:* `ChromeDock.vue:71` is bare `string[]`;
`useSceneMachine.ts:308` wraps in `readonly(...)` deliberately and documents why at `:293-295`.
**Claim survives.**

---

### L-20 · MINOR — two dead `SceneDescriptor` fields

```ts
scenes.ts:91   showStartScreen?: boolean;
scenes.ts:92   gridBackground?: boolean;
scenes.ts:133  showStartScreen: true,      // homeScene, the only assignment
```

Tree-wide (`grep -rn "gridBackground\|grid-background\|showStartScreen\|show-start-screen" demo`),
outside `EditorShell.vue` the hits are: the two declarations, the one home assignment, `App.vue:32`
(`:show-start-screen="isHome"` — computed from the **id**, never from the descriptor), and two CSS
comments in `HeroAurora.vue`. **Nothing reads `descriptor.showStartScreen` or
`descriptor.gridBackground`**, and App never binds `EditorShell`'s `gridBackground` prop, which rides
its `true` default (`EditorShell.vue:175`).

The sting is that `scenes.ts:218-222` explicitly congratulates itself for having killed this exact
drift class for a sibling field:

> `R.W5 C.5 — the STAGE_MODES: Record<string, StageMode> parallel record + its stageModeFor selector
> are DELETED. The mode is now a required stageMode field on each SceneDescriptor … single-sourced
> WITH the scene, so a new scene CANNOT silently fall through`

`stageMode` was made **required** and is genuinely consumed (`App.vue:199`). Two optional neighbours
on the same interface survived the sweep with no consumer at all.

**Falsifier.** Any read of `.showStartScreen`/`.gridBackground` off a descriptor, or a non-App
`EditorShell` host binding `gridBackground`. The tree-wide grep above is the whole population; App is
the only `EditorShell` host (verified in L-06). **Claim survives.**

---

### L-21 · MINOR — three nested `TooltipProvider`s with divergent delay configs

```
App.vue:3                      <TooltipProvider>                                       ← no props
AnimationControlsGroup.vue:2   <TooltipProvider :delay-duration="100" :skip-delay-duration="0">
ChannelControls.vue:2          <TooltipProvider :delay-duration="100" :skip-delay-duration="0">
```

HEAD `8281638c` installed the App-root provider to give the routed control group a tooltip context.
It retired neither descendant. A nested provider shadows its ancestor for its subtree, and reka's
default is `delayDuration: 700` (`node_modules/reka-ui/dist/Tooltip/TooltipProvider.js:15`), which
glass-ui does not override (`grep -rn "delayDuration" node_modules/@mkbabb/glass-ui/dist/tooltip.js`
→ no output).

Net: tooltips in `EditorShell`'s header ribbon (`EditorShell.vue:30-43`) and throughout `ChromeDock`
open after **700 ms**; tooltips inside the controls group open after **100 ms**. A 7× timing split
across one shell, produced by three providers where one parameterised provider suffices — and the
split is invisible at every site, because no site states its inherited delay.

**Falsifier.** Show glass-ui overrides reka's default to 100, or that the descendants mount outside
the App provider's subtree. Both checked and false — `AnimationControlsGroup` is a descendant of
`EditorShell`, itself inside `<TooltipProvider>` (`App.vue:3-103`). **Claim survives.** The
*perceived* timing difference is UNPROVEN-NEEDS-LIVE; the configuration divergence is proven.

---

### L-22 · MINOR — `"cube"` hard-coded 3× against a declared single-source id

```ts
App.vue:284  if (isHome.value || currentSceneId.value === "cube") return CubeScene;
App.vue:288  if (isHome.value || currentSceneId.value === "cube") return "cube";
App.vue:292  if (isHome.value || currentSceneId.value === "cube") {
```

`cubeKeys.ts` exists for precisely this, and says so:

> `/** The scene's registry id — the ONE keyspace (T.B9) … The registry descriptor (scenes.ts) AND the
> Scene SFC + useCubeDemo all import it, so no id literal is declared in a file that doesn't own it
> (R.W5 C.4). */  export const CUBE_SCENE_ID = "cube";`

App **does** import `HOME_SCENE_ID` (`App.vue:160`) and uses it three times. So the file already
honours the discipline for one id and breaks it for the other — the asymmetry is the tell that this
is drift, not a decision. The predicate itself is triplicated verbatim across three adjacent
computeds; one shared `const isCubeStage` collapses all three.

This compounds **L-08**: renaming the cube scene id would leave three App branches silently matching
nothing, and (per L-03) no checker would notice.

**Falsifier.** `CUBE_SCENE_ID !== "cube"`, or an import cycle preventing App from reaching `cubeKeys`.
*Ran it:* `cubeKeys.ts:7` is `"cube"`; App already imports `../scenes/cube/CubeScene.vue`, a strictly
heavier edge than its keys module. **Claim survives.**

---

### L-23 · MINOR — `AnimationGroup<any>` at App's widest type

```ts
App.vue:218-220
const currentAnimationGroup = shallowRef<AnimationGroup<any>>(
    markRaw(new (kfEngine().AnimationGroup)()),
);
```

`AnimationGroup<V extends Vars>` (`src/animation/group/group.ts:41`). The `any` is not local — it
flows into `useSceneMachineShellBinding`'s `currentAnimationGroup: ShallowRef<AnimationGroup<any>>`
(`:28`), `EditorShell`'s `animationGroup: AnimationGroup<any>` prop (`EditorShell.vue:137`), and
`SceneFacility.group?: AnimationGroup<any>` (`scene-facility/index.ts:72`). Under a repo this strict
it is a deliberate escape hatch, but an unannotated one — and with L-03 in force, nothing would
notice if `Vars` changed shape underneath it.

App's actual usage is narrow: it *stores* and *passes* the group, and the only structural read in the
closure is `Object.keys(group.animations)` (`useSceneMachineShellBinding.ts:251`). `unknown` or `Vars`
would carry it.

**Falsifier.** A use site needing `any` over `Vars`/`unknown` — e.g. assigning two
differently-parameterised groups. None found in the closure. **Claim survives**, with the honest
note that the cure is gated on L-03: there is no checker to prove a narrowing safe.

---

### L-24 · MINOR — 38 lines of `<style scoped>` for 2 declarations, ~20 of them narrating a deleted property

Measured over `App.vue`: the script section is 243 lines = **113 code / 104 comment / 26 blank**
(48 % comment). The style block (`:350-387`) emits exactly two declarations:

```css
.scene-host       { view-transition-name: scene-subject; }
.scene-host:focus { outline: none; }
```

Roughly twenty of the remaining lines document the **absence** of one property, with measurement
tables and a queued capability request:

> `/* T.G1 (THE BLUR DE-LAYER — the perf keystone). The former `contain: paint` here was a FALSIFIED
> mitigation: lane-11 CDP sampling measured it neutral-to-WORSE (cube 90→73, home 95→84) … it is the
> glass-ui `blur-source="static"` frozen-backdrop capability, queued to Glass BI for its 6.0.0 cut. */`

Two library-axis problems, not a style complaint:

1. **Dead documentation with a rot clock.** The queued ask targets a glass-ui **6.0.0** cut; the
   installed producer is already **7.0.0** (lane-frontend §2). The note is stale on arrival and
   nothing will ever red it.
2. **Findability.** A reader asking "what does `.scene-host` do?" must parse a changelog to find two
   declarations. The genuinely valuable rationale — why exactly one stable `view-transition-name`,
   why `outline: none` on a programmatic-focus-only host — is about three lines and is buried.

This is *not* a module-size finding; pass 1 correctly killed that (see §5). App's concern extraction
into `app/scene/` and `app/transition/` is sound. This is dead-documentation density in the shipped
artifact.

**Falsifier.** A precept requiring inline wave-history in SFCs. `docs/precepts` is a submodule not
read under lane law — this is the one claim in this file whose falsifier I could **not** close, and it
is recorded at MINOR for that reason.

---

### L-25 · INFO — two template-ref idioms six lines apart

```ts
App.vue:209  const sceneRef = shallowRef<SceneExposedApi | null>(null);   // + ref="sceneRef" at :92
App.vue:213  const sceneHostEl = useTemplateRef<HTMLElement>("sceneHostEl");
```

`sceneRef` uses the legacy same-name string-ref auto-binding; `sceneHostEl` uses the Vue 3.5
`useTemplateRef` idiom. Both work. The library-axis cost is that the string-ref form takes its type
from the *author's annotation* rather than deriving it from the bound component — which is the exact
mechanism by which L-06's phantom `tabsTrigger` survived. There is no comment at `:209` explaining the
split (a plausible reason exists: `useTemplateRef` cannot usefully type a dynamic `<component :is>`
exposed surface — but then the file should say so).

**Falsifier.** A stated reason at the site. None. Recorded as consistency, not correctness.

---

### L-26 · INFO — divergent inject defaults for one injection key

```ts
App.vue:173-174   const dockHoveredRef = ref(false); provide(CONTROLS_PANE_HOVER_KEY, dockHoveredRef);
ChromeDock.vue:159  const controlsPaneHover = inject(CONTROLS_PANE_HOVER_KEY, null);      // ← writer, null-guarded
usePaneHover.ts:35  const isDockHovered = inject(CONTROLS_PANE_HOVER_KEY, ref(false));    // ← reader, throwaway ref
```

The key is `InjectionKey<Ref<boolean>>` (`injectionKeys.ts:3`). The **writer** defaults to `null` and
guards (`if (controlsPaneHover) …`, `:162`); the **reader** defaults to a fresh throwaway `ref(false)`
and does not. Both are defensible in isolation; together they mean a missing provider degrades
differently at the two ends — the writer silently no-ops while the reader silently reads a ref nobody
writes. App is the only provider (`App.vue:174`), so today the defaults are unreachable. The defect is
that the key's absence-contract is defined twice, differently, with no third place stating which is
correct.

**Falsifier.** A second provider making one default reachable, or a documented per-consumer contract.
`grep -rn "CONTROLS_PANE_HOVER_KEY" demo` returns exactly the four lines above. **Claim survives as
INFO.**

---

## 3. CARRIED DEFECTS (pass 1, each re-tested at HEAD)

Compressed to claim · evidence · falsifier-result. All survive; none withdrawn.

### L-04 · MAJOR — no error boundary; the `<Suspense>` error posture is asserted, not implemented
`App.vue:90-99` mounts every scene under a bare keyed `<Suspense>` with a `#fallback` and no error
handling. `scenes.ts:104-107` is `defineAsyncComponent(loader)` — no `errorComponent`, no `onError`,
no `timeout`, no retry. `<Suspense>` has only `default` and `fallback` slots and performs no recovery;
a rejected async load propagates to the nearest `onErrorCaptured` or `app.config.errorHandler`. **The
tree has neither** — `grep -rn "onErrorCaptured\|errorHandler\|errorComponent" demo` returns prose
only, and I read `main.ts` whole (63 lines): no handler. Yet `scenes.ts:120-122` swallows the warm
rejection *on the stated grounds that* "the real mount surfaces the error via `<Suspense>`". A `KEEP:`
marker rests on a guarantee no line provides. A stale-hash chunk 404 (canonical for a hash-routed SPA;
`vite.config.ts:263` sets `base: "./"` with hashed names) parks `SceneSkeleton` (`role="status"
aria-busy="true"`) forever while the dock keeps rendering — reading as "this scene is broken", not
"reload". **Falsifier ran; claim survives.** Rendered outcome UNPROVEN-NEEDS-LIVE.

### L-05 · MAJOR — a swallowed boot failure becomes a fatal, misdiagnosed throw in App's setup
`main.ts:49-53` swallows the engine warm's rejection (`warmKfEngine().catch(() => undefined)`) and
mounts unconditionally (`.finally`). `kf-engine.ts:39-42` assigns `resolved` only in the success arm,
and `inflight ??=` retains the **rejected** promise, so `warmKfEngine()` is permanently poisoned;
`load-engine.ts:122-123` is a bare `enginePromise ??= import("./public")`, so the underlying load is
too. App's setup then reaches `new (kfEngine().AnimationGroup)()` at `App.vue:218-220` **before any
lifecycle hook**, and `kf-engine.ts:50-55` throws
`"kfEngine() read before warmKfEngine() resolved — await warmKfEngine() before app.mount()
(demo/app/main.ts)."` Two compounding defects: (1) the throw is inside root `setup()`, so `app.mount()`
aborts — with L-04 that is a blank page, no dock, no skeleton, no message; (2) **the message
misdiagnoses** — it names a programmer error for a network error. main.ts *did* await; the await lost.
An operator reading this goes hunting for a missing `await` that does not exist. **Falsifier ran**
(re-read `kf-engine.ts` and `load-engine.ts:115-123` at HEAD); **claim survives.** Observation
UNPROVEN-NEEDS-LIVE; mechanism complete.

### L-06 · MAJOR — dead `#tabs-trigger` slot on a property that exists nowhere
`App.vue:53-59` binds `sceneRef?.tabsTrigger`. `SceneExposedApi` (`sceneExposedApi.ts:16-34`) declares
`facility`, `tabsContent`, `ribbonContent`, `headerLeft`, `superKey`, `autoPlays`, `isStarted` — **no
`tabsTrigger`**. Tree-wide `grep -rn "tabsTrigger" demo src test` returns four lines: the two in App,
plus `CubeScene.vue:152,156` documenting *its own deletion* ("the `tabsTrigger` function (and its
`defineExpose` entry) are therefore DELETED"). I additionally read every scene's `defineExpose`
(`EasingScene:112`, `SquareScene:313`, `CubeScene:240`, `AmigaScene:234`, `SequenceScene:33`,
`SpringScene:180`) — none exposes it. MAJOR rather than MINOR because `EditorShell.vue:88-90` forwards
`#tabs-trigger` **unconditionally**, so `AnimationControlsGroup` always observes the slot as
*provided* and can never fall back to its own default: a two-file arrangement in which nothing can
ever render into a declared slot. **Falsifier ran; claim survives.**

### L-07 · MAJOR — the "exactly ONE registry" exists twice, live, and App's render path reads both
`controlSurfaces.ts:140-144` states the invariant: *"THE ONE SURFACE-METADATA REGISTRY … both docks and
the in-panel strip resolve every tab's `{label,icon}` from HERE (proof:dfa-derived's 'resolves from
exactly ONE module' clause)."* `components/instrument/surfaceTabs.ts` is a **41-line verbatim fork** —
I read it whole this pass: it imports only `BUILT_IN_SURFACES` + `type ControlSurface` from
`@state/controlSurfaces`, then **redeclares** `ControlSurfaceTab`, `SURFACE_META` (all six rows,
byte-identical), `extraTabsFrom`, and `dockCardinality`. Two live consumers: `ChromeDock.vue:21`,
`TransportDock.vue:237`. App's render path spans both copies in one frame — `App.vue:264`
`extraControlTabs` ← `useSceneMachine.ts:317` `extraTabsFrom` (**@state** copy) → passed to ChromeDock
at `App.vue:12`, where `ChromeDock.vue:49-50` builds `BUILT_IN_CONTROL_TABS` from the **@components**
copy's `SURFACE_META`, `:100` concatenates the two provenances into one array, and `:126-134` feeds
that mixed array to the **@components** copy's `dockCardinality`. The copies are identical today —
which is the hazard: divergence is silent, and the failure mode is an *elision* (a control vanishing
from the dock), not an exception. This is historically the **fourth** copy; `controlSurfaces.ts:122-129`
narrates killing three and the consolidation landed a duplicate instead of a re-export. **Falsifier
ran; claim survives.** → extends lane-frontend **F-5**, §6.

### L-08 · MAJOR — `cube` statically imported *and* lazily registered — **bundling half now CONFIRMED**
`App.vue:155` statically imports `CubeScene`; `scenes.ts:143` registers the same module as
`lazyScene("cube", () => import(...))`; `App.vue:283-286` guarantees the lazy wrapper is **never
mounted** (`if (isHome || id === "cube") return CubeScene;` short-circuits before the descriptor read).
So: (1) `scenes[0].component` is dead — constructed at module init, never rendered; (2)
`warmScene("cube")`, wired live at `App.vue:15` → `ChromeDock.vue:261` `@pointerenter`, prefetches a
module already in the entry graph and *is documented as a chunk prefetch* (`scenes.ts:109-117`);
(3) the declared split does not exist.

**Pass 1 marked (3) UNPROVEN-NEEDS-LIVE ("no build permitted"). I closed it without building** — by
reading the artifact already on disk at `dist/gh-pages/assets/` (dated Jul 16 09:11, 50 files):

```
AmigaScene-7bH_DVoz.js   EasingScene-r_TvmL9r.js   SequenceScene-DycpAAkh.js
SpringScene-ltdPWkBj.js  SquareScene-B_lYpvft.js
ls dist/gh-pages/assets | grep -i cube   → (empty)
grep -c "cube-stage--hero-recede" dist/gh-pages/assets/index-B2hcFaCm.js   → 1
```

Five of the six lazy scenes have their own JS chunk (and four have their own CSS chunk). **There is no
`CubeScene-*.js` and no `CubeScene-*.css`.** `cube-stage--hero-recede` is declared exactly once in the
tree — `CubeScene.vue:11` — and it is present in the 481 KB entry chunk. Cube (with `CubeTarget`,
`orbital-drag`, `matrix-editor`) is in the entry. `vite.config.ts:301-306` names this exact class
("the exact eager-leak inv γ exists to prevent").

The static import is *defensible* — home renders `CubeScene` as its hero backdrop, so it is on the
first-paint path by design. What is not defensible is a lazy registration documenting the opposite, a
`warmScene` edge that pretends to warm it, and `scenes.ts:224-227`'s closing claim that *"All scenes
load on demand via defineAsyncComponent for code-splitting."* One of the two registrations must go.

**Falsifier.** A build in which `CubeScene` occupies its own chunk. The artifact is the strongest
available evidence short of a rebuild; recorded caveat: it is dated Jul 16 and the tree has moved, but
the **source shape** at `App.vue:284` that produces it is HEAD-current. **Claim survives, upgraded
from UNPROVEN to CONFIRMED-BY-ARTIFACT.**

### L-09 · MINOR — `headerLeft` is a dead contract member; ~33 lines unreachable; brand rationale stale
`sceneExposedApi.ts:27` declares it; `CubeScene.vue:118-150` produces a 33-line `h()` hover-card and
exposes it (`:252`); `EditorShell.vue:18` slots it. **No host ever fills `#header-left`.** Re-ran
tree-wide: `grep -rn "header-left\|headerLeft" demo` → exactly those five lines, producer + contract +
slot, consumer absent. Since App is the only `EditorShell` host, the hover-card is unreachable.
Chained staleness in App's own first comment (`App.vue:107-110`) and `brand.css:1-7`, which both name
three consumers "App.vue mounts (header logo, CubeScene hover-card logo, CubeTarget cube face)":
App.vue's template carries **no** `.ppmycota-*` class, and the CubeScene one is the unreachable one.
The actual live consumers are `CubeTarget.vue:84,87` and `MbabbMenu.vue:30` (which the list omits).
**The import itself is correct and must stay** — see S-E. **Falsifier ran; claim survives.**

### L-10 · MINOR — the `autoPlays` branch is unsatisfiable and its docblock asserts the opposite
`useSceneMachineShellBinding.ts:200-207`, reached from App via `onSceneResolved` / the `sceneRef` watch
(`App.vue:90,322-330`), reads `sceneRef.value?.autoPlays === true`. Re-ran `grep -rn "autoPlays" demo`:
the only producers are `EasingScene.vue:126` and `SpringScene.vue:194`, **both `false`**. The docblock
names easing as the exemplar of `autoPlays: true`; easing is one of the two `false`s. So
`SceneExposedApi.autoPlays` is a dead contract member, the `||` left arm is dead, and only App's own
`autoPlayNext` gesture flag (`App.vue:221`) can reach `PLAY`. Given `useSceneMachine.ts:85-98`'s
explicit gesture-gated-playback policy, the `false`s are the intended end state and the branch is
residue — dead code plus a comment that misdescribes shipped behaviour. **Falsifier ran; claim
survives.**

### L-11 · MINOR — documented idempotence that is structurally impossible
`App.vue:256` `watchEffect(() => machine.setActiveSurfaces(derivedSurfaces.value))`.
`useSceneMachine.ts:134-135`: *"Idempotent — a re-derivation to the same set is a no-op (ref equality
on the array)."* `controlSurfaces.ts:93`: *"Returns a fresh array per call."* Both cannot hold.
`setActiveSurfaces` is a bare `activeSurfaces.value = surfaces` (`:137`); Vue's ref setter gates on
`!Object.is`, and a fresh array is never `Object.is`-equal. So **every** recomputation invalidates
`machine.controlSurfaces` (→ `App.vue:35` `:has-control-surfaces`) and `machine.extraControlTabs()`
(→ ChromeDock's `allControlTabs` → `controlZoneKind` → `dockCardinality` → the whole dock control
zone). `App.vue:249`'s `isHome` arm returns a new `[]` literal for the same reason. Observable case:
switching between two *painting* channels on cube re-derives an identical set with a new identity and
re-renders the dock's tab strip for a no-change. Cost is small (pure chain, ≤6 elements); the defect is
a load-bearing docblock asserting a property the code cannot have, on the single write path of a
shared machine. **Falsifier ran** (`:137` bare assignment; `controlSurfaces.ts:107-119` allocates four
fresh arrays, no cache); **claim survives.**

### L-12 · MINOR — `storedControls` is a `computed` whose getter writes persisted global state
`App.vue:229`. `controlOptionsStore.ts:76-94` creates a bucket when absent
(`store.value[superKey] = {...structuredClone(defaults), selectedControl: defaultControlSurfaceFor(...)}`)
and applies `controls.keyframeControls ??= structuredClone(...)`. The store is `useStorage`
(`:49`), so **evaluating a Vue computed performs a synchronous `localStorage` write.** Three
consequences: (a) *materialisation by observation* — App reads it on the home landing (`:9`, `:229`,
`:253`, `:275`) with `superKey === "home"`, a scene whose surfaces App itself hard-codes to `[]`
(`:249-250`), yet the read persists a full `home` bucket; (b) the getter mutates its own tracked
dependency, self-invalidating once per new superKey (converges on the second read — no loop, but a
reactive cycle by construction); (c) with `derivedSurfaces` read from a `flush: 'pre'` `watchEffect`
(`:256`), a first-touch lands that write inside the pre-flush of App's update. **Every other consumer
in the tree calls this in statement position** where the effect is honest (all 9 sites listed in
L-01); App is the only site hiding it behind a `computed` — and
`useSceneMachineShellBinding.ts:105` shows the correct imperative home. **Falsifier ran** (boot GC
prunes and migrates but never seeds; `defaultControlSurfaceFor` exists precisely to seed on first
touch); **claim survives.** MINOR because the settle is provably one-shot per superKey.

### L-13 · MINOR — `sceneSwapStyle` is dead weight on VT engines yet emits a stacking-context transform
`useSceneSwap.ts:35-51`: `vtOwnsMotion = supportsViewTransitions()`; the **only** writer of
`sceneOpacity` is line 48, inside the `!vtOwnsMotion` arm. On Chrome/Edge — the demo's primary target
and the engine the whole `useSceneTransition` dogfood is written for — `sceneSwapStyle` is permanently
`{ opacity: 1, transform: "scale(1)" }`, bound inline at `App.vue:88`. A `transform` other than `none`
creates a stacking context and a containing block for fixed descendants. That sits directly against
App's own `<style>` block (`:358-379`), which removed `contain: paint` from this exact element after
CDP sampling measured it neutral-to-worse and now asserts the host "carries NO falsified paint-wall" —
the same species of unexamined layer hint, applied from the other side of the file, with neither
comment aware of the other. The honest shape is for `useSceneSwap` to return `undefined` on the VT
path so no inline style is emitted. **Falsifiers ran:** (a) no second writer of `sceneOpacity` (file
read whole); (b) **no live victim** — `grep -rn "position: fixed" demo/scenes/` is empty and the only
fixed stage (`AnimationControlsGroup.css:134,180`) is an **ancestor** of the slot, not a descendant,
so the containing-block hazard is **latent, not live** and I do not assert a rendering bug. Claim is
scoped to the dead binding + the stacking context. Compositing delta UNPROVEN-NEEDS-LIVE.

### L-14 · MINOR — test instrumentation ships to the production DOM, asymmetric with its own DEV twin
`useSceneTransition.ts:76-83` writes the same fact twice, four lines apart, for the same gate: the
first behind `import.meta.env.DEV` (DCE'd from production), the second — `sceneHost.value
?.setAttribute("data-last-vt-type", types[0] ?? "")` — unguarded. Every production scene swap stamps
the attribute onto `.scene-host` (`App.vue:84-89`). `main.ts:57-62` is the codebase's own idiom for
zero-byte dev-only instrumentation, and `vite.config.ts` already drops `console`/`debugger` for the
library build. The write also mutates an element carrying `view-transition-name`, inside the VT
dispatch window, for no production benefit. **Falsifier ran:** `grep -rn "data-last-vt-type" demo
scripts test src` returns **only the write site** — no CSS selector, no gate reader, no analytics.
**Claim survives** (and is marginally stronger than pass 1 stated: there is no reader in `scripts/`
either).

### L-15 · MINOR — the `#ribbon-content` projection reaches an unconditional deref; the type omits a stored field
`App.vue:65-71` projects the active scene's `ribbonContent` into `EditorShell`'s ribbon slot. For cube
that is `CubeScene.vue:183-202`, whose "Fixed/Free" button does
`storedControls.matrixOptions.fixed = !storedControls.matrixOptions.fixed` (`:194`, **unconditional**)
while optional-chaining the *same* expression three lines later (`:197`, `:198`). `matrixOptions` is
optional in the type (`controlOptionsStore.ts:26`: `matrixOptions?: { fixed: boolean }`) and absent
from the defaults (`:34-46`); CubeScene seeds `ppMode` (`:62-63`) but not `matrixOptions`. The only
seeder is `MatrixEditor.vue:120` (`storedControls.matrixOptions ??= defaultMatrixOptions`), which runs
only when `MatrixEditor` mounts. Ribbon and panel share a gate (`selectedControl ===
"matrix-controls"`), so on the ordinary path MatrixEditor's setup wins the race — hence MINOR, not a
second BLOCKER. **UNPROVEN-NEEDS-LIVE** whether a collapsed controls pane (`App.vue:9`) can render the
ribbon while suppressing the panel; if it can, `:194` throws on a fresh bucket.
**Independently and provably wrong:** `MatrixEditor.vue` reads/writes
`storedControls.matrixOptions.selectedMatrixCell` at **7 sites** (`:23,:38,:64,:71,:77,:82,:87`) — a
field the type does not declare (`:117` introduces it only in a local literal). Under a real SFC
typecheck that is TS2339 ×7. Another L-03 escapee. *(Pass 1 counted 6; the recount is 7 — `:23` is a
read through a line-broken member expression.)* **Type half survives outright.**

### L-16 · INFO — App writes a fact into global state and reads it back
`App.vue:207` reads `machine.controlSurfaces.value`; `:248-256` computes `derivedSurfaces` and feeds
it to `machine.setActiveSurfaces`. App is simultaneously **sole writer** and **a reader**, laundered
through `createGlobalState`. Justified for the dock (ChromeDock's DFA projection and
`selectedControlSurface` both need it); not justified for App's own two uses (`:35`, `:264`), which
could read `derivedSurfaces` directly. I checked the tick-lateness concern and it **does not hold** —
`watchEffect`'s default `flush: "pre"` schedules the write ahead of the same instance's render job.
Recorded as an altitude note only.

### L-17 · INFO — inline template mutation contradicts the rule its sibling composable writes down
`App.vue:16` mutates inline; `useSceneMachineShellBinding.ts:261-263` writes down the opposite rule for
the immediately adjacent concern ("Write via handler (not inline template) so the assignment is
scheduled … not a stale template closure"). The stated rationale does not transfer verbatim —
`storedControls` is a `computed` re-read per evaluation — but `App.vue:307-310` already has
`onDockSelectControl` as the handler-shaped precedent for the sibling control, so the file is
internally inconsistent about the same rule for the same widget. I could not construct a staleness
failure; consistency, not correctness.

### L-18 · INFO — a deliberate TDZ-lazy closure resolves a setup-order cycle
`App.vue:322-330` passes `getRunSceneSwitch: () => runSceneSwitch`, closing over a `const` declared six
lines later (`:336`). Correct **today**: nothing in the binding invokes it synchronously during setup —
the two `watch` calls (`:217`, `:233`) and `useDocumentVisibility`'s (`:283`) are all non-immediate,
and the only caller is `onPlayStateChange` (`:254`), an event handler. Adding `{ immediate: true }` to
any of them, or dispatching from setup, converts it into `ReferenceError: Cannot access
'runSceneSwitch' before initialization` at boot. The cycle is real (the binding owns `switchScene`,
which `useSceneTransition` wraps, whose product the binding needs) and the thunk is a legitimate
break; a cheaper guard is to construct `switchScene` separately and invert the two calls. **Falsifier
ran** (whole file, no synchronous path); INFO by construction.

---

## 4. SUPERLATIVES (L-18 runs both ways)

### S-A · The `<Suspense>` shape encodes a real regression as a structural constraint
`App.vue:73-100` + `useSceneSwap.ts:17-25`. A `<Transition mode="out-in">`/`<KeepAlive>` wrapping a
keyed `<Suspense>` over a `defineAsyncComponent` *never triggered the loader* — amiga/square/easing/
spring shipped a blank viewport (B.W3's headline blocker). Rather than patching around it, the fade
moved to a **sibling** `<div>`'s style binding, so the async boundary is a bare `<Suspense>` that
cannot be re-wrapped without deleting the comment that says why. Both files carry the *mechanism*, not
just the verdict. This is what defensive documentation should look like, and it is rare. (Contrast
L-24, where the same instinct produced a changelog.)

### S-B · The route reconcile is a fixed point, not a debounce — and it discriminates its errors
`useSceneMachineRouterBinding.ts:1-20, 75-113`. ONE reader (`router.afterEach` → `NAVIGATE`), ONE
writer (`watch(activeScene)` → `push`), and an activeScene-equality echo guard that kills the route
storm **at the fixed point** — the header says so explicitly ("NOT by debouncing harder"). The detail
that earns it is `:98-111`: the `.catch` resets the echo generation *before* discriminating, and
**re-throws** anything that is not `duplicated | aborted`. The idiom in the wild is a blanket
`.catch(() => {})`, which eats broken route guards forever. This does not.

### S-C · The `SpringProgress` consumption is a correct, minimal engine dogfood
`useSceneSwap.ts:44-51`. The ordering is load-bearing and correct against the engine source: `reset(0)`
settles and stops the loop; `play(cb)` binds the frame callback **idempotently** without spawning a
second loop (`managed-play.ts:32-38`, `managed-stepper.ts:14-27` — `managedStart` delegates to
`_playback.drive`, documented and implemented as a no-op while running); `target = 1` un-settles and
auto-resumes. Repeated swaps neither stack rAF loops nor leak one — `managedPlay` auto-stops on settle.
`respectReducedMotion: true` routes PRM through the engine's own authority rather than a demo-side
`matchMedia` — the correct dogfood direction for a library's own demo. **I opened this expecting a
teardown leak (no `dispose()`, no `stop()`, app-lifetime instance) and the engine contract killed the
claim — independently, this pass.** Recorded here rather than shipped as a defect.

### S-D · `useSceneTransition` is a disciplined VT consumer
`useSceneTransition.ts:52-95`. Three things it gets right that most VT code does not: (1) the dispatch
wraps **only** the synchronous key mutation, never the async `<Suspense>` loader — the single most
common VT misuse; (2) direction derives from `sceneIndex` (`scenes.ts:210-216`), the *one* ordered-index
seam, not a second hard-coded order list; (3) **focus is routed on `finished`** (`:89-91`) to a
`tabindex="-1"` host, because View Transitions morph layout but do not manage focus — an a11y
consequence almost universally ignored — and `App.vue:381-386` then suppresses the focus ring for the
programmatic-only case.

### S-E · The brand-mark CSS scope decision is correct for the right reason
`App.vue:107-110` + `brand.css:1-13`. `MbabbMenu`'s mark renders inside a **portalled**
`DropdownMenuContent`, so a `<style scoped>` rule could not reach it and a `[data-v-*]` attribute would
change specificity. A non-scoped partial imported once at the app root is the smallest correct shared
scope — and `brand.css:9-12` further explains why the `--ppmycota-primary` *token* stays in global
`:root` while the *rules* colocate. A genuinely subtle call, made correctly, reasoning preserved. (Its
consumer *list* is stale — L-09 — but the decision is right.)

### S-F · `useMonacoCancellationGuard` is a model narrow global handler
`useMonacoCancellationGuard.ts:20-33`. One exact signature (`name`/`message === "Canceled"`), both
`unhandledrejection` and `error`, `@vueuse/core` `useEventListener` for scope-managed teardown rather
than a hand-rolled add/remove pair, and a docblock that **enumerates the error classes it deliberately
does not swallow** (`AnimationOptionError`, the `_gen` crash, the parse fingerprint). Compare
`window.onerror = () => true`. The missing counterpart is the *fatal* case — L-04/L-05.

### S-G · **NEW** — the LIGHT/HEAVY engine boundary is dogfooded exactly right
```ts
App.vue:147  import type { AnimationGroup } from "@mkbabb/keyframes.js";   // TYPE — erased
App.vue:148  import { kfEngine } from "@kf-engine";                        // VALUE — heavy accessor
App.vue:219  markRaw(new (kfEngine().AnimationGroup)()),
```
The type comes from the **light** static barrel and is genuinely available there —
`src/animation/index.ts:287` `export type { AnimationGroup } from "./group";`, with the runtime class
deliberately withheld behind `loadAnimationEngine` (`:308`). The constructor comes from the warmed
dynamic accessor, so value.js never lands on the static graph (lane-library §3.3: `load-engine.ts:124`
is "*the* value.js firewall"). `grep -rn "value.js" demo/app` → no output. `markRaw` on every group is
the deliberate MED-6 discipline (`App.vue:216-217`) keeping non-serialisable objects out of the
machine context. And `kf-engine.ts:50-55` converts the failure mode into a **fix instruction** naming
the exact file and call. This is the single strongest thing in the file — a consumer boundary a
`npm i` user reaches identically, proven by construction. (L-05 is a *boot-fragility* defect in the
same seam, not a refutation of it: the seam is right; the failure path through it is unhandled.)

### S-H · **NEW** — the adapter registry's release is identity-checked
```ts
useSceneMachine.ts:111-116
function register(sceneId: SceneId, adapter: ScenePlayback): () => void {
    adapters.set(sceneId, adapter);
    return () => { if (adapters.get(sceneId) === adapter) adapters.delete(sceneId); };
}
```
The returned disposer deletes **only if the slot still holds the same adapter**. A late release from a
torn-down scene — exactly what App's swap sequencing produces, since `bindSceneAdapter` calls
`releaseAdapter?.()` before re-registering (`useSceneMachineShellBinding.ts:56-58`) — therefore cannot
evict a live registration. This is the correct shape for a keyed registry under async teardown and it
is not the shape most code takes. It is also the reason no adapter-leak claim appears in this
challenge: I looked for one and the registry had already closed it.

---

## 5. KILLED (claims that did not survive their own falsifier)

Recorded so no third pass re-opens them. Rows 1–7 carried from pass 1 and **re-verified this pass**;
rows 8–10 are new to this pass.

| claim | why it died |
|---|---|
| `useSceneSwap` leaks a rAF loop (spring never `stop()`/`dispose()`d) | `managed-play.ts:32-38` + `managed-stepper.ts:14-27`: `managedPlay` is idempotent (`_playback.drive` no-ops while running) and auto-stops on settle. → became **S-C**. |
| `transform: scale(1)` on `.scene-host` breaks `position: fixed` descendants | No scene uses `position: fixed`; the only fixed stage (`AnimationControlsGroup.css:134,180`) is an **ancestor**. Latent, not live. → narrowed to **L-13**. |
| `controlSurfaces` reads one tick late behind `derivedSurfaces` | `watchEffect` default `flush: "pre"` runs ahead of the same instance's render job. → **L-16 INFO**. |
| `<component :is="sceneRef.ribbonContent" v-bind="slotProps">` cannot pass props to a bare function | Vue 3: a functional component with no `props` option receives the full attrs object as its first argument. The render-fn slot bridge (`sceneExposedApi.ts:5-10`) is sound. |
| `provide(CONTROLS_PANE_HOVER_KEY, …)` is dead — App never reads it | Read by `usePaneHover.ts:35`, written by `ChromeDock.vue:162`. Live. (A *different* defect survives here → **L-26**.) |
| `getRunSceneSwitch` thunk will TDZ-throw | No synchronous call path in the binding. → **L-18 INFO**. |
| App.vue exceeds Goldilocks module size | 387 lines, ~113 executable in script. The router binding (150), shell binding (293), VT (95), and swap (54) are all extracted into named single-concern modules under `app/scene/` and `app/transition/`. `proof:app-is-shell` **holds structurally**. (A *documentation-density* defect survives separately → **L-24**.) |
| **NEW:** App calls `useSceneMachine()` twice (`:181` and inside the shell binding `:44`) — two machines | `useSceneMachine` is `createGlobalState(...)` (`useSceneMachine.ts:72`) — one singleton, both calls return it. Correct. |
| **NEW:** the placeholder `AnimationGroup`s leak (four construction sites: `App.vue:219`, `useSceneMachineShellBinding.ts:75,84,93`) | `group.ts:117-157`: the constructor binds one frame callback and populates a plain object. A childless group allocates no timer, no listener, no rAF. Garbage, not leaks. |
| **NEW:** `router.afterEach` / `router.isReady().then` in `useSceneMachineRouterBinding` leak their handlers | App-lifetime by construction (root-only composable, one instantiation). Not a defect at this scope. |

---

## 6. Corpus reconciliation

| hitherto id | this challenge |
|---|---|
| **F-1** (lane-frontend §0/§2) — glass-ui phantom dep | **Confirmed unchanged at HEAD `8281638c`** and escalated for this component: `App.vue:145` is the app-**root** import, and HEAD made App the *sole* application-lifetime tooltip provider (`App.vue:2`), so `npm ci` now fails at the first module of the first component and every shell tooltip loses context before any scene mounts. → **L-02**. |
| **F-5** (lane-frontend §7.3) — re-export shims, 1 dead + 1 incoherent, 5 lines | **Extended, not contradicted.** `components/instrument/surfaceTabs.ts` is a heavier member of the same class: a **41-line forked implementation** (not a re-export) of `@state/controlSurfaces`'s `SURFACE_META`/`extraTabsFrom`/`dockCardinality`, with **two live consumers**, violating a stated `proof:dfa-derived` "exactly ONE module" clause that App's own render path straddles in a single frame. Recommend adding it as F-5's primary row. → **L-07**. |
| **S-6** (lane-frontend §5) — `App.skeleton` → glass-ui `Skeleton`, AMBER, 101 lines | Read whole; **no library-axis defect found**. It honours `prefers-reduced-motion` (`:95-100`), sets `role="status"`/`aria-busy`/`aria-label`, and pairs `will-change: background-position` with a `background-position` animation (correct pairing). The replace-vs-keep question is a *design* call; this axis has nothing to add against it. |
| **S-8** (lane-frontend §5) — `TypingDots` justified bespoke | Not in App's closure. No comment. |
| **§1** (lane-frontend) — "68 engine-consuming files; the demo is the library's own proving ground" | Corroborated at the App layer: `SpringProgress` (S-C), `viewTransition` (S-D), and the LIGHT/HEAVY accessor split (S-G) are all correct, minimal engine consumption. The one engine-consumption defect is not API misuse but **boot fragility** in the accessor seam → **L-05**. |
| **§8** (lane-frontend) — the self-alias / glass-ui↔keyframes cycle | Not re-litigated; no App-specific bite beyond L-02. |
| **§9** (lane-frontend) — 58 `.vue`, 11 984 lines | Supplies L-03's blast radius: that entire surface is outside the type system. |
| lane-library **§3.3** — the two dynamic edges; `load-engine.ts:124` as *the* value.js firewall | Consumed directly in **S-G** (the boundary is right) and **L-05** (the `??=` memoises a rejection permanently). |
| lane-library **§4** — parse seams | No overlap: App reaches no parser surface. |

---

## 7. Recommended order

1. **L-01** — one-line fix (`stored.ppMode = !(stored.ppMode ?? false)`); live crash, zero coverage.
2. **L-03** — add `vue-tsc` + a `check:demo` script to the merge gate. This prevents the *class* that
   produced L-01, L-06, L-15, L-19; land it before anything else touches an SFC. Expect a large
   initial red.
3. **L-02** — declare `@mkbabb/glass-ui: 7.0.0`, regenerate the lock (already lane-frontend rec #1).
   Nothing below is reproducible until this lands.
4. **L-05 + L-04** as one motion — propagate the warm failure into a boot-error render, distinguish
   "not yet warmed" from "warm failed" in `kfEngine()`, add an `app.config.errorHandler` and an
   `errorComponent`/`onError` on `defineAsyncComponent`. Then `scenes.ts:120-122`'s justification
   becomes true.
5. **L-07** — delete `components/instrument/surfaceTabs.ts`; repoint `ChromeDock.vue:21` and
   `TransportDock.vue:237` at `@state`.
6. **The dead-contract sweep** — **L-06** (drop `#tabs-trigger` here and the forward at
   `EditorShell.vue:88-90`), **L-09** (`headerLeft`: fill the slot or delete producer + contract +
   slot), **L-10** (`autoPlays`: delete or make a producer true), **L-20** (drop the two descriptor
   fields). Cheap, and each removes a false statement from the record.
7. **L-08 + L-22** together — reconcile the cube static/lazy duplicate in one motion and collapse the
   triplicated `"cube"` predicate onto `CUBE_SCENE_ID`.
8. **L-11, L-12, L-13, L-14, L-15, L-19, L-21, L-23, L-24** — individually landable.
9. **L-16, L-17, L-18, L-25, L-26** — altitude/consistency; fold into whichever wave touches the file.

---

## Provenance note

Every claim is anchored to `file:line` in `/Users/mkbabb/Programming/keyframes.js` (READ-ONLY
evidence) or to `node_modules/` copies already installed there. Nothing in keyframes.js, glass-ui, or
value.js was written, mutated, installed, built, or executed. The only write performed by this lane is
this file. **L-08's build evidence is read from the pre-existing `dist/gh-pages/` artifact on disk
(dated Jul 16 09:11); no build was run** — the artifact's age is disclosed at the claim. No browser
tooling was used: the ppMode crash observation (L-01), the failed-chunk render outcome (L-04), the
boot-failure page state (L-05), the ribbon race (L-15), tooltip timing (L-21), and any compositing
delta (L-13) are marked **UNPROVEN-NEEDS-LIVE** for the SS-13 visual audit. Their mechanisms are
source-derived and complete.

One falsifier could not be closed under lane law and is disclosed at its claim: **L-24**'s (whether a
precept mandates inline wave-history in SFCs — `docs/precepts` is a submodule outside this lane's read
perimeter). It is filed at MINOR for that reason.
