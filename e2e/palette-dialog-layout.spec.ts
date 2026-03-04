import { test, expect, type Page } from "@playwright/test";

async function openPaletteDialog(page: Page) {
    await page.locator(".lucide-palette").first().click();
    const dialog = page.locator(".palette-dialog").first();
    await expect(dialog).toBeVisible({ timeout: 5000 });
    return dialog;
}

test.describe("Palette Dialog Layout", () => {
    test("desktop dialog stays in viewport and scrolls inside the content pane", async ({
        page,
    }) => {
        test.setTimeout(60_000);

        await page.goto("/");
        await page.waitForSelector(".spectrum-picker");

        const dialog = await openPaletteDialog(page);

        const bounds = await dialog.evaluate((el) => {
            const rect = el.getBoundingClientRect();
            return {
                top: rect.top,
                right: rect.right,
                bottom: rect.bottom,
                left: rect.left,
                viewportWidth: window.innerWidth,
                viewportHeight: window.innerHeight,
            };
        });

        expect(bounds.top).toBeGreaterThanOrEqual(0);
        expect(bounds.left).toBeGreaterThanOrEqual(0);
        expect(bounds.right).toBeLessThanOrEqual(bounds.viewportWidth);
        expect(bounds.bottom).toBeLessThanOrEqual(bounds.viewportHeight);

        await dialog.locator(".lucide-plus").first().click();

        const nameInput = dialog.getByPlaceholder("Palette name...");
        const saveButton = dialog
            .getByRole("button", { name: "Save", exact: true })
            .last();

        for (let i = 0; i < 18; i++) {
            await nameInput.fill(`layout-check-${i}-${Date.now()}`);
            await expect(saveButton).toBeEnabled();
            await saveButton.click();
        }

        const scrollPane = dialog.getByTestId("palette-browser-scroll-pane");
        await expect(scrollPane).toBeVisible();

        const activePane = dialog
            .locator('[role="tabpanel"][data-state="active"]')
            .first();
        await expect(activePane).toBeVisible();

        const paneMetrics = await scrollPane.evaluate((el) => {
            const panel = el as HTMLElement;
            const style = getComputedStyle(panel);
            const paddingLeft = Number.parseFloat(style.paddingLeft) || 0;
            const paddingRight = Number.parseFloat(style.paddingRight) || 0;
            return {
                overflowY: style.overflowY,
                overflowX: style.overflowX,
                clientHeight: panel.clientHeight,
                scrollHeight: panel.scrollHeight,
                width: panel.clientWidth,
                contentWidth: panel.clientWidth - paddingLeft - paddingRight,
                scrollTopBefore: panel.scrollTop,
            };
        });

        const activePaneWidth = await activePane.evaluate((el) => {
            const panel = el as HTMLElement;
            return panel.getBoundingClientRect().width;
        });

        expect(["auto", "scroll"]).toContain(paneMetrics.overflowY);
        expect(paneMetrics.overflowX).toBe("hidden");
        expect(paneMetrics.scrollHeight).toBeGreaterThan(paneMetrics.clientHeight);
        expect(
            Math.abs(activePaneWidth - paneMetrics.contentWidth),
        ).toBeLessThanOrEqual(2);

        const scrollTopAfter = await scrollPane.evaluate((el) => {
            const panel = el as HTMLElement;
            panel.scrollTop = panel.scrollHeight;
            return panel.scrollTop;
        });

        expect(scrollTopAfter).toBeGreaterThan(paneMetrics.scrollTopBefore);
    });
});
