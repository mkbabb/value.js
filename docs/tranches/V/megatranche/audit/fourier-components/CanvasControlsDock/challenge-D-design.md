claude-opus-5[1m] (served model id)

# CHALLENGE — `CanvasControlsDock.vue` · axis **D (DESIGN)**

**Subject** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/visualization/CanvasControlsDock.vue` (132 lines + 1 trailing blank).
**Substrate** fourier HEAD `cd26c653` / tree `9a66411d` — this file is **NOT** among the 24 dirty in-scope paths (`git status --porcelain` on it → empty), so it is byte-identical to the coordinate R4-9 / census §5 X-4 pinned. Nothing below is stale-at-HEAD.
**Pin** `@mkbabb/glass-ui ^4.0.0` / installed **4.0.0**; producer latest **7.0.0** (`/Users/mkbabb/Programming/glass-ui/package.json`). `reka-ui 2.9.10`, `lucide-vue-next 1.0.0`.
**Mode** static + source-derived, read-only. No browser tooling. Livable-only claims carry **UNPROVEN-NEEDS-LIVE** for SS-13.
**Posture** the component is assumed DEFECTIVE until the tree proves otherwise. Every row carries severity + `file:line` + its own falsifier. Superlatives carry the same burden (L-18 runs both ways), and **three candidate defects were killed by their own falsifiers** — recorded in §6 so the negative result is not re-derived.

**Files read whole** (read-only): the subject; `web/src/components/ui/tooltip/Tooltip.vue` + `index.ts`; `@mkbabb/glass-ui@4.0.0` `dist/dock.js`, `dist/dock.d.ts`, `dist/components/custom/dock/{GlassDock,DockIconButton,DockSeparator}.vue.d.ts`, `dist/components/custom/dock/composables/useDockShellProps.d.ts`, `dist/hover-popover.d.ts`, `dist/HoverPopover-Dpzwvc4t.js`, `dist/styles/{hover-popover,glass-specular-track}.css`, `dist/styles/dock/{shell,density,layer-group,overflow}.css`, `dist/styles/dock-controls/{icon-button,touch-floor}.css`, `dist/styles/glass/material.css`, `dist/styles/tokens/{offsets-sizing,color-radius,dark-arm,light-dark}.css`, `dist/styles/utilities/a11y-overrides.css`; `reka-ui` `dist/HoverCard/{HoverCardTrigger,HoverCardContentImpl,utils}.js`, `dist/Tooltip/{TooltipTrigger,TooltipContentImpl}.js`; `lucide-vue-next/dist/esm/Icon.js`; the caller `VisualizationView.vue` + `composables/useViewState.ts`; `web/src/style.css`; `web/e2e/gallery.spec.ts`; glass-ui 7.0.0 `MIGRATION.md` §BI.W-DOCK-FOLD / §BI.W-OVERLAY-UNION + `src/components/dock/index.ts`.

**Tally — 21 defects (4 BLOCKER · 8 MAJOR · 7 MINOR · 2 INFO) · 4 superlatives.**

**Hitherto corpus folded, not re-invented.** `formation/fourier/{CENSUS-2026-08-03.md, lane-frontend.md, lane-crud.md}` and `audit/codex-provenance/intakes/lane-fourier-r3-r6.md`. Overlaps cited by row id in place; **one explicit contradiction** with the census is filed at §4 X-11.

---

## §1 — BLOCKERS

### D-1 · BLOCKER · five of seven controls have NO accessible name (WCAG 4.1.2, Level A)

`CanvasControlsDock.vue:46` is the **only** control carrying an accessible name (`aria-label="View options"`). The other six — the two popover toggles `:54`/`:59`, Publish `:71`, Equation `:77`, Edit `:87`, Fullscreen `:93` — are `<button>` hosts whose sole content is a lucide `<svg>`.

The name is provably empty, not merely undeclared:

- `lucide-vue-next/dist/esm/Icon.js` stamps `...!slots.default && !hasA11yProp(props) && { "aria-hidden": "true" }` — no default slot and no a11y prop is passed at any of the seven call sites, so **every glyph is `aria-hidden="true"`** and contributes nothing to name-from-content.
- The `<Tooltip>` shim (`ui/tooltip/Tooltip.vue:25-38`) renders reka `TooltipContent`. reka's `TooltipTrigger.js:88` sets **`aria-describedby`** (and only while `open`), and `TooltipContentImpl.js:134-136` adds a `VisuallyHidden role="tooltip"` mirror. `aria-describedby` is a **description**, not a name — and it is absent until hover/focus opens the tooltip.

Net: `Fullscreen` announces as "button", full stop.

**The design system already demonstrates the cure in the same barrel this file imports at `:7`.** Glass 4.0.0's own `DockBackgroundToggle` (compiled at `dist/dock.js`, `__name: "DockBackgroundToggle"`) renders `DockIconButton` with `aria-pressed` + `aria-label` + `title` + `aria-hidden="true"` on the glyph. So does the sibling in the same directory: `EditorControlsDock.vue:105,121,136`. So does `AnimationControls.vue:67,82,104`. **And the repo's own e2e spec states the law**: `web/e2e/gallery.spec.ts:111-113` — *"The dock's actions are keyed by aria-label (the dock idiom)"* — then can only locate `[aria-label="View options"]`, because it is the one that exists.

CanvasControlsDock is the outlier, in a feature folder where the idiom is otherwise universal.

**Falsifier.** Compute the accessible name for the button at `:93`. If any of {text content, `aria-label`, `aria-labelledby`, `title`, a non-`aria-hidden` `<svg><title>`} is non-empty, this row dies. Static evidence says all five are empty; a live axe/AOM read would settle it (**UNPROVEN-NEEDS-LIVE** only for the AOM readback, not for the source facts).

### D-2 · BLOCKER · the two view toggles are keyboard-unreachable AND touch-dead (WCAG 2.1.1, Level A)

`:44-65` puts the Image-overlay and Contour-trace toggles inside `<HoverPopover>`. glass 4.0.0's `HoverPopover` is **not** a popover — `dist/HoverPopover-Dpzwvc4t.js` imports `HoverCardContent / HoverCardPortal / HoverCardRoot / HoverCardTrigger` **from reka-ui** and composes them directly (the `native` interest-invoker branch is opt-in, default `false`, and is not passed here).

Two independent reka mechanisms make the content inoperable:

1. **Keyboard.** `reka-ui/dist/HoverCard/HoverCardContentImpl.js:138-140` — on mount it walks the content and does `tabbables.forEach((tabbable) => tabbable.setAttribute("tabindex", "-1"))`. Both `DockIconButton`s at `:54`/`:59` are `<button>` hosts, i.e. tabbable, i.e. **stripped from the tab order by construction**. A keyboard user can focus the trigger (which opens the card on `onFocus`) and then has no way to reach either toggle.
2. **Touch.** `HoverCardTrigger.js` binds exactly four handlers — `onPointerenter: excludeTouch(onOpen)`, `onPointerleave: excludeTouch(handleLeave)`, `onFocus: onOpen`, `onBlur: onClose`. There is **no click/pointerdown path**, and `HoverCard/utils.js:2-3` is `excludeTouch = (h) => (e) => e.pointerType === "touch" ? void 0 : h()`. A tap therefore cannot open the panel; the only remaining route is the incidental `focus` a tap may or may not deliver.

In non-editing mode this popover is the **only** surface exposing image-overlay and contour-trace (the direct buttons exist solely in `EditorControlsDock.vue`, mounted at `VisualizationView.vue:238` under `isEditing`). So on a phone in view mode, two documented features have no reachable affordance — on a route (`VisualizationView.vue:181-186`) that ships a dedicated mobile Controls/Canvas tab bar, i.e. mobile is a first-class target here.

**The producer names this exact defect and cures it at 5.0.0.** `glass-ui/MIGRATION.md:958-961` (§BI.W-OVERLAY-UNION): *"Coarse-pointer hover auto-promotes to tap-toggle (**reka's `excludeTouch` leaves the hover root structurally dead on touch**)."*

**Falsifier.** (a) Keyboard: Tab from the trigger; if focus lands on the Image-overlay button, the keyboard half dies. (b) Touch: emulate a coarse pointer and tap `[aria-label="View options"]`; if `[data-state="open"]` appears, the touch half dies. Both are source-proven; the **iOS-Safari-specific** nuance (Safari does not move focus to `<button>` on tap, so even the `onFocus` fallback is absent there) is **UNPROVEN-NEEDS-LIVE**.

### D-3 · BLOCKER · four toggle buttons carry no `aria-pressed`, though the substrate recipe already reads it

`:54`, `:59`, `:77`, `:87` express pressed state with a bare class: `:class="{ 'is-active': … }"`. No `aria-pressed`, no `role="switch"`, no `aria-current`. Screen-reader users get an unnamed (D-1) button whose on/off state is invisible.

This is not a cost trade — **the cure is a free attribute**, because glass already accepts it. `dist/styles/dock-controls/icon-button.css:109`:

```
&:is(.is-active, .active, [aria-expanded="true"], [aria-pressed="true"]) { … }
```

and again at `dist/styles/glass/material.css:231-234` and `dist/styles/dock-controls/touch-floor.css:64,82`. Adding `:aria-pressed="showEquation"` paints **identically** and repairs the semantics. The producer's own note at `touch-floor.css:56` calls these "the SHIPPED four-state hooks the dock-control family already activates (`.is-active`, `aria-current="page"`, `[aria-pressed="true"]`)" — the consumer picked the one member of that set that carries no semantics.

**Falsifier.** Swap `:class="{ 'is-active': showEquation }"` for `:aria-pressed="showEquation"` at `:77` and diff the computed style of the button. If the paint changes, the "free" claim dies (the row survives as a MAJOR either way).

### D-4 · BLOCKER · Publish has no busy state and no disable — the state coverage gap is a double-write

`:70-74` renders Publish with `:class="{ 'is-active': publishing }"` and a `.animate-pulse` glyph. It is **not** `:disabled`, and the handler it fires has no re-entrancy guard: `VisualizationView.vue:105-118` —

```
async function handlePublish() {
    if (!store.imageSlug || !store.contour) return;
    publishing.value = true;
    …
}
```

No `if (publishing.value) return`. Two clicks inside the network window run `store.createSnapshot()` and `gallery.publish()` **twice** — two snapshots, two gallery rows. The component already receives `publishing` as a prop (`:16`); it has every input needed to render the busy state as `disabled` + `aria-busy` and declines to.

Compounding, the busy state is expressed with the **pressed** vocabulary: `is-active` is the toggle-on register shared with Equation/Edit/overlay/ghost. A transient async state and a persistent boolean state are painted the same, so the dock's one visual vocabulary means two different things.

There is also no error state. On failure the parent raises a toast (`VisualizationView.vue:114-116`) and `publishing` simply flips false — the button returns to rest indistinguishable from success. Axis item "state coverage (empty/error/loading)": **absent, all three**.

**Falsifier.** Grep `handlePublish` for a re-entrancy guard, and the template for `:disabled`/`aria-busy` on `:71`. Both empty at HEAD. If the API is idempotent per `imageSlug`, the *consequence* softens but the missing state vocabulary stands.

---

## §2 — MAJOR

### D-5 · MAJOR · `h-4.5` overrides the library's density-scaled glyph chain — the "swimming glyph" glass cured at AX.W45 D15

Five glyphs are pinned with a Tailwind utility: `:47`, `:72`, `:78`, `:88` (`class="h-4.5 w-4.5"`, i.e. `calc(0.25rem × 4.5)` = **1.125rem**), plus `:94`.

Glass 4.0.0 **owns** dock glyph sizing:

- `dist/styles/dock-controls/icon-button.css:132-134` — `.dock-icon-button > svg { width: var(--dock-icon-glyph, 1.25rem); height: … }`
- `dist/styles/tokens/offsets-sizing.css:287` — `--dock-icon-glyph: calc(1.25rem * var(--dock-scale))`
- and the comment at `:284-286` states the contract verbatim: *"A consumer-passed explicit lucide size class still WINS (utility layer > component layer); this is a **DEFAULT, not a ceiling**."*

So the utility wins — and the cost is exactly the pathology AX.W45 D15 was written to kill (`icon-button.css:125-129`: *"so the glyph scales WITH the box … instead of **swimming at a fixed consumer size**"*). Run the numbers on the two real breakpoints:

| context | `--dock-scale` | control box | system glyph | this file's glyph | glyph : box |
|---|---|---|---|---|---|
| desktop, fine pointer (root 16px) | `1` | `max(2.5rem×1, 0)` = **40px** | `1.25rem` = 20px | `1.125rem` = **18px** | 0.45 vs system 0.50 |
| touch, coarse pointer (root 18px, `<768px`) | `1.5 × 0.78` = **1.17** | `max(2.5rem×1.17, 2.75rem)` = 2.925rem = **52.7px** | `1.25rem×1.17` = 1.4625rem = 26.3px | `1.125rem` = **20.3px** | **0.385** vs system 0.50 |

Derivations: `tokens/light-dark.css:19` (`@media (pointer: coarse) :root { --ui-scale: var(--ui-coarse-scale, 1.5) }`), `offsets-sizing.css:142,264` , `dock/overflow.css:224,237,250` (the coarse block **re-declares** `--dock-scale` *and* `--dock-icon-glyph` on `.glass-dock`), `dock/density.css:89-95` (comfortable rung, the GlassDock default — no `density` prop is passed at `:41`), and the app's own `html { font-size: 1.125rem }` below 768px (`web/src/style.css:40-50`).

On touch the plate grows 32% while the glyph is frozen — optical weight drops from half the plate to under two-fifths. That is the Aristotelian-proportion failure, and it is entirely token-decidable.

**Falsifier.** Delete `h-4.5 w-4.5` at `:47`,`:72`,`:78`,`:88`,`:94` and read the computed `<svg>` width in a coarse-pointer emulation. If it stays 1.125rem, the density chain does not reach the glyph and this row dies. (Source says it does: the re-resolution at `overflow.css:250` exists precisely so it does.)

### D-6 · MAJOR · `.dock-separator` is a hand-rolled shadow of a primitive shipped in the barrel this file already imports

`:67` and `:82` render `<div class="dock-separator" />` and `:106-112` re-authors the paint. But `DockSeparator` is **exported from `@mkbabb/glass-ui/dock` in the installed 4.0.0** (`dist/dock.d.ts` → `components/custom/dock/index.d.ts:9`; compiled at `dist/dock.js`, `__name: "DockSeparator"`) — the same specifier the file imports `GlassDock, DockIconButton` from at `:7`.

Four concrete divergences from the shipped rule (`dist/styles/dock/layer-group.css:35-41`):

| axis | glass 4.0.0 | this file `:106-112` | delta |
|---|---|---|---|
| height | `var(--dock-separator-height)` = `calc(var(--dock-h, var(--size-icon-btn)) × 0.5)` (`dock/shell.css:24`) | `1.5rem` hard | frozen against the density × `--dock-scale` cascade — the same freeze as D-5 |
| margin | `0 0.375rem` | `0 0.125rem` | **3× tighter**; the group gap no longer reads as a group boundary |
| tint | `var(--surface-tint-15)` | `color-mix(in srgb, var(--foreground) 20%, transparent)` | 15% → 20% = a **1.33× heavier** hairline than every other divider in the system |
| dark arm | `--surface-tint-15` re-bases on `hsl(48 12% 96%)` (`tokens/dark-arm.css:260`) | reads `--foreground` = `hsl(48 10% 90%)` (`dark-arm.css:60`) | misses the warm/brighter dark-arm re-base — dimmer ink at heavier alpha |
| flex | `@apply flex-shrink-0` | `flex-shrink: 0` | pure duplication |

The override is unconditional, not accidental: glass's rule sits in `@layer components` while a Vue `<style scoped>` block is **unlayered**, and unlayered normal author declarations outrank every layer. It also forfeits the primitive's semantics — the compiled `DockSeparator` emits `role="separator"` + `data-orientation` + `aria-orientation`; a bare `<div>` emits none. And glass's own docstring (`DockSeparator.vue.d.ts:5-8`) names the defect being reintroduced here: *"The raw `.dock-separator` class was **axis-blind** — a fixed VERTICAL 1px hairline that paints a useless 1px-wide sliver in a column dock."*

**Falsifier.** Replace both with `<DockSeparator />` (import from the existing `:7` specifier) and delete `:106-112`. If the rendered geometry, tint or dark-arm value is identical, the row dies. The token table above says it is not.

### D-7 · MAJOR · a tooltip-register panel is used as a two-item menu (substrate misuse)

`:44-65` puts a `flex flex-col` stack of two 40px buttons inside `HoverPopover`. Its substrate sheet is explicitly a one-line-label register — `dist/styles/hover-popover.css:14-33`:

```
.hover-popover-panel { display: inline-flex; align-items: center; gap: 0.375rem;
  padding-block: .375rem; padding-inline: .625rem; font-size: var(--type-small, .8125rem);
  line-height: 1.2; max-width: 16rem; … }
