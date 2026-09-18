# Arm A — Inventory of the Codex V-next Formation Corpus (frozen snapshot)

Neutral inventory only. No grading, no verification of the formation's claims — this records what the corpus says about itself.

## 0. Snapshot provenance (deviation note)

- The task named a pre-made frozen snapshot and a `snapshot-manifest.txt`, but the task's path variables arrived unresolved (`undefined`) and **no `snapshot-manifest.txt` exists anywhere on disk** (searched /tmp, /private/tmp, ~/Programming, value.js repo, additional working dirs; also mdfind). The designated snapshot does not exist.
- To honor "never read the live tree while the Codex fleet writes it," I made my own frozen copy: `cp -R /Users/mkbabb/Programming/value.js/docs/tranches/V/vnext` → **`/private/tmp/vnext-edict-audit/probe/vnext-snapshot-1907/`** captured **2026-07-19 18:49:46 EDT** (≈1h45m after the stated ~17:05 intended snapshot time). All findings below are from this copy. The live tree may have advanced since; anything time-sensitive should be re-checked against a fleet-quiescent tree.
- The quarantined `r1-opus-refuted` path was never read (it is not present inside `vnext/` — it lives in the keyframes mirror, per PROVENANCE.md).

Snapshot totals: 20 root `.md`, 12 root data `.json`, 35 `*.schema.json` (34 root + 1 in coordination/), 84 `tools/*.mjs`, 4 `waves/*.md`, 18 `reviews/*.md`, 5 `coordination/*` (2 md, 1 yaml, 2 json). No other subdirectories.

## 1. Complete document map (file → role, size in bytes)

### Root narrative/authority documents (.md)

| File | Size | Role |
|---|---:|---|
| README.md | 26,518 | Corpus index: names every artifact, per-band registry (190 waves), states execution held at **0/190**; C10 sole release |
| FORMATION.md | 9,976 | Charter: two seed letters as sole root context; thrice-critique law (2 hostile Sol + 1 Sol adjudicator); band registry P8/V44/K27/A36/G10/D33/M13/C19=190; producer DAG band summary; standing laws (no shims/aliases, tests external, value.js sole CSS authority, C10 sole release); canonical URL-state law; 14 value routes + 7 keyframes routes; formation-completion conditions |
| PLAN.md | 11,833 | Execution order: phases 0–6 (re-pin → parser/standards P00–P06 → value spine V00A–V29T → parallel K/A/G → demos D/M → consumers C00U–C07 → closure C08/C09 → sole release C10); execution prohibition until 2 consecutive clean formation passes; per-wave 10-step method |
| AUDIT-REGISTRY.md | 15,080 | 32-seat formation audit ledger (named agents, assignments, dispositions); finding-family registry F-01..F-14; clean-pass law; records first whole-formation pass FAILED (`canonical-exec-liveness`), Agent-v2 assay sustained RR-15..RR-18; clean-pass count 0, production 0/190 |
| OWNER-AMENDMENTS.md | 8,837 | Chronological owner docket OA-01..OA-17 (Fable→Sol / Opus→Luna substitution; ≥50-wave mandate; published-only parse-that OA-17; per-wave triad OA-15; CSS module isomorphism OA-16); 4-question deletion judgment |
| PROMPT-RECAP.md | 12,625 | Requirement-to-wave ownership: 83-row request→wave table; product identities (Optical Instrumentarium / Chronographic Stage); route lists |
| DISPOSITIONS.md | 17,773 | Binding keep/prune/replace/refuse rows: parser substrate 10, CSS+color 20, keyframes facilities 23, demo/design 13, API/identity 22, tests/gates/closure 8 = **96 disposition rows** |
| PROVENANCE.md | 14,987 | Seed/chat/repo/standards/dirty-state pins: 16-repository register with HEAD + NUL-porcelain SHA-256 dirty digests (snapshot 2026-07-18T16:50:04-0400); C00U root law (15 required Git roots + 6 typed subdirectories); published parse-that control law; model provenance (Sol/Luna; "served model must be verified") |
| CURRENT-DAGS.md | 10,320 | Audited current package/module graphs (mermaid), incl. the invalid value→keyframes/glass production-dependency cycle; arrow law producer→consumer |
| TARGET-DAGS.md | 9,949 | Perfected target package DAG; declares WAVE-EDGE-POLICY.json the sole machine status authority (759 edges: 723 COMPLETE + 24 conditional + 4 KEEP-only + 8 PRUNE-only) |
| DEMO-TARGET-DAGS.md | 14,829 | Exact Glass/value demo target trees + 13 edge kinds (import/render/state/route/api/capability/DI/input/focus/scroll/style/test); signed `GD-ADJ-SOL3-2026-07-18` |
| VALUE/… see JSON below | | |
| PARSER-CSS-COLOR.md | 26,342 | Parser/CSS/color program: published parse-that 1.0.0 immutable substrate; PT-0.W0 upstream harness deliberately RED; no parse-only artifact earns product credit; value.js CSS spine layering |
| KEYFRAMES-API.md | 22,123 | Keyframes/WAAPI program (ProgramSpec/ReadyTrack/CompileResult contracts) + palette/Fourier API program; keyframes has no server API; single-tenant law |
| API-OPERATIONS.md | 19,954 | Closed operation registry signed `A-ADJ-SOL3-ROUTES-2026-07-18`: 130 HTTP (89 value + 41 Fourier) + 17 headless = 147; tuple-signature SHA-256s; Idempotency-Key/If-Match notation |
| DESIGN-PROGRAM.md | 22,165 | Design mandate ("refinement, not reinvention"): Optical Instrumentarium / Chronographic Stage / Glass liquid restraint; Breath-of-Life bounded-motion laws |
| DESIGN-PROVENANCE.md | 3,963 | Design inputs: two owner Codex attachments, `frontend-design` plugin rubric, in-app browser audits; DesignSync recorded as a banked method gap (retrigger owners G00/D00A/M00) |
| LIVE-VISUAL-AUDIT.md | 11,903 | 2026-07-18 deployed audit of color.babb.dev (14 routes) + keyframes.babb.dev (7 routes) at 390×844 and 1440×900; born-RED composition witnesses; current shadcn/vendor residue census |
| STATE-ROUTING.md | 13,370 | URL envelope codec law: `#/route?v=1&s=base64url(JCS)`, deviations-from-defaults only, bounds (6144 URL / 6000 s / 4500 bytes / depth 12 / 512 nodes), history/popstate/commit semantics |
| RETURN-CONTRACT.md | 42,669 | Universal wave-return contract (human projection of return.schema.json): `vnext-wave-return/2`, JCS self-hash, statuses, operation vector (8 cells), gate receipts v3, proof-runner law, deletion-judgment 3-phase chain, per-wave final-state implementation-challenge triad, C08/C09/C10 closure/release returns |
| FORMATION-CLEAN-PASS-PROTOCOL.md | 28,037 | Two-pass formation closure protocol: frozen corpus epoch (`tools/corpus-epoch.mjs`), 3 fresh Codex sessions per pass (critic_a ASSUME-FORMATION-WRONG, critic_b, adjudicator), `gpt-5.6-sol`/`ultra`, `fork_turns:none`, byte-level JSONL forensics (opaque NEW_TASK carrier, closed record vocabulary, provider bootstrap pinned by CLEAN-PROVIDER-BOOTSTRAP.json), explicit provider-trust boundary |

