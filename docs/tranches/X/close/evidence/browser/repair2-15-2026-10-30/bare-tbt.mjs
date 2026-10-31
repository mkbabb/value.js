// SERVED MODEL: claude-opus-5-5
// X-W11 Repair 2 control for trace-tbt.mjs: same launch, viewport, throttle and settle, with no
// tracing and no profiler, so the instruments' cost on trace-tbt's readings can be read off.
// usage: node bare-tbt.mjs <origin> <loads> <out.json>
import { chromium } from "playwright";
import { writeFileSync } from "node:fs";
import { loadavg } from "node:os";
const [origin, loadsArg, out] = process.argv.slice(2);
const browser = await chromium.launch({ channel: "chrome", headless: true, args: ["--use-angle=metal", "--force-device-scale-factor=2"] });
const loads = [];
try {
    for (let i = 0; i < Number(loadsArg); i++) {
        const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
        try {
            const page = await context.newPage();
            await page.addInitScript(() => {
                window.__lt = [];
                new PerformanceObserver((l) => l.getEntries().forEach((e) => window.__lt.push(e.duration))).observe({ type: "longtask", buffered: true });
            });
            const cdp = await context.newCDPSession(page);
            await cdp.send("Network.enable");
            await cdp.send("Network.setCacheDisabled", { cacheDisabled: true });
            await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
            const load1 = loadavg()[0];
            await page.goto(`${origin}/#/`);
            await page.getByRole("main").first().waitFor({ state: "visible", timeout: 30_000 });
            await page.waitForTimeout(3000);
            const lt = await page.evaluate(() => window.__lt);
            loads.push({ i, load1: +load1.toFixed(1), gateTbt: Math.round(lt.reduce((s, d) => s + Math.max(0, d - 50), 0)), tasks: lt.map(Math.round) });
        } finally {
            await context.close();
        }
    }
} finally {
    await browser.close();
}
const g = loads.map((l) => l.gateTbt).sort((a, b) => a - b);
writeFileSync(out, JSON.stringify({ origin, gateSorted: g, p75: g[Math.ceil(0.75 * g.length) - 1], perLoad: loads }, null, 1));
console.log(JSON.stringify({ gateSorted: g, p75: g[Math.ceil(0.75 * g.length) - 1], load1: loads.map((l) => l.load1) }));