```

and the component docstring (`dist/hover-popover.d.ts:11-13`) — *"Default register: **a single line of label text**, sized for icon-button accompaniment."* A vertical control stack in an `align-items: center` inline-flex label chassis is off-register by construction.

Padding then stacks: the panel's `0.375rem / 0.625rem` plus the consumer's inner `p-1` (`:52`) = `0.625rem` block / `0.875rem` inline — two un-related, un-tokenized paddings composing a value neither author chose. The `gap-1` (0.25rem) between two 40px plates is likewise below the dock's own `--dock-layer-gap` (0.375rem at comfortable, `density.css:104-106`), so the same two controls are spaced *tighter* inside the popover than they would be in the dock.

**Falsifier.** Read the computed padding of `.hover-popover-panel > div` at runtime. If it is a single token value, the stacking claim dies; the register claim survives independently on the two docstrings.

### D-8 · MAJOR · `side="top"` can never paint, and the inner tooltips then stack back over the dock

`:44` declares `side="top"`. The dock is anchored at the **top** of the canvas stage — `VisualizationView.vue:450-453`: `.controls-dock-anchor { position:absolute; top:0.5rem; right:0.5rem; }`. With `HoverPopover` passing `"avoid-collisions": true` unconditionally (`HoverPopover-Dpzwvc4t.js`, the `HoverCardContent` binding) and a `collision-padding` default, there is never room above; reka flips to `bottom` on **every** open. The declared design intent is dead code — the surface always paints on the opposite side from the one authored.

Downstream: once flipped below the dock, the two inner `<Tooltip>`s at `:53`/`:58` default to `side: "top"` (`ui/tooltip/Tooltip.vue:31` — `:side="side ?? 'top'"`, and no `side` is passed at `:53`/`:58`), so their labels render **back up over the popover and the dock**. Three floating layers stacked over an 8px-tall gap, in the reverse of the intended reading order. Note the file gets this right everywhere else — `side="bottom"` at `:70`, `:76`, `:86`, `:92` — so the popover is the single inconsistent placement.

**Falsifier.** Open the popover and read `[data-side]` on the content. If it is `top`, the row dies. (**UNPROVEN-NEEDS-LIVE** for the exact flip; the geometry — 0.5rem of clearance vs a ≥2.5rem panel — is decidable from source.)

### D-9 · MAJOR · the collapsed summary advertises an action the expanded dock does not have

`:98-101` — `<template #collapsed>` always renders `Maximize2` + `Pencil`. But Edit is conditional: `:86` is `v-if="hasContour"`. The state is reachable, not hypothetical:

