# Direct CSS foundation vertical — prototype brief

Build one coherent, directly composable `@mkbabb/parse-that@1.0.0` grammar
vertical. This is prototype work under `mirror/`; it is not production code.

## Architecture

- Use ordinary parse-that parsers and combinators. No lexer, token objects,
  CST, mutable cursor, source slicing, balanced scanner, or manual loop over
  `ParserState.src`.
- Keep the BBNF-family ownership: grammar leaves under `tokens/`, numeric
  value productions under `value-unit/`.
- Import the accepted `consumeNumber` production from
  `mirror/apotheosis/grammar/css/l4/value-unit/numeric.ts`; never reproduce its
  numeric recognizer.
- Parser results are semantic leaves. Source extent is observed from the
  parse-that state offset, not embedded in token-shaped result objects.
- Parsers are module singletons. Do not construct a parser per parse.

## Required modules and exports

Each candidate owns the same tree beneath its seat directory:

```text
tokens/code-point.ts   cssEscape, cssNameCodePoint
tokens/trivia.ts       cssWhitespace, cssComment, cssTrivia
tokens/identifier.ts   cssIdentifier
tokens/string.ts       cssString
value-unit/percentage.ts  cssPercentage
value-unit/dimension.ts   cssDimension, classifyCssUnit
index.ts               exports all of the above
```

Required semantic shapes:

```ts
type CssNumber = { sign: "+" | "-" | null; type: "integer" | "number"; value: number };
type CssPercentage = { kind: "percentage"; number: CssNumber };
type CssUnitFamily = "length" | "angle" | "time" | "frequency" | "resolution" | "flex" | null;
type CssDimension = { kind: "dimension"; number: CssNumber; unit: string; family: CssUnitFamily };
type KnownCssUnit = { unit: string; family: Exclude<CssUnitFamily, null> };
```

`cssEscape` includes and consumes its leading backslash and returns one decoded
Unicode scalar string. `cssNameCodePoint` consumes one decoded ident/name code
point, including an escape. `cssIdentifier` returns the decoded identifier.
`cssWhitespace`, `cssComment`, and `cssTrivia` return strings; exact spelling is
not a result contract. `cssString` returns the decoded string value without
quotes. `cssPercentage` and `cssDimension` use the shapes above.
`classifyCssUnit(unit: string): KnownCssUnit | null` returns a canonical
lowercase recognized unit and its family, or `null`. A recognized dimension
uses that canonical unit; an unknown dimension preserves its decoded spelling
and has `family: null`.

## CSS Syntax boundary

Implement the 10 June 2026 CSS Syntax Editor's Draft directly:

- Preprocessing semantics are recognized in place so original source offsets
  remain parse-that offsets: CRLF/CR/FF behave as LF; NUL and lone surrogates
  decode to U+FFFD. Do not create a second preprocessed source buffer.
- A valid escape is backslash followed by anything except a newline; backslash
  at EOF is valid and decodes to U+FFFD. Raw CRLF, CR, LF, and FF after a
  backslash are invalid escapes.
- Hex escapes consume one through six hex digits plus at most one following
  CSS whitespace code point (raw CRLF counts as one) and replace zero,
  surrogate, or out-of-range values with U+FFFD.
- Identifiers obey the exact three-code-point start rule and consume the
  maximal name: ASCII letter/underscore/non-ASCII or valid escape; leading
  hyphen only in the permitted `--`, `-<ident-start>`, or `-<escape>` forms;
  continuation additionally permits ASCII digits and hyphens.
- `cssComment` consumes `/* ... */` or through EOF when unterminated.
- `cssString` supports both quotes, decoded escapes, escaped newlines, and EOF
  auto-close. An unescaped newline is a failure and remains unconsumed.
- `cssDimension` is `consumeNumber` followed by one complete decoded CSS
  identifier. It accepts unknown units with `family: null`; do not approximate
  identifier completion with a suffix guard.
- `classifyCssUnit` is ASCII-case-insensitive and canonicalizes recognized
  units to lower case. It covers 62 current units: 49 length, 4 angle, 2 time,
  2 frequency, 4 resolution (`dpi`, `dpcm`, `dppx`, `x`), and `fr`.
- `cssPercentage` is exactly accepted number followed immediately by `%`.

## Proof obligations

- Strict TypeScript and focused Vitest tests.
- Public examples and adversarial cases at offset zero and nonzero offsets.
- Transactional input-offset rollback, delimiter preservation, parser
  singleton stability, no-throw on large inputs, and parent composition.
  Under parse-that 1.0.0, an aggregate failure's `state.value` may retain a
  partial value and is non-authoritative; do not add a custom state wrapper to
  restore it. Preserve and test useful `furthest` progress instead.
- Explicit cases for terminal backslash, backslash plus every newline form,
  NUL, lone surrogates, astral code points, hex escapes, escaped unit spelling,
  EOF comments/strings, and incomplete numeric exponents.
- No benchmark until all candidates agree semantically on a common corpus.

Normative sources:

- <https://drafts.csswg.org/css-syntax/>
- <https://drafts.csswg.org/css-values-4/>
- <https://drafts.csswg.org/css-conditional-5/>

The current BBNF files are structural comparison evidence, not semantic
authority. In particular, their simple identifier regex is known incomplete.
