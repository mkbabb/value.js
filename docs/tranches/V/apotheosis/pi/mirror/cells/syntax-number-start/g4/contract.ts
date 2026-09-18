import type {
    DiagnosticProfileId,
    DiagnosticSummary,
    DiagnosticsMode,
    NumberStartCase,
} from "../g3/contract.js";

export type {
    CompositionObservation,
    DiagnosticProfileId,
    DiagnosticSummary,
    DiagnosticsMode,
    MappedPreprocessingCase,
    NumberStartCase,
    NumberStartFixtures,
    NumberStartParser,
    PredecessorValue,
    SourcePrefix,
} from "../g3/contract.js";

export type EndpointFixtures = Readonly<{
    feature_id: "SYNTAX-NUMBER-START";
    generation: 4;
    endpoint_cases: readonly NumberStartCase[];
}>;

export type RawChildObservation = Readonly<{
    lane: "raw-child";
    ok: boolean;
    value: boolean | null;
    diagnosticsMode: DiagnosticsMode;
    diagnosticProfile: DiagnosticProfileId;
    predecessorKind: string;
    candidateOffset: number;
    finalOffset: number;
    diagnosticsBefore: DiagnosticSummary;
    diagnosticsAfter: DiagnosticSummary;
    issue: null
        | "threw"
        | "returned_different_state"
        | "source_property_or_value_changed"
        | "parser_error"
        | "non_boolean"
        | "consumed_input"
        | "diagnostic_identity_or_value_changed"
        | "diagnostics_mode_changed";
}>;
