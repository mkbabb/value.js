// X-DS keyframes pass 13 — the spring facet's served geometry (headless real Chrome, §0ei)
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
        const R = (e) => { const r = e.getBoundingClientRect(); return [Math.round(r.left), Math.round(r.top), Math.round(r.right), Math.round(r.bottom)]; };
        const sEl = [...document.querySelectorAll(".controls-surface")].find((e) => e.getBoundingClientRect().width > 0);
        const s = sEl.getBoundingClientRect();
        const fade = parseFloat(getComputedStyle(sEl).getPropertyValue("--surface-fade-end")) || 0;
        const field = document.querySelector(".spring-heatmap");
        const x = document.querySelector(".spring-heatmap-x").getBoundingClientRect();
        const grid = document.querySelector(".preset-grid");
        const tiles = [...document.querySelectorAll(".preset-cell")].map(R);
        const pips = [...document.querySelectorAll(".spring-heatmap-pip")].map((p) => {
            const l = p.querySelector("span");
            const vis = getComputedStyle(l).display !== "none" && l.getBoundingClientRect().width > 0;
            return { name: l.textContent.trim(), dot: R(p), label: vis ? R(l) : null, current: p.classList.contains("is-current") };
        });
        const named = pips.filter((p) => p.label);
        const overlaps = [];
        for (let i = 0; i < named.length; i++) for (let j = i + 1; j < named.length; j++) {
            const a = named[i].label, b = named[j].label;
            if (a[0] < b[2] && b[0] < a[2] && a[1] < b[3] && b[1] < a[3]) overlaps.push([named[i].name, named[j].name]);
        }
        return {
            fold: Math.round(s.bottom), fadeStart: Math.round(s.bottom - fade), railTop: Math.round(s.top),
            presets: grid ? R(grid) : null, tilesBottom: Math.max(...tiles.map((t) => t[3])),
            presetsAboveFade: grid ? grid.getBoundingClientRect().bottom <= s.bottom - fade : null,
            fieldTop: Math.round(field.getBoundingClientRect().top), field: Math.round(field.getBoundingClientRect().height),
            xAxisBottom: Math.round(x.bottom), axisAboveFade: x.bottom <= s.bottom - fade,
            pips, labelOverlaps: overlaps,
        };
    });
    await ctx.close();
}
console.log(JSON.stringify(out, null, 1));
await browser.close();
