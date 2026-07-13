# V · pass-1 · SPEC — Family 3 · FEATURE-CAPSULE

**Pass 1 · SYNTHESIZE · 2026-07-13 · author: pass-1 synthesizer.**
Distilled from `f3-feature-capsule.md` (Family 3, measured — consumer census over
`demo/**/*.{ts,vue}` + a src cross-cluster edge census). Mechanism made concrete for D1–D4; no ranking.

---

## §0 The mechanism (what structure is DERIVED FROM)

**PRODUCT-FEATURE OWNERSHIP.** The unit is the feature (color-picker, gradient, palette-browser, mix,
quantize, image-palette-extractor) as a sealed vertical capsule with ONE public barrel; everything the
feature owns lives inside recursively; cross-feature sharing is a deliberate, small, explicitly-named
KERNEL. Structure follows the product taxonomy — not the import graph (F2), not the external design
system (F1), not the type lattice (F4). **api is the landed template.**

---

## §1 · D1 — demo/ frontend (the family's strongest surface)

**The kernel is small — MEASURED, not asserted** (F3-Q(a), consumer census of all 42 global composables;
"feature" = a `components/custom/<feat>/` dir, `panes/`, `App.vue`, or a lib area; sibling composable
imports NOT counted as an unrelated feature):

| composable | dir | LoC | #feature-capsules | verdict |
|---|---|---|---|---|
| `keys.ts` | color | 27 | **7** | KERNEL (archetypal) |
| `useContrastSafeColor.ts` | color | 376 | **6** | KERNEL |
| `usePaletteManager.ts` | palette | 153 | **6** | KERNEL |
| `ink.ts` | color | 292 | **3** | KERNEL |
| `useViewManager.ts` | root | 100 | **3** | KERNEL |
| `usePaneRouter.ts` | root | 230 | 2 | kernel @ glass-ui T3 (≥2) |

- **KERNEL @ portfolio threshold (≥3 unrelated features) = 5 composables / 948 LoC**; @ glass-ui T3 (≥2)
  = 6 / 1178 LoC. Largest kernel file 376 LoC (NOT a god-module).
- **→ 36–37 of 42 global composables (86–88%) are SINGLE-feature code mis-filed in a global bucket** —
  they colocate into exactly one capsule. This RATIFIES the ~60%-landed leaf colocation and FINISHES it.
- **`composables/color/` (18)** dissolves cleanly: only `keys`/`useContrastSafeColor`/`ink` are genuine
  kernel; the other **15** are single-consumer (→ color-picker: `useColorPipeline` 373, `useColorParsing`,
  `useColorPersistence`, `useSliderGradients`, `valueDomain`, `useColorNameResolution`,
  `useAtmosphereFrameCoalesce`, `useColorUrl`, `useCustomColorNames`, `ink-walk`, `normalizedColorNames`,
  `palettes-ramp`, `view-accent`; → generate: `generate-color`; → panes: `aurora-atoms`).
  **`composables/palette/` (12)**: only `usePaletteManager` kernel; the other 11 → palette-browser (or
  an admin sub-capsule `useAdmin{Audit,Flagged,Tags}`).
- **The one structural CORRECTION F3 contributes** (F3-Q(b)): **directory (capsule) and export map
  (subpath) are ORTHOGONAL projections** (glass-ui §0.5.8) — a `color/` capsule dir and a parse-that-free
  `/color` subpath barrel can and should coexist. This dissolves the apparent color/parsing split as a
  NON-conflict.
- **CC-5 fold**: the kernel-vs-colocate DECISION is the T3 "≥2 UNRELATED families" judgment — F3's
  consumer census IS that semantic overlay the pure graph (F2) cannot supply; the two agree on the demo
  kernel by independent methods (consumer-count vs import-DAG).

## §2 · D2 — api/ backend (F3's OWN landed template — ratify)

First-hand confirmation of A2: `api/src/modules/` = **5 vertical feature capsules** (`admin color meta
palette session`), each with by-purpose segments (`routes/ service/ repository/ __tests__/` + colocated
`model.ts`/`schema.ts`/`etag.ts`); infra ring `platform/{db,http,cache,migrations,text}`. Boundary
check: `rg "repositor" api/src/modules/*/routes/` = **2 comment matches, 0 real route→repository
imports**. D2 = **verify + ratify** — the proven capsule template value.js already ships. The vocabulary
question (`routes/service/repository` vs `api/model/lib`) is F1's conformance decision, orthogonal to the
capsule mechanism.

## §3 · D3 — src/ library (the family's WEAKEST surface — domain capsules, not feature capsules)

