> _Hoisted 2026-07-02 (R.W0-14) by lane L2-kf1-reverify from `.claude/worktrees/wf_d9a4e4d9-899-1/docs/tranches/R/audit/pass2/gamut-bound.md`. Byte-faithful. Worktree base `15b0382` (stale, did not self-correct) but measurement-equivalent to head `e80b359` — `gamut.ts` delta across `15b0382..e80b359` is one appended P-era function, `GAMUT_ALPHA` core untouched; nothing re-runs (PASS2-VERDICT §5 / M2)._

# proto-gamut-policy v2 — bounded R.W1-head packet (Tranche R, pass 2)

**Lane**: `gamut-bound` (Pass-2 seed 1) · **Date**: 2026-07-02 · **Worktree**: `wf_d9a4e4d9-899-1` (isolated, `tranche-q` @ `e80b359`)
**Descends from**: `proto-gamut-policy` (pass-1, 84% — THE loop minimum) + `CRIT-proto-gamut-policy.md` + `PASS1-VERDICT.md §4.1 / §5-P0#2 / §6-dissent-2`.
**Charter**: extend `probe.mjs` with (i) a max-chroma guard band `C∈{0.37,0.40} × L∈{0.30,0.35,0.50,0.65} × 12 hues` and (ii) `α∈{1.5,2.0}` plateau rows; **BOUND** worst-case mid/dark ΔL at α=1.0 (auto-ratify iff `<0.05`); **PROVE or REFUTE** the α=1.0 knee; correct the pass-1 `dispatch.ts:371` label; present costs as ratios; sweep the citation drift.
**Artifact**: `scratchpad/pass2/probe-v2.mjs` (reproducible: `node probe-v2.mjs`; no deps, self-contained port).

---

## 0 — Verdict in one line (CHANGED from pass 1)

**The auto-ratify gate does NOT fire.** Worst-case non-light ΔL at α=1.0 = **0.083** (`L0.30 C0.40 H210°`), **> 0.05** — refuting the pass-1 §6 dissent's predicted ≈0.03. Per `CRIT §MUST-FIX-2` ("if not <0.05 the headline number must be revised") the pass-1 headline **is revised here**. The **α-tune family still wins** (MINDE + gamut-relative remain rejected, §5), and α=1.0 still delivers the U10 oracle pink — but α=1.0 is now a **Q7 taste call with a *tiered* safety bound**, not an automatic ratification. Full data + a gate-strict fallback (α=0.35) are below so the owner ratifies armed, not blind.

---

## 1 — What the extended probe added (vs pass-1 `probe.mjs`)

`probe-v2.mjs` is a byte-faithful superset of the pass-1 harness (same Ottosson port, `gamut.ts:100-281` verbatim; §2/§3 pink+aggregate tables reproduce to the digit). New in v2:

- **Max-chroma guard band** — `C∈{0.37,0.40} × L∈{0.30,0.35,0.50,0.65} × 12 hues (30° step)` = **96 colors**. The pass-1 guard capped at `C=0.32`; the α·C anchor pull scales with C, so `C=0.40` is 1.25× the pass-1 sample and meets/exceeds any real gamut's saturated-hue cusp chroma. This is the worst-case bound the critic demanded.
- **α plateau rows** — the sweep now runs `α∈{0.05,0.2,0.5,0.75,1.0,1.25,1.5,2.0}` (added 0.75/1.25/1.5/2.0) to test the "knee".
- **MAX (worst-case) tracking** — every aggregate now reports `ΔL(max)` and `hue°(max)` alongside the means (pass 1 reported means only — the whole reason the 0.083 worst case was invisible).
- **Per-cell ΔL grid** — `L × C` max-over-12-hues, to localize *where* the breach lives.
- **SAFE-α crossover sweep** — `α∈{0.05…0.50}` fine, to find the largest α holding worst-case guard ΔL `<0.05`.
- **Costs as ratios** — ns are machine-variable (self-ratio reads 0.97× on a re-run); presented as `×vs current`.

Corpus totals: 1 pink + 49 LIGHT (`C=0.30`) + 18 MID `C=0.32` (pass-1 continuity) + **96 MAX-CHROMA** = **164 colors**.

