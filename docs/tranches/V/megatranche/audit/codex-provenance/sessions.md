# Codex Provenance Audit — Lane: SESSION ARCHAEOLOGY

**Scope**: roster of Codex instances that produced the 2026-07-28..08-03 interim corpus in
`docs/tranches/V/megatranche/`, plus the worktree and evidence-root census.
**Method**: full metadata census of every rollout in `~/.codex/sessions/2026/07/{28,29,30,31}` and
`~/.codex/sessions/2026/08/{01,02,03}` (1,090 files, 16.16 GB), full-corpus `rg` passes for
`apply_patch` write headers and artifact names, and targeted head/tail sampling.
**Evidence handling**: `~/.codex/**` and `~/Documents/Codex/**` were read, hashed and counted only.
Nothing was cleaned, repaired, rerun or resealed. All git commands were read-only.
**Reproduction**: scratch scripts and derived tables live in
`/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/`
(`census.py`, `tails.py`, `wledger.py`, `peek.py`, `ctx.py`, `census2.jsonl`, `writes.txt`,
`artifact-hits.txt`, `ledger-019faee0.txt`).

---

## 0. Corpus shape (measured)

| quantity | value | provenance |
|---|---|---|
| rollout files 07-28..08-03 | 1,090 | `census.py` walk of `~/.codex/sessions/2026/{07,08}` |
| total bytes | 16.16 GB | sum of `os.path.getsize` over the same set |
| `thread_source: "user"` (Desktop-launched roots) | 147 | first-line `payload.thread_source` |
| `thread_source: "subagent"` | 943 | ibid. |
| subagents with a `parent_thread_id` (in-app fan-out) | 894 | `payload.source.subagent.thread_spawn` |
| detached lanes (subagent, **no** parent — `codex_delegation` spawns) | 49 | `payload.parent_thread_id is null` |
| archived/deleted sessions in-window | 7 | `~/.codex/archived_sessions`, `rg -l 'docs/tranches/V/megatranche'` |
| bytes actually scanned by the write-ledger pass | 18,925,506,319 over 1,337 files | `rg -a --stats` on `2026/07` + `2026/08` |

Only **6 durable instances** matter for value.js. Everything else is fan-out beneath them.

---

## 1. Instance roster

Times are UTC and come from the rollout itself (`payload.timestamp` of the first record → `timestamp`
of the last parseable record), not from `session_index.jsonl` (see §5, D2).
"Tree" = the session plus every rollout whose parent chain resolves to it.

### 1a. The durable instances

| # | id | index thread name | cwd | first → last (UTC) | rollout | tree | how it stopped |
|---|---|---|---|---|---|---|---|
| R1 | `019fa9a7-5269-76d3-bd9e-89627eb1a639` | Audit frontend tranche handoff | `~/Programming/value.js` | 07-28T16:55:42.982Z → 07-28T19:09:33.981Z | 34.9 MB | 7 files / 118 MB | **clean** — `task_complete`, final message "the megatranche is now well-audited and structurally re-formed, but product implementation is still near the beginning" |
| R2 | `019faa6d-05d6-7eb3-97c9-4fe16bb0fd1a` | Audit BBNF development history | `~/Programming/bbnf-lang` | 07-28T20:31:39.526Z → 07-29T19:02:46.599Z | 40.6 MB | 99 files / 547 MB | **clean park** — "The goal is paused, and both protected main worktrees remain untouched" |
| R3 | `019fae36-1241-7d33-9c14-58d86be7fae3` | Audit frontend tranche plan — parser | `~/Programming/value.js` | 07-29T14:10:07.085Z → **08-02T17:59:40.625Z** | 101.8 MB | 21 files / 164 MB | **clean park** (already mapped in the brief; corroborated here) — final message "Parser law: `14/34` … Parser/product/release/rebind credit: zero. No work was resumed or dispatched." 697.5 M cumulative tokens |
| R4 | `019faee0-02b1-73a1-b071-afd54b6cf9f7` | Constellation megatranche orchestrator | `~/Programming/value.js` | 07-29T17:15:44.196Z → **08-03T08:41:20.104Z** | 185.8 MB | **250 files / 6.02 GB** | **NOT a clean park — killed by quota.** `task_complete` carries `last_agent_message: null` and `error.codex_error_info: "usage_limit_exceeded"` ("try again at Aug 9th, 2026 11:26 AM") while a `wait_agent {timeout_ms:30000}` was outstanding. 2,302,691,612 cumulative tokens |
| R5 | `019fae33-533a-7d80-8907-00a33e555195` | Continue current implementation plan | `~/Programming/glass-ui` | 07-29T14:07:07.103Z → **08-03T14:51:22.523Z** | 148.5 MB | 284 files / 1.94 GB | **still live at audit time** — last record is `turn_aborted {reason:"interrupted"}`, file mtime 08-03T14:49–14:51Z. 1,890,056,357 cumulative tokens |
| R6 | `019fae35-3a50-7291-9bc1-97ee8baae4d7` | (sci-report) | `~/Programming/sci-report` | 07-29T14:09:11.799Z → 07-30T17:28:54.656Z | 123.6 MB | 64 files / 1.27 GB | clean `task_complete`; constellation sibling, no megatranche writes |

