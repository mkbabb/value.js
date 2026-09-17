# SYNTAX-NUMBER-START G5 — independent specification challenge A

**Verdict: ACCEPT the exact boundary for candidate authoring.**

MODEL: `gpt-5.6-sol`  
REASONING: `ultra`  
WORKFLOW: independent exact-byte adversarial challenge, `v2`

Subject: `g5/manifest.json`  
Expected and reproduced SHA-256:
`41c482b059ddab64c51226a05022016c17adb55cb73292d665d29298aa1a0109`
(5,839 bytes).

I assumed the formation was semantically incomplete, compositionally unsafe,
and capable of admitting a source-reading or benchmark-favoured
implementation. I did not read, request, locate, or infer hidden-corpus bytes,
and I did not read or query a sibling challenge. No candidate source was
written or inspected.

## Exact seal and authority

- The public precursor reproduced as 16,915 bytes at
  `87e3f7bda096701bbe7faad422db37351e67f1b71c1957bdb9e980f91bc3d7ed`.
  The independent holdout receipt reproduced as 5,712 bytes at
  `5edada80093d8d2f40293faaf613e366d25b85a75c5a85c8ec2c31828e0c8e15`.
- Every one of the 28 public-input closure paths reproduced both its declared
  byte count and SHA-256. This includes the G3/G4 contracts, harnesses and
  fixtures, both G4 rejection challenges and gestalt, the 64-row parse-that
  distribution ledger, the rejected-base ledger, the empty active base,
  package/lock/configuration identities, the terminally acknowledged module
  DAG, the feature ledger, and `ADDENDA-07`.
- The pinned official CSS Syntax source at revision
  `c7573530343759ace8e46438a1fa2c44515b5554` independently reproduced as
  144,427 bytes at
  `3f129d17407f9bd027291bcfb8015beb86fc229bf5efe505b49ec2dc30be4390`.
  Its §4.3.10 bytes define exactly the sealed alternatives and explicitly
  require zero additional consumption. Its §3.3 bytes establish the CR/FF,
  CRLF, NUL, and surrogate filtering dependency.
- `npm run check` is GREEN. The active `apotheosis/grammar` contains zero
  TypeScript sources, so this challenge gives no accidental credit to the
  rejected atom/CST runtime or to any candidate.

## Specification and occurrence analysis

The owned predicate is complete and singular:

```text
digit
sign digit
dot digit
sign dot digit
```

where `sign` is ASCII `+` or `-` and `digit` is U+0030–U+0039. Every other
first-three-position configuration, including EOF in any required position,
is false. The operation returns a boolean and consumes nothing.

The occurrence ledger agrees with the pinned tokenizer algorithm. Plus,
minus, and dot dispatch are the three callers that need the predicate. A
leading digit goes directly to consume-number and is correctly recorded as a
non-occurrence. Consume-number carries the starts-with-number precondition but
does not become a second semantic owner. The future source-map operation owns
raw-to-filtered position mapping; this cell receives only corresponding
retained positions or EOF. For this ASCII-only predicate, the sealed raw and
preprocessed pairs preserve truth, while the eliminated interior LF of CRLF is
explicitly outside the domain.

An independent oracle rematerialized all 406 G3 public cases (306 true, 100
false) and all 23 G4 endpoint cases (12 true, 11 false). All 429 identifiers
were unique; every source/offset/continuation relationship was valid; there
were zero truth mismatches. The six positive spellings, all ten ASCII digits,
root and nonzero UTF-16 offsets, astral and lone-surrogate prefixes, filtered
pairs, actual EOF, and number spelling ending at EOF are represented. The
three deterministic million-code-unit hostiles independently reproduced their
declared UTF-8 sizes and SHA-256 values.

No complete-CSS or public-API claim is smuggled into this cell. `numberStart`
is an internal `Parser<boolean>` under `value-unit`, and the incomplete
normative denominator still withholds feature apotheosis and consumer credit.

## Raw and composed harness analysis

The complete G5 assertion unions rather than replaces the repaired G3/G4
lanes:

- raw child and ordinary `string(prefix).map(predecessor).next(candidate)`
  parent composition both execute;
- the six inherited predecessor representatives and package-default
  `undefined` each execute in both diagnostics modes and all seven diagnostic
  profiles;
- every lane requires the identical returned `ParserState` object, a boolean
  result, success, zero child consumption, and the exact following-parser
  offset;
- raw lanes preserve `src` own-property presence/value, and G5's default
  parent lane also checks it across the complete outer call;
- `furthest`, `expected` presence/reference/ordered contents, suggestions
  array/reference/entry identities and fields, secondary-span
  array/reference/entry identities and fields, and the global diagnostics mode
  are challenged before, at, beyond, and at source end.

