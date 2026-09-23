// SERVED MODEL: claude-opus-5-5
// KF.W13U.t — OA-29 probe: the scrub slider's state at boot on every scene, its paint
// (track/range/thumb computed), then a PAUSED pointer drag: playhead + cube move?
import { chromium } from '/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs';
const base = process.argv[2] || 'http://localhost:5173/';
const tag = process.argv[3] || 'dev';
const b = await chromium.launch({ headless: false, args: ['--ignore-gpu-blocklist'] });
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, colorScheme: 'dark' });
const errs = []; p.on('pageerror', e => errs.push(String(e).slice(0, 160)));
const out = { base };
const S = 'Scrub animation timeline';
const read = () => p.evaluate((S) => {
  const th = document.querySelector(`[role=slider][aria-label="${S}"]`);
  if (!th) return 'NO SLIDER';
  const root = th.closest('.glass-slider');
  const tr = root?.querySelector('.slider-track'), rg = root?.querySelector('.slider-range');
  const cs = (e, k) => e ? getComputedStyle(e)[k] : null;
  return { dis: root?.hasAttribute('data-disabled') ?? null, thumbDis: th.hasAttribute('data-disabled'),
    now: th.getAttribute('aria-valuenow'), max: th.getAttribute('aria-valuemax'),
    rootOp: cs(root, 'opacity'), trackBg: cs(tr, 'backgroundColor'), rangeBg: cs(rg, 'backgroundColor'), rangeBgImg: cs(rg,'backgroundImage').slice(0,60), rangeOp: cs(rg, 'opacity'),
    rangeW: rg ? Math.round(rg.getBoundingClientRect().width) : null, trackW: tr ? Math.round(tr.getBoundingClientRect().width) : null,
    greyAncestor: !!th.closest('.is-disabled,[aria-disabled=true]') };
}, S);
const cubeTf = () => p.evaluate(() => { const c = document.querySelector('.cube'); return c ? (c.style.transform || getComputedStyle(c).transform).slice(0, 70) : 'NO .cube'; });
for (const scene of ['cube', 'square', 'amiga']) {
  await p.goto(base + '#/' + scene, { waitUntil: 'networkidle' }); await p.waitForTimeout(2000);
  out['boot_' + scene] = await read();
}
// cube: pause, then drag the slider thumb while paused
await p.goto(base + '#/cube', { waitUntil: 'networkidle' }); await p.waitForTimeout(2000);
const pause = p.getByRole('button', { name: /^pause/i }).first();
out.pauseFound = await pause.count();
if (out.pauseFound) { await pause.click(); await p.waitForTimeout(500); }
out.paused = await read(); out.cubeBefore = await cubeTf();
const th = p.locator(`[role=slider][aria-label="${S}"]`);
const box = await p.locator('.glass-slider').filter({ has: th }).first().boundingBox();
if (box && !(await read()).dis) {
  const y = box.y + box.height / 2;
  await p.mouse.move(box.x + box.width * 0.2, y); await p.mouse.down();
  await p.mouse.move(box.x + box.width * 0.5, y, { steps: 8 }); await p.waitForTimeout(150);
  out.mid = await read(); out.cubeMid = await cubeTf();
  await p.mouse.move(box.x + box.width * 0.8, y, { steps: 8 }); await p.waitForTimeout(150);
  out.late = await read(); out.cubeLate = await cubeTf();
  await p.mouse.up(); await p.waitForTimeout(400);
  out.afterUp = await read(); out.cubeAfterUp = await cubeTf();
  out.stillPaused = await p.getByRole('button', { name: /^play/i }).count();
  await p.screenshot({ path: `${tag}-cube-scrubbed.png` });
} else out.dragSkipped = 'disabled or no box';
out.errs = errs.slice(0, 5);
console.log(JSON.stringify(out, null, 1));
await b.close();