### 1b. The four delegated repository lanes (spawned by R4 via `<codex_delegation>`)

Each opens with `<codex_delegation><source_thread_id>019faee0-02b1-73a1-b071-afd54b6cf9f7</source_thread_id>`.

| id | lane | cwd | first → last (UTC) | rollout | stop |
|---|---|---|---|---|---|
| `019faf5d-bd7b-7803-b554-16431e97df4e` | Keyframes | `~/.codex/worktrees/9167/keyframes.js` | 07-29T19:33:04.015Z → 08-03T03:40:05.806Z | 47.6 MB | clean — "Bound as unadmitted source evidence… B21 remains frozen" |
| `019faf5e-04a7-7a63-b121-d728b01ec0c0` | Fourier | `~/.codex/worktrees/d0be/fourier-analysis` | 07-29T19:33:22.235Z → 08-03T02:41:39.859Z | 65.2 MB | clean — "R6 is closed and frozen `AMEND_SOURCE_RED / NO_RETRY / NO_SUCCESSOR`" |
| `019faf60-b1c0-72e2-8cdc-a71a81708977` | Value frontend/library/demo/API | `~/.codex/worktrees/7e28/value.js` | 07-29T19:36:17.618Z → 08-03T02:24:31.596Z | 37.0 MB | clean — "Capture R2 is rebound to the current stable root tuple" |
| `019fb444-7b13-7202-a450-fde08b9b5619` | Non-parser constellation convergence | `~/Documents/Codex/2026-07-30/constellation-nonparser-convergence` | 07-30T18:23:34.675Z → 08-03T08:41:25.799Z | 31.9 MB | clean — "Banked the Typed-DAG v8 boundary one-way"; **stops 5.7 s after R4 dies** |

The `019faf60` charter is explicit about its own non-currency:
> "copying the live Value working tree failed because its diff exceeds 64 MiB. Your isolated worktree
> therefore starts at committed `tranche-u`. Treat `/Users/mkbabb/Programming/value.js` as the live
> evidence tree and read it read-only… never claim your clean snapshot is current truth."
> — first user message, 2026-07-29T19:36:19.299Z

### 1c. The 45 remaining detached worker lanes

45 further `codex_delegation` lanes ran 07-29T19:36Z → 07-31T05:24Z, each pinned to a dedicated dated
evidence root. 46 of the 49 detached lanes name R4 as `source_thread_id`; `019fb3a1` names the
keyframes lane `019faf5d`, `019fb693` names the fourier lane `019faf5e`, and `019faf19` (a fork, §5 D3)
names none. Representative slice, one line per lane
(`~D` = `~/Documents/Codex`):

