// zoom.mjs out.png dir:frame[,dir:frame...] x y w h scale  — side-by-side crops at N× (nearest-neighbour) for blur inspection
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { readFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const [out, list, x, y, w, h, sc] = process.argv.slice(2); const [X, Y, W, H, S] = [x, y, w, h, sc].map(Number);
const b = await chromium.launch({ headless: true }); const p = await b.newPage({ viewport: { width: 1600, height: 1000 } });
const tiles = list.split(",").map((k) => { const [d, f] = k.split(":"); const uri = "data:image/png;base64," + readFileSync(`${OUT}${d}/f${f.padStart(3, "0")}.png`).toString("base64");
  return `<div class=t><div class=im style="background-image:url(${uri})"></div><span>${d} #${f}</span></div>`; }).join("");
await p.setContent(`<style>body{margin:0;background:#222;display:flex;flex-wrap:wrap;gap:4px;padding:4px;width:1590px}.t{position:relative}.im{image-rendering:pixelated;width:${W * S}px;height:${H * S}px;background-size:${1440 * S}px ${900 * S}px;background-position:-${X * S}px -${Y * S}px}span{position:absolute;left:2px;top:1px;font:11px monospace;color:#fff;background:#000a;padding:0 3px}</style>${tiles}`);
await p.screenshot({ path: OUT + out, fullPage: true }); await b.close();
