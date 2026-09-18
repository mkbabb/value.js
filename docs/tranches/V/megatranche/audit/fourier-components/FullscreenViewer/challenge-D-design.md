claude-opus-5[1m] (served model id)

# CHALLENGE · `FullscreenViewer.vue` · axis **D — DESIGN**

**Subject** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/visualization/FullscreenViewer.vue` (245 lines).
**Substrate** fourier HEAD `cd26c65`, branch `m/w1-bump-migration`, 28 dirty paths — the exact tree
F.W0 opens on (adjudicated **R4-9**, `lane-fourier-r3-r6.md:107`). Installed glass-ui **4.0.0**;
producer latest **7.0.0**.
**Mode** static + source-derived, read-only. No browser tooling. No product source touched in any
repo. Sole write = this file.
**Posture** the component is assumed DEFECTIVE until the tree proves otherwise; every claim below —
defect and superlative alike (L-18 runs both ways) — carries severity, `file:line` provenance, and
the falsifier that would kill it.

---

## §0 — VERDICT

`FullscreenViewer` is a **hand-rolled modal layer that declines the design system's modal
contract**. It re-implements — partially and at higher CSS specificity — four things glass-ui
already owns: the dismissable-layer stack, the focus/dialog semantics, the control-size token
clamp, and the button chrome. Three of those re-implementations are not merely redundant; they are
**wrong in the direction that matters**, and one of them (§1 D-1) silently deletes every overlay
affordance inside the fullscreen surface.

The component's *intent* is good and in several places superlative (§4): it is the only bespoke
overlay in the tree with a focus trap, its motion is property-named and easing-tokenized with
written provenance, and it correctly retired a cross-component CSS-var contract for a typed prop.
The defects are almost all of one kind: **an opaque, root-level, hand-numbered layer built beside
the design system instead of on top of it.**

- **23 defects · 5 BLOCKER · 8 MAJOR · 10 MINOR/INFO**
- **5 superlatives**
- **1 census amendment**: the glass 4→7 break surface is missing its single largest row — the
  `Button` `variant`/`size` → `emphasis`/`iconOnly` rename (§5). `./button` is the most-imported
  subpath in the tree (35 occurrences, `lane-frontend.md:213`) and `CENSUS-2026-08-03.md:186`'s
  cure list does not name it.

---

## §1 — BLOCKERS

### D-1 · BLOCKER · Every portaled overlay opened inside fullscreen paints **behind** the backdrop

`.fs-backdrop` is `position: fixed; z-index: var(--z-fullscreen)` with an **opaque**
`background: var(--background)` (`FullscreenViewer.vue:148-153`), teleported to `body`
(`:105`). glass-ui's z-scale (`node_modules/@mkbabb/glass-ui/dist/styles/tokens/scheme-motion.css:342-347`):

```
--z-hovercard: 120;  --z-tooltip: 120;  --z-popover: 130;
--z-modal:     140;  --z-fullscreen: 150;  --z-toast: 160;
```

Every overlay the fullscreen transport renders is **also** teleported to `body` and sits on a
*lower* rung:

| overlay inside fullscreen | class | z | provenance |
|---|---|---:|---|
| `DropdownMenuContent` ("More options" menu) | `dropdown-menu-content z-popover …` | 130 | `dist/dropdown-menu-BJ7E9js_.js` (content string) · used at `AnimationControls.vue:109` |
| `TooltipContent` (×4 in the transport) | `z-tooltip …` | 120 | `dist/TooltipProvider-B3MkB_8P.js` · `AnimationControls.vue:66,81,94,105` |
| `SelectContent` (SpeedSelect) | `z-popover` | 130 | `dist/SelectScrollDownButton-C1jb3b3K.js` · `SpeedSelect.vue` via `AnimationControls.vue:96,117` |

Portal target is `body` by default — `node_modules/reka-ui/dist/Teleport/Teleport.js:8-12`
(`to: { default: "body" }`); glass-ui's `DropdownMenuContent` wraps its content in
`DropdownMenuPortal` with no `to` override (`dist/dropdown-menu-BJ7E9js_.js`, `DropdownMenuPortal as T`).
Backdrop and menu are therefore **sibling children of `<body>` in the root stacking context**:
130 < 150, backdrop is opaque ⇒ the menu is invisible.

Contrast the inline path, which is correct by accident: `VisualizationView.vue:417`
`.controls-overlay { z-index: var(--z-controls) }` = **20**, comfortably under 120/130. The defect
is created solely by FullscreenViewer's choice of rung. Note also `--z-toast: 160` > 150, so toasts
*do* surface over fullscreen — the scale was designed with an above-fullscreen band; the popover
band simply was not consulted.

**Failure scenario.** Enter fullscreen → hover the play button (tooltip renders, invisible) → click
the ⋮ trigger (menu opens, keyboard-focusable and screen-reader-reachable, visually absent) → the
user tabs into and interacts with a menu they cannot see, or concludes the control is broken. Speed
and easing are unreachable in fullscreen.

**Falsifier.** Dead if (a) reka's portal defaulted anywhere but `body`, (b) `.fs-backdrop` did not
create a root-level stacking context, or (c) glass-ui elevated dock-owned portals above
`--z-fullscreen`. (c) was checked directly: `data-glass-dock-portal` / `data-glass-dock-owner` are
emitted by the content (`dist/dropdown-menu-BJ7E9js_.js`) but have **zero CSS consumers** —
`grep -rn "data-glass-dock-portal" dist/styles/` → empty; the attribute feeds
`dock/composables/isTeleportedTarget` (collapse suppression), not z-order.
*Visual confirmation is UNPROVEN-NEEDS-LIVE (SS-13); the z-arithmetic is fully source-derived.*

### D-2 · BLOCKER · The layer has dialog behaviour and **no dialog semantics**

`grep -c "aria-\|role=\|inert\|scrollLock" FullscreenViewer.vue` → **0**. The component takes over
the viewport, traps Tab (`:48-68`), closes on Escape (`:93-95`), saves and restores focus
(`:72,82`) — every behavioural signature of a modal dialog — while emitting:

- no `role="dialog"` on `.fs-container` (`:108`, which carries only `tabindex="-1"`);
- no `aria-modal="true"`;
- no accessible name (`aria-label` / `aria-labelledby`) for the layer;
- no `inert` / `aria-hidden` on the backgrounded app;
- no scroll lock — the document behind keeps scrolling under the fixed layer.

The house primitive supplies all of this: `node_modules/reka-ui/dist/Dialog/DialogContentImpl.js:77`
→ `role: "dialog"`, and `DismissableLayer/DismissableLayer.js:78-90` manages
`body.style.pointerEvents` across the layer set. glass-ui re-exports it (`./dialog`, and at 7.0.0
additionally `./drawer` + `./surface`, per `lane-frontend.md:458-460`), and this very repo uses it
correctly at `ExportModal.vue:11` and `GalleryCardModal.vue:5`.

**Failure scenario.** A screen-reader user activates "Fullscreen". Nothing is announced — no dialog
boundary, no name. The virtual cursor still walks the entire backgrounded application (Tab is
trapped, the SR virtual cursor is not), reading a document that is visually gone. There is no
announced way out; Escape is undiscoverable and the only visible control is unnamed (D-3).

**Falsifier.** Dead if any ancestor supplied the semantics. It does not: the layer is `Teleport
to="body"` (`:105`), so its only ancestor is `<body>`; `App.vue` wraps `TooltipProvider` +
`RouterView`, neither of which annotates a teleported sibling.

### D-3 · BLOCKER · The sole dismiss control has **no accessible name**

```vue
<Button variant="glass" size="icon" class="fs-close" @click="emit('close')">
    <Minimize2 class="h-5 w-5" />
