/**
 * CANDIDATE B — THE TABLE.
 *
 * The thesis under test: the css-color-4/5 function set is regular enough that
 * a declarative table beats hand-written repetition. This file is that table
 * and it is PURE DATA — it imports nothing, and in particular it imports no
 * `Parser`. `grammar.ts` holds exactly one generic production that consumes it.
 *
 * Every row answers the same four questions:
 *   what is it spelled?  ·  what space does it name?  ·  what are its channels?
 *   ·  does it have a legacy comma form?
 *
 * Where the table had to be WIDENED to fit a real production, the widening is
 * marked `TABLE COST` in place, and every one of those marks is reported in
 * CAND-B.md. That is the honest half of the experiment.
 */

import type { ColorCallName, PredefinedSpace } from "./ast";

/**
 * A channel's unit rule.
 *   `percentRef`  — the value `100%` denotes (css-color-4 "reference range").
 *   `numberScale` — what a bare `<number>` is multiplied by.
 * The two differ only for hsl()/hwb() S/L/W/B, where css-color-4 §7.2 says a
 * bare `<number>` means the same as the `<percentage>` (the R6 correction).
 */
export interface ScalarKind {
    readonly kind: "scalar";
    readonly percentRef: number;
    readonly numberScale: number;
}

/** `<hue> = <number> | <angle>` — css-values-4 §7.1. No percentages. */
export interface HueKind {
    readonly kind: "hue";
}

export type ChannelKind = ScalarKind | HueKind;

/**
 * How many channels a function takes, and of what kinds.
 *
 * `positional` — a fixed, non-empty list of per-position kinds. Non-empty BY
 *   TYPE, so the fold in `grammar.ts` reaches its seed without a `!`.
 * `uniform`    — one kind repeated within an arity range. Needed because a
 *   css-color-5 §5 `@color-profile` defines its own channel count, so
 *   `color(--swop5c …)` has PROFILE-DEFINED arity that no fixed list can state.
 *   (TABLE COST 4: absorbed as a second spec variant + a second `color` row,
 *   with one branch in the generic production. It was not free.)
 */
export type ChannelSpec =
    | { readonly kind: "positional"; readonly kinds: readonly [ChannelKind, ...ChannelKind[]] }
    | {
          readonly kind: "uniform";
          readonly channel: ChannelKind;
          readonly min: number;
          readonly max: number;
      };

const positional = (
    ...kinds: [ChannelKind, ...ChannelKind[]]
): ChannelSpec => ({ kind: "positional", kinds });

const uniform = (channel: ChannelKind, min: number, max: number): ChannelSpec => ({
    kind: "uniform",
    channel,
    min,
    max,
});

const scalar = (percentRef: number, numberScale = 1): ScalarKind => ({
    kind: "scalar",
    percentRef,
    numberScale,
});

const HUE: HueKind = { kind: "hue" };

/** hsl()/hwb() S, L, W, B: `50` === `50%`. */
const PERCENTAGE_OR_EQUIVALENT_NUMBER = scalar(1, 1 / 100);

/** `<alpha-value> = <number> | <percentage>`, 100% = 1. */
export const ALPHA_KIND: ScalarKind = scalar(1, 1);

/** How a row learns its colour space. */
export type SpaceSource =
    | { readonly kind: "fixed"; readonly space: PredefinedSpace }
    /**
     * TABLE COST 1 — `color()` names its space in a leading argument, so the
     * row's space is a FUNCTION OF THE INPUT rather than a constant. The table
     * absorbs it as a second variant plus an authored-name -> canonical-id
     * mapping; the generic production branches on it exactly once.
     */
    | {
          readonly kind: "head";
          readonly spaces: readonly (readonly [string, PredefinedSpace])[];
          /** css-color-5 §5 `@color-profile` custom `<dashed-ident>` spaces. */
          readonly custom: boolean;
      };

export interface ColorFunctionRow {
    /** Every accepted spelling; ASCII case-insensitive at parse time. */
    readonly names: readonly [string, ...string[]];
    readonly space: SpaceSource;
    readonly channels: ChannelSpec;
    /** css-color-4 §7.1/§7.2 `<legacy-*-syntax>`: all-comma, no `none`. */
    readonly legacy: boolean;
    /**
     * Relative-colour-syntax channel keywords (css-color-5 §2), in channel
     * order. `alpha` is always additionally in scope.
     */
    readonly channelNames: readonly [string, ...string[]];
}

/** css-color-4 §10 + §10.1: authored spelling -> canonical id. */
export const COLOR_FUNCTION_SPACES: readonly (readonly [string, PredefinedSpace])[] = [
    ["srgb", "srgb"],
    ["srgb-linear", "srgb-linear"],
    ["display-p3", "display-p3"],
    ["a98-rgb", "a98-rgb"],
    ["prophoto-rgb", "prophoto-rgb"],
    ["rec2020", "rec2020"],
    // `xyz` is defined as an alias of `xyz-d65`; the alias is canonicalised.
    ["xyz", "xyz-d65"],
    ["xyz-d65", "xyz-d65"],
    ["xyz-d50", "xyz-d50"],
];

/**
 * THE TABLE. Nine rows cover every `<color-function>` in css-color-4 plus
 * css-color-5's `device-cmyk()`.
 */
