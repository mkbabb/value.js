# V·π continuous benchmark and performance-proof rail — research

**Status:** research input, not ratified and not an implementation authority.  
**Scope:** the prototype under `pi/mirror/`; no production execution.  
**Date:** 2026-07-21.

## 0. Finding

The present performance evidence is real but terminal and narrow. P-3 is a
reproducible five-scenario comparison of the retiring LIVE regex parser, the
pre-v4 deposed parse-that parser, and the C14 parse-that pilot. W7, however,
waits until W1–W5 close, the mirror has only a bench stub, and Phase B has only
the one-line PB13P contract. That is insufficient for the expanded objective:
make performance a continuous correctness-subordinate proof rail, attribute
cost to the module/door that introduced it, and finish with the prototype
statistically faster than both real predecessors wherever they implement the
same operation.

The recommended rail has two deliberately separate lanes:

1. **P-3 compatibility lane.** Preserve the historical algorithm and five
   inputs byte-for-byte, including its oddities, so new results remain
   comparable to the evidence already on disk.
2. **V·π qualification lane.** Use UTF-8 byte accounting, process isolation,
   semantic-result digests, per-door corpora, robust statistics, CPU/allocation
   profiles, and scale/work measurements. This is the controlling continuous
   rail for new claims.

The compatibility lane must not be silently “fixed”; the qualification lane
must not inherit P-3's known measurement defects merely for continuity.

## 1. Evidence that actually exists

### 1.1 Durable evidence in the repository

`../parser-proof/bench-results.json` is schema
`p3-comparative-bench-aggregate/1`, file SHA-256
`08b927753ee717c67a3031861a88e35e629ecb585d5f84f7e1ba9e4378070be2`.
It records Apple M5 Max/18 cores, darwin 25.4.0, Node v26.0.0, V8
14.6.202.33-node.19, five invocations, fifteen samples per invocation,
`N=1000`, and 50 warmups per sample. The checked runtime currently matches the
recorded Node/V8/architecture, but a future run must still emit its own machine
receipt.

The three measured subjects are:

| subject | exact surviving identity | what may be claimed |
|---|---|---|
| LIVE regex | bundle `c73c8ff2ca2da3ed9bcd7b2016ef00aba0416a79d1787d88943fc3ab0bdccad0`; source digests `grammar.ts=40f8e379...d6b69`, `stylesheet.ts=882317b6...2ec7` | retiring v4 regex/imperative parser, same-build ceiling on the five P-3 scenarios |
| C14 | bundle `2b57626fff0975276f7d46d84ffc01835bc83bfe4f28ce6b5855622f6a22f0d6`; API digest `ce547d18...5951` | parse-that 1.0.0 pilot; comparable only on `value-common` and `sheet-common` |
| deposed | bundle `6c62368f6b4e6c1c28e6c0542bc86004c243fba6bb6d70ac0bba8435a81618eb` | pre-v4 parse-that parser recovered from `b3f4f76e`; comparable on all five scenarios |

The recorded median peak ratios versus the interleaved parse-that `jsonParser`
normalizer are not estimates:

| scenario | LIVE | deposed | C14 |
|---|---:|---:|---:|
| value-historical | 0.0776 | 0.0464 | absent |
| sheet-historical | 0.1637 | 0.0971 | absent |
| sheet-demo | 0.3016 | 0.2788 | absent |
| value-common | 0.1132 | 0.0606 | 0.0640 |
| sheet-common | 0.1261 | 0.0683 | 0.0537 |

These results establish a real target, not a prediction: LIVE is fastest on
every shared P-3 scenario; C14 narrowly leads deposed on the common value set
and trails it on the common sheet set. The absolute historical bars remain
VALUE `0.0500` and SHEET `0.1000`, but the deposed calibration subject misses
both on this machine/build. Therefore the absolute bars remain a separate
owner-controlled legacy gate, not proof that a new parser beats its peers.

