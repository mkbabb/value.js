claude-opus-5[1m]

# PathPreview — Challenge C · CONSUMPTION axis

**Target** `fourier-analysis/web/src/components/ui/PathPreview.vue` (69 LOC, mtime 2026-03-09)
**Axis** how this component consumes value.js 0.13 / keyframes.js 4.3 / glass-ui ^4.0.0 / the 45-operation fourier API; props+emits contract quality; integration seams.
**Method** static + source-derived only. No browser tooling. Livable-only claims are marked **UNPROVEN-NEEDS-LIVE (SS-13)**.

**Import closure read whole (read-only).** The component itself (its entire import list is one line: `import { computed } from "vue"` at `:2` — there is no closure below it). Seam and comparand files read whole: `web/src/components/visualization/gallery/GalleryCard.vue` (309, the sole import site); `web/src/lib/types.ts` (391); `web/src/lib/contourEditing.ts` (222); `web/src/lib/colors.ts` (117); `web/src/components/ui/{SliderControl,CollapsibleSection}.vue`; `web/src/components/visualization/ContourPreview.vue`; `web/src/components/ui/EasingCurvePreview.vue`; `web/src/components/visualization/lib/canvas-drawing/ghost-path.ts` (29); `web/src/components/visualization/composables/useViewTransform.ts:10-35`; `web/src/components/visualization/BasisSelector.vue:16-90,187-192`; `web/src/components/visualization/lib/basis-display.ts`; `web/{package.json,tsconfig.json,vite.config.ts}`. API side: `api/models/assets.py:75-105`, `api/models/shared.py:8-20`, `api/responses.py:1-26`, `api/services/image_storage.py:305-325`, `api/routers/contours.py:21-60`. Producer side: installed `@mkbabb/glass-ui@4.0.0` `dist/*.d.ts` (60+ subpaths enumerated) + `dist/components/custom/` + `dist/components/custom/fourier-field/index.d.ts`. Build artifact: the checked-in `web/dist/` (200 asset files, built 2026-06-12 18:13).

**Posture.** Assumed defective. Nine findings survived their falsifiers; five superlatives did too (L-18 both ways). One corpus claim is **contradicted with static evidence** (§C).

---

## §A · Defects

### D-1 · **BLOCKER** — `ContourAsset.preview_path` is a structurally-always-empty field on 3 of the 45 operations; PathPreview is the client half that was meant to consume it, and instead re-derives it client-side

The API declares a server-computed SVG preview path. Nothing ever writes it. Nothing ever reads it.

| role | site | content |
|---|---|---|
| declared (server) | `api/models/assets.py:85` | `preview_path: str = ""` on `ContourAssetResponse` |
| forwarded | `api/responses.py:22` | `preview_path=asset.get("preview_path", "")` |
| **sole writer** | `api/services/image_storage.py:318` | `"preview_path": "",` — a **hardcoded empty literal** in the persisted document |
| declared (client) | `web/src/lib/types.ts:77` | `preview_path: string;` — **non-optional** |
| readers | — | **none** |

`grep -rn "preview_path" --exclude-dir=node_modules --exclude-dir=.git .` over the whole fourier repo returns **exactly those four lines**. There is no fifth.

The three operations that ship the field: `POST /api/contours` (`api/routers/contours.py:21` → `contour_response`), `GET /api/contours/{contourHash}` (`:29-32`), and `POST /api/images/{slug}/extract-contour` (client binding `web/src/lib/api.ts:300-306`, `Promise<ContourAsset>`).

**Why this is PathPreview's defect and not merely the API's.** PathPreview's entire body (`:21-44`) computes an SVG `d` string from a contour's point arrays. That is, to the character, the product `preview_path` names. The seam was designed — a server field to hold it, a client type to receive it, a component to render it — and then built on neither side, in a repo where the client type is *non-optional* so it reads as guaranteed-present to every future consumer. A consumer who trusts the type and writes `<path :d="contour.preview_path">` gets `d=""` and a blank frame, with no error, no warning, and no type-level signal.

