claude-opus-5[1m]

# CHALLENGE · `ControlsPaneWrapper` · axis C — CONSUMPTION

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/components/instrument/transport/controls-pane/ControlsPaneWrapper.vue` (319 L)
**Colocated** `./ControlsPaneWrapper.css` (148 L) · `./RibbonBar.vue` (151 L) · `../ControlsPaneWrapper/{useControlsLayout,usePaneRegister,usePaneHover}.ts`
**Mode** static, read-only. No installs, no dev server, no browser tooling. Every livable-only claim is marked **UNPROVEN-NEEDS-LIVE** for SS-13.
**Substrate** keyframes.js `master`; installed `@mkbabb/glass-ui` **7.0.0**, `@mkbabb/value.js` **4.0.0**, `tailwindcss ^4.3.0`.
**Hitherto corpus folded** `formation/keyframes/lane-frontend.md` (F-1 phantom dep, F-2/S-1..S-8 shadow census), `formation/keyframes/lane-library.md` (§4.6 R1 blast radius, §2 two-entry build).

**Posture** — the component was assumed DEFECTIVE until the tree spoke. The tree acquitted it on five counts (§3) and convicted it on twenty (§2). Two of my initial hypotheses were **killed by their own falsifiers** and are recorded as such in §4, because a false defect is worse than a missed one.

**Tally** — 20 defects (1 BLOCKER · 9 MAJOR · 8 MINOR · 2 INFO) · 5 superlatives.

**Second-pass note (same axis, same served model).** C-18..C-20 and S+4/S+5 were added by a re-audit of the same tree; C-14/C-15/C-16 carry corrections from that pass. Nothing from the first pass was retracted — every original claim was re-probed and survived. C-18 in particular is the *sibling* of the teleport hypothesis §4 killed: the first pass correctly acquitted `#controls-ribbon-target` and did not reach `#timeline-expanded-target`, which is gated differently.

---

## 1. What this component consumes

| edge | specifier | binding | runtime? |
|---|---|---|---|
| kf lib | `@mkbabb/keyframes.js` ×3 | `AnimationGroup`, `AnimationLayerConfig`, `KeyframesAnimation` (`:161–163`) | **no — all `import type`** |
| glass-ui | `@mkbabb/glass-ui/drawer` | `Drawer`, `DrawerContent`, `DrawerTitle` (`:166`) | **yes** |
| glass-ui | `@mkbabb/glass-ui/tabs` | `type SegmentedTabOption` (`:165`) | no |
| value.js | — | **none, direct or via `@state`** | — |
| vueuse | `@vueuse/core` | `createReusableTemplate`, `useMediaQuery` (`:167`) | yes |
| demo | `ChannelControls.vue`, `RibbonBar.vue`, `usePaneRegister`, `useControlsLayout`, `type TransportChannel` | `:169–173` | yes |

Two glass-ui subpaths of the 21 the demo reaches (lane-frontend §3.1); it is the **sole** consumer of `/drawer` in the tree (`grep -rn "glass-ui/drawer" demo/` → this file only).

---

## 2. Defects

### C-1 · BLOCKER — the sole `/drawer` consumer rests on a phantom dependency

`ControlsPaneWrapper.vue:166` is the only `@mkbabb/glass-ui/drawer` import in the demo. Per **lane-frontend F-1**, `@mkbabb/glass-ui` is declared in neither `package.json` nor `package-lock.json`:

```
$ grep -n "glass-ui" /Users/mkbabb/Programming/keyframes.js/package.json    → (no output)
$ node -e "console.log(require('./node_modules/@mkbabb/glass-ui/package.json').version)"  → 7.0.0
```

I fold F-1 rather than re-derive it; what is **component-specific** is the blast radius. `npm ci` rebuilds `node_modules` from the lockfile alone, so on a clean checkout this file's line 166 is the module-resolution failure, and the **entire mobile layout has no renderer** — the `v-if="isMobileLayout && showSheet"` branch (`:117`) is the only mobile surface, and the `v-else-if="!isMobileLayout"` desktop branch (`:143`) will not render below 1024px. This is not "a component that degrades"; it is a viewport class with zero controls.

*Falsifier* — a `.npmrc`/workspace/`overrides` entry, a `postinstall` fetch, or a vendored copy that reconstitutes glass-ui without a lockfile row. Probed: `.npmrc` is the single line `legacy-peer-deps=true`; `.gitmodules` declares only `docs/precepts`; `ls -ld node_modules/@mkbabb/glass-ui` is a real directory, not a symlink. None found.

---

### C-2 · MAJOR — BG-11's own named discharge condition SHIPPED; the lever is published and never set

The file carries a 25-line occlusion contract (`:15–26`) declaring a structural gap:

> `the Drawer is pinned to bottom:0 with no bottom-inset lever, so the sheet rides OVER the bottom menubar at any detent. That is the BG-11 structural gap — FORWARDED to the glass-ui tranche and tracked as a BG-11-BLOCKED born-RED backlog row (`**`dischargedBy the --drawer-inset-block-end publish + re-pin`**`).`

and repeats it at `:174–175`:

> `// The published Drawer still lacks a bottom-inset lever; the live-behind`
> `// consumer keeps its measured detents until Glass exposes that component seam.`

**The installed 7.0.0 publishes exactly that token and applies it to exactly this configuration.** `node_modules/@mkbabb/glass-ui/dist/components/drawer/styles.css` (one minified line):

```css
:root { --drawer-inset-block-end: 0px; … }

.glass-drawer[data-glass-drawer-snap-points="true"][data-glass-drawer-direction="bottom"] {
    bottom: var(--drawer-inset-block-end);
    height:     calc(100% - var(--drawer-inset-block-end));
    max-height: calc(100% - var(--drawer-inset-block-end));
}
```

Both gating attributes are emitted by the installed runtime — `grep -o "data-glass-drawer-snap-points\|data-glass-drawer-direction" dist/drawer.js` → 2 each — and this component supplies both preconditions: `direction="bottom"` (`:119`) and `:snap-points="snapPoints"` (`:122`).

The token is **set nowhere in the demo**:

```
$ grep -rn "drawer-inset-block-end" demo/
demo/components/instrument/transport/controls-pane/ControlsPaneWrapper.vue:26:   (dischargedBy the `--drawer-inset-block-end` publish + re-pin).
```

The only occurrence in the whole demo is the comment describing the fix as unavailable.

This is the **exact structural twin of lane-frontend F-2/S-1** (`KfPillTabs` forking over a 4.0.1 ARIA bug fixed in the installed 7.0.0): a workaround whose written discharge condition has shipped, unnoticed, into `node_modules`. The correct repair is one declaration — `.controls-drawer-content { --drawer-inset-block-end: var(--dock-band-reserve); }` or its equivalent — plus deleting `:22–26` and `:174–175`.

*Falsifier* — the rule requires the two data-attributes; if `DrawerContent` omits either under `mode="live-behind"`, the lever is inert. It does not: `grep -c` on `dist/drawer.js` shows both attribute names present twice each (the render + the snap engine), and the `[data-mode="live-behind"]` selector is a *separate* rule (`z-index: calc(var(--z-dock) - 1)`), not an exclusion of the snap-points rule. A second falsifier would be a 7.0.0 changelog marking the token private; the token sits in `:root` in the published `styles.css`, which is the public cascade the demo imports at `styles/style.css:3`.

*Secondary, weaker* — the prose claim "rides OVER the bottom menubar" is itself contradicted on the z axis by `.glass-drawer[data-mode="live-behind"] { z-index: calc(var(--z-dock) - 1); }` in the same file: the sheet paints *under* the dock. The **geometric** overlap (sheet rect intersecting the menubar band) is real and is what the inset lever cures; the **occlusion** phrasing is stale. Visual severity **UNPROVEN-NEEDS-LIVE**.

---

