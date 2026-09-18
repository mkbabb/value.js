# Arm A — STRUCTURE PROGRAM COMPLIANCE AUDIT (L1 §4, P4.3/P4.4, E-C11)

Auditor lens: structure program only. Sources: frozen snapshot `/Users/mkbabb/.claude/jobs/9e7dadd0/tmp/apotheosis/snapshot-vnext` (2026-07-19 21:29), the binding canon triad, `armA/inventory.md`, `armA/edict-matrix.md`. No `r1-opus-refuted` path read; no repo file written. Every grep claim below was run over the WHOLE snapshot including `reviews/` and `waves/`.

Grading key: verdict (CORRECT / PARTIAL / WRONG / MISSING) · evidence (file + anchor) · severity (P0 charter-breach / P1 material / P2 minor) · edict-matrix row(s) tested.

---

## A. DAG derivation — derived or hand-drawn?

**S-01 — Current-structure graphs are genuinely machine-derived. CORRECT (credit).**
Five working graphs (value src 26 nodes / value demo 250 / value api 111 / kf src 153 / kf demo 185) are produced by `tools/module-graph.mjs` (schema `vnext-module-graph/3`) with verified HEAD, working-input SHA-256, artifact SHA-256, Tarjan runtime + type-inclusive SCCs, and five reproducible commands printed in full (CURRENT-DAGS.md:102-137). Exact live SCC clusters are named (dock pair, palette admin 7-node, kf orbital-drag 5-node — CURRENT-DAGS.md:117-126) and "cluster labels never replace edge evidence." This is derived-then-adjudicated, not hand-drawn. Severity n/a. Rows: E-L1-S8.1, E-C11.

