# O5 — benchmark equivalence, process economy, convergence, total-tranche gestalt

**Seat:** O5 (fifth hostile skeptic, V·π receiving audit)
**Subject:** frozen `AUDIT-SUBJECT.json` — 2,324 files / 354,220,932 bytes / entirely untracked
**Repository:** `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e0b252cda7f8490b67f182a48c48cc0ed`
**Report status:** IMMUTABLE on write. No subject byte was edited.

---

## Model receipt

- **Model identifier I observe myself to be:** `claude-opus-5[1m]` (declared to me in-session as
  "Opus 5 (1M context)"; exact model ID `claude-opus-5[1m]`).
- **Effort level:** high. I ran executable replays rather than reading summaries.
- **Independence:** I have no prior V·π authorship. I did not write, review, or adjudicate any
  byte of the subject. I treated every claim in it as adversarial.
- **Caveat I am obliged to state:** the model identifier above is what my harness reports to me. I
  cannot cryptographically self-attest served weights. If the adjudicators require a served-model
  receipt beyond a self-report, this seat's model line must be corroborated from the host rollout
  record, exactly as `FINDINGS.md` row A13 demands of historical labels. My *findings* do not
  depend on my identity: every one of them is a command anyone can re-run.

---

## 1. What I actually executed

Everything below was run by me on the same machine and runtime the subject's own benches pinned
(Apple M5 Max, Darwin 25.4.0, Node `v26.0.0`, V8 `14.6.202.33-node.19`, 18 logical CPUs,
137,438,953,472 B RAM), using the subject's own `mirror/node_modules` (`@mkbabb/parse-that@1.0.0`,
`tsx@4.20.3`) via a symlink from a scratchpad workspace outside the subject.

| # | command / action | purpose |
|---|---|---|
| 1 | `npm run check` + `npm test` in `pi/mirror` | verify the active root's claimed green |
| 2 | `shasum -a 256` over G16 lane sources, manifest, harness, raw NDJSON, `result.json` | identity |
| 3 | `python3` recomputation of the entire G16 inference from `raw-first-attempt.ndjson` | reproduce the estimator |
| 4 | `git show 9aedfc50^:src/parsing/utils.ts`, `git show 164343c1^:src/parsing/utils.ts`, `diff` | establish the deposed peer's true provenance |
| 5 | **new 5-lane replication harness** (`o5-replay.mts`, ~200 lines) with a semantic preflight against the frozen 64-row G16 corpus | measure the peers G16 declined to time |
| 6 | 3 pair-lanes × 9 fresh processes × 15 blocks × 6,000 corpus reps (≈ 2.6 × 10⁸ timed operations) | the decisive measurement |
| 7 | **new percentage replication harness** (`o5-pct.mts`) restoring the `live-regex` lane G0/v3 and G2 dropped | measure the percentage lane's real peer |
| 8 | byte/char/UTF-16 analysis of `demo/styles/animations.css` against the parser-proof corpus declaration | the MB/s unit hunt |
| 9 | ledger arithmetic over `audit-subject-ledger.tsv` (2,324 rows) | process economy |
| 10 | `stat -f %Sm` mtime census over `mirror/cells`, `mirror/prototypes`, `denominator` | the true work window |

**What I sampled and what I did not.** I read *in full*: `AUDIT-BRIEF.md`, `FINDINGS.md`,
`HANDOFF-2026-07-24.md`, `FEATURE-LEDGER.md` §1–§2.2, the complete `g16/` cell (39 files), the
complete `value-percentage-literal/` cell (50 files), `g14/benchmark-manifest.json` +
`benchmark-result.json`, `g15/ROOT-DISPOSITION.md` + `bench/benchmark-manifest.json`,
`g7/lineage.json`, `foundation-g2/evidence/benchmark-directional.json`,
`foundation-g4/bench/*`, and `parser-proof/{GATE-VERDICT.md,bench-results.json,bench.md}`.
I sampled `raw-agent-messages/value-v-pi-refinement.md` (8,025 lines) by grepping the 212 lines
matching `faster|slower|MB/s|throughput|benchmark|strict win|peer win` and reading every one, plus
the 3×5×3 self-criticism cluster (lines 4328, 4560, 4904, 5758, 6297, 6494, 7599, 7613). I read
`raw-prompts/value-v-pi-refinement.md` only at the 3×5×3 origin (line 1378) and the ADDENDA-07
method restatements. **I did not read**: `bbnf-greenfield-coordination.md` (16,599 lines),
`value-tranche-v-formation.md` (5,796 lines), any `raw-agent-envelopes/*.jsonl` plaintext (they are
encrypted; I classify them per §8), `ADDENDA-06` (333,616 B), or the 255 MB `denominator/` payloads
beyond size/structure/rejection-status metadata. Nothing in my findings depends on the unread bytes.

---

## 2. Findings

Severity key: **BLOCKER** = defeats a stated acceptance; **MAJOR** = defeats a stated claim;
**MINOR** = real but non-decisive; **INFO** = confirmed-true, recorded for the adjudicators.

---

### O5-F01 — The G16 "strict equivalent peer win" is a harness artifact. Neutralize the adapter and the win vanishes in 9 of 9 runs.
**Verdict: CONFIRMED · BLOCKER**

`acceptance.json` records `"qualification": "PASS_STRICT_WIN"` against `"peer": "exact deposed
operation-equivalent consume-number recognizer"`. The handoff §7 inventory compresses this to
"strict equivalent peer win", and `FINDINGS.md` F02 books it `ACCEPTED_FACT`.

The two lanes are **not** operation-equivalent. `bench/benchmark.mts:155–181`:

```ts
const h2: Lane = { id: "h2", run(source, offset) {
    const state = new ParserState<Leaf>(source, undefined, offset);
    h2Number.call(state);                       // ← leaf built INSIDE .map, free
    return { end: state.offset, leaf: state.value };
}};
const deposed: Lane = { id: "deposed", run(source, offset) {
    const state = new ParserState<number>(source, undefined, offset);
    deposedNumber.call(state);
    const end = state.offset;
    const representation = source.slice(offset, end);          // ← extra slice
    const first = representation[0];
    const leaf: Leaf = {
        sign: first === "+" || first === "-" ? first : null,
        type: representation.includes(".") || /[eE]/.test(representation) ? "number" : "integer",
        value: state.value,                                    // ← extra object + regex .test
    };
    return { end, leaf };
}};
```

The peer pays a substring slice, a `.includes`, a `RegExp.test`, and an object literal **per
operation** that the candidate does not. The measured effect is 7.07 % (2.5 ns/op on a ~65 ns/op
budget) — the same order as the adapter.

`reviews/skeptic-4.md:124` saw the hazard and stopped at prose: *"it cannot be widened into a claim
that H2's parser core alone is 7.07 % faster."* Nobody measured it. I did.

I built `deposedFair`: the **same** deposed regex bytes with the leaf built inside `.map`, exactly
as H2 does — a one-line change to the peer that the historical codebase could have made trivially:

```ts
const deposedFairParser = regex(/-?(?:(0|[1-9]\d*)(\.\d+)?|\.\d+)([eE][+-]?\d+)?/)
    .map((representation): Leaf => ({ sign: …, type: …, value: Number(representation) }));
```

Preflight: `deposedFair` passes **64/64** of G16's own frozen corpus
(`corpus_sha256 084d40cceed3cce481e23cbac1ca288c2af2899fad515dc948115c0aed9fd46b`, verified by me)
on exact `end`, `sign`, `type`, and binary64 bits.

**Result — 9 fresh processes per pair, 15 sample blocks each, 6,000 corpus reps/block
(5.76 × 10⁶ ops/block/lane), alternating lane order, Node v26.0.0 / Apple M5 Max:**

```
pair                    n   median h2/peer   min      max      all nine
h2 vs deposedG16        9   0.8906           0.8649   0.9260   [.881 .902 .891 .902 .905 .865 .926 .883 .876]
h2 vs deposedFair       9   1.0269           1.0146   1.0642   [1.064 1.015 1.027 1.038 1.026 1.064 1.018 1.039 1.015]
```

