claude-opus-5[1m]

# CHALLENGE — `ContourPreview.vue` · axis **L (LIBRARY)**

**Target** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/visualization/ContourPreview.vue` (62 lines)
**Census row** `formation/fourier/lane-frontend.md:98` — *"`components/visualization/ContourPreview.vue` | 62 | Small SVG contour thumb"* (the file is also one of the 12 SVG surfaces enumerated at `lane-frontend.md:565`)
**Posture** Component assumed DEFECTIVE until the tree proves otherwise. Every row below carries severity + `file:line` + its own falsifier; L-18 runs both ways, so the superlatives carry falsifiers too, and a **contra-findings** block records the three defects I went hunting for and could not sustain.
**Method** Static + source-derived only. No browser. Two mechanical receipts were taken from the installed runtime/compiler (read-only, `node -e` against `web/node_modules`) and are quoted verbatim; livable-only magnitudes are marked **UNPROVEN-NEEDS-LIVE (SS-13)**.

**Ledger — 13 defects · 0 BLOCKER · 5 MAJOR · 6 MINOR · 2 INFO · 4 superlatives.**

## 0 — Read set

Whole-file reads (read-only): the target; its two imports `src/lib/contourEditing.ts` (222 LOC) and `src/components/ui/CollapsibleSection.vue` (72 LOC); the sole callsite `src/components/visualization/VisualizationView.vue:257`; the two structural siblings the target is measured against — `src/components/visualization/ContourEditorCanvas.vue` (340) and `src/components/ui/PathPreview.vue` (69); `src/components/visualization/composables/usePointDrag.ts` (67); plus `src/style.css:95-145`, `web/tsconfig.json`, `web/package.json`, `api/responses.py:8-25`, `api/models/assets.py:102`, `src/lib/types.ts:70-81`.

Import graph is shallow and clean: `vue` → `computed`; `@/lib/contourEditing` → `{ type Point2D, closedSplinePath }`; `@/components/ui/CollapsibleSection.vue`. No barrel, no dist alias, no cycle. That much is correct and is not re-litigated below.

---

## 1 — Defects

### L-1 · MAJOR · The preview re-frames itself on every pointermove — the sibling canvas documents *why that is wrong* and deliberately avoids it

`previewViewBox` (ContourPreview.vue:16-29) recomputes the bounding box from **live** points on every mutation. The component it previews does the opposite, and says so in a comment:

- `ContourEditorCanvas.vue:49-50` — `// Stable bounds — computed from initial contour, not live points` / `const stableBounds = ref({...})`
- `ContourEditorCanvas.vue:74-75` — `// Bounds — use stable bounds for viewBox and image overlay, live bounds for nothing`
- `ContourEditorCanvas.vue:77-82` — `viewBox` reads `bounds.value` = `stableBounds.value`, frozen at `initFromContour()` (`:60-67`).

The invalidation rate is provable. `usePointDrag.onPointerMove` replaces `1 + 2·magnetRadius` array slots per pointermove — `points.value[dragStartIdx] = pt` (usePointDrag.ts:31) plus the magnet loop (usePointDrag.ts:40-46); `magnetRadius` defaults to **3** (ContourEditorCanvas.vue:38), so **7 index writes per move event**. `previewViewBox`'s `for (const p of pts)` (ContourPreview.vue:20) tracked exactly those index keys, so every one of those events invalidates the viewBox. If the dragged point is the current extremum in x or y, the *whole shape* translates and rescales inside the 160×160 box (`.preview-svg`, :57-61) while only 7 of N points actually moved.

The component exists precisely to be watched during that operation: it is mounted only in edit mode (`VisualizationView.vue:255-257`, inside `<div v-if="isEditing" key="editor-panel">`) and its own subtitle is `"live contour shape"` (ContourPreview.vue:34).

