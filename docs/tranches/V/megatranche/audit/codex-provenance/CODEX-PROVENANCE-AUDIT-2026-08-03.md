# CODEX PROVENANCE AUDIT — MASTER LEDGER

**Seat:** THE FRESH ADJUDICATOR (Fable) · **Date:** 2026-08-03 · **Commission:** M-21 (owner).
**Inputs:** six sweep lanes in this directory (`sessions.md`, `axes-quality.md`, `parser-verify.md`,
`red-matrices.md`, `supersession.md`, `tooling.md`), read in full, plus eight adversarial
re-verification verdicts on the lanes' severest claims, plus ten independent spot-checks run by this
seat (read-only; listed in §0.3). Receipts stay literal; claims — Codex's *and the lanes'* — were
the audit subjects.

**One-paragraph verdict.** The Codex interim corpus (2026-07-28..08-03) is honest at the byte layer
and inflated at the claim layer. Every literal receipt any lane or this seat re-verified reproduces
— hashes, sizes, modes, git trees, bench ratios to the last float digit — with exactly two
load-bearing exceptions (the `1,870,633 µs` M2 denominator and one ephemeral completeness-ledger
pin). Above that sound evidence layer sit manufactured denominators (seven of nine sweeping RED
fractions are self-cross-products with no product consumer), a coverage numerator whose vocabulary
cannot distinguish a browser-proven adjudication from 34 seconds of reading, three simultaneous
model laws, a supersession chain that silently dropped fifteen specified product cuts, and an
orchestrator that died by quota mid-dispatch — three commissioned reviews landing into a corpse —
rather than parking. Two of the fleet's own severest findings were overturned on adversarial
re-verification, in Codex's favor: the resurrection checksum gate genuinely discriminates (it is
RED on disk right now, which is information), and the "81% unprovenanced tree" is in fact
Claude-authored pre-window work, fully attributable. The disposition set below feeds wave authoring
from what survives.

---

## 0. Adjudication layer

### 0.1 The eight adversarial verdicts, absorbed

| # | Lane claim | Adversarial verdict | Absorbed as |
|---|---|---|---|
| 1 | sessions D1 — orchestrator killed by quota, no orderly park | **CONFIRMED**, strengthened (3 orphaned reviewers landed after death) | §1.4, §2 row K-1; riders demoted (§0.2) |
| 2 | sessions D4 — resurrection checksum gate "cannot fail" | **REFUTED** — gate fails today (1/6 FAILED, re-run by this seat §0.3); it caught real drift on 08-03T07:28Z and forced a repair | Lane finding overturned; replaced by "weak reseal *practice*" (§2 row K-11, §4 row 6) |
| 3 | sessions D7 — 81% of tree unprovenanced | **REFUTED** decisively — Claude session `6614e90c` covers 07-24/27/28 with 2,620+ value.js cwd records; 320/320 challenge files named by path; residue = node_modules + PNGs | Lane finding overturned; attribution INVERSION recorded (§1.5) |
| 4 | sessions D5 — divergent 416 MB corpus in `~/.codex/worktrees/7e28` | **CONFIRMED**, strengthened — 45 live-doc references across 21 files point into it; one "immutable" formation candidate mutated 3.5 days post-seal; `validate-constellation-dag.mjs` fails on it today | §2 rows K-13/K-14, §4 row 24 |
| 5 | axes D-1 — ActionFeedback L:12 materially false | **CONFIRMED** (7 refutation attempts failed; both disjuncts false against bytes) | §2 row K-5; falsifier exists inside the certified closure set |
| 6 | axes D-3 — independent review void / predates its subject | **REFUTED** — v1 bytes reconstructed byte-exactly from the rollout patch; review postdates subject; delta is pure bookkeeping | Lane finding overturned → LOW stale-back-pin hygiene (§4 row 8) |
| 7 | axes D-4 — `EXISTS-DIRECT` conflation | **CONFIRMED**, understated — **5** workflow-authored files conflated, not 3; unqualified `264/264` already propagated into the 10:45 commission spine | §2 row K-4, §4 rows 9/22/23 |
| 8 | axes D-2 — systematic reduced-motion false class | **CONFIRMED** as scoped, with 4 precision corrections (2 of 3 materially false; 27/46 revised; second glass-ui guard; corpus-wide citations exist) | §2 row K-6; quarantine stands on the two surviving false findings |

### 0.2 Lane claims demoted by this seat

Per the commission: an under-evidenced lane claim is demoted to **UNPROVEN**, with reason.

