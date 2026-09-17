# Skeptic 1 — semantic verdict

## ACCEPT

I assumed the subject, candidates, and evidence were false and found no material
semantic counterexample within the frozen `VALUE-PERCENTAGE-LITERAL` G0 scope.
This accepts prototype evidence for the direct literal production only. It does
not grant production integration or feature credit; the brief and subject both
retain `featureCredit: 0`.

### Seal and ownership reproduction

The supplied subject reproduced as SHA-256
`81498cb4afeb0fac70f83afe17342c88ac90fc7eed396b98a44a1c52400e4ca0`.
Every direct binding reproduced exactly:

- `BRIEF.md`: `842e0873ab5a3e9b3a5e64dbfda85db1ca860e8a60f1daec63dc2c7cbd68b193`
- `candidate-set.json`: `a73cdcd6f8dcf4f8002b3cf0d76105d762dc0b47893453a15cc748bf0c06f6e1`
- `evidence/correctness.json`: `bcda3c31143f0ed09d47ca8ff750af30c8b3a1fd1e69c8d109f03daf74e62579`
- `benchmark.mts`: `701a0848ba7416a0dcc259bfd82f152be2e130f4f11c9a6fb57995e484761e81`
- first benchmark evidence: `7b954f247eb7f7127b15f126c3681587c6efff925ca8cf009e7a7b449a0ddad3`
- second benchmark evidence: `30ff0f2dacdc4fc617d8cebb1ad6235ef1a1dbe8a6e0588d7d8a9dd37d758808`
- live peer: `40f8e379b8f3242b0f3c68efa7d52ebc3adf8d6dc7f8edc9231fa115e68d6b69`
- rejected peer: `36e7d92aae4e71b8682847584eabfd0b89f9dd952f52c5c1c62108c5a0c3480f`

The transitive candidate seals also reproduced: H
`82d426f494fed3e14cac1ddf7c20ca787b1f731fe11c7e48d422a0a1b8c4a02a`, B
`2b3ffe8e18d32d62c25de28ad4ef2d0246c23ab81440fcc83bf3faf5c4d445c2`, and S
`0657c2bb60a9200c5ffc26aef3d7a1049219657757797901bc4b4a435f14b654`.
All three import and compose the same accepted `consumeNumber` owner, whose
source reproduced as
`8c3ac689f2e24635216ac0499f23166996ac0136e0b6876e82a8da4f75eb95aa`;
none duplicates its regex or introduces a scanner/token/CST layer. The only
parse-that imports are from the published `@mkbabb/parse-that/core` subpath in
installed version `1.0.0`; the used functions and parser methods are public in
that package's declarations. Each runtime module exposes exactly the sole key
`percentageLiteral`.

### Semantic boundary

The boundary agrees with CSS Values 4: a literal percentage is a number
immediately followed by `%`, corresponding to a CSS Syntax percentage token.
CSS Syntax's numeric-token algorithm likewise creates a percentage token when
the code point following the consumed number is `%`. Therefore composing the
accepted number leaf directly with `string("%")` is the correct narrow owner;
rejecting spaces and comments between the two parts is required, while
property/keyframe ranges and EOF belong to parents. A prefix result for
`12%tail` at offset 3 is consequently intentional rather than over-acceptance.

H (`skip`), B (`all`), and S (lookahead then marker consumption) implement that
same boundary. No candidate trims trivia, imposes a `[0,100]` range, requires
EOF, or captures the remainder.

### Replayed and adversarial checks

I reran the bounded public evaluator separately for H, B, and S: all three
passed 5 successes and 6 failures, including exact result-key order, entry-zero
rollback, no throw, prefix offset, and stable parser identity. I then reran the
revealed holdout over all candidates: each passed 5 successes and 10 failures.
The strict apotheosis TypeScript check also passed.

The `-0%` reveal serialized the expectation as ordinary JSON `0`, which is an
oracle defect, not a license to erase sign. The sealed erratum and evaluator
repair it in the only meaningful binary64 way: structural comparison is made
with `0`, then `Object.is(actual, -0)` is required. All candidates satisfied
that check without candidate or reveal mutation. The same accepted numeric
owner also preserved negative zero for an independent underflow case,
`-1e-400%`.

The public and holdout suites do not directly exercise failure rollback from a
nonzero starting offset. I therefore ran an untimed bounded probe against all
three candidates. Per candidate it passed seven additional successes
(`.5%`, exponent/tail, doubled-percent and whitespace tails, subnormal,
overflow, and negative-underflow forms), eight failures beginning at offset 2
(`1.%`, incomplete exponents, malformed dots/signs, comment and newline
separation), and a nonzero-offset `12%tail` success ending at offset 5. Every
failure returned `isError === true`, did not throw, and restored offset 2.

The hidden set is modest but materially complementary to the public set: it
adds signed zero, signed fractional exponent syntax, leading zeros, large
magnitude, malformed starts/signs/exponents, and whitespace/comment barriers.
Its reveal hash
`689f68dd26ced87c895431a34b36b8fd3a33723736f904d2f84fc7430a1a9c76`
matches the preauthor receipt, and the independent nonzero-offset probe closes
the one important transactional omission. Given the candidates' seven-to-ten
line transparent implementations, this is adequate for this G0 prototype.

I inspected both bound benchmark records and structurally reproduced their row
counts and logged comparison means, but did not rerun timing. Timing is not a
basis for this semantic ACCEPT.
