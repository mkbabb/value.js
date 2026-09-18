# Delta Census — S1 → S2 (V-next Codex mega-tranche, post-convergence)

READ-ONLY mechanical census. **Claims only; grading happens elsewhere.**

- **S1** = `docs/tranches/V/apotheosis/snapshot-vnext/` — frozen 2026-07-19 21:29 EDT, **pre-relay** (187 files).
- **S2** = `docs/tranches/V/apotheosis/snapshot-vnext-2/` — frozen 2026-07-20 10:27 EDT, **post-convergence** (165 files).
- Live Codex tree `docs/tranches/V/vnext/` NOT touched. `r1-opus-refuted/` NOT opened.
- Between the snapshots we delivered two letters: `../coordination/value-inbox-2026-07-19-union-apotheosis-relay.md` (72-row delta + 20 repair) and `../coordination/value-inbox-2026-07-20-owner-rulings-relay.md` (22 owner rulings).

**Headline counts:** S1 187 files → S2 165 files (net −22). **71 files added**, **93 files deleted**, **80 common files modified**, 14 common files byte-identical. Added bytes ≈ **214 KB**; deleted bytes ≈ **1,809 KB**; net on-disk ≈ **−1,595 KB**.

---

## 1. File-level delta, grouped by role

### 1a. ADDED in S2 (71 files, ≈214 KB)

**Union-ingestion registries / crosswalk (new organ — the point of the convergence):**
- `UNION-INGESTION.md` (6.7 KB) — prose binding of the two relay letters, 114-row zero-drop account, closure order.
- `UNION-ROW-INVENTORY.json` (36.9 KB) — the 114-row terminal crosswalk (72 union + 20 repair + 22 rulings), each keyed to `armC/UNION-APOTHEOSIS.md#Lxx` / `OWNER-RULINGS-2026-07-20.md#Lxx`, with disposition, owning waves, DAG effect.
- `CANON-SUPPLEMENT-INVENTORY.json` (2.5 KB) — binds the 5 omitted inputs (addenda C1–C23, CARRY §B–F, V-PRIME §0–4, 2 delivery receipts) and projects all 35 identities onto existing owners "without changing the 41+108 seed law".
- `HANDOFF-BOUNDARY-INVENTORY.json` (7.6 KB) — binds the 30 P0 + 9 P6 handoff-packet blocks to terminal decisions/owners (companion to the 149-row seed, "no third seed").
- `tools/validate-union-inventory.mjs` (7.6 KB) — resolves the 114 union-row owners against the 193-wave books.
- `tools/wave-table-contract.mjs` (2.7 KB), `tools/validate-handoff-boundaries.mjs` (4.2 KB).
- `WAVE-ROUTING-PI.md` (3.2 KB) — the new compact 8th wave-cell (Routing/π): R0–R5 classes + PL-11 born-RED/BORN-ABSENT/RULING/AUDIT labels.

**API isomorphism (fourier-first-class organ, per owner ruling D-15):**
- `API-FACILITY-ISOMORPHISM.json` (15.5 KB) + `api-facility-isomorphism.schema.json` (3.5 KB) — bidirectional value↔fourier facility contract; 146 ops (129 http + 17 headless) each mapped once; relations isomorphic / ratified-asymmetry / value-only-refused / fourier-only-refused.

**Design-input epoch (per D-20 / W-ING):**
- `DESIGN-INPUT-EPOCH.json` (7.1 KB) — binds owner design-method prompt, tranche-dev brief, reformation pass record, Breath-of-Life evidence to owner `G00I`.

**Convergence / evidence artifacts:**
- `FORMATION-CLEAN-PASSES.json` (8.6 KB) — 2 recorded passes, both `CLEAN` (schema `vnext-formation-clean-passes/4`) over epoch `61d4954…`. Evidence bodies live external at `docs/tranches/V/evidence/vnext-clean-passes/<epoch>/`.
- `HISTORY-EVIDENCE.json` (0.3 KB) — points at a sealed 51-file / 878 KB evidence epoch; `formation_credit:0`, `execution_credit:0`.
- `RETURN-VALIDATOR-DEFERRED.json` (0.8 KB) — the return-validator declared `RED`, owner `P00`, ≤15 KB budget (the deferred/dieted return machinery).
- `tools/consumer-root-snapshot.mjs` (28.9 KB) + `consumer-root-snapshot.schema.json` + `consumer-root-snapshot-index.schema.json` — the non-regex consumer-universe replacement (per KILL KL-7 / repair R-01).
- New selftests: `tools/selftest-clean-passes.mjs`, `selftest-deletion-gitlink.mjs`, `selftest-gate-runtime.mjs`, `selftest-json-contract.mjs` (each ≤3.3 KB — the "`--selftest` folded" posture).

