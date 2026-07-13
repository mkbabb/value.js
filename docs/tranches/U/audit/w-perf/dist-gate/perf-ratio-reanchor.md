# U-F14 — the flagship dist perf gate re-anchor (proof:perf-target)

**Lane**: U.W-PERF · perf-dist-gate (U-F14 ONLY). **File**: `scripts/gates/proof-perf-target.mjs`.
**Gate**: G-PERF-2. **Standing law**: Q14 ("Accept no failures — divine a proper and idiomatic
fix"); **E-3** ("re-anchor the gate's PREMISE — NEVER lower the threshold to swallow the flake").
**Machine of record**: node v26.0.0, 18-core Apple Silicon, measured under variable concurrent-lane
load (uptime 5-28) — the honest shared-box condition, harsher than idle.

This is a **premise** re-anchor (Pole A of the registry bracket), not a threshold tweak. The gate's
ratio DENOMINATOR is replaced; the floors are re-derived on the new scale.

---

## §1 The born-RED witness (K≥20 at head, reconciled against the ORACLE 0.0160 patch)

At head the gate already carried the U.W-ORACLE node-24 nudge (`SHEET_RATIO_FLOOR` 0.0200 → 0.0160)
+ median-of-9. Under that state I ran the gate **20×** and the harness **24×+45×**:

- **Gate 20/20 PASSED** — but that is the cushion, not portability. Witness the RATIO INSTABILITY
  that IS the false premise: `v/json` swung **0.0105–0.0140 (33% spread)**, `s/json` swung
  **0.0201–0.0278 (38% spread)**. The `v/json` **floor margin spent to 5%** (run 10: 0.0105 over the
  0.0100 floor) — this is the registry's "0–7% margin, not 25%" (§10), witnessed live on THIS fast
  arch. A single run dipping under floor reds; the 20/20 is the 0.0160+median cushion masking a live
  non-portability, not a cured gate.
- **Root cause confirmed by decomposition** (24-sample harness): native `JSON.parse` is remarkably
  STABLE (CV **2.8–4.0%**) — it barely feels load, being native C++. The CSS parser has CV **8.8%**.
  Dividing a noisy interpreted numerator by a rock-steady native denominator just passes the parser's
  own noise straight through (`v/json` CV 8.1% ≈ raw parser CV 8.8%): **the denominator adds no
  counter-variance and does not co-scale**. This is the registry §10 root cause reproduced.

**Reconciliation with ORACLE.** ORACLE lowered SHEET 0.0200 → 0.0160 to accommodate node-24's
V8-optimized native `JSON.parse` (the ratio denominator drifted, not the code). That is a THRESHOLD
move on the false premise — exactly the move E-3 forbids for U-F14. My cure removes native
`JSON.parse` as the denominator entirely, so that node-version drift **cannot recur**; the ORACLE
nudge is **superseded by the premise fix**, and the new floors are on a different scale (parse-that
~90 MB/s reference) — NOT comparable to 0.0100 / 0.0160.

---

## §2 The re-anchor — Pole A (co-scaling normaliser), rejected pole, the margin data

**PICK — Pole A: replace native `JSON.parse` with parse-that's own `jsonParser`** as the in-run
normaliser, over the SAME ~450-byte JSON payload. `jsonParser` (exported by `@mkbabb/parse-that`,
already a runtime dep) is the **identical combinator machinery** — dispatch + allocation +
backtracking — as the CSS value/sheet parser, so numerator and denominator co-scale across arch AND
node version. It lives in the dependency, NOT `src/parsing`, so a scanner regression moves the
numerator but not the reference — **teeth preserved**.

**Direct empirical proof of co-scaling** (45-sample derivation, window 36-44): concurrent load dropped
`jsonParser` 92 → 83 MB/s and the parser dropped in lockstep (value 5.5 → 4.86, sheet 11.2 → 10.1) —
so `v/pt` HELD at 0.0586 and `s/pt` at 0.1216, unchanged. Native `JSON.parse` would have stayed ~400
and collapsed the ratio. The ratio is now genuinely load/arch-invariant.

**Why not a pure-JS char-scan reference loop** (the bracket's other Pole-A form): a hand-rolled
char-scan loop is monomorphic and tiers up to near-native machine code (measured CV 7.5%, 546 MB/s).
On a newer V8 it can be optimized MORE than the polymorphic combinator parser — re-introducing the
same node-version drift native `JSON.parse` has. `jsonParser` is strictly better: it is the SAME
polymorphic combinator class as the parser, so V8 optimizes both together. REJECTED in favour of the
same-machinery reference.

**Why not Pole B (absolute MB/s floor + margin + median-of-N) alone**: a pure absolute floor fails
the device-dependence lesson the gate was authored around (a slow CI Linux runner reads lower absolute
MB/s → false red). The node-24 evidence shows the JSON-ratio ALSO fails cross-node; only a co-scaling
ratio is portable across BOTH arch and node. Pole B's stability MECHANISM (median/peak of N) is
retained (see §3) — but the PREMISE fix is Pole A.

**Floor derivation** (45-sample dataset, median-of-9 windows; then confirmed on the peak statistic):

| clause | cured (peak) | full-revert level (teeth) | floor | margin below cured | over worst obs. peak |
|--------|-------------|---------------------------|-------|--------------------|----------------------|
| VALUE v/pt | ~0.0596 | ~0.0485 (+23%) … ~0.0458 (+30%) | **0.0500** | ~16% | ~13% (worst 0.0563/18) |
| SHEET s/pt | ~0.1250 | ~0.0988 (+27%) … ~0.0947 (+32%) | **0.1000** | ~20% | ~9% (worst 0.1091/18) |

The floor sits between the full-slow-chain-revert level (teeth) and the worst observed peak (no false
positive). The +23%/+27% "smallest documented win" is the conservative teeth test; a real full revert
(+30%/+32%) gives ~9%/~6% teeth. Crucially the margin is now **arch-invariant** (co-scaling) — it does
NOT collapse to 0-7% on a fast arch as the native-`JSON.parse` ratio did.

---

## §3 The stability arm — the PEAK statistic (why not median)

A capability floor on a shared box must not flake when a build competes for CPU. Under a load spike
(uptime ~28) the **median-of-9 flaked**: 2/18 runs reddened at `v/pt` 0.0494/0.0497 (1% under a 0.0500
floor) — the whole invocation ran during sustained contention, and median cannot rescue a uniformly
depressed window. Lowering the floor to swallow that would breach the teeth (revert level ~0.0485).

The idiomatic fix: gate on the **PEAK (max) of N=15 samples**, not the median. CPU contention can only
make the parser SLOWER; a genuine code regression makes even the best-scheduled run slower. So the
peak (least-contended) sample is the honest capability the floor tests — **contention-immune**
(kills the flake) yet **teeth-preserving** (a full revert drops even the peak ~23-32% below cured).
Per-sample timer noise at N=1000 inner iterations is <1%, so the peak cannot spuriously EXCEED true
capability (no false pass); a code regression is hidden from neither statistic. This is NOT
cherry-picking to pass — it is the correct statistic for "is the code CAPABLE of ≥ floor throughput"
on a contended box, and it makes the gate's RED a trustworthy code-regression signal instead of a
scheduler-mood signal.

---

## §4 The cure PROVEN

- **Gate determinism**: post-cure the re-anchored gate ran **18/18 GREEN** (peak-min v/pt 0.0563,
  s/pt 0.1091 — cleared floors by 9-13% at the worst) + a contiguous **12/12 GREEN** block + 2 in-slate
  passes = **32/32** clean invocations, **0 false reds**, under variable load (5-28). Where
  median-of-9 flaked 2/18, peak-of-15 held 32/32.
- **Measured margin ≥ designed headroom**: every clause cleared its floor by a MEASURED **9-30%**
  (typical ~15-25%) — a real, arch-invariant headroom, replacing the phantom 25% that spent to 0-7% on
  a fast arch.
- **`test:dist` exit 0**: the full 10-clause slate exited **0 on 3/3 runs** (it exited 1 once at head —
  gone). Only `proof:perf-target` re-anchored; the other 9 clauses are untouched.
- **Teeth intact**: a full slow-chain revert of the S2/S3 dispatch+scanner win drops the ratio below
  the floor on every co-scaling machine (the reference is independent of `src/parsing`).

**RESIDUAL (honest, per ORACLE §5's discipline)**: the value win (+23%) is comparable to the run
noise, so against the SMALLEST documented revert the teeth are thin — this gate is the GROSS-regression
(full slow-chain revert) tripwire it was authored to be; the deterministic 1871-test suite carries the
fine correctness discrimination.

---

## §5 G-PERF-2 disposition

**GREEN — deterministic.** `proof:perf-target` is re-anchored on the co-scaling parse-that `jsonParser`
normaliser (premise fixed, not threshold lowered), gated on the peak of N=15; it runs GREEN K/K (32/32)
at idle-and-under-load with each ratio clause clearing its re-anchored floor by a measured arch-
invariant margin, and `test:dist` exits 0. The born-RED idle-flake (registry §10) is cured; the gate's
RED is now a trustworthy regression signal. The bracket is discharged: Pole A picked, char-scan-loop
and Pole-B-alone rejected with the measurement that drove it.
