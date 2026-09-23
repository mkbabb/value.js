import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process";
const b = await chromium.launch({ headless: false });
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await p.goto("http://localhost:5173/#/cube", { waitUntil: "load" }); await p.waitForTimeout(2500);
await p.evaluate(() => [...document.querySelectorAll('button[aria-label="Edit easing curve"]')].find((b) => b.getBoundingClientRect().x < 700 && b.getBoundingClientRect().width > 0).click());
await p.waitForTimeout(700);
const r = await p.evaluate(async () => {
  const back = [...document.querySelectorAll('button[aria-label="back to controls"]')].find((b) => b.getBoundingClientRect().width > 0);
  const root = back.closest(".panel-row").parentElement; const main = root.children[0].firstElementChild;
  back.click(); await new Promise((r) => setTimeout(r, 0));
  const out = [];
  for (let k = 0; k < 6; k++) { await new Promise((r) => requestAnimationFrame(r)); out.push({ t: Math.round(performance.now()), scrollTop: main.scrollTop, h: Math.round(main.getBoundingClientRect().height), active: document.activeElement?.getAttribute("aria-label") }); }
  return out;
});
console.log(JSON.stringify(r), execSync("git -C /Users/mkbabb/Programming/keyframes.js rev-parse --short HEAD").toString().trim());
await b.close();
