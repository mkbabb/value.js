// X.F.W14U.c1 — the contrast guard, measured on painted pixels (headed Chromium, 1440).
// Chip: ink = the chip's computed `color` (opaque); surface = the chip's own painted
// pixel (the mode of its screenshot). Slider: fill and remaining-track pixels read
// from the painted track, the surface from the pixel just above it.
// usage: node contrast.mjs <out.json>
import { createRequire } from "node:module";
import * as fs from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/fourier-analysis/web/package.json");
const { chromium } = require("@playwright/test");
const SLUG = process.env.SLUG;
const lum = ([r, g, b]) => {
    const f = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};
const ratio = (a, b) => { const x = lum(a), y = lum(b); return +(((Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05)).toFixed(2)); };
const browser = await chromium.launch({ headless: false });
const out = {};
for (const scheme of ["light", "dark"]) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme, deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    await page.goto(`http://localhost:3100/v/${SLUG}`);
    const side = page.locator(".viz-panel-left-wrap");
    await side.waitFor({ state: "visible", timeout: 60000 });
    await page.waitForTimeout(2500);
    await side.getByRole("group", { name: "Polynomial bases" }).getByText("Chebyshev").click();
    await side.getByRole("group", { name: "Polynomial bases" }).getByText("Legendre").click();
    await side.locator('[data-slot="configurator-layer-trigger"]', { hasText: "Contour" }).click();
    await page.waitForTimeout(400);
    await side.getByRole("button", { name: "Advanced" }).click();
    await page.mouse.move(5, 895);
    await page.waitForTimeout(900);
    const rows = [];
    // read a pixel of a full-page viewport screenshot
    let shot = 0;
    const px = async (x, y) => {
        const file = `${process.argv[3]}/px-${scheme}-${shot++}.png`;
        await page.screenshot({ path: file, clip: { x: Math.round(x), y: Math.round(y), width: 1, height: 1 } });
        return file;
    };
    const opaque = (css) => page.evaluate((css) => {
        const c = document.createElement("canvas"); c.width = c.height = 1;
        const x = c.getContext("2d", { willReadFrequently: true });
        x.fillStyle = css; x.fillRect(0, 0, 1, 1);
        return [...x.getImageData(0, 0, 1, 1).data.slice(0, 3)];
    }, css);
    for (const chip of await side.locator('[data-slot="toggle-group-item"][data-state="on"]').all()) {
        await chip.scrollIntoViewIfNeeded();
        await page.mouse.move(5, 895);
        await page.waitForTimeout(250);
        const label = (await chip.textContent()).trim().replace(/\s+/g, " ");
        const box = await chip.boundingBox();
        const ink = await opaque(await chip.evaluate((el) => getComputedStyle(el).color));
        const bg = await px(box.x + 6, box.y + box.height / 2);
        rows.push({ kind: "chip ink / chip tint", label, ink, surface: bg, need: 4.5 });
    }
    for (const track of await side.locator('[style*="--row-fill"]').all()) {
        await track.scrollIntoViewIfNeeded();
        await page.waitForTimeout(150);
        const label = await track.evaluate((el) => el.closest("[data-control-row]")?.querySelector("[data-row-label]")?.textContent?.trim());
        const box = await track.boundingBox();
        const fill = await px(box.x + 3, box.y + box.height / 2);
        const rest = await px(box.x + box.width - 4, box.y + box.height / 2);
        const surface = await px(box.x + box.width / 2, box.y - 3);
        rows.push({ kind: "slider fill", label, fill, rest, surface, need: 3 });
    }
    out[scheme] = rows;
    await ctx.close();
}
await browser.close();
fs.writeFileSync(process.argv[2], JSON.stringify(out, null, 2));
for (const [s, rows] of Object.entries(out)) for (const r of rows) console.log(s, JSON.stringify(r));