The CPU profiles also exist. On `sheet-common`, C14's measured self-time was
dominated by `mapState` 21.2%, `skip` 12.1%, `mergeErrorState` 10.7%, `ok`
8.8%, `map` 6.4%, and `opt` 5.9%, with 5.6% GC and less than 5% in actual sticky
regex recognition. Those measurements justify O-1/O-2/O-3 and profile-gate
O-4/O-5; they do not prove that any future mirror has the same profile.

### 1.2 Recoverable but non-durable harness

The reusable bench, raw five runs, aggregator, subject bundles, and CPU-profile
driver/analyzer are present under
`~/.claude/jobs/9e7dadd0/tmp/parser-proof/`. Their bundle hashes match the
durable result file. This is useful evidence, but `tmp` is not a durable or
portable proof home. W7 cannot claim reproducibility until the necessary
source/fixture recipes and content-addressed subject artifacts are placed in
the prototype proof tree or are reproducibly reconstructed from pinned commits.

The mirror itself currently has only `bench/stub.ts`; `npm run bench` prints a
W0 deferral message. No V·π mirror throughput, CPU, allocation, retained-memory,
or scaling measurement exists yet. None is inferred in this report.

### 1.3 P-3 defect that must be quarantined

P-3's `bytesOf` uses JavaScript string `.length`, not UTF-8 bytes. The pinned
`demo/styles/animations.css` is SHA-256
`a64eb64fc847b1f1feffe49fd8b211f2aa335f43ceeac8bb626095e89968444b` and
currently measures **12,748 UTF-16 code units but 12,821 UTF-8 bytes**. The
result JSON labels 12,748 as bytes. ASCII scenarios are unaffected; the demo
MB/s label is not literally byte throughput.

Ruling recommended: preserve `.length` only in the named P-3 compatibility
calculation, record it as `legacy_code_units_per_second`, and use
`Buffer.byteLength(source, "utf8")` for every new MB/s claim. Qualification
records both UTF-8 bytes and UTF-16 code units so Unicode-heavy work cannot be
hidden by a unit choice.

## 2. Non-contrived workload lattice

Every timed case has a manifest row containing: corpus ID and SHA-256; origin;
spec/source commit; public door and operation; owning module/wave; maturity;
accept/recover/reject class; UTF-8 bytes; UTF-16 units; expected normalized
result/diagnostic digest; and applicable comparison subjects. Hand-selected
“fast examples” are forbidden.

### T0 — frozen historical compatibility

Keep exactly the five P-3 inputs and their recorded digests:

- `value-historical`: 10 values, digest
  `27d54ed8ea6b809a4d1e60063274b0aa00ba2fbd172dc8f712d27e3102bcdf09`;
- `sheet-historical`: digest
  `3c85ecaf55dd5e25e8658b95553d890bac57d452f61f926bbb5c3343f90bce55`;
- `sheet-demo`: digest
  `a64eb64fc847b1f1feffe49fd8b211f2aa335f43ceeac8bb626095e89968444b`;
- `value-common`: digest
  `b6a3c77f3986efd0d882c10b16e8707a5ff31e606a34c79d238e9180655906e5`;
- `sheet-common`/C14 corpus: digest
  `ab43f1dcc6bcfba1d9558e50947587f1a4deb5def4885272a9ab41db07889b4f`.

T0 is immutable and small by design. It answers “did the new prototype beat
the recorded implementations on identical old work?” It cannot establish full
CSS coverage.

### T1 — per-door conformance workloads

At each feature-wave close, derive the timed set mechanically from that door's
already-ratified differential/conformance bank:

- all ordinary accepts, partitioned by grammar production and short/median/long
  source-size strata;
- all ordinary rejects, timed separately so cheap early refusal cannot improve
  an accept headline;
- recovery inputs, also separate, for L4 doors;
- serialization/edit operations separate from parse operations;
- hostile/limit cases excluded from headline throughput and included in the
  scale/limit lane below.

