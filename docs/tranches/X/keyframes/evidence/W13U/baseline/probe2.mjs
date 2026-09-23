// SERVED MODEL: claude-opus-5-5
import { chromium } from '/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs';
const base = process.argv[2] || 'http://localhost:5173/';
const b = await chromium.launch({ headless: false, args: ['--ignore-gpu-blocklist'] });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
const errs = []; p.on('pageerror', e => errs.push(String(e).slice(0,160)));
const out = {};
await p.goto(base + '#/cube', { waitUntil: 'networkidle' }); await p.waitForTimeout(2500);
const tf = () => p.evaluate(() => [...document.querySelectorAll('.cube')].map(e => getComputedStyle(e).transform.slice(0,50)).join('|') || 'NO .cube');
const ui = () => p.evaluate(() => ({
  sliders: [...document.querySelectorAll('[role=slider]')].map(s => ({ l: (s.getAttribute('aria-label')||'').slice(0,30), dis: s.hasAttribute('data-disabled'), now: s.getAttribute('aria-valuenow'), greyCls: !!s.closest('.is-disabled'), op: getComputedStyle(s.closest('[data-disabled],.is-disabled')||s).opacity })),
  trig: [...document.querySelectorAll('button[role=combobox]')].map(t => ({ text: t.textContent.trim().replace(/\s+/g,' ').slice(0,50), svgs: [...t.querySelectorAll("svg")].map(s=>(s.getAttribute("class")||"").split(" ").filter(c=>c.startsWith("lucide")||c.includes("glyph")||c.includes("curve")).join(".")||"svg") })),
  anims: document.getAnimations().length }));
out.rest0 = await tf(); await p.waitForTimeout(1000); out.rest1 = await tf(); out.restMoves = out.rest0 !== out.rest1;
out.uiBefore = await ui();
const play = p.getByRole('button', { name: /^play/i }).first();
out.playFound = await play.count();
if (out.playFound) { await play.click().catch(e => out.playErr = String(e).slice(0,120)); await p.waitForTimeout(300);
  out.play0 = await tf(); await p.waitForTimeout(1000); out.play1 = await tf(); out.playMoves = out.play0 !== out.play1; }
out.uiAfter = await ui();
await p.screenshot({ path: 'baseline-cube-1440.png' });
out.errs = errs.slice(0,5);
console.log(JSON.stringify(out, null, 1));
await b.close();
