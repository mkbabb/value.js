// Vertical strip of selected frames at 2x (pixelated) for close reading. usage: node strip.mjs out.png label:file ...
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
const [out, ...items] = process.argv.slice(2);
const b = await chromium.launch({ headless: true }); const p = await b.newPage({ viewport: { width: 1200, height: 300 }, deviceScaleFactor: 1 });
const rows = items.map((it) => { const [l, f] = it.split("="); return `<div class=r><span>${l}</span><img src="data:image/png;base64,${fs.readFileSync(f).toString("base64")}"></div>`; }).join("");
await p.setContent(`<style>body{margin:0;background:#222;color:#eee;font:12px monospace;width:max-content}.r{display:flex;align-items:center;gap:6px;padding:2px}span{width:90px}img{zoom:2;image-rendering:pixelated}</style>${rows}`);
await p.screenshot({ path: out, fullPage: true }); await b.close();