---

## 2 — THE BOUND (the charter deliverable)

### 2.1 Worst-case ΔL at α=1.0 — the gate FAILS

| set | ΔL mean | **ΔL MAX** | worst @ | gate `<0.05` |
|---|---|---|---|---|
| MID `C=0.32` (pass-1 band) | 0.024 | **0.050** | `L0.65 …` | at threshold |
| MAX-CHROMA `C∈{0.37,0.40}` | 0.038 | **0.083** | `L0.30 C0.40 H210` | **FAIL** |
| FULL non-light (mid+maxc) | 0.036 | **0.083** | `L0.30 C0.40 H210` | **FAIL** |
| — full-cusp / c2 (max-chroma) | 0.173 | **0.405** | `L0.30 C0.40 H180` | (the collateral α=1.0 avoids) |

`probe-v2.mjs` `=== BOUND ===` block. **The pass-1 §6-dissent estimate (worst-case "plausibly ≈0.03, far under full-cusp's 0.133") is REFUTED on both terms**: the true worst case is **0.083** (2.8× the estimate) and full-cusp's true worst case is **0.405** (3× the 0.133 *mean* the dissent compared against — the dissent compared a max to a mean).

### 2.2 WHERE the breach lives (per-cell `L × C` max, α=1.0)

| cell | maxΔL | @hue | breach |
|---|---|---|---|
| `L0.30 C0.37` | 0.079 | 210 | ← |
| `L0.30 C0.40` | **0.083** | 210 | ← |
| `L0.35 C0.37` | 0.057 | 210 | ← |
| `L0.35 C0.40` | 0.060 | 210 | ← |
| `L0.50 C0.37` | **0.000** | — | — (anchor centered at L=0.5) |
| `L0.50 C0.40` | **0.000** | — | — |
| `L0.65 C0.37` | 0.051 | 210 | ← (marginal) |
| `L0.65 C0.40` | 0.054 | 210 | ← (marginal) |

`probe-v2.mjs` `=== PER-CELL ===` block. Three structural facts:

1. **`L=0.50` pays ΔL = 0.0000** — proof the self-limiting mechanism is real and exact at its center (the `Ld = L−0.5` anchor at `gamut.ts:269`). The mechanism protects **MID** colors precisely; it does **not** specially protect **DARK** colors (`L=0.30` has `|Ld|=0.20`, same magnitude as `L=0.70`). The pass-1 phrase "self-limiting on **mid/dark**" (`proto-gamut-policy.md:80,89,167`) over-claimed: it is self-limiting on **mid**, and merely *bounded* (not zeroed) on dark.
2. **The worst breach is the synthetic corner** `L≤0.35 ∧ C≥0.37` (0.057–0.083) — `oklch(0.30, 0.40, 210°)` is a **super-cusp authored color**: `C=0.40` at `L=0.30` exceeds the blue-hue cusp chroma of *every* real gamut (rec2020's most-saturated blue is ≈ `oklch(0.44 0.36 264)` — no real gamut reaches `C≥0.37` at `L=0.30`). Crushing an imaginary color into sRGB inherently distorts.
3. **BUT the breach is not confined to the synthetic corner** — `L=0.65 C=0.37` (a lighter, more plausible saturated color) breaches marginally at 0.051–0.054. And at the *realistic* saturated chroma `C=0.32`, α=1.0's worst case is **0.050 — exactly at the gate**. So the honest bound is tiered, not "safe everywhere":

> **Tiered bound (α=1.0):** worst-case ΔL = **0.050** at realistic saturated chroma (`C≤0.32`, at the gate); **0.083** at authored super-gamut chroma (`C≥0.37`, dark L). Across the whole non-light guard it is **4.9× under full-cusp** (0.083 vs 0.405) — the self-limiting win is large, just not large enough to clear the strict `<0.05` gate at every authored input.

### 2.3 The gate-strict fallback: α=0.35

The SAFE-α crossover (`probe-v2.mjs` `=== SAFE-α ===`) locates the strict boundary:

| α | worst guard ΔL | | pink retention |
|---|---|---|---|
| 0.30 | 0.0434 | OK | 29% `rgb(255,187,197)` |
| **0.35** | **0.0479** | **OK (max safe)** | **30% `rgb(255,185,194)`** |
| 0.40 | 0.0520 | ← breach | — |
| 0.50 | 0.0593 | ← breach | 33% `rgb(255,179,189)` |
| 1.00 | 0.0834 | ← breach | 39% `rgb(255,167,180)` |

**α=0.35 is the largest value holding worst-case guard ΔL `<0.05`** — but it lands the pink at only **30% retention** (`rgb(255,185,194)`), sitting close to the pale current-defect side (17% → `rgb(255,214,219)`), *not* the vivid "land between" the U10 oracle demands (`N.W11.md:170-174`, target ≈ `rgb(255,167,180)`). The gate and the cure pull in opposite directions — this is the genuine tension pass 1 sampled past.

---

## 3 — THE KNEE: REFUTED (no plateau; it is a diminishing-returns elbow)

Pass-1 §3/§5a asserted "**1.0 is the natural knee** — higher α gains nothing on the pathology" grounded on a coarse-corpus coincidence (α=1.0 light-ret read 49.1% == full-cusp 49.1%). The fine sweep **refutes it**:

| α | light ret % | Δ light-ret | guard ΔL max | Δ guard ΔL |
|---|---|---|---|---|
| 0.05 | 34.03 | — | 0.0104 | — |
| 0.2 | 41.24 | +7.21 | 0.0328 | +0.022 |
| 0.5 | 46.03 | +4.79 | 0.0593 | +0.027 |
| 0.75 | 47.92 | +1.89 | 0.0732 | +0.014 |
| **1.0** | **49.08** | **+1.16** | **0.0834** | **+0.010** |
| 1.25 | 49.92 | +0.84 | 0.0913 | +0.008 |
| 1.5 | 50.52 | +0.60 | 0.0976 | +0.006 |
| 2.0 | 51.35 | +0.83¹ | 0.1072 | +0.010¹ |

¹ over the 0.5-wide 1.5→2.0 step (≈+0.41 and +0.005 per 0.25α). `probe-v2.mjs` `=== KNEE ===` block.

**Refutation, two parts:**
1. **α=1.0 is NOT the full-cusp ceiling.** Light-ret keeps climbing monotonically through α=2.0 (49.1 → 49.9 → 50.5 → 51.3%); the pass-1 "49.1% == full-cusp" equality was a coarse-corpus artifact, not a plateau. α=2.0 gains **+2.2pp** of light chroma over α=1.0.
2. **There is no flat knee** — the light-ret curve is smoothly *concave* (marginal gain decays 7.21 → 4.79 → 1.89 → 1.16 → 0.84…) while guard ΔL rises **near-linearly** (α enters as `α·C`). So "higher α gains nothing" is false; the correct statement is **diminishing returns**: beyond α≈1.0 each +0.25α buys `<1.2pp` light chroma while adding `≈+0.008` guard ΔL. The **benefit/cost ratio crosses unity near α≈0.75–1.0** — that elbow, not a plateau, is what recommends α=1.0. Call it an **elbow**, never a "knee/plateau".

---

## 4 — COST (as ratios — ns are machine-variable)

`probe-v2.mjs` `=== COST ===`, 200k warmed iters. Absolute ns are non-deterministic (the α=0.05 self-ratio reads **0.97×** on re-run — that is the noise floor); only ratios are load-bearing:

| policy | ratio vs current |
|---|---|
| a α=0.05 (current) | 1.00× (noise floor ≈ ±0.03) |
| **a α=1.0** | **≈1.0× (within noise; marginally faster)** |
| a α=2.0 | ≈0.96× |
| a full-cusp | ≈0.95× |
| c1 const-L clip | ≈0.78× |
| **b MINDE §13.2** | **≈6.5× (5.9–6.7× across runs) — REGRESSION** |

The α change is **free** (a larger α marginally better-conditions the `e1²−2|Ld|` sqrt at `gamut.ts:271`, so it reads equal-or-faster). MINDE's ~6.5× regression of the zero-iteration analytical LEAD stands — the ratio, not the pass-1 absolute "5.9×", is the durable claim.

---

## 5 — LABEL CORRECTION: `dispatch.ts:371` is NOT CSS §13.2 MINDE (CRIT MUST-FIX-1)

Pass-1 §1 (line 22) and §5(b) called the wide-gamut bisection at `dispatch.ts:371-444` "the same algorithm §13.2 MINDE runs" / warned against "routing the sRGB egress through the `dispatch.ts:371` bisection." **This mislabel is corrected here, verified against the live function** (`dispatch.ts:371-444`, read this pass):

`gamutMapToRgbSpace` is a **hold-L / hold-H, reduce-chroma-to-in-gamut binary search**:
- `CHROMA_SEARCH_STEPS = 24` (`dispatch.ts:352`); loop at `:415-428` bisects `c`, testing `rgbInGamut(...)` per step (`:423`, `:342-345`).
- **No `deltaEOK` in the loop; no JND stopping test.** It returns the *in-gamut chroma-reduced* point, then FP-clamps the residual (`:431-442`).

That is **≈ the probe's variant `c1`** (hold-L/H const-hue chroma clip to the true boundary — the probe's c1 uses a triangle-approx boundary, the dispatch bisection uses the exact `rgbInGamut` boundary, but the *geometry is identical*: hold L+H, reduce C to fit). It is **NOT** the probe's variant `b` (CSS §13.2 MINDE = reduce-chroma, *clip each step*, compare `deltaEOK(reduced,clipped)<JND`, return the **clipped** color).

