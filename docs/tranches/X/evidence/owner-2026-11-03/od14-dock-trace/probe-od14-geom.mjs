// OD-14 visual-continuity witness: per-rAF painted geometry (getBoundingClientRect includes transforms).
// Forces layout each frame, so it is a separate run from the timing trace. GPU path (ANGLE-Metal) headless shell.
import { chromium } from '/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs';
import fs from 'node:fs';
const [url, out] = process.argv.slice(2);
const browser = await chromium.launch({ args: ['--use-angle=metal', '--enable-gpu', '--ignore-gpu-blocklist', '--enable-gpu-rasterization'] });
const res = {};
try {
  for (const cell of [{ name: 'desktop', vp: { width: 1800, height: 1000 }, dpr: 2, m: false }, { name: 'mobile', vp: { width: 390, height: 844 }, dpr: 3, m: true }]) {
    const ctx = await browser.newContext({ viewport: cell.vp, deviceScaleFactor: cell.dpr, colorScheme: 'dark', isMobile: cell.m, hasTouch: cell.m });
    const R = (res[cell.name] = {});
    try {
      const page = await ctx.newPage();
      await page.goto(url, { waitUntil: 'load', timeout: 90000 });
      await page.waitForSelector('.glass-dock', { timeout: 60000 });
      await page.waitForTimeout(4000);
      await page.evaluate(() => {
        window.__g = {
          start() { const S = (this.S = { rows: [], stop: false }); const t0 = performance.now();
            const f = (ts) => { if (S.stop) return; const d = document.querySelector('.glass-dock'); const p = d.querySelector('.dock-plate');
              const pr = p.getBoundingClientRect(); const cs = getComputedStyle(d); const ps = getComputedStyle(p);
              const faces = [...d.querySelectorAll('.dock-face')].map((x) => `${x.classList.contains('is-active') ? 'A' : x.classList.contains('is-leaving') ? 'L' : '-'}${(+getComputedStyle(x).opacity).toFixed(2)}`).join(' ');
              S.rows.push({ t: +(ts - t0).toFixed(1), morph: d.hasAttribute('data-morphing') ? 1 : 0, mt: cs.getPropertyValue('--dock-morph-t').trim().slice(0, 6), scale: cs.scale, boxW: +d.offsetWidth, plateX: +pr.x.toFixed(1), plateW: +pr.width.toFixed(1), plateH: +pr.height.toFixed(1), radius: ps.borderTopLeftRadius + '/' + ps.borderTopRightRadius, padIn: cs.paddingInlineStart, clip: ps.clipPath.slice(0, 40), faces });
              requestAnimationFrame(f); };
            requestAnimationFrame(f); },
          stop() { this.S.stop = true; return this.S.rows; },
        };
      });
      const cls = () => page.evaluate(() => document.querySelector('.glass-dock').className);
      const step = async (label, act, ms = 1100) => { try { await page.evaluate(() => window.__g.start()); await act(); await page.waitForTimeout(ms); R[label] = await page.evaluate(() => window.__g.stop()); } catch (e) { R[label] = String(e).slice(0, 200); try { await page.evaluate(() => window.__g.stop()); } catch {} } };
      const G = (n) => page.locator('.glass-dock').getByRole('button', { name: n, exact: true }).first();
      if (!cell.m) {
        const b = await page.locator('.glass-dock').first().boundingBox();
        await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2); await page.waitForTimeout(900);
        await step('collapse', async () => { await page.mouse.move(cell.vp.width - 5, cell.vp.height / 2); for (let i = 0; i < 160 && !(await cls()).includes('collapsed'); i++) await page.waitForTimeout(30); });
        const b1 = await page.locator('.glass-dock').first().boundingBox();
        await step('expand', async () => { await page.mouse.move(b1.x + b1.width / 2, b1.y + b1.height / 2, { steps: 2 }); });
        await page.waitForTimeout(400);
      }
      await step('face-to-actionbar', () => G('Toggle action bar').click());
      await step('actionbar-to-input', () => G('Open color input').click());
      await step('input-to-actionbar', () => G('Close input').click());
      await step('actionbar-to-face', () => G('Back').click());
    } finally { await ctx.close(); }
  }
} finally { await browser.close(); }
fs.writeFileSync(out, JSON.stringify(res));
console.log('wrote', out);
