import { test, expect } from "@playwright/test";
import { ATMOSPHERE_TESTID } from "../fixtures/webgl-appearance";
import { sampleRegion, meanRgb, srgbToOklch } from "../fixtures/frame-diff";

/**
 * T.W2 · W2-2 — THE GROUND-LUMA LEAP GATE (T.W2.md §Hard gate 2; SYNTHESIS §3
 * T.W2-2 [AMENDED-AT-HARDENING M-7]).
 *
 * The measured defect (t-aurora-boot F-2): the pre-W2 ground was the derived
 * palette's DEEPEST stop as a flat slab (L≈0.35); when the field faded in,
 * the page LEAPED to the field's mean (L≈0.6–0.75) — |ΔL| ≈ 0.25, the
 * born-RED reference. W2-2's cure: the ground IS the field's own GRADIENT,
 * so ground → field is one material and the boot's L trajectory is flat.
 *
 * The gate (wave-open numbers, PP-10 tighten-only):
 *   • inter-beat |ΔL| ≤ 0.10 — over the B0→B2 window, no two consecutive
 *     samples of the field region differ by more than 0.10 OKLab L;
 *   • monotone-toward-terminal — the trajectory never overshoots past the
 *     settled field's L and doubles back by more than the noise band (0.03);
 *   • per-frame ≤ 0.04 holds BY CONSTRUCTION: every ground move rides the
 *     200ms registered-<color> transition, so a ≤0.10 inter-beat step spreads
 *     over ~12 frames (≤0.009 L/frame) — recorded here, asserted at the
 *     sample cadence this harness can honestly reach (~250ms).
 *
 * Returning-user precondition (the natural path, as O-2): a first visit at a
 * vivid seed persists through the app's own write-through; the bare reload
 * is the measured boot.
 */

const SEED = "oklch(0.7 0.18 145)"; // vivid green — luma structure unmistakable
const INTER_BEAT_DL_MAX = 0.1;
const MONOTONE_NOISE = 0.03;
const SAMPLES = 10;
const SAMPLE_GAP_MS = 250;

test("W2-2 ground-luma — the boot's L trajectory is flat/monotone (no slab→field leap)", async ({
    page,
}) => {
    test.setTimeout(45_000);

    // ── Prime the returning session via the app's own write-through.
    await page.goto("/#/?space=oklch&color=" + encodeURIComponent(SEED));
    await expect(
        page.getByRole("main", { name: "Color tool panes" }),
    ).toBeVisible();
    await expect
        .poll(
            () =>
                page.evaluate(() => {
                    try {
                        const rec = JSON.parse(
                            localStorage.getItem("color-picker-ground") ?? "null",
                        ) as { stops?: string[] } | null;
                        return rec?.stops?.[0] ?? null;
                    } catch {
                        return null;
                    }
                }),
            { timeout: 8000 },
        )
        .toMatch(/^#[0-9a-f]{6}$/i);

    // ── The measured boot: bare reload; sample the field region's L from as
    //    early as the harness can reach through the settle.
    await page.goto("/", { waitUntil: "commit" });
    const canvas = page.getByTestId(ATMOSPHERE_TESTID);
    const series: number[] = [];
    for (let i = 0; i < SAMPLES; i++) {
        try {
            // Early samples may precede the canvas mount — fall back to the
            // page's own top band (the body ground; same material by law).
            const box = await canvas.boundingBox().catch(() => null);
            const img = box
                ? await sampleRegion(page, canvas)
                : await sampleRegion(page, page.locator("body"));
            const [r, g, b] = meanRgb(img);
            series.push(srgbToOklch(r, g, b).L);
        } catch {
            /* pre-paint sample — skip */
        }
        await page.waitForTimeout(SAMPLE_GAP_MS);
    }

    console.log(
        `[W2-2 luma] L series: [${series.map((l) => l.toFixed(3)).join(", ")}]`,
    );
    expect(series.length, "no boot frames sampled").toBeGreaterThanOrEqual(5);

    // Inter-beat bound: no consecutive-sample leap > 0.10 L (born-RED ref ≈0.25).
    for (let i = 1; i < series.length; i++) {
        const dL = Math.abs(series[i] - series[i - 1]);
        expect(
            dL,
            `ground-luma leap |ΔL|=${dL.toFixed(3)} between samples ${i - 1}→${i} exceeds the 0.10 inter-beat bound (F-2 class; series ${series.map((l) => l.toFixed(3)).join(",")})`,
        ).toBeLessThanOrEqual(INTER_BEAT_DL_MAX);
    }

    // Monotone-toward-terminal: the trajectory closes on the settled L without
    // doubling back beyond the noise band.
    const terminal = series[series.length - 1];
    let extremeGap = 0;
    for (let i = 1; i < series.length; i++) {
        const gapNow = Math.abs(terminal - series[i]);
        const gapPrev = Math.abs(terminal - series[i - 1]);
        extremeGap = Math.max(extremeGap, gapNow - gapPrev);
    }
    expect(
        extremeGap,
        `the boot L trajectory doubles back from the terminal by ${extremeGap.toFixed(3)} (> ${MONOTONE_NOISE} noise band) — not monotone toward the field`,
    ).toBeLessThanOrEqual(MONOTONE_NOISE);
});
