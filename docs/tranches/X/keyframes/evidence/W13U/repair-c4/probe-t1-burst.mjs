// SERVED MODEL: claude-opus-5-5
// KF.W13U Repair 1 (against Check 4 C4-3 / R-close-1): the banked t/probe-t1.mjs with the gesture dispatched over CDP —
// the press and the first 4 px move in one burst (no frame between them), the same 20 % -> 50 % -> 80 % path in 8-step
// legs, CDP release — forcing the race the banked probe hits by timing; no screenshot is written. Reads unchanged.
// Pre-cure (3b1dbd8f) dev x2: mid/late/afterUp 5000, cube rotateX(360deg). Post-cure (9bdcdad5): 2400 -> 3950.
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
  await p.mouse.move(box.x + box.width * 0.2, y);
  const cdp = await p.context().newCDPSession(p);
  const x0 = box.x + box.width * 0.2;
  // press and the first move in one burst: no frame between them (the race, forced)
  await Promise.all([
    cdp.send('Input.dispatchMouseEvent', { type: 'mousePressed', x: x0, y, button: 'left', buttons: 1, clickCount: 1 }),
    cdp.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: x0 + 4, y, button: 'left', buttons: 1 }),
  ]);
  for (let i=1;i<=8;i++) await cdp.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: x0 + 4 + (box.width*0.3-4)*i/8, y, button: 'left', buttons: 1 }); await p.waitForTimeout(150);
  out.mid = await read(); out.cubeMid = await cubeTf();
  for (let i=1;i<=8;i++) await cdp.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: box.x + box.width*(0.5+0.3*i/8), y, button: 'left', buttons: 1 }); await p.waitForTimeout(150);
  out.late = await read(); out.cubeLate = await cubeTf();
  await cdp.send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: box.x + box.width * 0.8, y, button: 'left', buttons: 0, clickCount: 1 }); await p.waitForTimeout(400);
  out.afterUp = await read(); out.cubeAfterUp = await cubeTf();
  out.stillPaused = await p.getByRole('button', { name: /^play/i }).count();
  await p.evaluate(()=>0);
} else out.dragSkipped = 'disabled or no box';
out.errs = errs.slice(0, 5);
console.log(JSON.stringify(out, null, 1));
await b.close();