</Button>
```
`FullscreenViewer.vue:110-112`. `lucide-vue-next` renders a bare `<svg>` with no `<title>`; glass-ui's
`Button` forwards `data-slot`/`data-variant`/`data-size` and the cva class string only — it injects
no label (`dist/button-BNDWhAZb.js`, setup returns `Primitive` with `as`/`as-child`/`data-*`/`class`).
Accessible name = **empty**. Announced as "button".

This is an *omission*, not a house style — the same subtree proves the idiom in both directions:
`AnimationControls.vue:67,82` bind `:aria-label="anim.playing ? 'Pause animation' : 'Play animation'"`;
`AnimationControls.vue:104` `<DockDropdownTrigger aria-label="More options">`;
`CanvasControlsDock.vue:46` `aria-label="View options"` — and `e2e/gallery.spec.ts:111-115`
*asserts* on `[aria-label="View options"]`, calling aria-label "the dock idiom".

Worse, the producer's 7.0.0 `Button` names the exact contract being violated:
`/Users/mkbabb/Programming/glass-ui/src/components/button/Button.vue:25` —
`/** Square geometry for an accessibly named icon command. */ iconOnly?: boolean;`.

Symmetric omission worth booking with it: the *entry* affordance is unnamed too —
`CanvasControlsDock.vue:92-96` `<DockIconButton>` with a `Tooltip text="Fullscreen"` wrapper. A
reka tooltip contributes `aria-describedby` (a description), never the accessible name.

**Failure scenario.** SR user in fullscreen tabs to the only control in the layer and hears
"button". WCAG 4.1.2 (Name, Role, Value) failure on the only exit.

**Falsifier.** Dead if `Minimize2` emitted a `<title>`/`aria-label`, or if glass-ui's `Button`
derived a name from `size="icon"`. Neither: `dist/button-BNDWhAZb.js` has no `aria-` emission in
its `setup`, and lucide's Vue components render `<svg>` + `<path>` only.

### D-4 · BLOCKER · Hard-coded `2.5rem` defeats `size="icon"` and breaks the library's own WCAG-2.5.5 touch clamp

```css
.fs-close { … width: 2.5rem; height: 2.5rem; … }   /* :185-186 */
```
`size="icon"` compiles to `h-(--control-h-md) w-(--control-h-md)` (`dist/button-BNDWhAZb.js`,
size map). The token (`dist/styles/tokens/offsets-sizing.css:151`):

```css
--control-h-md: max(calc(2.5rem * var(--ui-scale)), var(--control-floor));
```

and the coarse-pointer block (`dist/styles/tokens/light-dark.css:17-21`):

```css
@media (pointer: coarse) { :root {
    --ui-scale: var(--ui-coarse-scale, 1.5);
    --control-floor: var(--touch-target, 2.75rem);   /* 44px, :461 */
} }
```

⇒ on **every touch device**, `--control-h-md` = `max(3.75rem, 2.75rem)` = **3.75rem / 60px**. The
scoped rule `.fs-close[data-v-…]` (specificity 0,2,0) beats the Tailwind utility
`.w-\(--control-h-md\)` (0,1,0), so the close button stays pinned at **40px** while every other icon
control in the app grows to 60px. The token file states the intent verbatim
(`offsets-sizing.css:130-131,146-148`): *"the WCAG-2.5.5 44px touch floor survives as a
`max(…, --control-floor)` clamp … a consumer dialing `--ui-scale` below 1 still cannot drop a
control under the target."* This component drops it — by hard-coding past the clamp rather than
through it.

**Failure scenario.** Phone, landscape, fullscreen viewer. The only exit is a 40 × 40 px target
(under the 44 px AAA floor the library enforces everywhere else) sitting 12 px from the corner
(see D-11), rendered at ⅔ the size of every other control the user has learned in this app. Missed
taps hit the canvas hover/click handler (`BasisCanvas.vue:519-523`) instead.

**Falsifier.** Dead if `--ui-scale`/`--control-floor` were overridden back to 1/0 by fourier. They
are not: `grep -rn "\-\-ui-scale\|--control-floor" web/src/` → no hits; `style.css:1-3` imports
`@mkbabb/glass-ui/styles` whole and never re-declares them. Also dead if the scoped rule lost
specificity — it does not (0,2,0 vs 0,1,0, and the SFC block is injected after the library sheet).
Desktop is unaffected (`--ui-scale: 1`, `--control-floor: 0px` ⇒ token resolves to exactly 2.5rem),
which is precisely why this has survived undetected in a chromium-desktop-only e2e project
(`playwright.config.ts:48`, one project — `lane-frontend.md:32`).

### D-5 · BLOCKER · The 4→7 uplift breaks this component's only glass import — an **uncensused** break-surface row

`FullscreenViewer.vue:110` `<Button variant="glass" size="icon">`. At the producer
(`/Users/mkbabb/Programming/glass-ui/src/components/button/Button.vue:15-30`):

```ts
export type ButtonEmphasis = "primary" | "secondary" | "quiet" | "text";
export type ButtonSize = Extract<Size, "xs" | "sm" | "md" | "lg">;
export interface ButtonProps extends PrimitiveProps {
    emphasis?: ButtonEmphasis;  tone?: Tone;  size?: ButtonSize;
    iconOnly?: boolean;  loading?: boolean;  …
}
```

- **`variant` is definition-absent at 7.0.0** — replaced by `emphasis` (+ orthogonal `tone`).
- **`size="icon"` is a typed-union violation** — `ButtonSize` excludes `"icon"`; the 4.0.0 size map
  (`dist/button-BNDWhAZb.js`) shipped `default|xs|sm|lg|icon|icon-sm`, the 7.0.0 union does not. The
  7.0.0 spelling is `size="md" iconOnly`.

This is the same *class* of break the census books as P1 for `ToastVariant`
(`CENSUS-2026-08-03.md:256-259`, "hard typecheck break") — but at far larger scale, and it appears
in **no** break-surface row: `CENSUS-2026-08-03.md:184-186` lists only `metric-badge ×7 files,
hover-card/-popover ×4, dock members ×3, ToastVariant`; `lane-frontend.md:468-482`'s "Rows that hit
fourier-analysis TODAY" table likewise omits `./button` entirely, even though its own subpath census
(`lane-frontend.md:213`) records `./button` as the **most-imported subpath, 35 occurrences**.

Tree-wide budget measured now: **37 files contain `<Button`; 27 `variant=` bindings; 38 `size="icon"`
occurrences** (`grep -rn "<Button" src/ | grep -c "variant="` → 27; `grep -rn 'size="icon"' src/ | wc -l` → 38;
`grep -rln "<Button" src/ | wc -l` → 37).

**Failure scenario.** F.W1 lands the tri-package transaction; `vue-tsc -b` (the only compile gate —
vitest is ABSENT, `lane-frontend.md:48`) fails on 38 `size="icon"` sites before it ever reaches the
4 rows the census budgeted, and the 27 `variant=` bindings degrade to inert DOM attributes wherever
typecheck is bypassed.

**Falsifier.** Dead if 7.0.0 kept a `variant` alias or an `"icon"` size. `Button.vue:15-30` is the
whole prop surface and `index.ts` re-exports exactly `Button`/`ButtonProps`/`ButtonEmphasis`/`ButtonSize` —
no alias, no compat shim (consistent with the house no-backwards-compat law).

---

## §2 — MAJOR

### D-6 · MAJOR · The focus trap **fights** the portaled menus it shares a layer with

`:60` and `:64` both branch on `!containerRef.value?.contains(active)`. A reka-portaled
`DropdownMenuContent` is a child of `<body>`, **not** of `.fs-container`. So while the ⋮ menu is
open, every `Tab` / `Shift+Tab` inside the menu satisfies "active is outside the container",
`preventDefault()` fires, and focus is yanked to `first` (the close button) or `last`.

**Failure scenario.** Keyboard user in fullscreen opens the ⋮ menu, presses Tab to reach "Export" —
focus jumps to the close button instead; the menu (which is invisible anyway, D-1) is now
unreachable by keyboard. Composed with D-1 the transport's secondary controls are inaccessible by
*both* modalities.

**Falsifier.** Dead if reka rendered menu content in-place. It does not — `DropdownMenuPortal` +
`Teleport.js:8-12` default `to: "body"`. Dead also if the trap consulted `event.composedPath()` or a
layer registry; it consults only `containerRef.contains` (`:60,64`).

### D-7 · MAJOR · One `Escape` dismisses **two** layers

`onKeydown` (`:91-98`) is a `document`-level listener registered at mount (`:100`) and closes
fullscreen on `Escape` **unconditionally**, with no `event.defaultPrevented` check and no
participation in any layer stack. reka's dismissable layer listens on `window`
(`DismissableLayer.js:72-77`, VueUse `onKeyStroke("Escape", …)`, default target `window`) and guards
only on `index.value === layers.value.size - 1` — a registry FullscreenViewer never joins, and it
neither `stopPropagation()`s nor `preventDefault()`s.

Bubble order is `target → … → document → window`, so **FullscreenViewer's handler always runs
first**, and both handlers run.

**Failure scenario.** Open the ⋮ menu in fullscreen, press Escape to dismiss just the menu — the
fullscreen viewer closes too, discarding the viewing context. Unrecoverable without re-entering.

**Falsifier.** Dead if reka used capture-phase or `stopPropagation`. `DismissableLayer.js:72` is
plain `onKeyStroke("Escape", cb)` with no options object and no propagation control. Dead also if
`document` came after `window` in the bubble path — it does not.

### D-8 · MAJOR · No `prefers-reduced-motion` gate on a **full-viewport** scale transition

`.fs-enter-active` / `.fs-enter-from` (`:231-244`) animate `opacity` **and** `transform: scale(0.95)`
across the entire viewport, over 0.25 s / 0.3 s. `grep -c "prefers-reduced-motion" FullscreenViewer.vue`
→ **0**.

The repo demonstrably knows the idiom: 8 `@media (prefers-reduced-motion: reduce)` blocks across
`ConvergencePlot.vue:405`, `DarkModeToggle.vue:104`, `CollapsibleSection.vue:66`,
**`AnimationControls.vue:178`** (this component's own child), `ContourSettings.vue:370`,
`GalleryCard.vue:304`, `GalleryMarquee.vue:126-129`, `style.css:92`
(`lane-frontend.md:619`), one of which cites the provenance verbatim: *"D.W4.c —
prefers-reduced-motion guard. WCAG 2.3.3 / A3 #9 finding."* A viewport-filling zoom is the exact
vestibular trigger WCAG 2.3.3 addresses, and it is the **largest** motion surface in the tree — the
one file that skipped the guard is the one where it matters most.

Compounding (already booked upstream, restated for this surface): entering fullscreen registers a
second visible canvas into the animation store's reference-counted gate
(`stores/animation.ts:95-103`), and that rAF clock is itself PRM-ungated
(`lane-frontend.md:624` "COVERAGE GAP"). So the fullscreen entry both zooms *and* guarantees an
uncapped autoplay animation under `reduce`.

**Falsifier.** Dead if a global `reduce` rule zeroed transitions. `style.css:92`'s block is scoped to
the tab-panel entry animation (`:79-97`), not global; glass-ui's `view-transition.css` zeroes
`::view-transition-*` only, which this Vue `<Transition>` is not.

### D-9 · MAJOR · Hand-rolled hover/press chrome **overrides** the glass tokens it sits on

At 4.0.0 the `glass` variant already ships the full interaction chrome
(`dist/button-BNDWhAZb.js`):

```
glass: "glass-wash btn-glass text-foreground
        hover:bg-(--glass-bg-resting) hover:border-(--glass-border-resting)
        active:bg-(--glass-bg-floating) active:border-(--glass-border-floating) …"