Selection is “all rows” while tractable. If a bank is too large, PB0 freezes a
seeded, digest-ordered stratified sample before implementation: equal coverage
per production/maturity/result class, then lowest hash values. Authors may not
choose the subset after seeing timings. Phase-A's existing minimum of 50 accept
and 20 reject vectors per door is the semantic floor, not permission to pad a
benchmark with replicated literals.

T1 gives modular attribution. For example, color, easing, timeline, value,
analysis, and stylesheet adapters are separate even though `value-common`
currently mixes a color and an easing. A join scenario is additional evidence,
never the only evidence for a module.

### T2 — occurrence-derived CSS L4 corpus

PB0's reviewed 76-root operation matrix is the source of truth. Each timed L4
row must bind an exact normative/conformance occurrence to an expected parser
operation and result. Spec prose membership alone is not executable evidence.
The corpus grows only when the associated operation row is ratified, and its
manifest is versioned/digested at every wave.

This avoids two contrivances: generating pleasant inputs from the parser's own
grammar, and timing generic “unknown” acceptance as though it were typed CSS L4
work. `parseStylesheetL4`, typed value, selector, condition, color expression,
and serialization doors each get their own corpus and result digest.

### T3 — real-source integration

Build a content-addressed manifest from first-party repository CSS and any
owner-approved external corpora. The current repo has natural size diversity
(roughly 1.9 KB through 46 KB among first-party demo sheets), but only
`animations.css` is presently a pinned comparative input. Before another file
earns benchmark authority it needs a fixed commit/path/hash, license/provenance,
declared parse goal, and oracle-classified expected result. Worktrees,
`node_modules`, generated duplicates, and copies of the same source are
excluded from the denominator.

T3 reports a weighted total only after reporting every file independently.
Weight is actual UTF-8 bytes, not repeated invocations or a hand-tuned blend.

### T4 — scale, hostile, and limit workloads

Use deterministic transformations of accepted fixture documents, each named as
stress evidence rather than real-world throughput:

- concatenate complete independent rule blocks/documents at geometric sizes;
- extend naturally repeated grammar members (selector lists, declaration
  lists, stops, component values) while preserving validity;
- increase balanced nesting and recovery boundaries to each frozen limit and
  `limit+1`;
- apply the audited hostile mutation operators to a pinned seed and record the
  resulting corpus digest.

Do not benchmark random gibberish or repeat one trivial token as the headline.
T4 proves bounded behavior: time, allocation, retained heap, and Phase-B work
counters versus UTF-8 bytes, tokens, nodes, and diagnostics. PB0 must freeze
the expected complexity class and work budget per operation; this research
does not invent one universal numeric budget for grammars that do different
work.

## 3. Measurement protocol

### 3.1 Build and environment identity

Every comparison uses production-mode bundles made with identical flags and
tool versions. Preserve the P-3 flags
`--bundle --format=esm --platform=node --define:import.meta.env.DEV=false
--external:prettier`; add source maps only if added uniformly to every freshly
built subject. Record input-source digest, bundle digest, parse-that package
name/version/tarball integrity, lockfile digest, esbuild version and flags.

Record Node, V8, OS/release, architecture, CPU model/core count, power mode,
and relevant environment flags. Runs with a mismatched reference environment
remain valid same-run comparisons but cannot overwrite the historical
machine-of-record vector. No results from different Node/V8 builds are merged.

Each subject/scenario/invocation runs in a fresh process. Rotate subject order
across invocations; do not always run the candidate last. Run the normalizer in
the same process and report raw throughput as well as normalized throughput.
Output material must be consumed into a deterministic checksum to prevent
dead-code artifacts.

### 3.2 Warmup, samples, and invocations

Keep P-3 compatibility at exactly five invocations × fifteen samples ×
`N=1000`, with its 50 warmups per sample.

For the qualification lane:

- a non-gating smoke run is one invocation × seven samples;
- wave qualification is five fresh invocations × fifteen samples;
- W7/PB13P/perfection qualification is ten fresh invocations × fifteen samples;
- before sampling, warm each process for
  `clamp(50, ceil(1 MiB / corpusUtf8Bytes), 5000)` complete corpus passes;
