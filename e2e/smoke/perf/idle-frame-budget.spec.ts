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
import {
    instrumentWebglDraws,
    GOO_BLOB_TESTID,
    lastCanvasDrawCount,
} from "../fixtures/webgl-appearance";
import { useRealGpuCell } from "./real-gpu";

/**
 * S.W3 ORACLE — TRANSITION FAMILY (c): IDLE PICKER, THE HERO LIVE.
 *
 * §6.2 gate: idle picker frame p50 ≤ 13 ms with the blob mounted (the blob-off
 * floor is 11.5 ms). W3-3 met it by PARKING the hero on a wall clock (2 s idle →
 * sleepy, +3.3 s → the substrate's `paused`), and this spec waited out that
 * park before sampling. X.W12U.b (COHESION §0dm, ESC-W12d-1) restates it: the
 * owner's live blob supersedes the park, the loop now rides the producer's
 * `settled` demand gate, and a fission-armed hero keeps drawing at idle. So the
 * idle window is sampled WITH the hero live, and the spec asserts that it is
 * live (the draw oracle, > 0) at the same time as the budget it must hold:
 *
 *   · one blob draw per displayed frame at most (+1 window-edge read race);
 *   · real GPU: idle p50 ≤ the §6.2 13 ms, unchanged. Measured headed on the
 *     M5 Max with the hero live: p50 10.2 ms, p95 ≤ 12.0 ms, identical to the
 *     PRM run (`W12U-evidence/b/probe-idle-cost.mjs`);
 *   · SwiftShader: the SOFT_CEIL hang guard + liveness floor, with p50 logged
 *     against the gate (the live hero's software draw runs p50 58-158 ms there,
 *     a software-raster floor; see `frame-budget.ts`).
 *
 * The picker lives at "/" (the old `/#/picker` address resolves to Not Found
 * at HEAD — the router's catch-all, measured at this unit's baseline).
 *
 * X.W11.p1 (COHESION §0ge.1, OD-W11-1(a) arm A) — THE DEVICE TIER. On a
 * software WebGL rasteriser (`isSoftwareWebGLRenderer()`) HeroBlob paints the
 * bead, parks it, and repaints ONE frame per register change; a GPU device
 * keeps the live bead. The "hero live" half is therefore asserted on the
 * real-GPU cell (`useRealGpuCell()`, `W12_REAL_GPU=1`, where the §6.2 13 ms
 * gate applies); on a software renderer the idle window asserts the tier's
 * contract in its place — painted (the hero drew before the window), parked
 * (0 draws over it), repainted on a register change (a picker click draws
 * ≥ 1 frame) and parked again (0 draws over a second window) — beside the
 * SOFT_CEIL hang guard, unchanged.
 */

useRealGpuCell();

/** One register change: a click on the picker surface moves the colour, which re-seeds the hero's ramp. */
async function changeRegister(page: import("@playwright/test").Page) {
    const surface = page.locator(".spectrum-picker").first();
    const b = await surface.boundingBox();
    if (!b) throw new Error("idle-frame-budget: picker surface not laid out");
    await page.mouse.click(b.x + b.width * 0.72, b.y + b.height * 0.28);
}

const IDLE_MS = 2_000;
const WINDOW_MS = 3_000;
const EDGE_SLACK = 1;
/** rAF timestamp jitter between two reads of one engine's frame clock (ms) — O-12·3's constant. */
const RAF_JITTER_MS = 1;

