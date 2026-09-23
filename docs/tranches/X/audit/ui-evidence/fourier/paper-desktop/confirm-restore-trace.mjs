// CONFIRM seat: trace sessionStorage writes on reload to locate who wipes the key.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const browser = await chromium.launch({ headless: false });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
await ctx.addInitScript(() => {
  window.__ss = [];
  const S = Storage.prototype, g = S.getItem, r = S.removeItem, s = S.setItem;
  S.getItem = function (k) { const v = g.call(this, k); if (k === "paper-active-section") window.__ss.push(["get", v, performance.now() | 0, new Error().stack.split("\n").slice(2, 4).join(" | ")]); return v; };
  S.removeItem = function (k) { if (k === "paper-active-section") window.__ss.push(["remove", null, performance.now() | 0, new Error().stack.split("\n").slice(2, 4).join(" | ")]); return r.call(this, k); };
  S.setItem = function (k, v) { if (k === "paper-active-section") window.__ss.push(["set", v, performance.now() | 0]); return s.call(this, k, v); };
});
const page = await ctx.newPage();
await page.goto("http://localhost:3100/paper", { waitUntil: "networkidle" });
await page.waitForTimeout(800);
await page.locator(".sidebar-link").nth(6).click(); await page.waitForTimeout(1800);
console.log("before", await page.evaluate(() => [document.querySelector(".paper-scroll")?.scrollTop | 0, sessionStorage.getItem("paper-active-section")]));
await page.reload({ waitUntil: "networkidle" }); await page.waitForTimeout(2500);
console.log("after", await page.evaluate(() => [document.querySelector(".paper-scroll")?.scrollTop | 0]));
console.log(JSON.stringify(await page.evaluate(() => window.__ss), null, 1));
await browser.close();
