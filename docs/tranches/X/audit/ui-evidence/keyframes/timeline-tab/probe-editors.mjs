import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const b = await chromium.launch({ headless: false }); const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const page = await ctx.newPage();
await page.goto("http://localhost:5173/#/cube", { waitUntil: "networkidle" }); await page.waitForTimeout(3000);
const d = await page.locator(".glass-dock").first().boundingBox(); await page.mouse.move(d.x + d.width / 2, d.y + d.height / 2); await page.waitForTimeout(1000);
await page.locator('[aria-label="Controls tab"]').first().click(); await page.waitForTimeout(600); await page.getByRole("option", { name: /^Timeline/ }).click(); await page.waitForTimeout(2000);
const info = () => page.evaluate(() => [...document.querySelectorAll(".monaco-editor")].map(e => { const r = e.getBoundingClientRect(); let a = e, chain = []; for (let i = 0; i < 12 && a; i++) { const c = getComputedStyle(a); if (c.display === "none" || c.visibility === "hidden" || c.opacity === "0" || c.contentVisibility === "hidden") chain.push(a.tagName + "." + String(a.className).slice(0, 40) + ":" + c.display + "/" + c.visibility + "/" + c.opacity); a = a.parentElement; } const hit = document.elementFromPoint(r.x + r.width / 2, r.y + 10); return { box: [r.x, r.y, r.width, r.height].map(Math.round), text: e.textContent.slice(0, 40), hidden: chain, hitInside: e.contains(hit), hit: hit?.className?.toString().slice(0, 60) }; }));
console.log("timeline-tab empty", JSON.stringify(await info(), null, 1));
await b.close();
