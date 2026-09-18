<!-- SERVED MODEL: claude-opus-5[1m] -->

# AC-2 CLOSED-IR — `VERDICT.md` (X.P.W2.e)

Candidate `ac2`, `ALGEBRA.md` §12's second id. One algebra (`algebra/`), two lowerings
(`lowering-js/`, `lowering-wasm/`), the §3d slice in both, built in `<p2>/.worktrees/ac2` on branch
`w2/ac2`. Nothing in `harness/w2/**`, `harness/{totality,equivalence,bench}/**`,
`experiments/w2/corpus/**`, `experiments/w2/contract/ALGEBRA.md` or `rust/parse_that/**` was written
by this seat.

Everything below is a number this seat ran. No number is from memory and none is a bar.

---

## A. The declared postures (FF-4 — written BEFORE the first measurement)

They are in `harness-adapter.mjs` `meta.postures`, verbatim, and none was edited after a probe ran.
The three that decide what this candidate *is*:

| posture                        | declaration                                                                                                                                                                         |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **lowering moment · JS**       | **init-time compile.** The IR is walked ONCE at module load; what it leaves is a graph of the combinator library's own `Parser` nodes. Nothing dispatches on `node.op` during a parse. |
| **lowering moment · Wasm**     | **build-time emit.** `node build.mjs` writes `artifacts/ac2.wasm`; the shipped artifact contains no IR at all. Absent the file, the same walk runs at init and `emittedAt` says so.   |
| **parse-time interpretation**  | **THE DEGENERATION, NOT A MODE.** The candidate ships no interpreter and no flag selecting one. `probes/degenerate-interpreter.mjs` builds it on purpose so that it can be priced.    |

§3c's axis has three moments; this candidate declares **two of them, one per backend**, and names
the third as its kill. The other seven postures (freeze · token juxtaposition · non-finite numeral ·
try/catch shield · depth bound · arena coordinate · numeric conversion) are in the adapter.

---

## B. The four predicted failure modes, probed FIRST (§5 `.e`)

Order of execution, and why: `p2 · p3 · p4 · p5 · p6 · p7` carry no duration and ran first; the
**Stage-2 bijection** (G-2) was printed next; `p1` — the only probe carrying a duration — ran after
it. Timing an un-bijected candidate is the protocol violation §3e names, and this seat did not
commit it in either direction.

### (a) double-interpretation tax — **NOT OBSERVED**

`node probes/p1-interpretation-tax.mjs`

The grammar is handed to both compilers behind a Proxy counting every read of a node's `op`.

| lowering                     | `op` reads while LOWERING | `op` reads over 527 PARSES | verdict                          |
| ---------------------------- | ------------------------- | -------------------------- | -------------------------------- |
| js (init-time compile)       | 5,973                     | **0**                      | TOTAL — no node fell back        |
| wasm (build-time emit)       | 5,973                     | **0**                      | TOTAL — the artifact holds no IR |

The degeneration was then built (`degenerate-interpreter.mjs`: same runtime helpers, same registry
tables, the ONLY difference being that its switch on `term.op` runs per node per parse) and its
fidelity printed **before** its cost: **0 of 527 rows disagree** with the shipped lowering on
EQ-1..EQ-5. Then, interleaved, 40 rounds, first 10 discarded, median:

| cell                                                    | median ms / 527-row sweep | × the shipped JS lowering |
| ------------------------------------------------------- | ------------------------- | ------------------------- |
| js · init-time compile (SHIPPED)                        | 0.563                     | 1.00×                     |
| wasm · build-time emit (SHIPPED)                        | 0.449                     | **0.80×**                 |
| parse-time interpretation (THE DEGENERATION, NOT SHIPPED) | 0.867                     | **1.54×**                 |

`BAR: OWNER-GATED-PENDING-RATIFICATION`. This is a predicted-failure probe, not a bench cell; Stage 4
is W1's honest bench and no bar is read here or anywhere in this file.

