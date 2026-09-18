# G13 skeptic 1 — CSS Syntax consume-number

**Task:** `/root/g13_skeptic_a`  
**Role:** hostile specification/correctness skeptic, with the complete
three-altitude and all-axis `ADDENDA-07` rubric  
**Disposition:** **REJECT_ALL for G13 apotheosis selection.** H, B, and D are
semantically sound specimens on the evidence inspected, but none has the
performance proof required for feature acceptance. S additionally has a
confirmed CSS Syntax maximal-prefix defect. This is one skeptic disposition,
not feature acceptance, parser credit, benchmark credit, integration authority,
or production authority.

## Frozen subject

I verified the following bytes before analysis:

| subject | SHA-256 | result |
|---|---|---|
| formation receipt | `51e8f1e46c62c2aae047179ac417fb763a10da4395602436b4793508d9549572` | exact |
| H | `d1e98dfe1d3f818ad690137b17f076fd59f2e27b3418e48c0a60c08a3389c8a0` | exact |
| B | `00d6bf2fba70a6e7600bec2d9d3b136eff41eb066de5d27918976ec8d7b333f1` | exact |
| S | `f2f379b0bcd5248c0839145ebc6566a23078415b3f97c4927e7bf20e9ef8606d` | exact |
| D | `552389f9c6212c274afad38b43130889f3f65f43c2bb9f3e091ed72ab0c3b4e1` | exact |
| candidate evidence | `d22fc7c2609dbfa45f48d65341c9c6a915a4383d821147c12cfbfbf6afdeda2d` | exact |
| benchmark evidence | `7676055df3e903076eb8f135feb65a07bd048daa0279db06a57b875b59ebfe37` | exact |

The candidates and the formation/candidate/benchmark evidence were mode `0444`
at review time. I inspected the exact installed `@mkbabb/parse-that@1.0.0`
runtime, including `core.js` SHA-256
`d577cc3e19b3a7e138ad433670ebdf4857776744c3375ae174391e2f68e642f5`
and `packrat-entry-CS1td-8B.js` SHA-256
`1f8674c3d325579363356e1fd091a3735ae9a7ac9da0cb61a4ca0ebfb6d474a8`.
In those exact bytes, `regex` is sticky at `state.offset`; `dispatch` is an
ASCII first-character table; `all` and `then` rewind offsets but do not restore
predecessor values; and the B/S transaction wrapper restores the exact
offset/value pair on error. H and D do not need that wrapper because their
leaf failure paths do not overwrite the predecessor value.

Normative comparison used the CSS Syntax Module Level 3 editor's draft dated
10 June 2026, sections 4.3.10 and 4.3.13:
<https://drafts.csswg.org/css-syntax/#consume-number>.

## Independent reproduction

1. Running `candidate-evidence.mjs --correctness` without `--write` reproduced
   the exact evidence bytes and SHA-256
   `d22fc7c2609dbfa45f48d65341c9c6a915a4383d821147c12cfbfbf6afdeda2d`:
   all four candidates pass all 172 authenticated holdout cases.
2. I separately derived the seven CSS Syntax steps procedurally, without using
   the contract regex or any candidate regex, and exhaustively enumerated all
   strings of length zero through six over
   `{+, -, ., e, E, 0, 1, 9, x}`. Every case was placed after one astral code
   point and parsed from UTF-16 offset two. This exercised 597,871 inputs and
   2,391,484 candidate transactions. H, B, and D had zero discrepancies. S had
   1,404 discrepancies.
3. A minimal confirmed S counterexample is `.0.0`. CSS Syntax step 4 consumes
   the first `.` and following digits after step 3 consumes zero initial
   digits; step 5 may then consume only a valid exponent. The normative prefix
   is therefore `.0`, type `number`, numeric value `0`, end offset `2`. S
   consumes `.0.0`, ends at offset `4`, and returns `NaN` because its leading-
   dot mantissa is followed by a second optional fraction. The defect is at
   `candidates/s/index.ts:4-6,8-11,23-28`. Signed forms such as `+.1.2` and
   parent compositions such as `.1.2px` fail for the same reason.
4. I stress-ran each candidate on four adversarial sources of approximately one
   million UTF-16 code units: long integers with incomplete fractions, long
   leading-dot fractions with incomplete exponents, long signed exponents, and
   an invalid signed prefix followed by a long tail. None threw; each completed
   in under 3 ms on the recorded Apple M5 Max environment and preserved the
   expected prefix/failure boundary. This observation is bounded local evidence,
   not a general complexity proof.
5. I reran the seven-lane benchmark. The second run preserved the frozen
   ordering and approximate scale: D `111.95`, H `131.77`, S `274.34`, B
   `316.80`, LIVE `379.19`, deposed `81.18`, and C14 `2453.37` median
   ns/operation. The run is useful corroboration, but it still does not repair
   the frozen protocol's missing `ADDENDA-07` section 6 proof.

