claude-opus-5[1m] (served model id)

# CHALLENGE — `VisualizationView.vue` · axis **L (LIBRARY)**

**Subject.** `fourier-analysis @ web/src/components/visualization/VisualizationView.vue` (486 lines;
137 `<script setup>` / 148 template / 198 `<style scoped>`).
**Substrate.** fourier HEAD `cd26c653` / tree `9a66411d`, branch `m/w1-bump-migration`, 28 uncommitted
paths — the exact tree the addendum's R4-9 row certifies as unmoved and audit-current.
**Posture.** Component assumed DEFECTIVE until the tree proves otherwise. Static + source-derived
only; no browser tooling. Every row carries severity · `file:line` · a falsifier. L-18 runs both ways
— §6 is the superlative ledger, held to the same evidentiary bar.

**Read whole (read-only), 20 files:** the subject; `composables/useViewState.ts`,
`composables/useImageUpload.ts`, `composables/useWorkspaceLoader.ts`, `composables/useCanvasSetup.ts`,
`composables/useCanvasHover.ts`; `stores/workspace.ts`, `stores/animation.ts`, `stores/gallery.ts`;
`composables/useToast.ts`; `components/ui/tooltip/Tooltip.vue`; `BasisCanvas.vue`,
`ContourEditorCanvas.vue`, `ContourPreview.vue`, `CanvasControlsDock.vue`, `AnimationControls.vue`,
`ExportModal.vue`, `FullscreenViewer.vue`, `ImageUpload.vue`, `ContourSettings.vue` (compute arm),
`BasisSelector.vue` (model arm); `router/index.ts`, `lib/defaults.ts`; plus the producer type
contracts `@mkbabb/glass-ui/dist/components/custom/configurator/Configurator.vue.d.ts` and
`.../tabs/SegmentedTabs.vue.d.ts`.

**Tally.** 30 defects — **3 BLOCKER** (L-1..L-3) · 11 MAJOR (L-4..L-14) · 14 MINOR (L-15..L-28) ·
1 INFO (L-29) · 1 audit-model finding (§4, the R5-7 producer-boundary variant). 6 superlatives (§6).

---

## §0 — Corpus fold (hitherto, per L-18 "don't re-invent")

Carried forward unchallenged and used as the frame, not re-derived:

- **CENSUS §3a / [FE §6]** — "Canvas2D throughout, **WebGL/WebGPU ABSENT**; three independent
  canvases … epicycle instrument reactive-redraw off a store rAF clock". Confirmed at this seat:
  `BasisCanvas.vue` never calls `getContext("webgl*")`; `useCanvasSetup.ts:30` is `getContext("2d")`.
  The subject is the sole inline mount site of that instrument (`VisualizationView.vue:199`).
- **[FE §2 row]** — "`VisualizationView.vue` | 486 | Route shell for `/v/:slug` + `/w/:slug?`; tab
  host (`SegmentedTabs`), `Configurator` panel, canvas stage". Line count re-verified: **486**.
- **[FE §5]** the uplift break surface. The subject imports `lucide-vue-next` (`:10`) — 1 of the 35
  rename sites — and reaches the `ToastVariant` definition-absent hard break transitively through
  `useToast.ts:4`. Its three glass subpaths (`/tabs`, `/configurator`, `/button`, `:27-29`) are NOT
  on the removed list; the subject is a light uplift casualty, not a heavy one.
- **Addendum §5(iii) / intake row R5-7 + R6-5** — native-template-loop blindness. **Applied in §4**,
  where the tree makes me *extend* rather than instantiate it.
- **Addendum carried row R3-7a** (Tooltip migration budget 35 callsites / 9 consumers) — the subject
  contributes exactly **1** (`VisualizationView.vue:166`, the "Start fresh" affordance).

**Where I contradict the corpus:** §3 **L-14** amends CENSUS §3a / [FE §6,§8]'s *two ungated rAF
clocks* model. The epicycle instrument is not "reactive-redraw off a store rAF clock" — it owns
**two further rAF loops of its own**, and one of them is un-parkable by the very visibility credit
[FE §8] banks as hygiene. The corpus undercounts fourier's live rAF loops in the viz path.

---

## §1 — BLOCKERS

### L-1 · BLOCKER · Every drag-and-drop upload fires **twice**

`VisualizationView.vue:140-143` puts `@drop="globalDrop"` on the **root** element. Its own global
drag overlay at `:146-147` — a *descendant* of that root — carries `@drop="globalDrop"` again.
Neither call site uses `.stop`, and `useImageUpload.ts:31-40 handleDrop` calls only
`e.preventDefault()`, never `e.stopPropagation()`.

The overlay is `fixed inset-0 z-[var(--z-overlay)]` (z-index **50**, resolved:
`glass-ui/dist/styles/tokens/scheme-motion.css:341`) with no `pointer-events` override, so once
`globalDragging` is set — which `handleDragOver` does on the *first* `dragover` anywhere in the view
(`useImageUpload.ts:42-49`) — the overlay **is** the drop target for every subsequent drop. The drop
event therefore fires `globalDrop` on the overlay, then bubbles to the root and fires it again.

Both invocations read the same live `e.dataTransfer.files[0]` and both call `onFile(file)` →
`store.uploadImage(file)` (`VisualizationView.vue:42`). Consequence per drop: **two POSTs to the
image endpoint, two `invalidateInFlightComputation()` (`workspace.ts:115`), two `router.push`
(`workspace.ts:125`, the second a vue-router duplicate navigation), two `_saveDraftNow()`
(`workspace.ts:126`)** — and, because `loading` has no depth counter (see L-7), the first upload to
settle clears `loading` while the second is still in flight.