- the dock mounts on `hasData || (isEditing && store.contour)` (`VisualizationView.vue:210`);
- `hasData = store.epicycleData || store.basesData || store.computing` (`VisualizationView.vue:121`).

During compute-after-upload, `store.computing` is true while `store.contour` is still null → the dock mounts with `has-contour=false`. Collapsed, it promises a pencil; expanded, there is no pencil. The collapsed pill is the dock's *summary of itself* (glass renders it as the `dock-layer--summary` face, `dist/dock.js` GlassDock template) — a summary that overstates its own contents is a design contract break, and it is the state a first-time user meets first, since `:start-collapsed="true"`.

**Falsifier.** Mount with `:has-data="true" :has-contour="false" :is-editing="false"` and compare the collapsed glyph set to the expanded control set. If the pencil is suppressed, the row dies.

### D-10 · MAJOR · no loading / empty / error vocabulary anywhere in the dock

The axis names state coverage explicitly. This dock has one state: rest. Concretely:

- **Loading.** While `store.computing` is true, `hasData` is truthy (`VisualizationView.vue:121`) so Equation renders at `:76-80` and is fully pressable — but the panel it opens is `v-if="showEquation && store.epicycleData && !isEditing"` (`VisualizationView.vue:231`), and `epicycleData` is still null. The press flips a boolean and paints `is-active` on a button whose effect is invisible. A dead affordance in the busiest moment of the workflow. The parent *does* own a loading vocabulary elsewhere (`VisualizationView.vue:154-157`, a spinner + "Loading workspace…") — the dock inherits none of it.
- **Empty.** No control is ever disabled; the file emits `:disabled` zero times. `DockIconButton` supports it (glass paints `&:hover:not(:disabled)` / `&:active:not(:disabled)`, `icon-button.css:80,93`), so the vocabulary exists and is unused.
- **Error.** Covered at D-4.

