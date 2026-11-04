// OD-14 dock transition trace (READ-ONLY seat). One browser per run; context per cell; close in finally.
// usage: node trace.mjs <label> <url> <outdir>
import { chromium } from '/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs';
import fs from 'node:fs';
import path from 'node:path';

const [label, url, outdir] = process.argv.slice(2);
fs.mkdirSync(outdir, { recursive: true });
const REPS = Number(process.env.REPS || 2);
const CELLS = [
  { name: 'desktop', viewport: { width: 1800, height: 1000 }, dpr: 2, mobile: false },
  { name: 'mobile', viewport: { width: 390, height: 844 }, dpr: 3, mobile: true },
];
const CATS = [
  'devtools.timeline', 'disabled-by-default-devtools.timeline', 'disabled-by-default-devtools.timeline.frame',
  'blink', 'cc', 'gpu', 'viz', 'benchmark', 'latencyInfo', 'blink.animations', 'disabled-by-default-devtools.timeline.stack',
].join(',');

const INSTR = () => {
  const S = (window.__od14 = { on: false, raf: [], loaf: [], lt: [], ro: [], mo: [], anims: [], t0: 0, marks: [] });
  try {
    new PerformanceObserver((l) => { for (const e of l.getEntries()) if (S.on) S.loaf.push({ start: e.startTime, dur: e.duration, block: e.blockingDuration, render: e.renderStart, style: e.styleAndLayoutStart, scripts: (e.scripts || []).slice(0, 4).map((s) => ({ inv: s.invoker, dur: Math.round(s.duration), src: (s.sourceURL || '').split('/').slice(-1)[0] + ':' + (s.sourceFunctionName || '') })) }); }).observe({ type: 'long-animation-frame', buffered: false });
  } catch {}
  try { new PerformanceObserver((l) => { for (const e of l.getEntries()) if (S.on) S.lt.push({ start: e.startTime, dur: e.duration }); }).observe({ type: 'longtask', buffered: false }); } catch {}
  const loop = (t) => { if (S.on) S.raf.push(t); requestAnimationFrame(loop); };
  requestAnimationFrame(loop);
  const desc = (el) => {
    if (!el || !el.tagName) return String(el);
    const c = (typeof el.className === 'string' ? el.className : el.className?.baseVal || '').trim().split(/\s+/).filter(Boolean).slice(0, 3).join('.');
    return el.tagName.toLowerCase() + (c ? '.' + c : '') + (el.getAttribute('aria-label') ? `[${el.getAttribute('aria-label')}]` : '');
  };
  S.desc = desc;
  S.arm = () => {
    S.raf = []; S.loaf = []; S.lt = []; S.ro = []; S.mo = []; S.anims = []; S.on = true; S.t0 = performance.now();
    const dock = document.querySelector('.glass-dock');
    S.roObs?.disconnect(); S.moObs?.disconnect();
    S.roObs = new ResizeObserver((es) => { const t = performance.now(); for (const e of es) S.ro.push({ t, el: desc(e.target), w: Math.round(e.contentRect.width * 10) / 10, h: Math.round(e.contentRect.height * 10) / 10 }); });
    if (dock) { S.roObs.observe(dock); for (const el of dock.querySelectorAll('.dock-plate,.dock-layers,.dock-layer,.dock-run > *,.dock-controls,.dock-search-field')) S.roObs.observe(el); }
    S.moObs = new MutationObserver((ms) => { const t = performance.now(); for (const m of ms) S.mo.push({ t, el: desc(m.target), attr: m.attributeName, v: m.attributeName === 'style' ? (m.target.getAttribute('style') || '').slice(0, 120) : String(m.target.getAttribute(m.attributeName)).slice(0, 80) }); });
    S.moObs.observe(document.body, { subtree: true, attributes: true, attributeFilter: ['style', 'class', 'data-morphing', 'data-state', 'aria-current'] });
  };
  S.sampleAnims = (tag) => {
    const out = [];
    for (const a of document.getAnimations()) {
      const tgt = a.effect?.target; if (!tgt) continue;
      const inDock = tgt.closest?.('.glass-dock,[data-reka-popper-content-wrapper],[role=menu],[role=listbox],[data-dismissable-layer]');
      if (!inDock) continue;
      let props = [];
      try { const kf = a.effect.getKeyframes(); props = [...new Set(kf.flatMap((k) => Object.keys(k).filter((x) => !['offset', 'easing', 'composite', 'computedOffset'].includes(x))))]; } catch {}
      const t = a.effect.getTiming?.() || {};
      out.push({ tag, el: desc(tgt), pseudo: a.effect.pseudoElement || '', kind: a.constructor.name, name: a.transitionProperty || a.animationName || a.id || '', props, dur: typeof t.duration === 'number' ? Math.round(t.duration) : String(t.duration), state: a.playState, timeline: a.timeline && a.timeline !== document.timeline ? a.timeline.constructor.name : 'doc' });
    }
    S.anims.push(...out);
    return out.length;
  };
  S.stop = () => { S.on = false; S.roObs?.disconnect(); S.moObs?.disconnect(); const r = { t0: S.t0, raf: S.raf, loaf: S.loaf, lt: S.lt, ro: S.ro, mo: S.mo, anims: S.anims }; return r; };
};

