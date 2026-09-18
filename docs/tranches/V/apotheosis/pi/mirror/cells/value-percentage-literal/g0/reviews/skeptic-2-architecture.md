# VALUE-PERCENTAGE-LITERAL G0 — skeptic 2 architecture review

**Verdict: ACCEPT seat B only.** The exact subject is internally closed, the
literal-percentage boundary is properly below tokenization, and all three
candidates satisfy the bounded semantic contract. B is the only frozen source
that combines an idiomatic direct parse-that production with the repository's
emitted-ESM module convention. H is the leanest execution graph, but its `.ts`
owner import fails an ordinary NodeNext emit-capable check. S has the same
module defect and is strictly dominated by doing a zero-width `%` check and
then consuming the same `%` again. Promotion should preserve B's exact source;
no lexer, scanner, token, CST, cursor, raw-remainder, or per-call parser design
is justified by this acceptance.

## Exact-byte closure

The required subject reproduced at SHA-256
`81498cb4afeb0fac70f83afe17342c88ac90fc7eed396b98a44a1c52400e4ca0`.
Every direct or transitive content address used by the subject, candidate set,
correctness receipt, and benchmark harness also reproduced:

| Artifact | Recomputed SHA-256 |
| --- | --- |
| `BRIEF.md` | `842e0873ab5a3e9b3a5e64dbfda85db1ca860e8a60f1daec63dc2c7cbd68b193` |
| `candidate-set.json` | `a73cdcd6f8dcf4f8002b3cf0d76105d762dc0b47893453a15cc748bf0c06f6e1` |
| `evidence/correctness.json` | `bcda3c31143f0ed09d47ca8ff750af30c8b3a1fd1e69c8d109f03daf74e62579` |
| `benchmark.mts` | `701a0848ba7416a0dcc259bfd82f152be2e130f4f11c9a6fb57995e484761e81` |
| `evidence/benchmark-first-attempt.json` | `7b954f247eb7f7127b15f126c3681587c6efff925ca8cf009e7a7b449a0ddad3` |
| `evidence/benchmark-second-attempt.json` | `30ff0f2dacdc4fc617d8cebb1ad6235ef1a1dbe8a6e0588d7d8a9dd37d758808` |
| `public-cases.json` | `35304fbed79db3827e1b83631f7e5ea8ecfca883dbc7dff4aaec726f692549b0` |
| `evaluate.mts` | `e9326867cb1ae4f3f3fa71189a3955be307b1c54744c93a6529e95df2dfd0b02` |
| `holdout-receipt.json` | `0e71b964306f8533b09f25f2704d80fdbcad4efeaa676d2e0673a9e0e2198f1c` |
| `holdout-reveal.json` | `689f68dd26ced87c895431a34b36b8fd3a33723736f904d2f84fc7430a1a9c76` |
| `holdout-evaluate.mts` | `c7bf56e43ec0c6c1c561f04fd02b3637ccb5037ed0934ea4a301fecba9b2ef66` |
| `holdout-erratum.json` | `caaf4b8127d4d242eebe8a13a60d389af77a208053800e9cd676b634c0e95af6` |
| accepted `numeric.ts` | `8c3ac689f2e24635216ac0499f23166996ac0136e0b6876e82a8da4f75eb95aa` |
| candidate H | `82d426f494fed3e14cac1ddf7c20ca787b1f731fe11c7e48d422a0a1b8c4a02a` |
| candidate B | `2b3ffe8e18d32d62c25de28ad4ef2d0246c23ab81440fcc83bf3faf5c4d445c2` |
| candidate S | `0657c2bb60a9200c5ffc26aef3d7a1049219657757797901bc4b4a435f14b654` |
| live peer `src/css/grammar.ts` | `40f8e379b8f3242b0f3c68efa7d52ebc3adf8d6dc7f8edc9231fa115e68d6b69` |
| rejected peer `grammar/value.ts` | `36e7d92aae4e71b8682847584eabfd0b89f9dd952f52c5c1c62108c5a0c3480f` |

The candidate hashes still match the frozen set, so
`candidateMutationAfterFreeze: false` is reproducible. The revealed holdout
hash matches both its preauthor receipt and correctness receipt. The `-0%`
erratum changes neither reveal nor candidate bytes and the evaluator separately
checks `Object.is(value, -0)`; it is an oracle-serialization correction, not a
candidate repair.

## Bounded semantic and state checks

I reran no timing. I did rerun the public evaluator for H/B/S and the revealed
holdout evaluator for all three. Each candidate passed 5 public successes, 6
public failures, 5 holdout successes, and 10 holdout failures. The strict
`tsconfig.apotheosis.json` no-emit check also passed.

