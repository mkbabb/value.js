// READ-ONLY capture: value.js admin audit-log sub-view (#/admin/audit).
// Browser-side only: seeds localStorage token "dev"; the "entries" states are
// served by page.route fixtures (the live dev DB holds 0 audit rows). No server writes.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const BASE = process.env.BASE || "http://localhost:9000/";
const ACTIONS = ["approve-color", "delete-color", "delete-user", "delete-palette", "impersonate", "reject-color"];
const TARGETS = ["color:ocean-mist-7f3a", "user:azure-fox-01", "palette:sunset-drift-9c21b4e7d0a1", "color:very-long-colour-name-that-keeps-going-and-going-8812ff", "user:quiet-river-bright-owl"];
const ALL = Array.from({ length: 47 }, (_, i) => ({
  id: `a${i}`, timestamp: new Date(Date.UTC(2026, 8, 23, 14, 0) - i * 3.7e6).toISOString(),
  action: ACTIONS[i % ACTIONS.length], target: TARGETS[i % TARGETS.length], actorSlug: "admin", ipHash: "abc" }));
const log = [];
let browser = await chromium.launch({ headless: false });
const measure = (page) => page.evaluate(() => {
  const B = (e) => { const r = e.getBoundingClientRect(); return [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)]; };
  const cs = (e) => { if (!e) return null; const c = getComputedStyle(e); return { box: B(e), r: c.borderRadius, h: c.height, fs: c.fontSize, ff: c.fontFamily.split(",")[0], fw: c.fontWeight, bg: c.backgroundColor, bd: `${c.borderTopWidth} ${c.borderTopColor}`, color: c.color, cls: (e.className?.toString?.() || "").slice(0, 160) }; };
  const inputs = [...document.querySelectorAll('input[aria-label^="Filter by"]')].map(cs);
  const refresh = cs(document.querySelector('[aria-label="Refresh audit log"]'));
  const rows = [...document.querySelectorAll('.grid.gap-3.pb-3 > div.flex.items-center.gap-3')].slice(0, 2).map(cs);
  const badge = cs(document.querySelector('.grid.gap-3.pb-3 [data-slot="badge"], .grid.gap-3.pb-3 .text-mono-caption'));
  const pager = [...document.querySelectorAll('[aria-label="Previous page"],[aria-label="Next page"]')].map(cs);
  const count = [...document.querySelectorAll('span')].find(s => /entr(y|ies)$/.test(s.textContent.trim()))?.textContent.trim();
  const header = document.querySelector('h1,h2,h3')?.textContent.trim();
  const empties = [...document.querySelectorAll('[role=status],[role=alert]')].map(e => e.textContent.trim().slice(0, 120)).filter(Boolean);
  const scroller = document.querySelector('.pane-scroll-fade'); 
  const doc = { sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth };
  return { inputs, refresh, rows, badge, pager, count, header, empties, pane: cs(scroller), paneScroll: scroller && [scroller.scrollHeight, scroller.clientHeight], doc, active: document.activeElement?.getAttribute('aria-label') || document.activeElement?.tagName };
});
async function run({ vp, theme, state }) {
  if (!browser.isConnected()) browser = await chromium.launch({ headless: false });
  const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h }, colorScheme: theme, deviceScaleFactor: 2 });
  await ctx.addInitScript(([t, signedOut]) => { try {
    localStorage.setItem("vueuse-color-scheme", t);
    if (signedOut) localStorage.removeItem("palette-admin-token"); else localStorage.setItem("palette-admin-token", "dev");
  } catch {} }, [theme, state === "signed-out"]);
  const page = await ctx.newPage();
  const errs = []; const reqs = [];
  page.on("pageerror", (e) => errs.push(String(e)));
  page.on("console", (m) => m.type() === "error" && errs.push(m.text().slice(0, 200)));
  if (state.startsWith("entries") || state === "loading" || state === "error" || state === "filtered-empty") {
    await page.route(/\/admin\/audit\?/, async (route) => {
      const u = new URL(route.request().url()); reqs.push(u.search);
      if (state === "error") return route.fulfill({ status: 500, contentType: "application/problem+json", body: JSON.stringify({ type: "urn:contract:internal", title: "Internal Server Error", status: 500, detail: "audit store unavailable" }) });
      if (state === "loading") { await new Promise(r => setTimeout(r, 8000)); return route.abort().catch(() => {}); }
      const off = +u.searchParams.get("offset") || 0, lim = +u.searchParams.get("limit") || 20;
      const act = u.searchParams.get("action"), tgt = u.searchParams.get("target");
      const f = ALL.filter(e => (!act || e.action.includes(act)) && (!tgt || e.target.includes(tgt)));
      return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ data: f.slice(off, off + lim), total: f.length, limit: lim, offset: off }) });
    });
  }
  await page.goto(BASE + "#/admin/audit", { waitUntil: "domcontentloaded", timeout: 120000 }).catch(e => errs.push("goto " + e.message.split("\n")[0]));
  const t0 = Date.now();
  await page.waitForSelector('[aria-label="Filter by action"]', { timeout: 150000 }).catch(() => errs.push("toolbar never mounted"));
  if (state !== "loading") await page.waitForFunction(() => !document.querySelector('[aria-label="Loading audit log"]'), null, { timeout: 30000 }).catch(() => errs.push("still loading"));
  await page.waitForTimeout(1200);
  const tag = `${state}-${vp.n}-${theme}`;
  const rec = { tag, url: page.url(), mountMs: Date.now() - t0 };
  if (state === "filtered-empty") { await page.locator('[aria-label="Filter by action"]').fill("zzz"); await page.waitForTimeout(1500); }
  await page.screenshot({ path: `${OUT}${tag}.png` });
  rec.m = await measure(page);
  if (state === "entries") {
    // full pane scroll: bottom (pager)
    await page.evaluate(() => { const s = document.querySelector('.pane-scroll-fade'); if (s) s.scrollTop = s.scrollHeight; });
    await page.waitForTimeout(500);
    await page.screenshot({ path: `${OUT}entries-bottom-${vp.n}-${theme}.png` });
    const next = page.locator('[aria-label="Next page"]');
    if (await next.count()) {
      await next.hover(); await page.waitForTimeout(250);
      await next.click(); await page.waitForTimeout(1500);
      rec.afterNext = await measure(page);
      await page.screenshot({ path: `${OUT}entries-p2-${vp.n}-${theme}.png` });
    }
    await page.evaluate(() => { const s = document.querySelector('.pane-scroll-fade'); if (s) s.scrollTop = 0; });
    await page.waitForTimeout(300);
    const row = page.locator('.grid.gap-3.pb-3 > div.flex.items-center.gap-3').first();
    if (await row.count()) { await row.hover(); await page.waitForTimeout(300); const b = await row.boundingBox(); await page.screenshot({ path: `${OUT}entries-rowhover-crop-${vp.n}-${theme}.png`, clip: { x: Math.max(0, b.x - 24), y: Math.max(0, b.y - 140), width: Math.min(vp.w - Math.max(0, b.x - 24), b.width + 48), height: 320 } }); }
    // keyboard: focus action filter
    await page.locator('[aria-label="Filter by action"]').focus(); await page.keyboard.press("Tab"); await page.waitForTimeout(250);
    rec.tabFrom = await page.evaluate(() => document.activeElement?.getAttribute('aria-label'));
    await page.keyboard.press("Tab"); await page.waitForTimeout(250);
    rec.tab2 = await page.evaluate(() => document.activeElement?.getAttribute('aria-label'));
    const tb = await page.locator('[aria-label="Filter by action"]').boundingBox();
    if (tb) await page.screenshot({ path: `${OUT}entries-focus-refresh-crop-${vp.n}-${theme}.png`, clip: { x: Math.max(0, tb.x - 24), y: Math.max(0, tb.y - 90), width: Math.min(vp.w - Math.max(0, tb.x - 24), 900), height: 200 } });
  }
  rec.reqs = reqs; rec.errors = errs.slice(0, 8);
  log.push(rec);
  await page.unrouteAll({ behavior: "ignoreErrors" }).catch(() => {});
  await ctx.close();
}
const STATES = (process.env.STATES || "empty,entries,filtered-empty,loading,error,signed-out").split(",");
const VPS = [{ w: 1440, h: 900, n: "1440" }, { w: 390, h: 844, n: "390" }].filter(v => !process.env.VP || v.n === process.env.VP);
for (const state of STATES) for (const vp of VPS) for (const theme of ["light", "dark"]) {
  try { await run({ vp, theme, state }); console.log("done", state, vp.n, theme); } catch (e) { console.log("fatal", state, vp.n, theme, String(e).slice(0,200)); log.push({ state, vp: vp.n, theme, fatal: String(e).slice(0, 300) }); }
}
await browser.close();
writeFileSync(`${OUT}capture-log-${process.env.VP || "all"}.json`, JSON.stringify(log, null, 2));
console.log(JSON.stringify(log.map(r => ({ tag: r.tag, url: r.url, count: r.m?.count, empties: r.m?.empties, reqs: r.reqs, errors: r.errors, fatal: r.fatal, tabFrom: r.tabFrom, tab2: r.tab2 })), null, 1));