*Why the mutation isn't masked by Vue:* handler #1 sets `isDragging.value = false`
(`useImageUpload.ts:34`), but Vue flushes reactivity on the microtask queue while DOM bubbling is
synchronous — the overlay is still mounted when handler #2 runs.

**Falsifier.** Add `.stop` to either `@drop`, or `e.stopPropagation()` at `useImageUpload.ts:32`, and
the second invocation disappears. Equivalently: if a live network panel shows exactly **one** POST
per drag-drop, this row is dead. `UNPROVEN-NEEDS-LIVE` for the request count only — the nesting,
the missing `.stop`, and the absent `stopPropagation` are all static facts.

### L-2 · BLOCKER · Hand-edited contours are silently destroyed on leaving edit mode

`VisualizationView.vue:254-276` wraps the left panel in `<Transition name="panel-swap" mode="out-in">`
over two keyed branches. **`<ContourSettings>` is instantiated in BOTH** — `:260` (editor branch) and
`:270` (viz branch). With `mode="out-in"` the leaving branch unmounts *completely* before the entering
one mounts, so **every edit-mode toggle destroys and re-creates the component that
`useWorkspaceLoader.ts:90-94` names as the sole owner of auto-compute.**

A fresh `ContourSettings` runs `watch(() => store.imageMeta, …, { immediate: true })`
(`ContourSettings.vue:151-166`) at setup. Its guard is
`if (!store.epicycleData && !store.basesData && !store.computing) runCompute()`.

Now trace a save:

1. `onEditorSave` (`VisualizationView.vue:92-96`) → `store.saveContourPoints(points)`.
2. `workspace.ts:263-283` writes the new contour and sets **`epicycleData = null; basesData = null`**
   (`:273-274`), then `endCompute()` → `computing = false`.
3. The user toggles edit off. The viz-branch `ContourSettings` mounts. All three guard clauses are
   now satisfied → **`runCompute()`**.
4. `runCompute` (`ContourSettings.vue:104-136`) calls **`await store.extractContour()`**, which
   re-runs edge extraction from the source image and assigns
   `contour.value = markRaw(result)` (`workspace.ts:252`).

The just-saved hand-edited contour is overwritten by a fresh auto-extraction. `ContourEditorCanvas`
then re-seeds from it (`ContourEditorCanvas.vue:72`, `watch(() => props.contour, initFromContour,
{ immediate: true })`), so re-opening the editor shows the machine's contour, not the user's.

**Root cause is this file's**: the duplicated `<ContourSettings>` across two mutually exclusive
Transition branches converts a settings panel into a remount-triggered side-effect engine. A single
instance hoisted above the `<Transition>` removes the failure entirely.

**Falsifier.** Any of: (a) something recomputes epicycles between step 2 and step 3 — grep shows
nothing in the subject, `useWorkspaceLoader.ts`, or `ContourEditorCanvas.vue` does; (b) `hasImage`
false so neither `ContourSettings` renders — but `:260`/`:270` are `v-if="hasImage"` and an edit
session requires an image; (c) `runCompute` short-circuits — its only bail is `if (!store.imageMeta)
return` (`:105`), and `lastComputedKey` is explicitly reset to `null` at `:159` before the call.
`UNPROVEN-NEEDS-LIVE` on the mount ordering under `mode="out-in"`; the guard arithmetic is static.

### L-3 · BLOCKER · The contour editor's **global** keyboard shortcuts stay armed outside edit mode — and double up in fullscreen

`ContourEditorCanvas` registers `window.addEventListener("keydown", onKeyDown)` unconditionally at
mount (`ContourEditorCanvas.vue:209-211`), and `onKeyDown` (`:164-177`) has **no visibility guard**.

The subject mounts that editor on **`v-if="store.contour"`** (`VisualizationView.vue:203`) — *not*
on `isEditing`. When not editing it is merely CSS-hidden: `.editor-shell.is-hidden { opacity: 0;
z-index: 0; pointer-events: none }` (`:404-409`). `pointer-events` does not gate `window` keydown.

Two consequences, both silent:

- **Cmd/Ctrl+Z and Cmd/Ctrl+Shift+Z / Ctrl+Y mutate the contour while the user is watching the
  animation** (`ContourEditorCanvas.vue:169-176`), and `e.preventDefault()` there is
  **unconditional** — it steals undo from every focused text/number input in the view
  (`ContourSettings.vue` and `BasisSelector.vue:160,187` both render numeric `<input>`s bound to the
  same `nHarmonics`/`nPoints` refs this file owns).
- **Backspace/Delete deletes a control point** whenever `selectedIdx` survived the mode exit
  (`:165-168`). Nothing in the subject deselects on `@toggle-edit` (`VisualizationView.vue:220` is a
  bare `isEditing = !isEditing`).

**The fullscreen doubling.** `CanvasControlsDock.vue:92-96` renders the Fullscreen button *outside*
its `v-if="!isEditing"` block (`:42`), so fullscreen is reachable while editing. The subject then
passes `:is-editing="isEditing"` and `:contour` to `<FullscreenViewer>` (`VisualizationView.vue:283`),
which mounts a **second** `ContourEditorCanvas` (`FullscreenViewer.vue:115-120`). Now:
two `window` keydown listeners → **one Cmd+Z undoes twice**, across two independent `points` refs
that immediately diverge. And the fullscreen instance has neither a `ref` nor a `@state-change`
handler there, so `onEditorSave` (`VisualizationView.vue:92-96`, which reads only `editorRef`) can
**never** persist anything the user does in the fullscreen editor.

