// Pixel diff of two same-size PNG crops (via a headless canvas): mean abs diff + edge sharpness (mean gradient magnitude).
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
const [a, b2] = process.argv.slice(2);
const br = await chromium.launch({ headless: true }); const p = await br.newPage();
const r = await p.evaluate(async ([A, B]) => {
  const load = (s) => new Promise((res) => { const i = new Image(); i.onload = () => res(i); i.src = s; });
  const [ia, ib] = await Promise.all([load(A), load(B)]); const w = ia.width, h = ia.height;
  const px = (img) => { const c = new OffscreenCanvas(w, h); const x = c.getContext("2d"); x.drawImage(img, 0, 0); return x.getImageData(0, 0, w, h).data; };
  const da = px(ia), db = px(ib); let diff = 0; const grad = (d) => { let g = 0; for (let y = 0; y < h; y++) for (let x = 1; x < w; x++) { const i = (y * w + x) * 4; g += Math.abs(d[i] - d[i - 4]); } return g / (w * h); };
  for (let i = 0; i < da.length; i += 4) diff += Math.abs(da[i] - db[i]);
  return { w, h, meanDiff: +(diff / (w * h)).toFixed(3), sharpA: +grad(da).toFixed(3), sharpB: +grad(db).toFixed(3) };
}, ["data:image/png;base64," + fs.readFileSync(a).toString("base64"), "data:image/png;base64," + fs.readFileSync(b2).toString("base64")]);
console.log(JSON.stringify(r)); await br.close();
