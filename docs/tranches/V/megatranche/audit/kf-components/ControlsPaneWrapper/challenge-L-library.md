claude-opus-5[1m]

# CHALLENGE · `ControlsPaneWrapper` · axis **L (LIBRARY)** — pass 2 (supersedes pass 1)

**Target:** `/Users/mkbabb/Programming/keyframes.js/demo/components/instrument/transport/controls-pane/ControlsPaneWrapper.vue` (320 lines — 219 code, 80 comment, 21 blank)
**Colocated:** `./ControlsPaneWrapper.css` (148) · `./RibbonBar.vue` (151)
**Composables (NOT colocated — see mi-1):** `../ControlsPaneWrapper/{usePaneRegister,useControlsLayout,usePaneHover}.ts`
**Mode:** static, read-only. No installs, no dev server, no browser. Runtime-visual consequences are marked **UNPROVEN-NEEDS-LIVE** and deferred to SS-13; every *mechanism* claim is traced in-tree.
**Posture:** DEFECTIVE until the tree acquits. A false defect is worse than a missed one — §5 lists the seven claims built and then **killed** against the tree (four carried from pass 1, three new).

**Read whole:** the SFC, its CSS, `RibbonBar.vue`, all three composables, `useScrollFade.ts`, the parent `AnimationControlsGroup.vue` + `.css`, the child `ChannelControls.vue`, `ChannelOptions.vue` (teleport seam), `useKeyframesPaneReveal.ts`, `transportSource.ts`, `injectionKeys.ts`, `state/controlOptionsStore.ts`, `composables/scene-facility/index.ts`, `EditorShell.vue`, `App.vue`, `tsconfig.json`, `package.json`, and the installed `@mkbabb/glass-ui@7.0.0` (`dist/drawer.js`, `dist/components/drawer/{Drawer,DrawerContent}.vue.d.ts`, `dist/components/drawer/styles.css`, `dist/components/drawer/composables/useDrawerSnap.d.ts`, `dist/components/tabs/SegmentedTabs.vue.d.ts`) and `reka-ui/dist/Dialog/{DialogRoot,DialogContentImpl,utils}.js`.

---

## 0. Supersession note