### C-3 · MAJOR — the desktop scroll latch is unreachable; the rail is permanently clipped after the first close

`paneScrollable` (`:299–303`) dispatches on layout; the desktop leg requires `isPanelTransitionDone`:

```ts
isPanelTransitionDone.value && props.storedControls.isControlsPanelOpen
```

`isPanelTransitionDone` has exactly two writers (`useControlsLayout.ts:22,27,36`):

* init `ref(storedControls.isControlsPanelOpen)`
* `watch(isControlsPanelOpen)` → **false** on close
* `onPanelTransitionEnd` → **true** only when `e.propertyName === "max-height"`

The handler is bound only on the desktop branch (`:145 @transitionend="onPanelTransitionEnd"`). **No `max-height` transition exists on that element or any descendant.** The colocated stylesheet sets `max-height: none` statically (`ControlsPaneWrapper.css:83`) and declares only opacity transitions (`:95`, `:102`, `:106`), with its own comment making the removal explicit (`:93–95`):

> `The desktop open/close axis is the [rail]-track collapse; the F9 idle-fade OPACITY transition is the only transition that remains.`

`transitionend` bubbles, so a descendant could feed it — there is none. The only `transition-[max-height]` in the transport cluster is `#timeline-expanded-target` (`AnimationControlsGroup.vue:83`), a **sibling** of `<ControlsPaneWrapper>`, not a descendant; bubbling does not travel sideways.

The close writer is live on desktop — `App.vue:16 @toggle-controls-panel="storedControls.isControlsPanelOpen = !storedControls.isControlsPanelOpen"`.

**Sequence:** boot open (store default `isControlsPanelOpen: true`, `controlOptionsStore.ts:45`) → latch true, pane scrolls. User collapses the rail once → watch drives the latch **false**. User reopens (dock toggle, or the auto-show at `useControlsLayout.ts:66`) → `isControlsPanelOpen` true, latch **still false, forever**. `paneScrollable` false → `'overflow-hidden'` (`:36`) on a `.controls-pane` whose wrapper is also `overflow: hidden` (`ControlsPaneWrapper.css:89`). Any control stack taller than the rail is **clipped and unreachable** for the rest of the session.

The comment at `:296–298` still describes the latch as "the max-height transitionend gate", so the code is documented against a stylesheet that deleted the transition.

*Falsifier* — any descendant of `.controls-pane-wrapper` transitioning `max-height`. `grep -rn "max-height\|max-h-" --include='*.css' --include='*.vue' demo/components/instrument/{transport,keyframes,timeline}/ | grep -i "transition\|max-h-\["` returns only the sibling timeline cell and a static `max-h-[var(--easing-dropdown-max-h)]` on a portalled Select. Second falsifier: if glass-ui's `Card` (rendered by `RibbonBar.vue:3`) transitions max-height — `grep -rn "max-height" dist/components/card/` finds no transition. Third: if the store bucket is re-seeded between close and reopen, resetting the latch via a fresh component mount; the wrapper is keyed per scene (`EditorShell.vue:76 :key="superKey"`), so an in-scene toggle does not remount.

---

### C-4 · MAJOR — `paneScrollable`'s mobile leg is dead: the colocated CSS always wins

`:299–303` computes, for mobile, `props.storedControls.isControlsPanelOpen`, feeding `'overflow-y-auto' : 'overflow-hidden'` (`:36`). The stated intent (`:295–298`):

> `The mobile sheet body scrolls when EXPANDED … the body just needs overflow-y-auto at the open detent.`

But the colocated sheet rules force it unconditionally (`ControlsPaneWrapper.css:40–46`):

```css
@media (max-width: 1023px) {
    .controls-drawer-content .controls-pane {
        min-height: 0; flex: 1 1 auto;
        overflow-y: auto;          /* ← unconditional */
        touch-action: pan-y;
    }
}
```

Two independent mechanisms make this beat the Tailwind utility:

1. **Cascade layers.** Tailwind v4 (`^4.3.0`, `package.json`) emits utilities inside `@layer utilities` via `@import "tailwindcss"` (`styles/style.css:1`). A Vue SFC `<style scoped>` block is injected **unlayered**. Unlayered declarations outrank *every* layered one regardless of specificity.
2. **Specificity**, as a backstop: `.controls-drawer-content .controls-pane[data-v-…]` (0,3,0) vs `.overflow-hidden` (0,1,0).

So on mobile the sheet body scrolls at the **peek** detent too, and the `paneScrollable` computed's mobile branch moves no pixel. The dispatch-on-layout design (`:299`) is half fiction.

*Falsifier* — if Tailwind v4's utilities were emitted unlayered here (a `@source`/`@reference` configuration that strips the layer), the two rules would tie at unlayered and specificity alone would still favour the descendant selector; the finding survives either way. It would die only if `.controls-pane` failed to receive the scope attribute — `createReusableTemplate`'s definition is authored inside this SFC's template, so the compiler stamps `data-v-…` on it. **Pixel consequence UNPROVEN-NEEDS-LIVE**; the cascade fact is static and certain.

---

### C-5 · MAJOR — a four-deep `tabs-trigger` slot chain terminating in a child that has no such slot

`:67–75` forwards a scoped slot into `ChannelControls`:

```vue
<template #tabs-trigger>
    <slot name="tabs-trigger" :selected-animation="…" :is-playing="isPlaying"></slot>
</template>
```

`ChannelControls.vue` declares **two** slots and neither is it:

```
$ grep -n "<slot" demo/components/instrument/transport/channel-controls/ChannelControls.vue
32:  <slot name="tabs-content"></slot>
180: <slot name="tabs-content"></slot>
```

The child's own comments confirm the removal — `ChannelControls.vue:50` ("the former `tabs-trigger` slot + per-trigger reka injection retire — every tab is data") and `:226–228` ("the scene-specific surfaces that formerly injected reka `<TabsTrigger>` via the `tabs-trigger` slot now ride the strip AS DATA").

The whole chain is live plumbing to nowhere:

```
demo/app/App.vue:53                                      <template #tabs-trigger="slotProps"> → sceneRef?.tabsTrigger
demo/components/instrument/shell/EditorShell.vue:88      forwards
demo/components/instrument/transport/AnimationControlsGroup.vue:38  forwards
demo/…/controls-pane/ControlsPaneWrapper.vue:67          forwards  ← this component
demo/…/channel-controls/ChannelControls.vue              NO SUCH SLOT — dead end
```

Four forwarding sites, plus a `sceneRef?.tabsTrigger` expose contract each scene may still satisfy, all discarded. `CubeScene.vue:148` already documents its own migration off it. The seam this component publishes to its parent (`#tabs-trigger` with `selectedAnimation`/`isPlaying` scoped props) is a **contract it cannot honour**.

*Falsifier* — a runtime `$slots` forward, a `v-bind="$slots"`, or a dynamic `<component>` inside `ChannelControls` that renders arbitrary slots. `grep -n "\$slots\|useSlots" ChannelControls.vue` → no output. Reading all 456 lines confirms only the two `tabs-content` slots.

---

### C-6 · MAJOR — the child mutates a parent-owned prop object, and never tears the entry down

`:194` declares `animControlRefs: Record<string, any>` as a **prop**. `:51` writes into it from a template ref callback:

```vue
:ref="(el: any) => { if (el) animControlRefs[host.name] = el }"
```

The parent passes its own `reactive({})` (`AnimationControlsGroup.vue:191,27`) and then reads it in two computeds (`:193–201`) and a keyboard action (`:318`). Two defects in one line:

