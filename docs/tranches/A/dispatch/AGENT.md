# A tranche — agent dispatch template

Dispatch contract for tranche A agents. value.js's first tranche; this template adapts the precept `tranche/AGENT_DISPATCH_TEMPLATE.md` and glass-ui Q's `dispatch/AGENT.md` to value.js.

## Hardened agent git clause (binding, non-negotiable)

NO mutating git. Forbidden for agents in every context:

- `git add` / `git stash` (any form) / `git commit` / `git commit --amend`
- `git checkout <branch>` / `git checkout <path>` / `git switch`
- `git reset` / `git restore` / `git mv` / `git rebase` / `git merge` / `git cherry-pick` / `git revert`
- `git push` / `git pull` / `git fetch --prune`

Allowed (read-only): `git log`, `git diff`, `git show`, `git status`, `git reflog`, `git tag -l`, `git branch -l`, `git remote -v`, `git config --get`, `git ls-files`, `git stash list` (audit-only).

The orchestrator owns the index, working-tree mutation discipline, and all pushes. The precept lessons-learned ledger records six `git stash` recurrences across glass-ui's K→Q span; the rule is absolute for agents. When a build fails, an agent reverts surgically with the Edit tool, never with a state-rewinding git command.

## Cross-repo boundary

Per `coordination/Q.md §2`: A agents write **value.js only**. No agent edits `glass-ui/` or `keyframes.js/` — those are read-only at the SHAs recorded in `coordination/Q.md`. A glass-ui or keyframes.js need is filed in `coordination/Q.md §3`, not written.

## Zero deferral (invariant A5)

Every `research/Aa..Ae` finding lands in a wave, retires with recorded rationale, or has a named cross-repo destination in `coordination/Q.md`. An agent that finds its wave's scope underspecified escalates to the orchestrator; it does not stub, shadow-API, or "temporarily" defer.

## Runtime-evidence gate (invariant A3)

A wave that changes the demo closes on a Playwright boot probe — at minimum 375×667 / 1280×800 / 1440×900, zero uncaught console errors — not on source grep. An implementation agent validates with `vue-tsc --noEmit` + `npm test`; the orchestrator runs the Playwright probe and the full gate matrix at wave close. Per `docs/instructions/README.md`: source grep is not proof of rendered behavior.

## Worktree isolation

Per the precept orchestration rules: a wave with ≥2 agents writing shared files dispatches with `Agent isolation: "worktree"`; the orchestrator integrates at wave close via `git cherry-pick`, never merge. A.W2, A.W3, A.W4 share `style.css` or `App.vue` across lanes and require worktree isolation. A.W0 and A.W1 have disjoint-enough bounds for a shared tree. Read-only research and audit lanes never need a worktree.

## Build hygiene

NO `npm run build` mid-task when sibling agents run in parallel — the build mutates `dist/`. Agents validate with `vue-tsc` + `npm test`. The orchestrator runs `npm run build` once, at wave close, after all lanes integrate. The `gh-pages` build (post-W0) writes `dist/gh-pages/`; do not run it mid-wave.

## Agent dispatch contract

Each dispatched agent gets: a self-contained prompt, explicit file bounds, a hard gate, the expected artefacts, a return format, and a hard time cap. No broad repo context — specific files only. A prompt over ~700 words means the task is mis-scoped; split it.

## Proof docs

Every dispatched agent authors a proof doc under `docs/tranches/A/audit/<wave>-<lane>-<title>.md` citing the gate evidence — build/test output, the Playwright probe artefact, a deletion proof, or a generated diff. Research agents author under `research/`.

## Hard caps

- Research / audit lane: 25–35 min (the HEADLINE runtime lane gets 35; the live Playwright probe gets 40).
- Implementation lane: 30 min.
- Doc-only lane: 20 min.

## Prose

Agent-authored docs follow the precept `STYLE.md` — declarative and evidence-led, unspaced em-dashes used sparingly, no epanorthosis, no AI-writing signs, contractions allowed. Every claim cites a file:line or an artefact path.
