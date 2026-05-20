# E.W4 Lane F — keyframes.js consumption-update coordination (NEW per E-FOLD)

**Branch**: `tranche-e`
**HEAD at dispatch**: `4dbe5c48efe0e6dde6b48a15ca21c9effcd1c24a`
**Date**: 2026-05-20
**Source spec**: `docs/tranches/E/waves/E.W4.md` Lane F (lines 114-158)
**Inheriting finding**: `audit/E-FOLD-2-3-4-synthesis.md §1, §4`
**Boundary**: value.js writes ONLY. keyframes.js source NOT modified — verified.

---

## §1 — Pre-state

### §1.1 — Cross-repo call-site enumeration

Per the dispatch contract's F.1 step:

```
$ grep -rn '\blerp(' /Users/mkbabb/Programming/keyframes.js/src/
/Users/mkbabb/Programming/keyframes.js/src/animation/numeric.ts:159:            (this.result as Record<string, number>)[seg.keys[i]!] = lerp(
/Users/mkbabb/Programming/keyframes.js/src/animation/group.ts:251:                                existing.value = lerp(
```

**EXPECTED**: 1 call site (the `numeric.ts:159` site documented in `coordination/Q.md §5` and `E-FOLD-2-3-4-synthesis.md §1`).
**ACTUAL**: **2 call sites**. **NEW FINDING.**

The previously-undocumented second site is `keyframes.js/src/animation/group.ts:251`. It uses the same legacy `(t, a, b)` ordering and is therefore subject to the same v0.6.0 silent-breakage. The E-FOLD audit's "single call site" claim is corrected at this audit.

Both call sites are inside `keyframes.js/src/animation/` and resolve `lerp` via `import { ... lerp ... } from "@mkbabb/value.js"`.

### §1.2 — Verbatim site shapes

**Site 1 — `src/animation/numeric.ts:158-163`** (per-segment numeric interpolation in `NumericAnimator.update()`):

```ts
        for (let i = 0; i < seg.keys.length; i++) {
            (this.result as Record<string, number>)[seg.keys[i]!] = lerp(
                eased,
                seg.startVals[i]!,
                seg.stopVals[i]!,
            );
        }
```

**Site 2 — `src/animation/group.ts:247-258`** (weighted-blend in `AnimationGroup.tick()` weighted branch, new at this audit):

```ts
                            if (
                                isNumericCarrier(existing) &&
                                isNumericCarrier(incoming)
                            ) {
                                existing.value = lerp(
                                    layer.weight,
                                    existing.value,
                                    incoming.value,
                                );
                            } else {
                                groupedValues[key] = val;
                            }
```

Under v0.6.0's `(start, end, t)` order, both sites interpret the t-parameter (`eased` / `layer.weight`) as the `start` endpoint — producing garbage interpolated values. The semantics of the second site are identical to the first: weight in [0, 1], endpoints are numeric values, the result must be the weighted lerp.

### §1.3 — Migration diff (the consumer-side change)

For site 1 (unchanged from `coordination/Q.md §5.2`):

```diff
- (this.result as Record<string, number>)[seg.keys[i]!] = lerp(
-     eased,
-     seg.startVals[i]!,
-     seg.stopVals[i]!,
- );
+ (this.result as Record<string, number>)[seg.keys[i]!] = lerp(
+     seg.startVals[i]!,
+     seg.stopVals[i]!,
+     eased,
+ );
```

For site 2 (NEW, requires Q.md §5 update — see §4 below):

```diff
- existing.value = lerp(
-     layer.weight,
-     existing.value,
-     incoming.value,
- );
+ existing.value = lerp(
+     existing.value,
+     incoming.value,
+     layer.weight,
+ );
```

### §1.4 — Current `coordination/Q.md §5` state

Post-E-FOLD round, §5 carries:

