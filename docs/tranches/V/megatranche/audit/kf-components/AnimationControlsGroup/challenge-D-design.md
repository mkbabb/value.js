claude-opus-5[1m]

# CHALLENGE · `AnimationControlsGroup` · axis D (DESIGN)

**Target** `/Users/mkbabb/Programming/keyframes.js/demo/components/instrument/transport/AnimationControlsGroup.vue` (336 L)
**Style tier** `…/transport/AnimationControlsGroup.css` (223 L, `<style scoped src>` at `.vue:336`)
**Posture** the component is assumed DEFECTIVE until the tree proves otherwise. Every claim below carries a falsifier; a claim that cannot survive its falsifier is not filed. No browser was used — everything is static and source-derived; the two places where the *visual* severity (not the mechanism) needs eyes are marked `UNPROVEN-NEEDS-LIVE` for SS-13.

**Closure read (read-only).** `.vue` + `.css` whole; `AnimationControlsGroup/{useAnimationGroupActions,useAnimationGroupPlayback,useAnimationProgress,useControlsKeyboardShortcuts}.ts`; `controls-pane/ControlsPaneWrapper.{vue,css}`; `components/DemoGlobalChrome.vue`; `TransportDock.vue`; `transportSource.ts`; `@state/controlOptionsStore.ts`, `@state/controlSurfaces.ts`; `channel-controls/ChannelControls.vue` (the portal *source*); `demo/styles/{design-idioms,layout,style}.css`; and the glass-ui 7.0.0 cascade under `node_modules/@mkbabb/glass-ui/dist/styles/` (`index.css`, `glass/ladder.css`, `theme/bridges.css`, `tokens/scheme-motion.css`, `utilities/a11y-overrides.css`, `accessibility.css`).

**Tally** — 15 defects (1 BLOCKER · 5 MAJOR · 5 MINOR · 4 INFO), 5 superlatives.

---

## Fold of the hitherto corpus

Where this challenge touches the kf census lanes at `docs/tranches/V/megatranche/formation/keyframes/`:

| lane id | lane's claim | this challenge |
|---|---|---|
| `lane-frontend` §6.3 (flat namespace) | "No `--kf-*` namespace exists… demo tokens are unprefixed and therefore share a flat global namespace with glass-ui's — a collision surface worth a lane of its own." | **Instantiated + bounded** at D-12. This component mints exactly one such token (`--rail-track`, `.css:51`) and sets it on an *inheriting* root. Measured collision surface against glass-ui 7.0.0: **zero** hits. The hazard is real but currently latent — I contradict any reading of §6.3 that treats it as live breakage. |
| `lane-frontend` §6.5 (PRM, 13 sites / 12 files) | `AnimationControlsGroup.css` is **absent** from the enumerated PRM enforcement sites; the lane closes with "Gaps: … Neither carries a local guard — correct if the delegation holds, **unverified statically**." | **Verified, and it holds** — see superlative S-4. The delegation is `@mkbabb/glass-ui/styles` → `accessibility.css:3` → `utilities/a11y-overrides.css:1`, whose `*:not([data-allow-motion])` rule rewrites `transition-property` with `!important`. I upgrade the lane's "unverified" to PROVEN for this component, and file **no** PRM defect. |
| `lane-frontend` §6.4 (motion substrate) | "The dominant motion substrate is **not** CSS — it is the library itself." | Correct here: this component's only CSS motion is two transitions (`.css:57`, `.vue:83`), and **both are defective in ways unrelated to PRM** — D-4. |
| `lane-frontend` §3.1/§3.2, row `| 336 | AnimationControlsGroup.vue | G |` | typed as a glass-ui consumer of `TooltipProvider` + `type SegmentedTabOption`. | Confirmed exactly (`.vue:124,126`). The *type-only* `/tabs` consumption is the S-2 tell; here it is honest — `extraTabs` is a pass-through prop (`.vue:173`), not a shadow of `SegmentedTabs`. **No S-1/S-2 shadow lives in this component.** |
| `lane-frontend` §0 F-1 (phantom dep) | `@mkbabb/glass-ui` absent from `package.json`/lock, 7.0.0 in `node_modules`. | **Every glass-ui-side claim in this file is therefore conditional on the installed tree**, not on a lockfile. Stated once here rather than repeated per finding; it is the shared falsifier for D-2, S-3 and S-4. |
| `lane-frontend` §6.1 | lists `AnimationControlsGroup.css` at 223 L as "controls-group layout". | Confirmed; the lane does not characterise it further, so §"Aristotelian proportion" below is net-new. |

---

## BLOCKER

### D-1 · A document-singleton portal sink fed by N sources — expanding the timeline stacks every channel's timeline into one box

`AnimationControlsGroup.vue:79-88` mints `id="timeline-expanded-target"` — **one** node, **one** id, rendered unconditionally. The portal *source* is `channel-controls/ChannelControls.vue:186`:

