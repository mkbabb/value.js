claude-opus-5[1m]

# CHALLENGE · ChannelControls · axis D (DESIGN)

**Target** `demo/components/instrument/transport/channel-controls/ChannelControls.vue` (456 lines)
**Evidence root** `/Users/mkbabb/Programming/keyframes.js` (READ-ONLY). All `file:line` below are relative to that root unless absolute.
**Method** static, source-derived. No browser tooling. Claims that require a rendered frame are marked `UNPROVEN-NEEDS-LIVE` and reserved for SS-13.
**Posture** the component is assumed DEFECTIVE until the tree proves otherwise; but a false defect is worse than a missed one, so every claim below carries the observation that would kill it. Three candidate defects were killed by their own falsifiers during this pass and are recorded as superlatives (S-C especially) rather than suppressed.

**Read whole**: the target; `ChannelOptions.vue` (609); `KfPillTabs.vue` (124); `KfPillTabs/useKfPillTabs.ts` (93); `composables/{useTabStripScroll,useKeyframesPaneReveal,useSelectedControlSurface}.ts`; `transport/composables/{useScrollFade,useKfPillTabs}.ts`; `transport/injectionKeys.ts`; `state/controlSurfaces.ts` (309); `state/controlOptionsStore.ts`. **Read for falsification**: `ControlsPaneWrapper.vue` + `.css`, `AnimationControlsGroup.vue`, `app/App.vue`, `app/dock/ChromeDock.vue`, `scenes/{spring,easing}/use*Demo.ts`, `demo/styles/{style,design-idioms}.css`, and the installed `@mkbabb/glass-ui@7.0.0` token/utility tree.

**Tally** — 18 defects (2 BLOCKER · 5 MAJOR · 7 MINOR · 4 INFO) · 5 superlatives.

---

## §0 · The load-bearing fact the rest of this document turns on

`demo/app/App.vue:169`

```
provide(TABS_EXTERNALLY_MANAGED_KEY, true);
```

Unconditional, at app root. `EditorShell` — the host the target's prose repeatedly calls "the STANDALONE host … `tabsExternallyManaged` false" (`ChannelControls.vue:263-270`, `:290-292`, `:311-312`) — is rendered **inside** that provider (`App.vue:28`). There is no second `createApp` and no second provide site (`grep -rn TABS_EXTERNALLY_MANAGED_KEY demo/` → 5 hits, one provide).

Therefore, for **every** `ChannelControls` instance in the shipping demo, `tabsExternallyManaged === true`, and:

- `v-if="!tabsExternallyManaged"` (`:56`) is **always false** → the tab header, the `<KfPillTabs>` strip (`:74-82`), `tabsHeaderEl`, `useTabStripScroll`, `overflowClass`, and the whole `.tabs-overflow-*` `<style scoped>` block (`:435-455`) never render or apply.
- `stripOptions` (`:313-324`) is computed and consumed by nothing rendered.
- the `extraTabs` prop (`:271`) is read only in `stripOptions`' `!tabsExternallyManaged` branch → the whole App → `AnimationControlsGroup:30` → `ControlsPaneWrapper:65` → `ChannelControls` `extraTabs` pipeline is inert.

**This contradicts census `lane-frontend.md` S-1**, which states: *"It is live, not dead — rendered at `components/instrument/transport/channel-controls/ChannelControls.vue:74`."* The **import** is live and the **render site exists in source**; the **rendered node does not**. S-1's replace-verdict is unaffected (retiring 217 dead lines is still correct, and cheaper than S-1 assumes), but its liveness premise is wrong and the follow-on reasoning that KfPillTabs is a shipping a11y surface must be withdrawn. Falsifier for my contradiction: a `provide(TABS_EXTERNALLY_MANAGED_KEY, false)` anywhere in the tree, or a second app entry that mounts `EditorShell` outside `App.vue` — `demo/app/main.ts:32` is the only `createApp`.

---

## BLOCKERS

### D-1 · BLOCKER · Two stacked timelines teleport into one target on every multi-channel scene
`ChannelControls.vue:186-200` · `controls-pane/ControlsPaneWrapper.vue:45-88` · `state/controlOptionsStore.ts:66-97` · `scenes/spring/useSpringDemo.ts:406-427`

`ControlsPaneWrapper` mounts **one `ChannelControls` per painting channel** (`:45-48` `v-for="host in controlHosts"`), gating each only with `v-show` (`:49`) — all instances are mounted, all setup runs.

Every instance resolves the **same** store bucket: `ChannelControls.vue:274` calls `getStoredAnimationGroupControlOptions(animation)`, which keys by `animation.superKey` → the SceneId (`controlOptionsStore.ts:66-71`). Two hosts in one scene share one `storedControls`, hence one `isTimelineExpanded` and one `selectedControl`, hence an identical `isTimelineVisible` (`:377-379`).

`spring` ships **two painting channels** — `Sweep` (`springEditAnim`) and `Entry` (`entryAnim`), both carrying `animation` (`useSpringDemo.ts:408-425`) → `controlHosts.length === 2`.

