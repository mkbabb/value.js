// Wrap (in-page, runtime only) the update:modelValue handlers along the Slider chain to localise the one-sample scrub lag.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
const OUT = new URL("./probe2/", import.meta.url).pathname;
const b = await chromium.launch({ headless: false });
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
for (let run = 0; run < 6; run++) {
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
await p.evaluate((R) => { const root = document.querySelector(R); let inst = root.querySelector(".scrub-rail").__vueParentComponent; while (inst && !inst.props?.animation) inst = inst.parent; const a = inst.props.animation; let last = null; const lp = () => { const t = Math.round(a.t); if (t !== last) { window.__E.push([performance.now() | 0, "ENGINE", "t", t]); last = t; } requestAnimationFrame(lp); }; lp(); }, R);
await p.mouse.move(X(0.1), y); await p.mouse.down(); await p.waitForTimeout(60);
for (let i = 1; i <= 12; i++) { await p.mouse.move(X(0.1 + 0.8 * i / 12), y); await p.waitForTimeout(60); }
await p.mouse.up(); await p.waitForTimeout(250);
const E = await p.evaluate(() => window.__E); fs.writeFileSync(OUT + `emitlog6-${run}.json`, JSON.stringify({ chain, E }));
const mv=E.filter(r=>r[2]==="pointermove"&&r[1]==="DOM").length, sm=E.filter(r=>r[2]==="onSlideMove"&&r[1]==="SliderImpl").length, up=E.filter(r=>r[1]==="Slider"&&r[2]==="onUpdate:modelValue").map(r=>r[3]).join(","), eng=E.filter(r=>r[1]==="ENGINE").map(r=>r[3]).join(","); console.log(`RUN ${run}: DOMmoves=${mv} slideMoves=${sm} updates=${up} engine=${eng}`); if (sm < mv - 1) console.log(E.filter(r=>r[1]!=="DOM-bubble-end").map(r => r.join(" ")).join("\n"));
}
await b.close();
