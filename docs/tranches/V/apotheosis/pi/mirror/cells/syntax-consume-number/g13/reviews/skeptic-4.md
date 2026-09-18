# G13 skeptic 4 — hostile inputs, transactionality, offsets, limits

**Task:** `/root/g13_skeptic_d`  
**Role:** independent quintetto skeptic 4; hostility specialist  
**Disposition:** **REJECT the exact candidate set for feature acceptance or
integration.** Candidate S has a reproducible grammar defect outside the sealed
172-case corpus, and no surviving candidate meets the tranche's strict win over
the prior/deposed parser. D is the only recommended optimization/synthesis base;
this is not an acceptance.

This review grants zero parser, feature, benchmark, production, package, or
megatranche authority. I did not read another skeptic review and modified no
candidate, harness, evidence, production, or BBNF bytes.

## Exact subject

I independently recomputed every requested SHA-256 before testing:

| artifact | SHA-256 | result |
|---|---|---|
| H `candidates/h/index.ts` | `d1e98dfe1d3f818ad690137b17f076fd59f2e27b3418e48c0a60c08a3389c8a0` | exact |
| B `candidates/b/index.ts` | `00d6bf2fba70a6e7600bec2d9d3b136eff41eb066de5d27918976ec8d7b333f1` | exact |
| S `candidates/s/index.ts` | `f2f379b0bcd5248c0839145ebc6566a23078415b3f97c4927e7bf20e9ef8606d` | exact |
| D `candidates/d/index.ts` | `552389f9c6212c274afad38b43130889f3f65f43c2bb9f3e091ed72ab0c3b4e1` | exact |
| correctness evidence | `d22fc7c2609dbfa45f48d65341c9c6a915a4383d821147c12cfbfbf6afdeda2d` | exact |
| benchmark evidence | `7676055df3e903076eb8f135feb65a07bd048daa0279db06a57b875b59ebfe37` | exact |
| formation receipt | `51e8f1e46c62c2aae047179ac417fb763a10da4395602436b4793508d9549572` | exact |

I replayed the frozen candidate-evidence driver without `--write`. It reproduced
`172/172` for each of H/B/S/D. I also replayed the benchmark driver without
writing; it regenerated the declared bundle SHA-256
`cfe23c5395dc174bef15cef95fea85c89928d3e9f7739f8b16d08fc8d6658986`.
Those bounded GREEN facts are real. They are not exhaustive correctness or a
performance win.

## Independent hostile assay

I used a separate sticky-prefix oracle implementing the frozen contract grammar,
not the holdout generator or evaluator. For every observation I called the real
frozen parser on a `ParserState`, checked no throw, source identity, UTF-16 end,
maximal prefix, binary64 result, frozen exact-key result shape, predecessor
identity on failure, and pre-seeded-ahead diagnostic preservation.

### Exhaustive bounded alphabet

The complete source set was every string of length 0 through 5 over
`+ - . e E 0 1 9 x`: 66,430 sources and 265,720 candidate calls. Each source
was embedded after a supplementary Unicode scalar so the parser began at UTF-16
offset 2.

| candidate | oracle mismatches | throws |
|---|---:|---:|
| H | 0 | 0 |
| B | 0 | 0 |
| S | **135** | 0 |
| D | 0 | 0 |

The first S counterexample was `.0.0`: the contract consumes maximal prefix
`.0` and leaves `.0`; S consumed all four code units and returned a frozen leaf
whose numeric value is `NaN`.

### Deterministic hostile fuzz

Seed `0x5eedc0de` generated 100,000 strings of 0–64 selections from
`+ - . e E 0 1 5 9 x % SP NUL é 💩`, sometimes after a supplementary-scalar
prefix. This made 400,000 calls against the same independent oracle.

| candidate | oracle mismatches | throws |
|---|---:|---:|
| H | 0 | 0 |
| B | 0 | 0 |
| S | **50** | 0 |
| D | 0 | 0 |

This bounded assay is evidence, not a proof that H/B/D are universally correct.
It is enough to falsify S.

