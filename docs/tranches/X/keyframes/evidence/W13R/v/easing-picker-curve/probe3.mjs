import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const b = await chromium.launch({ headless: false });
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await p.goto("http://localhost:5173/#/easing", { waitUntil: "networkidle" });
await p.waitForTimeout(2500);
console.log(JSON.stringify(await p.evaluate(() => {
  const pk = document.querySelector("[data-testid=easing-picker]"); const out=[]; let e=pk;
  for (let i=0;i<8&&e;i++){ const cs=getComputedStyle(e); const b=e.getBoundingClientRect(); out.push({tag:e.tagName, cls:(e.className&&e.className.baseVal===undefined?e.className:"").slice(0,90), ct:cs.containerType, w:Math.round(b.width), style:e.getAttribute("style")}); e=e.parentElement; }
  const svg=pk.querySelector("svg"); return {chain:out, svgStyle: svg.getAttribute("style"), svgCS:[getComputedStyle(svg).width,getComputedStyle(svg).height,getComputedStyle(svg).aspectRatio]};
})));
await b.close();
