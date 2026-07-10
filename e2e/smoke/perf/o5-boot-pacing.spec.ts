import { test, expect } from "@playwright/test";
import {
    installFrameCollector,
    readFrames,
    percentile,
    waitMs,
    detectRenderer,
} from "./frame-budget";

/**
 * T.W0 W0-5 · O-5 — PACING VARIANCE (software-invariant; SYNTHESIS §6.1 O-5,
 * AMENDED-AT-HARDENING h-refine-doctrine F-5).
 *
 * The renderer-independent JITTER red line the F4 draw-count/frame probes lacked.
 * Over the boot window (B0→B4) at normal CPU:
 *
 *   • no inter-frame delta > 3× the window's MEDIAN frame time  (a spike gate)
 *   • dropped-frame ratio ≤ 10%   (drop = delta > 2× median)
 *
 * Both are RATIO metrics relative to the window's own median, so they are
 * SOFTWARE-INVARIANT (uniform software-raster slowness raises the median AND the
 * bound together — only a genuine SPIKE fails), which is exactly why this runs on
 * the smoke-perf built bundle (the §6.2 substrate; the dev server's Vite
 * transform bursts would inject false spikes — see the webServer note).
 *
 * ── BORN-RED BY DESIGN: the born-RED reference is the recorded 44→315ms hole
 *    chain (a ~7× spike). The overture that PACES the boot does not exist yet
 *    (pre-W2), so today's unstructured boot spikes on the pane-mount → the 3×
 *    band fails. `test.fail()` records the honest red WITHOUT reddening CI and
 *    flips when the cure lands. NOT softened — the frame deltas are real.
 *
 * ── CURE WAVE: **W2-3 (the overture beat sheet)** paces the boot window; O-5 is
 *    a W2 gate row (SYNTHESIS §3 T.W2). Remove test.fail() when W2-3 lands.
 *    Exact numbers re-recorded at wave-open per PP-10, tighten-only.
 */

const SPIKE_RATIO = 3; // no delta > 3× median
const DROP_RATIO = 2; // a "dropped" frame is > 2× median
const DROP_FRACTION_MAX = 0.1; // ≤ 10% dropped

test("O-5 boot pacing — no jitter spike over the boot window", async ({ page }) => {
    // BORN-RED: the boot is unstructured pre-overture (the 44→315ms hole class).
    // Cured at W2-3 (the overture beat sheet). Remove test.fail then.
    test.fail();
    test.setTimeout(30_000);

    await installFrameCollector(page);
    await page.goto("/");
    await expect(
        page.getByRole("main", { name: "Color tool panes" }),
    ).toBeVisible();

    // The boot window B0→B4 — the first ~4s of real-time boot rendering.
    await waitMs(page, 4000);
    const frames = (await readFrames(page)).filter((d) => d > 0);
    expect(frames.length, "no boot frames captured").toBeGreaterThan(10);

    const median = percentile(frames, 50);
    const maxDelta = Math.max(...frames);
    const dropped = frames.filter((d) => d > DROP_RATIO * median).length;
    const dropFraction = dropped / frames.length;
    const renderer = await detectRenderer(page);
    console.log(
        `[O-5] renderer=${renderer} frames=${frames.length} median=${median.toFixed(1)}ms max=${maxDelta.toFixed(1)}ms (${(maxDelta / median).toFixed(1)}× median) dropped=${dropped} (${(dropFraction * 100).toFixed(1)}%)`,
    );

    expect(
        maxDelta,
        `boot jitter spike ${maxDelta.toFixed(1)}ms = ${(maxDelta / median).toFixed(1)}× median (> ${SPIKE_RATIO}×) — the 44→315ms hole class, cured at W2-3`,
    ).toBeLessThanOrEqual(SPIKE_RATIO * median);
    expect(
        dropFraction,
        `dropped-frame ratio ${(dropFraction * 100).toFixed(1)}% > ${DROP_FRACTION_MAX * 100}%`,
    ).toBeLessThanOrEqual(DROP_FRACTION_MAX);
});
