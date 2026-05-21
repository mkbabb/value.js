# F.W3 Lane A — `lerpLegacy` Delete (F2 invariant satisfaction + sole v0.8.0 BREAKING)

**Branch**: `tranche-f`
**HEAD at dispatch**: `df0650c` (F.W2 close)
**Date**: 2026-05-21
**Scope**: Delete `lerpLegacy` from value.js. Retire the LONE `@deprecated` in `src/`,
close the **F2 invariant**, and land the **sole BREAKING change** for v0.8.0.

---

## 1. Pre-state (at `df0650c`)

```text
$ grep -rn '@deprecated' src/
src/math.ts:34: * @deprecated Legacy `lerp(t, a, b)` ordering. Migrate to `lerp(a, b, t)`.

$ grep -rn 'lerpLegacy' src/
src/math.ts:44:export const lerpLegacy = (t: number, start: number, end: number) =>
src/index.ts:166:    lerpLegacy,

$ grep -rn 'lerpLegacy' test/
(0 matches — lerpLegacy tests rode on the `lerp` test suite per E.W1 Lane A audit)

$ grep -c 'lerpLegacy' dist/value.js
1

$ stat -f%z dist/value.js
124988
```

| metric                    | count |
| ------------------------- | ----: |
| `@deprecated` in `src/`   |     1 |
| `lerpLegacy` in `src/`    |     2 |
| `lerpLegacy` in `test/`   |     0 |
| `lerpLegacy` in `dist/`   |     1 |
| `dist/value.js` size (B)  | 124988 |

**F2 invariant pre-state**: NOT SATISFIED (1 `@deprecated` outstanding).

---

## 2. Edits applied (3 surgical writes)

### 2.1 `src/math.ts` — delete `lerpLegacy` + its JSDoc block

```diff
@@ -30,21 +30,6 @@ export function lerp(start: number, end: number, t: number) {
     return (1 - t) * start + t * end;
 }

-/**
- * @deprecated Legacy `lerp(t, a, b)` ordering. Migrate to `lerp(a, b, t)`.
- * Will be removed after keyframes.js's `file:`-linked consumer migrates
- * its TWO silently-broken call sites (per E.W4 Lane F audit):
- *   - `keyframes.js/src/animation/numeric.ts:159`
- *   - `keyframes.js/src/animation/group.ts:251`
- * Verified by `cd keyframes.js && npm test` passing against master value.js.
- * The migration can be applied via `node scripts/migrate-keyframes-js-lerp.mjs`
- * (idempotent codemod, covers both sites).
- * See value.js `docs/tranches/E/coordination/Q.md §5`.
- */
-export const lerpLegacy = (t: number, start: number, end: number) =>
-    lerp(start, end, t);
-
 // Logarithmic interpolation between two values
 export function logerp(t: number, start: number, end: number) {
```

Clean removal — no stub, no commented-out leftovers.

### 2.2 `src/index.ts` — remove `lerpLegacy` from barrel export

```diff
@@ -162,7 +162,6 @@ export {
     clamp,
     scale,
     lerp,
-    lerpLegacy,
     logerp,
     deCasteljau,
     cubicBezier,
```

Other math exports intact.

### 2.3 `CHANGELOG.md` — author v0.8.0 entry at top

New `## [0.8.0] — 2026-05-21 (F close)` section prepended above
`## [0.7.0] — 2026-05-20 (E close)`, with:

- `### BREAKING` — `lerpLegacy` removal + migration note (codemod for keyframes.js
  shape; swap-arg manual migration for other consumers).
- `### INTERNAL` — F.W4 lockstep doc; gh-pages chronic close; 3 post-W12
  transpositions (typed `Memoized<T>`, Rolldown `codeSplitting`, 29-subdir
  shadcn-vue sweep); 5 CI hygiene gates; keyframes.js cross-repo codemod
  application.
- `### DEFERRED → ZERO (per F1)` — E5 inherited deferrals dispositioned;
  standing peer-authorship asks carry forward with sharpened TIME-BOUND (c)
  triggers.
- `### DEPS` — none in F (W8–W12 lift was pre-F-open on master).

Style matches existing `## [x.y.z]` header convention.

### 2.4 Test files — no edits

`grep -rn 'lerpLegacy' test/` returned **0** matches at pre-state. Per E.W1
Lane A audit note: "the lerpLegacy tests rode on the lerp test suite" —
i.e., the test file invoked the canonical `lerp` (the alias delegated to it).
No test specifically validates the legacy ordering. **No test edits required.**

