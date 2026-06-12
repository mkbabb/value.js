import { test, expect } from "@playwright/test";
import { openView } from "./fixtures/dock";

/**
 * Smoke (D.W5 Lane A): goo-blob canvas survives a view switch.
 * The blob canvas mounts inside HeroBlob in the picker view; switching
 * away unmounts it. Asserts no `webglcontextlost` or `[stale prop]`
 * during a switch → return cycle.
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

    await page.goto("/");
    // Mounted on the picker (Home) view.
    await expect(page.getByTestId("goo-blob-canvas").last()).toBeAttached();

    // Switch away → switch back. Exercises unmount/remount.
    await openView(page, "Browse");
    await expect(page.getByRole("main", { name: "Color tool panes" })).toBeVisible();

    await openView(page, "Home");
    await expect(page.getByTestId("goo-blob-canvas").last()).toBeAttached();

    // Quick post-mount warm-up — let one renderer tick land.
    await page.waitForFunction(() => performance.now() > 2000);

    expect(consoleErrors).toEqual([]);
});
