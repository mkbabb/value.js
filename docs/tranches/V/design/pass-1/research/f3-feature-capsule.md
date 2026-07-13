# V · pass-1 research — Family 3 FEATURE-CAPSULE (measured)

**Researcher**: `f3-feature-capsule` (pass-1 isolation: read charter §0/§0.1/§0.2/§1/§2 +
portfolio survey tables + Family-3 section only). **Date**: 2026-07-13.
**Center under test**: structure = product-feature vertical capsules (one barrel each) + a
small named KERNEL; api is the landed template. All numbers below carry their command; every
count is from the working tree at branch `tranche-u`.

> **Note on assignment**: the launcher passed unsubstituted `${x.id}`/`${x.family}`. Families 1,
> 2, 4 already had pass-1 files; 3/5/6 had none. This probe claims the lowest-numbered gap
> (Family 3) — the one whose research questions are the most directly *measurable* against the
> tree (kernel size, subpath partition, leak census), maximizing concrete yield.

---

## F3-Q(a) — the true demo KERNEL size (composables serving ≥3 UNRELATED features)

**Method**: consumer census — for each of the 42 global composables under `demo/@/composables/`,
count the DISTINCT product-feature capsules that import it (feature = a `components/custom/<feat>/`
dir, `panes/`, the app-root `App.vue`, or a lib area; sibling `cx:*` composable imports are NOT
counted as an "unrelated feature"). Script: `scratchpad/census.py` (import-specifier match over
`demo/**/*.{ts,vue}`, vendored `ui/` excluded). Total global composables:
`rg --files demo/@/composables -g '*.ts' | wc -l` = **42** (color 18 · palette 12 · auth 5 · root 7).

**The KERNEL is small — measured, not asserted:**

| composable | dir | LoC | #feature-capsules | #import-sites | verdict |
|---|---|---|---|---|---|
| `keys.ts` | color | 27 | **7** (App·color-picker·dock·image-palette·markdown·palette-browser·panes) | 26 | KERNEL (archetypal) |
| `useContrastSafeColor.ts` | color | 376 | **6** (color-picker·dock·gradient·image-palette·markdown·palette-browser) | 11 | KERNEL |
| `usePaletteManager.ts` | palette | 153 | **6** (color-picker·dock·gradient·mix·palette-browser·panes) | 22 | KERNEL |
| `ink.ts` | color | 292 | **3** (color-picker·image-palette·markdown) | 6 | KERNEL |
| `useViewManager.ts` | root | 100 | **3** (App·color-picker·dock) | 8 | KERNEL |
| `usePaneRouter.ts` | root | 230 | 2 (App·dock) | 3 | kernel @ glass-ui T3 (≥2) |

- **KERNEL @ portfolio threshold (≥3 unrelated features) = 5 composables, 948 LoC.**
- **KERNEL @ glass-ui T3 threshold (≥2) = 6 composables, 1178 LoC.**
- **→ 36–37 of 42 global composables (86–88%) are SINGLE-feature code mis-filed in a global
  bucket** — they colocate into exactly one capsule. Largest kernel file is 376 LoC (no kernel
  member breaches the 500-line ceiling; the kernel is NOT a god-module).

**The 18-file `composables/color/` bucket dissolves cleanly** (the A1 "worst offender"): only
`keys`/`useContrastSafeColor`/`ink` are genuine kernel; the other **15** are single-consumer —
`ink-walk`, `normalizedColorNames`, `palettes-ramp`, `useAtmosphereFrameCoalesce`,
`useColorNameResolution`, `useColorParsing`, `useColorPersistence`, `useSliderGradients`,
`valueDomain`, `useColorPipeline`(373), `useCustomColorNames`, `useColorUrl` → **color-picker**
capsule; `generate-color`→**generate**; `aurora-atoms`→**panes**; `view-accent`→color-picker.
The 12-file `composables/palette/` bucket: only `usePaletteManager` is kernel; the other 11
colocate into **palette-browser** (or an admin sub-capsule: `useAdmin{Audit,Flagged,Tags}`).

**F3-Q(a) verdict**: the FEATURE-CAPSULE thesis is **strongly supported for D1**. The kernel that
survives promotion is 5–6 files / ~1k LoC (12–14% of the global bucket), each earned by
≥2–7 real feature consumers. This is the small named kernel the family predicts, and the
placement is derived, not decreed.

