// SERVED MODEL: claude-opus-5-5 — KF.W13U Repair 1 (ESC-d-1): the dock + controls pane across scene switches, per frame.
// usage: node probe-switch.mjs <base> <tag>
import { chromium } from '/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs';
import fs from 'node:fs';
const base = process.argv[2] || 'http://localhost:5173/'; const tag = process.argv[3] || 'run';
const sampler = fs.readFileSync(new URL('../d/sampler.js', import.meta.url), 'utf8');
const pane = `(() => { const f = []; let on = true; const tick = () => { if (!on) return;
  const tab = [...document.querySelectorAll('[data-dock-tether=top] button,[data-dock-tether=top] [role=combobox]')].some(b => /controls/i.test(b.getAttribute('aria-label') || b.textContent || ''));
  f.push(tab ? 1 : 0); requestAnimationFrame(tick); }; window.__pane = { start() { f.length = 0; on = true; requestAnimationFrame(tick); }, stop() { on = false; return f; } }; })();`;
const b = await chromium.launch({ headless: false, args: ['--ignore-gpu-blocklist'] });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(String(e).slice(0, 160)));
await p.addInitScript(sampler); await p.addInitScript(pane);
await p.goto(base + '#/cube', { waitUntil: 'networkidle' }); await p.waitForTimeout(3000);
const out = {};
for (const dest of ['amiga', 'square', 'spring', 'easing', 'cube']) {
  await p.hover('[data-dock-tether=top] .glass-dock'); await p.waitForTimeout(1500);
  await p.evaluate(() => { window.__dockProbe.start(); window.__pane.start(); });
  await p.getByRole('combobox', { name: 'Scene' }).click(); await p.waitForTimeout(500);
  await p.getByRole('option', { name: new RegExp(dest, 'i') }).first().click(); await p.waitForTimeout(2500);
  const rep = await p.evaluate(() => window.__dockProbe.stop()); const tabs = await p.evaluate(() => window.__pane.stop());
  const fr = rep.frames.slice(1); // the first frame precedes the switch
  const seq = fr.map(f => f.kids).filter((k, i, a) => i === 0 || k !== a[i - 1]).join('>');
  const tseq = tabs.filter((k, i, a) => i === 0 || k !== a[i - 1]).join('>');
  out[dest] = { frames: fr.length, wMin: Math.min(...fr.map(f => f.w)), wMax: Math.max(...fr.map(f => f.w)), kidsSeq: seq, controlsTabSeq: tseq };
  console.log(dest, JSON.stringify(out[dest]));
}
out.errs = errs; console.log('pageerrors', errs.length, errs.join(' | '));
fs.writeFileSync(new URL(`./report-switch-${tag}.json`, import.meta.url), JSON.stringify(out, null, 1));
await b.close();
