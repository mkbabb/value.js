/**
 * CANDIDATE B — the `<color>` syntax tree.
 *
 * DESIGN LINE, stated once and held everywhere below:
 *   unit normalisation (percentage -> the production's reference range, angle ->
 *   degrees) is PARSING; colour-space conversion is the COLOUR MODEL's job.
 * So `color(xyz-d50 …)` keeps the space it was authored in and is NOT
 * chromatically adapted here, and `color(srgb …)` keeps srgb's own 0..1 range
 * rather than being multiplied into rgb's 0..255. `src/css/grammar.ts` crosses
 * that line in both places; the divergence is deliberate and is reported.
 *
 * There are no `!` non-null assertions and no `as` casts in this file, and the
 * shapes below are chosen so that a CONSUMER does not need them either:
 * `Channels` is a non-empty tuple type, and `triple` / `pair` are the total
 * accessors for the fixed-arity cases.
 */

/** A resolved channel value, or the css-color-4 §4.4 missing-component keyword. */
export type Channel = number | "none";

/**
 * Channel list. Arity is fixed by the grammar (the table drives it), so the
 * type only has to promise NON-EMPTY — which is exactly the promise
 * `noUncheckedIndexedAccess` wants and the thing 70 index-`!`s were faking.
 */
export type Channels = readonly [Channel, ...Channel[]];

export type PredefinedSpace =
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
    | "xyz-d65"
    | "xyz-d50"
    | "device-cmyk";

/** css-color-5 §5 lets `color()` name an `@color-profile` by `<dashed-ident>`. */
export interface CustomProfile {
    readonly profile: string;
}

export type ColorSpace = PredefinedSpace | CustomProfile;

export type HueMethod = "shorter" | "longer" | "increasing" | "decreasing";

export interface InterpolationMethod {
    readonly space: ColorSpace;
    /** Only a polar space may carry one — enforced by the grammar, not by a check. */
    readonly hue: HueMethod | undefined;
}

export interface MixComponent {
    readonly color: ColorNode;
    /** `<percentage>` as authored (0..100), not normalised. */
    readonly weight: number | undefined;
}

/** A channel position inside relative colour syntax (css-color-5 §2). */
export type RelativeChannel =
    | { readonly channel: Channel }
    /** A channel keyword of the origin colour: `r`, `g`, `b`, `l`, `c`, `h`, `alpha`, … */
    | { readonly ref: string }
    /** `calc(…)` and friends: RECOGNISED as a balanced call, deliberately not modelled. */
    | { readonly call: string };

export type ColorCallName = "light-dark" | "contrast-color";

export type ColorNode =
    | {
          readonly kind: "color";
          readonly space: ColorSpace;
          readonly channels: Channels;
          readonly alpha: Channel;
      }
    | {
          readonly kind: "mix";
          readonly method: InterpolationMethod;
          readonly components: readonly [MixComponent, MixComponent];
      }
    | {
          readonly kind: "call";
          readonly name: ColorCallName;
          readonly args: readonly ColorNode[];
      }
    | {
          readonly kind: "relative";
          readonly space: ColorSpace;
          readonly origin: ColorNode;
          readonly channels: readonly RelativeChannel[];
          readonly alpha: RelativeChannel | undefined;
      }
    | {
          readonly kind: "unresolved";
          /** `context` = currentColor / <system-color>; `substitution` = var() / env(). */
          readonly reason: "context" | "substitution";
          readonly keyword: string;
      };

export type ColorFailureCode = "css_syntax" | "color_context_required";

export interface ColorSuccess {
    readonly ok: true;
    readonly node: ColorNode;
}

export interface ColorFailure {
    readonly ok: false;
    readonly code: ColorFailureCode;
    /** Furthest offset the parse reached — the useful caret position. */
    readonly offset: number;
    /** Populated only while parse-that's `enableDiagnostics()` is on; `[]` otherwise. */
    readonly expected: readonly string[];
}

export type ColorOutcome = ColorSuccess | ColorFailure;

/**
 * Total accessor for a 3-channel colour. Returns `undefined` rather than
 * throwing or asserting — this is the shape a consumer uses INSTEAD of
 * `channels[0]!`.
 */
export const triple = (
    channels: Channels,
): readonly [Channel, Channel, Channel] | undefined => {
    const [first, second, third, fourth] = channels;
    if (second === undefined || third === undefined || fourth !== undefined) {
        return undefined;
    }
    return [first, second, third];
};

/** The same, for the two-argument colour calls (`light-dark`). */
export const pair = <T>(items: readonly T[]): readonly [T, T] | undefined => {
    const [first, second, third] = items;
    if (first === undefined || second === undefined || third !== undefined) {
        return undefined;
    }
    return [first, second];
};
