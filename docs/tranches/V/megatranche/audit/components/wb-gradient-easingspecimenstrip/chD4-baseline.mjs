import { chromium } from "playwright";
const b = await chromium.launch();
const c = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: "light" });
const p = await c.newPage();
await p.goto("http://localhost:9000/#/gradient", { waitUntil: "networkidle" });
await p.waitForTimeout(3200);
console.log(JSON.stringify(await p.evaluate(() => {
  const port = document.querySelector(".specimen-strip"); const pr = port.getBoundingClientRect();
  const tiles = [...document.querySelectorAll(".specimen-tile")].map(t=>t.getBoundingClientRect());
  const full = tiles.filter(r=>r.left>=pr.left-0.5&&r.right<=pr.right+0.5).length;
  const rowEl = document.querySelector(".strip-row").getBoundingClientRect();
  const head = document.querySelector(".interval-head");
  return { portW:+pr.width.toFixed(1), portH:+pr.height.toFixed(2), scrollW:port.scrollWidth,
    full, tiles:tiles.length, offPortPct:+(100*(1-full/tiles.length)).toFixed(1),
    stripRowH:+rowEl.height.toFixed(2), cardH:+head.parentElement.getBoundingClientRect().height.toFixed(1),
    // stroke weights of the three glyph species
    headStroke: getComputedStyle(document.querySelector('.head-glyph path')).strokeWidth,
    tileStroke: getComputedStyle(document.querySelector('.specimen-tile[data-state="off"] .tile-glyph path')).strokeWidth,
    onStroke: getComputedStyle(document.querySelector('.specimen-tile[data-state="on"] .tile-glyph path')).strokeWidth,
    headGlyph: (()=>{const r=document.querySelector('.head-glyph').getBoundingClientRect();return {w:r.width,h:r.height};})(),
    labelFont: getComputedStyle(document.querySelector('.tile-label')).fontSize,
    chipFont: getComputedStyle(document.querySelector('.specimen-tile')).fontSize,
    nameFont: getComputedStyle(document.querySelector('.interval-head span:last-of-type')).fontSize,
  };
}), null, 1));
await b.close();
