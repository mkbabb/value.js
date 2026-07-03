# CRIT — proto-gamut-overlay (pass1)

**Critic pass:** 2026-07-02 · target `scratchpad/pass1/proto-gamut-overlay.md` · corpus `docs/tranches/R/audit/pass1/`
**Convergence: 88%** — the prototype's core mandate (budget + render path) is discharged with genuinely strong evidence, and its two spec corrections (F1 vacuity, F2 JND-locus) are mathematically right and independently verified. But the F1 reinterpretation silently invalidates a treatment beat it never mentions (zero-drop breach), leaves the signature moment's default-state visibility unconfronted, and carries two small citation errors.

---

## (a) Factual grounding — spot-checks against the live trees

| Claim | Verdict |
|---|---|
| `gamut.ts:55` `DELTA_E_OK_JND = 0.02` | **EXACT** (`src/units/color/gamut.ts:55`) |
| `gamut.ts:251` `gamutMapOKLab` · `:370` `oklchToXYZTuple` | **EXACT** (verified both) |
| `SpectrumCanvas.vue:208-224` two stacked linear-gradients = HSV in sRGB | **CONFIRMED** — `demo/@/components/custom/color-picker/controls/SpectrumCanvas.vue:215-217`; the black-overlay × white→hue composite is algebraically exact HSV in gamma-encoded sRGB (result = v·((1−s)+s·hueRGB) per channel). The bijection→vacuity argument (F1) holds. |
| rAF gate `SpectrumCanvas.vue:94-105` | **CONFIRMED** (`scheduleSpectrumUpdate`, lines 94–105) |
| F5: "the **exact** `spectrumDotStyle` luma logic (…, threshold **0.45**)" | **ERROR (minor).** Source `SpectrumCanvas.vue:230-231` uses `luma > 0.5`; the sandbox (`OverlayCanvas.vue:108`) uses `luma < 0.45`. The formula v·(1−s/2) matches; the threshold does not. Either adopt 0.5 for parity or drop the word "exact" and justify 0.45. |
| F8.1: matrices module-private at `xyz-extended.ts:44,85,93,109` | **SUBSTANCE CONFIRMED, lines drifted.** Actual: `RGB_XYZ_MATRIX:46`, `DISPLAY_P3_XYZ_MATRIX:88`, `XYZ_DISPLAY_P3_MATRIX:93`, `XYZ_D50_PROPHOTO_MATRIX:109`. All non-exported `const` — the re-inline claim is true. Fix 44→46, 85→88. |
| Sandbox worktree files | **CONFIRMED** — all 8 named files present at `.claude/worktrees/wf_a8d3e05b-52e-11/sandbox/gamut-overlay/`; `geometry.ts:146` implements exactly the F2 field (deltaEOK − DELTA_E_OK_JND). |
| Screenshots | **CONFIRMED** — all 7 named PNGs at `scratchpad/pass1/shots/`. |
| Spec anchors: SYNTHESIS prototype-table row (:217), §2.1 render-path-by-prototype (:43), §2.3 one-field-two-consumers fusion (:49-50) | **EXACT** — F2's "same computation the ColorInput echo wants" correctly tracks SYNTHESIS §2.3. |
| Treatment anchors `color-picker.md` :13/:69-76/:105-107/:126/:130 | **CONFIRMED** — all quoted text found at cited lines. |
| `@mkbabb/glass-ui/watercolor-dot` subpath | **CONFIRMED** (`glass-ui/package.json:423-426`). |
| F6 cusp→(1,1) corner | **CONFIRMED analytically** — the sRGB max-chroma cusp color is a saturated cube-boundary color ⇒ HSV s=1,v=1 by construction. Dropping the on-plate marker is right. |
| Perf numbers | Self-reported, not re-run; internally consistent (node probe 0.286 ms agrees with browser 0.20–0.27 ms mean), scoped honestly (1440×900, dpr 2, incl. 4× throttle). Accepted. |

## (b) Precept fidelity — CLEAN

