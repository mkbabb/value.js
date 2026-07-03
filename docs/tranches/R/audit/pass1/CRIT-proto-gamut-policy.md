# CRIT — proto-gamut-policy (Tranche R, pass1)

**Critic pass** · 2026-07-02 · verdict: **converges to α=1.0; two substantive fixes before ratify.**
**Convergence: 84%.**

The core recommendation — `GAMUT_ALPHA 0.05 → 1.0`, adaptive-L0-0.5 family, unchanged algorithm — is
**well-grounded, reproducible, precept-clean, and not stale.** I re-ran `probe.mjs` from a clean shell;
§2 (pink) and §3 (aggregate) tables reproduce to the digit. But one load-bearing characterization is
**factually wrong**, one safety claim rests on an **under-ranged corpus**, and several minor citations drift.

---

## What holds (verified against the live tree)

- **`gamut.ts:242` `const GAMUT_ALPHA = 0.05;`** — CONFIRMED byte-for-byte. The defect still lives;
  O/P/Q never touched it. Not stale.
- **`gamut.ts:5-6` + `:246` file-head doc "alpha=0.05"** — CONFIRMED (report says `:247`, off-by-one; see below).
- **`gamut.ts:269-271` adaptive-L0 formula** (`Ld = L-0.5; e1 = 0.5+|Ld|+α·C; L0 = …`) — CONFIRMED.
  The "self-limiting" argument is sound *in mechanism*: α enters only as `α·C` in `e1`, centered at L=0.5,
  so it bites where `|L−0.5|` and `C` are both large. This is real, not hand-waving.
- **Probe faithfulness** — `probe.mjs` reproduces the analytical path; §2 pink table
  (`rgb(255,167,180)`, 0.00° hue, 39% ret at α=1.0) and §3 aggregates (49.1% light ret, ΔL 0.024
  mid/dark) match a fresh run exactly. The empirical spine is solid.
- **Oracle grounding** — `L-COLOR.md:61-64` gives the pink OKLab (L=0.9583 C=0.2724 H=9.83°),
  the current pale `rgb(255,214,219)`, and Chrome-naive `rgb(255,143,200)` = canvas readback = naive clip
  (`L-COLOR.md:64,67-71`). All match the report. `N.W11.md:171-172` "land between … forbidden magenta
  rotation" matches the "land between pale and browser" framing. CONFIRMED.
- **Scope vs SYNTHESIS §10** — `SYNTHESIS.md:216` scopes this exactly (α-tune / MINDE-unify /
  gamut-relative → U10 oracle). `SYNTHESIS.md:131` mandates R-8 gamut-relative be *evaluated inside*
  this proto and, if it loses, stay deferred — the report does exactly that (§5c, §6 REFUTED). Q7 taste
  call (`SYNTHESIS.md:232`) is correctly deferred to the owner (§6). **No zero-drop violation found.**
- **Precept fidelity** — one constant + doc + test corpus. Explicitly *rejects* a strategy-enum switch
  and full-cusp (KISS-preserving, §6 AMENDMENT). Pure `src/units/color`; no demo/god-module/design-system
  surface. `src/` was not modified (verified: line 242 unchanged). Clean.
- **Staleness** — this item is a self-contained library scalar with **zero** glass-ui / keyframes
  coupling. glass-ui 4.2.0/BG and kf 5.1.0 are irrelevant to it. Not stale.

---

## MUST FIX

### 1 — [medium] The "same algorithm the wide-gamut bisection runs" claim is FALSE (factual grounding)

Report §1 (line 22): MINDE §13.2 "return the naive-clipped point **(the same algorithm the wide-gamut
bisection at `dispatch.ts:371-444` runs)**." And §5(b): "do not route the sRGB egress through the
`dispatch.ts:371` bisection."

I read the actual function (`dispatch.ts:371-446`, `gamutMapToRgbSpace`). It is **NOT** CSS §13.2 MINDE:
- It is a **hold-L / hold-H, reduce-chroma-to-in-gamut binary search** (`CHROMA_SEARCH_STEPS=24`,
  `dispatch.ts:352,415-425`), testing `rgbInGamut(...)` per step. There is **no `deltaEOK` in the loop**,
  **no JND stopping test**, and it returns the *in-gamut chroma-reduced* point (then FP-clamps), **not a
  naive-clipped point**.
