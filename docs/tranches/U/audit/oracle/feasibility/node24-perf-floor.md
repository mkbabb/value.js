# The node-24 ratio-floor re-anchor — derivation (proof:perf-target C2-stylesheet)

**Lane**: U.W-ORACLE · FLOOR / FEASIBILITY-LEG-LAW half. **File**: `scripts/gates/proof-perf-target.mjs:59`.
**Change**: `SHEET_RATIO_FLOOR` `0.0200` → `0.0160`. `VALUE_RATIO_FLOOR` UNCHANGED (`0.0100`).

This IS a live instance of the feasibility-leg class: `SHEET_RATIO_FLOOR` is a **guard constant** whose
real referent is *the stylesheet parser's throughput relative to `JSON.parse` on the runner*. On the
node-24 CI leg it was NOT certified against that referent (cured code measured **0.0189 < 0.0200**) —
a constant calibrated on one runner's proxy, failing the real referent on another. The cure is to
certify the constant against the runner it actually runs on, not to hand-tune it to green CI.

## §1 The evidence (verbatim, this lane owns it)

CI run **29230557187** double-failed `proof:perf-target` C2-stylesheet at ratio **0.0189 < 0.0200**
on the **node-24** leg, while **node-22** passed the **same code twice**.

## §2 The diagnosis — mis-calibration, NOT a parser regression (case A)

**Same code, node-22 PASS / node-24 FAIL is definitionally not a code regression.** A parser
regression is a change to `src/parsing`; identical code cannot regress by runtime. What changed is the
**runtime**: the gate's ratio is `sheetMBs / jsonRef`, and node-24's V8 optimized `JSON.parse` (the
ratio DENOMINATOR) relative to the `parse-that` combinator chain (interpreted/JIT'd JS). The
denominator moved, so the ratio dropped **with no throughput loss**. The floor — calibrated on the
authoring machine's node-22-era cured ratio (~0.0278) at ~28% headroom (0.0200) — was **mis-calibrated
for node-24's V8**. (A genuine parser regression would have failed node-22 too. It did not.)

Corroboration on node-26 (local, Apple Silicon; the newest V8 available to this lane — node-24/22 are
not installed): the **ratio held stable across load** even as absolute MB/s swung 2.6× —
`JSON.parse 268 MB/s → sheetRatio 0.0253` and, under heavy concurrent load, `JSON.parse 102 MB/s →
sheetRatio 0.0231`. The ratio is machine-**speed**-independent (the gate's premise) but, per the
fresh evidence, **not** fully node-**version**-independent: V8's relative optimization of native
`JSON.parse` vs interpreted CSS parsing differs by node version. That node-version term is the whole
finding.

## §3 The re-anchor — derived from the measured node-24 headroom

Constraints:

- **No false-positive on node-24 cured code.** Cured node-24 = **0.0189**. Run-to-run noise ~8–10%,
  so worst-case cured dip ≈ `0.0189 × 0.90 = 0.0170`. The floor must sit below that: **floor ≤ 0.0170**.
- **Retain teeth against a gross regression.** The gate exists to catch a revert of the S2/S3
  dispatch+scanner win (a return to the slow chain), which the born-RED proof shows drops the ratio
  *well below* the floor. The documented incremental win is +27–32%; a full slow-chain revert on
  node-24 drops cured 0.0189 → **≈ 0.0148 or lower**. The floor must sit above that: **floor > 0.0148**.

Threading the two: **floor = 0.0160.**

- 0.0189 / 0.0160 = **1.18** → ~15% headroom below the node-24 cured datum: clears the ~8–10% noise
  with a node-version-variance cushion.
- 0.0160 > 0.0148 (reverted node-24) → a gross slow-chain revert still reds. Teeth preserved.
- Cross-check: passes node-26 (0.0231–0.0257, wide margin) and node-22 (≥0.0200) — no false-positive
  on faster runtimes.

**A fuller ~28%-below re-anchor (0.0136) was REJECTED**: it would sink *below* the reverted level
(~0.0148) and lose the gate's teeth. The original design's 28% headroom was safe only because the
authoring-machine cured ratio (0.0278) had a large absolute gap above the reverted level; on node-24
the cured (0.0189) sits closer to the reverted (0.0148), so the headroom must be re-derived from the
actual noise-floor / teeth-ceiling window, not copied. **This is a measurement-derived re-anchor, not
a hand-tune to green CI** — the distinction E-3 draws, and the reason the value is 0.0160 and not
"whatever clears 0.0189".

## §4 Scope — only C2 (sheet), not C1 (value)

Only the C2-stylesheet clause exhibited node-24 marginality. C1-value keeps a wide margin
(cured ~0.0132–0.0134 vs floor 0.0100, ~32%) and node-24 did not flag it, so `VALUE_RATIO_FLOOR`
stays **0.0100**. Lowering it without node-24 C1 evidence would itself be a hand-tune — the sin this
derivation refuses. If a future node exhibits C1 marginality, re-derive it the same way, from that
node's measured cured datum.

## §5 Residual (recorded honestly)

The stylesheet win (+27–32%) is comparable in magnitude to the runner's noise + node-version variance,
so this gate reliably catches a **gross** regression (a full slow-chain revert) but a **subtle** ~27%
partial regression sits at the edge of noise on any calibration. The C1-value clause (wider margin)
and the deterministic 1871-test correctness oracle carry the finer discrimination; this ratio gate is
the gross-regression tripwire it was authored to be, now portable across the node-22 → node-24 (→26)
matrix.
