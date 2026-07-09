# T.W9 — CLOSE

**Name**: W9 — Close (a verification act, not a paperwork act — the S close machinery inherited
unchanged, F19)
**Opens after**: T.W8 (and every non-trigger-gated wave closed; T.W7's book state is recorded
as-is — an unfired trigger hands the book to the successor, the R→S→T precedent).
**Spec of record**: `audit/SYNTHESIS.md §3` (the T.W9 block) · SYNTHESIS §1 (the finding→item
map = the zero-drop ledger) + §7 (the fold table) · `T.md §7` (the BOOKS table) · SYNTHESIS §6.2
(the budget re-run + the Q14 disposition) · `S/FINAL.md §7` (the X1/X2 residuals, restated
verbatim) · `audit/lanes/t-ci-lighthouse-record.md` (**the now-fixed CI/deploy chain of
record**) · `docs/RELEASE.md` (the publish/close ceremony) · the precepts close discipline.
**On any divergence between this wave doc and its spec-of-record sections, the spec wins** (the
T.md charter clause, restated here so the rule is self-evident in-file; `MANDATE-2026-07-06.md §0`
+ addenda win over both).
**Agents**: 1–2 serial (reconciliation + the spec-status recheck lane; the evidence
reconciliation by a NON-authoring agent).
**Hard gate**: composite (§Hard gate) — the zero-drop ledger walked with evidence cites · every
open book re-probed LIVE · repo-wide sweeps re-run · the §6.2 budgets re-measured · FINAL.md
authored · master merged + tagged through the now-fixed chain · **PP-16**:
gates-pass-goal-unmet closes `complete_with_misses`.
**Status**: AUTHORED — development only; the dispatch gate is CLOSED until the `T.md §12` owner
ratification (E-6). Post-ratification: PENDING, gated on T.W8 + all non-trigger waves closed.

---

## §Goal criterion

The tranche's own gates are proven to hold against the live tree — the close is a verification
act, not a paperwork act. (The S.W9 goal, inherited unchanged per SYNTHESIS §3 T.W9.)

## §Completion criterion

`FINAL.md` reconciles the SYNTHESIS §1 finding→item map row-by-row, zero drops (T-1..T-29 + the
fleet finds + the E-4 fold table); all wave gates evidence-backed; the O-1..O-25 slate at close
(honest EXPECTED-REDs with packet cites); budgets per the Q14 adjudication; every book re-probed
live; the doc rewrites landed; X1/X2 restated verbatim with firing ops; master merged + tagged.
The PP-16 naming law binds. (`T.md` Completion criterion + SYNTHESIS §3 T.W9, composed.)

---

## §Scope (SYNTHESIS §3 T.W9, transcribed — the S close machinery inherited unchanged)

1. **FINAL.md** — reconciles the finding→item map (SYNTHESIS §1.2) + the E-4 fold table
   (SYNTHESIS §7) row-by-row: every T-#/fleet/deferred row landed at its root or explicitly
   booked/killed with rationale; per-wave goal-vs-landed reconciliation (honest `complete` /
   `complete_with_misses` verdicts); the E-5 recap closed (every mandate-§0 verbatim line
   addressed-or-booked, riding the W8 package's owner-line index); the spec-retirement ledger
   (§4) re-affirmed — nothing restored.
2. **ι integrity sweep** — commit-scope honesty across the tranche; no unscoped sweeps.
3. **Evidence tranche-level reconciliation** — the standing visual/oracle evidence reviewed
   end-to-end by a NON-authoring agent; the wave archives + the W8 certification package
   cross-checked against live close-state.
4. **The §6.2 budget re-run** — all rows re-measured on the built bundle at close; the **Q14
   adjudication encoded** (the owner's budget/preset ruling from W8/W9 lands here either way —
   red rows carried honestly if unadjudicated); the PI-1 per-wave Lighthouse delta ledger
   closed out with a final run; RP-2's state recorded (cleared at W7, or the third-tranche
   carry named).
5. **The spec-status recheck lane** — the CHRONIC cross-repo set: CH-10 · CH-13 · R8-23 · R-5 ·
   R-10 · FN-7 · kf `resolveEasing` — each probed for a fired-but-unnoticed trigger
   (re-verified none at synthesis; the close re-checks).
