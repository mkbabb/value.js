# F.W2 — Keyframes.js codemod cross-repo apply (F3 boundary exception)

**Opens after**: F.W1 close.
**Lanes**: 2 — A (codemod application + test verification — cross-repo write), B (post-apply Q.md record + maintainer signal).
**Status**: planned.

## Scope

F.W2 is the **SOLE F3-authorized cross-repo write**. F applies the published `scripts/migrate-keyframes-js-lerp.mjs` codemod against `/Users/mkbabb/Programming/keyframes.js`, verifies tests pass, and commits in keyframes.js's tree. This unblocks F.W3's `lerpLegacy` delete.

### F3 invariant recap

Per `F.md §2`: F authorizes ONE class of cross-repo write — applying the published codemod. The codemod is parity-asserting + idempotent + dry-run-safe. The codemod IS the unblock action published at E.W4 Lane F.

### Lane A — Codemod application + test verification

Per the protocol in `dispatch/AGENT.md`:

1. **Verify F.W1 is closed** + working trees clean:
   - `git -C /Users/mkbabb/Programming/value.js status --short` — clean.
   - `git -C /Users/mkbabb/Programming/keyframes.js status --short` — clean. If dirty, STOP + escalate.
2. **Capture pre-state SHAs**:
   - value.js HEAD.
   - keyframes.js HEAD.
3. **Verify the codemod is the published artefact**:
   - `git -C /Users/mkbabb/Programming/value.js log --oneline -- scripts/migrate-keyframes-js-lerp.mjs` — capture the publication commit + verify it's E.W4 Lane F's `f1d2005` (or descendant).
4. **Dry-run the codemod** against keyframes.js:
   ```
   cd /Users/mkbabb/Programming/keyframes.js
   node /Users/mkbabb/Programming/value.js/scripts/migrate-keyframes-js-lerp.mjs --dry-run .
   ```
   Verify the proposed diff covers BOTH sites (`numeric.ts:159` + `group.ts:251`).
5. **Apply for real** if dry-run is clean:
   ```
   cd /Users/mkbabb/Programming/keyframes.js
   node /Users/mkbabb/Programming/value.js/scripts/migrate-keyframes-js-lerp.mjs .
   ```
6. **Verify the diff**:
   - `git -C /Users/mkbabb/Programming/keyframes.js diff src/animation/numeric.ts src/animation/group.ts` — both sites migrated to `(a, b, t)` order.
   - `grep -n "lerp(" /Users/mkbabb/Programming/keyframes.js/src/animation/{numeric.ts,group.ts}` — verify the argument order.
7. **Run keyframes.js tests**:
   ```
   cd /Users/mkbabb/Programming/keyframes.js
   npm test 2>&1 | tail -20
   ```
   - Expect PASS.
   - If FAIL: the test failure is informational — it may indicate the pre-migration tests were ALSO failing silently (the legacy `lerp(t, a, b)` produced garbage that may have been baked into snapshots). Document carefully + assess.
8. **Re-run the codemod in idempotency-check mode** (re-applying it should report `[already-migrated]` and exit 0):
   ```
   cd /Users/mkbabb/Programming/keyframes.js
   node /Users/mkbabb/Programming/value.js/scripts/migrate-keyframes-js-lerp.mjs .
   ```
   Expect: "[already-migrated]" output + exit 0.
9. **Commit in keyframes.js's tree** with the exact message template:
   ```
   fix(animation): migrate lerp call sites to value.js v0.7.0 (a, b, t) order

   Two call sites in src/animation/ were silently broken when value.js
   v0.6.0 → v0.7.0 flipped lerp's argument order from (t, a, b) to
   (a, b, t). Both sites were producing garbage interpolated values
   under v0.7.0.

   - numeric.ts:159: lerp(eased, startVals[i]!, stopVals[i]!) →
     lerp(startVals[i]!, stopVals[i]!, eased)
   - group.ts:251: lerp(layer.weight, existing.value, incoming.value) →
     lerp(existing.value, incoming.value, layer.weight)

   Migration applied via value.js's published codemod:
     node ../value.js/scripts/migrate-keyframes-js-lerp.mjs .

   The codemod is parity-asserting + idempotent + dry-run-safe.
   It refuses to rewrite call sites that don't match the canonical
   silently-broken shape, so future hand-edits are safe.

   Verified by `npm test` passing post-migration.

   See value.js docs/tranches/F/waves/F.W2.md + coordination/Q.md §3
   for the cross-repo coordination context.
   ```