## Altitude 1 — total-tranche and architecture

The feature is correctly sequenced as a dependency-first primitive. A CSS
number representation is shared by numeric tokens, percentages, dimensions,
integer-only constraints, calculations, colors, media features, and many
property grammars. The candidates are direct parse-that productions. They do
not introduce the rejected atom/token-object/CST runtime, a separate lexer, a
manual cursor, source slicing, or a broad remainder capture. The primitive
belongs under the acknowledged primitive/semantic-leaf owner and can feed the
BBNF-family `value-unit` and `func-body` productions without becoming a second
lexical architecture.

The tranche must not infer broader progress from this cell. It proves neither
CSS preprocessing nor numeric-token/dimension/percentage construction, full
CSS L4 coverage, public compatibility, browser behavior, serialization,
cross-feature error codes, or the full-surface performance goal. A browser
CSSOM does not directly expose the consume-number algorithm's maximal prefix,
sign flag, or integer/number flag; the pinned specification is the primary
arbiter here, with browser witnesses deferred to typed consumers.

The corpus did valuable work: exact source/offset preservation, UTF-16 offsets,
signed zero, subnormal underflow, infinities, descriptor shape, parent
composition, hostile failure, and pre-seeded ahead diagnostics. Nevertheless,
the independently found `.0.0` family proves that the public plus hidden corpus
is not exhaustive even for this small primitive. The quintet is therefore
substantive rather than ceremonial.

## Altitude 2 — feature-cell analysis

### Normative semantics

The frozen observable contract correctly encodes the CSS Syntax alternatives:
optional sign; zero or more digits followed by `.` and one or more digits, or
one or more digits; and an exponent only when the exponent marker, optional
sign, and at least one digit are present. It correctly classifies a consumed
decimal point or exponent as type `number`, preserves incomplete decimal and
exponent suffixes, exposes the optional sign, and converts the exact consumed
representation through ECMAScript `Number` for the TypeScript target.

H, B, and D conform to that boundary over the authenticated evidence, the
independent exhaustive bounded assay, and the million-unit hostile assay. S
does not.

### Transaction, diagnostics, composition, and no-throw

All four preserve the predecessor value and starting offset on the tested leaf
failures. B and S need their narrowly allowed local transaction because the
installed `all`/`then` implementations restore offsets, not predecessor values.
H and D have naturally transactional leaf failures. All four preserve an
already-furthest diagnostic state in the holdout.

Ordinary failure diagnostics are explicitly unscored by the frozen evaluator.
That is not a CSS Syntax defect because the normative algorithm has a
starts-with-number precondition, but it means this cell supplies no tranche
credit for final ParseIssue-code fidelity. The integrated numeric-token and
typed-parent rows must bind those diagnostics; this primitive's green result
must not be cited as proof that they do.

H, B, and D remain singular prefix productions usable by percentage,
dimension, integer-only, and delimiter parents. S violates that composition
claim on the confirmed double-fraction family.

### Performance evidence

The frozen medians and row/column ratios are:

| candidate | median ns/op | / LIVE | / deposed | / C14 |
|---|---:|---:|---:|---:|
| H | 125.158 | 0.3275 | 1.4933 | 0.0519 |
| B | 326.232 | 0.8536 | 3.8924 | 0.1352 |
| S | 278.393 | 0.7284 | 3.3216 | 0.1154 |
| D | 112.517 | 0.2944 | 1.3425 | 0.0466 |

These timings support only a prototype observation. They grant **zero
performance credit** for every candidate because:

- the frozen evidence explicitly declares `performance_gate: null` and
  `throughput_units_reported: false`;
- there is no predeclared one-sided paired confidence interval whose upper
  bound lies below `1.0` as required by `ADDENDA-07` section 6;
- no separately pre-sealed run manifest/raw-result path or allocation/peak-
  memory disposition is supplied;
- the LIVE door performs a whole scalar parse while this cell performs only
  consume-number, and the deposed door returns a bare number while candidates
  allocate and freeze the richer required leaf. Those comparator-operation
  differences require an explicit `COMPARABLE`/`NON_COMPARABLE` adjudication;
- every candidate's frozen median is slower than the deposed door. If that door
  is retained as genuinely comparable, no candidate has the required strict
  win. If it is non-comparable, it supplies no broad previous-iteration win
  claim.

Thus the feature cannot be `APOTHEOSIS-ACCEPTED` on these bytes even though H,
B, and D are semantically credible prototypes.

## Altitude 3 — candidate dispositions

### H — semantic/idiom survivor; overall REJECT for this generation

