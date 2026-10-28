// OD19 value — BEFORE probe for V3 (slider/gradient input→paint latency, with
// long-animation-frame attribution), V5 (gradient/mix cold + in-app load), V6
// (the loading plate, chunk held), V8 (the channel rail). Headless shell; ONE
// browser per run, one context per cell, closed in finally.
import { chromium } from "@playwright/test";
import { writeFileSync } from "node:fs";
const BASE = process.env.BASE ?? "http://localhost:9000";
const OUT = process.env.OUT;
const CELLS = (process.env.CELLS ?? "dark-1440,light-1440,dark-390,light-390").split(",");

const ARM = () => {
    const S = (window.__lat = { inputs: [], loaf: [], frames: [] });
    addEventListener("pointermove", (e) => {
        if (!S.on) return;
        const t = e.timeStamp;
        requestAnimationFrame(() => requestAnimationFrame((f2) => S.inputs.push(f2 - t)));
    }, { capture: true });
    try {
        new PerformanceObserver((l) => {
            for (const e of l.getEntries()) if (S.on) S.loaf.push({ d: Math.round(e.duration), blk: Math.round(e.blockingDuration ?? 0), scripts: (e.scripts ?? []).map((s) => ({ d: Math.round(s.duration), inv: (s.invoker ?? "").slice(0, 80), src: (s.sourceURL ?? "").replace(location.origin, "").slice(0, 90), fn: s.sourceFunctionName })) });
        }).observe({ type: "long-animation-frame", buffered: false });
    } catch {}
    const tick = (t) => { if (S.on) S.frames.push(t); requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
};
const stats = (a) => {
    if (!a.length) return null;
    const s = [...a].sort((x, y) => x - y);
    const q = (p) => +s[Math.min(s.length - 1, Math.floor(p * s.length))].toFixed(1);
    return { n: s.length, p50: q(0.5), p95: q(0.95), max: +s[s.length - 1].toFixed(1) };
};
async function dragMeasure(page, handle, label) {
    const box = await handle.boundingBox();
    if (!box) return { label, missing: true };
    await page.evaluate(() => { const S = window.__lat; S.inputs = []; S.loaf = []; S.frames = []; S.on = true; });
    const horizontal = box.width >= box.height;
    const y = box.y + box.height / 2, x = box.x + box.width / 2;
    const t0 = Date.now();
    if (horizontal) {
        await page.mouse.move(box.x + box.width * 0.2, y);
        await page.mouse.down();
        for (let i = 0; i <= 40; i++) await page.mouse.move(box.x + box.width * (0.2 + 0.6 * (i / 40)), y);
    } else {
        await page.mouse.move(x, box.y + box.height * 0.2);
        await page.mouse.down();
        for (let i = 0; i <= 40; i++) await page.mouse.move(x, box.y + box.height * (0.2 + 0.6 * (i / 40)));
    }
    await page.mouse.up();
    const wall = Date.now() - t0;
    await page.waitForTimeout(400);
    const S = await page.evaluate(() => { const S = window.__lat; S.on = false; return { inputs: S.inputs, loaf: S.loaf, frames: S.frames }; });
    const dts = S.frames.slice(1).map((f, i) => f - S.frames[i]);
    const scriptTotals = {};
    for (const l of S.loaf) for (const sc of l.scripts) { const k = `${sc.src}::${sc.fn || sc.inv}`; scriptTotals[k] = (scriptTotals[k] ?? 0) + sc.d; }
    return {
        label, wallMs: wall, inputToPaint: stats(S.inputs), frameInterval: stats(dts),
        loaf: { n: S.loaf.length, totalMs: S.loaf.reduce((a, l) => a + l.d, 0), blockingMs: S.loaf.reduce((a, l) => a + l.blk, 0) },
        topScripts: Object.entries(scriptTotals).sort((a, b) => b[1] - a[1]).slice(0, 8),
        // repair 3: attributed script time per long frame, and over every frame of the drag
        scriptsPerLoaf: stats(S.loaf.map((l) => l.scripts.reduce((a, sc) => a + sc.d, 0))),
        scriptMsPerFrame: +(S.loaf.reduce((a, l) => a + l.scripts.reduce((b, sc) => b + sc.d, 0), 0) / Math.max(1, S.frames.length)).toFixed(1),
    };
}

const report = {};
const browser = await chromium.launch({ headless: true });
try {
    for (const cell of CELLS) {
        const [scheme, w] = cell.split("-");
        const W = +w;
        const mk = async () => {
            const ctx = await browser.newContext({ viewport: { width: W, height: W === 390 ? 844 : 900 }, colorScheme: scheme });
            await ctx.addInitScript((th) => { try { localStorage.setItem("vueuse-color-scheme", th); } catch {} }, scheme);
            await ctx.addInitScript(ARM);
            return ctx;
        };
        const R = (report[cell] = {});
        // ── V3 + V8 on the picker
        let ctx = await mk();
        try {
            const page = await ctx.newPage();
            await page.goto(BASE + "/#/", { waitUntil: "load", timeout: 120000 });
            await page.locator(".channel-slider").first().waitFor({ timeout: 120000 });
            await page.waitForTimeout(3000);
            const rail = page.locator(".channel-rail").first();
            await rail.scrollIntoViewIfNeeded().catch(() => {});
            await rail.screenshot({ path: `${OUT}/v8-rail-${cell}.png` }).catch(() => {});
            R.v8_rail = await rail.evaluate((el) => { const cs = getComputedStyle(el); return { border: cs.border, outline: cs.outline, boxShadow: cs.boxShadow, bg: cs.backgroundColor, radius: cs.borderRadius }; }).catch((e) => String(e).slice(0, 100));
            const sl = page.locator(".channel-slider").first();
            await sl.scrollIntoViewIfNeeded();
            R.v3_pickerSlider = await dragMeasure(page, sl, "picker channel slider");
            const spectrum = page.locator("canvas.spectrum-canvas, .spectrum-canvas, [data-spectrum]").first();
            if (await spectrum.count()) R.v3_spectrum = await dragMeasure(page, spectrum, "spectrum");
            // ── V3 on the gradient workbench (first slider / stop handle inside the pane)
            await page.evaluate(() => { location.hash = "#/gradient"; });
            await page.waitForFunction(() => document.querySelector("main h1")?.textContent?.includes("Gradient"), null, { timeout: 60000 }).catch(() => {});
            await page.waitForTimeout(2500);
            const gs = page.locator('.pane-wrapper [role="slider"]').first();
            if (await gs.count()) R.v3_gradientSlider = await dragMeasure(page, gs, "gradient pane first [role=slider]");
        } catch (e) { R.v3_error = String(e).slice(0, 300); } finally { await ctx.close(); }

        // ONLY=v3 (repair 3): stop after the drag cells
        if (process.env.ONLY === "v3") continue;
        // ── V5: cold loads and in-app navigation
        for (const route of ["gradient", "mix"]) {
            ctx = await mk();
            try {
                const page = await ctx.newPage();
                const errs = [], failed = [];
                let reqs = 0;
                page.on("console", (m) => { if (m.type() === "error") errs.push(m.text().slice(0, 160)); });
                page.on("pageerror", (e) => errs.push("PAGEERROR " + String(e).slice(0, 160)));
                page.on("request", () => reqs++);
                page.on("requestfailed", (r) => failed.push(r.url().replace(BASE, "").slice(0, 100)));
                page.on("response", (r) => { if (r.status() >= 400) failed.push(`${r.status()} ${r.url().replace(BASE, "").slice(0, 100)}`); });
                const t0 = Date.now();
                await page.goto(`${BASE}/#/${route}`, { waitUntil: "load", timeout: 120000 });
                const tLoad = Date.now() - t0;
                const label = route === "gradient" ? "Gradient" : "Mix";
                let tTitle = null, plateSeen = false;
                const poll = setInterval(async () => { try { if (await page.locator("text=Loading the scene").count()) plateSeen = true; } catch {} }, 100);
                try {
                    await page.waitForFunction((l) => document.querySelector("main h1")?.textContent?.trim() === l, label, { timeout: 90000 });
                    tTitle = Date.now() - t0;
                } catch {}
                clearInterval(poll);
                await page.waitForTimeout(2000);
                await page.screenshot({ path: `${OUT}/v5-cold-${route}-${cell}.png` }).catch(() => {});
                const nav = await page.evaluate(() => { const n = performance.getEntriesByType("navigation")[0]; const p = performance.getEntriesByType("paint"); return { dcl: Math.round(n.domContentLoadedEventEnd), load: Math.round(n.loadEventEnd), fcp: Math.round(p.find((x) => x.name === "first-contentful-paint")?.startTime ?? -1), resources: performance.getEntriesByType("resource").length }; });
                // in-app: Home, then route
                await page.evaluate(() => { location.hash = "#/"; });
                await page.waitForTimeout(2500);
                const t1 = Date.now();
                await page.evaluate((r) => { location.hash = "#/" + r; }, route);
                let tInApp = null;
                try { await page.waitForFunction((l) => document.querySelector("main h1")?.textContent?.trim() === l, label, { timeout: 60000 }); tInApp = Date.now() - t1; } catch {}
                R[`v5_${route}`] = { tLoadEvent: tLoad, tTitleVisible: tTitle, plateSeen, nav, requests: reqs, errors: errs.slice(0, 6), failed: failed.slice(0, 6), tInAppSecondVisit: tInApp };
            } catch (e) { R[`v5_${route}_error`] = String(e).slice(0, 300); } finally { await ctx.close(); }
        }

        // ── V6: the loading plate, with the gradient pane's chunk held 4 s
        ctx = await mk();
        try {
            const page = await ctx.newPage();
            await page.goto(BASE + "/#/", { waitUntil: "load", timeout: 120000 });
            await page.locator(".channel-slider").first().waitFor({ timeout: 120000 });
            await page.waitForTimeout(2500);
            await ctx.route(/workbenches\/gradient\/GradientPane\.vue/, async (r) => { await new Promise((s) => setTimeout(s, 4000)); await r.continue(); });
            await page.evaluate(() => { location.hash = "#/gradient"; });
            const plate = page.locator(".pane-plate").first();
            await plate.waitFor({ timeout: 4000 }).catch(() => {});
            await page.waitForTimeout(400);
            R.v6_plate = await page.evaluate(() => { const p = document.querySelector(".pane-plate"); return p && { text: p.innerText.trim(), aria: p.querySelector("[role=status]")?.getAttribute("aria-label"), busy: p.querySelector("[aria-busy]")?.getAttribute("aria-busy") }; });
            await page.screenshot({ path: `${OUT}/v6-loading-plate-${cell}.png` }).catch(() => {});
        } catch (e) { R.v6_error = String(e).slice(0, 300); } finally { await ctx.close(); }
    }
} finally {
    await browser.close();
}
writeFileSync(`${OUT}/latency-load.json`, JSON.stringify(report, null, 1));
console.log("ok");