10. **Capture post-state SHA**:
    - `git -C /Users/mkbabb/Programming/keyframes.js log -1 --format=%H`. Record in Lane B's audit doc.

**Sub-gate A**:
- Both keyframes.js call sites migrated.
- `cd keyframes.js && npm test` PASS.
- Codemod idempotency confirmed (`[already-migrated]` on re-run).
- Single commit in keyframes.js's tree with the exact message.

### Lane B — Q.md record + maintainer signal

1. **Record in value.js's `coordination/Q.md §3.3`**:
   - Pre-state SHA + post-state SHA.
   - Migration outcome (test verdict).
   - The (c) trigger for `lerpLegacy` retirement is now SATISFIED.
2. **Author `audit/F.W2-lane-b-coord-record.md`** with the SHA pair + the verdict.
3. **(Optional, only if explicitly authorized)**: Push the keyframes.js commit to origin. Default: leave it as a local commit + notify the maintainer. The push decision is the orchestrator's per F3.

**Sub-gate B**:
- Q.md §3.3 updated with SHAs + verdict.
- Audit doc authored.

## File bounds

| Lane | Files |
|---|---|
| A | (CROSS-REPO WRITE) `keyframes.js/src/animation/numeric.ts` + `keyframes.js/src/animation/group.ts` (codemod-driven migration); commit in keyframes.js's tree. `audit/F.W2-lane-a-codemod-apply.md` (new — in value.js's tree). |
| B | `docs/tranches/F/coordination/Q.md` §3.3 (orchestrator integrates), `audit/F.W2-lane-b-coord-record.md` (new). |

## Gate

Conjunction of sub-gates A + B. Wave-level:
- keyframes.js: both lerp call sites migrated; npm test PASS; commit landed.
- value.js: Q.md §3.3 records the SHA pair + verdict.
- value.js gates (lint, vue-tsc, vitest, build, proof:resolution, smoke, bench) UNCHANGED — F.W2 does not modify value.js source.

## Verification artefacts

2 per-lane audit docs + the keyframes.js commit (cross-repo).

## Commit plan

- (CROSS-REPO commit in keyframes.js's tree) — see Lane A.9 template.
- (value.js commit) `docs(tranche-f/w2): keyframes.js codemod applied — both lerp sites migrated; F2 (c) trigger SATISFIED` — Lane B.

## Dependencies

- Depends on: F.W1 close (clean substrate; value.js source unchanged in F.W2).
- Blocks: F.W3 (lerpLegacy delete depends on this lane's keyframes.js verification).

## Risk + escalation

- **If keyframes.js's `npm test` FAILS post-migration**: 
  - The migration is mechanically correct (codemod parity-assertion), but the keyframes.js tests may have been silently passing on garbage (e.g., snapshot-assertion captured the v0.7.0 garbage as expected).
  - Investigate: was the test suite RUN at all post-v0.7.0? F-AUDIT-4 §3.4 noted the test state was "presumed-PASS-from-W12-lockstep" (the W12-β commit indicates the suite at least compiles under TS 6).
  - If snapshots are stale: regenerate carefully — the snapshots should reflect the CORRECT (canonical) interpolation, not the v0.6.0 OR v0.7.0-garbage.
  - Escalate to the user with the failure trace + the proposed snapshot fix BEFORE committing in keyframes.js's tree.
- **If the dry-run reveals more than 2 sites**: surface as a finding. The codemod is conservative (per E.W4 Lane F); it refuses to rewrite ambiguous sites. Any additional sites are NEW findings + may indicate the (a)(b)(c) trigger needs further refinement.
