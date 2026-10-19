import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const b = await chromium.launch({ channel: "chrome", headless: true });
const p = await (await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" })).newPage();
await p.goto("http://localhost:5173/#/square"); await p.waitForTimeout(5000);
const r = await p.evaluate(() => {
  const out = []; let e = document.querySelector(".square-stage").parentElement;
  while (e) { const s = getComputedStyle(e); const f = {filter:s.filter, op:s.opacity, wc:s.willChange, mask:s.maskImage, cp:s.clipPath, mbm:s.mixBlendMode, bf:s.backdropFilter, bgi:s.backgroundImage.slice(0,60)};
    const hit = f.filter!=="none"||f.op!=="1"||(f.wc!=="auto")||f.mask!=="none"||f.cp!=="none"||f.mbm!=="normal"||f.bf!=="none"||f.bgi!=="none";
    if (hit) out.push({tag:e.tagName, cls:e.className.toString().slice(0,90), ...f}); e = e.parentElement; }
  // who paints the grid
  const g=[...document.querySelectorAll("*")].filter(x=>getComputedStyle(x).backgroundImage.includes("linear-gradient")).map(x=>({tag:x.tagName,cls:x.className.toString().slice(0,80), z:getComputedStyle(x).zIndex, pos:getComputedStyle(x).position}));
  return {out,g};
});
console.log(JSON.stringify(r,null,1)); await b.close();
