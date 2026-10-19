// X-DS keyframes pass 14 — the spring facet's served geometry at the fold (headless real Chrome, §0ei)
import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const BASE = process.env.BASE ?? "http://localhost:5173/";
const sizes = (process.argv[2] ?? "1440x900,1280x760,1280x800,1024x700,1440x1080").split(",").map((s) => s.split("x").map(Number));
const browser = await chromium.launch({ channel: "chrome", headless: true });
const out = {};
for (const [w, h] of sizes) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h } });
    const page = await ctx.newPage();
    await page.goto(`${BASE}#/spring`, { waitUntil: "domcontentloaded", timeout: 240000 });
    await page.evaluate(() => localStorage.clear());
    await page.reload({ waitUntil: "domcontentloaded", timeout: 240000 });
    await page.waitForTimeout(Number(process.env.SETTLE ?? 6000));
    out[`${w}x${h}`] = await page.evaluate(() => {
        const sEl = [...document.querySelectorAll(".controls-surface")].find((e) => e.getBoundingClientRect().width > 0);
        const s = sEl.getBoundingClientRect();
        const fade = parseFloat(getComputedStyle(sEl).getPropertyValue("--surface-fade-end")) || 0;
        const sec = document.querySelector(".spring-heatmap-section").getBoundingClientRect();
        const field = document.querySelector(".spring-heatmap").getBoundingClientRect();
        const grid = document.querySelector(".preset-grid").getBoundingClientRect();
        const r = Math.round;
        return {
            surfaceTop: r(s.top), fold: r(s.bottom), fadeStart: r(s.bottom - fade), scrollH: sEl.scrollHeight, clientH: sEl.clientHeight,
            presets: [r(grid.top), r(grid.bottom)], section: [r(sec.top), r(sec.bottom)], field: [r(field.top), r(field.height)],
            sectionWhole: sec.bottom <= s.bottom - fade, sectionBelowFold: sec.top >= s.bottom - 1,
        };
    });
    await ctx.close();
}
console.log(JSON.stringify(out, null, 1));
await browser.close();
