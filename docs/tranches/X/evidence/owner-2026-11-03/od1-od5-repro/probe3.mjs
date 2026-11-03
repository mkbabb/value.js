import { createRequire } from 'module';
const require = createRequire('/Users/mkbabb/Programming/value.js/package.json');
const { chromium } = require('playwright');
const browser = await chromium.launch();
try {
  const ctx = await browser.newContext({ viewport: { width: 1800, height: 1000 }, deviceScaleFactor: 2, colorScheme: 'dark' });
  try {
    const page = await ctx.newPage();
    await page.goto('http://localhost:9000/', { waitUntil: 'load' });
    await page.waitForSelector('.glass-dock'); await page.waitForTimeout(4000);
    await page.getByRole('button', { name: 'Toggle action bar' }).first().click(); await page.waitForTimeout(900);
    await page.getByRole('button', { name: 'Open color input' }).first().click(); await page.waitForTimeout(1500);
    console.log(await page.evaluate(() => {
      const run = document.querySelector('.dock-run'); const rr = run.getBoundingClientRect(); const cs = getComputedStyle(run);
      const lines = [`run ${rr.left.toFixed(1)}..${rr.right.toFixed(1)} sw=${run.scrollWidth} cw=${run.clientWidth} pad=${cs.paddingInline} gap=${cs.columnGap}`];
      const walk = (el, depth) => { if (depth > 6) return; for (const c of el.children) { const r = c.getBoundingClientRect(); const s = getComputedStyle(c); if (s.display === 'none' || r.width === 0) continue; lines.push(`${'  '.repeat(depth)}${c.tagName.toLowerCase()}.${[...c.classList].slice(0,4).join('.')} ${r.left.toFixed(1)}..${r.right.toFixed(1)} w=${r.width.toFixed(1)} ml=${s.marginLeft} mr=${s.marginRight} vis=${s.visibility} pos=${s.position}`); walk(c, depth+1); } };
      walk(run, 1); return lines.join('\n');
    }));
  } finally { await ctx.close(); }
} finally { await browser.close(); }