**Falsifier.** Dies if any writer populates the field, or any client reads it, or a doc marks it reserved. All three checked: the four-hit grep above is exhaustive over the repo minus `node_modules`/`.git`; `image_storage.py:318` is inside the single `doc = {…}` literal that creates every contour document (`:311-322`); no `preview_path` appears in any `docs/` file. Also dies if `ContourAssetResponse` is not actually returned by those routers — `api/routers/contours.py:32` returns `contour_response(doc)`, and `responses.py:13-26` constructs `ContourAssetResponse` unconditionally.

**R6-8 relation (`lane-fourier-r3-r6.md` R6-8).** That row established: *an API-operation model that embeds derived client back-references cannot attribute a defect to one side of the seam.* This finding is the **inverse pathology on the same seam class**. There, the operation leaf carried a client back-reference and over-coupled. Here the operation leaf declares a *product* only the client can make, and the two leaves are joined by **nothing at all** — no back-reference, no test, no consumer. R6-8's lesson (keep the client↔operation join in a separate relation) does not protect against this: a join table with zero rows and a field with zero writers are indistinguishable from a correctly-decoupled seam. **CARRY → F.W5**: the shared-provenance contract needs a *liveness* predicate on operation fields, not only an isolation predicate. A field that is `""` at every producer site is a contract lie regardless of how cleanly it is decoupled.

**What it blocks.** Any conformance fixture generated from the 45-operation surface (census §4 F.W8, FN-6) will emit `preview_path` as a populated-looking non-optional string; and R3-7b's `securityGate: RED_0_OF_45` audit shape — "count the operations, check a property" — cannot see this class of defect at all.

---

### D-2 · **MAJOR** — zero live consumers: the component's only import site never renders it

`grep -rn "PathPreview" web/src/` returns **one line**: `GalleryCard.vue:10` (`import PathPreview from "@/components/ui/PathPreview.vue";`). Reading `GalleryCard.vue` whole (309 lines): the identifier appears at `:10` and nowhere else — not in the `<template>` (`:64-187`), not in `<script setup>` (`:1-62`), not in `<style scoped>`. So every consumption claim about this component — props ergonomics, defaults, SVG output, theming — is **unexercised in production**.

The dead import survives the typecheck because `web/tsconfig.json` sets neither `noUnusedLocals` nor `noUnusedParameters` (read whole, 19 lines: `strict`, `noEmit`, `isolatedModules`, `verbatimModuleSyntax` are set; the unused-* pair is absent). `build` is `vue-tsc -b && vite build` (`web/package.json:8`), so nothing in the gate chain can catch it.

**Falsifier.** Dies if the component is reached dynamically or by a test.
- Dynamic: `grep -rn "defineAsyncComponent\|<component"` over `web/src/` returns 8 sites — three `defineAsyncComponent` in `GalleryView.vue:31-33` (all `gallery/Admin*.vue`) and five `<component :is>` bindings (`EditorControlsDock.vue:144`, `FourierMorphDemo.vue:72`, `CoefficientsSpectrum.vue:132`, `AppHeader.vue:117,130`, `MobileFloatingToc.vue:157`) — every one resolves to a lucide icon or a named admin panel. None can reach PathPreview.
- Tests: `grep -rn "PathPreview" web/e2e/` → empty (7 spec files present); there is no unit-test suite in `web/` (`package.json` scripts: `dev`/`build`/`preview`/`test:e2e`/`test:e2e:ui` — no vitest).

**Overlap.** `GalleryCard/challenge-L-library.md` D-3 books the same dead import at MINOR from the *importer's* side ("dead imports `VIZ_COLORS` + `PathPreview`"). Filed here at MAJOR from the *importee's* side, where it is categorically worse: for GalleryCard it is one wasted line; for PathPreview it is the total absence of a consumer, which is what makes D-1's seam undetectable and D-3..D-6 unfalsifiable in the running app. Not a double-count — different subject, different severity basis.

---

### D-3 · **MAJOR** — the props shape (`pathX`/`pathY` parallel arrays) matches neither the wire type nor the tree's canonical geometry type, and it makes the co-length invariant inexpressible

`:6-7` declares `pathX: number[]; pathY: number[]`. Nothing in fourier produces that shape.

**The wire envelope is `{ x: number[]; y: number[] }`, and it occurs four times** in `web/src/lib/types.ts`:

