// X-DS fourier pass 19 cure (critic F19C) probe, 2026-10-18. Headless real Chrome only (§0ei); one browser, one context per cell, closed in finally.
// DS-F19C-N1: /404 card at 1440 and 390: card box, padding, footer box, gap/margins, each action's box and its text's ink box,
// and the inset from the card's top edge to the title's ink against the inset from the last action's ink to the card's bottom edge.
// Frames: nf-rest-<theme>-<w>.
import { chromium } from "/Users/mkbabb/Programming/fourier-analysis/web/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = process.argv[2]; const BASE = process.argv[3] ?? "http://localhost:3263"; const TAG = process.argv[4] ?? "after";
const sfx = TAG === "after" ? "" : "-" + TAG;
const b = await chromium.launch({ channel: "chrome", headless: true });
const out = {};
try {
  for (const theme of ["light", "dark"]) for (const [w, h] of [[1440, 900], [390, 844]]) {
    const k = `${theme}-${w}`; const o = (out[k] = {}); const touch = w < 1024;
    const ctx = await b.newContext({ viewport: { width: w, height: h }, colorScheme: theme, deviceScaleFactor: 2, ...(touch ? { isMobile: true, hasTouch: true } : {}) });
    try {
      await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); localStorage.setItem("theme", t); } catch {} }, theme);
      const p = await ctx.newPage();
      await p.goto(BASE + "/no-such-page-ds19", { waitUntil: "domcontentloaded", timeout: 90000 });
      await p.waitForLoadState("networkidle", { timeout: 20000 }).catch(() => {});
      await p.waitForTimeout(3000); await p.mouse.move(0, 0).catch(() => {});
      o.nf = await p.evaluate(() => {
        const c = document.querySelector("[data-testid=not-found]"); if (!c) return null;
        const f = (n) => +n.toFixed(1);
        const r = c.getBoundingClientRect(); const cs = getComputedStyle(c);
        const ink = (el) => { const rg = document.createRange(); rg.selectNodeContents(el); const rr = [...rg.getClientRects()].filter((q) => q.height > 0); if (!rr.length) return null; return { top: f(Math.min(...rr.map((q) => q.top))), bottom: f(Math.max(...rr.map((q) => q.bottom))) }; };
        const foot = c.querySelector(".not-found-actions"); const fs = getComputedStyle(foot); const fr = foot.getBoundingClientRect();
        const btns = [...foot.querySelectorAll("button")].map((bt) => { const br = bt.getBoundingClientRect(); const bs = getComputedStyle(bt); return { text: bt.textContent.trim(), top: f(br.top), bottom: f(br.bottom), h: f(br.height), x: f(br.x), ink: ink(bt), mt: bs.marginTop, mb: bs.marginBottom, pt: bs.paddingTop, pb: bs.paddingBottom, minH: bs.minHeight, fs: bs.fontSize, lh: bs.lineHeight, bsize: bs.getPropertyValue("--button-size") }; });
        const title = c.querySelector("h1"); const tI = ink(title);
        const last = btns[btns.length - 1];
        return { cardTop: f(r.top), cardBottom: f(r.bottom), cardW: f(r.width), padT: cs.paddingTop, padB: cs.paddingBottom, cardGap: cs.rowGap,
          foot: { top: f(fr.top), bottom: f(fr.bottom), rowGap: fs.rowGap, columnGap: fs.columnGap, pt: fs.paddingTop, pb: fs.paddingBottom, mt: fs.marginTop, mb: fs.marginBottom },
          titleBox: { top: f(title.getBoundingClientRect().top) }, titleInk: tI, btns, wrapped: btns.length > 1 && btns[1].top >= btns[0].bottom - 1,
          topInset: f(title.getBoundingClientRect().top - r.top), bottomInset: f(r.bottom - last.bottom),
          bottomInkInset: last.ink ? f(r.bottom - last.ink.bottom) : null, topInkInset: tI ? f(tI.top - r.top) : null };
      });
      await p.screenshot({ path: `${OUT}/nf-rest-${theme}-${w}${sfx}.png` });
    } catch (e) { o.err = e.message.slice(0, 300); } finally { await ctx.close(); }
    console.log("done", k); writeFileSync(`${OUT}/f19p-probe-${TAG}.json`, JSON.stringify(out, null, 1));
  }
} finally { await b.close(); }
