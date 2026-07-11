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
} from "../perf/frame-budget";
import { decodePng, meanAbsDiff } from "../fixtures/frame-diff";
import {
    PARK_SETTLE_MS,
    seatFootprintPx,
    BEAD_RATIO,
} from "../fixtures/blob-timing";

/**
 * T.W4-5 · O-12 — THE BLOB SEAT SET (SYNTHESIS §6.1 O-12; D8 + the PI-3/PI-4
 * riders). Minted in the SAME commit as the seat formula (PI-4's law); the
 * mobile width bound lives in `mobile/blob-presence-mobile.spec.ts`
 * (formula-derived there — the fifth row of this set); the park timing
 * constants live in the ONE fixture (`fixtures/blob-timing.ts`).
 *
 *   1 · SEAT IDENTITY — `--blob-seat` resolves 0 (Q3 "Flush.") and the
 *       wrapper sits wholly inside the card (containment identity:
 *       orbit-reach 0.49 ≤ 0.5 bounds every painted pixel to the wrapper).
 *   2 · OCCLUSION — `elementFromPoint` across the bead's arc never resolves
 *       into the dock (the chrome band): the bead never enters chrome in
 *       paint (Q3b's two readings never conflict).
 *   3 · HOVER-MOOD FLOOR — hover-in from the parked rest state produces a
 *       visible response: mean abs 8-bit frame diff over the bead's box
 *       ≥ 6/255 within 400ms (the D4 metric family) — the wake+curious
 *       demo beat; the engine's hero-scale legibility floor rides P6.
 *   4 · HOVER-ACTIVE BUDGET — sustained-pointermove frame p50 ≤ 20ms (the
 *       NEW §6.2 row; renderer-aware: asserted on real GPU, hang-guarded on
 *       SwiftShader — the idle-frame-budget shape).
 */

test.use({ viewport: { width: 1440, height: 900 } });

const BLOB_CANVAS = '[data-testid="goo-blob-canvas"]';

async function bootWithBlob(page: import("@playwright/test").Page) {
    await page.goto("/");
    await expect(
        page.getByRole("main", { name: "Color tool panes" }),
    ).toBeVisible();
    const blob = page.locator(BLOB_CANVAS).last();
    await expect(blob).toBeAttached({ timeout: 15_000 });
    // Wait out the emerge pose (the W2-4 settle-stamp discipline).
    const pane = await page
        .locator(".pane-wrapper--left")
        .first()
        .evaluate((el) => el.clientWidth);
    const fp = seatFootprintPx(pane);
    await expect
        .poll(async () => (await blob.boundingBox())?.width ?? 0, {
            timeout: 6000,
        })
        .toBeGreaterThanOrEqual(1.6 * fp - 2);
    return { blob, fp };
}

test("O-12 · 1+2 — seat identity (flush, contained) + dock never occluded by the bead's arc", async ({
    page,
}) => {
    const { fp } = await bootWithBlob(page);

    // --blob-seat resolves 0 (the Q3 ruling, mechanically).
    const seat = await page
        .locator(".pane-shell")
        .first()
        .evaluate((el) => getComputedStyle(el).getPropertyValue("--blob-seat").trim());
    expect(seat === "0px" || seat === "0", `--blob-seat = "${seat}"`).toBe(true);

    // Containment: wrapper ⊂ card (the wrapper bounds all paint).
    const wrapper = await page.locator(".hero-blob-anchor").first().boundingBox();
    const card = await page.locator(".pane-shell > *").first().boundingBox();
    if (!wrapper || !card) throw new Error("seat geometry not laid out");
    expect(wrapper.x).toBeGreaterThanOrEqual(card.x - 1);
    expect(wrapper.y).toBeGreaterThanOrEqual(card.y - 1);
    expect(wrapper.x + wrapper.width).toBeLessThanOrEqual(card.x + card.width + 1);
    expect(wrapper.y + wrapper.height).toBeLessThanOrEqual(card.y + card.height + 1);
    // The formula sized the wrapper.
    expect(Math.abs(wrapper.width - fp)).toBeLessThanOrEqual(2);

    // Occlusion: probe the bead's 12-o'clock arc + center + corners of the
    // visible bead box — never a dock-band element.
    const cx = wrapper.x + wrapper.width / 2;
    const cy = wrapper.y + wrapper.height / 2;
    const r = (BEAD_RATIO / 2) * wrapper.width;
    const probes: [number, number][] = [
        [cx, cy],
        [cx, cy - r],
        [cx + r * 0.7, cy - r * 0.7],
        [cx - r * 0.7, cy - r * 0.7],
        [cx, wrapper.y + 2],
    ];
    for (const [x, y] of probes) {
        const hit = await page.evaluate(
            ([px, py]) => {
                const el = document.elementFromPoint(px!, py!);
                return {
                    inDock: !!el?.closest(".glass-dock, nav"),
                    tag: el?.tagName ?? "none",
                };
            },
            [x, y],
        );
        expect(
            hit.inDock,
            `elementFromPoint(${x.toFixed(0)},${y.toFixed(0)}) resolved into the dock (${hit.tag}) — the bead entered the chrome band`,
        ).toBe(false);
    }
});

