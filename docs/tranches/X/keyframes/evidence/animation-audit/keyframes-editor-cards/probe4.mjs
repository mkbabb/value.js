import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const OUT = new URL(".", import.meta.url).pathname;
const b = await chromium.launch({ headless: false });
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await p.goto("http://localhost:5173/#/spring", { waitUntil: "load" }); await p.waitForTimeout(4000);
const r = await p.evaluate(() => {
  const sec = [...document.querySelectorAll(".keyframes-section")].find(s => s.offsetParent); sec.scrollIntoView({ block: "start" });
  const bar = sec.querySelector(".progress-bar"); const chain = []; let e = bar;
  for (let k = 0; k < 6 && e; k++) { const cs = getComputedStyle(e); chain.push({ tag: e.tagName, cls: String(e.className).slice(0, 90), ow: e.offsetWidth, oh: e.offsetHeight, disp: cs.display, gtc: cs.gridTemplateColumns, js: cs.justifySelf, ji: cs.justifyItems, pos: cs.position, bg: cs.backgroundImage.slice(0, 40) }); e = e.parentElement; }
  return chain;
});
console.log(JSON.stringify(r, null, 1));
await p.waitForTimeout(400);
await p.screenshot({ path: OUT + "rest-editor.png", clip: { x: 60, y: 150, width: 440, height: 480 } });
await b.close();
