/**
 * U-GESTALT probe 2 — focused measurements for the remaining T rows.
 * Probe-only against LIVE :9000.
 */
import { chromium } from "playwright";
import { mkdirSync, appendFileSync, writeFileSync } from "node:fs";

const BASE = "http://localhost:9000";
const OUT = "docs/tranches/T/audit/pi/u-gestalt";
mkdirSync(`${OUT}/frames`, { recursive: true });
const logfile = `${OUT}/probe2-log.txt`;
writeFileSync(logfile, `# probe2 @ ${new Date().toISOString()}\n`);
const log = (s) => { console.log(s); appendFileSync(logfile, s + "\n"); };

const browser = await chromium.launch({ headless: true });
async function mkPage(scheme, width, height = width === 390 ? 844 : 900) {
    const ctx = await browser.newContext({ viewport: { width, height }, colorScheme: scheme, deviceScaleFactor: 2 });
    await ctx.addInitScript((s) => { try { localStorage.setItem("vueuse-color-scheme", s); } catch (_) {} }, scheme);
    const page = await ctx.newPage();
    return { ctx, page };
}
const goto = (page, hash) => page.goto(`${BASE}/#${hash}`, { waitUntil: "load" });

// ---- 1. Palettes ramp zoom (T-56) ----
async function rampZoom() {
    for (const scheme of ["light", "dark"]) {
        const { ctx, page } = await mkPage(scheme, 1440);
        await goto(page, "/palettes");
        await page.waitForTimeout(1600);
        // find the "Palettes" ramp title element
        const box = await page.evaluate(() => {
            const el = [...document.querySelectorAll("*")].find((e) =>
                /palettes/i.test(e.textContent) && e.children.length <= 3 &&
                (getComputedStyle(e).backgroundClip === "text" || getComputedStyle(e).webkitBackgroundClip === "text"));
            if (!el) {
                // fallback: any h1/h2 containing "Palettes"
                const h = [...document.querySelectorAll("h1,h2,h3")].find((e) => /palettes/i.test(e.textContent));
                if (!h) return null;
                const r = h.getBoundingClientRect();
                return { x: r.x, y: r.y, w: r.width, h: r.height, fallback: true };
            }
            const r = el.getBoundingClientRect();
            return { x: r.x, y: r.y, w: r.width, h: r.height };
        });
        log(`RAMP ${scheme} title box: ${JSON.stringify(box)}`);
        if (box) {
            await page.screenshot({ path: `${OUT}/frames/ramp-${scheme}.png`, clip: { x: Math.max(0, box.x - 10), y: Math.max(0, box.y - 6), width: Math.min(700, box.w + 20), height: box.h + 12 } });
        }
        await ctx.close();
    }
}

// ---- 2. Card top-border clipping (T-45/T-53) — zoom generate card top corners ----
async function borderZoom() {
    for (const scheme of ["light", "dark"]) {
        const { ctx, page } = await mkPage(scheme, 1440);
        await goto(page, "/generate");
        await page.waitForTimeout(1600);
        const box = await page.evaluate(() => {
            // the generate card = left pane top-level card
            const cards = [...document.querySelectorAll("[class*='card'],[class*='Card'],[class*='pane']")]
                .map((e) => ({ e, r: e.getBoundingClientRect() }))
                .filter((o) => o.r.width > 300 && o.r.height > 300 && o.r.y < 400);
            cards.sort((a, b) => a.r.x - b.r.x);
            const c = cards[0];
            if (!c) return null;
            return { x: c.r.x, y: c.r.y, w: c.r.width };
        });
        log(`BORDER ${scheme} card box: ${JSON.stringify(box)}`);
        if (box) {
            // top-left corner crop
            await page.screenshot({ path: `${OUT}/frames/border-${scheme}-tl.png`, clip: { x: Math.max(0, box.x - 8), y: Math.max(0, box.y - 8), width: 180, height: 120 } });
            // top-right corner crop
            await page.screenshot({ path: `${OUT}/frames/border-${scheme}-tr.png`, clip: { x: box.x + box.w - 172, y: Math.max(0, box.y - 8), width: 180, height: 120 } });
        }
        await ctx.close();
    }
}

