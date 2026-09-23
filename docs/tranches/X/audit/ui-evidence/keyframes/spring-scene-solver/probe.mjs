import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const OUT = new URL(".", import.meta.url).pathname;
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
const page = await ctx.newPage(); const errs = [];
page.on("pageerror", e => errs.push(String(e).slice(0,200)));
page.on("console", m => { if (m.type()==="error") errs.push(m.text().slice(0,160)); });
await page.goto("http://localhost:5173/#/spring", { waitUntil: "networkidle" });
await page.waitForTimeout(3500);
await page.screenshot({ path: OUT + "probe-1440-light.png" });
const info = await page.evaluate(() => {
  const r = e => { if (!e) return null; const b = e.getBoundingClientRect(); return [b.x,b.y,b.width,b.height].map(Math.round); };
  const btns = [...document.querySelectorAll("button,[role=combobox],[role=slider],[role=tab],[role=radio]")].filter(e => e.getBoundingClientRect().width>0).map(e => (e.getAttribute("role")||e.tagName)+" "+(e.getAttribute("aria-label")||e.textContent.trim()).slice(0,40)+" "+r(e).join(","));
  return { dark: document.documentElement.classList.contains("dark"), btns, target: r(document.querySelector(".spring-target")), facet: r(document.querySelector(".preset-grid")), kfe: r(document.querySelector(".keyframes-section")), ls: Object.keys(localStorage) };
});
console.log(JSON.stringify(info, null, 1)); console.log(errs);
await b.close();
