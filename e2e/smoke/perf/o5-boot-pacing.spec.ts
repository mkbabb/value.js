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
 *    chain (a ~7× spike). `test.fail()` records the honest red WITHOUT
 *    reddening CI. NOT softened — the frame deltas are real.
 *
 * ── W2-3 RE-MEASURE (the overture landed; T.W2 §Hard gate 7, HONESTLY RED):
 *    post-overture built-bundle numbers — median 25.0ms · dropped 5.3%
 *    (≤10% — THE PILE-UP LEG IS GREEN: the five-clock race + About/blob pops
 *    are gone, appearance is beat-gated) · max spike 399.9ms = 16× median —
 *    THE SPIKE LEG STAYS RED. The surviving hole is the ONE eager-payload
 *    mount task (the 347.9 KiB gz eager index — RP-2), not a choreography
 *    clock: the overture cannot spread a synchronous framework mount; the
 *    payload cure is W7's (L20 `/blob/config` + GAP-L5 — the Q14 chain).
 *    Re-measure at the W7 adopt; flip then. A red stays red with its cite.
 */

const SPIKE_RATIO = 3; // no delta > 3× median
const DROP_RATIO = 2; // a "dropped" frame is > 2× median
const DROP_FRACTION_MAX = 0.1; // ≤ 10% dropped

test("O-5 boot pacing — no jitter spike over the boot window", async ({ page }) => {
    // HONESTLY RED (W2-3 re-measure): the pile-up leg is green; the spike leg
    // reds on the ONE eager-payload mount task (RP-2 → W7). Remove at W7.
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
