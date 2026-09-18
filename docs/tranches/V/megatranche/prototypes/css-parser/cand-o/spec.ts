/**
 * cand-O · the CSS Color 4 channel table — the ONE place a range lives.
 *
 * Every colour function in css-color-4 has the same shape: a head keyword, three
 * channels, an optional slash-alpha, and (for `rgb`/`hsl` only) a legacy
 * comma form. The functions differ ONLY in what the three channels mean. So the
 * grammar is written once, parameterised by this table, and `rgb()` and
 * `oklch()` are two rows — not two hand-written parsers that can drift apart.
 *
 * Each channel says three things:
 *
 *   `percentRef`         — what `100%` equals, or `null` when `<percentage>` is
 *                          not a valid token here (`<hue>` is the only such case).
 *   `numberIsPercentage` — css-color-4 §8.2/§8.3: for `hsl`/`hwb`'s saturation,
 *                          lightness, whiteness and blackness a bare `<number>`
 *                          IS a percentage, so `hsl(120 50 50)` ≡
 *                          `hsl(120 50% 50%)`. That equivalence has to hold to
 *                          the LAST BIT, so the two arms are not "×0.01" and
 *                          "÷100" — they are literally the same expression.
 *                          (`n * 0.01 !== n / 100` for 114 of the 1001 values
 *                           0, 0.1, …, 100. A scale factor would have made the
 *                           two spellings of `hsl` disagree.)
 *   `clamp`              — the parsed-value-time clamp, or `null` for the
 *                          genuinely unbounded channels (`lab`/`oklab` a and b,
 *                          every `color()` channel — out-of-gamut is legal).
 *
 * The percentage arithmetic is written `(value * percentRef) / 100`, matching
 * value.js's `value * percentScale / 100` association exactly, so equivalence
 * against the published package is bit-for-bit and not merely close.
 *
 * The numeric CONVENTIONS (what `1` means in the AST) are value.js's, so the
 * adapter in `index.ts` is a rename and nothing more:
 *   rgb 0..255 · hsl/hwb s,l,w,b 0..1 · lab/lch L 0..100 · oklab/oklch L 0..1
 *   lch C 0..150 · oklch C 0..0.4 · lab a,b ±125 · oklab a,b ±0.4 · hue degrees.
 *
 * Clamping citations: css-color-4 §8.1 (rgb), §8.2 (hsl), §8.3 (hwb),
 * §9.2 (lab), §9.3 (lch), §9.4 (oklab), §9.5 (oklch), §10 (color(), NOT
 * clamped), §4.2 (`<alpha-value>` clamped to [0,1]).
 *
 * `<hue>` is NOT wrapped at parse time (css-color-4 §7: hues outside
 * [0deg,360deg] are "not clamped or wrapped" — wrapping is a serialisation
 * concern). value.js agrees, so this is one fewer divergence.
 */

import type { ColorSpace } from "./ast";

export interface ChannelSpec {
    /** `hue` accepts `<angle>` units and refuses `<percentage>`. */
    readonly kind: "number" | "hue";
    readonly percentRef: number | null;
    readonly numberIsPercentage: boolean;
    readonly clamp: readonly [number, number] | null;
}

export type ChannelTriple = readonly [ChannelSpec, ChannelSpec, ChannelSpec];

const hue: ChannelSpec = {
    kind: "hue",
    percentRef: null,
    numberIsPercentage: false,
    clamp: null,
};

/** A `<percentage>`-or-`<number>` channel whose 100% is `ref`. */
const scaled = (
    ref: number,
    clamp: readonly [number, number] | null,
): ChannelSpec => ({
    kind: "number",
    percentRef: ref,
    numberIsPercentage: false,
    clamp,
});

/** `s`/`l`/`w`/`b`: 100% = 1, and a bare `<number>` is read as a percentage. */
const ratio: ChannelSpec = {
    kind: "number",
    percentRef: 1,
    numberIsPercentage: true,
    clamp: [0, 1],
};

const NON_NEGATIVE = Number.POSITIVE_INFINITY;

export const RGB_CHANNELS: ChannelTriple = [
    scaled(255, [0, 255]),
    scaled(255, [0, 255]),
    scaled(255, [0, 255]),
];

export const HSL_CHANNELS: ChannelTriple = [hue, ratio, ratio];
export const HWB_CHANNELS: ChannelTriple = [hue, ratio, ratio];

