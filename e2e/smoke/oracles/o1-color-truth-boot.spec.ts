import { test, expect } from "@playwright/test";
import { ATMOSPHERE_TESTID } from "../fixtures/webgl-appearance";
import { detectRenderer, isSoftwareGL } from "../perf/frame-budget";
import { sampleRegion, meanRgb, srgbToOklch } from "../fixtures/frame-diff";

/**
 * T.W0 W0-5 · O-1 — COLOR-TRUTH BOOT (SYNTHESIS §6.1 O-1). ARMED AT W2-1.
 *
 * Replaces the DRAW-CALL-COUNT proxy (webgl-appearance) — a draw-count cannot
 * tell a vivid derived field from an achromatic slab. O-1 reads the settled,
 * post-hydration field pixels and asserts the DERIVED material:
 *
 *   • C ≥ 0.03            — never an achromatic slab (the HARD non-proxy core)
 *   • hue within ±30° of the derived seed's hue — the seed's FAMILY, never the
 *     default pick's (the W2-1 hydration-before-derivation gate; GAP-ARM's
 *     demo half dead ⇒ the sampled family is the seed's)
 *   • L inside the active scheme's band — dark [0.18, 0.72] (the L2 lBand);
 *     light [0.35, 0.95] (the derive's shipped light band, recorded at mint;
 *     PP-10 tighten-only)
 *
 * ── W2-1 ARMING NOTE: the W0 mint logged hue and asserted a generous L band;
 *    the tight bands armed with the ordering law (T.W2 · W2-1). Under
 *    software-GL the read samples the CSS-gradient placeholder — itself the
 *    SAME derived palette — so the family assertion is honest on this runner;
 *    the authoritative real-shader read is the O-3 headed annex.
 */

const SEED = "oklch(0.66 0.16 28)"; // mid-chroma warm seed, hue ≈ 28°
const SEED_HUE = 28;
const HUE_TOL = 30;

/** Circular hue distance in degrees. */
function hueDelta(a: number, b: number): number {
    const d = Math.abs(a - b) % 360;
    return d > 180 ? 360 - d : d;
}

test("O-1 color-truth — the settled boot field is the DERIVED seed's material", async ({
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
        `[O-1] renderer=${renderer} (${isSoftwareGL(renderer) ? "software-GL CSS placeholder" : "real-GPU"}) sample rgb=(${r.toFixed(0)},${g.toFixed(0)},${b.toFixed(0)}) → OKLCh L=${L.toFixed(3)} C=${C.toFixed(3)} h=${h.toFixed(1)}° (seed h≈${SEED_HUE}°)`,
    );

    // HARD (the draw-count proxy's repair): the field is chromatic.
    expect(
        C,
        `boot field is an achromatic slab (C=${C.toFixed(3)} < 0.03) — the exact appearance blindness the draw-count proxy had`,
    ).toBeGreaterThanOrEqual(0.03);

    // ARMED AT W2-1 — the hue family: the field is the SEED's material, never
    // the default pick's (the GAP-ARM demo-half kill made observable).
    expect(
        hueDelta(h, SEED_HUE),
        `boot field hue ${h.toFixed(1)}° is outside ±${HUE_TOL}° of the derived seed's ${SEED_HUE}° — the field is not the seed's material (GAP-ARM class)`,
    ).toBeLessThanOrEqual(HUE_TOL);

    // ARMED AT W2-1 — the dark-scheme L band ([0.18, 0.72], the L2 lBand).
    expect(
        L,
        `boot field L=${L.toFixed(3)} outside the dark band [0.18, 0.72]`,
    ).toBeGreaterThanOrEqual(0.18);
    expect(L).toBeLessThanOrEqual(0.72);
});
