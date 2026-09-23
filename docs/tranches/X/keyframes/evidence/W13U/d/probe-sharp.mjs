// SERVED MODEL: claude-opus-5-5 — text pixel-sharp at rest after a morph: crop of the expanded dock's text
// after a real expand morph vs the same crop reached with NO morph (reduced-motion context seats the endpoint).
import { chromium } from '/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs';
import fs from 'node:fs';
const base = process.argv[2] || 'http://localhost:5173/'; const tag = process.argv[3] || 'x';
const b = await chromium.launch({ headless: false, args: ['--ignore-gpu-blocklist'] });
async function crop(reducedMotion) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, reducedMotion });
  const p = await ctx.newPage(); await p.goto(base + '#/cube', { waitUntil: 'networkidle' }); await p.waitForTimeout(3000);
  await p.mouse.move(40, 800); await p.locator('[data-dock-tether=top] .glass-dock').hover(); await p.waitForTimeout(1800);
  const st = await p.evaluate(() => { const d = document.querySelector('[data-dock-tether=top] .glass-dock'); const cs = getComputedStyle(d); return { morphing: d.hasAttribute('data-morphing'), filter: cs.filter, willChange: cs.willChange, scale: cs.scale, transform: cs.transform, kidScales: [...d.querySelectorAll('.dock-layer.is-active > *')].map(k => getComputedStyle(k).scale + '/' + getComputedStyle(k).opacity) }; });
  const box = await p.locator('[data-dock-tether=top] .dock-layer.is-active').boundingBox();
  const buf = await p.screenshot({ clip: { x: Math.floor(box.x), y: Math.floor(box.y), width: Math.ceil(box.width), height: Math.ceil(box.height) } });
  await ctx.close(); return { buf, st, box };
}
const A = await crop('no-preference'), B = await crop('reduce');
fs.writeFileSync(`sharp-${tag}-morph.png`, A.buf); fs.writeFileSync(`sharp-${tag}-nomorph.png`, B.buf);
const p = await b.newPage();
const diff = await p.evaluate(async ([a, c]) => {
  const load = async (b64) => { const img = await createImageBitmap(await (await fetch('data:image/png;base64,' + b64)).blob()); const cv = new OffscreenCanvas(img.width, img.height); const g = cv.getContext('2d'); g.drawImage(img, 0, 0); return g.getImageData(0, 0, img.width, img.height); };
  const x = await load(a), y = await load(c); if (x.width !== y.width || x.height !== y.height) return { sizeMismatch: [x.width, x.height, y.width, y.height] };
  let n = 0, max = 0; for (let i = 0; i < x.data.length; i += 4) { const d = Math.max(Math.abs(x.data[i] - y.data[i]), Math.abs(x.data[i + 1] - y.data[i + 1]), Math.abs(x.data[i + 2] - y.data[i + 2])); if (d > 8) n++; if (d > max) max = d; }
  // sharpness: mean |horizontal gradient| of luminance
  const sh = (im) => { let s = 0; for (let yy = 0; yy < im.height; yy++) for (let xx = 1; xx < im.width; xx++) { const i = (yy * im.width + xx) * 4, j = i - 4; s += Math.abs((im.data[i] + im.data[i + 1] + im.data[i + 2]) - (im.data[j] + im.data[j + 1] + im.data[j + 2])) / 3; } return +(s / (im.width * im.height)).toFixed(3); };
  return { px: x.width * x.height, diffPx: n, maxDelta: max, sharpMorph: sh(x), sharpNoMorph: sh(y) };
}, [A.buf.toString('base64'), B.buf.toString('base64')]);
console.log(JSON.stringify({ tag, diff, morphState: A.st, noMorphState: B.st, boxA: A.box, boxB: B.box }));
await b.close();