- choose one `N` per scenario before subject comparison as a power of two whose
  pilot duration is nearest 200 ms, bounded to 50–1000 ms; freeze and report it
  in the scenario manifest; all subjects then use the same `N`.

Pilot/warmup observations never enter statistics. A scenario that cannot fit
the duration bound because a subject hits its declared limit is reported as a
limit/refusal result, not assigned an artificial throughput.

### 3.3 Statistics

Per sample report UTF-8 MB/s, UTF-16 Munit/s, operations/s, ns/operation, and
normalizer ratio. Per invocation use the median of fifteen samples as the
primary estimate; peak is retained only for the historical gate. Also report
median absolute deviation, min/max, and coefficient of variation.

For candidate/baseline comparison, compute the ratio of invocation medians and
a seeded 10,000-resample bootstrap 95% confidence interval; store the seed and
raw samples. Do not average ratios from unrelated machines. A faster claim
requires median ratio greater than `1.00`, confidence-interval lower bound
greater than `1.00`, and at least 80% of qualification invocations greater than
`1.00`. Otherwise the result is INCONCLUSIVE or RED, never rounded to PASS.

Outlier deletion is forbidden after inspection. An invocation invalidated for
external interruption must retain a reason/receipt and be rerun as a whole.

## 4. Metrics and attribution

### 4.1 Throughput and latency

Headline throughput is successful operation UTF-8 MB/s. Values/batches also
report operations/s because byte lengths can be tiny. Accept, reject, recover,
exact serialize, edit serialize, and canonical serialize are different rows.
No parser earns throughput credit for rejecting a corpus another subject
correctly accepts.

### 4.2 CPU

At every wave close, capture one V8 CPU profile from the invocation nearest the
median for each changed door plus its affected join. W7/PB13P profiles every
public door and the full-sheet integration case. Store raw `.cpuprofile`,
analyzer output, subject/scenario/profile digests, sampling interval, warmup,
and pass count.

Attribution tables report self and inclusive time by:

- public door/operation adapter;
- owner grammar module;
- shared scanner/lexeme, VDS matcher, numeric/color/path kernels;
- parse-that engine frames (`ok`, error merge, combinators, dispatch/memoize);
- GC and serializer/result construction.

O-4 dispatch and O-5 memoization remain prohibited without a before-profile
showing the named ladder/backtracking cost and an after-profile plus correctness
replay showing the cost moved. Profile-guided changes must not create opaque
generated grammar or merge readable feature modules merely to improve a stack
trace.

### 4.3 Allocation and memory

No memory baseline exists today, so the first hardened harness run establishes
it; this report assigns no fabricated number. In isolated `--expose-gc`
processes record:

- `process.memoryUsage()` and `v8.getHeapStatistics()` after warmup/forced GC
  and after a fixed measured pass count/forced GC;
- `process.resourceUsage().maxRSS` with its platform unit recorded;
- sampled allocation profiles from identical `--heap-prof` settings, reported
  as sampled allocated bytes per UTF-8 input byte and per produced node;
- retained-heap slope across T4 sizes and across repeated parse/discard cycles.

Final gates require no statistically established retained-heap growth per
discarded operation and no superlinear memory slope beyond the complexity
class ratified for that door. Allocation/RSS comparisons against LIVE and
deposed are reported on common operations, but are not made an equality gate
when output semantics differ. Regression against the previous accepted mirror
snapshot is controlling.

### 4.4 Deterministic work

Phase-B operations additionally report scanner steps, tokens, nodes,
backtracks/recovery actions, diagnostics, and the operation's frozen resource
counter. Fit time/work/allocation against input bytes and semantic node count
over T4. A counter that exceeds its PB0 budget, a hang, or limit `+1` that does
not refuse deterministically is semantic RED before performance is considered.

## 5. Gates

### 5.1 Correctness always precedes timing

