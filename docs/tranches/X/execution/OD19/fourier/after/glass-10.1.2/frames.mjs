import { chromium } from "/Users/mkbabb/Programming/fourier-analysis/web/node_modules/@playwright/test/index.mjs";
const [origin, width] = [process.argv[2], +process.argv[3]];
const browser = await chromium.launch({ headless: true });
try {
  const ctx = await browser.newContext({ viewport: { width, height: 844 } });
  const page = await ctx.newPage();
  await page.goto(`${origin}/v/hazy-etching-cream-elk`);
  await page.waitForTimeout(3000);
  const t = page.getByRole("tab", { name: "Canvas" }).filter({ visible: true }).first();
  if (await t.count()) { await t.click(); await page.waitForTimeout(800); }
  await page.mouse.move(2, 400); await page.waitForTimeout(1500);
  const b = await page.getByRole("button", { name: "Edit contour" }).first().boundingBox();
  const p = page.evaluate(() => new Promise((res) => { const out = []; const t0 = performance.now(); const btn = document.querySelector('button[aria-label="Edit contour"]'); const d = btn.closest(".glass-dock");
    const tick = () => { const r = d.getBoundingClientRect(); const cs = getComputedStyle(d); out.push([Math.round(performance.now() - t0), Math.round(r.x), Math.round(r.width), Math.round(btn.getBoundingClientRect().x), d.hasAttribute("data-morphing") ? "M" : "-", d.classList.contains("expanded") ? "E" : "c", cs.getPropertyValue("--dock-expanded-px").trim(), cs.inlineSize, d.parentElement.getBoundingClientRect().width|0]); if (performance.now() - t0 < 700) requestAnimationFrame(tick); else res(out); }; requestAnimationFrame(tick); }));
  await page.waitForTimeout(30);
  await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2);
  const fr = await p;
  console.log("t x w btnX morph post expandedPx inlineSize parentW");
  for (const f of fr.slice(0, 14)) console.log(f.join(" "));
  console.log("...", fr[fr.length - 1].join(" "));
} finally { await browser.close(); }
