# B tranche — agent dispatch template

Dispatch contract for tranche B agents. Adapts the A dispatch contract (`docs/tranches/A/dispatch/AGENT.md`) to B's scope and the lessons-learned from A.

## Hardened agent git clause (binding, non-negotiable)

NO mutating git. Forbidden for agents in every context:

- `git add` / `git stash` (any form) / `git commit` / `git commit --amend`
- `git checkout <branch>` / `git checkout <path>` / `git switch`
- `git reset` / `git restore` / `git mv` / `git rebase` / `git merge` / `git cherry-pick` / `git revert`
- `git push` / `git pull` / `git fetch --prune`

Allowed (read-only): `git log`, `git diff`, `git show`, `git status`, `git reflog`, `git tag -l`, `git branch -l`, `git remote -v`, `git config --get`, `git ls-files`, `git stash list` (audit-only).

The orchestrator owns the index, working-tree mutation discipline, and all pushes. When a build fails, an agent reverts surgically with the Edit tool, never with a state-rewinding git command.

## Cross-repo boundary

B agents write **value.js only**. No agent edits `glass-ui/` or `keyframes.js/` — those are read-only at the SHAs in `coordination/Q.md`. A glass-ui or keyframes.js need is filed in `coordination/Q.md §3`, not written.

## Zero deferral (invariant B5)

Every `research/Ba..Bζ` finding lands in a wave, retires with recorded rationale, or has a named cross-repo destination in `coordination/Q.md`. An agent that finds its wave's scope underspecified escalates to the orchestrator; it does not stub, shadow-API, or "temporarily" defer.

## Runtime-evidence gate (invariant B4)

A wave that changes the demo closes on a Playwright boot probe — at minimum 375×667 / 1280×800 / 1440×900, zero uncaught console errors — not on source grep. An implementation agent validates with `vue-tsc --noEmit` + `npm test` + `npm run test:e2e -- --project=smoke`; the orchestrator runs the Playwright probe and the full gate matrix at wave close.

## Worktree isolation

Per the precept orchestration rules: a wave with ≥2 agents writing shared files dispatches with `Agent isolation: "worktree"`; the orchestrator integrates at wave close via `git cherry-pick`, never merge. B's waves are smaller and more file-disjoint than A's; most lanes share no files. Read-only research and audit lanes never need a worktree.

## E2e gate (new in B)

The four-lane e2e assay (`research/B-e2e-*`) found the 16-spec Playwright suite is ≈3,510 lines of brittle, largely-superfluous nonsense. **B.W4 deletes all 16 and replaces them with a 3-spec role/label smoke suite in `e2e/smoke/`.**

After B.W4: wave gates run `--project=smoke` only — 3 specs (page-load, color-space-switching, view-switch), all role/label selectors. There is no full suite to run nightly; it was abrogated. The per-wave orchestrator live Playwright probe (3 viewports, console-error + network-2xx check, screenshots to `audit/`) remains the primary wave-gate mechanism. An agent writing a smoke spec uses `getByRole`/`getByLabel` exclusively — no class selectors, no `.lucide-*`, no `page.evaluate()` for interaction, no `waitForTimeout`. This is the explicit fix to the "hung on e2e" wave-shape failure (`research/Bd-w5-audit.md §4`, `B-e2e-target.md`).

## Build hygiene

NO `npm run build` mid-task when sibling agents run in parallel — the build mutates `dist/`. Agents validate with `vue-tsc` + `npm test` + `npm run test:e2e -- --project=smoke`. The orchestrator runs `npm run build` once, at wave close. The `gh-pages` build writes `dist/gh-pages/` (A.W0 fix); do not run it mid-wave.

## Agent dispatch contract

Each dispatched agent gets: a self-contained prompt, explicit file bounds, a hard gate, the expected artefacts, a return format, and a hard time cap. No broad repo context — specific files only. A prompt over ~700 words means the task is mis-scoped; split it.

## Sub-gates (new in B)

Per `HARDEN-6 §2`: every wave spec carries an explicit per-lane sub-gate. An agent's prompt cites its sub-gate verbatim. The wave's hard gate is the conjunction of sub-gates plus the Playwright probe. This was missing in A's waves (HARDEN-6 P3 finding) and is corrected in B.

## Proof docs

Every dispatched agent authors a proof doc under `docs/tranches/B/audit/<wave>-<lane>-<title>.md` citing the gate evidence — build/test output, the Playwright probe artefact, a deletion proof, or a generated diff. Research agents author under `research/`.

## Hard caps

- Research / audit lane: 25–35 min (the HEADLINE close audit gets 35; live Playwright probes get 40).
- Implementation lane: 30 min.
- Doc-only lane: 20 min.

## Prose

Agent-authored docs follow the precept `STYLE.md` — declarative and evidence-led, unspaced em-dashes used sparingly, no epanorthosis, no AI-writing signs, contractions allowed. Every claim cites a file:line or an artefact path.

## What's new in B (vs A's dispatch)

1. **Smoke-suite e2e gate** replaces full-suite gate. Decouples wave closure from cross-cutting e2e maintenance.
2. **Explicit sub-gates per lane** required in wave specs.
3. **A-close discipline in B.W0**: an agent dispatched to commit/close A's W5 work checks the working tree against the actual A audit docs before committing — it does not re-do A's work, it ratifies and gates it. If the W5 working-tree state diverges from `W5-a11y.md` / `W5-animation.md`, the agent reports and stops.
4. **Library audit lane (B.W4) is read-only.** No `src/` edits as part of the audit. WIP disposition decisions are made by the orchestrator after the audit lane returns.
