# VALUE-UNIT-KNOWN-DIMENSIONS G0 — skeptic 2 architecture review

## Verdict

**REJECT H, B, and S as exact candidates; nominate none.** All three pass the
sealed neutral fixture slate and use direct, module-initialized parse-that
combinators. None is nevertheless exact-promotable. Each boundary topology
misstates CSS valid-escape behavior outside the public fixtures. H additionally
imports a historical candidate rather than the accepted numeric owner, and its
relative import becomes unresolved at the production depth. S imports the
accepted owner through a `.ts` runtime specifier that passes only the
source-running/no-emit configuration and fails ordinary NodeNext source
checking. B has the best ownership, emit, source-economy, and BBNF shape, but
its assertion treats every backslash as identifier continuation, so it rejects
`1px\\\n` even though backslash-newline is not a valid escape and the complete
unit identifier is `px`.

These are defects in the exact frozen bytes, not requests to reinterpret the
fixture result. B is the strongest topology to repair in a later candidate; it
is not an exact nominee here.

## Exact-byte closure

The requested subject reproduced exactly:

`b2f89725927bbf910cdeca31393af38131031cb8cd1281c168b47f7b24aeef16`

Every direct subject binding also reproduced:

| Binding | Recomputed SHA-256 |
| --- | --- |
| `BRIEF.md` | `5ca2a681200b98961d5815bddd9213c5ac82da353e226ed6ca20c0fa6959d07c` |
| accepted `value-unit/numeric.ts` | `8c3ac689f2e24635216ac0499f23166996ac0136e0b6876e82a8da4f75eb95aa` |
| H `index.ts` | `3d3580394d991e7d269e0f8269accb9466eed4221a6f60cbaaecb9be032a438e` |
| B `index.ts` | `19bfcd4f5e94ac221d571c4eb72fa9f16c23f11cc95a23bceed74bb8798d3561` |
| S `index.ts` | `ea6668ee8814057dcdd307f1b5056aa9e0fa0293f5a3a1b26d904f7a8575b713` |
| fixture manifest | `fddbdbaba3b6437c85950a412d2cb11f525a12ce57e61e4495f199b524321c2a` |
| neutral evaluator | `ec98929fd3c1b26a4fcad998a258b7eba603b3d82199be021c00110d44fb7f15` |

H's imported historical H2 numeric source is byte-for-byte identical to the
accepted numeric owner and has the same SHA-256. That establishes semantic byte
identity, not ownership identity: it remains a dependency on a closed candidate
path, contrary to the clean-root rule that later features import accepted
owners.

## Untimed reproduction

No benchmark, timer, or timing worker was run.

- `evaluate-all.mts` passed exactly 1,131 success, 36 boundary-failure, and 36
  hostile transactions across 62 units and all three candidates.
- Each candidate's local evaluator passed.
- `tsc -p tsconfig.apotheosis.json --noEmit` and B's candidate-local strict
  TypeScript check passed.
- A strict standalone NodeNext check without
  `allowImportingTsExtensions` passed H and B and rejected S with TS5097 at its
  `.ts` numeric-owner import.
- Actual NodeNext emission of B succeeded. The emitted ESM retained the
  published `@mkbabb/parse-that/core` import and the relative
  `numeric.js` import.
- Focused ASCII-case probes accepted `1KHz` as `khz` and rejected Kelvin-sign,
  long-s, and full-width imitations in all seats.
- A source scan found no lexer, scanner, token/CST layer, manual cursor,
  `ParserState` construction, balanced helper, remainder capture, or per-call
  parser construction in any candidate.

The public pass is real but incomplete: the manifest covers a valid escaped
continuation (`1px\\78`) and ordinary identifier continuations, but not an
invalid escape or a backslash at EOF.

## Boundary counterexamples

