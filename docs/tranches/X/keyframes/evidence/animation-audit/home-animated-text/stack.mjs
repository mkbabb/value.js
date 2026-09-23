// home-animated-text — stacking/compositing probe: full-page shot + what lies under/over the hero glyphs.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const browser = await chromium.launch({ headless: false });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await page.goto("http://localhost:5173/", { waitUntil: "networkidle" });
await page.waitForSelector("h1 .wave-char"); await page.waitForTimeout(2500);
await page.screenshot({ path: OUT + "fullpage.png" });
const r = await page.evaluate(() => {
  const chars = [...document.querySelectorAll("h1 .wave-char")];
  const path = (el) => { const p = []; for (let e = el; e && e !== document.body; e = e.parentElement) p.push(e.tagName.toLowerCase() + (e.id ? "#" + e.id : "") + (typeof e.className === "string" && e.className ? "." + e.className.trim().split(/\s+/).slice(0, 2).join(".") : "")); return p.slice(0, 6).join(" < "); };
  const out = chars.map((c) => { const b = c.getBoundingClientRect(); const x = b.left + b.width / 2, y = b.top + b.height / 2; const stack = document.elementsFromPoint(x, y).slice(0, 5).map(path); return { ch: c.textContent, x: Math.round(x), y: Math.round(y), top: stack[0], stack }; });
  const h1 = document.querySelector("h1.hero-display"); const anc = []; for (let e = h1; e; e = e.parentElement) { const s = getComputedStyle(e); if (s.zIndex !== "auto" || s.position !== "static" || s.isolation !== "auto" || s.transform !== "none" || s.filter !== "none" || s.mixBlendMode !== "normal" || s.contain !== "none") anc.push({ el: path(e).split(" < ")[0], pos: s.position, z: s.zIndex, iso: s.isolation, tf: s.transform.slice(0, 40), filter: s.filter.slice(0, 40), blend: s.mixBlendMode, contain: s.contain }); }
  const canv = [...document.querySelectorAll("canvas, [class*=cube], [class*=scene], [class*=stage]")].slice(0, 12).map((e) => { const b = e.getBoundingClientRect(); const s = getComputedStyle(e); return { el: path(e), rect: [b.left, b.top, b.width, b.height].map(Math.round), pos: s.position, z: s.zIndex, anims: e.getAnimations().length }; });
  return { out, anc, canv };
});
fs.writeFileSync(OUT + "stack.json", JSON.stringify(r, null, 1));
await browser.close();
console.log(JSON.stringify({ tops: r.out.map((o) => o.ch + ":" + o.top.split(" < ")[0]), anc: r.anc }, null, 0));
console.log(JSON.stringify(r.out.find((o) => o.ch === "m").stack));
console.log(JSON.stringify(r.canv));
