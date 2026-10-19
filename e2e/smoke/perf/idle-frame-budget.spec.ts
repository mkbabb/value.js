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
 */

const IDLE_MS = 2_000;
const WINDOW_MS = 3_000;
const EDGE_SLACK = 1;

test("idle picker frame budget with the hero live: one draw per frame, p50 ≤ 13ms (built-bundle gate)", async ({
    page,
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
            `  hero live: draws=${draws} over frames=${frames.length} window=${WINDOW_MS}ms ` +
            `p50=${p50.toFixed(1)}ms p95=${p95.toFixed(1)}ms\n` +
            `  §6.2 GATE: idle p50 ≤ ${GATE.idleP50Ms}ms (hero live)` +
            `${soft ? "  [asserted on real GPU — probe-idle-cost.mjs GPU=1]" : ""}`,
    );

    expect(frames.length, "no idle frames sampled — collector dead").toBeGreaterThan(0);
    expect(draws, "the idle hero drew nothing — the budget was read with the hero parked").toBeGreaterThan(0);
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
        expect(
            p50,
            `idle picker frame p50 ${p50.toFixed(1)}ms over the §6.2 ≤${GATE.idleP50Ms}ms gate with the hero live`,
        ).toBeLessThanOrEqual(GATE.idleP50Ms);
    }
});
