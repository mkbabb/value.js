// SERVED MODEL: claude-opus-5-5
// KF.W13U.e — G-KFW13U-e probe (OA-28/OA-31): the easing trigger + every dropdown row,
// read on a served page (argv[2] base URL, argv[3] tag), headed real-GPU Chromium.
// Truth: each glyph's points are checked against the easing function sampled HERE
// from @mkbabb/value.js/easing (the library the engine's registry resolves), not
// re-derived from the demo's own path helper.
import { chromium } from '/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs';
const E = await import('/Users/mkbabb/Programming/keyframes.js/node_modules/@mkbabb/value.js/dist/subpaths/easing.js');
const base = process.argv[2] || 'http://localhost:5173/'; const tag = process.argv[3] || 'dev';
const out = { base };
const fnFor = (n) => n === 'step-start' ? E.steppedEase(1, 'jump-start') : n === 'step-end' ? E.steppedEase(1, 'jump-end') : E.easing(n);
const maxErr = (d, fn) => { const pts = d.replace(/^M /, '').split(' L ').map(s => s.split(',').map(Number)); const n = pts.length - 1; let m = 0; pts.forEach(([x, y], i) => { const t = i / n; m = Math.max(m, Math.abs(x - t), Math.abs(y - (1 - fn(t)))); }); return { n, m }; };
const b = await chromium.launch({ headless: false, args: ['--ignore-gpu-blocklist'] });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
const errs = []; p.on('pageerror', e => errs.push(String(e).slice(0, 120)));
await p.goto(base + '#/cube', { waitUntil: 'networkidle' }); await p.waitForTimeout(2000);
const trig = p.locator('button[role=combobox]:has(svg.curve-glyph)').first();
await trig.waitFor({ timeout: 8000 });
const tr = await trig.evaluate(el => ({ text: el.textContent.trim(), d: el.querySelector('svg.curve-glyph path')?.getAttribute('d') ?? '', svgs: [...el.querySelectorAll('svg')].map(s => s.getAttribute('class')) }));
const fr = fnFor(tr.text); out.trigger = { text: tr.text, svgs: tr.svgs, truth: fr.ok ? maxErr(tr.d, fr.value) : 'no-fn' };
await trig.screenshot({ path: new URL(`./${tag}-trigger.png`, import.meta.url).pathname });
await trig.click(); await p.waitForTimeout(700);
const rows = await p.evaluate(() => [...document.querySelectorAll('[role=option]')].map(r => { const desc = document.getElementById(r.getAttribute('aria-describedby') || ''); return { name: r.querySelector('[data-register=code]')?.textContent.trim(), d: r.querySelector('svg.curve-glyph path')?.getAttribute('d') ?? '', desc: desc?.textContent.trim() ?? null, descHidden: desc?.getAttribute('aria-hidden'), descInRow: !!desc && r.contains(desc), nameTop: r.querySelector('[data-register=code]')?.getBoundingClientRect().top, descTop: desc?.getBoundingClientRect().top }; }));
out.rows = { n: rows.length, withPath: rows.filter(r => r.d.startsWith('M ')).length, distinct: new Set(rows.map(r => r.d)).size };
const named = rows.filter(r => r.name !== 'steps' && r.name !== 'cubic-bezier');
out.rows.namedTrue = named.filter(r => { const f = fnFor(r.name); return f.ok && maxErr(r.d, f.value).m <= 5e-4 + 1e-9; }).length; out.rows.named = named.length;
out.rows.worst = Math.max(...named.map(r => maxErr(r.d, fnFor(r.name).value).m));
out.rows.descSeparated = rows.filter(r => r.desc && r.descHidden === 'true' && r.descInRow && r.descTop > r.nameTop).length;
// accessible names via the browser's own accname (getByRole exact)
let exactNames = 0; for (const r of rows) exactNames += (await p.getByRole('option', { name: r.name, exact: true }).count()) === 1 ? 1 : 0; out.rows.exactAccName = exactNames;
// accessible description via CDP
const cdp = await p.context().newCDPSession(p); const { root } = await cdp.send('DOM.getDocument', { depth: 0 });
const { nodeIds } = await cdp.send('DOM.querySelectorAll', { nodeId: root.nodeId, selector: '[role=option]' });
let descOk = 0; for (let i = 0; i < nodeIds.length; i++) { const { nodes } = await cdp.send('Accessibility.getPartialAXTree', { nodeId: nodeIds[i], fetchRelatives: false }); const n = nodes[0]; if (n?.name?.value === rows[i].name && n?.description?.value === rows[i].desc) descOk++; }
out.rows.axNameDesc = descOk;
await p.screenshot({ path: new URL(`./${tag}-dropdown.png`, import.meta.url).pathname });
// a pick re-draws the trigger from the newly SELECTED easing
await p.getByRole('option', { name: 'ease-out-back', exact: true }).click(); await p.waitForTimeout(500);
const tr2 = await trig.evaluate(el => ({ text: el.textContent.trim(), d: el.querySelector('svg.curve-glyph path')?.getAttribute('d') ?? '' }));
out.afterPick = { text: tr2.text, truth: maxErr(tr2.d, E.easing('ease-out-back').value) };
await trig.screenshot({ path: new URL(`./${tag}-trigger-picked.png`, import.meta.url).pathname });
out.pageerrors = errs.length; console.log(JSON.stringify(out)); await b.close();
