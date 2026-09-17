# Direct CSS foundation vertical — corrected generation G1

G1 repairs the exact parser defects reproduced against the sealed G0
candidate set. It changes parser bytes, so G0 remains immutable evidence and
G1 receives fresh candidate, review, and synthesis identities.

The baseline contract is `../foundation-g0/BRIEF.md` at SHA-256
`c4b2a4996df7a5dd3df294422917c1bfed5004f2a0bcd5f05dc5ff4af8d93806`.
The baseline examples are `../foundation-g0/fixtures.json` at SHA-256
`6d76da0bedae64c38e57762683fe5df995a896958722705d45e8bd6c52eab204`.
Every baseline obligation remains binding except where this file explicitly
corrects it.

## Direct architecture

- Build ordinary module-singleton `@mkbabb/parse-that@1.0.0` parsers.
- Compose terminals and productions with parse-that combinators. Do not build
  a lexer, token tape, atom/CST layer, mutable cursor, source scanner, regex-
  source metagrammar, broad remainder capture, or parser-state wrapper.
- Import the accepted `consumeNumber` production; never copy its recognizer.
- Keep the G0 module tree and explicit public barrel. Internal helpers stay
  internal.
- Use `lazy` only for an actual recursive production. This vertical is
  acyclic and requires no `lazy` parser.
- Each author repairs only their own G0 lineage and receives no other G1
  candidate bytes or notes.

## Correct current identifier domain

The 10 June 2026 CSS Syntax Editor's Draft defines a non-ASCII ident code
point as exactly this inclusive union:

```text
U+00B7
U+00C0–00D6
U+00D8–00F6
U+00F8–037D
U+037F–1FFF
U+200C, U+200D, U+203F, U+2040
U+2070–218F
U+2C00–2FEF
U+3001–D7FF
U+F900–FDCF
U+FDF0–FFFD
U+10000–10FFFF
```

Raw U+0000 and lone surrogate code units are preprocessed to U+FFFD and are
therefore valid ident code points. Raw code points outside the union are not
identifier code points and must remain unconsumed. An escaped code point may
produce any scalar value allowed by the escape algorithm, including values
that are excluded when raw; do not revalidate a decoded escape against the raw
identifier union.

The practical JavaScript `u`-mode character class is:

```text
[\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C\u200D\u203F\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u{10000}-\u{10FFFF}]
```

## Escape and string corrections

- Preprocess raw input code points when their grammar arm consumes them.
  Never preprocess a value after escape decoding. In particular, the hex
  escapes `\\d ` and `\\c ` decode to CR and FF respectively; they do not
  become LF.
- A terminal escaped quote is content, not an automatically detected closing
  quote. `"\\22` at EOF decodes to one quote character. Closure decisions
  must come from the recognized grammar branch, not from inspecting the last
  decoded/raw character.
- Backslash followed by a preprocessed newline is not a valid escape.
  Escaped-newline string handling remains a distinct string production.

## Immutable results and state

- `classifyCssUnit()` returns a fresh ordinary object on every recognized
  call. Mutating one returned object must not affect another call or any later
  `cssDimension` result.
- Every successful parse returns fresh semantic result objects where the
  result shape is an object. Static tables may store immutable primitive
  metadata, never externally reachable result objects.
- Preserve useful `state.furthest` progress on malformed identifier, escape,
  string, percentage, and dimension input while rolling the authoritative
  input offset back on aggregate failure. `state.value` after aggregate
  failure remains non-authoritative under parse-that 1.0.0.
- Repeated, re-entrant, nonzero-offset, parent-composed, and hostile calls must
  be deterministic and no-throw.

## G1 evidence

`fixtures.json` adds boundary points, decoded-control escapes, escaped terminal
quotes, result-mutation probes, and dimension delimiter behavior. It is
additive to every G0 example. A candidate must pass both fixture sets, strict
TypeScript, a Chromium CSSOM witness for all known units, and a candidate-
neutral hostile/differential evaluator before review.

Normative authority:

- <https://drafts.csswg.org/css-syntax/>, Editor's Draft 10 June 2026,
  definitions and algorithms in §§3.3, 4.2, and 4.3.7–4.3.13.
- <https://drafts.csswg.org/css-values-4/>.

