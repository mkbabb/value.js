// SERVED MODEL: claude-opus-5-5
import { chromium } from '/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs';
const base = process.argv[2] || 'http://localhost:5173/';
const b = await chromium.launch({ headless: false, args: ['--ignore-gpu-blocklist'] });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto(base + '#/cube', { waitUntil: 'networkidle' }); await p.waitForTimeout(3500);
const info = () => p.evaluate(() => { const d = document.querySelector('.glass-dock'); const r = d.getBoundingClientRect();
  return { cls: d.className, attrs: [...d.attributes].map(a=>a.name+'='+a.value.slice(0,60)).join(' '), rect: [r.x,r.y,r.width,r.height], filter: getComputedStyle(d).filter, scale: getComputedStyle(d).scale, transform: getComputedStyle(d).transform,
   kids: [...d.querySelectorAll('.dock-layer.is-active > *')].map(e=>e.tagName+'.'+(e.className.baseVal??e.className).slice(0,40)) }; });
console.log(JSON.stringify(await info()));
await p.screenshot({ path: 'probe0-collapsed.png', clip: { x: 400, y: 0, width: 640, height: 120 } });
await p.hover('.glass-dock'); await p.waitForTimeout(1200);
console.log(JSON.stringify(await info()));
await p.screenshot({ path: 'probe0-expanded.png', clip: { x: 200, y: 0, width: 1040, height: 120 } });
await b.close();