A pass-1 challenge existed at this path. **This document is a strict superset.** Every pass-1 finding was independently re-derived against the tree before being carried; each carried id keeps its original label so downstream ledgers do not renumber. Six findings are **new** (`N-1`…`N-6`), three of them from evidence pass 1 never reached (the installed glass-ui drawer stylesheet, reka's dialog a11y contract, and the `tabs-trigger` slot terminus). Three pass-1 claims were **refined** (recorded inline). **Zero pass-1 claims were found false**; two were strengthened with harder proof.

**Tally:** 24 defects — **1 BLOCKER** · 8 MAJOR · 11 MINOR · 4 INFO — and **5 superlatives**.
Counting convention: `defects` = every finding in §1–§4 (blocker included); `blockers` = the BLOCKER-severity subset.

---

## 0.1 Headline

| id | sev | claim | anchor | status |
|---|---|---|---|---|
| **B-1** | **BLOCKER** | This file is the demo's **sole** `@mkbabb/glass-ui/drawer` consumer; glass-ui is in neither `package.json` nor `package-lock.json`. `npm ci` → unresolvable edge at the root of the transport tree. | `:166` | carried |
| **M-1** | MAJOR | The `animControlRefs` function-ref **drops Vue's unmount `null` callback** (`if (el)`); nothing anywhere deletes a key. Also a direction inversion: the child writes a parent-owned prop. | `:51` | carried + extended |
| **M-2** | MAJOR | `isPanelTransitionDone` is a latch that can be **cleared but never set** — its only setter waits on a `max-height` `transitionend` that no stylesheet in the demo *or* glass-ui 7.0.0 emits. | `useControlsLayout.ts:31-38` | carried |
| **M-3** | MAJOR | `paneScrollable` is **inert on both layouts** — mobile hard-overridden by unlayered scoped CSS, desktop unbounded. ~30 lines move zero pixels. | `:299-303` | carried |
| **M-4** | MAJOR | `v-show` mounts **every** control host — N Monacos, N `KeyframeTimeline`s teleported into **one** target id. N=3 on cube and amiga. | `:47-49` | carried |
| **M-5** | MAJOR | Four `any` props + the option-type bridge + the `activeSnap` v-model variance have **zero gate coverage**. Measured: tsc's program contains **0** `.vue` files. | `:194-198` | carried + hardened |
| **N-1** | MAJOR | A **four-level `#tabs-trigger` slot chain that terminates in no slot at all** — `ChannelControls` has no such slot, and no scene exposes a provider. Pure dead code, App→wrapper. | `:67-75` | **new** |
| **N-2** | MAJOR | The BG-11 "structural gap, FORWARDED, born-RED" is **already discharged** — `--drawer-inset-block-end`, the exact named discharge token, ships in the installed 7.0.0. The menubar overlap is a one-declaration fix. | `:22-26`, `:174-175` | **new** |
| **N-4** | MAJOR | `RibbonBar`'s eight buttons render on a **store string**, not target readiness — they are enabled and silently no-op through the `vendor-monaco` async-resolution window. | `RibbonBar.vue:8,13` | **new** |

---

## 1. BLOCKER

### B-1 · the phantom dep lands *hardest* on this file — it is the demo's only `/drawer` consumer

```
ControlsPaneWrapper.vue:166  import { Drawer, DrawerContent, DrawerTitle } from "@mkbabb/glass-ui/drawer";
ControlsPaneWrapper.vue:165  import type { SegmentedTabOption } from "@mkbabb/glass-ui/tabs";
```

Re-derived independently this pass:

```
$ grep -n "mkbabb" package.json        → only "@mkbabb/value.js": "4.0.0" (dependencies, :68-70) + name/repo lines
$ grep -c "glass-ui" package-lock.json → 0
$ node_modules/@mkbabb/glass-ui/package.json → "version": "7.0.0"   (installed, unlocked, undeclared)
$ grep -rn "glass-ui/drawer" demo/     → 1 hit — THIS file, this line
```

**Why BLOCKER *here* specifically, beyond census F-1's repo-level statement.** F-1 established the phantom dep; this challenge adds the blast radius. `/drawer` is a **runtime value import** with exactly one consumer in the entire demo. It is not lazily loaded, not behind `defineAsyncComponent`, and its consumer is imported **statically** by the parent (`AnimationControlsGroup.vue:128`), which sits in every scene's shell path (`EditorShell.vue:75`). The failure mode is therefore not "the mobile drawer degrades" — it is "the module graph has an unresolvable edge at the root of the transport tree." Both `vite build --mode gh-pages` and `vite` die at the same import on a clean checkout. The working tree survives only because a `Jul 16 05:17` install predates whatever removed the declaration (census §2).

The dependency cycle is held shut on one side only: keyframes.js's demo depends on glass-ui; glass-ui's shipped `dist/drawer.js` imports `@mkbabb/keyframes.js` (verified, SUP-2); the demo satisfies glass-ui's half with a vite self-alias, and glass-ui's half of the contract is satisfied by **nothing at all**.

**Second bite (feeds N-2).** The component reasons in prose about glass-ui **4.0.1** (`:8-9`, `:114`, `:174-175`) while **7.0.0** is installed. With no pin anywhere, the question "which glass-ui is this code right about?" is *unanswerable* — and N-2 shows the answer materially changes a backlog verdict.

**Falsifier.** (a) A `@mkbabb/glass-ui` entry in `package.json` **and** `package-lock.json`; (b) a `resolve.alias` / `optimizeDeps.include` / `rollupOptions.external` covering the bare specifier (the alias map is `@src`, `@mkbabb/keyframes.js`, `@styles`, `@state`, `@components`, `@utils`, `@kf-engine`, `@composables`, `@app`, `@assets` — no glass-ui entry); (c) a demonstration that `npm ci` retains undeclared `node_modules` subtrees (it does not — it deletes `node_modules` wholesale before installing from the lock). `.npmrc` is one line, `legacy-peer-deps=true`; `.gitmodules` declares only `docs/precepts`.

---

## 2. MAJOR

### M-1 · the ref registry leaks, and the write flows the wrong way

```vue
:51   :ref="(el: any) => { if (el) animControlRefs[host.name] = el }"
```

`animControlRefs` is declared as an **input** (`:194 animControlRefs: Record<string, any>`), is `reactive<Record<string, any>>({})` in the parent (`AnimationControlsGroup.vue:191`), and is written **only** here. Two distinct defects on one line.

**(a) Direction inversion.** The prop is a write channel. Data flows child → parent through an object the parent must read back (`AnimationControlsGroup.vue:195`, `:200`, `:318`). Vue emits no `no-mutating-props` warning for object-prop *member* writes, so nothing catches it — and M-5 means the `any` hides the shape entirely. The idiomatic seam already exists in this very chain: `defineExpose` (`ChannelControls.vue:410-414`) + a parent-owned `useTemplateRef`.

**(b) `if (el)` swallows the unmount call.** Vue invokes a function ref with the instance on mount and with **`null` on unmount**. The guard is precisely the branch that would clear the entry, so nothing is ever cleared:

```
$ grep -rn "delete animControlRefs|animControlRefs\[.*\] = null|Object.keys(animControlRefs)" demo/
→ (no output)
```

**Failure scenario (concrete).** Mobile. The start screen returns (`hideControls` → `showSheet` false, `:231-233`). The Drawer is `v-if`-gated (`:117`), so the **entire** pane body unmounts with all its `ChannelControls`. `animControlRefs` still holds every one. `activeKeyframesRef` (`AnimationControlsGroup.vue:193-196`) therefore still resolves to a **dead** instance, and `useControlsKeyboardShortcuts` (`:322-332`) is *still mounted and listening*. A shortcut keystroke calls `copyCSS()` / `snapshot()` on an unmounted component whose reactive effects are stopped and whose DOM is gone. Every call site is `?.`-chained, so the result is a **silent no-op** — the most expensive failure mode to diagnose.

**Retention scenario.** Each retained `ChannelControls` transitively retains its force-mounted `KeyframesStringControls`/Monaco subtree (`ChannelControls.vue:129-147`: "the pane is ALWAYS rendered while the surface is valid… never torn down"). The registry is the GC root that outlives them. Blast radius is multiplied by M-4 (N hosts, N Monacos).

**Key-churn scenario.** The registry keys on `host.name` while the `v-for` keys on `host.animation.id` (`:47`). A host whose `name` changes while its `animation.id` holds re-registers under the new name and leaves the old name pointing at the same live instance — two keys, one component, one permanently wrong for `switchTab`.

**Severity rationale:** MAJOR not BLOCKER — it degrades silently rather than crashing, and `EditorShell.vue:76` mounts `<AnimationControlsGroup :key="superKey">`, so `reactive({})` is fresh **per scene**: the retention is bounded by scene life, not session life. That bound is why this is not a BLOCKER; it does not touch (a).

**Falsifier.** (a) Show Vue does not invoke function refs with `null` on unmount — it does, and the installed glass-ui's own `useDrawerSnap.d.ts` doc-comment warns about exactly this bug class ("the writer's `if (el)` guard skips forever"). (b) Find a cleanup site — the grep above is the whole tree. (c) Show `animControlRefs` is recreated per host change — it is created once per **scene**. (d) For the leak half specifically: show no scene's `channels` array ever loses a `name` while mounted. The direction-inversion half survives (d) regardless.

---

### M-2 · `isPanelTransitionDone` is a one-way latch — the transition it waits on does not exist

```ts
useControlsLayout.ts:22    const isPanelTransitionDone = ref(storedControls.isControlsPanelOpen);
useControlsLayout.ts:24-29 watch(() => storedControls.isControlsPanelOpen, (open) => { if (!open) isPanelTransitionDone.value = false; });
useControlsLayout.ts:31-38 const onPanelTransitionEnd = (e: TransitionEvent) => {
                               if (e.propertyName === "max-height" && storedControls.isControlsPanelOpen)
                                   isPanelTransitionDone.value = true;      // ← the ONLY `= true`
                           };
```

Bound once, desktop branch only: `ControlsPaneWrapper.vue:145 @transitionend="onPanelTransitionEnd"`.

**The gate can never fire.** The wrapper's own stylesheet deleted the `max-height` axis and *says so*:

```css
ControlsPaneWrapper.css:83     .controls-pane-wrapper { max-height: none; … }
ControlsPaneWrapper.css:93-95  /* The desktop open/close axis is the [rail]-track collapse; the F9
                                  idle-fade OPACITY transition is the only transition that remains. */
                               transition: opacity var(--duration-normal) var(--ease-standard);
```

Exhaustive search for a `max-height` transition that could bubble to `:145`:

```
$ grep -rn "transition[^;]*max-height\|transition-\[max-height\|transition-property[^;]*max-height" \
    --include="*.vue" --include="*.css" demo/
demo/components/instrument/transport/AnimationControlsGroup.vue:83:  'transition-[max-height,opacity] duration-slow ease-standard'
$ grep -rho "transition[^;{}]*max-height[^;]*" node_modules/@mkbabb/glass-ui/dist/styles/ node_modules/@mkbabb/glass-ui/dist/*.css
→ (no output)
```

The **one** hit is `#timeline-expanded-target` — a **sibling** of `.controls-pane-wrapper` (both are direct children of `.controls-layout`: `AnimationControlsGroup.vue:18` and `:79`). `transitionend` bubbles **up**, so a sibling's event reaches `.controls-layout` and never the wrapper. `KeyframeTimeline` *teleports into* that sibling (`ChannelControls.vue:186`), moving the DOM further away, not closer. glass-ui 7.0.0 ships zero `max-height` transitions.

**Consequence chain.** The latch is seeded `true` only when the persisted store happens to be open (`controlOptionsStore.ts:45` default `isControlsPanelOpen: true`). The moment the user closes the rail, the watch clears it, and **no code path can set it true again for the component's lifetime**. Because the store is `useStorage`-persisted (`controlOptionsStore.ts:49`), a user who closed the pane in a prior session starts the next session with the latch already dead. Downstream readers: `paneScrollable`'s desktop arm (`:302`) and `useScrollFade`'s `retrigger` (`useControlsLayout.ts:80`) — the latter self-corrects via its `useResizeObserver` (`useScrollFade.ts:107`), so the visible damage lands entirely on M-3.

**In-tree contradiction.** `ControlsPaneWrapper.vue:296-298` asserts *"The desktop path keeps the `isPanelTransitionDone` latch (the max-height transitionend gate)"* while `ControlsPaneWrapper.css:93-95`, in the same component, asserts the opposite. Two authorities, one file pair, mutually exclusive. Provenance: the T.B4/OD-5 rail-collapse rewrite deleted the transition; the JS gate was not deleted with it.

**Falsifier.** Produce any rule in the served cascade that transitions `max-height` on `.controls-pane-wrapper` **or a descendant** (a descendant would bubble and revive the latch). Both greps are exhaustive over `demo/` and the installed glass-ui CSS; Tailwind's `transition-*` utilities can only arrive via a class string, and no class list in the wrapper's subtree contains one.

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
    .controls-drawer-content .controls-pane { min-height: 0; flex: 1 1 auto; overflow-y: auto; touch-action: pan-y; }
}
```

`overflow-y-auto` / `overflow-hidden` are Tailwind utilities and therefore live in a cascade layer (`@import "tailwindcss"` at `styles/style.css:1` pulls the layered index; Tailwind v4's entry declares `@layer theme, base, components, utilities;`). A `<style scoped src>` block emits **unlayered** CSS, and unlayered declarations beat every layered one regardless of specificity. The scoped rule also wins on specificity independently — `.controls-drawer-content .controls-pane[data-v-*]` at (0,3,0) vs `.overflow-hidden` at (0,1,0) — and `overflow` resolves per-longhand, so the scoped `overflow-y: auto` overrides the shorthand's `hidden`. Both selector halves carry the scope id: `.controls-drawer-content` is bound on `<DrawerContent>` (`:127`), whose root inherits the parent scope id and — verified in the installed dist — merges consumer classes onto the `.glass-drawer` element itself (`drawer.js`: `class: cn("glass-drawer glass-overlay", r.class)`); `.controls-pane` (`:35`) compiles in this component's render context even through `createReusableTemplate` (§5 A-4). **The mobile ternary arm is dead: the sheet body scrolls at every detent, peek included** — exactly what `:295-298` was written to prevent.

**Desktop arm — no bounded ancestor, so `overflow-y: auto` forms no scroller.** Height chain upward from `.controls-pane`:

| element | height authority |
|---|---|
| `.controls-pane` (`:30-38`) | **none** — the exhaustive `grep` for `.controls-pane` / `.controls-pane-wrapper` / `.controls-content` across `demo/**/*.css` returns no height/max-height rule outside the mobile `@media` block |
| `.controls-pane-wrapper` (`:142-155`) | `display: block; overflow: hidden` (`ControlsPaneWrapper.css:87-89`); `max-height: none` (`:83`); no height |
| grid placement | `.controls-layout > :deep(.controls-pane-wrapper) { grid-column: rail; grid-row: stage; }` (`AnimationControlsGroup.css:199-202`) — **placement only**, no `align-self` |
| `.controls-layout` | `items-start` (`AnimationControlsGroup.vue:5`) ⇒ `align-items: start` ⇒ the item is **content-sized, not stretched** |

Re-verified this pass: the sibling `.stage-cell` *does* carry an explicit `align-self: stretch` override (`AnimationControlsGroup.css:142-143`) — the wrapper carries none, confirming the `items-start` default reaches it. `overflow-y: auto` on an auto-height block inside an auto-height block cannot scroll; the box simply grows. So the desktop arm is inert *even when the M-2 latch happens to be true*, and once M-2 kills the latch it flips to `overflow-hidden`, equally inert. The inner scroller at `ChannelControls.vue:85` (`flex-1 min-h-0 overflow-y-auto`) is defeated by the same chain: its host's `h-full` (`ChannelControls.vue:4`) resolves against an auto-height parent and computes to `auto` (CSS 2.1 §10.5).

**Net:** `paneScrollable` (5 lines), `isPanelTransitionDone` + its watch + `onPanelTransitionEnd` (`useControlsLayout.ts:21-38`, ~18 lines), the `@transitionend` binding (`:145`), and the `retrigger` wiring (`useControlsLayout.ts:80`) form ~30 lines of load-bearing-*looking* machinery that moves **zero pixels**. Dead code with a convincing paper trail is the most expensive kind.

**UNPROVEN-NEEDS-LIVE:** whether desktop rail content actually exceeds the work-area height today (`.controls-layout` is `height: min(100dvh, --work-area-max-height)`, `AnimationControlsGroup.css:8`; `ChannelOptions.vue` is 609 lines of option grid plus `RibbonBar`). If it does, the overflow spills out of the work area instead of scrolling. The *mechanism* claim is static and does not depend on that measurement. Escalate M-2+M-3 jointly to BLOCKER if SS-13 observes clipped or unreachable rail content after a close/open cycle.

**Falsifier.** (a) A height / `max-height` / `flex` rule bounding `.controls-pane` or `.controls-pane-wrapper` on desktop — the grep above is exhaustive. (b) An `align-self` override on the wrapper — `.stage-cell` has one, the wrapper does not. (c) Tailwind v4 emitting utilities unlayered in this build. (d) For the mobile half: inspect the rendered `.controls-pane` inside the drawer portal for the `data-v-*` attribute and read its computed `overflow-y` at the peek detent. If the scope id does **not** reach the reused body, the *inverse* defect holds instead — the entire mobile block `ControlsPaneWrapper.css:40-73` (flex sizing, `min-height:0`, `touch-action: pan-y`, scroll-fade mask) is dead. Either branch is a defect; §5 A-4 establishes which.

---

### M-4 · `v-show` mounts **every** host: N Monacos, N timelines, one teleport target

```vue
:46-49  <template v-for="host in controlHosts" :key="host.animation.id">
            <div v-show="storedControls.selectedAnimation == host.name">
                <ChannelControls … />
