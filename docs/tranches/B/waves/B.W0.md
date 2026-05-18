# B.W0 HEADLINE — Close A

**Opens after**: B open.
**Agents**: 3 lanes — A-ratify (commit W5), A.W6-disposition (execute or re-scope), A.W7-close-ceremony (A's FINAL.md). Lanes are sequential — A.W6 cannot dispose until A.W5 is committed; A.W7 cannot close until A.W6 is resolved.
**Hard gate**: see §"Hard gate" below.
**Status**: planned.

## Scope

B does not begin its own structural work until A is honestly closed. A is functionally complete at master HEAD `191d66a` for W0–W4 and has uncommitted work for W5 (30+ SFCs, 2 untracked audit docs, 16 modified e2e specs) and unrun status for W6 (conditional on glass-ui) and W7 (close). Closing A is invariant B1.

### Lane A — A.W5 ratify + commit

1. Read the working-tree state. Sources:
   - `docs/tranches/A/audit/W5-a11y.md` (untracked)
   - `docs/tranches/A/audit/W5-animation.md` (untracked)
   - The W5-C agent's `docs/tranches/A/audit/W5-e2e.md` (may or may not have landed; the running async agent's output file is at `/private/tmp/.../a39ef97baee28faea.output`).
2. Confirm the working tree matches the audit claims: 25+ SFCs modified per `W5-a11y.md`; `animations.css` carries the global `prefers-reduced-motion` block; `useMetaballRenderer.ts` carries the `tabHidden`/`document.visibilitychange` handler; `GooBlob.vue` `<canvas>` carries `aria-hidden="true"`; the 16 e2e specs each carry their migration changes. If divergent, report and stop (no commit of work the audit docs don't describe).
3. Run the W5 gate matrix:
   - `npx vue-tsc --noEmit 2>&1 | grep -c 'error TS'` — record count (expected ~290; the increase from 243 reflects W5-A ARIA additions surfacing strict-prop issues, this is a separate finding for B.W4).
   - `npx vitest run` — must show 1409+ tests passing (no library regression).
   - `npx playwright test --project=smoke` — **note**: smoke project does not yet exist. For W5 close: skip this step (the smoke suite is B.W4). Instead run the full suite for record and accept whatever pass/fail count the W5-C agent achieved; document the result.
   - Cold-start `npm run dev`, then Playwright probe at 375×667 / 1280×800 / 1440×900 light AND dark. Capture to `audit/W5-playwright/`.
4. Commit W5 as 3 logical commits (one per A lane):
   - `fix(tranche-a/w5): accessibility sweep — ARIA roles, landmarks, SVG-as-button` (the 25+ SFCs).
   - `fix(tranche-a/w5): animation correctness — global reduced-motion + GooBlob tab-hidden` (`animations.css`, `useMetaballRenderer.ts`, `GooBlob.vue`).
   - `test(tranche-a/w5): e2e selector migration against post-W4 DOM` (the 16 specs).
5. Add A.W5 close entry to A's `PROGRESS.md` (following the W4 close template); record any e2e specs left un-green with named explanation; update A's wave-log row.
6. Audit doc commit: `docs(tranche-a/w5): W5 close — audit docs + playwright re-probe + PROGRESS`.

**Sub-gate A**: 4 commits land; A's PROGRESS.md W5 entry written; working tree clean for all A-W5 paths; cold-start Playwright re-probe captured; vue-tsc count recorded (not gated — the 290 cluster is B.W4's).

### Lane B — A.W6 disposition

1. Verify glass-ui HEAD against `coordination/Q.md §2`. As of B open (`888d227`), the 8 metaballs/aurora/primitive gaps are NOT shipped. Re-verify in case glass-ui shipped between B open and B.W0 execution.
2. If still not shipped — execute the formal re-scope per `A.md §9`:
   - Write `docs/tranches/A/audit/W6-deferred.md`. Content: the inheritance — `useMetaballRenderer.ts` ~200 deletable lines stay; `WatercolorDot` stays demo-local; AuroraPane stub stays; the picker-derived palette stays static; the duplicated WebGL lifecycle stays. Named destination: glass-ui successor tranche (the glass-ui API additions) + value.js tranche C (the demo-side abstraction once glass-ui ships). Acknowledge precept §10 ("wire before retire") — `useMetaballRenderer` is fully wired, just duplicative; retirement requires glass-ui ship.
   - Update A's `PROGRESS.md` with the W6 disposition entry.
   - Update A's `findings.md` if needed.
   - Commit: `docs(tranche-a/w6): formal re-scope — glass-ui APIs unshipped; routed to named successor`.
