// X-DS kf pass 6 cure seat — the rail's ancestor chain (KF-C6-03). Headless real Chrome (§0ei).
import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const b = await chromium.launch({ channel: "chrome", headless: true });
for (const h of [900, 1080]) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: h } });
  const p = await ctx.newPage();
  await p.goto("http://localhost:5173/#/cube", { waitUntil: "load" });
  await p.waitForTimeout(3000);
  const o = await p.evaluate(() => {
    const out = [];
    for (let e = document.querySelector(".controls-surface"); e && e !== document.body; e = e.parentElement) {
      const r = e.getBoundingClientRect(); const s = getComputedStyle(e);
      out.push([e.tagName, e.className.toString().slice(0, 70), Math.round(r.y), Math.round(r.height), s.display, s.alignSelf, s.containerType, s.maxBlockSize.slice(0, 30)]);
    }
    return out;
  });
  console.log(h); for (const r of o) console.log(" ", JSON.stringify(r));
  await ctx.close();
}
await b.close();
