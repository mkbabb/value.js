# G14 skeptic 3 — hostile performance and benchmark-equivalence review

**Task receipt:** `/root/g14_skeptic_3`  
**Role:** independent G14 hostile skeptic 3, benchmark/performance axis  
**Model receipt:** `Codex, based on GPT-5`; no build suffix or more specific
served-model identifier was exposed to this agent, so none is invented here.  
**Presumption:** the comparison is invalid or misleading until reproduced.  
**Final disposition:** **REJECT ALL.** H, B, S, and D each pass the available
correctness rails, but each fails the frozen requirement to be strictly faster
than LIVE, deposed, and C14: every candidate loses all 21 persisted pairs to
deposed. More fundamentally, the peer adapters do not perform the same feature
operation, and the only persisted timing is explicitly a third capture after
two unpersisted valid runs under a no-retry-erasure law. The artifact itself
correctly grants zero benchmark/performance credit.

I did not inspect another G14 skeptic's work. I made no change to a candidate,
authority, holdout, manifest, harness, or result byte. One correctness replay
and one bounded timing replay were non-writing independent assays only; they
do not amend or qualify the subject evidence.

## Exact reviewed identities

All requested hashes match the current regular files byte-for-byte. All files
in this table are mode `0444`.

| artifact | SHA-256 |
|---|---|
| feature | `266df7a5994fd7a75cb7bb2eee2fbcee02d38320ae0dde265727c6737626dc29` |
| candidate set | `e2f786bb2e190da3c45e9f6396ffb98bad652772de12c6c047519d48c4fda5e6` |
| H | `ca17a811198a286c3e07ab06670b76b16f98c513d246696296dd4c3e4abffaa8` |
| B | `42e6e6a3662c5bb30858b845fe04ced565ff6f755e7edd54d703804285f4e913` |
| S | `2edb390a542ebb98221c624934b14c009bc07c6b306cf7d4be1ccfcfd74202c8` |
| D | `a1e4fc2016362f4d1e4b49089c9580b85f6caa19d2adf91f60dd2dac412f8cd8` |
| holdout evidence | `fdc135c2cb9480a181321824cb67e823c7d9c3af07eaaa56dd8adba4d29c43d9` |
| benchmark manifest | `652f3f5056ff5d4fbcec69bba1b009a4a9612516d31da0a33ee4665b9a7e0807` |
| benchmark harness | `90ee2014b7e8705208c0d45c6ebf245f53ec7be3a573512fec32fb3890193540` |
| benchmark result | `722f5edcd8b25337a0d08d724406f7038cdfa93df632687423c397dee172644a` |

The exact peer source bindings also reproduce:

| peer binding | SHA-256 |
|---|---|
| LIVE `src/css/grammar.ts` | `40f8e379b8f3242b0f3c68efa7d52ebc3adf8d6dc7f8edc9231fa115e68d6b69` |
| deposed `g7/authorities/historical-utils.ts` | `73e6a9731c802be86ac0230f32062f1075d344f6143715786eb1d9b8fe0f28e4` |
| C14 `l4/value-unit.ts` | `da738397cf4504a7c3438b9823a861fcd9e55f016175ce0c5436cb2f2d811890` |
| C14 `combinators.ts` | `d1249c714e67f81655fe823ef2899b893effaeae3908313c93d52eafbfd5ffe0` |

The pinned executable is exactly
`/opt/homebrew/Cellar/node/26.0.0/bin/node`, SHA-256
`08dad0581f00a0cabf4d49ec92ca1f25fdfd01c2c18fa8e92b35f04d4c24c164`,
and reports Node `v26.0.0`, V8 `14.6.202.33-node.19`, Darwin/arm64.
The harness's full binding verification succeeded in the independent replay.

## Independent reproduction

`tsx benchmark.mts --validate` authenticated the frozen manifest/runtime/source
closure, rebuilt the LIVE and C14 adapters, and returned
`PASS_CORRECTNESS_ONLY_NO_TIMING_EXECUTED` for all seven lanes on all 24 timing
rows. The holdout artifact separately reports authenticated in-memory recovery
and `PASS_EXACT_61_OF_61` for all four candidates. I found no correctness
counterexample in this performance pass.

I independently canonicalized the benchmark corpus. It is exactly 2,496 bytes,
24 rows, and SHA-256
`d72a498433318ba9e8f25c34332afafea7f63caae24fcfaddc5ce429352732b5`.
The 24 rows are valid finite members of the declared peer intersection. Each
trial is exactly `24 * 2,000 = 48,000` operations.

I recomputed every one of the twelve persisted paired comparisons directly
from `samples_elapsed_ns`, using `d_i = ln(candidate_i / peer_i)`, sample
variance with denominator 20, and the declared one-sided critical value
`1.7247182429207857`. The maximum absolute difference from any persisted mean,
standard deviation, upper bound, or exponentiated ratio was
`1.7763568394002505e-15`. The confidence arithmetic and the boolean gates are
therefore internally correct.

