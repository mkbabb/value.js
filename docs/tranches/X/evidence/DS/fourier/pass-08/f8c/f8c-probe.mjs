// X-DS fourier pass 8 · F8C cure probe (DS-F8C-C1): /gallery measure, headless real Chrome (§0ei).
import { chromium } from "/Users/mkbabb/Programming/fourier-analysis/web/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = process.argv[2]; const BASE = process.argv[3] ?? "http://localhost:3150";
const cells = [["light",1440],["dark",1440],["light",390],["dark",390]];
const out = {};
const b = await chromium.launch({ channel: "chrome", headless: true });
try {
  for (const [theme, w] of cells) {
    const k = `gallery-${theme}-${w}`;
    const ctx = await b.newContext({ viewport: { width: w, height: w > 500 ? 900 : 844 }, colorScheme: theme, deviceScaleFactor: 2, ...(w < 500 ? { isMobile: true, hasTouch: true } : {}) });
    await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); localStorage.setItem("theme", t); } catch {} }, theme);
    const p = await ctx.newPage(); const errs = []; p.on("pageerror", (e) => errs.push(e.message));
    try {
      await p.goto(BASE + "/gallery", { waitUntil: "domcontentloaded", timeout: 60000 });
      await p.waitForSelector(".gallery-grid > *", { timeout: 30000 }).catch(() => {});
      await p.waitForTimeout(2500);
      await p.screenshot({ path: `${OUT}/${k}.png` });
      out[k] = await p.evaluate(() => {
        const box = (el) => { if (!el) return null; const r = el.getBoundingClientRect(); return [Math.round(r.x*10)/10, Math.round(r.y), Math.round(r.width*10)/10, Math.round(r.height)]; };
        const grid = document.querySelector(".gallery-grid");
        const cards = grid ? [...grid.children].map((c) => c.getBoundingClientRect()) : [];
        const row0 = cards.filter((r) => Math.abs(r.y - (cards[0]?.y ?? 0)) < 2);
        const host = document.querySelector(".gallery-grid-host");
        return { toolbar: box(host?.parentElement?.querySelector(":scope > div.flex")), tabs: box(document.querySelector("[role=tablist]")), search: box(document.querySelector("input[type=search], input")), grid: box(grid), columns: row0.length, cardWidth: Math.round((row0[0]?.width ?? 0)*10)/10, firstCardX: Math.round(row0[0]?.x ?? 0), lastCardRight: Math.round((row0.at(-1)?.right ?? 0)), scrollW: document.documentElement.scrollWidth, cards: cards.length };
      });
      out[k].pageErrors = errs;
    } catch (e) { out[k + "-err"] = e.message.slice(0, 200); } finally { await ctx.close(); }
  }
} finally { await b.close(); writeFileSync(`${OUT}/f8c-probe.json`, JSON.stringify(out, null, 1)); }
