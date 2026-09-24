/**
 * `@mkbabb/value.js/value` — derived from `../value` (PSL-1).
 *
 * This area is a single module, so that module's own `export` keywords draw
 * the public/internal line and this file forwards them whole.
 *
 * The colour block is PSL-2, not a second surface: `CssScalar`'s `color`
 * payload carries an `AnyColor`, so a consumer who writes down what
 * `CssScalar` holds must be able to name it — and its own vocabulary —
 * from the subpath that returns it.
 */
export * from "../value";