1. **Prop mutation across the boundary.** The registry is the parent's state, written by the child. Vue's one-way-data-flow contract is inverted; nothing in the type (`Record<string, any>`) marks it as an out-parameter. The idiomatic seam is an `@register`/`@unregister` emit pair or `defineExpose` on the wrapper.
2. **No teardown.** Vue invokes a function ref with `null` on unmount. The `if (el)` guard **swallows exactly that call**, so a destroyed `ChannelControls` instance stays in the registry keyed by its name. On a channel-set change (`controlHosts` is a computed over `props.channels`, `:207–228`) the parent's `activeKeyframesRef`/`activeTimelineRef` (`AnimationControlsGroup.vue:193–201`) can resolve to a **dead component instance**, and `RibbonBar` will invoke `activeKeyframesRef?.exportCompiledCSS?.()` on it (`RibbonBar.vue:40`) — an unmounted instance whose effect scope is disposed. The `?.` chain guarantees no throw, so the failure mode is a **silent no-op button**, the hardest kind to notice.

*Falsifier* — if `controlHosts` were stable for a component's lifetime, only the leak (not the staleness) would bite. It is not: it is a `computed` derived from a reactive prop, and it switches source entirely between the channel axis and the group axis (`:208`, `:221`). A second falsifier: if the parent cleared the registry on channel change — `grep -n "animControlRefs" AnimationControlsGroup.vue` shows only reads at `:191,193–201,318` and the prop pass at `:27`; no `delete`, no reset.

---

### C-7 · MAJOR — `v-show` over `v-for` mounts every channel host at once, multiplying Monaco and defeating the child's own LCP cure

`:46–49` renders one `ChannelControls` per host and hides the inactive ones with **`v-show`**, not `v-if`:

```vue
<template v-for="host in controlHosts" :key="host.animation.id">
    <div v-show="storedControls.selectedAnimation == host.name">
        <ChannelControls … />
```

Every host is therefore **mounted**. Each mounted `ChannelControls` runs `useKeyframesPaneReveal`, which schedules an **unconditional** idle warm at setup — not gated on `active`, not gated on visibility:

```ts
// useKeyframesPaneReveal.ts:100–102
if (typeof w.requestIdleCallback === "function")
    idleHandle = w.requestIdleCallback(() => warmKeyframes(), { timeout: 4000 });
else idleFallback.start();          // 1500 ms vueuse fallback
scheduleIdleWarm();                 // :102 — called at setup, every instance
```

Once warmed, the pane force-mounts regardless of selection — the `v-if` is on `hasSurface('keyframes') && keyframesWarmed`, **not** on the active surface (`ChannelControls.vue:130`, with the rationale at `:117–128`). `KeyframesStringControls` renders `CSSCodeEditor` (`KeyframesStringControls.vue:4,47`), the Monaco host.

`hasSurface('keyframes')` reads the **scene-global** DFA (`ChannelControls.vue:297–298` → `machine.controlSurfaces`), which `surfacesFor` computes from the *selected* channel only (`controlSurfaces.ts:95–120`) — so when the selected channel paints, **all** instances see `keyframes` as valid.

Concrete count: cube exposes three painting channels — `CUBE_ANIMATION_NAMES = { Matrix, Rotations, Hover }` (`useCubeDemo.ts:20–23`), each with `.superKey = SCENE_ID` (`:67,101,112`), surfaced by `facilityFromGroup` which maps **every** group animation to a channel carrying `animation` (`composables/scene-facility/index.ts:92–99`). So `controlHosts.length === 3` → **3 Monaco editor instances** within ~4 s of scene entry, two of them inside `display:none` subtrees.

This directly negates the child's stated T.G9 remediation ("the ~4 MB `vendor-monaco` chunk … mobile LCP 10–16 s", `useKeyframesPaneReveal.ts:26–30, 57–63`): the fix moved the cost off first paint, and the wrapper's mount policy then triples it. **The mount policy is the wrapper's decision, not the child's** — hence a consumption defect at this node.

*Falsifier* — if the `defineAsyncComponent` chunk were shared such that N instances cost one editor. It is not: `defineAsyncComponent` dedupes the **module**, not the component instance; each `<CSSCodeEditor>` constructs its own Monaco model + view. Second falsifier: if `v-show` on the ancestor suppressed setup — it does not; `v-show` is a `display` toggle over a mounted tree, which is the entire distinction from `v-if`. Third: if cube's group carried one animation — three are named and three get `superKey` assigned. **Byte/latency magnitude UNPROVEN-NEEDS-LIVE**; the instance count is static.

---

### C-8 · MAJOR — S-9 (new census row): a hand-rolled scroll fade shadows the installed `FadingScroll`, and 2 of its 3 states are unstyled

Extending lane-frontend's S-1..S-8 shadow census with a row that lane did not reach.

The pane consumes `scrollFadeClass` (`:37`, via `useControlsLayout.ts:76–81` → `useScrollFade`), a demo-local composable producing a **three-state** class (`useScrollFade.ts:74–79`):

```ts
if (overflowStart && overflowEnd) return `${classPrefix}-both`;
if (overflowStart)               return `${classPrefix}-top`;
if (overflowEnd)                 return `${classPrefix}-bottom`;
return "";
```

Exactly **one** of the three has a CSS rule anywhere in the repo:

```
$ grep -rn "scroll-fade" --include='*.css' --include='*.vue' demo/ | grep -v classPrefix
ControlsPaneWrapper.css:56:  .controls-drawer-content .scroll-fade-both { … }
```

(`grep -rl "scroll-fade" node_modules/@mkbabb/glass-ui/dist/` → no output; the classes are demo-only.)

Consequences, all static:

* `scroll-fade-top` and `scroll-fade-bottom` **never paint**. The bottom fade is the state that matters most — content overflowing below while `scrollTop === 0` yields `overflowStart=false, overflowEnd=true` → `scroll-fade-bottom` → **no rule**. The affordance is absent precisely at rest, and appears only mid-scroll.
* The one live rule is doubly gated: `@media (max-width: 1023px)` **and** descendant-scoped to `.controls-drawer-content`, which exists only on the mobile Drawer branch (`:127`). The **desktop rail therefore has no scroll fade at all** — 0 of 3 states — while still paying the composable's scroll listener + `ResizeObserver` (`useScrollFade.ts:104,107`).
* On mobile the `retrigger` is `isPanelTransitionDone` (`useControlsLayout.ts:80`), which per **C-3** never fires there either — the composable's own re-check hook is inert on the one layout where its output is styled.

glass-ui 7.0.0 ships the primitive, on the `/fading-scroll` subpath, with the **per-edge** contract the hand-roll gets wrong:

```ts
// dist/components/fading-scroll/FadingScroll.vue.d.ts
axis?: "x" | "y";  fadeStart?: boolean;  fadeEnd?: boolean;  ariaLabel?: string;
```

and it is **already consumed elsewhere in this same demo** — `scenes/easing/EasingTarget.vue:137 import { FadingScroll } from "@mkbabb/glass-ui/fading-scroll"` (lane-frontend §3.1 counts the subpath at 1 use). So this is not "evaluate a swap"; it is a primitive the tree already trusts, re-implemented worse two directories away.

*Falsifier* — an unscoped global rule for `.scroll-fade-top`/`-bottom` outside `demo/`. The grep spans the whole demo tree and `node_modules/@mkbabb/glass-ui/dist/`; Tailwind cannot generate them (not utility syntax). A second falsifier: if `FadingScroll` required a wrapper element the Drawer's flex column cannot host — it renders a scroll port with a default slot, which is exactly the `.controls-pane` shape.

---

### C-9 · MAJOR — the props/emits contract is never typechecked: no `vue-tsc` exists in this repo

The axis asks after props/emits contract quality. The measuring instrument is absent.

```
$ node -e "const p=require('./package.json');console.log(p.scripts.check)"
tsc --noEmit && tsc --noEmit -p tsconfig.test.json

$ grep -rn "vue-tsc" package.json .github/   → (no output)
$ ls node_modules/.bin/ | grep -i vue        → vue-demi-fix, vue-demi-switch
```

