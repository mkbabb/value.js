// SERVED MODEL: claude-opus-5-5
//
// X.W12.d · the hero blob is ANIMATED (OA-23 consumer half · §0cb G-3).
//
// The owner, 2026-09-23: *"the blob is awful, not animated"*. The consumer
// half was a wall-clock park: HeroBlob put the bead to sleep 2 s after the
// last colour change and froze the render loop (the substrate's manual
// suspend) 3.3 s later, so an untouched picker showed a still frame from
// 5.3 s on — and a manual suspend also cancels the engine's own scheduled
// satellite wakes, so the creature never moved again until a colour changed.
//
// This spec measures the rendered bead, never a flag: mean absolute
// difference between screenshots of the bead's anchor box, painted over an
// opaque test-only plate so the moving atmosphere behind the transparent
// canvas cannot count as blob motion (measured: unplated, the ground alone put
// 0.042/255 into the diff of a parked bead).
//   · idle  — no input for 5 s after the bead lands, then three frames 1.5 s
//             apart: the bead still moves (max consecutive diff > 0);
//   · hover — the pointer rests on the bead after that idle: frames taken
//             during the hover still move;
//   · PRM   — under prefers-reduced-motion the producer renders ONE static
//             frame (the spec's "unless PRM"): the diff is 0.
import { test, expect, type Page } from "@playwright/test";
import { mainPane } from "./fixtures/dock";
import { decodePng, meanAbsDiff } from "./fixtures/frame-diff";
import { waitMs } from "./perf/frame-budget";
import {
    GOO_BLOB_TESTID,
    instrumentWebglDraws,
    lastCanvasDrawCount,
} from "./fixtures/webgl-appearance";

test.use({ viewport: { width: 1440, height: 900 } });

const BLOB_CANVAS = `[data-testid="${GOO_BLOB_TESTID}"]`;
const IDLE_MS = 5_000;
const SPACING_MS = 1_500;
const SAMPLES = 3;

async function bootBlob(page: Page) {
    await instrumentWebglDraws(page);
    await page.goto("/");
    await expect(mainPane(page)).toBeVisible();
    const canvas = page.locator(BLOB_CANVAS).last();
    await expect(canvas).toBeAttached({ timeout: 15_000 });
    await page.addStyleTag({ content: ".hero-blob-anchor { background: #000; }" });
    const blob = page.locator(".hero-blob-anchor").last();
    // The emerge pose ends before the idle clock starts.
    await expect
        .poll(async () => (await canvas.boundingBox())?.width ?? 0, { timeout: 8_000 })
        .toBeGreaterThan(100);
    // The idle clock starts once the bead has DRAWN: the engine arms after the
    // overture's emerge beat, and a frame taken before its first draw is an
    // empty canvas, which would read as motion.
    await expect
        .poll(() => lastCanvasDrawCount(page, GOO_BLOB_TESTID), { timeout: 15_000 })
        .toBeGreaterThan(0);
    await waitMs(page, 1_200);
    return blob;
}

/** Max mean-abs diff between consecutive frames of the bead (/255), and the
 *  engine's draw count over the same window (corroboration, never the gate). */
async function motion(page: Page, blob: ReturnType<Page["locator"]>) {
    const drawsBefore = await lastCanvasDrawCount(page, GOO_BLOB_TESTID);
    const frames: ReturnType<typeof decodePng>[] = [];
    for (let i = 0; i < SAMPLES; i++) {
        if (i) await waitMs(page, SPACING_MS);
        frames.push(decodePng(await blob.screenshot({ animations: "allow" })));
    }
    const diffs = frames.slice(1).map((f, i) => meanAbsDiff(frames[i]!, f));
    const draws = (await lastCanvasDrawCount(page, GOO_BLOB_TESTID)) - drawsBefore;
    return { d: Math.max(...diffs), draws };
}

test("w12-picker-blob · idle: the bead still moves after 5 s without input", async ({
    page,
}) => {
    test.setTimeout(60_000);
    const blob = await bootBlob(page);
    await waitMs(page, IDLE_MS);
    const { d, draws } = await motion(page, blob);
    console.log(`[w12-blob] idle ${IDLE_MS}ms → max frame diff ${d.toFixed(3)}/255 · ${draws} draws`);
    expect(d, "the idle bead is a still frame (the wall-clock park)").toBeGreaterThan(0);
});

test("w12-picker-blob · hover: the bead moves while the pointer rests on it", async ({
    page,
}) => {
    test.setTimeout(60_000);
    const blob = await bootBlob(page);
    await waitMs(page, IDLE_MS);
    await blob.hover({ force: true });
    const { d, draws } = await motion(page, blob);
    console.log(`[w12-blob] hover after ${IDLE_MS}ms idle → max frame diff ${d.toFixed(3)}/255 · ${draws} draws`);
    expect(d, "the hovered bead is a still frame").toBeGreaterThan(0);
});

test("w12-picker-blob · PRM: the producer holds one static frame", async ({ page }) => {
    test.setTimeout(60_000);
    // The house idiom (o9 / o11): emulate the media feature on the page.
    await page.emulateMedia({ reducedMotion: "reduce" });
    const blob = await bootBlob(page);
    await waitMs(page, IDLE_MS);
    const { d, draws } = await motion(page, blob);
    console.log(`[w12-blob] PRM → max frame diff ${d.toFixed(3)}/255 · ${draws} draws`);
    expect(d, "the PRM bead animates").toBe(0);
});