The seven predecessors are correctly described as binding representatives,
not an enumeration of JavaScript values. They close the concrete G4
`undefined` counterexample. The exact-source quintet remains required to
reject value-dependent branching, type escapes, state corruption, or
coercion beyond legitimate result replacement. Thus a representative-class
success cannot be promoted into a generality claim by the harness alone.

The always-successful predicate may use an idiomatic candidate-local wrapper
only to restore diagnostic bookkeeping polluted by speculative terminals.
That restoration remains candidate code and timed cost. It receives no waiver
for source inspection, cursor logic, whole-number recognition, or token/CST
construction.

## Holdout analysis

The receipt binds the exact precursor and all 28 public inputs, the clean
zero-source base, and the exact 64-file installed parse-that distribution. It
reports a fresh canonical 85,849-byte corpus at
`3dac39da917de45aa9a0c45f76d177a33294c174f76e30d7cbc4294cbfa626b0`:
192 cases, balanced 96/96.

The receipt records zero internal duplicates and zero overlap with all 406 G3
and 23 G4 cases independently on ID, source, source+offset, and semantic tuple.
It covers nonzero offsets, number spellings ending at EOF, actual operation at
EOF, astral and unpaired-surrogate prefixes, mapped preprocessing pairs, all
six positive arms, and 78 near misses. Its complete G5 witness is arithmetically
consistent: 168 inherited observations plus 28 default-`undefined`
observations equals 196 per case; `192 * 196 = 37,632`.

Execution/reveal remains withheld until all five source, overlay, and
projected identities close. Therefore the holdout can challenge generality
without giving an author a repair oracle. I grant only receipt integrity and
applicability here, never hidden semantic truth by inspection.

## Architecture, promotion, and performance

The candidate topology is the smallest correct one-file foundation on the
empty direct-combinator base. Five isolated provenance seats must still yield
at least three material lineages: bounded explicit branches, BBNF production
transpose, specification tree, engine dispatch/chain, and bounded zero-width
terminal. None is authorized to recognize a complete number or introduce a
lexer, atom, token object, component-value layer, CST, manual scanner, or broad
remainder parser.

Promotion derives the real mirror, active grammar, installed package,
package/lock/configuration, and verifier roots from the verifier's canonical
location. Only the overlay root is supplied. Symlinks, path-set drift, byte
drift, imports outside `@mkbabb/parse-that/core`, multiple exports, and common
imperative/source-coercion constructions are rejected; the emitted identity
binds source, overlay, projected grammar, dependency aggregate, and resolved
roots.

The AST verifier is correctly treated as a necessary floor, not a proof of
idiom. In particular, static syntax cannot exhaust every inherited coercion,
regex-body abuse, misleading local token name, or indirect source route. I
assign no sufficiency credit to a mechanical pass. The protocol makes the five
exact-source skeptics binding on those routes, scanner/remainder behavior,
normative ownership, LOC/KISS, and idiomatic parse-that. Any downstream attempt
to treat verifier success alone as anti-scanner proof would be gate drift and
must reject the candidate.

The benchmark closes G4's mode ambiguity: each candidate/round explicitly
runs disable, restore/time disabled, enable, restore/time enabled, then
disable. Candidate-local restoration is inside timing; pool restoration and
toggles are outside. Any exception invalidates the complete run. The ten-row
schedule places every seat exactly twice in every position, and 60 measured
rounds give exact balance. All 20 ordered pairs are unique; each pair resets
the specified PRNG, draws 10,000-by-60 paired resamples, and uses zero-based
endpoint 9,499. Selection requires the candidate's four one-sided upper
endpoints to be below zero. The end-to-end and allocation lanes remain
descriptive; no incomparable complete-token implementation receives local
predicate credit.

## Three-altitude verdict

- **Total tranche:** The cell is correctly sequenced after quarantine and on
  the acknowledged direct-combinator DAG. It does not canonize the rejected
  lexical substrate or claim completeness while the denominator is RED.
- **Formation wave:** G5 discharges the exact G4 docket: default `undefined`,
  truthful necessary-not-sufficient source enforcement, explicit diagnostics
  benchmark transitions, canonical live promotion roots, and the empty active
  base. The independent holdout is fresh and still withheld.
- **Feature:** The CSS predicate, occurrences, preprocessing boundary,
  endpoints, raw/composed state semantics, diagnostics preservation, work
  bound, candidate diversity, KISS policy, promotion identity, and benchmark
  selection are sufficiently sealed to challenge implementations.

No load-bearing public invariant is missing before source authoring. This is
an **ACCEPT of the exact G5 boundary only**. It authorizes no candidate by
itself, reveals no holdout, selects no implementation, grants no full-ledger
feature acceptance, and grants no production execution.