Consequence:
- `isTimelineExpanded === false` → Teleport `:disabled` → each renders in place; the non-selected host is inside the `v-show:false` div → one visible timeline. Correct.
- `isTimelineExpanded === true` → **both** Teleports activate and both `<KeyframeTimeline>` escape the `v-show` wrapper into the single `#timeline-expanded-target` (`AnimationControlsGroup.vue:79-88`) → **two full timelines stacked in the expanded bar**, one for `Sweep`, one for `Entry`.

The tell is two files away: `ChannelOptions.vue:377` gates its own teleport `v-if="active"` — the exact guard this Teleport omits. `active` is already a prop on this component (`:257`, `:108`) and already threaded from the wrapper (`ControlsPaneWrapper.vue:64`); it is simply not applied here.

**Falsifier** — any of: (a) `ControlsPaneWrapper` mounting only the selected host (it does not — `v-for` + `v-show`); (b) `isTimelineExpanded` being per-host rather than per-scene (it is per-`superKey`); (c) `spring`'s `Entry` channel lacking `animation` (it has `entryAnim`); (d) a `#timeline-expanded-target` rule that hides all but the first child — `AnimationControlsGroup.css` / `:81-87` carry only `max-h`/`glass-wash`/`border-t`, no `:first-child` selector.
`UNPROVEN-NEEDS-LIVE` only for the *pixel* form of the stack (two full-height timelines vs. one clipped by `max-h-[var(--panel-max-h)]` = 60dvh). The duplicate mount itself is proven from source.

### D-2 · BLOCKER · Three orphan, unnamed `role="tabpanel"` regions — no tab, no tablist, no `aria-labelledby`, in every scene
`ChannelControls.vue:97-102`, `:129-137`, `:149-154` · `KfPillTabs.vue:19-34` · `app/dock/ChromeDock.vue:23-27,235`

The panels declare `role="tabpanel"` + `data-state` + `tabindex`. None declares `id` or `aria-labelledby`. The strip that would own them (`KfPillTabs.vue:19-34`) emits `role="tab"` buttons with **no `id` and no `aria-controls`** — so even where it rendered, the APG association would be absent on both sides.

Per §0 it renders nowhere. The live control-surface switcher is `ChromeDock`'s `<Select>` (`ChromeDock.vue:23-27`, `:235`) — a combobox/listbox, **not** a `tablist`. Net result in the shipping DOM: `role="tabpanel"` elements exist with **zero `role="tab"` and zero `role="tablist"` anywhere in the document**, and with no accessible name. A screen-reader user is told "tab panel", is given no name for it, and can search for tabs that do not exist.

The component states this exact rule and then breaks it in its own sibling branch. `:29-30`:

> *"a bare tabpanel role without a tablist would be an ARIA defect, so the seam is a class, not a role."*

That reasoning produced the correct `class="single-surface-panel"` in the flat branch (`:31`) — and the `v-else` branch it does not govern ships the defect it names. (The flat branch is itself unreachable; see D-7.)

Note on grading: `role="tabpanel"` has no ARIA *required* parent, so axe-core's `aria-required-parent` will not fire — this will not show up in an automated sweep. It is a pattern break, not a rule break, which is why it has survived. Blocker because it holds on **every scene, permanently**, for a whole user class, and because the file already knows the rule.

**Falsifier** — a `role="tablist"` rendered elsewhere in the pane/dock at the same time (ChromeDock is a `Select`; `grep -rn 'role="tablist"' demo/` → `KfPillTabs.vue:14` only), or an `aria-labelledby`/`id` pair added by a directive or `v-bind="$attrs"` fall-through (there is none — the panel divs take no `$attrs`).

---

## MAJOR

### D-3 · MAJOR · The tab-strip apparatus is unreachable chrome, and its death silently removed the T.G9 interaction warm-gate
`ChannelControls.vue:41-83`, `:305-324`, `:394-398`, `:435-455` · `composables/useTabStripScroll.ts` (80 lines) · `KfPillTabs.vue` + `KfPillTabs/useKfPillTabs.ts` (217)

Per §0. The design cost is not merely ~90 unreachable template/CSS lines in the target plus two unreachable modules; it is a **behavioural regression that the surviving prose asserts is live**:

`:79-80` wires `@pointerenter="warmKeyframes"` / `@focusin="warmKeyframes"` onto the strip. `useKeyframesPaneReveal.ts:60-67` documents that gate as half the Monaco-eager LCP cure — *"or the instant the user reaches for it."* With the strip unrendered, the only surviving warm paths are the `requestIdleCallback(timeout: 4000)` warm (`:90-101`) and the `keyframesActive` watch (`:107-113`) which fires **on** selection, not on approach. The "editor opens instantly on tab-select" property (`:31-33`) therefore holds only when the idle warm has already landed; a user who selects Keyframes inside the idle window pays the ~4 MB `vendor-monaco` fetch **at click time, with no indicator** (compounds with D-5).

