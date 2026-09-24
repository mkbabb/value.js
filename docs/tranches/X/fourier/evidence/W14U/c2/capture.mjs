// X.F.W14U.c2 — frames (1440 light/dark) + the hover-tint contrast probes, headed Chromium.
// usage: SLUG=<viz> node c2capture.mjs <phase> <outdir>
// Writes <phase>-*.png frames and <phase>-probes.json: for each probe the ink
// (computed, opaque) and the frame + pixel where its surface is sampled.
import { createRequire } from "node:module";
import * as fs from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/fourier-analysis/web/package.json");
const { chromium } = require("@playwright/test");
const [phase, out] = process.argv.slice(2);
fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ headless: false });
const probes = [];
for (const scheme of ["light", "dark"]) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme, deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    const ink = (loc) => loc.evaluate((el) => {
        const c = document.createElement("canvas"); c.width = c.height = 1;
        const x = c.getContext("2d", { willReadFrequently: true });
        const col = getComputedStyle(el).color;
        // A computed `oklab()` is converted by hand (OKLab -> linear sRGB -> sRGB):
        // the 2D canvas left an oklab fillStyle unparsed (read back as #000).
        const m = col.match(/^oklab\(([-\d.e]+) ([-\d.e]+) ([-\d.e]+)/);
        if (m) {
            const [L, a, b] = m.slice(1).map(Number);
            const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
            const mm = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
            const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
            const lin = [4.0767416621 * l - 3.3077115913 * mm + 0.2309699292 * s,
                -1.2684380046 * l + 2.6097574011 * mm - 0.3413193965 * s,
                -0.0041960863 * l - 0.7034186147 * mm + 1.707614701 * s];
            return lin.map((v) => Math.round(255 * Math.min(1, Math.max(0, v <= 0.0031308 ? 12.92 * v : 1.055 * v ** (1 / 2.4) - 0.055))));
        }
        x.fillStyle = col; x.fillRect(0, 0, 1, 1);
        return [...x.getImageData(0, 0, 1, 1).data.slice(0, 3)];
    });
    const shot = async (name) => { const f = `${out}/${phase}-${name}-1440-${scheme}.png`; await page.screenshot({ path: f }); return f; };
    await page.goto(`http://localhost:3100/v/${process.env.SLUG}`);
    const side = page.locator(".viz-panel-left-wrap");
    await side.waitFor({ state: "visible", timeout: 60000 });
    await page.waitForTimeout(2500);
    await side.getByRole("group", { name: "Polynomial bases" }).getByText("Chebyshev").click();
    await page.mouse.move(700, 880);
    await page.waitForTimeout(800);
    await shot("chips");
    // The contour editor.
    const edit = page.getByRole("button", { name: "Edit contour" }).first();
    await edit.hover(); await page.waitForTimeout(600); await edit.click();
    await page.locator("circle.control-point").nth(10).waitFor({ state: "attached" });
    await page.waitForTimeout(500);
    const dock = page.locator(".controls-overlay").last();
    const pt = await page.locator("circle.control-point").nth(12).boundingBox();
    await page.mouse.click(pt.x + pt.width / 2, pt.y + pt.height / 2); // select → Delete enabled
    await page.waitForTimeout(300);
    const exp = dock.getByRole("button", { name: "Expand dock" });
    if (await exp.isVisible()) { await exp.click(); await page.waitForTimeout(700); }
    for (const [label, name] of [["Delete point", "hover-delete"], ["Save contour", "hover-save"]]) {
        const b = dock.getByRole("button", { name: label }).first();
        const box = await b.boundingBox();
        await page.mouse.move(box.x + box.width / 2 - 6, box.y + box.height / 2 - 6);
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 4 });
        await page.waitForTimeout(1000);
        probes.push({ scheme, probe: `${label} hovered glyph`, computed: await b.evaluate((el) => getComputedStyle(el).color), disabled: await b.isDisabled(), ink: await ink(b), frame: await shot(name), x: Math.round(box.x + 4), y: Math.round(box.y + box.height / 2), need: 3 });
    }
    await dock.getByRole("button", { name: "More editor tools" }).click();
    await page.waitForTimeout(400);
    const menu = page.getByRole("menu");
    const field = menu.getByRole("spinbutton", { name: /Magnet/ });
    await field.fill("4"); await field.press("Enter"); await page.waitForTimeout(300);
    for (const [label, name] of [["Smooth contour", "hover-smooth"], ["Simplify contour", "hover-simplify"]]) {
        const row = menu.getByRole("menuitem", { name: label });
        const box = await row.boundingBox();
        await page.mouse.move(box.x + box.width / 2 - 8, box.y + box.height / 2 - 4);
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 4 });
        await page.waitForTimeout(1000);
        for (let k = 0; k < 4 && !(await row.evaluate((el) => el.hasAttribute("data-highlighted"))); k++) {
            await page.mouse.move(box.x + box.width / 2 + 6 * (k + 1), box.y + box.height / 2, { steps: 3 });
            await page.waitForTimeout(700);
        }
        probes.push({ scheme, probe: `${label} hovered glyph on its row tint`, highlighted: await row.evaluate((el) => el.hasAttribute("data-highlighted")), ink: await ink(row.locator("svg").first()), frame: await shot(name), x: Math.round(box.x + box.width - 6), y: Math.round(box.y + box.height / 2), need: 3 });
    }
    const g = menu.locator("svg.lucide-magnet");
    if (await g.count()) {
    const gb = await g.boundingBox();
    const sec = await menu.locator(".magnet-section").boundingBox();
    probes.push({ scheme, probe: "Magnet glyph (on) on the menu", ink: await ink(g), frame: await shot("hover-simplify"), x: Math.round(sec.x + sec.width - 4), y: Math.round(gb.y + 2), need: 3 });
    }
    await ctx.close();
}
await browser.close();
fs.writeFileSync(`${out}/${phase}-probes.json`, JSON.stringify(probes, null, 1));
