// SERVED MODEL: claude-opus-5-5
// KF.W13U.t — cube scrub fidelity sweep: N fresh pages; per page: boot 2 s, Pause, drag 15%→80% of the rail root
// sampling (pointer fraction, aria-valuenow, aria-valuemax, cube rotateX) per step. Flags a step whose playhead strays >10% from the pointer.
import { chromium } from '/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs';
const base = process.argv[2] || 'http://localhost:5173/'; const N = +(process.argv[3] || 6);
const b = await chromium.launch({ headless: false, args: ['--ignore-gpu-blocklist'] });
const S = '[role=slider][aria-label="Scrub animation timeline"]';
const res = [];
for (let n = 0; n < N; n++) {
  const p = await b.newPage({ viewport: { width: 1440, height: 900 }, colorScheme: 'dark' });
  await p.goto(base + '#/cube', { waitUntil: 'networkidle' }); await p.waitForTimeout(2000);
  await p.getByRole('button', { name: /^pause/i }).first().click(); await p.waitForTimeout(500);
  const tr = await p.locator('.glass-slider').filter({ has: p.locator(S) }).first().locator('.slider-track').boundingBox();
  const y = tr.y + tr.height / 2; const rows = [];
  const rd = () => p.evaluate((S) => { const t = document.querySelector(S); const c = document.querySelector('.cube'); return [Math.round(+t.getAttribute('aria-valuenow')), +t.getAttribute('aria-valuemax'), (c.style.transform.match(/rotateX\(([\d.]+)/) || [])[1]]; }, S);
  await p.mouse.move(tr.x + tr.width * 0.15, y); await p.mouse.down(); await p.waitForTimeout(120); rows.push([0.15, ...(await rd())]);
  for (const f of [0.3, 0.45, 0.6, 0.8]) { await p.mouse.move(tr.x + tr.width * f, y, { steps: 6 }); await p.waitForTimeout(200); rows.push([f, ...(await rd())]); }
  await p.mouse.up(); await p.waitForTimeout(400); const up = await rd();
  const stray = rows.filter(([f, v, m]) => Math.abs(v / m - f) > 0.1).length;
  res.push({ n, stray, rows: rows.map(r => r.slice(0, 3).join(':')).join(' '), up: up.join(':') });
  await p.close();
}
console.log(res.map(r => JSON.stringify(r)).join('\n')); await b.close();