export const LAB_CHANNELS: ChannelTriple = [
    scaled(100, [0, 100]),
    scaled(125, null),
    scaled(125, null),
];

export const LCH_CHANNELS: ChannelTriple = [
    scaled(100, [0, 100]),
    scaled(150, [0, NON_NEGATIVE]),
    hue,
];

export const OKLAB_CHANNELS: ChannelTriple = [
    scaled(1, [0, 1]),
    scaled(0.4, null),
    scaled(0.4, null),
];

export const OKLCH_CHANNELS: ChannelTriple = [
    scaled(1, [0, 1]),
    scaled(0.4, [0, NON_NEGATIVE]),
    hue,
];

/** `color()` predefined spaces: 100% = 1, and NOTHING is clamped (§10). */
const predefined = scaled(1, null);
export const PREDEFINED_CHANNELS: ChannelTriple = [
    predefined,
    predefined,
    predefined,
];

/** `<alpha-value>` — §4.2: `<number> | <percentage>`, clamped to [0,1]. */
export const ALPHA_CHANNEL: ChannelSpec = scaled(1, [0, 1]);

/** Which comma-separated form, if any, css-color-4 §8 still admits. */
export type LegacyForm =
    /** `rgb(<number>#{3})` | `rgb(<percentage>#{3})`, then `, <alpha-value>`. */
    | "number-or-percent-triple"
    /** `hsl(<hue>, <percentage>, <percentage>)`, then `, <alpha-value>`. */
    | "hue-percent-percent";

export interface FunctionSpec {
    /** Canonical lower-case name, used in diagnostics and context nodes. */
    readonly name: string;
    /** Case-insensitive head, as a single regex alternation (`rgba?`, `oklch`). */
    readonly head: RegExp;
    readonly space: ColorSpace;
    readonly channels: ChannelTriple;
    /**
     * `null` for every function introduced by css-color-4 — `hwb()`, `lab()`,
     * `lch()`, `oklab()`, `oklch()` and `color()` have NO comma syntax, and
     * accepting one is an over-accept, not leniency.
     */
    readonly legacy: LegacyForm | null;
}

export const RGB_FUNCTION: FunctionSpec = {
    name: "rgb",
    head: /rgba?/i,
    space: "rgb",
    channels: RGB_CHANNELS,
    legacy: "number-or-percent-triple",
};

export const HSL_FUNCTION: FunctionSpec = {
    name: "hsl",
    head: /hsla?/i,
    space: "hsl",
    channels: HSL_CHANNELS,
    legacy: "hue-percent-percent",
};

export const HWB_FUNCTION: FunctionSpec = {
    name: "hwb",
    head: /hwb/i,
    space: "hwb",
    channels: HWB_CHANNELS,
    legacy: null,
};

export const LAB_FUNCTION: FunctionSpec = {
    name: "lab",
    head: /lab/i,
    space: "lab",
    channels: LAB_CHANNELS,
    legacy: null,
};

export const LCH_FUNCTION: FunctionSpec = {
    name: "lch",
    head: /lch/i,
    space: "lch",
    channels: LCH_CHANNELS,
    legacy: null,
};

export const OKLAB_FUNCTION: FunctionSpec = {
    name: "oklab",
    head: /oklab/i,
    space: "oklab",
    channels: OKLAB_CHANNELS,
    legacy: null,
};

export const OKLCH_FUNCTION: FunctionSpec = {
    name: "oklch",
    head: /oklch/i,
    space: "oklch",
    channels: OKLCH_CHANNELS,
    legacy: null,
};

/**
 * `color()`'s `<colorspace-params>` heads. `srgb` and `xyz` are kept SEPARATE
 * from the `rgb`/`xyz-d65` AST spaces above so the adapter, not the grammar,
 * owns the ×255 rescale and the D50→D65 adaptation.
 */
export const PREDEFINED_SPACES: Readonly<Record<string, ColorSpace>> =
    Object.freeze({
        srgb: "srgb",
        "srgb-linear": "srgb-linear",
        "display-p3": "display-p3",
        "a98-rgb": "a98-rgb",
        "prophoto-rgb": "prophoto-rgb",
        rec2020: "rec2020",
        xyz: "xyz-d65",
        "xyz-d65": "xyz-d65",
        "xyz-d50": "xyz-d50",
    });
