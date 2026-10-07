// X-DS fourier pass 3 cure probe: the aside's box tree (DS-F3-C8). Headless real Chrome (§0ei).
import { chromium } from "playwright";
const b = await chromium.launch({ channel: "chrome", headless: true });
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
await p.goto(`http://localhost:3100/v/plush-evening-olive-squid`, { waitUntil: "networkidle" });
await p.waitForTimeout(4000);
console.log(await p.evaluate(() => {
  const out = [];
  const walk = (el, d) => { if (d > 6) return; const cs = getComputedStyle(el); const r = el.getBoundingClientRect();
    out.push(`${"  ".repeat(d)}${el.tagName.toLowerCase()}.${String(el.className).split(" ").slice(0,3).join(".")} h=${Math.round(r.height)} disp=${cs.display} ovY=${cs.overflowY} flex=${cs.flex} sh=${el.scrollHeight}`);
    if (out.length < 40) for (const c of el.children) walk(c, d + 1); };
  walk(document.querySelector('[data-slot="configurator"] > .configurator-aside'), 0);
  return out.join("\n");
}));
await b.close();