| type | line | field |
|---|---|---|
| `ContourAsset` | `:81` | `points: { x: number[]; y: number[] }` |
| `EpicycleData` | `:25` | `trace: { x: number[]; y: number[] }` |
| `EpicycleData` | `:26` | `path: { x: number[]; y: number[] }` |
| `AnimationData` | `:15,17` | `original`, `partial_sums[…][…]` |

Python agrees: `api/models/assets.py:102` — `points: dict[str, Any]  # {"x": list[float], "y": list[float]}` — and `api/responses.py:25` emits `points={"x": xs, "y": ys}`.

**The in-tree canonical geometry type is `Point2D[]`.** `contourEditing.ts:1-4` defines `Point2D`; `:7-17` exports `zipPoints`/`unzipPoints` as the two adapters between the wire envelope and it; the sibling preview `ContourPreview.vue:7` takes `points: Point2D[] | undefined`.

So PathPreview picked a **third** representation, used by nothing else as an interface. Every hypothetical call site must hand-destructure: `<PathPreview :path-x="c.points.x" :path-y="c.points.y" />`. Worse, `pathX: number[]; pathY: number[]` **cannot express** that the two arrays are co-indexed — the invariant on which the whole of `:37-41` depends. `Point2D[]` makes the desync structurally impossible; the `{x,y}` envelope at least keeps the halves together as one value with one identity (which is exactly what `useViewTransform.ts:15-25` memoizes on).

**Falsifier.** Dies if the wire or any producer ever emits `pathX`/`pathY`. Grepped: the only `pathX`/`pathY` identifiers in the entire repo are this component (`:6,7,22,23,25,26,37,39`) and `ghost-path.ts:10-11,22-23` — and the latter is a *positional function parameter list* (`drawGhostPath(surface, view, pathX, pathY, closePath)`), not a wire type or a props contract; its callers pass `data.path.x, data.path.y` (`BasisCanvas.vue:131`) and bare locals (`:220`). Also dies if a first-class adapter exists — `zipPoints`/`unzipPoints` adapt between `Point2D[]` and `{x,y}`, and neither produces `pathX`/`pathY`.

---

### D-4 · **MAJOR** — a length mismatch between `pathX` and `pathY` yields `NaN` in the `d` attribute (silent truncation) or a phantom bounding box (silent mis-framing); the guard checks neither

`:23` — `if (!pathX.length || !pathY.length) return "";` — tests each array for *non-emptiness*, never for *equal length*. `:37-41` then iterates `pathX` and indexes `pathY[i]` unchecked.

**Case A — `pathY` shorter.** For `i >= pathY.length`, `pathY[i]` is `undefined`; `:39` computes `0.5 - (undefined - cy) * scale` → `NaN`; `:40` `NaN.toFixed(4)` → the string `"NaN"`; `:43` emits `d="M0.5000,0.3000L…LNaN,NaN L…Z"`. Per SVG 2 path error handling, rendering proceeds up to the erroneous segment and the remainder of the path is dropped — a **silently truncated shape**, no console error, no thrown exception, `v-if="svgPath"` (`:60`) satisfied because the string is non-empty.

**Case B — `pathY` longer.** No `NaN`, and *no visible symptom at all*: `:27-28` compute `minY`/`maxY` across the **full** `pathY`, including tail entries that `:37` never reaches. Those feed `cy` (`:35`) and `scale` (`:33`), so the drawn shape is centred and scaled to a bounding box containing points that are not in it — quietly off-centre and under-scaled.

**Falsifier.** Dies if co-length is guaranteed upstream. It is not:
- `web/src/lib/types.ts:81` types the two halves independently — TypeScript cannot relate their lengths.
- `api/responses.py:8-10` (`contour_points`) builds them from **two independent** `.get()` calls with **independent `[]` defaults**: `return points.get("x", []), points.get("y", [])`. A document with `points: {"x": [...]}` and no `"y"` produces `xs=[…], ys=[]` — which `:23` *does* catch (empty). A document with a **partial** `y` produces the un-caught Case A.
- `api/routers/contours.py:23-24` (`save_contour`) reads `req.points.get("x", [])` / `.get("y", [])` from a `dict[str, Any]` request body (`api/models/assets.py:102`) with **no Pydantic length validator**, so a partial pair is persistable through the public API.

Dies also if the failure is loud — it is not; both cases are silent by construction.

---

