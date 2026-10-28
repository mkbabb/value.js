// X-DS fourier critic pass 18 capture. Headless real Chrome (§0ei); one browser; one context per cell, closed in finally.
import { chromium } from "/Users/mkbabb/Programming/fourier-analysis/web/node_modules/playwright/index.mjs";
const OUT = process.argv[2]; const BASE = "http://localhost:3100";
const b = await chromium.launch({ channel: "chrome", headless: true });
const cells = [
  ["v", "/v/hazy-etching-cream-elk", "light", 1440, 900, "rest"],
  ["v", "/v/hazy-etching-cream-elk", "dark", 1440, 900, "hover"],
  ["v", "/v/hazy-etching-cream-elk", "light", 390, 844, "rest"],
  ["v", "/v/hazy-etching-cream-elk", "dark", 390, 844, "rest"],
  ["menu", "/gallery", "light", 1440, 900, "menu"],
  ["menu", "/gallery", "dark", 1440, 900, "menu"],
  ["nf", "/nope-xyz", "dark", 1440, 900, "rest"],
];
try {
  for (const [name, path, theme, w, h, mode] of cells) {
    const ctx = await b.newContext({ viewport: { width: w, height: h }, colorScheme: theme, deviceScaleFactor: 2, ...(w < 1024 ? { isMobile: true, hasTouch: true } : {}) });
    try {
      await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); localStorage.setItem("theme", t); } catch {} }, theme);
      const p = await ctx.newPage();
      await p.goto(`${BASE}${path}`, { waitUntil: "domcontentloaded", timeout: 90000 });
      await p.waitForLoadState("networkidle", { timeout: 20000 }).catch(() => {});
      await p.waitForTimeout(6000);
      if (mode === "hover") { await p.mouse.move(w * 0.33, h * 0.5); await p.waitForTimeout(800); }
      else if (mode === "menu") { await p.getByRole("button", { name: /gallery/i }).first().click().catch((e) => console.log("menu click fail", e.message.slice(0, 80))); await p.waitForTimeout(800); }
      else await p.mouse.move(0, 0).catch(() => {});
      await p.screenshot({ path: `${OUT}/${name}-${mode}-${theme}-${w}.png` });
      console.log("ok", name, theme, w, mode);
    } catch (e) { console.log("err", name, theme, w, e.message.slice(0, 200)); } finally { await ctx.close(); }
  }
} finally { await b.close(); }
