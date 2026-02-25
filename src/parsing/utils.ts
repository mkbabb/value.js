import { Parser, ParserState, regex, string } from "@mkbabb/parse-that";

/** Case-insensitive string match. Returns the matched portion of the input. */
export const istring = (str: string) => {
    const re = new RegExp(str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
    return regex(re);
};

export const identifier = regex(/-?[a-zA-Z][a-zA-Z0-9-]*/);

export const none = istring("none");

export const integer = regex(/-?\d+/).map(Number);

export const number = regex(/-?(0|[1-9]\d*)(\.\d+)?([eE][+-]?\d+)?/).map(Number);

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
 */
export function tryParse<T>(parser: Parser<T>, input: string): T {
    const state = parser.parseState(input);
    if (state.isError) {
        throw new Error(`Parse error at offset ${state.offset}`);
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
