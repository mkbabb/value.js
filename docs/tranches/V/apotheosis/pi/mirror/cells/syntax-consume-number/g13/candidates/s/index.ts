import { Parser, regex } from "@mkbabb/parse-that/core";

const signParser = regex(/[+-]/).opt();
const mantissaParser = regex(/[0-9]+|\.[0-9]+/);
const fractionParser = regex(/\.[0-9]+/).opt();
const exponentParser = regex(/[eE][+-]?[0-9]+/).opt();

const stagedNumber = signParser
    .then(mantissaParser)
    .then(fractionParser)
    .then(exponentParser);

const transaction = <T>(inner: Parser<T>) => new Parser<T>((state) => {
    const saved = state.save();
    inner.call(state);
    if (state.isError) {
        state.restore(saved);
        state.isError = true;
    }
    return state;
});

export const consumeNumber = transaction(stagedNumber).map(([[[sign, mantissa], fraction], exponent]) => {
    const representation = `${sign ?? ""}${mantissa}${fraction ?? ""}${exponent ?? ""}`;
    return Object.freeze({
        sign: sign ?? null,
        type: representation.includes(".") || /[eE]/.test(representation) ? "number" : "integer",
        value: Number(representation),
    });
});
