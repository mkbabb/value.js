// CHALLENGE-D pass 4 — the complete easing-corpus radius register + per-tile
// shape/label geometry (OM-4 / MT-F030). Read-only: no repo file is touched.
import { chromium } from "playwright";

const b = await chromium.launch();
const c = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: "light" });
const p = await c.newPage();
await p.goto("http://localhost:9000/#/gradient", { waitUntil: "networkidle" });
await p.waitForTimeout(3500);

const CHORD = `
function effR(w,h,decl){ return Math.min(decl, w/2, h/2); }
function chordAt(w,h,r,dy){ const flat = h/2 - r; const a = Math.abs(dy);
  if (a <= flat) return w; const d = a - flat; const inner = Math.max(0, r*r - d*d);
  return w - 2*(r - Math.sqrt(inner)); }
`;

const tiles = await p.evaluate(`(() => { ${CHORD}
  const out = [];
  for (const t of document.querySelectorAll('.specimen-tile')) {
    const cs = getComputedStyle(t);
    const r = t.getBoundingClientRect();
    const declRaw = cs.borderTopLeftRadius;
    const decl = parseFloat(declRaw);
    const eR = effR(r.width, r.height, decl);
    const lab = t.querySelector('.tile-label');
    const lr = lab.getBoundingClientRect();
    const gl = t.querySelector('.tile-glyph').getBoundingClientRect();
    const dyLab = (lr.top + lr.height/2) - (r.top + r.height/2);
    const chord = chordAt(r.width, r.height, eR, dyLab);
    const chordBottom = chordAt(r.width, r.height, eR, lr.bottom - (r.top + r.height/2));
    out.push({
      id: t.getAttribute('data-specimen'),
      state: t.getAttribute('data-state'),
      w: +r.width.toFixed(2), h: +r.height.toFixed(2),
      declRadius: declRaw, effR: +eR.toFixed(2),
      curvature: +(eR / Math.min(r.width, r.height)).toFixed(3),
      shape: Math.abs(r.width - r.height) < 0.75 ? 'circle' : 'stadium',
      labelW: +lr.width.toFixed(2), labelScrollW: lab.scrollWidth,
      chordAtLabelMid: +chord.toFixed(2), chordAtLabelBottom: +chordBottom.toFixed(2),
      slackMid: +(chord - lr.width).toFixed(2), slackBottom: +(chordBottom - lr.width).toFixed(2),
      glyphW: +gl.width.toFixed(2), glyphH: +gl.height.toFixed(2),
      inscribedSq: +(Math.min(r.width, r.height) / Math.SQRT2).toFixed(2),
      fontSize: cs.fontSize, overflow: cs.overflow,
    });
  }
  return out;
})()`);

// Every non-zero-radius box inside the interval row — CLOSED-strip state.
const censusClosed = await p.evaluate(`(() => { ${CHORD}
  const row = document.querySelector('.rounded-card.border-card-edge') ||
              document.querySelector('[class*="rounded-card"]');
  const seen = [];
  const walk = (el) => {
    const cs = getComputedStyle(el);
    const decl = parseFloat(cs.borderTopLeftRadius) || 0;
    const r = el.getBoundingClientRect();
    if (decl > 0 && r.width > 2 && r.height > 2) {
      const eR = effR(r.width, r.height, decl);
      seen.push({ sel: el.tagName.toLowerCase() + (el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\\s+/).slice(0,3).join('.') : ''),
        w: +r.width.toFixed(1), h: +r.height.toFixed(1), declRadius: cs.borderTopLeftRadius,
        effR: +eR.toFixed(2), curvature: +(eR/Math.min(r.width,r.height)).toFixed(3) });
    }
    for (const k of el.children) walk(k);
  };
  if (row) walk(row);
  return seen;
})()`);

// Open the authoring disclosure, then census again (the corpus the owner marked).
await p.evaluate(() => {
  const btn = [...document.querySelectorAll('button')].find((b) => b.getAttribute('aria-label') === 'Author a custom curve');
  btn?.click();
});
await p.waitForTimeout(1200);

const censusOpen = await p.evaluate(`(() => { ${CHORD}
  const row = document.querySelector('.rounded-card.border-card-edge') ||
              document.querySelector('[class*="rounded-card"]');
  const seen = [];
  const walk = (el) => {
    const cs = getComputedStyle(el);
    const decl = parseFloat(cs.borderTopLeftRadius) || 0;
    const r = el.getBoundingClientRect();
    if (decl > 0 && r.width > 2 && r.height > 2) {
      const eR = effR(r.width, r.height, decl);
      seen.push({ sel: el.tagName.toLowerCase() + (el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\\s+/).slice(0,3).join('.') : ''),
        w: +r.width.toFixed(1), h: +r.height.toFixed(1), declRadius: cs.borderTopLeftRadius,
        effR: +eR.toFixed(2), curvature: +(eR/Math.min(r.width,r.height)).toFixed(3) });
    }
    for (const k of el.children) walk(k);
  };
  if (row) walk(row);
  const nameless = [...document.querySelectorAll('button')].filter((b) => {
    const t = (b.textContent || '').trim();
    return !t && !b.getAttribute('aria-label') && !b.getAttribute('title') && !b.getAttribute('aria-labelledby');
  }).map((b) => ({ cls: b.className, html: b.outerHTML.slice(0, 140) }));
  const stripCs = getComputedStyle(document.querySelector('.specimen-strip'));
  const rowCs = getComputedStyle(document.querySelector('.strip-row'));
  return { seen, nameless, stripBg: stripCs.backgroundColor, stripBgImg: stripCs.backgroundImage.slice(0,60),
           rowBg: rowCs.backgroundColor, stripOverflow: stripCs.overflowX,
           scrollbarW: (() => { const e = document.querySelector('.specimen-strip'); return e.offsetHeight - e.clientHeight; })() };
})()`);

console.log(JSON.stringify({ tiles, censusClosed, censusOpen }, null, 1));
await b.close();
