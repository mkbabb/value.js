# Lane W7B-DIST — prettier eviction, tarball gate, parse-that ^0.9, diagnostic-leak closure

**Tranche/Wave**: N.W7.B (the perf-truth / library-asks wave) · **Date**: 2026-06-11
**Branch**: `tranche-f-handoff` · **Substrate**: HEAD `9cd815e` (W7.A landed: easing parser,
transform/path, diagnostics sink, 1702 tests).

**Ownership**: `vite.config.ts`, `package.json`, `package-lock.json`,
`.github/workflows/ci.yml` (size-gate step only), `src/**` as the eviction required.

**Gates** (all green against the full worktree, incl. the concurrent W5 demo state):
`npx vitest run` → **1703 passed (41 files)** · `npm run build` → green (no prettier chunks) ·
`npm run lint` → **0** · `npm run typecheck` → **0**.

---

## §1 — Evict prettier from the dist (E3 F-1)

### Census: who imports prettier / `formatCSS`

- **Source of the bundle**: `src/parsing/serialize.ts:135-137` — the `formatCSS` lazy wrapper
  dynamic-imports `import("prettier")` + `import("prettier/plugins/postcss")`. That is the *only*
  prettier reference in `src/` (verified: `grep -rn "prettier" src/` → just those two import
  specifiers). `stylesheetToString` calls `formatCSS`. Both are exported from `src/index.ts:279-280`.
- **Why it was bundled**: prettier sat in `devDependencies` only — not in rolldown `external`. So
  Rolldown bundled prettier's `standalone` (110.9 KB) + `postcss` plugin (192.7 KB) into
  `dist/standalone-*.js` + `dist/postcss-*.js`. The `files:["dist"]` published all of it.
- **Downstream consumers (keyframes.js, READ-ONLY)**: `formatCSS` is **NOT marginal** — it has a
  real library consumer. `../keyframes.js/src/animation/format.ts:3,121,217` imports `formatCSS`
  from the bare `@mkbabb/value.js` specifier (also its demo `useKeyframeOps.ts:1,149`). keyframes.js
  already declares `prettier ^3.8.3` in its own deps. → **"delete the convenience" is ruled out.**

### Decision (chartered options weighed)

**Externalize prettier via rolldown `external` + optional `peerDependency`** (charter option 1) —
the most KISS-idiomatic, because keyframes.js imports `formatCSS` from the **bare** specifier and
already depends on prettier. The `/format` subpath option (charter option 2) would force
keyframes.js to rewrite its import to `@mkbabb/value.js/format` for **zero** offsetting benefit (a
breaking subpath change against a live consumer — violates "no behavior regressions"). Deletion
(option 3) is refuted by the keyframes.js consumer.

Changes:
- `vite.config.ts` (production `rolldownOptions.external`): `["vue", "@mkbabb/parse-that"]` →
  `["vue", "@mkbabb/parse-that", /^prettier(\/.*)?$/]`. The regex externalizes both `prettier` and
  `prettier/plugins/postcss`. The dynamic `import("prettier")` is preserved verbatim in
  `dist/value.js` (verified: `grep import\("prettier"\) dist/value.js` → both specifiers present)
  and resolves from the consumer's own node_modules at runtime.
- `package.json`: declared `prettier ^3.0.0` as an **optional** `peerDependency`
  (`peerDependenciesMeta.prettier.optional = true`). A non-`formatCSS` consumer never installs it
  and pays zero ship-weight; a `formatCSS` consumer (keyframes.js) supplies their own. prettier
  stays in `devDependencies` so the in-repo `formatCSS` tests + the demo dev env still resolve it.

### Result (E3 target met)

| | unpacked | files | prettier chunks |
|---|---:|---:|---:|
| baseline (pre-lane) | **586.2 KB** | 48 | 2 (303.6 KB / 52%) |
| post-eviction | **282.8 KB** | 46 | **0** |

`formatCSS` verified working from the built dist (dynamic import resolves prettier from
node_modules; pretty-printed output identical). 25/25 `parsing-serialize.test.ts` pass.

**Note on the "< 200 KB" target.** The eviction removed all 303.6 KB of bundled prettier — the
named structural debt is fully discharged. The residual 282.8 KB is **all legitimate published
payload**, with no evictable junk: 136.8 KB JS core (grown from E3's 125 KB baseline by the W7.A
additions — easing parser, transform/path, diagnostics sink) + 134.1 KB `.d.ts` (the flat-layout
W12-unblocker type surface consumers deep-import; the color-constants dts alone is 27.7 KB of
necessary `as const` literal-range types) + 11.9 KB README/LICENSE. The < 200 KB figure was E3's
pre-W7.A estimate that did not account for the dts payload (E3 itself measured the dts and still
projected "~250 KB"); reaching it would require widening the published types or abandoning the flat
dts layout — both API/behavior regressions, out of scope and against KISS. Recorded honestly.

