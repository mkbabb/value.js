// CHALLENGE-C r4 · probe 5 — how many characters actually fit in the colour field.
import { chromium } from "playwright";
import fs from "node:fs";
const OUT = new URL("../evidence-r4/", import.meta.url).pathname;
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto("http://localhost:9000/#/browse", { waitUntil: "networkidle" });
await page.waitForTimeout(2200);
await page.locator('button[aria-label="Filters"]').first().click();
await page.waitForTimeout(450);
const panel = page.locator('[role="dialog"]').filter({ hasText: "Find by Color" }).first();
const field = panel.locator('input[type="text"]');

const rows = [];
for (const v of ["#fff", "#ff0000", "#4488cc", "hsl(210 50% 50%)", "rebeccapurple"]) {
    await field.fill(v);
    await page.waitForTimeout(120);
    rows.push(await field.evaluate((i, val) => {
        const cs = getComputedStyle(i);
        const content = i.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
        const c = document.createElement("canvas").getContext("2d");
        c.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
        const w = c.measureText(val).width;
        return { value: val, chars: val.length, textPx: +w.toFixed(1), contentPx: +content.toFixed(1), fits: w <= content, scrollWidth: i.scrollWidth, clientWidth: i.clientWidth, fontSize: cs.fontSize, paddingLeft: cs.paddingLeft, paddingRight: cs.paddingRight };
    }, v));
}
const out = { rows, placeholderFits: null };
await field.fill("");
await page.waitForTimeout(150);
out.placeholderFits = await field.evaluate((i) => {
    const cs = getComputedStyle(i);
    const content = i.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    const c = document.createElement("canvas").getContext("2d");
    c.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
    const w = c.measureText(i.placeholder).width;
    return { placeholder: i.placeholder, textPx: +w.toFixed(1), contentPx: +content.toFixed(1), fits: w <= content };
});
await page.screenshot({ path: OUT + "C-r4-field-placeholder.png", clip: await panel.boundingBox() });
fs.writeFileSync(OUT + "probeC-r4-5.json", JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 2));
await browser.close();
