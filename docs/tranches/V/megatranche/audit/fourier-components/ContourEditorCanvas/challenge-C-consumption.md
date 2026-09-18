claude-opus-5[1m]

# CHALLENGE — `ContourEditorCanvas.vue` · axis C (CONSUMPTION)

**Target** `web/src/components/visualization/ContourEditorCanvas.vue` (340 lines)
**Evidence root** `/Users/mkbabb/Programming/fourier-analysis` (READ-ONLY; all `web/…` and `api/…` paths below are relative to it)
**Method** static + source-derived only. No browser tooling. Livable-only claims carry `UNPROVEN-NEEDS-LIVE` for SS-13.
**Posture** the component is presumed DEFECTIVE until the tree proves otherwise. Every claim below — defect and superlative alike — carries its own falsifier (L-18 runs both ways).

**Tally** 27 defects (3 BLOCKER · 9 MAJOR · 11 MINOR · 4 INFO) · 5 superlatives.

---

## 0. Read set

Component whole, plus every file it imports, read in full:

| File | Lines | Role |
|---|---|---|
| `web/src/components/visualization/ContourEditorCanvas.vue` | 340 | target |
| `web/src/lib/types.ts` | 391 | `ContourAsset`, `ImageBounds`, `ContourSettings` |
| `web/src/lib/contourEditing.ts` | 222 | `Point2D`, spline, VW simplify, Laplacian smooth |
| `web/src/lib/api.ts` | 672 | `overlayUrl`, `saveContour`, the 45-op client surface |
| `web/src/stores/workspace.ts` | 471 | `contour`, `contourSettings`, `saveContourPoints` |
| `web/src/components/visualization/composables/useContourHistory.ts` | 36 | undo/redo |
| `web/src/components/visualization/composables/usePointDrag.ts` | 67 | drag + magnet |

Seam set (read to establish the contract, not part of the import closure): `VisualizationView.vue`, `FullscreenViewer.vue`, `EditorControlsDock.vue`, `ContourPreview.vue`, `composables/useImageOverlay.ts`, `lib/colors.ts`, `lib/golden-shimmer.ts`, `lib/easings.ts`, `lib/defaults.ts`, `api/routers/contours.py`, `api/routers/images.py`, `api/responses.py`, `api/services/computation.py`, `api/services/image_storage.py`, `api/dependencies.py`, `e2e/visualization-ux.spec.ts`.

**Installed versions verified on disk** (`web/node_modules/*/package.json`): `@mkbabb/value.js` **0.13.0**, `@mkbabb/glass-ui` **4.0.0**, `@mkbabb/keyframes.js` **4.3.0**. `web/package.json` pins `^0.13.0` / `^4.0.0` / `^4.3.0`.

**Corpus folded** — `formation/fourier/lane-frontend.md:86` (census row, 340 lines), `:565` (SVG-surface roster), `:619` (PRM `reduce` roster — `ContourEditorCanvas` absent, corroborating the M-audit E5-06 gap); `audit/codex-provenance/intakes/lane-fourier-r3-r6.md` **R6-8** (operation↔client leaf coupling, `ADOPT-AS-FACT` + `CARRY-TO-WAVE → F.W5`) is cited at C-2 where the tree reproduces its exact shape on a *different* operation. Fourier's own prior audits (`docs/audits/runs/2026-06-16-M-deep-audit`, `2026-06-17-M-critique-audit`, `2026-06-01-constellation-ui`) already own the PRM gap (E5-06/E5-10), the bare-`ease` gap, and the grid-pitch/opacity gap on this file; those are **cited, not re-invented** (C-23, C-12 rider). Nothing in the hitherto corpus contradicts the findings below; §4 records the one place this challenge **corrects** a corpus claim.

---

## 1. Consumption verdict, stated once

`ContourEditorCanvas.vue` consumes, in total:

- **value.js 0.13.0** — **zero imports.** (5 other files in the tree do import it.)
- **keyframes.js 4.3.0** — **zero imports.** It hand-rolls a component-scoped `@keyframes` instead.
- **glass-ui 4.0.0** — **zero component imports.** It is the only interactive component in `web/src/components/visualization/` with no glass-ui import (30 sibling files have one; `lane-frontend.md:306-309` shows the sibling pattern). It consumes glass-ui only *transitively*, via five CSS custom properties (`--radius`, `--border`, `--card`, `--foreground`, `--background`) that arrive from `@import "@mkbabb/glass-ui/styles"` at `web/src/style.css:3`.
- **fourier API** — **one leaf of 45**: `overlayUrl` (`web/src/lib/api.ts:296-298`), a URL *builder*, not a fetch. Every mutating call it participates in is routed through the parent.

That is the axis in one line: this component is a **consumption hole**. The three libraries the tranche is measuring are, here, un-consumed; the two seams it does own (the overlay operation and the save round-trip) are both broken; and the props/emits contract it publishes is partly fictional.

---

## 2. Defects

### C-1 · BLOCKER · silent contour mutation from a global key listener that outlives edit mode

`ContourEditorCanvas.vue:209-215` registers `onKeyDown` on `window` for the component's entire mounted lifetime, with no target filter and no edit-mode gate:

```
onMounted(() => { window.addEventListener("keydown", onKeyDown); });
```

`onKeyDown` (`:164-177`) fires `deleteSelected()` on `Delete`/`Backspace` whenever `selectedIdx.value !== null`, and `doUndo()`/`doRedo()` on `Cmd/Ctrl+Z`, `Cmd/Ctrl+Shift+Z`, `Cmd/Ctrl+Y` — each with `e.preventDefault()`.

The component is **not** unmounted when the user leaves edit mode. `VisualizationView.vue:203` mounts it under `v-if="store.contour"` and hides it with a **class**, not `v-if`:

```
<div v-if="store.contour" class="editor-shell" :class="{ 'is-hidden': !isEditing }">
```

