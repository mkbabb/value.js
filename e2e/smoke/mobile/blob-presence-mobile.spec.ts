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
import {
    BLOB_IDLE_MS as N,
    PARK_SETTLE_MS,
    SAMPLE_WINDOW_MS,
    PARKED_DRAW_SLACK,
    seatFootprintPx,
    CANVAS_OVERSCAN,
} from "../fixtures/blob-timing";

/**
 * T.W4-5 — Q7 FULL PRESENCE at 390 under THE SEAT (D8; the R3 corner-break
 * law + its 8rem hand arm are DEAD) + the <lg perf HARD gate.
 *
 * PI-4's re-derivation (SAME COMMIT as the seat formula): the retired
 * assertions were keyed to the dying arm (the 180/240 "8rem-law
 * floor/ceiling", the top-break law). This spec now COMPUTES its expected
 * geometry from the ONE seat formula at the test's own viewport
 * (`seatFootprintPx` — the fixture mirror of `--blob-fp: clamp(7rem, 22cqi,
 * 11rem)`), and the containment identity replaces the corner-break grammar:
 *
 *   1 · PRESENCE — mounted, canvas sized = 1.6 × the FORMULA footprint,
 *       actually rendering (draw-count > 0).
 *   2 · CONTAINMENT — the wrapper (the PAINTED region's bound: orbit-reach
 *       0.49 ≤ 0.5 keeps every goo pixel inside it) sits wholly INSIDE the
 *       card; no horizontal page overflow (the forbidden clipped-smudge
 *       state stays dead — only the transparent canvas overscan crosses
 *       edges, clipped by .app-layout).
 *   3 · GL LIFECYCLE — the idle park + idle frame cadence (unchanged law;
 *       constants from the ONE timing fixture, PI-4).
 *
 * Viewport: EXACTLY 390×844 on the Pixel-7 descriptor.
 */

test.use({
    ...devices["Pixel 7"],
    viewport: { width: 390, height: 844 },
});

test("hero blob FULL PRESENCE at 390: formula-sized, contained in the card, idle-parked (Q7 + the seat law)", async ({
    page,
}) => {
    expect(
        SAMPLE_WINDOW_MS,
        "idle sampling window must exceed the W3-3 idle threshold N",
    ).toBeGreaterThan(N);

    await instrumentWebglDraws(page);
    await installFrameCollector(page);
    await page.goto("/");

    const renderer = await detectRenderer(page);
    const soft = isSoftwareGL(renderer);

    // ── 1 · PRESENCE (formula-derived size) ───────────────────────────────
    const blob = page.getByTestId(GOO_BLOB_TESTID).last();
    await expect(blob).toBeAttached();

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

    // ── 3 · GL LIFECYCLE — the idle park at 390 (the <lg perf HARD gate) ──
    const spectrum = page.getByRole("img", { name: /Color spectrum/ }).last();
    await expect(spectrum).toBeVisible();
    const sBox = await spectrum.boundingBox();
    if (!sBox) throw new Error("spectrum canvas not laid out");
    await page.mouse.click(sBox.x + sBox.width * 0.5, sBox.y + sBox.height * 0.5);

    await waitMs(page, PARK_SETTLE_MS);

    const before = await lastCanvasDrawCount(page, GOO_BLOB_TESTID);
    await resetFrames(page);
    await waitMs(page, SAMPLE_WINDOW_MS);
    const after = await lastCanvasDrawCount(page, GOO_BLOB_TESTID);
    const frames = await readFrames(page);

    expect(
        after - before,
        `blob drew ${after - before} frames over ${SAMPLE_WINDOW_MS}ms of true idle at 390 — the render loop is NOT parked (<lg presence must not regress the W3-3 idle-gate)`,
    ).toBeLessThanOrEqual(PARKED_DRAW_SLACK);

    // Idle frame cadence at 390 — renderer-aware (idle-frame-budget shape).
    const p50 = percentile(frames, 50);
    console.log(
        `[blob-390] renderer=${soft ? "SOFTWARE-GL" : "REAL-GPU"} (${renderer})\n` +
            `  canvas=${box.width.toFixed(1)}px (formula ${expectedCanvas.toFixed(1)}) ` +
            `scrollWidth=${scrollWidth} parkΔ=${after - before} ` +
            `frames=${frames.length} idle p50=${p50.toFixed(1)}ms ` +
            `(§6.2 gate ≤${GATE.idleP50Ms}ms${soft ? " — asserted on real GPU" : ""})`,
    );
    expect(frames.length, "no idle frames sampled at 390 — collector dead").toBeGreaterThan(0);
    if (soft) {
        expect(
            frames.length,
            `only ${frames.length} idle frames over ${SAMPLE_WINDOW_MS}ms at 390 — the rAF loop stalled`,
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
