// SERVED MODEL: claude-opus-5-5
// KF.W13R.v — S4 ringPainted + M1 re-read, HEADED, on a served base (dev 5173 / gh-pages snapshot 5199).
// S4 = live-session.mjs S4 steps verbatim (seed controls open, /#/cube, rest paint, Tab walk to Play/Pause, painted delta).
// M1 = live-session-mobile.mjs M1 steps verbatim (390x844 touch, /#/amiga, handle drag up 360, touch point = .controls-pane centre, UNMOVED).
// usage: node sm-probe.mjs <base> <label>
import path from "node:path"; import fs from "node:fs"; import { fileURLToPath } from "node:url";
import { withBrowser, navToScene } from "/Users/mkbabb/Programming/keyframes.js/scripts/lib/demo-driver.mjs";
const here = path.dirname(fileURLToPath(import.meta.url));
const [base = "http://localhost:5173", label = "dev"] = process.argv.slice(2);
const b = base.replace(/\/$/, "");
const touchSwipe = async (page, from, to, steps = 10) => { const cdp = await page.context().newCDPSession(page);
  await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [from] });
  for (let i = 1; i <= steps; i++) { await cdp.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x: Math.round(from.x + (to.x - from.x) * i / steps), y: Math.round(from.y + (to.y - from.y) * i / steps) }] }); await page.waitForTimeout(20); }
  await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] }); await cdp.detach(); };
const rest = async (page) => { let prev = null, s = 0; for (let i = 0; i < 80; i++) { const t = await page.evaluate(() => { const e = document.querySelector('[data-slot="sheet-content"]'); return e ? getComputedStyle(e).getPropertyValue("--detent-t").trim() : null; }); if (t !== null && t === prev) { if (++s >= 3) return t; } else s = 0; prev = t; await page.waitForTimeout(60); } return prev; };
const geo = (page) => page.evaluate(() => { const w = document.querySelector('[data-slot="sheet-content"]'); const vh = innerHeight; const r = w?.getBoundingClientRect();
  const p = document.querySelector(".controls-pane"); const pr = p?.getBoundingClientRect(); const cx = pr ? Math.round(pr.left + pr.width / 2) : null, cy = pr ? Math.round(pr.top + pr.height / 2) : null;
  const hit = cx != null && cy >= 0 && cy < vh ? document.elementFromPoint(cx, cy) : null;
  return { detentT: w ? getComputedStyle(w).getPropertyValue("--detent-t").trim() : null, position: w ? getComputedStyle(w).position : null,
    sheet: r ? [r.top, r.bottom, r.height].map(Math.round) : null, visFrac: r ? +((vh - r.top) / vh).toFixed(3) : null, open: !!r && (vh - r.top) / vh > 0.35,
    pane: pr ? { cx, cy, top: Math.round(pr.top), bottom: Math.round(pr.bottom), scrollH: p.scrollHeight, clientH: p.clientHeight } : null,
    touchPointInViewport: cy != null && cy >= 0 && cy < vh, touchPointHitsPane: !!(hit && p.contains(hit)), vh }; });
const out = await withBrowser(async (browser) => {
  const res = { base: b, label, at: new Date().toISOString() };
  { const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } }); const page = await ctx.newPage();
    await page.addInitScript(() => { try { localStorage.setItem("animation-groups-control-options-store", JSON.stringify({ isControlsPanelOpen: true })); } catch {} });
    await page.goto(`${b}/#/cube`, { waitUntil: "load" }); await page.waitForTimeout(3000);
    const sel = 'button[aria-label="Play animation"], button[aria-label="Pause animation"]';
    const restPaint = await page.evaluate((s) => { const el = document.querySelector(s); if (!el) return null; const cs = getComputedStyle(el); return { outline: cs.outlineStyle + "|" + cs.outlineWidth, boxShadow: cs.boxShadow }; }, sel);
    const bb = await page.locator(sel).first().boundingBox(); const clip = bb ? { x: bb.x - 12, y: bb.y - 12, width: bb.width + 24, height: bb.height + 24 } : null;
    if (clip) fs.writeFileSync(path.join(here, `s4-${label}-rest.png`), await page.screenshot({ clip }));
    let reachedAt = -1; for (let i = 1; i <= 60; i++) { await page.keyboard.press("Tab"); const f = await page.evaluate(() => document.activeElement?.getAttribute("aria-label")); if (f === "Play animation" || f === "Pause animation") { reachedAt = i; break; } }
    const ring = reachedAt > 0 ? await page.evaluate((r) => { const el = document.activeElement; const cs = getComputedStyle(el); const o = cs.outlineStyle + "|" + cs.outlineWidth;
      const outlinePainted = cs.outlineStyle !== "none" && parseFloat(cs.outlineWidth) > 0 && o !== r?.outline; const shadowDelta = !!cs.boxShadow && cs.boxShadow !== "none" && cs.boxShadow !== r?.boxShadow;
      return { matchesFV: el.matches(":focus-visible"), outline: o, outlineColor: cs.outlineColor, outlineOffset: cs.outlineOffset, boxShadow: cs.boxShadow, emphasis: el.getAttribute("data-emphasis"), ringPainted: outlinePainted || shadowDelta }; }, restPaint) : null;
    if (clip) fs.writeFileSync(path.join(here, `s4-${label}-focused.png`), await page.screenshot({ clip }));
    res.S4 = { reachedAt, restPaint, ring }; await ctx.close(); }
  { const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true, deviceScaleFactor: 3 }); const page = await ctx.newPage();
    await page.goto(`${b}/#/amiga`, { waitUntil: "load" }); await navToScene(page, "amiga", "Controls", { timeout: 12000 });
    await page.waitForFunction(() => !!document.querySelector('[data-slot="sheet-content"]') && !!document.querySelector('[data-slot="sheet-detent-handle"]'), { timeout: 10000 }).catch(() => {});
    await rest(page); const g0 = await geo(page);
    const h = await page.evaluate(() => { const e = document.querySelector('[data-slot="sheet-detent-handle"]'); if (!e) return null; const r = e.getBoundingClientRect(); return { x: Math.round(r.left + r.width / 2), y: Math.round(r.top + r.height / 2) }; });
    if (h) await touchSwipe(page, h, { x: h.x, y: h.y - 360 }); await rest(page); const g1 = await geo(page);
    fs.writeFileSync(path.join(here, `m1-${label}-open.png`), await page.screenshot());
    let scrolled = null; if (g1.pane && g1.pane.scrollH > g1.pane.clientH + 8 && g1.touchPointInViewport) { await touchSwipe(page, { x: g1.pane.cx, y: g1.pane.cy }, { x: g1.pane.cx, y: g1.pane.cy - 180 }); await page.waitForTimeout(500); scrolled = await page.evaluate(() => document.querySelector(".controls-pane")?.scrollTop ?? 0); }
    res.M1 = { handle: h, peek: g0, afterExpand: g1, scrollTopAfterSwipe: scrolled }; await ctx.close(); }
  return res;
}, { launch: { headless: false }, label: "sm-probe" });
const v = out.value ?? out; fs.writeFileSync(path.join(here, `sm-${label}.json`), JSON.stringify(v, null, 2));
console.log(JSON.stringify({ S4: { reachedAt: v.S4?.reachedAt, ring: v.S4?.ring }, M1: { peek: v.M1?.peek, afterExpand: v.M1?.afterExpand, scrolled: v.M1?.scrollTopAfterSwipe } }));