The schedule matrix is also authentic: all 21 orders are the declared cyclic
rotations, and each of the seven lanes occupies each absolute position exactly
three times. The result is not failing because of a transcription, hash,
sample-count, critical-value, or position-count mistake.

The persisted lane medians and median absolute deviations, reconstructed
because the result does not itself report them, are:

| lane | median ns/op | MAD / median |
|---|---:|---:|
| D | 80.918 | 1.47% |
| H | 105.013 | 17.39% |
| S | 216.765 | 2.16% |
| B | 287.294 | 4.16% |
| LIVE | 397.939 | 1.34% |
| deposed | 59.619 | 1.62% |
| C14 | 2,458.706 | 1.78% |

One separately identified non-qualifying timing assay reproduced the order
`deposed < D < H < S < B < LIVE << C14`. Its medians were respectively
`59.662`, `87.681`, `119.534`, `224.211`, `305.080`, `412.467`, and
`2,544.936` ns/op. Every candidate again lost 0/21 pairs to deposed. Absolute
candidate medians shifted by roughly 3% to 14%, which supports directional
ranking but warns against treating a single capture as a portable latency
constant.

## Blocking findings

### P0 — no candidate passes the required three-peer strict-win gate

This is not borderline. The persisted paired results are:

| performance rank | candidate | geometric ratio to LIVE (upper 95%) | to deposed (upper 95%) | to C14 (upper 95%) | deposed pair wins | verdict |
|---:|---|---:|---:|---:|---:|---|
| 1 | D | 0.20350 (0.20609) | **1.36175 (1.38087)** | 0.03317 (0.03359) | 0/21 | **REJECT** |
| 2 | H | 0.25266 (0.27024) | **1.69071 (1.80860)** | 0.04119 (0.04396) | 0/21 | **REJECT** |
| 3 | S | 0.55892 (0.57278) | **3.74011 (3.84321)** | 0.09112 (0.09277) | 0/21 | **REJECT** |
| 4 | B | 0.71381 (0.73128) | **4.77658 (4.90348)** | 0.11637 (0.11940) | 0/21 | **REJECT** |

Every candidate beats LIVE and C14 in 21/21 persisted pairs. Every candidate
loses to deposed in 21/21. The frozen rule requires the upper ratio to be below
1.0 against all three, not two of three. Therefore all four fail even if every
other benchmark objection were waived.

### P0 — the capture is inadmissible under the run-custody law

The sealed manifest says `result_artifact: ABSENT_PRE_TIMING_BY_DESIGN`, while
ADDENDA-07 section 6 requires an immutable raw-result path before first timing
and append-only raw JSON thereafter. The outer result candidly discloses:

1. a successful first timing whose JSON was returned only to the orchestrator;
2. a successful second timing whose patch failed before persistence; and
3. the present third timing capture, despite `NO_RETRY_WAS_PREDECLARED`.

The two earlier sample matrices, environments, exits, and checksums are absent.
Their claimed shared disposition cannot be authenticated from repository
bytes. The disclosure avoids concealing the protocol failure, but it cannot
retroactively seal an attempt ledger or make the third run the predeclared raw
result. The result's status
`THIRD_CAPTURE_RUN_AFTER_TWO_UNPERSISTED_RUNS_ZERO_QUALIFICATION_CREDIT` and
zero performance credit are the only lawful disposition.

### P1 — the seven lanes do not execute one semantics-equivalent feature operation

The outer shell is carefully equal: each lane validates the same original
bounds, slices `source[offset,end]` inside the timed call, parses at local
offset zero, rebases the end, constructs a normalized mutable leaf, and feeds
the same sink. That does not equalize the intrinsic work:

- Each candidate must derive `sign` and `type` from the input and construct its
  contract leaf. `candidateLane` then discards that leaf except for `.value`,
  and `normalize` constructs a **second** leaf using oracle `task.sign` and
  `task.type`.
- Deposed parses only a primitive number. It never derives the feature's sign
  or integer/number classification and pays for only the normalized leaf;
  those two outputs are injected from the corpus oracle for free.
- LIVE invokes exact `parseCssScalar`, which trims and first attempts the
  broader color/scalar machinery, constructs a public result graph, and
  exposes no consumed end. The adapter simply asserts full consumption by
  passing `token.length` to `normalize`. It is an exact production door, but
  it is not a numeric-leaf regex operation despite the lane name
  `live_regex`.
- C14 creates a richer `{raw, span, kind, value, unit}` CST through captured
  `map`/`mapState` and trivia combinators. Its actual end is checked, but its
  richer output is discarded before the common leaf is built.

