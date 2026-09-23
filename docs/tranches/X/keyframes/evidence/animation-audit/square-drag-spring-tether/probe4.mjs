// Probe 4 — is the Home-key engine paint (magenta fill + 1-frame snap) from a handler ABOVE the box? Block bubbling above the box and compare.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const b = await chromium.launch({ headless: false });
for (const block of [false, true]) {
  const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  await p.goto("http://localhost:5173/#/square"); await p.waitForSelector(".demo-box"); await p.waitForTimeout(2500);
  await p.evaluate((block) => { const bx = document.querySelector(".demo-box"); if (block) bx.parentElement.addEventListener("keydown", e => e.stopPropagation()); window.__fills = [];
    new MutationObserver(() => window.__fills.push([bx.style.getPropertyValue("--subject-fill"), bx.style.transform.slice(0, 40)])).observe(bx, { attributes: true, attributeFilter: ["style"] }); }, block);
  await p.focus(".demo-box"); await p.keyboard.press("ArrowRight"); await p.waitForTimeout(1200);
  await p.keyboard.press("Home"); await p.waitForTimeout(1200);
  const r = await p.evaluate(() => ({ fill: document.querySelector(".demo-box").style.getPropertyValue("--subject-fill"), distinct: [...new Set(window.__fills.map(f => f[0] + " | " + f[1].replace(/[\d.]+px/g, m => Math.round(parseFloat(m)) + "px")))].slice(0, 8) }));
  console.log("blockBubble=" + block, JSON.stringify(r));
  await p.close();
}
await b.close();
