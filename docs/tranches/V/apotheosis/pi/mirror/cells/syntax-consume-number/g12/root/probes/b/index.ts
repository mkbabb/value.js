import { Parser, all, any, regex } from "@mkbabb/parse-that/core";
const present = (value: string | undefined) => value ?? "";
const transactional = <T>(inner: Parser<T>) => new Parser<T>((state) => {
    const saved = state.save();
    inner.call(state);
    if (state.isError) { state.restore(saved); state.isError = true; }
    return state;
});
const integerMantissa = all(regex(/[0-9]+/), regex(/\.[0-9]+/).opt().map(present)).map(([integer, fraction]) => `${integer}${fraction}`);
const pieces = all(regex(/[+-]/).opt().map(present), any(integerMantissa, regex(/\.[0-9]+/)), regex(/[eE][+-]?[0-9]+/).opt().map(present));
export const consumeNumber = transactional(pieces).map(([sign, body, exponent]) => {
    const raw = `${sign}${body}${exponent}`;
    return Object.freeze({ sign: raw[0] === "+" ? "+" as const : raw[0] === "-" ? "-" as const : null, type: raw.includes(".") || /[eE]/.test(raw) ? "number" as const : "integer" as const, value: Number(raw) });
});
