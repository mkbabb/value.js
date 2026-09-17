# G16 skeptic 4 — independent hostile benchmark reconstruction

## Verdict: REJECT

The exact frozen subject is rejected. The inferential PASS itself reconstructs from the raw bytes, but the frozen `result.json` does not: all four reported block-level medians/MADs disagree materially with the 360 retained sample blocks. This is a reproduced evidence defect in the exact subject, not a disagreement about taste or an alternate estimator.

No timing was run. No frozen artifact was mutated. I read no other G16 skeptic review. I wrote only this report.

## Frozen subject and byte bindings

The reviewed subject is exactly:

`docs/tranches/V/apotheosis/pi/mirror/cells/syntax-consume-number/g16/skeptic-subject.json`

SHA-256:

`e97b1786ffd5a7046d64e80fd39a3e88143e38a99626780b1b9973e187f975fc`

Every artifact directly bound by that subject matched its declared SHA-256:

| Artifact | SHA-256 |
|---|---|
| `../g15/optimization/h2/index.ts` | `8c3ac689f2e24635216ac0499f23166996ac0136e0b6876e82a8da4f75eb95aa` |
| `../g15/feature.json` | `a88dc7dfb1d452d8bcf103d359cd058722db7ad93ed598622f6e1cfc8d5b3a58` |
| `../g15/candidate.d.ts` | `04b4decb604542c3416cc710aa155b826b86ca491e2ce485c546f815557f2bcf` |
| `../g15/ROOT-DISPOSITION.md` | `b7d6c09fcadab54188b6b714d903b017c86046a9c1302a661bf26bb9210ef722` |
| `correctness/holdout-replay.mts` | `40e8dd24170fd4dd70f6df9692380d099d317fc220e99499cf92f9b3569ff93e` |
| `correctness/evidence.json` | `4eac6a187ef7f615152f364ff52e33ecaa2890c3595313fd6f40ae3714cd13d8` |
| `correctness/tsconfig.json` | `ed9b46dd1a2b36c2e01b96ac82b3c056825d3b6cd15b6fc9ae719ba9b2d2883b` |
| `bench/benchmark.mts` | `bd46893f1ddfa628a258f9f0c953227b1d0513f28643a75c13977f49815a74c3` |
| `bench/benchmark-manifest.json` | `f9ef032d101a74e4493f0e529ffe26244e35f6e9b49c18998ecb4a83438ca9a1` |
| `bench/corpus.json` | `084d40cceed3cce481e23cbac1ca288c2af2899fad515dc948115c0aed9fd46b` |
| `bench/benchmark-evidence.schema.json` | `e07b83d9f5d344cde2c62c554c4f6a92d832cab452615ba61630cd34c500e880` |
| `bench/evidence/correctness.json` | `0196d9a361bea3bc43fa370f64c7354c739e2c99e1f3e73853d71a712794c22f` |
| `bench/evidence/raw-first-attempt.ndjson` | `372fef4094e34b1b78d9ab8e48fcf36bcda7557f2e8ba54cac637c222de11e54` |
| `bench/evidence/result.json` | `738ee94837e1747dd13116b76f5f7812838a3dc3dfb75c1bec5a7a77ad456bb4` |
| `preflight/audit-a2.md` | `88ddf86db6e36667db5785af3b7be75db82264af18cb125dcb2095a1b65ea67e` |
| `preflight/audit-b2.md` | `58055615b7bcd7e5df110f30c5d857a4caaf3e69d86c75b7af609a0842a96e58` |

The manifest's transitive bindings also reconstruct: the exact deposed peer is `73e6a9731c802be86ac0230f32062f1075d344f6143715786eb1d9b8fe0f28e4`; Node is `08dad0581f00a0cabf4d49ec92ca1f25fdfd01c2c18fa8e92b35f04d4c24c164`; `package.json` and `package-lock.json` are respectively `b15f2948615b3ab979fdd1c356d5cbdaee3639115e07930d4041ccc77b3cd3af` and `489c5981ffa75d795cd3fae0e6d5a837b272ffec1633d862dba9c11a59e668b7`. The parse-that tree recomputes to 65 entries, 6,607 ledger bytes, and `ce9242a2c00d18a61db3ab2fc252e50b382ab7ee3ccfabbca243487431c433c1`; the TSX tree recomputes to 50 entries, 5,182 ledger bytes, and `a9d1ef7f63eadf6be4deae98277357b0505ef47d1359958e317283079c50ccb1`.

