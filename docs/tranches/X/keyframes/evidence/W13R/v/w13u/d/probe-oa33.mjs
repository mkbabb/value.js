// SERVED MODEL: claude-opus-5-5 — OA-33 gate: one trailing control; Share/shortcuts/theme work from the dropdown; Escape returns focus.
import { chromium } from '/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs';
const base = process.argv[2] || 'http://localhost:5173/'; const tag = process.argv[3] || 'x';
const b = await chromium.launch({ headless: false, args: ['--ignore-gpu-blocklist'] });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } }); const errs = []; p.on('pageerror', e => errs.push(String(e).slice(0, 140)));
await p.goto(base + '#/cube', { waitUntil: 'networkidle' }); await p.waitForTimeout(2500);
const dock = p.locator('[data-dock-tether=top] .glass-dock');
await dock.hover(); await p.waitForTimeout(1300);
const o = {};
o.controls = await p.evaluate(() => { const L = document.querySelector('[data-dock-tether=top] .dock-layer.is-active'); const kids = [...L.children]; const lastSep = kids.map(k => k.classList.contains('dock-separator')).lastIndexOf(true);
  return { width: document.querySelector('[data-dock-tether=top] .glass-dock').getBoundingClientRect().width, trailing: kids.slice(lastSep + 1).filter(k => !k.hidden && k.getBoundingClientRect().width > 0).map(k => k.getAttribute('aria-label') || k.className.slice(0, 30)), all: kids.filter(k => !k.hidden && k.getBoundingClientRect().width > 0).map(k => k.getAttribute('aria-label') || k.className.slice(0, 24)) }; });
await p.screenshot({ path: `oa33-${tag}-dock.png`, clip: { x: 300, y: 20, width: 840, height: 100 } });
const trig = p.getByRole('button', { name: '@mbabb menu' });
// keyboard: focus the trigger, open with Enter, walk rows
await trig.focus(); await p.keyboard.press('Enter'); await p.waitForTimeout(500);
o.rows = await p.locator('[role=menu] [role=menuitem], [role=menu] [role=menuitemcheckbox]').allInnerTexts().then(a => a.map(t => t.split('\n')[0]));
await p.screenshot({ path: `oa33-${tag}-menu.png`, clip: { x: 700, y: 20, width: 740, height: 520 } });
// shortcuts by keyboard: typeahead to row + Enter
await p.getByRole('menuitem', { name: /Keyboard shortcuts/ }).focus(); await p.keyboard.press('Enter'); await p.waitForTimeout(600);
o.shortcutsDialog = await p.getByRole('dialog').count(); await p.keyboard.press('Escape'); await p.waitForTimeout(500);
// theme from the dropdown
const dark0 = await p.evaluate(() => document.documentElement.classList.contains('dark'));
await trig.click(); await p.waitForTimeout(500);
await p.getByRole('menu').getByRole('button', { name: /Switch to (dark|light) mode/ }).click(); await p.waitForTimeout(500);
o.themeFlipped = dark0 !== await p.evaluate(() => document.documentElement.classList.contains('dark'));
await p.keyboard.press('Escape'); await p.waitForTimeout(400);
o.focusAfterEscape = await p.evaluate(() => document.activeElement?.getAttribute('aria-label'));
// share from the dropdown
await trig.click(); await p.waitForTimeout(500);
await p.getByRole('menu').getByRole('button', { name: 'Share animation' }).click(); await p.waitForTimeout(700);
o.sharePopover = await p.getByRole('textbox', { name: /Share URL/ }).count();
await p.screenshot({ path: `oa33-${tag}-share.png` });
// restore theme
if (o.themeFlipped) await p.evaluate(() => {});
o.errs = errs;
console.log(JSON.stringify(o));
await b.close();
