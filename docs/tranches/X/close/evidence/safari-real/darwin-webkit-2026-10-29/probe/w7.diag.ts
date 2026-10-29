// SERVED MODEL: claude-opus-5-5 — X.W11.wk diagnostic (not a gate): a human-paced double activation of each w7 seat.
import { adminPopulatedTest as test, expect } from "/Users/mkbabb/Programming/value.js/e2e/smoke/admin/fixtures/admin-populated";
const SEATS: [string, string, (p: any) => Promise<void>][] = [
    ["/#/admin/names", "Reject color name Wax Seal", async () => {}],
    ["/#/admin/tags", "Delete tag moody", async () => {}],
    ["/#/admin/flagged", "Delete palette Sunset Riot", async () => {}],
    ["/#/admin/users", "Delete all palettes of azure-fox-01", async () => {}],
    ["/#/admin/users", "Delete palette Azure One", async (page) => { await page.getByText("azure-fox-01", { exact: true }).first().click(); await expect(page.locator('[data-admin-palette="azure-one-11aa"]')).toBeVisible(); }],
];
for (const [url, name, pre] of SEATS) {
    test(`human double-click ${name}`, async ({ page }) => {
        await page.goto(url);
        await pre(page);
        const seat = page.getByRole("button", { name, exact: true }).filter({ visible: true });
        await expect(seat).toHaveCount(1);
        const sb = (await seat.boundingBox())!;
        await page.evaluate(() => { (window as any).__log = []; for (const k of ["pointerdown", "click", "dblclick"]) document.addEventListener(k, (e: any) => (window as any).__log.push([k, Math.round(performance.now()), (e.target as Element).tagName + "." + String((e.target as Element).className).slice(0, 40)]), true); });
        const cx = sb.x + sb.width / 2, cy = sb.y + sb.height / 2;
        await page.mouse.click(cx, cy);
        await page.waitForTimeout(150);
        await page.mouse.click(cx, cy, { clickCount: 2 });
        await page.waitForTimeout(600);
        const dialogs = await page.getByRole("dialog").count();
        const content = dialogs ? await page.getByRole("dialog").first().boundingBox({ timeout: 1000 }) : null;
        const inside = content ? cx >= content.x && cx <= content.x + content.width && cy >= content.y && cy <= content.y + content.height : null;
        console.log(JSON.stringify({ name, seat: [Math.round(cx), Math.round(cy)], dialogs, content, seatInsideContent: inside, log: await page.evaluate(() => (window as any).__log) }));
    });
}