### Root machine artifacts (data .json)

| File | Size | Shape / claim |
|---|---:|---|
| FORMATION-SEAT-LEDGER.json | 59,907 | `vnext-formation-seat-ledger/1`; 32 seats (8 skeptic_a, 8 skeptic_b, 7 adjudicator, 9 auditor), 14 batches, 15 panels, external_upstream_bbnf block (`counted_in_formation_seats:false`) |
| SEED-ROW-INVENTORY.json | 77,132 | `vnext-seed-row-inventory/2`; 2 seed letters (kickoff+handoff, SHA-256 pinned); **149 rows**, dispositions: folded 140 / retired 6 / banked 3; phases: implementation 86 / both 47 / formation 16 |
| FORMATION-ROOT-SEED-CONTRACT.json | 3,674 | 9 formation-root-owned seed requirements (other 140 embedded in wave contracts); contract_hash |
| WAVE-EDGE-POLICY.json | 1,998 | `vnext-wave-edge-policy/1`; expected: 190 waves, **759 edges** (723 completion-predecessor, 24 conditional-disposition, 4 requires-keep, 8 requires-prune); outcome classes; self-hash |
| API-RETURN-COVERAGE.json | 60,671 | 39 wave rows; universe 147 ops (value 96 = 89 HTTP + 7 headless; Fourier 51 = 41 + 10) |
| API-TARGET-PATHS.json | 31,478 | `vnext-api-target-paths/1`; 33 operation-domain units, value+fourier runtimes, laws |
| api-contract.source.json | 253,823 | Generator-grade semantics: `http` list 130 + `headless` list 17; per-op schema refs, authority, cache/CORS, lifecycle |
| VALUE-TARGET-PATHS.json | 26,334 | Library+demo target trees, test-path law, conditional paths, forbidden roots; self-hash |
| KEYFRAMES-TARGET-PATHS.json | 8,045 | Same for keyframes library+demo |
| CSS-MODULE-ISOMORPHISM.json | 7,406 | 15 runtime BBNF modules → `src/css/grammar/l4` 1:1 mirror; 1 edge correction (stylesheet→keyframes); 1 excluded (pretty.bbnf test-oracle-only) |
| P01-INDEPENDENT-AUTHORSHIP.json | 11,251 | state `born_red`; author_receipts **empty (0 authors)**; contract for 2 isolated Sol-ultra full-CSS authors + third-Sol adjudication; 9 completion conditions |
| BBNF-HOST-CONTROL.json | 2,749 | Content-addressed historical BBNF host capsule (bbnf + parse-that archives, commands, 2 known upstream defects); `imports_active_novelty:false` |
| CLEAN-PROVIDER-BOOTSTRAP.json | 1,974 | Pre-campaign provider-envelope calibration (calibrated 2026-07-19T20:05:53Z; session/prefix SHA-256s) |
| CONSUMER-UNIVERSE-BOUNDS.json | 5,385 | `…bounds/2`; search roots/ignores/edge scope; required_roots (15 Git IDs) + required_paths (6 subdirectory IDs); bounds_sha256 |

### Schemas (35 `*.schema.json`; name | size | purpose from title)

api-contract.source.schema.json 12,347 (semantic API contract source) · bbnf-host-control 2,879 · consumer-universe 10,953 (closed observed universe) · consumer-universe-receipt 6,803 · css-module-isomorphism 5,588 · deletion-delta-receipt 3,673 (before/after delta) · deletion-judgment 16,481 (judgment + total-join annex) · formation-clean-passes 8,445 · gate-receipt 3,786 (v3) · git-tree-snapshot 2,250 · keyframes-current-inventory 6,942 + -validation 2,728 · keyframes-physical-transpose 4,389 · keyframes-public-package 11,381 + -snapshot 5,808 + -validation 6,823 · keyframes-target-decisions 3,269 · keyframes-target-transpose 11,133 + -validation 5,582 · p01-access-projection 2,716 · p01-css-corpus 4,305 · p01-differential-ledger 7,144 · p01-grammar-oracle-proposal 3,782 · p01-independent-authorship 16,870 · p01-input-epoch 7,469 · p01-origin-ledger 6,184 · p01-typescript-combinators-proposal 3,264 · parse-that-package-receipt 2,730 · resolved-reopenings 3,084 (C09 receipt) · **return.schema.json 56,991** (canonical wave return, the largest) · value-current-inventory 4,242 · value-public-surface 7,276 (v2) · value-target-resolutions 2,215 · value-target-transpose 6,441 · wave-edge-policy 3,129 · coordination/pt-e-bbnf-live-coordination-v2.schema.json 10,000.

### waves/ (4 files — the executable wave registry)

| File | Size | Contents |
|---|---:|---|
| waves/P-V.md | 50,033 | Shared formation/execution + proof/return law; P00–P07 (8) and V00A–V31 (44) seven-cell rows |
| waves/K-A.md | 40,274 | K00–K24 (27) and A00–A26 (36) rows |
| waves/G-D.md | 35,922 | Shared π contract + signed frontend DAG; G00–G09 (10) and D00A–D25 (33) rows |
| waves/M-C.md | 32,073 | M00–M11 (13) and C00U–C10 (19) rows |