- CSS §13.2 MINDE (the report's variant `b`) is a *different* algorithm: reduce chroma, clip each step,
  compare `deltaEOK(reduced, clipped) < JND`, and return the **clipped** color.

So the parenthetical conflates two distinct algorithms. Consequence: what the dispatch bisection would
actually produce if sRGB were "unified" onto it is a **hold-L/H chroma-to-fit = the report's variant `c1`
(the 27% const-L washout)**, not variant `b`. The report already tested c1 and showed it's *worse than
the current defect* — so the REJECT of "unify sRGB onto the bisection" is **even more justified**, but for
the reason the report gives under `c1`, not the "MINDE breaks hue + costs 5.9×" reason it gives under `b`.

**Fix:** correct §1 and §5(b) to distinguish (i) CSS §13.2 MINDE (variant b — breaks hue, 5.9× cost) from
(ii) the actual `dispatch.ts:371` bisection = hold-L/H reduce-to-fit (≈ variant c1 — the washout). Both
lose to α=1.0; the verdict is unchanged, but the mechanism labels must be right or an implementer will
mis-read what `dispatch.ts:371` does. (Both sub-cases *are* empirically covered by b and c1 — this is a
labeling defect, not a completeness gap.)

### 2 — [medium] The guard-band chroma (C=0.32) does not bound worst-case mid/dark ΔL (completeness)

The headline safety claim is "mid/dark ΔL stays tiny (0.024) at α=1.0, therefore a *global* α is safe."
But α enters as `α·C`, so ΔL grows with chroma. The guard band caps at **C=0.32** (report §1, line 29),
yet real OOG mid/dark colors reach the cusp chroma (C≈0.37–0.40 for saturated reds/blues). At α=1.0 the
anchor pull at C=0.40 is 1.25× the C=0.32 sample, so the true worst-case mid/dark ΔL is **understated** by
the corpus. It is very likely still well under full-cusp's 0.133, but the "self-limiting → α=1.0 safe"
claim is not yet *bounded* — it is sampled below the worst case.

**Fix:** extend the R.W1 regression corpus (and, ideally, re-run the probe) to include max-realizable OOG
chroma (C≈0.37–0.40) at L∈{0.30,0.35,0.50,0.65} before ratifying "α=1.0 safe on mid/dark." If worst-case
ΔL stays < ~0.05 the claim stands as written; if not, the headline number must be revised.

---

## SHOULD FIX (minor — not verdict-changing)

- **[low] "1.0 is the natural knee, higher α gains nothing" (§3, §5a) is asserted, not shown.** The sweep
  stops at α=1.0; there is no α∈{1.5,2.0} row demonstrating the light-ret plateau and the mid/dark ΔL
  cost onset. Add one or two rows to *prove* the plateau rather than assert it. (The full-cusp==α=1.0
  light-ret coincidence at 49.1% is suggestive but not a proof that α>1.0 only costs.)
- **[low] Cost table absolute ns do not reproduce.** Report §4: 191 / 174 / 1133 ns (α=0.05 / α=1.0 /
  MINDE). Fresh run: 185.1 / 162.6 / 1090.6. The **ratios** reproduce (MINDE 5.9×; α=1.0 ≈0.88–0.91×), so
  the conclusion ("zero cost, marginally faster; MINDE 5.9× regression") holds — but the specific ns
  figures are machine/run-variable and should be presented as ratios or with a "non-deterministic" caveat.
- **[low] Citation drift.** (a) `constants.ts:409-453` — `GAMUT_SECTOR_COEFFICIENTS` actually begins at
  **`:431`**; and the probe also depends on `OKLAB_TO_LMS_COEFF` / `LMS_TO_LINEAR_SRGB`, which live
  *outside* 409-453. The "constants verbatim from :409-453" line under-cites; faithfulness is instead
  established empirically by the reproducing probe. (b) §7 says update `gamut.ts:247` — the second
  "alpha=0.05" doc string is at **`:246`** (off-by-one). (c) `dispatch.ts:371-444` — the function runs
  371-446; fine.

---

## Bottom line

The verdict (**α=1.0, one constant, self-limiting, reject MINDE + gamut-relative**) is correct and will
survive both fixes. Fix #1 is a factual mislabel that would mislead the implementer about what
`dispatch.ts:371` does; fix #2 makes the safety claim *bounded* rather than *sampled*. Neither overturns
α=1.0. With those two closed and the minors swept, this is ratifiable.

**Convergence: 84%.**