- **§5.1** — v0.6.0 silent-breakage finding (verbatim site shape from `numeric.ts:159` ONLY; the group.ts site was not yet surfaced).
- **§5.2** — Migration diff for `numeric.ts:159` ONLY.
- **§5.3** — `lerpLegacy` retirement trigger per E5 sharpened escalation (3-part: blocker / smallest unblock / re-check trigger).
- **§5.4** — Verification protocol (5-step boot/apply/re-run/commit/trigger).

§5 is bit-accurate w.r.t. the single-call-site framing it was authored against. The `lerpLegacy` JSDoc in `src/math.ts` (E.W1 Lane A close) correctly carries the E5-compliant deferred-retirement text. The single drift is **§5's call-site count** — it claims 1 site; the actual count is 2.

### §1.5 — `src/math.ts` lerpLegacy state (re-read at dispatch)

```ts
/**
 * @deprecated Legacy `lerp(t, a, b)` ordering. Migrate to `lerp(a, b, t)`.
 * Will be removed after keyframes.js's `file:`-linked consumer migrates
 * the single call site at `keyframes.js/src/animation/numeric.ts:159`,
 * verified by `cd keyframes.js && npm test` passing against master value.js.
 * See value.js `docs/tranches/E/coordination/Q.md §5`.
 */
export const lerpLegacy = (t: number, start: number, end: number) =>
    lerp(start, end, t);
```

The JSDoc says "the single call site at `numeric.ts:159`". Given the F.1 enumeration found 2 sites, this is also slightly stale. **Proposed fix**: §4.2 below.

---

## §2 — Codemod authored

| Field | Value |
|---|---|
| Path | `scripts/migrate-keyframes-js-lerp.mjs` |
| LoC | 257 |
| Permissions | `755` (chmod +x) |
| Strategy | Conservative verbatim multi-line string match per site, with parity-count assertion |
| Dry-run mode | YES (`--dry-run` flag) |
| Asserts before/after parity | YES (`countLerpCalls()` pre + post equality check, ABORTs the rewrite if not equal) |
| Idempotent | YES (second run reports `[already-migrated]`, exits 0) |
| Covers both sites | YES (numeric.ts:159 AND group.ts:251) |
| `package.json` script | `codemod:keyframes-lerp` |

### §2.1 — Strategy detail

The codemod stores each site's expected legacy shape and its canonical replacement as exact multi-line strings (verbatim from keyframes.js HEAD `0909177`). For each site:

1. Read the target file.
2. Count `\blerp\(` occurrences (parity baseline).
3. If the file contains the legacy shape: replace with canonical, recount, assert equality. If equality fails, ABORT — don't write.
4. Else if the file contains the canonical shape: `[already-migrated]`, skip.
5. Else: `[unmatched]` — the block has drifted; refuse to rewrite, emit diagnostic, exit 1.

The codemod NEVER touches any `lerp(` invocation outside the two recorded sites. Free-standing `lerp(` calls within other consumer code are presumed already in the canonical order.

### §2.2 — Diagnostic UX

- `--help` / `-h` / no args → prints usage, exits 0 for help, 1 for no-args.
- Missing path → `error: path does not exist: ...`, exit 1.
- Path exists but no `src/animation/` → `error: does not appear to be a keyframes.js checkout`, exit 1.
- For each site: `[rewrite]`, `[already-migrated]`, `[unmatched]`, or `[skip]` (file missing).
- Final summary line: `rewritten=N, already-migrated=N, unmatched=N`.
- Failures list at end if any site failed.

### §2.3 — `package.json` integration

```json
"scripts": {
    "proof:resolution": "node scripts/proof-resolution-contract.mjs",
    "codemod:keyframes-lerp": "node scripts/migrate-keyframes-js-lerp.mjs",
    ...
}
```

Invocation from keyframes.js maintainer side: `node ../value.js/scripts/migrate-keyframes-js-lerp.mjs .` (sibling checkout), or run as the script `npm run -w value.js codemod:keyframes-lerp -- ../keyframes.js` once CW lands.

