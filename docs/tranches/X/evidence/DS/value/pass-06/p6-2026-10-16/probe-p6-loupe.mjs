#!/usr/bin/env node
// X-DS · value · pass 6 (2026-10-16) — the eyedropper loupe's lighting at hover and at pin.
// Real Chrome, new headless (§0ei). Loads an image into /#/extract, opens the eyedropper,
// hovers (loupe live), taps (loupe pinned), reads the loupe's computed border + box-shadow
// in both states and crops the stage. usage: node probe-p6-loupe.mjs [--base http://localhost:9000]
import fs from "node:fs";
import path from "node:path";
import { chromium } from "@playwright/test";
import { bootRoute, newPage } from "./harness.mjs";

const args = process.argv.slice(2);
const BASE = args.indexOf("--base") >= 0 ? args[args.indexOf("--base") + 1] : "http://localhost:9000";
const OUT = import.meta.dirname;
const IMG = path.resolve(OUT, "../../pass-05/picker-1440-light.png");
fs.mkdirSync(path.join(OUT, "crops"), { recursive: true });
const out = {};

const read = (page) => page.evaluate(() => {
    const el = document.querySelector(".loupe");
    if (!el) return null;
    const cs = getComputedStyle(el);
    return { cls: el.className, border: cs.borderTopColor, boxShadow: cs.boxShadow };
});

for (const theme of ["light", "dark"]) {
    let browser;
    try {
        browser = await chromium.launch({ channel: "chrome", headless: true, timeout: 300_000 });
        const page = await newPage(browser, 1440, theme);
        await bootRoute(page, BASE + "/#/extract");
        const input = page.locator('input[type="file"]').first();
        if (await input.count()) await input.setInputFiles(IMG);
        else {
            const [chooser] = await Promise.all([
                page.waitForEvent("filechooser"),
                page.getByRole("button", { name: "Upload image" }).first().click(),
            ]);
            await chooser.setFiles(IMG);
        }
        await page.getByRole("button", { name: "Sample colors from the image" }).first().click({ timeout: 20_000 });
        await page.locator(".eyedropper-canvas").waitFor({ timeout: 10_000 });
        await page.waitForTimeout(800);
        const vp = await page.locator(".eyedropper-canvas").locator("..").boundingBox();
        const cx = vp.x + vp.width / 2, cy = vp.y + vp.height / 2;
        await page.mouse.move(cx - 40, cy - 20);
        await page.mouse.move(cx, cy, { steps: 4 });
        await page.waitForTimeout(400);
        const hover = await read(page);
        await page.screenshot({ path: path.join(OUT, `crops/loupe-hover-1440-${theme}.png`), clip: { x: cx - 120, y: cy - 120, width: 240, height: 240 } });
        await page.mouse.click(cx, cy);
        await page.waitForTimeout(400);
        const pinned = await read(page);
        await page.screenshot({ path: path.join(OUT, `crops/loupe-pinned-1440-${theme}.png`), clip: { x: cx - 120, y: cy - 120, width: 240, height: 240 } });
        out[theme] = { hover, pinned };
    } catch (e) {
        out[theme] = { error: String(e).slice(0, 300) };
    } finally {
        try { await browser?.close(); } catch {}
    }
}
fs.writeFileSync(path.join(OUT, "probe-p6-loupe.json"), JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 2));
