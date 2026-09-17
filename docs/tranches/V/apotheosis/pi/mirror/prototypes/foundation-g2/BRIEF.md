# Direct CSS Syntax foundation G2 — author brief

## Scope

Author four independently adjudicable grammar features in one physical
candidate tree. Each feature is a direct `@mkbabb/parse-that@1.0.0`
combinator production and receives a separate later verdict:

1. `SYNTAX-ESCAPE`
2. `SYNTAX-IDENT`
3. `SYNTAX-STRING`
4. `SYNTAX-SPACING` (whitespace and comments)

Do not implement percentage, dimension, unit classification, numeric parsing,
URL, component values, blocks, or stylesheet parsing in this candidate.

## Architecture law

- No lexer, token stream, token-object algebra, atom, CST, mutable cursor,
  manual source loop, balanced scanner, generic remainder capture, or
  per-parse parser construction.
- Build parsers once at module initialization using parse-that primitives and
  ordinary composition.
- A direct production may return the semantic information required by its own
  CSS Syntax algorithm, including that algorithm's recovery disposition. That
  is not authority for a general token runtime.
- Every exported parser must consume at least one code unit on success. There
  is no exported nullable trivia parser; parents choose `.many()` or `.opt()`
  explicitly in sequencing positions.
- Source extent remains the caller's `ParserState` entry/exit offsets. Do not
  embed raw source or spans in the semantic leaf.
- All source imports must be emit-safe `.js` specifiers. No import from a
  historical candidate or rejected mirror tree is allowed.

## Normative pin

CSS Syntax Module Level 3, Editor's Draft 10 June 2026:

- preprocessing §3.3;
- consume comments §4.3.2;
- consume string token §4.3.5;
- consume escaped code point §4.3.7;
- valid escape §4.3.8;
- starts/consume ident sequence §§4.3.9 and 4.3.12;
- exact non-ASCII ident ranges in §4.2.

## Exact results

```ts
export type CssEscape = {
    value: string;
    error: null | "unexpected-eof";
};

export type CssIdentifier = {
    value: string;
    error: null | "unexpected-eof";
};

export type CssString = {
    value: string;
    quote: "\"" | "'";
    error: null | "unexpected-eof" | "newline";
};

export type CssComment = {
    error: null | "unexpected-eof";
};

export type CssSpacing = {
    errors: readonly "unexpected-eof-comment"[];
};
```

`cssEscape`, `cssIdentifier`, `cssString`, `cssWhitespace`, `cssComment`, and
`cssSpacing` are the only required runtime exports. `cssWhitespace` returns the
preprocessed consumed whitespace string and consumes one or more whitespace
code points. `cssSpacing` consumes one or more whitespace/comment productions
and reports each unterminated comment in source order. Comments otherwise have
no semantic value.

## Required semantics

- Preprocess raw CR, FF, CRLF, NUL, and lone surrogates as CSS Syntax requires.
- Implement the exact June-2026 non-ASCII ident union, including raw U+FEFF.
- Raw excluded non-ASCII values are not ident/name code points; escaped values
  are allowed.
- A backslash-newline pair is never a valid escape. Backslash followed by EOF
  is a valid escape that returns U+FFFD and `unexpected-eof`.
- Hex escapes consume 1–6 digits and one optional CSS whitespace sequence.
- Identifiers implement the exact three-code-point start law and maximal name
  consumption. Propagate `unexpected-eof` from an EOF escape.
- Strings return `newline` without consuming the unescaped newline; EOF returns
  `unexpected-eof`; backslash-EOF appends nothing and ultimately returns the
  same single EOF error; escaped newline is removed.
- Comments consume through the first `*/` or EOF. EOF is successful recovery
  with `unexpected-eof`.
- All failures are transactional and preserve useful furthest progress.
- Hostile string inputs must not throw or hang; million-code-unit inputs must
  remain linear in consumed work.

## Candidate independence

- H: literal compositional grammar; favor legibility and maximal terminals.
- B: compact algebraic grammar; favor `any`, `minus`, sequencing, and shared
  projections without source-regex metaprogramming.
- S: first-character dispatch where it materially helps; remain fully static
  and do not build parsers during a parse.

Authors may read this brief, the published parse-that package, and the pinned
CSS specification. Do not read another G2 candidate directory.
