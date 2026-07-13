# V · PASS-1 RESEARCH — Family 2 · GRAPH-PROJECTION

**Pass 1 · 2026-07-13 · researcher: pass-1 graph-projection probe (opus, model declared).**
Scope: falsify/establish Family 2's four open gaps (`DESIGN-CAMPAIGN.md §3` + `portfolio.md`
Family 2). Every claim below carries its command; all numbers are MEASURED, not estimated.

> **Assignment-recovery note (load-bearing, read first).** The orchestration spawned this probe
> with the task template's `${x.id}`/`${x.family}`/`${x.focus}` UN-interpolated (received as literal
> placeholders). With no recoverable per-probe routing, this researcher committed to **Family 2 ·
> GRAPH-PROJECTION** — the single most tool-driven family (madge/dependency-cruiser yield hard,
> reproducible numbers), so a possibly-misrouted probe still delivers the highest-leverage shared
> substrate: the import DAG facts (cycles, dead code, fan-in) that EVERY other family consumes. File
> named descriptively (`f2-graph-projection.md`) rather than `${x.id}.md` so it survives regardless of
> any sibling-probe filename collision. Isolation honored: analysis targets F2's gaps, not advocacy
> for a winning family.

---

## §0 Method (reproducible)

Tools run via `npx --yes` (NO `package.json` mutation): `dependency-cruiser@16`, `madge@8`. Local
`typescript@6.0.3` + `@vue/compiler-sfc@3.5.35` present (the `.vue` parse path). Configs written to
scratch, not the repo.

- **src/** — `dependency-cruiser@16 "src/**/*.ts" --config dc-src.cjs --output-type json` with
  `tsConfig: tsconfig.lib.json`, `doNotFollow node_modules`. Cross-checked with
  `madge@8 --circular/--orphans --extensions ts --ts-config tsconfig.lib.json src`.
- **demo/** — `dependency-cruiser@16 "demo/**/*.ts" "demo/**/*.vue"`. **Alias resolution required a
  webpack `resolve.alias` map** (see §1-a — the tsConfig-`paths` path silently under-resolved). Entry
  for reachability: `demo/color-picker/App.vue` (the inline `<script type=module>` root; there is no
  `main.ts`).
- **api/src** — `dependency-cruiser@16 "api/src/**/*.ts"`, `__tests__` excluded.
- Post-processing (Tarjan SCC, reachability BFS, fan-in/out, single-consumer) via two ≤40-line node
  scripts (`scc.cjs`, `analyze.cjs`). SCC = the tool-independent cycle metric (raw "cycle count"
  differs per tool — see §1-a).

Graph sizes cruised: **src 73 in-project modules** (matches survey A3 count of 73), **demo 253**
(232 non-vendored + 21 fenced `ui/`), **api/src 82**.

---

## §1 Findings (F2-*)

### F2-1 · Tool reliability: dependency-cruiser resolves the `@`-alias + `.vue` graph — but ONLY with an explicit alias map; tsConfig-`paths` silently fails (pass-1 gap a — ANSWERED)

- **`.vue` parsing works**: 70 of 91 `.vue` files carry resolved deps; the 21 without are pure-template
  / vendored leaves (not a parse failure).
- **tsConfig-`paths` resolution SILENTLY under-resolves extensionless alias specifiers.** With
  `tsConfig: tsconfig.demo.json`, **343 edges reported `couldNotResolve`** — every `@composables/color/keys`
  (extensionless) failed while `@components/.../PaneSlot.vue` (explicit ext) resolved. Root cause:
  `tsconfig.demo.json` has `paths` but **no `baseUrl`**, and dep-cruiser's tsConfig-paths integration
  did not apply the extension list to alias targets. **Symptom that exposed it:** `usePaletteManager`
  came back fan-in **0** — contradicting survey A1's grep-based "21 consumers."
- **Fix that works:** feed a webpack `resolve.alias` map + `mainFiles:["index"]` +
  `extensions:[.ts,.js,.mjs,.vue,.json,.css]` via `webpackConfig`. Result: **0 remaining `@`-alias
  failures**; all reported failures reduce to genuinely-external `@mkbabb/glass-ui*` / `@mkbabb/value.js*`
  (correctly out-of-graph).
- **Verdict:** madge/dep-cruiser ARE reliable for this repo's graph — **conditional on** (i) an explicit
  alias map (NOT bare tsConfig-paths), (ii) `@vue/compiler-sfc` present, (iii) SCC (not raw cycle count)
  as the cycle metric. Any Family-2 execution MUST wire the alias map or every count is silently wrong.
  **This is the load-bearing reliability caveat: the tool defaults produce a plausible-but-false graph.**

