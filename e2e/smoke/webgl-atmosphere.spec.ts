import { test, expect } from "@playwright/test";
import {
    instrumentWebglDraws,
    canvasPresents,
    ATMOSPHERE_TESTID,
} from "./fixtures/webgl-appearance";

/**
 * Smoke (D.W5 Lane A): atmosphere canvas survives a 2s warm-up.
 * Asserts no `webglcontextlost` event fires + no `[stale prop]` console
 * substrings during the warm-up (the atmosphere canvas is root-mounted in
 * App.vue, so it's always alive).
 *
 * Pattern from research/Dg-playwright-coverage.md §3 + audit/D-REACTIVITY-B
 * §7. The `webglcontextlost` listener is installed via `addInitScript` so
 * it's wired BEFORE the canvas mounts.
 *
 * S.W0 W0-2(d) — plus APPEARANCE, not just presence.
 */
test("atmosphere canvas warms up without webglcontextlost", async ({ page }) => {
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

    // Install BEFORE the canvas mounts so the event is observable from t=0.
    await page.addInitScript(() => {
        document.addEventListener(
            "webglcontextlost",
            () => console.error("webglcontextlost"),
            true,
        );
    });
    // W0-2(d): per-canvas WebGL draw counting for the live-aurora presence path.
    await instrumentWebglDraws(page);

    await page.goto("/");
    const canvas = page.getByTestId("atmosphere-canvas");
    await expect(canvas).toBeAttached();

    // Warm-up window: 2s of real-time rendering. performance.now() is
    // browser-monotonic; this is read-only timing (not interaction) and is
    // therefore not the banned `page.evaluate` for-interaction pattern.
    await expect(page.getByRole("main", { name: "Color tool panes" })).toBeVisible();
    await page.waitForFunction(() => performance.now() > 2000);

    // ── S.W0 W0-2(d): APPEARANCE, not just presence (e2e-coverage-gaps §4 P0
    //    item 3). The atmosphere is a full-bleed decorative background.
    //
    //    1 · FULL-BLEED. It must cover ~the whole viewport, not collapse to a
    //        sliver/corner. (`App.vue` sizes it `absolute inset-0 w-full h-full`.)
    const box = await canvas.boundingBox();
    if (!box) throw new Error("atmosphere canvas has no layout box");
    const vp = page.viewportSize();
    if (!vp) throw new Error("no viewport size");
    expect(box.width, "atmosphere spans viewport width").toBeGreaterThanOrEqual(
        vp.width * 0.9,
    );
    expect(box.height, "atmosphere spans viewport height").toBeGreaterThanOrEqual(
        vp.height * 0.9,
    );

    //    2 · PRESENTS ATMOSPHERE. Honest to BOTH render-mode paths: a non-`none`
    //        background-image (the CSS-gradient placeholder, taken under
    //        headless software-GL) OR ≥1 WebGL draw (the live aurora). A blank
    //        canvas with neither = the background is a void → fail.
    const present = await canvasPresents(page, ATMOSPHERE_TESTID);
    expect(
        present.cssPlaceholder || present.draws > 0,
        `atmosphere presents nothing (cssPlaceholder=${present.cssPlaceholder}, draws=${present.draws})`,
    ).toBe(true);

    expect(consoleErrors).toEqual([]);
});
