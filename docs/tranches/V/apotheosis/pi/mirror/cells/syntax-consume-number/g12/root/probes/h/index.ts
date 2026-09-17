import { regex } from "@mkbabb/parse-that/core";
const leaf = (raw: string) => Object.freeze({ sign: raw[0] === "+" ? "+" as const : raw[0] === "-" ? "-" as const : null, type: raw.includes(".") || /[eE]/.test(raw) ? "number" as const : "integer" as const, value: Number(raw) });
export const consumeNumber = regex(/[+-]?(?:[0-9]*\.[0-9]+|[0-9]+)(?:[eE][+-]?[0-9]+)?/).map(leaf);
