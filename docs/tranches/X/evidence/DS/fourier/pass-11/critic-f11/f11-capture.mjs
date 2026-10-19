// X-DS fourier pass 11 critic (F11) capture: routes missing from pass-10 frames. Headless real Chrome (§0ei); one browser, one context per cell.
import { chromium } from "/Users/mkbabb/Programming/fourier-analysis/web/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = process.argv[2]; const BASE = process.argv[3] ?? "http://localhost:3100";
const b = await chromium.launch({ channel: "chrome", headless: true, args: ["--use-angle=metal", "--ignore-gpu-blocklist"] });
const out = {};
try {
  for (const theme of ["light", "dark"]) for (const [w, h] of [[1440, 900], [390, 844]]) {
    const touch = w < 1024;
    const ctx = await b.newContext({ viewport: { width: w, height: h }, colorScheme: theme, deviceScaleFactor: 2, ...(touch ? { isMobile: true, hasTouch: true } : {}) });
    try {
      await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); localStorage.setItem("theme", t); } catch {} }, theme);
      const p = await ctx.newPage();
      for (const [name, path] of [["gallery", "/gallery"], ["equation", "/equation"], ["w", "/w/"], ["v", "/v/hazy-etching-cream-elk"]]) {
        try {
          await p.goto(BASE + path, { waitUntil: "domcontentloaded", timeout: 90000 });
          await p.waitForLoadState("networkidle", { timeout: 20000 }).catch(() => {});
          await p.waitForTimeout(4000);
          await p.mouse.move(0, 0).catch(() => {});
          await p.screenshot({ path: `${OUT}/${name}-${theme}-${w}.png` });
          out[`${name}-${theme}-${w}`] = await p.evaluate(() => {
            const r = []; for (const el of document.querySelectorAll("body *")) { const c = getComputedStyle(el); const bx = el.getBoundingClientRect(); if (!bx.width) continue;
              const f = c.filter !== "none" ? c.filter : null; const an = c.animationName !== "none" && c.animationIterationCount === "infinite" ? c.animationName : null;
              const g = /gradient/.test(c.backgroundImage) ? c.backgroundImage.slice(0, 120) : null;
              if (f || an || g) r.push({ el: el.tagName.toLowerCase() + "." + [...el.classList].join("."), f, an, g }); }
            return r.slice(0, 40); });
          if (name === "v" && w === 1440) { await p.mouse.move(720, 400); await p.waitForTimeout(1200); await p.screenshot({ path: `${OUT}/v-hover-${theme}-${w}.png` }); }
        } catch (e) { console.log("cell fail", name, theme, w, e.message); }
      }
    } finally { await ctx.close(); }
  }
} finally { await b.close(); writeFileSync(`${OUT}/f11-capture.json`, JSON.stringify(out, null, 1)); }