**Falsifier.** Grep the file for `disabled`, `aria-busy`, `aria-disabled`, or any error/loading branch. All zero at HEAD.

### D-11 · MAJOR · the component's only script logic is inert at the primary breakpoint, and animates layout properties below it

`:29-37` is the whole `<script>` body beyond declarations: a `watch` on `dockRef.value?.expanded` emitting `update:expanded`. Trace its one consumer:

- `VisualizationView.vue:78` `const dockExpanded = ref(false)`; `:212` `v-model:expanded="dockExpanded"`; `:210` `:class="{ 'dock-centered': dockExpanded }"`. `grep -n dockExpanded` returns exactly those plus the comment at `:76-77` — **no other reader**.
- `.dock-centered` sets `left:50%; right:auto; transform:translateX(-50%)` (`VisualizationView.vue:461-465`) — and is then **cancelled outright at `@media (min-width: 1024px)`** (`:467-473`: `.controls-dock-anchor, .controls-dock-anchor.dock-centered { left:auto; right:0.5rem; transform:none; }`).

So on desktop — the primary target for a hover-expanding dock — the emit, the public `update:expanded` event in the component's API surface, and the parent's `dockExpanded` ref together produce **zero** visible effect. Below 1024px it produces a 300ms transition on `left` / `right` / `transform` (`:456-458`) — two of the three are **layout-triggering** properties, animated per-frame on a route hosting three canvases and a store rAF clock ([FE §6]). Composited `transform` alone would express the same motion.

