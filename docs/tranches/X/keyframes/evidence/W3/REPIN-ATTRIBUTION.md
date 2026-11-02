SERVED MODEL: claude-opus-5-5

# KF.W3 `.c1` — the repin 4.0.0 → 4.1.0, with per-RED attribution (G-KF3-3)

Date 2026-11-02. kf `master` `5c48e3da` (uncured, `HEAD`) → **`c18a9bd9`** (the `.c1` commit). Coordinates: OLD `4.0.0` sha1 `ccb962e592fb42e6602fc2bb6afbfb1763788b9d`, NEW `4.1.0` sha1 `d488535c9bfc747e318895417c28a753a3b7b3d6` (each byte-identity checked by the harness against `npm view … dist.shasum`). Instrument: `attribution-harness.mjs` (this directory, unit `.a`), unmodified; scratch trees in the session scratchpad (non-durable — the readings are here).

## 1. The pin

- ⟨`guarded --light -- npm install @mkbabb/value.js@4.1.0 --save-exact`⟩ → `package.json:71` `"@mkbabb/value.js": "4.1.0"`; lock root `dependencies` + `node_modules/@mkbabb/value.js` → `4.1.0`, `integrity` `sha512-K7wcvd+P6rjxxEhwnrSpBVyzYZPs5TMg1zmbe6gOG9s1qaUGZOnProxkZxXgTQfIUqXN81yPFPzB56w9mb95SQ==` = ⟨`npm view @mkbabb/value.js@4.1.0 dist.integrity`⟩. Lock diff = 4 lines (root dep + version/resolved/integrity); nothing else moved.
- ⟨`npm ls @mkbabb/value.js`⟩ → `@mkbabb/value.js@4.1.0` and glass-ui 10.1.2's copy `4.1.0 deduped` (one copy).

## 2. Arm (c) roster — RE-DERIVED at the substrate, never adopted from the spec

⟨`git grep -l -E '@mkbabb/value\.js/css|parseCss(Color|Scalar|Values)|parseTimingFunction|serializeCssValue|reverseAnimationShorthand|cssIdent' HEAD -- test/`⟩ at `5c48e3da`, raw output (18 paths); the same command over the cured worktree returns the identical list (`diff` empty):

```
test/_root/public-surface.test.ts
test/compile/compile-roundtrip.test.ts
test/compile/interp-slot.test.ts
test/compile/roundtrip-fidelity.test.ts
test/compile/structural-emit.test.ts
test/compile/valuejs-contract.test.ts
test/demo/instrument/apply-css-identity.test.ts
test/demo/scenes/square-w13x.test.ts
test/engine/color-fidelity.test.ts
test/engine/computed-resolution.test.ts
test/engine/interpolate-anything.test.ts
test/group/structural-composition.test.ts
test/ingest/keyframes-name-escapes.test.ts
test/physics/raf-degrade.test.ts
test/resolve/emerging-css-resolve-fn.test.ts
test/resolve/emerging-css-resolve-now.test.ts
test/resolve/emerging-css-resolve-p2.test.ts
test/resolve/value4-immutable-resolve.test.ts
```