and `VisualizationView.vue:404-409` defines `is-hidden` as `opacity: 0; z-index: 0; pointer-events: none` — the element stays in the DOM and the listener stays live.

`selectedIdx` also survives the transition: `deselect()` is called only from `initFromContour`, `doUndo`, `doRedo`, `onBgClick`, `deleteSelected`, `applySmooth`, `applySimplify` (`:57, 113, 119, 160, 182, 189, 196`). Nothing watches `isEditing` — the component does not receive it at all.

**Failure scenario.** Enter edit mode → click a control point (`selectedIdx = 5`) → toggle edit off (`CanvasControlsDock` `@toggle-edit`) → the editor is invisible and inert → press `Delete`. `deleteSelected()` runs on the hidden instance: point 5 is spliced out, history is pushed, `stateChange` is emitted to a parent that is no longer showing the dock. The user sees nothing. On the next Save, `VisualizationView.vue:95` calls `editorRef.value.getPoints()` — which returns the **mutated** buffer — and POSTs it. A contour point is destroyed with no visible surface and no undo affordance.

**Falsifier.** Show either (a) a `v-if="isEditing"` on the editor mount, (b) a watcher that deselects or unbinds on edit-mode exit, or (c) a target/edit-mode guard inside `onKeyDown`. None of the three exists; `grep -n "isEditing" ContourEditorCanvas.vue` returns nothing.

**Rider (route-conditional, honest scope).** The `preventDefault()` on `Backspace` would additionally swallow the key in any focused text field. On `/visualize` today there is no text input in the left panel (`ContourSettings.vue` uses `Select` + `SliderControl` only), so *that* consequence is currently latent. The silent-mutation consequence above is not.

---

### C-2 · BLOCKER · the image overlay dies on the first save — `POST /api/contours` returns `image_bounds: null`

The component's overlay is gated on `imageOverlayRect` (`:99-108`), which is `null` whenever `props.contour.image_bounds` is null, and the template requires it (`:246`):

```
v-if="showImageOverlay && overlayHref && imageOverlayRect"
```

`image_bounds` is produced **only** on the extraction path — `api/services/computation.py:83-88` builds `{minX: -rw/2, maxX: rw/2, minY: -rh/2, maxY: rh/2}` and `api/routers/images.py:262` passes it into `store_contour_asset(..., image_bounds=image_bounds)`.

The **editor save path does not**. `api/routers/contours.py:22-26`:

```python
@router.post("")
async def save_contour(req: SaveContourRequest):
    xs = req.points.get("x", []); ys = req.points.get("y", [])
    doc = await store_contour_asset(xs, ys, req.image_slug, source="editor")   # image_bounds defaults to None
    return contour_response(doc)
```

`store_contour_asset` (`api/services/image_storage.py:285-291`) declares `image_bounds: dict | None = None` and writes it verbatim at `:317`. `contour_response` (`api/responses.py:21`) echoes `asset.get("image_bounds")` → `null`. Crucially, this route does **not** go through `api/dependencies.py:102-103`, which is where the lazy backfill lives — only `GET /api/contours/{hash}` does.

The client assigns that response straight into the store: `web/src/stores/workspace.ts:271` `contour.value = markRaw(result)`. The component's `watch(() => props.contour, …)` (`:72`) fires, and from that moment `imageOverlayRect` is `null`.

**Failure scenario.** Turn on the image overlay to trace a contour → nudge one point → press Save → the reference photograph vanishes from underneath the spline and cannot be brought back with the overlay toggle. It returns only after a full page reload, which routes through `getContour` → `_backfill_image_bounds`. The tree *knows* this: `web/src/stores/workspace.ts:152-154` carries the comment *"Re-fetch contour from API if draft is missing image_bounds (triggers lazy backfill on the backend)"* — a workaround installed on the **load** path while the **save** path was left leaking.

**R6-8 correspondence (intake lane, `lane-fourier-r3-r6.md:142`, ADOPT-AS-FACT).** R6-8 established that *"an API-operation model that embeds derived client back-references cannot attribute a defect to one side of the seam"* on `visualization-update`. This is the same pathology on a different operation: `operation:POST:/api/contours` emits a `ContourAssetResponse` whose `image_bounds` is contractually nullable, while `client:saveContour` (`web/src/lib/api.ts:316-325`) types it `Promise<ContourAsset>` with `image_bounds: ImageBounds | null` (`web/src/lib/types.ts:76`) and every consumer treats null as "no overlay" rather than "not yet derived". The nullability is a *derivation-state* flag masquerading as a *data-absence* flag, and neither side owns it. **I extend R6-8 rather than merely citing it**: the carry to F.W5 should read *keep derivation-state out of the value domain* as well as *keep operation identity independent of client identity*.

**Falsifier.** Show `image_bounds` being computed or backfilled on the `POST /api/contours` path, or show a client-side re-fetch after `saveContourPoints`. `grep -n "image_bounds" api/routers/contours.py` returns nothing; `saveContourPoints` (`workspace.ts:263-283`) issues no follow-up `getContour`.

---

### C-3 · BLOCKER · fullscreen mounts a second, uncontrolled, unsavable editor — and a second global key listener

`FullscreenViewer.vue:115-120` mounts a **second** `ContourEditorCanvas` from the same `contour`:

```
<ContourEditorCanvas v-if="isEditing && contour" :contour="contour"
    :image-slug="imageSlug ?? null" :show-image-overlay="showImageOverlay" />
```

with **no `ref`**, **no `@state-change`**, and **no `@save`**. The inline instance in `VisualizationView.vue:204` is *not* unmounted when fullscreen opens (it is class-hidden, C-1). `FullscreenViewer.vue:130` gates its control dock on `v-if="!isEditing"`, and `EditorControlsDock` is never rendered inside the viewer at all.

Three consequences, each independently checkable:

