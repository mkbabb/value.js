// Wrap (in-page, runtime only) the update:modelValue handlers along the Slider chain to localise the one-sample scrub lag.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
const OUT = new URL("./probe2/", import.meta.url).pathname;
const b = await chromium.launch({ headless: false });
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
for (let run = 0; run < 3; run++) {
if (run === 0) await p.goto("http://localhost:5173/#/amiga", { waitUntil: "networkidle" }); else await p.reload({ waitUntil: "networkidle" }); await p.waitForTimeout(2500);
const R = "#controls-ribbon-target";
const chain = await p.evaluate((R) => {
  const impl = document.querySelector(R + " [data-slider-impl]"); window.__E = []; const names = [];
  const wrapAll = () => { let inst = document.querySelector(R + " [data-slider-impl]").__vueParentComponent;
  while (inst) { const nm = inst.type.name || inst.type.__name || "?"; if (names.length < 8) names.push(nm);
    const vp = inst.vnode.props || {};
    for (const k of ["onUpdate:modelValue", "onValueCommit", "onSlideMove", "onSlideStart", "onSlideEnd"]) if (typeof vp[k] === "function" && !vp[k].__w) { const f = vp[k]; const w = (...a) => { window.__E.push([performance.now() | 0, nm, k, JSON.stringify(a[0]?.clientX ?? a[0])]); return f(...a); }; w.__w = 1; vp[k] = w; }
    if (nm === "PlaybackRibbon") break; inst = inst.parent; } };
  const tick = () => { wrapAll(); requestAnimationFrame(tick); }; tick();
  for (const t of ["pointerdown", "pointermove", "pointerup", "gotpointercapture", "lostpointercapture"]) window.addEventListener(t, (e) => window.__E.push([performance.now() | 0, "DOM", t, e.clientX | 0, (e.target.className?.toString?.()||"").slice(0,22), "cap:" + (e.target.hasPointerCapture?.(e.pointerId)), "prevented:" + e.defaultPrevented]), true);
  for (const t of ["pointermove"]) window.addEventListener(t, (e) => window.__E.push([performance.now() | 0, "DOM-bubble-end", t, "prevented:" + e.defaultPrevented]), false);
  return names;
}, R);

const rail = await p.locator(R + " .scrub-rail").boundingBox(); const y = rail.y + rail.height / 2;
const X = (f) => rail.x + 14 + (rail.width - 28) * f;
await p.mouse.move(X(0.2), y); await p.mouse.down(); await p.waitForTimeout(150);
for (const f of [0.3, 0.4, 0.5]) { await p.mouse.move(X(f), y); await p.waitForTimeout(150); }
await p.mouse.up(); await p.waitForTimeout(200);
const E = await p.evaluate(() => window.__E); fs.writeFileSync(OUT + `emitlog-${run}.json`, JSON.stringify({ chain, E }));
console.log("RUN", run); console.log(E.filter(r=>!(r[1]==="DOM-bubble-end")).map(r => r.join(" ")).join("\n"));
}
await b.close();