### D-5 · **MAJOR** — hard-closes every path with `Z`, while the tree's own canonical path renderer defaults to OPEN and fourier has both kinds

`:43` — `return \`M${pts.join("L")}Z\`` — the `Z` is unconditional; there is no `closed` prop.

The tree distinguishes. `ghost-path.ts:7-12`:

```
export function drawGhostPath(surface, view, pathX, pathY, closePath = false): void
```

— the default is **open**. Both branches are live: `BasisCanvas.vue:131` passes `true` explicitly (`drawGhostPath(s, view, data.path.x, data.path.y, true)` — epicycle mode, a closed contour), and `BasisCanvas.vue:220` omits the argument (`drawGhostPath(s, view, origX, origY)` — the original series path, open).

So a partial-sum / series path (`AnimationData.partial_sums`, `types.ts:17`) or any open trace (`EpicycleData.trace`, `:25`) rendered through PathPreview grows a spurious chord from the last point back to the first.

**Falsifier.** Dies if every path in fourier is closed — refuted by `ghost-path.ts:12`'s `closePath = false` default *and* by `BasisCanvas.vue:220` actually taking it. Dies if the closing segment is visually inert — refuted by `:54` `fill="none"`: with no fill, the `Z` segment is *stroked*, so it is drawn ink, not an invisible topological nicety. Dies if a `closed` prop exists — `:5-12` lists six props, none of them.

---

### D-6 · **MINOR** — four configuration props with zero overriding call sites; and `padding` does not mean what its name implies

`:8-11` declares `size?`, `strokeWidth?`, `strokeColor?`, `padding?`; `:13-18` gives each a default. Because there are no call sites at all (D-2), **all four are dead configuration**: 10 of the file's 69 lines are a knob panel nobody has ever turned.

Separately, the `padding` arithmetic is mis-labelled. `:33` — `scale = 1 / (Math.max(rangeX, rangeY) * (1 + padding * 2))`. With the default `padding: 0.1` the content occupies `1/1.2 = 0.8333` of the unit viewBox, leaving `(1 - 0.8333)/2 = 0.0833` per side. So `padding` is a fraction **of the content extent**, not of the viewport — a caller asking for "10% padding" gets 8.33%. The comment at `:32` ("Fit into [0, 1] with uniform scale + padding") names the operation without naming the denominator.

