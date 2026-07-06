import { ValueUnit } from "../units";
import { Color, ch, channelOf, setChannel } from "../units/color";
import { normalizeColorUnit } from "../units/color/normalize";

// ─── The color-parse boundary currency ─────────────────────────────────────
//
// Extracted from `color.ts` (W1-8 · god-module-dry-census): the parsed-color
// ValueUnit shape + its construct/resolve helpers are the boundary currency the
// WHOLE color parser trades in, but they are NOT parser combinators — no
// grammar order/reference sensitivity — so they lift cleanly into this leaf.
// `color.ts` and `relative-color.ts` both build on it; the leaf imports nothing
// from the parsing tree, so no new cycle is introduced.

/**
 * The typed currency of the color-parse boundary. A `parseCSSColor` /
 * `CSSColor.Value` result is a `ValueUnit` carrying a `Color` whose channels are
 * `ValueUnit<number>` — the exact shape `normalizeColorUnit` / `colorUnit2`
 * consume. Parsers construct the inner `Color` with raw numbers, but the whole
 * color pipeline reads channels through `ValueUnit.unwrapDeep` (tolerating both
 * `number` and `ValueUnit<number>`), so this is the canonical boundary type the
 * pipeline speaks. Typing the parser annotation to it (rather than the bare
 * `ValueUnit<any>`) lets every consumer drop the hand-narrowing cast.
 *
 * NOTE: `currentColor` / `light-dark()` resolve to deferred `"color-keyword"`
 * sentinels (a `ValueUnit<string | FunctionValue>`); those ride the same parser
 * and are structurally `ValueUnit`. Demo consumers feed the result straight into
 * `normalizeColorUnit` (the color path); the sentinel survives verbatim for the
 * keyframes.js render seam (it never reaches `normalizeColorUnit`).
 */
export type ParsedColorUnit = ValueUnit<Color<ValueUnit<number>>, "color">;

export const createColorValueUnit = (value: Color<any>): ParsedColorUnit => {
    return new ValueUnit(
        value,
        "color",
        ["color", value.colorSpace],
        undefined,
        "color",
    );
};

/** Resolve a parsed ValueUnit<Color<ValueUnit>> to a plain Color<number> with normalized [0,1] components. */
export function resolveToPlainColor(colorUnit: ValueUnit): Color<number> {
    // Parser-produced color units always wrap a `Color<ValueUnit<number>>`
    // (see `createColorValueUnit`) — narrow the generic `ValueUnit` param to
    // the shape `normalizeColorUnit` requires.
    const normalized = normalizeColorUnit(
        colorUnit as ValueUnit<Color<ValueUnit<number>>, "color">,
    );
    const color = normalized.value;
    // `clone()` preserves the concrete subclass; the loop below overwrites
    // every channel slot with the unwrapped numeric value, so the cloned
    // instance is reinterpreted as a `Color<number>` for the writes.
    const plain = color.clone() as unknown as Color<number>;
    for (const key of color.keys()) {
        setChannel(plain, key, ch(ValueUnit.unwrapDeep(channelOf(color, key))));
    }
    return plain;
}
