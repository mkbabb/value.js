# X EXECUTION LEDGER — the on-disk state machine (crash/wall-survival truth)

**Opened 2026-09-17 on the owner's begin-word** (verbatim in COHESION §0j). Authority of order:
`../EXECUTION-RUNBOOK.md` §1; seat law §5; gates §2. **This file is the resume point** for any session,
including one born after a crash: a wave's status here — with its commit hashes — is the only claim of
progress that counts. Seats append; nothing is rewritten (E-3: corrections as dated addenda in the Notes column).

Status vocabulary: `planned` → `OPEN` (seat 0 banked the born-RED baseline + unit plan) → `IMPLEMENTED`
(every unit's commits landed; close record written) → `CLOSED` (verify-only close + fresh check
CONFORMANT) · `BLOCKED-ON <condition>` · `GATE-KEYED` (KF.W3 — never scheduled) · `MINTED-UNAUTHORED`.
No row here stamps VERIFIED — only the spec's own designated seat does (X.P.W4.d · KF.W10.g · X-W11).

Per-wave records: `execution/<track>/<wave>.md` (baseline, unit plan, unit receipts, close, check).
Workflow scripts (session-local, re-creatable from the runbook): `x-begin.js`, `x-track-A.js` … `x-track-D.js`.

## Pre-acts (runbook §3.3 + the X-W0 sitting agenda) — before any wave opens

| id | act | status | commit(s) | notes |
|---|---|---|---|---|
| P-1 | Four-path mail sweep at the begin-word + union check-2 tail (6 MINOR + 2 INFO) cured as dated addenda (§0i.4) | CLOSED 2026-09-17 | `642a0098` | 0 unrowed; 8 cured; I-30 is the ledger tail; nothing unrowed found at the orchestrator's own sweep (glass BK newest = 08-29 ACK; kf/atlas newest = our 07-27 letters) |
| P-2 | The 27 born-RED first gates run read-only and banked as dated baselines (`execution/gates/`) | CLOSED 2026-09-17 | `fd40535c` · `0bed8379` | 22 RED-AS-EXPECTED · 2 GREEN-BEFORE-CURE (10, 27 — both declared) · 2 DIVERGENT (24 Codex wall gone; 25 worktree 7-not-8) · 1 UNRUNNABLE (21 is an act); divergences recorded at COHESION §0j |
| P-3 | The opening sitting — owner-gated items ruled under the 2026-09-17 delegation → COHESION §0j | CLOSED 2026-09-17 | see §0j commit | dossier `a3ae9a4f` (28 items); §0j.A–F ruled by the orchestrator: seven X-W0.g rows · FB packets + GF-R1/R3 · OP-1 reset (snapshot-first) + KF-WRITE + OGKF1 + SS3 + the W5 quartet + ODV3/ODV5/AT · OG-F1/OG-F2 · G-10 DELETE · G-15 ×4 · NO TRIE · PRODUCER (port) · SS4 R1–R9 · X·P both words + OC-1 recorded-not-gating · BRANCH-TOPOLOGY three words |

## Track A — X·V (value.js) — head `X-W0`

