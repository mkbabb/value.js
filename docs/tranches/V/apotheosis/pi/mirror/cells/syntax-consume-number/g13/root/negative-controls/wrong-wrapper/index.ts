import { Parser, regex } from "@mkbabb/parse-that/core";
const transactional = <T>(inner: Parser<T>) => new Parser<T>((state) => {
    const saved = state.save();
    inner.call(state);
    state.isError = true;
    if (state.isError) { state.restore(saved); state.isError = true; }
    return state;
});
const sign = regex(/[+-]/).opt();
const mantissa = regex(/[0-9]+|\.[0-9]+/);
const fraction = regex(/\.[0-9]+/).opt();
const exponent = regex(/[eE][+-]?[0-9]+/).opt();
export const consumeNumber = transactional(sign.then(mantissa).then(fraction).then(exponent)).map(() => Object.freeze({ sign: null, type: "integer" as const, value: Number("0") }));
