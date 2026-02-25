import P from "parsimmon";

export const istring = (str: string) =>
    P((input, i) => {
        const s = input.slice(i);
        if (s.toLowerCase().startsWith(str.toLowerCase())) {
            return P.makeSuccess(i + str.length, str);
        } else {
            return P.makeFailure(i, `Expected ${str}`);
        }
    });

export const identifier = P.regexp(/-?[a-zA-Z][a-zA-Z0-9-]*/);

export const none = istring("none");

export const integer = P.regexp(/-?\d+/).map(Number);

export const number = P.regexp(/-?(0|[1-9]\d*)(\.\d+)?([eE][+-]?\d+)?/).map(Number);

export const opt = <T>(p: P.Parser<T>) => P.alt(p, P.succeed(undefined));