### UTF-16, numeric extremes, and work limits

Valid offsets after astral characters and lone surrogates behaved consistently
for all four candidates. Direct observations included negative zero from
`💩-0e400x`, subnormal underflow from `\uD800+.5E-324`, incomplete exponent
maximal-prefix behavior, an offset inside a surrogate pair, and end-of-input
failure. There were no throws, source mutations, or erroneous offset units in
those valid-state cases.

I also ran four 262,144-code-unit cases: digits, digits plus incomplete `e+`,
digits plus failed `.x`, and all-nondigit failure. Every candidate completed
without throwing; successful maximal prefixes ended at 262,144, and the pure
failure preserved offset and predecessor. One-shot elapsed times stayed below
one millisecond on the recorded host. This rejects an obvious catastrophic
backtracking claim at that bound; it is not a general complexity proof.

The formation does not explicitly state the runtime domain of `ParserState.offset`.
With out-of-domain offsets the candidates diverge: on source `"1"`, offset `-1`
is accepted from code unit zero by H/B/S but rejected by D; offset `NaN` throws
from H and D and produces a successful `NaN` leaf in B and S. `NaN` is not a
meaningful UTF-16 offset, so I do not charge this as a grammar defect if the
parse-that valid-state invariant is binding. Before tranche hardening, however,
the owner must explicitly bind `offset` to a finite integer in `[0, src.length]`
or enforce that invariant at the public no-throw boundary. The current wording
is insufficient to claim hostile no-throw for arbitrary runtime `ParserState`
objects.

## Confirmed blocker: S accepts two fractional segments

S defines both

```ts
const mantissaParser = regex(/[0-9]+|\.[0-9]+/);
const fractionParser = regex(/\.[0-9]+/).opt();
```

and sequences both unconditionally. When the mantissa takes its dot-leading
arm, the optional fraction is still live. This recognizes a language strictly
larger than the frozen CSS number grammar.

Minimal direct reproductions against the exact S hash:

| input | required maximal prefix | S observation |
|---|---|---|
| `.0.0` | `.0`, end 2, value `0` | `.0.0`, end 4, value `NaN` |
| `+.5.6e7` | `+.5`, end 3, value `0.5` | entire input, end 7, value `NaN` |
| `-.9.1%` inside `consumeNumber.skip(string("%"))` | parent rejection at offset 0 | parent success at end 6 with `NaN` |

The last row is not a cosmetic leaf discrepancy. It causes a percentage parent
to accept invalid CSS and exports `NaN` as a successful semantic value. H/B/D
correctly reject that parent composition (after recognizing only `-.9`).

The sealed holdout's `PASS_ALL_FOUR_CANDIDATES_ALL_172_HOLDOUT_CASES` status is
therefore only true of those 172 rows. The maximal-prefix and composition
families omitted the cross-product of a dot-leading mantissa followed by another
fraction. The 144-case benchmark contains only valid complete numbers, so its
correctness gate cannot expose over-acceptance either.

Any repaired S bytes require fresh closure, hostile evidence, and all five
skeptics. The exact S subject above is rejected permanently.

## Transactionality and diagnostics

For in-domain direct failures, H/B/S/D preserved source, offset, predecessor
identity/value, and seeded diagnostics whose `furthest` position was ahead of
the attempted parse. The exhaustive assay included nested suggestion and
secondary-span snapshots. No candidate threw on a primitive-string source.

The frozen evaluator intentionally leaves ordinary failure diagnostics unscored.
Consequently G13 proves neither stable expected-label text nor public
`ParseIssue` fidelity. That is acceptable for this narrow leaf prototype, but no
adjudicator may promote its diagnostic result to tranche-wide error-code credit.

On a failing parent such as `consumeNumber.skip("%")`, parse-that restores the
parent offset but retains the already-produced leaf as the error state's value.
That behavior is common to H/B/D and arises in the framework combinator, not the
candidate grammar. Integration must either treat values on error as undefined
by contract or separately harden the framework/public wrapper; this cell does
not prove parent-value transactionality.

