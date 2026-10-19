import { test, expect } from "@playwright/test";
import { mainPane } from "../fixtures/dock";
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
 *    (≤10% — THE PILE-UP LEG WAS GREEN: the five-clock race + About/blob pops
 *    are gone, appearance is beat-gated) · max spike 399.9ms = 16× median —
 *    THE SPIKE LEG STAYED RED, booked then to the ONE eager-payload mount task
 *    (the 347.9 KiB gz eager index — RP-2) and to a payload cure "W7" would
 *    bring. That W7 was V-prime's and is dead. THE PAYLOAD CURE LANDED HERE,
 *    at X-W2 unit a (13f4ddc2): the glass blob barrel left the eager graph and
 *    the eager JS set fell 32,790 B gz to 280,811 B (274.2 KiB), under its
 *    untouched 286,720 B bar. The prophecy is discharged; the numbers below
 *    replace it.
 *
 * ── X-W2 RE-MEASURE, 2026-09-17 (post-payload-cure; STILL HONESTLY RED).
 *    Built bundle on :8091, headless SwiftShader, pin recorded in
 *    docs/tranches/X/evidence/W2/AFTER.json. Ten sittings of this spec;
 *    the one that reached the assertion read:
 *      median 140.7ms · MAX SPIKE 2625.0ms = 18.7× median (bar 3×) — SPIKE LEG
 *      RED · dropped 25.0% (bar ≤10%) — THE PILE-UP LEG IS RED TOO NOW.
 *    TODAY'S CAUSE IS NOT THE PAYLOAD. Measured, four probes of the same
 *    collector plus a longtask census (receipt:
 *    docs/tranches/X/evidence/W2/o5-remeasure.txt):
 *      • the whole 4,000ms window holds exactly ONE main-thread long task,
 *        139–238ms — the Vue mount, ending by 250ms;
 *      • ZERO long tasks lie INSIDE the 2,450–2,733ms max frame gap, 4 of 4;
 *      • the gap is stable ±6% across host load 22.8→46.6, so it is not host
 *        noise either;
 *      • the hero engine is not a candidate — its chunk is not fetched and
 *        `goo-blob-canvas` is absent before 4,000ms; both arrive at 4–8s.
 *    So the surviving spike is a ~2.5s presentation-side rAF/BeginFrame stall
 *    carrying NO main-thread work, on a software-GL compositor. §ENV: "the
 *    real-GPU oracle is CC-029 / X-W1, not this wave." X-W1 (CC-031) rules the
 *    DISPOSITION of this `test.fail()` as a class; X-W2 supplied the payload
 *    cure and this measurement. A red stays red with its cite.
 *
 *    (Recorded beside it, not cured: this window yields only 7–12 rAF frames
 *    on SwiftShader, so `frames.length > 10` below fails in 9 of 10 sittings.
 *    Lowering that guard would be a narrowed assertion and is forbidden.)
 */

const SPIKE_RATIO = 3; // no delta > 3× median
const DROP_RATIO = 2; // a "dropped" frame is > 2× median
const DROP_FRACTION_MAX = 0.1; // ≤ 10% dropped

test("O-5 boot pacing — no jitter spike over the boot window", async ({ page }) => {
    // ── X-W1 · G-6 RULING — `test.fail()` REMOVED; the assertion stands real,
    // and it is RED.
    //
    // X-W2's own note asked for this: *"X-W1 (CC-031) rules the DISPOSITION of
    // this `test.fail()` as a class; X-W2 supplied the payload cure and this
    // measurement. A red stays red with its cite."* The ruling, applied: the
    // assertion is real, so the marker goes and the leg reds with its cite. The
    // surviving spike is a ~2.5s presentation-side rAF/BeginFrame stall carrying
    // NO main-thread work on a software-GL compositor (X-W2's four-probe
    // longtask census, `docs/tranches/X/evidence/W2/o5-remeasure.txt`); its cure
    // is not X-W1's, and neither is lowering the `frames.length > 10` guard,
    // which X-W2 records as forbidden.
    test.setTimeout(30_000);

    await installFrameCollector(page);
    await page.goto("/");
    await expect(mainPane(page)).toBeVisible();

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
        `boot jitter spike ${maxDelta.toFixed(1)}ms = ${(maxDelta / median).toFixed(1)}× median (> ${SPIKE_RATIO}×) — the 44→315ms hole class; re-measured at X-W2 (2026-09-17), cause is presentation-side, not payload`,
    ).toBeLessThanOrEqual(SPIKE_RATIO * median);
    expect(
        dropFraction,
        `dropped-frame ratio ${(dropFraction * 100).toFixed(1)}% > ${DROP_FRACTION_MAX * 100}%`,
    ).toBeLessThanOrEqual(DROP_FRACTION_MAX);
});
