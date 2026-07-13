import { test, expect } from "@playwright/test";
import { ATMOSPHERE_TESTID } from "../fixtures/webgl-appearance";
import { detectRenderer, isSoftwareGL } from "../perf/frame-budget";
import { sampleRegion, meanAbsDiff } from "../fixtures/frame-diff";

/**
 * T.W0 W0-5 · O-26 — AURORA PERCEPTIBILITY (render, not atoms). BORN-RED.
 *
 * SYNTHESIS §6.1 O-26 [AMENDED-AT-HARDENING h-oracle-slate F-1]: the non-proxy
 * oracle for T-25/T-26. Its numbered stand-in O-6 is an atom-envelope PROXY that
 * the known-broken shader passes; O-26 measures the RENDERED FIELD instead — a
 * frame-diff (mean abs 8-bit diff) over the live aurora region:
 *
 *   • 2s glance-pair  <  2/255   (calm — the field does not strobe)
 *   • 10s window      ≥  4/255   (unmistakable migration — the field MOVES)
 *   • 60s non-recurrence: no two 5s-apart window-pairs < 1/255 (headed annex —
 *     the sustained probe belongs to O-3's headed-GPU cadence, not this CI row;
 *     the CI probe asserts the calm + migration bands, §5-D2 defaults-with-
 *     brackets, re-recorded at wave-open per PP-10, tighten-only).
 *
 * ── BORN-RED BY DESIGN. Today's field is a STILL: the aurora breath is
 *    sub-perceptual (±3.25%, diff 1.17–1.78/255 on neutral seeds), two of three
 *    pointer axes are structurally dead on smooth, and marigold-for-gray floors
 *    the vividness — the T-25/T-26 defect surface. So the 10s migration band
 *    FAILS against the current tree. `test.fail()` records that honest red
 *    WITHOUT reddening CI, and — the tripwire — FLIPS the suite red the moment
 *    the cure lands and the field genuinely migrates, forcing the annotation's
 *    removal. It is NOT softened to a warn; the assertions are real and fail.
 *
 * ── CURE WAVE: **W2-5 (T-26 in-bracket calibration)** lands the full T-26
 *    composition (chroma-adaptive hueSpread [24°,64°], energy 0.76, one
 *    counterpoint stop, softmaxBeta 4, breath 26s) that makes the migration
 *    perceptible; O-26 is a W2-5 / T-25 / T-26 GATE row. When W2-5 lands, delete
 *    the `test.fail()` and this oracle becomes the hard perceptibility gate.
 *
 * ── RENDERER NOTE: under headless software-GL the atmosphere takes the
 *    CSS-gradient placeholder path (a static gradient — definitionally a still),
 *    so the born-RED is honest on THIS runner too, but the AUTHORITATIVE
 *    perceptibility measurement is the O-3 headed real-GPU annex (owner-attested,
 *    both schemes). The renderer is logged so the record names which path ran.
 */

const MID_C_SEED = "oklch(0.66 0.16 28)"; // a mid-chroma warm seed (the T-26 judge family)

// The perceptibility bands, in mean-abs 8-bit units (SYNTHESIS §6.1 O-26 states
// them as N/255; the metric is already the mean absolute 8-bit sample difference,
// so the thresholds ARE N). PP-10 re-recordable at wave-open, tighten-only.
const CALM_MAX = 2; // < 2 over a 2s glance
const MIGRATION_MIN = 4; // ≥ 4 over the 10s window

test("O-26 aurora perceptibility — the field migrates unmistakably over 10s", async ({
    page,
}) => {
    // BORN-RED: the current field is a still (sub-perceptual breath + dead pointer
    // axes + marigold-for-gray). Cured at W2-5 (T-26 full composition); remove
    // this annotation then. See the file docstring.
    test.fail();
    test.setTimeout(45_000);

    await page.goto(
        "/#/?space=oklch&color=" + encodeURIComponent(MID_C_SEED),
    );
    await expect(
        page.getByRole("main", { name: "Color tool panes" }),
    ).toBeVisible();

    const renderer = await detectRenderer(page);
    console.log(
        `[O-26] renderer=${renderer} (${isSoftwareGL(renderer) ? "software-GL — CSS placeholder still; authoritative read is the O-3 headed annex" : "real-GPU"})`,
    );

    const canvas = page.getByTestId(ATMOSPHERE_TESTID);
    await expect(canvas).toBeAttached();
    // Let boot + the derive-in entrance settle before measuring migration.
    await page.waitForTimeout(2500);

    // ── CALM: a 2s glance pair must not strobe.
    const c0 = await sampleRegion(page, canvas);
    await page.waitForTimeout(2000);
    const c1 = await sampleRegion(page, canvas);
    const calmDiff = meanAbsDiff(c0, c1);
    console.log(`[O-26] calm 2s glance diff = ${calmDiff.toFixed(3)}/255`);
    expect(
        calmDiff,
        `field strobes over a 2s glance (${calmDiff.toFixed(3)} ≥ ${CALM_MAX}/255)`,
    ).toBeLessThan(CALM_MAX);

    // ── MIGRATION: over a 10s window the field must MOVE (the born-RED band).
    const m0 = await sampleRegion(page, canvas);
    await page.waitForTimeout(5000);
    const m1 = await sampleRegion(page, canvas);
    await page.waitForTimeout(5000);
    const m2 = await sampleRegion(page, canvas);
    const migration = Math.max(
        meanAbsDiff(m0, m1),
        meanAbsDiff(m1, m2),
        meanAbsDiff(m0, m2),
    );
    console.log(
        `[O-26] 10s migration diff (max pairwise) = ${migration.toFixed(3)}/255 (need ≥ ${MIGRATION_MIN})`,
    );
    expect(
        migration,
        `aurora field does not migrate perceptibly over 10s (${migration.toFixed(3)} < ${MIGRATION_MIN}/255) — the T-25/T-26 still, cured at W2-5`,
    ).toBeGreaterThanOrEqual(MIGRATION_MIN);
});
