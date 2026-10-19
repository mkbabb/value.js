import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const b = await chromium.launch({ channel: "chrome", headless: true });
for (const [W,H] of [[1440,900],[1280,760],[1440,1080],[1024,700]]) {
const p = await (await b.newContext({ viewport: { width: W, height: H } })).newPage();
await p.goto(`http://localhost:5173/#/easing`); await p.waitForTimeout(4500);
console.log(W,H, JSON.stringify(await p.evaluate(() => {
  const host = document.querySelector(".configurator-layer-body"); const d=document.createElement("div"); d.style.cssText="inline-size:100000px;max-inline-size:var(--rail-block)"; host.appendChild(d); const rb=d.getBoundingClientRect().width; d.remove();
  const s=document.querySelector(".controls-surface"); const svg=document.querySelector(".configurator-layer-body svg");
  return {rb, surf:[s.scrollHeight,s.clientHeight], plot: Math.round(svg.getBoundingClientRect().width), pr: Math.round(document.querySelector(".param-row").getBoundingClientRect().bottom)};
})));
await p.close(); }
await b.close();
