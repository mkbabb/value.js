claude-opus-5[1m]

# CHALLENGE — `ChannelControls.vue` · axis **L (LIBRARY)**

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/components/instrument/transport/channel-controls/ChannelControls.vue` (456 lines)
**Method** whole-file read + every transitive import read (read-only). No browser tooling; every claim below is derived from the tree. Livable-only consequences are marked `UNPROVEN-NEEDS-LIVE`.
**Posture** the component was assumed DEFECTIVE until proven otherwise. Fourteen additional hypotheses were formed and **killed by their own falsifiers** before this report (see §5) — they are recorded so the next lane does not re-run them.

**Tally** — 20 defects (3 BLOCKER · 5 MAJOR · 9 MINOR · 3 INFO) · 4 superlatives.

---

## 0. The load-bearing structural fact (upstream of the three blockers)

Everything in §1 follows from one fact the component's own prose never accounts for:

```
ControlsPaneWrapper.vue:45-49
    <template v-for="host in controlHosts" :key="host.animation.id">
        <div v-show="storedControls.selectedAnimation == host.name">
            <ChannelControls … :active="storedControls.selectedAnimation == host.name" …>
```

`v-show`, **not** `v-if`. Every channel of the scene gets a **mounted** `ChannelControls`; the non-selected ones are merely `display:none`.

And all of those instances share **one** store object:

- `ChannelControls.vue:274` → `getStoredAnimationGroupControlOptions(animation)`
- `demo/state/storeUtils.ts:23-34` → key = `animation.superKey ?? "default"`
- `demo/scenes/cube/useCubeDemo.ts:67,101,112` → `matrixAnim.superKey = rotationAnim.superKey = hoverAnim.superKey = SCENE_ID`

⇒ On cube, **three** `ChannelControls` instances are mounted simultaneously and read/write the **same** `storedControls`. Spring has 2 channels; square/amiga ≥1.

The component is handed the discriminator it needs — the `active` prop (`ChannelControls.vue:257,261`, supplied at `ControlsPaneWrapper.vue:64`) — and **forwards it to `ChannelOptions` (line 108) but never uses it itself.** `ChannelOptions.vue:377` then does the right thing with it (`<Teleport v-if="active" to="#controls-ribbon-target">`). The correct idiom exists one level down and is absent here.

---

## 1. BLOCKERS

### L-1 · BLOCKER · N `KeyframeTimeline` instances teleport into a singleton target

**`ChannelControls.vue:186-200`** (with `:377-379`)

```vue
<Teleport to="#timeline-expanded-target" :disabled="!storedControls.isTimelineExpanded" defer>
    <div v-if="isTimelineVisible" …><KeyframeTimeline … /></div>
</Teleport>
```
```ts
const isTimelineVisible = computed(() =>
    storedControls.selectedControl === "timeline" || storedControls.isTimelineExpanded,
);
```

`isTimelineVisible` reads only the **shared** store — no `active`, no per-instance term. The teleport target is a **single** DOM node (`AnimationControlsGroup.vue:79-88`, `id="timeline-expanded-target"`). `display:none` on an ancestor does not suppress a Teleport: the child node is relocated into the target, which is visible.

**Failure scenario.** Cube. User selects the Timeline surface and expands it (`isTimelineExpanded = true`). All three mounted `ChannelControls` instances now evaluate `isTimelineVisible === true` and `disabled === false`, so **three** `<KeyframeTimeline>` roots are appended into the one `#timeline-expanded-target` — three stacked editors, three `useTimeline` states, three `useRefHistory(capacity:50, deep, clone)` trails, three preview caches, three ResizeObserver sets. The user edits the last-painted one; the other two are invisible-but-live cost. Collapsing (`disabled=true`) hides two of them again inside their `v-show` parents, so the symptom appears and disappears with the expand toggle.

**Falsifier.** Any of: (a) `controlHosts` is length-1 for every live scene — killed, cube yields 3 (`useCubeDemo.ts:116-120`); (b) the channels do **not** share a store — killed, all three carry `superKey = SCENE_ID`; (c) a `display:none` ancestor suppresses Teleport relocation — false by Vue's Teleport semantics; (d) `isTimelineExpanded` is per-channel — killed, it is a field of the shared `StoredAnimationGroupControlOptions` (`controlOptionsStore.ts:11-27`).

**Contrast that condemns it:** the sibling singleton teleport in `ChannelOptions.vue:377` *is* gated on `active`.

---

### L-2 · BLOCKER · `:key` on the teleported wrapper destroys all authored timeline state

**`ChannelControls.vue:187-191`**

