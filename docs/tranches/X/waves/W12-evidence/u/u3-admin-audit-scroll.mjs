// SERVED MODEL: claude-opus-5-5 — X.W12.u3 copy of audit/ui-evidence/value/admin-audit/probe-scroll.mjs (immutable, E-3): headless, writes beside itself with a RUN suffix (UIA-V-52 BEFORE/AFTER).
// READ-ONLY probe: 390 track blow-out + whether the entries list/pager is reachable by wheel.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const ALL = Array.from({ length: 47 }, (_, i) => ({ id: `a${i}`, timestamp: new Date(Date.UTC(2026, 8, 23, 14) - i * 3.7e6).toISOString(), action: ["approve-color","delete-color","delete-user","delete-palette","impersonate","reject-color"][i % 6], target: ["color:ocean-mist-7f3a","user:azure-fox-01","palette:sunset-drift-9c21b4e7d0a1","color:very-long-colour-name-that-keeps-going-and-going-8812ff","user:quiet-river-bright-owl"][i % 5] }));
const out = { errs: [] };
const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, colorScheme: "light", deviceScaleFactor: 2 });
await ctx.routeWebSocket(/:9000\//, () => {}).catch(() => {});
await ctx.addInitScript(() => { try { if (!sessionStorage.getItem("__s")) { localStorage.setItem("vueuse-color-scheme", "light"); localStorage.setItem("palette-admin-token", "dev"); sessionStorage.setItem("__s", "1"); } } catch {} });
const page = await ctx.newPage(); page.setDefaultTimeout(60000);
await page.route(/\/admin\/audit\?/, (r) => { const u = new URL(r.request().url()); const off = +u.searchParams.get("offset") || 0; return r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ data: ALL.slice(off, off + 20), total: 47, limit: 20, offset: off }) }); });
for (let a = 0; a < 4; a++) { await page.goto("http://localhost:9000/#/admin/audit", { waitUntil: "domcontentloaded", timeout: 180000 }).catch(e => out.errs.push(String(e).slice(0, 100))); if (await page.waitForSelector('[aria-label="Filter by action"]', { timeout: 240000 }).then(() => 1).catch(() => 0)) break; }
await page.waitForFunction(() => !document.querySelector('[aria-label="Loading audit log"]'), null, { timeout: 30000 }).catch(() => {});
await page.waitForTimeout(1500);
const geo = () => page.evaluate(() => {
  const B = (e) => { if (!e) return null; const r = e.getBoundingClientRect(); return [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)]; };
  const inp = document.querySelector('[aria-label="Filter by action"]'); const grid = inp.closest('.grid');
  const row = grid.querySelector(':scope > div.flex.items-center.gap-3');
  const scrollers = []; let e = grid; while (e) { const c = getComputedStyle(e); if (/(auto|scroll)/.test(c.overflowY) || e === document.scrollingElement) scrollers.push({ tag: e.tagName, cls: (e.className?.toString?.() || "").slice(0, 80), oy: c.overflowY, sh: e.scrollHeight, ch: e.clientHeight, st: e.scrollTop }); e = e.parentElement; }
  return { vw: innerWidth, card: B(document.querySelector('.pane-scroll-fade')), grid: B(grid), row: B(row), rowMinW: row && getComputedStyle(row).minWidth, count: B([...grid.querySelectorAll('span')].find(s => /entr/.test(s.textContent))), refresh: B(document.querySelector('[aria-label="Refresh audit log"]')), next: B(document.querySelector('[aria-label="Next page"]')), pageText: B([...document.querySelectorAll('[aria-live=polite]')].find(x => /^Page/.test(x.textContent.trim()))), docSW: document.documentElement.scrollWidth, scrollers };
});
out.at390 = await geo();
await page.mouse.move(195, 600); for (let i = 0; i < 12; i++) { await page.mouse.wheel(0, 400); await page.waitForTimeout(120); }
await page.waitForTimeout(800);
out.at390AfterWheel = await geo();
await page.screenshot({ path: `${OUT}u3-admin-audit-390${process.env.RUN ?? ""}.png` });
// can a pointer user reach the refresh button at 390?
out.refreshHit = await page.evaluate(() => { const b = document.querySelector('[aria-label="Refresh audit log"]'); const r = b.getBoundingClientRect(); const el = document.elementFromPoint(Math.min(r.x + r.width / 2, innerWidth - 1), r.y + r.height / 2); return { inViewport: r.right <= innerWidth && r.left >= 0, hitIsButton: !!el && (el === b || b.contains(el)), hitCls: el?.className?.toString?.().slice(0, 60) }; });
await page.setViewportSize({ width: 1440, height: 900 }); await page.waitForTimeout(1500);
await page.evaluate(() => { for (const s of document.querySelectorAll('*')) if (s.scrollTop) s.scrollTop = 0; window.scrollTo(0, 0); });
await page.waitForTimeout(500);
out.at1440 = await geo();
await page.mouse.move(720, 600); for (let i = 0; i < 12; i++) { await page.mouse.wheel(0, 400); await page.waitForTimeout(120); }
await page.waitForTimeout(800);
out.at1440AfterWheel = await geo();
await page.screenshot({ path: `${OUT}u3-admin-audit-1440${process.env.RUN ?? ""}.png` });
writeFileSync(`${OUT}u3-admin-audit-scroll${process.env.RUN ?? ""}.json`, JSON.stringify(out, null, 2));
await browser.close(); console.log("DONE");
