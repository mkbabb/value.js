# Arm A — Inventory of the Codex V-next Formation Corpus (FROZEN SNAPSHOT)

Neutral inventory only. No grading, no verification of the formation's own claims — this records what the corpus says about itself, read against the frozen snapshot.

## 0. Snapshot provenance

- **Source read:** `/Users/mkbabb/.claude/jobs/9e7dadd0/tmp/apotheosis/snapshot-vnext` — a copy of `docs/tranches/V/vnext`, **frozen 2026-07-19 21:29**; manifest at `…/apotheosis/snapshot-manifest.txt`. All counts, sizes and verdicts below are from this frozen copy, not the live tree.
- **Union note:** A prior Fable-tier draft (`armA/inventory-draft-v1.md`) read the then-LIVE tree at **2026-07-19 18:49** (≈2h40m earlier) — it explicitly could not find a snapshot/manifest and made its own copy. Its structure and nearly all row counts hold against the frozen snapshot and are carried forward here. **The one material drift** is `reviews/`: the frozen snapshot contains a whole additional R2+R3 repair round the draft never saw (see §5). Sizes drifted slightly upward on late-written tools/JSON; §1 uses frozen sizes.
- The quarantined `r1-opus-refuted` path was never read (not present inside `vnext/`; it lives in the keyframes mirror per PROVENANCE/FORMATION).
- The two seed letters (`keyframes-inbox-2026-07-18-vnext-ingestion-prompt.md` 20,179 B; `-formation-handoff.md` 32,719 B) live in `docs/tranches/V/coordination/` (parent of `vnext/`, mode 0600) — they exist on disk but are **outside** the snapshot corpus; they are the declared sole root context.

**Frozen snapshot totals:** 20 root `.md` · 14 root data `.json` · 35 root `*.schema.json` · 85 `tools/*.mjs` (26 `validate-*`, 24 `selftest-*`, rest builders/resolvers/helpers) · 4 `waves/*.md` · **24 `reviews/*.md`** · 5 `coordination/*` (2 md, 1 yaml, 1 data json, 1 schema json). No other subdirectories. R3 adjudicator's own canonical corpus projection = **183 files** (excludes future clean-pass reports + the R3 critic/adjudicator reports themselves), SHA-256 `3d7274f4…`.

---

## 1. Complete document map (file → role, size in bytes, frozen)

### Root narrative / authority documents (.md, 20)

| File | Size | Role |
|---|---:|---|
| README.md | 26,518 | Corpus index: names every artifact; per-band registry P8/V44/K27/A36/G10/D33/M13/C19=190; states production held **0/190**; C10 sole release |
| FORMATION.md | 9,976 | Charter: two seed letters as sole root context; thrice-critique law (2 hostile Sol + 1 Sol adjudicator, all `gpt-5.6-sol`/ultra); band registry; producer DAG; standing laws (no shims/aliases, breaking changes priced, value.js sole CSS authority, keyframes no server API, tests external isomorphic tree, C10 sole release); canonical URL-state law; 14 value routes + 7 keyframes routes; formation-completion conditions |
| PLAN.md | 11,833 | Execution order phases 0–6 (re-pin → parser P00–P06 → value spine V00A–V29T → parallel K/A/G → demos D/M → consumers C00U–C07 → closure C08/C09 → sole release C10); execution prohibition until 2 consecutive clean formation passes; per-wave 10-step method |
| AUDIT-REGISTRY.md | 15,080 | 32-seat formation audit ledger (named agents + dispositions); finding-family registry **F-01..F-14**; clean-pass law; records first whole-formation pass FAILED (`canonical-exec-liveness`→RR-14), Agent-v2 assay sustained RR-15..RR-18; clean-pass count **0**, production **0/190** |
| OWNER-AMENDMENTS.md | 8,837 | Chronological owner docket **OA-01..OA-17** (Fable→Sol / Opus→Luna substitution; ≥50-wave mandate; published-only parse-that OA-17; per-wave triad OA-15; CSS module isomorphism OA-16); 4-question deletion judgment |
| PROMPT-RECAP.md | 12,625 | Requirement-to-wave ownership: **83-row** request→wave table (+ a 9-row band table); product identities (Optical Instrumentarium / Chronographic Stage) |
| DISPOSITIONS.md | 17,773 | Binding keep/prune/replace/refuse rows across 6 tables = **96 disposition rows** (parser 10 + CSS/color 20 + keyframes 23 + demo/design 13 + API/identity 22 + tests/gates 8) |
| PROVENANCE.md | 14,987 | Seed/chat/repo/standards/dirty-state pins: **16-repository** register with HEAD + NUL-porcelain SHA-256 dirty digests (snapshot 2026-07-18T16:50:04-0400); value.js pin = `tranche-u` HEAD `c654824e`, keyframes canonical = `/Users/mkbabb/Programming/keyframes-v-exec` HEAD `81a56990`; C00U 15-root + 6-subdirectory law; model provenance (Sol/Luna; served model must be verified) |
| CURRENT-DAGS.md | 10,320 | Audited current package/module graphs (mermaid), incl. the invalid value→keyframes/glass production-dependency cycle; producer→consumer arrow law |
| TARGET-DAGS.md | 9,949 | Perfected target DAG; declares WAVE-EDGE-POLICY.json the sole machine status authority (759 edges) |
| DEMO-TARGET-DAGS.md | 14,829 | Exact Glass/value demo target trees + 13 edge kinds; signed `GD-ADJ-SOL3-2026-07-18` |
| PARSER-CSS-COLOR.md | 26,342 | Parser/CSS/color program: published parse-that 1.0.0 immutable substrate; PT-0.W0 deliberately RED; no parse-only artifact earns product credit; value.js CSS spine layering |
| KEYFRAMES-API.md | 22,123 | Keyframes/WAAPI program (ProgramSpec/ReadyTrack/CompileResult) + palette/Fourier API program; keyframes has no server API; single-tenant law |
| API-OPERATIONS.md | 19,954 | Closed operation registry signed `A-ADJ-SOL3-ROUTES-2026-07-18`: 130 HTTP (89 value + 41 Fourier) + 17 headless = **147**; tuple-signature SHA-256s; Idempotency-Key/If-Match notation |
| DESIGN-PROGRAM.md | 22,165 | Design mandate ("refinement, not reinvention"): Optical Instrumentarium / Chronographic Stage / Glass liquid restraint; Breath-of-Life bounded-motion laws |
| DESIGN-PROVENANCE.md | 3,963 | Design inputs: two owner Codex attachments, `frontend-design` plugin rubric, in-app browser audits; DesignSync banked as a method gap (retrigger G00/D00A/M00) |
| LIVE-VISUAL-AUDIT.md | 11,903 | 2026-07-18 deployed audit of color.babb.dev (14 routes) + keyframes.babb.dev (7 routes) at 390×844 and 1440×900; born-RED composition witnesses; shadcn/vendor residue census |
| STATE-ROUTING.md | 13,370 | URL envelope codec law: `#/route?…` deviations-from-defaults only; bounds; history/popstate/commit semantics; credentials never in URLs |
| RETURN-CONTRACT.md | 42,669 | Universal wave-return contract (human projection of return.schema.json): `vnext-wave-return/2`, JCS self-hash, statuses, operation vector, gate receipts v3, proof-runner law, deletion-judgment 3-phase chain, per-wave final-state implementation-challenge triad, C08/C09/C10 closure/release returns |
| FORMATION-CLEAN-PASS-PROTOCOL.md | 28,037 | Two-pass formation closure protocol: frozen corpus epoch (`corpus-epoch.mjs`), 3 fresh Codex sessions per pass (critic_a ASSUME-FORMATION-WRONG, critic_b, adjudicator), `gpt-5.6-sol`/ultra, `fork_turns:none`, byte-level JSONL forensics, provider bootstrap pinned by CLEAN-PROVIDER-BOOTSTRAP.json, explicit provider-trust boundary |