**Explicitly refuted half (L-18).** I expected a `prefers-reduced-motion` gap here and there is none: glass ships a blanket bracket at `dist/styles/utilities/a11y-overrides.css:6-16` that forces `transition-property: opacity, color, background-color, border-color, box-shadow !important` on `*`. A layered `!important` outranks an unlayered scoped-style normal declaration, so `left`/`right`/`transform` are neutered under PRM. The reduced-motion claim **dies**; the inert-on-desktop and layout-property claims stand.

**Falsifier.** Widen past 1024px, hover the dock, and diff the anchor's bounding box. If it moves, the inert claim dies.

### D-12 · MAJOR · three hard F.W1 break rows in 132 lines (the uplift break surface, census [FE §5])

Every glass surface this file touches is retired or renamed at 5.0.0. Measured against the producer tree, not inferred:

| `:line` | today | 7.0.0 | authority |
|---|---|---|---|
| `:6` | `import { HoverPopover } from "@mkbabb/glass-ui/hover-popover"` | subpath **absent** from 7.0.0 `exports` (verified against `/Users/mkbabb/Programming/glass-ui/package.json`); fold to `<Popover trigger="hover">` from `./popover` | `MIGRATION.md:970,973` §BI.W-OVERLAY-UNION |
| `:7`,`:46`,`:54`,`:59`,`:71`,`:77`,`:87`,`:93` | `DockIconButton` ×7 call sites | **DEFINITION-ABSENT**; rename to `<DockControl>` (`shape="icon"` is the default, props identical) | `MIGRATION.md:925` §BI.W-DOCK-FOLD; `glass-ui/src/components/dock/index.ts` exports `DockControl`/`DockTrigger`, no `DockIconButton` |
| `:4` | `from "lucide-vue-next"` (7 symbols) | `@lucide/vue ^1.16.0` peer | census [FE §5], `×35` sites repo-wide |
| `:106-112` | the `.dock-separator` hand-roll | the raw class is what 7.0.0's `<DockSeparator>` explicitly supersedes | `glass-ui/src/components/dock/index.ts` ("component-over-class: the raw `.dock-separator` was axis-blind") |

