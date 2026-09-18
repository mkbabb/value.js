// challenge-C · PreviewRamp — can the chip be reached at all? Diagnose the
// operand path, step by step, with a screenshot after each stage.
import { chromium } from "playwright";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const out = {};
page.on("pageerror", (e) => (out.pageErrors ??= []).push(String(e)));
const D = "docs/tranches/V/megatranche/audit/components/PreviewRamp";

await page.goto("http://localhost:9000/#/mix");
await page.waitForSelector(".glass-dock", { timeout: 30000 });
await page.waitForTimeout(2000);

const dots = () =>
    page.evaluate(
        () => document.querySelectorAll(".watercolor-dot, [class*='watercolor']").length,
    );
out.dots0 = await dots();

await page.locator(".add-slot-ghost").first().click({ force: true });
await page.waitForTimeout(700);
out.dots1 = await dots();
await page.screenshot({ path: `${D}/op-after-1-click.png` });

const plate = page.locator("canvas").first();
const pb = await plate.boundingBox();
await page.mouse.click(pb.x + pb.width * 0.85, pb.y + pb.height * 0.25);
await page.waitForTimeout(800);
await page.locator(".add-slot-ghost").first().click({ force: true });
await page.waitForTimeout(900);
out.dots2 = await dots();
await page.screenshot({ path: `${D}/op-after-2-clicks.png` });

await page.getByRole("combobox", { name: "Color space", exact: true }).click();
await page.waitForTimeout(700);
out.listbox = await page.getByRole("listbox").count();
out.options = await page.getByRole("listbox").getByRole("option").count();
out.stopsEls = await page.locator("[data-stops]").count();
out.optionHtml = await page.evaluate(() => {
    const lb = document.querySelector('[role="listbox"]');
    if (!lb) return null;
    const o = lb.querySelector('[role="option"]');
    return o ? o.outerHTML.slice(0, 900) : null;
});
await page.screenshot({ path: `${D}/op-menu-open.png` });
await browser.close();
console.log(JSON.stringify(out, null, 1));