`tsconfig.json` sets `include: ["src/", "demo/"]`, but plain `tsc` does not admit `.vue` into the program (no `allowArbitraryExtensions`, no Vue language plugin, no `vueCompilerOptions`). **Every `.vue` SFC in the demo — 58 files, 11 984 lines per lane-frontend §9 — is outside the type program entirely.** `defineProps`/`defineEmits` generics, template bindings against `Drawer`/`DrawerContent`/`ChannelControls`, slot names, and v-model setter types are all unverified.

That is the mechanism by which **C-5** (a slot forwarded to a non-existent slot) and **C-10/C-11** (silent contract narrowing and a setter/emitter type mismatch) survive in a `strict` + `noUncheckedIndexedAccess` + `exactOptionalPropertyTypes` repo. The rigour is real and lands entirely on `.ts`; the component layer is uncovered.

*Falsifier* — a CI step or IDE-only gate running `vue-tsc`. `.github/` carries no `vue-tsc` mention and the binary is not installed, so no local invocation could succeed either. A second falsifier: `test/demo/**` unit tests type-checking components — `vitest` transpiles without typechecking, and `tsconfig.test.json` inherits the same `.vue`-blind program.

---

### C-10 · MINOR — `extraTabs` advertises glass-ui's five-field contract and delivers three

`:198` declares `extraTabs?: SegmentedTabOption[]`, imported type-only from `@mkbabb/glass-ui/tabs` (`:165`) — lane-frontend's **S-2** ("the demo has adopted glass-ui's tab data contract while rejecting its renderer") counts this exact line. The shape is five fields (`dist/components/tabs/SegmentedTabs.vue.d.ts:5–11`):

```ts
export interface SegmentedTabOption { label: string; value: string; icon?: string; disabled?: boolean; tooltip?: string; }
```

It is passed straight through at `:65` (`:extra-tabs="extraTabs"`) into a prop declared as a **three-field** local type (`ChannelControls.vue:271`, `KfPillTabs/useKfPillTabs.ts:25–29`):

```ts
export interface KfPillTabOption { label: string; value: string; disabled?: boolean; }
```

Structurally assignable (excess-property checks apply only to fresh object literals), so even a working `vue-tsc` would pass it. But `icon` and `tooltip` are **silently discarded** at render. `SURFACE_META` — the demo's single source for built-in tab descriptors — populates `icon` (`controlSurfaces.ts:154 { value:"spring", label:"Physics", icon:"Activity" }`), so the discarded field is a real, populated one. A standalone host (the playground `EditorShell`, `AnimationControlsGroup.vue:169–173`) that supplies an icon per the *declared* prop type gets no icon and no diagnostic.

This is S-2's cost made concrete: carrying a data contract across a boundary that then re-implements the renderer means the contract's edges quietly fall off. Retiring S-1 (`KfPillTabs` → `SegmentedTabs`, whose blocking rationale lane-frontend proved void against 7.0.0) closes this by construction.

*Falsifier* — if `KfPillTabs.vue` rendered `icon`/`tooltip` from an untyped passthrough. Its option type is the three-field interface above and `useKfPillTabs` reads only `.value`/`.disabled`/`.label`. A second falsifier: if no caller ever sets `icon` — `SURFACE_META` does.

---

### C-11 · MINOR — `activeSnap` is typed `computed<number>` against a `string | number | null` emitter

`:284–293` binds `v-model:active-snap-point="activeSnap"` with

```ts
const activeSnap = computed<number>({ get: …, set: (v: number) => { … Number(v) > mid … } });
```

The installed Drawer's emit signature is wider (`dist/components/drawer/Drawer.vue.d.ts`):

```ts
"update:activeSnapPoint": (value: string | number | null) => any;
activeSnapPoint?: number | string | null;
```

The setter is annotated `(v: number)` while the emitter may deliver `string` or `null`. The body is defensively written (`Number(v) > mid`), so the runtime consequences are bounded rather than catastrophic — but they are wrong at the edges: `Number(null) → 0` and `Number("50%") → NaN` both compare `false`, so **either** value silently writes `isControlsPanelOpen = false`, collapsing the sheet to peek. Given this component supplies numeric `snapPoints` (`:280`), a string echo is unlikely; a `null` on teardown is not.

The `set` annotation is also a lie the toolchain cannot catch (**C-9**): with `vue-tsc`, assigning `string | number | null` into a `WritableComputedRef<number>` is a template-codegen error.

*Falsifier* — if the installed engine narrows its echo to the supplied `snapPoints` member type, `null` never arrives and only the annotation is wrong. The published emit type is the contract of record and it includes `null`; narrowing would have to be proven from `dist/drawer.js`'s snap engine, and the *type* defect stands regardless. **Runtime reachability UNPROVEN-NEEDS-LIVE.**

---

### C-12 · MINOR — a seven-method command surface crosses two boundaries as `any`

`:195–196` declares `activeKeyframesRef: any; activeTimelineRef: any`. They are forwarded verbatim to `RibbonBar` (`:94–95`), which re-declares them `any` (`RibbonBar.vue:139–140`) and then invokes seven methods through optional chains:

```
RibbonBar.vue:20  activeKeyframesRef?.copyCSS?.()
:28               activeKeyframesRef?.formatCSS?.()
:40               activeKeyframesRef?.exportCompiledCSS?.()
:49,:58           activeKeyframesRef?.cssApplied            (read)
:53               activeKeyframesRef?.applyCSSStyles?.()
:76               activeTimelineRef?.snapshot?.()
:84               activeTimelineRef?.openImportDialog?.()
:92               activeTimelineRef?.exportCSS?.()
:100              activeTimelineRef?.openAddCSSDialog?.()
```

Every call site is `?.method?.()` — a **double** optional chain that converts any contract break (renamed method, wrong instance, unmounted ref per **C-6**) into a button that does nothing and reports nothing. The producing side *is* typed: `ChannelControls.vue:410–414` `defineExpose({ keyframesControlsRef, timelineRef, selectControl })` over `useTemplateRef<InstanceType<typeof …>>`. The types exist and are thrown away in transit.

*Falsifier* — if no better type were expressible. `InstanceType<typeof KeyframesStringControls>` and `InstanceType<typeof KeyframeTimeline>` are already computed one level down (`ChannelControls.vue:372–373`) and could be re-exported. A second falsifier: circular-import pressure forcing `any` — `RibbonBar` imports neither component, so a shared interface in `controls-pane/` costs no cycle.

---

### C-13 · MINOR — a reka `role="dialog"` is pinned permanently open and cannot be dismissed

`:121 :open="true"` is a **literal**, not a model. `DrawerContent` extends reka's `DialogContentProps` (`dist/components/drawer/DrawerContent.vue.d.ts:4`) and the runtime renders `DialogPortal` → `DialogContent` → `DialogTitle` (`grep -o` on `dist/drawer.js` → one each). Under `mode="live-behind"` reka is non-modal (no focus trap, no page `aria-hidden` — the mode's documented purpose), but the content element is still a dialog. With `open` bound to a constant and **no `@update:open` handler**, reka's dismiss path (Escape → `escapeKeyDown` → `onOpenChange(false)`) is emitted into the void: the drawer never closes.

The component acknowledges the friction obliquely at `:132–134` ("reka DialogContent wants a labelling title; keep it off-screen") — a sr-only title exists to satisfy a primitive whose dismissal semantics the consumer has disabled. A permanently-present, non-dismissible dialog is a WAI-ARIA dialog-pattern violation (Escape must dismiss).

The design intent is defensible — peek *is* the resting state, per `:109–116` — but the correct primitive for a persistent, non-dismissible surface is not a dialog. glass-ui publishes `/surface` (`exports` lists `./surface`), unreached by the demo (lane-frontend §3.1: 21 of 73 subpaths).