```
plus base `active:scale-(--scale-press-btn)` and `tap-squish`. The component overrides all of it at
higher specificity (`:198-206`):

```css
.fs-close:hover  { background: color-mix(in srgb, var(--background) 90%, transparent);
                   border-color: color-mix(in srgb, var(--foreground) 25%, transparent);
                   transform: scale(1.05); }
.fs-close:active { transform: scale(0.95); }
```

- `--glass-bg-resting` / `--glass-border-resting` → replaced by two ad-hoc `color-mix()` literals
  that exist nowhere else in either tree.
- `--scale-press-btn` = `--scale-press-sm` = **0.97** (`dist/styles/tokens/scale-paper.css:40-41`)
  → replaced by **0.95**: this one button presses deeper than every other button in the product.
- `--scale-hover-btn` = **1.05** (`scale-paper.css:24`) → *duplicated as a literal* `scale(1.05)`,
  the same value re-typed rather than referenced, so a future token retune silently skips this site.

This violates the standing house law (glass-ui is the design system; style at the root, not
per-instance) and is exactly the "carry" pattern `lane-frontend.md:384,602-604` books as an
upstream-coordination debt (`cartoon-card`, `--viz-amber`) — except undocumented and unrelayed.

**Falsifier.** Dead if the 4.0.0 `glass` variant shipped no hover/active chrome. It ships both, quoted
above. Dead also if the scoped rules lost the cascade — they do not (0,2,0/0,3,0 vs 0,2,0 utilities,
later injection).

### D-10 · MAJOR · The click-outside dismissal is **structurally unreachable**

`:107` `<div v-if="show" class="fs-backdrop" @click.self="emit('close')">` — but its only child
`.fs-container` is `width: 100%; height: 100%` (`:155-161`) inside a `position: fixed; inset: 0`
parent (`:148-150`). The backdrop exposes **zero** hit area of its own, so `.self` can never match.
Additionally the backdrop is *opaque* (`background: var(--background)`, `:152`) — there is no
"outside" to click, visually or geometrically.

**Failure scenario.** Dead affordance that reads as intent: a maintainer adding a margin/padding to
`.fs-container` would silently switch on an untested dismissal path; a reader reasonably concludes
click-outside-to-close works and it never has.

**Falsifier.** Dead if `.fs-container` had margin/inset/max-width leaving exposed backdrop. It has
none (`:155-161` is the whole rule).

### D-11 · MAJOR · No safe-area insets on the one layer where the body's inset no longer applies

`style.css:25` applies `padding-bottom: env(safe-area-inset-bottom)` to the app shell — so the repo
knows and uses the idiom. But `.fs-backdrop` is `Teleport`ed to `body` (`:105`) and `position: fixed`,
so it **escapes that padding entirely**, and neither of its two affordances re-declares it:

- `.fs-close` — `top: 0.75rem; right: 0.75rem` (`:179-180`), no `env(safe-area-inset-top/right)`;
- `.fs-controls` — `bottom: 0; padding: 0 1rem 0.75rem` (`:209,214`), no `env(safe-area-inset-bottom)`.

**Failure scenario.** iPhone, fullscreen: the transport dock's lower edge sits 12 px above the
viewport bottom — i.e. **under the home indicator** — and in landscape the close button collides with
the notch/Dynamic-Island cutout, the exact corner it occupies. Composed with D-4 (40 px target) this
is the worst combination on the most likely device for a fullscreen viewer.

**Falsifier.** Dead if a `viewport-fit=cover`-less viewport meta made `env()` moot, or if glass-ui's
`GlassDock` self-applied the inset. `index.html`'s viewport tag and the dock's own inset handling
are the check — the dock's `--dock-pos` is host-supplied here (`.fs-controls` sets `bottom: 0`
directly), so no inset reaches it. *Device rendering is UNPROVEN-NEEDS-LIVE (SS-13); the absence of
`env()` in the fixed layer is source-certain.*

### D-12 · MAJOR · `max-width="60rem"` is arithmetically a **no-op** — and the comment that explains it is false

```vue
<AnimationControls … max-width="60rem" … />   <!-- :135 -->
```
```css
/* Wider controls in fullscreen are now driven by the AnimationControls
   `max-width` prop (see template), replacing the former
   `--animation-dock-max-width` CSS-var contract. */              /* :225-227 */
