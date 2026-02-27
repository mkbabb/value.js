# value.js ![image](demo/color-picker/cube.png)

CSS value parsing, color theory, and unit conversion. Typed values with units—`deg`, `px`, `rem`, `oklch()`—the full CSS value vocabulary.

[demo](https://color.babb.dev)

## Features

- Parse any CSS value: lengths, angles, times, colors, `calc()`, `var()`, gradients, transforms
- **15 color spaces**: RGB, HSL, HSV, HWB, Lab, LCh, OKLab, OKLCh, XYZ, Kelvin, sRGB-linear, Display P3, Adobe RGB, ProPhoto RGB, Rec. 2020
- Color space conversion via **XYZ hub** with analytical gamut mapping (Ottosson's algorithm)
- CSS Color Level 4 support: `color()`, `color-mix()`, relative color syntax
- CSS math functions: `calc()`, `min()`, `max()`, `clamp()`, trig, exponential
- 40+ easing functions: cubic-bezier, stepped, linear(), bounce, sine, expo
- 2D/3D matrix decomposition with quaternion slerp interpolation
- Normalize, interpolate, and convert between units

## Install

```bash
npm install @mkbabb/value.js
```

## Usage

```ts
import { parseCSSValue, parseCSSColor, ValueUnit, FunctionValue } from "@mkbabb/value.js";
```

## Build

```bash
npm run build        # library → dist/value.js + value.cjs + value.d.ts
npm run gh-pages     # demo → dist/
npm run dev          # dev server on :8080
npm test             # vitest (1279 tests)
npm run test:e2e     # playwright (desktop + mobile)
```

## Structure

```
src/
├── index.ts              # barrel exports (~200 symbols)
├── math.ts               # lerp, bezier, clamp, scale, deCasteljau
├── easing.ts             # CSS timing functions (cubic-bezier, stepped, linear())
├── utils.ts              # clone, memoize, debounce, RAF
├── parsing/              # @mkbabb/parse-that combinators for CSS values
│   ├── index.ts          # parseCSSValue, gradients, transforms, var()
│   ├── units.ts          # length, angle, time, frequency, resolution, flex, %
│   ├── color.ts          # 15 spaces, hex, named, color-mix(), relative syntax
│   ├── math.ts           # calc() AST, min/max/clamp, trig, exp
│   └── grammars/         # BBNF spec grammars (documentation only)
├── units/                # core value classes + unit definitions
│   ├── index.ts          # ValueUnit, FunctionValue, ValueArray
│   ├── constants.ts      # unit arrays, 735+ CSS property names
│   ├── utils.ts          # unit conversion (px, deg, ms, Hz, dpi)
│   └── color/            # 15 color spaces, conversion, gamut mapping
│       ├── index.ts      # Color<T> base + space classes
│       ├── constants.ts  # ranges, matrices, white points, named colors
│       ├── matrix.ts     # Vec3/Mat3 (row-major, replaces gl-matrix)
│       ├── utils.ts      # 100+ conversions via XYZ, mixColors, gamutMap
│       ├── gamut.ts      # Ottosson analytical sRGB gamut mapping
│       └── colorFilter.ts # CSS filter solver (SPSA)
└── transform/
    └── decompose.ts      # 2D/3D matrix decomposition, quaternion slerp

test/                     # vitest unit tests (24 files)
e2e/                      # playwright E2E (10 specs)
demo/                     # Vue 3.5 color picker (reka-ui, Tailwind)
api/                      # Hono + MongoDB palette API (Docker)
docs/                     # color-theory.md, gamut-mapping.md
assets/docs/              # 10 color space reference pages
```

## Color Spaces

All conversions route through the **XYZ D65** hub for universal interoperability. Perceptual spaces (OKLab, Lab) use D50 natively with Bradford chromatic adaptation where needed.

Each color space is documented in [`assets/docs/`](assets/docs/)—historical context, component ranges, conversion functions, and practical applications.

### Gamut Mapping

Out-of-gamut colors are mapped using Ottosson's analytical sRGB algorithm: a polynomial initial guess refined by one Halley's method step. Zero iteration, cubic convergence, ~60–125x faster than CSS Color 4's binary search. Hue is preserved exactly; an adaptive `L0` formula blends between chroma reduction and mid-gray anchoring.

See [`docs/gamut-mapping.md`](docs/gamut-mapping.md) for the full treatment.

## Easing

40+ timing functions covering every CSS `<easing-function>` value plus bounce, back, and elastic. `CSSCubicBezier` solves via Newton-Raphson with bisection fallback; `cssLinear()` implements CSS Easing Level 2 piecewise-linear with gap filling per spec; stepped easings support all four jump terms.

## Transforms

CSS `matrix()` and `matrix3d()` decomposition per CSSOM spec. 3D uses Gram-Schmidt orthogonalization + quaternion extraction. `slerp` for rotation interpolation. `interpolateDecomposed()` for full transform blending.

## Palette API

The [demo](https://color.babb.dev) is backed by a palette API for saving, sharing, and voting on color palettes. Anonymous sessions (UUID tokens via `X-Session-Token`) gate all writes—no accounts required. Palettes are slug-addressed, votable (atomic toggle), and sortable by popularity or recency. A color name registry lets users propose names for CSS colors; admins approve or reject through a moderation queue.

Hono + MongoDB, Dockerized. See [`api/README.md`](api/README.md) for endpoints, schema, and deployment.

| Feature | Mechanism |
|---------|-----------|
| **Sessions** | `POST /sessions` → UUID token; stored with hashed IP; 30-day TTL |
| **Palettes** | CRUD by slug; 1–50 color stops with CSS string + optional name + position |
| **Voting** | `POST /palettes/:slug/vote` — idempotent toggle; unique composite index prevents duplication |
| **Color names** | `POST /colors/propose` → admin approval queue → `GET /colors/approved` feeds the demo's custom name registry |
| **Rate limiting** | 60 reads/min, 10 writes/min per IP (in-memory, rightmost X-Forwarded-For) |

## Sources, acknowledgements, &c.

- Ottosson, B. (2020). [A perceptual color space for image processing](https://bottosson.github.io/posts/oklab/). — OKLab: the perceptual color space used for `color-mix()` and gamut mapping.
- Ottosson, B. (2021). [sRGB gamut clipping](https://bottosson.github.io/posts/gamutclipping/). — Analytical gamut mapping algorithm (cubic boundary + Halley's method).
- Atkins Jr., T., Lilley, C., & Verou, L. (2025). [CSS Color Module Level 4](https://www.w3.org/TR/css-color-4/). W3C CRD. — The spec governing all CSS color functions.
- [CSS Filter Effects Module Level 1](https://www.w3.org/TR/filter-effects/#feColorMatrixElement). W3C. — `feColorMatrix`; basis for the CSS filter solver.
- Lindbloom, B. [XYZ to Correlated Color Temperature](http://www.brucelindbloom.com/index.html?Eqn_XYZ_to_T.html). — CCT conversion reference.
- [`@mkbabb/parse-that`](https://github.com/mkbabb/parse-that) — Parser combinators powering the CSS value grammar.

See [`docs/color-theory.md`](docs/color-theory.md) for the full bibliography.

## License

GPL-3.0-only