**C14 published-parse-that prototype (per repair R-04/R-05 — "write the prototype NOW"):** a whole new `prototypes/c14-css/` subtree, **63 files ≈ 74 KB**: `src/css/` + 15 `grammar/l4/*.ts` module peers, 15 external `test/**/*.test.ts` peers, `bench/compare.ts`, `tools/{reproduce-from-commit,verify-module-isomorphism,verify-package-receipt}.mjs`, `package.json`+`package-lock.json`, and `proof/{status,last-run,package-receipt,benchmark,corpus}.json`.

### 1b. DELETED in S2 (93 files, ≈1,809 KB) — the "apparatus diet"

Full per-file census in §5. By role: **24 `reviews/*.md`** (241 KB — the entire R1–R4 adjudication/skeptic corpus), **24 `tools/selftest-*.mjs`** (732 KB), **25 other `tools/*.mjs`** (620 KB), **13 `*.schema.json`** (65 KB), **6 root registry `*.json`** (137 KB), **1 root `*.md`** (`AUDIT-REGISTRY.md`, 15 KB).

### 1c. MODIFIED (80 common files differ)

**Two dominant mechanical patterns:**
1. **JSON minification + compaction** — most `*.schema.json` and the big registries collapsed from pretty-printed to single-line (`+1 −N` diffstat) *and* content changed (not pure reformat). Examples: `api-contract.source.json` (248→176 KB), `return.schema.json` (−1431 lines), `SEED-ROW-INVENTORY.json` (76→20 KB; still 149 rows, now a tuple encoding + `exceptions` block for `ORCH-07` DesignSync-unavailable), `deletion-judgment.schema.json` (−524), the whole keyframes-* schema family.
2. **190 → 193 wave count** propagated everywhere; **Glass 8 → exact Glass 7.x (G07)** propagated everywhere (per owner ruling D-2).

**Substantive doc rewrites (read):**

