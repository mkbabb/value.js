claude-opus-5[1m]

# CHALLENGE — `FullscreenViewer.vue` · axis **L (LIBRARY)**

**Subject** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/visualization/FullscreenViewer.vue` (245 lines; 102 script / 41 template / 99 style)
**Posture** DEFECTIVE-until-proven. Static + source-derived only; no browser. Every claim carries severity · `file:line` · falsifier.
**Corpus folded** `formation/fourier/lane-frontend.md` (§6 render path, §8 hygiene, module row :88) · `formation/fourier/CENSUS-2026-08-03.md` (§3a, :336 teleports) · `audit/codex-provenance/intakes/lane-fourier-r3-r6.md` (R3-11, R5-7, R6-5, X-6).

**Tally — 19 defects (3 BLOCKER · 6 MAJOR · 7 MINOR · 3 INFO) · 3 superlatives.**

---

## §0 · Read-set (whole, read-only)

| File | Lines | Why in-set |
|---|---|---|
| `visualization/FullscreenViewer.vue` | 245 | subject |
| `visualization/BasisCanvas.vue` | 547 | imported (`:6`), instantiated at `:121` |
| `visualization/ContourEditorCanvas.vue` | 340 | imported (`:7`), instantiated at `:115` |
| `visualization/AnimationControls.vue` | 224 | imported (`:8`), instantiated at `:131` |
| `lib/types.ts` → `ContourAsset` | :70-81 | imported type (`:5`) |
| `@mkbabb/glass-ui/button` · `lucide-vue-next` | — | imported (`:3`, `:4`) |
| `visualization/VisualizationView.vue` | 487 | the **sole** call site (`:25`, `:282-285`) |
| `stores/animation.ts` | 147 | the I.γ visibility gate the subject's second canvas enrols in |
| `composables/{useCanvasSetup,useImageOverlay,useCanvasHover,useContourHistory}.ts` | 49/93/202/36 | transitive lifecycle surface of the two canvases |
| `visualization/{CanvasControlsDock,ExportModal}.vue` | 141/70 | the trigger + the in-repo modal prior art |
| glass-ui `dist/dropdown-menu-*.js`, `src/styles/dock/layers.css`, `src/styles/tokens/scheme-motion.css`, `theme/bridges.css` | — | portal target, layer hiding strategy, z-ladder |
| reka-ui `Teleport/Teleport.js`, `DismissableLayer/DismissableLayer.js`, `Select/SelectContent.js`, `Tooltip/TooltipContent.js` | — | portal defaults + Escape ownership |

---

## §1 · BLOCKERS

### L-B1 — BLOCKER · The fullscreen dock's only menu opens **underneath** the fullscreen backdrop

**Claim.** In fullscreen, the `AnimationControls` three-dot menu — the sole route to **Export**, **Easing**, and (on small viewports) **Speed** — renders as a `<body>` child at `z-index: 130` while `.fs-backdrop` is an opaque `<body>` child at `z-index: 150`. The menu is fully occluded, and clicks aimed at it land on the backdrop instead.

**Provenance (chain, every link verified in-tree).**
1. `FullscreenViewer.vue:105` `<Teleport to="body">` → the layer is a direct `<body>` child.
2. `FullscreenViewer.vue:148-153` `.fs-backdrop { position: fixed; inset: 0; z-index: var(--z-fullscreen); background: var(--background) }`.
3. glass-ui `src/styles/tokens/scheme-motion.css:344,346` (inside `:root {` at `:5`) → `--z-popover: 130`, `--z-fullscreen: 150`; `theme/bridges.css:244` bridges `--z-index-popover: var(--z-popover)` so the Tailwind v4 utility `z-popover` compiles to `z-index: 130`.
4. glass-ui `tokens/color-radius.css:57` → `--background: var(--neutral-0)` — **opaque**, no alpha.
5. `AnimationControls.vue:103-125` renders `DropdownMenuContent`; glass-ui `dist/dropdown-menu-BJ7E9js_.js` wraps it in reka's `DropdownMenuPortal` and stamps `class="dropdown-menu-content z-popover …"`.
6. reka-ui `dist/Teleport/Teleport.js:8-12` → `to` **defaults to `"body"`**. No `to` is passed anywhere in the chain.
7. Both elements are positioned with an explicit `z-index` in the **root** stacking context, so DOM order is irrelevant: 130 < 150. Paint order governs hit-testing, so a click at the menu's coordinates targets `.fs-backdrop` → `@click.self="emit('close')"` (`FullscreenViewer.vue:107`) **closes the whole viewer**.
8. `FullscreenViewer.vue` is the *sole* consumer of `--z-fullscreen` (`grep -rn "z-fullscreen" web/src` → `:151, :181, :213` only), so nothing in the app is designed to sit above it; the glass ladder tops out at `--z-toast: 160`.

**Blast radius.** The `@export-frame="canvasComponent?.exportFrame()"` wiring at `FullscreenViewer.vue:138` is *unreachable by pointer* — its only emitter is `DropdownMenuItem` at `AnimationControls.vue:120`. The fullscreen dock therefore ships one working control (play/pause) and one dead one.

**Falsifiers, each checked and each failing to save the code.**
- *If the backdrop were translucent* → it is `var(--background)`, opaque (step 4). ✗
- *If the menu rendered inline rather than portaled* → `DropdownMenuPortal` is unconditional in the glass wrapper (step 5). ✗
- *If glass-ui elevated dock-owned portals* — the wrapper does stamp `data-glass-dock-portal` / `data-glass-dock-owner` — → `grep -rc "data-glass-dock-portal"` over `dist/glass-ui.css` and `dist/styles/dock.css` = **0**; no CSS anywhere raises it. ✗
- *If `z-popover` failed to compile* (Tailwind not scanning `node_modules`) → glass-ui `src/styles/index.css:214` ships `@source "../*.js"`, which in the dist context resolves to `dist/*.js`, the chunks carrying the literal `z-popover`. The utility is emitted. (And were it *not* emitted, `z-index: auto` would place the menu below the backdrop's `150` regardless.) ✗
- *If `--z-fullscreen` were undefined* → then and only then would the backdrop fall to `z-index: auto` and lose to the later-inserted portal. It is defined at `:root` (step 3). ✗

**Not overclaimed.** Tooltips are **safe**: reka `Tooltip/TooltipContent.js` contains no `Teleport`, so `Tooltip` content renders in place inside `.fs-container` (which lives in the backdrop's own stacking context at `z-index: 160`, `FullscreenViewer.vue:213`). `SpeedSelect` is likewise safe: reka `Select/SelectContent.js:144-159` renders `SelectContentImpl` **inline** when open (the `Teleport to: fragment` branch is the closed-state measurement path). The defect is scoped precisely to the portaled `DropdownMenu`.

**UNPROVEN-NEEDS-LIVE (SS-13).** The *rendered* invisibility. The stacking arithmetic is fully source-derived; a live pass should screenshot the fullscreen dock with the menu open.

**Nasty tail.** reka keeps roving focus inside the menu, so a keyboard user lands on an **unseen** surface (interacting with L-M3, which then yanks Tab back out).

---

### L-B2 — BLOCKER · Fullscreen edit mode ships an editor with no controls and no save path; edits are silently discarded

**Claim.** When `isEditing && contour`, `FullscreenViewer` mounts a fully interactive `ContourEditorCanvas` and mounts **nothing else**. The user can drag control points and double-click to insert them; on close the instance unmounts and every edit is destroyed without a prompt, a warning, or a write.

**Provenance.**
- `FullscreenViewer.vue:115-120` — `<ContourEditorCanvas :contour :image-slug :show-image-overlay />`. **No `ref`. No `@state-change`. No `@save`.**
- `FullscreenViewer.vue:130` — `<div v-if="!isEditing" class="fs-controls">` gates the *only* control block in the file. In edit mode the layer contains exactly the close button + the SVG.
- Contrast the inline seat: `VisualizationView.vue:204-206` binds `ref="editorRef"` + `@state-change`, and `:238-248` mounts `EditorControlsDock` wiring undo / redo / smooth / simplify / delete / reset / magnet / **save** → `onEditorSave()` → `store.saveContourPoints(editorRef.value.getPoints())` (`:92-96`).
- The editor mutates only its own local `points` ref — `ContourEditorCanvas.vue:34` (declaration), `:148`, `:181`, `:188`, `:195` (splice/replace sites) — and surfaces state only through `defineExpose` (`:217-227`), which requires a `ref` the fullscreen seat never takes.
- The branch is **reachable**: `CanvasControlsDock.vue:89-93` places the Fullscreen `DockIconButton` *outside* the `v-if="!isEditing"` block at `:41`, so the trigger is live while editing.

**Falsifiers.**
- *If the editor wrote through to the store or to `props.contour`* → it does not; `initFromContour` reads the prop one-way (`ContourEditorCanvas.vue:53-72`) and no store write exists in the module (`grep -n "wStore\." ` → only `contourSettings?.resize` read at `:94`). ✗
- *If the two instances shared state* → each `useContourHistory(points)` (`ContourEditorCanvas.vue:41`) closes over its own `points` ref; the composable is per-instance by construction (`useContourHistory.ts:5-6`). ✗
- *If the branch were dead code* (fullscreen unavailable while editing) → refuted above; and if it *were* dead, that is a different defect of the same block, not an acquittal.
- *If Vue kept the instance alive across close* → `v-if="show"` at `:107` destroys the subtree; there is no `KeepAlive` in the file or at the call site. ✗

**Cross-reference.** `ContourEditorCanvas.vue:26` declares `save: [points: { x: number[]; y: number[] }]` — the exact affordance this seat needs — and **never emits it** (see L-m6). The contract for a working fullscreen editor was drafted and abandoned.

---

### L-B3 — BLOCKER · The duplicate editor instance installs a second `window` keydown handler; Cmd+Z / Delete in fullscreen mutate the **hidden** inline editor

**Claim.** In fullscreen edit mode two `ContourEditorCanvas` instances are mounted simultaneously, each with an unguarded `window` keydown listener. One keystroke runs both handlers against two divergent point arrays. The instance the user *cannot see* is the one that survives the close — and the one `onEditorSave` persists.

**Provenance.**
- `ContourEditorCanvas.vue:209-215` — `onMounted(() => window.addEventListener("keydown", onKeyDown))`, no visibility/focus/ownership guard anywhere in `onKeyDown` (`:164-177`).
- `onKeyDown` acts on `Delete`/`Backspace` → `deleteSelected()` (`:179-185`), `Cmd/Ctrl+Z` → `doUndo()` (`:111-115`), `Cmd/Ctrl+Shift+Z` / `Cmd/Ctrl+Y` → `doRedo()`.
- Instance 1 (inline) is mounted whenever a contour exists — `VisualizationView.vue:203` `v-if="store.contour"`; edit-mode toggling only swaps the `is-hidden` **class** (`:404-409` → `opacity: 0`), it never unmounts. So the inline listener is live even when not editing.
- Instance 2 (fullscreen) mounts at `FullscreenViewer.vue:115` whenever `show && isEditing && contour`.
- The rewind is durable: the inline instance's `points` feeds `ContourPreview` (`VisualizationView.vue:257`) and `store.saveContourPoints(editorRef.value.getPoints())` (`:94`).

**Failure scenario (concrete).** Contour loaded → user edits inline, drags three points → opens fullscreen → presses `Cmd+Z` twice to undo two fullscreen drags. Both instances undo twice. Close fullscreen → the inline editor is now **two steps behind where the user left it**, with no visual event to attribute the loss to. Press Save → the rewound state is persisted.

**Falsifiers.**
- *If the handler were bound to the component's own element* → it is `window` (`:210`). ✗
- *If it checked `document.activeElement` / a focus-within guard* → `onKeyDown` has no such test (`:164-177`). ✗
- *If the inline instance unmounted in edit mode* → the class-based crossfade at `VisualizationView.vue:392-409` keeps both in the DOM by design ("switching between them is a pure opacity crossfade with no layout shift", `:390-391`). ✗
- *If undo were a no-op on a fresh history* → `useContourHistory.undo()` guards only `historyIndex <= 0` (`useContourHistory.ts:15`); the inline instance has a populated history exactly when the user has been editing, i.e. the scenario above. ✗

**Note on ownership.** The root defect (a `window` listener with no ownership test) belongs to `ContourEditorCanvas`. **`FullscreenViewer` is the module that makes it fire twice**, and it does so by duplicating a stateful editor with no coordination — a composition defect at this seat.

---

## §2 · MAJOR

### L-M1 — MAJOR · The focus trap does not trap: it fails **open** forward and is a **dead key** backward

**Claim.** The trap's focusable set is computed with an `offsetParent` visibility test that cannot see glass-ui's hidden dock layer. In the dock's expanded state the computed `last` is an `inert`, `visibility: hidden` element, so (a) forward Tab never reaches the wrap condition and escapes into the background document, and (b) `Shift+Tab` from the first element calls `.focus()` on an inert node — a no-op — after `preventDefault()`, so the key does nothing at all.

**Provenance.**
- `FullscreenViewer.vue:37-46` — `FOCUSABLE` selector + `focusableEls()`; the sole visibility filter is `el.offsetParent !== null || el === document.activeElement`.
- `FullscreenViewer.vue:56-67` — `first`/`last` and the two wrap branches.
- glass-ui `src/styles/dock/layers.css:148-152` — the inactive layer is hidden with `opacity: 0; visibility: hidden; pointer-events: none`, and `:126` states the reason **explicitly**: *"`visibility:hidden` removes it from both while KEEPING it in layout flow, so the FLIP measurement still reads its geometry (`display:none` would zero it)."*
- `offsetParent` is `null` only for `display: none` subtrees, fixed positioning, and `<body>`. A `visibility: hidden` or `inert` element **retains its layout box and its offsetParent** — so every hidden dock control passes the filter.
- glass-ui `dist/dock.js` (layer render) emits, in this DOM order: `.dock-layer.dock-layer--full` with `inert: !expanded || void 0` carrying the **default** slot, then `.dock-layer.dock-layer--summary` with `inert: expanded || void 0` carrying the **collapsed** slot.
- Therefore, with the dock **expanded** (the state a user interacting with the controls is in), the last DOM-order match inside `.fs-container` is the mini play button in the now-`inert` summary layer (`AnimationControls.vue:67`), not the visible `DockDropdownTrigger` (`:104`).

**Mechanism, both directions.**
- *Forward:* real focus sits on the visible dropdown trigger. `active === last` is **false** (last is the inert node) and `containerRef.contains(active)` is **true** → neither branch fires → no `preventDefault` → native Tab proceeds past the container into the background page. **The trap leaks — the exact failure the `A2 MED` comment at `:30-34` says it exists to prevent.**
- *Backward:* focus on `.fs-close` → `active === first` → `preventDefault()` + `last.focus()` on an `inert` element → per spec, a no-op. Focus does not move; the key is dead.

**Third-order.** `:collapse-delay="2000"` + `:start-collapsed="true"` (`FullscreenViewer.vue:131` → `AnimationControls.vue:58-63`) means the dock **auto-collapses between keystrokes**, so `first`/`last` are recomputed against a set whose membership flips on a timer. In the collapsed state the arithmetic happens to work (`last` = the visible mini play button); in the expanded state it does not. A trap whose correctness depends on a 2-second timer is not a trap.

**Falsifiers.**
- *If glass-ui hid inactive layers with `display: none`* → `offsetParent` would be `null` and the filter would work. `layers.css:126` rejects `display:none` by name and by reason. ✗
- *If the filter tested `checkVisibility()`, computed `visibility`, or `closest('[inert]')`* → it tests neither; `:43-45` is the whole filter. ✗
- *If glass-ui rendered the collapsed slot first* → `dist/dock.js` emits `--full` before `--summary`. ✗
- *If `inert` implied `[disabled]`* (which the selector excludes) → it does not; `inert` is a separate attribute and `button:not([disabled])` still matches. ✗

**UNPROVEN-NEEDS-LIVE (SS-13).** The observed focus ring's destination. Mechanism is fully source-derived; a live pass should Tab through the fullscreen layer in both dock states.

---

### L-M2 — MAJOR · `Escape` has no nested-layer guard: closing a menu closes the entire viewer

**Claim.** `onKeydown` emits `close` for **any** Escape while visible, with no `defaultPrevented` test and no notion of a topmost layer. A nested reka overlay's Escape therefore destroys the whole fullscreen layer instead of just the overlay.

**Provenance.**
- `FullscreenViewer.vue:91-98` — `if (e.key === "Escape") { emit("close"); return; }`. No `e.defaultPrevented` check, no open-overlay check, no `isComposing` check.
- `FullscreenViewer.vue:100` — the listener is on `document`.
- reka `dist/DismissableLayer/DismissableLayer.js:72-77` — `onKeyStroke("Escape", …)` (VueUse, default target `window`, bubble phase, no `preventDefault`, no `stopImmediatePropagation`). It guards `isHighestLayer` for *its own* stack — a stack `FullscreenViewer` never joins.
- Bubble order is target → … → `document` → `window`, so **the subject's handler always runs first**, irrespective of registration time; and because reka never calls `stopImmediatePropagation`, both handlers run in every ordering.

**Failure scenario.** Fullscreen open → user opens the three-dot menu (or a `Select`) → presses Escape to dismiss it → the viewer closes and the menu closes with it. There is no way to dismiss a nested overlay without leaving fullscreen.

**Falsifiers.**
- *If reka called `preventDefault()` on the Escape event* → it does not (`:72-77`); and even then the subject does not check `defaultPrevented`. ✗
- *If reka called `stopPropagation()` on a `document`-phase listener* → it registers on `window`, downstream of `document`; and `stopPropagation` never blocks same-node listeners regardless. ✗
- *If `Select`/`Tooltip` were exempt* → `SelectContentImpl` and `TooltipContent` both compose `DismissableLayer`. ✗

**The fix shape (not applied).** `if (e.defaultPrevented) return;` plus letting reka's layer stack own Escape — which is precisely what the in-repo `Dialog` seat already gives for free (L-M6).

---

### L-M3 — MAJOR · The trap's containment test is DOM-tree containment, so teleported descendants read as "outside"

**Claim.** `containerRef.contains(active)` (`FullscreenViewer.vue:60`, `:64`) tests physical DOM ancestry. The layer's logical content includes reka-portaled descendants that live at `<body>`. While focus is inside the portaled dropdown, **every** Tab satisfies `!containerRef.contains(active)` in both branches → `preventDefault()` + focus yanked back into the container.

**Provenance.** `FullscreenViewer.vue:59-67` (both branches) · glass-ui `dist/dropdown-menu-BJ7E9js_.js` (`DropdownMenuPortal` wrapper) · reka `dist/Teleport/Teleport.js:8-12` (`to` defaults to `"body"`).

**Interaction.** Combined with L-B1 the composite is grim: the menu is invisible, keyboard-reachable, and its Tab key is hijacked by a trap that believes it has escaped.

**Falsifiers.**
- *If the menu rendered inline* → portaled (see L-B1 step 5). ✗
- *If the trap consulted the reka layer registry or a `data-dismissable-layer` ancestor test* → it consults neither. ✗
- *If `:modal="false"` (`AnimationControls.vue:103`) made reka trap focus itself* → non-modal is exactly the mode where reka does **not** trap, so nothing upstream compensates. ✗

---

### L-M4 — MAJOR · The fullscreen canvas is measured **under the enter transform** and is permanently sized at 95%

**Claim.** `BasisCanvas` sizes its backing store and its inline CSS box from `getBoundingClientRect()` at mount. At that moment the ancestor `.fs-backdrop` carries `fs-enter-from { transform: scale(0.95) }`, and `getBoundingClientRect()` reports the **transformed** rect. Nothing re-measures afterwards, so the fullscreen canvas is pinned at 95% of the viewport for the life of the layer.

**Provenance.**
- `FullscreenViewer.vue:237-240` — `.fs-enter-from { opacity: 0; transform: scale(0.95) }`; `:231-233` the 0.3s transform transition.
- `useCanvasSetup.ts:17-35` — `containerRef.getBoundingClientRect()` → `canvas.width = round(width*dpr)` **and** `canvas.style.width = "${width}px"` (an inline style that outranks `.canvas-el { width: 100% }` at `BasisCanvas.vue:540-546`).
- `useCanvasSetup.ts:38-42` — `onMounted(() => { setupCanvas(); resizeObserver = new ResizeObserver(setupCanvas); … })`.
- Vue mount order: `mountElement` calls `transition.beforeEnter(el)` (which adds `fs-enter-from` + `fs-enter-active`) **before** insertion, and queues `transition.enter(el)` as a post-render effect *after* the children's `mounted` hooks. `enter()` then removes `enter-from` inside `nextFrame` (double-rAF). So the child's `onMounted` measurement, and the ResizeObserver's initial delivery at the end of the same frame, both read the scaled box.
- ResizeObserver reports the **untransformed** border/content box, so the 0.95 → 1 transform transition fires **no** resize callback.
- The only other `setupCanvas()` calls are guarded by `if (!surface.value)` (`BasisCanvas.vue:391-395`, `:407-411`) — and `surface.value` is already set. No re-measure exists.
- `FullscreenViewer.vue:87-89` has a `@after-leave` hook that does nothing; the hook actually required — `@after-enter` → re-measure — is absent. (See L-m1: the dead hook and the missing hook are the same oversight.)

**Consequence.** `.canvas-el` is `position: absolute; inset: 0` (`BasisCanvas.vue:540-546`); with explicit inline `width`/`height` the over-constrained box resolves against `top`/`left`, so the canvas pins top-left at 95% and leaves a ~5% dead band along the right and bottom edges of a *fullscreen* viewer.

**Falsifiers.**
- *If `.fs-enter-from` had no transform* → it has one (`:239`). ✗
- *If `getBoundingClientRect()` ignored ancestor transforms* → it does not; that is its defining difference from `offsetWidth`/ResizeObserver. ✗
- *If ResizeObserver fired on transform* → per spec it observes layout box only. ✗
- *If the `ContourEditorCanvas` branch shared the bug* → it does **not**: SVG `viewBox` + `preserveAspectRatio` + `width/height: 100%` (`ContourEditorCanvas.vue:232-241`, `:299-304`) is resolution-independent. Scoped correctly to the `BasisCanvas` branch.

**UNPROVEN-NEEDS-LIVE (SS-13).** The visible band. The measurement chain is source-derived end to end.

---

### L-M5 — MAJOR · The I.γ off-screen gate does not fire for the fullscreen case it names; both canvases draw every frame

**Claim.** Opening the viewer mounts a **second** `BasisCanvas` while the inline one keeps its visibility credit, so `visibleCanvases` goes 1 → 2 and the 60 fps redraw path runs **twice per tick** — full `fourierPositionsAt` over the whole component chain, trail update, grid, image overlay, epicycle fit — one of them onto a surface hidden behind an opaque backdrop.

**Provenance.**
- `FullscreenViewer.vue:121-127` — the second `BasisCanvas`; `VisualizationView.vue:199` — the first, never unmounted when fullscreen opens (nothing in that file reacts to `showFullscreen` beyond passing it down, `:282`).
- `stores/animation.ts:34-42` — the gate's own comment: *"burns CPU/GPU/battery while scrolled off-screen **or hidden behind the fullscreen layer**"*. **The second clause is not implemented.** `IntersectionObserver` measures intersection with a root/viewport; it has no notion of occlusion, and the inline canvas remains in the viewport behind a `position: fixed` backdrop.
- `BasisCanvas.vue:442-451` — `new IntersectionObserver(…, { threshold: 0 })` on the container; `:418-423` — the render watcher on `anim.t`/`anim.easedT` fires per tick in **every** mounted instance.
- Corroborates lane-frontend.md §6 ("Path A", `:523` `setCanvasVisible(v) — reference-counted across inline + fullscreen canvases`) and CENSUS §3a's "off-screen rAF gating" hygiene row — the mechanism is banked; **its fullscreen arm is not**.
- Same blindness, second instance: in *edit* mode the inline `BasisCanvas` is `opacity: 0` (`VisualizationView.vue:198` + `:404-409`) yet still intersects, still holds a credit, still redraws.

**Falsifiers.**
- *If the inline canvas were `v-if`'d or `display: none`d while fullscreen* → it is neither; only class-toggled opacity exists at that seat. ✗
- *If IO reported occlusion* → it does not. ✗
- *If the second instance leaked its credit* → it does **not**: `BasisCanvas.vue:454-459` disconnects and releases on `lastVisible`. Teardown here is correct — the defect is doubled *work*, not a counter leak. (Stated so the finding is not inflated.)

**UNPROVEN-NEEDS-LIVE (SS-13).** The per-frame cost multiple. The double-mount and the double-subscription are static facts.

---

### L-M6 — MAJOR · A hand-rolled focus trap duplicates a primitive the repo already consumes, in a component that is not the right seat for it

**Claim.** ~40 of the 102 script lines (`FullscreenViewer.vue:30-98`) re-implement dialog focus management. The repo already consumes glass-ui's `Dialog`, whose `DialogContent` supplies `role="dialog"` + `aria-modal="true"` + a reka focus trap + Escape + focus restore — and a sibling in the same directory documents exactly that.

**Provenance.**
- `ExportModal.vue:5-11` imports `Dialog`/`DialogContent` from `@mkbabb/glass-ui/dialog`; `:29-31` and `:44-48` state the contract in prose: *"reka-ui's DialogRoot drives the focus-trap, Esc-to-close, and `aria-modal`"* / *"DialogContent supplies role="dialog" + aria-modal="true" + focus-trap + Esc + autofocus"*.
- `grep -rn "FOCUSABLE\|focusableEls" web/src` → **only** `FullscreenViewer.vue`. This is the sole hand-rolled trap in a 66-SFC codebase whose glass posture the census calls *"the deepest, cleanest consumer in the constellation — 95 named-import statements / 21 subpaths / 49 symbols; 0 direct reka-ui"* (CENSUS §3a). This file is the single exception to that posture, and the exception is the one that is broken (L-M1/M2/M3).
- The bespoke copy is strictly weaker: no `role="dialog"`, no `aria-modal`, no background `inert`, no layer stack, no portal-aware containment — every one of which the primitive ships.
- Owner law engaged: *feedback_glass_ui_first_class* (glass-ui is the design system; add variants/primitives there) and *feedback_kiss_no_contrivance*. `DialogContent` is a fullscreen-capable chassis via `class`; glass-ui also ships `expandable-container.js` (`fixed inset-0 z-modal …`) as prior art for the exact shape.

**Falsifiers.**
- *If glass-ui had no dialog/trap primitive* → `dist/dialog.js` + `dist/DialogContent-DDE6pQBU.js` exist and are already imported in this very directory. ✗
- *If the primitive's z-ladder forbade fullscreen* → `--z-modal: 140`, one rung below `--z-fullscreen: 150`; adopting it also *dissolves* L-B1, since a `z-modal` layer no longer occludes a `z-popover` menu. ✗ (The bespoke route is what manufactured the blocker.)
- *If the trap needed canvas-specific behaviour* → nothing in `:30-98` is canvas-aware; it is a generic trap. ✗

---

## §3 · MINOR

### L-m1 — MINOR · `show` duplicates `props.visible`; `onAfterLeave` is dead code whose comment contradicts the template
`show` (`:28`) is derived state stored in a ref, written synchronously in both watcher branches (`:73`, `:80`) — it is `props.visible` with extra steps and an extra desync surface. `onAfterLeave` (`:87-89`, bound at `:106`) has an empty body and the comment *"the teleport stays in DOM but invisible"* — which is **false**: `v-if="show"` at `:107` removes the node and destroys the subtree (that destruction is precisely what makes L-B2 lose data). **Falsifier:** if any code read `show` and `visible` at different times, the ref would be load-bearing — nothing does; `show` appears at `:28`, `:73`, `:80`, `:107` only. If the transition needed a delayed unmount hook, the body would be non-empty — it is not.

### L-m2 — MINOR · Fullscreen export silently bypasses `ExportModal` and always emits grid + labels
`FullscreenViewer.vue:138` calls `canvasComponent?.exportFrame()` with **no options**, so `BasisCanvas.vue:466-469` defaults `withGrid`/`withLabels` to `true`. The inline seat routes the same event through `handleExportFrame()` → `ExportModal` → `doExport(options)` (`VisualizationView.vue:98-102`, `:281`). Same control, two artifacts, no way to configure the fullscreen one. **Falsifier:** if `ExportModal` were reachable from fullscreen the divergence would be a deliberate simplification — it is not (`--z-modal: 140` < `--z-fullscreen: 150`, so it would render under the backdrop; the same ladder inversion as L-B1).

### L-m3 — MINOR · `{ immediate: true }` on the visibility watcher is inert
`:85`. The sole call site initialises `const showFullscreen = ref(false)` (`VisualizationView.vue:72`), so the immediate run can only ever take the `else` branch (`:79-84`), whose entire effect is `lastFocused?.focus?.()` with `lastFocused === null` — a no-op, plus a redundant `show.value = false`. **Falsifier:** a call site passing `visible: true` at first render would make it load-bearing; there is exactly one call site and it does not.

### L-m4 — MINOR · No `prefers-reduced-motion` guard on the scale enter/leave *(cross-axis: design lane owns the full treatment)*
`:231-243` animates `transform: scale()` unconditionally. The sibling in the same subtree does guard (`AnimationControls.vue:178-180`), and CENSUS §3a banks "18 reduced-motion references" as hygiene. `grep -n "prefers-reduced-motion" FullscreenViewer.vue` → **0**. **Falsifier:** a global PRM kill-switch in the cascade would cover it — `web/src/styles/` no longer exists (lane-frontend §8) and glass-ui's `view-transition.css` zeroes `::view-transition-*` only, not consumer `.fs-*` classes.

### L-m5 — MINOR · In-flight overlay image load is not cancelled on unmount → post-teardown `drawFrame()`
`useImageOverlay.ts:50-59` — `img.onload` closes over `onImageLoaded?.()`, which `BasisCanvas.vue:81-83` binds to `() => { if (surface.value) drawFrame(); }`. The watcher is component-scoped, but the pending `Image` load is not aborted, and `surface.value` is never nulled on unmount (`useCanvasSetup.ts:44-46` disconnects the RO only). A fullscreen close during a cold overlay fetch runs a full draw against a detached canvas. This seat is the one that churns mount/unmount on every open/close. **Falsifier:** the module-scoped cache (`useImageOverlay.ts:10`) means the *second* (fullscreen) instance normally hits the cache and returns synchronously (`:41-47`) — so the window is cold-open-only. Bounded, not absent.

### L-m6 — MINOR · Dead emit contract: `ContourEditorCanvas` declares `save` and never emits it
`ContourEditorCanvas.vue:26` declares `save: [points: { x: number[]; y: number[] }]`. `grep -n "emit(\"save\"\|emit('save'" ` over the file → **0 hits**; the only `@save` in the tree is on `EditorControlsDock` (`VisualizationView.vue:247`). A declared-but-unemitted event is a false contract that a consumer (this one) could reasonably have wired instead of going ref-less. **Falsifier:** if any consumer bound `@save` on `ContourEditorCanvas` the emit would be merely unimplemented rather than dead — none does.

### L-m7 — MINOR · Focus restore fires at the *start* of the leave transition, not on `@after-leave`
`:79-83` restores focus in the watcher, while the backdrop is still painted and mid-scale for 200 ms (`:234-236`). The correct hook exists in the file and is empty (`onAfterLeave`, L-m1). Restoring focus to a background element that is still visually covered can scroll the background under the overlay. **Falsifier:** if the leave transition were 0 ms the distinction would vanish — it is 0.2 s.

---

## §4 · INFO

### L-i1 — INFO · R5-7 / R6-5 (native template-loop invisibility): **does not apply to this module directly; applies transitively, and this seat doubles the blind subtree**
`grep -c "v-for" FullscreenViewer.vue` → **0**. The module contributes nothing to the `NATIVE_TEMPLATE_LOOP` family on its own. It does, however, instantiate a second copy of `ContourEditorCanvas`, whose control points are a **native** SVG element loop — `ContourEditorCanvas.vue:268-278`, `v-for="(pt, i) in points"` on `<circle>` with a per-node `@pointerdown` — exactly the class the intake adjudicates: *"template-loop evidence keyed to component callsites is blind to native HTML element loops"* (R5-7, ADOPT-AS-FACT; cured by R6-5's `NATIVE_TEMPLATE_LOOP` family). Any instance denominator built on component callsites sees two `ContourEditorCanvas` callsites and **zero** of the 2 × `contour.point_count` circle nodes those callsites mount. For F.W4's per-component D/L/C audit the rule is: this component's instance weight is not its own template, it is its children's native loops, doubled while the layer is open.
**Corroboration, not contradiction:** R3-11 / X-6 name `FullscreenViewer.vue:105` as one of exactly two `<Teleport>` sites. Re-verified in the live tree: `grep -rn "<Teleport" web/src` → `PaperSearchModal.vue:41` and `FullscreenViewer.vue:105`, exactly two, at exactly those lines. **I find no point on which the tree contradicts the intake for this component.**

### L-i2 — INFO · `canvasComponent` is latently `undefined` in the edit branch
`:26` declares the ref; `:123` binds it on the `v-else` (non-editing) branch only. In edit mode `canvasComponent?.exportFrame()` (`:138`) would silently no-op — dead-safe today only because `v-if="!isEditing"` (`:130`) hides the emitter. A type-safe expression standing on a template guard two elements away. **Falsifier:** if the controls block were ever shown in edit mode (which L-B2 argues it *should* be, in editor form) this becomes a live silent no-op.

### L-i3 — INFO · Module size: **Goldilocks-OK**
245 total / 102 script / 41 template / 99 style. The single lump is the 40-line trap (`:30-98`) — and its problem is *seat*, not *size* (L-M6). Corroborates lane-frontend.md:88 (`FullscreenViewer.vue | 245 | Fullscreen canvas layer`). No split is warranted; extracting the trap to the primitive removes ~40 lines and takes six defects with it.

---

## §5 · Superlatives (L-18 runs both ways — each with its falsifier)

### S-1 — The `max-width` prop that retired a cross-component CSS-var contract
`FullscreenViewer.vue:135` passes `max-width="60rem"`; `AnimationControls.vue:18-26` receives it as a documented, defaulted, typed prop and confines the old ambient var to a component-internal implementation detail (`:62` writes it, `:135` reads it). This is the correct direction for a cross-component contract: from ambient global to typed interface. **Falsifier (checked):** if any file outside `AnimationControls` still wrote `--animation-dock-max-width`, the "replacement" would be prose over a live global — `grep -rn "animation-dock-max-width" web/src` → four hits: two comments (`FullscreenViewer.vue:227`, `AnimationControls.vue:20`) and the two internal sites. The claim in the comment is **true**. *(Bounded: `60rem` is root-font-relative while the default `960px` is absolute, so the two seats diverge under a non-16px root — a one-token nit, not a defect.)*

### S-2 — Listener teardown is exactly symmetric
`:100-101` — `onMounted(() => document.addEventListener("keydown", onKeydown))` / `onUnmounted(() => document.removeEventListener("keydown", onKeydown))`, the **same** named function reference, no options mismatch. **Falsifier (checked):** an inline arrow at either site, or `{capture}`/`{once}` on only one, would leak the listener for the life of the page — neither is present, and the handler is a hoisted `function` declaration (`:91`), so identity is stable. Contrast the *composition* problem this file has with `window` listeners it does not own (L-B3): its own bookkeeping is clean.

### S-3 — Motion discipline: named properties, canonical tokens, zero `transition: all`
`:190-196` and `:229-243` — every transition enumerates its properties and rides `--ease-standard` / `--ease-out-expo` rather than a raw bezier, with the governing wave (`A.W3.d`) cited inline. **Falsifier (checked):** `grep -n "transition: all\|cubic-bezier" FullscreenViewer.vue` → 0 hits (the only match is the comment asserting the absence); both tokens resolve at `:root` (glass-ui `tokens/scheme-motion.css:216,219`), so these are live declarations, not silently-invalid ones. **Bounded by L-m4:** tokenised, yes; reduced-motion-guarded, no.

---

## §6 · Verdict

The component is **DEFECTIVE**, and the defects are structural rather than cosmetic. Three of them make advertised functionality unreachable or destructive: the fullscreen dock's only menu paints under its own backdrop (L-B1), the fullscreen editor has no controls and no save path (L-B2), and it silently rewinds the editor instance that persists (L-B3). Six more (L-M1…L-M6) trace to a single root cause: **this file re-implements a modal dialog by hand inside a codebase the census calls the constellation's cleanest glass consumer** — so it inherits none of the primitive's layer stack, portal awareness, containment semantics, or z-ladder placement, and it re-derives each of them wrongly. Adopting `Dialog`/`DialogContent` (already imported one directory over, `ExportModal.vue:5-11`) dissolves L-B1, L-M1, L-M2, L-M3 and L-M6 at once; L-B2/L-B3 need a composition decision (hoist the editor, or refuse to duplicate it); L-M4 needs an `@after-enter` re-measure in the hook slot that currently holds a no-op; L-M5 needs the gate to learn about occlusion the store's own comment already promises.

**Could not prove without a browser (SS-13 queue):** the rendered occlusion of the dropdown (L-B1), the observed focus destinations (L-M1), the 5% canvas band (L-M4), and the per-frame cost multiple (L-M5). Every mechanism above is source-derived; only the pixels and the profiler numbers are outstanding.
