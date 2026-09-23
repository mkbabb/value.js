import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const OUT = new URL(".", import.meta.url).pathname;
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, colorScheme: "dark" });
await ctx.addInitScript(() => { try { localStorage.setItem("vueuse-color-scheme", "dark"); } catch {} });
const page = await ctx.newPage(); const errs = [];
page.on("console", m => { if (m.type()==="error") errs.push(m.text().slice(0,160)); });
page.on("response", r => { if (r.status() >= 400) errs.push(r.status() + " " + r.url().slice(-80)); });
await page.goto("http://localhost:5173/#/spring", { waitUntil: "networkidle" });
await page.waitForTimeout(3500);
await page.screenshot({ path: OUT + "probe-390-dark.png" });
const info = await page.evaluate(() => {
  const r = e => { if (!e) return null; const b = e.getBoundingClientRect(); return [b.x,b.y,b.width,b.height].map(Math.round); };
  const sc = [...document.querySelectorAll("*")].filter(e => { const s = getComputedStyle(e); return /(auto|scroll)/.test(s.overflowY) && e.scrollHeight > e.clientHeight + 4; }).map(e => e.tagName + "." + [...e.classList].slice(0,4).join(".") + " " + r(e) + " sh=" + e.scrollHeight);
  const btns = [...document.querySelectorAll("button,[role=combobox],[role=slider]")].filter(e => { const b = e.getBoundingClientRect(); return b.width>0 && b.y < innerHeight && b.y > -50; }).map(e => (e.getAttribute("aria-label")||e.textContent.trim()).slice(0,30)+" "+r(e).join(","));
  return { dark: document.documentElement.classList.contains("dark"), sc, btns, hs: document.documentElement.scrollWidth > innerWidth, target: r(document.querySelector(".spring-target")) };
});
console.log(JSON.stringify(info, null, 1)); console.log(errs);
await b.close();
