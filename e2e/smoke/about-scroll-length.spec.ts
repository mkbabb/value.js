import { test, expect } from "@playwright/test";

/**
 * The About guide keeps its length while it is read. Its sections skip
 * off-screen layout; before, a skipped section stood at a 200 px estimate,
 * so the scroller's length fell section by section as the reader went down
 * (6486 px to 4001 px over thirteen wheel steps at 1440) and the text under
 * the pointer jumped with it; its formulas, typeset one by one as they came
 * near, grew it again.
 */
test.use({ viewport: { width: 1440, height: 900 } });

test("the About scroller's length holds while it is scrolled", async ({ page }) => {
    test.setTimeout(120_000);
    await page.goto("/", { waitUntil: "load" });
    const scroller = page.locator("main .pane-scroll-fade").first();
    await scroller.waitFor({ state: "visible", timeout: 60_000 });
    await expect(scroller.locator(".markdown-body > *").nth(20)).toBeAttached({ timeout: 30_000 });
    // The guide lays itself out whole once, when the browser is first idle
    // (its formulas typeset together), then begins skipping off-screen
    // sections (`data-sized`). The wait is bounded, so a guide that never
    // settles is measured as it stands.
    await page
        .locator(".markdown-wrapper[data-sized]")
        .waitFor({ state: "attached", timeout: 10_000 })
        .catch(() => {});
    await page.waitForTimeout(500);
    const box = (await scroller.boundingBox())!;
    await page.mouse.move(box.x + box.width / 2, box.y + Math.min(300, box.height / 2));
    const heights: number[] = [await scroller.evaluate((e) => e.scrollHeight)];
    for (let i = 0; i < 16; i++) {
        await page.mouse.wheel(0, 240);
        await page.waitForTimeout(120);
        heights.push(await scroller.evaluate((e) => e.scrollHeight));
    }
    const top = await scroller.evaluate((e) => e.scrollTop);
    expect(top, "the guide scrolled").toBeGreaterThan(1500);
    expect(
        Math.max(...heights) - Math.min(...heights),
        `scrollHeight across the scroll: ${heights.join(", ")}`,
    ).toBeLessThanOrEqual(2);
});