**Falsifier.** If ContourPreview were a *static* thumbnail (gallery card, saved contour), live auto-fit would be correct and this row is FALSE. It is not — the sole callsite mounts it inside the editor panel. Second falsifier: freeze the bbox behind a `shallowRef` seeded once from the first non-empty `points`; if the preview looks identical while dragging an extremum outward, this row is FALSE. Third: if the drag never touches an extremum the framing is stable — so a mid-contour drag will *not* reveal it; the test must drag a bbox-defining point. Perceptual magnitude of the swim is **UNPROVEN-NEEDS-LIVE (SS-13)**; the per-event recomputation is proven statically.

### L-2 · MAJOR · Padding is derived from the X extent alone and then applied to the Y axis

```
ContourPreview.vue:26   const pad = (maxX - minX) * 0.1;
ContourPreview.vue:28   return `${minX - pad} ${-(maxY + pad)} ${maxX - minX + pad * 2} ${maxY - minY + pad * 2}`;
                                                    ^^^ X-derived pad                        ^^^ X-derived pad on the Y term
```

The vertical margin has no relation to the shape's height. Both siblings derive per-axis:

- `ContourEditorCanvas.vue:79-80` — `const padX = b.width * MARGIN; const padY = b.height * MARGIN;`
- `ui/PathPreview.vue:29-33` — `rangeX`/`rangeY` separately, then a single uniform `scale` off `Math.max(rangeX, rangeY)`.

Consequence at extreme aspect ratios. Take a traced contour 10 units wide × 400 tall (a pen, a tower, a capital "I"): `pad = 1`, viewBox `12 × 402`, `preserveAspectRatio="xMidYMid meet"` (:38) into a 160px box gives scale ≈ 0.398, so the vertical margin renders at **≈0.4 CSS px** — narrower than the 1px half-width of the `stroke-width="2"` `vector-effect="non-scaling-stroke"` stroke (:46-47). SVG roots clip to the viewport by default, so the extreme top/bottom of the stroke is cut. In the mirror case (400 wide × 40 tall) `pad = 40`, i.e. a **100% vertical margin** — the shape renders at a third the size it should.

**Falsifier.** For a square-ish contour `maxX-minX ≈ maxY-minY`, so pad is very nearly correct and a square test shape will *not* reveal this — the falsification demands an aspect ratio far from 1. If the clip does not appear at 10×400 (UA rounding, sub-pixel AA), the *clipping* claim is FALSE while the *framing* claim (asymmetric margin, provable from :26 alone by arithmetic) survives. Clip visibility **UNPROVEN-NEEDS-LIVE (SS-13)**.

**Coherence rider (same line).** The preview pads at `0.1`; the canvas it previews pads at `MARGIN = 0.15` (ContourEditorCanvas.vue:29). Even setting L-1 aside, the "live contour shape" is framed differently from the stage the user is editing on — the preview is not a faithful reduction of the canvas.

### L-3 · MINOR (MAJOR consequence, contrived reachability) · Degenerate X extent emits `viewBox` width `0`, which the SVG spec defines as *disables rendering of the element*

If `maxX === minX` with ≥2 points, then `pad = 0` (:26) and the third viewBox term `maxX - minX + pad*2` is `0` (:28). Per SVG viewBox semantics a zero width or height disables rendering of the element — the entire `<svg>` goes blank, header and card still showing.

**Two of three siblings guard this; the target does not:**
- `ContourEditorCanvas.vue:67` — `width: maxX - minX || 1, height: maxY - minY || 1`
- `ui/PathPreview.vue:29-30` — `const rangeX = maxX - minX || 1; const rangeY = maxY - minY || 1;`

**Falsifier.** Reachability is contrived: `deleteSelected` floors the array at 3 points (ContourEditorCanvas.vue:180), and collapsing every point onto one X requires deliberate dragging. If a UA renders a zero-width viewBox by falling back to the intrinsic size rather than dropping the element, the *blank* claim is FALSE — the **missing guard**, and the fact that it is the only one of three siblings missing it, is proven regardless. UA behaviour **UNPROVEN-NEEDS-LIVE (SS-13)**. Note the asymmetry: a zero *height* extent is survivable here because `pad` is X-derived and stays positive — the very defect L-2 names accidentally shields one axis and exposes the other.