### Root machine artifacts (data .json, 14)

| File | Size | Shape / claim |
|---|---:|---|
| FORMATION-SEAT-LEDGER.json | 59,907 | `vnext-formation-seat-ledger/1`; **32 seats, 14 batches, 15 panels**; external_upstream_bbnf block (`counted_in_formation_seats:false`) |
| SEED-ROW-INVENTORY.json | 77,132 | `vnext-seed-row-inventory/2`; 2 seed letters SHA-256-pinned; **149 rows**; dispositions folded 140 / retired 6 / banked 3; phases implementation 86 / both 47 / formation 16 |
| FORMATION-ROOT-SEED-CONTRACT.json | 3,674 | 9 formation-root-owned seed requirements (other 140 embedded in wave contracts); contract_hash |
| WAVE-EDGE-POLICY.json | 1,998 | `vnext-wave-edge-policy/1`; **190 waves / 759 edges** (723 completion-predecessor + 24 conditional + 4 requires-keep + 8 requires-prune); `edges_sha256`, `wave_outcomes_sha256`, manifest_hash |
| API-RETURN-COVERAGE.json | 60,671 | **39 wave rows**; universe 147 ops (value 96 = 89 HTTP + 7 headless; Fourier 51 = 41 + 10) |
| API-TARGET-PATHS.json | 31,478 | `vnext-api-target-paths/1`; operationDomainUnits, value+fourier runtimes, laws, manifest_sha256 |
| api-contract.source.json | 253,823 | Generator-grade semantics: `http` list **130** + `headless` list **17**; closedCounts, per-op schema refs, authority, cache/CORS, lifecycle |
| VALUE-TARGET-PATHS.json | 26,334 | Library+demo target trees, test_path_law, conditional paths, forbidden roots; manifest_sha256 |
| KEYFRAMES-TARGET-PATHS.json | 8,045 | Same for keyframes library+demo |
| CSS-MODULE-ISOMORPHISM.json | 7,406 | 15 runtime BBNF modules → `src/css/grammar/l4` 1:1 mirror; 1 edge correction; 1 excluded (pretty.bbnf test-oracle-only) |
| P01-INDEPENDENT-AUTHORSHIP.json | 11,251 | state **`born_red`**; author_receipts **0 authors**; contract for 2 isolated Sol-ultra full-CSS authors + third-Sol adjudication; 9 completion conditions |
| BBNF-HOST-CONTROL.json | 2,749 | Content-addressed historical BBNF host capsule; `imports_active_novelty:false` |
| CLEAN-PROVIDER-BOOTSTRAP.json | 1,974 | Pre-campaign provider-envelope calibration (calibrated 2026-07-19T20:05:53Z; session/prefix SHA-256s) |
| CONSUMER-UNIVERSE-BOUNDS.json | 5,419 | `vnext-consumer-universe-bounds/2`; search_roots 1, ignored_directory_names 20, edge_scope 5, **required_roots 15** (incl. Slides-K) + **required_paths 6**; bounds_sha256, manifest_hash |

