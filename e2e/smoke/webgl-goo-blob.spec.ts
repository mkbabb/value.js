import { test, expect } from "@playwright/test";
import { openView } from "./fixtures/dock";
import { instrumentWebglDraws, GOO_BLOB_TESTID, lastCanvasDrawCount } from "./fixtures/webgl-appearance";

/**
 * Smoke (D.W5 Lane A): goo-blob canvas survives a view switch.
 * The blob canvas mounts inside HeroBlob in the picker view; switching
 * away unmounts it. Asserts no `webglcontextlost` or `[stale prop]`
 * during a switch → return cycle.
 *
 * S.W0 W0-2(d) — plus APPEARANCE, not just presence.
 */
test("goo-blob canvas survives view switch without webglcontextlost", async ({
    page,
}) => {
    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
        const text = msg.text();
        if (
            text.includes("webglcontextlost") ||
            text.includes("[stale prop]")
        ) {
            consoleErrors.push(text);
        }
    });
    page.on("pageerror", (err) => {
        if (
            err.message.includes("webglcontextlost") ||
            err.message.includes("[stale prop]")
        ) {
            consoleErrors.push(err.message);
        }
    });

    await page.addInitScript(() => {
        document.addEventListener(
            "webglcontextlost",
            () => console.error("webglcontextlost"),
            true,
        );
    });
    // W0-2(d): count WebGL draw calls per canvas — the robust "is this pipeline
    // actually rendering" oracle (see the fixture for why not readPixels).
    await instrumentWebglDraws(page);

    await page.goto("/");
    // Mounted on the picker (Home) view.
    await expect(page.getByTestId("goo-blob-canvas").last()).toBeAttached();

    // Switch away → switch back. Exercises unmount/remount.
    await openView(page, "Browse");
    await expect(page.getByRole("main", { name: "Color tool panes" })).toBeVisible();

    await openView(page, "Home");
    const blob = page.getByTestId("goo-blob-canvas").last();
    await expect(blob).toBeAttached();

    // Quick post-mount warm-up — let one renderer tick land.
    await page.waitForFunction(() => performance.now() > 2000);

    // ── S.W0 W0-2(d): APPEARANCE, not just presence (e2e-coverage-gaps §4 P0
    //    item 3). "attached + no context-loss" cannot tell a healthy blob from
    //    S-4's "4px smudge, clipped at the corner, renders nothing". Numeric
    //    assertions only, no pixel snapshot (no bit-rot on palette change):
    //
    //    1 · SIZE. A degenerate/clipped blob collapses to a few px; floor at
    //        100 catches the smudge with margin. T.W4-5: the re-mounted blob
    //        EMERGES through the 500ms goo-scale pose (W2-4) — POLL to the
    //        settled footprint before the exact assert (a bare read samples
    //        the arrival pose). Under THE SEAT (D8 — the corner-break law is
    //        dead) the wrapper sits wholly inside the card; only the
    //        transparent 1.6× canvas overscan crosses edges, so the canvas
    //        trivially intersects the viewport — the off-screen assert stays
    //        as the cheap mispositioning guard.
    await expect
        .poll(async () => (await blob.boundingBox())?.width ?? 0, {
            timeout: 4000,
            message: "goo-blob never settled past the emerge pose",
        })
        .toBeGreaterThanOrEqual(100);
    const box = await blob.boundingBox();
    if (!box) throw new Error("goo-blob canvas has no layout box");
    const vp = page.viewportSize();
    if (!vp) throw new Error("no viewport size");
    expect(box.height, "goo-blob height (S-4 smudge floor)").toBeGreaterThanOrEqual(100);
    const visibleW = Math.min(box.x + box.width, vp.width) - Math.max(box.x, 0);
    const visibleH = Math.min(box.y + box.height, vp.height) - Math.max(box.y, 0);
    expect(visibleW, "goo-blob not entirely off-screen (x)").toBeGreaterThan(10);
    expect(visibleH, "goo-blob not entirely off-screen (y)").toBeGreaterThan(10);

    //    2 · IS-RENDERING. The WebGL2 pipeline actually drew geometry to this
    //        canvas (a failed shader compile/link, or a dead render loop, draws
    //        NOTHING). Draw-call counting is used instead of readPixels because
    //        the metaball context is `preserveDrawingBuffer:false` AND the blob
    //        renders on-demand (~a few draws/second when idle), so a readPixels
    //        after compositing reads an empty buffer on most frames — inherently
    //        racy (measured). A per-canvas draw counter (fixture) is buffer- and
    //        timing-independent. Poll until the re-mounted blob has drawn.
    await expect
        .poll(() => lastCanvasDrawCount(page, GOO_BLOB_TESTID), {
            timeout: 10_000,
            message:
                "goo-blob WebGL2 pipeline never drew — canvas renders nothing (S-4 class)",
        })
        .toBeGreaterThan(0);

    expect(consoleErrors).toEqual([]);
});
