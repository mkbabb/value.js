/**
 * cand-O · the total entry points.
 *
 * THE TOTALITY CONTRACT
 * ---------------------
 * `parseColorNode` and `parseColor` are functions from `string` to a result.
 * They do not throw. Not for `rgb()`, not for `oklch(/)`, not for 64 KiB of
 * `(((((…`, not for `undefined` smuggled in from untyped JavaScript.
 *
 * Exactly one rule buys most of that, and it is the rule the incumbent breaks:
 * a ParserState's `value` is meaningful ONLY when `isError` is false.
 * `Parser.parse()` returns `state.value` unconditionally, so on a failed parse
 * it hands back whatever the last successful sub-parser happened to leave —
 * which is how `regex(/[a-z]+/).skip(string("(")).skip(string(")"))` "returns"
 * `"oklch"` for the input `oklch(`. Every entry point below goes through
 * `parseState()` and branches on `isError`. Nothing here reads `parse()`.
 *
 * The remaining risk is a genuine defect in the combinator graph — an exception
 * escaping from a `.map` callback, say. That is covered by an outer try/catch
 * and, so the catch cannot quietly become load-bearing, by a test
 * (`totality.test.ts` → "the try/catch is not load-bearing") that runs the RAW
 * `colorRoot.parseState` over the whole hostile corpus and asserts it never
 * throws on its own.
 */

import type {
    Alpha,
    Channel,
    ColorNode,
    CssColorLike,
    IssueCode,
    ParseIssue,
    ParseResult,
} from "./ast";
import { colorRoot } from "./grammar";

const issue = (
    code: IssueCode,
    offset: number,
    source: string,
    expected: readonly string[] = [],
): ParseResult<never> =>
    Object.freeze({
        ok: false as const,
        issue: Object.freeze({
            code,
            offset,
            expected: Object.freeze([...expected]),
            actual: source.slice(offset) || null,
        }) satisfies ParseIssue,
    });

/**
 * Parse a CSS `<color>` to the faithful AST — including the nodes a
 * context-free parser can recognise but not resolve (`currentColor`, the 19
 * `<system-color>`s, `var()`/`env()`, css-color-5 relative syntax).
 */
export function parseColorNode(source: string): ParseResult<ColorNode> {
    if (typeof source !== "string") {
        return Object.freeze({
            ok: false as const,
            issue: Object.freeze({
                code: "invalid_input" as const,
                offset: 0,
                expected: Object.freeze(["string"]),
                actual: null,
            }),
        });
    }

    try {
        const state = colorRoot.parseState(source);

        if (state.isError) {
            const offset = state.furthest >= 0 ? state.furthest : state.offset;
            return issue("css_syntax", offset, source, state.expected ?? []);
        }

        return Object.freeze({ ok: true as const, value: state.value });
    } catch {
        // Unreachable by construction; see the file header.
        return issue("css_syntax", 0, source);
    }
}

// ── The value.js-shaped adapter ─────────────────────────────────────────────
//
// The AST keeps the space the author WROTE. value.js's `CssColor` has no
// `srgb` and no `xyz-d50`, so the two renames it needs live here — not in the
// grammar. A parser that silently applies a Bradford matrix is not a parser.

/** css-color-4 §17 · Bradford-adapted D50→D65, row-major (value.js's constants). */
const D50_TO_D65 = Object.freeze([
    0.95547342148807501, -0.023098454948764641, 0.063259243200570692,
    -0.028369709333863888, 1.0099953980813041, 0.021041441191917334,
    0.012314014864481979, -0.020507649298898967, 1.3303659262421239,
] as const);

const adaptD50ToD65 = (
    x: number,
    y: number,
    z: number,
): readonly [number, number, number] => [
    D50_TO_D65[0] * x + D50_TO_D65[1] * y + D50_TO_D65[2] * z,
    D50_TO_D65[3] * x + D50_TO_D65[4] * y + D50_TO_D65[5] * z,
    D50_TO_D65[6] * x + D50_TO_D65[7] * y + D50_TO_D65[8] * z,
];

const scaleChannel = (channel: Channel, factor: number): Channel =>
    channel === "none" ? "none" : channel * factor;

const finite = (channel: Channel | Alpha): boolean =>
    channel === "none" || Number.isFinite(channel);

const cssColor = (
    space: string,
    channels: readonly [Channel, Channel, Channel],
    alpha: Alpha,
): CssColorLike => Object.freeze({ space, channels: Object.freeze(channels), alpha });

/**
 * Parse a CSS `<color>` into value.js's `CssColor` shape
 * (`{ space, channels, alpha }`), so the two can be compared field-for-field.
 *
 * Three things legitimately become `ok:false` here that the GRAMMAR accepted:
 *   · context colours, which `CssColor` has nowhere to put;
 *   · a `none` channel in `color(xyz-d50 …)`, because the D50→D65 adaptation is
 *     a matrix multiply and a missing component is not a number;
 *   · a residual ±Infinity on an unclamped channel (`lab(50 1e400 0)`).
 */
export function parseColor(source: string): ParseResult<CssColorLike> {
    const parsed = parseColorNode(source);
    if (!parsed.ok) return parsed;

    const node = parsed.value;
    if (node.kind === "context") {
        return issue("color_context_required", 0, source, [node.reason]);
    }

    const [first, second, third] = node.channels;

    if (![first, second, third, node.alpha].every(finite)) {
        return issue("color_non_finite", 0, source);
    }

    switch (node.space) {
        case "srgb":
            return Object.freeze({
                ok: true as const,
                value: cssColor(
                    "rgb",
                    [
                        scaleChannel(first, 255),
                        scaleChannel(second, 255),
                        scaleChannel(third, 255),
                    ],
                    node.alpha,
                ),
            });

        case "xyz-d65":
            return Object.freeze({
                ok: true as const,
                value: cssColor("xyz", node.channels, node.alpha),
            });

        case "xyz-d50": {
            if (first === "none" || second === "none" || third === "none") {
                return issue("color_missing_channel", 0, source, ["concrete xyz-d50"]);
            }
            const adapted = adaptD50ToD65(first, second, third);
            return Object.freeze({
                ok: true as const,
                value: cssColor("xyz", adapted, node.alpha),
            });
        }

        default:
            return Object.freeze({
                ok: true as const,
                value: cssColor(node.space, node.channels, node.alpha),
            });
    }
}

export type {
    AbsoluteColor,
    Alpha,
    Channel,
    ColorNode,
    ColorSpace,
    ColorSyntax,
    ContextColor,
    ContextReason,
    CssColorLike,
    IssueCode,
    ParseIssue,
    ParseResult,
} from "./ast";
export { colorRoot } from "./grammar";
