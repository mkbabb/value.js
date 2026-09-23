// SERVED MODEL: claude-opus-5-5
import { chromium } from '/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs';
const b = await chromium.launch({ headless: false, args: ['--ignore-gpu-blocklist'] });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto('http://localhost:5173/#/cube', { waitUntil: 'networkidle' }); await p.waitForTimeout(2500);
await p.hover('[data-dock-tether=top] .glass-dock'); await p.waitForTimeout(1200);
console.log(await p.evaluate(() => [...document.querySelectorAll('[data-dock-tether=top] .dock-layer.is-active > *')].map(e => { const r = e.getBoundingClientRect(); return e.outerHTML.slice(0, 160).replace(/\s+/g,' ') + ' @' + [r.x, r.width].map(v=>v.toFixed(2)); }).join('\n')));
await b.close();
