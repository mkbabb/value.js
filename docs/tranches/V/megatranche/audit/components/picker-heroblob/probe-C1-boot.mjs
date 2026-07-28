// CHALLENGE-C probe C1 — HeroBlob boot cost + presence + backing store.
// Read-only: navigates http://localhost:9000/#/ and measures. No source edits.
import { chromium } from "playwright";

const URL = "http://localhost:9000/#/";
const out = {};

const browser = await chromium.launch();
const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
});
const page = await ctx.newPage();

await page.addInitScript(() => {
    window.__lcp = 0;
    window.__lt = [];
    window.__cls = 0;
    new PerformanceObserver((l) => {
        for (const e of l.getEntries()) window.__lcp = e.startTime;
    }).observe({ type: "largest-contentful-paint", buffered: true });
    new PerformanceObserver((l) => {
        for (const e of l.getEntries()) window.__lt.push({ s: e.startTime, d: e.duration });
    }).observe({ type: "longtask", buffered: true });
    new PerformanceObserver((l) => {
        for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value;
    }).observe({ type: "layout-shift", buffered: true });
});

const consoleErrs = [];
page.on("console", (m) => {
    if (m.type() === "error") consoleErrs.push(m.text());
});
page.on("pageerror", (e) => consoleErrs.push("PAGEERROR " + e.message));

await page.goto(URL, { waitUntil: "load" });
await page.waitForTimeout(12000);

out.consoleErrs = consoleErrs;
out.vitals = await page.evaluate(() => {
    const nav = performance.getEntriesByType("navigation")[0];
    const fcp = performance.getEntriesByName("first-contentful-paint")[0];
    const marks = performance
        .getEntriesByType("mark")
        .filter((m) => m.name.startsWith("overture:"))
        .map((m) => [m.name, Math.round(m.startTime)]);
    const lt = window.__lt;
    const fcpT = fcp ? fcp.startTime : 0;
    const tbt = lt.filter((t) => t.s >= fcpT).reduce((s, t) => s + Math.max(0, t.d - 50), 0);
    return {
        fcpMs: Math.round(fcpT),
        lcpMs: Math.round(window.__lcp),
        cls: +window.__cls.toFixed(4),
        loadEventMs: Math.round(nav.loadEventEnd),
        longTaskCount: lt.length,
        longTaskTotalMs: Math.round(lt.reduce((s, t) => s + t.d, 0)),
        longestTaskMs: Math.round(Math.max(0, ...lt.map((t) => t.d))),
        tbtAfterFcpMs: Math.round(tbt),
        top5Tasks: lt
            .slice()
            .sort((a, b) => b.d - a.d)
            .slice(0, 5)
            .map((t) => ({ startMs: Math.round(t.s), durMs: Math.round(t.d) })),
        overtureMarks: marks,
    };
});

out.dom = await page.evaluate(() => {
    const blob = document.querySelector('[data-testid="goo-blob-canvas"]');
    const anchor = document.querySelector(".hero-blob-anchor");
    const b = blob ? blob.getBoundingClientRect() : null;
    return {
        canvasCount: document.querySelectorAll("canvas").length,
        blobPresent: !!blob,
        anchorPresent: !!anchor,
        blobBacking: blob ? { w: blob.width, h: blob.height } : null,
        blobCss: b ? { w: +b.width.toFixed(1), h: +b.height.toFixed(1) } : null,
        dpr: window.devicePixelRatio,
        ratio: blob && b && b.width > 0 ? +(blob.width / (b.width * window.devicePixelRatio)).toFixed(3) : null,
        outerHTMLHead: anchor ? anchor.outerHTML.slice(0, 300) : null,
    };
});

await browser.close();
console.log(JSON.stringify(out, null, 2));