```vue
<Teleport to="#timeline-expanded-target" :disabled="!storedControls.isTimelineExpanded" defer>
    <div v-if="isTimelineVisible" :key="storedControls.selectedControl" …>
        <KeyframeTimeline ref="timelineRef" … />
```

and `ChannelControls` is mounted **once per painting channel**, not once per *selected* channel:

- `ControlsPaneWrapper.vue:46` — `v-for="host in controlHosts"`, each wrapped in `<div v-show="storedControls.selectedAnimation == host.name">`. `v-show`, not `v-if`: **all hosts mount**.
- `ControlsPaneWrapper.vue:207-221` — `controlHosts` = *every* channel carrying an `animation` (`c.animation ? [{…}] : []`), with no selection filter.
- `ChannelControls.vue:377` — `isTimelineVisible = selectedControl === "timeline" || storedControls.isTimelineExpanded`. This is a **store-global** predicate, identical in every instance. Whenever the timeline is expanded it is `true` for *all* of them.

`<Teleport>` relocates its children out of their DOM position, so once enabled the moved nodes are **no longer descendants of the `v-show` wrapper** and `display:none` no longer reaches them. Vue performs no arbitration between two Teleports naming the same target; both append.

Reachability is not hypothetical. `demo/scenes/spring/useSpringDemo.ts:406-425` declares **two** channels, *both* carrying an `animation`:

```ts
channels: [
    { name: "Sweep", animation: springEditAnim, … },
    { name: "Entry", animation: entryAnim,      … },
]
```

and `demo/state/controlSurfaces.ts:108` gives a channel with an `animation` the full `BUILT_IN_SURFACES` set, which includes `"timeline"` (`:54`). So on the spring scene, pressing expand teleports **both** `KeyframeTimeline` instances into the single target, in `controlHosts` order (`Sweep`, then `Entry`) — i.e. a user who has selected **Entry** and expands sees **Sweep's** timeline in the top of the panel, with Entry's stacked beneath it and clipped by the target's own `overflow-hidden` + `max-h-[var(--panel-max-h)]` (`.vue:82,85`).

This is a design blocker, not merely a bug: the container this component owns advertises itself as *the* expanded view of *the* timeline, and it silently renders a different channel's instrument.

**Locus of the fix is here.** `ChannelControls` is right to portal; what is wrong is minting a document-unique sink for a multi-instance source with no per-channel identity and no selection gate. Either the target becomes per-channel, or the source's Teleport gains `&& host.name === selectedAnimation`, or this component becomes the single owner of the expanded `KeyframeTimeline` (it already holds `activeTimelineRef`, `.vue:198-201 — the selected channel's timeline ref is *already computed here*`).

**Falsifiers.** (a) `controlHosts` filtering to the selected host — it does not (`ControlsPaneWrapper.vue:207-221`, read whole). (b) The Teleport being gated on selection — it is not; `isTimelineVisible` reads only the shared store (`ChannelControls.vue:377`). (c) A CSS rule hiding non-first children of `#timeline-expanded-target` — none exists; the only rules touching `.timeline-expanded-cell` are `AnimationControlsGroup.css:179-184` (mobile fixed anchor) and `:219-222` (desktop grid placement), neither of which selects children. (d) Any scene having ≥2 painting channels — spring has exactly 2 (cited above); `easing` has 1 (`useEasingDemo.ts:351-360`), so easing is clean. (e) Vue keeping teleported nodes subject to an ancestor `v-show` — it does not; relocation is a real DOM move.
`UNPROVEN-NEEDS-LIVE`: the exact rendered stack height and which instance survives the `overflow-hidden` clip. The DOM composition itself is fully source-decidable.

---

## MAJOR

### D-2 · The expanded panel's `border-t border-border/50` is dead — an unlayered glass-ui rule overrides it with a four-sided border

`.vue:85` composes the expanded state as `max-h-[var(--panel-max-h)] border-t border-border/50 glass-wash px-4 py-3`. The authorial intent is legible: a **top hairline** separating the expanded timeline from the stage above it.

It never renders. `node_modules/@mkbabb/glass-ui/dist/styles/glass/ladder.css` defines:

```css
.glass-wash { position: relative; … border: 1px solid var(--glass-border-accent); box-shadow: …; }
```

and that rule is **unlayered**: `dist/styles/index.css` imports `glass.css` (→ `glass/ladder.css`) with a bare `@import`, and the only layered import in the whole index is `@import "./components.css" layer(components)`. `grep -c "@layer" glass.css index.css utilities.css` → `0 0 0`. Tailwind v4 (4.3.0 installed) emits every utility into `@layer utilities`. **Unlayered normal declarations beat every layered declaration**, irrespective of source order or specificity. So:

- `border-t` (`border-top-width: 1px`, `@layer utilities`) — overridden.
- `border-border/50` (`border-color: …`, `@layer utilities`) — overridden.
- What actually paints: `1px solid var(--glass-border-accent)` on **all four sides**.

Two consequences. First, the separator design is not the shipped design — the panel gets a full accent outline, which reads as a floating card, not as a band hinged to the stage. Second, the `/50` alpha modifier was presumably chosen to soften a hairline against the stage; that tuning is discarded, so any contrast reasoning about it is moot (I decline to compute a ratio for a declaration that does not apply — computing one would be the false precision this axis warns against).

