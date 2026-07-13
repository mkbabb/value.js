# V · pass-1 · SPEC — Family 2 · GRAPH-PROJECTION

**Pass 1 · SYNTHESIZE · 2026-07-13 · author: pass-1 synthesizer.**
Distilled from `f2-graph-projection.md` + `p1-graph-projection.md` (Family 2, DOUBLE-covered — both
RAN madge@8 / dependency-cruiser + a deterministic runtime-vs-type-edge scanner; every number below is
measured, cross-validated by the two probes). Mechanism made concrete for D1–D4; no ranking.

---

## §0 The mechanism (what structure is DERIVED FROM)

The **measured static import DAG**. The physical tree is a PROJECTION of coupling: a single-consumer
module colocates INTO its consumer; a multi-consumer module floats to the nearest common ancestor;
cycles are the enemy; 0-reachability = dead code = deleted. Placement is a **computed output**, not a
human decree. Because the tree is computed, this family's "target tree" is not a hand-drawn sketch —
it is the **algorithm + the required pre-filters + the concrete carve/colocate/dead lists** below.

**The load-bearing reliability caveat (CC-4, gap a — the tool defaults produce a plausible-but-FALSE
graph)**: madge/dep-cruiser are reliable for this repo ONLY with (i) an explicit webpack-style
`resolve.alias` map — bare `tsConfig.paths` **silently under-resolved 343 edges** and reported
`usePaletteManager` fan-in as 0; (ii) `@vue/compiler-sfc` present (70/91 `.vue` resolve); (iii) **SCC
decomposition, never a raw cycle count** (madge said "23 circular" for **2** SCCs — an ~11.5× overstate).
The authoritative source of truth is the **~90-line deterministic scanner** (splits runtime vs
`import type` edges) — any F2 execution MUST wire it, or every count is silently wrong.

---

## §1 · D1 — demo/ frontend (the family's strongest surface: computed placement)

**The colocation engine, MEASURED** (§2 of both probes): ~40 single-consumer modules demo-wide;
the two worst A1 buckets dissolve algorithmically —

- **`composables/palette/` (12 files)**: 9 have `usePaletteManager` as their SOLE consumer → colocate
  INTO a `usePaletteManager` capsule; only `usePaletteManager` (fan-in 22) + `usePaletteStore` (2) float.
- **`composables/color/` (18 files)**: `useColorPipeline` is the local hub (6 single-consumers resolve
  to it) → colocate the pipeline cluster into color-picker; `keys.ts` (fan-in 26) + `useContrastSafeColor`
  (11) + `ink.ts` (5) are the true kernel. **Independently corroborates A1 + F3's consumer-count method.**
- **Dead demo code (gap b, cross-validated delete candidates)**: `router/index.ts` (0 fan-in AND
  unreachable — `usePaneRouter` superseded the vue-router shell, tranche B); **4 dead barrels**
  (`palette-browser/`, `panes/`, `status/`, `katex/` `index.ts` — consumers deep-import concrete files);
  `markdown/composables/{useMarkdownColors,useMarkdownHighlighting}`; the **ComponentSliders subtree**
  (5 files, 0 fan-in — **flag for VERIFY**, static graph is blind to `defineAsyncComponent`/`import()`);
  leaf orphans (`useHeaderCondense`, `DebugEventLog.vue`, `admin/{AdminListItem,PaginationBar}.vue`,
  `search/MiniColorPicker.vue`).
- **demo cycles (gap c)**: 3 SCCs — 12-node color-picker (spine: `keys.ts` imports `useColorPipeline`
  which chains back to `keys.ts` — a DI-key module importing a pipeline, an architectural inversion), 3
  gradient composables (no barrel), 2 `Dock.vue ↔ dock/index.ts` (pure barrel-membership). Root cause:
  **barrel-membership + global-bucket back-edges** — both dissolved by the colocation move.
- **demo top fan-in / kernel by measurement**: `lib/palette/types.ts` **42** (the #1 hub A1 MISSED — a
  cross-cutting type module for a kernel/types home, where F2 and F4 agree), `keys.ts` 26,
  `usePaletteManager` 22, `color-picker/index.ts` 21, `lib/palette/api/index.ts` 15, `useContrastSafeColor` 11.

## §2 · D2 — api/ backend (verify-not-restructure, graph-confirmed)

Tarjan on api/src (82 nodes): **0 non-trivial SCCs (fully acyclic), 0 route→repository edges.** The
`routes→service→repository` boundary IS a DAG assertion that holds by measurement — the
graph-independent corroboration of survey A2. D2 under F2 = verify.

## §3 · D3 — src/ library (cycles + fan-in name the carve; the graph cannot cut a god-file)

- **The cycle inventory (gap c, the load-bearing finding)**: src runtime = **2 SCCs / 20 nodes** —
  **SCC #1 the 16-node COLOR tangle** (`base · contrast · dispatch · index · mix · normalize · spaces`
  + 8 `conversions/*`) + **SCC #2 the 4-node PARSING tangle** (`parsing/color/{color,index,relative-color}`
  + `parsing/units`). Tranche-K's "acyclic color topology" goal is NOT met at runtime.
