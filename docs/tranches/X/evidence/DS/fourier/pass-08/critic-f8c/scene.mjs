import { chromium } from "/Users/mkbabb/Programming/fourier-analysis/web/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = process.argv[2]; const BASE = "http://localhost:3100";
const b = await chromium.launch({ channel: "chrome", headless: true });
const out = {};
const read = (p) => p.evaluate(() => {
  const r = [];
  for (const e of document.querySelectorAll("button, .glass-resting, .glass-floating, .gallery-card, .badge-atom, [class*=capsule], .progress-rail, .configurator-stage, aside")) {
    const bb = e.getBoundingClientRect(); if (!bb.width || !bb.height) continue;
    const cs = getComputedStyle(e);
    if (cs.boxShadow === "none" && cs.backdropFilter === "none" && cs.animationName === "none" && !cs.backgroundImage.includes("gradient")) continue;
    r.push({ el: e.tagName.toLowerCase() + "." + [...e.classList].slice(0, 5).join("."), txt: (e.textContent || "").trim().slice(0, 24), x: Math.round(bb.left), y: Math.round(bb.top), w: Math.round(bb.width), h: Math.round(bb.height), shadow: cs.boxShadow, backdrop: cs.backdropFilter, anim: cs.animationName + " " + cs.animationIterationCount, bgi: cs.backgroundImage.slice(0, 120) });
  }
  return r;
});
const cells = [];
try {
  let slug = "/v/plush-evening-olive-squid";
  for (const theme of ["light", "dark"]) {
    for (const [route, w] of cells) {
      const k = `${route}-${theme}-${w}`;
      const ctx = await b.newContext({ viewport: { width: w, height: w > 500 ? 900 : 844 }, colorScheme: theme, deviceScaleFactor: 2, ...(w < 500 ? { isMobile: true, hasTouch: true } : {}) });
      await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); localStorage.setItem("theme", t); } catch {} }, theme);
      const p = await ctx.newPage();
      try {
        await p.mouse.move(0, 0);
        await p.goto(BASE + "/" + route, { waitUntil: "domcontentloaded", timeout: 90000 });
        await p.waitForLoadState("networkidle", { timeout: 30000 }).catch(() => {}); await p.waitForTimeout(4000);
        await p.screenshot({ path: `${OUT}/${k}.png` });
        out[k] = await read(p);
        if (route === "gallery" && !slug) {
          slug = await p.evaluate(() => [...document.querySelectorAll("a[href]")].map((a) => a.getAttribute("href")).find((h) => /^\/(v|w)\//.test(h)) || null);
          out.slug = slug;
        }
      } catch (e) { out[k + "-err"] = e.message.slice(0, 300); }
      await ctx.close();
    }
    if (slug) {
      const k = `scene-${theme}-1440`;
      const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: theme, deviceScaleFactor: 2 });
      await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); localStorage.setItem("theme", t); } catch {} }, theme);
      const p = await ctx.newPage();
      try {
        await p.mouse.move(0, 0);
        await p.goto(BASE + slug, { waitUntil: "domcontentloaded", timeout: 90000 });
        await p.waitForLoadState("networkidle", { timeout: 30000 }).catch(() => {}); await p.waitForTimeout(6000);
        await p.screenshot({ path: `${OUT}/${k}.png` });
        out[k] = await read(p);
        const c = await p.evaluate(() => { const cv = [...document.querySelectorAll("canvas")].map((c) => c.getBoundingClientRect()).sort((a, b) => b.width * b.height - a.width * a.height)[0]; return cv ? { x: cv.left + cv.width / 2, y: cv.top + cv.height / 2 } : null; });
        if (c) { await p.mouse.move(c.x, c.y); await p.waitForTimeout(800); await p.screenshot({ path: `${OUT}/${k}-hover.png` }); await p.waitForTimeout(900); await p.screenshot({ path: `${OUT}/${k}-hover2.png` }); }
      } catch (e) { out[k + "-err"] = e.message.slice(0, 300); }
      await ctx.close();
    }
  }
} finally { await b.close(); writeFileSync(`${OUT}/scene.json`, JSON.stringify(out, null, 1)); }
