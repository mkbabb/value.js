// CHALLENGE-D pass 2 — probe 4. All four SV corners + the corner-radius hit clip.
//   node docs/tranches/V/megatranche/audit/components/MiniColorPicker/probe-D2-4.mjs
import { webkit } from "playwright";
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
const HERE = import.meta.dirname;
const browser = await webkit.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
const page = await ctx.newPage();
await page.goto("http://localhost:9000/#/browse", { waitUntil: "networkidle", timeout: 45000 });
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
        const d = document.querySelector(".sv-canvas").closest('[role="dialog"]');
        const s = [...d.querySelectorAll("span")].find((e) => /^#[0-9a-f]{6}$/i.test(e.textContent.trim()));
        return s ? s.textContent.trim() : null;
    });
const hitTarget = (x, y) =>
    page.evaluate(([x, y]) => {
        const el = document.elementFromPoint(x, y);
        return el ? `${el.tagName.toLowerCase()}.${(el.className && el.className.baseVal !== undefined ? el.className.baseVal : String(el.className || "")).split(" ").filter(Boolean).slice(0, 2).join(".")}` : null;
    }, [x, y]);

const sv = await page.$(".sv-canvas");
const b = await sv.boundingBox();
const radius = await page.evaluate(() => getComputedStyle(document.querySelector(".sv-canvas")).borderRadius);
const out = { rect: b, borderRadius: radius, corners: [] };
const CORNERS = [
    ["top-left  (S=0, V=1 → pure white)", b.x + 1, b.y + 1],
    ["top-right (S=1, V=1 → the pure hue)", b.x + b.width - 1, b.y + 1],
    ["bottom-left (S=0, V=0)", b.x + 1, b.y + b.height - 1],
    ["bottom-right (S=1, V=0)", b.x + b.width - 1, b.y + b.height - 1],
    ["control: top edge mid", b.x + b.width / 2, b.y + 1],
    ["control: left edge mid", b.x + 1, b.y + b.height / 2],
];
for (const [name, x, y] of CORNERS) {
    // reset to a known interior value first so "no change" is unambiguous
    await page.mouse.click(b.x + b.width * 0.5, b.y + b.height * 0.5);
    await page.waitForTimeout(180);
    const before = await readHex();
    const target = await hitTarget(x, y);
    await page.mouse.click(x, y);
    await page.waitForTimeout(200);
    const after = await readHex();
    out.corners.push({ name, before, after, actuated: before !== after, elementFromPoint: target });
}
writeFileSync(resolve(HERE, "probe-D2-4.json"), JSON.stringify(out, null, 1));
console.log(JSON.stringify(out, null, 1));
await browser.close();