**Finding (F3-Q(b))**: the 7 `subpaths/*` are **NOT feature capsules** — they partition on the
`parse-that` **bundle-coupling** axis (`/color`, `/units`, `/math`, `/transform`, `/quantize` =
parse-that-FREE; `/parsing`, `/easing` = COUPLED), enforced by `proof:subpath-budget`. So the color
domain is SPLIT across two subpaths (repr in `/color`, parse in `/parsing`) to keep `/color` grammar-free
— the publish-surface axis overriding the feature axis. **Directory ≠ export map.**

**The src cross-capsule leak census (F3-Q(c))** — the predicted leak is real, large, one-directional:

| edge (src cluster → cluster) | count | reading |
|---|---|---|
| `parsing/color` → `units/color` | **15** | the capsule-boundary leak — color-parse bound to color-repr |
| `units/color` → `parsing` / `parsing/color` | **0** | clean — color representation never imports the grammar |
| `units` → `parsing` | **2** (back-edge) | the **`units ↔ parsing` CYCLE** — `layout-cache.ts` re-parses the live computed box |

- **A merged `color/` domain capsule** (repr `units/color` + parse `parsing/color`) is **internally
  acyclic** and turns 15+5 = **20 cross-top-level edges into intra-capsule imports**. The one obstruction
  is NOT the color boundary — it is the `units ↔ parsing` back-edge (`layout-cache.ts`), the single "cycles
  are the enemy" hotspot a capsule design must sever or seal (a mechanism F3 does not itself provide — F2
  supplies the cycle severance).
- **The supported src capsule set**: `color` (merge units/color + parsing/color; kills 20 edges,
  internally acyclic), `parsing` (non-color grammar; 0 color leak), `units` (value model), `transform`,
  `quantize`, + the numeric `math`/`easing` kernel — coexisting with the orthogonal `subpaths/` publish
  surface (F3-Q(b)).

## §4 · D4 — repo hygiene

Benches/gates owned by their capsule (a color bench lives with the color capsule). The A4 litter census
(39 PNGs, `.lighthouseci/`, stale worktree, `plugins/` verify-then-relocate, the 10-gate `test:dist`
cull) is shared with F1/F5 — F3 adds only the capsule-ownership home for the surviving benches.

---

## §5 · Gate shapes this family lands

A capsule-boundary gate (each feature imports peers through the BARREL, never into another capsule's
guts — glass-ui §0.5.6) + the cross-capsule import-leak census as a standing report (the src `parsing/color
→ units/color` = 15 leak is the archetype the merged-capsule move resolves). The kernel-membership rule
(≥2 unrelated features) is the T3 gate with the F3 consumer-census as its semantic input.

## §6 · What the pass-2 prototype MUST demonstrate (measured, isolated worktree)

1. **Colocate ONE demo bucket**: `composables/palette/` → 9 files INTO a `usePaletteManager` capsule +
   1 kernel float; then `npm run typecheck` exit 0 + `npx playwright test --project=smoke` green.
   Evidence: the move-map + typecheck exit + smoke pass count.
2. **Merge the src color capsule** (units/color + parsing/color): prove the 20 cross-top-level edges become
   intra-capsule (re-run the edge census → 0 `parsing/color→units/color` cross-edge), the capsule is
   internally acyclic (Tarjan), AND the `/color` subpath still carves the parse-that-free slice
   (`proof:subpath-budget` GREEN). This is the load-bearing "directory ≠ export map" coexistence proof.

## §7 · Honest current weaknesses

- **D3 "feature" is the WRONG atom for a pure library** — the right F3 framing is DOMAIN capsules
  (parse-vs-represent is a layer, not a feature), and even then the `units ↔ parsing` cycle + the
  parse-that publish-seam need mechanisms F3 does not provide (cycle severance from F2; a subpath barrel
  decoupled from the dir tree).
- **The color-is-cross-feature risk is REAL but BOUNDED**: the genuinely cross-feature color primitives
  are exactly 3 files / 948 LoC in the kernel (`keys` 27, `ink` 292, `useContrastSafeColor` 376) — the
  failure mode does NOT materialize as a god-kernel (≤376 LoC/file, ~1k total), but the metaphor DOES
  strain for src's non-color axis.
- **The kernel-vs-colocate decision needs the T3 semantic overlay** (CC-5) — F3 supplies it via consumer
  census, but that is a human/semantic judgment, not a mechanical one.

## §8 · Composition (facts, NOT a ranking)

F3 answers **WHAT tree** from the product's own feature ontology (distinct from F1, which conforms to the
external spec's shape). It RATIFIES api (its own D2 template), hands D1 a computed colocation list
identical in spirit to F2's graph projection (the two agree on the demo kernel by independent methods),
and composes with any execution family (F5/F6) for the move itself + F4 for the typed-diagnostics
dimension. **Convergence facts**: the demo kernel (`keys`/`useContrastSafeColor`/`usePaletteManager` +
`ink`/`useViewManager`) is reached by F3 (consumer count) and F2 (fan-in) alike; api-is-exemplar is shared
across F1/F2/F3 (D2 = verify-not-restructure).
