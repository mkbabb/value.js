# VALUE-PERCENTAGE-LITERAL G1 — skeptic 1 semantic review

## ACCEPT

I assumed H3, its evidence, and the root disposition were wrong. I found no
blocking semantic defect in the exact frozen H3 integration. This verdict is
limited to H3 and its bound evidence; it does not grant feature credit beyond
the G1 process.

### Exact-byte closure

The subject reproduced as SHA-256
`580785f22eb20a9d6893ba9db16d29677b6bb2d6200c32f4f9c7b2f7d0628be9`.
Every direct subject binding reproduced exactly:

| binding | SHA-256 |
| --- | --- |
| root disposition | `2fa3b007ba9d5ed1973324c27f4a58bb45f3d09464148c5bcb1656d6c74826fe` |
| H3 candidate | `1d1c37d20a9ef97f13466e96fbd65175d7c387aebd877ef400c81951fda23dc3` |
| correctness | `fb632b374fac73883c6b4084e4cd956b90fd3cb014f2857ca479f3ba7c33303e` |
| v4 harness | `723c3053d1076667d2a1a817f7a9e808fd184ef591dd224efbb33559ecc3450d` |
| v4 manifest | `52f6e74b511a020847b03c3fb9ac7ee90cf1307fd21f30d1fcddd20a0a2f43db` |
| v4 first attempt | `67c5d229f00a15d2fab565ad14cb436a1de648973a7acc99dcceefae556f1ae4` |
| BBNF receipt | `aad1e2377401292b2f564dee5fd97967a8ebd08bea8004397e4f23c9cae3e857` |
| G0 subject | `81498cb4afeb0fac70f83afe17342c88ac90fc7eed396b98a44a1c52400e4ca0` |

All five bound G0 review hashes and both terminal-failure hashes also
reproduced. The correctness transitive bindings reproduced: accepted numeric
owner `8c3ac689f2e24635216ac0499f23166996ac0136e0b6876e82a8da4f75eb95aa`,
differential evaluator
`49d393cdfe4c9b3fb8ee3dce5093ee7e1921fefaf69f91ebbef9832c06cb445a`,
and inherited public evaluator
`bbeeee5e7333a0105fe85c91624fc2be4c34500447bfe9dfce9de5a426b784b7`.
The v4 manifest's 11 file bindings and three tree ledgers validated without
running its benchmark.

### Semantic findings

H3 has one exported `CSS_NUMBER_SOURCE` and one `projectNumber`. Both
`consumeNumber` and `percentageLiteral` derive recognition from that source,
and both numeric projections call that projector. The percentage production
therefore cannot drift from the accepted numeric leaf through a second numeric
grammar or mapper. The direct percentage regex also avoids an intermediate
sequence tuple while retaining transactional prefix parsing.

The source matches CSS Syntax's number representation: optional sign, integer
or leading-dot fraction with required fractional digits, and an optional
complete exponent. Appending the immediate ASCII `%` gives the percentage-token
boundary. It correctly rejects whitespace/comments before `%`, incomplete
exponents, trailing decimal points, malformed signs, full-width digits, and a
full-width percent sign. It correctly consumes only the first token in
`12%tail` and `12%%`; EOF remains a parent decision.

Projection preserves exponent-derived `type: "number"`, explicit sign, binary64
rounding, overflow to signed infinity, underflow, and negative zero. Valid
spellings cannot project to `NaN`. These are the same semantics as the sealed
accepted numeric owner, including its intentional nonfinite results; finiteness
policy belongs to consuming value grammars.

The G0 raw-spelling rejection is not a semantic blocker. Exponent-spelled
percentages are valid CSS percentages, so rejecting them is not a terminal
requirement. Where a parent genuinely needs spelling or extent, parse-that's
`mapState` exposes the same source plus the pre/post offsets: a bounded witness
captured `1e2%` and span `{start: 2, end: 6}` around H3 without another numeric
recognizer, cursor, token object, or change to the leaf result.

### Bounded untimed reproduction

No timing command or benchmark worker was run.

- The sealed numeric differential passed 2,936 transactions.
- The inherited numeric evaluator passed 77 generated successes, 11 repaired
  success cases, 336 failure runs, 10 parent cases (five repeated-fraction),
  and 10 hostile cases.
- The percentage public and holdout evaluators passed 5/6 and 5/10
  success/failure cases respectively; strict TypeScript passed.
- An independent comparison with the repository CSS Syntax percentage-token
  parser passed 14,760 transactions over 7,380 short sources at offsets zero
  and two.
- Focused probes passed for complete/incomplete exponents, token tails,
  nonzero-offset rollback, `Infinity`, `-Infinity`, positive underflow,
  negative-underflow `-0`, literal `-0`, and projector/leaf parity.

The exact H3 bytes are semantically fit for the stated percentage-literal and
numeric-owner integration.
