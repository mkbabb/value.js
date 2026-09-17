import type { Parser } from "@mkbabb/parse-that/core";

export type NumberStartParser = Parser<boolean>;

export type SeedMode = "empty" | "seeded";

export type PredecessorValue =
    | null
    | boolean
    | number
    | string
    | readonly unknown[]
    | Readonly<{ readonly caseId: string; readonly mode: SeedMode }>;

export type DiagnosticSnapshot = Readonly<{
    furthest: number;
    expected: readonly string[] | undefined;
    suggestions: readonly Readonly<{
        kind: "unclosed-delimiter" | "trailing-content";
        message: string;
        openOffset?: number;
    }>[];
    secondarySpans: readonly Readonly<{
        offset: number;
        label: string;
    }>[];
}>;

export type NumberStartCase = Readonly<{
    id: string;
    source?: string;
    sourceUtf16?: readonly number[];
    offset: number;
    starts: boolean;
    continuation?: string;
    continuationUtf16?: readonly number[];
}>;

export type CompositionObservation = Readonly<{
    ok: boolean;
    value: boolean | null;
    seedMode: SeedMode;
    predecessorKind: string;
    candidateStart: number;
    finalOffset: number;
    diagnosticsBefore: DiagnosticSnapshot;
    diagnosticsAfter: DiagnosticSnapshot;
    issue: null
        | "threw"
        | "outer_error"
        | "non_boolean"
        | "wrong_offset"
        | "diagnostic_pollution"
        | "invalid_fixture";
}>;