## Altitude 1 — raw lifecycle and arithmetic

### Lifecycle, attempt, and persistence

The raw file is exactly 250,611 bytes, 545 newline-terminated JSON records, and one attempt ID: `a0d321bc-b6ca-460d-9960-38973d1e6f86`. Its first and last timestamps are `2026-07-22T21:59:41.096Z` and `2026-07-22T22:00:07.783Z`. The terminal record is `COMPLETE_FIRST_ATTEMPT`.

The event counts are exact:

| Event | Count |
|---|---:|
| `start` | 1 |
| `bindings_verified` | 1 |
| `controller_environment` | 1 |
| `child_spawn` | 30 |
| `child_environment` | 30 |
| `semantic_preflight` | 30 |
| `warmup_complete` | 30 |
| `sample_block` | 360 |
| `replicate_summary` | 30 |
| `child_exit` | 30 |
| `inference` | 1 |
| `terminal` | 1 |

For each replicate, the record sequence is exactly spawn, environment, semantic preflight, warmup, 12 sample blocks numbered 0 through 11, summary, exit. The 30 seeds occur once each in manifest order. Each child exits before the next child spawn record. There is no retry, substitute replicate, failure terminal, extra sample, missing sample, or post-terminal record in this stream.

The implementation has one `wx` open path and no internal retry/replacement branch. The raw bytes therefore demonstrate one complete lifecycle at the declared path. They cannot independently prove the stronger historical proposition that no prior run was externally deleted before this open: `wx` establishes absence only at open time, and the preflight absence receipts are local assertions rather than an append-only external witness. This is a residual one-attempt provenance/persistence limitation.

### Process unit and phase enforcement

The controller PID is 7,784. The 30 child environment events contain 30 distinct PIDs, none equal to the controller PID. All children report the pinned Node/V8/platform/architecture/OS/CPU/memory identity. The source validates the exact phase machine and recomputes sample ratios and each child aggregate in the controller before returning it to inference.

This avoids the G15 pseudoreplication error: the estimator uses 30 fresh-process aggregates, not 360 blocks as if they were independent. Fresh processes isolate JS heaps and JIT state; they do not prove physical independence from sequential scheduler, thermal, frequency, or host-load effects. The observed aggregate series has lag-one correlation about `-0.0881`; its first- and second-half means are `-0.0789707594` and `-0.0677531850`. Those diagnostics do not reproduce a serial-dependence blocker, but the t inference remains conditional on treating sequential child aggregates as independent draws.

### Orders, work, checksums, stderr, and exits

Every child has exactly six `[h2,deposed]` and six `[deposed,h2]` sample blocks; globally each lane runs first 180 times. Every raw order equals the independently regenerated Fisher-Yates order for its frozen seed. Warmup orders likewise reconstruct as two of each order from `seed XOR 0xa5a5a5a5`.

Each lane performs 320,000 operations per block. Totals are 115,200,000 operations per lane and 230,400,000 timed lane operations overall, exactly matching `result.json`. Independently reconstructing the numeric and structural sinks from the 64 corpus rows and 5,000 repetitions gives checksum `9d4c0a76638e3252770fc05fd56abd4dd1d10c72686dc79557a1d42f16f440b6`; that is the sole checksum in all 720 lane payloads.

All 30 exits are code 0 with null signal, zero captured stderr bytes, and the empty-string SHA-256 `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`.

The child argv appends exactly `--disable-warning=DEP0205`. That switch is code-wide inside each child, not scoped to a particular loader call, so zero stderr means zero after global suppression of every DEP0205 warning. This is broader than provenance-specific suppression, but the exact candidate and deposed source expose no reproduced value-dependent warning path, and the switch is common to both lanes. I do not treat it as the blocking defect.

### Twelve-block aggregation and one-sided inference

Every raw block log ratio is bit-identical to `Math.log(h2_elapsed_ns / deposed_elapsed_ns)`. Every worker summary is bit-identical to the arithmetic mean of its exact 12 ratios. The raw inference vector is bit-identical to the 30 reconstructed child means. All 30 child means are negative, ranging from `-0.11472139281715492` to `-0.021911347570760215`.

