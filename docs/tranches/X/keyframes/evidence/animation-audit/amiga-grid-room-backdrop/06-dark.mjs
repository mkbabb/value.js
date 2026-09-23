import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process";
const D = new URL(".", import.meta.url).pathname;
const K = "/Users/mkbabb/Programming/keyframes.js";
const ks = () => execSync(`git -C ${K} rev-parse --short HEAD`).toString().trim() + " dirty=" + execSync(`git -C ${K} status --porcelain | wc -l`).toString().trim();
const b = await chromium.launch({ headless: false });
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, colorScheme: "dark" });
await p.goto("http://localhost:5173/#/amiga"); await p.waitForTimeout(3500);
let bg = await p.evaluate(() => [getComputedStyle(document.body).backgroundColor, document.documentElement.className]);
if (bg[0] === "rgb(251, 250, 248)") {
  const btn = await p.evaluate(() => [...document.querySelectorAll('button[aria-label="Switch to dark mode"]')].map(b => { const r = b.getBoundingClientRect(); return [r.x + r.width / 2, r.y + r.height / 2, getComputedStyle(b).visibility]; }));
  const v = btn.find(x => x[2] === "visible"); if (v) { await p.mouse.click(v[0], v[1]); await p.waitForTimeout(1500); }
  bg = await p.evaluate(() => [getComputedStyle(document.body).backgroundColor, document.documentElement.className]);
}
await p.screenshot({ path: D + "theme-dark-full.png" });
console.log(JSON.stringify({ bg, k: ks() }));
await b.close();