*Falsifier* — if reka's non-modal `DialogContent` drops `role="dialog"`. It does not; `modal` governs `aria-modal` and focus-trapping, not the role. A second falsifier: if an ancestor handled Escape to collapse to peek — `grep -rn "isControlsPanelOpen\s*=" demo/` lists nine writers, none keyed to Escape within this subtree. **AT announcement UNPROVEN-NEEDS-LIVE.**

---

### C-14 · MINOR — the occlusion contract's headline number contradicts the constant, in three places

| site | claim |
|---|---|
| `ControlsPaneWrapper.vue:19–20` | "subject scenes cap at **0.48** (sheet.top ≈ 52dvh, stage readable)" |
| `ControlsPaneWrapper.vue:267` | "subject **0.48** → sheet.top ≈ 52dvh" |
| `ControlsPaneWrapper.css:19` | "subject **0.48** ≈ 52dvh reserve" |
| `ControlsPaneWrapper.vue:270–274` | "subject **0.40** keeps ≈49dvh of unoccluded stage" |
| `ControlsPaneWrapper.vue:275` | `const EXPANDED_SUBJECT = 0.4;` ← **the code** |

*(Second pass: the 0.48 prose is at **three** sites, not two — the detent-ladder comment at `:267` repeats it a second time inside the SFC, eight lines above the constant that contradicts it. The CSS site is `:19`, not `:20`.)*

Three of the four prose sites cite a detent the code does not use, and one of them is the top-of-file **occlusion contract** — the document a reader consults to learn what the stage reserve *is*. The gate named to enforce it (`proof:stage-visible`, `ControlsPaneWrapper.css:21`) would be re-derived against 0.40 while the contract asserts 0.48. `editor/storyboard` at 0.62 is consistent across all sites (`:276 EXPANDED_EDITOR = 0.62`).

**Coupled to C-2.** Discharging the inset lever changes the denominator this number lives in: with `--drawer-inset-block-end` set, the sheet element becomes `height: calc(100% − inset)` and the transform is `(1 − t)·100%` **of the element** (`dist/drawer.js:381`), so the visible *viewport* fraction becomes `t·(1 − inset/vh)`, not `t`. Both `EXPANDED_SUBJECT` and `EXPANDED_EDITOR` must be re-solved in the same edit that fixes the prose.

*Falsifier* — if a later transform scaled 0.40 into an effective 0.48 visible fraction. `snapPoints` (`:280`) feeds the Drawer directly and glass-ui's CSS maps the snap fraction to `--glass-drawer-t` 1:1 (`components/drawer/styles.css`, `bottom: 0; height: 100%` with translate by `t`); no such transform exists.

---

### C-15 · MINOR — the mobile peek reset is setup-only and cannot fire on a layout crossing

`:260–262`:

```ts
if (isMobileLayout.value) {
    props.storedControls.isControlsPanelOpen = false;
}
```

An imperative, one-shot read of a reactive media query at setup. The comment (`:255–259`) justifies it by remount frequency — "the wrapper remounts per scene via the group superKey boundary" (true: `EditorShell.vue:76 :key="superKey"`). But a **viewport crossing without a scene change** — desktop → narrow (rotation, window resize, devtools) — does not remount. `isControlsPanelOpen` carries the desktop `true` across the boundary, so the Drawer mounts at `expandedSnap` (0.40/0.62) rather than the intended peek. It is also a **prop-object mutation during setup** — a persisted `useStorage` bucket (`controlOptionsStore.ts:49–57`), so the write survives the session.

**The reverse crossing is worse (second pass).** Mobile → desktop: the reset has already written `false`, so widening past 1024 px renders the desktop rail in `controls-pane--closed` (`:149–151`) — `pointer-events: none` and `opacity: 0` (`ControlsPaneWrapper.css:97–107`) — and the user's controls rail is simply *gone* until they find the dock toggle. The desktop→mobile direction over-reveals; the mobile→desktop direction under-reveals. Both are one watcher away from correct.

**Reachability is not hypothetical**: an iPad rotation crosses this exact boundary (portrait 820/834 px < 1023 ≤ landscape 1112/1180 px), and `vite.config.ts` sets `server.host: true` for on-device testing, so the crossing is on the demo's own test path.

*Falsifier* — if `useMediaQuery` crossing triggered a remount. It drives a `v-if`/`v-else-if` **inside** the component (`:118`, `:143`); the component itself is not re-created. A second falsifier: if a `watch(isMobileLayout)` existed elsewhere in the subtree to re-peek — `useControlsLayout.ts:48` re-derives the same query only to *gate* the auto-show watch (`:58–69`), never to reset the open fact.

---

### C-16 · INFO — provenance citations in the header comments have drifted off the installed artifact

The header cites glass-ui internals by line: `:9–10` "`drawer.js:6 import { SpringProgress } from "@mkbabb/keyframes.js"`; `:134 new A({ … })`", and `ControlsPaneWrapper.css:12–13` / `:18` cite "drawer.css :53/:134".

Against the installed 7.0.0:

* `dist/drawer.js` line **7**, not 6, carries `import { SpringProgress as M } from "@mkbabb/keyframes.js"`. The spring is constructed at line **200** (`grep -n "new M(" dist/drawer.js`), not 134.
* `dist/components/drawer/styles.css` is a single minified line with no trailing newline (`wc -l` → **0**). Line references 53 and 134 cannot resolve.

**Generalise it.** Every comment in `demo/` that cites a `@mkbabb/glass-ui/dist/*` line number is presumptively stale against 7.0.0: the JS re-minified (so numbering shifted) and the CSS ships as one line (so *all* CSS line refs are void). This is cheap to sweep and it is the same mechanism that produced **C-2** and lane-frontend **F-2** — a 4.0.1-era comment carried forward as binding rationale. Recommend the formation treat "4.0.1-era rationale surviving into the 7.0.0 tree" as a repo-wide sweep rather than three point findings.

The *claims* are true (the dogfood is preserved through the facade — §3.3); the *coordinates* point at a build the tree no longer holds, so a future auditor following them lands on noise. Cite by symbol, not by line, when citing a `dist/`.

*Falsifier* — an unminified/sourcemapped copy at those coordinates. `dist/` ships the minified CSS as the only stylesheet on the `/drawer` subpath.

---

### C-17 · INFO — three `import type` statements from one specifier

`:161–163` opens three separate lines against `@mkbabb/keyframes.js` for `AnimationGroup`, `AnimationLayerConfig`, `KeyframesAnimation`. One statement expresses the same thing; three make the library's surface look wider at a glance than it is. Cosmetic, listed for completeness.

---

### C-18 · MAJOR — the *other* teleport: N hosts, one `#timeline-expanded-target`, and this one is **not** gated on `active`

*Second pass. This is the sibling of the hypothesis §4 killed — and it lands where that one did not.*

§4 correctly acquitted `#controls-ribbon-target`: `ChannelOptions.vue:377` reads `<Teleport v-if="active" to="#controls-ribbon-target" defer>`, and `:64` makes `active` true for at most one host. **The transport cluster has a second teleport, and it carries no such gate.** `ChannelControls.vue:186–200`:

```vue
<Teleport to="#timeline-expanded-target" :disabled="!storedControls.isTimelineExpanded" defer>
    <div v-if="isTimelineVisible" :key="storedControls.selectedControl" …>
        <KeyframeTimeline ref="timelineRef" :targets="animation.targets" … />
    </div>
</Teleport>
```

Both gates read the **scene-shared** store bucket, never the host's own `active`:

* `isTimelineVisible` — `ChannelControls.vue:377–379` = `storedControls.selectedControl === "timeline" || storedControls.isTimelineExpanded`.
* the `:disabled` binding — `storedControls.isTimelineExpanded`.

And `active` cannot help, because **`ChannelControls` never uses it for anything of its own**. Probe: `grep -n "active" ChannelControls.vue` filtered of `keyframesActive`/`selectedControlSurface`/`data-state`/`inactive` leaves `:108`, `:257`, `:262` — the destructure, the prop declaration, and a single verbatim forward to `ChannelOptions`. The wrapper passes `:active` (`:64`); the child spends it entirely on the ribbon teleport that §4 already cleared.