```vue
<div v-if="isTimelineVisible" :key="storedControls.selectedControl" class="animate-in …">
    <KeyframeTimeline ref="timelineRef" … />
```

The comment three lines above (`:182-185`) states the *reason* the Teleport sits outside the gated panels:

> "Timeline: outside the gated panels but inside the scrollable area **so Teleport lifecycle isn't tied to a panel mount/unmount**"

`:key="storedControls.selectedControl"` re-introduces exactly that lifecycle coupling. A key change makes the vnode non-same-type, so Vue unmounts and remounts the subtree.

`KeyframeTimeline`'s state is **wholly local and unpersisted**: `useTimeline` (`demo/components/instrument/timeline/composables/useTimeline.ts:22-26,30,37-46,76-86`) owns `state = ref({keyframes: [], …})`, `scrubT`, and the `useRefHistory` undo trail; the only `@state` import in that directory tree is `defaultAnimationOptions` (a constant). There is no store read on mount.

**Failure scenario.** User selects Timeline, authors N keyframes, expands the timeline into the bottom bar, then clicks **Controls** in the dock. `storedControls.selectedControl` flips `"timeline" → "controls"`; `isTimelineVisible` stays `true` (expanded); the `:key` flips ⇒ remount ⇒ `state.keyframes` back to `[]` and `canUndo` back to `false`. The timeline is still on screen and now **empty**. Silent, unrecoverable loss of user work.

**Falsifier.** (a) timeline state is externally owned/persisted — killed, `useTimeline` holds it in local refs with no storage; (b) Vue reuses a keyed element across a key change — false; (c) `selectedControl` cannot change while `isTimelineExpanded` — killed, the dock (`App.vue:307-310` → `ChromeDock`) writes `selectedControl` independently of the expand flag.

