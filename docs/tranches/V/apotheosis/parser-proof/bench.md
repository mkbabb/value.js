# P-3 — Comparative parse-throughput bench (three engines, one corpus)

**Seat**: PROOF SEAT P-3 (comparative bench; mechanical, owner-mandated
pre-execution gate, D-23 mirror-primary). **Verdict: gate RED (5/5 invocations,
deterministic).** The C14 assay clears the VALUE floor but misses the SHEET floor
against the historical gate's absolute bar; the retiring LIVE regex engine is the
decisive fastest across every shared scenario. Full caveats on floor portability
below (§6) — the absolute-bar transfer to this machine is flagged **OWNER-CONFIRM**.

Evidence & harness: `W/bench/` (`bench.ts`, `raw-run-{1..5}.json`, `aggregate.mjs`,
`finalize.mjs`, coverage/diag probes). Recovered gate source:
`W/gate-recovered.mjs`, `W/bench-recovered.mjs` (from repo `b3f4f76e`, pre-v4).

---

## 1. Setup

### Machine of record
- **CPU**: Apple M5 Max (18 cores) · **arch** arm64 · **OS** darwin 25.4.0
- **Runtime**: node **v26.0.0**, V8 14.6.202.33-node.19
- Ran quiescent; 5 full harness invocations, tight cross-run spread (§4).

### The three engines (all built IDENTICALLY — the only variable is the parser code)

| # | engine | what it is | how driven |
|---|--------|-----------|-----------|
| **(a)** | **LIVE regex** — the retiring engine (**once-for-the-record**) | repo `src/css/` (grammar.ts + stylesheet.ts), value 4.x hand-rolled regex/byte-scanner parser | esbuild-bundled from repo source (read-only), run under node |
| **(b)** | **C14 assay** | `W/c14-css` — `@mkbabb/parse-that@1.0.0` combinator prototype (`src/css/api.ts`) | esbuild-bundled, run under node |
| **(c)** | **deposed** — the baseline / gate calibration subject | `W/deposed-full` = the pre-v4 `src/parsing` parse-that parser (matches repo `b3f4f76e`), full sibling trees recovered from git | esbuild-bundled, run under node |

**Uniform build** (the key fairness control): every engine bundled with the same
esbuild flags — `--bundle --format=esm --platform=node --define:import.meta.env.DEV=false
--external:prettier`. The `import.meta.env.DEV=false` define reproduces Vite's
**production** treatment of the dev-only assert guards in `units/color/spaces.ts`;
`prettier` is a lazy `import()` in the serializer, never on the parse path. Bundling
all three the same way removes the tsx-vs-dist asymmetry so the co-scaling ratio
compares like-for-like.

### Why the deposed engine had to be bundled (module-run record, per the seat rules)
Run from raw source via tsx the deposed tree throws `Cannot read properties of
undefined (reading 'DEV')` — it references Vite's `import.meta.env.DEV`, undefined
outside a Vite build. The historical bench imported the **built** `dist/value.js`
(where Vite defines `DEV`). The esbuild `--define` bundle is the faithful, minimal
reproduction of that built-dist environment; after it, the deposed engine parses the
entire historical corpus + the C14 corpus (verified). Nothing was faked.

### Corpus (union; subject/corpus hashes in `bench-results.json`)
- **`value_historical`** (10 items, 185 B, sha `27d54ed8…`) — the O.W6 bench's exact
  value corpus (every `Function_` dispatch branch).
- **`sheet_historical`** (5 rules, 315 B, sha `3c85ecaf…`) — the O.W6 bench's exact sheet.
- **`c14_common`** (3 rules, 201 B, sha `ab43f1dc…`) — the C14 assay's own
  sha256-locked proof corpus, **reused verbatim** (matches `c14-css/proof/benchmark.json`).
- **`value_common`** (2 items, 59 B, sha `b6a3c77f…`) — the value intersection of all
  three engines: `oklch(62.8% .257 29.23 / 85%)`, `cubic-bezier(0.42, 0, 0.58, 1)`.
- **`demo_sheet`** — real-world sample: `demo/styles/animations.css` (12 748 B, sha
  `a64eb64f…`), the largest demo stylesheet both LIVE + deposed parse to completion.

### Co-scaling normaliser (verbatim from the U-F14 gate)
`jsonParser.parse` from `@mkbabb/parse-that` over the gate's exact ~payload,
**measured 220 B** (the gate comment calls it "~450-byte" — a loose approximation;
the verbatim object serialises to 220 B). N=20 000, 100-iter warmup. Median peak
across runs **113.6 MB/s** `[105.8, 113.9]` — note this is *faster* than the gate's
documented ~90 MB/s reference box (relevant to §6).

### The gate bar (extracted from source — explicit, not inferred)
Recovered `scripts/gates/proof-perf-target.mjs @ b3f4f76e` states the bar exactly:

```
const VALUE_RATIO_FLOOR = 0.0500;  // co-scaling normaliser, PEAK statistic
const SHEET_RATIO_FLOOR = 0.1000;  // co-scaling normaliser, PEAK statistic
```

