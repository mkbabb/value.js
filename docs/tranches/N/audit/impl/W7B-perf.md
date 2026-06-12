# N.W7.B — perf-truth (the resumed lane)

**Lane**: W7B-PERF-RESUME · **Ownership**: `src/**`, `test/**` · **Status**: GREEN
(all four gates pass; every B3 item evidenced by a named test).

This lane was killed mid-flight by a session limit. It is resumed from the shared
task ledger (#36–#40) and the uncommitted tree it left behind. The resume mandate
was VERIFY-DON'T-TRUST: re-derive each "completed" task against the tree, finish
#39, then run all gates. The dead lane's work held up under verification — no
re-do was needed beyond finishing #39's test and gating.

> Scope note: prettier-eviction + parse-that `^0.9` + the CI size-gate re-target
> were the *sibling* W7B-dist lane (committed `0deca84`), not this one. This lane
> owns the in-`src` perf-truth slice: the `lerpArray` disposition, the
> endpoint-cache B3 fixes, the predispatch dedup, and F7's collision test.

---

## 1 — #36 `lerpArray` disposition: KEEP, verified against a real consume-edge

**Charter default leaned DEMOTE** (§4 W7.B: "or demote `lerpArray` from the
barrel … decide, don't carry"; E1's premise was zero non-test callers). The dead
lane chose KEEP. The resume verified the KEEP against the tree, not the prose:

- `keyframes.js/test/lerparray-adopt.test.ts` (READ-ONLY sibling) **imports
  `lerpArray` from `@mkbabb/value.js`** and locks it as a cross-repo consume-edge:
  (a) API lock — `typeof lerpArray === "function"`; (b) semantics lock —
  `lerpArray(from, to, t, out)` writes `out` in place as `(1-t)·from + t·to`;
  (c) a K=8 cube-transform equivalence witness that one `lerpArray` call over
  packed `Float64Array` segment buffers reproduces `interpFrames`. This is the
  J.W6 S2 ADOPT.

So `lerpArray` is **not** an orphan: it generalized to the downstream animation
engine it was built for (keyframes.js's `FrameCompiler` SoA path), not to
value.js's own interp loops — which genuinely cannot adopt it (`lerpColorValue`
has a per-channel hue special-case + heterogeneous destination writes;
`interpolateDecomposed` is one-shot). The charter's DEMOTE premise ("zero
non-test callers") is **false at the cross-repo boundary**; KEEP is the correct
resolution of "decide, don't carry."

The dead lane's docstring rewrite (`src/math.ts`) records exactly this: the
consume-edge contract, the real downstream consumer named, and the
value.js-internal non-adoption rationale. Verified accurate; kept.

## 2 — #37 endpoint-cache B3 fixes: all four items have code + a regression test

All in `src/units/normalize.ts` (+ the `src/index.ts` re-export). Verified each
against the tree and locked each with a named test in
`test/computed-endpoint-cache.test.ts`:

| B3 item | Code | Named test |
|---|---|---|
| **F1 — container-resize staleness** | `bumpLayoutEpoch()` is the single bust; doc says value.js has no element handle, so a `ResizeObserver` is consumer-wired to it | `N.W7.B-B3.F1 … › a container-resize bump re-resolves a computed leaf` |
| **F1 — var()-mutation staleness** | `bumpLayoutEpoch()` clears the memo wholesale (`getComputedValue.cache.clear()`) + the C1 endpoint cache self-invalidates via the epoch stamp; doc states var() writes are NOT layout events and the consumer MUST bump after an imperative write | `N.W7.B-B3.F1 … › a var() mutation mid-animation serves stale endpoints UNTIL bumpLayoutEpoch()` (asserts both the documented stale read AND the post-bump re-resolve) |
| **F2 — LRU-bounded memo** | `maxCacheSize: COMPUTED_MEMO_MAX_ENTRIES` (4096) wired into `getComputedValue`'s memoize options; the memoize is genuinely LRU (promote-on-hit + evict-head — verified `src/utils.ts:127–164`), not FIFO | `N.W7.B-B3.F2 … › flooding distinct computed leaves never exceeds the LRU ceiling` + `… › a recently-used leaf survives a flood of cold leaves (LRU, not FIFO)` |
| **F7 — stale docstring** | `getComputedValue`'s doc corrected from `(value.toString(), element-id)` → `(value-unit-instance-id, element-id)` (matches the actual `keyFn` using `getValueUnitId`); a STALENESS CONTRACT block added | covered by the C2 stable-id tests already in the suite + the F2 LRU tests above |

`COMPUTED_MEMO_MAX_ENTRIES` is exported from the barrel (`src/index.ts`) and
present in the built `dist/index.d.ts` + `dist/units/normalize.d.ts`.

## 3 — #38 predispatch dedup: real, single decision tree

`src/units/interpolate.ts`. The predispatch (`prepareInterpVar` stamping
`_lerp`) and the runtime fallback (inside `lerpValue` when no `_lerp`) formerly
duplicated the kind-dispatch decision **with a divergent branch order** (the old
fallback was numeric→color→computed; the predispatch was computed→color→numeric).
The dead lane collapsed both onto one `resolveLerpFn(iv)`:

- `prepareInterpVar`: `iv._lerp = resolveLerpFn(iv) ?? lerpNumericValue`
- `lerpValue`: `const fn = iv._lerp ?? resolveLerpFn(iv); return fn ? fn(t, iv) : iv.value`

Verified the dedup is behavior-preserving: the new numeric route goes through
`lerpNumericValue` (`value.value = lerp(start.value, stop.value, t); return value`),
byte-identical to the old inline `iv.value.value = lerp(...)` branch. The
externally-constructed escape hatch (`resolveLerpFn → undefined → iv.value`
verbatim) is preserved. The branch order now matches `prepareInterpVar`'s
original (computed-first, which is the governing dispatch since a computed leaf
can carry a color shape downstream).

Locked with `test/units-interpolate.test.ts` › `prepared and unprepared paths
agree across numeric/color kinds` — a prepared iv and an unprepared clone must
produce byte-identical output across t∈{0,.25,.5,.75,1} for numeric and color
kinds, guarding the two paths against future drift.

## 4 — #39 F7 custom-name-shadows-built-in: doc (landed) + test (added)

The **precedence doc comments** on both `registerColorNames` and `parseCSSColor`
landed in the committed W7B-dist commit (`0deca84`) — they state custom names
SHADOW the built-in spec name they collide with (the map is consulted before the
rich parser). This lane added the **regression test** the F-handoff left open
(B3 F4), in `test/tranche-f.test.ts` › `a custom name SHADOWS the built-in it
collides with (precedence)`:

- baseline built-in `red` is captured;
- `registerColorNames({ red: "#00ff00" })` then `parseCSSColor("red")` resolves
  to **green** (custom wins; `notDeepEqual` to the built-in + `g > r`);
- case-insensitive: `RED` hits the same lowercased key;
- `clearCustomColorNames()` **restores** the built-in (`deepEqual` to baseline).

## 5 — Gates (#40)

| Gate | Result |
|---|---|
| `npx vitest run` | **1709 passed**, 41 files, 0 failed |
| `npm run build` | green — `dist/value.js` 140.12 kB gzip 43.05 kB + d.ts emitted (741ms) |
| `npm run lint` | exit 0 (`--max-warnings=0`) |
| `npm run typecheck` | exit 0 (`tsconfig.lib.json` + `tsconfig.demo.json`) |

glass-ui dist verified healthy before typecheck (551 `.d.ts`,
`styles/segmented-tabs.css` present) — no flap, no rebuild needed.

The three affected test files alone: 53 passed (`tranche-f` 17,
`computed-endpoint-cache` 10, `units-interpolate` 26).

## 6 — Tree state at lane close

Uncommitted (this lane + the dead lane it resumed; the lead integrates — no
commit/push per the rules):

- `src/math.ts` — `lerpArray` docstring (KEEP + consume-edge rationale)
- `src/units/interpolate.ts` — `resolveLerpFn` dedup
- `src/units/normalize.ts` — B3 F1/F2/F7 (epoch+memo bust, LRU bound, docstrings,
  `COMPUTED_MEMO_MAX_ENTRIES`)
- `src/index.ts` — `COMPUTED_MEMO_MAX_ENTRIES` re-export + doc refresh
- `test/computed-endpoint-cache.test.ts` — F1/F2 regression tests
- `test/units-interpolate.test.ts` — dedup-agreement test
- `test/tranche-f.test.ts` — F7 collision/shadow test

Not touched by this lane: the staged `CHANGELOG.md`/`CONTRIBUTING.md`/
`VENDOR-POLICY.md` deletions, `docs/precepts` submodule, the untracked `$OUT`
stray (Jun-3 artifact, pre-dating this lane — N.W8.B's disposition).

## 7 — Remaining W7.B items NOT in this lane's ledger

For the lead's tracking — §4 W7.B also lists, as already-shipped by the sibling
W7B-dist lane (`0deca84`): prettier eviction from dist (586→283KB unpacked),
parse-that `^0.9` re-pin (the F9 `console.error` diagnostic leak closed
structurally), and the CI size gate re-pointed at `npm pack` unpackedSize. The
"prune the flat direct paths" item (oklab/oklch 1.03–1.08×, gamutMap-dominated)
and the `mixColors → frozen-plan` demo re-route remain open W7.B work outside
this resumed lane's `src/test` ledger.