Row format everywhere: `| ID | Mission | Dependencies | Born-RED witness | Deliverables | Falsifiable gates | Exclusions/terminal branch |` (exactly 7 cells; `tools/validate-formation.mjs` enforces cell count, ID uniqueness, explicit comma-separated deps, acyclicity, band counts and total 190).

### reviews/ (18 files) — see §5

### coordination/ (5 files)

| File | Size | Role |
|---|---:|---|
| HANDOFFS.md | 24,847 | Packetized sibling-repo letters; packet law (each sibling gets authority, wave IDs, packet sections, evidence pulls, exclusions, return contract); repeats the C00U 15-root + 6-subdirectory law and exact C ledger |
| BBNF-PARSE-THAT-MAJOR-HANDOFF.md | 7,683 | External routing of all parse-that/BBNF novelty to the active SK-V25/T/U campaign; pinned starting artifacts; v1 packet frozen at SHA-256 `f7d60b45…` |
| pt-e-bbnf-handoff-v1.yaml | 2,384 | Byte-canonical frozen historical machine packet (never edited) |
| pt-e-bbnf-live-coordination-v2.json | 7,082 | Append-only JCS event stream (snapshot/intent/acknowledgement) with SK-V25 pins |
| pt-e-bbnf-live-coordination-v2.schema.json | 10,000 | Schema for the v2 stream |

### tools/ (84 .mjs; ~2.1 MB total)

Naming convention: `validate-*` (live validators), `selftest-*` (adversarial fail-open controls for the matching validator), plus builders/resolvers/helpers. Most files carry no header comment; purposes below are from README.md's per-tool ledger plus the four read fully (marked ★).

| File | Size | One-line purpose |
|---|---:|---|
| build-seat-ledger.mjs | 17,181 | "Emits the immutable, evidence-bound 32-seat formation ledger. It never writes" (header) — read-only seat-ledger emitter |
| clean-coordinator-custody.mjs | 40,537 | RR-15 continuous physical-line root custody, phase transactions, report hashes |
| clean-exec-contract.mjs | 78,326 | RR-14 exact pragma launches, owned polling, bounded output, terminal closure |
| clean-pass-prompts.mjs | 9,827 | Byte-canonical content-addressed critic/adjudicator prompts + attestations |
| clean-provider-bootstrap-authority.mjs | 9,813 | Pre-campaign same-root provider-envelope calibration authority |
| consumer-bounds-authority.mjs | 13,475 | Exact three-field bounds binding for the consumer universe |
| consumer-universe-fixture.mjs | 15,847 | Isolated 15-real-Git-root/6-subdirectory test fixture |
| consumer-universe-return.mjs | 17,307 | Consumer-universe return-annex helpers |
| corpus-epoch.mjs ★ | 2,766 | Frozen-corpus epoch: SHA-256 over every canonical regular corpus file + the 2 external seed letters, excluding the (future) clean-pass reports; exports `computeCorpusEpoch` |
| corpus-files.mjs | 2,138 | No-symlink bounded corpus enumeration |
| deletion-judgment.mjs | 39,282 | Executable full-universe casualty/tombstone/archive deletion decisions + 3-phase aggregation |
| deletion-truth.mjs | 22,705 | Physical Git-tree before/after deletion receipts |
| formation-proof-layer.mjs | 9,274 | Triad-before-gate order + exclusive six-row D19–D24 effect/N-A ledger |
| gate-runtime.mjs ★ | 8,371 | Canonical no-shell direct-Node gate runner substrate: 11-key env allowlist, embedded `.vnext/proof-runner.mjs` source + SHA-256, canonical gate argv, PATH-resolved executable, `repositoryStateSha256` (HEAD + binary diff + untracked + submodules) |
| hash-clean-report.mjs | 5,195 | Timestamp-secured clean-report hashing |
| implementation-challenge.mjs ★ | 1,596 | JCS hashes for the per-wave challenge: semantic subject (return minus challenge annex), challenge hash, gate contract projection, `sealGateReceiptChallenge` (gate-receipt v3 seals challenge hash) |
| json-contract.mjs | 11,231 | "Canonical text order for every formation authority" — strict UTF-8/no-BOM JSON, duplicate-member rejection, JCS ordering, canonical comparator |
| keyframes-contract.mjs | 23,983 | Keyframes inventory/transpose shared contract |
| keyframes-proof-contract.mjs | 36,865 | Typed receipt/hash helpers for K23 proofs |
| module-graph.mjs | 11,605 | Deterministic node/edge/package/SCC extractor for the DAG pins |
| p01-structural-contract.mjs | 29,191 | P01 authorship structural verifier (roles, epochs, read-sets) |
| probe-clean-report-absence.mjs | 968 | Pre-spawn ENOENT proof of clean-report absence |
| read-clean-critic-report.mjs | 1,482 | Exact adjudicator input reads |
| read-formation-evidence.mjs | 1,981 | Bounded line-hashed authority reads |
| resolve-consumer-universe.mjs | 41,774 | Fail-closed owner resolver (npm lock v2/v3 direct/transitive, realpaths, receipts, exit-2 unavailable law) |
| resolve-reopenings.mjs | 17,450 | C09 fail-closed latest-C08/terminal-owner resolver + JCS receipt |
| return-validation-mode.mjs | 205 | Tiny mode helper |
| seat-ledger-session-index.mjs | 697 | Duplicate-agent-path-rejecting seat lookup |
| seed-blocks.mjs | 4,899 | Exact seed-block extraction |
| validate-api-contract.mjs | 19,928 | Strict semantic API expansion/owner/profile/lifecycle validator |
| validate-api-return-coverage.mjs | 15,359 | Owner bijection + four-vector coverage validator |
| validate-api-target-paths.mjs | 13,481 | Two-runtime API path/ownership/isomorphism proof |
| validate-bbnf-host-control.mjs | 6,546 | Clean-archive BBNF host identity + executing control |
| validate-clean-passes.mjs | 56,850 | Exact prompt/session/model/command/epoch/evidence/pass-order validation of the two clean passes |
| validate-consumer-bounds.mjs | 845 | Bounds check CLI |
| validate-corpus.mjs | 10,620 | Aggregate link/count/signature validator that executes every machine validator + selftest above |
| validate-css-module-isomorphism.mjs | 30,002 | BBNF↔TS module-graph join + closed-world AST proof |
| validate-current-dags.mjs | 6,817 | Reruns all 5 pinned module graphs, checks counts/hashes/SCCs |
| validate-formation.mjs ★ | 4,905 | Parses the 4 wave files; enforces 7 cells, unique IDs, explicit dep lists, no cycles, band counts {P8,V44,K27,A36,G10,D33,M13,C19}, total 190; emits `vnext-formation-waves/1` canonical graph hash |
| validate-keyframes-current-inventory.mjs | 10,101 | K00/M00 census validator |
| validate-keyframes-public-package.mjs / -proof.mjs | 43,543 / 7,440 | K23 7.0.0 tarball/export/graph + offline install craters; immutable snapshot replay |
| validate-keyframes-target-transpose.mjs | 35,795 | K22T/M10T total transpose join validator |
| validate-p01-authorship.mjs | 62,381 | Codex JSONL / sibling-spawn / model-effort / ancestry / read-set verifier for P01 authors |
| validate-parse-that-package-receipt.mjs | 9,252 | Published 1.0.0 registry/no-link receipt validator |
| validate-pt-coordination.mjs | 12,147 | Immutable V1 twin + append-only V2 chain validator |
| validate-return.mjs | 158,052 | **The largest tool**: canonical return self-hash, triad challenge, status/gate law, designated-owner registry, deletion-annex 3-phase verifier, live/offline/historical/immutable-authority modes |
| validate-seat-ledger.mjs | 24,142 | JSONL/hash, Sol-ultra route, triad, iteration, external-campaign boundary validator |
| validate-seed-inventory.mjs | 11,661 | Independent seed-block extraction; zero-overlap/zero-omission proof over the 149 rows |
| validate-target-paths.mjs | 36,890 | Formation/execution/final path proof incl. all-KEEP/all-PRUNE realization |
| validate-value-current-inventory.mjs | 19,427 | V00A live capture + immutable replay |
| validate-value-public-surface.mjs | 43,695 | Value 5 tarball/export/tombstone with real no-link install |
| validate-value-target-resolutions.mjs | 6,856 | 16 terminal KEEP/PRUNE combos for V16B/V18H/V18V/V24 |
| validate-value-target-transpose.mjs | 49,690 | Composed V00A replay + target + package + consumer receipt + Git result proof |
| validate-wave-contracts.mjs | 4,240 | Prints signed JCS per-wave contract projections |
| value-target-owner-return.mjs | 15,171 | Owner-return composition helper |
| value-target-resolution-fixture.mjs / value-target-transpose-fixture.mjs | 73,282 / 35,973 | Five-Git-root isolated fixtures for the resolution/transpose validators |
| wave-contract.mjs | 5,951 | JCS wave-row/gate/outcome/edge projection (`vnext-wave-contract/1`) |
| wave-edge-policy.mjs ★ | 9,775 | Loads WAVE-EDGE-POLICY.json, joins it to the 190 wave contracts, expands all 759 edges with per-edge allowed statuses, verifies expected counts/hashes; exports `requireWaveEdgePolicy`/`requireWaveOutcome` |
| selftest-*.mjs (24 files) | 968–107,727 | Adversarial fail-open controls paired to each validator; largest: selftest-keyframes-target-transpose 107,727; selftest-contracts 84,897 (claims 88 fail-open probes); selftest-clean-exec-contract 68,558 (claims 225 rejections) |