6. **Book re-verification** — every `T.md §7` row (inherited §7.1 + T-minted §7.2) probed
   against the live world with a dated record; fired-but-unnoticed triggers hunted (S lesson
   4); the W7 adopt state recorded as-is; **X1/X2 restated VERBATIM with their firing ops**
   (from `S/FINAL.md §7`) — X1 (prod api deploy; publish/unpublish 404-broken for real users;
   O-25 stands guard) is on its 2nd carry: **never a silent 3rd re-book** — a T close that
   still carries X1 names it in FINAL.md §misses.
7. **Repo-wide sweeps re-run** — the caps (post-E-1 tree: `demo/` ≤400 · `api/` ≤350 · src
   cohesion-ledger), legacy grep (the E-3 named set), the `as any`/`as unknown as` ledger
   REGENERATED (the counts are regenerable, never hardcoded) — repo-wide, not
   touched-surfaces-only (PP-8; S lesson 2).
8. **Doc rewrites, now unblocked** (post-E-1; DOC F6/F7 + the W0-4 remainder):
   **demo/CLAUDE.md + api/CLAUDE.md FULL rewrites at the pattern level** (documents describing
   the colocated tree's laws, not stale file lists); the api rewrite **reconciles TA-6's
   26-vs-27 index count** (both figures on the record); **root CLAUDE.md's src Structure
   collapses to module-boundary contracts** (the ~30-file undercount dies by construction —
   contracts, not inventories); DESIGN.md gains the T facilities (the ladder, the ink-on-tier
   contract, the motion table, the C3 exception ledger); doc-vs-tree spot re-verify.
9. **Letter/packet dispositions recorded** — `GLASSUI-T-ASKS.md` per-packet status (P1–P10 +
   KF), the L8 escalation outcome, the W7 walk record (or the unfired hand-off).
10. **Master merge + tag ceremony** per `docs/RELEASE.md` — **riding the NOW-FIXED CI/deploy
    chain** (t-ci-lighthouse-record: the five-layer peel `be0a703`→`29ea8ac`→`fcd4273`→
    `80c5888`→`0441aba`; deploy-pages ships **Production** on `--branch=master` — the
    false-success Preview footgun is dead). The close VERIFIES the deployed lineage, never
    assumes it: the Production deployment (Environment=Production, branch=master) carries the
    close sha's assets, confirmed live (**O-25** green against the deployed artifact). If
    budgets remain red per Q14, the designed `workflow_dispatch` manual lane ships the close —
    recorded, with the auto-deploy resumption condition named (CI green). No gate weakened to
    ship (the S precedent).
11. **The T books table** authored in FINAL.md §5 (supersedes `S/FINAL.md §5` as the live
    routing — S's record is closed history) and handed to the successor.

## §Triumvirate dispatch

Mandatory on:

- a ledger row that cannot reconcile (neither landed nor booked/killed with rationale — a
  zero-drop violation is a synthesis-integrity event, not a footnote);
- a budget row regressed since its wave-gate measurement (root-cause before merge, or record
  `complete_with_misses` honestly);
- a book found silently discharged/fired (record the drift + the miss window — S lesson 4);
- a deployed-lineage mismatch at the ceremony (O-25 red = a stale-prod event, halt the tag);
- the third iteration of any merge-conflict resolution loop.

## §File bounds · disjointness · worktrees

| Surface | Files | Access |
|---|---|---|
| close docs | `docs/tranches/T/FINAL.md` (create) · `PROGRESS.md` · `T.md` (status stamps) | create/modify |
| doc rewrites (the item-8 named exception) | `demo/CLAUDE.md` · `api/CLAUDE.md` · root `CLAUDE.md` (src Structure) · `docs/DESIGN.md` | modify |
| sweeps + re-runs | read-only probes + the e2e/budget suites | probe |
| ceremony | master merge + annotated tag (git ops) + the deploy-lineage verification | git-op/probe |

Do NOT touch: `src/`, `demo/` code, `api/` code (any defect found routes to a fix lane with its
own row — the close never silently patches), `../glass-ui`, `../keyframes.js`,
`docs/precepts/`. The CLAUDE.md/DESIGN.md DOCUMENTS above are the one named write exception
(the item-8 rewrite set).

## §Hard gate (verbatim-faithful to SYNTHESIS §3 T.W9 + the inherited S.W9 gate)

1. FINAL.md exists; the finding→item map + fold table reconcile row-by-row with evidence cites;
   per-wave goal-vs-landed verdicts recorded (honest `complete` / `complete_with_misses` — the
   PP-16 naming law).
2. Every `T.md §7` book row re-verified with a dated probe record; X1/X2 restated verbatim with
   firing ops (X1's carry state NAMED, never silent).
3. Repo-wide sweeps green or ledgered: caps (post-E-1), legacy grep, the as-any ledger
   regenerated.
4. The §6.2 budgets re-run on the built bundle (Q14 adjudication encoded; drift recorded on the
   row, never silently reconciled); the final Lighthouse delta appended.
5. The oracle slate at close: O-1..O-25 green or honest EXPECTED-RED with cites; the evidence
   reconciliation by a NON-authoring agent; **O-25 green against the LIVE deployment**.
6. The spec-status recheck records (CH/R8/R/FN-7/kf rows, dated).
7. Master merged (`--no-ff`, the R ceremony) + annotated `tranche-t-close` tag pushed; the
   Production deploy lineage verified (or the manual-lane record + resumption condition); clean
   `git status`; `git worktree list` = main tree only.
8. `npm run lint` 0 · `npm run typecheck` 0 · `npm test` green · e2e 5-project green ·
   `npm run gh-pages` ✓ built; exact suite counts recorded in FINAL.md (the wave-gate doc
   carries the authoritative numbers — CLAUDE.md's standing law).

## §No-workaround prohibitions (binding)

- **No silent reconciliation** of any count/number drift — both figures on the record (the
  TA-6 26-vs-27 rule generalized; R lesson 3).
- **No paperwork close over a red probe** — gates-pass-goal-unmet is `complete_with_misses`,
  named as such (PP-16).
- **No gate weakened to ship** — the deploy rides the designed manual lane if CI is honestly
  red, recorded (the S-close precedent; the chain's false-success class is dead and stays dead).
- **No doc rewrite that re-inventories** — the src Structure block becomes contracts, not a
  fresh file list that drifts by the next wave.

## §Format + lint cadence

`npm run lint` + `npm run typecheck` + `npm test` + `npx playwright test` on the merged tree
before the ceremony; `git diff --check` on every docs commit.

## §Verification artefacts

Saved at close: FINAL.md; the ledger reconciliation table; the book re-verification records
(dated probes); the sweep outputs; the budget re-run + Q14 encoding; the final Lighthouse delta;
the evidence-reconciliation record; the deploy-lineage verification (deployment id +
environment + asset hashes vs the close sha); the merge/tag hashes; `git status --porcelain`
(empty) + `git worktree list` captures.

## §Commit plan

FINAL.md commit (with body); the doc-rewrite commits (demo/api/root CLAUDE.md + DESIGN.md,
each scoped); the status-stamp commits; the merge commit (`--no-ff`) + annotated
`tranche-t-close` tag; a final PROGRESS.md status commit.

## §Dependencies

- **Depends on**: T.W8 (the owner's verdict + the package) + all closed non-trigger waves;
  T.W7's state recorded as-is (books never gates).
- **Blocks**: the successor tranche's open.

## §BOOKS opened/serviced (books-never-gates)

Every open book re-verified + handed to the successor via the FINAL.md §5 books table (the T
table supersedes `S/FINAL.md §5`; the successor's supersedes this one). Standing candidates for
the hand-off (named now so the close hunts them): the W7 trigger if unfired (3rd carry, named) ·
X1/X2 (maintainer ops) · any PKT/P-packet row undelivered at close · any W8-booked remediation
row · the DORMANT set (`usePaletteStore` migration, `Color.try()`, S.H3 Pratt, `easing.ts` @643
watch).

## §Evidence packets consumed

The full wave-close artefact set (T.W0–T.W8) · SYNTHESIS §1/§6.2/§7 · `T.md §7` ·
`S/FINAL.md §5/§7` (the inherited books + the X1/X2 verbatim source) ·
`audit/lanes/t-ci-lighthouse-record.md` (the chain of record + the run-of-record figures) ·
`audit/lanes/t-deferred-census.md` (the recheck-lane pattern) · `audit/lanes/t-docs-truth.md`
(the rewrite targets) · `docs/RELEASE.md`.

## §Hand-off

The successor tranche opens on: the handed FINAL.md §5 books table, the process-lessons ledger
(`T.md §9`, extended with any close-minted lessons), the standing oracle slate (O-1..O-25 as
close-state, incl. the census/population classes T minted), the W8 certification package as the
taste baseline, and the now-fixed CI/deploy chain as its inherited floor.
