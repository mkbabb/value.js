import { Parser, regex, string } from "@mkbabb/parse-that";
import type { ParserState } from "@mkbabb/parse-that";

/** Case-insensitive string match. Returns the matched portion of the input. */
export const istring = (str: string) => {
    const re = new RegExp(str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
    return regex(re);
};

/** Maximal run of identifier characters — the unit token. */
const unitToken = regex(/[a-zA-Z]+/);

/**
 * Maximal-munch unit classifier. Consumes the longest identifier-shaped token
 * and succeeds ONLY when the whole token (case-insensitively) is a member of
 * `units`; otherwise the parser fails.
 *
 * This replaces `any(...units.map(istring))`, which was order-dependent and —
 * because `istring` compiles a non-anchored RegExp re-flagged sticky `y` by
 * parse-that — matched a unit as a *prefix* of the continuation: `100vhx`
 * tokenized `vh` and silently dropped the trailing `x`, and a unit that was a
 * prefix of a later-declared one would shadow it. Maximal-munch over the full
 * token removes both hazards (vj-parser-aug §2.2). The canonical declared
 * spelling is returned so output is byte-identical for every valid unit.
 */
export const unitParser = (units: readonly string[]): Parser<string> => {
    // Lower-cased token -> canonical declared spelling.
    const lut = new Map<string, string>();
    for (const u of units) lut.set(u.toLowerCase(), u);

    return unitToken.chain((token: string) => {
        const canonical = lut.get(token.toLowerCase());
        return canonical != null ? succeed(canonical) : fail(`unit:${token}`);
    });
};

export const identifier = regex(/-?[a-zA-Z][a-zA-Z0-9-]*/);

export const none = istring("none");

export const integer = regex(/-?\d+/).map(Number);

export const number = regex(/-?(?:(0|[1-9]\d*)(\.\d+)?|\.\d+)([eE][+-]?\d+)?/).map(Number);

/** Parser that always succeeds with the given value without consuming input. */
export function succeed<T>(value: T): Parser<T> {
    return new Parser<T>((state: ParserState<any>) => {
        return state.ok(value, 0);
    });
}

/** Parser that always fails with the given message. */
export function fail(message: string): Parser<never> {
    return new Parser<never>((state: ParserState<any>) => {
        return state.err(undefined as never, 0);
    });
}

/**
 * Try to parse; return the result or throw on failure.
 * Equivalent to Parsimmon's `.tryParse()`.
 *
 * The thrown error includes a 16-char context window (8 before / 8 after
 * the failure offset) so callers — particularly the demo's color-picker
 * error toasts — can pinpoint where the parse derailed. (E.W1 Lane D /
 * E-AUDIT-5 §9 item 11.)
 */
export function tryParse<T>(parser: Parser<T>, input: string): T {
    const state = parser.parseState(input);
    if (state.isError) {
        const offset = state.offset;
        const start = Math.max(0, offset - 8);
        const end = Math.min(input.length, offset + 8);
        const context = input.slice(start, end);
        throw new Error(
            `Parse error at offset ${offset}: "...${context}..."`,
        );
    }
    return state.value;
}

/**
 * Parse and return a result object with `.status` and `.value`.
 * Equivalent to Parsimmon's `.parse()` return shape.
 */
export function parseResult<T>(parser: Parser<T>, input: string): { status: boolean; value: T } {
    const state = parser.parseState(input);
    return { status: !state.isError, value: state.value };
}
