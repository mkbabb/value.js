import { any, regex } from "@mkbabb/parse-that/core";
const leaf = (raw: string) => Object.freeze({ sign: raw[0] === "+" ? "+" as const : raw[0] === "-" ? "-" as const : null, type: raw.includes(".") || /[eE]/.test(raw) ? "number" as const : "integer" as const, value: Number(raw) });
/** Deliberately consumes a signed integer before considering its exponent: the exact G11 review counterexample. */
export const consumeNumber = any(regex(/[+-][0-9]+/), regex(/[+-]?(?:[0-9]*\.[0-9]+|[0-9]+)(?:[eE][+-]?[0-9]+)?/)).map(leaf);
