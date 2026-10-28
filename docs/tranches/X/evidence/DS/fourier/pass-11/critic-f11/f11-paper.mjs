// F11 critic: /paper proof-block frame and the survey table, 1440 light/dark. Headless real Chrome (§0ei).
import { chromium } from "/Users/mkbabb/Programming/fourier-analysis/web/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = process.argv[2]; const BASE = process.argv[3] ?? "http://localhost:3100";
const b = await chromium.launch({ channel: "chrome", headless: true });
const out = {};
try {
  for (const theme of ["light", "dark"]) {
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: theme, deviceScaleFactor: 2 });
    try {
      await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); localStorage.setItem("theme", t); } catch {} }, theme);
      const p = await ctx.newPage();
      await p.goto(BASE + "/paper", { waitUntil: "domcontentloaded", timeout: 90000 });
      await p.waitForLoadState("networkidle", { timeout: 20000 }).catch(() => {}); await p.waitForTimeout(4000);
      await p.evaluate(() => { const e = document.querySelector(".paper-scroll"); e.scrollTop = (e.scrollHeight - e.clientHeight) * 0.3; }); await p.waitForTimeout(2500);
      out[theme] = await p.evaluate(() => {
        const pb = [...document.querySelectorAll("[class*=proof]")].find((e) => /proof/.test(e.className) && e.getBoundingClientRect().height > 60);
        if (!pb) return { classes: [...new Set([...document.querySelectorAll(".paper-article *")].map((e) => e.className).filter((c) => typeof c === "string"))].slice(0, 80) }; const c = getComputedStyle(pb);
        const para = [...document.querySelectorAll(".section-body > p, .section-body p")].find((x) => !x.closest(".paper-proof-block,.theorem-block"));
        const q = document.querySelectorAll(".paper-quote").length;
        const tb = document.querySelector(".paper-article table"); const tcel = tb && tb.querySelector("td,th"); const tc = tcel ? getComputedStyle(tcel) : null;
        return { proof: { bl: c.borderLeftWidth + " " + c.borderLeftStyle + " " + c.borderLeftColor, bg: c.backgroundColor, pad: c.padding, left: Math.round(pb.getBoundingClientRect().left), cls: pb.className },
          paraLeft: para ? Math.round(para.getBoundingClientRect().left) : null, quotes: q,
          table: tb && tc ? { cls: tb.className, cell: tc.borderTop + " | " + tc.borderBottom, tableBorder: getComputedStyle(tb).border } : null };
      });
      const tb = await p.$(".paper-article table");
      if (tb) { await tb.scrollIntoViewIfNeeded(); await p.waitForTimeout(1500); await p.screenshot({ path: `${OUT}/paper-table-${theme}-1440.png` }); }
    } finally { await ctx.close(); }
  }
} finally { await b.close(); writeFileSync(`${OUT}/f11-paper.json`, JSON.stringify(out, null, 1)); }