```

`v-show`, not `v-if`. Every channel's `ChannelControls` **mounts and runs**; N−1 are merely `display:none`.

`controlHosts` (`:207-228`) yields one host per painting channel, i.e. one per group animation on the group-clocked scenes. Re-verified this pass:

```
scenes/cube/useCubeDemo.ts:67,101,112    matrixAnim / rotationAnim / hoverAnim   → superKey = SCENE_ID
scenes/amiga/useAmigaDemo.ts:143,145,147 spinning / bouncingX / bouncingY        → superKey = SCENE_ID
```

**N = 3**, and — decisively — **all three resolve the same store bucket**: `ChannelControls.vue:274` calls `getStoredAnimationGroupControlOptions(animation)`, keyed on `animation.superKey`, which is the scene id for all of them. Every mounted host therefore reads an identical `selectedControl` / `isTimelineExpanded`.

1. **N Monaco instances.** `useKeyframesPaneReveal` calls `scheduleIdleWarm()` unconditionally at setup (`:102`) — `requestIdleCallback`, or a 1.5 s vueuse fallback. Each host flips its own `keyframesWarmed` and force-mounts `KeyframesStringControls` (`ChannelControls.vue:130,138`), whose `hasSurface('keyframes')` gate is the **machine-wide** projection (`ChannelControls.vue:297-298`), identical across hosts. The composable's own header states the cost it exists to cure: *"Monaco-eager… mobile LCP 10–16 s"* (`useKeyframesPaneReveal.ts:60-67`). Mounting N of them re-inflates that cost ×3 — and N−1 instantiate inside `display:none` subtrees where they render nothing.
2. **N `KeyframeTimeline`s into one target id.** `isTimelineVisible = selectedControl === "timeline" || isTimelineExpanded` (`ChannelControls.vue:377-379`) is shared, so when the timeline surface is selected all N mount a timeline. When expanded, `<Teleport to="#timeline-expanded-target" :disabled="!isTimelineExpanded" defer>` (`ChannelControls.vue:186`) hoists all N **out of** the `v-show`'d wrapper into the single target declared once at `AnimationControlsGroup.vue:79-88`. The `v-show` that was hiding N−1 no longer applies to them.
3. The header comment at `:41-44` defends the **key** choice ("an ChannelControls instance is BORN with its animation and dies with it") but says nothing about mount-all — and the key it *describes* ("KEYED by the animation name") is not the key in the code (`host.animation.id`; see mi-5c).

**Severity rationale:** MAJOR not BLOCKER — the app functions; the cost is bytes, memory, and (2) duplicate DOM. Escalate if SS-13 confirms three stacked timelines are *visible* in the expanded bar.

**UNPROVEN-NEEDS-LIVE:** the visible triple-timeline in (2); whether Monaco's `editor.create` actually runs inside a `display:none` subtree (it is called from `onMounted`, so it should).

**Falsifier.** (a) `controlHosts` length 1 for every live scene — contradicted by the six `superKey = SCENE_ID` assignments above. (b) `hasSurface('keyframes')` being per-host — it reads `machine.controlSurfaces` (`ChannelControls.vue:297`), a single projection with no host parameter. (c) `defineAsyncComponent` deferring while hidden — it resolves on mount, and `v-show` mounts.

---

### M-5 · the type contracts are unenforced — `.vue` is never typechecked in this repo

```json
package.json:44  "check": "tsc --noEmit && tsc --noEmit -p tsconfig.test.json"
```

Plain `tsc`, not `vue-tsc`. `tsconfig.json`'s `include` is `["src/", "demo/"]`, but `tsc` cannot parse SFCs. Pass 1 argued this from the script text; **this pass measured it**:

```
$ npx tsc --noEmit --listFilesOnly -p tsconfig.json | grep -c "\.vue"
0
$ grep -rn "vue-tsc" package.json .github/workflows/*.yml
(no output)
```

Zero `.vue` files in the program. The repo's strictness (`strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `verbatimModuleSyntax` — `tsconfig.json:6-13`) stops dead at the `.vue` boundary. That converts each of the following from "TypeScript will catch it" to "nothing will":

1. **Four `any` props** (`:182`, `:194-196`): `AnimationGroup<any>`, `animControlRefs: Record<string, any>`, `activeKeyframesRef: any`, `activeTimelineRef: any`. `RibbonBar.vue:139-140` re-declares the last two as `any` and calls into them with double-optional chaining at eight sites (`RibbonBar.vue:20,28,40,53,76,84,92,100`). A rename on the far side of `defineExpose` (`ChannelControls.vue:410-414`) produces a **button that does nothing**, with no error and no type failure. The optional chain makes a broken wire indistinguishable from a disabled control. (N-4 shows this is not merely a latent rename risk — there is a live window today.)
2. **The glass-ui → bespoke option bridge.** `:198 extraTabs?: SegmentedTabOption[]` (`@mkbabb/glass-ui/tabs`) is forwarded at `:65` into `ChannelControls.vue:271 extraTabs?: KfPillTabOption[]`:
   ```
   SegmentedTabs.vue.d.ts:5-11  { label; value; icon?; disabled?; tooltip? }
   useKfPillTabs.ts:23-27       { label; value; disabled? }
   ```
   Structurally assignable, so this is **not** a type error — it is a **silent narrowing**. A standalone host that sets `icon` or `tooltip` (the exact reason `SegmentedTabOption` carries them) gets neither, because `KfPillTabs` implements a strict subset. The demo imports glass-ui's *data contract* to feed a renderer that cannot honour it. Corroborates census **S-2 / F-3**; sharpens them from "type-only consumption" to "type-only consumption that loses two fields at the terminal".
3. **`activeSnap` v-model variance.** `:284 computed<number>({ get, set: (v: number) => … })`, bound `:123 v-model:active-snap-point="activeSnap"`. The producer is wider in both directions: `Drawer.vue.d.ts` declares `activeSnapPoint?: number | string | null` and `"update:activeSnapPoint": (value: string | number | null) => any`. The setter's own body concedes it — `Number(v)` (`:291`) exists precisely because `v` may not be a number, while the annotation says it always is. `Number(null) === 0`, so a `null` writeback would silently close the panel. (The engine never emits `null` — §5 A-2 — so this is a contract lie, not a live bug.) Secondary: the setter is **lossy**, collapsing a continuous detent to a boolean via a midpoint test, so a third ladder rung would silently mis-map.

**Falsifier.** (a) A `vue-tsc` invocation in `package.json`, CI, or a git hook. (b) `RibbonBar`'s methods typed somewhere — both props are `any` at both ends. (c) `KfPillTabs` rendering `icon`/`tooltip` — it accepts only `KfPillTabOption`.

---

### N-1 · a four-level `#tabs-trigger` slot chain that terminates in **no slot at all** — *new*

```vue
<!-- ControlsPaneWrapper.vue:67-75 -->
<template #tabs-trigger>
    <slot name="tabs-trigger"
          :selected-animation="storedControls.selectedAnimation"
          :is-playing="isPlaying"></slot>
</template>
```

`<ChannelControls>` declares exactly **two** slots — `tabs-content` at `ChannelControls.vue:32` and `:180`. There is no `<slot name="tabs-trigger">` anywhere in it. Its only `tabs-trigger` occurrences (`:50`, `:226`) are comments narrating the slot's *retirement*: *"the former `tabs-trigger` slot + per-trigger reka injection retire — every tab is data."*

The chain is live at every level above the terminus:

```
app/App.vue:53                        <template #tabs-trigger="slotProps">  → <component :is="sceneRef?.tabsTrigger">
  → EditorShell.vue:88-90             <slot name="tabs-trigger" v-bind="slotProps">
    → AnimationControlsGroup.vue:38-40 <slot name="tabs-trigger" v-bind="slotProps">
      → ControlsPaneWrapper.vue:67-75  <slot name="tabs-trigger" :selected-animation :is-playing>
        → ChannelControls.vue           ✗ no such slot — vnode discarded
```

The source end is dry too:

```
$ grep -rn "tabsTrigger" demo/
app/App.vue:55,57              <component :is="sceneRef?.tabsTrigger" v-if="sceneRef?.tabsTrigger" />
scenes/cube/CubeScene.vue:152,156   "the `tabsTrigger` function (and its `defineExpose` entry) are therefore DELETED"
```

**Zero scenes expose a provider.** So the chain is dead at both ends and hollow in the middle — four files carrying a slot that no one fills and no one renders. This file is the terminal link and pays the running cost: it evaluates and passes two scope props (`selectedAnimation`, `isPlaying`) on every render of every host (×N per M-4) into a discarded vnode.

This is the same BA.W-TABS drift census **S-2** flagged at the *type* layer ("the prose and the tree disagree"), reaching the *render* layer. Pass 1 did not find it.

**Falsifier.** Find a `<slot name="tabs-trigger">` in `ChannelControls.vue` or in a component it renders that could receive the slot by transparent forwarding (it renders `KfPillTabs`, `ChannelOptions`, and two async panes — none forwards `$slots` wholesale); or find a scene that still `defineExpose`s `tabsTrigger`.

---

### N-2 · the BG-11 "structural gap" is **already discharged** in the installed glass-ui — *new*

The component declares a permanent, forwarded, born-RED backlog row, and repeats it in two files:

```
:22-26   What the snap ladder CANNOT cure is the bottom-menubar overlap: the Drawer is pinned to
         `bottom:0` with no bottom-inset lever, so the sheet rides OVER the bottom menubar at any
         detent. That is the BG-11 structural gap — FORWARDED to the glass-ui tranche and tracked as
         a BG-11-BLOCKED born-RED backlog row (dischargedBy the `--drawer-inset-block-end` publish + re-pin).

:174-175 // The published Drawer still lacks a bottom-inset lever; the live-behind
         // consumer keeps its measured detents until Glass exposes that component seam.
```

The named discharge condition is met, by that exact token name, in `node_modules/@mkbabb/glass-ui/dist/components/drawer/styles.css` (installed 7.0.0):

```css
:root { --drawer-inset-block-end: 0px; … }

.glass-drawer[data-glass-drawer-snap-points="true"][data-glass-drawer-direction="bottom"] {
    bottom:     var(--drawer-inset-block-end);
    height:     calc(100% - var(--drawer-inset-block-end));
    max-height: calc(100% - var(--drawer-inset-block-end));
}
```

Every precondition holds for **this** consumer: `direction="bottom"` (`:120`) and a non-empty `snapPoints` (`:122`, `:280`) put it on exactly the guarded selector, and the token is settable from this component's own scoped stylesheet — `.controls-drawer-content` lands on the `.glass-drawer` element itself (verified in `drawer.js`: `class: cn("glass-drawer glass-overlay", r.class)`), so a single declaration in `ControlsPaneWrapper.css` reaches the element that reads it. The menubar overlap is a **one-declaration fix**, not a cross-tranche blocker.

Two costs, both real: a live UX defect (the sheet occludes the bottom menubar at every detent) is being *carried as accepted* on a rationale that is stale; and a backlog row is being tracked as BLOCKED against a producer that already shipped the unblock. This is the same shape as census **F-2 / S-1** — a documented fork whose blocking rationale is stale against the installed 7.0.0 — reproduced here for `/drawer` instead of `/tabs`, and it is B-1's second bite: no pin exists to adjudicate which glass-ui the prose is right about.

**Falsifier.** (a) Show `.controls-drawer-content` is not on the `.glass-drawer` element — contradicted by the `cn()` merge above. (b) Show `--drawer-inset-block-end` is absent from the version this repo is *meant* to build against — which requires B-1 to be fixed before the question is answerable at all. (c) Show the sheet's occlusion is cured by some other means already in the tree (`grep -rn "drawer-inset" demo/` → no hits).

---

### N-4 · `RibbonBar`'s eight buttons render on a store string, not on target readiness — *new*

```vue
RibbonBar.vue:8   v-show="storedControls.selectedControl === 'controls'"
RibbonBar.vue:13  v-if="storedControls.selectedControl === 'keyframes'"     → 4 buttons
RibbonBar.vue:69  v-else-if="storedControls.selectedControl === 'timeline'" → 4 buttons
RibbonBar.vue:20  @click="activeKeyframesRef?.copyCSS?.()"
RibbonBar.vue:76  @click="activeTimelineRef?.snapshot?.()"
```

Both targets are `defineAsyncComponent`s (`ChannelControls.vue:252-253`), and `KeyframesStringControls` additionally sits behind `keyframesWarmed` (`ChannelControls.vue:130`).

**Failure scenario.** Any route to the keyframes surface — a tab click, the `switchTab` keyboard shortcut (`AnimationControlsGroup.vue:315-320`), or a restored `selectedControl` on scene entry — flips the store string **synchronously**. `RibbonBar` renders its four enabled buttons on that same tick. `KeyframesStringControls` resolves **asynchronously**: it is the `vendor-monaco` chunk that `useKeyframesPaneReveal.ts:64-66` itself measures at *"~4 MB … mobile LCP 10–16 s"*. For that entire window `activeKeyframesRef` is `null` (`AnimationControlsGroup.vue:193-196`) and **Copy / Format / Export CSS / Apply CSS are enabled, clickable, and completely silent** — no disabled state, no pending affordance, no console line. `Apply CSS` additionally reads `activeKeyframesRef?.cssApplied` for its active styling (`RibbonBar.vue:49,58`), so it also renders in the wrong visual state throughout. Identical shape for the Timeline tab's four buttons against `KeyframeTimeline`.

The structural cause is owned **here**: `ControlsPaneWrapper` threads `activeKeyframesRef` / `activeTimelineRef` as `any` (`:195-196`) into `RibbonBar` (`:94-95`) with **no readiness signal alongside them**. The honest shape is `:disabled="!activeKeyframesRef"` — one binding, at the seam this component already owns.

This refines M-5(1) from a latent *rename* risk into a live window, and it compounds M-1: once a stale entry is in the registry, the same eight buttons act on a **zombie** instead of on nothing.

**Falsifier.** Show a `<Suspense>` or `v-if` withholding `RibbonBar`'s keyframes/timeline branch until the async component resolves. Checked: `ChannelControls.vue` has no `<Suspense>`; `App.vue:90`'s `<Suspense :key="activeSceneKey">` wraps the **scene** and is already resolved when the tab flips. Note the *narrow* version of this claim died — §5 K-1: `useKeyframesPaneReveal.ts:107-113` **does** warm on `keyframesActive` with `{ immediate: true }`, so "the keyboard shortcut never warms Monaco" is false. What survives is the resolution window, not a permanent no-op.

---

## 3. MINOR

**mi-1 · split colocation — the component and its composables live in different directories.**
The SFC and its CSS are in `transport/controls-pane/`; its three composables are in `transport/ControlsPaneWrapper/` (`:172-173` import `"../ControlsPaneWrapper/…"` — out and back down). There is no `ControlsPaneWrapper.vue` inside `ControlsPaneWrapper/`. A reader who greps `ControlsPaneWrapper/` finds three composables and no component; a reader who opens `controls-pane/` finds a component whose behaviour lives elsewhere. Provenance: the U.B2 move `34a333b7` relocated `components/ControlsPaneWrapper.{vue,css}` → `controls-pane/` and left the composable folder behind. Compounding: `useScrollFade.ts` lives in a **third** home (`transport/composables/`) — three directories for one component's helpers. This is census §7.4's duplicate-name hazard (raised for `KfPillTabs.vue` vs `KfPillTabs/`) recurring in a **worse** form: there the file and dir were siblings; here they are in different parents. *Falsifier:* a `ControlsPaneWrapper.vue` inside `ControlsPaneWrapper/` (`ls` shows only the three `.ts` files), or a tree-wide convention placing `<Name>/` folders beside rather than inside the owner — contradicted by `channel-controls/composables/` and `AnimationControlsGroup/`.

**mi-2 · `usePaneRegister` returns a dead `isDesktop` and is otherwise a 41-line wrapper around `?? "subject"`.**
`usePaneRegister.ts:38` creates `useMediaQuery("(min-width: 1024px)")` and returns it (`:40`); the sole consumer destructures `const { stageMode } = usePaneRegister({…})` (`:236`). Grep for `isDesktop` across the demo returns only its own declaration, doc-comment and return. Every mount installs a `matchMedia` change listener that nothing reads. Strip it and the composable's whole remaining body is `computed(() => stageModeProp() ?? "subject")` — 41 lines, one expression: an *undersized* Goldilocks violation, the mirror of the oversize one its own header cites (`usePaneRegister.ts:22-23`, "the K.WZ proof:demo-no-oversize seam"). *Falsifier:* any consumer of `isDesktop`, or a second consumer of `usePaneRegister`.

**mi-3 · three `useMediaQuery` instances for one breakpoint in one subtree.**
`ControlsPaneWrapper.vue:254` `(max-width: 1023px)`, `useControlsLayout.ts:48` `(max-width: 1023px)`, `usePaneRegister.ts:38` `(min-width: 1024px)` — the same line drawn three times, one dead (mi-2), the two live ones expressed as complements rather than one shared source. `usePaneRegister.ts:26-28` even claims it "draws the SAME 1024px line every layout composable in this subtree draws," an argument for sharing the code then declines to act on. *Falsifier:* show vueuse dedupes `matchMedia` per query string across call sites — it does not; each call constructs its own `MediaQueryList` listener.

**mi-4 · the emit block is a verbatim duplicate of the child's.**
`:305-316` re-declares six events copied from `ChannelControls.vue:352-370`. Five of six (`sliderUpdate`, `keyframesUpdate`, `togglePlay`, `scrubStart`, `scrubEnd`) are pure pass-through re-emissions (`:52-59`); only `layerConfigUpdate` adds information (`host.name`, `:55-57`). ~12 lines of type surface and 5 handler closures move events one level. *Falsifier:* show any of the five is transformed — `:52-59` shows they are not.

**mi-5 · four documentation/code divergences inside this one component.**
(a) The header (`:19-21`) says *"subject scenes cap at 0.48 (sheet.top ≈ 52dvh)"*; the code says `EXPANDED_SUBJECT = 0.4` (`:275`); a third comment eight lines above the constant (`:270-274`) says 0.40/≈49dvh. (b) `ControlsPaneWrapper.css:20` repeats the stale *"subject 0.48 ≈ 52dvh reserve"*. (c) `:41-42` says the `v-for` is *"KEYED by the animation name"*; the key is `host.animation.id` (`:47`). (d) `:174-175` says the published Drawer "still lacks a bottom-inset lever" — false against the installed 7.0.0 (N-2). Two of the three detent sites are one revision stale **and disagree with each other**, not merely with the code; and both name `proof:stage-visible` / `proof:mobile-single-page` as their audience, i.e. the drift sits precisely on the anchors a downstream gate is told to re-derive against. *Falsifier:* a `0.48` literal anywhere in the SFC — there is none.

**mi-6 · loose equality on a `string | null` field.**
`:49` and `:64` use `storedControls.selectedAnimation == host.name`. The field is typed `string | null` (`controlOptionsStore.ts:16`), seeded `""` (`:37`). No live break (`null == "x"` is `false`), but a lint-grade inconsistency in a repo running `strict` + `noUncheckedIndexedAccess`. *Falsifier:* a case where `==` is required here — both operands are `string | null`.

**mi-7 · the setup-time store write races the composable that already read the same field.**
`:260-262` mutates the parent's persisted store during the child's setup. But `useControlsLayout` ran ten lines earlier (`:242-250`) and already snapshotted the *pre-reset* value into `isPanelTransitionDone` (`useControlsLayout.ts:22`). The composable's non-immediate watch corrects it on the pre-flush pass, so there is no live bug — but the ordering is load-bearing and undocumented: moving `:236-250` below `:260`, or making the watch `immediate`, changes the seed. *Falsifier:* show the watch is `immediate` (it is not) or that the mutation precedes the composable call (it does not).

**mi-8 · `storedControls` is reached by two independent paths.**
The wrapper receives it as a prop (`:187`, threaded from `AnimationControlsGroup.vue:176`), while the child independently re-derives the **same object** via `getStoredAnimationGroupControlOptions(animation)` (`ChannelControls.vue:274`) — identical because all of a scene's animations share `superKey`. Two routes to one reactive object; a future divergence in either route is invisible. *Falsifier:* show the two resolve different buckets — they cannot, given the shared `superKey`.

**mi-9 · redundant guard.**
`RibbonBar` is gated `v-if="storedControls.selectedAnimation"` (`:92`), but the body it lives in only renders when `showSheet` is true, and `showSheet` already requires `!!storedControls.selectedAnimation` (`:231-233`). *Falsifier:* a mount path rendering the body with `showSheet` false — both branches (`:117`, `:143-144`) gate on it.

**N-3 · `DrawerTitle` is provided, `DrawerDescription` is not — the sheet ships a dangling `aria-describedby`.** *new*
The author correctly added a labelling title with a correct rationale (`:132-134`, *"reka DialogContent wants a labelling title; keep it off-screen"*). reka's `DialogContentImpl` binds **both** ids unconditionally and generates them if absent:

```js
reka-ui/dist/Dialog/DialogContentImpl.js:49-50   rootContext.descriptionId ||= useId(void 0, "reka-dialog-description");
reka-ui/dist/Dialog/DialogContentImpl.js:78      "aria-describedby": unref(rootContext).descriptionId,
```

With no `<DrawerDescription>` rendered — and glass-ui ships one (`dist/components/drawer/DrawerDescription.vue.d.ts`) — the `role="dialog"` sheet carries `aria-describedby="reka-dialog-description-…"` pointing at an id that exists nowhere in the document. Dev: reka's `useWarning` fires `Missing 'Description' or aria-describedby="undefined" for DialogContent` on every mobile mount (`Dialog/utils.js:17-21`). Prod: a dangling IDREF is an axe `aria-valid-attr-value` violation — and this repo runs `audit:lighthouse` (`package.json:56`). The fix is one `sr-only` line, exactly mirroring the title the author did add. *Falsifier:* an element inside the drawer portal carrying the generated description id, or `descriptionId` resolving empty in this reka build (it does not — `||= useId(...)`).

**N-5 · the mobile mount-reset writes ephemeral layout state into localStorage, and fires only once.** *new (refines mi-7)*

```ts
:260-262  if (isMobileLayout.value) { props.storedControls.isControlsPanelOpen = false; }
```

`storedControls` is a `useStorage`-backed, per-scene, **persisted** bucket (`controlOptionsStore.ts:48-57`). Two consequences beyond mi-7's ordering point: (a) a mobile visit to a scene permanently clobbers that scene's persisted open-fact, so a later *desktop* session boots that scene's rail collapsed — a per-layout ephemeral fact leaking across layouts and sessions; (b) the reset is a one-shot at setup, so a desktop→mobile viewport change (rotation, resize, devtools) never applies it, and the drawer opens at the expanded detent — contradicting the stated "born at PEEK per scene entry" invariant at `:255-259`. A layout-local `ref` would express the ephemeral fact without touching persistence. *Falsifier:* show the store is session-scoped (`checkAndResetExpiredStore` expires by timestamp only, `controlOptionsStore.ts:53-55`), or a resize path that re-runs the reset.

---

## 4. INFO

**i-1 · mobile `v-if` vs desktop `v-show` asymmetry.** `:117` unmounts the sheet; `:143-144` merely hides the rail. A viewport crossing at 1023/1024 px, or a `hideControls` flip, therefore **destroys** the pane body on mobile — discarding exactly the Monaco cache `ChannelControls.vue:117-128` is engineered to preserve (*"instead of unmounting it, which re-spins Monaco's worker / model / themes"*). The two halves of the same component disagree about whether the body is expensive. The mirror cost also holds: `showSheet` includes `!hideControls`, and `hideControls` is the start screen (`EditorShell.vue:81`), so on desktop the entire controls subtree mounts and stays mounted behind `display:none` throughout the start screen — at odds with the same T.G9 critical-path discipline. **UNPROVEN-NEEDS-LIVE** for the TBT figure; the asymmetry is proven from the tree.

**i-2 · `@update:open` is unhandled.** `:120` binds `:open="true"` as a literal; the root emits `update:open` (`Drawer.vue.d.ts` emit list) and the wrapper never listens. Escape / interact-outside therefore emits into the void and the sheet stays open — which *is* the documented intent (`:109-110`), but it means the Escape affordance reka provides is silently swallowed rather than deliberately declined. Adjacent: a permanently-open `role="dialog"` with no dismiss control in the AT tree is a debatable semantic for a primary control surface; `mode="live-behind"` correctly drops the focus trap and page `aria-hidden`, so the harm is bounded.

**i-3 · props idiom inconsistency.** This component uses `const props = defineProps<…>()` + `props.x` (`:181`), while its direct parent (`AnimationControlsGroup.vue:140`) and direct child (`ChannelControls.vue:257`) both use Vue 3.5 reactive destructure. Three files in one chain, two idioms.

**N-6 · a dead Tailwind group marker.** *new* `:35` puts `group/controls` on `.controls-pane`. Grep for a `group-*/controls` variant across the demo returns no consumer, so the named group is declared and never joined. Harmless, but it is the kind of marker a reader assumes is load-bearing. *Falsifier:* a `group-hover/controls` (or any `group-*/controls`) utility anywhere in the tree.

---

## 5. Claims built and then KILLED against the tree

Recorded because L-18 runs both ways and because an audit that reports only its survivors is not falsifiable. A-1…A-4 carried from pass 1 (re-verified); K-1…K-3 new to this pass.

**A-1 · "the `activeSnap` bisection mis-rounds intermediate drags."** **Dead.** `activeSnapPoint` is written only at settle, and only to a **ladder** value: `drawer.js` — `function w(e){ let t = S(); t.target = e; t.play(x); i.activeSnapPoint.value = e; }`, with the nearest-detent projection `W(e, U(...))` applied before the write. With a two-point ladder the `mid = (PEEK + expanded)/2` bisection at `:290-291` is exact for both members.

**A-2 · "the drag thrashes `localStorage` on every pointermove."** **Dead**, same evidence: the pointermove path writes only the CSS scalar (`h(...)` → `--glass-drawer-t`), never `activeSnapPoint`. `isControlsPanelOpen` flips at most once per settle.

**A-3 · "`mode='live-behind'` leaves the sheet without a re-open affordance."** **Dead.** `drawer.js` renders the handle whenever the ladder has >1 point (`O = computed(() => (snapPoints.length ?? 0) > 1)`), with `role="slider"`, `tabindex="0"`, `aria-label="Drawer position"`, `aria-valuemin/max` from the ladder, plus Home/End/Arrow key handling that calls `snapTo`. This component passes two points (`:280`), so the handle renders and is keyboard-operable. The SFC comment at `:112-114` is accurate.

**A-4 · "`createReusableTemplate` breaks scoped-CSS attribution or slot forwarding."** **Dead.** Read the implementation (`@vueuse/core/dist/index.js:66-96`): `reuse` invokes the stored slot function directly, and compiled slot functions are `_withCtx`-wrapped, which restores the **owner** as `currentRenderingInstance` — so the vnodes carry this component's scope id and its template refs resolve against this component (`paneElRef`, `:241`). That is *why* M-3's mobile override lands. The three forwarded scoped slots (`:67-85`, `:97-102`) resolve against the wrapper's own `$slots`, and the parent's forwarding (`AnimationControlsGroup.vue:38-46`) is intact.

**K-1 · "the `switchTab` keyboard shortcut reaches the keyframes ribbon without ever warming Monaco, so the four buttons are permanent no-ops."** **Dead.** `useKeyframesPaneReveal.ts:107-113` watches `keyframesActive` with `{ immediate: true }` and calls `warmKeyframes()` on **any** route to the surface, keyboard included. Only the async-resolution *window* survives — that is N-4, which is a strictly weaker and provable claim.

**K-2 · "a downward fling at the peek detent drives the sheet to `t = 0`, off-screen, and `:open='true'` prevents recovery."** **Dead.** In `drawer.js`, `G(e, t, n)` returns `e` unchanged when the stepped index leaves the ladder (`if (i < 0 || i >= n.length) return e`), and the pointermove path clamps to `[ladder[0], ladder[last]]`. With `PEEK_SNAP = 0.12` the `if (o <= 0) { open.value = false; return; }` dismiss branch is unreachable for this consumer's ladder.

**K-3 · "`ChannelOptions`' `Teleport to='#controls-ribbon-target'` mounts before `RibbonBar` renders the target — the target is declared *after* the host loop at `:91` — so the ribbon is empty."** **Dead**, and instructively so: `ChannelOptions.vue:377` uses `<Teleport … defer>`, which resolves the target after the current render pass — precisely the fix this template ordering requires. See SUP-5.

---

## 6. Superlatives

**SUP-1 · `createReusableTemplate` is the right primitive, used the right way.**
`:179` + `:29`/`:106` (define) + `:135`/`:156` (reuse). The mobile Drawer and the desktop rail need the *same* ~75-line body in two structurally incompatible hosts (one portaled to `<body>`, one a grid column). Every alternative is worse: duplicate the body (drift), extract a child component (re-declare and forward 10 props, 6 emits and 3 scoped slots), or `<component :is>` (does not solve the portal). This costs **one line**, preserves all three scoped slots with their slot props intact, and — because the two mounts are `v-if`/`v-else-if` on the same node — makes duplicate DOM ids (`#controls-ribbon-target`, `RibbonBar.vue:7`) *structurally impossible*. *Falsifier:* a cheaper mechanism keeping one body, two hosts, three forwarded slots — I could not construct one; or a render path where both branches mount simultaneously — `v-if`/`v-else-if` forbids it.

