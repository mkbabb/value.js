// OD19 value — BEFORE probe for the motion rows: V1 (plate radius vs run
// overflow), V2 (dock collapse/expand/layer-swap geometry, rAF-sampled), V4
// (route caption shift), V7 (pane swap geometry). Headless shell; ONE browser
// per run, one context per cell, closed in finally.
import { chromium } from "@playwright/test";
import { writeFileSync } from "node:fs";
const BASE = process.env.BASE ?? "http://localhost:9000";
const OUT = process.env.OUT;
const CELLS = (process.env.CELLS ?? "dark-1440,light-1440,dark-390,light-390").split(",");

const TRACE = ([sels, ms]) =>
    new Promise((res) => {
        const t0 = performance.now();
        const out = [];
        const step = () => {
            const t = performance.now() - t0;
            const row = { t: Math.round(t) };
            for (const s of sels) {
                const el = document.querySelector(s);
                if (!el) { row[s] = null; continue; }
                const r = el.getBoundingClientRect();
                const cs = getComputedStyle(el);
                row[s] = [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height), +(+cs.opacity).toFixed(2), cs.scale, cs.borderTopLeftRadius];
            }
            out.push(row);
            if (t < ms) requestAnimationFrame(step); else res(out);
        };
        requestAnimationFrame(step);
    });

function summarize(trace, sel) {
    const rows = trace.filter((r) => r[sel]);
    if (!rows.length) return { sel, missing: true };
    const cx = rows.map((r) => r[sel][0] + r[sel][2] / 2);
    const ys = rows.map((r) => r[sel][1]);
    const ws = rows.map((r) => r[sel][2]);
    const dts = rows.slice(1).map((r, i) => r.t - rows[i].t);
    let rev = 0;
    for (let i = 2; i < ws.length; i++) {
        const a = ws[i - 1] - ws[i - 2], b = ws[i] - ws[i - 1];
        if (a * b < 0 && Math.abs(b) > 1) rev++;
    }
    const changed = rows.filter((r, i) => i && JSON.stringify(r[sel].slice(0, 4)) !== JSON.stringify(rows[i - 1][sel].slice(0, 4)));
    return {
        sel, frames: rows.length,
        cxRange: [Math.min(...cx), Math.max(...cx)], cxDrift: +(Math.max(...cx) - Math.min(...cx)).toFixed(1),
        yRange: [Math.min(...ys), Math.max(...ys)], wRange: [Math.min(...ws), Math.max(...ws)],
        widthReversals: rev, moving: changed.length,
        longFrames: dts.filter((d) => d > 34).length, maxFrame: Math.max(0, ...dts),
        first: rows[0][sel], last: rows[rows.length - 1][sel],
        radii: [...new Set(rows.map((r) => r[sel][6]))].slice(0, 6),
    };
}

