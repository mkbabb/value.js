import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const b = await chromium.launch({ headless: false });
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await p.goto("http://localhost:5173/#/amiga", { waitUntil: "networkidle" }); await p.waitForTimeout(2500);
console.log(JSON.stringify(await p.evaluate(() => {
  const vis = (e) => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0 && getComputedStyle(e).visibility !== "hidden"; };
  const rows = [...document.querySelectorAll("label, span, div")].filter(e => e.childElementCount === 0 && /^duration$/.test(e.textContent.trim()));
  return rows.map(l => { const card = l.closest("[class*=card], .card, section, form") || l.parentElement.parentElement; const inp = card.querySelector("input"); return { vis: vis(l), val: inp && inp.value, rect: l.getBoundingClientRect().toJSON().y }; });
}), null, 0));
// also the channel select label
console.log(await p.evaluate(() => [...document.querySelectorAll("button")].filter(b => /Select animation/.test(b.getAttribute("aria-label") || "") || /Spin|Bounce/.test(b.textContent)).map(b => b.textContent.trim() + "|" + b.getAttribute("aria-label")).join(" ; ")));
await b.close();
