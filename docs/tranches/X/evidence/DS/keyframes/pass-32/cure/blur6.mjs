import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const browser = await chromium.launch({ channel: "chrome", headless: true });
const painted = (page) => page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
try {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
  const page = await ctx.newPage();
  await page.goto(`http://localhost:5173/#/`, { waitUntil: "load" });
  for (let i = 0; i < 2; i++) for (const route of ["square", "spring"]) {
    await page.goto(`http://localhost:5173/#/${route}`, { waitUntil: "load" }); await page.reload({ waitUntil: "load" });
    await page.waitForTimeout(4000); await painted(page);
    await page.mouse.move(5, 890); await page.waitForTimeout(800); await painted(page);
    const st = await page.evaluate(() => [document.querySelector(".scene-host").getAttribute("style"), document.documentElement.className, document.querySelector(".scene-host").getAnimations({subtree:false}).length]);
    console.log(i, route, JSON.stringify(st));
    await page.screenshot({ path: `k-${route}-${i}-0.png` });
    await page.evaluate(() => { const h = document.querySelector(".scene-host"); h.style.removeProperty("transform"); h.style.removeProperty("opacity"); });
    await page.waitForTimeout(500); await painted(page); await page.screenshot({ path: `k-${route}-${i}-1clear.png` });
  }
} finally { await browser.close(); }
console.log("done");
