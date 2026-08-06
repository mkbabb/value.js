served model id: `claude-opus-5[1m]`

# CHALLENGE · `FullscreenViewer.vue` · axis **C — CONSUMPTION**

**Target** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/visualization/FullscreenViewer.vue` (245 lines)
**Substrate** fourier HEAD `cd26c65` (matches census X-4); pins value.js `^0.13.0`/inst 0.13.0 · keyframes `^4.3.0`/inst 4.3.0 · glass-ui `^4.0.0`/inst 4.0.0 (`web/package.json:19-30`)
**Method** static + source-derived only. No browser. Read whole: the target, `BasisCanvas.vue` (547), `ContourEditorCanvas.vue` (340), `AnimationControls.vue` (224), `lib/types.ts` (391), plus the second-hop consumption surface actually reached (`lib/colors.ts`, `lib/api.ts`, `stores/animation.ts`, `stores/workspace.ts`, `VisualizationView.vue`) and the installed producer trees (`node_modules/@mkbabb/glass-ui@4.0.0`, `node_modules/reka-ui@2.9.10`).
**Posture** the component is assumed DEFECTIVE until the tree proves otherwise. Every row carries a falsifier and every row was run against its falsifier before it was written.

**Tally — 18 defects (2 BLOCKER · 7 MAJOR · 9 MINOR) · 3 INFO · 4 SUPERLATIVE.**

---

## §0 · Hitherto corpus — folded, not re-invented

| corpus row | what it said | what this challenge does with it |
|---|---|---|
| **R3-11 / X-6** (`intakes/lane-fourier-r3-r6.md:85,157`) | exactly two `<Teleport>` in `web/src`: `PaperSearchModal.vue:41` and `FullscreenViewer.vue:105`; the instance registry duplicated the former and omitted the latter | **CONFIRMED live** — `FullscreenViewer.vue:105` is `<Teleport to="body">`, still the only one in this file. **B-1 is the substantive consequence of that Teleport** the registry never modelled: teleporting to `body` puts this layer into the root stacking context alongside every glass-ui portal, where the z-tier arithmetic decides who paints. The registry defect (carried to F.W4) and this defect are the same fact seen from two sides. |
| **X-3** (`:159`) | API surface = **45 total / 30 public-non-admin / 13 admin** | Adopted as the denominator. This component's transitive reach is **1 of 45** — see i-3. |
| **R6-8** (`:142`) | operation records embedding derived `clients: […]` back-references make a defect non-attributable to one side of the seam | **Checked and NOT present here** — the one operation reached is built by a pure URL builder, not an `apiFetch` client leaf, so no operation record carries a back-reference to mutate. Recorded as i-3 so the negative is on the board. |
| **CENSUS `:174`, `:187-188`** | "colour parsing today is a 117-line hand-rolled regex file (`web/src/lib/colors.ts`, no `oklch()` arm)"; F.W2 deletes the hand-rolled arms | **CONTRADICTED IN DEGREE, not in fact.** The census files this as a migration *chore*. The tree says it is a live rendering defect **today at the pinned versions**: glass-ui 4.0.0 already ships `--viz-fourier/chebyshev/legendre` as `oklch()`, so the regex already fails and already returns `#888888`. See **M-6**. |
| **CENSUS `:38`** | value.js live surface = 5 statements / 4 files / 6 symbols, easing-only, all bare-root specifiers | **CONFIRMED and extended**: this component is in **none** of the 4 files. Its value.js consumption is zero, its migration cost under F.W2 is zero, and that is the correct posture — see i-1 / S-2. |
| **lane-frontend `:492`** | glass 4→7 ∧ keyframes 4.3→6 ∧ value 0.13→4.0 is ONE atomic transaction | Bears on M-4/m-4 only insofar as this file consumes exactly one glass-ui symbol (`Button`, `:3`) and zero of the other two packages: it is a near-zero-cost passenger on that transaction. |
| **lane-frontend §"cartoon-card is a local resurrection shim"** | `style.css:106-117` re-declares `@utility cartoon-card`; 25 consumers; outstanding upstream carry | Cited in **m-5**: this file `:deep()`-strips that shim's chrome from two children. |

---

## §1 · BLOCKERS

### B-1 · BLOCKER · every glass-ui portal tier paints **behind** this layer's opaque backdrop; the fullscreen dock's only menu is unreachable