Consequently the LIVE/C14 wins mostly show that a narrow leaf parser is faster
than two broader doors, while the decisive deposed loss includes a harness
advantage: deposed is not made to compute the candidate output and candidates
pay an avoidable second output construction. Under ADDENDA-07, a peer without
semantics-equivalent operations is `NON_COMPARABLE` and cannot close G-3.
These baselines remain useful directional evidence; they are not a lawful
strict feature-operation comparison.

A comparable recut should consume the same spelling/end and derive the full
leaf from the input in every lane. Candidate adapters should reuse and validate
the intrinsic candidate leaf rather than copying it. Peer adapters should
derive sign/type themselves and construct exactly one equivalent leaf. Broader
LIVE and C14 public/CST doors should either receive equivalently broad candidate
adapters for a separately named integrated-door benchmark or be marked
`NON_COMPARABLE` to the leaf microbenchmark.

### P1 — checksum success is asserted but not persisted

The harness stores per-lane per-trial checksums in local arrays and aborts on
any mismatch, but the returned result omits those arrays and even a checksum
digest. `benchmark-result.json` contains elapsed samples only. Thus the exact
third capture's checksum equality cannot be recomputed or authenticated from
persisted samples. My validation/timing assays traversed the live abort gate,
so the implementation is executable, but a fresh pass cannot supply missing
evidence for the historical third capture.

The checksum is also only an aggregate floating-point sink. The stronger
pre-timing 24-row exact correctness gate is what establishes individual value,
end, descriptors, mutability, and candidate intrinsic-leaf behavior. That gate
replays, but the result should still persist the promised per-trial checksums
or a canonical digest of them.

### P1 — position balancing does not remove order, neighbor, or dependence bias

Using 21 trials fixes G13's absolute-position imbalance: each lane has each
position three times. However, every trial preserves the same cyclic neighbor
graph. Except at a trial boundary, H follows C14, B follows H, S follows B, D
follows S, LIVE follows D, deposed follows LIVE, and C14 follows deposed. The
schedule never reverses or permutes those neighbors. GC, cache, JIT, or thermal
work induced by one lane can therefore be charged systematically to the next.
The fixed 24-row corpus repeated 2,000 times further measures a highly trained
steady-state loop rather than a varying grammar workload.

Pairing trial index is mechanically reproducible, and the declared log-ratio
t calculation is correct. Its inferential assumptions are weaker than the
precision suggests: the 21 log ratios are a deterministic seven-phase time
series with only three observations per phase, not randomized independent
pairs. A balanced randomized/reversed Latin schedule or independently seeded
blocks should break the fixed-neighbor confound, with inference at the block
level. The lack of multiplicity correction across four selectable candidates
also weakens any family-wide winner claim, though it is moot here because no
candidate passes even its individual gate.

The all-21 deposed losses and the independent assay make the failure direction
robust despite these inference limits. They do not rehabilitate the
non-equivalent operation.

### P2 — the corpus is authentic but supports only a narrow hot-success claim

The 24 rows cover zero, signed zero, integers, leading-dot fractions, decimal
fractions, and exponents on finite complete tokens. All use prefix `@@@`,
offset 3, a declared exact end, and suffix `]`. This is a legitimate peer
intersection and the extraction/rebase cost is inside every lane.

It omits plus because deposed does not accept it; it also omits failure,
incomplete suffix, repeated fraction, varied/non-ASCII offsets, long digit
runs, infinity-producing conversion, parent composition, and hostile limits.
Those semantics are correctness-tested elsewhere, including the 61-row
holdout, but have no performance class. Fixed row order on every repetition
maximizes branch/cache training. Therefore ratios describe this compact
success microkernel only; they cannot support whole-feature, hostile-cost, or
integrated-parser throughput claims.

### P2 — environment and allocation disposition are honest but incomplete

The runtime, executable, dependency trees, relevant source files, CPU model,
logical CPU count, memory, and loader arguments are unusually well bound. The
capture does not record run time, OS release, ambient process load, power mode,
thermal state, environment variables, GC events, or an exit/attempt ledger.
The independent assay's absolute shifts demonstrate why those omissions
matter for latency reporting.

`UNAVAILABLE_PINNED_RUNTIME` is a defensible allocation disposition. Node/V8
does not expose a stable, synchronous, exact per-lane allocation counter that
would leave this operation unchanged; heap deltas and snapshots are
GC/escape-analysis sensitive. This satisfies the permitted tool-reason
fallback, but it supplies no allocation comparison. Source-level intermediate
objects may be optimized away, so neither an allocation win nor exact
allocation blame is admissible from this artifact. A separately disclosed
instrumented allocation/GC profile may guide optimization, but must not be
mixed into the timing gate.

The result also omits the lane medians explicitly requested by benchmark law;
raw samples and paired log-ratio standard deviations make them reconstructible
but do not constitute the requested report.

