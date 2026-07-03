# CRIT — gamut-bound (Tranche R, Pass-2)

**Critic** · 2026-07-02 · target: `docs/tranches/R/audit/pass2/gamut-bound.md`
**Verdict: the pass-2 amendment CLOSES the pass-1 gap. Convergence 97%. Empty mustFix — co-signable.**

Pass-1 ancestor `proto-gamut-policy` scored 84% (the loop minimum) with exactly two open holes: (1) a factual mislabel of `dispatch.ts:371`, (2) an unbounded α=1.0 mid/dark safety claim. The pass-2 packet closes **both**, discharges every P2 citation nit, PROVES/REFUTES the knee as chartered, and — critically — does NOT rubber-stamp: it measured the bound, found it FAILS the `<0.05` gate (0.083), and honestly revised the headline. That is the exact pass-2 shape the verdict demanded (PASS1-VERDICT §1: "burn-down and amendment, not re-derivation").

---

## 1 — Independent verification (live trees, this pass)

I re-ran `scratchpad/pass2/probe-v2.mjs` from a clean shell and spot-checked every load-bearing citation against the read-only main tree. **Everything reproduces to the digit.**

**Probe numbers — reproduced exactly:**
- Worst-case α=1.0 non-light ΔL = **0.0834** @ `L0.3 C0.4 H210` → gate FAILS (target §0/§2.1: 0.083). ✓
- Full-cusp worst = **0.4053** @ `L0.3 C0.4 H180` (target §2.1: 0.405). ✓
- MID `C=0.32` α=1.0 ΔL max = **0.050** (target §2.1 "at threshold"). ✓ — this also exposes that even the pass-1 *sampled* band's MAX already sat at the gate; pass-1 reported only the 0.024 *mean* (target §1 bullet, correct).
- Per-cell `L×C` grid: `L0.3 C0.4`=0.0834, `L0.35 C0.37`=0.0569, `L0.65 C0.37`=0.0506, `L0.5`=0.0000 — matches target §2.2 to the digit. ✓
- KNEE sweep light-ret 34.03→41.24→46.03→47.92→49.08→49.92→50.52→51.35; guard ΔL 0.0104→…→0.1072 — matches target §3 exactly. ✓
- SAFE-α: α=0.35 worst 0.0479 (OK), α=0.40 worst 0.0520 (breach); pink α=0.35→`rgb(255,185,194)` 30%, α=1.0→`rgb(255,167,180)` 39% — matches target §2.3. ✓

**Citations — verified against live source:**
- `gamut.ts:242` `const GAMUT_ALPHA = 0.05;` — CONFIRMED byte-for-byte. ✓
- `gamut.ts:5-6` + `:246` doc "alpha=0.05" — CONFIRMED; pass-1's `:247` is off-by-one, target §8 corrects it. ✓
- `gamut.ts:269-271` adaptive anchor `Ld=L−0.5; e1=0.5+|Ld|+α·C; L0=…` — CONFIRMED. ✓
- `constants.ts:431` `GAMUT_SECTOR_COEFFICIENTS = [` — CONFIRMED (`:409` LMS_TO_LINEAR_SRGB, `:423` OKLAB_TO_LMS_COEFF sit outside the sector array, as target §8 notes). ✓
- `dispatch.ts:371-444` `gamutMapToRgbSpace` — function opens `:371`, returns `:443`, closes `:444`. ✓

## 2 — The label correction (P1 #8 / MUST-FIX-1) is CORRECT — verified independently

I read `dispatch.ts:371-444` in the live tree. `gamutMapToRgbSpace` is unambiguously a **hold-L / hold-H, reduce-chroma binary search**: `CHROMA_SEARCH_STEPS=24` (`:352`), the loop `:415-428` bisects `c` on `rgbInGamut(...)` (`:342-345, :423`), emits the in-gamut chroma then FP-clamps the residual (`:431-442`). **No `deltaEOK` anywhere in the loop; no JND stopping test.** The function's own doc (`:347-351`) self-describes as "hold L + H, binary-search the largest in-gamut chroma, then clamp."

That is the probe's variant **c1** (hold-L/H reduce-to-fit — the 27%-retention washout), NOT §13.2 MINDE (variant **b**, which clips each step and compares `deltaEOK(reduced,clipped)<JND`, returning the *clipped* point). Target §5 corrects the pass-1 mislabel exactly and re-reasons the "don't route sRGB through the bisection" REJECT on the correct (c1-washout) ground. Verdict unchanged; label now right for the implementer. **DISCHARGED.**

