# S.W9 — CLOSE

**Name**: W9 — Close (verification act, not paperwork act)
**Opens after**: S.W7 (and every non-trigger-gated wave closed; S.W8's book state is recorded as-is).
**Spec of record**: `audit/SYNTHESIS.md §3.11` · the `S.md §10` zero-drop ledger · the `S.md §7` books table · §6.2 budget re-run · the precepts close discipline (`SPEC.md`).
**On any divergence between this wave doc and its spec-of-record sections, the spec wins** (the S.md charter clause, restated here so the rule is self-evident in-file).
**Agents**: 1–2 serial (reconciliation + the spec-status recheck lane).
**Hard gate**: composite (§Hard gate) — every §10 ledger row reconciled with evidence cites · every open book re-verified against the live world · repo-wide sweeps re-run · FINAL.md authored · master merged + tagged.
**Status**: PENDING-RATIFICATION.

---

## §Goal criterion

The tranche's own gates are proven to hold against the live tree — the close is a verification
act, not a paperwork act. (SYNTHESIS §3.11 Goal, verbatim.)

## §Completion criterion

Every §10 ledger row reconciled with evidence cites; every open book (`S.md §7`) re-verified
against the live world; the repo-wide sweeps (caps, legacy, `as any`) re-run; FINAL.md authored;
master merged + tagged. (SYNTHESIS §3.11 Completion, verbatim.)

---

## §Scope (SYNTHESIS §3.11, transcribed)

1. **FINAL.md** — reconciles the `S.md §10` ledger row-by-row (gates-pass with goal-unmet
   closes `complete_with_misses`, not `complete`); reconciles each wave's goal criterion
   against the landed work.
2. **ι integrity sweep** — commit-scope honesty, no unscoped sweeps (the R 2.0.1 `4963f33`
   blemish class).
3. **π tranche-level reconciliation** — the standing π matrix reviewed end-to-end by a
   NON-authoring agent; the wave archives cross-checked against live close-state.
4. **The §6.2 budget re-run** — all rows re-measured on the built bundle at close; any drift
   from the W3-close numbers recorded, never silently reconciled.
5. **The spec-status recheck lane** — R-10 `if()`/`random()`, R8-23 timeline longhands, R-5
   rec2100 (the "~late-2026" guess is mid-window and was never live-verified).
6. **Book re-verification** — every `S.md §7` row probed against the live world (the census
   pattern becomes a close-gate step; S lesson 4 — books discharge silently unless someone
   re-checks): X1/X2 re-probed; the un-pin/adopt state recorded; fired-but-unnoticed triggers
   hunted.
7. **Repo-wide sweeps re-run** — the caps (src per the census verdict; `demo/` ≤400 LoC),
   legacy grep, `as any` ledger — repo-wide, not touched-surfaces-only (traceability §9.4;
   S lesson 2).
8. **Relay/letter dispositions recorded** — GLASSUI-S-ASKS per-item status; PT-E reply state;
   the KF courtesy record; motion-inventory docs patch (the W9 row from
   motion-animation-inventory).
9. **Master merge + tag** — the tranche-close ceremony per `docs/RELEASE.md`; the S books table
   handed to the successor.

## §Triumvirate dispatch

Mandatory on:

- a ledger row that cannot reconcile (neither landed nor booked/killed with rationale — a
  zero-drop violation is a synthesis-integrity event, not a footnote);
- a budget row regressed since W3 close (root-cause before merge, or record
  `complete_with_misses` honestly);
- a book found silently discharged/fired (record the drift + the miss window — S lesson 4);
- the third iteration of any merge-conflict resolution loop.

## §File bounds · disjointness · worktrees

| Surface | Files | Access |
|---|---|---|
| close docs | `docs/tranches/S/FINAL.md` (create) · `PROGRESS.md` · `S.md` (status stamps) · CLAUDE.md doc-truth | create/modify |
| sweeps + re-runs | read-only probes + the e2e/budget suites | probe |
| ceremony | master merge + annotated tag (git ops) | git-op |

Do NOT touch: `src/`, `demo/`, `api/` (any defect found here routes to a fix lane with its own
row — the close wave does not silently patch), `../glass-ui`, `docs/precepts/`.

## §Hard gate (verbatim-faithful to SYNTHESIS §3.11)

1. FINAL.md exists; the §10 ledger reconciles row-by-row with evidence cites; per-wave
   goal-vs-landed reconciliation recorded (honest `complete` / `complete_with_misses` verdicts).
2. Every `S.md §7` book row re-verified with a dated probe record.
3. Repo-wide sweeps green or ledgered: caps (census-verdict-governed for src; ≤400 `demo/`),
   legacy grep, `as any`/`as unknown as` ledger regenerated.
4. The §6.2 budgets re-run green on the built bundle (or drift recorded on the row).
5. The S oracle slate green at close: smoke-safari in CI · hard Lighthouse · frame budgets ·
   the π matrix reviewed by a NON-authoring agent.
6. 2.1.0 published + tagged (verified standing from W1); master merged + tranche tag pushed;
   clean `git status`; `git worktree list` = main tree only.
7. `npm run lint` 0 · `npm run typecheck` 0 · `npm test` green · e2e 5-project green ·
   `npm run gh-pages` ✓ built.

## §No-workaround prohibitions (binding)

- **No silent reconciliation** of any count/number drift — both figures on the record (R
  lesson 3).
- **No paperwork close over a red probe** — gates-pass-goal-unmet is `complete_with_misses`,
  named as such.

## §Format + lint cadence

`npm run lint` + `npm run typecheck` + `npm test` + `npx playwright test` on the merged tree
before the ceremony; `git diff --check` on every docs commit.

## §Verification artefacts

Saved at close: FINAL.md; the ledger reconciliation table; the book re-verification records
(dated probes); the sweep outputs; the budget re-run table; the π tranche-level review record;
the merge/tag hashes; `git status --porcelain` (empty) + `git worktree list` captures.

## §Commit plan

FINAL.md commit (with body); the doc-truth/status commits; the merge commit (--no-ff, per the
R ceremony) + annotated `tranche-s-close` tag; a final PROGRESS.md status commit.

## §Dependencies

- **Depends on**: S.W7 (round 4) + all closed non-trigger waves; S.W8's state recorded as-is
  (an unfired trigger hands the book to the successor — books never gates).
- **Blocks**: the successor tranche's open.

## §BOOKS opened/serviced (books-never-gates)

Every open book re-verified + handed to the successor via the FINAL.md books table (the S table
supersedes R FINAL §5; the successor's supersedes this one).

## §Evidence packets consumed

The full wave-close artefact set (W0–W8) · `S.md §10` ledger · `S.md §7` books ·
`audit/SYNTHESIS.md` §6.2/§3.11 · `docs/RELEASE.md` (the publish/close ceremony) ·
`audit/lanes/motion-animation-inventory.md` (the W9 docs-patch row) ·
`audit/lanes/deferred-books-census.md` (the recheck-lane pattern).

## §Hand-off

The successor tranche opens on: the handed books table (incl. any unfired W8 trigger, X1/X2
residuals, the Q2 `logerp` 3.0.0 book), the process-lessons ledger (`S.md §13`), and the
standing oracle slate (smoke-safari CI, hard Lighthouse, frame budgets, the π matrix) as its
inherited floor.
