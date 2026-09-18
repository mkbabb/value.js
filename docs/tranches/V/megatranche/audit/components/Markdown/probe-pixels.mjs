// Real rendered-pixel contrast for the markdown heading ink vs its actual plate.
import { webkit } from "playwright";
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
const HERE = import.meta.dirname;
const out = {};
for (const scheme of ["light", "dark"]) {
  const b = await webkit.launch();
  const c = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme, deviceScaleFactor: 1 });
  const p = await c.newPage();
  await p.goto("http://localhost:9000/#/", { waitUntil: "domcontentloaded" });
  await p.waitForSelector(".markdown-body", { timeout: 30000 });

  await p.waitForTimeout(2500);
  const targets = await p.evaluate(async () => {
    const bd = document.querySelector(".markdown-body");
    const pick = (sel) => bd.querySelector(sel);
    const h2 = [...bd.querySelectorAll("h2")].find(e => e.getBoundingClientRect().height > 0);
    h2.scrollIntoView({ block: "center" });
    await new Promise(r => setTimeout(r, 700));
    const g = (e) => { const r = e.getBoundingClientRect(); return { x: Math.round(r.left), y: Math.round(r.top), w: Math.round(r.width), h: Math.round(r.height) }; };
    const res = { h2: g(h2) };
    const p2 = [...bd.querySelectorAll("p")].find(e => e.getBoundingClientRect().top > h2.getBoundingClientRect().bottom && e.getBoundingClientRect().height > 0);
    if (p2) res.p = g(p2);
    const mk = [...bd.querySelectorAll("mark.cs-name")].find(e => { const r = e.getBoundingClientRect(); return r.height > 0 && r.top > 0 && r.bottom < innerHeight; });
    if (mk) res.mark = g(mk);
    return res;
  });
  const buf = await p.screenshot({ fullPage: false });
  const b64 = buf.toString("base64");
  out[scheme] = await p.evaluate(async ({ b64, targets }) => {
    const img = await createImageBitmap(await (await fetch("data:image/png;base64," + b64)).blob());
    const cv = new OffscreenCanvas(img.width, img.height);
    const cx = cv.getContext("2d", { willReadFrequently: true });
    cx.drawImage(img, 0, 0);
    const lum = (c) => { const f = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(c[0]) + 0.7152 * f(c[1]) + 0.0722 * f(c[2]); };
    const contrast = (a, bb) => { const [x, y] = [lum(a) + 0.05, lum(bb) + 0.05].sort((m, n) => n - m); return +(x / y).toFixed(2); };
    const sample = (r) => {
      const d = cx.getImageData(r.x, r.y, Math.max(1, r.w), Math.max(1, r.h)).data;
      const px = []; for (let i = 0; i < d.length; i += 4) px.push([d[i], d[i + 1], d[i + 2]]);
      const byLum = px.map(q => ({ q, l: lum(q) })).sort((a, bz) => a.l - bz.l);
      // ink = 2nd percentile darkest for dark-on-light, brightest for light-on-dark; report both
      const p2 = byLum[Math.floor(byLum.length * 0.02)].q;
      const p98 = byLum[Math.floor(byLum.length * 0.98)].q;
      // modal background = median
      const med = byLum[Math.floor(byLum.length * 0.5)].q;
      return { darkest2pct: p2, brightest2pct: p98, median: med, n: px.length };
    };
    const res = {};
    for (const k of Object.keys(targets)) res[k] = sample(targets[k]);
    // plate = a band to the right of the h2 text (empty margin area)
    const hb = targets.h2;
    const plateBand = { x: hb.x + hb.w - 30, y: hb.y + 2, w: 28, h: Math.max(2, hb.h - 4) };
    res.plate = sample(plateBand);
    res.contrast = {
      h2_ink_vs_plate_light: contrast(res.h2.darkest2pct, res.plate.median),
      h2_ink_vs_plate_dark: contrast(res.h2.brightest2pct, res.plate.median),
      p_ink_vs_plate_light: res.p ? contrast(res.p.darkest2pct, res.plate.median) : null,
      p_ink_vs_plate_dark: res.p ? contrast(res.p.brightest2pct, res.plate.median) : null,
      mark_vs_plate_light: res.mark ? contrast(res.mark.darkest2pct, res.plate.median) : null,
      mark_vs_plate_dark: res.mark ? contrast(res.mark.brightest2pct, res.plate.median) : null,
    };
    res.targets = targets;
    return res;
  }, { b64, targets });
  await b.close();
}
writeFileSync(resolve(HERE, "probe-pixels.json"), JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 2));
