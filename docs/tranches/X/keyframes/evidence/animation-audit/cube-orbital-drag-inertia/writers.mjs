// Probe: which writers touch .cube / .cube-pose / orbit container style per frame during a fling+coast.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
const b = await chromium.launch({ headless: false });
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await p.goto("http://localhost:5173/#/cube", { waitUntil: "networkidle" });
await p.waitForSelector(".cube"); await p.waitForTimeout(3000);
await p.evaluate(() => {
  window.__W = []; let frame = 0; const f = () => { frame++; requestAnimationFrame(f); }; requestAnimationFrame(f);
  const orb = document.querySelector(".idle-hover").parentElement;
  for (const [name, el] of [["cube", document.querySelector(".cube")], ["pose", document.querySelector(".cube-pose")], ["orb", orb]]) {
    new MutationObserver((ms) => { for (const m of ms) window.__W.push({ name, frame, t: +performance.now().toFixed(1), v: el.style.transform.slice(0, 60), stack: "" }); })
      .observe(el, { attributes: true, attributeFilter: ["style"] });
  }
});
const box = await p.evaluate(() => { const r = document.querySelector(".cube").getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; });
await p.mouse.move(box.x - 100, box.y); await p.mouse.down();
for (let k = 1; k <= 12; k++) { await p.mouse.move(box.x - 100 + 25 * k, box.y); await p.waitForTimeout(12); }
await p.mouse.up(); await p.waitForTimeout(2500);
const W = await p.evaluate(() => window.__W);
fs.writeFileSync("writers.json", JSON.stringify(W));
const kinds = {}; for (const w of W) { const k = w.name + ":" + w.v.split("(")[0]; kinds[k] = (kinds[k] || 0) + 1; }
console.log(JSON.stringify(kinds));
const byFrame = {}; for (const w of W) if (w.name === "cube") (byFrame[w.frame] ||= []).push(w.v.split("(")[0]);
const multi = Object.entries(byFrame).filter(([, v]) => new Set(v).size > 1);
console.log("cube frames with >1 writer kind:", multi.length, JSON.stringify(multi.slice(0, 5)));
await b.close();
