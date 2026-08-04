claude-opus-5[1m]

# CHALLENGE · `ContourEditorCanvas.vue` · axis **L — LIBRARY**

**Subject** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/visualization/ContourEditorCanvas.vue` (340 LOC)
**Tree** `fourier-analysis @ cd26c65` (read-only evidence; no product source touched)
**Method** static + source-derived only. No browser tooling. Livable-only claims are tagged `UNPROVEN-NEEDS-LIVE` for SS-13.
**Posture** the component is assumed DEFECTIVE until the tree proves otherwise. Every claim below carries a severity, `file:line` provenance, and its own falsifier. Superlatives carry falsifiers too (L-18 runs both ways).

**Files read whole (read-only):** the subject; `lib/contourEditing.ts` (222); `components/visualization/composables/useContourHistory.ts` (36); `.../usePointDrag.ts` (67); `.../useImageOverlay.ts` (93); `lib/types.ts` (391, `ContourAsset`/`ImageBounds`/`ContourSettings`); `lib/api.ts:290-300` (`overlayUrl`); `stores/workspace.ts:263-283` (`saveContourPoints`); `lib/defaults.ts`; both call sites — `VisualizationView.vue` (486) and `FullscreenViewer.vue` (245); the consuming rail `EditorControlsDock.vue` (230); the sibling consumer `ContourPreview.vue` (62); `ContourSettings.vue` + `ui/SliderControl.vue`; `BasisSelector.vue:150-195`; `style.css:85-110`; `lib/golden-shimmer.ts`; `web/tsconfig.json`; `web/e2e/*.spec.ts`.

---

## §0 · Corpus fold (hitherto; not re-invented)

| Corpus row | What it already fixes in place | How this challenge uses it |
|---|---|---|
| `formation/fourier/lane-frontend.md:86` | `ContourEditorCanvas.vue` \| 340 \| "SVG contour point editor (drag/insert/delete)" | LOC + role confirmed exact against the tree. **Adopted.** |
| `lane-frontend.md:565` (§6 SVG surfaces) | "`visualization/ContourEditorCanvas.vue` (SVG point editor **despite the name**)" | Adopted and sharpened: the component is on the **SVG** render path, not the Canvas2D one — yet it re-derives the Canvas2D path's overlay geometry (§L-12). |
| `lane-frontend.md:85-87` (census §3a / FE §6) | "Canvas2D throughout, **WebGL/WebGPU ABSENT**; three independent canvases … + **12 SVG surfaces**" | Adopted. The subject is SVG surface #4 of 12. There is no WebGL/canvas context in this component — the viz-render-path question resolves to the SVG DOM path, and that is where §L-8 lives. |
| `lane-frontend.md:557` | "the epicycle loop is *not* draw-on-rAF … Redraws therefore **coalesce on Vue's scheduler**" | Adopted as the **contrast**: the canvas path coalesces; this component's SVG path does not (§L-8). |
| `lane-frontend.md:111-112` | "off-screen rAF gating … but the two rAF clocks themselves are **ungated under PRM**" | Extended: there is a **third** ungated motion source and it is CSS, not rAF (§L-14). |
| `lane-frontend.md:119`, `:122` | `usePointDrag.ts` 67 "Contour point drag"; `useContourHistory.ts` 36 "**undo/redo ring**" | LOC exact. **`"ring"` CONTRADICTED — see §L-5.** |
| `intakes/lane-fourier-r3-r6.md` **R5-7** (ADOPT-AS-FACT + CARRY→F.W4) | "template-loop evidence keyed to *component* callsites is blind to native HTML element loops" | Applied directly — §L-R57 below. |
| `intakes/lane-fourier-r3-r6.md` **R6-5 / R6-6** (ADOPT-AS-FACT) | the `NATIVE_TEMPLATE_LOOP` family cures R5-7; `nativeTemplateLoops: 16` | Used as the falsifier instrument for §L-R57. |
| `intakes/lane-fourier-r3-r6.md` **X-5** | "66 SFC + 65 TS — AGREE, exact, both sides" | Adopted; no re-count attempted. |

Nothing in the hitherto corpus contains a per-defect reading of this component. Every §L row below is new.

---

## §1 · BLOCKERS (2)

### L-1 · BLOCKER — the `window` keydown hijack destroys contour points from inside a co-mounted text input, and swallows ⌘Z app-wide whenever a contour is loaded

**Provenance**
- `ContourEditorCanvas.vue:164-177` — `onKeyDown` handles `Delete`/`Backspace` → `deleteSelected()`, and `z`+meta/ctrl → `doUndo()` / `doRedo()`.
- `ContourEditorCanvas.vue:209-215` — the listener is installed on **`window`**, not on the `.editor-shell` element.
- `ContourEditorCanvas.vue:231` — `.editor-shell` carries `tabindex="0"`, i.e. the component was *designed* for a focus-scoped handler that was never wired.
- `VisualizationView.vue:203-207` — `<div v-if="store.contour" class="editor-shell" :class="{ 'is-hidden': !isEditing }">` — the editor is **mounted whenever a contour exists**, edit mode or not; `is-hidden` is CSS-only (`VisualizationView.vue:404-409`: `opacity:0; z-index:0; pointer-events:none`). It is never unmounted.
- `VisualizationView.vue:260` — `<ContourSettings v-if="hasImage" …>` renders **inside the editing panel**, concurrent with the editor.
- `ContourSettings.vue:230,243,269,282,295` → `ui/SliderControl.vue:71-79` — `<input :type="isNumericDisplay ? 'number' : 'text'">`. Real editable text fields, live, on the same screen as the editor.
- `BasisSelector.vue:157,184` — two more `<input type="number">` on the non-editing panel, where the editor is *also* still mounted.

**The defect, two arms.**

*Arm A (data loss).* `selectedIdx` is only cleared by `deselect()`, which fires on background-SVG click, undo/redo, delete, smooth and simplify (`:159-162`, `:111-121`, `:179-185`, `:187-199`) — **never on blur, never on leaving edit mode**. So: drag a point (selection persists) → click into the "Blur Sigma" field (`ContourSettings.vue:242-250`) → press `Backspace` to fix a typo. `onKeyDown` fires at window level, `selectedIdx.value !== null` is true, so `e.preventDefault()` swallows the character deletion **and** `deleteSelected()` destroys a contour vertex. The user sees a text field that refuses to edit and never learns a point vanished from a 1024-point curve.

*Arm B (global shortcut capture).* The ⌘Z branch (`:169-172`) is **unguarded** — no `selectedIdx` test, no focus test, no `isEditing` test. It calls `e.preventDefault()` on every ⌘Z/Ctrl+Z anywhere in the document for as long as `store.contour` is non-null, which per `VisualizationView.vue:203` is *the entire workspace route including non-editing mode*. Native undo inside `BasisSelector`'s harmonics field and `ContourSettings`' sliders is dead.

**Falsifier.** This claim dies if any one of: (a) the listener is element-scoped, not `window` — it is not (`:210`); (b) the handler bails on `document.activeElement` being a form control — no such guard exists anywhere in `:164-177`; (c) the component unmounts when not editing — it does not, `VisualizationView.vue:203` keys on `store.contour` and `:203`'s `is-hidden` is opacity-only; (d) no editable text field is ever co-mounted — `SliderControl.vue:71` and `BasisSelector.vue:157` are both live on the same route; (e) `selectedIdx` is cleared on blur/mode-exit — grep the file: `deselect` appears at `:57, :113, :119, :160, :182, :189, :196` and none is a blur or an `isEditing` watcher.
**UNPROVEN-NEEDS-LIVE (SS-13):** only the *keystroke-level* reproduction (focus field → Backspace → assert `pointCount` decremented) needs a browser. The wiring above is fully static.

---

### L-2 · BLOCKER — dual mount: two editors, two `window` listeners, two divergent histories, and fullscreen edits are silently discarded on save

**Provenance**
- `VisualizationView.vue:204` — instance #1, `ref="editorRef"`, mounted while `store.contour` (see L-1).
- `VisualizationView.vue:282-285` — `<FullscreenViewer … :is-editing="isEditing" :contour="store.contour ?? undefined" …>` is rendered unconditionally.
- `FullscreenViewer.vue:107` `v-if="show"` → `FullscreenViewer.vue:115-120` — instance #2, `<ContourEditorCanvas v-if="isEditing && contour" …>`, **with no `@state-change` listener and no `ref`**.
- Reachability: `VisualizationView.vue:210` renders `CanvasControlsDock` when `isEditing && store.contour`, and `:221` wires `@toggle-fullscreen="showFullscreen = true"`. Entering fullscreen *while editing* is a one-click path.
- `VisualizationView.vue:92-96` — `onEditorSave()` reads `editorRef.value.getPoints()`, i.e. **instance #1 only**.

**The defect.** With both mounted: (i) two `window` keydown handlers (`:210`) — one ⌘Z fires `doUndo()` on both instances against two *independent* `points`/`history` pairs, and `preventDefault` is called twice; (ii) each instance keeps its own `magnetRadius` (`:38`), and the dock's magnet slider writes only instance #1 (`VisualizationView.vue:82-85`), so the fullscreen editor silently ignores the magnet setting shown in the UI; (iii) the fullscreen instance's `stateChange` is emitted into the void (`FullscreenViewer.vue:115` has no listener), so the dock's Undo/Redo/pointCount reflect the *background* editor while the user edits the *foreground* one; (iv) **the data-loss arm** — the save button lives on `EditorControlsDock` inside `.controls-overlay` (`VisualizationView.vue:238-248`), which sits at `z-index: var(--z-controls)` *behind* the fullscreen backdrop at `var(--z-fullscreen)` (`FullscreenViewer.vue:151`), so the user must exit fullscreen to save — and on exit, `onEditorSave` persists instance #1's points, which never received the fullscreen edits. The work is destroyed with a success indicator.

**Falsifier.** Dies if the fullscreen path unmounts the background editor — it does not; `VisualizationView.vue:203`'s `v-if` is `store.contour`, unrelated to `showFullscreen`. Dies if `FullscreenViewer` teleports the *same* instance rather than mounting a new one — `FullscreenViewer.vue:7,115` is a fresh `import` + fresh element, and the Teleport (`:105`) moves only its own subtree. Dies if `onEditorSave` could reach instance #2 — `editorRef` (`VisualizationView.vue:80`) is bound at `:204` only; `FullscreenViewer.vue:115` declares no `ref` and forwards none.
**UNPROVEN-NEEDS-LIVE (SS-13):** the double-undo *observation* needs a browser; the two-instances-one-`editorRef` wiring is static and complete.

---

## §2 · MAJOR (7)

### L-3 · MAJOR — the drag never re-emits state: Undo stays disabled for one whole extra interaction. Root cause is a two-level composable-contract defect.

**Provenance**
- `ContourEditorCanvas.vue:239-240` — `@pointerup="onPointerUp"` / `@pointercancel="onPointerUp"` bind the **raw** composable handler.
- `usePointDrag.ts:54-60` — `onPointerUp()` calls `onDragEnd()` and nothing else.
- `ContourEditorCanvas.vue:42-47` — `onDragEnd` is bound to `pushHistory` alone.
- Contrast `ContourEditorCanvas.vue:154-157` — `onPointPointerDown` *is* wrapped to call `emitState()`. The author wrapped one end of the drag and not the other.
- `EditorControlsDock.vue:74` — `<DockIconButton :disabled="!canUndo">`, fed from `VisualizationView.vue:79,87-90,239`.

**The defect.** Drag #1: pointerdown → `emitState()` publishes `canUndo=false` (correct at that instant, `historyIndex===0`). pointerup → `pushHistory()` moves `historyIndex` to 1 → `canUndo()` is now true → **nothing is emitted**. The Undo button stays greyed until the user starts an unrelated interaction. First-drag undo is unreachable by mouse; the only escape is ⌘Z, which is the L-1 hijack.

**Root cause (this is the library finding, not the symptom).** `useContourHistory.ts:32-33` returns `canUndo`/`canRedo` as **plain functions**, not `computed`. A `ComputedRef<boolean>` would let `VisualizationView` bind the dock directly and delete `emitState()` and the whole `stateChange` payload. Because they are functions, every mutation site must remember to re-push a manual snapshot, and `usePointDrag.ts:8`'s single narrow `onDragEnd: () => void` seam gives the component no place to hook the other half.

**Falsifier.** Dies if `emitState` is reachable from the pointerup path — trace it: `:239` → `usePointDrag.ts:54` → `onDragEnd()` = `pushHistory` (`useContourHistory.ts:8-13`); no emit, no watcher on `historyIndex` anywhere in the component (grep: `historyIndex` is not even destructured at `:41`). Dies if the dock does not gate on the emitted flag — `EditorControlsDock.vue:74` proves it does.

### L-4 · MAJOR — magnet index aliasing: at `radius ≥ n/2` neighbours are displaced twice, and at `offset ≡ 0 (mod n)` the dragged vertex displaces *itself* off the cursor

**Provenance** `usePointDrag.ts:33-49`; radius domain `EditorControlsDock.vue:51` (`Math.max(0, Math.min(10, …))`) and `:118` (`:max="10"`); default `ContourEditorCanvas.vue:38` (`ref(3)`); the point-count floor `ContourEditorCanvas.vue:180` (`points.value.length <= 3` → the array can reach **n = 3**); `applySimplify` drives n down 20% per press toward `Math.max(4, …)` (`contourEditing.ts:102-103`).

**The defect.** `before = (dragStartIdx - offset + n) % n` and `after = (dragStartIdx + offset) % n` are computed with **no bound against `n`**. Three failure regimes:
- `offset ≡ 0 (mod n)` → `before === after === dragStartIdx`. Worked example, n=3, radius=3, dragging index 0: offset 3 gives `before = (0-3+3)%3 = 0`, `after = (0+3)%3 = 0`, `falloff = 1 - 3/4 = 0.25`, so `points[0]`, which line 31 had just set to the cursor position `pt`, is overwritten twice with `pt + 0.25·(dx,dy)`. The grabbed vertex sits permanently offset from the pointer and inverts direction relative to the cursor on reversal.
- `offset ≡ n/2 (mod n)` (n even) → `before === after`, one node displaced twice in a single offset step.
- `radius > n/2` generally → the `before` ring and the `after` ring overlap, so wrapped nodes receive two displacements at *different* falloffs. n=15, radius=10: node `idx+7` is written at falloff 4/11 (as `after`, offset 7) and again at falloff 3/11 (as `before`, offset 8). The magnet's declared "falloff" profile is not the profile applied.

The default radius of 3 makes the first regime live at n = 3, and the slider's max of 10 makes the third live for any contour under ~21 points — reachable in three presses of Simplify from a 40-point contour.

**Falsifier.** Dies if a clamp exists — `usePointDrag.ts:34-36` reads `const radius = magnetRadius.value; if (radius > 0) { for (let offset = 1; offset <= radius; offset++)`, with no `n` term. Dies if `n` cannot fall below `2·radius` — `ContourEditorCanvas.vue:180` permits n=3 and `EditorControlsDock.vue:118` permits radius=10. Dies if duplicate writes were idempotent — they are additive reads-of-self (`points.value[before].x + dx * falloff`), so they compose.

### L-5 · MAJOR — unbounded, deep-reactive undo history over a 1024-point default. The census calls it a "ring"; it is not one.

**Provenance** `useContourHistory.ts:5` `const history = ref<Point2D[][]>([])`; `:8-13` `pushHistory` appends with **no cap and no eviction**; `ContourEditorCanvas.vue:34` `const points = ref<Point2D[]>([])`; default point count `lib/defaults.ts:8` `n_points: 1024` (slider domain 128–4096, `BasisSelector.vue:186-188`).

**The defect.** Two compounding costs. (i) `ref` (not `shallowRef`) makes every one of the 1024 `Point2D` objects a `reactive` proxy on first access, and `history` is *also* a deep `ref`, so each snapshot's 1024 objects are proxied too. (ii) `pushHistory` fires on every drag end (`usePointDrag.ts:56`), every insert (`:150`), delete (`:183`), smooth (`:190`) and simplify (`:197`), with no ceiling. A hundred-edit session at the 4096-point setting retains ~410k point objects plus their proxy metadata, none of it reclaimable until the `props.contour` identity changes. Nothing in `useContourHistory.ts`'s 36 lines caps, prunes, or coalesces.

**Corpus contradiction (explicit, as required).** `formation/fourier/lane-frontend.md:122` describes `useContourHistory.ts` as an "**undo/redo ring**". The tree disagrees: there is no ring buffer, no modulus, no capacity constant — `useContourHistory.ts:10-12` is `slice(0, i+1)` + `push`, an unbounded stack with branch truncation. **The census row is wrong on this word.** Correct it to "unbounded undo/redo stack with redo-branch truncation".

**Falsifier.** Dies if a cap exists — read all 36 lines of `useContourHistory.ts`; the only numeric literals are `-1` and `1`. Dies if `shallowRef` were used — `:5` and `ContourEditorCanvas.vue:34` are both `ref`. Dies if snapshots were structurally shared — `:9` and `:28` both do `.map(p => ({...p}))`, a full copy every time.
**UNPROVEN-NEEDS-LIVE (SS-13):** the heap-delta figure needs a `take_heapsnapshot`; the unboundedness is static.

### L-6 · MAJOR — out-of-band `defineExpose` mutable state, written by the parent. This is the exact anti-pattern the file's own sibling documents as cured at B.W2.

**Provenance**
- `ContourEditorCanvas.vue:217-227` — `defineExpose({ …, points, magnetRadius })` exposes two **live refs** as component API.
- `VisualizationView.vue:82-85` — `const magnetRadius = computed({ get: () => editorRef.value?.magnetRadius ?? 0, set: (v) => { if (editorRef.value) editorRef.value.magnetRadius = v } })` — the parent **writes into the child's internal ref** through the expose proxy.
- `VisualizationView.vue:257` — `<ContourPreview :points="editorRef?.points" />` — a sibling component reads the child's internal array through the same channel.
- **The precedent, in this very file:** `VisualizationView.vue:75-77` — *"B.W2 — `CanvasControlsDock` now emits `update:expanded` (sibling W2-C converts its out-of-band `defineExpose(dockExpanded)` to a typed emit); the parent owns the `dockExpanded` ref and listens via `v-model:expanded`."*

**The defect.** The repo ruled this pattern out and migrated one component off it, leaving `ContourEditorCanvas` as unmigrated residue — with a *worse* instance, because `magnetRadius` is written back (not merely read) and `points` is a 1024-element mutable array handed to a sibling. `magnetRadius` is a textbook `v-model` prop (`defineModel<number>()`, matching `EditorControlsDock.vue:43`'s existing `"update:magnetRadius"`), and `points` is a textbook `stateChange` payload field or a store selector. The imperative surface (`undo/redo/applySmooth/applySimplify/deleteSelected/resetToExtraction/getPoints`, `:218-224`) *plus* the declarative `stateChange` emit is a **dual control channel** — and L-3 is precisely the failure mode a dual channel produces: the two channels drift.

Secondary consequence: `VisualizationView.vue:83`'s getter returns `0` until `editorRef` resolves post-mount, so the dock paints the magnet icon **off** (`EditorControlsDock.vue:106`, `magnetRadius > 0 ? 'text-viz-fourier' : ''`) while the editor is actually running at radius 3 (`:38`).

**Falsifier.** Dies if `magnetRadius` were already a prop — `ContourEditorCanvas.vue:18-22` declares exactly three props, none of them `magnetRadius`. Dies if the B.W2 precedent were about something else — `VisualizationView.vue:75-77` names `defineExpose` explicitly as the thing converted away. Dies if the expose were read-only — `VisualizationView.vue:84` assigns to it.

### L-7 · MAJOR — the viewBox is frozen at extraction bounds with no pan/zoom, so a point dragged past the 15% margin becomes unselectable and undeletable

**Provenance** `ContourEditorCanvas.vue:49-50, 59-67` (`stableBounds` computed once per `initFromContour`); `:72` the only re-init trigger is a `props.contour` **identity** change; `:29` `MARGIN = 0.15`; `:77-82` `viewBox`; `:285-297` `.editor-shell { overflow: hidden }`. No pan, no zoom, no wheel handler, no `useViewTransform` import anywhere in the file.

**The defect.** A vertex dragged beyond `bbox + 15%` leaves the visible frame and is clipped by the shell's `overflow: hidden`. It still participates in `closedSplinePath` (`:85`), so the curve visibly distorts, but the `<circle>` is off-canvas: it cannot be hit for selection (`:277`), therefore cannot be deleted (`:180` requires `selectedIdx !== null`), therefore cannot be dragged back. The only recovery is `resetToExtraction()` (`:201-203`), which discards **every** edit in the session. Note also the magnet (L-4, default on) drags neighbours outward too, so a single aggressive edge drag can strand a whole arc.

**Reuse miss (the library half of the claim).** `components/visualization/composables/useViewTransform.ts` (77 LOC, *same directory*) already implements pan/zoom → screen transform for the canvas path (`lane-frontend.md` component table). It is not consumed here.

**Falsifier.** Dies if bounds track live points — `:75` is `computed(() => stableBounds.value)` and `:74`'s own comment says *"use stable bounds for viewBox …, live bounds for nothing"*. Dies if a pan/zoom affordance exists — grep the file for `wheel`, `scale`, `zoom`, `pan`: the only `scale` is the fixed `scale(1,-1)` at `:243`. Dies if the shell did not clip — `:290` `overflow: hidden`.

### L-8 · MAJOR — per-`pointermove` cost is O(n) spline rebuild × 2 + O(n) DOM patch + a forced synchronous layout, with none of the coalescing the census credits the canvas path with

**Provenance** `ContourEditorCanvas.vue:238` `@pointermove="onPointerMove"`; `usePointDrag.ts:25-52` mutates `points.value` on every move; `ContourEditorCanvas.vue:85` `splinePath = computed(() => closedSplinePath(points.value))`; `contourEditing.ts:26-42` builds an n-iteration array of `C…` substrings and `join("")`s it; `ContourEditorCanvas.vue:268-278` `v-for` over the same array (1024 `<circle>` nodes); `VisualizationView.vue:257` → `ContourPreview.vue:10-14` runs `closedSplinePath` on the **same array** a second time; `ContourEditorCanvas.vue:133-142` `svgPoint` calls `svg.getScreenCTM()` **inside the move handler**.

**The defect.** `getScreenCTM()` is a forced style+layout flush; it is invoked once per pointermove, immediately before the same task mutates the reactive array that will dirty 1024 SVG attribute bindings and two 1024-segment path strings. Each pointermove is its own task, so Vue's scheduler coalesces *within* a move but not *across* moves — one full O(n) rebuild per event, at whatever rate the pointer emits (120 Hz+ on modern trackpads; the handler does not consult `getCoalescedEvents`). This is the precise contrast the census draws for the canvas path — `lane-frontend.md:557`: *"the epicycle loop is not draw-on-rAF … Redraws therefore coalesce on Vue's scheduler, not the raw frame clock."* The SVG editor gets the raw event clock with no rAF throttle and no batching.

Cheap structural fixes exist and are not taken: hoist `getScreenCTM()` to pointerdown (the CTM cannot change mid-drag — there is no pan/zoom, per L-7); `shallowRef` + explicit `triggerRef` for `points`; rAF-throttle the move handler.

**Falsifier.** Dies if the move handler is throttled — `usePointDrag.ts:25` is a bare handler, no rAF, no `requestIdleCallback`, no debounce. Dies if `getScreenCTM` were hoisted — `ContourEditorCanvas.vue:138` is inside `svgPoint`, called at `usePointDrag.ts:27`. Dies if the path were memoised on something coarser than the array — `:85` depends on `points.value` directly.
**UNPROVEN-NEEDS-LIVE (SS-13):** the per-move millisecond cost and the actual pointer event rate. The call graph and the absence of throttling are static and complete.

### L-9 · MAJOR — pointer capture is taken but `lostpointercapture` is never handled; a mid-drag DOM removal strands `dragging = true`

**Provenance** `usePointDrag.ts:22` `(e.target as Element).setPointerCapture(e.pointerId)`; `usePointDrag.ts:54-60` `onPointerUp` is the only reset; `ContourEditorCanvas.vue:238-240` — `pointermove`/`pointerup`/`pointercancel` are bound on the **`<svg>`**, not on the capturing `<circle>`; **no `lostpointercapture` handler exists in either file**; `ContourEditorCanvas.vue:269-270` the circles are `v-for` keyed by **array index**.

**The defect.** Capture is implicit-released and `lostpointercapture` fires when the capturing element leaves the DOM. Two live removal paths during a drag: (i) ⌘Z (L-1's unguarded branch, `:169-172`) replaces `points.value` with a shorter snapshot → index-keyed `v-for` unmounts trailing circles; (ii) `props.contour` identity change (`:72`) → `initFromContour` → same. Once capture is lost with the pointer outside the SVG, no `pointerup` reaches `:239`, so `dragging` (`usePointDrag.ts:10`) stays `true` and `dragStartIdx` stays set. The next hover over the SVG — **no button pressed** — resumes dragging the stale index. `pointercancel` is bound (`:240`) but does not cover capture loss.

This is a known-shape defect in the constellation: value.js's `ComponentSliders.vue` carries explicit `pointercancel`/`lostpointercapture` handlers "to recover from reka-ui slider pointer capture leaks" (project memory, iOS-Safari infrastructure). The cure is precedented; it is simply absent here.

**Falsifier.** Dies if `lostpointercapture` is handled — grep both files: zero occurrences. Dies if `dragging` had a secondary reset — `usePointDrag.ts:58` is the only write of `false`, reachable only from `onPointerUp`. Dies if capture were on the SVG rather than the circle — `:22` uses `e.target`, and the listener is `@pointerdown` on the `<circle>` (`:277`).
**UNPROVEN-NEEDS-LIVE (SS-13):** the stuck-drag reproduction. The missing handler and the sole reset path are static.

---

## §3 · MINOR (10) / INFO (2)

### L-10 · MINOR — dead emit declaration: `save` is declared and never emitted
`ContourEditorCanvas.vue:26` declares `save: [points: { x: number[]; y: number[] }]`. Grep the file for `emit(` → a single hit, `:124` (`stateChange`). The parent listens for `@save` on `EditorControlsDock` (`VisualizationView.vue:247`), not on the canvas (`:204-206`), and pulls points imperatively instead (`:94`). A dead public contract that misrepresents the component as declarative. **Falsifier:** dies if any `emit("save"` exists — it does not.

### L-11 · MINOR — dead bindings and a dead indirection
- `ContourEditorCanvas.vue:42` destructures `dragging` from `usePointDrag`; it is referenced nowhere in script or template. `web/tsconfig.json` sets neither `noUnusedLocals` nor `noUnusedParameters`, so the compiler cannot catch it (and `<script setup>` exposes all top-level bindings to the render context, masking it further).
- `ContourEditorCanvas.vue:75` `const bounds = computed(() => stableBounds.value)` is a pure alias with exactly one consumer (`:78`). Its own comment (`:74`) admits the second half is vestigial: *"live bounds for nothing"*.
- `useContourHistory.ts:35` returns `historyIndex`; no consumer destructures it (`ContourEditorCanvas.vue:41`).
**Falsifier:** dies if any of the three has a reader — grep `dragging`, `bounds`, `historyIndex` in the subject: 1, 2, 0 occurrences respectively, all at their definition/alias sites.

### L-12 · MINOR — the overlay-resize derivation is duplicated verbatim across the two render paths
`ContourEditorCanvas.vue:89-96` and `composables/useImageOverlay.ts:15-19` compute the identical value — `Math.round(Math.max(ib.maxX - ib.minX, ib.maxY - ib.minY))` with the identical fallback `contourSettings?.resize ?? 768` — from the identical source (`image_bounds`), for the identical consumer (`overlayUrl`, `lib/api.ts:296`). One is the SVG path, one is the Canvas2D path (census `lane-frontend.md:85-87`). `useImageOverlay.ts:12-14` even carries the explanatory comment that the SFC copy lacks. The correct home is one exported helper in `lib/contourEditing.ts` or `lib/api.ts`; the two copies can silently diverge on the next bounds-schema change. **Falsifier:** dies if the formulas differ — diff them character-for-character; they do not.

### L-13 · MINOR — bounds + flipped-Y viewBox math is duplicated a third time in `ContourPreview`, and the two copies already disagree
`ContourEditorCanvas.vue:60-67` + `:77-82` and `ContourPreview.vue:16-29` run the same min/max sweep and the same `${minX-pad} ${-(maxY+pad)} …` flipped-Y string. They already differ: the editor pads 15% with **separate** `padX`/`padY` (`:78-79`), the preview pads 10% and applies the **x-extent** to both axes (`ContourPreview.vue:26`, `const pad = (maxX - minX) * 0.1`). A tall thin contour is framed differently in the two surfaces, and the preview's y-padding is wrong in kind, not just in degree. `lib/contourEditing.ts` already owns `closedSplinePath`, which both files import — it is the obvious home for `contourViewBox(points, margin)`. **Falsifier:** dies if the pad rules match — `:78-79` vs `ContourPreview.vue:26`.

### L-14 · MINOR — an ungated infinite CSS animation on `filter`, over the full spline path
`ContourEditorCanvas.vue:323-330`: `.editor-svg:hover .spline-path { animation: golden-shimmer 1.2s ease-in-out infinite }`, animating `filter: drop-shadow(...)`. `filter` is not compositor-cheap; each keyframe step repaints the 1024-segment path. The repo's only reduced-motion blanket is `style.css:92-96`, which zeroes animation for `[data-state="active"][role="tabpanel"]` **and nothing else** — this keyframe is not covered. Census `lane-frontend.md:111-112` already books "the two rAF clocks themselves are ungated under PRM"; this is a third, CSS-side, ungated motion source. **Falsifier:** dies if a broader PRM rule exists — `grep -c "prefers-reduced-motion" style.css` → **1**, and that one block's selector is the tabpanel.

### L-15 · MINOR — the local `golden-shimmer` bypasses the repo's token pipeline
The literal `hsl(40 90% 55%)` appears **eight** times in the scoped block (`:261, :307, :308, :314, :319, :328, :329, :333`). The rest of the visualization resolves colour from CSS custom properties into `VIZ_COLORS` at boot and **re-resolves on dark-mode toggle via a `MutationObserver`** (`lib/colors.ts:76-94`; census `lane-frontend.md:553`), and `--viz-amber` exists (`lib/colors.ts:81`, `#b37a2d`). This component's amber is frozen at a different hue and cannot follow the theme. Related: `lib/golden-shimmer.ts` is the *shared* shimmer for the canvas surfaces (`BasisCanvas.vue:7`, `canvas-drawing/labels.ts:5`, `ConvergencePlot.vue:4`); the SVG surface reimplements the concept locally under the same name with an unrelated period (1.2 s vs `goldenShimmerAlpha`'s ~200 ms, `golden-shimmer.ts:12`). **Falsifier:** dies if `--viz-amber`/`VIZ_COLORS` were unavailable to a scoped SFC block — `EditorControlsDock.vue:199` proves otherwise (`.is-amber { --btn-hover-color: var(--viz-amber) }`).

### L-16 · MINOR — degenerate inputs are unguarded on three fronts
- **Empty contour:** `:60-67` seeds `minX = Infinity, maxX = -Infinity`; with `pts.length === 0` the sweep never runs, so `:67` yields `width: -Infinity - Infinity || 1` → `-Infinity` (truthy, so the `|| 1` guard does not fire), and `:81` emits `viewBox="Infinity -Infinity -Infinity -Infinity"` — an invalid attribute. `smoothClosedPoints` (`contourEditing.ts:200-201`) divides by `n = 0` → NaN centroid → the whole curve becomes NaN.
- **Ragged arrays:** `contourEditing.ts:7-9` `zipPoints` maps over `xs` and indexes `ys[i]` with no length check; a short `y` array silently yields `{x, y: undefined}` and NaN geometry downstream. `ContourAsset.points` is typed `{ x: number[]; y: number[] }` (`lib/types.ts:80`) — the type cannot express the equal-length invariant and nothing checks it.
- **Non-null assertions in the hot path:** `:134` `svgRef.value!` and `:138` `getScreenCTM()!`. `getScreenCTM()` returns `null` for an SVG that is not rendered — and this component is *routinely* in a hidden container (`VisualizationView.vue:203`, `is-hidden`, opacity-0). Opacity-0 still renders, so this is latent rather than live; a future `display:none` on that class turns it into a TypeError in the move handler.
**Falsifier:** dies if any guard exists — read `:53-70`, `contourEditing.ts:7-9`, and `:133-142`; there are none. The empty-contour arm additionally dies if the API cannot return an empty `points` — `lib/types.ts:80` permits it and no runtime validator was found.

### L-17 · MINOR — two enabled controls that silently do nothing, and one that pushes a no-op history entry
- `deleteSelected` bails at `points.value.length <= 3` (`:180`) but `canDelete` is emitted purely as `selectedIdx.value !== null` (`:127`), so `EditorControlsDock.vue:97`'s Delete button stays enabled and does nothing at n ≤ 3.
- `applySimplify` (`:194-199`) at n ≤ 6 gets the *same array object* back (`contourEditing.ts:99`, `return points`) yet still calls `pushHistory()` — an identical snapshot enters the stack, so Undo appears available and undoes nothing visible. Same for `result.length < 3` (`contourEditing.ts:187`).
**Falsifier:** dies if `canDelete` accounted for length — `:127` is the whole expression. Dies if `applySimplify` compared before pushing — `:195-197` is unconditional.

### L-18 · MINOR — undo history is destroyed by both Reset and Save
`resetToExtraction()` (`:201-203`) calls `initFromContour()`, whose `initHistory(pts)` (`useContourHistory.ts:27-30`) **replaces** the stack with a single entry — so the destructive Reset is itself un-undoable. The same path fires on save: `stores/workspace.ts:272` assigns `contour.value = markRaw(result)`, a new identity, which trips the `:72` watcher → full re-init → history gone, selection gone, `stableBounds` re-derived from the server's returned points (so the frame can jump if the server resamples). A save should not be an undo barrier. **Falsifier:** dies if `initHistory` preserved prior entries — `useContourHistory.ts:28` is a bare assignment. Dies if the watcher were guarded against post-save identity churn — `:72` has no equality test.

### L-19 · MINOR — inverted hover affordance and a dead transition
`.control-point` fills at `hsl(40 90% 55% / **0.6**)` (`:307`); `.control-point:hover` fills at `/ **0.5**` (`:314`) — hovering makes the target **fainter**, the opposite of every other affordance in the dock family (`EditorControlsDock.vue:207-209` brightens on hover). Adjacent: `:311` declares `transition: fill 0.15s, r 0.15s`, but `r` is bound to the constant `:r="3.5"` (`:273`) and no rule ever changes it — the `r` half is dead. **Falsifier:** dies if a rule varies `r` — grep the block for `r:`; none. Dies if 0.5 > 0.6.

### L-20 · INFO — three smaller library smells
- `.editor-shell` carries `tabindex="0"` (`:231`) with no focus handler, no `:focus` style, and no focus-scoped key handling — dead a11y furniture left over from the design L-1 abandoned.
- `svg.createSVGPoint()` (`:135`) is deprecated in favour of `new DOMPoint(...)` + `matrixTransform`; the file already uses the modern `matrixTransform` half (`:139`).
- **Class-name collision across two scoped sheets:** `.editor-shell` names the *component root* (`:231`) **and** the parent's wrapper div (`VisualizationView.vue:203`). `VisualizationView.vue:392-409` styles the wrapper (`.canvas-stage > .editor-shell`) while `FullscreenViewer.vue:163-170` reaches the *component root* under the same name via `:deep(.editor-shell)` to strip its border and radius. The same selector means different elements depending on mount, and the fullscreen chromeless treatment is a parent-side `:deep` override rather than a component variant — the "style at the root component level, not per-instance overrides" precept in the value.js corpus. **Falsifier:** dies if the two elements were the same — `VisualizationView.vue:203` wraps `:204`.

### L-21 · INFO — zero automated coverage of the entire interaction surface
`find web -name "*.test.ts"` → **none**; there is no `vitest.config.*` and no `test` script in `web/package.json`. So `contourEditing.ts`'s 90-line indexed-min-heap simplifier, the magnet falloff, the history stack and the coordinate flip have **no unit tests at all**. On the e2e side, `web/e2e/visualization-ux.spec.ts:211-213` is the only contour-save assertion and it is `test.fixme` with a documented RED baseline; `contour-extraction.spec.ts` drives extraction controls, never the editor. Every defect L-1..L-9 above would be caught by a first unit test. **Falsifier:** dies if a runner exists — no config, no script, no test file.

---

## §4 · R5-7 — the native-template-loop invisibility class, applied

**The class (adopted, not re-derived).** `intakes/lane-fourier-r3-r6.md` **R5-7** (ADOPT-AS-FACT, CARRY→F.W4): *"template-loop evidence keyed to component callsites is blind to native HTML element loops"* — proven by `instance.loop.paper-sidebar` deriving to literally `[]` while the sibling `instance.loop.presets` is populated and keyed by `"callsiteId": "callsite:web/src/components/equation/FunctionInput.vue:157:Tooltip:0.0.0.0.3.1.0"`. **R6-5/R6-6** cure it with the `NATIVE_TEMPLATE_LOOP` family (`nativeTemplateLoops: 16`).

**Where it applies here.** `ContourEditorCanvas.vue:268-278` is a `v-for` over `points` on a **native `<circle>`** element. It registers no component callsite, so every instance derivation keyed on component callsites reports this component's loop leaf as empty — exactly the `PaperSidebar.vue` shape, in the visualization domain rather than the paper domain.

**Two sharpenings this component contributes over the R5-7 baseline.**

1. **Quantitatively it is the worst instance in the repo, by an order of magnitude.** R5-7's exemplar is `PaperSidebar.vue`'s three nested `<li v-for>` loops rendering a table of contents — tens of rows. This loop's cardinality is `points.length`, defaulting to **1024** (`lib/defaults.ts:8`) and reaching **4096** at the slider's max (`BasisSelector.vue:186-188`). A component-callsite-keyed instance denominator therefore under-counts fourier's largest single DOM loop by ~1024–4096 nodes — and it is a loop whose nodes are *interactive* (`@pointerdown`, `:277`), not decorative. Any F.W4 per-component D/L/C denominator built without `NATIVE_TEMPLATE_LOOP` will rank this component as trivially small when it is the heaviest template loop in the tree.

2. **A same-line tag/`v-for` heuristic misses it too — a second-order blind spot.** The tag sits on `:268` and the `v-for` on `:269`. A naive line-local deriver that reads the element name from the `v-for` line recovers nothing here. Demonstration: `grep -rn "v-for" --include="*.vue" web/src` returns **33** loops, of which a same-line `<tag …v-for` match resolves only **5** (4 `<li>`, 1 `<template>`) — the other 28, this one included, have their tag on a prior line. R6's cure must key off the parsed AST element node, not a textual line window.

**Falsifier for §4.** This section dies if the `NATIVE_TEMPLATE_LOOP` re-derivation, run against `cd26c65`, **does** emit a row for `ContourEditorCanvas.vue:269` with expression `(pt, i) in points`. Run it and check; the R6 artifact reported 16 native loops repo-wide against a 33-loop `v-for` population, so at least the arithmetic leaves room for this one to be present. It also dies if the loop is component-keyed after all — `:268` is `<circle`, an SVG built-in with no component registration (`ContourEditorCanvas.vue:1-16` imports no `Circle` component).
**UNPROVEN-NEEDS-LIVE:** none — this is a static-derivation claim, falsifiable by re-running the deriver, not by a browser.

---

## §5 · Superlatives (4) — L-18 runs both ways

### S-1 · The Visvalingam-Whyatt simplifier is genuinely first-rate, and its documentation is honest about its own deviation
`lib/contourEditing.ts:72-188`. An **indexed** binary min-heap (`pos[]` permutation with a `-1` sentinel, `:126-131`) over a circular doubly-linked list held in **parallel typed arrays** — `Float64Array` for coordinates and areas, `Int32Array` for links and heap permutation, `Uint8Array` for the live bitmap (`:106-111`) — giving O(log n) per removal and O(n log n) overall, with an O(n) Floyd build (`:157`). Two things lift this above competent: the header (`:78-81`) *names the algorithmic complexity it replaced* ("The prior implementation scanned the full node array on every removal: O(n²) … effectively O(n³) when removal fractions scale with n"), and `:87-93` explicitly declares the deviation from strict VW (unrestricted re-key rather than parent-lifting) **and argues why it is acceptable for resampled contours**. Declaring your own approximation is rarer than implementing the heap.

I also checked the subtle part rather than assuming it: `reheapify` (`:155`) does `siftUp(k); siftDown(pos[heap[k]])`, which reads wrong at first glance. It is correct in both directions. On a key *increase* (the common case after a splice) `siftUp` breaks immediately, `heap[k]` is unchanged, and `siftDown(k)` is the right call. On a key *decrease*, `siftUp` moves the node up and leaves its former parent P at position k; because the heap property held beforehand, P ≤ the node's old key ≤ that node's children, so `siftDown(k)` on P is a correct no-op. **Falsifier:** a case where `reheapify` leaves the heap disordered, or a benchmark at n = 1024 where the heap loses to the array scan. I constructed neither, and the argument above closes both directions of the key change.

### S-2 · Centroid-preserving Laplacian smoothing — the compensation most implementations omit
`lib/contourEditing.ts:190-222`. Iterated Laplacian smoothing shrinks a closed curve toward its centroid; the vast majority of shipped implementations just accept the shrink. This one captures the centroid before (`:200-201`), recomputes after (`:217-218`), and translates the result back (`:219-221`) — so repeated Smooth presses relax curvature without walking the contour off its registration with the source image, which matters precisely because the image overlay is pinned to `image_bounds` in the same data space. **Falsifier:** show that the restoration is a no-op or wrong — it is neither; `alpha = 0.4` over 4 iterations produces a measurable centroid drift that `:219-221` cancels exactly (translation is centroid-linear).

### S-3 · Freezing the viewBox against live points is the *correct* call, and the code says why
`ContourEditorCanvas.vue:49-50, 74-75`. A viewBox derived from live points creates a feedback loop: dragging a boundary vertex rescales the whole scene, which moves the cursor's data-space position, which moves the vertex — visible jitter and unusable edge editing. The author saw it, chose stable bounds, and left the reason in the tree (`:49`, `:74`). This is the right decision. My L-7 is *not* an argument against it — the missing piece is a pan/zoom escape hatch (`useViewTransform.ts`, 77 LOC, same directory), not live bounds. **Falsifier:** show that live bounds would be stable — they would not, for the coupling reason above; and the alternative the component would need (recompute-on-release) is strictly more complex than reusing the existing transform composable.

### S-4 · The image overlay is placed from the authoritative document rectangle, consistently across two independent render paths
`ContourEditorCanvas.vue:98-108` derives the overlay rect from `contour.image_bounds` — the extraction's own data-space rectangle — rather than guessing from the viewBox or the raster's pixel dimensions, and `:252` counter-flips it (`translate(0, y*2 + h) scale(1,-1)`) so the raster reads upright inside the `scale(1,-1)` group at `:243`. That is the correct decomposition of a flipped coordinate system, and it is the *same* decision the Canvas2D path makes independently (`useImageOverlay.ts:74-90`, `view.toScreen(bounds.minX, bounds.maxY)` / `(bounds.maxX, bounds.minY)`). Two render paths, one geometric authority, pixel-aligned by construction — census `lane-frontend.md:85-87` books three canvases and twelve SVG surfaces, and this is one of the few places where an SVG surface and a canvas surface provably agree on geometry. **Falsifier:** a divergence between the two placements — I diffed them; they resolve the same rectangle from the same field. (The *derivation duplication* is L-12; the *decision* is correct in both copies.)

---

## §6 · Ledger

| Class | Count | Rows |
|---|---|---|
| BLOCKER | **2** | L-1, L-2 |
| MAJOR | **7** | L-3 … L-9 |
| MINOR | **10** | L-10 … L-19 |
| INFO | **2** | L-20, L-21 |
| **Defects total** | **21** | L-1 … L-21 |
| Superlatives | **4** | S-1 … S-4 |
| Corpus contradictions | **1** | `lane-frontend.md:122` "undo/redo **ring**" → unbounded stack (§L-5) |
| Corpus rows extended | **2** | R5-7 (§4, two sharpenings), `lane-frontend.md:111-112` PRM (§L-14) |
| `UNPROVEN-NEEDS-LIVE` (SS-13) | **5 partial** | L-1 (keystroke repro), L-2 (double-undo observation), L-5 (heap delta), L-8 (per-move ms), L-9 (stuck-drag repro) — every one has a fully static wiring proof behind it |

**Root-cause clustering (what a repair wave should actually attack, in order).**
1. **Ownership inversion** — L-6 is upstream of L-2, L-3 and half of L-1. Convert `magnetRadius` to `defineModel`, `points` to an emitted payload or store selector, `canUndo`/`canRedo` to `computed`, and retire `defineExpose`'s state arm. L-3 disappears; the dual-mount divergence in L-2 becomes structurally impossible.
2. **Event scoping** — move the keydown listener from `window` to `.editor-shell` (which already has `tabindex="0"`, `:231`) and gate on `isEditing`. Kills L-1 whole and defuses L-9's undo-during-drag path.
3. **Composable seams** — `usePointDrag`'s `onDragEnd` needs to be the full drag-end hook (or the component must bind a wrapper, as it already does for pointerdown at `:154`); clamp `radius` against `n` (L-4); add `lostpointercapture` (L-9).
4. **Shared geometry** — lift `resizeFromBounds` (L-12) and `contourViewBox` (L-13) into `lib/contourEditing.ts`, which both consumers already import.

**Superlative honesty note.** S-1 and S-2 are in `lib/contourEditing.ts`, not in the SFC. The pure-math substrate this component sits on is excellent; the defect mass is concentrated in the SFC's ownership, event-scoping and lifecycle wiring, plus the two thin composables. That distribution is itself the finding: the 340-line SFC is not over-size for Goldilocks (it is mid-pack for `components/visualization/`, `lane-frontend.md` table), but it is over-*responsibility* — bounds derivation, overlay URL derivation, coordinate transform, global keyboard shortcuts, a history wrapper, an imperative expose API and a state-emit channel, all in one file, with no single one of them large enough to have forced a split.
