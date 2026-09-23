// Contact sheets: 24 frames per sheet (6x4), optional crop {x,y,w,h} of the source frame.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const jobs = JSON.parse(process.argv[2]);
const b = await chromium.launch({ headless: false });
const p = await b.newPage({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 1 });
for (const { dir, crop, tileW = 260, filter } of jobs) {
  let files = fs.readdirSync(OUT + dir).filter(f => /^f\d+\.png$/.test(f)).sort();
  let meta = {}; try { const j = JSON.parse(fs.readFileSync(`${OUT}${dir}/frames.json`)); const arr = Array.isArray(j) ? j : (j.frames || j.gFrames); arr.forEach(r => meta[r.i] = r.ms ?? r.t ?? r.scrub); } catch {}
  if (filter) files = files.filter((_, i) => i >= filter[0] && i < filter[1]);
  for (let s = 0; s * 24 < files.length; s++) {
    const chunk = files.slice(s * 24, s * 24 + 24);
    const tiles = chunk.map(f => {
      const i = +f.slice(1, 4); const data = fs.readFileSync(`${OUT}${dir}/${f}`).toString("base64");
      const c = crop || null; const sc = c ? tileW / c.w : 1;
      const style = c ? `width:${tileW}px;height:${Math.round(c.h * sc)}px;background:url(data:image/png;base64,${data}) no-repeat;background-position:${-c.x * sc}px ${-c.y * sc}px;background-size:${1440 * sc}px auto` : "";
      const img = c ? `<div style="${style}"></div>` : `<img src="data:image/png;base64,${data}" style="width:${tileW}px">`;
      return `<figure>${img}<figcaption>#${i} · ${meta[i] ?? ""}</figcaption></figure>`;
    }).join("");
    await p.setContent(`<html><body style="margin:0;background:#222;font:12px monospace;color:#fff"><div style="display:grid;grid-template-columns:repeat(6,${tileW}px);gap:4px;padding:4px">${tiles}</div><style>figure{margin:0}figcaption{padding:1px 2px}</style></body></html>`);
    const el = await p.$("div");
    const name = `${OUT}sheet-${dir.replace(/\//g, "_")}${filter ? "-" + filter.join("_") : ""}-${s}.png`;
    await el.screenshot({ path: name });
    console.log(name.replace(OUT, ""), chunk.length);
  }
}
await b.close();
