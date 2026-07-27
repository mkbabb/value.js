/**
 * cand-O · the CSS `<color>` grammar, in `@mkbabb/parse-that` 1.0.0.
 *
 *   <color> = <hex-color> | <named-color> | transparent | currentColor
 *           | <system-color> | <color-function> | <substitution> | <relative>
 *
 * WHAT THIS FILE IS TRYING TO PROVE
 * --------------------------------
 * That the eight colour functions are ONE production, not eight. `rgb()` and
 * `oklch()` differ only in a channel table (`spec.ts`), so the grammar reads the
 * table and builds the parsers; adding a ninth function when it lands is a row,
 * not a function. That is the argument against the incumbent regex parser, whose
 * eight near-identical `if (lower === … && components.length === 3)` arms each
 * carry their own copy of the same four mistakes.
 *
 * THE IDIOM RULES OBEYED HERE (GROUND-B §6)
 *   · a regex is a TERMINAL: one token, no capture-group structure, never a
 *     "remainder" and never spanning a delimiter;
 *   · `all()` is only ever given parsers that cannot yield `undefined` — an
 *     `.opt()` inside `all()` silently shifts every later tuple position, so
 *     optional tails use `.then()`;
 *   · `Parser.lazy` appears exactly once, on the ONE back-edge in the graph
 *     (the balanced-tail recursion). Everything else is a backward reference
 *     and is built eagerly;
 *   · `memoize()` is not used at all — arming packrat is process-global and
 *     never disarms, and this grammar has no left recursion to pay for it;
 *   · arity lives in the combinator, never in a post-hoc `parts.length` check;
 *   · nothing reads `Parser.parse()`; the entry point (`index.ts`) branches on
 *     `state.isError`. That single rule is what makes the parser total.
 *
 * ZERO non-null assertions (`!`), zero `as` casts into the AST, zero hand-rolled
 * cursors, zero dead branches. `noUncheckedIndexedAccess` is on, and every
 * dynamic table is a NULL-PROTOTYPE object: a `Record<string, …>` built from an
 * object literal answers `constructor` and `toString`, which would make
 * `color(constructor 0 0 0)` parse.
 */

import { Parser, all, any, dispatch, regex, string } from "@mkbabb/parse-that";

import type {
    Alpha,
    Channel,
    ColorNode,
    ColorSpace,
    ContextReason,
} from "./ast";
import { NAMED_COLORS, SYSTEM_COLORS } from "./named-colors";
import type { ChannelSpec, ChannelTriple, FunctionSpec } from "./spec";
import {
    ALPHA_CHANNEL,
    HSL_FUNCTION,
    HWB_FUNCTION,
    LAB_FUNCTION,
    LCH_FUNCTION,
    OKLAB_FUNCTION,
    OKLCH_FUNCTION,
    PREDEFINED_CHANNELS,
    PREDEFINED_SPACES,
    RGB_FUNCTION,
} from "./spec";

// ── Two primitives the library does not export ──────────────────────────────
//
// `succeed` and `never` are the unit and the zero of alternation. parse-that has
// neither, but both fall out of the existing leaves without reaching for
// `new Parser(...)`: `string("")` matches everywhere and consumes nothing
// (`"abc".startsWith("", 99)` is `true`, so it is safe at EOF too), and the
// empty negative lookahead `(?!)` can never match anything at all.

const succeed = <T>(value: T): Parser<T> => string("").map(() => value);

const never: Parser<string> = regex(/(?!)/);

/** `Object.create(null)` + fill — a lookup table that cannot answer `toString`. */
const nullTable = <T>(entries: Iterable<readonly [string, T]>): Readonly<Record<string, T>> => {
    const table: Record<string, T> = Object.create(null);
    for (const [key, value] of entries) table[key] = value;
    return Object.freeze(table);
};

// ── Terminals ───────────────────────────────────────────────────────────────