`useTabStripScroll` is instantiated unconditionally at `:398` and runs its `onMounted` against a permanently-`null` `tabsHeaderEl` — harmless, but it means the composable's `[role=tablist]` "single DOCUMENTED vendor-DOM contract" (`useTabStripScroll.ts:66-72`) documents a contract with a node that never exists.

**Falsifier** — §0's falsifier; or any consumer that renders `ChannelControls` outside `App.vue`'s provider (`grep -rn ChannelControls demo/` → one import site, `ControlsPaneWrapper.vue:170`).

### D-4 · MAJOR · `pl-4 pr-7` — a 12px unbalanced inset on the primary content plate, stacked on an already-symmetric parent
`ChannelControls.vue:17`, `:39` · `controls-pane/ControlsPaneWrapper.css:122-135`, `:47-49`

Both branches open with `class="pl-4 pr-7 pt-2 pb-2 …"` — 16px left, **28px** right. The parent `.controls-content` is symmetric: `padding-left: 12px; padding-right: 12px` on desktop (`ControlsPaneWrapper.css:133-134`), `padding-inline: 0.75rem` on mobile (`:48`). Nothing compensates. Effective inset on the content plate: **28px left / 40px right**.

The 12px is presumably a scrollbar gutter, and it is on the wrong box. The scroll container is the **inner** div (`:19`, `:85` — `overflow-y-auto`), which sits *inside* the 28px right padding. So the scrollbar renders 40px from the pane edge, and:
- on overlay-scrollbar platforms (macOS/iOS default) the 12px is pure void;
- on classic-scrollbar platforms the gutter is 40px wide, not 12px;
- either way the `<Card cartoon>` plate that `ChannelOptions.vue:3` renders — a bordered, shadowed, full-width object whose edges are visually load-bearing — sits 12px off-centre in its column.

The correct instrument exists and is unused: `scrollbar-gutter: stable` on the inner scroller, with symmetric outer padding. Compare `.controls-content`'s own comment (`ControlsPaneWrapper.css:129`) — *"symmetric shadow-clearance"* — the parent got this right one level up.

Vertical is also mildly off: `pt-2` (8px) top vs `pb-2` + inner `pb-1` (8+4=12px) bottom. Filed separately as D-18.

**Falsifier** — a right-edge affordance occupying the 12px band (a resize handle, a rail fade, a positioned scroll shadow): `ControlsPaneWrapper.css` carries a `scroll-fade` mask on `.controls-pane` but no right-edge positioned child; `grep -n "right:\|inset-inline-end" ControlsPaneWrapper.css` → none in the pane body. Or an ancestor `padding-left` of 12px making the totals equal — the parent is symmetric, verified above.

### D-5 · MAJOR · Both async panes ship with no loading state and no error state, outside the app's only `<Suspense>`
`ChannelControls.vue:252-253` · `app/App.vue:90-99`

```
const KeyframesStringControls = defineAsyncComponent(() => import("../../keyframes/KeyframesStringControls.vue"));
const KeyframeTimeline      = defineAsyncComponent(() => import("../../timeline/KeyframeTimeline.vue"));
```

No `loadingComponent`, no `errorComponent`, no `delay`, no `timeout`. The app's only `<Suspense>` (`App.vue:90-99`) wraps the **scene** `#target` slot; `ChannelControls` descends from `EditorShell` (`App.vue:28`) → `AnimationControlsGroup` → `ControlsPaneWrapper`, entirely outside it. So there is no inherited boundary.

State coverage, decidable from source:
- **loading** — selecting Keyframes before the idle warm lands renders an *empty* `[role=tabpanel]` while a ~4 MB chunk fetches. Nothing tells the user anything is happening. Same for Timeline (`KeyframeTimeline` chunk).
- **error** — on chunk-load failure `defineAsyncComponent` without `errorComponent` renders a comment node and logs to console. The panel is permanently blank with no message and no retry. On a flaky mobile link this is the modal failure, not the exotic one.

The file elsewhere shows the author knows how to write an honest pre-load frame — `ChannelOptions.vue:531-534` documents its empty selects as *"an honest pre-load frame"* — so this is an omission, not a philosophy.

**Falsifier** — an app-level `app.config.errorHandler` that paints a visible fallback (`main.ts` has none for async-component resolution), a global `<Suspense>` in `EditorShell.vue` (grep: none), or a `vite` `build.rollupOptions` preload that makes the chunk synchronously present (it cannot — `import()` is the seam).

### D-6 · MAJOR · The Timeline tabpanel is empty; the timeline itself renders as its sibling, outside any panel
`ChannelControls.vue:149-172` vs `:186-200`

The `timeline` tabpanel div (`:149-154`) contains **only** the expanded-state placeholder (`v-if="storedControls.isTimelineExpanded"`, `:156-171`). The actual `<KeyframeTimeline>` lives at `:186-200`, a **sibling** of the panel and of the scene slot (`:180`), inside `tabsContentEl`.

So, with `timeline` selected and collapsed — the ordinary case — the DOM is:

```
[role=tabpanel][data-state=active][tabindex=0]   ← EMPTY, focusable, announced
<slot name="tabs-content">                        ← scene body
<KeyframeTimeline>                                ← the content the panel claims to hold
```

