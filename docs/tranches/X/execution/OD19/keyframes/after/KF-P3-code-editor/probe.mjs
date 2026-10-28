// OD19 KF-P3 (K7 + ALL editor open) AFTER probe — headless chromium, one browser, a context per cell.
// Usage (from keyframes.js, so playwright resolves): guarded -- node <this> <outDir> [base]
import { chromium } from "playwright";
import { writeFileSync, mkdirSync } from "node:fs";
import { loadavg } from "node:os";
const OUT = process.argv[2]; const BASE = process.argv[3] ?? "http://localhost:5173/";
mkdirSync(OUT, { recursive: true });
const out = {};
const TOP = '[data-dock-tether="top"] .glass-dock';
// Opens the menu (when the surfaces are a dropdown) BEFORE the timing arms, so
// "input" is always the press on the Keyframes item itself.
async function prepareKeyframes(page) {
  const item = page.locator('[data-dock-surface-item][data-surface="keyframes"]');
  if (await item.first().isVisible().catch(() => false)) return { loc: item.first(), opener: "item" };
  const trig = page.locator("[data-dock-surface-trigger]").first();
  for (let i = 0; i < 3; i++) {
    await page.locator(TOP).hover({ timeout: 15000 }).catch(() => {});
    if (await trig.click({ timeout: 8000 }).then(() => true, () => false)) break;
  }
  await page.waitForTimeout(500);
  return { loc: page.locator('[role=menuitem][data-surface="keyframes"]').first(), opener: "menu" };
}
const browser = await chromium.launch({ headless: true });
try {
  for (const scheme of ["dark", "light"]) for (const w of [1440, 390]) {
    const key = `${scheme}-${w}`; const o = (out[key] = {}); const H = w === 390 ? 844 : 900;
    const ctx = await browser.newContext({ viewport: { width: w, height: H }, colorScheme: scheme, deviceScaleFactor: 2 });
    const page = await ctx.newPage();
    o.load1 = +loadavg()[0].toFixed(1);
    try {
      await page.goto(BASE + "#/cube", { waitUntil: "load" }); await page.waitForTimeout(2500);
      await page.locator(TOP).hover({ timeout: 30000 }); await page.waitForTimeout(700);
      const kf = await prepareKeyframes(page); o.opener = kf.opener;
      await page.evaluate(() => { window.__t = null; addEventListener("pointerdown", () => { window.__t = performance.now(); }, { once: true, capture: true }); });
      const p2 = page.evaluate(() => new Promise((res) => { const t0 = performance.now(); const rows = []; let last = t0; const tick = () => { const now = performance.now(); const ed = document.querySelector(".monaco-editor .view-lines"); rows.push([Math.round(now - t0), Math.round(now - last), !!ed && ed.getBoundingClientRect().height > 0 && ed.textContent.length > 0]); last = now; if (now - t0 < 2500) requestAnimationFrame(tick); else res({ rows, tIn: window.__t ? Math.round(window.__t - t0) : null }); }; requestAnimationFrame(tick); }));
      await kf.loc.click();
      const r2 = await p2; const firstEd = r2.rows.find((r) => r[2]);
      const after = r2.tIn == null ? r2.rows : r2.rows.filter((r) => r[0] >= r2.tIn);
      const win = firstEd ? after.filter((r) => r[0] <= firstEd[0] + 50) : after;
      o.open = { inputAt: r2.tIn, editorPaintAt: firstEd?.[0] ?? null, latencyMs: firstEd && r2.tIn != null ? firstEd[0] - r2.tIn : null, maxDtOpen: Math.max(...win.slice(1).map((r) => r[1])), over50: win.slice(1).filter((r) => r[1] > 50).length };
      await page.mouse.move(w - 4, H / 2); await page.waitForTimeout(1200);
      o.K7 = await page.evaluate(() => {
        const colors = new Map();
        document.querySelectorAll(".monaco-editor .view-lines span span").forEach((s) => { const c = getComputedStyle(s).color; colors.set(c, (colors.get(c) ?? 0) + 1); });
        const st = [...document.querySelectorAll("[role=status]")].find((s) => s.querySelector(".status-dot"));
        const dot = st?.querySelector(".status-dot"); const r = dot?.getBoundingClientRect();
        return { inks: colors.size, distinctInks: [...colors.entries()], statusVisibleText: st?.innerText?.trim() ?? null, statusLive: st?.getAttribute("aria-live"), dotLabel: dot?.getAttribute("aria-label"), dotRole: dot?.getAttribute("role"), dotPx: r && [+r.width.toFixed(1), +r.height.toFixed(1)], statusFont: st && getComputedStyle(st).fontSize };
      });
      const ed = await page.$(".monaco-editor");
      if (ed) { const bb = await ed.boundingBox(); await page.screenshot({ path: `${OUT}/K7-editor-${key}.png`, clip: { x: Math.max(0, bb.x - 24), y: Math.max(0, bb.y - 90), width: Math.min(w - Math.max(0, bb.x - 24), bb.width + 48), height: Math.min(560, bb.height + 100) } }); }
    } catch (e) { o.error = String(e).slice(0, 300); } finally { await ctx.close(); }
  }
} finally { await browser.close(); }
writeFileSync(`${OUT}/probe.json`, JSON.stringify(out, null, 1));
for (const [k, v] of Object.entries(out)) console.log(k, JSON.stringify({ load1: v.load1, e: v.error?.slice(0, 160), opener: v.opener, open: v.open, inks: v.K7?.inks, text: v.K7?.statusVisibleText, live: v.K7?.statusLive, label: v.K7?.dotLabel, dot: v.K7?.dotPx, font: v.K7?.statusFont }));