**Provenance**
- `FullscreenViewer.vue:105` `<Teleport to="body">` → the layer is a direct child of `<body>`, i.e. the root stacking context.
- `FullscreenViewer.vue:148-153` `.fs-backdrop { position: fixed; inset: 0; z-index: var(--z-fullscreen); background: var(--background); }`
- `glass-ui/dist/styles/tokens/scheme-motion.css:341-346` → `--z-overlay: 50` · `--z-hovercard: 120` · `--z-tooltip: 120` · `--z-popover: 130` · `--z-modal: 140` · `--z-fullscreen: 150`
- `glass-ui/dist/styles/tokens/color-radius.css:57` → `--background: var(--neutral-0)` — **opaque**, no alpha channel.
- `glass-ui/dist/dropdown-menu-BJ7E9js_.js` · `DropdownMenuContent` renders inside `DropdownMenuPortal` with class string `"dropdown-menu-content **z-popover** min-w-32 max-h-[60vh] … glass-floating …"`.
- `glass-ui/dist/styles/theme/bridges.css:244` → `--z-index-popover: var(--z-popover)` (the Tailwind-v4 bridge that makes `.z-popover` = `z-index: 130`).
- `reka-ui/dist/Teleport/Teleport.js` props → `to: { default: "body" }`; `reka-ui/dist/Menu/MenuPortal.js` forwards `to` **undefined** → the menu lands on `body` too.
- Consumer chain inside the layer: `FullscreenViewer.vue:131-139` mounts `AnimationControls`, whose `DropdownMenu` (`AnimationControls.vue:103-125`) is the **sole** route to **Export**, **Easing**, and — below `sm` — **Speed** (`AnimationControls.vue:115-123`).

**The defect.** Both `.fs-backdrop` (z 150) and the teleported `DropdownMenuContent` (z 130) are positioned children of `<body>`. Painting order in the root stacking context is by z-index, not DOM order, so the opaque backdrop paints **over** the menu. In fullscreen the "More options" menu opens, takes focus, traps the pointer — and is invisible. Export, Easing and mobile Speed are dead. `Tooltip` (z-tooltip 120, `glass-ui/dist/TooltipProvider-B3MkB_8P.js`) and `SelectContent` (z-popover, `glass-ui/dist/SelectScrollDownButton-C1jb3b3K.js`, reached by `SpeedSelect.vue:9`) are dead by the same arithmetic — that is every floating affordance the fullscreen dock has.

**Falsifiers, all run**
1. *"reka portals into the layer, not `body`."* — Falsified: `Teleport.js` default `to: "body"`; `MenuPortal.js` passes no override; glass-ui's `DropdownMenuContent` sets no `to`.
2. *"`.z-popover` is never emitted, so `z-index` is `auto` and DOM order wins."* — **The finding survives this branch.** `.z-popover` is absent from `glass-ui.css` (checked: 0 hits for `.z-popover{` / `.z-tooltip{` / `.z-modal{`), but `glass-ui/dist/styles/index.css:222` `@source "../*.js"` reaches `dist/*.js`, which is exactly where those class strings live, so the consumer's Tailwind build **does** emit it. And even if it did not: an element with `z-index: auto` paints in the z=0 layer, still **below** a positive-z sibling. Either branch → occluded.
3. *"the backdrop is translucent, so the menu shows through."* — Falsified: `--background: var(--neutral-0)`, opaque.
4. *"reka bumps z-index at runtime."* — Falsified: `grep -rl zIndex node_modules/reka-ui/dist/DismissableLayer/ node_modules/reka-ui/dist/Menu/` → empty.
5. *"`calc(var(--z-fullscreen) + 10)` on `.fs-controls` (`:213`) lifts the dock above it."* — Falsified, and it is a red herring: `.fs-backdrop` is positioned with a non-`auto` z-index and therefore **creates a stacking context**, so `.fs-controls`'s 160 is local to that context and cannot compete in the root context at all.

**Independent cheap check for the reviewer (and a widening of scope).** The same arithmetic says `SelectContent` (130) nested inside `DialogContent` (`glass-ui/dist/DialogContent-DDE6pQBU.js` → `z-modal` = 140) is occluded app-wide — `AdminUserList.vue:12,19` and `GallerySearchBar.vue:5,12` ship exactly that composition. If those render correctly in a live browser, this row needs re-derivation; if they do not, the defect is a **glass-ui token-tier law** (portal tiers are not re-based per nesting level) and this component is one instance of it. **CARRY → glass-ui BH inbox** per the standing relay edict. Marked **UNPROVEN-NEEDS-LIVE for SS-13** on the pixel; **CONFIRMED-static** on the arithmetic.

---

### B-2 · BLOCKER · fullscreen editing is a write-only dead end — edits are made against an orphan instance and silently discarded

