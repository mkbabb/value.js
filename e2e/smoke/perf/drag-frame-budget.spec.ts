import { test, expect } from "@playwright/test";
import {
    GATE,
    SOFT_CEIL,
    detectRenderer,
    isSoftwareGL,
    installFrameCollector,
    resetFrames,
    readFrames,
    readLongTasks,
    percentile,
} from "./frame-budget";

/**
 * S.W3 ORACLE — TRANSITION FAMILY (a): SLIDER-DRAG (the colour fan-out).
 *
 * §6.2 gate: slider-drag frame p50 ≤ 20 ms · 0 long tasks > 50 ms in-drag.
 * Baseline: 49.8 ms p50 (~20 fps, 31/44 janked) — the tranche's #1 perf target,
 * cured by W3-1's rAF-coalesced colour → atmosphere fan-out (one derive/frame).
 *
 * The drive is the L-channel slider scrub (the reactivity-instant.spec.ts idiom),
 * which fans a single channel change out to the spectrum + all four channel
 * tracks + the numeric readout + the aurora seed + the blob palette every step —
 * the exact fan-out W3-1 coalesces. We measure rAF inter-frame deltas AND
 * long-task durations across the scrub.
 *
 * RENDERER-AWARE (see frame-budget.ts docstring): on a real GPU we assert the
 * exact §6.2 numbers (verified on the built bundle at wave close: p50 8.3 ms,
 * 0 long tasks); on the standing SwiftShader harness we assert a freeze/thrash
 * ceiling and LOG p50 against the ≤20 ms gate — a recorded caveat, never a
 * silent re-baseline.
 */
test("slider-drag frame budget: p50 ≤ 20ms · 0 long tasks > 50ms (built-bundle gate)", async ({
    page,
}) => {
    await installFrameCollector(page);
    await page.goto("/#/picker");

    const renderer = await detectRenderer(page);
    const soft = isSoftwareGL(renderer);

    const slider = page.getByRole("slider", { name: "L channel" }).first();
    await expect(slider).toBeVisible();
    const box = await slider.boundingBox();
    if (!box) throw new Error("L channel slider not laid out");

    const y = box.y + box.height / 2;
    const x0 = box.x + box.width * 0.08;
    const x1 = box.x + box.width * 0.92;

    // Grab, then reset the frame window so warm-up frames are excluded.
    await page.mouse.move(x0, y);
    await page.mouse.down();
    await resetFrames(page);

    // Scrub across the track — 24 steps, a real sustained drag. Each move drives
    // the full fan-out; the 30 ms dwell lets a frame (or two) land per step.
    const STEPS = 24;
    for (let i = 1; i <= STEPS; i++) {
        await page.mouse.move(x0 + ((x1 - x0) * i) / STEPS, y, { steps: 3 });
        await page.waitForTimeout(30);
    }

    const frames = await readFrames(page);
    const longtasks = await readLongTasks(page);
    await page.mouse.up();

    const p50 = percentile(frames, 50);
    const p95 = percentile(frames, 95);
    const longOver50 = longtasks.filter((d) => d > GATE.dragLongTaskMs).length;
    const maxTask = longtasks.length ? Math.max(...longtasks) : 0;

    console.log(
        `[frame-budget:drag] renderer=${soft ? "SOFTWARE-GL" : "REAL-GPU"} ` +
            `(${renderer})\n` +
            `  frames=${frames.length} p50=${p50.toFixed(1)}ms p95=${p95.toFixed(1)}ms ` +
            `longTasks>50ms=${longOver50} maxTask=${maxTask.toFixed(0)}ms\n` +
            `  §6.2 GATE: p50 ≤ ${GATE.dragP50Ms}ms · 0 long tasks > ${GATE.dragLongTaskMs}ms` +
            `${soft ? "  [asserted on real GPU — see w3-frame-budget-measure.md]" : ""}`,
    );

    // Sanity: the scrub produced frames (the collector is live).
    expect(frames.length, "no frames sampled — collector dead").toBeGreaterThan(0);

    if (soft) {
        // Software-GL: a FREEZE guard only (NOT the §6.2 gate — recorded caveat).
        // The per-frame p50 under software raster is inherently noisy (58-100 ms
        // run-to-run — it measures SwiftShader's frame cost, not a product
        // signal), so it is LOGGED, not gated; a fan-out that regressed to an
        // uncoalesced blocking re-render surfaces as a task running into the
        // freeze ceiling.
        expect(
            maxTask,
            `software-GL longest in-drag task ${maxTask.toFixed(0)}ms over the ${SOFT_CEIL.dragMaxTaskMs}ms freeze ceiling — the fan-out may have regressed to a blocking re-render`,
        ).toBeLessThanOrEqual(SOFT_CEIL.dragMaxTaskMs);
    } else {
        // Real GPU: the EXACT §6.2 gate.
        expect(p50, `drag frame p50 ${p50.toFixed(1)}ms over the §6.2 ≤${GATE.dragP50Ms}ms gate`).toBeLessThanOrEqual(
            GATE.dragP50Ms,
        );
        expect(
            longOver50,
            `${longOver50} long task(s) > ${GATE.dragLongTaskMs}ms in-drag (§6.2 requires 0) — the colour fan-out is not coalesced`,
        ).toBe(0);
    }
});
