import { dispatch, regex } from "@mkbabb/parse-that/core";

const digit = regex(/[0-9]+(?:\.[0-9]+)?(?:[eE][+-]?[0-9]+)?/);
const dot = regex(/\.[0-9]+(?:[eE][+-]?[0-9]+)?/);
const signed = regex(/[+-](?:[0-9]+(?:\.[0-9]+)?|\.[0-9]+)(?:[eE][+-]?[0-9]+)?/);

/** Feasibility probe only; each atomic dispatch arm is failure-transactional in 1.0.0. */
export const probeD = dispatch({ "+-": signed, ".": dot, "0-9": digit }).map((raw) => Object.freeze({
    value: Number(raw),
    type: raw.includes(".") || /[eE]/.test(raw) ? "number" as const : "integer" as const,
    sign: raw.startsWith("+") ? "+" as const : raw.startsWith("-") ? "-" as const : null,
}));
