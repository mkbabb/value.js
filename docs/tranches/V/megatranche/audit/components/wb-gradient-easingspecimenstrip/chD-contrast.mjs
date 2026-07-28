import { chromium } from "playwright";

async function measure(scheme) {
  const b = await chromium.launch();
  const c = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 3, colorScheme: scheme });
  const p = await c.newPage();
  await p.goto("http://localhost:9000/#/gradient", { waitUntil: "networkidle" });
  await p.waitForTimeout(3200);
  // rects in CSS px relative to the strip port
  const geo = await p.evaluate(() => {
    const strip = document.querySelector(".specimen-strip");
    const sb = strip.getBoundingClientRect();
    const pick = (sel) => { const e = document.querySelector(sel); if (!e) return null; const r = e.getBoundingClientRect(); return { x: r.left - sb.left, y: r.top - sb.top, w: r.width, h: r.height }; };
    const on = document.querySelector('.specimen-tile[data-state="on"]');
    const off = [...document.querySelectorAll('.specimen-tile')].find(e => e.getAttribute('data-state') !== 'on');
    const rel = (e) => { const r = e.getBoundingClientRect(); return { x: r.left - sb.left, y: r.top - sb.top, w: r.width, h: r.height }; };
    const lab = (e) => { const r = e.querySelector('.tile-label').getBoundingClientRect(); return { x: r.left - sb.left, y: r.top - sb.top, w: r.width, h: r.height }; };
    return { eyebrow: pick('.family-eyebrow'), onTile: rel(on), onLabel: lab(on), offTile: rel(off), offLabel: lab(off) };
  });
  const buf = await p.locator(".specimen-strip").first().screenshot();
  await b.close();

  const b2 = await chromium.launch();
  const p2 = await (await b2.newContext()).newPage();
  await p2.goto("about:blank");
  const res = await p2.evaluate(async ({ dataUrl, geo, dpr }) => {
    const img = new Image();
    await new Promise((r) => { img.onload = r; img.src = dataUrl; });
    const cv = document.createElement("canvas"); cv.width = img.width; cv.height = img.height;
    const ctx = cv.getContext("2d"); ctx.drawImage(img, 0, 0);
    const px = (x, y) => { const d = ctx.getImageData(Math.round(x), Math.round(y), 1, 1).data; return [d[0], d[1], d[2]]; };
    const lum = ([r, g, b]) => { const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
    const cr = (a, b) => { const L1 = Math.max(lum(a), lum(b)), L2 = Math.min(lum(a), lum(b)); return +((L1 + 0.05) / (L2 + 0.05)).toFixed(2); };
    const region = (r) => { const out = []; for (let y = r.y * dpr; y < (r.y + r.h) * dpr; y++) for (let x = r.x * dpr; x < (r.x + r.w) * dpr; x++) out.push(px(x, y)); return out; };
    const extreme = (arr, dark) => arr.reduce((acc, c) => (dark ? lum(c) < lum(acc) : lum(c) > lum(acc)) ? c : acc, arr[0]);
    const modal = (arr) => { const m = new Map(); for (const c of arr) { const k = c.join(","); m.set(k, (m.get(k) || 0) + 1); } let best = null, n = -1; for (const [k, v] of m) if (v > n) { n = v; best = k; } return best.split(",").map(Number); };

    const onTilePx = region({ x: geo.onTile.x + 2, y: geo.onTile.y + 2, w: geo.onTile.w - 4, h: 8 }); // top band of the disc = clean bg
    const offTilePx = region({ x: geo.offTile.x + 2, y: geo.offTile.y + 2, w: geo.offTile.w - 4, h: 8 });
    const onLabelPx = region(geo.onLabel);
    const offLabelPx = region(geo.offLabel);
    const eyebrowPx = region(geo.eyebrow);
    const eyebrowBg = modal(eyebrowPx);

    const onBg = modal(onTilePx), offBg = modal(offTilePx);
    const onInkDark = extreme(onLabelPx, true), onInkLight = extreme(onLabelPx, false);
    const offInkDark = extreme(offLabelPx, true), offInkLight = extreme(offLabelPx, false);
    const eyeInkDark = extreme(eyebrowPx, true), eyeInkLight = extreme(eyebrowPx, false);
    const pickInk = (bg, d, l) => lum(bg) > 0.4 ? d : l;
    return {
      onTileBg: onBg, onLabelInk: pickInk(onBg, onInkDark, onInkLight), onContrast: cr(onBg, pickInk(onBg, onInkDark, onInkLight)),
      offTileBg: offBg, offLabelInk: pickInk(offBg, offInkDark, offInkLight), offContrast: cr(offBg, pickInk(offBg, offInkDark, offInkLight)),
      eyebrowBg, eyebrowInk: pickInk(eyebrowBg, eyeInkDark, eyeInkLight), eyebrowContrast: cr(eyebrowBg, pickInk(eyebrowBg, eyeInkDark, eyeInkLight)),
      onVsOffLabel: cr(pickInk(onBg, onInkDark, onInkLight), pickInk(offBg, offInkDark, offInkLight)),
    };
  }, { dataUrl: "data:image/png;base64," + buf.toString("base64"), geo, dpr: 3 });
  await b2.close();
  return res;
}
console.log("LIGHT", JSON.stringify(await measure("light"), null, 2));
console.log("DARK ", JSON.stringify(await measure("dark"), null, 2));