### Schemas (35 root `*.schema.json`; name — size — purpose from title)

api-contract.source 12,347 (semantic API contract source) · bbnf-host-control 2,879 · **consumer-universe 10,975** ("V-next closed, observed consumer universe") · consumer-universe-receipt 6,803 (self-hashed frozen-epoch resolved-owner receipt) · css-module-isomorphism 5,588 · deletion-delta-receipt 3,673 · **deletion-judgment 21,327** ("Executable deletion judgment and total-join annex") · formation-clean-passes 8,445 · gate-receipt 3,786 (v3; props: wave_id/gate_id/subject/expected/wave_contract_sha256/challenge_sha256/proof_manifest/result/execution/evidence/receipt_hash) · git-tree-snapshot 2,250 · keyframes-current-inventory 6,942 + -validation 2,728 · keyframes-physical-transpose 4,389 · keyframes-public-package 11,381 + -snapshot 5,808 + -validation 6,823 · keyframes-target-decisions 3,269 · keyframes-target-transpose 11,133 + -validation 5,582 · p01-access-projection 2,716 · p01-css-corpus 4,305 · p01-differential-ledger 7,144 · p01-grammar-oracle-proposal 3,782 · p01-independent-authorship 16,870 · p01-input-epoch 7,469 · p01-origin-ledger 6,184 · p01-typescript-combinators-proposal 3,264 · parse-that-package-receipt 2,730 · resolved-reopenings 3,084 (C09 receipt) · **return.schema.json 59,990** — the largest; title "V-next canonical wave return", `$id …vnext-wave-return-2.json`, top props: schema/wave_id/status/return_hash/evidence_inputs/quarantine_attestation/pins/scope/born_red/delivery/dag_delta/gates/api_contract/visual/performance/limits/consumers/terminal_disposition/standards_operation_vector/routed_remainder/verdict/annexes · value-current-inventory 4,242 · value-public-surface 7,276 (v2) · value-target-resolutions 2,215 · value-target-transpose 6,441 · wave-edge-policy 3,129. Plus coordination/pt-e-bbnf-live-coordination-v2.schema.json 10,000.

### waves/ (4 files — the executable wave registry)

| File | Size | Rows | Contents |
|---|---:|---:|---|
| waves/P-V.md | 50,033 | 52 | P00–P07 (8) + V00A–V31 (44); shared formation/execution + proof/return law |
| waves/K-A.md | 40,274 | 63 | K00–K24 (27) + A00–A26 (36) |
| waves/G-D.md | 35,922 | 43 | Shared π contract + signed frontend DAG; G00–G09 (10) + D00A–D25 (33) |
| waves/M-C.md | 32,073 | 32 | M00–M11 (13) + C00U–C10 (19) |

Row format everywhere = exactly 7 cells: `ID | Mission | Dependencies | Born-RED witness | Deliverables | Falsifiable gates | Exclusions/terminal branch`. `tools/validate-formation.mjs` enforces cell count, ID uniqueness, explicit comma-separated deps, acyclicity, band counts {P8,V44,K27,A36,G10,D33,M13,C19}, total 190. Verified rows-per-file: 52+63+43+32 = **190**.

### tools/ (85 .mjs; ~2.2 MB) — convention: `validate-*` (26 live validators), `selftest-*` (24 adversarial fail-open controls), rest builders/resolvers/helpers

Four read fully (★, carried from draft) + purposes from README's per-tool ledger:

