// X.W7L.i — the ground below the plates: hide every glass plate, sample the
// painted ground under each plate's box (9x9 grid, luminance Y), and compare
// with the instrument's ground referent (--ink-ambient-l, the field mean).
// Usage: node i-ground-probe.mjs <light|dark> <url> <out.json>
import { chromium } from "playwright";
import { writeFileSync } from "node:fs";
const [scheme, url, out] = process.argv.slice(2);
const browser = await chromium.launch({ headless: false });
const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme })).newPage();
await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(3500);
const boxes = await page.evaluate(() => {
    const out = [];
    for (const s of [".dock-plate", '[data-surface="veil"]', ".glass-resting"]) for (const el of document.querySelectorAll(s)) {
        const r = el.getBoundingClientRect(); if (r.width > 4 && r.height > 4) out.push({ sel: s, box: [r.x, r.y, r.width, r.height].map(Math.round) });
    }
    return out;
});
const sample = async () => {
    const buf = await page.screenshot();
    return page.evaluate(async ({ b64, boxes }) => {
        const img = new Image(); img.src = "data:image/png;base64," + b64; await img.decode();
        const cv = document.createElement("canvas"); cv.width = img.width; cv.height = img.height; const c = cv.getContext("2d"); c.drawImage(img, 0, 0);
        const lin = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
        return boxes.map(({ box: [x, y, w, h] }) => { const ys = [];
            for (let i = 0; i < 9; i++) for (let j = 0; j < 9; j++) { const [r, g, b] = c.getImageData(Math.round(x + w * (0.08 + 0.84 * i / 8)), Math.round(y + h * (0.08 + 0.84 * j / 8)), 1, 1).data; ys.push(0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)); }
            ys.sort((a, b) => a - b); return { Ymin: +ys[0].toFixed(4), Ymed: +ys[40].toFixed(4), Ymax: +ys[80].toFixed(4) }; });
    }, { b64: buf.toString("base64"), boxes });
};
const withPlates = await sample();
await page.addStyleTag({ content: ".dock-plate,.glass-dock,[data-slot=card],.glass-resting,.glass-quiet,[data-surface]{visibility:hidden!important}" });
await page.waitForTimeout(400);
const ground = await sample();
const ambientL = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue("--ink-ambient-l").trim());
writeFileSync(out, JSON.stringify({ scheme, url, at: new Date().toISOString(), ambientL, modelGroundY: +(Number(ambientL) ** 3).toFixed(4), rows: boxes.map((b, i) => ({ ...b, composite: withPlates[i], ground: ground[i] })) }, null, 1));
await browser.close();
