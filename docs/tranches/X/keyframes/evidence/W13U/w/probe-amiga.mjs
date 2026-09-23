// SERVED MODEL: claude-opus-5-5
import { chromium } from '/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs';
import crypto from 'node:crypto';
const base = process.argv[2] || 'http://localhost:5173/'; const tag = process.argv[3]||'x';
const b = await chromium.launch({ headless: false, args: ['--ignore-gpu-blocklist'] });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
const h = buf => crypto.createHash('sha1').update(buf).digest('hex').slice(0,10);
await p.goto(base + '#/amiga', { waitUntil: 'networkidle' }); await p.reload({ waitUntil: 'networkidle' }); await p.waitForTimeout(3000);
const c = p.locator('.amiga-canvas').first(); const bb = await c.boundingBox();
const shot = async () => h(await p.screenshot({ clip: bb }));
const out = { bb, rest: [await shot()] }; await p.waitForTimeout(700); out.rest.push(await shot());
await p.getByRole('button', { name: /^play/i }).first().click(); await p.waitForTimeout(500);
out.play = [await shot()]; await p.waitForTimeout(700); out.play.push(await shot());
await p.screenshot({ path: `${tag}-amiga-canvas-play.png`, clip: bb });
console.log(JSON.stringify(out));
await b.close();
