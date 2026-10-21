#!/usr/bin/env node
// OD19 · load — cold deep links under a stated network (RTT + bandwidth) and CPU throttle:
// time to route content and when the route's pane chunk was requested.
// usage: node load-cold-net.mjs <origin> <out.json> <width> <cpu> <rttMs> <downKbps> <reps> <route:regions:chunk...>
import { chromium } from "playwright";
import { writeFileSync } from "node:fs";
const [ORIGIN, OUT, W, CPU, RTT, DOWN, REPS, ...SPEC] = process.argv.slice(2);
const ROUTES = SPEC.flatMap((s) => s.split(/\s+/)).filter(Boolean).map((s) => { const [r, n, c] = s.split(":"); return [r, +n, c]; });
const WAIT = async ([route, regions, limit]) => {
    const ok = () => {
        if (location.hash !== `#/${route}`) return false;
        const ws = document.querySelectorAll("main .pane-wrapper");
        if (ws.length < regions) return false;
        for (const w of ws) { if (w.querySelector(".pane-plate")) return false; const c = w.firstElementChild; if (!c || c.getBoundingClientRect().height < 8) return false; }
        return !!document.querySelector("main h1");
    };
    while (performance.now() < limit) { const t = await new Promise((r) => requestAnimationFrame(r)); if (ok()) return t; }
    return null;
};
const browser = await chromium.launch({ headless: true, args: ["--disable-web-security", "--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
const rows = [];
try {
    for (let i = 0; i < +REPS; i++) for (const [route, regions, chunk] of ROUTES) {
        const ctx = await browser.newContext({ viewport: { width: +W, height: +W >= 1000 ? 900 : 844 } });
        try {
            // A cold load issues 300+ requests; the default 250-entry resource buffer drops the tail.
            await ctx.addInitScript(() => performance.setResourceTimingBufferSize(4000));
            const page = await ctx.newPage();
            const cdp = await ctx.newCDPSession(page);
            await cdp.send("Network.enable");
            await cdp.send("Network.emulateNetworkConditions", { offline: false, latency: +RTT, downloadThroughput: (+DOWN * 1024) / 8, uploadThroughput: (750 * 1024) / 8 });
            await cdp.send("Emulation.setCPUThrottlingRate", { rate: +CPU });
            await page.goto(`${ORIGIN}/#/${route}`, { waitUntil: "commit" });
            const hit = await page.evaluate(WAIT, [route, regions, 60000]);
            const res = await page.evaluate(() => performance.getEntriesByType("resource").filter((e) => /\.js$/.test(e.name)).map((e) => [e.name.split("/").pop(), Math.round(e.startTime), Math.round(e.responseEnd)]));
            const entry = res.find((r) => /^index-/.test(r[0]));
            const pane = res.find((r) => r[0].startsWith(chunk + "-"));
            const row = { route, rep: i, contentMs: hit == null ? null : Math.round(hit), entryEnd: entry?.[2], paneStart: pane?.[1], paneEnd: pane?.[2] };
            rows.push(row); console.log(JSON.stringify(row));
        } finally { await ctx.close(); }
    }
} finally { await browser.close(); }
writeFileSync(OUT, JSON.stringify({ origin: ORIGIN, width: +W, cpu: +CPU, rttMs: +RTT, downKbps: +DOWN, at: new Date().toISOString(), rows }, null, 1));