/**
 * `<number>` — CSS Syntax §4.3.12. Note `\d+\.\d+|\.\d+|\d+` and NOT
 * `\d+\.?\d*`: `1.` is not a CSS number, and the incumbent parser accepts it.
 *
 * `Number()` of a match can be ±Infinity (`1e400`). That is deliberately NOT
 * rejected here — css-color-4 clamps at parsed-value time, so on a clamped
 * channel `rgb(1e400 0 0)` correctly becomes 255. A residual infinity on an
 * UNCLAMPED channel is caught once, in the entry point, as `color_non_finite`.
 */
const NUMBER = /[+-]?(?:\d+\.\d+|\.\d+|\d+)(?:[eE][+-]?\d+)?/;

const numberToken: Parser<number> = regex(NUMBER).map(Number);

/** `<percentage>` — a number token immediately followed by `%`: still one token. */
const percentToken: Parser<number> = numberToken.skip(string("%"));

/** `<angle>`'s unit. Ordered so `grad` cannot be shadowed by `rad`. */
const angleUnit = regex(/deg|grad|rad|turn/i);

/** CSS Color 4 §4.4 — the missing-component keyword. */
const NONE: Channel = "none";
const noneToken: Parser<Channel> = regex(/none/i).map(() => NONE);

const openParen = string("(");
const closeParen = string(")");
const comma = string(",");
const slash = string("/");

/** `<ident>` restricted to what a colour keyword or a colourspace name can be. */
const identToken = regex(/[a-zA-Z][a-zA-Z0-9-]*/);

// ── Channels ────────────────────────────────────────────────────────────────

const clampTo = (value: number, range: readonly [number, number] | null): number =>
    range === null ? value : Math.min(Math.max(value, range[0]), range[1]);

/**
 * `<angle>` → degrees. The multiply/divide association is written EXACTLY as
 * value.js writes it (`value * 180 / Math.PI`, not `value * (180 / Math.PI)`)
 * so radian hues stay bit-identical between the two implementations; the two
 * spellings differ in the last ulp, and an equivalence harness would flag it.
 */
const hueToDegrees = ([value, unit]: readonly [number, string | undefined]): number => {
    switch (unit?.toLowerCase()) {
        case "grad":
            return value * 0.9;
        case "rad":
            return (value * 180) / Math.PI;
        case "turn":
            return value * 360;
        default:
            return value;
    }
};

/** `<hue> = <number> | <angle>` — §7. No percentage arm, by construction. */
const hueValue: Parser<Channel> = numberToken.then(angleUnit.opt()).map(hueToDegrees);

/**
 * `100%` → `reference`. Written `(value * reference) / 100` and NOT
 * `(value / 100) * reference`, matching value.js's association exactly, so
 * percentage channels agree with the incumbent to the last bit.
 */
const percentScale = (value: number, reference: number): number =>
    (value * reference) / 100;

/**
 * A bare `<number>`. For `hsl`/`hwb`'s saturation/lightness/whiteness/blackness
 * css-color-4 says the number IS a percentage, so this arm reuses
 * `percentScale` VERBATIM rather than folding it into a scale factor — `n *
 * 0.01` and `n / 100` disagree for 114 of the 1001 values 0, 0.1, …, 100, and
 * `hsl(3.1 …)` must not depend on whether the author typed the `%`.
 */
const numberArm = (spec: ChannelSpec): Parser<Channel> => {
    const reference = spec.percentRef;
    if (spec.numberIsPercentage && reference !== null) {
        return numberToken.map((value) =>
            clampTo(percentScale(value, reference), spec.clamp),
        );
    }
    return numberToken.map((value) => clampTo(value, spec.clamp));
};

const percentArm = (spec: ChannelSpec, reference: number): Parser<Channel> =>
    percentToken.map((value) => clampTo(percentScale(value, reference), spec.clamp));

/**
 * One channel of one function, modern syntax. `<percentage>` is tried BEFORE
 * `<number>`, because `<number>` would otherwise match the digits of `50%` and
 * strand the `%` for the next production to choke on.
 */
const channelParser = (spec: ChannelSpec): Parser<Channel> => {
    if (spec.kind === "hue") return any(noneToken, hueValue);
    const reference = spec.percentRef;
    if (reference === null) return any(noneToken, numberArm(spec));
    return any(noneToken, percentArm(spec, reference), numberArm(spec));
};