An empty focusable region that announces as an active tab panel, followed by that panel's supposed content sitting outside it. The rationale given (`:182-185` — Teleport lifecycle must not be tied to a panel mount) is sound as a *constraint*; the resolution — leaving a hollow panel behind — is not the only response to it (the Teleport could live inside the panel with the panel gated on `hasSurface` rather than the active value, mirroring the keyframes force-mount at `:129-137` which this same file already does correctly).

Inverted state coverage: the panel has content **only** when the timeline is *elsewhere* (expanded to the bottom bar), and is empty exactly when the timeline is supposedly *in* it.

**Falsifier** — a CSS rule that visually re-parents `:186` into the panel (none; the Teleport wrapper carries only `animate-in fade-in slide-in-from-right-2 duration-fast`), or a reading of the template in which `:186` is nested inside `:149`'s div — indentation and the `</div>` at `:172` refute it.

### D-7 · MAJOR · The flat single-surface branch is unreachable under the T.B2 derivation, and its 20-line rationale describes surface sets the derivation no longer produces
`ChannelControls.vue:6-35`, `:326-336` · `state/controlSurfaces.ts:95-120` · `ControlsPaneWrapper.vue:207-228`

```
const isSingleSurfaceScene = computed(() =>
    tabsExternallyManaged &&
    machine.controlSurfaces.value.length === 1 &&
    builtInTabs.value.length === 0);
```

`builtInTabs.length === 0` requires the DFA set to contain none of `{controls, keyframes, timeline}`. Under `surfacesFor` (`controlSurfaces.ts:107-109`) a **painting** selected channel yields `[...BUILT_IN_SURFACES]` — all three. So the condition requires the selected channel to be **non-painting**.

But `ControlsPaneWrapper` mounts a host only for channels that paint (`:209-219`, `c.animation ? [...] : []`) and shows it only when `selectedAnimation == host.name` (`:49`). So a non-painting selection means either no host at all, or every mounted host hidden. There is no state in which a **visible** `ChannelControls` sees a single non-built-in surface.

The 10-line comment at `:6-14` and the 5-line one at `:326-330` assert the opposite as fact:

> *"a scene whose DFA set is exactly ONE scene-specific surface (easing → ['easing'], spring → ['spring'])"*

The live derivation gives **easing → `[controls, keyframes, timeline, easing]`** (`useEasingDemo.ts:351-361` — one channel, carries `previewAnim`, facet `easing`) and **spring → `[controls, keyframes, timeline, spring]`** (`useSpringDemo.ts:406-427`). Both length 4. The two scenes the comment names as its witnesses are its counterexamples.

Design cost: a second, structurally different mount path (`:15-35`) that nobody can reach or review against a rendered frame, carrying its own `pl-4 pr-7` copy of D-4 and its own `mt-2` "pixel parity" claim (`:22-25`) against a `<TabsContent>` that no longer exists in the tree.

**Falsifier** — a scene facility whose *selected, painting* channel produces exactly one non-built-in surface (impossible by `controlSurfaces.ts:107-108`), or a `ChannelControls` host mounted for a non-painting channel (impossible by `ControlsPaneWrapper.vue:209-219` when `channels` is supplied). Residual gap: the group fallback path (`ControlsPaneWrapper.vue:221-227`, `channels` undefined) mounts hosts from `animationGroup.animations` — but `machine.controlSurfaces` is then fed from `surfacesFor(facility)` with no facility → `[]`, length 0, and `AnimationControlsGroup.vue:19` refuses to mount the wrapper at all (`hasControlSurfaces`). Marked closed.

---

## MINOR

### D-8 · MINOR · The overflow-fade probe measures a box that can never scroll, while the box that does scroll is a different element
`composables/useTabStripScroll.ts:52-74` · `composables/useScrollFade.ts:82-101` · `ChannelControls.vue:56`, `:81`, `:441-455`

`tabsListElRef` resolves to `[role=tablist]` (`useTabStripScroll.ts:71-72`) = `.kf-pill-tabs`, which is `display: inline-flex` with **no `overflow`** (`KfPillTabs.vue:80-86`). A non-scroll-container has `scrollLeft` pinned at 0, so in `useScrollFade.check()` (`:96-99`):

- `overflowStart = scrollLeft > 2` → **permanently false** → `.tabs-overflow-left` and `.tabs-overflow-both` (`ChannelControls.vue:447-454`, 8 declarations) are **unreachable rules**;
- `overflowEnd` can be true, so only the right fade can ever paint;
- `scrollActiveTabIntoView` (`:52-56`) scrolls the nearest scroll-*box*, which is the header (`ChannelControls.vue:56`, `overflow-hidden` — programmatically scrollable). After that scroll the header's `scrollLeft > 0` while the probe still reads the tablist's `0` → the left fade never turns on and the right fade never turns off. The indicator is permanently desynchronised from the actual scroll position.

