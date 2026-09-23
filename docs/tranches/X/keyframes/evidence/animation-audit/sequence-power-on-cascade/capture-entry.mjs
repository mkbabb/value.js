// Pass C: does the power-on boot overlap the scene-swap entrance? Logs per-rAF the stage rect,
// the effective (multiplied) ancestor opacity, and every ancestor with non-identity transform/opacity/filter,
// plus the rAF deltas over 3s of live transport playback after the boot (Space/Play).
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs"; import path from "node:path"; import { execSync } from "node:child_process";
const OUT = path.dirname(new URL(import.meta.url).pathname);
const KF = "/Users/mkbabb/Programming/keyframes.js";
const meta = { khead: execSync(`git -C ${KF} rev-parse --short HEAD`).toString().trim(), kdirty: execSync(`git -C ${KF} status --porcelain | wc -l`).toString().trim() };
const browser = await chromium.launch({ headless: false });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
await page.goto("http://localhost:5173/#/cube", { waitUntil: "load" });
await page.waitForTimeout(3500);
const res = await page.evaluate(async () => {
  const out = []; const t0 = performance.now(); let last = t0;
  location.hash = '#/sequence';
  await new Promise((done) => {
    const tick = (t) => {
      const st = document.querySelector('.seq-stage');
      const e = { t: +(t - t0).toFixed(1), d: +(t - last).toFixed(1) }; last = t;
      if (st) {
        const r = st.getBoundingClientRect(); e.x = +r.x.toFixed(2); e.y = +r.y.toFixed(2); e.w = +r.width.toFixed(1);
        e.on = st.classList.contains('is-powering-on');
        let op = 1; const anc = [];
        for (let el = st; el && el !== document.documentElement; el = el.parentElement) {
          const c = getComputedStyle(el); op *= +c.opacity;
          if (el !== st && (c.opacity !== '1' || c.transform !== 'none' || c.filter !== 'none' || c.translate !== 'none' || c.scale !== 'none'))
            anc.push(`${el.tagName.toLowerCase()}.${String(el.className).split(' ').slice(0,2).join('.')}|o=${(+c.opacity).toFixed(3)}|tf=${c.transform}|tr=${c.translate}|sc=${c.scale}|f=${c.filter}`);
        }
        e.op = +op.toFixed(3); e.anc = anc;
        e.docAnims = document.getAnimations().map(a => (a.animationName || a.id || a.constructor.name) + ':' + (a.effect?.target?.className?.toString?.().split(' ')[0] || a.effect?.pseudoElement || '')).filter(s => !s.startsWith('seq-')).slice(0, 6);
      }
      out.push(e);
      if (t - t0 < 1600) requestAnimationFrame(tick); else done();
    };
    requestAnimationFrame(tick);
  });
  return out;
});
fs.writeFileSync(path.join(OUT, "C-entry-log.json"), JSON.stringify({ meta, res }, null, 1));
// live playback rAF drops: press the transport play, measure 3s
const playBtn = await page.$('[aria-label*="Play" i]');
meta.playBtn = !!playBtn;
if (playBtn) await playBtn.click(); else await page.keyboard.press('Space');
const drops = await page.evaluate(() => new Promise((res) => { const ds = []; let l = performance.now(); const s = l; const f = (t) => { ds.push(t - l); l = t; if (t - s < 3000) requestAnimationFrame(f); else res({ n: ds.length, over20: ds.filter(d => d > 20).length, max: Math.max(...ds).toFixed(1), prog: getComputedStyle(document.querySelector('.seq-playhead')).getPropertyValue('--playhead-p') }); }; requestAnimationFrame(f); }));
meta.liveDrops = drops;
fs.writeFileSync(path.join(OUT, "meta-C.json"), JSON.stringify(meta, null, 1));
await browser.close();
console.log(JSON.stringify(meta));