*(Note: the `:key` is presumably there to retrigger the `animate-in fade-in slide-in-from-right-2` entrance class. That is a 3-token CSS effect paid for with the user's data.)*

---

### L-3 · BLOCKER · one Monaco editor **per channel** is force-mounted on idle

**`ChannelControls.vue:129-147`** + **`composables/useKeyframesPaneReveal.ts:56-58,68-102`**

```vue
<div v-if="hasSurface('keyframes') && keyframesWarmed" … :class="['monaco-pane', …]">
    <KeyframesStringControls … :animation="animation" />
```
```ts
const keyframesActive = computed(() => storedControls.selectedControl === "keyframes");
const keyframesWarmed = ref(false);
…
scheduleIdleWarm();   // unconditional, at setup, in EVERY instance
```

Neither the mount gate nor the warm consults `active`. `scheduleIdleWarm()` runs at setup in **every** mounted instance and flips `keyframesWarmed` on the first `requestIdleCallback` (or the 1.5 s vueuse fallback). `hasSurface('keyframes')` is scene-wide, not channel-wide.

`KeyframesStringControls` → `CSSCodeEditor.vue:132` `m.editor.create(el, …)` — a **real Monaco editor instance per mount** (chunk cached, instance not).

**Failure scenario.** Enter cube. ~1 idle tick later, three `KeyframesStringControls` mount, each creating a Monaco editor + model + theme registration; two of them are permanently `content-visibility:hidden` + `inert` and belong to channels the user has not selected. Memory and main-thread cost scale linearly with channel count for zero user-visible benefit. This directly undercuts the T.G9 docblock's own goal ("no longer pays Monaco's bytes during first paint of every scene", `useKeyframesPaneReveal.ts:60-67`) — the *bytes* are deferred once, the *instances* are multiplied by N.

**Falsifier.** (a) `KeyframesStringControls` shares one editor across instances — killed, `CSSCodeEditor` creates in `onMounted` and disposes in `onUnmounted` per instance (`:199,218-220`); (b) the pane is `v-if`'d on the active channel somewhere upstream — killed, `ControlsPaneWrapper` uses `v-show`; (c) only one channel ever exists — killed (cube = 3).

**Cheapest correct fix for L-1/L-2/L-3 (report only — not applied):** gate the two heavyweight subtrees on `active` and drop the `:key`.

---

## 2. MAJOR

### L-4 · MAJOR · the entire `isSingleSurfaceScene` flat-mount branch is unreachable, and its doc-block is factually inverted

**`ChannelControls.vue:15-35` (template) + `:326-336` (predicate)**

```ts
const isSingleSurfaceScene = computed(() =>
    tabsExternallyManaged &&
    machine.controlSurfaces.value.length === 1 &&
    builtInTabs.value.length === 0);
```

The comment asserts *"a scene whose DFA set is exactly ONE scene-specific surface (easing → ['easing'], spring → ['spring'])"*. Under the **T.B2 derivation the same file cites at `:344`**, that is false:

- `surfacesFor` (`demo/state/controlSurfaces.ts:107-119`): a selected channel carrying `animation` earns the whole `BUILT_IN_SURFACES` triad.
- easing's sole channel **paints** — `useEasingDemo.ts:352-354` `{ name: "Easing", animation: previewAnim, … }`, facets `[{surface:"easing"}]` ⇒ derived set = `[controls, keyframes, timeline, easing]`, `builtInTabs.length === 3`.
- spring's two channels both paint — `useSpringDemo.ts:406-427` ⇒ 4 surfaces, `builtInTabs.length === 3`.
- sequence's lone channel is light with **no** `surfaces` and `facets: []` (`useSequenceDemo.ts:424-434`) ⇒ set = `[]`, length 0, not 1.
- cube/square/amiga ride `facilityFromGroup` (`scene-facility/index.ts`), every channel painting ⇒ triad present.

No live facility can satisfy `length === 1 ∧ builtInTabs.length === 0`. On the standalone host the predicate is short-circuited `false` by `tabsExternallyManaged &&`. The branch never renders in either host.

Consequently the "NAMED SEAM" it advertises is dead too: `single-surface-panel` (`:26-31`) has **zero** other references anywhere in the repo (`grep -rl single-surface-panel` → this file plus three tranche docs). The seam exists for probes that do not exist.

**Falsifier.** A `SceneFacility` whose selected channel has neither `animation` nor `surfaces`, plus exactly one facet. Exhaustive scan of the six live facilities finds none. Adding such a scene revives the branch — the claim is "dead in the current tree", not "unimplementable".

### L-5 · MAJOR · in the shipped shell, the whole tab-strip half of this component is unreachable

**`App.vue:169`** — `provide(TABS_EXTERNALLY_MANAGED_KEY, true)`. `App.vue` is the only provider (`grep` over `demo/`), and `EditorShell` is rendered *inside* it (`App.vue:28`), so **every** routed `ChannelControls` sees `tabsExternallyManaged === true`.

Therefore `v-if="!tabsExternallyManaged"` at **`:56`** is always false, and the following are all unreachable at runtime in the shipped app:

| dead in the App | provenance |
|---|---|
| `<KfPillTabs>` render | `:74-82` |
| `stripOptions` (the computed is never read ⇒ never evaluated) | `:313-324` |
| `machine.extraControlTabs()` union branch | `:318-321` |
| `useTabStripScroll` → `overflowClass`, `reMeasure`, `useScrollFade` | `:398`, `composables/useTabStripScroll.ts` |
| `.tabs-overflow-{left,right,both}` scoped CSS (~15 lines) | `:441-455` |
| `@pointerenter`/`@focusin` interaction warm hooks | `:79-80` |
| `watch(() => storedControls.selectedControl, reMeasure)` | `:408` |

`builtInTabs` survives only because `isSingleSurfaceScene` reads its `.length` — and per L-4 that predicate is itself dead, so its `.map(s => SURFACE_META[s])` allocation is pure waste on every DFA change, ×N instances.

This **refines census S-1** ("It is live, not dead — rendered at ChannelControls.vue:74"): the *source reference* is live; the *render* is not, in the only routed shell. S-1's retire-it verdict is strengthened, not weakened — the fork's remaining runtime consumer is the un-routed standalone path.

**Falsifier.** A second provider of `TABS_EXTERNALLY_MANAGED_KEY` with `false`, or a mount path that bypasses `App.vue`. Neither exists in `demo/`; the only other reference is the key's own declaration (`injectionKeys.ts:4`) and this file's `inject` default.

### L-6 · MAJOR · the T.G9 interaction-warm contract is void in the shipped shell

**`ChannelControls.vue:79-80`** binds `warmKeyframes` to the strip's `@pointerenter`/`@focusin`. Per L-5 the strip never renders in the App. The composable's contract (`useKeyframesPaneReveal.ts:26-33`) promises the pane warms *"the instant the user selects/interacts with the keyframes surface — so the editor still opens instantly on tab-select (no UX regression)"*. In the App the only surviving warm paths are the unconditional idle warm and the `watch(keyframesActive)` **after** the store write, i.e. the documented pre-emptive hover warm is gone: a first tab-select pays the mount latency it was designed to hide.

**Falsifier.** If `ChromeDock` (the external tab host) also calls a warm hook — it does not; `grep -rn "warmKeyframes" demo/` returns only `useKeyframesPaneReveal.ts` and `ChannelControls.vue:79-80`. Practical severity is dampened because the idle warm usually lands first — the *contract*, not necessarily the frame budget, is what is broken. `UNPROVEN-NEEDS-LIVE` for the observable latency delta.

### L-7 · MAJOR · two `SURFACE_META` registries — the "exactly ONE module" invariant this file documents is false

**`ChannelControls.vue:294-296`**

> "the tab {label,icon} metadata resolves from the ONE `SURFACE_META` registry (controlSurfaces.ts); the former local `BUILT_IN_TAB_META` copy (one of the three hand-synced sites) is DELETED."

and **`:284-286`**: *"Reading the SAME projection the dock reads keeps the two tab hosts in lockstep — one authority, no drift."*

The tree disagrees. There are **two** registries, and the two hosts read **different** ones:

| symbol | copy A | copy B |
|---|---|---|
| `ControlSurfaceTab` | `demo/state/controlSurfaces.ts:134` | `demo/components/instrument/surfaceTabs.ts:6` |
| `SURFACE_META` | `controlSurfaces.ts:145` | `surfaceTabs.ts:12` |
| `extraTabsFrom` | `controlSurfaces.ts:189` | `surfaceTabs.ts:21` |
| `dockCardinality` | `controlSurfaces.ts:278` | `surfaceTabs.ts:25` |

`ChannelControls.vue:245-250` imports `SURFACE_META` from `@state` (copy A). `ChromeDock.vue:18-21` imports `SURFACE_META` **and** `dockCardinality` from `@components/instrument/surfaceTabs` (copy B) while importing `BUILT_IN_SURFACES` from copy A's module — a split-brain import in a single block. `useSceneMachine.ts:34-39` binds `extraTabsFrom` to copy A, so `machine.extraControlTabs()` and the dock's own label lookup traverse different maps.

The `controlSurfaces.ts:141-144` header makes the identical claim ("THE ONE SURFACE-METADATA REGISTRY … proof:dfa-derived's 'resolves from exactly ONE module' clause"). The cited gate is not runnable — `package.json:50-51` ships only `proof:publish` and `proof:owner-golden`; every other `proof:*` name in this cluster's prose is a retired grep idiom.

**Falsifier.** The two copies are currently **byte-equivalent in content**, so there is no observable drift *today* — this is a latent-drift + false-invariant finding, not a live rendering bug. It stops being latent the moment either copy is edited. That is why it is MAJOR, not BLOCKER.

### L-8 · MAJOR · three readers of "the active surface", two authorities — the single-authority contract is violated inside its own host

`useSelectedControlSurface.ts:33-40` declares `selectedControlSurface` **the** authority ("a MACHINE-PROJECTED, synchronously-correct value … no stale latch"). Its consumers in this file split:

| reader | authority used | line |
|---|---|---|
| controls panel gate | **projection** `selectedControlSurface` | `:98` |
| timeline panel gate | **projection** | `:150` |
| keyframes pane active/inert | **raw store** `storedControls.selectedControl` | `useKeyframesPaneReveal.ts:57` |
| timeline visibility (§L-1) | **raw store** | `:377-378` |
| teleport remount key (§L-2) | **raw store** | `:189` |
| strip re-measure trigger | **raw store** | `:408` |

Divergence is exactly `store ∉ activeSurfaces ∧ activeSurfaces ≠ []`, in which case the projection returns `activeSurfaces[0]` (`controlSurfaces.ts:204-212`). The reconciling watch (`useSelectedControlSurface.ts:89-102`) fires only on a **change of the projection** and is suppressed whenever `isActiveSceneHost` is false — i.e. through the whole `NAVIGATE → SCENE_READY` window, precisely when the leaving host is being re-gated by the *destination's* DFA set (`App.vue:248-256` recomputes `derivedSurfaces` from `sceneRef`/`isHome` while the host still carries the leaving scene's animation).

