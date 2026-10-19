// X-DS fourier pass 4 critic (F6): element under the stray 390 rule; eq a+b overflow; not-found padding. Headless real Chrome (§0ei).
import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/fourier-analysis/web/package.json");
const { chromium } = require("playwright");
const BASE = process.argv[2] ?? "http://localhost:3100";
const b = await chromium.launch({ channel: "chrome", headless: true });
const out = {};
{ const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  const p = await ctx.newPage();
  await p.goto(BASE + "/v/plush-evening-olive-squid", { waitUntil: "networkidle" }); await p.waitForTimeout(2500);
  await p.getByRole("tab", { name: "Canvas" }).click(); await p.waitForTimeout(2000);
  out.rule = await p.evaluate(() => { const hits = []; for (const y of [836, 837, 838, 839, 840, 841]) { const e = document.elementFromPoint(200, y); if (e) { const cs = getComputedStyle(e); const r = e.getBoundingClientRect(); hits.push([y, e.tagName, String(e.className).slice(0, 80), Math.round(r.top), Math.round(r.bottom), cs.borderTop, cs.borderBottom, cs.backgroundColor, cs.boxShadow.slice(0, 60)]); } } return hits; });
  await ctx.close(); }
{ const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage();
  await p.goto(BASE + "/equation", { waitUntil: "networkidle" }); await p.waitForTimeout(2500);
  await p.getByText("a + b").first().click(); await p.waitForTimeout(1500);
  out.eq = await p.evaluate(() => { const k = document.querySelector(".katex-display, .katex"); let e = k; const chain = []; for (let i = 0; i < 6 && e; i++, e = e.parentElement) { const cs = getComputedStyle(e); chain.push([e.tagName, String(e.className).slice(0, 60), e.scrollWidth, e.clientWidth, cs.overflowX, cs.maskImage?.slice(0, 40)]); } return chain; });
  await p.goto(BASE + "/no-such-route", { waitUntil: "networkidle" }); await p.waitForTimeout(1500);
  out.nf = await p.evaluate(() => { const h = [...document.querySelectorAll("h1,h2")].find(x => /not found/i.test(x.textContent)); let e = h; const chain = []; for (let i = 0; i < 4 && e; i++, e = e.parentElement) { const cs = getComputedStyle(e); chain.push([e.tagName, String(e.className).slice(0, 80), cs.padding, Math.round(e.getBoundingClientRect().left)]); } return chain; });
  await ctx.close(); }
console.log(JSON.stringify(out, null, 1));
await b.close();