3. If glass-ui shipped any of the 8 between B open and now — execute that subset of A.W6 work and document the partial execution. Unlikely.

**Sub-gate B**: A.W6 has a closed state — either executed (commit hash + deletion proof + Playwright re-probe) or formally re-scoped (`audit/W6-deferred.md` + named successor + commit).

### Lane C — A.W7 close ceremony

1. Run the read-only close audit per `A waves/W7.md`. Adapted for B's e2e gate shift: skip the full e2e gate (deferred to nightly); run the smoke suite check (skip if smoke suite not yet stood up — B.W4); replace the full-e2e item in W7's gate with a "the smoke-suite path is now correct in playwright.config" item (or note that B.W4 takes over the e2e shaping).
2. Author 7 read-only lane outputs under `docs/tranches/A/audit/W7-*` (plan-vs-actual, substrate-without-consumer, doc-drift, idiomatic-gestalt, performance, visual-runtime, integrity sweep). Use the close-honesty checklist from `precepts/SPEC §Close`.
3. Run `git reflog` integrity sweep — confirm zero unauthorized agent-attributed mutating git operations across the A span (B open at `191d66a`; B.W0 lane A's 4 commits and lane B's 1 commit should be the only mutations).
4. Write `docs/tranches/A/FINAL.md` — close report citing every wave's commits (the W0..W7 commit list), the gate evidence (audit doc paths), the Playwright artefacts, the disposition of every `research/Aa..Ae` finding (landed / retired-with-rationale / routed). Run the close-honesty checklist.
5. Reconcile A's `PROGRESS.md` — every wave row in the wave-log shows `closed` with commit hashes; the "Open dependencies" section is updated to reflect the B.W0 W6 disposition.
6. Commit: `docs(tranche-a/w7-close): A close — FINAL.md + 7 read-only audit lanes + integrity sweep`.

**Sub-gate C**: `FINAL.md` exists, cites every A commit and audit artefact; the 7 close-audit lane docs exist; A's wave-log shows zero `planned`; integrity sweep clean.

## File bounds

| Lane | Files written |
|---|---|
| A | A's 30+ modified SFCs (commit only — no further edits); `animations.css`; `useMetaballRenderer.ts`; `GooBlob.vue`; 16 e2e specs; `docs/tranches/A/PROGRESS.md`; `docs/tranches/A/audit/W5-playwright/` (new screenshots) |
| B | `docs/tranches/A/audit/W6-deferred.md` (new); `docs/tranches/A/PROGRESS.md` |
| C | `docs/tranches/A/FINAL.md` (new); `docs/tranches/A/audit/W7-*` (7 new docs); `docs/tranches/A/PROGRESS.md` |

B.W0 writes only into `docs/tranches/A/` and the working-tree files A.W5 already modified. No new B-side feature files.

## Hard gate

1. A's wave-log shows zero `planned` rows.
2. `docs/tranches/A/FINAL.md` exists and cites every wave's commits and key audit artefacts.
3. `audit/W6-deferred.md` exists (re-scope path) OR a W6 close commit + Playwright re-probe (executed path).
4. Working tree clean for all A.W5 paths (no uncommitted W5 work remaining).
5. Integrity sweep (`git reflog`, `git stash list`) clean.
6. `npm test` 1409+ passing.
7. `vue-tsc` count recorded (not gated — B.W4 owns the cluster).

## Format and lint cadence

Lint after each lane; gate matrix before B.W0 close.

## Verification artefacts

`docs/tranches/A/FINAL.md`, `docs/tranches/A/audit/W6-deferred.md`, `docs/tranches/A/audit/W7-*` (7 docs), `docs/tranches/A/audit/W5-playwright/` (Playwright re-probe), the 6 B.W0 commit hashes.

## Commit plan

- `fix(tranche-a/w5): accessibility sweep …` (Lane A)
- `fix(tranche-a/w5): animation correctness …` (Lane A)
- `test(tranche-a/w5): e2e selector migration …` (Lane A)
- `docs(tranche-a/w5): W5 close …` (Lane A)
- `docs(tranche-a/w6): formal re-scope …` (Lane B) OR `refactor(tranche-a/w6): …` (executed path)
- `docs(tranche-a/w7-close): A close — FINAL.md …` (Lane C)

## Dependencies

- Depends on: B open.
- Blocks: every other B wave. Closing A first is invariant B1.
