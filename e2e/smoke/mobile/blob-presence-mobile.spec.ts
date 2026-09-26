import { test, expect, devices } from "@playwright/test";
import {
    instrumentWebglDraws,
    GOO_BLOB_TESTID,
    lastCanvasDrawCount,
} from "../fixtures/webgl-appearance";
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
} from "../perf/frame-budget";
/**
 * THE SEAT FORMULA (T.W4-5 · D8) — the e2e mirror of the ONE cqi footprint law
 * (`ColorPicker.vue .pane-shell{--blob-fp: clamp(7rem, 22cqi, 11rem)}`); the
 * canvas is 1.6x the footprint (the producer overscan identity). PI-4's law:
 * geometry gates COMPUTE their bounds at the test's own viewport. (Moved here
 * from the retired W3-3 timing fixture, X.W12U.b; O-12 carries its own.)
 */
function seatFootprintPx(paneWidthPx: number, remPx = 16): number {
    return Math.min(Math.max(0.22 * paneWidthPx, 7 * remPx), 11 * remPx);
}
const CANVAS_OVERSCAN = 1.6;

/** X.W12U.b — the idle wait and window (see §3). */
const IDLE_MS = 2_000;
const WINDOW_MS = 3_000;
const EDGE_SLACK = 1;

/**
 * T.W4-5 — Q7 FULL PRESENCE at 390 under THE SEAT (D8; the R3 corner-break
 * law + its 8rem hand arm are DEAD) + the <lg perf HARD gate.
 *
 * PI-4's re-derivation (SAME COMMIT as the seat formula): the retired
 * assertions were keyed to the dying arm (the 180/240 "8rem-law
 * floor/ceiling", the top-break law). This spec now COMPUTES its expected
 * geometry from the ONE seat formula at the test's own viewport
 * (`seatFootprintPx` — the in-spec mirror of `--blob-fp: clamp(7rem, 22cqi,
 * 11rem)`), and the containment identity replaces the corner-break grammar:
 *
 *   1 · PRESENCE — mounted, canvas sized = 1.6 × the FORMULA footprint,
 *       actually rendering (draw-count > 0).
 *   2 · CONTAINMENT — the wrapper (the PAINTED region's bound: orbit-reach
 *       0.49 ≤ 0.5 keeps every goo pixel inside it) sits wholly INSIDE the
 *       card; no horizontal page overflow (the forbidden clipped-smudge
 *       state stays dead — only the transparent canvas overscan crosses
 *       edges, clipped by .app-layout).
 *   3 · GL LIFECYCLE — X.W12U.b (COHESION §0dm, ESC-W12d-1): the W3-3
 *       wall-clock park is retired; the owner's live hero supersedes it. The
 *       leg is an idle frame-cost budget with the hero LIVE: it draws over
 *       the idle window (> 0), at most one draw per displayed frame (+1 edge
 *       race; measured at 390: draws 37/44/39 = frames 37/44/39), and the
 *       idle cadence holds the §6.2 13 ms on a real GPU (measured headed at
 *       390, hero live: p50 10.2 ms) or the SOFT_CEIL guard on SwiftShader.
 *       Under prefers-reduced-motion the hero still PARKS: 0 idle draws
 *       (the second test). Evidence: `W12U-evidence/b/probe-idle-cost.mjs`.
 *
 * Viewport: EXACTLY 390×844 on the Pixel-7 descriptor.
 */

test.use({
    ...devices["Pixel 7"],
    viewport: { width: 390, height: 844 },
});

