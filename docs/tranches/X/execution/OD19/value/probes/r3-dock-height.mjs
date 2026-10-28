#!/usr/bin/env node
// OD19 repair 3 (C3-V-02) — the dock keeps one block size through the Tools face: at rest (before the first
// Tools visit, so the ColorInput face is not yet mounted), with Tools open, and after Back. Per cell, the
// plate's height is sampled every rAF through each swap. Also reads the field's box and glass's
// --dock-layer-height. GREEN iff rest == tools == back and no sampled frame leaves [rest - 0.5, rest + 0.5].
// MODE pointer clicks Tools and Back with the mouse (the pointer then rests on a hovered dock control);
// MODE keyboard parks the pointer off the dock and presses Enter on each focused control, so no control is
// hovered while the dock re-measures (separates the field's own height from glass's hover-scale peak).
// R3_SHOTS=<dir> also saves the dock band with Tools open, per cell.
// usage: node r3-dock-height.mjs <origin> <out.json> [pointer|keyboard]   (one headless browser, a context per cell)
import { chromium } from "playwright";
import { writeFileSync } from "node:fs";
const [ORIGIN, OUT, MODE = "pointer"] = process.argv.slice(2);
const TRACE = async (ms) => {
    const hs = []; const t0 = performance.now();
    await new Promise((res) => { const f = () => { const p = document.querySelector(".glass-dock .dock-plate"); hs.push(p ? p.getBoundingClientRect().height : -1); performance.now() - t0 < ms ? requestAnimationFrame(f) : res(); }; requestAnimationFrame(f); });
    return [Math.min(...hs), Math.max(...hs), hs.length];
};
const READ = () => {
    const p = document.querySelector(".glass-dock .dock-plate"); const f = document.querySelector(".glass-dock .color-input");
    return { plate: +p.getBoundingClientRect().height.toFixed(2), field: f ? +f.getBoundingClientRect().height.toFixed(2) : null, layer: getComputedStyle(document.querySelector(".glass-dock")).getPropertyValue("--dock-layer-height").trim() || null, control: getComputedStyle(p).getPropertyValue("--dock-control-size").trim().slice(0, 40) || null, layerPx: (() => { const d = document.createElement("div"); d.style.blockSize = "var(--dock-layer-height)"; document.querySelector(".glass-dock").append(d); const h = d.getBoundingClientRect().height; d.remove(); return h; })() };
};
const report = {}; let green = true;
const browser = await chromium.launch({ headless: true });
try {
    for (const w of [1440, 390]) for (const scheme of ["light", "dark"]) {
        const cell = `${scheme}-${w}`;
        const ctx = await browser.newContext({ viewport: { width: w, height: w === 390 ? 844 : 900 }, colorScheme: scheme, deviceScaleFactor: 1 });
        try {
            await ctx.addInitScript((th) => { try { localStorage.setItem("vueuse-color-scheme", th); } catch {} }, scheme);
            const page = await ctx.newPage();
            await page.goto(`${ORIGIN}/#/`, { waitUntil: "load", timeout: 120000 });
            await page.locator(".glass-dock .dock-plate").first().waitFor({ timeout: 120000 });
            await page.waitForTimeout(3500);
            const R = (report[cell] = {});
            R.rest = await page.evaluate(READ);
            // pointer: rest the mouse on the dock's centre, as an owner reaching for Tools does; keyboard: off the dock
            await page.mouse.move(MODE === "keyboard" ? 5 : w / 2, MODE === "keyboard" ? (w === 390 ? 839 : 895) : 50);
            const press = async (loc) => { if (MODE === "keyboard") { await loc.focus(); await page.keyboard.press("Enter"); } else await loc.click(); };
            const tgl = page.locator('.glass-dock button[aria-label="Toggle action bar"]').first();
            const t1 = page.evaluate(TRACE, 1600); await press(tgl); R.toTools = await t1;
            R.tools = await page.evaluate(READ);
            if (process.env.R3_SHOTS) { const b = await page.locator(".glass-dock").first().boundingBox(); if (b) await page.screenshot({ path: `${process.env.R3_SHOTS}/tools-${MODE}-${cell}.png`, clip: { x: Math.max(0, b.x - 16), y: Math.max(0, b.y - 12), width: Math.min(w, b.width + 32), height: b.height + 24 } }); }
            const t2 = page.evaluate(TRACE, 1600); await press(page.locator('.glass-dock button[aria-label="Back"]').first()); R.toBack = await t2;
            R.back = await page.evaluate(READ);
            R.peak = await page.evaluate(() => document.querySelector(".glass-dock .dock-crossfade")?.style.getPropertyValue("--dock-crossfade-peak") || null);
            const h = R.rest.plate;
            const eq = (a) => Math.abs(a - h) <= 0.5;
            R.verdict = eq(R.tools.plate) && eq(R.back.plate) && eq(R.toTools[0]) && eq(R.toTools[1]) && eq(R.toBack[0]) && eq(R.toBack[1]) ? "GREEN" : "RED";
            if (R.verdict !== "GREEN") green = false;
            console.log(cell, JSON.stringify(R));
        } catch (e) { report[cell] = { error: String(e).slice(0, 200) }; green = false; console.log(cell, "ERROR", String(e).slice(0, 200)); }
        finally { await ctx.close(); }
    }
} finally { await browser.close(); }
report.mode = MODE; report.verdict = green ? "GREEN" : "RED";
writeFileSync(OUT, JSON.stringify(report, null, 2));
console.log("verdict", report.verdict);
