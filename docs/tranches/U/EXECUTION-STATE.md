# U — EXECUTION-STATE (the wall-recovery manifest)

**Purpose.** The durable, repo-committed resume facility for tranche-U execution. A rate-limit /
session wall must lose NOTHING: this file + the run journals + the git tree are sufficient to
resume from any of the three death classes below. **Update this file at every wave launch/close**
(the orchestrator's standing duty); the git history of this file IS the execution timeline.

**Last stamped**: 2026-07-13 (U.W-PERF CLOSED `complete_with_misses`), by the orchestrating session
`daa7c418-d0bc-4d88-913c-27283e6345eb`.

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
| `wf_ca09a7c3-93e` | U.W-ADOPT trigger-UNFIRED arm (dispatch → ≤3 lanes [U-F2 disease law + CI ref-pins + co-land ordering · U-F4/U-F13-producer OWNER-ATTEST annex rows · U-F28/U-F68/U-F77 version-cut sequencing vs both floors] → gate → close) | **LAUNCHED 2026-07-13** post-PERF-close (v5 tag EMPTY at launch; armed gates flip only at the real cut; the version cut stays OWNER-HELD) | `u-w-adopt-wf_ca09a7c3-93e.js` | resume; never unpin/publish from a lane — orchestrator owns the unpin, the owner owns the cut |

**PERF completed**: `wf_c072f8ee-d1e` **CLOSED `complete_with_misses` 2026-07-13** — 3 born-RED
gates flipped to terminal (G-PERF-1 CLS 0.2146→0.0010 · G-PERF-2 dist-gate 32/32 re-anchored ·
G-PERF-4 settle-guard 16/16) + G-PERF-3 the DECIDED LCP escalate (armed-RED, producer-gated, no
gate edit); U-F3 W9 row LANDED in PI-1; close stamp `b54ce7f`.

**Completed runs** (journals retained, no action): `wf_84ed7f23-036` **A11Y (CLOSED
`complete_with_misses`** — all 11 born-RED gates BR-1..BR-11 flipped RED→GREEN [deterministic
headless, no U-F54 annex]; 4 lanes: controls `87b4eca` [U-F25 focus SYSTEM + U-F27 hit-inflation +
`aria-valuetext`] · contrast `6667eb05` [U-F26 rendered-tier accent re-guard, 1.19→4.31; `safeAccent-
AgainstSurface` minted+exported] · modality `7335786` [U-F57 support layer + U-F58 web-modality
decisions] · authed `42608eb` [U-F56 driven-live battery + ErrorBoundary]; npm test 2326, mount
guards 16/16 — **U-F76 mount HELD, visual box UNCHANGED, → UNBLOCKS U.W-PERF**; 2 owner-attested OPEN
[OA-1/OA-2]; RELAY DISPATCHED [BH §A11Y-1..6]; misses booked [dock-icon→U-F12 · boot-drift→LIB/ADOPT];
`audit/w-a11y-close-artefacts.md`) · `wf_5a0823fb-9f1` LIB evidence ·
`wf_dd696346-869` VISUAL census (verdict table `audit/w-visual/census.md`) · `wf_fb4f0284-ad9`
SEC (CLOSED `complete_with_misses`) · `wf_c1769491-04d` DEMO (CLOSED `complete`) ·
`wf_237d5120-d5a` **VISUAL-remediate (CLOSED `complete_with_misses` `79eb278`** — §0.8 whole-header
contraction CURED as REAL box shrink [-96.6px, token step, sticky one-strip]; rhythm token landed
[dead-band half coupled to the U-F5 blob-reseat = ANNEX]; dynamic title + scrollbar wiring; BI relay
dispatched; ANNEX-7 open by U-F54 law) ·
`wf_6c47fe54-fc2` **CANON (CLOSED `complete_with_misses` `26d1392`** — 10/10 G-CANON gates,
14/19 homes landed, 3 hygiene retires DEFERRED-to-safe-moment [U-F51/F52/F53 → CLOSE], 2
owner-decidable BOOKs) ·
`wf_d2caf8d6-1e6` **ORACLE (CLOSED `complete_with_misses` `ca26848`** — 6/6 gate rows, CI teeth
wired soft-but-owned, node-24 floor re-anchored, the 3 producer-gated test.fail flips booked) ·
`wf_319ba067-341` **LIB (CLOSED `COMPLETE` build-complete `d40e04c`** — 12 gates/20 legs GREEN,
suite 2312/2312, `proof:lib-correctness` in `test:dist`, publish packet `audit/w-lib/
publish-packet.md` [MAJOR, 4.0.0 recommended, OWNER-DECIDES], BH relay
`valuejs-inbox-2026-07-13-u-w-lib-invariant.md` at their BI inbox).

## §3 Paths (absolute; survive session death)

- **Scripts**: `~/.claude/projects/-Users-mkbabb-Programming-value-js/daa7c418-d0bc-4d88-913c-27283e6345eb/workflows/scripts/`
- **Journals**: `~/.claude/projects/-Users-mkbabb-Programming-value-js/daa7c418-d0bc-4d88-913c-27283e6345eb/subagents/workflows/<runId>/journal.jsonl`
- **Memory**: `~/.claude/projects/-Users-mkbabb-Programming-value-js/memory/tranche-r-developed.md` (the ▶▶▶ block)

## §4 The DAG cursor + standing state

- **Closed (8)**: DEMO (`complete`) · SEC (`complete_with_misses`) · LIB (`COMPLETE`
  build-complete) · ORACLE (`complete_with_misses`) · CANON (`complete_with_misses`) ·
  VISUAL (`complete_with_misses`) · A11Y (`complete_with_misses`) · **PERF (`complete_with_misses`,
  2026-07-13** — commits `ca8dbca`·`a16e1f4`·`b3f4f76`·`a0d777d` + close stamp; 3 born-RED gates
  flipped to terminal [G-PERF-1 CLS 0.2146→0.0010 · G-PERF-2 dist-gate re-anchored 32/32, re-probed
  live PASS 2/2 · G-PERF-4 settle-guard 16/16, box `y=199 h=613` unmoved] + **G-PERF-3 the DECIDED LCP
  escalate** [armed-RED, ~4919/5141 ~2×, producer-gated on the unfired 5.0.0 adopt, no gate edit —
  Q14 verbatim]; PERF was the reserve-only TAIL of the U-F76 chain [VISUAL → A11Y → PERF], CLOSED; the
  U-F3 W9 row LANDED in PI-1 by the close scribe; RELAY discharged by citation [communiqué `17e0f522`];
  the RECEIVED A11Y long-session fold acknowledged at `smoke-safari`).
  **Next**: **ADOPT** (trigger-gated — probe `git -C ../glass-ui tag --list 'v5*'` each round, EMPTY at
  stamp; the U-F3 producer payload cut / Pole A rides its BI-acceptance) + **CLOSE last** (zero-drop
  ledger walk · publish presentation · real-GPU annex · the census ANNEX-7 + A11Y OA-1/OA-2 + u-f12
  Pole A/B bracket + **the U-F3 Q14 LCP adjudication — G-PERF-3 ARMED-RED rides to CLOSE** as the
  attested/escalated flag; registry §26 W9's Q14 inherits U-F3/F14/F16 — all to the owner).
- **Substrate**: glass-ui PINNED @ `2e559f7a` (both symlinks → `.claude/worktrees/glass-ui-pinned`;
  record `audit/w-adopt/substrate-pin.md`; UNPIN at the v5 tag). The L17 goo-blob→blob consume
  swap is LANDED (`110b56f`). **Co-land PREVIEW applied 2026-07-13** (`296b8b2`, pushed): the
  U-F34 renames patched UNCOMMITTED into the pinned sandbox src (5 conversions — packet §3's 3
  + `oklabToLinearSRGB`/`oklabToRgb255`, a ref-drift undercount flagged for the ADOPT cut) +
  the keyframes `parseCSSSubValue→parseCSSValues` node_modules copy; pinned dist rebuilt
  (old-names 0, d.ts 773, css audit 111/110/0); gh-pages + typecheck + LIB slate 20/20 GREEN;
  preview state is EPHEMERAL — discarded at unpin, the real migration rides U.W-ADOPT. `:9000`
  RESTORED (full stack via dev.sh, nohup-detached, HTTP 200). Their BI relay commits: `c66b5354`
  (dist breakage) + `9feed5e1` (co-land preview) — LOCAL-ONLY on their `tranche/BI` (no upstream).
- **Ports**: `:9000` = the owner's dev server, NEVER touched. Lane ranges used so far: 8490/8491
  (ceremony e2e) · 8591-8599 (VISUAL census/remediate/gate) · 8600-8650 (SEC) · 8660-8680 (DEMO)
  · 8700-8750 (ORACLE). Lane-unique `VJS_E2E_PORT`/`PERF_PORT` always.
- **Owner-reserved (NEVER proxy; present at the terminal report)**: the U-F29 version-cut /
  npm publish (packet: `audit/w-lib/publish-packet.md` when LIB closes) · the T.W8 HG6 taste
  verdict (`docs/tranches/T/audit/w8-certification/VERDICT-2026-07-12.md` empty stub) · the
  u-f12 Pole A/B bracket · the census ANNEX-OWNER-ATTEST 7-row slate · the **A11Y OA-1** (forced-
  colors/prefers-contrast/reduced-transparency fallback COHERENCE) + **OA-2** (authed+populated
  GESTALT) — operability born-RED GREEN, aesthetic owner-terminal (π under `audit/w-a11y/pi/`).
- **Booked residuals riding to CLOSE**: the quiet-host reactivity e2e re-run (ceremony residual)
  · U-F39/U-F41 prod-attestation legs (SEC) · the App.vue eager-chunk sideEffects reconciliation
  (DEMO book) · the **A11Y dock-icon 2.26:1** on the mid-tint dock chrome → coupled to the **U-F12**
  owner-ruling bracket · the **A11Y e2e specs** (o27/o18-leg/a11y-modality/-slider/-web/-authed) run
  GREEN in CI once the demo-boot adopt-drift (U-F68/U-F34) reconciles → **U.W-LIB/U.W-ADOPT** (proven
  here against a reverted-before-commit shim) · the **producer RELAY halves** (BH §A11Y-1..5) →
  U.W-ADOPT BI-acceptance · the **per-component RTL logical-property audit** → component lanes.

## §5 Standing laws (verbatim-derived; bind every resumed lane)

E-3 no-workarounds gestalt · batches ≤3 per workflow · Fable orchestrates + designs, opus/sonnet
fanout · born-RED honesty (real-GPU/owner frame for GPU visuals — U-F54; never fake-judge) ·
PP-16 close honesty · path-scoped commits + pull-rebase (`--autostash` when the main tree carries
another lane's staged work — and NEVER sweep another lane's staging into your commit; pathspec
commits only) · the BH/BI relay on every glass-ui-touching change (active inbox:
`../glass-ui/docs/tranches/BI/coordination/`, single-file, plain-push-only) · sibling trees
READ-ONLY · probe-parsimony · the terminal StructuredOutput law in every agent prompt · every
commit trailer: `Claude-Session: https://claude.ai/code/session_01XskVMTQAWVgvWQvhiYECgb`.