**Falsifier, run honestly.** I attempted and **failed** to construct a *steady-state* divergence that produces two visible panels: whenever `hasSurface('keyframes')` holds and the store says `"keyframes"`, the projection also returns `"keyframes"`, so the keyframes pane cannot be active while another panel is. The reachable damage is confined to the one-tick transition window and to the `isTimelineExpanded` disjunct (§L-1), which bypasses `hasSurface('timeline')` entirely and is the one place the raw read is unambiguously wrong. Rated MAJOR on the **contract** (a documented single authority with three bypasses, in a file whose comments claim "one authority, no drift"), with the steady-state double-panel hypothesis explicitly **withdrawn**.

---

## 3. MINOR

### L-9 · MINOR · `useTabStripScroll` resolves the tablist once, in `onMounted`, and can never recover
`composables/useTabStripScroll.ts:65-74` assigns `tabsListElRef` from `tabsHeaderEl.value?.querySelector("[role=tablist]")` inside `onMounted`. The header is behind `v-if` (`ChannelControls.vue:56`), so if it is absent at mount the ref stays `null` **forever** — nothing re-runs the resolve. `useScrollFade` faithfully re-binds on ref change (`useScrollFade.ts:104-114`), but the ref never changes. In the App the header is never present (L-5) so the whole probe is inert; in the standalone host a header that appears post-mount silently loses its fade. **Falsifier:** if the header's `v-if` condition is static per instance in *both* hosts — `tabsExternallyManaged` is a plain injected boolean (static), so the only dynamic path is via `isSingleSurfaceScene`, which is dead (L-4). Hence: currently latent, structurally fragile.

