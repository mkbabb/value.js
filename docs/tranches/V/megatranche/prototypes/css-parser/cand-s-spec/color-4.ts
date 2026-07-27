/**
 * CANDIDATE S · SPEC-SHAPED — CSS Color Level 4.
 *
 * One `const` per named spec production, in the spec's own order, with the spec
 * text quoted above it. The bet of this formulation: coverage becomes
 * AUDITABLE (you can diff this file against the spec's index of productions)
 * and spec changes become MECHANICAL (a changed production is a changed const).
 *
 * Nothing here recurses — `<color>` is assembled in `color.ts`, which owns the
 * single `Parser.lazy` back-edge. Productions that need `<color>` (relative
 * colour, `color-mix()`, `light-dark()`, `contrast-color()`) take it as a
 * parameter and live in `color-5.ts`.
 */

import { Parser, all, any, dispatch, regex } from "@mkbabb/parse-that";

import { NAMED_COLORS } from "../../../../../../../src/css/named-colors";
import type {
    Alpha,
    Channel,
    ColorInterpolationMethod,
    ColorSpace,
    ColorValue,
    HueInterpolationMethod,
    Triple,
} from "./ast";
import { absolute } from "./ast";
import { closeParen, comma, functionToken, keyword, solidus } from "./syntax-3";
import { alphaValue, dashedIdent, hue, number, percentage } from "./values-4";

// ── shared shapes ───────────────────────────────────────────────────────────

/**
 * `<function-token> … )`.
 *
 * `.wrap()` discards both delimiters, keeps the inside, and emits an
 * unclosed-delimiter diagnostic for free. No positional index, so no `!`.
 */
export const fn = <T>(name: string, args: Parser<T>): Parser<T> =>
    args.trim().wrap(functionToken(name), closeParen);

/**
 * css-color-4 §4.4 — `none`.
 *
 * > … the `none` keyword … indicates that the component is MISSING.
 */
const none: Parser<Channel> = keyword("none").map((): Channel => "none");

/** `[<number> | <percentage>]` where the spec's `100%` maps to `reference`. */
const numberOrPercentage = (reference: number): Parser<Channel> =>
    any(
        percentage.map((value): Channel => (value / 100) * reference),
        number.map((value): Channel => value),
    );

/** `[<number> | <percentage> | none]` — the modern-syntax component. */
export const numberPercentageOrNone = (reference: number): Parser<Channel> =>
    any(none, numberOrPercentage(reference));

/**
 * css-color-4 §7.2 / §7.3 — the hsl()/hwb() percentage components.
 *
 * > … For historical reasons, if the value is a `<number>`, it is interpreted
 * > as a percentage.
 *
 * This is GROUND-C's R6 row: the subject keeps the bare `50` of
 * `hsl(120 50 50)` as `50` where it means `50%`, i.e. `0.5`. A differential
 * that compares only accept/reject cannot see it — which is exactly why the
 * two spellings are ONE production here.
 */
const percentageComponent: Parser<Channel> = any(
    none,
    percentage.map((value): Channel => value / 100),
    number.map((value): Channel => value / 100),
);

/** `[<hue> | none]`. */
const hueComponent: Parser<Channel> = any(none, hue.map((value): Channel => value));

/**
 * css-color-4 §7.1 — `[ / [<alpha-value> | none] ]?`.
 *
 * The `?` is on the WHOLE bracket, so a solidus with nothing after it is not a
 * tail — the body then still holds a `/` when `)` is expected, and the whole
 * function is invalid. That is GROUND-A P-037 / GROUND-C R3, fixed by writing
 * the production the way the spec writes it rather than by defaulting a missing
 * token to `1` (`alphaToken(undefined) === 1` in the subject).
 */
export const modernAlphaTail: Parser<Alpha | undefined> = solidus
    .next(any(none, alphaValue.map((value): Alpha => value)))
    .opt();

/**
 * css-color-4 §7.1 — the legacy `, <alpha-value>?` tail.
 *
 * css-values-4 §5.5: an omitted optional item omits its comma with it, so this
 * is the whole `, <alpha-value>?` bracket and not just the alpha.
 * `<alpha-value>` here excludes `none`: legacy syntax has no missing components.
 */
export const legacyAlphaTail: Parser<number | undefined> =
    comma.next(alphaValue).opt();