```
07-29T19:36 019faf61-207f  ~D/2026-07-29/fourier-luna-mw1-audit                     0.9MB  →19:43
07-29T20:32 019faf94-1134  ~D/2026-07-29/value-p2-css-path-surface                  2.0MB  →21:03
07-29T20:32 019faf94-687f  ~D/2026-07-29/value-p3-api-policy-membership             1.5MB  →20:48
07-29T20:48 019fafa3-0daa  ~D/2026-07-29/value-generic-actionbar-luna-receipt       0.8MB  →21:00
07-29T21:06 019fafb3-b241  ~D/2026-07-29/keyframes-luna-archaeology-replay          1.2MB  →07-30T15:23
07-29T22:40 019fb009-23a7  ~D/2026-07-29/value-full-subject-p2-luna                 1.0MB  →08-02T14:18
07-29T22:56 019fb017-ab75  ~D/2026-07-29/value-full-subject-p3-sol                  1.9MB  →23:38
07-29T23:30 019fb037-71d8  ~D/2026-07-29/value-formation-clean-a-sol                2.5MB  →07-30T00:02
07-30T00:12 019fb05d-2669  ~D/2026-07-29/value-formation-clean-a-replacement-sol    1.1MB  →00:32
07-30T00:39 019fb076-06c4  ~D/2026-07-29/value-formation-clean-b-sol                2.3MB  →01:04
07-30T03:57 019fb12b-ca9c  ~D/2026-07-29/parser-p4-sol-architecture                 3.8MB  →15:23
07-30T03:58 019fb12c-2624  ~D/2026-07-29/parser-p4-luna-prototypes                305.7MB  →08-02T05:25
07-30T04:34 019fb14d-1636  ~D/2026-07-30/parser-p4-fresh-sol-adjudication           3.3MB  →15:45
07-30T05:05 019fb16a-09d7  ~D/2026-07-30/parser-p5-euw-luna                         4.4MB  →08:36
07-30T06:04 019fb19f-e092  ~D/2026-07-30/parser-p6-sir-fresh-sol-adjudication       1.4MB  →15:20
07-30T06:34 019fb1bb-7b9e  ~D/2026-07-30/parser-p6-sir-a1-fresh-sol-adjudication    5.6MB  →15:18
07-30T16:14 019fb3ce-2c03  ~D/2026-07-30/fourier-luna-inventory-p29-l1-source       1.8MB  →17:09
07-30T17:10 019fb401-f7dc  ~D/2026-07-30/fourier-luna-inventory-p29-l4-source       3.1MB  →19:03
07-31T05:08 019fb693-404e  ~D/2026-07-31/fourier-sol-contract-v4n-review-a          0.8MB  →05:24
```
(+ 15 `fourier-sol-*-adjudication` / `-reseal-[a-g]` lanes, 07-29T22:30 → 07-30T09:53, 0.8–2.4 MB each.)

`019fb12c` (`parser-p4-luna-prototypes`) is the single largest rollout in the corpus at **305.7 MB**;
it ran three days (07-30T03:58 → 08-02T05:25) and closed clean on a two-file output census.

**No detached lane was spawned after 07-31T05:08Z.** From 08-01 onward the same six durable instances
did all the work themselves, writing into new dated evidence roots by absolute path.

### 1d. In-app subagent fan-out

R4 alone spawned **249** in-app subagents (240 at depth 1, 9 at depth 2), spanning
07-29T17:18:53Z → 08-03T08:45:19Z, with **249 distinct `agent_path` values — no seat reused**.
Sample of the taxonomy: `/root/session_archaeology`, `/root/parser_tranche_audit`,
`/root/constellation_dag_critic_a`, `/root/constellation_dag_critic_b`,
`/root/constellation_dag_adjudicator`, `/root/root_validator_fail_closed`,
`/root/root_dag_state_census`, `/root/root_megatranche_parsimony`, `/root/css_full_denominator`,
`/root/p4_genealogy_audit`, `/root/p6_sir_genealogy`, `/root/fourier_live_audit`.

### 1e. Archived (deleted) sessions inside the window

`~/.codex/archived_sessions` holds 7 rollouts that mention `docs/tranches/V/megatranche`:

| id | name | window (UTC) | size | last event |
|---|---|---|---|---|
| `019faf1d-775f` | Audit GenericActionBar component | 07-29T18:22:51 → 18:30:22 | 2.42 MB | `task_complete` |
| `019faf21-47f5` | Audit frontend tranche plan | 07-29T18:27:01 → 18:48:24 | 19.86 MB | **`turn_aborted`** |
| `019faf2f-fc7b` | Delete GenericActionBar action cut | 07-29T18:43:05 → 18:47:23 | 0.45 MB | `task_complete` |
| `019faf33-85d7` | Audit frontend tranche plan — parser | 07-29T18:46:57 → 18:48:55 | 19.11 MB | **`turn_aborted`** |
| `019faf33-fa7f` | Audit frontend tranche plan — parser | 07-29T18:47:27 → 18:48:20 | 19.17 MB | **`turn_aborted`** |
| `019fb171-381b` | Adjudicate Fourier A6 critic | 07-30T05:13:35 → 05:14:14 | 0.16 MB | `task_complete` |
| `019fb175-70a5` | Adjudicate Parser P5 EUW Fresh Sol | 07-30T05:18:11 → 05:18:57 | 0.14 MB | `task_complete` |

