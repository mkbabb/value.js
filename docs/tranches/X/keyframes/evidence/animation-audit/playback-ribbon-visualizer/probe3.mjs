// Is the paused-scrub lag timing- or event-bound? Logs pointer events + engine t + aria-valuenow per rAF.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
const OUT = new URL("./probe2/", import.meta.url).pathname;
const b = await chromium.launch({ headless: false });
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await p.goto("http://localhost:5173/#/amiga", { waitUntil: "networkidle" }); await p.waitForTimeout(2500);
const R = "#controls-ribbon-target";
await p.evaluate((R) => {
  const root = document.querySelector(R); const thumb = root.querySelector("[role=slider]");
  let inst = root.querySelector(".scrub-rail").__vueParentComponent; while (inst && !inst.props?.animation) inst = inst.parent;
  const a = inst.props.animation; window.__L = [];
  for (const t of ["pointerdown", "pointermove", "pointerup", "lostpointercapture", "gotpointercapture"]) window.addEventListener(t, (e) => window.__L.push([performance.now() | 0, t, e.clientX | 0, (e.target.className?.toString?.() || e.target.tagName).slice(0, 24)]), true);
  let last = ""; const loop = () => { const s = `${Math.round(a.t)}|${thumb.getAttribute("aria-valuenow")}`; if (s !== last) { window.__L.push([performance.now() | 0, "state", s]); last = s; } requestAnimationFrame(loop); }; loop();
}, R);
const rail = await p.locator(R + " .scrub-rail").boundingBox(); const y = rail.y + rail.height / 2;
const X = (f) => rail.x + 14 + (rail.width - 28) * f;
const run = async (tag, wait) => { await p.evaluate(() => window.__L.push([performance.now() | 0, "----"])); await p.mouse.move(X(0.2), y); await p.mouse.down(); await p.waitForTimeout(wait);
  for (const f of [0.3, 0.4, 0.5, 0.6, 0.7]) { await p.mouse.move(X(f), y); await p.waitForTimeout(wait); } await p.mouse.up(); await p.waitForTimeout(300); };
await run("w200", 200);
await run("w30", 30);
const L = await p.evaluate(() => window.__L);
fs.writeFileSync(OUT + "eventlog.json", JSON.stringify({ rail, X: [0.2, 0.3, 0.4, 0.5, 0.6, 0.7].map(f => [f, X(f) | 0]), L }));
console.log("X map", [0.2, 0.3, 0.4, 0.5, 0.6, 0.7].map(f => `${f}:${X(f) | 0}`).join(" "));
console.log(L.map(r => r.join(" ")).join("\n"));
await b.close();
