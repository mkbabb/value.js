// SERVED MODEL: claude-opus-5-5
// KF.W13U.w probe 1 — discriminate the engine's .cube write from the idle bob.
import { chromium } from '/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs';
const base = process.argv[2] || 'http://localhost:5173/';
const b = await chromium.launch({ headless: false, args: ['--ignore-gpu-blocklist'] });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
const errs = []; p.on('pageerror', e => errs.push(String(e).slice(0,200)));
p.on('console', m => { if (m.type()==='error'||m.type()==='warning') errs.push('console:'+m.text().slice(0,200)); });
await p.goto(base + '#/cube', { waitUntil: 'networkidle' }); await p.waitForTimeout(2500);
const s = () => p.evaluate(() => {
  const c = document.querySelector('.cube'), r = document.querySelector('.idle-hover');
  const anims = document.getAnimations().filter(a => { const t = a.effect?.target; return t && (t===c||t===r||c?.contains(t)&&false); })
    .map(a => ({ tgt: a.effect.target.className.toString().slice(0,30), name: a.animationName||a.id||a.constructor.name, ps: a.playState, props: (a.effect.getKeyframes?.()[0] ? Object.keys(a.effect.getKeyframes()[0]).filter(k=>!['offset','easing','composite','computedOffset'].includes(k)) : []) }));
  const q = (k) => (document.querySelector(k)?.style.transform||'').slice(0,90);
  return { bob: q('.cube-bob'), pose: q('.cube-pose'), cubeInline: (c?.style.transform||'').slice(0,160), cubeComp: getComputedStyle(c).transform.slice(0,120), rollComp: getComputedStyle(r).transform.slice(0,80), anims };
});
const tag = process.argv[3] || 'x'; const clip = await p.locator('.graph').first().boundingBox();
const out = { rest: [await s()] }; await p.screenshot({ path: `${tag}-cube-rest-t0.png`, clip }); await p.waitForTimeout(1000); out.rest.push(await s()); await p.screenshot({ path: `${tag}-cube-rest-t1.png`, clip });
const pause = p.getByRole('button', { name: /^pause/i }).first(); out.autoPlaying = (await pause.count()) > 0;
if (out.autoPlaying) { await pause.click(); await p.waitForTimeout(400); out.paused = [await s()]; await p.waitForTimeout(600); out.paused.push(await s()); }
await p.getByRole('button', { name: /^play/i }).first().click(); await p.waitForTimeout(300);
out.play = [await s()]; await p.waitForTimeout(500); out.play.push(await s()); await p.waitForTimeout(500); out.play.push(await s());
out.errs = errs.slice(0,8);
console.log(JSON.stringify(out, null, 1));
await b.close();
