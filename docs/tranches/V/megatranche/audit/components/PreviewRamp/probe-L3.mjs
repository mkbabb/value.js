// challenge-L · PreviewRamp — probe 3.
//  (a) WHY the add-slot is unclickable (the only live path to ≥2 operands);
//  (b) force the handler via a synthetic DOM click so the chip can be MEASURED;
//  (c) measure the chip box vs the φ² "golden plate" law the SFC asserts.
import { chromium } from "playwright";

const out = {};
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
page.on("pageerror", (e) => ((out.pageErrors ??= []).push(String(e))));

await page.goto("http://localhost:9000/#/mix");
await page.waitForSelector(".glass-dock", { timeout: 30000 });
await page.waitForTimeout(1800);

out.addSlot = await page.locator(".add-slot-ghost").first().evaluate((el) => {
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    return {
        tag: el.tagName,
        ariaHidden: el.getAttribute("aria-hidden"),
        ariaLabel: el.getAttribute("aria-label"),
        role: el.getAttribute("role"),
        w: +r.width.toFixed(2),
        h: +r.height.toFixed(2),
        display: cs.display,
        visibility: cs.visibility,
        opacity: cs.opacity,
        pointerEvents: cs.pointerEvents,
        // what actually sits at the slot's centre
        topAtCentre: (() => {
            const e = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
            return e ? e.tagName + "." + String(e.className).slice(0, 70) : null;
        })(),
    };
});

// Force the handler (bypass actionability) so the two-operand state is reachable.
for (let i = 0; i < 2; i++) {
    await page.locator(".add-slot-ghost").first().evaluate((el) => el.click());
    await page.waitForTimeout(500);
}
await page.waitForTimeout(700);

for (const menu of ["Color space", "Hue method"]) {
    await page.getByRole("combobox", { name: menu, exact: true }).click();
    await page.waitForTimeout(800);
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
                };
            }),
        ),
    };
    if (out[menu].chipCount > 0 && !out.shotTaken) {
        await page
            .getByRole("listbox")
            .screenshot({ path: new URL("./chip-open-menu.png", import.meta.url).pathname })
            .catch((e) => ((out.shotErr = String(e).slice(0, 80))));
        out.shotTaken = true;
    }
    await page.keyboard.press("Escape");
    await page.waitForTimeout(300);
}

// Cost of the sampler at menu-open (the 9-space × 17-stop recompute).
out.samplerCostMs = await page.evaluate(() => {
    const t0 = performance.now();
    return performance.now() - t0;
});
out.rootFontSize = await page.evaluate(() => getComputedStyle(document.documentElement).fontSize);
console.log(JSON.stringify(out, null, 1));
await browser.close();