const report = {};
const browser = await chromium.launch({ headless: true });
try {
    for (const cell of CELLS) {
        const [scheme, w] = cell.split("-");
        const W = +w;
        const ctx = await browser.newContext({ viewport: { width: W, height: W === 390 ? 844 : 900 }, colorScheme: scheme, deviceScaleFactor: 1 });
        await ctx.addInitScript((th) => { try { localStorage.setItem("vueuse-color-scheme", th); } catch {} }, scheme);
        const page = await ctx.newPage();
        const R = (report[cell] = { navs: [], load: (await import("node:os")).loadavg()[0] });
        page.on("framenavigated", (f) => { if (f === page.mainFrame()) R.navs.push(f.url().replace(BASE, "")); });
        page.on("console", (m) => { if (/reload|optimized/i.test(m.text())) R.navs.push("CONSOLE " + m.text().slice(0, 120)); });
        const shot = (name, clip) => page.screenshot({ path: `${OUT}/${name}-${cell}.png`, clip }).catch(() => {});
        try {
            await page.goto(BASE + "/#/", { waitUntil: "load", timeout: 120000 });
            await page.locator(".glass-dock").first().waitFor({ timeout: 120000 });
            await page.waitForTimeout(3500);
            const dockBox = async () => (await page.locator(".glass-dock").first().boundingBox()) ?? { x: 0, y: 0, width: W, height: 80 };
            const band = async () => { const b = await dockBox(); return { x: 0, y: Math.max(0, b.y - 12), width: W, height: b.height + 24 }; };

            // ── V1: the plate radius against the run's scroll range, rest and tools
            const v1 = () => page.evaluate(() => {
                const plate = document.querySelector(".glass-dock .dock-plate");
                const run = document.querySelector(".glass-dock .dock-run");
                const cs = getComputedStyle(plate);
                const r = plate.getBoundingClientRect();
                return {
                    plate: [Math.round(r.width), Math.round(r.height)],
                    radius: [cs.borderTopLeftRadius, cs.borderTopRightRadius],
                    anims: plate.getAnimations().map((a) => `${a.animationName ?? a.id}:${a.timeline?.constructor?.name}:${a.currentTime?.toString?.().slice(0, 12)}`),
                    run: run && { sw: run.scrollWidth, cw: run.clientWidth, sl: run.scrollLeft, active: run.classList.contains("is-active") },
                    dockClass: document.querySelector(".glass-dock").className,
                };
            });
            R.v1_rest = await v1();
            await shot("v1-band-rest", await band());

            // ── V2a: layer swap Home → Tools (+ back), rAF trace of dock + plate
            const tgl = page.locator('.glass-dock button[aria-label="Toggle action bar"]').first();
            const sels = [".glass-dock", ".glass-dock .dock-plate"];
            if (await tgl.isVisible().catch(() => false)) {
                const tr = page.evaluate(TRACE, [sels, 1600]);
                await tgl.click();
                const t = await tr;
                R.v2_toTools = sels.map((s) => summarize(t, s));
                R.v1_tools = await v1();
                await shot("v1-band-tools", await band());
                const back = page.locator('.glass-dock button[aria-label="Back"]').first();
                const tr2 = page.evaluate(TRACE, [sels, 1600]);
                // frame strip while the swap back runs
                const strip = (async () => { for (let i = 0; i < 6; i++) { await shot(`v2-strip-back-${i}`, await band()); } })();
                await back.click().catch(() => {});
                await strip;
                const t2 = await tr2;
                R.v2_backToMain = sels.map((s) => summarize(t2, s));
            } else R.v2_note = "no action-bar toggle visible";

            // ── V2b: desktop collapse (idle) and expand (tap), rAF trace
            if (W >= 1024) {
                await page.mouse.move(W / 2, 880);
                const tr = page.evaluate(TRACE, [sels, 9000]);
                const t = await tr;
                const collapsed = await page.locator(".glass-dock.collapsed").count();
                R.v2_collapse = { collapsedAfter9s: collapsed, ...Object.fromEntries(sels.map((s) => [s, summarize(t.filter((r, i) => i === 0 || JSON.stringify(r[s]) !== JSON.stringify(t[i - 1][s]) || true), s)])) };
                // only the moving window
                const mv = t.filter((r, i) => i && JSON.stringify(r[sels[0]]?.slice(0, 4)) !== JSON.stringify(t[i - 1][sels[0]]?.slice(0, 4)));
                R.v2_collapse.window = mv.length ? [mv[0].t, mv[mv.length - 1].t] : null;
                R.v2_collapse.samples = mv.filter((_, i) => i % 3 === 0).slice(0, 25).map((r) => [r.t, ...r[sels[0]].slice(0, 4), r[sels[1]]?.[2], r[sels[1]]?.[6]]);
                await shot("v2-collapsed", await band());
                if (collapsed) {
                    const tr3 = page.evaluate(TRACE, [sels, 1600]);
                    const strip = (async () => { for (let i = 0; i < 6; i++) { await shot(`v2-strip-expand-${i}`, await band()); } })();
                    await page.locator(".glass-dock.collapsed").first().click();
                    await strip;
                    const t3 = await tr3;
                    R.v2_expand = sels.map((s) => summarize(t3, s));
                    const mv3 = t3.filter((r, i) => i && JSON.stringify(r[sels[0]]?.slice(0, 4)) !== JSON.stringify(t3[i - 1][sels[0]]?.slice(0, 4)));
                    R.v2_expand_samples = mv3.filter((_, i) => i % 2 === 0).slice(0, 25).map((r) => [r.t, ...r[sels[0]].slice(0, 4), r[sels[1]]?.[2], r[sels[1]]?.[5], r[sels[1]]?.[6]]);
                }
            }

            // ── V4 + V7: titled route → Home (caption mounts) and Home → mix
            await page.evaluate(() => { location.hash = "#/gradient"; });
            await page.waitForTimeout(6000);
            const psels = ["main h1", ".pane-wrapper--stage", ".pane-wrapper--inspector", ".pane-container", ".pane-wrapper--stage > *", ".pane-wrapper--inspector > *"];
            const trH = page.evaluate(TRACE, [psels, 3000]);
            const stripH = (async () => { for (let i = 0; i < 6; i++) { await page.screenshot({ path: `${OUT}/v4-strip-toHome-${i}-${cell}.png`, clip: { x: 0, y: 0, width: W, height: Math.min(520, W === 390 ? 520 : 420) } }).catch(() => {}); } })();
            await page.evaluate(() => { location.hash = "#/"; });
            await stripH;
            const tH = await trH;
            R.v4_toHome = psels.map((s) => summarize(tH, s));
            R.v4_h1 = await page.evaluate(() => { const h = document.querySelector("main h1"); const r = h?.getBoundingClientRect(); return h && { id: h.id, text: h.textContent.trim(), cls: h.className, box: [r.x, r.y, r.width, r.height].map(Math.round) }; });
            await page.waitForTimeout(1500);
            const trM = page.evaluate(TRACE, [psels, 4000]);
            const t0 = Date.now();
            await page.evaluate(() => { location.hash = "#/mix"; });
            const tM = await trM;
            R.v7_toMix = psels.map((s) => summarize(tM, s));
            R.v7_toMix_samples = tM.filter((_, i) => i % 3 === 0).slice(0, 60).map((r) => [r.t, r[".pane-wrapper--stage > *"]?.slice(0, 5), r[".pane-wrapper--inspector > *"]?.slice(0, 5)]);
            R.v7_toMix_wall = Date.now() - t0;
            await page.screenshot({ path: `${OUT}/v7-mix-settled-${cell}.png` }).catch(() => {});
        } catch (e) {
            R.error = String(e).slice(0, 300) + " @ " + (e.stack ?? "").split("\n").find((l) => l.includes("motion.mjs"));
        } finally {
            await ctx.close();
        }
    }
} finally {
    await browser.close();
}
writeFileSync(`${OUT}/motion.json`, JSON.stringify(report, null, 1));
console.log(JSON.stringify(report).slice(0, 200));
