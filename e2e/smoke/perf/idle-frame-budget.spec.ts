import { test, expect } from "@playwright/test";
import {
    GATE,
    SOFT_CEIL,
    detectRenderer,
    isSoftwareGL,
    installFrameCollector,
    resetFrames,
    readFrames,
    percentile,
    waitMs,
} from "./frame-budget";

/**
 * S.W3 ORACLE — TRANSITION FAMILY (c): IDLE PICKER (blob mounted).
 *
 * §6.2 gate: idle picker frame p50 ≤ 13 ms (with the blob mounted; the blob-off
 * floor is 11.5 ms). Baseline: 18.6 ms p50 (54 fps) — the hero blob's WebGL loop
 * cost ~7 ms on EVERY mounted frame, even fully idle. Cured by W3-3: HeroBlob
 * parks the renderer's `paused` seam after N ms of no colour/pointer activity, so
 * an idle picker runs at the display's vsync floor (measured on the built bundle,
 * real GPU: 8.3 ms p50 — the blob adds ~0 to an idle frame once parked).
 *
 * ─── N — THE IDLE THRESHOLD ───────────────────────────────────────────────────
 * N === HeroBlob.vue BLOB_IDLE_MS === 2000 ms (kept in lock-step with the
 * blob-park draw-plateau oracle, webgl-goo-blob-idle.spec.ts). Per §Hard-gate 5
 * the idle SAMPLING WINDOW MUST EXCEED N — else the sample straddles the still-
 * live pre-park window and the ≤13 ms idle gate fails on correct true-idle
 * behaviour. We anchor the idle countdown with ONE interaction, wait PAST N for
 * the park, THEN sample the frame cadence over a window that itself exceeds N.
 * The `expect(SAMPLE_WINDOW_MS).toBeGreaterThan(N)` below makes the > N contract
 * a runtime assertion, not just a comment.
 * ──────────────────────────────────────────────────────────────────────────────
 *
 * RENDERER-AWARE. On a real GPU we assert the exact §6.2 ≤13 ms; on the standing
 * SwiftShader harness (idle floor ~40 ms — a software compositor cap, unrelated
 * to the park) we assert a thrash ceiling + the > N window and LOG p50 against
 * the gate. The park itself is proven engine-independently by the draw-plateau
 * oracle; this spec measures the idle-frame CADENCE the park unlocks.
 */
// T.W4-5 (PI-4): the park-latency contract lives in the ONE shared fixture.
import {
    BLOB_IDLE_MS as N,
    PARK_SETTLE_MS,
    SAMPLE_WINDOW_MS,
} from "../fixtures/blob-timing";

test("idle picker frame budget: p50 ≤ 13ms with the blob mounted, window > N (built-bundle gate)", async ({
    page,
}) => {
    // The > N contract (§Hard-gate 5), asserted at runtime — not just prose.
    expect(
        SAMPLE_WINDOW_MS,
        "idle sampling window must exceed the W3-3 idle threshold N",
    ).toBeGreaterThan(N);

    await installFrameCollector(page);
    await page.goto("/#/picker");

    const renderer = await detectRenderer(page);
    const soft = isSoftwareGL(renderer);

    // The blob must be mounted for this to mean anything (the gate is
    // "with the blob mounted").
    await expect(page.getByTestId("goo-blob-canvas").last()).toBeAttached();

    // Anchor the idle countdown: ONE spectrum interaction changes the colour
    // (resets HeroBlob's idle timer AND wakes the blob live). From here we do
    // NOT interact again, so after N ms the loop parks.
    const spectrum = page.getByRole("img", { name: /Color spectrum/ }).last();
    await expect(spectrum).toBeVisible();
    const box = await spectrum.boundingBox();
    if (!box) throw new Error("spectrum canvas not laid out");
    await page.mouse.click(box.x + box.width * 0.5, box.y + box.height * 0.5);

    // Wait PAST N (+ margin) with no further activity — the loop parks.
    await waitMs(page, PARK_SETTLE_MS);

    // Sample the idle frame cadence over a window that EXCEEDS N.
    await resetFrames(page);
    await waitMs(page, SAMPLE_WINDOW_MS);
    const frames = await readFrames(page);

    const p50 = percentile(frames, 50);
    const p95 = percentile(frames, 95);

    console.log(
        `[frame-budget:idle] renderer=${soft ? "SOFTWARE-GL" : "REAL-GPU"} ` +
            `(${renderer})\n` +
            `  N=${N}ms window=${SAMPLE_WINDOW_MS}ms (> N ✓) frames=${frames.length} ` +
            `p50=${p50.toFixed(1)}ms p95=${p95.toFixed(1)}ms\n` +
            `  §6.2 GATE: idle p50 ≤ ${GATE.idleP50Ms}ms (blob mounted)` +
            `${soft ? "  [asserted on real GPU — see w3-frame-budget-measure.md]" : ""}`,
    );

    expect(frames.length, "no idle frames sampled — collector dead").toBeGreaterThan(0);

    if (soft) {
        // Software-GL: a liveness floor + a loose HANG guard only. The per-frame
        // idle p50 under software raster is dominated by the aurora WebGL surface
        // (25-100 ms run-to-run), not the parked blob — so the ≤13 ms cadence gate
        // is asserted on hardware, and here we only prove the rAF loop keeps
        // ticking (not frozen) and doesn't run into a multi-hundred-ms hang.
        expect(
            frames.length,
            `only ${frames.length} idle frames over ${SAMPLE_WINDOW_MS}ms — the rAF loop stalled`,
        ).toBeGreaterThanOrEqual(SOFT_CEIL.idleMinFrames);
        expect(
            p50,
            `software-GL idle p50 ${p50.toFixed(1)}ms over the ${SOFT_CEIL.idleP50Ms}ms hang guard`,
        ).toBeLessThanOrEqual(SOFT_CEIL.idleP50Ms);
    } else {
        expect(
            p50,
            `idle picker frame p50 ${p50.toFixed(1)}ms over the §6.2 ≤${GATE.idleP50Ms}ms gate (blob mounted) — the idle-gate is not parking the WebGL loop`,
        ).toBeLessThanOrEqual(GATE.idleP50Ms);
    }
});
