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
 * A structured parse diagnostic (VJ-F2 / F10, tranche-N W7). The csstree
 * `onParseError`-shaped record a consumer (keyframes.js
 * `ResolvedKeyframes.diagnostics`) surfaces instead of value.js's historical
 * silent-swallow / `console.error`. Emitted on a failed (or partial) parse.
 */
export interface ParseDiagnostic {
    /** A human-readable summary of where + why the parse derailed. */
    message: string;
    /** The byte offset at which the parse failed (the furthest reach). */
    offset: number;
    /** 1-based line / 0-based column of `offset` within `input`. */
    line: number;
    column: number;
    /** The parser names/descriptions expected at the failure point, if known. */
    expected?: string[];
    /** The full input string the parse ran against. */
    input: string;
}

/** A pluggable diagnostics sink. Called once per failed parse with the record. */
export type OnParseError = (diagnostic: ParseDiagnostic) => void;

/**
 * Build the structured diagnostic for a failed `ParserState`. Uses the
 * `furthest` reach (the deepest offset any branch consumed to) when available —
 * it pinpoints the derail far better than the top-level `offset` for an `any`
 * dispatch — and the `expected` set parse-that records there.
 */
function buildDiagnostic(
    state: { offset: number; furthest?: number; expected?: string[];
        getLineAndColumn?: (offset?: number) => { line: number; column: number } },
    input: string,
): ParseDiagnostic {
    const offset = state.furthest ?? state.offset;
    const start = Math.max(0, offset - 8);
    const end = Math.min(input.length, offset + 8);
    const context = input.slice(start, end);
    const lc = state.getLineAndColumn?.(offset) ?? { line: 1, column: offset };
    return {
        message: `Parse error at offset ${offset}: "...${context}..."`,
        offset,
        line: lc.line,
        column: lc.column,
        // Only attach `expected` when parse-that recorded it (exactOptional).
        ...(state.expected ? { expected: state.expected } : {}),
        input,
    };
}

/**
 * Try to parse; return the result or throw on failure.
 * Equivalent to Parsimmon's `.tryParse()`.
 *
 * The thrown error includes a 16-char context window (8 before / 8 after
 * the failure offset) so callers — particularly the demo's color-picker
 * error toasts — can pinpoint where the parse derailed. (E.W1 Lane D /
 * E-AUDIT-5 §9 item 11.)
 *
 * When an `onParseError` sink is supplied (VJ-F2), the structured diagnostic is
 * emitted to it BEFORE the throw — a consumer can collect diagnostics without
 * try/catching every parse, and the throw still happens for the existing
 * fail-loud contract.
 */
export function tryParse<T>(
    parser: Parser<T>,
    input: string,
    onParseError?: OnParseError,
): T {
    const state = parser.parseState(input);
    if (state.isError) {
        const diagnostic = buildDiagnostic(state, input);
        onParseError?.(diagnostic);
        throw new Error(diagnostic.message);
    }
    return state.value;
}

/**
 * Parse and return a result object with `.status` and `.value`.
 * Equivalent to Parsimmon's `.parse()` return shape.
 *
 * When an `onParseError` sink is supplied (VJ-F2), a failed parse emits the
 * structured diagnostic to it (a successful parse emits nothing); the
 * `{status, value}` shape is unchanged so existing callers are unaffected.
 */
export function parseResult<T>(
    parser: Parser<T>,
    input: string,
    onParseError?: OnParseError,
): { status: boolean; value: T } {
    const state = parser.parseState(input);
    if (state.isError && onParseError) {
        onParseError(buildDiagnostic(state, input));
    }
    return { status: !state.isError, value: state.value };
}
