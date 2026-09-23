// Compose contact sheets (24 frames/sheet, 6 cols) from pre-cropped frames.
// usage: node sheet.mjs <framesDir> <index.json> <outPrefix> [cellW] [cropX cropY cropW cropH]
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
const [dir, indexFile, prefix, cw = "230", cx, cy, cwid, chei] = process.argv.slice(2);
const crop = cx !== undefined;
const idx = JSON.parse(fs.readFileSync(indexFile, "utf8"));
const W = +cw;
const b = await chromium.launch({ headless: true });
const p = await b.newPage({ viewport: { width: 6 * (W + 6) + 6, height: 400 }, deviceScaleFactor: 1 });
for (let s = 0; s * 24 < idx.length; s++) {
  const cells = idx.slice(s * 24, s * 24 + 24).map((f) => {
    const data = fs.readFileSync(`${dir}/${f.file}`).toString("base64");
    const img = crop ? `<div style="width:${W}px;height:${Math.round(W * chei / cwid)}px;overflow:hidden;position:relative;background:#fff"><img src="data:image/png;base64,${data}" style="position:absolute;left:0;top:0;width:auto;transform-origin:0 0;transform:scale(${W / cwid}) translate(${-cx}px,${-cy}px)"></div>` : `<img src="data:image/png;base64,${data}">`;
    return `<div>${img}<div class=l>#${f.i} ${f.label ?? ""}</div></div>`;
  }).join("");
  await p.setContent(`<style>body{margin:0;background:#222;display:grid;grid-template-columns:repeat(6,${W}px);gap:6px;padding:6px;font:10px monospace;color:#eee}img{width:${W}px;display:block;background:#fff}.l{height:14px;white-space:nowrap;overflow:hidden}</style>${cells}`);
  await p.waitForTimeout(200);
  await p.screenshot({ path: `${prefix}-${String(s).padStart(2, "0")}.png`, fullPage: true });
}
await b.close();
console.log("sheets", prefix, Math.ceil(idx.length / 24));
