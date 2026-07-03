# CERT — overlay-amendment (pass 3, certification)

**Certifier pass:** 2026-07-02 · target `docs/tranches/R/audit/pass2/overlay-amendment.md` (amended-at-pass-3 by lane L3-doc-sweeps) · pass-2 score 93 · binding rows: `CRIT-overlay-amendment.md` mustFix 1 (+ optional nits 2–3) ≡ `PASS2-VERDICT.md` §3 M5
**Convergence: 100% — CERTIFIED, co-signable.** The sole pass-2 mustFix is discharged in the amended text exactly as ordered; both optional nits were folded in the same motion; every load-bearing citation re-verified EXACT against the live trees this pass; the discharge introduced no new error.

---

## (a) mustFix discharge — verified in the text, not the lane report's word

| Row | Ordered | Found in the amended text | Verdict |
|---|---|---|---|
| CRIT #1 / M5, clause 1 | Extend P8 with a one-phrase REPLACE of "the sRGB gamut boundary" in the `:140` MATHEMATICS pillar clause → the wide-target JND-contour framing | P8 (`overlay-amendment.md:161-165`): a `[pass-3]`-marked REPLACE of the exact parenthetical, new text "the wide-gamut truth line — display-p3 vs sRGB, ΔE>JND — + perceptual isostep graticule made beautifully visible" (the verdict's suggested wording, adopted verbatim), plus a rationale sentence naming the F1-vacuity standard and the falsified §0 claim | **DISCHARGED** |
| CRIT #1 / M5, clause 2 | Add the row to the §7 zero-drop ledger, restoring the §0 "no orphaned occurrence" claim to truth | §7 (`overlay-amendment.md:206`): new `[pass-3]` row for `:140`, explicitly named as "the row this ledger omitted at pass 2" | **DISCHARGED** |
| CRIT nit 2 (optional) | Renumber the P4→P6 gap **or** footnote it | Footnote at `overlay-amendment.md:125`: P5 declared intentionally absent (F5/F8.1 are §4 citation-sweep beats, not standalone passages); un-renumbered per the critic's explicit either/or, preserving the P6–P10 cross-references in §0/§6/§7 | **DISCHARGED** (footnote branch) |
| CRIT nit 3 (optional) | Note the `spectrumDotStyle` span for the R.W3 merge pass | Note appended after the §7 table (`overlay-amendment.md:213`): live span `:226-243` recorded, the one stale in-treatment cite (`:110` → `spectrumDotStyle:230-235`) named, `:29` recorded as already correct, flagged R.W3-merge-pass, correctly left outside this packet's F5/F8.1 charter | **DISCHARGED** |

Provenance line added (`overlay-amendment.md:3`) and accurate: no prior content struck; the file is the pass-2 packet plus the pass-3 sweep.

## (b) Citation spot-checks against the live trees (this pass, independent)

