#!/usr/bin/env node
// OD19 · load — the cold deep link's script waterfall: when each JS chunk starts / ends (resource timing).
// usage: node load-waterfall.mjs <origin> <width> <cpu> <route...>
import { chromium } from "playwright";
const [ORIGIN, W = "1440", CPU = "4", ...ROUTES] = process.argv.slice(2);
const browser = await chromium.launch({ headless: true, args: ["--disable-web-security", "--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
try {
    for (const route of ROUTES) {
        const ctx = await browser.newContext({ viewport: { width: +W, height: +W >= 1000 ? 900 : 844 } });
        try {
            const page = await ctx.newPage();
            const cdp = await ctx.newCDPSession(page);
            await cdp.send("Emulation.setCPUThrottlingRate", { rate: +CPU });
            await page.goto(`${ORIGIN}/#/${route}`, { waitUntil: "load" });
            await page.waitForTimeout(5000);
            const rows = await page.evaluate(() => {
                const n = performance.getEntriesByType("navigation")[0];
                return { dcl: Math.round(n.domContentLoadedEventEnd), res: performance.getEntriesByType("resource").filter((e) => /\.js$/.test(e.name)).map((e) => [Math.round(e.startTime), Math.round(e.responseEnd), Math.round(e.transferSize / 1024), e.initiatorType, e.name.split("/").pop()]) };
            });
            console.log("== cold", route, "dcl", rows.dcl);
            for (const r of rows.res) console.log(r.join(" "));
        } finally { await ctx.close(); }
    }
} finally { await browser.close(); }
