// KF-P4-route-swap probe: cube -> spring via the dock Scene select.
// Pass 1 (timed, no screenshots): pointerdown -> hashchange latency, rAF frame
// deltas from input to +1500 ms, the scene-swap:* performance measures.
// Pass 2 (strip): 5 frames right after the pick, for the double-exposure read.
// One headless browser; one context per cell, closed in finally.
// Usage: node swap-probe.mjs <outDir> [tag]   (BASE env, default localhost:5173)
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
const OUT = process.argv[2];
const TAG = process.argv[3] ?? "run";
const BASE = process.env.BASE ?? "http://localhost:5173/";
fs.mkdirSync(OUT, { recursive: true });
const TOP = '[data-dock-tether="top"] .glass-dock';
const out = {};
const openSelect = async (page) => {
    await page.locator(TOP).hover();
    await page.waitForTimeout(700);
    await page.locator('[data-dock-tether="top"] [aria-label="Scene"]').first().click();
    await page.waitForTimeout(600);
};
const browser = await chromium.launch({ headless: true });
try {
    for (const scheme of ["light", "dark"]) for (const w of [1440, 390]) {
        const key = `${scheme}-${w}`; const o = (out[key] = {}); const H = w === 390 ? 844 : 900;
        for (const pass of ["timed", "strip"]) {
            const ctx = await browser.newContext({ viewport: { width: w, height: H }, colorScheme: scheme, deviceScaleFactor: 2 });
            const page = await ctx.newPage();
            try {
                await page.goto(BASE + "#/cube", { waitUntil: "load" });
                await page.waitForTimeout(2500);
                await openSelect(page);
                if (pass === "timed") {
                    await page.evaluate(() => {
                        window.__r = { rows: [], tIn: null, tHash: null };
                        addEventListener("pointerdown", () => { window.__r.tIn = performance.now(); }, { once: true, capture: true });
                        for (const k of ["pushState", "replaceState"]) { const f = history[k].bind(history); history[k] = (...a) => { f(...a); if (/spring/.test(location.hash)) window.__r.tHash ??= performance.now(); }; }
                        let last = performance.now();
                        const t0 = last;
                        const tick = () => { const now = performance.now(); window.__r.rows.push([Math.round(now), Math.round(now - last), document.documentElement.matches(":active-view-transition") ? 1 : 0]); last = now; if (now - t0 < 4000) requestAnimationFrame(tick); };
                        requestAnimationFrame(tick);
                    });
                    await page.getByRole("option", { name: /spring/i }).first().click();
                    await page.waitForTimeout(1800);
                    Object.assign(o, await page.evaluate(() => {
                        const r = window.__r;
                        const win = r.rows.filter((x) => x[0] >= r.tIn && x[0] <= r.tIn + 1500);
                        const m = Object.fromEntries(performance.getEntriesByType("measure").filter((e) => e.name.startsWith("scene-swap:")).map((e) => [e.name.slice(11), Math.round(e.duration)]));
                        return { inputToHash: r.tHash && Math.round(r.tHash - r.tIn), maxDt: Math.max(...win.map((x) => x[1])), over34: win.filter((x) => x[1] > 34).length, over50: win.filter((x) => x[1] > 50).length, vtFrames: win.filter((x) => x[2]).length, measures: m, hash: location.hash, longRows: win.filter((x) => x[1] > 34).map((x) => [Math.round(x[0] - r.tIn), x[1], x[2]]) };
                    }));
                } else {
                    const opt = page.getByRole("option", { name: /spring/i }).first();
                    const t0 = Date.now(); await opt.click();
                    o.stripMs = [];
                    for (let i = 0; i < 5; i++) { await page.screenshot({ path: path.join(OUT, `strip-${TAG}-${key}-${i}.png`), clip: { x: 0, y: 0, width: w, height: Math.min(H, 520) } }); o.stripMs.push(Date.now() - t0); }
                }
            } catch (e) { o[pass + "Error"] = String(e).slice(0, 300); } finally { await ctx.close(); }
        }
    }
} finally { await browser.close(); }
fs.writeFileSync(path.join(OUT, `swap-${TAG}.json`), JSON.stringify(out, null, 1));
for (const [k, v] of Object.entries(out)) console.log(k, JSON.stringify({ ...v, longRows: v.longRows?.slice(0, 8) }));
