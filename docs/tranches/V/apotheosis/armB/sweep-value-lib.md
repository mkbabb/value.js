# armB — value.js LIBRARY truth sweep (UNION of Fable-r1 + independent Opus re-verification, 2026-07-19)

**Method**: read the archived Fable-r1 sweep (`fable-era/sweep-value-lib.md`) FIRST, then re-derived every
load-bearing claim against the tree myself. Adopt-what-survives; every divergence flagged
`FABLE-r1-vs-now`. Independence firewall honored (no vnext / snapshot-vnext / armA read).

**Pins**: value.js HEAD = `c654824e` (tranche-u) — **identical to Fable-r1's pin**; canon pin `db77dbd8`
differs only by doc commits (`git diff db77dbd8..HEAD -- src package.json` = EMPTY, reconfirmed), so every
src/package claim holds at both. Cross-trees at their LIVE HEADs (all drifted since r1):
kf `keyframes-v-exec@81a56990` · glass-ui `cdc322b9` · atlas `.p-totality/atlas@fe9abcf`.
Machine DAG written: `apotheosis/madge-src.json` (+ a copy in `armB/madge-src.json`).

---

## 1. Module DAG — 26 TS files, ZERO cycles (madge re-run + edge-verified)

`npx madge --circular --extensions ts src` → **"No circular dependency found"**, 26 files processed
(re-run today). Full edge list from `madge --json` (reproduced verbatim in `madge-src.json`):

```
foundation/result.ts        → []            (LEAF)
foundation/math.ts          → []            (LEAF)
color/model.ts              → result
color/anchors.ts            → color/model
color/operations.ts         → anchors, model, result
color/index.ts              → model, operations, result
value.ts                    → color/index          (TYPE-ONLY: `import type { AnyColor }`, value.ts:1)
quantize.ts                 → color/index
easing.ts                   → result
css/named-colors.ts         → []            (LEAF)
css/types.ts                → color/model, easing, result, value
css/grammar.ts              → color/anchors, color/model, named-colors, css/types, result, value
css/timeline.ts             → grammar, types
css/syntax.ts               → grammar, types, value
css/stylesheet.ts           → grammar, syntax, timeline, types, value
css/index.ts                → grammar, stylesheet, syntax, timeline, types
transform/decompose.ts      → []            (LEAF — zero src imports)
transform/path.ts           → []            (LEAF — zero src imports)
subpaths/*                  → pure re-export fan-out only
```

Layering clean: `foundation → color → {value(type-only), easing, quantize, css} → subpaths`.
**Cross-layer oddity CONFIRMED**: `css/grammar.ts` reaches `color/anchors` internals directly (madge edge
`grammar→color/anchors`), NOT through `color/index` — the one abstraction-boundary leak. Note madge counts
type-only edges, so `value.ts→color/index` and several `css/*→value` edges are non-runtime type edges
(value.ts is not a runtime color consumer). ADD (r1 missed): `src/.DS_Store` present — "26 TS files" is exact,
but the tree carries a 27th non-code file (cosmetic hygiene; sand-adjacent).

## 2. LOC census — src total 4,654; core 4,647 (excl. vite-env.d.ts) — REPRODUCES r1 EXACTLY

| Dir | LOC | Per-file |
|---|---|---|
| css/ | 1,948 | stylesheet **899** · grammar **483** · named-colors 150 · types 131 · timeline 124 · syntax 101 · index 60 |
| transform/ | 1,173 | decompose **609** · path **564** |
| color/ | 891 | anchors 377 · operations 331 · model 142 · index 41 |
| root | 346 | easing 171 · quantize 139 · value 36 |
| subpaths/ | 163 | css 56 · color 38 · easing 25 · transform 23 · math 17 · value 2 · quantize 2 |
| foundation/ | 126 | math 120 · result 6 |
| vite-env.d.ts | 7 | — |

Every per-file number matches r1 to the line. `4654 − 7 = 4647` (P3.2 reproduces exactly). Root PNGs =
**39** (re-counted). Adjacent masses (r1, not re-measured): demo ~31k · e2e ~13k · test ~3.8k.

## 3. Export surface + subpaths/ reality — CONFIRMED

`package.json.exports` has **NO "." root key** — exactly **7 subpath keys**
(`./color ./value ./css ./easing ./math ./transform ./quantize`), each `{types,import}→dist/subpaths/*`.
The package root is therefore NOT importable. The 7 `src/subpaths/*.ts` are **pure re-export homes** —
`grep -lE '^(const|let|function|class|if|for|while) ' src/subpaths/*.ts` → **0 files** (zero top-level runtime
logic). `transform/index.ts` does NOT exist; `subpaths/transform.ts` is the sole aggregation point (imports
`decompose` + `path` directly) — consistent with the dissolution row's "create a real transform/index.ts".
**Export-orphan `collectDeclarations` CONFIRMED**: exported (`css/index.ts:54`, `subpaths/css.ts:40`), 5
internal uses in stylesheet.ts, and **0 consumers** across kf/glass/atlas/value-demo (grep = 0) — only value's
own test.

