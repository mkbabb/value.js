// OD19 value — BEFORE detail: which child overflows the dock run (V1), and the
// long-animation-frame attribution of a pane swap (V7). Headless shell; one
// browser, one context per cell, closed in finally.
import { chromium } from "@playwright/test";
import { writeFileSync } from "node:fs";
const BASE = process.env.BASE ?? "http://localhost:9000";
const OUT = process.env.OUT;
const CELLS = (process.env.CELLS ?? "dark-1440,dark-390").split(",");
const RUNDUMP = () => {
    const run = document.querySelector(".glass-dock .dock-run.is-active") ?? document.querySelector(".glass-dock .dock-run");
    const rr = run.getBoundingClientRect();
    const cs = getComputedStyle(run);
    const kids = [...run.querySelectorAll(":scope > *, :scope > * > *")].map((k) => { const r = k.getBoundingClientRect(); return `${k.tagName.toLowerCase()}.${[...k.classList].slice(0, 3).join(".")} [${Math.round(r.left - rr.left)}..${Math.round(r.right - rr.left)}] ml=${getComputedStyle(k).marginInline}`; });
    const plate = getComputedStyle(document.querySelector(".glass-dock .dock-plate"));
    return { sw: run.scrollWidth, cw: run.clientWidth, w: Math.round(rr.width), pad: cs.paddingInline, gap: cs.gap, width: cs.width, radius: plate.borderTopLeftRadius, kids: kids.slice(0, 24) };
};
const ARM = () => {
    const S = (window.__loaf = { on: false, l: [] });
    try {
        new PerformanceObserver((list) => { for (const e of list.getEntries()) if (S.on) S.l.push({ d: Math.round(e.duration), blk: Math.round(e.blockingDuration ?? 0), render: Math.round((e.renderStart ? e.startTime + e.duration - e.renderStart : 0)), style: Math.round(e.styleAndLayoutStart ? e.startTime + e.duration - e.styleAndLayoutStart : 0), scripts: (e.scripts ?? []).map((s) => ({ d: Math.round(s.duration), inv: (s.invoker ?? "").slice(0, 70), src: (s.sourceURL ?? "").replace(location.origin, "").slice(0, 80), fn: s.sourceFunctionName, fsl: Math.round(s.forcedStyleAndLayoutDuration ?? 0) })) }); }).observe({ type: "long-animation-frame" });
    } catch {}
};
const report = {};
const browser = await chromium.launch({ headless: true });
try {
    for (const cell of CELLS) {
        const [scheme, w] = cell.split("-");
        const W = +w;
        const ctx = await browser.newContext({ viewport: { width: W, height: W === 390 ? 844 : 900 }, colorScheme: scheme });
        await ctx.addInitScript(ARM);
        const page = await ctx.newPage();
        const R = (report[cell] = {});
        try {
            await page.goto(BASE + "/#/", { waitUntil: "load", timeout: 180000 });
            await page.locator(".glass-dock").first().waitFor({ timeout: 120000 });
            await page.waitForTimeout(3500);
            R.rest = await page.evaluate(RUNDUMP);
            const tgl = page.locator('.glass-dock button[aria-label="Toggle action bar"]').first();
            if (await tgl.isVisible().catch(() => false)) { await tgl.click(); await page.waitForTimeout(1500); R.tools = await page.evaluate(RUNDUMP); await page.locator('.glass-dock button[aria-label="Back"]').first().click().catch(() => {}); await page.waitForTimeout(1500); }
            for (const route of ["mix", "gradient", ""]) {
                await page.evaluate(() => { window.__loaf.l = []; window.__loaf.on = true; });
                const t0 = Date.now();
                await page.evaluate((r) => { location.hash = "#/" + r; }, route);
                await page.waitForTimeout(3500);
                const L = await page.evaluate(() => { window.__loaf.on = false; return window.__loaf.l; });
                const tot = {};
                for (const l of L) for (const s of l.scripts) { const k = `${s.src}::${s.fn || s.inv}`; tot[k] = (tot[k] ?? 0) + s.d; }
                R[`swap_${route || "home"}`] = { loafN: L.length, loafMs: L.reduce((a, l) => a + l.d, 0), blockingMs: L.reduce((a, l) => a + l.blk, 0), renderMs: L.reduce((a, l) => a + l.render, 0), worst: L.sort((a, b) => b.d - a.d).slice(0, 3).map((l) => ({ d: l.d, render: l.render, scripts: l.scripts.slice(0, 3) })), topScripts: Object.entries(tot).sort((a, b) => b[1] - a[1]).slice(0, 8), wall: Date.now() - t0 };
            }
        } catch (e) { R.error = String(e).slice(0, 300); } finally { await ctx.close(); }
    }
} finally { await browser.close(); }
writeFileSync(`${OUT}/detail.json`, JSON.stringify(report, null, 1));
console.log("ok");
