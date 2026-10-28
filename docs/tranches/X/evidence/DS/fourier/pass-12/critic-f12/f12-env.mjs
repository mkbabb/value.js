// X-DS fourier pass 12 critic (F12): theorem vs proof environment geometry on /paper. Headless real Chrome (§0ei); one browser, one context per cell.
import { chromium } from "/Users/mkbabb/Programming/fourier-analysis/web/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = process.argv[2]; const BASE = "http://localhost:3100";
const b = await chromium.launch({ channel: "chrome", headless: true });
const out = {};
try { for (const [w, h] of [[1440, 900], [390, 844]]) { const ctx = await b.newContext({ viewport: { width: w, height: h }, ...(w < 1024 ? { isMobile: true, hasTouch: true } : {}) });
  try { const p = await ctx.newPage(); await p.goto(BASE + "/paper", { waitUntil: "domcontentloaded", timeout: 90000 }); await p.waitForTimeout(5000);
    for (const f of [0.3, 0.2, 0.4]) { await p.evaluate((f) => { const e = document.querySelector(".paper-scroll"); e.scrollTop = (e.scrollHeight - e.clientHeight) * f; }, f); await p.waitForTimeout(1500);
      if (await p.locator(".paper-article .paper-proof-block").count() && await p.locator(".paper-article .theorem-block").count()) break; }
    out[w] = await p.evaluate(() => { const g = (s) => { const t = document.querySelector(s); if (!t) return null; const c = getComputedStyle(t); const lab = t.querySelector(".theorem-label, .paper-proof-label, :scope > *");
      return { sel: s, bl: c.borderLeftWidth, pad: c.padding, margin: c.margin, left: t.getBoundingClientRect().left, labelLeft: lab?.getBoundingClientRect().left, labelFont: lab ? getComputedStyle(lab).fontSize : null }; };
      return [g(".paper-article .theorem-block"), g(".paper-article .paper-proof-block")]; });
  } finally { await ctx.close(); } } } finally { await b.close(); writeFileSync(`${OUT}/f12-env.json`, JSON.stringify(out, null, 1)); console.log(JSON.stringify(out)); }
