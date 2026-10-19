// Pixel-compare the box region at rest before (#0) vs after the first tumble settles (#143) — text/edge crispness + position.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
const s = JSON.parse(fs.readFileSync("state-log.json")); const bb = s.bb;
const b = await chromium.launch(); const p = await b.newPage();
const load = (i) => "data:image/png;base64," + fs.readFileSync(`frames/f${String(i).padStart(4, "0")}.png`).toString("base64");
const r = await p.evaluate(async ({ a, c, bb }) => {
  const get = async (src) => { const im = new Image(); im.src = src; await im.decode(); const cv = new OffscreenCanvas(1440, 900); const x = cv.getContext("2d"); x.drawImage(im, 0, 0); return x.getImageData(Math.round(bb.x) - 12, Math.round(bb.y) - 12, Math.round(bb.width) + 24, Math.round(bb.height) + 24).data; };
  const A = await get(a), C = await get(c); let diff = 0, max = 0, n = 0;
  for (let i = 0; i < A.length; i += 4) { const d = Math.abs(A[i] - C[i]) + Math.abs(A[i + 1] - C[i + 1]) + Math.abs(A[i + 2] - C[i + 2]); if (d > 24) n++; diff += d; max = Math.max(max, d); }
  return { meanDiff: diff / (A.length / 4), maxDiff: max, pxOver24: n, total: A.length / 4 };
}, { a: load(0), c: load(143), bb });
console.log(JSON.stringify(r)); await b.close();
