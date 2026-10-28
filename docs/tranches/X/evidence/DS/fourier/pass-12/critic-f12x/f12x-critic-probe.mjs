// X-DS fourier pass 12 critic (F12X): route frames + computed reads. Headless real Chrome (§0ei). Read-only.
// usage: BASE=http://localhost:3100 SLUG=<viz slug> node f12x-critic-probe.mjs <outDir>
import { chromium } from "/Users/mkbabb/Programming/fourier-analysis/web/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = process.argv[2]; const BASE = process.env.BASE ?? "http://localhost:3100"; const SLUG = process.env.SLUG;
const out = {};
const read = (p) => p.evaluate(() => {
  const pick = (sel) => [...document.querySelectorAll(sel)].slice(0, 3).map((e) => {
    const cs = getComputedStyle(e); const r = e.getBoundingClientRect();
    return { sel, cls: String(e.className).slice(0, 80), w: Math.round(r.width), h: Math.round(r.height), shadow: cs.boxShadow.slice(0, 220), bf: cs.backdropFilter, border: cs.borderTopWidth + " " + cs.borderTopStyle + " " + cs.borderTopColor, radius: cs.borderTopLeftRadius, bg: cs.backgroundImage.slice(0, 120), anim: cs.animationName + " " + cs.animationIterationCount };
  });
  return [".configurator-stage", ".configurator-aside, aside", ".config-card", ".gallery-card", ".paper-article", ".progress-rail", ".badge-atom", ".grid-cell", ".app-dock", "button"].flatMap(pick);
});
const b = await chromium.launch({ channel: "chrome", headless: true });
try {
  for (const theme of ["light", "dark"]) {
    for (const w of [1440, 390]) {
      const ctx = await b.newContext({ viewport: { width: w, height: w > 500 ? 900 : 844 }, colorScheme: theme, deviceScaleFactor: 2, ...(w < 500 ? { isMobile: true, hasTouch: true } : {}) });
      await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); localStorage.setItem("theme", t); } catch {} }, theme);
      const p = await ctx.newPage();
      try {
        for (const [name, path] of [["v", `/v/${SLUG}`], ["equation", "/equation"], ["gallery", "/gallery"], ["paper", "/paper"], ["w", "/w"]]) {
          const k = `${name}-${theme}-${w}`;
          try {
            await p.mouse.move(0, 0).catch(() => {});
            await p.goto(BASE + path, { waitUntil: "domcontentloaded", timeout: 90000 });
            await p.waitForLoadState("networkidle", { timeout: 30000 }).catch(() => {}); await p.waitForTimeout(name === "v" || name === "equation" ? 6000 : 3000);
            await p.screenshot({ path: `${OUT}/${k}.png` });
            out[k] = await read(p);
            if (name === "v" && w === 1440) {
              const c = await p.$("canvas"); const bb = c && await c.boundingBox();
              if (bb) { await p.mouse.move(bb.x + bb.width / 2, bb.y + bb.height / 2); await p.waitForTimeout(1200); await p.screenshot({ path: `${OUT}/${k}-hover.png` }); }
            }
          } catch (e) { out[k + "-err"] = e.message.slice(0, 300); }
        }
      } finally { await ctx.close(); }
    }
  }
} finally { await b.close(); }
writeFileSync(`${OUT}/f12x-critic-probe.json`, JSON.stringify(out, null, 1));
