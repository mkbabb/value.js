# V·π repaired first vertical — independent adversarial audit A2

status: `REJECT`

date: 2026-07-22

model_served: inherited Codex route; the service-side backend alias and effort
label were not exposed to this seat, so this receipt claims neither Opus nor
Fable

This was a fresh, assume-faulty pass over the repaired CSS source/token/CST
foundation, value and color projections, public wrappers, and tests. I read
the two prior first-vertical audits but did not share findings with the other
fresh audit seat. I edited no implementation, test, production, authority,
coordination, inbox, or script file. This report is my only write.

Audited SHA-256s:

- `syntax/atom.ts` — `bb14193dd8465a53558ffcf95e5ba128395d987c494a2b822767652f9d8636e8`
- `syntax/component-value.ts` — `07cd147af7f07fe0833410cde0d98b6706decdc9985773085b5b03a8e13bec6a`
- `syntax/source.ts` — `0c0d11442d1c837a11a82a6304d01abacc75b50232d6f3c82f8b773333c0ad81`
- `syntax/tokens.ts` — `107dbb9151dd99959571221b0b93d20347524de27d22501d5d9666d60305faed`
- `syntax/types.ts` — `69e38e1effe7e070f70fff23c5af5388b8f5b906c802bddd89014d3513a12441`
- `values/project.ts` — `595405121a6019c2bf044a96cffe352e52bb6b57649593a90640e4a04580ecee`
- `color/project.ts` — `43ff352a4997633b37099899448c6cc02c05e7ac47f57b38db7c0c5ef2689b65`
- `grammar/value.ts` — `22a60c8fa8af0c17db2ba59c137f9aa19a4ab158378be1275414855fedd10c44`
- `grammar/color.ts` — `1430ee51d05903c028afc0a4f6398fee1e12a9821c3fcf9a909663d72740de84`

## Verdict

**REJECT.** The architectural reset is genuine. Valid input now flows through
one source-normalization layer, token parsers, a typed/spanned component-value
CST, and pure value/color projections. There is no feature-local balanced
scanner, top-level splitter, or whole-remainder parser. The sole stateful
character loop is `urlAtom`, at the CSS tokenizer boundary where CSS Syntax
itself requires state. That is a legitimate tokenizer state machine, not a
return to the regex-era feature parser.

The repaired vertical nevertheless has five exact blockers:

1. the exported composable grammars bypass preprocessing and therefore parse a
   different language from the public doors;
2. the token layer still mis-tokenizes lexical number flags, strings, URLs,
   escaped `url`, and tokenization parse errors;
3. Color 4 still rejects valid no-whitespace alpha and escaped hex forms;
4. `xyz-d50` missing channels are silently zero-filled, losing the very
   missingness that the governing R23 disposition says Phase A cannot carry;
   and
5. parse errors and the depth limit collapse to offset-zero generic failures,
   while the tests omit or bless these defects.

No performance claim should attach to rejected bytes. The structure is now
worth repairing rather than replacing.

## 1. Total-tranche / gestalt analysis

The module direction is now fit for the greater tranche:

```text
source normalization -> CSS tokens -> component CST -> family projection
```

`component-value.ts` retains functions, simple blocks, children, trivia, raw
spelling, and spans. `values/project.ts` and `color/project.ts` inspect typed
nodes rather than scanning source. The public frozen `CssValue` projection can
remain lossy without corrupting the internal spine. The 1,056 implementation
lines across source/token/CST/value/color and wrappers are not obviously a god
module; the 359-line color projection is the largest owner and is still
family-local.

The remaining gestalt defect is that normalization is outside the exported
parse-that grammar. `parseCssValue()` preprocesses, but `cssValueGrammar` does
not. A downstream grammar composing the advertised parser receives literal
CR, form-feed, NUL, and unpaired-surrogate tokens, while a public-door caller
receives normalized CSS. This dual dialect will spread into every PB family if
it is accepted as the common foundation. Either the grammar contract must
explicitly and type-safely require a preprocessed source, or the source stage
must be integrated once into the composable parser boundary. Family-specific
normalization is not an acceptable repair.

The strict CST also does not yet model CSS Syntax recovery. Its close tokens
are mandatory and all unmatched closing tokens are excluded from block
children. CSS Syntax automatically closes open strings/functions/blocks at
EOF and records defined parse errors; a lossless foundation should be able to
represent that recovered structure and its errors even if a stricter public
value door ultimately rejects it. This is one shared recovery concern, not a
reason to add family scanners.

