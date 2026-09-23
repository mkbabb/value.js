// probe: the cascade rules that set box-shadow/outline on the focused Back button. READ-ONLY.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
const p = await ctx.newPage(); await p.goto("http://localhost:5173/#/cube", { waitUntil: "networkidle" }); await p.waitForTimeout(3500);
await p.getByRole("button", { name: "Edit easing curve" }).first().click(); await p.waitForTimeout(1200);
await p.keyboard.press("Shift+Tab"); await p.keyboard.press("Tab"); await p.waitForTimeout(600);
const out = await p.evaluate(() => { const e = document.activeElement; const hits = [];
  const walk = (rules, layer) => { for (const r of rules) { if (r.cssRules && !r.selectorText) walk(r.cssRules, (layer || "") + (r.name ? "/" + r.name : r.conditionText ? "@" + r.conditionText.slice(0, 30) : "")); else if (r.selectorText) { try { if (e.matches(r.selectorText) && /box-shadow|outline/.test(r.style.cssText)) hits.push({ layer, sel: r.selectorText.slice(0, 140), css: r.style.cssText.slice(0, 200) }); } catch {} } } };
  for (const s of document.styleSheets) { try { walk(s.cssRules, ""); } catch {} } return hits; });
console.log(JSON.stringify(out, null, 1)); await b.close();