**Provenance**
- `FullscreenViewer.vue:115-120` mounts a **second** `ContourEditorCanvas` with **no `ref`**, **no `@state-change`**, **no `@save`**.
- `FullscreenViewer.vue:20-24` — the emits contract is `close | toggleGhost | toggleImageOverlay`. There is no editor pass-through, so the child's `stateChange` (`ContourEditorCanvas.vue:25`) evaporates.
- `FullscreenViewer.vue:130` — `<div v-if="!isEditing" class="fs-controls">`. In editing mode the layer renders **zero** controls: no undo/redo, no smooth/simplify, no delete, no reset, no save. `EditorControlsDock` is never imported here (contrast `VisualizationView.vue:20,238-248`).
- `ContourEditorCanvas.vue:217-227` `defineExpose({ undo, redo, applySmooth, applySimplify, deleteSelected, resetToExtraction, getPoints, points, magnetRadius })` — the entire tool surface is expose-only, so with no `ref` it is unreachable.
- `VisualizationView.vue:203-207` keeps the **inline** editor mounted whenever `store.contour` exists — hidden by a **class** (`:class="{ 'is-hidden': !isEditing }"` → `opacity: 0`, `VisualizationView.vue:404-409`), **not** by `v-if`. `ref="editorRef"` binds to that one.
- `VisualizationView.vue:92-96` `onEditorSave()` reads `editorRef.value.getPoints()` → the **inline** instance.
- `ContourEditorCanvas.vue:209-215` each instance registers a **global** `window` `keydown` listener.

**The defect.** Opening fullscreen while editing produces two live editors over the same `ContourAsset`. Both answer Delete/Backspace/⌘Z/⌘⇧Z globally (`ContourEditorCanvas.vue:164-177`), so keyboard edits fork into two independent `points` arrays; the first pointer-drag in either instance diverges them for good. The user sees and manipulates the fullscreen one; `onEditorSave` persists the inline one. **Every edit made in fullscreen is discarded on save**, and there is no save affordance in fullscreen anyway.

**Falsifiers, all run**
1. *"the inline editor is unmounted while fullscreen is open."* — Falsified: `VisualizationView.vue:203` gates on `store.contour`, never on `showFullscreen`; the hide is a CSS opacity class.
2. *"`ContourEditorCanvas` scopes its keydown to its own root."* — Falsified: `window.addEventListener` at `:210`, no root check in `onKeyDown` (`:164`).
3. *"FullscreenViewer forwards a ref or re-emits editor state."* — Falsified: no `ref` at `:115-120`, no editor emits at `:20-24`.
4. *"the editing branch is unreachable from fullscreen."* — Falsified: `CanvasControlsDock` emits both `toggleEdit` and `toggleFullscreen` (`CanvasControlsDock.vue:21`, template `:91-95`), wired independently at `VisualizationView.vue:220-221`; `isEditing` is passed straight through at `:283`.

---

## §2 · MAJOR

### M-1 · MAJOR · click-outside-to-close is dead code

`FullscreenViewer.vue:107` `@click.self="emit('close')"` on `.fs-backdrop`; `:108` `.fs-container` is the backdrop's only child and `:155-161` gives it `width: 100%; height: 100%`. The container therefore covers the backdrop exactly, so `event.target` is never `.fs-backdrop` and `.self` never fires. The affordance the markup advertises does not exist.
**Falsifier** — a margin/padding/inset/`max-width` on `.fs-container` leaving exposed backdrop, or a backdrop `padding`. Neither exists (`:148-161`); `.fs-container` has no box-model offsets at all.

### M-2 · MAJOR · the hand-rolled focus trap fights every glass-ui portal it contains

`FullscreenViewer.vue:48-68`. `onTrapKeydown` forces focus back inside `containerRef` on **any** Tab where `!containerRef.value?.contains(active)` (`:60`, `:64`). Every glass-ui floating primitive this layer contains teleports to `body` — outside `containerRef`: `DropdownMenuContent` (`AnimationControls.vue:109`), `SelectContent` (`SpeedSelect.vue:39`), `TooltipContent` (`ui/tooltip/Tooltip.vue:30`). So the moment focus enters an open menu or select, the next Tab is `preventDefault()`ed and yanked back to the close button, breaking the primitive's own roving-focus contract.
**Falsifier** — reka rendering these in place (falsified in B-1), or the trap consulting `[data-reka-*]` / `aria-controls` / an `aria-owns` chain to admit logical descendants. It does neither; the containment test is purely DOM-physical (`:60`, `:64`).
**Note** this is presently *masked* by B-1 (you cannot see the menu to focus it) but is an independent defect that survives B-1's fix — fixing the z-tier without fixing the trap converts an invisible menu into a visible unusable one.

### M-3 · MAJOR · re-implements the `Dialog` primitive the design system ships and this repo already consumes at 5 sites — and every hand-roll bug above lives in the re-implementation

