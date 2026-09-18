import { Parser, regex, string } from "@mkbabb/parse-that";

const COMMENT = String.raw`\/\*(?:[^*]|\*(?!\/))*\*\/`;
const SPACE = String.raw`[\t\n\f\r ]`;

/** CSS whitespace and comments. These are parser combinators, not a token stream. */
export const w1 = regex(new RegExp(String.raw`(?:${SPACE}+|${COMMENT})(?:${SPACE}+|${COMMENT})*`));
export const w0 = w1.opt();

export const symbol = (value: string): Parser<string> => string(value).skip(w0);

export function insensitive(value: string): Parser<string> {
    const escaped = value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return regex(new RegExp(escaped, "i"));
}

export const keyword = (value: string): Parser<string> => insensitive(value).skip(w0);

export function between<T>(open: string, parser: Parser<T>, close: string): Parser<T> {
    return symbol(open).next(parser).skip(symbol(close));
}

export function whole<T>(parser: Parser<T>): Parser<T> {
    return w0.next(parser).skip(w0).eof();
}

export function succeed<T>(value: T): Parser<T> {
    return new Parser<T>((state) => state.ok(value));
}

export function fail<T>(): Parser<T> {
    return new Parser<T>((state) => state.err(undefined));
}
