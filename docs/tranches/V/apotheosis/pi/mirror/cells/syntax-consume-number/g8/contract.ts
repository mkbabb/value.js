import type { Parser } from "@mkbabb/parse-that/core";

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

export type HostileConstruction = "digits" | "fraction" | "exponent" | "incomplete-exponent";

export type RetainedPublicFixtureFile = Readonly<{
    feature_id: "SYNTAX-CONSUME-NUMBER";
    generation: 5;
    number_start_prefix_evidence: readonly NumberStartPrefixFixture[];
    prefix_cases: readonly NumberLiteralCase[];
    composition_cases: readonly CompositionFixture[];
    hostile_cases: readonly Readonly<{ id: string; construction: HostileConstruction; count: number }>[];
}>;

export type G8Controls = Readonly<{
    feature_id: "SYNTAX-CONSUME-NUMBER";
    generation: 8;
    failure_case_ids: readonly string[];
    predecessor_profiles: readonly ["undefined", "null", "false", "zero", "empty-string", "array", "object"];
    diagnostics: Readonly<{
        modes: readonly ["disabled", "enabled"];
        profiles: readonly ["ordinary", "preseeded-ahead"];
        preseed_ahead_delta: number;
    }>;
    work_limit: Readonly<{
        constructions: readonly HostileConstruction[];
        exact_source_sizes_utf16_code_units: readonly number[];
        warmups: number;
        samples: number;
        median_pair_ratio_ceiling: number;
        global_eightfold_ratio_ceiling: number;
        timing_floor_ms: number;
        per_invocation_timeout_ms: number;
    }>;
}>;

export type WorkLimitReceipt = Readonly<{
    invocations: number;
    exact_lengths_checked: number;
    semantic_completions: number;
    timeout_checks: number;
    max_median_pair_ratio: number;
    max_eightfold_ratio: number;
    max_case_ms: number;
    stack: "O(1)-FINITE-STATIC-DIRECT-COMBINATOR-GRAPH";
}>;
