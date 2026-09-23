// SERVED MODEL: claude-opus-5-5 — G-KFW13U-d driver: one headed context (and one WebM) per dock transition.
// usage: node probe-d1.mjs <base> <tag>   (tag = before|after, plus run id)
import { chromium } from '/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs';
import fs from 'node:fs';
const base = process.argv[2] || 'http://localhost:5173/'; const tag = process.argv[3] || 'before';
const sampler = fs.readFileSync(new URL('./sampler.js', import.meta.url), 'utf8');
fs.mkdirSync(`webm-${tag}`, { recursive: true });
const b = await chromium.launch({ headless: false, args: ['--ignore-gpu-blocklist'] });
const out = {};
async function run(name, act) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, recordVideo: { dir: `webm-${tag}`, size: { width: 1440, height: 900 } } });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(String(e).slice(0, 140)));
  await p.addInitScript(sampler);
  await p.goto(base + '#/cube', { waitUntil: 'networkidle' }); await p.waitForTimeout(3000);
  await p.mouse.move(40, 800);
  const r = await act(p);
  const rep = await p.evaluate(() => window.__dockProbe.stop());
  const fr = rep.frames, mf = fr.filter(f => f.morph);
  const frac = (v) => v == null ? null : Math.abs(v - Math.round(v));
  const last = fr[fr.length - 1] || {};
  out[name] = { frames: fr.length, morphFrames: mf.length,
    blurFrames: fr.filter(f => f.filter !== 'none').length, maxBlur: [...new Set(fr.map(f => f.filter))].slice(0, 6),
    dockScaleFrames: fr.filter(f => f.dtf !== 'none' || f.dscale !== 'none').length,
    textChainScaled: fr.filter(f => f.chain.length).length, textChainSample: [...new Set(fr.flatMap(f => f.chain))].slice(0, 6),
    implicitFrames: fr.filter(f => f.implicit.length).length, implicitMax: Math.max(0, ...fr.map(f => f.implicit.length)), implicitOwners: [...new Set(fr.flatMap(f => f.implicit.map(x => x.replace(/#\w+/, ''))))].slice(0, 20),
    widths: { min: Math.min(...fr.map(f => f.w)), max: Math.max(...fr.map(f => f.w)), kidsSeq: fr.map(f => f.kids).filter((k, i, a) => i === 0 || k !== a[i - 1]).join('>') },
    dblOwnerFrames: fr.filter(f => f.dbl.length).length, dblOwners: [...new Set(fr.flatMap(f => f.dbl))].slice(0, 12),
    runningKinds: [...new Set(fr.flatMap(f => f.running))].slice(0, 30),
    rectJumps: fr.slice(1).map((f, i) => Math.abs(f.y - fr[i].y)).filter(v => v > 0.01).length,
    layoutShifts: rep.shifts.length, shiftSum: +rep.shifts.reduce((s, e) => s + e.v, 0).toFixed(4), shiftSrc: [...new Set(rep.shifts.flatMap(s => s.src))].slice(0, 6),
    rest: { x: last.x, y: last.y, w: last.w, textX: last.tx, textY: last.ty, textXfrac: frac(last.tx), textYfrac: frac(last.ty), filter: last.filter, chain: last.chain },
    extra: r, errs };
  const v = p.video(); await ctx.close(); fs.renameSync(await v.path(), `webm-${tag}/${name}.webm`);
}
const start = (p) => p.evaluate(() => window.__dockProbe.start());
await run('1-expand', async (p) => { await start(p); await p.hover('[data-dock-tether=top] .glass-dock'); await p.waitForTimeout(1500); });
await run('2-collapse', async (p) => { await p.hover('[data-dock-tether=top] .glass-dock'); await p.waitForTimeout(1500); await start(p); await p.mouse.move(40, 800); await p.waitForTimeout(4500); });
await run('3-scene-switch', async (p) => { await p.hover('[data-dock-tether=top] .glass-dock'); await p.waitForTimeout(1500); await start(p);
  await p.getByRole('combobox', { name: 'Scene' }).click(); await p.waitForTimeout(500); await p.getByRole('option', { name: /amiga/i }).click(); await p.waitForTimeout(2500); });
await run('4-panel-toggle', async (p) => { await p.hover('[data-dock-tether=top] .glass-dock'); await p.waitForTimeout(1500); await start(p);
  await p.getByRole('button', { name: 'Controls panel' }).click(); await p.waitForTimeout(1200); await p.getByRole('button', { name: 'Controls panel' }).click(); await p.waitForTimeout(1200); });
await run('5-menu', async (p) => { await p.hover('[data-dock-tether=top] .glass-dock'); await p.waitForTimeout(1500); await start(p);
  await p.getByRole('button', { name: /mbabb/i }).first().click(); await p.waitForTimeout(900); await p.keyboard.press('Escape'); await p.waitForTimeout(1200); });
await run('6-hover-collapsed', async (p) => { await start(p); const bx = await p.locator('[data-dock-tether=top] .glass-dock').boundingBox(); await p.mouse.move(bx.x + bx.width / 2, bx.y + bx.height / 2, { steps: 4 }); await p.waitForTimeout(250); await p.mouse.move(40, 800); await p.waitForTimeout(3500); });
fs.writeFileSync(`report-${tag}.json`, JSON.stringify(out, null, 1));
for (const [k, v] of Object.entries(out)) console.log(k, JSON.stringify({ f: v.frames, m: v.morphFrames, blur: v.blurFrames, dscale: v.dockScaleFrames, txtScaled: v.textChainScaled, dbl: v.dblOwnerFrames, impl: v.implicitFrames, implMax: v.implicitMax, widths: v.widths, shifts: v.layoutShifts, rest: v.rest, errs: v.errs.length }));
await b.close();
