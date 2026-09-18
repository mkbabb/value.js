import { regex } from "@mkbabb/parse-that/core";

const leaf = (raw: string) => Object.freeze({
    value: Number(raw),
    type: raw.includes(".") || /[eE]/.test(raw) ? "number" as const : "integer" as const,
    sign: raw.startsWith("+") ? "+" as const : raw.startsWith("-") ? "-" as const : null,
});

/** Feasibility probe only; not a G11 candidate or accepted feature source. */
export const probeH = regex(/[+-]?(?:[0-9]*\.[0-9]+|[0-9]+)(?:[eE][+-]?[0-9]+)?/).map(leaf);