function stats(arr) {
  if (!arr.length) return { n: 0 };
  const s = [...arr].sort((a, b) => a - b);
  const q = (p) => s[Math.min(s.length - 1, Math.floor(p * (s.length - 1) + 0.5))];
  return { n: s.length, p50: +q(0.5).toFixed(2), p95: +q(0.95).toFixed(2), max: +s[s.length - 1].toFixed(2) };
}

function parseTrace(file, winStartUs, winEndUs) {
  const raw = JSON.parse(fs.readFileSync(file, 'utf8'));
  const ev = raw.traceEvents || raw;
  const threads = {};
  for (const e of ev) if (e.ph === 'M' && e.name === 'thread_name') threads[`${e.pid}:${e.tid}`] = e.args.name;
  // main renderer thread = the CrRendererMain with the most FireAnimationFrame
  const faf = {};
  for (const e of ev) if (e.name === 'FireAnimationFrame' && threads[`${e.pid}:${e.tid}`] === 'CrRendererMain') faf[`${e.pid}:${e.tid}`] = (faf[`${e.pid}:${e.tid}`] || 0) + 1;
  const main = Object.entries(faf).sort((a, b) => b[1] - a[1])[0]?.[0];
  const mainPid = main?.split(':')[0];
  const counts = {}; const durs = {};
  const want = ['UpdateLayoutTree', 'Layout', 'PrePaint', 'Paint', 'Layerize', 'Commit', 'FireAnimationFrame', 'FunctionCall', 'RunTask', 'ParseAuthorStyleSheet', 'HitTest', 'ScheduleStyleRecalculation', 'InvalidateLayout', 'UpdateLayer', 'CompositeLayers', 'BeginMainThreadFrame', 'Animation', 'IntersectionObserverController::computeIntersections', 'ResizeObserverController::handleObservations', 'ScrollLayer', 'PaintImage', 'RasterTask', 'Decode Image', 'GPUTask'];
  let frameStates = {}; let elemsRecalc = 0; let layoutObjects = 0;
  const layoutRoots = {};
  // window: trace ts are in µs on a monotonic clock; align by first/last FireAnimationFrame in window passed from page? Use marker events.
  for (const e of ev) {
    if (e.ts < winStartUs || e.ts > winEndUs) continue;
    const th = threads[`${e.pid}:${e.tid}`];
    if (e.name === 'PipelineReporter' && e.ph === 'b' && e.args?.chrome_frame_reporter) {
      const st = e.args.chrome_frame_reporter.state; frameStates[st] = (frameStates[st] || 0) + 1;
    }
    if (`${e.pid}:${e.tid}` !== main) {
      if (want.includes(e.name) && e.pid == mainPid && (e.ph === 'X' || e.ph === 'B')) { const k = `${th}:${e.name}`; counts[k] = (counts[k] || 0) + 1; durs[k] = (durs[k] || 0) + (e.dur || 0) / 1000; }
      if (e.name === 'RasterTask' && (e.ph === 'X')) { const k = `raster:${e.name}`; counts[k] = (counts[k] || 0) + 1; durs[k] = (durs[k] || 0) + (e.dur || 0) / 1000; }
      continue;
    }
    if (want.includes(e.name) && (e.ph === 'X' || e.ph === 'B')) { counts[e.name] = (counts[e.name] || 0) + 1; durs[e.name] = (durs[e.name] || 0) + (e.dur || 0) / 1000; }
    if (e.name === 'UpdateLayoutTree' && e.args?.elementCount) elemsRecalc += e.args.elementCount;
    if (e.name === 'Layout' && e.ph === 'X' && e.args?.endData) { layoutObjects += e.args.beginData?.dirtyObjects || 0; const root = e.args.endData.layoutRoots?.[0]?.nodeName || e.args.endData.rootNode; if (root) layoutRoots[root] = (layoutRoots[root] || 0) + 1; }
  }
  for (const k of Object.keys(durs)) durs[k] = +durs[k].toFixed(1);
  return { mainThread: main, counts, durMs: durs, frameStates, styleElementsRecalculated: elemsRecalc, layoutDirtyObjects: layoutObjects, layoutRoots };
}

