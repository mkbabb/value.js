// SERVED MODEL: claude-opus-5-5
// KF.W13X.pc probe: the heatmap's ancestor chain widths (where the inline overflow starts).
import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/value.js/package.json");
const { chromium } = require("playwright");
const [, , base, view = "spring", W = "1024", H = "768", sel = ".spring-heatmap[role=application]"] = process.argv;
const b = await chromium.launch({ channel: "chrome", headless: true });
const p = await b.newPage({ viewport: { width: +W, height: +H } });
await p.goto(base + "#/" + view, { waitUntil: "networkidle" });
await p.waitForSelector(".controls-pane-wrapper"); await p.waitForTimeout(2000);
console.log(await p.evaluate((sel) => {
  const out = []; let e = document.querySelector(sel);
  for (; e && !e.classList.contains("controls-pane-wrapper"); e = e.parentElement) {
    const r = e.getBoundingClientRect(), cs = getComputedStyle(e);
    out.push(`${e.tagName.toLowerCase()}.${[...e.classList].slice(0,3).join(".")} x=${Math.round(r.left)}..${Math.round(r.right)} w=${Math.round(r.width)} sw=${e.scrollWidth} cw=${e.clientWidth} disp=${cs.display} ov=${cs.overflowX} minw=${cs.minWidth} gtc=${cs.gridTemplateColumns.slice(0,40)}`);
  }
  return out.join("\n");
}, sel));
await b.close();