Either the strip overflows — in which case the fade is wrong in both directions — or the file's own claim holds (`:52-53`: *"the ≤4-tab control strip never overflows, so no scroller is wired here"*), in which case probe, masks, and scroll-into-view are all dead weight. Both branches are defects. Today, per D-3, it is moot: `tabsHeaderEl` is null, `querySelector` returns null, `overflowClass` is `""` forever.

**Falsifier** — a global rule giving `.kf-pill-tabs` `overflow-x: auto` (`grep -rn "kf-pill-tabs" demo/` → the SFC only), or moving the `overflowClass` binding (`:81`) onto the header. Note `scrollWidth` semantics on `overflow: visible` boxes vary by engine; the argument above rests on `scrollLeft`, which does not.

### D-9 · MINOR · `.glass-wash` nested inside `.glass-wash` — the same ladder rung applied twice, at unequal insets with equal radii
`ChannelControls.vue:56` · `KfPillTabs.vue:13-18`, `:80-86` · glass-ui `styles/glass/{ladder,material,rim,grain-overlay}.css`, `styles/glass-specular-track.css`

Header: `class="… glass-wash rounded-panel px-2 py-0.5 overflow-hidden"`. Its only child, the tablist: `class="kf-pill-tabs glass-wash"` with `border-radius: var(--radius-panel, var(--radius-lg))`.

`.glass-wash` is a **rung** in glass-ui's surface ladder, not a decoration: it installs `--glass-bg-rung` (`glass/ladder.css`), a `::before` specular layer (`glass-specular-track.css`), a `::after` grain overlay (`glass/grain-overlay.css`), and a rim inset shadow (`glass/rim.css`). Nesting the *same* rung composites two translucent plates, two grain textures, and two rim hairlines where the ladder's contract is one step per depth change — the glass-ui-first precept's canonical misuse.

Geometry compounds it: `--radius-panel` = `--radius-xl` = **12px** (glass-ui `theme/radius.css`) on **both** boxes, at insets of 8px horizontal (`px-2`) and 2px vertical (`py-0.5`). Concentric-radius arithmetic wants inner = outer − inset, i.e. 4px horizontally and 10px vertically — which is itself an incoherent pair and the tell that the wrapper should not be a rounded plate at all. The corners will read visibly non-concentric wherever the two plates' rims are both visible.

(Compare S-D: the arithmetic *one level down* is exactly right.)

**Falsifier** — a demo override neutralising the nested rung: `demo/styles/style.css:203` does zero out `--glass-tint-strength-aa` for `:where(.glass-quiet, .glass-wash, .glass-resting)`, which flattens the **tint** contribution, but not the `::before` specular, the `::after` grain, or the rim shadow. Would also be killed by the header dropping `glass-wash` or `rounded-panel`.

### D-10 · MINOR · `transition: font-weight` on a variable font animates the strip's own metrics
`KfPillTabs.vue:99-106`, `:115-119` · glass-ui `styles/fonts.css` (`font-weight: 200 800`)

```
font-weight: 500;
/* Narrow transition (no `all`) — only the activation channels change. */
transition: color …, background …, font-weight var(--duration-fast) var(--ease-standard);
…
.kf-pill-tab[data-state="active"] { font-weight: 600; }
```

Plus Jakarta Sans ships as a **variable** face (`font-weight: 200 800` in the installed `@font-face`), so `font-weight` interpolates continuously rather than snapping. Advance widths change with weight → the active pill's width animates over `--duration-fast` (0.2s) → in an `inline-flex` row of `flex-shrink: 0` siblings, **every pill to its right slides** for the duration of each selection change and each hover-off.

The comment asserts *"only the activation channels change"* while listing the one channel in the set that is metric-affecting. `color` and `background` are free; `font-weight` is not.

**Falsifier** — a static (non-variable) Jakarta build, which would snap at the 550 midpoint (still a mid-transition jump, smaller defect); or `font-variation-settings`/`font-synthesis` pinning; or a `min-width` / `tabular` lock on `.kf-pill-tab` (there is none). Under `prefers-reduced-motion` the glass-ui blanket (S-C) restricts `transition-property` to `opacity, color, background-color, border-color, box-shadow` — dropping `font-weight` — so PRM users are already spared. Everyone else is not.

### D-11 · MINOR · Fluid type in a fixed-padding chip; half a token pair consumed
`KfPillTabs.vue:98`, `:92` · glass-ui `styles/typography/scale.css`, `tokens/scheme-motion.css`

`font-size: var(--type-small, 0.875rem)` where `--type-small: clamp(0.875rem, 0.8rem + 0.25vw, 1.25rem)` — 14px at ≤600px viewport, ~17.6px at 1920px, capped 20px. The surrounding metrics are all fixed: pill padding `0.25rem 0.75rem`, track padding `0.125rem`, header `px-2 py-0.5`. So the padding-to-cap-height ratio drifts across the viewport range — the chip reads generous on a laptop and cramped on a wide display, which is the inverse of what a fluid scale is for.

Separately, glass-ui pairs `--type-small` with `--type-leading-small: 1.4`; the pill consumes the size and leaves the leading to inherit `--type-leading-body: 1.5` from `body` (glass-ui `typography/semantic.css`). Half a token pair. Not a break — the inherited value is unitless so the line box still scales — but it is the kind of partial token consumption that the flat-namespace hazard feeds on.

