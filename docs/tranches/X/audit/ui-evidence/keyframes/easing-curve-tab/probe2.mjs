// probe2 — READ-ONLY: the 'Controls tab' control + the duration field DOM.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
const p = await ctx.newPage(); await p.goto("http://localhost:5173/#/easing", { waitUntil: "networkidle" }); await p.waitForTimeout(3500);
const o = await p.evaluate(() => { const e = [...document.querySelectorAll("[aria-label='Controls tab']")]; const f = document.querySelector(".duration-field");
  return { ct: e.map(x => ({ tag: x.tagName, role: x.getAttribute("role"), html: x.outerHTML.slice(0, 300), box: JSON.stringify(x.getBoundingClientRect()), vis: getComputedStyle(x).visibility, op: getComputedStyle(x).opacity })), dur: f ? f.outerHTML.replace(/<!--.*?-->/g, "").slice(0, 1600) : null }; });
console.log(JSON.stringify(o, null, 1)); await b.close();
