// Ad-hoc: Keyframes surface open timeline at CPU 4x: click -> well visible -> .monaco-editor -> view-lines painted; long tasks + rAF gaps relative to click.
import { chromium } from "playwright";
const BASE = process.argv[2] ?? "http://localhost:4182/";
const browser = await chromium.launch({ headless: true });
try {
    for (let run = 0; run < 1; run++) {
        const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
        const page = await ctx.newPage();
        try {
            await page.addInitScript(() => { window.__lt = []; new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__lt.push([Math.round(e.startTime), Math.round(e.duration)]); }).observe({ type: "longtask", buffered: true }); });
            const c = await ctx.newCDPSession(page); await c.send("Emulation.setCPUThrottlingRate", { rate: 4 });
            await page.goto(BASE + "#/cube", { waitUntil: "load" });
            await page.waitForTimeout(3000);
            await page.locator('[data-dock-tether="top"] .glass-dock').hover(); await page.waitForTimeout(800);
            await page.locator('[aria-label="Editor surfaces"]').first().click(); await page.waitForTimeout(500);
            await page.evaluate(() => {
                window.__ev = [];
                addEventListener("pointerdown", () => {
                    const t0 = (window.__t0 = performance.now()); const seen = new Set();
                    const w = () => {
                        const t = Math.round(performance.now() - t0);
                        const well = [...document.querySelectorAll(".monaco-pane")].find((e) => e.getBoundingClientRect().height > 0 && e.checkVisibility());
                        if (well && !seen.has("well")) { seen.add("well"); window.__ev.push(["wellVisible", t]); }
                        if (document.querySelector(".monaco-editor") && !seen.has("ed")) { seen.add("ed"); window.__ev.push(["monacoEditor", t]); }
                        const vl = document.querySelector(".monaco-editor .view-lines"); if (vl && vl.getBoundingClientRect().height > 0 && !seen.has("vl")) { seen.add("vl"); window.__ev.push(["viewLines", t]); }
                        if (t < 3000 && !seen.has("vl")) requestAnimationFrame(w);
                    };
                    requestAnimationFrame(w);
                }, { once: true, capture: true });
            });
            await c.send("Profiler.enable"); await c.send("Profiler.setSamplingInterval", { interval: 200 }); await c.send("Profiler.start");
            await page.getByRole("menuitem", { name: /^Keyframes/ }).first().click();
            await page.waitForTimeout(1200);
            const p = (await c.send("Profiler.stop")).profile;
            // time-bucketed (100ms) top self functions
            const nodes = new Map(p.nodes.map((n) => [n.id, n])); let t = p.startTime; const buckets = {};
            p.samples.forEach((id, i) => { t += p.timeDeltas[i]; const b = Math.floor((t - p.startTime) / 1000 / 100) * 100; const cf = nodes.get(id).callFrame; const k = (cf.functionName || "(anon)") + "@" + (cf.url.split("/").pop() || "").replace(/-[\w-]{8}\.js/, ".js") + ":" + cf.lineNumber; (buckets[b] ??= {})[k] = ((buckets[b][k] ?? 0) + p.timeDeltas[i] / 1000); });
            for (const [b, m] of Object.entries(buckets)) console.log(b, Object.entries(m).filter(([k]) => !/^\(idle\)/.test(k)).sort((a, z) => z[1] - a[1]).slice(0, 5).map(([k, v]) => k + " " + Math.round(v)).join(" | "));
            console.log(run, JSON.stringify(await page.evaluate(() => ({ ev: window.__ev, lt: window.__lt.filter((x) => x[0] >= window.__t0 - 50).map((x) => [Math.round(x[0] - window.__t0), x[1]]) }))));
        } finally { await ctx.close(); }
    }
} finally { await browser.close(); }
