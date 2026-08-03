// CHALLENGE-D pass 4 — the FULL easing-corpus radius census (closed + tuned)
// and the shadow-smudge causality diff. Read-only.
import { chromium } from "playwright";

const b = await chromium.launch();
const c = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: "light" });
const p = await c.newPage();
await p.goto("http://localhost:9000/#/gradient", { waitUntil: "networkidle" });
await p.waitForTimeout(3500);

const CENSUS = `(() => {
  const head = document.querySelector('.interval-head');
  const row = head && head.parentElement;
  const seen = [];
  const walk = (el, depth) => {
    const cs = getComputedStyle(el);
    const decl = parseFloat(cs.borderTopLeftRadius) || 0;
    const r = el.getBoundingClientRect();
    if (decl > 0 && r.width > 2 && r.height > 2) {
      const eR = Math.min(decl, r.width/2, r.height/2);
      let sel = el.tagName.toLowerCase();
      if (typeof el.className === 'string' && el.className.trim())
        sel += '.' + el.className.trim().split(/\\s+/).slice(0,3).join('.');
      const ds = el.getAttribute('data-specimen'); if (ds) sel += '[' + ds + ']';
      const al = el.getAttribute('aria-label'); if (al) sel += '{' + al + '}';
      seen.push({ depth, sel, w: +r.width.toFixed(1), h: +r.height.toFixed(1),
        declRadius: cs.borderTopLeftRadius, effR: +eR.toFixed(2),
        curvature: +(eR/Math.min(r.width,r.height)).toFixed(3),
        shadow: cs.boxShadow === 'none' ? 'none' : 'yes' });
    }
    for (const k of el.children) walk(k, depth+1);
  };
  if (row) walk(row, 0);
  // collapse the 27 identical tiles into one representative + count
  const tiles = seen.filter(s => s.sel.includes('specimen-tile'));
  const rest = seen.filter(s => !s.sel.includes('specimen-tile'));
  const tileShapes = {};
  for (const t of tiles) { const k = t.w + 'x' + t.h + '@' + t.declRadius; tileShapes[k] = (tileShapes[k]||0)+1; }
  return { rest, tileCount: tiles.length, tileShapes,
    distinctRadii: [...new Set(seen.map(s => s.declRadius))],
    distinctEffR: [...new Set(seen.map(s => s.effR))].sort((a,b)=>a-b),
    rowRect: row ? { w: +row.getBoundingClientRect().width.toFixed(1), h: +row.getBoundingClientRect().height.toFixed(1) } : null };
})()`;

const closed = await p.evaluate(CENSUS);

await p.evaluate(() => {
  const btn = [...document.querySelectorAll('button')].find((x) => x.getAttribute('aria-label') === 'Author a custom curve');
  if (!btn) throw new Error('tune button not found');
  btn.click();
});
await p.waitForTimeout(1500);
const tuned = await p.evaluate(CENSUS);

// The authoring stage's own boxes, listed exhaustively (labels included).
const stage = await p.evaluate(`(() => {
  const st = document.querySelector('.easing-authoring');
  if (!st) return null;
  const out = [];
  const walk = (el, d) => {
    const cs = getComputedStyle(el); const r = el.getBoundingClientRect();
    const decl = parseFloat(cs.borderTopLeftRadius) || 0;
    let sel = el.tagName.toLowerCase();
    if (typeof el.className === 'string' && el.className.trim()) sel += '.' + el.className.trim().split(/\\s+/).slice(0,3).join('.');
    out.push({ d, sel, w:+r.width.toFixed(1), h:+r.height.toFixed(1), radius: cs.borderTopLeftRadius,
      curvature: decl>0 && r.width>2 && r.height>2 ? +(Math.min(decl,r.width/2,r.height/2)/Math.min(r.width,r.height)).toFixed(3) : 0,
      text: (el.children.length===0 ? (el.textContent||'').trim().slice(0,24) : '') });
    for (const k of el.children) walk(k, d+1);
  };
  walk(st, 0);
  return out;
})()`);

// ── Shadow-smudge causality: mean pixel of the inter-tile trough, shadows on vs off
const geom = await p.evaluate(() => {
  const port = document.querySelector('.specimen-strip').getBoundingClientRect();
  const ts = [...document.querySelectorAll('.specimen-tile')].map((t) => t.getBoundingClientRect());
  // trough = the vertical band between tile[1] and tile[2] within the port
  const a = ts[1], bb = ts[2];
  return {
    port: { x: port.x, y: port.y, w: port.width, h: port.height },
    trough: { x: a.right - port.x + 0.5, y: a.top - port.y + 8, w: Math.max(2, bb.left - a.right - 1), h: 20 },
    above: { x: a.left - port.x, y: 1, w: 40, h: 6 },
  };
});
const shotOn = await p.locator(".specimen-strip").first().screenshot();
await p.addStyleTag({ content: ".glass-capsule, .glass-chip { box-shadow: none !important; }" });
await p.waitForTimeout(400);
const shotOff = await p.locator(".specimen-strip").first().screenshot();
await b.close();

const b2 = await chromium.launch();
const p2 = await (await b2.newContext()).newPage();
await p2.goto("about:blank");
const diff = await p2.evaluate(async ({ on, off, geom, dpr }) => {
  const load = async (u) => { const i = new Image(); await new Promise((r) => { i.onload = r; i.src = u; }); const cv = document.createElement("canvas"); cv.width = i.width; cv.height = i.height; cv.getContext("2d").drawImage(i, 0, 0); return cv.getContext("2d"); };
  const mean = (ctx, r) => { const d = ctx.getImageData(Math.round(r.x*dpr), Math.round(r.y*dpr), Math.max(1,Math.round(r.w*dpr)), Math.max(1,Math.round(r.h*dpr))).data; let s=[0,0,0]; const n=d.length/4; for(let i=0;i<d.length;i+=4){s[0]+=d[i];s[1]+=d[i+1];s[2]+=d[i+2];} return s.map(v=>+(v/n).toFixed(1)); };
  const A = await load(on), B = await load(off);
  const lum = ([r,g,b]) => { const f=(v)=>{v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4);}; return +(0.2126*f(r)+0.7152*f(g)+0.0722*f(b)).toFixed(4); };
  const tOn = mean(A, geom.trough), tOff = mean(B, geom.trough);
  const aOn = mean(A, geom.above), aOff = mean(B, geom.above);
  return { troughShadowsOn: tOn, troughShadowsOff: tOff, troughLumOn: lum(tOn), troughLumOff: lum(tOff),
           aboveShadowsOn: aOn, aboveShadowsOff: aOff, aboveLumOn: lum(aOn), aboveLumOff: lum(aOff) };
}, { on: "data:image/png;base64," + shotOn.toString("base64"), off: "data:image/png;base64," + shotOff.toString("base64"), geom, dpr: 2 });
await b2.close();

console.log(JSON.stringify({ closed, tuned, stage, geom, diff }, null, 1));