### L-4 · MAJOR · The identical Catmull-Rom path string is built twice per mutation, at full double precision

- `ContourEditorCanvas.vue:85` — `const splinePath = computed(() => closedSplinePath(points.value));`
- `ContourPreview.vue:13` — `return closedSplinePath(pts);`

Same input array (the prop *is* the editor's own `points` ref — `VisualizationView.vue:257`), same omitted second argument, therefore **byte-identical output**, recomputed by both consumers on the same 7-writes-per-pointermove cadence from L-1. `closedSplinePath` builds `n+2` string parts and joins them (contourEditing.ts:26-42) with **no rounding** — `${cp1x},${cp1y} …` at line 39 emits full `Number.prototype.toString` doubles (`123.45678901234567`). The sibling preview does round: `ui/PathPreview.vue:40` uses `.toFixed(4)`. For a 160×160 thumbnail the extra 12 significant digits per coordinate are pure waste, six coordinates per segment.

**Falsifier.** If the preview received a *different* point set — the simplified contour, a decimated copy — the second computation would be justified and this row FALSE. It does not: the prop is the raw live array. If Vue deduplicated the two computeds this would be FALSE — they are separate `computed` instances in separate component scopes, so it cannot. Absolute frame cost (and whether it is measurable against the drag's other work) is **UNPROVEN-NEEDS-LIVE (SS-13)**; the duplication and the precision are proven.

### L-5 · MAJOR · The prop is sourced by reaching through a sibling's `defineExpose`d **mutable** internal state, across a `v-if` boundary

`VisualizationView.vue:257` — `<ContourPreview :points="editorRef?.points" />`.

What is on the other end (ContourEditorCanvas.vue:217-227):

```
defineExpose({ undo, redo, applySmooth, applySimplify, deleteSelected,
               resetToExtraction, getPoints, points, magnetRadius });
```

`points` is the editor's source of truth (`:34`) **and** the subject of its undo ring (`useContourHistory(points)`, `:41`). The expose channel is **read-write**, not read-only — receipt from the installed runtime:

```
@vue/reactivity/dist/reactivity.cjs.js:1569-1579   shallowUnwrapHandlers = {
  get: (t,k,r) => k === "__v_raw" ? t : unref(Reflect.get(t,k,r)),
  set: (t,k,v,r) => { const old = t[k]; if (isRef(old) && !isRef(v)) { old.value = v; return true } … }
}
@vue/runtime-core/dist/runtime-core.cjs.js:8295-8297  getComponentPublicInstance → new Proxy(proxyRefs(markRaw(instance.exposed)), …)
```

So any holder of `editorRef` can execute `editorRef.points = []` and write straight through to the editor's ref, bypassing `pushHistory()` and desynchronising undo/redo. The correct accessor already exists and is *also* exposed two lines earlier: `getPoints()` returns unzipped copies (ContourEditorCanvas.vue:205-207, 224).

This coupling is the **root cause of L-6**: the prop must admit `undefined` only because the two components live under different `v-if` gates — the editor under `v-if="store.contour"` (VisualizationView.vue:203), the preview under `v-if="isEditing"` (VisualizationView.vue:255). Enter edit mode with no contour and the preview renders an empty card. There is also a guaranteed one-render window at mount where `editorRef.value` is still `null`.

**Falsifier.** Present harm is coupling + the undefined window, **not** corruption: ContourPreview never writes — both computeds are read-only (:10-29) and the template binds only `:viewBox`/`:d`. If Vue exposed a `readonly` proxy this row would be FALSE; the grep above proves it does not. If `points` were exposed as a `computed`/`readonly(points)` the write path closes and only the `| undefined` shape remains.

### L-6 · MAJOR · `points: Point2D[] | undefined` compiles to `{ type: null, required: true }` — Vue's runtime prop validation is switched **off**, and it is the repo's only instance

Receipt, `@vue/compiler-sfc` run against the live file and two control variants:

```
ContourPreview.vue as written      →  points: { type: null,  required: true  }
points?: Point2D[]                 →  points: { type: Array, required: false }
points: Point2D[]                  →  points: { type: Array, required: true  }
```

Why `type: null` matters — `@vue/runtime-core/dist/runtime-core.cjs.js`:

```
5144   warn('Missing required prop: "' + name + '"');   // only when isAbsent
5147   if (value == null && !required) { return; }
5150   if (type != null && type !== true && !skipCheck) {   // ← never entered
```

Net effect of the declaration at ContourPreview.vue:7:
1. It declares `required: true` while the sole callsite supplies `undefined` on the first render and whenever `store.contour` is null — a contract that is *false as written*.
2. It simultaneously **disables** the type assertion that would have caught it (and would catch any future caller passing a string, a `Ref`, or a `{x,y}` object-of-arrays). Dev mode is silent in both directions.

**It is a singleton deviation from repo convention.** Mechanical sweep of every `defineProps<{…}>` in `web/src`: **168 prop declaration lines, 51 use `?:`, exactly 1 uses `T | undefined` without `?` — this one.**

**Falsifier.** If the SFC compiler emitted `type: Array` for the union, FALSE — the compile output above is the receipt, taken from `web/node_modules/@vue/compiler-sfc`. If some *other* callsite already passes a wrong-shaped value, the severity rises from latent to live; there is only one callsite today, so the hole is latent. The fix is one character (`?:`), and it restores `type: Array` — which is why this is a MAJOR and not an INFO: the correct spelling is strictly cheaper and strictly stronger.

### L-7 · MINOR · Guard skew between the two computeds; a `closedSplinePath` branch is unreachable from here

`previewPath` bails below **3** points (:12); `previewViewBox` bails below **2** (:18). At exactly 2 points the component computes and emits a bounding box for a path it will never draw. Symmetrically, `closedSplinePath`'s dedicated 2-point line branch (contourEditing.ts:23-24, `M…L…Z`) is **unreachable through this component**.

**Falsifier.** `deleteSelected` floors the live array at 3 (ContourEditorCanvas.vue:180), so a 2-point array is not reachable through the editor UI — this is incoherence/dead code, not a live bug. It *becomes* live if a 2-point contour can arrive from storage: `api/responses.py:8-10` returns `points.get("x", []), points.get("y", [])` off a field typed `points: dict[str, Any]` (`api/models/assets.py:102`) with no length or cardinality validation at the model boundary. I did not audit the write path, so that leg is UNPROVEN.

### L-8 · MINOR · No finite-value guard: non-finite input propagates into the `viewBox` attribute and blanks the SVG silently

`previewViewBox` (:19-28) does no `Number.isFinite` screening; a single `NaN` coordinate poisons every min/max and yields `viewBox="NaN NaN NaN NaN"`, which the UA rejects — blank preview, no console signal, no fallback. Same for `previewPath`, which will happily emit `CNaN,NaN …`.

The repo knows this guard — `ui/SliderControl.vue:41`, `equation/FunctionInput.vue:54`, `lib/api-problem.ts:60` all use `Number.isFinite` — but it is applied nowhere on the contour path.

Reachable route: `zipPoints` maps over `xs` and indexes `ys[i]` (contourEditing.ts:8) and is typed to return `number` because **`noUncheckedIndexedAccess` is absent from `web/tsconfig.json`** (whole file read; `strict: true` at :6 does not imply it). Feed it `{x:[…200], y:[…199]}` and the last point is `{x: n, y: undefined}` → `NaN` through both computeds. Upstream, the server hands back whatever is stored (`api/responses.py:10`) off an `Any`-typed field (`api/models/assets.py:102`).

**Falsifier.** If the write path enforces `len(x) == len(y)` the client-side NaN is unreachable in practice and this drops to a defensive-posture INFO — I did not audit `save_contour` (`api/routers/contours.py:22`), so **that leg is UNPROVEN**. The absent client guard, the absent `noUncheckedIndexedAccess`, and the `Any` boundary are each proven.

### L-9 · MINOR · Hardcoded `hsl(40 90% 55% / 0.85)` bypasses the `--viz-amber` token and its documented light-mode carry

`ContourPreview.vue:45` — `stroke="hsl(40 90% 55% / 0.85)"`. The same literal family appears 8 more times in one file (ContourEditorCanvas.vue:261, 307, 308, 315, 319, 328, 329, 333) — **9 sites / 2 files, zero declarations.**

Meanwhile the app has an owned amber with a live coordination carry: `style.css:113-127` overrides `--viz-amber` to `hsl(35 76% 35%)` in light and `hsl(37 73% 67%)` in dark, annotated `D.W4.d — light-mode --viz-amber darken (axe contrast carry)`. It is consumed at 15+ CSS sites and even read at runtime — `lib/colors.ts:94`, `VIZ_COLORS.amber = cssVarToHex("--viz-amber")`. Corpus already holds this as an upstream ask: `lane-frontend.md:602, 604, 643`.

Library-axis harm (not the a11y harm, which belongs to D/A): a colour value duplicated across two files with no owner, and one that — alone among the app's ambers — does **not** respond to the theme flip. The preview stroke is identical in light and dark.

**Falsifier.** If the contour amber is *deliberately* a different hue (40 vs the token's 35/37) then it is not a token bypass but an **untokenised second amber** — either reading demands a declaration. If a `--contour-*` token exists that I missed, FALSE; `grep -rn "viz-amber" src` returns the 24 rows above and no contour-specific token exists.

### L-10 · MINOR · `CollapsibleSection` — the one child this component mounts — queues an uncancelled 250 ms timer per open and reaches for `$el` through an `any`

`ui/CollapsibleSection.vue:17-30`: a `watch(open, …)` that schedules `setTimeout(…, 250)` with **no `clearTimeout`, no `onUnmounted`, no handle stored**. Rapid toggling queues one timer per open, each of which walks `getBoundingClientRect()` on the section and its scroll parent.

Type hole on the same path — `:21` `const el = rootEl.value?.$el ?? rootEl.value;`. `rootEl` is typed `InstanceType<typeof Collapsible> | null` (:15), whose `$el` is `any`, so `el.getBoundingClientRect()` (:23) and `el.closest(…)` (:24) are unchecked; and the `?? rootEl.value` fallback yields a **component proxy**, on which both calls are `TypeError`s.

ContourPreview mounts this at :34 with `:default-open="true"` — which is already the `withDefaults` value (CollapsibleSection.vue:10-12), so the binding is redundant and the timer arms on the very first open.

**Falsifier.** The leak is bounded and does **not** crash post-unmount: the callback null-checks (`if (!el) return`, :22) and `rootEl.value` is null after unmount, so the stale timer returns early — the cost is wasted timers and forced layout, not an exception. The `?? rootEl.value` branch is unreachable while glass-ui's `Collapsible` renders a single-element root: it is a reka-ui `CollapsibleRoot` wrapper (`node_modules/@mkbabb/glass-ui/dist/components/ui/collapsible/Collapsible.vue.d.ts` → `CollapsibleRootProps`), which renders a `Primitive` div. So this is a **latent** type hole that goes live the day that root gains `as-child`/fragment behaviour. Blast radius beyond the target: 3 other consumers (`ContourSettings.vue`, `EqCoefficientsPanel.vue`, `FunctionInput.vue`).

### L-11 · MINOR · `closedSplinePath(points, tension = 0.5)` — dead parameter, lying signature

`contourEditing.ts:20` declares `tension = 0.5`. `grep -n "tension" src/lib/contourEditing.ts` returns **exactly one line — 20**. The body hardcodes `const factor = 1 / 6;` (:33). A caller that passes a tension gets no effect and no warning.

**Falsifier.** If `factor` were derived from `tension` this row is FALSE — :33 is a literal. Both live call sites omit the argument (ContourPreview.vue:13, ContourEditorCanvas.vue:85), so there is **no live miscomputation**; the defect is a public signature that advertises a knob it does not have. Note the correct Catmull-Rom relation *is* `factor = tension / 3`, so `1/6` is exactly the `tension = 0.5` default — i.e. the parameter was correct once and was inlined without being removed.

### L-12 · INFO · Zero unit-test coverage, and the geometry it depends on is the repo's least-tested, highest-risk pure code

`web/package.json:6-12` declares `dev / build / preview / test:e2e / test:e2e:ui` — **no `test` script**; no `vitest.config.*` exists; `find web -name '*.test.ts' -o -name '*.spec.ts'` returns only the 8 Playwright specs under `web/e2e/`, and `grep -in "preview" web/e2e/*.spec.ts` returns **0 hits**. ContourPreview is untested at every level.

Worse for the axis: its import `contourEditing.ts` contains `simplifyClosedPoints` — a 94-line hand-rolled **indexed binary min-heap** over five parallel typed arrays plus a circular doubly-linked list (`:95-188`), whose own docblock concedes it implements the *unrestricted* VW re-key rather than strict VW (`:85-93`). Sift/swap/`pos[i] = -1` tombstone logic (`:133-181`) is exactly the code that wants a unit test and has none.

**Falsifier.** If a root-level vitest project covers `web/src` I missed it — the repo root has `pyproject.toml`/`tests/` (Python) and `package.json`, and no JS test runner is wired to `web/src`. If one is added, this row narrows to "ContourPreview specifically is untested", which the e2e grep already proves.

### L-13 · INFO · `cartoon-card` consumer, and the shim's own site count has drifted

ContourPreview.vue:33 opens with `class="cartoon-card px-3 py-2"` — i.e. it sits inside the `@utility cartoon-card` resurrection shim (`style.css:98-111`), a live upstream glass-ui carry (`lane-frontend.md:384, 604, 643`).

The shim's own comment is stale: `style.css:101-102` claims *"14 application sites (13 files; one uses it 5 times)"*. Live: `grep -rn cartoon-card web/src` → **25 occurrences across 15 files**; excluding `style.css`'s own 4 lines (98, 99, 101, 107) that is **21 application occurrences across 14 component files**. `lane-frontend.md:380` records `25 cartoon-card`, matching the raw occurrence count exactly.

**Falsifier.** If "application sites" is meant as *files*, 13 → 14 is still off by one; if as *occurrences*, 14 → 21. Either reading is stale. This row does not re-open the carry (already held); it refreshes the number and confirms the target is inside the blast radius.

---

## 2 — Superlatives (L-18 both ways)

### S-1 · The Y-flip is algebraically exact, and it is the one thing here a symmetric test shape could never catch

Content is drawn under `<g transform="scale(1,-1)">` (:41), so a data point `(x, y)` lands at user-space `(x, −y)`; the rendered content therefore spans `y ∈ [−maxY, −minY]`. The viewBox (:28) spans `[−(maxY+pad), −(maxY+pad) + (maxY−minY+2·pad)] = [−maxY−pad, −minY+pad]` — **symmetric, exactly `pad` on each side.** The comment at :27 states the intent and the code matches it. The X axis checks out identically: `[minX−pad, maxX+pad]`.

**Falsifier.** Place a point at `y = maxY`: it must land exactly `pad` from the top edge — it does. Had the origin been `−(minY+pad)`, or the height omitted the doubled pad, the shape would sit off-centre or overflow. Crucially, a vertically symmetric contour renders *identically* under a sign error, so this is precisely the class of bug that survives casual testing — getting it right is not free.

### S-2 · `vector-effect="non-scaling-stroke"` is necessary here, not decorative

The viewBox is in **data** units (image-pixel space; contour bboxes routinely span hundreds of units and vary by an order of magnitude between source images — cf. `ContourEditorCanvas.vue:89-96`, where the overlay resize is derived from `image_bounds` at 768-ish scale). Without `:47`, the literal `stroke-width="2"` (:46) would render as a sub-pixel hairline for a 1000-unit contour and as a blob for a 40-unit one. The attribute makes stroke weight invariant to the source image's dimensions.

**Falsifier.** Remove it and compare a 100-unit contour against a 1000-unit one at the same 160px box; if both strokes look identical, FALSE. They cannot — `meet` scaling differs by 10× and the stroke would scale with it.

### S-3 · Zero teardown surface — the component is on the correct side of the census's viz-architecture line

Whole file, 62 lines: two pure `computed`, one child component, static markup. **No** `addEventListener`, `setInterval`, `setTimeout`, `requestAnimationFrame`, `ResizeObserver`, `getContext`, or WebGL handle — grep returns zero for every one of them. Nothing to leak, nothing to unregister, no `onUnmounted` needed or missing.

Read that against the census's own render-path rows: `CENSUS-2026-08-03.md:85-87` — *"Canvas2D throughout, **WebGL/WebGPU ABSENT**; three independent canvases (epicycle instrument reactive-redraw off a store rAF clock; **ConvergencePlot with its own ungated rAF**; FrequencyGraph watch-driven) + 12 SVG surfaces"* — and `lane-frontend.md:565`, which enumerates those 12 surfaces and names `ContourPreview.vue` among them. The repo's leak risk is concentrated in the canvas/rAF third; ContourPreview is in the SVG two-thirds and takes none of it. (Contrast its own sibling, which *does* take a window listener at `ContourEditorCanvas.vue:210` — and correctly removes it at `:214`.) Its single imported dependency does leak a timer (L-10) — the component itself does not.

**Falsifier.** Any of the listed APIs appearing in the file. None do.

### S-4 · Guard-before-reduce ordering, and a bbox loop that is strictly better than the sibling's spread

Both computeds guard the short/empty case **before** the reduction (`:12`, `:18`), so the `Infinity` seeds at `:19` can never escape into the DOM. And the bbox uses an explicit `for…of` (`:20-25`) rather than `Math.min(...arr)` — which is what `ui/PathPreview.vue:25-28` does. Spreading a large contour into `Math.min` throws `RangeError: Maximum call stack size exceeded` above the engine's argument limit (~10⁵ on V8); ContourPreview's loop is O(n) with no such ceiling, allocates nothing, and is a single pass for all four extrema.

**Falsifier.** PathPreview also guards `!pathX.length` first (`:23`), so `Infinity` cannot escape there either — the divergence is only the spread, and it only bites at very large N (contours are typically 200-2000 points, well under the limit). So this is a *latent* superiority, not a live one — but it is the same step written two ways, and ContourPreview wrote it the way that has no ceiling.

---

## 3 — R5-7 disposition (template-loop invisibility)

**The class does not apply directly, and the reason is itself a finding.**

ContourPreview's template (`:32-53`) contains **no `v-for`** — grep returns 0. It contributes zero rows to any template-loop registry, correctly and without a blind spot.

But it exhibits the **dual** of R5-7. It renders *N* data points as a **single `<path>`** (`:42-48`) whose entire geometry is encoded in one `d` attribute. Any derivation that counts DOM nodes, component callsites, or template loops as a proxy for "data rendered" scores this component **1** whether it is drawing 3 points or 3000. Where R5-7 is *native-element loops invisible to component-keyed evidence* (`lane-fourier-r3-r6.md:125` — `instance.loop.paper-sidebar` = `[]`, adopted TRUE, carried to F.W4), this is *attribute-encoded geometry invisible to element-keyed evidence*. **R6-5's cure does not reach it**: the `NATIVE_TEMPLATE_LOOP` family (`lane-fourier-r3-r6.md:139`) keys rows by source line + loop expression — and here there is no loop construct to key on. Adding native-element loop counting to F.W4, exactly as R5-7 directs, still scores this component 1.

**Where R5-7 *does* bite, in this component's immediate neighbourhood:** `ContourEditorCanvas.vue:269` — `v-for="(pt, i) in points"` on a native `<circle>`. That is a bona-fide R5-7 instance in the visualization tree, outside `PaperSidebar.vue`'s three rows (lines 65/87/105, the ones R6-5 authenticated). F.W4's per-component D/L/C audit should record that the native-loop denominator is larger than the paper subtree — and that this particular loop renders one node **per contour point**, i.e. hundreds of nodes from one template row, which is the same counting hazard pointing the other way.

**Falsifier for the dual claim.** If a deriver ever keys evidence on *bound attributes* (`:d`, `:viewBox`) rather than on template constructs, the path-encoded case becomes visible and this row is FALSE. Nothing in R4-R6's registry shape does so today (`lane-fourier-r3-r6.md:139` — rows carry `family`, source line, and expression).

---

## 4 — Contra-findings (hunted, could not sustain — recorded so the fold does not re-chase them)

**C-1 · The cross-component reactivity chain WORKS.** I expected a stale-prop defect from `:points="editorRef?.points"` — a template ref that is `null` at first render, reaching a `Ref` through `defineExpose`. Mechanically refuted: `getComponentPublicInstance` wraps `instance.exposed` in `proxyRefs` (`runtime-core.cjs.js:8295-8297`), whose getter is `unref(Reflect.get(…))` (`reactivity.cjs.js:1570`). So (a) the parent receives the **unwrapped array**, not a `Ref` — the `pts.length < 3` guard at `:12` is reading a real length, not `undefined`; and (b) the parent's render effect **tracks the child's `points` ref**, so whole-array replacements (`applySmooth` `:188`, `applySimplify` `:195`, `initFromContour` `:55`) re-render the parent and re-pass the prop, while per-index writes (`usePointDrag.ts:31, 40-46`) invalidate ContourPreview's own computeds directly off the deep-reactive array. Both update paths are sound. **Not a defect.**

**C-2 · Module size is Goldilocks; do not split it.** 62 lines, two computeds, one child, one style rule — matching `lane-frontend.md:98`. The remedy for L-2/L-3 is *extraction of the shared bbox+pad+flip step* into `lib/contourEditing.ts` (which already owns every other piece of contour geometry — `zipPoints`, `unzipPoints`, `nearestSegmentIndex`, `simplify`, `smooth`), consumed by all three of ContourPreview / ContourEditorCanvas / PathPreview. **Not** decomposition of this file. Colocation is otherwise correct: the component lives beside the canvas it previews.

**C-3 · The trailing `Z` is not redundant.** `closedSplinePath` emits `M p0` + `n` cubic segments, the last of which already returns to `p0`, then pushes `"Z"` (`contourEditing.ts:41`). This looks like a zero-length no-op but is not: `Z` marks the subpath closed, so the seam at `p0` renders as a **join** rather than two caps. Correct as written. **Not a defect.**

---

## 5 — Carries

- **F.W4** — extract `contourBounds(points, margin)` (per-axis pad, `|| 1` degenerate guard, finite screen) into `lib/contourEditing.ts`; rewire ContourPreview + ContourEditorCanvas + PathPreview. Closes L-2, L-3, L-8 and the `0.1`/`0.15` framing divergence in one move.
- **F.W4** — the R5-7 denominator is wider than the paper subtree: `ContourEditorCanvas.vue:269` is a native `<circle v-for>` rendering one node per contour point. Plus the *dual* class named in §3, which `NATIVE_TEMPLATE_LOOP` does not cure.
- **F.W5** — sever the `editorRef?.points` reach-through (L-5): emit or expose `readonly`/`getPoints()`, which lets the prop become `points?: Point2D[]` and restores `{ type: Array, required: false }` (L-6). One change, two MAJORs.
- **glass-ui BH inbox** — L-10 (`CollapsibleSection` uncancelled timer + `$el` `any`) is consumer-side, but the `Collapsible` root-element assumption is producer-side; relay per the standing BH/BI relay edict. L-9/L-13 fold into the existing `--viz-amber` and `cartoon-card` carries (`lane-frontend.md:604, 643`) — refreshed count only.
- **Live-gate (SS-13)** — three magnitudes need the working frontend: L-1 swim perceptibility, L-2 stroke clip at 10×400, L-4 frame cost.
