<!-- SERVED MODEL: claude-opus-5-5 -->
# W7-research · survey:profile — where value.js's BBNF CSS path spends its time

**Seat:** survey:profile (read-only in parse-that and bbnf-lang; writes only in this directory). **Date:** 2026-09-23. **Host:** darwin, 18 cores, node v26.0.0, shared with other work. Load averages are recorded with every reading, and every timing is **paired with the retired hand parser, measured in the same process on the same corpus** (29,944 distinct sources = assay ∪ real, as the bench of record uses).

## Headline

1. **The BBNF path's largest single cost is a one-line V8 hazard in parse-that 0.8.2, not the grammar.** In `Parser.mapState`, `const oldView = Object.create(state)` (dist `parse.js:853`; still on parse-that master at `typescript/src/parse/parser.ts:193`) makes the live `ParserState` a **prototype**. V8 then moves that object onto a unique prototype map (`%HaveSameMap(state, fresh)` = false after one `badTerm` parse; `proto-check.mjs`). From then on, every inline cache on `state.*` across parse-that goes polymorphic, then megamorphic.
   - value.js hits this path through its `spanned` actions: `badTerm` in `value.bbnf`, and `listComma`/`open*` in `stylesheet.bbnf`. That is 34,599 prototype views per corpus pass of `parseCssValue` and 28,811 per pass of `parseStylesheet` (`counts-result.json`).
   - Replacing the view with a plain same-shape `new ParserState(src, oldValue, oldOffset, …)` in a **build copy** gives these results, with **0 output mismatches** on all 29,944 sources for all 7 entries:
     - `parseCssValue`: 2.06× → **0.96×** the baseline.
     - `parseCssValues`: 1.98× → **0.96×**.
     - `parseStylesheet`: 5.2× → 2.58×.
   - **The damage spreads across entries.** After an app has parsed values, `parseCssColor` degrades from 1.45× to **2.28×** the baseline, and scalar/keyframe/timing slow down by 25–50%. With the fix, color stays at 1.46–1.51× (`pollution.mjs`).
