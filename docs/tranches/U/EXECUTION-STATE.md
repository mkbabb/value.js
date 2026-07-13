# U — EXECUTION-STATE (the wall-recovery manifest)

**Purpose.** The durable, repo-committed resume facility for tranche-U execution. A rate-limit /
session wall must lose NOTHING: this file + the run journals + the git tree are sufficient to
resume from any of the three death classes below. **Update this file at every wave launch/close**
(the orchestrator's standing duty); the git history of this file IS the execution timeline.

**Last stamped**: 2026-07-13, by the orchestrating session `daa7c418-d0bc-4d88-913c-27283e6345eb`.

---

## §1 The three death classes → the recovery per class

1. **API rate-limit wall, session process ALIVE** (the common case; ~5h reset cadence; the
   Fable-credit wall kills fable lanes while opus survives — a distinct sub-class): the in-session
   recovery cron (hourly, currently `:41`) re-fires the continue order when requests flow again.
   Handler: for each §2 run, check its journal freshness — alive → report only; dead →
   `Workflow({scriptPath, resumeFromRunId})` (same-session cache replays completed agents; only
   dead agents re-run). **Never burn a batch into a known wall**: if the reset time is known and
   in the future, arm a background timer to reset+2min instead of retrying.
2. **Session process DEAD** (machine sleep, CLI exit, hard crash): the cron dies with it, and
   `resumeFromRunId` is SAME-SESSION-ONLY — a fresh session CANNOT cache-resume. The fresh
   session's recipe: (a) read THIS file + `PROGRESS.md` + the memory ▶▶▶ block; (b) for each
   live run in §2, read `<transcriptDir>/journal.jsonl` (one `{"type":"result"}` line per
   completed agent — the full return values) + `git log --oneline -20 tranche-u` to establish
   what LANDED; (c) audit `git worktree list` for orphaned lane worktrees (uncommitted work is
   recovered per the standing law: audit → patch briefs pinned to the standing worktrees, strip
   isolation — NEVER blind-commit, NEVER discard); (d) hand-author continuation workflows from
   the dead run's script (in §3's scripts dir) minus the journal-proven-done phases.
3. **A single lane dead inside a live run** (StructuredOutput scope-overflow, fable-credit kill):
   the workflow returns `null` for that agent and continues; the orchestrator re-runs via
   `resumeFromRunId` (cached prefix) or a targeted completion brief against the lane's worktree.

## §2 Live runs (stamp on every launch/completion)

| Run | Workflow | Phase at stamp | Script (in §3 dir) | On death |
|---|---|---|---|---|
| `wf_319ba067-341` | U.W-LIB impl (3 lanes → integrate → gate → relay+close) | integrator committing merges (`cd3f743`, `168060d` landed) | `u-w-lib-impl-wf_319ba067-341.js` | resume; lanes 1-3 cached; DECISION.md binds the invariant |
| `wf_6c47fe54-fc2` | U.W-CANON (dispatch → ≤5 lanes → gate → close) | lanes (one works STAGED in the MAIN tree — recover its staging, never sweep it) | `u-w-canon-wf_6c47fe54-fc2.js` | resume; check main-tree staged CLAUDE.md/README/DESIGN set |
| `wf_d2caf8d6-1e6` | U.W-ORACLE (dispatch → ≤4 lanes → gate → close) | lanes | `u-w-oracle-wf_d2caf8d6-1e6.js` | resume |
| `wf_237d5120-d5a` | U.W-VISUAL remediate (header fable lane ∥ riders → gate → close) | lanes (worktree-isolated) | `u-w-visual-remediate-wf_237d5120-d5a.js` | resume; the header lane is FABLE (credit-wall-exposed); its worktree carries the header re-cut |

**Completed runs** (journals retained, no action): `wf_5a0823fb-9f1` LIB evidence ·
`wf_dd696346-869` VISUAL census (verdict table `audit/w-visual/census.md`) · `wf_fb4f0284-ad9`
SEC (CLOSED `complete_with_misses`) · `wf_c1769491-04d` DEMO (CLOSED `complete`).

## §3 Paths (absolute; survive session death)

- **Scripts**: `~/.claude/projects/-Users-mkbabb-Programming-value-js/daa7c418-d0bc-4d88-913c-27283e6345eb/workflows/scripts/`
- **Journals**: `~/.claude/projects/-Users-mkbabb-Programming-value-js/daa7c418-d0bc-4d88-913c-27283e6345eb/subagents/workflows/<runId>/journal.jsonl`
- **Memory**: `~/.claude/projects/-Users-mkbabb-Programming-value-js/memory/tranche-r-developed.md` (the ▶▶▶ block)

## §4 The DAG cursor + standing state

- **Closed**: DEMO (`complete`) · SEC (`complete_with_misses`). **In flight**: LIB · CANON ·
  ORACLE · VISUAL-remediate. **Next**: A11Y (opens at VISUAL close) → PERF (VISUAL+A11Y+ADOPT
  binds U-F76/U-F3). **ADOPT**: trigger-gated — probe `git -C ../glass-ui tag --list 'v5*'`
  each round (EMPTY at stamp). **CLOSE last** (zero-drop ledger walk · publish presentation ·
  real-GPU annex · the census ANNEX-7 + u-f12 Pole A/B bracket to the owner).
- **Substrate**: glass-ui PINNED @ `2e559f7a` (both symlinks → `.claude/worktrees/glass-ui-pinned`;
  record `audit/w-adopt/substrate-pin.md`; UNPIN at the v5 tag). The L17 goo-blob→blob consume
  swap is LANDED (`110b56f`). Their BI relay commits: `c66b5354` (dist breakage) — LOCAL-ONLY on
  their `tranche/BI` (no upstream).
- **Ports**: `:9000` = the owner's dev server, NEVER touched. Lane ranges used so far: 8490/8491
  (ceremony e2e) · 8591-8599 (VISUAL census/remediate/gate) · 8600-8650 (SEC) · 8660-8680 (DEMO)
  · 8700-8750 (ORACLE). Lane-unique `VJS_E2E_PORT`/`PERF_PORT` always.
- **Owner-reserved (NEVER proxy; present at the terminal report)**: the U-F29 version-cut /
  npm publish (packet: `audit/w-lib/publish-packet.md` when LIB closes) · the T.W8 HG6 taste
  verdict (`docs/tranches/T/audit/w8-certification/VERDICT-2026-07-12.md` empty stub) · the
  u-f12 Pole A/B bracket · the census ANNEX-OWNER-ATTEST 7-row slate.
- **Booked residuals riding to CLOSE**: the quiet-host reactivity e2e re-run (ceremony residual)
  · U-F39/U-F41 prod-attestation legs (SEC) · the App.vue eager-chunk sideEffects reconciliation
  (DEMO book).

## §5 Standing laws (verbatim-derived; bind every resumed lane)

E-3 no-workarounds gestalt · batches ≤3 per workflow · Fable orchestrates + designs, opus/sonnet
fanout · born-RED honesty (real-GPU/owner frame for GPU visuals — U-F54; never fake-judge) ·
PP-16 close honesty · path-scoped commits + pull-rebase (`--autostash` when the main tree carries
another lane's staged work — and NEVER sweep another lane's staging into your commit; pathspec
commits only) · the BH/BI relay on every glass-ui-touching change (active inbox:
`../glass-ui/docs/tranches/BI/coordination/`, single-file, plain-push-only) · sibling trees
READ-ONLY · probe-parsimony · the terminal StructuredOutput law in every agent prompt · every
commit trailer: `Claude-Session: https://claude.ai/code/session_01XskVMTQAWVgvWQvhiYECgb`.
