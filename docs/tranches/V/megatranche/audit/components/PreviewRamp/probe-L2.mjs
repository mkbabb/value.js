// challenge-L · PreviewRamp — probe 2: reach the two-operand state, then
// measure the chip box against the φ² "golden plate" law asserted in the SFC.
import { chromium } from "playwright";

const out = {};
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
page.on("pageerror", (e) => ((out.pageErrors ??= []).push(String(e))));

await page.goto("http://localhost:9000/#/mix");
await page.waitForSelector(".glass-dock", { timeout: 30000 });
await page.waitForTimeout(1800);

out.addSlotByLabel = await page.locator('[aria-label="Add current color to the mix"]').count();
out.addSlotByClass = await page.locator(".add-slot-ghost").count();
out.addSlotOuter = await page
    .locator(".add-slot-ghost")
    .first()
    .evaluate((el) => el.outerHTML.slice(0, 220))
    .catch((e) => "ERR " + String(e).slice(0, 90));

for (let i = 0; i < 2; i++) {
    try {
        await page.locator(".add-slot-ghost").first().click({ timeout: 6000 });
        await page.waitForTimeout(500);
    } catch (e) {
        out[`addClick${i}`] = String(e).slice(0, 120);
    }
}
await page.waitForTimeout(700);

for (const menu of ["Color space", "Hue method"]) {
    await page.getByRole("combobox", { name: menu, exact: true }).click();
    await page.waitForTimeout(700);
    const chips = page.getByRole("listbox").locator("[data-stops]");
    out[menu] = {
        chipCount: await chips.count(),
        rows: await chips.evaluateAll((els) =>
            els.map((el) => {
                const cs = getComputedStyle(el);
                const r = el.getBoundingClientRect();
                const p = el.parentElement ? getComputedStyle(el.parentElement) : null;
                const paint = cs.backgroundImage;
                return {
                    w: +r.width.toFixed(3),
                    h: +r.height.toFixed(3),
                    ratio: +(r.width / r.height).toFixed(4),
                    fontSize: cs.fontSize,
                    parentFontSize: p ? p.fontSize : null,
                    stamped: (el.getAttribute("data-stops") ?? "").split("|").length,
                    painted: [...paint.matchAll(/oklch\(/g)].length,
                    display: cs.display,
                    radius: cs.borderRadius,
                    ariaHidden: el.getAttribute("aria-hidden"),
                    cls: el.className,
                };
            }),
        ),
    };
    if (out[menu].chipCount > 0 && !out.shotTaken) {
        await page
            .getByRole("listbox")
            .screenshot({ path: new URL("./chip-open-menu.png", import.meta.url).pathname })
            .catch(() => {});
        out.shotTaken = true;
    }
    await page.keyboard.press("Escape");
    await page.waitForTimeout(300);
}

out.rootFontSize = await page.evaluate(() => getComputedStyle(document.documentElement).fontSize);
console.log(JSON.stringify(out, null, 1));
await browser.close();
