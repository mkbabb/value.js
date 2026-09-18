claude-opus-5[1m] (served model id)

# CHALLENGE C — `VisualizationView.vue` on the CONSUMPTION axis

**Subject** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/visualization/VisualizationView.vue` (486 lines).
**Axis** consumption of value.js (0.13 pinned) · keyframes.js (4.3) · glass-ui (^4.0.0) · the fourier 45-operation API · props/emits contract quality · integration seams.
**Mode** static, read-only, source-derived. **No browser tooling.** Livable-only claims are marked `UNPROVEN-NEEDS-LIVE` for SS-13.
**Substrate** fourier HEAD `cd26c6533adc32dfe1453d74117d3cb73b89ea16`, 28 dirty paths — byte-identical to the coordinate R4-9 / X-4 pinned. Nothing below is stale-at-HEAD.
**Posture** the component was assumed DEFECTIVE until the tree proved otherwise. Every row below carries a severity, a `file:line`, and the falsifier that would kill it. Superlatives carry the same (L-18 runs both ways).

**Tally** 26 defects (2 BLOCKER · 7 MAJOR · 14 MINOR · 3 INFO) · 6 superlatives.

---

## §0 — What this component actually consumes (the measured surface)

The import closure was enumerated and grepped (31 files: the 13 direct SFC children, 3 local composables, 3 stores, the `ui/tooltip` adapter, `useToast`, plus the second-level `GlassTimeline` / `EasingPicker` / `EasingCurvePreview` / `SpeedSelect` / `SliderControl` / `CollapsibleSection` / `FrequencyGraph` / `CoefficientsSpectrum` / `NotationPills` and `lib/{easings,colors,api}.ts`).

| Producer | Direct in `VisualizationView.vue` | In its transitive closure | Note |
|---|---|---|---|
| **value.js 0.13.0** | **0** | **2 import statements / 1 file / 6 symbols** — `lib/easings.ts:9` (`timingFunctions`) + `:10-16` (`easeInOutSine/Cubic/Quad/Expo/Circ`) | Both are **bare-root** specifiers. The closure owns **all 6 distinct value.js symbols the whole app uses**, through 2 of the app's 5 statements (census §1 / lane-frontend §5). |
| **keyframes.js 4.3.0** | 0 | **0 — ABSENT.** The only mention is `stores/animation.ts:47-50`, a comment recording that the `Animation` graph was **excised as dead substrate**. | See MIN-8. |
| **glass-ui 4.0.0** | 3 subpaths (`/tabs:27`, `/configurator:28`, `/button:29`) | **17 distinct subpath occurrences over 16 subpaths**; 9 × `/button`, 4 × `/slider`, 4 × `/configurator`, **3 × `/metric-badge`**, 3 × `/dock`, **2 × `/hover-popover`** | 5 of the 6 census break-rows are inside this closure — see MAJ-6. |
| **fourier API** | 0 direct `lib/api` imports; **3 operations reached via 2 stores** — `POST /api/visualizations` (`workspace.ts:347`), `GET /api/visualizations/{slug}` (`gallery.ts:223`), `PATCH /api/visualizations/{slug}` (`api.ts:420-430`) — plus `POST /api/images` via `store.uploadImage` | | `api.ts:420` + `api/routers/visualizations.py:350` are **R6-8's exact C31 target**; this component is the top of that client leaf. |
| **local `ui/tooltip` adapter** | **exactly 1 callsite** (`:166`) | 35 across 9 consumers | Reproduces **R3-7a**'s per-file figure exactly (VisualizationView = 1 of 35). |

The component declares **zero props and zero emits**. It is a pure route shell for **two** route records — `/v/:visualizationSlug` and `/w/:imageSlug?` (`router/index.ts:57-79`) — and its own CSS comment (`:302-309`) asserts that fact. That assertion is where the first blocker lives.

---

## §1 — BLOCKERS

### BLK-1 · The `/v/:visualizationSlug` route is data-dead: the saved-visualization read operation is client-unreachable from its own route

**Severity BLOCKER.** Provenance: `VisualizationView.vue:50` · `composables/useWorkspaceLoader.ts:24-47` · `stores/workspace.ts:197-239, 447-451` · `router/index.ts:57-67` · `GalleryView.vue:370, 396`.

`VisualizationView` obtains all of its loading behaviour from `useWorkspaceLoader(activeBases)` (`:50`). That composable reads **`route.params.imageSlug` and nothing else** — `useWorkspaceLoader.ts:25` (`onMounted`) and `:36` (the param watcher). It calls `store.loadWorkspace(...)` only.

`store.loadVisualization(slug)` (`workspace.ts:197`) — the sole wrapper over `GET /api/visualizations/{slug}`, the one that captures the `If-Match` validator (`:205-208`) and hydrates `contour_settings` / `animation_settings` from the saved entity (`:213-224`) — has **zero call sites**:

```
$ grep -rn "loadVisualization\|loadSnapshot" web/src
stores/workspace.ts:197,237,238,447,448,451   # definition, alias, re-export only
```

`grep -rn "'/v/\|\`/v/\|\"/v/" web/src` returns **only comments and the route record** — no navigation in the tree ever targets `/v/`. The gallery deliberately routes elsewhere: `GalleryView.vue:370` and `:396` both `router.push(\`/w/${...}\`)`.

Consequence on direct/bookmarked entry to `/v/<slug>`: `route.params.imageSlug` is `undefined`, so `useWorkspaceLoader.ts:26` is skipped; the `else if` at `:28-30` fires `router.replace('/w/' + store.imageSlug)` when a session is warm — **navigating the user off the saved-visualization route** — and does nothing at all when it is cold, leaving `store.loading === false` and `store.error === null`, so `VisualizationView`'s `v-else` main workspace (`:179`) renders with `hasData === undefined` and `hasImage === false`: an empty canvas placeholder.

Compounding: `router/index.ts:20-26` `isVizMorph()` treats `visualization` as a morph-eligible name, so the View-Transitions bracket (`:131-147`) **opens a transition for a route that renders nothing**; and the `useWorkspaceLoader.ts:29` redirect issues a fresh navigation *inside* the open transition, tripping the `resolveViewSwap?.()` flush at `router/index.ts:134`.

This is **R3-7c** ("36 client edges, nine gap operations") made concrete at a component, and it is the sharpest instance of the census's risk 9 / fourier's own `M.md §7` "inv-15 consumer gap (7 endpoints, 0 callers)". The client function exists and is exercised elsewhere (`gallery.ts:167, 205, 223`); the **route → component → store** edge for the primary read does not.

> **Falsifier.** A call to `store.loadVisualization` / `store.loadSnapshot` anywhere in `web/src`, or a `route.params.visualizationSlug` read in any loader, or a navigation targeting `/v/`. All three greps are empty at HEAD `cd26c653`.
> **Live consequence** (the exact rendered frame for a third party opening a published visualization) is `UNPROVEN-NEEDS-LIVE`; the code path is proven.

### BLK-2 · Publish is non-idempotent and non-atomic: every click mints a new draft row, and a failed lift orphans it with no UI handle

**Severity BLOCKER.** Provenance: `VisualizationView.vue:105-118, 219, 225` · `stores/workspace.ts:344-365, 456-460` · `stores/gallery.ts:219-235` · `lib/api.ts:372-379, 420-430` · `CanvasControlsDock.vue:70-74`.

`handlePublish()` (`:106-118`) does:

```
const snapshot = await store.createSnapshot();      // :110
...
await gallery.publish(snapshot.slug, store.imageSlug);  // :112
```

`createSnapshot` is an alias for `saveVisualization` (`workspace.ts:460`), which **unconditionally** `POST`s a brand-new entity (`workspace.ts:347` → `api.createVisualization` → `api.ts:378` `{ method: "POST" }`). It never consults `store.visualizationSlug` (`workspace.ts:39`) or `visualizationETag` (`:41`) — both of which it *writes* at `:358-359` and which `VisualizationView` never reads anywhere in its 486 lines. `gallery.publish` then does a `GET` (for the validator) plus a `PATCH` to `visibility: "public"` (`gallery.ts:223-228`).

So one button press is **three round-trips**, and:

1. **Non-idempotent.** A second press mints a *second* draft entity and publishes it. Nothing prevents the second press: `CanvasControlsDock.vue:71` renders the publish button with `:class="{ 'is-active': publishing }"` and **no `:disabled`** (`grep -n "disabled" CanvasControlsDock.vue` → empty). `publishing` is decoration, not a guard.
2. **Non-atomic.** If the `PATCH` fails, `gallery.publish` swallows it into a toast (`gallery.ts:232-234`) and returns; the `draft` row created at step 1 is now orphaned server-side, and because `VisualizationView` never surfaces `store.visualizationSlug`, the UI has **no handle** to retry, update, or delete it.
3. The store itself books this component as the debt: `workspace.ts:457-459` — *"`createSnapshot` is retained as an alias for the **(unmigrated) visualization-view publish call site**"*.

This is the create/derive half of the megatranche's admission horizon (census §4 F.W8: "create → derive → diff → remix → history walk") failing at its only UI entry point, and it is the sibling of fourier defect **F-α** (every version `depth=0`; the chain never deepens — census §5 risk 5 / X-8): publishing twice produces two unrelated roots rather than one entity with a history.

> **Falsifier.** An idempotency key, an `If-None-Match`, a `store.visualizationSlug` guard in `handlePublish`, or a `:disabled="publishing"` on the dock button. None exist. `saveVisualization` would also have to branch to `updateVisualization` when a slug is already held — `workspace.ts:344-365` has no such branch.

---

## §2 — MAJOR

### MAJ-1 · The same drop handler is bound on an ancestor and its descendant: one file drop uploads twice

**Severity MAJOR.** Provenance: `VisualizationView.vue:141` (root `@drop="globalDrop"`) and `:147` (overlay `@drop="globalDrop"`, a *child* of that root) · `composables/useImageUpload.ts:31-40`.

```
140  <div class="flex flex-col flex-1 min-h-0"
141      @drop="globalDrop" ...>
145      <Transition name="fade">
146          <div v-if="globalDragging" class="fixed inset-0 z-[var(--z-overlay)] ..."
147              @drop="globalDrop" @dragover.prevent>
```

`useImageUpload.handleDrop` calls `e.preventDefault()` and **never `stopPropagation()`** (`useImageUpload.ts:32-39`). The overlay is a DOM descendant of the root, so a drop on the visible overlay dispatches to `:147` and then bubbles to `:141` — **`globalDrop` runs twice on the same event**, and both runs read a still-populated `e.dataTransfer.files[0]` and call `onFile(file)` → `store.uploadImage(file)` (`VisualizationView.vue:42`).

The `isDragging.value = false` written by the first run cannot unmount the overlay before the bubble phase: Vue ref writes flush on a microtask, DOM dispatch is synchronous along the path captured at dispatch time.

Each duplicate upload runs `invalidateInFlightComputation()` + `api.abortInflight([...])` + a `POST /api/images` + `router.push('/w/...')` + `_saveDraftNow()` (`workspace.ts:111-133`), i.e. the second upload aborts the first's in-flight extraction.

> **Falsifier.** `@drop.stop` on `:147`, a `stopPropagation()` in `useImageUpload.ts:31-40`, or the overlay teleported outside the root. None present. (Server-side sha256 dedup — `workspace.ts:119-121` — makes the *stored asset* idempotent; the client-side abort/compute churn is not.)

### MAJ-2 · Two of the four export switches are dead: `withEpicycles` and `withTrail` have no consumer

**Severity MAJOR.** Provenance: `VisualizationView.vue:98-102, 281` · `ExportModal.vue:23-42, 55-70` · `BasisCanvas.vue:462-469`.

`ExportModal` renders four `<Switch>`es and emits all four (`ExportModal.vue:36-41`):

```
withEpicycles: props.hasEpicycles && withEpicycles.value,
withTrail:     withTrail.value,
withGrid:      withGrid.value,
withLabels:    withLabels.value,
```

`VisualizationView.doExport` forwards the whole bag verbatim to `canvasComponent.value?.exportFrame(options)` (`:99-102`). `BasisCanvas.exportFrame` destructures **only two keys** (`BasisCanvas.vue:466-469`):

```
const { withGrid: showGrid = true, withLabels: showLabels = true } = options;
```

```
$ grep -rn "withEpicycles\|withTrail" web/src
ExportModal.vue:23,24,37,38,57,61        # producer only — zero consumers
```

Two user-facing controls in a modal therefore do nothing. `VisualizationView` is the mediator that makes the mismatch invisible: it types the payload as an untyped `Record<string, boolean>` on both sides (`:99`, `ExportModal.vue:19`), so `vue-tsc` — the *only* type gate in this repo (census §3a: vitest ABSENT) — cannot see it.

> **Falsifier.** Any read of `withEpicycles` / `withTrail` outside `ExportModal.vue`. The grep is exhaustive over `web/src`.

### MAJ-3 · The host destroys `Configurator`'s mobile grid contract, then patches the primitive's internals with `:deep()`

**Severity MAJOR.** Provenance: `VisualizationView.vue:331-348` · installed `@mkbabb/glass-ui@4.0.0` root classes (extracted from `dist/useConfiguratorState-kiIlun8I.js`).

The pinned primitive's root carries, verbatim:

```
"grid grid-cols-1"
"grid-rows-[minmax(var(--configurator-stage-min,18rem),auto)_minmax(0,1fr)] lg:grid-rows-none"
"lg:grid-cols-[minmax(0,1fr)_minmax(var(--configurator-aside-min,280px),var(--configurator-aside-max,360px))]"
```

Below `lg` the stage row already has an **18rem floor**. The host overrides the display mode out from under it:

```
333  @media (max-width: 1023px) {
334      .viz-configurator { display: flex; flex-direction: column; }
...
344      .viz-configurator :deep(.configurator-stage) { flex: 1 1 0%; min-height: 0; }
```

Switching `display: grid` → `flex` makes `grid-template-rows` inert, which is precisely the 0px-stage collapse the host's own comment narrates at `:336-343` ("the `<canvas>` renders at ~4px and the bottom AnimationControls dock floats up under the sticky header"). The cure is then a `:deep()` reach into `.configurator-stage`, a **producer-owned internal class name** the primitive publishes no contract for.

That coupling is uplift-fragile: at producer 7.0.0 the stage cell is re-keyed behind attribute selectors — `glass-ui/src/components/configurator/styles.css:193` `[data-slot="configurator"] > .configurator-stage`, plus `[data-gallery="aside"|"top"]` and `[data-aside-side="left"]` variants at `:223, :240, :380` — and the mobile row template gains a third `auto` gallery track (`Configurator.vue:190`). A raw `display: flex` + `:deep(.configurator-stage)` pair survives that hop by luck, not contract.

The genuine gap being worked around is real and worth relaying upstream: the primitive's mobile rows are `stage = minmax(18rem, auto)` + `aside = minmax(0, 1fr)`, which **cannot express "stage fills"** — the mode this route needs when its mobile tab bar hides the aside (`:253`, `:443-447`). The cheap in-grid cure is `grid-template-rows: minmax(0,1fr) auto` on `.viz-configurator`, which keeps `display: grid` and needs no `:deep()`; the durable cure is a producer `stageFill` / row-template axis. Per standing law (feedback-glassui-bhbi-relay) this belongs in the glass-ui BH inbox.

> **Falsifier.** If the 4.0.0 root carried no mobile `grid-template-rows` — it does (string above, extracted from the installed dist). If the `:deep()` targeted a host-owned class — `.configurator-stage` is emitted by `Configurator.vue:315` in the producer tree.

### MAJ-4 · The aside width band is hand-rolled at three breakpoints while the primitive ships a first-class API for it

**Severity MAJOR.** Provenance: `VisualizationView.vue:317-330` · `glass-ui@4.0.0 dist/components/custom/configurator/Configurator.vue.d.ts` (the `asideWidth` prop) · the `lg:grid-cols-[…var(--configurator-aside-min,280px)…]` root class.

```
317  @media (min-width: 1024px) { .viz-configurator { … grid-template-columns: minmax(0,1fr) minmax(320px,360px); } }
325  @media (min-width: 1280px) { .viz-configurator { grid-template-columns: minmax(0,1fr) minmax(360px,400px); } }
328  @media (min-width: 1536px) { .viz-configurator { grid-template-columns: minmax(0,1fr) minmax(400px,440px); } }
```

The pinned `Configurator` documents exactly this, as a supported surface:

> *"Aside width band at `lg`+ width, as a CSS length pair driving `minmax(--configurator-aside-min, --configurator-aside-max)`. The prop sets the two inline custom properties; **consumers may instead (or also) set `--configurator-aside-min` / `--configurator-aside-max` via the cascade.** Default band is `280px`/`360px`."*

Setting two custom properties inside three media queries would have expressed the same intent without re-declaring `grid-template-columns` at all. As written, the host's declaration wins only by scoped-attribute specificity `(0,2,0)` over Tailwind's `(0,1,0)` — an accident, not a contract — and it hard-codes the *whole* track list, so any future producer change to the stage track (e.g. 7.0.0's `data-gallery="aside"` three-column mode) is silently overwritten.

> **Falsifier.** `asideWidth` absent from the 4.0.0 prop table, or `--configurator-aside-min/max` not honoured at 4.0.0. Both are present in the installed `.d.ts` and the installed root class string.

### MAJ-5 · `v-model:n-harmonics` / `v-model:n-points` on `ContourSettings` bind a two-way model to a child that never emits (2 sites)

**Severity MAJOR.** Provenance: `VisualizationView.vue:260` (editing branch) and `:270` (viz branch) · `ContourSettings.vue:26-29`.

```
260  <ContourSettings v-if="hasImage" v-model:n-harmonics="nHarmonics" v-model:n-points="nPoints" />
270  <ContourSettings v-if="hasImage" v-model:n-harmonics="nHarmonics" v-model:n-points="nPoints" />
```

`ContourSettings` declares them as **plain read-only props** and has no `defineEmits` for them at all:

```
26  const props = defineProps<{ nHarmonics: number; nPoints: number }>();
```

```
$ grep -n "nHarmonics\|nPoints" ContourSettings.vue
27,28 (props) · 96,97 (compute key) · 119,120 (payload) · 141,180 (watch deps)   # zero emits
```

So both `v-model:` bindings register `onUpdate:nHarmonics` / `onUpdate:nPoints` listeners that can never fire. The idiom advertises `ContourSettings` as a co-owner of the harmonics/points model; it is a pure consumer (it uses them only to build the compute key and the extraction payload). The **actual** owner is `BasisSelector` (`:265-267`, which does emit — `BasisSelector.vue:19-23`).

Adjacent inconsistency in the *same tag*: `BasisSelector` gets `v-model:n-harmonics` + `v-model:n-points` but `:active-bases` + `@update:active-bases="activeBases = $event"` (`:265-267`) — three models, two idioms, one element.

> **Falsifier.** An `emit("update:nHarmonics"…)` or `defineModel` in `ContourSettings.vue`. Neither exists; the file has no `defineEmits` call.

### MAJ-6 · This closure carries 9 of the 15 enumerated glass-ui 4→7 break sites, including the hard typecheck break

**Severity MAJOR.** Provenance: measured grep over the 31-file closure; break rows quoted from lane-frontend §5 (which quotes `glass-ui/CHANGELOG.md`).

| Removed surface | Sites **inside this component's closure** |
|---|---|
| `./metric-badge` (gone at 7.0.0) | `AnimationControls.vue:10` · `EditorControlsDock.vue:5` · `EquationPanel.vue:12` — **3 of 7** |
| `./hover-popover` (gone at 5.0.0) | `EditorControlsDock.vue:4` · `CanvasControlsDock.vue:6` — **2 of 2 (all)** |
| `DockIconButton` (definition-absent) | `EditorControlsDock.vue:6` · `CanvasControlsDock.vue:7` — **2 of 2 (all)**, plus **24 template usages** in those two files |
| `DockDropdownTrigger` (definition-absent) | `AnimationControls.vue:8` — **1 of 1 (all)** |
| `type ToastVariant` (definition-absent → **hard `vue-tsc` break**) | `composables/useToast.ts:4`, used at `:9` — **1 of 1 (all)**, reached from `VisualizationView.vue:13` |
| `./hover-card` | 0 (lives in the equation/header routes) |

**9 of 15 import-level break sites (60 %)** hang off this one route shell, including the single definition-absent *type*. `lucide-vue-next` (rename to `@lucide/vue` at glass 7's peer) appears in **12 of the 31 closure files**. And both of lane-frontend §4's 🔴 HARD shadows are in-closure via `AnimationControls`: `GlassTimeline.vue` (`AnimationControls.vue:11`; the producer's `./timeline` subpath exists at 4.0.0 and is imported 0 times) and `EasingPicker.vue` + `EasingCurvePreview.vue` (`:12`; the producer README's forbidden "fourth fork").

The consumption reading: **`VisualizationView` is the single highest-leverage F.W1 work item in the frontend.** Uplifting this one route shell's closure discharges the majority of the break surface and both hard shadows at once.

> **Falsifier.** A closure file mis-attributed (the file list is enumerated in §0 and re-derivable by following the `import` graph from `VisualizationView.vue:1-29`), or a removed-subpath row that does not hold at producer 7.0.0 (each is quoted from `glass-ui/CHANGELOG.md` via lane-frontend §5, and `ToastVariant` is independently `grep`-absent from the producer tree).

### MAJ-7 · A failed publish raises two toasts, one of them generic and wrong

**Severity MAJOR.** Provenance: `VisualizationView.vue:110-114` · `stores/workspace.ts:361-364` · `composables/useWorkspaceLoader.ts:125-133`.

`saveVisualization` catches, writes `error.value = e.message ?? "Failed to save visualization"`, and returns `null` (`workspace.ts:361-364`). `VisualizationView` sees the `null` and raises its own toast:

```
111  if (!snapshot) { toast("Could not create snapshot", "error"); return; }
```

Meanwhile `useWorkspaceLoader.ts:125-133` — installed by this very component at `:50` — watches `store.error` and, because `store.imageSlug` is set, raises a **second** toast carrying the real server message.

The user gets two error toasts for one failure: one specific and useful, one generic and using a retired noun (see MIN-4). The component discards the diagnostic (`store.error`) it already has in hand.

> **Falsifier.** `store.error` not being set on the `saveVisualization` failure path (`workspace.ts:362` sets it), or the loader's watcher being gated off (its only guard is `err && store.imageSlug`, both true here).

---

## §3 — MINOR

**MIN-1 · `showGhost` is the only view toggle that is not persisted.** `useViewState.ts:18-21` seeds `isEditing`, `showImageOverlay`, `showEquation` from `localStorage` but hard-codes `showGhost = ref(true)`; `:43-49` writes only the other three. `VisualizationView` nonetheless passes `showGhost` as a peer of `showImageOverlay` to four consumers (`:200, 216, 224, 241, 282-285`) and mutates it identically (`:224`, `:245`, `:285`). One of four toggles silently resets on reload. *Falsifier:* a `ghost` key in `loadViewState()`'s shape (`useViewState.ts:6`) — the type literally omits it.

**MIN-2 · `--duration-mid` is a token that does not exist in glass-ui, at either version.** `VisualizationView.vue:402` — `transition: opacity var(--duration-mid, 0.24s) ease`. The installed 4.0.0 duration scale is `--duration-{instant,fast,normal,slow,xl,xxl,panel}` (measured over `dist/**/*.css`); `--duration-mid` is absent. The literal fallback is what actually runs, so the canvas crossfade is a hard-coded 0.24s outside the design system. *Falsifier:* a `--duration-mid:` definition in `glass-ui/dist` or `web/src` — `grep -rn -e "--duration-mid:"` is empty in both trees.

**MIN-3 · Dead CSS: three `.expand-pop-*` rules and one `.viz-grid` rule.** `VisualizationView.vue:426-428` and `:483`. Neither class appears in this component's template (scoped styles reach only that template plus child roots), and `grep -rn "expand-pop\|viz-grid" web/src` returns **only these four declaration lines**. Compounding: `:426` references `var(--ease-apple-spring)`, which is **also undefined** — glass-ui ships `--ease-apple` and `--ease-spring{,-smooth,-snappy,-bouncy,-gentle}` (`dist/styles/theme/bridges.css:320-331`), never `--ease-apple-spring`. Had the rule been live, the undefined custom property would render the whole shorthand invalid at computed-value time. *Falsifier:* a `.expand-pop` or `.viz-grid` usage anywhere; the grep is over all of `web/src`.

**MIN-4 · Retired-noun leak into code and user-facing copy.** `:110` `const snapshot = await store.createSnapshot()` and `:111` `toast("Could not create snapshot", "error")`. The converged entity is a *visualization* (`workspace.ts:17-22, 191-196` — "CRUD-CONTRACT §1"), and `createSnapshot` survives only as an alias explicitly annotated as debt owed by this call site (`workspace.ts:456-460`). The vocabulary the F.W5 shared-provenance contract must standardise is contradicted in a string the user reads. *Falsifier:* a `snapshot` entity still existing in `api/routers/` — `lib/api.ts:365-368` documents "six slug-addressed endpoints over `/api/visualizations`", and there is no snapshot client function.

**MIN-5 · A dead positional argument kept alive by this one call site.** `:112` `gallery.publish(snapshot.slug, store.imageSlug)`; `gallery.ts:214-219` documents the second parameter as *"the legacy `imageSlug` positional — **unused** under the converged identity … kept so the pre-existing call site need not change"* and names it `_imageSlug`. `VisualizationView` is that sole call site. Dropping the argument here retires the parameter. *Falsifier:* another `gallery.publish(` caller — `grep` finds none besides `:112`.

**MIN-6 · Unchecked cast in the template, papering over a producer typing gap.** `:185` `@update:model-value="mobileView = $event as 'controls'|'canvas'"`. `SegmentedTabs@4.0.0` models `modelValue: string` and emits `(value: string)` (`dist/…/SegmentedTabs.vue.d.ts`), so a plain `v-model="mobileView"` against a narrowed ref would not type-check — the cast is a workaround, not carelessness. It is nonetheless an unchecked narrowing that will silently lie if the `options` array at `:183` ever grows. The right fix is upstream (a generic `SegmentedTabs<TValue extends string>`); per standing law that is a glass-ui BH-inbox relay. *Falsifier:* a generic model type on `SegmentedTabs` at 4.0.0 — the `.d.ts` shows `__VLS_ModelProps = { modelValue: string }`.

**MIN-7 · Publishing triggers a full gallery list refetch from a route that never renders the gallery.** `gallery.ts:231` `await resetAndFetch()` inside `publish()`, reached from `VisualizationView.vue:112`. `resetAndFetch` clears `entries`, resets the cursor, and issues `GET /api/visualizations?limit=20&sort=…` (`gallery.ts:84-103`) — a wasted round-trip plus a store-wide state reset on a route with no gallery surface. *Falsifier:* a `GalleryView`/`GalleryCard` mounted from `VisualizationView` — its template (`:139-286`) mounts none.

**MIN-8 · keyframes.js is inert across this entire closure while its pin is the lock on the tri-package deadlock.** Zero `@mkbabb/keyframes` imports in all 31 closure files; the sole mention is `stores/animation.ts:47-50`, recording that the `Animation` graph was excised as dead substrate. All motion in this component is hand-rolled: four `<Transition>` recipes (`:426-440`) plus eight raw `transition:` declarations, with **twelve literal durations** (`0.3s`, `0.35s`, `0.2s`, `0.15s`, …) and not one duration token, even though glass-ui ships a seven-rung scale. Meanwhile `keyframes.js@4.3.0`'s `optionalDependencies: {"@mkbabb/glass-ui": "~4.0.0"}` is the tilde that hard-locks glass-ui to 4.0.x (census §5 risk 1) — this route pays the deadlock's full cost for a dependency it does not use. *Falsifier:* any keyframes import in the closure; the grep is empty.

**MIN-9 · The `{ once: true }` animation-settings seeder can be consumed by this component's own debounced writer.** `VisualizationView.vue:53-65` writes `store.animationSettings` 500 ms after any change to `activeBases` / `anim.easing` / `anim.speed`, guarded only by `if (!store.imageSlug) return`. `useWorkspaceLoader.ts:50-60` seeds `activeBases` / `easing` / `speed` from `store.animationSettings` under `{ once: true }`. After an *upload* (`workspace.ts:123` sets `imageSlug` and never touches `animationSettings`), a user easing change fires the writer first and burns the one-shot seeder; a later in-place `loadWorkspace` (route-param change, `useWorkspaceLoader.ts:35-47` — no remount) then hydrates `animationSettings` with no watcher left to apply it. Per-workspace easing/speed/basis restoration is lost for the rest of the session. *Falsifier:* `{ once: true }` absent, or the seeder re-registered on route change. Neither. Runtime confirmation is `UNPROVEN-NEEDS-LIVE`; the ordering is proven from the source.

**MIN-10 · `FullscreenViewer` is mounted unconditionally, including on the loading and error screens.** `:282-285` sits outside the `v-if` / `v-else-if` / `v-else` chain (`:156`, `:162`, `:179`). `FullscreenViewer.vue:100-101` installs a `document`-level `keydown` listener at mount regardless of `visible`; `onKeydown` guards on `props.visible` (`:92`) so behaviour is correct, but a global listener + a `Teleport` + a `watch(..., {immediate:true})` are paid on a route that has failed to load. *Falsifier:* the listener being registered inside the `visible` watcher — it is in `onMounted`.

**MIN-11 · `ContourEditorCanvas` declares a `save` emit that is never emitted.** `ContourEditorCanvas.vue:26` `save: [points: { x: number[]; y: number[] }]`; `grep -n "emit(" ContourEditorCanvas.vue` shows only `stateChange` (`:124`). `VisualizationView` correctly does not listen for it (`:204-206`) — it owns saving through `EditorControlsDock`'s `@save` plus an imperative `editorRef.getPoints()` (`:92-96`). The declared emit is a phantom contract advertising a push API the parent has already replaced with a pull. *Falsifier:* any `emit("save"` in the child.

**MIN-12 · `hasData` is not a boolean, and the component treats it inconsistently.** `:121` `computed(() => store.epicycleData || store.basesData || store.computing)` types as `EpicycleData | AnimationData | boolean`. The component coerces at `:217` (`:has-data="!!hasData"`) — acknowledging the problem — but uses raw truthiness at `:198`, `:210` and `:235`. A `computed<boolean>` with an explicit `!!` at the source removes the asymmetry. *Falsifier:* a `boolean` annotation on the computed — there is none.

**MIN-13 · The mobile canvas has a click-to-upload affordance with no keyboard path.** `:198` binds `@click="onCanvasClick"` on a plain `<div>` with no `role`, `tabindex`, or key handler; `:127-131` forwards to a `class="hidden"` file input (`:201`). The keyboard-reachable equivalent is `ImageUpload`'s `<button>` (`ImageUpload.vue:92-111`) — which lives in the aside and is `display: none` on the mobile Canvas tab (`:253` `panel-inactive`, `:443-447`). So on mobile-canvas the only upload affordance is mouse/touch-only. *Falsifier:* a keyboard handler on `.canvas-container`, or the aside remaining reachable on the canvas tab. Neither.

**MIN-14 · Export behaves differently depending on which dock you invoke it from.** Inline: `AnimationControls @export-frame` → `handleExportFrame()` (`:98`) → `showExport = true` → the four-switch `ExportModal` (`:281`) → `doExport(options)`. Fullscreen: the same `AnimationControls` menu item is wired at `FullscreenViewer.vue:138` straight to `canvasComponent?.exportFrame()` — **no dialog, no options**. One labelled affordance, two behaviours. *Falsifier:* an `export-frame` → modal path inside `FullscreenViewer` — `:138` is the whole handler.

---

## §4 — INFO

**INF-1 · Zero props, zero emits — no contract to break, and no seam to test.** The component's entire input surface is three Pinia stores (`:32-34`), the route, and `localStorage`. That is defensible for a route shell, but it means the only way to exercise `handlePublish`, `doExport` or the `/v/` path is end-to-end — and this repo has **no unit-test runner at all** (census §3a / lane-frontend §0: vitest ABSENT; the gates are `vue-tsc -b` + 29 Playwright tests on a single chromium project). The two blockers above are exactly the class of defect a mounted-component test would have caught.

**INF-2 · `view-transition-name: viz-canvas-stage` uniqueness during the morph is unverified.** `:310-316` asserts "the name is page-unique (one stage per route)". `/v/` and `/w/` are **distinct route records** (`router/index.ts:57, 68`), so vue-router remounts rather than reuses; if Vue mounts the incoming `VisualizationView` before unmounting the outgoing one, two live elements would briefly share the name and the browser would skip the transition with a console warning. `UNPROVEN-NEEDS-LIVE` (SS-13: navigate `/w/<slug>` → `/v/<slug>` with a View-Transitions engine and PRM off, and watch for `Unexpected duplicate view-transition-name`). Note this is moot until BLK-1 is cured.

**INF-3 · The editor "saved" indicator's correctness rests on microtask ordering.** `onEditorSave` (`:92-96`) sets `editorSaved = true` after awaiting `store.saveContourPoints`, which sets `contour.value` (`workspace.ts:272`), which fires `ContourEditorCanvas`'s `watch(() => props.contour, initFromContour)` (`ContourEditorCanvas.vue:72`) → `emitState()` → `onEditorStateChange` → `editorSaved = false` (`:87-90`). Pre-flush watcher jobs are queued at mutation time and therefore run *before* the awaited continuation, so the flag lands `true` — by ordering, not by design. Any change to flush timing silently inverts the checkmark. `UNPROVEN-NEEDS-LIVE`.

---

## §5 — SUPERLATIVES (L-18 both ways)

**SUP-1 · The double-gated View-Transitions anchor is exemplary progressive enhancement — the best motion construction in the tree.** `:302-316`. It is the **only** `prefers-reduced-motion: no-preference` gate in all of `web/src` (lane-frontend §8 enumerates all 18 PRM references), it is *additionally* wrapped in `@supports (view-transition-name: --x)`, its comment names the floor it degrades to (`the inv-29 floor`), names the cascade that owns the look (glass-ui's `view-transition.css`), and names the uniqueness precondition. The engine detection is not re-forked either: the router imports `supportsViewTransitions` from `@mkbabb/glass-ui` (`router/index.ts:2`). *Falsifier:* another `no-preference` gate in the tree, or a missing `@supports` guard. Neither.

**SUP-2 · An out-of-band `defineExpose` reach-in was converted to a typed emit — with the change recorded at both ends.** `:75-78` (parent comment + `dockExpanded` ownership + `v-model:expanded` at `:212`) ↔ `CanvasControlsDock.vue:26, 31-37` (the `"update:expanded": [value: boolean]` declaration and the watcher that raises it). This is the correct direction of travel for every parent↔child seam in the file. *Caveat, stated:* the coupling moved one level down rather than away — `CanvasControlsDock.vue:29, 35` still reads `dockRef.value?.expanded` off `GlassDock`'s exposed surface. *Falsifier:* a surviving `canvasControlsDockRef.expanded` read in the parent — there is none.

**SUP-3 · The stylesheet audits itself.** Three comment blocks — `:290-295` (why the chassis was adopted and what it replaced), `:331-343` (the exact mechanism of the mobile stage collapse, down to "the `<canvas>` renders at ~4px"), `:380-386` (why `flex: 1` is inert inside a `position: relative` grid cell) — each record a *mechanism* plus the wave that produced it (B.W2.a, B.W4). This is why MAJ-3 above could be diagnosed from source alone with no browser. Very few components in any of the three trees narrate their own layout bugs this well; the defect is that the narration substitutes for an upstream ask, not that it exists.

**SUP-4 · Tooltip economy: exactly one callsite, on the one control that needs it.** `:166`, wrapping the "Start fresh" recovery button. Every other tooltip in this subtree is delegated to the docks. This reproduces **R3-7a**'s per-file figure exactly (VisualizationView = 1 of the 35 callsites over 9 consumers), and it makes the F.W3 `ui/tooltip` → `@mkbabb/glass-ui/tooltip` migration a one-line change here. *Falsifier:* `grep -c "<Tooltip" VisualizationView.vue` → 1.

**SUP-5 · Zero direct `reka-ui`, zero shadcn copies, zero bespoke buttons.** The only chrome affordance authored in this file is a glass-ui `Button variant="outline"` (`:167-173`); everything else is composed from `SegmentedTabs`, `Configurator`, the docks, and the local tooltip adapter. Together with the `@mkbabb/glass-ui/configurator` chassis adoption at `:194`, this is the "deepest, cleanest consumer in the constellation" posture (census §3a) holding at the component level, not just in aggregate. *Falsifier:* a `from "reka-ui"` or a `cva(` in the file — neither; `grep -rn 'from "reka-ui"' web/src` is empty tree-wide.

**SUP-6 · A cross-component CSS-variable contract was retired for a typed prop — by the same hand that wrote MAJ-3/MAJ-4.** `AnimationControls.vue:18-26` replaced the `--animation-dock-max-width` custom-property contract (formerly fed from `FullscreenViewer`'s scoped `.fs-controls`) with a `maxWidth?: string` prop, and `FullscreenViewer.vue:135, 225-227` records the retirement. The house style demonstrably knows that cross-component styling contracts should be typed props — which is exactly the standard MAJ-4's hand-rolled `grid-template-columns` and MAJ-3's `:deep(.configurator-stage)` fall short of. The fix for both has an in-tree precedent. *Falsifier:* a surviving `--animation-dock-max-width` write outside `AnimationControls.vue:62` — none.

---

## §6 — Corpus reconciliation (agree / extend / contradict)

| Hitherto row | This challenge |
|---|---|
| **R3-7a** — 35 Tooltip callsites over 9 consumers, VisualizationView = 1 | **AGREE, exact.** `grep -c "<Tooltip"` → 1. Cited at SUP-4. |
| **R3-7c** — 36 client edges / 9 gap operations | **EXTENDED with a named instance.** BLK-1 identifies a gap that is worse than "no caller": the client function exists, the *route* exists, and the edge between them is missing. |
| **R6-8** — operation identity must not embed client back-references | **AGREE + live corroboration.** `lib/api.ts:420-430` (`updateVisualization`, `{ method: "PATCH", … }`) is C31's exact mutation target, and this component is the top of that client leaf (BLK-2 reaches it through `gallery.ts:224`). The F.W5 contract constraint is confirmed from the consumer side. |
| **X-3** — 45 total ops / 30 public-non-admin / 13 admin | **AGREE**; this closure reaches 4 of the 45 (`POST /api/images`, `POST /api/visualizations`, `GET /api/visualizations/{slug}`, `PATCH /api/visualizations/{slug}`) — one of which (BLK-1) is reached by no route. |
| **census §5 risk 1** — the tri-package deadlock | **AGREE, and sharpened**: MIN-8 shows the keyframes leg is *inert* in this closure, so this route pays the lock for an unused dependency. |
| **census §5 risk 10** — "uplift lands with no unit-test net" | **AGREE, and localised**: INF-1 — the two blockers here are precisely what a mounted-component test would catch, and there is no runner. |
| **lane-frontend §5** — the 4→7 break surface | **QUANTIFIED per-component**: MAJ-6 attributes 9 of 15 import-level break sites plus both 🔴 HARD shadows to this single closure. This is a new figure, not in the corpus. |
| **lane-frontend §3** — "3 local `components/ui/` files are documented thin adapters, keep" | **AGREE** for this component's one usage (`:166`); SUP-4. |
| **lane-frontend §8** — "`VisualizationView.vue:306-310` is the only `no-preference` gate" | **AGREE, exact** (lines are `:310-316` at HEAD for the inner rule; the media query opens at `:310`). Elevated to SUP-1. |
| **census §3a** — "**8 routes**, all lazy" | **CONTRADICT, siding with X-2**: `router/index.ts` carries **9 route records** (7 lazy component + 2 redirects) **+ 1 alias**. Two of those records — `/v/:visualizationSlug` and `/w/:imageSlug?` — render *this* component, which is the precondition for BLK-1. The census's 8 matches neither denominator. |

---

## §7 — Routing (which wave owns what)

- **F.W0** — nothing. (No Codex residue touches this file.)
- **F.W1 (tri-package uplift)** — MAJ-6 in full: 9 break sites + `ToastVariant` + 24 `DockIconButton` template usages + 12 lucide files. This closure should be F.W1's first cut.
- **F.W2 (value.js consumption to spec)** — the 2 bare-root `@mkbabb/value.js` statements at `lib/easings.ts:9, 10-16` (all 6 symbols the app uses) reach this component through `stores/animation.ts:3-7`; `VisualizationView.vue:54-62` is the surface that *persists* the resulting easing name into the API's `animation_settings`, and `useWorkspaceLoader.ts:56` reads it back through an unchecked `as EasingName` cast. Any rename in the 0.13 → 4.0 easing export map must be migration-swept through persisted documents, not just through source. `lib/colors.ts` (the hand-rolled arms, W.L5 item 2) reaches this closure via `BasisCanvas.vue:6` and `EditorControlsDock.vue:8` — but note `ContourEditorCanvas.vue:261, 307-308, 319, 328-329` hard-codes six raw `hsl(40 90% 55% …)` literals that bypass `VIZ_COLORS` entirely, so the `colors.ts` deletion target is not the whole colour surface in this subtree.
- **F.W3 (shadow retirement)** — `GlassTimeline` and `EasingPicker`/`EasingCurvePreview`, both in-closure via `AnimationControls.vue:11-12`; the one `ui/tooltip` callsite at `:166`.
- **F.W4 (frontend audit saturated)** — MAJ-3, MAJ-4, MIN-2, MIN-3, MIN-13, INF-2, INF-3. Two **glass-BH-inbox relays** owed under standing law: the `Configurator` mobile stage-fill gap (MAJ-3) and the `SegmentedTabs` non-generic model (MIN-6).
- **F.W5 (ADMISSION KEYSTONE)** — **BLK-2** and MIN-4/MIN-5. A shared-provenance contract cannot be co-signed while its only UI create path mints an unrelated root per press and leaks the retired `snapshot` noun to users.
- **F.W6 (provenance burn-down)** — **BLK-1**. Curing it is the prerequisite for any "open a published visualization" claim, and it is where `loadVisualization`'s already-written ETag capture (`workspace.ts:205-208`) finally becomes reachable.

---

## §8 — Method and limits

Read whole: the subject; its 13 direct SFC children; `composables/{useImageUpload,useViewState,useWorkspaceLoader}.ts`; `stores/{workspace,animation,gallery}.ts`; `composables/useToast.ts`; `components/ui/tooltip/Tooltip.vue`; `router/index.ts`; `lib/{easings,colors}.ts`; the `lib/api.ts` visualization arm (`:360-465`) and its export index; `EasingPicker.vue`; `EasingCurvePreview.vue`. Producer surfaces read from the **installed** `web/node_modules/@mkbabb/glass-ui@4.0.0` (`Configurator.vue.d.ts`, `ConfiguratorLayer.vue.d.ts`, `ConfiguratorRow.vue.d.ts`, `SegmentedTabs.vue.d.ts`, the compiled root class strings, and `dist/styles/**`) and, for the uplift delta only, read-only from `/Users/mkbabb/Programming/glass-ui@7.0.0` source.

Tools: `grep` / `find` / `sed` / `wc` / `node -p` over read-only trees. **No writes outside this file. No product source touched in any repo. No browser tooling.** Three claims are marked `UNPROVEN-NEEDS-LIVE` (INF-2, INF-3, and the *rendered outcome* half of BLK-1 and MIN-9); every other claim is derivable from the bytes at HEAD `cd26c6533adc32dfe1453d74117d3cb73b89ea16`.