export const COLOR_FUNCTIONS: readonly ColorFunctionRow[] = [
    {
        names: ["rgb", "rgba"],
        space: { kind: "fixed", space: "rgb" },
        channels: positional(scalar(255), scalar(255), scalar(255)),
        legacy: true,
        channelNames: ["r", "g", "b"],
    },
    {
        names: ["hsl", "hsla"],
        space: { kind: "fixed", space: "hsl" },
        channels: positional(
            HUE,
            PERCENTAGE_OR_EQUIVALENT_NUMBER,
            PERCENTAGE_OR_EQUIVALENT_NUMBER,
        ),
        legacy: true,
        channelNames: ["h", "s", "l"],
    },
    {
        names: ["hwb"],
        space: { kind: "fixed", space: "hwb" },
        channels: positional(
            HUE,
            PERCENTAGE_OR_EQUIVALENT_NUMBER,
            PERCENTAGE_OR_EQUIVALENT_NUMBER,
        ),
        legacy: false,
        channelNames: ["h", "w", "b"],
    },
    {
        names: ["lab"],
        space: { kind: "fixed", space: "lab" },
        channels: positional(scalar(100), scalar(125), scalar(125)),
        legacy: false,
        channelNames: ["l", "a", "b"],
    },
    {
        names: ["lch"],
        space: { kind: "fixed", space: "lch" },
        channels: positional(scalar(100), scalar(150), HUE),
        legacy: false,
        channelNames: ["l", "c", "h"],
    },
    {
        names: ["oklab"],
        space: { kind: "fixed", space: "oklab" },
        channels: positional(scalar(1), scalar(0.4), scalar(0.4)),
        legacy: false,
        channelNames: ["l", "a", "b"],
    },
    {
        names: ["oklch"],
        space: { kind: "fixed", space: "oklch" },
        channels: positional(scalar(1), scalar(0.4), HUE),
        legacy: false,
        channelNames: ["l", "c", "h"],
    },
    {
        names: ["color"],
        space: { kind: "head", spaces: COLOR_FUNCTION_SPACES, custom: false },
        channels: positional(scalar(1), scalar(1), scalar(1)),
        legacy: false,
        // TABLE COST 2 — `color()`'s relative channel keywords depend on the
        // HEAD value (srgb -> r g b, xyz -> x y z). A static row cannot say
        // that, so this is the union of both sets: `color(from red srgb r y b)`
        // is over-accepted in the relative form. Reported, not hidden.
        channelNames: ["r", "g", "b", "x", "y", "z"],
    },
    {
        // The SECOND `color` row: a custom `@color-profile` space, whose channel
        // count is defined by the profile and so is `uniform`, not positional.
        // Two rows, same spelling; the dispatch bucket tries them in order.
        names: ["color"],
        space: { kind: "head", spaces: [], custom: true },
        channels: uniform(scalar(1), 1, Number.POSITIVE_INFINITY),
        legacy: false,
        channelNames: ["c"],
    },
    {
        names: ["device-cmyk"],
        space: { kind: "fixed", space: "device-cmyk" },
        channels: positional(scalar(1), scalar(1), scalar(1), scalar(1)),
        legacy: false,
        channelNames: ["c", "m", "y", "k"],
    },
];

/**
 * Colour functions whose arguments are COLOURS, not channels.
 *
 * TABLE COST 3 — these do not fit the channel table at all. They get a second,
 * much smaller table, and their node is the generic `{kind:"call", name, args}`
 * rather than named fields (`{light, dark}`), because a per-row builder closure
 * would stop the table being data. The AST is less specific as a result.
 */
export interface ColorCallRow {
    readonly names: readonly [string, ...string[]];
    readonly name: ColorCallName;
    readonly arity: number;
}

export const COLOR_CALLS: readonly ColorCallRow[] = [
    { names: ["light-dark"], name: "light-dark", arity: 2 },
    { names: ["contrast-color"], name: "contrast-color", arity: 1 },
];

/**
 * css-color-4 §12.3 `<color-interpolation-method>`. Split by geometry, because
 * only a POLAR space may carry a `<hue-interpolation-method>` — a grammatical
 * fact, so it lives in the grammar as two arms rather than in a post-hoc check.
 */
export const RECTANGULAR_INTERPOLATION_SPACES: readonly (readonly [
    string,
    PredefinedSpace,
])[] = [
    ["srgb", "srgb"],
    ["srgb-linear", "srgb-linear"],
    ["display-p3", "display-p3"],
    ["a98-rgb", "a98-rgb"],
    ["prophoto-rgb", "prophoto-rgb"],
    ["rec2020", "rec2020"],
    ["lab", "lab"],
    ["oklab", "oklab"],
    ["xyz", "xyz-d65"],
    ["xyz-d65", "xyz-d65"],
    ["xyz-d50", "xyz-d50"],
];

export const POLAR_INTERPOLATION_SPACES: readonly (readonly [
    string,
    PredefinedSpace,
])[] = [
    ["hsl", "hsl"],
    ["hwb", "hwb"],
    ["lch", "lch"],
    ["oklch", "oklch"],
];

export const HUE_METHODS: readonly [string, ...string[]] = [
    "shorter",
    "longer",
    "increasing",
    "decreasing",
];

/**
 * css-color-4 §6.4 — the 19 `<system-color>`s. Like `currentColor` these are
 * context-dependent: they PARSE, and the entry point refuses them with the
 * typed `color_context_required`, exactly as `src/css/grammar.ts` does.
 * Cross-checked in `coverage.test.ts` against the scraped spec fixture.
 */
export const SYSTEM_COLORS: readonly string[] = [
    "accentcolor",
    "accentcolortext",
    "activetext",
    "buttonborder",
    "buttonface",
    "buttontext",
    "canvas",
    "canvastext",
    "field",
    "fieldtext",
    "graytext",
    "highlight",
    "highlighttext",
    "linktext",
    "mark",
    "marktext",
    "selecteditem",
    "selecteditemtext",
    "visitedtext",
];

/** css-variables-1 §3 — substitution functions a context-free parser must refuse. */
export const SUBSTITUTION_FUNCTIONS: readonly string[] = ["var", "env"];
