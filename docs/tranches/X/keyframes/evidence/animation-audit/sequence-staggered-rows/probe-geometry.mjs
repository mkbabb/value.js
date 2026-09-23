import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process";
import { writeFileSync } from "node:fs";
const K="/Users/mkbabb/Programming/keyframes.js";
const b = await chromium.launch({ headless: false });
const p = await (await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 })).newPage();
await p.goto("http://localhost:5173/#/sequence"); await p.waitForSelector(".seq-stage"); await p.waitForTimeout(2500);
const g = await p.evaluate(() => {
  const R = (s) => [...document.querySelectorAll(s)].map((e) => { const r = e.getBoundingClientRect(); return [Math.round(r.left*10)/10, Math.round(r.right*10)/10]; });
  const st = document.querySelector(".seq-stage"); const cs = getComputedStyle(st);
  return { stage: R(".seq-stage"), stagePad: [cs.paddingLeft, cs.paddingRight], axis: R(".seq-axis"), phTrack: R(".seq-playhead-track"), tracks: R(".seq-track"), scrub: R(".seq-scrub"), card: R(".seq-target"), cardOverflow: getComputedStyle(document.querySelector('.seq-target')).overflowX,
    axisLabels: [...document.querySelectorAll('.seq-axis *')].filter(e=>e.children.length===0 && e.textContent.trim()).map(e=>{const r=e.getBoundingClientRect();return [e.textContent.trim(), Math.round(r.left), Math.round(r.right)]}) };
});
g.khead = execSync(`git -C ${K} rev-parse --short HEAD`).toString().trim(); g.kdirty = execSync(`git -C ${K} status --porcelain | wc -l`).toString().trim();
writeFileSync(new URL("geometry.json", import.meta.url).pathname, JSON.stringify(g, null, 1)); console.log(JSON.stringify(g)); await b.close();
