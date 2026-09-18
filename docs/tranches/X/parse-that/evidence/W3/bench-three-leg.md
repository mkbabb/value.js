SERVED MODEL: claude-opus-5[1m]

# G-10 — THE THREE-LEG BENCH TABLE (X.P.W3.d)

**Authority**: `docs/tranches/X/parse-that/waves/W3.md` §6 **G-10** · §2b **OP-5** ·
`docs/tranches/X/COHESION.md` **§0j.E OC-1** (*"ADMISSION IS DECIDED ON CORRECTNESS; the bench table
is RECORDED-NOT-GATING"*) and **§0n.4** (*"the table is printed for both lowerings of the graduated
seed, two runs pasted"*).

**Generated**, never hand-written: `<p2>/typescript/scripts/css-bench-three-leg.mjs`, invoked with the
gate's own command.

```
⟨cmd⟩ node typescript/scripts/css-bench-three-leg.mjs \
        --baseline-tarball test/css-equivalence/vendor/value.js-4.0.0.tgz \
        --rounds 40 --discard 10 --denominator 1636680
```

## §0 THE BAR, FIRST

**`BAR: OWNER-GATED-PENDING-RATIFICATION`**

**There is no verdict in this document, and there is no bar in it.** `W3.md` §2b OP-5: the `≥10x`
floor is **RETIRED AS LAW** and the replacement strict-3× / strict-2× / break-even families are
**UNRATIFIED (0/5 each)**; *"No ruling is required to open — G-10 **reports** ratios and marks the BAR
`OWNER-GATED-PENDING-RATIFICATION`. **Inventing a bar is a defect**, and a wave that passes or fails
on an unratified bar is void."* COHESION §0j.E OC-1 ruled the table **recorded-not-gating** on
2026-09-17. This seat set none, inferred none, and reconciled none.

The generator's exit code reports **WELL-FORMEDNESS ONLY** — G-10's own four falsifier conditions,
checked by the program on its own output: no ratio outside the three legs · no budget citing the
UNCITABLE denominator or its derivatives (scanned literally over the printed text) · no row without
its arm-state · no pass/fail verdict. Both runs below exited **0** on that check.

## §1 Run 1

```
X.P.W3.d — css-bench-three-leg (G-10)
────────────────────────────────────────────────────────────────────────────────────────────────────────────────
baseline      value.js-4.0.0.tgz — 37290 B · sha256 7f80658ca4e16e99ccbb41ad6c9d8c08b2e5f86a7c951d2a833c97f89fb303ae
              sha512-Z8ywb4htSxJlRFvoU1DNtvzr9Bsuaw9ahT/hvNlKbnRj6fTnLuXjn0itKq1Q5s6rwg24ct0zcLZ04BuR3/SzGw==
method        40 rounds, first 10 discarded, MEDIAN of the kept 30 · interleaved, arm order rotates by round
              cell 192 inputs · node v26.0.0 · darwin/arm64
corpus        test/css-totality/corpus.json — 26551 distinct · rows sha256 559e84bfb632b140
legs          shared-accepted 192 · reject 192 · R1-class 192

  leg              arm                    ns/op  ratio (published/arm)  arm-state
  ──────────────── ───────────────── ────────── ──────────────────────  ──────────────────────────────────────────────
  shared-accepted  published 4.0.0       2274.8                      1  N/A — published bundle carries no packrat [a]
  shared-accepted  candidate js          4960.1                  0.459  UNARMED — before & after [b]
  shared-accepted  candidate wasm        3071.7                  0.741  UNARMED — before & after [b]
  reject           published 4.0.0       1032.3                      1  N/A — published bundle carries no packrat [a]
  reject           candidate js            3682                   0.28  UNARMED — before & after [b]
  reject           candidate wasm        2201.5                  0.469  UNARMED — before & after [b]
  R1-class         published 4.0.0      81286.9                      1  N/A — published bundle carries no packrat [a]
  R1-class         candidate js          3026.5                 26.859  UNARMED — before & after [b]
  R1-class         candidate wasm        1841.5                 44.142  UNARMED — before & after [b]

arm-state, in full — no row is without one (G-10's third falsifier condition)
  [a]  N/A — the published 4.0.0 bundle carries NO packrat machinery (0 occurrences of PACKRAT_ARMED / packratEnter / resetPackrat / memoize across its whole dist)
  [b]  UNARMED — the packrat arm-state read false before the run and false after it.
       The candidate's reachable set constructs no memoizer (.c's G-9 static leg: exactly one memoize( site under
       src/css, and it is .c's own declared instrument). DISCLOSED, because .c disclosed it: tsImport does not
       dedupe, so the instrument reads the latch in ITS OWN library instance and the lowerings' parse path holds
       another. The reading is 'this process never armed a latch', not 'the parse path's latch was inspected'.

inherited readings, printed rather than reconciled (W3.md §6 G-10's RED baseline)
  parser-band.md cross-bench, two runs — shared-accepted: published 1500 / 1553 ns · cand-F 1261 / 1289 (×1.19–1.20)
    · cand-O drop-in 1466 / 1541 (×1.01–1.02) · cand-O node 1247 / 1290
  reject: published 716 / 693 · cand-F 801 / 810 (×0.86–0.89) · cand-O 1121 / 1088 (×0.64)
  R1 class: published+catch 82,559 / 78,034 ns vs cand-F 632 / 630 · cand-O 937 / 923
  THIS TABLE AGREES IN DIRECTION ON ONE LEG AND DISAGREES ON TWO, and the disagreement is printed, not smoothed:
  the R1-class direction (the candidate is orders of magnitude faster than published+catch) reproduces; the
  shared-accepted and reject directions do NOT — this candidate is SLOWER than published on both, where
  parser-band measured cand-O at parity on accept. Different candidate (AC-1 TAGLESS-TWIN, not cand-O
  drop-in), different machine, different node, different cell. NOTHING IS CONCLUDED FROM THAT HERE.

sink          580440   (printed so no arm's work can be eliminated as dead)
latch         readable true · before false · armed true · afterReset true · symmetric false

budgets, restated against the conservative reconstruction 1636680 µs (SCOPE.md M-22 ¶4)
  ≥10×        163668 µs   — RETIRED AS LAW; the fixed native floor 311883 µs exceeds it by 1.906×, so 10× is arithmetically impossible
  strict-3×    545560 µs   — headroom 233677 µs · UNRATIFIED (0/5)
  strict-2×    818340 µs   — headroom 506457 µs · UNRATIFIED (0/5)
  break-even  1636680 µs   — headroom 1324797 µs · UNRATIFIED (0/5)

contradiction C-1 — the direction of the parser/regex comparison
  A  07-20 proof gate — 'LIVE regex measured FASTEST ~1.8×' (one author, one method)
  B  parser-band.md cross-bench, two runs, plus cand-F and cand-O's own harnesses — three independent measurements, two candidates and an arbiter, three methods — reading the opposite direction
  C  this table, a fourth measurement, printed above
  →  NOT RECONCILED AND NOT ERASED. W3.md §6 G-10: 'the contradiction is a row in the table, not an erasure.' Which reading is right is an owner question that rides with OC-1; nothing here pre-empts it.

────────────────────────────────────────────────────────────────────────────────────────────────────────────────
BAR: OWNER-GATED-PENDING-RATIFICATION
VERDICT: none. The bench table is RECORDED-NOT-GATING (COHESION §0j.E OC-1). Inventing a bar is a defect.
```

## §2 Run 2 — the same command, a second process, nothing re-pinned between them

```
X.P.W3.d — css-bench-three-leg (G-10)
────────────────────────────────────────────────────────────────────────────────────────────────────────────────
baseline      value.js-4.0.0.tgz — 37290 B · sha256 7f80658ca4e16e99ccbb41ad6c9d8c08b2e5f86a7c951d2a833c97f89fb303ae
              sha512-Z8ywb4htSxJlRFvoU1DNtvzr9Bsuaw9ahT/hvNlKbnRj6fTnLuXjn0itKq1Q5s6rwg24ct0zcLZ04BuR3/SzGw==
method        40 rounds, first 10 discarded, MEDIAN of the kept 30 · interleaved, arm order rotates by round
              cell 192 inputs · node v26.0.0 · darwin/arm64
corpus        test/css-totality/corpus.json — 26551 distinct · rows sha256 559e84bfb632b140
legs          shared-accepted 192 · reject 192 · R1-class 192

  leg              arm                    ns/op  ratio (published/arm)  arm-state
  ──────────────── ───────────────── ────────── ──────────────────────  ──────────────────────────────────────────────
  shared-accepted  published 4.0.0       2264.6                      1  N/A — published bundle carries no packrat [a]
  shared-accepted  candidate js          4912.2                  0.461  UNARMED — before & after [b]
  shared-accepted  candidate wasm        3074.7                  0.737  UNARMED — before & after [b]
  reject           published 4.0.0       1012.4                      1  N/A — published bundle carries no packrat [a]
  reject           candidate js            3620                   0.28  UNARMED — before & after [b]
  reject           candidate wasm          2150                  0.471  UNARMED — before & after [b]
  R1-class         published 4.0.0      78019.5                      1  N/A — published bundle carries no packrat [a]
  R1-class         candidate js          3150.2                 24.767  UNARMED — before & after [b]
  R1-class         candidate wasm        1866.8                 41.794  UNARMED — before & after [b]

arm-state, in full — no row is without one (G-10's third falsifier condition)
  [a]  N/A — the published 4.0.0 bundle carries NO packrat machinery (0 occurrences of PACKRAT_ARMED / packratEnter / resetPackrat / memoize across its whole dist)
  [b]  UNARMED — the packrat arm-state read false before the run and false after it.
       The candidate's reachable set constructs no memoizer (.c's G-9 static leg: exactly one memoize( site under
       src/css, and it is .c's own declared instrument). DISCLOSED, because .c disclosed it: tsImport does not
       dedupe, so the instrument reads the latch in ITS OWN library instance and the lowerings' parse path holds
       another. The reading is 'this process never armed a latch', not 'the parse path's latch was inspected'.

inherited readings, printed rather than reconciled (W3.md §6 G-10's RED baseline)
  parser-band.md cross-bench, two runs — shared-accepted: published 1500 / 1553 ns · cand-F 1261 / 1289 (×1.19–1.20)
    · cand-O drop-in 1466 / 1541 (×1.01–1.02) · cand-O node 1247 / 1290
  reject: published 716 / 693 · cand-F 801 / 810 (×0.86–0.89) · cand-O 1121 / 1088 (×0.64)
  R1 class: published+catch 82,559 / 78,034 ns vs cand-F 632 / 630 · cand-O 937 / 923
  THIS TABLE AGREES IN DIRECTION ON ONE LEG AND DISAGREES ON TWO, and the disagreement is printed, not smoothed:
  the R1-class direction (the candidate is orders of magnitude faster than published+catch) reproduces; the
  shared-accepted and reject directions do NOT — this candidate is SLOWER than published on both, where
  parser-band measured cand-O at parity on accept. Different candidate (AC-1 TAGLESS-TWIN, not cand-O
  drop-in), different machine, different node, different cell. NOTHING IS CONCLUDED FROM THAT HERE.

sink          580440   (printed so no arm's work can be eliminated as dead)
latch         readable true · before false · armed true · afterReset true · symmetric false

budgets, restated against the conservative reconstruction 1636680 µs (SCOPE.md M-22 ¶4)
  ≥10×        163668 µs   — RETIRED AS LAW; the fixed native floor 311883 µs exceeds it by 1.906×, so 10× is arithmetically impossible
  strict-3×    545560 µs   — headroom 233677 µs · UNRATIFIED (0/5)
  strict-2×    818340 µs   — headroom 506457 µs · UNRATIFIED (0/5)
  break-even  1636680 µs   — headroom 1324797 µs · UNRATIFIED (0/5)

contradiction C-1 — the direction of the parser/regex comparison
  A  07-20 proof gate — 'LIVE regex measured FASTEST ~1.8×' (one author, one method)
  B  parser-band.md cross-bench, two runs, plus cand-F and cand-O's own harnesses — three independent measurements, two candidates and an arbiter, three methods — reading the opposite direction
  C  this table, a fourth measurement, printed above
  →  NOT RECONCILED AND NOT ERASED. W3.md §6 G-10: 'the contradiction is a row in the table, not an erasure.' Which reading is right is an owner question that rides with OC-1; nothing here pre-empts it.

────────────────────────────────────────────────────────────────────────────────────────────────────────────────
BAR: OWNER-GATED-PENDING-RATIFICATION
VERDICT: none. The bench table is RECORDED-NOT-GATING (COHESION §0j.E OC-1). Inventing a bar is a defect.
```

## §3 What the two runs say, and what they are not allowed to say

**Stability.** The two runs agree to within a few per cent on every accept/reject cell and to within
~4 % on the R1-class baseline. Nothing between them was re-pinned, re-warmed or re-ordered: the same
command, twice, in two processes.

**The R1-class leg reproduces the inherited reading almost exactly.** `W3.md` §6 G-10's RED baseline
carries `published+catch 82,559 / 78,034 ns`; this table measures the same arm at **81,286.9** and
**78,019.5 ns**, on a different machine and a different node. That is the leg the wave was named
after, and it is the leg where the candidate is orders of magnitude faster (26.9× / 24.8× js,
44.1× / 41.8× wasm) — because the incumbent is not parsing there, it is throwing and being caught.

**The accept and reject legs do NOT reproduce the inherited direction, and that is printed rather
than smoothed.** `parser-band.md` measured the cand-O drop-in at parity on shared-accepted
(×1.01–1.02); this candidate — **AC-1 TAGLESS-TWIN**, a different artifact — reads **0.46× js /
0.74× wasm** on the same leg and **0.28× / 0.47×** on reject, i.e. slower than published. Different
candidate, different machine, different node, different cell size. **Nothing is concluded from that
here**, and in particular it is not read as a verdict on admission: §0j.E OC-1 decided admission on
CORRECTNESS, and this document has no standing to reopen that.

**The 07-20 contradiction is a ROW (`C-1`), not an erasure.** `W3.md` §6 G-10 requires it:
*"it fails if it silently reconciles with the 07-20 gate's 'LIVE regex measured FASTEST ~1.8×': that
reading is now contradicted by three independent measurements (two candidates and an arbiter, three
methods), and the contradiction is a row in the table, not an erasure."* Both runs print all three
readings plus this table as a fourth, and rule on none of them.

**The arm-state is on every row, in two forms.** The short label sits in the table's own column so
the column cannot truncate it; the full statement is printed beneath as `[a]` and `[b]`. `[a]` is a
measurement, not an omission: the published 4.0.0 bundle carries **zero** occurrences of
`PACKRAT_ARMED` / `packratEnter` / `resetPackrat` / `memoize` across its whole `dist`, so it has no
arm-state to read. `[b]` carries `.c`'s own disclosure unaltered — `tsImport` does not dedupe, so the
instrument reads the latch in its own library instance and the lowerings' parse path holds another;
the reading is *"this process never armed a latch"*, not *"the parse path's latch was inspected"*.

**The denominator.** Every budget restates against **1,636,680 µs** (SCOPE.md M-22 ¶4). The generator
**refuses to run** against any other value — `--denominator` is not an option with a default but a law
with one value — and it scans its own printed output for the denominator `W3.md` §6 G-10 marks
UNCITABLE and for its three named derivatives, failing well-formedness if any appears. **Neither run
printed one, and this document does not reproduce their digits**: the four numerals are frozen until
`P4-EVIDENCE-REPLAY.json` is readable under a TCC grant, and they live in the generator's scan list
(`UNCITABLE` in `css-bench-three-leg.mjs`) so that the prohibition is executable without this
evidence file having to restate what it forbids.