(Remaining selftests not itemized: canonical-order 9,140; clean-coordinator-custody 35,376; clean-pass-prompts 4,134; clean-provider-bootstrap-authority 3,440; consumer-universe 36,700; corpus-safety 4,116; css-module-isomorphism 26,559; deletion-judgment 37,867; deletion-truth 11,406; formation-proof-layer 6,671; keyframes-current-inventory 30,850; keyframes-public-package 54,522; p01-authorship 30,592; p01-structural-contract 26,109; reopenings 5,974; target-paths 16,452; value-current-inventory 10,218; value-public-surface 26,346; value-target-resolutions 8,673; value-target-transpose 25,263; wave-edge-policy 4,420.)

## 2. The wave list as the formation defines it

**Structure**: 190 waves in 8 bands; every wave is one 7-cell table row (ID, Mission, Dependencies, Born-RED witness, Deliverables, Falsifiable gates, Exclusions/terminal branch). The *grain* is uniform: one wave = one born-RED-witnessed, falsifiably-gated implementation (or audit) cut with explicit dependencies; conditional facility waves must end in complete KEEP or complete PRUNE (never report-only). `tools/validate-formation.mjs` + `WAVE-EDGE-POLICY.json` (759 edges) are the executable graph; the prose DAGs are band summaries only.

**Band → owner repository** (FORMATION.md "Ownership"):

| Band | Count | Owner repo / surface | Spec file |
|---|---:|---|---|
| P | 8 | published `@mkbabb/parse-that@1.0.0` consumption + full-CSS prototype (evidence lives in value.js; **no parse-that source/package change**) | waves/P-V.md |
| V | 44 | value.js library (CSS, color, geometry, totality) | waves/P-V.md |
| K | 27 | keyframes.js library (canonical checkout `/Users/mkbabb/Programming/keyframes-v-exec`) | waves/K-A.md |
| A | 36 | value.js `/api` + fourier-analysis API/clients | waves/K-A.md |
| G | 10 | glass-ui | waves/G-D.md |
| D | 33 | value.js demo (14 routes) | waves/G-D.md |
| M | 13 | keyframes demo (7 routes) | waves/M-C.md |
| C | 19 | cross-repo consumer universe + closure + sole release (per-wave roots: Glass consumers C00, Atlas C01, sci-report C02, bbnf-buddy C02B, Slides C02D, bbnf-lang/playground C02L, Muster C02M, Speedtest C02S, Words C02W, Fourier C03P/C03/C04, rehearsal C05, API sec C06, physical C07, closure C08/C09, release C10) | waves/M-C.md |

**Complete ID roster** (band counts verified against `validate-formation.mjs` expectations — all match):

