// SERVED MODEL: claude-opus-5-5 — keyboard reach of the Share / Dark mode rows inside the @mbabb menu.
import { chromium } from '/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs';
const b = await chromium.launch({ headless: false });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto((process.argv[2]||'http://localhost:5173/') + '#/cube', { waitUntil: 'networkidle' }); await p.waitForTimeout(2500);
await p.locator('[data-dock-tether=top] .glass-dock').hover(); await p.waitForTimeout(1200);
const trig = p.getByRole('button', { name: '@mbabb menu' }); const o = {};
await trig.focus(); await p.keyboard.press('Enter'); await p.waitForTimeout(400);
const d0 = await p.evaluate(() => document.documentElement.classList.contains('dark'));
await p.locator('[role=menuitem]', { hasText: 'Light or dark theme' }).focus(); await p.keyboard.press('Enter'); await p.waitForTimeout(400);
o.enterOnDarkRowFlips = d0 !== await p.evaluate(() => document.documentElement.classList.contains('dark'));
await p.keyboard.press('Tab'); await p.waitForTimeout(200); o.afterTab = await p.evaluate(() => document.activeElement?.getAttribute('aria-label') || document.activeElement?.textContent.slice(0,30));
await p.keyboard.press('Escape'); await p.waitForTimeout(300); await trig.focus(); await p.keyboard.press('Enter'); await p.waitForTimeout(400);
await p.locator('[role=menuitem]', { hasText: 'Copy link' }).focus(); await p.keyboard.press('Enter'); await p.waitForTimeout(600);
o.enterOnShareRowOpens = await p.getByRole('textbox', { name: /Share URL/ }).count();
console.log(JSON.stringify(o)); await b.close();
