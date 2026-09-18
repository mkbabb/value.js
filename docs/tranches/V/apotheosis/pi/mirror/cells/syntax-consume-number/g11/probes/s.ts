import { Parser, regex } from "@mkbabb/parse-that/core";

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
const signStep = regex(/[+-]/).opt().map(present);
const mantissaStep = regex(/[0-9]+|\.[0-9]+/);
const fractionStep = regex(/\.[0-9]+/).opt().map(present);
const exponentStep = regex(/[eE][+-]?[0-9]+/).opt().map(present);
const steps = signStep.then(mantissaStep).then(fractionStep).then(exponentStep);

/** Feasibility probe only; exact then/opt steps replace G10's nonexistent guard API. */
export const probeS = transactional(steps).map(([[[sign, mantissa], fraction], exponent]) => {
    const raw = `${sign}${mantissa}${fraction}${exponent}`;
    return Object.freeze({
        value: Number(raw),
        type: raw.includes(".") || /[eE]/.test(raw) ? "number" as const : "integer" as const,
        sign: raw.startsWith("+") ? "+" as const : raw.startsWith("-") ? "-" as const : null,
    });
});
