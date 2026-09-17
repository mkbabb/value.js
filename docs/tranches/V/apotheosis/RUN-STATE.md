# THE APOTHEOSIS PROGRAM — COMPLETE (2026-07-19 ~23:0x)

> **EXECUTION HOLD (owner, 2026-07-20):** tranche execution does NOT begin from this
> session — the owner compacts first, then begins. Standing model law for execution:
> **Fable sparingly — only the most complex and design-forward passes**; Opus (or
> below) for everything else, declared per spawn, `model_served`-verified.
> Post-convergence audit state: fleet ingestion audited (letters FOLDED as INBOX
> I-13/I-14 with SHA receipts; 114/114 crosswalk; registry 190→193 = +V16R/+G00I/+C00P;
> fleet self-declares ZERO convergence credit, closure order 7 steps); three audit
> seats' reports land in `post-convergence/` (delta-census, ruling-fidelity,
> convergence-adjudication).

**COMPLETE.** Run `wf_18de581c-cf8`: 48/48 seats, 0 errors, ~6.76M subagent tokens,
~67 min of fleet time across three stints. Model routing verified per-seat via
`model_served` receipts: mechanical seats `claude-opus-4-8`, all design/skeptic/
adjudication/union seats `claude-fable-5` (the C17 law, enforced after the
`CLAUDE_CODE_SUBAGENT_MODEL=fable` override was found and removed — see the run
history below).

**READ FIRST: `armC/UNION-APOTHEOSIS.md`** — the verdict of verdicts, the 72-row
union delta (17 ADOPT · 30 AMEND · 13 ADD · 12 KILL) over the 190-wave Codex
backbone folding the 61-row Fable registry, the 20-row repair ledger, and the
22-row merged owner docket. Companions: `armA/VERDICT.md` (the graded audit),
`armB/{FABLE-FORMATION,WAVE-REGISTRY,OWNER-DOCKET}.md` (the independent formation),
`armC/union-*.md` (the three domain unions). The relay letter to the Codex fleet
is landed at `../coordination/value-inbox-2026-07-19-union-apotheosis-relay.md`
(their Step-0 sweep rows it; INBOX.md deliberately left to the fleet to avoid
concurrent writes).

This directory is the durable landing of the Fable-side parallel program: audit the
Codex-begotten V-next formation against the edicts · independent Fable formation ·
union apotheosis. It is ISOLATED from the active Codex fleet's workspace
(`docs/tranches/V/vnext/` — never written by this program). Historical pause-state
notes below are retained as the program's honest history.

## What this program is (three arms, one workflow)

- **Arm A — edict audit** of the frozen Codex formation snapshot: inventory + edict
  matrix (letters L1/L2 + `CONVERSATION-ADDENDA.md`), then 8 compliance lenses
  (packets zero-silent-drop, parse, color, structure, frontend/BREATH-OF-LIFE,
  api/routing, return-contract/process, apparatus-bloat), then a Fable verdict.
- **Arm B — independent formation**, firewalled from the Codex corpus: 8 truth sweeps
  (value lib/demo, kf lib/demo, api+fourier, parse-that assessment, kf-session
  backtrace, live probe) → 6 Fable program architects → full thrice loop (2 skeptics
  + 1 adjudicator each) → assembly (FABLE-FORMATION / WAVE-REGISTRY / OWNER-DOCKET).
- **Arm C — union**: 3 domain unioners + the final `UNION-APOTHEOSIS.md` (graded
  correct/wrong/partial for BOTH formations + the union wave-delta + a draft
  coordination letter for the Codex fleet).

Model law: Opus = mechanical sweeps/inventory; Fable = design, skepticism,
adjudication; every seat reports `model_served` (the P0.1 verify-the-tier law).

## Run history

| Run | Outcome |
|---|---|
| `wf_4cbcfedf-f1f` (v1) | **args-injection failure**: every interpolated path rendered literal `undefined`; Arm B crashed silently pre-spawn; 2 seats completed off-path (their products salvaged below as drafts); 8 lens audits killed mid-flight on stop. |
| `wf_26596b86-bc4` (v2) | Hardened script (paths hardcoded, interpolation tripwire, loud arm guards). Killed by the usage limit; 10 seats in flight, **0 journaled results**. |
| `wf_5ee3daab-c4f` (v2) | Relaunch after limit reset. **PAUSED (TaskStop)** with 10 first-batch seats mid-flight (A:inventory, A:edict-matrix, 8× B sweeps), **0 journaled results** — no cacheable prefix. |

