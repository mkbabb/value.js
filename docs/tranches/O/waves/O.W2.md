# O.W2 — Subpath build + exports map

- **Band:** A · **Class:** structural — the monolith dissolved; every downstream consumer
  gains tree-shaking; the `./color` subpath is parse-that-zero
- **Gate (new):** `proof:subpath-budget` — born-RED on today's tree over the REAL bundle
  graph; GREEN only when importing `@mkbabb/value.js/color` pulls ZERO `@mkbabb/parse-that`
  / `@keyframes`-grammar modules into the graph
- **Folds:** D2 (grammar ownership, subpath delivery), D7 (SOTA perf — the tree-shake
  prerequisite), the campaign blueprint §3 O.W2 row
- **Precept cure:** the 145 KB monolith; every consumer currently pays for the full
  grammar regardless of what they import

---

## Context

O.W1 authors the structural prerequisites: `units/index.ts` parse-that-free (S1), subpath
stubs in `src/subpaths/` (S2), `vite.library.ts` multi-entry config (S3). O.W2 wires them:
produces the multi-entry build, authors the `package.json` exports map, and proves the
tree-shaking works via a born-RED rollup analysis gate.

### The target subpath surface

The seven subpaths chartered in the campaign blueprint §3:

| Subpath | Export | Parse-that? | Key contents |
|---|---|---|---|
| `./color` | `dist/color.js` | **ZERO** | `Color`, `RGBColor`, `OKLABColor`, `OKLCHColor`, … (all Color subclasses), `mixColors`, `gamutMap`, color-space conversion matrix math |
| `./parsing` | `dist/parsing.js` | YES (deliberate) | `parseCSSValue`, `parseCSSStylesheet`, `parseCSSColor`, `CSSFunction`, `CSSValues`, `CSSValueUnit`, `extractKeyframes`, `parseAnimationShorthand`, `parseCSSTimeline` (O.W4b), `parseLinearStops`, `parseSteps` |
| `./math` | `dist/math.js` | ZERO | `scale`, `lerp`, `lerpN`, `clamp`, `roundTo`, `vecAdd`, `vecScale`, `transformMat3`, … (pure numeric math) |
| `./easing` | `dist/easing.js` | YES (small) | `parseLinearStops`, `parseSteps`, `parseEasingFunction`, easing types |
| `./transform` | `dist/transform.js` | YES (uses parsing) | `parseTransform`, transform types |
| `./units` | `dist/units.js` | **ZERO** (post O.W1 S1) | `ValueUnit`, `FunctionValue`, `ValueArray`, unit constants, `convertToPixels`, `lerpValue`, `normalizeValueUnits` |
| `./quantize` | `dist/quantize.js` | ZERO | `quantize`, `medianCut`, `sortPalette`, quantize types |