### (b) the `hostFn` escape-hatch node (K-3) — **NOT OBSERVED**

`node probes/p2-hostfn-escape-hatch.mjs`. The probe does not grep; it welds the hatch in at the
tempting site (`balanced-tail`) and watches four things.

- `closureLeaks` over the welded grammar: **1**, at `terms.balanced-tail.args.1.fn (function)`.
- `assertClosed(welded)` → `HALT (CL-1): 1 non-JSON value(s) under terms`. It fires.
- `lowering-js/compile.mjs` → `HALT (closed union): 'HOSTFN' is not one of the twenty-two — the JS lowering has no case for it`.
- `lowering-wasm/emit.mjs` → `HALT (closed union): 'HOSTFN' is not one of the twenty-two — the Wasm emitter has no case for it`.
- kinds with exactly one lowering: **0 of 22**. `DECLARED-ABSENT` symbols: **0**.
- the hard 20 % is lowered in BOTH and the products compared: `var(--brand)` · `var(--a, rgb(1 2 3))`
  · `var(--x (nested (deeper)) tail)` · `currentcolor` · `selecteditemtext` ·
  `color-mix(in oklch, red, blue)` — **6 of 6 `js ≡ wasm`**.

Both switches have **no `default:` arm**. That is the closed-union law made load-bearing rather than
documented.

### (c) label / PC drift (the 18-vs-20 defect, structurally) — **NOT OBSERVED**

`node probes/p3-label-pc-drift.mjs`

- `js.labels() === wasm.labels() === LABELS` → **true**. One object, not two equal ones. 48 rows, frozen.
- the implicit-`TRY` site index: **114 sites**, two independent walks agree (digest `e5bfd27f168dcbd0`).
- over the 527-row slice, both lowerings: marks naming a site the walk never assigned **0**;
  P/C/D offsets outside `[0, |S|]` **0**; rows where the two lowerings' offsets disagree **0**.
- **the drift injection**: one extra row at the head of `L` changes EQ-4's digest over the corpus's
  failing rows (`7cd3c35fb1ec87ee…` → `d0699f5b03436b0d…`). The instrument could have seen the defect.

### (d) toolchain capture (K-9) — **NOT OBSERVED**

`node probes/p4-toolchain-capture.mjs`

`cargo`, `rustc`, `rustup`, `wasm-pack`, `wasm-bindgen`, `wasm-opt`, `clang`, `cc`, `gcc` all resolve
on this machine. The declared build command was then run in a child process with them stripped from
`PATH` (27 of 30 entries kept; **0 banned binaries still reachable**) and a scratch `HOME`:

```
node experiments/w2/ac2-closed-ir/build.mjs      → SUCCEEDED
artifacts/ac2.wasm  117544 bytes  sha256 d70449e8b2eb637326dbc319cd8b2e7631178815ccc1dc141cc00a6ce15d33c7
imports 0  exports 4  nodes 580  operators 22
toolchain: node v22.15.0 — and nothing else
```

Byte-identical to the in-process emit (`117544` / `d70449e8…`) — and produced by a **different node
version** (v22.15.0 in the stripped child, v26.0.0 in-process), so the emit is not node-version
sensitive either.

**K-10**, walked over the real module graph rather than grepped: 21 local files, 5 non-relative
specifiers (`node:crypto`, `node:fs`, `node:path`, `node:url`, and the published `@mkbabb/parse-that`
dist). References into `/Users/mkbabb/Programming/parse-that`: **0**. Naming `wasm32`: **0**. Into
`rust/parse_that` or any `.rs`: **0**. The emitted bytes do not contain the string `wasm32`.

### the seat's own fifth probe — OP-03's decimal→f64 — **AGREES**

`node probes/p5-number-agreement.mjs`. Not one of §3c's four; added because K-1 admits zero
divergence and this is the candidate's largest EQ-1 hazard.

