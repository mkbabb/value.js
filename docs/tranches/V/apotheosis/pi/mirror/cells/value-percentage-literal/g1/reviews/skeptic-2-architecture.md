# VALUE-PERCENTAGE-LITERAL G1 — skeptic 2 architecture review

**Verdict: REJECT exact H3 integration.** H3 is a correct and compact fused
recognizer for the isolated result contract, and it is not a lexer. It does not,
however, preserve the accepted `consumeNumber` parser as the one normative
numeric operation. It instead makes `consumeNumber` and `percentageLiteral`
sibling regex terminals which separately execute numeric recognition, sharing
only exported regex text and a projector. That is textual/semantic reuse, not
the acknowledged BBNF/parser ownership relation
`percentage = number , percentageUnit`. The split is already observable in
parse-that state: H3 discards the numeric parser's furthest-progress boundary on
percentage failures. The frozen evidence does not test that public diagnostic
state or bind an exact production destination that removes the prior numeric
owner. Emit and isolated value shape are sound, but they do not close those
blocking integration defects.

## Exact-byte closure and bounded replay

The required subject reproduced at SHA-256
`580785f22eb20a9d6893ba9db16d29677b6bb2d6200c32f4f9c7b2f7d0628be9`.
Every artifact directly bound by it also reproduced:

| Artifact | Recomputed SHA-256 |
| --- | --- |
| `ROOT-DISPOSITION.md` | `2fa3b007ba9d5ed1973324c27f4a58bb45f3d09464148c5bcb1656d6c74826fe` |
| `candidates/h3/value-unit.ts` | `1d1c37d20a9ef97f13466e96fbd65175d7c387aebd877ef400c81951fda23dc3` |
| `correctness.json` | `fb632b374fac73883c6b4084e4cd956b90fd3cb014f2857ca479f3ba7c33303e` |
| `benchmark-v4.mts` | `723c3053d1076667d2a1a817f7a9e808fd184ef591dd224efbb33559ecc3450d` |
| `benchmark-v4-manifest.json` | `52f6e74b511a020847b03c3fb9ac7ee90cf1307fd21f30d1fcddd20a0a2f43db` |
| `benchmark-v4-first-attempt.json` | `67c5d229f00a15d2fab565ad14cb436a1de648973a7acc99dcceefae556f1ae4` |
| `bbnf-uplift-receipt.json` | `aad1e2377401292b2f564dee5fd97967a8ebd08bea8004397e4f23c9cae3e857` |
| G0 `skeptic-subject.json` | `81498cb4afeb0fac70f83afe17342c88ac90fc7eed396b98a44a1c52400e4ca0` |

No benchmark or other timing command was run. Bounded untimed replay produced:

- strict apotheosis TypeScript check: PASS;
- numeric differential: PASS, 1,468 sources / 2,936 transactions;
- public percentage evaluator: PASS, 5 successes / 6 failures;
- revealed holdout evaluator: PASS, 5 successes / 10 failures;
- isolated NodeNext compilation: PASS, emitting an ESM import from the
  published `@mkbabb/parse-that/core` subpath and no source-only relative
  specifier.

Thus this rejection is neither a semantic-fixture failure nor an emit failure.

## Numeric ownership and idiomatic parse-that composition

The accepted G0 boundary made `consumeNumber` the numeric owner and required a
percentage parent to compose it. H3 changes the meaning of "owner":

```text
consumeNumber      -> regex(CSS_NUMBER_SOURCE)     -> projectNumber
percentageLiteral  -> regex(CSS_NUMBER_SOURCE + %) -> slice -> projectNumber
```

There is one source string and one projection function, so the numeric spelling
and `{sign,type,value}` calculation are DRY. There are nevertheless two
independent regex parser objects and two independent numeric-recognition paths.
`percentageLiteral` never invokes `consumeNumber`; any parser-boundary behavior
added to the numeric owner—state hooks, diagnostic labels, span capture,
memoization flags, or a later corrected terminal—does not flow to percentage.
Exporting `CSS_NUMBER_SOURCE` and `projectNumber` makes those implementation
fragments a second API by which future productions can continue bypassing the
numeric parser. This weakens, rather than proves, one normative numeric owner.

The published parse-that idiom already expresses the rule directly:

```text
map -> skip -> consumeNumber(map -> regex) -> string("%")
```

H3 instead has `map -> regex`. Both `regex` and `map` are published,
module-initialized combinators, so H3 is legitimate parse-that code in the
narrow sense. The objection is architectural: fusion has crossed a normative
production boundary without preserving the boundary's full observable parser
semantics.

## BBNF DAG fit and CSS terminal identity

The module family is right. Number, percentage, units, and dimensions belong in
`value-unit`, and H3 introduces no reverse import or cycle. The exact
acknowledged BBNF bytes, however, define:

```text
percentageUnit = "%" -> 255u8 ;
percentage = number , percentageUnit ;
```

H3 has neither a `percentageUnit` production nor a percentage composition over
the `number` production. Calling the fused regex a CSS Syntax percentage
terminal is semantically defensible: it recognizes a number immediately
followed by `%`, returns no token object, and does not form a token stream,
scanner, CST, cursor, or raw remainder. Therefore **the two-regex design is not
a hidden lexer**. But language equivalence on the frozen examples is weaker
than the required handwritten combinator mirror and unique parser ownership.
The BBNF graph supplies the exact non-duplicative shape H3 bypasses.

This matters beyond aesthetics. In a bounded comparison against
`consumeNumber.skip(string("%"))`, success state and value agree, while failure
state does not:

| Input | H3 fused `furthest` | composed `furthest` |
| --- | ---: | ---: |
| `12x` | 0 | 2 |
| `1e+%` | 0 | 1 |
| `1.2.3%` | 0 | 3 |

Both restore `offset` to 0 as required, but `ParserState.furthest` is public and
feeds parse-that diagnostics. H3 reports only that the whole percentage regex
failed at entry; the BBNF-shaped production records that a number succeeded and
the percentage marker failed at the numeric boundary. The public/holdout
evaluators assert `isError` and restored `offset`, not `furthest`, expectations,
or a parent diagnostic. The numeric differential cannot cover this because it
tests only H3's separate `consumeNumber` export.

The different failed `state.value` is not itself a blocker: the frozen G0
contract explicitly makes that value non-authoritative while `isError` is true.
The diagnostic progress difference is the blocking unproved behavior.

## Module/API placement, emit, and result shape

The candidate filename matches the eventual BBNF family-level
`value-unit.ts`, while the active accepted numeric owner currently lives at
`value-unit/numeric.ts`. The frozen subject binds no integration patch or exact
destination. Copying H3 beside the accepted file leaves two numeric parser
owners; replacing the accepted file puts the percentage sibling in
`numeric.ts`; moving to the family-level target requires consumer rewiring and
retirement of the prior module. None of those distinct DAG/API changes is part
of the exact H3 bytes under review. A claim of exact integration cannot leave
that choice implicit.

Within its isolated module, the API and emitted syntax are valid. `CssNumber`
is exported as a type; the runtime exports are `CSS_NUMBER_SOURCE`,
`projectNumber`, `consumeNumber`, and `percentageLiteral`. NodeNext emission is
plain ESM and retains the published package-subpath import. There is no `.ts`
specifier defect.

The success value is also economical and correct: exactly `{kind,number}` with
numeric keys `{sign,type,value}`, including negative zero, and no sequencing
tuple. Raw spelling/extent is not required by this frozen literal contract and
is not used as a reason to reject H3.

## Source economy

H3 is 886 bytes, 24 physical lines, and 19 nonblank lines. For comparison, the
accepted numeric module is 560 bytes / 17 lines / 15 nonblank lines and the
emit-correct composed H2 percentage prototype is 283 bytes / 7 lines / 5
nonblank lines: 843 bytes and 24 physical lines together. H3 therefore does not
buy a source-size reduction over the already proved owner-plus-parent sources;
it is 43 bytes larger, though one nonblank line shorter. LOC is not independently
disqualifying, but it supplies no architectural reason to trade away the
composition boundary.

## Acceptance condition

Do not integrate exact H3. Keep one parser-level numeric owner and build the
percentage production from it plus a single `%` terminal, using an emitted-ESM
safe module placement. Bind the exact destination/consumer rewrite and add a
bounded failure-state/parent-diagnostic witness. That correction can reuse the
existing semantic cases; it does not require another timing run.