### F2-2 · Two tools AGREE on structure; raw "cycle count" is a tool artifact (cross-validation)

The src cycle tangle: dep-cruiser enumerates **51 distinct cyclic paths**, madge **23** — DIFFERENT
numbers, SAME structure. Both route every cycle through the same barrel hubs
(`units/color/index.ts`, `units/index.ts`, `parsing/color/index.ts`, `parsing/index.ts`). madge's
**11 orphans EXACTLY match** the dep-cruiser 0-fan-in list (byte-identical set). **Takeaway:** report
SCC decomposition, never a raw cycle count — the latter is unstable across tools and refactors (the
family's own "churns on every refactor" failure mode, confirmed).

### F2-3 · src/ has ONE 25-node megacycle (34% of src) — barrel-INDUCED (pass-1 gap c, src — ANSWERED)

Tarjan on src (73 nodes) → **3 non-trivial SCCs**, all others trivial:

| SCC | size | members (abridged) |
|---|---|---|
| #1 | **25** | `parsing/{index,math,units,color/*}` + `units/{index,interpolate,layout-cache,utils}` + `units/color/{index,dispatch,contrast,normalize,mix,conversions/*}` |
| #2 | 2 | `units/color/base.ts` ↔ `units/color/serialize.ts` |
| #3 | 2 | `parsing/animation-shorthand.ts` ↔ `parsing/stylesheet/extract.ts` |

**Megacycle anatomy** (`src-graph.json`, computed): 77 intra-SCC edges; **30 (39%) point AT a barrel
`index.ts`**, distributed `units/color/index.ts` **18**, `units/index.ts` **10**, `parsing/color/index.ts`
1, `parsing/index.ts` 1. So `units/color/index.ts` + `units/index.ts` are the cycle SPINE (28 of 30
barrel edges). Mechanism: leaf modules (`conversions/*.ts`, `contrast`, `mix`, `normalize`) import the
**barrel** `units/color/index.ts`, which imports `dispatch`→`conversions/*` → back to the barrel.
**Direct link to survey finding #4** (barrel-purity): the "god-IMPL-files named `index.ts`" are ALSO
the cycle hubs. Making barrels PURE re-export-only + rewiring leaves to import concrete siblings
(not the barrel) shatters SCC#1. Lower bound: ≥6 SCC members whose every in-cycle out-edge is to a
barrel would detach immediately.

### F2-4 · demo/ has 3 cycle clusters, 2 of them barrel-mediated (pass-1 gap c, demo — ANSWERED)

Tarjan on demo (corrected graph) → **3 non-trivial SCCs**:

| SCC | size | mechanism |
|---|---|---|
| #1 | **12** | color-picker cluster: `ColorPicker.vue`↔`SpectrumCanvas`↔`HeroBlob`↔**`color-picker/index.ts`**↔`composables/color/{keys,useColorPipeline,useContrastSafeColor,useColorParsing,useColorPersistence,useColorNameResolution,useSliderGradients}` |
| #2 | 3 | gradient: `gradientParse`↔`useGradientCSS`↔`useGradientModel` (mutual composable recursion, no barrel) |
| #3 | 2 | `Dock.vue` ↔ **`dock/index.ts`** (pure barrel cycle) |

SCC#1's spine: **`composables/color/keys.ts` imports `useColorPipeline`, which chains back to
`keys.ts`** — the DI-keys module importing a pipeline is an architectural inversion and a concrete
carve target. SCC#1 + #3 are barrel-mediated (same mechanism as src); SCC#2 is a genuine composable
knot. Demo barrels reproduce the src pathology.

### F2-5 · Dead-code census: graph reachability OVER-reports; the reliable verdict needs test-entry inclusion (pass-1 gap b — ANSWERED, with correction to method)

**src** — reachable from the 8 public entries (`index.ts` + 7 `subpaths/*`): 70/73. The 3 unreachable:
`vite-env.d.ts` (ambient, legit), **`parsing/timeline/index.ts`**, **`units/color/conversions/index.ts`**
(both barrels). Grep-verified disposition:
- **`parsing/timeline/index.ts` — GENUINELY DEAD**: zero importers anywhere. Product code
  (`src/index.ts`, `subpaths/parsing.ts`) and tests both import `./parsing/timeline/scroll-timeline`
  and `.../easing` DIRECTLY; the barrel itself has **0 importers (product OR test)**. Safe delete
  candidate.
- **`units/color/conversions/index.ts` — TEST-ONLY, NOT dead**: all product code imports the individual
  `conversions/{oklab,hex,cylindrical,...}` modules directly; the barrel is imported ONLY by 3 test
  files (`color-conversions.test.ts`, `color-roundtrip.test.ts`, `color-external-anchors.test.ts`).
- **Method correction (the family's severest-failure-mode, made concrete):** product-entry reachability
  flagged BOTH as "dead"; one is genuinely dead, one is a live test surface. **A Family-2 dead-code gate
  MUST include test files as entry points** (or filter verdicts against test consumers), or it deletes
  live test infrastructure. "Confirm via graph, not grep" (the gap-b prompt) is INCOMPLETE — the reliable
  recipe is graph reachability from {product ∪ test ∪ build} entries.

**demo** — reachable from `App.vue`: 229/253. **24 unreachable** (excl. vendored `ui/`: ~18 non-vendored
candidates). High-confidence dead:
- **`router/index.ts`** — 0 fan-in AND unreachable; MEMORY records `usePaneRouter` as the pane
  source-of-truth (tranche B) → vue-router shell superseded. Strong dead-code find.
- **4 dead barrels**: `palette-browser/index.ts`, `panes/index.ts`, `status/index.ts`, `katex/index.ts`
  (0 fan-in; consumers deep-import concrete files, bypassing the barrel — the demo mirror of the src
  dead-barrel pathology).
- **`markdown/composables/{useMarkdownColors,useMarkdownHighlighting}`** — `Markdown.vue` is reachable
  but imports neither → dead composables.
- **ComponentSliders subtree** (`ComponentSliders.vue` + `ConsoleRail.vue` + 3 composables) — 0 fan-in,
  whole subtree unreachable, despite MEMORY describing it as a live pointer-capture-recovery control →
  **suspected replaced/orphaned 5-file cluster; flag for verify** (could be dynamic-import; static graph
  is blind to `defineAsyncComponent`/`import()` — the standing caveat).
- Leaf orphans: `useHeaderCondense.ts`, `DebugEventLog.vue`, `admin/{AdminListItem,PaginationBar}.vue`,
  `search/MiniColorPicker.vue`.
- 4 vendored `ui/` barrels (`alert/checkbox/label/switch`) unreachable — FENCED, exclude from actionable.

### F2-6 · Fan-in ranking names hub-vs-carve, but the module graph CANNOT draw intra-file split lines (pass-1 gap d — ANSWERED, with hard limit)

Top internal fan-in (coupling hubs):

| surface | module | fan-in | role |
|---|---|---|---|
| src | `units/color/constants.ts` | 22 | pure-data hub (leaf; fine) |
| src | `units/color/index.ts` | 21 | **barrel hub + cycle spine** (carve: own defs → siblings) |
| src | `math.ts` | 18 | shared kernel (fine) |
| src | `units/index.ts` | 17 | **god-IMPL-barrel + cycle spine** |
| src | `parsing/utils.ts` | 11 | util god-module (603 LoC; wide blast) |
| src | `units/color/dispatch.ts` | 10 in / **14 out** | genuine color hub — HIGH both directions → split with care |
| demo | `lib/palette/types.ts` | 36 | type hub (fine — pure types) |
| demo | `composables/color/keys.ts` | 21 | DI hub + SCC#1 spine |
| demo | `composables/palette/usePaletteManager.ts` | **14** (graph) vs A1 grep **21** | god-composable |

- **God-module carve link**: of the 14 src files >500 LoC (survey A3), the graph flags `parsing/index.ts`
  (fan-in 7, cycle hub), `units/index.ts` (17, spine), `units/color/dispatch.ts` (10/14, hub), and
  `parsing/utils.ts` (11) as the coupling-driven carve priorities — carving barrel own-defs to
  kind-named siblings breaks cycles AND reduces LoC simultaneously.
- **Hard limit (honest):** the module graph treats a 754-LoC file (`parsing/color/color.ts`) as ONE
  node — it can RANK which files to split by coupling, but **cannot compute the intra-file split line**
  (the family's "does `parsing/index.ts`'s 11 defs form 2 clusters?" question needs SYMBOL-level
  analysis, ts-morph, not module-level dep-cruiser). Family 2 hands off the actual carve to Family 6's
  tooling; it decides WHICH file, not HOW to cut it.

### F2-7 · api/src is a clean DAG — graph-confirms "the exemplar" (pass-1, D2)

Tarjan on api/src (82 nodes): **0 non-trivial SCCs** (fully acyclic). **0 route→repository edges**
(the `routes→service→repository` boundary holds as a DAG assertion by measurement). Family 2's D2 =
verify-not-restructure, CONFIRMED. This is the graph-independent corroboration of survey A2.

### F2-8 · The T3 tension is REAL and measurable: graph counts EDGES, the spec counts FAMILIES (pass-1, BH/BI relationship)

Concrete instance: `composables/color/keys.ts` — graph fan-in **21 edges**, but survey A1 (human)
counts **6 feature AREAS**. Both verdicts agree it "stays global," but via different arithmetic. The
divergence bites at the margin: a util imported by 21 sites all within ONE feature would read as a
"global" to the edge-counter but "colocate" to the T3 "≥2 UNRELATED families" rule. Single-consumer
detection is graph-RELIABLE (see §2), but the promote/colocate DECISION cannot be pure edge-count — it
needs a family-relatedness overlay the graph does not carry. **Family 2's placement is a strong INPUT,
not a sufficient DECISION rule** — exactly the "graph counts edges, not family-relatedness" risk the
portfolio named, now quantified.

---

## §2 Single-consumer census (the colocation engine — validates A1)

Graph found **~40 single-consumer (`fan-in===1`) modules** demo-wide. The `composables/color` +
`composables/palette` buckets (survey A1's worst offenders) decompose cleanly by graph:
- **`composables/palette/`**: 9 of 12 files have `usePaletteManager.ts` as their ONLY consumer
  (`useAdminAudit`, `useAdminFlagged`, `useAdminTags`, `useBrowsePalettes`, `useColorNameQueue`,
  `usePaletteActions`, `useSlugMigration`, `useTagEdit`, `useVersionHistory`) → colocate INTO a
  `usePaletteManager` capsule. Only `usePaletteManager` (14), `usePaletteStore` (2) float.
- **`composables/color/`**: `useColorPipeline` is the local hub (single-consumers `useAtmosphereFrameCoalesce`,
  `useColorNameResolution`, `useColorParsing`, `useColorPersistence`, `useSliderGradients`, `valueDomain`
  all resolve to it) → colocate the pipeline cluster; `keys.ts` (21) + `useContrastSafeColor.ts` (10) +
  `ink.ts` (5) are the true kernel. **This corroborates A1's per-file verdicts by independent measurement.**

The graph placement engine works: `single-consumer → colocate into consumer`; `high-fan-in →
promote to LCA/kernel` is mechanically derivable from the corrected graph.

---

## §3 Net verdict for Family 2 (scored against its own gaps)

| gap | status | evidence |
|---|---|---|
| (a) madge/dep-cruiser reliable across `@`-alias+subpath | **YES, conditionally** | 0 alias failures WITH explicit alias map; 343 silent failures WITHOUT (F2-1) |
| (b) true dead-code census | **YES, method-corrected** | src: 1 genuine dead barrel + 1 test-only; demo: router + 4 dead barrels + markdown composables + ComponentSliders subtree; MUST include test entries (F2-5) |
| (c) cycle inventory src + demo | **DONE** | src: 1×25-node + 2×2 SCC, barrel-induced; demo: 12/3/2 SCC (F2-3,4) |
| (d) fan-in ranking → carve lines | **PARTIAL by construction** | ranks WHICH file; cannot cut intra-file (needs ts-morph) (F2-6) |
| T3 contradiction | **CONFIRMED, quantified** | keys.ts 21 edges vs 6 families (F2-8) |

**Family 2's strongest, load-bearing contribution (family-agnostic substrate):** the barrel-induced
25-node src megacycle + the 12-node demo color-picker cycle are the SAME defect the survey's
barrel-purity finding names — the graph proves the cycles are a *mechanical consequence* of the
mixed/impl-barrels, so **fixing barrel purity (any family) provably dissolves the cycles**. The dead
barrels (src `timeline/index.ts`; demo `router/index.ts` + 4 barrels) are concrete, cross-validated
delete candidates. Every other family can consume these numbers directly.

**Family 2's ceiling (honest):** it decides placement and detects cycles/dead-code, but (i) needs an
explicit resolver config to be trustworthy at all, (ii) over-reports dead-code without test-entry
inclusion, (iii) cannot cut a god-file (module-granular only), and (iv) its edge-count placement must
be overlaid with family-relatedness to satisfy T3. It is a measurement substrate for a shape-family,
not a self-sufficient shape-thesis.