Census cross-references, confirmed live: `grep -rn "glass-ui/hover-popover" web/src` → **2 files** (this one + `EditorControlsDock.vue`) = [FE §5]'s "hover-popover ×2", exact. `glass-ui/metric-badge` → **7 files** = census §2 **C-4**'s correction of [FE §3]'s "6 files", exact — C-4 is confirmed against the live tree here.

**The uplift also IMPROVES this file, materially:** the `<Popover>` union is where D-2 dies. `MIGRATION.md:955-963` — the union *"switches the reka ROOT internally (fine-hover → `HoverCardRoot`; **click/coarse-hover → `PopoverRoot`**) … Coarse-pointer hover auto-promotes to tap-toggle"*, and *"the trigger chooses the role; callers cannot create a hover dialog"* — i.e. after F.W1 the interactive-content-in-a-hover-card shape is **structurally unavailable**. `keepDockOpen` survives the fold as "ONE `watch(open)` serving both roots", so D-13's superlative carries across.

**Falsifier.** `node -e` a resolve of `@mkbabb/glass-ui/hover-popover` against 7.0.0's exports map; if it resolves, the first row dies. The key is absent from the 71-key export list I read.

---

## §3 — MINOR

**D-13 · MINOR · `:size="20"` at `:55`,`:60` is mechanically inert.** lucide maps `size` to `width`/`height` **presentation attributes** (`Icon.js`, `{ ...defaultAttributes, ...props, width: size, height: size }`), and presentation attributes sit below author CSS in the cascade. `.dock-icon-button > svg { width: var(--dock-icon-glyph, 1.25rem) }` (`icon-button.css:132-134`) therefore wins on both. The declaration reads as intent and expresses none. *Falsifier:* read the computed width of the `Spline` svg; if it is exactly 20px **and** `--dock-icon-glyph` is unset there, it was accidentally right, not effective.

**D-14 · MINOR · four unrelated glyph sizes in one 132-line component.** `1.125rem` (`h-4.5`, ×5: `:47,:72,:78,:88,:94`), the CSS-resolved `--dock-icon-glyph` (×2: `:55,:60` — portaled outside `.glass-dock`, so it resolves at the `:root` scale, a *third* value on touch), `1rem` (`h-4`, `:99`), `0.875rem` (`h-3.5`, `:100`). No ratio relates them (18 : 20 : 16 : 14) and none is a token. *Falsifier:* find a declared modular scale in `web/src/style.css` or glass's `tokens/` that contains all four — I found none.

**D-15 · MINOR · `.view-btn-wrap` (`:114-119`) is four dead declarations.** `position: relative` is already on `.dock-icon-button` via the `.glass-material` group (`dist/styles/glass/material.css:36-48` lists `.dock-icon-button` in the group whose body is `{ position: relative }`); `display: inline-flex`, `align-items: center`, `justify-content: center` are already on `.dock-icon-button` at `dist/styles/dock-controls/icon-button.css:15-18`. Every byte is redundant with the installed substrate. *Falsifier:* remove the block and diff the computed box of `:46`.

**D-16 · MINOR · the state dot paints *under* the substrate's specular, exactly when it is being read.** `.view-dot` (`:121-130`) is `position: absolute` with `z-index: auto`. The glass material's catch-light pseudo is `position: absolute; inset: 0; z-index: 1` (`glass/material.css:65-82`, whose selector list includes `.dock-icon-button::before` at `:75`), and its opacity is driven by `--specular-intensity` — `0` at rest (`material.css:96`, `:187`), lifted to `--glass-specular-intensity-hover` on hover (`:206`) and `…-active` on press (`:220`), applied as the layer `opacity` at `:114`. So on hover a warm-cream radial gleam composites **over** the 6px amber indicator. *Falsifier:* add `z-index: 2` to `.view-dot` and compare hover screenshots (**UNPROVEN-NEEDS-LIVE** for the visual magnitude; the stacking order is decidable from the two `z-index` values).