---

## F3-Q(b) — do the 7 `src/subpaths/*` barrels partition src cleanly, or overlap?

**Finding: the 7 subpaths are NOT feature capsules — they partition on the `parse-that`
bundle-coupling axis, not on feature/domain ownership.** Read the barrel headers
(`src/subpaths/*.ts`): each is labelled *parse-that-FREE* (`color`, `units`, `math`, `transform`,
`quantize`) or *parse-that-COUPLED* (`parsing`, `easing`). The `/color` barrel's own invariant
(gated by `proof:subpath-budget`) is *"MUST NOT import … from `src/parsing/`"*.

Two concrete overlaps this creates:

1. **The color domain is SPLIT across two subpaths on the parse-that seam.** Color *representation
   + conversion* ships in `/color` (`../units/color/*`); color *parsing* (`CSSColor`,
   `parseCSSColor`) ships in `/parsing` (`../parsing/color`). A feature-capsule "color" would be
   ONE unit; the subpath split cuts it in two to keep `/color` grammar-free. This is the
   publish-surface (tree-shake) axis overriding the feature axis — exactly glass-ui §0.5.8
   *"location and publish-surface are ORTHOGONAL."*
2. **The color-name registry name-overlaps THREE subpaths** — `registerColorNames`,
   `clearCustomColorNames`, `getCustomColorNames` are exported by `color.ts`, `units.ts` (both
   `from "../units/color/color-names"`) AND `parsing.ts` (`from "../parsing/color"`). Verified
   these resolve to **ONE implementation**: `parsing/color/color.ts:704` re-exports them
   *verbatim* from `units/color/color-names.ts` (comment at `color.ts:686-694`). So the overlap is
   a publish-surface name collision across barrels, **not** logic duplication.

**F3-Q(b) verdict**: subpaths do NOT give a clean feature partition of src — they are a
correct-but-orthogonal *publish* partition. For Family 3 this is the load-bearing correction:
the src directory tree (feature capsules) and `subpaths/` (publish surface) are two different
projections and must be designed *separately*. A `color/` feature-dir CAN contain both
`units/color` and `parsing/color` as sub-modules while the `/color` subpath barrel still carves
only the parse-that-free slice for tree-shaking. Directory ≠ export map.

---

## F3-Q(c) — the cross-capsule import-leak census (src/)

**Method**: `scratchpad/srcgraph.py` — resolve every relative `import/export … from` in `src/**`
to a cluster (`units/color`, `parsing/color`, `parsing`, `units`, `transform`, `quantize`,
`root`, `math`, `utils`, `easing`), count cross-cluster edges. `subpaths/` barrels excluded.

**The predicted leak is real and large**, and one cluster pair is a **cycle**:

| edge (src cluster → cluster) | count | reading |
|---|---|---|
| `parsing/color` → `units/color` | **15** | the capsule-boundary leak the portfolio named — color-parse is tightly bound to color-repr |
| `parsing` (non-color) → `units` | 10 | value-model dependency (units is the substrate) |
| `units` → `units/color` | 10 | interpolate/normalize reach into color |
| `parsing/color` → `units` | 5 | color-unit bridge |
| `parsing/color` → `parsing` | 5 | shares parse-utils |
| `quantize` → `units/color` | 3 | quantize composes over `units/color/gamut` only |
| **`units` → `parsing`** | **2** | **back-edge → `units ↔ parsing` CYCLE** (`layout-cache.ts:1,3` import `parseCSSValue`/`parseCSSValueUnit`) |
| `parsing` (non-color) → `units/color` | **0** | clean — non-color grammar never touches color repr |
| `units/color` → `parsing` | **0** | clean — color representation never imports the grammar |

Two facts pin the color-capsule design:
- `parsing/color → units/color` = **15** and `units/color → parsing/color`/`parsing` = **0**: the
  coupling is *one-directional*. A merged `color/` feature capsule (repr `units/color` + parse
  `parsing/color`) is acyclic internally and would ELIMINATE 15+5 = 20 cross-top-level edges by
  turning them into intra-capsule imports.
- The only genuine src cluster CYCLE is `units ↔ parsing` (10 forward, **2 back**), localized to
  `units/layout-cache.ts` re-parsing the live computed box. That is the single "cycles are the
  enemy" hotspot a capsule design must sever or seal (it is what forces `units/normalize`+
  `layout-cache` into the parse-that-coupled bundle — the same seam the `/units` subpath comment
  flags).

