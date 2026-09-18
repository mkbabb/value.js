# G13 skeptic 2 — parse-that idiom, parsimony, and reuse

**Task:** `/root/g13_skeptic_b`  
**Role:** independent parse-that skeptic; no other skeptic review was read  
**Scope:** exact G13 `SYNTAX-CONSUME-NUMBER` candidate set and its frozen
correctness/benchmark evidence; prototype only  
**Authority:** zero production, integration, feature-acceptance, package, or
release authority

## Exact subject

I independently hashed the supplied bytes and obtained the required identities:

| artifact | SHA-256 | bytes / physical lines |
|---|---|---:|
| formation receipt | `51e8f1e46c62c2aae047179ac417fb763a10da4395602436b4793508d9549572` | 7,167 |
| H | `d1e98dfe1d3f818ad690137b17f076fd59f2e27b3418e48c0a60c08a3389c8a0` | 407 / 7 |
| B | `00d6bf2fba70a6e7600bec2d9d3b136eff41eb066de5d27918976ec8d7b333f1` | 957 / 26 |
| S | `f2f379b0bcd5248c0839145ebc6566a23078415b3f97c4927e7bf20e9ef8606d` | 1,004 / 30 |
| D | `552389f9c6212c274afad38b43130889f3f65f43c2bb9f3e091ed72ab0c3b4e1` | 625 / 15 |
| correctness evidence | `d22fc7c2609dbfa45f48d65341c9c6a915a4383d821147c12cfbfbf6afdeda2d` | 16,880 |
| benchmark evidence | `7676055df3e903076eb8f135feb65a07bd048daa0279db06a57b875b59ebfe37` | frozen subject |

The mirror is pinned to `@mkbabb/parse-that@1.0.0`; the lock records registry
integrity
`sha512-ygzF6JPb0OC2XRCeg/ywtNYgo2hKmZYGabaimObx0/czxH/8I2gF8obQjkWpPrXW8azOtt5x3RpnU5nZVEpY1Q==`.
The exact installed core and implementation chunks used here hash to
`d577cc3e19b3a7e138ad433670ebdf4857776744c3375ae174391e2f68e642f5`
and
`1f8674c3d325579363356e1fd091a3735ae9a7ac9da0cb61a4ca0ebfb6d474a8`.

## Independent replay

I ran the candidate-neutral correctness driver without `--write`. Its complete
JSON output hashed exactly to the frozen correctness evidence hash above. All
four candidates independently replayed **172/172**, including all eight
families: 24 core successes, 26 maximal-prefix cases, 18 UTF-16-offset cases,
18 composition cases, 10 descriptor cases, 18 extreme conversions, 40 failure
transactions, and 18 bounded-hostile cases. Strict TypeScript also exited 0.

I separately reran the seven-lane bounded benchmark. Every lane again passed
144/144 exact binary64/full-consumption prechecks. My medians were:

| lane | independent replay ns/op | frozen ns/op |
|---|---:|---:|
| D | 109.86 | 112.52 |
| H | 132.92 | 125.16 |
| S | 279.05 | 278.39 |
| B | 323.03 | 326.23 |
| LIVE regex door | 380.72 | 382.19 |
| deposed number helper | 87.12 | 83.81 |
| C14 | 2,454.95 | 2,413.15 |

Those figures are reproducible observations, **not** an admissible strict-win
result for the reasons under blocking docket P-1.

## Altitude 1 — total tranche

`consume-number` is a sound dependency-first feature boundary. It belongs in
the `value-unit` production family and is consumed by integer filtering,
percentages, dimensions, and higher values. It is small enough to compare
orthogonal parser shapes without inventing a token, atom, CST, scanner, or
second lexical runtime. The four candidates are the first post-reset bytes
that genuinely exercise direct parse-that construction rather than formation
machinery.

The sequencing remains tranche-RED, however. The full occurrence/feature
ledger is not frozen or accepted, and ADDENDA-07 section 2 expressly withholds
pilot acceptance before that denominator closes. Nothing in this review turns
one primitive into CSS-language coverage. The eventual source must live under
the acknowledged `value-unit` ownership path and be retested inside the
integrated `values` graph; the candidate-cell path is not integration.