- No src/demo/api modification; sandbox isolated in a worktree; screenshots in scratchpad. Read-only discipline held.
- F1's v1 scoping (wide-RGB only, defer oklch-extension) is proper KISS; F7's accept-bisection-defer-marching-squares likewise.
- F8.1's `sampleGamutBoundary` in `src/units/color/` is the right altitude (engine owns geometry; demo consumes — makes the SYNTHESIS §2.1 claim literally true, no matrix re-derivation contrivance). F8.2's `Into` variant cites real P-tranche precedent (`color2Into`). Neither is gold-plating.
- New tokens (`--gamut-edge-paper`) land in demo `style.css :root` — the treatment's sanctioned token home, not a glass-ui bypass (this is picker measurement chrome, not a reusable primitive).
- WebGL rejection (F4) is precept-sound: refusing a wrong-truth shader approximation over a 0.02 ms canvas is anti-contrivance, not timidity.

## (c) Staleness — CURRENT

Depends on glass-ui only via the WatercolorDot subpath (live at 4.2.0; BG's aurora-metal/dock-fission lanes don't touch it). No kf coupling. parse-that irrelevant. The report post-dates SYNTHESIS and corrects it rather than trailing it. No stale pins cited.

## (d) Completeness / zero-drop — TWO GAPS

1. **The `sRGB ⊣` snap-resist beat is silently orphaned.** The treatment carries it four times as signature material (`color-picker.md:113` MICRO 4 "snap-resist for ~6px…`sRGB ⊣`", :126, :141, :150). Under F1, **every point of the square is in sRGB by construction** — "a drag would carry the color past the gamut edge" can never occur; the beat's trigger condition is as vacuous as the literal contour. The report amends the contour's semantics but never re-derives (or explicitly kills/re-specs) the resist-tick that depends on the old semantics. Zero-drop requires the amendment to say what happens to it — e.g., resist when the dot crosses the JND contour while a wide target is active, with the label naming the *target* (`p3 ⊣`), or a recorded kill.
2. **Default-state visibility of the signature is unconfronted.** F1's product wiring keys the overlay to `selectedColorSpace` ∈ wide-RGB. If the picker's default space is sRGB-family (likely), the "one unforgettable thing" (treatment :13) renders NOTHING for a first-time visitor — the signature moment becomes an easter egg behind a space-dropdown selection. The report's own F3 data suggests the honest alternative: default the instrument's target to display-p3 ("what your display can show vs what sRGB can name") independent of the picked space. Either answer may be right; the amendment must table the question for R.W3 ratification rather than leave the treatment's central promise contingent on an unexamined default.

Deferral-ledger sample: F1's oklch-extension deferral and F7's marching-squares deferral are both recorded with triggers — no silent drops there. The graticule grid (SPATIAL 2) is CSS-only, legitimately out of the prototype's mandate.

## (e) Over-scoping — NONE FOUND

The report stays inside its SYNTHESIS mandate (budget + render path) and produces spec amendments, not spec expansion. F8 library asks are 2 small items riding waves already planned (R.W1 2.0.0 cut exists per SYNTHESIS :75). One nit, not blocking: F8.1 leaves "export matrices OR ship sampleGamutBoundary" as an either/or — the amendment should commit to the latter (it argues for it itself) and name the wave it lands in.

## mustFix

1. **F1 amendment must re-specify or explicitly kill the `sRGB ⊣` snap-resist beat** (treatment :113/:126/:141/:150) — its trigger is vacuous under the wide-target reinterpretation; zero-drop demands a disposition.
2. **Table the overlay's default-target question**: wired to `selectedColorSpace` (signature invisible in the default sRGB state) vs a display-p3 instrument default — surface for R.W3 ratification with the F3 measurements as evidence.
3. **Correct two citations**: F5 "exact…threshold 0.45" → source `SpectrumCanvas.vue:230-231` uses 0.5 (state and justify the divergence, or adopt 0.5); F8.1 line numbers 44→46, 85→88 in `conversions/xyz-extended.ts`.
4. **Commit F8.1's either/or** to `sampleGamutBoundary` (the report's own argument) and name its landing wave (R.W1 2.0.0 cut vs R.W3).

## Verdict

A high-quality, evidence-dense prototype report whose two central corrections (F1/F2) are verified sound and whose render-path call is defensible on every axis; it needs one zero-drop repair (the orphaned resist beat), one design-tension surfaced (default-state visibility), and two citation corrections before it is ratifiable.
