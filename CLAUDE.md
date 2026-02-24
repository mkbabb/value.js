# value.js

CSS value unit library: parsing, normalization, interpolation, color space conversion.

## Build
npm run build        # library → dist/value.js + value.cjs + value.d.ts
npm run gh-pages     # demo → dist/
npm run dev          # dev server on :8080

## Test
npm test             # vitest (jsdom)

## Structure
src/parsing/         # Parsimmon-based CSS value parsers
src/units/           # ValueUnit, FunctionValue, ValueArray classes
src/units/color/     # 10 color spaces, conversion, normalization
src/math.ts          # lerp, bezier, clamp, scale
src/utils.ts         # clone, memoize, debounce
demo/                # Vue 3 color picker demo

## Entry point
src/units/index.ts → exports all public API
