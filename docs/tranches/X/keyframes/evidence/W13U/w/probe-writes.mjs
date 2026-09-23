// SERVED MODEL: claude-opus-5-5
// KF.W13U.w — per scene: which non-chrome elements get style/attr writes in 1 s at rest, and 1 s after Play
// (MutationObserver on style/transform/d/cx attributes outside the docks) + a stage frame diff.
import { chromium } from '/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs';
import crypto from 'node:crypto';
const base = process.argv[2] || 'http://localhost:5173/';
const tag = process.argv[3] || 'x';
const b = await chromium.launch({ headless: false, args: ['--ignore-gpu-blocklist'] });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
const errs = []; p.on('pageerror', e => errs.push(String(e).slice(0,200)));
const h = buf => crypto.createHash('sha1').update(buf).digest('hex').slice(0,10);
const watch = () => p.evaluate(() => new Promise(res => {
  const hits = {};
  const mo = new MutationObserver(ms => { for (const m of ms) { const t = m.target; if (!(t instanceof Element)) continue;
    if (t.closest('[class*=dock], nav, [role=toolbar], [data-sonner-toaster]')) continue;
    const k = (t.getAttribute('class')||t.tagName).toString().split(' ').slice(0,2).join('.').slice(0,40); hits[k] = (hits[k]||0)+1; } });
  mo.observe(document.body, { subtree: true, attributes: true, attributeFilter: ['style','transform','d','cx','cy','x','y'] });
  setTimeout(() => { mo.disconnect(); res(hits); }, 1000);
}));
const out = {};
for (const id of (process.argv[4]||'cube,amiga,square,easing,spring,sequence').split(',')) {
  await p.goto(base + '#/' + id, { waitUntil: 'networkidle' }); await p.reload({ waitUntil: 'networkidle' }); await p.waitForTimeout(2500);
  const r = { rest: await watch() };
  const s0 = h(await p.screenshot()); await p.waitForTimeout(300); r.restFrameMoves = s0 !== h(await p.screenshot());
  const pause = p.getByRole('button', { name: /^pause/i }).first();
  r.autoPlaying = (await pause.count()) > 0;
  if (r.autoPlaying) { await pause.click(); await p.waitForTimeout(300); }
  await p.getByRole('button', { name: /^play/i }).first().click(); await p.waitForTimeout(300);
  r.play = await watch();
  const a0 = h(await p.screenshot()); await p.waitForTimeout(300); r.playFrameMoves = a0 !== h(await p.screenshot());
  await p.screenshot({ path: `${tag}-${id}-play.png` });
  out[id] = r;
}
out.errs = errs.slice(0,6);
console.log(JSON.stringify(out));
await b.close();