The born-RED gate (`proof:subpath-budget`) focuses on the **`./color` subpath** as the
primary test case: it is the highest-value tree-shaking win (color consumers — including
keyframes.js's color interpolation path — shed the entire CSS grammar), and it is the
most demanding constraint (color currently pulls parse-that through `units/index.ts:1`
and the color parser in `parsing/color.ts`).

### Current state of the `package.json` exports map

```json
"exports": {
    ".": {
        "types": "./dist/index.d.ts",
        "import": "./dist/value.js",
        "default": "./dist/value.js"
    }
}
```

No subpath exports exist. Any `import { Color } from '@mkbabb/value.js/color'` currently
resolves to a 404 (Node.js `ERR_PACKAGE_PATH_NOT_EXPORTED`). The gate can use this as a
born-RED condition.

### `sideEffects`

The current `package.json` already has:
```json
"sideEffects": ["./demo/**", "**/*.css"]
```

O.W2 extends this to mark EACH subpath dist chunk as side-effect-free. The full annotation
after O.W2:
```json
"sideEffects": ["./demo/**", "**/*.css"]
```
This is already correct — dist chunks are NOT in `./demo/**` and are NOT `*.css`, so they
are implicitly side-effect-free under the current annotation. No change needed for
`sideEffects` unless a subpath has an intentional side effect (none do — the color-name
registration is EXPLICIT via `registerColorNames()`, not an import side-effect).

Verify: `"sideEffects": false` for library-only builds is the ideal, but
`["./demo/**", "**/*.css"]` is correct for this monorepo because `demo/` assets do have
side effects (CSS injection). The dist chunks are covered by the `false` implicit for
everything outside those globs. If bundlers complain, add `"./dist/*.js": false` or
switch to `"sideEffects": ["./demo/**", "**/*.css", "!./dist/**"]` — the implementer decides.

---

## Scope

### S1 — Multi-entry build wired in `vite.config.ts`

**Breach.** The production mode `build.lib.entry` is a single string pointing at
`src/index.ts`. Rolldown does not emit separate chunks for subpaths.

**Cure.** Update the production mode `build.lib` block in `vite.config.ts` to use the
`vite.library.ts` entries:

```ts
import { libraryEntries, libraryFileName, libraryExternal } from "./vite.library";

// In the `production` mode block:
build: {
    lib: {
        entry: libraryEntries(import.meta.dirname),  // Record<string, string>
        fileName: libraryFileName,
        formats: ["es"],
    },
    rolldownOptions: {
        external: libraryExternal,   // replaces the existing external: [...]
        // … rest unchanged
    },
},
```

After this change, `npm run build` produces:
```
dist/value.js        (the "." monolithic root — entry name "index" → fileName "value.js")
dist/color.js        (the "./color" subpath)
dist/parsing.js      (the "./parsing" subpath)
dist/math.js
dist/easing.js
dist/transform.js
dist/units.js
dist/quantize.js
```

All existing rolldownOptions (prettier external, `attachDebugInfo: "none"`) are preserved.
The `esbuild.drop: ["console", "debugger"]` applies to all entries.

**Falsifiable check.** After `npm run build`: all eight files exist in `dist/`; the root
`dist/value.js` is unchanged from pre-O.W2 (byte-equivalent or better); `dist/color.js`
exists.

### S2 — `package.json` exports map updated

**Breach.** No subpath exports in `package.json` — `import X from '@mkbabb/value.js/color'`
throws `ERR_PACKAGE_PATH_NOT_EXPORTED`.

**Cure.** Extend the exports map with one entry per subpath:

```json
"exports": {
    ".": {
        "types": "./dist/index.d.ts",
        "import": "./dist/value.js",
        "default": "./dist/value.js"
    },
    "./color": {
        "types": "./dist/subpaths/color.d.ts",
        "import": "./dist/color.js",
        "default": "./dist/color.js"
    },
    "./parsing": {
        "types": "./dist/subpaths/parsing.d.ts",
        "import": "./dist/parsing.js",
        "default": "./dist/parsing.js"
    },
    "./math": {
        "types": "./dist/subpaths/math.d.ts",
        "import": "./dist/math.js",
        "default": "./dist/math.js"
    },
    "./easing": {
        "types": "./dist/subpaths/easing.d.ts",
        "import": "./dist/easing.js",
        "default": "./dist/easing.js"
    },
    "./transform": {
        "types": "./dist/subpaths/transform.d.ts",
        "import": "./dist/transform.js",
        "default": "./dist/transform.js"
    },
    "./units": {
        "types": "./dist/subpaths/units.d.ts",
        "import": "./dist/units.js",
        "default": "./dist/units.js"
    },
    "./quantize": {
        "types": "./dist/subpaths/quantize.d.ts",
        "import": "./dist/quantize.js",
        "default": "./dist/quantize.js"
    }
}
```

The `types` path assumes vite-plugin-dts emits per-entry `.d.ts` files under
`dist/subpaths/` (mirroring `src/subpaths/`). Verify that the `dts` plugin config in
`vite.config.ts` covers the multi-entry case — if not, extend the `include` array or add
a second `dts()` invocation with `entryRoot: "src/subpaths"`.

**Falsifiable check.** `node -e "import('@mkbabb/value.js/color').then(m => console.log(Object.keys(m)))"` in a consumer that has the post-O.W2 build installed does not throw
`ERR_PACKAGE_PATH_NOT_EXPORTED` and prints the color exports. (The gate uses a synthetic
consumer, not a real registry install — see `proof:subpath-budget` below.)

### S3 — Subpath barrels finalized (exact re-export sets)

**Breach.** O.W1 S2 authored STUB barrels. The stubs may be incomplete (missing symbols
or importing too much).

**Cure.** Finalize each subpath barrel so it exports EXACTLY the symbols appropriate for
that subpath. Key constraints:

- `src/subpaths/color.ts` MUST NOT import (directly or transitively) from `src/parsing/`.
  It re-exports from `src/units/color/`, `src/units/index.ts` (post-O.W1-S1), and
  `src/math.ts`. Specifically: `Color` + all subclasses, `RGBColor`, `HSLColor`, `HSVColor`,
  `HWBColor`, `LABColor`, `LCHColor`, `OKLABColor`, `OKLCHColor`, `XYZColor`,
  `mixColors`, `mixColorsN`, `gamutMap`, `sampleColorRamp` (post-O.W3), `isColorUnit`,
  color-space conversion utilities.

- `src/subpaths/units.ts` MUST NOT import from `src/parsing/` (S1 guarantee). Re-exports:
  `ValueUnit`, `FunctionValue`, `ValueArray`, all constants from `units/constants.ts`,
  `convertToPixels`, `lerpValue`, `lerpColorValue`, `normalizeValueUnits`, `bumpLayoutEpoch`.

- `src/subpaths/parsing.ts` MAY import parse-that (deliberately). Re-exports everything
  in `src/parsing/` plus scroll-timeline (O.W4b adds this barrel).

- `src/subpaths/math.ts`: re-exports from `src/math.ts` — pure numeric utilities.

- `src/subpaths/easing.ts`: re-exports easing parsers + types from `src/parsing/easing.ts`.

- `src/subpaths/transform.ts`: re-exports transform utilities.

- `src/subpaths/quantize.ts`: re-exports from `src/parsing/quantize/` or the quantize
  module (confirm the actual module path in the source tree).

**Falsifiable check.** `npm run typecheck` exits 0 after barrel finalization. The
`proof:subpath-budget` gate (S4/Born-RED) is green.

### S4 — `sideEffects` confirmed correct

**Breach (risk).** A bundler may not tree-shake the subpath chunks if `sideEffects` is
too broad.

**Cure.** Verify the current `"sideEffects": ["./demo/**", "**/*.css"]` annotation is
correct for all subpath dist chunks. If a bundler reports the color chunk as side-effectful,
annotate explicitly. The implementer's decision: the current annotation is likely sufficient;
document it in this wave.

**Falsifiable check.** A rollup bundle that imports only `@mkbabb/value.js/color` does
not include any parsing module in its output (confirmed by `proof:subpath-budget`).

---

## Born-RED gate

**Gate name:** `proof:subpath-budget` (NEW — `scripts/proof-subpath-budget.mjs`).
**Tier:** correctness (a real bundle analysis over real module outputs — not a source-grep).

**The REAL observable.** The campaign blueprint §3 O.W2 born-RED gate: *"importing `./color`
pulls zero parse-that / `@keyframes`-grammar modules into the graph."* The REAL way to test
this is to build a synthetic consumer that imports ONLY `@mkbabb/value.js/color`, run it
through a bundler (rollup/rolldown), and inspect the output for any `@mkbabb/parse-that`
module reference. A source-grep (`grep -r "parse-that" dist/color.js`) is a VALID proxy for
this if the build is deterministic — BUT the gate should also confirm the exports map
resolves correctly (a compile-error from `ERR_PACKAGE_PATH_NOT_EXPORTED` is also a
born-RED today).

**Structure.** `scripts/proof-subpath-budget.mjs`:

| Clause | Input | Today (born-RED) | After cure (born-GREEN) |
|---|---|---|---|
| C1 — subpath resolves | `import { Color } from '@mkbabb/value.js/color'` in a synthetic consumer node | `ERR_PACKAGE_PATH_NOT_EXPORTED` | resolves without error |
| C2 — color chunk is parse-that-free | `grep -q "parse-that" dist/color.js` | `dist/color.js` does not exist today | `dist/color.js` exists AND does NOT contain any `parse-that` string reference |
| C3 — color chunk is grammar-free | `grep -qE "@keyframes|parseCSSValue|parseCSSStylesheet" dist/color.js` | n/a | NOT present |
| C4 — units chunk is parse-that-free | `grep -q "parse-that" dist/units.js` | n/a | NOT present |
| C5 — parsing chunk IS parse-that | `grep -q "parse-that" dist/parsing.js` | n/a | IS present (deliberate — the parsing chunk bundles parse-that primitives) |
| C6 — root chunk still works | `import { parseCSSValue } from '@mkbabb/value.js'` resolves | works | still works (regression guard) |
| C7 — types resolve | `dist/subpaths/color.d.ts` exists | does not exist | exists and contains `export declare class Color` (or equivalent) |

**Today's tree result.** `proof:subpath-budget` exits 1 on today's tree:
- C1: `ERR_PACKAGE_PATH_NOT_EXPORTED` (no `./color` in exports map).
- C2: `dist/color.js` does not exist (single-entry build emits only `dist/value.js`).
- C3: same.
- C4: `dist/units.js` does not exist.
- C7: `dist/subpaths/color.d.ts` does not exist.
C5 and C6 are green today (C5 by absence — `dist/parsing.js` does not exist, but this
clause only passes after the build succeeds). The gate REDs because the subpath
infrastructure does not exist yet.

**Green condition.** All seven clauses pass. The gate exits 0. `dist/color.js` exists and
is free of parse-that and grammar references; the subpath exports map resolves; types are
present.

**Why this is the genuine defect, not a proxy.** C2 and C3 grep the ACTUAL built chunk —
not the source, not the `package.json` entry. A fix that exports `./color` but still
bundles parse-that into it (e.g. if the `units/index.ts:1` edge wasn't fully severed)
would be caught by C2. A fix that merely adds an exports map entry without building the
chunk would be caught by C1 (file-not-found) or C2 (empty file). The gate requires the
BUILT artifact to be parse-that-free, which is only possible if the full chain (S1 edge
sever + S2 barrel finalization + S3 exports map + S4 build) is correct.

---

## Dependencies

- **O.W1 (S1, S2, S3) must be complete.** O.W2 wires the config authored in O.W1 S3
  and verifies the barrel work from O.W1 S2. Without O.W1, the multi-entry build has no
  entry map and no stub barrels.
- **O.W0 should be complete first.** O.W2 runs `npm run build`; if O.W0 introduced parser
  changes to `src/parsing/index.ts`, those changes should be in the tree before the
  multi-entry build is finalized (the `./parsing` chunk must include the O.W0 fixes).
- **parse-that A.W0/A.W1 are NOT required.** The `./parsing` chunk bundles parse-that
  (declared `external` in `rolldownOptions.external`) — `@mkbabb/parse-that` is a
  dependency, not bundled into `dist/parsing.js`. The subpath split does not require
  parse-that to change.
- **O.W3 through O.W6 (grammar/perf) depend on O.W2.** The subpath split is the
  architectural foundation that subsequent waves extend.
- **kf-M.W9/W10/W11 depend on O.W2.** kf's consume-side bundle gate
  (`proof:boundary` updated W96 scan) and the LIGHT/HEAVY boundary audit both
  benefit from value.js exporting fine-grained subpaths rather than the monolith.

---

## Excluded from this wave

- **Grammar completeness** (O.W4) — new `@layer`/`@container`/`@scope`/`@starting-style`
  recursive bodies, `if()`, `@function`, Color 4/5, etc.
- **Color-math zero-alloc** (O.W3) — the gamut-map bisection rewrite and zero-alloc
  scratch vectors.
- **SOTA-perf** (O.W6) — SpanParser tagged-union scanner, monolithic byte-loop hot paths.
- **Semantic-idempotence harness** (O.W5) — the property-based fuzz harness.
- **The `./scroll-timeline` subpath** — the scroll-timeline grammar (N.W11′, now part of
  O.W4b) may warrant its own subpath entry if the grammar grows; O.W2 includes it under
  `./parsing` for now. A dedicated `./scroll-timeline` subpath is a follow-on to O.W4b.
