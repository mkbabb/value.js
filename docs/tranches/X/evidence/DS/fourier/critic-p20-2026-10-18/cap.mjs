// X-DS fourier critic pass 20 capture. Headless real Chrome (§0ei); one browser; one context per cell, closed in finally.
import { chromium } from "/Users/mkbabb/Programming/fourier-analysis/web/node_modules/playwright/index.mjs";
const OUT = process.argv[2]; const BASE = "http://localhost:3100";
const routes = (process.argv[3] ?? "visualize,equation,morph,gallery,paper").split(",");
const b = await chromium.launch({ channel: "chrome", headless: true });
try {
  for (const r of routes) for (const theme of ["light", "dark"]) for (const [w, h] of [[1440, 900], [390, 844]]) {
    const ctx = await b.newContext({ viewport: { width: w, height: h }, colorScheme: theme, deviceScaleFactor: 2, ...(w < 1024 ? { isMobile: true, hasTouch: true } : {}) });
    try {
      await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); localStorage.setItem("theme", t); } catch {} }, theme);
      const p = await ctx.newPage();
      await p.goto(`${BASE}/${r}`, { waitUntil: "domcontentloaded", timeout: 90000 });
      await p.waitForLoadState("networkidle", { timeout: 20000 }).catch(() => {});
      await p.waitForTimeout(5000); await p.mouse.move(0, 0).catch(() => {});
      await p.screenshot({ path: `${OUT}/${r}-${theme}-${w}.png` });
      console.log("ok", r, theme, w);
    } catch (e) { console.log("err", r, theme, w, e.message.slice(0, 200)); } finally { await ctx.close(); }
  }
} finally { await b.close(); }
