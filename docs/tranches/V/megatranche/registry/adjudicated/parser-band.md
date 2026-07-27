# Parser Band — Adjudication (M-12 tri-fold, arbiter-F, L-14)

**MODEL RECEIPT**: arbiter-F ran on **Fable 5** (`claude-fable-5`), per system prompt; adjudication session 2026-07-27, node v26.0.0 · darwin arm64.
Candidate receipts: cand-F = Fable 5 (`claude-fable-5`); cand-O = Opus 5 (`claude-opus-5[1m]`, in-seat, no subagent).

Workspace: `docs/tranches/V/megatranche/prototypes/css-parser/` — `cand-f/` and `cand-o/`, adjudicated against the **published** `@mkbabb/value.js@4.0.0` artifact (npm install in the workspace node_modules; cand-O additionally vendors the tarball with an in-test sha256 pin of `dist/subpaths/css.js` = `8b5381…0c42`).

---

## VERDICT

**WINNER: cand-O**, with an explicit debts-to-cand-F rider (§ "What cand-O owes cand-F"). Both candidates independently reproduce, both are GREEN on the R1 totality class where the published parser is RED, and the two grammars agree with each other on **30,000 seeded fuzz inputs with zero acceptance disagreements** — the band's thesis (idiomatic parse-that can carry CSS Color 4 totally) is proven twice over. cand-O wins on the axes the parser waves will live on:

1. **Architecture** — the eight colour functions are ONE production parameterised by a channel table (`spec.ts`); `rgb()` and `oklch()` are rows. cand-F factors well (`labLikeBody`/`lchLikeBody`, `channel(fromNumber, fromPercent)`) but still hand-writes per-family bodies. Adding a css-color-5 function to cand-O is a table row; to cand-F it is a new function.
2. **Drop-in fidelity, measured** — on every contested divergence I probed, the published parser sides with cand-O bit-for-bit: hue is NOT wrapped at parse time (`hsl(480 …)` → 480 in published and cand-O; cand-F wraps to 120 — a real drop-in defect that would corrupt hue-arc interpolation in an animation library); `color(xyz-d50 …)` is Bradford-adapted to identical digits (`0.20946884509321387…`); `1e400` never reaches the AST (cand-O clamps where clamps exist and returns `color_non_finite` on unclamped channels; cand-F admits `Infinity` into `lab()` a/b — a downstream math hazard the incumbent does not have).
3. **Scope** — currentColor, 19 system colours, `var()`/`env()`, css-color-5 relative syntax parse to context nodes instead of being rejected; the adapter (not the grammar) owns the value.js rename/rescale/adaptation. "A parser that silently applies a chromatic-adaptation matrix is not a parser" is the right layering for V-next.
4. **Evidence depth** — 355 vs 210 tests; equivalence against the **published tarball** (sha-pinned) rather than an adapter over spot inputs; a 22-row divergence ledger asserted in both directions; MT-F024 asserted executably; idiom measured structurally by walking the built combinator graph (no `.opt()` child of any `all()`, exactly 1 lazy, 0 memoize) — a grep cannot prove that, the graph can; null-prototype keyword tables closing a real bug class (`color(constructor 0 0 0)`).

cand-F is not a losing design — it is a smaller, sharper instrument (620-line single-file grammar, zero recursion, totality **without** try/catch, labelled failures). Its debts are enumerated below and are binding on the wave.

---

## MEASURED — R1 totality gate (the exact corpus of `audit/probes/r1-published-totality.mjs`, 172 inputs + 7 non-string)

| cell | throws | spurious accepts | non-string throws |
|---|---|---|---|
| cand-F `parseColor` | **0**/172 | 0 | 0/7 |
| cand-O `parseColor` | **0**/172 | 0 | 0/7 |
| cand-O `parseColorNode` | **0**/172 | 0 | 0/7 |
| published `parseCssColor` 4.0.0 | **102**/172 | 0 | 7/7 |

Published failure mode is singular: `TypeError: Cannot read properties of undefined (reading 'replace')` — MT-F024, the shipping R1 crash, re-confirmed against the artifact this session.

## MEASURED — cross-bench (one harness, cells interleaved per round, 40 rounds / first 10 discarded, median ns/parse, two runs pasted)

