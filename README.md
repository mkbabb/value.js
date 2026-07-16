# `@mkbabb/value.js`

Typed, failure-explicit primitives for CSS values, color, easing, transforms, numeric interpolation, and perceptual palette extraction.

[Demo](https://color.babb.dev) · [Repository](https://github.com/mkbabb/value.js)

## Install

```bash
npm install @mkbabb/value.js
```

Version 4 is a clean capability-based package. It has no root export. Import one of exactly seven public entries:

- `@mkbabb/value.js/color`
- `@mkbabb/value.js/value`
- `@mkbabb/value.js/css`
- `@mkbabb/value.js/easing`
- `@mkbabb/value.js/math`
- `@mkbabb/value.js/transform`
- `@mkbabb/value.js/quantize`

The removed root, `/parsing`, and `/units` entries have no aliases or compatibility shims.

## CSS parsing

Parsers return a discriminated `ParseResult<T>`. Success has a value and empty diagnostics; failure has a non-empty diagnostic tuple.

```ts
import { parseCssColor, serializeCssColor } from "@mkbabb/value.js/css";

const parsed = parseCssColor("oklch(62% 0.27 9.8 / 80%)");
if (!parsed.ok) {
    throw new Error(parsed.diagnostics[0].code);
}

const serialized = serializeCssColor(parsed.value);
if (!serialized.ok) {
    throw new Error(serialized.error.code);
}

console.log(serialized.value);
```

The `/css` capability also owns structured CSS values, stylesheet/keyframe parsing, animation and timeline collection, custom functions, property descriptors, timing functions, and canonical serialization.

## Color

The `/color` capability exposes immutable color objects and failure-explicit operations across 17 spaces. CSS spelling remains the responsibility of `/css` and its closed CSS-native color union.

```ts
import { convertColor, mixColors, oklch, toRgba8 } from "@mkbabb/value.js/color";

const rose = oklch(0.72, 0.18, 18);
const violet = oklch(0.58, 0.22, 305);
if (!rose.ok || !violet.ok) throw new Error("Invalid source color");

const mixed = mixColors(rose.value, violet.value, 0.5, {
    space: "oklab",
    hue: "shorter",
});
if (!mixed.ok) throw new Error(mixed.error.code);

const rgb = convertColor(mixed.value, "rgb");
if (!rgb.ok) throw new Error(rgb.error.code);

const bytes = toRgba8(rgb.value, { gamut: "clip" });
if (!bytes.ok) throw new Error(bytes.error.code);
console.log(bytes.value);
```

## Easing

```ts
import { CubicBezier, easeOutExpo, steppedEase } from "@mkbabb/value.js/easing";

console.log(easeOutExpo(0.5));

const curve = CubicBezier(0.22, 1, 0.36, 1);
if (!curve.ok) throw new Error(curve.error.code);

const steps = steppedEase(5, "jump-end");
if (!steps.ok) throw new Error(steps.error.code);
```

## Quantization

```ts
import { dominantColor, quantizePixels } from "@mkbabb/value.js/quantize";

const palette = quantizePixels(pixels, width, height, { k: 6 });
const dominant = dominantColor(pixels, width, height);

if (!palette.ok || !dominant.ok) throw new Error("Palette extraction failed");
```

## Other capabilities

- `/value`: structural `CssScalar`, `CssCall`, `CssList`, and `CssValue` types plus `isLayoutTrackingUnit`.
- `/math`: pure numeric interpolation, scaling, Bézier, and de Casteljau primitives.
- `/transform`: 2D/3D matrix decomposition, recomposition, quaternion interpolation, and DOM-free path sampling.

## Development

```bash
npm ci
npx vue-tsc -p tsconfig.lib.json --noEmit
npm run build
npm test
npm run lint
```

The published package contains only the seven capability entries and their declarations. Demo integration tests live on the downstream consumer lane and are not part of the producer release graph.

## License

[MIT](./LICENSE) © 2026 Mike Babb.
