claude-opus-5[1m]

# CHALLENGE · `ControlsPaneWrapper` · axis **L (LIBRARY)**

**Target:** `/Users/mkbabb/Programming/keyframes.js/demo/components/instrument/transport/controls-pane/ControlsPaneWrapper.vue` (319 lines)
**Colocated:** `./ControlsPaneWrapper.css` (148 lines), `./RibbonBar.vue` (151)
**Composables (NOT colocated — see mi-1):** `../ControlsPaneWrapper/{usePaneRegister,useControlsLayout,usePaneHover}.ts`
**Mode:** static, read-only. No installs, no dev server, no browser. Every runtime-visual consequence is marked **UNPROVEN-NEEDS-LIVE** and deferred to SS-13; every *mechanism* claim is traced in-tree.
**Posture:** the component is assumed DEFECTIVE until the tree acquits it. A false defect is worse than a missed one — §5 lists the four claims I built and then **killed** against the tree.

**Read whole:** the SFC, its CSS, `RibbonBar.vue`, all three composables, `useScrollFade.ts`, `usePaneHover.ts`, the parent `AnimationControlsGroup.vue` + `.css`, the child `ChannelControls.vue`, `useKeyframesPaneReveal.ts`, `transportSource.ts`, `state/controlOptionsStore.ts`, `state/storeUtils.ts`, `state/controlSurfaces.ts`, `composables/scene-facility/index.ts`, `vite.config.ts`, `tsconfig.json`, `package.json`, and the installed `@mkbabb/glass-ui@7.0.0` `dist/drawer.js` + `dist/components/drawer/*.d.ts` + `dist/components/tabs/SegmentedTabs.vue.d.ts`.

**Tally:** 1 BLOCKER · 5 MAJOR · 9 MINOR · 3 INFO · **4 superlatives**.

---

## 0. Headline

| id | severity | claim | anchor |
|---|---|---|---|
| **B-1** | **BLOCKER** | This file is the demo's **sole** `@mkbabb/glass-ui/drawer` consumer; glass-ui is in neither `package.json` nor `package-lock.json`, and no vite alias shims it. `npm ci` → this module does not resolve → the whole transport tree fails to build. | `:166` |
| **M-1** | MAJOR | The `animControlRefs` function-ref **drops Vue's unmount `null` callback** (`if (el)`), and nothing anywhere deletes a key — stale unmounted `ChannelControls` instances are retained and are still reachable from live keyboard shortcuts. | `:51` |
| **M-2** | MAJOR | `isPanelTransitionDone` is a latch that can be **cleared but never set**: its only setter is gated on a `max-height` `transitionend` that no stylesheet in the demo *or* in glass-ui 7.0.0 emits. | `useControlsLayout.ts:31-38` |
| **M-3** | MAJOR | `paneScrollable` is **inert on both layouts** — mobile is hard-overridden by unlayered scoped CSS, desktop has no bounded ancestor height for a scroll container to form against. ~30 lines of machinery move zero pixels. | `:299-303` |
| **M-4** | MAJOR | `v-show` mounts **every** control host, not just the selected one — multiplying Monaco warms, `KeyframeTimeline` instances and store lookups by N (3 on cube/amiga), and teleporting N timelines into **one** target id. | `:47-49` |
| **M-5** | MAJOR | The component's four `any`-typed props + the glass-ui→bespoke option-type bridge + the `activeSnap` v-model variance have **zero gate coverage**: `npm run check` is `tsc --noEmit`, not `vue-tsc`. No `.vue` file in this repo is ever typechecked. | `:194-198`, `package.json` |

---

## 1. BLOCKER

### B-1 · the phantom dep lands *hardest* on this file — it is the demo's only `/drawer` consumer

**Provenance.**

```
ControlsPaneWrapper.vue:166  import { Drawer, DrawerContent, DrawerTitle } from "@mkbabb/glass-ui/drawer";
ControlsPaneWrapper.vue:165  import type { SegmentedTabOption } from "@mkbabb/glass-ui/tabs";
```

```
$ grep -n "glass-ui" package.json          → (no match, exit 1)
$ grep -c "glass-ui" package-lock.json     → 0
$ node -e "…@mkbabb/glass-ui/package.json" → 7.0.0     (installed, unlocked, undeclared)
$ grep -rn "glass-ui/drawer" demo/         → 1 hit — THIS file
$ vite.config.ts:37-59  alias keys → @src, @mkbabb/keyframes.js, @styles, @state,
                          @components, @utils, @kf-engine, @composables, @app, @assets
                          (no @mkbabb/glass-ui entry)
```

**Why it is a BLOCKER *here* specifically, beyond census F-1's repo-level statement.** F-1 established the phantom dep; this challenge adds the blast radius. `/drawer` is a **runtime value import** with exactly one consumer in the whole demo — this component. It is not lazily loaded, not behind a `defineAsyncComponent`, and its consumer is imported **statically** by the parent (`AnimationControlsGroup.vue:128 import ControlsPaneWrapper from "./controls-pane/ControlsPaneWrapper.vue"`), which is itself in every scene's shell path. So the failure is not "the mobile drawer degrades" — it is "the module graph has an unresolvable edge at the root of the transport tree." Both `vite build --mode gh-pages` and `vite` dev die at the same import on a clean checkout. The demo survives today only because a `Jul 16 05:17` install predates whatever removed the declaration (census §2).