Per **C-7**, every host is *mounted* (`v-show`, not `v-if`), and per §4 every host resolves the **same** store bucket (`animation.superKey` = the scene id). So when the timeline is expanded, **every** mounted host satisfies both gates simultaneously and relocates its own `KeyframeTimeline` into the one target element rendered at `AnimationControlsGroup.vue:79–88`.

**Why `v-show` does not save it, as it does elsewhere.** This is the precise reason the ribbon case is benign and this one is not: `<Teleport>` *moves the node out of the wrapper's `v-show` subtree*. The `display:none` that hides an inactive host applies to the subtree the node has left. The inactive hosts' timelines land in the expanded target **visible**.

**Counts, from the tree** — both multi-channel scenes reach the triad, so both mount the `v-else` branch that owns this teleport:

| scene | painting channels | source | `isSingleSurfaceScene`? |
|---|---|---|---|
| cube | **3** (Matrix, Rotations, Hover) | `useCubeDemo.ts:20–23`, via `facilityFromGroup` (`scene-facility/index.ts:92–99`) | no — triad + `matrix-controls` |
| spring | **2** (Sweep, Entry) | `useSpringDemo.ts:406–427`, both carrying `animation` | no — triad + `spring` facet |

Both channels of spring carry the same superKey (`useSpringKeyframesEditor.ts:66`, `useCompiledEntry.ts:63` → both `SPRING_SCENE_ID`), so their buckets are identical. `surfacesFor` (`controlSurfaces.ts:99–114`) grants a painting channel the whole `BUILT_IN_SURFACES` triad, so `builtInTabs.length > 0` and `isSingleSurfaceScene` (`ChannelControls.vue:331–336`) is false for both — the flat branch, which has no teleport, is not taken.

**Consequence:** expanding the timeline on cube stacks **3** `KeyframeTimeline` instances in one container; on spring, **2**. Beyond the render, each is a 312-line instrument bound to a *different* animation's `targets`/`options` (`:194–195`), so the stack is not even N copies of one thing — it is N different timelines presented as the scene's timeline. The ribbon meanwhile drives only one of them (`animControlRefs[selectedAnimation].timelineRef`, `AnimationControlsGroup.vue:198–201`), so N−1 are unreachable by their own controls.

**Severity.** MAJOR on the source-proven duplication (N instances, N teleports, one container). **UNPROVEN-NEEDS-LIVE:** the rendered stacking. If live confirms N visible timelines, this escalates to **BLOCKER** — it is a visible duplication of the instrument's primary editing surface on two of seven shipped scenes.

*Falsifier* — any ONE of: (a) `ChannelControls` gating this teleport on `active` (it does not; the grep above is exhaustive over 456 lines); (b) `controlHosts.length === 1` on cube and spring (three and two channel descriptors are enumerated in the sources cited); (c) the two/three hosts resolving **different** store buckets, so at most one satisfies `isTimelineVisible` (§4 disproved this for cube; `useSpringKeyframesEditor.ts:66` + `useCompiledEntry.ts:63` disprove it for spring); (d) Vue `<Teleport>` deduplicating or last-writer-winning into a shared target rather than appending in mount order.

---

### C-19 · MINOR — no `DrawerDescription`: a dev warning every mobile mount, and a dangling `aria-describedby` idref

*Second pass. The other half of the labelling contract S+4 credits the component for getting right.*

`:166` imports `Drawer, DrawerContent, DrawerTitle`. glass-ui also publishes `DrawerDescription` on the same subpath (`dist/components/drawer/index.d.ts`, final export). The component renders the title (`:134`) and no description.

reka emits the describedby attribute **unconditionally** — `reka-ui/dist/Dialog/DialogContentImpl.js:78` `"aria-describedby": unref(rootContext).descriptionId` — and warns when the idref resolves to nothing (`reka-ui/dist/Dialog/utils.js:16–20`):

```js
const describedById = contentElement.value?.getAttribute("aria-describedby");
if (descriptionId && describedById) {
    const hasDescription = document.getElementById(descriptionId);
    if (!hasDescription) console.warn(DESCRIPTION_MESSAGE);   // "Missing `Description` …"
}
```

Both guards hold here: reka's root always generates `descriptionId`, and the attribute is always rendered. So the mobile branch ships (a) a `console.warn` on **every** mount, and (b) an `aria-describedby` pointing at an element that does not exist — an invalid ARIA reference (axe `aria-valid-attr-value`).

Compounding **C-13**: this node is already a permanently-open, Escape-inert `role="dialog"`. Giving that dialog a broken description idref on top of an undismissable open state means the one glass primitive the demo adopts wholesale is also the one whose a11y contract it half-satisfies. The repair is one element.

*Falsifier* — mounting the mobile layout and observing (a) no `Missing \`Description\`` warning in the console, and (b) `document.getElementById(el.getAttribute('aria-describedby'))` resolving to a real node. Either kills it. A second falsifier: glass-ui's `DrawerContent` passing an explicit `aria-describedby={undefined}` to suppress reka's generated id — `grep -o "aria-describedby" dist/drawer.js` returns nothing, so it forwards reka's default.

---

### C-20 · MINOR — the cluster's sibling reaches the root barrel where subpaths exist

*Second pass. A subpath-choice finding, squarely on this axis.*

`RibbonBar.vue:132` — the wrapper's only non-`ChannelControls` child, rendered at `:91–103` — draws three primitives from the **root** barrel:

```ts
import { Button, Card, CardContent } from "@mkbabb/glass-ui";
```

The installed package publishes 73 subpath exports, `./button` and `./card` among them (`node -e 'Object.keys(require("…/package.json").exports)'`). This wrapper models the correct idiom 34 lines away — `:166` reaches `/drawer` — and lane-frontend §3.1 counts **31** root-barrel sites against 21 distinct subpaths reached, so this is a tree-wide idiom with a local instance inside the cluster under audit.

The cost is bundle-graph width in a demo that works hard to defer bytes elsewhere: `useKeyframesPaneReveal.ts:26–30, 57–63` exists solely to keep a ~4 MB Monaco chunk off first paint, while the same cluster pulls a 73-export barrel for three leaf components.

*Falsifier* — the root barrel proving fully side-effect-free and tree-shaken in this build (`formats:["es"]`, per lane-library §2), which would make the choice cosmetic and reduce this to INFO. It would not make the barrel the *better* choice: the subpath is the producer's published contract for exactly this, and the deep-import idiom is what makes **C-2**-class producer changes legible at the import line.

---

## 3. Superlatives (L-18 both ways)

### S+1 — the kf consumption is **100 % type-only**: this node adds zero library runtime and zero R1 exposure

All three keyframes.js imports are `import type` (`:161–163`) and erase at build. **value.js is imported nowhere in this file**, directly or through `@state` (`controlOptionsStore.ts:1` is itself `import type`). The component's entire kf surface is a compile-time shape.

Against lane-library §4.6, the R1 crash class — the shipping `parseCssColor("oklch()")` throw — has five demo entry points, and **none is in this component's import closure**:

```
demo/scenes/square/useSquareTumble.ts:22          parseCssColor(css)   ← the R1 surface
demo/scenes/square/useSquareDemo.ts:82            parseCssScalar(v)
demo/utils/keyframeSelector.ts:15                 parseKeyframeSelector(source)
demo/utils/reference-data/animationDescriptions.ts:76  parseTimingFunction(value)
demo/…/keyframes/KeyframesEditor.vue:186          parseCssScalar(val)
```

The nearest value.js runtime edge under `transport/` is `clamp` from `@mkbabb/value.js/math` (`AnimationControlsGroup.vue:125`, `ChannelOptions.vue:426`, three composables) — a pure numeric helper on a subpath with no grammar. **The parser blast radius does not reach this node**, and that is a property of how it consumes, not an accident: it takes shapes, not behaviour.