**Run 1**
```
== SHARED accepted (24 inputs x 400 reps, median of 30 scored rounds, ns/parse) ==
published          1500 ns  [1300–1678]  x1.00 vs published
cand-F             1261 ns  [1102–1481]  x1.19 vs published
cand-O drop-in     1466 ns  [1253–1817]  x1.02 vs published
cand-O node        1247 ns  [1045–1532]  x1.20 vs published

== REJECT non-throwing (11 inputs x 400 reps) ==
published           716 ns  [547–984]    x1.00
cand-F              801 ns  [586–1229]   x0.89
cand-O drop-in     1121 ns  [879–1326]   x0.64

== R1 throw class (8 inputs x 400 reps; published wrapped in try/catch) ==
published+catch   82559 ns  [74399–94415]  x1.00
cand-F              632 ns  [514–849]      x130.68
cand-O drop-in      937 ns  [703–1347]     x88.12
```

**Run 2**
```
== SHARED accepted ==
published          1553 ns  [1305–1966]  x1.00
cand-F             1289 ns  [1042–1586]  x1.20
cand-O drop-in     1541 ns  [1179–1763]  x1.01
cand-O node        1290 ns  [1059–1579]  x1.20

== REJECT non-throwing ==
published           693 ns  [563–914]    x1.00
cand-F              810 ns  [589–1008]   x0.86
cand-O drop-in     1088 ns  [902–1350]   x0.64

== R1 throw class ==
published+catch   78034 ns  [70716–125215]  x1.00
cand-F              630 ns  [454–1115]      x123.85
cand-O drop-in      923 ns  [682–1454]      x84.56
```

### HONESTY LAW — the speed claims, stated plainly