```

- `AnimationControls`' default is `maxWidth: "960px"` (`AnimationControls.vue:25`).
- fourier sets `html { font-size: 1.125rem }` below 768 px and `1rem` at ≥768 px
  (`style.css:40-50`).
- ⇒ at every desktop width, `60rem` = 60 × 16 px = **960px** — byte-for-byte the default the
  inline instance already gets (`VisualizationView.vue:236` passes no `maxWidth`).
- Below 768 px, `60rem` = 1080 px, but the dock is clamped by
  `min(var(--animation-dock-max-width, 960px), calc(100dvw - 1rem))` (`AnimationControls.vue:135`),
  so any viewport under 1081 px is viewport-bound regardless.

The fullscreen transport is therefore **never wider than the inline transport**, at any viewport.
Git confirms the value was carried forward verbatim (`git log -S"--animation-dock-max-width"` →
`+ --animation-dock-max-width: 60rem;` in the pre-refactor `.fs-controls`), so this is not a
refactor regression — it is a documented intent the arithmetic has never delivered, now restated in
prose that asserts it does.

**Failure scenario.** The proportional promise of fullscreen — a 100 dvw stage deserving a wider
transport — is unfulfilled: on a 2560 px display, a 960 px dock floats in 1600 px of empty backdrop,
identical to its appearance in a 1200 px inline stage. Aristotelian proportion failure: the control
band does not scale with its frame.

**Falsifier.** Dead if the root font-size were >16 px at ≥768 px (`style.css:45-49` says otherwise),
or if `AnimationControls`' default were smaller than 960px (`:25` says it is exactly 960px).

### D-13 · MAJOR · Focus restoration is unguarded and can dump the user at `<body>`

```js
} else { show.value = false; lastFocused?.focus?.(); lastFocused = null; }   /* :79-84 */
```
No `isConnected` check, no fallback, no `nextTick`. `lastFocused` is captured at `:72` as
`document.activeElement` — in the only live entry path that is the `DockIconButton` at
`CanvasControlsDock.vue:93`, which lives inside a `GlassDock` whose collapsed/expanded content is
slot-swapped (`AnimationControls.vue:65-76` shows the `#collapsed` slot idiom;
`VisualizationView.vue:210-211` binds `v-model:expanded`). `HTMLElement.focus()` on a disconnected
node is a spec no-op leaving `document.activeElement === body`.

