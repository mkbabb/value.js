#!/usr/bin/env node
// OD19 · load — which canvases change box during an in-app hop (the glass createCanvasLifecycle
// ResizeObserver → resize() cost in the hop's long frames).
// usage: node load-canvas-resize.mjs <origin> <width> <route...>
import { chromium } from "playwright";
const [ORIGIN, W = "1440", ...ROUTES] = process.argv.slice(2);
const browser = await chromium.launch({ headless: true, args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
try {
    for (const route of ROUTES) {
        const ctx = await browser.newContext({ viewport: { width: +W, height: +W >= 1000 ? 900 : 844 } });
        try {
            const page = await ctx.newPage();
            await page.goto(`${ORIGIN}/#/`, { waitUntil: "load" });
            await page.waitForLoadState("networkidle", { timeout: 30000 }).catch(() => {});
            await page.waitForTimeout(3000);
            await page.evaluate(() => {
                window.__rs = [];
                const desc = (el) => { const p = []; let e = el; for (let i = 0; e && i < 4; i++, e = e.parentElement) p.push(e.tagName.toLowerCase() + (e.id ? "#" + e.id : "") + (e.classList.length ? "." + [...e.classList].slice(0, 2).join(".") : "")); return p.join(" < "); };
                const t0 = performance.now();
                const last = new Map();
                const ro = new ResizeObserver((es) => { for (const e of es) { const sz = Math.round(e.contentRect.width) + "x" + Math.round(e.contentRect.height); const prev = last.get(e.target); last.set(e.target, sz); if (prev !== undefined) window.__rs.push([Math.round(performance.now() - t0), desc(e.target), prev + "->" + sz, e.target.isConnected]); } });
                for (const c of document.querySelectorAll("canvas")) ro.observe(c.parentElement ?? c), ro.observe(c);
            });
            await page.waitForTimeout(200);
            await page.evaluate((r) => { location.hash = `#/${r}`; }, route);
            await page.waitForTimeout(2500);
            console.log("== hop", route);
            for (const r of await page.evaluate(() => window.__rs)) console.log(JSON.stringify(r));
        } finally { await ctx.close(); }
    }
} finally { await browser.close(); }
