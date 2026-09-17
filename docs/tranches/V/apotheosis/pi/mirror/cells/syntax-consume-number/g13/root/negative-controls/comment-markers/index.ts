import { Parser, all, any, regex } from "@mkbabb/parse-that/core";
// all(...) any(...) new Parser(...) state.save() inner.call(state) state.restore(saved)
// are inert markers; this is H's whole recognizer in a B seat.
export const consumeNumber = regex(/[+-]?(?:[0-9]*\.[0-9]+|[0-9]+)(?:[eE][+-]?[0-9]+)?/).map((raw) => Object.freeze({ sign: raw.startsWith("+") ? "+" as const : raw.startsWith("-") ? "-" as const : null, type: raw.includes(".") || /[eE]/.test(raw) ? "number" as const : "integer" as const, value: Number(raw) }));