## 3 — The bound (P0 #2 / MUST-FIX-2) is CLOSED honestly — the measurement moved the answer

The critic's gate (`CRIT-proto-gamut-policy §MUST-FIX-2`, line 79): *"If worst-case ΔL stays < ~0.05 the claim stands as written; if not, the headline number must be revised."* The corpus was extended precisely as specified — `C∈{0.37,0.40} × L∈{0.30,0.35,0.50,0.65} × 12 hues` (96 colors) + `α∈{1.5,2.0}` rows. Worst-case came back **0.083 > 0.05**. The packet **revised the headline** (§0, §2.2 tiered bound, §7 honest framing) instead of paraphrasing the failure away. It also refutes the pass-1 §6-dissent's own prediction (≈0.03) with data — the dissent compared a max to a mean. This is the correct epistemic move: the auto-ratify did NOT fire and the packet says so plainly, handing a two-option Q7 decision fully costed (α=1.0 recommended; α=0.35 gate-strict fallback). §6-dissent-2 ("if the measurement lands <0.05 ratify as-specced with zero text changes") is thereby resolved in the negative — correctly. **DISCHARGED.**

## 4 — Knee REFUTED; costs as ratios; citation sweep — all discharged

- **Knee (charter "PROVE or REFUTE"):** REFUTED with the α∈{1.25,1.5,2.0} rows (§3). Light-ret climbs monotonically to 51.3% at α=2.0 — α=1.0 is NOT the full-cusp ceiling; it is a diminishing-returns *elbow*, not a plateau. Reproduced exactly. **DISCHARGED.**
- **Cost as ratios (P2 #19):** §4 — α=1.0 ≈1.0×, MINDE ≈6.5× REGRESSION, ns framed machine-variable. **DISCHARGED.**
- **Citation drift (P2 #19):** §8 — `constants.ts:431` confirmed, `gamut.ts:246` off-by-one corrected, `dispatch.ts:371-444` span corrected. **DISCHARGED.**

## 5 — Precept + staleness scan

- **KISS / no-contrivance:** clean. The recommended change is one constant (`gamut.ts:242`). §7 explicitly REJECTS an L-asymmetric α as a KISS-violating contrivance and records it so it is not re-proposed. No legacy, no workaround, no design-system surface.
- **Scope:** tight to charter; no over-scoping. The map stays zero-iteration.
- **Staleness vs glass-ui 4.2.0/BG + kf 5.1.0:** N/A — this is a self-contained library scalar with zero glass-ui/keyframes coupling. Correctly irrelevant.

## 6 — Residual (cosmetic; does NOT block ratification — no mustFix)

Two trivial imperfections, recorded for the amendment sweep, neither verdict- nor gate-bearing:

1. **MINDE cost band.** §4/§6 state MINDE ≈6.5× "(5.9–6.7× across runs)". My fresh reproduction read **6.82×** — a hair above the stated ceiling. The qualitative "large REGRESSION of the zero-iteration LEAD" is robust and the packet explicitly frames ns as machine-variable, so this is cosmetic; the stated band would read cleaner as "~6–7×".
2. **§2.2 point-2 example hue.** The worst breach lives at hue **210°** (cyan-blue); the "no real gamut reaches C≥0.37 at L=0.30" support cites rec2020's most-saturated **blue** at `oklch(0.44 0.36 264)` — a *different* hue. The core claim (super-gamut authored chroma at dark L exceeds realizable cusps) is defensible; the illustrative example just isn't hue-matched to the breach cell.

Neither requires a change to co-sign the packet as the R.W1 head.

---

## Bottom line

Every pass-1 hole is closed and independently re-verified: the mislabel is corrected against live source (variant c1, not MINDE-b); the safety claim is now *bounded* not *sampled*, and the bound (0.083) honestly revised the headline rather than rubber-stamping a missed gate; the knee is refuted with data; costs are ratios; citations swept (the packet even corrects pass-1's own off-by-ones). The α-tune-wins verdict spine is untouched; MINDE + gamut-relative stay rejected on the extended 164-color corpus; hue is held 0.000° mean AND max. The packet is ratifiable as the R.W1 head as a two-option Q7 owner decision (recommend α=1.0). Only two cosmetic phrasings keep it a hair under a perfect co-sign.

**Convergence: 97%. mustFix: empty.**
