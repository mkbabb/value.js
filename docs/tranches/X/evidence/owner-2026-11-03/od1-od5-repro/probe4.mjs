import { createRequire } from 'module';
const require = createRequire('/Users/mkbabb/Programming/value.js/package.json');
const { chromium } = require('playwright');
const out = process.env.HOME + '/.dev-logs/x-0hh/od1-od5/';
const browser = await chromium.launch();
const read = (page, label) => page.evaluate((label) => { const p = document.querySelector('.dock-plate'); const run = document.querySelector('.dock-run'); const last = [...run.querySelectorAll('button')].filter(b=>b.offsetParent && getComputedStyle(b).visibility==='visible').pop(); const lr = last?.getBoundingClientRect(); return `${label}: plate=${getComputedStyle(p).borderRadius} run=${run.scrollWidth}/${run.clientWidth} lastSeat w=${lr?.width.toFixed(1)} scale=${last && getComputedStyle(last).scale} transform=${last && getComputedStyle(last).transform}`; }, label);
try {
  for (const base of ['http://localhost:9000', 'https://color.babb.dev']) {
    const ctx = await browser.newContext({ viewport: { width: 1800, height: 1000 }, deviceScaleFactor: 2, colorScheme: 'dark' });
    try {
      const page = await ctx.newPage();
      await page.goto(base + '/', { waitUntil: 'load', timeout: 60000 });
      await page.waitForSelector('.glass-dock'); await page.waitForTimeout(4000);
      await page.mouse.move(900, 40); await page.waitForTimeout(300);
      console.log(base, await read(page, 'main, pointer mid-dock'));
      const dd = page.locator('.glass-dock .dock-dropdown-trigger').last();
      await dd.hover(); await page.waitForTimeout(500);
      console.log(base, await read(page, 'main, hover last seat'));
      await page.getByRole('button', { name: 'Toggle action bar' }).first().click(); await page.waitForTimeout(900);
      await page.getByRole('button', { name: 'Open color input' }).first().click(); await page.waitForTimeout(1200);
      console.log(base, await read(page, 'input, pointer on toggle'));
      await page.mouse.move(800, 40); await page.waitForTimeout(600);
      console.log(base, await read(page, 'input, pointer on field'));
      const b = await page.locator('.glass-dock').first().boundingBox();
      await page.screenshot({ path: out + (base.includes('localhost')?'dev':'prod') + '-desk-input-nohover.png', clip: { x: b.x-40, y: 0, width: b.width+80, height: b.height+40 } });
      await page.getByRole('button', { name: /color input|propose|name/i }).last().hover(); await page.waitForTimeout(600);
      console.log(base, await read(page, 'input, hover toggle again'));
    } finally { await ctx.close(); }
  }
} finally { await browser.close(); }