async function findBlank(page) {
  return page.evaluate(() => {
    const W = innerWidth, H = innerHeight;
    for (const [x, y] of [[W * 0.5, H * 0.04], [W * 0.98, H * 0.5], [W * 0.02, H * 0.5], [W * 0.5, H * 0.5], [W * 0.75, H * 0.3]]) {
      const el = document.elementFromPoint(x, y);
      if (el && !el.closest('button,a,input,[role=button],[role=slider],canvas,.glass-dock,[tabindex]')) return [x, y];
    }
    return [W - 3, H - 3];
  });
}

async function measure(page, browser, name, action, settle, files) {
  await page.evaluate(() => window.__od14.arm());
  const tfile = path.join(files, `${name}.trace.json`);
  await browser.startTracing(page, { path: tfile, categories: CATS.split(','), screenshots: false });
  // trace-clock anchor: console.timeStamp produces a TimeStamp event in the trace at a known performance.now
  const a0 = await page.evaluate(() => { console.timeStamp('od14-start'); return performance.now(); });
  let actStart = await page.evaluate(() => performance.now());
  const actRes = await action();
  if (actRes?.classFlipAt > 0) actStart = actRes.classFlipAt;
  // sample running animations at several points during the transition
  let nA = 0;
  for (const d of [16, 60, 120, 220]) { nA += await page.evaluate((tag) => window.__od14.sampleAnims(tag), `+${d}`); await page.waitForTimeout(d === 16 ? 40 : 50); }
  // wait until settled: no data-morphing and no running dock animations (bounded)
  const settledAt = await page.evaluate(async (maxMs) => {
    const t0 = performance.now();
    while (performance.now() - t0 < maxMs) {
      await new Promise((r) => requestAnimationFrame(r));
      const d = document.querySelector('.glass-dock');
      const running = document.getAnimations().filter((a) => a.playState === 'running' && a.effect?.target?.closest?.('.glass-dock,[data-dismissable-layer]') && a.timeline === document.timeline && a.effect.getTiming().iterations !== Infinity);
      if (!d?.hasAttribute('data-morphing') && running.length === 0 && performance.now() - t0 > 150) return performance.now();
    }
    return performance.now();
  }, settle);
  await page.waitForTimeout(120);
  const a1 = await page.evaluate(() => { console.timeStamp('od14-end'); return performance.now(); });
  const data = await page.evaluate(() => window.__od14.stop());
  await browser.stopTracing();
  // align: find TimeStamp events
  const raw = JSON.parse(fs.readFileSync(tfile, 'utf8')); const ev = raw.traceEvents || raw;
  const ts = ev.filter((e) => e.name === 'TimeStamp');
  const s = ts.find((e) => e.args?.data?.message === 'od14-start'); const e2 = ts.find((e) => e.args?.data?.message === 'od14-end');
  const toUs = (pn) => s.ts + (pn - a0) * 1000;
  const winStartUs = toUs(actStart), winEndUs = toUs(settledAt + 34);
  const tr = s && e2 ? parseTrace(tfile, winStartUs, winEndUs) : { error: 'no anchor' };
  // rAF deltas inside [actStart, settledAt]
  const r = data.raf.filter((t) => t >= actStart - 1 && t <= settledAt + 1);
  const deltas = r.slice(1).map((t, i) => t - r[i]);
  const dropped = deltas.reduce((n, d) => n + Math.max(0, Math.round(d / 16.667) - 1), 0);
  const winMs = settledAt - actStart;
  const loafIn = data.loaf.filter((l) => l.start + l.dur >= actStart && l.start <= settledAt);
  const ltIn = data.lt.filter((l) => l.start + l.dur >= actStart && l.start <= settledAt);
  // animation dedupe
  const am = {};
  for (const a of data.anims) { const k = `${a.kind}|${a.el}${a.pseudo}|${a.name}|${a.props.join('+')}|${a.timeline}`; if (!am[k]) am[k] = { ...a, seenAt: [] }; am[k].seenAt.push(a.tag); }
  const anims = Object.values(am).map(({ tag, ...x }) => x);
  // RO: per-element resize counts in window
  const ro = {}; for (const x of data.ro) if (x.t >= actStart && x.t <= settledAt + 34) { ro[x.el] = ro[x.el] || { n: 0, first: null, last: null }; ro[x.el].n++; if (ro[x.el].prev) { const dw = Math.abs(x.w - ro[x.el].prev[0]); if (dw > (ro[x.el].maxStepW || 0)) ro[x.el].maxStepW = +dw.toFixed(1); } ro[x.el].first ??= [x.w, x.h]; ro[x.el].last = [x.w, x.h]; ro[x.el].prev = [x.w, x.h]; }
  const mo = {}; for (const x of data.mo) if (x.t >= actStart && x.t <= settledAt + 34) { const k = `${x.el}@${x.attr}`; mo[k] = mo[k] || { n: 0, sample: x.v }; mo[k].n++; }
  const frames = tr.counts?.FireAnimationFrame ?? null;
  const perFrame = (k) => (tr.counts && r.length > 1 ? +((tr.counts[k] || 0) / (r.length - 1)).toFixed(2) : null);
  const big = fs.statSync(tfile).size;
  return {
    transition: name, action: actRes, windowMs: +winMs.toFixed(1), rafFrames: r.length, rafDeltaMs: stats(deltas), droppedFramesAt60: dropped,
    expectedFramesAt60: Math.round(winMs / 16.667),
    longAnimationFrames: loafIn.map((l) => ({ startRel: +(l.start - actStart).toFixed(1), dur: +l.dur.toFixed(1), block: +(l.block || 0).toFixed(1), styleLayoutMs: l.style && l.render ? +(l.start + l.dur - l.style).toFixed(1) : null, scripts: l.scripts })),
    longTasks: ltIn.map((l) => ({ startRel: +(l.start - actStart).toFixed(1), dur: +l.dur.toFixed(1) })),
    animations: anims,
    resizeObserved: Object.fromEntries(Object.entries(ro).map(([k, { prev, ...v }]) => [k, v])),
    attrMutations: mo,
    trace: { ...tr, perRafFrame: { UpdateLayoutTree: perFrame('UpdateLayoutTree'), Layout: perFrame('Layout'), PrePaint: perFrame('PrePaint'), Paint: perFrame('Paint'), Commit: perFrame('Commit') }, fileBytes: big, file: tfile },
  };
}

