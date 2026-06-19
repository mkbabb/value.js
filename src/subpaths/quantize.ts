/**
 * `@mkbabb/value.js/quantize` — color quantization (O.W2). parse-that-FREE.
 *
 * `src/quantize/*` composes only over `units/color/gamut` (parse-that-free) +
 * `../math` — median-cut palette extraction + dominant-color, no CSS grammar.
 */
export { quantizePixels, dominantColor } from "../quantize";
export type { QuantizeOptions, QuantizedColor } from "../quantize";
