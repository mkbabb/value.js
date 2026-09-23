import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const OUT = new URL("./", import.meta.url).pathname;
const b = await chromium.launch({ headless: false });
const res = {};
for (const scheme of ["light", "dark"]) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: scheme });
  const page = await ctx.newPage();
  await page.goto("http://localhost:5173/#/", { waitUntil: "networkidle" }); await page.waitForTimeout(3000);
  await page.mouse.move(5, 5); await page.waitForTimeout(600);
  res[scheme + "-chips"] = await page.evaluate(() => {
    const out = [];
    for (const lab of ["Select animation", "Reset animation", "Play animation"]) {
      const el = [...document.querySelectorAll(`[aria-label="${lab}"]`)].find(e => e.getBoundingClientRect().width > 0);
      if (!el) { out.push(lab + " none"); continue; }
      const cs = getComputedStyle(el), bs = getComputedStyle(el, "::before"), as = getComputedStyle(el, "::after");
      const r = el.getBoundingClientRect();
      out.push({ lab, cls: el.className.slice(0, 160), w: r.width, h: r.height, radius: cs.borderRadius, bg: cs.backgroundColor, bgImg: cs.backgroundImage.slice(0, 80), shadow: cs.boxShadow.slice(0, 120), before: { bg: bs.backgroundColor, img: bs.backgroundImage.slice(0, 80), op: bs.opacity, content: bs.content }, after: { bg: as.backgroundColor, op: as.opacity, content: as.content } });
    }
    return out;
  });
  await page.screenshot({ path: OUT + `c-rest-${scheme}.png`, clip: { x: 560, y: 740, width: 320, height: 110 } });
  // pick Matrix at home
  if (scheme === "light") {
    await page.getByLabel("Select animation").first().click(); await page.waitForTimeout(600);
    await page.getByRole("option", { name: "Matrix" }).click(); await page.waitForTimeout(3500);
    res.pick = await page.evaluate(() => ({ url: location.hash, trig: document.querySelector('[aria-label="Select animation"]')?.textContent?.trim() }));
    await page.screenshot({ path: OUT + `c-pick-matrix-light.png` });
    // steady collapsed transport: park pointer, wait
    await page.mouse.move(1400, 100); await page.waitForTimeout(5000);
    await page.screenshot({ path: OUT + `c-cube-steady-5s-light.png` });
    // drag at home: fresh
    await page.goto("about:blank"); await page.goto("http://localhost:5173/#/", { waitUntil: "networkidle" }); await page.waitForTimeout(3000);
    await page.mouse.move(720, 450); await page.mouse.down();
    for (let i = 1; i <= 20; i++) { await page.mouse.move(720 + i * 10, 450 + i * 3); await page.waitForTimeout(16); }
    await page.mouse.up(); await page.waitForTimeout(3500);
    res.drag = await page.evaluate(() => ({ url: location.hash, hero: !!document.querySelector(".hero-band") }));
    await page.screenshot({ path: OUT + `c-home-drag-3500-light.png` });
  }
  await ctx.close();
}
await b.close();
console.log(JSON.stringify(res, null, 1));
