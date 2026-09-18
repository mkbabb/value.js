// Built-bundle Core Web Vitals probe (MT-F011: no dev-server perf numbers).
import { chromium } from "playwright";
import { writeFileSync, mkdirSync } from "node:fs";

const ORIGIN = process.env.PERF_ORIGIN || "http://localhost:8091";
const ROUTES = ["#/", "#/blob", "#/atmosphere", "#/gradient", "#/browse"];
const CONFIGS = [
  { id: "desktop-unthrottled", cpu: 1, viewport: { width: 1440, height: 900 } },
  { id: "mobile-4x-cpu", cpu: 4, viewport: { width: 390, height: 844 }, mobile: true },
];

const COLLECT = `
new Promise((resolve) => {
  const out = { lcp: 0, cls: 0, fcp: 0, longTasks: [], tbt: 0 };
  try {
    new PerformanceObserver((l) => { for (const e of l.getEntries()) out.lcp = Math.max(out.lcp, e.startTime); })
      .observe({ type: 'largest-contentful-paint', buffered: true });
    new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) out.cls += e.value; })
      .observe({ type: 'layout-shift', buffered: true });
    new PerformanceObserver((l) => { for (const e of l.getEntries()) if (e.name === 'first-contentful-paint') out.fcp = e.startTime; })
      .observe({ type: 'paint', buffered: true });
    new PerformanceObserver((l) => { for (const e of l.getEntries()) { out.longTasks.push(Math.round(e.duration)); out.tbt += Math.max(0, e.duration - 50); } })
      .observe({ type: 'longtask', buffered: true });
  } catch (e) { out.observerError = String(e); }
  setTimeout(() => {
    const nav = performance.getEntriesByType('navigation')[0] || {};
    out.domContentLoaded = Math.round(nav.domContentLoadedEventEnd || 0);
    out.loadEvent = Math.round(nav.loadEventEnd || 0);
    out.transferBytes = performance.getEntriesByType('resource').reduce((n, r) => n + (r.transferSize || 0), 0);
    out.resourceCount = performance.getEntriesByType('resource').length;
    out.lcp = Math.round(out.lcp); out.fcp = Math.round(out.fcp);
    out.tbt = Math.round(out.tbt); out.cls = Number(out.cls.toFixed(4));
    out.longTasks = out.longTasks.sort((a,b)=>b-a).slice(0, 10);
    resolve(out);
  }, 9000);
})`;

const rows = [];
for (const cfg of CONFIGS) {
  const browser = await chromium.launch();
  for (const route of ROUTES) {
    const ctx = await browser.newContext({ viewport: cfg.viewport, isMobile: !!cfg.mobile, hasTouch: !!cfg.mobile });
    const page = await ctx.newPage();
    const cdp = await ctx.newCDPSession(page);
    await cdp.send("Network.setCacheDisabled", { cacheDisabled: true });
    if (cfg.cpu > 1) await cdp.send("Emulation.setCPUThrottlingRate", { rate: cfg.cpu });
    const errs = []; page.on("pageerror", e => errs.push(String(e).slice(0, 160)));
    const t0 = Date.now();
    await page.goto(ORIGIN + "/" + route, { waitUntil: "commit", timeout: 60000 }).catch(e => errs.push("nav:" + String(e).slice(0,90)));
    const m = await page.evaluate(COLLECT).catch(e => ({ error: String(e).slice(0, 120) }));
    m.wallMs = Date.now() - t0;
    rows.push({ config: cfg.id, route, ...m, pageErrors: errs });
    console.log(`${cfg.id.padEnd(22)} ${route.padEnd(14)} LCP=${String(m.lcp).padStart(5)}ms FCP=${String(m.fcp).padStart(5)}ms TBT=${String(m.tbt).padStart(5)}ms CLS=${m.cls} longTasks=${JSON.stringify(m.longTasks)} bytes=${Math.round((m.transferBytes||0)/1024)}KB res=${m.resourceCount} err=${errs.length}`);
    await ctx.close();
  }
  await browser.close();
}
writeFileSync("docs/tranches/V/megatranche/audit/telemetry/PERF.json", JSON.stringify({ origin: ORIGIN, note: "BUILT bundle (gh-pages) via e2e/smoke/perf/serve-built.mjs; cold cache; CDP CPU throttling", rows }, null, 1));
console.log("\nQ14 reference: LCP 5141ms / TBT 5988ms (built-bundle escalation, rode Q->T->U->V.W55). CH-4 target: p75 LCP <= 2.5s.");