- **The regex parser is NOT fastest on accepted input on this box.** Both candidates' node-level parsers measure ~1.19–1.20× faster than published on the 24-input shared corpus; cand-O's value.js-shaped drop-in is parity (1.01–1.02×; the delta is its adapter's `Object.freeze` per success). This **does not reproduce** the prior gate's "LIVE regex measured FASTEST ~1.8×" — different prototype, corpus, and combinator build; OC-1 (bench-bar recalibration) remains open and this table is one more honest input to it, not its resolution.
- **The regex parser IS fastest on the ordinary reject path** (~1.2× vs cand-F, ~1.6× vs cand-O): one regex mismatch bails; alternation exhausts arms. That is the honest, bounded cost of the combinator design.
- **On the R1 class the published parser is ~100× slower even when the caller catches** (~80 µs/parse vs <1 µs) — and callers that don't catch crash. Adoption does not need speed theater; it stands on totality + maintainability, and on accepted-input throughput the candidates happen to win anyway on this box (same-process tsx/node hot loop, N=1 machine — treat accordingly).

## MEASURED — published-parser defects, each confirmed by direct probe this session

| input | published 4.0.0 | cand-F | cand-O | adjudication |
|---|---|---|---|---|
| `rgba(1, 2, 3, 0.5)` | REJECT (gap) | accept | accept | **GAP confirmed** (P-012): the most-deployed colour syntax on the web fails |
| `hsla(120, 50%, 50%, 0.5)` | REJECT (gap) | accept | accept | **GAP confirmed** (P-015) |
| `rgb(1,2,3,)` | ACCEPT | reject | reject | P-037 unsound accept confirmed |
| `rgb(1 2 3 / )` | ACCEPT | reject | reject | P-037 confirmed |
| `rgb(1, 2 3)` mixed separators | ACCEPT [1,2,3] | reject | reject | comma→space rewrite makes separators invisible (found by the bench honesty gate) |
| `hsl(120%, 50%, 50%)` | ACCEPT, hue=432 | reject | reject | percentage `<hue>` over-accept, §7 |
| `lch(50% 50% 50%)` | ACCEPT, hue=180 | reject | reject | same class |
| `rgb(300 -20 3)` | [300,−20,3] unclamped | [255,0,3] | [255,0,3] | §8.1 clamp missing in published |
| `rgb(1 2 3 / 1.5)` | REJECT | alpha=1 | alpha=1 | §4.2 says clamp, not reject |
| `hsl(120 50 50)` vs `hsl(120 50% 50%)` | [120,50,50] vs [120,0.5,0.5] | consistent | consistent (0.5) | **R6 confirmed**: two spec-identical spellings disagree 100× |
| `rgb(1. 2 3)` | ACCEPT | reject | reject | `1.` is not a CSS number |
| `hwb(120, 30%, 40%)` | ACCEPT | reject | reject | css-color-4 functions have no comma form |
| `currentcolor` | REJECT | accept (node) | context node; adapter `color_context_required` | published gap |
| `lab(50 1e400 0)` | REJECT | **accept, a=∞ in AST** | `color_non_finite` | cand-F's sole adjudicated correctness debit |
| `hsl(480 …)` / `hsl(-120 …)` | 480 / −120 (unwrapped) | **120 / 240 (wrapped)** | 480 / −120 | cand-F's parse-time mod-360 is a drop-in divergence; wrapping is serialisation-time |

## MEASURED — cand-F vs cand-O differential

Structured corpus 86 inputs: 79 agree, 7 disagree — all seven adjudicated above or here. Seeded fuzz (mulberry32, 30,000 colour-shaped inputs): **0 acceptance disagreements**.

The seven: hue wrap ×2 (O correct), `xyz-d50` adaptation (O matches published bit-for-bit; F leaves it unadapted and excludes it from equivalence), token juxtaposition ×3 (`rgb(50%20%30%)`, `rgb(1.5.5 3)`, `hsl(120 50%50%)` — O accepts per css-syntax token-stream reading, matching browsers; F rejects as a declared simplification; note published rejects these too, so O diverges from the incumbent **toward** the spec), `lab(50 1e400 0)` (O rejects explicitly, F admits Infinity).

## IDIOM READING (both sources read in full)

Both are genuinely idiomatic parse-that — neither is a regex wearing combinators. Shared virtues: regexes are single-token terminals; fixed arity as `all()` typed tuples (zero `!` under `noUncheckedIndexedAccess`); `.opt()` only ever behind `.then()`/`.next()`, never inside `all()`; two-level `dispatch` narrowing; `chain` for value-dependent continuation over precomputed tables; zero memoize; entry via `parseState` + `isError`, never `parse()` truthiness; legacy homogeneity as grammar alternates, not post-hoc ifs.

Distinctions:
- **cand-O**: `succeed`/`never` built from existing leaves (`string("")`, `regex(/(?!)/)`) — stays inside the combinator algebra; null-prototype tables; exactly one `Parser.lazy` on the one true back-edge (balanced tail); idiom re-measured structurally on the built graph. Its one recursion buys the var()/relative scope and costs a ~2,500-frame stack ceiling, guarded and pinned by test.
- **cand-F**: `succeed`/`reject` on the public `Parser` constructor — one step lower but yields **labelled** failures (`"<named-color>"`, `"<hex-color> (3, 4, 6 or 8 digits)"`) where cand-O's `never` yields an opaque `(?!)` expectation; zero recursion anywhere, hence totality with **no** try/catch honestly held; single-file grammar readable top-to-bottom.

## WHAT CAND-O OWES CAND-F (binding on the wave)

1. **Labelled failure diagnostics.** Replace `never` in the keyword/colourspace `chain` arms with a labelled zero-width failure in cand-F's style; `expected: ["<named-color>"]` beats `(?!)`. This is the single clearest thing cand-F does better.
2. **Reject-path budget.** cand-F fails ~1.3–1.4× faster (0.86× vs 0.64× of published). The wave's bench gate must track the reject path as its own leg; head-dispatch ordering and early separator commitment (cand-F's required-whitespace discipline shows the mechanism) are the knobs.
3. **Recursion bounded by construction, not by catch.** cand-F proves the colour grammar proper is a DAG. cand-O's one `lazy` back-edge (balanced tail) should carry an explicit depth bound so the stack ceiling becomes an ordinary `ok:false` by construction; the try/catch may remain as a last-resort shield but must stay proven non-load-bearing (cand-O's raw-`parseState`-over-corpus test is the right instrument and must survive).
4. **The `(p * 255) / 100` exactness note and the JS-boundary non-string guard** — both candidates converged on these independently; keep both, cite cand-F's comment ("2.55 is inexact in binary; 100% must be exactly 255").
5. **The GROUND-A empty-arg class as a generated cross-product** — both suites generate it; the wave inherits the union (21 heads × 10 fillings) plus cand-F's 4,000-case mutation fuzz alongside cand-O's replayable mulberry32 corpus.

## RECOMMENDED WAVE SPEC — the parser waves (V-next / π-band)

**Base**: cand-O's four-file architecture (`ast` / `spec` / `grammar` / adapter), amended per the five debts above. cand-F's suite is folded in, not discarded: its positive/totality corpora become additional rows; conflicting expectations (hue wrap, juxtaposition, Infinity) resolve to the adjudications in this document.