**Falsifiers.** (a) A `@layer` wrapper anywhere in glass-ui's cascade that would demote `.glass-wash` — grep returns 0 across `glass.css`, `index.css`, `utilities.css`, and `glass/ladder.css` carries no `@layer`. (b) Tailwind emitting utilities unlayered — v4's `@import "tailwindcss"` expands to `@layer theme, base, components, utilities;` + `@import "tailwindcss/utilities.css" layer(utilities)`. (c) A demo-side `!important` or a scoped rule re-asserting the border — `AnimationControlsGroup.css` contains no `border` declaration at all. (d) F-1: a different installed glass-ui version whose `.glass-wash` omits `border`.

### D-3 · The desktop/mobile boundary is written in two different unit systems across four files

One conceptual breakpoint, four declarations, one of them in a different unit:

| file:line | query | unit |
|---|---|---|
| `AnimationControlsGroup.css:114` | `@media (max-width: 1023px)` — mobile fixed stage + fixed timeline | px, viewport |
| `AnimationControlsGroup.css:197` | `@container controls-layout (min-width: 64rem)` — **the desktop grid placements** | rem, container |
| `ControlsPaneWrapper.css:40 / :81 / :144` | `@media (max-width: 1023px)` / `(min-width: 1024px)` / `(min-width:1024px) and (PRM)` | px, viewport |
| `demo/styles/layout.css:180` | `@media (max-width: 1023px)` — the mobile `--work-area-*` override | px, viewport |

`64rem === 1024px` only while the root font-size is 16px. **Nothing in the loaded cascade pins it**: no `font-size` on `html`/`:root` in `demo/styles/*.css` or `demo/index.html`; glass-ui's `typography/*.css` sets none; Tailwind preflight sets `font-family` and `line-height`, not size. A user who raises the browser's default font size to 20px moves the container threshold to 1280px while the three media thresholds stay at 1024px, opening a **256px-wide band** ([1024, 1280)) in which *neither* fork applies:

- the mobile `@media` block does not run → `.stage-cell` is not `position:fixed`;
- the desktop `@container` block does not run → **none** of `.controls-pane-wrapper { grid-column: rail; grid-row: stage }`, `.stage-cell { grid-column: stage; grid-row: stage }`, `.timeline-expanded-cell { grid-column: rail; grid-row: bottom }` apply;
- but `ControlsPaneWrapper.css:81` **does** run, giving the pane its desktop `width: var(--rail-width); overflow:hidden; display:block` skin.

The three in-flow children then auto-place into the `[top] auto / [stage] 1fr / [bottom] auto` template row-major: pane → `[top][rail]`, **stage → `[top][stage]`**, timeline → `[stage][rail]`. The subject is squeezed into the content-sized top row while the 1fr stage row sits empty. `TransportDock` is `position: fixed` (`TransportDock.vue:7`) so it is not a grid item and does not absorb the mis-placement.

**Severity is conditional and I say so plainly.** CSS Containment 3 either resolves `rem` in a container-query condition against the **root element's** computed `font-size` (→ the above holds; this is BLOCKER-grade) or against the **initial value** of `font-size` to avoid a cycle (→ 64rem is pinned to 1024px and the layout break dies). I could not settle that from the tree, and a false BLOCKER is worse than a missed one, so this is filed MAJOR with the branch stated.