- **Correctness:** no defect found. Exact grammar, maximal prefix, sign/type,
  binary64, UTF-16 offset, transaction, and tested composition are sound.
- **Parse-that idiom:** excellent for a normative primitive terminal:
  `regex(...).map(...)`, no scanner or custom Parser wrapper.
- **KISS/LOC:** best of the four: one canonical grammar spelling and 407 bytes.
- **Hostility:** no throw in the sealed holdout, bounded exhaustive assay, or
  million-unit stress assay.
- **Performance:** faster in median than LIVE and C14, slower than deposed, and
  unsupported by the required strict-win protocol.
- **Verdict:** `REJECT` from final selection in G13 solely because the common
  performance gate is absent; preserve as a leading semantic candidate for a
  repaired generation.

### B — semantic/idiom survivor; overall REJECT for this generation

- **Correctness:** no defect found. The factorized grammar handles leading-dot
  and integer-plus-fraction arms distinctly, including incomplete suffixes.
- **Parse-that idiom:** readable `all`/`any` production transpose. The local
  save/call/restore wrapper is exactly within the frozen narrow exception and
  is necessary for predecessor-value transactionality in 1.0.0.
- **KISS/LOC:** materially more code and allocation than H/D; the transaction
  adapter is a maintenance burden if copied widely.
- **Hostility:** no throw on the tested hostile rails.
- **Performance:** slowest valid candidate, only a modest median lead over
  LIVE, and almost 3.9 times the deposed median; no section 6 strict-win proof.
- **Verdict:** `REJECT` from final selection in G13 because the common
  performance gate is absent; preserve as the clearest production-tree
  semantic comparator.

### S — confirmed semantic defect; REJECT

- **Correctness:** **blocking defect.** `mantissaParser` accepts a complete
  leading-dot fraction and `fractionParser` may then accept a second fraction.
  `.0.0` consumes four code units and yields `NaN`; CSS Syntax consumes `.0`
  and stops at offset two.
- **Parse-that idiom:** the staged `then` shape is legal, but the decomposition
  does not preserve the normative branch dependency. It is therefore not an
  idiomatic representation of this production despite using valid APIs.
- **Hostility/composition:** it does not throw, but silently overconsumes and
  poisons downstream dimension/delimiter composition.
- **Performance:** timing is invalid as candidate merit because the candidate
  is semantically wrong; it also lacks the section 6 gate.
- **Verdict:** `REJECT` on confirmed normative semantics. Do not repair these
  bytes in place.

### D — semantic/idiom survivor; overall REJECT for this generation

- **Correctness:** no defect found. First-character dispatch correctly admits
  only sign, dot, or digit starts, and each sticky branch respects maximal
  prefix.
- **Parse-that idiom:** strong use of parse-that's O(1) `dispatch`; no manual
  lookahead or scanner. The three branch regexes repeat the number grammar and
  create more drift surface than H's single canonical spelling.
- **KISS/LOC:** compact at 625 bytes, though less parsimonious than H.
- **Hostility:** no throw on all tested rails.
- **Performance:** best observed median and stable ordering in the independent
  rerun, but still slower than deposed and lacks the required strict-win proof.
- **Verdict:** `REJECT` from final selection in G13 solely because the common
  performance gate is absent; preserve as the leading engine-native/performance
  candidate for a repaired generation.

## Root-facing docket

1. **Confirmed semantic blocker S-1:** `.0.0` (and signed/parent variants).
   Normative basis: CSS Syntax 4.3.13 steps 3–5. Exact defect lines:
   `candidates/s/index.ts:4-6,8-11,23-28`.
2. **Common performance blocker P-1:** no candidate has a predeclared paired-CI
   strict-win verdict, a pre-sealed run/raw manifest, or an allocation
   disposition under `ADDENDA-07` section 6. Frozen evidence grants zero
   benchmark credit by its own terms.
3. **Comparator blocker P-2:** the operation mismatch for LIVE and deposed is
   unresolved. If deposed is comparable, all candidates lose on frozen median;
   if non-comparable, it cannot prove the retained-prior strict-win obligation.
4. **Nonblocking integration debt D-1:** ordinary diagnostics are unscored and
   must be bound by the numeric-token/typed-parent rows; do not infer
   ParseIssue-code fidelity from this cell.

Because P-1/P-2 apply to every candidate, this skeptic's all-axis result is
`REJECT_ALL` for the exact G13 generation. The semantic work is not discarded:
H, B, and D are independently supported as correct prototypes, and S supplies
a precise negative lesson for any replacement. Any replacement S candidate,
benchmark corpus/contract change, or comparator/gate change is a new generation
under `ADDENDA-07` and must be reviewed as new exact bytes.

**Credit:** parser `0`; accepted feature `0`; benchmark win `0`; tranche close
`0`; production authority `0`.
