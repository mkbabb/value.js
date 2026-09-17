# VALUE-PERCENTAGE-LITERAL G0 skeptic 3 — parser-state review

## Verdict

**ACCEPT.** I found no reproducible parser-state, no-throw, suffix-boundary,
result-shape, repeat/reentrancy, or downstream-composition defect in H, B, or
S. This accepts the exact frozen feature subject for its stated prototype
semantics only. It does not grant benchmark, integration, production, or
feature credit; the subject itself correctly records `featureCredit: 0`.

Frozen subject SHA-256:
`81498cb4afeb0fac70f83afe17342c88ac90fc7eed396b98a44a1c52400e4ca0`.
I did not run or rerun a timing path and did not edit any candidate, evidence,
authority, peer, or production file.

## Binding audit

Every direct subject binding reproduced from the current bytes:

| artifact | SHA-256 |
|---|---|
| `BRIEF.md` | `842e0873ab5a3e9b3a5e64dbfda85db1ca860e8a60f1daec63dc2c7cbd68b193` |
| `candidate-set.json` | `a73cdcd6f8dcf4f8002b3cf0d76105d762dc0b47893453a15cc748bf0c06f6e1` |
| `evidence/correctness.json` | `bcda3c31143f0ed09d47ca8ff750af30c8b3a1fd1e69c8d109f03daf74e62579` |
| `benchmark.mts` | `701a0848ba7416a0dcc259bfd82f152be2e130f4f11c9a6fb57995e484761e81` |
| `evidence/benchmark-first-attempt.json` | `7b954f247eb7f7127b15f126c3681587c6efff925ca8cf009e7a7b449a0ddad3` |
| `evidence/benchmark-second-attempt.json` | `30ff0f2dacdc4fc617d8cebb1ad6235ef1a1dbe8a6e0588d7d8a9dd37d758808` |
| live peer `src/css/grammar.ts` | `40f8e379b8f3242b0f3c68efa7d52ebc3adf8d6dc7f8edc9231fa115e68d6b69` |
| rejected peer `grammar/value.ts` | `36e7d92aae4e71b8682847584eabfd0b89f9dd952f52c5c1c62108c5a0c3480f` |

The transitive correctness closure also matches: numeric owner
`8c3ac689f2e24635216ac0499f23166996ac0136e0b6876e82a8da4f75eb95aa`;
H `82d426f494fed3e14cac1ddf7c20ca787b1f731fe11c7e48d422a0a1b8c4a02a`;
B `2b3ffe8e18d32d62c25de28ad4ef2d0246c23ab81440fcc83bf3faf5c4d445c2`;
S `0657c2bb60a9200c5ffc26aef3d7a1049219657757797901bc4b4a435f14b654`;
public cases `35304fbed79db3827e1b83631f7e5ea8ecfca883dbc7dff4aaec726f692549b0`;
public evaluator `e9326867cb1ae4f3f3fa71189a3955be307b1c54744c93a6529e95df2dfd0b02`;
holdout receipt `0e71b964306f8533b09f25f2704d80fdbcad4efeaa676d2e0673a9e0e2198f1c`;
reveal `689f68dd26ced87c895431a34b36b8fd3a33723736f904d2f84fc7430a1a9c76`;
evaluator `c7bf56e43ec0c6c1c561f04fd02b3637ccb5037ed0934ea4a301fecba9b2ef66`;
and erratum `caaf4b8127d4d242eebe8a13a60d389af77a208053800e9cd676b634c0e95af6`.

The first benchmark attempt has eight comparison fields whereas the second
and current harness have the two additional reciprocal B comparisons. That
means the current harness is not a byte-for-byte replay recipe for every field
of the first result. This is not a semantic blocker here: no timing was rerun,
no performance claim is accepted, and the frozen feature grants zero credit.

## Independent bounded probes

The frozen public evaluator passed independently for H, B, and S. The frozen
holdout evaluator then passed all three candidates on 5 successes and 10
failures apiece, including signed zero. `tsc -p tsconfig.apotheosis.json
--noEmit` exited zero.

An independent imperative percentage oracle was compared against every
candidate at every valid offset of all 66,430 strings through length five over
`0 1 + - . e E % x`. The 1,170,831 candidate calls produced 29,412 matching
successes and 1,141,419 matching transactional failures, with no mismatch and
no throw. This checks offsets rather than merely reparsing slices at offset
zero.

Targeted state probes additionally established:

- Success at nonzero entry offsets consumes exactly through `%`; examples
  included wrapped `+12%`, `-.5%`, and `1.25e2%` spellings. `12%%`,
  `12%tail`, `12%/*x*/`, and astral suffixes stop immediately after the first
  `%`. Whitespace/comments before `%`, incomplete exponents, repeated dots,
  missing numbers, full-width digits, and astral prefixes fail at the entry
  offset without throwing.
- A 100,000-digit success and a 100,000-digit suffix failure completed without
  throwing. The failure restored its nonzero entry offset. This was a bounded
  functional probe, not a timing measurement.
- Each candidate was called 2,000 times, used twice successively on one mutable
  state (`1%2%bad`), and re-entered on a second source from an outer `map`.
  Results and offsets remained independent. Parser identity and `id` stayed
  fixed, and parser-ID sentinels proved that calls allocate no new parsers.
- Every module namespace exposes exactly `percentageLiteral`. Every success is
  a fresh ordinary extensible object with exact own keys `kind,number`; its
  fresh numeric child has exact own keys `sign,type,value`. All six properties
  are ordinary writable, enumerable, configurable data properties, and the
  values matched the numeric oracle, including `-0` in the frozen holdout and
  `Infinity` for the long numeral.
- Downstream `then(string(";"))`, `eof()`, `many()`, and `or(...)`
  compositions behaved transactionally. Missing downstream `;` and trailing
  content under `eof()` restore the parent entry offset; `many()` parses
  adjacent percentages; fallback succeeds after candidate rollback.

## Failure-value seam

The parse-that 1.0.0 seam is real and identical across the three candidates.
From state `src="@@12x"`, `offset=2`, all candidates return `isError=true`,
restore `offset=2`, record diagnostic `furthest=4`, and retain the intermediate
numeric value `{sign:null,type:"integer",value:12}`. If the number itself does
not start, as in `"@@x%"` at offset 2, the exact predecessor value is retained.
A parent `then` that fails after a successful percentage likewise restores its
entry offset while retaining its last intermediate value.

This is not hidden success or leaked consumption: `isError` is true and the
transactional offset is restored. The frozen brief expressly declares failed
aggregate `state.value` non-authoritative and outside this feature contract.
No caller in the inspected composition probes treated it as authoritative.
Therefore this seam is evidence to document, not a counterexample to the exact
subject.

## Residual boundary

These candidates are prefix productions over the typed string/`ParserState`
surface. This review does not claim no-throw behavior for out-of-contract
non-string `src` values, nor does it infer that the broader live and rejected
public scalar doors are operation-equivalent downstream integrations. The
prototype has sound direct composition behavior; integration and performance
remain separate, zero-credit questions.
