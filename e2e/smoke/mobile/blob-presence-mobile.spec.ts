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
import { useRealGpuCell } from "../perf/real-gpu";
/**
 * THE SEAT FORMULA (T.W4-5 · D8) — the e2e mirror of the ONE cqi footprint law
 * (`seat.css .pane-shell{--blob-fp: clamp(7rem, 22cqi, (φ·display-2 + 0.75rem) / 0.76)}`); the
 * canvas is 1.6x the footprint (the producer overscan identity). PI-4's law:
 * geometry gates COMPUTE their bounds at the test's own viewport. (Moved here
 * from the retired W3-3 timing fixture, X.W12U.b; O-12 carries its own.)
 */
function seatFootprintPx(paneWidthPx: number, viewportWidthPx: number, remPx = 16): number {
    // SS-8.r Z-ColorPicker-14 (seat.css): the upper bound is the title band,
    // (φ·--type-display-2 + 0.75rem) / 0.76, and CSS clamp lets MIN beat MAX.
    const display2 = Math.min(Math.max(1.5 * remPx + 0.022 * viewportWidthPx, 2.058 * remPx), 3.33 * remPx);
    const titleBound = (1.618 * display2 + 0.75 * remPx) / 0.76;
    return Math.max(7 * remPx, Math.min(0.22 * paneWidthPx, titleBound));
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
 * X.W11.o2 (COHESION §0gr.4, under §0ge.1 OD-W11-1(a) arm A) — THE DEVICE
 * TIER at 390. On a software WebGL rasteriser (`isSoftwareWebGLRenderer()`,
 * HeroBlob's software-raster tier, `143c778a2`) the bead paints, parks, and
 * repaints ONE frame per register change; a GPU device keeps the live bead.
 * X.W11.p1 re-specified the four 1440 specs on that ruling and left this 390
 * leg asserting liveness on SwiftShader, where the lawful park reads 0 draws.
 * Leg 3's LIVE half is therefore asserted on the real-GPU cell
 * (`useRealGpuCell()`, `W12_REAL_GPU=1`); on a software renderer it asserts
 * the tier's contract in its place — PAINTED (leg 1 polled a draw), PARKED
 * (0 draws over the idle window), REPAINTED on a register change (a picker
 * click draws ≥ 1 frame) and PARKED AGAIN (0 draws over a second window).
 * The one-draw-per-frame ceiling and the cadence guards hold on both tiers;
 * the real-GPU cell's 60 Hz clock reads p50 16.7 ms for any page, so its
 * cadence takes O-12·3's law as the 1440 specs do: ≤ max(§6.2 13 ms, the
 * PRM-parked p50 at 390 + 1 ms).
 *
 * Viewport: EXACTLY 390×844 on the Pixel-7 descriptor.
 */

test.use({
    ...devices["Pixel 7"],
    viewport: { width: 390, height: 844 },
});

useRealGpuCell();

/**
 * One register change on the phone: the picker surface is touch-gated
 * (glass `useTouchGate`: the first tap arms the plate, so a scroll that lands
 * on it never moves the colour), so the user's gesture is tap to arm, then tap
 * to set. The set moves the colour, which re-seeds the hero's ramp.
 */
async function changeRegister(page: import("@playwright/test").Page) {
    const surface = page.locator(".spectrum-picker").first();
    const b = await surface.boundingBox();
    if (!b) throw new Error("blob-presence-mobile: picker surface not laid out");
    const x = b.x + b.width * 0.72;
    const y = b.y + b.height * 0.28;
    await page.touchscreen.tap(x, y);
    await expect(surface, "the first tap did not arm the touch-gated picker").toHaveClass(/touch-gate-active/);
    await page.touchscreen.tap(x, y);
}

/** rAF timestamp jitter between two reads of one engine's frame clock (ms) — O-12·3's constant. */
const RAF_JITTER_MS = 1;

/** The same page's idle frame p50 at 390 under prefers-reduced-motion (the hero parked, 0 draws): the clock's own floor. */
async function parkedFloorP50(browser: import("@playwright/test").Browser): Promise<number> {
    const parked = await browser.newContext({
        ...devices["Pixel 7"],
        viewport: { width: 390, height: 844 },
        reducedMotion: "reduce",
    });
    try {
        const ref = await parked.newPage();
        await instrumentWebglDraws(ref);
        await installFrameCollector(ref);
        await ref.goto("/");
        await expect(ref.getByTestId(GOO_BLOB_TESTID).last()).toBeAttached({ timeout: 45_000 });
        // The parked hero's one static frame lands before the floor is read.
        await expect
            .poll(() => lastCanvasDrawCount(ref, GOO_BLOB_TESTID), { timeout: 45_000 })
            .toBeGreaterThan(0);
        await waitMs(ref, IDLE_MS);
        await resetFrames(ref);
        await waitMs(ref, WINDOW_MS);
        return percentile(await readFrames(ref), 50);
    } finally {
        await parked.close();
    }
}

test("hero blob FULL PRESENCE at 390: formula-sized, contained in the card, live within its idle frame budget (Q7 + the seat law)", async ({
    page,
    browser,
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
    const expectedCanvas = CANVAS_OVERSCAN * seatFootprintPx(paneWidth, page.viewportSize()!.width);

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
    // The card of the shell the hero sits IN. Since A2-VA-L1 (X-W12U .k2) the
    // About pane composes PaneShell too, so a positional `.pane-shell > *`
    // (last) read the SECOND pane's card (y 680 at 390) against the picker's
    // hero (X-W12U .q: `W12U-evidence/q/probes/probe-blob-seat.mjs`).
    const card = await page
        .locator(".pane-shell:has(> .hero-blob-anchor) > .card")
        .first()
        .boundingBox();
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

    if (soft) {
        // The software-raster tier (§0ge.1 arm A): painted (leg 1 polled a
        // draw), parked over the window, one repaint per register change, parked again.
        expect(
            after - before,
            `the software-tier hero drew ${after - before} times over ${WINDOW_MS}ms of idle at 390 — it is not parked`,
        ).toBe(0);
        const beforeChange = await lastCanvasDrawCount(page, GOO_BLOB_TESTID);
        await changeRegister(page);
        await expect
            .poll(() => lastCanvasDrawCount(page, GOO_BLOB_TESTID), {
                timeout: 15_000,
                message: "the parked hero did not repaint on a register change at 390",
            })
            .toBeGreaterThan(beforeChange);
        await waitMs(page, IDLE_MS);
        const reparkBefore = await lastCanvasDrawCount(page, GOO_BLOB_TESTID);
        await waitMs(page, WINDOW_MS);
        const repark = (await lastCanvasDrawCount(page, GOO_BLOB_TESTID)) - reparkBefore;
        console.log(
            `[blob-390] software tier: register change → ${reparkBefore - beforeChange} draws · then window draws=${repark}`,
        );
        expect(repark, `the hero drew ${repark} times after its repaint at 390 — it did not park again`).toBe(0);
    } else {
        expect(
            after - before,
            `the idle hero drew nothing over ${WINDOW_MS}ms at 390 — the live blob parked`,
        ).toBeGreaterThan(0);
    }
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
        // The real-GPU cell's frame clock is 60 Hz (§0ei background Chrome;
        // `perf/real-gpu.ts`): any page reads p50 16.7 ms there, above the
        // 120 Hz-cell 13 ms. The budget is therefore O-12·3's law, the one
        // X.W11.p1 gave the 1440 specs under §0ge.1 — the §6.2 gate or, where
        // the engine's own clock sits above it, the hero's own idle cost:
        // live p50 ≤ the PRM-parked p50 at 390 (0 hero draws) + 1 ms.
        const budget = Math.max(GATE.idleP50Ms, (await parkedFloorP50(browser)) + RAF_JITTER_MS);
        console.log(`[blob-390] real-GPU budget ${budget.toFixed(1)}ms`);
        expect(
            p50,
            `idle p50 ${p50.toFixed(1)}ms at 390 over max(§6.2 ${GATE.idleP50Ms}ms, parked floor + ${RAF_JITTER_MS}ms) — the <lg presence broke the idle budget`,
        ).toBeLessThanOrEqual(budget);
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
    // The PRM hero's static frame lands ~1.5 s after navigation, inside the
    // boot's own chunk and overture work; under SwiftShader that work can hold
    // the main thread for seconds (X.W12U.b gate run 5 read 0 frames over the
    // whole window at 390). A 0-draw window with 0 frames proves nothing, so
    // the window opens only once the page ticks again (a precondition, not the
    // gate: the gate is 0 draws over a window that itself shows frames).
    await expect
        .poll(
            async () => {
                await resetFrames(page);
                await waitMs(page, 500);
                return (await readFrames(page)).length;
            },
            { timeout: 45_000, message: "the page never resumed ticking after boot" },
        )
        .toBeGreaterThanOrEqual(SOFT_CEIL.idleMinFrames);
    const before = await lastCanvasDrawCount(page, GOO_BLOB_TESTID);
    await resetFrames(page);
    await waitMs(page, WINDOW_MS);
    const draws = (await lastCanvasDrawCount(page, GOO_BLOB_TESTID)) - before;
    const frames = await readFrames(page);
    console.log(`[blob-390] PRM window=${WINDOW_MS}ms draws=${draws} frames=${frames.length}`);
    expect(frames.length, "the rAF loop stalled").toBeGreaterThanOrEqual(SOFT_CEIL.idleMinFrames);
    expect(draws, `the PRM hero drew ${draws} times over ${WINDOW_MS}ms of idle at 390 — it is not parked`).toBe(0);
});
