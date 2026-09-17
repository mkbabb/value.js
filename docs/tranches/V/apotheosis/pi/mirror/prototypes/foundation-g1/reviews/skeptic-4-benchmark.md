# Hostile skeptic 4 — comparable performance and construction cost

## Verdict

**Performance does not block H, B, or S. It informs synthesis only.** There is no frozen latency, throughput, allocation, or construction budget in the subject or brief, and this prototype microdomain is too small to manufacture one after the fact.

The supplied smoke is not admissible as a fully comparable H/B/S benchmark. Its `cssTrivia` equality check deliberately replaces the semantic value with `typeof state.value`, even though B returns comment delimiters and H/S return comment bodies. Its own rerun checksums expose that difference. The remaining success-result comparisons are useful continuous signals after the limitations below are made explicit.

S is the strongest broad operation signal. H is approximately flat against its valid G0 lineage but is materially slower on identifier, string, and dimension work. B is close to S among comparable G1 operations, but its repaired combinator construction is much slower than its regex-based G0 implementation on identifier/string; that G0 comparison is contextual, not a strict full-state equivalence claim. None of those observations is a qualification gate.

I explicitly refuse any **LIVE**, public-door, integration, or full-parser performance claim. These are direct prototype `parseState()` calls over a tiny successful corpus. The production/public door and full parser are different operations.

## Frozen identity and integrity

- `SUBJECT.json`: `687ac4941ab73f79fdf7abd21d997262a1c66ca15c51d04e2505d9c895631764` — matches assignment.
- Supplied `benchmark.mts`: `fccad77681acda3b2892684eb7cdae9f605c6fc569a31a382b70b251c8953895` — matches assignment.
- Supplied `evidence/benchmark-smoke-01.json`: `07e55fe5d404bd7106aeca9344a54ad3750d06cd4dcaba0fba4a4109ee634c08` — matches assignment.
- Author subject, brief, fixtures, erratum, common evaluator/replay, browser witness, mirror package/lock, installed package manifest, and installed parse-that core all match the hashes frozen in `SUBJECT.json` / `AUTHOR-SUBJECT-v2.json`.
- Candidate ledger files have the subject-frozen ledger hashes, and `sha256sum -c` passes every H, B, and S ledger entry.
- No candidate or subject byte was mutated by this review.

## Why the supplied smoke is not enough

### 1. `cssTrivia` is not a common semantic operation across all seats

For `"/**/"`, all candidates succeed at offset 4, but H and S return `""` while B returns `"/**/"`. For `"/* open"`, H/S return `" open"` while B returns `"/* open"`. The longer mixed-trivia case has the same delimiter-preservation split.

The harness hides this with:

```ts
feature === "cssTrivia" ? typeof state.value : state.value
```

All values are strings, so the preflight passes. On my exact rerun, however, the harness's later checksum is `213000` for G1-H/G1-S/G0-H/G0-S and `255000` for G1-B/G0-B. The harness records but never asserts checksum equality. Therefore the supplied H/B/S trivia medians and the claim that S is faster than every candidate's G0 lineage on every common operation are not established on one shared semantic operation.

H/S/G0-H/G0-S are success-result and full-state equivalent on the measured trivia inputs. B is comparable only to its own G0 value/offset behavior there, not to H/S, and even that B lineage changes `furthest`.

### 2. The checksum is collision-prone and serialization contaminates timing

The supplied checksum adds only `offset + JSON.stringify(value).length`. Different values of the same serialized length collide. Exact semantic equality is checked separately for most features, but not for trivia as described above.

`JSON.stringify(state.value)` also runs inside every timed iteration. The reported unit is consequently parser-plus-serialization time, not parse time. My independent run consumes typed result fields and boundary character codes without JSON serialization; exact result equality is established before timing.

### 3. The advertised order is rotated, not balanced

The three supplied schedules do not balance lane position. For example, G1-S is always third in schedules 1 and 3, while G0-S is sixth in schedules 1 and 3. With 21 samples each schedule repeats seven times, preserving those position biases. Feature order is fixed as well. Four warmup rounds are reasonable but cannot make the order balanced.

My run independently shuffles both feature and lane order in every warmup and sample from a frozen seed. It uses 7 warmups, 31 samples, and 4,000 corpus cycles per sample. Across G1 medians, IQR width was 0.5%–2.1% of the median, so the large differences below dominate observed within-run noise. This is still one host/VM run, not a cross-host result.

### 4. The smoke summary discards the evidence needed to assess noise

The harness prints raw samples, but `benchmark-smoke-01.json` does not retain them and reports neither IQR nor dispersion. Point medians alone cannot show stability. My exact supplied-harness rerun reproduced its direction and was saved transiently at SHA-256 `ae7ef0ce87d1f06d4ee4a950c1571a9f48bc6d5c62f9a18e829eba2d9817e20f`; it is corroboration, not frozen review evidence.

## Semantic-equivalence audit

I compared exact `[isError, offset, value]` signatures before timing, then separately included observable `furthest`.

- Across all six G1/G0 lanes, success-result signatures are exact for escape, identifier, string, percentage, and dimension on the supplied corpus. Trivia has the B versus H/S split above.
- Within G1, full `[isError, offset, value, furthest]` state is exact for identifier, string, percentage, and dimension. G1-S reports `furthest: -1` for several successful escape arms where G1-H/B report progress; performance comparison remains a success-result comparison, not full-state equivalence.
- G1-H versus G0-H and G1-S versus G0-S are full-state equivalent on every measured feature and input.
- G1-B versus G0-B is success-result equivalent on every measured feature and input, but is full-state equivalent only for percentage. The repaired G1-B now retains useful progress while regex G0-B commonly reports `furthest: -1`. Thus B's G0 ratios outside percentage are labeled context only.
- The corpus contains only 41 short successful direct-parser inputs. It does not measure malformed rollback, nonzero offsets, parent composition, long inputs, adversarial scaling, public-door dispatch, or a full CSS parser.

