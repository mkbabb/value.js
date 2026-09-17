# G13 skeptic 3 — performance, equivalence, and integration challenge

**Task:** `/root/g13_skeptic_c`  
**Role:** independent quintetto skeptic 3, performance specialist  
**Presumption:** every candidate, semantic claim, idiom claim, and benchmark
claim is false until reproduced  
**Disposition:** **REJECT ALL for G13 apotheosis selection.** H, B, and D pass
the inspected semantic rail but have no admissible performance credit; S has a
reproduced semantic defect. The shared observation contract and benchmark must
be recut as a new generation before any candidate can be selected.

I did not inspect any other G13 skeptic review.

## Exact reviewed bytes

The requested identities match the current regular files byte-for-byte:

| artifact | SHA-256 |
|---|---|
| formation receipt | `51e8f1e46c62c2aae047179ac417fb763a10da4395602436b4793508d9549572` |
| H | `d1e98dfe1d3f818ad690137b17f076fd59f2e27b3418e48c0a60c08a3389c8a0` |
| B | `00d6bf2fba70a6e7600bec2d9d3b136eff41eb066de5d27918976ec8d7b333f1` |
| S | `f2f379b0bcd5248c0839145ebc6566a23078415b3f97c4927e7bf20e9ef8606d` |
| D | `552389f9c6212c274afad38b43130889f3f65f43c2bb9f3e091ed72ab0c3b4e1` |
| candidate/holdout evidence | `d22fc7c2609dbfa45f48d65341c9c6a915a4383d821147c12cfbfbf6afdeda2d` |
| benchmark evidence | `7676055df3e903076eb8f135feb65a07bd048daa0279db06a57b875b59ebfe37` |

The reviewed benchmark implementation identities are:

- `candidate-benchmark.mts`
  `4bdef5d824f1357753c20e2e030dde202eac90afdea110f396650cac0ef7a486`
- `candidate-evaluator.mts`
  `c237d9a4ddc3c7cb88efdc165f1398f27201fdd9b491dcf4e32b43d43b33d5e7`
- `candidate-evidence.mjs`
  `14ffb2296ac256daffc4315d148d8fa2e179abc46d6128f93e2b0bffcac02b9f`
- `peer-worker.mts`
  `91a147132507ad1653763eb57ecbc98d18fab279ada29084ba88d99c5138f746`
- `peer-harness.mjs`
  `87eb237901242f2562eb26d1e4080690e9010eab7a9c4386fcc4b070fc6ae9d8`
- `peer-corpus.json`
  `ecfdc4670008ef924703eb26ed8557b226d62799a6fe843bb463c9310c84b64c`
- `peer-expected.json`
  `df4614057684de772581120a971aae95b020203489c84768a49f548b48f67e50`

The four candidates and both evidence JSON files are mode `0444`. The
evaluator, benchmark worker, and evidence driver are mode `0644`; their exact
hashes are captured by the reviewed evidence, but they were not immutable
pre-run subjects.

## Independent replay

Two bounded, non-writing executions of
`node .../g13/candidate-evidence.mjs --benchmark` independently authenticated
the formation/custody joins, replayed all four 172-case holdout evaluations,
rebuilt the exact benchmark bundle, validated all seven lanes on the generated
144-case success corpus, and completed timing without error. Thus the reviewed
evidence is executable, not claim-only.

The frozen timing file reports these medians:

| lane | median ns/op | vs LIVE | vs deposed | vs C14 |
|---|---:|---:|---:|---:|
| H | 125.158 | 0.3275 | **1.4933** | 0.05186 |
| B | 326.232 | 0.8536 | **3.8924** | 0.13519 |
| S | 278.393 | 0.7284 | **3.3216** | 0.11536 |
| D | 112.517 | 0.2944 | **1.3425** | 0.04663 |
| LIVE regex | 382.188 | 1.0000 | 4.5600 | 0.15838 |
| deposed | 83.814 | 0.2193 | 1.0000 | 0.03473 |
| C14 | 2413.153 | 6.3141 | 28.7919 | 1.0000 |

For the exact eleven frozen trial pairs, every candidate was faster than LIVE
and C14 in 11/11 pairs, while every candidate was slower than deposed in 11/11
pairs. Candidate/deposed paired ratios occupied these ranges:

- H: `1.4226 .. 1.8839`
- B: `3.5114 .. 4.1408`
- S: `3.1049 .. 3.5779`
- D: `1.2221 .. 1.4314`

The two fresh replays preserved the order `D < H < S < B < LIVE << C14` and
the loss to deposed. Their medians in ns/op were respectively:

| lane | replay 1 | replay 2 |
|---|---:|---:|
| H | 148.906 | 151.832 |
| B | 377.130 | 380.349 |
| S | 321.861 | 331.232 |
| D | 128.273 | 131.117 |
| LIVE | 446.857 | 443.571 |
| deposed | 97.730 | 95.867 |
| C14 | 2922.301 | 2930.352 |

This is credible directional evidence and a stable candidate ranking. It is
not a strict-win proof: absolute medians moved materially between the frozen
run and the replays, and the required predeclared paired inference does not
exist.