| File | Size | One-line purpose |
|---|---:|---|
| build-seat-ledger.mjs | 17,181 | Read-only immutable 32-seat ledger emitter ("never writes") |
| clean-coordinator-custody.mjs | 40,537 | RR-15 continuous physical-line root custody, phase transactions, report hashes |
| clean-exec-contract.mjs | 78,326 | RR-14 exact pragma launch/poll state machine, bounded output, terminal closure |
| clean-pass-prompts.mjs | 9,827 | Byte-canonical content-addressed critic/adjudicator prompts + attestations |
| clean-provider-bootstrap-authority.mjs | 9,813 | Pre-campaign same-root provider-envelope calibration authority |
| consumer-bounds-authority.mjs | 13,515 | Exact three-field bounds binding; requires every required root/subdir present |
| consumer-universe-fixture.mjs | 18,325 | Isolated 15-real-Git-root / 6-subdirectory test fixture |
| consumer-universe-return.mjs | (grew) | Consumer-universe return-annex helpers (a surface flagged by R3, see §5) |
| consumer-universe-return-mode-fixture.mjs | 2,177 | Return-mode fixture helper |
| corpus-epoch.mjs ★ | 2,766 | Frozen-corpus epoch: SHA-256 over every canonical corpus file + 2 seed letters, excluding future clean-pass reports; `computeCorpusEpoch` |
| corpus-files.mjs | 2,138 | No-symlink bounded corpus enumeration |
| deletion-judgment.mjs | 41,401 | Executable full-universe casualty/tombstone/archive decisions + 3-phase aggregation |
| deletion-truth.mjs | 22,705 | Physical Git-tree before/after deletion receipts |
| formation-proof-layer.mjs | 9,274 | Triad-before-gate order + exclusive six-row D19–D24 effect/N-A ledger |
| gate-runtime.mjs ★ | 8,371 | Canonical no-shell direct-Node gate runner: 11-key env allowlist, embedded `.vnext/proof-runner.mjs` + SHA-256, `repositoryStateSha256` |
| hash-clean-report.mjs | 5,195 | Timestamp-secured / descriptor-identity clean-report hashing |
| implementation-challenge.mjs ★ | 1,596 | JCS hashes for per-wave challenge; `sealGateReceiptChallenge` (gate-receipt v3) |
| json-contract.mjs | 11,231 | Strict UTF-8/no-BOM JSON, duplicate-member rejection, JCS ordering, canonical comparator |
| keyframes-contract.mjs | 23,983 | Keyframes inventory/transpose shared contract |
| keyframes-proof-contract.mjs | 36,865 | Typed receipt/hash helpers for K23 proofs |
| module-graph.mjs | 11,605 | Deterministic node/edge/package/SCC extractor for DAG pins |
| p01-structural-contract.mjs | 29,191 | P01 authorship structural verifier (roles, epochs, read-sets) |
| probe-clean-report-absence.mjs | 968 | Pre-spawn ENOENT proof of clean-report absence |
| read-clean-critic-report.mjs | 1,482 | Exact adjudicator input reads |
| read-formation-evidence.mjs | 1,981 | Bounded line-hashed authority reads |
| resolve-consumer-universe.mjs | 67,068 | Fail-closed owner resolver (npm lock v2/v3 direct/transitive, realpaths, receipts, exit-2 law) — **the surface R3 reopened (RR-17), see §5** |
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
| validate-corpus.mjs | 10,620 | Aggregate link/count/signature validator that runs every machine validator + selftest |
| validate-css-module-isomorphism.mjs | 30,002 | BBNF↔TS module-graph join + closed-world AST proof |
| validate-current-dags.mjs | 6,817 | Reruns all 5 pinned module graphs; checks counts/hashes/SCCs |
| validate-formation.mjs ★ | 4,905 | Parses 4 wave files; enforces 7 cells, unique IDs, explicit deps, no cycles, band counts, total 190; emits `vnext-formation-waves/1` graph hash |
| validate-keyframes-current-inventory.mjs | 10,101 | K00/M00 census validator |
| validate-keyframes-public-package.mjs / -proof.mjs | 43,543 / 7,440 | K23 7.0.0 tarball/export/graph + offline install craters; immutable snapshot replay |
| validate-keyframes-target-transpose.mjs | 35,795 | K22T/M10T total transpose join validator |
| validate-p01-authorship.mjs | 62,381 | Codex JSONL / sibling-spawn / model-effort / ancestry / read-set verifier for P01 authors |
| validate-parse-that-package-receipt.mjs | 9,252 | Published 1.0.0 registry/no-link receipt validator |
| validate-pt-coordination.mjs | 12,147 | Immutable V1 twin + append-only V2 chain validator |
| validate-return.mjs | 163,169 | **The largest tool**: canonical return self-hash, triad challenge, status/gate law, designated-owner registry, deletion-annex 3-phase verifier, live/offline/historical/immutable-authority modes |
| validate-seat-ledger.mjs | 24,142 | JSONL/hash, Sol-ultra route, triad, iteration, external-campaign boundary validator |
| validate-seed-inventory.mjs | 11,661 | Independent seed-block extraction; zero-overlap/zero-omission proof over the 149 rows |
| validate-target-paths.mjs | 36,890 | Formation/execution/final path proof incl. all-KEEP/all-PRUNE realization |
| validate-value-current-inventory.mjs | 19,427 | V00A live capture + immutable replay |
| validate-value-public-surface.mjs | 43,695 | Value 5 tarball/export/tombstone with real no-link install |
| validate-value-target-resolutions.mjs | 6,856 | 16 terminal KEEP/PRUNE combos for V16B/V18H/V18V/V24 |
| validate-value-target-transpose.mjs | 49,690 | Composed V00A replay + target + package + consumer receipt + Git result proof |
| validate-wave-contracts.mjs | 4,240 | Prints signed JCS per-wave contract projections |
| value-target-owner-return.mjs | 15,171 | Owner-return composition helper |
| value-target-resolution-fixture.mjs / value-target-transpose-fixture.mjs | 73,282 / 35,973 | Five-Git-root isolated fixtures |
| wave-contract.mjs | 5,951 | JCS wave-row/gate/outcome/edge projection (`vnext-wave-contract/1`) |
| wave-edge-policy.mjs ★ | 9,775 | Loads WAVE-EDGE-POLICY.json, joins to 190 wave contracts, expands all 759 edges, verifies counts/hashes; `requireWaveEdgePolicy`/`requireWaveOutcome` |

