# D.W1 — Contract-v2 + library barrel + test coverage + lint + Color storage transposition

**Opens after**: D.W0 close.
**Lanes**: **8 lanes** — L1–L5 contract-v2 (per `research/Dh-contract-v2.md §2`); L6 library barrel completeness + 4 small fixes from the library-perf research+challenge round (`audit/D-LIB-OPTIMIZATION-SYNTHESIS.md`); L7 test coverage + lint + targeted decompose tests; **L8 (NEW) Color<T> storage transposition** — the load-bearing perf+ergonomic win identified by Di and confirmed by CHALLENGE-Di. Commits per-lane.
**Status**: planned.

## Scope

glass-ui shipped contract-v2 at `ce5aad8` / v1.9.3 (abrogates the `development` dev-resolution condition; mandates `build:watch`; inverts `proof-resolution-contract.mjs` to forbid-what-it-once-required). The fleet precept SHA `68d9b20` codifies it (advanced at D.W0). D.W1 ships value.js's compliance AND closes the library-publisher hygiene gaps the B.W3 audit recorded but routed forward.

### L1 — `package.json` `exports` + `build:watch`

`package.json:23-27` currently carries the 4-key `{development, types, import, default}` shape. Contract-v2 forbids `development` in the map.

1. Edit `package.json` `exports["."]`: delete the `development` key. Final shape: `{types, import, default}`. The `default` key still resolves dev consumers because Vite + the dev demo consume via the published surface, not via the `development` condition.
2. Add `"build:watch": "vite build --mode production --watch"` to `scripts`.
3. Verify all subpath exports follow the 3-key shape (value.js's `.` is the only export today; if others exist they must conform).

### L2 — `vite.config.ts` strip `demoConditions` + `demoServerFsAllow`

`research/Dh-contract-v2.md §2 L2` cites `vite.config.ts:45` (`demoConditions`, 3 callsites) and line 50 (`demoServerFsAllow`, 2 callsites). Contract-v2 strikes both.

1. Delete the `demoConditions` constant + every callsite (the demo modes — dev / gh-pages / hero-lab — no longer need `resolve.conditions: ["development", ...]`).
2. Delete the `demoServerFsAllow` constant + every callsite (the sibling-`src/` `fs.allow` widening is gone; value.js no longer reaches into glass-ui's source via the dev condition).
3. Verify the demo dev server still boots and resolves `@mkbabb/glass-ui` correctly via the published `default` (or `import`) condition.
4. Rewrite the surrounding comment to reflect contract-v2 (no `development`, no sibling widening — the fleet resolves via the bundler/runtime condition).

### L3 — port `scripts/proof-resolution-contract.mjs`

`research/Dh-contract-v2.md §2 L3` says port verbatim from glass-ui. The script must check value.js's compliance:

1. Read `/Users/mkbabb/Programming/glass-ui/scripts/proof-resolution-contract.mjs` (or the contract-v2 version at `ce5aad8`).
2. Port to `scripts/proof-resolution-contract.mjs` in value.js, adapting paths.
3. The script asserts: zero `development` keys in `package.json` `exports`; `build:watch` script exists; consumer `resolve.conditions` carries no `development`; zero hard `dist/` aliases.
4. Add `"proof:resolution": "node scripts/proof-resolution-contract.mjs"` to `scripts`.
5. Run it: expect green.

### L4 — precepts submodule advance

Already done at D.W0 Lane 0 (`3c32fae → 68d9b20`). This lane verifies the precept content (`docs/precepts/cross-repo-dev-resolution.md` or equivalent) describes contract-v2.

### L5 — refresh `coordination/Q.md §9` keyframes.js convergence

D.W0 Lane B already authored the refreshed §9 framing. This lane re-verifies post-W1: with value.js now contract-v2 compliant, the fleet status is glass-ui ✓ / value.js ✓ / keyframes.js code-side ✓ (precept-pin off-target). Update the §9 status table.

### L6 — library barrel completeness (Da §3 item 10 — the G1-G11 library gaps)

`research/Dh-contract-v2.md` and `research/B-W3-library-gap.md` recorded 11 library API surface gaps (G1-G11). The load-bearing ones for D:

- **G1** — `registerColorNames`/`clearCustomColorNames` (`src/parsing/color.ts:520,526`) are public functions absent from the `src/index.ts` barrel; the demo deep-imports them via `@src/parsing/color`. Add to the barrel; the demo migrates to `@mkbabb/value.js` (or the published path).
- **K5** — `solveCubicBezierX` (`src/easing.ts:128`) is a private-feeling helper exported nowhere. Per Da §3 item 5 it's a zero-cost public-API completion; add to the barrel.
- **G2..G11** — the remaining 9 gaps from `B.W3-library-gap.md` (parser surface coverage, color-space helpers, ValueUnit ergonomics, transform/decompose ergonomics, quantize public API completeness). Per-gap disposition in `audit/D.W1-library-barrel.md`: ship to barrel, or leave with a recorded rationale.

**Library-perf research+challenge fold-ins** (per `audit/D-LIB-OPTIMIZATION-SYNTHESIS.md §1-2`, items L6/L7/L10/L14/C1):
- **L6** — `parseCSSValue("inherit"|"unset"|"initial"|"revert")` loses its `CSSWideKeyword` `superType` because `ValuesValue` (the public combinator) drops the keyword branch; verified at `src/parsing/index.ts:251` (Dm + CHALLENGE upheld). 1-line restoration in the public combinator chain.
- **L7** — color function names are case-sensitive (`RGB(...)` / `OKLCH(...)` / `CALC(...)` rejected) despite CSS Color L4 + CSS Values 4 mandating ASCII case-insensitivity. Replace `string("rgb")` etc. with `istring("rgb")` in `src/parsing/color.ts` + `src/parsing/math.ts` color function entries; `colorMixSpace` already uses `istring` (internal inconsistency confirms the bug). Per Dm cross-cutting + CHALLENGE upheld.
- **L10** — export `type TimingFunction = (t: number) => number` from `src/easing.ts` and the barrel. keyframes.js parallel-defines the same 3-line type; value.js exports no equivalent (no `EasingFunction` either). Per Dn K7 + CHALLENGE upheld.
- **L14** (optional, KISS-aligned) — replace `nameParser`'s 156-branch `any()` (`src/parsing/index.ts`) with `parse-that`'s `dispatch(map)` (shipped, currently unused). Modest speedup; deletes a hand-rolled loop. Per Dm HP3 + CHALLENGE upheld with branch count correction.
- **C1** — rename value.js's `AnimationOptions` (in `src/parsing/extract.ts:16-25`, the CSS-shorthand-string type) to `CSSAnimationOptions` to break the silent shadow with keyframes.js's same-named engine-options type. Per Dn K6 + CHALLENGE upheld. The keyframes.js-side import update files in `coordination/Q.md §9`.

**Sub-gate L6**: every G1-G11 finding has a disposition in `audit/D.W1-library-barrel.md`; the 5 library-perf fold-ins above land (CSSWideKeyword fix verified by a `parseCSSValue("inherit")` unit test; case-insensitivity verified by `RGB(1,2,3)` parse; `TimingFunction` type exported; `nameParser` replaced or recorded as deferred; `CSSAnimationOptions` rename committed); barrel additions verified by `grep`; `npm run proof:resolution` still green.

### L7 — test coverage for B.W3-committed `src/` WIP + `lint` script (Da §3 item 19 + D-HARDEN-6 §1 clause 26)

B.W3 committed 5 untracked library files (`src/parsing/{animation-shorthand,extract,serialize,stylesheet}.ts`, `src/units/interpolate.ts`) that are re-exported from `src/index.ts` but had no test coverage. The orchestrator records them as committed-with-no-tests; D.W1 adds vitest coverage:

1. `test/parsing-animation-shorthand.test.ts` — exercise the public `parseAnimationShorthand` (or whatever the file exports) against ~10 representative CSS animation-shorthand inputs; assert the parsed shape.
2. `test/parsing-extract.test.ts` — value-extraction helpers.
3. `test/parsing-serialize.test.ts` — round-trip parse-then-serialize for representative inputs.
4. `test/parsing-stylesheet.test.ts` — stylesheet-level parsing.
5. `test/units-interpolate.test.ts` — value interpolation across a few unit shapes.

Each spec is ~15-40 tests. Target: vitest 1409 → ~1500+ (the exact count depends on coverage breadth recorded at wave open).

**`lint` script** — the D-opening directive said "Run linting and type checking to validate your changes at every interval." Per D-HARDEN-6 §1 clause 26: `package.json` carries no `lint` script today. Add `"lint": "eslint . --max-warnings=0"` (or the project's existing ESLint config; if no eslint config exists, add a minimal one — `.eslintrc.cjs` referencing `@vue/eslint-config-typescript` + the project's prefs). The `lint` script becomes part of every wave's gate matrix.

**Library-perf research+challenge fold-ins** (per `audit/D-LIB-OPTIMIZATION-SYNTHESIS.md §2`, items L9 + L13):
- **L9** — targeted `test/decompose.test.ts` cases. `test/refactor-fixes.test.ts:221-355` already covers identity/translation/rotation+translation/slerp (CHALLENGE-Dk reduced the original "no coverage" claim). Add the genuine gaps: scale-only, skew-only, perspective-only, full-compose round-trip (`recomposeMatrix3D(decomposeMatrix3D(m)) ≈ m`), and the 4 quaternion-extraction branches (positive trace / max-x-diagonal / max-y-diagonal / max-z-diagonal). ~40 LoC + `test/colorFilter-spsa.test.ts` for the SPSA optimizer Dk missed (305 LoC of `colorFilter.ts` untested).
- **L13** (optional, benchmark-gated) — `k-means` convergence threshold relaxation. CHALLENGE-Dk PARTIAL UPHOLD with measurement: a noisy-photo synthesis shows 3× speedup (9→3 Lloyd iterations) when the `1e-10` squared-OKLab threshold is relaxed toward the JND threshold (`DELTA_E_OK_JND = 0.02²`). Couple with `maxIterations=10` — relax threshold AND lower max-iter together, or neither (the cap may be doing the actual gating today). Gate on a fresh micro-benchmark; do not change if the benchmark doesn't reproduce.

**Sub-gate L7**: 5 new src/-WIP test files exist + the targeted decompose cases (scale/skew/perspective/full-compose + 4 quaternion branches) + a `colorFilter` spec; `vitest run` count rises; `npm run lint` green; the `lint` step appears in CI; the optional k-means tune lands iff the micro-benchmark shows ≥ 2× speedup, else routed forward with the recorded benchmark.

### L8 — Color<T> storage transposition (NEW — the load-bearing perf+ergonomic win)

Per `audit/D-LIB-OPTIMIZATION-SYNTHESIS.md §1 L1` — the largest-evidence finding across Di's V8 audit. Confirmed by CHALLENGE-Di as the post-challenge top P1.

**Problem**: `src/units/color/index.ts` stores `Color<T>` components as `Map<string, T>` (with a `[key: string]: any` TS index-signature). Every channel read (`color.components.get("r")`) is a `Map.get` call; every `clone()` does a double-init through Map+forEach; every lerp/normalize iteration calls `.keys()`/`.values()`/`.entries()` which allocate fresh arrays per call (~8 `Map.get` calls per `InterpolatedVar` per frame). The Map storage is contraindicated by V8 — it's a per-channel hidden-class miss vs own-property monomorphic-cell access.

**Transposition**: flatten the 15 color spaces' components to own properties on a single `Color<T>` shape. Each space class (`RGB<T>`, `HSL<T>`, `OKLab<T>`, etc.) declares its component fields directly:

```ts
class OKLab<T = number> extends Color<T> {
    declare L: T;
    declare a: T;
    declare b: T;
    declare alpha?: T;
    // ... constants + conversion methods unchanged
}
```

Replace `color.components.get("L")` consumers with `color.L`. The conversion methods through the XYZ hub stay; only the storage shape changes. Estimated ripple: ~20 consumer files across `src/units/color/` + `src/parsing/color.ts`, all mechanical.

Net effect (per Di + CHALLENGE-Di evidence):
- Eliminates `Map.get` per channel-read in `lerpColorValue`, `mixColors`, `color2`, `normalizeColorUnit`, every gamut-map step.
- Eliminates the `.keys()`/`.values()`/`.entries()` per-frame allocations.
- Hidden-class stability — every `OKLab<T>` instance shares the same shape; V8's inline cache stays monomorphic.
- Preserves the public API (consumers still see typed `.L`, `.a`, `.b` access — better, in fact, than the string-keyed Map).

**Recursion-prevention hardening primitives** (REACTIVITY-A `audit/D-REACTIVITY-A-recursion.md §5` — REQUIRED, not optional; fold INSIDE the L8 commit, not later, per the agent's "critical follow-up" verdict):

The Mar-2026 bug (`80cdd59` fix of `35cd9d5`'s latent 19-month nesting bug) gave us one canonical unwrap loop at `src/units/color/normalize.ts:102`. Map-keyed storage was an implicit chokepoint (channels read via `map.get(key)`); flattening to own properties REMOVES that chokepoint, so we must replace it with 4 cooperating safeguards:

- **(a)** **`ColorChannel<T>` TypeScript brand** — `type ColorChannel<T> = T & { readonly __color_channel: unique symbol }`. Every color-space class declares its fields as `ColorChannel<T>` (e.g. `class OKLab<T extends number = number> { declare L: ColorChannel<T>; declare a: ColorChannel<T>; … }`). Compile-time rejection of `instance.L = colorInstance`. Zero runtime cost (brands erase). Recommended by REACTIVITY-A §5(a).

- **(b)** **`assertNotNested` dev-only assertion** — inside every `Color` / `ValueUnit` setter, gated behind `import.meta.env.DEV` (Vite inlines this constant; production strips the check). Throws on `value instanceof Color` / `value instanceof ValueUnit` when a scalar is expected. Recommended by REACTIVITY-A §5(b). Verify Vite NODE_ENV inlining via a `dist/value.js` grep — the `if (import.meta.env.DEV)` block must be absent from the production bundle.

- **(c)** **vitest regression suite** — 3 named tests in `test/recursion-guard.test.ts` (NEW):
  - `294-frame-replay` — simulate iOS Safari's smaller stack: build a `colorUnit2(c)` chain at depth 294, assert `clone()` doesn't stack-overflow.
  - `clone-no-amplify` — `Color → clone → clone → clone` of a deeply-nested ValueUnit; assert depth never grows.
  - `depth-3-nest` — intentionally construct `new ValueUnit(new ValueUnit(new ValueUnit(5)))`, pass through `colorUnit2`/`normalizeColorUnit`, assert the result is depth-1.

- **(d)** **`clone()` depth-guard** — if `clone` detects a structure deeper than 16 levels, throw with a stack trace. Cheap (single integer increment per clone-call); only fires on the bug pattern. Diagnostic-only — the depth-16 ceiling is well above any legitimate nesting.

Plus the **`Color.clone()` rewrite must use per-channel explicit construction** (REACTIVITY-A §6 Option III) — `new Constructor()` with no args is fragile under own-property storage; `Object.assign(new ChildClass(), this)` would shallow-copy and miss the brand. The clone strategy:
```ts
clone(): this {
    const c = new (this.constructor as any)() as this;
    for (const k of this.channels) (c as any)[k] = (this as any)[k];
    return c;
}
```
(or a typed equivalent — sketch only; implementation lands at L8 execution). The clone must be tested under the (c) regression suite.

**L8 acceptance gate — microbenchmark** (REACTIVITY-B §7(d) — REQUIRED, not optional; per the agent: "the only way 'instant-reactivity' claims become measurement evidence"):

Author `bench/color-channel-access.mjs` (≤ 30 lines). Two scenarios: (1) pre-L8 Map.get per-channel read in a tight 1M-iteration loop; (2) post-L8 own-property read in the same loop. Record both timings. **Acceptance**: post-L8 ≥ 5× faster on Node ≥ 20 (V8 own-property inline-cache vs Map-prototype dispatch). If the benchmark doesn't show ≥ 5×, the L8 thesis is wrong — STOP and re-evaluate.

**Sub-gate L8** (extended): `grep -rn '\.components\.get\b\|\.components\.set\b\|\.components\.keys\b\|\.components\.values\b\|\.components\.entries\b' src/ demo/` returns zero (or recorded exceptions); every color-space class declares its component fields as `ColorChannel<T>` (the brand from primitive (a)); the dev-assertions from (b) are present in `Color` and `ValueUnit` setters and DEV-gated; the 3 regression tests from (c) all green; the depth-guard from (d) is in `clone()`; the L8 microbenchmark shows ≥ 5× channel-read speedup; `vitest` 1409+ (no regression); `npm run build` clean; production bundle grep for `import.meta.env.DEV` returns zero (the dev-assert blocks stripped); REACTIVITY-B §3's `isReactive(color) === false` regression test added; library bundle size delta recorded (expect ≤ +5%).

## File bounds

| Lane | Files |
|---|---|
| L1 | `package.json` |
| L2 | `vite.config.ts` |
| L3 | `scripts/proof-resolution-contract.mjs` (new), `package.json` (add `proof:resolution` script — touches L1's package.json; orchestrator sequences L1 then L3) |
| L4 | (no edits — verification; the bump landed at D.W0) |
| L5 | `docs/tranches/D/coordination/Q.md` |
| L6 | `src/index.ts` (barrel additions per the G1-G11 dispositions), `src/parsing/index.ts` (CSSWideKeyword fix), `src/parsing/color.ts` + `src/parsing/math.ts` (case-insensitivity), `src/easing.ts` (TimingFunction type export), `src/parsing/extract.ts` (AnimationOptions → CSSAnimationOptions rename), optional `src/parsing/index.ts` `nameParser` (dispatch refactor), demo consumers per the gap dispositions, `audit/D.W1-library-barrel.md` (new) |
| L7 | `test/parsing-{animation-shorthand,extract,serialize,stylesheet}.test.ts` + `test/units-interpolate.test.ts` + `test/decompose.test.ts` (extends `refactor-fixes` with scale/skew/perspective/full-compose + 4 quaternion branches) + `test/colorFilter-spsa.test.ts` (new — SPSA optimizer), `package.json` (`lint` script), `.eslintrc.cjs` (new if absent), `.github/workflows/node.js.yml` (add `npm run lint` step), optional `src/quantize/cluster.ts` (k-means threshold tune gated on benchmark) |
| L8 | `src/units/color/index.ts` (the 15 color-space classes — Map → own properties), `src/units/color/utils.ts` (XYZ-hub readers consume own-property channels), `src/units/color/normalize.ts` (iteration over channels), `src/parsing/color.ts` (parsers construct via own-property assignment), ~15 consumer files in demo/ — all mechanical |

## Gate

**Sub-gate D.W1** (numbered conditions — 7, one per lane plus the wave-level conjunction):
- D.W1-L1: `package.json exports["."]` has exactly `{types, import, default}`; `build:watch` script exists.
- D.W1-L2: `vite.config.ts` carries no `demoConditions` / `demoServerFsAllow`.
- D.W1-L3: `npm run proof:resolution` green.
- D.W1-L4: precepts pinned at `68d9b20`; the precept doc describes contract-v2.
- D.W1-L5: `coordination/Q.md §9` reflects the fleet status post-W1.
- D.W1-L6: G1-G11 each has a disposition recorded; barrel migrations verified by grep.
- D.W1-L7: 5 test files added; `npm run lint` green; CI has the `lint` step.

Wave-level: `npm run build` clean; `npm run dev` boots and resolves `@mkbabb/glass-ui` via the published surface (1280×800 light Playwright probe — zero console errors, picker renders); `vue-tsc` unchanged; smoke 3/3.

## Verification artefacts

`audit/D.W1-contract-v2.md` — the before/after diffs (`package.json`, `vite.config.ts`), the new `proof-resolution-contract.mjs` output, the boot probe captures, the updated `coordination/Q.md §9` status.

## Commit plan

- `feat(library/w1): align to contract-v2 — drop development condition, add build:watch + proof-resolution-contract.mjs` — L1-L5.
- `feat(library/w1): close library barrel — G1-G11 + CSSWideKeyword + case-insensitivity + TimingFunction + AnimationOptions rename + nameParser dispatch (optional)` — L6.
- `test(library/w1): vitest coverage for the 5 B.W3-committed src/ WIP files + decompose scale/skew/perspective + colorFilter SPSA + lint script + CI step + optional k-means tune` — L7.
- `refactor(library/w1): flatten Color<T> components from Map to own properties — V8 hidden-class stability across the lerp/mixColors/color2 hot paths` — L8.

## Dependencies

- Depends on: D.W0 (precept advance).
- Blocks: D.W2 + D.W3 (contract-v2 resolution stable; library barrel finalized).
