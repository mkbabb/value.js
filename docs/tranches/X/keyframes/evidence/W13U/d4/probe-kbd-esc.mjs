// SERVED MODEL: claude-opus-5-5 — X.KF.W13U.d4: keyboard reach of the Share row (Enter opens, focus handed
// to the popover field, Escape unwinds to the @mbabb trigger) + the pointer path's parity (open, trigger re-press closes).
import { chromium } from '/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs';
const b = await chromium.launch({ headless: false });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
const errs = []; p.on('pageerror', (e) => errs.push(String(e).slice(0, 120)));
await p.goto((process.argv[2] || 'http://localhost:5173/') + '#/cube', { waitUntil: 'networkidle' }); await p.waitForTimeout(2500);
await p.locator('[data-dock-tether=top] .glass-dock').hover(); await p.waitForTimeout(1200);
const trig = p.getByRole('button', { name: '@mbabb menu' });
const act = () => p.evaluate(() => document.activeElement?.getAttribute('aria-label') || document.activeElement?.textContent?.trim().slice(0, 24) || document.activeElement?.tagName);
const box = () => p.getByRole('textbox', { name: /Share URL/ }).count();
const o = { kbd: {}, ptr: {} };
// keyboard: Enter on @mbabb, ArrowDown to the Share row (first item), Enter.
await trig.focus(); await p.keyboard.press('Enter'); await p.waitForTimeout(500);
o.kbd.rowFocused = await act();
await p.keyboard.press('Enter'); await p.waitForTimeout(700);
o.kbd.enterOnShareRowOpens = await box(); o.kbd.focusAfterOpen = await act();
const escs = [];
for (let i = 0; i < 3; i++) { await p.keyboard.press('Escape'); await p.waitForTimeout(500); escs.push(await act()); if (escs.at(-1) === '@mbabb menu') break; }
o.kbd.escapeChain = escs; o.kbd.escapeReturnsToMbabb = escs.at(-1) === '@mbabb menu';
o.kbd.menusAfter = await p.locator('[role=menu]').count(); o.kbd.boxAfter = await box();
// pointer: open the menu, press the Share trigger, re-press it (toggle close), Escape chain.
await p.locator('[data-dock-tether=top] .glass-dock').hover(); await p.waitForTimeout(600);
await trig.click(); await p.waitForTimeout(500);
await p.getByRole('button', { name: 'Share animation' }).click(); await p.waitForTimeout(700);
o.ptr.opens = await box(); o.ptr.focusAfterOpen = await act();
await p.getByRole('button', { name: 'Share animation' }).click(); await p.waitForTimeout(700);
o.ptr.rePressCloses = (await box()) === 0;
const pe = [];
for (let i = 0; i < 3; i++) { await p.keyboard.press('Escape'); await p.waitForTimeout(500); pe.push(await act()); if (pe.at(-1) === '@mbabb menu') break; }
o.ptr.escapeChain = pe;
o.pageerrors = errs.length;
console.log(JSON.stringify(o)); await b.close();
