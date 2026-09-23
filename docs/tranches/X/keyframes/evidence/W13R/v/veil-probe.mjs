// SERVED MODEL: claude-opus-5-5
// KF.W13R.v — GLASS-VEIL-GREY (§0cf) AFTER read: a copy of W13R/m/veil-probe.mjs (unchanged logic), writing beside itself in W13R/v.
// usage: node veil-probe.mjs <url> <label>   (headed; writes <label>.json + <label>-*.png beside this file)
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { withBrowser } from "/Users/mkbabb/Programming/keyframes.js/scripts/lib/demo-driver.mjs";
const here = path.dirname(fileURLToPath(import.meta.url));
const [url = "http://localhost:5173/", label = "before-7.0.0"] = process.argv.slice(2);
const out = await withBrowser(async (browser) => {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light", deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: "networkidle" });
  await page.evaluate(() => { try { localStorage.clear(); } catch {} document.documentElement.classList.remove("dark"); });
  await page.reload({ waitUntil: "networkidle" });
  await page.waitForTimeout(2500);
  const htmlDark = await page.evaluate(() => document.documentElement.classList.contains("dark"));
  const rows = await page.evaluate(() => {
    const els = [...document.querySelectorAll('.dock-plate, [class*="glass-"]')];
    return els.map((el, i) => {
      const r = el.getBoundingClientRect(); const cs = getComputedStyle(el);
      if (r.width < 8 || r.height < 8 || cs.visibility === "hidden" || +cs.opacity === 0) return null;
      if (r.bottom < 0 || r.top > innerHeight || r.right < 0 || r.left > innerWidth) return null;
      el.setAttribute("data-veil-probe", String(i));
      return { i, cls: String(el.className).slice(0, 90), rect: [r.x, r.y, r.width, r.height].map(Math.round),
        bg: cs.backgroundColor, bgImage: cs.backgroundImage.slice(0, 160), backdrop: cs.backdropFilter };
    }).filter(Boolean);
  });
  const shot = await page.screenshot();
  fs.writeFileSync(path.join(here, `${label}-page.png`), shot);
  // composite: the mean sRGB of each plate's rect, read from the page frame (a 2 px inset, all pixels).
  const b64 = shot.toString("base64");
  const comps = await page.evaluate(async ({ b64, rects }) => {
    const img = new Image(); img.src = "data:image/png;base64," + b64; await img.decode();
    const c = document.createElement("canvas"); c.width = img.width; c.height = img.height;
    const g = c.getContext("2d"); g.drawImage(img, 0, 0);
    return rects.map(([x, y, w, h]) => {
      const x0 = Math.max(0, x + 2), y0 = Math.max(0, y + 2), w0 = Math.max(1, Math.min(img.width - x0, w - 4)), h0 = Math.max(1, Math.min(img.height - y0, h - 4));
      const d = g.getImageData(x0, y0, w0, h0).data; let R = 0, G = 0, B = 0, n = 0;
      for (let k = 0; k < d.length; k += 4) { R += d[k]; G += d[k + 1]; B += d[k + 2]; n++; }
      const m = [R / n, G / n, B / n].map((v) => Math.round(v));
      const mx = Math.max(...m), mn = Math.min(...m);
      return { meanRGB: m, chromaSpread: mx - mn, luma: Math.round(0.2126 * m[0] + 0.7152 * m[1] + 0.0722 * m[2]) };
    });
  }, { b64, rects: rows.map((r) => r.rect) });
  rows.forEach((r, k) => Object.assign(r, comps[k]));
  const dock = rows.find((r) => /dock-plate/.test(r.cls));
  if (dock) { const [x, y, w, h] = dock.rect; fs.writeFileSync(path.join(here, `${label}-dock-plate.png`), await page.screenshot({ clip: { x, y, width: w, height: h } })); }
  await ctx.close();
  return { url, label, htmlDark, when: new Date().toISOString(), rows };
}, { launch: { headless: false }, label: "veil-probe" });
fs.writeFileSync(path.join(here, `${label}.json`), JSON.stringify(out, null, 2));
const v = out.value ?? out;
console.log(JSON.stringify({ label, htmlDark: v.htmlDark, n: v.rows?.length }));
for (const r of v.rows ?? []) console.log(r.cls.slice(0, 60).padEnd(60), r.rect.join(","), "bg", r.bg, "mean", r.meanRGB?.join(","), "spread", r.chromaSpread, "luma", r.luma);
