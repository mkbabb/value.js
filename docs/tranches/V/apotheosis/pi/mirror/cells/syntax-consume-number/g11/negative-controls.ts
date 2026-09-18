import { regex } from "@mkbabb/parse-that/core";

type Leaf = Readonly<{ value: number; type: "integer" | "number"; sign: "+" | "-" | null }>;
const leaf = (raw: string): Leaf => Object.freeze({
    value: Number(raw),
    type: raw.includes(".") || /[eE]/.test(raw) ? "number" : "integer",
    sign: raw.startsWith("+") ? "+" : raw.startsWith("-") ? "-" : null,
});

/** Deliberately omits signs, leading-dot numbers, fractions, and exponents. */
export const positiveIntegerOnly = regex(/[0-9]+/).map(leaf);

/** Deliberately transposes the historical no-plus/leading-zero restriction. */
export const historicalIncomplete = regex(/-?(?:(0|[1-9][0-9]*)(\.[0-9]+)?|\.[0-9]+)([eE][+-]?[0-9]+)?/).map(leaf);

/** Deliberately omits leading-dot and exponent productions. */
export const noLeadingDotOrExponent = regex(/[+-]?[0-9]+(?:\.[0-9]+)?/).map(leaf);