The acknowledged BBNF `value-unit.bbnf` at SHA-256
`cb57f79050a6304d79e3a7d8c7b690c902f243880aab4c896a63899290dd727b`
models its numeric primitive as one regex terminal yielding `f64`. That makes a
small parse-that `regex(...)` leaf architecturally normal here. It does not
make the BBNF result shape sufficient: the current June 2026 CSS Syntax editor's
draft section 4.3.13 returns numeric value, `integer|number` type, and optional
sign, which the G13 contract correctly preserves.

## Altitude 2 — feature cell

The observable grammar and result contract are correct on the evidence before
me. The candidates accept ASCII CSS digits only, handle optional sign,
fraction, and a complete signed exponent, retain incomplete `.`/exponent
suffixes as required by maximal-prefix consumption, preserve signed zero and
binary64 extremes, and return exactly the frozen ordinary
`{ sign, type, value }` leaf. Failures restore offset and predecessor value,
do not throw, and preserve the specifically contracted pre-seeded-ahead
diagnostics. Percentage, dimension, integer-only, and delimiter compositions
are directly exercised.

The feature is appropriately singular. `starts-with-number`, numeric-token
classification, percentage/dimension construction, and public result/error
adaptation remain separate owning rows. Ordinary failure diagnostics are
deliberately unscored here, so this evidence grants no broad ParseIssue-fidelity
credit.

The feature cell is **not performance-qualified**. Its own frozen evidence says
`performance_gate: null`, `benchmark_credit: 0`, and
`PASS_CORRECTNESS_GATED_TIMING_COMPLETE_NO_PERFORMANCE_GATE`. That is truthful,
but it cannot satisfy ADDENDA-07 section 6 or an all-axis skeptic ACCEPT.

## Altitude 3 — candidate analyses

### H — whole prefix regex

**Correctness: ACCEPT. Idiom: ACCEPT. Hostility: ACCEPT. KISS/LOC: ACCEPT.
Performance: REJECT on the common evidence defect P-1. Overall: REJECT for
this generation's apotheosis.**

H is an acceptably idiomatic parse-that leaf. Lines 3–7 use the framework's
official sticky `regex` primitive followed by one semantic `map`; they do not
manually read source, advance a cursor, slice input, or reconstruct a parser
outside parse-that. The regex is exactly one normative terminal algorithm, not
the rejected practice of recognizing an entire CSS value language through a
custom regex/scanner stack. Its 407 bytes are the clearest expression of the
boundary and the best candidate for future `value-unit` reuse.

The principal reservation is optimization: H was 11–21% slower than D in the
two recorded runs. That does not overcome its parsimony without an admissible
paired gate, and it may become the better integrated choice if a parent numeric
dispatch makes D's internal dispatch redundant.

### D — first-character dispatch

**Correctness: ACCEPT. Idiom: ACCEPT. Hostility: ACCEPT. KISS/LOC: ACCEPT with
duplication reservation. Performance: REJECT on P-1. Overall: REJECT for this
generation's apotheosis.**

D is also an acceptably idiomatic combinator leaf. `dispatch` is a published
O(1) first-character combinator; lines 7–11 use it exactly for the three CSS
number starts (`+|-`, `.`, digit), with ordinary `regex` leaves below it. This
is not a lexer and not manual scanning. It is the fastest G13 candidate in both
runs and remains compact at 625 bytes.

Its cost is repeated mantissa/exponent spelling across lines 3–5. That is a
real drift surface, and the microbenchmark measures direct invocation rather
than invocation beneath the eventual values-family dispatch. D therefore
needs integrated evidence before its local speed can justify the duplicated
grammar. It is provisionally ranked first only because the speed order was
stable across both runs and the code remains direct and readable.

### B — factorized `all` / `any`

**Correctness: ACCEPT. Idiom: REJECT as a final construction. Hostility:
ACCEPT. KISS/LOC: REJECT. Performance: REJECT. Overall: REJECT.**