test("hero blob FULL PRESENCE at 390: formula-sized, contained in the card, live within its idle frame budget (Q7 + the seat law)", async ({
    page,
}) => {
    // Harness budget, not an assertion: at 390 on SwiftShader the first blob
    // draw lands 9.7 s after navigation under host load (probe-idle-cost.mjs),
    // and the 30 s default ran out at this unit's baseline.
    test.setTimeout(90_000);

    await instrumentWebglDraws(page);
    await installFrameCollector(page);
    await page.goto("/");

    const renderer = await detectRenderer(page);
    const soft = isSoftwareGL(renderer);

    // ── 1 · PRESENCE (formula-derived size) ───────────────────────────────
    const blob = page.getByTestId(GOO_BLOB_TESTID).last();
    // Arrival is harness latency (the overture DAG + the async HeroBlob chunk;
    // the b2bb8aab h1 precedent), bounded by this test's own budget.
    await expect(blob).toBeAttached({ timeout: 45_000 });

    // The pane slot is the cqi container the formula reads.
    const paneWidth = await page
        .locator(".pane-wrapper")
        .last()
        .evaluate((el) => el.clientWidth);
    const expectedCanvas = CANVAS_OVERSCAN * seatFootprintPx(paneWidth);

    // SETTLE-STAMPED (T.W2-4): the blob EMERGES at B4 through the 500ms
    // goo-scale pose — poll until the emerge releases before the exact law
    // asserts.
    await expect
        .poll(async () => (await blob.boundingBox())?.width ?? 0, {
            timeout: 4000,
            message:
                "goo-blob canvas never settled to the seat-formula footprint (emerge pose stuck?)",
        })
        .toBeGreaterThanOrEqual(expectedCanvas - 2);
    const box = await blob.boundingBox();
    if (!box) throw new Error("goo-blob canvas has no layout box at 390");
    expect(
        Math.abs(box.width - expectedCanvas),
        `canvas width ${box.width} ≠ 1.6 × clamp(7rem, 22cqi, 11rem) = ${expectedCanvas} (pane ${paneWidth})`,
    ).toBeLessThanOrEqual(2);

    // Actually RENDERING (the S-4 "renders nothing" class).
    await expect
        .poll(() => lastCanvasDrawCount(page, GOO_BLOB_TESTID), {
            timeout: 15_000,
            message: "goo-blob WebGL pipeline never drew at 390 — presence is a dead canvas",
        })
        .toBeGreaterThan(0);

    // ── 2 · CONTAINMENT (the seat identity replaces the corner-break) ─────
    const vp = page.viewportSize();
    if (!vp) throw new Error("no viewport size");
    const scrollWidth = await page.evaluate(
        () => document.documentElement.scrollWidth,
    );
    expect(scrollWidth, "scrollWidth == viewport (no horizontal overflow)").toBe(
        vp.width,
    );
    // The WRAPPER bounds every painted goo pixel (orbit-reach 0.49 ≤ 0.5);
    // it must sit wholly inside the card at the flush seat.
    const wrapper = await page
        .locator(".hero-blob-anchor")
        .last()
        .boundingBox();
    const card = await page.locator(".pane-shell > *").last().boundingBox();
    if (!wrapper || !card) throw new Error("seat geometry not laid out");
    expect(wrapper.x, "wrapper left inside card").toBeGreaterThanOrEqual(card.x - 1);
    expect(wrapper.y, "wrapper top inside card").toBeGreaterThanOrEqual(card.y - 1);
    expect(
        wrapper.x + wrapper.width,
        "wrapper right inside card",
    ).toBeLessThanOrEqual(card.x + card.width + 1);
    expect(
        wrapper.y + wrapper.height,
        "wrapper bottom inside card",
    ).toBeLessThanOrEqual(card.y + card.height + 1);

    // ── 3 · GL LIFECYCLE — the live hero's idle cost at 390 ───────────────
    // Idle = no input at all. The old spectrum-click anchor reset HeroBlob's
    // wall-clock idle timer, which is retired; a colour change now only
    // re-inks the app, and under SwiftShader that recolour holds the main
    // thread for seconds (probe-click-stall.mjs: 0 frames for 5 s after one
    // click; headed GPU: one 122 ms gap), which would read as the hero's cost.
    await waitMs(page, IDLE_MS);

    const before = await lastCanvasDrawCount(page, GOO_BLOB_TESTID);
    await resetFrames(page);
    await waitMs(page, WINDOW_MS);
    const after = await lastCanvasDrawCount(page, GOO_BLOB_TESTID);
    const frames = await readFrames(page);

    expect(
        after - before,
        `the idle hero drew nothing over ${WINDOW_MS}ms at 390 — the live blob parked`,
    ).toBeGreaterThan(0);
    expect(
        after - before,
        `the hero drew ${after - before} times over ${frames.length} displayed frames at 390 — more than one draw per frame`,
    ).toBeLessThanOrEqual(frames.length + EDGE_SLACK);

    // Idle frame cadence at 390 — renderer-aware (idle-frame-budget shape).
    const p50 = percentile(frames, 50);
    console.log(
        `[blob-390] renderer=${soft ? "SOFTWARE-GL" : "REAL-GPU"} (${renderer})\n` +
            `  canvas=${box.width.toFixed(1)}px (formula ${expectedCanvas.toFixed(1)}) ` +
            `scrollWidth=${scrollWidth} idle draws=${after - before} ` +
            `frames=${frames.length} idle p50=${p50.toFixed(1)}ms ` +
            `(§6.2 gate ≤${GATE.idleP50Ms}ms${soft ? " — asserted on real GPU" : ""})`,
    );
    expect(frames.length, "no idle frames sampled at 390 — collector dead").toBeGreaterThan(0);
    if (soft) {
        expect(
            frames.length,
            `only ${frames.length} idle frames over ${WINDOW_MS}ms at 390 — the rAF loop stalled`,
        ).toBeGreaterThanOrEqual(SOFT_CEIL.idleMinFrames);
        expect(
            p50,
            `software-GL idle p50 ${p50.toFixed(1)}ms at 390 over the ${SOFT_CEIL.idleP50Ms}ms hang guard`,
        ).toBeLessThanOrEqual(SOFT_CEIL.idleP50Ms);
    } else {
        expect(
            p50,
            `idle p50 ${p50.toFixed(1)}ms at 390 over the §6.2 ≤${GATE.idleP50Ms}ms gate — the <lg presence broke the idle budget`,
        ).toBeLessThanOrEqual(GATE.idleP50Ms);
    }
});

test("hero blob at 390 under prefers-reduced-motion: one static frame, then parked (0 idle draws)", async ({
    page,
}) => {
    test.setTimeout(90_000);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await instrumentWebglDraws(page);
    await installFrameCollector(page);
    await page.goto("/");
    await expect(page.getByTestId(GOO_BLOB_TESTID).last()).toBeAttached({ timeout: 45_000 });
    // The one static frame lands first.
    await expect
        .poll(() => lastCanvasDrawCount(page, GOO_BLOB_TESTID), { timeout: 45_000 })
        .toBeGreaterThan(0);
    await waitMs(page, IDLE_MS);
    const before = await lastCanvasDrawCount(page, GOO_BLOB_TESTID);
    await resetFrames(page);
    await waitMs(page, WINDOW_MS);
    const draws = (await lastCanvasDrawCount(page, GOO_BLOB_TESTID)) - before;
    const frames = await readFrames(page);
    console.log(`[blob-390] PRM window=${WINDOW_MS}ms draws=${draws} frames=${frames.length}`);
    expect(frames.length, "the rAF loop stalled").toBeGreaterThanOrEqual(SOFT_CEIL.idleMinFrames);
    expect(draws, `the PRM hero drew ${draws} times over ${WINDOW_MS}ms of idle at 390 — it is not parked`).toBe(0);
});