test("O-12 · 3 — hover-mood frame-diff floor: the parked bead visibly answers a hover within 400ms", async ({
    page,
}) => {
    test.setTimeout(60_000);
    const { blob } = await bootWithBlob(page);

    // Park the blob (true idle past the park latency).
    await waitMs(page, PARK_SETTLE_MS);

    const before = decodePng(await blob.screenshot());
    // Hover-in at the bead center (the wake + curious beat).
    await blob.hover({ position: undefined, force: true });
    await waitMs(page, 400);
    const after = decodePng(await blob.screenshot());

    const diff = meanAbsDiff(before, after);
    console.log(`[o12-hover] mean abs frame diff over the bead box: ${diff.toFixed(2)}/255`);
    expect(
        diff,
        `hover response ${diff.toFixed(2)}/255 < the 6/255 floor — the approach beat is sub-JND (D4 family)`,
    ).toBeGreaterThanOrEqual(6);
});

test("O-12 · 4 — hover-active frame budget: sustained pointermove sweep p50 ≤ 20ms", async ({
    page,
}) => {
    test.setTimeout(60_000);
    await installFrameCollector(page);
    const { blob } = await bootWithBlob(page);
    const renderer = await detectRenderer(page);
    const soft = isSoftwareGL(renderer);

    const box = await blob.boundingBox();
    if (!box) throw new Error("blob box");
    const cx = box.x + box.width / 2;
    const cy = box.y + box.height / 2;
    const r = box.width * 0.2;

    await resetFrames(page);
    // A 2s sustained sweep — the interactive register no gate owned (PI-3b).
    const steps = 60;
    for (let i = 0; i < steps; i++) {
        const a = (i / steps) * Math.PI * 4;
        await page.mouse.move(cx + r * Math.cos(a), cy + r * Math.sin(a), {
            steps: 2,
        });
        await page.waitForTimeout(33);
    }
    const frames = await readFrames(page);
    const p50 = percentile(frames, 50);
    console.log(
        `[o12-hover-active] renderer=${soft ? "SOFTWARE-GL" : "REAL-GPU"} frames=${frames.length} p50=${p50.toFixed(1)}ms (gate ≤20ms real-GPU)`,
    );
    expect(frames.length, "no frames collected").toBeGreaterThan(0);
    if (soft) {
        expect(
            p50,
            `software-GL hover-active p50 ${p50.toFixed(1)}ms over the ${SOFT_CEIL.idleP50Ms}ms hang guard`,
        ).toBeLessThanOrEqual(SOFT_CEIL.idleP50Ms);
    } else {
        expect(
            p50,
            `hover-active p50 ${p50.toFixed(1)}ms over the ≤${GATE.dragP50Ms ?? 20}ms budget`,
        ).toBeLessThanOrEqual(20);
    }
});