## 2. Vertical / wave analysis

Mechanical gates are green:

```text
npm test -- --run
13 files passed; 77 tests passed; 3 TODO

npm run check
GREEN
```

Fresh hostile evidence is materially improved:

- a deterministic 20,000-input sweep through both component grammars, both
  typed grammars, and both public doors produced zero throws;
- 1,000,000-character comment, URL, and string inputs did not throw;
- 400,000 characters of flat tokens parsed without throwing;
- depth 128 succeeds, while 129, 1,000, and 10,000 reject without throwing.

That closes the old incidental `RangeError` class. It does not close limit
diagnostics: the 129-deep failure reports the same offset-zero generic syntax
failure as a mismatched closer.

The test suite is not a complete wave ledger. It has no fixture for lexical
number type, escaped `url`, EOF URL/string classification, URL DEL handling,
public EOF-comment diagnostics, raw-parser preprocessing parity, escaped hex
color, optional alpha without whitespace, or useful closer/limit spans. It
also lacks the R19 45-source, R20–R22 22-source, R23 8-source, R24, R25, R26
61-source, named-color digest, complete W1 replay, and bounded-canonicalization
evidence required by `ADDENDA-04`. A compact architectural vertical need not
duplicate ceremonial prose, but it must execute the normative denominators it
claims to discharge.

## 3. Feature analyses

### 3.1 Source and composable grammar — REJECT

The public normalization/mapping loop is small and correctly handles CRLF,
form-feed, NUL, and unpaired surrogates for the tested door path. The exported
grammars do not use it. Exact reproduced divergence:

```text
source                    cssValueGrammar result       parseCssValue result
"a\r\nb"                   ["a", "\r", "b"]             ["a", "b"]
"a\fb"                     ["a", "\f", "b"]             ["a", "b"]
"\0"                       keyword U+0000             keyword U+FFFD

"r\\65\r\nd"              cssColorGrammar invalid     parseCssColor = red
```

Both parser exports are documented as composable CST-backed grammars, not as
"processed-source only" internals. They cannot earn the first common grammar
boundary while their semantics differ from the door they are meant to power.

### 3.2 Token foundation — REJECT

The exponent-backtracking defect found during this audit was repaired before
the sealed hash above: `1e0`, `1e+3`, `1e+3%`, and `1e2px` now remain single
numeric tokens of the correct broad kind. Four normative token defects remain:

1. `numberType` is derived with `Number.isInteger(value)`. CSS derives the
   type from spelling: a fraction or exponent sets it to `number`. Therefore
   `1.0`, `1e0`, `1e+3`, and `1e2px` all wrongly report `integer`.
2. `url(foo` and `url(foo   ` become `bad-url`. CSS returns a URL token at EOF
   and records a parse error. U+007F inside an unquoted URL is also accepted,
   although DEL is non-printable and starts a bad URL.
3. escaped spelling `u\\72l(foo)` becomes a generic function block. CSS first
   decodes the ident sequence to `url` and then runs the URL-token algorithm.
4. an EOF-terminated quoted string becomes `bad-string`; CSS returns a string
   token plus a parse error. Successful string-token `value` fields also retain
   escapes and escaped newline continuations rather than the decoded value.

The same missing parse-error channel affects comments. The CST usefully marks
`foo/*` as `terminated:false`, but `parseCssValue("foo/*")` silently succeeds
as `foo`. CSS Syntax requires an EOF-comment parse error. A conformance parser
may abort instead of recovering, but it may not erase the error.

