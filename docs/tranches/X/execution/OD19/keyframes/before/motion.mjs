// OD19 keyframes BEFORE motion/latency probe (headless chromium; one browser, a context per cell).
// Hash routes (#/cube). Run from this dir: ~/.claude/guard/guarded --timeout 15 -- node motion.mjs
import { chromium } from "playwright";
import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const BASE = process.env.BASE ?? "http://localhost:5173/";
const out = {};
const trace = (page, sel, ms) => page.evaluate(([sel, ms]) => new Promise((res) => {
  const rows = []; const t0 = performance.now(); let last = t0;
  const tick = () => { const now = performance.now(); const e = document.querySelector(sel); const b = e?.getBoundingClientRect();
    rows.push([Math.round(now - t0), Math.round(now - last), b ? +b.x.toFixed(1) : null, b ? +b.width.toFixed(1) : null, b ? +b.height.toFixed(1) : null, e ? getComputedStyle(e).borderRadius : null, document.documentElement.matches(":active-view-transition") ? 1 : 0, location.hash]);
    last = now; if (now - t0 < ms) requestAnimationFrame(tick); else res(rows); };
  requestAnimationFrame(tick); }), [sel, ms]);
const summ = (rows) => { const dts = rows.slice(1).map((r) => r[1]); const xs = rows.map((r) => r[2]).filter((x) => x != null);
  return { frames: rows.length, maxDt: Math.max(...dts), over34: dts.filter((d) => d > 34).length, distinctWidths: new Set(rows.map((r) => r[3])).size, firstW: rows[0][3], lastW: rows.at(-1)[3], xMin: Math.min(...xs), xMax: Math.max(...xs), vtFrames: rows.filter((r) => r[6]).length }; };
const TOP = '[data-dock-tether="top"] .glass-dock';
const browser = await chromium.launch({ headless: true });
try {
  for (const scheme of ["dark", "light"]) for (const w of [1440, 390]) {
    const key = `${scheme}-${w}`; const o = (out[key] = {}); const H = w === 390 ? 844 : 900;
    const ctx = await browser.newContext({ viewport: { width: w, height: H }, colorScheme: scheme, deviceScaleFactor: 2 });
    const page = await ctx.newPage();
    try {
      await page.goto(BASE + "#/cube", { waitUntil: "load" }); await page.waitForTimeout(2500);
      o.paneInitiallyOpen = await page.evaluate(() => !!document.querySelector(".controls-layout--open"));
      // 1) top dock expand (hover): rAF geometry trace + strip
      const dock = page.locator(TOP);
      const p = trace(page, TOP, 1400);
      await dock.hover();
      for (let i = 0; i < 5; i++) await page.screenshot({ path: `${OUT}MOTION-expand-strip-${key}-${i}.png`, clip: { x: 0, y: 0, width: w, height: 120 } });
      const ex = await p; o.expand = summ(ex); o.expandRows = ex.filter((r, i) => i % 3 === 0).slice(0, 30);
      await page.waitForTimeout(300);
      o.K6items = await page.evaluate(() => [...document.querySelectorAll("[data-dock-surface-item]")].map((e) => `${e.getAttribute("aria-label")}|${e.dataset.surface}|${e.disabled ? "off" : "on"}`));
      await dock.screenshot({ path: `${OUT}K6-K8-topdock-expanded-${key}.png` });
      // 2) keyframes surface: input -> editor first paint
      const item = page.locator('[data-dock-surface-item][data-surface="keyframes"]');
      if (await item.count()) {
        await page.evaluate(() => { window.__t = null; addEventListener("pointerdown", () => { window.__t = performance.now(); }, { once: true, capture: true }); });
        const p2 = page.evaluate(() => new Promise((res) => { const t0 = performance.now(); const rows = []; let last = t0; const tick = () => { const now = performance.now(); const ed = document.querySelector(".monaco-editor .view-lines"); rows.push([Math.round(now - t0), Math.round(now - last), !!ed && ed.getBoundingClientRect().height > 0 && ed.textContent.length > 0]); last = now; if (now - t0 < 2500) requestAnimationFrame(tick); else res({ rows, tIn: window.__t ? Math.round(window.__t - t0) : null }); }; requestAnimationFrame(tick); }));
        await item.first().click();
        const r2 = await p2; const firstEd = r2.rows.find((r) => r[2]);
        o.keyframesSurface = { inputAt: r2.tIn, editorPaintAt: firstEd?.[0] ?? null, latencyMs: firstEd && r2.tIn != null ? firstEd[0] - r2.tIn : null, over34: r2.rows.filter((r) => r[1] > 34).length, maxDt: Math.max(...r2.rows.map((r) => r[1])) };
      }
      await page.mouse.move(2, H / 2); await page.waitForTimeout(800);
      // 3) scene swap cube -> spring through the Scene select
      await dock.hover(); await page.waitForTimeout(700);
      await page.locator('[data-dock-tether="top"] [aria-label="Scene"]').first().click(); await page.waitForTimeout(500);
      const opt = page.getByRole("option", { name: /spring/i }).first();
      const p3 = trace(page, TOP, 2400);
      const tClick = Date.now(); await opt.click();
      const strip = []; for (let i = 0; i < 5; i++) { await page.screenshot({ path: `${OUT}MOTION-swap-strip-${key}-${i}.png`, scale: "css" }); strip.push(Date.now() - tClick); }
      const sw = await p3; o.swap = summ(sw); o.swapStripMs = strip; o.swapHashAt = sw.find((r) => /spring/.test(r[7]))?.[0] ?? null; o.swapRows = sw.filter((r, i) => i % 2 === 0).slice(0, 30);
      // 4) collapse after leave (idle window)
      await page.mouse.move(2, H / 2);
      const col = await trace(page, TOP, 4500); o.collapse = summ(col); o.collapseRows = col.filter((r, i) => i > 0 && r[3] !== col[i - 1][3]).slice(0, 25);
    } catch (e) { o.error = String(e).slice(0, 300); } finally { await ctx.close(); }
  }
} finally { await browser.close(); }
writeFileSync(`${OUT}motion.json`, JSON.stringify(out, null, 1));
for (const [k, v] of Object.entries(out)) console.log(k, JSON.stringify({ e: v.error, open: v.paneInitiallyOpen, expand: v.expand, K6: v.K6items, kf: v.keyframesSurface, swap: v.swap, swapHashAt: v.swapHashAt, strip: v.swapStripMs, collapse: v.collapse }));