**SUP-2 · the engine dogfood SURVIVED the facade adoption. Verified in the installed artifact.**
The component deleted its bespoke `useSheetSpring` / `useSheetGesture` / `useSheetState` and ~250 lines of sheet CSS in favour of glass-ui's `<Drawer>` (`:2-13`, `ControlsPaneWrapper.css:5-15`). The obvious risk of adopting a vendor primitive is losing library coverage — the exact reason census **S-8** rules `TypingDots` unreplaceable. Here the coverage is **preserved**, and the comment names a checkable fact inside a dependency's build output rather than asserting it:

```
node_modules/@mkbabb/glass-ui/dist/drawer.js  (import block, line 6)
    import { SpringProgress as M } from "@mkbabb/keyframes.js";
node_modules/@mkbabb/glass-ui/dist/drawer.js  (useDrawerSnap engine)
    new M({ response: N.response * t(n()), dampingFraction: N.dampingFraction,
            initial: e ?? C(), respectReducedMotion: true })
…and the sheet's paint is a pure function of that spring:
    transform: translateY(calc((1 - var(--glass-drawer-t, 0)) * 100%))
```

Combined with the `vite.config.ts` self-alias, glass-ui's `SpringProgress` **is** the demo's `SpringProgress` — one instance, one engine. The sheet's motion, its fling, and its PRM degrade are all the library under test, one level removed; only the hand-rolled *host* was retired. That is the correct shape of an "adopt the primitive" migration: delete the duplicate mechanism, keep the dogfood. A code comment that cites a falsifiable line in a dependency's dist, and is right, is rare enough to be worth the ink. *Falsifier:* show the alias fails to dedupe (then two engine copies exist and the coverage claim weakens), or that glass-ui inlined/forked the spring (it did not — the import is a live specifier).