const GPU = process.env.GPU === '1';
// GPU witness: headless shell with ANGLE-Metal so the compositor is not SoftwareRenderer (named need: frame timing on a real GPU path).
const browser = await chromium.launch({ args: ['--enable-features=LongAnimationFrameTiming', ...(GPU ? ['--use-angle=metal', '--enable-gpu', '--ignore-gpu-blocklist', '--enable-gpu-rasterization'] : [])] });
const results = { label, url, when: new Date().toISOString(), ua: null, cells: [] };
try {
  for (const cell of CELLS.filter((c) => !process.env.ONLY || c.name === process.env.ONLY)) {
    const ctx = await browser.newContext({ viewport: cell.viewport, deviceScaleFactor: cell.dpr, colorScheme: 'dark', isMobile: cell.mobile, hasTouch: cell.mobile });
    const files = path.join(outdir, `${label}-${cell.name}`); fs.mkdirSync(files, { recursive: true });
    const out = { cell: cell.name, viewport: cell.viewport, dpr: cell.dpr, transitions: [], notes: [] };
    try {
      await ctx.addInitScript(INSTR);
      const page = await ctx.newPage();
      results.ua ??= await page.evaluate(() => navigator.userAgent).catch(() => null);
      await page.goto(url, { waitUntil: 'load', timeout: 90000 });
      await page.waitForSelector('.glass-dock', { timeout: 60000 });
      await page.waitForTimeout(4000);
      out.hz = await page.evaluate(async () => { const t = []; await new Promise((res) => { const f = (x) => { t.push(x); t.length < 61 ? requestAnimationFrame(f) : res(); }; requestAnimationFrame(f); }); const d = t.slice(1).map((x, i) => x - t[i]).sort((a, b) => a - b); return { idleRafP50: +d[30].toFixed(2) }; });
      const dock = page.locator('.glass-dock').first();
      const state = async () => page.evaluate(() => { const d = document.querySelector('.glass-dock'); return d ? { cls: d.className, layer: document.querySelector('.dock-layer-group, [data-active-layer]')?.getAttribute('data-active-layer') ?? null } : null; });
      out.initialState = await state();
      const blank = await findBlank(page);
      for (let rep = 1; rep <= REPS; rep++) {
        if (!cell.mobile) {
          // ensure expanded first (hover)
          const box = await dock.boundingBox();
          // COLLAPSE: move away; GlassDock collapses after its idle delay (3600ms). The window starts at the class flip.
          await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2); await page.waitForTimeout(800);
          const isExp = await page.evaluate(() => document.querySelector('.glass-dock').classList.contains('expanded'));
          if (isExp) {
            out.transitions.push({ rep, ...(await measure(page, browser, `collapse-r${rep}`, async () => {
              await page.mouse.move(blank[0], blank[1]);
              const t = await page.evaluate(() => new Promise((res) => { const d = document.querySelector('.glass-dock'); const mo = new MutationObserver(() => { if (d.classList.contains('collapsed')) { mo.disconnect(); res(performance.now()); } }); mo.observe(d, { attributes: true, attributeFilter: ['class'] }); setTimeout(() => res(-1), 8000); }));
              return { how: 'mouse leaves dock; idle collapse (DOCK_COLLAPSE_DELAY_MS)', classFlipAt: t };
            }, 2500, files)) });
            // re-anchor collapse window: measure() starts the window at action start (includes the 3.6 s idle). Fix below.
          } else out.notes.push(`rep${rep}: dock not expanded on hover; collapse skipped`);
          await page.waitForTimeout(600);
          const box2 = await dock.boundingBox();
          out.transitions.push({ rep, ...(await measure(page, browser, `expand-r${rep}`, async () => {
            await page.mouse.move(box2.x + box2.width / 2, box2.y + box2.height / 2, { steps: 2 });
            return { how: 'mouse enters collapsed dock (hover expand)' };
          }, 2500, files)) });
          await page.waitForTimeout(500);
        }
        const clickT = async (nm, loc, how, settle = 2500) => {
          if (await loc.count() && await loc.first().isVisible()) { out.transitions.push({ rep, ...(await measure(page, browser, `${nm}-r${rep}`, async () => { try { await loc.first().click({ timeout: 4000 }); return { how }; } catch { await loc.first().focus(); await page.keyboard.press('Enter'); return { how: how + ' [pointer intercepted -> keyboard Enter]' }; } }, settle, files)) }); await page.waitForTimeout(600); return true; }
          out.notes.push(`rep${rep}: ${nm} control not visible`); return false;
        };
        const G = (n) => page.locator('.glass-dock').getByRole('button', { name: n, exact: true });
        await clickT('face-to-actionbar', G('Toggle action bar'), 'main face -> action-bar layer ("Toggle action bar")');
        await clickT('actionbar-to-input', G('Open color input'), 'action bar -> colour input ("Open color input")');
        await clickT('input-to-actionbar', G('Close input'), 'colour input -> action bar ("Close input")');
        await clickT('actionbar-to-face', G('Back'), 'action-bar layer -> main face ("Back")');
        if (await clickT('menu-open', page.locator('.glass-dock [aria-haspopup=menu]:visible'), 'open the dock menu (first visible [aria-haspopup=menu])', 2000)) { await page.keyboard.press('Escape'); await page.waitForTimeout(700); }
        else if (await clickT('menu-open', page.locator('.glass-dock [aria-haspopup]:visible'), 'open the dock popup (first visible [aria-haspopup])', 2000)) { await page.keyboard.press('Escape'); await page.waitForTimeout(700); }
      }
      out.finalState = await state();
      await page.screenshot({ path: path.join(files, 'final.png') });
    } catch (e) { out.error = String(e?.stack || e).slice(0, 800); }
    finally { await ctx.close(); }
    results.cells.push(out);
  }
} finally { await browser.close(); }
fs.writeFileSync(path.join(outdir, `${label}.json`), JSON.stringify(results, null, 1));
console.log('wrote', path.join(outdir, `${label}.json`));