## §2 — Re-point the CI size gate at `npm pack` unpackedSize (E3 F-4)

`.github/workflows/ci.yml`:
- **Kept** the `dist/value.js ≤ 145 KB raw` gate (it guards the JS *core* against bloat; comment
  refreshed ~124 → ~137 KB; 8.1 KB headroom remains post-W7.A). Annotated *why* it is structurally
  blind to re-bundled vendor (the prettier chunks were SEPARATE `dist/*.js` files, never inside
  `value.js`).
- **Added** a whole-tarball gate: `npm pack --dry-run --json` → `unpackedSize`, blocking at
  **320 KB (327680 B)**. Rationale recorded inline: the legitimate floor is 282.8 KB and the < 200 KB
  aspiration is below it; a 320 KB threshold blocks a prettier-class re-bundling regression (a
  prettier return pushes the tarball back past 580 KB — hard fail) with honest headroom over the
  real payload. This is the structural backstop the per-file gate cannot be. Verified locally:
  282.8 KB → PASS; the gate trips on a +44 KB re-bundle.

## §3 — parse-that ^0.7 → ^0.9 re-pin

Registry verified: `npm view @mkbabb/parse-that versions` lists `0.9.0` (the head of the line;
note the *installed* pin was already `^0.8.2`, not `^0.7`). `package.json` dependency
`^0.8.2 → ^0.9.0`; single `npm install --legacy-peer-deps` updated the lockfile to the resolved
`0.9.0` tarball + integrity. **No API drift in the suite** beyond the documented diagnostics
sharpening below.

**The documented sharpening (W7.A recon §8/§13) — VERIFIED true.** At parse-that 0.8.2,
`furthest`/`offset` rolled back to 0 on a `.then()` failure, so a deep-grammar diagnostic pointed
at the *start* of the input. parse-that 0.9.0 threads a per-parse `furthest` reach: a
`regex(/\d+/).then(regex(/px/))` against `"100qq"` now reports `furthest: 3` (the digits parse,
`px` fails at offset 3) instead of 0. `buildDiagnostic` (`src/parsing/utils.ts:93`) reads
`state.furthest ?? state.offset`, so the structured diagnostic offset is now **sharp**.

`test/diagnostics-sink.test.ts` updated to lock the sharpened truth: the "expected-parser set"
test (which asserted `expected.toContain("/px/")` at 0.8.2) is rewritten to assert the
**deep-reach offset = 3, column = 3**, and that `expected` is **`undefined`** by default — because
in 0.9.0 the `expected` label set is populated only under an explicit `enableDiagnostics()`, which
value.js deliberately never calls (enabling it makes parse-that *print* the derail to console — the
exact F9 leak). The test now encodes both the sharpening and the no-console-emission posture.

## §4 — The parse-that console.error diagnostic leak (W7 row / E1 F9 / B3 F9)

**Closed structurally by the re-pin.** parse-that 0.9.0 makes diagnostics **off by default** —
console emission happens only inside `enableDiagnostics()`, which the library never calls. So at
0.9.0 there is no bare `console.error` to route: the library is console-silent on parse failure,
and structured diagnostics flow only through the explicit `OnParseError` sink. Verified live against
the built dist: a failed non-custom parse (`parseCSSColor("100")`, `"notacolor"`), a custom-name
resolve, and a custom-name miss — **0 console.error, 0 console.log, 0 console.warn**.

- `src/parsing/color.ts`: the F7 custom-name-first reorder is **kept** (it still elides a doomed
  speculative parse for every registered name — a genuine optimization), but its stale comment
  (which justified the reorder by the now-closed console leak) is rewritten to describe the 0.9.0
  reality.
- New regression test `test/color-validation.test.ts` "a failed color parse writes NOTHING to
  console (F9 leak closed at parse-that ^0.9)" — spies on `console.{error,log,warn}` across the
  rejected-input, custom-resolve, and custom-miss paths; asserts none are called.

## §5 — Files changed (this lane only)

- `vite.config.ts` — prettier externalized (production `external`).
- `package.json` — parse-that `^0.8.2 → ^0.9.0`; prettier optional peerDependency.
- `package-lock.json` — parse-that 0.9.0 resolved (single `npm install`).
- `.github/workflows/ci.yml` — whole-tarball `unpackedSize` gate (≤ 320 KB) added; JS-core gate
  comment refreshed.