## 4. package.json deps-block — COMMITTED on tranche-u (STRIP row correctly live)

`git status --short package.json` = clean; `git show HEAD:package.json` →
`"dependencies": {"@mkbabb/glass-ui":"^7.0.0","@mkbabb/keyframes.js":"^6.0.0"}`. The block is **in-repo,
committed** — not merely working-tree-dirty (the letters' "working-tree-only" phrasing is imprecise on this
branch; r1 flagged this and it holds). 33 devDeps. No top-level `main`/`module`/`types`.
`files: ["dist","!dist/gh-pages","!dist/gh-pages/**"]` (r1 listed the 2-entry form; the trailing `**` glob
is present — cosmetic). Published 4.0.0 is deps-free per r1; a publish FROM this branch ships the registry
kf↔value cycle. STRIP/RELOCATE-to-devDeps + pre-publish manifest gate row = live, correctly aimed.

## 5. Test-tree vs src-tree isomorphism — BROKEN, gate absent

src dirs: `color css foundation subpaths transform`. test dirs: **`parsing/timeline/` + `transform/` only**;
all else flat at test/ root (22 `.ts` files + a `.DS_Store`). Gaps CONFIRMED:
1. **`test/parsing/` mirrors a DELETED src dir** (src/parsing/ died at the v4 cut) — a ghost dir
   (`parsing/timeline/parsing-easing.test.ts`).
2. **No `test/color`, `test/css`, `test/foundation`, `test/subpaths`** — behavior tests (v4-color-behavior,
   v4-css-public, v4-css-emerging, math, v4-c1, easing*) all flat at root.
3. **Demo-coupled tests inside library test/ root**: 4 import the packed lib (`@mkbabb/value.js/*`:
   ink, mix-v4, preview-chips, view-accents); **11 reference `demo/` paths** (adds gradient-parse,
   gradient-v4-consume, image-sampler-v4, slider-announcement, picker-blob-config, status-lamp,
   value-domain-clamp). r1 said "10"; measured 11 by fs/path reference.
4. **Three import idioms coexist** (uniq-counted): `../src/subpaths/*` (16 sites), `@src/subpaths` (1),
   packed `@mkbabb/value.js/*` (7). No isomorphism/structure gate exists — born-RED from-scratch is accurate.

## 6. God-module / sand candidates (evidence)

- **css/stylesheet.ts — THE god-module**: 899 LOC; ~42 top-level decls; ≥5 domains (CssValue serialization,
  stylesheet parse `:743`, 4 collect* filters, declaration maps, animation+timeline options) + raw char-cursor
  scan loops `while (/\s/.test(input[cursor]??"")) cursor++` at `:530,:534`.
- **css/grammar.ts**: 483 LOC; the ENTIRE value+color+timing grammar in one file (`parseCssColor:257` …
  `parseFunctionalColor:175` 8-branch ladder … `parseTimingFunction:436`).
- **transform/decompose.ts**: 609 LOC, **zero consumers** (§7) — dead weight, PRUNE not god.
- **color/anchors.ts**: 377 LOC — constant tables + 23 conversion fns (data/logic blend; split candidate).
- **Sand**: `foundation/result.ts` (6 LOC dir-resident), `subpaths/{value,quantize}.ts` (2 LOC each),
  `src/value.ts` (36), `color/index.ts` (41 barrel).

## 7. transform/decompose + quantize consumer truth — FOUR-TREE grep

**decompose: ZERO real consumers on ALL four trees — PRUNE CONFIRMED.** Only hits are comments/prose:
glass `mediums.glsl.ts:37` ("eigen-decomposes"), atlas `index.css:3` + `inp-probe.ts:31` ("decomposed").
The **only** `@mkbabb/value.js/transform` imports anywhere = kf `morph-svg.ts:45` + `morph-geometry.ts:18`,
both `import { PathGeometry }` (from path.ts, NOT decompose). Sole decompose test = value's own
`test/transform/decompose-targeted.test.ts`.

**quantize: demo-ONLY — DEMOTE-to-demo viable.** Real imports live solely in value's extract workbench:
`quantize-worker.ts:6-7`, `useImageQuantize.ts:9`, `useExtractSession.ts:14`. `value.js/quantize` grep on
kf-src + glass-src + atlas-src = **0**.

**Subpath consumption census (LIVE HEADs — uniq specifier counts):**
| specifier | kf-src | value-demo | glass-src | atlas-src |
|---|---|---|---|---|
| /color | 7 | 25 | 6 | 1 |
| /css | **29** | 10 | 3 | 0 |
| /easing | 3 | 5 | 1 | 9 |
| /math | 8 | 6 | 0 | 15 |
| /value | 16 | 0 | 0 | 0 |
| /transform | 2 | 0 | 0 | 0 |
| /quantize | 0 | 4 | 0 | 0 |

