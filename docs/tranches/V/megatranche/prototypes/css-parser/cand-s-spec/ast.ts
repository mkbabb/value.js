/**
 * CANDIDATE S · SPEC-SHAPED — the parsed shape of `<color>`.
 *
 * THE FORMULATION. Every production in this candidate corresponds 1:1 to a
 * NAMED production in the CSS specifications, carries that production's own
 * name, and quotes the spec text above it. The AST is the same shape: a node
 * per spec concept, never a bag of captured strings. A production's value type
 * IS the thing the production means (GROUND-B R-1), so nothing here defers work
 * to a second pass — and a second pass over captured substrings is exactly
 * where the subject's 70 index-`!` overrides breed.
 *
 * Arity is in the TYPE where the spec fixes it (`{3}` ⇒ a 3-tuple, `{4}` ⇒ a
 * 4-tuple) and only an array where the spec genuinely does not (`*`). That is
 * what lets the productions below destructure positionally without a single
 * `!`: `noUncheckedIndexedAccess` widens ARRAY element access to `| undefined`,
 * but never a fixed TUPLE position.
 */

/** css-color-4 §4.4 — a component is a number, or the MISSING-component marker `none`. */
export type Channel = number | "none";

/** css-color-4 §4.1 / §4.4 — the alpha component, which may also be missing. */
export type Alpha = number | "none";

/** `{3}` in the spec's own notation. */
export type Triple = readonly [Channel, Channel, Channel];

/** `{4}` — css-color-5 §9 `<cmyk-component>{4}`. */
export type Quad = readonly [Channel, Channel, Channel, Channel];

/**
 * The space a parsed colour lives in.
 *
 * Channel conventions are value.js's (so this parser is drop-in for the
 * existing colour model): `rgb` 0–255, `hsl`/`hwb` hue in degrees with the
 * other two in 0–1, `lab`/`lch` L in 0–100, `oklab`/`oklch` L in 0–1, the
 * predefined-RGB and XYZ spaces in 0–1.
 *
 * `xyz-d65` folds onto `xyz` — css-color-4 §10.1 says they name the same space.
 * `xyz-d50` does NOT fold: chromatic adaptation is a COLOUR operation, not a
 * parsing one, and folding it here is what makes `color(xyz-d50 none 0 0)`
 * unrepresentable in the subject (GROUND-A P-024). The parser reports what was
 * written; `src/color/anchors.ts#adaptXyzD50ToD65` remains the place that adapts.
 */
export type ColorSpace =
    | "rgb"
    | "hsl"
    | "hwb"
    | "lab"
    | "lch"
    | "oklab"
    | "oklch"
    | "srgb-linear"
    | "display-p3"
    | "a98-rgb"
    | "prophoto-rgb"
    | "rec2020"
    | "xyz"
    | "xyz-d50";

/**
 * css-color-4 §4 `<color-base>` once resolved: a space, three components and an
 * alpha. `<hex-color>`, `<named-color>`, `transparent` and every
 * `<color-function>` land here.
 */
export interface AbsoluteColor {
    readonly kind: "absolute";
    readonly space: ColorSpace;
    readonly channels: Triple;
    readonly alpha: Alpha;
}

/**
 * css-color-4 §10.3 `color( <dashed-ident> … )` — a custom `@color-profile`.
 * The channel count is profile-defined, so this is the one node with a
 * variable-length channel list.
 */
export interface CustomProfileColor {
    readonly kind: "custom-profile";
    readonly profile: string;
    readonly channels: readonly Channel[];
    readonly alpha: Alpha;
}

/** css-color-5 §9 `<device-cmyk()>` — four components, device-dependent. */
export interface DeviceCmykColor {
    readonly kind: "device-cmyk";
    readonly channels: Quad;
    readonly alpha: Alpha;
}

/** css-color-4 §6.3 `currentColor` — resolves against the `color` property. */
export interface CurrentColor {
    readonly kind: "current-color";
}

/** css-color-4 §6.2 `<system-color>` — resolves against the user's OS/UA theme. */
export interface SystemColor {
    readonly kind: "system-color";
    readonly name: string;
}

/** css-color-5 §4 — one channel slot inside a relative colour. */
export type RelativeTerm =
    | { readonly term: "number"; readonly value: number }
    | { readonly term: "percentage"; readonly value: number }
    | { readonly term: "none" }
    /** A channel keyword of the origin colour: `r`, `g`, `b`, `h`, `l`, `alpha`, … */
    | { readonly term: "channel"; readonly name: string };

/**
 * css-color-5 §4 relative colour syntax — `rgb(from <color> r g b)`.
 * Resolution needs the origin colour's channels bound as keywords, which is a
 * colour operation; the parser records the shape and refuses to invent it.
 */
export interface RelativeColor {
    readonly kind: "relative";
    readonly space: ColorSpace;
    readonly origin: ColorValue;
    readonly channels: readonly [RelativeTerm, RelativeTerm, RelativeTerm];
    readonly alpha: RelativeTerm | undefined;
}

/** css-color-4 §12.2 `<hue-interpolation-method>`. */
export type HueInterpolationMethod = "shorter" | "longer" | "increasing" | "decreasing";

/** css-color-4 §12 `<color-interpolation-method>`. */
export interface ColorInterpolationMethod {
    readonly space: string;
    readonly hue: HueInterpolationMethod | undefined;
}

/** css-color-5 §3 — one `[ <color> && <percentage [0,100]>? ]` of a `color-mix()`. */
export interface MixComponent {
    readonly color: ColorValue;
    readonly percentage: number | undefined;
}

/** css-color-5 §3 `<color-mix()>`. */
export interface ColorMix {
    readonly kind: "color-mix";
    readonly method: ColorInterpolationMethod;
    readonly components: readonly [MixComponent, MixComponent];
}

/** css-color-5 §7 `<light-dark()>` — resolves against the used colour scheme. */
export interface LightDark {
    readonly kind: "light-dark";
    readonly light: ColorValue;
    readonly dark: ColorValue;
}

/** css-color-5 §8 `<contrast-color()>`. */
export interface ContrastColor {
    readonly kind: "contrast-color";
    readonly against: ColorValue;
}

/**
 * css-variables-1 §3 / css-env-1 — `var()` and `env()` are SUBSTITUTIONS. They
 * are recognised grammatically (so `var(--x, red)` is well-formed input rather
 * than a mystery) and refused at the door, because substitution happens before
 * a colour exists.
 */
export interface Substitution {
    readonly kind: "substitution";
    readonly name: "var" | "env";
    readonly arguments: string;
}

/** css-color-4 §4 `<color>` — the whole grammar, in one union. */
export type ColorValue =
    | AbsoluteColor
    | CustomProfileColor
    | DeviceCmykColor
    | CurrentColor
    | SystemColor
    | RelativeColor
    | ColorMix
    | LightDark
    | ContrastColor
    | Substitution;

/** Constructor for the common case, so no production hand-rolls the object shape. */
export const absolute = (space: ColorSpace, channels: Triple, alpha: Alpha): AbsoluteColor => ({
    kind: "absolute",
    space,
    channels,
    alpha,
});

/**
 * Whether a recognised colour needs information the parser does not have.
 * This is the ONLY place the context-free contract is stated, and it is stated
 * over the AST — not as a regex pre-empt in the middle of the grammar. (The
 * subject's pre-empt is `/\bfrom\b/i.test(body)`, which also fires on the
 * perfectly concrete `color(--from-scan 1 0 0)`.)
 */
export function isContextDependent(color: ColorValue): boolean {
    switch (color.kind) {
        case "absolute":
            return false;
        default:
            return true;
    }
}