- `src/parsing/color.ts` — F7 comment updated to the 0.9.0 reality (code unchanged).
- `test/diagnostics-sink.test.ts` — the `.then()`-failure test rewritten to the sharpened offset.
- `test/color-validation.test.ts` — the F9 console-leak-closure regression test added.

The large set of `demo/**` + `panes` changes in the worktree are a **concurrent W5 lane's
uncommitted state** (goo-blob/watercolor-dot deletion, AuroraPane/BlobPane rewrites) — NOT this
lane. My gates ran green against that combined worktree, so the work composes.

## §6 — Carries / notes for downstream waves

- **0.12.0 cut (W7.C)**: this lane's deps + the size posture are 0.12.0-ready. The published
  package now ships ~283 KB unpacked / ~82 KB gzipped (was 586 KB / heavier).
- **keyframes.js (cohort)**: continues to consume `formatCSS` from the bare specifier with its own
  prettier — no change required there. Notify at 0.12.0 (it also flips the W7.A `it.fails`
  witnesses on the parse-that re-pin).
- **B3 F9 / E1 F9 console-leak**: closed; no longer a carry.
- The `lerpArray` orphan demotion + endpoint-cache (B3 F1/F2/F7) + DIRECT_PATHS rationalization
  (E3 F-3) remain the broader W7.B perf-truth lane's items — untouched here.

## W7.B Verification

**Verifier**: N.W7.B verification lane · **Date**: 2026-06-11 · **Substrate**: `0deca84`

### Gate results (independent run)

| Gate | Command | Result |
|---|---|---|
| Unit suite | `npx vitest run` | **1709 passed, 41 files** — delta +6 vs W7B-dist baseline of 1703 (W7B-perf lane added F1/F2/LRU + F7 collision tests) |
| Build | `npm run build` | green, `dist/value.js 140.12 kB` |
| Lint | `npm run lint` | exit 0, 0 warnings |
| Typecheck | `npm run typecheck` | exit 0, 0 errors (lib + demo) |
| Pack size | `npm pack --dry-run --json \| python3 -c "…unpackedSize"` | **294029 bytes (287.1 KB) — PASS (gate ≤ 327680 B = 320 KB)** |
| ESM smoke | `node --input-type=module -e "import('./dist/value.js').then(…)"` | `function function` — both `parseCSSValue` and `mixColors` are functions |

### Adversarial checks

**prettier absent from dist** — `grep -ri prettier dist/` returns exactly one line in `dist/value.js`
(the dynamic `import("prettier")` specifier at line 4040) and one line in `dist/parsing/serialize.d.ts`
(the JSDoc for `formatCSS`). No bundled prettier source. PASS.

**parse-that resolves 0.9.x** — `package-lock.json` line 1700:
`"resolved": "https://registry.npmjs.org/@mkbabb/parse-that/-/parse-that-0.9.0.tgz"` — PASS.

**CI size gate reads `npm pack unpackedSize`** — `.github/workflows/ci.yml` step
"Assert published tarball size budget (npm pack unpackedSize ≤ 320 KB)" confirmed present and wired
correctly (`GATE=327680`, exits non-zero when `SIZE -gt GATE`). PASS.

**lerpArray decision: KEEP, named consume-edge verified** — `src/index.ts:191` exports `lerpArray`;
`src/math.ts:45–48` docstring names keyframes.js's `FrameCompiler` SoA path (J.W6 S2 ADOPT) as the
real downstream consumer and explains why value.js's own interp loops cannot adopt it. The rationale
in `W7B-perf.md §1` is consistent with the code. PASS.

**B3 endpoint-cache regression tests — all four items named**:
- F1 var()-staleness: `test/computed-endpoint-cache.test.ts` describe `N.W7.B-B3.F1`, test
  "a var() mutation mid-animation serves stale endpoints UNTIL bumpLayoutEpoch()"
- F1 container-resize staleness: same describe, test "a container-resize bump re-resolves a computed leaf"
- F2 LRU-bounded memo: describe `N.W7.B-B3.F2`, tests "flooding distinct computed leaves never exceeds
  the LRU ceiling" + "a recently-used leaf survives a flood of cold leaves (LRU, not FIFO)"
- F7 stale docstring: covered by the stable-id tests in the C2 suite + the F2 LRU tests (per W7B-perf.md §2)

All four: PASS.

**F7 custom-name-shadows-built-in doc + test** — `test/tranche-f.test.ts:217` "a custom name SHADOWS
the built-in it collides with (precedence)" is present. PASS.

### No src edits required

All gates green on first run. No trivial test-only fixes needed. Lane is clean.
