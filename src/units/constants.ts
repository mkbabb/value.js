export const ABSOLUTE_LENGTH_UNITS = ["px", "cm", "mm", "Q", "in", "pc", "pt"] as const;
export const RELATIVE_LENGTH_UNITS = [
    "em",
    "ex",
    "ch",
    "cap",
    "ic",
    "rem",
    "lh",
    "rlh",
    "vw",
    "vh",
    "vmin",
    "vmax",
    "vb",
    "vi",
    "svw",
    "svh",
    "svi",
    "svb",
    "svmin",
    "svmax",
    "lvw",
    "lvh",
    "lvi",
    "lvb",
    "lvmin",
    "lvmax",
    "dvw",
    "dvh",
    "dvi",
    "dvb",
    "dvmin",
    "dvmax",
    "cqw",
    "cqh",
    "cqi",
    "cqb",
    "cqmin",
    "cqmax",
] as const;
export const LENGTH_UNITS = [
    ...ABSOLUTE_LENGTH_UNITS,
    ...RELATIVE_LENGTH_UNITS,
] as const;

export const TIME_UNITS = ["s", "ms"] as const;
export const ANGLE_UNITS = ["deg", "rad", "grad", "turn"] as const;
export const PERCENTAGE_UNITS = ["%"] as const;
export const FREQUENCY_UNITS = ["Hz", "kHz"] as const;
export const RESOLUTION_UNITS = ["dpi", "dpcm", "dppx"] as const;
export const FLEX_UNITS = ["fr"] as const;

export const COMPUTED_UNITS = ["var", "calc"] as const;

export const STRING_UNITS = ["string"] as const;

// `color` is a resolved Color<...>; `color-keyword` is the VJ-3 deferred
// sentinel (`currentColor` / `light-dark(...)`) whose value is a keyword string
// or a `light-dark` FunctionValue — it is NOT a `Color`, so `isColorUnit`
// (exact `=== "color"`) deliberately excludes it from the RGB normalize path.
export const COLOR_UNITS = ["color", "color-keyword"] as const;

export const UNITS = [
    ...LENGTH_UNITS,
    ...TIME_UNITS,

    ...ANGLE_UNITS,
    ...PERCENTAGE_UNITS,
    ...FREQUENCY_UNITS,
    ...RESOLUTION_UNITS,
    ...FLEX_UNITS,

    ...COMPUTED_UNITS,
    ...STRING_UNITS,

    ...COLOR_UNITS,

    "",
    undefined,
] as const;

export const BLACKLISTED_COALESCE_UNITS = ["string", "var", "calc"] as const;

export interface MatrixValues {
    scaleX: number;
    scaleY: number;
    scaleZ: number;

    skewX: number;
    skewY: number;
    skewZ: number;

    translateX: number;
    translateY: number;
    translateZ: number;

    rotateX: number;
    rotateY: number;
    rotateZ: number;

    perspectiveX: number;
    perspectiveY: number;
    perspectiveZ: number;
    perspectiveW: number;
}

/**
 * The CSS identity value of a `<filter-function>` / `<transform-function>`,
 * by function name (MCI-5, tranche-N W7). When two interpolation endpoints have
 * a different number of functions (`filter: blur(4px)` vs `blur(4px)
 * brightness(2)`), the shorter side's absent slot must be padded with the
 * **absent function's CSS identity** — `brightness(1)`, NOT a bare `0` — so the
 * slot lerps `1 → 2` and holds the no-op value `1` at `t=0`. A bare `0` would
 * resolve black at `t=0` (silent-wrong for every non-`0`-identity function).
 *
 * `value` is the identity scalar; `unit` is the dimension the identity carries
 * (the unit matters: `hue-rotate` is `0deg`, `blur` is `0px`, multipliers like
 * `brightness`/`scale` are unitless). `functionIdentityValue` (in
 * `./utils`) materialises this into a `ValueUnit` the arity pad pushes.
 *
 * The per-function value is the value all of that function's positional
 * arguments share at identity (e.g. `scale(1, 1)`, `translate(0, 0)`), so a
 * single scalar covers every argument slot — `drop-shadow` (a composite
 * `<length>{2,3} <color>?`) is intentionally absent: it has no single-scalar
 * identity and falls through to the caller's fallback.
 */
export const FUNCTION_IDENTITY: Readonly<
    Record<string, { value: number; unit?: string }>
> = {
    // <filter-function> multipliers (identity 1, unitless)
    brightness: { value: 1 },
    contrast: { value: 1 },
    saturate: { value: 1 },
    opacity: { value: 1 },
    // <filter-function> proportions (identity 0, unitless)
    grayscale: { value: 0 },
    sepia: { value: 0 },
    invert: { value: 0 },
    // <filter-function> dimensioned (identity 0 with a unit)
    blur: { value: 0, unit: "px" },
    "hue-rotate": { value: 0, unit: "deg" },
    // <transform-function> scales (identity 1, unitless)
    scale: { value: 1 },
    scaleX: { value: 1 },
    scaleY: { value: 1 },
    scaleZ: { value: 1 },
    scale3d: { value: 1 },
    // <transform-function> translations (identity 0, px)
    translate: { value: 0, unit: "px" },
    translateX: { value: 0, unit: "px" },
    translateY: { value: 0, unit: "px" },
    translateZ: { value: 0, unit: "px" },
    translate3d: { value: 0, unit: "px" },
    // <transform-function> rotations + skews (identity 0deg)
    rotate: { value: 0, unit: "deg" },
    rotateX: { value: 0, unit: "deg" },
    rotateY: { value: 0, unit: "deg" },
    rotateZ: { value: 0, unit: "deg" },
    rotate3d: { value: 0, unit: "deg" },
    skew: { value: 0, unit: "deg" },
    skewX: { value: 0, unit: "deg" },
    skewY: { value: 0, unit: "deg" },
    // perspective identity is `none` (no perspective); no single-scalar form.
} as const;