/**
 * `a b c` — space-separated components.
 *
 * Whitespace between component values is insignificant in CSS's token grammar,
 * so `.trim()` is the entire rule; `rgb(1.5.5.5)` is three `<number-token>`s
 * and really is valid CSS.
 */
const spaceSeparated = (
    first: Parser<Channel>,
    second: Parser<Channel>,
    third: Parser<Channel>,
): Parser<Triple> => all(first.trim(), second.trim(), third.trim());

/** `a , b , c` — the `#{3}` of the legacy forms. Arity lives in the grammar. */
const commaSeparated = (
    first: Parser<Channel>,
    second: Parser<Channel>,
    third: Parser<Channel>,
): Parser<Triple> =>
    all(first.trim().skip(comma), second.trim().skip(comma), third.trim());

/** `[<component>{3}] [ / [<alpha-value> | none] ]?` for one space. */
const modernForm = (
    space: ColorSpace,
    first: Parser<Channel>,
    second: Parser<Channel>,
    third: Parser<Channel>,
): Parser<ColorValue> =>
    spaceSeparated(first, second, third)
        .then(modernAlphaTail)
        .map(([channels, alpha]) => absolute(space, channels, alpha ?? 1));

/** `[<component>#{3}] [, <alpha-value>]?` for one space. */
const legacyForm = (
    space: ColorSpace,
    first: Parser<Channel>,
    second: Parser<Channel>,
    third: Parser<Channel>,
): Parser<ColorValue> =>
    commaSeparated(first, second, third)
        .then(legacyAlphaTail)
        .map(([channels, alpha]) => absolute(space, channels, alpha ?? 1));

// ── §5.2 <hex-color> ────────────────────────────────────────────────────────

/**
 * css-color-4 §5.2 `<hex-color>`.
 *
 * > … 6 digits … 8 digits … 3 digits … 4 digits …
 *
 * Longest-first, with the ident boundary: `#abcde` is a `<hash-token>` with an
 * invalid value, not `#abcd` followed by `e`.
 */
const HEX_COLOR =
    /#(?:[0-9a-f]{8}|[0-9a-f]{6}|[0-9a-f]{4}|[0-9a-f]{3})(?![0-9a-z_\x80-\uFFFF-])/i;

/** Two hex digits at a fixed position. `slice` is total where `text[i]` is not. */
const hexPair = (text: string, at: number): number =>
    Number.parseInt(text.slice(at, at + 2), 16);

/** `#RGB`/`#RGBA` are the `#RRGGBB`/`#RRGGBBAA` forms with each digit doubled. */
const expandHex = (digits: string): string =>
    digits.length <= 4 ? [...digits].map((digit) => digit + digit).join("") : digits;

export const hexColor: Parser<ColorValue> = regex(HEX_COLOR).map((text): ColorValue => {
    const digits = expandHex(text.slice(1));
    return absolute(
        "rgb",
        [hexPair(digits, 0), hexPair(digits, 2), hexPair(digits, 4)],
        digits.length === 8 ? hexPair(digits, 6) / 255 : 1,
    );
});

// ── §6 keyword colours ──────────────────────────────────────────────────────

/** One alternation arm of a keyword production, paired with its spelling. */
type KeywordArm = readonly [string, Parser<ColorValue>];

/**
 * Group keyword arms into `dispatch` buckets keyed by their first character in
 * both cases — an `Int8Array(128)` lookup that narrows 170 keywords to a short
 * `any()`, exactly as parse-that's own `json.ts` dispatches its value
 * production. `dispatch` interns identical parsers, so the two case spellings
 * cost one slot.
 */
function byFirstCharacter(arms: readonly KeywordArm[]): Parser<ColorValue> {
    const buckets = new Map<string, Parser<ColorValue>[]>();

    for (const [word, parser] of arms) {
        const initial = word.slice(0, 1);
        const key = `${initial.toLowerCase()}${initial.toUpperCase()}`;
        const bucket = buckets.get(key);
        if (bucket === undefined) buckets.set(key, [parser]);
        else bucket.push(parser);
    }

    const table: Record<string, Parser<ColorValue>> = {};
    for (const [key, parsers] of buckets) table[key] = any(...parsers);

    return dispatch(table);
}

