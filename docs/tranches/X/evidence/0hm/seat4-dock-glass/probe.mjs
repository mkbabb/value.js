// RR-1 seat 4: glass dock + transitions inventory per app. One browser per run; context per cell; close in finally.
// GPU flags: named need = frame timing on a real GPU compositor (OD-14 README showed SwiftShader is compositor-bound).
import { chromium } from '/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs';
import fs from 'node:fs';
const [app, url, out] = process.argv.slice(2);
const CELLS = [
  { n: 'd1440-dark', vp: { width: 1440, height: 900 }, dpr: 1, m: false, cs: 'dark' },
  { n: 'd1800-light', vp: { width: 1800, height: 1000 }, dpr: 2, m: false, cs: 'light' },
  { n: 'm390-dark', vp: { width: 390, height: 844 }, dpr: 2, m: true, cs: 'dark' },
  { n: 'm430-light', vp: { width: 430, height: 932 }, dpr: 2, m: true, cs: 'light' },
  { n: 'l844-dark', vp: { width: 844, height: 390 }, dpr: 2, m: true, cs: 'dark' },
];
const browser = await chromium.launch({ args: ['--use-angle=metal', '--enable-gpu', '--ignore-gpu-blocklist', '--enable-gpu-rasterization'] });
const res = { app, url, cells: {} };
const INV = () => {
  const r = (el) => { const b = el.getBoundingClientRect(); return [+b.x.toFixed(1), +b.y.toFixed(1), +b.width.toFixed(1), +b.height.toFixed(1)]; };
  return [...document.querySelectorAll('.glass-dock')].map((d) => {
    const p = d.querySelector('.dock-plate'); const run = d.querySelector('.dock-run');
    const ps = p ? getComputedStyle(p) : null;
    const runs = [...d.querySelectorAll('.dock-run')].map((x) => ({ sw: x.scrollWidth, cw: x.clientWidth, sl: Math.round(x.scrollLeft) }));
    const anims = d.getAnimations({ subtree: true }).map((a) => ({ el: (a.effect.target.className?.baseVal ?? a.effect.target.className ?? '').toString().slice(0, 40), name: a.animationName || a.transitionProperty, tl: a.timeline && a.timeline !== document.timeline ? a.timeline.constructor.name : 'doc', st: a.playState }));
    return { cls: d.className.slice(0, 120), aria: d.getAttribute('aria-label'), box: r(d), plate: p ? r(p) : null,
      radius: ps ? [ps.borderTopLeftRadius, ps.borderTopRightRadius, ps.borderBottomRightRadius, ps.borderBottomLeftRadius].join(' | ') : null,
      clip: ps?.clipPath?.slice(0, 50), bf: ps?.backdropFilter?.slice(0, 40), runs, anims: anims.slice(0, 12), nAnims: anims.length };
  });
};
const TOKENS = () => {
  const out = {}; const cs = getComputedStyle(document.documentElement);
  for (const sh of document.styleSheets) { let rules; try { rules = sh.cssRules; } catch { continue; }
    const walk = (rs) => { for (const ru of rs) { if (ru.cssRules) walk(ru.cssRules); if (!ru.style) continue;
      for (const p of ru.style) if (p.startsWith('--') && /(ease|dur|spring|motion|stagger)/i.test(p) && !(p in out)) out[p] = cs.getPropertyValue(p).trim().slice(0, 60); } };
    walk(rules); }
  return out;
};
const sampleOverlay = () => {
  const els = document.querySelectorAll('[role=menu],[role=listbox],[role=dialog],[role=tooltip],[data-reka-popper-content-wrapper] > *,.glass-reveal');
  const o = [];
  for (const el of els) for (const a of el.getAnimations({ subtree: true })) {
    let props = []; try { props = [...new Set(a.effect.getKeyframes().flatMap((k) => Object.keys(k).filter((x) => !['offset', 'easing', 'composite', 'computedOffset'].includes(x))))]; } catch {}
    const t = a.effect.getTiming(); const kfE = (() => { try { return a.effect.getKeyframes().map((k) => k.easing).filter((e) => e && e !== 'linear').slice(0, 2); } catch { return []; } })();
    o.push({ role: el.getAttribute('role') || el.className.toString().slice(0, 30), kind: a.constructor.name, name: a.animationName || a.transitionProperty, props, dur: t.duration, ease: t.easing, kfE, st: a.playState });
  }
  return o;
};
try {
  for (const c of CELLS) {
    const ctx = await browser.newContext({ viewport: c.vp, deviceScaleFactor: c.dpr, colorScheme: c.cs, isMobile: c.m, hasTouch: c.m });
    const R = (res.cells[c.n] = {});
    try {
      const page = await ctx.newPage();
      await page.goto(url, { waitUntil: 'load', timeout: 90000 });
      try { await page.waitForSelector('.glass-dock', { timeout: 30000 }); } catch { R.noDock = true; }
      await page.waitForTimeout(3500);
      R.inv0 = await page.evaluate(INV);
      if (c.n === 'd1440-dark') R.tokens = await page.evaluate(TOKENS);
      const dock = page.locator('.glass-dock').first();
      const bb = await dock.boundingBox().catch(() => null);
      if (bb) await page.screenshot({ path: `${out}-${c.n}-dock.png`, clip: { x: Math.max(0, bb.x - 24), y: Math.max(0, bb.y - 24), width: Math.min(c.vp.width - Math.max(0, bb.x - 24), bb.width + 48), height: Math.min(c.vp.height - Math.max(0, bb.y - 24), bb.height + 48) } });
      if (c.n === 'm390-dark' || c.n === 'l844-dark') await page.screenshot({ path: `${out}-${c.n}-full.png` });
      // desktop: idle collapse check
      if (!c.m && bb) {
        await page.mouse.move(bb.x + bb.width / 2, bb.y + bb.height / 2); await page.waitForTimeout(600);
        await page.mouse.move(5, c.vp.height / 2); await page.waitForTimeout(5200);
        R.invIdle = await page.evaluate(INV);
        const b2 = await dock.boundingBox();
        if (b2) await page.screenshot({ path: `${out}-${c.n}-idle.png`, clip: { x: Math.max(0, b2.x - 24), y: Math.max(0, b2.y - 24), width: b2.width + 48, height: b2.height + 48 } });
        await page.mouse.move(b2.x + b2.width / 2, b2.y + b2.height / 2); await page.waitForTimeout(1200);
      }
      // menu open: first visible haspopup in a dock
      const trig = page.locator('.glass-dock [aria-haspopup]').filter({ visible: true }).first();
      if (await trig.count()) {
        R.trigger = await trig.getAttribute('aria-label');
        await page.evaluate(() => { const S = (window.__s = { raf: [], on: true }); const f = (t) => { if (!S.on) return; S.raf.push(t); requestAnimationFrame(f); }; requestAnimationFrame(f); });
        try { await trig.click({ timeout: 4000 }); } catch (e) { R.trigErr = String(e).slice(0, 160); try { await trig.dispatchEvent('click'); } catch {} }
        const samples = [];
        for (const w of [30, 90, 200]) { await page.waitForTimeout(w === 30 ? 30 : w - 30); samples.push({ at: w, a: await page.evaluate(sampleOverlay) }); }
        await page.waitForTimeout(250);
        R.menu = { samples, raf: await page.evaluate(() => { window.__s.on = false; const r = window.__s.raf; const d = r.slice(1).map((x, i) => x - r[i]).sort((a, b) => a - b); return { n: d.length, p50: d[d.length >> 1], p95: d[Math.floor(d.length * 0.95)], max: d[d.length - 1] }; }) };
        const mb = await page.locator('[role=menu]').filter({ visible: true }).first().boundingBox().catch(() => null);
        R.menu.box = mb;
        if (mb && (c.n === 'd1440-dark' || c.n === 'm390-dark')) await page.screenshot({ path: `${out}-${c.n}-menu.png`, clip: { x: Math.max(0, Math.min(mb.x, bb.x) - 16), y: Math.max(0, Math.min(mb.y, bb.y) - 16), width: Math.min(c.vp.width, Math.max(mb.x + mb.width, bb.x + bb.width) - Math.min(mb.x, bb.x) + 32), height: Math.min(c.vp.height - Math.max(0, Math.min(mb.y, bb.y) - 16), Math.max(mb.y + mb.height, bb.y + bb.height) - Math.min(mb.y, bb.y) + 32) } });
        await page.keyboard.press('Escape'); await page.waitForTimeout(40);
        R.menuExit = await page.evaluate(sampleOverlay);
        await page.waitForTimeout(500);
      }
      // tooltip on hover (desktop)
      if (!c.m) {
        const btn = page.locator('.glass-dock button').filter({ visible: true }).nth(1);
        if (await btn.count()) {
          await btn.hover().catch(() => {});
          const t0 = Date.now(); let tip = null;
          for (let i = 0; i < 40; i++) { tip = await page.evaluate(() => { const t = [...document.querySelectorAll('[role=tooltip]')].find((x) => x.getBoundingClientRect().width > 0); return t ? t.textContent.trim().slice(0, 30) : null; }); if (tip) break; await page.waitForTimeout(50); }
          R.tooltip = { text: tip, appearMs: tip ? Date.now() - t0 : null, anims: await page.evaluate(sampleOverlay) };
          R.hoverBtn = await btn.evaluate((b) => { const s = getComputedStyle(b); return { scale: s.scale, tr: s.transitionProperty.slice(0, 90), dur: s.transitionDuration.slice(0, 60), ease: s.transitionTimingFunction.slice(0, 90) }; });
          await page.mouse.down(); await page.waitForTimeout(80);
          R.pressBtn = await btn.evaluate((b) => getComputedStyle(b).scale);
          await page.mouse.up();
        }
      }
    } catch (e) { R.err = String(e).slice(0, 300); } finally { await ctx.close(); }
  }
} finally { await browser.close(); }
fs.writeFileSync(out + '.json', JSON.stringify(res, null, 1));
console.log('wrote', out);
