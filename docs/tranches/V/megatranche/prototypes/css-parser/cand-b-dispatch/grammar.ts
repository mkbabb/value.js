/**
 * CANDIDATE B — THE GRAMMAR. Dispatch-first, table-driven.
 *
 * Shape of the file, in the order it reads:
 *   1. terminals            — one regex per TOKEN, never spanning a delimiter
 *   2. the generic fold     — ONE production builder that consumes `table.ts`
 *   3. the non-table arms   — the productions the table honestly cannot express
 *   4. the dispatch table   — every `<color>` alternative, keyed by first byte
 *   5. the entry point      — `parseState()` + `isError`, total, never throws
 *
 * IDIOM (GROUND-B §6), held throughout:
 *   · 0 non-null assertions, 0 `as` casts             (checked by structure.test.ts)
 *   · no `source[i]` cursor, no `splitTopLevel`, no depth counter
 *   · every regex is one token; no capture-group structure; no `.*` remainder
 *   · `.opt()` never appears inside `all()` — `.then()` is used instead
 *   · arity comes from `sepBy`/`many`/the table fold, never a post-hoc length check
 *   · `Parser.lazy` appears exactly twice, once per back-edge
 *   · no `memoize()` / `resetPackrat()` anywhere
 *   · the entry point reads `state.isError`; `Parser.parse()` is never called
 */

import { Parser, any, dispatch, regex, string } from "@mkbabb/parse-that";

import type {
    Channel,
    ColorNode,
    ColorOutcome,
    ColorSpace,
    HueMethod,
    InterpolationMethod,
    MixComponent,
    RelativeChannel,
} from "./ast";
import type { ChannelKind, ChannelSpec, ColorCallRow, ColorFunctionRow } from "./table";
import {
    ALPHA_KIND,
    COLOR_CALLS,
    COLOR_FUNCTIONS,
    HUE_METHODS,
    POLAR_INTERPOLATION_SPACES,
    RECTANGULAR_INTERPOLATION_SPACES,
    SUBSTITUTION_FUNCTIONS,
    SYSTEM_COLORS,
} from "./table";
// The 148-entry `<named-color>` table is DATA, and GROUND-A measured it as
// name-perfect against css-color-4. This band replaces the GRAMMAR, not the
// data; `coverage.test.ts` re-checks it against the scraped spec fixture.
// (GROUND-A's own `denominator/measure.ts` imports from `src/` by the same path.)
import { NAMED_COLORS } from "../../../../../../../src/css/named-colors";

// ─── 1 · Terminals ──────────────────────────────────────────────────────────
//
// A regex here recognises exactly ONE token and yields its text. None of them
// spans a delimiter, none carries structure in a capture group, and none is a
// `.*` remainder. Everything structural is a combinator.

/** CSS Syntax §4.3.12 `<number>`. Maximal-munch, and it STOPS SHORT correctly:
 *  `1.` -> `1`, `1e+` -> `1`, `1.2.3` -> `1.2`. Shape adapted from the one
 *  V·π operation GROUND-C salvaged (G16) — inherited as shape, re-derived here. */
const NUMBER = /[+-]?(?:\d+(?:\.\d+)?|\.\d+)(?:[eE][+-]?\d+)?/;

const number: Parser<number> = regex(NUMBER).map(Number);

const percentSign = string("%");
const openParen = string("(");
const closeParen = string(")");
const comma = string(",").trim();
const solidus = string("/").trim();

/** One ident-continuation code point. Used only as a zero-width BOUNDARY. */
const identChar = regex(/[\w-]/);

/** `ident(` … `)` bodies we deliberately do not model, e.g. `var()`, `calc()`. */
const identToken = regex(/[a-zA-Z][\w-]*/);

/**
 * ASCII case-insensitive keyword terminal built from a table row. Longest
 * spelling first, so `srgb-linear` cannot be shadowed by `srgb`. Every keyword
 * in `table.ts` is `[a-z0-9-]+`, so no regex escaping is required.
 */