**D-17 · MINOR · the indicator is lit by default, so it indicates nothing on arrival — and its two members disagree about persistence.** `:48` shows the dot when `showImageOverlay || showGhost`. `useViewState.ts:19` initialises `showGhost = ref(true)` unconditionally, so the dot is **on for every fresh session**. Worse, the same file persists only three flags — `watch([isEditing, showImageOverlay, showEquation], …)` writing `{editing, overlay, equation}` (`:42-48`) — so `showGhost` is the **one** member of the group this dock presents as a unit that is neither restored nor saved. Image overlay survives a reload; Contour trace silently resets to on. A grouped affordance whose members have opposite persistence semantics is an incoherent group. *Falsifier:* toggle Contour trace off, reload, and read the state; if it persists, half the row dies (the default-lit half stands on `useViewState.ts:19` alone).

**D-18 · MINOR · label register is inconsistent across six labels.** Title Case: "Publish to Gallery" (`:70`). Sentence case verb phrases: "Image overlay" (`:53`), "Contour trace" (`:58`), "Edit contour" (`:86`), "View options" (`:46`). Bare state nouns: "Equation" (`:76`), "Fullscreen" (`:92`). Three registers, six labels. Separately, "Fullscreen" names a state where the neighbours name actions, and the emit is `toggleFullscreen` (`:21`, `:93`) while the caller only ever sets `showFullscreen = true` (`VisualizationView.vue:221`) — the verb promises a toggle the wiring does not implement. *Falsifier:* a project label-register rule that permits all three; `web/DESIGN.md` and `docs/precepts/` declare none I could find.

**D-19 · MINOR · authoring hygiene.** `:3-4` collapses a seven-symbol import onto one over-long line ending in a dangling `, }` — the only mangled statement in the file, and there is **no** `.prettierrc` / `.editorconfig` anywhere in the repo (`find -maxdepth 3` → empty), so nothing mechanically prevents it. Separately, `:19` declares a typed `emit` used once (`:36`), while all seven template emissions use the untyped-looking `$emit('…')` string form — two idioms for one contract inside 100 lines. *Falsifier:* run prettier at the repo's stated defaults; if `:3-4` is already canonical, the first half dies.

---

## §4 — INFO

**D-20 · INFO · the `.view-dot` halo clips under `contain: paint` at non-default density.** `.glass-dock` sets `contain: paint` (`dock/shell.css:96`, and it is a hard clip box). The dot sits at `top: -1px` with `box-shadow: 0 0 4px` (`:123,:129`), so its halo reaches ~5px above the button's border box. At the default `comfortable` density, `--dock-padding-block` is `0.375rem × --dock-scale` (`density.css:83-85`) = 6px at desktop root — 1px of slack. At `density="compact"` it is `0.25rem` (`density.css:29-31`) = 4px, and the halo clips. Latent only because `:41` passes no `density`. *Falsifier:* add `density="compact"` at `:41` and inspect the top edge of the dot's glow.

**D-21 · INFO · latent adjacent-separator.** With `!isEditing && !hasData && !hasContour`, `:67` and `:82` render back-to-back with nothing between them — a double rule enclosing an empty group. Unreachable from the sole caller, whose `v-if` guarantees `hasData` whenever `!isEditing` (`VisualizationView.vue:210`), so the component is not self-guarding rather than presently broken. *Falsifier:* mount standalone with all three false.

