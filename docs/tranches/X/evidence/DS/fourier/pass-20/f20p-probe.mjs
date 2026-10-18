// X-DS fourier pass 20 cure (critic F20C) probe, 2026-10-18. Headless real Chrome only (§0ei); one browser, one context per cell, closed in finally.
// Re-reads the critic's cells on the unchanged tree: the five routes (G0, glass-owned, O-87) and the /404 card insets (DS-F20C-N1, record-and-close).
import { chromium } from "/Users/mkbabb/Programming/fourier-analysis/web/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = process.argv[2]; const BASE = process.argv[3] ?? "http://localhost:3265";
const routes = ["visualize", "equation", "morph", "gallery", "paper", "no-such-page-ds20"];
const b = await chromium.launch({ channel: "chrome", headless: true });
const out = {};
try {
  for (const r of routes) for (const theme of ["light", "dark"]) for (const [w, h] of [[1440, 900], [390, 844]]) {
    const nf = r.startsWith("no-such"); const k = `${nf ? "nf-rest" : r}-${theme}-${w}`;
    const ctx = await b.newContext({ viewport: { width: w, height: h }, colorScheme: theme, deviceScaleFactor: 2, ...(w < 1024 ? { isMobile: true, hasTouch: true } : {}) });
    try {
      await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); localStorage.setItem("theme", t); } catch {} }, theme);
      const p = await ctx.newPage();
      await p.goto(`${BASE}/${r}`, { waitUntil: "domcontentloaded", timeout: 90000 });
      await p.waitForLoadState("networkidle", { timeout: 20000 }).catch(() => {});
      await p.waitForTimeout(nf ? 3000 : 5000); await p.mouse.move(0, 0).catch(() => {});
      if (nf) out[k] = await p.evaluate(() => {
        const c = document.querySelector("[data-testid=not-found]"); if (!c) return null;
        const f = (n) => +n.toFixed(1); const r = c.getBoundingClientRect();
        const ink = (el) => { const rg = document.createRange(); rg.selectNodeContents(el); const rr = [...rg.getClientRects()].filter((q) => q.height > 0); return rr.length ? { top: f(Math.min(...rr.map((q) => q.top))), bottom: f(Math.max(...rr.map((q) => q.bottom))) } : null; };
        const btns = [...c.querySelectorAll(".not-found-actions button")]; const last = btns[btns.length - 1]; const lb = last.getBoundingClientRect(); const li = ink(last);
        const tI = ink(c.querySelector("h1")); const cs = getComputedStyle(c);
        return { cardW: f(r.width), cardH: f(r.height), padT: cs.paddingTop, padB: cs.paddingBottom, topInkInset: f(tI.top - r.top), bottomChromeInset: f(r.bottom - lb.bottom), bottomInkInset: f(r.bottom - li.bottom), wrapped: btns.length > 1 && btns[1].getBoundingClientRect().top >= btns[0].getBoundingClientRect().bottom - 1 };
      });
      await p.screenshot({ path: `${OUT}/${k}.png` });
      console.log("ok", k);
    } catch (e) { out[k] = { err: e.message.slice(0, 300) }; console.log("err", k); } finally { await ctx.close(); }
    writeFileSync(`${OUT}/f20p-probe-after.json`, JSON.stringify(out, null, 1));
  }
} finally { await b.close(); }
