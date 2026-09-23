// hit-test probe: what element receives a pointer at each matrix cell's centre — READ-ONLY
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const browser = await chromium.launch({ headless: false });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
await page.goto("http://localhost:5173/#/cube", { waitUntil: "networkidle" }); await page.waitForTimeout(3500);
await page.mouse.move(720, 860); await page.waitForTimeout(1200);
await page.getByLabel("Select animation").first().click(); await page.waitForTimeout(700);
await page.getByRole("option", { name: "Matrix" }).first().click(); await page.waitForTimeout(1300);
const b = await page.locator(".glass-dock").first().boundingBox(); await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2); await page.waitForTimeout(1000);
await page.locator('[aria-label="Controls tab"]').first().click(); await page.waitForTimeout(800);
await page.getByRole("option", { name: "Matrix Controls" }).first().click(); await page.waitForTimeout(1400);
console.log(await page.evaluate(() => [...document.querySelectorAll(".matrix-grid")].map(g => { const r = g.getBoundingClientRect(); let a = g, chain = []; while (a && chain.length < 40) { const c = getComputedStyle(a); if (c.display === "none" || c.visibility === "hidden" || c.contentVisibility === "hidden") chain.push(a.tagName + "." + a.className.toString().slice(0, 50) + " d=" + c.display + " v=" + c.visibility + " cv=" + c.contentVisibility); a = a.parentElement; } return { rect: [r.x, r.y, r.width, r.height].map(Math.round), hiddenBy: chain }; })));
const out = await page.evaluate(() => [0, 5, 12, 15].map(i => { const inp = document.querySelectorAll(".matrix-grid input")[i]; const r = inp.getBoundingClientRect(); const c = getComputedStyle(inp);
  const hit = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2);
  return { i, rect: [r.x, r.y, r.width, r.height].map(Math.round), radius: c.borderTopLeftRadius, blockSize: c.blockSize, pe: c.pointerEvents, z: c.zIndex, pos: c.position, hit: hit?.tagName + "." + (hit?.className?.toString().slice(0, 80)), hitParent: hit?.parentElement?.className?.toString().slice(0, 60) }; }));
console.log(JSON.stringify(out, null, 1));
try { await page.locator(".matrix-grid input").nth(12).click({ timeout: 4000 }); console.log("click ok"); } catch (e) { console.log(String(e).split("\n").slice(-6).join("\n")); }
await browser.close();
