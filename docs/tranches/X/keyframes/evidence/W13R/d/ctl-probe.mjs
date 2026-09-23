// SERVED MODEL: claude-opus-5-5 — KF.W13R.d REPIN-SPRING-SMOOTH-DEAD (KFA-168 re-read): the Controls-pane rail track open/close at glass 10.0.1.
// usage: node ctl-probe.mjs <base> <tag>  -> ctl-<tag>.json  (headed; per-rAF rail-track width across Controls panel close + open)
import { chromium } from '/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs';
import fs from 'node:fs'; import { execSync } from 'node:child_process';
const HERE = new URL('.', import.meta.url).pathname;
const base = (process.argv[2] || 'http://localhost:5173').replace(/\/$/, ''); const tag = process.argv[3] || 'dev';
const load = execSync('uptime').toString().trim().split('averages: ')[1];
const b = await chromium.launch({ headless: false }); const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.mouse.move(1300, 450); await p.goto(`${base}/#/cube`, { waitUntil: 'load' }); await p.waitForTimeout(6000);
const rest = await p.evaluate(() => { const e = document.querySelector('.controls-layout'); const s = e && getComputedStyle(e); return e ? { transition: s.transition, tProp: s.transitionProperty, tDur: s.transitionDuration, tEase: s.transitionTimingFunction.slice(0, 40), cols: s.gridTemplateColumns, springDock: getComputedStyle(document.documentElement).getPropertyValue('--spring-dock').slice(0, 40), springSmooth: getComputedStyle(document.documentElement).getPropertyValue('--spring-smooth') } : null; });
const legs = {};
for (const leg of ['close', 'open']) {
  const bx = await p.locator('[data-dock-tether="top"] .glass-dock').boundingBox(); await p.mouse.move(bx.x + bx.width / 2, bx.y + bx.height / 2, { steps: 3 }); await p.waitForTimeout(1500);
  await p.evaluate(() => { window.__c = []; const e = document.querySelector('.controls-layout'); const f = () => { const s = getComputedStyle(e); window.__c.push({ t: performance.now(), rail: parseFloat((s.gridTemplateColumns.match(/[-\d.]+px/) || ["NaN"])[0]), tr: document.getAnimations().filter((a) => a.effect?.target === e).map((a) => a.transitionProperty || a.animationName) }); window.__raf = requestAnimationFrame(f); }; window.__raf = requestAnimationFrame(f); });
  await p.getByRole('button', { name: 'Controls panel' }).click(); await p.waitForTimeout(1400);
  const fr = await p.evaluate(() => { cancelAnimationFrame(window.__raf); return window.__c; });
  const r = fr.map((x) => x.rail); const d = r.slice(1).map((v, i) => v - r[i]); const moving = d.map((v, i) => (Math.abs(v) > 0.3 ? i : -1)).filter((i) => i >= 0);
  legs[leg] = { frames: fr.length, from: r[0], to: r[r.length - 1], changingFrames: moving.length, spanMs: moving.length ? +(fr[moving[moving.length - 1] + 1].t - fr[moving[0]].t).toFixed(1) : 0, maxJump: +Math.max(0, ...d.map(Math.abs)).toFixed(2), transitions: [...new Set(fr.flatMap((x) => x.tr))] };
}
await b.close();
const out = { tag, base, load, rest, legs }; fs.writeFileSync(`${HERE}ctl-${tag}.json`, JSON.stringify(out, null, 1)); console.log(JSON.stringify(out));
