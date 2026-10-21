// repair-2 (C2-KF-01): what the swap INTO the cube shows mid-dissolve (VT `ready` + 120 ms) and settled, BEFORE vs AFTER,
// so the cube's own snapshot group is seen to keep its 3D (perspective root named, children's context intact).
// usage: node vt-frames.mjs <outdir> <label>=<dist> ...
import { serveDist, withBrowser } from "/Users/mkbabb/Programming/keyframes.js/scripts/lib/demo-driver.mjs";
const [outDir, ...pairs] = process.argv.slice(2);
const out = [];
await withBrowser(async (browser) => {
  for (const pair of pairs) {
    const [label, dist] = pair.split("=");
    const server = await serveDist(dist);
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "dark" });
    try {
      if (process.env.VT_CSS) await ctx.addInitScript((css) => addEventListener("DOMContentLoaded", () => { const s = document.createElement("style"); s.textContent = css; document.head.append(s); }), process.env.VT_CSS);
      await ctx.addInitScript(() => { const o = Document.prototype.startViewTransition; Document.prototype.startViewTransition = function (a) { const vt = o.call(this, a); window.__ready = vt.ready.then(() => true, () => false); return vt; }; });
      const page = await ctx.newPage(); page.setDefaultTimeout(15000);
      await page.goto(server.url + "/#/spring", { waitUntil: "load" }); await page.waitForTimeout(4000);
      const b = await page.locator(".glass-dock").first().boundingBox();
      await page.mouse.move(b.x + b.width / 2, b.y + 28); await page.waitForTimeout(900);
      await page.locator('[aria-label="Scene"]:visible').first().click(); await page.waitForTimeout(600);
      await page.getByRole("option", { name: "Cube" }).click();
      await page.waitForFunction(() => window.__ready); await page.evaluate(() => window.__ready);
      await page.waitForTimeout(120);
      const names = await page.evaluate(() => [...document.querySelectorAll("*")].map((e) => getComputedStyle(e).viewTransitionName).filter((n) => n && n !== "none"));
      await page.screenshot({ path: `${outDir}/swap-cube-mid-${label}.png` });
      await page.waitForTimeout(2000);
      await page.screenshot({ path: `${outDir}/swap-cube-settled-${label}.png` });
      const settledNames = await page.evaluate(() => [...document.querySelectorAll("*")].map((e) => getComputedStyle(e).viewTransitionName).filter((n) => n && n !== "none"));
      out.push({ label, midNames: names, settledNames });
    } finally { await ctx.close(); await server.close(); }
  }
}, { label: "vt-frames" });
console.log(JSON.stringify(out));
