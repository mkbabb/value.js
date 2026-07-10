import { test, expect } from "@playwright/test";
import { ATMOSPHERE_TESTID } from "../fixtures/webgl-appearance";
import { detectRenderer, isSoftwareGL } from "../perf/frame-budget";
import { sampleRegion, meanRgb, srgbToOklch } from "../fixtures/frame-diff";

/**
 * T.W0 W0-5 · O-1 — COLOR-TRUTH BOOT (SYNTHESIS §6.1 O-1).
 *
 * Replaces the DRAW-CALL-COUNT proxy (webgl-appearance) — a draw-count cannot
 * tell a vivid derived field from an achromatic slab. O-1 reads the settled,
 * post-hydration field pixels and asserts it is actually COLOURED:
 *
 *   • C ≥ 0.03            — never an achromatic slab (the HARD non-proxy core;
 *                            the exact repair of the draw-count proxy)
 *   • L in the active scheme's band — a plausible aurora luminance (asserted at
 *     a GENEROUS [0.08, 0.92] band at W0; the tight dark [0.18, 0.72] L2 band
 *     arms at W2 with the real-shader read, PP-10 tighten-only)
 *   • hue within ±30° of the derived seed — LOGGED at W0 (the ±30° gate needs the
 *     W2 derive-hue reference; recorded here as the measurement of record)
 *
 * ── BORN-GREEN-PENDING-W2 (annotated, never conflated with a live red): the
 *    achromatic-slab defect is NOT live at the SETTLED frame today — S.W6's
 *    cold-load fix lands the derived field, so the settled read is chromatic.
 *    O-1's FIRST-FRAME + tight-band + hue-±30° gate arms at W2 (the ordering
 *    defect O-1 shares with O-2/O-4 is the pre-settle flash, not the settled
 *    colour). Under software-GL the read samples the CSS-gradient placeholder
 *    (itself derived from the palette), so the chromatic assertion is honest on
 *    this runner; the authoritative real-shader read is the O-3 headed annex.
 */

const SEED = "oklch(0.66 0.16 28)"; // mid-chroma warm seed, hue ≈ 28°

test("O-1 color-truth — the settled boot field is chromatic, not an achromatic slab", async ({
    page,
}) => {
    test.setTimeout(30_000);
    // Seed the scheme deterministically (O-1 is the appearance oracle, not the
    // real-hydration path oracle — that is O-2; here a fixed scheme makes the
    // L-band assertion deterministic).
    await page.addInitScript(() =>
        localStorage.setItem("vueuse-color-scheme", "dark"),
    );

    await page.goto("/#/?space=oklch&color=" + encodeURIComponent(SEED));
    await expect(
        page.getByRole("main", { name: "Color tool panes" }),
    ).toBeVisible();

    const renderer = await detectRenderer(page);
    const canvas = page.getByTestId(ATMOSPHERE_TESTID);
    await expect(canvas).toBeAttached();
    // Settle: let the derive-in entrance + first stable frames land.
    await page.waitForTimeout(2500);

    const img = await sampleRegion(page, canvas);
    const [r, g, b] = meanRgb(img);
    const { L, C, h } = srgbToOklch(r, g, b);
    console.log(
        `[O-1] renderer=${renderer} (${isSoftwareGL(renderer) ? "software-GL CSS placeholder" : "real-GPU"}) sample rgb=(${r.toFixed(0)},${g.toFixed(0)},${b.toFixed(0)}) → OKLCh L=${L.toFixed(3)} C=${C.toFixed(3)} h=${h.toFixed(1)}° (seed h≈28°)`,
    );

    // HARD (the draw-count proxy's repair): the field is chromatic.
    expect(
        C,
        `boot field is an achromatic slab (C=${C.toFixed(3)} < 0.03) — the exact appearance blindness the draw-count proxy had`,
    ).toBeGreaterThanOrEqual(0.03);

    // Generous luminance band at W0 (tight dark [0.18,0.72] arms at W2).
    expect(
        L,
        `boot field L=${L.toFixed(3)} outside the plausible aurora band [0.08, 0.92]`,
    ).toBeGreaterThanOrEqual(0.08);
    expect(L).toBeLessThanOrEqual(0.92);
});