The transaction wrapper at lines 12–20 is not a scanner, and it is not
gratuitous in isolation. Inspection of the exact 1.0.0 runtime shows that
fused `all` and `then` restore the starting **offset** on failure but leave the
most recent `state.value`; `ParserState.save()/restore()` is the available way
to restore the contracted predecessor value. The wrapper's one save, one
`inner.call`, conditional restore, and error restoration are therefore doing
real semantic work, and the holdout proves that work.

Nevertheless, B is contrived as the final `value-unit` implementation. The
acknowledged BBNF production is itself one number regex, so splitting it into
local sign/integer/fraction/exponent fragments is not a nearly one-for-one BBNF
transpose. None of those fragments is exported for reuse. The construction
adds fused-array allocation, intermediate strings, a saved-state object, and a
manual Parser boundary, yet is 2.87–2.90x slower than D and 2.44–2.61x slower
than H in the two runs. It provides neither a faithful provenance advantage
nor a performance/KISS advantage.

### S — staged `then`

**Correctness: ACCEPT. Idiom: REJECT as a final construction. Hostility:
ACCEPT. KISS/LOC: REJECT. Performance: REJECT. Overall: REJECT.**

S's staged sign/mantissa/fraction/exponent order is recognizable as the
normative algorithm, and its transaction wrapper is necessary for the same
predecessor-restoration reason as B. The wrapper itself is permitted and not a
hidden scanner.

The final shape is still unnecessarily awkward: three chained `then` calls
create a nested product that must be unpacked as
`[[[sign, mantissa], fraction], exponent]`; it then reconstructs the consumed
representation and uses the largest source of the set (1,004 bytes). It is
2.47–2.54x slower than D. The source is understandable, but it is less direct
than a normative terminal regex and gives the future values module no reusable
exported production. A future parse-that transactional combinator could make
this style less invasive, but unpublished engine work cannot rescue these
exact bytes.

## Blocking docket

### P-1 — the frozen benchmark cannot prove any candidate's performance axis

This is a common, generation-blocking defect, not a semantic failure in H or D.

1. The frozen artifact has no predeclared strict-win gate and computes no
   one-sided paired confidence interval; ADDENDA-07 section 6 requires both.
2. Allocation-sensitive candidates are not accompanied by allocation evidence
   or an explicit `UNAVAILABLE` tool reason. B/S visibly allocate intermediate
   product arrays, strings, and a saved-state object on the measured path.
3. The timed operations are not semantically identical. Candidate lanes create
   and freeze the exact three-key feature result and then project `.value`.
   The deposed lane returns a bare number, LIVE runs the much broader
   `parseCssScalar` door (including color attempts and result wrapping), and
   C14 creates a richer CST. Normalizing only the final binary64 number does not
   make those operations equivalent. Under section 6 these peers must be
   wrapped to the same observable contract or classified `NON_COMPARABLE`.
4. Consequently, the observed losses to the deposed helper (frozen D/deposed
   ratio 1.342; H/deposed 1.493) are not fair strict-loss proofs, just as the
   apparent wins over LIVE and C14 are not fair broad-win proofs.

Reproduction is the exact `candidate-benchmark.mts` path in the benchmark
bundle: candidate adaptation is at lines 43–48, deposed at 49–54, C14 at
55–60, and LIVE at 61–65. Repair requires a new content-addressed benchmark
generation, predeclared paired gate, exact-result prechecks, and allocation
disposition. Per ADDENDA-07, changing that benchmark evidence reruns all five
reviews even if H/D source bytes remain unchanged.

## Ranking and verdict

**All-axis ranking:** D > H > S > B.  
**Idiom/parsimony ranking alone:** H > D > S > B.  
**Generation verdict:** `REJECT_ALL_FOR_APOTHEOSIS_G13` because every candidate
has a REJECT on the required performance axis; B and S additionally fail the
final idiom/KISS axis.

No semantic or hostile-input defect was reproduced in H or D. Their exact
bytes should be retained as the leading candidates, not rewritten merely to
create motion. The smallest proper next step is a new benchmark generation
over semantically identical operations; then the unchanged exact candidate
bytes, if re-frozen, require a fresh quintetto. This review grants zero parser,
feature, benchmark-win, integration, production, or release credit.
