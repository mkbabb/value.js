// cube-scene exploratory probe — READ-ONLY; headed Chromium.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const OUT = new URL(".", import.meta.url).pathname;
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, colorScheme: "light" });
const page = await ctx.newPage(); const errs = [];
page.on("pageerror", e => errs.push(String(e).slice(0, 200)));
page.on("console", m => { if (m.type() === "error" || m.type()==="warning") errs.push(m.type()+": "+m.text().slice(0, 200)); });
await page.goto("http://localhost:5173/#/cube", { waitUntil: "networkidle" });
await page.waitForTimeout(4000);
await page.screenshot({ path: OUT + "probe-load.png" });
const dump = await page.evaluate(() => [...document.querySelectorAll("button,[role=combobox],[role=tab],[role=switch],[role=slider],input,[role=tabpanel],[role=listbox],[role=option]")].filter(e => { const r = e.getBoundingClientRect(); return r.width > 0; }).map(e => { const r = e.getBoundingClientRect(); const c = getComputedStyle(e); return `${e.tagName} role=${e.getAttribute("role")} aria=${e.getAttribute("aria-label")} txt=${(e.textContent||"").trim().slice(0,30)} slot=${e.getAttribute("data-slot")} ${Math.round(r.x)},${Math.round(r.y)} ${Math.round(r.width)}x${Math.round(r.height)} rad=${c.borderTopLeftRadius} state=${e.getAttribute("data-state")}`; }));
console.log(dump.join("\n")); console.log("ERR", errs);
await b.close();
