#!/usr/bin/env node
// OD19 · load — attribute the in-app HOP's long frames (LoAF scripts) on a built bundle.
// usage: node load-hop-loaf.mjs <origin> <width> <cpu> <route...>
import { chromium } from "playwright";
const [ORIGIN, W = "1440", CPU = "4", ...ROUTES] = process.argv.slice(2);
const TOKEN = process.env.OD19_ADMIN_TOKEN ?? "";
const INIT = (token) => {
    window.__loaf = [];
    try { if (token) localStorage.setItem("palette-admin-token", token); } catch {}
    try {
        new PerformanceObserver((l) => {
            for (const e of l.getEntries()) if (e.duration > 50) window.__loaf.push({
                start: Math.round(e.startTime), dur: Math.round(e.duration), block: Math.round(e.blockingDuration),
                render: Math.round(e.renderStart ? e.startTime + e.duration - e.renderStart : 0),
                scripts: e.scripts.filter((s) => s.duration > 15).map((s) => ({ d: Math.round(s.duration), inv: s.invoker, src: (s.sourceURL || "").split("/").pop() + ":" + s.sourceCharPosition, fn: s.sourceFunctionName, fsl: Math.round(s.forcedStyleAndLayoutDuration) })),
            });
        }).observe({ type: "long-animation-frame", buffered: true });
    } catch {}
};
const browser = await chromium.launch({ headless: true, args: ["--disable-web-security", "--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
try {
    for (const route of ROUTES) {
        const ctx = await browser.newContext({ viewport: { width: +W, height: +W >= 1000 ? 900 : 844 } });
        try {
            await ctx.addInitScript(INIT, TOKEN);
            const page = await ctx.newPage();
            const cdp = await ctx.newCDPSession(page);
            await cdp.send("Emulation.setCPUThrottlingRate", { rate: +CPU });
            await page.goto(`${ORIGIN}/#/`, { waitUntil: "load" });
            await page.waitForLoadState("networkidle", { timeout: 30000 }).catch(() => {});
            await page.waitForTimeout(4000);
            const t0 = await page.evaluate((r) => { window.__loaf.length = 0; const t = performance.now(); location.hash = `#/${r}`; return t; }, route);
            await page.waitForTimeout(3000);
            const loaf = await page.evaluate((t0) => window.__loaf.filter((f) => f.start + f.dur > t0).map((f) => ({ ...f, start: f.start - Math.round(t0) })), t0);
            console.log("== hop", route, await page.evaluate(() => location.hash + " " + document.querySelector("main h1")?.textContent?.trim()));
            for (const f of loaf) console.log(JSON.stringify(f));
        } finally { await ctx.close(); }
    }
} finally { await browser.close(); }
