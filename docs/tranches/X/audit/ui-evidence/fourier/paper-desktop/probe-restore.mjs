// Scroll-restoration probe: SPA nav (router push) vs full nav, and the sessionStorage key across mount.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const OUT = new URL(".", import.meta.url).pathname;
const browser = await chromium.launch({ headless: false });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto("http://localhost:3100/paper", { waitUntil: "networkidle" });
await page.waitForTimeout(800);
await page.locator(".sidebar-link").nth(6).click(); await page.waitForTimeout(1800);
const st = () => page.evaluate(() => ({ st: Math.round(document.querySelector(".paper-scroll")?.scrollTop ?? -1), key: sessionStorage.getItem("paper-active-section"), active: [...document.querySelectorAll(".sidebar-link[aria-current]")].map((e) => e.textContent.trim().slice(0, 30)), path: location.pathname }));
console.log("before", JSON.stringify(await st()));
// SPA nav via the app's router
await page.evaluate(() => document.querySelector("#app").__vue_app__.config.globalProperties.$router.push("/gallery"));
await page.waitForTimeout(1200);
console.log("on gallery", JSON.stringify(await page.evaluate(() => ({ key: sessionStorage.getItem("paper-active-section"), path: location.pathname }))));
await page.goBack(); await page.waitForTimeout(2500);
console.log("SPA back", JSON.stringify(await st()));
await page.screenshot({ path: OUT + "d-light-8-spa-back-restore.png" });
// full reload
await page.locator(".sidebar-link").nth(6).click(); await page.waitForTimeout(1800);
console.log("before reload", JSON.stringify(await st()));
await page.reload({ waitUntil: "networkidle" }); await page.waitForTimeout(2500);
console.log("after reload", JSON.stringify(await st()));
await page.screenshot({ path: OUT + "d-light-9-reload-restore.png" });
// tab order / focus ring on a TOC row
await page.goto("http://localhost:3100/paper", { waitUntil: "networkidle" }); await page.waitForTimeout(800);
await page.locator(".paper-search input").first().focus();
for (let i = 0; i < 3; i++) await page.keyboard.press("Tab");
await page.waitForTimeout(400);
console.log("focus", await page.evaluate(() => { const a = document.activeElement; const cs = getComputedStyle(a); return `${a.className.toString().slice(0, 60)} outline=${cs.outlineStyle} ${cs.outlineWidth} ${cs.outlineColor} shadow=${cs.boxShadow.slice(0, 80)}`; }));
await page.screenshot({ path: OUT + "d-light-10-focus-row.png", clip: { x: 220, y: 70, width: 260, height: 420 } });
await browser.close();
