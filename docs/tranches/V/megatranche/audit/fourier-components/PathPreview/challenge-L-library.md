claude-opus-5[1m]

# CHALLENGE — `PathPreview.vue` · axis **L (LIBRARY)**

**Target** `/Users/mkbabb/Programming/fourier-analysis/web/src/components/ui/PathPreview.vue` (69 lines)
**Substrate** fourier HEAD `cd26c65` (`git rev-parse --short HEAD`), 28 dirty paths. **Both the target and its sole importer are CLEAN** — `git status --porcelain -- web/src/components/ui/PathPreview.vue web/src/components/visualization/gallery/GalleryCard.vue` → *empty*. Every row below is HEAD-true, not an artifact of the in-flight glass-ui 3.1.0→4.0.0 uplift visible in the dirty `web/package.json`.
**Census row** `formation/fourier/lane-frontend.md:183` — *"`components/ui/PathPreview.vue` | 69 | Bespoke SVG path thumb (no glass-ui analogue)"*; reaffirmed at `:366`, `:369`, `:444` (*"genuinely bespoke — no flag"*), and enumerated among the 12 SVG surfaces at `:565`.
**Posture** Component assumed DEFECTIVE until the tree proves otherwise. Every row carries severity + `file:line` + its own falsifier. L-18 runs both ways, so the five superlatives carry falsifiers too, and a **contra-findings** block records the six defects I hunted and could not sustain.
**Method** Static + source-derived only; **no browser**. Two classes of executable receipt, both read-only w.r.t. every repo:
  1. `probe C*/D*` — the component's own `svgPath` body (`:21-44`) re-executed verbatim as a standalone function under the host Node runtime from a scratchpad file.
  2. `probe T*` — `vue-tsc` run against a **scratchpad** `tsconfig` that `extends` the repo's and adds one key. No repo file was written, and `git status` is byte-identical before and after (28 paths, same set).
Livable-only magnitudes are marked **UNPROVEN-NEEDS-LIVE (SS-13)**.

> **SUPERSESSION NOTE.** An earlier L-pass existed at this path. This file folds it whole and **corrects it on three counts**, each with a receipt: (a) its L-1 was grep-only — probe T1 now proves it *from the compiler*; (b) its claim *"Every other import in that file is used. `PathPreview` alone is dangling"* is **FALSE** — `VIZ_COLORS` at `GalleryCard.vue:9` is equally dead (probe T1); (c) its L-2 left the mechanism falsifier open ("if `<script setup>` bindings are exempted…") — probe T1 closes it: they are **not** exempted. Nine further rows are new. Nothing from the prior pass is dropped; where I keep a row I keep its evidence and add mine.

**Ledger — 17 defects · 2 BLOCKER · 4 MAJOR · 8 MINOR · 3 INFO · 5 superlatives · 6 contra-findings.**

---

## 0 — Read set and corpus fold

**The target imports exactly one module: `vue` (`:2`, `computed`).** No barrel, no dist alias, no cycle, no `@/` path, no glass-ui, no `pencil-boil`, no `value.js`. The import-graph limb of this axis discharges in one line — and the *absence* of imports is itself the finding (§L-5, §L-6).

Whole files read (read-only): the target; its sole importer `visualization/gallery/GalleryCard.vue` (309); **all four of that importer's render callsites** — `gallery/GalleryInfiniteGrid.vue`, `gallery/GalleryMarquee.vue`, `gallery/GalleryFeaturedCarousel.vue`; the structural siblings it is measured against — `visualization/ContourPreview.vue` (62), `decorative/FourierMorphSvg.vue` (41), `morph/MorphShapePreview.vue` (175), `visualization/EasingCurvePreview.vue`; the three library modules that already own its job — `lib/svg-fourier.ts` (154), `visualization/lib/canvas-drawing/transforms.ts` (39), and **`node_modules/@mkbabb/pencil-boil/src/path.ts`** (an installed, already-imported dependency — §L-5); the canvas render path it shadows — `canvas-drawing/ghost-path.ts` (29) with both callsites at `BasisCanvas.vue:131,220`. Plus `lib/types.ts`, `lib/defaults.ts:8`, `lib/api.ts:305-355`, `web/tsconfig.json`, `web/env.d.ts`, `web/package.json`, `web/e2e/`, `web/dist/assets/`, `web/src/style.css`, `api/models/{shared,computation,visualization}.py`, `api/routers/images.py:240-266`.

**Corpus folded.**
- `formation/fourier/lane-frontend.md` — `:183`, `:366`, `:369`, `:444`, `:565`. §L-1 **contradicts all four descriptive rows explicitly**.
- `formation/fourier/CENSUS-2026-08-03.md:84-101` — the viz-architecture rows: *"Canvas2D throughout, **WebGL/WebGPU ABSENT**; three independent canvases … + 12 SVG surfaces"* (`:85-87`) and the SOFT-shadow row *"`BasisCanvas` + `canvas-drawing/` (1 311 LOC Canvas2D) vs glass-ui's GPU-backed `FourierField` … duplicated coefficient substrate — highest-value, highest-risk convergence"* (`:96-99`). Both cited where the render path is touched (§L-6).
- `audit/codex-provenance/intakes/lane-fourier-r3-r6.md` — rows **R5-7** (`:125`), **R6-5** (`:139`), **R6-6** (`:140`), **X-5** (`:156`), **X-9** (`:160`). R5-7 is folded twice: as the *mechanism* of §L-1 and, in its own right, at §L-14 where the class **actually applies to this component's host**.

**Census figures re-verified live, this session:** `find web/src -name "*.vue"` → **66**; `-name "*.ts"` → **65** — X-5 (`:156`, *"AGREE — exact, both sides"*) holds at HEAD. `find src/components/ui -type f` → **5** — `lane-frontend.md:366` holds exactly.

---

## 1 — Defects

### L-1 · BLOCKER · The component has **zero render sites** — proven by the compiler, not merely by grep — and its emptiness is invisible to the derivation model R6 has just repaired

`PathPreview` is imported in exactly one file and rendered in none.

```
GalleryCard.vue:10   import PathPreview from "@/components/ui/PathPreview.vue";
```

Four independent receipts, in ascending order of force:

1. **Repo-wide grep.** `grep -rn "PathPreview" . --exclude-dir=node_modules --exclude-dir=.git` → **3 hits**, none a render site: `GalleryCard.vue:10` (the import); `docs/audits/runs/2026-05-27-D-audit/DA6-guard-thread-scoping.md:77` (prose, listing it among *"the shared UI kit"*); `docs/audits/runs/2026-06-16-M-deep-audit/raw-findings.json:1172` (prose — *"PathPreview is already imported at GalleryCard.vue:10 but only static"*, i.e. **a prior audit noticed the import and still did not notice it never renders**).
2. **Template-scoped count.** `awk '/^<template>/,/^<\/template>/' GalleryCard.vue | grep -c "PathPreview"` → **0**. The whole template (`GalleryCard.vue:64-187`) renders `<img>`, `Badge`, `Button`, `Checkbox` and five `lucide-vue-next` icons.
3. **The shipped bundle.** `GalleryCard` compiles into `dist/assets/GalleryView-B4SY1qTS.js` (identified by four distinctive markers — `gallery-card`, `Toggle featured`, `like-btn`, `basis-tint`). Across **all** of `dist/assets/*.js` the literal `path-preview` appears in **0** files; across **all** `dist/assets/*.css` the selector `.path-preview` (`:65`) appears in **0** files. `xMidYMid meet` appears in exactly one chunk — `VisualizationView-D7rkXvbk.js`, which is `ContourPreview.vue:39`, not this component. Rollup shook the SFC *and* its scoped style out entirely.
4. **The compiler.** This is the receipt the prior pass did not have:

> **probe T1** — `vue-tsc --noEmit` against a scratchpad tsconfig that `extends` `web/tsconfig.json` and adds `"noUnusedLocals": true`:
> ```
> src/components/visualization/gallery/GalleryCard.vue(10,1): error TS6133: 'PathPreview' is declared but its value is never read.
> ```

That is TypeScript, through the Vue language service, on the live bytes, stating the fact in its own words. `<script setup>` bindings are **not** exempted from the check — which closes the prior pass's open mechanism falsifier and converts L-1 from a grep inference into a compiler assertion.

**Probe T1 also refutes the prior pass's own supporting claim.** It reported *"Every other import in that file is used. `PathPreview` alone is dangling."* The compiler disagrees:

```
src/components/visualization/gallery/GalleryCard.vue(9,1):  error TS6133: 'VIZ_COLORS' is declared but its value is never read.
src/components/visualization/gallery/GalleryCard.vue(10,1): error TS6133: 'PathPreview' is declared but its value is never read.
```

`GalleryCard.vue` carries **two** dead imports, adjacent lines. The prior pass's conclusion survives; its supporting claim does not, and I record the correction rather than inherit it.

**Why BLOCKER and not merely dead code.** The deadness is *structurally indistinguishable from R5-7's blind spot*, and F.W4's scope law is about to be written on top of that model.