### L-10 · MINOR · a third nested `TooltipProvider`, with props identical to its ancestor, ×N per scene
`ChannelControls.vue:2` `<TooltipProvider :delay-duration="100" :skip-delay-duration="0">`, wrapping the entire template. Its ancestor `AnimationControlsGroup.vue:2` carries the **byte-identical** provider, and `App.vue:3` a third at the root. Per §0 this is one redundant provider **per channel** (3 on cube). **Falsifier:** if reka's `TooltipProvider` config were not inherited through provide/inject, the inner one would be required — it is inherited, and the props are identical, so the inner provider changes nothing except instance count.

### L-11 · MINOR · `any`-typed template ref plus a dead unwrap branch
`ChannelControls.vue:388` `useTemplateRef<any>("keyframesPaneEl")` — the ref is a plain `<div role="tabpanel">` (`:129-137`), so `HTMLElement` is exact. The composable then types it `Ref<any>` (`useKeyframesPaneReveal.ts:17`) and unwraps `keyframesPaneEl.value?.$el ?? keyframesPaneEl.value` (`:128`) — a component-instance branch that the **same file's comment two lines above** says cannot occur ("The keyframes panel is now a plain `[role=tabpanel]` div ref"). `any` + dead defensive branch + self-contradicting comment. **Falsifier:** if the ref could ever bind a component root — it cannot; the template node is a literal `div`.

### L-12 · MINOR · dead widening + coercion in `selectControl`
`ChannelControls.vue:400-405` takes `key: string | number` and calls `.toString()`. Its only caller is `@update:model-value` from `KfPillTabs`, whose emit is typed `{"update:modelValue": [value: string]}` (`KfPillTabs.vue:61`) and whose payloads are `opt.value: string` (`useKfPillTabs.ts:23-27`). The `number` arm and the coercion are unreachable. It is also `defineExpose`d (`:414`) and called by `AnimationControlsGroup.vue:319` `ctrl?.selectControl?.(tab)` with a `string`. **Falsifier:** a caller passing a number — none exists.

### L-13 · MINOR · both composable option types declare a **writable** `Ref` for a readonly template ref
`useTabStripScroll.ts:6` `tabsHeaderEl: Ref<HTMLElement | null>` and `useKeyframesPaneReveal.ts:17` `keyframesPaneEl: Ref<any>`. The callers pass `useTemplateRef(...)`, which returns `Readonly<ShallowRef<T | null>>`. TypeScript permits the assignment (readonly property modifiers are not checked in assignability), so this compiles — and the contract therefore *lies*: a future write inside either composable would type-check and fail at runtime. `Readonly<ShallowRef<…>>` is the honest annotation. **Falsifier:** if either composable already wrote to the ref, this would be a live bug rather than a latent one — neither does.

### L-14 · MINOR · the same prop is typed by two different option interfaces across four files
`extraTabs` is `SegmentedTabOption[]` in `EditorShell.vue:169`, `AnimationControlsGroup.vue:173`, `ControlsPaneWrapper.vue:198` — and `KfPillTabOption[]` here (`ChannelControls.vue:271`). It type-checks (structural, `KfPillTabOption ⊂ SegmentedTabOption`), but the seam's identity changes at the last hop. This **is census S-2** ("the demo has adopted glass-ui's tab data contract while rejecting its renderer"), instantiated at the consumer: the glass-ui shape is threaded three levels and then silently re-typed. **Falsifier:** if `KfPillTabOption` ever gains a required field absent from `SegmentedTabOption`, the seam breaks — today it does not.