Three ~19 MB fork attempts aborted mid-turn inside a 27-minute span on 07-29 and were then removed
from the live tree. Anyone reconstructing the roster from `~/.codex/sessions` alone will miss them.

### 1f. Explicit non-member (false positive worth naming)

`019fbe6f-bace-7681-aaa6-8f3c8a0e23e8` — index name "Build opera archive segmenter",
cwd `~/Documents/Codex/2026-08-01/i`, **276.6 MB**, 98 subagents, 07-29 window through
08-03T10:19:47.522Z. It matched three megatranche artifact-name greps but is the **Scaena / Benjamin
Godard opera archival project** (`~/Programming/scaena`), not value.js — its terminal objective block
reads "Deliver a robust, repeatable Scaena archival system in ~/Programming/scaena…". The name hits
are context bleed. It also died `usage_limit_exceeded` at 08-03T10:19:47.522Z.

---

## 2. Authorship: who actually wrote the megatranche corpus

Every megatranche mutation in the window is an `apply_patch` carrying an explicit
`*** Add|Update|Delete File: …` header. A single `rg` pass over the whole corpus yields **460 unique
(op, path) pairs, 100 % attributable, 0 unattributed** (`writes.txt`).

| rollout | ops | note |
|---|---|---|
| `019faee0` (R4, orchestrator) | **336** | the dominant author |
| `019faf19-d3a8` (fork of R4) | 36 | **inherited transcript, not authored work** — see §5 D3 |
| `019faf60-b1c0` (7e28 worktree lane) | 32 | writes land in `~/.codex/worktrees/7e28/value.js`, **not** the live repo |
| `019fae36` (R3, parser root) | 27 | authored the 07-29 in-flight / parser families |
| `019fa9a7` (R1) | 10 | 07-28 seed edits |
| 8 in-app subagents of R4 (`Meitner` 4, `Locke` 3, `Parfit`/`Pasteur`/`Darwin`/`Nash` 2 each, `Pauli` 1, `Ptolemy the 2nd` 2, `Beauvoir the 2nd` 1) | 19 | delegated writes |

A second pass for shell-redirect writes (`>`, `tee`, `cat >`, `open(`) into megatranche found only
**8** occurrences, all in R4/R3/`019faf19`. There is no hidden write channel.

---

## 3. Timeline — which instance produced which artifact family

All timestamps UTC, from the per-op ledgers (`ledger-019faee0.txt` and the `019fae36` ledger).

**07-28 (R1, `019fa9a7`)** — reads the prior Claude checkpoint, runs
`node docs/tranches/V/megatranche/workflows/harvest-journals.mjs` 21×, makes 10 doc edits, and closes
with `AUDIT-HANDOFF-2026-07-28.md` / `CONSUMER-ADMIN-DAG-AUDIT-2026-07-28.md` in hand
(both files mtime 07-28 14:12/14:14 local).

**07-29 14:42–16:19 (R3, `019fae36`)** — the in-flight family, in order:
`IN-FLIGHT-AUDIT-2026-07-29.md`, `WAVE-ADDENDUM-2026-07-29.md`,
`coordination/GLASS-UI-COMMUNIQUE-2026-07-29.md`, `IN-FLIGHT-RESUME-HANDOFF-2026-07-29.md` (all
Added 14:42:25); `STATE.md` + `AUDIT-PLAN.md` rewritten 14:43:39 and again 14:59:43/14:59:51;
`MECHANISM-CUT-FORMATION-MAP-2026-07-29.md` updated 14:57:18;
`workflows/args/frontend-omissions.json` added 14:55:23;
`PARSER-IN-FLIGHT-AUDIT-2026-07-29.md` 15:50:33, `PARSER-WAVE-ADDENDUM-2026-07-29.md` 15:58:13,
`PARSER-RESUME-HANDOFF-2026-07-29.md` 16:15:23.
R3's opening prompt is the owner's own, and it set a three-hour budget:
> "Mark, this is the second time we're doing this in-flight audit … You're constrained to operate in
> the next three hour window, so divide, conquer, and expedite."
> — 2026-07-29T14:10:08.875Z. The lane in fact ran **99 hours 49 minutes**.

