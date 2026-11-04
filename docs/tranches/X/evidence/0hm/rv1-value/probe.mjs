// RR-1 seat 1 — value.js served-app review probe. One browser per run, context per cell, close in finally.
import { createRequire } from "node:module";
import fs from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/value.js/node_modules/");
const { chromium } = require("playwright");
const BASE = process.env.BASE || "https://color.babb.dev";
const OUT = process.env.HOME + "/.dev-logs/x-0hm/rv1/" + (process.argv[2] || "r1");
fs.mkdirSync(OUT, { recursive: true });
const ALL = {
  d18: { viewport: { width: 1800, height: 1000 }, deviceScaleFactor: 2 },
  d14: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 },
  m390: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
  m430: { viewport: { width: 430, height: 932 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
  land: { viewport: { width: 844, height: 390 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
};
const cells = (process.env.CELLS || "d18,d14,m390,m430,land").split(",");
const schemes = (process.env.SCHEMES || "dark,light").split(",");
const routes = (process.env.ROUTES || "/,/palettes,/browse,/extract,/mix,/generate,/gradient,/atmosphere,/admin/names").split(",");
const res = [];
const browser = await chromium.launch();
try {
  for (const c of cells) for (const sch of schemes) {
    const ctx = await browser.newContext({ ...ALL[c], colorScheme: sch });
    try {
      const page = await ctx.newPage();
      const errs = [];
      page.on("pageerror", (e) => errs.push("PE " + String(e).slice(0, 160)));
      page.on("console", (m) => { if (m.type() === "error") errs.push("CE " + m.text().slice(0, 160)); });
      for (const r of routes) {
        errs.length = 0;
        const t0 = Date.now();
        try {
          await page.goto(BASE + "/#" + r, { waitUntil: "load", timeout: 45000 });
          await page.waitForTimeout(3500);
          const m = await page.evaluate(() => {
            const vw = innerWidth, vh = innerHeight;
            const R = (e) => { if (!e) return null; const b = e.getBoundingClientRect(); return [Math.round(b.x), Math.round(b.y), Math.round(b.width), Math.round(b.height)]; };
            const fs = (e) => e ? getComputedStyle(e).fontSize + "/" + getComputedStyle(e).fontWeight + "/" + getComputedStyle(e).fontFamily.split(",")[0] : null;
            const panes = [...document.querySelectorAll(".pane-shell")].filter((e) => e.getBoundingClientRect().width > 0).map((e) => R(e));
            const name = document.querySelector('[data-testid="picker-color-name"]');
            const h = [...document.querySelectorAll("h1,h2,h3")].filter((e) => e.getBoundingClientRect().width > 0).slice(0, 6).map((e) => (e.textContent || "").trim().slice(0, 24) + "@" + fs(e));
            const dock = document.querySelector(".glass-dock");
            const canv = [...document.querySelectorAll("canvas")].filter((e) => e.getBoundingClientRect().width > 0).map((e) => R(e));
            const overflowX = document.documentElement.scrollWidth - vw;
            // elements extending past viewport horizontally (visible ones)
            const off = [];
            for (const e of document.querySelectorAll("body *")) { const b = e.getBoundingClientRect(); if (b.width && b.height && (b.right > vw + 1 || b.left < -1) && getComputedStyle(e).visibility !== "hidden") { off.push((e.className && String(e.className).slice(0, 40)) || e.tagName); if (off.length > 6) break; } }
            const smallTap = [...document.querySelectorAll("button,a,[role=button],[role=tab]")].filter((e) => { const b = e.getBoundingClientRect(); return b.width > 0 && b.height > 0 && (b.width < 24 || b.height < 24); }).length;
            const fonts = [...document.fonts].filter((f) => f.status === "loaded").map((f) => f.family).filter((v, i, a) => a.indexOf(v) === i);
            return { vw, vh, overflowX, panes, nameRect: R(name), name: name?.textContent?.trim(), nameFont: fs(name), h, dock: R(dock), canv, off, smallTap, fonts };
          });
          const shot = `${OUT}/${c}-${sch}${r.replace(/\//g, "_") || "_home"}.png`;
          await page.screenshot({ path: shot, scale: "css" });
          res.push({ c, sch, r, ms: Date.now() - t0, errs: [...errs].slice(0, 5), ...m });
        } catch (e) { res.push({ c, sch, r, error: String(e).slice(0, 200) }); }
      }
    } finally { await ctx.close(); }
  }
} finally { await browser.close(); fs.writeFileSync(OUT + "/res.json", JSON.stringify(res, null, 1)); }
