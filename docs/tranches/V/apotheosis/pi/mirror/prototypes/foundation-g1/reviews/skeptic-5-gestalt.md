# Skeptic 5 — tranche gestalt, parsimony, and downstream suitability

## Verdict

**FEATURE REJECT; conditional candidate preference: B.**

The three candidates are genuinely small direct parse-that implementations, and
all three satisfy the frozen G1 candidate contract. None is a lexer, token tape,
component-value runtime, source scanner, or parser-state wrapper. That is real
candidate-level evidence, not feature acceptance.

The feature boundary is nevertheless unsuitable for promotion. `foundation-g1`
bundles several independently queued Syntax/Values operations into one acceptance
unit, freezes an incomplete generic dimension/classification result while the
`value-unit` family is explicitly RED, and returns too little observation to be
a stable common substrate for stylesheet recovery and source fidelity. Selecting
B would choose the least objectionable implementation of the wrong-sized public
contract; it would not cure those feature blockers.

No full-parser, integration, production, or feature credit is awarded.

## Binding and replay verification

I reviewed `SUBJECT.json` at the requested SHA-256
`687ac4941ab73f79fdf7abd21d997262a1c66ca15c51d04e2505d9c895631764`.
I did not read any other skeptic review.

The bindings are intact:

| object | verified SHA-256 / result |
|---|---|
| `AUTHOR-SUBJECT-v2.json` | `9d5974c2d5fdfddc9345dcfc8ea933510963396d3adcfcea85b081406991d315` |
| accepted `value-unit/numeric.ts` | `8c3ac689f2e24635216ac0499f23166996ac0136e0b6876e82a8da4f75eb95aa` |
| H ledger | `d4a6967ab1e7f0ed3eb6282321e15441617d4a65397a455b666a48014ea65518`; every listed file verifies |
| B ledger | `6409e4220883e6f7d94609a0f651598a378c6bc9d590f0700b27273534e5bb74`; every listed file verifies |
| S ledger | `04481b417ed1bf5f0ea642df489eb13ca2ac1839ee2d5cbf4620a6b78b41b179`; every listed file verifies |
| mirror `package.json` / lock | `b15f2948615b3ab979fdd1c356d5cbdaee3639115e07930d4041ccc77b3cd3af` / `489c5981ffa75d795cd3fae0e6d5a837b272ffec1633d862dba9c11a59e668b7` |
| installed parse-that package / ESM core | `f53ca9b85c43e65c1f3f8a21414f990211d8d0e6a7f07df805557cdb6b50f4ff` / `d577cc3e19b3a7e138ad433670ebdf4857776744c3375ae174391e2f68e642f5` |

The declared non-test TypeScript counts also reproduce exactly: H 221, B 188,
S 223. I reran `evaluate.mts` against each bound candidate. Each reported PASS
with 205 success transactions, 88 failure transactions, 62 units, and 180,000
hostile calls. This confirms candidate conformance only.

## Blocking findings

### G5-1 — the vertical violates the tranche's atomic formation boundary

`FEATURE-LEDGER.md` requires the next pilot to be the smallest independently
closable foundation row and enumerates separate rows for source mapping, trivia,
escape, identifier, percentage literal, percentage math, and later consumers.
The G1 barrel instead attempts to accept, in one unit:

- escape and name-code-point recognition;
- whitespace, comments, and nullable trivia;
- identifier recognition;
- quoted strings (not even identified as a separate row in the shown
  dependency-first queue);
- percentage literals;
- generic dimensions; and
- a 62-unit semantic classifier.

These operations do not share one stable observation contract. Trivia/comment
recovery, EOF strings, identifiers, percentage literals, and Values unit
classification have different consumers and different failure/source needs.
Passing one cross-product fixture bank does not make them one feature. This is
the same tranche-level category error the ledger says the rejected keyframe G0
made: an apparently coherent vertical has replaced independently auditable
operations.

**Required disposition:** split feature acceptance by ledger operation. Reuse
candidate source as prototype evidence if desired, but do not promote this
omnibus `foundation-g1` feature.

