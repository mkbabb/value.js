# O2 — prototype code and proof integrity

**Seat:** O2 (hostile Opus quintetto, seat 2 of 5)
**Subject:** `docs/tranches/V/apotheosis/pi` frozen at
`formation/session-audit/receiving/AUDIT-SUBJECT.json`
(2,324 files, 354,220,932 bytes, entirely untracked; repo HEAD
`c654824e0b252cda7f8490b67f182a48c48cc0ed`, branch `tranche-u`)
**Date of execution:** 2026-07-24
**Prior V·π authorship by this seat:** none.

---

## Model receipt

- **Declared model:** my harness system prompt declares
  `Opus 5 (1M context)`, exact model ID `claude-opus-5[1m]`.
- **Observed model identifier:** `claude-opus-5[1m]`. This is the identifier I
  actually observe myself to be. I have no independent oracle inside this
  session (no provider-metadata endpoint, no `turn_context` record of my own
  serving) with which to cryptographically attest the weights that produced
  these tokens. **What I can attest is exactly this: the runtime that spawned
  me declares `claude-opus-5[1m]` and nothing in my context contradicts it.**
  Consistent with `FINDINGS.md` row **A13** — which this tranche itself
  correctly labels `REJECTED_CLAIM` ("historical Fable/Opus labels prove served
  model") — a declaration is intent, not proof. The adjudicators should treat
  my model attestation with exactly the skepticism A13 demands, and should
  cross-check it against this session's own rollout `turn_context` record if
  one is available to them. I am not relabeling myself and I am not claiming
  more than the declaration supports.
- **Effort level:** high. I ran every executable replay listed below myself; no
  finding below rests on reading a status field.
- **Edits to subject bytes:** none. Every probe I wrote lives in the session
  scratchpad
  (`/private/tmp/claude-504/.../scratchpad/probe/`), outside the subject. The
  only file I created under the repository is this report, at the exact
  mandated path.

---

## What I actually executed

Every command below was run by me in this session; outputs are pasted verbatim
or quoted exactly.

| # | Command / probe | Where |
|---|---|---|
| 1 | `npm run check` | `mirror/` |
| 2 | `npm test` | `mirror/` |
| 3 | `tsc -p tsconfig.apotheosis.json --noEmit --listFiles` | `mirror/` |
| 4 | `npm run test:rejected-g0` (pre-reset suite) | `mirror/` |
| 5 | `tsx cells/syntax-consume-number/g16/correctness/holdout-replay.mts --verify` | `mirror/` |
| 6 | `tsx prototypes/foundation-g4/holdout/evaluate.mts` | `mirror/` |
| 7 | Independent recomputation of the G16 benchmark inference and the four disputed block descriptives from `bench/evidence/raw-first-attempt.ndjson` (Python) | `g16/` |
| 8 | `shasum -a 256` over the entire G16 proof chain, the promoted source, the G4 H candidate set, and all nine raw-archive files | subject-wide |
| 9 | Minimal reproduction of the `leaf.skip(suffix)` rewind claim (§7.3), plus `any`/`all`/`opt` variants, against `@mkbabb/parse-that@1.0.0` | scratchpad |
| 10 | Reproduction of the known-dimensions identifier-boundary counterexamples against the exact H/B/S bytes | scratchpad |
| 11 | 200,000-call randomized no-throw / offset-integrity fuzz of the accepted `consumeNumber`, plus a 10⁶-digit hostile input and a 100,000-parse parser-ID stability loop | scratchpad |
| 12 | Semantic edge probe of the accepted `consumeNumber` (17 inputs) | scratchpad |
| 13 | AES-256-GCM decryption of the G15 sealed holdout using the live `/tmp` escrow key, then aggregate-only statistics over the 180 plaintext cases | scratchpad |
| 14 | Subagent-seat census over all 3,283 rollout envelopes (`raw-agent-envelopes/*.jsonl`), by author and timestamp window | archives |
| 15 | Byte/file census of the frozen ledger by top-level path and category (Python) | ledger |
| 16 | Structural comparison of `denominator/occurrence-owner-formation-v2.json` vs `-v3.json` (69.59 MB each) | `denominator/` |

**What I deliberately did not do.** I ran no timing benchmark of my own (the
tranche's own no-retry law makes a fresh timing attempt evidence-destructive,
and O5 owns benchmark reconstruction). I did not read the encrypted envelope
plaintexts — they are `ENCRYPTED_UNMATERIALIZED` and I classify them as such. I
did not read the 255 MB `denominator/` payloads beyond top-level key structure
and one structural diff. I did not open a browser; the G4 browser witness is
recorded but I could not re-witness it and I mark it accordingly.

---

## Part 1 — The active root: what `npm run check` and `npm test` actually prove

### 1.1 The commands, verbatim

```
$ cd docs/tranches/V/apotheosis/pi/mirror && npm run check

> @value-js/pi-css-mirror@0.0.0 check
> tsc -p tsconfig.apotheosis.json --noEmit

EXIT=0
```

```
$ npm test

> @value-js/pi-css-mirror@0.0.0 test
> vitest run --config apotheosis/vitest.config.ts --passWithNoTests

 RUN  v3.2.7 /Users/mkbabb/Programming/value.js/docs/tranches/V/apotheosis/pi/mirror

 ✓ apotheosis/test/value-unit/numeric.test.ts (4 tests) 3ms

 Test Files  1 passed (1)
      Tests  4 passed (4)
   Start at  14:00:43
   Duration  332ms (transform 26ms, setup 0ms, collect 30ms, tests 3ms, environment 0ms, prepare 46ms)
```

Both are **genuinely green**. The claim "strict TypeScript and four numeric
tests" is `MACHINE_FACT`.

### 1.2 What "strict" means here — and it is real

`mirror/tsconfig.json:2-12` sets `strict: true`, `noUncheckedIndexedAccess`,
`exactOptionalPropertyTypes`, `verbatimModuleSyntax`, `module/moduleResolution:
NodeNext`, `target: ES2022`. `tsconfig.apotheosis.json` extends it and adds
`allowImportingTsExtensions` + `resolveJsonModule`. The strictness is not
cosmetic.

`--listFiles` shows the check is **not** confined to the 17-line source: it
compiles **108 non-`node_modules` files** — the active root (3), all 102 cell
`.ts` files across every generation, and (see 5.3) three modules from the
*rejected* pre-reset tree. So the strict-TypeScript claim covers materially
more than the accepted feature. That is to the tranche's credit and I say so.

### 1.3 The four tests, read

`apotheosis/test/value-unit/numeric.test.ts` (52 lines, SHA-256
`4000f5dd…3fe8da`):

1. **`returns the intrinsic maximal-prefix leaf`** (lines 7–14) — one input,
   `"-1.25e+2rest"`; asserts `isError=false`, `offset=8`, exact value object,
   and exact own-key order `["sign","type","value"]`.
2. **`leaves incomplete exponents and repeated fractions to the parent`**
   (16–24) — two inputs, `"1e+"` and `"1.2.3"`; asserts maximal-prefix
   truncation at offsets 1 and 3.
3. **`composes as the numeric leaf of a percentage production`** (26–34) —
   `consumeNumber.skip(string("%")).eof()` on `"+12.5%"`.
4. **`fails transactionally without per-call parser construction`** (36–51) —
   asserts state-return identity, `isError`, `offset===0`, `value===predecessor`
   on a direct leaf failure, and that `consumeNumber.id` is unchanged after
   1,000 parses.

### 1.4 Judgement: is four tests over one 17-line operation meaningful evidence?

**As a proof of CSS correctness: no. As the *promotion smoke-gate* it is
declared to be: yes, and it is well chosen.**

The honest reading is this. `clean-base.json:11` labels this
`"default_test": "npm test (one file, four active integration tests)"` — an
*integration* gate, not the correctness proof. The correctness proof is the
G16 holdout replay (Part 2), which is 180 sealed cases plus 65,024 oracle
transactions and which I re-ran and reproduced byte-for-byte. Four tests are
the thin gate on top of a thick one, not a thick claim standing alone.

Two real criticisms survive:

- **The test-4 name over-claims.** "fails transactionally" is asserted only for
  a *direct leaf* failure. Under composition — `consumeNumber.skip(string("%"))`,
  which is literally the next production the tranche intends to build — the
  engine does **not** restore `state.value` (I reproduce this in Part 7). The
  test's own case 3 uses `.skip` but only on the success path. So the test
  suite asserts a transactional property at exactly the one altitude where it
  holds and does not probe the altitude where it fails.
- **`--passWithNoTests` is in the npm script.** If
  `apotheosis/test/**/*.test.ts` were ever emptied or the config glob drifted,
  `npm test` would still exit 0 and print green. Today the glob resolves and 4
  tests run, so this is not a live vacuous gate — but it is a gate that *can be
  made* vacuous by deletion, which is the wrong default for a promotion rail.

### 1.5 The active root is one file

```
apotheosis/README.md                                   1,218 bytes
apotheosis/clean-base.json                             1,505 bytes
apotheosis/grammar/css/l4/README.md                      324 bytes
apotheosis/grammar/css/l4/value-unit/numeric.ts          560 bytes   ← the parser
apotheosis/test/value-unit/numeric.test.ts             1,957 bytes
apotheosis/vitest.config.ts                              216 bytes
                                                       ─────────────
                                                       5,780 bytes / 6 files
```

`numeric.ts` is **17 LOC**, one `regex(...)` terminal and one `.map(...)`
projection. It is the *entirety* of the accepted parser.

---

## Part 2 — The G16 `APOTHEOSIS_ACCEPTED` audit: five claims, verified one by one

`cells/syntax-consume-number/g16/acceptance.json` asserts
`status: APOTHEOSIS_ACCEPTED` with:
`sealed_cases: 180_OF_180_PASS`, `independent_oracle_transactions: 65024`,
`quintetto: FIVE_OF_FIVE_ACCEPT`, `synthesis: THREE_OF_THREE_NOMINATE_EXACT_H2`,
`qualification: PASS_STRICT_WIN`.

### 2.1 Proof-chain identity — **CONFIRMED, all seven hashes**

```
9747e051bc0f34fbe354dac311bba2e9322f4a2ca9f4d670a1548b49f0bcc749  skeptic-subject-v2.json
062bbafc1f2e8445fa6a84b6e56594c9425388b4c18a5f75887f5b2e8467d58a  synthesis-subject.json
79ab20d533e0892876c882907b08c5b0385d13c0a1f38825716d55fa3cef19e7  selection.json
82cbf9e39f38ec7e571869dc203736cceef7a0968228c7b79478586991ce6c2b  integration-evidence.json
4eac6a187ef7f615152f364ff52e33ecaa2890c3595313fd6f40ae3714cd13d8  correctness/evidence.json
54f1b3eaadd7198e22bc6d3ef9b0d8211933069efe0b179cec49906938a9f323  correction/benchmark-erratum.json
```

Every one matches `acceptance.json` exactly. Per `FINDINGS.md` **G02**,
identity is necessary but insufficient; it is nonetheless clean here.

### 2.2 Promotion identity — **CONFIRMED byte-identical**

```
$ shasum -a 256 cells/syntax-consume-number/g15/optimization/h2/index.ts
8c3ac689f2e24635216ac0499f23166996ac0136e0b6876e82a8da4f75eb95aa

$ diff cells/syntax-consume-number/g15/optimization/h2/index.ts \
       apotheosis/grammar/css/l4/value-unit/numeric.ts
BYTE-IDENTICAL

$ shasum -a 256 apotheosis/grammar/css/l4/value-unit/numeric.ts
8c3ac689f2e24635216ac0499f23166996ac0136e0b6876e82a8da4f75eb95aa
```

The promoted source is byte-identical to the reviewed candidate and matches the
declared SHA-256 `8c3ac689f2e24635216ac0499f23166996ac0136e0b6876e82a8da4f75eb95aa`.
The `promotion_rule` ("byte-identical copy; no wrapper, export change,
formatting, or semantic edit", `selection.json`) is honoured. The G15 source is
mode `0444` and 560 bytes / 17 LF lines, exactly as the replay's freeze gate
asserts.

### 2.3 The 180 sealed cases — **REPRODUCED; sealing is REAL but its blindness rests on a self-assertion**

I re-ran the replay from a cold process:

```
$ ./node_modules/.bin/tsx cells/syntax-consume-number/g16/correctness/holdout-replay.mts --verify
{"schema":"value.pi.syntax-consume-number.g16.correctness-result/v1","status":"PASS",
 "subject":{"id":"h2","sha256":"8c3ac689…e95aa","bytes":560,"lf_lines":17,"mode":"0444"},
 "holdout":{…,"total_cases":180,
   "families":{"maximal-prefix":{"total":24,"passed":24,"failed":0},
               "repeated-fraction":{16,16,0},"signs-leading-zeroes":{18,18,0},
               "incomplete-exponents":{18,18,0},"utf16-offsets-surrogates":{16,16,0},
               "transaction-ahead-diagnostics":{14,14,0},"descriptors-mutability":{8,8,0},
               "parent-composition":{24,24,0},"hostile-bounded-strings":{16,16,0},
               "repeated-call-stability":{10,10,0},"parser-introspection":{8,8,0},
               "no-per-call-parser-id-growth":{8,8,0}},
   "construction_assertions":9,"status":"PASS"},
 "independent_assay":{"oracle":"imperative scanner, test-only, not grammar",
   "total_calls":65024,"successes":20782,"expected_transactional_failures":44242,
   "parser_id_stable":true,"per_call_parser_id_growth":false,"status":"PASS"},
 …}
```

The output is **byte-identical to the frozen `correctness/evidence.json`**. So
`180_OF_180_PASS` and `independent_oracle_transactions: 65024` are
`MACHINE_FACT`, reproducible on demand today.

**Is the set actually sealed with pre-authorship custody?** Partly, and better
than the tranche's own hedging suggests — but not fully proved.

*What is real:*
- The corpus is **genuinely encrypted** — AES-256-GCM, ciphertext
  `g15/holdout-ciphertext.b64` (268,070 bytes), authenticated with an AAD that
  binds `feature_id`, `generation`, the semantic-contract SHA-256, and the
  CSSWG normative source at commit `08f2f799da6a306e8bf5daca208683717f26d643`
  lines 1610–1678. The key is **external** to the tree at
  `/tmp/value-js-g15-syntax-consume-number-holdout-key-fe37f6a3e1dd.hex`, mode
  `0600`, 65 bytes, mtime `Jul 22 15:53` — and it still exists, which is why my
  replay succeeded. This is a materially stronger construction than a plaintext
  fixture file.
- **Filesystem chronology supports pre-authorship.** The seal precedes every
  G15 candidate:

  | artefact | mtime (local) |
  |---|---|
  | `g15/holdout-ciphertext.b64`, `g15/holdout-receipt.json` | **2026-07-22 15:53:46** |
  | `g15/candidates/h/index.ts` | 16:42:00 |
  | `g15/candidates/b/index.ts` | 16:43:32 |
  | `g15/candidates/s/index.ts` | 16:45:13 |
  | `g15/candidates/d/index.ts` | 16:45:40 |
  | `g15/optimization/h2/index.ts` (the promoted bytes) | 16:57:58 |

  The rollout envelope record corroborates the seat: `/root/g15_holdout` emits
  in the 19:40–20:00 UTC window (= 15:40–16:00 local), before the
  `/root/g15_author_{h,b,d,s}` seats emit at 20:40–20:50 UTC.
- The corpus content is substantive, not a formality. Decrypting it (I did) and
  taking **aggregate statistics only**: 180 cases across 12 named families, with
  numeric-expectation encodings `finite: 94`, `negative-zero: 13`,
  `positive-infinity: 5`, `negative-infinity: 1`, plus structural encodings
  `trailing-content: 14`, `percentage: 6`, `dimension: 6`, `integer-only: 6`,
  `delimited: 6`, `data: 8`. It deliberately covers `-0` identity, binary64
  overflow to ±Infinity, UTF-16 surrogate offsets, and parent composition. This
  refutes a hypothesis I formed and tested: I expected overflow to be
  uncovered; it is not.

*What is not proved:*
- **Blindness is self-asserted.** `g15/holdout-receipt.json`
  `authorship_receipt.statement` reads: *"Corpus content was authored before G15
  candidates existed, without inspecting G14/G15 candidate implementation
  content or prior holdout cases."* Authored by `agent: "Codex"`,
  `model_family: "OpenAI GPT-5"` — i.e. by a sibling seat of the same root,
  attesting to its own non-inspection. `FINDINGS.md` **G03** and **G04**
  correctly reject exactly this shape of evidence. The receipt itself concedes
  `candidate_path_names_incidentally_observed_in_initial_listing: true`.
- **The reveal gate was never armed.** `holdout-receipt.json` `escrow` declares
  `reveal_gate: "Do not disclose … until root supplies the exact frozen G15
  candidate-set SHA-256"` and then
  **`frozen_candidate_set_sha256: null`**. The gate that was supposed to bind
  reveal to a frozen candidate set was left unset. The seal therefore proves
  *tamper-evidence of the corpus after 15:53:46* — which is real and valuable —
  but does not prove the ceremony that was designed to prove blindness.
- **H2 was authored after the holdout was already evaluated.**
  `g15/holdout-evaluator.mts` (16:52:17) and `g15/holdout-evidence.json`
  (16:52:41) precede `g15/optimization/h2/index.ts` (16:57:58) by ~5 minutes.
  The accepted bytes are therefore an *optimization authored with the holdout
  results already in hand*. It is a reordering of candidate H's regex
  alternation (`[0-9]*\.[0-9]+|[0-9]+` → `[0-9]+(?:\.[0-9]+)?|\.[0-9]+`) and I
  find no semantic divergence, so I do not allege overfitting — but the
  promoted artefact is **not** one of the four blind-authored candidates, and
  calling its 180/180 result a *blind* holdout pass is not supportable. It is a
  **post-reveal regression pass on a post-reveal optimization**.
- The tranche's own `correctness/evidence.json` says so plainly:
  `"evidence_scope": "The corpus is regression evidence applied after candidate
  freeze; no cryptographically isolated author-access claim is made or needed."`
  The word `sealed_cases` in `acceptance.json` is therefore **stronger than the
  evidence file it summarizes**. That is a summary-inflation seam, not a lie.

**Verdict on claim "180 sealed cases":** `PARTIALLY_TRUE`. 180/180 and the
encryption/chronology are `MACHINE_FACT`; *blind pre-authorship custody* for the
**promoted** artefact is `REJECTED`.

### 2.4 Independent oracle transactions — **CONFIRMED, 65,024, and genuinely independent in kind**

Reproduced above. The oracle is declared `"imperative scanner, test-only, not
grammar"` — i.e. a differently-constructed reference implementation, not a
second copy of the candidate. 20,782 successes / 44,242 expected transactional
failures. This is the strongest single piece of correctness evidence in the
tranche. My own independent fuzz corroborates it (Part 6.3).

### 2.5 Five skeptics — **PRESENT AND COMPLETE, but the headline erases a failed round**

Ten review documents exist, in two rounds:

| round | file | verdict | envelope seat |
|---|---|---|---|
| v1 | `reviews/skeptic-1.md` (72 ln) | **ACCEPT** | `/root/g16_skeptic_semantics` |
| v1 | `reviews/skeptic-2.md` (39 ln) | **REJECT** | `/root/g16_skeptic_architecture` |
| v1 | `reviews/skeptic-3.md` (45 ln) | **ACCEPT** | `/root/g16_skeptic_correctness` |
| v1 | `reviews/skeptic-4.md` (134 ln) | **REJECT** | `/root/g16_skeptic_benchmark` |
| v1 | `reviews/skeptic-5.md` (146 ln) | **ACCEPT** | `/root/g16_skeptic_gestalt` |
| v2 | `reviews/v2-1.md` (178 ln) | ACCEPT | `/root/g16_v2_semantic` |
| v2 | `reviews/v2-2.md` (109 ln) | ACCEPT | `/root/g16_v2_runtime` |
| v2 | `reviews/v2-3.md` (97 ln) | ACCEPT | `/root/g16_v2_architecture` |
| v2 | `reviews/v2-4.md` (124 ln) | ACCEPT | `/root/g16_v2_benchmark_fresh` |
| v2 | `reviews/v2-5.md` (132 ln) | ACCEPT | `/root/g16_v2_gestalt` |

Envelope census (mine, over `raw-agent-envelopes/value-v-pi-refinement.jsonl`):
the 22:03–22:20Z window contains **5 distinct subagent authors**; the
22:20–22:29Z window contains **5 distinct, differently-named subagent authors**.
So "five fresh skeptics" is structurally corroborated by the transport record,
not merely by ten markdown files.

**But `"quintetto": "FIVE_OF_FIVE_ACCEPT"` describes only round two.** Round one
was **3 ACCEPT / 2 REJECT**, and `g16/ROOT-DISPOSITION.md:15-17` states it
without euphemism: *"The exact G16 evidence subject is REJECTED before
synthesis. Three ACCEPT verdicts cannot override two reproduced evidence
defects."*

I checked whether the re-run was a retry-until-green (the `G05` failure mode).
**It was not**, and this is important:

- The failed round is **preserved append-only** — all five v1 reports, their
  hashes, and the root disposition are on disk and are *bound into* the
  corrected subject (`skeptic-subject-v2.json` `prior_reviews[]`, with each v1
  hash and verdict recorded, including both REJECTs).
- `skeptic-subject-v2.json` `correction_boundary` declares
  `candidate_changed: false`, `semantic_contract_changed: false`,
  `correctness_corpus_changed: false`, `benchmark_corpus_changed: false`,
  `benchmark_timing_rerun: false`, `inferential_estimator_changed: false`. I
  verified the first of these directly: the candidate SHA-256 is identical
  across both rounds.
- The two blockers were **real evidence defects**, and I reproduced the second
  one myself (Part 3.2). Skeptic-4's finding — that four descriptive fields in
  `bench/evidence/result.json` are arithmetically false against the retained raw
  blocks — is correct.

So the process behaved correctly. The **label** does not: `FIVE_OF_FIVE_ACCEPT`
in the top-level acceptance record, read alone, conceals a first quintet that
rejected. A reader who stops at `acceptance.json` gets a materially rosier
picture than the bytes support.

### 2.6 Three adjudicators — **CONFIRMED, and structurally independent**

`synthesis/semantic.md` (112 ln), `synthesis/architecture.md` (80 ln),
`synthesis/performance-gestalt.md` (119 ln); each bound in `selection.json`
with its own SHA-256 and each nominating `h2` with the exact candidate hash.
Envelope census: the 22:29–22:33Z window contains exactly **three distinct
subagent authors** — `/root/g16_synth_semantic`, `/root/g16_synth_architecture`,
`/root/g16_synth_performance`. Three adjudicators actually ran.

**Caveat on "independent":** all seats are subagents of the same root, spawned
by root-composed prompts, on the same provider family. Independence here means
*separate contexts with root-curated inputs*, not separate parties. The root
chose which bytes each seat saw. That is real methodological value and it is
not the same thing as adversarial third-party review.

### 2.7 "Strict equivalent peer win" — **the arithmetic is exactly right; the word "peer" is doing unearned work**

I recomputed the entire inference from
`bench/evidence/raw-first-attempt.ndjson` (SHA-256 `372fef40…de11e54`,
545 records: 1 start, 1 bindings_verified, 1 controller_environment, 30
child_spawn, 30 child_environment, 30 semantic_preflight, 30 warmup_complete,
**360 sample_block**, 30 replicate_summary, 30 child_exit, 1 inference, 1
terminal):

| quantity | claimed | my recomputation |
|---|---|---|
| `mean_log_ratio_h2_over_deposed` | −0.07336197220979548 | **−0.07336197220979548** |
| `sample_sd_log_ratio` | 0.027244341177386378 | **0.027244341177386378** |
| `one_sided_95_upper_log_ratio` | −0.06491032168356216 | **−0.06491032168356216** |
| `geometric_mean_ratio` | 0.9292644012517273 | **0.9292644012517273** |
| `one_sided_95_upper_ratio` | 0.9371515017780626 | **0.9371515017780626** |
| erratum `h2_block_median_ns` | 21,818,104 | **21,818,104.0** |
| erratum `h2_block_mad_ns` | 576,396 | **576,396.0** |
| erratum `deposed_block_median_ns` | 23,620,145.5 | **23,620,145.5** |
| erratum `deposed_block_mad_ns` | 749,750 | **749,750.0** |

Full-precision agreement on every figure. The erratum is correct and the
original `result.json` figures (20,278,396 / 252,020.5 / 21,099,104 /
376,312.5) are indeed false. Skeptic-4's rejection was sound; the correction is
sound. The lanes' per-block output checksums are identical
(`9d4c0a76…f440b6`), so operation-equivalence on the timed domain is machine-
verified, not asserted.

**What the win is not.** The "peer" is
`cells/syntax-consume-number/g7/authorities/historical-utils.ts:96`:

```ts
export const number = regex(/-?(?:(0|[1-9]\d*)(\.\d+)?|\.\d+)([eE][+-]?\d+)?/).map(Number);
```

That is **value.js's own historical parser**, and `git log -S` shows this exact
production was *retired from `src/` at commit `164343c1`* ("feat(v4)!: value 4.0
producer surface … retire pre-v4 src trees"). It is neither an external library
nor the incumbent shipping implementation. Two further structural observations:

1. **The deposed lane is handicapped by its adapter.** `bench/benchmark.mts:165-181`
   makes the deposed lane, per operation, do
   `source.slice(offset, end)` (a fresh string allocation the candidate does not
   need, because parse-that already hands H2 its match) **plus**
   `/[eE]/.test(representation)` — a regex *literal inside the hot function*,
   which allocates a fresh `RegExp` object on every evaluation — whereas the
   candidate's own projection uses `representation.includes("e") ||
   representation.includes("E")`. That is a per-operation allocation asymmetry
   in a 320,000-op block, attributed entirely to the peer. It is not fraud —
   the adapter is needed to normalize output shape — but it is a plausible
   contributor to a **7.07 %** gap and it was not controlled.
2. **The timed domain excludes exactly where the two differ.**
   `benchmark-manifest.json` `operation.scope`: *"All 64 timed rows are in the
   exact common domain. Plus-sign and multiple-leading-zero behavioral
   differences are excluded from timing."* H2 accepts a strictly larger
   language; the inputs exercising the extra alternation branch are excluded.

**There is no external-library peer anywhere in this tranche.** The mirror's
entire dependency set is `{"@mkbabb/parse-that": "1.0.0"}` plus
`@types/node`/`tsx`/`typescript`/`vitest`. Grepping every manifest for
`css-tree`, `postcss`, `csstools`, `parsel`, `cssom` returns nothing. Every
"peer" in the tranche is one of three value.js artefacts, enumerated verbatim in
`g11/peer-manifest.json` `doors`: `live_regex` (`src/css/grammar.ts`
`parseCssScalar`), `deposed` (g7 historical-utils), `c14` (a `vnext/` prototype).

**Verdict on "strict equivalent peer win":** `PARTIALLY_TRUE`. Statistically
sound, operation-equivalent by checksum, honestly scoped **inside
`result.json`** (`scope.not_claimed` explicitly disclaims production-input
average and per-case dominance). But it is a **7 % candidate-relative win over a
deleted internal predecessor on a 64-row corpus in one pinned environment**, and
the one-word summary `"peer"` in `acceptance.json` invites precisely the
misreading `FINDINGS.md` **G08** forbids.

### 2.8 G16 net verdict

The G16 acceptance is the **only** honest acceptance in this tranche and it is
substantially better evidenced than I expected going in. Its defects are
summary-level, not substance-level: `acceptance.json` compresses
(i) a rejected first quintet, (ii) a post-reveal-optimized promoted artefact,
and (iii) an internal deposed comparator, into the three words
`FIVE_OF_FIVE_ACCEPT` and `PASS_STRICT_WIN`. The underlying documents disclose
all three. **The credit block is correct as written:**
`{"feature":1,"active_prototype":1,"full_parser":0,"production":0}`.

---

## Part 3 — G4 foundation: what is missing

`FINDINGS.md` **F07/F08** admit the close is incomplete and the holdout unproved.
I establish exactly how much is missing, and it is more than "incomplete".

### 3.1 The subject and the candidate set

`prototypes/foundation-g4/SUBJECT.json`:
`status: FROZEN_FOR_FIVE_FRESH_SKEPTICS`, five features
(`SYNTAX-ESCAPE`, `-IDENT`, `-STRING`, `-WHITESPACE`, `-COMMENTS`),
`required_verdict: "Each of five independent skeptics returns ACCEPT or REJECT
for H/B/S across all five features; three adjudicators may begin only after all
five reviews close."` `feature_credit: 0`.

The **H specimen is not in `foundation-g4/`** — it is at
`prototypes/foundation-g3/integration/grammar/css/l4/tokens/`. All six declared
hashes verify:

```
5b5dcae703d644d0ff28214032a9bdf54558e017f223c821d3006322ad428045  escape.ts      (51 ln)
2e87f6cf2e72b2cd33f5d9c443a82d85c355bc7af1b05f31ebfb87c82cb2b2de  identifier.ts  (53 ln)
9938547fd6083189f296d7764140f9ea0dd5f243287ca5238b6e66c0f04a469e  string.ts      (60 ln)
8cd4d201b115eacd3ba420c1f8ae9f6244dfe34400393c184216268f4900674f  whitespace.ts  ( 9 ln)
9c82c1008d0e7cf94917a34299e6186170aad420ea8939d7f51270857658292d  comments.ts    (24 ln)
e5d0dba2d9ff467dd4e2dad97d4812241634a094dc8791a3ea21d3057317684a  index.ts       ( 6 ln)
                                                                  ─────────────
                                                                  203 LOC
```

`FINDINGS.md` **F05** ("three candidate lineages for five operations") is
`MACHINE_FACT` as to hashes. Note the shape: `candidates/` under G4 contains
only `b` and `s`, each 6 + 22 lines — G4 is a **repair generation** that
re-authored only the plural-comments operation for B and S, with H carried
forward whole from G3. `SUBJECT.json` says so
(`"G4 is a repair generation after five G3 challenges, not a replacement
authorship claim"`), which is honest.

### 3.2 What is missing: **everything after the freeze**

```
$ find prototypes/foundation-g{0,1,2,3,4} -path "*review*" -type f
foundation-g0/reviews/skeptic-1-semantic.md
foundation-g0/reviews/skeptic-2-architecture.md
foundation-g0/reviews/skeptic-3-state.md
foundation-g0/reviews/benchmark/result.json
foundation-g0/reviews/benchmark/run.mts
foundation-g1/reviews/skeptic-{1-semantic,2-architecture,3-state,4-benchmark,5-gestalt}.md
                                       (nothing for g2, g3, g4)
```

`prototypes/foundation-g4/` contains **17 files and zero review documents.**
Not "a partial close" — **0 of 5 skeptic reports and 0 of 3 adjudicator
syntheses exist.** The envelope census confirms this at the transport layer: the
only `foundation`-named seat in the G4 time window is
`/root/foundation_g4_holdout`; there is no `foundation_g4_skeptic_*` or
`foundation_g4_synth_*` seat anywhere in the 3,283 envelopes.
`foundation-g2` and `-g3` likewise have zero reviews.

**F07 ("G4 is already apotheosis-accepted") is `REJECTED_CLAIM` — confirmed,
and with far stronger evidence than the row states.**

### 3.3 The "blind" holdout: **provably post-authorship**

There is **no receipt, no ciphertext, no seal and no destruction record**
anywhere under `prototypes/foundation-*` (a repo-wide `find` for
`*receipt*|*ciphertext*|*seal*|*destruction*` returns exactly one file, and it
is `foundation-g1/evidence/post-seal-differential.json`).
`foundation-g4/holdout/cases.json` is **plaintext JSON**, and the chronology is
fatal:

| artefact | mtime |
|---|---|
| `foundation-g3/integration/.../tokens/*.ts` (the H specimen) | 2026-07-22 **21:13:33 / 21:15:17** |
| `foundation-g4/candidates/{b,s}/**` | 2026-07-22 **21:15:58** |
| `foundation-g4/evaluate.mts` | 21:16:08 |
| `foundation-g4/bench/*`, `browser-witness.mts`, `evidence/browser.json` | 21:17–21:23 |
| `foundation-g4/holdout/evaluate.mts` | 21:23:46 |
| **`foundation-g4/holdout/cases.json`** | **2026-07-22 21:25:32** |
| `foundation-g4/SUBJECT.json` | 21:27:07 |

The holdout was written **ten minutes after the candidates and twelve minutes
after the H specimen**, in the clear, by a seat (`/root/foundation_g4_holdout`)
that emitted at 2026-07-23 01:1x–01:3xZ — i.e. after them. Corroborating the
tranche's own honesty here, `HANDOFF-2026-07-24.md:229` describes it as a
*"revealed regression suite, not proven blind"*, which is exactly right.

**F08 ("G4 holdout is proven blind") is `REJECTED_CLAIM` — confirmed. It is not
merely unproved; it is disproved by chronology.**

### 3.4 What *does* replay: F09 — **CONFIRMED**

```
$ ./node_modules/.bin/tsx prototypes/foundation-g4/holdout/evaluate.mts
  "cases": 25,
  "operationTotals": {"cssEscape":5,"cssIdentifier":5,"cssString":5,"cssWhitespace":5,"cssComments":5},
  "seats": [ {"seat":"H","passed":25,"total":25,"digest":"9df7e68319867f06188b8c26c73325b439f517811732c8340af8c683b14679bd"},
             {"seat":"B","passed":25,"total":25,"digest":"9df7e6…4679bd"},
             {"seat":"S","passed":25,"total":25,"digest":"9df7e6…4679bd"} ],
  "suiteSha256": "c1646c88d3b2fcd83b0900de2b3e3ca8f1edcabca6d0b167323cefc14c8bfad0"
```

25/25 on all three seats, digest matching `SUBJECT.json`
`holdout_result.normalized_output_sha256` exactly. **F09 `MACHINE_FACT`** — as a
*revealed regression* result, which is what it is.

### 3.5 Was any of it treated as accepted downstream? — **NO**

`apotheosis/grammar/css/l4/` contains only `value-unit/numeric.ts`; there is no
`tokens/` directory. No cell or candidate imports
`prototypes/foundation-g3/integration/**` (grep is empty except within
foundation itself). `SUBJECT.json` `feature_credit: 0` and `performance` block
self-declares `candidate_relative: true, peer_win: false, full_parser_win:
false`. **No G4 leakage into acceptance.** The tranche did not cheat here.

---

## Part 4 — Percentage G0–G2 and known-dimensions G0

### 4.1 Percentage: correctness green, performance **FAIL** — **CONFIRMED**

Three generations. The G2 integration production
(`cells/value-percentage-literal/g2/integration/grammar/css/l4/value-unit/percentage.ts`,
7 lines) is:

```ts
import { string } from "@mkbabb/parse-that/core";
import { consumeNumber } from "./numeric.js";

export const percentageLiteral = consumeNumber
    .skip(string("%"))
    .map((number) => ({ kind: "percentage" as const, number }));
```

Its sibling `numeric.ts` is byte-identical to the accepted source
(`8c3ac689…e95aa`, verified). So **F11** ("direct composition over accepted
numeric") is `MACHINE_FACT`.

`g2/ROOT-DISPOSITION.md:18-20`: *"Acceptance remains withheld pending fresh
five-skeptic and three-adjudicator review of these exact correction bytes."* No
`g2/reviews/` exists; the envelope census shows `percentage_skeptic_*` (5 seats,
G0) and `percentage_g1_*` (3 seats, G1) but **no G2 seats**. Acceptance is
genuinely withheld.

The benchmark evidence is `status: FAIL` in both attempts, and the reason is
exactly what **F12** says:

`g0/evidence/benchmark-v3-first-attempt.json`:
| comparison | geo-mean ratio | strict win |
|---|---|---|
| `h2-public / live-public` | 0.3815 | ✅ |
| `h2-public / rejected-public` | 0.0767 | ✅ |
| **`h2-internal / prior-internal`** | **1.1138** | ❌ |

`g2/bench/raw-attempt-1.json` medians (ns): `g2-public 8,757,333` ·
`live-public 21,614,500` · `rejected-public 114,605,417` ·
**`g2-internal 4,678,375` vs `prior-internal 4,289,500`** (ratio ≈ 1.091),
overall `status: FAIL`.

**F12 `MACHINE_FACT`.** With one correction of vocabulary: the row says "beats
public peers", and the peers named `live-public` / `rejected-public` are
value.js's own live regex extraction and its own rejected pre-reset parser.
"Public" here means *public-entry-point-shaped operation*, **not** a third-party
library. No external peer exists.

### 4.2 Known dimensions G0 — identifier-boundary counterexample **REPRODUCED**

Three reviews, all REJECT (`reviews/skeptic-{1-semantic,2-architecture,3-state}.md`).
The controlling normative chain is CSS Syntax 3 §*check if two code points are a
valid escape* (false only if the first is not `\` **or the second is a
newline** — EOF is therefore a valid second code point), §*consume an escaped
code point* (EOF ⇒ U+FFFD), §*consume an ident sequence* (valid escapes are part
of the identifier). So `1px\` is a dimension with unit `px�`, and a
known-unit parser must fail at its entry offset.

I ran the exact frozen H/B/S bytes myself:

```
label     |            H / B / S                          | required
----------|-----------------------------------------------|----------------------------
bs-at-EOF | H=OK@3:px   B=FAIL@0     S=OK@3:px             | FAIL@0   (valid escape)
bs-LF     | H=OK@3:px   B=FAIL@0     S=OK@3:px             | OK@3     (not a valid escape)
bs-CRLF   | H=OK@3:px   B=FAIL@0     S=OK@3:px             | OK@3
bs-FF     | H=OK@3:px   B=FAIL@0     S=OK@3:px             | OK@3
bs-hex    | H=FAIL@0    B=FAIL@0     S=FAIL@0              | FAIL@0   ✓ all correct
raw-NUL   | H=OK@3:px   B=OK@3:px    S=FAIL@0              | FAIL@0   (NUL→U+FFFD)
plain     | H=OK@3:px   B=OK@3:px    S=OK@3:px             | OK@3     ✓ control
px+x      | H=FAIL@0    B=FAIL@0     S=FAIL@0              | FAIL@0   ✓ control
```

This is a **line-for-line reproduction of skeptic-1's table** and it extends it
with the CRLF/FF/NUL rows. H and S **under-reject** an identifier continuation
(`1px\` at EOF); B **over-rejects** a delimiter boundary (`1px\` + LF/CRLF/FF)
because `identifierContinuation` at `candidates/b/index.ts:31`
(`/[-_a-z0-9\\-\u{10ffff}]/iu`) treats *every* backslash as continuation
without examining the next code point. **No candidate is correct on all rows.**

**F13 ("known-dimension G0 is accepted") is `REJECTED_CLAIM` — confirmed by my
own executable replay.** **F14** (canonical identifier grammar as boundary
assertion) is the right repair direction and remains `OPEN`.

*One caveat I owe the adjudicators:* the `raw-NUL` row is conditional. If the
parser's contract assumes CSS input preprocessing has already mapped U+0000 to
U+FFFD, raw NUL never reaches this production and the row is moot. Skeptic-2
flags this ("absent a guaranteed preprocessor"). The five backslash rows are
**not** conditional.

---

## Part 5 — Compliance: no lexer / scanner / token tape / atom algebra / generic CST / source cursor / broad remainder

### 5.1 The active tree passes — because it cannot fail

Grep over `apotheosis/**/*.ts` (the entire active runtime + test + config):

| construct | occurrences in active `.ts` |
|---|---|
| `lexer` / `Lexer` | **0** |
| `scanner` / `Scanner` / `tokenize` | **0** |
| `TokenTape` / "token tape" | **0** |
| `atom` / `Atom` | **0** |
| `CST` / `ComponentValue` | **0** |
| `cursor` | **0** |
| `remainder` | **0** |
| `charCodeAt`, `slice(`, `while (` | **0** |
| `for (` | 1 — `test/…/numeric.test.ts:46`, a 1,000-iteration parser-ID loop |

Zero forbidden constructs. But the active runtime is **one 17-line file
containing one `regex()` and one `.map()`**. There is no configuration of a
single regex-plus-projection that could contain a token tape or a CST. **This
compliance gate is presently vacuous — it cannot fail.** It will become a
meaningful gate the first time a second family lands. The only occurrences of
those words in the active tree are in `apotheosis/README.md:8-10, 20` — prose
asserting their absence.

### 5.2 The rejected pre-reset architecture, inventoried

`mirror/REJECTED-PRE-RESET.md` quarantines "the owner-rejected
lexical/atom/component-value/CST route, manual source-walking utilities". It is
real and it is substantial — 23 runtime files, **2,589 LOC**:

```
grammar/css/l4/syntax/atom.ts             125   ← atom algebra
grammar/css/l4/syntax/component-value.ts  157   ← generic CST substrate
grammar/css/l4/syntax/source.ts            50   ← feature-local source cursor
grammar/css/l4/syntax/tokens.ts           186   ← token layer
grammar/css/l4/syntax/types.ts             90   ← CssToken / CssComponentValue types
grammar/css-token.ts                       58
grammar/component.ts                       47
grammar/css/l4/color.ts                   248 · color/project.ts 357 · values/project.ts 186
grammar/easing.ts 137 · value.ts 96 · color.ts 43 · keyframe-selector.ts 75
grammar/{combinators,index}.ts             34
grammar/css/l4/{combinators,tokens,value-unit}.ts  119
stylesheet/{analyze,collect,index}.ts     581
```

`grammar/value.ts:12` and `grammar/color.ts:10` both carry the comment
*"Composable CST-backed grammar"*. This is unambiguously the vetoed route.

`npm run test:rejected-g0` is **green**: 14 test files, **86 passed | 2 todo**,
2.36 s — including a file literally named `test/scanners.test.ts`. So
`FINDINGS.md` **B05** ("substantial runnable reference code") is `MACHINE_FACT`
and **B06** ("accepted architecture") is `REJECTED_CLAIM` — confirmed on both
counts.

**Gestalt note for the adjudicators:** the reset moved the tranche from an
86-test green suite over ~2,589 LOC of CST-route parser to a 4-test green suite
over 17 LOC. That was a deliberate, owner-ordered architectural choice
(`ADDENDA-07 §0`), not a regression — but the arithmetic should be stated
plainly rather than absorbed into "the first accepted direct feature".

### 5.3 Did the rejected architecture leak back? — **a quarantine breach, not architectural contamination**

`tsconfig.apotheosis.json` `exclude` lists `"grammar"`. The exclusion is
**defeated by transitive import**. `tsc --listFiles` shows three rejected-tree
modules inside the "clean" compilation:

```
grammar/css/l4/combinators.ts
grammar/css/l4/tokens.ts
grammar/css/l4/value-unit.ts
```

The single entry point is
`cells/value-percentage-literal/g0/benchmark-peers.ts:1`:

```ts
import { percentage as priorPercentage } from "../../../grammar/css/l4/value-unit.js";
```

used at line 35 as *"Operation-equivalent adapter over the rejected pre-reset
direct percentage parser"* — i.e. a declared benchmark peer.

Severity assessment, honestly bounded:

- `mirror/REJECTED-PRE-RESET.md` says the rejected tree "cannot be imported by
  candidates". `benchmark-peers.ts` is a **peer adapter, not a candidate**, so
  the letter of that rule holds.
- `apotheosis/clean-base.json` invariant 3 forbids imports crossing *from
  `apotheosis` into* the rejected runtime. No such import exists. That invariant
  holds.
- `REJECTED-PRE-RESET.md` also says *"The package defaults now check/test only
  the clean root and governed feature cells."* Since `value-percentage-literal`
  **is** a governed feature cell, this is arguably satisfied too — but the
  practical effect is that `npm run check`, the tranche's headline strict gate,
  compiles rejected-route modules.
- **Crucially, the three leaked modules are *not* the forbidden architecture.**
  I read them: `tokens.ts` and `combinators.ts` are pure `regex`/`string`
  terminals over `@mkbabb/parse-that`; `value-unit.ts` imports only those two.
  None reaches `syntax/atom.ts`, `syntax/component-value.ts` or `syntax/source.ts`.

**Verdict:** `PARTIALLY_TRUE` breach — the quarantine *boundary* is porous and
the `exclude` list creates a false impression of isolation, but **no atom /
CST / token-object / source-cursor code is in the active compilation graph.** I
would fix the appearance (bind the peer by hash and run it out-of-graph) rather
than treat it as contamination.

### 5.4 Declared captures missing on disk

Empty directories inside the frozen subject:

```
cells/value-number/g1/fixtures                       (the whole value-number cell is empty)
cells/syntax-number-start/candidates                 (empty)
cells/syntax-number-start/bench                      (empty)
cells/syntax-number-start/g7/private                 (empty)
cells/value-percentage-literal/g2/candidates/h4      (empty)
../cells/syntax-number-{start,repr}/{candidates,bench}  (empty, outside mirror)
formation/session-audit/reviews                      (empty — the audit's own review dir)
```

`value-number/g1` contains **zero files**. `value-percentage-literal/g2/candidates/h4`
is an empty candidate slot. These are declared-but-unmaterialized captures.

---

## Part 6 — Accepted parser code versus process artefact: the honest ratio

### 6.1 Census of the frozen subject

From `audit-subject-ledger.tsv` (2,324 rows; my Python aggregation):

| category | bytes | files | share |
|---|---:|---:|---:|
| `denominator/` — machine-generated corpus-analysis output | **255,457,954** | 157 | **72.1 %** |
| `mirror/node_modules/` — third-party | 79,477,119 | 1,150 | 22.4 % |
| `formation/session-audit/raw-*` — rollout archives | 9,251,900 | 10 | 2.6 % |
| `mirror/cells/` — feature-cell process artefacts | 5,851,494 | 557 | 1.65 % |
| root `ADDENDA-*` / audit markdown (47 files) | 1,527,056 | 47 | 0.43 % |
| `mirror/prototypes/` — foundation G0–G4 | 470,116 | 184 | 0.13 % |
| `mirror/` rejected pre-reset + misc | 369,316 | 99 | 0.10 % |
| **`mirror/apotheosis/` — the ACTIVE ROOT** | **5,780** | **6** | **0.0016 %** |
| **of which the accepted parser** | **560** | **1** | **0.00016 %** |

### 6.2 The ratios, stated plainly

- **Accepted parser bytes ÷ total tranche bytes = 560 ÷ 354,220,932 ≈
  1.58 × 10⁻⁶ — one part in 632,537.**
- Excluding third-party `node_modules`: **560 ÷ 274,743,813 ≈ one part in
  490,614.**
- Excluding `node_modules` **and** the `denominator/` corpus output (i.e. against
  "hand-shaped tranche work" only): **560 ÷ 19,285,859 ≈ one part in 34,439
  (0.0029 %).**

Line counts:

| | files | LOC |
|---|---:|---:|
| accepted active parser | 1 | **17** |
| accepted active parser + its test + config | 3 | 79 |
| all candidate/probe/integration `.ts` ever authored (every generation, every feature, accepted + rejected) | 134 | 5,260 |
| all authored `.ts`/`.mts`/`.mjs` under `mirror/` excluding `node_modules` (harnesses, validators, benches, evaluators) | 369 | **36,331** |
| rejected pre-reset runtime | 23 | 2,589 |

**Roughly 36,331 lines of evidence machinery were authored to promote 17 lines
of parser — a ratio of about 2,137 : 1.** `FINDINGS.md` **I01** states this
qualitatively; the arithmetic is worse than the row implies.

### 6.3 The two sharpest volume facts I found

**(a) 139 MB of the tranche is two near-identical copies of a rejected file.**
`denominator/occurrence-owner-formation-v2.json` (69,589,449 bytes) and
`-v3.json` (69,590,643 bytes) are **structurally identical**: all fifteen
top-level keys are present in both, and the only differing members are
`schema_version`, `authority`, `generator_and_schema_identity`, `blockers`,
`content_digest_sha256`, `replay`, plus one added key `withdrawn_v2_input`. The
entire 69.5 MB payload (`authenticated_evidence`, `authenticated_source_closure`,
`discovery_carrier_substrate`, `operation_boundary_formation`,
`typed_scoped_reference_discovery`, …) is byte-equal. **69.59 MB was duplicated
to change roughly 1.2 KB of header** — and *both* are rejected
(`occurrence-owner-formation-v2-rejection.json` and `-v3-rejection.json` both
exist). Together they are **39.3 % of the entire 354 MB tranche.**
`FINDINGS.md` **H05** ("occurrence-owner V1–V9 prove denominator ownership")
is `REJECTED_CLAIM`; the storage cost of that rejected lineage is 255 MB.

**(b) A whole feature ran seven generations and produced zero parser code.**
`cells/syntax-number-start/` has generations g1 (at cell root) and g2–g7 — **72
files**, complete with `contract.ts`, `harness.ts`, `holdout-receipt.json`,
`benchmark-protocol.json`, `promotion-protocol.json`, `promotion-verifier.mjs`
per generation — and its `candidates/` and `bench/` directories are **empty**.
`g1/rejection.json` records `candidate_sources_authored: false`;
`g7/feature-public.json:56` records the terminal verdict
`"TWO_REJECTS_PLUS_ROOT_REJECT_BEFORE_CANDIDATE_CODE"`. **Seven full
admission/holdout/benchmark ceremonies, no candidate ever written.**
`FINDINGS.md` **F01** retires the feature and **I02** calls the granularity
pathological; both are correct and understated.

**Generation census:** 33 generations across 6 feature lineages
(`syntax-consume-number` 16 · `syntax-number-start` 7 · `foundation` 5 ·
`value-percentage-literal` 3 · `value-number` 1 (empty) ·
`value-unit-known-dimensions` 1) → **one accepted 17-line feature.**

### 6.4 To the tranche's credit

Artefact volume is not the same as fraud, and I want the adjudicators to weigh
the counterevidence I found:

- Every acceptance record I checked carries an explicit, correct zero-credit
  block (`"full_parser": 0, "production": 0`).
- Failed attempts are preserved, not deleted (`bench/attempt-1-failure.json`,
  `bench/evidence/v1-failure.json`, `benchmark-erratum.json`, both rejected
  denominator generations, all ten G16 reviews including the two REJECTs).
- Rejections are recorded as first-class artefacts with hashes.
- The two hostile findings that mattered (skeptic-2's selection-binding gap and
  skeptic-4's false descriptive fields) were **acted on**, not overridden by a
  3-2 majority.

The pathology is **process economy**, not integrity.

### 6.5 Independent robustness check of the accepted parser (mine)

```
200,000 random calls (24-char alphabet incl. surrogate-pair emoji, backslash,
NUL-adjacent, arbitrary entry offsets):
  {"N":200000,"ok":53453,"err":146547,"throws":0,"badOffset":0}
10⁶-digit hostile input:
  {"millionDigits":{"isError":false,"offset":1000000,"ms":1.76425}}
parser-ID stability after 100,000 parses:
  {"idStable":true,"id0":2,"id1":2}
```

Zero throws, zero offset violations, bounded on a megabyte input, exactly two
`Parser` instances constructed for the whole module. **`FINDINGS.md` G01
(no-throw) and G12 (bounded hostile inputs) hold for this exact operation.**
`G13` (static grammar, parser-ID bounded) holds: `id === 2`, unchanged.

Semantic edge probe (17 inputs), for the record:

```
"1e999"  → off=5 {sign:null,type:"number",value:Infinity}
"-0"     → off=2 {sign:"-",type:"integer",value:-0}     (Object.is-preserved)
"00012"  → off=5 {sign:null,type:"integer",value:12}
"1."     → off=1 {sign:null,type:"integer",value:1}     (maximal prefix)
"1e+"    → off=1 {…,value:1}      "1.2.3" → off=3 {…,value:1.2}
"."      → ERR    "-" → ERR       "1e-999" → off=6 {…,value:0}
10⁶ nines → {sign:null,type:"integer",value:Infinity}
```

The ±Infinity behaviour on binary64 overflow is **deliberate**, not an
oversight: the sealed corpus contains `positive-infinity: 5` and
`negative-infinity: 1` expectation encodings. Whether Infinity is the
spec-correct CSS answer (browsers clamp rather than produce Infinity) is an
O4 question and I leave it **OPEN** — no browser/CSSOM witness binds
consume-number anywhere in this subject.

---

## Part 7 — parse-that 1.0.0 `leaf.skip(suffix)` (§7.3): real, reproduced, and mis-scoped

`HANDOFF-2026-07-24.md:255-262` claims: *"after `leaf.skip(suffix)` consumes a
successful leaf and the suffix fails, the offset rewinds but the child value
remains. Direct leaf failure was transactional."*

### 7.1 Minimal reproduction (mine)

```js
const leaf     = regex(/[0-9]+/).map(r => ({ tag: "leaf", value: Number(r) }));
const composed = leaf.skip(string("%"));

// A: suffix fails after a successful leaf
const predecessorA = { tag: "PREDECESSOR" };
const stateA = new ParserState("12x", predecessorA);
composed.call(stateA);
```

```
A same-state: true
A isError: true
A offset: 0                      ← offset IS rewound
A value: {"tag":"leaf","value":12}   ← child value REMAINS
A value === predecessor: false       ← predecessor CLOBBERED

B (direct leaf failure) isError: true  offset: 0  value===predecessor: true

D (exact promoted consumeNumber shape, `.skip(string("%"))` on "12.5deg"):
  isError: true  offset: 0  value: {"sign":null,"type":"number","value":12.5}  value===pred: false
```

**The claim is REAL and reproduces exactly, including on the exact promoted
`consumeNumber` bytes.**

### 7.2 Is it a parse-that defect or a misuse? — **neither, as stated; it is a mis-scoped observation about a library-wide convention**

The implementation is `node_modules/@mkbabb/parse-that/dist/packrat-entry-CS1td-8B.js:973`:

```js
skip(parser) {
  const skip = (state) => {
    const savedOffset = state.offset;      // saves ONLY offset
    this.parser(state);
    if (!state.isError) {
      const value1 = state.value;
      parser.parser(state);
      if (!state.isError) return state.ok(value1);
    }
    mergeErrorState(state);
    state.offset = savedOffset;            // restores ONLY offset
    state.isError = true;
    return state;                          // value is left as the child wrote it
  };
```

I then read the two combinators the handoff does **not** mention:

- `any(...)` (line 396) — on each failed alternative: `state.offset =
  savedOffset; state.isError = false;` — **offset only**.
- `all(...)` / `fuseAll` (line 481) — on child failure: `state.offset =
  savedOffset; state.isError = true;` — **offset only**.

Meanwhile the library ships a *full* transaction primitive it does not use in
its own core combinators (line ~321):

```js
save()    { return { offset: this.offset, value: this.value }; }
restore(s){ this.offset = s.offset; this.value = s.value; this.isError = false; return this; }
```

**Conclusions:**

1. **It is not `skip`-specific.** `any` and `all` behave identically. The
   handoff's framing — "a common parse-that 1.0.0 behavior … after
   `leaf.skip(suffix)`" — under-describes the finding by attaching it to one
   combinator. The correct statement is: **in parse-that 1.0.0, failure is
   transactional in `offset` and *not* transactional in `value`, uniformly
   across `skip`, `any` and `all`.**
2. **It is a deliberate engine convention, not a bug** — almost certainly a
   performance choice (one fewer field write per failure), and defensible
   because `isError === true` renders `state.value` meaningless by contract.
   Under that contract, reading `state.value` after a failure is **misuse**.
3. **But the contract is undocumented.** `dist/parser.d.ts:18` declares only
   `skip<S>(parser: Parser<T | S>): Parser<T>` with no failure-state clause,
   and `state.d.ts` exports `save`/`restore` without saying core combinators
   don't use them. A consumer cannot know the rule from the published types.
4. **It is currently unobservable through the standard combinators.** I probed:
   `any(leaf.skip(string("%")), leaf.skip(string("px")))` on `"12px"` returns
   the correct value at offset 4; `pct.opt()` on `"12.5deg"` returns `undefined`
   at offset 0; `all(pct.opt(), ident)` on `"12.5deg"` returns `["12.5deg"]` at
   offset 7. The stale value is overwritten before anything reads it.
5. **The accepted parser's own test asserts the property at the one altitude
   where it holds.** `numeric.test.ts:44` asserts `state.value === predecessor`
   on a *direct leaf* failure. Under `.skip` composition — the shape of the very
   next planned feature (`percentageLiteral = consumeNumber.skip(string("%"))`)
   — that assertion would fail.

**Verdict:** `FINDINGS.md` **G11** classifies this `RESEARCH_ONLY` with the
note that "parent-integration contract must be established before engine-defect
claim". **That is the correct disposition and I affirm it**, with one amendment
the adjudicators should carry into `ADDENDA-09`: the finding must be **restated
at library scope** (`skip` ∪ `any` ∪ `all`), and the correct remedy is a
documented failure-state contract in parse-that, not a candidate-local
workaround. The tranche's own decision *not* to escalate this to an engine
defect or an uplift request is, in my assessment, the single most disciplined
judgement call in the subject.

---

## Findings

Each finding is `ID · claim · verdict · evidence`. Verdicts follow the evidence
law: nothing is upgraded for repetition or eloquence.

### O2-01 · The active root is genuinely green, and genuinely tiny · **CONFIRMED**
`npm run check` exits 0 under `strict` + `noUncheckedIndexedAccess` +
`exactOptionalPropertyTypes` + `verbatimModuleSyntax`, compiling 108
non-`node_modules` files. `npm test` passes 4/4. The accepted runtime is
`mirror/apotheosis/grammar/css/l4/value-unit/numeric.ts`, 17 LOC / 560 bytes,
SHA-256 `8c3ac689…e95aa`. *Severity: INFO (it is what it claims).*

### O2-02 · Four tests are not CSS correctness evidence, and are not offered as such · **CONFIRMED**
`clean-base.json:11` labels them "four active integration tests". The
correctness weight sits in the G16 holdout (O2-04). `FINDINGS.md` **B04** is
correct. *MINOR.*

### O2-03 · `npm test` carries `--passWithNoTests`; the promotion gate can be made vacuous by deletion · **CONFIRMED**
`mirror/package.json:8`. Not vacuous today (4 tests run), but the wrong default
for a rail that gates promotion. *MINOR.*

### O2-04 · G16 correctness is fully reproducible · **CONFIRMED**
My cold re-run of `holdout-replay.mts --verify` emitted output **byte-identical**
to the frozen `correctness/evidence.json`: 180/180 across 12 families, 9
construction assertions, 65,024 independent-oracle calls
(20,782 ok / 44,242 expected failures), parser-ID stable, no per-call growth.
*This is the strongest evidence artefact in the tranche.* `MACHINE_FACT`.

### O2-05 · Promotion identity is exact · **CONFIRMED**
`g15/optimization/h2/index.ts` and `apotheosis/.../numeric.ts` are byte-identical
and both hash to `8c3ac689f2e24635216ac0499f23166996ac0136e0b6876e82a8da4f75eb95aa`.
Source is mode `0444`, 560 bytes, 17 LF lines. `MACHINE_FACT`.

### O2-06 · The holdout is really sealed and really pre-candidate — but its *blindness* is self-asserted and its reveal gate was never armed · **PARTIALLY_TRUE**
AES-256-GCM, external `/tmp` escrow key at mode `0600` (still present, which is
why replay works), AAD binding feature/generation/semantic-contract/CSSWG commit
`08f2f799…`. Ciphertext mtime `15:53:46` precedes all four candidates
(`16:42–16:45`). Envelope seat `/root/g15_holdout` precedes
`/root/g15_author_{h,b,d,s}`. **Against:** `holdout-receipt.json`
`escrow.frozen_candidate_set_sha256: null` — the reveal gate was never bound;
blindness rests on `authorship_receipt.statement`, a self-attestation by a
sibling Codex seat, which `FINDINGS.md` G03/G04 reject as a class. *MAJOR for
the word "sealed" in `acceptance.json`; the mechanism itself is sound.*

### O2-07 · The promoted artefact H2 was authored **after** the holdout was decrypted and evaluated · **CONFIRMED**
`g15/holdout-evidence.json` 16:52:41 → `g15/optimization/h2/index.ts` 16:57:58.
H2 is an optimization of blind-authored candidate H, not itself a blind
candidate. I compared the two regexes and find them semantically equivalent
(`[0-9]*\.[0-9]+|[0-9]+` vs `[0-9]+(?:\.[0-9]+)?|\.[0-9]+`), so I allege no
overfitting — but "180 sealed cases pass" describes a **post-reveal regression
pass on a post-reveal artefact**. `correctness/evidence.json` `evidence_scope`
concedes exactly this. *MAJOR (label), MINOR (substance).*

### O2-08 · `"quintetto": "FIVE_OF_FIVE_ACCEPT"` conceals a 3-ACCEPT/2-REJECT first quintet · **CONFIRMED**
`g16/ROOT-DISPOSITION.md:7-17`. Both REJECTs are on disk, hashed, and bound into
`skeptic-subject-v2.json` `prior_reviews[]`. The re-run changed **no** candidate
byte, corpus, estimator or timing (`correction_boundary`, all false; candidate
hash identical across rounds). **This is a legitimate correction, not a
retry-until-green** — but the top-level label does not say so. *MAJOR (label).*

### O2-09 · The G16 evidence packet contained four arithmetically false fields, caught by a skeptic and correctly errata'd · **CONFIRMED BY INDEPENDENT RECOMPUTATION**
From the 360 retained blocks I compute h2 median/MAD = **21,818,104 /
576,396** ns and deposed = **23,620,145.5 / 749,750** ns — matching
`benchmark-erratum.json` exactly and refuting `result.json`'s
20,278,396 / 252,020.5 / 21,099,104 / 376,312.5. The predeclared inference
(mean log ratio, SD, one-sided 95 % upper, geometric mean) reproduces to full
float precision. *The gate worked. INFO, reported as credit.*

### O2-10 · Three adjudicators genuinely ran · **CONFIRMED**
Three synthesis documents, each hash-bound in `selection.json`, each nominating
`h2` with the exact candidate hash; three distinct envelope seats
(`g16_synth_semantic` / `_architecture` / `_performance`) in the 22:29–22:33Z
window. `MACHINE_FACT`, with the standing caveat that all seats are
same-root, same-provider subagents.

### O2-11 · "Strict equivalent peer win" is a 7 % candidate-relative win over a **deleted internal predecessor**, with an uncontrolled adapter asymmetry · **PARTIALLY_TRUE**
Peer = `g7/authorities/historical-utils.ts:96`, a value.js parser retired from
`src/` at commit `164343c1`. `bench/benchmark.mts:165-181` makes the peer lane
pay a per-operation `source.slice()` **and** a `/[eE]/.test()` regex-literal
allocation that the candidate does not; the timed corpus excludes the 64→
plus-sign and multiple-leading-zero rows where the two languages differ.
`result.json` `scope.not_claimed` is honest; `acceptance.json`'s one-word
`"peer"` is not. *MAJOR for the summary; the statistics themselves are sound.*

### O2-12 · **No external-library peer exists anywhere in the tranche** · **CONFIRMED**
`mirror/package.json` dependencies = `{"@mkbabb/parse-that":"1.0.0"}` only.
`g11/peer-manifest.json` `doors` enumerates all three peer identities and every
one is a value.js artefact (`live_regex`, `deposed`, `c14`). Grep for
`css-tree|postcss|csstools|parsel|cssom` across all manifests: empty. Every
performance claim in V·π is value.js versus value.js. *MAJOR — this should be
stated once, prominently, in `ADDENDA-09`.*

### O2-13 · Foundation G4's five-plus-three close is **entirely absent**, not partial · **CONFIRMED**
`prototypes/foundation-g4/` = 17 files, **0 reviews, 0 syntheses**. `-g2` and
`-g3` likewise 0. Only `-g0` (3 skeptics + benchmark) and `-g1` (5 skeptics)
have any. Envelope census: no `foundation_g4_skeptic_*` or `_synth_*` seat
exists in any of the 3,283 envelopes. `FINDINGS.md` **F07** confirmed and
strengthened. *BLOCKER for any downstream G4 credit.*

### O2-14 · Foundation G4's holdout is **provably post-authorship**, in plaintext, with zero custody artefacts · **CONFIRMED**
`holdout/cases.json` mtime `21:25:32` vs candidates `21:15:58` and H specimen
`21:13:33`. No receipt / ciphertext / seal / destruction record anywhere under
`prototypes/`. Seat `/root/foundation_g4_holdout` emits after the candidate
seats. **F08** confirmed — disproved, not merely unproved.
`HANDOFF-2026-07-24.md:229` already says "revealed regression suite, not proven
blind", which is correct. *MAJOR, correctly self-reported.*

### O2-15 · G4's H specimen exists, hashes exactly, and no part of G4 was treated as accepted downstream · **CONFIRMED**
All six declared file hashes verify at
`prototypes/foundation-g3/integration/grammar/css/l4/tokens/` (203 LOC).
`apotheosis/grammar/css/l4/` has no `tokens/`. No import reaches
`foundation-g3/integration/**` from outside foundation. `feature_credit: 0`;
`performance.peer_win: false`. *INFO — clean.*

### O2-16 · G4's revealed-regression replay reproduces exactly · **CONFIRMED**
25/25 on H, B and S; digest `9df7e68319867f06188b8c26c73325b439f517811732c8340af8c683b14679bd`
matches `SUBJECT.json`. **F09** `MACHINE_FACT`, as a *revealed* result.

### O2-17 · Percentage acceptance is genuinely withheld; its benchmark genuinely FAILs on the internal lane · **CONFIRMED**
`g2/ROOT-DISPOSITION.md:18-20`; no `g2/reviews/`; no G2 envelope seat.
`benchmark-v3-first-attempt.json` `status: FAIL`,
`h2-internal/prior-internal = 1.1138` (strict win false);
`g2/bench/raw-attempt-1.json` `status: FAIL`, `g2-internal 4,678,375` vs
`prior-internal 4,289,500`. **F11 confirmed, F12 confirmed** — with the
vocabulary correction that "public peers" are value.js's own live and rejected
implementations, not third-party libraries. *MINOR (wording).*

### O2-18 · Known-dimensions identifier-boundary defects reproduce exactly, and no candidate is correct · **CONFIRMED BY EXECUTABLE REPLAY**
Table in §4.2. H and S accept `1px\` at EOF (must fail: the trailing backslash
is a valid escape ⇒ unit is `px�`); B rejects `1px\`+LF/CRLF/FF (must
succeed at offset 3: backslash-newline is not a valid escape) because
`candidates/b/index.ts:31` treats every backslash as identifier continuation.
**F13** confirmed. **F14** remains `OPEN` and is the right repair direction.
Caveat: the raw-NUL row is conditional on whether input preprocessing is
guaranteed. *MAJOR — three of three reviews were right.*

### O2-19 · The no-scanner/no-CST compliance gate is currently **vacuous** · **CONFIRMED**
Zero occurrences of lexer/scanner/tokenize/atom/CST/ComponentValue/cursor/
remainder/charCodeAt/slice/while across the whole active runtime — which is one
17-line `regex().map()`. The gate cannot fail on this input. It becomes real
only when a second family lands. *MAJOR as a statement about what the green
means; not a defect in the code.*

### O2-20 · The rejected pre-reset tree leaks into the "clean" typecheck through a benchmark peer import · **CONFIRMED, bounded severity**
`cells/value-percentage-literal/g0/benchmark-peers.ts:1` imports
`../../../grammar/css/l4/value-unit.js`, dragging
`grammar/css/l4/{value-unit,tokens,combinators}.ts` into `npm run check` despite
`tsconfig.apotheosis.json` `"exclude": ["grammar", …]`. **However**, I read all
three: they are pure `regex`/`string` combinator modules and none reaches
`syntax/atom.ts`, `syntax/component-value.ts` or `syntax/source.ts`. The
`apotheosis`→rejected direction (the invariant that actually matters) is clean.
*MINOR — a false impression of isolation, not contamination.*

### O2-21 · The rejected pre-reset architecture is real, substantial, and still green · **CONFIRMED**
23 files / 2,589 LOC including `syntax/atom.ts` (125), `syntax/component-value.ts`
(157), `syntax/source.ts` (50), `syntax/tokens.ts` (186), with
`grammar/value.ts:12` and `grammar/color.ts:10` explicitly commented
"CST-backed grammar". `npm run test:rejected-g0` → **86 passed | 2 todo** in
14 files, including `test/scanners.test.ts`. **B05 confirmed, B06 confirmed.**
The reset traded an 86-test suite over 2,589 LOC for a 4-test suite over 17 LOC.
*INFO — state it plainly in `ADDENDA-09`.*

### O2-22 · Accepted parser code is **one part in 632,537** of the tranche by bytes; ~2,137 lines of machinery per line of parser · **CONFIRMED**
560 / 354,220,932 bytes. Against non-third-party, non-corpus bytes: 560 /
19,285,859 ≈ 0.0029 %. 36,331 authored `.ts`/`.mts`/`.mjs` lines under `mirror/`
(excl. `node_modules`) → 17 accepted lines. 33 generations across 6 feature
lineages → 1 accepted feature. **I01 confirmed and understated.** *MAJOR.*

### O2-23 · 39.3 % of the tranche is two byte-near-identical copies of a **rejected** analyzer output · **CONFIRMED**
`denominator/occurrence-owner-formation-v2.json` (69,589,449 B) and `-v3.json`
(69,590,643 B) differ only in `schema_version`, `authority`,
`generator_and_schema_identity`, `blockers`, `content_digest_sha256`, `replay`
and one added key `withdrawn_v2_input`; the ~69.5 MB payload is identical. Both
carry rejection files. Total `denominator/` = 255,457,954 B = 72.1 % of the
tranche, and **H05** marks the whole occurrence-owner lineage
`REJECTED_CLAIM`. *MAJOR — artifact volume posing as progress, in its purest
observable form.*

### O2-24 · A whole feature ran seven generations and produced zero parser code · **CONFIRMED**
`cells/syntax-number-start/`: g1–g7, 72 files, empty `candidates/` and `bench/`;
`g1/rejection.json` `candidate_sources_authored: false`;
`g7/feature-public.json:56` `"TWO_REJECTS_PLUS_ROOT_REJECT_BEFORE_CANDIDATE_CODE"`.
**F01 and I02 confirmed.** *MAJOR.*

### O2-25 · Declared captures missing on disk · **CONFIRMED**
`cells/value-number/g1/` (entire cell, 0 files),
`cells/value-percentage-literal/g2/candidates/h4/` (empty candidate slot),
`cells/syntax-number-start/{candidates,bench,g7/private}/`,
`cells/syntax-number-repr/{candidates,bench}/`, and
`formation/session-audit/reviews/` (the audit's own review directory).
*MINOR.*

### O2-26 · The `.skip` non-transactional rewind is real, reproduced, and **mis-scoped** in §7.3 · **PARTIALLY_TRUE**
Reproduced on generic parsers and on the exact promoted `consumeNumber`. But
`any` (line 396) and `all`/`fuseAll` (line 481) restore offset-only on failure
identically — the property is a **library-wide convention**, not a `skip`
behaviour. parse-that ships `ParserState.save()/restore()` (full transaction)
and does not use it in core combinators. Published `.d.ts` documents no failure
contract. Currently unobservable through `any`/`opt`/`all`. **G11's
`RESEARCH_ONLY` disposition is correct and I affirm it**; the statement needs
re-scoping to library level in `ADDENDA-09`. *MINOR, correctly handled.*

### O2-27 · The accepted parser's test name over-claims transactionality · **CONFIRMED**
`numeric.test.ts:36` "fails transactionally" asserts `state.value ===
predecessor` for a *direct leaf* failure only. Under
`consumeNumber.skip(string("%"))` — literally the shape of the next planned
feature — the predecessor is clobbered (my case D). *MINOR.*

### O2-28 · Independent robustness of the accepted parser holds · **CONFIRMED**
200,000 randomized calls: 0 throws, 0 offset violations. 10⁶-digit input bounded
at 1.76 ms. `consumeNumber.id === 2`, stable across 100,000 parses (exactly two
`Parser` instances constructed for the module). **G01, G12, G13 hold for this
exact operation** and do not generalize. *INFO.*

### O2-29 · Binary64 overflow yields `Infinity`; this is deliberate but unwitnessed against any browser · **OPEN**
`"1e999"` and 10⁶ nines both yield `value: Infinity`. The sealed corpus
deliberately encodes `positive-infinity: 5` / `negative-infinity: 1`
expectations, so this is a designed decision. No CSSOM/browser witness binds
consume-number anywhere in the subject; browsers clamp rather than produce
Infinity. Routed to **O4**. *OPEN.*

### O2-30 · Raw-archive integrity is clean · **CONFIRMED**
All nine archive files hash exactly to their `raw-prompts/INDEX.json`
declarations. Session totals sum to **181 prompts / 2,862 agent messages /
3,283 envelopes**, matching the brief. The archives are three consolidated
per-session files each, not per-event files — a shape difference worth noting
for O1's coverage ledger, but the record counts are correct. *INFO.*

### O2-31 · Subagent-seat topology corroborates the 3×5×3 process at the transport layer · **CONFIRMED**
760 distinct (session, author) pairs across 3,283 envelopes; exactly one
`/root`-authored envelope. Named seats include `g15_author_{h,b,d,s}` (4
candidates, 4 seats), `g16_skeptic_*` (5), `g16_v2_*` (5, disjoint names),
`g16_synth_*` (3), `percentage_skeptic_*` (5) and `percentage_g1_*` (3) matching
their review-file counts. **This materially upgrades candidate/skeptic
independence from self-assertion to structurally corroborated fan-out.**
*INFO — reported as credit.*

### O2-32 · One dimension review has no corresponding envelope seat · **OPEN**
`value-unit-known-dimensions/g0/reviews/skeptic-2-architecture.md` exists on
disk, but no `dimensions_skeptic_architecture` author appears in any envelope
file (only `dimensions_skeptic_semantic` and `dimensions_skeptic_state` do).
This may simply mean the envelope archive captures only `agent_message`
payloads and a seat that returned by another path emits none — several seats
have counts of 1 and some could have 0. **I cannot distinguish "seat existed,
emitted no message" from "root authored the review".** Routed to **O1**, who
owns transport chronology. *OPEN.*

---

## Rows of `FINDINGS.md` I dispositioned

Rows in my lens (implementation truth, prototypes, evidence/benchmark
integrity, process arithmetic, and the parse-that engine rows). Rows owned by
O1/O3/O4/O5 are marked `EXTERNAL` where I touched them only incidentally.

| ID | handoff label | my audited disposition | basis |
|---|---|---|---|
| A12 | `OPEN` | **OPEN** | This audit is the requested one; it is executing now, not closed. |
| A13 | `REJECTED_CLAIM` | **MACHINE_FACT (rejection upheld)** | Applied to myself in the Model receipt. |
| B01 | `REJECTED_CLAIM` | **MACHINE_FACT** | `--listFiles`: active root = 1 runtime module, no public CSS/value/stylesheet barrel. |
| B02 | `ACCEPTED_FACT` | **MACHINE_FACT** | Byte-identical promotion, SHA `8c3ac689…e95aa`, O2-05. |
| B03 | `ACCEPTED_FACT` | **MACHINE_FACT** | `npm run check` exit 0; `npm test` 4/4; pasted in §1.1. |
| B04 | `REJECTED_CLAIM` | **MACHINE_FACT** | O2-02; 17 LOC, one operation. |
| B05 | `ACCEPTED_FACT` | **MACHINE_FACT** | `test:rejected-g0` → 86 passed, 14 files, 2,589 LOC. |
| B06 | `REJECTED_CLAIM` | **MACHINE_FACT** | `syntax/{atom,component-value,source,tokens}.ts`; "CST-backed grammar" comments. |
| B07 | `REJECTED_CLAIM` | **EXTERNAL (O3)** | Authority question; I observe no W0–W4 code in the active root. |
| B08 | `REJECTED_CLAIM` | **MACHINE_FACT** | 1 accepted feature of 33 generations; no roots, no integration, no close rails. |
| C01 | `REJECTED_CLAIM` | **MACHINE_FACT** | Accepted feature is direct `regex().map()`; no lexer runtime exists or is needed. |
| C02 | `REJECTED_CLAIM` | **ADMITTED_JUDGMENT** | Definitional; the accepted terminal is bounded and single-runtime. I concur. |
| C03 | `REJECTED_CLAIM` | **EXTERNAL (O3/O4)** | Terminal-DAG ACK is an authority artefact. |
| C05 | `ACCEPTED_FACT` | **MACHINE_FACT** | `grammar/css/l4/tokens.ts` in the rejected tree is regex primitives only — no token objects. |
| C10 | `REJECTED_CLAIM` | **MACHINE_FACT** | `consumeNumber.id === 2` stable over 100,000 parses (O2-28). |
| D06 | `ACCEPTED_FACT` | **MACHINE_FACT** | `@mkbabb/parse-that@1.0.0` resolves and runs; sole runtime dependency. |
| D07 | `REJECTED_CLAIM` | **MACHINE_FACT** | `dist/core.d.ts` exports only generic combinators; no CSS-specific surface. |
| D09 | `REJECTED_CLAIM` | **MACHINE_FACT** | 1.0.0 supports every construction in the subject; all replays ran on it. |
| F01 | `REJECTED_CLAIM` | **MACHINE_FACT** | O2-24: 7 generations, 72 files, zero candidate code. |
| F02 | `ACCEPTED_FACT` | **PARTIALLY_TRUE** | Acceptance is real and reproducible **within its exact operation** (O2-04/05/10) but the summary labels overstate seal, quintet and peer (O2-06/07/08/11). |
| F03 | `REJECTED_CLAIM` | **MACHINE_FACT** | One numeric operation; no value-unit family exists. |
| F04 | `REJECTED_CLAIM` | **MACHINE_FACT** | G13/G14 superseded by G15/G16; no acceptance artefact binds them. |
| F05 | `ACCEPTED_FACT` | **MACHINE_FACT** | All six G4-H hashes + four B/S hashes verify. |
| F06 | `ACCEPTED_FACT` | **MACHINE_FACT** | G4-H tree imports only parse-that core + local siblings. |
| F07 | `REJECTED_CLAIM` | **MACHINE_FACT (strengthened)** | O2-13: 0 of 5 reviews, 0 of 3 syntheses, 0 envelope seats. |
| F08 | `REJECTED_CLAIM` | **MACHINE_FACT (strengthened)** | O2-14: chronology *disproves* blindness; no custody artefacts exist. |
| F09 | `ACCEPTED_FACT` | **MACHINE_FACT** | 25/25 × 3 seats, digest `9df7e683…4679bd` reproduced. |
| F10 | `ACCEPTED_FACT` for exact subject | **UNVERIFIABLE by me** | `evidence/browser.json` present and hash-bound; I ran no browser. Routed to O4. |
| F11 | `ACCEPTED_FACT` | **MACHINE_FACT** | `percentage.ts` is 7 lines over a byte-identical accepted `numeric.ts`. |
| F12 | `REJECTED_CLAIM` | **MACHINE_FACT** | Both benchmark attempts `status: FAIL`; internal lane ratios 1.114 / 1.091. |
| F13 | `REJECTED_CLAIM` | **MACHINE_FACT** | O2-18: reproduced counterexamples; no correct candidate. |
| F14 | `OPEN` | **OPEN** | Repair direction is sound; needs fresh independent candidates. |
| F15 | `REJECTED_CLAIM` | **MACHINE_FACT** | No keyframe cell exists under `cells/`. |
| F16 | `REJECTED_CLAIM` | **MACHINE_FACT** | Pre-reset color/easing/timeline is in the quarantined tree; not imported by any candidate. |
| G01 | `ACCEPTED_FACT` | **MACHINE_FACT for the accepted operation** | 200,000-call fuzz, 0 throws (O2-28). Does not generalize. |
| G02 | `REJECTED_CLAIM` | **MACHINE_FACT** | Every G16 hash verified and the packet still contained four false fields (O2-09). |
| G03 | `REJECTED_CLAIM` | **MACHINE_FACT** | `g15/holdout-receipt.json` `authorship_receipt` is exactly this shape (O2-06). |
| G04 | `REJECTED_CLAIM` | **MACHINE_FACT** | G16 partially satisfies the chain (seal+chronology) but leaves `frozen_candidate_set_sha256: null`; G4 satisfies none of it. |
| G05 | `REJECTED_CLAIM` | **MACHINE_FACT (upheld, and complied with)** | Both G16 quintets, both failed benchmark attempts and both rejected denominator generations are retained. |
| G06 | `REJECTED_CLAIM` | **MACHINE_FACT** | G16 resolves and executes the pinned deposed module; it does not copy a regex. |
| G07 | `REJECTED_CLAIM` | **MACHINE_FACT** | Per-block output checksums identical across lanes; operation-equivalence is machine-verified. |
| G08 | `REJECTED_CLAIM` | **MACHINE_FACT** | O2-11/O2-12: every peer is internal; no external peer exists. |
| G09 | `REJECTED_CLAIM` | **EXTERNAL (O5)** | G16 reports ns and operation counts, never MB/s; no unit confusion in my slice. |
| G10 | `ACCEPTED_FACT` | **UNVERIFIABLE by me** | No browser run. Routed to O4. |
| G11 | `RESEARCH_ONLY` | **MACHINE_FACT that the behaviour exists; RESEARCH_ONLY disposition affirmed** | O2-26, with the re-scoping amendment (`skip` ∪ `any` ∪ `all`). |
| G12 | `ACCEPTED_FACT` for exact subject | **MACHINE_FACT** | 10⁶ digits in 1.76 ms; corpus family `hostile-bounded-strings` 16/16. |
| G13 | `ACCEPTED_FACT` | **MACHINE_FACT** | `id === 2` invariant over 100,000 parses. |
| H05 | `REJECTED_CLAIM` | **EXTERNAL (O4/O5) — corroborated** | Both v2 and v3 carry rejection files; O2-23 quantifies the storage cost. |
| I01 | `ACCEPTED_FACT` | **MACHINE_FACT (understated)** | O2-22: 2,137 : 1 by LOC; 632,537 : 1 by bytes. |
| I02 | `REJECTED_CLAIM` | **MACHINE_FACT** | O2-24; 16 generations for one 17-line feature. |
| I05 | `ACCEPTED_FACT` | **ADMITTED_JUDGMENT** | I concur, on the evidence of §6. |
| I07 | `ACCEPTED_FACT` | **ADMITTED_JUDGMENT** | I concur; §6 is the arithmetic behind it. |

Rows **A01–A11**, **C04/C06–C09**, **D01–D05/D08/D10/D11**, **E01–E17**,
**H01–H04/H06–H08**, **I03/I04/I06/I08**, **J01–J10** are outside my lens and I
record them **EXTERNAL** without disposition, to O3 (authority/addenda), O4
(CSS/BBNF semantics) and O5 (benchmark/gestalt). I assert nothing about them.

---

## What I could not verify, and why

1. **Browser/CSSOM witnesses (F10, G10).** `foundation-g4/evidence/browser.json`
   and `browser-witness.mts` are present and hash-bound in `SUBJECT.json`, but I
   ran no browser in this session. **UNVERIFIABLE by me.** → O4.
2. **Encrypted envelope plaintexts.** All 3,283 rows in
   `raw-agent-envelopes/*.jsonl` carry `encrypted_content` blobs I have no key
   for. I used them only for **author identity and timestamp**, which are
   cleartext. Their semantic content is `ENCRYPTED_UNMATERIALIZED` and I did not
   infer a single finding from it.
3. **Whether the G15 holdout custodian genuinely did not inspect candidate
   content.** The escrow chronology and seat separation are consistent with the
   claim, but the claim itself is unfalsifiable from the frozen subject. It
   stays a self-assertion.
4. **Whether the `/tmp` escrow key was ever accessible to the candidate authors.**
   Mode `0600` and same-user ownership mean the key was readable by every
   process in the session, including the candidate-author seats. I have no
   access log. This is not evidence of misuse; it is a limit on what the escrow
   proves.
5. **`dimensions_skeptic_architecture`'s provenance** (O2-32) — I cannot
   distinguish "seat emitted no envelope" from "root authored the review". → O1.
6. **The 255 MB `denominator/` payloads' semantic content.** I read only
   top-level key structure and performed one structural diff. I did not audit
   the corpus analysis itself. → O4/O5.
7. **Whether `value: Infinity` is spec-correct for CSS numeric overflow**
   (O2-29). It is deliberately asserted by the sealed corpus, but no normative
   quotation or browser witness in the subject settles it. → O4.
8. **Whether mtimes are trustworthy.** Every chronology argument I make from
   file mtimes (O2-06, O2-07, O2-14) is corroborated where possible by the
   independent rollout-envelope timestamps, which are a different record. Where
   the two agree I treat the chronology as sound. mtimes alone are mutable by
   the same actor who wrote the files, and I would not rest a `BLOCKER` on
   mtime alone — O2-13 (missing reviews) does not depend on mtimes at all.

---

## Open questions for the adjudicators

1. **Does `APOTHEOSIS_ACCEPTED` survive a summary that conceals a rejecting
   quintet, a post-reveal-optimized artefact, and an internal deposed
   comparator?** My position: the *substance* survives — G16 is real,
   reproducible and correctly credited at `feature: 1, full_parser: 0`. The
   *label* does not. I recommend `ADDENDA-09` require every `acceptance.json` to
   carry a mandatory `caveats[]` array reproducing (i) every non-ACCEPT verdict
   in any round, (ii) whether the promoted bytes were authored pre- or
   post-holdout-reveal, and (iii) the peer's exact provenance and shipping
   status.
2. **Should "sealed" be a reserved word?** G16's seal is cryptographically real
   but its reveal gate was never armed and its blindness is self-attested.
   Proposal: `sealed` requires (a) ciphertext + external key, (b) a **non-null**
   `frozen_candidate_set_sha256` bound before reveal, and (c) a custodian seat
   with no read access to candidate paths. G16 satisfies (a), not (b) or (c).
   Everything else in the tranche satisfies none.
3. **What is the standing of a promoted *optimization*?** H2 was authored after
   the holdout was decrypted. If a post-reveal optimization may be promoted,
   the blind-authorship ceremony protects the candidate *lineage*, not the
   *shipped bytes*. Either the rule should say so explicitly, or optimizations
   should require their own sealed round.
4. **Should any performance claim be made at all before an external peer
   exists?** Every benchmark in V·π is value.js versus value.js (O2-12). The
   percentage feature already fails its own internal lane. I recommend
   `ADDENDA-09` forbid the unqualified word "peer" until at least one
   third-party implementation is resolved, executed and reported.
5. **How should the no-scanner compliance gate be made non-vacuous?** With a
   17-line runtime it cannot fail. Proposal: make it a *reachability* assertion
   over the promoted import closure that must be re-run at every promotion, and
   record the closure size — so the gate's own coverage is visible.
6. **Should the quarantine boundary be enforced mechanically?** The `exclude`
   list in `tsconfig.apotheosis.json` creates a false impression of isolation
   that a single transitive import defeats (O2-20). A hash-bound,
   out-of-graph peer harness would fix it without losing the comparison.
7. **What is the disposition of the 255 MB rejected `denominator/` output?**
   72 % of the tranche, 39 % of it a duplicate pair, from a lineage the tranche
   itself rejects. Append-only evidence law argues for retention; it should at
   least be recorded as a **cost**, and future generations should shard rather
   than re-emit.
8. **Is the parse-that failure convention a defect to file upstream?** My
   reading is that offset-only rewind is a deliberate performance convention,
   not a bug — but it is undocumented in the published `.d.ts`, and it is not
   `skip`-specific. Recommend re-scoping G11 to library level and requesting a
   documented failure-state contract rather than an engine uplift.
9. **How should the tranche state its own progress?** On my arithmetic:
   **1 accepted feature, 17 LOC, from 33 generations, 36,331 authored lines of
   machinery and 354 MB.** I found no evidence of fabricated results — the
   integrity of this tranche is, in my hostile assessment, **good**. What is
   broken is **economy**. Any continuation order that does not fix the
   process-to-code ratio will produce the same outcome at larger scale.

---

*Report ends. No subject byte was modified in the production of this document.*
