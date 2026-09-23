// SERVED MODEL: claude-opus-5-5 — KF.W13R.d: what paints under the open Scene glyph's ring (the .d2 gh open-clause diffOutside), dev vs gh.
import { chromium } from '/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs';
const base = process.argv[2]; const b = await chromium.launch({ headless: false }); const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
for (const s of ['cube', 'square']) {
  await p.goto('about:blank'); await p.goto(base + '#/' + s, { waitUntil: 'networkidle' });
  await p.hover('[data-dock-tether=top] .glass-dock'); await p.waitForTimeout(2500);
  const r = await p.evaluate(() => { const g = document.querySelector('[role=combobox][aria-label="Scene"] .dock-glyph').getBoundingClientRect(); const x = g.x + 16, y = g.y - 5;
    const pl = document.querySelector('[data-dock-tether=top] .dock-plate'); const plateAnims = pl.getAnimations().map((a) => (a.animationName || a.transitionProperty) + '|' + a.constructor.name + '|' + a.playState + '|' + (a.effect.getTiming().duration) + '|' + a.effect.getTiming().iterations);
    return { plateAnims, glyph: [g.x, g.y, g.width, g.height].map((v) => +v.toFixed(2)), at: [x, y].map((v) => +v.toFixed(1)), stack: document.elementsFromPoint(x, y).slice(0, 9).map((e) => { const cs = getComputedStyle(e); return e.tagName.toLowerCase() + '.' + String(e.className?.baseVal ?? e.className).split(/\s+/).slice(0, 2).join('.') + (cs.backdropFilter !== 'none' ? ' BF' : '') + (e.getAnimations().length ? ' A' + e.getAnimations().length : ''); }) }; });
  console.log(s, JSON.stringify(r));
}
await b.close();