**selftest-* (24)**, adversarial fail-open controls paired to each validator; largest: selftest-contracts 123,762 (claims 88 fail-open probes) · selftest-keyframes-target-transpose 107,727 · selftest-consumer-universe 69,922 · selftest-clean-exec-contract 68,558 (claims 225 rejections) · selftest-keyframes-public-package 54,522 · selftest-deletion-judgment 39,215 · selftest-clean-coordinator-custody 35,376 · then canonical-order 9,140, clean-pass-prompts 4,134, clean-provider-bootstrap-authority 3,440, corpus-safety 4,116, css-module-isomorphism 26,559, deletion-truth 11,406, formation-proof-layer 6,671, keyframes-current-inventory 30,850, p01-authorship 30,592, p01-structural-contract 26,109, reopenings 5,974, target-paths 16,452, value-current-inventory 10,218, value-public-surface 26,346, value-target-resolutions 8,673, value-target-transpose 25,263, wave-edge-policy 4,420.

### coordination/ (5 files)

| File | Size | Role |
|---|---:|---|
| HANDOFFS.md | 24,847 | Packetized sibling-repo letters; packet law; repeats C00U 15-root + 6-subdirectory law and exact C ledger |
| BBNF-PARSE-THAT-MAJOR-HANDOFF.md | 7,683 | External routing of all parse-that/BBNF novelty to the active SK-V25/T/U campaign; v1 packet frozen at SHA-256 `f7d60b45…` |
| pt-e-bbnf-handoff-v1.yaml | 2,384 | Byte-canonical frozen historical machine packet (never edited) |
| pt-e-bbnf-live-coordination-v2.json | 7,082 | Append-only JCS event stream (snapshot/intent/acknowledgement) with SK-V25 pins |
| pt-e-bbnf-live-coordination-v2.schema.json | 10,000 | Schema for the v2 stream |

---

## 2. The wave list as the formation defines it

**Grain (uniform):** one wave = one 7-cell table row = one born-RED-witnessed, falsifiably-gated implementation (or audit) cut with explicit comma-separated dependencies. Conditional facility waves must end in complete KEEP or complete PRUNE (never report-only). `validate-formation.mjs` + WAVE-EDGE-POLICY.json (759 edges) are the executable graph; the prose DAGs are band summaries.

**Band → owner repository:**

| Band | Count | Owner repo / surface | Spec file |
|---|---:|---|---|
| P | 8 | published `@mkbabb/parse-that@1.0.0` consumption + full-CSS prototype (evidence in value.js; **no parse-that source/package change**) | waves/P-V.md |
| V | 44 | value.js library (CSS, color, geometry, totality) | waves/P-V.md |
| K | 27 | keyframes.js library (canonical checkout `/Users/mkbabb/Programming/keyframes-v-exec`) | waves/K-A.md |
| A | 36 | value.js `/api` + fourier-analysis API/clients | waves/K-A.md |
| G | 10 | glass-ui | waves/G-D.md |
| D | 33 | value.js demo (14 routes) | waves/G-D.md |
| M | 13 | keyframes demo (7 routes) | waves/M-C.md |
| C | 19 | cross-repo consumer universe + closure + sole release | waves/M-C.md |
| **Total** | **190** | | |

C-band per-wave owners: C00U universe discovery, C00 Glass consumers, C01 Atlas, C02 sci-report, C02B bbnf-buddy, C02D Slides, C02L bbnf-lang/playground, C02M Muster, C02S Speedtest, C02W Words, C03P/C03/C04 Fourier, C05 rehearsal, C06 API security/load, C07 physical proof, C08/C09 closure, C10 sole release.

**Complete ID roster (verified from wave files; sets exact — note G07 physically appears after G09 in file order):**

- P (8): P00 P01 P02 P03 P04 P05 P06 P07
- V (44): V00A V00B V00C V01 V02 V03 V04 V05 V06 V07 V08 V09 V10I V10S V10D V11 V12 V13 V14 V15 V15P V16A V16B V17 V18R V18H V18V V19 V20 V21 V22 V23 V24 V24C V24P V24M V25 V26 V27 V28 V29 V29T V30 V31
- K (27): K00 K01 K02 K03 K04I K04 K05 K06 K07 K08 K09 K10 K11 K12 K13 K14 K15 K16 K17 K18 K19 K20 K21 K22 K22T K23 K24
- A (36): A00 A01 A02 A03 A04 A05 A06 A07 A07T A08 A09 A09C A10 A11 A12 A13 A14 A15 A16 A17 A18 A19 A20 A21R A21 A22 A22S A21A A21J A23 A23S A23H A24 A25 A23C A26
- G (10): G00 G01 G02 G03 G04 G05 G06 G08 G09 G07 (file order; canonical set G00–G09)
- D (33): D00A D17A D18A D00 D01 D02 D03 D03A D03T D04 D05 D06 D06N D07 D08 D09 D10 D11 D12 D12F D13 D14 D15 D16 D17 D18 D19 D20 D21 D22 D23 D24 D25
- M (13): M00 M01 M02 M03 M04 M05 M06 M07 M08 M09 M10 M10T M11
- C (19): C00U C00 C01 C02 C02B C02D C02L C02M C02S C02W C03P C03 C04 C05 C06 C07 C08 C09 C10