| Lane · claim | Demotion | Reason |
|---|---|---|
| sessions D1 rider — "the whole Codex fleet is credit-locked until 2026-08-09 and cannot self-resume" | **UNPROVEN** | Counter-evidence on disk: rollout `019fc7c1` completes a normal turn at 08-03T14:51:12Z with a real terminal message, hours after the boundary; identical lockout wording on 07-31 and 08-02 was survived for days. The *orchestrator* is dead; the fleet was not locked. |
| sessions D1 rider — "any interim document describing an orderly pause at that boundary is describing an event that did not occur" | **UNPROVEN (empty antecedent)** | Adversarial grep over all megatranche `*.md`/`*.json`: no Codex-authored document claims a park at 08:41Z. `STATE.md` mtime is 07-29 — four days prior. True fact about the process; no false document to correct. |
| sessions D4 — the checksum gate is self-certifying "by construction" | **OVERTURNED → corrected finding** | The gate is RED today (this seat re-ran it, §0.3 #7) and already caught drift once (rollout L64538-L64553). Corrected finding: 78 certificate rewrites vs 24 independently-timed verifications is a weak *practice*, not a contrived gate. L-19 does not attach — the gate discriminates. |
| sessions D6 — "*every* receipt pointing into `~/Documents/Codex` is unverifiable in place" | **UNPROVEN as a universal** | TCC access is intermittent per-session, not absent: the parser lane held read access for a third of its session and verified `BUILD-V12.py`, the `.pyc` residue, and the v12-absence byte-exactly; red-matrices read the capture script and the N2 crash record there. Correct statement: unverifiable *without a TCC grant*, and any given session may lose it mid-flight. |
| sessions D5 count — "14 untracked paths" | corrected | `git status --porcelain` = 15 entries; `-uall` = 126 files; two of the nine "absent" paths exist live at directory granularity (`formation/`, `audit/cross-repo/`); one file (`PRODUCER-ARTIFACT-BOUNDARY-2026-07-29.md`) exists in BOTH trees with different bytes — worse than absence. |
| axes D-2 count — "three are materially false" | corrected to **two** | `PaletteRenameInput/challenge-D-design.md:15` is literally true of its own subject ("the transition classes do not declare…") — the same scope-hedge the lane excused in ActionFeedback D#5. Inconsistent grading; demoted. |
| axes D-2 rider — "`demo/styles/animations.css` is never cited anywhere in the corpus" | corrected in scope | True over the 48-file closure manifest (0 citations — re-verified); false corpus-wide: 21+ workflow reports cite `animations.css:184-192/193` verbatim, one (`SearchFilterBar` pass2) refuting this exact error class. Codex-the-program knew; Codex-the-08-03-author did not read its own corpus. |
| axes D-3 — review "certifies bytes that no longer exist… must be re-issued" | **OVERTURNED → LOW** | See §0.1 #6. Remedy is a one-line successor-hash addendum, not re-issuance. The review's *substantive* verdict (`falsifier: null`) remains wrong on the merits via D-1/D-2 — a different, confirmed defect. |
| supersession C-16 — the 90/48 shadcn figure "does not verify" | held at **UNPROVEN (both directions)** | The lane's own caveat is correct: neither Codex nor the lane recorded a matcher; 107/49 vs 90/48 may be matcher variance. Unusable for file bounds either way (L-9); not provably false. |
| parser F-1 — the `1,870,633 µs` denominator | held at **UNPROVEN**, not "fabricated" | The one artifact likely to settle it (`P4-EVIDENCE-REPLAY.json`) sits behind TCC. The number is order-correct and inside the measured ratio band; the defect is an unreceipted, asymmetric attribution rule. Budgets derived from it must not be cited until re-derived. |

### 0.3 This seat's independent spot-checks (all read-only, run 2026-08-03)

1. `find demo src -name "*.vue" -not -path "*/node_modules/*" | wc -l` → **88** (M11 census exact).
2. `grep -n "UNASSIGNED-FRONTEND-OMISSIONS" workflows/validate-completeness.mjs` → lines **24, 159** (tooling §1d exemption confirmed).
3. `git log -1 c4af0ef9` → `fix(demo/boot): expose the Vue mount as Vite's production entry`, 07-29 13:50:25; `merge-base --is-ancestor` → **ANCESTOR-OF-HEAD** (C-10 confirmed).
4. `grep -rn "V·L5\|V\.L5" docs/tranches/V/` → usages in 5 docs, definition in **none** (C-13 confirmed).
5. `ls -la coordination/ | grep SOURCE-CONTRACT-V6` → HOSTILE-A/B/C **and** OWNER-ADJUDICATION all mtime **02:12** (M6 same-minute non-independence confirmed).
6. `shasum -c CONSTELLATION-AUDIT-PAUSE-CHECKSUMS-2026-08-02.sha256` → **75 OK / 0 FAILED** (S-01 confirmed — the corpus's strongest artifact).
7. `shasum -c RESURRECTION-HANDOFF-CHECKSUMS-2026-07-31.sha256` → **5 OK / 1 FAILED** (`pi/HANDOFF.md`; F-2 confirmed, and the gate demonstrably discriminates).
8. `shasum -c CONSTELLATION-EIGHT-HOUR-CHECKSUMS-2026-08-03.sha256` → **20 OK / 4 FAILED** (F-3 confirmed).
9. `grep -c "EXISTS-DIRECT" registry/HYDRATION-LEDGER.md` → **52** (51 rows + legend; D-4 arithmetic confirmed).
10. `grep` COMPLETENESS-LEDGER rows for `ActionFeedback` and `shell-dock-genericactionbar` → **byte-identical row shape** `| CDL | CDL | — | BANKED |` (the conflation, on screen).

---

## 1. Instance roster + artifact-family timeline

Condensed from `sessions.md` §1–§3 (full metadata census, 1,090 rollouts / 16.16 GB), with
adversarial corrections applied. Times UTC from rollout records, never from `session_index.jsonl`
(which lacks `cwd`, understates `019faee0` by 4.5 days, and omits sessions — sessions D2, upheld).

### 1.1 The six durable instances

| # | id (short) | role | cwd | window | how it stopped |
|---|---|---|---|---|---|
| R1 | `019fa9a7` | Audit frontend tranche handoff | value.js | 07-28 16:55 → 19:09 | clean `task_complete` |
| R2 | `019faa6d` | Audit BBNF history | bbnf-lang | 07-28 20:31 → 07-29 19:02 | clean park |
| R3 | `019fae36` | In-flight audit — parser root | value.js | 07-29 14:10 → 08-02 17:59 | clean park ("Parser law 14/34 … credit: zero"); 697.5 M tokens; owner gave it a 3-hour budget, it ran 99 h 49 m |
| R4 | `019faee0` | **Constellation megatranche orchestrator** | value.js | 07-29 17:15 → **08-03 08:41:20.104Z** | **KILLED BY QUOTA** — `usage_limit_exceeded`, `last_agent_message: null`, mid-dispatch; see §1.4 |
| R5 | `019fae33` | glass-ui implementation | glass-ui | 07-29 14:07 → 08-03 14:51 | live at audit time |
| R6 | `019fae35` | sci-report sibling | sci-report | 07-29 → 07-30 | clean; no megatranche writes |

Plus 4 delegated repository lanes (keyframes `019faf5d`, fourier `019faf5e`, value-7e28
`019faf60`, non-parser convergence `019fb444` — all closed clean, the last 5.7 s after R4 died),
45 detached worker lanes (07-29..07-31, dated evidence roots, none spawned after 07-31T05:08Z),
249 in-app subagents under R4 (249 distinct seats, no reuse), and 7 archived sessions including
three ~19 MB aborted fork attempts (sessions §1e).

### 1.2 Authorship ledger

460 unique megatranche `(op, path)` write pairs in the window, **100% attributable, 0
unattributed** (sessions §2): R4 336 · fork-replay `019faf19` 36 (inherited transcript, NOT
authored — the fork trap, sessions D3, upheld) · 7e28 lane 32 (land in the worktree, not the live
repo) · R3 27 · R1 10 · 8 subagents 19. Only 8 shell-redirect writes exist. No hidden channel.

### 1.3 Artifact-family timeline

| window (UTC) | author | family |
|---|---|---|
| 07-28 | R1 | seed edits; `AUDIT-HANDOFF-2026-07-28.md` |
| **07-28 13:15 local** | Codex (commit `f6f7040a`) | **the model-law substitution** (L-14 Sol/Luna; M-16/M-17/M-18) — one day BEFORE the M-21 window opens; see C-05 |
| 07-29 14:42–16:19 | R3 | IN-FLIGHT pair · STATE.md/AUDIT-PLAN rewrites · MECHANISM-CUT map · PARSER trio |
| 07-29 17:15 | — | R4 opens as R3's continuation (27 replayed patches stamped in 30 ms — physically impossible, fork-replay); both then run in parallel four days |
| 07-29 17:48 → 07-30 05:06 | R4 | excavation + CONVERGENCE pair + cross-repo rulings + `validate-constellation-dag.mjs` |
| 07-30 14:47 | R4 | performance-law amendment |
| 07-31 05:17–05:20 | R4 | resurrection packet (4 files, one 4-minute burst) |
| 08-01 18:09 | R4 | Kronecker audit law (sole 08-01 write) |
| 08-01 22:13 → 08-02 00:18 | R4 | resurrection-packet reseal cycles |
| 08-02 17:35 → 08-03 08:41 | R4 | the late coordination corpus ~60 files: pause handoffs, remaining-audit plan/matrix, AUTHENTICATED-PASS family, OWNER-SLOT, SOURCE-CONTRACT V1→V6 ladder, TYPED-DAG V3→V8 ladder, the 46 report-authored axes (08-03 02:45–03:11), closure family (03:15–03:16), eight-hour law (03:17) |
| 08-03 08:41:20Z | — | quota kill |

### 1.4 The death of R4 (adversarial verdict #1, confirmed and sharpened)

Last ten minutes: three `followup_task` dispatches (08:40:10–08:40:27) to typed-DAG reviewers, a
`sed` of the V6 owner-adjudication, a `wait_agent` that *returned* at 08:41:19.764Z ("Wait
interrupted by new input"), the v94 cross-repo receipt inbound at 08:41:19.769Z — then, 335 ms
later, record 65,696 of 65,696: `usage_limit_exceeded`, `last_agent_message: null`, credits
balance "0". All three commissioned reviewers completed AFTER death into a parent that could not
ingest them (08:42:25 / 08:44:45 / 08:45:19), and all three returned **NO-GO** verdicts on the
typed-DAG v7/v8 successor — verdicts that exist nowhere in the repo. The last Codex-authored
repo write is the pause-checksums seal at 08:34:18Z; R4 kept orchestrating seven minutes past its
own seal. Not a park. Mitigation, per the same verdict: no interim document *claims* a park at
that boundary, and the fleet was not locked (§0.2).

### 1.5 The attribution inversion (adversarial verdict #3)

The pre-window 4,365 files (mtimes 07-24/07-27/07-28) that sessions D7 called "unauditable" are
**Claude-authored**: single resumed session
`~/.claude/projects/-Users-mkbabb-Programming-value-js/6614e90c-…jsonl` (17.6 MB, 07-24 → 08-03,
every cwd under value.js), 3,075 of 4,365 named by exact path in-session or added by 34 in-window
commits, residue = 1,169 node_modules + 1,520 PNGs + machine output, **zero unattributed
`.md`/`.mjs`/`.ts` files**. Consequence for this audit: the challenge-corpus substrate the interim
documents build on is *not* a Codex-provenance liability, and the pre-window corpus needs no Codex
disposition. The "81% of the tree" statistic was dominated by an npm install and probe screenshots.

---

## 2. Claim-verification table — load-bearing Codex claims

Verdicts: **CONFIRMED** (survives adversarial replay) · **REFUTED** (contradicted by bytes) ·
**UNPROVEN** (no receipt reachable / no reproducing rule). Evidence pointers name lane §, verdict
#, or this seat's spot-check (§0.3).

| # | Codex claim | Verdict | Evidence |
|---|---|---|---|
| K-1 | "The program parked/sealed cleanly at the 08-03 boundary" | **never claimed** — recorded to kill the myth | Verdict #1: empty antecedent; but the *process fact* is a quota kill mid-dispatch with 3 orphaned NO-GO reviews |
| K-2 | `264/264 GREEN — zero incomplete components` as a **file-existence + hash-banking** count | **CONFIRMED** | tooling §1a (independent recomputation: 0 missing, 0 mismatch, 0 no-ledger); spot-check #9 |
| K-3 | `264/264` as **challenge saturation / coverage** | **REFUTED** | C-04; verdict #7 — 46 axes authored with zero commands run; commission spine (10:45) propagates the unqualified form; `HYDRATION-LEDGER` cannot express the difference |
| K-4 | `EXISTS-DIRECT` rows are homogeneous | **REFUTED** | Verdict #7: 51 rows = 46 report-authored + 5 workflow-authored (genericactionbar ×3 with a binding 390×844 browser receipt, wb-extract-pane, wb-mix-animationcanvas at 79 interior citations) — every printed ledger field identical; spot-check #10 |
| K-5 | ActionFeedback L: "not scoped to a producer motion token or reduced-motion policy" | **REFUTED** (the claim is false; the *finding of falsity* is confirmed) | Verdict #5: five glass-ui tokens consumed, zero demo definitions; two PRM guards (`animations.css:184-193` + glass-ui `a11y-overrides.css`) govern the family |
| K-6 | The reduced-motion assertions across the 48-file closure set | **2 REFUTED, class QUARANTINED** | Verdict #8: ActionFeedback L:12 and pointerdebugoverlay D#4 materially false; 12 of 13 raisers never checked gating; the 03:07–03:11 correction pass (real — proven by birthtime) fixed exactly one file |
| K-7 | Independent hostile review `CLEAN / first falsifier: null` — procedural validity | **CONFIRMED** (attaches to the shipped bytes) | Verdict #6: v1 reconstructed byte-exactly; review postdates subject; delta = bookkeeping only |
| K-8 | Independent hostile review `falsifier: null` — substantive truth | **REFUTED** | K-5/K-6: a material falsifier exists inside the certified set (manifest row 3) |
| K-9 | The 46 axes' source receipts (path/SHA/line-count) | **CONFIRMED 45/45** (+1 by hand) | axes §2; HEAD pin `e01d0065^{tree}` = `a28eb1a7…` exact |
| K-10 | Nine live shipping defects found by the 46 (Button `variant` dead axis, Skeleton inert props, Checkbox `modelValue` silent break, ICtCp `cp` mis-resolve reproduced under node, dead emits/props/expose/inject, PointerDebugOverlay a11y+clipboard) | **CONFIRMED** | axes §3.1 — each verified against live bytes or `.d.ts`, one executed |
| K-11 | Resurrection packet "checksum OK" (07-31 family) | **REFUTED as of now** — 5 OK / 1 FAILED (`pi/HANDOFF.md` pinned `4775251e…`, actual `160cf37b…`, +34,822 B, never superseded) | parser F-2; spot-check #7. The gate itself is genuine (verdict #2) — the RED is information |
| K-12 | Eight-hour law's required "replay-green checksum packet" | **REFUTED** — 4/24 FAILED; four pinned files rewritten 75 min after sealing without re-issue | parser F-3; spot-check #8 |
| K-13 | The 08-02 pause-checksums packet | **CONFIRMED** — 75/75 OK today | supersession S-01; parser §2.4 (65+10=75 accounting honest); spot-check #6 |
| K-14 | "Exact Value authority" table (07-31 §4) resolvable from the repo of record | **REFUTED** — 5+ pinned paths exist only in `~/.codex/worktrees/7e28`; 37 formation/coordination artifacts are worktree-only; one live-cited "immutable" candidate was mutated post-seal (`d07b6ddc…` matches neither recorded digest) | C-11; verdict #4 |
| K-15 | `1,870,633 µs` M2 denominator (→ 187,063 / 623,544 / 935,317 budgets) | **UNPROVEN** — no primary receipt; does not reproduce under the rule that reproduces its three siblings; reconstruction 1,636,680 (+14.3%) | parser §3.4/F-1; §0.2 demotion note |
| K-16 | Candidate-side profile numbers 1,157,659 / 144,501 / 167,382 / 311,883 | **CONFIRMED to the microsecond** — the products figure requires a real call-tree walk | parser §3.3 |
| K-17 | P3 KILL ratios 1.0656–1.5238× (36 points) and A3 0.9208–1.0390× (7 rows) | **CONFIRMED** — every ratio recomputed from banked raw batches, 0 mismatches, full float precision | parser §3.5 |
| K-18 | "10× is impossible" | **CONFIRMED, and strengthens** under the reconstructed denominator (1.906× over vs 1.667× published) | parser §3.4 |
| K-19 | Owner-controls readiness `0/44` + retentions `0/1,892` as measurement | **REFUTED as measurement** — 43/44 target fields name no field of any realized artifact; `1892 = 44×43`; the capture script hard-codes `"0755"` vs Homebrew's `0555` and implements zero predicates | red-matrices §2 |
| K-20 | Parser-law convergence `14/34` | **REFUTED as measurement** — numerator self-awarded by the rubric's own second clause; A05 GREEN-by-inaction | red-matrices §4; arithmetic internally CONFIRMED (parser §2.2) |
| K-21 | DREI `0/188 / 0/376 / 0/35,156` | **REFUTED as Value measurement** — 67.6 MB manifest contains zero value.js paths, zero `parseCssColor` | red-matrices §3 |
| K-22 | `AUTHENTICATED_COMPLETE` (30/60) as authentication | **REFUTED** — all 60 records carry `taskId/seatId/toolMarker = null`, `evidenceAuthenticatesTaskIdentity: false` (disclosed by Hostile C, never renamed) | red-matrices §6 |
| K-23 | Kronecker `0 / 3,219,211,296` as a gate | **REFUTED** — physically unexecutable (>10 years wall clock); RED guaranteed by arithmetic | red-matrices §9 |
| K-24 | v3 source census (88 SFC / 310 members / 14 routes+wildcard / 13 `:is` / 2 Teleports / 2 harnesses / per-file SHAs) | **CONFIRMED exact** | red-matrices §11.1; spot-check #1 |
| K-25 | Four frontend closure findings (routes render `Stub`; `meta:{admin}` with **no** navigation guard; wildcard→`/`; unknown pane defaults to `ColorPicker`) | **CONFIRMED** — incl. the security-relevant unguarded-admin finding | red-matrices §11.2 |
| K-26 | API `0/9` gap rows vs D9-rooted target | **CONFIRMED literally** (singular `/fork`; public fork child; `computeContentHash` omissions; `/versions`; 7 not 8 exports) | red-matrices §11.3 |
| K-27 | `COMPLETENESS-LEDGER` pin `9f71efcf…` behind `72/88`/`218/264` | **UNPROVEN/UNREPLAYABLE** — matches no blob in any commit; superseded by 88/88·264/264 at HEAD | red-matrices §11.4 |
| K-28 | "146" / "689" exact-cwd Codex artifact counts | **UNPROVEN as stated** — neither names its store; reconciled `725 @ 07-29` (193 live + 532 archived) | C-08 |
| K-29 | "90 imports across 48 files" (V·MT6 bounds) | **UNPROVEN** — no command recorded (L-9); lane re-measure 107/49 | C-16; §0.2 |
| K-30 | Glass O19 "already acknowledged and routed … send nothing" | **REFUTED** — the receipt (I-21, BREAKING + live deadline) sat unrowed six days; upgrade from "pending" cited no receipt path | C-07 |
| K-31 | "Product … credit: 0" (07-31/08-02 layer) | **REFUTED in one instance** — `c4af0ef9` (demo boot cut, V·C1 COMPLETE) is real, committed, ancestor of HEAD, shipping | C-10; spot-check #3 |
| K-32 | The five 08-02 peer-repo intakes' byte claims (incl. Glass Row 8 commit/tree/parent) | **CONFIRMED character-for-character** | supersession S-02 |
| K-33 | `BUILD-V12.py` receipts (SHA, bytes, mode, nlink, `.pyc` residue, v12-target ABSENT, `credit: 0` throughout) | **CONFIRMED** | parser §1.2–1.4; tooling §4f |
| K-34 | `BUILD-V12.py` as a proof mechanism | **REFUTED** — `HARD_PINS` = SHA-256 of its own about-to-be-written bytes; the V11 falsifier "cured" by making the check unfailable | tooling §4c/4d |
| K-35 | `validate-completeness.mjs` GREEN is regenerable from the repository | **REFUTED** — the 64-hex ledger format exists only in an uncommitted `hydrate-reports.mjs` working-tree diff; a clean checkout yields 264× `NO-LEDGER`, exit 1 | tooling §1c |
| K-36 | 65-vs-107 tranche denominators | **BOTH CONFIRMED at different grains** (truth-table vs physical-directory); reconciliation pre-existed in `TRUTH-TABLE.md:8`, cited by neither | C-09 |

---

## 3. Contradiction register — with adjudicated resolutions

From `supersession.md` §1 (C-01..C-16), each re-ruled by this seat. Severity keys preserved.

| # | Contradiction (compressed) | Sev | Adjudicated resolution |
|---|---|---|---|
| C-01 | Fifteen specified cuts (V·MT0..9 + V·C1..6) silently dropped at the 07-31 boundary; commission still lists V·MT4 | BLOCKER | **UPHELD.** Mint the original-ID → BUILD/FOLD/RETIRE/BLOCKED-ON carry ledger `MECHANISM-CUT…:20` itself mandated, seeded from the V·MT* Carries + V·C* Bounds lines; mark both cut vocabularies SUPERSEDED-BY it. The 08-02 `A0..A10` lane is orthogonal evidence, not a replacement. |
| C-02 | The entire supersession chain is uncommitted; a `git clean` erases it and a clean checkout resumes from the superseded 07-28 recipe | BLOCKER | **UPHELD, FIRST ACTION.** One pathspec commit of the chain as-is, as dated evidence, zero content edits; corrections land as follow-ups so C-03's retroactive-edit problem becomes visible in history. |
| C-03 | A dated audit's headline table rewritten in place (215/71 → 218/72), rewrite half-done, leaving `49`/`17` arithmetic falsehoods live; STATE.md inherits both versions | MAJOR | **UPHELD.** Restore the committed table, append a dated correction block (218/72/46/16 + validator invocation), fix `STATE.md` to "six QUEUED". |
| C-04 | Report-authoring re-badged as challenge coverage; `264/264` gates V·MT0 | BLOCKER | **UPHELD, sharpened by verdict #7.** Split the axis column `CHALLENGED (218) / REPORT-AUTHORED (46)`; the five workflow-authored EXISTS-DIRECT files join the CHALLENGED side with their receipts; V·MT0's hard gate names the challenged denominator. The 46 are kept — labelled. |
| C-05 | Three simultaneous model laws; L-14 miscites M-12 as its evidence; M-16 (the only unquoted owner mark) closed by a Codex audit citing itself; the substitution (`f6f7040a`, 07-28) predates M-21's stated window | BLOCKER | **UPHELD.** L-14 → SUPERSEDED BY L-18 in place; correct L-14's Evidence line (M-12 argues the opposite); annotate M-16 `CODEX-AUTHORED — NO OWNER QUOTATION`; strike M-20 §8's "M-12 is CLOSED"; extend M-21 §1's window to 2026-07-28, naming `f6f7040a`/`fe8785e5`. Current law = M-12 tri-fold + L-18, per the commission. |
| C-06 | L-1 individual-completability vs a nine-deep prerequisite chain — raised once, deepened, then unheld 07-31→08-03 | MAJOR | **UPHELD.** Resolve by construction: mandatory `COMPLETABLE` field per wave; `c4af0ef9` (V·MT1 landed alone) is the existence proof and the template. |
| C-07 | "Glass already acknowledged / send nothing" vs the I-21 receipt unread six days, BREAKING, with the one LIVE deadline (D-2 window closes at TR#79) | MAJOR | **UPHELD.** Distinguish sent-and-delivered vs sent-and-receipted; no "acknowledged" without a receipt path. Re-derive V·MT2's Glass-8 release trigger against I-21's A-17/A-18 before any Glass cut opens. **Time-sensitive.** |
| C-08 | 146 vs 689 session-census figures, neither scoped | MINOR-MAJOR | **UPHELD.** Store-scope stamps on both; record `725 @ 07-29` (193 live + 532 archived) as the reconciled figure. |
| C-09 | 65 tranche units "refused as inflation" vs 107 adopted | MINOR | **UPHELD.** One grain-sentence in the coverage ledger + STATE.md citing `TRUTH-TABLE.md §Denominator honesty`; neither figure supersedes the other. |
| C-10 | `EXECUTION_CLOSED / credit: 0` over a landed, shipping product cut | MAJOR | **UPHELD.** Enter `MT-F012 / DR-10 / V·MT1 / V·C1 → VERIFIED at c4af0ef9` in the successor ledger with the gh-pages before/after bytes; correct the blanket zero to "product credit 1". |
| C-11 | The 07-31 "Exact Value authority" pins 5+ artifacts unreachable from the repo of record; 37 worktree-only artifacts | BLOCKER | **UPHELD, merged with verdict #4.** Census/hash all ~126 worktree-only files; rule each under M-21 §2; copy ADOPTed ones into `formation/codex-worktree-7e28/` with provenance headers and original mtimes; resolve the `PRODUCER-ARTIFACT-BOUNDARY` same-name-different-bytes collision explicitly; nothing under `~/.codex/**` is modified. |
| C-12 | Codex pinned live Claude-owned `pi/HANDOFF.md` as an immutable input (4 different recorded values), manufacturing RED and burning packet v6 | MAJOR | **UPHELD.** Pin git object IDs for cross-harness files, or declare INBOX freeze windows; class `pi/HANDOFF.md` as `LIVE-CLAUDE-OWNED — MAY NOT BE PINNED`. |
| C-13 | Routing law keyed to nonexistent `V·L5`; silent `V·Ln`→`V.Ln` glyph drift | MINOR-MAJOR | **UPHELD** (spot-check #4). Rewrite the parser routing law against `V·L1..V·L4` + an explicitly defined new cut; normalize to middot with a period-form search alias. |
| C-14 | Nine-cut vs ten-cut vs "not frozen at ten" | COSMETIC | **UPHELD.** "One formation gate + nine product cuts (ten rows)" everywhere. |
| C-15 | STATE.md says L-1..L-17; laws end at L-20 | MINOR | **UPHELD.** Bump in the C-02 follow-up commit; re-title rule 0 per C-05. |
| C-16 | Shadcn-residue `90/48` unreproducible either way | MINOR | **UPHELD as UNPROVEN** (§0.2). Re-measure with a recorded command in the V·MT6 successor row; `19` barrels, `0` cn() consumers, `88` SFCs, stale `components.json` all verified. |

---

## 4. Per-artifact terminal dispositions

Exactly one disposition per row. VERIFY-THEN-ADOPT names its verification. Provenance column
cites the lane/verdict/spot-check carrying the proof.

| # | Artifact (family) | Disposition | Terms | Provenance |
|---|---|---|---|---|
| 1 | **STATE.md rewrite** (07-29 R3, + inherited edits) | **SUPERSEDE** | Successor: `CONSTELLATION-COMMISSION-2026-08-03.md` spine + a corrected resume block applying C-03 (six QUEUED), C-05 (rule 0 re-titled), C-15 (L-1..L-20). The rewrite is committed first as dated evidence (C-02) — never edited in place again. | supersession C-03/C-05/C-15; sessions §3 |
| 2 | **IN-FLIGHT pair** (`IN-FLIGHT-AUDIT` + `IN-FLIGHT-RESUME-HANDOFF`, 07-29) | **VERIFY-THEN-ADOPT** | Verification: commit as dated evidence (C-02); ANNUL §6's "M-12 CLOSED by M-16" row (self-authorized owner-gate closure, C-05/L-6); store-stamp the census counts (C-08). §1–§2's denominator corrections are already independently re-verified (S-03) and feed the tranche. | supersession S-03, C-05, C-08 |
| 3 | **MECHANISM-CUT-FORMATION-MAP** (07-29) | **SUPERSEDE** | Successor: the original-ID carry ledger (C-01 resolution), seeded from the V·MT* Carries lines; V·MT1 entered `VERIFIED at c4af0ef9`; V·MT0's 264/264 gate re-pointed at the CHALLENGED denominator (C-04); V·MT2's Glass-7.0.0 premise re-derived against I-21 (C-07). | C-01/C-04/C-07/C-10/C-14 |
| 4 | **CONVERGENCE pair** (`CONVERGENCE-REAUDIT` + `CONVERGENCE-RESUME-HANDOFF`, 07-29) | **SUPERSEDE** | Same successor ledger (the V·C1..V·C6 Bounds lines seed it); committed table restored + dated correction (C-03); the false "Glass already acknowledged" row annulled (C-07). Its self-refutations (S-04) and partial-failure accounting (S-05) carry forward as adopted findings. | C-03/C-07; S-04/S-05 |
| 5 | **PARSER 07-29 trio** (`PARSER-IN-FLIGHT-AUDIT` / `PARSER-WAVE-ADDENDUM` / `PARSER-RESUME-HANDOFF`) | **SUPERSEDE** | Same carry ledger; the `V.L1/V.L5` routing law rewritten against defined waves (C-13). Parser resumption authority passes to row 6's packets + the M-9 TRIFOLD measurements (`STATE.md:86`), not to this trio. | C-13; red-matrices §4.3 |
| 6 | **RESURRECTION packet** (07-31 `CONSTELLATION-` + `PARSER-RESURRECTION-HANDOFF`, MANIFEST, CHECKSUMS) **+ `PARSER-CSS-PAUSE-HANDOFF-2026-08-02`** | **VERIFY-THEN-ADOPT** | Verification: (a) re-issue the 07-31 checksums against current bytes or mark them SUPERSEDED-BY the 75/75-green 08-02 pause checksums (F-2; spot-check #7); (b) refresh the parse-that HEAD pin `fd6062bd`→`f5757082` (39 docs-only pre-pause commits, F-5); (c) commit the untracked parse-that canonical packet (F-6); (d) forbid rewriting date-stamped `.sha256` files henceforth (F-7). The pause handoff's §9 checklist items 1–4 all PASS exactly; its `__pycache__` disposition is exemplary. | parser §1, §2.5–2.7, F-2/F-5/F-6/F-7; verdict #2 |
| 7 | **CONSTELLATION coordination spine** (PAUSE-CHECKSUMS, REMAINING-AUDIT-PLAN/MATRIX, EIGHT-HOUR pair, OWNER-SLOT, boundary docs) | **VERIFY-THEN-ADOPT** | Verification: commit as dated evidence; re-issue the eight-hour seal (4/24 FAILED, F-3; spot-check #8) or mark it superseded; resolve/retract the orphan `edf0c4fd…` pin (F-4); relabel every Codex-authored `*-OWNER-ADJUDICATION-*`/`*-HOSTILE-*` with true authorship (M-21 §1; red-matrices §12.3); ADOPT the plan's §9 fail-closed law verbatim into `FORMATION-LAWS.md` (S-08). The pause-checksums packet itself is the corpus's strongest artifact (75/75, S-01). | S-01/S-08; F-3/F-4; spot-checks #6/#8 |
| 8 | **VALUE-FRONTEND-CANONICAL-REPORT-CLOSURE family** (.md/.json + INDEPENDENT-REVIEW + CHECKSUMS) | **VERIFY-THEN-ADOPT** | Verification: one-line addendum recording the successor hashes `66228a35…`/`9b6d484c…` against the review's v1 back-pins (verdict #6 — the review attaches; no re-issue needed); annotate the review's `falsifier: null` as REFUTED-on-the-merits (K-8); note the COMPLETENESS drift row is commission-caused, not Codex (parser §2.8). The closure prose itself is scrupulous (S-06) and its "next gate is NOT more report authoring" sentence is adopted as binding. | verdict #6; axes D-5; S-06 |
| 9 | **The 46 report-authored axes** | **VERIFY-THEN-ADOPT** | Adopted as a *source-review findings ledger*, never as challenge coverage. Verification: (a) relabel their ledger status (`EXISTS-DIRECT`→`UNWITNESSED-DIRECT` or `REPORT-AUTHORED`, tooling §2); (b) QUARANTINE every motion/reduced-motion assertion pending the two-guard check (verdict #8); (c) re-run as workflow challenges exactly: `ActionFeedback` L and `picker-pointerdebugoverlay` D (the two confirmed-false carriers), plus `picker-componentsliders-consolerail` D on the lane's Kronecker-matrix argument; (d) the nine confirmed shipping defects (K-10) enter the defect ledger NOW with their byte receipts. Receipt hygiene (45/45 byte-exact, K-9) is better than most of the workflow corpus. | axes §2–§5; verdicts #5/#6/#7/#8 |
| 10 | RED matrix **M1** — owner controls `0/44` + retentions `0/1,892` | **RETIRE** | Self-defined lattice over nonexistent artifact classes; 43/44 target fields resolve to nothing; `1892 = 44×43`; RED hard-coded by a one-character mode expectation. Preserve as archaeology; never quote the fractions. | red-matrices §2; K-19 |
| 11 | RED matrix **M2** — API policy `0/9` | **VERIFY-THEN-ADOPT** | The one RED matrix measuring real product against a real owner-rooted target (D9–D13 + `vnext/api-contract.source.json`). Verification: re-measure the nine classes at current HEAD before wave authoring. | red-matrices §11.3; K-26 |
| 12 | RED matrix **M3** — mobile source-closure gates `0/5` (framing) | **RETIRE** | "Five attempts, none accepted" is not a product measurement; v1/v2 empty, v4/v5 never ran. The v3 census inside it is row 21. | red-matrices §10 |
| 13 | RED matrix **M4** — `0/60` AUTHENTICATED-PASS | **RETIRE** | Process ritual cross-product (4×3×5); all 60 identity tuples null under an "AUTHENTICATED" label. The 34-entry evidence catalog is kept as an index (verified pin `b3929ebf…` exact). | red-matrices §6; K-22 |
| 14 | RED matrix **M5** — strict root `0/5` | **RETIRE** | Self-authored admission bar, no consumer. The routing sentence ("four native repos + a paused parser receiver") is kept as prose. | red-matrices §7 |
| 15 | RED matrix **M6** — common-law `0/1` (SOURCE-CONTRACT V1→V6 ladder) | **RETIRE** | Six versions in 97 minutes; "hostiles" + "owner adjudication" sharing mtime minutes (spot-check #5); all falsifiers internal to its own schema; 0 product bytes. Purest L-19 instance in the corpus. | red-matrices §8; spot-check #5 |
| 16 | RED matrix **M7** — parser-law `14/34` (the fraction) | **RETIRE** | Numerator self-awarded by the rubric's second clause; A05 = GREEN-by-inaction. Parser resumption starts from M-9 TRIFOLD, not from 14/34. | red-matrices §4; K-20 |
| 17 | **M7 §2.1–2.2 bench law** (cells C01–C05: per-plane CI95 floor, complete-product cost decomposition, no aggregate hiding a failing plane) | **VERIFY-THEN-ADOPT** | The best answer to OC-1 anywhere in the corpus. Verification: restate its budgets against the reconstructed denominator (row 26) before it binds any parser wave. | red-matrices §4.2, §13.8; parser F-1 |
| 18 | RED matrix **M8** — CSS DREI-v11 `0/188 / 0/376 / 0/35,156` | **RETIRE** | 67.6 MB manifest, zero value.js contact; 11 versions in 4h44m iterating the spec. Review A's self-oracle falsifier is kept verbatim as a review heuristic (red-matrices §3.4). | red-matrices §3; K-21 |
| 19 | RED matrix **M9** — N2-IETM v10 `0/172` | **RETIRE from the Value ledger** | Not a Value matrix; the only executed N2 run crashed in its own runner (`commandsRun: 0` elsewhere). Raw-stream preservation credited. | red-matrices §5 |
| 20 | RED matrix **M10** — Kronecker `0 / 3,219,211,296` | **RETIRE** | Physically unexecutable; cite by name whenever a future lane proposes a cross-product denominator. The Kronecker *law*'s epistemics (no emulation laundering) are separately credited (red-matrices §13.6). | red-matrices §9; K-23 |
| 21 | **M11 — the v3 source census** (+ the four verified frontend defects) | **ADOPT** | 88 SFC / 310 members / 14 routes+wildcard / 13 `:is` / 2 Teleports / 2 harnesses / per-file SHAs — every checked count exact against live bytes on 08-03 (spot-check #1). The unguarded `meta:{admin}` finding heads the wave inputs. | red-matrices §11.1–11.2; K-24/K-25 |
| 22 | **`validate-completeness.mjs` rewrite** | **VERIFY-THEN-ADOPT** | It killed two real contrivances (loose-filename banking worth 19 false rows; the hand-declared `ACTIVE` escape hatch) and its GREEN reproduces under independent recomputation. Verification before it gates anything: (1) commit the `hydrate-reports.mjs` diff — until then the GREEN is unregenerable from the repository (K-35); (2) delete the `UNASSIGNED-FRONTEND-OMISSIONS` unconditional-covered exemption (spot-check #2); (3) make `NOT HARVESTED`/agents≠results fail per its own §-header law; (4) port `expectReject` from row 24 as its self-test. | tooling §1; K-2/K-35 |
| 23 | **`hydrate-reports.mjs` EXISTS-DIRECT edit** | **VERIFY-THEN-ADOPT** | Verification: commit it; rename the status so a reader cannot mistake survival for returned work; defensive current-roster scoping is credited. | tooling §2; verdict #7 |
| 24 | **`validate-constellation-dag.mjs`** | **RETIRE** | Fails on its own base graph today (exit 1, this seat's verdict-#4 evidence); authority hardcoded to a mutated out-of-repo file; referenced by nothing. SALVAGE: the `expectReject` mutation harness — the single best-engineered validation idea in the census, a gate that proves it can fail — ports into row 22. | tooling §5; verdict #4 |
| 25 | **`BUILD-V12.py`** | **RETIRE** | Terminal contrivance: 8 revisions to 244 KB, 3/3 TERMINAL_RED then +20 KB unreviewed, `HARD_PINS` self-derived, the V11 falsifier cured by making the check unfailable, zero output ever materialized. Receipts throughout are exact and `credit: 0` was never violated — a judgement failure, not an honesty failure. Preserve under evidence law; never resume the vN ladder. | tooling §4; K-33/K-34 |
| 26 | **Performance-law amendment** (`CONSTELLATION-CONVERGENCE-LOOP-AND-PERFORMANCE-LAW-AMENDMENT-2026-07-30.md`) | **VERIFY-THEN-ADOPT** | "10× impossible" stands and strengthens (K-18). Verification: publish the exact M2 attribution rule reproducing `1,870,633` from `p3-direct-closure.cpuprofile`, or restate the 3×/2× table against the reconstructed `1,636,680 µs`; until then the headroom figures are UNCITABLE (overstated 19–25%). `P4-EVIDENCE-REPLAY.json` under `~/Documents/Codex` is the artifact most likely to settle it — re-check under a live TCC grant. | parser §3.4, F-1, §6 |
| 27 | **The five 08-02 intakes** (keyframes-v8-review-b10 · keyframes-b10-static-hostile-a · value-mobile-safari-v6 · fourier-mobile-safari-r3 · Glass Row 8 dependency intake) | **ADOPT** | Every root exists at the stated path with the stated counts and byte totals; every spot-checked SHA matches to the digit; Glass Row 8's commit/tree/parent verified in the producer repo character-for-character. | supersession S-02; K-32 |
| 28 | **The 7e28 worktree corpus** (~126 untracked megatranche files, incl. `VALUE-FORMATION-PACKET`, both convergence matrices, the formation/ lineage, `API-POLICY-V-API-01`) | **VERIFY-THEN-ADOPT** | Verification = the C-11 program: census + hash all of it; rule each file under M-21 §2; copy keepers into `formation/codex-worktree-7e28/` with provenance headers; resolve the `PRODUCER-ARTIFACT-BOUNDARY-2026-07-29.md` two-documents-one-name collision; re-verify the 07-31 SHA table against the copies. Receipt integrity there is genuine (every re-hashed digest matches its live-doc citation) — the defect is placement, not fabrication. | C-11; verdict #4 |
| 29 | **Model-law substitution** (L-14 + M-16, commit `f6f7040a` 07-28) | **SUPERSEDE** | Successor: L-18 + the commission's model law (M-12 tri-fold; Sol/Luna binds Codex-side seats only). L-14 marked SUPERSEDED in place with its Evidence line corrected; M-16 annotated `CODEX-AUTHORED — NO OWNER QUOTATION`; M-21's provenance window extended to 07-28. | C-05 |
| 30 | **Excavation family** (`TRUTH-TABLE.md`, coverage ledgers, session-coverage) | **ADOPT** | The denominator-honesty section is model work (65 = 13+10+22+13+7, grain named, "No row below pretends otherwise"); the 107-directory grain verified; add the one C-09 grain-sentence so the two figures stop reading as a reversal. | supersession S-07, C-09; K-36 |

**Disposition census: ADOPT 3 · VERIFY-THEN-ADOPT 11 · SUPERSEDE 5 · RETIRE 11 — 30 rows, nothing
undispositioned.**

---

## 5. Tranche-development consequences

### 5.1 Feeds wave authoring DIRECTLY (adopted, evidence-grade now)

1. **The v3 source census** — the frontend surface denominator: 88 SFC / 14 routes + wildcard /
   13 `:is` / 2 Teleports / 2 harnesses, per-file SHAs (row 21).
2. **The unguarded `meta:{admin}` route finding** — security-relevant, heads the frontend wave
   inputs; plus Stub routes, wildcard redirect, non-fail-closed pane fallback (K-25).
3. **The nine confirmed shipping defects from the 46 axes** (K-10): glass-ui Button `variant`
   dead axis (2 consumers), Skeleton inert props (4 sites), the TagEditPopover Checkbox
   `modelValue` silent data loss, the ICtCp `cp`→`Ct` mis-resolve (+ the `jz` degradation the
   report under-called), dead emit/prop/expose/inject surfaces, PointerDebugOverlay
   a11y/clipboard cluster. These are wave-ready with byte receipts.
4. **The five 08-02 peer-repo intakes** (row 27) — cross-repo dependency state is trustworthy as
   written, including Glass Row 8.
5. **The parser bench substrate**: candidate numbers 1,157,659/144,501/167,382/311,883 (exact),
   the 36 P3 ratios, the 7 A3 ratios, and the "10× impossible" conclusion (K-16/K-17/K-18) —
   plus the M7 §2.1–2.2 per-plane bench law as the OC-1 contract once its denominator is restated
   (rows 17/26).
6. **The Claude-era probes** `r1-published-totality.mjs` (324/1548 RED reproduced byte-identical;
   mechanism `src/css/grammar.ts:181`) and `library-band-gates.mjs` (12 source-cited REDs) —
   pre-Codex, re-verified by the tooling lane, and they are the live parser/library born-RED set.
7. **The §9 fail-closed resumption law** (S-08) — adopt verbatim into `FORMATION-LAWS.md`.

### 5.2 RE-OPENS (verify-then-adopt gates before any dependent wave)

1. **The carry ledger** (C-01/C-10): fifteen dropped cuts + `c4af0ef9` VERIFIED — this is the
   spine of the next formation; nothing V·MT/V·C-derived opens until it exists.
2. **The evidence commit** (C-02): one pathspec commit of the whole uncommitted chain, first.
3. **The completeness toolchain** (rows 22/23): commit the diff, kill the exemption, relabel the
   51; only then may "264/264" appear in a gate — split as 218 CHALLENGED + 46 REPORT-AUTHORED
   (+5 workflow EXISTS-DIRECT re-homed).
4. **Three axes re-run as workflow challenges** (row 9c) + the reduced-motion quarantine sweep.
5. **The API 0/9 re-measure at HEAD** (row 11) → feeds the API wave directly after.
6. **The Glass-8 trigger re-derivation against I-21** (C-07) — carries the corpus's one LIVE
   deadline (D-2 reversal window closes at TR#79). Time-sensitive; do it in the first session.
7. **The 7e28 census** (row 28) — until done, 45 live-doc references dangle into a tree the
   owner cannot see.
8. **The checksum re-issues** (rows 6/7): 07-31 resurrection + 08-03 eight-hour seals; standing
   rule adopted: date-stamped `.sha256` files are append-never-rewrite.
9. **The M2-denominator restatement** (row 26) before any 2×–3× parser budget is cited.

### 5.3 DIES (retired; preserved as archaeology only; never quoted as convergence)

- The seven manufactured RED fractions: `0/44`+`0/1,892` · `0/60` · `0/5` (strict root) · `0/1`
  ×6 versions · `0/188`/`0/376`/`0/35,156` · `0/172` (N2, wrong repo) · `0/3,219,211,296`.
- The `14/34` parser-convergence fraction (its bench law survives separately).
- `BUILD-V12.py` and the whole vN builder ladder.
- `validate-constellation-dag.mjs` as-is (its `expectReject` harness survives by transplant).
- The `72/88` / `218/264` / "16 workflows missing" remainder arithmetic — unreplayable pin,
  factually superseded at HEAD.
- The `90/48` shadcn figure as file bounds.
- The Sol/Luna model-law substitution as owner law.
- Standing rule for all future lanes (red-matrices §14.8, adopted): **a denominator formed by a
  cross-product of the audit's own categories is presumed contrivance under L-19 and must name a
  product consumer before it may be counted.**

### 5.4 Program-level truths the next formation inherits

- **Both harnesses' write channels are fully attributable** — 460/460 Codex ops header-attributed
  (S1), and the pre-window tree is Claude-attributed to the file (§1.5). Provenance panic is
  unwarranted; provenance *discipline* (commits, store-scoped counts, authorship labels) is what
  failed.
- **Codex's validators got better while its builders went terminal** (tooling §7) — adopt the
  validators with amendments, retire the builders, and keep the one great idea: gates that prove
  they can fail.
- **The words outran the evidence** — `AUTHENTICATED`, `OWNER-ADJUDICATION`, `hostile`, `GREEN`,
  `immutable` each asserted more than the record beneath them. Every adopted artifact carries a
  relabel term for exactly this reason.
- **The orchestrator's death was silent and the three last verdicts (typed-DAG NO-GO ×3) exist
  only in `~/.codex` rollouts** — the next formation should ingest them as its first mail sweep.

---

*Master ledger. One file written (this one). All verification read-only: no git mutation, no
`~/.codex/**` or `~/Documents/Codex/**` write, no product byte touched.*