**Falsifier** — a `line-height: var(--type-leading-small)` on an ancestor reaching `.kf-pill-tab` (grep: none), or fluid padding tokens on the chip (`0.25rem/0.75rem` are literals).

### D-12 · MINOR · Physical-axis chrome and direction-bound prose throughout; no logical properties, no RTL story
`ChannelControls.vue:17`, `:39`, `:161`, `:190`, `:444-454`

- `pl-4 pr-7` — physical, will not mirror.
- `slide-in-from-right-2` (`:190`) — the timeline enters from the right unconditionally.
- mask gradients are `linear-gradient(to right, …)` with `-left`/`-right` class names (`:444-454`) — physical.
- `<ChevronDown class="animate-bounce" />` (`:160`) + the copy **"Timeline expanded below"** (`:161`) — both assert a *vertical* spatial relation that holds on desktop (`AnimationControlsGroup.vue:79-88`, the `[bottom]` row) and on mobile (`position: fixed` above the menubar), so the copy is honest on both current layouts. It is nonetheless layout-coupled prose: it names a position rather than a state, and it breaks silently if the expanded target ever moves.

No `dir` handling exists anywhere in the demo (`grep -rn 'dir=' demo/` → none; no i18n layer). So this is a **latent** class, not a live break — filed MINOR, not MAJOR, on that basis.

Prose quality otherwise: "Timeline expanded below" / "Collapse" / "Control surface" (`:78`) are terse and non-trite. **No clichés found** — no "Oops!", no "Something went wrong", no "Let's get started". Recorded as S-E's sibling; nothing to flag.

**Falsifier** — introduction of an RTL locale, or a `dir="rtl"` test in the e2e suite (none exists), would promote this to MAJOR. Absence of both keeps it MINOR.

### D-13 · MINOR · A four-level `#tabs-trigger` slot pipeline terminating in a slot that does not exist
`app/App.vue:53-59` → `AnimationControlsGroup.vue:38-40` → `ControlsPaneWrapper.vue:67-75` → `ChannelControls.vue` (no `<slot name="tabs-trigger">`)

The target declares exactly two slots, both `name="tabs-content"` (`:32`, `:180`). The wrapper still passes `<template #tabs-trigger>`; Vue drops unmatched slot content silently. `CubeScene.vue:152-156` records that its `tabsTrigger` was deleted, so nothing currently flows — the pipeline is inert rather than broken. But `App.vue:55` still renders `<component :is="sceneRef?.tabsTrigger">` into it, so the **next** scene that exposes a `tabsTrigger` will have it vanish with no error.

This also contradicts the target's own `:47-51`, which states the slot *"retire[s]"* — three ancestors did not get the memo.

**Falsifier** — a `<slot name="tabs-trigger">` anywhere in `ChannelControls.vue` (grep: absent), or a scene currently exposing `tabsTrigger` (grep: none — only `App.vue:55/57` and the CubeScene tombstone).

### D-14 · MINOR · `tabindex="0"` on panels that already contain focusable content
`ChannelControls.vue:101`, `:133`, `:153`

APG: give a `tabpanel` `tabindex="0"` **only** when it contains no focusable descendants. The `controls` panel wraps `ChannelOptions` (inputs, selects, buttons — `ChannelOptions.vue:25-298`); the `keyframes` panel wraps a Monaco editor. Both therefore add a redundant tab stop before their own contents.

The `keyframes` case has a stated reason — `useKeyframesPaneReveal.ts:130-134` focuses the panel root on reveal — which is a legitimate use of a *programmatic* focus target, but that is `tabindex="-1"`'s job, not `0`'s. The `timeline` panel's `tabindex="0"` lands on an empty div (D-6), which is the one place it is *most* wrong.

**Falsifier** — an APG reading that treats a panel with focusable content as still needing a tab stop (it does not: *"if the tabpanel contains no focusable elements, add tabindex=0"*), or evidence that the reveal focus requires `0` specifically (it does not — `.focus()` works on `-1`).

---

## INFO

### D-15 · INFO · Focus ring has 1px of clearance inside an `overflow-hidden` box
`KfPillTabs.vue:120-123`, `:80-86` · `ChannelControls.vue:56`

`outline: 2px solid var(--color-progress); outline-offset: 1px` → the ring extends 3px beyond the button box. Vertical slack to the clipping edge: track `padding: 0.125rem` (2px) + header `py-0.5` (2px) = **4px**. It fits, with 1px to spare. Horizontal slack is 8+2=10px — ample. Recorded because any future tightening of `py-0.5` or the track padding clips the keyboard-focus indicator against a `overflow-hidden` boundary, and nothing in the tree records the dependency.

**Falsifier** — `overflow: hidden` clipping at the *content* box rather than the padding box (it clips at the padding box, so the padding is inside the visible region — this is why it currently fits).