`FullscreenViewer.vue:104-144` hand-builds a modal layer: Teleport, transition, backdrop, focus trap (`:35-68`), autofocus (`:75-78`), focus restore (`:82`), Escape (`:93-95`). The repo already imports `@mkbabb/glass-ui/dialog` at `ExportModal.vue:11`, `GalleryView.vue:22`, `GalleryCardModal.vue:5`, `AdminFlaggedPanel.vue:11`, `AdminUserList.vue:12`.
What the hand-roll is missing against the primitive, each independently checkable in this file: **no `role="dialog"`** and **no `aria-modal`** (`:108` is a bare `tabindex="-1"` div) → assistive tech announces nothing on open; **no accessible name** (no `aria-label`/`aria-labelledby` anywhere in the file); **no `inert`/`aria-hidden` on the background** → the whole app behind the layer stays in the accessibility tree and in the AT reading order even though it is visually replaced; **no body scroll lock** (no `overflow`/`position` write to `document.body` anywhere in the file) → the page behind scrolls under the fixed layer.
**Falsifier** — that glass-ui 4.0.0 ships no usable dialog: falsified, `DialogContent-DDE6pQBU.js` exists and is consumed 5× in-tree. The one genuine obstacle is that `DialogContent` sits at `--z-modal: 140`, below `--z-fullscreen: 150` — which is the *same* B-1 tier problem and reinforces that the correct remedy is a token/tier decision at the glass-ui seam, not a bespoke layer per consumer. Whether an edge-to-edge fullscreen preset exists on the 4.0.0 `Dialog` is **UNPROVEN-NEEDS-LIVE**; the four missing semantics above are **CONFIRMED-static**.

### M-4 · MAJOR · the `max-width` prop is inert in every reachable viewport, and the comment asserting otherwise is false

- `FullscreenViewer.vue:135` `max-width="60rem"`.
- `FullscreenViewer.vue:225-227` — *"Wider controls in fullscreen are now driven by the AnimationControls `max-width` prop … replacing the former `--animation-dock-max-width` CSS-var contract."*
- `AnimationControls.vue:25` default `maxWidth: "960px"`; `:62` `:style="{ '--animation-dock-max-width': maxWidth }"` — the prop is delivered as **the same CSS variable** the comment claims was retired; `:135` `width: min(var(--animation-dock-max-width, 960px), calc(100dvw - 1rem))`.
- `style.css:44-48` — `html { font-size: 1.125rem }`, dropping to `1rem` at `min-width: 768px`.

At ≥768px root is `1rem` → `60rem === 960px ===` the default: fullscreen and inline docks are byte-identical widths. Below 768px root is `1.125rem` → `60rem = 1080px`, but the viewport is <768px so `min(…, calc(100dvw - 1rem))` clamps both arms to the same value. **There is no viewport at which the override does anything.** The stated behaviour ("wider controls in fullscreen") never occurs, and two comments in two files assert it.
**Falsifier** — a viewport ≥960px with root font >1rem. Impossible: the only root-font rule raises it *below* 768px (`style.css:44-48`), and there is no other `html { font-size }` in `web/src`.
**Provenance of the regression** — `git log -S "animation-dock-max-width" -- web/src/components/visualization/FullscreenViewer.vue` → single commit `ffba307`, which removed `--animation-dock-max-width: 60rem;` from `.fs-controls`. The value was carried across verbatim, so the migration was faithful and the *original* contract was already inert. The defect is that a dead contract was ceremonially migrated instead of deleted, and a false claim was written at both ends.

### M-5 · MAJOR · opening fullscreen **doubles** per-frame canvas work; the invariant both source comments assert is unattainable by the chosen mechanism

**Provenance**
- `BasisCanvas.vue:425-431` — *"Park the shared animation clock when this canvas is scrolled out of the viewport **or hidden behind the fullscreen layer**"*.
- `stores/animation.ts:34-42` — same claim, verbatim: *"burns CPU/GPU/battery while scrolled off-screen **or hidden behind the fullscreen layer**"*.
- Mechanism: `BasisCanvas.vue:442-451` `new IntersectionObserver(…, { threshold: 0 })` observing `containerRef`, feeding `anim.setCanvasVisible` (`stores/animation.ts:99-106`, a reference count).
- `VisualizationView.vue:199` mounts the inline `BasisCanvas` with no `showFullscreen` gate; `FullscreenViewer.vue:121-127` mounts a second one.
- Each instance carries its own 60fps render watcher: `BasisCanvas.vue:418-423` on `[anim.t, anim.easedT, showGhost, showImageOverlay]`.

**The defect.** `IntersectionObserver` reports **geometric intersection with the root**, never occlusion. The fullscreen layer is `position: fixed` and does not move the underlying layout, so the inline `BasisCanvas` remains fully within the viewport and reports `isIntersecting: true` for the entire fullscreen session. It therefore keeps its visibility credit **and** keeps redrawing: `drawFrame` → `fourierPositionsAt(components, anim.t, components.length)` (`BasisCanvas.vue:140` / `:322`, O(N) in harmonics), trail update+draw, `drawEpicycleCircles` over `nVis ≤ 80` (`:47`), grid, labels — every frame, to a surface no one can see. The fullscreen canvas does all of it again. The stated invariant is not merely unmet; the mechanism **cannot** meet it.
**Falsifiers, all run** — (1) *IO detects occlusion*: no — the spec computes intersection rectangles, there is no occlusion term. (2) *the inline canvas leaves the viewport*: no — a `position: fixed` overlay changes nothing about the document layout underneath. (3) *`VisualizationView` gates the inline canvas*: no — `:199` is unconditional inside `.canvas-container`. (4) *`v-show`/`display:none` on the wrapper would zero the IO rect*: no — the hide at `VisualizationView.vue:404-409` is `opacity: 0`, and it applies only to the **editor** shell, never to `.canvas-container` under `showFullscreen`.
Exact millisecond cost is **UNPROVEN-NEEDS-LIVE (SS-13)**; the doubled call graph is CONFIRMED-static.

