# VALUE-PERCENTAGE-LITERAL G0 — skeptic 4 benchmark review

## Verdict

**REJECT.** The stored row arithmetic is internally correct, but the benchmark
bundle cannot support a strict-win or performance-selection claim. The live and
rejected lanes execute materially broader, non-equivalent public scalar doors;
the raw results do not bind the code/dependency bytes they allegedly measured;
and the first attempt provably did not come from the bound harness. The second
attempt is a fresh timing draw after that harness changed, not an append-only
derivation from the first timing bytes. This is a benchmark-scoped rejection;
it neither finds nor repairs a semantic candidate defect, and it grants no
production or feature credit.

I did not execute or rerun any timing path. All numerical checks below were
computed solely from the existing JSON timing integers.

## Exact-byte closure

The subject reproduces at SHA-256
`81498cb4afeb0fac70f83afe17342c88ac90fc7eed396b98a44a1c52400e4ca0`.
Every direct subject binding reproduces:

| Artifact | SHA-256 |
| --- | --- |
| `BRIEF.md` | `842e0873ab5a3e9b3a5e64dbfda85db1ca860e8a60f1daec63dc2c7cbd68b193` |
| `candidate-set.json` | `a73cdcd6f8dcf4f8002b3cf0d76105d762dc0b47893453a15cc748bf0c06f6e1` |
| `evidence/correctness.json` | `bcda3c31143f0ed09d47ca8ff750af30c8b3a1fd1e69c8d109f03daf74e62579` |
| `benchmark.mts` | `701a0848ba7416a0dcc259bfd82f152be2e130f4f11c9a6fb57995e484761e81` |
| `evidence/benchmark-first-attempt.json` | `7b954f247eb7f7127b15f126c3681587c6efff925ca8cf009e7a7b449a0ddad3` |
| `evidence/benchmark-second-attempt.json` | `30ff0f2dacdc4fc617d8cebb1ad6235ef1a1dbe8a6e0588d7d8a9dd37d758808` |
| live peer `src/css/grammar.ts` | `40f8e379b8f3242b0f3c68efa7d52ebc3adf8d6dc7f8edc9231fa115e68d6b69` |
| rejected peer `mirror/grammar/value.ts` | `36e7d92aae4e71b8682847584eabfd0b89f9dd952f52c5c1c62108c5a0c3480f` |

The current transitive candidate closure also matches the frozen declarations:
H `82d426f494fed3e14cac1ddf7c20ca787b1f731fe11c7e48d422a0a1b8c4a02a`,
B `2b3ffe8e18d32d62c25de28ad4ef2d0246c23ab81440fcc83bf3faf5c4d445c2`,
S `0657c2bb60a9200c5ffc26aef3d7a1049219657757797901bc4b4a435f14b654`,
and accepted numeric owner
`8c3ac689f2e24635216ac0499f23166996ac0136e0b6876e82a8da4f75eb95aa`.
This proves present-byte consistency. It does not prove that those bytes were
the ones loaded for either historical timing attempt.

## Blocking defects

### 1. The peer operations are not comparable

The candidate lane calls the narrow `percentageLiteral.parseState`, requires a
successful full-corpus offset, and reads `state.value.number.value`. The peer
lane instead calls the public `parseCssScalar` door, validates a different
`ParseResult<CssScalar>` shape, and reads `payload.value`.

That distinction is material. The bound live door trims input, attempts the
full color parser before its numeric regex, constructs the public scalar
wrapper, and recursively freezes result objects. The bound rejected door
preprocesses CSS, constructs a component-value CST, checks scalar eligibility,
projects components, remaps diagnostics, and constructs the public result.
Neither is the same immutable operation as a direct percentage production.
Their current source hashes identify the files accurately, but the benchmark
labels do not turn these broader doors into semantics-equivalent peers.
Consequently candidate/live and candidate/rejected ratios are calibration only,
not strict-win evidence, and cannot close G-3 under `ADDENDA-07` section 6.

### 2. Historical observations are not bound to executable bytes

Neither benchmark JSON contains the benchmark-harness hash, candidate-set or
candidate hashes, numeric-owner hash, peer hashes, transitive dependency hashes,
corpus/operation hashes, runtime invocation, or a sealed pre-timing manifest
identity. The subject links those files only after the fact. In particular, the
live and rejected files import substantial runtime graphs whose bytes are not
bound at all. `candidateMutationAfterFreeze: false` and matching current hashes
cannot establish which bytes a historical Node process loaded, nor exclude a
modify-run-restore sequence.

