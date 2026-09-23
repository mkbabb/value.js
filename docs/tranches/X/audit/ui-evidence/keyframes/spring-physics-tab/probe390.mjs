// 390 drawer-expand probe — READ-ONLY on the app.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const OUT = new URL(".", import.meta.url).pathname;
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, colorScheme: "light" });
const page = await ctx.newPage();
await page.goto("http://localhost:5173/#/spring", { waitUntil: "networkidle" }); await page.waitForTimeout(3500);
const st = () => page.evaluate(() => { const d = document.querySelector(".glass-drawer"); const r = d?.getBoundingClientRect(); return { drawer: r && [r.y, r.height].map(Math.round), snap: d?.getAttribute("data-snap") ?? d?.style.getPropertyValue("--glass-drawer-t"), attrs: d && [...d.attributes].map(a => a.name + "=" + a.value.slice(0, 40)).join(" | ") }; });
console.log("peek", JSON.stringify(await st()));
await page.mouse.move(195, 52); await page.waitForTimeout(900);
const cp = page.getByRole("button", { name: "Controls panel" }).first();
console.log("cp visible", await cp.isVisible());
await cp.click().catch(e => console.log("cpErr", String(e).slice(0, 150))); await page.waitForTimeout(1500);
console.log("after cp", JSON.stringify(await st()));
await page.screenshot({ path: OUT + "probe390-after-cp.png" });
const h = page.locator(".glass-drawer-handle").first(); const hb = await h.boundingBox(); console.log("handle", hb);
await b.close();