### L-15 · MINOR · component and its type imported through two different paths, on adjacent lines
`ChannelControls.vue:229-230`
```ts
import KfPillTabs from "../KfPillTabs.vue";
import type { KfPillTabOption } from "../composables/useKfPillTabs";
```
`transport/composables/useKfPillTabs.ts` is a 4-line re-export shim over `transport/KfPillTabs/useKfPillTabs.ts`. This is **census lane-library §7.3** verbatim, confirmed at the tree: a back-compat shim in violation of `feedback_no_backwards_compat`, and this file is its **sole** consumer. Also note the directory `KfPillTabs/` sits beside the file `KfPillTabs.vue`, so `../KfPillTabs` is ambiguous to a reader (census §7.4). **Falsifier:** a second consumer of the shim — `grep` finds none.

### L-16 · MINOR · engine fields bound as props across a `markRaw` boundary
`ChannelControls.vue:194-195` `:targets="animation.targets"` / `:animation-options="animation.options"`. `KeyframesAnimation` declares both as plain mutable fields (`src/animation/engine/animation.ts:63,65`) and exposes `setTargets` (`:465-467`) which **reassigns** `this.targets`. The demo calls it live — `useCubeDemo.ts:155-158`, `SquareScene.vue:198`, `CubeTarget.vue:217`. The animations are `markRaw`'d (`useCubeDemo.ts:65,79,109`; `SquareScene.vue:174`; `useEasingDemo.ts:138,289`), so `animation.targets` is **not** a tracked dependency: a post-mount `setTargets` does not re-render this component and `KeyframeTimeline`'s `targetsRef = computed(() => props.targets)` (`KeyframeTimeline.vue:189`) keeps the stale array until some *unrelated* reactive dep forces a re-render. **Falsifier:** if every `setTargets` provably precedes any `KeyframeTimeline` mount. That ordering is plausible (the timeline mounts lazily on surface selection, scene `setTargets` runs in scene `onMounted`) but is **not** guaranteed for a bucket persisted with `selectedControl === "timeline"`. Correctness here rests on an incidental re-render, which is the defect regardless of whether it currently bites. `UNPROVEN-NEEDS-LIVE` for the observable stale-target frame.

### L-17 · MINOR · tab icon metadata is resolved, carried, then silently dropped
`ChannelControls.vue:299-303` maps surfaces through `SURFACE_META[s]`, which carries `icon` (`controlSurfaces.ts:145-160`). `stripOptions` (`:313-324`) explicitly strips it for the machine branch (`{value, label}`) but passes it through for `builtInTabs` — and `KfPillTabOption` has no `icon` field (`useKfPillTabs.ts:23-27`) and `KfPillTabs.vue:19-34` renders `{{ opt.label }}` only. So the built-in tabs carry a dead `icon` property and the extra tabs are pre-stripped — two different treatments of the same non-fact. glass-ui's `SegmentedTabOption` *does* support `icon` (`dist/components/tabs/SegmentedTabs.vue.d.ts:5-11`), which is the capability the fork dropped (folds into census S-1). **Falsifier:** if `KfPillTabs` rendered icons — it does not.

---

## 4. INFO

### L-18 · INFO · "THE ONE WRITER" is N writers
`useSelectedControlSurface.ts:88` / `ChannelControls.vue:338-345` name the derivation-sync "THE ONE WRITER (J.W2 S2)". Per §0 there are N mounted hosts, hence N instances of that watch, all writing the same shared `storedControls.selectedControl`. The write is idempotent and `!==`-guarded (`:96`), so the *effect* is benign; the *invariant name* is false, and the `isActiveSceneHost` suspend-gate (`:75-79`) is evaluated identically N times because every channel of a scene shares one `superKey`. **Falsifier:** if the guard were absent, this would be a write storm — it is present, so this is documentation-vs-tree, not behavior.

### L-19 · INFO · the comment mass is stale archaeology, and several blocks are counterfactual
Roughly 45 % of this 456-line file is provenance prose. Beyond L-4/L-5/L-7, concretely wrong blocks:
- `:207-214` describes a *non-scoped* `[data-state=active][role=tabpanel]` panel-slide and surviving `.tab-trigger-*` skins "HERE". This SFC has **only** `<style scoped>` (`:417-456`) and contains **no** `.tab-trigger-*` rule; those live globally in `demo/styles/tab-idiom.css:22-59`.
- `:86,:305` and `useTabStripScroll.ts:23,47` still describe `<SegmentedTabs>` as owning the strip — the strip is `KfPillTabs` (census S-2 flagged the same prose; confirmed).
- `:41-55` explains why "no scroller is wired here" and then wires one (`:398`).
- All three colocated composables document themselves as belonging to **`AnimationControls.vue`** (`useSelectedControlSurface.ts:28`, `useKeyframesPaneReveal.ts:37-38`, `useTabStripScroll.ts:18`); the file is `ChannelControls.vue`.
- `:341-345` and `useSelectedControlSurface.ts:29-31` justify a *placement decision* ("`stripOptions`/`builtInTabs` deliberately stay HERE (the proof:scene-control-dfa D1 source anchor greps the host)") on a grep gate that does not exist — `package.json:50-51` ships two `proof:*` scripts, neither of them this one. The user's own standing feedback retired the grep-based `proof:*` idiom as "overfit junk"; a live source-layout decision still rests on it.
**Falsifier:** any of these being true in the tree. Each was checked by direct grep.

