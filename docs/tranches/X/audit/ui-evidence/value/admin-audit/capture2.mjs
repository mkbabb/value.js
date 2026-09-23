// READ-ONLY capture (pass 2, load-tolerant): ONE page load per theme; the states
// are driven in place via page.route fixtures + the panel's own Refresh button,
// viewports via setViewportSize. Browser-side only; no server writes.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const BASE = process.env.BASE || "http://localhost:9000/";
const ACTIONS = ["approve-color", "delete-color", "delete-user", "delete-palette", "impersonate", "reject-color"];
const TARGETS = ["color:ocean-mist-7f3a", "user:azure-fox-01", "palette:sunset-drift-9c21b4e7d0a1", "color:very-long-colour-name-that-keeps-going-and-going-8812ff", "user:quiet-river-bright-owl"];
const ALL = Array.from({ length: 47 }, (_, i) => ({ id: `a${i}`, timestamp: new Date(Date.UTC(2026, 8, 23, 14, 0) - i * 3.7e6).toISOString(),
  action: ACTIONS[i % 6], target: TARGETS[i % 5], actorSlug: "admin", ipHash: "abc" }));
const VPS = [{ w: 1440, h: 900, n: "1440" }, { w: 390, h: 844, n: "390" }];
const THEMES = (process.env.THEMES || "light,dark").split(",");
const log = [];
let mode = "live"; const reqs = [];
const measure = (page) => page.evaluate(() => {
  const B = (e) => { const r = e.getBoundingClientRect(); return [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)]; };
  const cs = (e) => { if (!e) return null; const c = getComputedStyle(e); return { box: B(e), r: c.borderRadius, fs: c.fontSize, ff: c.fontFamily.split(",")[0], fw: c.fontWeight, bg: c.backgroundColor, bd: `${c.borderTopWidth} ${c.borderTopColor}`, color: c.color, tf: c.textTransform, cls: (e.className?.toString?.() || "").slice(0, 160) }; };
  const root = document.querySelector('[aria-label="Filter by action"]')?.closest('.grid');
  const rows = root ? [...root.querySelectorAll(':scope > div.flex.items-center.gap-3')] : [];
  return {
    inputs: [...document.querySelectorAll('input[aria-label^="Filter by"]')].map(cs),
    refresh: cs(document.querySelector('[aria-label="Refresh audit log"]')),
    rowCount: rows.length, rows: rows.slice(0, 2).map(cs),
    badge: cs(rows[0]?.querySelector('[data-slot="badge"], .text-mono-caption')),
    time: cs(rows[0]?.querySelector('.tabular-nums')), target: cs(rows[0]?.querySelector('.truncate')),
    pager: [...document.querySelectorAll('[aria-label="Previous page"],[aria-label="Next page"]')].map(b => ({ ...cs(b), disabled: b.disabled })),
    pageText: [...document.querySelectorAll('[aria-live="polite"]')].map(e => e.textContent.trim()).filter(t => /^Page/.test(t)),
    count: [...document.querySelectorAll('span')].find(s => /entr(y|ies)$/.test(s.textContent.trim()))?.textContent.trim(),
    plates: [...document.querySelectorAll('[role=status],[role=alert]')].map(e => e.textContent.trim().replace(/\s+/g, " ").slice(0, 140)).filter(Boolean),
    headerDesc: cs(document.querySelector('.pane-scroll-fade p')),
    pane: cs(document.querySelector('.pane-scroll-fade')),
    paneScroll: (() => { const s = document.querySelector('.pane-scroll-fade'); return s && [s.scrollHeight, s.clientHeight]; })(),
    doc: [document.documentElement.scrollWidth, document.documentElement.clientWidth],
    active: document.activeElement?.getAttribute('aria-label') || document.activeElement?.tagName,
  };
});
const browser = await chromium.launch({ headless: false });
for (const theme of THEMES) {
  const t0 = Date.now();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: theme, deviceScaleFactor: 2 });
  await ctx.addInitScript(([t]) => { try { if (!sessionStorage.getItem("__s")) { localStorage.setItem("vueuse-color-scheme", t); localStorage.setItem("palette-admin-token", "dev"); sessionStorage.setItem("__s", "1"); } } catch {} }, [theme]);
  // Other workflows edit the app tree concurrently; Vite's HMR socket would
  // full-reload this page mid-capture. Mock the socket (no server messages).
  await ctx.routeWebSocket(/:9000\//, () => {}).catch(() => {});
  const page = await ctx.newPage();
  page.setDefaultTimeout(60000);
  const step = async (name, fn) => { try { await fn(); } catch (e) { errs.push(`step ${name}: ${String(e).split("\n")[0].slice(0, 160)}`); } };
  page.on("framenavigated", (f) => { if (f === page.mainFrame()) errs.push(`nav ${f.url()} @${Date.now() - t0}`); });
  const errs = [];
  page.on("pageerror", (e) => errs.push(String(e).slice(0, 200)));
  page.on("console", (m) => m.type() === "error" && errs.push(m.text().slice(0, 200)));
  await page.route(/\/admin\/audit\?/, async (route) => {
    const u = new URL(route.request().url()); reqs.push(`${mode} ${u.search}`);
    if (mode === "live") return route.continue();
    if (mode === "error") return route.fulfill({ status: 500, contentType: "application/problem+json", body: JSON.stringify({ type: "urn:contract:internal", title: "Internal Server Error", status: 500, detail: "audit store unavailable" }) });
    if (mode === "loading") { await new Promise(r => setTimeout(r, 6000)); }
    const off = +u.searchParams.get("offset") || 0, lim = +u.searchParams.get("limit") || 20;
    const act = u.searchParams.get("action"), tgt = u.searchParams.get("target");
    const f = ALL.filter(e => (!act || e.action.includes(act)) && (!tgt || e.target.includes(tgt)));
    return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ data: f.slice(off, off + lim), total: f.length, limit: lim, offset: off }) }).catch(() => {});
  });
  for (let attempt = 0; attempt < 4; attempt++) {
    await page.goto(BASE + "#/admin/audit", { waitUntil: "domcontentloaded", timeout: 180000 }).catch(e => errs.push("goto " + e.message.split("\n")[0]));
    const ok = await page.waitForSelector('[aria-label="Filter by action"]', { timeout: 240000 }).then(() => true).catch(() => false);
    if (ok) break; errs.push(`toolbar not mounted, attempt ${attempt}`); await page.waitForTimeout(5000);
  }
  log.push({ theme, mountMs: Date.now() - t0 });
  await page.waitForTimeout(1500);
  const shot = async (name, vp, extra = {}) => {
    try { await page.screenshot({ path: `${OUT}p2-${name}-${vp.n}-${theme}.png`, timeout: 90000, ...extra }); } catch (e) { errs.push(`shot ${name}: ${String(e).slice(0, 120)}`); }
  };
  const settle = async () => { await page.waitForFunction(() => !document.querySelector('[aria-label="Loading audit log"]'), null, { timeout: 30000 }).catch(() => {}); await page.waitForTimeout(700); };
  const refresh = async () => { await page.locator('[aria-label="Refresh audit log"]').click({ timeout: 30000 }); };
  const scrollPane = (y) => page.evaluate((y) => { const s = document.querySelector('.pane-scroll-fade'); if (s) s.scrollTop = y === "end" ? s.scrollHeight : y; }, y);
  for (const vp of VPS) {
    await page.setViewportSize({ width: vp.w, height: vp.h }); await page.waitForTimeout(1200);
    const rec = (state, extra = {}) => measure(page).then(m => log.push({ theme, vp: vp.n, state, m, ...extra }));
    await step("empty-"+vp.n, async () => {
    // 1. empty (live DB: 0 rows)
    mode = "live"; await page.locator('[aria-label="Filter by action"]').fill(""); await page.locator('[aria-label="Filter by target"]').fill("");
    await page.waitForTimeout(600); await refresh(); await settle(); await scrollPane(0);
    await shot("empty", vp); await rec("empty");
    });
    await step("entries-"+vp.n, async () => {
    // 2. entries
    mode = "entries"; await refresh(); await settle(); await scrollPane(0);
    await shot("entries", vp); await rec("entries");
    const row = page.locator('[aria-label="Filter by action"]').locator('xpath=ancestor::div[contains(@class,"grid")][1]').locator(':scope > div.flex.items-center.gap-3').first();
    if (await row.count()) {
      await row.hover(); await page.waitForTimeout(350);
      const b = await row.boundingBox();
      if (b) await shot("rowhover-crop", vp, { clip: { x: Math.max(0, b.x - 20), y: Math.max(0, b.y - 110), width: Math.min(vp.w - Math.max(0, b.x - 20), b.width + 40), height: 300 } });
    }
    await scrollPane("end"); await page.waitForTimeout(600);
    await shot("entries-bottom", vp); await rec("entries-bottom");
    const next = page.locator('[aria-label="Next page"]');
    if (await next.count()) {
      const nb = await next.boundingBox();
      await next.hover(); await page.waitForTimeout(300);
      if (nb) await shot("pager-hover-crop", vp, { clip: { x: Math.max(0, nb.x - 260), y: Math.max(0, nb.y - 60), width: Math.min(360, vp.w - Math.max(0, nb.x - 260)), height: 150 } });
      await next.click(); await settle(); await page.waitForTimeout(400);
      await shot("entries-p2", vp); await rec("entries-p2", { scrollAfterNext: await page.evaluate(() => document.querySelector('.pane-scroll-fade')?.scrollTop) });
      // last page
      await page.locator('[aria-label="Next page"]').click().catch(() => {}); await settle();
      await scrollPane("end"); await page.waitForTimeout(400);
      await shot("entries-p3-last", vp); await rec("entries-p3-last");
      await page.locator('[aria-label="Previous page"]').click().catch(() => {}); await settle();
      await page.locator('[aria-label="Previous page"]').click().catch(() => {}); await settle();
    }
    });
    await step("keys-"+vp.n, async () => {
    // keyboard focus traversal through the toolbar
    await scrollPane(0); await page.locator('[aria-label="Filter by action"]').focus(); await page.waitForTimeout(250);
    const tb = await page.locator('[aria-label="Filter by action"]').boundingBox();
    const clip = tb && { x: Math.max(0, tb.x - 20), y: Math.max(0, tb.y - 30), width: vp.w - Math.max(0, tb.x - 20) - 10, height: vp.n === "390" ? 170 : 110 };
    if (clip) await shot("focus-action-crop", vp, { clip });
    const order = [];
    for (let i = 0; i < 3; i++) { await page.keyboard.press("Tab"); await page.waitForTimeout(200); order.push(await page.evaluate(() => document.activeElement?.getAttribute('aria-label') || document.activeElement?.tagName)); if (order[i] === "Refresh audit log" && clip) await shot("focus-refresh-crop", vp, { clip }); }
    log.push({ theme, vp: vp.n, state: "tab-order", order });
    });
    await step("filtered-"+vp.n, async () => {
    // 3. filtered-empty (mock filters server-side)
    await page.locator('[aria-label="Filter by action"]').fill("zzz"); await page.waitForTimeout(1200); await settle();
    await shot("filtered-empty", vp); await rec("filtered-empty");
    await page.locator('[aria-label="Filter by action"]').fill(""); await page.waitForTimeout(1200); await settle();
    });
    await step("loading-"+vp.n, async () => {
    // 4. loading (6 s delayed reply)
    mode = "loading"; await refresh(); await page.waitForTimeout(900);
    await shot("loading", vp); await rec("loading"); await page.waitForTimeout(6000); await settle();
    });
    await step("error-"+vp.n, async () => {
    // 5. error (500)
    mode = "error"; await refresh(); await settle();
    await shot("error", vp); await rec("error");
    mode = "entries"; await refresh(); await settle();
    });
  }
  // 6. signed-out (drop the token, reload) — 1440 then 390
  await page.evaluate(() => localStorage.removeItem("palette-admin-token"));
  for (const vp of VPS) {
    await page.setViewportSize({ width: vp.w, height: vp.h });
    await page.reload({ waitUntil: "domcontentloaded", timeout: 180000 }).catch(e => errs.push("reload " + e.message.split("\n")[0]));
    await page.waitForSelector('[aria-label="Filter by action"]', { timeout: 300000 }).catch(() => errs.push("signed-out toolbar never mounted"));
    await page.waitForTimeout(1500);
    await shot("signed-out", vp); await measure(page).catch(() => null).then(m => log.push({ theme, vp: vp.n, state: "signed-out", m }));
  }
  log.push({ theme, errors: errs.slice(0, 30) });
  writeFileSync(`${OUT}capture2-log-${theme}.json`, JSON.stringify({ reqs: reqs.slice(0, 80), log }, null, 2));
  await ctx.close();
}
await browser.close();
writeFileSync(`${OUT}capture2-log-${THEMES.join("-")}.json`, JSON.stringify({ reqs: reqs.slice(0, 80), log }, null, 2));
console.log("DONE");
