# E tranche — agent dispatch (deltas vs D)

E inherits **D's hardened dispatch contract verbatim** (`docs/tranches/D/dispatch/AGENT.md`, which itself inherits B's hardened dispatch contract `docs/tranches/B/dispatch/AGENT.md`). This doc carries only the E-specific deltas; the binding clauses (hardened git, cross-repo boundary, runtime-evidence, worktree isolation, build hygiene, sub-gates, proof docs, hard caps, prose) are unchanged.

## E1-E5 — invariants added (`E.md §2`)

- **E1 — Architectural transposition over patching.** Agent prompts MUST cite the structural opportunity in `E-AUDIT-5 §9` (or the architectural rationale) when proposing a non-trivial change. Surface-fixes that ignore a known transposition are rejected at sub-gate.
- **E2 — NO LEGACY CODE.** Agents grep for `@deprecated` / `_legacy` / `Legacy` / `_old` / `Old` / aliased-export-for-transition markers in their lane's file bounds and DELETE them unless the agent's prompt names a transition-period exception. The lone known case (`lerpLegacy`) goes at E.W1 Lane A.
- **E3 — Pipeline parity (api/).** Every route in `api/src/routes/**` MUST obey `validate → authn → authz → service → repository → format → response`. Agents writing to `api/` cite the pipeline in the audit doc; any deviation (worktree-only, planning-only carve-out) requires explicit escalation.
- **E4 — Standing audit cadence.** Every structural change closes with a focused micro-audit (read-only) by a second agent — or the same agent in a second pass. The E.W5 close runs the full 7-lane close ceremony per D.W6 pattern.
- **E5 — Sharpened deferral discipline.** A deferral records (a) the systemic blocker, (b) the smallest unblock action, (c) when re-checked. "Routes to a successor tranche" alone is INSUFFICIENT.

## Worktree-base pinning (lesson from D.W2 Lane B)

Per `findings.md AUD-3.5`: D.W2 Lane B's worktree landed on master (not Lane C HEAD), forcing manual integration. **Codified for E**:

> When dispatching with `isolation: "worktree"`, the agent's prompt MUST cite the target HEAD SHA explicitly. The agent verifies `git log -1 --format=%H HEAD` matches BEFORE doing any work; mismatch escalates immediately (do NOT checkout files manually into a wrong-base worktree).

## Library transposition reviews (E.W1)

Architectural transpositions in `src/` (E.W1) carry an additional micro-audit pass per E4. Pattern: dispatch the implementation agent → run gates → dispatch a second (read-only) audit agent to verify the structural intent landed cleanly + the public API is preserved (or the breaking-change is documented in CHANGELOG).

## v0.7.0 release blocker (E.W1 → E.W5)

E.W1 lands breaking changes (lerpLegacy deletion + 51-export move behind `/internal` subpath + 152-branch nameParser semantic equivalence). The v0.7.0 release at E.W5 is the second minor bump in the project (v0.6.0 → v0.7.0). The pre-merge gate matrix extends D's 10-item to:

- The 10 D-merge items (vue-tsc / vitest / playwright / lint / proof:resolution / api tsc / build / L8 bench / recursion-guard / reactivity-instant).
- **E-NEW**: post-E.W1 hot-path bench (must hold or improve on v0.6.0's `bench/color-channel-access.mjs` median).
- **E-NEW**: per-wave audit doc cross-walked at close (every wave's audit doc records its sub-gate matrix).

## api/ pipeline parity (E.W2)

D.W2 created the pipeline. E.W2 retires the two-speed backend (per `E-AUDIT-3 AUD-3.1 + E-AUDIT-6 §2`). Agents writing to `api/` cite the pipeline in their audit doc.

## e2e/ coverage expansion (E.W3)

The 14 interactive-flow specs (vote, login, palette save/edit/delete/fork, color proposal, flag, admin tag CRUD, admin status change, admin palette feature, admin color approve/reject, view-interaction flows) all use the B.W3 binding invariants (role/label only, no `waitForTimeout`, no `.lucide-*`, no `page.evaluate` for interaction). Per-spec budget: 25-35 lines.

## CW coordination (E.W4)

Speedtest's CW seed is a constellation-wide change. Value.js participates as a CONSUMER. E.W4 sub-lane: verify value.js is CW-ready (no hard `dist/` aliases for `@mkbabb/*`; peer-dep declarations across the matrix; the `siblingFsAllowTransient` removed by E.W0; the contract-v2 publisher half stays green). E does NOT author CW; coordination/Q.md records the dependency.

## Vendor policy (E.W4)

The ~126 generated shadcn-vue typecheck errors have persisted across B + D. E.W4 opens the vendor policy — re-regenerate? add to .gitignore + generate-at-install? accept-and-document? The choice locks at E.W4 close.

## Parallelism (post-HARDEN-1 lesson)

E.W2 (api/) and E.W3 (e2e/) are file-disjoint and gate-disjoint. The orchestrator MAY parallelize under worktree isolation, reducing the critical path from 6 wave-slots to 5. Default is sequential for gate-isolation discipline; parallel dispatch is the allowed fast-path.
