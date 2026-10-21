#!/usr/bin/env node
// OD19 · load — attribute the WARM-reload long frames (LoAF scripts) on a built bundle.
// usage: node load-warm-loaf.mjs <origin> <route> [width=1440] [cpu=4]
import { chromium } from "playwright";
const [ORIGIN, ROUTE = "palettes", W = "1440", CPU = "4"] = process.argv.slice(2);
const INIT = () => {
    window.__loaf = [];
    try {
        new PerformanceObserver((l) => {
            for (const e of l.getEntries()) if (e.duration > 150) window.__loaf.push({
                start: Math.round(e.startTime), dur: Math.round(e.duration), block: Math.round(e.blockingDuration),
                render: Math.round(e.renderStart ? e.startTime + e.duration - e.renderStart : 0),
                style: Math.round(e.styleAndLayoutStart ? e.startTime + e.duration - e.styleAndLayoutStart : 0),
                scripts: e.scripts.filter((s) => s.duration > 20).map((s) => ({ d: Math.round(s.duration), inv: s.invoker, src: (s.sourceURL || "").split("/").pop() + ":" + s.sourceCharPosition, fn: s.sourceFunctionName, fsl: Math.round(s.forcedStyleAndLayoutDuration) })),
            });
        }).observe({ type: "long-animation-frame", buffered: true });
    } catch {}
};
const browser = await chromium.launch({ headless: true, args: ["--disable-web-security", "--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
try {
    const ctx = await browser.newContext({ viewport: { width: +W, height: +W >= 1000 ? 900 : 844 } });
    try {
        await ctx.addInitScript(INIT);
        const page = await ctx.newPage();
        const cdp = await ctx.newCDPSession(page);
        await cdp.send("Emulation.setCPUThrottlingRate", { rate: +CPU });
        for (const phase of ["cold", "warm", "warm-clear", "warm2"]) {
            if (phase === "warm-clear") await page.evaluate(() => { localStorage.clear(); sessionStorage.clear(); });
            if (phase === "cold") await page.goto(`${ORIGIN}/#/${ROUTE}`, { waitUntil: "load" });
            else await page.reload({ waitUntil: "load" });
            await page.waitForTimeout(6000);
            const nav = await page.evaluate(() => { const n = performance.getEntriesByType("navigation")[0]; const r = performance.getEntriesByType("resource").filter((e) => e.name.includes("/index-")); return { dcl: Math.round(n.domContentLoadedEventEnd), load: Math.round(n.loadEventEnd), idx: r.map((e) => [Math.round(e.startTime), Math.round(e.responseEnd), e.transferSize]) }; });
            console.log("nav", JSON.stringify(nav));
            const loaf = await page.evaluate(() => window.__loaf);
            console.log("==", phase);
            for (const f of loaf) console.log(JSON.stringify(f));
        }
    } finally { await ctx.close(); }
} finally { await browser.close(); }