- Against **G16's adapted peer** I reproduce and exceed G16's result (0.891 vs G16's 0.929) —
  G16's raw measurement is real.
- Against the **fairly constructed same-regex peer**, H2 is **slower in 9 of 9 runs**, median
  +2.7 %, minimum +1.5 %. There is no win.

**Consequence.** The 7.07 % is the harness, not the parser. `FINDINGS.md` G07 already forbids this
(*"timing unlike operations supports a strict win — REJECTED_CLAIM; semantic and operation
equivalence precede timing"*). G16 declared the asymmetry in its manifest
(`operation.deposed`: *"derive sign/type/end from the consumed source span … construct one
equivalent mutable leaf"*) and then called the result operation-equivalent anyway. Five skeptics,
five v2 skeptics, three adjudicators, and four preflight audits — 1,608 lines of review prose —
passed it.

**Evidence:** `mirror/cells/syntax-consume-number/g16/bench/benchmark.mts:155–181`;
`g16/bench/benchmark-manifest.json` `operation.deposed`; `g16/acceptance.json` `performance`;
`g16/reviews/skeptic-4.md:124`; my replay above.

---

### O5-F02 — The chosen "deposed" peer is the last revision *before* value.js's own performance tranche deposed it. The actually-retained predecessor is 15 % faster than the accepted candidate and was never timed.
**Verdict: CONFIRMED · BLOCKER**

`g7/lineage.json` pins the peer's provenance exactly and honestly:

```json
"origin": { "repository": "value.js", "commit": "9fce504a5764258c8e56b0ce77cd656c725a4907",
            "path": "src/parsing/utils.ts", "git_blob": "cbb57ab5327bc0afa667fbd13ad98d77f3b610de" }
```

I verified all three: the commit exists (`feat(N): 0.13.0 …`, 2026-06-16), the blob hash matches,
and `g7/authorities/historical-utils.ts` is **byte-identical (7,656 B, 0-line diff)** to
`git show 9aedfc50^:src/parsing/utils.ts`.

`9aedfc50` is `perf(O.W6): SOTA hot-path rewrites — byte-loop scanners + first-char dispatch
(closes O)`, 2026-06-19. That commit **replaced** the very line G16 times:

```
-export const number = regex(/-?(?:(0|[1-9]\d*)(\.\d+)?|\.\d+)([eE][+-]?\d+)?/).map(Number);
+export const number = numberFastParser;      // scanNumberFast byte loop
```

So G16's sole timed peer is the pre-optimization ancestor that value.js's own history retired **for
performance**, three days after it was written and five weeks before the v4 rewrite.

This was not an oversight. `g7/lineage.json` says so out loud:

```json
"excluded_h_ancestry": [
  { "identity": "current scanner-era numberFastParser",
    "reason": "Post-historical scanner optimization is excluded from G7 H ancestry." } ]
```

Excluding a scanner-derived *ancestor* from candidate lineage is correct (it protects candidate
independence from the rejected architecture). **Carrying that exclusion into the *peer set* is
not** — owner law 8 names *"the live regex and retained parse-that predecessors"*, and
`numberFastParser` was the retained parse-that predecessor at the moment of retirement.

I reconstructed `scanNumberFast` verbatim from `9aedfc50^` and wrapped it in a lane with the
**same** leaf construction as H2 (no adapter, no oracle). It passes 64/64 of G16's frozen corpus.

```
pair                    n   median h2/peer   min      max      all nine
h2 vs byteLoop          9   1.1484           1.0989   1.2080   [1.142 1.208 1.148 1.153 1.099 1.133 1.157 1.156 1.132]
```

**The accepted candidate is ~15 % slower than the predecessor it is meant to replace**, in 9 of 9
runs, on the accepting benchmark's own corpus, on the accepting benchmark's own machine.

Grep of the entire 2,324-file subject for `scanNumberFast|numberFastParser`: **three hits**, all in
`g7` provenance metadata and the raw agent archive. **Zero** hits in any review, synthesis,
preflight audit, benchmark, addendum, `FINDINGS.md`, or either handoff.

**Evidence:** `g7/lineage.json` `seats.h.inputs[0].origin` and `excluded_h_ancestry[1]`;
`git log -S numberFastParser -- src/parsing/utils.ts` → `9aedfc50`; byte-diff above; my replay.

---

### O5-F03 — Two harnesses in this tranche, same peer bytes, same machine, report 1.69× and 0.93×. Neither is neutral; the neutral answer is a dead heat.
**Verdict: CONFIRMED · MAJOR**

`g14/benchmark-result.json` — same peer file (`g7/authorities/historical-utils.ts`, sha
`73e6a973…`), a **three-peer** qualification gate (`live_regex`, `deposed`, `c14`):

| candidate | vs deposed (geo-mean ratio) | pass? |
|---|---|---|
| h | **1.6907** | false |
| b | **4.7766** | false |
| s | **3.7401** | false |
| d | 1.36 (per root message) | false |

`"qualification": { "h": "FAIL_NOT_STRICTLY_FASTER_THAN_ALL_THREE_PEERS", … }` — all four.

G14's harness (`g14/benchmark.mts:94–119`) is asymmetric the *other* way:

```ts
function normalize(task: Task, token: string, localEnd: number, value: number): Observation {
    const leaf: Leaf = { sign: task.sign, type: task.type, value };   // ← ORACLE fields
    return { end: task.offset + localEnd, leaf };
}
```

Every lane's normalized leaf takes `sign`/`type` **from the fixture oracle**. The candidates still
build their own intrinsic leaf first (real derivation, second allocation); the peer builds one leaf
with oracle-supplied metadata. G16's manifest explicitly forbids exactly this
(`"oracle_fields_passed_to_lanes": []`) — a correct repair — but replaced it with the opposite
asymmetry (F01).

The tranche is aware of half of this. `g15/reviews/skeptic-3.md:29`: *"This repairs G14's obvious
operation-asymmetry defects."* No document anywhere reconciles **1.6907 → 0.9293** numerically.

**How much of the swing is legitimate?** The root's own contemporaneous report resolves it, and I
credit it: `raw-agent-messages/value-v-pi-refinement.md:5198` — after the harness correction, H was
`1.030×` deposed (still a loss), the author diagnosed *"its decimal-first alternation scans an
integer twice"* and **optimized the grammar** (H → H2, digit-first mantissa ordering), reaching
`0.9441×` (line 5234). That optimization is real engineering, ~9 %, and I do not impugn it.

But the arithmetic then closes cleanly on F01: 1.030 (H, adapter already charged to the peer) − 9 %
(the H2 optimization) ≈ 0.94 ≈ G16's 0.929; and removing the adapter puts H2 back at 1.027. **The
H2 grammar gain is real; the reported peer win is the adapter.**

**Evidence:** `g14/benchmark-manifest.json` `statistics.comparisons` and `candidate_qualification`;
`g14/benchmark-result.json` `exact_third_run.comparisons` + `qualification`;
`g14/benchmark.mts:94–98`; `g16/bench/benchmark-manifest.json` `operation.oracle_fields_passed_to_lanes`;
`g15/reviews/skeptic-3.md:29`; raw messages 5198, 5234.

---

### O5-F04 — "All four beat LIVE regex" (G14) and "2.5× the live public parser" (percentage) are specialized-leaf-vs-general-dispatcher comparisons. The tranche built the operation-equivalent live peer, lost to it by 21 %, and then dropped that lane.
**Verdict: CONFIRMED · BLOCKER**

The percentage cell is the cleanest proof because the tranche authored both peers itself.

`g0/benchmark-peers.ts:25–33` — an honest, correct artifact:

```ts
/** Operation-equivalent extraction of the current LIVE scalar regex's numeric arm. */
export function liveRegexPercentage(source: string): CssPercentage | null { … }
```

`g0/benchmark-v2.mts:11,42` imports and times it. The **one and only** run of that lane,
`g0/evidence/benchmark-v2-first-attempt.json`, `"status": "FAIL"`:

```json
"b_over_live-regex": { "geometricMeanRatio": 1.2110144310043667,
                       "oneSided95UpperRatio": 1.2290711804081016,
                       "strictWin": false }
```

**21.1 % slower than the operation-equivalent live regex.** Honestly reported to the owner at the
time (`raw-agent-messages:6085` — *"about 21 % slower than the operation-equivalent live regex
kernel … I'm not relabeling it green"*). Credit where due.

Then `benchmark-v3.mts:8–11` and `g2/bench/benchmark.mts:6–9` **drop the `live-regex` lane** and
substitute `parseCssScalar` from `src/css/grammar.ts` as `live-public`. Grep of the whole subject:
`liveRegexPercentage` appears in exactly two files, both v2-era; zero occurrences in v3, G2, any
review, `FINDINGS.md`, or either handoff.

`parseCssScalar` is not the same operation. It is the full live scalar dispatcher: `var`/`env`
probe, context-color regex, non-CSS-space probe, hex match, function-call match, then the
numeric/dimension branch, then `deepFreeze` of the result (`src/css/grammar.ts:260–334`). Timing a
percentage-only leaf against it on a percentage-only 16-row corpus measures dispatch overhead.

`g2/bench/raw-attempt-1.json` reports `public_vs_live` geo-mean `0.3963` (a 2.5× "win"). My
replication, pairwise, 5 fresh processes, 4,000 reps × 25 blocks:

```
lane pair                     candidate/peer ratio (5 runs)                    median
g2-internal vs live-regex     1.0661 0.9972 1.0958 1.0332 1.0080               1.0332   ← ~3% SLOWER, never a win
g2-internal vs prior-internal 0.8600 0.8326 0.8498 0.8332 0.8536               0.8498   ← see F05
g2-internal vs live-public    0.1630 0.1596 0.1614 0.1638 0.1602               0.1614   ← 6.2× "win" = dispatcher
```

The same substitution happened at consume-number: G14's `live_regex` lane is
`parseCssScalar` bundled read-only (`g14/benchmark-manifest.json` `peers.files[0]` =
`src/css/grammar.ts`, sha `40f8e379…`), which is why
`raw-agent-messages:4757` told the owner *"all four parsers are decisively faster than LIVE regex
and C14"* while the operation-equivalent measurement (this finding, and F07's engine-scale gate)
says the opposite.

**Consequence for the handoff.** `FINDINGS.md` F12 reads *"exact benchmark beats public peers but
loses prior internal lane"* and handoff §7 reads *"unaccepted; current benchmark loses prior
internal lane"*. **Both omit the 21 % loss to the operation-equivalent live kernel** — the single
most decision-relevant number in the percentage cell. This is `FINDINGS.md` G08's own forbidden
pattern (*"candidate-relative timing supports a full-parser win — REJECTED_CLAIM"*) surviving into
the handoff as a summary that keeps only the flattering peer.

**Evidence:** `g0/benchmark-peers.ts:25–33`; `g0/benchmark-v2.mts:11,42`;
`g0/evidence/benchmark-v2-first-attempt.json` `comparisons.b_over_live-regex`;
`g0/benchmark-v3.mts:8–11`; `g2/bench/benchmark.mts:6–9`; `g14/benchmark-manifest.json`
`peers.files[0]`; `src/css/grammar.ts:260–334`; my replay above.

---

### O5-F05 — The percentage lane's honest result is `FAIL`, and my replication cannot reproduce even its one internal comparison. The G2 harness is co-residency-sensitive.
**Verdict: PARTIALLY_TRUE · MAJOR**

`g2/bench/raw-attempt-1.json` `"status": "FAIL"`, `internal_vs_prior` geo-mean `1.0840`, upper
`1.1597`, `strict_win: false` — the accepted-architecture composition
`consumeNumber.skip(string("%"))` is 8.4 % slower than the pre-reset "rejected architecture" parser
it replaces. That is honest and I confirm the file says it.

But the number does not survive re-measurement. G2 runs **five lanes co-resident in one process**
through a single polymorphic `parseValue(lane, source)` switch (`g2/bench/benchmark.mts:41–53`)
with a Latin rotation. That makes the dispatch site megamorphic and its inline-cache pollution is
not symmetric across lanes. Running the same two lanes pairwise (2-way IC), I measure the candidate
**16 % faster** than `prior-internal` (0.8498 median, 5 runs) — the opposite sign.

I do **not** claim the candidate is faster. I claim **the G2 result is not robust to a harness
choice the manifest never justified**, so `internal_vs_prior = 1.0840` should be read as
`UNRESOLVED`, not as a measured 8.4 % deficit. The same co-residency criticism applies to my own
4-lane run (I discarded it and report only pairwise numbers).

**Evidence:** `g2/bench/benchmark.mts:41–53`, `g2/bench/manifest.json` `protocol.schedule`
("five-lane Latin rotation by sample_index modulo 5"); `g2/bench/raw-attempt-1.json` `comparisons`;
my pairwise replay.

---

### O5-F06 — G16's inferential arithmetic is exactly reproducible and its raw retention is honest. Credit where due.
**Verdict: CONFIRMED · INFO**

I recomputed the entire G16 inference from `bench/evidence/raw-first-attempt.ndjson` (545 lines,
sha `372fef4094e34b1b78d9ab8e48fcf36bcda7557f2e8ba54cac637c222de11e54` — matches `result.json`
`attempt.raw_sha256`; 1 start / 1 bindings / 1 controller_environment / 30 child_spawn / 30
child_environment / 30 semantic_preflight / 30 warmup_complete / **360 sample_block** / 30
replicate_summary / 30 child_exit / 1 inference / 1 terminal):

```
mean_log_ratio   recomputed -0.07336197220979548   reported -0.07336197220979548   EXACT
sample_sd        recomputed  0.027244341177386378  reported  0.027244341177386378  EXACT
95% upper        recomputed -0.06491032168356216   reported -0.06491032168356216   EXACT
geo-mean ratio   recomputed  0.9292644012517273    reported  0.9292644012517273     EXACT
blocks where h2 slower: 16 of 360
```

Zero retries, zero deleted blocks, zero non-empty worker stderr, one attempt ID, `wx` exclusive
open. **This is the best-executed benchmark rail in the subject**, and the append-only discipline
(`FINDINGS.md` G05) was genuinely honoured. My F01–F03 findings are about *what* was compared, not
about fabrication.

**Evidence:** my recomputation above vs `g16/bench/evidence/result.json` `inference`.

---

### O5-F07 — `result.json` publishes four descriptive statistics that are not derivable from the sole retained attempt. An erratum exists; the handoff and `FINDINGS.md` never mention it.
**Verdict: CONFIRMED · MINOR**

`g16/bench/evidence/result.json:49–52` states `h2_block_median_ns: 20278396`,
`h2_block_mad_ns: 252020.5`, `deposed_block_median_ns: 21099104`, `deposed_block_mad_ns: 376312.5`.
The harness `benchmark.mts` contains **no median or MAD code at all** (`grep -n "median\|mad"` →
zero hits), so these were computed by hand outside the sealed rail.

Recomputed over all 360 retained blocks: `21818104 / 576396 / 23620145.5 / 749750`. I searched for
the reported values under order-restricted subsets, per-`block_index` subsets, per-child subsets,
and both orders within each child. `20278396` is exactly the **minimum of the 30 per-child
medians** — the best child. `21099104` matches nothing I could construct. None of the four literals
appears anywhere in the raw NDJSON.

`g16/correction/benchmark-erratum.json` catches this and its corrected values match my
recomputation to the digit (`21818104 / 576396 / 23620145.5 / 749750`,
`"timing_rerun": false`, `"sample_or_process_removed": false`). Full credit for the erratum.

**But**: the wrong values remain on disk in `result.json`, which is itself content-addressed into
`acceptance.json`'s proof chain; and neither `HANDOFF-2026-07-24.md` §7 nor `FINDINGS.md` F02
mentions that the accepted feature's benchmark result carries a superseded field set. A reader who
follows the handoff's own reading order never learns the erratum exists. The same pattern recurs at
`foundation-g4/bench/raw-attempt-2.json`, whose literal `"status": "PASS_FIRST_ATTEMPT"` is corrected
only by a side-car `attempt-2-erratum.json`.

**Evidence:** `result.json:49–52`; `benchmark.mts` (no median code); my subset search;
`correction/benchmark-erratum.json`; `foundation-g4/bench/attempt-2-erratum.json`.

---

### O5-F08 — UTF-16 code units *are* reported as bytes in the historical parser-proof gate. Magnitude 0.57 %; no verdict impact; the G09 lie is nonetheless on disk.
**Verdict: CONFIRMED · MINOR**

`parser-proof/bench-results.json` `corpus.demo_sheet`:

```json
{ "path": "demo/styles/animations.css", "bytes": 12748,
  "sha256": "a64eb64fc847b1f1feffe49fd8b211f2aa335f43ceeac8bb626095e89968444b" }
```

`parser-proof/bench.md:56` repeats it as "12 748 B". Measured:

```
utf8 bytes        : 12821
UTF-16 code units : 12748       ← the declared "bytes"
sha256            : a64eb64f…   ← matches (so the file is right; the count is not)
non-ASCII chars   : 40   ('—'×17 '─'×12 '·'×4 '→'×3 '§'×3 '≤'×1)
```

Every `mbps` figure for the `sheet-demo` scenario (live 33.8155, deposed 30.8609) is therefore
computed over `source.length`, not UTF-8 bytes, and understates true UTF-8 throughput by 0.57 %.
The gate statistic is a *ratio* against a same-convention denominator and `sheet-demo` is not the
failing scenario, so **no verdict changes**. But `FINDINGS.md` G09 (*"UTF-16 code units may be
reported as UTF-8 MB/s — REJECTED_CLAIM; unit identities remain explicit"*) is violated in the
exact artifact project memory cites for the 1.8× claim, and the label "MB/s" is wrong there.

I checked the V·π benches for the same defect: G16 reports `ns/op` only and never a throughput unit
(`"throughput_units_reported": false` in G13/G14 too). Three G16 corpus rows (`c54`, `c55`, `c58`)
have UTF-8 ≠ UTF-16 lengths, but G16 never divides by a length. **V·π itself is clean on G09.**

**Evidence:** `parser-proof/bench-results.json` `corpus.demo_sheet`; `parser-proof/bench.md:56`;
my byte/char measurement.

---

### O5-F09 — The three performance records are mutually consistent, and together they say the replacement has no speed case anywhere. The handoff's close condition is therefore unsatisfiable as written.
**Verdict: CONFIRMED · BLOCKER**

The brief asks whether G16, the percentage lane, and the 2026-07-20 parser-proof gate are
consistent. **They are — and the consistent picture is the opposite of the handoff's inventory
table.**

I reproduce the gate exactly from `parser-proof/bench-results.json`:

| engine | value-common MB/s (peak med) | sheet-common MB/s (peak med) | sheet-common ratio | floor | meets |
|---|---:|---:|---:|---:|---|
| **live** (regex, `src/css/grammar.ts`) | **12.7315** | **14.0582** | 0.1261 | 0.10 | ✅ |
| deposed (parse-that) | 6.7905 | 7.6259 | 0.0683 | 0.10 | ❌ |
| c14 (combinator prototype) | 7.1288 | 6.0903 | **0.0537** | 0.10 | ❌ |

`0.0537 < 0.1000` → RED, `"verdict_all_runs": ["RED","RED","RED","RED","RED"]`. Project memory's
"bench RED sheet 0.0537" is **exact**. Live/c14 = 14.0582 / 6.0903 = **2.31×**; live/deposed =
14.0582 / 7.6259 = **1.84×**; on value-common live/c14 = 1.79×, live/deposed = 1.87×.
`GATE-VERDICT.md` F-4's "≈1.8× both combinator engines" is **exact**.

Now stack the three scales:

| scale | measurement | direction |
|---|---|---|
| whole engine (2026-07-20 gate) | live regex **1.8×** faster than every combinator engine; both combinator engines FAIL the sheet floor | live wins |
| composed leaf (percentage, v2) | candidate **21 % slower** than the operation-equivalent live regex kernel | live wins |
| composed leaf (percentage, G2) | candidate 8.4 % slower than prior internal (unresolved per F05); "2.5× faster than live public" is a dispatcher artifact (F04) | no win |
| atomic leaf (G16, neutralized) | candidate **2.7 % slower** than a fairly built same-regex peer; **15 % slower** than the true retained predecessor | no win |

**On what basis could any replacement be justified?** The tranche's own root-session adjudication
already answered, correctly, on 2026-07-20 (`GATE-VERDICT.md` F-4):

> *"The regex parser was slow" is dead as a retirement justification; the retirement now rests
> where it always should have — on correctness (F-2's crash and over-rejection are its defects) and
> architecture.*

That is the **honest performance posture**, and I endorse it: the replacement is justified by
**R1 — `parseCssColor("oklch()")` throws `TypeError` from `parseFunctionalColor`
(`src/css/grammar.ts` ~L181) against a frozen contract that promises clean `ok:false`** — plus R2's
10 over-rejections and the maintainability of a grammar over a regex thicket. **Not by speed.**

**But `HANDOFF-2026-07-24.md` §13 still says:**

> *V·π closes only when … and **strictly faster on every genuinely comparable retained peer lane**.*

Given the tranche's own best measurement (live 1.8× ahead at engine scale), and given that
`FINDINGS.md` G07/G08 correctly forbid the non-equivalent peers that produced the only apparent
wins, **§13's speed rail cannot be satisfied at the current architecture.** The tranche has been
resolving that contradiction by peer selection (F02, F04) rather than by amending the charter.
This is the single most consequential unresolved item for the adjudicators.

**Evidence:** `parser-proof/bench-results.json` `rows` + `gate`; `parser-proof/GATE-VERDICT.md`
F-2/F-4; `HANDOFF-2026-07-24.md` §13; F01/F02/F04 above.

---

### O5-F10 — The foundation family, called "the leading direct-combinator specimen", has zero external performance evidence by its own declaration.
**Verdict: CONFIRMED · MAJOR**

`foundation-g2/evidence/benchmark-directional.json`: `"status": "DIRECTIONAL_ONLY"`,
`"claim": "candidate-local operation-equivalent comparison; no public, full-parser, LIVE,
historical, C14, or peer win"`, `"credit": "DIRECTIONAL_CANDIDATE_SELECTION_INPUT_ONLY"`.

`foundation-g4/bench/raw-attempt-2.json` `peers` declares **every** external peer non-comparable:

```
live_regex          NON_COMPARABLE_NO_EQUIVALENT_INTERNAL_FOUNDATION_DOOR
retained_pre_reset  NON_COMPARABLE_REJECTED_TOKEN_RUNTIME_AND_DIFFERENT_RESULT_CONTRACT
c14                 NON_COMPARABLE_NO_EQUIVALENT_INTERNAL_FOUNDATION_DOOR
bbnf_engine_uplift  NON_COMPARABLE_RED_NO_ACKNOWLEDGED_CONSUMABLE_ARTIFACT
```
`claims: { candidate_relative: true, peer_win: false, full_parser_win: false }`.

The labelling is exemplary. The **consequence** is not stated anywhere: the five-operation
foundation family — escapes, identifiers, strings, whitespace, comments, i.e. the substrate every
later production sits on — carries **no** evidence toward §13's speed rail, and cannot acquire any
until someone authors operation-equivalent extractions of the live/retained doors. That work is not
in the handoff's §11 continuation order.

`FINDINGS.md` F04 correctly rejects G13/G14 directional benches for acceptance credit but is silent
on foundation's total absence of peer measurement.

**Evidence:** `foundation-g2/evidence/benchmark-directional.json`;
`foundation-g4/bench/raw-attempt-2.json` `peers` + `claims`.

---

### O5-F11 — PROCESS GESTALT: the ratios.
**Verdict: CONFIRMED · BLOCKER**

I verified the accepted output myself, from `pi/mirror`:

```
$ npm run check   → tsc strict, no emit, exit 0
$ npm test        → ✓ apotheosis/test/value-unit/numeric.test.ts (4 tests) 3ms — 1 file, 4 tests
$ find apotheosis -type f | wc -l → 6 files, 5,780 bytes total
$ wc -l apotheosis/grammar/css/l4/value-unit/numeric.ts → 17
$ shasum -a 256 (promoted == candidate) → 8c3ac689…e95aa on both
```

The accepted parser, in full, is one regex terminal and one map:

```ts
export const consumeNumber = regex(
    /[+-]?(?:[0-9]+(?:\.[0-9]+)?|\.[0-9]+)(?:[Ee][+-]?[0-9]+)?/,
).map((representation): CssNumber => ({ sign: …, type: …, value: Number(representation) }));
```

**Subject byte distribution (from the 2,324-row frozen ledger, arithmetic mine):**

| stratum | files | bytes | share |
|---|---:|---:|---:|
| `denominator/` — machine-generated analyzer output, **all 8 generations REJECTED, zero credit** | 157 | 255,457,954 | **72.1 %** |
| `mirror/node_modules/` — vendored, not authored | 1,157 | 79,477,906 | 22.4 % |
| raw session archives (prompts + agent messages + envelopes, generated at handoff time) | 10 | 9,251,900 | 2.6 % |
| **everything actually authored by the tranche** | ~1,000 | **10,033,172** | **2.8 %** |
| — of which the accepted parser | 1 | **560** | 0.00016 % |

**Defensible ratios.**

| ratio | value | denominator used |
|---|---:|---|
| process bytes per accepted line — total subject | **20,836,525** | 354,220,932 / 17 |
| — excluding vendored `node_modules` | 16,161,354 | 274,743,026 / 17 |
| — excluding vendored **and** machine-generated denominator | 1,134,416 | 19,285,072 / 17 |
| — **tightest defensible**: authored prototype + evidence + governance only | **590,187** | 10,033,172 / 17 |
| authored process bytes per accepted **source byte** | **17,916 : 1** | 10,033,172 / 560 |
| review seats per accepted feature | **44** | see below |
| generations per acceptance | **34** (40 incl. number-start) | see below |
| accepted features per attempted feature | **1 / 5 = 20 %** | consume-number ✅; number-start retired; percentage ✗; dimensions ✗; foundation incomplete |
| accepted features per generation | **1 / 34 = 2.9 %** | |

**Generations burned** (the brief's list, verified on disk):
consume-number G1–G16 = 16 · foundation G0–G4 = 5 · percentage G0–G2 = 3 · dimensions G0 = 1 ·
denominator V1–V9 = 9 → **34**. Plus `syntax-number-start` (6 generation directories on disk,
80 files, 519,415 bytes, `FINDINGS.md` F01 = `REJECTED_CLAIM`, zero credit) → **40**.

**Adversarial seats spent on the one accepted feature** (`syntax-consume-number`, 413 files /
4,918,355 bytes): g2 (2) + g5 (2) + g7 (2) + g8 (2) + g9 (2) + g10 (2) + g13 (5) + g14 (5) +
g15 (5) + g16 (10) = **37 skeptic seats**, plus g16's 4 preflight audits and 3 synthesis
adjudicators = **44 adversarial seats**. The owner's law prescribes **8** (5 skeptics + 3
adjudicators). **5.5× the prescribed cost, on the simplest operation in the CSS grammar.**

**The single sharpest artefact.** `denominator/occurrence-owner-formation-v2.json` is 69,589,449 B
(05:43); `v3.json` is 69,590,643 B (05:51) — **a 69.6 MB machine artifact re-emitted whole, eight
minutes later, for a 1,194-byte delta (0.0017 %)**. Both are rejected
(`v2-rejection.json`: `WITHDRAWN_PRE_CHALLENGE_DETERMINISTIC_REPLAY_DEFECT_ZERO_…_CREDIT`;
`v3-rejection.json`: `REJECTED_AFTER_TWO_INDEPENDENT_CHALLENGES_AND_ROOT_GESTALT`). All eight
generations end in `REJECTED_*_ZERO_CREDIT`. This is `FINDINGS.md`'s own hunted lie — *artifact
volume posing as progress* — at 255 MB.

**Evidence:** `audit-subject-ledger.tsv` (my `awk` arithmetic, reproducible);
`ls -la pi/denominator/`; the eight `*-rejection.json` `status` fields; my `npm run check`/`npm test`.

---

### O5-F12 — Was `3×5×3` an economically sound instrument at this granularity? No. It became the procedural theater owner law 9 forbids — but the *law* is sound and the *application* is what broke.
**Verdict: CONFIRMED · BLOCKER (process)**

**What the owner actually said** (`raw-prompts/value-v-pi-refinement.md:1378`, the origin):

> *"we should have no less than 3 orthogonally begat prototypes **per feature**, which shall then
> be **adjudicated** by a quintetto of skeptics that all assume they're incorrect and NOT idiomatic,
> NOT performant: it's then the job of a triumvariate to further adjudicate **those prototypes**
> into a final apotheosis."*

Two things follow from the exact words:

1. **`3×5×3` is a *selection* instrument.** The quintetto adjudicates *prototypes* (plural, against
   each other); the triumvirate resolves *those prototypes into* an apotheosis. It is not a
   per-artifact certification pass.
2. **The unit is "feature", and the owner never defined it.** `FINDINGS.md` I04 supplies the
   definition — *"feature is the smallest coherent independent operation, not every named
   constant"* — and that reading is not in the owner's words. It is the interpretation that
   maximizes the number of `3×5×3` rounds.

**What was actually executed: ≈`3×5×3` per *generation*, not per feature.** One feature consumed at
least four full quintetto rounds (G13, G14, G15, G16) plus G16's second `v2-*` round — 37 skeptic
seats where the law prescribes 5, on a 17-line regex. The instrument was additionally applied to
*pre-author admission machinery* (`benchmark-protocol.json`, `benchmark-receipt.schema.json`,
`benchmark-run-manifest.schema.json`, `author-admission-validator.mjs`, `benchmark-validator.mjs`,
holdout escrow/ciphertext/receipt), i.e. to gates deciding whether authors were *allowed to write*
candidates.

**The tranche knows.** The root said so to the owner, repeatedly and unprompted
(`raw-agent-messages/value-v-pi-refinement.md`): 4328 *"The 3×5×3 requirement was applied at the
wrong granularity"* · 4560 *"I over-applied your 3×5×3 discipline to pre-author ceremony. Your
requirement was three real implementations followed by skeptical comparison — not thirteen
generations of machinery before writing them."* · 6494 *"The 3×5×3 rule was inverted…"* ·
6737 *"The 3×5×3 law is sound when applied to actual parser candidates; it became counterproductive
when applied to elaborate machinery controlling whether authors were allowed to write those
candidates."* · 7599, 7613. `FINDINGS.md` I02 books it: *"process granularity was pathological."*

**Did it buy anything?** This is the decisive economic test, and it is testable. Apply the
instrument's own output to the two largest defects in the artifact it certified:

| defect | seats that could have caught it | seats that did |
|---|---:|---:|
| F01 — adapter asymmetry inverts the peer win | 44 | **0** (skeptic-4 named the hazard in prose at line 124, measured nothing) |
| F02 — wrong predecessor timed; true predecessor 15 % faster | 44 | **0** (`scanNumberFast` appears in 0 of 1,608 review lines) |
| F03 — 1.69× → 0.93× swing never reconciled | 44 | **0** |

I found all three in roughly 30 minutes with a ~200-line script and `git log -S`. **44 adversarial
seats produced 1,608 lines of prose dominated by hash restatement and did not perform the two
20-minute measurements that decide the acceptance.** That is the operational definition of
procedural theater, and owner law 9 ("KISS is a gate … no procedural theater") is violated by the
instrument's own application.

**Verdict: the law's *intent* — independent adversarial verification — is sound and was never
achieved. The law's *execution* consumed 5.5× its prescribed budget per feature and verified
nothing that mattered.**

---

### O5-F13 — The exact minimal replacement instrument.
**Verdict: ADMITTED_JUDGMENT (proposal) · MAJOR**

Preserve the intent (independent adversarial verification), at ≥10× less cost, by moving the unit
from *leaf* to *vertical* and moving the adversary from *prose* to *machine*.

#### KEEP — five artifacts, no more

1. **3 orthogonal candidates per coherent VERTICAL** — the owner's word "feature" read as a unit a
   consumer can call: `value-unit` entire; `color` entire; `selectors` entire. Not `consume-number`.
   *(Kept unchanged: the H/B/S orthogonality discipline, which demonstrably produced real design
   information — `raw-agent-messages:7396` records B being 14–40× slower because it allocates per
   code point. That is the instrument working.)*

2. **ONE sealed 3-way differential oracle per vertical**, written once and reused: pinned spec
   corpus × live engine × browser CSSOM, run automatically over a fixture corpus, emitting a
   machine verdict. This replaces most skeptic prose with something that cannot be flattered.
   *(The tranche already proved this works — `parser-proof/equivalence-results.json` produced
   0 mirror-defects and 5 real live-side defects including R1's shipping crash. That single
   automated rail generated more truth than all 44 G16 seats.)*

3. **ONE neutral paired benchmark harness**, written once, reused, with four *hard* rules the
   subject's own G07/G08/G09 rows already imply but no harness enforces:
   - **Lane symmetry**: every lane produces the result object by the *same construction path*; no
     lane may pay an adapter another lane does not. A harness that cannot express a peer natively
     must add the same wrapper to *every* lane, including the candidate. (Kills F01 and F03.)
   - **No oracle fields** into any lane. (Already in G16; G14 violated it.)
   - **Fixed, non-negotiable peer set**: (a) the operation-equivalent extraction of the *live
     shipping* implementation, (b) the **fastest** retained predecessor **by measurement**, not by
     lineage convenience, (c) the candidate's own previous accepted generation. A peer that produced
     a LOSS may never be dropped in a successor generation without an addendum naming the loss.
     (Kills F02 and F04.)
   - **Explicit unit identity**: throughput in UTF-8 bytes or not at all. (Kills F08.)
   - Pairwise, 2 lanes per process. (Kills F05.)

4. **2 hostile reviewers + 1 adjudicator per vertical**, with one mandatory obligation: *each
   reviewer re-runs the differential and the benchmark themselves and pastes output.* A review
   containing no executed command scores zero. *(Cost: 3 seats vs 8; effectiveness: strictly
   higher — my three blockers all came from executed commands.)*

5. **Append-only raw retention.** G16's `wx`-open / fsync / no-retry discipline is genuinely
   excellent and cost almost nothing. Keep it verbatim.

#### KILL — named artifacts

| killed | why | bytes recovered |
|---|---|---:|
| per-**generation** quintetti | law says per feature; a defect inside a vertical yields a new candidate revision reviewed by the *same* seats | ~37 of 44 seats/feature |
| `benchmark-protocol.json`, `benchmark-receipt.schema.json`, `benchmark-run-manifest.schema.json`, `benchmark-attempt.schema.json`, `benchmark-evidence-root.schema.json`, `benchmark-validator.mjs`, `author-admission-validator.mjs` (g3–g10) | §12 already forbids "another general-purpose admission CLI"; these are still on disk and still the template | — |
| holdout escrow: `holdout-ciphertext.b64`, `holdout-receipt.json`, `holdout-reveal.json`, `holdout-erratum.json` | `FINDINGS.md` F08/G04 — *never proved blind*, by the tranche's own admission; the ceremony bought nothing | — |
| `denominator/occurrence-owner-formation-v1..v8` + all `*.shards/` | 8 rejections, zero credit; replace with **one hand-curated TSV** — spec URL · section · production name · owning module · status — which fits in ~100 KB. The root proposed exactly this itself (`raw-agent-messages:6496`) | **255,457,954** |
| whole-artifact re-emission per generation | emit a diff, never a re-render | — |
| `skeptic-subject.json` / `synthesis-subject.json` / `skeptic-subject-v2.json` per generation | one manifest per vertical | — |
| review prose that restates hashes | replaced by rule 4's executed-command requirement | ~1.6 MB/feature |

**Estimated cost delta.** Current: 44 adversarial seats + ~4.9 MB per accepted **leaf**. Proposed:
8 seats (3 candidates + 2 reviewers + 1 adjudicator + 2 machine rails) + one reusable harness per
**vertical** of ~14 leaves. Per-leaf that is ~1/77; conservatively, allowing that verticals are
larger and harder than leaves, **10×–20× cheaper** with strictly higher defect yield.

---

### O5-F14 — Convergence: the coverage rail is ~2 years at 8 h/day; the speed rail is *never at this rate*.
**Verdict: CONFIRMED · BLOCKER**

**The observed rate, measured — not estimated.** File mtimes across `mirror/cells/`,
`mirror/prototypes/`, and `denominator/` bracket the entire prototype programme to **one day**:

```
mirror/cells/syntax-number-start        07-22T02:01 → 07-22T05:36
denominator (V1..V8, 255 MB)            07-22T02:54 → 07-22T12:45
mirror/cells/syntax-consume-number      07-22T05:58 → 07-22T18:34
mirror/cells/value-percentage-literal   07-22T18:40 → 07-22T21:29
mirror/cells/value-unit-known-dimensions 07-22T19:23 → 07-22T19:36
mirror/prototypes/foundation-g0..g4     07-22T19:40 → 07-22T21:27
```

**Work window: 2026-07-22 02:01 → 21:29 = 19 h 28 min. Output: 1 accepted operation.**

**Denominator (the honest one).** `FEATURE-LEDGER.md` §1 lists **15 module families, every one
`RED`**. §2.1's dependency-first queue lists **14 rows**, of which 1 is retired
(`SYNTAX-NUMBER-START`) and 1 accepted (`SYNTAX-CONSUME-NUMBER`) → **12 remaining** — and those 12
close only `tokens` + `value-unit` + 3 keyframe/compat seams, i.e. **2 of 15 families**.

**Arithmetic.**

```
rate                 = 1 accepted operation / 19.47 h
families             = 15 (all RED)
operations/family    ≈ 14  (calibrated on tokens+value-unit, the SIMPLEST two families)
target               ≈ 15 × 14 = 210 operations
remaining            = 209
time                 = 209 × 19.47 h = 4,069 h
                     = 169.6 continuous days
                     = 509 working days @ 8 h/day ≈ 2.0 years
```

**This is the optimistic bound**, for four reasons I can evidence:
- `consume-number` is the *simplest* operation in CSS — one regex — and cost 16 generations.
- `color`, `selectors`, `properties`, `values` are each an order of magnitude larger than
  `value-unit`; the 14-per-family calibration is drawn from the two easiest families.
- The measured acceptance rate over *attempted* features is **1 / 5 = 20 %**; over *generations*,
  **1 / 34 = 2.9 %**. Three of the four features attempted after consume-number were still
  unaccepted at the freeze.
- 4,069 h excludes: the integrated stylesheet root, the 52-export/37-consumer compatibility layer,
  WPT-classified differentials, no-throw/fuzz, hostile limits, round-trips, and integrated benches
  (`HANDOFF §13` items 5–8), plus the denominator itself, which after 255 MB and 8 rejections has
  **zero accepted rows**.

**The speed rail: never at this rate. Plainly.** §13 requires *"strictly faster on every genuinely
comparable retained peer lane."* Every honest measurement in the record moves **away** from it:

```
engine scale   live regex 1.8× ahead; both combinator engines FAIL the sheet floor (0.0537 < 0.1000)
composed leaf  percentage 21% slower than the operation-equivalent live kernel (v2, the only run)
atomic leaf    accepted candidate 2.7% slower than a fairly built peer; 15% slower than the true predecessor
foundation     no external peer measurement exists at all, by its own declaration
```

There is **no measurement anywhere in the subject** showing the combinator architecture closing a
performance gap against an operation-equivalent live or retained peer. The only apparent wins are
the two artifacts I refuted (F01 adapter, F04 dispatcher). At the observed rate of change, the
answer is not "long" — it is **never**.

**What has to change, concretely:**

1. **Amend §13.** Replace *"strictly faster on every genuinely comparable retained peer lane"* with
   a ratified regression budget: *"correctness-first; no comparable operation-equivalent lane may
   regress more than N % against the live shipping implementation, with the exact peer set fixed in
   an addendum."* The tranche's own root adjudication already argued this
   (`GATE-VERDICT.md` F-4) and the owner has **not ruled**. Until this is ruled, V·π cannot close
   under any amount of work, and the incentive to select flattering peers is structural.
2. **Adopt the F13 instrument.** 34 generations → 1 acceptance is not survivable across 209 more.
3. **Kill the mechanical denominator** (255 MB, 0 credit) for a curated ledger. This alone recovers
   ~72 % of the tranche's bytes and ~11 h of the measured 19.5 h window.
4. **Fix the peer set before the next benchmark**, per F13 rule 3(b)-(c) — otherwise F02 and F04
   recur by construction at every subsequent feature.

---

## 3. Judgment on `HANDOFF-2026-07-24.md` §12 "Do not repeat" — INCOMPLETE

The eight existing items are all correct and all worth keeping. Six of my thirteen findings are not
covered by any of them, and two existing items are too weak to bind.

**§12 as written misses:**

| # | missing prohibition | finding it would have prevented |
|---|---|---|
| a | **Do not charge a projection, adapter, or wrapper to one lane and not the others.** If a peer cannot natively produce the observation shape, every lane — including the candidate — takes the same wrapper. | F01, F03 |
| b | **Do not time a convenient ancestor and call it the deposed peer.** The peer is the *fastest retained implementation by measurement*, established by `git log -S` over the production path, not by lineage narrative. A lineage exclusion (candidate ancestry) never propagates to the peer set. | F02 |
| c | **Do not drop a peer lane that produced a loss.** Once any lane has been timed, every successor generation times it or an addendum names the loss and the reason for removal. | F04 |
| d | **Do not compare a specialized leaf against a general dispatcher.** A "live peer" means an operation-equivalent extraction of the live implementation's corresponding arm, resolved and executed — never the whole public entry point. | F04, and G14's "decisively faster than LIVE regex" |
| e | **Do not publish a statistic that is not derivable from the retained raw.** Every number in a result file must be recomputable from the sealed attempt by a stated rule, or it does not appear. | F07 |
| f | **Do not re-emit a large machine artifact per generation.** Emit a diff against the prior generation. A 69 MB re-render for a 1.2 KB delta is not evidence. | F11 |
| g | **Do not run one `3×5×3` per generation.** One per *coherent vertical*. A defect inside a vertical produces a candidate revision reviewed by the *same* seats. | F12 |
| h | **Do not accept a review that contains no executed command.** Hash restatement is not verification. | F12 |
| i | **Do not co-resident more than two lanes in one benchmark process.** | F05 |
| j | **Do not leave a 354 MB working tree entirely untracked.** `trackedFilesInHead: 0` means one `git clean` destroys the whole tranche, and no diff review is possible. | operational |

**Two existing items are too weak:**

- *"Do not claim a broad parser or speed win from a leaf benchmark"* correctly forbids **widening**
  a leaf win. It does **not** forbid manufacturing the leaf win itself — which is what F01/F02/F04
  document. Item (a)+(b)+(c)+(d) are the missing half.
- §8's "Evidence and performance" bullets (self-asserted receipts, blind holdouts, copied
  comparators, erased failures, UTF-16 units, hashes ≠ adequacy) are **correct and are the right
  rules** — but they sit in an *advisory* section, not in the operative §12 list, and F08 shows one
  of them is violated on disk in the very gate the project cites. Promote all six into §12.

---

## 4. `FINDINGS.md` rows I dispositioned

Handoff labels are the author's; `audited` is my independent verdict under the brief's vocabulary.

| row | handoff label | audited | basis |
|---|---|---|---|
| A07 (direct work over process) | ACCEPTED_FACT | **ADMITTED_JUDGMENT** | law is real (`raw-prompts:1378`, E-4); the tranche violated it 17,916 : 1 (F11) |
| A08 (KISS first-class) | ACCEPTED_FACT | **ADMITTED_JUDGMENT** | law real; F12 shows the process itself breached it |
| A10 (48 h arbitrary) | ACCEPTED_FACT | **MACHINE_FACT** | not contested by any measurement of mine |
| B03 (active strict TS + tests green) | ACCEPTED_FACT | **MACHINE_FACT** | I ran `npm run check` (exit 0) and `npm test` (1 file, 4 tests) |
| B04 (narrow green ≠ CSS correctness) | REJECTED_CLAIM | **MACHINE_FACT (rejection upheld)** | 4 tests, 1 operation, 6 files, 5,780 B |
| B08 (implementation not meaningfully complete) | REJECTED_CLAIM | **MACHINE_FACT (rejection upheld)** | 15/15 families RED; F14 |
| F02 (G16/H2 accepted within its operation) | ACCEPTED_FACT | **REJECTED** | the acceptance rests on `PASS_STRICT_WIN`; F01 refutes the win in 9/9 runs, F02 shows the peer is the wrong one. Correctness/architecture credit survives; **performance credit does not** |
| F03 (G16 proves value-unit family) | REJECTED_CLAIM | **MACHINE_FACT (rejection upheld)** | one operation |
| F04 (G13/G14 directional benches grant no credit) | REJECTED_CLAIM | **PARTIALLY_TRUE** | correct that they grant no credit — but G14's `deposed` comparison (1.69×) is a **valid unrefuted measurement** that was never reconciled, and F04's framing ("quintetti rejected their … benchmark evidence") buries it (F03) |
| F05 (G4 = 3 lineages / 5 ops) | ACCEPTED_FACT | **MACHINE_FACT** | not contested by me |
| F09 (G4 25/25 replay) | ACCEPTED_FACT | **RESEARCH_ONLY** | not re-run by me; O2's lens |
| F10 (G4 browser witness green for exact subject) | ACCEPTED_FACT | **RESEARCH_ONLY** | not re-run by me; O4's lens |
| F11 (percentage G2 is direct composition) | ACCEPTED_FACT | **MACHINE_FACT** | `g2/integration/.../percentage.ts` = `consumeNumber.skip(string("%")).map(…)` |
| F12 (percentage "beats public peers but loses prior internal lane") | REJECTED_CLAIM | **PARTIALLY_TRUE — materially incomplete** | "beats public peers" is a dispatcher artifact (F04); the **21 % loss to the operation-equivalent live kernel is omitted**; "loses prior internal lane" is unresolved under a neutral harness (F05) |
| F13 (dimensions G0 rejected) | REJECTED_CLAIM | **RESEARCH_ONLY** | semantic; O4's lens |
| F16 (pre-reset code grants no credit) | REJECTED_CLAIM | **MACHINE_FACT (rejection upheld)** | |
| G01 (no-throw law) | ACCEPTED_FACT | **MACHINE_FACT** | owner law; R1 is the live counterexample (`GATE-VERDICT` F-2) |
| G02 (hashes ≠ semantic adequacy) | REJECTED_CLAIM | **MACHINE_FACT (rejection upheld)** | 44 seats reproduced every hash and missed F01/F02 |
| G03 (self-authored JSON ≠ independent review) | REJECTED_CLAIM | **MACHINE_FACT (rejection upheld)** | |
| G04 (hidden corpus ≠ blind) | REJECTED_CLAIM | **MACHINE_FACT (rejection upheld)** | |
| G05 (failed attempt may be erased) | REJECTED_CLAIM | **MACHINE_FACT (rejection upheld)** | genuinely honoured: G14 discloses two unpersisted runs; percentage v2 FAIL retained; G4 attempt-1 failure retained. **But F04 shows a *lane* was silently dropped even though the *attempt* was retained** — the law needs the §12(c) extension |
| G06 (copied comparator regex ≠ exact peer execution) | REJECTED_CLAIM | **PARTIALLY_TRUE** | the *letter* is met (G16's peer is byte-identical to a real revision; percentage/G14 resolve `src/css/grammar.ts` live). The **spirit is not**: a byte-exact copy of the *wrong revision* (F02) evades the rule entirely. Extend to "the peer must be the retained best, established by history search" |
| G07 (timing unlike operations ≠ strict win) | REJECTED_CLAIM | **MACHINE_FACT (rejection upheld) — and violated by the accepted feature** | G16 is the violation; F01 |
| G08 (candidate-relative ≠ full-parser win) | REJECTED_CLAIM | **MACHINE_FACT (rejection upheld) — and violated in the handoff summary** | F04, F12 |
| G09 (UTF-16 as UTF-8 MB/s) | REJECTED_CLAIM | **PARTIALLY_TRUE — violated on disk** | V·π benches are clean; the cited parser-proof gate is not (F08) |
| G10 (browser CSSOM as third witness) | ACCEPTED_FACT | **RESEARCH_ONLY** | O4's lens |
| G11 (`.skip` offset/value behaviour) | RESEARCH_ONLY | **RESEARCH_ONLY** | not re-run by me |
| G12 (hostile inputs bounded for exact G4 H) | ACCEPTED_FACT | **RESEARCH_ONLY** | not re-run by me |
| G13 (static grammar, parser-ID bounded) | ACCEPTED_FACT | **MACHINE_FACT** | the active test asserts stable `consumeNumber.id` over 1,000 parses; I ran it |
| H05 (occurrence-owner V1–V9 prove ownership) | REJECTED_CLAIM | **MACHINE_FACT (rejection upheld)** | 8 `*-rejection.json` files, all `ZERO_CREDIT` |
| H06 (those tools exposed real failure classes) | RESEARCH_ONLY | **RESEARCH_ONLY** | plausible; 255 MB is not the proof of it |
| H07 (analyzer must close before grammar) | REJECTED_CLAIM | **MACHINE_FACT (rejection upheld)** | and the analyzer consumed ~11 h of a 19.5 h window |
| H08 (no denominator claim before bijection) | REJECTED_CLAIM | **MACHINE_FACT (rejection upheld)** | |
| I01 (far more evidence machinery than grammar) | ACCEPTED_FACT | **MACHINE_FACT — and materially understated** | I01 says ">1,100 files / 17 LOC". True figure at the receiving freeze: **2,324 files / 354,220,932 B / 17 lines**; 17,916 : 1 on the tightest denominator (F11) |
| I02 (many generations are the template) | REJECTED_CLAIM | **MACHINE_FACT (rejection upheld)** | 34–40 generations, 1 acceptance |
| I03 (`3×5×3` should be ignored) | REJECTED_CLAIM | **MACHINE_FACT (rejection upheld)** | the law binds; **the granularity does not** — F12/F13 |
| I04 (every terminal constant its own `3×5×3`) | REJECTED_CLAIM | **PARTIALLY_TRUE** | the rejection is right, but its replacement definition ("smallest coherent independent operation") is **still too fine** and is not the owner's word. F12/F13 argue for *vertical* |
| I05 (one compact reusable evidence shape) | ACCEPTED_FACT | **ADMITTED_JUDGMENT** | correct direction; F13 makes it concrete |
| I06 (analyzer/CLI on critical path) | REJECTED_CLAIM | **MACHINE_FACT (rejection upheld)** | |
| I07 (verticals, not artifact volume, measure convergence) | ACCEPTED_FACT | **MACHINE_FACT** | F14 |
| I08 (goal must be narrowed) | REJECTED_CLAIM | **OPEN** | the *goal* need not narrow; **§13's speed rail must be amended or V·π cannot close** (F09/F14). This is an owner ruling, not a finding |
| J06 (small-benchmark identity/paired/raw/no-retry laws remain active) | ACCEPTED_FACT | **MACHINE_FACT** | they are active and were followed at G16 — and they are **insufficient**, because none of them constrains *peer selection* or *lane symmetry* (F13, §12 additions a–d) |

**Non-material progress chatter I group and mark `NO_FINDING`:** `raw-agent-messages/value-v-pi-refinement.md`
lines 1–500 and 7,900–8,025 (session bookkeeping), and all lines matching my performance grep that
restate a figure already dispositioned above without adding a new claim (≈170 of the 212 matched
lines). I make no claim over `bbnf-greenfield-coordination.md` or
`value-tranche-v-formation.md` — outside my lens; O1/O3 own them.

---

## 5. What I could not verify, and why

1. **`raw-agent-envelopes/*.jsonl` (3,283 rows).** Codex subagent payloads are encrypted. I read no
   plaintext and infer none. Every subagent-only benchmark or process claim not materialized in a
   file or a root message is **`ENCRYPTED_UNMATERIALIZED`**. In particular, I cannot verify that the
   44 G16 adversarial seats were independently executed contexts rather than sequential passes;
   the `reviews/*.md` files are self-consistent but self-authored, which `FINDINGS.md` G03 itself
   says is not proof.
2. **The G16 correctness evidence (180 sealed cases, 65,024 oracle transactions).** I verified only
   the 64-row *benchmark* corpus. The 180-case holdout replay is O2's lens; I did not re-run it.
   Its blindness is `REJECTED_CLAIM` per F08 and I have no evidence to overturn that.
3. **G4 foundation browser/CSSOM witness.** O4's lens. Not re-run.
4. **Whether my `deposedFair` construction is the one the historical authors *would* have written.**
   It is the minimal symmetric construction and it passes 64/64, but I cannot prove counterfactual
   intent. This does not weaken F01: the point is that H2's 7 % advantage is not robust to a
   one-line change in the peer, which is the definition of a harness artifact.
5. **Reproduction of the parser-proof P-3 bench.** I read and recomputed its published rows and
   verified its corpus-byte defect, but I did not rebuild the esbuild bundles and re-time the three
   engines. The 1.8× figure is **verified as internally exact**, not independently re-measured.
   Mark: `MACHINE_FACT` for the arithmetic, `RESEARCH_ONLY` for the underlying timings.
6. **The 210-operation target in F14.** Explicitly an **estimate**, calibrated on the two simplest
   families and stated as such. The 19 h 28 min work window and the 34-generation / 1-acceptance
   counts are **measured**; the extrapolation from them is not.
7. **The provenance of `result.json`'s four wrong descriptive fields** (F07). I proved they are not
   derivable from the retained raw by any subset rule I tested; I could not determine where they
   came from. Mark `OPEN`.

---

## 6. Open questions for the adjudicators

1. **Does `acceptance.json`'s `APOTHEOSIS_ACCEPTED` survive F01+F02?** My position: the *correctness*
   and *architecture* credit survives intact — H2 is spec-correct, 17 lines, direct, scanner-free,
   and I verified its promotion is byte-identical and its tests green. The *performance* credit does
   not: `"qualification": "PASS_STRICT_WIN"` is refuted in 9 of 9 runs under a neutral peer, and the
   candidate is 15 % slower than the predecessor owner law 8 actually names. **Recommend: strike
   the performance clause from `acceptance.json` by addendum, retain the feature, and re-run the
   bench once against the corrected peer set.** Do **not** re-open the whole `3×5×3`.
2. **Will the owner rule on §13's speed rail?** Until then the tranche has a close condition that
   its own 2026-07-20 gate says is unreachable, and a structural incentive to select flattering
   peers. This is the highest-leverage single decision available.
3. **Is the correct `3×5×3` unit "smallest coherent independent operation" (I04) or "vertical"
   (F13)?** The owner said "per feature" and never defined it. This is an owner question, not an
   audit finding — but at I04's granularity the arithmetic in F14 gives ~2 years and 44 seats per
   leaf.
4. **Does the byte-loop `scanNumberFast` belong in the peer set even though it is scanner-shaped
   and the architecture is rejected?** My position: **yes, as a peer, never as an ancestor.** You
   must beat what you are replacing. Refusing to *time* the fastest retained implementation because
   its architecture is rejected is how a replacement ships slower than what it replaced.
5. **Should the 255 MB rejected denominator be deleted or retained?** `FINDINGS.md` G05's
   append-only law argues retain; F11's economics and the fact that all 8 generations carry
   `ZERO_CREDIT` argue delete-with-a-receipt. My position: retain the eight `*-rejection.json`
   receipts (11 files, ~30 KB) and the tools; delete the eight payloads and their shards. That is
   ~255 MB recovered with zero loss of dispositioned truth.
6. **`trackedFilesInHead: 0`.** The entire tranche is one `git clean -fdx` from non-existence and
   has never been diff-reviewed. Is that intentional?

---

## 7. Headline

**The single most consequential thing this lens found:** the accepted artifact of the entire
354 MB tranche — the one 17-line CSS consume-number parser — carries a performance acceptance
(`PASS_STRICT_WIN`, 7.07 %) that is an artifact of its own benchmark harness, and it is
**15 % slower** than the implementation value.js actually deposed. Neutralize the adapter that only
the peer pays and the candidate is slower in **9 of 9** fresh-process runs (median 1.0269, min
1.0146); time the true retained predecessor — the O.W6 byte-loop the tranche's own `g7/lineage.json`
explicitly excluded — and the candidate is slower in **9 of 9** (median 1.1484). Forty-four
adversarial seats and 1,608 lines of review prose did not perform either measurement; each took me
under twenty minutes. That is the exact shape of the process failure: `3×5×3` at leaf granularity
bought 5.5× its prescribed cost in ceremony and zero of the verification it exists to provide.
Stacked with the tranche's own 2026-07-20 gate (live regex 1.8× faster, sheet ratio 0.0537 RED) and
the percentage lane's suppressed 21 % loss to the operation-equivalent live kernel, the honest
performance posture is unambiguous and the tranche should adopt it out loud: **this replacement is
justified by correctness — the `parseCssColor("oklch()")` shipping crash — and by architecture. It
is not justified by speed, and `HANDOFF §13`'s "strictly faster on every genuinely comparable
retained peer lane" cannot be satisfied as written.**

---

*O5 · receiving audit · immutable on write · no subject byte edited.*
