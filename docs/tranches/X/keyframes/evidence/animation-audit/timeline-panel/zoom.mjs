// Zoom helper: crop a region from frames and upscale (nearest) side by side. usage: node zoom.mjs out.png x y w h scale f1 f2 ...
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
const [out, x, y, w, h, sc, ...files] = process.argv.slice(2);
const b = await chromium.launch({ headless: true }); const p = await b.newPage({ viewport: { width: 1600, height: 600 } });
const cells = files.map((f) => `<div><div style="width:${w * sc}px;height:${h * sc}px;overflow:hidden;position:relative"><img src="data:image/png;base64,${fs.readFileSync(f).toString("base64")}" style="position:absolute;image-rendering:pixelated;transform-origin:0 0;transform:scale(${sc}) translate(${-x}px,${-y}px)"></div><div>${f}</div></div>`).join("");
await p.setContent(`<style>body{margin:0;display:flex;flex-wrap:wrap;gap:8px;padding:8px;background:#333;color:#eee;font:11px monospace}</style>${cells}`);
await p.screenshot({ path: out, fullPage: true }); await b.close();
