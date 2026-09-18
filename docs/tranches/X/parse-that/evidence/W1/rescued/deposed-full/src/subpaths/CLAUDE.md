# src/subpaths/

The tree-shake subpath barrels (O.W2). Each file is a curated re-export surface
that maps 1:1 to a `package.json` `exports` condition — importing
`@mkbabb/value.js/color` (etc.) pulls only that barrel's transitive closure, not
the `.` monolith's full CSS grammar.

## The barrels → export map

| File | Export | parse-that |
|------|--------|-----------|
| `../index.ts` | `.` → `dist/value.js` | coupled (the full monolith) |
| `color.ts` | `./color` → `dist/subpaths/color.js` | **FREE** — `units/color/*` + `../math` only |
| `units.ts` | `./units` → `dist/subpaths/units.js` | **FREE** — core classes/constants/utils |
| `math.ts` | `./math` → `dist/subpaths/math.js` | **FREE** — pure numeric primitives |
| `quantize.ts` | `./quantize` → `dist/subpaths/quantize.js` | **FREE** — median-cut over `units/color/gamut` |
| `transform.ts` | `./transform` → `dist/subpaths/transform.js` | **FREE** — decompose/slerp + DOM-free path geometry |
| `easing.ts` | `./easing` → `dist/subpaths/easing.js` | coupled (bundles the CSS Easing L1/L2 parsers) |
| `parsing.ts` | `./parsing` → `dist/subpaths/parsing.js` | coupled (the whole `src/parsing/` grammar) |

## THE FROZEN-ENTRY LAW

These 8 entry files (the 7 barrels + `src/index.ts`) are **build-frozen chunk
names**. The flat dist layout (`dist/value.js` + `dist/subpaths/*.js` + flat
`dist/*.d.ts` — the W12-unblocker) is what the `exports` map keys against, so a
barrel's **filename IS its public export path**. Renaming any of these files —
or adding/removing a subpath — is a BREAKING change to the package's export
surface and MUST move in lockstep with `package.json` `exports`. Never rename one
for tidiness. New subpaths are a deliberate, versioned addition, not a refactor.

## The budget invariant

The parse-that-FREE barrels (`color`, `units`, `math`, `quantize`, `transform`)
MUST NOT import — directly or transitively — from `src/parsing/` or
`@mkbabb/parse-that`; that severance is the whole tree-shake win (a `./color`
consumer sheds the entire @keyframes grammar). The invariant is a real dist-level
bundle trace, gated by `proof:subpath-budget` inside the CI-wired `test:dist`
step (T.W0-2, Q13 retain-5; `proof:subpath-resolve` was excised as historical).
Each barrel's own header comment carries its precise FREE/coupled rationale.
