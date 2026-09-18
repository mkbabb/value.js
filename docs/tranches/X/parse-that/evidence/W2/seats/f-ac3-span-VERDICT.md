SERVED MODEL: claude-opus-5[1m]

# AC-3 SPAN-ALGEBRA — X.P.W2.f's verdict

Seat `X.P.W2.f` under `value.js/docs/tranches/X/parse-that/waves/W2.md` §5 `.d/.e/.f`, against the
ratified `experiments/w2/contract/ALGEBRA.md` (sha256 `14450aa4e5fcc976dbdc2aa54b1608df5712e0f57975b00229e2666b151f66f7`,
both homes equal). Branch `w2/ac3-scan-union`, worktree `<p2>/.worktrees/ac3`.

**No bar is set anywhere in this file.** Every duration carries
`BAR: OWNER-GATED-PENDING-RATIFICATION` (COHESION §0j.E OC-1), and no speed sentence exists outside a
printed table.

---

## A. The posture, declared before measurement (FF-4)

`ALGEBRA.md` §12 AC-3 obliges the seat to say which posture it tested — *"SIMD/scalar full lowering
vs leaf-wasm (wasm scan leaves, parse in JS — a weaker question, recorded either way)"*. Neither word
alone is true of what was built, so the posture is written out and its consequences are stated rather
than left to be found. It is `harness-adapter.mjs`'s `meta.postures`, written before the first probe
ran.

| dimension          | declared                                                                                                    |
| ------------------ | ----------------------------------------------------------------------------------------------------------- |
| scan               | **SCALAR**. WebAssembly 1.0 has no `v128` and K-9 forbids the toolchain that emits one. **SIMD was NOT TESTED** — a gap in the evidence, not a claim. |
| terminals          | **IN THE MODULE**: `SCAN` · `LIT` · `NUM` · `DIGITS` · `TEXT` · `KW` · `DISPATCH` · `END` decide in Wasm, over one u16 per code unit and ONE class table shared byte-for-byte. |
| numerals           | **IN THE MODULE**: OP-03's decimal→f64 is the same double-double sequence against the same 10^k bytes.        |
| σ (§2.2)           | **IN LINEAR MEMORY**: offset, error flag, the three journals, depth, cut and the farthest-failure record have ONE home; every mutation crosses the boundary, so the crossing is paid and therefore measurable. |
| parse structure    | **JS COMBINATORS IN BOTH LOWERINGS**. NC-1 pre-kills the derived-interpreter posture by citation (`W2.md` §3c); a Wasm re-implementation of the parse graph is that posture at one remove. |
| value arena        | **NONE.** `V` is materialized on both sides through the shared `R_ctor` shape descriptor.                     |

**The consequence, stated first because it is what `.h` needs.** EQ-1..EQ-6 against AC-3 discriminate
the **terminal layer**, the **numerals**, the **journals** and the **rollback arithmetic** — not two
independent readings of the combinator structure. A green G-3 here is a **narrower fact** than a green
G-3 on a candidate whose two lowerings are independent implementations. The seat says so before
printing the zeros, not after.

---

## B. The four predicted failure modes, probed FIRST (§5 `.d/.e/.f`: "probed FIRST, results pasted")

`ALGEBRA.md` §12 AC-3 names four. All four were probed before the gate suite was run, and all four
are dispositioned with a number. Evidence: `evidence/p1..p6-*.txt`.

### (a) token-boundary divergence at the juxtaposition rows and numeric edges — **NOT OBSERVED**

`probes/p2-token-boundary.mjs`, 17 rows (`juxtaposition` · `numeric-edge` · `r6-bare-number` ·
`unsound-accept`), two legs:

- **leg 1** — js vs wasm on all six products: **0 divergences over 17 rows**.
- **leg 2** — the fused scan against a **counterfactual maximal-munch pre-pass** built from the SAME
  class table: **0 provenance spans split a token the pre-pass would have drawn; 0 straddle two or
  more**. The three adjudicated rows, with both readings printed:

```
s0189  "rgb(50%20%30%)"   ok=true  V={"space":"rgb","channels":[127.5,51,76.5],"alpha":1}   lexer: "rgb" "(" "50" "%" "20" "%" "30" "%" ")"
s0190  "rgb(1.5.5 3)"     ok=true  V={"space":"rgb","channels":[1.5,0.5,3],"alpha":1}       lexer: "rgb" "(" "1.5" ".5" " " "3" ")"
s0191  "hsl(120 50%50%)"  ok=true  V={"space":"hsl","channels":[120,0.5,0.5],"alpha":1}     lexer: "hsl" "(" "120" " " "50" "%" "50" "%" ")"
```

The fused span algebra and a token stream over the same table are the **same reading** on the rows the
prediction named. `1.` and `1e400` (`s0184`, `s0185`) likewise: identical across the lowerings, and
`rgb(1e400 0 0)` is accepted with `Infinity` reaching the `finite-color` guard exactly as §4.2 writes.

### (b) short-string inversion (per-leg print) — **NOT OBSERVED as an inversion**

`probes/p3-short-string.mjs`, 8 legs × both lowerings, 3 interleaved rounds, one **forked process per
cell**, 40 rounds × 2,000 parses, first 10 discarded. `BAR: OWNER-GATED-PENDING-RATIFICATION`.

