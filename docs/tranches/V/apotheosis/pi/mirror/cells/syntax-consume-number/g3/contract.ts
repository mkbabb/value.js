import type { Parser } from "@mkbabb/parse-that/core";

/**
 * The exact semantic triple returned by CSS Syntax §4.3.13.
 * Spelling and extent are harness observations, not fields on this leaf.
 */
export type ConsumedNumber = Readonly<{
    value: number;
    type: "integer" | "number";
    sign: "+" | "-" | null;
}>;

export type ConsumeNumberParser = Parser<ConsumedNumber>;

export type NumberLiteralExpected = Readonly<{
    representation: string;
    value: number;
    type: "integer" | "number";
    sign: "+" | "-" | null;
    start: number;
    end: number;
}>;

export type NumberLiteralCase = Readonly<{
    id: string;
    source: string;
    offset: number;
    expected: NumberLiteralExpected | null;
}>;

export type NumberStartPrefixFixture = Readonly<{
    id: string;
    arm: "digit" | "plus-digit" | "minus-digit" | "dot-digit" | "plus-dot-digit" | "minus-dot-digit";
    source: string;
    offset: number;
    representation: string;
}>;

export type CompositionFixture = Readonly<{
    id: string;
    kind: "number" | "integer" | "percentage" | "dimension";
    source: string;
    prefix: string;
    suffix: string;
    accepts: boolean;
    representation?: string;
    type?: "integer" | "number";
    unit?: string;
}>;

export type HostileFixture = Readonly<{
    id: string;
    construction: "digits" | "fraction" | "exponent" | "incomplete-exponent";
    count: number;
}>;

export type PublicFixtureFile = Readonly<{
    feature_id: "SYNTAX-CONSUME-NUMBER";
    generation: 3;
    number_start_prefix_evidence: readonly NumberStartPrefixFixture[];
    prefix_cases: readonly NumberLiteralCase[];
    composition_cases: readonly CompositionFixture[];
    hostile_cases: readonly HostileFixture[];
}>;
