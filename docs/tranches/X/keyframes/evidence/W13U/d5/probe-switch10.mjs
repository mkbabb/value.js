// SERVED MODEL: claude-opus-5-5 — KF.W13U.d5 (copied from d3/, logic unchanged; was KF.W13U.d3 ESC-d-1): 10 scene switches, sampled every frame.
// Extends repair1/probe-switch.mjs: per frame the dock width and the controls-surface signature
// (dock: Controls tab + Controls panel affordances and the tab trigger's label; pane: its tabpanels).
// Per switch: width CHANGE episodes (plateau-to-plateau moves; reversals counted), surface-set changes,
// and empty-surface frames (a non-home scene frame with neither Controls affordance in the dock).
// usage: node probe-switch10.mjs <base> <tag>
import { chromium } from '/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs';
import fs from 'node:fs';
const base = process.argv[2] || 'http://localhost:5173/'; const tag = process.argv[3] || 'run';
const probe = `(() => { let f = [], on = false; const tick = () => { if (!on) return;
  const d = document.querySelector('[data-dock-tether=top] .glass-dock');
  const tab = document.querySelector('[data-dock-tether=top] [aria-label="Controls tab"]');
  const pnl = document.querySelector('[data-dock-tether=top] [aria-label="Controls panel"]');
  // the pane: the VISIBLE controls pane's ACTIVE panel (the hidden per-channel instances and the
  // warm-gated inactive Monaco cache are not the surface set; recorded in the receipt)
  const panes = [...document.querySelectorAll('.controls-pane [role=tabpanel][data-state=active]')].filter(e => e.offsetParent !== null)
    .map(e => e.classList.contains('monaco-pane') ? 'keyframes' : ((e.firstElementChild?.tagName || '?') + '.' + String(e.firstElementChild?.className || '').split(/\s+/)[0]).toLowerCase().slice(0, 24)).join(',');
  const scene = (document.querySelector('[data-dock-tether=top] [role=combobox][aria-label="Scene"]')?.textContent || '').trim().slice(0, 16);
  f.push({ t: performance.now(), w: d ? d.getBoundingClientRect().width : -1, tab: tab ? 1 : 0, pnl: pnl ? 1 : 0,
    lbl: tab ? (tab.textContent || '').trim().slice(0, 24) : '', panes, scene, hash: location.hash });
  requestAnimationFrame(tick); };
  window.__sw = { start() { f = []; on = true; requestAnimationFrame(tick); }, stop() { on = false; return f; } }; })();`;
const b = await chromium.launch({ headless: false, args: ['--ignore-gpu-blocklist'] });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(String(e).slice(0, 160)));
await p.addInitScript(probe);
await p.goto(base + '#/cube', { waitUntil: 'networkidle' }); await p.waitForTimeout(3000);
const route = ['amiga', 'square', 'spring', 'easing', 'cube', 'spring', 'amiga', 'easing', 'square', 'cube'];
// width change episodes: collapse the per-frame series into plateaus (>=3 frames within 0.5 px);
// a change = a move between successive distinct plateaus; a reversal = a sign flip of a >1 px step.
const widthChanges = (ws) => {
  const plats = []; let run = [ws[0]];
  for (let i = 1; i < ws.length; i++) { if (Math.abs(ws[i] - run[0]) <= 0.5) run.push(ws[i]); else { if (run.length >= 3) plats.push(run[0]); run = [ws[i]]; } }
  if (run.length >= 3) plats.push(run[0]);
  const dist = plats.filter((v, i, a) => i === 0 || Math.abs(v - a[i - 1]) > 0.5);
  let rev = 0, sgn = 0; for (let i = 1; i < ws.length; i++) { const dd = ws[i] - ws[i - 1]; if (Math.abs(dd) > 1) { const s = Math.sign(dd); if (sgn && s !== sgn) rev++; sgn = s; } }
  return { changes: Math.max(0, dist.length - 1), plateaus: dist.map(v => +v.toFixed(1)), reversals: rev };
};
const out = { route: ['cube', ...route], switches: [] };
let from = 'cube';
for (const dest of route) {
  await p.hover('[data-dock-tether=top] .glass-dock'); await p.waitForTimeout(1500);
  await p.evaluate(() => window.__sw.start());
  await p.getByRole('combobox', { name: 'Scene' }).click(); await p.waitForTimeout(500);
  await p.getByRole('option', { name: new RegExp(dest, 'i') }).first().click(); await p.waitForTimeout(2500);
  const fr = (await p.evaluate(() => window.__sw.stop())).slice(1);
  const sig = fr.map(f => `${f.tab}${f.pnl}|${f.lbl}|${f.panes}`);
  const sigSeq = sig.filter((s, i, a) => i === 0 || s !== a[i - 1]);
  const surf = fr.map(f => `${f.tab}${f.pnl}`).filter((s, i, a) => i === 0 || s !== a[i - 1]);
  const at = (k) => fr.map((f, i) => [i, f[k]]).filter(([i, v]) => i === 0 || v !== fr[i - 1][k]).map(([i, v]) => i + ':' + v);
  const empty = fr.filter(f => f.tab === 0 && f.pnl === 0).length;
  const wc = widthChanges(fr.map(f => f.w));
  const rec = { from, to: dest, frames: fr.length, wMin: +Math.min(...fr.map(f => f.w)).toFixed(2), wMax: +Math.max(...fr.map(f => f.w)).toFixed(2),
    widthChanges: wc.changes, widthPlateaus: wc.plateaus, widthReversals: wc.reversals,
    surfaceSetChanges: sigSeq.length - 1, surfaceSeq: sigSeq, affordanceSeq: surf.join('>'), emptySurfaceFrames: empty, sceneLabelAt: at('scene'), controlLabelAt: at('lbl'), paneAt: at('panes') };
  out.switches.push(rec); console.log(JSON.stringify({ ...rec, surfaceSeq: undefined }));
  from = dest;
}
out.errs = errs; console.log('pageerrors', errs.length, errs.join(' | '));
fs.writeFileSync(new URL(`./report-${tag}.json`, import.meta.url), JSON.stringify(out, null, 1));
await b.close();