// ---- 3. T-57 dock-expand reflow (proper measurement) ----
async function reflow() {
    for (const scheme of ["light"]) {
        const { ctx, page } = await mkPage(scheme, 1440);
        await goto(page, "/");
        await page.waitForTimeout(2600);
        // measure the right/left pane container top before expand
        const measure = () => page.evaluate(() => {
            // find the two big cards
            const cards = [...document.querySelectorAll("div")].map((e) => ({ e, r: e.getBoundingClientRect() }))
                .filter((o) => o.r.width > 350 && o.r.height > 400 && o.r.y > 60 && o.r.y < 400);
            const tops = cards.map((o) => Math.round(o.r.top));
            return { minTop: tops.length ? Math.min(...tops) : null, count: cards.length };
        });
        const before = await measure();
        const clicked = await page.evaluate(() => {
            const btn = [...document.querySelectorAll("button,[role=button],a")].find((b) => /^\s*tools/i.test(b.textContent || ""));
            if (btn) { btn.click(); return btn.textContent.trim().slice(0, 20); }
            return null;
        });
        await page.waitForTimeout(600);
        const after = await measure();
        log(`REFLOW ${scheme} clicked="${clicked}" before=${JSON.stringify(before)} after=${JSON.stringify(after)} scene-shift=${after.minTop != null && before.minTop != null ? after.minTop - before.minTop : "?"}`);
        await ctx.close();
    }
}

// ---- 4. T-42 scrolled card shrink header ----
async function scrolledHeader() {
    for (const scheme of ["light"]) {
        const { ctx, page } = await mkPage(scheme, 1440);
        await goto(page, "/");
        await page.waitForTimeout(2600);
        // scroll the About (right) pane content
        await page.evaluate(() => {
            const scrollers = [...document.querySelectorAll("*")].filter((e) => {
                const s = getComputedStyle(e);
                return (s.overflowY === "auto" || s.overflowY === "scroll") && e.scrollHeight > e.clientHeight + 40;
            });
            scrollers.forEach((e) => { e.scrollTop = 400; });
            window.scrollTo(0, 400);
        });
        await page.waitForTimeout(900);
        await page.screenshot({ path: `${OUT}/frames/scrolled-${scheme}.png` });
        log(`SCROLLED ${scheme} captured`);
        await ctx.close();
    }
}

// ---- 5. T-48/T-58 pane-swap transition timing ----
async function transitionTiming() {
    const { ctx, page } = await mkPage("light", 1440);
    await goto(page, "/");
    await page.waitForTimeout(2800);
    // instrument rAF inter-frame deltas across a pane swap
    const swaps = [["/gradient", "gradient"], ["/extract", "extract"], ["/mix", "mix"], ["/generate", "generate"]];
    for (const [hash] of swaps) {
        await page.evaluate(() => { window.__ifd = []; let last = performance.now(); const loop = () => { const n = performance.now(); window.__ifd.push(n - last); last = n; if (window.__rec) requestAnimationFrame(loop); }; window.__rec = true; requestAnimationFrame(loop); });
        await goto(page, hash);
        await page.waitForTimeout(900);
        const stats = await page.evaluate(() => {
            window.__rec = false;
            const d = window.__ifd.slice(2); // drop warmup
            const sorted = [...d].sort((a, b) => a - b);
            const max = Math.max(...d);
            const over32 = d.filter((x) => x > 32).length;
            const over50 = d.filter((x) => x > 50).length;
            return { frames: d.length, max: Math.round(max), median: Math.round(sorted[Math.floor(sorted.length / 2)] || 0), over32, over50 };
        });
        log(`TRANSITION swap→${hash}: ${JSON.stringify(stats)}`);
        await page.waitForTimeout(400);
    }
    await ctx.close();
}

// ---- 6. Cold-load performance (T-39/Q14) — LCP + long tasks ----
async function loadPerf() {
    for (const scheme of ["light"]) {
        const { ctx, page } = await mkPage(scheme, 1440);
        // deep-link the owner's lab(...) URL from the mandate
        const url = `${BASE}/#/?space=lab&color=lab(40.39%25+52.94+47.26+/+82.7%25)`;
        const t0 = Date.now();
        await page.goto(url, { waitUntil: "load" });
        const loadMs = Date.now() - t0;
        await page.waitForTimeout(3500);
        const perf = await page.evaluate(() => {
            const lcp = performance.getEntriesByType("largest-contentful-paint").pop();
            const nav = performance.getEntriesByType("navigation")[0];
            const paints = Object.fromEntries(performance.getEntriesByType("paint").map((p) => [p.name, Math.round(p.startTime)]));
            const longTasks = performance.getEntriesByType("longtask") || [];
            let tbt = 0; longTasks.forEach((t) => { if (t.duration > 50) tbt += t.duration - 50; });
            return {
                lcp: lcp ? Math.round(lcp.startTime) : null,
                domContentLoaded: nav ? Math.round(nav.domContentLoadedEventEnd) : null,
                loadEvent: nav ? Math.round(nav.loadEventEnd) : null,
                paints,
                longTaskCount: longTasks.length,
                tbtApprox: Math.round(tbt),
            };
        });
        log(`LOADPERF ${scheme} wall=${loadMs}ms perf=${JSON.stringify(perf)}`);
        await ctx.close();
    }
}

await rampZoom();
await borderZoom();
await reflow();
await scrolledHeader();
await transitionTiming();
await loadPerf();
await browser.close();
log("DONE probe2");