1. **Both instances run `window.addEventListener("keydown", onKeyDown)` concurrently** (`:210`). One `Cmd+Z` steps *both* undo stacks; one `Delete` deletes a point in *each*, at *each instance's own* `selectedIdx`. The two buffers diverge immediately and irreversibly.
2. **Fullscreen edits are unreachable.** `VisualizationView.onEditorSave` (`:93-97`) reads `editorRef.value.getPoints()` — the *inline* instance. Nothing holds a handle to the fullscreen one. Every drag, insert, delete, smooth and simplify performed in fullscreen is discarded on close.
3. **Fullscreen edit mode has no controls whatsoever** — no Save, Undo, Smooth, Simplify, magnet slider, or point count. The only reachable operations are pointer drag, dbl-click insert, and the keyboard shortcuts — which, per (1), also hit the hidden instance.

**Falsifier.** Show a `ref` + `@state-change`/`@save` wiring on `FullscreenViewer.vue:115`, or an `EditorControlsDock` inside the viewer, or a guard preventing concurrent mounts. `grep -n "editorRef\|state-change\|EditorControlsDock" FullscreenViewer.vue` returns nothing.

---

### C-4 · MAJOR · `stateChange` is not emitted on pointerup — the parent's `canUndo` and `isSaved` lag by exactly one drag

The component wraps `onPointPointerDown` to append `emitState()` (`:154-157`) but wires the **raw** composable handler for pointerup (`:239-240`):

```
@pointerup="onPointerUp"
@pointercancel="onPointerUp"
```

`usePointDrag.onPointerUp` (`usePointDrag.ts:54-60`) calls `onDragEnd()` — which is `pushHistory` (`:46`) — and nothing else. `emitState()` is never reached.

**Failure scenario (arithmetic).** Fresh editor: `historyIndex = 0`, `canUndo() === false`; parent `editorState.canUndo = false`. Drag a point → pointerdown fires `emitState()` (still `canUndo: false`) → pointerup pushes history, `historyIndex = 1`, `canUndo() === true`, **no emit**. The Undo button in `EditorControlsDock.vue:74` (`:disabled="!canUndo"`) stays **disabled** even though an undoable edit exists. It only unlocks on the *next* pointerdown. The parent's view of undo state is permanently one drag stale.

The same omission corrupts the save indicator: `VisualizationView.vue:88-91` clears `editorSaved` inside `onEditorStateChange`. After a Save, `editorSaved = true` and the dock shows a green check (`EditorControlsDock.vue:63-66`). Drag a point → no `stateChange` → **the check stays green while the buffer holds unsaved edits.** The dock affirmatively lies about persistence state.

**Falsifier.** Wrap `onPointerUp` the way `onPointPointerDown` is wrapped, or move `emitState` into the composable's `onDragEnd`. Neither is present: `emit(` appears exactly once in the file, at `:124`.

---

### C-5 · MAJOR · the `save` emit is declared and never emitted — a dead entry in the public contract

`ContourEditorCanvas.vue:24-27`:

```ts
const emit = defineEmits<{
    stateChange: [...];
    save: [points: { x: number[]; y: number[] }];
}>();
```

`grep -n 'emit(' ContourEditorCanvas.vue` → **one** hit, `:124`, `emit("stateChange", …)`. `save` is never emitted, and no consumer listens for it: `VisualizationView.vue:204-206` binds only `@state-change`; `FullscreenViewer.vue:115-120` binds nothing. The real save channel is out-of-band — `defineExpose({ getPoints })` (`:224`) pulled imperatively by the parent (`VisualizationView.vue:95`).

**Failure scenario.** A maintainer reading the emits block writes `<ContourEditorCanvas @save="persist" />` and ships a save button that never fires. `vue-tsc` accepts it — the emit is declared, so the listener typechecks. The contract is not merely redundant, it is *actively misleading and type-endorsed*.

**Falsifier.** Find one `emit("save"` in the file or one `@save` bound to this component anywhere in `web/src`. Neither exists.

---

### C-6 · MAJOR · `defineExpose` publishes internal state as a read-**write** channel — the idiom this repo's own B.W2 wave retired

`ContourEditorCanvas.vue:217-227` exposes `points` and `magnetRadius` — refs, not accessors. The parent **writes** through the second (`VisualizationView.vue:81-84`):

```ts
const magnetRadius = computed({
    get: () => editorRef.value?.magnetRadius ?? 0,
    set: (v: number) => { if (editorRef.value) editorRef.value.magnetRadius = v; },
});
```

and **reads** the first straight into a sibling's props (`VisualizationView.vue:255`): `<ContourPreview :points="editorRef?.points" />`.

This is precisely the pattern the repo has already ruled against. `VisualizationView.vue:73-76` carries the wave comment:

> *"B.W2 — `CanvasControlsDock` now emits `update:expanded` (sibling W2-C converts its out-of-band `defineExpose(dockExpanded)` to a typed emit); the parent owns the `dockExpanded` ref and listens via `v-model:expanded`."*

`ContourEditorCanvas` is the surface that dock *drives*, and it still carries the retired idiom — twice, one of them writable. `magnetRadius` should be `defineModel<number>()`; `points` should be the `stateChange` payload or a `v-model`.

**Failure scenario.** Vue's exposed proxy performs ref-unwrapping, so `editorRef.value.magnetRadius = v` mutates the child's internal ref with no validation, no emit, and no reactivity contract. Clamping lives in the *dock* (`EditorControlsDock.vue:50`, `Math.max(0, Math.min(10, …))`) — a second consumer writing an out-of-range value bypasses it entirely, and `usePointDrag.ts:36` loops `offset <= radius` unguarded. Additionally, the getter's `?? 0` default contradicts the component's own default of `3` (`:38`), so before `editorRef` resolves the dock displays magnet **0 (off)** while the editor is running magnet **3**.