## Three-altitude verdict

### 1. Total tranche

The generation does not advance the tranche's performance gate. It preserves
an exact, useful failure: none of the four candidates beats the retained
deposed comparator, and the required run custody was not achieved. Calling the
LIVE/C14 speedups an apotheosis win would be benchmark gaming because those
doors perform broader work and the strict all-peer predicate still fails.

**Total-tranche verdict: REJECT for apotheosis, integration, benchmark credit,
or production authority.**

### 2. Feature cell

The candidate/holdout custody is strong, all four exact candidates pass the
available semantic/hostile rails, and the compact corpus/harness are
reproducible. The feature benchmark nevertheless has no admissible first raw
capture, no persisted checksum evidence, no exact median report, a fixed
neighbor-confounded schedule, and—most importantly—non-equivalent intrinsic
peer operations. Comparator/operation/corpus repair changes a frozen
generation input and must be recut rather than patched into G14 selection.

**Feature-cell verdict: retain correctness evidence only; REJECT G14
performance qualification and recut the benchmark as a new generation.**

### 3. Per-candidate verdicts, rank, and optimization direction

`ACCEPT` below is axis-local and grants no feature credit.

| rank | candidate | correctness | parse-that idiom | performance | hostile/limits | KISS/LOC | overall and concrete optimization direction |
|---:|---|---|---|---|---|---|---|
| 1 | **D** | ACCEPT on exact public/holdout/timing gates | ACCEPT — engine-native first-character `dispatch` plus terminals | **REJECT** — 1.362× deposed geometric mean; upper 1.381; 0/21 wins | ACCEPT on present evidence | ACCEPT; 26 lines | **REJECT.** Best next-generation basis. Reuse its intrinsic leaf instead of normalizing a copy; specialize type knowledge by dispatch branch and remove the secondary `/[eE]/` classification regex. Profile/fuse `dispatch -> regex -> map` in parse-that core if the equivalent deposed door remains faster. |
| 2 | **H** | ACCEPT on exact public/holdout/timing gates | ACCEPT — one legitimate terminal regex/map | **REJECT** — 1.691× deposed; upper 1.809; 0/21 wins; highest candidate variability | ACCEPT on present evidence | ACCEPT; 15 lines | **REJECT.** Preserve the concise baseline, but eliminate the second output leaf and the extra classification regex (capture/branch metadata or cheap character checks). Investigate the 17.39% MAD before trusting it as the stable alternative; a prefix-specialized engine path is the likely route, not more wrapper code. |
| 3 | **S** | ACCEPT on exact public/holdout/timing gates | ACCEPT, qualified — direct staged `then`/`chain` topology | **REJECT** — 3.740× deposed; upper 3.843; 0/21 wins | ACCEPT on present evidence | REJECT for this gate; 52 lines and nested intermediates | **REJECT.** Fuse nested `then` tuples/maps, avoid rebuilding representation fragments and redundant transaction state, or add an engine-level fused sequence/map primitive. Local string tweaks cannot plausibly close a 3.74× gap. |
| 4 | **B** | ACCEPT on exact public/holdout/timing gates | ACCEPT, qualified — direct `all`/`any`, but transaction/intermediate-heavy | **REJECT** — 4.777× deposed; upper 4.903; 0/21 wins | ACCEPT on present evidence | REJECT; 55 lines and the slowest candidate | **REJECT.** Remove material `all`/`any` tuple/object/string staging through fused engine combinators and one transactional checkpoint, then construct one final leaf. A BBNF-shaped candidate needs a parse-that engine uplift; cosmetic refactoring will not close a 4.78× gap. |

The rank is stable in both persisted evidence and the independent assay, but no
rank is a nomination. The immediate optimization is benchmark-level semantic
equivalence: stop double-constructing candidate results and stop injecting
oracle classifications into primitive peers. After that, optimize D/H or the
underlying `regex`/`map`/`dispatch` engine until a new, presealed, append-only,
equivalent-operation run places the one-sided upper bound below 1.0 against
**each** genuinely comparable peer. Do not remove deposed, relax semantics, or
retry-select a favorable capture to manufacture a win.

A root coordination receipt reports that the separate engine-uplift assay is
RED and supplies no consumable fusion or atomic-transaction uplift: published
authority remains parse-that 1.0.0 commit
`7eab78c89961001a689952c091fdbbf64af735da`. That external receipt was not part
of the frozen G14 benchmark and was not independently replayed here; it does
not alter the verdict. It means the suggested fused engine paths are future
optimization work, not an available escape from G14's measured failures.

## Authority boundary

This review grants **zero parser, feature, benchmark, performance, integration,
package, consumer, production, tranche-execution, or release authority**. It
changes no reviewed subject byte. Production remains outside V·π.
