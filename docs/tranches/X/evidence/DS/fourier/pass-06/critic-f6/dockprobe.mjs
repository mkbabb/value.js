import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/fourier-analysis/web/package.json");
const { chromium } = require("playwright");
const b = await chromium.launch({ channel: "chrome", headless: true });
for (const r of ["/equation", "/v/plush-evening-olive-squid", "/gallery"]) {
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  const p = await ctx.newPage();
  await p.goto("http://localhost:3100" + r, { waitUntil: "networkidle" });
  for (const t of [1000, 4000, 9000]) {
    await p.waitForTimeout(t === 1000 ? 1000 : t - (t === 4000 ? 1000 : 4000));
    const d = await p.evaluate(() => [...document.querySelectorAll(".app-dock, .app-dock *")].filter(e => { const c = getComputedStyle(e); return c.backgroundColor !== "rgba(0, 0, 0, 0)" || c.backdropFilter !== "none" || c.boxShadow !== "none"; }).slice(0, 4).map(e => { const c = getComputedStyle(e); const r = e.getBoundingClientRect(); return { cls: String(e.className).slice(0, 60), w: Math.round(r.width), h: Math.round(r.height), br: c.borderRadius, clip: c.clipPath.slice(0, 40), tf: c.transform.slice(0,40), anim: e.getAnimations().map(a => a.animationName || a.constructor.name + ":" + (a.effect?.getKeyframes?.().map(k=>Object.keys(k).join("|")).join(",")||"")).join(";").slice(0,120) }; }));
    console.log(r, t, JSON.stringify(d));
  }
  await ctx.close();
}
await b.close();
