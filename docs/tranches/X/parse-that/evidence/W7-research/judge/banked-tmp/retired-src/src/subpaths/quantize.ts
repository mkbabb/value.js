/**
 * `@mkbabb/value.js/quantize` — derived from `../quantize` (PSL-1).
 *
 * This area is a single module, so that module's own `export` keywords draw
 * the public/internal line and this file forwards them whole.
 *
 * The colour and `Result` blocks are PSL-2, not a second surface:
 * `QuantizedColor` carries a `Color<"rgb">` and `quantizePixels` answers in a
 * `Result`, so both must be nameable from the subpath that returns them.
 */
export * from "../quantize";