**Falsifier.** Show `magnetRadius` reaching the child through a prop/model or `points` through an emit. Neither path exists.

---

### C-7 · MAJOR · zero color-vocabulary consumption — 8 hardcoded goldens that diverge from the canonical token *and* fail WCAG 1.4.11 in light mode

`hsl(40 90% 55%)` is written literally **eight times** in this one file — `:261` (spline stroke, α .85), `:307` (point fill, α .6), `:308` (point stroke), `:315` (hover fill, α .5), `:319` (drop-shadow, α .3), `:328`/`:329` (keyframe shadows, α .3/.5), `:333` (selected fill) — plus a ninth verbatim copy in `ContourPreview.vue:45`. The component imports neither `@/lib/colors` nor any `--viz-*` token.

Three independent divergences follow:

1. **Divergence from the canonical golden.** `web/src/lib/colors.ts:12` declares `STATIC.golden = "#f0b632"`, published as `VIZ_COLORS.golden` (`:83`) and consumed by `lib/golden-shimmer.ts:50`, `BasisCanvas.vue`, `ConvergencePlot.vue`, `labels.ts`. `hsl(40 90% 55%)` resolves to **#f3af25** — a *different* colour. The dock that drives this canvas (`EditorControlsDock.vue:7`) imports `VIZ_COLORS`; the canvas it drives does not. Same visual language, two uncoordinated sources.

2. **Bypass of a shipped contrast remediation.** `web/src/style.css:113-125` carries the **D.W4.d** carry: *"light-mode `--viz-amber` darken (axe contrast carry) — glass-ui ships light `--viz-amber` at `hsl(35 70% 42%)` ≈ 3.54:1 … "* → overridden to `hsl(35 76% 35%)`. This component uses a golden at **55%** lightness — *lighter* than the value the app explicitly rejected as insufficient — and is unreachable by that override because it never reads the token.

3. **Computed non-text contrast failure (arithmetic, reproducible).** `--card` in glass-ui light is `hsl(36 48% 97%)` ≈ `#fbf8f4`, WCAG relative luminance **L ≈ 0.9416** (the `.editor-shell` grid gradients are `--foreground` at 5% and shift this by <0.01). Spline stroke `#f3af25` at α 0.85 composited over the card → `rgb(244, 186, 68)`, **L ≈ 0.5477** → contrast **(0.9916 / 0.5977) ≈ 1.66 : 1**. The control-point stroke at α 1.0 → **≈ 1.91 : 1**. WCAG 2.2 SC 1.4.11 (Non-text Contrast) requires **3 : 1** for graphical objects required to understand the content — and the spline *is* the content. `formation/fourier/lane-frontend.md:619` lists the eight files with `prefers-reduced-motion` blocks; `ContourEditorCanvas` is absent, so this is not a file that has been through a11y remediation.

**Failure scenario.** On the default light theme the entire editable curve and every control point sit at ~1.7–1.9:1 against the card. An axe/Lighthouse non-text-contrast rule over `/visualize` in edit mode flags the primary interaction surface. Prior art confirms the route is audited: `e2e/visualization-ux.spec.ts:150` runs `"keystone: ExportModal Dialog-open is a11y-clean"` — but no spec covers the editor (C-24).

**Falsifier.** (a) Recompute: convert `hsl(40 90% 55%)` and `hsl(36 48% 97%)` to sRGB, composite at the stated alpha, apply the WCAG relative-luminance formula. (b) Show any `--viz-*`, `VIZ_COLORS`, or glass-ui colour token in this file — `grep -n "viz-\|VIZ_COLORS\|--primary\|--accent" ContourEditorCanvas.vue` returns nothing. **UNPROVEN-NEEDS-LIVE** rider: the *rendered* composite depends on the resolved theme at runtime; the arithmetic above is static and stands on the token values on disk.

---

### C-8 · MAJOR · saving wipes the undo history

`:72` `watch(() => props.contour, initFromContour, { immediate: true })`. `store.saveContourPoints` (`workspace.ts:270-271`) assigns a **new** object — `contour.value = markRaw(result)` — so the identity-compared watcher fires on every successful save. `initFromContour` (`:53-70`) then calls `initHistory(pts)`, and `useContourHistory.ts:27-30` **replaces** the stack:

```ts
function initHistory(pts) { history.value = [pts.map(p => ({...p}))]; historyIndex.value = 0; }
```

**Failure scenario.** Twenty minutes of drag/smooth/simplify → Save → `canUndo()` is `false`, the entire session's undo stack is gone, and the only recovery is `resetToExtraction()` — which discards *everything*, back to the original extraction. There is no intermediate. The user is punished for saving.

Worse, the reset is silent and the parent is never told the buffer was swapped for a server round-trip: `store_contour_asset` (`image_storage.py:301-322`) is an *upsert keyed on `contour_hash`*, so if the edited points hash to an existing document the response is that **pre-existing** document, not the just-posted one — a different `point_count` can come back and be installed without any diff surfaced.

**Falsifier.** Show a guard that skips `initFromContour` when the incoming contour is the one just saved (e.g. comparing `contour_hash` against a locally tracked value). No such guard exists; the watcher's only input is object identity.

---

### C-9 · MAJOR · the overlay derivation is a verbatim fork of `useImageOverlay.ts`, dead branches included

`ContourEditorCanvas.vue:89-96`:

```ts
const ib = props.contour.image_bounds;
const resize = ib
    ? Math.round(Math.max(ib.maxX - ib.minX, ib.maxY - ib.minY))
    : (wStore.contourSettings?.resize ?? 768);
return overlayUrl(props.imageSlug, resize);
```

`web/src/components/visualization/composables/useImageOverlay.ts:15-19`:

```ts
function resizeFromBounds(store) {
    const ib = store.contour?.image_bounds;
    if (!ib) return store.contourSettings?.resize ?? 768;
    return Math.round(Math.max(ib.maxX - ib.minX, ib.maxY - ib.minY));
}
```