const keywords = (names: readonly string[]): Parser<string> =>
    regex(new RegExp([...names].sort((a, b) => b.length - a.length).join("|"), "i"));

/**
 * R-15: attach a zero-width negative assertion to a REAL element with `.skip()`
 * rather than dropping a bare `.not()` into `all()`. Without this, `120deg50%`
 * would read as `120deg` + `50%` instead of the single bad dimension it is.
 */
const bounded = (parser: Parser<string>): Parser<string> => parser.skip(identChar.not());

const hueUnit = bounded(regex(/deg|grad|rad|turn/i));

const noneKeyword: Parser<Channel> = bounded(regex(/none/i)).map((): Channel => "none");

const toDegrees = (value: number, unit: string | undefined): number => {
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

/**
 * `<hue>` and the scalar channels. `.then()` — NOT `all()` — carries the
 * optional suffix: `all()` DROPS `undefined` arms at runtime while its tuple
 * type keeps them, which is how a positional destructure silently shifts.
 */
const hueChannel: Parser<Channel> = number
    .then(hueUnit.opt())
    .map(([value, unit]): Channel => toDegrees(value, unit));

const scalarChannel = (percentRef: number, numberScale: number): Parser<Channel> =>
    number
        .then(percentSign.opt())
        .map(([value, percent]): Channel =>
            percent === undefined ? value * numberScale : (value * percentRef) / 100,
        );

/** css-color-4 §7.1: the LEGACY forms do not admit `none`. That is `allowNone`. */
const channelParser = (kind: ChannelKind, allowNone: boolean): Parser<Channel> => {
    const core =
        kind.kind === "hue" ? hueChannel : scalarChannel(kind.percentRef, kind.numberScale);
    return allowNone ? any(noneKeyword, core) : core;
};

const alphaParser = (allowNone: boolean): Parser<Channel> =>
    channelParser(ALPHA_KIND, allowNone).trim();

/** `<percentage>` as authored — used by `color-mix()` weights only. */
const percentage: Parser<number> = number.skip(percentSign);

// ─── 2 · The generic fold: ONE production, driven by the table ──────────────
//
// `sequence` is the whole thesis. Arity, unit rules and separator regime all
// come from the table row; nothing here is written per-function. The fold uses
// `.then()` so no arm can be dropped, and the seed is `kinds[0]` — reachable
// WITHOUT a `!` because `ChannelSpec` is typed non-empty.

const sequence = <T>(
    spec: ChannelSpec,
    element: (kind: ChannelKind) => Parser<T>,
    separator: Parser<string> | undefined,
): Parser<readonly [T, ...T[]]> => {
    const step = (kind: ChannelKind): Parser<T> => {
        const parsed = element(kind).trim();
        return separator === undefined ? parsed : separator.next(parsed);
    };

    // `uniform`: arity lives in `many(min, max)` — the combinator — never in a
    // post-hoc `if (parts.length !== n)`. Splitting head+tail rather than
    // calling `many(min, max)` once is what makes the result non-empty BY
    // CONSTRUCTION, so no runtime re-check and no `!` are needed to type it.
    if (spec.kind === "uniform") {
        return element(spec.channel)
            .trim()
            .then<T[]>(step(spec.channel).many(spec.min - 1, spec.max - 1))
            .map(([head, tail]): readonly [T, ...T[]] => [head, ...tail]);
    }

    const [first, ...rest] = spec.kinds;
    return rest.reduce<Parser<readonly [T, ...T[]]>>(
        (accumulated, kind) =>
            accumulated
                .then<T>(step(kind))
                .map(([list, next]): readonly [T, ...T[]] => [...list, next]),
        element(first)
            .trim()
            .map((value): readonly [T, ...T[]] => [value]),
    );
};

// ─── 3 · Recursion back-edges ───────────────────────────────────────────────
//
// `Parser.lazy` is required exactly where a production names a `const` declared
// LATER, because the combinator graph is built eagerly. This file has TWO
// back-edges and therefore exactly TWO `Parser.lazy` calls.

/** Back-edge 1: `color-mix()`, `light-dark()` and `[from <color>]` re-enter `<color>`. */
const nestedColor: Parser<ColorNode> = Parser.lazy(() => colorValue);

/** Back-edge 2: a balanced `( … )` group, so an unmodelled call can be SKIPPED
 *  as ordinary grammar rather than by a hand-written depth counter (AP-6).
 *  Its value is never read — only its extent matters. */
const balancedGroup: Parser<string> = Parser.lazy(() =>
    any(regex(/[^()]+/), balancedGroup)
        .many()
        .map(() => "()")
        .wrap(openParen, closeParen),
);

// ─── 3a · Colour spaces named by a keyword head ─────────────────────────────

const spaceFromTable = (
    entries: readonly (readonly [string, ColorSpace])[],
): Parser<ColorSpace> => {
    const lookup = new Map(entries);
    return bounded(keywords(entries.map(([spelling]) => spelling))).map(
        (text): ColorSpace =>
            // Unreachable fallback by construction: the terminal above only
            // matches spellings present in `lookup`. Written as a total
            // expression rather than a `!`, which is the whole point.
            lookup.get(text.toLowerCase()) ?? { profile: text.toLowerCase() },
    );
};

const customProfile: Parser<ColorSpace> = regex(/--[\w-]*/).map(
    (ident): ColorSpace => ({ profile: ident }),
);

const spaceHead = (
    entries: readonly (readonly [string, ColorSpace])[],
    custom: boolean,
): Parser<ColorSpace> => {
    if (entries.length === 0) return customProfile;
    return custom ? any(spaceFromTable(entries), customProfile) : spaceFromTable(entries);
};

/**
 * TABLE COST 1, resolved: the row's space is either a constant or a leading
 * parser. Reifying that choice ONCE, here, is the only branch the generic
 * production needs — and binding the constant as a plain value (rather than
 * re-reading `row.space.space` inside a callback) is what keeps the closures
 * free of re-narrowing and therefore free of `!`.
 */
type SpaceBinding =
    | { readonly head: Parser<ColorSpace> }
    | { readonly fixed: ColorSpace };

const spaceBinding = (row: ColorFunctionRow): SpaceBinding => {
    const source = row.space;
    return source.kind === "head"
        ? { head: spaceHead(source.spaces, source.custom).trim() }
        : { fixed: source.space };
};

const withFixedSpace = <T>(
    space: ColorSpace,
    values: Parser<readonly [T, ...T[]]>,
): Parser<{ readonly space: ColorSpace; readonly values: readonly [T, ...T[]] }> =>
    values.map((parsed) => ({ space, values: parsed }));

const withFixedOrigin = (
    space: ColorSpace,
    origin: Parser<ColorNode>,
): Parser<{ readonly origin: ColorNode; readonly space: ColorSpace }> =>
    origin.map((node) => ({ origin: node, space }));

// ─── 3b · Relative colour syntax (css-color-5 §2) ───────────────────────────
//
// Recognised, and refused by the ENTRY POINT with the same typed
// `color_context_required` the live parser uses — a context-free parser cannot
// resolve `r`/`g`/`b` without the origin colour's resolved value.

const fromKeyword = bounded(regex(/from/i));

const relativeElement = (row: ColorFunctionRow, kind: ChannelKind): Parser<RelativeChannel> =>
    any(
        channelParser(kind, true).map((channel): RelativeChannel => ({ channel })),
        bounded(keywords([...row.channelNames, "alpha"])).map(
            (ref): RelativeChannel => ({ ref: ref.toLowerCase() }),
        ),
        identToken
            .then(balancedGroup)
            .map(([call]): RelativeChannel => ({ call: call.toLowerCase() })),
    );

const relativeArguments = (row: ColorFunctionRow): Parser<ColorNode> => {
    const origin = fromKeyword.next(nestedColor.trim());
    const binding = spaceBinding(row);
    const located: Parser<{ readonly origin: ColorNode; readonly space: ColorSpace }> =
        "head" in binding
            ? origin
                  .then<ColorSpace>(binding.head)
                  .map(([node, space]) => ({ origin: node, space }))
            : withFixedOrigin(binding.fixed, origin);

    const channels = sequence(
        row.channels,
        (kind) => relativeElement(row, kind),
        undefined,
    );
    const alpha = solidus.next(relativeElement(row, ALPHA_KIND).trim()).opt();

    return located
        .then(channels)
        .then<RelativeChannel | undefined>(alpha)
        .map(
            ([[head, parsed], tail]): ColorNode => ({
                kind: "relative",
                space: head.space,
                origin: head.origin,
                channels: parsed,
                alpha: tail,
            }),
        );
};

// ─── 3c · THE generic colour-function production ────────────────────────────

const channelArguments = (row: ColorFunctionRow, legacy: boolean): Parser<ColorNode> => {
    const allowNone = !legacy;
    const channels = sequence(
        row.channels,
        (kind) => channelParser(kind, allowNone),
        legacy ? comma : undefined,
    );

    const binding = spaceBinding(row);
    const located: Parser<{
        readonly space: ColorSpace;
        readonly values: readonly [Channel, ...Channel[]];
    }> =
        "head" in binding
            ? binding.head
                  .then<readonly [Channel, ...Channel[]]>(channels)
                  .map(([space, parsed]) => ({ space, values: parsed }))
            : withFixedSpace(binding.fixed, channels);

    // Modern: `/ <alpha>`. Legacy: `, <alpha>`. Either way the tail is OPTIONAL
    // and therefore carried by `.then()`; an EMPTY tail cannot succeed, which is
    // the R3 / P-037 fix — `rgb(1 2 3 /)` leaves the `/` unconsumed and the
    // closing paren then fails.
    const alphaTail = (legacy ? comma : solidus).next(alphaParser(allowNone));

    return located
        .then<Channel | undefined>(alphaTail.opt())
        .map(
            ([head, alpha]): ColorNode => ({
                kind: "color",
                space: head.space,
                channels: head.values,
                alpha: alpha ?? 1,
            }),
        );
};

/** THE generic production. Every row in `COLOR_FUNCTIONS` goes through here. */
const colorFunction = (row: ColorFunctionRow): Parser<ColorNode> => {
    const modern = channelArguments(row, false);
    const forms = row.legacy
        ? [modern, channelArguments(row, true), relativeArguments(row)]
        : [modern, relativeArguments(row)];
    return keywords(row.names).next(any(...forms).wrap(openParen, closeParen));
};

/** The colour-argument functions. Arity comes from the table, via `sepBy`. */
const colorCall = (row: ColorCallRow): Parser<ColorNode> =>
    keywords(row.names).next(
        nestedColor
            .trim()
            .sepBy(comma, row.arity, row.arity)
            .map((args): ColorNode => ({ kind: "call", name: row.name, args }))
            .wrap(openParen, closeParen),
    );

// ─── 3d · `color-mix()` — the production the table CANNOT express ───────────
//
// It has no channels, an interpolation-method head with its own space list and
// its own polar/rectangular split, and two weighted COLOUR arguments whose
// `<percentage>` may sit on either side of the colour (`&&`). Nothing about it
// is a row. Written by hand, and reported as the table's boundary.

const toHueMethod = (text: string): HueMethod => {
    const lower = text.toLowerCase();
    if (lower === "longer") return "longer";
    if (lower === "increasing") return "increasing";
    if (lower === "decreasing") return "decreasing";
    return "shorter";
};

const hueInterpolation: Parser<HueMethod> = bounded(keywords(HUE_METHODS))
    .trim()
    .skip(bounded(regex(/hue/i)))
    .map(toHueMethod);

const interpolationMethod: Parser<InterpolationMethod> = bounded(regex(/in/i))
    .trim()
    .next(
        any(
            spaceHead(POLAR_INTERPOLATION_SPACES, false)
                .trim()
                .then<HueMethod | undefined>(hueInterpolation.opt())
                .map(([space, hue]): InterpolationMethod => ({ space, hue })),
            spaceHead(RECTANGULAR_INTERPOLATION_SPACES, false).map(
                (space): InterpolationMethod => ({ space, hue: undefined }),
            ),
        ),
    );

const mixComponent: Parser<MixComponent> = any(
    nestedColor
        .trim()
        .then<number | undefined>(percentage.trim().opt())
        .map(([color, weight]): MixComponent => ({ color, weight })),
    percentage
        .trim()
        .then<ColorNode>(nestedColor.trim())
        .map(([weight, color]): MixComponent => ({ color, weight })),
);

const colorMix: Parser<ColorNode> = keywords(["color-mix"]).next(
    interpolationMethod
        .trim()
        .skip(comma)
        .then<MixComponent>(mixComponent.skip(comma))
        .then<MixComponent>(mixComponent)
        .map(
            ([[method, first], second]): ColorNode => ({
                kind: "mix",
                method,
                components: [first, second],
            }),
        )
        .wrap(openParen, closeParen),
);

// ─── 3e · Literal and context-dependent arms ────────────────────────────────

const hexDigits = (text: string): { channels: readonly [Channel, Channel, Channel]; alpha: number } => {
    const digits = text.startsWith("#") ? text.slice(1) : text;
    const expanded =
        digits.length <= 4
            ? [...digits].map((digit) => digit + digit).join("")
            : digits;
    const octet = (index: number): number => parseInt(expanded.slice(index, index + 2), 16);
    return {
        channels: [octet(0), octet(2), octet(4)],
        alpha: expanded.length === 8 ? octet(6) / 255 : 1,
    };
};

const rgbNode = (text: string): ColorNode => {
    const { channels, alpha } = hexDigits(text);
    return { kind: "color", space: "rgb", channels, alpha };
};

/** css-color-4 §5.2. Longest alternative first so `#aabbccdd` is 8, not 6+2. */
const hexColor: Parser<ColorNode> = regex(
    /#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{4}|[0-9a-fA-F]{3})/,
).map(rgbNode);

const TRANSPARENT: ColorNode = {
    kind: "color",
    space: "rgb",
    channels: [0, 0, 0],
    alpha: 0,
};

const unresolved = (reason: "context" | "substitution", keyword: string): ColorNode => ({
    kind: "unresolved",
    reason,
    keyword,
});

// ─── 4 · The dispatch table ─────────────────────────────────────────────────
//
// `dispatch()` is an Int8Array(128) first-character table: O(1), no trial. Every
// `<color>` alternative is registered under the first byte of each of its
// spellings (both cases, since CSS keywords are ASCII case-insensitive), and
// arms inside one bucket are ordered LONGEST SPELLING FIRST so a short keyword
// can never shadow a longer one that starts with it.

interface Arm {
    readonly first: string;
    readonly weight: number;
    readonly parser: Parser<ColorNode>;
}

const armsFor = (names: readonly string[], parser: Parser<ColorNode>): readonly Arm[] =>
    names.map((name) => ({ first: name.slice(0, 1), weight: name.length, parser }));

const namedColorArms: readonly Arm[] = Object.entries(NAMED_COLORS).flatMap(
    ([name, hex]) => {
        const node = rgbNode(hex);
        return armsFor([name], regex(new RegExp(name, "i")).map((): ColorNode => node));
    },
);

const ARMS: readonly Arm[] = [
    { first: "#", weight: 1, parser: hexColor },
    ...namedColorArms,
    ...armsFor(
        ["transparent"],
        bounded(regex(/transparent/i)).map((): ColorNode => TRANSPARENT),
    ),
    ...armsFor(
        ["currentcolor"],
        bounded(regex(/currentcolor/i)).map((): ColorNode =>
            unresolved("context", "currentcolor"),
        ),
    ),
    ...SYSTEM_COLORS.flatMap((name) =>
        armsFor(
            [name],
            bounded(regex(new RegExp(name, "i"))).map((): ColorNode =>
                unresolved("context", name),
            ),
        ),
    ),
    ...SUBSTITUTION_FUNCTIONS.flatMap((name) =>
        armsFor(
            [name],
            regex(new RegExp(name, "i"))
                .next(balancedGroup)
                .map((): ColorNode => unresolved("substitution", name)),
        ),
    ),
    ...COLOR_FUNCTIONS.flatMap((row) => armsFor(row.names, colorFunction(row))),
    ...COLOR_CALLS.flatMap((row) => armsFor(row.names, colorCall(row))),
    ...armsFor(["color-mix"], colorMix),
];

const dispatchTable = (arms: readonly Arm[]): Record<string, Parser<ColorNode>> => {
    const buckets = arms.reduce<Map<string, Arm[]>>((map, arm) => {
        const bucket = map.get(arm.first) ?? [];
        bucket.push(arm);
        map.set(arm.first, bucket);
        return map;
    }, new Map());

    return Object.fromEntries(
        [...buckets].map(([first, bucket]) => {
            const ordered = [...bucket]
                .sort((left, right) => right.weight - left.weight)
                .map((arm) => arm.parser)
                .filter((parser, index, list) => list.indexOf(parser) === index);
            return [
                /[a-z]/.test(first) ? first + first.toUpperCase() : first,
                any(...ordered),
            ];
        }),
    );
};

const colorValue: Parser<ColorNode> = dispatch<ColorNode>(dispatchTable(ARMS));

/** The public root: whitespace-tolerant, trailing-garbage-intolerant. */
export const colorRoot: Parser<ColorNode> = colorValue.trim().eof();

// ─── 5 · The entry point ────────────────────────────────────────────────────
//
// THE CONTRACT: a ParserState's `value` is meaningful ONLY when `isError` is
// false. `Parser.parse()` returns `state.value` unconditionally and so hands
// back a stale value on a FAILED parse — that is the R1 bug reconstituted in a
// new library. This entry reads `state.isError`, and it is the reason the eight
// MT-F001 crashers return a failure instead of throwing.

/** Depth-first search for the first sub-node no context-free parser can resolve. */
const contextIssue = (node: ColorNode): string | undefined => {
    switch (node.kind) {
        case "unresolved":
            return node.keyword;
        case "relative":
            return "from";
        case "mix": {
            const [first, second] = node.components;
            return contextIssue(first.color) ?? contextIssue(second.color);
        }
        case "call":
            return node.args.reduce<string | undefined>(
                (found, argument) => found ?? contextIssue(argument),
                undefined,
            );
        case "color":
            return undefined;
    }
};

/**
 * The stack-depth backstop, and the ONLY `try` in this candidate.
 *
 * A recursive-descent grammar's nesting depth is bounded by the JS call stack:
 * measured, `color-mix(in srgb, ` nested ~500 deep parses and ~1000 deep
 * exhausts the stack. Totality is promised at the DOOR, so the promise is kept
 * unconditionally here rather than being true only up to some depth.
 *
 * `hostility.test.ts` proves this guard is NOT load-bearing for the corpus: it
 * re-runs every hostile input against the RAW `colorRoot.parseState`, outside
 * the guard, and nothing throws there either. The guard exists for the engine
 * limit alone.
 */
const STACK_LIMIT_FAILURE: ColorOutcome = {
    ok: false,
    code: "css_syntax",
    offset: 0,
    expected: ["input within the parser's nesting depth"],
};

export function parseColor(source: string): ColorOutcome {
    let state;
    try {
        state = colorRoot.parseState(source);
    } catch {
        return STACK_LIMIT_FAILURE;
    }

    if (state.isError) {
        return {
            ok: false,
            code: "css_syntax",
            offset: state.furthest >= 0 ? state.furthest : state.offset,
            expected: state.expected ?? [],
        };
    }

    const issue = contextIssue(state.value);
    if (issue !== undefined) {
        return {
            ok: false,
            code: "color_context_required",
            offset: 0,
            expected: [issue],
        };
    }

    return { ok: true, node: state.value };
}