| Claim | Verdict |
|---|---|
| P8 pass-3 REPLACE target: `MATHEMATICS (the sRGB gamut boundary + perceptual isostep graticule made beautifully visible)` verbatim + **unique** in `docs/frontend-design/color-picker.md:140` (grep -c = 1) | **EXACT** |
| P8 second target at `:141`: "The `sRGB ⊣` snap-resist tick, the cursor halo, and the perceptual-isostep graticule are tasteful, proportionate signature refinements" | **EXACT** |
| All other REPLACE anchors — P1 `:13` · P2 `:27` (both quoted clauses) · P4 `:105` · P6 `:113` · P9 `:149-150` · P10 `:157` | **ALL EXACT** (re-read verbatim this pass) |
| `DEFAULT_COLOR_SPACE = "oklch"` at `demo/@/components/custom/color-picker/index.ts:37` (lab default input `:36`) | **EXACT** |
| `SpectrumCanvas.vue`: `scheduleSpectrumUpdate` rAF gate `:94-105` · `spectrumStyle` `:208-224` · `spectrumDotStyle` spans `:226-243` with `luma = v·(1−s·0.5)` at `:231`, flip `luma > 0.5` at `:232-233` | **EXACT** — confirms both the packet's cites and the pass-3 §7 note's span claim |
| §7 note's cite-audit: `color-picker.md:29` cites `spectrumDotStyle:226-243` (correct); `:110` cites `spectrumDotStyle:230-235` (stale); `:151` carries **no numeric cite** ("share `spectrumDotStyle` logic" only) — so the CRIT nit's ":110/:151" pairing resolves only at `:110`, exactly as the amended note records | **EXACT** |
| `src/units/color/gamut.ts:55` `DELTA_E_OK_JND = 0.02` · `:251` `gamutMapOKLab` | **EXACT** |
| `xyz-extended.ts` matrices: `RGB_XYZ_MATRIX:46` · `DISPLAY_P3_XYZ_MATRIX:88` · `XYZ_DISPLAY_P3_MATRIX:93` · `XYZ_D50_PROPHOTO_MATRIX:109` — all module-private `const` | **EXACT** |
| Sandbox 0.45 divergence: `.claude/worktrees/wf_a8d3e05b-52e-11/sandbox/gamut-overlay/OverlayCanvas.vue:107-108` (`luma` :107, `dark = luma < 0.45` :108) | **EXACT** |
| F3 measured hues (p3: red 74.7% / magenta 82.7% / yellow 21.9% / blue 0.0%), F6 cusp readout `cusp L 0.968 C 0.211` + 9px innermost crosshair, F7 96-column bisection + rAF-gate reuse — vs `scratchpad/pass1/proto-gamut-overlay.md` F3/F6/F7 | **EXACT** (proto lives at the session scratchpad `/private/tmp/claude-504/…/scratchpad/pass1/proto-gamut-overlay.md`; the packet's relative cite form matches pass-2 usage) |
| Footnote's own claim: packet numbering runs P1–P4, P6–P10 with F5/F8.1 folded into §4 + P3/P7 cites | **ACCURATE** (verified against the file's headings and §4/P3/P7 content) |

## (c) Did the discharge introduce a new error? — NO

- The REPLACE wording is the verdict's own, adopted verbatim; the "— + —" join is the source clause's structure, not a new artifact.
- The footnote's placement (between P3 and the P4 heading, though the numbering gap follows P4) is mildly unconventional but factually harmless and self-explaining.
- The §7 note makes only claims I independently reproduced (span, `:29`/`:110`/`:151` states); nothing over-claims.
- No prior packet content was altered beyond the four ordered/permitted touches; §0, §1–§6, P1–P10 pass-2 content stands byte-comparable except the marked insertions.

## (d) Residuals examined and ruled non-blocking (for the record)

1. **`color-picker.md:141`, first sentence** — "The breathing sRGB gamut boundary is reframed as a *delight drawn over* the kept square" survives all P8 REPLACEs. Examined against the :140 precedent and ruled **untouched-safe, not an orphan**: it is a historical record of the pass-1 design-verdict's reframing act (verdict clauses 3+4) inside the chronological reconciliation section, explicitly superseded two bullets later by P8's appended AMENDED bullet ("The literal 'sRGB boundary over the square' was vacuous…"); unlike :140's forward-standing MATHEMATICS *pillar definition*, it defines nothing an implementer builds from — every build-bearing passage (P1/P3/P6/P7/P9/P10) carries the corrected geometry. The pass-2 critic demonstrably read this bullet in full (quoted and partially replaced it) and named only :140. Candidate for the same R.W3 merge-pass phrase-tidy as the `:110` stale cite; does not block certification.
2. The previously-ruled-below-the-bar cosmetics (P4 heading's "final two sentences" vs its single-clause quote; the footnote placement) remain below the bar.

## Verdict

**CERTIFIED at 100.** Every pass-2 mustFix row targeting this item (CRIT-overlay-amendment.md #1 ≡ PASS2-VERDICT §3 M5, including both optional nits) is discharged in the amended text itself; every load-bearing citation — including all ten treatment REPLACE anchors and both pass-3 targets — re-verified EXACT against the live trees; the discharge introduced no new error, and no new defect exists that would change what an implementer builds. The packet's mustFix is empty; it is co-signable as written and ready for R.W3 merge + lens ratification (Q11) on its stated terms.