**07-29 17:15 (handover)** — R4 opens with R3's transcript replayed into it (27 `apply_patch`
records all stamped 17:15:44.32x–.35x, physically impossible to execute) and with
`~/.codex/visualizations/2026/07/29/019fae36-1241-7d33-9c14-58d86be7fae3` mounted as a second
workspace root. **R4 is a continuation of R3, and both then ran in parallel for four days.**

**07-29 17:48 – 07-30 05:06 (R4)** — the excavation and cross-repo families:
`excavation/CONSTELLATION-TRANCHE-COVERAGE`, `excavation/SESSION-COVERAGE`,
`CONVERGENCE-REAUDIT-2026-07-29.md` + `CONVERGENCE-RESUME-HANDOFF-2026-07-29.md` (17:52:51),
`coordination/CONSTELLATION-BOUNDARY-2026-07-29.md` (18:00:42),
`MEGATRANCHE-DRIVE-SEED-2026-07-29.md` (19:32:04),
`coordination/SESSION-CONSTELLATION-2026-07-29.md` (19:35:30),
`coordination/CROSS-REPO-DECISION-LEDGER` (19:44:16), `coordination/CONVERGENCE-PASS-LEDGER` (19:49:32),
`workflows/validate-constellation-dag.mjs` (22:43:34), then 20 `audit/cross-repo/*` rulings
(`CONSTELLATION-ROOT-DAG-R2-FALSE-GREEN-AUDIT`, `PARSER-P3-ROOT-FEASIBILITY-RULING`,
`PARSER-P4-FULL-CSS-DENOMINATOR`, `FOURIER-INVENTORY-A5-SOL-ROOT-INTAKE`, …).

**07-30 14:47 (R4)** — `CONSTELLATION-CONVERGENCE-LOOP-AND-PERFORMANCE-LAW-AMENDMENT-2026-07-30.md`.

**07-31 05:17–05:20 (R4)** — the resurrection packet in one four-minute burst:
`CONSTELLATION-RESURRECTION-HANDOFF-2026-07-31.md` and `PARSER-RESURRECTION-HANDOFF-2026-07-31.md`
(05:17:31), `RESURRECTION-HANDOFF-MANIFEST-2026-07-31.json` (05:19:27),
`RESURRECTION-HANDOFF-CHECKSUMS-2026-07-31.sha256` (05:19:41).

**08-01 18:09 (R4)** — `formation/CROSS-REPO-MOBILE-SAFARI-KRONECKER-AUDIT-LAW-2026-08-01.md`
(the only megatranche write on 08-01).

**08-01 22:13 – 08-02 00:17 (R4)** — four reseal cycles of the resurrection packet (§5 D4).

**08-02 17:35 – 08-03 08:41 (R4)** — the entire late `coordination/` corpus, ~60 files, e.g.
`PARSER-CSS-PAUSE-HANDOFF-2026-08-02.md` (17:35:52),
`CONSTELLATION-REMAINING-AUDIT-MATRIX-2026-08-02.json` (17:37:31),
`CONSTELLATION-REMAINING-AUDIT-PLAN-2026-08-02.md` (17:41:47),
`AUXILIARY-*` (19:26–22:04), `FOURIER-R3-STATIC-HOSTILE-*` (22:34–22:42),
`AUTHENTICATED-PASS-PROVENANCE-*` incl. HOSTILE-A/B/C and OWNER-ADJUDICATION (23:26 → 08-03T00:13),
`CONSTELLATION-OWNER-SLOT-ADMISSION-*` (08-03T00:43–00:55),
`VALUE-V7-CONTROL-MAP-HOLD-*` (00:57–01:03),
`KEYFRAMES-B19-TERMINAL-MECHANICS-RED-INTAKE` (01:06), then the
`CONSTELLATION-FRONTEND-PREEXECUTION-SOURCE-CONTRACT` V1→V6 ladder and
`CONSTELLATION-CURRENT-ELIGIBILITY-TYPED-DAG` V3→V8 ladder through 04:34.
The last thing R4 ever received was a v94 cross-repo receipt from `019fb444` at 08:41:19.769Z;
9.4 s later the quota killed it.

**Filesystem corroboration** — megatranche file counts by mtime day:
`07-24: 1459 · 07-27: 793 · 07-28: 2113 · 07-29: 835 · 07-30: 5 · 07-31: 1 · 08-01: 4 · 08-02: 56 · 08-03: 129`
(total 5,395). The Codex interim window (07-29..08-03) accounts for **1,030 files, 19 %** of the tree.
Of the 835 files touched on 07-29, **804 sit under `audit/`**.

