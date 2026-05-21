# F tranche — agent dispatch (deltas vs E)

F inherits **E's hardened dispatch contract verbatim** (`docs/tranches/E/dispatch/AGENT.md`, which itself inherits D + B). This doc carries only the F-specific deltas; binding clauses (hardened git, runtime evidence, worktree isolation, build hygiene, sub-gates, proof docs, hard caps, prose) are unchanged.

## F1-F4 — invariants added (`F.md §2`)

- **F1 — "No deferrals" as binding.** Every E5 inherited deferral lands in F OR carries an EXPLICIT TIME-BOUND (c) re-check trigger in `coordination/Q.md`. Silent omission is rejected at the wave sub-gate. The (c) trigger must name a deterministic peer event (e.g., "keyframes.js maintainer applies the codemod, verified by `cd keyframes.js && npm test` PASS") OR a calendar/wave checkpoint (e.g., "re-check at F.W4 close + at next-tranche-open"), NOT vague "later".
- **F2 — `lerpLegacy` retires.** Sharpens E2 ("NO LEGACY CODE"). The lone `@deprecated` in `src/` goes away in F.W3 after F.W2's keyframes.js verification. Pre-condition: `cd /Users/mkbabb/Programming/keyframes.js && npm test` passes against master `value.js`.
- **F3 — Cross-repo write authorization (explicit + bounded).** F authorizes ONE class of cross-repo write: applying the published `scripts/migrate-keyframes-js-lerp.mjs` codemod against `keyframes.js`. The codemod is parity-asserting + idempotent + dry-run-safe. F does NOT authorize ANY other cross-repo write (no glass-ui authorship, no keyframes.js precept-pin reconciliation, no fourier-analysis cleanup, no speedtest CW activation). Boundary stays narrow.
- **F4 — W8-W12 back-reference + tranche-discipline sharpening.** F authors a value.js-side back-reference doc at `docs/tranches/W8-W12-consumer-lockstep.md` (or `docs/tranches/F/W8-W12-consumer-lockstep.md` — TBD at F.W0) pointing at speedtest AI authority + recording gate-impact verdict per F-AUDIT-3. Codifies the consumer-lockstep posture: future cross-repo lockstep work either gets its own value.js-side tranche envelope OR records its gates + close-honesty checklist in a back-reference at the time of the work, not retroactively.

## Cross-repo write — F.W2 specifics

F.W2's cross-repo write is the SOLE F3 exception. The dispatch agent for F.W2 Lane A MUST follow this protocol:

1. **Verify the codemod is the master-published artefact**: `cd /Users/mkbabb/Programming/value.js && git log -- scripts/migrate-keyframes-js-lerp.mjs`. Confirm the codemod is from E.W4 Lane F + that its content matches the published shape (no in-flight modifications).
2. **Verify keyframes.js is on a clean working tree**: `cd /Users/mkbabb/Programming/keyframes.js && git status --short`. If dirty, STOP + escalate.
3. **Verify keyframes.js's current HEAD** + capture as pre-state.
4. **Run the codemod in dry-run mode first**: `node ../value.js/scripts/migrate-keyframes-js-lerp.mjs --dry-run .`. Verify the proposed diff matches both expected sites.
5. **Apply for real** if dry-run is clean.
6. **Run `npm test`** in keyframes.js — expect PASS.
7. **Commit in keyframes.js's tree** with the exact message template provided in `waves/F.W2.md`. The commit author is the user (mike@babb.dev) per existing convention.
8. **Capture the post-state SHA** + record in F's `coordination/Q.md §5.5`.
9. **Push** if explicitly authorized at F.W2 (the orchestrator decides per the dispatch contract — F.W2 spec defaults to "push" since the F1 thesis requires the (c) trigger to fire).

## Worktree-base pinning (carried verbatim from E.W1 D-lesson)

When dispatching with `isolation: "worktree"`, the agent's prompt MUST cite the target HEAD SHA explicitly. The agent verifies `git -C <repo> log -1 --format=%H HEAD` matches BEFORE doing any work; mismatch escalates immediately.

## Library transposition reviews (F.W1)

F.W1's 3 transpositions (Github icon migration, @ts-ignore strengthening, Rolldown codeSplitting) each close on a sub-gate + an audit doc. The dispatch shape matches E.W1.

## v0.8.0 release blocker (F.W3 → F.W4)

F.W3 lands the LONE BREAKING change (`lerpLegacy` delete). The v0.8.0 release at F.W4 is the third minor bump (v0.6.0 → v0.7.0 → v0.8.0).

Pre-merge gate matrix at F.W4 extends E's 12-item matrix with F-NEW items per F.W3 Lane D + Lane E:
- F-NEW: dts-shape invariant — `dist/*.d.ts` exists at flat layout (NO `dist/src/*.d.ts`).
- F-NEW: bundle-size gate — `dist/value.js` ≤ 145 KB raw.

Plus the standard 12:
- 10 D-merge items (vue-tsc / vitest / playwright / lint / proof:resolution / api tsc / build / L8 bench / recursion-guard / reactivity-instant).
- E-NEW DIRECT_PATHS bench ≥ 2×.
- E-NEW nameParser bench ≥ 5×.

Total F.W4 pre-merge matrix: **14 items**.

## CW Phase-2 (not in F scope)

CW Phase-2 remains user-gated. F-AUDIT-4 §4 confirmed speedtest's tranche AI is CLOSED but CW activation is still gated on Phase-0 quiescence (fourier-analysis 109-file dirty tree unchanged). F does NOT activate CW.

## Parallelism

F.W0 + F.W1 are gate-disjoint + mostly file-disjoint. The orchestrator MAY parallelize:
- F.W0 Lane A (gh-pages unblock — demo files) + F.W0 Lane B (back-reference doc — new file) + F.W0 Lane C (state-at-open — read-only) + F.W0 Lane D (coord refresh — read-only) all dispatch in parallel.
- F.W1 follows after F.W0 close-commit; F.W1's 3 lanes can parallelize (all file-disjoint).

F.W2 is sequential (cross-repo single-actor critical path).
F.W3 is gate-disjoint within its lanes (CI workflow + scripts/ + src/math.ts edits don't overlap); 3-way parallel safe.
F.W4 close-audit lanes dispatch in parallel (all read-only).
