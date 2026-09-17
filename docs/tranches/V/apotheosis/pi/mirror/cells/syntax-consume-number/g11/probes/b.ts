import { Parser, all, any, regex } from "@mkbabb/parse-that/core";

const transactional = <T>(inner: Parser<T>): Parser<T> => new Parser<T>((state) => {
    const saved = state.save();
    inner.call(state);
    if (state.isError) {
        state.restore(saved);
        state.isError = true;
    }
    return state;
});
const present = (value: string | undefined) => value ?? "";
const integerMantissa = all(regex(/[0-9]+/), regex(/\.[0-9]+/).opt().map(present)).map(([integer, fraction]) => `${integer}${fraction}`);
const mantissa = any(integerMantissa, regex(/\.[0-9]+/));
const pieces = all(regex(/[+-]/).opt().map(present), mantissa, regex(/[eE][+-]?[0-9]+/).opt().map(present));

/** Feasibility probe only; uses public save/restore to repair aggregate value rollback. */
export const probeB = transactional(pieces).map(([sign, body, exponent]) => {
    const raw = `${sign}${body}${exponent}`;
    return Object.freeze({
        value: Number(raw),
        type: raw.includes(".") || /[eE]/.test(raw) ? "number" as const : "integer" as const,
        sign: raw.startsWith("+") ? "+" as const : raw.startsWith("-") ? "-" as const : null,
    });
});