- 32 numeral edges (`-0`, `1.`, `1e400`, `5e-324`, `9007199254740993`, the 17-digit round-trip width,
  `2.2250738585072014e-308`, …) through both lowerings: **32/32 `Object.is` ✓**, 0 divergences.
- the exact paths are **0 ULP** from `Number()` over the 30 corpus numerals that reach them.
- **the DECLARED fallback's worst distance is 3 ULP**, at `45679011934567900000e-164`, over 801
  numerals. Printed, not assumed away — §4.1's fallback is declared non-correctly-rounded and this is
  how far it actually is.

### AC-2's Stage-0 falsifier — **NOT HIT**

`node probes/p7-falsifier.mjs`. The falsifier, verbatim from §3c: *"the IR node set for the slice
grammar exceeds its own declared closure, or the init-time compiler's totality cannot be demonstrated
for `recover` → killed."*

| clause                                       | reading                                                                                                                                                                       |
| -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| node set vs declared closure                 | 580 nodes over **20 of the 22** declared kinds. Used-but-not-declared: **0**. Argument tags outside the six: **0**. `unionBreaches`: **0**. Declared-but-unreached: 2 (`FAIL`, `TRY`) — both still lowered in both backends, so no K-3. |
| `recover`'s totality, **demonstrated**       | RECOVER lowered **1×** at init in JS and **1×** at emit in Wasm; **0** IR `op` reads at parse time in either; fires on **8 of 15** stylesheet rows producing **24 events → 24 diagnostics** (1:1), and **0** rows where the two lowerings' recoveries or `D` differ. |

---

## C. Stage 2 — the bijection, printed BEFORE any timing

`node harness/w2/op-bijection.mjs --candidate ac2` → **GREEN**, 22 contract rows, 22 js rows, 22 wasm
rows, fingerprints pairwise equal, `DECLARED-ABSENT` wasm symbols **0**. Every row `ok`:
`OP-01 SCAN compileScan/emitScan` … `OP-22 REF compileRef/emitRef`.

Stage 2 (ii), zero throws: `r1-candidates.mjs` → **0/172 throws** on each of three productions in
each of two lowerings, `7/7` non-string boundary inputs returning `ok:false` with an issue, **0**
empty-diagnostic rejections. And `eq-six.mjs` ran 30,527 rows through both lowerings without the
K-8 guard firing.

---

## D. Stage 3 — the six products and the five laws

### the six products (G-3)

`node harness/w2/eq-six.mjs --candidate ac2 --corpus experiments/w2/corpus/slice.json --fuzz-seed experiments/w2/corpus/fuzz-seed.json`

| product | divergences (js vs wasm) | first row            |
| ------- | ------------------------ | -------------------- |
| EQ-1    | **0**                    | -                    |
| EQ-2    | **0**                    | -                    |
| EQ-3    | **0**                    | -                    |
| EQ-4    | **0**                    | -                    |
| EQ-5    | **0**                    | -                    |
| EQ-6    | **2035**                 | s0180 `"var(--brand)"` |

**30,527 rows compared** (527 slice + 30,000 replayed fuzz), label indices aligned, third-cell
differences 236 (12 carrying a declared row). **K-1 is satisfied: zero divergence between the two
lowerings on the five products that compare them.** EQ-6 is COMP-1, which is not a comparison between
the lowerings — it is a property of the grammar, and it fails **identically in both**. See §F, F-e6.

### the five laws (G-4)

`node harness/w2/recovery-laws.mjs --candidate ac2`

| lowering | TRY sites | R-LAW-1 mismatches | R-LAW-2 COMP-1 failures | R-LAW-4 amplified | R-LAW-4 zero-width | R-LAW-3 |
| -------- | --------- | ------------------ | ----------------------- | ----------------- | ------------------ | ------- |
| js       | 2942      | **0**              | 13                      | **0**             | **0**              | silent  |
| wasm     | 2942      | **0**              | 13                      | **0**             | **0**              | silent  |

