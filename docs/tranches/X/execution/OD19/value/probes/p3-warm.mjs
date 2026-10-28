// OD19 P3 — is the idle warm landing, and where does the first gradient swap spend its time?
import { chromium } from "playwright";
const BASE = process.argv[2] ?? "http://localhost:9000";
const browser = await chromium.launch({ headless: true });
try {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    const t0 = Date.now();
    const paneReqs = [];
    page.on("request", (r) => { if (/Pane\.vue/.test(r.url())) paneReqs.push([Date.now() - t0, r.url().replace(BASE, "").slice(0, 80)]); });
    await page.goto(`${BASE}/#/`, { waitUntil: "load" });
    await page.waitForLoadState("networkidle", { timeout: 60000 });
    await page.waitForTimeout(1500);
    console.log("pane requests before hop:", JSON.stringify(paneReqs));
    const n0 = paneReqs.length;
    const r = await page.evaluate(async () => {
        const lo = [];
        new PerformanceObserver((l) => { for (const e of l.getEntries()) lo.push([Math.round(e.startTime), Math.round(e.duration), (e.scripts ?? []).slice(0, 3).map((s) => `${s.invoker}|${(s.sourceURL ?? "").split("/").slice(-2).join("/")}|${Math.round(s.duration)}`)]); }).observe({ type: "long-animation-frame" });
        const t = performance.now();
        location.hash = "#/gradient";
        while (performance.now() - t < 4000) {
            await new Promise((r) => requestAnimationFrame(r));
            if ([...document.querySelectorAll("main h1")].some((h) => h.textContent?.trim() === "Gradient")) break;
        }
        const title = performance.now() - t;
        await new Promise((r) => setTimeout(r, 1500));
        return { title: Math.round(title), loaf: lo.filter((e) => e[0] >= t - 50).slice(0, 8) };
    });
    console.log("hop:", JSON.stringify(r));
    console.log("pane requests during hop:", JSON.stringify(paneReqs.slice(n0)));
} finally {
    await browser.close();
}
