// Probe 2 — tether occlusion (elementsFromPoint along the live bezier while held), horizontal-drag
// skew shape, and transport wiring (panel Play → tour; drag during tour → takeover; scrub state).
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs"; import { execSync } from "node:child_process";
const OUT = new URL(".", import.meta.url).pathname; const KF = "/Users/mkbabb/Programming/keyframes.js";
const khead = execSync(`git -C ${KF} rev-parse --short HEAD`).toString().trim();
const kdirty = execSync(`git -C ${KF} status --porcelain | wc -l`).toString().trim();
const b = await chromium.launch({ headless: false });
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await p.goto("http://localhost:5173/#/square"); await p.waitForSelector(".demo-box"); await p.waitForTimeout(2500);
const C = await p.evaluate(() => { const r = document.querySelector(".demo-box").getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; });
const occl = () => p.evaluate(() => {
  const path = document.querySelector(".square-tether-line"); const L = path.getTotalLength(); const m = path.getScreenCTM();
  let vis = 0, n = 0; for (let i = 0; i <= 60; i++) { const pt = path.getPointAtLength(L * i / 60).matrixTransform(m); n++; const top = document.elementFromPoint(pt.x, pt.y); if (!top?.closest(".demo-box")) vis++; }
  const svg = document.querySelector(".square-tether");
  return { len: +L.toFixed(1), visibleSamples: vis, of: n, tetherOpacity: getComputedStyle(svg).opacity, d: path.getAttribute("d"), tf: document.querySelector(".demo-box").style.transform };
});
const res = { khead, kdirty };
for (const [name, dx, dy] of [["small40", 40, 0], ["diag106", 106, 106], ["horiz110", 110, 0], ["horiz160clamp", 160, 0]]) {
  await p.mouse.move(C.x, C.y); await p.mouse.down();
  for (let i = 1; i <= 10; i++) { await p.mouse.move(C.x + dx * i / 10, C.y + dy * i / 10); await p.waitForTimeout(16); }
  await p.waitForTimeout(900);
  res[name] = await occl();
  await p.screenshot({ path: OUT + `held-${name}.png`, clip: { x: 698, y: 227, width: 520, height: 446 } });
  await p.mouse.up(); await p.waitForTimeout(1200);
  await p.keyboard.press("Home"); await p.waitForTimeout(1500); // recentre via the box's own Home verb (box focused by the grab)
}
// horizontal fling mid-flight shape
const C2 = await p.evaluate(() => { const r = document.querySelector(".demo-box").getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; });
await p.mouse.move(C2.x, C2.y); await p.mouse.down();
for (let i = 1; i <= 4; i++) { await p.mouse.move(C2.x + 100 * i / 4, C2.y); await p.waitForTimeout(16); }
await p.waitForTimeout(60);
res.horizFling = await p.evaluate(() => document.querySelector(".demo-box").style.transform);
await p.screenshot({ path: OUT + "horiz-fling-midflight.png", clip: { x: 698, y: 227, width: 520, height: 446 } });
await p.mouse.up(); await p.waitForTimeout(1500);
// transport
const scrub = () => p.evaluate(() => { const s = document.querySelector('[role=slider][aria-label="Scrub animation timeline"]'); return s && { now: s.getAttribute("aria-valuenow"), disabled: s.getAttribute("aria-disabled") ?? s.getAttribute("data-disabled"), op: getComputedStyle(s).opacity }; });
res.scrubBefore = await scrub();
const playPanel = p.locator("button", { hasText: "Play" }).first();
res.playLabel = await playPanel.innerText();
await playPanel.click(); await p.waitForTimeout(800);
res.afterPanelPlay = await p.evaluate(() => { const bx = document.querySelector(".demo-box"); return { tf: bx.style.transform, mode: bx.dataset.squareMode, read: document.querySelector(".square-telemetry").innerText.replace(/\s+/g, " ") }; });
res.scrubPlaying = await scrub();
const C3 = await p.evaluate(() => { const r = document.querySelector(".demo-box").getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; });
const pre = await p.evaluate(() => document.querySelector(".demo-box").style.transform);
await p.mouse.move(C3.x, C3.y); await p.mouse.down();
const post = await p.evaluate(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(() => r({ tf: document.querySelector(".demo-box").style.transform, mode: document.querySelector(".demo-box").dataset.squareMode })))));
res.takeover = { pre, post };
for (let i = 1; i <= 6; i++) { await p.mouse.move(C3.x - 60 * i / 6, C3.y + 40 * i / 6); await p.waitForTimeout(16); }
await p.mouse.up(); await p.waitForTimeout(1500);
res.afterTakeover = await p.evaluate(() => { const bx = document.querySelector(".demo-box"); return { tf: bx.style.transform, mode: bx.dataset.squareMode }; });
res.scrubAfter = await scrub();
res.playLabelAfter = await playPanel.innerText();
fs.writeFileSync(OUT + "probe2.json", JSON.stringify(res, null, 1));
console.log(JSON.stringify(res, null, 1));
await b.close();
