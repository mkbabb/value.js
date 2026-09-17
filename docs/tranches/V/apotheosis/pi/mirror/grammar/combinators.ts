import { Parser } from "@mkbabb/parse-that";

/** A zero-width success used only as the result arm of Parser.chain(). */
export function succeed<T>(value: T): Parser<T> {
    return new Parser<T>((state) => state.ok(value));
}

/** A zero-width failure used only as the rejected arm of Parser.chain(). */
export function reject<T>(): Parser<T> {
    return new Parser<T>((state) => state.err(undefined, 0));
}

/** Parser-native semantic selection: unlike map(), `undefined` rejects. */
export function select<T, U>(
    parser: Parser<T>,
    project: (value: T) => U | undefined,
): Parser<U> {
    return parser.chain((value) => {
        const projected = project(value);
        return projected === undefined ? reject<U>() : succeed(projected);
    });
}

/** Parse a grammar which owns its own leading-trivia and EOF contract. */
export function parseGrammar<T>(grammar: Parser<T>, source: string): T | undefined {
    const state = grammar.parseState(source);
    return state.isError ? undefined : state.value;
}
