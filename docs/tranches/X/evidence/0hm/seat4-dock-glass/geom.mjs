import { chromium } from '/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs';
import fs from 'node:fs';
const [url, out] = process.argv.slice(2);
const browser = await chromium.launch({ args: ['--use-angle=metal', '--enable-gpu', '--ignore-gpu-blocklist', '--enable-gpu-rasterization'] });
const res = {};
try {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: 'dark' });
  try {
    const page = await ctx.newPage();
    await page.goto(url, { waitUntil: 'load', timeout: 90000 });
    await page.waitForSelector('.glass-dock'); await page.waitForTimeout(3500);
    await page.evaluate(() => { window.__g = { start() { const S = (this.S = { rows: [], stop: false }); const t0 = performance.now(); let last = t0;
      const f = (ts) => { if (S.stop) return; const d = document.querySelector('.glass-dock'); const p = d.querySelector('.dock-plate'); const pr = p.getBoundingClientRect(); const cs = getComputedStyle(d); const ps = getComputedStyle(p);
        S.rows.push({ t: +(ts - t0).toFixed(1), dt: +(ts - last).toFixed(1), c: d.classList.contains('collapsed') ? 'C' : 'E', mt: cs.getPropertyValue('--dock-morph-t').trim().slice(0, 5), sc: cs.scale, pw: +pr.width.toFixed(1), ph: +pr.height.toFixed(1), r: ps.borderTopLeftRadius + '/' + ps.borderTopRightRadius }); last = ts; requestAnimationFrame(f); };
      requestAnimationFrame(f); }, stop() { this.S.stop = true; return this.S.rows; } }; });
    const b = await page.locator('.glass-dock').first().boundingBox();
    await page.evaluate(() => window.__g.start());
    const t0 = Date.now();
    await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2, { steps: 2 });
    await page.waitForTimeout(1200);
    res.expand = await page.evaluate(() => window.__g.stop());
    const b2 = await page.locator('.glass-dock').first().boundingBox(); res.expandedBox = b2;
    await page.screenshot({ path: out + '-expanded.png', clip: { x: b2.x - 20, y: Math.max(0, b2.y - 20), width: b2.width + 40, height: b2.height + 40 } });
    await page.evaluate(() => window.__g.start());
    await page.mouse.move(5, 450);
    await page.waitForTimeout(6000);
    res.collapse = (await page.evaluate(() => window.__g.stop())).filter((r, i, a) => i === 0 || r.c !== a[i - 1].c || r.mt !== a[i - 1].mt || r.r !== a[i - 1].r);
  } finally { await ctx.close(); }
} finally { await browser.close(); }
fs.writeFileSync(out + '.json', JSON.stringify(res));
