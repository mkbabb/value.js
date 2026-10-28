// P1 morph-scalar trace of the transport expand. Headless; one browser; context per cell; closed in finally.
import { chromium } from "/Users/mkbabb/Programming/fourier-analysis/web/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const BASE = process.env.BASE ?? "http://localhost:3100";
const W = Number(process.argv[2] ?? 1440);
const browser = await chromium.launch({ headless: true });
try {
  const H = W === 390 ? 844 : 900;
  const ctx = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 2 });
  try {
    const page = await ctx.newPage();
    await page.goto(BASE + "/v/hazy-etching-cream-elk", { waitUntil: "load" });
    if (W === 390) { await page.waitForTimeout(2500); await page.getByText("Canvas", { exact: true }).first().click(); }
    await page.waitForSelector(".animation-dock", { timeout: 15000 }); await page.mouse.move(2, H / 2); await page.waitForTimeout(3000);
    let b = await page.locator(".animation-dock").boundingBox();
    if (process.env.WARM) { // one full expand + collapse first: the first flip is glass G-F2a
      await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2); await page.waitForTimeout(1500);
      await page.mouse.move(2, H / 2); await page.waitForTimeout(4500);
      b = await page.locator(".animation-dock").boundingBox();
    }
    const p = page.evaluate(() => new Promise((res) => {
      const rows = []; const t0 = performance.now();
      const f = () => {
        const d = document.querySelector(".animation-dock"); const cs = getComputedStyle(d); const r = d.getBoundingClientRect();
        const pl = d.querySelector(".dock-persistent").getBoundingClientRect();
        const g = (k) => cs.getPropertyValue(k).trim();
        rows.push({ t: Math.round(performance.now() - t0), cls: d.className.replace("animation-dock glass-dock horizontal shape-pill ", ""), m: d.hasAttribute("data-morphing"), x: Math.round(r.x), w: Math.round(r.width), play: Math.round(pl.x), is: cs.inlineSize, tf: cs.transform.slice(0, 30), sc: cs.scale, ss: g("--dock-size-scale"), exp: g("--dock-expanded-px"), col: g("--dock-collapsed-px"), mt: g("--dock-morph-t"), et: g("--dock-expand-t") });
        if (performance.now() - t0 < 1200) requestAnimationFrame(f); else res(rows);
      };
      requestAnimationFrame(f);
    }));
    await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2);
    const rows = await p;
    writeFileSync(`${OUT}trace-${W}${process.env.TAG ?? ""}.json`, JSON.stringify(rows, null, 0));
    for (const r of rows.slice(0, 40)) console.log(JSON.stringify(r));
  } finally { await ctx.close(); }
} finally { await browser.close(); }
