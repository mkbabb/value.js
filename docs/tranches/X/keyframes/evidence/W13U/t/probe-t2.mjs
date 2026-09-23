// SERVED MODEL: claude-opus-5-5
// KF.W13U.t — G-KFW13U-t probe: at boot (no Play) on cube/square/amiga the scrub rail is
// enabled (no data-disabled, no .is-disabled/opacity grey); a pointer drag moves the playhead
// AND the subject — cube while PAUSED; square + amiga NEVER PLAYED. Usage: node probe-t2.mjs <base> <tag>
import { chromium } from '/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs';
import { createHash } from 'node:crypto';
const base = process.argv[2] || 'http://localhost:5173/';
const tag = process.argv[3] || 'dev';
const b = await chromium.launch({ headless: false, args: ['--ignore-gpu-blocklist'] });
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, colorScheme: 'dark' });
const errs = []; p.on('pageerror', e => errs.push(String(e).slice(0, 160)));
const S = 'Scrub animation timeline';
const rail = () => p.evaluate((S) => {
  const th = document.querySelector(`[role=slider][aria-label="${S}"]`); if (!th) return 'NO SLIDER';
  const root = th.closest('.glass-slider'); const rg = root.querySelector('.slider-range');
  const greyOp = (() => { for (let e = th; e; e = e.parentElement) if (+getComputedStyle(e).opacity < 1) return e.className.toString().slice(0, 40); return null; })();
  return { dis: root.hasAttribute('data-disabled') || th.hasAttribute('data-disabled'), tab: th.getAttribute('tabindex'), now: Math.round(+th.getAttribute('aria-valuenow')),
    rangeOp: getComputedStyle(rg).opacity, isDisabledCls: document.querySelectorAll('#controls-ribbon-target .is-disabled, .scrub-rail .is-disabled').length, greyOp };
}, S);
const subj = {
  cube: () => p.evaluate(() => document.querySelector('.cube')?.style.transform.slice(0, 60) ?? 'NO .cube'),
  square: () => p.evaluate(() => { const e = document.querySelector('.demo-box'); return e ? (e.style.transform || getComputedStyle(e).transform).slice(0, 60) : 'NO .demo-box'; }),
  amiga: async () => { const bb = await p.locator('.amiga-canvas').first().boundingBox(); return bb ? createHash('sha1').update(await p.screenshot({ clip: bb })).digest('hex').slice(0, 8) : 'NO .amiga-canvas'; },
};
const out = { base };
for (const scene of ['cube', 'square', 'amiga']) {
  const r = out[scene] = {};
  await p.goto(base + '#/' + scene, { waitUntil: 'networkidle' }); await p.waitForTimeout(2000);
  r.boot = await rail();
  if (scene === 'cube') { const pz = p.getByRole('button', { name: /^pause/i }).first(); r.pauseFound = await pz.count(); if (r.pauseFound) { await pz.click(); await p.waitForTimeout(500); } }
  r.s0 = await subj[scene](); await p.waitForTimeout(600); r.s0b = await subj[scene](); r.restStill = r.s0 === r.s0b;
  const box = await p.locator('.glass-slider').filter({ has: p.locator(`[role=slider][aria-label="${S}"]`) }).first().boundingBox();
  if (!box || r.boot.dis) { r.drag = 'SKIPPED (disabled)'; continue; }
  const y = box.y + box.height / 2;
  await p.mouse.move(box.x + box.width * 0.15, y); await p.mouse.down();
  await p.mouse.move(box.x + box.width * 0.45, y, { steps: 8 }); await p.waitForTimeout(200);
  r.midRail = (await rail()).now; r.s1 = await subj[scene]();
  await p.mouse.move(box.x + box.width * 0.8, y, { steps: 8 }); await p.waitForTimeout(200);
  r.lateRail = (await rail()).now; r.s2 = await subj[scene]();
  await p.mouse.up(); await p.waitForTimeout(500);
  r.upRail = (await rail()).now; r.s3 = await subj[scene]();
  r.playheadMoves = r.boot.now !== r.midRail && r.midRail !== r.lateRail;
  r.subjectMoves = r.s0 !== r.s1 && r.s1 !== r.s2;
  await p.waitForTimeout(700); r.s4 = await subj[scene]();
  r.heldAfterUp = r.s3 === r.s4 && r.lateRail === r.upRail;
  r.playButtons = await p.getByRole('button', { name: /^play/i }).count();
  await p.screenshot({ path: `${tag}-${scene}-scrubbed.png` });
}
out.errs = errs.slice(0, 5);
console.log(JSON.stringify(out));
await b.close();
