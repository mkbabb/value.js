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
| X-W0 | begin-word (+ P-1..P-3) | planned | | 10 units a..j; ≤4 concurrent; .g = the sitting packet (rulings from §0j); .j = Glass-8 census at target 8.0.0 (§0i.2), 8.0.0 AND 9.0.0 enumerated |
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
| KF.W0 | begin-word; §B-12 = the reset (OP-1 ruled at §0j) | planned | | 5 units; then .b ∥ .c; then .d ∥ .e |
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
| F.W0 | begin-word | planned | | 6 strictly serial (a→b→e→c→d→f); G-4→G-5→quarantine; G-1→G-11→G-10 lift-then-delete ONE commit; G-3→SENDs; no git stash |
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