**Failure scenario.** Keyboard user opens fullscreen from the dock; the dock collapses behind the
layer; Escape closes fullscreen; the restore silently no-ops and focus resets to document start —
the user re-traverses the whole page to get back. Additionally, `lastFocused?.focus?.()` fires
*before* the leave transition removes the layer (`:87-89` `@after-leave` is empty), so focus moves
while the trap's element tree is still mounted.

**Falsifier.** Dead if `GlassDock` keeps both slot trees mounted (CSS-collapsed rather than
`v-if`-swapped), in which case the element stays connected and merely invisible — still a defect
(focus lands on a hidden control) but a lesser one. *The mount/unmount half is
UNPROVEN-NEEDS-LIVE (SS-13); the missing `isConnected` guard and missing fallback are source-certain.*

---

## §3 — MINOR / INFO

### D-14 · MINOR · A reachable state renders the wrong instrument with **no** transport and no messaging

`:115` `v-if="isEditing && contour"` / `:121` `v-else` / `:130` `v-if="!isEditing"`. The parent passes
`:contour="store.contour ?? undefined"` (`VisualizationView.vue:283`) — so `isEditing && !contour`
is representable. In that state the layer renders **`BasisCanvas`** (the epicycle instrument, via
`v-else`) *while* suppressing `.fs-controls` (because `!isEditing` is false): a fullscreen canvas with
no timeline, no play control, no speed — only the unnamed close button. **Falsifier:** dead if the
parent guarded `isEditing` on `store.contour`; it does not (`VisualizationView.vue:203,238` gate
*siblings* on `store.contour`, but `isEditing` itself is a free ref toggled at `:220`).