## Independent bounded operation measurement

Environment: Node v26.0.0 / V8 14.6.202.33-node.19, Darwin arm64, Apple M5 Max. Medians are nanoseconds per direct `parseState()` call. Independent output SHA-256: `95c057901750733ffe11c077cde413e98e6c73b936ef47ad73c9990fdce24811` (transient result; method is fully stated above).

| operation | G1-H ns | G1-B ns | G1-S ns | fastest valid G1 comparison |
|---|---:|---:|---:|---|
| escape | 75.10 | 72.12 | 74.92 | B; H/S each ~1.04x |
| identifier | 548.44 | 299.61 | 294.64 | S; B 1.02x, H 1.86x |
| string | 812.03 | 587.76 | 553.86 | S; B 1.06x, H 1.47x |
| trivia | 182.12 | 379.96 | 266.76 | H versus S only; S 1.47x; **B incomparable** |
| percentage | 67.30 | 67.83 | 67.97 | effectively tied (spread 1.01x) |
| dimension | 464.65 | 329.59 | 319.25 | S; B 1.03x, H 1.46x |

Own-lineage G1/G0 median ratios from the same run:

| operation | H ratio | B ratio | S ratio |
|---|---:|---:|---:|
| escape | 1.00 | 1.02† | 0.95 |
| identifier | 1.02 | 1.80† | 0.88 |
| string | 1.00 | 3.38† | 0.94 |
| trivia | 1.00 | 3.80† | 0.92 |
| percentage | 1.00 | 1.01 | 1.01 |
| dimension | 1.02 | 1.24† | 0.91 |

† B preserves the same success value/offset on this corpus but changes observable `furthest`; these are repair-cost context, not strict full-state operation-equivalent ratios. The G0-B regex metagrammar is also the defect source that G1 was required to replace. It is not a valid performance target for choosing incorrect semantics.

The independent consumer removes the supplied harness's serialization overhead, yet the main ordering remains: H is expensive on identifier/string/dimension, B pays heavily versus its own regex G0 on identifier/string/trivia, and S is broadly strongest. Percentage is noise-level flat for all seats.

## Construction cost

All candidates construct ordinary module-singleton parsers, so construction is paid once per loaded module graph, not per parse. Frozen non-test TypeScript line counts are H 221, B 188, S 223; source size alone does not represent parser-graph allocation.

I ran 15 fresh processes per G1 and G0 lane. Each process first loaded the TypeScript loader, parse-that core, and the accepted shared numeric dependency, forced GC, then measured candidate module load/evaluation and forced-GC retained heap. This is a comparable **module-load proxy**, not a pure parser-node allocator count: it still includes candidate TypeScript transformation, module records, regex compilation, maps, closures, and exports.

| lane | median load ms (IQR) | median retained heap |
|---|---:|---:|
| G1-H | 4.10 (3.78–4.35) | 158,360 B |
| G1-B | 3.78 (3.68–3.95) | 150,960 B |
| G1-S | 4.07 (3.77–4.32) | 155,776 B |
| G0-H | 3.95 (3.73–4.02) | 159,584 B |
| G0-B | 3.76 (3.72–4.13) | 127,560 B |
| G0-S | 3.97 (3.74–4.21) | 154,064 B |

Load-time distributions overlap; no meaningful H/B/S construction-time winner is established. Retained heap is small in absolute terms and G1-B remains the smallest G1 graph in this proxy, although replacing its fused regex raises its own-lineage retained heap by 23,400 B (18%). H is down 1,224 B versus G0 and S is up 1,712 B. Construction output SHA-256: `d0757ae0aa9a91d69abd48e1e221d56cb0dfd484e83fd34a928039942ed46163` (transient JSONL).

No construction result blocks a candidate. If synthesis expects extremely frequent isolated-worker startup, it should benchmark the eventually selected compiled artifact through the actual door; this prototype TypeScript-load proxy cannot answer that deployment question.

## Candidate decisions for synthesis

- **H — no performance block.** Stable and approximately G0-flat, with the best valid trivia result, but 1.46x–1.86x behind the fastest candidate on identifier, string, and dimension. This is a real synthesis tradeoff, not a correctness failure.
- **B — no performance block.** Near S on the comparable G1 identifier/string/dimension lanes and fastest on escape. Its large G0 regressions are the cost of replacing an invalid fused-regex architecture and improving progress state; they do not justify restoring G0. B's trivia number must not be ranked against H/S until synthesis chooses one common trivia value contract. Its 23.4 KiB own-lineage retained-heap increase is informative but immaterial without a budget.
- **S — no performance block.** Broadly strongest: fastest identifier/string/dimension, within 4% on escape, and 5%–12% faster than its fully operation-equivalent G0 lineage on five of six measured operations. H beats S on valid trivia comparison, and percentage is flat. The successful-escape `furthest` difference is a state/semantic review issue, not something speed can excuse.

**Final disposition: performance informs synthesis; it independently disqualifies none of H, B, or S. The supplied smoke's cross-seat trivia conclusion is rejected, and no LIVE/full-parser claim is admitted.**
