// SERVED MODEL: claude-opus-5-5
// KF.W13U.t — cube: does the playhead hold still under a HELD drag (paused scene)?
import { chromium } from '/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs';
const base = process.argv[2] || 'http://localhost:5173/';
const b = await chromium.launch({ headless: false, args: ['--ignore-gpu-blocklist'] });
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, colorScheme: 'dark' });
const S = '[role=slider][aria-label="Scrub animation timeline"]';
const now = async () => Math.round(+(await p.locator(S).first().getAttribute('aria-valuenow')));
const labels = () => p.evaluate(() => [...document.querySelectorAll('button')].map(b => (b.getAttribute('aria-label') || b.textContent).trim()).filter(t => /^(play|pause)/i.test(t)).join('|'));
const samp = async () => { const a = []; for (let i = 0; i < 3; i++) { a.push(await now()); await p.waitForTimeout(250); } return a; };
const out = {};
await p.goto(base + '#/cube', { waitUntil: 'networkidle' }); await p.waitForTimeout(2000);
out.labels0 = await labels(); out.playing = await samp();
await p.getByRole('button', { name: /^pause/i }).first().click(); await p.waitForTimeout(400);
out.labels1 = await labels(); out.paused = await samp();
const tr = await p.locator('.glass-slider').filter({ has: p.locator(S) }).first().locator('.slider-track').boundingBox();
const y = tr.y + tr.height / 2;
await p.mouse.move(tr.x + tr.width * 0.3, y); await p.mouse.down(); await p.waitForTimeout(100);
out.held30 = await samp(); out.labelsHeld = await labels();
await p.mouse.move(tr.x + tr.width * 0.6, y, { steps: 5 }); out.held60 = await samp();
await p.mouse.up(); await p.waitForTimeout(300); out.up = await samp(); out.labels2 = await labels();
console.log(JSON.stringify(out)); await b.close();
