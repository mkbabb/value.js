import type { Parser } from "@mkbabb/parse-that/core";

export type DiagnosticSuggestion = Readonly<{
    kind: "unclosed-delimiter" | "trailing-content";
    message: string;
    openOffset?: number;
}>;

export type DiagnosticSecondarySpan = Readonly<{
    offset: number;
    label: string;
}>;

export type NumberStartParser = Parser<boolean>;

export type DiagnosticSnapshot = Readonly<{
    furthest: number;
    expected: readonly string[] | undefined;
    suggestions: readonly DiagnosticSuggestion[];
    secondarySpans: readonly DiagnosticSecondarySpan[];
}>;

export type NumberStartObservation = Readonly<{
    ok: boolean;
    value: boolean | null;
    startOffset: number;
    endOffset: number;
    diagnosticsBefore: DiagnosticSnapshot;
    diagnosticsAfter: DiagnosticSnapshot;
    issue: null | "threw" | "parser_error" | "non_boolean" | "consumed_input" | "diagnostic_pollution";
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
