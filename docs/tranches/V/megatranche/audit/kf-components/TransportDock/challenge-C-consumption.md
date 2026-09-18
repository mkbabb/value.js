claude-opus-5[1m]

# Challenge C · CONSUMPTION — `TransportDock.vue`

**Subject** `/Users/mkbabb/Programming/keyframes.js/demo/components/instrument/transport/TransportDock.vue` (403 L)
**Axis** how this component consumes **keyframes.js** (the library) and **glass-ui** (the design system): subpath choices, shadow components, value.js transitive exposure, props/emits contract quality, sibling seams.
**Mode** static, read-only. No installs, no dev server, no browser. Livable-only claims are marked **UNPROVEN-NEEDS-LIVE** for SS-13.
**Posture** the component is presumed DEFECTIVE until the tree proves otherwise; every claim below carries its own falsifier, and a false defect is worse than a missed one — three candidate findings were **killed during verification** and are recorded in §5 so the next lane does not re-raise them.

**Read whole (read-only):** the SFC; its 3 colocated composables (`TransportDock/usePlayActuation.ts`, `useMenubarMeasure.ts`, `useIconSpin.ts`); its sole consumer `AnimationControlsGroup.vue`; `transport/index.ts`; `transport/injectionKeys.ts`; `components/instrument/index.ts`; `components/instrument/surfaceTabs.ts`; `demo/kf-engine.ts`; `demo/app/main.ts`; `AnimationControlsGroup/useAnimationProgress.ts`; `demo/styles/{layout,style,design-idioms}.css`; and the **installed** producer artifacts `node_modules/@mkbabb/glass-ui/dist/**`, `node_modules/reka-ui/dist/{Select,Tooltip,Popper}/**`, `node_modules/@lucide/vue/dist/esm/**`.

**Hitherto corpus folded** — `lane-frontend.md` (F-1 phantom dep, F-2/S-1 stale-rationale class, S-2 stale prose, F-6 clean reka boundary, §6.3 token namespace) and `lane-library.md` (§4.1 A2/A13 parse seam, §4.6 the R1 blast radius). Ids cited inline. **No contradiction of either lane was found**; §4 records where this component *corroborates* them at file:line.

**Tally** — 18 findings: **1 BLOCKER · 6 MAJOR · 6 MINOR · 5 INFO**. **5 superlatives** (L-18 runs both ways).

---

## 1. Headline

| id | severity | finding |
|---|---|---|
| B-1 | **BLOCKER** | All 4 of this file's glass-ui import statements are unresolvable under `npm ci` — the F-1 phantom dep, re-anchored here. |
| C-1 | **MAJOR** | `useIconSpin` can never resolve its target: the ref lands on an `SVGSVGElement` and both `resolveElement` branches test `instanceof HTMLElement`. The component's ONLY keyframes.js consumption is 100 % dead. |
| C-2 | **MAJOR** | `:always-expanded="false"` is the framework default — a no-op. 19 lines of NAMED DECISION prose document a lever that changes nothing. |
| C-3 | **MAJOR** | The animation-select's tooltip is keyboard-dead: `TooltipTrigger as-child` merges onto a non-focusable wrapper `<div>`, and reka listens on non-bubbling `focus`. |
| C-4 | **MAJOR** | The play CTA opts out of glass-ui's size contract (`Button` without `icon-only`), forfeiting the ONLY hook for the coarse-pointer tap floor. Source-derived geometry on touch: ~40×60 px expanded, ~32×60 px collapsed — non-square, under 44 px on the inline axis. |
| C-5 | **MAJOR** | The crossfade-strand cure is applied to 1 of 4 transport actions. The rationale is control-agnostic; either three controls are still exposed or 207 lines of cure+tests are dead weight. |
| C-6 | **MAJOR** | `useMenubarMeasure`'s "monotonic peak" resets to 0 on unmount, and the transport unmounts on every channel-less scene — re-opening the exact S1 stage-rect oscillation its own comment claims is impossible by construction. |
| C-7…C-12 | MINOR | dead lazy barrel · inert `class` on `<Select>` · keyless `v-for` · `StatusDot` semantics + missing name · per-frame allocation on the progress path · zero coverage for 2 of 3 composables (and no `vue-tsc` at all). |
| C-13…C-17 | INFO | stale `DockSelectTrigger` prose · split duplicate imports · emit payloads with one reachable value · `storedControls` is an ambient store wearing a prop's clothes · unguarded synchronous heavy-engine read in `setup()`. |

---

## 2. Consumption surface (measured)

**glass-ui** — 4 import statements, **4 subpaths** (root, `/dock` ×2, `/tooltip`, `/status-dot`), 12 named components:

```
TransportDock.vue:229-233  DockControl, DockTrigger, DockSeparator   @mkbabb/glass-ui/dock
TransportDock.vue:238-245  Select, SelectContent, SelectGroup,
                           SelectItem, SelectValue, Button           @mkbabb/glass-ui
TransportDock.vue:246      Tooltip, TooltipContent, TooltipTrigger   @mkbabb/glass-ui/tooltip
TransportDock.vue:247      StatusDot                                 @mkbabb/glass-ui/status-dot
TransportDock.vue:251      GlassDock                                 @mkbabb/glass-ui/dock   ← second /dock stmt
```