| File | Δ (+/−) | Characterization |
|---|---|---|
| `README.md` | +176/−129 | Re-cast as "193-wave program"; adds the band table (P8·V45·K27·A36·G11·D33·M13·C20), states **"clean credit 0/2, production 0/193, R1–R4 predate the union and earn no current credit"**. |
| `FORMATION.md` | +61/−22 | 7-cell → 8-cell grammar; "post-union final registry; no pre-union branch remains authoritative"; all-Sol formation critics, Luna reserved for mechanical fanout. |
| `FORMATION-CLEAN-PASS-PROTOCOL.md` | +36/−445 | Collapsed 452→43 lines to fit the **≤25,000-byte core** (KL-6): names the 5 core tools + schema, `gpt-5.6-sol/ultra` critics, evidence moved outside the epoch. |
| `RETURN-CONTRACT.md` | +111/−775 | Shrunk to schema + ≤15 KB validator (AM-26); "formation executes none: production 0/193"; P00 implements a deliberately-RED validator first. |
| `SEED-ROW-INVENTORY.json` | +213/−2944 | Compacted to tuple encoding; 149 rows preserved; adds `encoding`+`exceptions`. |
| `api-contract.source.json` | +1/−8372 | Regenerated op registry: total http **130→129** (value 89→88, fourier 41); adds `cursorContract` (400 / no implicit restart, per D-11). closedCounts 129 http + 17 headless = **146** (matches AD-2's "146-op" claim). |
| `PARSER-CSS-COLOR.md` | +54/−31 | parse-that `^1.0.0` re-adoption + BBNF-mirror-as-C14-twin restated. |
| `PLAN.md` | +44/−27 | Plan re-sequenced onto the 193-wave / union closure order. |
| `DISPOSITIONS.md` | +23/−17 | Zone dispositions rewritten to the ruled outcomes (flip KEEP, ingest RETIRE, decompose PRUNE, etc.). |
| `KEYFRAMES-API.md` | +37/−26 | spring()/solver fence + ingest-retire consequences. |
| `API-OPERATIONS.md` | +40/−26 | fourier-first-class / cursor-400 / 146-op alignment. |
| `STATE-ROUTING.md` | +21/−5 | usePaneRouter ratified + UrlEnvelope layered (D-22). |
| `PROVENANCE.md` | +42/−15 | union + owner-ruling provenance folded. |
| `waves/P-V.md`, `K-A.md`, `M-C.md`, `G-D.md` | ≈full re-issue each | Band registries re-emitted at 193 total with the 8th Routing/π cell; execution-order comment block added. |
| `coordination/HANDOFFS.md` | +14/−16 | 190→193; Glass 8→7.x; P01 host-control language softened to "byte-preserved evidence, not active authority"; adds kf-consumes-Value-spring `linear()` clause. **Does NOT name either relay letter.** |

Large `tools/*.mjs` validators were rewritten in place (e.g. `resolve-consumer-universe.mjs` +1035/−1239, `validate-value-target-transpose.mjs` +436/−945, `keyframes-proof-contract.mjs` +478/−645, `validate-api-contract.mjs` +380/−296).

---

## 2. Union-ingestion mapping — how they claim to have consumed our verdict

**Source:** `UNION-INGESTION.md` + `UNION-ROW-INVENTORY.json` (both S2). The inventory declares `"state":"TERMINAL","terminal_count":114,"expected_count":114` and `counts:{ADOPT:17, AMEND:30, ADD:13, KILL:12, REPAIR:20, OWNER_RULING:22}` — i.e. it re-uses **our own row IDs** (AD-/AM-/ADD-/KL-/R-/D-) keyed to `armC/UNION-APOTHEOSIS.md` line anchors, so **their row == our row id**. Authority hashes it pins: union `80bc5070…`, rulings `2ee23d30…`.

**Crucial self-qualification (`UNION-INGESTION.md` L5-19):** *"ROW INVENTORY TERMINAL (114/114); CORPUS OPEN — zero convergence credit… These inventory steps are terminal; `READ` is not corpus `FOLDED`."* The mapping claims routing completeness, **not** that wave bytes/gates landed.

### 2a. Topology claim (`UNION-INGESTION.md` §Adjudicated topology)

190-wave registry → **193 waves** (three irreducible additions): **+`V16R`** (the SCI-1/D54/W56 4.1.x vehicle, sole non-breaking release), **+`G00I`** (bound Breath/design-input epoch, gates all motion), **+`C00P`** (shared honest visual/input probe rig). C10 stays the sole breaking cut. Bands: P8 · V45 · K27 · A36 · G11 · D33 · M13 · C20 = 193.

### 2b. Claimed-coverage table (row → disposition → owning waves)

**ADOPT (17) — our confirmed work:**

| Row | Disposition | Owning waves | Effect (their note) |
|---|---|---|---|
| AD-1 | FOLD | D01,D02,M01,M02,A13 | STATE-ROUTING wholesale; amended by D-22 |
| AD-2 | REWRITE_THEN_ADOPT | A00,A01,A20,A23C,A26 | regenerate 146-op registry |
| AD-3 | FOLD | A00,A03 | OA-05 api-stay; P3.2 EXTRACT tombstoned |
| AD-4 | AMEND | A05,A06,A18,A19,A22S | remove durable-Value assumptions |
| AD-5 | AMEND | D03A,G00I,G03 | mount-independent registry; dock-morph gate |
| AD-6 | AMEND | K12,M03,M05-M10,C00P | non-cube proof before Cube |
| AD-7 | FOLD | G03,G06,G08,G09 | gap + identity + anti-template |
| AD-8 | KEEP_EVIDENCE | LIVE-VISUAL-AUDIT,D25,M11 | before-corpus only |
| AD-9 | KEEP_DIET | V00A,V29T,K00,K22T,D00A,M00,C00U | regenerate ruled manifests |
| AD-10 | AMEND | V29T,K22T,V09,V26 | tests-isomorphism; stylesheet exception |
| AD-11 | AMEND | FORMATION | 7-cell → 8-cell grammar; bijection kept |
| AD-12 | KEEP_DIET | DELETION-LAW | 4 deletion questions, collapse certs |
| AD-13 | SUPERSEDE (D-9) | V24,V29T | decompose KEEP-bar → D-9 direct prune |
| AD-14 | AMEND | V16R,G07,C00,C05,C10 | boundary operational core |
| AD-15 | FOLD | P04 | no-republish 1.0.0 receipt |
| AD-16 | FOLD | V03,V15,V16A,V18R,V20 | gate-text pack verbatim |
| AD-17 | KEEP_DIET | FORMATION | pin-register + honesty discipline |

**AMEND (30) — AM-1…AM-30** (compact; owning waves in inventory): AM-1 REWRITE P00/P01/P05/V03 (parser spine, exact 1.0.0 + history witness); AM-2 FOLD V01/V02/V29; AM-3 FOLD V04–V29 (default-IN typed lane); AM-4 REWRITE V15 (Local-MINDE prod / Ray test-oracle); AM-5 REWRITE V15P (prune arm dies); AM-6 REWRITE V16A/V16R/V16B (SCI-1 inherited, Into unconditional); AM-7 REWRITE V15P/V18H/V18V (one cusp kernel); AM-8 FOLD V18R/K00/K04I/K09/P4.5 (scar-cure dispatch); AM-9 SUPERSEDE V05/V19/V25/K10 (apply D-16/D-17); AM-10 REWRITE K00/K22T (governance spine, extend proof:structure); AM-11 SUPERSEDE K07/K09/K14/K15/K21/K22/K22T (apply D-6/D-7); AM-12 SUPERSEDE V00C/K02/V29T (apply D-1); AM-13 AMEND V00A/V00B/V29T (deps allowlist ⊆ {@mkbabb/parse-that}); AM-14 SUPERSEDE A01/A02/C06 (apply D-10); AM-15 EXECUTE_RULING A08/D12 (cursor 400); AM-16 SUPERSEDE A09/A10/D09/D10 (apply D-12); AM-17 EXECUTE_RULING A07T/D12F (featured relation); AM-18 EXECUTE_RULING A12/A13/D14 (trichotomy + /shares); AM-19 EXECUTE_RULING V16R/G07/C00/C03P/C05/C10 (boundary, D-2/D-3); AM-20 FOLD_FORMAT P4.5/K00/K02/K04I/K09/V18R (HANDOFFS cargo-only); AM-21 EXECUTE_RULING C00P/M08/G09 (measurement first); AM-22 REWIRE K12/M05-M10 (M06-M10 precede M05); AM-23 ADD G00I (motion gated on W-ING); AM-24 FOLD C00P/D25/M11/C07 (widened probe matrix); AM-25 SUPERSEDE_FORM STATE-ROUTING/D01/D02/M01/M02 (usePaneRouter ratified); AM-26 DEFER FORMATION/P00 (≤20KB contract, ≤15KB validator); AM-27 FOLD FORMATION (seed bijection → union canon); AM-28 AMEND FORMATION (8-cell Routing/π); AM-29 FOLD D00A/D00/D25/M00/M10T/M11 (defect-driven Value demo, full KF overhaul); AM-30 FOLD FORMATION-REVIEWS (fresh union triads only).

**ADD (13) — ADD-1…ADD-13:** ADD-1 FOLD CARRY-LEDGER whole → W46-56 (incl. **THE BOOT KILL** CH-4 p75-LCP ≤2.5s); ADD-2 FOLD drop-census/retro-tombstones (V00A/V00B/V16R/V30); ADD-3 FOLD e2e fleet adjudication (D00A/D00/D25); ADD-4 ADD C00P probe rig; ADD-5 FOLD kf boundary letter (K00/K02/K04I/K09/V18R/P4.5); ADD-6 ADD G00I (W-ING BJ/IOS27 bound input); ADD-7 FOLD W-GOV governance-lineage annex; ADD-8 FOLD DesignSync retrigger (G00I/D00A/M00); ADD-9 FOLD palette↔fourier facility ledger (A01/A26); ADD-10 FOLD F2-api-01/02/03/07 (A00/A01/A03/A07/A26); ADD-11 SPLIT F2-api-06 fourier landings (A21R…A26); ADD-12 GLOBAL_AND_CELL G-0 charter stamp (FORMATION); ADD-13 FOLD_COORDINATION glass two-batch relay (G00/G07).

**KILL (12) — KL-1…KL-12:** KL-1 REJECT_STALE SK-V25 external gate (P00/P01); KL-2 ACCEPT delete V15P prune arm; KL-3 ACCEPT Ray-Trace test-only (V15); KL-4 ACCEPT V16A/V16B decouple; KL-5 ACCEPT kill P01 dual-author police at scale ("211 KB for 0 bytes"); KL-6 ACCEPT ≤25 KB clean core ("316 KB against a conceded-unanswerable question"); KL-7 SPLIT replace regex consumer resolver, reject four-root narrowing (C00U); KL-8 SUPERSEDE six-key freeze (D-1); KL-9 SUPERSEDE zone-flip fiat (D-6/D-7); KL-10 ACCEPT stylesheet mirror exception (P01/V29T); KL-11 ACCEPT HANDOFFS cargo-only / OA-14 displaced; KL-12 ACCEPT retire Fable-side false authorities.

**REPAIR (20) — R-01…R-20 ledger:** R-01 finish RR-17 + replace regex projector ("no Codex tool trusted in a union gate before this"); R-02 governance lineage; R-03 record-citation grep-gate (→ structured `record_refs` join); R-04 parser-spine unblock via `164343c1^` retype; R-05 write C14 prototype NOW; R-06 resurrect bench + one regex baseline; R-07 six-key ratification → **CLOSED_BY_RULING D-1**; R-08 zone-flip ratification → **CLOSED_BY D-6/D-7**; R-09 A-band overturn rows → **CLOSED_BY D-10..D-13**; R-10 SCI-1/D54/W56 reconcile; R-11 raytrace test oracle + shared cusp; R-12 kf dispatch pack (P4.5); R-13 fold CARRY §B–F (W46-56); R-14 apparatus diet; R-15 W-ING BJ/IOS27; R-16 restore foreclosed owner rows → **CLOSED_BY D-16..D-19**; R-17 boundary re-shape → **CLOSED_BY D-2/D-3**; R-18 deps-strip standing gate; R-19 extend seed bijection to canon; R-20 completions (atlas 3-site, C2 dual-home, D50 supersession, G-0 stamp).

**OWNER_RULING (22) — D-1…D-22** (all `dag:d9`, "bind listed 193-wave recipients, add no DAG node"): D-1 7-key freeze HELD (only `./quantize` demoted); D-2 Glass stays 7.x; D-3 boundary GO entry-gated on 4.1.x + executed ERESOLVE; D-4 model_served + spot-probes (no attestation spend); D-5 C17 Sol/Luna roster ratified; D-6 flip/physics/morph KEEP, VT TRIM, presets SHRINK; D-7 scroll KEEP, **ingest RETIRE w/ tombstone** (pierces K.W8; fidelity → Value C12); D-8 `internal/` dissolves option-c, extends proof:structure; D-9 decompose PRUNE; D-10 idempotency D2 §3 P2 kept, overturn pre-authorized iff job layer proves need; D-11 cursor errors → 400; D-12 restore divergence RATIFIED (W45 stands, A09 declined); D-13 A07T partial (featured→relation); D-14 /shares BUILD, kf no share server; D-15 **FOURIER FIRST-CLASS** (full value↔fourier isomorphism, direct-edit granted); D-16 spring() VALUE-owned experimental, K F6.6 solver fence; D-17 HDR BUILD, R-EVAL RETIRE; D-18 contrast-color WCAG21 stable + APCA experimental; D-19 SoA BANKED on V16B law; D-20 toolbar = D03A registry + dock-morph at design gate; D-21 easing MEASURE FIRST + kf links hard-cut; D-22 router idiom ratified + UrlEnvelope layered.

**Repaired contradictions they claim** (`UNION-INGESTION.md` §Repaired contradictions): six-key/`./value` tombstone → CLOSED by D-1 (7 keys survive, only `./quantize` demoted); blanket K14/15/21/22 prunes → CLOSED by D-6/7/9; durable idempotency/restore/tier-deletion → CLOSED by D-10/12/13; spring rejection + R-EVAL → CLOSED by D-16/17 (HDR mandatory); Glass 8 cut → CLOSED by D-2/3/G07/C10 (exact 7.x minor); SK-V25 → CLOSED by KL-1/P00-07.

---

## 3. Convergence artifacts

### 3a. `FORMATION-CLEAN-PASSES.json` (new)
- Schema `vnext-formation-clean-passes/4`, `"status":"clean"`, **2 passes, both `"verdict":"CLEAN"`**, over corpus epoch `61d4954f…`.
- Each pass = fresh critic_a + critic_b + adjudicator, all `requested/served_model:"gpt-5.6-sol"`, effort `ultra`. Pass 2 binds `predecessor_adjudication_sha256` = pass-1 adjudicator hash.
- `finding_families:[]`, `orphan_demands:[]`, `unsupported_claims:[]` on both passes.
- **Coverage domains** (from `FORMATION-CLEAN-PASS-PROTOCOL.md`, 12): api-closure, architecture-dags, consumer-universe, deletion-truth, design-mobile-desktop, gate-soundness, parser-boundary, prompt-seed-bijection, quarantine-safety, return-dependency-closure, state-routing, wave-formation.
- Report bodies are NOT in the snapshot — referenced at external `docs/tranches/V/evidence/vnext-clean-passes/61d4954…/FORMATION-CLEAN-PASS-{1,2}-{A,B,ADJ}.report.json`.

### 3b. **The decisive NOT-CLEAN self-report** (the central tension in S2)
Although `FORMATION-CLEAN-PASSES.json` records 2 CLEAN passes, the fleet's own prose **voids that credit**:
- `UNION-INGESTION.md` L5-10: *"ROW INVENTORY TERMINAL (114/114); CORPUS OPEN — zero convergence credit. The July 19 union relay and July 20 owner rulings were not present in the V-next corpus that received the R4 review. They invalidate every attempted post-R4 freeze… Production execution remains **0/193** and whole-formation clean credit remains **0/2**."*
- `README.md` L39: *"Formation-wide clean credit is **0/2** and production execution is **0/193**. Historical R1–R4 reviews predate the union and earn no current credit."*
- `HISTORY-EVIDENCE.json`: `formation_credit:0`, `execution_credit:0`.
- `RETURN-VALIDATOR-DEFERRED.json`: return validator `"status":"RED"`, owner `P00`.
So the 2 CLEAN passes are the **pre-union R4** epoch, self-declared non-credit-bearing after the union folded in.

### 3c. `FORMATION-CLEAN-PASS-PROTOCOL.md` change (452 → 43 lines, −445)
Collapsed to the **≤25,000-byte core** (executes KL-6). Names the core surface: this file + `formation-clean-passes.schema.json` + `tools/{corpus-files,corpus-epoch,clean-pass-prompts,hash-clean-report,validate-clean-passes}.mjs`. Evidence moved outside the frozen epoch. Reports pinned to `vnext-clean-pass-report/2`, ≤12,000 bytes. Closes: *"Until both pass on current evidence, formation is 0/2 and production 0/193."*

### 3d. `reviews/` directory — ENTIRELY DELETED, none added
All 24 S1 `reviews/*.md` (R1–R4 adjudications + skeptic rounds, 241 KB) were removed; S2 has **no `reviews/` directory at all**. Per the diet + AM-30 ("fresh union triads only"), the R1–R4 review corpus is retired; the clean-pass machinery replaces it. **No new review files** landed in S2.

### 3e. C14 prototype self-reported gate state (`prototypes/c14-css/proof/`)
- `last-run.json` (2026-07-20): `npm run check` PASS; `npm test` **17/17 PASS**; module proof 15 stems ↔ 15 TS peers ↔ 15 external test peers ("filename/import topology; **semantic equivalence RED**"); bench `c14:MEASURED, current:ABSENT, historical:ABSENT, comparative_credit:false` (median 16.6 ms, 11 samples).
- `status.json`: **born-RED** list = P00 fresh topology receipt, P01 module-by-module equivalence, full CSS L4/CSSOM/WAAPI coverage, production integration, current-vs-historical perf ("both comparator adapters absent, zero credit"). **Prohibited credit** = production CSS, parse-that uplift, pretty.bbnf runtime, upstream semantic closure.
- `package-receipt.json`: pins exact `@mkbabb/parse-that@1.0.0` (sha512 `ygzF6JPb0OC2…`, 65 files, 401,130 unpacked); `forbidden:[workspace link, file dep, deep import, private source import, version range]`.

---

## 4. Mail consumption

### 4a. Live `docs/tranches/V/coordination/INBOX.md` — new rows verbatim

**I-13** (2026-07-19):
> value union-apotheosis program (Fable arms A/B/C) — `value-inbox-2026-07-19-union-apotheosis-relay.md` (THIS dir) — independent audit + formation union over the 2026-07-19 21:29 V-next snapshot: 72-row delta (17 ADOPT, 30 AMEND, 13 ADD, 12 KILL), 20-row priority repair ledger, and the governance/record-blindness correction. Authority: `../apotheosis/armC/UNION-APOTHEOSIS.md`; evidence remains pull-on-demand under `../apotheosis/`. | **FOLDED 2026-07-20** — `UNION-ROW-INVENTORY.json` terminally routes all 114 union/ruling rows to the final 193-wave registry; no row grants production authority | **V-next union ingestion** (formation only)

**I-14** (2026-07-20):
> owner via value union-apotheosis program — `value-inbox-2026-07-20-owner-rulings-relay.md` (THIS dir) — terminal disposition of the full 22-row owner docket: 7-key freeze; ruled zone keeps/trims/prunes; named API record outcomes; first-class value↔fourier API isomorphism; value-owned experimental `spring()`; HDR build/R-EVAL retire; WCAG21+experimental APCA; SoA bank; toolbar dock-morph; measurement-first easing; router+UrlEnvelope. Authority: `../apotheosis/OWNER-RULINGS-2026-07-20.md`. | **FOLDED 2026-07-20** — D-1…D-22 bind waves, exact edge outcomes, gates, dispositions and reverse owners; the owner sheet has no open branch | **V-next union ingestion** (formation only)

(Also new since S1 era: **I-15/I-16** = bbnf-lang/parse-that root-Sol coordination checkpoints, both "FOLDED + WINDOW ELAPSED", no parse-that write, no Value authority transferred — the P00/P01 external boundary.)

### 4b. `coordination/HANDOFFS.md` (S2) — acknowledgment check
The S2 HANDOFFS copy **does NOT name either relay letter** (`grep value-inbox-2026 → 0 hits`; no "union"/"owner-ruling"/"apotheosis" refs except an unrelated line). It only absorbed the 190→193 wave-count bump and the Glass 8→7.x rename. **Letter acknowledgment lives in `UNION-INGESTION.md` + INBOX rows I-13/I-14, not in the cross-repo dispatch channel.**

---

## 5. Deletion census (every deleted file, size, role)

**Total removed: 93 files, 1,852,927 bytes ≈ 1,809 KB.** Subtotals: reviews 241.5 KB · tools/selftest 731.9 KB · tools/other 619.6 KB · schemas 64.9 KB · root registries 136.9 KB · root md 14.7 KB.

**Root registries (6, 136.9 KB):** `API-RETURN-COVERAGE.json` 59.2K · `FORMATION-SEAT-LEDGER.json` 58.5K · `P01-INDEPENDENT-AUTHORSHIP.json` 11.0K · `FORMATION-ROOT-SEED-CONTRACT.json` 3.6K · `BBNF-HOST-CONTROL.json` 2.7K · `CLEAN-PROVIDER-BOOTSTRAP.json` 1.9K.
**Root doc (1):** `AUDIT-REGISTRY.md` 14.7K.

**Schemas (13, 64.9 KB):** `p01-independent-authorship.schema.json` 16.5K · `p01-input-epoch` 7.3K · `p01-differential-ledger` 7.0K · `p01-origin-ledger` 6.0K · `p01-css-corpus` 4.2K · `gate-receipt` 3.7K · `p01-grammar-oracle-proposal` 3.7K · `p01-typescript-combinators-proposal` 3.2K · `bbnf-host-control` 2.8K · `parse-that-package-receipt` 2.7K · `p01-access-projection` 2.7K · `value-target-resolutions.schema.json` 2.2K · `resolved-reopenings` 3.0K.

**reviews/ (24, 241.5 KB) — full R1–R4 adjudication/skeptic corpus retired:** `ROOT-REPAIR-R3-ADJUDICATION.md` 23.5K · `ROOT-REPAIR-R3-SKEPTIC-B` 22.3K · `ROOT-REPAIR-R3-SKEPTIC-A3` 15.1K · `CANONICAL-ORDER-SKEPTIC` 14.8K · `ROOT-REOPENING-ADJUDICATION` 14.7K · `ROOT-REPAIR-R3-SKEPTIC-A2` 14.0K · `ROOT-REPAIR-IMPLEMENTATION` 12.8K · `ROOT-REPAIR-ADJUDICATION` 12.5K · `GD-ADJUDICATION` 12.0K · `MC-ADJUDICATION` 11.4K · `ROOT-REPAIR-R3-SKEPTIC-A` 11.4K · `EXTERNAL-EPOCH-FIXTURE-SKEPTIC` 11.1K · `EXTERNAL-EPOCH-FIXTURE-REPAIR` 10.5K · `V-ADJUDICATION` 9.7K · `A-ADJUDICATION` 7.8K · `K-ADJUDICATION` 7.5K · `P-ADJUDICATION` 5.6K · `DEPENDENCY-EPOCH-ADJUDICATION` 5.0K · `X-ADJUDICATION` 5.0K · `ROOT-REPAIR-SKEPTIC-A` 3.7K · `ROOT-REPAIR-SKEPTIC-B` 3.1K · `UNIVERSAL-VALUE-EPOCH-SKEPTIC` 4.0K · `ROOT-REPAIR-R2-SKEPTIC-A` 2.2K · `ROOT-REPAIR-R2-SKEPTIC-B` 1.7K.

**tools/ selftests (24, 731.9 KB):** `selftest-contracts.mjs` 120.9K · `selftest-keyframes-target-transpose` 105.2K · `selftest-consumer-universe` 68.3K · `selftest-clean-exec-contract` 67.0K · `selftest-keyframes-public-package` 53.2K · `selftest-deletion-judgment` 38.3K · `selftest-clean-coordinator-custody` 34.5K · `selftest-keyframes-current-inventory` 30.1K · `selftest-p01-authorship` 29.9K · `selftest-css-module-isomorphism` 25.9K · `selftest-value-target-transpose` 24.7K · `selftest-p01-structural-contract` 25.5K · `selftest-value-public-surface` 25.7K · `selftest-target-paths` 16.1K · `selftest-value-current-inventory` 10.0K · `selftest-deletion-truth` 11.1K · `selftest-canonical-order` 8.9K · `selftest-value-target-resolutions` 8.5K · `selftest-formation-proof-layer` 6.5K · `selftest-reopenings` 5.8K · `selftest-wave-edge-policy` 4.3K · `selftest-clean-pass-prompts` 4.0K · `selftest-corpus-safety` 4.0K · `selftest-clean-provider-bootstrap-authority` 3.4K.

**tools/ non-selftest (25, 619.6 KB):** `validate-return.mjs` 159.3K · `clean-exec-contract` 76.5K · `value-target-resolution-fixture` 71.6K · `validate-p01-authorship` 60.9K · `clean-coordinator-custody` 39.6K · `value-target-transpose-fixture` 35.1K · `p01-structural-contract` 28.5K · `validate-seat-ledger` 23.6K · `consumer-universe-fixture` 17.9K · `build-seat-ledger` 16.8K · `resolve-reopenings` 17.0K · `validate-api-return-coverage` 15.0K · `clean-provider-bootstrap-authority` 9.6K · `validate-parse-that-package-receipt` 9.0K · `validate-keyframes-current-inventory` 9.9K · `validate-keyframes-public-package-proof` 7.3K · `validate-bbnf-host-control` 6.4K · `validate-value-target-resolutions` 6.7K · `consumer-universe-return-mode-fixture` 2.1K · `read-formation-evidence` 1.9K · `implementation-challenge` 1.6K · `read-clean-critic-report` 1.4K · `probe-clean-report-absence` 0.9K · `seat-ledger-session-index` 0.7K · `return-validation-mode` 0.2K.

**Diet character:** the largest single removals are the return validator (159.3K), the p01 dual-author apparatus (`selftest-contracts` 120.9K + `validate-p01-authorship` 60.9K + `p01-structural-contract` 28.5K + `selftest-p01-authorship` 29.9K + the 8 `p01-*.schema.json`), the seat-ledger machinery (`FORMATION-SEAT-LEDGER.json` 58.5K + `build-seat-ledger` + `validate-seat-ledger`), and the value-target-resolution fixtures (71.6K + 35.1K). These are exactly the KL-5/KL-6/R-14 targets ("211 KB for 0 bytes"; "316 KB against a conceded-unanswerable question"; "forensics → ~25 KB core").

---

## 10 largest claims the delta makes (claims only)

1. **The full union was ingested with zero drop: 114/114 rows terminal** — 72 union delta (17 ADOPT/30 AMEND/13 ADD/12 KILL) + 20 repair + 22 owner rulings, each routed to an owner in the 193-wave registry (`UNION-ROW-INVENTORY.json`, `terminal_count:114`).
2. **The registry grew 190 → 193 waves** via exactly three "irreducible" additions — `V16R` (4.1.x SCI-1 vehicle), `G00I` (bound design epoch), `C00P` (probe rig) — and nothing else.
3. **All prior clean/review credit is voluntarily voided:** formation clean credit `0/2`, production `0/193`, R1–R4 reviews "earn no current credit" — despite a carried-forward `FORMATION-CLEAN-PASSES.json` showing 2 CLEAN gpt-5.6-sol passes.
4. **~1.81 MB of apparatus was deleted** across 93 files (24 reviews, 49 tools, 13 schemas, 6 registries, 1 root doc) against ~214 KB added — a net ~1.6 MB diet, executing KL-5/KL-6/R-14.
5. **Fourier is first-class (D-15):** a new `API-FACILITY-ISOMORPHISM.json` claims a bidirectional value↔fourier map covering all 146 operations exactly once, with named ratified asymmetries.
6. **The 149-row seed bijection is preserved and extended, not broken:** `SEED-ROW-INVENTORY.json` compacted 76→20 KB (still 149 rows) + `CANON-SUPPLEMENT-INVENTORY.json` projects 35 more canon identities (C1–C23, CARRY §B–F, V-PRIME §0–4) onto existing owners "without reinterpreting the seed law".
7. **A published-package parse-that prototype exists NOW (R-04/R-05):** the 63-file `prototypes/c14-css/` tree self-reports `npm test 17/17 PASS`, 15↔15↔15 module/test topology, consuming exact `@mkbabb/parse-that@1.0.0` — while explicitly holding P00/P01 semantic equivalence, full-CSS coverage, and comparative perf **born-RED**.
8. **The wave grammar gained an 8th cell** (Routing/π, `WAVE-ROUTING-PI.md`): R0–R5 evidence classes + PL-11 BORN-RED/BORN-ABSENT/RULING/AUDIT opening-state labels, applied across all four `waves/*.md`.
9. **The API op registry was regenerated** to 146 ops (129 http + 17 headless), dropping one value op (89→88) and adding a `cursorContract` that converges invalid cursors to 400 (owner ruling D-11).
10. **Glass stays exactly 7.x** — every "Glass 8" reference across HANDOFFS/protocol/DAGs was rewritten to "exact G07 Glass 7.x" (owner ruling D-2), and the return/clean apparatus was declared deferred-RED (`RETURN-VALIDATOR-DEFERRED.json`, owner P00, ≤15 KB) rather than executing.
