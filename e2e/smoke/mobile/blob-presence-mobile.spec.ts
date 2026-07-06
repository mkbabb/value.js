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
 * W6-4 (S.W6) — Q7 FULL PRESENCE at the 390 viewport (the <lg presence law,
 * DESIGNED not toggled — RATIFICATION-2026-07-05 §2.2.1) + its HARD perf gate.
 *
 * The seed's mount-gate cure (blob ABSENT below lg) is OBSOLETE per the Q7
 * flip; its findings carry as CONSTRAINTS this spec pins forever:
 *   1 · PRESENCE — the hero blob is mounted, sized by the <lg law (8rem
 *       footprint → 204.8px canvas), and actually RENDERING (draw-count > 0 —
 *       the buffer-/timing-independent oracle, webgl-appearance fixture).
 *   2 · VIEWPORT HONESTY — the forbidden state is the 390px clipped smudge
 *       (pre-seed: canvas right edge 401.8 > 390 with layout overflow).
 *       scrollWidth === viewport AND the canvas right edge stays inside the
 *       viewport: the <lg law breaks ONLY the card's top edge; the right
 *       inset (1.75rem) keeps the 1.6× canvas overscan on-screen.
 *   3 · THE TOP-BREAK — the bead center rides the corner-radius-origin LINE
 *       (the same law as lg), so the canvas top sits ABOVE the card top: the
 *       corner-break grammar survives at hand scale (one broken edge).
 *   4 · GL LIFECYCLE (the <lg perf HARD gate) — the W3-3 idle-gate parks the
 *       render loop at 390 exactly as at desktop (draw-count plateau over a
 *       window > N), and the idle frame cadence holds the §6.2 idle budget on
 *       real GPU (renderer-aware: SwiftShader asserts the liveness floor +
 *       hang guard and LOGS p50 — the perf/idle-frame-budget.spec.ts shape).
 *
 * Viewport: EXACTLY 390×844 (the gate viewport named by the wave doc — the
 * historical smudge width), on the Pixel-7 descriptor (mobile UA/touch/DPR).
 *
 * Park-latency contract: HeroBlob parks at BLOB_IDLE_MS + SLEEPY_POSE_MS
 * (2000 + 700 = 2700ms — the sleepy pose renders, THEN the park freezes it).
 * PARK_SETTLE_MS = N + 1500 = 3500ms leaves 800ms slack past park completion;
 * the sampling window still exceeds N (the §6.1 contract).
 */

const N = 2000; // === HeroBlob.vue BLOB_IDLE_MS
const PARK_SETTLE_MS = N + 1500; // > N + SLEEPY_POSE_MS (700) — park completed
const SAMPLE_WINDOW_MS = N + 500; // the idle sampling window — MUST exceed N
const PARKED_DRAW_SLACK = 5;

test.use({
    ...devices["Pixel 7"],
    viewport: { width: 390, height: 844 },
});

test("hero blob FULL PRESENCE at 390: sized+rendering, viewport-honest, top-break, idle-parked (Q7 + <lg perf gate)", async ({
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

    // ── 1 · PRESENCE ──────────────────────────────────────────────────────
    const blob = page.getByTestId(GOO_BLOB_TESTID).last();
    await expect(blob).toBeAttached();

    const box = await blob.boundingBox();
    if (!box) throw new Error("goo-blob canvas has no layout box at 390");
    // The <lg law: 8rem footprint → 1.6× canvas = 204.8px. Floor at 180 still
    // catches a degenerate/clipped smudge OR a stray desktop-law footprint
    // (11rem → 281.6px canvas would also fail the ≤240 ceiling).
    expect(box.width, "<lg canvas width (8rem-law floor)").toBeGreaterThanOrEqual(180);
    expect(box.width, "<lg canvas width (desktop-law leak ceiling)").toBeLessThanOrEqual(240);

    // Actually RENDERING (the S-4 "renders nothing" class).
    await expect
        .poll(() => lastCanvasDrawCount(page, GOO_BLOB_TESTID), {
            timeout: 15_000,
            message: "goo-blob WebGL pipeline never drew at 390 — presence is a dead canvas",
        })
        .toBeGreaterThan(0);

    // ── 2 · VIEWPORT HONESTY (the forbidden clipped-smudge state) ─────────
    const vp = page.viewportSize();
    if (!vp) throw new Error("no viewport size");
    const scrollWidth = await page.evaluate(
        () => document.documentElement.scrollWidth,
    );
    expect(scrollWidth, "scrollWidth == viewport (no horizontal overflow)").toBe(vp.width);
    expect(
        box.x + box.width,
        "canvas right edge stays inside the viewport (the 401.8>390 smudge is dead)",
    ).toBeLessThanOrEqual(vp.width);

    // ── 3 · THE TOP-BREAK (the corner-break grammar at hand scale) ────────
    const shellBox = await page.locator(".pane-shell").last().boundingBox();
    if (!shellBox) throw new Error("pane shell has no layout box");
    expect(
        box.y,
        "canvas top breaks ABOVE the card top (the <lg one-broken-edge law)",
    ).toBeLessThan(shellBox.y);

    // ── 4 · GL LIFECYCLE — the idle park at 390 (the <lg perf HARD gate) ──
    // Anchor the idle countdown with ONE interaction (resets HeroBlob's idle
    // timer AND wakes the blob live), then hands off — the loop parks.
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
            `  canvas=${box.width.toFixed(1)}px right=${(box.x + box.width).toFixed(1)} ` +
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