**S-02 — The mandated tool was substituted, and the substitute is proven defective. PARTIAL (P1).**
The letters demand "DEPCRUISE-derived, then adjudicated — never hand-drawn" (L1 §8). Grep proof: `depcruise`, `dependency-cruiser`, and `madge` occur ZERO times in the entire snapshot (including reviews/ and tools/). The fleet rolled its own extractor — and its own newest artifact convicts it: ROOT-REPAIR-R3-ADJUDICATION.md (frozen snapshot's newest file) finds the source projector "omits template dynamic-imports + misclassifies inline `type` specifiers → false `resolvable:true`", reopening RR-17/C00U NOT CLEAN. The exact risk class the depcruise mandate existed to avoid was realized in the bespoke tool. The package-level mermaid DAGs (CURRENT-DAGS.md:11-80, TARGET-DAGS.md:19-92) are hand-authored but adjudicated and census-backed — acceptable at package grain. Rows: E-L1-S8.1, E-C11.

**S-03 — Target DAG status authority is machine, not prose. CORRECT.**
TARGET-DAGS.md:9-15 declares WAVE-EDGE-POLICY.json the sole machine status authority: 759 typed edges (723 completion + 24 conditional KEEP|PRUNE + 4 requires-keep + 8 requires-prune), hashes bound into every wave contract; "No branch-family candidate count is misreported as the final node count" (TARGET-DAGS.md:130-132). Typed conditional edges are a stronger idiom than the seed asked for. Rows: E-L1-S8.1.

---

## B. Target paths — goldilocks, module-name-stripping, tests-isomorphism

**S-04 — Module-name-stripping is law AND machine-enforced. CORRECT.**
FORMATION.md:126 standing law ("Grouped filenames omit their containing module's repeated name"); PARSER-CSS-COLOR.md:632; DEMO-TARGET-DAGS.md:24. Enforcement is real code: validate-target-paths.mjs:270-274 fails any stem equal to, or `-`/`_`-prefixed by, its parent directory name, case/Unicode-folded. The manifests comply throughout (`physics/spring/solve.ts`, `css/color/parse.ts`, kf demo `easing/atlas/catalog.ts`). Rows: E-C11, E-L1-S4.6.

**S-05 — Tests-isomorphism is exact, external, machine-checked on BOTH repos, born-RED. CORRECT (verified by execution).**
I ran the join myself over the frozen manifests: value library 105 source ↔ 105 test files with zero misses; value demo 146 ↔ 144 + exactly the 2 named support exceptions (A20 generated client, D13 worker entry); kf 66/66 and 102/102 declared with hashes. validate-target-paths.mjs:277-283 rejects source-colocated tests (`test|tests|__tests__` path parts and `.test/.spec` suffixes in source) and :461 requires exact external-isomorph equality; forbidden_roots ban `src/__tests__`/`src/test` etc. (VALUE-TARGET-PATHS.json:310,633; KEYFRAMES-TARGET-PATHS.json:97). Born-RED witnesses exist where the defect is live: V00C ("Existing target trees were hand-selected… contain false/reversed edges", waves/P-V.md:79), K00 ("two proposed target trees conflict", waves/K-A.md:18), V00A ("tagged, dirty and packed truths currently disagree"). kf gets its NEW rule + support-dir allowlist (`support_roots: ["proof","bench"]`, `support_files: ["proof/demo-text-loader.mjs"]`). Rows: E-L1-S4.7, E-P3.4-3, E-C11.

**S-06 — The mirror law overreaches into sand at the margin. PARTIAL (P2).**
`test_path_law: replace-last` is applied to stylesheets: `test/demo/styles/theme.test.ts` for `theme.css`, plus `layout/motion.test.ts` and `test/src/index.test.ts` mirrors (VALUE-TARGET-PATHS.json:613-615). A `.test.ts` per CSS token file is mechanical totality producing dubious oracles — exactly the "contrived gates" class E-C21 warns against. Minor. Rows: E-C11, E-C21.

**S-07 — Goldilocks: kf consolidation is excellent; the value css/ expansion carries an acknowledged but ungated sand risk. PARTIAL (quality).**
kf: 153 current nodes → 66 target files across 12 clean domains (model/resolve/compile/runtime/timeline/ingest/physics/composition/interaction/transition/svg/entries), max depth 3, LIGHT/HEAVY split preserved as `entries/light.ts|heavy.ts` (KEYFRAMES-TARGET-PATHS.json:19-97) — a genuine goldilocks result; no god-module, no sand. value: 26 current nodes → 105 target files, ~70 under `src/css/` in 15 sub-domains + 15 `grammar/l4` leaves (PARSER-CSS-COLOR.md:443-604). This is defensible under E-C12 (full July-2026 CSS + CSSOM + typed-OM totality) and the l4 partition is pinned to the BBNF module isomorphism (CSS-MODULE-ISOMORPHISM.json, 15 runtime modules 1:1 — a strong structural realization of E-C14), but it is a 4× node expansion adjudicated only by prose. The corpus prices the risk honestly — V29T born-RED names "replace sand with unmeasured god modules" (waves/P-V.md:118) and FORMATION.md:127 rules "cohesion, edge cuts, change coupling, SCCs and public boundaries — not arbitrary file counts" — yet no gate measures cohesion/sand; only SCC=0 is machine-checked. Rows: E-L1-S4.6, E-C11, E-C21, E-C12.

**S-08 — The value↔kf abstract isomorphism facility exists and extends to the backends. CORRECT.**
One shared manifest grammar (`vnext-value-target-paths/1` / `vnext-keyframes-target-paths/1`), one shared test-path law, ONE validator over both repos (validate-target-paths.mjs validates both manifests; TARGET-DAGS.md:176-178 "rejects prose divergence… across both manifests"), and the same `src/<domain> ↔ test/src/<domain>` grammar declared for value, kf, AND fourier (TARGET-DAGS.md:133-142). API side: both runtimes share `app/main → routes → contract + service → own store + platform ports → database` with externalized mirrored tests and zero SCCs (TARGET-DAGS.md:197). This is isomorphism "in an abstract facility, not merely per-repo tidiness" — the seed's exact ask. Rows: E-L1-S4.1, E-C7 (isomorphism leg).

**S-09 — Asymmetric conditional modeling: kf's manifest hard-codes outcomes value's models properly. PARTIAL (P2).**
VALUE-TARGET-PATHS.json:284-309 carries 4 typed conditional pairs (bulk/V16B, okhsl/V18H, okhsv/V18V, decompose/V24) and V29T explicitly regenerates the manifest "from P00's execution CSS manifest and the four typed conditional resolutions" (waves/P-V.md:118). KEYFRAMES-TARGET-PATHS.json has NO conditional_paths field: the fixed 66-file tree already omits flip/morph/oscillator/split-text/motion-path/presets, pre-encoding K14–K22 outcomes in the path authority before those waves run; K22T "materialize the manifest exactly" (TARGET-DAGS.md:172-174) has no regeneration clause. If any K-band facility decision diverged, the sole path authority would be wrong by construction. Rows: E-C11, E-P3.1.

---

## C. subpaths dissolution — 7 keys, D50 /index boundary

**S-10 — Dissolution itself: real, shim-free, re-verified. CORRECT.**
`src/subpaths` deleted with "no forwarding subtree survives" (DISPOSITIONS.md:31), forbidden_roots bans it forever (VALUE-TARGET-PATHS.json:310), PARSER-CSS-COLOR.md:621-626 "Package exports target capabilities directly." Packed-surface re-verification is executable: V29T requires a fresh non-link install running every packed public probe + export-by-symbol/tarball-SHA-512 rows in value-public-surface.json (waves/P-V.md:118). No alias/shim/dual path anywhere (FORMATION.md:104-107). Rows: E-L1-S4.4 (dissolution+reverify legs).

**S-11 — The 7-key freeze is broken on Codex-only authority. WRONG vs binding canon (P1); internally authorized vs the Codex owner capture.**
Surviving keys are SIX: `./color ./css ./easing ./math ./path ./transform` plus a root-export decision; `./value` is removed (contents migrated into `./css`), `./quantize` dropped, `./path` newly minted (V00C, waves/P-V.md:79; PARSER-CSS-COLOR.md:622-626; V29T gate "exact six surviving keys, exact root/`./value`/`./quantize` tombstones"). The seed's `./quantize` drop is authorized; the `./value` removal and key re-shaping rest solely on OA-14 ("Historical export count is not a preservation target", OWNER-AMENDMENTS.md:26) — a Codex-fleet-captured owner statement with NO counterpart in the binding CONVERSATION-ADDENDA (edict-matrix Finding F3). The removal apparatus is exemplary (four-question deletion judgment, by-name tombstones, casualty proof, owned consumer migrations, `deletion-judgment.mjs`), so the defect is the authority chain, not the craft: the union must put the six-key surface to the owner as a named ratification row. Rows: E-L1-S4.4.

**S-12 — The D50 explicit-`/index` boundary and `transform/index.ts` are silently gone. MISSING (P2).**
`D50` and `api-extractor` occur ZERO times in the snapshot (grep, all files). The replacement design — direct capability entries, single `src/index.ts`, zero forwarders — is coherent and arguably obsoletes the /index idiom, but the seed row is superseded by silence, not by name. Under the corpus's own zero-silent-drop discipline this should have been a named supersession row; instead it survives only inside SEED-ROW-INVENTORY hashed excerpts. Rows: E-L1-S4.4, E-L1-S9.1.

---

## D. api/ EXTRACT vs C7 stay-at-/api

**S-13 — Reconciled explicitly, not fudged. CORRECT.**
OA-05 names both poles verbatim: earlier position "Seed says `api/ EXTRACT from repo`", later ruling "Palette API must remain within its current `value.js/api`", consequence "A00–A20 transpose the backend internally; no standalone extraction wave or compatibility proxy exists" (OWNER-AMENDMENTS.md:17). Reinforced as standing law (FORMATION.md:119), as a Keep disposition (DISPOSITIONS.md:93), and cleanly distinguished from the pruned LIBRARY `src/api` facade (DISPOSITIONS.md:37 — "does not affect the server `value.js/api`, which is retained"). The C7 fourier-isomorphism leg is present at the right altitude: "The APIs share protocol vectors, not runtime modules" with identical module topology law and externalized mirrored tests (TARGET-DAGS.md:197; OA-06). The seed-row fold (H-T-L339 → A00, amendment OA-05) is recorded. This is the model of how a seed-reversal should be papered. Rows: E-C7, E-L1-S4.5 (api leg), E-P3.2.

---

## E. kf flatten anchors, LT governance, gate continuity

**S-14 — The entire P4.3/P4.4 governance apparatus is absent. WRONG (P0 charter-breach).**
Exhaustive grep over the whole snapshot (md+json+mjs, including reviews/): `LT-10` = 0, `LT-16` = 0, `N-ADJ-3` = 0, `proof:structure` = 0, `13 anchors` = 0, `340 import` = 0. The seed's flatten program — coordinated config-and-graph moves born-RED at 13 named config/gate anchors + ≈340 import lines, with kf structure waves AMENDING the ratified LT blueprint and EXTENDING proof:structure, naming the superseded rulings — was not partially executed; it was wholly replaced by a from-scratch transposition (K00 byte census → K22T total keep/move/fold/delete materialization) governed by a parallel authority (the vnext manifest/validator machinery). The seed's own sentence — "Refutation amends the charter; silence re-litigates it" — names this failure mode exactly: nothing refutes LT-10/LT-16; they are simply never mentioned. Whatever the merits of the replacement (see S-16), the governance law is breached at corpus scale. Rows: E-P4.4, E-L1-S4.3, E-L1-S4.2, E-P4.3.

**S-15 — kf's live gate configs have no disposition; the depcruise leaf-law key will silently vacate. WRONG (P1, concrete masked-green hazard).**
E-P4.1-4: the value.js-free-leaf law is keyed `^src/animation/internal/` at `.dependency-cruiser.cjs:171` and "the key MOVES with any rename." The target forbids both `src/animation` and `src/internal` (KEYFRAMES-TARGET-PATHS.json:97), so after K22T the live rule matches nothing — the leaf law goes green-by-vacancy, the exact "vacuous-green gates" close-class lie. No wave, disposition, or fold row anywhere names `.dependency-cruiser.cjs`, the 755-line proof:structure R1–R6 gate, or their retirement/extension; kf's `proof/` support root is retained as a directory but its contents are uninventoried. Rows: E-P4.1-4, E-P4.4, E-L1-S0.4 (close-class lies).

**S-16 — Anchor re-derivation is honored in mechanism, dropped in specification. PARTIAL (P1).**
The seed law (re-derive anchors at execution; never trust cached line-cites) has a functional analogue: immutable byte snapshots + replay gates (K22T "replays K00 snapshot bytes", V00A "proves replay remains byte-identical after later checkout drift"), `execution_resnapshot_required: true` on the grammar snapshot (VALUE-TARGET-PATHS.json:14), and V29T regeneration from execution manifests. As a drift-defense this is arguably STRONGER than line-cite re-derivation. But the 13 named config anchors (tsconfig self-alias, vite lib/engine/dts entries, vitest, depcruise keys, structure-gate resolver, engine-dts-rollup, 15 surface-grep sites) are never enumerated born-RED, and post-transpose config re-pointing is owned by no wave cell — the import-line census (≈340) likewise appears nowhere. Rows: E-L1-S7.4, E-P4.3.

**S-17 — kf export boundary law honored; 44-key mirror realized by an equivalent mechanism. CORRECT.**
K23 ratifies exactly `.` + `./engine` with fresh offline no-link craters, NodeNext type probes, zero root→engine byte reachability, zero SCCs, one specifier per runtime symbol, and deletes `loadAnimationEngine`/`warmEngine`/`AnimationEngine` mirrors (waves/K-A.md:43) — consistent with the RIGHTLY-tombstoned accessor family. The named "44-key engine runtime mirror re-verified by EXECUTION" is not cited by count, but the export-by-symbol map + runtime probes subsume it. Rows: E-P4.1-2.

---

## F. Hygiene rows: decompose, quantize, deps block, PNGs, demo tests

**S-18 — decompose.ts: decided-terminal with a hard KEEP bar. CORRECT (with note).**
V24 "Terminally re-adopt or prune", born-RED ("cites CSSOM View incorrectly and survives without a proved transform-interpolation consumer"), KEEP requires a real consumer plus singular/reflection/round-trip tolerances, PRUNE proves total removal through the executable deletion contract; "Existing LOC/tests and consumer count are not adoption" (waves/P-V.md:109) — the consumer-count-is-not-enough edict verbatim. Modeled as a typed conditional pair (S-09). The seed said PRUNE outright; a decided-terminal wave with a falsifiable KEEP bar is compliant in substance. Rows: E-L1-S4.5, E-P3.2.

**S-19 — quantize: demoted with a public tombstone. CORRECT.**
DISPOSITIONS.md:36: public `./quantize` key receives an explicit major tombstone, no alias; "Extraction may own a bounded private strategy" — the demo home is the extract worker (D13, seed-row fold H-T-L337 with OA-14). Matches DEMOTE-to-demo, arguably tighter. Rows: E-L1-S4.5, E-P3.2.

**S-20 — deps bomb: stripped correctly; the standing pre-publish manifest gate is only implicit. PARTIAL (P2).**
V00B deletes exactly the working-tree value→keyframes/glass runtime package edges with packed tarball dependency graph, bundle crater, casualty ledger, born-RED ("Current manifests admit forbidden constellation edges even though published value 4 did not require them", waves/P-V.md:78); CURRENT-DAGS.md:32-33 names the misplaced production deps; no lockstep-bump exists anywhere. But E-P3.4-4's permanent pre-publish manifest gate (with the self-dependency prior art, v1.1.0–v2.0.1) is never named: `self-dep`, `pre-publish`, `manifest gate` = 0 grep hits. V29T/K23 non-link installs + value-public-surface validation cover the boundary event, not the recurring publish path. Rows: E-P4.2-2, E-P3.4-4, E-L1-S4.5.

**S-21 — 39 root PNGs: owned only by an invisible hashed fold. PARTIAL (P2).**
`PNG`/`png`/`39 png` = 0 hits in every narrative, disposition, and wave file. The seed row (handoff L341, "root PNGs ×39 · demo tests at test/ root | DELETE / DISPLACE") is folded into D00 solely via SEED-ROW-INVENTORY.json row H-T-L341 ("Fold every clause of this exact table-row into D00; its hashed excerpt is the acceptance boundary"). Bijection is preserved — this is not a silent drop by the letter — but a deliverable that appears in no wave text, gate, or disposition is a drop-in-waiting: D00's own cells never mention repository-root artifacts. Rows: E-L1-S4.5, E-L1-S9.1.

**S-22 — demo-test displacement: done. CORRECT.**
D00 executes the external test isomorphism for the demo (waves/G-D.md:67); forbidden_roots ban `demo/__tests__`/`demo/test`/`demo/tests` (VALUE-TARGET-PATHS.json:633); api tests externalized to `api/test/src/modules` (TARGET-DAGS.md:140). Rows: E-L1-S4.5, E-P3.4-3.

---

## G. Zone verdicts hard-coded into the target structure

**S-23 — The target trees override adopted zone verdicts without citing the records. WRONG vs binding canon (P1).**
The kf target structurally encodes: K15 PRUNE View Transition wrapper (seed: orchestration/view-transition KEEP-EARNED), K22 PRUNE the preset catalog keeping 4 demo fixtures (seed: KEEP-EARNED with a breadth SHRINK note), K14 fixed-PRUNE flip (seed: OWNER-DECISION on an intact EP-3 PATH-B record), scroll + ingest decided KEEP (seed: OWNER-DECISION). Grep proof: `EP-3` = 0, `K.W8`/`K.W9` = 0, `F6` fence annex = 0 across the corpus — the record-state trichotomy and the K F6 fence register are unimplemented; W53/W55/W56 prior vehicles likewise = 0 hits (the boundary-sampler bank re-homes to D17, SEED-ROW-INVENTORY H-T-L270). Mitigation, graded fairly: every prune carries the four-question deletion judgment, an owner-precut annex, a by-name tombstone, and owned migrations (e.g. K14 requires G07 green FIRST and forbids deletion-before-migration — waves/K-A.md:33), and OA-14 records a general owner deletion grant. Substantively many of these calls may survive owner review; procedurally the citation discipline the seed demanded ("any prune in scroll/timeline/physics must cite and overturn the named ruling") does not exist. Rows: E-P3.1, E-L1-S5.2, E-L1-S5.4, E-P5.5, E-P5.7.

---

## H. Structure-quality credit (what the formation did RIGHT, beyond compliance)

**S-24 — The manifests are executable authorities, not prose.** Every target tree has a canonical SHA-256, a validator that rejects invented/missing/case-colliding paths and prose divergence, and a self-hash chain into wave contracts (TARGET-DAGS.md:122-131, 166-178). Wave-grain conditionality is typed in the edge policy (requires-keep/requires-prune). This exceeds anything the seed specified for gate mechanics.

**S-25 — The target architectures are genuinely dirigible.** Value demo: feature-first slices each owning View/state/route/api/capability with a closed edge law (platform imports nothing above it; no sibling feature edges; shell never imports a concrete feature; no view touches fetch/History/URL/clipboard; exactly one block-scroll owner per route — DEMO-TARGET-DAGS.md:292-377). kf demo: registry-of-pure-definitions + lazy scenes + one reducer + sole-math-owner rules (K12 pointer/quaternion, G09 easing glyph; `forbidden_math_owners` machine-listed in the manifest). kf library: 153→66 nodes into 12 coherent domains with the LIGHT/HEAVY entry split preserved. API: identical module law both runtimes, zero SCCs. Zero forwarding barrels anywhere. These trees satisfy goldilocks, colocation, and the glass-ui-as-reference-model idiom (grouped-name law lifted straight from the glass slice) in substance.

**S-26 — Honest defect self-exposure.** The formation's own review chain (7 band adjudications all NOT CLEAN, RR docket through RR-18, R3 reopening RR-17) repeatedly convicted its own structure tooling and kept production 0/190. The born-RED culture is real, not ceremonial.

---

## Verdict summary (lens: structure program)

| # | Finding | Verdict | Sev | Matrix rows |
|---|---|---|---|---|
| S-01 | Current DAGs machine-derived w/ hashes+commands | CORRECT | — | E-L1-S8.1 |
| S-02 | depcruise/madge swapped for bespoke tool; tool convicted by own R3 (RR-17) | PARTIAL | P1 | E-L1-S8.1, E-C11 |
| S-03 | Target status authority = typed 759-edge machine policy | CORRECT | — | E-L1-S8.1 |
| S-04 | Module-name-stripping law + code enforcement | CORRECT | — | E-C11, E-L1-S4.6 |
| S-05 | Tests-isomorphism exact both repos, born-RED, verified by my own join | CORRECT | — | E-L1-S4.7, E-P3.4-3 |
| S-06 | Mirror law produces .test.ts per CSS file | PARTIAL | P2 | E-C11, E-C21 |
| S-07 | kf goldilocks excellent; value css/ 4× expansion sand-risk acknowledged, ungated | PARTIAL | P2 | E-L1-S4.6, E-C12, E-C21 |
| S-08 | Abstract value↔kf(+fourier) isomorphism facility, one validator | CORRECT | — | E-L1-S4.1 |
| S-09 | kf manifest lacks conditional-path modeling value has | PARTIAL | P2 | E-C11, E-P3.1 |
| S-10 | subpaths dissolved shim-free, packed surface re-verified | CORRECT | — | E-L1-S4.4 |
| S-11 | 7-key freeze broken (6 keys; ./value out, ./path in) on Codex-only OA-14 | WRONG (canon) | P1 | E-L1-S4.4 |
| S-12 | D50 /index boundary + transform/index.ts superseded by silence | MISSING | P2 | E-L1-S4.4, E-L1-S9.1 |
| S-13 | api/ EXTRACT↔stay reconciled explicitly (OA-05) + fourier protocol isomorphism | CORRECT | — | E-C7, E-P3.2 |
| S-14 | P4.3/P4.4 apparatus absent: 0 hits LT-10/LT-16/N-ADJ-3/proof:structure | WRONG | P0 | E-P4.4, E-L1-S4.2/4.3 |
| S-15 | depcruise leaf-law key + live kf gates have no disposition; vacuous-green hazard | WRONG | P1 | E-P4.1-4, E-P4.4 |
| S-16 | Anchor re-derivation: stronger mechanism, named 13-anchor census dropped | PARTIAL | P1 | E-L1-S7.4, E-P4.3 |
| S-17 | kf `.`+`./engine` law + crater probes | CORRECT | — | E-P4.1-2 |
| S-18 | decompose decided-terminal, consumer-count-not-enough honored | CORRECT | — | E-L1-S4.5 |
| S-19 | quantize demoted w/ major tombstone | CORRECT | — | E-L1-S4.5 |
| S-20 | deps strip correct; standing pre-publish manifest gate unnamed | PARTIAL | P2 | E-P4.2-2, E-P3.4-4 |
| S-21 | 39 root PNGs owned only via hashed fold; zero visible deliverable | PARTIAL | P2 | E-L1-S4.5 |
| S-22 | demo/api tests displaced externally | CORRECT | — | E-L1-S4.5 |
| S-23 | Target trees pre-decide KEEP-EARNED/OWNER-DECISION zones w/o record citations | WRONG (canon) | P1 | E-P3.1, E-L1-S5.2/5.4, E-P5.5 |
| S-24/25/26 | Executable manifests; dirigible architectures; honest self-conviction | CORRECT (credit) | — | — |

**Gestalt.** The structure program is the best-engineered band of the Codex corpus: derived current graphs, executable path authorities, exact machine-checked tests-isomorphism on both repos, a real cross-repo abstract isomorphism facility, a genuinely dirigible pair of target architectures, and an explicit, well-papered api-stay reconciliation. Its systemic failure is GOVERNANCE CONTINUITY: it re-founds instead of amending — the LT blueprint/proof:structure lineage, the 13-anchor flatten census, the depcruise mandate and leaf-law key, the record-state trichotomy/fence citations, and the D50 boundary are absent wholesale (mostly 0-grep-hit absent), and the export-key freeze plus several adopted zone verdicts are overridden on the strength of Codex-side owner captures the binding canon does not carry. The union's job: keep the machinery, restore the lineage — name every superseded ruling, row the live kf gate configs, and put the six-key surface and the zone-verdict flips to the owner as explicit ratification rows.
