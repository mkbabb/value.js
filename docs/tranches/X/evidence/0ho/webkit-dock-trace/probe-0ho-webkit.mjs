// OD-18 WebKit dock trace witness (COHESION §0ho; glass O-132). READ-ONLY on glass.
// Idiom: ../../../owner-2026-11-03/od14-dock-trace/probe-od14-geom.mjs, ported to Playwright WebKit.
// Per rAF frame: dt, plate border-radius (4 corners, computed + resolved px), plate inline/block size
// (layout box + painted rect), root/plate scale + transform, --dock-morph-t, data-morphing, active face.
// Reading computed style per frame forces style/layout, so the dt here is an upper bound of the un-instrumented path.
// One browser per run, a context per cell, everything closed in finally.
// usage: guarded --exclusive webkit -- node probe-0ho-webkit.mjs <label> <url> <out.json>
import { webkit } from '/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs';
import fs from 'node:fs';

const [label, url, out] = process.argv.slice(2);
const CELLS = [
  { name: 'desktop', vp: { width: 1440, height: 900 }, dpr: 2, m: false },
  { name: 'mobile', vp: { width: 390, height: 844 }, dpr: 3, m: true },
].filter((c) => !process.env.ONLY || c.name === process.env.ONLY);

const SAMPLER = () => {
  const px = (v, basis) => { v = v.trim(); return v.endsWith('%') ? (parseFloat(v) / 100) * basis : parseFloat(v) || 0; };
  const corner = (s, w, h) => { const [a, b = a] = s.split(/\s+/); return [px(a, w), px(b, h)]; };
  window.__w = {
    start(tag) {
      const S = (this.S = { tag, rows: [], stop: false });
      let last = null;
      const f = (ts) => {
        if (S.stop) return;
        const d = document.querySelector('.glass-dock');
        const p = d && d.querySelector('.dock-plate');
        if (d && p) {
          const pr = p.getBoundingClientRect();
          const cs = getComputedStyle(d), ps = getComputedStyle(p);
          const w = p.offsetWidth, h = p.offsetHeight;
          const raw = [ps.borderTopLeftRadius, ps.borderTopRightRadius, ps.borderBottomRightRadius, ps.borderBottomLeftRadius];
          let c = raw.map((s) => corner(s, w, h));
          // CSS corner-overlap rule: scale every radius by f = min(side / sum of radii on it) when f < 1
          const sums = [c[0][0] + c[1][0], c[3][0] + c[2][0], c[0][1] + c[3][1], c[1][1] + c[2][1]];
          const fct = Math.min(1, w / (sums[0] || 1e9), w / (sums[1] || 1e9), h / (sums[2] || 1e9), h / (sums[3] || 1e9));
          c = c.map(([x, y]) => [+(x * fct).toFixed(2), +(y * fct).toFixed(2)]);
          const sx = w ? pr.width / w : 1, sy = h ? pr.height / h : 1;
          const faces = [...d.querySelectorAll('.dock-face')].map((x) => `${x.classList.contains('is-active') ? 'A' : x.classList.contains('is-leaving') ? 'L' : '-'}${(+getComputedStyle(x).opacity).toFixed(2)}`).join(' ');
          S.rows.push({
            t: +ts.toFixed(2), dt: last == null ? null : +(ts - last).toFixed(2),
            morph: d.hasAttribute('data-morphing') ? 1 : 0, cls: d.className.split(/\s+/).filter((k) => /collapsed|expanded|morph/.test(k)).join(' '),
            mt: cs.getPropertyValue('--dock-morph-t').trim().slice(0, 6),
            rootScale: cs.scale, rootTransform: cs.transform, plateScale: ps.scale, plateTransform: ps.transform,
            inline: w, block: h, paintW: +pr.width.toFixed(2), paintH: +pr.height.toFixed(2), paintX: +pr.x.toFixed(2), sx: +sx.toFixed(4), sy: +sy.toFixed(4),
            radiusRaw: raw, radiusPx: c, paintR: c.map(([x, y]) => [+(x * sx).toFixed(2), +(y * sy).toFixed(2)]), faces,
          });
        }
        last = ts;
        requestAnimationFrame(f);
      };
      requestAnimationFrame(f);
    },
    stop() { this.S.stop = true; return this.S.rows; },
  };
};