**Consequence for the verdict (unchanged, now correctly reasoned):**
- What "unifying sRGB onto the `dispatch.ts:371` bisection" would actually produce is **variant c1 — the 27%-retention const-L washout** (`§6` below), which is *worse than the current defect* (34%). So "do not route sRGB through `dispatch.ts:371`" is **even more justified**, for the **c1-washout** reason — not the "§13.2 breaks hue + costs 6.5×" reason pass-1 gave (that reason is real but applies to variant **b**, a *different* algorithm the runtime does not run).
- Both sub-cases are empirically covered (b tested → hue-break + 6.5×; c1 tested → washout). Both lose to α=1.0. **Only the labels move; no verdict, no completeness gap.**

Corrected reading of the two paths: the two sRGB and wide-gamut egresses **correctly stay distinct** — the analytical Ottosson map (`gamut.ts`) *is* the sRGB specialization; the `dispatch.ts:371` bisection is the sRGB-fit-free numeric fallback for `display-p3`/`rec2020`/… (its own doc, `dispatch.ts:347-351`, calls itself "the CSS §13.2 reference strategy: hold L+H, binary-search the largest in-gamut chroma, then clamp" — which is precisely hold-L/H reduce-to-fit ≈ **c1**, confirming the correction).

---

## 6 — MINDE + gamut-relative: still REJECTED (re-confirmed on the extended corpus)

| policy | pink ret | light ret % | maxc ret % | hue max° | cost | disposition |
|---|---|---|---|---|---|---|
| **a α=1.0** | **39%** | 49.1 | 38.6 | **0.000** | ≈1.0× | **WINNER (Q7 taste)** |
| a full-cusp / c2 | 46% | 49.1 | 48.4 | 0.000 | 0.95× | rejected: ΔL max **0.405** (4.9× α=1.0) |
| b MINDE §13.2 | 10% | 30.7 | 38.5 | **34.7** | ≈6.5× | rejected: hue-break + 6.5× |
| c1 const-L clip | 11% | 27.1 | 36.7 | 0.000 | 0.78× | rejected: **27% ret — worse than the defect** |

- **MINDE (b)**: max hue drift **34.7°** on light colors (`probe-v2.mjs` light aggregate) — a gross violation of the mandatory hue-hold, plus 6.5× cost. Keep as **test oracle only**.
- **gamut-relative (c)**: c1 (the literal "Cmax at L,H" const-L clip) is the washout itself (27% < the 34% defect); c2 ("c=1 = cusp chroma") is **byte-identical to full-cusp** (46% pink, ΔL max 0.405). (c) introduces **no new mechanism** — its washed reading is the disease, its vivid reading collapses onto (a)'s full-cusp endpoint. **(a) subsumes (c); R-8 stays deferred.** `PASS1-VERDICT §3` REFUTED row stands.

