import { chromium } from "/Users/mkbabb/Programming/fourier-analysis/web/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = process.argv[2]; const BASE = "http://localhost:3148";
const routes = [["gallery","/gallery"],["equation","/equation"],["morph","/morph"],["paper","/paper"],["w","/w/placid-stirring-opal-viper"]];
const cells = [["light",1440],["dark",1440],["light",390],["dark",390]];
const out = {};
const b = await chromium.launch({ channel: "chrome", headless: true });
const scan = (p) => p.evaluate(() => {
  const res = [];
  for (const el of document.querySelectorAll("body *")) {
    if (el.closest("svg,canvas")) continue;
    const r = el.getBoundingClientRect(); if (r.width < 2 || r.height < 2) continue;
    const cs = getComputedStyle(el);
    if (cs.visibility === "hidden" || cs.display === "none") continue;
    const bs = cs.boxShadow, f = cs.filter, bf = cs.backdropFilter, an = cs.animationName, bg = cs.backgroundImage, ts = cs.textShadow;
    const hit = (bs && bs !== "none") || (f && f !== "none") || (bf && bf !== "none") || (an && an !== "none" && cs.animationIterationCount === "infinite") || (bg && bg.includes("gradient")) || (ts && ts !== "none");
    if (!hit) continue;
    res.push({ cls: (el.tagName + "." + [...el.classList].slice(0,4).join(".")).slice(0,90), box: [Math.round(r.x),Math.round(r.y),Math.round(r.width),Math.round(r.height)],
      bs: bs !== "none" ? bs.slice(0,260) : undefined, f: f !== "none" ? f : undefined, bf: bf !== "none" ? bf : undefined,
      an: an !== "none" ? an + "/" + cs.animationIterationCount : undefined, bg: bg.includes("gradient") ? bg.slice(0,160) : undefined, ts: ts !== "none" ? ts : undefined });
  }
  return res;
});
try {
  for (const [name, path] of routes) for (const [theme, w] of cells) {
    const k = `${name}-${theme}-${w}`;
    const ctx = await b.newContext({ viewport: { width: w, height: w > 500 ? 900 : 844 }, colorScheme: theme, deviceScaleFactor: w > 500 ? 1 : 2, ...(w < 500 ? { isMobile: true, hasTouch: true } : {}) });
    await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); localStorage.setItem("theme", t); } catch {} }, theme);
    const p = await ctx.newPage();
    try {
      await p.goto(BASE + path, { waitUntil: "domcontentloaded", timeout: 60000 });
      await p.waitForLoadState("networkidle", { timeout: 20000 }).catch(() => {}); await p.waitForTimeout(3000);
      await p.screenshot({ path: `${OUT}/${k}.png` });
      if (theme === "light" && w === 1440) out[name] = await scan(p);
      if (name === "w" && w === 1440) {
        const c = await p.$("canvas"); if (c) { const bb = await c.boundingBox(); await p.mouse.move(bb.x + bb.width*0.15, bb.y + bb.height*0.75); await p.waitForTimeout(800); await p.screenshot({ path: `${OUT}/${k}-hover.png` }); }
      }
    } catch (e) { out[k+"-err"] = e.message.slice(0,200); } finally { await ctx.close(); }
  }
} finally { await b.close(); writeFileSync(`${OUT}/scan.json`, JSON.stringify(out, null, 1)); }
