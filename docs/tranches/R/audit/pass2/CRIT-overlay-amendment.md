# CRIT — overlay-amendment (pass 2)

**Critic pass:** 2026-07-02 · target `docs/tranches/R/audit/pass2/overlay-amendment.md` · ancestor proto-gamut-overlay (88%) + `CRIT-proto-gamut-overlay.md` mustFix 1–4 · binding rows PASS1-VERDICT §5 P0#4, P2#14, §4.3/§4.4
**Convergence: 93%** — all four ancestor mustFixes genuinely discharged (re-spec, not paraphrase), every load-bearing citation spot-checked EXACT, owner-map discipline clean. One residual old-semantics phrase in the treatment (`color-picker.md:140`) falsifies the packet's own §0 zero-orphan claim and needs a one-phrase sweep before merge.

---

## (a) Factual grounding — spot-checks against the live trees

| Claim | Verdict |
|---|---|
| `DEFAULT_COLOR_SPACE = "oklch"` at `demo/@/components/custom/color-picker/index.ts:37` | **EXACT** (line 37; default input is `lab(92% 88.8 20 / 82.70%)` at :36 — both unbounded/lab-family, reinforcing the packet's "Option A renders nothing at first paint" argument) |
| `SpectrumCanvas.vue:231-233` — `luma = v·(1−s·0.5)`, flip at `luma > 0.5` | **EXACT** (luma :231, `borderAlpha`/`borderColor` flips :232-233). The packet's cite is *more* accurate than PASS1-VERDICT P2#14's `:230-231`. |
| `spectrumStyle` at `SpectrumCanvas.vue:208-224`; rAF gate `:94-105` | **EXACT** (`const spectrumStyle` :208, closes :224; `scheduleSpectrumUpdate` :94-105) |
| `gamut.ts:55` JND = 0.02; `:251` `gamutMapOKLab` | **EXACT** (both re-verified; note `GAMUT_ALPHA` is still 0.05 — the α=1.0 head is R.W1, packet makes no contrary claim) |
| `RGB_XYZ_MATRIX` `xyz-extended.ts:46`; `DISPLAY_P3_XYZ_MATRIX:88`; `XYZ_DISPLAY_P3_MATRIX:93`; `XYZ_D50_PROPHOTO_MATRIX:109` | **EXACT** — the P2#14 cite correction (44→46, 85→88) is done and right; all four remain module-private `const` |
| Sandbox 0.45 divergence at `OverlayCanvas.vue:108` | **EXACT** (`.claude/worktrees/wf_a8d3e05b-52e-11/sandbox/gamut-overlay/OverlayCanvas.vue:107-108` — `luma` :107, `dark = luma < 0.45` :108) |
| F3 measured hues (p3: red 74.7% / magenta 82.7% / yellow 21.9% / blue 0.0%) | **EXACT** vs `scratchpad/pass1/proto-gamut-overlay.md:37` |
| Cusp readout `cusp L 0.968 C 0.211`; innermost-point 9px crosshair; 96-column bisection | **EXACT** vs proto F6 (:47-48) and geometry spec (:61,:65) |
| Perf claims in P7 (≈0.3 ms unthrottled, ~7× inside <2 ms, zero drops at 120 Hz under 4× throttle) | **CONSISTENT** with PASS1-VERDICT §2.3 (0.3 ms; 1.6 ms worst at 4×) |
| Treatment anchor lines: P1 `:13` · P2 `:27` (both quoted strings) · P3 `:69-76` · P4 `:105` · P6 `:113` · P7 `:122-131` · P8 `:141` · P9 `:149-150` · P10 `:157` | **ALL EXACT** — every REPLACE target's quoted old text found verbatim at the cited line of the current `docs/frontend-design/color-picker.md` |

## (b) mustFix discharge — the ancestor's 4 + the verdict's rows

1. **CRIT-proto mustFix 1 (re-spec or kill snap-resist)** — **DISCHARGED, properly.** §1 is a real re-derivation, not a label swap: trigger moved to the ΔE>JND contour (outbound only), the impossible "resist before clamping" replaced by a detent-not-wall with the model value held (so the resistance is physical, not cosmetic), degenerate no-contour state made consistent with the absent line, PRM discipline split correctly (detent = user-driven state; label fade = gated), and crossing detection costed at zero new geometry. All four treatment occurrences (:113/:126→P7/:141/:150) get mergeable text.
2. **CRIT-proto mustFix 2 / P0#4 (table the default-target)** — **DISCHARGED.** §2 is a genuine two-option decision table armed with the F3 numbers, takes an argued position (B-with-override) while explicitly tabling ratification for R.W3, and carries the tabled flag *into the merged treatment text* (P7 parenthetical) so the open question survives the merge. The Option-A blindness argument is strengthened by an independent verification the ancestor lacked: the shipped default space is `oklch` — outside the v1 wide-RGB scope entirely, so under Option A the signature is unreachable even by the sRGB-default assumption the pass-1 critic made.
3. **CRIT-proto mustFix 3 / P2#14 (F5 0.5 + F8.1 cites)** — **DISCHARGED.** 0.5 adopted on source parity with the right implementation posture (*share the function, don't copy the constant* — joins the MICRO-1 shared helper; anti-drift, idiomatic); both matrix cites corrected and re-verified by this pass.
4. **CRIT-proto mustFix 4 (commit the F8.1 either/or + landing wave)** — **DISCHARGED with correct ownership.** Commits to `sampleGamutBoundary`, names R.W1, and defers the exact signature/return shape to the boundary-api lane (PASS1-VERDICT §7 seed 5 / P1#10) — the packet writes the treatment to consume, deciding nothing that lane owns. §6's owner map makes this explicit.

## (c) Precept fidelity — CLEAN

- **No legacy/workaround:** the detent is corrected physics, not a shim over the dead trigger; the beat's design value transfers to true geometry. The kill-vs-re-spec argument (§1) is honest about what died (the physics) and what survives (the haptic).
- **Design-system:** the four tokens land in demo `style.css :root` per DESIGN.md:11 — picker measurement chrome, not a glass-ui bypass (already ruled sanctioned by the pass-1 critic (b)).
- **No over-scoping:** §6 declines the boundary-api surface, the lens ratification, the oklch-extension, and final caption copy. The packet stays a treatment amendment.
- **KISS:** P3's dual ink/paper token pair is prototype-proven necessity (single-ink disappears on dark substrate), not gold-plating.

## (d) Staleness — CURRENT

No glass-ui version coupling in the packet (WatercolorDot untouched; BG's aurora-metal/dock-fission lanes don't intersect). No kf coupling. The `oklch` default-space verification is fresh against the live tree at `e80b359`.

## (e) Gaps

1. **Residual old-semantics phrase at `color-picker.md:140` — the §0 zero-orphan claim is falsified.** The § Design-verdict-reconciliation TEMPERED bullet reads "…MATHEMATICS (**the sRGB gamut boundary** + perceptual isostep graticule made beautifully visible)." Under the packet's own standard (it renamed `sRGB ⊣` precisely because "sRGB is everywhere on this square"), "the sRGB gamut boundary" drawn on the plate is the F1-vacuous framing. P8 amends :141 and appends a corrective bullet to the *same section*, but the merged doc would still carry a pillar description contradicting the corrected instrument (the drawn line is the display-p3-exceeds-sRGB ΔE>JND contour). §7's ledger does not list :140. Cure: extend P8 with a one-phrase REPLACE — e.g. "the wide-gamut truth line (display-p3 vs sRGB, ΔE>JND) + perceptual isostep graticule made beautifully visible."
2. *(Nit, not blocking)* The packet numbering skips **P5** (P4 → P6). No content is missing — the §0 dispositions and §7 ledger account for every beat — but the gap invites a "was a passage dropped?" question at merge time; renumber or footnote.
3. *(Nit, not blocking)* The treatment's pre-existing `spectrumDotStyle:230-235` cites at :110/:151 are slightly off (`spectrumDotStyle` spans :226-243; the luma logic is :231-233) — outside this packet's charter (the sweep was scoped to F5/F8.1) but a candidate for the R.W3 merge pass.

## mustFix

1. **Sweep `color-picker.md:140`** — extend P8 with a one-phrase replacement of "the sRGB gamut boundary" in the MATHEMATICS pillar clause to the wide-target JND-contour framing, and add the row to the §7 ledger, restoring the §0 "no orphaned occurrence" claim to truth.

## Verdict

The amendment closes the pass-1 gap in substance: all four ancestor mustFixes and the two binding verdict rows (P0#4, P2#14) are discharged by real work — corrected physics, an evidence-armed tabled decision that survives into the merged text, source-parity threshold with an anti-drift implementation posture, and a committed API consumption with clean lane ownership. Every load-bearing cite verified exact, several improved over pass 1. One one-phrase residual at :140 stands between this packet and co-signature; with that swept, it is ratifiable as written.