I additionally called each parser on an existing `ParserState` beginning at
offset 2. On `xx12x`, every parser returned the same state, failed, and restored
offset 2. On `xx12%tail`, every parser returned the same state, succeeded at
offset 5, and produced exactly the required two-key wrapper and three-key
numeric leaf. This closes the entry-offset rollback condition that the stock
fixtures exercise only from offset 0.

Runtime traversal of the published parser contexts reached the exact imported
`consumeNumber` singleton in every candidate and produced these distinct
graphs:

```text
H: map -> skip -> map -> regex -> string
B: map -> all  -> map -> regex -> string
S: map -> then -> lookAhead -> map -> regex -> string
```

Thus numeric recognition and numeric object construction have one owner. The
candidate sources contain no `regex` and do not reproduce the owner's numeric
expression. A case-insensitive bounded scan for lexer/scanner/token/CST/cursor,
`Parser`/`ParserState`, `chain`, regex/RegExp, source/offset, slicing, matching,
or execution primitives returned zero hits. Inspection of all 24 physical
candidate lines confirms that parser construction occurs only at module
initialization; no callback constructs a parser per call.

## Candidate disposition

### H — reject exact source

H is the most natural expression of this grammar: consume a number, skip the
required marker, and map the retained number. Parse-that 1.0.0's published
`skip` implementation saves the entry offset, invokes both raw parser
functions, restores the entry offset if either fails, and retains the first
value without forming a tuple. The accepted numeric owner's own test already
uses `consumeNumber.skip(string("%"))`, so the idiom is locally established.

It is also the smallest runtime allocation shape: after the shared
`ParserState`, regex substring, and numeric object costs, a successful call
adds only the required percentage wrapper. It forms no sequencing array.
Construction creates three candidate-local parser objects (`string`, `skip`,
`map`). Source size is 283 bytes, 7 physical lines, and 5 nonblank SLOC.

The blocker is exact-source DAG fit. H imports the TypeScript source with a
`.ts` suffix. The special no-emit apotheosis config permits that suffix via
`allowImportingTsExtensions`; an isolated strict NodeNext, emit-capable-shaped
check rejects H with TS5097. The active mirror overwhelmingly uses `.js`
relative specifiers, and the accepted owner's own test imports `numeric.js`.
Changing H's suffix would change its frozen hash. H therefore does not survive
unchanged even though its combinator topology is otherwise preferable.

### B — accept

B uses only published `all`, `string`, and `map`, imports the unique numeric
owner using the correct `.js` emitted-ESM specifier, and exports one stable
parser. Its isolated strict NodeNext check exits 0. The dependency direction is
one-way from the literal production to its already accepted numeric leaf; it
adds no tokenization layer or reverse edge.

Parse-that 1.0.0 fuses arity-two `all` into one unrolled sequencing closure.
It restores the saved entry offset on either failure and creates no nested
tuples. It does allocate one two-slot result array on every call, before the
first child runs, and the final map replaces that array with the required
percentage object on success. This is one avoidable intermediate allocation
relative to H, but it is bounded and transparent. Construction creates three
candidate-local parser objects (`string`, `all`, `map`). Source size is 287
bytes, 7 physical lines, and 5 nonblank SLOC.

The recorded candidate-to-candidate timing evidence is consistent with, rather
than required for, this decision. Independent arithmetic over the stored rows
(20 replicates, four blocks each) gives B/H geometric ratios of 0.9252 with
one-sided upper bound 0.9634 on attempt one and 0.9404/0.9800 on attempt two;
B/S is 0.9317/0.9703 and 0.9432/0.9831 respectively. No clock was rerun. The
live and rejected peer lanes expose materially broader result construction and
whole-parser work, so their ratios confer no feature or architectural credit.

### S — reject

S is a genuinely different guarded graph, so the three seat labels are not
byte-identical aliases. It is not a competitive production graph. Its
`lookAhead(marker)` consumes the number, runs `%` zero-width, and retains the
number; `.then(marker)` immediately runs the identical marker again and forms
an intermediate `[number, "%"]` tuple before the final map discards the second
member. Compared with H it adds one parser object, a second marker dispatch,
and a success tuple; compared with B it adds the duplicate marker dispatch and
more source. It is 332 bytes, 10 physical lines, and 7 nonblank SLOC, with four
candidate-local parser objects (`string`, `lookAhead`, `then`, `map`). It also
uses the same `.ts` owner specifier as H and fails the isolated NodeNext check
with TS5097. No semantic protection obtained from the lookahead is absent from
the rollback already supplied by `skip` and fused `all`.

## Promotion boundary

ACCEPT means exactly: select B as the direct literal `<percentage>` production
prototype and retain `featureCredit: 0` until the separate production
integration process grants it. It does not accept the live peer's duplicated
number regex, the rejected peer's preprocessing/token/CST stack, contextual
percentage bounds, whole-input parsing, or any scanner/token layer. H may
inform a future optimization only through a newly hashed `.js`-specifier
candidate; S should not advance.
