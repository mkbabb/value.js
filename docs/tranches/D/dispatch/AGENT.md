# D tranche — agent dispatch template

Inherits B's hardened dispatch contract (`docs/tranches/B/dispatch/AGENT.md`); the deltas for D are at §"What's new in D" at the bottom.

## Hardened agent git clause (binding, non-negotiable)

NO mutating git. Forbidden for agents in every context:

- `git add` / `git stash` (any form) / `git commit` / `git commit --amend`
- `git checkout <branch>` / `git checkout <path>` / `git switch`
- `git reset` / `git restore` / `git mv` / `git rebase` / `git merge` / `git cherry-pick` / `git revert`
- `git push` / `git pull` / `git fetch --prune`

Allowed (read-only): `git log`, `git diff`, `git show`, `git status`, `git reflog`, `git tag -l`, `git branch -l`, `git remote -v`, `git config --get`, `git ls-files`, `git stash list` (audit-only).

The orchestrator owns the index. When a build fails, an agent reverts surgically with the Edit tool, never with a state-rewinding git command.

## Cross-repo boundary

D agents write **value.js only**. No agent edits `glass-ui/` or `keyframes.js/` — those are read-only at the SHAs recorded in `coordination/Q.md`. A glass-ui or keyframes.js need is FILED in `coordination/Q.md §3`/`§9`, not written.

## Zero deferral (invariant D5)

Every `research/Da..Dh` finding lands in a wave, retires with recorded rationale, or has a named cross-repo destination in `coordination/Q.md`. An agent that finds its wave's scope underspecified escalates to the orchestrator; it does not stub, shadow-API, or "temporarily" defer.

## Runtime-evidence gate (invariant D4)

A wave that changes the demo closes on a Playwright probe; a wave that changes only `src/` or only `api/` closes on the relevant build/test gate plus a smaller probe. An implementation agent validates with `vue-tsc --noEmit` + `npm test` + `npm run test:e2e -- --project=smoke` (and after D.W5: `--project=smoke-admin` / `--project=smoke-mobile` where relevant); the orchestrator runs the Playwright probe and the full gate matrix at wave close.

## Fail-explicit (invariant D3 — new in D)

The user's D-opening directive binds: "no silent or graceful handling unless befitting." For the backend wave (D.W2) especially: every silent-fallback site identified in `research/Db-backend-legacy.md §2` is excised OR converted to an explicit `throw new HTTPException(…)`/`error(…)` — never `?? null`, never `try {} catch {}`, never `console.warn` and continue. Where graceful is genuinely befitting (e.g. the audit-write best-effort), the agent records the explicit rationale in the change.

## Worktree isolation

A wave with ≥2 agents writing shared files dispatches with `Agent isolation: "worktree"`; the orchestrator integrates at wave close via `git cherry-pick`. D's waves are mostly file-disjoint (D.W2 backend vs D.W3 frontend); read-only research and audit lanes never need a worktree.

## E2e gate

Inherits B.W3's role/label-only invariant for smoke specs. D.W5 expands the suite (3 → ~20) but **the invariants STAND**: `getByRole`/`getByLabel`/`aria-label` only. NO class selectors, NO `.lucide-*`, NO xpath, NO `page.evaluate()` for interaction, NO `waitForTimeout`. Admin specs mock via `addInitScript` localStorage seeding (per `research/Dg-playwright-coverage.md §2`), NEVER live-login (the W5-C hang root).

## Build hygiene

NO `npm run build` mid-task when sibling agents run in parallel — the build mutates `dist/`. Agents validate with `vue-tsc` + `npm test` + the smoke suite. The orchestrator runs `npm run build` once, at wave close. `npm run build:watch` (D.W1's new script) runs only on explicit orchestrator request.

## Agent dispatch contract

Each dispatched agent gets: a self-contained prompt, explicit file bounds, a hard gate, the expected artefacts, a return format, and a hard time cap. No broad repo context — specific files only. A prompt over ~700 words means the task is mis-scoped; split it.

## Sub-gates

Every wave spec carries an explicit per-lane sub-gate. An agent's prompt cites its sub-gate verbatim. The wave's hard gate is the conjunction of sub-gates plus the Playwright probe (wave-qualified).

## Proof docs

Every dispatched agent authors a proof doc under `docs/tranches/D/audit/<wave>-<lane>-<title>.md` citing the gate evidence. Research agents author under `research/`.

## Hard caps

- Research / audit lane: 25–35 min (the HEADLINE close audit gets 35).
- Implementation lane: 30 min (D.W2 backend lanes may need 40 — the backend wave is the heaviest).
- Doc-only lane: 20 min.

## Prose

Agent-authored docs follow the precept `STYLE.md` — declarative and evidence-led, unspaced em-dashes used sparingly, no epanorthosis, no AI-writing signs, contractions allowed. Every claim cites a file:line or an artefact path.

## What's new in D (vs B's dispatch)

1. **Fail-explicit invariant (D3)** — codified above. Binds D.W2 in particular.
2. **Contract-v2** — D.W1 ships value.js's compliance. D.W0 advances the precept submodule to `68d9b20`. After D.W1, the dev demo resolves value.js via `default` (not `development`); agents in later waves must not re-introduce a `development` condition or a `dist/` hard alias.
3. **Expanded e2e suite** — D.W5 grows smoke from 3 to ~20 specs across `smoke` / `smoke-admin` / `smoke-mobile` projects. Wave gates after D.W5 run the appropriate subset.
4. **Backend lane in scope** — D.W2 is the first tranche-D wave that writes `api/`. Per the dispatch invariants above, NO god modules, fail-explicit, service/repository layer, zod validation pipeline.
5. **A wholesale `demo/CLAUDE.md` reconcile** is routed to D.W3 / D.W6's doc-drift sweep — B.W4 only made the genuinely B-introduced fixes; D owns the wholesale.