### 3. First-attempt lineage is impossible under the bound harness

The bound harness unconditionally writes ten comparison keys, including
`b_over_h` and `b_over_s`. The first-attempt JSON has exactly eight keys and
omits those two. Therefore it cannot have been emitted by the exact bound
harness. No predecessor harness or predecessor hash is retained. The second
attempt has the ten current keys but contains an entirely new set of 400 timing
integers. A missing derived comparison could have been appended by recomputing
the first rows; it did not require measuring again.

Both files remain visible, so the earlier bytes were not physically erased.
That limited append visibility does not make the second draw a valid replacement
or confirmation: there is no predeclared run manifest, invalidation reason,
canonical-attempt field, exit/failure record, or rule authorizing the redraw.
Moreover, the reciprocal B directions appear only after the first data were
observed. Thus a strict B/H or B/S test direction was not demonstrably
predeclared. Treating the second attempt as qualification evidence violates the
one-shot/no-retry truth required by the benchmark law.

### 4. Required audit fields are absent

The harness source creates one child process per replicate and correctly reduces
four blocks to one log ratio before using `n = 20` and `df = 19`; it does not
misrepresent 80 blocks as independent samples. Separate child processes remove
JIT-state sharing across replicates, but the JSON rows record no PID, invocation,
exit status, stderr/failure status, or schedule identity. The processes also run
sequentially on one host, so process separation alone does not establish
independence from host-level drift.

The xorshift order is reconstructible only if the unproven harness lineage is
assumed. Even under the current harness it is not position-balanced across the
80 blocks. Position counts for H/B/S/live/rejected are respectively
`[20,11,8,21,20]`, `[18,28,16,7,11]`, `[10,15,28,20,7]`,
`[16,18,14,19,13]`, and `[16,8,14,13,29]`. The seed formula also reuses
diagonal `replicate + block` schedules rather than defining 80 independently
balanced orders.

The harness calculates a scalar checksum, but neither result stores checksum
bytes. From the corpus alone, the reconstructed checksum is
`-601614.9999999932` for 1,000 warmup iterations and
`-1203229.999999984` for 2,000 timed iterations; twice the warmup is
`-1203229.9999999865`, a difference of `2.561137080192566e-9` within the
harness tolerance `0.0000012032299999999864`. This shows what the check would
accept, not that either historical process performed it. The checksum is also a
collision-prone sum, not a retained normalized-result transcript.

The results do not report the required median plus dispersion, an explicit
nanosecond/throughput unit, allocation evidence, or an `UNAVAILABLE` allocation
reason. Warmup/sample iteration counts and child invocation details exist only
in the unproven harness source, not in a pre-timing manifest or raw record.

## Independent row and inference reproduction

Both JSON files contain 20 unique seeds, four positive integer timings for each
of five lanes per seed, and `operationsPerBlock = 24000` in every row. Applying
the bound harness formula to every stored comparison reproduces every serialized
floating-point field exactly (`max absolute error = 0`). The missing first-draw
B comparisons can also be derived without timing:

| Attempt | Comparison | geometric ratio | one-sided upper ratio, `t = 1.729` |
| --- | --- | ---: | ---: |
| first | B/H | 0.9251583406213688 | 0.9633944763607317 |
| first | B/S | 0.9317316746540829 | 0.9702977457368842 |
| second | B/H | 0.9403939692641025 | 0.9799928976652392 |
| second | B/S | 0.9431508557617726 | 0.9830649823447959 |
| first | B/live | 0.19680229583037095 | 0.2024373677683144 |
| first | B/rejected | 0.039170932910477185 | 0.04026807298709448 |
| second | B/live | 0.19775170283392726 | 0.20316183317779862 |
| second | B/rejected | 0.03967230002628137 | 0.040666977281924394 |

The exact one-sided 95% Student critical value for 19 degrees of freedom is
approximately `1.729132811521367`, not the rounded-down `1.729`. Replacing the
constant yields B/H upper ratios `0.9633974733127662` and
`0.9799960025868582`, and B/S upper ratios `0.9703007686394373` and
`0.9830681122956869`; no numerical classification changes. The defect is not
the tiny rounding error. The critical value and direction lack a sealed
pre-timing declaration, no multiplicity or post-selection rule is declared for
choosing among three candidates, the reciprocal B tests were added after the
first observation, and the public peers are non-comparable.

Thus the timing integers honestly imply the displayed conditional arithmetic,
but they do **not** imply a benchmark-law strict win. No candidate may receive
performance selection or strict-peer credit from this G0 bundle.
