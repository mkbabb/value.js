// SERVED MODEL: claude-opus-5-5
// X.W11.wk (COHESION §0gt.4) — engine-fact probe. One browser per engine,
// one context per cell, closed in finally. No product code: each cell asks the
// ENGINE one question on a static page, so the answer is an engine fact.
import { chromium, webkit } from "@playwright/test";

const engines = process.argv.slice(2).length ? process.argv.slice(2) : ["webkit", "chromium"];
const out = {};
for (const name of engines) {
    const type = name === "webkit" ? webkit : chromium;
    const browser = await type.launch({ headless: true });
    const row = {};
    try {
        // Cell 1: does a fractional mouse position reach the page fractionally?
        {
            const ctx = await browser.newContext({ viewport: { width: 800, height: 400 }, deviceScaleFactor: 2 });
            try {
                const page = await ctx.newPage();
                await page.setContent(`<div id=t style="position:absolute;left:0;top:0;width:800px;height:400px"></div>
<script>window.__ev=[];for(const k of ["pointerdown","mousedown","click"])document.addEventListener(k,e=>__ev.push([k,e.clientX,e.offsetX]))</script>`);
                await page.mouse.click(225.5, 100.25);
                row.fractionalPointer = await page.evaluate(() => window.__ev);
            } finally { await ctx.close(); }
        }
        // Cell 2: which paint-timing entries does the engine emit?
        {
            const ctx = await browser.newContext();
            try {
                const page = await ctx.newPage();
                await page.goto("data:text/html,<p style='font-size:40px'>paint</p>");
                await page.waitForTimeout(800);
                row.paintEntries = await page.evaluate(() => ({
                    supported: PerformanceObserver.supportedEntryTypes,
                    paint: performance.getEntriesByType("paint").map((e) => e.name),
                }));
            } finally { await ctx.close(); }
        }
        // Cell 3: does Tab reach a <button> by default?
        {
            const ctx = await browser.newContext();
            try {
                const page = await ctx.newPage();
                await page.setContent(`<input id=a><button id=b>b</button><input id=c>`);
                await page.focus("#a");
                await page.keyboard.press("Tab");
                const tab = await page.evaluate(() => document.activeElement.id);
                await page.focus("#a");
                await page.keyboard.press("Alt+Tab");
                const altTab = await page.evaluate(() => document.activeElement.id);
                row.tabFromInput = { tab, altTab };
            } finally { await ctx.close(); }
        }
    } finally {
        await browser.close();
    }
    out[name] = row;
}
console.log(JSON.stringify(out, null, 1));
