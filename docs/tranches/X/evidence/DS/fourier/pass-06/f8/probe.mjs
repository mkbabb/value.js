import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/fourier-analysis/web/package.json");
const { chromium } = require("playwright");
import { writeFileSync } from "node:fs";
const OUT = process.argv[2]; const BASE = "http://localhost:3100";
const b = await chromium.launch({ channel: "chrome", headless: true });
const res = {};
async function page(theme, w) {
  const ctx = await b.newContext({ viewport: { width: w, height: w === 390 ? 844 : 900 }, colorScheme: theme, ...(w === 390 ? { isMobile: true, hasTouch: true, deviceScaleFactor: 2 } : {}) });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); localStorage.setItem("theme", t); } catch {} }, theme);
  return ctx.newPage();
}
const shadowAudit = () => {
  const out = [];
  for (const e of document.querySelectorAll("body *")) {
    if (e.closest("svg") || e.tagName === "CANVAS") continue;
    const r = e.getBoundingClientRect(); if (r.width < 4 || r.height < 4 || r.bottom < 0 || r.top > innerHeight) continue;
    const cs = getComputedStyle(e);
    const bs = cs.boxShadow; const bi = cs.backgroundImage; const anim = cs.animationName; const it = cs.animationIterationCount; const ts = cs.textShadow; const f = cs.filter;
    const flags = [];
    if (bs && bs !== "none") flags.push("bs:" + bs.slice(0, 120));
    if (bi && bi !== "none" && /gradient/.test(bi)) flags.push("bi:" + bi.slice(0, 80));
    if (anim && anim !== "none" && it === "infinite") flags.push("loop:" + anim);
    if (ts && ts !== "none") flags.push("ts:" + ts);
    if (f && f !== "none") flags.push("f:" + f);
    if (flags.length) out.push([(e.className?.toString?.() || e.tagName).slice(0, 70), flags]);
  }
  return out;
};
for (const theme of ["light", "dark"]) {
  for (const w of [1440, 390]) {
    for (const route of ["/gallery", "/visualize", "/morph"]) {
      if (w === 390 && route !== "/gallery") continue;
      const p = await page(theme, w);
      await p.goto(BASE + route, { waitUntil: "networkidle" }).catch(() => {}); await p.waitForTimeout(3500);
      const tag = route.slice(1) + `-${theme}-${w}`;
      await p.screenshot({ path: `${OUT}/${tag}.png` });
      res[tag] = await p.evaluate(shadowAudit).catch(e => String(e));
      if (route === "/visualize" && w === 1440) {
        const c = await p.$("canvas");
        if (c) { const bb = await c.boundingBox(); await p.mouse.move(bb.x + bb.width * 0.5, bb.y + bb.height * 0.5); await p.waitForTimeout(400); await p.screenshot({ path: `${OUT}/visualize-hover-a-${theme}-1440.png` }); await p.waitForTimeout(700); await p.screenshot({ path: `${OUT}/visualize-hover-b-${theme}-1440.png` }); }
      }
      if (route === "/gallery" && w === 1440) {
        const card = await p.$(".gallery-card");
        if (card) { await card.hover(); await p.waitForTimeout(600); await p.screenshot({ path: `${OUT}/gallery-hover-${theme}-1440.png` }); res[`gallery-card-hover-${theme}`] = await card.evaluate(e => { const cs = getComputedStyle(e); return { bs: cs.boxShadow, tf: cs.transform, bi: cs.backgroundImage.slice(0, 120) }; }); }
      }
      await p.close();
    }
  }
}
writeFileSync(`${OUT}/probe.json`, JSON.stringify(res, null, 1));
await b.close();
