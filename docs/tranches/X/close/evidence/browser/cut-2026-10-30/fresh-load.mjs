// SERVED MODEL: claude-opus-5-5
// X.W11.cut (COHESION §0gx.3, Check 3 D-5): the GPU lhci page WITHOUT Lighthouse. Same binary and flags as
// lighthouserc.gpu.json (named witness, full Chrome for Testing: the headless shell has no ANGLE Metal path),
// same URL, same emulation (412x823, DPR 1.75, mobile), and, as under LHCI, a NEW BROWSER for this one load
// (the difference Repair 2's trace-lhci-cell, one browser with many contexts, left open).
// Longtask observer only; no tracing, no profiler. Writes one row and takes no percentile: every row is reported.
// usage: node fresh-load.mjs <origin> <cpuRate> <settleMs> <out.jsonl> [label]
import { chromium } from "playwright";
import { appendFileSync, readFileSync } from "node:fs";
import { loadavg } from "node:os";
const [origin, rate, settle, out, label = ""] = process.argv.slice(2);
const flags = JSON.parse(readFileSync("lighthouserc.gpu.json")).ci.collect.settings.chromeFlags.split(/\s+/);
// FRESH_CHANNEL=chrome: the same load on the real-GPU cell's binary (real-gpu.ts), to read whether the binary matters.
const browser = await chromium.launch(process.env.FRESH_CHANNEL
    ? { channel: process.env.FRESH_CHANNEL, headless: true, args: ["--use-angle=metal", "--disable-field-trial-config"] }
    : { executablePath: chromium.executablePath(), headless: true, args: flags });
try {
    const context = await browser.newContext({ viewport: { width: 412, height: 823 }, deviceScaleFactor: 1.75, isMobile: true, hasTouch: true });
    try {
        const page = await context.newPage();
        await page.addInitScript(() => {
            window.__lt = [];
            new PerformanceObserver((l) => l.getEntries().forEach((e) => window.__lt.push({ t: Math.round(e.startTime), d: Math.round(e.duration) })))
                .observe({ type: "longtask", buffered: true });
        });
        const cdp = await context.newCDPSession(page);
        if (Number(rate) > 1) await cdp.send("Emulation.setCPUThrottlingRate", { rate: Number(rate) });
        const load1 = +loadavg()[0].toFixed(1);
        await page.goto(`${origin}/index.html`);
        await page.getByRole("main").first().waitFor({ state: "visible", timeout: 30_000 });
        await page.waitForTimeout(Number(settle));
        const lt = await page.evaluate(() => window.__lt);
        const renderer = await page.evaluate(() => {
            const g = document.createElement("canvas").getContext("webgl2");
            return g ? g.getParameter(g.getExtension("WEBGL_debug_renderer_info").UNMASKED_RENDERER_WEBGL) : "none";
        });
        appendFileSync(out, JSON.stringify({ label, rate: Number(rate), load1, tbt: lt.reduce((s, k) => s + Math.max(0, k.d - 50), 0), max: Math.max(0, ...lt.map((k) => k.d)), tasks: lt, renderer }) + "\n");
    } finally {
        await context.close();
    }
} finally {
    await browser.close();
}
