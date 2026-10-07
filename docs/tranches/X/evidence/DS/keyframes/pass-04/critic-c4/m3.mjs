import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const b = await chromium.launch({ channel: "chrome", headless: true });
const p = await (await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" })).newPage();
for (const r of ["square","spring","easing"]) {
await p.goto("http://localhost:5173/#/"+r); await p.waitForTimeout(4500);
const res = await p.evaluate(() => {
  const g = document.querySelector(".grid-background"); const gs=getComputedStyle(g);
  const old = g.style.pointerEvents; g.style.pointerEvents="auto";
  const stack = document.elementsFromPoint(600, 650).slice(0,6).map(e=>e.tagName+"."+e.className.toString().split(" ").slice(0,3).join("."));
  g.style.pointerEvents=old;
  const chain=[]; let e=g; while(e){const s=getComputedStyle(e); chain.push(e.tagName+"."+e.className.toString().split(" ")[0]+" z="+s.zIndex+" pos="+s.position+" iso="+s.isolation); e=e.parentElement;}
  return {stack, gz: gs.zIndex, chain: chain.slice(0,5)};
});
console.log(r, JSON.stringify(res));
}
await b.close();