**Falsifier.** Gate `onKeyDown` on a visibility prop, or move the `v-if` to `isEditing && store.contour`
and the first two symptoms vanish; give the fullscreen editor a ref+save path (or drop it) and the
third does. If `ContourEditorCanvas` were ever mounted only under `isEditing`, this row dies — the
tree says otherwise at `:203`.

---

## §2 — MAJOR

### L-4 · MAJOR · The fullscreen ghost/overlay toggles are **provably dead wiring**

`VisualizationView.vue:285` listens for `@toggle-ghost` / `@toggle-image-overlay` on
`<FullscreenViewer>`. `FullscreenViewer` declares both emits (`:22-23`) but emits them from exactly
one place: `@toggle-ghost="emit('toggleGhost')"` / `@toggle-image-overlay="…"` on
`<AnimationControls>` (`FullscreenViewer.vue:136-137`).

**`AnimationControls` declares no such emits and no such props** — its entire contract is
`{ activeBases?, maxWidth? }` + `(e: "exportFrame")` (`AnimationControls.vue:15-30`); `grep -i
ghost|overlay` over that file returns only a `Button variant="ghost"` comment at `:213`. The two
listeners therefore fall through as inert `onToggleGhost` / `onToggleImageOverlay` attributes on
AnimationControls' root element and are never invoked. `FullscreenViewer` never emits; the subject's
handlers never run. **Ghost and image-overlay cannot be toggled in fullscreen at all.**

**Falsifier.** Add the emits to `AnimationControls` and the chain lights up. If `AnimationControls`
had `inheritAttrs: false` + a manual re-emit this would be different — it has neither
(`grep defineOptions|inheritAttrs` → empty).

### L-5 · MAJOR · Three unhandled promise rejections on the upload/save paths

`workspace.ts` **re-throws** after recording: `uploadImage` `:130`, `saveContourPoints` `:280`.

- `VisualizationView.vue:41-42` passes `async (file) => { await store.uploadImage(file); }` into
  `useImageUpload`, whose parameter is typed `onFile: (file: File) => void`
  (`useImageUpload.ts:14`). TypeScript accepts a `Promise<void>` where `void` is expected, and the
  call sites `useImageUpload.ts:38` / `:71` invoke it **without awaiting** → an unhandled rejection
  on every failed drop/select.
- `VisualizationView.vue:132-136 onCanvasFileSelect` — an `async` DOM handler with a bare `await
  store.uploadImage(file)` and no `try`.
- `VisualizationView.vue:92-96 onEditorSave` — same shape over `saveContourPoints`.

**Falsifier.** Any `try/catch` or `.catch()` on those three paths; or `uploadImage`/`saveContourPoints`
not re-throwing. Neither holds.

### L-6 · MAJOR · A failed **upload** renders the full-screen "Could not load workspace" error, unclearable

`uploadImage` sets `error.value` in its catch (`workspace.ts:128`) and leaves `imageSlug` null — it
is only assigned on success (`:123`). The subject's second branch is
`v-else-if="store.error && !store.imageSlug"` (`VisualizationView.vue:162`), so a 413/415/network
failure on a first-session upload **replaces the entire application** with a workspace-load error
whose body prints the upload message verbatim (`:165`).

The one thing that clears `store.error` — `useWorkspaceLoader.ts:125-133` — is gated on
`if (err && store.imageSlug)`, which is exactly false here. The only exit is "Start fresh"
(`:170`) → `store.reset()`, which discards the session.

**Falsifier.** Set `imageSlug` optimistically, or drop `&& store.imageSlug` from either guard. If the
error watcher fired without a slug, this row dies — `useWorkspaceLoader.ts:128` says it does not.

### L-7 · MAJOR · `store.loading` unmounts the whole workspace mid-upload — the depth counter exists three lines away and isn't used

`uploadImage` sets `loading.value = true` (`workspace.ts:113`) with a plain `finally` reset (`:131`),
while `computing` gets a proper re-entrancy guard — `_computeDepth` / `beginCompute` / `endCompute`
(`workspace.ts:60-69`). On a first upload (`imageSlug` still null) the subject's first branch
`v-if="store.loading && !store.imageSlug"` (`:156`) wins, so **the entire `Configurator`, canvas
stage, `ImageUpload` and left panel unmount** for the duration of the POST and remount afterwards:
canvas teardown + `useCanvasSetup`'s ResizeObserver churn (`useCanvasSetup.ts:38-46`), the
`IntersectionObserver` visibility credit released and re-acquired (`BasisCanvas.vue:454-459`), and
`ImageUpload`'s in-flight `FileReader` aborted by `useImageUpload.ts:21-26`. The copy also lies —
"Loading workspace…" during an image upload.

**Falsifier.** Give `loading` the same depth counter (or split `uploading` from `loading`) and the
branch stops firing. If `imageSlug` were set before the await, the branch never wins — `:123` is
after it.

### L-8 · MAJOR · A multi-megabyte base64 data URL is read and retained per drop, for a consumer that does not exist