Identical logic, identical magic constant, identical dead optional-chain — a copy, not a call. The alpha is forked too: `ContourEditorCanvas.vue:253` `opacity: 0.28` vs `useImageOverlay.ts:87` `globalAlpha = 0.28`. The composable additionally carries a module-scoped 10-entry image cache, `crossOrigin`, `onerror` handling and a stale-key guard (`:31-72`); the SVG fork carries none of it — a failed overlay fetch leaves a broken `<image>` with no fallback, and a second network fetch of the same AVIF is issued because the SVG `href` path cannot reach the composable's `Map`.

**Failure scenario.** `BasisCanvas` (via the composable) and `ContourEditorCanvas` (via the fork) crossfade against each other in the same stage (`VisualizationView.vue:198-207`). A change to the resize derivation — the exact change C-2 will force — must land in two places or the two surfaces desynchronise mid-crossfade.

**Falsifier.** Show `ContourEditorCanvas` importing `useImageOverlay` or a shared `resizeFromBounds`. `grep -rn "useImageOverlay" web/src` → 2 hits, both `BasisCanvas.vue`.

---

### C-10 · MAJOR · magnet wraparound double-applies displacement, and at small `n` the dragged point runs away from the cursor

`usePointDrag.ts:35-49` walks `offset = 1 … radius` and displaces `(idx − offset + n) % n` and `(idx + offset) % n` with **no check that the two indices are distinct, in range, or unequal to `dragStartIdx`**. `magnetRadius` defaults to **3** (`ContourEditorCanvas.vue:38`) and the slider allows up to **10** (`EditorControlsDock.vue:50`). `deleteSelected` floors point count at **3** (`:180`), and `simplifyClosedPoints` returns unchanged at `length <= 6` (`contourEditing.ts:99`) — so `n ∈ [3, 6]` is directly reachable by repeatedly pressing Simplify then Delete.

**Failure scenario (arithmetic, `n = 3`, `radius = 3`, `dragStartIdx = 0`).**
- `offset = 1` → before `(0−1+3)%3 = 2`, after `1` — fine.
- `offset = 2` → before `1`, after `2` — indices **1 and 2 are each displaced a second time**.
- `offset = 3` → before `(0−3+3)%3 = 0`, after `(0+3)%3 = 0` — **both are `dragStartIdx` itself.** `falloff = 1 − 3/4 = 0.25`, so `points[0] += dx·0.25` twice, immediately after `points[0] = pt` set it to the cursor. Net: the dragged point lands at `pt + 0.5·dx` — it **leads the cursor** and the error compounds every pointermove.

At `n = 6, radius = 3`: `offset = 3` gives before `3` and after `3` — index 3 displaced twice in one tick. `n = 4, radius = 3`: `offset = 2` gives before `2` = after `2`. The collision condition is `n ≤ 2·radius`, i.e. **every contour of ≤ 6 points at the default setting**, and up to 20 points at maximum magnet.

**Falsifier.** Add `if (before === after || before === dragStartIdx || after === dragStartIdx) continue;` and the runaway stops — proving the guard's absence is the cause. Or bound `radius` by `Math.floor((n − 1) / 2)`. Neither exists in `usePointDrag.ts`.

---

### C-11 · MAJOR · value.js is pinned four majors behind and is not consumed here at all, while the tree hand-rolls what 0.13.0 already exports

`web/package.json:16` pins `"@mkbabb/value.js": "^0.13.0"`; `web/node_modules/@mkbabb/value.js/package.json` confirms **0.13.0** installed. value.js's own repo is at **4.0.0** (`/Users/mkbabb/Programming/value.js/package.json`) — a **four-major** lag. 0.13.0's `exports` map has a **single root entry** (`"."` → `./dist/value.js`), so every fourier import site is necessarily a bare specifier; there is no subpath surface to migrate *to* at this pin. That is the F.W2 migration surface in one fact.