### D-16 · INFO · `<TooltipProvider>` re-provided once per channel host, inside an ancestor that already provides it
`ChannelControls.vue:2`, `:204` · `AnimationControlsGroup.vue:2`, `:112`

Both use `:delay-duration="100" :skip-delay-duration="0"` — identical, so there is no behavioural delta; the inner provider simply shadows the outer with the same values. On `spring` this instantiates N=2 redundant providers. Harmless today, a divergence hazard the moment either value is tuned in one place.

**Falsifier** — differing values between the two (they match), or `ChannelControls` being mounted outside `AnimationControlsGroup` (its only consumer chain runs through it).

### D-17 · INFO · The "≤4-tab control strip never overflows" claim looks false at the rail floor — `UNPROVEN-NEEDS-LIVE`
`ChannelControls.vue:52-53` · `demo/styles/design-idioms.css:47` (`--rail-width: clamp(25rem, 33svi, 32rem)`)

Rough arithmetic for the cube/spring 4-tab set at 14px / weight 500 / `padding-inline: 0.75rem`: `Controls` ≈ 82px, `Keyframes` ≈ 96, `Timeline` ≈ 86, `Matrix Controls` ≈ 129 → ~393px + 3 gaps (6px) + track padding (4px) + header `px-2` (16px) ≈ **419px**. Available at the 400px rail floor, after `.controls-content` 12+12 and this component's 16+28: **~332px**. That is an overflow of ~87px, and the strip's type is fluid upward (D-11), which worsens it on wide viewports where the rail caps at 512px.

Filed INFO and `UNPROVEN-NEEDS-LIVE` because the glyph-advance estimate is not a measurement, and because per D-3 the strip does not render at all today. Reserve for SS-13 only if the strip is ever restored.

### D-18 · INFO · Vertical padding asymmetry, 8px top vs 12px bottom
`ChannelControls.vue:17`, `:19`, `:39`, `:85`

Outer `pt-2 pb-2` (8/8), inner scroller adds `pb-1` (4) → effective 8px top, 12px bottom. Deliberate bottom breathing room is a defensible choice; recording it because it is undocumented and sits beside D-4's undocumented horizontal 12px, and the two together read as accretion rather than a proportional system.

---

## SUPERLATIVES (L-18 runs both ways)

### S-A · `inert`, not `aria-hidden`, on the cached Monaco pane — with the reason written down
`ChannelControls.vue:117-137` · `composables/useKeyframesPaneReveal.ts:41-49`

> *"`inert` (not bare aria-hidden, which leaves focusable Monaco descendants in the tab order — the aria-hidden-focus a11y defect) takes the cached pane out of BOTH the tab order and the AT tree."*

This is the correct instrument for a force-mounted-but-hidden subtree containing a focus-hungry editor, it is applied with the matching `tabindex="-1"` (`:133`) and a `content-visibility: hidden` cache (`:422-424`), and the *reason* is recorded at both the call site and the composable. The `aria-hidden` version of this pattern is one of the most common defects in the class. Genuinely above the bar.
**Falsifier** — `inert` support gaps: Baseline since 2023 (Safari 15.5+, Chrome 102+, Firefox 112+); no polyfill needed for the demo's target matrix. If an older engine were in scope, `inert` would silently no-op and the defect would return.

### S-B · Contrast computes clean on both arms, at both text and non-text thresholds
Computed from `glass-ui/styles/tokens/{color-radius,dark-arm}.css` and `demo/styles/style.css:130,163`.

| pair | light | dark | required |
|---|---|---|---|
| inactive pill `--muted-foreground` on `--background` | **5.21 : 1** | **7.70 : 1** | 4.5 (AA, 14px/500) |
| focus ring `--color-progress` (= `--accent-kf`) on `--background` | **4.81 : 1** | **8.18 : 1** | 3.0 (1.4.11 non-text) |

Working: light `--muted-foreground` = `--neutral-5` = `hsl(30 22% 40%)` → Y 0.1440; `--background` = `--neutral-0` = `hsl(40 30% 98%)` → Y 0.9602. Dark: `hsl(34 14% 62%)` → Y 0.3587; `hsl(24 9% 4%)` → Y 0.0031. `--accent-kf` = `light-dark(oklch(0.56 0.17 295), oklch(0.74 0.13 305))` → sRGB-linear Y 0.1602 / 0.3845 via OKLab→LMS→linear-sRGB.

**Falsifier** — the pills sit on stacked `.glass-wash` plates (D-9), so the *effective* backdrop is a translucent composite over `--background`, not `--background` itself. The direction of the shift is unknown without a rendered frame; the light arm's 5.21 has 0.71 of headroom over AA, which is thin enough that a materially darkening plate could cross it. `UNPROVEN-NEEDS-LIVE` for the composited backdrop only — the token-pair ratios above are exact.

### S-C · `prefers-reduced-motion` is honest — by an inherited blanket, and it survives inspection
glass-ui `styles/utilities/a11y-overrides.css`

