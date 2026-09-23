// transport-dock: animation Select keyboard behaviour — READ-ONLY.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const browser = await chromium.launch({ headless: false });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
await page.goto("http://localhost:5173/#/cube", { waitUntil: "networkidle" });
await page.waitForTimeout(3000);
const st = (k) => page.evaluate((k) => { const a = document.activeElement; const lb = document.querySelector("[role=listbox]"); const d = [...document.querySelectorAll(".glass-dock")].pop(); const trig = [...d.querySelectorAll('[aria-label="Select animation"]')].find(x => !x.closest("[inert]")); return { k, active: a ? (a.getAttribute("aria-label") || a.getAttribute("role") || a.tagName) + ":" + (a.textContent || "").trim().slice(0, 16) : null, open: !!lb, hl: lb ? [...lb.querySelectorAll("[role=option]")].filter(o => o.hasAttribute("data-highlighted")).map(o => o.textContent.trim()) : null, trig: trig?.textContent.trim(), dock: d.className.includes("collapsed") ? "COLL" : "EXP" }; }, k);
const out = [];
const b = await page.locator(".glass-dock").last().boundingBox();
await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2); await page.waitForTimeout(1000);
const r = await page.evaluate(() => { const d = [...document.querySelectorAll(".glass-dock")].pop(); const t = [...d.querySelectorAll('[aria-label="Select animation"]')].find(x => !x.closest("[inert]")); const q = t.getBoundingClientRect(); return { x: q.x + q.width / 2, y: q.y + q.height / 2 }; });
await page.mouse.click(r.x, r.y); await page.waitForTimeout(700); out.push(await st("click-open"));
await page.keyboard.press("ArrowDown"); await page.waitForTimeout(300); out.push(await st("ArrowDown"));
await page.keyboard.press("ArrowDown"); await page.waitForTimeout(300); out.push(await st("ArrowDown2"));
await page.screenshot({ path: OUT + "50-cube-select-kbd-after-arrows-1440-light.png" });
await page.keyboard.press("Enter"); await page.waitForTimeout(800); out.push(await st("Enter"));
await page.keyboard.press("Escape"); await page.waitForTimeout(600); out.push(await st("Escape"));
// keyboard open: focus trigger programmatically after a key press to set keyboard modality
await page.keyboard.press("Shift"); await page.evaluate(() => { const d = [...document.querySelectorAll(".glass-dock")].pop(); [...d.querySelectorAll('[aria-label="Select animation"]')].find(x => !x.closest("[inert]")).focus(); });
await page.waitForTimeout(400); out.push(await st("focused-trigger"));
await page.keyboard.press("Enter"); await page.waitForTimeout(700); out.push(await st("Enter-open"));
await page.keyboard.press("ArrowDown"); await page.waitForTimeout(300); out.push(await st("ArrowDown"));
await page.screenshot({ path: OUT + "51-cube-select-kbd-open-1440-light.png" });
await page.keyboard.press("Enter"); await page.waitForTimeout(900); out.push(await st("Enter-pick"));
// mouse pick
await page.mouse.click(r.x, r.y); await page.waitForTimeout(700);
const o = page.getByRole("option", { name: "Hover" }).first(); const ob = await o.boundingBox(); await page.mouse.move(ob.x + 20, ob.y + ob.height / 2); await page.waitForTimeout(300); out.push(await st("mouse-hover-Hover"));
await page.screenshot({ path: OUT + "52-cube-select-mouse-hover-1440-light.png" });
await page.mouse.click(ob.x + 20, ob.y + ob.height / 2); await page.waitForTimeout(900); out.push(await st("mouse-pick-Hover"));
await page.screenshot({ path: OUT + "53-cube-after-mouse-pick-1440-light.png" });
for (const x of out) console.log(JSON.stringify(x));
writeFileSync(OUT + "probe-selectkbd.json", JSON.stringify(out, null, 1));
await browser.close();