kf-src files importing value.js = **47**. Substance holds: value's `/css` is kf's dominant edge (29,
matches P1.4 src-scoped); `/transform` is PathGeometry-only (2); `/quantize` is demo-exclusive; atlas leans
`/math`+`/easing`; glass leans `/color`+`/css`.
**FABLE-r1-vs-now**: r1's cross-tree counts were at an earlier kf HEAD and DIVERGE by HEAD drift —
r1 kf `/math 38→8`, `/value 30→16`, `/easing 19→3`, `/color 12→7` (`/css 29→29`, `/transform 2→2` stable);
r1 "40 kf files→47"; r1 "glass 12 import lines" → now 5 import statements / 10 specifier occurrences. The
directional truth (kf-css-dominant, transform=PathGeometry, quantize=demo-only) is unchanged.

## 8. css/ parser per-file shape — P1.2 CONFIRMED

| File | LOC | Character |
|---|---|---|
| grammar.ts | 483 | **24** regex-method calls (`.test/.match/.replace/.exec`); per-char `/\s/.test` split loops `:77,:80,:115`; `deepFreeze` def `:33`, recursive `:35`, invoked per successful parse `:42`; `parseFunctionalColor:175` = 8-branch rgb/hsl/hwb/lab/lch/oklab/oklch/color ladder |
| stylesheet.ts | 899 | char-index cursor loops `:530,:534` + 12 regex-method calls; no scanner |
| timeline/syntax/index/named-colors/types | 124/101/60/150/131 | timeline/syntax = light regex; index=barrel, named-colors=data, types=types |

**`charCodeAt` across all css/* = 0** (re-verified). No byte-scanner — the regex/char-split character is
exactly as indicted (deepFreeze-per-parse + per-char `/\s/.test` are the named perf costs the R-PARSER
restoration retires). **FABLE-r1-vs-now (cosmetic)**: r1 measured 25 regex-method calls at this same HEAD;
I measure 24 with identical pattern — pure counting convention, same magnitude. `bench/` does not exist ✓.

## 9. color/ zero-alloc + gamut state — P2.1 EXTINCTION CONFIRMED on HEAD

- `grep -rniE "deltaE|raytrace|okhsl|okhsv" src/` → **0 hits**. No `*Into` function in src → **the Into
  family is ABSENT** (SCI-1's mixColorsInto/toRgba8Into are W56-future, unlanded).
- `mapColorToGamut` (`operations.ts:133`): 32-iteration OKLCh chroma bisection (loop `:160`), stop = loop
  count only — **no ΔE criterion, no clip comparison** → NOT CSS Color 4 §13 conformant. Each iteration
  allocates Result objects + channel arrays (makeColor→convertColor→numericSource) ⇒ ~96+ allocs/call.
- `safeAccentColor` (`operations.ts:207`): calls `mapColorToGamut` (`:226`) + **two further 32-step
  bisections** (`:266,:283`) atop 3 seed evaluates ⇒ the **≤67-evaluate upper bound is REAL**, worst case
  ≈67×32 Result-allocating conversion round-trips. Zero-alloc state: nonexistent. R-DELTAE→R-GAMUT→R-INTO
  restore ladder correctly premised.
- Gamut word-census: operations 14 · index 2 · model 1 · anchors 0. The whole live gamut apparatus = the one
  bisection fn + `RgbGamut` typing. `boundary.ts/gamut.ts/raytrace.ts/okhsl.ts` absent ✓.

## 10. Divergence ledger — FABLE-r1-vs-now (all cosmetic; no substantive reversal)

1. grammar.ts regex-method calls: r1=25 → now 24 (same HEAD; counting convention).
2. Cross-tree subpath counts drifted with kf/glass HEAD advance (§7 table) — direction unchanged.
3. test root: r1 "10 demo-coupled / 20 flat" → measured 11 demo-path-referencing / 19 flat root .ts +
   parsing/timeline + transform/ (adds easing-export-stability, v4-quantize which r1's demo list omitted).
4. `files` array carries a 3rd glob `!dist/gh-pages/**` (r1 listed 2).
5. `.DS_Store` present in src/ and test/ (hygiene sand).
6. God-module decl counts (grammar 26, stylesheet 42) include const data tables vs r1's fn-only (18/35).

**Everything load-bearing in Fable-r1 SURVIVES re-verification at the same HEAD.** The formation's four
condemned-party findings stand on measurement: (a) the regex/char-split CSS parser (charCodeAt=0, deepFreeze
per-parse, per-char /\s/.test); (b) single-sided color extinction (0 deltaE/raytrace/okhsl/okhsv, Into
absent, non-conformant 32-iter gamut bisection, ≤67-evaluate accent path); (c) the committed deps-cycle
block; (d) the zero-consumer transform/decompose PRUNE + demo-only quantize DEMOTE + broken test isomorphism.
