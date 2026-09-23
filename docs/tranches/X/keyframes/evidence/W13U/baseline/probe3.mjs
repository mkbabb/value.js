// SERVED MODEL: claude-opus-5-5
import { chromium } from '/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs';
const b = await chromium.launch({ headless: false, args: ['--ignore-gpu-blocklist'] });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto('http://localhost:5173/#/cube', { waitUntil: 'networkidle' }); await p.waitForTimeout(2000);
const out = {};
const trig = p.locator('button[role=combobox]', { hasText: 'ease-in-out' }).first();
out.trigVisible = await trig.isVisible();
if (!out.trigVisible) { const c = p.getByRole('button', { name: /controls/i }).first(); if (await c.count()) await c.click(); await p.waitForTimeout(800); out.trigVisible2 = await trig.isVisible(); }
await trig.click({ timeout: 5000 }).catch(e => out.clickErr = String(e).slice(0,140)); await p.waitForTimeout(600);
out.rows = await p.evaluate(() => { const o = [...document.querySelectorAll('[role=option]')]; return { n: o.length, withGlyph: o.filter(r => [...r.querySelectorAll('svg path')].some(pa => !(pa.closest('svg').getAttribute('class')||'').includes('lucide'))).length, sample: o.slice(0,3).map(r => r.textContent.trim().replace(/\s+/g,' ').slice(0,40)) }; });
await p.screenshot({ path: 'baseline-easing-dropdown.png' });
console.log(JSON.stringify(out));
await b.close();
