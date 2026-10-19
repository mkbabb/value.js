// SERVED MODEL: claude-opus-5-5
// KF.W13X.pc probe: which intrinsic size pushes the spring heatmap past the rail at 1024 (read-only, in-page style trial).
import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/value.js/package.json");
const { chromium } = require("playwright");
const [, , base] = process.argv;
const b = await chromium.launch({ channel: "chrome", headless: true });
const p = await b.newPage({ viewport: { width: 1024, height: 768 } });
await p.goto(base + "#/spring", { waitUntil: "networkidle" });
await p.waitForSelector(".spring-heatmap"); await p.waitForTimeout(2000);
console.log(await p.evaluate(() => {
  const s = document.querySelector(".spring-heatmap-section"), plot = s.querySelector(".spring-heatmap-plot"), f = s.querySelector(".spring-heatmap[role=application]");
  const rd = (t) => `${t}: section gtc=${getComputedStyle(s).gridTemplateColumns} plot.w=${Math.round(plot.getBoundingClientRect().width)} field=${Math.round(f.getBoundingClientRect().left)}..${Math.round(f.getBoundingClientRect().right)} section=${Math.round(s.getBoundingClientRect().left)}..${Math.round(s.getBoundingClientRect().right)} pad=${getComputedStyle(s).paddingLeft}/${getComputedStyle(s).marginLeft}`;
  const o = [rd("as-is")];
  // which plot children have the widest min-content?
  for (const c of plot.children) o.push(`  child ${c.className.slice(0,40)} w=${Math.round(c.getBoundingClientRect().width)} sw=${c.scrollWidth} gc=${getComputedStyle(c).gridColumnStart}`);
  s.style.gridTemplateColumns = "minmax(0, 1fr)"; o.push(rd("trial section minmax(0,1fr)"));
  s.style.gridTemplateColumns = ""; plot.style.minInlineSize = "0"; o.push(rd("trial plot min-inline-size 0"));
  return o.join("\n");
}));
await b.close();
