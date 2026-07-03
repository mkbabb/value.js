# CERT — gamut-bound (Tranche R, Pass-3 certification)

**Certifier** · 2026-07-02 · target: `docs/tranches/R/audit/pass2/gamut-bound.md`
**Verdict: CERTIFIED. Convergence 100%. mustFix empty.**
**Prior:** pass-2 critic scored 97% with an EMPTY mustFix ("co-signable"). No PASS2-VERDICT §3 backlog row (M1–M7) targets this item — gamut-bound is named in §3's "Not in the backlog (empty-mustFix, co-signable as-is)" line.

---

## 1 — mustFix discharge audit (the certification obligation)

**There were zero mustFix rows against gamut-bound.** CRIT-gamut-bound §6/bottom-line: "mustFix: empty." PASS2-VERDICT §1 (row) + §3-bottom confirm it. So the only pass-3 obligation is: (a) confirm the empty-mustFix ruling still holds, (b) confirm the one mechanical change the discharge DID apply to this file — the M2/W0-14 hoist provenance header — is accurate and introduced no error, (c) spot-check load-bearing citations.

The three cosmetic residuals the pass-2 critic explicitly ruled below-the-bar (CRIT §6): MINDE band "~6–7×" wording, the §2.2 hue-210 example not hue-matched to rec2020's blue-264 cite, "five vs six identifiers". Per the certification rule these do NOT block, and none reappears elevated.

## 2 — The one pass-3 change to this file (M2 / W0-14 hoist header) — VERIFIED CLEAN

`gamut-bound.md:1` is a new provenance header added by lane L2-kf1-reverify (L2 report §4). It claims: worktree base `15b0382` (stale), measurement-equivalent to head `e80b359` — the `gamut.ts` delta across `15b0382..e80b359` is "one appended P-era function, `GAMUT_ALPHA` core untouched; nothing re-runs."

Independently verified in the live tree:
- `git diff --stat 15b0382 e80b359 -- src/units/color/gamut.ts` → **61 insertions, 0 deletions** (one appended function). ✓
- `git diff 15b0382 e80b359 -- src/units/color/gamut.ts | grep -i GAMUT_ALPHA` → **empty** — the `GAMUT_ALPHA` constant and the adaptive-anchor mechanism are untouched. ✓

The header's measurement-equivalence claim is FACT. The hoist is byte-faithful (L2 §4: "byte-faithful"); the report body is otherwise unchanged from the pass-2 text the 97% critic already co-signed. No error introduced.

## 3 — Load-bearing citation spot-check (live tree, this pass)

Every citation the implementer builds against, re-read at `e80b359`:

| Cite in gamut-bound | Live tree | Status |
|---|---|---|
| `gamut.ts:242` `const GAMUT_ALPHA = 0.05;` | line 242 exact | ✓ |
| `gamut.ts:5` + `:246` doc "alpha=0.05" (pass-1 `:247` off-by-one) | `:5` and `:246` exact; `:247` is not the doc line | ✓ correction stands |
| `gamut.ts:269-271` `Ld = L−0.5; e1 = 0.5+|Ld|+α·C; L0 = …` | lines 269/270/271 exact | ✓ |
| `dispatch.ts:371` `gamutMapToRgbSpace` opens; returns `:443`, closes `:444` | opens 371, `return color2(clamped,…)` at 443, `}` at 444 | ✓ |
| `dispatch.ts:352` `CHROMA_SEARCH_STEPS = 24` | line 352 exact; loop bisects on it at `:415` | ✓ |
| `constants.ts:431` `GAMUT_SECTOR_COEFFICIENTS` begins; `:409` LMS_TO_LINEAR_SRGB, `:423` OKLAB_TO_LMS_COEFF outside the array | 431 / 409 / 423 exact | ✓ |

The §5 label correction (the runtime `dispatch.ts:371` egress is variant **c1** hold-L/H reduce-to-fit, NOT §13.2 MINDE variant **b**) is re-confirmed structurally: the `:415` loop bisects chroma on `CHROMA_SEARCH_STEPS`; there is no `deltaEOK`/JND stopping test in the loop. The correction is sound and load-bearing for the implementer's "do not route sRGB through the bisection" reasoning.

## 4 — New-defect scan

None. The α-tune-wins verdict spine, the measured tiered bound (0.050 realistic / 0.083 super-gamut, gate honestly missed), the refuted knee, the ratios-not-ns cost framing, and the citation sweep are all intact and reproduce (the pass-2 critic re-ran the probe to the digit; I re-verified the source citations the probe and the recommendation depend on). No discharge touched this file's body, so no discharge could have introduced a regression here — and the one header it did add is verified accurate (§2). The exact-change block (§7: `gamut.ts:242` `0.05→1.0`, plus the `:5-6`/`:246` doc updates) points at the correct, live lines.

## 5 — Certification

- Every prior mustFix (none existed) is discharged by construction.
- The single pass-3 mutation (hoist header) is verified accurate against the live git delta.
- All load-bearing citations resolve exactly in the live tree.
- No new blocking defect; the below-the-bar cosmetic residuals remain cosmetic and do not recur elevated.

Per the certification rule, the score IS 100.

**Convergence: 100%. mustFix: empty. CERTIFIED as the R.W1 head — a two-option Q7 owner decision (recommend α=1.0).**