2. **Rebinding the lazy nonterminal trampolines** (bbnf-lang's `Parser.lazy(() => nonterminals[name])`, 376 of 878 graph nodes) to their resolved targets after the actions attach saves another 10–15%:
   - value 0.96× → **0.82×**, values → **0.84×**
   - color 1.59× → 1.38×, scalar → 1.20×
   - stylesheet → 2.20×

   With both levers, `parseCssValue` and `parseCssValues` are **faster than the baseline**. Color, scalar, keyframe and timing remain at 1.2–1.4×, and stylesheet at 2.2×.
3. **What remains is failed alternatives and action-layer allocation, not error bookkeeping:**
   - Failed alternatives: 72% of parser calls fail in `parseCssColor`, and 96% of function-head attempts (`regexSpan`) fail. The one-character FIRST-set dispatch merges 13 of `color`'s 14 alternatives into one ordered group (and 9 of 10 in `colorCall`, 7 of 8 in `valueTerm`).
   - Action-layer allocation: `stylesheet.ts` `tagsOf`/`textOf` take 22% self time after the fix.
   - Making `mergeErrorState` a no-op is **not** a lever. It has 3–4.5% self time, and removing it naively is neutral to negative: keyframe and timing got slower, 1.3× → 1.8×, reproduced in both repetitions. The cause is unexplained; it looks like a JIT interaction.
4. **One-time compile cost.** Cold, the candidate costs **5.3 ms import + 9.0 ms first parse (compile + attach)**, against 1.1 + 0.3 ms for the retired parser. Warm, `BBNFToParser` costs 3.6 ms: 69% of it is parsing the BBNF text itself (2.5 ms), 0.8 ms is analysis and FIRST sets, and 0.23 ms is combinator construction. Attaching the actions costs 0.01 ms. At about 1.3 µs per color parse at steady state, the cold compile equals roughly **7k color parses**. For a page that parses a few hundred values, compile time dominates. Steady-state speed alone does not win the "faster than baseline" bar at first use.

## 1 · Per-entry ratio table (BBNF ÷ retired; paired medians)

**Isolated measurement** (`isolated.mjs`): each (arm, entry) cell runs in its own fresh process, paired with the retired parser in that same process. Each cell runs 11 interleaved rounds with `gc()` before each pass. The matrix ran twice with the arm order reversed, so there are n=4 cells for stock and noproto and n=2 for noproto+direct. Load stayed between 8.8 and 16.0 (1-minute average). Mismatch against the stock BBNF output: **0 in every cell**.

| entry | stock BBNF (range) | ms BBNF / retired | + noproto | + noproto + direct |
|---|---|---|---|---|
| parseCssColor | **1.60** (1.48–1.84) | 44.4 / 27.0 | 1.59 | **1.38** |
| parseCssScalar | **1.28** (1.22–1.34) | 39.6 / 31.5 | 1.25 | **1.20** |
| parseCssValue | **2.06** (1.93–2.49) | 198.7 / 98.1 | 0.96 | **0.82** |
| parseCssValues | **1.98** (1.92–2.24) | 223.7 / 108.0 | 0.96 | **0.84** |
| parseKeyframeSelector | **1.41** (1.36–1.52) | 7.0 / 4.9 | 1.34 | **1.30** |
| parseTimingFunction | **1.35** (1.33–1.43) | 9.4 / 6.8 | 1.31 | **1.28** |
| parseStylesheet | **5.20** (4.88–5.46) | 280.3 / 53.1 | 2.58 | **2.20** |

**In-process, all entries in sequence** (`bench.mjs`, 9 rounds, rotated order; load 14.0 → 11.0). This is the realistic mixed-workload state, and it agrees with the table above:

| entry | median-of-medians ratio | ratio of mins | paired median |
|---|---|---|---|
| color | 1.62 | 1.44 | 1.59 |
| scalar | 1.23 | 1.24 | 1.26 |
| value | 1.88 | 1.92 | 1.88 |
| values | 1.84 | 1.83 | 1.83 |
| keyframe | 1.77 | 1.75 | 1.75 |
| timing | 1.56 | 1.57 | 1.57 |
| stylesheet | 4.59 | 4.73 | 4.59 |

The bench of record (vitest + tinybench, under higher load) read 1.11–2.79× for the six entries and 5.6–14.8× for stylesheet. My stylesheet reading is 4.6–5.5×. I attribute the difference to the harness plus load, and the difference in the harness is not itself a finding.

## 2 · Where the time goes (V8 CPU profiles, 200 µs sampling, idle excluded)

**Layers.** Self time, % of samples (`profiles/*.txt`). The `.cpuprofile.gz` files are the raw profiles; `gunzip` them before running `analyze-profile.mjs`.

| layer | color (stock) | color (after value, polluted) | value (stock) | stylesheet (stock) | value (noproto) | stylesheet (noproto) |
|---|---|---|---|---|---|---|
| parse-that 0.8.2 core | 50.6 | 58.6 | 57.5 | 50.8 | 47.6 | 30.9 |
| bbnf-lang compile output (generated closures) | 4.6 | 7.7 | 9.9 | 8.4 | 7.6 | 7.8 |
| value.js actions (`src/css/bbnf`) | 17.1 | 12.4 | 12.7 | 23.8 | 14.9 | **36.7** |
| value.js `src/css` layer (`result.ts` failure/deepFreeze, sheet) | 5.1 | 4.1 | 3.6 | 5.5 | 8.1 | 9.4 |
| regex engine (irregexp code) | 15.6 | 12.1 | 11.1 | 5.4 | 16.5 | 9.4 |
| GC | 2.1 | 1.1 | 2.3 | 3.7 | 1.6 | 2.2 |

For contrast, the retired parser has 13.1% (color) and 8.7% (value) in the regex engine and 1.4–1.5% in GC. The rest is its hand scanners: `splitTopLevel` 23–25%, `parseCssColor` 30%.

**Top self-time functions (stock), with their layer:**

- `createLazyCached` closure, `parse.js:13`: 7.8% / 11.4% / 6.6% (color / value / stylesheet). **parse-that**. This is the lazy nonterminal trampoline that bbnf-lang emits for every rule reference: 581k calls per color pass and 1.79M per value pass (19 and 60 per source).
- `Parser.map`, `parse.js:833`: 5.9 / 9.6 / 6.2%. **parse-that**. It runs each value.js action, and fails 84% of the time in color.
- `Parser.mapState`, `parse.js:846`: 9.6% (value), **11.8%** (stylesheet). **parse-that**. This is the `Object.create(state)` hazard.
- `regexParser`, `parse.js:621`: 8.0 / 5.8 / 4.0%. **parse-that**. It is the sticky `test` + `substring`. The irregexp time is reported separately as `RegExp: …` frames.
- `ParserState.ok`: 4.2% (value), 5.7% (stylesheet). **parse-that**. It is inflated by the megamorphic state, and after the fix it drops out of the top functions.
- `next` / `allParser` / `anyParser` / `wrapParser` / `opt` / `many`: 1–5% each. **parse-that**.
- `dispatchParser`, `bbnf.js:2281` and `:2306`, and `all2`, `bbnf.js:2238`: 2–5% each. **bbnf-lang output**.
- `mergeErrorState`, `parse.js:52`: 4.5 / 3.1 / 1.8%. **parse-that**.
- `reset`, `parse.js:694`: 2.5% (color). **parse-that**. It is called once per `run`: `resetErrorState` plus two `Map.clear()` calls.
- `tagsOf` / `textOf` and the `on`/`spanned` wrappers, `src/css/bbnf/stylesheet.ts:25/11/46/49`: 17% stock and **~31%** after noproto (stylesheet). **value.js actions**. `tag()` re-flattens the whole subtree once for each key.
- `tokenQuantity`, `math.ts:38`, and `numericScalar`, `value.ts:42`: 2–4%. **value.js actions**. They re-lex the token that the grammar's regex already matched.
- `failure` / `deepFreeze`, `src/css/result.ts:27/13`: 2.5–5.7%. **value.js result law**. The retired parser pays the same cost: 7.7% in its `failure`.

## 3 · Failure path (counted on an instrumented build copy; `counts.mjs`)

Counts are per source, over the full corpus.

| entry | parser calls | % failing | leaf calls | % leaves failing | mergeErrorState | `expected` array allocs / merges (whole pass) | mapState proto-views |
|---|---|---|---|---|---|---|---|
| color | 69.2 | **72.2** | 14.7 | 69.7 | 18.6 | 54.6k / 185.6k | 0 |
| scalar | 67.4 | 70.2 | 14.1 | 68.9 | 17.5 | 57.6k / 160.1k | 0 |
| value | 189.6 | 63.6 | 40.4 | 70.9 | 41.0 | 91.9k / 563.8k | 34.6k |
| keyframe | 5.6 | 46.5 | 1.2 | 14.8 | 2.0 | 5.2k / 0 | 0 |
| timing | 9.2 | 47.7 | 2.1 | 28.2 | 3.0 | 8.3k / 5.0k | 0 |
| stylesheet | 122.8 | 44.8 | 24.9 | 44.6 | 21.1 | 26.8k / 184.2k | 28.8k |

- **Failed alternatives are the dominant failure-path cost.**
  - In color, `regexSpan`, which is the discarded function head such as `/[rR]gba?\(\s*/i >>`, runs 174k times per pass with 96% failing, and `all` fails 95% of the time.
  - The cause is dispatch collapse (`dispatch-check.mjs`). The FIRST sets are correct, so the F-b-3 first-letter classes work. But `colorKeyword` covers all 52 letters, and `relativeColor`'s set `CHLORchlor` overlaps every colour function. bbnf-lang's partial dispatch therefore builds one ordered `any` group for 13 of `color`'s 14 alternatives, 9 of 10 in `colorCall`, 7 of 8 in `valueTerm`, 7 of 8 in `calcValue`, and 6 of 7 in `scalarTerm`.
  - A keyword such as `red` is tried against about 12 function heads before `colorKeyword`.
- **Accepted vs rejected inputs** (`bench.mjs`, paired):
  - `parseCssValue` is **1.09×** on accepted inputs and **2.31×** on rejected ones; 95% of its excess time is on rejected inputs. Rejected value inputs are the ones that reach `badTerm`, which means `mapState`, which means the prototype hazard.
  - `parseStylesheet` is 2.51× accepted and 5.43× rejected; 84% of its excess is on rejected inputs.
  - Color is the other way round: 2.01× accepted and 1.47× rejected. Its excess is in the accepting path: long ordered groups plus action re-lexing.
- **ParserState and error construction is small.**
  - One `ParserState` is created per `run`. That is one per call for the six entries and 2.4 per source for stylesheet, whose readers re-run sub-rules.
  - `expected` arrays are allocated 1.8–3 times per source, and `includes`/`push` merges happen 6–19 times per source.
  - Together with `reset`, this is about 5–7% of self time. The no-op what-if did not recover it (see headline point 3).
- **Stylesheet re-reads its text.** The characters consumed by its leaves add up to **2.83×** the input characters. The sheet → prelude / declaration → value readers each re-scan.

## 4 · Levers, ranked by measured effect

| lever | where | measured effect | correctness |
|---|---|---|---|
| Stop making `ParserState` a prototype in `mapState` (snapshot object, or pass the start offset) | parse-that `parser.ts:193` (0.8.2 dist `parse.js:853`) | value 2.06× → 0.96×; stylesheet 5.2× → 2.58×; removes cross-entry damage (color after value: 2.28× → 1.51×) | 0 mismatches, all 7 entries |
| Bind nonterminals directly after actions attach (no per-reference lazy trampoline) | bbnf-lang `ASTToParser` `nonterminal` case (`bbnf.js:2175`), plus an API that lets actions be attached before binding | a further 10–15%: value → 0.82×, color → 1.38×, stylesheet → 2.20× | 0 mismatches |
| Multi-character or keyword dispatch for alternations whose FIRST sets overlap (ident / function-name trie), or left-factor `ident "("` in the BBNF | bbnf-lang `buildPartialDispatchTable` / grammar `color.bbnf`, `value.bbnf` | not prototyped; it addresses 72% of calls failing and 96% of function-head attempts failing in color, the remaining 1.2–1.4× entries | n/a |
| Tag and text actions without whole-subtree `tagsOf`/`textOf` re-flattening (span-based text: `substring(start, end)`) | value.js `src/css/bbnf/stylesheet.ts:11/25/31` | not prototyped; 22–31% of stylesheet self time after the fix | n/a |
| Stop re-lexing matched tokens in actions (capture groups from the leaf regex) | value.js `math.ts:38`, `value.ts:42`, via a parse-that regex leaf that yields its match | about 2–5% | n/a |
| Precompile or cache the grammar (serialize AST / emit JS) | bbnf-lang `BBNFToParser`, 69% of which is BBNF-text parsing | cold first use 14 ms → ~1 ms class | n/a |
| Make `mergeErrorState` a no-op | parse-that `utils.ts:28` | **not a lever**: neutral for color/value, 1.3× → 1.8× regression on keyframe/timing (reproduced) | 0 mismatches |

## Reproduce (cwd `/Users/mkbabb/Programming/value.js`; `D=docs/tranches/X/parse-that/evidence/W7-research/survey-profile`)

- `node $D/build.mjs` — esbuild bundles into `$TMPDIR/value-js-w7-survey-profile/`: the candidate with parse-that/bbnf-lang external, the retired parser from `git archive 2155142b` (blob-pinned), and the patched variants (`PATCHES`).
- `node --expose-gc $D/bench.mjs 9` — the paired table, including the accepted/rejected split.
- `node --expose-gc $D/isolated.mjs` — fresh process per cell. `ARMS=… OUTFILE=…` selects arms.
- `node --expose-gc $D/bench-variants.mjs 9` — all arms in one process.
- `node --expose-gc $D/pollution.mjs` · `node --allow-natives-syntax $D/proto-check.mjs`
- `node --expose-gc $D/compile.mjs 11` · `node $D/counts.mjs` · `node $D/dispatch-check.mjs`
- `node --cpu-prof --cpu-prof-interval=200 $D/profile-run.mjs <entry> 5 <candidate|retired|variant-noproto> [pollute]`, then `node $D/analyze-profile.mjs <file.cpuprofile>`.

Result files: `bench-2026-09-23T21-20-36-496Z.json`, `isolated-result.json`, `isolated-noproto-direct.json`, `variants-2026-09-23T21-21-27-465Z.json`, `pollution-result.json`, `compile-result.json`, `counts-result.json`, `profiles/`.

## Side findings

- parse-that never updates `ParserState.furthest`, so `load.ts:62`'s `Math.max(state.offset, state.furthest ?? 0)` always reads `state.offset`. No caller reads `furthest` today.
- A bundled (esbuild) copy of parse-that and the external `node_modules` copy perform the same: control arm `variant-bundled` vs `candidate` is within noise, 0.95–1.05. The variant results therefore measure their patches, not the bundling.
