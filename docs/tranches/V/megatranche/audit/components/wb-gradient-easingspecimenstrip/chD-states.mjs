import { chromium } from "playwright";

const OUT = process.argv[2] ?? "/tmp/chD";

const MEASURE = () => {
  const q = (s, r = document) => r.querySelector(s);
  const qa = (s, r = document) => [...r.querySelectorAll(s)];
  const rect = (s) => { const e = q(s); if (!e) return null; const b = e.getBoundingClientRect(); return { l: +b.left.toFixed(1), r: +b.right.toFixed(1), t: +b.top.toFixed(1), b: +b.bottom.toFixed(1), w: +b.width.toFixed(1), h: +b.height.toFixed(1) }; };
  const on = q('.specimen-tile[data-state="on"]');
  const off = qa('.specimen-tile').find(e => e.getAttribute('data-state') !== 'on');
  const desc = (e) => e ? { bg: getComputedStyle(e).backgroundColor, border: getComputedStyle(e).borderColor, radius: getComputedStyle(e).borderRadius, labelColor: getComputedStyle(q('.tile-label', e)).color, labelWeight: getComputedStyle(q('.tile-label', e)).fontWeight, glyph: getComputedStyle(q('.tile-glyph path', e)).stroke, glyphW: getComputedStyle(q('.tile-glyph path', e)).strokeWidth, outline: getComputedStyle(e).outlineWidth + " " + getComputedStyle(e).outlineStyle } : null;
  return {
    align: {
      rowCard: rect('.border-card-edge.rounded-card'),
      ramp: rect('[id^=easing-interval] .h-5'),
      stripPort: rect('.specimen-strip'),
      firstEyebrow: rect('.family-eyebrow'),
      firstTile: rect('.specimen-tile'),
      readoutRail: rect('.readout-rail'),
    },
    stripScroll: (() => { const s = q('.specimen-strip'); return s ? { scrollWidth: s.scrollWidth, clientWidth: s.clientWidth, scrollLeft: s.scrollLeft, mask: (getComputedStyle(s).maskImage || getComputedStyle(s).webkitMaskImage || '').slice(0, 160) } : null; })(),
    onTile: desc(on), offTile: desc(off),
    fadingScrollBg: (() => { const s = q('.specimen-strip'); return s ? { bg: getComputedStyle(s).backgroundColor, bgImage: getComputedStyle(s).backgroundImage.slice(0, 60), boxShadow: getComputedStyle(s).boxShadow.slice(0, 80) } : null; })(),
    stripRowBg: (() => { const s = q('.strip-row'); return s ? getComputedStyle(s).backgroundColor : null; })(),
    familyDivider: (() => { const f = qa('.strip-family')[1]; return f ? getComputedStyle(f).borderLeftColor + " / " + getComputedStyle(f).borderLeftWidth : null; })(),
    // what paints under the tiles?
    hitUnderStrip: (() => {
      const s = q('.specimen-strip'); if (!s) return null;
      const b = s.getBoundingClientRect();
      const el = document.elementFromPoint(b.left + 6, b.top + b.height / 2);
      return el ? el.className.toString().slice(0, 90) : null;
    })(),
    chipTransition: (() => { const e = q('.specimen-tile'); return e ? { transition: getComputedStyle(e).transition.slice(0, 140), scale: getComputedStyle(e).scale, backdrop: getComputedStyle(e).backdropFilter } : null; })(),
    labelOverflowsDisc: (() => {
      // a circular chip cannot contain a full-width baseline label:
      // measure the label's half-width vs the disc half-chord at the label's y
      const chips = qa('.specimen-tile');
      const res = [];
      for (const c of chips) {
        const lab = q('.tile-label', c); if (!lab) continue;
        const cb = c.getBoundingClientRect(), lb = lab.getBoundingClientRect();
        const cx = cb.left + cb.width / 2, cy = cb.top + cb.height / 2;
        const rx = cb.width / 2, ry = cb.height / 2;
        const ly = (lb.top + lb.bottom) / 2;
        const dy = Math.abs(ly - cy);
        // half-chord of the ellipse at dy
        const k = 1 - (dy * dy) / (ry * ry);
        const half = k > 0 ? rx * Math.sqrt(k) : 0;
        const labHalf = lb.width / 2;
        if (labHalf > half + 0.5) res.push({ id: c.getAttribute('data-specimen'), labelHalf: +labHalf.toFixed(1), discHalfChord: +half.toFixed(1), spillPx: +(2 * (labHalf - half)).toFixed(1) });
      }
      return res;
    })(),
  };
};

async function run(name, ctxOpts, fn) {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, ...ctxOpts });
  const page = await ctx.newPage();
  await page.goto("http://localhost:9000/#/gradient", { waitUntil: "networkidle" });
  await page.waitForTimeout(3200);
  if (fn) await fn(page);
  const m = await page.evaluate(MEASURE);
  console.log(`\n########## ${name} ##########`);
  console.log(JSON.stringify(m, null, 2));
  try { await page.locator(".specimen-strip").first().screenshot({ path: `${OUT}-${name}-strip.png` }); } catch {}
  try { await page.locator("[id^=easing-interval]").first().screenshot({ path: `${OUT}-${name}-row.png` }); } catch {}
  await browser.close();
}

await run("light", {});
await run("dark", { colorScheme: "dark" });
await run("forced-colors", { forcedColors: "active" });
await run("reduced-motion", { reducedMotion: "reduce" });
await run("rtl", {}, async (page) => { await page.evaluate(() => { document.documentElement.setAttribute("dir", "rtl"); }); await page.waitForTimeout(600); });
await run("zoom200", { viewport: { width: 720, height: 450 }, deviceScaleFactor: 2 });
