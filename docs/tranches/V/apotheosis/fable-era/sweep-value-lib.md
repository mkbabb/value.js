# armB — value.js LIBRARY truth sweep (2026-07-19)

Pins: value.js `tranche-u@c654824e` (HEAD; the canon pin `db77dbd8` differs only by doc commits —
`git diff db77dbd8..HEAD -- src package.json` is EMPTY, so every src/package claim below holds at
both). Cross-trees: keyframes-v-exec (kf), glass-ui, `.p-totality/atlas` — greps at their live HEADs.
Artifacts written alongside: `madge-src.json` (the machine DAG).

## 1. Module DAG (madge + grep union — 26 files, ZERO cycles)

`npx madge --circular --extensions ts src` → **"No circular dependency found"** (26 files processed).
Full edge list (grep-verified, file:line):

- `foundation/result.ts` (6L) — LEAF. `foundation/math.ts` (120L) — LEAF.
- `color/model.ts` → foundation/result (model.ts:1-2). `color/anchors.ts` → color/model (anchors.ts:1).
  `color/operations.ts` → result + anchors + model (operations.ts:1-3). `color/index.ts` → model +
  operations + re-exports `Result` (index.ts:41).
- `value.ts` → `color/index` **type-only** (`import type { AnyColor }`, value.ts:1).
- `quantize.ts` → color/index (quantize.ts:1-2). `easing.ts` → foundation/result (easing.ts:1-2).
- `css/types.ts` → color/model + result + easing + value (types.ts:1-4). `css/grammar.ts` → result +
  color/model + value + color/anchors (`adaptXyzD50ToD65`, grammar.ts:21) + css/types + named-colors.
  `css/syntax.ts` → value + types + grammar. `css/timeline.ts` → types + grammar (timeline.ts:12).
  `css/stylesheet.ts` → value + grammar + syntax + timeline + types (stylesheet.ts:1-40).
  `css/index.ts` → types/grammar/syntax/timeline/stylesheet.
- `transform/decompose.ts`, `transform/path.ts` — LEAVES (zero src imports).
- `subpaths/*` → pure re-export fan-out only.

Layering is clean: foundation → color → {value(type), easing, quantize, css} → subpaths. The one
cross-layer oddity: css/grammar reaches into `color/anchors` internals (not through color/index).

## 2. LOC census (src total 4,654; 4,647 excl. vite-env.d.ts — MATCHES P3.2's 4,647)

| Dir | LOC | Files (per-file) |
|---|---|---|
| color/ | 891 | anchors 377 · operations 331 · model 142 · index 41 |
| css/ | 1,948 | stylesheet 899 · grammar 483 · named-colors 150 · types 131 · timeline 124 · syntax 101 · index 60 |
| transform/ | 1,173 | decompose 609 · path 564 |
| subpaths/ | 163 | css 56 · color 38 · easing 25 · transform 23 · math 17 · value 2 · quantize 2 |
| foundation/ | 126 | math 120 · result 6 |
| root | 346 | easing 171 · quantize 139 · value 36 (+vite-env.d.ts 7) |

