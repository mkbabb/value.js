// SERVED MODEL: claude-opus-5-5 — X.KF.W13X.cube · UIA-KF-259: the die's footprint vs the stage and the pane
// usage: node size.mjs <baseUrl> <tag>
import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const BASE = process.argv[2]; const TAG = process.argv[3] || "before";
const OUT = new URL("./frames/", import.meta.url).pathname;
const b = await chromium.launch({ headless: false }); const out = {};
for (const [route, w, h, theme] of [["cube", 1440, 900, "light"], ["cube", 1440, 900, "dark"], ["cube", 1024, 768, "light"], ["", 1440, 900, "light"], ["", 1024, 768, "light"]]) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, colorScheme: theme, reducedMotion: "reduce" }); const p = await ctx.newPage();
  await p.goto(`${BASE}/#/${route}`); await p.waitForSelector(".cube-side"); await p.waitForTimeout(2500);
  out[`${route || "home"}-${w}-${theme}`] = await p.evaluate(() => {
    const u = { l: 1e9, t: 1e9, r: -1e9, b: -1e9 }; for (const f of document.querySelectorAll(".cube-side")) { const r = f.getBoundingClientRect(); u.l = Math.min(u.l, r.left); u.t = Math.min(u.t, r.top); u.r = Math.max(u.r, r.right); u.b = Math.max(u.b, r.bottom); }
    const R = (r) => r && { l: Math.round(r.left), t: Math.round(r.top), r: Math.round(r.right), b: Math.round(r.bottom) };
    const hit = (a, c) => a && c && a.l < c.r && c.l < a.r && a.t < c.b && c.t < a.b;
    const pane = document.querySelector(".controls-surface")?.getBoundingClientRect(); const paneR = pane && pane.width > 0 ? R(pane) : null;
    const texts = [...document.querySelectorAll("h1,h2,p,.hero-sub")].filter((e) => e.getBoundingClientRect().width > 0 && getComputedStyle(e).visibility !== "hidden").map((e) => R(e.getBoundingClientRect()));
    const die = { l: Math.round(u.l), t: Math.round(u.t), r: Math.round(u.r), b: Math.round(u.b) };
    const side = document.querySelector(".cube-side").getBoundingClientRect().width;
    const cy = (die.t + die.b) / 2; const worst = Math.max(die.r - die.l, die.b - die.t) * Math.sqrt(3) / Math.SQRT2;
    const tp = [...document.querySelectorAll("button[aria-label='Reset animation'], button[aria-label='Play animation'], button[aria-label='Pause animation']")].map((e) => e.getBoundingClientRect().top).filter((v) => v > innerHeight / 2);
    const transportTop = tp.length ? Math.round(Math.min(...tp)) : null;
    return { worstDiagonalBottom: Math.round(cy + worst / 2), transportTop, side: Math.round(document.querySelector(".cube-side").getBoundingClientRect().width), dieW: die.r - die.l, dieH: die.b - die.t, die, pane: paneR, dieHitsPane: hit(die, paneR), dieHitsText: texts.some((t) => hit(die, t)), dieInViewport: die.l >= 0 && die.t >= 0 && die.r <= innerWidth && die.b <= innerHeight };
  });
  await p.screenshot({ path: `${OUT}${TAG}-size-${route || "home"}-${w}-${theme}.png` }); await ctx.close();
}
console.log(JSON.stringify(out)); await b.close();
