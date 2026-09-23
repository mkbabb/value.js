// Contact sheets: every screencast frame, 24 per sheet, cropped 460x460 around the die, labelled
// with frame index, perf-time (mapped via marks), ms into the current roll and the traced roll attitude.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
const d = JSON.parse(fs.readFileSync("trace.json")); const fr = JSON.parse(fs.readFileSync("frames.json"));
const off = d.marks.filter(m => m.wall).map(m => m.wall - m.t / 1000); const o = off.reduce((a, b) => a + b) / off.length;
const tr = d.trace; const num = s => { const m = s.match(/rotateX\(([-\d.e]+)deg\) rotateY\(([-\d.e]+)deg\)/); return m ? [+m[1], +m[2]] : [0, 0]; };
const starts = []; tr.forEach((r, i) => { if (r.rolling && !(tr[i - 1] || {}).rolling) starts.push(r.t); });
const lab = fr.map(f => { const t = (f.ts - o) * 1000; let k = 0; for (let i = 0; i < tr.length; i++) if (tr[i].t <= t) k = i;
  const r = tr[k]; const st = starts.filter(s => s <= t).at(-1); const into = st != null ? t - st : null;
  const a = num(r.inl); return `#${f.i} t=${t.toFixed(0)} ${r.rolling ? "ROLL+" + into.toFixed(0) + "ms" : "rest"} x${a[0].toFixed(0)} y${a[1].toFixed(0)}`; });
fs.writeFileSync("frame-labels.json", JSON.stringify(lab));
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1380, height: 1040 } });
const C = 460, X0 = d.cx - 230, Y0 = d.cy - 230;
for (let s = 0; s * 24 < fr.length; s++) {
  const items = fr.slice(s * 24, s * 24 + 24).map(f => ({ src: "data:image/jpeg;base64," + fs.readFileSync(`frames/f${String(f.i).padStart(4, "0")}.jpg`).toString("base64"), l: lab[f.i] }));
  await p.setContent(`<body style="margin:0;background:#222"><canvas id=c width=1380 height=1040></canvas></body>`);
  await p.evaluate(async ({ items, C, X0, Y0 }) => { const c = document.getElementById("c").getContext("2d");
    for (let i = 0; i < items.length; i++) { const im = new Image(); im.src = items[i].src; await im.decode();
      const x = (i % 6) * 230, y = Math.floor(i / 6) * 260; const k = im.naturalWidth / 1440; c.drawImage(im, X0 * k, Y0 * k, C * k, C * k, x, y, 230, 230);
      c.fillStyle = "#fff"; c.font = "11px monospace"; c.fillText(items[i].l, x + 3, y + 248); } }, { items, C, X0, Y0 });
  await p.locator("#c").screenshot({ path: `sheet-${String(s).padStart(2, "0")}.png` });
}
await b.close(); console.log("sheets", Math.ceil(fr.length / 24), "offset", o);