What survives **either** branch, and is why this is filed at all: a single boundary is expressed in two unit systems across four files with no comment acknowledging the coupling, and `AnimationControlsGroup.css:39` asserts *"the former `@media (max-width:1023px)` viewport fork **DIES** with it"* while `:114` of the same file **is** `@media (max-width: 1023px)`. (The longer note at `:106-113` does rationalise keeping it — so the file contradicts itself internally, which is D-9's territory, but the unit coupling is nowhere addressed.)

**Falsifiers.** (a) The CQ `rem` resolution rule above — one WPT check settles it. (b) A pinned `html { font-size }` — none found; grep the full cascade to kill this. (c) `--work-area-max-width` clamping the container below the viewport at desktop widths, which would desync the two queries *even at 16px* — it does not: `clamp(72rem, 94vw, 160rem)` (`layout.css:49`) has a 1152px floor, so `min(100dvw, …)` equals the viewport across [1024, 1152] and exceeds 1024 above it.

### D-4 · The expand/collapse motion is nominal — a dead property in the transition list, every skin property outside it, and a collapse that cannot animate at all

`.vue:83` declares `transition-[max-height,opacity] duration-slow ease-standard` on `.timeline-expanded-cell`. Three separate faults:

1. **`opacity` is inert.** Neither class branch (`.vue:84-87`) sets an opacity utility, and `.glass-wash` (read whole, `glass/ladder.css`) sets no `opacity`. A property that never changes value is listed as animating.
2. **Every skin property is outside the list.** The expanded branch adds `border-t border-border/50 glass-wash px-4 py-3`. `border-*`, `background`, `backdrop-filter`, `box-shadow` and `padding` are all *absent* from `transition-property`, so the glass plate, its rim shadow and its 0.75rem/1rem padding **snap in instantly** while the box eases open over `--duration-slow` (0.45s, `tokens/scheme-motion.css`). The panel's skin arrives 450ms before its box.
3. **The collapse is not animated.** The portal source is `:disabled="!storedControls.isTimelineExpanded"` (`ChannelControls.vue:186`). The instant the flag flips false, Vue moves the children back out in the same patch — the target is empty *before* the transition begins. Rendered height is `min(content, max-height)` = `min(0, …)` = 0 immediately. `max-height` continues to animate 60dvh → 0 against nothing. Symmetrically, the *expand* eases `max-height` 0 → 60dvh but the visible growth stops the moment `max-height` passes the content height, so the perceived duration is content-dependent and shorter than declared. This is the classic `max-height` transition pathology, here with an extra dose: the entering content simultaneously runs `animate-in fade-in slide-in-from-right-2` (`ChannelControls.vue:190`) — a *horizontal* entrance inside a box growing *vertically*.

**Falsifiers.** (a) An opacity utility or a `.glass-wash` opacity — neither exists (both grepped whole). (b) `transition-property` including the skin properties — Tailwind's `transition-[max-height,opacity]` emits exactly those two. (c) Teleport deferring its disable by a frame — `defer` affects *target resolution*, not the disable toggle. (d) A `<Transition>` wrapper preserving the leaving content — there is none at `.vue:79-88`.
`UNPROVEN-NEEDS-LIVE`: how objectionable the pop reads at 0.45s. The mechanism is source-decidable; the taste verdict is not.

### D-5 · The disclosure region has no accessible identity, and it is the one surface here with no content predicate

This component mints three surfaces. Two of them carry a structural content predicate and a written invariant:

- `.vue:19` — `<ControlsPaneWrapper v-if="hasControlSurfaces">`, with the SQ-T3 rationale at `:12-17`: *"no chrome without content … the mobile-sheet occlusion recurrence (an empty sheet with a grab handle over a void) **cannot mount**."*
- `.vue:98` — `<TransportDock v-if="transportNames.length > 0">`.

The third — `#timeline-expanded-target`, `.vue:79-88` — has **none**. It renders unconditionally and takes the entire chrome package (`glass-wash` + border + `px-4 py-3` + `max-h-[60dvh]`, and on mobile `position:fixed; left:0; right:0; bottom: var(--dock-menubar-reserve); z-dock`, `.css:179-184`) off a **single persisted boolean** — `isTimelineExpanded` is written to `localStorage` via `useStorage` (`controlOptionsStore.ts:17,44,49`). On a scene with `hasControlSurfaces === false` (the empty-DFA scenes named at `.vue:161-164`) there is no `ControlsPaneWrapper`, therefore no `ChannelControls`, therefore **no portal source at all** — and a `true` in that scene's bucket paints a 60dvh empty glass sheet, fixed, at `z-dock`, over the stage. That is precisely the occlusion recurrence SQ-T3 declares structurally impossible, uncured on the sibling surface in the same file.

Separately, and unconditionally true: the region has **no `role`, no accessible name, and no relationship to either control that drives it.**

- `TransportDock.vue:171` — `<DockControl shape="icon" aria-label="Collapse timeline" @click="emit('expandTimeline', false)">`, rendered only `v-if="storedControls.isTimelineExpanded"` (`:168`).
- `ChannelControls.vue:197` — `@toggle-expand="storedControls.isTimelineExpanded = !storedControls.isTimelineExpanded"`.
- `ChannelControls.vue:166` — a third `Collapse` button in the tab placeholder.

Three toggles, zero `aria-expanded`, zero `aria-controls`, and a target with no `id`-addressable semantics beyond the portal hook. A screen-reader user toggling any of them is told nothing about what opened, what closed, or where it went — and focus is never moved into the revealed region, nor restored on collapse. The state itself is announced by exactly one thing: a visual placeholder reading `"Timeline expanded below"` (`ChannelControls.vue:164`), which is spatial prose an AT user cannot act on.

**Falsifiers.** (a) `KeyframeTimeline`'s own root carrying `role="region"` + an accessible name, which would make the container's namelessness moot — worth checking, and if true this narrows to the `aria-expanded`/`aria-controls` half, which is unaffected. (b) A watcher forcing `isTimelineExpanded = false` when `hasControlSurfaces` is false — none exists; the only writes are the three toggles above and `.vue:108`. (c) The empty-sheet path being unreachable in practice: I concede it is *hard* to reach, since no expand affordance is mounted on a surfaceless scene and buckets are per-`SceneId` — hence this is filed MAJOR, not BLOCKER. `applySharedControlState` (`controlOptionsStore.ts:59`) cross-writes buckets wholesale and is the one path that could seed it; I did not chase its callers.

### D-6 · Proportion inversion — "expand" makes the timeline taller and no wider, inside the narrowest column

`AnimationControlsGroup.css:219-222` places the expanded timeline at `grid-column: rail; grid-row: bottom`, and `.vue:85` caps it at `max-h-[var(--panel-max-h)]` = `60dvh` (`design-idioms.css:48`). The `[rail]` track is `var(--rail-width)` = `clamp(25rem, 33svi, 32rem)` (`design-idioms.css:47`) — 400–512px.

So on desktop, expanding a **time-axis instrument** moves it from the rail into… the rail, and lets it grow to 60% of viewport height in a 400–512px-wide column. The affordance's name promises the one dimension it does not give. A keyframe timeline's information density is horizontal (time); its vertical extent is the property/lane count. Trading 60dvh of height for zero additional width is the wrong axis, and it does so at the direct expense of the `[stage] 1fr` row that holds the subject the timeline is describing — the two things the user is correlating shrink and grow in opposition.

Two corroborating tells that this is drift rather than intent:

- `--panel-max-h` is documented at `design-idioms.css:46` as *"`--panel-max-h` caps **mobile** panels"*. It is applied here on the unconditional class list, i.e. to the **desktop** placement as well.
- `AnimationControlsGroup.css:218` calls the result *"a vertical extension of the rail"* and `.vue:71-74` calls it *"a vertical extension of the controls rail, inheriting `--rail-width`, NOT a full-grid-span surface"*. The rationale is entirely about what it must **not** span (H.W3.S4 / a-demo-architecture F2); nothing in either comment argues that a rail-width timeline is *good*, only that a full-span one was rejected.

**Falsifiers.** (a) `KeyframeTimeline` being vertically-oriented, in which case the proportion is correct — worth one look at its root layout. (b) A wider placement I missed — grep of `AnimationControlsGroup.css` finds exactly one `.timeline-expanded-cell` grid placement (`:219-222`) and one mobile rule (`:179-184`, which *is* full-bleed `left:0; right:0` — so the **mobile** expanded timeline gets the full width the desktop one is denied, inverting the usual density relationship between the two form factors).
`UNPROVEN-NEEDS-LIVE`: whether a 400px-wide, 60dvh-tall timeline is merely cramped or actually unusable.

---

## MINOR

### D-7 · The `--rail-width` rationale in the stylesheet contradicts the shipped token, and the container-query payoff it claims is false

`AnimationControlsGroup.css:40-44` documents the `[rail]` track as:

> "`[rail] var(--rail-track)`: the DERIVED `--rail-width` clamp (**20rem** floor, **26cqi** tracking the work-area card, **30rem** ceiling — no fixed 400px)."

and `:21-24` states the second of the two jobs the `container-type: inline-size` promotion buys:

> "the DESCENDANT cqi/cqb consumers resolve against the clamped work-area card — **M1's `--rail-width` clamp(20rem, 26cqi, 30rem)** … and C6's `--target-viewport-w/h: 30cqi/30cqb` … both now track the card, not the raw viewport."

The shipped token, `design-idioms.css:47`:

```css
--rail-width: clamp(25rem, 33svi, 32rem);
```

Three deltas: 20rem→**25rem**, 30rem→**32rem**, and — the one that matters — `26cqi` → **`33svi`**. `svi` is the **small-viewport inline size**; it is not a container unit. The rail therefore tracks the *raw viewport*, which is precisely what the comment says the promotion stopped it doing. Payoff (2) of the whole `container-type` argument is, for `--rail-width`, false in the tree. (Payoff (1) — the desktop fork reading its own box — is real and is a superlative, S-2. Whether the C6 `--target-viewport-*` half survives is out of this component's closure and unchecked.)

**Falsifiers.** (a) A `--rail-width` redefinition elsewhere using `cqi` — grep across `demo/styles/*.css` finds the single definition at `design-idioms.css:47` plus the `@property` registration at `:60-64`. (b) `svi` being container-relative — it is not.

### D-8 · Two state classes are applied and matched by nothing

`.vue:6-7` computes:

```js
`controls-layout--stage-${stageMode}`,
storedControls.isControlsPanelOpen ? 'controls-layout--open' : 'controls-layout--closed',
```

Repo-wide grep for `controls-layout--open` and `controls-layout--stage` (excluding `node_modules`, `.git`) returns **only** these two authoring lines plus three prose mentions in `docs/tranches/{H,J}/…`. `controls-layout--closed` **is** live (`.css:64`); its sibling `--open` is not, and no `--stage-subject|editor|storyboard` selector exists anywhere. The `stageMode` prop's documented purpose (`.vue:155-159` — "drives the per-mode overlay register") is served entirely by the prop being **forwarded** to `ControlsPaneWrapper` (`.vue:25`); the class is vestigial.

**Falsifier.** A `[class*=…]`/attribute selector, or a Playwright/observation script keying on them — grep covered `demo/` and `scripts/` and found neither.

### D-9 · The file is not formatter-clean, and nothing in the repo would catch it

`.prettierrc.json` exists (`printWidth: 80`, `tabWidth: 4`) with `prettier-plugin-tailwindcss` (a class-order enforcer) and `prettier-plugin-classnames`. `npx prettier --check` on the target:

```
[warn] demo/components/instrument/transport/AnimationControlsGroup.vue
```

(the `.css` passes). The diff is **280 lines**. Two things it reveals beyond whitespace:

- The whole `<div class="controls-layout">` subtree (`.vue:3-110`) is indented as if `<TooltipProvider>` (`:2`) were not there, and `</TooltipProvider>` sits at `:112` after a stray blank line — the wrapper was retrofitted around the layout without reindenting. A reader's eye reads the div as the root; it is not.
- `prettier-plugin-tailwindcss` reorders `'controls-layout justify-items-stretch items-start relative'` → `'controls-layout relative items-start justify-items-stretch'`, i.e. the class strings are unsorted against the project's own enforcer.

And nothing enforces it: `package.json` has **no** `format` script, and `"lint": "depcruise src"` — which does not even traverse `demo/`.

**Falsifier.** A pre-commit hook or CI step running prettier — `package.json` scripts read whole; none found.

### D-10 · A 100ms tooltip delay with a zero skip window, scoped to the entire scene surface

`.vue:2` — `<TooltipProvider :delay-duration="100" :skip-delay-duration="0">`. reka-ui's defaults are 700ms / 300ms. This provider wraps the *entire* layout: the rail, the stage, and the transport dock, whose control cluster (`TransportDock.vue:63,104,158,171,195`) is a row of adjacent icon triggers. At 100ms, a pointer traversing that row fires a tooltip per icon; at `skipDelayDuration: 0` there is no grace window in which a *second* tooltip opens instantly-but-silently, so each is a fresh open/close cycle. The result is tooltip flicker along any horizontal sweep of the dock.

There is also a WCAG 1.4.13 (Content on Hover or Focus) exposure — dismissible/hoverable/persistent — that I cannot decide from source, because it depends on reka-ui's `disableHoverableContent` default and the glass-ui `Tooltip` wrapper. Not filed as a claim; flagged as the thing to check.

**Falsifier.** A per-trigger `delay-duration` override that supersedes the provider, or a design note justifying 100ms (none found in the file).

### D-11 · A destructive `resetAllStores()` + `window.location.reload()` stays wired to a branch nothing can take

`.vue:106` — `@reset="(all: boolean) => all ? clear() : reset()"`, where `clear()` (`useAnimationGroupActions.ts:63-74`) stops the group, wipes **all** stores, and hard-reloads the page. No confirmation, no undo.

The sole emitter of `reset` is `TransportDock.vue:158`, which passes `false`. The dock's own comment records why (`:368-371`):

> "T.C2 — 'Clear all & reload' (the trash icon + its shake, `emit('reset', true)`) MOVED OUT of the transport into the @mbabb settings menu (a destructive storage reset is a settings action, not transport chrome)."

So the `all` parameter is vestigial (`TransportDock.vue:347` still types it `(e: "reset", all: boolean)`), the `all ? clear()` branch is unreachable, and `clear` is destructured (`.vue:302`) for a call site that cannot fire. The migration landed in the dock and left its counterparty here. A page-reloading, store-wiping closure sitting live in a template handler is exactly the thing that should not survive its trigger — if the settings menu ever re-emits through this channel, it does so with no confirmation step, because the confirmation (if any) lives with the moved affordance.

**Falsifier.** Any `emit('reset', true)` / `@reset` binding passing `true` — grep across `demo/` returns exactly the three lines cited.

---

## INFO

### D-12 · `--rail-track`: the flat-namespace hazard, instantiated and measured

`AnimationControlsGroup.css:51` declares `--rail-track: var(--rail-width)` on `.controls-layout`. Custom properties inherit, so this name is now visible to **every** descendant — including every glass-ui component mounted inside the rail and the stage. This is exactly the surface `lane-frontend` §6.3 flags ("demo tokens are unprefixed and therefore share a flat global namespace with glass-ui's — a collision surface worth a lane of its own").

Measured: `grep -- "--rail-track"` across `node_modules/@mkbabb/glass-ui/dist/styles/**/*.css` → **0 hits**. No collision today. `--rail-track` is generic enough (`rail` is a common chrome noun) that a future glass-ui rail primitive would collide silently and inherit a value tuned for a *grid track*, not for itself. Filed INFO — a named hazard with a zero measurement, not a defect.

### D-13 · Seven `proof:*` gate citations, zero runnable gates

The design rationale in this file is anchored on named gates: `proof:panel-naked-rail` (`.vue:17`), `proof:stage-not-clipped` (`.vue:62`), `proof:demo-no-oversize` (`.vue:117,301,310`), `proof:dock-zorder` (`.css:132`), `proof:mobile-single-page` (`.css:113,164`), `proof:stage-within-docks` (`.css:87,153`), `proof:live-session-mobile` (`.css:165`).

`package.json` exposes exactly two: `proof:publish` and `proof:owner-golden`. `scripts/demo-roster.mjs:5-12` enumerates six retained observations — `smoke`, `occlusion`, `usability`, `subject-animates`, `live-session`, `live-session-mobile` — of which **one** (`live-session-mobile`) matches a cited name, and without the `proof:` prefix. The other six cited names resolve to prose in `docs/tranches/**` and to sibling source comments, not to anything executable.

Under the DESIGN axis this is a prose-quality finding: the most load-bearing sentences in the file ("`proof:panel-naked-rail` **asserts** this", "the `proof:stage-not-clipped` gate's 'cube half-clipped' invariant **is** the subject") assert verification that no longer exists as a command. A reader cannot discharge them. I note without pressing it that value.js's owner retired the grep-based `proof:*` idiom as "overfit junk" (2026-06-02) — that is *value.js* feedback and I do not assume it binds this repo; the finding stands on the local grep alone.

**Falsifier.** A gate registry mapping these names to executables — `scripts/gates/` contains only `surface/` and `visual/`, matching the two npm scripts; `DEMO_ROSTER` read whole.

### D-14 · Two identical rule bodies

`.css:64-69`:

```css
.controls-layout--closed  { --rail-track: 0px; }
.controls-layout--railless { --rail-track: 0px; }
```

Byte-identical. One grouped selector expresses the same thing and makes the shared invariant ("the rail track collapses to zero") visible as one fact rather than two coincidences. Trivial, but this is a stylesheet that otherwise argues every decision at length.

### D-15 · Forced-colors is delegated, and the delegation does not obviously reach `.glass-wash`

No `@media (forced-colors: active)` in this component. glass-ui's `glass/a11y-fallback.css` sets `--glass-level: 0; --glass-grain-opacity: 0; --glass-highlight: …transparent` under forced-colors, which flattens the plate; and `utilities/a11y-overrides.css` repaints borders as `CanvasText` for `.hairline-accent` and `.glass-dock` — **but not for `.glass-wash`**. The expanded timeline's only separation from the stage behind it is `.glass-wash`'s own border and backdrop (D-2), both of which forced-colors is entitled to strip. On mobile, where that panel is `position: fixed` over the full-bleed stage (`.css:179-184`), losing the plate means the timeline's content overlays the subject with no opaque backing.

Not filed higher because the outcome depends on how the UA resolves `var(--glass-plate-tinted)` under forced-colors, which is not decidable from the tree.
`UNPROVEN-NEEDS-LIVE` — one forced-colors screenshot settles it.

---

## SUPERLATIVES (L-18 runs both ways)

### S-1 · "No chrome without content" is enforced structurally, twice, and stated as an invariant

`.vue:19` (`v-if="hasControlSurfaces"`) and `.vue:98` (`v-if="transportNames.length > 0"`) **delete** chrome rather than hiding it, and the reasoning at `:12-17` and `:90-96` names the failure it prevents (an empty sheet with a grab handle over a void; an orphaned home transport cluster) rather than describing the code. This is the correct shape for an occlusion cure — a mounted-but-hidden surface still occupies the a11y tree, still takes hit-tests at some z, and still has to be defended forever. Two of three surfaces get it right, which is why D-5 (the third) is worth filing at all.

**Falsifier.** If either predicate were `v-show`, or if `hasControlSurfaces` defaulted `false` and stranded standalone hosts — it defaults `true` (`.vue:140`) with the standalone-host case reasoned at `:165-167`.

### S-2 · The container-query promotion gets two genuinely subtle things right

`.css:12-25` chooses `container-type: inline-size` over `size` **with the reason written down** — the block-size is already definite (`height: min(100dvh, var(--work-area-max-height))`, `:8`), and `size` would collapse descendants lacking a definite block-size. That is a real footgun, correctly avoided.

`.css:29-39` then handles the harder one: an element **cannot match its own** `@container` query, so the `display: grid` + `grid-template-*` must be the **unconditional base** and only the *descendant placements* can live inside `@container` (`:197-223`). Most codebases discover this by shipping a broken desktop layout. Here it is anticipated, and the mobile fork is deliberately left on `@media` with the relationship-based justification (`:106-113`: a viewport-filling `position: fixed` layer is a viewport relationship, not a container one) rather than converted for uniformity's sake. That is the correct call for the right reason.

**Falsifier.** If `.controls-layout` had padding or a border, the queried content box would diverge from its border box — it has neither.

### S-3 · Zero raw values, and every named utility is a *registered* theme key — verified, not assumed

Every length, duration, easing and z-rung in this component resolves through a token: `--rail-width`, `--rail-track`, `--dock-band-reserve`, `--dock-top-band-reserve-stable`, `--dock-menubar-reserve`, `--work-area-max-{width,height}`, `--panel-max-h`, `--spring-smooth`, `--duration-slow`, `--z-content`.

The non-obvious part is the **Tailwind** side. `z-dock`, `duration-slow`, `ease-standard` and `border-border` are *named* utilities, which in Tailwind v4 only exist if the corresponding `@theme` key exists — otherwise they silently emit nothing and the declaration is dead. I checked rather than assumed: `node_modules/@mkbabb/glass-ui/dist/styles/theme/bridges.css` registers `--z-index-dock`, `--transition-duration-slow`, `--ease-standard`, `--color-border`. All four utilities are live. A demo consuming a design system through a `@theme` bridge this completely — and getting the *named* rungs rather than numeric escapes — is unusual.

The single exception, noted for completeness: `px-4 py-3` (`.vue:85`) is raw spacing in an otherwise fully tokenised file.

**Falsifier.** F-1 (§0) — glass-ui is undeclared in `package.json`/lock, so this verification is against the installed tree only; `npm ci` cannot currently reproduce it.

### S-4 · `prefers-reduced-motion` is honest — and the component is right to carry no local guard

`lane-frontend` §6.5 lists 13 PRM enforcement sites and `AnimationControlsGroup.css` is not among them, closing with "correct if the delegation holds, **unverified statically**". I traced it: `demo/styles/style.css` imports `@mkbabb/glass-ui/styles` → `dist/styles/index.css:38` → `accessibility.css:3` → `utilities/a11y-overrides.css:1`:

```css
@media (prefers-reduced-motion: reduce) {
  *:not([data-allow-motion]) { animation-duration: .01ms !important; animation-iteration-count: 1 !important; }
  *:not([data-allow-motion]) { transition-duration: .1s !important;
    transition-property: opacity, color, background-color, border-color, box-shadow !important; }
}
```

This rewrites `transition-property` with `!important`, so under PRM:

- `.controls-layout`'s `transition: grid-template-columns …` (`.css:57`) — `grid-template-columns` is **not** in the allowed list, so the rail snaps. Correct.
- `.timeline-expanded-cell`'s `transition-[max-height,opacity]` (`.vue:83`) — `max-height` is dropped, so the panel snaps. Correct.
- The entering content's `animate-in fade-in slide-in-from-right-2` — clamped to 0.01ms. Correct.

Because the override is `!important` and the component's declarations are not, cascade order and layering cannot defeat it. **The delegation holds, and a local `@media (prefers-reduced-motion)` block here would be redundant.** I therefore file no PRM defect and upgrade the lane's "unverified" to verified for this component. (D-4's motion faults are independent of PRM — they are faults in the *non*-reduced path.)

**Falsifier.** F-1 again; also, any demo-side `!important` transition would escape the override — grep finds none in this component's closure.

### S-5 · RTL-correct by construction, without an RTL rule anywhere

There is not one `[dir]` selector or logical-property override in this component, and it still holds up:

- `grid-template-columns: [rail] … [stage] …` (`.css:52`) follows `direction`, so the rail mirrors to the right in RTL automatically — the named lines carry the semantics, not a side.
- `padding-block` (`.css:92`, `:166`) and `margin: auto` (`.css:11`) are axis-neutral.
- The only physical inset pair is `left: 0; right: 0` (`.css:181-182`) on the mobile timeline — symmetric, hence direction-invariant.
- `px-4 py-3` map to `padding-inline`/`padding-block` in Tailwind v4.

This is what "no RTL bugs" looks like when it comes from picking the right primitives rather than from a mirroring pass.

**Falsifier.** A physical `left`/`right`/`margin-left` in the closure — grep of `AnimationControlsGroup.css` returns only the symmetric pair above. (`ControlsPaneWrapper.css:133-135` does use `padding-left`/`padding-right`, but symmetrically, and that is a different component.)

---

## What I looked for and did **not** find (filed as nothing, recorded so the next pass doesn't re-walk it)

- **Attribute-fallthrough warning.** `v-bind="$attrs"` (`.vue:10`) on a multi-root template *without* `inheritAttrs: false` looks like the classic Vue fragment warning. It is not: Vue only warns when `$attrs` goes **unaccessed**, and the template accesses it explicitly. No defect.
- **A focus trap in the collapsed region.** `max-h-0 overflow-hidden` (`.vue:87`) keeps clipped descendants focusable — the standard collapsed-disclosure defect. It does not apply here, because `:disabled="!isTimelineExpanded"` (`ChannelControls.vue:186`) means the collapsed target is genuinely **empty**, not clipped-but-populated. Credit where due; the mechanism happens to be right.
- **Dead `z-dock` / `duration-slow` / `ease-standard` utilities.** Checked against `theme/bridges.css`; all registered (S-3).
- **A `--kf-*` prefix violation.** None to violate — the namespace does not exist (lane-frontend §6.3), so D-12 is the honest form of this concern.
- **Typography.** The component renders no text node and sets no type property. Nothing to assess.
- **Empty / loading states.** Empty is handled structurally (S-1); loading is `App.skeleton`'s concern and correctly not duplicated here. **Error has no representation at all** — a group that fails to construct yields a bare stage slot — but no error channel reaches this component, so there is nothing here to render. Not filed.
- **Copy.** The one string in the closure that could be trite is `"Timeline expanded below"` (`ChannelControls.vue:164`), and it is a different component's. Nothing in this file's user-facing surface to flag.