*Falsifier (runs both ways per L-18)* — a transitive runtime edge through `ChannelControls` → `KeyframesStringControls` → `@kf-engine` (the heavy barrel, `KeyframesStringControls.vue:24`) does reach the parser. But that import is behind `defineAsyncComponent` (`ChannelControls.vue:252`) — a separate chunk on a separate seam, and its warm policy is the child's. The claim is scoped to *this component's* own consumption, and at that scope it holds.

### S+2 — the Drawer adoption is the demo's best glass-ui consumption, and it preserves the dogfood through the facade

This is the **inverse** of lane-frontend's S-1..S-7 shadow census. Where seven components hand-roll what glass-ui already ships, this one **deleted its hand-roll**: `SheetGrabHandle` + `useSheetGesture`/`useSheetSpring`/`useSheetState` + ~250 L of `--sheet-detent-*` sheet CSS, retired onto `<Drawer mode="live-behind">` (documented `:2–13`, `ControlsPaneWrapper.css:5–15`). Detent math, velocity fling, spring rest, and the grab-handle gesture surface all moved to the producer.

And the retirement **did not cost the library its own coverage** — verified on the installed artifact:

```
$ grep -n "keyframes.js" node_modules/@mkbabb/glass-ui/dist/drawer.js
7:import { SpringProgress as M } from "@mkbabb/keyframes.js";
```

glass-ui's snap engine is driven by keyframes.js's own `SpringProgress`, which the demo's self-alias (`vite.config.ts:37–60`, lane-library §8) dedupes onto the same instance the demo uses. The sheet spring is still kf's spring — the inv-ζ dogfood survives one layer down. Adopting a primitive **without** losing library coverage is the exact discrimination lane-frontend's S-8 (`TypingDots`, keep) demanded, applied in the other direction.

*Falsifier* — if glass-ui's `@mkbabb/keyframes.js` import resolved to a *different* engine copy, the dogfood would be nominal. `vite.config.ts:28–36` documents the self-alias existing precisely to prevent that ("dedupes glass-ui onto the SAME keyframes instance"), and `tsconfig.json`'s `paths` mirrors it for types.

### S+3 — `createReusableTemplate` gives one body two homes without duplicating DOM, ids, or component state

`:179` `const [DefinePaneBody, ReusePaneBody] = createReusableTemplate()`, defined once (`:29–106`) and consumed at `:135` (portalled into the Drawer) and `:156` (the desktop grid column), with `v-if`/`v-else-if` guaranteeing exactly one instantiation.

The naive alternatives are both defective, and this avoids both: **duplicating the markup** would mount two `RibbonBar`s and therefore two `id="controls-ribbon-target"` nodes (`RibbonBar.vue:7`), and `ChannelOptions.vue:377 <Teleport v-if="active" to="#controls-ribbon-target">` resolves an id selector — a duplicate id is a coin-flip teleport target. **Rendering both and hiding one** would double every `ChannelControls` subtree (already costly per **C-7**). Choosing a vueuse primitive over a hand-rolled render-function shuttle is also the right consumption instinct — it is the same discipline `usePaneHover.ts:40–48` applies when it hands timer bookkeeping to `useTimeoutFn` ("inv ζ — no hand-rolled setTimeout", `:20–22`).

*Falsifier* — if the reused template lost its scoped-style attribute in one of the two homes, the CSS in `ControlsPaneWrapper.css` would apply asymmetrically. The template is authored inside this SFC, so the compiler stamps `data-v-…` at definition; both call sites render the same stamped vnodes. **Rendering parity across the two homes UNPROVEN-NEEDS-LIVE**; the structural argument is static.

*Second-pass corroboration of the scoped-style half* — verified against the installed `@vueuse/core@14.3.0` (`dist/index.js:67–96`): `reuse` invokes the stored `slots.default`, a `_withCtx`-wrapped function that restores the **defining** instance as `currentRenderingInstance` before the vnodes are created. The scope id is therefore this SFC's in both homes, including across the Drawer's portal — so the descendant rules at `ControlsPaneWrapper.css:40–73` survive the teleport to `<body>`. This forecloses a plausible BLOCKER (*"148 lines of scoped CSS silently no-op in the portalled home"*) that the primitive's reputation invites; it is not one.

### S+4 — the writable-computed ↔ snap-point bridge is safe *against this engine*, and the ladder forecloses the dismiss path

`:284–293` reduces a continuous detent to a boolean through a getter that can return only two values. That shape is normally a trap: if the producer emitted per-frame drag values, the getter would fight the drag every tick and the sheet would stutter. **It does not, and the installed artifact proves it rather than the comment asserting it.**

In `dist/drawer.js` the drag path writes the CSS variable **directly** — `:183` `style.setProperty("--glass-drawer-t", …)`, reached from the `pointermove` handler at `:241–246` — and touches the model **only at settle**: `:219` `t.target = e; t.play(x); i.activeSnapPoint.value = e`, called from the `pointerup` resolver. The emit bridge at `:62` (`watch(T, e => emit("update:activeSnapPoint", e))`) therefore fires once per detent, never per frame. The consumer's midpoint rule (`:290–291`) is the correct reduction of a *settled* detent.

The ladder is likewise closed against accidental dismissal. `z()` (`:257–261`) sets `open.value = false` when the resolved target is `<= 0`, and the fling stepper `G()` (`:156–161`) clamps at the ladder ends (`if (i < 0 || i >= n.length) return e`). With `snapPoints = [0.12, expanded]` (`:269`, `:280`) the floor is `0.12 > 0`, so **no gesture can reach the close branch** — the "held permanently OPEN" contract at `:109–116` is enforced by the ladder's *shape*, not by the `:open="true"` literal alone. (That literal remains **C-13**'s defect on the ARIA axis; this is the mechanical claim, and it holds.)

This forecloses two further plausible-but-false defects — *"the computed clamp fights the drag"* and *"a downward fling closes the sheet with no way to reopen"* — both of which the two-value getter makes tempting to allege. Recorded so neither is re-raised.

*Falsifier* — a per-frame `update:activeSnapPoint` emit (excluded by `:62` + `:219`), or a snap floor of `0` reaching `z()`'s `o <= 0` branch (excluded by `PEEK_SNAP = 0.12`, `:269`).

### S+5 — the composable seams pass getters and refs, not dereferenced values

`:236–238` — `usePaneRegister({ stageMode: () => props.stageMode })` — passes a **getter**, and the composable documents the choice (`usePaneRegister.ts:8–11`, "Pass the raw prop (a getter) — undefined falls back to `subject`") so `:36` `computed(() => stageModeProp() ?? "subject")` stays reactive across prop changes rather than capturing a value at setup. Both its option and return shapes are named interfaces (`UsePaneRegisterOptions`, `UsePaneRegisterReturn`, `:4–18`) rather than inferred — the exact opposite of the `any` surface **C-12** convicts, in the same component.

`useControlsLayout(props.storedControls, paneElRef)` (`:241–250`) is sound for the same reason at one remove: it receives a stable reactive singleton and a `Ref`, not a read value, so nothing is captured non-reactively. This is worth stating because the setup-time read one screen below (`:260–262`, **C-15**) is the *one* place the file breaks this discipline — the surrounding code establishes that the author knew the idiom, which makes C-15 a slip rather than a pattern.

*Falsifier* — `props.stageMode` proving non-reactive at that call site, or `usePaneRegister` reading the getter once outside a reactive context (`:36` is a `computed`, so it does not).

---

## 4. Hypotheses I killed (recorded so they are not re-raised)