const browser = await webkit.launch();
const res = { label, url, when: new Date().toISOString(), ua: null, cells: {} };
try {
  for (const cell of CELLS) {
    const ctx = await browser.newContext({ viewport: cell.vp, deviceScaleFactor: cell.dpr, colorScheme: 'dark', isMobile: cell.m, hasTouch: cell.m });
    const R = (res.cells[cell.name] = { viewport: cell.vp, dpr: cell.dpr, reps: [], notes: [] });
    try {
      await ctx.addInitScript(SAMPLER);
      const page = await ctx.newPage();
      await page.goto(url, { waitUntil: 'load', timeout: 90000 });
      await page.waitForSelector('.glass-dock .dock-plate', { timeout: 60000 });
      await page.waitForTimeout(4000);
      res.ua ??= await page.evaluate(() => navigator.userAgent);
      R.bundle = await page.evaluate(() => [...document.scripts].map((s) => s.src).find((s) => /index-.*\.js/.test(s)) || null);
      R.dom = await page.evaluate(() => { const d = document.querySelector('.glass-dock'); return { cls: d.className, buttons: [...d.querySelectorAll('button')].filter((b) => b.offsetParent).map((b) => (b.getAttribute('aria-label') || b.textContent.trim()).slice(0, 30)) }; });
      const cls = () => page.evaluate(() => document.querySelector('.glass-dock').className);
      const settled = () => page.evaluate(() => !document.querySelector('.glass-dock').hasAttribute('data-morphing'));
      const G = (n) => page.locator('.glass-dock').getByRole('button', { name: n, exact: true }).first();
      const click = async (loc) => { if (cell.m) await loc.tap({ timeout: 5000 }); else await loc.click({ timeout: 5000 }); };
      for (let rep = 1; rep <= 2; rep++) {
        const P = {};
        const step = async (name, act, tail = 700) => {
          try {
            await page.evaluate((n) => window.__w.start(n), name);
            const tAct = await page.evaluate(() => performance.now());
            const how = await act();
            // settle: data-morphing cleared, then a fixed tail to catch post-settle snaps
            for (let i = 0; i < 100 && !(await settled()); i++) await page.waitForTimeout(30);
            await page.waitForTimeout(tail);
            P[name] = { how, tAct, rows: await page.evaluate(() => window.__w.stop()) };
          } catch (e) { P[name] = { error: String(e).slice(0, 300) }; try { await page.evaluate(() => window.__w.stop()); } catch {} }
        };
        if (!cell.m) {
          const b = await page.locator('.glass-dock').first().boundingBox();
          await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2); await page.waitForTimeout(900);
          await step('collapse', async () => {
            await page.mouse.move(cell.vp.width - 5, cell.vp.height / 2);
            let i = 0; for (; i < 200 && !(await cls()).includes('collapsed'); i++) await page.waitForTimeout(30);
            return `mouse leaves; idle collapse; class flip after ~${i * 30} ms polling`;
          }, 900);
          const b1 = await page.locator('.glass-dock').first().boundingBox();
          await step('expand', async () => { await page.mouse.move(b1.x + b1.width / 2, b1.y + b1.height / 2, { steps: 2 }); return 'hover expand'; });
        }
        // tool click: main face -> action-bar (the Tools face swap), then back
        await step('tool-open', async () => { await click(G('Toggle action bar')); return 'Tools ("Toggle action bar"): main face -> action-bar face'; });
        await step('tool-back', async () => { await click(G('Back')); return '"Back": action-bar face -> main face'; });
        // view switch via the view select (palettes / mix / gradient): the dock face re-seats for the new view
        const target = rep === 1 ? /mix/i : /gradient/i;
        await step('view-switch', async () => {
          await click(page.locator('.glass-dock .view-select-trigger').first());
          await page.waitForTimeout(500);
          const item = page.getByRole('menuitemradio', { name: target }).or(page.getByRole('menuitem', { name: target })).or(page.getByRole('option', { name: target })).first();
          await click(item);
          return `view select -> ${target}`;
        }, 1000);
        R.reps.push(P);
        if (!cell.m) { await page.waitForTimeout(300); }
      }
    } catch (e) { R.error = String(e?.stack || e).slice(0, 800); }
    finally { await ctx.close(); }
  }
} finally { await browser.close(); }
fs.writeFileSync(out, JSON.stringify(res));
console.log('wrote', out);