`useImageUpload.handleDrop` calls **`setPreview(file)`** before `onFile` (`useImageUpload.ts:37`),
which `readAsDataURL`s the whole file into `preview` (`:80-86`). The subject destructures **only**
`isDragging` + the four drag handlers (`VisualizationView.vue:41`) — `preview` and `clearPreview` are
never bound, never read, never cleared. For a 10 MB JPEG that is a ~13 MB base64 string pinned in a
ref for the lifetime of the route component, re-allocated on every drop, and never released (the
sibling `ImageUpload.vue:20-23` has a `clearPreview()` watcher; the subject's instance has none).

**Falsifier.** `grep preview` in the subject → zero hits. If `setPreview` were called only from
`handleFileSelect` (which the subject also doesn't use) the drop path would be clean; `:37` says
otherwise.

### L-9 · MAJOR · Two of four export toggles are inert, and the `Record<string, boolean>` launder is why the compiler can't see it

`ExportModal.vue:36-41` emits four keys — `withEpicycles`, `withTrail`, `withGrid`, `withLabels`.
`BasisCanvas.exportFrame` destructures **two**: `{ withGrid: showGrid = true, withLabels: showLabels
= true }` (`BasisCanvas.vue:466-469`). Turning off **"Epicycles"** or **"Trace path"** in the dialog
changes nothing in the PNG.

The subject is the launderer: `doExport(options: Record<string, boolean>)` (`VisualizationView.vue:99`)
is a stringly-typed pass-through, and the emit is declared `(e: "export", options: Record<string,
boolean>)` (`ExportModal.vue:19`). A named option interface shared by producer and consumer makes
this a `vue-tsc` error; the index signature makes it invisible to the only frontend gate the project
has ([FE §0,§9] — vitest ABSENT, gates are `vue-tsc` + 29 Playwright tests).

**Falsifier.** If `exportFrame` honoured all four keys, or if the type were a closed record. Neither.

### L-10 · MAJOR · `nHarmonics` has three divergent defaults across the seat that owns it; `nPoints`' default is a duplicated literal

The subject hoists `nHarmonics`/`nPoints` from `useWorkspaceLoader` (`VisualizationView.vue:50`) and
feeds the *same two refs* to both `<BasisSelector>` (`:265-267`) and `<ContourSettings>` (`:270`).
Those two consumers disagree with the seed:

| source | default `nHarmonics` | clamp |
|---|---|---|
| `lib/defaults.ts:8` `CONTOUR_DEFAULTS.n_harmonics` | **200** | — |
| `useWorkspaceLoader.ts:18` seed / `:67` re-seed / `:84` image-change reset | **200** | — |
| `BasisSelector.vue:75` `DEFAULTS.nHarmonics` (its "Reset" at `:89`) | **50** | `[1, 500]` (`:30`, `:165`) |

Pressing **Reset** in `BasisSelector` yields 50; changing the image yields 200. Same ref, two
"defaults", four-fold apart. Independently, `nPoints`' default is written as the bare literal
`1024` at `useWorkspaceLoader.ts:19` **and** `:68` rather than `CONTOUR_DEFAULTS.n_points`
(`defaults.ts:9`, also 1024) — three copies of one constant, two of them in the same file.

**Falsifier.** Point `BasisSelector.DEFAULTS` and the two `1024` literals at `CONTOUR_DEFAULTS`.
If `BasisSelector`'s reset were scoped to a different quantity this row dies — `:89` emits
`update:nHarmonics`, the same model.

### L-11 · MAJOR · The `{ once: true }` seeds never re-arm on the in-place `/w/:a → /w/:b` navigation the same composable exists to support

`useWorkspaceLoader.ts:50-60` and `:63-72` seed `activeBases` / `nHarmonics` / `nPoints` from the
loaded workspace with **`{ once: true }`**. The same file carries an explicit route-param watcher for
gallery navigation (`:35-47`, "Skips if the slug already matches") — and `router/index.ts:69` routes
`/w/:imageSlug?` through one route record, so vue-router **reuses the component instance** on a param
change. No `:key` on the router-view forces a remount (`router/index.ts` has none).

So on `/w/a → /w/b` without unmount: both `once` watchers have already fired for **a**, and
workspace **b**'s persisted `active_bases`, `easing`, `speed`, `n_harmonics`, `n_points` are all
dropped on the floor. What *does* fire is `:80-88`, which resets `nHarmonics` to
`CONTOUR_DEFAULTS.n_harmonics` — the wrong value (b's saved one) — while `nPoints` silently keeps
**a's**.

**Falsifier.** Drop `{ once: true }` in favour of a slug-keyed guard, or `:key` the router-view on
`$route.params.imageSlug`. If the component remounted per slug, the row dies — the `:35-47` watcher
proves the authors *designed for* the no-remount case.

### L-12 · MAJOR · `showGhost` is the one view-state flag that doesn't persist

`useViewState` declares its saved shape as `{ editing?, overlay?, equation? }` (`useViewState.ts:6`),
initialises `showGhost = ref(true)` unconditionally (`:19` — no `saved.` read), and watches only
`[isEditing, showImageOverlay, showEquation]` for write-back (`:43-49`). All four are returned
together (`:51`) and the subject wires all four identically into `CanvasControlsDock`
(`VisualizationView.vue:214-224`) and `FullscreenViewer` (`:282-285`). Three survive reload; the
fourth silently resets to `true` every session.

**Falsifier.** Add `ghost` to the persisted shape and the watch array — three-line cure. If `showGhost`
were deliberately ephemeral, nothing in the file, the type, or the dock says so.

### L-13 · MAJOR · Producer-API bypass: `Configurator`'s typed layout seam is ignored in favour of overwriting its internal grid

`Configurator` ships a typed width contract:
`asideWidth?: string | readonly [min: string, max: string]` documented as *"the prop sets the two
inline custom properties; consumers may instead (or also) set `--configurator-aside-min` /
`--configurator-aside-max` via the cascade"*
(`Configurator.vue.d.ts`, `asideWidth` block). The producer's own grid is a Tailwind
`lg:grid-cols-[minmax(var(--configurator-stage-min,18rem),auto)_minmax(0,1fr)] lg:grid-rows-none`
(verified in `dist/useConfiguratorState-kiIlun8I.js`), and the stage cell is
`class="configurator-stage relative min-h-0 min-w-0 overflow-hidden"`.

The subject uses **none of it**. `VisualizationView.vue:194` passes only `scroll-mode="auto"`, then
overwrites the producer's track list wholesale at three breakpoints (`:317-330`), overrides the
producer's responsive behaviour entirely with `display: flex` at `:334`, and reaches into the
producer-internal class with `:deep(.configurator-stage)` at `:344-347`.

Two concrete costs, both already paid in the file:

- The raw `grid-template-columns` replacement **discards `--configurator-stage-min` (18rem)** — the
  producer's stage floor is gone at every breakpoint ≥1024px.
- The mobile `display: flex` override is what *created* the collapsed-stage bug, which the file then
  patches with `:deep()` — the comment at `:336-343` narrates the self-inflicted wound in full
  ("the `<canvas>` renders at ~4px"). A third patch, `.viz-panel-right { height: 100% }`
  (`:381-386`, "B.W4 fix"), is the same scar.

Three documented workaround patches for a layout the producer exposes as one typed prop.

**Falsifier.** `asideWidth` + `--configurator-aside-min/max` overrides at the two extra breakpoints
reproduce `:317-330` without touching `grid-template-columns` or `.configurator-stage`, and the
`:334` flex override becomes unnecessary. If the producer had no width seam this row dies — the
`.d.ts` says it does.

### L-14 · MAJOR · **Corpus amendment** — the viz path runs *four* rAF loops, and two of them dodge both gates

CENSUS §3a / [FE §6] model the epicycle instrument as *"reactive-redraw off a store rAF clock"*, and
[FE §8] flags "the two rAF clocks themselves are ungated under `prefers-reduced-motion`". The tree
under this subject shows **two more**, inside the instrument:

- `useCanvasHover.ts:62` — `hoverAnimFrame`, the epicycle scale-easing loop.
- `useCanvasHover.ts:72` — `shimmerRafId`, the golden-shimmer loop, each tick calling `onRedraw()` →
  `BasisCanvas.drawFrame()` (`BasisCanvas.vue:74`), i.e. a **full** grid + ghost + trail + epicycle
  redraw at 60 fps.

Neither consults `prefers-reduced-motion`, and — the sharper point — **neither is parked by the
visibility credit** [FE §8] banks as hygiene. `animation.ts:99-106 setCanvasVisible` stops only the
store's own `rafId` (`:104 stopRAF()`); it has no reach into the hover composable. On touch,
`useCanvasHover.onClick` **pins** a basis (`:170-172 pinnedBasis = tapped; startShimmer()`) with no
timeout, so a single tap on a basis label leaves a full-instrument 60 fps redraw running *while the
canvas is scrolled off-screen* — precisely the waste the I.γ gating was built to kill
(`BasisCanvas.vue:425-431`).

This is not a re-derivation of [FE §8]; it **contradicts its count and its coverage claim**. The
subject is the sole inline mount site (`VisualizationView.vue:199`) and therefore the seat where
F.W4's reduced-motion clock-gating item must be re-scoped.

**Falsifier.** Route `startShimmer`/`updateHoverScale` through the store's `anyCanvasVisible` credit
and a PRM check. If either loop already had a gate this row shrinks — `useCanvasHover.ts` imports
only `onUnmounted` (`:1`) and reads no media query.

---

## §3 — MINOR

| # | sev | claim | provenance | falsifier |
|---|---|---|---|---|
| **L-15** | MINOR | `hasData` is a "has" predicate typed `EpicycleData \| AnimationData \| boolean` — the whole payload leaks through a boolean-shaped name. The file half-knows: it writes `:has-data="!!hasData"` at one call site and raw `hasData` at three others. | `VisualizationView.vue:121`; consumers `:198`, `:210`, `:217`, `:235` | Wrap in `!!`/`Boolean()`; if any consumer needed the payload the coercion at `:217` would break. None does. |
| **L-16** | MINOR | The "saved" badge flips to unsaved on mere **selection**. `onEditorStateChange` sets `editorSaved = false` on every `stateChange`, and the child emits that on point *selection* and background *deselection*, not just mutation. | `VisualizationView.vue:87-90`; `ContourEditorCanvas.vue:154-157`, `:159-162`; consumer `:242 :is-saved` | Emit a separate `dirty` signal, or reset `editorSaved` only when `pointCount`/geometry changes. |
| **L-17** | MINOR | **Dead CSS.** `.expand-pop-enter-active/.leave-active/.enter-from/.leave-to` (3 rules) — no `<Transition name="expand-pop">` exists in the template (the four live names are `fade` ×2, `panel-swap`, `slide-down` ×3). `.viz-grid` likewise has no element; the `:290-295` comment records that the bespoke grid was replaced by `Configurator`. | dead: `VisualizationView.vue:426-428`, `:483`; live names: `:145`, `:230`, `:254`, `:264`, `:269`, `:272` | `grep 'expand-pop\|viz-grid'` over the template → zero hits. |
| **L-18** | MINOR | **Dead expose surface.** `BasisCanvas` exposes three members; the tree consumes **one**. `drawImageOverlay` has zero consumers repo-wide, and `anim` re-exports the *entire animation store* through a component handle. | `BasisCanvas.vue:515`; sole consumers `VisualizationView.vue:100` and `FullscreenViewer.vue:138` (both `exportFrame`) | `grep -rn '\.drawImageOverlay\|canvasComponent\.anim' src/` → empty. |
| **L-19** | MINOR | **Class-name collision across the parent/child boundary, twice.** The subject's wrapper `class="canvas-container"` wraps a child whose root is also `canvas-container`; same for `editor-shell`. Both parent rules survive only because they are written `.canvas-stage > .x` — a direct-child selector doing the work a distinct name should. | outer `VisualizationView.vue:198` / inner `BasisCanvas.vue:521`; outer `:203` / inner `ContourEditorCanvas.vue:231`; the load-bearing selectors `:392-393`, `:404-405` | Rename the wrappers (`canvas-slot` / `editor-slot`); if the `>` combinator were ever relaxed the styles cross-apply. |
| **L-20** | MINOR | The `!isDesktop` half of the `panel-inactive` binding is **redundant** — the rule that consumes it is already breakpoint-gated. And the breakpoint is duplicated across two languages at two values (JS `min-width: 1024px`, CSS `max-width: 1023px`). | binding `VisualizationView.vue:197`, `:253`; source `:70`; the gate `:443-447` | Delete `&& !isDesktop`: behaviour is identical because `.panel-inactive { display:none }` exists only under `max-width:1023px`. `useMediaQuery` then has no remaining consumer in the file. |
| **L-21** | MINOR | Inconsistent template-ref typing in one file: `canvasComponent` omits `\| null` while `editorRef` declares it and initialises. Plus an unchecked `as` cast in the template laundering `SegmentedTabs`' `string` model into a 2-member union. | `VisualizationView.vue:68` vs `:80`; cast `:185`; producer model type `SegmentedTabs.vue.d.ts` `__VLS_ModelProps = { modelValue: string }` | Type `mobileView: string` + a narrowing helper, or key off the union. The `as` silently accepts any future option value. |
| **L-22** | MINOR | Asymmetric error posture in `useViewState`: the localStorage **read** is `try`-wrapped, the **write** is not — an uncaught throw inside a watcher on every toggle under quota pressure / restricted storage. | guarded read `useViewState.ts:7-11`; bare write `:44-48` | Wrap the `setItem`. The read's own `try` is the admission that this storage can fail. |
| **L-23** | MINOR | The editor-state shape is declared **three times** with no shared type: the child's emit signature, the subject's ref initialiser, and the dock's four props. `onEditorStateChange(state: typeof editorState.value)` types the parameter off the *local* ref rather than the emitted contract, so drift is structural and silent. | `ContourEditorCanvas.vue:25`; `VisualizationView.vue:79`, `:87`; `EditorControlsDock` props at `:239-241` | Export one `EditorState` interface. A field rename in the child compiles clean today. |
| **L-24** | MINOR | `store.reset()` — the "Start fresh" escape hatch — omits the `revision.value++` / `invalidateInFlightComputation()` every other mutator performs, so a `loadWorkspace` still in flight lands afterwards (its guard is `revision.value !== rev`) and repopulates the workspace the user just cleared. | call site `VisualizationView.vue:170`; `workspace.ts:412-426` (no revision bump) vs the guards at `:147`, `:160`, `:206` | Add `invalidateInFlightComputation()` to `reset()`. Narrow window (needs a second load in flight), hence MINOR not MAJOR. |
| **L-25** | MINOR | Publishing from the visualization route triggers a **full gallery refetch** the user is not looking at — `resetAndFetch()` re-lists 20 visualizations into a store this route never renders. | `VisualizationView.vue:112` → `gallery.ts:219-235`, `:231` | Let `GalleryView`'s own mount fetch. |
| **L-26** | MINOR | `handlePublish`'s `catch` is **unreachable**. Both callees swallow: `saveVisualization` catches and returns `null` (`workspace.ts:361-364`), `gallery.publish` catches and toasts (`gallery.ts:232-234`). Dead error path masquerading as handling. | `VisualizationView.vue:106-118`, catch at `:113-115` | Make one callee re-throw, or delete the catch. Also see L-27's sibling: on a save failure the user gets *two* toasts — the generic `"Could not create snapshot"` (`:111`) plus `useWorkspaceLoader.ts:129`'s toast of `store.error`. |
| **L-27** | MINOR | State/UI divergence: `CanvasControlsDock` is told `:show-equation="showEquation"` unconditionally, but the panel renders only when `showEquation && store.epicycleData && !isEditing`. The dock reads "equation ON" while nothing is shown. | `VisualizationView.vue:216` vs `:231` | Pass the same conjunction to the dock. |
| **L-28** | MINOR | Two upload paths in one component with **two validation postures**: the drop path runs `isImageFile` (MIME + extension fallback, Safari-safe); the canvas-click path runs none — `accept="image/*"` is a picker hint, not enforcement. | validated `useImageUpload.ts:8-12`, `:36`; unvalidated `VisualizationView.vue:132-136`, input at `:201` | Route the click path through `handleFileSelect` (`useImageUpload.ts:66-73`), which the subject already receives and discards. |
| **L-29** | INFO | `onCanvasClick` → `canvasFileInput.click()` re-enters its own handler (the synthetic click bubbles from the input to the ancestor that owns the listener). It terminates *only* because HTML's "click in progress" flag makes the re-entrant `.click()` a no-op — an unstated invariant with no comment. | `VisualizationView.vue:127-131`, listener at `:198`, input at `:201` | Add `@click.stop` to the input, or `.self` to the container. If the flag were absent this is an infinite loop; it is not a live bug today. |

---

## §4 — The R5-7 template-loop invisibility class, applied

**Direct instantiation: NONE — and that is the finding.** `VisualizationView.vue` contains **zero
`v-for`** of either kind, native or component. It is not a member of the `PaperSidebar` class that
R5-7 (`intakes/lane-fourier-r3-r6.md`, R5-7 / R6-5) names.

But the class has a **second form** here, and the file is a clean specimen of it:

`VisualizationView.vue:183` passes an **inline array literal** to `SegmentedTabs`:

```
:options="[{ label: 'Controls', value: 'controls' }, { label: 'Canvas', value: 'canvas' }]"
```

`SegmentedTabsProps.options: SegmentedTabOption[]` (`SegmentedTabs.vue.d.ts`) is iterated by the
producer, so **two option rows mount and re-key on every parent render** — a fresh array identity
each time, defeating any prop-identity bail in the producer. To a deriver counting loops, this file
scores **0 template loops and 0 mounted loop rows**, exactly as `instance.loop.paper-sidebar`
scored `[]` in R5's registry — for the mirror-image reason. R5-7's blindness was *native elements at
a component-keyed deriver*; this is *producer-owned loops fed by a consumer-owned literal*. Both
drop real mounted subjects out of the denominator.

**Consequence for F.W4** (which carries R5-7 per the addendum's carried-rows table): the
`NATIVE_TEMPLATE_LOOP` family R6-5 added is necessary but **not sufficient**. A loop family keyed to
*where the `v-for` is written* still misses every row a consumer materialises across a producer
boundary. The subject's honest instance count is 0 own-loops / **2 producer-materialised rows**, and
the mounted-instance denominator the addendum leaves OPEN cannot close without a rule for that seam.

**Cure at this seat** (also removes the churn): hoist the literal to a module-scope `const
MOBILE_TABS: SegmentedTabOption[]`. Secondary: `SegmentedTabs` ships a `responsive` prop
(`SegmentedTabsProps.responsive`, `breakpoint` default `640px`) that collapses the strip to a
`<Select>` — the subject instead hand-rolls the whole mobile switch with `lg:hidden` (`:181`) +
`panel-inactive` + `useMediaQuery` (L-20). Second producer-API bypass in the same file after L-13.

**Falsifier.** If a deriver keyed loop evidence to *mounted subjects* rather than to authored `v-for`
sites, both R5-7 and this variant vanish together. R6's cure (a new family at the authoring site) does
not have that property.

---

## §5 — Module size (Goldilocks) — the honest verdict

The 486 lines split **137 script / 148 template / 198 style**.

- **Script: correctly sized.** Three composables carry the heavy state (`useViewState`,
  `useImageUpload`, `useWorkspaceLoader`), leaving a route shell that is almost entirely wiring.
  No split warranted. *No defect.*
- **Template: at the ceiling, not over it.** One `Configurator` with 12 child components and four
  `<Transition>`s. The `#stage` block (`:196-250`) is the dense part and is the natural extraction if
  one is ever wanted. *No defect.*
- **Style: over-long and the only genuinely bloated third** — 198 lines for a shell, of which 4 rules
  are dead (**L-17**), ~14 lines are producer-layout workarounds that a typed prop would delete
  (**L-13**), and one mobile block partly restates its own base rule (`:484` re-declares
  `bottom: 0.75rem` already set at `:414`). Every surviving rule is provenance-annotated with its
  wave marker — see superlative **S-5**; that annotation is what let three of the claims above be
  falsified in minutes.

**Verdict: not a god module.** The size is real but the decomposition is sound; the defect is
concentrated in the style block's accumulated workaround layer, not in the module's shape.

---

## §6 — Superlatives (L-18 both ways — same evidentiary bar)

**S-1 · The stale-response discipline in `workspace.ts` is genuinely careful, and it is load-bearing
for this component.** Three independent revision counters — `revision`, `epicycleRevision`,
`basesRevision` — with the comment at `workspace.ts:53-58` recording *why* they were split ("so that
`loadWorkspace` incrementing `revision` doesn't cause compute results to be silently discarded,
which triggers an infinite retry loop"). Every async landing point re-checks its own counter
(`:147`, `:160`, `:206`, `:223`, `:251`, `:298`, `:327`) and every load path calls
`api.abortInflight([...])` first (`:90`, `:140`, `:202`, `:270`). That is a fully-worked
cancel-and-discard protocol, rare at this scale. *Falsifier: a landing point without a guard — I
found none in the read paths; the one omission is `reset()`, filed as L-24.*

**S-2 · `useCanvasSetup` refuses to size a canvas from a zero rect.** `if (rect.width === 0 ||
rect.height === 0) return;` (`useCanvasSetup.ts:19`) — three lines that prevent the single most
common Canvas2D bug in flex/grid layouts, and the composable is DPR-correct on both the backing store
and the CSS box (`:25-31`) with a `setTransform` rather than a scale-accumulating `ctx.scale`. The
host later hit the collapsed-stage bug anyway (`VisualizationView.vue:336-343`) — *at the layout
layer, not here*. The composable's contract held. *Falsifier: a DPR path that double-scales on
re-setup — `setTransform` is absolute, so it cannot.*

**S-3 · The IntersectionObserver visibility credit is leak-free by construction.** Reference-counted
in the store with a floor at zero (`animation.ts:99-106`), acquired once per canvas with an explicit
`lastVisible` de-dupe (`BasisCanvas.vue:442-451`), **released on unmount only if held**
(`:454-459`), and with a documented no-IO fallback that registers permanently-visible so the absent
API degrades to the prior always-on loop (`:436-440`). Two canvases (inline + fullscreen) can hold
credits simultaneously and the count is correct in every order. *Falsifier: an unmount path that
skips the release, or a double-acquire — the `lastVisible` guard rules out both.* (This makes L-14's
finding sharper, not softer: the gating that exists is excellent; two rAF loops simply sit outside
it.)

**S-4 · `CanvasControlsDock` retired an out-of-band `defineExpose` for a typed emit — the right
direction, executed.** `emit "update:expanded": [value: boolean]` (`CanvasControlsDock.vue:26`,
`:34-37`) with the parent owning the ref and binding `v-model:expanded`
(`VisualizationView.vue:78`, `:212`), and the comment at `:75-77` naming the conversion. Parents no
longer reach into children for this state. *Falsifier: a surviving `defineExpose` read of dock state
— there is none.* The measure of the achievement is that the **remaining** reach-in,
`magnetRadius`'s get/set through `editorRef.value` (`VisualizationView.vue:82-85`), now reads as the
outlier it is.

**S-5 · Every non-obvious CSS rule carries its wave marker and its rationale.** `B.W2`/`B.W2.a`
(`:75-77`, `:188-193`), `B.W4` (`:381-386`), `A.W3.d` (`:425`, `:455`), `I.ε` (`:302-309`), and the
flex-collapse post-mortem at `:336-343`. This is why the audit could *falsify* rather than merely
suspect: L-13's bypass, L-17's dead rules, and the L-20 breakpoint duplication were all reachable
from the comments the authors left. Documentation as an audit affordance. *Falsifier: an
undocumented magic constant — `.controls-dock-anchor`'s offsets (`:451-453`) are the only ones, and
they are self-evident.*

**S-6 · The depth-counted `computing` flag is the correct pattern, present and working.**
`_computeDepth` / `beginCompute` / `endCompute` (`workspace.ts:60-69`) keeps the busy state true
across `extractContour` → `Promise.allSettled([computeEpicycles, computeBases])`
(`ContourSettings.vue:126-131`) with no flicker, and `reset()` zeroes the depth (`:424`). It is
cited here **because it is the proof for L-7**: the right shape exists, in the same file, forty lines
above the `loading` flag that lacks it. The defect is not ignorance — it is an unfinished
generalisation.

---

## §7 — Routing to waves

| finding | wave | note |
|---|---|---|
| **L-1**, **L-2**, **L-3** | **F.W0 or a hotfix ahead of it** | Three BLOCKERs on the primary user path (upload · edit · save). L-2 and L-3 are *data-loss* classes; they should not wait behind the tri-package uplift (CENSUS §5 risk 1). |
| L-4, L-9, L-23 | F.W4 | Contract-shape defects — dead emits, laundered option bags, thrice-declared state. All become `vue-tsc` errors once typed; a unit-test floor decision (CENSUS §4 F.W4) would catch them earlier. |
| L-5, L-6, L-7, L-24, L-26 | F.W4 | The error-posture cluster: three unhandled rejections, one unclearable full-screen error, one non-re-entrant busy flag, one dead catch. Cure as one lane — they share `workspace.ts`'s throw-and-record idiom. |
| L-13, L-20, §4's `responsive` note | **F.W1 / F.W3** | Producer-API bypass. `asideWidth` and `SegmentedTabs.responsive` already exist at the pinned 4.0.0 and survive at 7.0.0; the uplift is the moment to delete ~14 lines of workaround CSS rather than re-port it. |
| **L-14** | **F.W4** | **Amends CENSUS §3a / [FE §6,§8].** The reduced-motion clock-gating item must be re-scoped from two clocks to four, and `useCanvasHover`'s two loops wired into `anyCanvasVisible`. |
| **§4** | **F.W4** | Extends carried row R5-7: the `NATIVE_TEMPLATE_LOOP` family (R6-5) does not close the producer-boundary variant. The OPEN mounted-instance denominator needs a rule for consumer-fed producer loops. |
| L-10, L-11, L-12 | F.W4 | Model-seam defects on the `nHarmonics`/`nPoints`/view-state refs this component owns. |
| L-8, L-25, L-16, L-27, L-28 | F.W4 | Waste + divergence; cheap. |
| L-15, L-17, L-18, L-19, L-21, L-22, L-29 | F.W4 | Hygiene sweep. |
| the 1 `ui/tooltip` callsite (`:166`) | F.W3 | 1 of the 35 / 9 in carried row R3-7a. |
| the 1 `lucide-vue-next` import (`:10`) + the `useToast` → `ToastVariant` transitive break | F.W1 | 1 of the 35 rename sites; the `ToastVariant` break reaches this file through `useToast.ts:4`. |

---

*Challenge only. `/Users/mkbabb/Programming/fourier-analysis` was read exclusively; no file in any
repo was mutated except this one. No browser tooling was used — the three `UNPROVEN-NEEDS-LIVE`
marks (L-1's request count, L-2's `mode="out-in"` mount ordering, and by extension L-3's
double-listener firing) are the rows SS-13 should settle first, in that order.*