### L-20 · INFO · glass-ui phantom-dep exposure at this component
Census **F-1**: `@mkbabb/glass-ui` is absent from both `package.json` and `package-lock.json` while 7.0.0 sits installed. This component's exposure: `ChannelControls.vue:219` imports `TooltipProvider` + `Button` from the **root barrel**, and its transitive children add `@mkbabb/glass-ui/{dock,tooltip,labeled-field}` (`ChannelOptions.vue:408-423`). On a clean `npm ci` this file fails to resolve at its first import. Additionally, the *reason* the local `KfPillTabs` fork exists (`KfPillTabs.vue:2-12`: glass-ui 4.0.1's unconditional `aria-orientation`) is three majors stale against the installed 7.0.0 — S-1 verified; I re-confirmed the conditional emission at `node_modules/@mkbabb/glass-ui/dist/components/tabs/SegmentedTabs.vue.d.ts` and the shipped `useTabRovingFocus`. **Falsifier:** a workspace link or `.npmrc` resolution making the undeclared dep reproducible — census F-1 checked both (`legacy-peer-deps=true`, real directory, not a symlink, no submodule).

---

## 5. Hypotheses formed and **KILLED** (recorded so they are not re-run)

| # | hypothesis | killer |
|---|---|---|
| K-1 | Steady-state double-panel: keyframes pane active while another panel renders | `store === "keyframes" ∧ hasSurface("keyframes")` ⇒ projection `=== "keyframes"`; contradiction. Withdrawn (survives only as the L-8 contract claim). |
| K-2 | `ChromeDock` writes a raw (unprojected) pick, stranding an invalid store value | `App.vue:307-310` projects: `machine.selectedControlSurface(v) ?? v`. |
| K-3 | A channel switch can strand `selectedControl` outside the DFA set | If `store ∈ set_old` then `projection_old === store`; if `store ∉ set_new` then `projection_new === set_new[0] ≠ projection_old` ⇒ the watch **does** fire. |
| K-4 | Teleport target missing ⇒ dev warning / lost content | `#timeline-expanded-target` exists at `AnimationControlsGroup.vue:80`, an ancestor. |
| K-5 | `.tabs-overflow-*` scoped CSS cannot reach `KfPillTabs`' root | Vue scoped CSS stamps the parent scope id on a child component root; it matches. |
| K-6 | `scrollIntoView` would scroll the page, not the strip | The header carries `overflow-hidden`, which **is** a scroll container for `scrollIntoView`. |
| K-7 | `useTimeoutFn` callback references `warmKeyframes` before its `const` — TDZ | Referenced inside a closure invoked later; no TDZ. |
| K-8 | rIC / fallback timer leak on unmount | `onScopeDispose` cancels the handle (`useKeyframesPaneReveal.ts:115-121`); the vueuse timer scope-disposes. Clean. |
| K-9 | `stripOptions` excess-property error (`icon` ∉ `KfPillTabOption`) | Excess-property checks do not apply to spreads/non-fresh literals. Compiles. |
| K-10 | `SegmentedTabOption` → `KfPillTabOption` prop mismatch is a type error | Structurally assignable; downgraded to L-14. |
| K-11 | Emit payload drift `ChannelOptions` → `ChannelControls` → parent | `sliderUpdate {t,animation}`, `keyframesUpdate {animation}`, `layerConfigUpdate Partial<AnimationLayerConfig>` all match at every hop. |
| K-12 | `blendAvailable` is used in the template but omitted from the props destructure ⇒ broken | Template access goes through the props proxy; correct, merely inconsistent with the five destructured siblings. |
| K-13 | `KeyframeTimeline` `targets: HTMLElement[]` mismatches the engine field | `animation.ts:63` `targets: HTMLElement[]`. Exact match. (Reactivity is the real issue — L-16.) |
| K-14 | The mask-image edge fade repeats past the strip's border box | Requires layout measurement; not statically decidable. **UNPROVEN-NEEDS-LIVE**, deferred to SS-13 rather than claimed. |

