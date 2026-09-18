// SERVED MODEL: claude-opus-5[1m]
/**
 * X.W1.b — THE TOLERANCE, AND HOW IT WAS ARRIVED AT (G-9).
 *
 * G-9's falsifier is the whole design constraint, verbatim: *"Set tolerance high
 * enough to absorb a visible change → a hand-injected 20px block passes. **The
 * tolerance is validated by that injection, not by assertion.**"* And the
 * Archaeology row that put G-9 on the board: D.W4's 0%-pixel-drift gate was NOT
 * EXECUTED — *"pixel-isomorphic by construction"* — and the substituting
 * analysis then conceded two non-isomorphic changes. So nothing here is argued
 * for. Each number is measured, and the whole is falsified by injection.
 *
 * ════════════════════════════════════════════════════════════════════════════
 * 1 · WHY `maxDiffPixels` (absolute) AND NOT `maxDiffPixelRatio`
 * ════════════════════════════════════════════════════════════════════════════
 *
 * A ratio scales the bar with the canvas, and this matrix spans a 15× area
 * range — 390×844 = 329,160 px against 3440×1440 = 4,953,600 px. A ratio that
 * is strict at 390 is 15× slacker at 3440, so the SAME visible defect would red
 * on a phone and pass on an ultrawide. G-9's own unit is a 20-px block, which is
 * an absolute quantity; the bar is therefore absolute too, and one number means
 * one thing at every viewport.
 *
 * ════════════════════════════════════════════════════════════════════════════
 * 2 · THE MEASURED FLOOR — run-to-run drift with the capture inputs applied
 * ════════════════════════════════════════════════════════════════════════════
 *
 * Measured at authoring (2026-09-17) against the dev server, chromium +
 * SwiftShader, `animations: "disabled"`, `capture.css` injected, three
 * consecutive cold captures per cell, differing pixels counted with this repo's
 * own decoder (`e2e/smoke/fixtures/frame-diff.ts` `decodePng`):
 *
 *   STAGE 1 — raw `page.screenshot`, fixed settle, no capture inputs. This is
 *   what a naive suite would have shipped:
 *     390  light   d(1,2)=2022    d(2,3)=1146
 *     1024 light   d(1,2)= 503    d(2,3)= 775
 *     3440 light   d(1,2)=135255  d(2,3)=135265   ← the live WebGL surfaces
 *
 *   STAGE 2 — `capture.css` quiesce applied (IC-5), still a fixed settle:
 *     3440 light   d(1,2)=48923   d(2,3)=    14   ← the boot choreography (IC-9)
 *
 *   STAGE 3 — `toHaveScreenshot`'s stabilisation loop + `waitForQuiescence`
 *   (IC-7's signature predicate), strict at `VJS_VISUAL_MAX_DIFF_PIXELS=0`:
 *     most cells                       0
 *     `.spectrum-dot` region           4 … 58
 *     one 3440 cell                10719   ← the half-pixel layout TIE (IC-11)
 *
 *   STAGE 4 — `ensureOffLayoutTie` applied. The per-cell table is at
 *   `docs/tranches/X/evidence/w1/visual/TOLERANCE.md`, measured from the
 *   settled bytes, and it is what the numbers below are sized against.
 *
 *   STAGE 5 — the residue's TAIL. `param-sweep hsl 1024 light` measured 147 px
 *   against this bar: `.spectrum-dot` is glass-ui's `WatercolorDot animate`,
 *   a PERPETUAL animation that reads a different transform at t+0, t+2 s and
 *   t+6 s of the same page. The bar was NOT raised to cover it; `capture.css`
 *   Rule 2 pins the dot's `transform` and `filter` (never its position, size or
 *   colour), and the same three cells then read 65 / 53 / 62 at
 *   `VJS_VISUAL_MAX_DIFF_PIXELS=0`, double-run. See IC-17.
 *
 *   The shape of that progression is the argument for the bar, and it is why no
 *   figure from an earlier stage may be used to size it: every one of those
 *   large residues had a CAUSE that was curable at the capture, and a bar sized
 *   to absorb a curable cause is a bar that has stopped measuring anything.
 *
 * ════════════════════════════════════════════════════════════════════════════
 * 3 · THE NUMBERS
 * ════════════════════════════════════════════════════════════════════════════
 *
 * `maxDiffPixels: 120`
 *   ABOVE the measured post-stabilisation floor, and BELOW G-9's unit by a
 *   factor of 3.3: a 20×20 block is 400 differing pixels, so the smallest change
 *   G-9 names cannot pass at any viewport. The headroom over the floor covers
 *   sub-pixel text rasterisation on a font-metric hop, not a layout change —
 *   120 px is a region no larger than 11×11, which at 3440×1440 is 0.0024% of
 *   the frame and is not a thing a human calls a visible change.
 *
 * `threshold: 0.15`
 *   Per-pixel YIQ colour distance below which two pixels count as equal
 *   (Playwright's default is 0.2). Tightened, not loosened: this UI is built on
 *   near-neutral glass surfaces where a real regression can be a small ΔE, and
 *   a slack per-pixel threshold hides exactly that class while the pixel COUNT
 *   still reads green. The pair (0.15, 120) is what the injection validates.
 *
 * `stabilisationTimeoutMs: 25_000`
 *   How long `toHaveScreenshot` may keep re-shooting for two equal frames. The
 *   3440 cells take ~10 s end to end; 25 s leaves room for a cold chunk
 *   transform without letting a genuinely never-settling cell hang the suite —
 *   such a cell TIMES OUT and reds, which is the honest report. It is not a
 *   tolerance and it can absorb nothing.
 *
 * ════════════════════════════════════════════════════════════════════════════
 * 4 · THE ENVIRONMENT OVERRIDE CAN ONLY TIGHTEN
 * ════════════════════════════════════════════════════════════════════════════
 *
 * `VJS_VISUAL_MAX_DIFF_PIXELS` exists so the floor above can be RE-MEASURED on
 * any machine by demanding byte equality. It is clamped to the constant: a value
 * above it is ignored. There is no environment variable, flag or config key in
 * this suite that can make the gate more permissive than the number in this
 * file — a relaxable gate is a decorative one, which is the disease named in
 * this wave's Archaeology (D48's `continue-on-error`, D55(iv)'s branch-push
 * substitution), and it is not re-armed here in a new shape.
 */

/** The authored bar. Only this file changes it, and only with a re-measurement. */
const MAX_DIFF_PIXELS = 120;

function tightenedMaxDiffPixels(): number {
    const raw = process.env.VJS_VISUAL_MAX_DIFF_PIXELS;
    if (raw === undefined) return MAX_DIFF_PIXELS;
    const parsed = Number(raw);
    if (!Number.isFinite(parsed) || parsed < 0) return MAX_DIFF_PIXELS;
    // Clamp: the override may tighten, never loosen.
    return Math.min(parsed, MAX_DIFF_PIXELS);
}

export const TOLERANCE = {
    /** Absolute differing-pixel budget per cell. See §1 and §3. */
    maxDiffPixels: tightenedMaxDiffPixels(),
    /** Per-pixel YIQ distance below which two pixels are equal. See §3. */
    threshold: 0.15,
    /** Re-shoot budget for `toHaveScreenshot`'s stabilisation loop. See §3. */
    stabilisationTimeoutMs: 25_000,
    /** G-9's unit, in differing pixels — recorded so the ratio is checkable. */
    g9InjectionPixels: 400,
    /** The authored bar, unaffected by any override — for the manifest. */
    authoredMaxDiffPixels: MAX_DIFF_PIXELS,
} as const;