The [CSS Syntax valid-escape algorithm](https://www.w3.org/TR/css-syntax-3/#check-if-two-code-points-are-a-valid-escape)
treats backslash followed by newline as invalid and otherwise returns true;
that includes backslash followed by EOF. The ident-sequence algorithm consumes
an ident code point or a valid escape. Consequently:

- `1px\\` must not be recognized as known `px`: the backslash-at-EOF is a
  valid escaped continuation of the dimension identifier.
- `1px\\\n` must recognize the known `px` prefix and leave the backslash and
  newline to the parent: the backslash-newline pair cannot continue the
  identifier.

An independent direct probe produced:

| Source | Required | H | B | S |
| --- | --- | --- | --- | --- |
| `1px\\` | failure at entry | **success through `px`** | failure | **success through `px`** |
| `1px\\` + LF | success through `px` | success | **failure at entry** | success |
| `1px\\x` | failure at entry | failure | failure | failure |

H's native lookahead and S's assertion both require a character after the
backslash before classifying it as continuation, so they wrongly declare EOF a
unit boundary. B's continuation class contains a bare backslash alternative,
so it wrongly blocks the newline case. CR and FF produce the same B mismatch
after CSS input preprocessing maps them to LF.

There is a second raw-input gap. [CSS input preprocessing](https://www.w3.org/TR/css-syntax-3/#input-preprocessing)
maps NUL and surrogate code points to U+FFFD, which is non-ASCII and therefore
continues an identifier. On direct raw `1px` + NUL probes, H and B succeeded as
known `px`; S correctly failed. If this leaf is intended to receive only an
already-filtered stream, that must be an exact upstream integration invariant;
no such active owner is bound here. The escape counterexamples do not depend on
that ambiguity.

The failure diagnostics also reveal the topology. On `1px\\x` and other
known-unit-plus-continuation failures, H reports `furthest = 1`, because its
unit and boundary live inside one native regex that fails as a whole. B and S
report `furthest = 3`, because the unit parser succeeds before the zero-width
assertion fails. H still satisfies the brief's minimal requirement to retain
some progress from the numeric owner, but its diagnostic is less informative
than the two-stage parse-that composition.

## Candidate architecture

### H — reject

H is the global-table topology: it builds one unit-to-family `Map`, sorts all
62 spellings longest-first into one regex, folds the spelling, then looks the
family up after `consumeNumber.then(unit)`. It is compact in parser count,
recognizes the exact inventory, performs only ASCII case folding in practice,
constructs once, and duplicates neither the numeric grammar nor the numeric
projection.

Its blocking ownership fault is the import
`../../../../syntax-consume-number/g15/optimization/h2/index.js`. The source
bytes happen to equal the accepted dependency today, but the module is not the
accepted owner under `apotheosis/grammar/css/l4/value-unit/numeric.ts`. If H is
copied unchanged to a leaf under the active `value-unit` directory, that
relative path resolves toward a nonexistent
`apotheosis/syntax-consume-number/...` location. Exact promotion therefore
breaks resolution. Rewriting the import would produce different bytes.

The single-regex boundary also accepts backslash-at-EOF and raw NUL, and it
collapses the BBNF unit-family productions into a data lookup. The collapse is
not a lexer and is not independently forbidden, but it provides poorer
diagnostic progress and weaker correspondence to the acknowledged
`lengthUnit | angleUnit | ...` family DAG. H is not promotable.

### B — reject, strongest repair basis

B is the hand-compressed family topology: six explicit family regexes feed
`any`, each is followed by a shared negative assertion, and the selected parser
returns `{family, unit}`. This most directly reflects the active BBNF ownership:
the accepted number owner is sequenced with one of the known unit families.
Longest alternatives and compact character classes cover exactly the 62-item
inventory without a second spelling table.

Its numeric import is the correct one. The `.js` specifier is NodeNext-safe,
resolves to the accepted `.ts` source while type-checking, survives as `.js` in
emitted ESM, and still resolves to the same accepted leaf if the exact file is
placed at the corresponding depth under active `value-unit`. Its 1,690 bytes
are also the smallest of the three candidates.

The boundary assertion is nevertheless not CSS-correct. The regex
`[-_a-z0-9\\\u0080-\u{10ffff}]` says every backslash continues an identifier.
That is false for backslash-newline. B therefore rejects an input where the
brief's complete known unit has already ended, violating prefix consumption.
It also accepts raw NUL as a boundary absent a guaranteed preprocessor. The
best architecture does not excuse incorrect exact bytes; B is rejected.

### S — reject

S is the generic per-family topology: each unit array is sorted longest-first
and compiled once by `unitFamily`, then the six family parsers feed `any`. It
preserves BBNF family ownership, uses the accepted numeric source, gives good
unit-end diagnostic progress, rejects raw NUL, and has no forbidden parsing
substrate. It is the largest candidate at 1,892 bytes because it combines
explicit tables, array copies/sorts, a helper, and per-family alternation.

S shares H's backslash-at-EOF defect: `\\[^\n\r\f]` requires a second source
character, despite EOF forming a valid escape after a backslash in the CSS
algorithm.

Its separate blocking integration fault is the runtime import ending in
`numeric.ts`. The active apotheosis check masks this because it explicitly
enables `allowImportingTsExtensions` together with no emit. Ordinary strict
NodeNext checking rejects it, and an exact emitted ESM module cannot retain a
`.ts` dependency for the package runtime. Changing it to `numeric.js` is a
source change, so S is not exact-promotable.

## Published API, parser construction, and forbidden substrates

The installed dependency is exactly `@mkbabb/parse-that@1.0.0`, and its
published `./core` export includes every facility used here: `regex`, `any`,
and `Parser`; the class declaration supplies `then`, `map`, `skip`, and `not`.
No candidate reaches into an unpublished path.

All parser construction occurs at module initialization. H builds the map,
regex, `then`, and `map` once. B builds the assertion, six family parsers,
`any`, and the final sequence once. S calls `unitFamily` six times during module
evaluation and constructs nothing from within a parse callback. Dynamic
`RegExp` construction in H and S is bounded to fixed trusted unit arrays; it is
not broad-source capture or a scanner.

The result mapping in every seat is exactly the requested four-key object and
reuses the accepted numeric object. None imposes contextual ranges, consumes a
parent delimiter, introduces token/CST state, or duplicates the number regex.
Those aspects need no cure.

## BBNF ownership and source economy

The acknowledged `value-unit.bbnf` owns number, six known unit families, and
their dimensions in the same family. All candidates are placed in the correct
family and sequence number before unit. B and S retain explicit family parser
boundaries; H encodes the same semantic inventory in one terminal plus a map.
None creates a reverse dependency or a second grammar family.

Source sizes are:

| Candidate | Bytes | Physical lines | Nonblank lines |
| --- | ---: | ---: | ---: |
| H | 1,719 | 48 | 42 |
| B | 1,690 | 60 | 52 |
| S | 1,892 | 52 | 45 |

B buys the smallest byte count and avoids runtime sorting. H buys one unit
parser at the cost of a 62-entry map and weaker diagnostic structure. S buys a
reusable family constructor but is largest and copies/sorts six arrays. All are
reasonable source scales; economy does not reverse any blocking result.

## Exact-promotion condition

Do not promote any current hash. A successor should import the accepted
`numeric.js` owner, preserve direct `consumeNumber.then(knownUnit)` composition,
and use one zero-width boundary rule that:

1. blocks ASCII identifier code points and preprocessed non-ASCII code points;
2. blocks a backslash followed by any non-newline code point **or EOF**; and
3. permits a backslash followed by newline so the known unit can end before it.

It should then bind an exact active destination and prove ordinary emitted ESM,
not only the source-running no-emit configuration. B's family topology is the
least structurally disruptive starting point, but the corrected source must be
reviewed under a new hash.
