# D.W1 — Contract-v2 alignment + library barrel + test coverage + lint

**Opens after**: D.W0 close.
**Lanes**: 7 lanes — L1–L5 contract-v2 (per `research/Dh-contract-v2.md §2`); **L6 library barrel completeness** (folded from chronically-deferred Da §3 item 10 — G1-G11 library API surface gaps); **L7 test coverage + lint** (folded from Da §3 items 18+19 + the D-HARDEN-6 "no lint script" gap). Single wave; commits per-lane (each lane is a tight, surgical, single-file or single-config change). Orchestrator-owned.
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

**Sub-gate L6**: every G1-G11 finding has a disposition in `audit/D.W1-library-barrel.md`; barrel additions verified by `grep` (`@src/parsing/color` deep imports in `demo/` ≤ recorded exceptions); `npm run proof:resolution` still green.

### L7 — test coverage for B.W3-committed `src/` WIP + `lint` script (Da §3 item 19 + D-HARDEN-6 §1 clause 26)

B.W3 committed 5 untracked library files (`src/parsing/{animation-shorthand,extract,serialize,stylesheet}.ts`, `src/units/interpolate.ts`) that are re-exported from `src/index.ts` but had no test coverage. The orchestrator records them as committed-with-no-tests; D.W1 adds vitest coverage:

1. `test/parsing-animation-shorthand.test.ts` — exercise the public `parseAnimationShorthand` (or whatever the file exports) against ~10 representative CSS animation-shorthand inputs; assert the parsed shape.
2. `test/parsing-extract.test.ts` — value-extraction helpers.
3. `test/parsing-serialize.test.ts` — round-trip parse-then-serialize for representative inputs.
4. `test/parsing-stylesheet.test.ts` — stylesheet-level parsing.
5. `test/units-interpolate.test.ts` — value interpolation across a few unit shapes.

Each spec is ~15-40 tests. Target: vitest 1409 → ~1500+ (the exact count depends on coverage breadth recorded at wave open).

**`lint` script** — the D-opening directive said "Run linting and type checking to validate your changes at every interval." Per D-HARDEN-6 §1 clause 26: `package.json` carries no `lint` script today. Add `"lint": "eslint . --max-warnings=0"` (or the project's existing ESLint config; if no eslint config exists, add a minimal one — `.eslintrc.cjs` referencing `@vue/eslint-config-typescript` + the project's prefs). The `lint` script becomes part of every wave's gate matrix.

**Sub-gate L7**: 5 new test files exist; `vitest run` count rises; `npm run lint` green; the `lint` step appears in CI (`node.js.yml`).

## File bounds

| Lane | Files |
|---|---|
| L1 | `package.json` |
| L2 | `vite.config.ts` |
| L3 | `scripts/proof-resolution-contract.mjs` (new), `package.json` (add `proof:resolution` script — touches L1's package.json; orchestrator sequences L1 then L3) |
| L4 | (no edits — verification; the bump landed at D.W0) |
| L5 | `docs/tranches/D/coordination/Q.md` |
| L6 | `src/index.ts` (barrel additions per the G1-G11 dispositions), the per-gap consumer migrations in `demo/`, `audit/D.W1-library-barrel.md` (new) |
| L7 | `test/parsing-{animation-shorthand,extract,serialize,stylesheet}.test.ts` + `test/units-interpolate.test.ts` (5 new), `package.json` (`lint` script), `.eslintrc.cjs` (new if absent), `.github/workflows/node.js.yml` (add `npm run lint` step) |

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
- `feat(library/w1): close library barrel — G1-G11 disposition (registerColorNames + solveCubicBezierX + … to the barrel)` — L6.
- `test(library/w1): vitest coverage for the 5 B.W3-committed src/ WIP files + add lint script + CI step` — L7.

## Dependencies

- Depends on: D.W0 (precept advance).
- Blocks: D.W2 + D.W3 (contract-v2 resolution stable; library barrel finalized).
