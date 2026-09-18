// CHALLENGE-D pass 2 — probe 3. Edge actuation of the SV field + rail extremes.
//   node docs/tranches/V/megatranche/audit/components/MiniColorPicker/probe-D2-3.mjs
import { webkit } from "playwright";
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
const HERE = import.meta.dirname;
const ORIGIN = "http://localhost:9000";

const browser = await webkit.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
const page = await ctx.newPage();
await page.goto(`${ORIGIN}/#/browse`, { waitUntil: "networkidle", timeout: 45000 });
await page.waitForSelector('button[aria-label="Filters"]', { timeout: 30000 });
await page.waitForTimeout(2200);
for (let a = 0; a < 3; a++) {
    await page.click('button[aria-label="Filters"]');
    await page.waitForTimeout(700);
    if (await page.locator('button[aria-label^="Open color picker"]').count()) break;
}
await page.locator('button[aria-label^="Open color picker"]').first().click({ force: true });
await page.waitForSelector(".sv-canvas");
await page.waitForTimeout(500);

const readHex = () =>
    page.evaluate(() => {
        const dlg = document.querySelector(".sv-canvas").closest('[role="dialog"]');
        const s = [...dlg.querySelectorAll("span")].find((e) => /^#[0-9a-f]{6}$/i.test(e.textContent.trim()));
        return s ? s.textContent.trim() : null;
    });

const sb = await (await page.$(".sv-canvas")).boundingBox();
const out = { fieldRect: sb, arms: [] };
const arms = [
    ["inset+1,+1 (top-left)", sb.x + 1, sb.y + 1],
    ["inset+2,+2", sb.x + 2, sb.y + 2],
    ["inset+4,+4", sb.x + 4, sb.y + 4],
    ["inset+8,+8", sb.x + 8, sb.y + 8],
    ["centre", sb.x + sb.width / 2, sb.y + sb.height / 2],
    ["bottom-right -2,-2", sb.x + sb.width - 2, sb.y + sb.height - 2],
    ["bottom-right -8,-8", sb.x + sb.width - 8, sb.y + sb.height - 8],
];
for (const [name, x, y] of arms) {
    const before = await readHex();
    await page.mouse.click(x, y);
    await page.waitForTimeout(220);
    const after = await readHex();
    const thumb = await page.evaluate(() => {
        const sv = document.querySelector(".sv-canvas");
        const t = sv.querySelector("div").getBoundingClientRect();
        const b = sv.getBoundingClientRect();
        return {
            cx: +(t.left + t.width / 2 - b.left).toFixed(1),
            cy: +(t.top + t.height / 2 - b.top).toFixed(1),
            clippedPct: +(
                (1 -
                    (Math.max(0, Math.min(t.right, b.right) - Math.max(t.left, b.left)) *
                        Math.max(0, Math.min(t.bottom, b.bottom) - Math.max(t.top, b.top))) /
                        (t.width * t.height)) *
                100
            ).toFixed(1),
        };
    });
    out.arms.push({ name, commandedX: +(x - sb.x).toFixed(1), commandedY: +(y - sb.y).toFixed(1), before, after, changed: before !== after, thumb });
}
// rail extremes
const rail = await (await page.$('.sv-canvas >> xpath=following-sibling::div[1]')).boundingBox();
out.rail = [];
for (const [name, fx] of [["x=0 (left end)", 0.0], ["x=1px", 1 / rail.width], ["x=50%", 0.5], ["x=100% (right end)", 1.0]]) {
    await page.mouse.click(rail.x + rail.width * fx, rail.y + rail.height / 2);
    await page.waitForTimeout(200);
    const st = await page.evaluate(() => {
        const dlg = document.querySelector(".sv-canvas").closest('[role="dialog"]');
        const r = dlg.querySelectorAll(":scope > div")[1];
        const h = r.querySelector("div");
        const rb = r.getBoundingClientRect(), hb = h.getBoundingClientRect();
        const visible = Math.max(0, Math.min(hb.right, rb.right) - Math.max(hb.left, rb.left));
        return { left: h.style.left, clippedPct: +((1 - visible / hb.width) * 100).toFixed(1) };
    });
    out.rail.push({ name, ...st });
}
writeFileSync(resolve(HERE, "probe-D2-3.json"), JSON.stringify(out, null, 1));
console.log(JSON.stringify(out, null, 1));
await browser.close();