/** `<alpha-value>` — `none` is modern-only; §8's legacy syntax predates it. */
const modernAlpha: Parser<Alpha> = channelParser(ALPHA_CHANNEL);
const legacyAlpha: Parser<Alpha> = any(
    percentArm(ALPHA_CHANNEL, 1),
    numberArm(ALPHA_CHANNEL),
);

const OPAQUE: Alpha = 1;
const defaulted = (alpha: Alpha | undefined): Alpha => alpha ?? OPAQUE;

// ── Function bodies ─────────────────────────────────────────────────────────
//
// `.trim()` is OPTIONAL whitespace, which is the correct reading: css-color-4's
// juxtaposition operates on a token stream in which whitespace between component
// values has already been dropped, so `rgb(1 2 3)` and `rgb(1-2 3)` are the same
// three number tokens. Demanding whitespace here would reject valid CSS.

type ChannelParsers = readonly [Parser<Channel>, Parser<Channel>, Parser<Channel>];

const parsersFor = (channels: ChannelTriple): ChannelParsers => [
    channelParser(channels[0]),
    channelParser(channels[1]),
    channelParser(channels[2]),
];

/** `a b c` — juxtaposition. */
const spaceTriple = (parsers: ChannelParsers) =>
    all(parsers[0].trim(), parsers[1].trim(), parsers[2].trim());

/**
 * `a , b , c` — §8's `#{3}`. The arity is the SHAPE of the combinator, so the
 * result is a real 3-tuple and no `parts.length` check exists anywhere below.
 */
const commaTriple = (parsers: ChannelParsers) =>
    all(
        parsers[0].trim(),
        comma.next(parsers[1].trim()),
        comma.next(parsers[2].trim()),
    );

/** `[ / [<alpha-value> | none] ]?` — `.then`, never inside `all()`. */
const slashAlphaTail = slash.trim().next(modernAlpha.trim()).opt();
const commaAlphaTail = comma.trim().next(legacyAlpha.trim()).opt();

const absolute = (
    space: ColorSpace,
    syntax: "modern" | "legacy" | "color-function",
) => ([parsed, alpha]: readonly [
    readonly [Channel, Channel, Channel],
    Alpha | undefined,
]): ColorNode => ({
    kind: "absolute",
    space,
    channels: parsed,
    alpha: defaulted(alpha),
    syntax,
});

const modernBody = (space: ColorSpace, channels: ChannelTriple): Parser<ColorNode> =>
    spaceTriple(parsersFor(channels))
        .then(slashAlphaTail)
        .map(absolute(space, "modern"));

/**
 * §8.1's same-type rule (`rgb()`'s three arguments must be all `<number>` or all
 * `<percentage>`; `rgb(50%, 2, 3)` is invalid) is an ALTERNATION OF TWO
 * HOMOGENEOUS LISTS, not a post-hoc comparison of token tags. §8.2's legacy
 * `hsl()` is `<hue>, <percentage>, <percentage>` and nothing else.
 */
const legacyBody = (spec: FunctionSpec): Parser<ColorNode> | null => {
    const { legacy, channels, space } = spec;
    if (legacy === null) return null;

    const numeric = (index: 0 | 1 | 2) => numberArm(channels[index]);
    const percent = (index: 0 | 1 | 2) => {
        const reference = channels[index].percentRef;
        return percentArm(channels[index], reference ?? 1);
    };

    const lists =
        legacy === "number-or-percent-triple"
            ? any(
                  commaTriple([numeric(0), numeric(1), numeric(2)]),
                  commaTriple([percent(0), percent(1), percent(2)]),
              )
            : commaTriple([hueValue, percent(1), percent(2)]);

    return lists.then(commaAlphaTail).map(absolute(space, "legacy"));
};