### D-15 · MINOR · Zero empty / error / loading state; the only "empty" affordance has no text alternative

The layer's entire content is a bare `<canvas>` (`BasisCanvas.vue:519-523`) with no `role`,
no `aria-label`, and no fallback content between the tags. The no-data path is painted *inside* the
canvas (`BasisCanvas.vue:85-96` → `drawPlaceholder`), invisible to assistive tech and to text search.
There is no error state at all (no `<canvas>` context-loss handling, no fetch-failure surface) and no
loading state (`store.computing` is consulted in the inline path — `VisualizationView.vue:273` — and
nowhere here). **Falsifier:** dead if `BasisCanvas` emitted a DOM-level empty state; `:517-527` is the
whole template — one wrapper div, one canvas.

### D-16 · MINOR · The two corners of one layer keep **different** margin rhythms

`.fs-close` is fixed at `0.75rem` at every viewport (`:179-180`), while `.fs-controls` steps
`0 1rem 0.75rem` → `0 2rem 1rem` at ≥640 px (`:214, 219-223`). At ≥640 px the top-right affordance
sits 12 px from the edge while the bottom band sits 16 px from it and 32 px from the sides — three
different insets on one full-bleed surface, none of them derived from a shared scale.
Aristotelian proportion: the frame has no single margin module. **Falsifier:** dead if a shared
spacing token drove both — neither rule references one.

### D-17 · MINOR · Durations sit **off** the token ladder while the easings are tokenized

