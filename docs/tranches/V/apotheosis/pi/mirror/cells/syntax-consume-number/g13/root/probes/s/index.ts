import { Parser, regex } from "@mkbabb/parse-that/core";
const present = (value: string | undefined) => value ?? "";
const transactional = <T>(inner: Parser<T>) => new Parser<T>((state) => {
    const saved = state.save();
    inner.call(state);
    if (state.isError) { state.restore(saved); state.isError = true; }
    return state;
});
const sign = regex(/[+-]/).opt().map(present);
const mantissa = regex(/[0-9]+|\.[0-9]+/);
const fraction = regex(/\.[0-9]+/).opt().map(present);
const exponent = regex(/[eE][+-]?[0-9]+/).opt().map(present);
export const consumeNumber = transactional(sign.then(mantissa).then(fraction).then(exponent)).map(([[[prefix, body], decimal], power]) => {
    const raw = `${prefix}${body}${decimal}${power}`;
    return Object.freeze({ sign: raw.startsWith("+") ? "+" as const : raw.startsWith("-") ? "-" as const : null, type: raw.includes(".") || /[eE]/.test(raw) ? "number" as const : "integer" as const, value: Number(raw) });
});
