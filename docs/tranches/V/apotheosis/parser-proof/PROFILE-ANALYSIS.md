# P-4 — ENGINE PROFILES: why the combinator engine trails, and the recovery ladder

Root-session follow-up to the P-3 bench (owner order 2026-07-20: *"Profile both
parsers and analyze why the combinator approach is so slow — and what might we
do to optimize."*). Same subjects as P-3 — the three esbuild-bundled engines,
byte-identical to `bench-results.json`'s SHA-pinned bundles — profiled with V8
CPU profiles (`--cpu-prof-interval=100`µs, one process per engine×scenario,
2000-pass warmup, 4–6.5s windows, 30k–48k samples each). Corpus = the shared
common corpus (the apples-to-apples P-3 scenarios). Raw profiles + driver +
analyzer: `~/.claude/jobs/9e7dadd0/tmp/parser-proof/profile/`.

Throughput ordering reproduced under the profiler: C14 ≈14.3µs/sheet ·
deposed ≈9.0µs · live ≈4.5µs (ratios match P-3).

## 1. Where each engine spends its time (self-time, sheet-common)

**C14 (assay, parse-that 1.0.0 combinators)** — GC 5.6% · engine 11.2%:

| % | frame | what it is |
|--:|---|---|
| 21.2 | `mapState` | span-attachment wrapper: `Object.create(state)` old-view + callback per node |
| 12.1 | `skip` | trailing-parser combinator (every token's `.skip(trivia)`) |
| 10.7 | `mergeErrorState` | furthest-offset bookkeeping — runs on EVERY benign PEG failure |
| 8.8 | `ok` | success-state mutation — pure call-count (once per node per step) |
| 6.4 | `map` | `{raw}` staging object per token |
| 5.9 | `opt` | trivia's `.opt()` wrapper — benign-failure control flow |
| 4.8 | `regexParser` | sticky-regex token exec (the actual lexing!) |
| 3.2 | trivia regexes | `(?:\s+\|/\*…\*/)+` leading + `$`-anchored trailing back-trim |
| ~8 | grammar closures | `capture`/`spanned`/`token` wrappers (c14 grammar layer) |

Inclusive: **49.5% of the whole parse sits under `skip`** (trivia handling),
47.4% under `mapState` (span attachment). The actual token recognition
(`regexParser`) is under 5%.

**LIVE (retiring regex)** — GC 2.0%:

| % | frame | what it is |
|--:|---|---|
| **29.8** | **`deepFreeze`** | **recursive `Object.freeze` of every result — UNCONDITIONAL in production** (`grammar.ts` `success()`) |
| 12.9 | `splitTopLevel` | hand-rolled top-level comma/space splitter |
| 11.0 | `parseValueInternal`+`parseScalarInternal` | inline charCode scanning |
| 5.4 | `parseCssColor` | the color ladder |

**DEPOSED (pre-v4 parse-that)** — GC 1.1%, the healthiest combinator profile:
`anyParser` ladder 13.2% + `regexParser` 11.2% + `map` 8.7%, and — decisively —
its own hand-rolled fast paths visible: `scanNumberFast` 4.3%,
`walkBalanced` 4.7%, `whitespaceTrim` (charCode, not regex) 3.6%.

## 2. WHY the combinator approach is slow — the precise claim

**It is NOT the combinator abstraction per se.** parse-that 1.0.0 is already a
mutable-state engine (the Rust-port model: `ok()` mutates and returns `this` —
zero state allocation per step). Three specific, separable taxes:

**T-1 — The C14 grammar's lexeme discipline is authored out of generic
combinators instead of the engine's purpose-built fast paths.** Every token is
`pattern(re)` = `regexParser` → `map` (allocate `{raw}`) → `mapState`
(allocate old-view via `Object.create` + spread `{...value, span}` — two more
allocations) → `.skip(trivia)` where trivia is `regex(…).opt()` (a THIRD regex
exec site + a benign failure through `mergeErrorState`+`opt` at every
no-trivia boundary). `spanned()` then re-trims trailing trivia by slicing the
consumed text and running a `$`-anchored regex backwards over it — per node.
Meanwhile **the engine already ships `skipBlockComments`** (memchr-style
in-place whitespace+comment skipper, public since 1.0.0) and
`trimStateWhitespace` (charCode scan) — both unused by the C14 grammar.

**T-2 — Interpretive dispatch × node count.** Each grammar node costs 1–3
closure invocations + an `ok()` + (on failure paths) a `mergeErrorState`.
`ok` at 8.8% self and `mergeErrorState` at 10.7% are pure per-node frequency.
PEG benign failures (alternation misses, `opt`) are control flow, and each one
pays the bookkeeping call even when diagnostics are disabled.

**T-3 — Allocation pressure.** 3–4 staging objects per token (T-1) drive GC to
5.6–6.4% vs live 2.0% / deposed 1.1%.

**The fair-comparison caveat (feeds OC-1):** live's measured 14.06 MB/s
*includes* a ~30% unconditional `deepFreeze` tax — its raw parse core is
≈20 MB/s. Conversely the C14 assay does not freeze its output. Whether frozen
results are part of the frozen /css contract is a real spec question for the
mirror: if yes, every engine pays it; if no, live's recorded number
*understates* the true speed gap on parsing proper (≈3.3×, not 2.3×) — but
also live's number is not the mirror's bar (the ratio floor is).

## 3. The optimization ladder (grammar-side first — all within parse-that AS PUBLISHED)

Ordered by measured cost ÷ effort; O-1..O-4 need ZERO parse-that changes:

- **O-1 · Trivia via the engine's fast path.** Replace `regex(trivia).opt()`
  with a custom leaf (`new Parser(...)` — `Parser`, `ParserFunction`,
  `createParserContext` are all public) wrapping `skipBlockComments`. Kills
  the trivia regexes, the `.opt()` frames, and their benign-failure
  `mergeErrorState` traffic. Directly attacks the 49.5%-inclusive `skip`
  stack. Est. recovery: 15–25%.
- **O-2 · Fused lexeme leaf.** One custom leaf per token class doing: sticky
  exec → record span end BEFORE trivia → skipBlockComments → build the final
  token object once. Replaces the `map`+`mapState`+`capture`+`spanned` stack
  (21.2+6.4+~8% self) and eliminates the `$`-anchored back-trim and the
  staging allocations (GC ↓). Est. recovery: 25–35%.
- **O-3 · Numbers in one pass.** Use `regex(r, matchFunction)` (public hook)
  to `parseFloat` + derive the unit from match groups in the exec — today
  `angle` runs a SECOND regex (`/[a-z]+$/i`) over each raw. Deposed's
  `scanNumberFast` is the model. Est: single-digit %.
- **O-4 · `dispatch()` tables for the ladders.** The engine ships O(1)
  first-char dispatch for alternation (its 1.0.0 doc block explicitly awaits
  "value.js's real c-bucket grammar" measurement — this profile IS that
  predicate). Apply to the declaration-value and color-function ladders as
  the grammar grows to the full 52-export surface — alternation cost rises
  with grammar breadth (deposed's `anyParser` at 13.2% previews it).
- **O-5 · Selective packrat (`memoize`) only if measured.** Backtracking is
  NOT a current cost (the W0 grammar is near-LL(1)); revisit at full-surface
  scale.
- **O-6 · Engine-side multipliers — two distinct legs (see `UPSTREAM-SURVEY.md`).**
  (a) TS-package asks via a future PT-E letter (semver ≤1.1): a scalar-args
  `mapState` variant (no `Object.create` view) + a branch-free benign-failure
  path for `mergeErrorState` when diagnostics are off. CAVEAT: the upstream is
  under a self-ratified no-contact boundary mid-campaign — file the ask when
  their VALUE-MAJOR conduit opens (their U.W7/PT-V wave faces us); never block
  a mirror gate on it. (b) The byte-class/bitmap StructuralIndex pattern —
  IMPLEMENTED upstream in Rust (`bbnf-lang/crates/simd-scan`, Apple-NEON/wasm
  only, non-consumable): REIMPLEMENT the idea in the mirror's lexeme layer
  (their `scalar.rs` is the parity reference), never import. These chase
  live's RAW core (~20 MB/s); the grammar-side rungs are what meet the gate.

**Arithmetic to the bar:** SHEET floor 0.1000 × jsonParser peak (~113 MB/s on
this rig) ⇒ ≈11.3 MB/s needed; C14 is at 6.09. O-1+O-2+O-3 target the
measured ~55–60% of self-time that is pure lexeme/trivia/bookkeeping overhead
⇒ 1.8–2.2× ⇒ **11–13 MB/s: the historical floor is plausibly meetable
grammar-side alone**, without touching parse-that. Beating the live engine's
raw core additionally needs O-6. This gives OC-1 a concrete engineering basis:
the floor is not dead — it is reachable — but it binds at the V03-transpose
close, not at the W0 pilot.

## 4. Disposition

These findings route to the mirror lane's perf wave (the fleet's C12/C15 rows
and the V03 transpose): O-1..O-3 belong IN the transpose's lexeme layer from
the start (cheaper than retrofitting); O-4 lands with the ladder-bearing
feature waves; O-6a is a PT-E letter filed only when the upstream's
VALUE-MAJOR conduit opens, O-6b (byte-class reimplementation) only after the
floor is met grammar-side. One spec question surfaces for the transpose:
whether frozen output (live's `deepFreeze`) is part of the /css contract —
if yes the mirror pays it too; adjudicate at V03. No production execution is
implied; the OC-1/OC-2 hold stands.

— the union-apotheosis program (root session), 2026-07-20. Profiles: 3 Opus-free
runs (mechanical, main-loop Bash); analysis: Fable main loop.
