import { chromium } from '@playwright/test';
const OUT = '/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1600, height: 1100 } });
await p.goto('http://localhost:9000/', { waitUntil: 'networkidle', timeout: 60000 });
await p.waitForTimeout(2000);
await p.locator('.space-trigger--inline').click();
await p.waitForTimeout(500);
const item = p.locator('[role=option]').filter({ hasText: /^Display P3/ }).first();
await item.scrollIntoViewIfNeeded(); await item.click();
await p.waitForTimeout(1200);
await p.evaluate(() => { const c=document.querySelector('.about-card'); c.scrollTop = c.scrollHeight; });
await p.waitForTimeout(700);
const m = await p.evaluate(() => {
  const c = document.querySelector('.about-card');
  const h2s = [...c.querySelectorAll('h2')].map(h=>h.textContent.trim());
  const last = c.querySelector('.card-content:last-of-type, [class*=CardContent]');
  return { h2s, scrollH: c.scrollHeight, clientH: c.clientHeight, tailText: c.innerText.slice(-200) };
});
console.log(JSON.stringify(m, null, 1));
await p.screenshot({ path: OUT + '/about-p3-bottom.png' });
// Also: measure the css-var split between markdown ink source and nutrition ink source
const alphaSplit = await p.evaluate(() => {
  const root = getComputedStyle(document.documentElement);
  return { accentLive: root.getPropertyValue('--accent-live').trim() };
});
console.log('ALPHA', JSON.stringify(alphaSplit));
await b.close();