**Delta vs the spec's frozen arm-(c) list (12 paths at `81a56990`: compile ×4 · engine ×3 · group ×1 · resolve ×4)**: all 12 are returned; **+6**: `_root/public-surface`, `compile/roundtrip-fidelity` (= arm a's runner), `demo/instrument/apply-css-identity`, `demo/scenes/square-w13x`, `ingest/keyframes-name-escapes`, `physics/raf-degrade` (12 + 6 = 18 = the raw output). The excluded-by-name `selector-value4` / `nan-frame` are not returned. No module count is cited as a denominator (X-4 stays KF.W5's).

**Subject set run** = the 18 above ∪ the three O-117 files the regex does not return (`demo/instrument/timeline-hover-preview`, `compile/easing-identity`, `compile/grammar-fuzz`) = 21 paths. Arm (a) = `roundtrip-fidelity` over `test/fixtures/keyframes/` (14 `.css` + `manifest.json`); arm (b) = `compile-roundtrip` over `test/fixtures/compile/{scroll-driven,multi-color-scroll}.css`.

## 3. Attribution — the same 21 files at OLD vs NEW, twice over (uncured `HEAD`, then cured worktree)

⟨`node attribution-harness.mjs --kf …/keyframes.js --test <21 paths> --source HEAD`⟩ → `{"GREEN":17,"VALUE-SIDE":4}`, exit 1 · ⟨`… --source worktree`⟩ (the `.c1` bytes before commit; byte-identical to `c18a9bd9` for every subject path) → `{"GREEN":18,"VALUE-SIDE-CURED":3}`, exit 0. Cell = file outcome OLD→NEW, **verdict** (non-GREEN test ids).

| file | `HEAD` (uncured) | verdict | `.c1` | verdict |
| --- | --- | --- | --- | --- |
| `test/_root/public-surface.test.ts` | passed→passed | **GREEN** (0) | passed→passed | **GREEN** (0) |
| `test/compile/compile-roundtrip.test.ts` | passed→passed | **GREEN** (0) | passed→passed | **GREEN** (0) |
| `test/compile/easing-identity.test.ts` | passed→failed | **VALUE-SIDE** (1) | failed→passed | **VALUE-SIDE-CURED** (1) |
| `test/compile/grammar-fuzz.test.ts` | passed→failed | **VALUE-SIDE** (1) | failed→passed | **VALUE-SIDE-CURED** (1) |
| `test/compile/interp-slot.test.ts` | passed→passed | **GREEN** (0) | passed→passed | **GREEN** (0) |
| `test/compile/roundtrip-fidelity.test.ts` | passed→passed | **GREEN** (0) | passed→passed | **GREEN** (0) |
| `test/compile/structural-emit.test.ts` | passed→passed | **GREEN** (0) | passed→passed | **GREEN** (0) |
| `test/compile/valuejs-contract.test.ts` | passed→passed | **GREEN** (0) | passed→passed | **GREEN** (0) |
| `test/demo/instrument/apply-css-identity.test.ts` | passed→passed | **GREEN** (0) | passed→passed | **GREEN** (0) |
| `test/demo/instrument/timeline-hover-preview.test.ts` | passed→failed | **VALUE-SIDE** (5) | passed→passed | **GREEN** (0) |
| `test/demo/scenes/square-w13x.test.ts` | passed→passed | **GREEN** (0) | passed→passed | **GREEN** (0) |
| `test/engine/color-fidelity.test.ts` | passed→passed | **GREEN** (0) | passed→passed | **GREEN** (0) |
| `test/engine/computed-resolution.test.ts` | passed→passed | **GREEN** (0) | passed→passed | **GREEN** (0) |
| `test/engine/interpolate-anything.test.ts` | passed→passed | **GREEN** (0) | passed→passed | **GREEN** (0) |
| `test/group/structural-composition.test.ts` | passed→passed | **GREEN** (0) | passed→passed | **GREEN** (0) |
| `test/ingest/keyframes-name-escapes.test.ts` | passed→failed | **VALUE-SIDE** (6) | failed→passed | **VALUE-SIDE-CURED** (6) |
| `test/physics/raf-degrade.test.ts` | passed→passed | **GREEN** (0) | passed→passed | **GREEN** (0) |
| `test/resolve/emerging-css-resolve-fn.test.ts` | passed→passed | **GREEN** (0) | passed→passed | **GREEN** (0) |
| `test/resolve/emerging-css-resolve-now.test.ts` | passed→passed | **GREEN** (0) | passed→passed | **GREEN** (0) |
| `test/resolve/emerging-css-resolve-p2.test.ts` | passed→passed | **GREEN** (0) | passed→passed | **GREEN** (0) |
| `test/resolve/value4-immutable-resolve.test.ts` | passed→passed | **GREEN** (0) | passed→passed | **GREEN** (0) |

**Per-RED attribution at `HEAD` (13 ids, 4 files — every one VALUE-SIDE, 0 KF-SIDE, 0 UNATTRIBUTABLE)**, agreeing id-for-id with the O-117 packet §2 trial (`13 failed / 2303`; control at 4.0.0 `105 passed (105)`):

| file | ids | the value.js 4.0.0 → 4.1.0 difference at the bytes |
| --- | --- | --- |
| `timeline-hover-preview` | 5 | `TypeError: decomposeMatrix2D is not a function` — 4.1.0 retired `decomposeMatrix2D/3D` + `Mat4` from `./transform` (X-W9 G27); typecheck at 4.1.0 uncured: exit 2, 3 × TS2305 at `TimelineHoverPreview.vue(276,10)(276,29)(277,15)` |
| `keyframes-name-escapes` | 6 | clause (b) ×5 + clause (c) ×1: 4.1.0's value grammar accepts escaped idents in the declaration-value position, so the escaped sibling now links end to end and the 4.0.0 `PARSE_ERROR` tripwire fired (`expected [] to include 'PARSE_ERROR'`) |
| `easing-identity` | 1 | K1 NEGATIVE CONTROL `expected +0 to be 21`: 4.1.0's `easing()` is memoised (0 of 40 unstable; `easing(n).value === resolveTimingFunction(n)` for all 40; still 31 distinct references) |
| `grammar-fuzz` | 1 | `malformedColourArb` counterexample `oklch()`: R1 cured — `fromString` no longer throws; `PARSE_ERROR` `css_syntax at 0-7: expected scalar, got oklch()` + `EMPTY_PARSE`; `parseStylesheet(css).ok === false` |

**After `.c1`**: the three re-aimed files read **VALUE-SIDE-CURED** — RED at 4.0.0, GREEN at 4.1.0 — which is the proof each now asserts 4.1.0's behaviour rather than a coordinate-blind tautology (`easing-identity` 1 id, `grammar-fuzz` 1, `keyframes-name-escapes` 6). Each negative control's subject is real at BOTH coordinates (GREEN at both): `a\(b` still refused at the stylesheet rule level (`expected rule, got @keyframes a\\\(b …`); `cubic-bezier(0.1, 0.2, 0.3, 0.4)` resolves to a fresh reference per call with grid-equal samples; a degenerate `matrix3d` (scaleX 0) writes no ghost transform. `timeline-hover-preview` reads GREEN at both: the decomposition is kf-owned now, so the file no longer depends on the coordinate.

## 4. Arms (a) and (b), and the manifest

- **Arm (a)** `roundtrip-fidelity` (14 fixtures + manifest): GREEN at 4.0.0 and at 4.1.0, uncured and cured. The single `epsilon` row (value-side oklab float drift) is GREEN at 4.1.0 with the epsilon **unchanged** (`manifest.json` untouched).
- **Arm (b)** `compile-roundtrip` (`scroll-driven`, `multi-color-scroll`): GREEN at both, uncured and cured.
- **Manifest**: no fixture's expected text changed at the repin ⇒ **no divergence row owed by `.c1`** (`git diff 5c48e3da c18a9bd9 -- test/fixtures/` empty). The `serializeCssValue` retirement's own fixture reconciliation is `.c2`'s (`.b` differential: 14 fixtures → 0 divergent).

## 5. Whole-suite gates at `.c1` (kf worktree; the sibling's dirty `KeyframeTimeline.vue` present, never staged)

- ⟨`guarded --light -- npm run check`⟩ → exit **0** ×2 (`proof:structure — PASS … 0 violations across R1–R6`). BEFORE (4.1.0 installed, uncured): exit 2.
- ⟨`guarded -- npx vitest run --maxWorkers=2`⟩ ×4: runs 1 and 4 `Test Files 293 passed | 5 skipped (298)` · `Tests 2290 passed | 2 expected fail | 14 skipped (2306)`; runs 2 and 3 `1 failed | 2289 passed` — the one failure both times `test/demo/app/r4dock-share-fallback.test.ts` (2) `expected [ 145, 145 ] to deeply equal [ +0, 145 ]`, the **pre-existing banked focus/selection timing flake** (`docs/tranches/X/evidence/DS/keyframes/pass-46/test-demo-flake-r4dock.log`; `execution/DS/keyframes.md:2298`, same bytes), no value.js edge (SharePopover × glass clipboard); in isolation ⟨×3⟩ `1 passed (1)` each. Not this unit's concern; named for `.d`.
- Count reconciliation: packet trial `2274 passed + 13 failed = 2287` non-skip; `.c1` adds 3 tests (hover-preview +2 volumetric/degenerate, easing-identity +1 split control) and nets 0 in name-escapes (clause b 6→5, clause c 1→2) ⇒ 2290 ✓.

## 6. G-KF3-8 (declared floor) re-read at 4.1.0

⟨`git grep -n -E 'bounceInEase|cssTwinFor\("easeOutCubic"\)' -- src test demo`⟩ → 3 hits, all PROSE (`timing-function-names.test.ts:16,:19` docblock; `orchestration-api.test.ts:152`, the comment recording KF.W4 `.e`'s cure); no assertion names a phantom: the BITE clause (`orchestration-api.test.ts:160-162`) asserts `registryNames` contains `easeOutCubic`/`easeInBounce` before asserting their `cssTwinFor` is `undefined`. `src demo` → 0 `bounceInEase`. The `registry.ts` boot fence evaluates at 4.1.0 (40 names, no throw — every registry test GREEN). **Floor holds; the repin does not re-arm the trap.** The `pageerror` leg on `/#/easing` · `/#/spring` is a browser probe, left to `.d`'s post-deploy probe (not run by this seat — stated, not assumed).

## 7. Residuals (named, outside `.c1`'s writable set)

1. `src/animation/compile/easing/registry.ts:51-52` (docblock `:33-53`) declares *"Scheduled deletion … when value.js 4.1's memoised `easing()` lands, this memo is deleted in KF.W3's repin commit"* — measured TRUE premise at 4.1.0 (0 unstable, `easing(n).value === resolveTimingFunction(n)` ×40). `registry.ts` is `.c3`'s guarded path and `timingFunctionEntries` is the public boot fence (G-KF3-6), so `.c1` did not touch it; the deletion-or-restatement is for `.c3` / the orchestrator.
2. `src/animation/compile/parse-facade.ts:33-38` — *"ABSORB IS UNREACHABLE ON THE R1 CLASS … value.js 4.0.0's `parseStylesheet` THROWS"* — false at 4.1.0 (`ok:false`, measured §3). `.c4` owns `parse-facade.ts`.
3. `r4dock-share-fallback.test.ts` (2) timing flake (§5) — pre-existing, value-independent; `.d`'s CI concern.
