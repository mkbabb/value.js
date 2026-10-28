// OD19 P3 — attribute the long frames in the view-switch-frame-budget flow (load → open menu → Gradient).
import { chromium } from "playwright";
const BASE = process.argv[2] ?? "http://127.0.0.1:8191";
const browser = await chromium.launch({ headless: true, args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
try {
    for (let run = 0; run < 2; run++) {
        const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 } });
        try {
            const page = await ctx.newPage();
            await page.addInitScript(() => {
                window.__loaf = [];
                new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__loaf.push(e); }).observe({ type: "long-animation-frame", buffered: true });
            });
            const t0 = Date.now();
            const reqs = [];
            page.on("request", (r) => { const u = r.url(); if (/Pane-|Pane\.js|assets\/[A-Z]/.test(u)) reqs.push([Date.now() - t0, u.split("/").pop().slice(0, 40)]); });
            await page.goto(`${BASE}/#/`);
            await page.getByRole("main").waitFor();
            const pill = page.locator(".glass-dock.collapsed");
            if (await pill.count()) await pill.click();
            await page.waitForTimeout(400);
            const sel = page.getByRole("combobox", { name: "Select view" });
            await sel.click();
            const opt = page.getByRole("option", { name: "Gradient", exact: true });
            await opt.waitFor();
            const tOpen = await page.evaluate(() => performance.now());
            await opt.click();
            await page.getByRole("heading", { name: "Gradient" }).last().waitFor();
            const tDone = await page.evaluate(() => performance.now());
            const out = await page.evaluate(([a, b]) => window.__loaf.filter((e) => e.startTime + e.duration >= a && e.startTime <= b + 200).map((e) => ({
                t: Math.round(e.startTime - a), d: Math.round(e.duration),
                s: [...e.scripts].sort((x, y) => y.duration - x.duration).slice(0, 3).map((x) => `${x.invoker}|${(x.sourceURL || "").split("/").pop().slice(0, 30)}|${Math.round(x.duration)}`),
            })).filter((e) => e.d > 50), [tOpen, tDone]);
            console.log(`run${run} window=${Math.round(tDone - tOpen)} loaf=${JSON.stringify(out).slice(0, 1400)}`);
            console.log(`run${run} reqs=${JSON.stringify(reqs.filter(([t]) => t > 0)).slice(0, 700)}`);
        } finally { await ctx.close(); }
    }
} finally { await browser.close(); }