| wave | opens after | status | commit(s) | notes |
|---|---|---|---|---|
| X-W0 | begin-word (+ P-1..P-3) | OPEN 2026-09-17 | | 10 units a..j; ≤4 concurrent; .g = the sitting packet (rulings from §0j); .j = Glass-8 census at target 8.0.0 (§0i.2), 8.0.0 AND 9.0.0 enumerated. Record `execution/A/X-W0.md`: baseline banked (HG-1..HG-18 + fold G-A/G-D/G-F); 5 ordered groups, ≤3 concurrent, all-Opus |
| X-W1 | X-W0 | planned | | 6 (3 ∥ then 3 serial); R2 dead-locator census + R3 oracle dialect BEFORE the HARD flip |
| X-W2 | X-W0 | planned | | 4 serial; AFTER.json non-terminal until X-W5 A1/A2 |
| X-W3 | X-W0 | planned | | 6 (5 serial api + 1 ∥); F.W5 runs beside (E-3) |
| X-W9 | X-W0 | planned | | 9 (4 ∥ lanes, 2 serial chains); P-7 (a)–(d) booked at X-W9-FOLD.md (E-4); epoch rule |
| X-W4 | X-W0 | planned | | 4 serial + .g trigger-gated (X-W0.j) |
| X-W6 | X-W0 | planned | | 10 units / 4 serial lanes; ⟂ X-W7 on four paths — W7's CrossEdges state write order |
| X-W7 | X-W1 (N-1 mount substrate) | planned | | 7 (1 ∥ pair + 5 serial) |
| X-W10 | X-W0 | planned | | 6 (phase 1 Fable ∥ Opus design authors; phase 2 serial) |
| X-W5 | X-W2 | planned | | 5 serial; C3 back-gated on Dock G-L (X-W8 probe) |
| X-W8 | W4·W5·W6·W7 | planned | | 5 serial Opus; LAST of the demo waves |
| X-W11 | everything | planned | | 5 serial Opus; release + verified close; 51 OUT-OF-WAVE rows handed, zero silent drops |

## Track B — X·KF (keyframes.js + keyframes-v-exec) — heads `KF.W0 ∥ KF.W1`

| wave | opens after | status | commit(s) | notes |
|---|---|---|---|---|
| KF.W0 | begin-word; §B-12 = the reset (OP-1 ruled at §0j) | OPEN 2026-09-17 | | 5 units; then .b ∥ .c; then .d ∥ .e |
| KF.W1 | begin-word (NOT after W0) | OPEN 2026-09-17 | | 3 Opus serial; MINTS O-21 (max-grep at open; MINT LAW). Baseline `execution/B/KF-W1.md`: 10/10 RED-AS-EXPECTED · 0 GREEN-BEFORE-CURE; OP-1/OP-2 MET at the bytes, OP-3 discharged by §0j.C KF-WRITE, OP-4 not required; mail sweep 0 unrowed; measured max `O-20` → mint `O-21` |
| KF.W4 | KF.W0 | planned | | THE SEQUENCING HEAD (G-KFW4-1); peak concurrency 2; ∥-atomic with KF.W6 on usability.mjs |
| KF.W2 | KF.W0 | planned | | opening commit states its ref; registries before any cure commit |
| KF.W5 | KF.W4 | planned | | S-0: G-XSS commit 1; S-5 cure (4.0.0→V) before open |
| KF.W6 | KF.W4 | planned | | atomic bundle with W4 on usability.mjs; KF-AT-4 ∥ KF-AT-3 |
| KF.W7 | KF.W2 (posture registry) | planned | | KF-AV-28 rider: per-surface SWAP verdicts |
| KF.W8 | W0·W4·W5 (+W6 SCOPED for G7) | planned | | git mv + repoints + docblock ONE commit |
| KF.W9 | KF.W0 §B-12 only | planned | | 5 seats / 4 phases; concurrent with the W4 fan-out; OD-V3/OD-V5 owner-gated (§0j) |
| KF.W10 | W0·W1·W9 + W2·W4·W5·W6·W7·W8·W9 IMPLEMENTED | planned | | 6 Opus serial + .g fresh-Fable adjudicator; stamps the AUTHORED ELEVEN only |
| KF.W3 | RC-P(V) TRUE | GATE-KEYED | | never scheduled; opens or it does not |
| KF.W11 · W12 · W13 | the SS-1/SS-2 authoring block | MINTED-UNAUTHORED | | 17-packet partition 9+6+2; all after G-KFW4-1; drag-seam/transport after KF.W7's SWAP verdicts |

## Track C — X·F (fourier-analysis) — head `F.W0`