### M-6 · MAJOR (inherited, transitive) · the fullscreen canvas draws in `#888888` grey — `colors.ts` cannot parse the `oklch()` tokens glass-ui 4.0.0 ships **today**

**Provenance**
- `FullscreenViewer.vue:121-127` mounts `BasisCanvas`, which colours everything from `VIZ_COLORS` (`BasisCanvas.vue:6`, used at `:127`, `:172`, `:257`, `:261`, `:326`, `:330`).
- `lib/colors.ts:22-54` `cssVarToHex(varName)` reads `getComputedStyle(document.documentElement).getPropertyValue(varName)` and matches exactly four shapes: leading `#` (`:29`), `hsl(…)` (`:32-35`), a bare Tailwind HSL triplet `^h s% l%$` (`:40-43`), `rgb(…)` (`:46-49`). Anything else → **`return "#888888"` (`:53`)**.
- `lib/colors.ts:90-96` `resolveVizColors()` runs `cssVarToHex` over `--viz-fourier`, `--viz-chebyshev`, `--viz-legendre`, `--viz-amber`, `--viz-green`.
- glass-ui 4.0.0 ships those tokens as: `tokens/color-radius.css:263-265` → `--viz-fourier: oklch(0.579 0.201 30.4)`, `--viz-chebyshev: oklch(0.484 0.163 265.5)`, `--viz-legendre: oklch(0.532 0.180 317.5)`; `tokens/dark-arm.css:113-115` → dark-arm `oklch()`; `tokens/light-dark.css:147` → `--viz-legendre: light-dark(oklch(…), oklch(…))`.
- `grep "@property" glass-ui/dist/styles/tokens/*.css | grep -i viz` → **empty**: the `--viz-*` properties are **unregistered**, so per CSS Variables their computed value is the substituted token stream — `getPropertyValue` hands back the literal string `oklch(0.579 0.201 30.4)`.

**Consequence.** `--viz-fourier`, `--viz-chebyshev`, `--viz-legendre` all miss all four arms → `#888888`. `--viz-amber` and `--viz-green` survive only because the app overrides them in `hsl()` form (`style.css:120`, `:125`) — which is itself the tell that someone hit this and patched one arm. Every fourier/chebyshev/legendre curve, the epicycle trail, and `hexToRgba(VIZ_COLORS.golden, …)`'s siblings render as undifferentiated grey. `VIZ_COLORS.golden/rainbow/pink/emerald` are hard-coded hex (`colors.ts:11-19`) and are unaffected — which is why the golden hover state still works and would mask the failure in casual inspection.

**Attribution** this is `lib/colors.ts`'s defect, not `FullscreenViewer`'s; it is on this axis because the fullscreen mount is an independent second consumer of it and because the axis names "the hand-rolled `colors.ts` arms" explicitly.
**Falsifiers, all run** — (1) *the app overrides `--viz-fourier` in an hsl/hex form*: `grep -- "--viz-" src/style.css` → only `--viz-amber` (`:120`, `:125`). (2) *the browser canonicalises custom-property computed values to `rgb()`*: only for `@property`-registered properties; these are unregistered (checked above). (3) *`resolveVizColors` is never called*: falsified — `App.vue:11` calls it at boot and re-runs it on `.dark` via `MutationObserver` (lane-frontend `:554`). (4) *`--viz-*` is shadowed by an hsl definition later in glass-ui's own cascade*: `light-dark.css:147` is `light-dark(oklch(), oklch())` — worse, not better.
**Contradicts the census in degree** — `CENSUS-2026-08-03.md:174,187-188` files the missing `oklch()` arm as F.W2 migration work contingent on the value.js uplift. The tree says the failure is **already live at the current pins**; F.W2 is a *cure*, not a *prerequisite*. Rank accordingly.

### M-7 · MAJOR · redundant identity prop creates two sources of truth for one overlay

`FullscreenViewer.vue:17` declares `imageSlug?: string | null` and forwards `:image-slug="imageSlug ?? null"` (`:118`) — but `ContourAsset` already carries `image_slug: string | null` (`lib/types.ts:72`), and the same child positions the overlay from `props.contour.image_bounds` (`ContourEditorCanvas.vue:99-108`). So the overlay's **URL** comes from one source and its **placement rectangle** from another, with nothing binding them.
`VisualizationView.vue:284` supplies `store.imageSlug`, which the store assigns at three independent sites — `stores/workspace.ts:123` (`meta.image_slug` after upload), `:148` (route slug), `:211` (`viz.image_slug` after loading a saved visualization). None of those asserts equality with the loaded `contour.image_slug`. On a `/v/:visualizationSlug` load followed by a workspace re-point, the overlay bitmap and the bounds can come from different images.
**Falsifier** — a store or type invariant coupling `imageSlug` to `contour.image_slug`. None exists in `types.ts:70-81` or in `stores/workspace.ts`; the store even documents the pair as degenerate-but-distinct at `:236` (*"the `(imageSlug, vizSlug)` pair degenerates to the slug"*), which is a statement about a different pair.