**Audit-only waves (never repair):** V30 V31 K24 A26 D25 M11 C06 C07 C08 C09.
**Conditional (KEEP|PRUNE):** V15P V16B V18H V18V V24 + K14–K22 facility decisions (fixed-prune FLIP K14 / View K15 / motion-path K18 / SplitText K19 / Oscillator K20 / ElementMorph K21 / presets K22; fixed-keep DrawSVG K16 / MorphSVG K17 narrow).
**Transpose waves:** V29T K22T M10T. **Package wave:** K23. **Release:** C10.

(Per-wave missions transcribed in the draft's §2 table remain accurate; the 7-cell rows in the named spec files are the authority. Machine index in §6.)

---

## 3. Registry / disposition row counts (all VERIFIED against frozen snapshot)

| Ledger | Rows | Coverage claim |
|---|---:|---|
| AUDIT-REGISTRY.md seat table | **32** | 32-agent audit; every seat requested `gpt-5.6-sol`/ultra ("content-attested"; provider auth = external trust boundary); 8 band panels (skeptic A + B + adjudicator) + base auditors + 1 cross adjudicator |
| AUDIT-REGISTRY.md finding families | **14** (F-01..F-14) | Every family has evidence/owner + state; new family resets clean counter |
| FORMATION-SEAT-LEDGER.json | 32 seats / 14 batches / 15 panels | Machine join seat→spawn/JSONL/model/hash; 3 external BBNF Sol/xhigh transcripts `counted_in_formation_seats:false` |
| DISPOSITIONS.md | **96** | Binding keep/prune/replace/refuse per surface with owner + consequence |
| SEED-ROW-INVENTORY.json | **149** | Bijection of the 2 seed letters; folded 140 / retired 6 / banked 3; phases impl 86 / both 47 / formation 16; `validate-seed-inventory.mjs` claims zero-overlap/zero-omission |
| FORMATION-ROOT-SEED-CONTRACT.json | **9** | Seed rows owned by formation itself; other 140 embedded in wave contracts |
| PROMPT-RECAP.md request→wave | **83** | Every prompt demand maps to owning waves ("every prompt demand maps to a wave" is a completion condition) |
| OWNER-AMENDMENTS.md | **17** (OA-01..OA-17) | Chronological owner rulings; later narrower statement supersedes only on its axis |
| WAVE-EDGE-POLICY.json | 190 waves / **759 edges** | 723 completion-predecessor + 24 conditional + 4 requires-keep + 8 requires-prune; hashes bound into every wave contract |
| API-OPERATIONS / api-contract.source | **147** ops (130 HTTP = 89 value + 41 Fourier; 17 headless) | Closed registry signed `A-ADJ-SOL3-ROUTES-2026-07-18`; tuple SHA-256s |
| API-RETURN-COVERAGE.json | **39** wave rows | Owned-vs-audited vectors for all A waves + C03/C06/C10; A00/A01/A26/C06/C10 bind all 147 |
| PROVENANCE.md repo register | **16** repositories | HEAD + porcelain-digest pins at 2026-07-18T16:50:04-0400 |
| CONSUMER-UNIVERSE-BOUNDS.json | 15 required_roots + 6 required_paths | Fail-closed C00U/C05 discovery authority (incl. Slides-K) |

---

## 4. Self-described method, model routing, process

**Method (FORMATION / PLAN / AUDIT-REGISTRY):**
- Formation-only: production execution **0/190**, held until (1) all artifacts persisted, (2) pins refreshed, (3) every wave has 7 cells, (4) every prompt demand owned, (5) **two consecutive fresh whole-formation hostile clean passes**.
- The "thrice" unit at 3 grains: (a) per-band formation panels (the 32-seat audit), (b) per-implemented-wave final-state implementation-challenge triad (OA-15; typed annex in every terminal return, validated by `validate-return.mjs`), (c) whole-corpus closure — 2 formation clean passes now, plus C08/C09 after execution (no credit transfers between layers).
- Max 3 iterations per cluster; a surviving mechanism escalates to `formation-root`, becomes a finding family, resets the clean counter. Audit waves never repair; defects reopen owners.
- Gate philosophy: born-RED witnesses mandatory; falsifiable gates; enforced by executable validators + adversarial selftests (fail-open probes) not prose; JCS/RFC-8785 self-hashes on every machine artifact; no-shell direct-Node proof runner with an 11-variable env allowlist; deletion requires a 3-phase judged chain (owner-precut → C05 rehearsal → C10 final).

**Model routing:** Owner substitution **Fable → Sol; Opus → Luna**. All formation critics/adjudicators are Sol, requested/served `gpt-5.6-sol` at effort `ultra` (OA-09: `model_reasoning_effort="ultra"`, `approval_policy="never"`, `sandbox_mode="danger-full-access"`). Luna (Opus) is reserved for future mechanical implementation fanout; it does not adjudicate formation. Provider authentication (session existence/freshness/independence/true served model) is repeatedly declared an **external trust boundary**: content attestation claimed, cryptographic provenance not. Desktop runtime limit = 3 concurrent children; 32 seats rotated through bounded cells (two persisted thread-limit failures cited as proof). Three external BBNF Sol/`xhigh` transcripts hashed as coordination evidence, explicitly not formation seats.

**Clean-pass process (FORMATION-CLEAN-PASS-PROTOCOL):** frozen corpus epoch via `corpus-epoch.mjs` (hashes every corpus file + both seed letters; excludes future clean-pass reports); per pass 3 fresh `fork_turns:none` Codex sessions (ASSUME-FORMATION-WRONG / ADJUDICATE); prompts byte-generated by `clean-pass-prompts.mjs`; pass 2 requires `CONSECUTIVE-PASS-2` + pass-1 report hash; JSONL byte-forensics (opaque NEW_TASK carrier, closed record vocabulary, pinned provider bootstrap, RR-15 custody + rehash). **Status: zero passes achieved.**

**Return contract (RETURN-CONTRACT / return.schema.json):** `vnext-wave-return/2` clean break (v1 rejected); statuses COMPLETE|KEEP|PRUNE|REFUSED|BLOCKED|NOT_CLEAN with per-wave advancing-status vectors from the edge policy; typed absence only; 8-cell standards operation vector; gate-receipt v3 seals the implementation-challenge hash; modes default-live / `--offline` / `--historical-certificate` / `--immutable-authority`; frozen unconditional deletion-owner registry (V00B V29T; K02 K14 K15 K18 K19 K20 K21 K22 K22T K23; A03 A07T A18 A22S A23C; G07 D00; M00 M06 M10T C03P C03).

---

## 5. reviews/ — the thrice evidence (24 files) — **UPDATED: the draft missed the R2+R3 repair round**

Three+ generations of review. **Every verdict is REFUTE / NOT CLEAN except one focused-scope CLEAN (RR-01..13, R2).** Zero whole-formation clean passes. The FROZEN snapshot's newest file, `ROOT-REPAIR-R3-ADJUDICATION.md` (19:39), reopened **RR-17/C00U as NOT CLEAN** — the draft's "sole CLEAN = state of the art" framing is stale.

**(a) Band formation triads (7 adjudications, 2026-07-18):**

| File | Size | Panel / scope | Result |
|---|---:|---|---|
| P-ADJUDICATION.md | 7,953 | Huygens/Mendel/Bernoulli · P00–P07 | 1.0 defects preserved; P band replaced; PT/BBNF novelty routed externally |
| V-ADJUDICATION.md | 9,917 | Gödel/Volta/Goodall · V00–V31 | both REFUTE (V-F01..V-F15); NOT CLEAN; accepted 44-row V (33→44 split) |
| K-ADJUDICATION.md | 7,641 | Franklin/Bacon/Hooke · K00–K24 | both REFUTE; NOT CLEAN; 25→27 K; G07 + 4 new C consumers; superseded on ordering by X-ADJ |
| A-ADJUDICATION.md | 7,953 | Zeno/James/Dirac · A00–A26 | both REFUTE; NOT CLEAN `A-ADJ-SOL3-2026-07-18`; 36 A rows |
| GD-ADJUDICATION.md | 12,322 | Socrates/Hegel/Pauli · G/D | REFUTE ×2; NOT CLEAN `GD-ADJ-SOL3-2026-07-18`; G10/D33 |
| MC-ADJUDICATION.md | 11,663 | Lagrange/Curie/Ptolemy · M/C | REFUTE ×2; NOT CLEAN `MC-ADJ-SOL3-2026-07-18`; M13/C19 |
| X-ADJUDICATION.md | 5,103 | Descartes/Wegener/Raman · cross-band | NOT CLEAN `X-ADJ-SOL3-2026-07-18`; 18 binding hardening amendments; supersedes K/GD/MC topology |

**(b) Formation-root reopening docket RR-01..RR-18 + focused repair rounds (2026-07-19):**

| File | Size | What ran / result |
|---|---:|---|
| ROOT-REOPENING-ADJUDICATION.md | 15,010 | Master docket RR-01..RR-18. Status: "**REOPENED THROUGH RR-18; WHOLE FORMATION NOT YET CLEAN.**" RR-01..13 closed by focused pair+adjudicator (R2); RR-14 exposed by failed pass-1; RR-15..18 sustained by an Agent-v2 current-disk assay; counter zero; **0/190** |
| DEPENDENCY-EPOCH-ADJUDICATION.md | 5,149 | Focused 2+1 on root-live/immutable-descendant/edge-status semantics → NOT CLEAN (temporal defect + 4 gaps) |
| UNIVERSAL-VALUE-EPOCH-SKEPTIC.md | 4,103 | Preserved hostile evidence: circular challenge/gate chronology P0 |
| CANONICAL-ORDER-SKEPTIC.md | 15,190 | Ordering audit of validators/fixtures/hashes → NOT CLEAN |
| EXTERNAL-EPOCH-FIXTURE-SKEPTIC.md | 11,371 | Value fixture fabricated external consumer-root epoch → NOT CLEAN |
| EXTERNAL-EPOCH-FIXTURE-REPAIR.md | 10,779 | Causal RED→GREEN five-Git-root fixture repair ledger; formation evidence only |
| ROOT-REPAIR-SKEPTIC-A.md / -B.md | 3,819 / 3,205 | R1 focused repair skeptics → both NOT CLEAN |
| ROOT-REPAIR-IMPLEMENTATION.md | 13,116 | Repair ledger: RR-01..13 closed; RR-14..18 implemented but open pending fresh pair+adjudicator; 32-row byte-identity ledger |
| ROOT-REPAIR-ADJUDICATION.md | 12,771 | **The ONLY CLEAN verdict**: `ROOT-REPAIR-ADJ-SOL3-R2-2026-07-19`, scope = focused-repair families RA-01..04/RB-01..02 (i.e. RR-01..13) only; explicitly "whole-formation clean-pass credit remains zero" |
| ROOT-REPAIR-R2-SKEPTIC-A.md / -B.md | 2,264 / 1,784 | Round-2 skeptics; sustained RR-15/RR-17/Slides-K → both NOT CLEAN |
| **ROOT-REPAIR-R3-SKEPTIC-A.md** | 11,680 | R3 hostile A → NOT CLEAN |
| **ROOT-REPAIR-R3-SKEPTIC-A2.md** | 14,336 | R3 hostile A (2nd) |
| **ROOT-REPAIR-R3-SKEPTIC-A3.md** | 15,479 | R3 hostile A (3rd, authenticated input to R3 adj) → **NOT CLEAN** |
| **ROOT-REPAIR-R3-SKEPTIC-B.md** | 22,846 | R3 hostile B (authenticated input to R3 adj) → NOT CLEAN |
| **ROOT-REPAIR-R3-ADJUDICATION.md** | 24,110 | **NEWEST (19:39) — NOT CLEAN.** Focused R3 triad over RR-14..18. Verdict: **RR-17/C00U REOPENED**; RR-14/15/16/18 "locally closed"; 32 byte-identities still match. Finds the source projector omits template dynamic-imports + misclassifies inline `type` specifiers → false `resolvable:true`; the required-root unavailable branch is not end-to-end inhabitable across bounds/resolver/receipt/annex-schema/return. Prescribes **3 minimal correction slices** (source projection · disposition-aware bounds/resolver/receipt · C00U blocking return with strict C05 separation). Production remains **0/190**; clean-pass count zero |

**Net current state per the frozen snapshot:** RR-01..13 CLEAN (focused R2 only); RR-14/15/16/18 locally closed by the R3 adjudicator; **RR-17/C00U OPEN, NOT CLEAN**, with 3 correction slices required before a new corpus epoch can freeze. No whole-formation clean pass exists.

**(c) Not present:** the pre-excluded `FORMATION-CLEAN-PASS-{1,2}-{A,B,ADJ}.md` files (referenced by R3-SKEPTIC-A2 and `corpus-epoch.mjs`) do not exist — consistent with 0-of-2 clean passes.

---

## 6. Machine-usable index: wave id → spec file

```
waves/P-V.md: P00 P01 P02 P03 P04 P05 P06 P07 V00A V00B V00C V01 V02 V03 V04 V05 V06 V07 V08 V09 V10I V10S V10D V11 V12 V13 V14 V15 V15P V16A V16B V17 V18R V18H V18V V19 V20 V21 V22 V23 V24 V24C V24P V24M V25 V26 V27 V28 V29 V29T V30 V31
waves/K-A.md: K00 K01 K02 K03 K04I K04 K05 K06 K07 K08 K09 K10 K11 K12 K13 K14 K15 K16 K17 K18 K19 K20 K21 K22 K22T K23 K24 A00 A01 A02 A03 A04 A05 A06 A07 A07T A08 A09 A09C A10 A11 A12 A13 A14 A15 A16 A17 A18 A19 A20 A21R A21 A22 A22S A21A A21J A23 A23S A23H A24 A25 A23C A26
waves/G-D.md: G00 G01 G02 G03 G04 G05 G06 G07 G08 G09 D00A D17A D18A D00 D01 D02 D03 D03A D03T D04 D05 D06 D06N D07 D08 D09 D10 D11 D12 D12F D13 D14 D15 D16 D17 D18 D19 D20 D21 D22 D23 D24 D25
waves/M-C.md: M00 M01 M02 M03 M04 M05 M06 M07 M08 M09 M10 M10T M11 C00U C00 C01 C02 C02B C02D C02L C02M C02S C02W C03P C03 C04 C05 C06 C07 C08 C09 C10
```

(Machine check not executed — read only. `node tools/validate-formation.mjs` is claimed to parse exactly these IDs from exactly these files and expect {P:8,V:44,K:27,A:36,G:10,D:33,M:13,C:19}=190; wave-row counts per file verified as 52/63/43/32 = 190.)

---

## Appendix: headline state claims (as the corpus states them, unverified by this inventory)

- Production execution **0/190**; formation clean passes **0/2**.
- Current focused-repair state: RR-01..13 CLEAN; RR-14/15/16/18 locally closed; **RR-17/C00U reopened NOT CLEAN** (frozen-snapshot R3 adjudication, the newest artifact) — a new corpus epoch cannot freeze until 3 correction slices land + a fresh focused triad is clean.
- P01 authorship deliberately `born_red` with **0 authors** enrolled.
- Value consumes only published `@mkbabb/parse-that@1.0.0`; C10 never republishes parse-that; substrate novelty routed to the active SK-V25 BBNF campaign.
- Release targets (C10 only): value 5.0.0, keyframes 7.0.0, glass-ui 8.0.0, plus value/Fourier API migrations and consumer major adoptions.
- Snapshot repo pins: value.js `tranche-u`@`c654824e`; keyframes canonical `/Users/mkbabb/Programming/keyframes-v-exec`@`81a56990`.
</content>
</invoke>
