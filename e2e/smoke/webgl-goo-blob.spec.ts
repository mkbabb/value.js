import { test, expect } from "@playwright/test";

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
    const viewSelect = page.getByRole("combobox", { name: "Select view" });
    await viewSelect.click({ force: true });
    await page.getByRole("option", { name: "Browse", exact: true }).click();
    await expect(page.getByRole("main", { name: "Color tool panes" })).toBeVisible();

    await viewSelect.click({ force: true });
    await page.getByRole("option", { name: "Home", exact: true }).click();
    await expect(page.getByTestId("goo-blob-canvas").last()).toBeAttached();

    // Quick post-mount warm-up — let one renderer tick land.
    await page.waitForFunction(() => performance.now() > 2000);

    expect(consoleErrors).toEqual([]);
});