- **The concrete carve line (graph-DERIVED, not decreed)**: the color SCC is glued by **11 `from ".."`
  imports inside `conversions/*.ts`** (`..` = the aggregating `units/color/index.ts` barrel) + 2
  `from "../dispatch"`. The imported symbols are pure space CLASSES defined in `spaces.ts`/`base.ts`.
  **Carve = redirect the 11 `from ".."` → `from "../spaces"` (+ `../base`) and move the `ch<T>` helper
  off `index.ts` to a kind-named sibling (`channel.ts`).** That single edge-redirect shatters the 16-node
  SCC — and it IS glass-ui's own §2.1 pure-barrel + own-runtime-sibling law reached by a different
  derivation (F2 = F1 here). Lower bound: ≥6 SCC members detach immediately.
- **Dead code (gap b, method-corrected — CC-2)**: `parsing/timeline/index.ts` is **TRULY DEAD** (0
  importers anywhere; product + tests import `timeline/{easing,scroll-timeline}` DIRECTLY) → delete.
  `units/color/conversions/index.ts` is **TEST-ONLY-ALIVE** (3 test files import it) → **NOT dead**. A
  dead-code sweep MUST union `{product ∪ test ∪ e2e ∪ build}` reachability, or it deletes live test
  surfaces — the family's severest-failure-mode made concrete.
- **Fan-in ranking → carve priority (gap d, with a HARD LIMIT)**: `units/color/constants.ts` 22 (pure-data
  leaf, fine), `units/color/index.ts` 21 (barrel hub + cycle spine), `math.ts` 18 (kernel, fine),
  `units/index.ts` 17 (god-impl-barrel + spine), `parsing/utils.ts` 11, `dispatch.ts` 10 in / **14 out**
  (genuine color hub — high both ways, split with care). **Hard limit**: the module graph treats a 754-LoC
  file (`parsing/color/color.ts`) as ONE node — it ranks WHICH file to split by coupling but **cannot
  compute the intra-file split line** (needs symbol-level ts-morph — F2 hands the actual cut to F6).

## §4 · D4 — repo hygiene

Dead-code culled by reachability from the UNIONED entry set (CC-2); litter is graph-invisible → delete.
The cross-validated concrete delete list is the D4 seed: src `parsing/timeline/index.ts`; demo
`router/index.ts` + the 4 dead barrels + the markdown composables. `conversions/index.ts` is KEPT (test
surface). The ComponentSliders subtree is flagged for a dynamic-import verify before any deletion.

---

## §5 · Gate shapes this family lands

The graph substrate feeds gates rather than owning a battery: a **runtime-edge `proof:barrel-cycle`**
(CC-1 — MUST deflate type-only edges or it fires 23 RED for 2 tangles), a **union-entry dead-code gate**
(CC-2), and a **fan-in report** feeding god-module carve priority. Placement decisions are a strong
INPUT to a colocation gate, not a sufficient decision rule (CC-5).

## §6 · What the pass-2 prototype MUST demonstrate (measured, isolated worktree)

1. **Run the deterministic scanner (with the alias map)** → emit the authoritative SCC + union-entry
   dead-code + fan-in JSON for src and demo (the reproducible substrate every family consumes).
2. **Prove the color-SCC carve compiles green** (the open item p1 flagged SPEC-ONLY): in an isolated
   worktree redirect the 11 `from ".."` → `from "../spaces"` + move `ch` → `channel.ts`; then `npm run
   typecheck` exit 0 **and** re-run Tarjan → the 16-node SCC is GONE. Evidence: typecheck exit + the
   before/after SCC node count.
3. **Delete `parsing/timeline/index.ts`** → typecheck + `npm test` green (confirms genuinely-dead).
4. **Demonstrate the union-entry correction**: show product-only reachability flags `conversions/index.ts`
   as dead, and the `{product ∪ test}` union correctly spares it.

## §7 · Honest current weaknesses

- **Graph-blindness to CONCEPTUAL cohesion**: the import edge is not the concept — a util imported
  everywhere floats to root and becomes the exact grab-bag glass-ui bans; two files that ARE one concept
  but share no edge get scattered.
- **Unstable placement**: structure re-computes on every refactor (the family's own "churns" mode,
  confirmed by the tool-dependent raw cycle count).
- **Over-reports dead-code** without test-entry union (CC-2); **cannot cut a god-file** (module-granular
  only, gap d hard limit); **the single-consumer heuristic mis-fires on public leaves + barrel members**
  (`units/interpolate.ts`, `units/normalize.ts` have `index.ts` as sole consumer — must pre-filter entry
  + barrel-index nodes, CC-3).
- **T3 contradiction, quantified (CC-5)**: the graph counts EDGES; T3 asks "≥2 UNRELATED families" — a
  semantic judgment the DAG cannot supply (`keys.ts` 26 edges vs 6 feature areas). Raw graph count DOES
  contradict T3 at the margin.

## §8 · Composition (facts, NOT a ranking)

Both probes conclude identically: F2 is a **strong DIAGNOSTIC substrate, a weak sole AUTHORITY** — it
produces the exact reproducible carve/dead/cycle/fan-in numbers no other family can, but its placement
decree needs a human/semantic filter (CC-5), so it COMPOSES under a shape-family (F1/F3), it does not
replace one. **Convergence facts** (reported as facts): the color-SCC carve F2 derives IS glass-ui §2.1
(= F1); `lib/palette/types.ts` (42 fan-in) as a kernel/types home is where F2 and F4 agree; the api
acyclic-DAG confirmation is shared with F1/F3 (D2 = verify). F2 hands the intra-file cut to F6's tooling.