`ContourEditorCanvas` imports value.js **zero times**, and the two things it would need are both already exported by the installed build (verified by reading `dist/value.js`'s export list): `parseCSSColor`, `normalizeColor`, `normalizeColorUnit`, `formatCSS`, `mixColors`, `sampleColorRamp`, `safeAccentColor`, `getOklchLightness`, `needsContrastAdjustment`, `srgbToOKLab`, `gamutMapSRGB`, plus `timingFunctions` (already consumed at `lib/easings.ts:9`).

The hand-rolled arm is `web/src/lib/colors.ts` — `cssVarToHex` (`:22-54`, three hand-written regexes for `hsl()`, bare-triplet, and `rgb()`), `hslToHex` (`:56-68`), `rgbToHex` (`:70-74`), `hexToRgba` (`:101-106`), `hexToRgb` (`:111-117`). Every one of these is a partial, lossy reimplementation of `parseCSSColor` + `normalizeColor` + `formatCSS`. `cssVarToHex` returns the sentinel `"#888888"` on any unmatched form (`:26`, `:53`) — so an author who writes `--viz-fourier: oklch(...)` (which glass-ui **does**, `node_modules/@mkbabb/glass-ui/dist/styles/tokens/color-radius.css:263-265`) and whose browser reports it un-normalised gets **silent grey**, not an error. `needsContrastAdjustment` and `getOklchLightness` — exactly the two functions C-7's failure calls for — are exported and unused.

**Failure scenario.** C-7's contrast defect is not fixable inside this component without either (a) adopting the CSS token (glass-ui path) or (b) adopting value.js's colour model. Today the component does neither, and the module that *would* mediate (`colors.ts`) cannot parse the `oklch()` form glass-ui ships.

**Falsifier.** Show a value.js import in `ContourEditorCanvas.vue` (`grep -n "@mkbabb" ContourEditorCanvas.vue` → 0 hits), or show `colors.ts` handling `oklch()` (its regexes at `:32-51` cover `hsl()`, bare triplet, and `rgb()` only).

---

### C-12 · MAJOR · zero glass-ui consumption, and the one focus affordance it does declare is invisible

`ContourEditorCanvas.vue` imports nothing from `@mkbabb/glass-ui` — the sole interactive component in `web/src/components/visualization/` that does not. It reimplements the panel chassis by hand at `:285-297` (border, radius, card background, CSS crosshatch grid).

The concrete harm is at `:231` and `:290`:

```html
<div class="editor-shell" tabindex="0">
```
```css
.editor-shell { outline: none; }
```

`tabindex="0"` inserts the shell into the tab order; `outline: none` removes the focus ring; there is **no** `:focus-visible` rule anywhere in the file. The result is a keyboard stop with **no visible indication** — WCAG 2.4.7 (Focus Visible) and 2.4.11 (Focus Not Obscured) failure — and the `tabindex` buys nothing, because the shell has no keydown handler of its own (the shortcuts are on `window`, C-1) and no `role` or `aria-*`. Meanwhile `FullscreenViewer.vue:37-46` builds a bespoke focus trap that will happily land on this invisible stop.

`FullscreenViewer.vue:163-170` reaches through with `:deep(.editor-shell)` to strip the border in fullscreen — a private-class dependency across a component boundary that only exists because the shell is bespoke rather than a glass-ui surface. And because `VisualizationView.vue:393` *also* styles `.editor-shell` (Vue scoped CSS applies the parent's scope id to a child's root element), the same class name is styled from two files for two different elements.

**Rider (folded, not re-invented).** The M-deep-audit already owns this file's grid tokenisation (`C4-G4`: 5% opacity below perceptibility, 28px pitch unrelated to the 40/16px siblings, `raw-findings.json:2182-2186`) and proposed a shared glass-ui `@utility graph-paper` (`:2255-2256`). That carry is unchanged and I do not re-raise it; I add only the focus-affordance defect, which those runs did not name.

**Falsifier.** Show a `:focus-visible` rule or a glass-ui import in this file. Neither exists.

---

## 3. MINOR and INFO

| ID | Sev | Claim | Provenance | Falsifier |
|---|---|---|---|---|
| **C-13** | MINOR | `@dblclick` is unmodified while its sibling `@click` **is** `.self` — so double-clicking an existing control point bubbles to the SVG and inserts a coincident duplicate point on top of it. `stopPropagation` at `usePointDrag.ts:17` is on `pointerdown` and does not suppress the later `dblclick`. | `ContourEditorCanvas.vue:237` vs `:241` | Add `.self` to `@dblclick` and the insert stops; the author's use of `.self` one line later shows the modifier was known. |
| **C-14** | MINOR | `canDelete` is emitted as `selectedIdx !== null` with no length term, but `deleteSelected` silently no-ops at `points.length <= 3`. The dock's Delete button (`:disabled="!canDelete"`) is therefore **enabled and inert** on a 3-point contour. | emit `:127`; guard `:180`; dock `EditorControlsDock.vue:96` | Show a `pointCount` term in the dock's disabled expression — it has none. |
| **C-15** | MINOR | Hover makes a control point **fainter**: base fill α **0.6**, hover fill α **0.5**. The affordance is inverted. (`.selected` at `:332` post-dates `:hover` at `:314` at equal specificity, so selected points are unaffected.) | `:307` vs `:315` | Compare the two alpha values; 0.5 < 0.6. |
| **C-16** | MINOR | `transition: fill 0.15s, r 0.15s` transitions the SVG geometry property `r`, which no rule ever changes — `r` is a static presentation attribute (`:r="3.5"`). Dead declaration; also a bare-keyword transition, which the constellation-ui audit already flagged for this file. | `:311`, `:273`; cite `docs/audits/runs/2026-06-01-constellation-ui/fourier.md:46` | Find any rule setting `r` on `.control-point`. There is none. |
| **C-17** | MINOR | Half-adopted screen-space idiom: `vector-effect="non-scaling-stroke"` pins the **stroke** to screen space, but `r="3.5"` stays in **contour data space**. With `image_bounds` at ±512 (resize 1024) a typical contour spans ~700 data units; a 15%-padded viewBox (~910) fitted into a 360 px mobile viewport scales r to ≈1.4 CSS px — a ~8 px hit target including stroke, against the 24 px WCAG 2.5.8 minimum. The target also **shrinks as the contour grows**, which a screen-space radius would not. | `:273-274`; viewBox `:77-82`; bounds `api/services/computation.py:83-88` | Compute `r · viewportWidth / viewBoxWidth`. **UNPROVEN-NEEDS-LIVE** for the exact rendered px. |
| **C-18** | MINOR | Two non-null assertions on DOM APIs that legitimately return `null`: `svgRef.value!` and `getScreenCTM()!`. `getScreenCTM()` returns `null` for an SVG in a non-rendered subtree — reachable while `FullscreenViewer`'s `Transition` is mid-leave. A `TypeError` on `.inverse()` of `null` aborts the pointer handler. | `:134`, `:138` | Replace with guarded reads and the crash path closes; `strict: true` is on (`tsconfig.json`) so the assertions are load-bearing, not decorative. |
| **C-19** | MINOR | `dragging` is destructured from `usePointDrag` and never referenced — no cursor state, no class binding, no guard. Dead binding; survives only because `noUnusedLocals` is off. | `:42`; `tsconfig.json` (no `noUnusedLocals`) | `grep -c "dragging" ContourEditorCanvas.vue` → 1. |
| **C-20** | MINOR | `const bounds = computed(() => stableBounds.value)` is a pure passthrough, and its own comment — *"live bounds for nothing"* — documents an abandoned intent rather than a behaviour. | `:74-75` | Inline `stableBounds` at `:78` and nothing changes. |
| **C-21** | MINOR | The overlay fallback `wStore.contourSettings?.resize ?? 768` is **triply** dead: (a) `contourSettings` is a non-nullable `ref<ContourSettings>` (`workspace.ts:46`) so `?.` never short-circuits; (b) `768` matches no default in the tree — `CONTOUR_DEFAULTS.resize = 1024` (`lib/defaults.ts:5`), `overlayUrl` default `1024` (`api.ts:296`), backfill hardcodes `1024` (`api/dependencies.py:151`); (c) the branch is **unreachable in effect**, because the only case that selects it (`image_bounds == null`) is exactly the case in which `imageOverlayRect` is `null` and the `<image>` is not rendered. | `:92-94` | Delete the fallback; no rendered output changes. |
| **C-22** | MINOR | Split dependency sourcing and a duplicated datum. `imageSlug` arrives as a **prop** while `contourSettings` is pulled by reaching into the store (`:31`, `:94`) — so the component is neither prop-driven nor store-driven. Worse, `props.imageSlug` duplicates `props.contour.image_slug` (`lib/types.ts:72`) with no consistency check: the overlay raster is fetched for `props.imageSlug` while the overlay **rectangle** comes from `props.contour.image_bounds`. If the two disagree the component renders image A positioned by contour B's bounds, silently. | `:18-22`, `:89-108` | Show a guard comparing `props.imageSlug` to `props.contour.image_slug`. There is none. |
| **C-23** | MINOR | Third, unreconciled shimmer surface. The app owns a shared golden shimmer — `goldenShimmerAlpha() = 0.85 + 0.15·sin(now/200)` (`lib/golden-shimmer.ts:11-13`), period **2π·200 ms ≈ 1257 ms**, animating **stroke alpha 0.70→1.00**, consumed by `BasisCanvas`, `ConvergencePlot`, `labels.ts`. This file hand-rolls a CSS `@keyframes golden-shimmer` at **1.2 s** (a 4.7% period divergence) animating a *different quantity* — drop-shadow alpha 0.3→0.5 and blur 2→5 px — gated on `.editor-svg:hover` (whole-surface) rather than per-curve. Neither is registered with keyframes.js 4.3 nor with the animation store. | `:318-330` vs `lib/golden-shimmer.ts:11-13` | Compare the two periods and animated properties. **Folded, not re-invented:** the missing `prefers-reduced-motion` guard on this keyframe is already owned by M-audit **E5-06** (`findings-index.txt:479`) and M-critique **E5-10** (`raw-findings.json:4268-4272`), and corroborated by `formation/fourier/lane-frontend.md:619` (this file absent from the PRM roster). |
| **C-24** | INFO | The editor has **zero** executable coverage. The only editor-adjacent e2e test is `test.fixme(...)` — permanently skipped pending a W3 seam that has not landed. No spec anywhere selects `.editor-shell`, `.control-point`, `.spline-path`, or the magnet control. | `e2e/visualization-ux.spec.ts:212-259`; `grep -rn "editor-shell\|control-point\|spline-path\|magnet" e2e/*.ts` → 0 | Un-skip the test, or name a spec that exercises a drag. |
| **C-25** | INFO | `svgPoint` is passed to `usePointDrag` at `:45` but declared at `:133` — it works only by function-declaration hoisting. A refactor to `const svgPoint = (e) => …` silently becomes a TDZ `ReferenceError` at setup time. | `:45`, `:133` | Convert the declaration to a `const` arrow and the component throws on mount. |
| **C-26** | INFO | `stableBounds` is computed once from the initial contour (`:59-67`) and never grows. The 15% `MARGIN` is the entire headroom; a point dragged beyond it leaves the viewBox with no pan, no zoom, and no auto-fit — recoverable only by undo (which C-8 may have wiped) or `resetToExtraction` (which discards everything). | `:29`, `:50`, `:59-67`, `:77-82` | Show a viewBox recompute on live points. `bounds` (C-20) proves the opposite was deliberately abandoned. |
| **C-27** | INFO | `showImageOverlay?: boolean` is optional with no default, chained through an equally-optional prop in the fullscreen consumer (`FullscreenViewer.vue:14` `showImageOverlay?: boolean` → `:119`). `undefined` propagates two hops and is only ever coerced by `v-if`. The sibling `imageSlug: string | null` is required-but-nullable — two different nullability idioms in a four-line props block. | `:18-22`; `FullscreenViewer.vue:14, 119` | Give it `withDefaults` or make it required; neither is present. |

---

## 4. Superlatives (L-18, both directions)

**S-1 · The `image_bounds → resize` inversion is provably exact, not approximately right.** `ContourEditorCanvas.vue:92-93` recovers the extraction `resize` as `Math.round(Math.max(maxX−minX, maxY−minY))`. The server builds bounds as `{±rw/2, ±rh/2}` with `rw = int(orig_w · resize/max(w,h))`, `rh = int(orig_h · ratio)` (`api/services/computation.py:70-88`) — so on the **dominant** axis `int(dim · resize/dim) = resize` exactly, and `max(rw, rh) === resize`. The overlay endpoint independently re-derives `new_size` with the *same* `ratio` and `int()` (`api/routers/images.py:186-189`), so the served raster's pixel extent equals the bounds rectangle to the pixel. The `Math.round` is a no-op safety over an already-exact integer. This is a genuinely well-constructed inverse — the comment at `:88` (*"Derive resize from image_bounds so the overlay always matches the extraction dimensions"*) states the invariant and the code honours it. **Falsifier:** find an aspect ratio where `int()` truncation on the *minor* axis exceeds the major — impossible, since `ratio ≤ 1` scales the major axis to exactly `resize` and the minor to strictly less.

**S-2 · The double-flip compensation on the `<image>` is correct in the general case, not merely the centred one.** `:252` emits `transform="translate(0, ${y·2 + h}) scale(1,-1)"` inside a `<g transform="scale(1,-1)">`. Flipping a rect spanning `[y, y+h]` about the origin maps it to `[−y−h, −y]`; translating by `2y + h` restores `[y, y+h]`. The API happens to emit origin-centred bounds (`minY = −maxY`), for which the whole term degenerates to `translate(0,0)` — so the author could have shipped a working `scale(1,-1)` and never known. They shipped the general form instead. **Falsifier:** substitute any `image_bounds` with `minY ≠ −maxY` (e.g. a future cropped-extraction path) and re-derive; the raster still lands upright on `[minY, maxY]`.

**S-3 · `useContourHistory` has no aliasing bug — a rarer property than it looks.** `pushHistory` truncates the redo tail *before* appending (`useContourHistory.ts:10`), and **all three** of `pushHistory`, `undo`, `redo` deep-copy via `.map(p => ({...p}))` (`:9, 18, 24`). Since `usePointDrag.onPointerMove` mutates `points.value[i]` by assignment and by field-read (`usePointDrag.ts:31, 40-47`), a shallow snapshot anywhere would have let live drags corrupt stored history. It does not. **Falsifier:** drop the spread in any one of the three and drag after an undo — the snapshot mutates with the live array.

**S-4 · `simplifyClosedPoints` is a first-rate implementation and the component consumes it correctly.** `contourEditing.ts:95-188` replaces an O(n²)-per-call VW scan with an indexed binary min-heap over parallel typed arrays (`Float64Array` coords + areas, `Int32Array` links + heap permutation, `Uint8Array` liveness), re-keying only the two live neighbours per removal — O(n log n). The stale-entry hazard intrinsic to lazy-deletion heaps is handled correctly by the `pos[idx] = -1` tombstone plus the `if (!alive[idx]) continue` guard at `:172`, and the `result.length >= 3 ? result : points` floor at `:187` prevents degenerate output. The docstring (`:72-94`) is honest about choosing unrestricted VW over strict VW and says why. The component consumes it wholesale with no local reimplementation (`:194-199`). **Falsifier:** remove the `alive` guard and the same node is spliced twice, corrupting the linked list — the guard is load-bearing, not defensive noise.

**S-5 · The magnet falloff integrates path-correctly.** `usePointDrag.ts:28-51` computes `dx/dy` against `dragPrevPt` — the **previous pointermove**, not the pointerdown origin — sets the dragged point absolutely, displaces neighbours *incrementally*, then advances `dragPrevPt`. Over a curved drag the neighbours accumulate `Σ dx·falloff = (B − A)·falloff`: path-independent, exactly the dragged point's net displacement scaled by falloff. The naive alternative (delta from origin, applied each tick) would overshoot by the cumulative path length. **Falsifier:** replace `dragPrevPt` with the pointerdown point and drag in a circle back to the start — neighbours end displaced despite zero net motion. *(This praise is scoped to the falloff integration only; the index arithmetic in the same loop is C-10.)*

---

## 5. Corpus reconciliation

- **Extends `R6-8`** (`intakes/lane-fourier-r3-r6.md:142`, ADOPT-AS-FACT, CARRY-TO-WAVE → F.W5). C-2 reproduces R6-8's shape on `operation:POST:/api/contours` ↔ `client:saveContour`. R6-8's lesson was *keep operation identity independent of client identity*; C-2 adds a second, orthogonal clause the same wave must carry: **keep derivation-state out of the value domain** — `image_bounds: null` conflates "this contour has no bounds" with "this route did not derive bounds yet", and no participant on either side of the seam owns the distinction.
- **Corroborates `formation/fourier/lane-frontend.md:619`** — `ContourEditorCanvas` is absent from the eight-file `prefers-reduced-motion` roster, independently confirming M-audit **E5-06** / M-critique **E5-10** on this file's `golden-shimmer`. Folded at C-23; not re-raised as new.
- **Folds M-deep-audit `C4-G4`** (grid opacity/pitch tokenisation, `raw-findings.json:2182-2208`) and the proposed glass-ui `@utility graph-paper` (`:2255-2256`) unchanged. C-12 adds only the `tabindex="0"` + `outline:none` focus defect, which no prior run named.
- **Folds `L3-visualization-stack.md:133` (D2)** — `<circle v-for>` at n≈1024 is a live perf carry on the PERFORMANCE axis; C-17 approaches the same element from consumption (data-space vs screen-space geometry) and does not restate the render-cost claim.
- **One correction.** `formation/fourier/lane-frontend.md:86` lists this file simply as *"SVG contour point editor (drag/insert/delete)"*. The census under-describes the surface: the component also owns the **image-overlay operation seam** (a forked copy of `useImageOverlay`), a **global window key handler that outlives its own visibility**, and a **read-write `defineExpose` state channel** — three integration seams invisible from the census row. Recommend the census row be amended to name them, since each is where the defects actually live.

---

## 6. Disposition

The component is **DEFECTIVE on the consumption axis**, and the failure is structural rather than incidental: it is a hand-rolled surface sitting inside a fully-tokenised, fully-substrated app. It consumes none of the three libraries under measurement, forks the one composable that already solved its overlay seam, publishes an emit it never fires while doing its real work through an out-of-band expose channel the repo's own B.W2 wave retired, and holds a global key listener that mutates persisted data while invisible.

Three blockers gate any adoption work: **C-1** (silent mutation), **C-2** (overlay dies on save — the API-side fix belongs with the F.W5 R6-8 carry), **C-3** (dual mount in fullscreen).

The interior is not uniformly poor: the `image_bounds` inverse, the SVG double-flip, the history deep-copies, the VW heap, and the magnet path-integration are each better than they had to be (S-1…S-5). The defects are concentrated at the **boundaries** — props/emits, expose, store reach, API round-trip, design-token adoption — which is exactly what a consumption-axis challenge should find, and exactly what the census row did not predict.
