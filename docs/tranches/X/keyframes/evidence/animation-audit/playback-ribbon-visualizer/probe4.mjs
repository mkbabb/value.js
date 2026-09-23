// Repeat the fresh-load L->R paused scrub (the probe2 A case) 4x with an event log, to catch the mid-drag freeze.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
const OUT = new URL("./probe2/", import.meta.url).pathname;
const b = await chromium.launch({ headless: false });
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const R = "#controls-ribbon-target"; const all = [];
for (let k = 0; k < 4; k++) {
  await p.goto("http://localhost:5173/#/amiga?x=" + k, { waitUntil: "networkidle" }); await p.waitForTimeout(2500);
  await p.evaluate((R) => {
    const root = document.querySelector(R); const thumb = root.querySelector("[role=slider]");
    let inst = root.querySelector(".scrub-rail").__vueParentComponent; while (inst && !inst.props?.animation) inst = inst.parent;
    const a = inst.props.animation; window.__L = [];
    for (const t of ["pointerdown", "pointermove", "pointerup", "pointercancel", "lostpointercapture", "gotpointercapture"]) window.addEventListener(t, (e) => window.__L.push([performance.now() | 0, t, e.clientX | 0, (e.target.className?.toString?.() || e.target.tagName).slice(0, 20)]), true);
    let last = ""; const loop = () => { const s = `${Math.round(a.t)}|${thumb.getAttribute("aria-valuenow")}|${document.body.classList.contains("is-dragging")}`; if (s !== last) { window.__L.push([performance.now() | 0, "state", s]); last = s; } requestAnimationFrame(loop); }; loop();
  }, R);
  const rail = await p.locator(R + " .scrub-rail").boundingBox(); const y = rail.y + rail.height / 2;
  const X = (f) => rail.x + 14 + (rail.width - 28) * f;
  await p.mouse.move(X(0.1), y); await p.mouse.down(); await p.waitForTimeout(60);
  for (let i = 1; i <= 12; i++) { await p.mouse.move(X(0.1 + 0.8 * i / 12), y); await p.waitForTimeout(60); }
  await p.mouse.up(); await p.waitForTimeout(300);
  const L = await p.evaluate(() => window.__L); all.push(L);
  const moves = L.filter(r => r[1] === "pointermove").length, states = L.filter(r => r[1] === "state").map(r => r[2].split("|")[0]);
  console.log(`run${k}: moves=${moves} engine t sequence: ${[...new Set(states)].join(",")} | tail: ${L.slice(-4).map(r => r.slice(1).join(":")).join(" ; ")}`);
}
fs.writeFileSync(OUT + "eventlog-freeze.json", JSON.stringify(all));
await b.close();
