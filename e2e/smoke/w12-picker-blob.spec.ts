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
//
// X.W11.p1 (COHESION §0ge.1, OD-W11-1(a) arm A) — THE DEVICE TIER. On a
// software WebGL rasteriser (`isSoftwareWebGLRenderer()`: SwiftShader,
// llvmpipe, MS Basic Render) HeroBlob paints the bead, parks it, and repaints
// ONE frame per register change; a GPU device keeps the live bead. Liveness
// (idle + hover) is therefore asserted on the real-GPU cell
// (`useRealGpuCell()`, `W12_REAL_GPU=1`), and on a software renderer each test
// asserts the tier's contract instead — painted (the plated bead is not the
// bare plate), parked (diff 0, 0 draws over the window, the hover included),
// and repainted on a register change (a picker click moves the frame by > 0
// with ≥ 1 draw, and the bead parks again after it). The tier is read the way
// the producer reads it: the page's own WebGL renderer string.
import { test, expect, type Page } from "@playwright/test";
import { mainPane } from "./fixtures/dock";
import { decodePng, meanAbsDiff } from "./fixtures/frame-diff";
import { detectRenderer, isSoftwareGL, waitMs } from "./perf/frame-budget";
import { useRealGpuCell } from "./perf/real-gpu";
import {
    GOO_BLOB_TESTID,
    instrumentWebglDraws,
    lastCanvasDrawCount,
} from "./fixtures/webgl-appearance";

test.use({ viewport: { width: 1440, height: 900 } });
useRealGpuCell();

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
    return { d: Math.max(...diffs), draws, last: frames[frames.length - 1]! };
}

/** The tier HeroBlob took on this page: true = the software-raster tier (paint, park, repaint per register change). */
async function softwareTier(page: Page): Promise<boolean> {
    return isSoftwareGL(await detectRenderer(page));
}

/** Mean channel level of a plated bead frame (/255): 0 is the bare #000 plate, i.e. nothing painted. */
function paintedLevel(img: ReturnType<typeof decodePng>): number {
    let sum = 0;
    let n = 0;
    for (let i = 0; i < img.data.length; i += img.channels) {
        sum += img.data[i]! + img.data[i + 1]! + img.data[i + 2]!;
        n += 3;
    }
    return sum / n;
}

/** One register change: a click on the picker surface moves the colour, which re-seeds the hero's ramp. */
async function changeRegister(page: Page) {
    const surface = page.locator(".spectrum-picker").first();
    const b = await surface.boundingBox();
    if (!b) throw new Error("w12-picker-blob: picker surface not laid out");
    await page.mouse.click(b.x + b.width * 0.72, b.y + b.height * 0.28);
}

/**
 * The software-raster tier's contract (§0ge.1 arm A), asserted where the
 * liveness gate would be: painted, parked over the window it measured, then
 * ONE repaint on a register change and parked again.
 */
async function assertSoftwareTier(
    page: Page,
    blob: ReturnType<Page["locator"]>,
    window: { d: number; draws: number; last: ReturnType<typeof decodePng> },
    label: string,
) {
    const level = paintedLevel(window.last);
    console.log(`[w12-blob] ${label} software tier → painted ${level.toFixed(3)}/255 · parked diff ${window.d.toFixed(3)}/255 · ${window.draws} draws`);
    expect(level, "the software-tier bead is the bare plate — nothing was painted").toBeGreaterThan(0);
    expect(window.d, "the software-tier bead moves — the tier did not park").toBe(0);
    expect(window.draws, "the software-tier bead drew while parked").toBe(0);

    const drawsBefore = await lastCanvasDrawCount(page, GOO_BLOB_TESTID);
    await changeRegister(page);
    await expect
        .poll(() => lastCanvasDrawCount(page, GOO_BLOB_TESTID), {
            timeout: 15_000,
            message: "the parked bead did not repaint on a register change",
        })
        .toBeGreaterThan(drawsBefore);
    await waitMs(page, SPACING_MS);
    const repainted = decodePng(await blob.screenshot({ animations: "allow" }));
    const changed = meanAbsDiff(window.last, repainted);
    const after = await motion(page, blob);
    console.log(
        `[w12-blob] ${label} register change → frame diff ${changed.toFixed(3)}/255 · then parked diff ${after.d.toFixed(3)}/255 · ${after.draws} draws`,
    );
    expect(changed, "the repainted bead is the frame before the register change").toBeGreaterThan(0);
    expect(after.d, "the bead did not park again after its repaint").toBe(0);
    expect(after.draws, "the bead kept drawing after its repaint").toBe(0);
}

test("w12-picker-blob · idle: the bead still moves after 5 s without input", async ({
    page,
}) => {
    test.setTimeout(60_000);
    const blob = await bootBlob(page);
    await waitMs(page, IDLE_MS);
    const window = await motion(page, blob);
    const { d, draws } = window;
    console.log(`[w12-blob] idle ${IDLE_MS}ms → max frame diff ${d.toFixed(3)}/255 · ${draws} draws`);
    if (await softwareTier(page)) {
        await assertSoftwareTier(page, blob, window, "idle");
        return;
    }
    expect(d, "the idle bead is a still frame (the wall-clock park)").toBeGreaterThan(0);
});

test("w12-picker-blob · hover: the bead moves while the pointer rests on it", async ({
    page,
}) => {
    test.setTimeout(60_000);
    const blob = await bootBlob(page);
    await waitMs(page, IDLE_MS);
    await blob.hover({ force: true });
    const window = await motion(page, blob);
    const { d, draws } = window;
    console.log(`[w12-blob] hover after ${IDLE_MS}ms idle → max frame diff ${d.toFixed(3)}/255 · ${draws} draws`);
    if (await softwareTier(page)) {
        await assertSoftwareTier(page, blob, window, "hover");
        return;
    }
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