---

## §3 — Verification protocol (for the keyframes.js maintainer)

This is the EXACT protocol the keyframes.js maintainer follows. It supersedes / extends `coordination/Q.md §5.4` to cover the second call site.

1. **Pre-migration**: ensure value.js is at the v0.7.0 candidate (or current master) — `npm install` from inside the keyframes.js checkout updates the `file:../value.js` link.
2. **Run the codemod (dry-run first, recommended)**:
   ```
   node ../value.js/scripts/migrate-keyframes-js-lerp.mjs . --dry-run
   ```
   Confirm the diff matches expectations (two rewrite blocks: numeric.ts and group.ts).
3. **Apply**: re-run without `--dry-run`:
   ```
   node ../value.js/scripts/migrate-keyframes-js-lerp.mjs .
   ```
   Expect summary `rewritten=2, already-migrated=0, unmatched=0`.
4. **Verify diff manually**: inspect `git diff src/animation/numeric.ts src/animation/group.ts` — confirm:
   - `numeric.ts:159` call site has `(seg.startVals[i]!, seg.stopVals[i]!, eased)` order.
   - `group.ts:251` call site has `(existing.value, incoming.value, layer.weight)` order.
5. **Run tests**: `npm test`. Expect PASS. Pre-migration these MAY have shown garbage values for any test exercising the animation kernel; post-migration they should match v0.6.0+ semantics.
6. **Confirm**: notify the value.js maintainer that keyframes.js is migrated. This is the trigger for E5's `lerpLegacy` retirement in the next value.js tranche.

### §3.1 — Idempotency guarantee

The codemod is safe to re-run. After step 3, a second invocation produces:

```
[already-migrated] src/animation/numeric.ts — canonical (a, b, t) order present; skipping
[already-migrated] src/animation/group.ts   — canonical (a, b, t) order present; skipping
summary: rewritten=0, already-migrated=2, unmatched=0
exit 0
```

### §3.2 — Refusal cases

If the keyframes.js maintainer has manually re-indented or re-styled the block before running the codemod, the verbatim string match will MISS, and the codemod reports `[unmatched]` + exits 1. In that case the maintainer applies the diffs in §1.3 by hand.

---

## §4 — Q.md §5 update (orchestrator integrates)

Two proposed updates to `coordination/Q.md §5` post-Lane F discovery. The orchestrator may apply directly or fold into the E.W4 close-audit.

### §4.1 — §5.1 + §5.2 amendment: cover the second call site

§5.1 currently records `numeric.ts:159` as the single site. Add a §5.1.bis-style note recording the group.ts:251 site, OR expand the existing §5.1 enumeration. Suggested wording:

> **Site count update (E.W4 Lane F audit)**: the actual call-site count is **2**, not 1. The second site at `src/animation/group.ts:251` invokes `lerp(layer.weight, existing.value, incoming.value)` — same legacy `(t, a, b)` shape, same v0.6.0 silent-breakage. The codemod authored at E.W4 Lane F covers both.

Extend §5.2 with the second diff (verbatim per §1.3 above).

### §4.2 — `lerpLegacy` JSDoc tweak

The JSDoc currently says "the single call site at `numeric.ts:159`". Suggested replacement (deferred to a separate Lane F-adjacent change, NOT executed in this Lane per the hard cap "lerpLegacy stays"):

```ts
/**
 * @deprecated Legacy `lerp(t, a, b)` ordering. Migrate to `lerp(a, b, t)`.
 * Will be removed after keyframes.js's `file:`-linked consumer migrates the
 * two call sites at `src/animation/numeric.ts:159` and `src/animation/group.ts:251`,
 * verified by `cd keyframes.js && npm test` passing against master value.js,
 * applicable via `scripts/migrate-keyframes-js-lerp.mjs`. See value.js
 * `docs/tranches/E/coordination/Q.md §5`.
 */
```

