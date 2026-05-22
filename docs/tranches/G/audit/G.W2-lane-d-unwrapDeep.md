# G.W2 Lane D — `ValueUnit.unwrapDeep()` static (G-OPP-5)

**Branch**: `tranche-g` @ `23ec904` (G.W2 Track-1-β execution).
**Scope**: lift the inlined `while (raw instanceof ValueUnit) raw = raw.value`
unwrap loop — the Mar-2026 iOS-Safari nesting-bug fix — to a first-class static
`ValueUnit.unwrapDeep()`, per `G-AUDIT-5 §9 G-OPP-5` + `G.W2.md §"Lane D"`.

---

## The finding

The "unwrap a (possibly nested) `ValueUnit` to its innermost value" idiom was
inlined across the color pipeline + the parser. The canonical site
(`color/normalize.ts`, inside `colorUnit2`) is the **Mar-2026 iOS-Safari
stack-overflow fix**: conversion functions pass `alpha` through as-is, so a
`ValueUnit<number>`-component color accumulates a `VU<VU<VU<…>>>` layer per
frame; after ~294 frames `clone()`'s recursion overflowed the iOS Safari stack.
The fix collapses each channel back to depth-1 every frame.

Inlined, the guard could silently drift between copies. Per `G-AUDIT-5 §3 DRY-1`
+ `§6`, the idiom belongs in one place — a `ValueUnit` static.

---

## The `unwrapDeep` signature

Added to the `ValueUnit` class in `src/units/index.ts`:

```ts
static unwrapDeep<T>(x: T): T extends ValueUnit<infer V> ? V : T {
    let raw: unknown = x;
    while (raw instanceof ValueUnit) raw = raw.value;
    return raw as T extends ValueUnit<infer V> ? V : T;
}
```

**Conditional return type.** `T extends ValueUnit<infer V> ? V : T` peels exactly
one `ValueUnit` layer at the *type* level: a `ValueUnit<number>` input yields
`number`, a non-`ValueUnit` input yields `T` unchanged. One peel is the honest
static type — a `ValueUnit` payload can itself be a `ValueUnit` *only* via the
bug class this guard exists to defend against, so the type system models the
intended (depth-1) shape while the runtime `while` loop defensively collapses
*every* layer regardless of depth.

The single `as` re-asserts the loop-narrowed `unknown` as the conditional type —
a documented terminal narrowing, not an `as any`.

---

## Inline sites retired

`grep -rn 'instanceof ValueUnit' src/` identified every inline loop. Unwrap-loop
sites (vs. type-discrimination `instanceof` checks, which were left alone):

| # | File:line (pre) | Pre-state | Post-state |
|---|---|---|---|
| 1 | `color/normalize.ts:93-94` | `let raw: any = value; while (raw instanceof ValueUnit) raw = raw.value;` | `ValueUnit.unwrapDeep(value)` — **the canonical Mar-2026 fix** |
| 2 | `color/normalize.ts:42` | `channel instanceof ValueUnit ? channel.value : channel` | `ValueUnit.unwrapDeep(channel)` (single-level case — `unwrapDeep` subsumes it) |
| 3 | `interpolate.ts:60` | `sv instanceof ValueUnit ? sv.value : sv` | `ValueUnit.unwrapDeep(sv)` |
| 4 | `interpolate.ts:61` | `ev instanceof ValueUnit ? ev.value : ev` | `ValueUnit.unwrapDeep(ev)` |
| 5 | `parsing/color.ts:50` | `v instanceof ValueUnit ? v.value : v` | `ValueUnit.unwrapDeep(channelOf(color, key))` |

5 inline unwrap sites retired (the audit estimated "~5"). The single `as any`
that sat alongside site #1 (`let raw: any = value`) is gone with it.

### `instanceof ValueUnit` sites deliberately NOT touched

These are runtime type-*discrimination* checks (decide a branch / read a
non-`.value` field), not unwrap loops — replacing them with `unwrapDeep` would be
wrong:

- `color/normalize.ts:43` — `channel instanceof ValueUnit ? channel.unit : undefined` (reads `.unit`, not `.value`).
- `units/normalize.ts:165`, `parsing/math.ts:240,266,341,484`, `parsing/color.ts:111`, `interpolate.ts:78` — type-narrowing branches.

---

## Sub-gate D evidence

| Check | Gate | Result |
|---|---|---|
| inline unwrap-loop sites retired | ~5 | **5** |
| `npx vitest run` | 1584 / 34 GREEN | **1584 passed / 34 files** |
| `test/recursion-guard.test.ts` (iOS-Safari nesting protection) | GREEN | **5/5 passed** |
| `npx vue-tsc --noEmit \| grep -c "error TS"` | 0 | **0** |

```
$ npx vitest run test/recursion-guard.test.ts | tail
 ✓ test/recursion-guard.test.ts (5 tests)
   ✓ 294-frame-replay: colorUnit2 does not amplify depth across 294 invocations
   ✓ clone-no-amplify: 3 successive clones preserve channel depth
   ✓ depth-3-nest: colorUnit2 collapses VU<VU<VU<…>>> to depth-1
   ✓ isReactive-shape: Color instance carries no Vue reactive marker
   ✓ clone-depth-ceiling: clone() throws beyond depth 16

$ npx vitest run | tail
 Test Files  34 passed (34)
      Tests  1584 passed (1584)
```

The `294-frame-replay` + `depth-3-nest` tests — both of which drive `colorUnit2`,
whose unwrap loop is now `ValueUnit.unwrapDeep` — pass unchanged. The codified
static is behaviour-identical to the inline loop it replaced: the canonical
iOS-Safari stack-overflow defence is preserved as a first-class `ValueUnit`
primitive.

---

## Files modified (Lane D)

- `src/units/index.ts` — added the `ValueUnit.unwrapDeep<T>()` static.
- `src/units/color/normalize.ts` — sites #1, #2 → `ValueUnit.unwrapDeep`.
- `src/units/interpolate.ts` — sites #3, #4 → `ValueUnit.unwrapDeep`.
- `src/parsing/color.ts` — site #5 → `ValueUnit.unwrapDeep` (in
  `resolveToPlainColor`, paired with the Lane C `channelOf` accessor).
</content>
</invoke>
