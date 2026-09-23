import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const b = await chromium.launch({ headless: false });
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await p.goto("http://localhost:5173/#/cube", { waitUntil: "networkidle" });
await p.waitForTimeout(2500);
await p.screenshot({ path: "probe-10-cube.png" });
const q = async () => JSON.stringify(await p.$$eval("button,[role=tab],[role=option]", (els) => els.map((e) => [e.getAttribute("role"), e.getAttribute("aria-label"), (e.textContent||"").trim().slice(0,24)]).filter(x=>x[1]||x[2]).slice(0,40)));
console.log(await q());
await b.close();