**keyframes.js** — ZERO direct imports in the SFC. One transitive edge, via `TransportDock/useIconSpin.ts:2` → `kfEngine()` → `CSSKeyframesAnimation(...).fromString(...)`.

**value.js** — ZERO direct imports. Exposure is second-order only, through the `fromString` seam above (lane-library §4.1 A13 → A2 `resolveKeyframes` → `parseStylesheet`).

**reka-ui** — ZERO direct imports (corroborates lane-frontend F-6). **Local `ui/` vendoring** — none.

**Other** — `@lucide/vue` (2 statements), `@components/instrument/surfaceTabs`, `@state` (type-only), 3 colocated composables.

---

## 3. Findings

### B-1 · BLOCKER — every glass-ui import in this file is unresolvable under `npm ci` (F-1, re-anchored)

**Claim.** `lane-frontend.md` F-1 established that `@mkbabb/glass-ui` is declared in **neither** `package.json` nor `package-lock.json` while 7.0.0 sits installed in `node_modules`. This component is the densest glass-ui consumer in the `transport/` tree — 4 import statements across 4 subpaths, 12 named components, plus the `GlassDock` shell that owns its entire layout. Under a clean `npm ci` **all four statements fail to resolve** and TransportDock does not build, at either `vite build --mode gh-pages` or `npm run dev`.

**Provenance.** `TransportDock.vue:229-233, 238-245, 246, 247, 251`; `keyframes.js/package.json` (`dependencies` = `{"@mkbabb/value.js": "4.0.0"}` — sole entry); `package-lock.json` (zero `glass-ui` occurrences); `node_modules/@mkbabb/glass-ui/package.json` → `"version": "7.0.0"`, installed as a real directory, not a symlink.

**Why re-anchored rather than merely cited.** F-1 is a repo-level fact; its *consequence* is per-file, and here it is total rather than partial — this component has no glass-ui-free fallback path, unlike (say) `App.skeleton.vue` (lane-frontend §4, `b`-marked). Any remediation wave touching TransportDock must land F-1 first (lane-frontend §10 step 1).

**Falsifier.** `grep -c "glass-ui" package-lock.json` returning non-zero, or a `.npmrc`/workspace/`overrides` mechanism that resolves the specifier without a lockfile entry. Probed: `.npmrc` is a single `legacy-peer-deps=true` line; `.gitmodules` declares only `docs/precepts`. Neither resolves a bare specifier.

---

### C-1 · MAJOR — `useIconSpin` can never resolve its element; the component's only keyframes.js consumption is dead

**Claim.** `resetIconSpin()` always returns early. The engine animation it builds — the sole point at which TransportDock consumes keyframes.js — never plays, from either of its two call sites.

**The chain.**

1. The template ref is placed on a lucide icon component:
   ```
   TransportDock.vue:158-163
     <DockControl shape="icon" aria-label="Reset animation" @click="() => { resetIconSpin(); emit('reset', false); }">
         <RotateCcw ref="resetIconEl" class="icon-lg" />
   ```
2. `RotateCcw` is a **functional** component. `@lucide/vue/dist/esm/createLucideIcon.mjs`:
   ```js
   const createLucideIcon = (iconName, iconNode) => (props, { slots, attrs }) => h(Icon, {...});
   ```
   A bare arrow function — no `defineComponent`, no stateful instance. `Icon.mjs` in turn returns `h("svg", {...})`.
3. Vue's `setRef` assigns the public instance only for `STATEFUL_COMPONENT`; for a functional vnode it assigns `vnode.el`. So `resetIconEl.value` is the **`SVGSVGElement`**.
4. `TransportDock/useIconSpin.ts:4-8`:
   ```ts
   function resolveElement(value: unknown): HTMLElement | null {
       if (value instanceof HTMLElement) return value;                       // SVGSVGElement ⊄ HTMLElement → false
       const candidate = value as { $el?: unknown } | null;
       return candidate?.$el instanceof HTMLElement ? candidate.$el : null;  // svg.$el === undefined → null
   }
   ```
   `SVGSVGElement` descends `SVGGraphicsElement → SVGElement → Element`; it is **not** an `HTMLElement`. Both branches fail → `null`.
5. `useIconSpin.ts:21-27` — `const element = resolveElement(resetIconEl.value); if (!element) return;` → **always returns**, before `setTargets`/`reset`/`play`.

**Blast radius.** Both call sites are dead: the reset control's `@click` (`:158`) and the keyboard shortcut wired through `defineExpose({ resetIconSpin })` (`:373` → `AnimationControlsGroup.vue:325` `resetIconSpin: () => transportDockRef.value?.resetIconSpin()`). The `emit('reset', false)` beside it still fires, so the *function* works and only the *feedback* is missing — which is exactly why nothing has noticed.