* **"Multiple `ChannelControls` instances teleport into the single `#controls-ribbon-target`, stacking N ribbons."** — **FALSE.** `ChannelOptions.vue:377` gates the Teleport on `v-if="active"`, and `:64` passes `:active="storedControls.selectedAnimation == host.name"`, which is true for at most one host. The teleport is singular by construction. (The *mount* multiplication is real and is **C-7**; *this* teleport's multiplication is not.)
  **⚠ Scope correction (second pass).** This acquittal is sound but **narrower than it reads**: it clears `#controls-ribbon-target` only. The cluster has a *second* teleport — `ChannelControls.vue:186` → `#timeline-expanded-target` — whose gates (`isTimelineVisible`, `isTimelineExpanded`) read the shared bucket and **never consult `active`**. That one does multiply, and it is **C-18**. The lesson generalises: `active` is not a teleport guard in this cluster, it is a prop `ChannelControls` forwards once (`:108`) and otherwise ignores — so "is it gated on `active`?" must be asked per teleport, never inferred from a sibling.
* **"`ControlsPaneWrapper`'s group-level `storedControls` and `ChannelControls`' per-animation store are different buckets, so `RibbonBar` gates on a different `selectedControl` than the panel it decorates."** — **FALSE** for every scene in the tree. `ChannelControls.vue:274` calls `getStoredAnimationGroupControlOptions(animation)` → `getAnimationSuperKey` → `animation.superKey` (`storeUtils.ts:22–34`), and every scene assigns `animation.superKey = <SCENE_ID>` (`useCubeDemo.ts:67,101,112`; `useAmigaDemo.ts:143`; `SquareScene.vue:155`; `useEasingDemo.ts:303`), which is the same key the parent passes (`AnimationControlsGroup.vue:176`). Same bucket, same object. The divergence would appear only for an animation with no `superKey` (falling to `"default"`); no such animation exists in the demo. Recorded as a **latent** hazard, not a defect.

---

## 5. Ledger

| id | severity | claim | anchor |
|---|---|---|---|
| C-1 | **BLOCKER** | sole `/drawer` consumer on a phantom dep (F-1) | `:166` |
| C-2 | MAJOR | BG-11 discharge condition shipped; `--drawer-inset-block-end` published, never set | `:22–26`, `:174–175` |
| C-3 | MAJOR | desktop scroll latch unreachable → permanent clip after first close | `:299–303`, `CSS:83,93–95` |
| C-4 | MAJOR | mobile `paneScrollable` dead (unlayered scoped CSS beats layered utility) | `:36`, `CSS:41–46` |
| C-5 | MAJOR | 4-deep `tabs-trigger` chain into a child with no such slot | `:67–75` |
| C-6 | MAJOR | prop-object mutation + no ref teardown → stale instances | `:51`, `:194` |
| C-7 | MAJOR | `v-show` over `v-for` → N Monaco (cube = 3); defeats T.G9 | `:46–49` |
| C-8 | MAJOR | **S-9** hand-rolled scroll fade vs installed `FadingScroll`; 2/3 states unstyled, desktop 0/3 | `:37`, `CSS:56` |
| C-9 | MAJOR | no `vue-tsc` — the SFC contract is unmeasured | `package.json` `check` |
| C-10 | MINOR | `SegmentedTabOption` → `KfPillTabOption`: `icon`/`tooltip` silently dropped | `:165,198,65` |
| C-11 | MINOR | `computed<number>` setter vs `string \| number \| null` emitter | `:284–293` |
| C-12 | MINOR | 9 call sites through `any` + double optional chain | `:195–196`, `RibbonBar:20–100` |
| C-13 | MINOR | `:open="true"` pins an undismissable `role=dialog` | `:121` |
| C-14 | MINOR | detent prose 0.48 (×2) vs code 0.40 | `:20`, `CSS:20`, `:275` |
| C-15 | MINOR | setup-only peek reset; no desktop→mobile crossing | `:260–262` |
| C-16 | INFO | `dist/` line citations drifted (drawer.js:6→7, :134→200; drawer.css:53/134 in a 0-newline file) | `:9–10`, `CSS:12–18` |
| C-17 | INFO | three `import type` lines, one specifier | `:161–163` |
| **C-18** | **MAJOR** | the *other* teleport — N hosts → one `#timeline-expanded-target`, **not** gated on `active` (cube 3, spring 2) | `:46–49,64`; `ChannelControls:186–200,377–379` |
| **C-19** | **MINOR** | no `DrawerDescription` → reka dev warn every mobile mount + dangling `aria-describedby` idref | `:134,166`; `reka Dialog/utils.js:16–20` |
| **C-20** | **MINOR** | root-barrel import in the cluster while `./button`/`./card` subpaths exist | `RibbonBar:132` |
| **S+1** | superlative | 100 % type-only kf consumption; R1 class unreachable at this node | `:161–163` |
| **S+2** | superlative | best glass-ui adoption in the demo; dogfood preserved through the facade | `:2–13`, `drawer.js:7` |
| **S+3** | superlative | `createReusableTemplate` — one body, two homes, no duplicate id/state; scope id survives the portal | `:179,135,156` |
| **S+4** | superlative | settle-only emit + `0.12` ladder floor: the computed bridge cannot fight the drag, and no gesture can dismiss | `:284–293`; `drawer.js:62,219,257–261` |
| **S+5** | superlative | composable seams pass getters/refs, not captured values; named option+return interfaces | `:236–238`; `usePaneRegister.ts:4–18,36` |

**Repair order** — C-1 first (nothing below is reproducible until the lockfile is honest, per lane-frontend §10.1). Then C-3/C-4 (two dead scroll dispatches, both one-line), then C-2 (set the published token — and re-solve the detents in the same edit, since the inset changes the fraction's denominator; C-14 dies with it), then **C-18** (gate the timeline teleport on the host's own `active`, or hoist it to the wrapper as a singleton — verify live on cube first, since it stacks three), then C-5/C-6 (contract hygiene), then C-9 (install `vue-tsc`, which converts C-5/C-10/C-11 from prose into gate output), then C-7 (mount policy — C-18 and C-7 share a root cause and may share a fix: `active` is passed and ignored), then C-19/C-20/C-12 (one-line contract repairs, independently landable), then C-8 with S-1 (both die on the `KfPillTabs`/`FadingScroll` adoption wave).

**The one-line cluster** — C-2, C-15, C-19, C-20 and the C-16 sweep are each a single declaration, watcher, element, or specifier. Together they retire one BLOCKER-adjacent backlog row, one a11y warning, one invariant hole and one bundle-graph nit for less edit surface than C-8 alone.

---

## Provenance

Every glass-ui claim is sourced from `/Users/mkbabb/Programming/keyframes.js/node_modules/@mkbabb/glass-ui/dist/` — the copy already on disk in the audit target — so no upgrade is presupposed by any repair. reka claims are sourced from `node_modules/reka-ui/dist/Dialog/`; vueuse claims from `node_modules/@vueuse/core/dist/index.js` (14.3.0). `/Users/mkbabb/Programming/keyframes.js` was read only. No file in keyframes.js or glass-ui was written, mutated, or executed; no installs, no dev servers, no browser tooling. The single write of this lane is this file.

**Files read whole for the second pass** (all read-only): the SFC + `ControlsPaneWrapper.css`; `RibbonBar.vue`; `../channel-controls/ChannelControls.vue`; `../channel-controls/composables/useKeyframesPaneReveal.ts`; `../ControlsPaneWrapper/{useControlsLayout,usePaneRegister,usePaneHover}.ts`; `../transportSource.ts`; `../AnimationControlsGroup.vue`; `../KfPillTabs.vue` + `../KfPillTabs/useKfPillTabs.ts`; `state/{controlOptionsStore,storeUtils,controlSurfaces}.ts`; `composables/scene-facility/index.ts`; plus the glass `drawer.js` / `components/drawer/*.d.ts` / `components/drawer/styles.css`, `components/tabs/*.d.ts`, and reka `Dialog/{utils,DialogContentImpl}.js` as producer evidence.