**Falsifier.** The dead-config half dies the moment any caller passes a prop — none exists (D-2's grep). The semantics half dies if a doc-comment or type defines the denominator — `:5-18` carries no JSDoc, and `:32` is the file's only comment besides `:39`. It also dies if the reading is idiosyncratic: it is not — CSS `padding` on a percentage basis, and the sibling `ContourPreview.vue:26` (`pad = (maxX - minX) * 0.1`, added to the viewBox extent), both resolve to viewport-relative margins.

---

### D-7 · **MINOR** — four variadic `Math.min`/`Math.max` spreads over path arrays, the exact pattern the tree named and remediated as **Invariant 20**

`:25-28` spreads `pathX` and `pathY` four times. `useViewTransform.ts:15-26` is the tree's own documented remediation of precisely this, on precisely these arrays:

```
// ── Memoized data bounding box (Invariant 20) ──
// The variadic `Math.min(...xs)` / `Math.max(...xs)` spread allocates an
// arguments array of length n_points; … at n≈10k the spread approaches V8's
// argument count ceiling. …
// Single linear scan — no variadic spread, no arguments array.
```

and it reads `store.epicycleData.path.x/.y` (`:18-19`) — the same `{x,y}` envelope PathPreview would consume. Invariant 20 is ratified, not incidental: `docs/audits/runs/2026-05-26-B-audit-wave-1/SYNTHESIS.md:101` — *"Invariant 20 — … No per-frame O(n) spread on the render path (`useViewTransform`); cache bbox-on-path-identity"* — with the ceiling quantified at `:35` as *"hard ceiling at n≈64 k arguments on V8"*.

**Falsifier — and it very nearly kills this one, so the claim is stated narrowly.**
1. **Scope.** Invariant 20's ratified text scopes it to *per-frame* spread *on the render path (`useViewTransform`)*. PathPreview is a Vue `computed` (`:21`), recomputed only on prop change, never on an rAF tick. It breaches the letter of the spread prohibition but sits outside the invariant's stated scope.
2. **Magnitude.** `n_points` defaults to 1024 (`api/models/shared.py:13`, `web/src/lib/defaults.ts:8`) and the UI clamps it to **[128, 4096]** at both write paths (`BasisSelector.vue:34` and `:192`, both `Math.max(128, Math.min(4096, …))`) — a factor of ~16 below the 64 k ceiling.
3. **Not unique.** `transforms.ts:15-18` does the identical four-spread over the same data and is not remediated either.

So: latent, not live; shared, not unique; out of the invariant's literal scope. It is booked at MINOR because the remedy is four lines of the linear scan already written and commented one directory away, and because the server has **no** upper bound on `n_points` (`api/models/shared.py:13` is a bare `n_points: int = 1024` with no `Field(le=…)`; `web/src/lib/types.ts:34` types it `number`), so the clamp is a client courtesy, not a contract. Whether any deployed path can drive `n_points` past 64 k is **UNPROVEN-NEEDS-LIVE (SS-13)**.

---

### D-8 · **INFO** — `strokeWidth / size` divides by a prop with no zero-guard

`:56` — `:stroke-width="strokeWidth / size"`. `size` is `number` with default 64 (`:8,14`) and no validator; `size={0}` yields `stroke-width="Infinity"` alongside `width="0" height="0"` (`:50-51`). Unreachable today (no call sites, D-2), and `size` is the kind of prop nobody passes zero to — filed only because it is the one arithmetic hazard in the template.

**Falsifier.** Dies if Vue or SVG normalises the value — neither does; `Infinity` is serialised as the attribute string `"Infinity"`, which is an invalid `<length>` and falls back to the initial `stroke-width: 1` in user units, i.e. a stroke as wide as the entire viewBox.

---

### D-9 · **INFO** — decorative SVG with no `aria-hidden` / `role="img"`

`:48-59` — the `<svg>` carries `class`, geometry, paint and join attributes; no `aria-hidden="true"`, no `role`, no `<title>`.

**Falsifier / honest scoping — this is a tree-wide pattern, not a PathPreview breach.** The `EasingCurvePreview/challenge-C-consumption.md:176` row already established that fourier applies `aria-hidden` to 15+ decorative **lucide icon components** but to **none** of its ~12 hand-written `<svg>` surfaces (`ContourPreview.vue:36`, `MorphPhaseConfig.vue:47`, and this file's `:48` all omit it). That challenge escalated its own instance only because it lands inside a role whose accessible name is computed from content. PathPreview has no consumer and therefore no containing role at all, so nothing escalates it here. Folded, not re-invented; recorded at INFO for completeness of the axis.

---

## §B · Superlatives (L-18 runs both ways)

### S-1 · **Its non-consumption of value.js, keyframes.js and glass-ui is correct — and it is one of the few components whose tri-package migration cost is provably nil**

The component's entire import list is `:2` — `import { computed } from "vue"`. On an axis defined by four producer surfaces, consuming none of them is the finding, and it survives scrutiny:

- **glass-ui ^4.0.0 has no analogue.** Enumerated the installed producer: `dist/*.d.ts` (60+ subpaths) and `dist/components/custom/` (37 directories). No sparkline, no path-thumbnail, no polyline primitive. The nearest-named export is deceptive: `./fourier-field` is a **canvas** epicycle *background*, not an SVG path renderer — `dist/components/custom/fourier-field/index.d.ts` types `FourierFieldProps` as `{ variant, color, colorResolver, seed, freeze, intensity }`, taking a `ColorResolver` and a seed, never a path. `lane-frontend.md:369,444` reached the same conclusion independently ("Bespoke with no glass-ui analogue"; *"genuinely bespoke — no flag"*) — corroborated here from the producer's dist rather than from the census.
- **value.js is a colour/units library**; the tree's whole consumption of it is 5 sites of `easeInOutSine`/`timingFunctions` (`lane-frontend.md:480`). An SVG bbox-and-fit computation has no call on it.
- **keyframes.js is an animation runtime**; this surface is static by design.

**The consequence that matters to this megatranche.** `lane-frontend.md:492` names the single most consequential frontend finding: *"the three bumps are ONE atomic transaction: `glass-ui 4→7` ∧ `keyframes 4.3→6` ∧ `value.js 0.13→4.0`. None can land alone."* PathPreview's migration cost across that transaction is **zero, provably** — not "small", not "estimated": it imports nothing that can break. Among the 5 files in `components/ui/`, three (`SliderControl`, `CollapsibleSection`, `tooltip/Tooltip`) are glass-ui wrappers that the 4→7 hop will touch; this one cannot be touched.

**Falsifier.** Dies if any producer subpath ships a path-thumbnail primitive (enumerated above — none), or if PathPreview transitively pulls a producer (its import list is one line, and `vue` is not in the tri-package set), or if a `@reference "tailwindcss"` in its style block pulled a producer stylesheet — `:64-68` has no `@reference` and no `@apply`, unlike `GalleryCard.vue:190` and `SliderControl.vue:95`.

---

### S-2 · **`strokeColor: "currentColor"` is the correct colour seam — and it is the only preview in the tree that is themed for free and touches none of the `colors.ts` liability**

`:16` defaults `strokeColor` to `"currentColor"`; `:55` binds it to `stroke` on the `<svg>`; `:60`'s `<path>` declares no `stroke` of its own and therefore inherits. The result adapts to light/dark through the cascade with no token, no prop, no watcher, and — critically for this axis — **no route through `web/src/lib/colors.ts`**.

That matters because `colors.ts` is the tree's real colour liability: 117 lines of hand-rolled `cssVarToHex` regex parsing over `hsl(…)` / bare-triplet / `rgb(…)` forms with a `"#888888"` fallback on every miss (`colors.ts:22-54`), plus hand-written `hslToHex` (`:56-68`) and `rgbToHex` (`:70-74`) — shadowing what value.js 4.0 parses natively and what glass-ui 4.0.0 already exports as `ColorResolver` (`dist/composables/color`, re-exported at the `./color` subpath). Every colour that reaches `GalleryCard` goes through it (`GalleryCard.vue:9` → `basis-display.ts:1-7` → `VIZ_COLORS`). PathPreview's colour does not.

Contrast within the same repo: `EasingCurvePreview.vue:12` defaults `color: "hsl(248 88% 71%)"` — a literal, theme-invariant in both directions. That challenge's §37 row reached this conclusion by citing PathPreview; recorded here as its origin, and extended with the `colors.ts`-avoidance half, which is the consumption-axis point.

**Falsifier.** Dies if `currentColor` fails to reach the `<path>` — refuted by the inheritance chain above (`:55` sets it on the parent `<svg>`; `:60` sets no `stroke`). Dies if some consumer must override it for contrast — no consumer exists. Dies if an external rule fights it — `grep -rn "path-preview" web/src/style.css web/src/**/*.css` returns empty; no rule outside `:64-68` targets the class.

---

### S-3 · **`:stroke-width="strokeWidth / size"` is the DPI-invariant idiom — and it is the only instance of it in the tree**

`:56`, read against `:50-52`: `viewBox="0 0 1 1"` maps one user unit to `size` device px, so dividing a **pixel-declared** stroke by `size` yields a constant device weight at every `size`. Change `size` from 64 to 24 and the stroke stays 1.5 px.

Neither sibling does this. `EasingCurvePreview.vue:29` hardcodes `stroke-width="0.15"` in user units, so its stroke thickens and thins with `size` — a size knob that is secretly a size-*and*-weight knob. `ContourPreview.vue:37` uses a viewBox in raw contour-data coordinates, so its stroke weight depends on the *contour's* extent.

`EasingCurvePreview/challenge-C-consumption.md:55` already cites `PathPreview.vue:56` as the pattern that leaf failed to adopt. Folded, not re-derived; recorded here as the source, with the tree-wide uniqueness added.

**Falsifier.** Dies if the element is CSS-resized away from `size`, which would decouple the user-unit-to-px mapping. `:65-68` `.path-preview { display: block; flex-shrink: 0; }` defends the flex-compression case explicitly — and `flex-shrink: 0` is the only reason that rule earns its place. A `width: 100%` ancestor rule would still break it; none exists (`grep` for `.path-preview` outside the file → empty). So the defence is real but partial.

---

### S-4 · **The uniform-scale fit preserves aspect ratio and guards both degenerate axes; the sibling with the same job does neither**

`:29-33`:

```
const rangeX = maxX - minX || 1;
const rangeY = maxY - minY || 1;
const scale = 1 / (Math.max(rangeX, rangeY) * (1 + padding * 2));
```

One scale factor for both axes (so a wide shape stays wide), `|| 1` guards on each range (so a perfectly vertical or horizontal path cannot divide by zero), and centring on the true bbox midpoint (`:34-35`).

`ContourPreview.vue:26` — the tree's other contour thumbnail — computes `const pad = (maxX - minX) * 0.1` and applies that **X-derived** pad to the Y extent as well (`:28`), with no degenerate guard: a vertical-line contour gives `pad = 0` **and** a zero-width viewBox. `ContourPreview/challenge-C-consumption.md:175` books that from the sibling's side and cites PathPreview's `|| 1` as the comparand; recorded here as the source of that citation.

**Falsifier.** Dies if `preserveAspectRatio="xMidYMid meet"` (`:53`) already did this work — it does not: `meet` fits the *viewBox* into the *viewport*, and here the viewBox is a fixed unit square and the viewport is a `size × size` square, so `:53` is a **no-op** (fold: `EasingCurvePreview/challenge-C-consumption.md:89`, which uses this exact square-in-square case as its contrast). All shape-fitting is therefore the `:29-35` arithmetic's job, and that arithmetic does it correctly.

---

### S-5 · **`.toFixed(4)` coordinate rounding** — FOLD

`:40` rounds every emitted coordinate to 4 decimals. On a unit-square viewBox at `size=64` that is sub-0.01 px precision, at ~7 bytes per coordinate. The tree's other path serialiser, `closedSplinePath` (`contourEditing.ts:26-42`), emits raw `Number.prototype.toString` doubles — six full-precision coordinates per Bézier segment. Already booked by `ContourPreview/challenge-L-library.md:70`, which cites `PathPreview.vue:40` as the comparand. Recorded here as its source; no new claim.

---

## §C · Corpus reconciliation

| corpus row | disposition |
|---|---|
| `lane-frontend.md:183,369,444` — *"Bespoke SVG path thumb (no glass-ui analogue)"*, *"genuinely bespoke — no flag"* | **AGREE**, and corroborated independently from the producer's installed dist rather than from the census (S-1). Extended: the classification is not merely "not a shadow" — it is the *positive* property that makes this the one `components/ui/` file with zero tri-package migration cost. |
| `lane-frontend.md:492` — the tri-package atomic bump | **AGREE.** PathPreview's contribution to it is provably nil (S-1). |
| `lane-fourier-r3-r6.md` **R6-8** — an operation model embedding client back-references cannot attribute a defect to one side of the seam | **AGREE, and extended with the inverse.** D-1 is the same seam class failing the opposite way: an operation field declaring a product only the client can make, joined to the client by nothing. R6-8's remedy (decouple the join) does not detect it — a correctly-decoupled seam and a never-built seam are structurally identical. F.W5 needs a liveness predicate alongside the isolation predicate. |
| `lane-fourier-r3-r6.md` **R3-7b** — `securityGate: RED_0_OF_45` | **AGREE, methodologically extended.** That gate is the shape "enumerate 45 operations, check one property per operation." D-1 is invisible to it: `preview_path` is *present*, *typed*, and *well-formed* on all three operations that carry it; only its value is a lie. Same denominator, different predicate. |
| `GalleryCard/challenge-L-library.md:563` D-3 — dead `VIZ_COLORS` + `PathPreview` imports, MINOR | **AGREE on the fact, differ on severity from this side** (D-2). Not a double-count: there the subject is the importer wasting a line; here it is the importee having no consumer, which is what renders D-1's seam undetectable. Mechanism added: `web/tsconfig.json` sets neither `noUnusedLocals` nor `noUnusedParameters`, so `vue-tsc -b` structurally cannot catch it. |
| `GalleryCard/challenge-L-library.md:388` — *"whether the emitted production bundle also carries `PathPreview`'s CSS is **UNPROVEN-NEEDS-LIVE (SS-13)**"* | **CONTRADICTED — resolved statically, and resolved NEGATIVE.** See below. |
| `EasingCurvePreview/challenge-C-consumption.md:37,55,89,176,201,203` and `ContourPreview/challenge-{C,L}` :70,:157,:175,:213 | **FOLDED, not re-derived.** Those six rows cite PathPreview as a comparand; S-2/S-3/S-4/S-5 and D-9 record this file as the source of each citation and add only what is new from the primitive's own side. |

### The contradiction, in full

`GalleryCard/challenge-L-library.md:388` left open whether the dead import drags PathPreview's scoped CSS into the production bundle, marking it SS-13. It is decidable **statically**, from the build artifact checked into the tree.

- `grep -ro "path-preview" web/dist/assets/ | wc -l` → **0**, across all 200 emitted asset files.
- Control, same command on a class that *is* live: the literal `gallery-card` **is** present in `web/dist/assets/GalleryView-B4SY1qTS.js`. So Vite does not rename scoped-CSS class names, and the absence above is genuine evidence rather than a minification artifact.
- **Freshness holds.** `dist/assets/GalleryView-B4SY1qTS.js` is dated 2026-06-12 18:13. `GalleryCard.vue`'s last commit is `9d7c387` (2026-06-03 17:17, *"feat(J.W3+W4): scheduler.yield floor + content-visibility on the gallery"*), and its working-tree mtime (2026-06-03 17:16) shows it clean since. The build therefore postdates the current file, import line and all.

**Conclusion: Rollup tree-shook the dead default import and its scoped stylesheet entirely. The bundle cost is zero.** This *reduces* D-2 to a purely hygienic finding — there is no shipped weight, only a lie in the source graph. Recorded as a contradiction because the corpus row is currently open and would otherwise be carried into F.W2 as an unresolved bundle-budget item.

**Falsifier on my own claim.** Dies if the checked-in `dist/` was produced from a different source state or a non-default config — its provenance (commit, env, `VITE_BASE_URL`) is not recorded anywhere in the tree, which is the honest weakness here; the mtime/commit ordering above is circumstantial, not cryptographic. Dies if `sideEffects` config changed the outcome — `web/package.json` declares no `sideEffects` field, so this is Rollup's default behaviour and should reproduce. A single `npm run build` would settle it beyond doubt; not run, per the read-only law.

---

## §D · Verdict

The component's **internal craft is the best of the three preview surfaces in fourier** — uniform-scale fit with degenerate guards (S-4), DPI-invariant stroke (S-3), cascade-inherited colour (S-2), rounded output (S-5), and a producer-dependency footprint of exactly zero (S-1). Four of those five are already cited by sibling challenges as the pattern the siblings *failed* to adopt.

Its **consumption posture is nonetheless defective**, and the defects are all at the seams rather than in the body:

1. **D-1 (BLOCKER)** — it is the client half of an API contract (`ContourAsset.preview_path`) that is declared on 3 of 45 operations, hardcoded empty at its only writer, typed non-optional on the client, and read by nobody. Two-sided repair; carries to F.W5.
2. **D-2/D-3/D-4/D-5 (MAJOR)** — no live consumer; a props shape used by nothing else in the tree; a co-length invariant that the shape makes inexpressible and the guard does not check; and an unconditional `Z` that contradicts the tree's own open-by-default path renderer.
3. **D-6..D-9 (MINOR/INFO)** — dead configuration with mis-stated `padding` semantics; four variadic spreads against the letter (not the scope) of Invariant 20; an unguarded divisor; a tree-wide a11y gap.

**Disposition recommended to F.W2/F.W5.** Do not delete it — it is the tree's best-written SVG path primitive and the natural home for the extraction that `ContourPreview/challenge-L-library.md:235` (C-2) proposes. Do three things: (a) resolve D-1 on **both** sides — either populate `preview_path` server-side and consume it here, or delete the field from `assets.py`/`responses.py`/`image_storage.py`/`types.ts`, and never ship the half-state; (b) re-shape the props to the wire envelope (`points: { x: number[]; y: number[] }`) or to `Point2D[]` via the `zipPoints`/`unzipPoints` adapters that already exist, closing D-3 and structurally closing D-4; (c) add `closed?: boolean` defaulting **false**, matching `drawGhostPath`, closing D-5. Then give it a consumer, or the whole axis stays unfalsifiable.
