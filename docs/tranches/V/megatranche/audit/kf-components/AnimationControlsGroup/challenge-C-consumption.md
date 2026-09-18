claude-opus-5[1m]

# CHALLENGE · AnimationControlsGroup.vue · axis C — CONSUMPTION

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/components/instrument/transport/AnimationControlsGroup.vue` (336 lines)
**Axis** how this component consumes keyframes.js (the library) and glass-ui (the design system): subpath choices, shadow components (S-1..S-8), value.js transitive exposure (R1), props/emits contract quality, sibling integration seams.
**Posture** the component is presumed DEFECTIVE until the tree proves otherwise; every claim below carries its own falsifier, and a claim that fails its falsifier is withdrawn rather than downgraded. Three hypotheses I formed *were* killed by their falsifiers and are recorded as such in §4 — they are not findings.
**Method** read-only. Static + source-derived only; no browser. Module-graph closures computed by transitive `from "./…"` walk over `node_modules/@mkbabb/glass-ui/dist/`. Two runtime probes were run against the *installed* `@mkbabb/value.js@4.0.0` (pure functions, no product source touched).

**Corpus folded** `docs/tranches/V/megatranche/formation/keyframes/lane-frontend.md` (F-1 phantom dep; shadow census S-1..S-8), `lane-library.md`. Findings that extend a census row cite its id. No census row is contradicted by this lane.

## Files read whole

| file | why |
|---|---|
| `transport/AnimationControlsGroup.vue` | the target |
| `transport/AnimationControlsGroup.css` | its scoped stylesheet (`<style scoped src>` at :336) |
| `transport/AnimationControlsGroup/useAnimationGroupPlayback.ts` (208) | :137 |
| `transport/AnimationControlsGroup/useAnimationGroupActions.ts` (77) | :135 |
| `transport/AnimationControlsGroup/useAnimationProgress.ts` (45) | :138 |
| `transport/AnimationControlsGroup/useControlsKeyboardShortcuts.ts` (72) | :136 |
| `transport/controls-pane/ControlsPaneWrapper.vue` (319) | :128 |
| `transport/components/DemoGlobalChrome.vue` (49) | :129 |
| `transport/TransportDock.vue` (403) | :130 |
| `transport/transportSource.ts` (33) | :134 |
| `demo/state/controlOptionsStore.ts` + `storeUtils.ts:23-34` | :132 `@state` |
| `keyframes.js/package.json`, `value.js@4.0.0/package.json`, `glass-ui@7.0.0/package.json` | the three exports maps |
| sampled: `channel-controls/ChannelControls.vue`, `KfPillTabs.vue`, `KfPillTabs/useKfPillTabs.ts`, `shell/EditorShell.vue`, `app/App.vue`, `composables/scene-facility/index.ts`, `components/instrument/surfaceTabs.ts`, `composables/useRafLoop.ts` | the prop chains and seams the target opens |

---

## 1. Scorecard

| id | severity | claim | live? |
|---|---|---|---|
| C-1 | **BLOCKER** | `@mkbabb/glass-ui` — imported twice by this file — is in neither `package.json` nor `package-lock.json` (lane-frontend **F-1**, re-verified) | yes |
| C-2 | **MAJOR** | the channel scrub branch drops the `SCRUB` machine dispatch, re-opening the exact persistence gap T.B8 closed — for all three group scenes | yes |
| C-3 | **MAJOR** | `superKey?` is declared optional but is de-facto required: an omitted `super-key` throws `TypeError` in setup | latent |
| C-4 | **MAJOR** | the `extraTabs` chain is a 3-hop dead contract typed against a renderer that drops two of its five fields | yes (dead) |
| C-5 | MINOR | `TooltipProvider` nested three deep; the third instance is a provable no-op re-provide | yes |
| C-6 | MINOR | root-barrel `@mkbabb/glass-ui` import for one Provider where the 4-module `/tooltip` leaf exists and 6 siblings already use it | yes |
| C-7 | MINOR | two of the three state classes on the layout root have no consumer anywhere in the repo | yes |
| C-8 | MINOR | the `reset(all: boolean)` emit's `true` arm is dead; `clear()` is unreachable | yes |
| C-9 | MINOR | app-global singletons (`<Toaster>` teleport + a fixed-id SVG paint-server) are mounted from a `:key`-remounted per-scene layout component | yes |
| C-10 | INFO | the demo consumes keyframes.js through a source self-alias, never through the published `exports` map | yes (by design) |

**defects 10 · blockers 1 · superlatives 4**

Verified negatives (NOT findings, recorded so the next lane does not re-spend the budget): §4.

---

## 2. Defects

### C-1 · BLOCKER · the phantom dependency is live in this file
*(extends lane-frontend **F-1**; re-verified against the tree, not restated from the lane)*

`AnimationControlsGroup.vue:124` and `:126` import from `@mkbabb/glass-ui`. The package is absent from both manifests:

```
$ grep -n "@mkbabb/glass-ui" package.json package-lock.json
(no output)
$ node -e "console.log(require('./node_modules/@mkbabb/glass-ui/package.json').version)"
7.0.0
```

`npm ci` cannot reproduce a tree in which this file compiles. The component's own subtree draws on **ten** distinct glass-ui specifiers (`""`, `/dock` ×3, `/drawer`, `/easing`, `/forms`, `/keyboard`, `/labeled-field` ×2, `/status-dot`, `/tabs` ×2, `/tooltip` ×3) — every one of them undeclared and unlocked. Note also the cycle F-1 rides on: glass-ui 7.0.0 declares `"@mkbabb/keyframes.js": "^6.0.0"` as a **peer**, and this demo is that package.

> **Falsifier** — a `@mkbabb/glass-ui` entry in `package.json` `dependencies`/`devDependencies`/`peerDependencies` or any `node_modules/@mkbabb/glass-ui` record in `package-lock.json`. Neither exists.

---

### C-2 · MAJOR · the channel scrub branch silently drops the `SCRUB` dispatch

`AnimationControlsGroup.vue:244-254`:

```ts
const sliderUpdate = (val: { t: number; animation: KeyframesAnimation<any> }) => {
    const ch = channels?.find((c) => c.animation && c.animation.id === val.animation.id);
    if (ch) {
        const dur = val.animation.options.duration ?? 1000;
        ch.setProgress(dur > 0 ? val.t / dur : 0);
        return;                       // ← returns BEFORE groupSliderUpdate
    }
    groupSliderUpdate(val);
};
```

`groupSliderUpdate` is `useAnimationGroupPlayback.ts:133-147`, and its second statement is the whole point of T.B8:

```ts
getAnimationGroup().setChildTime(animation, t).render();
// … SCRUB records `t` onto every animation snapshot the scene owns (closes the
// group-scene scrub-persistence gap: cube/amiga/square previously only refreshed
// `t` at captureActive()/NAVIGATE-away, so a scrub-then-reload lost it).
machine.dispatch({ type: "SCRUB", t });          // :146
```

The channel branch reaches `ChannelHandle.setProgress`, which is `scene-facility/index.ts:104-108` — `setChildTime(anim, clamped*dur).render()` and **nothing else**. No dispatch.

The branch is not a rare fallback; it is the **only** branch for every group scene:

```
demo/scenes/cube/CubeScene.vue:228      const facility = facilityFromGroup(() => animationGroup.value, {…})
demo/scenes/amiga/AmigaScene.vue:232    const facility = facilityFromGroup(() => animationGroup)
demo/scenes/square/SquareScene.vue:311  const facility = facilityFromGroup(() => animationGroup)
demo/app/App.vue:227                    const currentChannels = computed(() => sceneRef.value?.facility?.channels)
demo/app/App.vue:30                     :channels="currentChannels"
```

So `channels` is populated for cube/amiga/square — *the exact three scenes the T.B8 comment names as cured* — and `machine.dispatch({type:"SCRUB"})` never fires for any of them. The repo-wide dispatch census is two sites, neither on this path:

```
demo/scenes/sequence/useSequenceDemo.ts:285,348   (sequence scene, its own raf path)
demo/.../useAnimationGroupPlayback.ts:146          (the branch this code skips)
```

Consequence: scrub a cube face, reload — the playhead is back where the last `captureActive()`/`NAVIGATE` left it. That is verbatim the regression `useAnimationGroupPlayback.ts:139-145` claims to have closed. The cure survives only in the dead fallback.

Secondary, same site: the channel branch is the one scrub path that does **not** clamp. `getActiveT` (:257) and `scrubActive` (:264) both route through `clamp(…, 0, 1)`; `useAnimationProgress.ts:24,35` clamps; `facilityFromGroup`'s own `setProgress` clamps *after* receiving the value. `:250` passes raw `val.t / dur`. Harmless today because the callee clamps — but the clamp discipline is uniform everywhere else in this component, and this is the hole in it.

> **Falsifier (primary)** — any other code path that records a scrubbed `t` onto the machine snapshot for a facility scene before a `NAVIGATE`/`SUSPEND` capture; or evidence that cube/amiga/square do not expose `facility.channels`. Both were searched: the SCRUB census above is exhaustive (`grep -rn 'SCRUB' demo/`), and the three `facilityFromGroup` sites are the whole group-scene set.
> **Falsifier (secondary)** — a caller that can emit `sliderUpdate` with `t > duration` or `t < 0`; the clamp claim is about discipline, not a live bug, and I do not assert a live bug.

---

### C-3 · MAJOR · `superKey?` is optional in the type and required in fact

`AnimationControlsGroup.vue:147` declares `superKey?: string`. `:176` is the first executable statement of setup:

```ts
const storedControls = getStoredAnimationGroupControlOptions(superKey);
```

`controlOptionsStore.ts:66-71` accepts `undefined` *and defaults to it*:

```ts
export const getStoredAnimationGroupControlOptions = (
    superKey: KeyframesAnimation<any> | SceneId | undefined = undefined,
): StoredAnimationGroupControlOptions => {
    superKey = getAnimationSuperKey(superKey, superKey);
```

`storeUtils.ts:23-34` then dereferences a non-null assertion on the very value it was told may be undefined:

```ts
if (superKey) { … }
if (typeof animation === "string") return animation;
return animation!.superKey ?? "default";     // :33
```

Probe (the two arguments are the same value, so both guards fall through together):

```
$ node -e '…getAnimationSuperKey(undefined, undefined)…'
THROWS: TypeError Cannot read properties of undefined (reading 'superKey')
```

Reachability: `EditorShell.vue:143` declares `superKey?: string` with `:172` `superKey: undefined` as the default, and forwards it unguarded at `:79` (`:super-key="superKey"`). So `<EditorShell>` mounted without `super-key` hard-crashes the async `AnimationControlsGroup` in setup. The component's own prose at `:167` names that host as supported — *"defaults TRUE so a non-App host (the playground) keeps its rail"*. The `?? "default"` on `storeUtils.ts:33` shows the intended behaviour was a `"default"` bucket; the guard order loses it.

Not live: `App.vue:31` always passes `currentSuperKey` (`:191`, `currentScene.value.superKey`). Graded MAJOR-latent rather than BLOCKER for exactly that reason.

Same seam, lesser: `superKey=""` returns `""` — a legal object key. A host passing an empty string gets a silent shared `""` bucket rather than a crash or a default.

> **Falsifier** — `getAnimationSuperKey(undefined, undefined)` returning `"default"` (kills it outright), or evidence that no host may legally omit `super-key` (which would make the finding "the prop should be required", i.e. the same defect with a smaller fix).

---

### C-4 · MAJOR · `extraTabs` — a 3-hop dead prop typed against a renderer that drops two of its five fields
*(the sharp instance of lane-frontend **S-2**; S-2 flagged the three type-only `/tabs` imports as "the S-1 tell" — this is what they are actually load-bearing for)*

`AnimationControlsGroup.vue:126` imports `SegmentedTabOption` from `@mkbabb/glass-ui/tabs` for exactly one purpose: `:173` `extraTabs?: SegmentedTabOption[]`. Two independent problems.

**(a) The type over-promises against the terminal renderer.** The chain re-types mid-flight:

| hop | file:line | declared type |
|---|---|---|
| 1 | `AnimationControlsGroup.vue:173` (forwarded `:30`) | `SegmentedTabOption[]` |
| 2 | `ControlsPaneWrapper.vue:198` (forwarded `:65`) | `SegmentedTabOption[]` |
| 3 | `ChannelControls.vue:271` | `KfPillTabOption[]` |
| 4 | `KfPillTabs.vue:53` | `KfPillTabOption[]` |

```
glass-ui/dist/components/tabs/SegmentedTabs.vue.d.ts:5   { label; value; icon?; disabled?; tooltip? }
transport/KfPillTabs/useKfPillTabs.ts:23                 { label; value; disabled? }
```

`SegmentedTabOption` is a structural **supertype**, so `tsc` is silent — and `KfPillTabs.vue:20-33` renders only `opt.value`, `opt.disabled`, `opt.label`. A host that sets `icon` or `tooltip` — both advertised as legal by the public prop type on this file — gets a silent no-op that no gate can catch. That the demo *knows* this is visible at `ChannelControls.vue:319-321`, where the machine path narrows by hand (`.map((t) => ({ value: t.value, label: t.label }))`) while this file's public type does not.

**(b) Nothing supplies it.** `extra-tabs` is bound at exactly three sites repo-wide, all of them forwarders:

```
transport/AnimationControlsGroup.vue:30
transport/controls-pane/ControlsPaneWrapper.vue:65
shell/EditorShell.vue:84
```

`App.vue:28` mounts `<EditorShell>` with no `:extra-tabs`; `EditorShell.vue:178` defaults `() => []`. And in the only live host, `ChannelControls.vue:319-322` takes the `tabsExternallyManaged` branch and never reads `extraTabs` at all. The prop is inert end to end, and the sole reason this file touches `@mkbabb/glass-ui/tabs` is to type it.

> **Falsifier** — any host binding `:extra-tabs`, or a `KfPillTabs` render of `icon`/`tooltip`. Both searched (`grep -rn "extra-tabs" demo/`, `grep -n "icon\|tooltip" KfPillTabs.vue` → zero).

---

### C-5 · MINOR · `TooltipProvider` nested three deep; the third is a no-op

```
app/App.vue:3                      <TooltipProvider>                                    (defaults: 700 / 300)
  …/AnimationControlsGroup.vue:2     <TooltipProvider :delay-duration="100" :skip-delay-duration="0">
    …/ChannelControls.vue:2            <TooltipProvider :delay-duration="100" :skip-delay-duration="0">
```

glass-ui's `TooltipProvider` is a bare passthrough of reka's (`dist/components/tooltip/TooltipProvider.vue.d.ts` → `TooltipProviderProps` from `reka-ui`, no added props), and reka's provider is unconditional:

```js
// reka-ui/dist/Tooltip/TooltipProvider.js
const isOpenDelayed = ref(true);
const { start: startTimer, stop: clearTimer } = useTimeoutFn(() => { isOpenDelayed.value = true; }, skipDelayDuration, …);
provideTooltipProviderContext({ isOpenDelayed, delayDuration, … });
```

Two consequences, one provable and one not:

- **provable** — `ChannelControls.vue:2` re-provides an *identical* `{100, 0}` context inside `AnimationControlsGroup.vue:2`'s subtree. It creates a second `isOpenDelayed` ref and a second timer for zero semantic change. Dead nesting.
- **provable** — with `skipDelayDuration: 0` the close-handler's `startTimer()` resolves on the next tick, so `isOpenDelayed` is always back to `true`. The "second tooltip in a group opens instantly" affordance is **disabled** for the whole transport subtree, and App's 300ms grouping cannot reach into it (a nested provider shadows, it does not merge). The transport dock's five tooltips (`TransportDock.vue:59, 90, 156, 169`) therefore each pay the full 100ms.
- **UNPROVEN-NEEDS-LIVE** — whether that reads as sluggish beside App's grouped register. Deferred to SS-13.

> **Falsifier** — reka's `TooltipProvider` injecting an existing context instead of creating one (it does not: `createContext("TooltipProvider")` + unconditional `provideTooltipProviderContext`), or `ChannelControls` being reachable outside `AnimationControlsGroup`'s subtree (it is not — the only mount is `ControlsPaneWrapper.vue:50`, itself mounted at `AnimationControlsGroup.vue:18`).

---

### C-6 · MINOR · the root barrel taken for one Provider, against six siblings' practice

`AnimationControlsGroup.vue:124` — `import { TooltipProvider } from "@mkbabb/glass-ui"` — where `App.vue:145` and five other demo files take `@mkbabb/glass-ui/tooltip`. Measured module-graph closures over `dist/`:

```
glass-ui.js  62 modules   (42 chunk edges: dialog, command, data-table, dropdown-menu,
                           number-field, tags-input, toast, pointerFieldMappings, …)
tooltip.js    4 modules
```

Both resolve `TooltipProvider` to the same chunk (`tooltip-OxciiZm6.js` — the root barrel imports it rather than inlining a copy), so there is **no** dual-instance provide/inject hazard; that counter-claim was checked and is dead. glass-ui declares `sideEffects: ["*.css"]` and no dist JS carries a bare CSS import (`grep -rho 'import "\./[^"]*\.css"' dist/*.js` → empty; the stylesheet is the standalone `glass-ui.css`), so a tree-shaking prod build should collapse the 62 to the 4. The cost is therefore the dev module graph and the consistency break, not bundle weight — hence MINOR, deliberately not asserted as a size regression.

Note this is also a same-file inconsistency: `:126` correctly takes the `/tabs` leaf; `:124` does not take the `/tooltip` leaf beside it.

> **Falsifier** — a prod bundle-graph diff showing identical chunk contents for both specifiers kills the cost half; the consistency half (six siblings on `/tooltip`) survives it.

---

### C-7 · MINOR · two of three state classes on the layout root have no consumer

`AnimationControlsGroup.vue:4-9` writes three class families onto `.controls-layout`. Repo-wide consumers:

| class | generated | consumed |
|---|---|---|
| `controls-layout--stage-${stageMode}` | `:6` | **nowhere** |
| `controls-layout--open` | `:7` | **nowhere** |
| `controls-layout--closed` | `:7` | `AnimationControlsGroup.css:64` |
| `controls-layout--railless` | `:8` | `AnimationControlsGroup.css:67` |

```
$ grep -rn "controls-layout--stage\|controls-layout--open" --include=*.{vue,ts,js,mjs,css,md} . | grep -v node_modules
demo/…/AnimationControlsGroup.vue:6      (the generation site)
demo/…/AnimationControlsGroup.vue:7      (the generation site)
docs/tranches/J/audit/design/pane-home.md:24   (prose describing `controls-layout--stage-subject` as live)
```

`stageMode` is optional (`:159`) with no default, so on any host that omits it the DOM literally carries `class="… controls-layout--stage-undefined …"`. The J-tranche design audit reasons about `controls-layout--stage-subject` as a working hook; the stylesheet never had a rule for it. Prose and tree disagree — the same disagreement pattern lane-frontend S-2 records for the `<SegmentedTabs>` comments.

> **Falsifier** — any stylesheet, `scripts/` probe, or test selecting `.controls-layout--stage-` or `.controls-layout--open`. Searched across `demo/`, `src/`, `scripts/`, `test/`, `*.css`, `*.mjs`: none.

---

### C-8 · MINOR · the `reset(all: boolean)` emit's `true` arm is dead

`AnimationControlsGroup.vue:106`:

```
@reset="(all: boolean) => all ? clear() : reset()"
```

`TransportDock.vue` declares `(e: "reset", all: boolean): void` (`:347`) and emits it at exactly one site, always false:

```
TransportDock.vue:158   @click="() => { resetIconSpin(); emit('reset', false); }"
TransportDock.vue:368   // T.C2 — "Clear all & reload" (… `emit('reset', true)`) MOVED OUT of the transport
```

The child's own comment records that the `true` producer was deleted; the boolean stayed on the emit signature and the parent kept a handler for it. `clear()` — `useAnimationGroupActions.ts:63-74`, which runs `resetAllStores()` + `window.location.reload()` — is therefore unreachable from this component (`grep -n "clear()" AnimationControlsGroup.vue` → the single `:106` hit). Emit-contract quality: the child advertises a destructive capability it no longer exercises, and the parent carries a live call to a full-page reload behind it.

> **Falsifier** — any emitter of `reset` with `true` (e.g. the @mbabb settings menu routing through `TransportDock`). Searched `demo/`: none.

---

### C-9 · MINOR · app-global singletons mounted from a per-scene, `:key`-remounted component

`AnimationControlsGroup.vue:118` mounts `<DemoGlobalChrome />` unconditionally as the component's second root node. `DemoGlobalChrome.vue` holds two *document*-scoped singletons — and says so at `:2-7` ("both resolve against the DOCUMENT … not the controls grid"):

- `:14-25` an SVG paint-server with the fixed id `#rainbow-gradient`, referenced by `url(#rainbow-gradient)` from the ribbon;
- `:27-42` `<Teleport to="html"><Toaster …/></Teleport>`.

But the host is scene-scoped: `EditorShell.vue:76` mounts it `:key="superKey"`, and `useSceneMachineShellBinding.ts:138-140` documents that this key boundary *is* a remount (`__home__`→`Cube`). So every scene navigation tears down and re-creates the app's toast host and the document's paint-server registry entry. The extraction rationale ("zero appearance delta") holds for placement; it does not address lifetime — the sub-component moved, the wrong owner did not.

Adjacent, and a **new shadow-census row candidate (S-9)**: the toaster is `vue-sonner` (`DemoGlobalChrome.vue:48`, declared `package.json:111`) while glass-ui 7.0.0 ships `./toast` in its 73-subpath map — a design-system shadow that lane-frontend's S-1..S-8 does not enumerate. Not adjudicated here (the S-census owns replace/keep verdicts); filed so the next census pass sees it.

> **Falsifier** — vue-sonner's `<Toaster>` restoring in-flight toasts from its module-level store on remount (which would make the churn invisible), or evidence that `superKey` is constant across navigation (`App.vue:191` shows it is not).

---

### C-10 · INFO · the demo consumes keyframes.js through a source self-alias, never the exports map

`AnimationControlsGroup.vue:133` imports from `@mkbabb/keyframes.js`. Both resolvers redirect it:

```
tsconfig.json   paths: { "@mkbabb/keyframes.js": ["./src/animation/index.ts"] }
vite.config.ts  alias: { "@mkbabb/keyframes.js": resolve(dirname, "src/animation/index.ts") }
```

So the library's flagship consumer never resolves through `package.json`'s `exports` (`.` → `dist/keyframes.js`, `./engine`) nor through `dist/keyframes.d.ts`. A regression in the exports map, the d.ts rollup, or the `entryRoot`-pinned emit (`vite.config.ts:225`) is invisible to every demo typecheck and every demo build.

This is deliberate and documented (`vite.config.ts:21-35`: glass-ui's bare `@mkbabb/keyframes.js` peer import would otherwise be stubbed to an empty optional peer, so the self-alias dedupes consumer and design system onto one engine). Recorded as a consumption-surface blind spot, not a defect of this file — but it is the reason no finding on this axis can be stated as "the published surface works", only "the source surface works".

> **Falsifier** — a demo build or typecheck configuration that resolves `@mkbabb/keyframes.js` through `node_modules`. Neither `tsconfig.json` nor any `vite.config.ts` mode does.

---

## 3. Superlatives *(L-18 runs both ways — each carries its own falsifier)*

### SUP-1 · the narrowest possible value.js subpath, and it is what keeps R1 out
`AnimationControlsGroup.vue:125` — `import { clamp } from "@mkbabb/value.js/math"`. That leaf is `dist/subpaths/math.js`: **1 110 bytes**, seven pure numeric functions, zero imports, no parser, no color graph. value.js 4.0.0's exports map has no `.` key at all — seven subpaths only — and this file takes the smallest one. All three colocated composables that need `clamp` (`useAnimationGroupPlayback.ts:7`, `useAnimationProgress.ts:6`, and the sibling `scene-facility/index.ts:4`) do the same. This is the direct cause of the R1 negative in §4.
> *Falsifier* — a cheaper import (none: `clamp` is `Math.min(Math.max(…))`), or evidence that `/math` drags the parser. Measured: it drags nothing.

### SUP-2 · a zero runtime edge to keyframes.js, honouring the barrel's LIGHT/HEAVY split by construction
`:133` is the file's only keyframes.js import and it is `import type` — erased under `verbatimModuleSyntax`. Every library operation reaches the component as the already-constructed `AnimationGroup` prop. `src/animation/index.ts:1-26` is explicit that the HEAVY surface (`AnimationGroup`, `CSSKeyframesAnimation`, `resolveKeyframes`) must be reached only through `loadAnimationEngine()`'s dynamic import, and that types may ride the static barrel free. A light-only consumer cannot pull the heavy graph — or value.js's parser — through this component.
> *Falsifier* — any value (non-`type`) import from `@mkbabb/keyframes.js` in this file or its four colocated composables. All seven such imports across the five files are `import type`.

### SUP-3 · no library internals reached
The AnimationGroup surface this component's subtree touches — `.animations`, `.started`, `.singleTarget`, `.setChildTime()`, `.render()`, `.stop()`, `.setLayerConfig()` — is entirely public class members of `src/animation/group/group.ts` (`:43`, `:52`, `:73`, `:240`, …), all reachable from the exported `AnimationGroup` type. No `as any` onto a private, no `@ts-expect-error`, no reach past the type surface. Against a demo whose whole job is to exercise its own library, this is the discipline that keeps the demo honest as a consumer.
> *Falsifier* — an underscore-prefixed or non-`.d.ts` member in the call set. `group.ts:173`'s `_entries` is used by the library on itself and never by the demo.

### SUP-4 · the glass-ui keyboard registry consumed exactly as designed
`useControlsKeyboardShortcuts.ts:50-71` puts all 18 bindings through glass-ui's one `registerShortcut` registry (`/keyboard` — a 1-module closure, zero value.js edges) rather than opening a second window listener, so they inherit the editable-target skip (`dist/keyboard.js`'s `f()`: INPUT/TEXTAREA/SELECT/contenteditable/`.monaco-editor`) and surface in `KeyboardShortcutsModal`. It discards all 18 unregister returns — which I expected to be a leak across the `:key="superKey"` remount, and it is not: `dist/keyboard.js`'s `y()` ends `return t() && n(l), l` — i.e. `getCurrentScope() && onScopeDispose(unregister)` — and `:322` calls the composable from setup, inside a scope. Correct by the API's own contract.
> *Falsifier — and the one thing that would flip this to a leak* — calling `useControlsKeyboardShortcuts` outside an effect scope (a module body, or after an `await` that escapes setup). Then 18 handlers accumulate per scene navigation with no ceiling.

---

## 4. Verified negatives — hypotheses that failed their own falsifiers

Recorded so the next lane does not re-spend the budget, and because withholding them would misrepresent how many of my leads survived.

**N-1 · R1 (`parseCssColor` crash class) is NOT reachable from this component.**
R1 first reproduced against the installed `@mkbabb/value.js@4.0.0` — the exact copy `package.json:"@mkbabb/value.js": "4.0.0"` pins:

```
parseCssColor("oklch()")     → THROWS TypeError: Cannot read properties of undefined (reading 'replace')
parseCssColor("rgb()")       → THROWS TypeError
parseCssColor("color-mix()") → THROWS TypeError
parseCssColor("")            → not-ok      (correct)
parseCssColor("var(--x)")    → not-ok      (correct)
parseCssColor("oklch(0.7 0.1)") → not-ok   (correct)
```

Empty-argument color functions throw a raw `TypeError` instead of returning `{ok:false}`. Reachability from this file:

- direct: the only value.js edge is `/math` (SUP-1) — no parser.
- transitive: of the ten glass-ui entries in this component's subtree, only `/dock` reaches the chunk that imports `parseCssColor` (`value-DMhh2R94.js`), and it imports `{ n, t }` — the channel guard `o()` and the result unwrap `r()` — **not** `i()`, the `parseCssColor` wrapper. The only two modules that import `i` are `accent-tone-solve-Cw7WkRD9.js` and `color.js`; neither appears in any subtree closure (`glass-ui.js` 62 modules / 0 value.js edges; `/drawer` 6/0; `/keyboard` 1/0; `/status-dot` 3/0; `/tabs` 16/0; `/tooltip` 4/0; `/dock` 30 modules, `value.js/color` + `value.js/css`, `value-DMhh2R94.js` only).
- `@mkbabb/glass-ui/easing` (in-subtree via `TimingFunctionPanel.vue:61`) *does* reach `@mkbabb/value.js/css`, but for `parseTimingFunction`, which is well-behaved: `cubic-bezier()`, `steps()`, `linear()`, `spring()`, `cubic-bezier(.1,.2,.3)`, `""` all → `not-ok`, no throw.

Worth carrying to whichever lane owns the dock: glass-ui wraps the parser as `if (!i.ok) throw new GlassColorError(…)`, so R1's `TypeError` escapes *above* that guard — a `{ok:false}` contract violation defeats the design system's own error boundary. Not this component's defect.
> *Falsifier that would revive this* — a dynamic glass-ui import inside the subtree pulling `color.js`/`accent-tone-solve`, or a demo call to `parseCssColor` reachable from here.

**N-2 · the discarded `registerShortcut` returns are not a leak.** See SUP-4 — `getCurrentScope() && onScopeDispose(…)`.

**N-3 · the two `TooltipProvider` import styles are not a dual-instance hazard.** Both `dist/glass-ui.js` and `dist/tooltip.js` re-export from `tooltip-OxciiZm6.js`, so the reka injection key is identical. Only C-6's consistency/graph half survives.

**N-4 · `SceneId` widening is not a defect.** `sceneMachine.ts:21` — `export type SceneId = string`. Passing `superKey?: string` into a `SceneId` parameter is exact, not a widening. (Killed before it became C-3's sibling; C-3 is a *value*-domain defect, not a type-domain one.)

**N-5 · the fragment root does not warrant `inheritAttrs: false`.** The template has two root nodes (`TooltipProvider` at `:2`, `DemoGlobalChrome` at `:118`), so Vue performs no automatic fallthrough, and `:10` `v-bind="$attrs"` is the explicit, warning-free consumption. Correct as written.

**N-6 · `useRafLoop` is not an unjustified shadow.** glass-ui ships `useRAFLoop-Biv3gP4j.js`, but the demo's `transport/composables/useRafLoop.ts` wraps `useDemoTicker` → keyframes.js's own `RAFPlayback.loop`. That is dogfooding the library under audit, not shadowing the design system. Do not file it as an S-row.

---

## 5. What this component gets right, structurally

The consumption discipline is real and worth stating plainly, because most of the defects above are *contract* defects sitting on a sound *dependency* skeleton: one type-only edge to the library (SUP-2), the narrowest value.js leaf in the repo (SUP-1), no reach past public class surface (SUP-3), the design system's own keyboard registry rather than a private listener (SUP-4). The failures cluster in one place — **props and emits that describe more than the tree delivers**: an optional prop that must be supplied (C-3), a typed prop nothing supplies and nothing fully renders (C-4), a boolean emit arm with no producer (C-8), two CSS state classes with no rule (C-7). C-2 is the one behavioural regression, and it is the same species: a branch added for a new axis that did not carry the old axis's obligations across.