**SUP-3 · the `v-for` key is chosen against a hostile producer contract.**
`:47 :key="host.animation.id"`. The upstream `channels` is **not** a stable array — re-verified this pass: `composables/scene-facility/index.ts` exposes `get channels() { return channels(); }`, and `channels()` rebuilds the array, every channel object, and every `progress`/`setProgress` closure on each read. A key of `host.name` would be fragile under rename; a key of the channel *object* would churn on every access and remount the whole subtree (and with it Monaco); an index key would be worst of all. Keying on the engine object's stable `id` is the one choice that survives the producer's fresh-object-per-read semantics. *Falsifier:* show `animation.id` is unstable across a group rebuild — the animation objects are the ones the scene composables hold and mutate `superKey` on (`useCubeDemo.ts:67,101,112`), i.e. long-lived. (Note the tension with M-1: the *registry* keys on `name` while the *v-for* keys on `id`. The v-for is right; the registry is the defect.)

**SUP-4 · teardown hygiene in the composables this component owns is exemplary.**
`usePaneHover.ts` uses `useTimeoutFn` for the hover linger (`:42-48`) and `useIdle` for the global idle fade (`:52`) — no raw `setTimeout`, no manual handle bookkeeping, disposal owned by the effect scope; its header (`:40-41`) records that this *replaced* hand-rolled timer bookkeeping. The WHEN/HOW-MUCH split is clean and documented as a split: the composable owns only the boolean, the stylesheet owns the magnitude, the transition, the `:hover`/`:focus-within` instant lift, and the PRM snap-guard (`ControlsPaneWrapper.css:109-120`, `:144-148`). `isPaneIdle = idle && !isPaneHovered` (`:53`) is a real design catch — without it a resting cursor would ghost the very surface the user is pointing at. `useScrollFade.ts` passes the element **ref** (not the element) to `useEventListener` (`:104`) and `useResizeObserver` (`:107`), so both auto-detach from the old node and re-bind on a mid-flight swap — which matters *here* because the pane element is destroyed and recreated whenever the 1023 px boundary is crossed (`:117` vs `:143`, two different vnodes). Its `:50-57` comment states the invariant explicitly. Against M-1 — a leak in the same component's template — this is the instructive contrast: the *composable* layer got disposal right; the *template* layer did not.

