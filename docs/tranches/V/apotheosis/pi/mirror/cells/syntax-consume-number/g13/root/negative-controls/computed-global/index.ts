import { regex } from "@mkbabb/parse-that/core";
const ambient = globalThis["process"];
export const consumeNumber = regex(/[+-]?(?:[0-9]*\.[0-9]+|[0-9]+)(?:[eE][+-]?[0-9]+)?/).map((raw) => Object.freeze({ sign: raw.startsWith("+") ? "+" as const : raw.startsWith("-") ? "-" as const : null, type: raw.includes(".") || /[eE]/.test(raw) ? "number" as const : "integer" as const, value: Number(raw) }));
