import { chromium } from "playwright";
const b = await chromium.launch({ headless: false });
const p = await (await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" })).newPage();
await p.goto("http://localhost:9000/#/?space=oklch&color=" + encodeURIComponent("oklch(0.55 0.18 260)"), { waitUntil: "networkidle" });
await p.waitForTimeout(3000);
console.log(JSON.stringify(await p.evaluate(() => {
  const plate = document.querySelector(".dock-plate"); const r = plate.getBoundingClientRect();
  const out = new Map();
  for (const el of document.querySelectorAll(".glass-dock *")) { const t = [...el.childNodes].filter(n => n.nodeType === 3 && n.textContent.trim()).map(n => n.textContent.trim()).join(" "); if (!t) continue; out.set(t.slice(0, 20), getComputedStyle(el).color); }
  return [...out.entries()];
})));
await b.close();