R-LAW-1 exact over 2,942 restored marks in each lowering. R-LAW-3 silent under the throwing
`console.error`/`console.warn` patch. R-LAW-4 neither amplifies nor admits a zero-width `sync`.
R-LAW-5 is structural and read by `op-bijection.mjs --structural`: **0** RECOVER in a non-final ALT
arm. R-LAW-2's 13 are the same F-e6 rows.

---

## E. Gate readings this seat turned

| gate     | command (from `<p2>/.worktrees/ac2`)                                              | reading                                                                                                                    |
| -------- | --------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| **G-1**  | `node harness/w2/op-bijection.mjs --structural`                                   | **GREEN** — homes sha256-equal, 22 enumerated = 22 stated, 0 target-conditionals; ac2/js and ac2/wasm each: ops∉22 **0**, recover≺alt **0**, cut∉alt **0**, unowned-span **0**, closure-leak **0** |
| **G-2**  | `node harness/w2/op-bijection.mjs --candidate ac2`                                | **GREEN** — 22 rows, both lowerings, fingerprints pairwise equal                                                            |
| **G-3**  | `node harness/w2/eq-six.mjs --candidate ac2 …`                                    | **RED (honest)** — EQ-1..EQ-5 **0** over 30,527 rows; EQ-6 **2035**, one cause, F-e6                                        |
| **G-4**  | `node harness/w2/recovery-laws.mjs --candidate ac2`                               | **RED (honest)** — R-LAW-1/3/4/5 green both sides; R-LAW-2 13 rows, the same F-e6 cause                                     |
| **G-5**  | `node harness/w2/r1-candidates.mjs --candidate ac2`                               | **GREEN** — 0/172 throws × 3 productions × 2 lowerings, 7/7 boundary, 0 empty-diagnostic rejections                         |
| **G-8**  | `node --expose-gc harness/w2/alloc-latch.mjs --candidate ac2`                     | **RED (honest, one leg)** — history drift js 0.976× / wasm 0.880×, reset residue js 0.679× / wasm 0.957×, steady-state heap negative both sides; **the js reject path reads 13.1 B/parse**. F-e8. |
| **G-9**  | `node harness/w2/wasm-audit.mjs --candidate ac2`                                  | **GREEN** — imports **0** over all kinds, no start section, closed export set (`memory` + 3 entries), memory 33,554,432 B before and after 2,000 steady-state parses, K-9 none, K-10 intact |
| **G-10** | `node harness/w2/idiom-nocst.mjs --candidate ac2`                                 | **GREEN** — 837 graph nodes, `opt` under `all` **0**, `lazy` **0**, memoize **0**; all five textual zeros **0** over 11 declared sources; the excess-property `tsc` fixture PASSES |
| **G-11** | `node harness/w2/depth-scan.mjs --candidate ac2`                                  | **GREEN** — the deep-nesting row returns `ok:false` with 1 issue in BOTH (never a `RangeError`); scan primitives reached as algebra leaves: DIGITS · DISPATCH · KW · LIT · SCAN · TEXT |

Substrate receipt: `<p2>` at `81370815c595` branch `w2/ac2`, node v26.0.0 / v8 14.6.202.33-node.19,
darwin arm64; third cell `@mkbabb/value.js@4.0.0` `/css` sha256 `8b5381305ea26236…` == pinned;
committed `wasm32` in the evidence root **0** (OP-6 holds).

G-6, G-7 and G-12 are not this seat's (`.g`'s coverage reporter, W1's bench at Stage 4, `.h`'s
ledger).

---

## F. Findings — declared, never silent