// ── Relative colour and substitution: recognised, not resolved ──────────────
//
// `rgb(from …)`, `var(--x)` and `env(…)` are well-formed `<color>`s whose value
// depends on something a context-free parser cannot see. They are parsed to a
// ContextColor rather than rejected, so a caller that DOES have the context can
// still act on them. The balanced tail is the one recursive production in the
// grammar, and therefore carries the file's one `Parser.lazy`.

const balancedRun = regex(/[^()]+/);

const balancedTail: Parser<unknown> = any(
    balancedRun,
    Parser.lazy(() => balancedTail.wrap(openParen, closeParen)),
).many();

const contextNode = (reason: ContextReason, keyword: string): ColorNode => ({
    kind: "context",
    reason,
    keyword,
});

/**
 * `<relative-color>` — css-color-5 §4: the origin colour IS the context.
 *
 * `from` is matched with a trailing word boundary, so `rgb(fromage 1 2)` is a
 * syntax error and not a relative colour. What follows `from` is then consumed
 * WITHOUT being validated: checking it means implementing css-color-5's channel
 * expressions, which this prototype scopes out. The limitation is deliberate,
 * declared, and pinned by a test — `rgb(from red)` is accepted as a relative
 * node even though css-color-5 requires three channels after the origin.
 */
const relativeBody = (keyword: string): Parser<ColorNode> =>
    regex(/from(?![\w-])/i)
        .next(balancedTail)
        .map(() => contextNode("relative", keyword));

/**
 * `var()` / `env()` — css-variables-1 §3, css-env-1 §2. Both take a NAME first:
 * `var()` and `env()` are not substitutions, they are syntax errors, and a
 * `var()` whose first argument is not a `<custom-property-name>` is too.
 */
const customProperty = regex(/--[a-zA-Z0-9_-]*/);

const varForm: Parser<ColorNode> = regex(/var/i).next(
    customProperty
        .trim()
        .then(comma.trim().next(balancedTail).opt())
        .wrap(openParen, closeParen)
        .map(() => contextNode("substitution", "var")),
);

const envForm: Parser<ColorNode> = regex(/env/i).next(
    identToken
        .trim()
        .then(balancedTail)
        .wrap(openParen, closeParen)
        .map(() => contextNode("substitution", "env")),
);

// ── The colour functions ────────────────────────────────────────────────────

const colorFunction = (spec: FunctionSpec): Parser<ColorNode> => {
    const legacy = legacyBody(spec);
    const modern = modernBody(spec.space, spec.channels);
    const relative = relativeBody(spec.name);
    const body = legacy === null ? any(modern, relative) : any(modern, legacy, relative);

    return regex(spec.head).next(body.wrap(openParen, closeParen));
};

/**
 * `color()` — §10. The colourspace ident resolves through a PRECOMPUTED parser
 * table via `chain`, so nothing is constructed at parse time: `chain` is used
 * for exactly what `chain` is for (a value-dependent continuation) without the
 * per-parse allocation that makes it an anti-pattern. An unknown colourspace
 * resolves to `never` — a real, reachable arm, not a defensive branch.
 */
const PREDEFINED_PARSERS = nullTable(
    Object.entries(PREDEFINED_SPACES).map(
        ([name, space]) => [name, succeed(space)] as const,
    ),
);

const predefinedSpace: Parser<ColorSpace> = identToken.chain<ColorSpace>((ident) => {
    const parser = PREDEFINED_PARSERS[ident.toLowerCase()];
    return parser === undefined ? never : parser;
});

const colorFunctionBody: Parser<ColorNode> = predefinedSpace
    .trim()
    .then(spaceTriple(parsersFor(PREDEFINED_CHANNELS)).then(slashAlphaTail))
    .map(([space, tail]) => absolute(space, "color-function")(tail));

const colorFunctionForm: Parser<ColorNode> = regex(/color/i).next(
    any(colorFunctionBody, relativeBody("color")).wrap(openParen, closeParen),
);

// ── Hex ─────────────────────────────────────────────────────────────────────
//
// Longest-first alternation inside ONE terminal. `#1234567` matches the 6-digit
// arm and strands a `7`, which `eof()` then rejects — the legal length set
// {3,4,6,8} is enforced by the grammar, not by a `switch` on `digits.length`.

