// cube-relit-faces — (1) is the lighting model right for ITS OWN inputs (orbit+graph only)?
// (2) the veil sign: force --lit on the front face 0..1 at a fixed pose, light and dark arm.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
import { execSync } from "node:child_process";
const KF = "/Users/mkbabb/Programming/keyframes.js";
const out = { kfHead: execSync(`git -C ${KF} rev-parse --short HEAD`).toString().trim(), kfDirty: execSync(`git -C ${KF} status --porcelain | wc -l`).toString().trim() };
const b = await chromium.launch({ headless: false });
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await p.goto("http://localhost:5173/#/cube", { waitUntil: "networkidle" });
await p.waitForTimeout(3000);
await p.getByRole("button", { name: "Pause", exact: true }).first().click(); await p.waitForTimeout(400);
const probe2 = () => {
  const KL = (() => { const v = [0.45, -0.6, 0.66]; const m = Math.hypot(...v); return v.map(x => x / m); })();
  const faces = [...document.querySelectorAll(".cube .cube-side")]; const root = document.querySelector(".graph").parentElement;
  const skip = new Set(["cube", "cube-pose", "cube-bob", "idle-hover"]);
  const lit = (f, orbitOnly) => { let M = new DOMMatrix(); let e = f;
    while (e && e !== root) { const c = e.className.toString().split(" ")[0]; const t = getComputedStyle(e).transform;
      if (t !== "none" && !(orbitOnly && skip.has(c))) M = new DOMMatrix(t).multiply(M); e = e.parentElement; }
    const n = [M.m31, M.m32, M.m33]; const m = Math.hypot(...n); const d = (n[0]*KL[0]+n[1]*KL[1]+n[2]*KL[2]) / m; return +Math.min(1, Math.max(0, .5 + .5*d)).toFixed(2); };
  const tf = s => getComputedStyle(document.querySelector(s)).transform.slice(0, 60);
  return { faces: faces.map(f => [f.style.getPropertyValue("--lit"), lit(f, true), lit(f, false)]), cube: tf(".cube"), pose: tf(".cube-pose"), bob: tf(".cube-bob"), roll: tf(".idle-hover") };
};
out.pausedMidSpin = await p.evaluate(probe2);
// vertical drag (Euler x changes → container re-renders) in paused state, 12 steps
const bb = await p.locator(".cube").boundingBox(); let x = bb.x + bb.width/2, y = bb.y + bb.height/2;
await p.mouse.move(x, y); await p.mouse.down(); out.vdrag = [];
for (let i = 0; i < 12; i++) { y += 8; await p.mouse.move(x, y, { steps: 3 }); await p.waitForTimeout(260); out.vdrag.push((await p.evaluate(probe2)).faces); }
await p.mouse.up(); await p.waitForTimeout(1500);
// VEIL SIGN: force the most frontal face's --lit, crop its bbox, mean luminance (the lacquer/relit composite)
async function sweep(tag) {
  const idx = await p.evaluate(() => { const fs = [...document.querySelectorAll(".cube .cube-side")]; let best = 0, bz = -9;
    fs.forEach((f, i) => { const r = f.getBoundingClientRect(); const a = r.width * r.height; if (a > bz) { bz = a; best = i; } }); return best; });
  const r = []; 
  for (const v of ["0", "0.25", "0.5", "0.75", "1"]) {
    await p.evaluate(([i, v]) => { const f = document.querySelectorAll(".cube .cube-side")[i]; f.style.transition = "none"; f.style.setProperty("--lit", v); }, [idx, v]);
    await p.waitForTimeout(150);
    const box = await p.evaluate(i => { const e = document.querySelectorAll(".cube .cube-side")[i].getBoundingClientRect(); return { x: e.x, y: e.y, width: e.width, height: e.height }; }, idx);
    const path = `veil-${tag}-lit${v}.png`; await p.screenshot({ path, clip: box }); r.push({ v, path, box });
  }
  return { idx, r };
}
out.veilLight = await sweep("light");
out.darkVia = await p.evaluate(() => { const e = document.querySelector('[aria-label="Switch to dark mode"]'); if (e) { e.click(); return "toggle-click"; } document.documentElement.classList.add("dark"); return "class"; }); await p.waitForTimeout(900);
out.veilDark = await sweep("dark");
await b.close();
fs.writeFileSync("capture2-log.json", JSON.stringify(out));
console.log(JSON.stringify({ k: [out.kfHead, out.kfDirty], paused: out.pausedMidSpin, vd: out.vdrag.map(f => f.map(z => z.join("/")).join(" ")) }, null, 0));