**F-e1 — §10.3's `sync-rule` is written with bare `SCAN`/`LIT`.** §2.4 (INV-OWN) calls an unowned
`Span` term "a typing error the bijection walk rejects". Encoded here through the `DROP` notations,
observationally identical because `sync` runs under discard. Consequence: `op-bijection --structural`
reads `unowned-span 0` because the seat encoded around the contract's slip rather than reproducing it.

**F-e2 — §10.3's two `CUT`s sit under `RECOVER`/`REP` with no enclosing `ALT`.** §5.2 calls that a
walk error; they are semantically inert there and are not encoded. Consequence: `cut∉alt` reads 0.

**F-e3 — a `DISPATCH` row's term rides the node's argument list.** §4.1 writes the table as
`key → term`; keeping the terms in `R_disp` would hide half the grammar from `term.mjs`'s structural
walk. The registry keeps the keys and their order and maps to an arm INDEX.

**F-e4 — `important` is carried as `PURE 1` / `PURE 0`.** §4.1 admits only `F ∣ S ∣ none ∣ unit` as
`PURE`'s literal; the `declaration` row reads `args[2] !== 0`.

**F-e5 — OP-03's decimal→f64 is the ALGEBRA's routine, lowered twice.** `algebra/numeric.mjs` →
`lowering-js/runtime.mjs` and `lowering-wasm/helpers.mjs::scalePow10`. Measured in §B: exact paths
0 ULP, declared fallback worst 3 ULP.

**F-e6 — MAJOR, WAVE-LEVEL, THE CONTRACT'S AND NOT A LOWERING'S. §10.1's `balanced-tail` writes `C`
entries that fail §4.5's own predicate.** `node probes/p6-comp1-kind-fidelity.mjs`

```
balanced-tail := REP (ALT[ SEQ[TOK "(", REF balanced-tail, TOK ")"],
                           DROP keyword (SCAN any-but-paren 1 ∞) ]) 0 ∞      (§10.1, verbatim)
π_keyword     = /^[A-Za-z][A-Za-z0-9_-]*$/                                    (§4.5)
```

`SCAN any-but-paren 1 ∞` matches every code unit that is not a parenthesis, so the kind the line
names cannot be satisfied by the bytes the line consumes.

| reading                                                       | number                                                               |
| ------------------------------------------------------------- | -------------------------------------------------------------------- |
| rows measured (slice + replayed fuzz)                         | 30,527                                                               |
| rows failing COMP-1 · js / wasm                               | **2035 / 2035**                                                      |
| rows where the two lowerings' `C` and `P` are byte-identical  | **30,527 of 30,527**                                                 |
| COMP-1 sub-law                                                | COMP-1c, 2,047 occurrences, **all** `kind 'keyword'`                 |
| population                                                    | fuzz-wellformed 1262 · fuzz-malformed 760 · slice ground-a-guarded 9 · slice var-context 4 |

The defect is therefore not a divergence: one grammar, two identical products, one failing predicate.
No lawful kind cures it in place — §OP-13 excludes `skipped` and `residue` from `DROP`, and of the
four droppable kinds none admits `--brand`. Three cures were measured on an in-memory copy of the
grammar (**the shipped grammar remains §10 verbatim, FF-3**), and **each drives the population to 0**:

| cure                                          | where it lands                                  | after | cost                                                                          |
| --------------------------------------------- | ----------------------------------------------- | ----- | ----------------------------------------------------------------------------- |
| 1 · a seventh kind `opaque`, π = \|bytes\| ≥ 1 | §4.5's kind table + `K_C` + the serializer's    | **0** | `K_C` 6 → 7; every candidate's EQ-2 kind index shifts; `.g` owns that list     |
| 2 · widen `π_keyword`                         | §4.5's predicate only                           | **0** | `π_keyword` stops meaning `keyword`                                           |
| 3 · re-kind that one `DROP` to `skipped`      | §10.1's one line                                | **0** | §OP-13's exclusion would have to be relaxed                                   |