- P (8): P00 P01 P02 P03 P04 P05 P06 P07
- V (44): V00A V00B V00C V01 V02 V03 V04 V05 V06 V07 V08 V09 V10I V10S V10D V11 V12 V13 V14 V15 V15P V16A V16B V17 V18R V18H V18V V19 V20 V21 V22 V23 V24 V24C V24P V24M V25 V26 V27 V28 V29 V29T V30 V31
- K (27): K00 K01 K02 K03 K04I K04 K05 K06 K07 K08 K09 K10 K11 K12 K13 K14 K15 K16 K17 K18 K19 K20 K21 K22 K22T K23 K24
- A (36): A00 A01 A02 A03 A04 A05 A06 A07 A07T A08 A09 A09C A10 A11 A12 A13 A14 A15 A16 A17 A18 A19 A20 A21R A21 A22 A22S A21A A21J A23 A23S A23H A24 A25 A23C A26
- G (10): G00 G01 G02 G03 G04 G05 G06 G07 G08 G09
- D (33): D00A D17A D18A D00 D01 D02 D03 D03A D03T D04 D05 D06 D06N D07 D08 D09 D10 D11 D12 D12F D13 D14 D15 D16 D17 D18 D19 D20 D21 D22 D23 D24 D25
- M (13): M00 M01 M02 M03 M04 M05 M06 M07 M08 M09 M10 M10T M11
- C (19): C00U C00 C01 C02 C02B C02D C02L C02M C02S C02W C03P C03 C04 C05 C06 C07 C08 C09 C10

Audit-only waves (never repair): V30 V31 K24 A26 D25 M11 C06 C07 C08 C09. Conditional (KEEP|PRUNE) waves: V15P V16B V18H V18V V24 + K14–K22 facility decisions (fixed-prune: FLIP K14, view K15, motion-path K18, SplitText K19, Oscillator K20, ElementMorph K21, presets K22; fixed-keep: DrawSVG K16, MorphSVG K17 narrow). Transpose waves: V29T K22T M10T; package wave K23; release C10.

**Per-wave missions (truncated to ~110 chars; full text in the 7-cell rows of the named spec file):**