**Three runs pasted** (`W2.md` §3e Stage 4's two-run rule, exceeded on purpose — see below):

| leg          | run 1 ÷ | run 2 ÷ | run 3 ÷ | run 3 js ns | run 3 wasm ns |
| ------------ | ------- | ------- | ------- | ----------- | ------------- |
| accept  4 B  | 1.387   | 1.230   | 1.014   | 878.7       | 891.2         |
| accept 10 B  | 1.286   | 1.073   | 0.943   | 1761.1      | 1660.0        |
| accept 13 B  | 1.214   | 1.025   | 0.779   | 318.7       | 248.4         |
| accept 18 B  | 0.904   | 0.899   | 0.719   | 3008.2      | 2163.5        |
| accept 78 B  | 1.174   | 1.170   | 1.099   | 8190.6      | 8999.8        |
| reject  4 B  | 1.390   | 1.337   | 1.850   | 529.5       | 979.5         |
| reject  8 B  | 0.989   | 1.054   | 1.314   | 1296.3      | 1703.0        |
| reject 30 B  | 0.862   | 1.053   | 1.207   | 1273.7      | 1537.2        |

The ordering does **not** flip with length in any run: 4 B against 78 B reads 1.387 / 1.174 (run 1),
1.230 / 1.170 (run 2), 1.014 / 1.099 (run 3). Legs favouring wasm: **3 · 1 · 3** of 8.

**A third run was taken because the first two disagreed by more than the effect under test**, and the
disagreement is the more useful finding: the `accept 18 B` cell moved 0.904 → 0.899 → 0.719 and
`reject 4 B` moved 1.390 → 1.337 → 1.850 with nothing changed but the clock. The box is shared by four
tracks. **Predicted failure (b) is NOT OBSERVED as an inversion, and this instrument could not have
resolved a length effect smaller than its own run-to-run spread** — which is the honest limit of the
reading, stated rather than hidden behind a median. `evidence/p3-short-string.txt` holds run 3.

### (c) the boundary eats the win (§12's ≥ 20 % Stage-0 screen) — **SCREEN NOT HIT**, and `.g`'s figure corrected

`probes/p1-boundary-cost.mjs`, discharging **R-g1** (the re-measure charge). 3 invocations × **5 forked
processes** × 40 rounds × 20,000 calls, first 10 rounds discarded.

**This seat's first form of the probe was wrong and is recorded as wrong.** It timed a wasm scan leaf
against a JS scan leaf and called the difference the boundary cost, which read **negative** (the wasm
scan is faster than the JS scan by more than the crossing costs). That is a fact about two scans, not
about a boundary. The corrected probe times an export that does nothing but return a constant against
a JS function that does nothing but return a constant — the crossing, and nothing else:

| run   | budget  | provenance                              | inv 1 | inv 2 | inv 3 | screen |
| ----- | ------- | --------------------------------------- | ----- | ----- | ----- | ------ |
| run 1 | 55.6 ns | X.P.W1's 2026-09-17 re-measure, UNARMED | 2.2 % | 2.0 % | 1.9 % | 20 %   |
| run 1 | 93.9 ns | INBOX O-15 PT-03, UNARMED               | 1.3 % | 1.2 % | 1.1 % | 20 %   |
| run 2 | 55.6 ns | X.P.W1's 2026-09-17 re-measure, UNARMED | 2.0 % | 1.3 % | 1.9 % | 20 %   |
| run 2 | 93.9 ns | INBOX O-15 PT-03, UNARMED               | 1.2 % | 0.8 % | 1.1 % | 20 %   |
| run 3 | 55.6 ns | X.P.W1's 2026-09-17 re-measure, UNARMED | 1.6 % | 1.6 % | 1.3 % | 20 %   |
| run 3 | 93.9 ns | INBOX O-15 PT-03, UNARMED               | 0.9 % | 1.0 % | 0.8 % | 20 %   |

**1.3 – 2.2 %** across three runs on the smallest (most kill-prone) budget; the worst invocation of any
run leaves a margin of **17.8 points**, and unlike §B(b) this reading is stable across runs. Beside it,
leg B — the real leaf on both sides — reads wasm **4.4 – 9.6 ns** against js **16.0 – 42.5 ns** per
call: the class scan is **faster** in the module than in JS by more than the crossing costs, which is
why the first form of this probe read a negative number. `evidence/p1-boundary-cost.txt` holds run 3.

**The discrepancy with `.g` is named, not averaged.** X.P.W2.g admitted AC-3 at 14.5 / 17.9 / 18.1 %.
That figure and this one measure different things — `.g`'s subject performs the leaf's work, this one
performs only the crossing. Both are below the screen; `.h` should read them as two different
quantities, and this seat does not claim `.g`'s is wrong.

### (d) arena latch (K-6) — **NOT OBSERVED**

`probes/p4-arena-latch.mjs`, 100,000 parses, four legs:

| leg                                          | reading                                                                               |
| -------------------------------------------- | ------------------------------------------------------------------------------------- |
| result invariance (parse 10 / 100 / 1k / 10k / 100k vs parse 1) | **identical on all seven product parts at every checkpoint, both lowerings** |
| watermark invariance (the module's journal + label bumps)       | **flat at 352 B from parse 1 to parse 100,000**                            |
| reset exactness                               | 352 B → `reset()` → **0 B**; the next parse reproduces parse #1 **identically** and returns the watermark to 352 B |
| the reject leg's decay, 5 × 10,000 rejects     | run 1 js **10.96 · 18.23 · 13.50 · 3.86 · 16.02** · wasm **11.56 · 14.49 · 12.43 · 10.80 · 2.92** B/parse · run 2 js **10.06 · 17.96 · 15.91 · 5.03 · 16.38** · wasm **12.45 · 6.98 · 11.18 · 4.35 · 12.23** — see **F-f3** |

---

## C. Stage 2 — the bijection, printed BEFORE any timing

`node harness/w2/op-bijection.mjs --candidate ac3` → **GREEN — 22 rows, both lowerings, fingerprints
pairwise equal**, `DECLARED-ABSENT wasm symbols 0`. Full mapping in `evidence/g2-bijection.txt`; every
Wasm symbol names the module function that realizes the row, and where a row is realized partly in the
module the symbol says so (`wasm:mark+rollback/wCompileAlt`) rather than claiming the whole row.

Zero throws over the slice + R1 + 30,000 fuzz corpus: G-5 GREEN both lowerings
(`0/172 + 7/7 boundary`), and G-3's differential ran 30,527 rows without a throw inside the algebra.

---

## D. Stage 3 — the six products and the five laws

```
⟨cmd⟩ node harness/w2/eq-six.mjs --candidate ac3 --corpus experiments/w2/corpus/slice.json \
        --fuzz-seed experiments/w2/corpus/fuzz-seed.json
      EQ-1 0 · EQ-2 0 · EQ-3 0 · EQ-4 0 · EQ-5 0 · EQ-6 2035 (first: s0180 "var(--brand)")
      rows compared 30527 · label indices aligned true · third-cell differences 236 (12 declared)
⟨cmd⟩ node harness/w2/recovery-laws.mjs --candidate ac3
      TRY sites 2946 · R-LAW-1 mismatches 0 · R-LAW-2 COMP-1 failures 13 · R-LAW-4 amplified 0 ·
      R-LAW-4 zero-width 0 · R-LAW-3 silent          (identical readings for js and wasm)
```

**EQ-1 through EQ-5 are ZERO over 30,527 rows**, and `R-LAW-1` is zero over **2,946** TRY sites per
lowering. The numeric half of that is constructional rather than lucky: `probes/p5-number-agreement.mjs`
runs **6,451** numerals (32 harvested from `slice.json` + `r1.json`, the rest generated hard cases —
subnormals, the overflow boundary, 17–20 significant digits) through both lowerings and reads
**bit-identical on all 6,451 under `Object.is`**.

**EQ-6's 2,035 is not a divergence between the lowerings.** Both lowerings' tilings fail COMP-1 on the
same 2,035 rows, for the same reason, and the reason is the contract's — **F-f1**, below.

---

## E. The library lock — the scan union is a citizen, not a fork

`W2.md` §5 `.f`: *"the library's own test suite stays green on the branch or the union is a fork, not
a citizen"*. The fresh root's base is **not green** — it is missing gitignored `data/` fixtures and two
devDependencies — so the lock is read as **no regression against the measured base**, and the base is
measured rather than asserted.

```
⟨cmd⟩ cd typescript && npx tsc --noEmit
      6 diagnostics, ALL pre-existing: src/parse/ansi.ts ×3 (TS2580 `process`), src/parse/debug.ts ×1
      and src/parse/parser.ts ×2 (TS2584 `console`) — plus test/benchmarks/* (TS2307 arcsecond,
      chevrotain). NOT ONE names scan.ts, state.ts, index.ts or core.ts.
⟨cmd⟩ npx vitest run --reporter=json
      Test Files 8 failed | 18 passed (26) · Tests 2 failed | 213 passed | 2 skipped (217)
      the 8, by cause: ENOENT ../data/csv/data.csv · ENOENT ../data/json/data-l.json ·
      ENOENT ../data/json/data.json · "No test found in suite" (verify-parse-output) ·
      Cannot find module ajv/dist/2020.js · `bench()` is only available in benchmark mode ×3
      NOT ONE names a file this branch touches.
⟨cmd⟩ git show HEAD:typescript/src/parse/state.ts | diff - typescript/src/parse/state.ts
      222a223,228  — three names appended to `parserNames`, nothing removed
⟨cmd⟩ git show HEAD:typescript/src/parse/index.ts | diff - typescript/src/parse/index.ts
      8a9,13       — one export block added
⟨cmd⟩ git show HEAD:typescript/src/parse/core.ts | diff - typescript/src/parse/core.ts
      25a26,39     — one export block added
```

The branch's whole change to the library is **one new file** (`typescript/src/parse/scan.ts`) and
**three append-only edits**. Nothing is deleted, nothing is rewritten, and `scan.ts` is reached the way
every other primitive is: `scanClass` · `takeClass` · `foldedLiteral` are `Parser`s with a real
`ParserContext`, registered in `parserNames`, so the structural walks and the debug printer see them.
G-11 reads **`DIGITS, DISPATCH, KW, LIT, SCAN, TEXT`** as algebra leaves in **both** lowerings.

---

## F. Declared encodings (each with the cite it answers, and what it costs)

| id      | what                                                                                                          | why, and what it costs                                                                                                                                                                                                            |
| ------- | ------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **E-1** | §10.3's `sync-rule` is written with bare `SCAN`/`LIT`, which INV-OWN (§2.4) forbids; encoded through `DROP`.    | Identical under discard — `RECOVER` truncates whatever `sync` journals. The walk then reads **0** unowned spans instead of 4. Cost: the term tree is one node deeper than §10.3's letter at four sites.                             |
| **E-2** | `DISPATCH`'s arms ride the node's ARGUMENT LIST after its two registry arguments.                              | An arm parked in a registry is a term no walk sees, which is the one thing the no-CST discriminator cannot afford. Cost: `R_disp` rows and arg positions must stay in the registry's key order — asserted by the lookup's ordinal.  |
| **E-3** | §10.3's `important` is carried as `PURE true` against `PURE false` inside the two OPT arms.                     | §10.3's own words are "whether the OPT arm matched", and both arms are `Unit`; this is the only encoding in the 22 that makes the fact a value. Cost: none measured.                                                                 |
| **E-4** | **EQ-5's sixth coordinate is 0 in BOTH lowerings.**                                                            | §2.2 defines it as *"the value-arena watermark"*, and this posture has no value arena — `V` is materialized through the shared `R_ctor` descriptor on both sides. The module's own bump high-water is reported by `arenaHighWater()` (352 B), which is a different quantity. **See F-f4: read the other way, EQ-5 is unsatisfiable by construction.** |
| **E-5** | §10.1's `DROP keyword` over `balanced-tail`'s bytes and §10.2's ALT order are **SHIPPED AS WRITTEN**.           | FF-5: a candidate that edits the contract to pass has produced a finding and then hidden it. The first is **F-f1** (2,035 rows); the second makes `linear(...)` unreachable and was confirmed on 3 slice rows. Neither is repaired here. |
| **E-6** | The input is marshalled one **u16 per JS code unit**; diagnostic text is read back from the ORIGINAL string by span. | R-d1. A lone surrogate or any non-ASCII unit therefore cannot drift between the cells: the module never reconstructs a string. Cost: a u16 load per position instead of a byte load. Declared cap **1,048,576** code units; the longest corpus row is **50,008** (`s0526`). |

---

## G. Kill rules, each with its measurement

| rule     | reading for AC-3                                                                                                                                                               |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **K-1**  | **NOT HIT on EQ-1..EQ-5** — 0 divergences over 30,527 rows. EQ-6's 2,035 rows fail COMP-1 **identically in both lowerings**; it is not a divergence between them (**F-f1**).       |
| **K-2**  | **NOT HIT** — `grep -rnE "isWasm\|target\s*===\|TARGET_JS\|TARGET_WASM"` over all 17 declared sources: **0**. The algebra imports neither lowering (G-1's import check GREEN).      |
| **K-3**  | **NOT HIT** — 22 of 22 rows carry both lowerings; `DECLARED-ABSENT wasm symbols 0`.                                                                                              |
| **K-4**  | **NOT HIT** — `RECOVER` is OP-21, a registry row with both symbols; its sync runs under discard in both.                                                                          |
| **K-5**  | `.h`'s to read. This seat prints legs, sets no bar and makes no speed claim outside §B(b)'s table.                                                                                |
| **K-6**  | **NOT HIT** — §B(d): result byte-identical at every checkpoint to 100,000 parses; watermark flat at 352 B; `reset()` → 0 B with no residue.                                        |
| **K-7**  | **NOT HIT** — the deep-nesting row (`s0526`, 10,000 nested `var(`) returns `ok:false` with 1 issue in BOTH lowerings from `Θ.depthBound = 64`. No try/catch shield exists to prove non-load-bearing: there is none in either lowering. |
| **K-8**  | **NOT HIT** — 0 throws over 172 R1 rows + 7 non-strings, both lowerings, and 0 inside the algebra over 30,527 differential rows.                                                   |
| **K-9**  | **NOT HIT** — `meta.build.jsArtifactReproduction` is `node experiments/w2/ac3-span/build.mjs`: `npx tsc` then `node`. The Wasm bytes are assembled by a JavaScript assembler (`lowering-wasm/asm.mjs`) that **cannot emit an import section**. No cargo, rustc, wasm-pack, wat2wasm, binaryen or emcc. |
| **K-10** | **NOT HIT** — the audit digests the evidence root's 3 uncommitted `wasm32` working-tree files and finds **0** declared wasm source byte-identical to any of them. Committed `wasm32` under `rust/parse_that`: **0** (OP-6 holds). |

**The seat does not kill its own candidate**, and it does not rescue it either: four of nine gates read
RED and every one of the four is named below with its cause outside AC-3.

---

## H. Gate readings, BEFORE → AFTER

| gate     | BEFORE (born-RED, `W2.md` §6)                                        | AFTER                                                                                                                                                                       | verdict     |
| -------- | -------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| **G-1**  | both `ALGEBRA.md` ABSENT; no candidate walk                          | contract half GREEN (homes sha256-equal, 22 = 22, 0 target-conditionals in the contract and in all 17 declared sources). Structural half, both lowerings: `ops∉22 0 · recover≺alt 0 · cut∉alt 2 · unowned-span 0 · closure-leak 0` | **RED** — **F-f2** |
| **G-2**  | script ABSENT; op count 0                                            | 22 rows, both lowerings, fingerprints pairwise equal, 0 DECLARED-ABSENT                                                                                                        | **GREEN**   |
| **G-3**  | no second lowering exists; 0 comparisons                             | 30,527 rows · EQ-1 **0** · EQ-2 **0** · EQ-3 **0** · EQ-4 **0** · EQ-5 **0** · EQ-6 **2,035** · labels aligned · third cell 236 (12 declared)                                    | **RED** — **F-f1** |
| **G-4**  | 0 probes exist                                                       | TRY sites **2,946**; R-LAW-1 **0** mismatches; R-LAW-3 **silent**; R-LAW-4 **0** amplified / **0** zero-width; R-LAW-2 **13** COMP-1 rows                                        | **RED** — **F-f1** |
| **G-5**  | published `parseCssColor` throws 102/172 + 7/7                       | **0/172** throws and **7/7** boundary rejections carrying ≥1 diagnostic, ×3 productions × 2 lowerings                                                                            | **GREEN**   |
| **G-8**  | `PACKRAT_ARMED` 93.9 → 138.2 ns = 1.47×, reset leaves 139.3           | history drift (warmed, the verdict leg) js **0.933×** · wasm **1.111×** (envelope 0.80–1.25); steady-state heap **−7.7** / **−20.8** B/parse; reset residue **0.928×** (re-run 0.369×); arena high-water **352 B**; DM-1 freeze its own leg; **reject leg js 18.8 · wasm 17.3 B/parse** | **RED** — **F-f3** |
| **G-9**  | no module exists; committed `wasm32` 0                               | imports **0** over all kinds · `{}` by kind · sections `type, function, memory, export, code, data` · **no start section** · 32 exports enumerated · `memory.grow` **0** (6,291,456 B before and after 2,000 parses) · K-9 clean · K-10 clean | **GREEN**   |
| **G-10** | no artifact; 24 public `Parser` methods at the clone point           | graph nodes walked **1,973** · `opt` under `all` **0** · `lazy` **0** · memoize **0** · all five textual zeros **0** over 11 declared files · excess-property `tsc --noEmit --strict` fixture **PASSES** | **GREEN**   |
| **G-11** | `Parser.lazy` deepest OK 7,761, RangeError at 7,762; census 13:0:0    | the deep-nesting row returns `ok:false` with 1 issue in **both** lowerings from a constructed bound; scan primitives as algebra leaves in both: `DIGITS, DISPATCH, KW, LIT, SCAN, TEXT` | **GREEN**   |

`lazy = 0`, not ≤ 1: the back-edge is **OP-22 `REF`**, an operator with `Θ.depthBound` on it, so the
candidate needs no `lazy` node at all. That is a stronger reading of G-10's rule than the rule asks
for, and it is stated rather than left to be inferred from a zero.

---

## I. Findings for `.h`

| id        | severity                       | finding                                                                                                                                                                                                                                                                                                                                                                                                                              |
| --------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **F-f1**  | **MAJOR — §3a trigger ARMED**  | **The COMP-1c `keyword` defect, reproduced a THIRD time at the same number.** `2,035` rows / `2,047` occurrences, **all** COMP-1c, **all** `kind 'keyword'`, all `P:color`; by family: `var-context 4 · ground-a-guarded 9 · fuzz-wellformed 1,262 · fuzz-malformed 760`. Cause: §10.1's `balanced-tail := REP(ALT[SEQ[TOK"(", REF balanced-tail, TOK")"], DROP keyword (SCAN any-but-paren 1 ∞)], 0, ∞)` labels arbitrary `var()` argument bytes `keyword`, and §4.5's π_keyword is `/^[A-Za-z][A-Za-z0-9_-]*$/`, which `--brand` fails at byte 4. Identical to `.d`'s and `.e`'s numbers. **`W2.md` §3a's trigger is "G-3 red on the SAME product for all three admitted candidates" — it is now armed, on EQ-6, at 2,035.** |
| **F-f2**  | **MAJOR — for `.h`**           | **`.d`'s F-2 reproduced at a DIFFERENT count, and MEASURED.** `cut∉alt` reads **2** here (`.d` **7**, `.e` **0**) — so the number measures the ENCODING, not the contract, and `.h` should not read the three as disagreeing. Both sites are §10.3's own text (`qualified-rule`'s and `declaration`'s `CUT`, reached only through `REP`/`RECOVER`, which §5.2 calls scope-openers and OP-10 calls a walk error). `probes/p6-inert-cut.mjs` **measures** `.e`'s "inert" claim rather than repeating it: a variant grammar with exactly those two nodes removed produces **identical `ok`, `V`, `C`, `P`, `D` and `recoveries` over all 30,527 rows**, and identical mark ARITHMETIC (the 7,716 verbatim `marks` differences are the walk renumbering the deletion causes). **The `CUT`s are inert in fact.** A construct that changes nothing and is a walk error by the contract's own rule is a defect either way; `.h` now has both lawful readings and the number. |
| **F-f3**  | **MAJOR — for `.h` and `.g`**  | **`.d`'s F-4 and `.e`'s F-e8 reproduced.** G-8 scores the reject path against an exact zero with an instrument whose draw-to-draw spread, on the SAME subject, is **js 3.86 – 18.23** and **wasm 2.92 – 14.49** B/parse over five consecutive 10,000-reject windows, reproduced in a second invocation at **js 5.03 – 17.96** and **wasm 4.35 – 12.45** (`probes/p4-arena-latch.mjs` leg 4, both runs in `evidence/p4-arena-latch.txt` and above). The gate's single reading (js 18.8 · wasm 17.3) is one draw from that, and it is the TOP of the range both times. **This seat did not re-run for a greener number.** Note the asymmetry with `.e`: its wasm leg read 0.019 B/parse because its wasm lowering does not materialize `marks` as JS objects; this one does, in both lowerings, because the `<Lowering>` contract requires `marks` and an armed/unarmed split is the PACKRAT shape O-8 forbids. |
| **F-f4**  | **MAJOR — for `.h` and the owner** | **EQ-5's sixth coordinate is unsatisfiable for any candidate whose Wasm lowering keeps a value arena.** §2.2 L238 defines it as *"the value-arena watermark; the JS lowering reports 0"*, and EQ-5 byte-compares the whole mark tuple ACROSS the lowerings (`serializeMarks`, `.g`'s serializer). A nonzero Wasm watermark against a JS lowering the contract **fixes at 0** is therefore a guaranteed K-1 kill on every row that takes a mark after any allocation. AC-3 escapes only because its declared posture has **no value arena** (E-4). This is structural, not measurable away: either the coordinate is dropped from the cross-lowering comparison, or it is redefined as something both lowerings can report (a logical cell counter — which is, independently, what `.e` declared). |
| **F-f5**  | INFO — for `.g`                | G-10's `.parse(` textual zero is `/\.parse\s*\(/`, which counts **`JSON.parse(`**. Measured in-seat: 1 hit at `algebra/grammar.mjs:265`, a JSON round-trip, not a parse-that truthiness entry. A seat that uses `JSON.parse` anywhere in a declared algebra source reads RED for a non-defect. Reported rather than dodged; this seat then removed the round-trip for the independent reason in **F-f6**. |
| **F-f6**  | INFO — for `.g` and `.h`       | **A JSON round-trip is NOT a CL-1 test for the SHARING half.** `JSON.parse(JSON.stringify(x))` silently un-shares repeated references, so a term object used at two grammar sites passes the round-trip and then fails the harness's closure walk (which reports a second visit as a `cycle`). Measured in-seat: replacing the round-trip with a path-naming data walk plus `structuredClone` surfaced a shared `UNIT_LIT` object the round-trip had been masking — `closure-leak 0 → 2 → 0` once cured at the root (the literal is now a factory). Any seat that "proves CL-1 by round-trip" has proved only half of it. |
| **F-f7**  | MINOR — this seat's own defect, CURED | The double-double helpers computed an error term for a **non-finite head**, so `∞ + (−∞)` inside the correction returned **NaN** for a value that is `±∞`: `1234567890123456789e308` read `NaN` where `Number()` reads `Infinity`. Cured at the root in **both** lowerings (`ddMulD`/`ddMulDD` return `[p, 0]` when the head is not finite) and re-measured: host differences **37 → 35** of 6,451, and the two lowerings stayed bit-identical across the change. Found by `probes/p5-number-agreement.mjs`, which exists because `arith.mjs` declared the distance and promised to measure it. |
| **F-f8**  | INFO — for `.h`                | **`.g`'s Stage-0 screen figure and this seat's measure different quantities.** `.g` admitted AC-3 at 14.5 / 17.9 / 18.1 % of budget; the corrected re-measure reads **1.9 – 2.2 %**. `.g`'s subject performs the leaf's work as well as the crossing; this one performs only the crossing. Both are below the 20 % screen, so nothing turns on it — but they must not be averaged, and R-g1's charge is discharged with the difference named rather than with a second number laid beside the first. |
| **F-f9**  | INFO                           | OP-03's shared routine differs from the host's `Number()` on **35 of 6,451** numerals (0.543 %): 4 normal (worst **1 ULP**), 30 subnormal (worst **1 ULP**), 1 at the overflow boundary (`1.7976931348623158e308` → `Infinity` where `Number()` gives `MAX_VALUE`). That is the **declared cost of having one algorithm instead of two** — the price of making EQ-1's numeric leg constructional rather than hopeful, since the Wasm lowering has no host to call. The corpora carry no expected values (§3d), so this is a distance from the host, not an error against an answer key. |
| **F-f10** | INFO                           | §10.2's ALT order makes `linear(...)` **unreachable** (the `linear` keyword arm precedes the `linear(` dispatch arm), confirmed on 3 slice rows; `linear(0, 1)` reads `ok:false`. Independently reproduced — `.e` filed the same as F-7/F-e13. Shipped as written (E-5). |

---

## J. What this does not prove

- **SIMD was not tested.** WebAssembly 1.0 has no `v128` and K-9 forbids the toolchain that emits one.
  AC-3's thesis sentence — *"the identical tables under `v128` or scalar fallback"* — is verified only
  for the scalar half. The table's identity is verified: `CLASS_BYTES` is byte-compared between the JS
  lowering's array and the module's data segment.
- **EQ-1..EQ-6 here does not test two independent readings of the combinator structure** (§A). It tests
  the terminal layer, the numerals, the journals and the rollback arithmetic. That is the honest scope
  of the six zeros.
- **The fuzz corpus is 30,000 rows of a generator `.g` wrote**, not the language. A defect neither the
  slice nor that generator reaches is invisible here.
- **No bar is set and no ranking is implied.** K-5 and the adjudication are `.h`'s.
