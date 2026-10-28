import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/fourier-analysis/web/package.json");
const { chromium } = require("playwright");
import { writeFileSync } from "node:fs";
const OUT = process.argv[2]; const BASE = "http://localhost:3100";
const b = await chromium.launch({ channel: "chrome", headless: true });
const res = {};
for (const theme of ["light", "dark"]) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: theme });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); localStorage.setItem("theme", t); } catch {} }, theme);
  const p = await ctx.newPage();
  await p.goto(BASE + "/gallery", { waitUntil: "networkidle" }); await p.waitForTimeout(2500);
  await p.locator(".card-open").first().click(); await p.waitForTimeout(1500);
  res[`modal-${theme}`] = await p.evaluate(() => { const d = document.querySelector("[role=dialog]"); const q = (s) => { const e = d.querySelector(s); if (!e) return null; const cs = getComputedStyle(e); return [e.textContent.trim().slice(0,30), cs.fontSize, cs.fontWeight, cs.fontFamily.slice(0,30)]; };
    return { title: q("h2"), desc: q("p, [id*=description]"), views: q(".text-sm.text-muted-foreground"), like: q(".like-btn"), h3: q("h3"), harm: q(".modal-section .text-sm"), bs: getComputedStyle(d).boxShadow.slice(0,200) }; });
  await p.goto(BASE + "/v/plush-evening-olive-squid", { waitUntil: "networkidle" }); await p.waitForTimeout(6000);
  res[`url-${theme}`] = p.url();
  await p.screenshot({ path: `${OUT}/v-item-${theme}-1440.png` });
  const c = (await p.$$("canvas")).at(-1);
  const bb = await c.boundingBox(); res[`canvas-${theme}`] = bb;
  // pause animation if possible so hover frames compare
  await p.keyboard.press("Space").catch(()=>{}); await p.waitForTimeout(500);
  await p.screenshot({ path: `${OUT}/v-item-paused-${theme}-1440.png` });
  await p.mouse.move(bb.x + bb.width*0.48, bb.y + bb.height*0.5); await p.waitForTimeout(300);
  await p.screenshot({ path: `${OUT}/v-item-hover-a-${theme}-1440.png` });
  await p.waitForTimeout(900);
  await p.screenshot({ path: `${OUT}/v-item-hover-b-${theme}-1440.png` });
  res[`chrome-${theme}`] = await p.evaluate(() => [...document.querySelectorAll(".configurator-aside, .configurator-stage, .canvas-legend, [class*=legend]")].slice(0,6).map(e => { const cs = getComputedStyle(e); return [e.className.toString().slice(0,60), cs.boxShadow.slice(0,160), cs.backdropFilter]; }));
  await ctx.close();
}
writeFileSync(`${OUT}/probe2.json`, JSON.stringify(res, null, 1));
await b.close();
