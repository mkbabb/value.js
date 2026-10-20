// OD19-ALL keyframes load probe. Production build (vite build --mode gh-pages)
// served by `vite preview`. Headless Chromium, CPU throttle 4x (CDP), no network
// throttle (localhost), 1440x900 light, DPR 1. One browser; one context per cell,
// closed in finally.
//   cold  : fresh context (empty cache) -> goto BASE#/<route>; time to route content
//   warm  : one context, boot #/cube, idle 3 s, then hash-navigate route to route
//           (the router->runSceneSwitch path the dock uses); time to commit/total
//           + frame timing during the swap
//   surf  : #/cube, dock "Editor surfaces" -> Keyframes / Timeline; click->content
// Usage: node load-probe.mjs <outFile> [BASE]
import { chromium } from "playwright";
import fs from "node:fs";
const OUT = process.argv[2];
const BASE = process.argv[3] ?? "http://localhost:4181/";
const ROUTES = ["home", "cube", "amiga", "square", "easing", "spring", "sequence"];
const RATE = 4;
const hashOf = (r) => (r === "home" ? "#/" : `#/${r}`);
const INIT = () => {
    window.__lt = [];
    try { new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__lt.push([Math.round(e.startTime), Math.round(e.duration)]); }).observe({ type: "longtask", buffered: true }); } catch {}
    window.__frames = [];
    let last = performance.now();
    const tick = () => { const n = performance.now(); window.__frames.push([Math.round(n), Math.round(n - last), document.documentElement.matches(":active-view-transition") ? 1 : 0]); last = n; requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
};
// route content: #app mounted, no skeleton, scene-host has an element, (home: start screen)
const READY = (route) => {
    const host = document.querySelector(".scene-host");
    if (!host || !host.firstElementChild || host.querySelector(".scene-skeleton")) return false;
    if (document.documentElement.matches(":active-view-transition")) return false;
    if (route === "home") return !!document.querySelector("h1, [class*=start-screen]");
    return host.getBoundingClientRect().height > 0;
};
const throttle = async (ctx, page) => { const c = await ctx.newCDPSession(page); await c.send("Emulation.setCPUThrottlingRate", { rate: RATE }); return c; };
const res = { rate: RATE, cold: {}, warm: {}, surf: {} };
const browser = await chromium.launch({ headless: true });
try {
    for (const r of ROUTES) {
        const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
        const page = await ctx.newPage();
        try {
            await page.addInitScript(INIT);
            await throttle(ctx, page);
            await page.goto(BASE + hashOf(r), { waitUntil: "commit" });
            await page.waitForFunction(READY, r, { timeout: 30000, polling: "raf" });
            const tReady = await page.evaluate(() => Math.round(performance.now()));
            await page.waitForTimeout(1500);
            res.cold[r] = await page.evaluate((tReady) => {
                const rs = performance.getEntriesByType("resource");
                const kb = (f) => Math.round(rs.filter(f).reduce((a, e) => a + (e.decodedBodySize || 0), 0) / 1024);
                const pre = rs.filter((e) => e.responseEnd <= tReady);
                const kbPre = (f) => Math.round(pre.filter(f).reduce((a, e) => a + (e.decodedBodySize || 0), 0) / 1024);
                const fcp = performance.getEntriesByName("first-contentful-paint")[0]?.startTime;
                const lt = window.__lt.filter((x) => x[0] <= tReady);
                const post = window.__lt.filter((x) => x[0] > tReady);
                return { ready: tReady, fcp: fcp && Math.round(fcp), jsKBtoReady: kbPre((e) => /\.js/.test(e.name)), cssKBtoReady: kbPre((e) => /\.css/.test(e.name)), jsKBtotal: kb((e) => /\.js/.test(e.name)), longTasks: lt.length, longMs: lt.reduce((a, x) => a + x[1], 0), worstTask: Math.max(0, ...lt.map((x) => x[1])), postLongMs: post.reduce((a, x) => a + x[1], 0), aurora: rs.some((e) => /HeroAurora/.test(e.name)), reqs: pre.length, chunks: pre.filter((e) => /assets\/[A-Z][A-Za-z]*-/.test(e.name)).map((e) => e.name.split("/").pop().replace(/-[\w-]{8}\.(js|css)$/, ".$1")) };
            }, tReady);
        } catch (e) { res.cold[r] = { error: String(e).slice(0, 200) }; } finally { await ctx.close(); }
    }
    {
        const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
        const page = await ctx.newPage();
        try {
            await page.addInitScript(INIT);
            await throttle(ctx, page);
            await page.goto(BASE + "#/cube", { waitUntil: "load" });
            await page.waitForFunction(READY, "cube", { timeout: 30000 });
            await page.waitForTimeout(3000);
            const order = ["amiga", "square", "easing", "spring", "sequence", "cube", "home", "easing"];
            let from = "cube";
            for (const r of order) {
                const o = await page.evaluate(async (h) => {
                    performance.clearMeasures(); window.__lt.length = 0;
                    const t0 = performance.now();
                    const rs0 = performance.getEntriesByType("resource").length;
                    location.hash = h;
                    await new Promise((res) => { const t = setInterval(() => { if (performance.getEntriesByName("scene-swap:total").length) { clearInterval(t); res(); } }, 16); setTimeout(() => { clearInterval(t); res(); }, 6000); });
                    await new Promise((r) => setTimeout(r, 300));
                    const m = Object.fromEntries(performance.getEntriesByType("measure").filter((e) => e.name.startsWith("scene-swap:")).map((e) => [e.name.slice(11), Math.round(e.duration)]));
                    const win = window.__frames.filter((x) => x[0] >= t0 && x[0] <= t0 + (m.total ?? 1000) + 100);
                    const newRs = performance.getEntriesByType("resource").slice(rs0);
                    return { ...m, frames: win.length, maxFrame: Math.max(0, ...win.map((x) => x[1])), over34: win.filter((x) => x[1] > 34).length, over50: win.filter((x) => x[1] > 50).length, longTasks: window.__lt.length, worstTask: Math.max(0, ...window.__lt.map((x) => x[1])), newKB: Math.round(newRs.reduce((a, e) => a + (e.decodedBodySize || 0), 0) / 1024) };
                }, hashOf(r));
                res.warm[`${from}->${r}`] = o; from = r;
                await page.waitForTimeout(1200);
            }
        } catch (e) { res.warm.error = String(e).slice(0, 300); } finally { await ctx.close(); }
    }
    for (const [name, sel] of [["Keyframes", ".monaco-editor .view-lines"], ["Timeline", '[aria-label="Export CSS"]']]) {
        for (const pass of ["idle3s", "first"]) {
            const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
            const page = await ctx.newPage();
            try {
                await page.addInitScript(INIT);
                await throttle(ctx, page);
                await page.goto(BASE + "#/cube", { waitUntil: "load" });
                await page.waitForFunction(READY, "cube", { timeout: 30000 });
                await page.waitForTimeout(pass === "idle3s" ? 3000 : 300);
                await page.locator('[data-dock-tether="top"] .glass-dock').hover();
                await page.waitForTimeout(800);
                await page.locator('[aria-label="Editor surfaces"]').first().click();
                await page.waitForTimeout(500);
                await page.evaluate((sel) => { window.__lt.length = 0; window.__tc = null; addEventListener("pointerdown", () => { window.__t0 = performance.now(); const w = () => { const el = document.querySelector(sel); if (el && el.getBoundingClientRect().height > 0) window.__tc = performance.now(); else requestAnimationFrame(w); }; requestAnimationFrame(w); }, { once: true, capture: true }); }, sel);
                await page.getByRole("menuitem", { name: new RegExp(`^${name}`) }).first().click();
                await page.waitForSelector(sel, { state: "visible", timeout: 20000 });
                await page.waitForTimeout(600);
                res.surf[`${name}/${pass}`] = await page.evaluate((sel) => {
                    const el = document.querySelector(sel);
                    const t0 = window.__t0;
                    const win = window.__frames.filter((x) => x[0] >= t0 && x[0] <= t0 + 800);
                    return { toContent: window.__tc && Math.round(window.__tc - t0), maxFrame: Math.max(0, ...win.map((x) => x[1])), over50: win.filter((x) => x[1] > 50).length, longTasks: window.__lt.length, worstTask: Math.max(0, ...window.__lt.map((x) => x[1])) };
                }, sel);
                // time to content: re-derive from a MutationObserver-free read: first frame where sel visible
            } catch (e) { res.surf[`${name}/${pass}`] = { error: String(e).slice(0, 200) }; } finally { await ctx.close(); }
        }
    }
} finally { await browser.close(); }
fs.writeFileSync(OUT, JSON.stringify(res, null, 1));
console.log(JSON.stringify(res, null, 0).slice(0, 6000));
