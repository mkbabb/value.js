import { chromium } from "playwright";
const b = await chromium.launch();
const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
await p.goto("http://localhost:9000/#/browse", { waitUntil: "networkidle", timeout: 60000 });
await p.waitForTimeout(5000);
const r = await p.evaluate(() => {
  const bar = document.querySelector(".search-seated");
  const chain = []; let n = bar;
  while (n) { const v = getComputedStyle(n).getPropertyValue("--focus-ring-shadow"); chain.push(`${n.tagName.toLowerCase()}.${String(n.className).split(/\s+/).slice(0,2).join(".")} => ${v.trim().slice(0,70)}`); n = n.parentElement; }
  const inp = bar.querySelector("input"); inp.focus();
  // paint proof: sample the pixel just outside the bar's left edge at mid-height, focused vs not
  return { chain: chain.slice(0, 5), focusedShadow: getComputedStyle(bar).boxShadow, rect: bar.getBoundingClientRect().toJSON() };
});
console.log(JSON.stringify(r, null, 1));
// pixel proof
await p.evaluate(() => document.querySelector(".search-seated input").blur());
await p.waitForTimeout(400);
await p.screenshot({ path: "D/ring-blur.png", clip: { x: 210, y: 320, width: 490, height: 70 } });
await p.evaluate(() => document.querySelector(".search-seated input").focus());
await p.waitForTimeout(600);
await p.screenshot({ path: "D/ring-focus.png", clip: { x: 210, y: 320, width: 490, height: 70 } });
await b.close();