```
@media (prefers-reduced-motion: reduce) {
  *:not([data-allow-motion]) { animation-duration: .01ms !important; animation-iteration-count: 1 !important; }
  *:not([data-allow-motion]) { transition-duration: .1s !important;
                               transition-property: opacity, color, background-color, border-color, box-shadow !important; }
  [data-allow-motion]        { animation-duration: .01ms !important; animation-iteration-count: 1 !important;
                               transition-duration: .01ms !important; }
}
```

This component carries **zero** PRM handling of its own and uses three unguarded motion primitives — `animate-bounce` (infinite, `:160`), `animate-in fade-in slide-in-from-right-2` (`:190`), and the `.kf-pill-tab` transitions. `tw-animate-css` ships **no** PRM guard (`grep -c prefers-reduced-motion node_modules/tw-animate-css/dist/tw-animate.css` → **0**). I opened this as a MAJOR — an infinite `animate-bounce` is a WCAG 2.2.2 candidate — and the falsifier killed it: the glass-ui blanket neuters all three, including the iteration count on the infinite bounce.

Recording it as a superlative rather than deleting it, because the *pattern* is what deserves credit: a design system that carries the PRM contract at the substrate so 456-line consumers cannot forget it. 18 sites in `demo/` also handle PRM explicitly, so the blanket is a floor, not a crutch.

**One residual defect the blanket cannot reach**, filed here rather than as its own row: `useTabStripScroll.ts:55` calls `scrollIntoView({ behavior: "smooth" })`. The `behavior` option is JS and overrides both CSS `scroll-behavior` and the user's PRM preference; the honest form reads `matchMedia("(prefers-reduced-motion: reduce)")` and passes `"auto"`. Currently unreachable (D-3), so it is latent, not live.

### S-D · The concentric-radius arithmetic inside the pill strip is exactly right
`KfPillTabs.vue:84`, `:86`, `:92`

Track `border-radius: var(--radius-panel, …)` = **12px**, track `padding: 0.125rem` = **2px**, pill `border-radius: var(--radius-lg)` = `--radius` = 0.625rem = **10px**. 12 − 2 = 10. Someone did the arithmetic that almost nobody does. It is precisely this that makes D-9's outer wrapper — the same 12px radius at an 8px/2px inset — read as an accretion rather than a design decision: the strip knows how nesting works; the box around it does not.

### S-E · Degradation is designed, not assumed — three paired fallbacks
`ChannelControls.vue:426-433`, `:441-455`

- `@supports not (content-visibility: hidden) { .monaco-pane.inactive { display: none } }` — the cache benefit is lost, **correctness (one visible pane) is preserved**, and the comment says exactly that.
- every `mask-image` is paired with `-webkit-mask-image`, inside an `@supports (…) or (…)` guard, with a note that the prior rules carried only the unprefixed form and no-op'd on older WebKit — i.e. a *fixed* regression, documented as such.
- the mask magnitude reads a single-sourced `--mask-fade` (`design-idioms.css:49`) rather than a local shadow, with the collapsed shadow named.

The rules themselves are unreachable (D-8/D-3), which is the tragedy of this file in one line: the craft is real and it is pointed at a branch that does not render.

---

## Cross-references to the hitherto corpus

| id | relation |
|---|---|
| `lane-frontend.md` **S-1** (KfPillTabs → SegmentedTabs, RED, 217 lines) | **CONTRADICTED on liveness** — §0 / D-3. The import and the source render site are live; the *rendered node* is not, because `App.vue:169` provides `TABS_EXTERNALLY_MANAGED_KEY: true` unconditionally and `:56` gates the strip on its negation. S-1's replace-verdict stands and gets cheaper; its "live, not dead" premise does not. |
| `lane-frontend.md` **S-2** (type-only `/tabs` consumption; *"the prose and the tree disagree"*) | **EXTENDED**. S-2 catches the comment/tree disagreement at `ChannelControls.vue:86` and `useTabStripScroll.ts:23`. D-3, D-7, D-13 show the same disagreement is structural, not editorial: `:263-270`/`:290-292`/`:311-312` describe a "STANDALONE host" that does not exist, `:6-14`/`:326-330` describe surface sets `surfacesFor` no longer produces, `:47-51` declares a slot retired that three ancestors still forward. |
| `lane-frontend.md` **F-1** (glass-ui phantom dependency) | **NOT RE-LITIGATED**, but D-9's severity depends on it: this audit resolved every glass-ui token and utility against the *installed* `7.0.0` tree, which `package.json` does not pin. Every token claim here inherits F-1's uncertainty. |
| `lane-library.md` (parse seams) | no overlap on this axis. |

---

## What would change my mind fastest

1. `grep -rn "TABS_EXTERNALLY_MANAGED_KEY" demo/` returning a second provide with `false` → §0 collapses, and D-3 / D-8 / D-9 / D-10 / D-11 / D-17 all promote (they become live defects) while D-2 downgrades (a tablist would exist).
2. A rendered frame of `spring` with the timeline expanded → confirms or kills D-1's stacking in one screenshot.
3. `dir="rtl"` entering the demo's test matrix → D-12 promotes to MAJOR.
4. A measured strip width at the 400px rail floor → resolves D-17.
