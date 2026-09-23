// Contact sheets: 24 frames per sheet, crop = the SpringTarget card's instrument band (x560-1360, y190-560).
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { readFileSync, readdirSync, existsSync, mkdirSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const [CX, CY, CW, CH, S] = [560, 190, 800, 370, 0.45];
const dirs = process.argv.slice(2);
const b = await chromium.launch({ headless: true }); // offline composition only; captures were headed
const p = await b.newPage({ viewport: { width: 1440, height: 1200 }, deviceScaleFactor: 1 });
mkdirSync(OUT + "sheets", { recursive: true });
for (const d of dirs) {
  const files = readdirSync(OUT + d).filter((f) => /^f\d+\.png$/.test(f)).sort();
  const ts = existsSync(OUT + d + "/frames.json") ? JSON.parse(readFileSync(OUT + d + "/frames.json")) : [];
  for (let s = 0; s * 24 < files.length; s++) {
    const chunk = files.slice(s * 24, s * 24 + 24);
    const tiles = chunk.map((f) => { const i = +f.slice(1, 4); const uri = "data:image/png;base64," + readFileSync(OUT + d + "/" + f).toString("base64");
      return `<div class=t><div class=im style="background-image:url(${uri})"></div><span>${d} #${i} +${ts[i]?.dtMs ?? "?"}ms</span></div>`; }).join("");
    await p.setContent(`<style>body{margin:0;background:#222;display:grid;grid-template-columns:repeat(4,${CW * S}px);gap:4px;padding:4px;width:max-content}
      .t{position:relative}.im{width:${CW * S}px;height:${CH * S}px;background-size:${1440 * S}px ${900 * S}px;background-position:-${CX * S}px -${CY * S}px}
      span{position:absolute;left:2px;top:1px;font:11px monospace;color:#fff;background:#000a;padding:0 3px}</style>${tiles}`);
    await p.waitForTimeout(50);
    await p.screenshot({ path: `${OUT}sheets/${d}-sheet${String(s).padStart(2, "0")}.png`, fullPage: true });
  }
  console.log(d, files.length);
}
await b.close();
