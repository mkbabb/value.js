import { test, expect } from "@playwright/test";
import {
    instrumentWebglDraws,
    GOO_BLOB_TESTID,
    lastCanvasDrawCount,
} from "./fixtures/webgl-appearance";

/**
 * W3-3 (S.W3) — the blob idle-gate proof (perf-transitions P0-2; §6.2 "0
 * un-gated idle rAF"; §6.1 hard-gate item 5).
 *
 * The hero blob's WebGL render loop costs ~7ms on EVERY mounted frame, even
 * fully idle — the picker default-view floor sits at 54fps vs the blob-off
 * 85fps. `HeroBlob.vue` drives the renderer's existing `paused` seam after N ms
 * of no colour/pointer activity so the loop PARKS (the substrate's `manual`
 * suspend). This spec proves the park with the buffer-/timing-independent
 * draw-call oracle: after N ms of true idle the blob's WebGL draw count
 * PLATEAUS. A live un-gated loop would keep adding draws (the audit measured a
 * continuous per-frame tax); a parked loop adds ~zero.
 *
 * N — THE IDLE THRESHOLD — mirrors `HeroBlob.vue`'s `BLOB_IDLE_MS`. Per §6.1 the
 * idle sampling window MUST EXCEED N, else the sample straddles the still-live
 * pre-park window and the ≤13ms idle gate fails on correct true-idle behaviour.
 * We anchor the idle countdown with one interaction, wait PAST N for the park,
 * THEN sample the draw count over a window that itself exceeds N.
 *
 * Keep this constant in lock-step with `HeroBlob.vue`'s `BLOB_IDLE_MS`.
 */
const BLOB_IDLE_MS = 2000; // === HeroBlob.vue BLOB_IDLE_MS
const PARK_SETTLE_MS = BLOB_IDLE_MS + 1500; // wait past N for the loop to park
const SAMPLE_WINDOW_MS = BLOB_IDLE_MS + 500; // the idle sampling window (> N, §6.1)
// A couple of straggler frames may land as the park engages (the "before"
// sample can be captured one frame ahead of the final park frame); a live loop
// would add HUNDREDS over the window, so a small slack cannot mask a regression.
const PARKED_DRAW_SLACK = 5;

/** Read-only wall-clock wait (the reactivity/safari-spec `performance.now()` idiom). */
async function waitMs(page: import("@playwright/test").Page, ms: number): Promise<void> {
    const start = await page.evaluate(() => performance.now());
    await page.waitForFunction(
        (a) => performance.now() - a.start >= a.ms,
        { start, ms },
        { timeout: ms + 3_000, polling: 250 },
    );
}

test("hero blob parks its WebGL loop after N ms idle (0 un-gated idle rAF)", async ({
    page,
}) => {
    await instrumentWebglDraws(page);
    await page.goto("/");

    await expect(page.getByTestId(GOO_BLOB_TESTID).last()).toBeAttached();

    // Warm-up: the blob must actually render before a plateau means anything.
    await expect
        .poll(() => lastCanvasDrawCount(page, GOO_BLOB_TESTID), {
            timeout: 10_000,
            message: "goo-blob never drew — cannot measure the idle-gate",
        })
        .toBeGreaterThan(0);

    // Anchor the idle countdown: one spectrum interaction changes the colour,
    // which resets HeroBlob's idle timer (its `watch(cssColorOpaque)` activity
    // signal) AND wakes the blob live. From here we do NOT interact again.
    const spectrum = page.getByRole("img", { name: /Color spectrum/ }).last();
    await expect(spectrum).toBeVisible();
    const box = await spectrum.boundingBox();
    if (!box) throw new Error("spectrum canvas not laid out");
    await page.mouse.click(box.x + box.width * 0.5, box.y + box.height * 0.5);

    // Wait past N (+ margin) with no further activity — the loop parks.
    await waitMs(page, PARK_SETTLE_MS);

    // Sample the draw count across a window that EXCEEDS N (§6.1): a parked loop
    // adds ~0 draws; an un-gated loop would add hundreds.
    const before = await lastCanvasDrawCount(page, GOO_BLOB_TESTID);
    await waitMs(page, SAMPLE_WINDOW_MS);
    const after = await lastCanvasDrawCount(page, GOO_BLOB_TESTID);

    expect(
        after - before,
        `blob drew ${after - before} frames over ${SAMPLE_WINDOW_MS}ms of true idle — the render loop is NOT parked (W3-3 idle-gate regressed)`,
    ).toBeLessThanOrEqual(PARKED_DRAW_SLACK);
});
