// SERVED MODEL: claude-opus-5-5
// KF.W13U.e · OA-34 sweep: every element wearing an OUTER box-shadow whose shadow
// rect crosses a clipping ancestor's padding box (overflow != visible, or contain:paint).
// argv: base tag scheme(light|dark) routes(comma)
import { chromium } from '/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs';
const [base = 'http://localhost:5173/', tag = 'dev', scheme = 'light', routes = 'cube,,easing,spring,amiga,square,sequence'] = process.argv.slice(2);
const b = await chromium.launch({ headless: false, args: ['--ignore-gpu-blocklist'] });
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, colorScheme: scheme });
const res = {};
for (const r of routes.split(',')) {
  await p.goto(base + '#/' + r, { waitUntil: 'networkidle' }); await p.waitForTimeout(1500);
  res[r || 'home'] = await p.evaluate(() => {
    const parseShadows = (s) => { if (s === 'none') return []; const parts = s.split(/,(?![^()]*\))/); return parts.filter(x => !/inset/.test(x)).map(x => { const nums = (x.replace(/(rgba?|color|oklch|hsla?|lab|lch)\([^)]*\)/g, '').match(/-?[\d.]+px/g) || []).map(parseFloat); const [ox = 0, oy = 0, blur = 0, spread = 0] = nums; return { ox, oy, blur, spread }; }); };
    const out = [];
    for (const el of document.querySelectorAll('body *')) {
      const cs = getComputedStyle(el); const sh = parseShadows(cs.boxShadow); if (!sh.length) continue;
      const bb = el.getBoundingClientRect(); if (bb.width < 40 || bb.height < 40 || cs.visibility === 'hidden') continue;
      const ext = { l: Math.max(...sh.map(s => s.blur + s.spread - s.ox)), r: Math.max(...sh.map(s => s.blur + s.spread + s.ox)), t: Math.max(...sh.map(s => s.blur + s.spread - s.oy)), b: Math.max(...sh.map(s => s.blur + s.spread + s.oy)) };
      const sr = { l: bb.left - ext.l, r: bb.right + ext.r, t: bb.top - ext.t, b: bb.bottom + ext.b };
      let a = el.parentElement;
      while (a && a !== document.documentElement) { const ac = getComputedStyle(a); if (ac.overflowX !== 'visible' || ac.overflowY !== 'visible' || /paint|strict|content/.test(ac.contain)) { const ab = a.getBoundingClientRect(); const cut = { l: Math.max(0, ab.left - sr.l), r: Math.max(0, sr.r - ab.right), t: Math.max(0, ab.top - sr.t), b: Math.max(0, sr.b - ab.bottom) }; if (cut.l + cut.r + cut.t + cut.b > 0.5) out.push({ el: (el.className?.baseVal ?? el.className).toString().slice(0, 70), box: [bb.left, bb.top, bb.width, bb.height].map(Math.round), ext, clipper: (a.className?.baseVal ?? a.className).toString().slice(0, 70), ovf: ac.overflowX + '/' + ac.overflowY, contain: ac.contain, cut }); break; } a = a.parentElement; }
    }
    return out;
  });
}
console.log(JSON.stringify(res)); await b.close();