**SUP-5 · the ribbon teleport's `defer` is load-bearing and correct.** *new*
`RibbonBar` declares `#controls-ribbon-target` (`RibbonBar.vue:7`) **after** the host loop in this component's template (`:91` vs `:46`), so at first mount `ChannelOptions`' teleport target does not yet exist. `ChannelOptions.vue:377` uses `<Teleport … defer>`, which resolves the target after the current render pass — the exact remedy this ordering requires, and the difference between a working ribbon and a `Failed to locate Teleport target` console error with an empty control strip. The sibling timeline teleport carries it too (`ChannelControls.vue:186`). Easy to omit, invisible when present, fatal when absent. *Falsifier:* show Vue resolves non-deferred `Teleport` targets lazily (it does not — `to` is resolved at mount), or that the target precedes the hosts in render order (`:46` precedes `:91`).

---

## 7. Overlap with the hitherto corpus

| corpus id | this challenge |
|---|---|
| `lane-frontend.md` **F-1** (glass-ui phantom dep, RED) | **B-1** — confirmed independently (`package.json` 0 hits, `package-lock.json` 0 hits, `node_modules` 7.0.0, no vite alias) and **localised**: this file is the demo's *only* `/drawer` consumer, statically imported by the parent, so the failure is total rather than partial. |
| `lane-frontend.md` **F-2 / S-1** (fork rationale stale vs installed 7.0.0) | **N-2** — same shape, new instance: `/drawer`'s `--drawer-inset-block-end` instead of `/tabs`' `aria-orientation`. Here the stale rationale is not just carrying dead code — it is **holding a live UX defect open** and mis-marking a backlog row BLOCKED against a producer that already shipped the unblock. |
| `lane-frontend.md` **F-3 / S-2** (type-only `/tabs`; `ControlsPaneWrapper.vue:165` named by the census) | **M-5(2)** sharpens it from "adopted the data contract, rejected the renderer" to a measured field loss (`icon`/`tooltip`), structurally legal and untypechecked. **N-1** extends the same drift to the **render** layer: a four-level `#tabs-trigger` chain with no terminus, which the census did not reach. |
| `lane-frontend.md` **§7.4** (duplicate-name hazard, `KfPillTabs.vue` vs `KfPillTabs/`) | **mi-1** — same hazard, worse: component and same-named directory in **different parent directories**, plus a third home for `useScrollFade`. |
| `lane-frontend.md` **§6.5** (PRM: `ControlsPaneWrapper.css:144` nested in `min-width:1024px`) | Not contested. The mobile PRM delegation to the Drawer's `respectReducedMotion` is now **verified** in `drawer.js` (SUP-2's `new M({… respectReducedMotion: true })`); the census marked this delegation unverified statically. |
| `lane-frontend.md` **§4** roster (319 lines, "pane wrapper — `Drawer*` + `type SegmentedTabOption`") | Import profile matches exactly. Line count is 320 by `wc -l` (the census's 319 omits the trailing newline) — a non-finding, recorded so the delta is not mistaken for drift. |
| `lane-frontend.md` **S-8** (justified bespoke = keeps engine coverage) | **SUP-2** applies the same test in the opposite direction: an *adoption* that kept coverage passes for the same reason `TypingDots`'s *retention* passes. |
| `lane-library.md` (parse seams) | No overlap — this component touches no parser surface. |

**Contradictions of the corpus: none.** Every census claim re-derivable from this component's closure held.
