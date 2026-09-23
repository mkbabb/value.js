// Focused: paused pointer-drag on the scrub rail, in 3 clock states. Also reads the engine via the Vue instance (read-only).
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs"; import { execSync } from "node:child_process";
const OUT = new URL("./probe2/", import.meta.url).pathname; const KF = "/Users/mkbabb/Programming/keyframes.js";
const khead = () => execSync(`git -C ${KF} rev-parse --short HEAD`).toString().trim() + " dirty=" + execSync(`git -C ${KF} status --porcelain | wc -l`).toString().trim();
const b = await chromium.launch({ headless: false });
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await p.goto("http://localhost:5173/#/amiga", { waitUntil: "networkidle" }); await p.waitForTimeout(2500);
const R = "#controls-ribbon-target";
const st = () => p.evaluate((R) => {
  const root = document.querySelector(R); const thumb = root.querySelector("[role=slider]"); const ball = root.querySelector(".visualizer-ball");
  let inst = root.querySelector(".scrub-rail").__vueParentComponent; while (inst && !inst.props?.animation) inst = inst.parent;
  const a = inst?.props?.animation; const m = ball.style.transform.match(/translateX\(([-\d.e]+)px\)/);
  return { v: +thumb.getAttribute("aria-valuenow"), ballTx: m ? +m[1] : null, btn: [...root.querySelectorAll("button")].find(x => /Play|Pause/.test(x.textContent)).textContent.trim(),
    eng: a ? { t: a.t, eff: a.effectiveT, rev: a.reversed, dir: a.options.direction, dur: a.options.duration, iter: a.iteration ?? a.currentIteration, playing: a.playing ?? a.isPlaying } : null };
}, R);
const rail = await p.locator(R + " .scrub-rail").boundingBox(); const y = rail.y + rail.height / 2;
const X = (f) => rail.x + 8 + 6 + (rail.width - 16 - 12) * f;
const drag = async (tag, from, to, n = 12) => {
  const out = []; await p.mouse.move(X(from), y); await p.mouse.down(); await p.waitForTimeout(60); out.push({ tag, f: from, ...(await st()) });
  for (let i = 1; i <= n; i++) { const f = from + (to - from) * i / n; await p.mouse.move(X(f), y); await p.waitForTimeout(60); out.push({ tag, f: +f.toFixed(3), ...(await st()) });
    if (i === n / 2) await p.screenshot({ path: OUT + `${tag}-mid.png`, clip: { x: rail.x - 20, y: rail.y - 10, width: rail.width + 40, height: 190 } }); }
  await p.mouse.up(); await p.waitForTimeout(200); out.push({ tag: tag + "-release", ...(await st()) }); return out; };
const res = { khead0: khead() };
res.fresh = [await st()];
res.A_fresh_LR = await drag("A_fresh_LR", 0.1, 0.9);
res.B_fresh_RL = await drag("B_fresh_RL", 0.9, 0.1);
// play 2 s then pause, drag
await p.locator(R + " button", { hasText: /^\s*Play/ }).first().click(); await p.waitForTimeout(2000);
await p.locator(R + " button", { hasText: /^\s*Pause/ }).first().click(); await p.waitForTimeout(200);
res.C_pre = [await st()];
res.C_paused_RL = await drag("C_paused_RL", 0.9, 0.1);
// play through a wrap (~9 s), pause, drag
await p.locator(R + " button", { hasText: /^\s*Play/ }).first().click(); await p.waitForTimeout(9000);
await p.locator(R + " button", { hasText: /^\s*Pause/ }).first().click(); await p.waitForTimeout(200);
res.D_pre = [await st()];
res.D_paused_LR = await drag("D_paused_LR", 0.1, 0.9);
res.E_paused_RL = await drag("E_paused_RL", 0.9, 0.1);
res.khead1 = khead();
fs.writeFileSync(OUT + "samples.json", JSON.stringify(res, null, 1));
for (const [k, v] of Object.entries(res)) if (Array.isArray(v)) console.log(k, v.map(s => `${s.f ?? "-"}:${Math.round(s.v)}/${s.ballTx?.toFixed?.(0)}${s.eng ? `[t${Math.round(s.eng.t)} e${Math.round(s.eng.eff)} r${+s.eng.rev} ${s.eng.dir}]` : ""}${s.btn[0]}`).join(" "));
console.log(res.khead0, res.khead1);
await b.close();
