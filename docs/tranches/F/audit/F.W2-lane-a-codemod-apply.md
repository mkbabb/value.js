# F.W2 — Lane A — Cross-repo codemod apply (keyframes.js)

**Date**: 2026-05-21
**Lane**: F.W2 Lane A — the F3-authorized cross-repo write (sole class permitted in tranche F).
**Authority**: F.W2.md Lane A + `dispatch/AGENT.md` §"Cross-repo write — F.W2 specifics".
**Codemod**: `/Users/mkbabb/Programming/value.js/scripts/migrate-keyframes-js-lerp.mjs` (published at value.js commit `f1d2005`, E.W4 Lane F).
**Target**: `/Users/mkbabb/Programming/keyframes.js` (branch `master`).

---

## §1 — Pre-conditions

### §1.1 — HEAD verification

```
$ git -C /Users/mkbabb/Programming/value.js log -1 --format=%H
1401d75e0e5771ddc74992b249d9e6ae1491ecf3        # matches dispatch pin 1401d75 (F.W1 close)

$ git -C /Users/mkbabb/Programming/keyframes.js log -1 --format=%H
d312517cce393d35f6ef5bf05ab5bd73aa6a9b49        # matches dispatch pin d312517
```

### §1.2 — Clean tree verification

```
$ git -C /Users/mkbabb/Programming/keyframes.js status --short
(empty)
```

Keyframes.js working tree CLEAN — F.W2 precondition holds. Value.js has only untracked `docs/tranches/C/` (acceptable — value.js index is orchestrator-owned).

### §1.3 — Codemod publication-commit pin

```
$ git -C /Users/mkbabb/Programming/value.js log --oneline -- scripts/migrate-keyframes-js-lerp.mjs
f1d2005 chore(w4): vendor policy + CW-readiness verdict + keyframes.js codemod (E.W4 Lanes C + D + F)
```

The codemod is unmodified since E.W4 Lane F publication. F3 invariant holds: value.js did NOT modify the codemod in-flight before applying it to keyframes.js.

---

## §2 — Step 4 — Dry-run

```
$ cd /Users/mkbabb/Programming/keyframes.js
$ node /Users/mkbabb/Programming/value.js/scripts/migrate-keyframes-js-lerp.mjs --dry-run .
```

Output (excerpt — both rewrites):

```
migrate-keyframes-js-lerp: target = /Users/mkbabb/Programming/keyframes.js (dry-run)

[rewrite] src/animation/numeric.ts
           numeric.ts:159 — per-segment numeric interpolation in NumericAnimator.update()
--- a/src/animation/numeric.ts
+++ b/src/animation/numeric.ts
-             (this.result as Record<string, number>)[seg.keys[i]!] = lerp(
-                 eased,
-                 seg.startVals[i]!,
-                 seg.stopVals[i]!,
-             );
+             (this.result as Record<string, number>)[seg.keys[i]!] = lerp(
+                 seg.startVals[i]!,
+                 seg.stopVals[i]!,
+                 eased,
+             );

[rewrite] src/animation/group.ts
           group.ts:251 — weighted-blend lerp in AnimationGroup.tick() weighted branch
--- a/src/animation/group.ts
+++ b/src/animation/group.ts
-                                 existing.value = lerp(
-                                     layer.weight,
-                                     existing.value,
-                                     incoming.value,
-                                 );
+                                 existing.value = lerp(
+                                     existing.value,
+                                     incoming.value,
+                                     layer.weight,
+                                 );

---
summary: rewritten=2, already-migrated=0, unmatched=0
dry-run: no files were modified. Re-run without --dry-run to apply.
```

**Dry-run verdict**: CLEAN. EXACTLY 2 sites, matching F-AUDIT-4 §3 + F.W0 Lane D §2 enumeration. No extras, no misses.

---

## §3 — Step 5 — Real apply

```
$ cd /Users/mkbabb/Programming/keyframes.js
$ node /Users/mkbabb/Programming/value.js/scripts/migrate-keyframes-js-lerp.mjs .
```

Output (excerpt):

```
migrate-keyframes-js-lerp: target = /Users/mkbabb/Programming/keyframes.js

[rewrite] src/animation/numeric.ts
           numeric.ts:159 — per-segment numeric interpolation in NumericAnimator.update()
... (same diff body as dry-run)

[rewrite] src/animation/group.ts
           group.ts:251 — weighted-blend lerp in AnimationGroup.tick() weighted branch
... (same diff body as dry-run)

---
summary: rewritten=2, already-migrated=0, unmatched=0
```

Apply summary identical to dry-run summary. No surprises.

---

## §4 — Step 6 — Diff verification

```
$ git -C /Users/mkbabb/Programming/keyframes.js diff src/animation/numeric.ts src/animation/group.ts
```

### §4.1 — `src/animation/numeric.ts` (line 159 region)

```diff
@@ -157,9 +157,9 @@ export class NumericAnimation<T extends Record<string, number>> {

         for (let i = 0; i < seg.keys.length; i++) {
             (this.result as Record<string, number>)[seg.keys[i]!] = lerp(
-                eased,
                 seg.startVals[i]!,
                 seg.stopVals[i]!,
+                eased,
             );
         }
```

### §4.2 — `src/animation/group.ts` (line 251 region)

```diff
@@ -249,9 +249,9 @@ export class AnimationGroup<V extends Vars> {
                                 isNumericCarrier(incoming)
                             ) {
                                 existing.value = lerp(
-                                    layer.weight,
                                     existing.value,
                                     incoming.value,
+                                    layer.weight,
                                 );
                             } else {
                                 groupedValues[key] = val;
```