## Blocking findings

### P1 — no candidate meets the retained previous-iteration target

`CHARTER.md` G-3 and `ADDENDA-07` sections 5–6 require the accepted feature to
beat the LIVE regex and every genuinely comparable retained prior iteration.
The deposed lane is the fastest of all seven lanes. D, the best candidate, uses
34.25% more median time in the frozen evidence; H uses 49.33% more; S and B use
232.16% and 289.24% more. The same direction reproduced twice. No voting or
semantic success can convert those losses into a performance win.

This finding alone blocks performance acceptance for H, B, S, and D.

### P2 — the benchmark has no lawful strict-win gate

The evidence truthfully says `performance_gate: null` and `benchmark_credit:
0`. That is the correct disposition. The worker records eleven lane samples
and separately divides lane medians, but it never defines or evaluates the
predeclared one-sided paired confidence interval required by `ADDENDA-07`.
Pairable trial data happen to exist, yet the matrix is a ratio of independent
medians, not the required paired analysis.

There is also no content-addressed run manifest or immutable raw-result path
sealed before first timing. `candidate-evidence.mjs --benchmark` may be invoked
arbitrarily many times without writing; only a later `--write` call creates the
immutable file. Therefore the bytes do not prove that failed or unfavorable
attempts were retained, and the no-retry-erasure law is unenforced. The final
JSON embeds raw samples but is not an append-only attempt ledger.

### P3 — operation equivalence is narrower than the feature contract

The timed observable is reduced to a binary64 number. It does not validate or
normalize the complete G13 `{ value, type, sign }` result contract during the
timed lane precheck, nor failure transaction, offset, diagnostics, source
preservation, descriptors, or composition behavior.

The peer work is materially asymmetric:

- candidates allocate and freeze `{ sign, type, value }`;
- deposed returns a primitive number;
- C14 captures raw text/span, skips trivia, and constructs a different CST;
- LIVE calls the public `parseCssScalar`, which first attempts color parsing,
  trims input, dispatches other scalar classes, and constructs a public
  `Result<CssScalar>`.

Normalizing only `.value` does not establish identical operations. In
particular, LIVE is a broader public scalar door rather than the comparable
numeric production; the apparent LIVE win cannot be generalized to replacing
the regex parser. Conversely, deposed is timed without the required leaf
construction, so the measured deposed loss cannot isolate grammar-engine cost.
These lanes are useful baselines, but no broad comparator credit follows until
equivalent adapters validate and expose the full feature observation.

### P4 — allocation-sensitive evidence is absent

This row is allocation-sensitive by construction. Every candidate creates and
freezes an object. B additionally creates `all`/`any` tuples, strings, an
optional-path result, and a saved transaction; S creates nested `then` tuples,
strings, four staged results, and a saved transaction. H and D construct fewer
intermediates. The single-isolate round robin can also charge garbage
collection caused by one lane to a following lane.

`ADDENDA-07` requires allocation/peak-memory evidence or an explicit
`UNAVAILABLE` disposition with tool reason. The benchmark supplies neither.
This omission is load-bearing for the large B/S slowdown and for any claim
that D/H remain preferable when embedded repeatedly in higher grammars.

### P5 — corpus and schedule support only a short success-path micro-result

The timing corpus is generated at run time from twelve short mantissas, two
sign arms (empty and minus), and six exponent arms. All 144 cases start at
offset zero, consume the complete source, and succeed. The timing omits:

- explicit plus and leading-zero distinctions outside the peer intersection;
- maximal-prefix incomplete decimal/exponent cases;
- failed transactions at zero and nonzero offsets;
- pre-existing diagnostics and predecessor preservation;
- percentage, dimension, integer-only, and delimiter composition;
- long digit runs, hostile suffixes, and the 4,098-code-unit holdout boundary.

Those behaviors are correctness-tested elsewhere but have no performance
profile. This corpus cannot characterize real numeric-production workload or
adversarial cost.

The corpus order is fixed on every repetition. Warmup is four reduced rounds;
there is no stabilization observation. Eleven trials are not a multiple of
the seven lanes, so the rotating schedule is not position-balanced: each lane
occupies some positions twice and others once. The evidence records Node/V8,
CPU, memory, and executable identity, but not process load, thermal state,
power policy, or GC/allocation state. These limits do not erase the robust
directional ordering, but they block a meticulous strict-win claim.

### S1 — candidate S violates maximal-prefix semantics

S composes `mantissaParser = /[0-9]+|\.[0-9]+/` with a separately optional
`fractionParser = /\.[0-9]+/`. When the mantissa begins with a dot, it may
consume a second fractional segment. This is not permitted by the frozen
grammar.

Exact reproduction against all four frozen candidates with source `.5.6`:

| candidate | `isError` | end | result |
|---|---:|---:|---|
| H | false | 2 | `{ sign:null, type:"number", value:0.5 }` |
| B | false | 2 | `{ sign:null, type:"number", value:0.5 }` |
| **S** | false | **4** | `{ sign:null, type:"number", value:NaN }` |
| D | false | 2 | `{ sign:null, type:"number", value:0.5 }` |