`:190-196` and `:231-236` hard-code `0.15s`, `0.2s`, `0.25s`, `0.3s`. glass-ui's ladder
(`dist/styles/tokens/scheme-motion.css:66-68`) is `--duration-instant: 0.1s` /
`--duration-fast: 0.2s` / `--duration-normal: 0.3s`. So `0.2s` and `0.3s` are *literal duplicates*
of tokens, and `0.15s`/`0.25s` are **between rungs** — values the motion scale does not contain. The
inline provenance comments (`:190`, `:230`) claim the A.W3.d cure ("named properties + canonical
token"); only the easing half was done. **Falsifier:** dead if the durations were intentionally
off-ladder with a written rationale — the comments claim the opposite.

### D-18 · MINOR · `calc(var(--z-fullscreen) + 10)` manufactures an unnamed rung that collides with `--z-toast`

`:181` and `:213` both compute **160** — numerically identical to `--z-toast: 160`
(`scheme-motion.css:347`). Inside `.fs-backdrop`'s own stacking context (positioned + `z-index: 150`)
any positive value orders identically, so the arithmetic buys nothing while inventing a rung the
scale does not name. **Falsifier:** dead if `.fs-backdrop` did not create a stacking context — it
does (`position: fixed` + `z-index: 150`, `:149-151`).

### D-19 · MINOR · `:deep()` reach-ins couple this file to two children's private class names

`:163-175` styles `.canvas-container` and `.editor-shell` from outside. Both exist today
(`BasisCanvas.vue:521,531`; `ContourEditorCanvas.vue:231,285`) — verified, so these are not dead
selectors — but they are private implementation names with no contract, invisible to `vue-tsc`, and
they include a hover reset (`:172-175`) whose target rule lives in a different file. The correct
shape is a `bare`/`chromeless` prop on the children. **Falsifier:** dead if either class were part of
a documented API — neither is exported, propped, or documented.

### D-20 · INFO · `variant="glass"` declares a distinction the installed token map does not make

At 4.0.0 the `glass` variant string is **byte-identical** to `default`
(`dist/button-BNDWhAZb.js`: both `"glass-wash btn-glass text-foreground hover:bg-(--glass-bg-resting)
hover:border-(--glass-border-resting) active:bg-(--glass-bg-floating)
active:border-(--glass-border-floating) aria-pressed:bg-[…]"`). The explicit prop communicates a
choice the pinned library does not honour differentially. Harmless today; at 7.0.0 it is a hard break
(D-5). **Falsifier:** dead if the two variant strings differed — they are character-for-character equal.

### D-21 · INFO · Dead handler + a comment that states the opposite of the code

```js
function onAfterLeave() { /* Nothing needed — the teleport stays in DOM but invisible */ }  /* :87-89 */
```
Wired at `:106` `@after-leave="onAfterLeave"`. `v-if="show"` (`:107`) **removes** the subtree on
leave — the teleport does *not* stay in the DOM. An empty handler plus a false explanatory comment is
worse than neither: a reader budgeting for a persistent-DOM layer (memory, IntersectionObserver
lifetime, canvas retention) is misled. **Falsifier:** dead if `v-show` were used instead of `v-if` —
`:107` is `v-if`.

### D-22 · INFO · Autofocus targets the dismiss control

`:75-78` focuses `els[0]`, which by DOM order is the close button (`:110`, first focusable in
`.fs-container`). Entering a viewer announces "close" first. The container itself is already
`tabindex="-1"` (`:108`) and is the conventional dialog autofocus target — it is used only as the
fallback. **Falsifier:** dead if the close button were not first in DOM order — it is (`:110` precedes
the canvases at `:115/:121` and the transport at `:130`).

### D-23 · INFO · Zero automated coverage of the fullscreen layer

`grep -rn "fullscreen\|Fullscreen" e2e/` → one *comment* (`gallery.spec.ts:113`); no spec opens the
viewer. The tree's only frontend gates are `vue-tsc -b` and 29 Playwright tests on a **single
chromium** project (`lane-frontend.md:31-32,48`), and vitest is ABSENT — so D-4 (coarse-pointer only),
D-1 (visual z-order), D-8 (PRM) and D-11 (safe-area) are all in the blind spot of every gate that
exists. This is census risk #10 (`CENSUS-2026-08-03.md:256-259`) landing on a concrete surface.
**Falsifier:** dead if any of the 8 specs exercised the viewer — none reference it.

---

## §4 — SUPERLATIVES (L-18, the other direction)

### S-1 · The focus trap exists at all — and handles the degenerate case

`:30-68`. Most bespoke overlays in most trees have none. This one saves the opener (`:72`), restores
it (`:82`), scopes the query to the Teleport target (`:41-43`), filters on visibility (`:44`), wraps
both directions (`:59-67`), and — rare — handles **zero focusables** by preventing the Tab and
focusing the container (`:51-55`) rather than letting focus escape. The 8-line comment block
(`:30-34`) states the threat model and the no-new-dependency constraint. The trap's *scope* is wrong
(D-6) but its construction is careful, and the intent-recording is exemplary.

### S-2 · Motion hygiene: named properties, canonical easings, written provenance

`:190-196` and `:230-236`. No `transition: all` anywhere; four explicitly named properties; both
easings drawn from tokens (`--ease-standard` → `cubic-bezier(0.4,0,0.2,1)`, `--ease-out-expo` →
`cubic-bezier(0.16,1,0.3,1)`, `dist/styles/tokens/scheme-motion.css`), each with an inline `A.W3.d`
citation naming the wave that replaced the raw bezier. This is the discipline most files in most
trees skip. (The duration half remains off-ladder, D-17.)

### S-3 · Deliberate enter/leave asymmetry

Enter `0.25s` opacity + `0.3s` `--ease-out-expo` transform; leave `0.2s` + `0.2s` `--ease-standard`
(`:231-236`). Dismissal is faster than entry and drops the expressive easing — the correct, and
frequently missed, reading of "arrival is an event, departure is a chore". The two enter durations
also differ deliberately (opacity settles 50 ms before the scale), which reads as a considered
overlap rather than a copy-paste.

### S-4 · The CSS-var contract → typed prop migration is the right direction

`:135` + `:225-227` + `AnimationControls.vue:18-25`. A cross-component `--animation-dock-max-width`
CSS-var contract — invisible to `vue-tsc`, undiscoverable by grep-from-the-consumer, breakable in
silence — was replaced by a typed, defaulted, TSDoc'd prop, and the removed mechanism is recorded in
the comment so the next reader can find the history. The *value* is a no-op (D-12); the *mechanism*
is exactly what the constellation's contract-v2 posture wants.

### S-5 · The fullscreen chrome-stripping is a genuine design judgment

`:163-175` neutralizes the children's card affordances — `border`, `border-radius`, `box-shadow`, and
the hover border — because a card frame is meaningless when the surface *is* the viewport, and adds
`flex: 1; min-height: 0` so the canvas fills correctly under the column. That is the right call, and
the `:hover` reset (`:172-175`) shows someone actually chased the residual affordance rather than
stopping at the resting state. The coupling mechanism is the defect (D-19), not the intent.

---

## §5 — CENSUS AMENDMENT (the break-surface row that is missing)

`CENSUS-2026-08-03.md:184-186` (F.W1 scope) and `lane-frontend.md:468-482` ("Rows that hit
fourier-analysis TODAY") both enumerate the 4→7 cure list as:
`metric-badge ×7 files · hover-card/-popover ×4 · dock members ×3 · ToastVariant · lucide rename ×35 · pencil-boil`.

**`./button` is absent from that list**, despite being the tree's most-imported subpath
(`lane-frontend.md:213`: 35 occurrences — more than the next four subpaths combined). Measured now
against the live tree:

| row | 4.0.0 (installed) | 7.0.0 (producer) | sites |
|---|---|---|---|
| `Button` `variant=` | cva variant, 13 keys incl. `glass` (`dist/button-BNDWhAZb.js`) | **definition-absent** → `emphasis` + `tone` (`glass-ui/src/components/button/Button.vue:20-22`) | **27** bindings |
| `Button` `size="icon"` / `"icon-sm"` | size map keys (`dist/button-BNDWhAZb.js`) | **outside `ButtonSize`** (`Button.vue:16` = `xs\|sm\|md\|lg`) → `iconOnly` | **38** occurrences |
| `Button` files | — | — | **37** files |

Both are hard `vue-tsc` breaks of the same class the census books at P1 for `ToastVariant`, at
~10× the site count. **F.W1's budget is understated by 27 + 38 edit sites across 37 files.**
This component (`:110`) carries one of each.

Corroborating carries, folded not re-invented:
- **R3-11 / X-6** (`lane-fourier-r3-r6.md:85,157`): `FullscreenViewer.vue:105` is one of exactly two
  live `<Teleport>` sites — confirmed against this read. That Teleport-to-`body` is the *mechanism*
  of D-1 and D-6: the census recorded the fact; this challenge supplies its consequence.
- **C-4** (`CENSUS-2026-08-03.md:63-65`): `metric-badge` is 7 **files**, one of which
  (`AnimationControls.vue:10`) renders *inside* this component's `.fs-controls` — so the fullscreen
  surface is transitively on the break surface even though its own import list is clean.
- **FE §8 / CENSUS §3a** (`lane-frontend.md:624`): the PRM-ungated rAF clocks. Entering fullscreen
  is the act that registers a second visible canvas into that gate (`stores/animation.ts:95-103`) —
  D-8 is this surface's half of that carry.
- **CENSUS §5 risk 10** (`:256-259`): "uplift lands with no unit-test net" — D-23 is the concrete
  instance.

No contradiction with the corpus was found on this component. The corpus is silent on every finding
in §1–§4 except the Teleport fact; §5 is the one place it is **incomplete** rather than wrong.

---

## §6 — METHOD AND LIMITS

- Read whole, read-only: the component; its 3 SFC imports (`BasisCanvas.vue`,
  `ContourEditorCanvas.vue`, `AnimationControls.vue`) and their template/style surfaces; its sole
  consumer (`VisualizationView.vue`); `CanvasControlsDock.vue` (the entry affordance);
  `web/src/style.css`; the installed `@mkbabb/glass-ui@4.0.0` dist (`button-BNDWhAZb.js`,
  `dropdown-menu-BJ7E9js_.js`, `TooltipProvider-B3MkB_8P.js`, `styles/tokens/*`); the installed
  `reka-ui` (`Teleport/Teleport.js`, `DismissableLayer/DismissableLayer.js`,
  `Dialog/DialogContentImpl.js`); and the producer `glass-ui@7.0.0`
  `src/components/button/Button.vue` + `index.ts`.
- Probes: `grep`, `sed`, `wc`, `node -e` over dist bundles, `git log -S`. **No browser tooling.**
- Three claims carry live-only halves, marked in place: **D-1** (visual occlusion — the z-arithmetic
  is source-certain, the paint order is not observed), **D-11** (device safe-area rendering), **D-13**
  (whether the dock trigger is unmounted or merely hidden on collapse). All three are stated so that
  their source-certain half stands alone.
- No product source was modified in `fourier-analysis`, `value.js`, or `glass-ui`. The only write is
  this file.

---

## §7 — TALLY

| severity | ids | count |
|---|---|---:|
| **BLOCKER** | D-1 D-2 D-3 D-4 D-5 | **5** |
| **MAJOR** | D-6 D-7 D-8 D-9 D-10 D-11 D-12 D-13 | **8** |
| **MINOR** | D-14 D-15 D-16 D-17 D-18 D-19 | **6** |
| **INFO** | D-20 D-21 D-22 D-23 | **4** |
| **defects total** | | **23** |
| **SUPERLATIVE** | S-1 S-2 S-3 S-4 S-5 | **5** |

**Routing.** D-5 → **F.W1** (uplift break surface, census amendment §5). D-1 D-2 D-3 D-4 D-6 D-7
D-8 D-9 D-10 D-11 D-13 D-16 D-17 D-18 D-19 D-20 D-22 → **F.W4** (per-component D/L/C audit on the
uplifted tree). D-12 D-14 D-15 D-21 → **F.W4** (prose + state coverage). D-23 → **F.W4**'s
unit-test-floor decision (census §4 item 5).

**The one-line reading.** Every blocker on this component dissolves into the same prescription:
*stop hand-building the modal and mount the fullscreen stage inside glass-ui's dialog/surface
primitive* — which supplies `role="dialog"`, the layer stack that makes Escape and z-order correct,
the portal-aware focus containment, and the control-size clamp, all four of which this file
re-implements incorrectly beside it.
