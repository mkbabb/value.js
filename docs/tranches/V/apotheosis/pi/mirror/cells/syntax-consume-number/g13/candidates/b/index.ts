import { Parser, all, any, regex } from "@mkbabb/parse-that/core";

const sign = regex(/[+-]/).opt().map((value) => value ?? "");
const integer = regex(/[0-9]+/);
const withInteger = all(integer, regex(/\.[0-9]+/).opt()).map(
    ([digits, fraction]) => `${digits}${fraction ?? ""}`,
);
const fraction = regex(/\.[0-9]+/);
const exponent = regex(/[eE][+-]?[0-9]+/).opt().map((value) => value ?? "");
const number = all(sign, any(withInteger, fraction), exponent);

const transaction = <T>(inner: Parser<T>) => new Parser<T>((state) => {
    const saved = state.save();
    inner.call(state);
    if (state.isError) {
        state.restore(saved);
        state.isError = true;
    }
    return state;
});

export const consumeNumber = transaction(number).map(([sign, mantissa, exponent]) => Object.freeze({
    sign: sign || null,
    type: mantissa.includes(".") || exponent ? "number" : "integer",
    value: Number(`${sign}${mantissa}${exponent}`),
}));