Independent reconstruction gives:

- `n = 30`, `df = 29`
- mean log ratio: `-0.07336197220979548`
- Bessel-corrected sample SD: `0.027244341177386378`
- one-sided 95% critical value: `1.6991270265` (the full-precision df-29 quantile is about `1.6991270265334975`)
- upper log-ratio bound: `-0.06491032168356216`
- geometric mean ratio: `0.9292644012517273`
- upper ratio: `0.9371515017780626`
- point time reduction: `0.07073559874827273`
- t statistic against zero: about `-14.7488`, one-sided p about `2.59e-15`, conditional on the t-model assumptions

The strict `upper < 0` rule therefore returns PASS. There is no optional stopping in the retained stream and no block/process deletion, trimming, winsorization, replacement, or favorable-value branch in the bound controller.

### Blocking raw/result contradiction

The child-aggregate median and MAD in `result.json` are correct: `-0.08039757244129006` and `0.018675995216382787`.

The four block-duration summaries are not. Taking the median and median absolute deviation of all 360 retained block durations gives, independently in both JavaScript and Python:

| Statistic | Frozen result | Recomputed from raw | Difference |
|---|---:|---:|---:|
| H2 block median (ns) | 20,278,396 | 21,818,104 | -1,539,708 (-7.06%) |
| H2 block MAD (ns) | 252,020.5 | 576,396 | -324,375.5 (-56.28%) |
| Deposed block median (ns) | 21,099,104 | 23,620,145.5 | -2,521,041.5 (-10.67%) |
| Deposed block MAD (ns) | 376,312.5 | 749,750 | -373,437.5 (-49.81%) |

The manifest says every one of the 360 blocks is retained and forbids alternate estimators. No subset, normalization, or result-production algorithm is declared for these four fields, and the bound evidence schema covers the untimed correctness object rather than `result.json`. The reported values therefore have no support in the bound raw evidence. Their mismatch does not numerically reverse the predeclared t PASS, but it makes the exact frozen result internally false. Under the subject's hostile review law, that evidence defect blocks acceptance.

## Altitude 2 — operation and cell-level claim

The exact H2 lane creates one `ParserState`, calls the pinned H2 parser once, and returns H2's intrinsic `{sign,type,value}` leaf in `{end,leaf}`. The exact deposed lane creates one `ParserState`, calls the pinned historical `number` parser once, then derives the missing sign/type/end information from the consumed source span and builds the same mutable leaf/wrapper endpoint. The bound untimed evidence reports 128 exact observations over all 64 rows with digest `5554b33225d0b55766c8b079b07835702c88ee096733f8f3ba5c5481fdbc1291`.

The timed corpus stays in the declared common domain. Plus-sign and multiple-leading-zero disagreements are excluded. Both lanes receive only `source` and `offset`; oracle end/sign/type/value fields do not enter timed work.

There is nevertheless a real normalization asymmetry that constrains interpretation. H2 constructs metadata while it still has its regex match string. The exact deposed parser maps its match to `Number`, after which the harness performs an additional `source.slice` and tests exponent spelling with `/[eE]/`. Thus the timing is a comparison of two ways to reach the normalized leaf endpoint, not an isolated comparison of bare recognizer/parser costs. That is consistent with the manifest's explicit operation definition, but it cannot be widened into a claim that H2's parser core alone is 7.07% faster.

At this altitude, the raw bytes support the narrow, conditional normalized-endpoint strict win and the separate correctness evidence supports the exact candidate semantics. The subject is still rejected because its frozen result artifact contains false descriptive claims.

## Altitude 3 — module, vertical, and tranche impact

The result correctly disclaims production-input averages, per-case/per-block dominance, full CSS parser throughput, broader scalar/CST doors, feature acceptance, integration acceptance, and production authority. A fixed, equally weighted 64-row common-domain microbenchmark on one pinned Apple M5 Max/Node environment cannot establish any full-module, vertical, or tranche-wide performance claim.

Because this exact G16 subject is rejected before synthesis, it supplies no benchmark, feature, integration, production, or tranche credit. The rejection does not by itself refute H2 correctness or prove H2 slow; it says the frozen evidence package is not internally valid enough to promote. Full-tranche performance remains unproved.

No repair was made or evaluated.