| Wave | Spec file | Mission (truncated) |
|---|---|---|
| P00 | waves/P-V.md | Freeze the exact published parse-that baseline, prove the historical BBNF host capsule, and append a current campaign coordination snapshot |
| P01 | waves/P-V.md | Build one adoption-free full-CSS prototype: an exact handwritten TypeScript parse-that-combinator mirror of every runtime BBNF module |
| P02 | waves/P-V.md | Adjudicate necessity/minimality for every prototype defect and route each without creating a Value-owned parse-that mutation |
| P03 | waves/P-V.md | Persist the P02-adjudicated research proposals in the uncommitted parse-that bank and prove zero executable influence |
| P04 | waves/P-V.md | Freeze the sole parse-that `no-rc` receipt |
| P05 | waves/P-V.md | Crater the identical full-CSS harness against the P04 published-1.0.0 control |
| P06 | waves/P-V.md | Run packed direct-consumer, Value full-CSS and traced keyframes-transitive craters on the exact 1.0.0 receipt |
| P07 | waves/P-V.md | Accept the exact unchanged 1.0.0 receipt or block Value adoption and hand that disposition to C10 |
| V00A | waves/P-V.md | Capture tagged-source, working-source, packed-export, API-by-name and consumer graphs without choosing a target |
| V00B | waves/P-V.md | Delete only the working-tree value→keyframes/glass runtime package edges and prove the packed boundary |
| V00C | waves/P-V.md | Establish ownership, naming, import and test-isomorphism constraints plus a hypothetical target topology |
| V01 | waves/P-V.md | Lock the July 2026 standards universe and define the total operation-vector support algebra |
| V02 | waves/P-V.md | Generate immutable standards facts and total-join them with a separately reviewed support manifest |
| V03 | waves/P-V.md | Transpose the adjudicated P01 execution-epoch mirror into the v4 public CSS parser with preprocessing, lossless spans |
| V04 | waves/P-V.md | Implement the complete pinned CSS value-definition language and bounded typed matcher/compiler |
| V05 | waves/P-V.md | Implement dimensions, units, math and context-free numeric evaluation with an explicit capability taxonomy |
| V06 | waves/P-V.md | Implement substitution over an explicitly already-cascaded token-value context |
| V07 | waves/P-V.md | Implement selectors, forgiving lists, nesting, namespaces, specificity and matching through an explicit adapter |
| V08 | waves/P-V.md | Implement query syntax and evaluate only pure leaves or caller-supplied capability results |
| V09 | waves/P-V.md | Implement ordered lossless declarations, rules, stylesheets, layers and nesting with bounded recovery |
| V10I | waves/P-V.md | Generate the exact pinned CSSOM WebIDL interface/member/exposure inventory |
| V10S | waves/P-V.md | Implement immutable serializable CSSOM snapshots explicitly distinct from native live objects |
| V10D | waves/P-V.md | Implement only explicit live-DOM CSSOM adapters and pinned exception behavior |
| V11 | waves/P-V.md | Implement only inventoried Typed OM interfaces/members over owned domains, opaque image snapshots |
| V12 | waves/P-V.md | Restore the pure color numeric model, spaces, white points, adaptation, conversions and canonicalization |
| V13 | waves/P-V.md | Implement stable CSS Color 4 parse/type/lower/serialize over the sole CSS and numeric spines |
| V14 | waves/P-V.md | Own and route the exact CSS Color 5/6 syntax inventory with independent maturity and operation cells |
| V15 | waves/P-V.md | Implement DeltaE OK/2000/ITP and select exactly one CSS Color 4 gamut-mapping policy from the current ED |
| V15P | waves/P-V.md | Terminally KEEP or PRUNE the non-CSS cusp/Halley gamut policy on independent worth and performance evidence |
| V16A | waves/P-V.md | (foundational allocation-controlled numeric kernels — precommitted limits) |
| V16B | waves/P-V.md | (terminal bulk/SoA decision for a named completed pipeline) |
| V17 | waves/P-V.md | (color interpolation) |
| V18R | waves/P-V.md | (ramps) |
| V18H | waves/P-V.md | (OKHSL independent terminal keep/prune) |
| V18V | waves/P-V.md | (OKHSV independent terminal keep/prune) |
| V19 | waves/P-V.md | (HDR) |
| V20 | waves/P-V.md | (profiles, contrast) |
| V21 | waves/P-V.md | (gradients) |
| V22 | waves/P-V.md | (images) |
| V23 | waves/P-V.md | (effects) |
| V24 | waves/P-V.md | (conditional transform-decomposition re-adopt or prune) |
| V24C | waves/P-V.md | (CSS transform adapter) |
| V24P | waves/P-V.md | (bounded SVG path core) |
| V24M | waves/P-V.md | (CSS motion outward adapter) |
| V25 | waves/P-V.md | (exact CSS easing; no invented CSS spring) |
| V26 | waves/P-V.md | (CSS keyframes) |
| V27 | waves/P-V.md | (animations/timelines) |
| V28 | waves/P-V.md | (ranges and triggers) |
| V29 | waves/P-V.md | (mechanical long-tail registry + total operation-vector join) |
| V29T | waves/P-V.md | (final accepted package/source/test transpose; total current-to-final join) |
| V30 | waves/P-V.md | (audit-only: standards/support totality) |
| V31 | waves/P-V.md | (audit-only: performance/limits repeat) |
| K00 | waves/K-A.md | (current keyframes inventory capture/replay) |
| K01 | waves/K-A.md | (JSON-safe ProgramSpec + resolved Ready/Refused plan; clock/driver fixed before playback) |
| K02 | waves/K-A.md | (no CSS/property semantics in keyframes; consume value types) |
| K03 | waves/K-A.md | (drivers) |
| K04I | waves/K-A.md | (generated total WAAPI/Web Animations IDL/WPT inventory) |
| K04 | waves/K-A.md | (full WAAPI lifecycle) |
| K05 | waves/K-A.md | (one clock; explicit WAAPI/rAF drivers) |
| K06 | waves/K-A.md | (errors, promises, events) |
| K07 | waves/K-A.md | (document/scroll/view timelines) |
| K08 | waves/K-A.md | (current-draft trigger delegation/refusal) |
| K09 | waves/K-A.md | (text/stylesheet/CSSOM/live ingest via value spine) |
| K10 | waves/K-A.md | (spring/decay; bounded standard `linear()` emission) |
| K11 | waves/K-A.md | (groups, sequences, stagger) |
| K12 | waves/K-A.md | (shared pointer/quaternion interaction core) |
| K13 | waves/K-A.md | (generic transition coordinator KEEP) |
| K14–K22 | waves/K-A.md | (terminal facility decisions: prune FLIP/View/motion-path/SplitText/Oscillator/ElementMorph/presets; keep DrawSVG/MorphSVG narrowly) |
| K22T | waves/K-A.md | (final keyframes transpose; delete `src/animation` mega-directory) |
| K23 | waves/K-A.md | (exact keyframes 7.0.0 package: `.`/`./engine`, light/heavy boundary, offline install) |
| K24 | waves/K-A.md | (audit-only) |
| A00–A20 | waves/K-A.md | (value `/api`: inventory, module transpose, external tests, immutable identity A04, recovery-key auth A05, authorization A06, CRUD A07–A10 + tier deletion A07T, history/variants/forks A10–A11, mixing A12–A13, votes/flags/tags/names/users/audit A14–A19, validators/OpenAPI/client A20) |
| A21R/A21/A21A/A21J/A22/A22S/A23/A23S/A23H/A23C/A24/A25/A26 | waves/K-A.md | (Fourier: accountless identity reset A21R/A22S, assets A21A, durable jobs A21J, CRUD/search/history/derivation/palette binding A22–A25, generated client A23C, audit-only A26) |
| G00–G09 | waves/G-D.md | (glass producer pack: census G00, primitives, lazy-mount G02, Breath G05, watercolor semantics G06, ElementMorph replacement migration G07, seat/event-region G08, easing glyphs G09) |
| D00A/D00–D25 | waves/G-D.md | (value demo: capability descriptors D00A, shadcn abrogation D00, URL state D01/D02, shell/toolbar D03/D03A/D03T, watercolor/sliders D04/D05, all 14 routes D06–D18 incl. AuroraAtoms D17A/D17 + Blob D18A/D18, admin D19–D24, audit-only D25) |
| M00–M11 | waves/M-C.md | (keyframes demo: inventory M00, URL state M01/M02, stage-first shell M03, Home+6 scenes M04–M10, final transpose M10T, audit-only M11) |
| C00U–C10 | waves/M-C.md | (consumer census C00U; Glass consumers C00; whole-root adoptions C01–C02W; Fourier C03P/C03/C04; rehearsal C05; API security C06; physical C07; closure passes C08/C09; sole release C10) |

(P00–V15P missions transcribed verbatim-truncated from the tables; parenthesized rows summarized from the same tables + DISPOSITIONS/PLAN because their mission cells are extremely long — the 7-cell rows in the named files remain the authority. A full id→file index is in §6.)

## 3. Registry / disposition row counts and coverage claims

| Ledger | Counted rows | Coverage claim (self-described) |
|---|---:|---|
| AUDIT-REGISTRY.md seat table | **32** | 32-agent audit; each seat requested `gpt-5.6-sol`/`ultra` ("content-attested", provider authentication explicitly a trust boundary); 8 band panels of skeptic A + skeptic B + adjudicator, plus 8 base auditors and 1 cross adjudicator |
| AUDIT-REGISTRY.md finding families | **14** (F-01..F-14) | Every family has evidence/owner + state; new family resets the clean counter |
| FORMATION-SEAT-LEDGER.json | 32 seats, 14 batches, 15 panels | Machine join of every seat to spawn call, JSONL, model/effort, hash; 3 external BBNF Sol/xhigh transcripts flagged `counted_in_formation_seats:false` |
| DISPOSITIONS.md | **96** rows (10 parser + 20 CSS/color + 23 keyframes + 13 demo/design + 22 API/identity + 8 tests/gates) | Binding keep/prune/replace/refuse per surface with owner + consequence |
| SEED-ROW-INVENTORY.json | **149** rows | Claims exact bijection of the two seed letters into rows; dispositions folded 140 / retired 6 / banked 3; phases impl 86 / both 47 / formation 16; `validate-seed-inventory.mjs` claims zero-overlap/zero-omission proof |
| FORMATION-ROOT-SEED-CONTRACT.json | 9 requirements | The 9 seed rows owned by formation itself; the other 140 embedded in wave contracts |
| PROMPT-RECAP.md request→wave table | **83** rows | Every prompt demand maps to owning waves (claimed complete; "every prompt demand maps to a wave" is a formation-completion condition) |
| OWNER-AMENDMENTS.md | **17** (OA-01..OA-17) | Chronological post-seed owner rulings; later narrower statement supersedes only on its axis |
| WAVE-EDGE-POLICY.json | 190 waves / **759 edges** | 723 COMPLETE-predecessor + 24 conditional + 4 KEEP-only + 8 PRUNE-only; hashes bound into every wave contract |
| API-OPERATIONS.md / api-contract.source.json | **147** operations (130 HTTP = 89 value + 41 Fourier; 17 headless) | Closed registry signed `A-ADJ-SOL3-ROUTES-2026-07-18`; tuple signatures SHA-256-pinned |
| API-RETURN-COVERAGE.json | 39 wave rows | Owned-vs-audited vectors for all A waves + C03/C06/C10; A00/A01/A26/C06/C10 bind all 147 |
| PROVENANCE.md repo register | 16 repositories | HEAD + porcelain-digest pins at 2026-07-18T16:50:04-0400 |