**ESCALATION.** This is an `ALGEBRA.md` correction, and `ALGEBRA.md` is `.c`'s ratified file, immutable
to this seat (E-3: corrections are dated addenda-beside). §3a's own trigger anticipates it — *"G-3 red
on the SAME product for all three admitted candidates (the contract is then suspect, not the
candidates)"* — and this seat expects AC-1 and AC-3 to reproduce it exactly, because it is the shared
slice that carries it. Named for `.h` and the owner; not cured here.

**F-e7 — RETRACTED BY THIS SEAT.** During development this seat believed
`experiments/w2/corpus/fuzz-seed.json`'s banked `rowsSha256` did not reproduce, and was preparing to
escalate it as a blocking `.g`-owned defect. **It reproduces.** `eq-six.mjs` passed its replay check
and compared 30,527 rows. The seat's own re-derivation was wrong; `.g`'s corpus is intact. Recorded
because a retracted finding that is never written down is a finding that gets re-discovered.

**F-e8 — G-8's reject-path allocation leg, and why it reads as it does.** The gate's condition is
`reject-path B/parse ≤ 0` in **both** lowerings. Readings, reproduced identically across two runs:
js **131,376 B / 10,000 rejects = 13.1 B/parse**; wasm **192 B / 10,000 = 0.019 B/parse** (printed as
`0.0`, and NONZERO on the later runs). Measured decay over five consecutive 10,000-reject windows
with `gc()` at both ends of each: **10.88 → 1.71 → 1.38 → 6.02 → −0.29 B/parse** — the gate reads the
FIRST, cold window. The seat did NOT re-run for a greener number and did not touch the probe.

Cause, named: the JS lowering materializes `marks` and `D` as JS objects, which the `<Lowering>`
contract requires (EQ-5 compares the mark trace); the Wasm lowering writes the same journals into
linear memory, which is why its reading is ~0. R-LAW-1 declares this asymmetry but declares it the
other way round — *"arena truncation vs an allocation-free JS failing path"* — and on this instrument
it is inverted. **A JS-object-returning boundary cannot allocate literally zero on the reject path**,
so the leg as worded is not reachable by any JS lowering that publishes `marks`. Escalated as worded,
not worked around.

**F-e9 — `meta.artifacts.dts` re-exports the VENDORED `4.0.0` `css.d.ts`, not `value.js/src/css/types.ts`.**
The live `.ts` was tried first: its transitive imports are runtime modules, and G-10's own invocation
(`tsc --noEmit --strict --skipLibCheck`, no `--target`) then type-checks `value.js/src/color/**` under
the ES5 default lib and reports 40+ `Property 'sign' does not exist on type 'Math'` errors that have
nothing to do with this candidate. The vendored declaration bundle is the same frozen surface, is
`.d.ts` (so `--skipLibCheck` skips it), and is the bytes `published.mjs` already pins as the third
differential cell — so the type `V` is measured against and the implementation `V` is compared against
are one artifact.

**F-e10 — `arenaHighWater()` reports the LAST parse's arena, not a cross-parse watermark.** G-8 reads
it immediately after the reject window, where a parse that built no value allocated no arena, so it
prints `0 B` honestly. Measured on the accept path in the same process: `rgb(1 2 3)` → 328 B / 5 cells;
`a{color:red}` (`P:stylesheet`) → 608 B / 10 cells; `oklch(50% 0.2 120 / 0.5)` → 256 B / 5 cells;
`zzz` (reject) → 0 B / 0 cells. A cross-parse maximum would be process-global mutable state, which O-8
forbids; the seat chose the stateless reading and declares the consequence rather than adding the latch.

**F-e11 — EQ-5's sixth coordinate is a LOGICAL cell counter, maintained identically in both
lowerings** (incremented at NUM · DIGITS · TEXT · KW · PURE · REP · CTOR — the same seven sites). The
Wasm side's byte watermark rides `arenaHighWater()` beside it. Conflating a byte count with a cell
count would make EQ-5 unfalsifiable across two backends with different allocators.