---

## §3 · MINOR

| id | severity | claim | provenance | falsifier (run) |
|---|---|---|---|---|
| **m-1** | MINOR | `show` mirrors `visible`, giving one state two flags with a tick of skew — the trap guards on `visible` (`:92`) while the render guards on `show` (`:107`), so during that tick Escape closes a layer that is still painting, and vice versa. | `:28`, `:70-85`, `:92`, `:107` | *"the mirror is needed for the leave transition."* Falsified — `<Transition>` wraps `v-if` and works identically against the prop; the watcher's only other job (focus save/restore) does not require a second ref. |
| **m-2** | MINOR | `onAfterLeave` is an empty handler whose comment is factually wrong: *"the teleport stays in DOM but invisible"*. `v-if="show"` removes it. Dead code carrying a false model of its own component. | `:87-89` vs `:107` | Read `:107`: `v-if`, not `v-show`. |
| **m-3** | MINOR | Same `exportFrame` emit, two silently different contracts. Inline: `@export-frame="handleExportFrame"` → `ExportModal` → `doExport(options)` with user-chosen `withGrid`/`withLabels`. Fullscreen: `@export-frame="canvasComponent?.exportFrame()"` — **no arguments**, so both options silently default `true`. Nothing in either file records the divergence. | `:138` vs `VisualizationView.vue:98-102,281`; defaults at `BasisCanvas.vue:466-469` | *"fullscreen deliberately skips the modal because the modal would be occluded."* Plausible (and true — `DialogContent` is z-modal 140 < 150, B-1) but **unwritten anywhere**, so it is an undocumented contract fork, not a design. |
| **m-4** | MINOR | `variant="glass" size="icon"` is requested and then wholly overridden: `.fs-close` hard-codes `width/height: 2.5rem` over the variant's `h-(--control-h-md) w-(--control-h-md)`, `border-radius: 9999px` over `btn-pill`, `color: var(--foreground)` over the variant's text token, and a `color-mix(in srgb, var(--background) 90%, transparent)` hover over the glass variant's `--glass-bg-resting/floating` hover. The close button no longer tracks the design system's control geometry or glass material. Contradicts `feedback_glass_ui_first_class`. | `:110` vs `:177-206`; variant/size definitions in `glass-ui/dist/button-BNDWhAZb.js` (`variant.glass`, `size.icon`) | *"the scoped rules lose the cascade to Tailwind utilities."* Falsified — SFC `<style scoped>` output is **unlayered** and Tailwind v4 utilities live in `@layer utilities`; unlayered beats layered unconditionally, independent of specificity. The override always wins. |
| **m-5** | MINOR | `:deep()` reaches two levels into two different children to null out a **local shim's** chrome — `border`, `border-radius`, `box-shadow` painted by `cartoon-card`, which the corpus records as a local resurrection of a recipe glass-ui removed at C.W5, with 25 consumers. Any change to the shim silently breaks the fullscreen presentation. | `:163-175`; `BasisCanvas.vue:521` (`class="canvas-container cartoon-card"`); `ContourEditorCanvas.vue:231` (`.editor-shell`); shim at `style.css:106-117` per lane-frontend | *"the children expose a prop/variant for chrome-less mode."* Falsified — `BasisCanvas` props are `activeBases/showGhost/showImageOverlay` only (`:33-40`); `ContourEditorCanvas` props are `contour/imageSlug/showImageOverlay` only (`:18-22`). `:deep()` is the only lever available, which is the real finding: the children offer no presentational contract. |
| **m-6** | MINOR | Focus restore can silently land on `<body>`. `lastFocused?.focus?.()` fires synchronously on `visible→false`; the captured trigger is a `DockIconButton` inside a collapsible `GlassDock`. `focus()` on a detached node is a no-op with no signal. | `:82`; trigger at `CanvasControlsDock.vue:92-95` | *"the dock never unmounts its children."* **UNPROVEN-NEEDS-LIVE (SS-13)** — `GlassDock`'s collapsed/expanded slot swap is not statically decidable from the consumer. The code has no fallback either way (no `?? containerRef` guard on restore, unlike the open path at `:77`), so the asymmetry is a defect regardless of which branch is live. |
| **m-7** | MINOR | Zero test coverage. No e2e spec opens the viewer; the sole mention is a comment. Both axe scans run outside the layer, so the missing `role`/name (M-3) cannot be caught. | `grep -rn "Fullscreen" web/e2e/` → `gallery.spec.ts:113` (comment only); axe imports at `visualization-ux.spec.ts`, `visualization-crud.spec.ts` | *"a screenshot baseline covers it."* Falsified — `visual-baseline.spec.ts` and `e2e/screenshots/` contain no fullscreen route or trigger. |
| **m-8** | MINOR | Document-level Escape is unscoped and permanently bound. `onKeydown` is attached at mount for the component's entire lifetime and emits `close` on any Escape while `visible`, competing with reka's `DismissableLayer`, which also listens on `document` for any open Select/Menu. One Escape plausibly dismisses both the popup and the viewer. | `:91-98`, `:100-101` | *"reka stops propagation."* **UNPROVEN-NEEDS-LIVE (SS-13)** — reka's escape handler calls `preventDefault()` on its own event but the relative order of two document-level bubble listeners is registration-order dependent. The *unconditional lifetime binding* is confirmed-static regardless. |
| **m-9** | MINOR | The consumed child declares an emit it never fires: `save: [points]`. `grep "emit(\"save\"\|emit('save'" ContourEditorCanvas.vue` → empty. Contract noise on the surface this component consumes; there is nothing for `FullscreenViewer` to bind even if B-2 were fixed by binding. | `ContourEditorCanvas.vue:26` | Grep run, empty. Save is instead driven parent-side via the exposed `getPoints()` (`VisualizationView.vue:92-96`) — i.e. the declared emit is vestigial. |

