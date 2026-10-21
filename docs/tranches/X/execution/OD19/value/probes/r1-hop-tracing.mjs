#!/usr/bin/env node
// OD19 · repair 1 (C1-V-05) — where the Home -> Gradient hop's main-thread time goes: a Chrome trace of the hop,
// summed by event name on the renderer main thread (CrRendererMain). usage: node r1-hop-tracing.mjs <origin> <width> <scheme> [hash]
import { chromium } from "playwright";
const [ORIGIN, W = "1440", SCHEME = "light", HASH = "#/gradient"] = process.argv.slice(2);
const browser = await chromium.launch({ headless: true });
try {
    const ctx = await browser.newContext({ viewport: { width: +W, height: +W >= 1000 ? 900 : 844 }, colorScheme: SCHEME });
    try {
        const page = await ctx.newPage();
        await page.goto(`${ORIGIN}/#/`, { waitUntil: "load", timeout: 90000 });
        await page.waitForLoadState("networkidle", { timeout: 30000 }).catch(() => {});
        await page.waitForTimeout(5000);
        const cdp = await ctx.newCDPSession(page);
        const events = [];
        cdp.on("Tracing.dataCollected", (d) => events.push(...d.value));
        const done = new Promise((r) => cdp.once("Tracing.tracingComplete", r));
        await cdp.send("Tracing.start", { categories: "devtools.timeline,disabled-by-default-devtools.timeline,blink,cc", transferMode: "ReportEvents" });
        await page.evaluate((h) => { location.hash = h; }, HASH);
        await page.waitForTimeout(2200);
        await cdp.send("Tracing.end");
        await done;
        const main = new Set(events.filter((e) => e.name === "thread_name" && e.args?.name === "CrRendererMain").map((e) => `${e.pid}:${e.tid}`));
        const sum = new Map();
        for (const e of events) {
            if (e.ph !== "X" || !main.has(`${e.pid}:${e.tid}`)) continue;
            const k = e.name;
            const v = sum.get(k) ?? [0, 0, 0];
            v[0] += (e.dur ?? 0) / 1000; v[1]++; v[2] = Math.max(v[2], (e.dur ?? 0) / 1000);
            sum.set(k, v);
        }
        const rows = [...sum].sort((a, b) => b[1][0] - a[1][0]).slice(0, 22);
        // Every thread's top-level time (the off-main raster / GPU / compositor share of the hop).
        const tname = new Map(events.filter((e) => e.name === "thread_name").map((e) => [`${e.pid}:${e.tid}`, e.args?.name]));
        const per = new Map();
        for (const e of events) {
            if (e.ph !== "X" || !e.dur) continue;
            const t = tname.get(`${e.pid}:${e.tid}`) ?? "?";
            const k = `${t} :: ${e.name}`;
            per.set(k, (per.get(k) ?? 0) + e.dur / 1000);
        }
        const offMain = [...per].filter(([k]) => !k.startsWith("CrRendererMain")).sort((a, b) => b[1] - a[1]).slice(0, 25).map(([k, v]) => [k, Math.round(v)]);
        console.log(JSON.stringify({ W, SCHEME, HASH, rows: rows.map(([k, v]) => [k, Math.round(v[0]), v[1], Math.round(v[2])]), offMain }));
    } finally { await ctx.close(); }
} finally { await browser.close(); }