---

## 6. SUPERLATIVES (L-18 both ways — each with its falsifier)

### SUP-1 · the inactive-pane caching design is genuinely exemplary
`ChannelControls.vue:117-137` + `:417-433` + `useKeyframesPaneReveal.ts:36-50`. Four correct decisions stacked: (a) force-mount + `content-visibility:hidden` instead of unmount, so a switch-back does not re-spin Monaco's worker/model/themes; (b) `inert` rather than bare `aria-hidden`, explicitly to avoid leaving focusable Monaco descendants in the tab order — the `aria-hidden-focus` defect, named and closed in the comment; (c) an `@supports not (content-visibility: hidden)` fallback to `display:none` that trades the cache for correctness rather than breaking; (d) a reveal-time `focus()` on `nextTick` so the restored pane owns the tab sequence and Monaco re-measures on the restored layout pass. Teardown is complete on both timers (`onScopeDispose` + vueuse scope). This is the standard the rest of the file should be held to. **Falsifier:** if `content-visibility:hidden` did not preserve the subtree, or if `inert` were unsupported without a fallback — neither holds (Baseline 2025-09-15, correctly cited in the comment). *(The praise is for the mechanism; L-3 is a separate fault in* who *gets one.)*

### SUP-2 · `useSelectedControlSurface`'s suspend-on-leave gate is a real cure, not a band-aid
`useSelectedControlSurface.ts:75-102`. The active-surface value is a **pure function** of (DFA set × stored pick) — born correct on the mounting tick rather than latched and repaired on `nextTick` — and the reconciling write is additionally gated on `animation.superKey === ACTIVE_SCENE_KEY`, so a host still displaying the *leaving* scene's animations during the `NAVIGATE → SCENE_READY` window cannot write the *destination's* projection into the leaving scene's persisted bucket. That is a precise, correctly-scoped fix for a real cross-scene store-corruption class, and the reasoning is legible at the seam. **Falsifier:** if `activeSuperKey` could lag `machine.activeScene` the gate would be theatre — `App.vue:231` provides `currentSuperKey` atomically with the scene id.

### SUP-3 · exemplary engine-consumption idiom: `trySetOption`
`ChannelOptions.vue:461-476`. The engine's option setters are deliberately fail-explicit (`AnimationOptionError`); mid-keystroke input is routinely malformed. The guard catches **by error name and re-throws everything else** — it does not blanket-swallow — and the store still records the raw string so the field round-trips while the engine stays authoritative. This is exactly how a fail-explicit library API should be consumed from a live-editing UI, and it is rarer than it should be. **Falsifier:** a bare `catch {}` or a swallowed foreign error — neither is present (`:473` re-throws).

### SUP-4 · `useKfPillTabs` implements the APG tablist contract correctly, including the half most implementations drop
`useKfPillTabs.ts:46-90`. Arrow/Home/End move **DOM focus** (`focusTab` → `nextTick(() => btn?.focus())`) in addition to flipping the reactive tab stop — the docblock (`:14-21`) names the precise prior bug (focus pinned to a now-`tabindex=-1` button, traversal collapsing one hop, a third tab unreachable) — and `rovingValue` falls back to the first enabled tab when `modelValue` matches nothing, so the strip is never Tab-unreachable. Disabled options are filtered out of the traversal set. Correct automatic-activation semantics. **Falsifier:** if focus were moved without selection following, or if an all-disabled strip threw — `:65` guards `en.length === 0` and `:87-89` does both halves. *(This does not contest census S-1's retire verdict: glass-ui 7.0.0 ships `useTabRovingFocus` with the same contract. It records that the fork being retired is a good one, so the swap must be verified not to regress it.)*

---

## 7. Fold table — census overlaps and one refinement

| census id | disposition here |
|---|---|
| **F-1** phantom glass-ui dep | cited, exposure at this component enumerated (L-20) |
| **S-1** retire `KfPillTabs` + `useKfPillTabs` | **refined**: the strip is source-live but *runtime-unreachable in the App shell* (L-5), which strengthens the verdict; and the fork's a11y quality is recorded (SUP-4) so the swap is verified, not assumed |
| **S-2** type-only `/tabs` consumption; prose/tree disagreement | confirmed and localized (L-14, L-19) |
| **lane-library §7.3** `useKfPillTabs` shim, incoherent dual-path import | confirmed verbatim (L-15) |
| **lane-library §7.4** duplicate-name hazard `KfPillTabs.vue` vs `KfPillTabs/` | confirmed (L-15) |
| — | **new, not in the census**: L-1, L-2, L-3, L-4, L-6, L-7, L-8 |