---

## §4 · INFO — the negatives, recorded so the axis is closed

**i-1 · value.js consumption is ZERO, and correctly so.** No `@mkbabb/value.js` import in `FullscreenViewer.vue` or in any of its four direct imports. The census's 5-statement / 4-file / 6-symbol easing-only surface (`CENSUS:38` — `lib/easings.ts:9,16`, `ConvergencePlot.vue:5`, `useCurveTransition.ts:8`, `harmonics.ts:5`) does not include this file, so the **F.W2 bare-specifier→`/easing` migration has zero cost here**. All motion in this file is expressed as glass-ui cascade tokens instead (S-2). The only value.js-adjacent surface reachable from here is `lib/colors.ts` via `BasisCanvas`, and that file is hand-rolled with **no** value.js import — which is precisely the F.W2 colour-arm target and precisely why M-6 exists.

**i-2 · keyframes.js consumption is ZERO, and correctly so.** `stores/animation.ts:47-50` records that the keyframes.js `Animation` graph on this path was constructed-but-never-invoked and was excised as dead substrate; the live clock is a manual rAF loop (`:51-…`). This component's enter/leave is a plain CSS `<Transition>` (`:106`, `:229-244`) — the right tool for a two-property opacity/scale fade, and it means the `keyframes 4.3→6` arm of the atomic tri-package uplift (lane-frontend `:492`) also costs this file nothing.

**i-3 · API consumption is 1 of 45 — and R6-8's coupling hazard is checked and ABSENT here.** The only operation reachable from this component is `GET /api/images/{imageSlug}/overlay?resize=` (`api/routers/images.py:168-169`), reached indirectly: `FullscreenViewer.vue:118` → `ContourEditorCanvas.vue:89-96` → `lib/api.ts:296-298 overlayUrl()`. Under X-3's adopted denominator that is **1/45 total, 1/30 public-non-admin**. `overlayUrl` is a pure template-string builder, **not** an `apiFetch` client leaf (contrast the 39 `export async function` clients in `lib/api.ts`), so there is no `client:*` identity for an operation record to embed as a `clients: […]` back-reference — the R6-8 non-isolability failure mode (`intakes/lane-fourier-r3-r6.md:142`) **cannot arise on this path**. Worth booking as a positive pattern for the F.W5 admission keystone: *URL-builder leaves are naturally isolable; the coupling defect is specific to verb-carrying client functions.*
*Secondary observation, INFO not defect:* three different `resize` defaults sit on this one operation — `overlayUrl`'s `1024` (`lib/api.ts:296`), the server's `1024` (`images.py:169`), and the child's fallback `wStore.contourSettings?.resize ?? 768` (`ContourEditorCanvas.vue:94`). Harmless today because the child always supplies a value, but it is three declarations of one default. The response is `Cache-Control: public, max-age=86400` (`images.py:205`), so B-2's duplicate mount costs at most one extra conditional request, not a second LANCZOS resize — the reason this is INFO and not a MAJOR.

---

## §5 · SUPERLATIVES (L-18 runs both ways)