## Durable contents

- `v-apotheosis-workflow.js` — the v2 workflow script (authoritative; paths hardcoded).
- `CONVERSATION-ADDENDA.md` — the owner's 2026-07-19 conversation edicts C1–C23
  (binding canon alongside the two seed letters; addenda WIN where they tighten).
- `snapshot-vnext/` (181 files) + `snapshot-manifest.txt` — the Codex formation
  FROZEN 2026-07-19 19:04, the audit target. Unique evidence: the live `vnext/` is
  untracked and still evolving under the Codex fleet.
- `armA/edict-matrix-draft.md` — v1 salvage (Fable): letter-derived edict matrix;
  LACKS the conversation addenda (it substituted the Codex tree's OWNER-AMENDMENTS.md);
  the v2 edict seat verifies + extends it, and cross-checks OWNER-AMENDMENTS.md vs
  CONVERSATION-ADDENDA.md as a fidelity probe.
- `armA/inventory-draft-v1.md` — v1 salvage (Fable): Codex-formation inventory,
  caveat: read the LIVE tree (its designated snapshot path was the `undefined` bug),
  so treat as draft only.
- `armB/*-owner*.txt`, `armB/extract_owner.py`, `filter*.py` — the C18 backtrace
  working set: owner-message extractions from the two audited kf session transcripts
  (`10dfa2b9…` and `58f34108…` under
  `~/.claude/projects/-Users-mkbabb-Programming-keyframes-js/`).
- `armB/madge-src.json` — the value.js src DAG derivation (partial start).
- `probe/01–06 *.png` — live-probe captures (value desktop 1440×900 ×3; value mobile
  390×844 ×3 incl. kebab-menu and gradient/easing views → C2/C3 evidence). kf-demo
  captures were not yet taken. `probe/owner-*.txt` are duplicate extractions kept
  for fidelity.

No `sweep-*.md` / `audit-*.md` final reports exist yet — every seat was killed or
paused before its write-out. The in-flight partial transcripts live under
`~/.claude/projects/-Users-mkbabb-Programming-value-js/9e7dadd0-…/subagents/workflows/wf_5ee3daab-c4f/`.

## Resume recipe

1. The script's working root is HARDCODED: `S = /Users/mkbabb/.claude/jobs/9e7dadd0/tmp/apotheosis`.
   If that job dir still exists, resume directly. If the job was deleted, first
   restore: `rsync -a docs/tranches/V/apotheosis/ /Users/mkbabb/.claude/jobs/9e7dadd0/tmp/apotheosis/`
   (or edit `S` in the script to a new shared, non-sandboxed root and mirror this dir there).
2. Relaunch: `Workflow({scriptPath: "<this dir>/v-apotheosis-workflow.js"})` — a fresh
   run re-runs all seats (nothing was journaled, so `resumeFromRunId: "wf_5ee3daab-c4f"`
   buys nothing). Seats re-derive quickly given the staged working set.
3. Re-freeze the snapshot first if audit freshness matters (the Codex fleet has kept
   writing since 19:04): re-copy `docs/tranches/V/vnext/` over `snapshot-vnext/` and
   refresh the manifest — the audit then grades the newer state.
4. Isolation laws remain absolute: never write `docs/tranches/V/vnext/`; never touch
   `scripts/dev/dev.sh`; never load `r1-opus-refuted/`; Arm B stays firewalled from
   the Codex corpus and `armA/`.

## Final landing plan (unchanged)

On completion: `armA/VERDICT.md`, `armB/{FABLE-FORMATION,WAVE-REGISTRY,OWNER-DOCKET}.md`,
`armC/UNION-APOTHEOSIS.md` land here; the draft coordination letter for the Codex
fleet is then hand-carried by the root session into `docs/tranches/V/coordination/`
(a new letter file, never an edit of fleet-owned docs).
