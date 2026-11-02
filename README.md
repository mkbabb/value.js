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

### Colour vision and palette checks

`checkCategoricalPalette` checks a categorical (identity) palette, in order, on its ground: each colour's OKLCh lightness band, its chroma floor and its WCAG contrast against the ground, then each pair's ΔEOK under normal vision and under simulated protan, deutan and tritan vision. It takes colour objects or any CSS `<color>` text the parser reads. A `var()` must be resolved before the call: pass the computed value or the literal hex. A palette that fails its checks is still `ok`, with `verdict: "fail"` and every measurement in `findings`; an `err` means the input was unusable.

```ts
import { checkCategoricalPalette } from "@mkbabb/value.js/color";

const report = checkCategoricalPalette(
    ["#982A6B", "#338C00", "#1A5FA0", "#BC0007", "#008E84", "#A88F42", "#7C4D00", "#D65A04"],
    { ground: "#fcfcfb", scheme: "light" }, // pairs: "adjacent" | "cyclic" | "all" | [[i, j], …]
);
if (!report.ok) throw new Error(report.error.code);
console.log(report.value.verdict, report.value.worst.separation.deutan?.value); // "pass" 0.1398…
```

The three primitives are exported on their own and take colour objects:

- `deltaEOK(a, b)`: Euclidean OKLab distance on the **unit** scale (black to white is 1.0; CSS Color 4's gamut-mapping JND is 0.02). Multiply by 100 to read the dataviz validator's figures: its "ΔE 8" is 0.08 here.
- `contrastRatio(a, b)`: the WCAG 2.x ratio `safeAccentColor` admits candidates with. Inputs are mapped into sRGB, the result is the lesser of the float and the byte-quantized ratio, in [1, 21], and never rounded.
- `simulateColorVision(color, { kind, severity = 1, method = "machado" })`: the answer is in srgb-linear. **Machado, Oliveira & Fernandes 2009** (IEEE TVCG 15(6), doi:10.1109/TVCG.2009.113): the authors' 11-step table, shipped verbatim, interpolated between tenths by colorspacious's rule. **Viénot, Brettel & Mollon 1999** (Color Res. Appl. 24(4)) is the protan and deutan dichromat form (`method: "vienot"`, severity 1 only; DaltonLens's sRGB/Smith-Pokorny derivation). Both apply in linear sRGB to the colour mapped into sRGB, and each output channel is **clipped** to [0, 1], as DaltonLens and the validator do. The clip is a model artefact that shifts hue on saturated input; it is kept because the thresholds below were calibrated on clipped output. Tritan is simulated and reported but is the model's least-validated case, so it is not gated by default. Viénot defines no tritan form, and that request is refused.

| Option | Default | Source |
|---|---|---|
| `lightness` | light [0.43, 0.77], dark [0.48, 0.67] OKLCh L | design choice (validate_palette.js `BAND`) |
| `chroma` | target 0.10, floor 0.10 | design choice (validate_palette.js `CHROMA_FLOOR`) |
| `contrast` | target 3, floor 1 (below 3:1 warns) | WCAG 2.1/2.2 SC 1.4.11 for the 3:1; warn-not-fail is a design choice, since labels or a table also meet SC 1.4.11. `{ target: 3, floor: 3 }` makes it a hard gate |
| `normal` | target 0.15, floor 0.15 ΔEOK | design choice (validate_palette.js `NORMAL_FLOOR` 15 ×100) |
| `cvd` | target 0.08, floor 0.06 ΔEOK | validate_palette.js `CVD_TARGET`/`CVD_FLOOR` (×100), calibrated on Machado 2009 at severity 1, clipped. The check therefore fixes that model. The warn band is legal only with secondary encoding |
| `gate` | protan, deutan on; tritan off (reported as `"info"`) | design choice: prevalence (Sharpe et al. 1999) and tritan's validation status |
| `pairs` | `"adjacent"` | design choice: `"cyclic"` for pies, `"all"` for scatter plots and maps |
| `ground`, `scheme` | required | a default ground would make contrast verdicts silently wrong |

Banded checks pass at `≥ target`, warn in `[floor, target)` and fail below `floor`, on raw floats. Changing a default changes verdicts, so it is treated as at least a minor version.

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