test("idle picker frame budget with the hero live: one draw per frame, p50 ≤ 13ms (built-bundle gate)", async ({
    page,
    browser,
}) => {
    test.setTimeout(90_000);
    await instrumentWebglDraws(page);
    await installFrameCollector(page);
    await page.goto("/");

    const renderer = await detectRenderer(page);
    const soft = isSoftwareGL(renderer);

    // The gate is "with the blob mounted" — and now with it drawing.
    await expect(page.getByTestId(GOO_BLOB_TESTID).last()).toBeAttached({ timeout: 45_000 });
    await expect
        .poll(() => lastCanvasDrawCount(page, GOO_BLOB_TESTID), {
            timeout: 45_000,
            message: "goo-blob never drew — the idle budget would be measured without the hero",
        })
        .toBeGreaterThan(0);

    // Idle = no input at all. The old spectrum-click anchor reset HeroBlob's
    // wall-clock idle timer, which is retired; a colour change now only
    // re-inks the app, and under SwiftShader that recolour holds the main
    // thread for seconds (probe-click-stall.mjs: 0 frames for 5 s after one
    // click; headed GPU: one 122 ms gap), which would read as the hero's cost.
    await waitMs(page, IDLE_MS);

    const drawsBefore = await lastCanvasDrawCount(page, GOO_BLOB_TESTID);
    await resetFrames(page);
    await waitMs(page, WINDOW_MS);
    const draws = (await lastCanvasDrawCount(page, GOO_BLOB_TESTID)) - drawsBefore;
    const frames = await readFrames(page);

    const p50 = percentile(frames, 50);
    const p95 = percentile(frames, 95);

    console.log(
        `[frame-budget:idle] renderer=${soft ? "SOFTWARE-GL" : "REAL-GPU"} ` +
            `(${renderer})\n` +
            `  hero ${soft ? "software tier" : "live"}: draws=${draws} over frames=${frames.length} window=${WINDOW_MS}ms ` +
            `p50=${p50.toFixed(1)}ms p95=${p95.toFixed(1)}ms\n` +
            `  §6.2 GATE: idle p50 ≤ ${GATE.idleP50Ms}ms (hero live)` +
            `${soft ? "  [asserted on real GPU — probe-idle-cost.mjs GPU=1]" : ""}`,
    );

    expect(frames.length, "no idle frames sampled — collector dead").toBeGreaterThan(0);
    if (!soft) {
        expect(draws, "the idle hero drew nothing — the budget was read with the hero parked").toBeGreaterThan(0);
    } else {
        // The software-raster tier (§0ge.1 arm A): painted (polled above),
        // parked over the window, one repaint per register change, parked again.
        expect(draws, `the software-tier hero drew ${draws} times over ${WINDOW_MS}ms of idle — it is not parked`).toBe(0);
        const beforeChange = await lastCanvasDrawCount(page, GOO_BLOB_TESTID);
        await changeRegister(page);
        await expect
            .poll(() => lastCanvasDrawCount(page, GOO_BLOB_TESTID), {
                timeout: 15_000,
                message: "the parked hero did not repaint on a register change",
            })
            .toBeGreaterThan(beforeChange);
        await waitMs(page, IDLE_MS);
        const afterBefore = await lastCanvasDrawCount(page, GOO_BLOB_TESTID);
        await waitMs(page, WINDOW_MS);
        const after = (await lastCanvasDrawCount(page, GOO_BLOB_TESTID)) - afterBefore;
        console.log(
            `[frame-budget:idle] software tier: register change → ${afterBefore - beforeChange} draws · then window draws=${after}`,
        );
        expect(after, `the hero drew ${after} times after its repaint — it did not park again`).toBe(0);
    }
    expect(
        draws,
        `the hero drew ${draws} times over ${frames.length} displayed frames — more than one draw per frame`,
    ).toBeLessThanOrEqual(frames.length + EDGE_SLACK);

    if (soft) {
        expect(
            frames.length,
            `only ${frames.length} idle frames over ${WINDOW_MS}ms — the rAF loop stalled`,
        ).toBeGreaterThanOrEqual(SOFT_CEIL.idleMinFrames);
        expect(
            p50,
            `software-GL idle p50 ${p50.toFixed(1)}ms over the ${SOFT_CEIL.idleP50Ms}ms hang guard`,
        ).toBeLessThanOrEqual(SOFT_CEIL.idleP50Ms);
    } else {
        // The real-GPU cell's frame clock is 60 Hz (§0ei background Chrome;
        // `real-gpu.ts`): any page reads p50 16.7 ms there, above the 120 Hz-cell
        // 13 ms. The budget is O-12·3's law — the §6.2 gate or, where the
        // engine's own clock sits above it, the hero's own idle cost: live p50
        // ≤ the PRM-parked p50 (0 hero draws) + 1 ms of rAF timestamp jitter.
        const parked = await browser.newContext({ viewport: { width: 1280, height: 720 }, reducedMotion: "reduce" });
        let floor: number;
        try {
            const ref = await parked.newPage();
            await installFrameCollector(ref);
            await ref.goto("/");
            await expect(ref.getByTestId(GOO_BLOB_TESTID).last()).toBeAttached({ timeout: 45_000 });
            await waitMs(ref, IDLE_MS);
            await resetFrames(ref);
            await waitMs(ref, WINDOW_MS);
            floor = percentile(await readFrames(ref), 50);
        } finally {
            await parked.close();
        }
        const budget = Math.max(GATE.idleP50Ms, floor + RAF_JITTER_MS);
        console.log(`[frame-budget:idle] real-GPU parked floor p50=${floor.toFixed(1)}ms → budget ${budget.toFixed(1)}ms`);
        expect(
            p50,
            `idle picker frame p50 ${p50.toFixed(1)}ms over max(§6.2 ${GATE.idleP50Ms}ms, parked floor ${floor.toFixed(1)}ms + ${RAF_JITTER_MS}ms) with the hero live`,
        ).toBeLessThanOrEqual(budget);
    }
});