**S-1 · The `min-height: 0` in the `:deep()` edge-to-edge block is the hard part, and it is correct.** `:163-170` does not merely strip chrome; it re-asserts `flex: 1` **and** `min-height: 0` on the child roots. `min-height: 0` is the single property that lets a `flex: 1` canvas actually shrink inside a column flex parent, and omitting it is the classic nested-flex-canvas bug. Its absence is *expensive* in this very repo: `VisualizationView.vue` needed two separately-documented fixes for the same class of failure (`:336-347` — the mobile flex-column stage collapsing to 0px, and `:380-387` — the B.W4 `height: 100%` fix on `.viz-panel-right`). This file got it right on the first pass.
**Falsifier** — delete `min-height: 0` (`:169`) and the canvas overflows its fullscreen column. It is present, load-bearing, and not cargo.

**S-2 · The motion surface is token-pure with zero exceptions.** `grep -n "cubic-bezier\|transition: all" FullscreenViewer.vue` → the only hit is the comment at `:190` saying not to. All four transition sites (`:191-195`, `:198-202` via the same block, `:232`, `:235`) name individual properties and reference glass-ui cascade tokens (`--ease-standard`, `--ease-out-expo`), both verified present in the shipped cascade. The A.W3.d provenance is cited inline at `:190` and `:230`. In a file this defective, the CSS motion discipline is complete — and it is what makes i-1/i-2 true: the correct value.js/keyframes consumption for a fade is *no import at all*.
**Falsifier** — the grep, run: no raw beziers, no `transition: all`, no un-tokenised durations-with-curves.

**S-3 · `focusableEls`'s `|| el === document.activeElement` clause is a real subtlety, deliberately handled.** `:43-45` filters candidates by `offsetParent !== null` **but keeps the currently-focused element regardless**. This is exactly the guard most hand-rolled traps omit: mid-transition (or mid-`v-show`) the active element can become `offsetParent === null`, which would otherwise empty the list and bounce focus to the container, losing the user's place. Given M-2 (the trap is wrong about portals), it is worth stating plainly that the trap's *internal* logic is more careful than the median hand-roll.
**Falsifier** — remove the clause and the trap loses its anchor whenever the focused element is transiently hidden. The clause is load-bearing.

**S-4 · The `--animation-dock-max-width` diagnosis was right even though the fix was inert.** `:225-227` and `AnimationControls.vue:18-23` identify a cross-component CSS-variable coupling — a child's layout being reached into by a parent's scoped stylesheet — name it, convert it to a typed prop, and document the change at *both* ends. That is the correct instinct and the correct etiquette, and the two-sided comment is why M-4 was cheap to find. The defect (M-4) is that the migration preserved a value that was already a no-op instead of deleting the contract; the diagnosis itself is exemplary and should be the template for the remaining cross-component var couplings in the tree.
**Falsifier** — that the prop was never actually threaded: falsified, `AnimationControls.vue:25` declares it and `:62` consumes it.

---

## §6 · Ranked remediation (advisory — no product source touched by this lane)

1. **B-1** — decide the portal-tier law at the glass-ui seam (re-base portal z per nesting level, or give the fullscreen layer a portal target inside its own stacking context). Blocks the fullscreen dock entirely and is almost certainly not fourier-local; **CARRY → glass-ui BH inbox** per the standing relay edict.
2. **B-2** — either gate the inline `ContourEditorCanvas` on `!showFullscreen` **and** forward `ref`/`@state-change`/controls into the layer, or drop the editing branch from `FullscreenViewer` entirely (`:115-120`, `:130`). Data-loss class.
3. **M-3** — adopt `@mkbabb/glass-ui/dialog`; it deletes M-1, M-2, m-1, m-2, m-6, m-8 as a side effect, which is the strongest argument for it.
4. **M-5** — gate the inline canvas's visibility credit on fullscreen state (an explicit store flag, not IntersectionObserver), and correct the two comments that claim occlusion detection.
5. **M-6** — F.W2's colour-arm work, **re-ranked from chore to live defect**: `cssVarToHex` needs an `oklch()`/`light-dark()` arm or, better, deletion in favour of value.js's parser once 4.0 lands.
6. **M-4 / M-7 / m-1..m-9** — contract hygiene; each is independently cheap.

*Evidence base: read-only. Files opened in `fourier-analysis`: `FullscreenViewer.vue`, `BasisCanvas.vue`, `ContourEditorCanvas.vue`, `AnimationControls.vue`, `VisualizationView.vue`, `SpeedSelect.vue`, `EasingPicker.vue`, `CanvasControlsDock.vue`, `ui/tooltip/Tooltip.vue`, `ui/tooltip/index.ts`, `lib/types.ts`, `lib/colors.ts`, `lib/api.ts`, `stores/animation.ts`, `stores/workspace.ts`, `style.css`, `package.json`, `api/routers/images.py`, plus `node_modules/@mkbabb/glass-ui@4.0.0` (tokens, bridges, button/dropdown-menu/dialog/tooltip/select bundles, `styles/index.css`) and `node_modules/reka-ui@2.9.10` (`Teleport/Teleport.js`, `Menu/MenuPortal.js`). Git: `log -S` on one pathspec. **Zero writes outside this file.***