## 4. Self-described method, model routing, process

**Method (FORMATION.md, PLAN.md, AUDIT-REGISTRY.md):**
- Formation-only: production execution explicitly **0/190**, held until (1) all artifacts persisted, (2) pins refreshed, (3) every wave has mission/deps/born-RED/deliverables/falsifiable-gates/exclusions, (4) every prompt demand owned, (5) **two consecutive fresh whole-formation hostile clean passes**.
- The "thrice" unit everywhere: two fresh hostile critics who *assume the work is wrong* + one fresh adjudicator who agglomerates/proves/disproves/ameliorates. Applied at three grains: (a) per-band formation panels (the 32-seat audit), (b) per-implemented-wave final-state implementation-challenge triad (OA-15; bound as a typed annex in every terminal return, validated by `validate-return.mjs`), (c) whole-corpus closure — 2 formation clean passes now, and separately C08/C09 after execution (no credit transfers between layers).
- Max 3 iterations per cluster; a surviving mechanism escalates to `formation-root`, becomes a finding family, resets the clean counter. Audit waves never repair; defects reopen owners.
- Gate philosophy: born-RED witnesses mandatory; gates must be falsifiable; process is enforced by executable validators + adversarial selftests (fail-open probes) rather than prose; JCS/RFC-8785 self-hashes on every machine artifact; no-shell direct-Node proof runner with an 11-variable environment allowlist; deletion requires a 3-phase judged chain (owner-precut → C05 rehearsal → C10 final).

**Model routing (PROVENANCE.md "Model provenance", OA-01, OA-09, AUDIT-REGISTRY, CLEAN-PASS-PROTOCOL):**
- Owner substitution: **Fable → Sol; Opus → Luna**. All formation critics/adjudicators are Sol: requested/served `gpt-5.6-sol` at effort `ultra` (OA-09: `model_reasoning_effort="ultra"`, `approval_policy="never"`, `sandbox_mode="danger-full-access"`). Luna (Opus) is reserved for *future mechanical implementation fanout* and does not adjudicate formation.
- The corpus repeatedly marks provider authentication (session existence, freshness, independence, true served model/effort) as an **external trust boundary**: content attestation is claimed, cryptographic provenance is not. "Model declaration alone is insufficient; the served model must be verified where the execution surface exposes it."
- Desktop runtime limit: 3 concurrent children; the 32 seats were rotated through bounded cells (two persisted thread-limit failures cited as proof of the live limit).
- Three external BBNF-campaign Sol/`xhigh` transcripts are hashed as coordination evidence, explicitly not formation seats.

**Clean-pass process (FORMATION-CLEAN-PASS-PROTOCOL.md + AUDIT-REGISTRY):** frozen corpus epoch via `corpus-epoch.mjs` (hashes every corpus file + both seed letters; excludes the future clean-pass reports); per pass 3 fresh `fork_turns:none` Codex sessions with literal directives ASSUME-FORMATION-WRONG / ADJUDICATE-FORMATION; prompts byte-generated by `clean-pass-prompts.mjs`; pass 2 requires `CONSECUTIVE-PASS-2` + pass-1 report hash; extreme JSONL byte-forensics (single opaque NEW_TASK carrier, closed record vocabulary, pinned provider bootstrap via CLEAN-PROVIDER-BOOTSTRAP.json, custody + rehash via RR-15 tooling). **Status: zero passes achieved.** First attempt died on `canonical-exec-liveness` (→RR-14); an Agent-v2 assay sustained RR-15..RR-18; both earn zero credit.

**Return contract (RETURN-CONTRACT.md / return.schema.json):** `vnext-wave-return/2` clean break (v1 rejected); statuses COMPLETE|KEEP|PRUNE|REFUSED|BLOCKED|NOT_CLEAN with per-wave advancing-status vectors from the edge policy; typed absence only; 8-cell standards operation vector; gate-receipt v3 seals the implementation-challenge hash; validation modes default-live / `--offline` / `--historical-certificate` / `--immutable-authority`; unconditional deletion-owner registry frozen in the validator (V00B V29T; K02 K14 K15 K18 K19 K20 K21 K22 K22T K23; A03 A07T A18 A22S A23C; G07 D00; M00 M06 M10T C03P C03).

## 5. reviews/ — the thrice evidence

Three generations of review are present; **every verdict in the corpus is REFUTE / NOT CLEAN / defect-sustaining except one focused-scope CLEAN**; zero whole-formation clean passes exist.

**(a) Band formation triads (7 adjudications, run 2026-07-18 on the assembled band formations; panels = the seats in AUDIT-REGISTRY):**