Before a timed process starts, every input must reproduce its expected
normalized value/diagnostic/recovery digest, consume the required input, remain
no-throw, and satisfy exact/edit/canonical invariants applicable to that row.
The runner records a result checksum during timing and verifies it afterward.
Any semantic failure invalidates the timing and makes the owning wave RED.

LIVE divergences approved by R1–R12 or later addenda are compared by workload
cost only after each subject is verified against its own declared expected
result; the faster wrong result never wins. PB13P cannot waive PB13G or G-2.

### 5.2 Continuous wave gate

Run T1 at author close and again after any repair that changes that door or a
shared dependency. Compare with:

1. the immediately previous accepted mirror snapshot on the identical corpus;
2. every real historical subject implementing the same operation correctly;
3. affected shared/join scenarios.

A regression is RED when the candidate/prior median ratio is below `0.95` and
the 95% interval excludes `1.00`; `0.95–1.00` is AMBER and requires root
disposition. A new door with no prior snapshot reports a baseline rather than
inventing a regression verdict. Shared scanner/result/type changes replay all
dependent door benches, not merely the authoring module.

This 5% wave threshold is a noise/review trigger, not permission to spend 5%
per wave. The final peer-beating gate below remains strict.

### 5.3 Phase-A W7/perfection gate

Run both lanes. The existing G-3 absolute floors and OC-1 handling remain
unchanged until owner amendment. The expanded owner objective adds a separate
strict relative gate on the five exact T0 scenarios:

- mirror faster than LIVE regex and deposed on every scenario they correctly
  implement;
- mirror faster than C14 on `value-common` and `sheet-common`;
- “faster” has the statistical meaning in §3.3, using fresh same-run baseline
  measurements, not comparison of a fresh mirror number to the old aggregate;
- no T1 door or T3 real-source aggregate has an unresolved RED regression;
- CPU/allocation/scale artifacts and their digests are complete.

This is the only honest interpretation of “best both the regex variant and
previous iterations.” LIVE-relative bars cannot be invented for a CSS L4 door
LIVE does not implement.

### 5.4 Phase-B PB13P/perfection gate

For legacy overlap, retain the strict W7 peer gate. For new L4 doors:

- compare against the immediately previous accepted mirror snapshot and any
  acknowledged BBNF/other implementation only on identical operation and
  semantics;
- otherwise report an absolute, normalized, scaling, allocation, and work
  baseline without a false peer PASS;
- require every ratified operation row to have a benchmark disposition:
  measured, semantically inapplicable, or owner-approved report-only with a
  precise reason;
- require no unresolved wave regression, no superlinear/unbounded slope beyond
  the ratified operation budget, and complete raw profiles.

The final prototype performance verdict is a matrix, not one blended number.
A weighted total may summarize T3, but cannot conceal a losing door.

## 6. parse-that uplift A/B and BBNF coordination

The current prototype is pinned to `@mkbabb/parse-that@1.0.0`. An uplift from
the active bbnf-lang task becomes bench-eligible only after the coordination
boundary opens and both sides acknowledge the same content-addressed package or
commit receipt as fully implemented and hardened. A proposal, source rumor, or
unacknowledged branch is not a subject.

For each accepted uplift, run a two-factor matrix on the exact same grammar and
corpora:

| factor | control | candidate |
|---|---|---|
| grammar | last accepted V·π snapshot | current V·π snapshot |
| engine | parse-that 1.0.0 | acknowledged uplift artifact |

This separates grammar gains from engine gains and detects an uplift that is
fast only because behavior changed. The uplift must pass the complete semantic,
no-throw, diagnostic, limit, and result-digest replay before its timing is
admissible. Record package integrity, API delta, feature flags, source/bundle
digests, and the acknowledged BBNF batch digest. Communicate raw scenario and
profile digests back through the owner-mediated, acknowledgement-gated channel;
never copy private BBNF source or accept a claimed optimization without the
artifact receipt.

Adoption requires no controlling door regression, an explained profile delta,
and the ordinary E-3/owner authority for changing the exact engine pin. Keep
the 1.0.0 vector after adoption so future results show whether a win belongs to
the readable grammar or the engine uplift.