**F3-Q(c) verdict**: the src feature-capsules that the leak census *supports* are: **`color`**
(merge `units/color` + `parsing/color`; kills 20 edges, internally acyclic), **`parsing`**
(non-color grammar; 0 color leak), **`units`** (value model), **`transform`**, **`quantize`**,
and the numeric **`math`/`easing`** kernel. The one obstruction is the `units↔parsing` back-edge,
not the color boundary.

---

## D2 — api/ is ALREADY the feature-capsule template (ratify-not-restructure)

First-hand confirmation of the portfolio A2 claim. `api/src/modules/` = **5 vertical capsules**
(`admin color meta palette session`); each holds by-purpose segments (`routes/ service/
repository/ __tests__/` + colocated `model.ts`/`schema.ts`/`etag.ts`), e.g. `palette/`.
Infra ring = `api/src/platform/{db,http,cache,migrations,text}`. Boundary check
`rg -n "repositor" api/src/modules/*/routes/` returns **2 matches, both COMMENTS**
(`votes.ts:7`, `crud.ts:93`) — **0 real route→repository imports**. So D2 under Family 3 is
*verify + ratify* (api is the proven capsule template value.js already ships); the only open
item is the vocabulary question (`routes/service/repository` vs glass-ui `api/model/lib`), which
is a Family-1 conformance decision, orthogonal to the capsule mechanism.

---

## D3 severest-failure-mode test — "color is cross-feature → fat kernel/duplication"

The family's own named risk (color shared by picker+gradient+mix+quantize+image-extractor).
**Measured, the risk is REAL but BOUNDED**: the genuinely cross-feature color primitives in demo
are exactly **3 files / 948 LoC in the kernel tally** (`keys` 27, `ink` 292, `useContrastSafeColor`
376 — plus `usePaletteManager` which is palette not color). Every *other* color composable is
single-feature (15 of 18 in `composables/color/`). In src, "color is cross-feature" shows up as the
`parsing/color→units/color`=15 coupling — which the merged `color/` capsule *absorbs* rather than
balloons. So the failure mode does NOT materialize as a god-kernel: the kernel stays ≤376 LoC/file
and ~1k LoC total. The metaphor DOES strain for src's *non*-color axis (parse-vs-represent is a
layer, not a feature) — which is why F3's honest src answer is a *domain* capsule set, not a
*product-feature* one, and why it composes with (does not replace) the subpath publish surface.

---

## Convergence read for Family 3

- **Strongest surface: D1 (demo) and D2 (api).** D1: 86–88% of global composables colocate to one
  feature; kernel is 5–6 files. D2: already the landed template (0 boundary violations).
- **Weakest surface: D3 (src).** "Feature" is the wrong atom for a pure library; the right F3
  framing is *domain* capsules (`color`/`parsing`/`units`/`transform`/`quantize`), and even then
  the `units↔parsing` cycle and the parse-that publish-seam must be handled by mechanisms F3 does
  not itself provide (cycle severance; a subpath barrel decoupled from the dir tree).
- **The one structural correction F3 contributes**: directory (capsule) and export map (subpath)
  are ORTHOGONAL projections — a `color/` capsule dir and a parse-that-free `/color` subpath
  barrel can and should coexist. This dissolves the apparent color/parsing split as a *non*-conflict.
- **Composes cleanly with**: F1 (vocabulary/gate conformance), and any execution family (F5/F6)
  for the move itself. It RATIFIES api (F3's own D2 template) and hands D1 a computed colocation
  list identical in spirit to F2's graph projection — the two agree on the demo kernel by
  independent methods (consumer-count vs import-DAG).

## Commands / artifacts (reproduce)
- `scratchpad/census.py` — demo composable consumer census (42 globals → kernel table above).
- `scratchpad/srcgraph.py` — src cross-cluster edge census (the leak table above).
- `rg --files demo/@/composables -g '*.ts' | wc -l` → 42.
- `rg -n "repositor" api/src/modules/*/routes/` → 2 comments, 0 imports.
- subpath overlap: `src/subpaths/{color,parsing,units}.ts` all export the color-name registry;
  impl at `src/units/color/color-names.ts`, re-exported verbatim at `parsing/color/color.ts:704`.