**Second-order cost.** The dead path is not free. `useIconSpin()` runs at every TransportDock `setup()` and eagerly constructs `new CSSKeyframesAnimation({...}).fromString(...)` (`useIconSpin.ts:13-20`) over a **static, invariant** CSS string. That is a full lane-library §4.1 A13 → A2 `resolveKeyframes` → value.js `parseStylesheet` round trip, paid on every scene mount, on the first-paint path, for an animation that can never render.

**Why the type system did not catch it.** `useTemplateRef<HTMLElement>("resetIconEl")` (`useIconSpin.ts:11`) asserts a type the runtime cannot produce — and the repo has **no SFC typechecker**: `package.json` `check` = `tsc --noEmit && tsc --noEmit -p tsconfig.test.json`, and `node_modules/.bin` contains no `vue-tsc`. Plain `tsc` never opens a `.vue` template. See C-12.

**Falsifier.** Mount TransportDock and evaluate `resetIconEl.value?.constructor?.name`. If it prints anything HTMLElement-derived — or if `resolveElement` returns non-null — the claim dies. Equally fatal: a Vue release that assigns a public instance to refs on functional components, or a `@lucide/vue` release that wraps the icon in a stateful component or an HTML host. Independent corroboration available cheaply: `grep -rn 'ref="' demo --include="*.vue"` on lucide tags returns **exactly one** hit (this one), so no sibling site disproves it by working.

---

### C-2 · MAJOR — `:always-expanded="false"` is a no-op; the K.W0 S3 NAMED DECISION documents an inert lever

**Claim.** `TransportDock.vue:43` passes the framework default. The 19-line NAMED-DECISION block at `:24-42` — which calls `:always-expanded="false"` "the ONLY kf-side lever for the detent" — describes a prop binding with **zero** behavioural effect against installed glass-ui 7.0.0.

**Provenance.**
- `node_modules/@mkbabb/glass-ui/dist/dock.js` — `alwaysExpanded: r = !1` (the resolved default is `false`).
- `dist/components/dock/composables/useDockShellProps.d.ts` — *"Never collapse … Default `false` (every dock is collapsible)."* The doc-comment even records the deliberate rejection of a positive `collapsible` prop "because Vue coerces an absent boolean prop to `false`".
- `dist/components/dock/GlassDock.vue.d.ts` — the declared-defaults object lists only `backdropMode` and `autoLuminance`; `alwaysExpanded` is an ordinary optional boolean.

**What the real levers are.** glass-ui 7.0.0 already ships the detent this comment asks for: `startCollapsed` (**default `true`** — `dock.js`: `startCollapsed ?? !0`) and `collapseDelay` (default 2000 ms). Neither is touched by this file. So the comment's premise — that the detent needs a kf-side lever and that glass-ui must be fixed on "the K.W1 re-pin (RF-17)" — is stale against the tree, in the same class as lane-frontend **F-2/S-1** (`KfPillTabs` forked over a 4.0.1 bug fixed in the installed 7.0.0) and **S-2** (prose describing a renderer the tree no longer uses).

**Falsifier.** If `useDockShellProps` resolved `alwaysExpanded ?? true`, or if GlassDock declared `alwaysExpanded: { default: true }`, the binding would be load-bearing. Both probed above and false. Note the narrower claim I am *not* making: I do **not** claim the U-K1 symptom (transport rendering full at rest) is cured or uncured — that is a live-render question (**UNPROVEN-NEEDS-LIVE**). The claim is only that *this prop cannot be the thing that changes it either way*.

---

### C-3 · MAJOR — the animation-select's tooltip is unreachable by keyboard, and its `aria-describedby` lands on the wrong node

**Claim.** Of the four `<Tooltip>` sites in this file, three work and one is keyboard-dead — the one wrapping the animation `<Select>`.

**Provenance.**
```
TransportDock.vue:90-92
  <Tooltip>
      <TooltipTrigger as-child>
          <div class="relative flex items-center gap-1.5">   ← the as-child target
```
`as-child` merges reka's trigger props and listeners onto this `<div>`. reka's listener set (`node_modules/reka-ui/dist/Tooltip/TooltipTrigger.js`):
```js
const tooltipListeners = computed(() => ({ click, focus, pointermove, pointerleave, pointerdown, blur }));
```
`focus` — **not** `focusin` — and `focus` does not bubble. Keyboard focus lands on the `SelectTrigger` `<button>` rendered *inside* by `DockTrigger for="select"` (`dock.js` DockTrigger render → reka `SelectTrigger`), and never reaches the wrapper. The div carries no `tabindex`, so it is not itself focusable.

The same merge puts `aria-describedby={contentId}` and `data-state` on the div rather than on the button, so even in the pointer path the tooltip text is not programmatically associated with the control.

**Contrast — the three that work.** `:60` (play `Button`), `:157` (reset `DockControl`), `:170` (timeline `DockControl`) all `as-child` onto real focusable buttons.

**Aggravating.** The wrapper div is gratuitous — `relative flex items-center gap-1.5` around a single child. Removing it and letting `as-child` land on the trigger fixes the bug and deletes a node.

**Falsifier.** A reka release switching to `focusin`, or `tabindex` appearing on the wrapper. Live check: focus the select trigger via <kbd>Tab</kbd> and observe whether `TooltipContent` mounts (**UNPROVEN-NEEDS-LIVE** for the visual; the listener-set evidence above is source-conclusive).