/**
 * css-color-4 §6.1 `<named-color>` — the 148 keywords.
 *
 * > … `aliceblue` … `yellowgreen` … ASCII case-insensitive …
 *
 * The alternation is GENERATED from the table, so there is no hand-typed
 * expectation to drift (GROUND-C §3.6) and no lookup that can miss: each arm
 * closes over its own value. `named-colors.test.ts` re-derives all 148 names
 * against the spec-scraped fixture and re-derives every channel from the hex.
 *
 * The table itself is `src/css/named-colors.ts` — the subject's DATA, which is
 * name-perfect per GROUND-A §2 and is not what this band is replacing.
 */
const namedColorArms: readonly KeywordArm[] = Object.entries(NAMED_COLORS).map(
    ([name, hex]): KeywordArm => [
        name,
        keyword(name).map((): ColorValue =>
            absolute("rgb", [hexPair(hex, 1), hexPair(hex, 3), hexPair(hex, 5)], 1),
        ),
    ],
);

/**
 * css-color-4 §6.2 `<system-color>` — the 19 keywords.
 *
 * Recognised, and refused at the door: a system colour resolves against the
 * user's OS/UA theme, which a context-free parser does not have.
 */
export const SYSTEM_COLOR_NAMES: readonly string[] = [
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

const systemColorArms: readonly KeywordArm[] = SYSTEM_COLOR_NAMES.map(
    (name): KeywordArm => [
        name,
        keyword(name).map((): ColorValue => ({ kind: "system-color", name })),
    ],
);

/**
 * css-color-4 §6.2 `transparent`.
 *
 * > … a shorthand for `rgb(0 0 0 / 0%)` …
 */
const transparentArm: KeywordArm = [
    "transparent",
    keyword("transparent").map((): ColorValue => absolute("rgb", [0, 0, 0], 0)),
];

/**
 * css-color-4 §6.3 `currentColor`.
 *
 * > … the value of the `color` property …
 */
const currentColorArm: KeywordArm = [
    "currentcolor",
    keyword("currentcolor").map((): ColorValue => ({ kind: "current-color" })),
];

/** Every ident-shaped `<color>`: 148 named + 19 system + 2 spec keywords. */
export const colorKeyword: Parser<ColorValue> = byFirstCharacter([
    transparentArm,
    currentColorArm,
    ...namedColorArms,
    ...systemColorArms,
]);

// ── §7.1 rgb() ──────────────────────────────────────────────────────────────

/** `100%` ⇒ `255` for the r/g/b components. */
const rgbComponent = numberPercentageOrNone(255);
const rgbNumber: Parser<Channel> = number.map((value): Channel => value);
const rgbPercentage: Parser<Channel> = percentage.map(
    (value): Channel => (value / 100) * 255,
);

/**
 * css-color-4 §7.1.
 *
 * > `<modern-rgb-syntax> = rgb( [<number> | <percentage> | none]{3}
 * >                            [ / [<alpha-value> | none] ]? )`
 * > `<legacy-rgb-syntax> = rgb( <percentage>#{3} , <alpha-value>? ) |
 * >                        rgb( <number>#{3} , <alpha-value>? )`
 *
 * Two separate legacy arms because legacy syntax is UNIFORM — it does not mix
 * `<number>` with `<percentage>`, and it admits no `none`. Writing the spec's
 * two arms as two arms is what makes `rgb(1, 50%, 3)` reject without a
 * post-hoc type check, and what makes the whole comma/space distinction
 * structural (GROUND-C R9: legacy is all-comma, modern is comma-free).
 */
export const rgbArguments: Parser<ColorValue> = any(
    modernForm("rgb", rgbComponent, rgbComponent, rgbComponent),
    legacyForm("rgb", rgbPercentage, rgbPercentage, rgbPercentage),
    legacyForm("rgb", rgbNumber, rgbNumber, rgbNumber),
);

// ── §7.2 hsl() ──────────────────────────────────────────────────────────────

const hslPercentage: Parser<Channel> = percentage.map((value): Channel => value / 100);

/**
 * css-color-4 §7.2.
 *
 * > `<modern-hsl-syntax> = hsl( [<hue> | none] [<percentage> | <number> | none]
 * >                            [<percentage> | <number> | none]
 * >                            [ / [<alpha-value> | none] ]? )`
 * > `<legacy-hsl-syntax> = hsl( <hue>, <percentage>, <percentage>,
 * >                            <alpha-value>? )`
 *
 * The legacy form takes `<percentage>` only — a bare `<number>` for saturation
 * or lightness is a MODERN-only allowance.
 */
export const hslArguments: Parser<ColorValue> = any(
    modernForm("hsl", hueComponent, percentageComponent, percentageComponent),
    legacyForm("hsl", hueComponent, hslPercentage, hslPercentage),
);

// ── §7.3 hwb() ──────────────────────────────────────────────────────────────

/**
 * css-color-4 §7.3.
 *
 * > `hwb() = hwb( [<hue> | none] [<percentage> | <number> | none]
 * >               [<percentage> | <number> | none] [ / [<alpha-value> | none] ]? )`
 *
 * There is no legacy `hwb()` form: it postdates the comma syntax.
 */
export const hwbArguments: Parser<ColorValue> = modernForm(
    "hwb",
    hueComponent,
    percentageComponent,
    percentageComponent,
);

// ── §9 lab() / lch() / oklab() / oklch() ────────────────────────────────────

/**
 * css-color-4 §9.1 `lab()` — `100%` is `100` for L and `125` for a/b.
 *
 * > `lab() = lab( [<percentage> | <number> | none]
 * >               [<percentage> | <number> | none]
 * >               [<percentage> | <number> | none]
 * >               [ / [<alpha-value> | none] ]? )`
 */
export const labArguments: Parser<ColorValue> = modernForm(
    "lab",
    numberPercentageOrNone(100),
    numberPercentageOrNone(125),
    numberPercentageOrNone(125),
);

/** css-color-4 §9.2 `lch()` — `100%` is `100` for L, `150` for C; H is a `<hue>`. */
export const lchArguments: Parser<ColorValue> = modernForm(
    "lch",
    numberPercentageOrNone(100),
    numberPercentageOrNone(150),
    hueComponent,
);

/** css-color-4 §9.3 `oklab()` — `100%` is `1` for L and `0.4` for a/b. */
export const oklabArguments: Parser<ColorValue> = modernForm(
    "oklab",
    numberPercentageOrNone(1),
    numberPercentageOrNone(0.4),
    numberPercentageOrNone(0.4),
);

/** css-color-4 §9.4 `oklch()` — `100%` is `1` for L, `0.4` for C; H is a `<hue>`. */
export const oklchArguments: Parser<ColorValue> = modernForm(
    "oklch",
    numberPercentageOrNone(1),
    numberPercentageOrNone(0.4),
    hueComponent,
);

// ── §10 color() ─────────────────────────────────────────────────────────────

/** A named colourspace plus the factor its `1` scales by in value.js's model. */
export interface SpaceMapping {
    readonly space: ColorSpace;
    readonly scale: number;
}

const mapping = (space: ColorSpace, scale: number): SpaceMapping => ({ space, scale });

const scaleChannel = (channel: Channel, factor: number): Channel =>
    channel === "none" ? "none" : channel * factor;

/**
 * css-color-4 §10 `<predefined-rgb>`.
 *
 * > `<predefined-rgb> = srgb | srgb-linear | display-p3 | a98-rgb |
 * >                      prophoto-rgb | rec2020`
 *
 * `srgb` normalises into the same 0–255 `rgb` space `rgb()` produces, because
 * css-color-4 §10 says they denote the same colour. Every other space keeps its
 * own identity.
 */
const predefinedRgb: Parser<SpaceMapping> = any(
    keyword("srgb").map(() => mapping("rgb", 255)),
    keyword("srgb-linear").map(() => mapping("srgb-linear", 1)),
    keyword("display-p3").map(() => mapping("display-p3", 1)),
    keyword("a98-rgb").map(() => mapping("a98-rgb", 1)),
    keyword("prophoto-rgb").map(() => mapping("prophoto-rgb", 1)),
    keyword("rec2020").map(() => mapping("rec2020", 1)),
);

/**
 * css-color-4 §10.1 `<xyz-space>`.
 *
 * > `<xyz-space> = xyz | xyz-d50 | xyz-d65`
 *
 * `xyz` and `xyz-d65` are the same space and fold together. `xyz-d50` does NOT:
 * adapting D50→D65 is a colour operation, and folding it into the parser is
 * what makes `color(xyz-d50 none 0.2 0.1)` unrepresentable in the subject
 * (GROUND-A P-024 — the one channel-keyword hole in an otherwise complete
 * P-023). Reported as written; `src/color/anchors.ts` still owns the adaptation.
 */
const xyzSpace: Parser<SpaceMapping> = any(
    keyword("xyz-d50").map(() => mapping("xyz-d50", 1)),
    keyword("xyz-d65").map(() => mapping("xyz", 1)),
    keyword("xyz").map(() => mapping("xyz", 1)),
);

const colorComponent = numberPercentageOrNone(1);

/**
 * css-color-4 §10.
 *
 * > `<colorspace-params> = [<predefined-rgb-params> | <xyz-params>]`
 * > `<predefined-rgb-params> = <predefined-rgb> [<number> | <percentage> | none]{3}`
 * > `<xyz-params> = <xyz-space> [<number> | <percentage> | none]{3}`
 */
/** css-color-4 §10 — `[<predefined-rgb> | <xyz-space>]`, the head of `<colorspace-params>`. */
export const colorspaceKeyword: Parser<SpaceMapping> = any(predefinedRgb, xyzSpace);

const colorspaceParams: Parser<ColorValue> = all(
    colorspaceKeyword.trim(),
    colorComponent.trim(),
    colorComponent.trim(),
    colorComponent.trim(),
)
    .then(modernAlphaTail)
    .map(([[space, first, second, third], alpha]) =>
        absolute(
            space.space,
            [
                scaleChannel(first, space.scale),
                scaleChannel(second, space.scale),
                scaleChannel(third, space.scale),
            ],
            alpha ?? 1,
        ),
    );

/**
 * css-color-4 §10.3 — a custom colourspace declared by `@color-profile`.
 *
 * > `color( <dashed-ident> [<number> | <percentage> | none]* )`
 *
 * The one variable-arity node: the channel count is profile-defined, so it is
 * an array and not a tuple. Refused at the door — resolving it needs the
 * `@color-profile` rule.
 */
const customProfileParams: Parser<ColorValue> = dashedIdent
    .trim()
    .then(colorComponent.trim().many())
    .then(modernAlphaTail)
    .map(([[profile, channels], alpha]): ColorValue => ({
        kind: "custom-profile",
        profile,
        channels,
        alpha: alpha ?? 1,
    }));

export const colorArguments: Parser<ColorValue> = any(
    colorspaceParams,
    customProfileParams,
);

// ── §12 <color-interpolation-method> ────────────────────────────────────────

/**
 * css-color-4 §12.
 *
 * > `<rectangular-color-space> = srgb | srgb-linear | display-p3 | a98-rgb |
 * >     prophoto-rgb | rec2020 | lab | oklab | xyz | xyz-d50 | xyz-d65`
 * > `<polar-color-space> = hsl | hwb | lch | oklch`
 * > `<custom-color-space> = <dashed-ident>`
 * > `<hue-interpolation-method> = [shorter | longer | increasing | decreasing] hue`
 * > `<color-interpolation-method> = in [<rectangular-color-space> |
 * >     <polar-color-space> <hue-interpolation-method>? | <custom-color-space>]`
 */
const RECTANGULAR_COLOR_SPACES: readonly string[] = [
    "srgb-linear",
    "srgb",
    "display-p3",
    "a98-rgb",
    "prophoto-rgb",
    "rec2020",
    "lab",
    "oklab",
    "xyz-d50",
    "xyz-d65",
    "xyz",
];

const POLAR_COLOR_SPACES: readonly string[] = ["hsl", "hwb", "lch", "oklch"];

const rectangularColorSpace: Parser<string> = any(
    ...RECTANGULAR_COLOR_SPACES.map((name) => keyword(name)),
);

const polarColorSpace: Parser<string> = any(
    ...POLAR_COLOR_SPACES.map((name) => keyword(name)),
);

const hueInterpolationMethod: Parser<HueInterpolationMethod> = any(
    keyword("shorter").map((): HueInterpolationMethod => "shorter"),
    keyword("longer").map((): HueInterpolationMethod => "longer"),
    keyword("increasing").map((): HueInterpolationMethod => "increasing"),
    keyword("decreasing").map((): HueInterpolationMethod => "decreasing"),
)
    .trim()
    .skip(keyword("hue"));

const method = (
    space: string,
    hueMethod: HueInterpolationMethod | undefined,
): ColorInterpolationMethod => ({ space, hue: hueMethod });

export const colorInterpolationMethod: Parser<ColorInterpolationMethod> = keyword("in")
    .trim()
    .next(
        any(
            polarColorSpace
                .trim()
                .then(hueInterpolationMethod.opt())
                .map(([space, hueMethod]) => method(space, hueMethod)),
            rectangularColorSpace.map((space) => method(space, undefined)),
            dashedIdent.map((space) => method(space, undefined)),
        ),
    );
