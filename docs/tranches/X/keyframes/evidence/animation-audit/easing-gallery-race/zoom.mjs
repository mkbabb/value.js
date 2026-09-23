// 4x nearest-neighbour zoom of 4 mid-motion frames (blur check) — linear/ease/ease-in tiles.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { readFileSync, writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const idx = [60, 61, 62, 97];
const srcs = idx.map(i => "data:image/png;base64," + readFileSync(`${OUT}frames/A-${String(i).padStart(4,"0")}.png`).toString("base64"));
const browser = await chromium.launch({ headless: false });
const page = await browser.newPage({ viewport: { width: 800, height: 600 }, deviceScaleFactor: 1 });
await page.setContent("<canvas id=c></canvas>");
const png = await page.evaluate(async (srcs) => {
  const cx = 543, cy = 290, w = 240, h = 90, Z = 3;
  const cv = document.getElementById("c"); cv.width = w * Z * 2; cv.height = h * Z * 2;
  const g = cv.getContext("2d"); g.imageSmoothingEnabled = false;
  for (let k = 0; k < srcs.length; k++) { const im = new Image(); im.src = srcs[k]; await im.decode();
    g.drawImage(im, cx, cy, w, h, (k % 2) * w * Z, Math.floor(k / 2) * h * Z, w * Z, h * Z); }
  return cv.toDataURL();
}, srcs);
writeFileSync(OUT + "10-zoom-midmotion.png", Buffer.from(png.split(",")[1], "base64"));
await browser.close();
