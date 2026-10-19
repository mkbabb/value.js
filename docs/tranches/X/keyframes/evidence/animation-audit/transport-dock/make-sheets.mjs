// Contact sheets: 24 frames per sheet (6x4), each cell = the given crop scaled to CELLW, labelled.
// usage: node make-sheets.mjs <listing.json> <outPrefix> <cellW>
//   listing.json = [{file, label, crop:{x,y,w,h}}]  (crop in source-image px; omitted = whole image)
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
const [listFile, prefix, cw = "230"] = process.argv.slice(2);
const list = JSON.parse(fs.readFileSync(listFile, "utf8")); const W = +cw;
const b = await chromium.launch({ headless: true });
const p = await b.newPage({ viewport: { width: 6 * (W + 6) + 6, height: 400 }, deviceScaleFactor: 1 });
for (let s = 0; s * 24 < list.length; s++) {
  const cells = list.slice(s * 24, s * 24 + 24).map((f) => {
    const data = fs.readFileSync(f.file).toString("base64");
    const c = f.crop; const H = c ? Math.round(W * c.h / c.w) : null;
    const img = c ? `<div class=v style="height:${H}px"><img src="data:image/png;base64,${data}" style="transform:translate(${-c.x * W / c.w}px,${-c.y * W / c.w}px) scale(${W / c.w});transform-origin:0 0"></div>`
                  : `<div class=v><img src="data:image/png;base64,${data}" style="width:${W}px;position:static"></div>`;
    return `<div>${img}<div class=l>${f.label}</div></div>`;
  }).join("");
  await p.setContent(`<style>body{margin:0;background:#222;display:grid;grid-template-columns:repeat(6,${W}px);gap:6px;padding:6px;font:11px monospace;color:#eee;width:max-content}.v{width:${W}px;overflow:hidden;position:relative;background:#fff;image-rendering:pixelated}.v img{position:absolute;left:0;top:0;image-rendering:pixelated}.l{height:15px;white-space:nowrap;overflow:hidden}</style>${cells}`);
  await p.waitForTimeout(200);
  await p.screenshot({ path: `${prefix}-${String(s).padStart(2, "0")}.png`, fullPage: true });
}
await b.close(); console.log(prefix, Math.ceil(list.length / 24));