### §4.3 — Post-apply `git status --short`

```
M src/animation/group.ts
M src/animation/numeric.ts
```

Exactly 2 files modified. No collateral.

### §4.4 — Grep verification

```
$ grep -n "lerp(" /Users/mkbabb/Programming/keyframes.js/src/animation/numeric.ts | head -5
159:            (this.result as Record<string, number>)[seg.keys[i]!] = lerp(

$ grep -n "lerp(" /Users/mkbabb/Programming/keyframes.js/src/animation/group.ts | head -5
251:                                existing.value = lerp(
```

Line numbers preserved (159 + 251). Argument order verified in diff above: canonical `(a, b, t)` order — `(startVals, stopVals, eased)` + `(existing.value, incoming.value, layer.weight)`.

**Diff verdict**: BOTH SITES CORRECTLY REORDERED.

---

## §5 — Step 7 — keyframes.js test suite

```
$ cd /Users/mkbabb/Programming/keyframes.js
$ npm test 2>&1 | tail -30
```

Output:

```
> @mkbabb/keyframes.js@2.1.1 test
> vitest


 RUN  v4.1.7 /Users/mkbabb/Programming/keyframes.js


 Test Files  15 passed (15)
      Tests  218 passed (218)
   Start at  13:08:19
   Duration  1.96s (transform 1.98s, setup 0ms, import 2.57s, tests 1.81s, environment 6.97s)
```

**Test verdict**: **PASS** — 15 test files / 218 tests, all green; 1.96s duration. No snapshot regeneration was required; pre-migration tests were not silently passing on garbage (a real concern per F.W2.md "Risk + escalation"). The migration produces a clean test pass straightaway.

---

## §6 — Step 8 — Idempotency check

```
$ cd /Users/mkbabb/Programming/keyframes.js
$ node /Users/mkbabb/Programming/value.js/scripts/migrate-keyframes-js-lerp.mjs .
```

Output:

```
migrate-keyframes-js-lerp: target = /Users/mkbabb/Programming/keyframes.js

[already-migrated] src/animation/numeric.ts — canonical (a, b, t) order present; skipping

[already-migrated] src/animation/group.ts — canonical (a, b, t) order present; skipping

---
summary: rewritten=0, already-migrated=2, unmatched=0
```

Post-re-run `git status --short`:

```
M src/animation/group.ts
M src/animation/numeric.ts
```

(unchanged from post-apply — no additional modifications by the re-run).

**Idempotency verdict**: CONFIRMED. Codemod is safe to re-invoke.

---

## §7 — Step 9 — Commit in keyframes.js

```
$ cd /Users/mkbabb/Programming/keyframes.js
$ git add src/animation/numeric.ts src/animation/group.ts
$ git commit -m "fix(animation): migrate lerp call sites to value.js v0.7.0 (a, b, t) order
... (full template per F.W2.md Lane A step 9)"
```

Result:

```
[master 470814e] fix(animation): migrate lerp call sites to value.js v0.7.0 (a, b, t) order
 2 files changed, 2 insertions(+), 2 deletions(-)
```

### §7.1 — Post-state SHA + author

```
$ git -C /Users/mkbabb/Programming/keyframes.js log -1 --format="%H%n%s%n%an <%ae>"
470814eaeb32cbb5cb2a689a0b1a6c997f147c8d
fix(animation): migrate lerp call sites to value.js v0.7.0 (a, b, t) order
Mike Babb <mike7400@gmail.com>
```

Commit subject + body verbatim from F.W2.md Lane A step 9 template. Author identity = the keyframes.js maintainer's existing git config (`mike7400@gmail.com`), per `dispatch/AGENT.md`: the dispatch agent did NOT override identity. This commit is plausibly maintainer-authored (which is the F3 boundary intent — value.js delegates the act of committing to the maintainer's tree without inverting authorship attribution).

---

## §8 — Step 11 — No push

Per F.W2.md Lane B step 3 default: NO push was performed. The commit is LOCAL ONLY on `keyframes.js master`. Push decision is user-discretionary. The F2 (c) trigger ("keyframes.js codemod applied + tests PASS") fires on `npm test` PASS, not on origin push — so the trigger is **SATISFIED** with the commit existing locally.

---

## §9 — Sub-gate A verdict

| Check | Verdict |
|---|---|
| Pre-state SHAs match dispatch | PASS (value.js `1401d75` + keyframes.js `d312517`) |
| Codemod is published artefact (commit `f1d2005`) | PASS |
| Dry-run shows exactly 2 sites, correct shape | PASS |
| Real-apply summary matches dry-run | PASS |
| Diff verifies `(t, a, b)` → `(a, b, t)` at both sites | PASS |
| Only 2 files modified | PASS |
| keyframes.js `npm test` | PASS — 15 files / 218 tests |
| Codemod is idempotent (`[already-migrated]` on re-run) | PASS |
| Commit landed in keyframes.js with exact template message | PASS — commit `470814e` |
| No push performed | PASS |
| No hand-edits | PASS — all changes via codemod |
| No writes outside Lane A's file-bounds in value.js | PASS — Q.md + 2 audit docs only |

**Sub-gate A: GREEN.**

---

## §10 — Authority pins

- F.W2.md Lane A (9-step protocol).
- `dispatch/AGENT.md` §"Cross-repo write — F.W2 specifics".
- F-AUDIT-4 §3 + F.W0 Lane D §2 (call-site enumeration).
- Codemod publisher commit: value.js `f1d2005` (E.W4 Lane F).
- keyframes.js post-state commit: `470814e` (master, LOCAL).
