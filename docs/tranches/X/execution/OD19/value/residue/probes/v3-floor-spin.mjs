// OD19 residue (§0gp) — does the V3 instrument read product latency? The spec's
// double-rAF metric over 41 Playwright hover moves across an inert gutter
// (no drag, no colour write), with an added synthetic main-thread cost per
// pointermove of SPIN ms (0, 4, 8, 12). Real-GPU cell (channel "chrome",
// ANGLE-Metal; named need: same cell as the §0gp.2 budget read).
// One browser per run, one context per cell, closed in finally.
import { chromium } from "@playwright/test";
import { writeFileSync, mkdirSync } from "node:fs";
const BASE = process.env.BASE ?? "http://localhost:8475";
const OUT = process.env.OUT ?? "docs/tranches/X/execution/OD19/value/residue/anatomy";
mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true, args: ["--use-angle=metal", "--force-device-scale-factor=2"] });
const res = {};
try {
    for (const spin of [0, 4, 8, 12]) {
        const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
        try {
            await ctx.addInitScript((spin) => {
                const S = (window.__v3 = { on: false, inputs: [] });
                addEventListener("pointermove", (e) => {
                    if (!S.on) return;
                    const t = e.timeStamp;
                    requestAnimationFrame(() => requestAnimationFrame((f2) => S.inputs.push(+(f2 - t).toFixed(1))));
                    const end = performance.now() + spin;
                    while (performance.now() < end) {}
                }, { capture: true });
            }, spin);
            const page = await ctx.newPage();
            await page.goto(BASE + "/#/", { timeout: 120000 });
            await page.locator(".channel-slider").first().waitFor({ timeout: 120000 });
            await page.waitForTimeout(3000);
            await page.evaluate(() => { window.__v3.on = true; });
            await page.mouse.move(2, 700);
            for (let i = 0; i <= 40; i++) await page.mouse.move(2 + 8 * (i / 40), 700);
            await page.waitForTimeout(400);
            const a = await page.evaluate(() => { window.__v3.on = false; return window.__v3.inputs; });
            const s = [...a].sort((x, y) => x - y);
            res[`spin${spin}`] = { n: s.length, p50: s[Math.floor(s.length / 2)], p95: s[Math.floor(0.95 * s.length)] };
            console.log(`spin ${spin} ms`, JSON.stringify(res[`spin${spin}`]));
        } finally { await ctx.close(); }
    }
} finally { await browser.close(); }
writeFileSync(`${OUT}/floor-spin-${process.env.TAG ?? "run"}.json`, JSON.stringify(res, null, 1));
