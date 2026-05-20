# value.js

CSS value unit library: parsing, normalization, interpolation, color space conversion.

## Build

```
npm run build        # library → dist/value.js + value.cjs + value.d.ts
npm run build:watch  # vite build --watch (D.W1 — contract-v2 fleet dev orchestration)
npm run gh-pages     # demo → dist/
npm run dev          # dev server (Vite default port)
```

## Test + verify

```
npm test                 # vitest (jsdom) — unit suite (~1580+ tests across ~34 files)
npx playwright test      # smoke / smoke-admin / smoke-mobile (~20+ specs across 3 projects)
npm run lint             # eslint flat config (D.W1 L7) — exit 0 required
npm run proof:resolution # contract-v2 dev-resolution proof across the fleet (D.W1)
```

> Exact test/spec counts belong in per-tranche FINAL.md docs (e.g.
> `docs/tranches/E/FINAL.md`). Numbers inlined here drift each wave; the
> wave-gate doc carries the authoritative count for that wave.

## Structure

```
src/
├── index.ts              # barrel: exports all public API
├── math.ts               # lerp, bezier, clamp, scale, deCasteljau
├── easing.ts             # CSS timing functions (30+ named, cubic-bezier, stepped, linear())
├── utils.ts              # clone, memoize, debounce, RAF, case conversion
├── vite-env.d.ts         # Vite module declarations (.bbnf?raw, .vue)
├── parsing/              # parse-that combinators for CSS values
│   ├── index.ts          # top-level: parseCSSValue, gradients, transforms, var(), calc()
│   ├── units.ts          # dimension parsers: length, angle, time, frequency, resolution, flex, %
│   ├── color.ts          # 15 color spaces, hex, kelvin, color-mix(), relative color syntax
│   ├── math.ts           # calc() AST, min/max/clamp, trig, exp, round/mod/rem
│   ├── utils.ts          # istring, number, none, tryParse, succeed, fail
│   ├── animation-shorthand.ts  # animation/transition shorthand parsing
│   ├── extract.ts        # value extraction helpers
│   ├── serialize.ts      # value serialization
│   ├── stylesheet.ts     # stylesheet-level parsing
│   └── grammars/         # BBNF spec grammars (used in equivalence tests)
│       ├── css-values.bbnf
│       └── css-color.bbnf
├── units/                # core value classes + unit definitions
│   ├── index.ts          # ValueUnit, FunctionValue, ValueArray classes
│   ├── constants.ts      # unit arrays, STYLE_NAMES (CSS properties), MatrixValues
│   ├── utils.ts          # unit conversion (px, deg, ms, Hz, dpi), flatten/unflatten
│   ├── normalize.ts      # value normalization + interpolation setup
│   ├── interpolate.ts    # value interpolation
│   └── color/            # color system (15 spaces, conversion, gamut mapping)
│       ├── index.ts      # Color<T> base + 15 space classes + ColorChannel brand + ch<T> helper
│       ├── constants.ts  # ranges, matrices, white points, named colors
│       ├── matrix.ts     # Vec3/Mat3 math (row-major, f64, replaces gl-matrix)
│       ├── utils.ts      # conversion functions via XYZ hub, mixColors, gamutMap
│       ├── normalize.ts  # color normalization to [0,1], space conversion
│       ├── gamut.ts      # Ottosson analytical sRGB gamut mapping (zero-iteration)
│       ├── colorFilter.ts # CSS filter solver via SPSA optimization
│       ├── contrast.ts   # OKLab contrast helpers, safeAccentColor
│       └── mix.ts        # N-color mix() helpers
├── quantize/             # image color quantization (OKLab-native)
│   ├── index.ts          # quantizePixels, dominantColor (public API)
│   ├── cluster.ts        # MMCQ median cut, k-means++, JND deduplication
│   └── types.ts          # QuantizeOptions, QuantizedColor
└── transform/
    └── decompose.ts      # 2D/3D matrix decomposition, quaternion slerp, recomposition
```

```
test/                     # vitest unit tests
e2e/smoke/                # playwright smoke suite across 3 projects:
                          #   smoke (desktop Chromium, incl. reactivity-instant + WebGL)
                          #   smoke-admin (admin views via addInitScript mock fixture)
                          #   smoke-mobile (Pixel-7 layout probe)
demo/                     # Vue 3.5 color picker app (reka-ui, Tailwind, @vueuse)
api/                      # Hono + MongoDB palette API (Docker, Node 22, 9 collections / 27 indexes)
docs/                     # color-theory.md, gamut-mapping.md
assets/docs/              # 10 color space reference pages (Vue + KaTeX)
```

## Conventions

- TypeScript `strict:true`, `verbatimModuleSyntax:true`
- `moduleResolution:bundler`, `target:ES2022`, `lib:ES2023`
- `import type` for all type-only imports (enforced by verbatimModuleSyntax)
- `@mkbabb/parse-that` for all parsing (not Parsimmon)
- Named exports only, no defaults (enables tree-shaking)
- Color matrices stored row-major (3x3); transform matrices column-major (4x4, CSS convention)
- Color components normalized to [0,1] internally; denormalized on output

## Entry point

`src/index.ts` — re-exports the public API (units, colors, parsing, easing, math, transforms).

## Dependencies

- **Runtime**: `@mkbabb/parse-that@^0.7.0`
- **Dev**: vite, vue, typescript, vitest, playwright, reka-ui, @vueuse/core, tailwindcss, katex

## Path aliases (tsconfig)

```
@src/*         → src/
@styles/*      → demo/@/styles/
@components/*  → demo/@/components/
@utils/*       → demo/@/utils/
@lib/*         → demo/@/lib/
@composables/* → demo/@/composables/
@assets/*      → assets/
```
