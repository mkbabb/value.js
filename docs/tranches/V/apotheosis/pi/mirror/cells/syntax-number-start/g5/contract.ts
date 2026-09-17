import type {
    DiagnosticProfileId,
    DiagnosticSummary,
    DiagnosticsMode,
} from "../g4/contract.js";

export type {
    CompositionObservation,
    DiagnosticProfileId,
    DiagnosticSummary,
    DiagnosticsMode,
    EndpointFixtures,
    MappedPreprocessingCase,
    NumberStartCase,
    NumberStartFixtures,
    NumberStartParser,
    SourcePrefix,
} from "../g4/contract.js";

export type Generation5PredecessorValue =
    | undefined
    | null
    | boolean
    | number
    | string
    | readonly unknown[]
    | Readonly<{ readonly caseId: string; readonly mode: DiagnosticsMode }>;

export type DefaultPredecessorObservation = Readonly<{
    lane: "raw-child-default-undefined" | "ordinary-parent-default-undefined";
    ok: boolean;
    value: boolean | null;
    diagnosticsMode: DiagnosticsMode;
    diagnosticProfile: DiagnosticProfileId;
    candidateOffset: number;
    finalOffset: number;
    diagnosticsBefore: DiagnosticSummary;
    diagnosticsAfter: DiagnosticSummary;
    issue: null
        | "invalid_fixture"
        | "threw"
        | "returned_different_state"
        | "source_property_or_value_changed"
        | "parser_error"
        | "non_boolean"
        | "wrong_offset"
        | "diagnostic_identity_or_value_changed"
        | "diagnostics_mode_changed";
}>;
