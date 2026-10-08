import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/fourier-analysis/web/package.json");
const { chromium } = require("playwright");
import { writeFileSync } from "node:fs";
const OUT = process.argv[2];
const b = await chromium.launch({ channel: "chrome", headless: true });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
const p = await ctx.newPage();
await p.goto("http://localhost:3100/paper", { waitUntil: "networkidle" }); await p.waitForTimeout(3000);
const r = await p.evaluate(() => {
  const t = document.querySelector(".theorem-block--theorem"); const tr = t.getBoundingClientRect(); const cs = getComputedStyle(t);
  const kd = t.querySelector(".katex-display"); const kr = kd?.getBoundingClientRect(); const kcs = kd && getComputedStyle(kd);
  const kids = [...t.children].map(c => { const r = c.getBoundingClientRect(); const s = getComputedStyle(c); return [c.className.toString().slice(0,50), Math.round(r.top - tr.top), Math.round(r.height), s.marginTop, s.marginBottom, s.paddingBottom]; });
  const tags = [...document.querySelectorAll(".paper-article .tag, .paper-article .eqn-num, .paper-article [class*=eq-num], .paper-article .katex-html > .tag")].slice(0,4).map(e => { const s = getComputedStyle(e); return [e.className.toString(), e.textContent.trim(), s.fontStyle, s.fontFamily.slice(0,40), s.fontSize, !!e.closest(".theorem-block")]; });
  const inner = [...document.querySelectorAll(".paper-article *")].filter(e => /^\(1\.(1|18)\)$/.test(e.textContent.trim()) && e.children.length === 0).map(e => [e.className.toString(), e.parentElement.className.toString().slice(0,40), getComputedStyle(e).fontStyle, getComputedStyle(e).fontFamily.slice(0,30), getComputedStyle(e).fontSize, !!e.closest(".theorem-block")]);
  return { pad: [cs.paddingTop, cs.paddingBottom], h: Math.round(tr.height), kd: kr && [Math.round(kr.top - tr.top), Math.round(kr.bottom - tr.top), kcs.marginTop, kcs.marginBottom, kcs.paddingTop, kcs.paddingBottom], kids, tags, innerTag: inner };
});
writeFileSync(`${OUT}/probe3.json`, JSON.stringify(r, null, 1)); console.log(JSON.stringify(r, null, 1));
await b.close();