The contract requires maximal prefix `.5`, end 2, value `0.5`. Exhaustive
enumeration through length six over `0 1 + - . e E` found no contract
divergence for H, B, or D and repeatedly reproduced this S family (for example
`+.01.0`). Thus the candidate evidence's 172/172 result is authentic but not
sufficient: the holdout omitted the repeated-dot ambiguity. S is semantically
REJECTED regardless of timing.

### G1 — the shared frozen-result contract conflicts with tranche law

Every candidate calls `Object.freeze` because `contract.json` requires a
frozen leaf. `CHARTER.md`'s freeze-parity rule says the mirror does **not** pay
for frozenness unless a consumer is shown to rely on it. The G13 formation
proves exact descriptors but provides no consumer dependency establishing
that need. This is both a gestalt defect and a benchmark distortion because
the deposed peer pays no equivalent freeze/object cost.

The feature boundary must either provide exact consumer evidence that overrides
the charter's default and apply equivalent peer adapters, or remove frozenness
from the observation. Either change alters the observation contract and
therefore requires generation N+1 under `ADDENDA-07`; it cannot be patched
during synthesis.

## Three-altitude adjudication

### Total tranche

The cell is a useful direct-combinator pilot and its exact evidence is much
stronger than the rejected preauthor generations. It does not advance G-3:
there is no strict-win gate, no win over deposed, no full-contract equivalence,
and no allocation evidence. Treating this success-only microbenchmark as proof
that the eventual CSS parser beats LIVE or prior iterations would be benchmark
gaming. The unnecessary frozen-leaf contract also contradicts the tranche's
KISS/performance law.

**Total-tranche verdict: REJECT for integration or performance credit.**

### Feature cell

The custody and candidate-neutral 172-case execution replay. Nevertheless, S
has a concrete missing maximal-prefix case, and the timed corpus covers only a
narrow success intersection. The cell does not yet have the exact comparable
operation, pre-run manifest, paired inference, allocation disposition, or
strict threshold required for feature close.

**Feature-cell verdict: REJECT generation 13; recut generation 14.**

### Per-candidate common-axis verdicts

`ACCEPT` below means only that the exact candidate survives that one inspected
axis; it does not grant feature credit.

| candidate | correctness | parse-that idiom | performance | hostile/limits | KISS/LOC | overall |
|---|---|---|---|---|---|---|
| H | ACCEPT | ACCEPT — one legitimate terminal regex/map | REJECT — 1.493× deposed and no lawful gate | ACCEPT on present evidence | ACCEPT; 407 bytes | **REJECT** |
| B | ACCEPT | ACCEPT, qualified — permitted local transaction around direct `all`/`any` | REJECT — 3.892× deposed, highest measured combinator overhead | ACCEPT on present evidence | REJECT — 957 bytes and avoidable intermediates | **REJECT** |
| S | **REJECT** — repeated-dot overconsumption/`NaN` | ACCEPT only as a direct staged topology | REJECT — 3.322× deposed | REJECT — missing hostile ambiguity | REJECT — 1,004 bytes plus nested intermediates | **REJECT** |
| D | ACCEPT | ACCEPT — engine-native first-character dispatch | REJECT — best candidate, but still 1.342× deposed and no lawful gate | ACCEPT on present evidence | ACCEPT; 625 bytes | **REJECT** |

Performance/KISS ranking of the exact bytes is:

1. **D** — fastest candidate, clean dispatch, best next-generation basis;
2. **H** — shortest and only about 11% slower than D in the frozen medians;
3. **B** — semantically sound but 2.90× D and allocation-heavy;
4. **S** — disqualified semantically; also 2.47× D.

No rank is a nomination because all four fail at least one blocking gate.

## Required next-generation repairs

1. Correct the observation's frozenness conflict or bind exact consumer proof;
   then regenerate every candidate against that one contract.
2. Replace S's staged mantissa/fraction construction and add `.5.6`, signed
   variants, repeated dots, and generated short-alphabet maximal-prefix cases
   to the public and hidden rails.
3. Seal a pre-run manifest, immutable attempt/raw-result path, exact output
   adapter contract, schedule, sample count, and one-sided paired inference
   before timing. Preserve every run/failure append-only.
4. Time exact semantic adapters, not merely binary64 extraction. Mark broader
   LIVE/C14 doors `NON_COMPARABLE` where no same-operation door exists, and
   retain their evidence for the later integrated/full-door comparison.
5. Add separately reported success, prefix, failure, nonzero-offset,
   composition, and bounded-hostile performance classes. Use an exactly
   position-balanced interleaved schedule and enough independent samples for
   the predeclared interval.
6. Record allocation/peak-memory evidence, or the required exact
   `UNAVAILABLE` tool reason.
7. Optimize the lawful D/H descendants until the predeclared paired interval
   is wholly below 1.0 against every genuinely comparable retained peer. Do
   not relax semantics or remove a comparator to manufacture the win.

## Authority boundary

This review grants **zero parser, feature, benchmark, integration, package,
consumer, production, tranche-execution, or release authority**. It changes no
candidate or evidence byte. Production remains outside V·π.