---

## 3. Post-state (after edits + rebuild)

```text
$ grep -rn '@deprecated' src/
(0 matches)

$ grep -rn 'lerpLegacy' src/
(0 matches)

$ grep -rn 'lerpLegacy' test/
(0 matches)

$ grep -c 'lerpLegacy' dist/value.js dist/value.cjs dist/value.d.ts 2>/dev/null
0

$ grep 'lerpLegacy' dist/math.d.ts
(0 matches)

$ grep -c 'lerpLegacy' CHANGELOG.md
4    # v0.8.0 entry's migration-guidance mentions — expected

$ stat -f%z dist/value.js
124936
```

| metric                    | pre  | post | delta |
| ------------------------- | ---: | ---: | ----: |
| `@deprecated` in `src/`   |    1 |    0 |    −1 |
| `lerpLegacy` in `src/`    |    2 |    0 |    −2 |
| `lerpLegacy` in `test/`   |    0 |    0 |     0 |
| `lerpLegacy` in `dist/`   |    1 |    0 |    −1 |
| `dist/value.js` size (B)  | 124988 | 124936 | **−52** |

`dist/math.d.ts` post-edit (full file):

```ts
export declare function clamp(value: number, min: number, max: number): number;
export declare function scale(value: number, fromMin: number, fromMax: number, toMin?: number, toMax?: number): number;
export declare function lerp(start: number, end: number, t: number): number;
export declare function logerp(t: number, start: number, end: number): number;
export declare function deCasteljau(t: number, points: number[]): number;
export declare function cubicBezier(t: number, x1: number, y1: number, x2: number, y2: number): number[];
export declare function interpBezier(t: number, points: number[][]): number[];
export declare function cubicBezierToSVG(x1: number, y1: number, x2: number, y2: number): string;
export declare function cubicBezierToString(x1: number, y1: number, x2: number, y2: number): string;
```

`lerpLegacy` type signature is gone; flat-dist layout intact (per W12-unblocker).

**F2 invariant post-state**: SATISFIED (`grep '@deprecated' src/` returns ZERO).

---

## 4. Gate verdicts

| gate                | command                                  | verdict |
| ------------------- | ---------------------------------------- | :-----: |
| build               | `npm run build`                          | **GREEN** — built in 810ms, 124.93 kB |
| vitest              | `npx vitest run`                         | **GREEN** — 1584 / 34 PASS |
| lint                | `npm run lint`                           | **GREEN** — exit 0 |
| proof:resolution    | `npm run proof:resolution`               | **GREEN** — contract-v2 satisfied |
| vue-tsc             | `npx vue-tsc --noEmit` error-count       | **GREEN** — 0 errors (F.W1 Lane C baseline held) |
| dist/ lerpLegacy    | `grep -c lerpLegacy dist/value.{js,cjs,d.ts}` | **GREEN** — 0 matches |
| dist/math.d.ts shape | flat-dist layout intact (no lerpLegacy) | **GREEN** |

---

## 5. Sub-gate A verdict

**PASS.**

- `grep -rn '@deprecated' src/` → **0** (F2 invariant SATISFIED).
- `grep -rn 'lerpLegacy' src/ test/` → **0**.
- `grep 'lerpLegacy' dist/*` → **0** matches across rebuilt dist/.
- vitest 1584/34 GREEN; lint GREEN; proof:resolution GREEN; vue-tsc 0 errors.
- `dist/value.js`: 124988 → 124936 (−52 B).
- CHANGELOG.md v0.8.0 entry authored at top, dated 2026-05-21, with BREAKING +
  INTERNAL + DEFERRED→ZERO + DEPS sections per F.md §8.

The **sole BREAKING change** for v0.8.0 has landed. `@deprecated` count in
`src/` is now permanently zero. The F-thesis closing is in place; v0.8.0 is
the BREAKING release.

---

## 6. Files written by Lane A

1. `src/math.ts` — deleted `lerpLegacy` const + JSDoc (lines 33–45 pre-edit).
2. `src/index.ts` — removed `lerpLegacy` from math barrel export (line 166 pre-edit).
3. `CHANGELOG.md` — prepended v0.8.0 entry.
4. `docs/tranches/F/audit/F.W3-lane-a-lerplegacy-delete.md` — this file.

Zero touches outside the declared file bounds. No git ops (orchestrator owns
the index per F.W3.md Lane A discipline).