Adjacent masses: demo/ 31,102 (ts+vue) · e2e/ 13,333 · test/ 3,823 · api/src 111 .ts + api/test 12
(P3.2's "125 .ts files" ≈ src+test 123; count drift, same substance) · **root PNGs = exactly 39**.

## 3. Export surface + subpaths/ reality

package.json `exports` has **NO "." root key** — exactly 7 subpath keys (`./color ./value ./css
./easing ./math ./transform ./quantize`), each `types`+`import` → `dist/subpaths/*`. The 7
`src/subpaths/*.ts` files are **pure re-export homes, zero runtime logic** (grep for
`const|let|function|class|if|for` at top level → 0 hits) — confirming "163-line export-map homes, not
shims". Approx distinct symbol counts: color ~34 · css ~52 · easing ~21 · transform ~15 · math ~9 ·
quantize ~5 · value ~5 (≈141 total). `transform/index.ts` does NOT exist — subpaths/transform.ts:14-23
is the only aggregation point (imports decompose + path directly), consistent with the dissolution
row's "create a real transform/index.ts".

Export-orphan confirmed: `collectDeclarations` is exported (css/index.ts:54, subpaths/css.ts:40) with
5 internal uses (stylesheet.ts:498,499,521,682,880) but appears in NO kf/glass/atlas import — only
value's own test/v4-c1.test.ts:252.

## 4. package.json deps-block state

`"dependencies": { "@mkbabb/glass-ui": "^7.0.0", "@mkbabb/keyframes.js": "^6.0.0" }` is **COMMITTED
on tranche-u** (identical at db77dbd8 and HEAD; git status shows package.json clean). The letters'
"working-tree-only" phrasing is imprecise on this branch: the block is in-repo/unpublished — published
4.0.0 is deps-free, so the registry kf↔value cycle fires on the NEXT publish unless stripped. The
STRIP/RELOCATE + pre-publish manifest gate row is live and correctly aimed. No `main`/`module`/`types`
top-level fields; `files: [dist, !dist/gh-pages]`.

## 5. Test-tree vs src-tree isomorphism gaps

src dirs: color/ css/ foundation/ subpaths/ transform/. test dirs: **parsing/timeline/** + transform/
only; everything else flat at test/ root (20 files). Gaps:

1. **test/parsing/ mirrors a DELETED src dir** — src/parsing/ died at the v4 cut; the dir name is a
   ghost (parsing-easing.test.ts).
2. **No test/color, test/css, test/foundation** — v4-color-behavior, v4-css-public, v4-css-emerging,
   math, v4-c1, easing* live at root.
3. **10 demo-coupled tests inside library test/ root** (import provenance verified per file):
   gradient-parse, gradient-v4-consume, image-sampler-v4, mix-v4, picker-blob-config (fs-reads demo
   files), preview-chips, slider-announcement, status-lamp, value-domain-clamp, view-accents. (ink.test
   imports only the packed lib but is a demo-contract probe per its own docstring.)
4. **Three import idioms coexist**: `../src/subpaths/*` (v4-c1, v4-color-behavior…), `@src/...`
   (gradient-v4-consume), packed `@mkbabb/value.js/*` (ink, mix-v4, preview-chips, view-accents).
   No isomorphism/structure gate exists — P3.4 row 3 ("build from scratch, born-RED") is accurate.

## 6. God-module / sand candidates (evidence)

- **css/stylesheet.ts — the god-module**: 899 LOC, 35 top-level functions, ≥5 domains in one file
  (CssValue serialization :81; stylesheet parse :743; 4 collect* rule filters :763-769; declaration
  maps :772; animation options :827; timeline options :879) + char-cursor scanning loops (:530,:534).
- **css/grammar.ts**: 483 LOC/18 fns — the ENTIRE value+color+timing grammar in one file (parseCssColor
  :257 … parseTimingFunction :436).
- **transform/decompose.ts**: 609 LOC/20 fns with zero consumers (see §7) — dead weight, not god.
- **color/anchors.ts**: 377 LOC mixing constants tables + 23 conversion fns (data/logic blend).
- **Sand**: foundation/result.ts (6 LOC dir-resident), subpaths/value.ts + subpaths/quantize.ts (2 LOC
  each), src/value.ts (36 LOC — 4 types + 1 fn + a unit Set), color/index.ts (41L barrel).

## 7. transform/decompose.ts + quantize consumer truth (four-tree grep)

**decompose: ZERO consumers on all four trees — PRUNE claim CONFIRMED.** value demo: no
decompose/recompose/slerp/DecomposedMatrix hits, no `/transform` import at all (demo specifier census:
color 24 · css 10 · math 6 · easing 5 · quantize 4 — nothing else). kf: the only
`@mkbabb/value.js/transform` imports are `PathGeometry` (path.ts, NOT decompose) at
src/animation/svg/morph-svg.ts:45 and morph-geometry.ts:18. glass-ui src: 0 (one GLSL comment).
atlas src: 0 (one prose comment, inp-probe.ts:31). Sole consumer anywhere =
value's own test/transform/decompose-targeted.test.ts.

**quantize: demo-only — DEMOTE-to-demo viable.** Real imports live solely in the value demo extract
workbench: quantize-worker.ts:6-7, composables/useImageQuantize.ts:9, useExtractSession.ts:14
(+2 word-hit files, non-import). kf src/demo/test: 0. glass: 0 (aurora.frag.ts:246 is a comment).
atlas: 0 (`quantizeToTier` ColorScale.ts:243 is local code, no value import). api/src: 0 library
imports of any kind (single grep hit is a comment, api/src/modules/palette/service/oklab.ts:16).

Consumption context (kf src, import-line counts): /css 29 sites (46 incl. demo+test — the P1.4
"29 sites" figure is src-scoped and CONFIRMED) · /math 38 · /value 30 · /easing 19 · /color 12 ·
/transform 2; 40 kf src files import value. glass-ui: 12 import lines (/color, /css, /easing).
atlas: /math + /easing heavy use.

## 8. css/ parser per-file shape — P1.2 CONFIRMED (minor count deltas)

| File | LOC (P1.2 claim) | Measured character |
|---|---|---|
| grammar.ts | 483 (483 ✓) | **25** regex-method calls (`.test/.match/.replace/.exec`) vs "~23" — same magnitude; per-char `/\s/.test` split loops at :77,:80,:115; `deepFreeze` def :33, recursive :35, invoked per successful parse inside `success()` :42; `parseFunctionalColor` :175 = the 8-branch ladder (rgb/hsl/hwb/lab/lch/oklab/oklch/color) |
| stylesheet.ts | 899 (899 ✓) | char-index cursor loops (`while (/\s/.test(input[cursor]…))` :530,:534) + 12 inline regex-method calls; no scanner |
| timeline.ts | 124 (124 ✓) | 8 regex-method calls |
| syntax.ts | 101 (101 ✓) | 1 regex-method call |
| index/named-colors/types | 60/150/131 | non-parser (barrel/data/types) ✓ |

**`charCodeAt` across all css/* = 0** ✓. **bench/ does not exist** ✓ (greenfield; resurrection recipe
`164343c1^` stands).

## 9. color/ zero-alloc + gamut state — P2.1 extinction CONFIRMED on HEAD

- `grep -rniE "deltaE|raytrace|okhsl|okhsv" src/` → **0 hits**. No function matching `*Into` anywhere
  in src → **the Into family is absent** (SCI-1's mixColorsInto/toRgba8Into are W56-future, unlanded).
- `mapColorToGamut` (operations.ts:133-176): exactly as indicted — 32-iteration OKLCh chroma bisection
  (:160), stop = loop count only, **no ΔE criterion, no clip comparison** (not CSS Color 4 §13
  conformant); each iteration allocates ≥3 Result objects + channel arrays (makeColor :162 →
  convertColor :164 → numericSource :166) ⇒ ~96+ allocations per call minimum.
- `safeAccentColor` (operations.ts:207-…): `evaluate` = candidate→`mapColorToGamut` (:226) + dual
  contrast checks; call structure = 3 seed evaluates (origin/0/1, :250-256) + up to two 32-step
  lightness bisections (:262-278…) ⇒ the **≤67-evaluate upper bound is REAL**, worst case ≈ 67 × 32
  bisection iterations of Result-allocating conversion round-trips (~2.1k). Zero-alloc state: nonexistent;
  the R-DELTAE→R-GAMUT→R-INTO restore ladder is correctly premised.
- Gamut word-census: operations.ts 14 · index.ts 2 · model.ts 1 — the whole live gamut apparatus is
  the one bisection fn + `RgbGamut` typing. boundary.ts/gamut.ts/raytrace.ts/okhsl.ts absent ✓.

## 10. Deltas vs the letters (all minor)

1. grammar.ts regex sites: measured 25 method-calls vs "~23 regex-op sites" (counting convention).
2. api/ "125 .ts files": measured 111 src + 12 test = 123 (dist/ adds 79 built files).
3. The deps block is COMMITTED on tranche-u, not merely working-tree-dirty — strengthens, not
   weakens, the STRIP row (a publish from this branch ships the cycle).
4. P3.2's core-LOC 4,647 reproduces exactly (4,654 − 7 vite-env.d.ts).
