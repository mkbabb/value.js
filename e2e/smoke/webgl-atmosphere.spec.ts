import { test, expect } from "@playwright/test";

/**
 * Smoke (D.W5 Lane A): atmosphere canvas survives a 2s warm-up.
 * Asserts no `webglcontextlost` event fires + no `[stale prop]` console
 * substrings during the warm-up (the atmosphere canvas is root-mounted in
 * App.vue, so it's always alive).
 *
 * Pattern from research/Dg-playwright-coverage.md §3 + audit/D-REACTIVITY-B
 * §7. The `webglcontextlost` listener is installed via `addInitScript` so
 * it's wired BEFORE the canvas mounts.
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

    await page.goto("/");
    const canvas = page.getByTestId("atmosphere-canvas");
    await expect(canvas).toBeAttached();

    // Warm-up window: 2s of real-time rendering. performance.now() is
    // browser-monotonic; this is read-only timing (not interaction) and is
    // therefore not the banned `page.evaluate` for-interaction pattern.
    await expect(page.getByRole("main", { name: "Color tool panes" })).toBeVisible();
    await page.waitForFunction(() => performance.now() > 2000);

    expect(consoleErrors).toEqual([]);
});