- **R5-7** (intake `:125`, ADOPT-AS-FACT + CARRY-TO-WAVE → F.W4): *"template-loop evidence keyed to **component** callsites is blind to native HTML element loops."* R5's `leafValues["instance.loop.paper-sidebar"]` was literally `[]` — a real, rendering subtree derived as nothing.
- **R6-5 / R6-6** (intake `:139-140`) cured that with a `NATIVE_TEMPLATE_LOOP` family: the leaf became 3 rows and `counts` gained `nativeTemplateLoops: 16`.
- **PathPreview's instance leaf is `[]` for the opposite reason: it is genuinely dead.** R6's cure cannot separate the two — there is no loop here to reclassify. After the cure an empty instance leaf reads as *"accounted for"*, and a dead component launders into the live denominator.

The census already made exactly that error. Four rows describe `PathPreview` as a live component: `lane-frontend.md:183` (inventory, 69 LOC, folded into the 66-SFC count X-5 certifies exact), `:366` (*"3 are glass-ui wrappers, `PathPreview.vue` is bespoke SVG"*), `:369` (*"Bespoke with no glass-ui analogue"*), `:444` (*"genuinely bespoke — **no flag**"*). **I contradict all four**: it is not bespoke-and-live, it is bespoke-and-unrendered, and `:444`'s "no flag" is the wrong verdict — the flag is **delete-or-wire**. X-9 (intake `:160`) already carries to F.W4 that *"the formation must pick and publish one scope law before any per-component census claims a percentage"*; this is the concrete case that law must decide — **does an imported-but-never-rendered SFC count as a member?** Today it silently does.

**Falsifiers.** (a) A `<component :is>`, `defineAsyncComponent`, `resolveComponent` or string-keyed dynamic render would make it live — the repo-wide grep returns 3 hits, none dynamic, foreclosing all four. (b) A render site the grep missed — the grep carried no `--include` filter, so only a non-UTF8 or generated source could hide one; none exists, and probe T1 is filter-independent. (c) A `dist` built from older source could show a false absence — refuted independently by probe T1, which reads the current bytes. (d) If Rollup had merely failed to shake it, the strings would appear in *some* chunk; they appear in none. (e) **The one reading that survives**: if the census's 66-SFC denominator is deliberately *file-count*, not *live-component-count*, then `:183` is defensible and only `:444`'s "no flag" is wrong. I flag that ambiguity rather than assert against it — it is precisely X-9's open question.

### L-2 · BLOCKER · The repository's **only** gate is already RED at HEAD: `npm run build` cannot pass today

`web/package.json:8` — `"build": "vue-tsc -b && vite build"`. That is the entire quality gate for a 66-SFC / 65-TS frontend (`grep -n "eslint\|vitest\|jest" web/package.json` → **0 hits**). And it does not pass:

> **probe T0** — `vue-tsc --noEmit -p tsconfig.json` (the repo's own config, unmodified, no `-b` so nothing is written):
> ```
> src/components/paper/PaperView.vue(12,8): error TS2882: Cannot find module or type
>   declarations for side-effect import of '@mkbabb/latex-paper/theme'.
> exit=2
> ```

One error, exit 2. The mechanism: `@mkbabb/latex-paper@0.2.1`'s exports map resolves `"./theme"` → `"./src/vue/theme.css"` (verified from the installed `package.json`), a **CSS** side-effect import; under `moduleResolution: "bundler"` TypeScript demands a declaration for the subpath and `web/env.d.ts` declares only `*.vue` and `ImportMetaEnv` — no CSS-subpath shim.

This is not PathPreview's defect and I book it as out-of-component. It is BLOCKER-severity **for this axis** for a precise reason: L-1's remediation, L-3's one-key fix, and every other L-row's verification all route through a gate that is currently red, so *nothing* below can be landed-and-verified until it is green. A wave that opens against a red gate cannot distinguish its own regressions from the standing failure.

**Falsifiers.** (a) The dirty `web/package.json` shows an in-flight uplift (glass-ui `^3.1.0`→`^4.0.0`, keyframes `^2.2.0`→`^4.3.0`, vue-router `^4.5`→`^5.1.0`, pencil-boil `latest`→`^0.4.1`) — if the RED is an artifact of a half-finished dependency bump, it is transient. **But `@mkbabb/latex-paper` is `^0.2.1` on *both sides* of that diff** (`git diff -- web/package.json` shows the line unchanged), and `PaperView.vue` *is* dirty — so the import may be new work, not a pre-existing break. That is the honest read: **the break is live, its provenance is the in-flight branch, and it must be cleared before any wave lands.** (b) If CI passes `skipLibCheck`-style suppression or a different tsconfig, the local claim is unaffected but the CI claim is **UNPROVEN-NEEDS-LIVE (SS-13)**. (c) The census records a *different* uplift-driven typecheck break (`ToastVariant` definition-absent, `CENSUS-2026-08-03.md:104`); this is a **second, independent** one — I do not merge them.

### L-3 · MAJOR · Nothing in the repository can detect the dangling import — and the one-key fix surfaces **16 findings across 12 files**

- **No ESLint anywhere.** `find /Users/mkbabb/Programming/fourier-analysis -maxdepth 3 \( -name ".eslintrc*" -o -name "eslint.config*" \)` (excluding `node_modules`) → **0 files**. `grep -n "eslint" web/package.json` → **0 hits**. `vue/no-unused-components` and `no-unused-vars` — the two rules built for exactly this — are not misconfigured, they are absent.
- **`noUnusedLocals` / `noUnusedParameters` are unset.** `web/tsconfig.json` is otherwise a genuinely disciplined config (`strict`, `verbatimModuleSyntax`, `isolatedModules`, `noEmit`, `moduleResolution: "bundler"` — see S-4's rider), but `grep -n "noUnusedLocals\|noUnusedParameters" tsconfig.json` → **0 hits**.
- **No unit-test runner.** See L-13.

The fix is one key in a file the repo already maintains well, and probe T1 measures exactly what it buys:

> **probe T1 (aggregate)** — adding only `"noUnusedLocals": true`: **16 unused-symbol findings** (15 × `TS6133` + 1 × `TS6196`) across **12 distinct files**. Total diagnostics rise 1 → 17; the one non-unused diagnostic is L-2's `TS2882`.
>
> ```
> EquationView.vue(57,7)            'loading'            EquationPanel/graph area
> FrequencyGraph.vue(2,43)          'onUnmounted'        ← an unused *teardown* import
> AppHeader.vue(49,7)               'workspaceStore'
> PaperView.vue(20,1)               'PaperSectionData'
> search/usePaperSearch.ts(10,10)   'SearchEntry'
> BasisSelector.vue(11,7)           'fourierModes'
> ContourEditorCanvas.vue(42,9)     'dragging'           ← an unused *drag-state* ref
> GalleryCard.vue(9,1)              'VIZ_COLORS'
> GalleryCard.vue(10,1)             'PathPreview'        ← L-1
> ImageUpload.vue(2,15)             'computed'
> canvas-drawing/labels.ts(20,18)   'width'
> canvas-drawing/labels.ts(20,25)   'height'
> canvas-drawing/labels.ts(85,18)   'width'
> canvas-drawing/labels.ts(85,25)   'height'
> VisualizationView.vue(2,25)       'watch'
> lib/api.ts(5,5)                   'AnimationSettings'  (TS6196)
> ```

Two of those are worth naming beyond the count, because they are the same *class* of latent defect as L-1 rather than mere lint noise: **`FrequencyGraph.vue:2` imports `onUnmounted` and never calls it** — on one of the three canvases the census describes as *"watch-driven"* (`CENSUS-2026-08-03.md:87`), i.e. an author who reached for teardown and did not wire it; and **`ContourEditorCanvas.vue:42` declares a `dragging` ref that is never read** — dead state on the SVG point editor. Both are leaks/teardown-adjacent and both are invisible today. They are outside this component and I do not adjudicate them here; I record that one config key surfaces them.

**Falsifiers.** (a) A root- or CI-level lint step invoking a globally-installed binary would refute the "nothing catches it" claim — the `find` was rooted at the repository top and `web/package.json` has no lint script and no eslint devDependency, so that is the only hiding place: **UNPROVEN-NEEDS-LIVE (SS-13)** for CI only; the local claims are exact. (b) The prior pass's mechanism falsifier — *"if `<script setup>` bindings are exempted from the check"* — is now **closed by probe T1**: they are not exempted; the check fires on line 10, column 1. (c) If four of the 16 (`labels.ts`'s `width`/`height`) are intentional signature-shape parameters, the honest number is 12 findings / 11 files; `noUnusedParameters` is a separate key and I do not conflate them.

### L-4 · MAJOR · `pathX` and `pathY` are two independent props, so the length invariant is inexpressible — and it fails **asymmetrically**, one direction loudly wrong, the other silently wrong

```
PathPreview.vue:6-7    pathX: number[];
                       pathY: number[];
PathPreview.vue:23     if (!pathX.length || !pathY.length) return "";
PathPreview.vue:37-41  const pts = pathX.map((x, i) => { … const sy = 0.5 - (pathY[i] - cy) * scale; … });
```

The guard at `:23` checks that **both are non-empty**. It never checks that they are the **same length**. The map at `:37` is driven by `pathX` alone, while the bounds at `:25-28` are computed over *both arrays in full*. That asymmetry produces two distinct failures:

> **probe C1** — `pathX` longer (`[0,1,2]` / `[0,1]`) → `M0.0833,0.7083L0.5000,0.2917L0.9167,`**`NaN`**`Z`
> **probe C1b** — `pathY` longer (`[0,1]` / `[0,1,2]`) → `M0.2917,0.9167L0.7083,0.5000Z`

**Probe C1** splices the literal string `NaN` into the `d` attribute. Per the SVG path-data error-handling rule a user agent renders up to but not including the erroneous command, so the thumbnail silently loses its tail *and* its closing segment — no console error, no exception, and `svgPath` stays truthy so the `v-if` at `:60` does not trip.

**Probe C1b is the row's real teeth, and it is new.** With the extra data in `pathY`, there is **no `NaN` at all**: the output is a syntactically perfect path. But the bounds were taken over three Y values while only two points were emitted, so the shape is *both* truncated *and* mis-framed — rendered at the wrong scale, off-centre, and completely indistinguishable from a correct thumbnail. There is no detectable signal anywhere in the pipeline.

**The `:23` guard is therefore worse than no guard: it catches the harmless case and licenses both harmful ones.** The component's entire error posture is "render something wrong."

**The tree's own convention is the fix, and PathPreview is the sole deviant.** Every other path surface travels the pair as one object:

- `lib/types.ts:26` — `path: { x: number[]; y: number[] }` on `EpicycleData`; `:15` `original: { x: number[]; y: number[] }`; `:17` `partial_sums: Record<string, Record<number, { x: number[]; y: number[] }>>`.
- `lib/svg-fourier.ts:16,22,38` — `FourierPathData.original`, `.partial_sums`, and `xyToPoints(xy: { x: number[]; y: number[] })`.
- `ContourPreview.vue:7` — `points: Point2D[] | undefined` (pairing is structural).
- `ghost-path.ts:10-11` does take them split — but it is an internal `lib/` function with exactly two callsites, `BasisCanvas.vue:131` (`data.path.x, data.path.y`) and `:220` (`origX, origY`), where both arguments are destructured from a *single* object at the callsite and cannot desynchronise.

`PathPreview` is the one place where a caller must hold the invariant in their head — and it sits in the shared kit, advertising general reuse (L-12).

**Falsifiers.** (a) If a producer guaranteed equal lengths this would be defensive-only. There is no producer at all (L-1), so nothing constrains the contract, and the props are `number[]`: the type system permits mismatch **by construction**. (b) If the intended posture were "garbage in, garbage out", `:23`'s existence contradicts it — the component *does* attempt validation and validates the wrong predicate. (c) Whether a UA truncates or blanks a `NaN`-bearing `d` changes probe C1's visual magnitude but not the corruption, and is **UNPROVEN-NEEDS-LIVE (SS-13)**; **probe C1b needs no such caveat** — its output is valid SVG and its wrongness is arithmetic, provable on paper.

### L-5 · MAJOR · It reimplements the serializer **twice over** — once against `lib/svg-fourier.ts`, once against an already-installed `pencil-boil` export — and hardcodes `Z`, so it structurally cannot render the open-path case the canvas models as first-class

Three implementations of "points → `d`" exist in reach of this file. PathPreview is the fourth and the weakest.

**(i) The repo's own converter.** `lib/svg-fourier.ts:47-73`:

```
svg-fourier.ts:47-52   export function pointsToSvgPath(points, closed: boolean = true): string {
                           if (points.length < 2) return "";
                           if (!closed) return catmullRomToBezier(points);
svg-fourier.ts:72          return d + " Z";
```

**(ii) — and this is new — `pencil-boil` already exports the exact polyline serializer PathPreview hand-rolls**, and the repo already imports from that package:

```
node_modules/@mkbabb/pencil-boil/src/path.ts:56-63
    export function pointsToLinear(points: [number, number][]): string {
      if (points.length < 2) return '';
      let d = `M${points[0][0]},${points[0][1]}`;
      for (let i = 1; i < points.length; i++) d += ` L${points[i][0]},${points[i][1]}`;
      return d;
    }
```

`pointsToLinear` is re-exported from the package index (`src/index.ts:3-14`), `@mkbabb/pencil-boil` is a declared dependency (`web/package.json`, `^0.4.1`), and it is already imported at **three** sites — `svg-fourier.ts:11` (`catmullRomToBezier`), `morph/FourierShapeExtractor.vue:144`, `decorative/SvgFilters.vue:3`. `PathPreview.vue:43` is `M` + `L`-joined points; `pointsToLinear` is `M` + `L`-joined points **with the `< 2` guard PathPreview lacks**. The duplication is not merely of a repo-local helper but of a **shipped, installed, already-consumed library function** — which is the strongest form this axis recognises.

**(iii) The canvas.** `ghost-path.ts:7-13` — `drawGhostPath(surface, view, pathX, pathY, closePath = false)` with the doc comment `@param closePath Whether to close the path (epicycle mode closes it)`.

Against these, `PathPreview.vue:43` — `` return `M${pts.join("L")}Z`; `` — is strictly weaker on three counts:

1. **`closed` is hardcoded, and open is the *default* case.** `ghost-path.ts:12` defaults `closePath = false`, and **both branches are live**: `BasisCanvas.vue:131` passes `true` (epicycle mode), `BasisCanvas.vue:220` omits it (open — the `fourier-series` original-path ghost). `pointsToSvgPath` takes `closed` as a parameter for the same reason. PathPreview appends `Z` unconditionally, drawing a spurious chord from last point to first for every open path, and **exposes no prop by which a caller could ask otherwise**. It structurally cannot preview a `fourier-series` path correctly.
2. **The `< 2` guard is missing.** Both `svg-fourier.ts:51` and `pencil-boil`'s `path.ts:57` refuse degenerate input with the identical `if (… < 2) return ''`. PathPreview accepts a single point and emits `M0.5000,0.5000Z` (L-15).
3. **Polyline vs. smoothing — the weakest of the three claims.** `pointsToSvgPath` emits Catmull-Rom cubics with modular wrap at the seam (`:55-70`); `ContourPreview.vue:13` calls `closedSplinePath`. PathPreview emits raw `L` segments. At a 64 px thumb with `n_points = 1024` that is arguably the *right* trade (see S-3) — but it is an undocumented divergence from two siblings, not a decision the file records, and `pointsToLinear` exists precisely to make that trade *explicitly*.

`xyToPoints` (`svg-fourier.ts:38-44`) even performs exactly the `{x[],y[]}` → point-array zip that `:37-41` inlines. `pointsToSvgPath(xyToPoints(path), closed)` — or `pointsToLinear(xyToPoints(path))` — is already exported, already used, and would have deleted this computed.

**Falsifiers.** (a) If PathPreview deliberately wants a cheap polyline rather than beziers, reusing `pointsToSvgPath` is wrong and only claims (1) and (3-as-documentation) survive — a real defence, **which is exactly why `pointsToLinear`'s existence matters**: it grants the cheap polyline *and* the guard *and* the reuse, so the defence does not reach it. (b) Claim (1) is not defensible: the `closed` axis is modelled explicitly in two independent places in this tree and omitted here; the "every thumbnail path is closed by construction" defence fails on `ghost-path.ts:12`'s default. (c) `pointsToLinear` emits `M…, L…` with a space and no `Z`, so adoption is not literally byte-identical output — a caller would append `Z` conditionally. That is a two-line difference, not a reason to fork. (d) `CENSUS-2026-08-03.md:105` books a `pencil-boil 0.4.1→^0.11.2` uplift; if `pointsToLinear` were removed at 0.11.2 this row weakens — I verified it present at the **installed** 0.4.1 only, so its survival across the uplift is **UNPROVEN-NEEDS-LIVE (SS-13)**.

### L-6 · MAJOR · The fit-to-box transform is a second copy of `getPathBounds`, with a divergent margin constant — the intra-repo convergence the census's cross-repo one presupposes

```
transforms.ts:10-38                  PathPreview.vue:25-39
  minX/maxX/minY/maxY  (:15-18)        minX/maxX/minY/maxY  (:25-28)     identical
  rangeX = maxX-minX || 1  (:19-20)    rangeX = maxX-minX || 1  (:29-30) identical, incl. the `|| 1` (L-7)
  const margin = 0.15;     (:21)       padding default 0.1      (:17)    DIVERGENT
  scale = Math.min(w/…, h/…) (:22-25)  scale = 1/(Math.max(…)·…) (:33)   equivalent for a square box (S-1)
  cx,cy = midpoints        (:26-27)    cx,cy = midpoints        (:34-35) identical
  toScreen: h/2 - (y-cy)*s (:36)       sy = 0.5 - (pathY[i]-cy)*s (:39)  identical, incl. the Y-flip
```

`getPathBounds` is exported (`transforms.ts:10`), re-exported through `canvas-drawing/index.ts:2`, and is the single fit law for the entire Canvas2D render path the census sizes at *"1 311 LOC"* (`CENSUS-2026-08-03.md:96`) across *"three independent canvases"* (`:86`). PathPreview neither imports nor generalises it; it retypes it against a normalized `[0,1]` output space instead of a pixel `CanvasSurface`. The right shape is obvious and absent: `getPathBounds` should take an output extent (`{width, height}`) rather than a `CanvasSurface` — `surface` is read only for `.width`/`.height` (`transforms.ts:22-29`) — and the SVG thumb should pass `{width: 1, height: 1}`.

**The margins then disagree by 50 %.** The canvas frames every path at `0.15` (`transforms.ts:21`), the SVG thumb at `0.1` (`:17`), and `ContourPreview.vue:26` at a third `0.1` that is X-derived and viewBox-additive — a different *quantity* wearing the same literal (L-8). Three preview surfaces of the same contour, three framings.

**This is the LIBRARY-axis face of the census's highest-value convergence row.** `CENSUS-2026-08-03.md:96-99` books `BasisCanvas` + `canvas-drawing/` against glass-ui's **GPU-backed `FourierField`** as the *"highest-value, highest-risk"* cross-repo convergence, sharing the `BasisComponent` type. Before fourier can converge its fit law with a producer, it has an **intra-repo** convergence it has not done: two copies of the same law, 24 lines apart in behaviour and 50 % apart in constant. Note also that `CENSUS-2026-08-03.md:85-86` certifies **WebGL/WebGPU ABSENT** in fourier — so PathPreview touches no GPU path at all; its sole relation to the viz render architecture is this duplicated Canvas2D transform, and its sole relation to `FourierField` is that the duplication must be resolved before the shared substrate can be identified.

**Falsifiers.** (a) If a 64 px thumb genuinely wants a tighter crop than an interactive stage, the *constants* should diverge while the *function* is shared; a divergent constant is not a defence for a divergent implementation. (b) If `getPathBounds`'s `CanvasSurface` dependency were irreducible, extraction would be costly — it is not (`:22-29` read only two numbers). (c) The scale formulae **are** numerically identical here (S-1, probe C6), so this row is duplication, **not** behavioural divergence: I explicitly do **not** claim the thumbnail is mis-scaled relative to the canvas at equal margins.

### L-7 · MINOR · `|| 1` injects a **synthetic unit range** that then wins the `Math.max`, silently halving a degenerate-axis path

```
PathPreview.vue:29-30   const rangeX = maxX - minX || 1;
                        const rangeY = maxY - minY || 1;
PathPreview.vue:33      const scale = 1 / (Math.max(rangeX, rangeY) * (1 + padding * 2));
```

The `|| 1` is a divide-by-zero guard, but the substituted value is not neutral: it enters the `Math.max` as a *competitor*. For an axis-degenerate path whose other range is below 1, the phantom `1` dominates and the shape renders at a fraction of its intended size.

> **probe D1** (`pathX=[2,2,2]`, `pathY=[0,0.25,0.5]`) → `scale 0.8333`, `y ∈ [0.2917, 0.7083]` — span **0.4167**.
> Correct fit for `rangeY = 0.5`: `scale 1.6667`, `y ∈ [0.0833, 0.9167]` — span **0.8333**. A **50 % under-scale**.
> **probe D1b** (same shape, `rangeY = 500`) → `y ∈ [0.0833, 0.9167]` — correct; the fallback is inert once the real range exceeds 1.
> **probe D2** (mirror case, `rangeX = 0.5`, degenerate Y) → `x ∈ [0.2917, 0.7083]` — the same defect on the other axis.

A neutral guard costs nothing: fall back to the *other* axis's range, or apply `|| 1` once, after the `Math.max`.

**Falsifiers — and the first is strong.** (a) Contour coordinates are OpenCV pixel space: `api/routers/images.py:253-258` builds `np.array(c["x"]) + 1j*np.array(c["y"])`, resamples, and emits `path.real.tolist()` / `path.imag.tolist()`; real ranges are hundreds of pixels, so probe D1 requires a perfectly axis-degenerate path whose other extent is under **one pixel** — effectively unreachable for real data. Hence MINOR. (b) `NaN` is also falsy, so `maxX - minX === NaN` takes the same branch and is silently swallowed (L-16) — *that* path is reachable and is the row's real teeth. (c) `transforms.ts:19-20` carries the identical `|| 1`, so this is a **tree-wide class**, not a PathPreview invention; its `Math.min(w/…, h/…)` composition manifests it differently and is out of scope here.

### L-8 · MINOR · `padding` under-delivers its own name by 17 %, and the tree's other `0.1` means something else

`scale = 1 / (range · (1 + padding·2))` (`:33`) makes `padding` a fraction of the **content**, not of the **box**. The rendered margin is therefore always smaller than the number suggests:

> **probe D4** — `padding=0` → content span 1.0000, pad 0.0000 · `0.05` → 0.9091 / 0.0455 · **`0.1` → 0.8333 / 0.0833** · `0.25` → 0.6667 / 0.1667.

A caller reading `padding: 0.1` (`:17`) against `viewBox="0 0 1 1"` (`:52`) reasonably expects 10 % of the box; they get **8.33 %**. The comment at `:32` — `// Fit into [0, 1] with uniform scale + padding` — names the output space `[0,1]`, which actively encourages the box reading, and does not state the convention. There is no prop doc comment anywhere in `:4-19` — contrast `FourierMorphSvg.vue:22`, which *does* document its one non-obvious prop (`/** Pre-computed SVG path 'd' string (from useFourierMorph). */`), and `ghost-path.ts:6`, which documents `closePath`. The house style is to document the non-obvious prop; this file does not.

The divergence is live in the corpus: `ContourPreview.vue:26` also spells `0.1`, but composes it into a *viewBox* (`:28`) where the pad is applied **additively and exactly**, and derives it from the X extent only (`(maxX - minX) * 0.1`) so a tall thin contour gets a proportionally smaller Y pad. Two components, one literal, two different quantities — neither named for what it is.

**Falsifiers.** (a) If `padding` were documented anywhere as content-relative this row is FALSE — `grep` over the file finds no doc comment, and there are neither consumers (L-1) nor tests (L-13) to encode intent. (b) If the convention is deemed self-evident from the formula, the row degrades to a naming complaint (`inset`, `marginRatio`) — which is why it is MINOR. The arithmetic itself is exact and not falsifiable.

### L-9 · MINOR · Two unvalidated numeric domains, on two different lines, each producing a non-finite value in a rendered attribute

`withDefaults` (`:13-18`) supplies defaults but cannot constrain a range, and there is no clamp anywhere.

**(a) `padding: number` (`:11`) — reachable at `:33`.**

> **probe C3** (`padding = -0.5`) → `M-Infinity,InfinityLInfinity,-InfinityZ`
> **probe C3b** (`padding = -1`) → `M1.0000,0.0000L0.0000,1.0000Z` — the sign flips and the shape **mirrors**, silently and validly.

At `padding = -0.5` the factor `(1 + padding·2)` is `0`, so `scale` is `Infinity` and `Infinity.toFixed(4)` is the string `"Infinity"`. Below `-0.5` the path renders mirrored with no diagnostic at all — probe C3b is the more insidious of the two.

**(b) `size: number` (`:8`) — reachable at `:56`, a site the prior pass did not reach.**

```
PathPreview.vue:56   :stroke-width="strokeWidth / size"
```

> **probe C10** — `strokeWidth / size` at `size = 0` → `Infinity`; `String(Infinity)` → `"Infinity"`, i.e. the DOM receives `stroke-width="Infinity"`.

`size` is bound three times (`:50` `width`, `:51` `height`, `:56` the stroke divisor) and validated zero times. `size = 0` yields a `0×0` viewport *and* an invalid `stroke-width`; a negative `size` yields negative `width`/`height` presentation attributes, which are in error per SVG.

Contrast the *Python* side of the same product, which does bound its numeric inputs: `api/models/visualization.py:76` — `n_harmonics: int = Field(default=1, ge=1, le=4096)`, repeated at `:126,187,281`.

**Falsifiers.** (a) Unreachable today — no consumer exists (L-1), so no caller can pass either value. This is contract-hardening against the day it is wired, which is why it is MINOR. (b) If the house posture is "public props on a `ui/` component must validate their domain", this is L-4's severity; if it is "internal components trust their callers", it drops to INFO — and `ui/` placement (L-12) argues for the former. (c) `size = 0` is arguably nonsense input no one would write; `size` bound to a container measurement that is `0` before first layout is not, and is the ordinary way this becomes reachable — that path is **UNPROVEN-NEEDS-LIVE (SS-13)**.

### L-10 · MINOR · Stroke width is hand-coupled to the `size` **prop**, where the sibling uses `vector-effect` — correct only while CSS never touches the element

`:stroke-width="strokeWidth / size"` (`:56`) is a correct compensation for the `viewBox="0 0 1 1"` unit space (S-2) — but only while the element's **rendered** pixel size equals the `size` **prop**. `:width`/`:height` (`:50-51`) are *presentation attributes*, the weakest source in the cascade: any CSS `width` rule beats them. The scoped style defends almost nothing:

```
PathPreview.vue:65-68   .path-preview { display: block; flex-shrink: 0; }
```

`flex-shrink: 0` guards the flex-container case only. It does not guard `width: 100%` from a parent, a container query, a `:deep()` override, a grid `minmax()`, or a `max-width` reset. Under any of those the SVG scales while `strokeWidth / size` does not, and the stroke thickens or thins proportionally.

The sibling solves this declaratively and structurally: `ContourPreview.vue:47` — `vector-effect="non-scaling-stroke"` — pinning the stroke to device pixels regardless of viewport, viewBox, or CSS. `FourierMorphSvg.vue` sidesteps it a third way, with a pixel-space viewBox (`:29`, `"0 0 200 200"`) so `strokeWidth` is already in user units. `EasingCurvePreview.vue:19,29` a fourth, with a hardcoded magic viewBox (`"-0.05 -0.3 1.1 1.6"`) and a hardcoded `stroke-width="0.15"`. Four SVG surfaces, four stroke conventions, and PathPreview's is the only one a stylesheet it does not own can break.

**Falsifiers — the coupling holds today.** (a) `find web/src -name "*.css"` → **1 result** (`src/style.css`), and it contains no global `svg` rule and no `max-width: 100%` reset (`grep` → 0 hits). So this is fragility, not breakage — hence MINOR. (b) If `size` is intended as the *sole* sizing API and CSS sizing is forbidden by convention, the design is coherent — but nothing states that, and a shared-kit component cannot enforce it. (c) Rendered-vs-attribute divergence under a real stylesheet is **UNPROVEN-NEEDS-LIVE (SS-13)**.

### L-11 · MINOR · Four spread calls over an unbounded array; the engine wall is real and `n_points` carries no server-side bound

```
PathPreview.vue:25-28   Math.min(...pathX)  Math.max(...pathX)  Math.min(...pathY)  Math.max(...pathY)
```

Spreading an array into an argument list is bounded by the engine's *stack*, not by memory.

> **probe C5**, host runtime: `n=1024` OK · `n=65536` OK · **`n=125000` → `RangeError: Maximum call stack size exceeded`**

The ceiling is engine-specific, and JavaScriptCore's has historically been far lower than V8's — which matters here, because `web/e2e/` targets a Safari-class browser, and this project's sibling constellation has already been bitten by exactly this class of iOS-Safari stack limit. The relevant bound:

- `web/src/lib/defaults.ts:8` — `n_points: 1024`; `api/models/shared.py` and `api/models/computation.py` — `n_points: int = 1024`; `lib/types.ts:34` — `n_points: number` (unbounded by construction).
- **None of them carries a bound.** `n_points: int = 1024` has no `Field(le=…)`, while the neighbouring `n_harmonics` is bounded at four separate sites (`api/models/visualization.py:76,126,187,281`, `ge=1, le=4096`). **The asymmetry is the finding**: the knob that sets an *array length* is the unbounded one.
- `api/routers/images.py:257` — `path = resample_arc_length(path, cs.n_points)` — forces the array to exactly `n_points`, so `n_points` **is** the array length.

The idiomatic fix is one loop — and `ContourPreview.vue:19-25` **already writes it**: an explicit `for (const p of pts)` accumulating four extrema, allocation-free and unbounded-safe. The tree contains the correct pattern, 40 lines away, in the component that does the same job.

**Falsifiers.** (a) The default is ~122× under the measured ceiling and no consumer exists (L-1), so the wall is reachable only via a client requesting a large `n_points` against an unbounded endpoint — MINOR on that basis. (b) `transforms.ts:15-18` carries the identical four-spread on the *live* canvas path, so if this is a defect it is tree-wide and PathPreview is not its author; I book it here because the axis asks, and flag the shared class. (c) The exact JSC ceiling is **UNPROVEN-NEEDS-LIVE (SS-13)**; only the host-runtime figure is measured.

### L-12 · MINOR · Colocation — a zero-consumer component sitting in the shared kit, advertising a reuse it has never had

`src/components/ui/` has exactly **5 files** (`find src/components/ui -type f` → 5, matching `lane-frontend.md:366` exactly): `CollapsibleSection.vue` (72), `PathPreview.vue` (69), `SliderControl.vue` (150), `tooltip/Tooltip.vue` (38), `tooltip/index.ts` (1). The census reads three of them as glass-ui adapters — `lane-frontend.md:368` lists `CollapsibleSection` → `Collapsible`, `SliderControl` → `Slider variant="standard"`, `tooltip/Tooltip` → `Tooltip*`, and `:371` rules them *"thin API-shape adapters, not shadows … the correct posture — keep."* PathPreview is the one bespoke member (`:444`).

`ui/` is the tree's **shared kit**, and fourier's own audit corpus says so in those words: `docs/audits/runs/2026-05-27-D-audit/DA6-guard-thread-scoping.md:77` names *"the shared UI kit (`ui/{CollapsibleSection,PathPreview,SliderControl}.vue` + `ui/tooltip/`)"* among **cross-cutting surfaces every design agent must account for**. Placement in `ui/` is a claim of general reuse. PathPreview has had **zero** consumers for the whole life of the file (mtime `Mar 9 16:01`, the oldest in the directory by more than two months). Every component that actually renders a path lives elsewhere: `visualization/` (`ContourPreview`, `ContourEditorCanvas`, `EasingCurvePreview`), `decorative/` (`FourierMorphSvg`), `morph/` (`MorphShapePreview`).

**On Goldilocks specifically: the module size is right and I do not fault it.** 69 lines, one export, one computed, one template, one two-property style block. The defect is not *size* but *placement* plus *density of borrowed jobs*: the 24-line computed at `:21-44` inlines three separable library concerns — bounds (L-6), fit (L-6), serialize (L-5) — each of which already exists as a named function elsewhere. Extracting them would leave a ~25-line presentational SFC, which is the right shape for `ui/`.

**Falsifiers.** (a) If `ui/` means "presentation-only, dependency-free" rather than "shared", PathPreview qualifies on the letter — it is the only member importing nothing but `vue`. That reading is available and is why this is MINOR. (b) One cross-directory consumer would make the placement right; there are none.

### L-13 · MINOR · Zero test coverage, and the repository has nowhere to put a test

The `svgPath` computed (`:21-44`) is a **pure function from two arrays and a scalar to a string** — the single most unit-testable artefact in the frontend. It has no test, and cannot get one:

- `grep -n "vitest\|jest" web/package.json` → **0 hits**. There is **no unit-test runner at all**; `scripts` is `dev / build / preview / test:e2e / test:e2e:ui` (`package.json:6-12`).
- The only suite is Playwright: `web/e2e/` = 8 specs (`contour-extraction`, `gallery`, `paper-performance`, `settings-persistence`, `visual-baseline`, `visualization-crud`, `visualization-ux`, `workspace-flow`). `grep -rln "PathPreview\|gallery-card" web/e2e/` → **0 files**. Neither the component nor its host card is named by any spec.

Every one of probes C1, C1b, C3, C3b, C4, C8, C9, C10, D1, D2 and D4 above is a two-line assertion that would have caught L-4, L-7, L-8, L-9, L-15 or L-16 at authoring time. Probe C1b in particular — a *silently valid* wrong answer — is catchable by nothing except a unit test.

**Falsifiers.** (a) A dead component (L-1) arguably deserves no test; deleting it is the better fix, and that ordering is why this is MINOR rather than MAJOR. (b) The *absence of a runner* is a whole-frontend gap that outlives this file: 65 `.ts` modules (X-5, re-verified live this session) including `lib/svg-fourier.ts`, `lib/contourEditing.ts`, `lib/easings.ts`, `lib/evaluators.ts` — all pure, all with nothing to be tested under. (c) If `visual-baseline.spec.ts` screenshots the gallery it would cover the *card*; it still could not cover this component, which never renders.

### L-14 · MINOR · **The R5-7 class applies to this component's host, not to the component** — and R6's cure will now count a deliberately-duplicated, `aria-hidden` phantom track as live instances

The axis asks where the R5-7 template-loop invisibility class applies. In PathPreview itself it does not — the component contains no `v-for` and, per L-1, no instances at all. It applies **one level up**, at the only place PathPreview could ever acquire an instance count, and the shape there is a clean instance of both R5-7 *and* a defect R6's cure does not address.

`GalleryCard` — PathPreview's sole importer — has **four render callsites in three files**, and they split across the exact seam R5-7 names:

| callsite | loop | family under a component-callsite-keyed deriver |
|---|---|---|
| `GalleryInfiniteGrid.vue:30-31` | `<GalleryCard v-for="entry in entries">` | **visible** — the `v-for` is *on the component* |
| `GalleryFeaturedCarousel.vue:27-32` | `<div v-for="entry in entries" class="featured-card-wrapper">` wrapping `<GalleryCard>` | **invisible** — native element loop (R5-7) |
| `GalleryMarquee.vue:35-40` | `<div v-for="entry in track" class="marquee-item">` wrapping `<GalleryCard>` | **invisible** — native element loop (R5-7) |
| `GalleryMarquee.vue:51-57` | `<div v-for="entry in track" :key="'dup-' + entry.slug" aria-hidden="true">` wrapping `<GalleryCard>` | **invisible — and a phantom** |

Three of four are native-element loops, so **exactly R5-7's failure**: *"template-loop evidence keyed to component callsites is blind to native HTML element loops"* (intake `:125`). And `GalleryMarquee.vue:28-33` adds a *third*, outer native loop (`v-for="(track, tIdx) in tracks"` over the two tracks built at `:20-22`), so the marquee's card instance count is a product of three nested native loops — structurally the same shape as `PaperSidebar.vue`'s three nested native `<li v-for>` at lines 65/87/105 that R6-5 (`:139`) authenticated.

**The new finding is the fourth row.** `GalleryMarquee.vue:51-57` is a *deliberate duplicate* — the comment at `:50` reads `<!-- Duplicate for seamless loop -->` — of every card in the track, marked `aria-hidden="true"`. Its cards are real Vue component instances with real DOM, and they are **not** real UI: they exist solely so the CSS marquee can wrap without a seam. R6's `NATIVE_TEMPLATE_LOOP` family (R6-5/R6-6, intake `:139-140`) now *sees* this loop, where R5 did not. Seeing it is the cure working. But seeing it means **counting it**, and nothing in the family distinguishes a presentational duplicate from a real instance. R6's cure therefore trades one systematic error (undercount by native-loop blindness) for another (overcount by phantom inclusion) at this exact site, and `counts.nativeTemplateLoops: 16` is the aggregate in which the trade is invisible.

Combined with L-1, an instance derivation over this subtree is **three-way ambiguous** and the empty-leaf signal cannot resolve it:

- `instance.*.path-preview` = `[]` because the component is **genuinely dead** (L-1);
- `instance.loop.gallery-*` was `[]` pre-R6 because the loops are **native** (R5-7);
- `instance.loop.gallery-marquee-dup` is non-empty post-R6 but its rows are **phantoms**.

Three distinct facts, one indistinguishable `[]`-or-populated signal. X-9 (intake `:160`) carries to F.W4 that *"the formation must pick and publish one scope law"* and labels the mounted-instance denominator OPEN; this subtree is the smallest complete counter-example that law has to survive.

**Falsifiers.** (a) If the published law counts *component instances* rather than *user-visible instances*, the marquee duplicate is correctly counted and only the phantom **label** is missing, not the count — a defensible reading, and why this is MINOR rather than MAJOR. (b) `GalleryMarquee.vue:27` gates the whole block on `v-if="entries.length >= 4"`, so the duplicate track is conditional; a derivation that models the `v-if` would already mark these rows conditional — I could not verify that from the tree (the R6 registries are Codex-era artefacts outside this repo), so it is **UNPROVEN-NEEDS-LIVE (SS-13)**. (c) The claim that these are the *only* four callsites rests on `grep -rn "GalleryCard" web/src` → the four above plus imports plus two prose mentions in `GalleryCardModal.vue` comments; `GalleryCardModal` is a different component and is not a fifth callsite.

### L-15 · INFO · Degenerate one- and two-point paths emit a rendered `M…Z`, where every library alternative refuses them

> **probe C4** (`pathX=[5]`, `pathY=[5]`) → `M0.5000,0.5000Z`
> **probe C4b** (`pathX=[5,5]`, `pathY=[5,5]`) → `M0.5000,0.5000L0.5000,0.5000Z`

`svgPath` is non-empty in both cases, so the `v-if` at `:60` passes and a zero-length subpath renders. With `stroke-linecap="round"` (`:58`), SVG renders a zero-length subpath as a **dot**, not as nothing. Both library alternatives decline the case outright with the identical guard — `svg-fourier.ts:51` (`if (points.length < 2) return ""`) and `pencil-boil` `path.ts:57` (`if (points.length < 2) return ''`).

**Falsifiers.** (a) A dot may be the *desired* rendering for a one-point contour, making this correct-by-accident rather than defective — the file records no intent either way, which is why it is INFO. (b) The linecap-dot behaviour is specified but its rendering is **UNPROVEN-NEEDS-LIVE (SS-13)**. (c) `n_points`-resampled contours are never 1- or 2-point (`api/routers/images.py:257`), so this is unreachable from the real producer.

### L-16 · INFO · `NaN` and `±Infinity` propagate silently, and are swallowed twice

> **probe C8** (`pathX=[0,NaN,2]`) → `MNaN,0.9167LNaN,0.5000LNaN,0.0833Z`
> **probe C9** (`pathX=[0,Infinity]`) → `MNaN,0.5000LNaN,0.5000Z`

Two independent swallows. `Math.min(...)` over an array containing `NaN` returns `NaN`, so `maxX - minX` is `NaN` — which is **falsy** and is silently replaced by `1` at `:29` (L-7's second falsifier), so the range guard *hides* the corruption; then `cx` is `NaN` and poisons **every** x coordinate, not merely the offending index. Probe C9 shows the same terminal state from a different entry: `Infinity - (-Infinity)` overflow paths and `Infinity * 0` both land on `NaN`. In both cases the result is a non-empty `d` string that passes the `:60` guard and renders as nothing or as a fragment.

Combined with L-4, the component's complete error posture is: **no validation, no throw, no warn, no fallback — every malformed input becomes a silently wrong picture.** For a *thumbnail* that is the worst available posture, because a wrong thumbnail at 64 px is visually indistinguishable from a correct one.

**Falsifiers.** (a) `NaN` in a contour is an upstream defect and arguably should not be defended against here — hence INFO. (b) But the component *already spends a guard* at `:23`; spending it on the wrong predicate is the criticism, and it is the same criticism as L-4.

### L-17 · INFO · `fill` is hardcoded `"none"` while `Z` is hardcoded present — the closing chord can never do the one job closing a path is for

`:54` — `fill="none"`, not a prop. `:43` — `Z`, not a prop (L-5). The two hardcodes are in tension: `Z` closes the subpath, and the principal reason to close a subpath is so it can be **filled**; with `fill="none"` the `Z` contributes exactly one thing — a visible straight chord from the last point back to the first — which for an open path (`ghost-path.ts:12`'s default case) is pure artefact. A caller who wants the natural 64 px thumbnail idiom — a filled silhouette — has no prop to ask for it, and a caller who wants an open stroke has no prop to suppress the chord. The component exposes `strokeWidth`, `strokeColor` and `padding`, and withholds the two that would make the closed/filled decision expressible.

**Falsifiers.** (a) If stroked-outline-only is a deliberate house idiom, `fill="none"` is right — and it *is* what all three siblings do (`ContourPreview.vue:44`, `FourierMorphSvg.vue:10`, `EasingCurvePreview`), so this is consistent with the tree and therefore INFO, not MINOR. (b) The row is really a restatement of L-5's claim (1) from the fill side; I do not double-count it in severity.

---

## 2 — Superlatives *(L-18 runs both ways; each carries its falsifier)*

### S-1 · The uniform-scale formula is genuinely correct, and **provably, exactly** equivalent to the canvas's

`1 / (max(rx,ry) · (1+2p))` (`:33`) looks like a different law from `getPathBounds`'s `min(w/(rx·(1+2m)), h/(ry·(1+2m)))` (`transforms.ts:22-25`). For a **square** output box they are the same IEEE double.

> **probe C6** (`rx=3`, `ry=7`, `pad=0.1`, box 1×1) → PathPreview `0.11904761904761904`, `getPathBounds` `0.11904761904761904`, `===` **true**. Also `===` true at `(7,3)` and `(5,5)`.
> **probe C6b** (the divergence, for honesty) — at box `2×1` with `rx=3, ry=1`: PathPreview `0.277778`, `getPathBounds` `0.555556`, `===` **false**.

The Y-flip is likewise exact: `sy = 0.5 - (pathY[i] - cy) * scale` (`:39`) is `toScreen`'s `h/2 - (y - cy) * scale` (`transforms.ts:36`) at `h = 1`. Aspect ratio is preserved, the shape is centred, and the composition with `preserveAspectRatio="xMidYMid meet"` (`:53`) is redundant-but-harmless rather than conflicting. **This is precisely why L-6 is booked as duplication and not as divergence** — the author reproduced a 29-line library function's numerical law correctly, from scratch, including the sign convention.

**Falsifier — and it is satisfied.** Probe C6b shows the equivalence fails for a non-square box. But a caller can only reach that regime with `width ≠ height`, and `:50-51` bind **both** dimensions to the single `size` prop. The component structurally cannot enter the regime where its formula breaks. The constraint is real, it is enforced by the API shape, and the author appears to have understood it.

### S-2 · `viewBox="0 0 1 1"` + a normalized path is the right idiom, and it is executed cleanly

Normalizing geometry into a unit box (`:52`) makes the SVG's content **resolution-independent**: the `d` data is identical at 16 px and 512 px, the DOM is one `<path>` element, and there is no re-derivation on resize — the computed's dependency set is `{pathX, pathY, padding}` and pointedly excludes `size`. Compare the alternatives in the same tree: `ContourPreview.vue:16-29` recomputes a *data-space* viewBox on every input mutation (28 lines and a string template, re-run per change); `EasingCurvePreview.vue:19` hardcodes `viewBox="-0.05 -0.3 1.1 1.6"` — a magic rectangle with no derivation at all; `FourierMorphSvg.vue:29` takes the viewBox as a prop and defaults it to a magic `"0 0 200 200"`. PathPreview's is the cleanest of the four, and `size` leaks into the geometry at exactly **one** point (`:56`) — which is what makes L-10 a single identifiable seam rather than a diffuse coupling.

**Falsifier.** The idiom's cost *is* that stroke compensation (L-10); a pixel-space viewBox avoids it at the price of resolution-dependence. Which trade is better is genuinely arguable, so this superlative is about *execution*, not about the choice.

### S-3 · `.toFixed(4)` is rounding discipline the rest of the tree lacks — measured at **2.75×**, and provably safe

`:40` — `` `${sx.toFixed(4)},${sy.toFixed(4)}` `` — quantizes to 1e-4 in a unit viewBox, i.e. **0.0064 px** at the default `size = 64`: invisible. It is also the only such discipline anywhere in the repository.

> **probe C11** — a 1024-point circular contour: `d` with `.toFixed(4)` = **14 337 chars**; the same path serialized by the tree's prevailing idiom (raw double interpolation) = **39 379 chars**. A **2.75× / 25 KB** reduction per path.

The prevailing idiom is what the tree actually does: `svg-fourier.ts:56,69` emits raw template-interpolated doubles (`` `M${points[0][0]},${points[0][1]}` ``, `` ` C${cp1x},${cp1y} …` ``) with no rounding; `pencil-boil`'s `pointsToLinear` (`path.ts:58-60`) likewise; `lib/contourEditing.ts`'s `closedSplinePath` likewise. **PathPreview is the only path producer in the repository that rounds** — and the one whose output would matter least, since it is the only one that never renders.

A second, unremarked property makes the discipline safe rather than merely thrifty: **the output is algebraically bounded**, so `toFixed` can never emit exponential notation (which would be invalid path data). Since `|x - cx| ≤ rangeX/2` and `scale ≤ 1/(rangeX·(1+2p))`, every coordinate lies in `0.5 ± 0.5/(1+2p)` — for the default, `[0.0833, 0.9167]`.

> **probe C7** — 200 trials with x-magnitudes ~1e18 against y-magnitudes ~1e-18 (maximal dynamic range): occurrences of exponential notation in the emitted `d` → **none**.

**Falsifier.** `4` is a magic constant coupled to an assumed `size`: the quantization reaches 1 px at `size ≈ 10 000`, and `size?: number` (`:8`) has no upper bound (L-9). So the discipline is right and the constant's coupling is undocumented — unreachable in practice (a 10 000 px thumbnail is not a thumbnail), which is why this stays a superlative with a rider rather than becoming a defect.

### S-4 · Zero teardown surface — and it is the only SVG surface in the tree that can say so

No `onMounted`, no `onUnmounted`, no `watch`, no `watchEffect`, no `ref` beyond the props, no event listener, no `requestAnimationFrame`, no `ResizeObserver`, no `IntersectionObserver`, no timer, no canvas or WebGL context, no `Image()`, no fetch. The entire runtime is one `computed` over props (`:21-44`) plus a static template. **There is nothing to leak and nothing to tear down** — the leaks/teardown limb of this axis discharges empty, and that is the correct verdict rather than an unexamined one.

The claim earns weight by contrast within its own lane. Probe T1 caught `FrequencyGraph.vue:2` importing `onUnmounted` and never calling it — on one of the three canvases the census describes at `CENSUS-2026-08-03.md:86-87` (*"ConvergencePlot with its own ungated rAF; FrequencyGraph watch-driven"*), and the same census note names an **ungated rAF** on a sibling. Teardown discipline in this tree is genuinely uneven; this file's is perfect.

Two riders strengthen it: the destructure at `:22` sits **inside** the getter, so it re-reads through the reactive proxy on every evaluation and tracks correctly (CF-2); and the file is `verbatimModuleSyntax`-clean — its single import is a *value* import of `computed`, correctly not `import type`, under a `tsconfig.json` setting `strict`, `verbatimModuleSyntax`, `isolatedModules` and `moduleResolution: "bundler"`. Of the 12 SVG surfaces enumerated at `lane-frontend.md:565`, this is the one whose render path is a single pure derivation.

**Falsifier.** None available on the source — the absence of imperative code is exhaustively checkable across 69 lines, and I read all 69. The uncomfortable rider is that a component which never renders trivially leaks nothing (L-1); the claim above is about the *source*, and it holds on the day it is wired.

### S-5 · It is the only path surface in the tree that inherits its colour — the default is theme-transparent where all three siblings are not

```
PathPreview.vue:16   strokeColor: "currentColor",
PathPreview.vue:55   :stroke="strokeColor"
```

`currentColor` means the thumbnail follows whatever `color` its host resolves — Tailwind utility, dark-mode token, hover state, `:disabled` dimming — with zero configuration and zero prop threading. Against the siblings:

- `ContourPreview.vue:45` — `stroke="hsl(40 90% 55% / 0.85)"`, a **hardcoded literal** that cannot follow dark mode at all.
- `FourierMorphSvg.vue:30` — defaults to `var(--accent-red)` and then projects it through an inline `:style="{ color: strokeColor }"` (`:6`) so the inner `stroke="currentColor"` (`:11`) can pick it up: the right destination reached by a two-step indirection PathPreview does not need.
- `EasingCurvePreview.vue:29` — hardcoded `stroke-width="0.15"` alongside its magic viewBox.

Add `fill="none"` (`:54`) and a two-property scoped style (`:65-68`) that sets only `display: block` and `flex-shrink: 0` — no colours, no sizes, no positioning — and the component is genuinely cascade-friendly: it asserts the minimum a shared-kit SVG must assert and inherits the rest. Given the census's note that **dark mode is a first-class axis** for this product (`DA6-guard-thread-scoping.md:77`), this default is the correct one and it is the only correct one in its cohort.

**Falsifier — and it cuts.** If `currentColor` is right, the `strokeColor` prop (`:10`) is nearly redundant: any caller can set `color` on the parent and get the same result through the cascade, which is exactly the mechanism `FourierMorphSvg.vue:6` uses. So the superlative is the *default*, not the *API*; the prop is a small piece of surface the component did not need. Second falsifier: `currentColor` inherits whatever the host resolves — including an inherited colour with insufficient contrast against the card surface. The census records a `--viz-amber` WCAG darken already carried locally (`CENSUS-2026-08-03.md:91`), so contrast is a live concern in this tree; whether the inherited value is legible at the gallery-card surface is **UNPROVEN-NEEDS-LIVE (SS-13)** and belongs to the D axis.

---

## 3 — Contra-findings *(defects hunted, not sustained)*

**CF-1 · "The thumbnail is scaled differently from the canvas."** FALSE — the formulae are the identical IEEE double for a square box (probe C6, `===` true, three cases). Only the *margin constant* diverges (0.1 vs 0.15, L-6) and only the *implementation* is duplicated. I do not claim mis-scaling.

**CF-2 · "Destructuring `props` breaks reactivity."** FALSE — `const { pathX, pathY, padding } = props;` sits at `:22`, **inside** the `computed` getter opened at `:21`, so each evaluation re-reads through the props proxy and re-registers the dependency. Had it been hoisted to module scope (a real and common Vue defect) the computed would freeze at its first value. It was not.

**CF-3 · "The stroke overflows the viewBox and is clipped at the defaults."** NOT SUSTAINED. At `padding = 0.1` the path occupies `[0.0833, 0.9167]` (probe D4) and the half-stroke is `1.5/64/2 = 0.0117`, giving `[0.0716, 0.9284]` — comfortably inside. Only `padding: 0` bleeds to `[-0.0117, 1.0117]`, and that requires an explicit caller. The defaults are chosen correctly; the concern survives only inside L-9's unvalidated-domain neighbourhood.

**CF-4 · "`preserveAspectRatio` conflicts with the manual fit."** FALSE — the viewBox is square (`:52`) and the viewport is square (`:50-51`, both bound to `size`), so `xMidYMid meet` is a no-op. It is redundant, not wrong, and it correctly future-proofs the non-square case S-1's falsifier describes.

**CF-5 · "`toFixed` can emit exponential notation and produce invalid path data."** FALSE, and provably so. Coordinates are algebraically bounded to `0.5 ± 0.5/(1+2p)` for all finite input (derivation in S-3), so the 1e21 threshold at which `Number.prototype.toFixed` switches to exponential form is unreachable. Probe C7 confirms across 200 maximal-dynamic-range trials: **zero** occurrences. The only non-finite outputs come from the `NaN`/`Infinity` paths already booked at L-9 and L-16, not from formatting.

**CF-6 · "In-place mutation of `pathX` will not retrigger the computed."** NOT SUSTAINED as a defect. `pathX.length` (`:23`) and `pathX.map` (`:37`) are both read inside the getter, so if the parent's array is a deep-reactive proxy the mutation tracks; if it is a raw array the parent must replace the reference, which is the ordinary Vue contract, not a defect of this file. It is worth one sentence of prop documentation the file does not have — folded into L-8's carry rather than booked as its own row, because with zero consumers (L-1) there is no observed hazard to point at.

---

## 4 — Carries

| # | row | severity | carry |
|---|---|---|---|
| **P-1** | L-2 | BLOCKER | **Clear the standing typecheck RED before any wave lands.** `vue-tsc --noEmit -p web/tsconfig.json` exits 2 at HEAD: `PaperView.vue(12,8) TS2882` for the side-effect import of `@mkbabb/latex-paper/theme` (exports-map → `./src/vue/theme.css`). Fix is a one-line CSS-subpath declaration in `web/env.d.ts`. Until it is green, **no L-row remediation can be distinguished from the standing failure.** Not merged with the census's separate `ToastVariant` break (`CENSUS-2026-08-03.md:104`). |
| **P-2** | L-1 | BLOCKER | **Delete `PathPreview.vue` and the `GalleryCard.vue:10` import, or wire it — and delete `GalleryCard.vue:9` (`VIZ_COLORS`) either way.** Wiring is *not* cheap: `Visualization` (`lib/types.ts:207-239`) carries `contour_hash` — an asset FK — and **no path arrays**, so the revival proposed at `docs/audits/runs/2026-06-16-M-deep-audit/raw-findings.json:1172` ("swap the static thumbnail for a lightweight live PathPreview") requires one `getContour(contourHash)` fetch (`lib/api.ts:326`) **per card** in an infinite-scroll grid — and per L-14, the marquee mounts each card **twice**, so the real multiplier is 2× on that route. Delete is the defensible default; wiring is a design decision with a measurable network cost, not a cleanup. |
| **P-3** | L-1 / L-14 / R5-7 / R6-5 | BLOCKER | **Derivation-model rider → F.W4 (feeds X-9).** R6's `NATIVE_TEMPLATE_LOOP` cure separates *rendered-but-uncounted* from *counted*; it separates neither from **genuinely-dead** nor from **rendered-but-phantom**. The gallery subtree exhibits all three at once (L-14's table). F.W4's per-component pass needs two classifications beside `NATIVE_TEMPLATE_LOOP` — `ZERO_RENDER_SITES` and `PRESENTATIONAL_DUPLICATE` (`aria-hidden` clone loops, `GalleryMarquee.vue:51-57`) — or the cure will simultaneously launder dead components into, and inflate phantoms within, the live denominator. The published scope law must state whether an imported-but-never-rendered SFC counts as a member; today it silently does, inside a denominator X-5 certifies as exact. |
| **P-4** | L-3 | MAJOR | **Add `"noUnusedLocals": true` to `web/tsconfig.json`, plus an ESLint config with `vue/no-unused-components`.** One key + one file; the repo has **zero** lint config today. Expected yield is measured, not guessed: **16 findings across 12 files** (probe T1), including two that are latent-defect-shaped rather than lint noise — `FrequencyGraph.vue:2` imports `onUnmounted` and never calls it (a canvas the census flags for rAF discipline), and `ContourEditorCanvas.vue:42` declares a `dragging` ref that is never read. Land after P-1. |
| **P-5** | L-5 / L-6 | MAJOR | **Converge the four fit/serialise implementations.** (a) Generalise `getPathBounds` (`transforms.ts:10`) to take an output extent rather than a `CanvasSurface` — it reads only `.width`/`.height` — and pass `{width:1,height:1}` from SVG hosts. (b) Route SVG serialisation through `pointsToSvgPath` (`svg-fourier.ts:47`) with `closed` honoured, or through **`pointsToLinear`, already exported by the already-installed `@mkbabb/pencil-boil`** (`src/path.ts:56`, imported at three sites incl. `svg-fourier.ts:11`) where a cheap polyline is wanted. Prerequisite to the census's `BasisCanvas` ↔ glass-ui `FourierField` convergence (`CENSUS-2026-08-03.md:96-99`): fourier owes itself an intra-repo convergence before a cross-repo one. Verify `pointsToLinear` survives the booked `pencil-boil 0.4.1→^0.11.2` uplift (`:105`). |
| **P-6** | L-4 | MAJOR | **Contract shape.** If the component survives, collapse `pathX`/`pathY` into the tree's canonical `{ x: number[]; y: number[] }` (`lib/types.ts:26`, `svg-fourier.ts:38`) so the pair travels atomically, and replace the `:23` non-emptiness guard with length-equality. Note the *silent* direction (probe C1b, `pathY` longer → valid-but-mis-framed output) is undetectable by any downstream check; only the contract shape or a unit test can catch it. |
| **P-7** | L-13 | MINOR | **No unit-test runner exists in `web/`.** A whole-frontend gap, not a PathPreview gap: 65 pure `.ts` modules (X-5, re-verified live) — `lib/svg-fourier.ts`, `lib/contourEditing.ts`, `lib/easings.ts`, `lib/evaluators.ts` — have nothing to be tested under. Route to the frontend wave, not this component. |
| **P-8** | L-11 | MINOR | `n_points` is unbounded in Pydantic (`api/models/shared.py`, `api/models/computation.py`) and in TS (`lib/types.ts:34`), while its neighbour `n_harmonics` is bounded at four sites (`api/models/visualization.py:76,126,187,281`). Add `Field(ge=…, le=…)`; independent of this component, and it caps the L-11 spread class tree-wide. |
| **P-9** | L-6 / L-8 | MINOR | Four preview surfaces frame the same data four ways: `transforms.ts:21` `0.15` (box-relative), `PathPreview.vue:17` `0.1` (content-relative, delivering 8.33 %), `ContourPreview.vue:26` `0.1` (X-derived, viewBox-additive, anisotropic), `EasingCurvePreview.vue:19` a hardcoded magic viewBox. Pick one margin law and one convention; name the prop for the convention chosen (`inset`/`marginRatio`, not `padding`). |
| **P-10** | L-10 | MINOR | Four SVG surfaces, four stroke conventions: `PathPreview.vue:56` (`strokeWidth / size`, breakable by any CSS the component does not own), `ContourPreview.vue:47` (`vector-effect="non-scaling-stroke"` — the correct one), `FourierMorphSvg.vue:12,29` (pixel-space viewBox), `EasingCurvePreview.vue:29` (hardcoded). Adopt `vector-effect` and delete the coupling. |
| **P-11** | corpus | INFO | **Census correction.** `lane-frontend.md:444` reads *"genuinely bespoke — no flag"*. The flag is **delete-or-wire**, evidenced by compiler diagnostic `TS6133` at `GalleryCard.vue(10,1)`. `:183`, `:366`, `:369` each describe the component as live; all four rows need the zero-render-sites fact attached. `:366`'s own figure (`find src/components/ui -type f` → 5) and X-5's 66/65 are re-verified exact at HEAD and stand unchanged. |

---

## 5 — Method appendix (reproducibility)

- **Probes C\*/D\*** — `svgPath` (`PathPreview.vue:21-44`) copied verbatim into a scratchpad ESM file and executed under the host Node runtime. No repo file read except by `cat`; no repo file written.
- **Probes T0/T1** — `npx vue-tsc --noEmit -p <scratchpad>/tsconfig.probe.json`, where that file is `{"extends": "<repo>/web/tsconfig.json", "compilerOptions": {"noUnusedLocals": true, "noEmit": true}}`. T0 is the same command against the repo's own unmodified `tsconfig.json`. `--noEmit` with a non-`composite`, non-`incremental` config writes nothing; **`-b` (build mode) was deliberately not used** because it writes `tsconfig.tsbuildinfo`. `git status --porcelain` returned the same 28 paths before and after.
- **Bundle receipts** — `grep -rl` / `grep -c` over `web/dist/assets/*.{js,css}`.
- **Read-only law observed.** `/Users/mkbabb/Programming/fourier-analysis` was never written. The only write performed by this lane is this file.
