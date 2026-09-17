export type NumberStartState = Readonly<{
    isError: boolean;
    value: unknown;
    offset: number;
    expected?: readonly string[];
}>;

export type NumberStartParser = Readonly<{
    parseState(source: string): NumberStartState;
}>;

export type NumberStartObservation =
    | Readonly<{
        ok: true;
        value: boolean;
        offset: 0;
        diagnostics: readonly [];
    }>
    | Readonly<{
        ok: false;
        value: null;
        offset: number;
        diagnostics: readonly ["parser_error" | "non_boolean" | "consumed_input"];
    }>;

export type NumberStartCase = Readonly<{
    id: string;
    source: string;
    starts: boolean;
}>;
