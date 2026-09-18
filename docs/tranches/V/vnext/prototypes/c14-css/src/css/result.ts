import type { Parser, ParserState } from "@mkbabb/parse-that";

export interface CssDiagnostic {
  readonly code: "CSS_PARSE" | "CSS_TRAILING" | "CSS_EXCEPTION";
  readonly message: string;
  readonly offset: number;
  readonly line: number;
  readonly column: number;
  readonly expected: readonly string[];
  readonly found: string;
}

export type CssParseResult<T> =
  | { readonly ok: true; readonly value: T; readonly diagnostics: readonly [] }
  | { readonly ok: false; readonly diagnostics: readonly CssDiagnostic[] };

function diagnostic<T>(state: ParserState<T>): CssDiagnostic {
  const offset = Math.max(state.furthest, state.offset);
  const { line, column } = state.getLineAndColumn(offset);
  return {
    code: state.isError ? "CSS_PARSE" : "CSS_TRAILING",
    message: state.isError ? "Input does not match the CSS grammar." : "Trailing input remains.",
    offset,
    line,
    column,
    expected: state.expected ?? [],
    found: state.src.slice(offset, offset + 16),
  };
}

export function parseComplete<T>(parser: Parser<T>, source: string): CssParseResult<T> {
  try {
    const state = parser.parseState(source);
    if (state.isError || state.offset !== source.length) {
      return { ok: false, diagnostics: [diagnostic(state)] };
    }
    return { ok: true, value: state.value, diagnostics: [] };
  } catch (error) {
    return {
      ok: false,
      diagnostics: [
        {
          code: "CSS_EXCEPTION",
          message: error instanceof Error ? error.message : "Unknown parser exception.",
          offset: 0,
          line: 1,
          column: 0,
          expected: [],
          found: source.slice(0, 16),
        },
      ],
    };
  }
}
