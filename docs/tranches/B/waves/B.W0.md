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
2. Confirm the working tree matches the audit claims: 25+ SFCs modified per `W5-a11y.md`; `animations.css` carries the global `prefers-reduced-motion` block; `useMetaballRenderer.ts` carries the `tabHidden`/`document.visibilitychange` handler; `GooBlob.vue` `<canvas>` carries `aria-hidden="true"`. If divergent, report and stop (no commit of work the audit docs don't describe).
3. **The 16 modified e2e specs are NOT committed.** The killed W5-C agent's selector-migration edits to `e2e/*.spec.ts` are moot — B.W4 abrogates the entire 16-spec suite (`research/B-e2e-target.md`). Leave the e2e working-tree changes uncommitted; B.W4 deletes the files. Do not commit work that the next wave deletes.
4. Run the W5 gate matrix:
   - `npx vue-tsc --noEmit 2>&1 | grep -c 'error TS'` — record count (expected ~290; the increase from 243 reflects W5-A ARIA additions surfacing strict-prop issues, a separate finding for B.W4).
   - `npx vitest run` — must show 1409+ tests passing (no library regression).
   - Cold-start `npm run dev`, then Playwright probe at 375×667 / 1280×800 / 1440×900 light AND dark. Capture to `audit/W5-playwright/`. (No e2e run — there is no smoke suite yet, and the full suite is about to be abrogated.)
5. Commit W5 as 2 logical commits:
   - `fix(tranche-a/w5): accessibility sweep — ARIA roles, landmarks, SVG-as-button` (the 25+ SFCs).
   - `fix(tranche-a/w5): animation correctness — global reduced-motion + GooBlob tab-hidden` (`animations.css`, `useMetaballRenderer.ts`, `GooBlob.vue`).
6. Add A.W5 close entry to A's `PROGRESS.md` (following the W4 close template); record that the W5-C e2e lane's work is superseded by B.W4's abrogation; update A's wave-log row.
7. Audit doc commit: `docs(tranche-a/w5): W5 close — audit docs + playwright re-probe + PROGRESS`.

**Sub-gate A**: 3 commits land; A's PROGRESS.md W5 entry written and notes the e2e-lane supersession; the W5-A/W5-B working-tree paths are clean (the e2e specs remain modified-uncommitted, deleted at B.W4); cold-start Playwright re-probe captured; vue-tsc count recorded.

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
| A | A's 25+ modified SFCs (commit only — no further edits); `animations.css`; `useMetaballRenderer.ts`; `GooBlob.vue`; `docs/tranches/A/PROGRESS.md`; `docs/tranches/A/audit/W5-playwright/` (new screenshots). The 16 modified `e2e/*.spec.ts` are deliberately left uncommitted — B.W4 deletes them. |
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
- `docs(tranche-a/w5): W5 close …` (Lane A) — notes the e2e lane superseded by B.W4 abrogation
- `docs(tranche-a/w6): formal re-scope …` (Lane B) OR `refactor(tranche-a/w6): …` (executed path)
- `docs(tranche-a/w7-close): A close — FINAL.md …` (Lane C)

## Dependencies

- Depends on: B open.
- Blocks: every other B wave. Closing A first is invariant B1.