---

### C-4 · MAJOR — the play CTA opts out of glass-ui's size contract; on coarse pointers the geometry breaks

**Claim.** The play control — named in-comment as "the PRIMARY first-run gesture" (`:31-33`) — is the one control in this dock that does **not** use a glass-ui sizing contract, and the opt-out forfeits the only selector behind the coarse-pointer tap floor.

**Provenance.**
```
TransportDock.vue:62-68   <Button emphasis="quiet" :class="[... 'rounded-full p-0', 'w-10 h-10 shrink-0', ...]">
TransportDock.vue:193-204 <Button emphasis="quiet" :class="[... 'rounded-full p-0', 'w-8  h-8  shrink-0', ...]">   (collapsed mirror)
```
No `icon-only`. glass-ui stamps the tap-floor hook **only** for `iconOnly` (`dist/button-B7c944jy.js`):
```js
"data-icon-only":      a.iconOnly || void 0,
"data-control-target": a.iconOnly ? "" : void 0,
```
and that attribute is the sole selector of the floor rule (`dist/styles/utilities/responsive.css`, the file's entire content):
```css
@media (pointer: coarse) { [data-control-target] { min-block-size: var(--touch-target, 2.75rem); min-inline-size: var(--touch-target, 2.75rem); } }
```

**Resolved geometry on a coarse pointer** (all tokens traced in the installed dist):

| axis | rule | value |
|---|---|---|
| inline | `.button { min-inline-size: 0 }` (`components/button/styles.css`); no `[data-control-target]` floor | authored only → **40 px** expanded, **32 px** collapsed |
| block | `.button { min-block-size: var(--button-size) }`, `--button-size: var(--control-h-md)`, `--control-h-md: max(calc(2.5rem * var(--ui-scale)), var(--control-floor))`; at coarse `styles/tokens/light-dark.css` sets `--ui-scale: var(--ui-coarse-scale, 1.5)` (declared `1.5`) and `--control-floor: var(--touch-target, 2.75rem)` | **≈ 60 px** |

`min-block-size` beats the authored `h-10`/`h-8` by the box model, not by cascade order, so Tailwind's utilities-layer precedence does not rescue it. The dock scope does **not** rescope any of these: `components/dock/styles/density.css` re-declares `--dock-scale`/`--dock-control-size`/`--dock-control-floor` but never `--ui-scale`, `--control-h-md`, `--button-size`, or `--control-floor`.

**Consequences.** (a) The inline axis is **under WCAG 2.5.5's 44 px** on both the expanded control (40) and — worse — the collapsed summary mirror (32), which is the *only* play affordance at the documented resting detent (`:29-33`). (b) `rounded-full` on a ~40×60 / ~32×60 box renders a **stadium, not a circle**. (c) The three sibling controls get the floor by construction: `DockControl` reads `--dock-control-size: max(…, var(--dock-control-floor, 0px))` with `--dock-control-floor: var(--dock-touch-target, 2.75rem)` at coarse — so the *most* important control is the *only* one without it.

**The fix is a prop, not CSS.** `icon-only` restores both floors and the square geometry; `w-10 h-10 p-0` then becomes deletable.

**Falsifier.** Any of: the demo declaring `--control-floor`, `--ui-scale`, `--ui-coarse-scale`, `--touch-target`, or `--control-h-md` (probed across `demo/styles/*.css` and `demo/components/**/*.css` — **zero** declarations); glass-ui's coarse token block being absent from the shipped cascade (`demo/styles/style.css:3` imports `@mkbabb/glass-ui/styles`, which indexes `tokens/light-dark.css`); or a demo rule setting `min-inline-size`/`min-block-size` on `.button`. Live kill: `getBoundingClientRect()` on both play buttons under an emulated coarse pointer — if either is ≥44 px on the inline axis **and** square, the claim dies. Appearance verdict **UNPROVEN-NEEDS-LIVE**; the geometry above is fully source-derived.

---

### C-5 · MAJOR — the crossfade-strand cure covers 1 of 4 transport actions

**Claim.** The 27-line R.W6 C.6 rationale (`:293-319`) states a control-agnostic hazard — the dock crossfade can strand a trailing synthesized `click` because "the layer went `pointer-events:none` before the browser synthesized the click" — and then cures exactly one control. The other three actuate from `@click` in the **same** `.dock-layer`:

```
TransportDock.vue:69-73   play    → pointerdown/pointerup/pointercancel/keydown/keyup   ← CURED
TransportDock.vue:158     reset   → @click="() => { resetIconSpin(); emit('reset', false); }"
TransportDock.vue:171     timeline→ @click="emit('expandTimeline', false)"
TransportDock.vue:96-100  select  → @update:model-value (reka's own click/pointer path)
```

**Why this is a defect either way.** The component cannot be right on both horns. If the hazard is real and general, three of four transport actions are still exposed to it — including `reset`, which the keyboard-shortcut suite also drives. If the hazard is *not* general, then `usePlayActuation` (88 L) plus its 119 L test file is elaborate machinery for a phenomenon that does not exist, and the dual-modality handler set is a KISS violation the standing law forbids.

**The strongest counter-argument, stated fairly.** Only `actuatePlay` calls `dockRef.value?.expand()` (`:325`), so only the play toggle *provokes* a state change during its own gesture. If GlassDock's crossfade fires solely on an explicit `expand()`/`collapse()` call, the asymmetry is principled and this finding collapses to INFO. But that is not what the rationale says, and it is not the only trigger: `collapseDelay` defaults to 2000 ms of **idle** collapse (`useDockShellProps.d.ts`), which can land mid-gesture on any control in the row.

**Falsifier.** Evidence in glass-ui that the layer crossfade is provoked only by an imperative call from the actuating control itself — or a rendered `.dock-layer` that never sets `pointer-events: none` during the transition. Live kill: press-and-hold `reset` across an idle-collapse boundary and confirm the emit still fires (**UNPROVEN-NEEDS-LIVE**).

---

### C-6 · MAJOR — the "monotonic" menubar peak is not monotonic across the transport's own mount cycle

**Claim.** `useMenubarMeasure`'s high-water mark — introduced expressly so the mobile full-bleed stage rect never moves — is destroyed every time the transport unmounts, which happens on every channel-less scene.

**Provenance.**
```ts
// TransportDock/useMenubarMeasure.ts:22-26
onBeforeUnmount(() => {
    document.documentElement.style.removeProperty(HEIGHT_PROP);
    document.documentElement.style.removeProperty(PEAK_PROP);   // --menubar-measured-h-peak
    peak = 0;
});
```
The transport is conditionally mounted:
```
AnimationControlsGroup.vue:98   <TransportDock v-if="transportNames.length > 0" …>
AnimationControlsGroup.vue:96   "…Home derives transportNames = [] … so the transport does NOT render"
```
And the stage reserves from the peak, not the live value:
```
demo/styles/layout.css:86-95   --dock-band-reserve-stable: max( calc(--dock-icon-height + --dock-margin + env(safe-area-inset-bottom,0px)), var(--menubar-measured-h-peak, 0px) )
demo/styles/layout.css:191     --work-area-max-height … min(64rem, calc(100dvh - var(--dock-band-reserve-stable)))
demo/styles/layout.css:207     --dock-top-anchor-stable + --dock-band-reserve-stable
```

**Consequence.** Every `scene → home → scene` round trip drops `--menubar-measured-h-peak` to its `0px` fallback, so `--dock-band-reserve-stable` falls back to the token floor, the fixed full-bleed stage rect shifts, and the peak then re-grows on the next mount. That is precisely the oscillation the SFC's own 12-line J.WZ comment declares impossible:

> `TransportDock.vue:288-289` — *"the stage reserves the PEAK (stable by construction — it only ever grows), so the full-bleed frame never moves"*

**Falsifier.** If the token-floor arm always dominates the measured peak, the `max()` never changes and nothing moves. That would kill the finding — but the component itself asserts the opposite, citing measured ≈ 90 px against a token-derived ≈ 52 px (`TransportDock.vue:263-265`), i.e. the peak arm *is* the winning arm. Live kill: log `getComputedStyle(document.documentElement).getPropertyValue("--dock-band-reserve-stable")` across a scene→home→scene navigation; if it is constant, the claim dies (**UNPROVEN-NEEDS-LIVE** for the visual jump; the property lifecycle above is source-conclusive).

**Secondary note (not counted separately).** `peak` is a closure-local, so the mark is per-instance rather than per-document — correct today (one transport at a time), but it means the `:root` custom property is a document-scoped global written by an instance-scoped owner.

---

### C-7 · MINOR — the lazy barrel export for TransportDock is dead

`transport/index.ts:11` exports `TransportDock` via `defineAsyncComponent`, and `components/instrument/index.ts:24` re-exports it, both with substantial doc-comments about never eager-loading the Monaco/highlight.js chunk. **Neither barrel has a single consumer.** Probes over `demo/`, `test/`, `scripts/`:

```
$ grep -rn 'from "@components/instrument/transport"|instrument/transport"|from "@components/instrument"' → (no output)
$ grep -rn "instrument/transport" test/ scripts/   → 4 hits, ALL deep composable paths (…/TransportDock/usePlayActuation, …/KfPillTabs/useKfPillTabs, …/AnimationControlsGroup/useAnimationGroupPlayback ×2)
```

The one real consumer eager-imports the SFC: `AnimationControlsGroup.vue:130` `import TransportDock from "./TransportDock.vue"`. So the lazy guarantee is not merely unused — it is *contradicted* for this component, and the module sits in both graphs. **Falsifier:** an import of either barrel from outside the three directories probed (e.g. a playground host not in this repo).

### C-8 · MINOR — `class` on `<Select>` is silently discarded

`TransportDock.vue:94` — `<Select class="p-0 m-0 cursor-pointer" …>`. glass-ui's `Select` declares no `class` prop (`dist/select-DD6Ly6xg.js` props: `open, defaultOpen, defaultValue, modelValue, nullableValue, by, dir, multiple, autocomplete, disabled, name, required`) and forwards to reka `SelectRoot`, whose root is `PopperRoot` — which sets `inheritAttrs: false` and renders only `renderSlot(_ctx.$slots, "default")` (`reka-ui/dist/Popper/PopperRoot.js`). Fallthrough attrs are dropped, and because `inheritAttrs:false` is explicit, Vue emits **no** extraneous-attrs warning. `cursor-pointer` — evidently intended for the trigger — never paints. **Falsifier:** inspect the rendered trigger; if `cursor: pointer` traces to these classes, the claim dies.

### C-9 · MINOR — `v-for` without `:key`, around a gratuitous `<template>`

`TransportDock.vue:121-141` — `<template v-for="name in animationNames">` wrapping exactly one `<SelectItem :value="name">`, with no `key` anywhere in the block. Vue patches in place; reka `SelectItem` instances are reused across a reorder or a mid-list removal while their `value` prop mutates beneath them, and the `v-if="isPlaying"` progress-dot / `StatusDot` branch is re-keyed by position rather than identity. The wrapping `<template>` is itself unnecessary — `v-for` + `:key="name"` belongs directly on `SelectItem`. **Falsifier:** if `animationNames` is append-only in practice the hazard is latent rather than live — reorder the channel set at runtime and confirm selection/highlight tracks the name. Honest scoping: keyless `v-for` is not unique to this file (28 `v-for` sites in `demo/`, 8 with a same-line `key`), so this is a house defect surfacing here, not a TransportDock-only slip.

### C-10 · MINOR — `StatusDot` state mapping and missing accessible name

`TransportDock.vue:133-137` — `<StatusDot size="md" :state="isStarted ? 'warning' : 'unknown'" />`. `STATUS_DOT_STATES = ["online","warning","error","unknown"]` (`dist/components/_shared/feedback.d.ts`) is a **health** vocabulary; a started-but-paused transport channel is rendered in the warning channel and an idle one as `unknown`. Separately, `label` is omitted while its own prop doc says *"Accessible identity. Omit when adjacent text already names the state."* — the adjacent text (`:138`) is the animation **name**, never the state, so paused-vs-idle is invisible to assistive tech. glass-ui also ships `Pulse` with `PULSE_STATES = ["active","idle","success","warning"]`, whose `active`/`idle` pair is a closer fit for a transport. **Falsifier:** glass-ui documenting `warning` as a generic attention tone rather than a health state, or an sr-only state string elsewhere in the row (there is none, `:125-139`).

### C-11 · MINOR — per-frame allocation and patch on the progress-dot path

`dotStyle` (`:361-364`) allocates a fresh object literal per item per frame, fed by `useAnimationProgress`, which allocates a fresh `Record` on every RAF tick (`AnimationControlsGroup/useAnimationProgress.ts:20, 39`), re-patching every mounted `SelectItem`. `demo/styles/design-idioms.css:146` advertises the recipe as *"driven by --dot-p (0–1), allocation-free"* — true of the CSS, false of its consumption site. The component already owns the allocation-free idiom: `useMenubarMeasure` writes with `style.setProperty` (`useMenubarMeasure.ts:14, 17`). **Falsifier / honest scoping:** the cost lands only while the select popup is OPEN and playing, since reka does not render `SelectContent` children when closed — so this is a bounded, not a persistent, cost. No live measurement taken (**UNPROVEN-NEEDS-LIVE** for magnitude).

### C-12 · MINOR — two of three composables are untested, and SFC templates are never typechecked

`usePlayActuation` is covered thoroughly — `test/demo/instrument/transport-play-actuation.test.ts`, 119 L, 11 cases (see S+1). `useIconSpin` and `useMenubarMeasure` have **zero** tests (`grep -rln "useIconSpin\|useMenubarMeasure" test/` → no output). And the repo carries no SFC typechecker at all: `package.json` `check` = `tsc --noEmit && tsc --noEmit -p tsconfig.test.json`, `check:lib` = `tsc --noEmit -p tsconfig.lib.json`; `node_modules/.bin` contains no `vue-tsc`. Plain `tsc` never reads a `.vue` template. C-1 (a template ref typed `HTMLElement` that is an `SVGSVGElement`) and C-8 (a `class` on a component that declares none) are exactly the two classes such a gate catches. **Falsifier:** a `vue-tsc`/`vite-plugin-checker` invocation in CI outside `package.json` (`.github/workflows` not read under lane law — flagged as the one unprobed surface).

### C-13 · INFO — prose names a glass-ui component that 7.0.0 does not export

`TransportDock.vue:110` — *"DockSelectTrigger owns the trigger + its chevron, GG-6"*. `dist/components/dock/index.d.ts` exports `GlassDock, DockLayerGroup, DockLayer, DockCrossfade, DockControl, DockTrigger, DockBackgroundToggle, DockSeparator` — no `DockSelectTrigger`, no `DockIconButton` (both folded, per `DockControl.vue.d.ts`'s own header: *"folds `DockIconButton` + `DockTabButton` onto a `shape` axis"*). Same stale-prose class as lane-frontend **S-2**. Note the *decision* the comment records is correct — see S+2.

### C-14 · INFO — split duplicate import statements

`@lucide/vue` is imported twice (`:222-227` and `:249`) and `@mkbabb/glass-ui/dock` twice (`:229-233` and `:251`), interleaved with unrelated specifiers. Cosmetic — but it is precisely how `RotateCcw` (the C-1 site) drifted away from its siblings and out of review's line of sight.

### C-15 · INFO — two emit payloads with exactly one reachable value

`defineEmits` (`:345-350`) declares `reset(all: boolean)` and `expandTimeline(expanded: boolean)`. Since T.C2 moved "Clear all & reload" to the settings menu (`:368-371`), `reset` is only ever emitted `false` (`:158`); `expandTimeline` is only ever emitted `false` (`:171`) because the chip renders only when already expanded (`:168`). The parent still branches on both (`AnimationControlsGroup.vue:106, 108`). The contract advertises a two-way switch the component cannot throw.

### C-16 · INFO — `storedControls` is an ambient mutable store wearing a prop's clothes

`getStoredAnimationGroupControlOptions(superKey)` (`AnimationControlsGroup.vue:176`) returns a shared reactive object that is then passed **as a prop** (`:100`). TransportDock reads off it directly (`:96, :113, :116, :138, :168, :184`) but writes only via emits — which the parent applies to *that same object* (`:106-108`). One-way data flow is therefore nominal: the emit round trip is ceremony over a shared mutable reference, and Vue's readonly-prop warning cannot fire on object mutation. A `provide`/`inject` (the file's sibling idiom — `transport/injectionKeys.ts`) would state the actual topology honestly.

### C-17 · INFO — unguarded synchronous heavy-engine read in `setup()`

`useIconSpin.ts:12` calls `kfEngine()`, which throws by contract if the warm has not resolved (`demo/kf-engine.ts:49-55`). `demo/app/main.ts:50` mounts **unconditionally** after swallowing a warm failure — `void Promise.all([warmKfEngine().catch(() => undefined), fontsDecoded]).finally(() => { app.mount("#app"); })` — and the demo has **zero** error boundaries (`grep -rn "onErrorCaptured\|errorHandler" demo/` → no output). **Deliberately downgraded to INFO:** `app/App.vue:219` reads `kfEngine()` higher in the tree, so an engine-chunk failure kills the app there first and TransportDock is never the observed crash point. Recorded as the shape of the seam, not as a distinct failure mode.

---

## 4. Where this component corroborates the hitherto lanes

| lane id | corroboration at this file |
|---|---|
| **F-1** (phantom dep) | 4 import statements / 4 subpaths / 12 components, no fallback path → re-anchored as **B-1**. |
| **F-2, S-1** (stale rationale vs installed 7.0.0) | **C-2** is the same pathology in a different prop: a documented lever void against `dock.js`. |
| **S-2** (prose ↔ tree disagree) | **C-13** — `DockSelectTrigger` named in-comment, absent from `dock/index.d.ts`. |
| **F-6** (clean reka boundary) | Confirmed at file level: zero `from "reka-ui"`, zero local `ui/` — see **S+2**. |
| **§6.3** (98 unprefixed demo tokens sharing glass-ui's flat namespace) | This file consumes `.rainbow-vivid`/`.rainbow-pastel`/`.scale-on-hover` (`:65-67`, `:201-203`) — classes that resolve in **glass-ui's** dist while their `--rainbow-*` tokens are re-declared by `demo/styles/design-idioms.css`. A live instance of the collision surface that lane flagged. |
| **lane-library §4.1 A13/A2** | The single kf edge here (`useIconSpin.ts:16` `.fromString(...)`) is exactly A13 → A2 → value.js `parseStylesheet` — and per **C-1** it is paid every mount for a dead animation. |
| **lane-library §4.6 (R1 blast radius)** | **Not reachable here.** The `twist` payload is `transform: perspective()/rotateY()/scale()` only — zero color functions — so `parseCssColor` is never entered from this component. The R1 crash class does **not** apply to TransportDock. Stated explicitly so a later wave does not attribute it here by proximity. |

**No contradiction of either lane was found.**

---

## 5. Candidate findings KILLED during verification

Recorded so the next lane does not re-raise them, and as evidence the falsifier discipline was actually run.

1. **"The leading `<List>` glyph reaches past the glass-ui surface."** *Killed.* `dock.js`'s `DockTrigger` render shows `#icon` is the **trailing** `SelectIcon` seam (chevron fallback); a **leading** glyph correctly belongs in the default slot, which is where `:112-114` puts it. The comment at `:107-111` is right on the substance (only the component *name* is stale — C-13).
2. **"Per-frame `animationProgress` re-renders the whole dock."** *Killed.* Vue's `withCtx` does not transfer dependency tracking; the `animationProgress` read is owned by `SelectItem`'s render effect, and reka does not render `SelectContent` children while closed. Survives only in the bounded form of **C-11**.
3. **"`.scale-on-hover` / `.rainbow-vivid` / `.rainbow-pastel` / `.icon-lg` are undefined classes."** *Killed.* `icon-lg`/`icon-md` are demo `@utility` definitions (`design-idioms.css:108, 114`); `scale-on-hover`, `rainbow-vivid`, `rainbow-pastel` resolve inside glass-ui's dist. `.progress-dot` likewise exists (`design-idioms.css:147`), so the promotion note at `:399-402` is accurate.

Also **not** claimed: any C-4 *appearance* verdict, any C-2 claim about whether U-K1 is cured, any C-6 visual-jump measurement, any C-5 live strand reproduction — all four are **UNPROVEN-NEEDS-LIVE** and are handed to the SS-13 visual audit with the exact probes named above.

---

## 6. Superlatives (L-18, running the other way)

**S+1 · `usePlayActuation` is exemplary consumption engineering.** The actuation contract is lifted out of the SFC for a *stated, correct* reason — "vitest carries no Vue-SFC plugin; the behavior is DRIVEN, not markup-inspected" (`usePlayActuation.ts:6-8`) — and the resulting test file is not a formality: 11 cases covering both named defects (F2 auto-repeat, F3 press-origin) **plus** multi-touch secondary (`:86`), right/middle mouse (`:94`), `pointercancel` (`:102`), and one-press-one-actuation (`:111`). The implementation mirrors native button semantics exactly — Enter on `keydown` with an `e.repeat` guard, Space armed on `keydown` and fired on `keyup`, `pointerup` gated on a `pointerId` press-origin set plus `isPrimary`. Most demo-tier components would have shipped `@click`. *Falsifier:* if the tests asserted only call counts without exercising the guard inputs — they exercise all of them.

**S+2 · The glass-ui boundary is clean and the one tempting breach is declined in writing.** Zero `from "reka-ui"`, zero vendored `ui/`, zero `cn()`/cva — every primitive arrives through a glass-ui subpath. The single place the file could have reached past the surface (reka's `SelectIcon` slot, for the empty-state glyph) is explicitly refused in-comment and routed through `DockTrigger`'s default slot instead (`:107-118`). Verified against `dock.js`: that is the correct seam. This is the disciplined half of lane-frontend F-6, at file level. *Falsifier:* a `reka-ui` import in this file — none.

**S+3 · Separators are derived from inhabited zones, from ONE cardinality authority.** `<DockSeparator />` is emitted only where a zone is populated (`:89` gated on `channelZoneKind === "select"`; `:155` before the always-present nav group), and the cardinality comes from a single shared projection — `dockCardinality` (`surfaceTabs.ts:25-41`) — rather than a `.length > 1` re-derived per site. Zero hand-rolled `.dock-separator` divs, and the elision is total: one channel means no node **and** no flanking separator, not a disabled one-item dropdown. *Falsifier:* a raw `<div class="dock-separator">` or a second inline length test — neither present.

**S+4 · `.menubar-safe-pb` is real defensive CSS, both arms load-bearing.** `:387-397` supplies (a) an inline `0px` fallback inside `env()` for a browser that parses the function but reports no inset, and (b) an `@supports not (padding: env(safe-area-inset-bottom))` path giving the `--dock-margin` baseline to a browser that cannot parse it at all. The prior form — a bracketed Tailwind arbitrary value with no `env()` fallback — collapsed the whole `max()` on the second class of browser. Both arms are necessary; both are present; the happy path is byte-identical. *Falsifier:* a browser where `@supports not (padding: env(...))` false-negatives — none known.

**S+5 · The collapsed play mirror carries a distinct accessible name on BOTH ternary arms.** `:195-199` yields "Pause animation (collapsed dock)" / "Play animation (collapsed dock)" against the expanded control's "Pause animation" / "Play animation" (`:63`), so a screen reader never encounters two identically-named play controls — and the disambiguation is applied to *both* states, which is the half almost every dual-state mirror forgets (the comment at `:187-192` says so explicitly). Note this is the same control C-4 faults on geometry: its **semantics** are better than its **sizing**. *Falsifier:* GlassDock rendering only one layer into the a11y tree at a time would make the disambiguation unnecessary — but not wrong.

---

## 7. Suggested wave order (advisory; owner-ruled)

1. **B-1** — declare `@mkbabb/glass-ui@7.0.0` and regenerate the lock (lane-frontend §10 step 1). Nothing below is reproducible first.
2. **C-1** — one line: ref a `<span>` wrapper, or widen `resolveElement` to `Element`. Add the `useIconSpin` test that would have caught it (**C-12**).
3. **C-4** — pass `icon-only`; delete `w-10 h-10 p-0` / `w-8 h-8 p-0`.
4. **C-3**, **C-8**, **C-9** — delete the wrapper div (fixes C-3), drop the inert `class` (C-8), move `v-for` + `:key="name"` onto `SelectItem` (C-9). One markup pass.
5. **C-2**, **C-13** — reconcile the K.W0 S3 block against `startCollapsed`/`collapseDelay`; retire the `DockSelectTrigger` name.
6. **C-6** — do not clear `PEAK_PROP` on unmount, or hoist `peak` to module scope. Needs the live probe in §3 first.
7. **C-5** — an owner ruling on which horn is true, then either extend the cure or delete it.
8. **C-7**, **C-14…C-17** — barrel/import/contract hygiene, individually landable.