const hexToken = regex(
    /#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{4}|[0-9a-fA-F]{3})/,
);

const expandHex = (digits: string): string =>
    digits.length > 4 ? digits : [...digits].map((digit) => digit + digit).join("");

const hexPair = (digits: string, index: number): number =>
    parseInt(digits.slice(index, index + 2), 16);

const hexColor: Parser<ColorNode> = hexToken.map((token) => {
    const digits = expandHex(token.slice(1));
    return {
        kind: "absolute",
        space: "rgb",
        channels: [hexPair(digits, 0), hexPair(digits, 2), hexPair(digits, 4)] as const,
        alpha: digits.length === 8 ? hexPair(digits, 6) / 255 : OPAQUE,
        syntax: "hex",
    };
});

// ── Keywords ────────────────────────────────────────────────────────────────
//
// 148 named colours + `transparent` + `currentColor` + 19 system colours = 169
// keywords, resolved by ONE ident token and ONE table lookup. The table holds
// pre-built zero-width parsers, so at parse time the lookup is a property read
// and nothing is allocated. An ident that is not a colour keyword resolves to
// `never`, which is how `red1` and a bare unparenthesised `rgb` get rejected.

const keywordEntries = function* (): Generator<readonly [string, Parser<ColorNode>]> {
    for (const [name, channels] of Object.entries(NAMED_COLORS)) {
        yield [
            name,
            succeed<ColorNode>({
                kind: "absolute",
                space: "rgb",
                channels,
                alpha: OPAQUE,
                syntax: "named",
            }),
        ];
    }
    for (const name of SYSTEM_COLORS) {
        yield [name, succeed(contextNode("system-color", name))];
    }
    yield ["currentcolor", succeed(contextNode("currentcolor", "currentcolor"))];
    yield [
        "transparent",
        succeed<ColorNode>({
            kind: "absolute",
            space: "rgb",
            channels: [0, 0, 0],
            alpha: 0,
            syntax: "transparent",
        }),
    ];
};

const KEYWORD_PARSERS = nullTable(keywordEntries());

const colorKeyword: Parser<ColorNode> = identToken.chain<ColorNode>((ident) => {
    const parser = KEYWORD_PARSERS[ident.toLowerCase()];
    return parser === undefined ? never : parser;
});

// ── The root ────────────────────────────────────────────────────────────────
//
// Two levels of `dispatch`: the first splits `#` from identifier-headed colours,
// the second splits the identifier space by first character so `oklch(` never
// pays for trying `rgb(`. Both levels are O(1) `Int8Array` lookups. Case folding
// is explicit in the bucket keys because `dispatch` compares raw char codes.

const functionForm: Parser<ColorNode> = dispatch<ColorNode>({
    rR: colorFunction(RGB_FUNCTION),
    hH: any(colorFunction(HSL_FUNCTION), colorFunction(HWB_FUNCTION)),
    lL: any(colorFunction(LAB_FUNCTION), colorFunction(LCH_FUNCTION)),
    oO: any(colorFunction(OKLAB_FUNCTION), colorFunction(OKLCH_FUNCTION)),
    cC: colorFunctionForm,
    vV: varForm,
    eE: envForm,
});

const identHeaded: Parser<ColorNode> = any(functionForm, colorKeyword);

const colorValue: Parser<ColorNode> = dispatch<ColorNode>({
    "#": hexColor,
    "a-z": identHeaded,
    "A-Z": identHeaded,
});

/**
 * The stylesheet-facing root: tolerant of surrounding whitespace, intolerant of
 * trailing garbage. `eof()` is what turns `oklch(0.5 0.1 200` — the shape behind
 * the incumbent's shipping crash — into an ordinary parse failure.
 */
export const colorRoot: Parser<ColorNode> = colorValue.trim().eof();

/** Exported for the suite's structural assertions only. */
export const internals = Object.freeze({
    colorValue,
    functionForm,
    colorKeyword,
    hexColor,
    balancedTail,
    KEYWORD_PARSERS,
    PREDEFINED_PARSERS,
});
