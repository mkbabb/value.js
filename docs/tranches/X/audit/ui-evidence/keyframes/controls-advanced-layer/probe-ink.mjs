// 390 ink probe — READ-ONLY: resolve the ink tokens on the portalled drawer vs the app root.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const browser = await chromium.launch({ headless: false });
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
const page = await ctx.newPage();
await page.goto("http://localhost:5173/#/amiga", { waitUntil: "networkidle" }); await page.waitForTimeout(3500);
const top = page.locator(".glass-dock").first(); const b = await top.boundingBox(); await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2); await page.waitForTimeout(900);
await page.getByRole("button", { name: "Controls panel" }).first().click(); await page.waitForTimeout(1400);
console.log(JSON.stringify(await page.evaluate(() => {
  const d = document.querySelector(".controls-drawer-content"); const app = document.querySelector("#app");
  const g = (e) => { const c = getComputedStyle(e); return { fg: c.getPropertyValue("--foreground").trim(), muted: c.getPropertyValue("--muted-foreground").trim(), color: c.color, fs: c.fontSize, parent: e.parentElement?.tagName + "." + String(e.parentElement?.className).slice(0, 30) }; };
  const lab = d.querySelector("label"); const mut = d.querySelector(".text-muted-foreground");
  const chain = []; for (let e = mut; e && e !== document.body; e = e.parentElement) { const c = getComputedStyle(e); chain.push([e.tagName + "." + String(e.className).slice(0, 40), c.color, c.getPropertyValue("--muted-foreground").trim().slice(0, 40), c.colorScheme]); }
  return { chain, drawer: g(d), app: app && g(app), label: lab && getComputedStyle(lab).color, mutedEl: mut && [getComputedStyle(mut).color, mut.className.slice(0, 60)] };
}), null, 1));
await browser.close();
