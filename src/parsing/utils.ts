import { Parser, regex, string } from "@mkbabb/parse-that";
import type { ParserState } from "@mkbabb/parse-that";

/** Case-insensitive string match. Returns the matched portion of the input. */
export const istring = (str: string) => {
    const re = new RegExp(str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
    return regex(re);
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