### G5-2 — `CssNumber` and generic unit semantics have no correct owner

All candidates import the accepted `consumeNumber`, whose `CssNumber` type is
private, then redeclare and export `CssNumber` from `value-unit/percentage.ts`.
`dimension.ts` imports its number type from the percentage module. Thus the
public type dependency says “dimension depends on percentage” even though both
depend on the accepted numeric production. This is a concrete ownership defect,
not cosmetic file layout.

The larger problem is `classifyCssUnit`. CSS Syntax's dimension result is a
number plus an ident-sequence unit. The candidates additionally classify every
dimension through a closed 62-entry Values inventory and put
`family: length | angle | time | frequency | resolution | flex | null` on the
generic leaf. Yet `FEATURE-LEDGER.md` explicitly marks `value-unit` RED because
unit/spec closure and context contracts are incomplete. The prototype therefore
freezes exactly the part the tranche says is unsettled.

This common helper is likely to become a semantic choke point. A consumer that
needs `<length>`, `<angle>`, typed arithmetic, contextual percentage hints, or a
future/experimental unit needs an exact production and context contract, not a
generic dimension followed by a family switch. Unknown units are accepted while
known units are ASCII-lowercased, so the supposedly generic result also applies
lossy, inventory-dependent normalization unevenly.

**Required disposition:** the accepted numeric production (or a neutral
`value-unit` types module) must own `CssNumber`. Keep Syntax dimension spelling
separate from exact Values unit productions/classification, and settle the unit
inventory/context row before exposing a common classifier.

### G5-3 — the result contract cannot support stylesheet error/source duties

The parser leaves deliberately return decoded semantic values without raw
spelling, span, or diagnostic outcome. That is adequate for a narrow value
recognizer, but not yet a stable foundation for the tranche's eventual
stylesheet root.

Two required-success cases demonstrate the information loss:

- an unterminated comment consumes through EOF and succeeds;
- an unterminated string consumes through EOF and succeeds.

CSS Syntax treats both as parse errors even though it returns recovered token
material. The candidates expose no success-with-diagnostic distinction. Once a
parent has only the returned string, it cannot distinguish a clean close from
EOF recovery without separately inspecting source boundaries/spelling. The
ledger already says source mapping, original UTF-16 offsets, raw spelling, and
diagnostic observation remain open; the brief simultaneously forbids embedding
extent and source-shaped results. Therefore this result contract has not proved
that stylesheet recovery can consume it without a parallel source/diagnostic
mechanism or re-recognition.

This does not prove that semantic leaves are wrong. It proves they cannot be
called the shared stylesheet foundation before the separate source-map and
recovery observations are formed and composed with them.

### G5-4 — the exported nullable trivia parser is a common-helper trap

`cssTrivia` is zero-or-more and therefore always succeeds. It is exported from
the omnibus public barrel beside consuming terminals. A concrete parent probe
against every candidate:

```ts
any(cssTrivia, string("x")).parseState("x")
```

returns success at offset 0 with `""`; the `x` branch is unreachable. This is
normal behavior for a nullable parser, but it makes `cssTrivia` unsafe as an
ordinary common alternative and particularly dangerous in future recursive
component/function grammars. It should be narrowly named/owned as an optional
spacing combinator and used only in explicit sequencing positions, rather than
presented as a peer “token” export.

The public `classifyCssUnit` helper has a second, smaller sharp edge: all three
candidates throw `TypeError` for hostile runtime values such as `null`. That is
within its static `string` signature, so it is not a candidate-contract failure,
but it reinforces that this helper has not earned a broad runtime/public
boundary.

## BBNF family and lexical-runtime assessment

The physical family split is mostly correct: code-point/trivia/identifier/string
productions live under `tokens/`, while percentage and dimension live under
`value-unit/`. Candidate results are bounded semantic leaves; there is no
`CssToken` union, token tape, component-value aggregate, mutable cursor, generic
token root, or scanner. The object shapes on percentage/dimension do not by
themselves create a lexical runtime.

