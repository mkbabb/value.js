claude-opus-5[1m]

# CHALLENGE — `PathPreview.vue` · axis **L (LIBRARY)**

**Target** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/ui/PathPreview.vue` (69 lines)
**Census row** `formation/fourier/lane-frontend.md:183` — *"`components/ui/PathPreview.vue` | 69 | Bespoke SVG path thumb (no glass-ui analogue)"*; reaffirmed at `:366` (one of the 5 `ui/` files), `:369` (bespoke-with-no-analogue), `:444` (*"genuinely bespoke — no flag"*), and enumerated as one of the 12 SVG surfaces at `:565`.
**Posture** Component assumed DEFECTIVE until the tree proves otherwise. Every row carries severity + `file:line` + its own falsifier; L-18 runs both ways, so the four superlatives carry falsifiers too, and a **contra-findings** block records the four defects I hunted and could not sustain.
**Method** Static + source-derived only. No browser. Eight mechanical receipts were taken by re-executing the component's own `svgPath` body as a standalone function under the host Node runtime (scratchpad, read-only w.r.t. every repo) and are quoted verbatim as `probe C*/D*`. Bundle receipts come from `web/dist/` via `grep -c`. Livable-only magnitudes are marked **UNPROVEN-NEEDS-LIVE (SS-13)**.

**Ledger — 14 defects · 1 BLOCKER · 4 MAJOR · 7 MINOR · 2 INFO · 4 superlatives.**

---

## 0 — Read set

**The target imports exactly one module: `vue` (`:2`, `computed`).** No barrel, no dist alias, no cycle, no `@/` path, no glass-ui, no `pencil-boil`, no `value.js`. The import-graph charge of this axis is discharged in one line, and the *absence* of imports is itself the finding (§L-4, §L-5).

Whole-file reads (read-only): the target; its sole importer `visualization/gallery/GalleryCard.vue` (309); the three structural siblings it is measured against — `visualization/ContourPreview.vue` (62), `decorative/FourierMorphSvg.vue` (41), `morph/MorphShapePreview.vue` (175); the two library modules that already own its job — `lib/svg-fourier.ts` (154) and `visualization/lib/canvas-drawing/transforms.ts` (39); the canvas render path it shadows — `visualization/lib/canvas-drawing/ghost-path.ts` (29) with both callsites in `visualization/BasisCanvas.vue:131,220`. Plus `lib/types.ts:15-45,207-239`, `lib/defaults.ts:8`, `web/tsconfig.json`, `web/package.json`, `web/e2e/`, `web/dist/assets/`, `api/models/shared.py:5-25`, `api/models/computation.py:38-55`, `api/models/visualization.py:76,126,187,281`, `api/routers/images.py:240-266`, `web/src/style.css`.

**Corpus folded.** `formation/fourier/lane-frontend.md` (rows above); `formation/fourier/CENSUS-2026-08-03.md:85-101` (the viz-architecture rows: *"Canvas2D throughout, **WebGL/WebGPU ABSENT**; three independent canvases"*, and the `BasisCanvas` + `canvas-drawing/` 1 311-LOC SOFT-shadow row vs glass-ui's GPU-backed `FourierField`); `audit/codex-provenance/intakes/lane-fourier-r3-r6.md` rows **R5-7**, **R6-5**, **R6-6**, **X-5**, **X-9**. §1's L-1 **contradicts four lane-frontend rows explicitly** and folds R5-7 as its mechanism.

---

## 1 — Defects

### L-1 · BLOCKER · The component has **zero render sites**; the shipped bundle proves it, and the emptiness is invisible to the very derivation model R6 just repaired

`PathPreview` is imported in exactly one file and rendered in none.

```
GalleryCard.vue:10   import PathPreview from "@/components/ui/PathPreview.vue";
```

That is the **only** occurrence of the identifier anywhere in `fourier-analysis` outside the target itself and one prose mention in a 2026-05-27 audit doc. Receipts:

- `grep -rn "PathPreview" .` (whole repo, excluding `node_modules`/`.git`) → **2 hits**: `GalleryCard.vue:10`, and `docs/audits/runs/2026-05-27-D-audit/DA6-guard-thread-scoping.md:77` (prose, listing it among "the shared UI kit").
- Template-scoped count: `awk '/^<template>/,/^<\/template>/' GalleryCard.vue | grep -c "PathPreview"` → **0**.
- The whole `<template>` (`GalleryCard.vue:64-187`) renders `<img>`, `Badge`, `Button`, `Checkbox`, and five `lucide-vue-next` icons. Every other import in that file is used. `PathPreview` alone is dangling.

**The build confirms total deadness.** `GalleryCard` compiles into `dist/assets/GalleryView-B4SY1qTS.js` — verified by four distinctive markers, `gallery-card` / `Toggle featured` / `like-btn` / `basis-tint`, each `grep -c` = **1**. That same chunk contains **0** occurrences of `xMidYMid meet` and **0** of `toFixed(4)`, PathPreview's two most distinctive compiled strings (`:53`, `:40`). Across *all* of `dist/assets/*.js` the literal `path-preview` appears **0** times, and across *all* `dist/assets/*.css` the selector `.path-preview` (`:65`) appears in **0** files. Vite tree-shook the SFC *and* its scoped style out entirely. Both source files predate the build (`PathPreview.vue` mtime Mar 9, `GalleryCard.vue` Jun 3, `dist/` Jun 12), so the artifact reflects the current bytes of both — the staleness of `dist` elsewhere (22 `src` files are newer) does not touch this pair.

**Why this is a BLOCKER and not merely dead code.** The deadness is *structurally indistinguishable from R5-7's blind spot*, and the F.W4 scope law is about to be written on top of that model.

- **R5-7** (intake `:125`, ADOPT-AS-FACT + CARRY-TO-WAVE → F.W4): *"template-loop evidence keyed to **component** callsites is blind to native HTML element loops."* R5's `leafValues["instance.loop.paper-sidebar"]` was literally `[]` — a real subtree rendering as nothing.
- **R6-5/R6-6** (intake `:139-140`) cured that with a new `NATIVE_TEMPLATE_LOOP` family: the leaf became 3 rows, and `counts` gained `nativeTemplateLoops: 16`.
- **PathPreview's instance leaf is `[]` for the opposite reason: it is genuinely dead.** R6's cure does not and cannot separate the two — there is no loop here to reclassify. After the cure, an empty instance leaf reads as *"accounted for"*, and a dead component is laundered into the denominator.

The census already made exactly that error. Four rows record `PathPreview` as a live component: `lane-frontend.md:183` (inventory row, 69 LOC, folded into the 66-SFC count that X-5 certifies *"AGREE — exact, both sides"*), `:366` (*"3 are glass-ui wrappers, `PathPreview.vue` is bespoke SVG"*), `:369` (*"Bespoke with no glass-ui analogue"*), `:444` (*"genuinely bespoke — **no flag**"*). **I contradict all four**: it is not bespoke-and-live, it is bespoke-and-unrendered, and `:444`'s "no flag" is the wrong verdict — the flag is *delete or wire*. X-9 (intake `:160`) already rules that *"the formation must pick and publish one scope law before any per-component census claims a percentage"*; this row is the concrete case that law must decide — **does an imported-but-never-rendered SFC count as a member?** Today it silently does.

**Falsifiers.** (a) A `<component :is>`, `defineAsyncComponent`, `resolveComponent`, or string-keyed dynamic render anywhere would make it live — `grep -rn "PathPreview"` returning 2 hits, neither dynamic, forecloses all four. (b) A render site in a file the grep missed — the grep was repo-wide with no `--include` filter, so only a non-UTF8 or generated source could hide one; none exists. (c) A `dist` built from *older* source could show a false absence — refuted by the mtime ordering above. (d) If Rollup had merely failed to shake it, the strings would appear in *some* chunk; they appear in none. (e) If the census's 66-SFC denominator is deliberately *file-count*, not *live-component-count*, then `:183` is defensible and only `:444`'s "no flag" survives as wrong — that reading is available and I flag the ambiguity rather than assert against it.

### L-2 · MAJOR · No gate in the repository can detect the dangling import — there is no linter, and `noUnusedLocals` is off

`package.json:8` — `"build": "vue-tsc -b && vite build"`. That is the whole gate.

- **No ESLint anywhere.** `find . -name ".eslintrc*" -o -name "eslint.config*"` (excluding `node_modules`) → **0 files**. `grep -n "eslint" web/package.json` → **0 hits**. So `vue/no-unused-components` and `no-unused-vars` — the two rules that exist precisely for this — are not merely misconfigured, they are absent.
- **`noUnusedLocals` / `noUnusedParameters` are unset.** `web/tsconfig.json` sets `strict: true`, `verbatimModuleSyntax: true`, `isolatedModules: true`, `noEmit: true` — a genuinely disciplined config (see S-4's rider) — but `grep -n "noUnusedLocals\|noUnusedParameters" tsconfig*.json` → **0 hits**. `vue-tsc -b` therefore passes `GalleryCard.vue` clean.
- **No unit-test runner.** `grep -n "vitest\|jest" web/package.json` → **0 hits** (see L-12).

The consequence generalises past this file: **any** unused import in **any** of the 66 SFCs ships undetected, and the one-line fix (`"noUnusedLocals": true`) is a single key in a config the repo already maintains at a high standard.

**Falsifier.** If a root-level or CI-level lint step exists outside `web/` it would refute this — `find` was rooted at the repository top and `web/package.json` has no lint script and no eslint devDependency, so the only remaining hiding place is a CI workflow invoking a globally-installed binary. **UNPROVEN-NEEDS-LIVE (SS-13)** only for that last case; the local config claims are exact. Second falsifier: enabling `noUnusedLocals` and running `vue-tsc -b` must emit TS6133 at `GalleryCard.vue:10` — if it does not (because `<script setup>` bindings are exempted from the check by the SFC transform), this row's *mechanism* is wrong while its *conclusion* (nothing catches it) is strengthened.

### L-3 · MAJOR · `pathX` and `pathY` are two independent props, so the length invariant is inexpressible — and `pathY[i]` is read unguarded, silently corrupting the `d` attribute

```
PathPreview.vue:6-7    pathX: number[];
                       pathY: number[];
PathPreview.vue:23     if (!pathX.length || !pathY.length) return "";
PathPreview.vue:37-41  const pts = pathX.map((x, i) => { … const sy = 0.5 - (pathY[i] - cy) * scale; … });
```

The guard at `:23` checks that **both are non-empty**. It never checks that they are **the same length**. The map at `:37` is driven by `pathX`, so any `i ≥ pathY.length` yields `undefined - cy` → `NaN` → `NaN.toFixed(4)` → the string `"NaN"` spliced into the `d` attribute.

> **probe C1** (`svgPath([0,1,2],[0,1])`) → `M0.0833,0.7083L0.5000,0.2917L0.9167,NaNZ`

Per SVG path-data error handling a user agent renders the path *up to but not including* the command containing the first error — so the thumbnail silently loses its tail and its closing segment, with no console error, no thrown exception, and no falsy `svgPath` to trip the `v-if` at `:60`. **The `:23` guard is worse than none: it catches the harmless case and licenses the harmful one.** The component's only error posture is "render something wrong."

**The tree's own convention is the fix, and PathPreview is the sole deviant.** Every other path surface passes the pair as one object:

- `lib/types.ts:26` — `path: { x: number[]; y: number[] }` on `EpicycleData`; `:15` — `original: { x: number[]; y: number[] }`; `:17` — `partial_sums: Record<string, Record<number, { x: number[]; y: number[] }>>`.
- `lib/svg-fourier.ts:38` — `xyToPoints(xy: { x: number[]; y: number[] })`.
- `ContourPreview.vue:7` — `points: Point2D[] | undefined` (pairing is structural).
- `ghost-path.ts:10-11` takes them split — but it is an internal `lib/` function called only from `BasisCanvas.vue:131,220`, where both arguments are destructured from a *single* `data.path` object, so they cannot desynchronise.

`PathPreview` is the one place where a caller must supply two arrays and hold the invariant in their head, and it is a `ui/` component advertised for general reuse (L-11).

**Falsifier.** If a producer guaranteed equal lengths this would be defensive-only. There is no producer at all (L-1), so nothing constrains the contract, and the props are `number[]` — the type system permits mismatch by construction. If the intended posture is "garbage in, garbage out", then `:23`'s existence contradicts it: the component *does* attempt validation and gets it wrong. Third falsifier: if a UA renders `NaN`-containing path data as a *complete blank* rather than a truncation, the visual magnitude changes but the corruption does not — the truncate-vs-blank split is **UNPROVEN-NEEDS-LIVE (SS-13)**.

### L-4 · MAJOR · It reimplements `pointsToSvgPath` — worse — and hardcodes `Z`, so it structurally cannot render the open-path case the canvas models as first-class

`lib/svg-fourier.ts:47-73` is the tree's canonical points-to-`d` converter:

```
svg-fourier.ts:47-52   export function pointsToSvgPath(points, closed: boolean = true): string {
                           if (points.length < 2) return "";
                           if (!closed) return catmullRomToBezier(points);
svg-fourier.ts:72          return d + " Z";
```

`PathPreview.vue:43` — `return `M${pts.join("L")}Z`;` — is a strictly weaker duplicate on three counts:

1. **`closed` is hardcoded.** The library takes it as a parameter. So does the canvas: `ghost-path.ts:7-13` — `drawGhostPath(surface, view, pathX, pathY, closePath = false)` with the doc comment `@param closePath Whether to close the path (epicycle mode closes it)` — and **both branches are live**: `BasisCanvas.vue:131` passes `true` (epicycle), `BasisCanvas.vue:220` omits it (open, the default). PathPreview appends `Z` unconditionally, drawing a spurious chord from last point to first for every open path. It cannot preview the `fourier-series` case correctly, and there is no prop by which a caller could ask.
2. **Polyline vs. smoothing.** The library emits Catmull-Rom cubic `C` segments with modular wrap-around at the seam (`:55-70`); the sibling `ContourPreview.vue:13` calls `closedSplinePath`. PathPreview emits raw `L` segments — at a 64 px thumbnail with `n_points = 1024` this is arguably the *right* trade (see S-3's neighbourhood), but it is an undocumented divergence from two siblings, not a decision the file records.
3. **The `< 2` guard is missing.** `svg-fourier.ts:51` refuses degenerate input; PathPreview accepts a single point and emits `M0.5000,0.5000Z` (L-13).

`xyToPoints` (`svg-fourier.ts:38-44`) even performs precisely the `{x[],y[]}` → point-array zip that `:37-41` inlines. The composition `pointsToSvgPath(xyToPoints(path), closed)` is already exported, already used by the morph path, and would have deleted this computed.

**Falsifier.** If PathPreview deliberately wants a *cheap polyline* rather than the library's beziers, then reusing `pointsToSvgPath` is wrong and only claims (1) and (3) survive — that is a real defence and I mark claim (2) as the weakest of the three. Claim (1) is not defensible: the `closed` axis is modelled explicitly in two independent places in this tree and omitted here. Second falsifier: if every path fed to a *thumbnail* were closed by construction, the hardcode would be harmless — `ghost-path.ts:12`'s default is `false`, i.e. open is the **default** case, so this fails.

### L-5 · MAJOR · The fit-to-box transform is a second copy of `getPathBounds`, with a divergent margin constant

```
transforms.ts:10-27              PathPreview.vue:25-35
  minX/maxX/minY/maxY              minX/maxX/minY/maxY          identical
  rangeX = maxX-minX || 1          rangeX = maxX-minX || 1      identical, incl. the `|| 1` (L-6)
  const margin = 0.15;             padding default 0.1          DIVERGENT
  scale = Math.min(w/…, h/…)       scale = 1/(Math.max(…)·…)    equivalent for a square box (S-1)
  cx,cy = midpoints                cx,cy = midpoints            identical
  toScreen: h/2 - (y-cy)*scale     sy = 0.5 - (pathY[i]-cy)·s   identical, incl. the Y-flip
```

`getPathBounds` is exported (`transforms.ts:10`), re-exported through `canvas-drawing/index.ts`, and is the single fit law for the entire Canvas2D render path the census calls *"1 311 LOC Canvas2D"* (`CENSUS-2026-08-03.md:96-97`) across *"three independent canvases"* (`:86`). PathPreview neither imports it nor generalises it; it retypes it against a normalized `[0,1]` output space instead of a pixel `CanvasSurface`. The right shape is obvious and absent: `getPathBounds` should take the output extent (`{width, height}`) rather than a `CanvasSurface`, and the SVG thumb should pass `{width: 1, height: 1}`.

**The margins then disagree by 50 %** — the canvas frames every path at `0.15` (`transforms.ts:21`), the SVG thumb at `0.1` (`:17`), and `ContourPreview.vue:26` at a third, X-derived `0.1`. Three preview surfaces of the same data, three framings.

This is the LIBRARY-axis face of the census's `BasisCanvas` ↔ glass-ui `FourierField` SOFT-shadow row (`CENSUS-2026-08-03.md:96-97`): before that cross-repo convergence can be studied, fourier has an *intra*-repo convergence it has not done. Note also that `CENSUS-2026-08-03.md:85-86` certifies **WebGL/WebGPU ABSENT** — so PathPreview touches no GPU path; its only relation to the viz render architecture is this duplicated Canvas2D transform.

**Falsifier.** If the two really need different framings — a 64 px thumb wanting tighter crop than an interactive stage — the *constants* should diverge while the *function* is shared; a divergent constant is not a defence for a divergent implementation. Second falsifier: if `getPathBounds`'s `CanvasSurface` dependency were irreducible, extraction would be costly — it is not; `surface` is read only for `.width`/`.height` (`transforms.ts:23-29`). Third: the scale formulae *are* equivalent here (S-1), so this row is duplication, **not** a behavioural divergence, and I do not claim the thumbnail is mis-scaled relative to the canvas at equal margins.

### L-6 · MINOR · `|| 1` injects a **synthetic unit range** that then wins the `Math.max`, silently halving a degenerate-axis path

```
PathPreview.vue:29-30   const rangeX = maxX - minX || 1;
                        const rangeY = maxY - minY || 1;
PathPreview.vue:33      const scale = 1 / (Math.max(rangeX, rangeY) * (1 + padding * 2));
```

The `|| 1` is a divide-by-zero guard, but the substituted value is not neutral — it enters the `Math.max` as a competitor. For an axis-degenerate path whose *other* range is below 1, the phantom `1` dominates and the shape renders at a fraction of its intended size.

> **probe D1** (`pathX=[2,2,2]`, `pathY=[0,0.25,0.5]`) → `scale 0.8333`, `y ∈ [0.2917, 0.7083]` (span 0.4167).
> Correct fit for `rangeY = 0.5` is `scale 1.6667`, `y ∈ [0.0833, 0.9167]` (span 0.8333) — a **50 % under-scale**.
> **probe D1b** (same shape, `rangeY = 500`) → `y ∈ [0.0833, 0.9167]` — correct; the fallback is inert once the real range exceeds 1.
> **probe D2** (mirror case, `rangeX = 0.5`, degenerate Y) → `x ∈ [0.2917, 0.7083]` — same defect on the other axis.

A neutral guard is available and costs nothing: fall back to the *other* axis's range, or to `Math.max(rangeX, rangeY) || 1` applied once after the max.

**Falsifier — and it is strong.** Contour coordinates are OpenCV pixel space: `api/routers/images.py:253-258` builds `np.array(c["x"]) + 1j*np.array(c["y"])` from extracted contours, resamples, and emits `path.real.tolist()` / `path.imag.tolist()`. Real ranges are hundreds of pixels, so reaching D1 requires a perfectly axis-degenerate path whose other extent is under **one pixel** — effectively unreachable for real data. Hence MINOR, not MAJOR. Second falsifier: `NaN` is also falsy, so `maxX-minX === NaN` takes the same branch and is silently swallowed (see L-14) — that path is reachable and is the row's real teeth. Third: `transforms.ts:19-20` carries the identical `|| 1`, so this is a **tree-wide class**, not a PathPreview invention; its `Math.min(w/…, h/…)` composition manifests it differently and is out of scope here.

### L-7 · MINOR · `padding` under-delivers its own name by 17 %, and the tree's other `0.1` means something else

`scale = 1 / (range · (1 + padding·2))` (`:33`) makes `padding` a fraction of the **content**, not of the **box**. The rendered margin is therefore always smaller than the number suggests:

> **probe D4** — `padding=0` → content span 1.0000, pad 0.0000 · `0.05` → 0.9091 / 0.0455 · **`0.1` → 0.8333 / 0.0833** · `0.25` → 0.6667 / 0.1667.

A caller reading `padding: 0.1` (`:17`) against a `viewBox="0 0 1 1"` (`:52`) reasonably expects 10 % of the box; they get **8.33 %**. The comment at `:32` — `// Fit into [0, 1] with uniform scale + padding` — names the output space `[0,1]`, which actively encourages the box reading, and does not state the convention. There is no prop doc comment anywhere in `:4-19`.

The divergence is live in the corpus: `ContourPreview.vue:26` also uses `0.1`, but composes it into a *viewBox* (`:28`) where the pad is applied additively and **is** exact. Two components, the same literal, two different meanings.

**Falsifier.** If `padding` is documented anywhere as content-relative this row is FALSE — `grep` over the file finds no doc comment, and there are no consumers (L-1) and no tests (L-12) to encode the intent. If the convention is deemed obvious from the formula, the row degrades to a naming complaint (`inset`, `marginRatio`) — which is why it is MINOR and not MAJOR. The arithmetic itself is exact and not falsifiable.

### L-8 · MINOR · `padding` has an unvalidated domain; `padding ≤ -0.5` emits `Infinity` into the `d` attribute

`padding: number` (`:11`) admits any double. At `padding = -0.5` the factor `(1 + padding·2)` is `0`, so `scale` is `Infinity` and every coordinate becomes `±Infinity`; `Infinity.toFixed(4)` is the string `"Infinity"`.

> **probe C3** (`padding = -0.5`) → `M-Infinity,InfinityLInfinity,-InfinityZ`

Below `-0.5` the sign flips and the path mirrors. `withDefaults` (`:13-18`) supplies a default but cannot constrain a range, and there is no clamp — contrast `api/models/visualization.py:76` `n_harmonics: int = Field(default=1, ge=1, le=4096)`, i.e. the *Python* side of this same product does bound its numeric inputs.

**Falsifier.** Unreachable today: no consumer exists (L-1), so no caller can pass it. This is a contract-hardening row against the day the component is wired, not a live bug — which is exactly why it is MINOR. If the house posture is "public props on a `ui/` component must validate their domain", it is the same severity as L-3's missing invariant; if the posture is "internal components trust their callers", it drops to INFO.

### L-9 · MINOR · Stroke width is hand-coupled to the `size` **prop**, where the sibling uses `vector-effect` — correct only while CSS never touches the element

```
PathPreview.vue:56   :stroke-width="strokeWidth / size"
```

This is a correct compensation for the `viewBox="0 0 1 1"` unit space (S-2) — but only while the element's **rendered** pixel size equals the `size` **prop**. `:width` / `:height` (`:50-51`) are *presentation attributes*, the weakest source in the cascade: any CSS `width` rule beats them. The scoped style defends almost nothing:

```
PathPreview.vue:65-68   .path-preview { display: block; flex-shrink: 0; }
```

`flex-shrink: 0` guards the flex-container case only. It does not guard `width: 100%` from a parent, a container query, a `:deep()` override, a grid `minmax`, or a `max-width` reset. Under any of those the SVG scales while `strokeWidth / size` does not, and the stroke thickens or thins proportionally.

The sibling solves this declaratively and structurally: `ContourPreview.vue:47` — `vector-effect="non-scaling-stroke"` — which pins the stroke to device pixels regardless of viewport, viewBox, or CSS. `FourierMorphSvg.vue` sidesteps it a third way, by using a pixel-space viewBox (`"0 0 200 200"`) so `strokeWidth` is already in user units. Three SVG components, three stroke conventions, and PathPreview's is the only one that can be broken by a stylesheet it does not own.

**Falsifier — the coupling holds today.** `web/src/style.css` is the tree's **only** CSS file (`find web/src -name "*.css"` → 1 result) and contains no global `svg` rule and no `max-width: 100%` reset (`grep` → 0 hits). So this is fragility, not breakage — hence MINOR. Second falsifier: if `size` is intended as the *sole* sizing API and CSS sizing is forbidden by convention, the design is coherent — but nothing states that, and a `ui/`-kit component cannot enforce it. Rendered-vs-attribute divergence under a real stylesheet is **UNPROVEN-NEEDS-LIVE (SS-13)**.

### L-10 · MINOR · Four spread calls over an unbounded array; the engine wall is real and `n_points` carries no server-side bound

```
PathPreview.vue:25-28   Math.min(...pathX)  Math.max(...pathX)  Math.min(...pathY)  Math.max(...pathY)
```

Spreading an array into an argument list is bounded by the engine's stack, not by memory.

> **probe C5**, host runtime: `n=1024` OK · `n=65536` OK · **`n=125000` → `RangeError: Maximum call stack size exceeded`**

The ceiling is engine-specific and JavaScriptCore's has historically been far lower than V8's — which matters, because `web/e2e/` runs a Safari-class target and this project's sibling constellation has already been bitten by exactly this class of iOS-Safari stack limit. The relevant bound:

- `web/src/lib/defaults.ts:8` — `n_points: 1024`; `api/models/shared.py:13` and `api/models/computation.py:45,50` — `n_points: int = 1024`.
- **None of the three carries a Pydantic bound.** `n_points: int = 1024` has no `Field(le=…)`, while the neighbouring `n_harmonics` is bounded at four separate sites (`api/models/visualization.py:76,126,187,281` — `ge=1, le=4096`). The asymmetry is the finding: the array-length knob is the unbounded one.
- `api/routers/images.py:257` — `path = resample_arc_length(path, cs.n_points)` — forces the array to exactly `n_points`, so `n_points` *is* the array length.

The idiomatic fix is one loop, which `transforms.ts` also does not do — and `ContourPreview.vue:19-25` **does**: an explicit `for (const p of pts)` accumulating four extrema, allocation-free and unbounded-safe. The tree already contains the correct pattern.

**Falsifier.** The default is 128× under the measured ceiling, and no consumer exists to pass a larger array (L-1) — so the wall is reachable only via a client requesting a large `n_points` against an unbounded endpoint. MINOR on that basis. Second falsifier: `transforms.ts:15-18` carries the identical four-spread pattern on the *live* canvas path, so if this is a defect it is a tree-wide one and PathPreview is not its author — I book it here because the axis asks for it, and flag the shared class. Third: the exact JSC ceiling is **UNPROVEN-NEEDS-LIVE (SS-13)**; only the host-runtime figure above is measured.

### L-11 · MINOR · Colocation — a zero-consumer component sitting in the shared kit, advertising reuse it has never had

`src/components/ui/` has exactly four members (`ls`): `CollapsibleSection.vue` (72), `PathPreview.vue` (69), `SliderControl.vue` (150), `tooltip/`. The census reads three of them as glass-ui adapters — `lane-frontend.md:445` *"thin wrapper over glass-ui `Slider`"*, `:446` *"thin wrapper over glass-ui `Collapsible`"*, `:447` *"Single-component tooltip shim"* — and PathPreview as the one bespoke member (`:444`).

`ui/` is the tree's *shared kit*: the 2026-05-27 audit doc calls it exactly that (`DA6-guard-thread-scoping.md:77`, *"the shared UI kit (`ui/{CollapsibleSection,PathPreview,SliderControl}.vue` …)"*, listed among **cross-cutting surfaces every design agent must account for**). Placement in `ui/` is a claim of general reuse. PathPreview has had **zero** consumers for the whole life of the file (mtime Mar 9). Every component that actually renders a path lives under `visualization/` (`ContourPreview`, `ContourEditorCanvas`, `EasingCurvePreview`), `decorative/` (`FourierMorphSvg`), or `morph/` (`MorphShapePreview`).

**Falsifier.** If `ui/` means "presentation-only, dependency-free" rather than "shared", PathPreview qualifies on the letter — it is the only member importing nothing but `vue`. That reading is available and is why this is MINOR. Second falsifier: had it *one* cross-directory consumer the placement would be right; it has none.

### L-12 · MINOR · Zero test coverage, and the repository has nowhere to put a test

The `svgPath` computed (`:21-44`) is a **pure function from two arrays to a string** — the single most unit-testable artefact in the frontend. It has no test, and cannot get one:

- `grep -n "vitest\|jest" web/package.json` → **0 hits**. There is **no unit-test runner at all**; `scripts` is `dev / build / preview / test:e2e / test:e2e:ui` (`package.json:6-12`).
- The only suite is Playwright: `web/e2e/` = 8 specs (`contour-extraction`, `gallery`, `paper-performance`, `settings-persistence`, `visual-baseline`, `visualization-crud`, `visualization-ux`, `workspace-flow`). `grep -rln "PathPreview\|gallery-card" web/e2e/` → **0 files**. Neither the component nor its host card is named by any spec.

Every one of probes C1/C3/C4/C8 and D1/D2/D4 above is a two-line assertion that would have caught L-3, L-6, L-7, L-8, L-13 or L-14 at authoring time.

**Falsifier.** A dead component (L-1) arguably deserves no test — deleting it is the better fix, and that ordering is why this is MINOR rather than MAJOR. But the *absence of a runner* is a whole-frontend gap that outlives this file: 65 `.ts` modules (X-5, live-verified) including `lib/svg-fourier.ts`, `lib/contourEditing.ts`, `lib/easings.ts`, `lib/evaluators.ts` — all pure, all untested. Second falsifier: if `visual-baseline.spec.ts` screenshots the gallery it would cover the *card*; it still could not cover this component, which never renders.

### L-13 · INFO · A single-point path emits a degenerate `M…Z`, where the library refuses it

> **probe C4** (`pathX=[5]`, `pathY=[5]`) → `M0.5000,0.5000Z`

`svgPath` is non-empty, so the `v-if` at `:60` passes and a zero-length subpath is rendered. With `stroke-linecap="round"` (`:58`) SVG renders a zero-length subpath as a **dot**, not as nothing. `svg-fourier.ts:51` — `if (points.length < 2) return ""` — declines the case outright.

**Falsifier.** A dot may be the *desired* rendering for a one-point contour, in which case this is correct-by-accident rather than a defect — the file records no intent either way, which is why it is INFO. The linecap-dot behaviour is spec'd but its rendering is **UNPROVEN-NEEDS-LIVE (SS-13)**.

### L-14 · INFO · `NaN` input propagates silently and is swallowed twice

> **probe C8** (`pathX=[0,NaN,2]`) → `MNaN,0.9167LNaN,0.5000LNaN,0.0833Z`

Two independent swallows: `Math.min(...)` over an array containing `NaN` returns `NaN`, so `maxX - minX` is `NaN`, which is **falsy** and is silently replaced by `1` at `:29` (L-6's second falsifier) — the range guard hides the corruption — and then `cx` is `NaN`, poisoning **every** x coordinate, not just the offending index. The result is a non-empty `d` string that passes the `:60` guard and renders as nothing or as a fragment.

Combined with L-3, the component's complete error posture is: **no validation, no throw, no warn, no fallback — every malformed input becomes a silently wrong picture.** For a *thumbnail* that is the worst possible posture, because a wrong thumbnail is indistinguishable from a correct one at 64 px.

**Falsifier.** `NaN` in a contour would be an upstream defect and arguably should not be defended against here — hence INFO. But the component *already spends a guard* at `:23`; spending it on the wrong predicate is the criticism, and it is the same criticism as L-3.

---

## 2 — Superlatives *(L-18 runs both ways; each carries its falsifier)*

### S-1 · The uniform-scale formula is genuinely correct, and provably equivalent to the canvas's

`1 / (max(rx,ry) · (1+2p))` (`:33`) looks like a different law from `getPathBounds`'s `min(w/(rx·(1+2m)), h/(ry·(1+2m)))` (`transforms.ts:22-25`). For a **square** output box they are the same number.

> **probe C6** (`rx=3`, `ry=7`, `pad=0.1`) → PathPreview `0.11904761904761904`, `getPathBounds` `0.11904761904761904`, `===` **true**

The Y-flip is likewise exact: `sy = 0.5 - (pathY[i] - cy) * scale` (`:39`) is `toScreen`'s `h/2 - (y - cy) * scale` (`transforms.ts:36`) at `h = 1`. Aspect ratio is preserved, the shape is centred, and the composition with `preserveAspectRatio="xMidYMid meet"` (`:53`) is redundant-but-harmless rather than conflicting. **This is why L-5 is booked as duplication and not as divergence** — the author reproduced the canvas's law correctly from scratch.

**Falsifier.** The equivalence holds *only* for a square viewport. A caller wanting a non-square thumb would need `width ≠ height`, at which point `max(rx,ry)` is wrong and `min(w/…, h/…)` is required — but `:50-51` bind both dimensions to the single `size` prop, so the component structurally cannot enter the regime where its formula breaks. The constraint is real and it is enforced.

### S-2 · `viewBox="0 0 1 1"` + a normalized path is the right idiom, and it is executed cleanly

Normalizing the geometry into a unit box (`:52`) makes the SVG's content **resolution-independent**: the path data is identical at 16 px and 512 px, the DOM is one `<path>` element, and there is no re-derivation on resize. Compare the alternatives in the same tree: `ContourPreview.vue:16-29` recomputes a *data-space* viewBox on every input mutation, and `EasingCurvePreview.vue:19` hardcodes `viewBox="-0.05 -0.3 1.1 1.6"` — a magic rectangle with no derivation at all. PathPreview's is the cleanest of the three, and `size` leaks into the geometry at exactly **one** point (`:56`), which is precisely what makes L-9 a single identifiable seam rather than a diffuse coupling.

**Falsifier.** The idiom's cost is the stroke compensation (L-9); a pixel-space viewBox (`FourierMorphSvg.vue`'s `"0 0 200 200"`) avoids it at the cost of resolution-dependence. Which trade is better is genuinely arguable, so this superlative is about *execution*, not about the choice.

### S-3 · `.toFixed(4)` is rounding discipline the rest of the tree lacks

`:40` — `` `${sx.toFixed(4)},${sy.toFixed(4)}` `` — quantizes to 1e-4 in a unit viewBox, i.e. **0.0064 px** at the default `size = 64`: invisible, and roughly 12 characters per coordinate cheaper than the alternative. The alternative is what the tree actually does elsewhere: `svg-fourier.ts:56,69` emits raw template-interpolated doubles (`` `M${points[0][0]},${points[0][1]}` ``, `` ` C${cp1x},${cp1y} …` ``) with no rounding, and `lib/contourEditing.ts`'s `closedSplinePath` does the same. At `n_points = 1024` that is a materially larger `d` string parsed on every update. **PathPreview is the only path producer in the repository that rounds.**

**Falsifier.** `4` is a magic constant coupled to an assumed `size`. The quantization reaches 1 px at `size ≈ 10 000`, and `size?: number` (`:8`) has no upper bound — so the discipline is right and the constant's coupling is undocumented. Unreachable in practice (a 10 000 px thumbnail is not a thumbnail), which is why this stays a superlative with a rider rather than becoming a defect.

### S-4 · Zero teardown surface — and it is the only SVG surface in the tree that can say so

No `onMounted`, no `onUnmounted`, no `watch`, no `watchEffect`, no `ref` other than the props, no event listener, no `requestAnimationFrame`, no `ResizeObserver`, no `IntersectionObserver`, no timer, no canvas or WebGL context, no `Image()`, no fetch. The entire runtime is one `computed` over props (`:21-44`) plus a static template. **There is nothing to leak and nothing to tear down** — the leaks/teardown limb of this axis is discharged empty, and that is the correct verdict, not an unexamined one.

Two riders that strengthen it: the destructure at `:22` is *inside* the getter, so it re-reads through the reactive proxy on every evaluation and tracks correctly (see CF-2); and the file is `verbatimModuleSyntax`-clean — its single import is a value import of `computed`, correctly not `import type`, under a `tsconfig.json` that sets `strict`, `verbatimModuleSyntax`, `isolatedModules` and `moduleResolution: "bundler"`. Of the 12 SVG surfaces the census enumerates at `lane-frontend.md:565`, this is the one whose render path is a single pure derivation.

**Falsifier.** None available — the absence of imperative code is exhaustively checkable by reading 69 lines, and I read all of them. The uncomfortable rider is that a component which *never renders* trivially leaks nothing (L-1); the claim above is about the source, and holds on the day it is wired.

---

## 3 — Contra-findings *(defects hunted, not sustained)*

**CF-1 · "The thumbnail is scaled differently from the canvas."** FALSE — the formulae are numerically identical for a square box (**probe C6**, `===` true). Only the *margin constant* diverges (0.1 vs 0.15, L-5), and only the *implementation* is duplicated. I do not claim mis-scaling.

**CF-2 · "Destructuring `props` breaks reactivity."** FALSE — `const { pathX, pathY, padding } = props;` sits at `:22`, **inside** the `computed` getter opened at `:21`, so each evaluation re-reads through the props proxy and registers the dependency. Had it been hoisted to module scope (a real and common Vue defect) the computed would freeze at first value. It was not.

**CF-3 · "The stroke overflows the viewBox and is clipped at the default."** NOT SUSTAINED. At `padding = 0.1` the path occupies `[0.0833, 0.9167]` (**probe D4**) and the half-stroke is `1.5/64/2 = 0.0117`, giving `[0.0716, 0.9284]` — comfortably inside. Only `padding: 0` bleeds to `[-0.0117, 1.0117]` (**probe D3**), and that requires an explicit caller. The defaults are chosen correctly; the row survives only as part of L-8's unvalidated-domain neighbourhood.

**CF-4 · "`preserveAspectRatio` conflicts with the manual fit."** FALSE — the viewBox is square (`:52`) and the viewport is square (`:50-51` both bind `size`), so `xMidYMid meet` is a no-op. It is redundant, not wrong, and it correctly future-proofs the non-square case that S-1's falsifier describes.

---

## 4 — Carries

| # | row | severity | carry |
|---|---|---|---|
| **P-1** | L-1 | BLOCKER | **Delete `PathPreview.vue` and the `GalleryCard.vue:10` import, or wire it.** Note the wiring is *not* cheap: the `Visualization` type (`lib/types.ts:207-239`) carries `contour_hash` — an asset FK — and **no path arrays**, so the revival proposed at `docs/audits/runs/2026-06-16-M-deep-audit/raw-findings.json:1172` ("swap the static thumbnail for a lightweight live PathPreview") requires one contour fetch **per card** in an infinite-scroll grid. Delete is the defensible default; wiring is a design decision with a real network cost, not a cleanup. |
| **P-2** | L-1 | BLOCKER | **F.W4 scope law (feeds X-9).** The published member/instance law must state whether an imported-but-never-rendered SFC counts. Today it silently does, in a denominator X-5 certifies as exact. |
| **P-3** | L-1 / R5-7 / R6-5 | BLOCKER | **Derivation-model rider.** R6's `NATIVE_TEMPLATE_LOOP` cure separates *rendered-but-uncounted* from *counted*; it does **not** separate either from **genuinely-dead**. An empty instance leaf remains three-way ambiguous. F.W4's per-component pass needs a `ZERO_RENDER_SITES` classification beside `NATIVE_TEMPLATE_LOOP`, or R6's cure will launder dead components into the live denominator. |
| **P-4** | L-2 | MAJOR | Add `"noUnusedLocals": true` to `web/tsconfig.json` and an ESLint config with `vue/no-unused-components`. One key + one file; the repo has **zero** lint config today. Expect other hits across the 66 SFCs. |
| **P-5** | L-4 / L-5 | MAJOR | **Converge the three fit/serialise implementations.** Generalise `getPathBounds` (`transforms.ts:10`) to take an output extent rather than a `CanvasSurface`; route SVG thumbs through `pointsToSvgPath` (`svg-fourier.ts:47`) with its `closed` parameter honoured. Prerequisite to the census's `BasisCanvas` ↔ glass-ui `FourierField` convergence study (`CENSUS-2026-08-03.md:96-97`) — fourier owes itself an intra-repo convergence first. |
| **P-6** | L-3 | MAJOR | **Contract shape.** If the component survives, collapse `pathX`/`pathY` into the tree's canonical `{ x: number[]; y: number[] }` (`lib/types.ts:26`, `svg-fourier.ts:38`) so the pair travels atomically, and replace the `:23` non-emptiness guard with a length-equality guard. |
| **P-7** | L-12 | MINOR | **No unit-test runner exists in `web/`.** Whole-frontend gap, not a PathPreview gap: 65 pure `.ts` modules (`lib/svg-fourier.ts`, `lib/contourEditing.ts`, `lib/easings.ts`, `lib/evaluators.ts`, …) have no runner to be tested under. Route to the frontend wave, not this component. |
| **P-8** | L-10 | MINOR | `n_points` is unbounded in Pydantic (`api/models/shared.py:13`, `api/models/computation.py:45,50`) while its neighbour `n_harmonics` is bounded at four sites (`api/models/visualization.py:76,126,187,281`). Add `Field(ge=…, le=…)`; independent of this component, and it caps the L-10 spread class tree-wide. |
| **P-9** | L-5 / L-7 | MINOR | Three preview surfaces frame the same data three ways: `transforms.ts:21` `0.15`, `PathPreview.vue:17` `0.1` (content-relative), `ContourPreview.vue:26` `0.1` (X-derived, viewBox-additive). Pick one margin law and one convention; name the prop for the convention chosen. |
| **P-10** | corpus | INFO | **Census correction.** `lane-frontend.md:444` reads *"genuinely bespoke — no flag"*. The flag is **delete-or-wire**. `:183`, `:366`, `:369` each describe the component as live; all four rows need the zero-render-sites fact attached. |