| wave | opens after | status | commit(s) | notes |
|---|---|---|---|---|
| F.W0 | begin-word | OPEN 2026-09-17 | | 6 strictly serial (a→b→e→c→d→f); G-4→G-5→quarantine; G-1→G-11→G-10 lift-then-delete ONE commit; G-3→SENDs; no git stash. Record `execution/C/F-W0.md`: **15/15 RED before cure · 0 GREEN-BEFORE-CURE**; G-4/G-5/G-15(d) hold §7a honest-RED relief (producer-owned) so the web/dist quarantine does not run; 3 divergences minuted (D-1 absent src sheet · D-2 producer HEAD drift · D-3 §0j.D "seven sites" vs the enumerated eight, all eight live) |
| F.W5 | F.W0 | planned | | 5 serial; ADMISSION KEYSTONE beside F.W1; owner rulings flagged inline (§0j); G11 precedes F.W1 sizing |
| F.W1 | F.W0 + ESC-1 ruled (§0i.3: 8.0.0 @ 17a11bc5) | planned | | ONE atomic TWELVE-limb commit; WU-A RE-PIN first |
| F.W2 | F.W1 (specifier arm only; colours arm after F.W0) | planned | | P-7 reciprocal booked at X-W9-FOLD (E-4) |
| F.W3 | F.W1 (except §C.H rows: F.W0 only) | planned | | 5 ∥ Opus (conflict-declared) + .f fresh-Fable; S-15 g20 re-baseline before open |
| F.W4 | F.W1 | planned | | gated whole |
| F.W6 | F.W5 | planned | | consumes F.W5 clause set + FW6-G19 + G18 |
| F.W7 | F.W0 + F.W5 clauses + G-F7-1 (§0j) | planned | | 3 serial |
| F.W8 | F.W0 · F.W1.close · F.W2 · F.W5 | planned | | 5 serial |
| F.W9 | F.W0 → F.W1 → F.W3/W4 | planned | | 3 serial NEVER parallel; owns the checkpoint never the cure; RE-CUT-0 |
| F.W10 | F.W9 | planned | | TERMINAL; S-16 restated before close; reconciles against dispatched O-20 |

## Track D — X·P (parse-that; fresh root `parse-that-css-totality-p2`) — head `X.P.W0`, strictly serial

| wave | opens after | status | commit(s) | notes |
|---|---|---|---|---|
| X.P.W0 | begin-word | OPEN 2026-09-17 | | 4 (2 ∥ then serial); the fresh root opens at first write; G-1/G-2/G-3 authenticate the pause. Record `execution/D/X-P-W0.md`; **8 of 8 gates RED before cure**, 0 GREEN-BEFORE-CURE; OP-1..OP-4 all MET (OP-2 GRANTED, dated) |
| X.P.W1 | W0 closed | planned | | 5 (3 ∥ then serial); three instruments + bar ledger |
| X.P.W2 | W1 IMPLEMENTED | planned | | 9 across 6 phases; Fable .a ∥ Opus blind algebra authors |
| X.P.W3 | W2 | planned | | 5 (3 ∥ disjoint then serial) |
| X.P.W4 | W3 IMPLEMENTED | planned | | 4; .d fresh-Fable adjudicator = the ONLY X·P VERIFIED stamp; RC-P(V) evaluator; OC-1 (§0j) |

## Beside the tracks (not waves)

| id | item | status | notes |
|---|---|---|---|
| SS-8 | UNPROVEN-NEEDS-LIVE visual-audit slot (~751 residue items + the 14-record zero-residue cohort) | planned | runs beside; bounded; §5.2 parsimony |
| SS-13 | per-repo visual audits (KF.W9 owns kf; X·F rides F.W3/W4; X·P n/a) | planned | |
| SS-1/SS-2 | the KF.W11–13 authoring block | planned | before their 17 packets execute |

## Event log (dated, append-only)

