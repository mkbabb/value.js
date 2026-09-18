import type { Parser } from "@mkbabb/parse-that/core";

export type NumberStartParser = Parser<boolean>;
export type DiagnosticsMode = "disabled" | "enabled";

export type DiagnosticProfileId =
    | "default-present-undefined"
    | "absent-before"
    | "undefined-before-multi"
    | "empty-at"
    | "multi-at"
    | "multi-beyond"
    | "multi-source-end";

export type PredecessorValue =
    | null
    | boolean
    | number
    | string
    | readonly unknown[]
    | Readonly<{ readonly caseId: string; readonly mode: DiagnosticsMode }>;

export type NumberStartCase = Readonly<{
    id: string;
    source: string;
    offset: number;
    starts: boolean;
    continuation: string;
    positionKind: "retained" | "eof";
}>;

export type SourcePrefix = Readonly<{
    id: string;
    text?: string;
    utf16?: readonly number[];
}>;

export type MappedPreprocessingCase = Readonly<{
    id: string;
    raw?: string;
    rawUtf16?: readonly number[];
    rawOffset: number;
    rawContinuation?: string;
    rawContinuationUtf16?: readonly number[];
    preprocessed: string;
    preprocessedOffset: number;
    preprocessedContinuation: string;
    starts: boolean;
}>;

export type NumberStartFixtures = Readonly<{
    feature_id: "SYNTAX-NUMBER-START";
    generation: 3;
    positive_matrix: Readonly<{
        numberPrefixes: readonly string[];
        digits: readonly string[];
        sourcePrefixes: readonly SourcePrefix[];
        tail: string;
    }>;
    negative_matrix: Readonly<{
        spellings: readonly string[];
        sourcePrefixes: readonly SourcePrefix[];
        tail: string;
    }>;
    mapped_preprocessing_cases: readonly MappedPreprocessingCase[];
    excluded_positions: readonly Readonly<{
        id: string;
        raw: string;
        rawOffset: number;
        reason: string;
    }>[];
    deterministic_hostile: readonly Readonly<{
        id: string;
        generator: string;
        utf8_bytes: number;
        sha256: string;
    }>[];
}>;

export type DiagnosticSummary = Readonly<{
    furthest: number;
    expectedPresence: "absent" | "undefined" | "array";
    expected: readonly string[] | undefined;
    suggestionCount: number;
    secondarySpanCount: number;
}>;

export type CompositionObservation = Readonly<{
    ok: boolean;
    value: boolean | null;
    diagnosticsMode: DiagnosticsMode;
    diagnosticProfile: DiagnosticProfileId;
    predecessorKind: string;
    candidateStart: number;
    finalOffset: number;
    diagnosticsBefore: DiagnosticSummary;
    diagnosticsAfter: DiagnosticSummary;
    issue: null
        | "threw"
        | "outer_error"
        | "non_boolean"
        | "wrong_offset"
        | "state_identity_changed"
        | "diagnostic_identity_or_value_changed"
        | "diagnostics_mode_changed"
        | "invalid_fixture";
}>;