The self-alias makes this *worse*, not better: `vite.config.ts:28-36` documents that glass-ui's own bare `@mkbabb/keyframes.js` import is only satisfiable because the demo aliases it to `src/animation/index.ts`. So keyframes.js's demo depends on glass-ui, glass-ui peer-depends on keyframes.js, and the cycle is held shut by an alias on one side and **nothing at all** on the other.

**Corroborates:** census `lane-frontend.md` F-1 (RED) and its §8 wiring note. **Contradicts nothing.**

**Falsifier.** Any of: (a) a `@mkbabb/glass-ui` entry appearing in `package.json` *and* `package-lock.json`; (b) a `resolve.alias` / `optimizeDeps.include` / `build.rollupOptions.external` entry covering the bare specifier — I enumerated the alias map above and there is none; (c) a demonstration that `npm ci` retains undeclared `node_modules` subtrees (it does not — `npm ci` deletes `node_modules` wholesale before installing from the lock).

---

## 2. MAJOR

### M-1 · the ref registry leaks: `if (el)` swallows Vue's unmount callback

```vue
:51   :ref="(el: any) => { if (el) animControlRefs[host.name] = el }"
```

`animControlRefs` is the parent's registry (`AnimationControlsGroup.vue:191 const animControlRefs = reactive<Record<string, any>>({})`), passed **down** as a prop (`:194`) and written **only** here.

Vue invokes a function ref with the instance on mount and with **`null` on unmount**. The `if (el)` guard is precisely the branch that would clear the entry — so nothing is ever cleared:

```
$ grep -rn "delete animControlRefs|animControlRefs\[.*\] = null|Object.keys(animControlRefs)" demo/
→ (no output)
```

The registry has exactly four readers, all in the parent, all `?.`-chained:

```
AnimationControlsGroup.vue:195   animControlRefs[name]?.keyframesControlsRef
AnimationControlsGroup.vue:200   animControlRefs[name]?.timelineRef
AnimationControlsGroup.vue:318   const ctrl = animControlRefs[name]; ctrl?.selectControl?.(tab)
```

**Failure scenario (concrete).** Mobile layout. The user is on a scene whose start screen returns (`hideControls` → `showSheet` false, `:231-233`). The Drawer is `v-if`-gated (`:117`) so the **entire** pane body unmounts, taking all `ChannelControls` with it. `animControlRefs` still holds every one of them. `activeKeyframesRef` (`:193-196`) therefore still resolves to a **dead** component instance, and `useControlsKeyboardShortcuts` (wired at `AnimationControlsGroup.vue:322-332` with `activeKeyframesRef` / `activeTimelineRef`) is *still mounted and listening*. A shortcut keystroke calls `copyCSS()` / `snapshot()` on an unmounted component whose reactive effects are stopped and whose DOM is gone. Because every call site is `?.`-chained, the result is a **silent no-op**, not an error — the most expensive failure mode to diagnose.

Second scenario (retention): each retained `ChannelControls` transitively retains its force-mounted `KeyframesStringControls`/Monaco subtree (`ChannelControls.vue:129-147`, "the pane is ALWAYS rendered while the surface is valid… never torn down"). The registry is the GC root that keeps them alive after unmount.

Third scenario (key churn): the inline arrow re-identifies every render, so Vue re-runs `setRef` on each patch. A host whose `name` changes while its `animation.id` stays (same vnode key, `:47`) re-registers under the **new** name and leaves the old name pointing at the same live instance — two keys, one component, one of them permanently wrong for `switchTab`.

**Severity rationale:** MAJOR not BLOCKER — it degrades silently rather than crashing, and on the desktop path (`v-show`, `:144`) the hosts stay mounted so the stale window is narrow.