- 2026-09-17 — begin-word received; ledger opened; P-1..P-3 dispatched as workflow `x-begin`.
- 2026-09-17 — P-1 mail round: 0 rowed, 8 tail items cured, commit 642a0098.
- 2026-09-17 — P-2 gates baseline banked (fd40535c · 0bed8379); P-3 sitting RULED at COHESION §0j; pre-acts CLOSED; Tracks A–D dispatched as workflows x-track-A..D.
- 2026-09-17 — **X.P.W0 OPEN** (Track D seat 0): four-path mail sweep 0 unrowed (I-30 still the tail); OP-1 (§0j.E) / OP-2 GRANTED-dated / OP-3 85Gi avail vs 28M `.git` / OP-4 no §9 STOP — all MET; the eight W0 gates run read-only = **8 RED before cure, 0 GREEN-BEFORE-CURE**; 4 units planned (`.a` ∥ `.b` → `.c` → `.d`, all Opus 5, peak concurrency 2). Record: `execution/D/X-P-W0.md`.
- 2026-09-17 — **KF.W1 OPEN** (Track B seat 0): four-path mail sweep 0 unrowed (glass BK confirmed newest; I-30 still the tail); OP-1 PRESENT at the bytes (7,064 B Jul 24 16:41 / 15,633 B Jul 27 12:27) · OP-2 TRUE (`keyframes-v-exec` HEAD `81a56990` = kf `origin/master`, porcelain 0) · OP-3 DISCHARGED by COHESION §0j.C KF-WRITE (a) · OP-4 explicitly NOT required (§7 cross-edge 2) — all MET; the ten born-RED gates run read-only = **10 RED-AS-EXPECTED · 0 GREEN-BEFORE-CURE · 0 DIVERGENT**, plus G-KF1-11 DECLARED-SATISFIED and G-KF1-12 stay-GREEN as the spec declares; MINT LAW re-run at open → measured max `O-20`, mint `O-21` (no delta); 3 units planned (`.a` → `.b` → `.c`, all Opus 5, strictly serial, peak concurrency 1). Record: `execution/B/KF-W1.md`.
- 2026-09-17 — **KF.W0 OPEN** (Track B seat 0): four-path mail sweep **0 unrowed** (BK re-confirmed newest glass tranche dir; I-30 still the tail; delta test found no file in any of the four paths newer than P-1's own sweep line); preconditions all MET at the bytes AND in the ledger — begin-word §0j · P-1/P-2/P-3 CLOSED · **OP-1 RULED at §0j.C KF-OP1** (snapshot-first three-step, never a bare reset) · KF-WRITE named · KF-OGKF1 ruled · HEAD `8281638c` / `origin/master` `81a56990` / merge-base `a59d3a22` · snapshot ref `kf-sacred-snapshot-2026-09-17` free · 99 untracked V docs to survive · W0 work-product absent; the ten born-RED gates run read-only = **10 RED-AS-EXPECTED · 0 UNRUNNABLE · 1 GREEN-BEFORE-CURE finding (G-0.5 on its stated GREEN disjunct (a) — installed glass 7.0.0, exactly as the gate's own parenthetical predicts; the tripwire declaration, not a state change, is `.b`'s act)** · SCH-4 banked as MEASURE-AT-OPEN with a census predicate that reproduces at no spelling (routed to `.d`); every published count double-run; 5 units planned (OP-1 → .b ∥ .c → .d ∥ .e, all Opus 5, peak concurrency 2). Record: `execution/B/KF-W0.md`.
- 2026-09-17 — **F.W0 OPEN** (Track C seat 0): four-path mail sweep **0 unrowed** (BK re-confirmed the newest glass tranche dir; I-30 still the tail; the only file in any of the four paths newer than 2026-09-16 is `INBOX.md` itself, carrying P-1's own sweep line); preconditions all MET at the bytes AND in the ledger — begin-word §0j · P-1/P-2/P-3 CLOSED · no predecessor wave (Track-C root set is `{F.W0}`, runbook §1.0/§1.3) · registry 66/66 · the three intake/formation inputs present · **`CENSUS-CANONICAL.md` digest re-measured `f44362757458`**, identical to the frozen pin · the S-3 `RC-P`-by-predicate-name addendum PRESENT beside the §6b NON-EDGE row; all fifteen §4 gates run read-only = **15 RED-AS-EXPECTED · 0 GREEN-BEFORE-CURE**, volatile counts double-run (porcelain 28=27` M`+1`??` ×2 · glass dist 17/8 ×2 · e2e 8 ×2); owner-gated items taken from §0j.D and never presumed (OG-F1 freeze-with-adoption + worktree-as-baseline · OG-F2/OG-V2 · G-10 DELETE in one breath · G-15 (a) LAND / (b) GOES / (c) FROZEN-FOREVER+golden-file / (d) UNDECIDABLE); **G-4 · G-5 · G-15(d) carry §7a's honest-RED-close relief by name** (glass-ui READ-ONLY always; a consumer patch is a gate FAILURE), so the `web/dist` quarantine does not run this wave; three divergences minuted as facts-not-rulings — **D-1** `web/src/styles/index.css` absent (G-4's "(src is 15/6)" parenthetical; already dated at P-2 §3 A-1; the gate's operand is the producer dist and is unaffected), **D-2** producer HEAD drifted to `e91b7b7e` (a dated reading, never a live fact; the pin cell is `v8.0.0^{commit}` = `17a11bc5`, ESC-1-ruled at §0i.3), **D-3** §0j.D's parenthetical *"seven sites"* against the spec's enumerated **eight** — all eight resolve live (54·59·71·77·87 / 143·148 / ConvergenceTimeline `:61`, the eighth carrying `is-playing`, exactly §6b rider (a)'s hazard) — routed to unit `f` as a dated addendum-beside, never a re-opening; 6 units planned (a→b→e→c→d→f, all Opus 5, **strictly serial, peak concurrency 1** per §1 `Agents` + §2b). Record: `execution/C/F-W0.md`.
- 2026-09-17 — **X-W0 OPEN** (Track A seat 0): four-path mail sweep — **1 unrowed found and ROWED as I-31 UNREAD** (`../sci-report/atlas/docs/tranches/Q/coordination/ATLAS-TO-VALUE-2026-07-28-PASS2.md`, 3,299 B, sha `7b362fea895e`: atlas's value.js-addressed reciprocal consumer contract, consumed in tracked canon at `AUDIT-PLAN.md:177` + `CONSUMER-ADMIN-DAG-AUDIT-2026-07-28.md:265` but never rowed — a ledger-shaped defect; **X-W0 may not close with it UNREAD**); BK re-confirmed the newest glass tranche dir (its 09-17 writes are `ASK.md`/`PLAN.md`/`BURNDOWN.md`, not mail paths, and ask nothing of us); preconditions all MET at the bytes AND in the ledger — X ratified (`CARRY-CUT-LEDGER.md` §0.2) · begin-word §0j · P-1/P-2/P-3 CLOSED with their artefacts present · no predecessor wave. Baseline: **HG-1..HG-18 + fold G-A/G-D/G-F run read-only, every count double-run** = **13 RED-AS-EXPECTED · 3 RED-BUT-DIVERGENT (HG-1 1858→1825 as megatranche's 33 went tracked; HG-7 `1 uncovered`→**87 uncovered**, worse than its born-RED; HG-17 35→57 token files, all growth in the read-only X-tranche class) · 1 GREEN-BEFORE-CURE (HG-16 — the authoring cured it) · 1 HALF-GREEN (HG-10's untracked half discharged by event, exactly as fold W0.14 predicted; the ledger-status half stays RED) · 1 GREEN-AS-DECLARED (HG-9, a re-verification not a cure) · 1 DEFERRED-TO-UNIT (HG-8's ephemeral-worktree replay is X-W0.c's own act)**; HG-18 measured **1/4 → FAIL branch live** (7.0.0 · `./watercolor-dot` present · 0 indicator-slot decls · receipts exist), with the §ADDENDUM per-candidate datum **8.0.0 registry-resolvable / 9.0.0 TAG-ONLY (`npm view` 404, `v9.0.0` present at `d4f7b24f`)** corroborating §0i.2's election of 8.0.0 @ `17a11bc5`. One **sequencing defect measured and cured by ordering, not by edit**: §Disjointness puts `.c` and `.i` concurrently in batch 3 while both modify `CONSTELLATION-COMMISSION-2026-08-03.md` (`:9` vs `:76`) — the plan serializes **i → c** under the spec's own "no two concurrent units share a modify path" rule. 10 units planned, **5 ordered groups, ≤3 concurrent, all Opus** (a · b∥d∥e · f∥i∥j · h∥c · g). Record: `execution/A/X-W0.md`.
