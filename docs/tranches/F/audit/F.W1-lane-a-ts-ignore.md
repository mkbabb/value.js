# F.W1 Lane A — Strengthen the sole `@ts-ignore` in src/

**Date**: 2026-05-21
**Branch**: `tranche-f`
**HEAD at dispatch**: `bdfecf2` (F.W0 close)
**Scope**: docs/tranches/F/waves/F.W1.md Lane A
**File bounds**: WRITE `src/utils.ts`, `docs/tranches/F/audit/F.W1-lane-a-ts-ignore.md`. No other writes.

---

## 1. Audit doc path-discrepancy

F-AUDIT-5 §5.3 cited the offending site as `src/parsing/utils.ts:146`. The actual
location is `src/utils.ts:146` — same line number, but in `src/utils.ts`, not
`src/parsing/utils.ts`. Verified pre-edit:

```
$ grep -rn '@ts-ignore' src/
src/utils.ts:146:    // @ts-ignore
```

Exactly one match across `src/`. The audit's `parsing/` segment is the only
discrepancy; the `:146` line number is correct. No grammar/parsing-utils file
was touched.

---

## 2. The shape of the problem

`memoize<T>` (lines 104–150 pre-edit) was already publicly typed to return
`T & { cache: Map<string, { value: ReturnType<T>; timestamp: number }> }` — i.e.
the function value plus a `.cache` Map. But the internal implementation:

1. Cast the function expression to bare `T` (line 144) instead of the
   intersection.
2. Assigned `memoized.cache = cache` (line 147) — a property the cast `T` did
   not declare — requiring `// @ts-ignore` on line 146.
3. Returned `memoized as any` (line 149) — an `any` cast papering over the same
   declared/intersection gap.

The public promise was already correct; the internal types were lagging. The
idiomatic fix is to give the internal variable the intersection type that
matches the return annotation.

---

## 3. Edits applied (three surgical sites)

### 3a. New `Memoized<T>` type alias (added above `memoize`)

```ts
export type Memoized<T extends (...args: any[]) => any> = T & {
    cache: Map<string, { value: ReturnType<T>; timestamp: number }>;
};
```

This is a named alias for the same intersection that `memoize`'s return
annotation already spells out inline.

### 3b. `memoize` return annotation collapses to `Memoized<T>`

```diff
 export function memoize<T extends (...args: any[]) => any>(
     func: T,
     options: MemoizeOptions<T> = {},
-): T & { cache: Map<string, { value: ReturnType<T>; timestamp: number }> } {
+): Memoized<T> {
```

Externally-visible signature unchanged (alias of the existing intersection).

### 3c. Inner cast widens from `T` to `Memoized<T>`; `@ts-ignore` + `as any` removed

```diff
         return result;
-    } as T;
+    } as Memoized<T>;

-    // @ts-ignore
     memoized.cache = cache;

-    return memoized as any;
+    return memoized;
 }
```

With `memoized` now typed as `Memoized<T>`, the `.cache` assignment satisfies
the structural shape, and the bare `return memoized` matches the function
return annotation without casting.

---

## 4. Public-API sanity check

`memoize` is re-exported in `src/index.ts:185` (the public barrel). Pre-edit
return type: `T & { cache: Map<string, { value: ReturnType<T>; timestamp: number }> }`.
Post-edit return type: `Memoized<T>` = same intersection. **No externally-visible
type change.**

`test/utils.test.ts` (~lines 251–369) exercises `memoize` extensively, including
direct reads on `memoized.cache` (instanceof Map, `.size`, eviction). These
continue to type-check and pass; the test suite did not need any update.

The `Memoized<T>` alias itself is now exported (named export). This is an
additive surface — no consumer required to migrate.

---

## 5. Verification matrix

| Gate | Pre-edit | Post-edit | Verdict |
|---|---|---|---|
| `grep -rn '@ts-ignore' src/` count | 1 (`src/utils.ts:146`) | **0** | PASS |
| `grep -n 'as any' src/utils.ts` count | 1 (line 149) | **0** | PASS |
| `grep -rn '@deprecated' src/` count | 1 (`src/math.ts:34`) | 1 (unchanged) | PASS (out of scope) |
| `npx vue-tsc --noEmit` error count | 118 (F.W0 baseline) | **118** | PASS (no regression; ceiling ≤ 118) |
| `npx vitest run` | 1584 / 34 files | **1584 / 34 files** | PASS |
| `npm run build` | clean | **clean** (`✓ built in 724ms`, dist/value.js 124.98 kB) | PASS |
| `npm run lint` | exit 0 | **exit 0** | PASS |

vue-tsc count anchored to F.W0 baseline of 118 (errors remain in `demo/`, none
introduced by this edit). The Lane A scope mutates only `src/utils.ts`.

vitest run snapshot:

```
Test Files  34 passed (34)
     Tests  1584 passed (1584)
```

Build snapshot:

```
dist/standalone-CSWytAYg.js  113.61 kB │ gzip: 36.19 kB
dist/value.js                124.98 kB │ gzip: 38.36 kB
dist/postcss-Crs0wH0W.js     197.35 kB │ gzip: 47.16 kB
✓ built in 724ms
```

---

## 6. Approach discipline

- No workaround. The `any` was not replaced by another `any`; it was removed
  by typing the local variable to match the function's existing return promise.
- No public-API downgrade. The return type is alias-identical (`Memoized<T>`
  expands to the prior intersection).
- No new shims. The change is purely internal type-tightening + a named alias
  for the intersection.
- No demo/, no peer-repo, no commits. Working tree changes are confined to
  `src/utils.ts` + this new audit doc.

---

## 7. Sub-gate verdict

**PASS.**

`@ts-ignore` count in `src/` is zero. `as any` removed from `src/utils.ts`.
vue-tsc, vitest, build, lint all green at or under the F.W0 baseline.
Public-API type signature of `memoize` unchanged.

Lane A complete; ready for F.W1 lane integration.
