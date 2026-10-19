// Compose contact sheets (24 frames each) from frames/ cropped to the box clip; labels = frame index + ms from 1st double-tap (T1) / 2nd (T2) / Space (SP).
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs"; import path from "node:path";
const OUT = path.dirname(new URL(import.meta.url).pathname);
const s = JSON.parse(fs.readFileSync(path.join(OUT, "state-log.json")));
const SH = path.join(OUT, "sheets"); fs.rmSync(SH, { recursive: true, force: true }); fs.mkdirSync(SH);
const c = s.clip; const cell = 230, k = cell / c.width;
const lab = (pt) => pt >= s.tSpace ? `SP+${Math.round(pt - s.tSpace)}` : pt >= s.tTap2 ? `T2+${Math.round(pt - s.tTap2)}` : `T1${pt >= s.tTap ? "+" : ""}${Math.round(pt - s.tTap)}`;
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 6 * cell, height: 4 * (cell + 18) } });
const index = [];
for (let sh = 0; sh * 24 < s.frames.length; sh++) {
  const fr = s.frames.slice(sh * 24, sh * 24 + 24);
  const cells = fr.map((f) => { const pt = f.ts * 1000 - s.timeOrigin; index.push({ i: f.i, sheet: sh, pt: Math.round(pt), label: lab(pt) });
    const src = "data:image/png;base64," + fs.readFileSync(path.join(OUT, "frames", `f${String(f.i).padStart(4, "0")}.png`)).toString("base64");
    return `<div style="width:${cell}px;height:${cell + 18}px;overflow:hidden;position:relative;background:#000"><div style="width:${cell}px;height:${cell}px;background:url(${src}) -${c.x * k}px -${c.y * k}px / ${1440 * k}px ${900 * k}px no-repeat"></div><div style="font:12px monospace;color:#fff;background:#000;height:18px">#${f.i} ${lab(pt)}ms</div></div>`; }).join("");
  await p.setContent(`<body style="margin:0;display:flex;flex-wrap:wrap;width:${6 * cell}px">${cells}</body>`);
  await p.screenshot({ path: path.join(SH, `sheet-${String(sh).padStart(2, "0")}.png`) });
}
fs.writeFileSync(path.join(OUT, "sheets-index.json"), JSON.stringify(index));
await b.close();
const at = (re) => index.filter((x) => re.test(x.label)).slice(0, 1).map((x) => `${x.label}@#${x.i}(sheet ${x.sheet})`);
console.log(index.length, at(/^T1\+/), at(/^T2\+/), at(/^SP\+/));