Recipe: `ratio = peak(engine MB/s) ÷ peak(jsonParser MB/s)` over N=15 samples;
GREEN iff `value ratio ≥ 0.0500` **and** `sheet ratio ≥ 0.1000`. The gamut scenario
in the historical bench is informational-only (not a parser); omitted here.

### Method
N=1000 inner iterations/sample · 50-iter warmup/sample · 15 samples/scenario · 5 full
invocations. Engines interleaved with the jsonParser normaliser inside each sample so
numerator + denominator share machine/load state. Every scenario is correctness-verified
(parse succeeds; C14 sheet corpus additionally sha256-locked upstream) before timing —
no failing parse is ever timed. Deposed `parseCSSStylesheet` is memoised; its `.cache`
is cleared each pass (historical recipe) so real parse work is measured.

---

## 2. Coverage matrix (why the corpora split the way they do)

`Y` = parses to a successful/complete result; `n` = rejected or unmodelled.

| corpus item | LIVE | C14 | deposed |
|---|:--:|:--:|:--:|
| `oklch(0.7 0.15 30)` (unit-interval L) | Y | n | Y |
| `oklch(62.8% .257 29.23 / 85%)` (% L) | Y | **Y** | Y |
| `cubic-bezier(0.42, 0, 0.58, 1)` | Y | **Y** | Y |
| `linear(…)`, `linear-gradient(…)`, `translateX`, `calc`, `var`, `42px`, `blue`, `spring` | Y | n | Y |
| C14 3-rule proof corpus (oklch % + cubic-bezier rules) | Y | **Y** | Y |
| `@keyframes` / `@layer` / `@media` / `@property` / plain style rules | Y | n | Y |
| `demo/styles/animations.css` (12.7 KB real-world) | Y | n | Y |

