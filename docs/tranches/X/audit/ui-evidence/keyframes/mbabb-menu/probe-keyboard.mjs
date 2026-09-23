// keyboard reach probe — READ-ONLY. Enter/Space on Share + Dark mode rows; Tab from inside the menu.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const browser = await chromium.launch({ headless: false });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: "light" });
await ctx.addInitScript(() => { try { localStorage.setItem("vueuse-color-scheme", "light"); } catch {} });
const page = await ctx.newPage();
await page.goto("http://localhost:5173/#/cube", { waitUntil: "networkidle" }); await page.waitForTimeout(3000);
const st = () => page.evaluate(() => ({ theme: document.documentElement.className, menu: !!document.querySelector("[role=menu]"), popover: [...document.querySelectorAll("[role=dialog]")].map(d => d.textContent.trim().slice(0, 40)), focus: (document.activeElement?.getAttribute("aria-label") || document.activeElement?.getAttribute("role") || document.activeElement?.tagName) + ":" + (document.activeElement?.textContent || "").trim().slice(0, 20) }));
const res = {};
const b = await page.locator(".glass-dock").first().boundingBox(); await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2); await page.waitForTimeout(1000);
const trig = page.getByRole("button", { name: "@mbabb menu" }).first();
await trig.focus(); await page.keyboard.press("Enter"); await page.waitForTimeout(700); res.openedByEnter = await st();
// first item focused? move to Dark mode
await page.keyboard.press("ArrowDown"); await page.waitForTimeout(200); res.afterDown1 = await st();
await page.getByRole("menuitem", { name: /Dark mode/ }).focus(); await page.keyboard.press("Enter"); await page.waitForTimeout(600); res.darkEnter = await st();
await page.keyboard.press(" "); await page.waitForTimeout(600); res.darkSpace = await st();
await page.getByRole("menuitem", { name: /Share/ }).focus(); await page.keyboard.press("Enter"); await page.waitForTimeout(700); res.shareEnter = await st();
await page.screenshot({ path: OUT + "13-kbd-share-enter-1440-light.png" });
await page.keyboard.press("Tab"); await page.waitForTimeout(500); res.tabInMenu = await st();
await page.screenshot({ path: OUT + "13-kbd-tab-in-menu-1440-light.png" });
writeFileSync(OUT + "probe-keyboard.json", JSON.stringify(res, null, 2)); console.log(JSON.stringify(res, null, 1));
await browser.close();
