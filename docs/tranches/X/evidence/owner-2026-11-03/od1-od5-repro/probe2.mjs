import { createRequire } from 'module';
const require = createRequire('/Users/mkbabb/Programming/value.js/package.json');
const { chromium } = require('playwright');
const out = process.env.HOME + '/.dev-logs/x-0hh/od1-od5/';
const targets = [['dev','http://localhost:9000'],['prod','https://color.babb.dev']];
const browser = await chromium.launch();
const sampler = () => {
  window.__frames = [];
  const t0 = performance.now();
  const tick = () => {
    const d = document.querySelector('.glass-dock'); const p = d?.querySelector('.dock-plate');
    const w = d?.querySelector('.dock-seal-wax'); const run = d?.querySelector('.dock-run');
    if (d && p) {
      const cd = getComputedStyle(d), cp = getComputedStyle(p);
      const r = d.getBoundingClientRect(), pr = p.getBoundingClientRect();
      window.__frames.push({ t: Math.round(performance.now()-t0), cls: d.className.replace(/glass-dock|horizontal|shape-pill|fit-content/g,'').trim(), morph: d.hasAttribute('data-morphing'), scale: cd.scale, mt: cd.getPropertyValue('--dock-morph-t').trim().slice(0,6), dw: Math.round(r.width), dh: Math.round(r.height), pw: Math.round(pr.width), ph: Math.round(pr.height), dbr: cd.borderRadius, pbr: cp.borderStartStartRadius + ' / ' + cp.borderEndEndRadius, clip: cp.clipPath, wax: w ? Math.round(w.getBoundingClientRect().width)+'x'+Math.round(w.getBoundingClientRect().height) + ' ' + getComputedStyle(w).borderRadius.slice(0,30) : '', run: run ? run.scrollWidth + '/' + run.clientWidth + '@' + Math.round(run.scrollLeft) : '' });
    }
    if (performance.now() - t0 < 6500) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};
try {
  for (const [tag, base] of targets) {
    for (const vp of [{ name: 'desk', viewport: { width: 1800, height: 1000 }, deviceScaleFactor: 2 }, { name: 'mob', viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true }]) {
      const ctx = await browser.newContext({ viewport: vp.viewport, deviceScaleFactor: vp.deviceScaleFactor, isMobile: vp.isMobile, hasTouch: vp.hasTouch, colorScheme: 'dark' });
      try {
        const page = await ctx.newPage();
        page.on('pageerror', e => console.log(tag, 'PAGEERROR', e.message.slice(0,150)));
        await page.goto(base + '/', { waitUntil: 'load', timeout: 60000 });
        await page.waitForSelector('.glass-dock'); await page.waitForTimeout(4000);
        const dock = page.locator('.glass-dock').first();
        const shot = async (name) => { const b = await dock.boundingBox(); await page.screenshot({ path: `${out}${tag}-${vp.name}-${name}.png`, clip: { x: Math.max(0,b.x - 40), y: Math.max(0, b.y - 20), width: Math.min(vp.viewport.width - Math.max(0,b.x-40), b.width + 80), height: b.height + 40 } }); };
        await shot('rest');
        const tgl = page.getByRole('button', { name: 'Toggle action bar' });
        if (await tgl.count()) {
          await tgl.first().click({ timeout: 10000 }); await page.waitForTimeout(900);
          const plateBefore = await page.evaluate(() => { const p = document.querySelector('.dock-plate'); const run = document.querySelector('.dock-run'); return getComputedStyle(p).borderRadius + ' run ' + run.scrollWidth + '/' + run.clientWidth + '@' + run.scrollLeft + ' anims=' + p.getAnimations().map(a=>a.animationName+':'+a.playState+':'+(a.timeline?.constructor?.name)).join(','); });
          console.log(tag, vp.name, 'ACTIONS plate', plateBefore);
          await shot('actions');
          await page.getByRole('button', { name: 'Open color input' }).first().click({ timeout: 10000 }); await page.waitForTimeout(1500);
          const plate = await page.evaluate(() => { const p = document.querySelector('.dock-plate'); const run = document.querySelector('.dock-run'); const d = document.querySelector('.glass-dock'); const pr = p.getBoundingClientRect(); return `${getComputedStyle(p).borderRadius} | plate ${Math.round(pr.width)}x${Math.round(pr.height)} | dock br ${getComputedStyle(d).borderRadius} | run ${run.scrollWidth}/${run.clientWidth}@${run.scrollLeft} pitch=${getComputedStyle(d).getPropertyValue('--dock-pitch')} | anims=` + p.getAnimations().map(a=>a.animationName+':'+a.playState+':'+a.timeline?.constructor?.name+':'+(a.timeline?.currentTime?.value ?? a.timeline?.currentTime)).join(','); });
          console.log(tag, vp.name, 'INPUT plate', plate);
          await shot('input');
          if (vp.name === 'desk') {
            // collapse sequence: leave the dock, sample per rAF
            await page.mouse.move(vp.viewport.width/2, vp.viewport.height - 50);
            await page.locator('body').click({ position: { x: 30, y: vp.viewport.height - 30 } }).catch(()=>{});
          }
        }
        if (vp.name === 'desk') {
          await page.mouse.move(vp.viewport.width/2, vp.viewport.height - 50);
          await page.evaluate(sampler);
          for (let i = 0; i < 12; i++) { await page.waitForTimeout(450); await shot('c' + String(i).padStart(2,'0')); }
          const fr = await page.evaluate(() => window.__frames);
          // print only changed frames
          let last = '';
          for (const f of fr) { const k = JSON.stringify({...f, t: 0}); if (k !== last) { console.log(tag, 'F', JSON.stringify(f)); last = k; } }
          await shot('collapsed');
          // expand again via click on seal, sample
          await page.evaluate(sampler);
          await dock.click({ timeout: 5000 }).catch(e=>console.log('click fail', e.message.slice(0,80)));
          await page.waitForTimeout(1500);
          const fr2 = await page.evaluate(() => window.__frames); last='';
          for (const f of fr2) { const k = JSON.stringify({...f, t: 0}); if (k !== last) { console.log(tag, 'E', JSON.stringify(f)); last = k; } }
        }
      } finally { await ctx.close(); }
    }
  }
} finally { await browser.close(); }