**Born-RED gates** (each must be RED against published 4.0.0 before the wave lands, GREEN after):
- **G1 — R1 totality**: the existing `docs/tranches/V/megatranche/audit/probes/r1-published-totality.mjs`, unmodified, run against the packed artifact. RED today (102/172 throws on `parseCssColor` + the other eight entry points' shares of 324/1548). GREEN condition: zero throws, exit 0. This probe is the band's anchor; it targets ALL nine public parsers, so the colour wave discharges only its slice and the probe stays wired until the whole surface is total.
- **G2 — legacy 4-arg gap**: `rgba(1, 2, 3, 0.5)` and `hsla(120, 50%, 50%, 0.5)` parse to `{rgb,[1,2,3],0.5}` / `{hsl,[120,0.5,0.5],0.5}`. RED today (both reject).
- **G3 — R6 spelling equivalence**: `parse("hsl(120 50 50)") ≡ parse("hsl(120 50% 50%)")` bit-for-bit. RED today (100× disagreement).
- **G4 — §8.1/§4.2 clamps**: `rgb(300 -20 3)` → [255,0,3]; `rgb(1 2 3 / 1.5)` → alpha 1. RED today (unclamped / rejected).
- **G5 — unsound accepts close**: `rgb(1,2,3,)`, `rgb(1 2 3 / )`, `rgb(1, 2 3)`, `hsl(120%, 50%, 50%)`, `lch(50% 50% 50%)`, `hwb(120, 30%, 40%)`, `rgb(1. 2 3)` all reject. RED today (all accepted).
- **G6 — equivalence harness**: field-for-field `{space, channels, alpha}` agreement on the 81-input agreement set + all 148 named colours, against the **vendored sha-pinned published tarball** (never the working tree — the repo's own `dist/subpaths/css.js` differs from what 4.0.0 ships; cand-O's finding, dist-drift, should be ledgered separately).
- **G7 — bench, three legs** (shared-accepted / reject / R1-class), interleaved-cells + median-of-rounds + printed sink, published as baseline. Bar (pending OC-1 recalibration): accepted ≥ 0.9× published; reject ≥ 0.6× published; regression from the numbers in this document is a wave-blocker. No speed claims outside the printed table.
- **G8 — idiom gates**: cand-O's structural graph-walk (no `opt` under `all`, lazy ≤ 1 with a depth-bounded back-edge, memoize = 0) + the comment-stripped textual zeros (`!`, `as any`, `as unknown as`, `.parse(`, hand-rolled cursors).

**Scope note**: the relative-colour arm stays recognised-not-validated (declared, pinned) until a css-color-5 wave; `color-mix()` remains a both-sides gap (verdict "neither", GROUND-A P-028).

## DISSENT (preserved, unresolved)

- **Token juxtaposition** (`rgb(50%20%30%)`): cand-O accepts (css-syntax token-stream reading; browsers agree), cand-F rejects (declared simplification), **published rejects**. The adjudication adopts cand-O's reading, but this widens acceptance relative to the incumbent — a consumer relying on the incumbent's rejection would see behavior change. The wave must pin it as a DECLARED divergence row, and the owner may overrule toward cand-F's stricter line without disturbing the rest of the verdict.
- **Non-finite numerals**: three-way split — published rejects `1e400` outright; cand-O clamps where clamps exist and fails `color_non_finite` on unclamped channels; cand-F admits Infinity. The adjudication sides with cand-O (closest to the incumbent while keeping the clamp semantics), but the GROUND-C contract question ("are ±Infinity admitted?") deserves an owner ruling; cand-F's "the clamps absorb them where clamps exist" is half-adopted, its unclamped pass-through rejected.
- **try/catch posture**: cand-F holds that a shield converts an impossible bug into a silent `ok:false` and ships without one, proven by 10,000-case fuzz over a recursion-free grammar; cand-O keeps a guard proven non-load-bearing. The verdict requires cand-O's posture only because its grammar recurses; if the wave lands with the depth-bounded tail, cand-F's position becomes tenable again and the shield may be removed. Recorded as live disagreement, not settled doctrine.
- **Bench epistemics**: both candidates and this adjudication measure same-process hot loops on one machine. The direction-reversal against the prior gate's "regex ~1.8× fastest" is now measured three times by two authors and an arbiter with three methods — but OC-1 owns the bench bar, and nothing here pre-empts it.
- **cand-F's disclosure hygiene is noted for the record**: it shipped the shared-workspace value.js install (package files byte-unchanged), disclosed a transient cand-O typecheck failure (`grammar.ts:319`, since fixed — workspace `tsc --noEmit` exits 0 at adjudication time), and named its named-colour-table provenance. Nothing in this verdict stems from process fault on either seat.

---

*Probes used (scratchpad, reproducible): `r1-both-candidates.ts`, `divergence-checks.ts`, `differential-f-vs-o.ts`, `cross-bench.ts`; suites re-run via `npx vitest run cand-f` (3 files, 210/210) and `npx vitest run cand-o` (5 files, 355/355); `npx tsc --noEmit` workspace-clean; node v26.0.0, darwin arm64, 2026-07-27.*
