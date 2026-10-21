#!/usr/bin/env node
// OD19 repair 3 (C3-V-02) — the dock with the colour-input face open: the field's box against the dock row,
// and a frame of the band, at 1440 and 390, light and dark. usage: node r3-field-shot.mjs <origin> <outdir> <tag>
import { chromium } from "playwright";
import { writeFileSync } from "node:fs";
const [ORIGIN, DIR, TAG] = process.argv.slice(2);
const res = {};
const browser = await chromium.launch({ headless: true });
try {
    for (const w of [1440, 390]) for (const scheme of ["light", "dark"]) {
        const cell = `${scheme}-${w}`;
        const ctx = await browser.newContext({ viewport: { width: w, height: w === 390 ? 844 : 900 }, colorScheme: scheme, deviceScaleFactor: 2 });
        try {
            await ctx.addInitScript((th) => { try { localStorage.setItem("vueuse-color-scheme", th); } catch {} }, scheme);
            const page = await ctx.newPage();
            await page.goto(`${ORIGIN}/#/`, { waitUntil: "load", timeout: 120000 });
            await page.locator(".glass-dock .dock-plate").first().waitFor({ timeout: 120000 });
            await page.waitForTimeout(3000);
            await page.locator('.glass-dock button[aria-label="Toggle action bar"]').first().click();
            await page.waitForTimeout(900);
            await page.locator('.glass-dock button[aria-label="Open color input"]').first().click();
            await page.waitForTimeout(900);
            await page.mouse.move(5, w === 390 ? 839 : 895); await page.waitForTimeout(500);
            res[cell] = await page.evaluate(() => { const f = document.querySelector(".glass-dock .color-input"); const p = document.querySelector(".glass-dock .dock-plate"); const fr = f.getBoundingClientRect(), pr = p.getBoundingClientRect(); const r = document.createRange(); r.selectNodeContents(f); const tr = r.getBoundingClientRect(); return { field: [+fr.top.toFixed(1), +fr.height.toFixed(1)], plate: [+pr.top.toFixed(1), +pr.height.toFixed(1)], text: f.textContent.slice(0, 40), textMidOffset: tr.height ? +((tr.top + tr.height / 2) - (fr.top + fr.height / 2)).toFixed(2) : null }; });
            const b = await page.locator(".glass-dock").first().boundingBox();
            await page.screenshot({ path: `${DIR}/field-${TAG}-${cell}.png`, clip: { x: Math.max(0, b.x - 16), y: Math.max(0, b.y - 12), width: Math.min(w, b.width + 32), height: b.height + 24 } });
        } catch (e) { res[cell] = { error: String(e).slice(0, 200) }; }
        finally { await ctx.close(); }
    }
} finally { await browser.close(); }
writeFileSync(`${DIR}/field-${TAG}.json`, JSON.stringify(res, null, 2));
console.log(JSON.stringify(res));
