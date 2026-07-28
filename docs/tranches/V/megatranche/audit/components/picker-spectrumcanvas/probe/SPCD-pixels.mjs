import { chromium } from "playwright";
import fs from "node:fs";
const OUT = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad";
const out = {};
const browser = await chromium.launch();

const lum = ([r, g, b]) => {
  const f = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return +((x + 0.05) / (y + 0.05)).toFixed(3); };

for (const cfg of [
  { tag: "light", opts: { colorScheme: "light" } },
  { tag: "dark", opts: { colorScheme: "dark" } },
  { tag: "forced", opts: { colorScheme: "light", forcedColors: "active" } },
]) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, ...cfg.opts });
  const page = await ctx.newPage();
  await page.goto("http://localhost:9000/#/", { waitUntil: "networkidle" });
  await page.waitForTimeout(3500);
  const r = await page.evaluate(() => {
    const p = document.querySelector(".spectrum-picker").getBoundingClientRect();
    return { x: p.x, y: p.y, w: p.width, h: p.height };
  });
  const buf = await page.screenshot({ clip: { x: r.x - 12, y: r.y - 12, width: r.w + 24, height: r.h + 24 } });
  // decode PNG with the browser itself
  const b64 = buf.toString("base64");
  const stats = await page.evaluate(async ([b64, r]) => {
    const img = new Image();
    img.src = "data:image/png;base64," + b64;
    await img.decode();
    const cv = document.createElement("canvas");
    cv.width = img.width; cv.height = img.height;
    const g = cv.getContext("2d", { willReadFrequently: true });
    g.drawImage(img, 0, 0);
    const px = (x, y) => Array.from(g.getImageData(Math.round(x), Math.round(y), 1, 1).data).slice(0, 3);
    // the plate occupies [12, 12] .. [12+w, 12+h] in the crop
    const OX = 12, OY = 12, W = Math.round(r.w), H = Math.round(r.h);
    // sample just outside vs just inside each corner
    const probes = {
      topLeft: { outside: px(OX - 6, OY - 6), inside: px(OX + 6, OY + 6) },
      bottomLeft: { outside: px(OX - 6, OY + H + 6), inside: px(OX + 6, OY + H - 6) },
      topRight: { outside: px(OX + W + 6, OY - 6), inside: px(OX + W - 6, OY + 6) },
      bottomRight: { outside: px(OX + W + 6, OY + H + 6), inside: px(OX + W - 6, OY + H - 6) },
      leftMid: { outside: px(OX - 6, OY + H / 2), inside: px(OX + 6, OY + H / 2) },
    };
    // near-black fraction of the field
    let black = 0, total = 0, nearDup = 0;
    const step = 3;
    for (let y = OY + 2; y < OY + H - 2; y += step) {
      for (let x = OX + 2; x < OX + W - 2; x += step) {
        const c = px(x, y); total++;
        if (Math.max(c[0], c[1], c[2]) < 32) black++;
      }
    }
    return { probes, blackFraction: +(black / total).toFixed(4), sampled: total };
  }, [b64, r]);
  const res = { blackFraction: stats.blackFraction, sampled: stats.sampled, edgeContrast: {} };
  for (const [k, v] of Object.entries(stats.probes)) {
    res.edgeContrast[k] = { outside: v.outside, inside: v.inside, contrastRatio: ratio(v.outside, v.inside) };
  }
  out[cfg.tag] = res;
  await ctx.close();
}
fs.writeFileSync(`${OUT}/SPCD-pixels.json`, JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 2));
await browser.close();