That architectural success does not validate the feature grouping. BBNF-family
names are ownership namespaces, not a reason to accept every low-level operation
in those namespaces as one feature. Nor does the `tokens` namespace authorize a
large generic helper barrel. The number type ownership and unit classification
described above remain cross-row defects inside an otherwise correct physical
split.

## Downstream fit

### `func-body`

The identifier, string, trivia, percentage, and dimension leaves are useful
ingredients. An escaped function name composes correctly; for example
`cssIdentifier.skip(string("("))` decodes `r\\67 b(` to `rgb` in all three
candidates. But this package does not settle success-with-error strings,
URL/bad-URL behavior, arbitrary blocks, delimiters, substitution, or recursive
component recovery. The nullable trivia export is hazardous in exactly those
recursive alternatives. Verdict: **useful prerequisites, not a proven
func-body foundation**.

### `color`

Decoded identifiers and numeric leaves can support named colors, function heads,
percent channels, and angle dimensions. Color should import exact percentage,
number, and angle productions, however; it should not depend on the generic
62-unit classifier or repeatedly filter `family`. Verdict: **sufficient evidence
for later direct composition, no color/integration credit**.

### `selectors`

Direct composition can form an ID selector without a hash-token runtime:
`string("#").next(cssIdentifier)` accepts `#foo` and `#\\31 23`, while rejecting
`#123`, as required for an ID-type hash spelling. That is encouraging. Full
selectors still need exact delimiters, functional recursion, namespaces,
forgiving-list behavior, and source/diagnostic contracts. Verdict: **no lexical
runtime is required, but this vertical is far too narrow to establish selector
fitness**.

### `stylesheet`

The leaves cannot yet carry normative EOF parse errors, recovery provenance,
unknown/vendor preservation, or original-source positions. Stylesheet support
would either add the still-unformed source/diagnostic layer, inspect source around
these parsers, or duplicate recognition. Until the first option is explicitly
formed and demonstrated, promotion would pre-commit the shared boundary.
Verdict: **blocked**.

## Percentage versus dimension integration

Do **not** replace these two parsers with a generic numeric-token dispatcher.
That would move toward the lexical runtime this tranche correctly rejects, and
typed direct grammars benefit from importing the exact expected production.

They should share neutral number type ownership and remain in the same
`value-unit` family, but their feature gates should remain separate. Percentage
literal is already an atomic ledger row and can close without settling the full
unit inventory. Dimension/unit classification cannot. Thus:

- integrate shared types and module-family placement;
- keep `cssPercentage` and `cssDimension` as separate exported grammar leaves;
- do not make dimension depend on percentage for `CssNumber`;
- do not bundle percentage acceptance with the unsettled 62-unit classifier.

## Candidate selection, conditional on feature repair

If an adjudicator nevertheless needs a candidate preference for retained
prototype code, select **B**, narrowly:

1. It is the smallest implementation (188 non-test TypeScript lines versus H
   221 and S 223).
2. Its private helpers are better contained. H exports `cssNewline`,
   `decodePreprocessedCodePoint`, and `cssNameStartCodePoint` from internal
   modules; S exports `cssNameStartCodePoint`; B exposes only the required
   code-point leaves from that module.
3. Its use of set difference for ident-start is concise and idiomatic, and the
   common replay plus Unicode-domain evidence removes the main semantic concern
   with that compression.
4. S's dispatch table and multiple unit sets add machinery without demonstrated
   tranche-level benefit; H is clear but materially larger and leaks more helper
   exports.

This is a **candidate selection preference**, not an ACCEPT vote. B inherits
every feature-level blocker because all three candidates implement the same
frozen contract.

## Close condition

Re-form the work as atomic ledger rows; establish neutral numeric type ownership;
separate generic dimension spelling from closed Values classification; explicitly
compose source-map/parse-error observation with recovered comments and strings;
and restrict nullable trivia to an unmistakable spacing boundary. After those
decisions, candidate code may be resubmitted for the relevant row. The current
G1 vertical must not be promoted as the common foundation.
