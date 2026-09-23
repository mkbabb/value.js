// SERVED MODEL: claude-opus-5-5 — KF.W13U.d2 (OA-32): the chosen scene's dock icon, headed real GPU.
// usage: node probe-icon.mjs <base> <tag> [reduce]
// Per scene, at each site: the chosen icon's box at t0 and t0+1s; pixels changed INSIDE the box
// and in a 6px ring OUTSIDE it (motion must never paint there); the glyph's layer order
// ([data-layer] in paint order); running WAAPI animations in the glyph subtree.
import { chromium } from '/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs';
import { PNG } from '/Users/mkbabb/Programming/keyframes.js/node_modules/pngjs/lib/png.js';
import fs from 'node:fs';
const base = process.argv[2] || 'http://localhost:5173/'; const tag = process.argv[3] || 'run';
const reduce = process.argv[4] === 'reduce';
const RING = 6;
const b = await chromium.launch({ headless: false, args: ['--ignore-gpu-blocklist'] });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: reduce ? 'reduce' : 'no-preference' });
const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(String(e).slice(0, 160)));
const out = { base, reduce, scenes: {} };
// The chosen scene's icon renders at TWO sites: the collapsed face (visible at
// rest) and the expanded trigger (visible while the dock is open). Both are read.
const SITES = {
  rest: { sel: 'button[aria-label="Scene"]:not([role=combobox]) .dock-glyph', prep: async () => { await p.mouse.move(700, 880); await p.waitForTimeout(5500); /* KF.W13R.v instrument variant: 10.0.1 idles every dock one 3600 ms window (collapseDelay folded into the producer), so the 3000 ms rest wait of the 7.0.0-era probe lands inside the idle collapse */ } },
  open: { sel: '[role=combobox][aria-label="Scene"] .dock-glyph', prep: async () => { await p.hover('[data-dock-tether=top] .glass-dock'); await p.waitForTimeout(2500); } },
};
async function measure(sel) {
  const g = p.locator(sel).first(); const b0 = await g.boundingBox();
  // An integer-aligned clip; the box keeps its fractional edges in clip space, and a
  // pixel counts OUTSIDE only when its whole square misses the box (a half-covered
  // edge pixel is the box's own antialiased edge, not paint outside it).
  const clip = { x: Math.floor(b0.x) - RING, y: Math.floor(b0.y) - RING, width: Math.ceil(b0.width) + 2 * RING + 1, height: Math.ceil(b0.height) + 2 * RING + 1 };
  const bx0 = b0.x - clip.x, by0 = b0.y - clip.y, bx1 = bx0 + b0.width, by1 = by0 + b0.height;
  const s0 = PNG.sync.read(await p.screenshot({ clip }));
  await p.waitForTimeout(1000);
  const s1 = PNG.sync.read(await p.screenshot({ clip }));
  const b1 = await g.boundingBox();
  const sx = s0.width / clip.width; let inside = 0, outside = 0; const outsideAt = [];
  for (let y = 0; y < s0.height; y++) for (let x = 0; x < s0.width; x++) {
    const i = (y * s0.width + x) * 4; const d = [0, 1, 2, 3].some(k => s0.data[i + k] !== s1.data[i + k]);
    if (!d) continue;
    const px0 = x / sx, py0 = y / sx, px1 = (x + 1) / sx, py1 = (y + 1) / sx;
    const touches = px1 > bx0 && px0 < bx1 && py1 > by0 && py0 < by1;
    if (touches) inside++; else { outside++; if (outsideAt.length < 8) outsideAt.push([+(px0 - bx0).toFixed(2), +(py0 - by0).toFixed(2)]); }
  }
  const info = await g.evaluate(el => {
    let op = 1, n = el; while (n) { op *= +getComputedStyle(n).opacity; n = n.parentElement; }
    return {
      tag: el.tagName.toLowerCase(), visible: getComputedStyle(el).visibility === 'visible' && op > 0.99,
      layers: [...el.querySelectorAll('[data-layer]')].map(n => n.getAttribute('data-layer')),
      anims: el.getAnimations({ subtree: true }).filter(a => a.playState === 'running').length,
      live: el.getAttribute('data-live'),
    };
  });
  return { box0: b0, bboxDelta: Math.max(Math.abs(b1.x - b0.x), Math.abs(b1.y - b0.y), Math.abs(b1.width - b0.width), Math.abs(b1.height - b0.height)), diffInside: inside, diffOutside: outside, outsideAt, ...info };
}
for (const s of (process.env.SCENES || 'cube,amiga,square,easing,spring,sequence').split(',')) {
  // A fresh document per scene: no dock morph carried over from the last read.
  await p.goto('about:blank'); await p.goto(base + '#/' + s, { waitUntil: 'networkidle' });
  out.scenes[s] = {};
  for (const [site, { sel, prep }] of Object.entries(SITES)) {
    await prep(); out.scenes[s][site] = await measure(sel);
    const r = out.scenes[s][site];
    console.log(s, site, JSON.stringify({ bboxDelta: r.bboxDelta, diffInside: r.diffInside, diffOutside: r.diffOutside, outsideAt: r.outsideAt, visible: r.visible, layers: r.layers, live: r.live, tag: r.tag, anims: r.anims }));
  }
}
out.pageerrors = errs; console.log('pageerrors', errs.length, errs.join(' | '));
fs.writeFileSync(new URL(`./report-${tag}.json`, import.meta.url), JSON.stringify(out, null, 1));
await b.close();