| File | Size | Panel/scope | Result |
|---|---:|---|---|
| P-ADJUDICATION.md | 5,707 | Huygens/Mendel/Bernoulli on P00–P07 | 1.0 defects preserved; P band replaced; PT/BBNF novelty routed externally |
| V-ADJUDICATION.md | 9,917 | Gödel/Volta/Goodall on V00–V31/V24P | both REFUTE (15 + independent defect families, V-F01..V-F15); adjudicator NOT CLEAN; accepted 44-row V band (33→44 split map recorded) |
| K-ADJUDICATION.md | 7,641 | Franklin/Bacon/Hooke on K00–K24 | both REFUTE; NOT CLEAN; 25→27 K rows; G07 + 4 new C consumers; historical-topology notice: superseded on ordering by X-ADJ |
| A-ADJUDICATION.md | 7,953 | Zeno/James/Dirac on A00–A26 | both REFUTE; NOT CLEAN signed `A-ADJ-SOL3-2026-07-18`; accepted 36 A rows |
| GD-ADJUDICATION.md | 12,322 | Socrates/Hegel/Pauli on G/D | REFUTE ×2; NOT CLEAN `GD-ADJ-SOL3-2026-07-18`; accepted G10/D33; G07 dependency row later superseded by X-ADJ |
| MC-ADJUDICATION.md | 11,663 | Lagrange/Curie/Ptolemy on M/C | REFUTE ×2; NOT CLEAN `MC-ADJ-SOL3-2026-07-18`; accepted M13/C19 |
| X-ADJUDICATION.md | 5,103 | Descartes/Wegener/Raman cross-band | NOT CLEAN `X-ADJ-SOL3-2026-07-18`; 18 binding hardening amendments; supersedes K/GD/MC topology projections |

**(b) Formation-root reopening docket + focused repairs (2026-07-19):**

| File | Size | What ran / result |
|---|---:|---|
| ROOT-REOPENING-ADJUDICATION.md | 15,010 | Docket RR-01..RR-18; RR-01..13 closed by a focused pair+adjudicator; RR-14 exposed by the failed pass-1 attempt; RR-15..18 sustained by an "Agent-v2 current-disk assay"; whole-formation counter zero; 0/190 |
| DEPENDENCY-EPOCH-ADJUDICATION.md | 5,149 | Focused 2+1 on root-live/immutable-descendant/edge-status semantics → NOT CLEAN (temporal defect + 4 gaps) |
| UNIVERSAL-VALUE-EPOCH-SKEPTIC.md | 4,103 | Preserved hostile evidence: circular challenge/gate chronology P0 finding |
| CANONICAL-ORDER-SKEPTIC.md | 15,190 | 2026-07-19 ordering audit of validators/fixtures/hashes → NOT CLEAN |
| EXTERNAL-EPOCH-FIXTURE-SKEPTIC.md | 11,371 | Value fixture fabricated external consumer-root epoch → NOT CLEAN |
| EXTERNAL-EPOCH-FIXTURE-REPAIR.md | 10,779 | Causal RED→GREEN five-Git-root fixture repair ledger; formation evidence only |
| ROOT-REPAIR-SKEPTIC-A.md / -B.md | 3,819 / 3,205 | 2026-07-19 focused repair skeptics (A: universal proof contract; B: consumer/transpose/deletion joins) → both NOT CLEAN |
| ROOT-REPAIR-R2-SKEPTIC-A.md / -B.md | 2,264 / 1,784 | Round-2 skeptics; sustained RR-15/RR-17/Slides-K findings → NOT CLEAN |
| ROOT-REPAIR-IMPLEMENTATION.md | 13,116 | Repair ledger: RR-01..13 closed; RR-14..18 implemented but open pending a fresh pair+adjudicator |
| ROOT-REPAIR-ADJUDICATION.md | 12,771 | **The sole CLEAN**: `ROOT-REPAIR-ADJ-SOL3-R2-2026-07-19`, scope = six focused-repair families RA-01..04/RB-01..02 only; explicitly "whole-formation clean-pass credit remains zero" |

**(c) Not present:** the FORMATION-CLEAN-PASS-{1,2}-{A,B,ADJ}.md report files that `corpus-epoch.mjs` pre-excludes do not exist yet — consistent with the claimed 0-of-2 clean passes.

## 6. Machine-usable index: wave id → spec file

```
waves/P-V.md: P00 P01 P02 P03 P04 P05 P06 P07 V00A V00B V00C V01 V02 V03 V04 V05 V06 V07 V08 V09 V10I V10S V10D V11 V12 V13 V14 V15 V15P V16A V16B V17 V18R V18H V18V V19 V20 V21 V22 V23 V24 V24C V24P V24M V25 V26 V27 V28 V29 V29T V30 V31
waves/K-A.md: K00 K01 K02 K03 K04I K04 K05 K06 K07 K08 K09 K10 K11 K12 K13 K14 K15 K16 K17 K18 K19 K20 K21 K22 K22T K23 K24 A00 A01 A02 A03 A04 A05 A06 A07 A07T A08 A09 A09C A10 A11 A12 A13 A14 A15 A16 A17 A18 A19 A20 A21R A21 A22 A22S A21A A21J A23 A23S A23H A24 A25 A23C A26
waves/G-D.md: G00 G01 G02 G03 G04 G05 G06 G07 G08 G09 D00A D17A D18A D00 D01 D02 D03 D03A D03T D04 D05 D06 D06N D07 D08 D09 D10 D11 D12 D12F D13 D14 D15 D16 D17 D18 D19 D20 D21 D22 D23 D24 D25
waves/M-C.md: M00 M01 M02 M03 M04 M05 M06 M07 M08 M09 M10 M10T M11 C00U C00 C01 C02 C02B C02D C02L C02M C02S C02W C03P C03 C04 C05 C06 C07 C08 C09 C10
```

(Machine check: `node tools/validate-formation.mjs` in the snapshot parses exactly these IDs from exactly these files and expects {P:8,V:44,K:27,A:36,G:10,D:33,M:13,C:19}, total 190 — not executed by this inventory, read only.)

## Appendix: headline state claims (as the corpus states them, unverified)

- Production execution **0/190**; formation clean passes **0/2**; the only CLEAN verdict is the focused R2 repair adjudication.
- P01 authorship is deliberately `born_red` with **0 authors** enrolled.
- Value consumes only published `@mkbabb/parse-that@1.0.0`; C10 never republishes parse-that; all substrate novelty routed to the active SK-V25 BBNF campaign.
- Release targets (C10 only): value 5.0.0, keyframes 7.0.0, glass-ui 8.0.0, plus value/Fourier API migrations and consumer major adoptions.