## 7. Required prototype structure

The benchmark layout should mirror the modular grammar rather than become one
W7 script:

```text
pi/mirror/bench/
  manifest/          # content-addressed scenario/subject/environment rows
  corpus/
    legacy/          # immutable T0
    doors/           # T1, grouped by grammar owner
    l4/              # PB0-derived T2
    real/            # T3 manifests or pinned fixtures
    scale/           # T4 recipes, seeds and expected digests
  adapters/          # one operation adapter per public door/subject
  runners/           # compatibility, qualification, cpu, memory, work
  reports/           # raw runs, aggregates, profiles and verdict matrices
```

Adapters may import modular grammar doors; they may not duplicate grammar,
normalize away semantic differences, catch failures as successes, or embed
corpus strings in timing code. Shared timing/statistics code stays independent
of feature modules. Generated manifests/data are reported separately from
authored harness LOC under E-2.

## 8. Precise gaps/blockers

1. **No mirror bench exists.** `bench/stub.ts` is the only prototype runner.
2. **The reusable proof rig is ephemeral.** Required harness/subject artifacts
   live under `~/.claude/.../tmp`; the repository holds aggregates but not a
   self-contained reproduction path.
3. **P-3 mislabels UTF-16 length as bytes.** Compatibility must preserve it;
   qualification must not.
4. **P-3 verifies success, not semantic result identity, and has no timed
   checksum.** A wrong-but-successful parse could receive timing credit.
5. **P-3 uses peak-of-15 for its gate.** Keep it for the legacy bar, but it is
   unsuitable as the sole estimator for a new “fastest” claim.
6. **No allocation, retained-memory, or deterministic-work evidence exists.**
   PB13P names these but supplies no method or threshold.
7. **W7 is terminal-only.** The current wave sheet has no per-feature
   performance replay, so regressions can accumulate without attribution.
8. **The current relative W7 bar is only mirror ≥ deposed.** The owner's new
   objective requires an E-3 amendment making LIVE the controlling Phase-A
   peer where comparable and retaining C14 as a common-corpus predecessor.
9. **No L4 comparator has equivalent semantics.** New-door claims must remain
   baseline/regression/scale evidence until a valid peer exists; generic
   unknown-rule acceptance is not equivalent typed parsing.
10. **PB0 has not frozen final door/operation ownership, limits, or work
    budgets.** T2/T4 manifests and exact PB13P gates cannot close before that
    occurrence-derived addendum.
11. **No accepted parse-that uplift receipt is available through the currently
    closed BBNF coordination boundary.** The two-factor uplift lane is ready in
    design but has no candidate artifact to measure.

## 9. Recommended addendum decisions

1. Amend W7 into a continuous rail: T1 at every feature/repair close, full T0
   plus T1/T3 at W7, and T2/T4 at PB13P.
2. Ratify the two-lane rule so historical P-3 remains comparable while all new
   headline throughput uses real UTF-8 bytes and robust statistics.
3. Ratify LIVE + deposed + C14 as the exact Phase-A predecessor set and require
   fresh same-run strict wins at perfection close; preserve the historical
   absolute floors as a separate owner-controlled clause.
4. Require PB0 to emit benchmark dispositions, complexity/work budgets, and
   deterministic corpus selection for every operation row.
5. Harden the recovered harness and exact reconstruction receipts into the
   self-contained prototype proof tree before any new measurement is called
   reproducible.
6. Admit a bbnf-lang parse-that uplift only through acknowledged artifact
   identity, semantic replay, and the two-factor A/B matrix.

Until those decisions are ratified, the valid claims remain exactly the ones
in §1: P-3 and P-4 measured the old subjects; the V·π mirror has not yet been
benchmarked.

---

Research receipt: Codex benchmark-rail research seat; evidence inspected from
the V·π sheets, Phase-B addenda, W7 brief, durable parser-proof artifacts,
current mirror package, and recovered harness/profile sources. No benchmark was
run and no measurement was invented.
