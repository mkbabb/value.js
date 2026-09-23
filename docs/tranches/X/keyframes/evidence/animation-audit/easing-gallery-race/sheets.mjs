// compose contact sheets (24 frames each, 2 cols) from the screencast frames, cropped to the drawer clip.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { readFileSync, writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const c = JSON.parse(readFileSync(OUT + "capture.json"));
const clip = c.clip;
const browser = await chromium.launch({ headless: false });
const page = await browser.newPage({ viewport: { width: 800, height: 600 }, deviceScaleFactor: 1 });
await page.setContent("<canvas id=c></canvas>");
for (const [tag, list] of [["A", c.framesA], ["D", c.framesD]]) {
  const t0 = list[0].ts;
  for (let s = 0; s * 24 < list.length; s++) {
    const chunk = list.slice(s * 24, s * 24 + 24).map(f => ({ i: f.i, ms: Math.round((f.ts - t0) * 1000),
      src: "data:image/png;base64," + readFileSync(`${OUT}frames/${tag}-${String(f.i).padStart(4, "0")}.png`).toString("base64") }));
    const png = await page.evaluate(async ({ chunk, clip }) => {
      const cols = 2, W = clip.width, H = clip.height + 18;
      const cv = document.getElementById("c"); cv.width = W * cols; cv.height = H * Math.ceil(chunk.length / cols);
      const g = cv.getContext("2d"); g.fillStyle = "#222"; g.fillRect(0, 0, cv.width, cv.height);
      for (let k = 0; k < chunk.length; k++) {
        const im = new Image(); im.src = chunk[k].src; await im.decode();
        const x = (k % cols) * W, y = Math.floor(k / cols) * H;
        g.drawImage(im, clip.x, clip.y, clip.width, clip.height, x, y + 18, clip.width, clip.height);
        g.fillStyle = "#ff0"; g.font = "13px monospace"; g.fillText(`#${chunk[k].i}  t=${chunk[k].ms}ms`, x + 4, y + 13);
      }
      return cv.toDataURL("image/png");
    }, { chunk, clip });
    writeFileSync(`${OUT}sheets/${tag}-sheet-${String(s).padStart(2, "0")}.png`, Buffer.from(png.split(",")[1], "base64"));
  }
}
await browser.close();
