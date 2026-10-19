// Compose contact sheets (24 frames each, 6x4) from a frames dir + index json.
// usage: node make-sheets.mjs <dir> <index.json> <cropX> <cropY> <cropW> <cropH> <prefix>
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
const [dir, indexFile, cx, cy, cw, ch, prefix] = process.argv.slice(2);
const idx = JSON.parse(fs.readFileSync(indexFile, "utf8"));
const W = 220, H = Math.round(220 * (+ch / +cw)), SC = W / +cw;
const b = await chromium.launch({ headless: true });
const p = await b.newPage({ viewport: { width: 6 * (W + 6) + 6, height: 4 * (H + 22) + 6 }, deviceScaleFactor: 1 });
for (let s = 0; s * 24 < idx.length; s++) {
  const cells = idx.slice(s * 24, s * 24 + 24).map((f) => {
    const data = fs.readFileSync(`${dir}/${f.file}`).toString("base64");
    return `<div class=c><div class=v><img src="data:image/png;base64,${data}" style="transform:translate(${-cx * SC}px,${-cy * SC}px) scale(${SC});transform-origin:0 0"></div><div class=l>#${f.i} ${f.label}</div></div>`;
  }).join("");
  await p.setContent(`<style>body{margin:0;background:#222;display:grid;grid-template-columns:repeat(6,${W}px);gap:6px;padding:6px;font:11px monospace;color:#eee}.v{width:${W}px;height:${H}px;overflow:hidden;position:relative;background:#fff}.v img{position:absolute;left:0;top:0}.l{height:16px;white-space:nowrap;overflow:hidden}</style>${cells}`);
  await p.waitForTimeout(150);
  await p.screenshot({ path: `${dir}/../${prefix}-${String(s).padStart(2, "0")}.png` });
}
await b.close();
console.log("sheets", Math.ceil(idx.length / 24));
