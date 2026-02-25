# value.js

CSS value unit library: parsing, normalization, interpolation, color space conversion.

## Build
npm run build        # library → dist/value.js + value.cjs + value.d.ts
npm run gh-pages     # demo → dist/
npm run dev          # dev server on :8080

## Test
npm test             # vitest (jsdom)
npm run test:e2e     # playwright

## Structure
src/parsing/         # parse-that-based CSS value parsers
src/units/           # ValueUnit, FunctionValue, ValueArray classes
src/units/color/     # 15 color spaces, conversion, normalization, filter solver
src/easing.ts        # CSS timing functions (18+ named easings, cubic-bezier, stepped)
src/math.ts          # lerp, bezier, clamp, scale
src/utils.ts         # clone, memoize, debounce
src/index.ts         # barrel: exports all public API
demo/                # Vue 3 color picker demo
api/                 # Cloudflare Worker + D1 palette API

## Conventions
- TypeScript strict:true, verbatimModuleSyntax:true
- moduleResolution:bundler, target:ES2022
- import type for type-only imports
- @mkbabb/parse-that for all parsing (not Parsimmon)

## Entry point
src/index.ts → exports all public API
