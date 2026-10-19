import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const b = await chromium.launch({ channel: "chrome", headless: true });
const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
await p.goto(`http://localhost:5173/#/easing`); await p.waitForTimeout(5000);
console.log(await p.evaluate(() => {
  const out=[]; const walk=(e,d)=>{ if(d>9) return; const b=e.getBoundingClientRect(); if(b.height>8) out.push(" ".repeat(d)+e.tagName.toLowerCase()+"."+String(e.className?.baseVal??e.className).split(" ").slice(0,3).join(".")+` ${Math.round(b.x)},${Math.round(b.y)} ${Math.round(b.width)}x${Math.round(b.height)}`); for(const c of e.children) walk(c,d+1); };
  walk(document.querySelector(".configurator-layer-body"),0); return out.join("\n"); }));
await b.close();
