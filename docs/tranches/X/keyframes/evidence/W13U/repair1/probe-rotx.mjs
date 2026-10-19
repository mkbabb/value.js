// SERVED MODEL: claude-opus-5-5 — KF.W13U Repair 1 (Check-1 #5): hunt the var(--rotationX) resolve race on a 390×844 touch context.
// usage: node probe-rotx.mjs <base> <runs>
import { chromium } from '/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs';
const base = process.argv[2] || 'http://localhost:5173/'; const runs = +(process.argv[3] || 6);
const b = await chromium.launch({ headless: true });
let hits = 0;
for (let i = 0; i < runs; i++) {
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true, deviceScaleFactor: 3 });
  const p = await ctx.newPage(); const errs = [];
  p.on('pageerror', e => errs.push((e.stack || String(e)).split('\n').slice(0, 9).join(' <- ')));
  await p.goto(base + '#/cube', { waitUntil: 'load' });
  await p.evaluate(() => { location.hash = '#/cube'; });
  await p.waitForTimeout(2500);
  const btn = p.locator('button[aria-label="Play animation"],button[aria-label="Pause animation"]').first();
  try { await btn.tap({ timeout: 1500, force: true }); } catch {}
  await p.waitForTimeout(1500);
  if (errs.length) hits++;
  console.log(`run ${i + 1}: pageerrors ${errs.length}`); for (const e of errs.slice(0, 2)) console.log('  ', e.slice(0, 900));
  await ctx.close();
}
console.log('runs with a pageerror:', hits, 'of', runs);
await b.close();