This is a documentation-only tweak. Lane F's hard cap forbids deleting `lerpLegacy`; the JSDoc revision is a separate small edit the orchestrator integrates at E.W4 close (or rolls into the post-E retirement tranche).

### §4.3 — §5.3 (`lerpLegacy` retirement trigger) — no change

The 3-part E5 escalation framework still holds verbatim. The trigger is "keyframes.js's file:-linked consumer migrates the call site(s)" — pluralising the site count from 1 → 2 doesn't change the trigger semantics. The trigger STILL is `cd keyframes.js && npm test` passes against master value.js.

### §4.4 — §5.4 (verification protocol) — superseded by §3 above

§3 above expands §5.4 from 5 steps to 6 steps + dry-run + idempotency note + refusal cases. The orchestrator may either replace §5.4 with §3, or cross-reference §3 from §5.4.

---

## §5 — Gates

| Gate | Expected | Actual | Verdict |
|---|---|---|---|
| 1. `node scripts/migrate-keyframes-js-lerp.mjs` (no args) prints usage | usage text + exit 1 | usage text + exit 1 | **PASS** |
| 1b. `--help` prints usage | usage text + exit 0 | usage text + exit 0 | **PASS** |
| 2. Dry-run against live keyframes.js | both sites detected, no write | rewritten=2, dry-run banner, no writes; verified by re-grepping after | **PASS** |
| 2b. Live run against TEMP copy of keyframes.js (`/tmp/test-codemod-lane-f/`) | both sites rewritten, parity preserved | rewritten=2, lerp count 1→1 in each file, post-shape verified verbatim, exit 0 | **PASS** |
| 2c. Second run on TEMP (idempotency) | already-migrated × 2, exit 0 | already-migrated=2, exit 0 | **PASS** |
| 3. `npm run lint` | exit 0 | exit 0 (zero warnings) | **PASS** |
| 4. `npm run codemod:keyframes-lerp -- --help` (package.json script) | usage text + exit 0 | usage text + exit 0 | **PASS** |
| 5. keyframes.js NOT modified (cross-repo boundary) | unchanged | unchanged (verified — codemod was only run against /tmp temp copy and `--dry-run` against the live tree) | **PASS** |

All gates GREEN.

---

## §6 — Files modified

| File | Status | Purpose |
|---|---|---|
| `scripts/migrate-keyframes-js-lerp.mjs` | NEW (257 LoC) | The migration codemod |
| `package.json` | MODIFIED (1 line) | `codemod:keyframes-lerp` script added |
| `docs/tranches/E/audit/E.W4-lane-f-keyframes-coordination.md` | NEW (this file) | Audit deliverable + Q.md §5 amendment proposal |

**NOT modified** (per Lane F's hard cap):
- `src/math.ts` — `lerpLegacy` stays. The JSDoc tweak in §4.2 is a proposed orchestrator-integrated change for E.W4 close.
- `coordination/Q.md` — §5 amendment proposed in §4 above; orchestrator integrates.
- Any keyframes.js source file — cross-repo boundary preserved.

---

## §7 — E.W4 Lane F sub-gate verdict

**PASS.**

Lane F's PRODUCT — migration scaffolding + verification protocol + documented unblock — is shipped:

- The codemod covers BOTH call sites (one of which is a new finding at this audit).
- Dry-run + idempotency + parity-assertion + conservative refusal all verified.
- Lint passes.
- The `lerpLegacy` retirement is gated on the keyframes.js maintainer's confirmation per E5; the trigger is now mechanically actionable (`npm run codemod:keyframes-lerp -- ../keyframes.js` then `npm test`).
- The orchestrator has explicit proposed amendments to `coordination/Q.md §5` (and a one-line JSDoc tweak) to fold the second-site discovery into the published coordination state.

The actual `lerpLegacy` deletion is correctly DEFERRED to the next value.js tranche, gated by the keyframes.js-side migration confirmation — Lane F's hard cap is honored.