**F-e12 — BND-1 steps 4 and 5 (the residue entry and Π's single terminal issue) live in each
lowering's glue, above the algebra.** §5.8 puts them at the boundary, not in an operator; both
lowerings run the same two paragraphs, which is what makes EQ-2 and EQ-4 comparable at all.

**F-e13 — MAJOR, A SECOND CONTRACT DEFECT, INDEPENDENTLY REPRODUCED: §10.2's ALT order makes
`linear()` unreachable.** `node probes/p8-alt-order.mjs`

```
timing := SEQ[WS, EXPECT(ALT[ CTOR timing-keyword [KW ident timing-keyword],
                              CTOR step-alias     [KW ident step-alias],
                              DISPATCH ident timing-head { … linear : … } ], "<timing-function>"), WS, END]
```

`linear` is a row of `R_kw.timing-keyword` **and** the key of the `linear` dispatch arm. Under
ordered committed choice the first arm matches the ident run `linear` and **succeeds**; `END` then
fails on the `(` that follows, and the ALT has already returned, so nothing backtracks into it. One
of the four `CssTimingFunction` kinds §10.2 itself puts in the slice therefore cannot parse.

| reading | number |
| --- | --- |
| `P:timing-function` rows in the slice corpus | 29 |
| rows whose input is a `linear(…)` call | 5 |
| …REJECTED as §10.2 writes it, in **both** lowerings | **5 of 5**, every one `trailing_input@6 expected ["end of input"]` |
| the cure (`DISPATCH` arm first), swept over all 527 slice rows | **3** rows REJECT → ok, **0** previously-accepted rows lost |
| the 2 that still reject | lawfully and elsewhere: `linear(0)` has one stop against §10.2's own `REP linear-stop 2 ∞` (`expected ["<whitespace>","','"]@8`); `linear()` is a GROUND-A row (`expected ["<number>"]@7`) |

**This was written after X.P.W2.d's receipt landed in the wave record**, and it is the reason the
probe exists: `.d` reports the same defect as its **F-7** and **cures it in its realization** ("the
realization puts the `DISPATCH` arm first"). This candidate ships §10.2 **verbatim** (FF-3) and
therefore reproduces it — at the same offset, with the same label, from a different candidate and a
different codebase. Two independent seats, one contract line.

**The consequence for the field's arithmetic, stated plainly**: `.d` and this seat took *opposite*
postures on the same defect — `.d` cured it in its realization, this seat shipped it — so the two
candidates' `P:timing-function` rows are **not comparable row-for-row** on the 5 `linear(…)` inputs.
Neither posture is wrong; they answer different questions, and `.h` should not read the difference as
a capability gap. The seat records its own posture rather than quietly matching the sibling's.

---

## G. What this seat did not do

It did not edit `ALGEBRA.md`, W1's instruments, `.g`'s harness, `.g`'s corpora, or its own falsifier.
It did not touch `rust/parse_that/**` — this candidate emits its Wasm in JavaScript, so there was
nothing to build there. It set no bar and printed no pass/fail on a speed reading. It did not cure
F-e6, because curing it means editing the shared slice, and a candidate that edits the shared slice
has made its corpus a self-authored answer key and its EQ numbers incomparable with the other two.

Three gates are RED and each is RED for a stated, measured reason with its cause named and, where a
cure exists, the cure measured and left unshipped. **The seat does not claim its candidate survives;
that verdict is `.h`'s.**

One thing it did do that the brief did not ask for: when X.P.W2.d's receipt landed in the wave record
mid-unit, this seat read it and **tested its sibling's finding against its own bytes** rather than
citing it. F-e13 is the result — the same contract defect, at the same offset, with the same label,
from a different candidate. A finding two seats reproduce independently is worth more to `.h` than
two seats agreeing.