## Performance challenge

The frozen benchmark truth already fails the stated tranche bar. Median time
relative to the deposed prior parser was:

| candidate | frozen median ns/op | candidate / deposed | disposition |
|---|---:|---:|---|
| D | 112.517 | **1.342× slower** | fastest candidate, still loses |
| H | 125.158 | **1.493× slower** | loses |
| S | 278.393 | **3.322× slower** | loses and incorrect |
| B | 326.232 | **3.892× slower** | loses |
| deposed | 83.814 | 1.000 | peer |

My independent exact-bundle replay changed absolute timings but not the order or
conclusion: deposed 81.202 ns/op, D 107.875, H 128.487, S 274.151, B 313.261.
D was still 1.328× slower. The evidence correctly declares no performance gate
and zero benchmark credit; it cannot support the charter's required strict win
over prior iterations.

The benchmark corpus is a valid finite full-number intersection assay, not an
over-acceptance, offset, hostile, or composition benchmark. It also measures the
actual historical output shape (a number) against candidates that allocate and
freeze a three-property leaf. That is useful actual-door evidence, but the
synthesis team should preserve both an end-to-end door lane and a separately
normalized grammar/construction decomposition before attributing the loss to
grammar topology or to result construction.

## Three-altitude adjudication

### Total tranche

G13 is the first post-reset formation to produce real idiomatic parse-that
specimens, and its custody/closure chronology is useful. It is not ready to seed
the values foundation: one candidate over-accepts invalid CSS, the finite
holdout missed the defect, no candidate beats the deposed implementation, and
the cell does not establish public diagnostic fidelity or the valid-state
offset boundary. Integrating now would propagate `NaN` into percentages and
dimensions and would knowingly miss the performance charter.

### Feature

`SYNTAX-CONSUME-NUMBER` remains **RED** for acceptance. The exact H/B/D bytes
survive this hostility pass semantically over the stated valid-state domain,
but only D is close to the performance target. S is a confirmed semantic
reject. The candidate evidence remains useful bounded evidence and must not be
rewritten; this review supersedes its implied completeness.

### Per candidate and ranking

1. **D — REJECT for current acceptance; retain as first synthesis/optimization
   base.** It had zero bounded semantic mismatches, uses parse-that first-byte
   dispatch idiomatically, is the fastest candidate, and has no manual scanner.
   Its three regex arms duplicate the numeric grammar and it remains 1.33–1.34×
   slower than the deposed peer.
2. **H — REJECT for current acceptance; retain as the KISS semantic baseline.**
   It had zero bounded mismatches and is the shortest/readable exact contract
   recognizer. A single regex leaf is lawful for this primitive production, but
   it does not exercise combinator structure and remains 1.49–1.58× slower than
   the deposed peer.
3. **B — REJECT.** It had zero bounded semantic mismatches and its transaction
   wrapper lawfully preserves the predecessor, but array/string intermediates,
   alternation, and wrapper overhead make it 2.9× slower than D and 3.89× slower
   than the deposed peer. It offers no compensating readability or reuse win.
4. **S — REJECT on correctness and performance.** It accepts two fractional
   segments, exports successful `NaN`, corrupts parent acceptance, and is more
   than 3.3× slower than the deposed peer. These exact bytes must never be
   integrated.

## Required disposition

- Do not award parser, feature, benchmark, or integration credit.
- Do not integrate S or use its result in synthesis.
- Use D as the performance-oriented base and H as the minimal semantic oracle;
  seek a new exact candidate/synthesis that removes D's duplicated grammar and
  beats the deposed lane without changing the frozen semantics.
- Add the dot-leading-plus-second-fraction family to the next hostile corpus,
  including direct, UTF-16-offset, percentage, dimension, and delimiter parents.
- Bind the valid `ParserState.offset` domain and error-state value law outside
  the grammar rather than adding a contrived scanner or validation layer to this
  leaf.
- Any repaired/new/synthesized bytes restart the five hostile reviews before
  the three final adjudicators may accept them.

**Final verdict: REJECT. Zero production authority.**
