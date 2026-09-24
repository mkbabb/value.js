// X.F.W14V.s2 ⊕ X.F.W14U.a2 — frames, headed Chromium.
// usage: SLUG=<viz> node s2capture.mjs <phase> <outdir>
import { createRequire } from "node:module";
import * as fs from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/fourier-analysis/web/package.json");
const { chromium } = require("@playwright/test");
const [phase, out] = process.argv.slice(2);
fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ headless: false });
for (const [w, h, scheme] of [[1440, 900, "light"], [1440, 900, "dark"], [390, 844, "light"], [390, 844, "dark"]]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: scheme });
    const page = await ctx.newPage();
    await page.goto(`http://localhost:3100/v/${process.env.SLUG}`);
    if (w < 1024) await page.getByRole("tab", { name: "Controls" }).click();
    const side = page.locator(".viz-panel-left-wrap");
    await side.waitFor({ state: "visible", timeout: 60000 });
    await page.waitForTimeout(2500);
    // Contour open too, so both layer headers (and their resets) read.
    await side.locator('[data-slot="configurator-layer-trigger"]', { hasText: "Contour" }).click();
    const harmonics = side.getByRole("spinbutton", { name: "Harmonics" });
    await harmonics.fill("40"); await harmonics.press("Enter");
    await page.mouse.move(2, h - 4);
    await page.waitForTimeout(1200);
    await page.screenshot({ path: `${out}/${phase}-${w}-${scheme}.png` });
    if (w === 1440) {
        await side.locator('[data-slot="configurator-layer-trigger"]', { hasText: "Contour" }).scrollIntoViewIfNeeded();
        await page.waitForTimeout(400);
        await page.screenshot({ path: `${out}/${phase}-${w}-${scheme}-contour.png` });
    }
    await ctx.close();
}
await browser.close();