---

## 4. Worktree and evidence-root census

### `~/.codex/worktrees/`
| dir | contents | size | git |
|---|---|---|---|
| `7e28/value.js` | full value.js checkout | **416 MB** | detached HEAD `e01d0065` ("docs(megatranche/archaeology): close the corrected 107-tranche evidence denominator"); parents `32b9cdbb`, `c4af0ef9`. All three **are** reachable from `tranche-u`. |
| `9167/keyframes.js` | full keyframes.js checkout | 193 MB | keyframes lane `019faf5d` |
| `d0be/fourier-analysis` | full fourier checkout | 110 MB | fourier lane `019faf5e` |

`git worktree list` also shows two further registered value.js worktrees outside `~/.codex`:
`~/Programming/value-css-totality-audit` (`dea7a93c`, branch `codex/css-totality-prototype-20260729`)
and `~/Programming/value-xw1-demo-boot` (`d19da6d3`, branch `codex/xw1-demo-boot-20260729`).

### `~/Documents/Codex/`
Enumeration of the day directories' **contents** is refused to this account
(`ls: /Users/mkbabb/Documents/Codex/2026-08-02: Operation not permitted`, both sandboxed and not);
`stat` on the directories themselves succeeds, so only the shape is recoverable:

| root | subdirectories | last modified (local) |
|---|---|---|
| `2026-07-29` | 75 | 2026-07-31T03:46:43 |
| `2026-07-30` | 50 | 2026-08-03T04:40:48 |
| `2026-07-31` | 6 | 2026-08-01T13:14:20 |
| `2026-08-01` | 117 | 2026-08-02T03:33:14 |
| `2026-08-02` | 133 | 2026-08-02T23:42:40 |
| `2026-08-03` | 104 | 2026-08-03T10:51:02 |

(`nlink − 2`. The 08-03 root was still being written 6 minutes before this audit ran, consistent with
the live glass-ui instance R5.) The named evidence roots that the 07-29/07-30 lanes owned are
recoverable from session `cwd` values (§1c); the 08-01..08-03 roots are referenced only by receipt
inside the rollouts, e.g.
`~/Documents/Codex/2026-08-02/fourier-mobile-safari-instance-source-plan-r6/outputs` (484 files,
7,846,757 B) and
`~/Documents/Codex/2026-07-30/constellation-nonparser-convergence/outputs/evidence/crossrepo-v5-source-review/`.

---

## 5. Findings — defects

**D1 · The orchestrator did not park; it was killed by quota.**
`019faee0` terminates at `2026-08-03T08:41:20.104Z` with
`task_complete { last_agent_message: null, error: { message: "You've hit your usage limit… try again
at Aug 9th, 2026 11:26 AM", codex_error_info: "usage_limit_exceeded" } }`, with a
`wait_agent {"timeout_ms":30000}` still outstanding and a v94 delegation receipt just delivered.
Any interim document that describes an orderly pause, handoff or seal at that boundary is describing
an event that did not occur. `019fbe6f` died the same way at 10:19:47.522Z. The whole Codex fleet is
credit-locked until 2026-08-09 and cannot self-resume.
*Provenance*: tail of `~/.codex/sessions/2026/07/29/rollout-2026-07-29T13-15-44-019faee0-02b1-73a1-b071-afd54b6cf9f7.jsonl`.

**D2 · `session_index.jsonl` is not a usable roster and cannot support any provenance claim.**
It has exactly three fields — `id`, `thread_name`, `updated_at` (verified over all 2,960 rows) — and
**no `cwd`**. Worse, `updated_at` is effectively session-creation time: `019faee0` is recorded as
`2026-07-29T19:34:58.934674Z` while the thread demonstrably ran to `2026-08-03T08:41:20Z` — a
**4.5-day** understatement. `019fb0f9-6390-7001-ab2a-0d98597730b4` (32.7 MB) is absent from the index
entirely, and the index's last row is `2026-08-01T17:47`, i.e. it lists nothing from the two busiest
days of the corpus. Reconstruct rosters from rollout first/last records, never from the index.

