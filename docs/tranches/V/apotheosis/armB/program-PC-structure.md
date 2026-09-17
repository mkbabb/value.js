# PROGRAM PC-STRUCTURE — the structure tranche program (both libraries + both demo component trees)
### armB independent Fable formation · 2026-07-19

**Pins (G0′):** value.js `tranche-u@c654824e` (src-identical to canon `db77dbd8`; `git diff db77dbd8..HEAD -- src package.json` = empty) · kf `keyframes-v-exec master@81a56990` (letters' `0dac636b` +2 docs-only commits) · glass-ui `cdc322b9` · atlas ACTIVE `.p-totality/atlas@fe9abcf` · parse-that `ef10d5b`. Re-pin at every wave execution (§7.2 law).
**Provenance:** L1 = `keyframes-inbox-2026-07-18-vnext-ingestion-prompt.md`; L2 = the P0–P6 packets; C# = CONVERSATION-ADDENDA (addenda WIN); sweeps = `armB/sweep-{value-lib,kf-lib,value-demo,kf-demo}.md` (all four present, all read). Independence firewall honored: zero Codex-corpus reads.
**Phase label (§7.4):** this document is FORMATION output; its waves bind the implementation phase.

---

## §1 — PROGRAM CHARTER

1. This program owns the STRUCTURE slice of the mega-tranche (C8): target module/directory
   structures for the value.js library, the keyframes.js library, both demo component trees,
   and the `/api` backend — derived from machine DAGs, never hand-drawn (L1 §8).
2. Method is DAG-thrice (C20): dynamic bespoke cluster batches, each viewed by 2 Fable
   skeptics + 1 Fable adjudicator; convergence = two consecutive clean passes; ≤3 iterations
   per cluster before owner escalation.
3. Every gate is born-RED wherever the defect is live today, and this doc says what RED looks
   like, with file:line evidence from the truth sweeps.
4. Surfaces stay FROZEN until the ONE co-land boundary (P4.2): all restructures are internal;
   this program emits a boundary-delta manifest, never its own surface cut.
5. kf library waves are SPECS + bounded dispatches into kf's coordination inbox (P4.5);
   direct cross-repo edits only under explicit owner grant (OD-S4).
6. Governance: kf structure waves AMEND the ratified LT blueprint + EXTEND proof:structure,
   naming LT-10/LT-16 superseded (P4.4 G5′) — never a parallel authority.
7. KISS/parsimony (C21) throughout: fewer, well-cut waves; goldilocks granularity — no
   god-modules, no sand; glass-ui is the reference model for flattening/component idioms.
8. Model routing (C17): Fable for every design cut, thrice seat, and adjudication; Opus for
   mechanical sweeps (DAG runs, rename churn, import rewrites, purges). Every seat reports
   `model_served` — a declaration is not execution (P0.1).

---

## §2 — THE TARGET STRUCTURES (evidence-anchored)

### 2.1 value.js library (26 TS files, 0 cycles, 4,647 core LOC — sweep-value-lib §1–2)

```
src/
  foundation/      result + math (+index)          — result.ts 6-LOC sand folds into an index
  color/           model · tables · convert · operations (+index)
                   — anchors.ts 377 splits: constant tables vs 23 conversion fns
                   — color program (R-DELTAE/R-GAMUT/R-INTO) lands INTO this skeleton
  css/             TARGET SKELETON ONLY (contract): grammar/ · collect/ · serialize/ ·
                   types.ts · named-colors.ts (+index) — the R-PARSER restoration
                   (parser program) lands INTO it; no pre-churn of the dying regex parser
  transform/       path.ts (+ real index.ts)        — decompose.ts PRUNED (609 LOC, 0 consumers)
  easing.ts value.ts                                — kf-consumed spines stay (P3.2)
  (quantize.ts → demo)  (subpaths/ → deleted)
```
- Exports: the 7 keys FROZEN, each retargeted to explicit `dist/<dir>/index` (D50
  api-extractor boundary); `./quantize` key drop + `collectDeclarations` trim ride the
  co-land boundary with §7.1 tombstones.
- One abstraction-boundary leak healed: `css/grammar.ts → color/anchors` direct edge
  (madge-verified) routes through the color module door.
- test/ re-mirrors src/ exactly; demo-coupled tests (11 measured) displace to `demo/test/`;
  the ghost `test/parsing/` dies; one import idiom (3 coexist today).

### 2.2 keyframes.js library (single `src/animation/**` tree — sweep-kf-lib §1)

```
src/               ← FLATTENED from src/animation (13 anchors re-derived; ~340 external +
  engine/ compile/ resolve/ group/ waapi/ physics/ orchestration/ svg/ scroll/
  ingest/ presets/ constants/ <internal-successor>/     648 intra-src import lines)
  easing.ts index.ts load-engine.ts public.ts validate.ts
```
- Exports exactly `.` + `./engine` frozen; **`./engine`'s source is `public.ts`, NOT
  `engine/index.ts`** (vite.config.ts:172 + engine-dts-rollup.ts:34) and it has a LIVE
  external consumer (atlas `MorphSVG`, buildMarkAnimation.ts:7) — P4.1.
- `internal/` (535 LOC / 9 leaves / **11** importers, not P3.1's "10") restructures per
  OD-S1; the depcruise leaf-law key `.dependency-cruiser.cjs:171` moves with any rename.
- Zone membership (what lives at all) is the zones program's docket; this program moves
  only what survives it — flatten waits for the prune/owner-decision verdicts.

### 2.3 value.js demo (259 files, single app — sweep-value-demo §1–3)

Largely compliant post-W43 (14 colocated `composables/`, no god-bucket). Deltas: `demo/ui/`
(19 one-line barrels, 48 importer sites) DISSOLVES onto direct `@mkbabb/glass-ui` imports
(79 files already direct — the two-track inconsistency dies); stale root `components.json`
(dead `demo/@/components` path, Sass cite) DELETED; 4 reka-ui `AcceptableValue` type leaks
closed via a glass-ui-exported type (BH relay if absent). C5 headline: shadcn is ALREADY
component-abrogated — zero missing glass-ui equivalents (all 17 barrel families have homes);
the "prototype missing components" branch of C5 is EMPTY-SET on evidence.

### 2.4 keyframes.js demo (58 vue / 127 ts — sweep-kf-demo)

Mature glass-ui-native single-screen SPA; ZERO shadcn/reka imports (C5 already satisfied).
Structure work is narrow: `transport/` (~30 files) goldilocks re-cut; scene-registry
colocation audit; a per-scene `document.title` structural hook. Mobile defects
(viewport-fit, non-cube multi-touch) are frontend-program rows, handed off by name (§7).

### 2.5 api/ (125 .ts files — C7 reconciliation)

**STAYS at `/api`** — the owner's later C7 ruling supersedes P3.2's EXTRACT row (OD-S3
ratifies). The EXTRACT row's motivation (zero library imports; standalone character) is
honored via in-repo boundary hardening: its own DAG, an enforced no-library-src-import rule,
goldilocks module re-cut, and CRUD-resource isomorphism to fourier-analysis' CRUD
visualization API.

---

## §3 — THE DAG-THRICE BATCHING PLAN (C20, executable)

DAGs are machine-derived (madge/depcruise; value src DAG already captured at
`armB/madge-src.json` — 26 files, 0 cycles), then ADJUDICATED. Cluster batches are dynamic
and bespoke — re-cut by the wave-01 adjudicator as evidence accrues; the list below is the
opening cut:

| Cluster | Contents | Primary waves |
|---|---|---|
| V-LIB-A | value foundation/ + color/ + root spines (value.ts, easing.ts, quantize) | 05, 06 |
| V-LIB-B | value css/ skeleton contract (parser-program-coordinated) | 06 |
| V-LIB-C | value transform/ + subpaths/ + package/export surface | 04, 05 |
| V-TEST | value test tree + gates | 02, 03 |
| V-API | value /api + fourier CRUD-viz reference | 07 |
| V-DEMO-A | demo shell/ + platform/ + color-session/ + ui/ | 12 |
| V-DEMO-B | demo palettes/ + workbenches/ + picker/ + scenes/ | 12 |
| K-LIB-A | kf root files + internal/ + constants/ | 08, 09 |
| K-LIB-B | kf engine/ compile/ resolve/ group/ waapi/ | 08 |
| K-LIB-C | kf physics/ orchestration/ svg/ scroll/ ingest/ presets/ (zone-verdict-coupled) | 08 |
| K-TEST | kf test tree + proof:structure extension | 10 |
| K-DEMO | kf demo app/scene/transport/keyframes/timeline | 13 |
| X-NAMES | cross-repo rename/stripping census | 11 |

Per cluster: 2 fresh Fable skeptics assume the structure is WRONG and propose alternatives;
1 Fable adjudicator proves/disproves with its own evidence (never vote-counts). Convergence
= two consecutive clean passes; ≤3 iterations → owner escalation. Consumer-edge truth is
always the four-tree census at pinned HEADs (P3 method note) — five zones nearly died of an
unrun census; never repeat it.

---

## §4 — THE WAVE SET

### F-PC-structure-01 | both repos + both demos | THE DAG DERIVATION + CLUSTER CUT
- **Intent:** derive the full machine DAGs (value src refresh + value demo component graph;
  kf src + kf demo via depcruise/madge; api/ graph; four-tree consumer edges), then cut the
  §3 cluster batches and open the thrice registry. Nothing downstream moves without a
  cluster brief.
- **Deliverables:** committed DAG artifacts (JSON + cycle report) under the program's
  evidence dir; cluster map; per-cluster target-structure briefs; the thrice registry.
- **Acceptance gates:** every edge machine-derived (tool output archived; zero hand-drawn
  edges); value src reproduces 26-files/0-cycles or the delta is explained; every later
  wave cites its cluster brief.
- **Dependencies:** none (program opener).
- **π/DELTA:** none (no visual claim).
- **Model routing:** Opus for the tool runs/extraction; Fable for the cluster cut + briefs.

### F-PC-structure-02 | value.js | THE SHARED STRUCTURE GRAMMAR + VALUE GATES, BORN-RED
- **Intent:** build the value↔kf structural-isomorphism ABSTRACT FACILITY: kf's live
  proof:structure R1–R6 ruleset (755L, selftest-proven) abstracted into a portable rule
  SPEC + shared selftest vectors; implementations stay per-repo (KISS — no new package).
  Instantiate on value: the ported structure gate + a NEW tests-isomorphism rule.
- **Deliverables:** the shared rule spec (R1 stutter · R2 fragment/hollow-shim · R3
  impure-barrel · R4 500-line ceiling · R5 kind-dir ban · R6 unused-exports + new R-ISO
  test-mirror rule); value gate implementation + `--selftest`; glass-ui named as the
  flattening/component-idiom reference in the spec's prose.
- **Acceptance gates (BORN-RED, defects live today):** ported R4 RED on
  `css/stylesheet.ts` (899), `transform/decompose.ts` (609), `transform/path.ts` (564);
  R-ISO RED on: ghost `test/parsing/` (mirrors a deleted src dir), 11 demo-path-referencing
  tests at library test/ root, missing `test/{color,css,foundation,subpaths}` mirrors, and
  3 coexisting import idioms (16× `../src/subpaths/*`, 1× `@src`, 7× packed). Selftest
  proves every rule can pass AND fail.
- **Dependencies:** F-01 (cluster brief V-TEST).
- **π/DELTA:** none.
- **Model routing:** Fable (facility design + rule cut); Opus for grep census feeding RED
  fixtures.

### F-PC-structure-03 | value.js | TEST-TREE RE-MIRROR + DEMO-TEST DISPLACEMENT
- **Intent:** flip F-02's R-ISO green: re-mirror test/ to src/, displace the demo-coupled
  tests out of the library root, and unify the import idiom.
- **Deliverables:** `test/{foundation,color,css,transform}/` mirrors; the 11
  demo-referencing tests moved to `demo/test/` (existing home, 3 files today); ghost
  `test/parsing/` deleted; one library idiom (`../src/...`) + a small, separately-named
  packed-surface suite (the 7 `@mkbabb/value.js/*` tests are a deliberate surface probe,
  not drift).
- **Acceptance gates:** R-ISO GREEN; test-count parity pre/post (no test silently lost —
  vitest count diff = 0); packed-surface suite still passes against a fresh pack.
- **Dependencies:** F-02.
- **π/DELTA:** none.
- **Model routing:** Opus mechanical moves; Fable adjudication of the packed-suite boundary.

### F-PC-structure-04 | value.js | MANIFEST + EXPORT SURFACE: deps STRIP · manifest gate · subpaths DISSOLUTION
- **Intent:** kill the registry-cycle bomb and dissolve `subpaths/` with the 7 keys frozen.
  The deps block is COMMITTED on tranche-u (`git show HEAD:package.json` →
  `dependencies: {"@mkbabb/glass-ui":"^7.0.0","@mkbabb/keyframes.js":"^6.0.0"}`) — the
  letters' "working-tree-only" phrasing is stale on this branch (sweep §4).
- **Deliverables:** deps STRIP/RELOCATE → devDependencies; pre-publish manifest gate (no
  runtime deps, no self-dep — prior art: value shipped a SELF-dependency v1.1.0–v2.0.1,
  packed-surface parity); `subpaths/*.ts` (163 LOC, pure re-export homes, zero top-level
  runtime logic — verified) deleted in favor of real per-dir `index.ts` incl. a NEW
  `transform/index.ts`; exports map retargeted with explicit `/index` specifiers (D50);
  the boundary-delta manifest for the co-land wave: `./quantize` key drop +
  `collectDeclarations` trim (exported at css/index.ts:54, 0 external consumers), each
  with a §7.1 tombstone draft.
- **Acceptance gates (BORN-RED):** the manifest gate is RED at HEAD on the committed deps
  block — its first green IS the strip. Packed-surface re-verify: `npm pack` +
  api-extractor surface diff = keys and types unchanged (7 keys, same symbol set).
- **Dependencies:** F-01; F-03 (packed-surface suite is the witness).
- **π/DELTA:** none.
- **Model routing:** Fable for the export-map cut; Opus for the pack-diff harness.

### F-PC-structure-05 | value.js | PRUNE/DEMOTE/PURGE: decompose · quantize · PNGs · hygiene
- **Intent:** execute the evidence-settled removals under the tombstone law.
- **Deliverables:** `transform/decompose.ts` PRUNED (609 LOC; four-tree grep re-run at
  execution — today: 0 real consumers; the only `/transform` imports anywhere are kf's two
  `PathGeometry` sites); `quantize.ts` DEMOTED to the demo extract workbench (its only
  consumers: quantize-worker.ts, useImageQuantize.ts, useExtractSession.ts); 39 root PNGs
  deleted; `src/.DS_Store` + `test/.DS_Store` purged; §7.1 tombstones authored (decompose:
  RIGHTLY, zero-consumer evidence; quantize: RIGHTLY-demoted, demo-only evidence).
- **Acceptance gates:** capability-diff gate (gates-program dependency, P3.4 row 6) RED on
  any removal lacking a by-name tombstone → GREEN with them; four-tree consumer grep
  re-derived at execution HEADs (§7.3) and archived; library build + full suite green
  post-prune; demo still builds with quantize at its new home.
- **Dependencies:** F-01; OD-S2 (prune vs kf-adoption) RULED; capability-diff gate exists
  (external: gates program).
- **π/DELTA:** none (repo-root PNGs are not a rendered surface).
- **Model routing:** Opus mechanical; Fable tombstone prose + adjudication.

### F-PC-structure-06 | value.js | LIBRARY GOLDILOCKS RE-CUT + THE css/ SKELETON CONTRACT
- **Intent:** cut the surviving library to goldilocks: split the data/logic blend, heal the
  one abstraction leak, consolidate sand — and author the css/ TARGET SKELETON as a binding
  contract the parser program's R-PARSER restoration lands into (no pre-churn of the dying
  regex parser; stylesheet.ts's R4 RED transfers to the parser program by name).
- **Deliverables:** `color/anchors.ts` (377) split into constant tables vs the 23
  conversion fns; `css/grammar.ts → color/anchors` direct edge rerouted through the color
  module door; `foundation/result.ts` (6 LOC) folded; css/ skeleton contract doc
  (grammar/ · collect/ · serialize/ split, types + named-colors data homes) co-signed by
  the parser program; `transform/path.ts` (564) split-or-allowlist per OD-S6.
- **Acceptance gates:** ported R1–R6 GREEN on all touched files; madge re-run: 0 cycles,
  leak edge gone; R4 remains RED ONLY on `stylesheet.ts` as a tracked, named handoff
  (OD-S5 — never silently allowlisted).
- **Dependencies:** F-02 (gate exists); F-05 (decompose/quantize already out); thrice
  clusters V-LIB-A/B converged.
- **π/DELTA:** none.
- **Model routing:** Fable (this is the design heart of the value-lib slice).

### F-PC-structure-07 | value.js /api (+ fourier reference) | API RECONCILIATION + STRUCTURE
- **Intent:** execute the C7 reconciliation — api/ STAYS at `/api` (C7 supersedes P3.2's
  EXTRACT; OD-S3 ratifies) — and give the backend the same structural treatment, abstracted
  befitting its stack (L1 §4).
- **Deliverables:** api/ machine DAG; goldilocks re-cut plan for the 125 files;
  an enforced no-library-src-import boundary rule (api imports the PUBLISHED surface or
  nothing); the full facility census C7 demands — history, variants, all CRUD, mixing —
  as a spec doc with every gap a registry row routed to the api-facility program; the
  isomorphism map to fourier-analysis' CRUD visualization API (resource grammar, route
  shapes, error/ETag idioms — value's demo client already carries ETag/ifMatch optimistic
  concurrency at palettes.ts:121,133).
- **Acceptance gates:** boundary rule live + selftest-fallible; DAG cycle-free or cycles
  adjudicated; census coverage = every exported route/facility has a spec row (RED on any
  uncensused route — countable).
- **Dependencies:** F-01; OD-S3 ruled.
- **π/DELTA:** none.
- **Model routing:** Opus census/extraction; Fable API-design + isomorphism adjudication.

### F-PC-structure-08 | keyframes.js (SPEC-DISPATCH, P4.5) | THE src/animation FLATTEN — AMENDING THE LT BLUEPRINT
- **Intent:** author + dispatch the executable flatten spec: `src/animation/** → src/**`,
  as a coordinated config-and-graph move, born-RED at every anchor. The spec AMENDS the
  ratified LT blueprint and names **LT-10** (kept `internal/` against a 40+-importer census
  — the owner's edict supersedes the taste ruling; the cost census stands) and **LT-16** as
  superseded (P4.4 G5′ — never a parallel authority).
- **Deliverables:** the flatten spec with all 13 config/gate anchors RE-DERIVED at the
  execution HEAD (§7.3; the sweep's re-derivation at `81a56990` already found 3 drifted:
  vite alias :41→:37, lib entry :156→:153, rootDir :229→:227 — the mandate is vindicated
  on live evidence); the import-churn ledger (~340 external: test 265 + bench 32 + scripts
  + demo; 648 intra-src relative lines); the frozen-surface constraints (exports exactly
  `.` + `./engine`; `./engine` sources from `public.ts`; atlas `MorphSVG` is a live
  external consumer); the depcruise key-move list (LIGHT_FROM :84, ENGINE_PATH :93,
  internal-leaf :171); the post-move triple verify (44-key engine mirror re-executed +
  `proof:structure --selftest` + full depcruise `lint` run).
- **Acceptance gates (BORN-RED):** an anchor-census gate asserting the post-flatten paths
  is authored RED before the move; RED today = all 13 anchors point at `src/animation/*`.
  GREEN requires the triple verify + zero surface diff on the packed exports.
- **Dependencies (HARD, external):** gates program lands P3.3 rows 1/2/7 FIRST — W9
  quartet (staged at `v/w9-staging@b920b190`, confirmed existing), MR2/MR4 wired, and
  `lint` + `proof:structure` CI-wired (confirmed in NO workflow today) — the sequencing
  law: enforcement before ~340-line churn. Zones program's prune/owner-decision verdicts
  RULED (never flatten code that is about to die). OD-S4 (dispatch vs direct-edit grant).
- **π/DELTA:** none (library-internal; demo import paths re-verified by build).
- **Model routing:** Fable spec authorship + thrice; Opus for the churn execution (kf-side,
  under whatever mode OD-S4 grants).

### F-PC-structure-09 | keyframes.js (SPEC-DISPATCH) | internal/ RESTRUCTURE + kf GOLDILOCKS RIDERS
- **Intent:** execute the owner's `internal/` mandate (restructure, NOT prune — every one
  of the 9 leaves is consumed; measured fan-in **11** importers: 8 zones + index/public/
  easing roots) per the OD-S1 ruling, plus the kf goldilocks riders.
- **Deliverables:** the restructure spec per the ruled OD-S1 option; the depcruise
  value.js-free-leaf law re-keyed with the rename (`.dependency-cruiser.cjs:171` — the key
  moves with any rename, P4.1); rider: `engine/play-lifecycle` 552L/5-file fragmentation
  recombined (P3.1 shrink note).
- **Acceptance gates:** depcruise leaf law provably still binding post-move (selftest: a
  planted violation fails); proof:structure fully green; 44-key mirror re-executed.
- **Dependencies:** F-08 landed; OD-S1 ruled.
- **π/DELTA:** none.
- **Model routing:** Fable option design; Opus churn.

### F-PC-structure-10 | keyframes.js (SPEC-DISPATCH) | TESTS-ISOMORPHISM RULE + SUPPORT ALLOWLIST + CLAMP FOLD
- **Intent:** give kf the missing enforcement: proof:structure gains a NEW test-mirror rule
  + support-dir allowlist (the tree is de-facto isomorphic — 12 test dirs one-to-one with
  the src zones — but NO rule locks it; honest framing: this gate is born-GREEN-on-tree,
  proven fallible by selftest, NOT contrived-RED). Rider (P3.3 row 5): fold
  boundary-cohesion's clamp-single-site invariant into proof:structure BEFORE that file
  dies — neither depcruise nor R6 carries it.
- **Deliverables:** the R-ISO(kf) rule; the allowlist `{_root, characterization, demo,
  fixtures, support}` formalized; the clamp invariant as a proof:structure rule; selftest
  vectors added to the shared facility (F-02) so value and kf prove the SAME grammar.
- **Acceptance gates:** `--selftest` proves the new rules can pass AND fail; a planted
  drift (one test file in a wrong zone dir) goes RED; shared-facility vector parity with
  value's gate.
- **Dependencies:** F-02 (shared facility); F-08 (rule anchors on the post-flatten tree —
  author once, not twice).
- **π/DELTA:** none.
- **Model routing:** Fable rule design; Opus vector generation.

### F-PC-structure-11 | both repos + both demos (Opus sweep) | MODULE-NAME STRIPPING + RENAME CENSUS
- **Intent:** the C11/L1-§4 stripping edict (`easing/easing-option.ts` → `easing/option.ts`)
  executed as a censused mechanical sweep. kf src is already R1-guarded (dir-prefix stutter
  rule live); the unguarded trees are value src, value demo, kf demo — census there, rename
  by map, and let the ported R1 (value) + the demo-tree conventions hold the line.
- **Deliverables:** the rename map (thrice-reviewed BEFORE execution); executed renames +
  import rewrites; a demo-tree naming convention note in the shared facility spec
  (glass-ui idioms as the reference).
- **Acceptance gates:** ported R1 green on value post-rename; `vue-tsc`/`tsc` green on all
  four trees; zero grep hits for the old specifiers; test/build counts unchanged.
- **Dependencies:** F-02 (value gate live); F-06 (rename against the final module cut, not
  the interim one); kf-side rides F-08/F-09 dispatches.
- **π/DELTA:** none (renames only).
- **Model routing:** Opus mechanical (this is the canonical C17 Opus wave); Fable only on
  the map review.

### F-PC-structure-12 | value.js demo | DEMO STRUCTURE: ui-BARREL DISSOLUTION + C5 STRUCTURAL CLOSE
- **Intent:** finish the structural half of C5 on value's demo: single-track glass-ui.
  Evidence: `demo/ui/` = 19 one-line re-export barrels routing 48 import sites onto
  `@mkbabb/glass-ui`, while 79 files already import directly — dissolve the barrels, unify
  the tracks. No component reimplementation exists to do: every barrel family has a
  glass-ui home (the C5 "prototype missing components" branch is EMPTY-SET here).
- **Deliverables:** `demo/ui/` deleted; 48 sites rewritten to direct glass-ui imports
  (correct subpaths: `/forms` for Input, etc.); stale root `components.json` deleted (dead
  `demo/@/components` path, Sass cite); the 4 reka-ui `AcceptableValue` type leaks
  (MixConfigBar.vue:15, GenerateControls.vue:33, AuroraPane.vue:25,
  GradientVisualizer.vue:28) rerouted through a glass-ui-exported type — with a BH-inbox
  relay letter to glass-ui if the export is missing (standing relay edict);
  `ActionBarLayer.vue:62-81` local `useLayerTransition` shim entered as a
  retire-on-adopt registry row; colocation residue audit (tree is largely compliant
  post-W43 — confirm, don't churn).
- **Acceptance gates:** grep `from "../ui/|/ui/` under demo = 0; grep `from "reka-ui"` = 0;
  demo typecheck + build green; DELTA parity (below) holds.
- **Dependencies:** F-01 (V-DEMO cluster briefs); glass-ui relay answered for the type
  export (or a typed local alias documented as the interim, tracked — NO silent shim).
- **π/DELTA obligations:** π claim = "barrel dissolution is render-identical" (it IS
  glass-ui on both sides). DELTA = before/after screenshot pairs on a parsimonious route
  set (picker `/`, palettes `/palettes`, one workbench `/gradient`), desktop + mobile
  viewport; RED = any non-noise pixel delta. Probe parsimony law applies (C21).
- **Model routing:** Opus import rewrites; Fable adjudicates the type-leak closure + DELTA.

### F-PC-structure-13 | keyframes.js demo (SPEC-DISPATCH or grant) | KF DEMO STRUCTURE PASS
- **Intent:** the narrow structural debt of a mature tree: `transport/` (~30 files)
  goldilocks re-cut; scene-registry/colocation audit; a per-scene `document.title`
  structural hook (value demo's `installDocumentTitle` is the reference — kf's title is
  static today). kf demo needs NO shadcn work (zero shadcn/reka imports — C5 already
  satisfied) and its cube is the multi-touch reference implementation.
- **Deliverables:** transport re-cut spec; colocation audit note; the title hook;
  explicit HANDOFF rows (not waves here): viewport-fit=cover one-liner + non-cube
  multi-touch (C4) + all visual refinement → the frontend program, by name.
- **Acceptance gates:** kf demo typecheck/build green; proof:structure untouched-green
  (demo out of its birth scope — noted, not extended here); the handoff rows exist in the
  registry with owning-program names (zero silent drops).
- **π/DELTA:** π claim = "transport re-cut is behavior-preserving"; DELTA = before/after
  screenshot pair on one scene (cube) + transport controls open, mobile viewport.
- **Model routing:** Fable re-cut design; Opus churn.

### F-PC-structure-14 | program-wide | STRUCTURE CLOSE: CONVERGENCE + BOUNDARY MANIFEST + ZERO-DROP CHECK
- **Intent:** close the program the way the charter demands: thrice convergence per
  cluster, every gate green or a NAMED tracked-RED handoff, the boundary-delta manifest
  delivered, and the landing table (§6) re-audited row by row.
- **Deliverables:** per-cluster convergence records (two consecutive clean passes);
  the boundary-delta manifest handed to the co-land wave (`./quantize` key drop,
  `collectDeclarations` trim, any renamed public symbol — each tombstoned §7.1); glass-ui
  relay letters logged; the zero-drop audit vs §6 (every row landed or named-handed-off);
  registry rows for every partial (terminal dispositions only — folded/banked/retired).
- **Acceptance gates:** no cluster below 2-clean-passes; the only RED gates remaining are
  the two NAMED transfers (stylesheet R4 → parser program; capability-diff pre-tombstone
  states → resolved); zero unlanded §6 rows.
- **Dependencies:** all prior waves.
- **π/DELTA:** aggregation only — verifies F-12/F-13 DELTA artifacts exist on disk
  (declared-captures-missing is a close-class lie).
- **Model routing:** Fable close adjudication.

---

## §5 — OWNER-DECISION DOCKET (rows this program surfaces)

| ID | Decision | Options + pricing | Recommendation |
|---|---|---|---|
| OD-S1 | kf `internal/` target shape | (a) distribute the 9 leaves to nearest-consumer zones + tiny shared residue; (b) rename to a first-class primitives home (leaf law re-keyed); (c) split: scheduler/raf leaves → engine, errors/reduced-motion → constants-adjacent. Pricing = LT-10's 40+-importer census (stands) + measured fan-in 11 | (b) — cheapest true fix of the owner's dislike; leaf law preserved verbatim |
| OD-S2 | `transform/decompose.ts` PRUNE vs decided kf-adoption wave (P3.2's parenthetical) | prune = −609 LOC, 0 consumers on all four trees (re-verified); adopt = new kf surface with zero demonstrated demand | PRUNE, tombstone RIGHTLY |
| OD-S3 | api/ EXTRACT (P3.2) vs STAY (C7) | C7 is the LATER owner ruling — stay + harden. Ratify so the P3.2 row gets a terminal disposition (superseded), not a silent drop | STAY at `/api`; P3.2 row RETIRED-superseded with rationale |
| OD-S4 | kf wave delivery mode | P4.5 default = spec-dispatch into kf inbox; direct cross-repo edits need explicit grant. C8's mega-tranche span implies possible direct mode | dispatch by default; owner grants direct mode per-wave if the kf successor is this same formation |
| OD-S5 | stylesheet.ts R4 tracked-RED carry | accept a live RED (honest signal) until R-PARSER lands vs temporary allowlist entry (masks) | tracked-RED, named transfer to the parser program — allowlisting is the masked-fallback lie |
| OD-S6 | `transform/path.ts` (564 > 500) | split (geometry vs parsing/serialization concerns) vs single R4 allowlist row with rationale | split at the natural seam if thrice finds one; else a REASONED allowlist row (R4's allowlist exists for exactly this; kf's is empty — keep value's near-empty) |

---

## §6 — THE LANDING TABLE (every relevant letter/packet/addenda row → where it lands)

| Row | Lands |
|---|---|
| L1 §4 "kf flatten + internal/ coordinated, born-RED at every anchor; 13 anchors + ≈340 lines; re-derive (N-ADJ-3)" | F-08, F-09 |
| L1 §4 "structure governance: AMEND LT blueprint, name LT-10/LT-16; internal/ OWNER-DECISION (restructure, not prune)" | F-08 (amendment), OD-S1/F-09 |
| L1 §4 "subpaths dissolves — 7 keys frozen, explicit /index (D50), drops ./quantize, real transform/index.ts, packed re-verify" | F-04 (dissolution + manifest; `./quantize` drop rides co-land w/ tombstone) |
| L1 §4 value hygiene: decompose PRUNE · quantize DEMOTE · api EXTRACT · 39 PNGs · demo-test displacement · deps STRIP + manifest gate | F-05 (prune/demote/PNGs), F-07+OD-S3 (api, reconciled with C7), F-03 (displacement), F-04 (deps+gate) |
| L1 §4 "goldilocks everywhere; strip module names; glass-ui the reference model" | F-06, F-11, F-02 (spec prose) |
| L1 §4 "tests-isomorphism born-RED BOTH repos: value from scratch + re-mirror; kf new rule + allowlist" | F-02/F-03 (value, born-RED as specified), F-10 (kf; honestly born-GREEN-on-tree + selftest-fallible — the tree already mirrors) |
| L1 §4 demo bullet: recursive colocation | F-12/F-13 (structural facet; audit-confirm, no churn where compliant) |
| L1 §4 demo bullet: Aristotelian proportionality audit · glass-ui suffusion · glass defect batching · W53 plate connection | HANDOFF → frontend program (named in F-13 deliverables + §7 below) |
| L1 §6 / P4.2 one co-land boundary; internal-only until; no stale-atlas wave; STRIP-not-bump | Charter §1.4; F-04 boundary manifest; F-14 delivery |
| L1 §7.1 tombstone law + capability-diff gate | F-05 tombstones; gate dependency on gates program (P3.4 row 6) declared in F-05 |
| L1 §7.2 G0′ pins · §7.3 re-derive anchors · §7.4 phase labels | Header pins + every wave; F-08 core mechanism + F-05 four-tree re-grep; header label |
| L1 §8 / C20 DAG-thrice, depcruise-derived, dynamic clusters, convergence law | §3 plan; F-01, F-14; every wave's thrice note |
| P3.1 internal/ row (535 LOC, fan-in) | F-09 + OD-S1 (fan-in corrected 10→11 on measurement) |
| P3.1 play-lifecycle 552L/5-file shrink note | F-09 rider |
| P3.1 zone verdicts, presets breadth, emit-shrink, zone-test binding, fence annex | HANDOFF → zones program; F-08 depends on its rulings (never flatten dying code) |
| P3.2 decompose PRUNE · quantize DEMOTE · subpaths DISSOLVE · api EXTRACT · deps STRIP · PNGs/demo-tests · demo restructure | F-05 · F-05 · F-04 · F-07/OD-S3 · F-04 · F-05/F-03 · F-12 |
| P3.2 color RESTORE program / css parser REWRITE | HANDOFF → color program / parser program; F-06 provides the skeletons they land into |
| P3.3 rows 1 (W9 land, `b920b190` confirmed extant), 2 (wire lint+proof:structure — confirmed in NO workflow), 7 (MR2/MR4 before churn) | External HARD dependencies of F-08 (gates program executes; this program sequences) |
| P3.3 row 5 boundary-cohesion clamp fold-then-die | F-10 rider |
| P3.4 row 3 isomorphism gate + displacement | F-02/F-03 |
| P3.4 row 4 pre-publish manifest gate | F-04 |
| P3.4 rows 1,2,5,6 (producer+api scope, e2e set, bench, capability-diff) | HANDOFF → gates/parser programs; F-05 consumes row 6's gate |
| P4.1 fences: TimingFunction frozen · exports `.`+`./engine` · 44-key mirror by execution · leaf-law key moves · scenes/precepts read-only | F-08/F-09 constraint blocks (engine source = public.ts, atlas MorphSVG live — sweep-confirmed) |
| P4.3 flatten census (13 anchors; ≈340 lines) | F-08 (re-derived at 81a56990: 9 exact / 3 vite drifts — mandate vindicated) |
| P4.4 G5′ governance | F-08/F-09/F-10 governance clauses |
| P4.5 ownership protocol | Charter §1.5; OD-S4; every kf wave marked SPEC-DISPATCH |
| P5 LT rows (R2-05) · D50 · oscillator doc-truth · W53/W55/W56 vehicles · D54/SCI-1 | F-08 amendment targets · F-04 · HANDOFF → zones/gates · HANDOFF → frontend/gates/color programs |
| C5 shadcn abrogation TOTAL | F-12 (value: barrels/config/type-leaks — component layer already abrogated; prototype branch EMPTY-SET on evidence); F-13 confirms kf already clean |
| C6 routing + URL state | Structural facet noted (spines exist: value color-session/+platform/, kf scene machine; F-13 title hook); the robust URL-state/share facility → HANDOFF frontend program |
| C7 palette API stays at /api; full facility spec; module inspection; fourier isomorphism | F-07 + OD-S3 (the P3.2 tension reconciled EXPLICITLY, as the addendum demands) |
| C8 mega-tranche scale | Charter §1.1 (this is one program of the >50-wave union) |
| C11 structure edict (tests displaced; stripping; goldilocks; long dirs; glass-ui reference; full DAGs thrice) | The entire program: F-01..F-14 |
| C16 isolation · C17 model routing | Header; charter §1.8; per-wave routing notes; every seat reports model_served |
| C20 thrice method | §3; F-01/F-14 |
| C21 KISS/parsimony + probe parsimony | Charter §1.7; F-12/F-13 DELTA route-set parsimony |
| C2 easing selector · C3 mobile toolbar · C4 kf demo mobile · C10 breath of life · C22 audit totality | HANDOFF → frontend program (anchors already mined in the demo sweeps: Dock.vue:71/132/182-204; EasingAuthoringStage.vue:104; index.html viewport meta; useDragScrub single-pointer) |
| C1/C12/C13/C14/C15/C19 parser+color scope | HANDOFF → parser/color programs (F-06's css/ skeleton contract is the interface) |
| C18/C23 meta-arms | Out of program (apotheosis arms own them) |

## §7 — NAMED OUT-OF-PROGRAM HANDOFFS (zero silent drops)

1. **Frontend program:** C2, C3, C4, C10, C22, the Aristotelian audit, glass defect
   batching, W53 plate, robust URL-state (C6), kf viewport-fit + non-cube multi-touch.
2. **Parser program:** css/ internals (R-PARSER lands into F-06's skeleton contract; owns
   stylesheet.ts's R4 RED transfer per OD-S5), bench/ resurrection, C12/C14.
3. **Color program:** R-DELTAE→R-BOUNDARY ladder (lands into F-06's color/ skeleton), C13.
4. **Zones program:** P3.1 verdicts + owner docket (F-08 hard dependency), presets/emit
   shrinks, zone-test binding, oscillator record-correction.
5. **Gates program:** W9 land, MR2/MR4, CI wiring of lint+proof:structure, lighthouse
   demote, capability-diff gate (F-05 dependency), e2e adjudication, manifest-gate CI seat.
6. **Co-land wave (release program):** F-04/F-14's boundary-delta manifest (value 5 / kf 7 /
   glass peer-bump / atlas ranges — P4.2).

— end of program PC-structure (armB, independent Fable formation).
