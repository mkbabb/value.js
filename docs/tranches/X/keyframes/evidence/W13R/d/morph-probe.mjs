// SERVED MODEL: claude-opus-5-5 — KF.W13R.d driver (OA-41/OA-48): the small<->large dock morph at glass 10.0.1, headed, one WebM per context.
// usage: node morph-probe.mjs <base> <tag>     writes report-<tag>.json + webm-<tag>/*.webm
import { chromium } from '/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs';
import fs from 'node:fs'; import { execSync } from 'node:child_process';
const HERE = new URL('.', import.meta.url).pathname;
const base = (process.argv[2] || 'http://localhost:5173').replace(/\/$/, ''); const tag = process.argv[3] || 'dev';
const sampler = fs.readFileSync(HERE + 'sampler.js', 'utf8'); const vdir = `${HERE}webm-${tag}`; fs.mkdirSync(vdir, { recursive: true });
const SELS = { top: '[data-dock-tether="top"] .glass-dock', bottom: '[data-dock-tether="bottom"] .glass-dock' };
const load = execSync('uptime').toString().trim().split('averages: ')[1];
const b = await chromium.launch({ headless: false, args: ['--ignore-gpu-blocklist'] });
const out = { base, tag, load, renderer: null, tokens: null, ctx: {} };
async function ctxRun(name, hash, dockKey, act) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, recordVideo: { dir: vdir, size: { width: 1440, height: 900 } } });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', (e) => errs.push(String(e).slice(0, 140)));
  await p.addInitScript(sampler); await p.mouse.move(1300, 450);
  await p.goto(`${base}/#/${hash}`, { waitUntil: 'load' }); await p.waitForTimeout(6000);
  out.renderer ??= await p.evaluate(() => { const g = document.createElement('canvas').getContext('webgl'); const x = g?.getExtension('WEBGL_debug_renderer_info'); return x ? g.getParameter(x.UNMASKED_RENDERER_WEBGL) : null; });
  out.tokens ??= await p.evaluate(() => window.__morph.tokens());
  await p.evaluate((s) => window.__morph.start(s), SELS);
  const marks = []; const mark = async (m) => marks.push({ m, t: await p.evaluate(() => performance.now()) });
  await act(p, mark);
  const frames = await p.evaluate(() => window.__morph.stop());
  const v = p.video(); await ctx.close(); fs.renameSync(await v.path(), `${vdir}/${name}.webm`);
  out.ctx[name] = { dockKey, errs, marks, segments: marks.map((mk, i) => seg(frames.filter((f) => f.t >= mk.t && f.t < (marks[i + 1]?.t ?? Infinity)).map((f) => f[dockKey]).filter(Boolean), frames.filter((f) => f.t >= mk.t && f.t < (marks[i + 1]?.t ?? Infinity)).map((f) => f.t), mk.m)) };
}
function seg(fr, ts, m) {
  if (!fr.length) return { m, frames: 0 };
  const w0 = fr[0].w, w1 = fr[fr.length - 1].w, dir = Math.sign(w1 - w0);
  const ws = fr.map((f) => f.w); const dw = ws.slice(1).map((w, i) => w - ws[i]);
  let rev = 0, last = 0; for (const d of dw) { if (Math.abs(d) < 0.3) continue; const s = Math.sign(d); if (last && s !== last) rev++; last = s; }
  const moved = fr.findIndex((f) => Math.abs(f.w - w0) > 0.5); let lastOff = -1; fr.forEach((f, i) => { if (Math.abs(f.w - w1) > 0.5) lastOff = i; });
  const mIdx = fr.map((f, i) => (f.morph ? i : -1)).filter((i) => i >= 0);
  const firstM = mIdx[0] ?? -1, lastM = mIdx[mIdx.length - 1] ?? -1;
  const rows = fr.map((f) => f.rows); const restRows = Math.max(rows[0], rows[rows.length - 1]);
  let rowRev = 0, rl = 0; for (let i = 1; i < rows.length; i++) { const d = rows[i] - rows[i - 1]; if (!d) continue; const s = Math.sign(d); if (rl && s !== rl) rowRev++; rl = s; }
  const num = (s) => (s == null ? null : parseFloat(s));
  const settle = firstM >= 0 ? fr.slice(lastM + 1) : [];
  return { m, frames: fr.length, w0, w1, wMin: Math.min(...ws), wMax: Math.max(...ws),
    overshootPx: +(dir > 0 ? Math.max(...ws) - w1 : dir < 0 ? w1 - Math.min(...ws) : Math.max(Math.max(...ws) - w1, w1 - Math.min(...ws))).toFixed(2),
    widthReversals: rev, maxFrameJumpPx: +Math.max(0, ...dw.map(Math.abs)).toFixed(2),
    widthSettleMs: moved >= 0 && lastOff >= moved ? +(ts[lastOff + 1 < ts.length ? lastOff + 1 : lastOff] - ts[moved]).toFixed(1) : 0,
    morphFrames: mIdx.length, morphSpanMs: firstM >= 0 ? +(ts[lastM] - ts[firstM]).toFixed(1) : 0,
    rowsSeq: rows.filter((r, i) => i === 0 || r !== rows[i - 1]).join('>'), rowsOverRest: rows.filter((r) => r > restRows).length, rowReversals: rowRev,
    hMax: Math.max(...fr.map((f) => f.h)), hRest: fr[fr.length - 1].h,
    radMin: Math.min(...fr.map((f) => num(f.rad))), pradMin: Math.min(...fr.map((f) => num(f.prad) ?? Infinity)), radSeq: [...new Set(fr.map((f) => f.rad))].slice(0, 6),
    textBlurMorphFrames: fr.filter((f) => f.morph && f.textBlur).length, textBlurSettleFrames: settle.filter((f) => f.textBlur).length, textBlurAnyFrames: fr.filter((f) => f.textBlur).length,
    textScaleMorphFrames: fr.filter((f) => f.morph && f.textScale).length, textScaleSettleFrames: settle.filter((f) => f.textScale).length, dblFrames: fr.filter((f) => f.dbl.length).length, dblOwners: [...new Set(fr.flatMap((f) => f.dbl))].slice(0, 8),
    blurOwners: [...new Set(fr.flatMap((f) => f.owners))].slice(0, 6), dockFilters: [...new Set(fr.map((f) => f.dFilter))].slice(0, 4), plateBackdrop: [...new Set(fr.map((f) => f.pBackdrop))].slice(0, 3) };
}
const topBox = async (p, k) => p.locator(SELS[k]).boundingBox();
const away = (p) => p.mouse.move(1300, 450, { steps: 4 });
for (const k of ['top', 'bottom']) {
  await ctxRun(`${k}-expand-collapse`, 'cube', k, async (p, mark) => {
    for (let c = 0; c < 2; c++) { const bx = await topBox(p, k); await mark(`expand${c + 1}`); await p.mouse.move(bx.x + bx.width / 2, bx.y + bx.height / 2, { steps: 4 }); await p.waitForTimeout(1800);
      await mark(`collapse${c + 1}`); await away(p); await p.waitForTimeout(5200); }
  });
}
await ctxRun('top-scene-switch', 'square', 'top', async (p, mark) => {
  for (const [from, to] of [['square', 'spring'], ['spring', 'square'], ['square', 'spring']]) {
    const bx = await topBox(p, 'top'); await p.mouse.move(bx.x + 40, bx.y + bx.height / 2, { steps: 3 }); await p.waitForTimeout(1500);
    await p.getByRole('combobox', { name: 'Scene' }).click(); await p.waitForTimeout(600);
    await mark(`${from}>${to}`); await p.getByRole('option', { name: new RegExp(to, 'i') }).first().click(); await p.waitForTimeout(2200);
  }
  await mark('tail');
});
fs.writeFileSync(`${HERE}report-${tag}.json`, JSON.stringify(out, null, 1));
console.log(JSON.stringify({ tag, load, renderer: out.renderer, tokens: out.tokens }));
for (const [n, c] of Object.entries(out.ctx)) for (const s of c.segments) console.log(n, s.m, JSON.stringify({ f: s.frames, w: `${s.w0}->${s.w1} [${s.wMin},${s.wMax}]`, os: s.overshootPx, rev: s.widthReversals, jump: s.maxFrameJumpPx, wSettle: s.widthSettleMs, mSpan: s.morphSpanMs, mF: s.morphFrames, rows: s.rowsSeq, rowsOver: s.rowsOverRest, h: `${s.hMax}/${s.hRest}`, rad: s.radMin, prad: s.pradMin, blurM: s.textBlurMorphFrames, blurS: s.textBlurSettleFrames, scM: s.textScaleMorphFrames, scS: s.textScaleSettleFrames, dbl: s.dblFrames, dblO: s.dblOwners, own: s.blurOwners, errs: c.errs.length }));
await b.close();
