// transport-dock: collapse cadence + keyboard entry focus trace — READ-ONLY.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const browser = await chromium.launch({ headless: false });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
await page.goto("http://localhost:5173/#/cube", { waitUntil: "networkidle" });
const st = () => page.evaluate(() => { const d = [...document.querySelectorAll(".glass-dock")].pop(); const a = document.activeElement; return { t: Math.round(performance.now()), cls: d.className.replace(/glass-dock horizontal shape-pill layout-linear /, ""), w: Math.round(d.getBoundingClientRect().width), active: a ? (a.getAttribute("aria-label") || a.tagName) + (a.matches(":focus-visible") ? "[fv]" : "") + (d.contains(a) ? "@bottom" : "") + (a.closest("[inert]") ? "[INERT]" : "") : null }; });
const trace = [];
await page.mouse.move(10, 300);
for (let i = 0; i < 8; i++) { trace.push({ k: "idle", ...(await st()) }); await page.waitForTimeout(1000); }
// hover then leave
const b = await page.locator(".glass-dock").last().boundingBox();
await page.mouse.move(b.x + 20, b.y + b.height / 2); await page.waitForTimeout(800); trace.push({ k: "hovered", ...(await st()) });
await page.mouse.move(10, 300);
for (let i = 0; i < 6; i++) { await page.waitForTimeout(1000); trace.push({ k: "left+" + (i + 1) + "s", ...(await st()) }); }
await page.screenshot({ path: OUT + "40-cube-collapsed-after-leave-1440-light.png" });
// keyboard walk
await page.mouse.click(5, 5);
for (let i = 0; i < 40; i++) { await page.keyboard.press("Tab"); const s = await st(); trace.push({ k: "tab" + i, ...s }); if (s.active && s.active.includes("@bottom")) { for (let j = 0; j < 6; j++) { await page.waitForTimeout(200); trace.push({ k: `tab${i}+${(j + 1) * 200}ms`, ...(await st()) }); } await page.screenshot({ path: OUT + "41-cube-kbd-entry-1440-light.png" }); await page.keyboard.press("Tab"); trace.push({ k: "tab-next", ...(await st()) }); await page.waitForTimeout(400); trace.push({ k: "tab-next+400", ...(await st()) }); await page.screenshot({ path: OUT + "42-cube-kbd-next-1440-light.png" }); break; } }
writeFileSync(OUT + "probe-focus.json", JSON.stringify(trace, null, 1));
for (const t of trace) console.log(t.k, t.t, t.cls, t.w, t.active);
await browser.close();
