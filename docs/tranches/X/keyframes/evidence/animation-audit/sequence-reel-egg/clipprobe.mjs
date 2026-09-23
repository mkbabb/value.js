// Which ancestor clips the overshooting ball? (read-only DOM walk on the served page)
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const b = await chromium.launch({ headless: false });
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await p.goto("http://localhost:5173/#/sequence", { waitUntil: "networkidle" }); await p.waitForTimeout(2000);
console.log(JSON.stringify(await p.evaluate(() => { const out = []; let e = document.querySelector(".seq-ball");
  while (e && e !== document.body) { const s = getComputedStyle(e); if (s.overflow !== "visible" || s.clipPath !== "none" || s.contain.includes("paint")) { const r = e.getBoundingClientRect(); out.push({ cls: String(e.className).slice(0, 70), ov: s.overflow, clip: s.clipPath, contain: s.contain, right: r.right }); } e = e.parentElement; }
  const tr = document.querySelector(".seq-track").getBoundingClientRect(); return { clippers: out, track: [tr.left, tr.right] }; })));
await b.close();
