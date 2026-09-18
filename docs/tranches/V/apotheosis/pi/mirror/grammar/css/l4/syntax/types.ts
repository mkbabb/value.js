export type SourceSpan = Readonly<{ start: number; end: number }>;

export type CssTrivia = Readonly<{
    kind: "whitespace" | "comment";
    raw: string;
    span: SourceSpan;
    terminated: boolean;
}>;

export type CssTokenKind =
    | "ident"
    | "function"
    | "at-keyword"
    | "hash"
    | "string"
    | "bad-string"
    | "url"
    | "bad-url"
    | "number"
    | "percentage"
    | "dimension"
    | "comma"
    | "colon"
    | "semicolon"
    | "open-paren"
    | "close-paren"
    | "open-square"
    | "close-square"
    | "open-curly"
    | "close-curly"
    | "cdo"
    | "cdc"
    | "delim";

export type CssToken = Readonly<{
    kind: CssTokenKind;
    raw: string;
    span: SourceSpan;
    value?: string | number;
    unit?: string;
    numberType?: "integer" | "number";
    id?: boolean;
    terminated?: boolean;
}>; 

export type CssFunction = Readonly<{
    kind: "function-block";
    name: string;
    head: CssToken;
    value: readonly CssComponentValue[];
    close: CssToken | null;
    span: SourceSpan;
}>;

export type CssSimpleBlock = Readonly<{
    kind: "simple-block";
    associated: "(" | "[" | "{";
    open: CssToken;
    value: readonly CssComponentValue[];
    close: CssToken | null;
    span: SourceSpan;
}>;

export type CssComponentValue = CssTrivia | CssToken | CssFunction | CssSimpleBlock;

export type CssSyntaxIssue = Readonly<{
    kind:
        | "unexpected-close"
        | "unclosed-block"
        | "bad-string"
        | "bad-url"
        | "unterminated-string"
        | "unterminated-url"
        | "unterminated-comment";
    span: SourceSpan;
    expected: readonly string[];
    actual: string | null;
    openOffset?: number;
}>;

export type CssComponentDocument = Readonly<{
    value: readonly CssComponentValue[];
    issues: readonly CssSyntaxIssue[];
    span: SourceSpan;
}>;

export type PreprocessedCss = Readonly<{
    source: string;
    offsets: readonly number[];
}>;