These are failures of the shared token owner. `urlAtom` is the correct place
for the necessary bounded state machine; fixing it there is not contrived
scanning. The normative references are CSS Syntax's
[numeric-token algorithm](https://www.w3.org/TR/css-syntax-3/#consume-a-numeric-token),
[ident-like/URL algorithms](https://www.w3.org/TR/css-syntax-3/#consume-an-ident-like-token),
[string algorithm](https://www.w3.org/TR/css-syntax-3/#consume-a-string-token),
and [comment algorithm](https://www.w3.org/TR/css-syntax-3/#consume-comments).

### 3.3 Component CST and value projection — structural ACCEPT, diagnostic REJECT

For valid input, functions and all three simple-block forms retain nested
typed children and source spans. Arbitrary `!`, at-keyword, hash, semicolon,
URL, and empty-function content is represented at the shared layer. The value
projection's loops split typed nodes, not raw strings. This directly answers
the earlier architecture rejection.

Failures still lose location. For example:

```text
parseCssValue("fn(a]")
  -> css_syntax, start 0, end 1, actual "f"

parseCssValue(129 nested functions)
  -> css_syntax, start 0, end 1, actual "f"
```

Neither result identifies the offending closer or the declared depth limit.
`many()` rollback plus the wrapper's use of final `state.offset` discards the
furthest useful location. The deterministic cap is good hardening; presenting
it as an unrelated one-character syntax error is not ParseIssue fidelity.

### 3.4 Color projection — REJECT

The repair correctly separates legacy RGB/HSL from modern forms, clamps direct
RGB and alpha, normalizes hue, clamps the authorized saturation/lightness/
chroma fields, removes the raw `from` regex, and uses decoded first-position
tokens for relative-color classification. Those are substantive closures.

Three exact blockers remain:

```text
source                              required                  current
rgb(1 2 3/.5)                       accept, alpha .5           css_syntax
#\\31 23                            accept decoded #123        css_syntax
#\\66 00                            accept decoded #f00        css_syntax
```

`bodyParts()` unnecessarily requires trivia after `/`; Color 4 requires a
solidus separator, not whitespace around it. Chromium 148.0.7778.96 confirms
all of `rgb(1 2 3/.5)` and `rgb(1 2 3/50%)` as supported. Hex projection tests
`token.raw` rather than the decoded hash-token value, so valid escaped hex
digits are lost. Chromium confirms `#\\31 23` and `#\\66 00` as colors.

The D50 missing-channel behavior is also not an acceptable Phase-A result:

```text
parseCssColor("color(xyz-d50 none 1 1)")
  -> xyz [0.04016078825180605, 1.0310368392732214,
          1.309858276943225]
```

Color 4 accepts the spelling, but the frozen carrier cannot retain both D50
provenance and missingness. `ADDENDA-04` R23 therefore requires the exact
Phase-A `expected:["concrete xyz-d50"]` compatibility rejection until PB5 has
a lossless carrier. Substituting zero and chromatically adapting produces a
usable resolved color while falsely presenting it as the parser-preserved
value. The current W2 test blesses this loss instead of exercising the exact
eight-row R23 bank.

`display-p3-linear` remains the correctly named R24 representation hold, and
nested `var()`/`env()` classification remains the named R25 PB1/PB4 hold. They
must remain visible RED evidence, not disappear behind the small happy-path
matrix. Color 4 authority is the pinned 17 July 2026
[CSS Color 4 CRD](https://www.w3.org/TR/css-color-4/).

### 3.5 KISS, LOC, and performance — provisional ACCEPT / no bench credit

The implementation now has the right economy boundary: one tokenizer owner,
one CST, and pure family projections. The imperative source loop and URL loop
are both domain-required lexical work. There is no evidence of a second
feature scanner. Repeating the long token-choice list across `cssToken`,
`nonStructuralToken`, and `topLevelValueToken` is a modest maintainability and
trial-count risk, but not a rejection by itself.

There is still no first-vertical benchmark evidence, allocation profile, or
grammar×engine matrix. Timing rejected semantics would not clear G-3; this
audit assigns no regression or win.

## 4. Fresh close conditions

1. Unify preprocessing with the composable grammar contract and prove raw
   grammar/public-door parity for CRLF, form-feed, NUL, surrogates, and escapes.
2. Correct lexical number type, URL/escaped-URL/DEL, string decoding/EOF, and
   propagate tokenization parse errors through the CST and public diagnostics.
3. Accept no-whitespace modern alpha and decoded escaped hex colors.
4. Restore the exact R23 Phase-A compatibility rejection; do not zero-fill
   missing D50 channels before the lossless PB carrier exists.
5. Preserve furthest/limit locations and add exact `MAX`/`MAX+1`, mismatched
   closer, and EOF recovery diagnostics.
6. Execute the applicable persistent spec banks and full W1 replay, then run
   two fresh independent audits against immutable bytes.

Nothing in this report authorizes production execution, dependency or public
surface changes, benchmark claims, Phase-B fan-out, or BBNF uplift adoption.
