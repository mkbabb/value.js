/**
 * cand-O · the AST and result shapes for the CSS `<color>` prototype.
 *
 * TWO DESIGN COMMITMENTS, both visible in these types:
 *
 * 1. THE PARSER DOES NO COLORIMETRY. `space` is the space the author WROTE
 *    (`xyz-d50` stays `xyz-d50`; `srgb` stays `srgb`), and channels are in that
 *    space's own units. Chromatic adaptation and the srgb→0..255 rescale are
 *    adapter concerns, isolated in `index.ts`. A parser that silently applies a
 *    Bradford matrix is not a parser.
 *
 * 2. NOTHING IS DISCARDED. A `<color>` that a *context-free* parser cannot
 *    resolve — `currentColor`, the 19 `<system-color>`s, `var()`/`env()`
 *    substitutions, CSS Color 5 relative syntax — is not an error, it is a
 *    RECOGNISED node of a different kind. The drop-in adapter is where that
 *    becomes `ok:false`, because `ParseResult<CssColor>` has nowhere to put it.
 */

/** A resolved channel, or the CSS Color 4 §4.4 missing-component keyword. */
export type Channel = number | "none";
export type Alpha = number | "none";

/**
 * The space as WRITTEN. `rgb`/`srgb` and `xyz-d50`/`xyz-d65` are deliberately
 * kept distinct from each other here even though value.js folds each pair.
 */
export type ColorSpace =
    | "rgb"
    | "hsl"
    | "hwb"
    | "lab"
    | "lch"
    | "oklab"
    | "oklch"
    | "srgb"
    | "srgb-linear"
    | "display-p3"
    | "a98-rgb"
    | "prophoto-rgb"
    | "rec2020"
    | "xyz-d50"
    | "xyz-d65";

/** Which production matched — kept because legacy vs modern is a real distinction. */
export type ColorSyntax =
    | "hex"
    | "named"
    | "transparent"
    | "modern"
    | "legacy"
    | "color-function";

export interface AbsoluteColor {
    readonly kind: "absolute";
    readonly space: ColorSpace;
    readonly channels: readonly [Channel, Channel, Channel];
    readonly alpha: Alpha;
    readonly syntax: ColorSyntax;
}

/** Why a recognised `<color>` is nonetheless unresolvable without a context. */
export type ContextReason =
    | "currentcolor"
    | "system-color"
    | "substitution"
    | "relative";

export interface ContextColor {
    readonly kind: "context";
    readonly reason: ContextReason;
    /** The lower-cased keyword or function name that triggered the classification. */
    readonly keyword: string;
}

export type ColorNode = AbsoluteColor | ContextColor;

export type IssueCode =
    /** The input is not a `<color>`. */
    | "css_syntax"
    /** Recognised, but resolving it needs information the parser does not have. */
    | "color_context_required"
    /** A channel came out ±Infinity and the channel has no clamp to absorb it. */
    | "color_non_finite"
    /** `none` where the adapter's target representation cannot carry missingness. */
    | "color_missing_channel"
    /** The argument was not a string at all. */
    | "invalid_input";

export interface ParseIssue {
    readonly code: IssueCode;
    /** Furthest offset the parse reached — the caret position, not always the start. */
    readonly offset: number;
    /** Non-empty only while parse-that diagnostics are enabled. */
    readonly expected: readonly string[];
    /** The unconsumed remainder at `offset`, or `null` when there is none. */
    readonly actual: string | null;
}

export type ParseResult<T> =
    | { readonly ok: true; readonly value: T }
    | { readonly ok: false; readonly issue: ParseIssue };

/**
 * The value.js `CssColor` shape, restated structurally so the prototype can be
 * compared against the published package WITHOUT importing its types (this file
 * must stay usable if value.js is not installed).
 */
export interface CssColorLike {
    readonly space: string;
    readonly channels: readonly [Channel, Channel, Channel];
    readonly alpha: Alpha;
}