Hue is held to **0.000° (mean AND max)** across the entire (a) and (c) families on all 164 colors — the α-tune preserves hue *exactly* by construction (it moves only along the constant-hue ray from L0). This is the one pass-1 claim the extended corpus strengthens rather than qualifies.

---

## 7 — RECOMMENDATION for the R.W1 head (armed, honest)

The clean auto-ratify (worst-case `<0.05` → set `GAMUT_ALPHA=1.0`, zero text changes) **does not fire**. The decision is now a **data-armed Q7 taste call** between two ratifiable options:

### Option A — `GAMUT_ALPHA = 1.0` (recommended; max U10 fidelity)
- **Pro**: lands the pink at `rgb(255,167,180)` (39% ret) — the vivid "land between pale and browser" the U10 oracle names (`N.W11.md:170-174`); hue exact (0.000°); zero cost; self-limited (4.9× under full-cusp's collateral).
- **Con**: worst-case non-light ΔL = **0.083** at authored super-gamut chroma (`C≥0.37`, dark L); **0.050** at realistic saturated chroma (`C≤0.32`). **Misses the strict `<0.05` gate** — but only at inputs above any real gamut's cusp, and always 4.9× better than the vivid alternative (full-cusp).
- **Honest framing to ratify**: revise the pass-1 safety claim from "mid/dark ΔL stays tiny (0.024) → global α is safe" to the **tiered bound in §2.2**. Do not ship the words "self-limiting on mid/dark, <0.05"; ship "self-limited (exact at L=0.5, 4.9× under full-cusp); worst-case ΔL 0.050 at realistic chroma, 0.083 at authored super-gamut chroma."

### Option B — `GAMUT_ALPHA = 0.35` (gate-strict fallback)
- **Pro**: worst-case non-light ΔL **< 0.05** across *all* authored inputs incl. the synthetic corner; strictly honors the critic's gate.
- **Con**: pink only **30%** (`rgb(255,185,194)`) — a real improvement over the 17% defect but close to the pale side, **weakly** satisfying the U10 oracle. The marginal-return elbow puts α=0.35 on the steep part of the curve (each 0.1α still buys ~1.5pp light ret there), i.e. it under-cures.

**This lane recommends Option A (α=1.0)** on the ground that U10 *is* the oracle-fidelity mandate (the whole tranche item exists to un-wash the pink to a *vivid* hue-true result), the collateral is confined to dark super-gamut authored colors (a low-traffic input class), and it is provably the least-collateral vivid option (4.9× under full-cusp). But because the auto-gate missed, **the final call belongs to the owner (Q7)** — presented here with both options fully costed so no re-derivation is needed to decide.

> **Rejected as a contrivance** (recorded so it is not re-proposed): an L-asymmetric α (apply α only for `L>0.5`, since light colors *want* the L-shift and dark colors don't) would resolve the tension — but it adds a branch to the Ottosson-canonical formula, violates the pass-1 "one constant, no mechanism" discipline (`proto-gamut-policy.md:166`) and the KISS precept. Not recommended.

### The exact change (Option A)
`src/units/color/gamut.ts:242`:
```
-const GAMUT_ALPHA = 0.05;
+const GAMUT_ALPHA = 1.0;   // R.W1 U10: un-wash light-saturated colors; self-limited at L=0.5
```
Plus update the file-head doc **`gamut.ts:5-6`** and **`gamut.ts:246`** (both read "alpha=0.05" — the pass-1 report's `:247` was off-by-one). Add the §13.2 MINDE **oracle** + a far-OOG light-pink/yellow/cyan regression corpus to `test/`, **and** a mid/dark `C∈{0.37,0.40}` guard row asserting worst-case ΔL `< 0.09` (documenting the tiered bound as a lock, not the false `<0.05`). No other code; the map stays zero-iteration.

---

## 8 — Citation sweep (CRIT should-fix / PASS1-VERDICT §5-P2#19)

Verified against the live tree this pass:

- **`gamut.ts:242`** `const GAMUT_ALPHA = 0.05;` — CONFIRMED byte-for-byte; O/P/Q never touched it. Not stale.
- **`gamut.ts:5-6`** ("Strategy: adaptive L0 (alpha=0.05)") and **`gamut.ts:246`** ("Adaptive L0 strategy (alpha=0.05)") — the two doc strings to update; pass-1's `:247` is **off-by-one** (correct is `:246`).
- **`constants.ts:431`** — `GAMUT_SECTOR_COEFFICIENTS` begins at **`:431`** (pass-1 "verbatim from `:409-453`" under-cited: the array is `:431-453`; the probe *also* depends on `LMS_TO_LINEAR_SRGB` `:409-413` and `OKLAB_TO_LMS_COEFF` `:423-427`, outside the sector array). Faithfulness is established empirically by the reproducing probe, not by the line range.
- **`dispatch.ts:371-444`** — `gamutMapToRgbSpace` spans **371–444** (pass-1 "371-446" over-ran by two; the function body ends at the `return` on `:443`, closing brace `:444`).
- **`gamut.ts:269-271`** — the `Ld = L−0.5; e1 = 0.5+|Ld|+α·C; L0 = 0.5(1+sign(Ld)(e1−√(e1²−2|Ld|)))` adaptive anchor — CONFIRMED; this is the mechanism whose L=0.5 centering §2.2 proves exact.

---

## 9 — What Pass 2 PROVED / REFUTED (delta over pass 1)

**PROVED**
- The self-limiting mechanism is **real and exact at L=0.5** (ΔL=0.0000 there, §2.2) — but protects **mid**, not **dark**.
- α-tune remains the winner; MINDE (hue-break + ~6.5×) and gamut-relative (c1 washout / c2 = full-cusp collateral) remain rejected on the *extended* 164-color corpus; hue held **0.000° mean AND max** across (a)+(c).
- The cost claim as a **ratio** (α=1.0 ≈1.0×; MINDE ≈6.5×) is durable; the pass-1 absolute ns are noise.
- The `dispatch.ts:371` bisection ≈ variant **c1** (hold-L/H reduce-to-fit), **not** §13.2 MINDE (variant b) — label corrected; verdict unchanged, now correctly reasoned.

**REFUTED**
- **The pass-1 §6-dissent "worst-case ΔL ≈0.03, ratify as-specced" — REFUTED.** True worst case at α=1.0 = **0.083** (`L0.30 C0.40 H210`); even realistic `C=0.32` reaches **0.050**. The auto-ratify gate does **not** fire.
- **The "α=1.0 is the natural knee / higher α gains nothing" plateau — REFUTED.** Light-ret rises monotonically to 51.3% at α=2.0; α=1.0 ≠ the full-cusp ceiling. It is a **diminishing-returns elbow**, not a knee.
- **The pass-1 "self-limiting on mid/dark, global α is safe (<0.05)" phrasing — REFUTED** and replaced by the **tiered bound** (§2.2, §7).

**AMENDMENT to the R.W1 head**: α=1.0 is **recommended but a Q7 owner call** (not auto-ratified); ship the **tiered safety bound**, not "<0.05"; the gate-strict fallback is **α=0.35** (pink 30%). Correct the `dispatch.ts:371` label, the `gamut.ts:246` doc cite, and present cost as a ratio.

---

## 10 — Convergence self-assessment

Pass-1 stood at 84% with two open holes: (1) the mislabel — **closed** (§5, verdict unchanged); (2) the unbounded safety claim — **closed by measurement, and the measurement moved the answer**: the bound is 0.083, the gate is missed, the headline is honestly revised, and the decision is handed to Q7 fully costed with a gate-strict fallback. The knee is refuted and re-characterized. Nothing in the α-tune-wins spine moved; everything that moved is bounding, labeling, and honest disposition — the desired Pass-2 shape. **This packet is ratifiable as the R.W1 head as a two-option Q7 decision (recommend α=1.0), not as a zero-change rubber-stamp.**