**X-11 · CENSUS CONTRADICTION (explicit, per the intake-lane discipline).** `CENSUS-2026-08-03.md` §3a, folding [FE §3], calls fourier "the deepest, cleanest consumer posture in the constellation" and books the three `components/ui/` files as "documented thin adapters, **keep**". The tree contradicts the *keep* on this seam: `ui/tooltip/Tooltip.vue` is what routes an icon-only dock control into a **description-only** (`aria-describedby`) mechanism with no naming leg — the proximate cause of D-1's blast radius across 35 callsites / 9 consumers (row **R3-7a**, CARRY → F.W3). The adapter is not neutral; it is the surface that lets a nameless control look labelled to the author. **Recommendation: R3-7a's F.W3 migration should be re-scoped from "re-point the import" to "re-point the import *and* mint a naming leg"** (glass 4.0.0's own `DockBackgroundToggle` already ships the pattern: `aria-label` + `title` + `aria-pressed`). I do **not** contradict the "deep and idiomatic adoption" verdict — §5 S-4 upholds it.

---

## §5 — SUPERLATIVES (L-18, same burden of proof)

**S-1 · `keep-dock-open` at `:44` is the exact contract glass minted for this case, correctly opted into.** `dist/hover-popover.d.ts:56-66` (J.W3.B) — *"when mounted inside a `<GlassDock>`, hold the parent dock open while this popover is visible … The dock's collapse timer is **ref-counted** so multiple keep-open holds compose cleanly."* The compiled implementation confirms it: `HoverPopover-Dpzwvc4t.js` `watch(open, e => keepDockOpen && (e ? ctx?.keepOpen() : ctx?.release()))` plus the `data-glass-dock-portal` / `data-glass-dock-owner` stamps that teach the dock's click-away handler to treat the portaled panel as inside. The consumer used the seam instead of hand-rolling a timer suppressor. *Falsifier:* drop the prop; the dock's 2s idle timer (`collapseDelay` default 2000, `useDockShellProps` `e.collapseDelay ?? 2e3`) collapses the dock out from under an open popover.

**S-2 · `:start-collapsed="true"` at `:41` is LOAD-BEARING, not redundant boilerplate — and it defends against a producer boolean-trap.** The prop reads "default true" in `useDockShellProps.d.ts:106-110`, which invites a reviewer to delete it. It must not be deleted. `dist/dock.js` declares `startCollapsed: { type: Boolean }` with **no `default`**, so Vue coerces an absent boolean prop to `false`; the resolver is `startCollapsed: computed(() => alwaysExpanded ? false : e.startCollapsed ?? true)` — and `false ?? true` is **`false`**. The documented default never fires. GlassDock's mount hook is `onMounted(() => (alwaysExpanded || !startCollapsed) && expand())`, so omitting the prop mounts the dock **expanded**. This one explicit binding is the only thing keeping the canvas overlay from booting as a full control row over the artwork. *Falsifier:* delete `:start-collapsed="true"` and observe the mount state — if it still starts collapsed, my reading of the coercion is wrong.

**S-3 · the W2.E in-band coupling is the correct Vue 3.5 direction-of-data repair, and it is documented in place.** `:31-37` replaces an out-of-band `defineExpose(dockExpanded)` the parent reached into with a typed `"update:expanded": [value: boolean]` emit (`:26`), consumed as `v-model:expanded` (`VisualizationView.vue:212`) — with the rationale written at the seam, and the counterpart note left in the parent (`VisualizationView.vue:75-77`). Parent-reaches-into-child is a real coupling defect and this is its textbook cure; the `?? false` at `:36` correctly normalises the `undefined` the optional chain yields before the ref resolves. *Falsifier:* find a surviving `defineExpose` or a parent template-ref read of the dock — there is none. (That the *consumer* of the signal is breakpoint-limited is D-11's finding against `VisualizationView`, not against this pattern.)

**S-4 · zero substrate leakage.** Every primitive is a glass subpath (`:5` routes through the project's own adapter barrel, `:6`, `:7`); there is **no direct `reka-ui` import**, no shadcn copy, no bespoke button. The only local CSS is 25 lines, and D-6/D-15 are its entire indictment — i.e. the failure mode here is *re-authoring* substrate the consumer already had, never *bypassing* it. This is a clean instance of the census's [FE §3] / §3a headline, upheld against the tree. *Falsifier:* `grep -n "reka-ui\|@/components/ui/button" CanvasControlsDock.vue` → empty.

---

## §6 — CANDIDATE DEFECTS KILLED BY THEIR OWN FALSIFIERS (recorded so they are not re-derived)

1. **`animate-pulse` ungated under `prefers-reduced-motion`** (`:72`). **REFUTED.** glass ships a blanket bracket — `dist/styles/utilities/a11y-overrides.css:6-10`: `@media (prefers-reduced-motion: reduce) { *:not([data-allow-motion]) { animation-duration: .01ms !important; animation-iteration-count: 1 !important } }`, with `[data-allow-motion]` explicitly overridden at `:26-30` (*"accessibility is absolute"*). The consumer inherits the gate for free. This also kills the reduced-motion half of D-11.
2. **The dock itself unusable on touch.** **REFUTED.** `GlassDock` binds `onTouchstart` / `onTouchmove` / `onTouchend` on the shell and an `onClickCollapsed` handler on the summary face (`dist/dock.js`, GlassDock template), so tap-to-expand works. The touch defect is confined to the `HoverPopover` child (D-2) — do not over-claim it against the dock.
3. **Non-active dock layer reachable by keyboard while collapsed.** **REFUTED.** GlassDock stamps `inert` on the inactive layer (`dist/dock.js`, `inert: !expanded || void 0` on `.dock-layer--full`), and `DockLayer` mirrors `inert` + `aria-hidden` + `tabindex`. The collapsed decorative glyphs at `:99-100` cannot be tabbed into. Substrate credit, not consumer credit — but the consumer inherits it correctly by not fighting it.

---

*Read-only. No product source in any repo was modified. The only file written by this lane is this one.*