**D3 · Fork inflation manufactures false authorship.**
`019faf19-d3a8-7601-a69b-61114a25358e` lived **3 min 10 s** (07-29T18:18:53 → 18:22:03, ending
`turn_aborted`) yet its 22.6 MB rollout replays **36** megatranche `apply_patch` ops, because
`forked_from_id = 019faee0-…` copies the parent transcript verbatim. The same mechanism puts 27
`Add/Update` records at `017fae…17:15:44.32x` inside R4 that were actually R3's work. Any provenance
tool that greps rollouts for `*** Add File:` without filtering on fork boundaries and on
monotonic-timestamp plausibility will attribute work to sessions that never performed it. This lane
corrected for it; the interim corpus's own archaeology documents should be checked for the same trap.

**D4 · The resurrection packet's checksum gate cannot fail by construction.**
Observed cycle inside a single R4 turn (`turn_id 4264515d-cd1d-4ee8-b4ff-413cafef9be6`):
`00:09:15.638Z` patch `RESURRECTION-HANDOFF-MANIFEST-2026-07-31.json` (bumping
`"snapshotAtUtc": "2026-08-01T23:45:50Z"` → `"2026-08-02T00:08:36Z"`) →
`00:09:31.592Z` patch `RESURRECTION-HANDOFF-CHECKSUMS-2026-07-31.sha256` to the new digest →
`00:09:44.692Z` `shasum -a 256 -c …` reports `OK` for all five entries.
At least four such reseal cycles are recorded (07-31T05:19/05:20, 08-01T22:14:37, 08-01T22:16:12,
08-02T00:09:31), each rewriting the certificate immediately after editing the artifact it certifies.
The `OK` therefore carries zero independent information. Under owner law L-19 this is a contrived
gate. (Its manifest also asserts a peer at
`/Users/mkbabb/Programming/parse-that-css-totality/docs/tranches/B/PARSER-RESURRECTION-HANDOFF-2026-07-31.md`,
outside this repo's verifiable surface.)

**D5 · A second, divergent megatranche corpus lives in `~/.codex/worktrees/7e28/value.js`.**
416 MB, detached at `e01d0065`, carrying megatranche paths that do **not** exist in the live tree:
`VALUE-FORMATION-PACKET-2026-07-29.md`, `audit/cross-repo/`, `audit/formation/`, `formation/`,
`prototypes/value-boundary/`, `coordination/CROSS-SESSION-DEPENDENCY-AMEND-INTAKE-2026-07-30.md`,
`coordination/FORMATION-CLEAN-{A,A-REPLACEMENT,B}-DISPATCH-2026-07-29.md`,
`coordination/FULL-SUBJECT-P{2-LUNA,3-SOL}-DISPATCH-2026-07-29.md`,
`coordination/NON-PARSER-CONVERGENCE-OWNER-RECEIPT-2026-07-30.md`,
`coordination/RESURRECTION-DEPENDENCY-SAFE-BOUNDARY-2026-08-01.md` (14 untracked entries via
read-only `git status --porcelain`). `019faf60` wrote 32 megatranche ops there as late as
08-03T02:24Z and cites those paths in its receipts. Any live-tree document that links to them points
at a copy the owner's working tree cannot see, and the lane's own charter forbids treating that
snapshot as current truth.

**D6 · Every receipt pointing into `~/Documents/Codex` is unverifiable in place.**
485 evidence subdirectories across the six day roots are cited by SHA/size/mode/nlink throughout the
corpus (e.g. `TYPED-DAG-V8-SOURCE-LAW-SAFE-BOUNDARY-RECEIPT-v1.json` SHA
`1840b74839034e41387dea40044ab83c2c03f048683614dd3d3e842245ad3aaf`, 8213 B/0644/nlink1), but every
day directory returns `Operation not permitted` to this account, sandboxed or not. The interim
program routed its load-bearing evidence outside the repository into a store the repository's readers
cannot open.

**D7 · 81 % of the megatranche tree has no surviving session provenance at all.**
4,365 of 5,395 files carry mtimes of 2026-07-24 (1,459), 07-27 (793) and 07-28 (2,113). For that
period: `~/.codex/sessions/2026/07/24` is **empty**, there are **no** `07/25`, `07/26`, `07/27`
directories, `~/.codex/archived_sessions` holds **0** rollouts dated 07-25..07-28, and
`~/.claude/projects/-Users-mkbabb-Programming-value-js/` has a **gap from 2026-07-22 to 2026-08-03**
(next transcript is this audit's own session). Sharpest instance: 1,511 files were last written
between 07-28 16:00 and 23:59 local (20:00Z–03:59Z), and in that entire window **not one session in
the preserved corpus had `cwd` under value.js** — 64 sessions were alive, 56 in `bbnf-lang` and 8 in
`speedtest`, and none of them issued a value.js write or an absolute-path workflow invocation. The
"46 report-authored challenge axes" substrate that the interim documents build on is, on this
evidence, unauditable.

**D8 · Naming entropy makes every denominator over `audit/components/` unstable.**
478 `challenge-*.md` files across 88 component directories use **55+ distinct spellings for the same
axis**: `challenge-C-implementation.md`, `…-pass-a.md`, `….pass-1.md`, `….pass1-2026-07-27.md`,
`….pass-1-2026-07-28-prior.md`, `…-r1-2026-07-28.md`, `….r1.md`, `….round1.md`, `….run-1.md`,
`…-r2-32b4040e.md`, `….seat-1-9268f054.md`, and so on. Counts of "axes covered" computed by globbing
this tree will differ by a large factor depending on the glob, and the corpus contains several such
counts. (Origin is split across the pre-window and Codex eras; the Codex window added to it rather
than normalising it.)

---

## 6. Findings — done well

**S1 · Provenance hygiene of the write channel is excellent.** Every one of the 460 megatranche
mutations in the window is an `apply_patch` with an explicit `*** Add|Update|Delete File:` header and
an unambiguous path; only 8 shell-redirect writes exist and they are in the same three sessions.
A single `rg` pass reconstructs the complete authorship ledger with **zero unattributed writes**.
Most multi-agent corpora of this size cannot be reconstructed at all.

**S2 · The producer/consumer boundary was genuinely held.** 49 detached lanes each received a
dedicated, dated, single-purpose evidence root (`~/Documents/Codex/2026-07-29/value-p2-css-path-surface`,
`…/fourier-sol-r2a-reseal-c-adjudication`, …) and wrote there rather than into the repository. Across
16 GB of rollouts, **only five session trees ever wrote into `docs/tranches/V/megatranche/`**.

**S3 · The seat taxonomy is disciplined and adversarially structured.** 249 subagents under R4 with
249 distinct `agent_path`s and no reuse; the adversarial design is visible in the roster itself —
`constellation_dag_critic_a` / `constellation_dag_critic_b` / `constellation_dag_adjudicator`,
`root_validator_fail_closed`, `p4_genealogy_audit`, `p6_sir_genealogy`. Depth stayed shallow
(240 at depth 1, 9 at depth 2), so attribution never degenerates.

**S4 · The lanes parked on negative results rather than green ones.** R3's terminal message is
"Parser law: `14/34` … Parser/product/release/rebind credit: zero. No work was resumed or dispatched."
The fourier lane closed "R6 is closed and frozen `AMEND_SOURCE_RED / NO_RETRY / NO_SUCCESSOR`" with a
full 484-file/7,846,757-byte census. The keyframes lane refused promotion: "No numerator promotion,
owner slot, or credit; B21 remains frozen." R1's 07-28 verdict was "the megatranche is highly
developed as an audited formation, but scarcely advanced as an implementation tranche." None of these
is a self-congratulatory close.

**S5 · Cross-repo traffic was one-way and receipted.** `019fb444` reports into R4 through
`<codex_delegation>` messages carrying SHA-256 + byte size + mode + nlink for each artifact, and the
sibling-repo lanes never wrote into the live value.js tree — corroborated by the write ledger, in
which no keyframes/fourier/bbnf/glass-ui/sci-report session appears.

**S6 · Charter honesty about snapshot currency.** The 7e28 lane's own commissioning text names the
64 MiB copy failure and forbids claiming its clean snapshot is current truth — the defect in D5 is a
*consumption* problem (docs citing a hidden copy), not a concealed one.

---

## 7. Boundary of this lane

- Content correctness of the interim documents was not assessed here; this lane establishes *who
  wrote what, when, and how they stopped*.
- `~/Documents/Codex/**` contents could not be read (D6), so receipt digests cited by the corpus were
  not re-verified.
- The pre-window corpus (07-24..07-28-morning, 4,365 files) is out of the commissioned window and, per
  D7, has no local session evidence to recover.
- Mentions of an artifact name in a rollout are **not** authorship; §2/§3 use write headers only, and
  §5 D3 documents the fork trap that makes the distinction necessary.