**Findings.** The C14 assay is a **product-shaped W0 slice** — it parses only
`%`-lightness `oklch()`, `cubic-bezier()`, and qualified rules built from them (its
README's P01-RED status, confirmed empirically). The value intersection of all three
is just two items; the sheet intersection is the C14 proof corpus. So the *common*
corpus (the apples-to-apples ratio) is necessarily small; the LIVE + deposed engines
additionally carry the full historical + demo corpora.

A **once-for-record LIVE finding**: the retiring regex parser is a *semantic* CSS
parser, not a generic CST parser — it returned `ok:false` on 5 of 7 demo stylesheets
(shell/focus-ring/utils/header/overture) because they use constructs it does not model,
while the deposed parser accepted all 7 via its generic `unknown`-rule fallback.
`animations.css` (keyframes-heavy) is the sample both parse fully.

---

## 3. Per-engine results (median across 5 invocations; PEAK statistic)

### (a) LIVE regex — **THE ONCE-FOR-THE-RECORD MEASUREMENT of the retiring engine**

| scenario | MB/s (peak) | MB/s (sample-med) | ns/call | ratio v.jsonParser | floor | meets |
|---|--:|--:|--:|--:|--:|:--:|
| value-historical (10 vals) | **8.72** | 8.25 | 2 243 | **0.0776** | 0.0500 | ✅ |
| sheet-historical (5 rules) | **18.06** | 17.15 | 18 371 | **0.1637** | 0.1000 | ✅ |
| sheet-demo (animations.css) | **33.82** | 33.29 | 382 994 | **0.3016** | 0.1000 | ✅ |
| value-common (2 vals) | 12.73 | 12.25 | 2 409 | 0.1132 | 0.0500 | ✅ |
| sheet-common (C14 corpus) | 14.06 | 13.59 | 4 930 | 0.1261 | 0.1000 | ✅ |

The retiring engine **clears every floor with 55–200 % headroom** and is the fastest
of the three on every shared scenario (≈1.8× deposed and C14 on the common corpus).
Recorded once, for the record, as the rulings mandate.

### (b) C14 assay — @mkbabb/parse-that 1.0.0 combinator prototype

| scenario | MB/s (peak) | MB/s (sample-med) | ns/call | ratio v.jsonParser | floor | meets |
|---|--:|--:|--:|--:|--:|:--:|
| value-common (2 vals) | 7.13 | 6.83 | 4 322 | **0.0640** | 0.0500 | ✅ |
| sheet-common (C14 corpus) | 6.09 | 5.81 | 11 522 | **0.0537** | 0.1000 | ❌ |

### (c) deposed — pre-v4 parse-that parser (the gate's calibration subject / baseline)

| scenario | MB/s (peak) | MB/s (sample-med) | ns/call | ratio v.jsonParser | floor | meets |
|---|--:|--:|--:|--:|--:|:--:|
| value-historical (10 vals) | 5.16 | 5.00 | 3 703 | 0.0464 | 0.0500 | ❌ |
| sheet-historical (5 rules) | 10.97 | 10.59 | 29 755 | 0.0971 | 0.1000 | ❌ |
| sheet-demo (animations.css) | 30.86 | 30.52 | 417 695 | 0.2788 | 0.1000 | ✅ |
| value-common (2 vals) | 6.79 | 6.45 | 4 574 | 0.0606 | 0.0500 | ✅ |
| sheet-common (C14 corpus) | 7.63 | 7.41 | 9 042 | 0.0683 | 0.1000 | ❌ |

---

## 4. Ratios & cross-run stability

Ratio = `peak(engine MB/s) ÷ peak(jsonParser MB/s)`, the U-F14 co-scaling recipe.
Spread is min–max of the peak ratio across the 5 invocations (all < ±3 %):

| engine / scenario | ratio median | [min, max] |
|---|--:|--:|
| live/value-historical | 0.0776 | [0.0767, 0.0793] |
| live/sheet-historical | 0.1637 | [0.1588, 0.1658] |
| live/sheet-demo | 0.3016 | [0.2969, 0.3098] |
| live/value-common | 0.1132 | [0.1114, 0.1184] |
| live/sheet-common | 0.1261 | [0.1238, 0.1293] |
| deposed/value-historical | 0.0464 | [0.0453, 0.0470] |
| deposed/sheet-historical | 0.0971 | [0.0959, 0.0984] |
| deposed/value-common | 0.0606 | [0.0597, 0.0616] |
| deposed/sheet-common | 0.0683 | [0.0671, 0.0695] |
| c14/value-common | 0.0640 | [0.0628, 0.0647] |
| c14/sheet-common | 0.0537 | [0.0532, 0.0554] |

**Apples-to-apples (common corpus, identical build):** LIVE ≫ C14 ≈ deposed.
- value-common ratio: **live 0.113** · c14 0.064 · deposed 0.061 → C14 edges deposed +5 %.
- sheet-common ratio: **live 0.126** · deposed 0.068 · c14 0.054 → C14 trails deposed −21 %.

---

## 5. GATE VERDICT — **RED** (5/5 invocations, deterministic)

Bar (verbatim from `proof-perf-target.mjs @ b3f4f76e`): VALUE ≥ 0.0500, SHEET ≥ 0.1000,
peak-of-15 ratio vs the parse-that `jsonParser` normaliser.

Applied to the **assay (C14)**:

| clause | C14 ratio (median) | floor | result |
|---|--:|--:|:--:|
| VALUE (value-common) | 0.0640 | 0.0500 | **PASS** (+28 %) |
| SHEET (c14 proof corpus) | 0.0537 | 0.1000 | **FAIL** (−46 %) |

**GATE = RED** — the C14 assay's stylesheet throughput is ~half the SHEET floor.
Deterministic: all five invocations RED.

**Comparative reading** (assay vs baselines, same corpus + build): C14 is competitive
with the deposed parse-that baseline on value parsing (marginally ahead) but slower on
stylesheet parsing (−21 %), and both combinator engines are ~2× slower than the retiring
LIVE regex engine on every shared scenario. Against the retiring baseline the assay does
**not** meet parity; against the deposed baseline it is a wash on value, behind on sheet.

---

## 6. Caveats — floor portability (**OWNER-CONFIRM**)

The absolute floors (0.0500 / 0.1000) were calibrated in the U-F14 re-anchor on the
**Vite-built `dist/value.js`** and a reference box where `jsonParser` measured ~90 MB/s;
the documented cured PEAK there was ~0.0596 value / ~0.1250 sheet.

On **this** machine + build the **deposed calibration subject itself undershoots both
floors** — value 0.0464, sheet 0.0971 (vs the documented 0.0596 / 0.1250). Two
compounding causes, both measured:
1. **Denominator up**: `jsonParser` runs ~113 MB/s here vs the ~90 MB/s reference — a
   faster combinator denominator alone drops every ratio ~20 %.
2. **Numerator down**: the esbuild `--define` bundle is ~13 % slower than the original
   Vite/rollup `dist` on the deposed hot path (uniform across engines by design, so the
   *cross-engine* comparison stays fair — but it depresses the *absolute* ratio vs the
   gate's dist-calibrated numbers).

The co-scaling ratio did **not** fully hold across this arch+build delta (M5 + esbuild
vs 18-core + Vite-dist) — exactly the portability edge the U-F14 doc flags as thin
("~13 %/~9 % over the worst observed peak"). **Consequence for the verdict:** the RED on
C14's SHEET clause is robust — C14 is far under the floor and also under the deposed
baseline on the same corpus/build — but the *absolute-floor transfer* of the 0.0500 /
0.1000 constants to this M5 + esbuild environment is **not** independently established
and is marked **OWNER-CONFIRM**. The internally-consistent, machine-portable statement
the data fully supports: **retiring-LIVE ≫ deposed ≈ C14 in parse throughput**, and the
C14 assay does not reach the deposed baseline on stylesheet parsing.

Other notes: the gate's payload comment says "~450-byte" but the verbatim object is 220 B
(used as-is; a fixed reference, so byte count does not affect the ratio). All subject and
corpus sha256 hashes are recorded in `bench-results.json`.