**Falsifier.** (a) Show Vue does *not* invoke function refs with `null` on unmount (it does — documented, and `useDrawerSnap.d.ts`'s own `contentEl` doc-comment in the installed glass-ui warns about exactly this class of bug: *"the writer's `if (el)` guard skips forever"*). (b) Find a cleanup site I missed — the grep above is the whole tree. (c) Show `animControlRefs` is recreated on every host change: it is created once in the parent's setup and the parent is keyed only by `superKey` (`EditorShell.vue:76`), i.e. per **scene**, not per channel.

---

### M-2 · `isPanelTransitionDone` is a one-way latch — the transition it waits on does not exist

```ts
useControlsLayout.ts:22   const isPanelTransitionDone = ref(storedControls.isControlsPanelOpen);
useControlsLayout.ts:24-29 watch(() => storedControls.isControlsPanelOpen, (open) => { if (!open) isPanelTransitionDone.value = false; });
useControlsLayout.ts:31-38 const onPanelTransitionEnd = (e: TransitionEvent) => {
                             if (e.propertyName === "max-height" && storedControls.isControlsPanelOpen)
                                 isPanelTransitionDone.value = true;
                           };
```
Bound once, on the desktop branch only: `ControlsPaneWrapper.vue:145 @transitionend="onPanelTransitionEnd"`.

**The gate can never fire.** The wrapper's own stylesheet *deleted* the `max-height` axis and says so:

```
ControlsPaneWrapper.css:83   .controls-pane-wrapper { max-height: none; … }
ControlsPaneWrapper.css:93-95 /* The desktop open/close axis is the [rail]-track collapse; the F9
                                 idle-fade OPACITY transition is the only transition that remains. */
                              transition: opacity var(--duration-normal) var(--ease-standard);
```

Exhaustive search for a `max-height` transition that could bubble to `:145`:

```
$ grep -rn "transition-\[max-height|transition:.*max-height|transition-property.*max-height" demo/ --include=*.css --include=*.vue
→ components/instrument/transport/AnimationControlsGroup.vue:83   'transition-[max-height,opacity] duration-slow ease-standard'
$ grep -rho "transition[^;{}]*max-height[^;]*" node_modules/@mkbabb/glass-ui/dist/styles/ node_modules/@mkbabb/glass-ui/dist/*.css
→ (no output)
```

The **one** hit is `#timeline-expanded-target` — a **sibling** of `.controls-pane-wrapper` (both are direct children of `.controls-layout`; `AnimationControlsGroup.vue:18` and `:79`), so its `transitionend` never traverses the wrapper. `KeyframeTimeline` *teleports into* that sibling (`ChannelControls.vue:186`), which moves the DOM further away, not closer. glass-ui 7.0.0 ships zero `max-height` transitions.

**Consequence chain.** The latch is seeded `true` only when the persisted store happens to be open (`controlOptionsStore.ts:45` default `isControlsPanelOpen: true`). The moment the user closes the rail — via `App.vue:16 @toggle-controls-panel`, `ChromeDock.vue:330`, or `SequenceScene.vue:31` — the watch clears it, and **no code path can ever set it true again for the lifetime of the component**. Because the store is `useStorage`-persisted (`controlOptionsStore.ts:49`), a user who closed the pane in a prior session starts the next session with the latch already dead.

Downstream: `paneScrollable`'s desktop arm (`:302`) and `useScrollFade`'s `retrigger` (`useControlsLayout.ts:80`) both read it. The scroll-fade still self-corrects via its `useResizeObserver` (`useScrollFade.ts:107`), so the visible damage lands entirely on M-3.

**Note the in-tree contradiction:** `ControlsPaneWrapper.vue:296-298` asserts *"The desktop path keeps the `isPanelTransitionDone` latch (the max-height transitionend gate)"* while `ControlsPaneWrapper.css:93-95`, in the same component, asserts the opposite. Two authorities, one file pair, mutually exclusive.

**Falsifier.** Produce any rule anywhere in the served cascade that transitions `max-height` on `.controls-pane-wrapper` or on a **descendant** of it (a descendant would bubble and revive the latch). Both greps above are exhaustive over `demo/` and over the installed glass-ui CSS. Tailwind's `transition-*` utilities can only appear via a class string, and no class list on the wrapper's subtree contains one.

---

### M-3 · `paneScrollable` cannot produce a scroll container on **either** layout

```ts
:299-303  const paneScrollable = computed(() =>
              isMobileLayout.value
                  ? props.storedControls.isControlsPanelOpen
                  : isPanelTransitionDone.value && props.storedControls.isControlsPanelOpen);
:36       paneScrollable ? 'overflow-y-auto' : 'overflow-hidden',
```

**Mobile arm — hard-overridden by the component's own stylesheet.**

```css
ControlsPaneWrapper.css:40-46
@media (max-width: 1023px) {
    .controls-drawer-content .controls-pane {
        min-height: 0; flex: 1 1 auto; overflow-y: auto; touch-action: pan-y;
    }
}
```

`overflow-y: auto` / `overflow-hidden` are Tailwind utilities and therefore live inside a cascade layer — `node_modules/tailwindcss/index.css:1` is literally `@layer theme, base, components, utilities;`. A `<style scoped src>` block emits **unlayered** CSS, and unlayered declarations beat *every* layered one regardless of specificity. The scoped rule also wins on specificity independently (`(0,2,0)` + the `[data-v-*]` scope attribute vs `(0,1,0)`). Both selector halves carry the scope id: `.controls-drawer-content` is bound on `<DrawerContent>` (`:127`) whose root inherits the parent scope id, and `.controls-pane` (`:35`) is compiled in this component's render context even though `createReusableTemplate` relocates it. **The mobile ternary arm is dead: the sheet body scrolls at every detent, peek included.**

**Desktop arm — no bounded ancestor, so `overflow-y:auto` forms no scroller.** Trace the height chain upward from `.controls-pane`:

| element | height authority |
|---|---|
| `.controls-pane` (`:30-38`) | **none** — grep for `.controls-pane` across all `demo/**/*.{css,vue}` returns no height/max-height rule outside the mobile `@media` block |
| `.controls-pane-wrapper` (`:142-155`) | `display: block; overflow: hidden` (`ControlsPaneWrapper.css:87-89`); no height |
| `.controls-layout` grid item placement | `grid-row: stage` (`AnimationControlsGroup.css:199-202`) in a `1fr` track — **but** the grid carries `items-start` (`AnimationControlsGroup.vue:5`), i.e. `align-items: start`, so the item is **content-sized, not stretched** |

`overflow-y: auto` on an auto-height block whose parent is an auto-height block cannot scroll — the box simply grows. So the desktop arm is inert *even when the M-2 latch happens to be true*, and once M-2 kills the latch the class flips to `overflow-hidden`, which is equally inert for the same reason. Note the inner scroller in `ChannelControls.vue:85` (`flex-1 min-h-0 overflow-y-auto`) is defeated by the same chain: its `h-full` (`ChannelControls.vue:4`) resolves against an auto-height parent and therefore computes to `auto` (CSS 2.1 §10.5).

**Net:** `paneScrollable` (5 lines), `onPanelTransitionEnd` + `isPanelTransitionDone` + its watch (`useControlsLayout.ts:21-38`, ~18 lines), the `@transitionend` binding (`:145`), and the `retrigger` wiring (`useControlsLayout.ts:80`) form ~30 lines of load-bearing-looking machinery that moves **zero pixels**. Dead code with a convincing paper trail is the most expensive kind.

**UNPROVEN-NEEDS-LIVE:** whether desktop rail content actually exceeds the work-area height today (`.controls-layout` is `height: min(100dvh, --work-area-max-height)`, `AnimationControlsGroup.css:8`; `ChannelOptions.vue` is 609 lines of option grid + `RibbonBar`). If it does, the overflow spills out of the work area rather than scrolling. The *mechanism* claim above is static and does not depend on that measurement.

**Falsifier.** (a) Show a height/`max-height`/`flex` rule that bounds `.controls-pane` or `.controls-pane-wrapper` on desktop — my grep over `.controls-pane`/`.controls-content` is exhaustive. (b) Show `items-start` is overridden on the wrapper (`.stage-cell` overrides its own alignment at `AnimationControlsGroup.css:142-143`; the wrapper has no such rule). (c) Show Tailwind v4 emits utilities unlayered in this build — `@import "tailwindcss"` at `styles/style.css:1` pulls the layered index verbatim.

---

### M-4 · `v-show` mounts **every** host: N Monacos, N timelines, one teleport target

```vue
:46-49  <template v-for="host in controlHosts" :key="host.animation.id">
            <div v-show="storedControls.selectedAnimation == host.name">
                <ChannelControls … />
```

`v-show`, not `v-if`. Every channel's `ChannelControls` **mounts and runs**; N−1 are merely `display:none`.

`controlHosts` (`:207-228`) is one host per painting channel. For the group-clocked scenes that is one host per group animation:

```
scenes/cube/useCubeDemo.ts:67,101,112   matrixAnim / rotationAnim / hoverAnim  → superKey = SCENE_ID
scenes/amiga/useAmigaDemo.ts:143,145,147 spinning / bouncingX / bouncingY      → superKey = SCENE_ID
```

**N = 3**, and — decisively — **all three resolve the same store bucket**: `ChannelControls.vue:274` calls `getStoredAnimationGroupControlOptions(animation)`, which keys on `animation.superKey` (`storeUtils.ts:22-33`), which is the scene id for all of them. So every mounted host reads an identical `selectedControl` / `isTimelineExpanded`.

Three consequences, all structural:

1. **N Monaco instances.** `useKeyframesPaneReveal` calls `scheduleIdleWarm()` unconditionally at setup (`useKeyframesPaneReveal.ts:102`) — `requestIdleCallback`, or a 1.5 s vueuse fallback. Each host therefore flips `keyframesWarmed` and force-mounts `KeyframesStringControls` (`ChannelControls.vue:130,138`), whose `hasSurface('keyframes')` gate is the **machine-wide** projection (`ChannelControls.vue:297-298`), identical across hosts. The composable's own header states the reason it exists: *"Monaco-eager… mobile LCP 10–16 s"* (`useKeyframesPaneReveal.ts:60-67`). Mounting N of them re-inflates, ×3, precisely the cost the composable was written to cure — and N−1 instantiate inside `display:none` subtrees where they render nothing.
2. **N `KeyframeTimeline`s into one target id.** `isTimelineVisible = selectedControl === "timeline" || isTimelineExpanded` (`ChannelControls.vue:377-379`) is shared, so when the timeline surface is selected all N mount a timeline. When expanded, `<Teleport to="#timeline-expanded-target" :disabled="!isTimelineExpanded">` (`ChannelControls.vue:186`) hoists all N **out of** the `v-show`'d wrapper into the single target element declared once at `AnimationControlsGroup.vue:79-88`. The `v-show` that was hiding N−1 no longer applies to them.
3. **N duplicate ribbon teleport targets.** `RibbonBar.vue:7` renders `id="controls-ribbon-target"` — and `RibbonBar` is inside the shared body, so this is single-instance; but `ChannelOptions` teleports *into* it while N hosts are live. Flagged as adjacent, not claimed.

The header comment at `:41-44` defends the **key** choice ("an ChannelControls instance is BORN with its animation and dies with it") but says nothing about mount-all — and the key it describes ("KEYED by the animation name") is not the key in the code (`host.animation.id`).

**Severity rationale:** MAJOR not BLOCKER — the app functions; the cost is bytes, memory and (2) duplicate DOM. Escalate to BLOCKER if SS-13 confirms three stacked timelines are *visible* in the expanded bar.

**UNPROVEN-NEEDS-LIVE:** the visible triple-timeline in (2), and whether Monaco's `editor.create` actually runs inside a `display:none` subtree (it is called from `onMounted`, so it should).

**Falsifier.** (a) Show `controlHosts` is length 1 for every live scene — contradicted by the six `superKey = SCENE_ID` assignments above, which prove ≥3 animations per group on two scenes. (b) Show `hasSurface('keyframes')` is per-host — it reads `machine.controlSurfaces` (`ChannelControls.vue:297`), a single machine projection with no host parameter. (c) Show `defineAsyncComponent` defers resolution while hidden — it resolves on mount, and `v-show` mounts.

---

### M-5 · the type contracts are unenforced — `.vue` is never typechecked in this repo

```json
package.json  "check": "tsc --noEmit && tsc --noEmit -p tsconfig.test.json"
```

Plain `tsc`, not `vue-tsc`. `tsconfig.json`'s `include` is `["src/", "demo/"]`, but `tsc` cannot parse SFCs, so **no `.vue` file in keyframes.js is typechecked by any script.** The repo's strictness (`strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `verbatimModuleSyntax`) stops at the `.vue` boundary. That fact converts each of the following from "TypeScript will catch it" to "nothing will":

1. **Four `any` props** (`:194-196`): `animControlRefs: Record<string, any>`, `activeKeyframesRef: any`, `activeTimelineRef: any` — plus `AnimationGroup<any>` (`:182`). `RibbonBar.vue:139-140` re-declares the same two as `any` and calls into them with double-optional chaining: `activeKeyframesRef?.copyCSS?.()`, `?.formatCSS?.()`, `?.exportCompiledCSS?.()`, `?.applyCSSStyles?.()`, `activeTimelineRef?.snapshot?.()`, `?.openImportDialog?.()`, `?.exportCSS?.()`, `?.openAddCSSDialog?.()` (`RibbonBar.vue:20,28,40,53,76,84,92,100`). Eight buttons whose entire wiring contract is "hope the method exists." A rename on the far side of `defineExpose` (`ChannelControls.vue:410-414`) produces a **button that does nothing**, with no error and no type failure. This is the error-posture defect: the optional chain makes a broken wire indistinguishable from a disabled control.
2. **The glass-ui → bespoke option bridge.** `:198 extraTabs?: SegmentedTabOption[]` (`@mkbabb/glass-ui/tabs`) is forwarded at `:65 :extra-tabs="extraTabs"` into `ChannelControls.vue:271 extraTabs?: KfPillTabOption[]`. The shapes:
   ```
   SegmentedTabs.vue.d.ts:5-11  { label: string; value: string; icon?: string; disabled?: boolean; tooltip?: string }
   useKfPillTabs.ts:26-30       { label: string; value: string; disabled?: boolean }
   ```
   Structurally assignable, so this is **not** a type error — it is a **silent narrowing**: a standalone host that sets `icon` or `tooltip` on an extra tab (the exact reason `SegmentedTabOption` carries them) gets neither, because `KfPillTabs` implements a strict subset. The demo imports glass-ui's *data contract* to feed a renderer that cannot honour it. Corroborates census **S-2 / F-3**; sharpens them from "type-only consumption" to "type-only consumption that loses two fields at the terminal".
3. **`activeSnap` v-model variance.** `:284 const activeSnap = computed<number>({ get, set: (v: number) => … })`, bound `:123 v-model:active-snap-point="activeSnap"`. The producer's contract is wider in both directions: `Drawer.vue.d.ts` declares `activeSnapPoint?: number | string | null` and `"update:activeSnapPoint": (value: string | number | null) => any`. The setter's own body concedes it — `Number(v)` (`:291`) exists precisely because `v` may not be a number, while the annotation says it always is. `Number(null) === 0`, so a `null` writeback silently closes the panel. (The engine never emits `null` in practice — see §5 A-2 — so this is a latent contract lie, not a live bug.)

**Falsifier.** (a) Point at a `vue-tsc` invocation in `package.json`, CI, or a git hook — there is none in `scripts` (13 entries, listed in full during the probe). (b) Show `RibbonBar`'s methods are typed somewhere — both props are `any` at both ends. (c) Show `KfPillTabs` renders `icon`/`tooltip` — it accepts only `KfPillTabOption`.

---

## 3. MINOR

**mi-1 · split colocation — the component and its composables live in different directories.**
The SFC and its CSS are in `transport/controls-pane/`; its three composables are in `transport/ControlsPaneWrapper/` (`:172-173` import `"../ControlsPaneWrapper/…"`). There is no `ControlsPaneWrapper.vue` in the `ControlsPaneWrapper/` directory. A reader who greps `ControlsPaneWrapper/` finds three composables and no component; a reader who opens `controls-pane/` finds a component whose behaviour lives elsewhere. This is census §7.4's duplicate-name hazard (raised there for `KfPillTabs.vue` vs `KfPillTabs/`) recurring in a **worse** form — there the file and dir were siblings; here they are in different parents. *Falsifier:* find a `ControlsPaneWrapper.vue` inside `ControlsPaneWrapper/` (`ls` shows only the three `.ts` files).

**mi-2 · `usePaneRegister` returns a dead `isDesktop` and is otherwise a 41-line wrapper around `?? "subject"`.**
`usePaneRegister.ts:38` creates `useMediaQuery("(min-width: 1024px)")` and returns it (`:40`); the sole consumer destructures `const { stageMode } = usePaneRegister({…})` (`:236`). Grep for `isDesktop` across the demo returns only its own declaration, doc-comment and return. So every mount installs a `matchMedia` change listener that nothing reads. Strip it and the composable's whole remaining body is `computed(() => stageModeProp() ?? "subject")` — 41 lines, one expression: an *undersized* Goldilocks violation, the mirror of the oversize one its own header cites (`usePaneRegister.ts:22-23` "the K.WZ proof:demo-no-oversize seam"). *Falsifier:* a consumer of `isDesktop` anywhere; the grep is exhaustive.

**mi-3 · three `useMediaQuery` instances for one breakpoint in one subtree.**
`ControlsPaneWrapper.vue:254` `(max-width: 1023px)`, `useControlsLayout.ts:48` `(max-width: 1023px)`, `usePaneRegister.ts:38` `(min-width: 1024px)` — the same line drawn three times, one of them (mi-2) dead, and the two live ones expressed as complements rather than one shared source. `usePaneRegister.ts:26-28` even claims it "draws the SAME 1024px line every layout composable in this subtree draws," which is an argument for sharing that the code then declines to act on. *Falsifier:* show vueuse dedupes `matchMedia` per query string across call sites — it does not; each call constructs its own `MediaQueryList` listener.

**mi-4 · the emit block is a verbatim duplicate of the child's.**
`:305-316` re-declares six events whose signatures are copied from `ChannelControls.vue:352-370`. Five of six (`sliderUpdate`, `keyframesUpdate`, `togglePlay`, `scrubStart`, `scrubEnd`) are pure pass-through re-emissions (`:52-59`); only `layerConfigUpdate` adds information (`host.name`, `:55-57`). ~12 lines of type surface and 5 handler closures exist to move events one level. *Falsifier:* show any of the five is transformed — `:52-59` shows they are not.

**mi-5 · three documentation/code divergences inside this one component.**
(a) The header (`:19-21`) says *"subject scenes cap at 0.48 (sheet.top ≈ 52dvh)"*; the code says `EXPANDED_SUBJECT = 0.4` (`:275`); a third comment eight lines above the constant (`:270-274`) says 0.40/≈49dvh. (b) `ControlsPaneWrapper.css:20` repeats the stale *"subject 0.48 ≈ 52dvh reserve"*. (c) `:41-42` says the `v-for` is *"KEYED by the animation name"*; the key is `host.animation.id` (`:47`). Two of three prose sites are one revision stale and they disagree with each other, not merely with the code. *Falsifier:* a `0.48` literal anywhere in the SFC — there is none.

**mi-6 · loose equality on a `string | null` field.**
`:49` and `:64` use `storedControls.selectedAnimation == host.name`. The field is typed `string | null` (`controlOptionsStore.ts:15-18`) and the default seed is `""` (`:37`). No live break (`null == "x"` is `false`), but it is a lint-grade inconsistency in a repo running `strict` + `noUncheckedIndexedAccess`. *Falsifier:* a case where `==` is required here — there is none; both operands are `string|null`.

**mi-7 · the setup-time store write races the composable that already read the same field.**
`:260-262` mutates the parent's persisted store during the child's setup. But `useControlsLayout` ran ten lines earlier (`:250`) and already snapshotted the *pre-reset* value into `isPanelTransitionDone` (`useControlsLayout.ts:22`). The composable's non-immediate watch corrects it on the pre-flush pass, so there is no live bug — but the ordering is load-bearing and undocumented: moving `:236-250` below `:260` (or making the watch `immediate`) changes the seed. Compounding: this is a *child* writing a *parent-owned, localStorage-persisted* object at setup, so the write is observable across sessions. *Falsifier:* show the watch is `immediate` (it is not, `useControlsLayout.ts:24-29`) or that the mutation precedes the composable call (it does not).

**mi-8 · `storedControls` is reached by two independent paths.**
The wrapper receives it as a prop (`:187`, threaded from `AnimationControlsGroup.vue:176`), while the child independently re-derives the **same object** via `getStoredAnimationGroupControlOptions(animation)` (`ChannelControls.vue:274`) — identical because all of a scene's animations share `superKey` (`storeUtils.ts:22-33`). Two routes to one reactive object; a future divergence in either route is invisible. *Falsifier:* show the two resolve different buckets — they cannot, given the shared `superKey`.

**mi-9 · redundant guard.**
`RibbonBar` is gated `v-if="storedControls.selectedAnimation"` (`:92`), but the entire body it lives in only renders when `showSheet` is true, and `showSheet` already requires `!!storedControls.selectedAnimation` (`:231-233`). *Falsifier:* a mount path that renders the body with `showSheet` false — both branches (`:117`, `:143-144`) gate on it.

---

## 4. INFO

**i-1 · mobile `v-if` vs desktop `v-show` asymmetry.** `:117` unmounts the sheet, `:144` merely hides the rail. A viewport crossing at 1023/1024 px, or a `hideControls` flip, therefore **destroys** the pane body on mobile — discarding exactly the Monaco cache `ChannelControls.vue:117-128` is engineered to preserve ("instead of unmounting it, which re-spins Monaco's worker / model / themes"). The two halves of the same component disagree about whether the body is expensive.

**i-2 · `@update:open` is unhandled.** `:120` binds `:open="true"` as a literal; the root emits `update:open` (`drawer.js` emits list) and the wrapper never listens. Escape / interact-outside therefore emits into the void and the sheet stays open — which *is* the documented intent (`:109-110`), but it means the Escape affordance reka provides is silently swallowed rather than deliberately declined.

**i-3 · props idiom inconsistency.** This component uses `const props = defineProps<…>()` + `props.x` (`:181`), while its direct parent (`AnimationControlsGroup.vue:140`) and direct child (`ChannelControls.vue:257`) both use Vue 3.5 reactive destructure. Three files in one chain, two idioms.

---

## 5. Claims I built and then KILLED against the tree

Recorded because L-18 runs both ways and because an audit that reports only its survivors is not falsifiable.

**A-1 · "the `activeSnap` bisection mis-rounds intermediate drags."**
**Dead.** `activeSnapPoint` is written only at settle, and only to a **ladder** value: `drawer.js` — `function w(e){ let t = S(); t.target = e; t.play(x); i.activeSnapPoint.value = e; }` with `function T(e){ w(W(e, U(i.snapPoints.value, i.direction.value))); }` (nearest-detent projection before the write). With a two-point ladder the `mid = (PEEK + expanded)/2` bisection at `:290-291` is exact for both members.

**A-2 · "the drag thrashes `localStorage` on every pointermove."**
**Dead**, same evidence: no intermediate writes to `activeSnapPoint`, so `isControlsPanelOpen` (a `useStorage` field) flips at most once per settle.

**A-3 · "`mode='live-behind'` leaves the sheet without a re-open affordance."**
**Dead.** `drawer.js` renders the handle whenever the ladder has >1 point: `O.value ? … class:"glass-drawer-handle", role:"slider", tabindex:"0", "aria-label":"Drawer position", "aria-valuemin": k.value[0], "aria-valuemax": k.value[k.value.length-1]`, with `O = computed(() => (S?.snapPoints.value.length ?? 0) > 1)`. This component passes two points (`:280`), so the handle renders. The SFC comment at `:112-114` is accurate.

**A-4 · "`createReusableTemplate` breaks scoped-CSS attribution or slot forwarding."**
**Dead.** Slot content is compiled in this component's render context and carries this component's scope id, so `.controls-drawer-content .controls-pane` matches through the Drawer's `<body>` portal — which is *why* M-3's mobile override lands. The three forwarded scoped slots (`:67-85`, `:97-102`) resolve against the wrapper's own `$slots`, and the parent's forwarding (`AnimationControlsGroup.vue:38-46`) is intact.

---

## 6. Superlatives

**SUP-1 · `createReusableTemplate` is the right primitive, used the right way.**
`:179` + `:29/:106` (define) + `:135/:156` (reuse). The mobile Drawer and the desktop rail need the *same* ~75-line body in two structurally incompatible hosts (one portaled to `<body>`, one a grid column). The alternatives are all worse: duplicate the body (drift), extract a child component (re-declare and forward 10 props and 3 scoped slots), or `<component :is>` (does not solve the portal). This solution costs **one line** and preserves all three scoped slots with their slot props intact. *Falsifier:* show a cheaper mechanism that keeps one body, two hosts, and three forwarded slots — I could not construct one.

**SUP-2 · the engine dogfood SURVIVED the facade adoption. Verified in the installed artifact.**
The component deleted its bespoke `useSheetSpring`/`useSheetGesture`/`useSheetState` and ~250 lines of sheet CSS in favour of glass-ui's `<Drawer>` (`:2-13`, `ControlsPaneWrapper.css:5-15`). The obvious risk of adopting a vendor primitive is losing library coverage — the exact reason census **S-8** rules `TypingDots` unreplaceable. Here the coverage is **preserved**, and I confirmed it in the shipped bytes rather than trusting the comment:

```
node_modules/@mkbabb/glass-ui/dist/drawer.js:7   import { SpringProgress as M } from "@mkbabb/keyframes.js";
node_modules/@mkbabb/glass-ui/dist/drawer.js     new M({ response: N.response * t(n()), dampingFraction: N.dampingFraction,
                                                        initial: e ?? C(), respectReducedMotion: true })
```

Combined with the `vite.config.ts:38-41` self-alias, glass-ui's `SpringProgress` **is** the demo's `SpringProgress` — one instance, one engine. The sheet is still spring-driven by the library under test; only the hand-rolled *host* was retired. That is the correct shape of a "adopt the primitive" migration: delete the duplicate mechanism, keep the dogfood. *Falsifier:* show the alias fails to dedupe (then two engine copies exist and the coverage claim weakens) — `vite.config.ts:28-36` documents the dedupe as the alias's whole purpose.

**SUP-3 · the `v-for` key is chosen against a hostile producer contract.**
`:47 :key="host.animation.id"`. The upstream `channels` is not a stable array — `composables/scene-facility/index.ts:117-119` exposes `get channels() { return channels(); }`, and `channels()` (`:92-111`) rebuilds the array **and every channel object and closure** on each read. A key of `host.name` would have been fragile under rename; a key of the channel *object* would churn on every access and remount the whole subtree (and with it Monaco); an index key would be worst of all. Keying on the engine object's stable `id` is the one choice that survives the producer's fresh-object-per-read semantics. *Falsifier:* show `animation.id` is unstable across a group rebuild — the animation objects are the ones the scene composables hold and mutate `superKey` on (`useCubeDemo.ts:67,101,112`), i.e. long-lived.

**SUP-4 · teardown hygiene in the composables this component owns is exemplary.**
`usePaneHover.ts` uses `useTimeoutFn` for the hover linger (`:42-48`) and `useIdle` for the global idle fade (`:52`) — no raw `setTimeout`, no manual handle bookkeeping, disposal owned by the effect scope; its header (`:40-41`) records that this *replaced* hand-rolled timer bookkeeping. `useScrollFade.ts` passes the element **ref** (not the element) to `useEventListener` (`:104`) and `useResizeObserver` (`:107`), so both auto-detach from the old node and re-bind on a mid-flight ref swap — which matters here because the pane element migrates between the Drawer portal and the rail column on a layout crossing. Its `:50-57` comment states the invariant explicitly. Against M-1 (a leak in the same component's template) this is the instructive contrast: the *composable* layer got disposal right; the *template* layer did not.

---

## 7. Overlap with the hitherto corpus

| corpus id | this challenge |
|---|---|
| `lane-frontend.md` **F-1** (glass-ui phantom dep, RED) | **B-1** — confirmed independently (`package.json` 0 hits, `package-lock.json` 0 hits, `node_modules` 7.0.0, no vite alias) and localised: this file is the demo's **only** `/drawer` consumer, statically imported by the parent, so the failure is total rather than partial. |
| `lane-frontend.md` **F-3 / S-2** (type-only `/tabs`, `ControlsPaneWrapper.vue:165` named) | **M-5(2)** — sharpened from "adopted the data contract, rejected the renderer" to a measured field loss: `SegmentedTabOption` carries `icon`/`tooltip`, `KfPillTabOption` does not, the bridge is structurally legal, and nothing typechecks it. |
| `lane-frontend.md` **§7.4** (duplicate-name hazard, `KfPillTabs.vue` vs `KfPillTabs/`) | **mi-1** — the same hazard, worse: here the component and its same-named directory are in **different parent directories**. |
| `lane-frontend.md` **§6.5** (PRM: `ControlsPaneWrapper.css:144` nested in `min-width:1024px`) | Not contested. The mobile PRM delegation to the Drawer's `respectReducedMotion` is **verified** in `drawer.js` (see SUP-2's `new M({… respectReducedMotion: true })`) — the census marked this delegation "unverified statically"; it is now verified. |
| `lane-frontend.md` **§4** roster (`319` lines, "pane wrapper — `Drawer*` + `type SegmentedTabOption`") | Line count and import profile match exactly. |
| `lane-frontend.md` **S-8** (justified bespoke = keeps engine coverage) | **SUP-2** applies the same test in the opposite direction: an *adoption* that kept coverage passes for the same reason `TypingDots`'s *retention* passes. |

**Contradictions of the corpus: none.** Every census claim I could re-derive held.
