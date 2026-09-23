// SERVED MODEL: claude-opus-5-5
// KF.W13U.t — rail fidelity: pointer fraction vs aria-valuenow during a slow drag (never-played + paused)
import { chromium } from '/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs';
const base = process.argv[2] || 'http://localhost:5173/';
const b = await chromium.launch({ headless: false, args: ['--ignore-gpu-blocklist'] });
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, colorScheme: 'dark' });
const S = '[role=slider][aria-label="Scrub animation timeline"]';
const out = {};
for (const scene of process.argv.slice(3)) {
  await p.goto(base + '#/' + scene, { waitUntil: 'networkidle' }); await p.waitForTimeout(2000);
  const pz = p.getByRole('button', { name: /^pause/i }).first(); if (await pz.count()) { await pz.click(); await p.waitForTimeout(400); }
  const n = await p.locator(S).count();
  const tr = await p.locator('.glass-slider').filter({ has: p.locator(S) }).first().locator('.slider-track').boundingBox();
  const max = +(await p.locator(S).first().getAttribute('aria-valuemax'));
  const y = tr.y + tr.height / 2; const rows = [];
  await p.mouse.move(tr.x + 2, y); await p.mouse.down();
  for (const f of [0.1, 0.3, 0.5, 0.7, 0.9]) { await p.mouse.move(tr.x + tr.width * f, y, { steps: 6 }); await p.waitForTimeout(250);
    rows.push([f, Math.round(+(await p.locator(S).first().getAttribute('aria-valuenow')) / max * 100) / 100]); }
  await p.mouse.up(); await p.waitForTimeout(300);
  const a = +(await p.locator(S).first().getAttribute('aria-valuenow')); await p.waitForTimeout(800);
  const c = +(await p.locator(S).first().getAttribute('aria-valuenow'));
  out[scene] = { sliders: n, max, rows, afterUp: [Math.round(a), Math.round(c)] };
}
console.log(JSON.stringify(out)); await b.close();
